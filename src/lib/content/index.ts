import { notFound } from "next/navigation";
import { loadDecks, readingStats, type Card, type Deck } from "./load";
import type { Accent, Level } from "./schema";
import { urls } from "../urls";

/**
 * Build-time content access for pages. Loads once per process and refuses to
 * render if the content has errors (the validator reports them in detail).
 */

let cache: Deck[] | null = null;

export function getDecks(): Deck[] {
  if (cache) return cache;
  const { decks, issues } = loadDecks();
  const errors = issues.filter((i) => i.severity === "error");
  if (errors.length) {
    const list = errors.map((e) => `  ${e.file}: ${e.message}`).join("\n");
    throw new Error(`Content has ${errors.length} error(s). Run "npm run validate:content".\n${list}`);
  }
  cache = decks;
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

export interface CardSummary {
  id: string;
  title: string;
  topic: string;
  topicTitle: string;
  topicIndex: number;
  level: Level;
  heat: number;
  hook: string;
  href: string;
  tags: string[];
  minutes: { learn: number; revise: number };
}

export interface DeckSummary {
  slug: string;
  name: string;
  accent: Accent;
  summary: string;
  cardIds: string[];
  topicCount: number;
  comparisonCount: number;
  termCount: number;
  firstCardHref: string | null;
}

export interface NavTopic {
  id: string;
  title: string;
  index: number;
  cards: { id: string; title: string; href: string }[];
}

export interface DeckNav {
  slug: string;
  name: string;
  accent: Accent;
  topics: NavTopic[];
  cardIds: string[];
}

/** Reading time in whole minutes, at a calm 200 words per minute, never below 1. */
const minutes = (words: number) => Math.max(1, Math.round(words / 200));

export function cardSummary(deck: Deck, card: Card): CardSummary {
  const topic = deck.topics.find((t) => t.id === card.meta.topic)!;
  const stats = readingStats(card);
  return {
    id: card.meta.id,
    title: card.meta.title,
    topic: topic.id,
    topicTitle: topic.title,
    topicIndex: topic.index,
    level: card.meta.level,
    heat: card.meta.heat,
    hook: card.meta.hook,
    href: urls.card(deck.slug, card.meta.id),
    tags: card.meta.tags,
    minutes: { learn: minutes(stats.learn), revise: minutes(stats.revise) },
  };
}

export function deckSummary(deck: Deck): DeckSummary {
  return {
    slug: deck.slug,
    name: deck.name,
    accent: deck.accent,
    summary: deck.summary,
    cardIds: deck.cards.map((c) => c.meta.id),
    topicCount: deck.topics.length,
    comparisonCount: deck.comparisons.length,
    termCount: deck.glossary.length,
    firstCardHref: deck.cards[0] ? urls.card(deck.slug, deck.cards[0].meta.id) : null,
  };
}

export function deckNav(deck: Deck): DeckNav {
  return {
    slug: deck.slug,
    name: deck.name,
    accent: deck.accent,
    cardIds: deck.cards.map((c) => c.meta.id),
    topics: deck.topics.map((t) => ({
      id: t.id,
      title: t.title,
      index: t.index,
      cards: deck.cards
        .filter((c) => c.meta.topic === t.id)
        .map((c) => ({ id: c.meta.id, title: c.meta.title, href: urls.card(deck.slug, c.meta.id) })),
    })),
  };
}

/** Previous/next across the whole deck, plus previous/next inside the same topic (for swipe). */
export function neighbours(deck: Deck, id: string) {
  const i = deck.cards.findIndex((c) => c.meta.id === id);
  const card = deck.cards[i];
  const inTopic = deck.cards.filter((c) => c.meta.topic === card.meta.topic);
  const j = inTopic.findIndex((c) => c.meta.id === id);
  const link = (c: Card | undefined) => (c ? { id: c.meta.id, title: c.meta.title, href: urls.card(deck.slug, c.meta.id) } : null);
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
