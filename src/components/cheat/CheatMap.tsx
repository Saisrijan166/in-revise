import Link from "next/link";
import type { Card, Deck } from "@/lib/content/load";
import { countWords } from "@/lib/content/load";
import { nodeHref } from "@/lib/content/nav";
import { renderInline } from "@/lib/inline";
import { urls } from "@/lib/urls";
import { topicColor } from "@/lib/ui";
import { KeyPoints } from "@/components/card/Blocks";
import { CompareGist } from "@/components/compare/CompareView";
import { PageHeader } from "@/components/ui/Breadcrumbs";
import {
  IconArrowRight,
  IconCheck,
  IconChevronRight,
  IconClose,
  IconFlame,
} from "@/components/ui/icons";
import { PrintButton } from "@/components/ui/PrintButton";
import { CheatExpandToggle } from "./CheatExpandToggle";
import { CheatView } from "./CheatView";

/**
 * Template v3 cheat sheet (CLAUDE.md 5.2 #6): a visual learning map. Stages (the topics) in a
 * numbered path, then one compact card per concept: the idea, an optional tiny flow or code,
 * and one rule to remember. "More details" folds the key points, the trap and the types (what the
 * old cheat sheet showed); the full lesson is a link.
 * Learn mode shows the full cards; Revise mode shows only the one-liner and the rule.
 */

const WPM = 200;

function cheatWords(c: Card): number {
  const x = c.meta.cheat!;
  return countWords(`${x.idea} ${x.flow ?? ""} ${x.remember}`) + (x.code ? 8 : 0);
}

interface Stage {
  index: number;
  id: string;
  title: string;
  blurb?: string;
  color: string;
  cards: Card[];
  minutes: number;
}

function stagesOf(deck: Deck): Stage[] {
  return deck.tree.map(({ topic }, i) => {
    const cards = deck.cards.filter((c) => c.meta.topic === topic.id);
    const words = cards.reduce((n, c) => n + cheatWords(c), 0);
    return {
      index: i,
      id: topic.id,
      title: topic.title,
      blurb: topic.blurb,
      color: topicColor(topic.index),
      cards,
      minutes: Math.max(1, Math.round(words / WPM)),
    };
  });
}

/** "A → B → C" as small connected steps. */
function Flow({ text }: { text: string }) {
  const parts = text.split("→").map((p) => p.trim());
  return (
    <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm" aria-label={text}>
      {parts.map((p, i) => (
        <span key={i} className="inline-flex items-center gap-1.5" aria-hidden="true">
          {i > 0 && <IconArrowRight size={13} className="text-ink-3" />}
          <span className="rounded-lg border border-line bg-surface-2 px-2 py-0.5 font-semibold text-ink-2">
            {renderInline(p)}
          </span>
        </span>
      ))}
    </p>
  );
}

