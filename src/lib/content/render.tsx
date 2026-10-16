import { evaluate } from "@mdx-js/mdx";
import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps, ReactNode } from "react";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import { createHighlighter, type Highlighter } from "shiki";
import { CompareView, CompareLink } from "@/components/compare/CompareView";
import { Analogy, Note } from "@/components/mdx/Callouts";
import { CodeTabs } from "@/components/mdx/CodeTabs";
import { Mermaid } from "@/components/mdx/Mermaid";
import { PreviewLink, type Preview } from "@/components/mdx/PreviewLink";
import { Step, Steps } from "@/components/mdx/Steps";
import { IconExternal } from "@/components/ui/icons";
import { urls } from "../urls";
import type { Card, Deck, TreeNode } from "./load";
import { nodeHref } from "./nav";
import { buildMatchers, remarkTerms, type TermMatcher } from "./remark-terms";
import type { GlossaryTerm } from "./schema";

/**
 * Build-time MDX rendering. Each concept section is compiled separately so the UI can
 * pick sections per mode. Code is highlighted by Shiki with light+dark themes as CSS vars.
 */

let highlighter: Promise<Highlighter> | null = null;
function getHighlighter() {
  highlighter ??= createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["python", "sql", "json", "nginx", "text", "yaml", "bash", "java", "typescript", "javascript"],
  });
  return highlighter;
}

interface Ctx {
  deck: Deck;
  cardId?: string;
  matchers: TermMatcher[];
  seen: Set<string>;
}

interface MdNode {
  type: string;
  lang?: string | null;
  children?: MdNode[];
  name?: string;
  attributes?: unknown[];
}

/** remark plugin: adjacent code blocks become one <CodeTabs> group (Java | Python …). */
function remarkCodeTabs() {
  const walk = (node: MdNode) => {
    if (!node.children) return;
    const out: MdNode[] = [];
    let run: MdNode[] = [];
    const flush = () => {
      if (run.length > 1) {
        out.push({
          type: "mdxJsxFlowElement",
          name: "CodeTabs",
          attributes: [{ type: "mdxJsxAttribute", name: "langs", value: run.map((c) => c.lang ?? "text").join(",") }],
          children: run,
        });
      } else out.push(...run);
      run = [];
    };
    for (const child of node.children) {
      if (child.type === "code") {
        run.push(child);
        continue;
      }
      flush();
      walk(child);
      out.push(child);
    }
    flush();
    node.children = out;
  };
  return (tree: MdNode) => walk(tree);
}

/** Glossary preview. No "Open" button when the term's concept is the page you are on. */
export function termPreview(deck: Deck, t: GlossaryTerm, currentCardId?: string): Preview {
  const see = t.see && t.see !== currentCardId ? deck.cardById.get(t.see) : undefined;
  return {
    kind: "term",
    term: t.term,
    definition: t.definition,
    glossaryHref: urls.glossary(deck.slug, t.id),
    seeHref: see ? urls.concept(deck.slug, see.meta.id) : undefined,
    seeTitle: see ? `Open: ${see.meta.title}` : undefined,
  };
}

/** Preview for any concept-tree node: a concept, or a type inside one. */
export function nodePreview(deck: Deck, node: TreeNode): Preview {
  const card = node.cardId ? deck.cardById.get(node.cardId) : undefined;
  if (card) {
    return {
      kind: "card",
      title: card.meta.title,
      hook: card.meta.hook,
      level: card.meta.level,
      heat: card.meta.heat,
      href: urls.concept(deck.slug, card.meta.id),
    };
  }
  const term = node.termId ? deck.termById.get(node.termId) : undefined;
  return {
    kind: "term",
    term: node.label,
    definition: node.note ?? term?.definition ?? "",
    glossaryHref: urls.tree(deck.slug, node.id),
    glossaryLabel: "See it in the tree",
    seeHref: node.ownerCardId ? urls.concept(deck.slug, node.ownerCardId) : undefined,
    seeTitle: node.ownerCardId ? `Open: ${deck.cardById.get(node.ownerCardId)?.meta.title}` : undefined,
  };
}

