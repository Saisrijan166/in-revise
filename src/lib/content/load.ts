import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import type { z } from "zod";
import {
  ALLOWED_COMPONENTS,
  RESERVED_CONCEPT_IDS,
  RESERVED_SLUGS,
  SECTION_DEFS,
  cardMetaSchema,
  comparisonSchema,
  glossarySchema,
  techSchema,
  treeSchema,
  type Accent,
  type CardMeta,
  type ComparisonData,
  type GlossaryTerm,
  type SectionKey,
  type Source,
  type Template,
  type TreeNodeInput,
} from "./schema";

/**
 * Reads /content at build time (and in scripts/validate-content.ts).
 * Pure Node: no Next.js or React imports, so the validator can run it with tsx.
 */

/** CONTENT_DIR env var lets tests point the build at another content tree; defaults to ./content. */
export const CONTENT_DIR = process.env.CONTENT_DIR
  ? path.resolve(process.env.CONTENT_DIR)
  : path.join(process.cwd(), "content");

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
  /** Concept template of the tech (2 = compact, 3 = teaching). */
  template: Template;
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

/** A resolved node of the concept tree. */
export interface TreeNode {
  id: string;
  label: string;
  note?: string;
  /** Set when this node is a full concept page. */
  cardId?: string;
  /** Set when this node has a glossary definition. */
  termId?: string;
  topicId: string;
  parentId?: string;
  /** The nearest concept (card) at or above this node. */
  ownerCardId?: string;
  depth: number;
  children: TreeNode[];
}

export interface Deck {
  name: string;
  slug: string;
  accent: Accent;
  summary: string;
  /** App-code languages from _tech.yaml (System Design: Java and Python; Spring Boot: Java only). */
  codeLanguages: string[];
  template: Template;
  spine: SpineStep[];
  topics: Topic[];
  /** Concepts in reading order: the order of the concept tree. */
  cards: Card[];
  comparisons: ComparisonData[];
  glossary: GlossaryTerm[];
  tree: { topic: Topic; nodes: TreeNode[] }[];
  treeSources: Source[];
  cardById: Map<string, Card>;
  comparisonById: Map<string, ComparisonData>;
  termById: Map<string, GlossaryTerm>;
  nodeById: Map<string, TreeNode>;
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
export function splitFrontmatter(text: string): { data: string; body: string } | null {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!m) return null;
  return { data: m[1], body: text.slice(m[0].length) };
}

