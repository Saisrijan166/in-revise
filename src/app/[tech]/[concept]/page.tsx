import type { Metadata } from "next";
import Link from "next/link";
import {
  ancestors,
  cardMinutes,
  getCard,
  getDeck,
  getDecks,
  neighbours,
  topicOf,
} from "@/lib/content";
import { nodeHref } from "@/lib/content/nav";
import { quizItems } from "@/lib/content/quiz";
import { renderCard, termPreview } from "@/lib/content/render";
import { renderInline } from "@/lib/inline";
import { urls } from "@/lib/urls";
import { formatDate } from "@/lib/ui";
import { KeyPoints, SayIt, Section, Trap } from "@/components/card/Blocks";
import { PageAside, type TocItem } from "@/components/card/PageAside";
import { SwipeNav } from "@/components/card/SwipeNav";
import { CompareGist } from "@/components/compare/CompareView";
import { PreviewLink } from "@/components/mdx/PreviewLink";
import { QuizSession } from "@/components/quiz/QuizSession";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { HeatChip, LevelChip } from "@/components/ui/chips";
import {
  IconAlert,
  IconArrowLeft,
  IconArrowRight,
  IconBook,
  IconBulb,
  IconCards,
  IconCheck,
  IconColumns,
  IconHelp,
  IconLink,
  IconSheet,
  IconSliders,
} from "@/components/ui/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().flatMap((d) => d.cards.map((c) => ({ tech: d.slug, concept: c.meta.id })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[tech]/[concept]">): Promise<Metadata> {
  const { tech, concept } = await params;
  const deck = getDeck(tech);
  const c = getCard(deck, concept);
  return { title: `${c.meta.title} (${deck.name})`, description: c.meta.hook };
}

