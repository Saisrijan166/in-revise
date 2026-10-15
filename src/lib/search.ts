/** Search index shape, shared by the build-time route and the client palette. */

export type SearchKind = "card" | "compare" | "term";

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