/** Splits markdown at a heading level, ignoring headings inside code fences. */
export function splitHeadings(
  md: string,
  level: 2 | 3,
): { preamble: string; parts: { heading: string; body: string }[] } {
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

function parseCard(file: string, techSlug: string, template: Template, issues: Issue[]): Card | null {
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
    issues.push({
      file: rel(file),
      message: `frontmatter YAML error: ${(err as Error).message}`,
      severity: "error",
    });
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
  if (RESERVED_CONCEPT_IDS.includes(meta.id)) err(`id "${meta.id}" is reserved for a page name`);

  const { preamble, parts } = splitHeadings(fm.body, 2);
  if (preamble) err("body text before the first `##` section is not allowed");

  const sections: Partial<Record<SectionKey, string>> = {};
  const defs = SECTION_DEFS.filter((d) => (d.v as readonly number[]).includes(template));
  let lastIndex = -1;
  for (const part of parts) {
    const idx = defs.findIndex((d) => d.heading === part.heading);
    if (idx === -1) {
      err(
        `unknown section "## ${part.heading}" for template v${template}. Allowed: ${defs.map((d) => d.heading).join(", ")}. ` +
          "Key points, trap and say-it live in frontmatter (points, trap, sayIt).",
      );
      continue;
    }
    const key = defs[idx].key;
    if (sections[key] !== undefined) err(`duplicate section "## ${part.heading}"`);
    if (idx < lastIndex) err(`section "## ${part.heading}" is out of order`);
    lastIndex = Math.max(lastIndex, idx);
    if (!part.body) err(`section "## ${part.heading}" is empty`);
    sections[key] = part.body;
  }
  for (const def of defs) {
    if ((def.required as readonly number[]).includes(template) && sections[def.key] === undefined) {
      err(`missing required section "## ${def.heading}"`);
    }
  }
  if (template === 2 && (meta.buildsOn.length || meta.scenarios.length || meta.trap?.why)) {
    err("buildsOn, scenarios and trap.why need template 3 (set `template: 3` in _tech.yaml)");
  }
  if (template === 3 && meta.trap && !meta.trap.why) err("trap.why: say why people believe the wrong line");

  const questions: Question[] = [];
  if (sections.questions !== undefined) {
    const qs = splitHeadings(sections.questions, 3);
    if (qs.preamble) err("Interview Qs: write each question as `### Question?` followed by the answer");
    for (const p of qs.parts) {
      if (!p.body) err(`Interview Qs: "${p.heading}" has no answer`);
      questions.push({ q: p.heading, markdown: p.body });
    }
    if (questions.length < 2 || questions.length > 4) {
      err(`Interview Qs: need 2–4 questions, found ${questions.length}`);
    }
  }

  return { meta, file: rel(file), sections, questions, template };
}

function parseSpineText(text: string): { problem: string; fix: string } {
  const i = text.indexOf("→");
  if (i === -1) return { problem: text.trim(), fix: "" };
  return { problem: text.slice(0, i).trim(), fix: text.slice(i + 1).trim() };
}

const LINK_RE = /\]\((card|compare|term):([^)\s]*)\)/g;
const COMPONENT_RE = /<([A-Z][A-Za-z0-9]*)/g;

/** Prose words only: code, diagram source, tags and table pipes are not "read". */
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
  const m = card.meta;
  const revise =
    countWords(m.hook) +
    m.points.reduce((n, p) => n + countWords(`${p.k} ${p.v}`), 0) +
    (m.trap ? countWords(`${m.trap.wrong} ${m.trap.right}`) : 0) +
    (m.sayIt ? countWords(m.sayIt) : 0);
  const core = w("what") + w("why") + w("how") + w("analogy") + w("example");
  const extra =
    w("defaults") + w("rules") + w("confusion") + w("mistakes") + w("questions") +
    (m.trap?.why ? countWords(m.trap.why) : 0);
  return { core, revise, learn: core + revise + extra };
}

