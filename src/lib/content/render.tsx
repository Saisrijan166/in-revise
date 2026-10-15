import { evaluate } from "@mdx-js/mdx";
import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps, ReactNode } from "react";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import { createHighlighter, type Highlighter } from "shiki";
import { Analogy, Note } from "@/components/mdx/Callouts";
import { Mermaid } from "@/components/mdx/Mermaid";
import { PreviewLink } from "@/components/mdx/PreviewLink";
import { Step, Steps } from "@/components/mdx/Steps";
import { IconExternal } from "@/components/ui/icons";
import { urls } from "../urls";
import type { Card, Deck } from "./load";
import { buildMatchers, remarkTerms, type TermMatcher } from "./remark-terms";
import type { GlossaryTerm } from "./schema";

/**
 * Build-time MDX rendering. Each card section is compiled separately so the UI can
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

export function termPreview(deck: Deck, t: GlossaryTerm) {
  const see = t.see ? deck.cardById.get(t.see) : undefined;
  return {
    kind: "term" as const,
    term: t.term,
    definition: t.definition,
    glossaryHref: urls.glossary(deck.slug, t.id),
    seeHref: see ? urls.card(deck.slug, see.meta.id) : undefined,
    seeTitle: see ? `Open: ${see.meta.title}` : undefined,
  };
}

export function cardPreview(deck: Deck, id: string) {
  const c = deck.cardById.get(id)!;
  return {
    kind: "card" as const,
    title: c.meta.title,
    hook: c.meta.hook,
    level: c.meta.level,
    heat: c.meta.heat,
    href: urls.card(deck.slug, id),
  };
}

function components(ctx: Ctx): MDXComponents {
  const { deck } = ctx;
  return {
    a: ({ href = "", children }: ComponentProps<"a">) => {
      const m = /^(card|compare|term):([a-z0-9-]+)$/.exec(href);
      if (m) {
        const [, kind, id] = m;
        if (kind === "card") return <PreviewLink preview={cardPreview(deck, id)}>{children}</PreviewLink>;
        if (kind === "term") return <PreviewLink preview={termPreview(deck, deck.termById.get(id)!)}>{children}</PreviewLink>;
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
      return t ? <PreviewLink preview={termPreview(deck, t)}>{children}</PreviewLink> : <>{children}</>;
    },
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
    remarkPlugins: [remarkGfm, [remarkTerms, { matchers: ctx.matchers, seen: ctx.seen }]],
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

/** Renders `code` spans in short plain-text strings such as question headings. */
export function renderInline(text: string): ReactNode {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code key={i} className="rounded-md border border-line bg-surface-2 px-1 py-0.5 font-mono text-[0.88em]">
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  );
}

export interface RenderedCard {
  why?: ReactNode;
  how?: ReactNode;
  analogy?: ReactNode;
  example?: ReactNode;
  rules?: ReactNode;
  can?: ReactNode;
  cannot?: ReactNode;
  mistake?: ReactNode;
  sayIt?: ReactNode;
  questions: { q: string; a: ReactNode }[];
  /** Glossary terms that were linked inside this card. */
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
  const ctx: Ctx = { deck, cardId: card.meta.id, matchers: buildMatchers(deck.glossary, card.meta.id), seen: new Set() };
  const s = card.sections;
  // Sequential, in reading order, so the first mention of each term is the one that gets linked.
  const r: RenderedCard = { questions: [], terms: [] };
  if (s.why) r.why = await renderMd(s.why, ctx);
  if (s.how) r.how = await renderMd(s.how, ctx);
  if (s.analogy) r.analogy = await renderMd(s.analogy, ctx);
  if (s.example) r.example = await renderMd(s.example, ctx);
  if (s.rules) r.rules = await renderMd(s.rules, ctx);
  if (card.can) r.can = await renderMd(card.can, ctx);
  if (card.cannot) r.cannot = await renderMd(card.cannot, ctx);
  for (const q of card.questions) r.questions.push({ q: q.q, a: await renderMd(q.markdown, ctx) });
  if (s.mistake) r.mistake = await renderMd(s.mistake, ctx);
  if (s.sayIt) r.sayIt = await renderMd(s.sayIt, ctx);
  r.terms = deck.glossary.filter((t) => ctx.seen.has(t.id));
  return r;
}
