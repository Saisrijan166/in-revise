import type { Metadata } from "next";
import { getDeck, getDecks } from "@/lib/content";
import { quizItems } from "@/lib/content/quiz";
import { renderCard } from "@/lib/content/render";
import { urls } from "@/lib/urls";
import { QuizDeck, type QuizDeckItem } from "@/components/quiz/QuizDeck";
import { PageHeader } from "@/components/ui/Breadcrumbs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().map((d) => ({ tech: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[tech]/quiz">): Promise<Metadata> {
  const { tech } = await params;
  return {
    title: `Quiz (${getDeck(tech).name})`,
    description: "Question first, tap to see the answer.",
  };
}

export default async function QuizPage({ params }: PageProps<"/[tech]/quiz">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  const items: QuizDeckItem[] = [];
  for (const card of deck.cards) items.push(...quizItems(deck, card, await renderCard(deck, card)));
  return (
    <div className="mx-auto max-w-3xl px-4 pt-4 pb-12 sm:px-6 lg:px-10">
      <PageHeader
        crumbs={[
          { label: "Home", href: urls.home() },
          { label: deck.name, href: urls.overview(tech) },
          { label: "Quiz" },
        ]}
        title="Quiz"
        lead="Say the answer out loud first, then tap the card to check."
      />
      <QuizDeck topics={deck.topics.map((t) => ({ id: t.id, title: t.title }))} items={items} />
    </div>
  );
}
