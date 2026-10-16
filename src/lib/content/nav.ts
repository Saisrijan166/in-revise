import { urls } from "../urls";

/** Client-safe helpers for the concept tree (type-only import of the loader). */
export interface NodeLike {
  id: string;
  cardId?: string;
}

/** A concept opens its page; any other node (a type or part) opens its place in the Tree. */
export function nodeHref(tech: string, node: NodeLike): string {
  return node.cardId ? urls.concept(tech, node.cardId) : urls.tree(tech, node.id);
}
