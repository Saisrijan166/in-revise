import type { ReactNode } from "react";
import { createHighlighter, type Highlighter } from "shiki";
import type { Deck } from "@/lib/content/load";
import { buildMatchers, type TermMatcher } from "@/lib/content/remark-terms";
import { termPreview } from "@/lib/content/render";
import { PreviewLink } from "@/components/mdx/PreviewLink";
import type { CheatDoc, MdNode } from "./types";

const LANGS = [
  "java",
  "yaml",
  "properties",
  "bash",
  "sql",
  "json",
  "xml",
  "text",
  "typescript",
  "javascript",
  "jsx",
  "tsx",
  "html",
  "css",
  "python",
  "dockerfile",
  "nginx",
  "proto",
];

let highlighter: Promise<Highlighter> | null = null;
function getHighlighter() {
  highlighter ??= createHighlighter({ themes: ["github-light", "github-dark"], langs: LANGS });
  return highlighter;
}

function normLang(lang?: string): string {
  if (!lang) return "text";
  const l = lang.toLowerCase();
  if (l === "yml") return "yaml";
  if (l === "sh" || l === "shell") return "bash";
  if (l === "ts") return "typescript";
  if (l === "js") return "javascript";
  if (l === "conf" || l === "ini") return "properties";
  return LANGS.includes(l) ? l : "text";
}

/** Highlight every code block once; return a map from the code node to its HTML. */
export async function highlightDoc(doc: CheatDoc): Promise<Map<MdNode, string>> {
  const h = await getHighlighter();
  const map = new Map<MdNode, string>();
  const walk = (n: MdNode) => {
    if (n.type === "code") {
      map.set(
        n,
        h.codeToHtml(n.value ?? "", {
          lang: normLang(n.lang),
          themes: { light: "github-light", dark: "github-dark" },
          defaultColor: false,
        }),
      );
    }
    n.children?.forEach(walk);
  };
  doc.sections.forEach((s) => s.nodes.forEach(walk));
  return map;
}

export interface RenderCtx {
  code: Map<MdNode, string>;
  deck: Deck;
  matchers: TermMatcher[];
  /** Glossary ids already linked in the current section (one link per term per section). */
  seen: Set<string>;
}

export function buildMatchersFor(deck: Deck): TermMatcher[] {
  return buildMatchers(deck.glossary);
}

/** Split a text run, linking the first unseen mention of each glossary term (like the rest of the site). */
function linkify(value: string, ctx: RenderCtx, keyBase: string): ReactNode[] {
  const { matchers, seen, deck } = ctx;
  const out: ReactNode[] = [];
  let rest = value;
  let n = 0;
  // Stop early when nothing is left to match.
  while (rest) {
    let best: { index: number; length: number; id: string } | null = null;
    for (const m of matchers) {
      if (seen.has(m.id)) continue;
      const hit = m.regex.exec(rest);
      if (
        hit &&
        (!best ||
          hit.index < best.index ||
          (hit.index === best.index && hit[0].length > best.length))
      )
        best = { index: hit.index, length: hit[0].length, id: m.id };
    }
    if (!best) {
      out.push(rest);
      break;
    }
    seen.add(best.id);
    if (best.index > 0) out.push(rest.slice(0, best.index));
    const matched = rest.slice(best.index, best.index + best.length);
    const term = deck.termById.get(best.id);
    if (term) {
      out.push(
        <PreviewLink key={`${keyBase}-${n++}`} preview={termPreview(deck, term)}>
          {matched}
        </PreviewLink>,
      );
    } else {
      out.push(matched);
    }
    rest = rest.slice(best.index + best.length);
  }
  return out;
}

