import { notFound } from "next/navigation";
import { loadDecks, readingStats, type Card, type Deck, type TreeNode } from "./load";
import { nodeHref } from "./nav";
import type { Accent, Level } from "./schema";
import { urls } from "../urls";

/**
 * Build-time content access for pages. Loads once per process and refuses to
 * render if the content has errors (the validator reports them in detail).
 */

let cache: Deck[] | null = null;

export function getDecks(): Deck[] {
  // Content files are edited independently of this module. In `next dev`, keeping the
  // process-wide cache would hide a newly added deck until the server restarts. Static
  // production builds still cache the parsed result for their process.
  if (cache && process.env.NODE_ENV === "production") return cache;
  const { decks, issues } = loadDecks();
  const errors = issues.filter((i) => i.severity === "error");
  if (errors.length) {
    const list = errors.map((e) => `  ${e.file}: ${e.message}`).join("\n");
    throw new Error(`Content has ${errors.length} error(s). Run "npm run validate:content".\n${list}`);
  }
  if (process.env.NODE_ENV === "production") cache = decks;
  return decks;
}

export function getDeck(slug: string): Deck {
  const deck = getDecks().find((d) => d.slug === slug);
  if (!deck) notFound();
  return deck;
}

export function getCard(deck: Deck, id: string): Card {
  const card = deck.cardById.get(id);
  if (!card) notFound();
  return card;
}

/* ---------- Serializable view models for client components ---------- */

export interface TechSummary {
  slug: string;
  name: string;
  accent: Accent;
  summary: string;
  conceptCount: number;
  topicCount: number;
  comparisonCount: number;
  termCount: number;
  typeCount: number;
  firstHref: string | null;
}

/** One row of the concept tree, ready for the sidebar and the Topics sheet. */
export interface NavNode {
  id: string;
  label: string;
  href: string;
  isConcept: boolean;
  children: NavNode[];
}

export interface TechNav {
  slug: string;
  name: string;
  accent: Accent;
  topics: { id: string; title: string; index: number; nodes: NavNode[] }[];
}

/** Reading time in whole minutes, at a calm 200 words per minute, never below 1. */
export const minutes = (words: number) => Math.max(1, Math.round(words / 200));

export function cardMinutes(card: Card) {
  const s = readingStats(card);
  return { learn: minutes(s.learn), revise: minutes(s.revise) };
}

export function techSummary(deck: Deck): TechSummary {
  return {
    slug: deck.slug,
    name: deck.name,
    accent: deck.accent,
    summary: deck.summary,
    conceptCount: deck.cards.length,
    topicCount: deck.topics.length,
    comparisonCount: deck.comparisons.length,
    termCount: deck.glossary.length,
    typeCount: deck.nodeById.size - deck.cards.length,
    firstHref: deck.cards[0] ? urls.concept(deck.slug, deck.cards[0].meta.id) : null,
  };
}

function toNav(slug: string, n: TreeNode): NavNode {
  return {
    id: n.id,
    label: n.label,
    href: nodeHref(slug, n),
    isConcept: Boolean(n.cardId),
    children: n.children.map((c) => toNav(slug, c)),
  };
}

export function techNav(deck: Deck): TechNav {
  return {
    slug: deck.slug,
    name: deck.name,
    accent: deck.accent,
    topics: deck.tree.map((t) => ({
      id: t.topic.id,
      title: t.topic.title,
      index: t.topic.index,
      nodes: t.nodes.map((n) => toNav(deck.slug, n)),
    })),
  };
}

/** Previous / next concept in reading (tree) order, plus previous / next inside the same topic. */
export function neighbours(deck: Deck, id: string) {
  const i = deck.cards.findIndex((c) => c.meta.id === id);
  const card = deck.cards[i];
  const inTopic = deck.cards.filter((c) => c.meta.topic === card.meta.topic);
  const j = inTopic.findIndex((c) => c.meta.id === id);
  const link = (c: Card | undefined) =>
    c ? { id: c.meta.id, title: c.meta.title, href: urls.concept(deck.slug, c.meta.id) } : null;
  return {
    prev: link(deck.cards[i - 1]),
    next: link(deck.cards[i + 1]),
    topicPrev: link(inTopic[j - 1]),
    topicNext: link(inTopic[j + 1]),
    topicPosition: { index: j + 1, total: inTopic.length },
  };
}

export function topicOf(deck: Deck, card: Card) {
  return deck.topics.find((t) => t.id === card.meta.topic)!;
}

/** Parent chain of a node, from the top of its topic down to (not including) the node. */
export function ancestors(deck: Deck, node: TreeNode): TreeNode[] {
  const out: TreeNode[] = [];
  let p = node.parentId ? deck.nodeById.get(node.parentId) : undefined;
  while (p) {
    out.unshift(p);
    p = p.parentId ? deck.nodeById.get(p.parentId) : undefined;
  }
  return out;
}

export type { Level };
