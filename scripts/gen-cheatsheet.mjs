// Generic cheat-sheet generator.
// Reads a cleaned cheat-sheet markdown (reference/<slug>.cheatsheet.md) where
//   `# Chapter`  => a chapter,  `## Section`  => a concept under it,
// and writes src/data/<slug>-cheatsheet.ts (the committed data the app renders).
//
// Usage: node scripts/gen-cheatsheet.mjs <slug> ["Tech Name"] ["tagline"]
import { readFileSync, writeFileSync } from "node:fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { toString as mdToString } from "mdast-util-to-string";

const slug = process.argv[2];
if (!slug) {
  console.error("usage: node scripts/gen-cheatsheet.mjs <slug> [name] [tagline]");
  process.exit(1);
}
const name = process.argv[3] || slug;
const tagline =
  process.argv[4] || "The whole tech on one page — ideas, examples and the rules to remember.";

const SRC = `reference/${slug}.cheatsheet.md`;
const OUT = `src/data/${slug}-cheatsheet.ts`;

function strip(node) {
  const out = { type: node.type };
  if (node.value !== undefined) out.value = node.value;
  if (node.depth !== undefined) out.depth = node.depth;
  if (node.lang !== undefined && node.lang !== null) out.lang = node.lang;
  if (node.ordered !== undefined) out.ordered = node.ordered;
  if (node.url !== undefined) out.url = node.url;
  if (node.align !== undefined) out.align = node.align;
  if (node.children) out.children = node.children.map(strip);
  return out;
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const md = readFileSync(SRC, "utf8");
const tree = unified().use(remarkParse).use(remarkGfm).parse(md);

const chapters = [];
const sections = [];
let curChapter = null;
let cur = null;
const idSeen = new Set();

function uniqueId(base) {
  let id = base || "s";
  let n = 2;
  while (idSeen.has(id)) id = `${base}-${n++}`;
  idSeen.add(id);
  return id;
}

function flush() {
  if (!cur) return;
  while (cur.nodes.length && cur.nodes[0].type === "thematicBreak") cur.nodes.shift();
  while (cur.nodes.length && cur.nodes[cur.nodes.length - 1].type === "thematicBreak") cur.nodes.pop();
  if (cur.nodes.length) sections.push(cur);
  cur = null;
}

for (const node of tree.children) {
  if (node.type === "heading" && node.depth === 1) {
    flush();
    const title = mdToString(node).replace(/⭐/g, "").trim();
    curChapter = { id: uniqueId(slugify(title)), title };
    chapters.push(curChapter);
  } else if (node.type === "heading" && node.depth === 2) {
    flush();
    const raw = mdToString(node);
    const stars = (raw.match(/⭐/g) || []).length;
    const title = raw.replace(/⭐/g, "").trim();
    if (!curChapter) {
      curChapter = { id: uniqueId("overview"), title: "Overview" };
      chapters.push(curChapter);
    }
    cur = { id: uniqueId(`s-${slugify(title)}`), num: null, title, stars, chapter: curChapter.id, nodes: [] };
  } else {
    if (!cur) continue;
    cur.nodes.push(strip(node));
  }
}
flush();

const keep = new Set(sections.map((s) => s.chapter));
const data = {
  title: name,
  tagline,
  chapters: chapters.filter((c) => keep.has(c.id)),
  sections,
};

const header = `// AUTO-GENERATED from reference/${slug}.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs ${slug}
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const ${slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Cheatsheet: CheatDoc = ${JSON.stringify(data, null, 1)};
`;
writeFileSync(OUT, header);
console.log(`${slug}: chapters=${data.chapters.length} sections=${sections.length} -> ${OUT}`);