function CheatCard({ deck, card, no }: { deck: Deck; card: Card; no: string }) {
  const m = card.meta;
  const x = m.cheat!;
  const node = deck.nodeById.get(m.id)!;
  const parent = node.parentId ? deck.nodeById.get(node.parentId) : undefined;
  const owner = parent?.ownerCardId ? deck.cardById.get(parent.ownerCardId) : undefined;
  const types = node.children.filter((c) => !c.cardId);
  const href = urls.concept(deck.slug, m.id);
  return (
    <details
      open
      id={`cs-${m.id}`}
      aria-labelledby={`csc-${m.id}`}
      className="cheat-card print-card group/card flex min-w-0 scroll-mt-24 flex-col rounded-2xl border border-line bg-surface p-4 open:gap-2.5"
    >
      {/* The header is the collapse toggle: tap it to fold the card to just its title. */}
      <summary className="flex cursor-pointer list-none items-start gap-2.5 [&::-webkit-details-marker]:hidden">
        <span className="mt-0.5 font-display text-sm font-bold text-ink-3 tabular-nums">{no}</span>
        <div className="min-w-0 flex-1">
          <h3
            id={`csc-${m.id}`}
            className="font-display text-lg leading-snug font-extrabold text-ink group-open/card:text-accent-ink"
          >
            {m.title}
          </h3>
          {owner && (
            <p className="text-xs text-ink-3">
              Part of <span className="underline underline-offset-2">{owner.meta.title}</span>
            </p>
          )}
        </div>
        {m.heat === 3 && (
          <span
            title="Asked a lot in interviews"
            className="inline-flex flex-none items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-bold text-accent-ink"
          >
            <IconFlame size={12} /> Most asked
          </span>
        )}
        <span
          aria-hidden="true"
          className="no-print mt-0.5 flex-none text-ink-3 transition-transform group-open/card:rotate-90"
        >
          <IconChevronRight size={17} />
        </span>
      </summary>

      {/* Full card (Learn and Quiz modes) */}
      <div data-show="learn quiz" className="flex flex-col gap-2.5">
        <p className="text-ink">{renderInline(x.idea)}</p>
        {x.flow && <Flow text={x.flow} />}
        {x.code && (
          <pre className="scroll-box overflow-x-auto rounded-xl bg-surface-2 px-3 py-2 font-mono text-[0.85rem] leading-relaxed text-ink">
            <code>{x.code.trimEnd()}</code>
          </pre>
        )}
      </div>

      {/* Quick revise (Revise mode): the one-liner only */}
      <p data-show="revise" className="text-ink-2">
        {renderInline(m.hook)}
      </p>

      <p className="flex gap-2 rounded-xl border-l-4 border-accent bg-accent-soft/60 px-3 py-2 text-ink">
        <IconCheck size={16} className="mt-1 flex-none text-accent-ink" />
        <span>
          <span className="sr-only">Remember: </span>
          {renderInline(x.remember)}
        </span>
      </p>

      <details data-show="learn quiz" className="group/more">
        <summary className="no-print flex min-h-11 cursor-pointer list-none items-center gap-1.5 font-semibold text-ink-3 hover:text-ink [&::-webkit-details-marker]:hidden">
          <span aria-hidden="true" className="transition-transform group-open/more:rotate-90">
            ›
          </span>
          More details
        </summary>
        <div className="flex flex-col gap-2.5 pt-1">
          <KeyPoints points={m.points} compact />
          {m.trap && (
            <div className="flex flex-col gap-1">
              <p className="flex gap-1.5 text-ink">
                <IconClose size={14} className="mt-1 flex-none text-bad" />
                <span>
                  <span className="font-bold text-bad">Mistake: </span>
                  {renderInline(m.trap.wrong)}
                </span>
              </p>
              <p className="flex gap-1.5 text-ink">
                <IconCheck size={14} className="mt-1 flex-none text-good" />
                <span>{renderInline(m.trap.right)}</span>
              </p>
            </div>
          )}
          {types.length > 0 && (
            <ul className="flex flex-col gap-1 text-ink-2">
              {types.map((t) => (
                <li key={t.id}>
                  <Link
                    href={nodeHref(deck.slug, t)}
                    className="font-semibold text-ink hover:text-accent-ink"
                  >
                    {t.label}
                  </Link>
                  {t.note && <span>: {t.note}</span>}
                </li>
              ))}
            </ul>
          )}
          <Link
            href={href}
            className="no-print inline-flex min-h-11 items-center gap-1.5 font-bold text-accent-ink hover:underline"
          >
            Full lesson <IconArrowRight size={15} />
          </Link>
        </div>
      </details>
    </details>
  );
}

function stageComparisons(deck: Deck, topicId: string) {
  // Each comparison is shown once, in the stage of its first side.
  return deck.comparisons.filter((c) => deck.nodeById.get(c.compares[0])?.topicId === topicId);
}

