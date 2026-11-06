import type { ReactNode } from "react";
import { createHighlighter, type Highlighter } from "shiki";
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
  if (l === "properties" || l === "conf" || l === "ini") return "properties";
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

function Inline({ nodes }: { nodes?: MdNode[] }): ReactNode {
  if (!nodes) return null;
  return nodes.map((n, i) => {
    switch (n.type) {
      case "text":
        return n.value;
      case "strong":
        return (
          <strong key={i}>
            <Inline nodes={n.children} />
          </strong>
        );
      case "emphasis":
        return (
          <em key={i}>
            <Inline nodes={n.children} />
          </em>
        );
      case "delete":
        return (
          <del key={i}>
            <Inline nodes={n.children} />
          </del>
        );
      case "inlineCode":
        return <code key={i}>{n.value}</code>;
      case "break":
        return <br key={i} />;
      case "link":
        return (
          <a key={i} href={n.url} target="_blank" rel="noopener noreferrer">
            <Inline nodes={n.children} />
          </a>
        );
      default:
        return n.children ? <Inline key={i} nodes={n.children} /> : (n.value ?? null);
    }
  });
}

function Table({ node }: { node: MdNode }) {
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
                  <Inline nodes={cell.children} />
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
                  <Inline nodes={cell.children} />
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
  code,
}: {
  nodes?: MdNode[];
  code: Map<MdNode, string>;
}): ReactNode {
  if (!nodes) return null;
  return nodes.map((n, i) => {
    switch (n.type) {
      case "paragraph":
        return (
          <p key={i}>
            <Inline nodes={n.children} />
          </p>
        );
      case "heading": {
        const d = Math.min(Math.max(n.depth ?? 3, 3), 5);
        if (d === 4)
          return (
            <h4 key={i}>
              <Inline nodes={n.children} />
            </h4>
          );
        if (d === 5)
          return (
            <h5 key={i}>
              <Inline nodes={n.children} />
            </h5>
          );
        return (
          <h3 key={i}>
            <Inline nodes={n.children} />
          </h3>
        );
      }
      case "list":
        return n.ordered ? (
          <ol key={i}>
            <Blocks nodes={n.children} code={code} />
          </ol>
        ) : (
          <ul key={i}>
            <Blocks nodes={n.children} code={code} />
          </ul>
        );
      case "listItem":
        return (
          <li key={i}>
            <Blocks nodes={n.children} code={code} />
          </li>
        );
      case "code":
        return (
          <div key={i} className="cs-pre" dangerouslySetInnerHTML={{ __html: code.get(n) ?? "" }} />
        );
      case "blockquote":
        return (
          <blockquote key={i}>
            <Blocks nodes={n.children} code={code} />
          </blockquote>
        );
      case "table":
        return <Table key={i} node={n} />;
      case "thematicBreak":
        return <hr key={i} className="cs-hr" />;
      default:
        return n.children ? <Blocks key={i} nodes={n.children} code={code} /> : null;
    }
  });
}
