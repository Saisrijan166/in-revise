import type { Deck } from "./load";
import { nodeHref } from "./nav";
import { RELATION_TYPES, type Level, type RelationType } from "./schema";
import { urls } from "../urls";

/**
 * Data for the Map (CLAUDE.md 5.2 #4): every node of the concept tree plus the explained
 * relations between them ("Scale out needs Load balancer, because …").
 */

export interface MapNode {
  id: string;
  label: string;
  note?: string;
  href: string;
  isConcept: boolean;
  hook?: string;
  level?: Level;
  heat?: number;
  topicId: string;
  topicTitle: string;
  topicIndex: number;
  parentId?: string;
  childIds: string[];
  /** Labels from the top of the topic down to the parent. */
  path: string[];
}

export interface MapEdge {
  id: string;
  from: string;
  to: string;
  type: RelationType;
  label: string;
  why: string;
  compareHref?: string;
}

export interface MapData {
  nodes: MapNode[];
  edges: MapEdge[];
  topics: { id: string; title: string; index: number }[];
  firstConcept: string;
}

export function buildGraph(deck: Deck): MapData {
  const nodes: MapNode[] = [];
  for (const t of deck.tree) {
    const walk = (n: (typeof t.nodes)[number], path: string[]) => {
      const card = n.cardId ? deck.cardById.get(n.cardId) : undefined;
      const term = n.termId ? deck.termById.get(n.termId) : undefined;
      nodes.push({
        id: n.id,
        label: n.label,
        note: n.note ?? (card ? undefined : term?.definition),
        href: nodeHref(deck.slug, n),
        isConcept: Boolean(card),
        hook: card?.meta.hook,
        level: card?.meta.level,
        heat: card?.meta.heat,
        topicId: t.topic.id,
        topicTitle: t.topic.title,
        topicIndex: t.topic.index,
        parentId: n.parentId,
        childIds: n.children.map((c) => c.id),
        path,
      });
      n.children.forEach((c) => walk(c, [...path, n.label]));
    };
    t.nodes.forEach((n) => walk(n, []));
  }

  const edges: MapEdge[] = deck.relations.map((r, i) => ({
    id: `r${i}:${r.from}-${r.type}-${r.to}`,
    from: r.from,
    to: r.to,
    type: r.type,
    label: RELATION_TYPES[r.type].label,
    why: r.why,
    compareHref: r.comparison ? urls.compare(deck.slug, r.comparison) : undefined,
  }));

  return {
    nodes,
    edges,
    topics: deck.topics.map((t) => ({ id: t.id, title: t.title, index: t.index })),
    firstConcept: deck.cards[0]?.meta.id ?? nodes[0]?.id ?? "",
  };
}
