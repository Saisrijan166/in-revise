import type { Metadata } from "next";
import { getDeck, getDecks, topicOf } from "@/lib/content";
import { renderCard } from "@/lib/content/render";
import { urls } from "@/lib/urls";
import { ReviseBody } from "@/components/card/Blocks";
import { ReviewList, type ReviewEntry } from "@/components/deck/ReviewList";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().map((d) => ({ tech: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[tech]/review">): Promise<Metadata> {
  const { tech } = await params;
  return { title: `Review list (${getDeck(tech).name})` };
}

export default async function ReviewPage({ params }: PageProps<"/[tech]/review">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  const entries: ReviewEntry[] = [];
  for (const card of deck.cards) {
    const r = await renderCard(deck, card);
    entries.push({
      id: card.meta.id,
      title: card.meta.title,
      href: urls.card(tech, card.meta.id),
      topicTitle: topicOf(deck, card).title,
      hook: card.meta.hook,
      body: <ReviseBody r={r} />,
    });
  }
  return (
    <div className="mx-auto max-w-4xl px-4 pt-5 pb-12 sm:px-6 lg:px-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: urls.home() },
          { label: deck.name, href: urls.deck(tech) },
          { label: "Review list" },
        ]}
      />
      <h1 className="text-3xl font-extrabold sm:text-4xl">Review list</h1>
      <p className="mt-1 mb-5 text-ink-2">
        Only the cards you flagged, in the fast Revise view. Ideal the night before.
      </p>
      <ReviewList tech={tech} entries={entries} />
    </div>
  );
}
