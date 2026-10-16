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

/**
 * The concepts nested anywhere below a node, nearest first: the search stops at each concept,
 * so a concept inside another concept is listed by its parent, never twice.
 */
export function conceptsBelow<T extends NodeLike & { children: T[] }>(node: T): T[] {
  return node.children.flatMap((c) => (c.cardId ? [c] : conceptsBelow(c)));
}
