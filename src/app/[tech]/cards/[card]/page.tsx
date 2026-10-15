import type { Metadata } from "next";
import Link from "next/link";
import { cardSummary, getCard, getDeck, getDecks, neighbours, topicOf } from "@/lib/content";
import { renderCard, renderInline, termPreview } from "@/lib/content/render";
import { urls } from "@/lib/urls";
import { formatDate, topicColor } from "@/lib/ui";
import { CanCannot, MistakeBox, SayItBox, Section } from "@/components/card/Blocks";
import { ConnectsPanel } from "@/components/card/Connects";
import { ConnectsSheet } from "@/components/card/ConnectsSheet";
import { StatusControls, VisitTracker } from "@/components/card/StatusControls";
import { SwipeNav } from "@/components/card/SwipeNav";
import { DrillSession, type DrillItem } from "@/components/drill/DrillSession";
import { PreviewLink } from "@/components/mdx/PreviewLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { HeatChip, LevelChip, TopicChip } from "@/components/ui/chips";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBook,
  IconBulb,
  IconCards,
  IconColumns,
  IconHelp,
  IconLink,
  IconMap,
  IconSheet,
} from "@/components/ui/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().flatMap((d) => d.cards.map((c) => ({ tech: d.slug, card: c.meta.id })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[tech]/cards/[card]">): Promise<Metadata> {
  const { tech, card } = await params;
  const deck = getDeck(tech);
  const c = getCard(deck, card);
  return { title: `${c.meta.title} (${deck.name})`, description: c.meta.hook };
}