function StagePath({ stages }: { stages: Stage[] }) {
  return (
    <nav aria-label="Learning path" className="no-print mt-5">
      <ol className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-stretch sm:gap-x-1 sm:gap-y-2">
        {stages.map((s, i) => (
          <li key={s.id} className="flex min-w-0 items-center gap-1">
            {i > 0 && (
              <IconArrowRight size={14} aria-hidden="true" className="hidden text-ink-3 sm:block" />
            )}
            <a
              href={`#stage-${s.id}`}
              className="flex min-h-11 w-full min-w-0 items-center gap-1.5 rounded-xl border border-line bg-surface px-2 py-1.5 text-[0.8125rem] sm:gap-2 sm:px-2.5 sm:text-sm hover:border-accent sm:w-auto"
            >
              <span
                className="grid h-5 w-5 sm:h-6 sm:w-6 flex-none place-items-center rounded-full font-display text-xs font-bold text-on-accent"
                style={{ background: s.color }}
              >
                {i + 1}
              </span>
              <span className="font-semibold text-ink">{s.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CheatMap({ deck }: { deck: Deck }) {
  const stages = stagesOf(deck);
  const total = Math.round(deck.cards.reduce((n, c) => n + cheatWords(c), 0) / WPM);
  const quick = Math.round(
    deck.cards.reduce(
      (n, c) => n + countWords(`${c.meta.title} ${c.meta.hook} ${c.meta.cheat!.remember}`),
      0,
    ) / WPM,
  );
  return (
    <div className="mx-auto max-w-5xl px-4 pt-4 pb-12 sm:px-6 lg:px-10 print:max-w-none print:p-0">
      <PageHeader
        crumbs={[
          { label: "Home", href: urls.home() },
          { label: deck.name, href: urls.overview(deck.slug) },
          { label: "Cheat sheet" },
        ]}
        eyebrow={`${deck.name} · cheat sheet`}
        title={`${deck.name} in ${stages.length} stages`}
        lead={deck.summary}
      >
        <p className="mt-2 text-sm text-ink-3">
          {deck.cards.length} concepts · about{" "}
          <span data-show="learn quiz">{total} minutes for the full cards</span>
          <span data-show="revise">{quick} minutes for a quick revise</span> · read the stages in
          order
        </p>
        <div className="no-print mt-4 flex flex-wrap items-center gap-2">
          <CheatView />
          <CheatExpandToggle />
          <PrintButton />
        </div>
        <StagePath stages={stages} />
      </PageHeader>

      <div className="flex flex-col gap-10">
        {stages.map((s) => {
          const comps = stageComparisons(deck, s.id);
          return (
            <section
              key={s.id}
              id={`stage-${s.id}`}
              aria-labelledby={`sth-${s.id}`}
              className="scroll-mt-20"
            >
              <header className="mb-3 border-b-4 pb-2" style={{ borderColor: s.color }}>
                <p className="text-xs font-bold tracking-widest text-ink-3 uppercase">
                  Stage {s.index + 1} · {s.cards.length} concepts · about {s.minutes} min
                </p>
                <h2 id={`sth-${s.id}`} className="text-2xl font-extrabold text-ink">
                  {s.title}
                </h2>
                {s.blurb && <p className="text-ink-2">{s.blurb}</p>}
              </header>
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {s.cards.map((c, i) => (
                  <CheatCard key={c.meta.id} deck={deck} card={c} no={`${s.index + 1}.${i + 1}`} />
                ))}
              </div>
              {comps.length > 0 && (
                <details className="print-card mt-3 rounded-2xl bg-surface-2/60 group">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 px-4 font-bold text-ink [&::-webkit-details-marker]:hidden">
                    <span aria-hidden="true" className="transition-transform group-open:rotate-90">
                      ›
                    </span>
                    Easy to mix up ({comps.length})
                  </summary>
                  <div className="flex flex-col gap-3 px-4 pb-4">
                    {comps.map((c) => (
                      <div key={c.id}>
                        <p className="mb-1.5 font-bold text-ink">
                          <Link
                            href={urls.compare(deck.slug, c.id)}
                            className="hover:text-accent-ink"
                          >
                            {c.title}
                          </Link>
                        </p>
                        <CompareGist deck={deck} c={c} size="sm" />
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </section>
          );
        })}
      </div>
      <p className="mt-8 hidden text-xs text-ink-3 print:block">
        inrevise · {deck.name} cheat sheet
      </p>
    </div>
  );
}
