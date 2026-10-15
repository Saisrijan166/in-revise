import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import type { z } from "zod";
import {
  ALLOWED_COMPONENTS,
  LEVEL_RANK,
  RESERVED_SLUGS,
  SECTION_DEFS,
  cardMetaSchema,
  comparisonSchema,
  glossarySchema,
  techSchema,
  type Accent,
  type CardMeta,
  type ComparisonData,
  type GlossaryTerm,
  type SectionKey,
} from "./schema";

/**
 * Reads /content at build time (and in scripts/validate-content.ts).
 * Pure Node: no Next.js or React imports, so the validator can run it with tsx.
 */

export const CONTENT_DIR = path.join(process.cwd(), "content");

export interface Issue {
  file: string;
  message: string;
  severity: "error" | "warning";
}

export interface Question {
  q: string;
  markdown: string;
}

export interface Card {
  meta: CardMeta;
  file: string;
  /** Raw markdown per section (without the `##` heading). */
  sections: Partial<Record<SectionKey, string>>;
  questions: Question[];
  can?: string;
  cannot?: string;
}

export interface SpineStep {
  index: number;
  text: string;
  problem: string;
  fix: string;
  cards: string[];
}

export interface Topic {
  id: string;
  title: string;
  order: number;
  blurb?: string;
  /** 0-based position after sorting, used for the topic's line colour. */
  index: number;
}

export interface Deck {
  name: string;
  slug: string;
  accent: Accent;
  summary: string;
  spine: SpineStep[];
  topics: Topic[];
  /** Cards in reading order: topic order, then prerequisites first. */
  cards: Card[];
  comparisons: ComparisonData[];
  glossary: GlossaryTerm[];
  cardById: Map<string, Card>;
  comparisonById: Map<string, ComparisonData>;
  termById: Map<string, GlossaryTerm>;
}

export interface LoadResult {
  decks: Deck[];
  issues: Issue[];
}

const rel = (file: string) => path.relative(process.cwd(), file);

function readYaml(file: string, issues: Issue[]): unknown {
  try {
    let text = fs.readFileSync(file, "utf8");
    // Comparison files may be wrapped in `---` fences like frontmatter (CLAUDE.md 3.3).
    text = text.replace(/^---\s*\n/, "").replace(/\n---\s*$/, "\n");
    return YAML.parse(text);
  } catch (err) {
    issues.push({ file: rel(file), message: `YAML parse error: ${(err as Error).message}`, severity: "error" });
    return undefined;
  }
}

function zodIssues(file: string, error: z.ZodError, issues: Issue[]) {
  for (const i of error.issues) {
    const where = i.path.length ? i.path.join(".") : "(root)";
    issues.push({ file: rel(file), message: `${where}: ${i.message}`, severity: "error" });
  }
}

/** Splits `---\nyaml\n---\nbody`. */
export function splitFrontmatter(text: string): { data: string; body: string; bodyLine: number } | null {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!m) return null;
  const bodyLine = m[0].split("\n").length;
  return { data: m[1], body: text.slice(m[0].length), bodyLine };
}