export default async function CardPage({ params }: PageProps<"/[tech]/cards/[card]">) {
  const { tech, card: id } = await params;
  const deck = getDeck(tech);
  const card = getCard(deck, id);
  const m = card.meta;
  const topic = topicOf(deck, card);
  const r = await renderCard(deck, card);
  const nb = neighbours(deck, id);
  const summary = cardSummary(deck, card);
  const comparisons = m.confusedWith.map((cid) => deck.comparisonById.get(cid)!);
  const connectCount = m.needs.length + m.leadsTo.length + m.related.length + comparisons.length;

  const drillItems: DrillItem[] = [
    {
      key: `${id}:hook`,
      cardId: id,
      cardTitle: m.title,
      cardHref: urls.card(tech, id),
      eyebrow: "In one line",
      q: <>What is {m.title}, in one sentence?</>,
      a: <p>{m.hook}</p>,
    },
    ...r.questions.map((q, i) => ({
      key: `${id}:q${i}`,
      cardId: id,
      cardTitle: m.title,
      cardHref: urls.card(tech, id),
      eyebrow: "Interview question",
      q: renderInline(q.q),
      a: q.a,
    })),
  ];

  return (
    <div className="px-4 pt-5 pb-10 sm:px-6 lg:px-10 xl:grid xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-10">
      <VisitTracker tech={tech} id={id} />
      <SwipeNav prev={nb.topicPrev} next={nb.topicNext}>
        <article className="mx-auto max-w-3xl xl:mx-0">
          <Breadcrumbs
            items={[
              { label: "Home", href: urls.home() },
              { label: deck.name, href: urls.deck(tech) },
              { label: topic.title, href: urls.topic(tech, topic.id) },
              { label: m.title },
            ]}
          />

          <header>
            <div className="flex flex-wrap items-center gap-1.5">
              <LevelChip level={m.level} />
              <HeatChip heat={m.heat} />
              <TopicChip
                title={topic.title}
                color={topicColor(topic.index)}
                href={urls.topic(tech, topic.id)}
              />
            </div>
            <h1 className="mt-3 text-[2rem] leading-tight font-extrabold text-ink sm:text-[2.6rem]">
              {m.title}
            </h1>

            <div
              data-show="learn revise"
              className="relative mt-4 overflow-hidden rounded-2xl border border-line bg-surface p-4 pl-5 shadow-[var(--shadow)] sm:p-5 sm:pl-6"
            >
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-accent" />
              <p className="text-xs font-bold tracking-wider text-accent-ink uppercase">
                In one line
              </p>
              <p className="mt-1 font-display text-[1.2rem] leading-snug font-semibold text-ink sm:text-[1.35rem]">
                {m.hook}
              </p>
            </div>

            <div className="no-print mt-4 flex flex-wrap items-center gap-2">
              <StatusControls tech={tech} id={id} title={m.title} />
              <ConnectsSheet count={connectCount}>
                <ConnectsPanel deck={deck} card={card} />
              </ConnectsSheet>
            </div>
            <p className="mt-3 text-sm text-ink-3">
              <span data-show="learn">About {summary.minutes.learn} min to read in full</span>
              <span data-show="revise">About {summary.minutes.revise} min fast pass</span>
              <span data-show="drill">{drillItems.length} flashcards from this card</span>
              {nb.topicPosition.total > 1 && (
                <span className="md:hidden">
                  {" "}
                  · Swipe for more in {topic.title} ({nb.topicPosition.index}/
                  {nb.topicPosition.total})
                </span>
              )}
            </p>
          </header>

          {/* Mode banners: say what this view is for. */}
          <p
            data-show="revise"
            className="mt-6 rounded-xl border border-dashed border-line-strong px-4 py-3 text-sm text-ink-2"
          >
            <strong className="text-ink">Revise view:</strong> rules, limits, the common mistake,
            and a ready answer. Switch to Learn for the why and how.
          </p>

          {/* ---------- Learn ---------- */}
          {r.why && (
            <Section id="why" title="Why it exists" show="learn" icon={IconHelp}>
              <div className="prose-card">{r.why}</div>
            </Section>
          )}
          {r.how && (
            <Section id="how" title="How it works" show="learn" icon={IconSheet}>
              <div className="prose-card">{r.how}</div>
            </Section>
          )}
          {r.analogy && (
            <Section id="analogy" title="Analogy" show="learn" icon={IconBulb}>
              <div className="prose-card">{r.analogy}</div>
            </Section>
          )}
          {r.example && (
            <Section id="example" title="Example" show="learn" icon={IconCards}>
              <div className="prose-card">{r.example}</div>
            </Section>
          )}

          {/* ---------- Learn + Revise ---------- */}
          {r.rules && (
            <Section id="rules" title="Rules & defaults" show="learn revise">
              <div className="prose-card">{r.rules}</div>
            </Section>
          )}
          {(r.can || r.cannot) && (
            <Section id="can-cannot" title="Can / Cannot" show="learn revise">
              <CanCannot can={r.can} cannot={r.cannot} />
            </Section>
          )}

          {comparisons.length > 0 && (
            <Section id="confused" title="Confused with" show="learn" icon={IconColumns}>
              <ul className="flex flex-col gap-2">
                {comparisons.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={urls.compare(tech, c.id)}
                      className="group block rounded-2xl border border-dashed border-line-strong bg-surface p-4 hover:border-accent"
                    >
                      <span className="font-display font-bold text-ink group-hover:text-accent-ink">
                        {c.title}
                      </span>
                      <span className="mt-1 block text-ink-2">{c.verdict}</span>
                      <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-accent-ink">
                        Compare side by side <IconArrowRight size={15} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {r.questions.length > 0 && (
            <Section id="questions" title="Interview Qs" show="learn" icon={IconHelp}>
              <ol className="flex flex-col gap-3">
                {r.questions.map((q, i) => (
                  <li key={i} className="rounded-2xl border border-line bg-surface p-4">
                    <p className="flex gap-2 font-display text-[1.08rem] font-bold text-ink">
                      <span className="text-accent">Q{i + 1}.</span>
                      <span>{renderInline(q.q)}</span>
                    </p>
                    <div className="prose-card mt-2 text-ink-2">{q.a}</div>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {r.mistake && (
            <section data-show="learn revise" aria-labelledby="mistake" className="mt-9">
              <MistakeBox headingId="mistake">{r.mistake}</MistakeBox>
            </section>
          )}
          {r.sayIt && (
            <section data-show="learn revise" aria-labelledby="say-it" className="mt-6">
              <SayItBox headingId="say-it">{r.sayIt}</SayItBox>
            </section>
          )}

          {r.terms.length > 0 && (
            <Section id="terms" title="Terms in this card" show="learn" icon={IconBook}>
              <ul className="flex flex-wrap gap-2">
                {r.terms.map((t) => (
                  <li
                    key={t.id}
                    className="rounded-xl border border-line bg-surface px-3 py-2 text-base"
                  >
                    <PreviewLink preview={termPreview(deck, t, id)}>{t.term}</PreviewLink>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* ---------- Drill ---------- */}
          <section data-show="drill" aria-label="Drill this card" className="mt-8">
            <DrillSession tech={tech} items={drillItems} />
            <p className="mt-4 text-sm text-ink-3">
              Want more?{" "}
              <Link
                href={urls.drill(tech)}
                className="font-semibold text-accent-ink underline underline-offset-2"
              >
                Drill the whole deck
              </Link>
              .
            </p>
          </section>

          <details
            data-show="learn revise"
            className="mt-10 rounded-2xl border border-line bg-surface"
          >
            <summary className="flex min-h-12 cursor-pointer items-center gap-2 px-4 font-semibold text-ink-2 hover:text-ink">
              <IconLink size={16} /> Sources ({m.sources.length}) · checked{" "}
              {formatDate(m.sources[0].verifiedOn)}
            </summary>
            <ul className="flex flex-col gap-2 border-t border-line px-4 py-3 text-sm">
              {m.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent-ink underline underline-offset-2"
                  >
                    {s.title}
                  </a>
                  <span className="text-ink-3"> · verified {formatDate(s.verifiedOn)}</span>
                </li>
              ))}
            </ul>
          </details>

          <nav
            aria-label="Previous and next card"
            className="no-print mt-8 grid gap-3 sm:grid-cols-2"
          >
            {nb.prev ? (
              <Link
                href={nb.prev.href}
                className="group flex min-h-16 items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 hover:border-line-strong"
              >
                <IconArrowLeft size={20} className="flex-none text-ink-3 group-hover:text-accent" />
                <span>
                  <span className="block text-xs font-bold tracking-wider text-ink-3 uppercase">
                    Previous
                  </span>
                  <span className="font-semibold text-ink">{nb.prev.title}</span>
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {nb.next ? (
              <Link
                href={nb.next.href}
                className="group flex min-h-16 items-center justify-end gap-3 rounded-2xl border border-line bg-surface px-4 py-3 text-right hover:border-line-strong"
              >
                <span>
                  <span className="block text-xs font-bold tracking-wider text-ink-3 uppercase">
                    Next
                  </span>
                  <span className="font-semibold text-ink">{nb.next.title}</span>
                </span>
                <IconArrowRight
                  size={20}
                  className="flex-none text-ink-3 group-hover:text-accent"
                />
              </Link>
            ) : (
              <Link
                href={urls.drill(tech)}
                className="group flex min-h-16 items-center justify-end gap-3 rounded-2xl border border-accent bg-accent-soft px-4 py-3 text-right"
              >
                <span>
                  <span className="block text-xs font-bold tracking-wider text-accent-ink uppercase">
                    End of the line
                  </span>
                  <span className="font-semibold text-ink">Drill the whole deck</span>
                </span>
                <IconMap size={20} className="flex-none text-accent" />
              </Link>
            )}
          </nav>
        </article>
      </SwipeNav>

      <aside className="no-print hidden xl:block" aria-label="Connects to">
        <div className="sticky top-20 max-h-[calc(100dvh-6rem)] overflow-y-auto pb-6">
          <ConnectsPanel deck={deck} card={card} />
        </div>
      </aside>
    </div>
  );
}
