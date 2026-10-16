import type { GlossaryTerm } from "./schema";

/**
 * remark plugin: wraps the first mention of each glossary term in a card with <Term id="...">,
 * so terms get a hover/tap preview automatically (CLAUDE.md 3.5). Skips code, links and headings.
 */

interface MdNode {
  type: string;
  value?: string;
  name?: string | null;
  children?: MdNode[];
  attributes?: unknown[];
}

export interface TermMatcher {
  id: string;
  regex: RegExp;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function buildMatchers(terms: GlossaryTerm[]): TermMatcher[] {
  return terms
    .map((t) => {
      // A term is matched by its name (minus any "(...)" note) only when that stays specific;
      // names with a note, like "Availability (nines)", are matched by their `aka` only.
      const names = [...t.aka];
      if (!/\(/.test(t.term)) names.unshift(t.term);
      const alts = names
        .filter(Boolean)
        .sort((a, b) => b.length - a.length)
        .map((n) => escape(n));
      if (!alts.length) return null;
      // Whole words only; allow a plural "s"/"es". Dashes count as word characters ("cache-aside").
      return {
        id: t.id,
        regex: new RegExp(`(?<![\\w-])(?:${alts.join("|")})(?:e?s)?(?![\\w-])`, "i"),
      };
    })
    .filter((m): m is TermMatcher => m !== null);
}

const SKIP = new Set([
  "code",
  "inlineCode",
  "link",
  "linkReference",
  "heading",
  "definition",
  "html",
  "mdxFlowExpression",
  "mdxTextExpression",
]);
const SKIP_JSX = new Set(["Term", "Mermaid"]);

export function remarkTerms(options: { matchers: TermMatcher[]; seen: Set<string> }) {
  const { matchers, seen } = options;

  function splitText(value: string): MdNode[] | null {
    let best: { index: number; length: number; id: string } | null = null;
    for (const m of matchers) {
      if (seen.has(m.id)) continue;
      const hit = m.regex.exec(value);
      // Earliest match wins; at the same place the longer one does ("idempotency key" over "idempotency").
      if (hit && (!best || hit.index < best.index || (hit.index === best.index && hit[0].length > best.length)))
        best = { index: hit.index, length: hit[0].length, id: m.id };
    }
    if (!best) return null;
    seen.add(best.id);
    const out: MdNode[] = [];
    const before = value.slice(0, best.index);
    const word = value.slice(best.index, best.index + best.length);
    const after = value.slice(best.index + best.length);
    if (before) out.push({ type: "text", value: before });
    out.push({
      type: "mdxJsxTextElement",
      name: "Term",
      attributes: [{ type: "mdxJsxAttribute", name: "id", value: best.id }],
      children: [{ type: "text", value: word }],
    });
    if (after) out.push(...(splitText(after) ?? [{ type: "text", value: after }]));
    return out;
  }

  function walk(node: MdNode) {
    if (!node.children) return;
    const next: MdNode[] = [];
    for (const child of node.children) {
      if (child.type === "text" && child.value) {
        const parts = splitText(child.value);
        if (parts) next.push(...parts);
        else next.push(child);
        continue;
      }
      if (SKIP.has(child.type)) {
        next.push(child);
        continue;
      }
      if (
        (child.type === "mdxJsxTextElement" || child.type === "mdxJsxFlowElement") &&
        child.name &&
        SKIP_JSX.has(child.name)
      ) {
        next.push(child);
        continue;
      }
      walk(child);
      next.push(child);
    }
    node.children = next;
  }

  return (tree: MdNode) => walk(tree);
}