function components(ctx: Ctx): MDXComponents {
  const { deck } = ctx;
  return {
    a: ({ href = "", children }: ComponentProps<"a">) => {
      const m = /^(card|compare|term):([a-z0-9-]+)$/.exec(href);
      if (m) {
        const [, kind, id] = m;
        if (kind === "card") {
          const node = deck.nodeById.get(id);
          return node ? <PreviewLink preview={nodePreview(deck, node)}>{children}</PreviewLink> : <>{children}</>;
        }
        if (kind === "term") {
          return <PreviewLink preview={termPreview(deck, deck.termById.get(id)!, ctx.cardId)}>{children}</PreviewLink>;
        }
        return <a href={urls.compare(deck.slug, id)}>{children}</a>;
      }
      const external = /^https?:\/\//.test(href);
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
          {external && <IconExternal size={14} className="ml-0.5 inline align-[-2px]" />}
          {external && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      );
    },
    table: (props: ComponentProps<"table">) => (
      <div className="scroll-box" role="region" aria-label="Table, scrolls sideways on small screens" tabIndex={0}>
        <table {...props} />
      </div>
    ),
    pre: (props: ComponentProps<"pre">) => (
      <div className="scroll-box bg-surface-2/60" role="region" aria-label="Code example" tabIndex={0}>
        <pre {...props} />
      </div>
    ),
    Term: ({ id, children }: { id: string; children: ReactNode }) => {
      const t = deck.termById.get(id);
      return t ? <PreviewLink preview={termPreview(deck, t, ctx.cardId)}>{children}</PreviewLink> : <>{children}</>;
    },
    Compare: ({ id }: { id: string }) => {
      const c = deck.comparisonById.get(id);
      if (!c) return null;
      return (
        <div className="not-prose my-5 flex flex-col gap-2">
          <CompareView deck={deck} c={c} embedded />
          <CompareLink href={urls.compare(deck.slug, id)} />
        </div>
      );
    },
    CodeTabs,
    Analogy,
    Note,
    Steps,
    Step,
    Mermaid,
  };
}

async function renderMd(md: string, ctx: Ctx): Promise<ReactNode> {
  const { default: Content } = await evaluate(md, {
    ...runtime,
    remarkPlugins: [remarkGfm, remarkCodeTabs, [remarkTerms, { matchers: ctx.matchers, seen: ctx.seen }]],
    rehypePlugins: [
      [
        rehypeShikiFromHighlighter,
        await getHighlighter(),
        { themes: { light: "github-light", dark: "github-dark" }, defaultColor: false },
      ],
    ],
  });
  return <Content components={components(ctx)} />;
}

export { renderInline } from "../inline";

export interface RenderedCard {
  why?: ReactNode;
  how?: ReactNode;
  analogy?: ReactNode;
  example?: ReactNode;
  defaults?: ReactNode;
  questions: { q: string; a: ReactNode }[];
  /** Glossary terms that were linked inside this concept. */
  terms: GlossaryTerm[];
}

const renderCache = new Map<string, Promise<RenderedCard>>();

export function renderCard(deck: Deck, card: Card): Promise<RenderedCard> {
  const key = `${deck.slug}/${card.meta.id}`;
  let p = renderCache.get(key);
  if (!p) {
    p = doRenderCard(deck, card);
    renderCache.set(key, p);
  }
  return p;
}

async function doRenderCard(deck: Deck, card: Card): Promise<RenderedCard> {
  const ctx: Ctx = { deck, cardId: card.meta.id, matchers: buildMatchers(deck.glossary), seen: new Set() };
  const s = card.sections;
  // Sequential, in reading order, so the first mention of each term is the one that gets linked.
  const r: RenderedCard = { questions: [], terms: [] };
  if (s.why) r.why = await renderMd(s.why, ctx);
  if (s.how) r.how = await renderMd(s.how, ctx);
  if (s.analogy) r.analogy = await renderMd(s.analogy, ctx);
  if (s.example) r.example = await renderMd(s.example, ctx);
  if (s.defaults) r.defaults = await renderMd(s.defaults, ctx);
  for (const q of card.questions) r.questions.push({ q: q.q, a: await renderMd(q.markdown, ctx) });
  r.terms = deck.glossary.filter((t) => ctx.seen.has(t.id));
  return r;
}

export { nodeHref };
