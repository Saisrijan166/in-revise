import { readFileSync, writeFileSync } from "node:fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { toString as mdToString } from "mdast-util-to-string";

const SRC = "/home/ginger/my-projects/interview-revise/reference/spring-boot.md";
const OUT = "/home/ginger/my-projects/interview-revise/src/data/spring-boot-cheatsheet.ts";

// Chapter boundaries for the main (numbered) sections, following the reference's own order.
const BOUNDS = [
  [0, "overview", "Overview & Why Spring Boot"],
  [3, "ioc-di", "IoC, Dependency Injection & Container"],
  [6, "beans", "Beans, Stereotypes & Configuration"],
  [16, "wiring", "Injection Types & Wiring"],
  [22, "scopes", "Bean Scopes & Lifecycle"],
  [28, "autoconfig", "Auto-Configuration & Starters"],
  [33, "config", "Configuration & Profiles"],
  [39, "rest", "REST APIs & Annotations"],
  [48, "validation", "DTOs, Validation & Exceptions"],
  [53, "jpa", "Spring Data JPA & Hibernate"],
  [61, "tx", "Transactions & ACID"],
  [66, "aop", "Spring AOP"],
  [70, "security", "Spring Security"],
  [77, "testing", "Testing"],
  [83, "actuator", "Actuator & Logging"],
  [87, "startup", "Startup & Runners"],
  [92, "rest-design", "REST Design & HTTP Status"],
  [95, "mvc", "Filters, Interceptors & MVC Flow"],
  [100, "repos", "Repositories & Queries"],
  [108, "entities", "JSON, Entities & Relationships"],
  [115, "tx2", "Transactions in the Service Layer"],
  [118, "caching", "Caching, Async & Events"],
  [126, "clients", "HTTP Clients & WebFlux"],
  [131, "config-internals", "Configuration Internals & Starters"],
  [139, "deploy", "Build & Deployment"],
  [145, "persistence", "Locking, JDBC & Persistence Context"],
  [158, "interview", "Interview Questions & Mental Models"],
];
const COMPARISONS = { id: "comparisons", title: 'Why Do We Need "X" if "Y" Exists?' };

function chapterFor(num) {
  let pick = BOUNDS[0];
  for (const b of BOUNDS) if (num >= b[0]) pick = b;
  return pick[1];
}

function strip(node) {
  // drop position + any keys we don't render, recurse
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

const md = readFileSync(SRC, "utf8");
const tree = unified().use(remarkParse).use(remarkGfm).parse(md);

const sections = [];
let inComparisons = false;
let cur = null;
let lastChapter = "overview";
let extra = 0;

function flush() {
  if (!cur) return;
  // trim leading/trailing thematic breaks
  while (cur.nodes.length && cur.nodes[0].type === "thematicBreak") cur.nodes.shift();
  while (cur.nodes.length && cur.nodes[cur.nodes.length - 1].type === "thematicBreak") cur.nodes.pop();
  if (cur.nodes.length) sections.push(cur);
  cur = null;
}

for (const node of tree.children) {
  if (node.type === "heading" && node.depth === 1) {
    const raw = mdToString(node);
    // the document title + the comparisons section marker
    if (/complete interview cheat sheet/i.test(raw)) { flush(); cur = null; continue; }
    if (/why do we need this/i.test(raw) || /why do we need.*exist/i.test(raw)) {
      flush();
      inComparisons = true;
      cur = null;
      continue; // this H1 is just the section marker, not a concept
    }
    flush();
    const stars = (raw.match(/⭐/g) || []).length;
    const clean = raw.replace(/⭐/g, "").trim();
    const m = clean.match(/^(\d+)\.\s*(.*)$/);
    const num = m ? parseInt(m[1], 10) : null;
    const title = (m ? m[2] : clean).trim();
    const chapter = inComparisons ? COMPARISONS.id : num !== null ? chapterFor(num) : lastChapter;
    lastChapter = chapter;
    const id = inComparisons ? "c" + (num ?? "x" + extra++) : num !== null ? "s" + num : "sx" + extra++;
    cur = { id, num, title, stars, chapter, nodes: [] };
  } else {
    if (!cur) continue; // skip preamble before first section
    cur.nodes.push(strip(node));
  }
}
flush();

// chapters that actually have sections, in order
const chapterList = [];
for (const b of BOUNDS) if (sections.some((s) => s.chapter === b[1])) chapterList.push({ id: b[1], title: b[2] });
if (sections.some((s) => s.chapter === COMPARISONS.id)) chapterList.push(COMPARISONS);

const data = {
  title: "Spring Boot",
  tagline: "The complete interview cheat sheet, rebuilt from the reference — read top to bottom.",
  chapters: chapterList,
  sections,
};

const header = `// AUTO-GENERATED from reference/spring-boot.md — do not edit by hand.
// Regenerate with scripts/build-cheatsheet.mjs.
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const springBootCheatsheet: CheatDoc = ${JSON.stringify(data, null, 1)};
`;
writeFileSync(OUT, header);
console.log(`sections=${sections.length} chapters=${chapterList.length} stars-top=${sections.filter(s=>s.stars>=3).length}`);
console.log("bytes=", header.length);