export default async function ConceptPage({ params }: PageProps<"/[tech]/[concept]">) {
  const { tech, concept: id } = await params;
  const deck = getDeck(tech);
  const card = getCard(deck, id);
  const m = card.meta;
  const topic = topicOf(deck, card);
  const node = deck.nodeById.get(id)!;
  const parents = ancestors(deck, node);
  const r = await renderCard(deck, card);
  const nb = neighbours(deck, id);
  const mins = cardMinutes(card);
  // A comparison already shown inside "How it works" is not repeated under "Often confused".
  const embedded = new Set(
    [...(card.sections.how ?? "").matchAll(/<Compare\s+id="([^"]+)"/g)].map((x) => x[1]),
  );
  const comparisons = m.confusedWith
    .filter((cid) => !embedded.has(cid))
    .map((cid) => deck.comparisonById.get(cid)!);
  const quiz = quizItems(deck, card, r);

  // Sections in display order; "show" = modes in which the section is visible.
  const toc: TocItem[] = [
    r.why && { id: "why", label: "Why it exists", show: "learn" },
    r.how && { id: "how", label: "How it works", show: "learn" },
    r.analogy && { id: "analogy", label: "Analogy", show: "learn" },
    r.example && { id: "example", label: "Example", show: "learn" },
    { id: "points", label: "Key points", show: "learn revise" },
    r.defaults && { id: "defaults", label: "Defaults", show: "learn" },
    m.trap && { id: "trap", label: "Common trap", show: "learn revise" },
    comparisons.length > 0 && { id: "confused", label: "Often confused", show: "learn" },
    r.questions.length > 0 && { id: "questions", label: "Interview questions", show: "learn" },
    m.sayIt && { id: "say-it", label: "Say it like this", show: "learn revise" },
    { id: "quiz", label: "Quiz", show: "quiz" },
  ].filter((x): x is TocItem => Boolean(x));

  return (
    <div className="px-4 pt-4 pb-12 sm:px-6 lg:px-10 xl:grid xl:grid-cols-[minmax(0,1fr)_250px] xl:gap-10">
      <SwipeNav prev={nb.topicPrev} next={nb.topicNext}>
        <article className="mx-auto max-w-3xl xl:mx-0">
          <Breadcrumbs
            items={[
              { label: deck.name, href: urls.overview(tech) },
              { label: topic.title, href: urls.topic(tech, topic.id) },
              ...parents.map((p) => ({ label: p.label, href: nodeHref(tech, p) })),
              { label: m.title },
            ]}
          />

          <header>
            <h1 className="text-[2rem] leading-tight font-extrabold text-ink sm:text-[2.5rem]">
              {m.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-sm text-ink-3">
              <LevelChip level={m.level} />
              <HeatChip heat={m.heat} />
              <span className="ml-1">
                <span data-show="learn">{mins.learn} min read</span>
                <span data-show="revise">{mins.revise} min revise</span>
                <span data-show="quiz">{quiz.length} quick questions</span>
              </span>
            </div>

            <div
              data-show="learn revise"
              className="relative mt-4 overflow-hidden rounded-2xl border border-line bg-surface py-4 pr-4 pl-5 shadow-[var(--shadow)] sm:pl-6"
            >
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-accent" />
              <p className="text-xs font-bold tracking-wider text-accent-ink uppercase">
                In one line
              </p>
              <p className="mt-1 font-display text-[1.2rem] leading-snug font-semibold text-ink sm:text-[1.3rem]">
                {m.hook}
              </p>
            </div>
          </header>

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

          {/* ---------- Learn + Revise: the parts to remember ---------- */}
          <Section id="points" title="Key points" show="learn revise" icon={IconCheck}>
            <KeyPoints points={m.points} />
          </Section>
          {r.defaults && (
            <Section id="defaults" title="Defaults" show="learn" icon={IconSliders}>
              <div className="prose-card">{r.defaults}</div>
            </Section>
          )}
          {m.trap && (
            <Section id="trap" title="Common trap" show="learn revise" icon={IconAlert}>
              <Trap wrong={m.trap.wrong} right={m.trap.right} />
            </Section>
          )}

          {comparisons.length > 0 && (
            <Section id="confused" title="Often confused" show="learn" icon={IconColumns}>
              <ul className="flex flex-col gap-3">
                {comparisons.map((c) => (
                  <li key={c.id} className="rounded-2xl border border-line bg-surface p-4">
                    <p className="mb-2 font-display font-bold text-ink">{c.title}</p>
                    <CompareGist deck={deck} c={c} size="sm" />
                    <Link
                      href={urls.compare(tech, c.id)}
                      className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-accent-ink hover:underline"
                    >
                      Compare side by side <IconArrowRight size={15} />
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {r.questions.length > 0 && (
            <Section id="questions" title="Interview questions" show="learn" icon={IconHelp}>
              <ul className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-surface">
                {r.questions.map((q, i) => (
                  <li key={i}>
                    <details className="group">
                      <summary className="flex min-h-12 cursor-pointer list-none items-start gap-3 px-4 py-3 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                        <span className="font-display text-accent">Q{i + 1}</span>
                        <span className="flex-1">{renderInline(q.q)}</span>
                        <span className="text-sm font-semibold text-ink-3 group-open:hidden">
                          Show
                        </span>
                        <span className="hidden text-sm font-semibold text-ink-3 group-open:inline">
                          Hide
                        </span>
                      </summary>
                      <div className="prose-card px-4 pb-4 pl-12 text-ink-2">{q.a}</div>
                    </details>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {m.sayIt && (
            <Section id="say-it" title="Say it like this" show="learn revise">
              <SayIt text={m.sayIt} />
            </Section>
          )}

          {/* ---------- Quiz ---------- */}
          <section
            id="quiz"
            data-show="quiz"
            aria-label={`Quiz: ${m.title}`}
            className="mt-6 scroll-mt-24"
          >
            <QuizSession items={quiz} />
            <p className="mt-4 text-sm text-ink-3">
              Want more?{" "}
              <Link
                href={urls.quiz(tech)}
                className="font-semibold text-accent-ink underline underline-offset-2"
              >
                Quiz the whole of {deck.name}
              </Link>
              .
            </p>
          </section>

          {r.terms.length > 0 && (
            <div data-show="learn" className="mt-10 flex flex-wrap items-center gap-2 text-sm">
              <span className="flex items-center gap-1.5 font-bold text-ink-3">
                <IconBook size={15} /> Terms here:
              </span>
              {r.terms.map((t) => (
                <span key={t.id} className="rounded-lg border border-line bg-surface px-2 py-1">
                  <PreviewLink preview={termPreview(deck, t, id)}>{t.term}</PreviewLink>
                </span>
              ))}
            </div>
          )}

          <details
            data-show="learn revise"
            className="mt-6 rounded-2xl border border-line bg-surface"
          >
            <summary className="flex min-h-12 cursor-pointer items-center gap-2 px-4 text-sm font-semibold text-ink-2 hover:text-ink">
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
                  <span className="text-ink-3"> · checked {formatDate(s.verifiedOn)}</span>
                </li>
              ))}
            </ul>
          </details>

          <nav
            aria-label="Previous and next concept"
            className="no-print mt-8 grid gap-3 sm:grid-cols-2"
          >
            {nb.prev ? (
              <Link
                href={nb.prev.href}
                className="group flex min-h-16 items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 hover:border-accent"
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
                className="group flex min-h-16 items-center justify-end gap-3 rounded-2xl border border-line bg-surface px-4 py-3 text-right hover:border-accent"
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
                href={urls.cheatsheet(tech)}
                className="group flex min-h-16 items-center justify-end gap-3 rounded-2xl border border-accent bg-accent-soft px-4 py-3 text-right"
              >
                <span>
                  <span className="block text-xs font-bold tracking-wider text-accent-ink uppercase">
                    You reached the end
                  </span>
                  <span className="font-semibold text-ink">Revise it all on one page</span>
                </span>
                <IconSheet size={20} className="flex-none text-accent" />
              </Link>
            )}
          </nav>
        </article>
      </SwipeNav>

      <aside className="no-print hidden xl:block" aria-label="On this page">
        <div className="sticky top-20 max-h-[calc(100dvh-6rem)] overflow-y-auto pb-6">
          <PageAside items={toc} recap={m.sayIt} />
        </div>
      </aside>
    </div>
  );
}
