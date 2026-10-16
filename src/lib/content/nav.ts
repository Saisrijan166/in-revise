import { urls } from "../urls";

/** Client-safe helpers for the concept tree (type-only import of the loader). */
export interface NodeLike {
  id: string;
  cardId?: string;
}

/** A concept opens its page; any other node opens the map, focused on it. */
export function nodeHref(tech: string, node: NodeLike): string {
  return node.cardId ? urls.concept(tech, node.cardId) : urls.map(tech, node.id);
}
