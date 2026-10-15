import Fuse from "fuse.js";
import { getDecks } from "@/lib/content";
import { SEARCH_KEYS, type SearchDoc } from "@/lib/search";
import { urls } from "@/lib/urls";

// Static export: emitted once at build time as /search-index.json.
export const dynamic = "force-static";

export function GET() {
  const docs: SearchDoc[] = [];
  for (const deck of getDecks()) {
    for (const c of deck.cards) {
      docs.push({
        key: `card:${deck.slug}:${c.meta.id}`,
        kind: "card",
        tech: deck.slug,
        techName: deck.name,
        title: c.meta.title,
        aka: [],
        text: c.meta.hook,
        tags: c.meta.tags,
        href: urls.card(deck.slug, c.meta.id),
      });
    }
    for (const c of deck.comparisons) {
      docs.push({
        key: `compare:${deck.slug}:${c.id}`,
        kind: "compare",
        tech: deck.slug,
        techName: deck.name,
        title: c.title,
        aka: [],
        text: c.verdict,
        tags: [],
        href: urls.compare(deck.slug, c.id),
      });
    }
    for (const t of deck.glossary) {
      docs.push({
        key: `term:${deck.slug}:${t.id}`,
        kind: "term",
        tech: deck.slug,
        techName: deck.name,
        title: t.term,
        aka: t.aka,
        text: t.definition,
        tags: [],
        href: urls.glossary(deck.slug, t.id),
      });
    }
  }
  const index = Fuse.createIndex(SEARCH_KEYS, docs).toJSON();
  return Response.json({ docs, index });
}
