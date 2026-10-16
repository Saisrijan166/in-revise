import Fuse from "fuse.js";
import { getDecks } from "@/lib/content";
import { nodeHref } from "@/lib/content/nav";
import { SEARCH_KEYS, type SearchDoc } from "@/lib/search";
import { urls } from "@/lib/urls";

// Static export: emitted once at build time as /search-index.json.
export const dynamic = "force-static";

export function GET() {
  const docs: SearchDoc[] = [];
  for (const deck of getDecks()) {
    const base = { tech: deck.slug, techName: deck.name };
    for (const c of deck.cards) {
      docs.push({
        ...base,
        key: `card:${deck.slug}:${c.meta.id}`,
        kind: "card",
        title: c.meta.title,
        aka: [],
        text: c.meta.hook,
        tags: c.meta.tags,
        href: urls.concept(deck.slug, c.meta.id),
      });
    }
    for (const n of deck.nodeById.values()) {
      if (n.cardId) continue;
      const owner = n.ownerCardId ? deck.cardById.get(n.ownerCardId)?.meta.title : undefined;
      docs.push({
        ...base,
        key: `node:${deck.slug}:${n.id}`,
        kind: "node",
        title: n.label,
        aka: [],
        text: [n.note, owner && `in ${owner}`].filter(Boolean).join(" · "),
        tags: [],
        href: nodeHref(deck.slug, n),
      });
    }
    for (const c of deck.comparisons) {
      docs.push({
        ...base,
        key: `compare:${deck.slug}:${c.id}`,
        kind: "compare",
        title: c.title,
        aka: [],
        text: c.verdict,
        tags: [],
        href: urls.compare(deck.slug, c.id),
      });
    }
    for (const t of deck.glossary) {
      docs.push({
        ...base,
        key: `term:${deck.slug}:${t.id}`,
        kind: "term",
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
