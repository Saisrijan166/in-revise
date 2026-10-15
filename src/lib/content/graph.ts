import type { Deck } from "./load";
import type { Level } from "./schema";
import { urls } from "../urls";

/**
 * Concept graph for the Map view (CLAUDE.md 5.2 #4). Nodes are cards; edges come from
 * needs / leadsTo / related. Depth = learning order (prerequisites sit before what needs them).
 */

export type EdgeKind = "needs" | "leadsTo" | "related";

export interface MapNode {
  id: string;
  title: string;
  hook: string;
  level: Level;
  heat: number;
  topic: string;
  topicTitle: string;
  topicIndex: number;
  href: string;
  depth: number;
  /** Position inside its depth column, ordered by topic then reading order. */
  row: number;
  comparisons: { title: string; href: string }[];
}

export interface MapEdge {
  id: string;
  source: string;
  target: string;
  kind: EdgeKind;
}

export interface MapData {
  nodes: MapNode[];
  edges: MapEdge[];
  topics: { id: string; title: string; index: number }[];
  maxDepth: number;
  maxRow: number;
}

export function buildGraph(deck: Deck): MapData {
  const ids = deck.cards.map((c) => c.meta.id);
  const order = new Map(ids.map((id, i) => [id, i]));

  // Edges, de-duplicated per pair: needs > leadsTo > related.
  const rank: Record<EdgeKind, number> = { needs: 3, leadsTo: 2, related: 1 };
  const byPair = new Map<string, MapEdge>();
  const add = (source: string, target: string, kind: EdgeKind) => {
    const pair = [source, target].sort().join("|");
    const prev = byPair.get(pair);
    if (!prev || rank[kind] > rank[prev.kind])
      byPair.set(pair, { id: `${kind}:${source}->${target}`, source, target, kind });
  };
  for (const c of deck.cards) {
    for (const n of c.meta.needs) add(n, c.meta.id, "needs");
    for (const n of c.meta.leadsTo) add(c.meta.id, n, "leadsTo");
    for (const n of c.meta.related) add(c.meta.id, n, "related");
  }
  const edges = [...byPair.values()];

  // Depth by relaxation over directed edges (bounded, so a cycle cannot loop forever).
  const depth = new Map(ids.map((id) => [id, 0]));
  const directed = edges.filter((e) => e.kind !== "related");
  for (let pass = 0; pass < ids.length; pass++) {
    let changed = false;
    for (const e of directed) {
      const want = depth.get(e.source)! + 1;
      if (want > depth.get(e.target)! && want < ids.length) {
        depth.set(e.target, want);
        changed = true;
      }
    }
    if (!changed) break;
  }

  const topicIndex = new Map(deck.topics.map((t) => [t.id, t.index]));
  const columns = new Map<number, string[]>();
  for (const id of ids) {
    const d = depth.get(id)!;
    columns.set(d, [...(columns.get(d) ?? []), id]);
  }
  const rowOf = new Map<string, number>();
  for (const col of columns.values()) {
    col
      .sort((a, b) => {
        const ta = topicIndex.get(deck.cardById.get(a)!.meta.topic)!;
        const tb = topicIndex.get(deck.cardById.get(b)!.meta.topic)!;
        return ta - tb || order.get(a)! - order.get(b)!;
      })
      .forEach((id, i) => rowOf.set(id, i));
  }

  const nodes: MapNode[] = deck.cards.map((c) => {
    const topic = deck.topics.find((t) => t.id === c.meta.topic)!;
    return {
      id: c.meta.id,
      title: c.meta.title,
      hook: c.meta.hook,
      level: c.meta.level,
      heat: c.meta.heat,
      topic: topic.id,
      topicTitle: topic.title,
      topicIndex: topic.index,
      href: urls.card(deck.slug, c.meta.id),
      depth: depth.get(c.meta.id)!,
      row: rowOf.get(c.meta.id)!,
      comparisons: c.meta.confusedWith.map((id) => ({
        title: deck.comparisonById.get(id)!.title,
        href: urls.compare(deck.slug, id),
      })),
    };
  });

  return {
    nodes,
    edges,
    topics: deck.topics.map((t) => ({ id: t.id, title: t.title, index: t.index })),
    maxDepth: Math.max(0, ...nodes.map((n) => n.depth)),
    maxRow: Math.max(0, ...nodes.map((n) => n.row)),
  };
}
