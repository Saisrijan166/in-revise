import type { Metadata } from "next";
import { getDeck, getDecks } from "@/lib/content";
import { renderCard, renderInline } from "@/lib/content/render";
import { urls } from "@/lib/urls";
import { DeckDrill, type DeckDrillItem } from "@/components/drill/DeckDrill";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().map((d) => ({ tech: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[tech]/drill">): Promise<Metadata> {
  const { tech } = await params;
  return {
    title: `Drill (${getDeck(tech).name})`,
    description: "Flashcards and quick interview questions.",
  };
}

export default async function DrillPage({ params }: PageProps<"/[tech]/drill">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  const items: DeckDrillItem[] = [];
  for (const card of deck.cards) {
    const r = await renderCard(deck, card);
    const base = {
      cardId: card.meta.id,
      cardTitle: card.meta.title,
      cardHref: urls.card(tech, card.meta.id),
      topic: card.meta.topic,
    };
    items.push({
      ...base,
      key: `${card.meta.id}:hook`,
      kind: "hook",
      eyebrow: "In one line",
      q: <>What is {card.meta.title}, in one sentence?</>,
      a: <p>{card.meta.hook}</p>,
    });
    r.questions.forEach((q, i) =>
      items.push({
        ...base,
        key: `${card.meta.id}:q${i}`,
        kind: "question",
        eyebrow: "Interview question",
        q: renderInline(q.q),
        a: q.a,
      }),
    );
  }
  return (
    <div className="mx-auto max-w-5xl px-4 pt-5 pb-12 sm:px-6 lg:px-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: urls.home() },
          { label: deck.name, href: urls.deck(tech) },
          { label: "Drill" },
        ]}
      />
      <h1 className="text-3xl font-extrabold sm:text-4xl">Drill</h1>
      <p className="mt-1 mb-6 text-ink-2">
        Say the answer out loud first, then flip. Be honest with the rating: shaky cards come back
        in your review list.
      </p>
      <DeckDrill
        tech={tech}
        topics={deck.topics.map((t) => ({ id: t.id, title: t.title }))}
        items={items}
      />
    </div>
  );
}