/** Splits markdown at a heading level, ignoring headings inside code fences. */
export function splitHeadings(md: string, level: 2 | 3): { preamble: string; parts: { heading: string; body: string }[] } {
  const marker = "#".repeat(level) + " ";
  const lines = md.split(/\r?\n/);
  const parts: { heading: string; body: string[] }[] = [];
  const preamble: string[] = [];
  let fence: string | null = null;
  for (const line of lines) {
    const f = /^\s*(```+|~~~+)/.exec(line);
    if (f) {
      if (!fence) fence = f[1][0];
      else if (f[1][0] === fence) fence = null;
    }
    if (!fence && line.startsWith(marker) && !line.startsWith(marker + "#")) {
      parts.push({ heading: line.slice(marker.length).trim(), body: [] });
      continue;
    }
    (parts.length ? parts[parts.length - 1].body : preamble).push(line);
  }
  return {
    preamble: preamble.join("\n").trim(),
    parts: parts.map((p) => ({ heading: p.heading, body: p.body.join("\n").trim() })),
  };
}

function parseCard(file: string, techSlug: string, issues: Issue[]): Card | null {
  const text = fs.readFileSync(file, "utf8");
  const fm = splitFrontmatter(text);
  if (!fm) {
    issues.push({ file: rel(file), message: "missing frontmatter (--- ... ---)", severity: "error" });
    return null;
  }
  let raw: unknown;
  try {
    raw = YAML.parse(fm.data);
  } catch (err) {
    issues.push({ file: rel(file), message: `frontmatter YAML error: ${(err as Error).message}`, severity: "error" });
    return null;
  }
  const parsed = cardMetaSchema.safeParse(raw);
  if (!parsed.success) {
    zodIssues(file, parsed.error, issues);
    return null;
  }
  const meta = parsed.data;
  const err = (message: string) => issues.push({ file: rel(file), message, severity: "error" });

  const base = path.basename(file, ".mdx");
  if (meta.id !== base) err(`id "${meta.id}" must equal the file name "${base}"`);
  if (meta.tech !== techSlug) err(`tech "${meta.tech}" must equal the folder "${techSlug}"`);

  const { preamble, parts } = splitHeadings(fm.body, 2);
  if (preamble) err("body text before the first `##` section is not allowed");

  const sections: Partial<Record<SectionKey, string>> = {};
  let lastIndex = -1;
  for (const part of parts) {
    const idx = SECTION_DEFS.findIndex((d) => d.heading === part.heading);
    if (idx === -1) {
      err(`unknown section "## ${part.heading}". Allowed: ${SECTION_DEFS.map((d) => d.heading).join(", ")}`);
      continue;
    }
    const key = SECTION_DEFS[idx].key;
    if (sections[key] !== undefined) err(`duplicate section "## ${part.heading}"`);
    if (idx < lastIndex) err(`section "## ${part.heading}" is out of order`);
    lastIndex = Math.max(lastIndex, idx);
    if (!part.body) err(`section "## ${part.heading}" is empty`);
    sections[key] = part.body;
  }
  for (const def of SECTION_DEFS) {
    if (def.required && sections[def.key] === undefined) err(`missing required section "## ${def.heading}"`);
  }

  const questions: Question[] = [];
  if (sections.questions !== undefined) {
    const qs = splitHeadings(sections.questions, 3);
    if (qs.preamble) err("Interview Qs: write each question as `### Question?` followed by the answer");
    for (const p of qs.parts) {
      if (!p.body) err(`Interview Qs: "${p.heading}" has no answer`);
      questions.push({ q: p.heading, markdown: p.body });
    }
    if (questions.length < 2 || questions.length > 4) err(`Interview Qs: need 2–4 questions, found ${questions.length}`);
  }

  let can: string | undefined;
  let cannot: string | undefined;
  if (sections.canCannot !== undefined) {
    const cc = splitHeadings(sections.canCannot, 3);
    for (const p of cc.parts) {
      if (p.heading === "Can") can = p.body;
      else if (p.heading === "Cannot") cannot = p.body;
      else err(`Can / Cannot: unknown sub-heading "### ${p.heading}" (use "### Can" and "### Cannot")`);
    }
    if (cc.preamble) err("Can / Cannot: put items under `### Can` and `### Cannot`");
    if (!can || !cannot) err("Can / Cannot: needs both `### Can` and `### Cannot` lists");
  }

  return { meta, file: rel(file), sections, questions, can, cannot };
}

function parseSpineText(text: string): { problem: string; fix: string } {
  const i = text.indexOf("→");
  if (i === -1) return { problem: text.trim(), fix: "" };
  return { problem: text.slice(0, i).trim(), fix: text.slice(i + 1).trim() };
}

/** Topological order inside each topic (prerequisites first), ties by level then title. */
function orderCards(cards: Card[], topics: Topic[], issues: Issue[]): Card[] {
  const out: Card[] = [];
  for (const topic of topics) {
    const inTopic = cards.filter((c) => c.meta.topic === topic.id);
    const ids = new Set(inTopic.map((c) => c.meta.id));
    const indeg = new Map<string, number>();
    for (const c of inTopic) indeg.set(c.meta.id, c.meta.needs.filter((n) => ids.has(n)).length);
    const cmp = (a: Card, b: Card) =>
      LEVEL_RANK[a.meta.level] - LEVEL_RANK[b.meta.level] || a.meta.title.localeCompare(b.meta.title);
    const ready = inTopic.filter((c) => indeg.get(c.meta.id) === 0).sort(cmp);
    const done = new Set<string>();
    while (ready.length) {
      const c = ready.shift()!;
      out.push(c);
      done.add(c.meta.id);
      for (const d of inTopic) {
        if (d.meta.needs.includes(c.meta.id) && !done.has(d.meta.id)) {
          const n = indeg.get(d.meta.id)! - 1;
          indeg.set(d.meta.id, n);
          if (n === 0) {
            ready.push(d);
            ready.sort(cmp);
          }
        }
      }
    }
    const left = inTopic.filter((c) => !done.has(c.meta.id));
    if (left.length) {
      issues.push({
        file: left[0].file,
        message: `"needs" cycle inside topic "${topic.id}": ${left.map((c) => c.meta.id).join(", ")}`,
        severity: "error",
      });
      out.push(...left.sort(cmp));
    }
  }
  return out;
}

const LINK_RE = /\]\((card|compare|term):([^)\s]*)\)/g;
const COMPONENT_RE = /<([A-Z][A-Za-z0-9]*)/g;

