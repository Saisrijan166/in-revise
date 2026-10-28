/** Search index shape, shared by the build-time route and the client palette. */

export type SearchKind = "card" | "node" | "compare" | "term";

export interface SearchDoc {
  key: string;
  kind: SearchKind;
  tech: string;
  techName: string;
  title: string;
  aka: string[];
  text: string;
  tags: string[];
  href: string;
}

export const SEARCH_KEYS = [
  { name: "title", weight: 3 },
  { name: "aka", weight: 2 },
  { name: "tags", weight: 1.2 },
  { name: "text", weight: 1 },
];

export const SEARCH_INDEX_URL = "/search-index.json";

/* ---------- Ranking ---------- */

/** Fold case and strip anything that is not a letter or digit, so "@Component" and "component"
 * compare, and spacing/punctuation never changes a match. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const splitWords = (s: string) => normalize(s).split(" ").filter(Boolean);

/**
 * A relevance score for one document against the query, higher is better. This is what makes the
 * results feel exact: an exact title match always beats a prefix, which beats a whole-word match,
 * which beats a substring, which beats a fuzzy match. `fuseScore` (0 = perfect, 1 = weak) only
 * breaks ties among equally-strong matches, so a typo match can never outrank an exact one.
 */
export function relevance(doc: SearchDoc, rawQuery: string, fuseScore = 1): number {
  const q = normalize(rawQuery);
  if (!q) return 0;
  const qWords = q.split(" ").filter(Boolean);
  const title = normalize(doc.title);
  const akas = doc.aka.map(normalize);
  const titleWords = splitWords(doc.title);
  const tags = doc.tags.map(normalize);
  const haystacks = [title, ...akas];

  let score = 0;

  // Exact match on the title or an alias — the strongest signal.
  if (haystacks.includes(q)) score += 1000;
  // Title or alias starts with the whole query ("cache" → "Cache-Aside").
  else if (haystacks.some((h) => h.startsWith(q + " ") || h.startsWith(q))) score += 600;
  // The query appears as a run of whole words in the title ("write through").
  else if (title.includes(q) && new RegExp(`(^| )${escapeRe(q)}( |$)`).test(title)) score += 400;
  // The query appears anywhere in the title or an alias as a substring.
  else if (haystacks.some((h) => h.includes(q))) score += 220;

  // A whole query word equals a whole title word (handles multi-word queries and word order).
  const titleWordSet = new Set(titleWords);
  const exactWordHits = qWords.filter((w) => titleWordSet.has(w)).length;
  score += exactWordHits * 60;
  // A query word is the prefix of some title word.
  const prefixWordHits = qWords.filter(
    (w) => !titleWordSet.has(w) && titleWords.some((tw) => tw.startsWith(w)),
  ).length;
  score += prefixWordHits * 25;

  // Tag hits help, but much less than the title.
  if (tags.some((t) => t === q || t.includes(q))) score += 30;
  // Body text substring: a weak signal, so text-only matches sit below any title match.
  if (normalize(doc.text).includes(q)) score += 15;

  // Among equally-strong matches, Fuse's fuzzy closeness (0 best) decides the order.
  score += (1 - Math.min(1, fuseScore)) * 10;

  // Concepts and comparisons are usually what people want; nudge them above bare terms/types
  // only as a final tie-breaker (small, so it never overrides a stronger textual match).
  const kindBonus: Record<SearchKind, number> = { card: 3, compare: 2, term: 1, node: 0 };
  score += kindBonus[doc.kind];

  return score;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
