import type { Metadata } from "next";
import Link from "next/link";
import { getDeck, getDecks, techSummary } from "@/lib/content";
import { nodeHref } from "@/lib/content/nav";
import { urls } from "@/lib/urls";
import { plural, topicColor } from "@/lib/ui";
import { CompareGist } from "@/components/compare/CompareView";
import { StorySpine } from "@/components/deck/StorySpine";
import { PageHeader } from "@/components/ui/Breadcrumbs";
import { HeatChip, LevelChip } from "@/components/ui/chips";
import { IconArrowRight, IconCards, IconSheet } from "@/components/ui/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().map((d) => ({ tech: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[tech]">): Promise<Metadata> {
  const { tech } = await params;
  const deck = getDeck(tech);
  return { title: deck.name, description: deck.summary };
}

export default async function OverviewPage({ params }: PageProps<"/[tech]">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  const s = techSummary(deck);

  return (
    <div className="mx-auto max-w-5xl px-4 pt-4 pb-12 sm:px-6 lg:px-10">
      <PageHeader
        crumbs={[{ label: "Home", href: urls.home() }, { label: deck.name }]}
        eyebrow="Overview"
        title={deck.name}
        lead={deck.summary}
      >
        <p className="mt-2 text-sm font-semibold text-ink-3">
          {plural(s.conceptCount, "concept")} · {plural(s.typeCount, "type")} and parts ·{" "}
          {plural(s.comparisonCount, "comparison")} · {plural(s.termCount, "term")}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {s.firstHref && (
            <Link
              href={s.firstHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-accent px-4 font-bold text-on-accent hover:bg-accent-strong"
            >
              Start learning <IconArrowRight size={18} />
            </Link>
          )}
          <Link
            href={urls.cheatsheet(tech)}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-line bg-surface px-4 font-bold text-ink-2 hover:border-accent hover:text-ink"
          >
            <IconSheet size={18} /> Revise it all
          </Link>
          <Link
            href={urls.quiz(tech)}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-line bg-surface px-4 font-bold text-ink-2 hover:border-accent hover:text-ink"
          >
            <IconCards size={18} /> Quiz yourself
          </Link>
        </div>
      </PageHeader>

      <section aria-labelledby="story" className="mt-10">
        <h2 id="story" className="text-2xl font-extrabold">
          The story in 10 stops
        </h2>
        <p className="mt-1 mb-4 text-ink-2">
          Each stop is a problem and the idea that fixes it. Read it once and the whole tech hangs
          together.
        </p>
        <StorySpine deck={deck} />
      </section>

      <section aria-labelledby="topics" className="mt-12">
        <h2 id="topics" className="text-2xl font-extrabold">
          Topics
        </h2>
        <p className="mt-1 mb-4 text-ink-2">
          Every concept with its one-line meaning and the types inside it.
        </p>
        <div className="flex flex-col gap-8">
          {deck.tree.map(({ topic, nodes }) => (
            <div key={topic.id} id={`topic-${topic.id}`} className="scroll-mt-24">
              <h3 className="mb-2 flex items-center gap-2.5 text-lg font-extrabold">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-8 rounded-full"
                  style={{ background: topicColor(topic.index) }}
                />
                {topic.title}
                {topic.blurb && (
                  <span className="text-base font-normal text-ink-3">· {topic.blurb}</span>
                )}
              </h3>
              <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
                {nodes.map((n) => {
                  const card = n.cardId ? deck.cardById.get(n.cardId) : undefined;
                  return (
                    <li key={n.id} className="px-4 py-3.5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <Link
                          href={nodeHref(tech, n)}
                          className={
                            card
                              ? "inline-flex min-h-10 items-center font-display text-lg font-bold text-ink hover:text-accent-ink"
                              : "inline-flex min-h-10 items-center font-bold text-ink hover:text-accent-ink"
                          }
                        >
                          {n.label}
                        </Link>
                        {card && <LevelChip level={card.meta.level} />}
                        {card && <HeatChip heat={card.meta.heat} compact />}
                      </div>
                      {(card?.meta.hook ?? n.note) && (
                        <p className="mt-0.5 text-ink-2">{card?.meta.hook ?? n.note}</p>
                      )}
                      {n.children.length > 0 && (
                        <ul
                          className="mt-2 flex flex-wrap gap-1.5"
                          aria-label={`Inside ${n.label}`}
                        >
                          {n.children.map((c) => (
                            <li key={c.id}>
                              <Link
                                href={nodeHref(tech, c)}
                                className={
                                  c.cardId
                                    ? "inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-accent px-2.5 text-sm font-bold text-on-accent hover:bg-accent-strong"
                                    : "inline-flex min-h-9 items-center rounded-lg bg-surface-2 px-2.5 text-sm font-semibold text-ink-2 hover:bg-accent-soft hover:text-accent-ink"
                                }
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {deck.comparisons.length > 0 && (
        <section aria-labelledby="confused" className="mt-12">
          <h2 id="confused" className="text-2xl font-extrabold">
            Often confused
          </h2>
          <p className="mt-1 mb-4 text-ink-2">
            The difference in one line each. Open one for the diagram and the full table.
          </p>
          <ul className="flex flex-col gap-3">
            {deck.comparisons.map((c) => (
              <li key={c.id} className="rounded-2xl border border-line bg-surface p-4">
                <Link
                  href={urls.compare(tech, c.id)}
                  className="mb-2 inline-flex min-h-10 items-center gap-1.5 font-display text-lg font-bold text-ink hover:text-accent-ink"
                >
                  {c.title} <IconArrowRight size={16} />
                </Link>
                <CompareGist deck={deck} c={c} size="sm" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