/** Checks body-level references that the build would otherwise render as broken links. */
function checkBody(card: Card, deck: Deck, issues: Issue[]) {
  const err = (message: string, severity: Issue["severity"] = "error") =>
    issues.push({ file: card.file, message, severity });
  const all = Object.values(card.sections).join("\n\n");
  for (const m of all.matchAll(LINK_RE)) {
    const [, kind, id] = m;
    const ok =
      kind === "card" ? deck.cardById.has(id) : kind === "compare" ? deck.comparisonById.has(id) : deck.termById.has(id);
    if (!ok) err(`broken link "${kind}:${id}"`);
    if (kind === "card" && id === card.meta.id) err(`card links to itself ("card:${id}")`);
  }
  const allowed = new Set<string>(ALLOWED_COMPONENTS);
  const stripped = all.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
  for (const m of stripped.matchAll(COMPONENT_RE)) {
    if (!allowed.has(m[1])) err(`unknown component <${m[1]}>. Allowed: ${[...allowed].join(", ")}`);
  }
  for (const m of stripped.matchAll(/<Mermaid\b([\s\S]*?)\/>/g)) {
    if (!/\balt="[^"]{10,}"/.test(m[1])) err('<Mermaid> needs a text alternative: alt="..." (10+ chars)');
  }
  if (/lorem ipsum|\bTODO\b|\bTBD\b|\bFIXME\b/i.test(all + card.meta.hook)) err("placeholder text found (TODO/TBD/lorem ipsum)");
  if (/\p{Extended_Pictographic}/u.test(stripped)) err("emojis are not allowed in body text");

  // Code examples stay tiny (CLAUDE.md 3.1: max ~15 lines).
  for (const m of all.matchAll(/```[^\n]*\n([\s\S]*?)```/g)) {
    const lines = m[1].replace(/\n$/, "").split("\n").length;
    if (lines > 15) err(`code block has ${lines} lines (max 15)`);
  }

  // The declared primary memory aid must actually be present.
  const v = card.meta.visual;
  if (v === "analogy" && !card.sections.analogy && !/<Analogy\b/.test(all)) err('visual "analogy" but no "## Analogy" section');
  if (v === "flow" && !/<(Steps|Mermaid)\b/.test(all)) err('visual "flow" but no <Steps> or <Mermaid> diagram');
  if (v === "table" && !/^\s*\|.*\|\s*$/m.test(all)) err('visual "table" but no markdown table');
  if (v === "code" && !/```/.test(all)) err('visual "code" but no code block');

  // Readability budget (CLAUDE.md 2.2): the core idea and the Revise view should each read in about a minute.
  const stats = readingStats(card);
  if (stats.core > 280) err(`core (why/how/analogy/example) is ${stats.core} words; aim for 280 or fewer`, "warning");
  if (stats.revise > 300) err(`Revise view is ${stats.revise} words; aim for 300 or fewer`, "warning");
}

/** Prose words only: code, diagram source and table pipes are not "read". */
export function countWords(md: string): number {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<Mermaid[\s\S]*?\/>/g, " ")
    .replace(/<\/?[A-Z][^>]*>/g, " ")
    .replace(/[|#*`>-]+/g, " ")
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