function Inline({
  nodes,
  ctx,
  link = true,
  k = "i",
}: {
  nodes?: MdNode[];
  ctx: RenderCtx;
  link?: boolean;
  k?: string;
}): ReactNode {
  if (!nodes) return null;
  return nodes.map((n, i) => {
    const key = `${k}-${i}`;
    switch (n.type) {
      case "text":
        return link ? linkify(n.value ?? "", ctx, key) : (n.value ?? null);
      case "strong":
        return (
          <strong key={key}>
            <Inline nodes={n.children} ctx={ctx} link={link} k={key} />
          </strong>
        );
      case "emphasis":
        return (
          <em key={key}>
            <Inline nodes={n.children} ctx={ctx} link={link} k={key} />
          </em>
        );
      case "delete":
        return (
          <del key={key}>
            <Inline nodes={n.children} ctx={ctx} link={link} k={key} />
          </del>
        );
      case "inlineCode":
        return <code key={key}>{n.value}</code>;
      case "break":
        return <br key={key} />;
      case "link":
        return (
          <a key={key} href={n.url} target="_blank" rel="noopener noreferrer">
            <Inline nodes={n.children} ctx={ctx} link={false} k={key} />
          </a>
        );
      default:
        return n.children ? (
          <Inline key={key} nodes={n.children} ctx={ctx} link={link} k={key} />
        ) : (
          (n.value ?? null)
        );
    }
  });
}

function Table({ node, ctx }: { node: MdNode; ctx: RenderCtx }) {
  const rows = node.children ?? [];
  const [head, ...body] = rows;
  const align = node.align ?? [];
  const cellStyle = (c: number) =>
    align[c] ? { textAlign: align[c] as "left" | "right" | "center" } : undefined;
  return (
    <div className="cs-table-wrap">
      <table>
        {head && (
          <thead>
            <tr>
              {(head.children ?? []).map((cell, c) => (
                <th key={c} style={cellStyle(c)}>
                  <Inline nodes={cell.children} ctx={ctx} link={false} />
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {body.map((row, r) => (
            <tr key={r}>
              {(row.children ?? []).map((cell, c) => (
                <td key={c} style={cellStyle(c)}>
                  <Inline nodes={cell.children} ctx={ctx} k={`t${r}-${c}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Blocks({
  nodes,
  ctx,
  k = "b",
}: {
  nodes?: MdNode[];
  ctx: RenderCtx;
  k?: string;
}): ReactNode {
  if (!nodes) return null;
  return nodes.map((n, i) => {
    const key = `${k}-${i}`;
    switch (n.type) {
      case "paragraph":
        return (
          <p key={key}>
            <Inline nodes={n.children} ctx={ctx} k={key} />
          </p>
        );
      case "heading": {
        const d = Math.min(Math.max(n.depth ?? 3, 3), 5);
        const inner = <Inline nodes={n.children} ctx={ctx} link={false} k={key} />;
        if (d === 4) return <h4 key={key}>{inner}</h4>;
        if (d === 5) return <h5 key={key}>{inner}</h5>;
        return <h3 key={key}>{inner}</h3>;
      }
      case "list":
        return n.ordered ? (
          <ol key={key}>
            <Blocks nodes={n.children} ctx={ctx} k={key} />
          </ol>
        ) : (
          <ul key={key}>
            <Blocks nodes={n.children} ctx={ctx} k={key} />
          </ul>
        );
      case "listItem":
        return (
          <li key={key}>
            <Blocks nodes={n.children} ctx={ctx} k={key} />
          </li>
        );
      case "code":
        return (
          <div
            key={key}
            className="cs-pre"
            dangerouslySetInnerHTML={{ __html: ctx.code.get(n) ?? "" }}
          />
        );
      case "blockquote":
        return (
          <blockquote key={key}>
            <Blocks nodes={n.children} ctx={ctx} k={key} />
          </blockquote>
        );
      case "table":
        return <Table key={key} node={n} ctx={ctx} />;
      case "thematicBreak":
        return <hr key={key} className="cs-hr" />;
      default:
        return n.children ? <Blocks key={key} nodes={n.children} ctx={ctx} k={key} /> : null;
    }
  });
}
