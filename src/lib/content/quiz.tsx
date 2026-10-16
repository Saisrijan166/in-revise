import type { Card, Deck } from "./load";
import type { RenderedCard } from "./render";
import { RELATION_TYPES } from "./schema";
import { renderInline } from "../inline";
import { urls } from "../urls";
import type { QuizItem } from "@/components/quiz/QuizSession";

export type QuizKind = "one-liner" | "trap" | "question" | "connection";

export interface QuizItemWithKind extends QuizItem {
  kind: QuizKind;
  topic: string;
}

/**
 * Flashcards for one concept, all from content that already exists (no extra writing):
 * the one-liner, the trap, the interview questions, and each relation ("X needs … ?").
 */
export function quizItems(deck: Deck, card: Card, r: RenderedCard): QuizItemWithKind[] {
  const m = card.meta;
  const base = {
    cardId: m.id,
    cardTitle: m.title,
    cardHref: urls.concept(deck.slug, m.id),
    topic: m.topic,
  };
  const items: QuizItemWithKind[] = [
    {
      ...base,
      key: `${m.id}:hook`,
      kind: "one-liner",
      eyebrow: "In one line",
      q: <>What is {m.title}, in one line?</>,
      a: <p>{m.hook}</p>,
    },
  ];
  if (m.trap) {
    items.push({
      ...base,
      key: `${m.id}:trap`,
      kind: "trap",
      eyebrow: "Right or wrong?",
      q: <>&ldquo;{renderInline(m.trap.wrong)}&rdquo;</>,
      a: (
        <p>
          <strong>Wrong.</strong> {renderInline(m.trap.right)}
        </p>
      ),
    });
  }
  r.questions.forEach((q, i) =>
    items.push({ ...base, key: `${m.id}:q${i}`, kind: "question", eyebrow: "Interview question", q: renderInline(q.q), a: q.a }),
  );
  deck.relations
    .filter((rel) => rel.card === m.id && rel.type !== "vs")
    .forEach((rel, i) => {
      const from = deck.nodeById.get(rel.from)!;
      const to = deck.nodeById.get(rel.to)!;
      items.push({
        ...base,
        key: `${m.id}:rel${i}`,
        kind: "connection",
        eyebrow: "Connection",
        q: (
          <>
            {from.label} {RELATION_TYPES[rel.type].label} … what? And why?
          </>
        ),
        a: (
          <p>
            <strong>{to.label}.</strong> {rel.why}
          </p>
        ),
      });
    });
  return items;
}