/** Word counts per mode, used for the validator budget and the "~1 min" labels in the UI. */
export function readingStats(card: Card): { core: number; revise: number; learn: number } {
  const s = card.sections;
  const w = (k: SectionKey) => (s[k] ? countWords(s[k]!) : 0);
  const hook = countWords(card.meta.hook);
  const core = w("why") + w("how") + w("analogy") + w("example");
  const revise = hook + w("rules") + w("canCannot") + w("mistake") + w("sayIt");
  return { core, revise, learn: core + revise + w("questions") };
}

function loadDeck(dir: string, slug: string, issues: Issue[]): Deck | null {
  const techFile = path.join(dir, "_tech.yaml");
  if (!fs.existsSync(techFile)) {
    issues.push({ file: rel(dir), message: "missing _tech.yaml", severity: "error" });
    return null;
  }
  const techParsed = techSchema.safeParse(readYaml(techFile, issues));
  if (!techParsed.success) {
    zodIssues(techFile, techParsed.error, issues);
    return null;
  }
  const tech = techParsed.data;
  const terr = (message: string) => issues.push({ file: rel(techFile), message, severity: "error" });
  if (tech.slug !== slug) terr(`slug "${tech.slug}" must equal the folder name "${slug}"`);
  if (RESERVED_SLUGS.includes(slug)) terr(`slug "${slug}" is reserved`);

  const topics: Topic[] = [...tech.topics]
    .sort((a, b) => a.order - b.order)
    .map((t, index) => ({ ...t, index }));
  const topicIds = new Set<string>();
  for (const t of topics) {
    if (topicIds.has(t.id)) terr(`duplicate topic id "${t.id}"`);
    topicIds.add(t.id);
  }

  // Glossary
  const glossaryFile = path.join(dir, "glossary.yaml");
  let glossary: GlossaryTerm[] = [];
  if (fs.existsSync(glossaryFile)) {
    const g = glossarySchema.safeParse(readYaml(glossaryFile, issues));
    if (g.success) glossary = [...g.data.terms].sort((a, b) => a.term.localeCompare(b.term));
    else zodIssues(glossaryFile, g.error, issues);
  } else {
    issues.push({ file: rel(dir), message: "missing glossary.yaml", severity: "error" });
  }

  // Cards
  const cardsDir = path.join(dir, "cards");
  const cardFiles = fs.existsSync(cardsDir)
    ? fs.readdirSync(cardsDir).filter((f) => f.endsWith(".mdx")).sort()
    : [];
  const rawCards: Card[] = [];
  for (const f of cardFiles) {
    const c = parseCard(path.join(cardsDir, f), slug, issues);
    if (c) rawCards.push(c);
  }

  // Comparisons
  const compDir = path.join(dir, "comparisons");
  const compFiles = fs.existsSync(compDir)
    ? fs.readdirSync(compDir).filter((f) => /\.ya?ml$/.test(f)).sort()
    : [];
  const comparisons: ComparisonData[] = [];
  for (const f of compFiles) {
    const file = path.join(compDir, f);
    const parsed = comparisonSchema.safeParse(readYaml(file, issues));
    if (!parsed.success) {
      zodIssues(file, parsed.error, issues);
      continue;
    }
    const c = parsed.data;
    const base = f.replace(/\.ya?ml$/, "");
    if (c.id !== base) issues.push({ file: rel(file), message: `id "${c.id}" must equal the file name "${base}"`, severity: "error" });
    if (c.tech !== slug) issues.push({ file: rel(file), message: `tech "${c.tech}" must equal "${slug}"`, severity: "error" });
    const cols = ["a", "b", "c", "d"].slice(0, c.compares.length) as ("a" | "b" | "c" | "d")[];
    c.rows.forEach((row, i) => {
      for (const col of ["a", "b", "c", "d"] as const) {
        const want = cols.includes(col);
        if (want && !row[col]) issues.push({ file: rel(file), message: `rows.${i}: missing "${col}"`, severity: "error" });
        if (!want && row[col]) issues.push({ file: rel(file), message: `rows.${i}: "${col}" has no matching item in compares`, severity: "error" });
      }
    });
    comparisons.push(c);
  }

  // Unique ids. Cards and comparisons share one namespace so a bare id is never ambiguous.
  const seen = new Map<string, string>();
  for (const c of rawCards) {
    if (seen.has(c.meta.id)) issues.push({ file: c.file, message: `duplicate id "${c.meta.id}" (also in ${seen.get(c.meta.id)})`, severity: "error" });
    seen.set(c.meta.id, c.file);
  }
  for (const c of comparisons) {
    if (seen.has(c.id)) issues.push({ file: `comparisons/${c.id}`, message: `duplicate id "${c.id}" (also in ${seen.get(c.id)})`, severity: "error" });
    seen.set(c.id, `comparisons/${c.id}`);
  }
  const termIds = new Set<string>();
  for (const t of glossary) {
    if (termIds.has(t.id)) issues.push({ file: rel(glossaryFile), message: `duplicate term id "${t.id}"`, severity: "error" });
    termIds.add(t.id);
  }

  const cards = orderCards(rawCards, topics, issues);
  const spine: SpineStep[] = tech.storySpine.map((s, index) => {
    const text = typeof s === "string" ? s : s.step;
    return { index, text, ...parseSpineText(text), cards: typeof s === "string" ? [] : s.cards };
  });

  const deck: Deck = {
    name: tech.name,
    slug,
    accent: tech.accent,
    summary: tech.summary,
    spine,
    topics,
    cards,
    comparisons,
    glossary,
    cardById: new Map(cards.map((c) => [c.meta.id, c])),
    comparisonById: new Map(comparisons.map((c) => [c.id, c])),
    termById: new Map(glossary.map((t) => [t.id, t])),
  };

  // Link validity (CLAUDE.md 3.2)
  for (const c of cards) {
    const e = (message: string) => issues.push({ file: c.file, message, severity: "error" });
    if (!topicIds.has(c.meta.topic)) e(`topic "${c.meta.topic}" is not in _tech.yaml`);
    for (const key of ["needs", "leadsTo", "related"] as const) {
      for (const id of c.meta[key]) {
        if (!deck.cardById.has(id)) e(`${key}: card "${id}" does not exist`);
        if (id === c.meta.id) e(`${key}: card links to itself`);
      }
    }
    for (const id of c.meta.confusedWith) {
      if (!deck.comparisonById.has(id)) e(`confusedWith: comparison "${id}" does not exist`);
    }
    if (!c.meta.needs.length && !c.meta.leadsTo.length && !c.meta.related.length) {
      e("Connects to: needs, leadsTo or related must link at least one card");
    }
    for (const s of c.meta.sources) {
      if (Date.parse(`${s.verifiedOn}T00:00:00Z`) > Date.now() + 86_400_000) e(`source "${s.title}": verifiedOn is in the future`);
    }
    if (!spine.some((s) => s.cards.includes(c.meta.id))) {
      e("card is not placed on the story spine (add its id to a storySpine step's cards)");
    }
  }
  for (const s of spine) {
    if (!s.fix) terr(`storySpine step ${s.index + 1} must read "problem → fix"`);
    for (const id of s.cards) if (!deck.cardById.has(id)) terr(`storySpine step ${s.index + 1}: card "${id}" does not exist`);
  }
  for (const c of comparisons) {
    for (const id of c.compares) {
      if (!deck.cardById.has(id) && !deck.termById.has(id)) {
        issues.push({ file: `content/${slug}/comparisons/${c.id}.yaml`, message: `compares: "${id}" is neither a card nor a glossary term`, severity: "error" });
      }
    }
  }
  for (const t of glossary) {
    if (t.see && !deck.cardById.has(t.see)) {
      issues.push({ file: rel(glossaryFile), message: `term "${t.id}": see "${t.see}" is not a card`, severity: "error" });
    }
  }
  for (const c of cards) checkBody(c, deck, issues);

  return deck;
}

export function loadDecks(contentDir = CONTENT_DIR): LoadResult {
  const issues: Issue[] = [];
  const decks: Deck[] = [];
  if (!fs.existsSync(contentDir)) {
    return { decks, issues: [{ file: "content", message: "content folder not found", severity: "error" }] };
  }
  const slugs = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
  for (const slug of slugs) {
    const deck = loadDeck(path.join(contentDir, slug), slug, issues);
    if (deck) decks.push(deck);
  }
  return { decks, issues };
}
