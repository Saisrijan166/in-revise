import type { Metadata } from "next";
import Link from "next/link";
import { cardSummary, getDeck, getDecks } from "@/lib/content";
import { urls } from "@/lib/urls";
import { plural } from "@/lib/ui";
import { DeckBrowser } from "@/components/deck/DeckBrowser";
import { ContinueLink } from "@/components/deck/ContinueLink";
import { ProgressBar } from "@/components/deck/ProgressBar";
import { StorySpine } from "@/components/deck/StorySpine";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  IconArrowRight,
  IconBook,
  IconCards,
  IconColumns,
  IconMap,
  IconSheet,
} from "@/components/ui/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().map((d) => ({ tech: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[tech]">): Promise<Metadata> {
  const { tech } = await params;
  const deck = getDeck(tech);
  return { title: deck.name, description: deck.summary };
}

export default async function DeckPage({ params }: PageProps<"/[tech]">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  const cards = deck.cards.map((c) => cardSummary(deck, c));
  const tools = [
    { label: "Map", sub: "See how ideas connect", href: urls.map(tech), icon: IconMap },
    { label: "Drill", sub: "Flashcards and quick Qs", href: urls.drill(tech), icon: IconCards },
    {
      label: "Cheat sheets",
      sub: "One page per topic",
      href: urls.cheatsheetIndex(tech),
      icon: IconSheet,
    },
    {
      label: "Glossary",
      sub: `${plural(deck.glossary.length, "interviewer term")}`,
      href: urls.glossary(tech),
      icon: IconBook,
    },
    {
      label: "Compare",
      sub: `${plural(deck.comparisons.length, "confusing pair")}`,
      href: urls.compareIndex(tech),
      icon: IconColumns,
    },
  ];

  return (
    <div className="px-4 pt-5 pb-12 sm:px-6 lg:px-10">
      <Breadcrumbs items={[{ label: "Home", href: urls.home() }, { label: deck.name }]} />

      <header className="map-paper relative overflow-hidden rounded-3xl border border-line bg-surface p-5 sm:p-8">
        <p className="text-xs font-bold tracking-widest text-accent-ink uppercase">
          Deck · {plural(deck.cards.length, "card")} · {plural(deck.topics.length, "topic")}
        </p>
        <h1 className="mt-2 text-4xl leading-none font-extrabold sm:text-5xl">{deck.name}</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-2">{deck.summary}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <ContinueLink
            tech={tech}
            firstHref={cards[0]?.href ?? urls.deck(tech)}
            titles={Object.fromEntries(cards.map((c) => [c.id, c.title]))}
          />
          <Link
            href={urls.review(tech)}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-line bg-surface px-4 font-bold text-ink-2 hover:border-line-strong hover:text-ink"
          >
            Shaky only
          </Link>
        </div>
        <ProgressBar
          tech={tech}
          ids={cards.map((c) => c.id)}
          label="Your progress"
          className="mt-6 max-w-md"
        />
      </header>

      <nav aria-label="Deck tools" className="mt-5">
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 2xl:grid-cols-5">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <li key={t.label}>
                <Link
                  href={t.href}
                  className="group flex h-full min-h-16 items-center gap-3 rounded-2xl border border-line bg-surface px-3 py-2.5 hover:border-accent"
                >
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-accent-soft text-accent-ink">
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-bold text-ink group-hover:text-accent-ink">
                      {t.label}
                    </span>
                    <span className="block truncate text-xs text-ink-3">{t.sub}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-10 grid gap-10 2xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <section aria-labelledby="story">
          <h2 id="story" className="text-2xl font-extrabold">
            The story
          </h2>
          <p className="mt-1 mb-4 text-ink-2">
            The whole deck as one line: each stop is a problem and the idea that fixes it.
          </p>
          <StorySpine deck={deck} />
        </section>

        <section aria-labelledby="cards">
          <h2 id="cards" className="mb-4 text-2xl font-extrabold">
            Cards by topic
          </h2>
          <DeckBrowser tech={tech} topics={deck.topics} cards={cards} />

          {deck.comparisons.length > 0 && (
            <div className="mt-10">
              <h3 className="mb-3 text-xl font-extrabold">Often confused</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {deck.comparisons.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={urls.compare(tech, c.id)}
                      className="group flex h-full flex-col rounded-2xl border border-dashed border-line-strong bg-surface p-4 hover:border-accent"
                    >
                      <span className="flex items-center gap-2 font-display text-lg font-bold text-ink group-hover:text-accent-ink">
                        <IconColumns size={18} className="text-accent" /> {c.title}
                      </span>
                      <span className="mt-1 text-base text-ink-2">{c.verdict}</span>
                      <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-bold text-accent-ink">
                        Side by side <IconArrowRight size={15} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