/** Checks body-level references that the build would otherwise render as broken. */
function checkBody(card: Card, deck: Deck, issues: Issue[], fileIds: Set<string>) {
  const err = (message: string, severity: Issue["severity"] = "error") =>
    issues.push({ file: card.file, message, severity });
  const all = Object.values(card.sections).join("\n\n");
  for (const m of all.matchAll(LINK_RE)) {
    const [, kind, id] = m;
    const ok =
      kind === "card"
        ? deck.cardById.has(id) || deck.nodeById.has(id)
        : kind === "compare"
          ? deck.comparisonById.has(id)
          : deck.termById.has(id);
    if (!ok && !(kind !== "term" && fileIds.has(id))) err(`broken link "${kind}:${id}"`);
    if (kind === "card" && id === card.meta.id) err(`concept links to itself ("card:${id}")`);
  }
  const allowed = new Set<string>(ALLOWED_COMPONENTS);
  const stripped = all.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
  for (const m of stripped.matchAll(COMPONENT_RE)) {
    if (!allowed.has(m[1])) err(`unknown component <${m[1]}>. Allowed: ${[...allowed].join(", ")}`);
  }
  for (const m of stripped.matchAll(/<Mermaid\b([\s\S]*?)\/>/g)) {
    if (!/\balt="[^"]{10,}"/.test(m[1])) err('<Mermaid> needs a text alternative: alt="..." (10+ chars)');
  }
  for (const m of stripped.matchAll(/<Compare\s+id="([^"]+)"\s*\/>/g)) {
    if (!deck.comparisonById.has(m[1]) && !fileIds.has(m[1])) err(`<Compare id="${m[1]}"> does not exist`);
  }
  const textAll = all + card.meta.hook + JSON.stringify(card.meta.points) + JSON.stringify(card.meta.trap ?? "");
  if (/lorem ipsum|\bTODO\b|\bTBD\b|\bFIXME\b/i.test(textAll)) err("placeholder text found (TODO/TBD/lorem ipsum)");
  if (/\p{Extended_Pictographic}/u.test(stripped)) err("emojis are not allowed in body text");

  // Code examples stay tiny (CLAUDE.md 3.1: max ~15 lines), and app code comes in every language
  // the tech lists in codeLanguages (two or more become tabs; one means no pairing).
  const app = deck.codeLanguages;
  for (const [key, md] of Object.entries(card.sections)) {
    const langs = new Set<string>();
    for (const m of (md ?? "").matchAll(/```([a-z]*)[^\n]*\n([\s\S]*?)```/g)) {
      const lines = m[2].replace(/\n$/, "").split("\n").length;
      if (lines > 15) err(`code block has ${lines} lines (max 15)`);
      langs.add(m[1]);
    }
    if (app.length > 1 && app.some((l) => langs.has(l)) && !app.every((l) => langs.has(l))) {
      err(`section "${key}": app code must be shown in ${app.join(" and ")} (adjacent code blocks)`);
    }
  }

  // The declared primary memory aid must actually be present.
  const v = card.meta.visual;
  if (v === "analogy" && !card.sections.analogy && !/<Analogy\b/.test(all)) {
    err('visual "analogy" but no "## Analogy" section');
  }
  if (v === "flow" && !/<(Steps|Mermaid)\b/.test(all)) err('visual "flow" but no <Steps> or <Mermaid> diagram');
  if (v === "table" && !/^\s*\|.*\|\s*$/m.test(all) && !/<Compare\b/.test(all)) {
    err('visual "table" but no markdown table or <Compare>');
  }
  if (v === "code" && !/```/.test(all)) err('visual "code" but no code block');

  // Reading budgets (CLAUDE.md 2.2): short, glanceable, no leftovers.
  const stats = readingStats(card);
  const warn = (m: string) => err(m, "warning");
  const words = (k: SectionKey) => (card.sections[k] ? countWords(card.sections[k]!) : 0);
  if (card.template === 2) {
    if (words("why") > 50) warn("Why it exists: keep it to 1–2 sentences (≤ 50 words)");
    if (stats.core > 260) warn(`core (why/how/analogy/example) is ${stats.core} words; aim for 260 or fewer`);
    if (stats.revise > 170) warn(`Revise view is ${stats.revise} words; aim for 170 or fewer`);
    for (const q of card.questions) {
      const n = countWords(q.markdown);
      if (n > 50) warn(`Interview answer "${q.q}" is ${n} words; aim for 50 or fewer`);
    }
    return;
  }

  // Template v3 (teaching): enough words to explain, never an essay.
  if (words("what") > 90) warn(`What it is is ${words("what")} words; aim for 90 or fewer`);
  if (words("why") > 110) warn(`Why it exists is ${words("why")} words; aim for 110 or fewer`);
  if (stats.core > 650) warn(`core (what/why/how/analogy/example) is ${stats.core} words; aim for 650 or fewer`);
  if (stats.learn > 1100) warn(`Learn view is ${stats.learn} words; aim for 1100 or fewer`);
  if (stats.revise > 210) warn(`Revise view is ${stats.revise} words; aim for 210 or fewer`);
  for (const q of card.questions) {
    const n = countWords(q.markdown);
    if (n > 70) warn(`Interview answer "${q.q}" is ${n} words; aim for 70 or fewer`);
  }
  // An example is explained, not just shown: prose must follow the last code block.
  const ex = card.sections.example;
  if (ex && /```/.test(ex)) {
    const tail = ex.slice(ex.lastIndexOf("```") + 3);
    if (countWords(tail) < 12) err("Example: explain the code after it (what to notice, what it prints and why)");
  }
  if (card.sections.what && /```/.test(card.sections.what)) err("What it is: no code here; start in plain words");
}

function buildTree(
  raw: Record<string, TreeNodeInput[]>,
  topics: Topic[],
  ctx: {
    file: string;
    issues: Issue[];
    cardTitle: (id: string) => string | undefined;
    hasTerm: (id: string) => boolean;
  },
): { tree: { topic: Topic; nodes: TreeNode[] }[]; nodeById: Map<string, TreeNode> } {
  const nodeById = new Map<string, TreeNode>();
  const err = (message: string) => ctx.issues.push({ file: ctx.file, message, severity: "error" });

  const walk = (input: TreeNodeInput, topicId: string, depth: number, parent?: TreeNode): TreeNode => {
    const title = ctx.cardTitle(input.id);
    const termId = input.term ?? (ctx.hasTerm(input.id) ? input.id : undefined);
    if (input.term && !ctx.hasTerm(input.term)) err(`node "${input.id}": term "${input.term}" is not in glossary.yaml`);
    if (!title && !input.label) err(`node "${input.id}": needs a label (it is not a concept file)`);
    const node: TreeNode = {
      id: input.id,
      label: input.label ?? title ?? input.id,
      note: input.note,
      cardId: title ? input.id : undefined,
      termId,
      topicId,
      parentId: parent?.id,
      ownerCardId: title ? input.id : parent?.ownerCardId,
      depth,
      children: [],
    };
    if (nodeById.has(node.id)) err(`duplicate tree node id "${node.id}"`);
    nodeById.set(node.id, node);
    node.children = (input.children ?? []).map((c) => walk(c, topicId, depth + 1, node));
    return node;
  };

  const tree: { topic: Topic; nodes: TreeNode[] }[] = [];
  for (const t of topics) {
    const nodes = raw[t.id];
    if (!nodes) {
      err(`topic "${t.id}" has no branch in tree.yaml`);
      continue;
    }
    const built = nodes.map((n) => walk(n, t.id, 0));
    // Every topic lists concepts at its top level (CLAUDE.md 3.4): a bare grouping label would
    // show as an odd row with no page, level or one-liner. Make the family a concept instead.
    for (const n of built) {
      if (!n.cardId) err(`topic "${t.id}": top-level node "${n.id}" must be a concept (add cards/${n.id}.mdx)`);
    }
    tree.push({ topic: t, nodes: built });
  }
  for (const id of Object.keys(raw)) {
    if (!topics.some((t) => t.id === id)) err(`tree.yaml topic "${id}" is not in _tech.yaml`);
  }
  return { tree, nodeById };
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

  const topics: Topic[] = [...tech.topics].sort((a, b) => a.order - b.order).map((t, index) => ({ ...t, index }));
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
  const termById = new Map(glossary.map((t) => [t.id, t]));

  // Concept files. Ids of every file count as "existing" even when the file fails to parse,
  // so one broken file is reported once, not again at every link to it.
  const cardsDir = path.join(dir, "cards");
  const cardFiles = fs.existsSync(cardsDir) ? fs.readdirSync(cardsDir).filter((f) => f.endsWith(".mdx")).sort() : [];
  const fileIds = new Set(cardFiles.map((f) => f.replace(/\.mdx$/, "")));
  const rawCards: Card[] = [];
  for (const f of cardFiles) {
    const c = parseCard(path.join(cardsDir, f), slug, tech.template, issues);
    if (c) rawCards.push(c);
  }
  const rawById = new Map(rawCards.map((c) => [c.meta.id, c]));

  // Comparisons
  const compDir = path.join(dir, "comparisons");
  const compFiles = fs.existsSync(compDir) ? fs.readdirSync(compDir).filter((f) => /\.ya?ml$/.test(f)).sort() : [];
  for (const f of compFiles) fileIds.add(f.replace(/\.ya?ml$/, ""));
  const comparisons: ComparisonData[] = [];
  for (const f of compFiles) {
    const file = path.join(compDir, f);
    const parsed = comparisonSchema.safeParse(readYaml(file, issues));
    if (!parsed.success) {
      zodIssues(file, parsed.error, issues);
      continue;
    }
    const c = parsed.data;
    const e = (message: string) => issues.push({ file: rel(file), message, severity: "error" });
    const base = f.replace(/\.ya?ml$/, "");
    if (c.id !== base) e(`id "${c.id}" must equal the file name "${base}"`);
    if (c.tech !== slug) e(`tech "${c.tech}" must equal "${slug}"`);
    if (c.gist.length !== c.compares.length) e("gist: give exactly one line per compared item");
    if (c.diagrams && c.diagrams.length !== c.compares.length) e("diagrams: give exactly one per compared item");
    if (c.diagrams && !c.diagramAlt) e("diagramAlt: diagrams need a text alternative");
    if (c.explain && c.explain.length !== c.compares.length) e("explain: give exactly one line per compared item");
    if (tech.template === 3) {
      if (!c.explain) e("explain: template 3 explains each side in plain words first (one line per item)");
      if (!c.sayIt) e("sayIt: template 3 needs a ready interview answer");
    } else if (c.explain || c.example || c.sayIt) {
      e("explain, example and sayIt need template 3 (set `template: 3` in _tech.yaml)");
    }
    const cols = ["a", "b", "c", "d"].slice(0, c.compares.length) as ("a" | "b" | "c" | "d")[];
    c.rows.forEach((row, i) => {
      for (const col of ["a", "b", "c", "d"] as const) {
        const want = cols.includes(col);
        if (want && !row[col]) e(`rows.${i}: missing "${col}"`);
        if (!want && row[col]) e(`rows.${i}: "${col}" has no matching item in compares`);
      }
    });
    comparisons.push(c);
  }

  // Unique ids. Concepts and comparisons share one namespace so a bare id is never ambiguous.
  const seen = new Map<string, string>();
  for (const c of rawCards) {
    if (seen.has(c.meta.id)) {
      issues.push({ file: c.file, message: `duplicate id "${c.meta.id}" (also in ${seen.get(c.meta.id)})`, severity: "error" });
    }
    seen.set(c.meta.id, c.file);
  }
  for (const c of comparisons) {
    if (seen.has(c.id)) {
      issues.push({ file: `comparisons/${c.id}`, message: `duplicate id "${c.id}" (also in ${seen.get(c.id)})`, severity: "error" });
    }
    seen.set(c.id, `comparisons/${c.id}`);
  }
  const termIds = new Set<string>();
  for (const t of glossary) {
    if (termIds.has(t.id)) issues.push({ file: rel(glossaryFile), message: `duplicate term id "${t.id}"`, severity: "error" });
    termIds.add(t.id);
  }

  // Concept tree: the hierarchy of the whole tech, and the reading order.
  const treeFile = path.join(dir, "tree.yaml");
  let tree: { topic: Topic; nodes: TreeNode[] }[] = [];
  let nodeById = new Map<string, TreeNode>();
  let treeSources: Source[] = [];
  if (!fs.existsSync(treeFile)) {
    issues.push({ file: rel(dir), message: "missing tree.yaml", severity: "error" });
  } else {
    const parsed = treeSchema.safeParse(readYaml(treeFile, issues));
    if (!parsed.success) zodIssues(treeFile, parsed.error, issues);
    else {
      treeSources = parsed.data.sources;
      ({ tree, nodeById } = buildTree(parsed.data.topics, topics, {
        file: rel(treeFile),
        issues,
        cardTitle: (id) => rawById.get(id)?.meta.title ?? (fileIds.has(id) ? id : undefined),
        hasTerm: (id) => termById.has(id),
      }));
    }
  }
  for (const id of nodeById.keys()) {
    if (comparisons.some((c) => c.id === id)) {
      issues.push({ file: rel(treeFile), message: `tree node "${id}" has the same id as a comparison`, severity: "error" });
    }
  }

  // Reading order = tree order (depth-first).
  const ordered: Card[] = [];
  const visit = (n: TreeNode) => {
    const c = n.cardId ? rawById.get(n.cardId) : undefined;
    if (c) ordered.push(c);
    n.children.forEach(visit);
  };
  tree.forEach((t) => t.nodes.forEach(visit));
  for (const c of rawCards) {
    if (!ordered.includes(c)) {
      issues.push({ file: c.file, message: "concept is not in tree.yaml (add a node with its id)", severity: "error" });
      ordered.push(c);
    }
  }

  const spine: SpineStep[] = tech.storySpine.map((s, index) => {
    const text = typeof s === "string" ? s : s.step;
    return { index, text, ...parseSpineText(text), cards: typeof s === "string" ? [] : s.cards };
  });

  const comparisonById = new Map(comparisons.map((c) => [c.id, c]));

  const deck: Deck = {
    name: tech.name,
    slug,
    accent: tech.accent,
    summary: tech.summary,
    codeLanguages: tech.codeLanguages,
    template: tech.template,
    spine,
    topics,
    cards: ordered,
    comparisons,
    glossary,
    tree,
    treeSources,
    cardById: new Map(ordered.map((c) => [c.meta.id, c])),
    comparisonById,
    termById,
    nodeById,
  };

  for (const c of ordered) {
    const e = (message: string) => issues.push({ file: c.file, message, severity: "error" });
    if (!topicIds.has(c.meta.topic)) e(`topic "${c.meta.topic}" is not in _tech.yaml`);
    const node = nodeById.get(c.meta.id);
    if (node && node.topicId !== c.meta.topic) {
      e(`topic "${c.meta.topic}" does not match its tree.yaml branch "${node.topicId}"`);
    }
    for (const id of c.meta.confusedWith) {
      if (!deck.comparisonById.has(id) && !fileIds.has(id)) e(`confusedWith: comparison "${id}" does not exist`);
    }
    for (const s of c.meta.sources) {
      if (Date.parse(`${s.verifiedOn}T00:00:00Z`) > Date.now() + 86_400_000) {
        e(`source "${s.title}": verifiedOn is in the future`);
      }
    }
    const pos = ordered.indexOf(c);
    for (const id of c.meta.buildsOn) {
      const dep = deck.cardById.get(id);
      if (!dep) e(`buildsOn: "${id}" is not a concept of this tech`);
      else if (id === c.meta.id) e("buildsOn: a concept cannot build on itself");
      else if (ordered.indexOf(dep) > pos) e(`buildsOn: "${id}" comes later in the reading order; move it earlier or drop the link`);
    }
    if (!spine.some((s) => s.cards.includes(c.meta.id))) {
      e("concept is not placed on the story spine (add its id to a storySpine step's cards)");
    }
  }
  for (const s of spine) {
    if (!s.fix) terr(`storySpine step ${s.index + 1} must read "problem → fix"`);
    for (const id of s.cards) {
      if (!deck.cardById.has(id) && !fileIds.has(id)) terr(`storySpine step ${s.index + 1}: concept "${id}" does not exist`);
    }
  }
  for (const c of comparisons) {
    for (const id of c.compares) {
      if (!nodeById.has(id) && !fileIds.has(id)) {
        issues.push({
          file: `content/${slug}/comparisons/${c.id}.yaml`,
          message: `compares: "${id}" is not a node in tree.yaml`,
          severity: "error",
        });
      }
    }
  }
  for (const t of glossary) {
    if (t.see && !deck.cardById.has(t.see) && !fileIds.has(t.see)) {
      issues.push({ file: rel(glossaryFile), message: `term "${t.id}": see "${t.see}" is not a concept`, severity: "error" });
    }
  }
  for (const c of ordered) checkBody(c, deck, issues, fileIds);

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
