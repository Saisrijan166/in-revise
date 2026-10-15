import Link from "next/link";
import { deckSummary, getDecks } from "@/lib/content";
import { urls } from "@/lib/urls";
import { GlobalContinue } from "@/components/deck/GlobalContinue";
import { ProgressBar } from "@/components/deck/ProgressBar";
import { IconCards, IconMap, IconSheet } from "@/components/ui/icons";

export default function HomePage() {
  const decks = getDecks();
  const summaries = decks.map(deckSummary);
  const titles = Object.fromEntries(decks.map((d) => [d.slug, Object.fromEntries(d.cards.map((c) => [c.meta.id, c.meta.title]))]));

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 pb-14 sm:px-6">
      <section className="map-paper relative overflow-hidden rounded-[2rem] border border-line bg-surface px-5 py-8 sm:px-10 sm:py-12">
        <HeroLines />
        <div className="relative max-w-2xl">
          <p className="text-xs font-bold tracking-widest text-accent-ink uppercase">Interview revision · first-time study</p>
          <h1 className="mt-3 text-[2.3rem] leading-[1.05] font-extrabold sm:text-6xl">
            Understand.
            <br />
            Remember.
            <br />
            <span className="text-accent">Answer.</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-2">
            Short concept cards, linked like stations on a map. Learn why an idea exists, revise it in a minute, then drill until you can say it out loud.
          </p>
          <div className="mt-6">
            <GlobalContinue titles={titles} fallbackHref={summaries[0]?.firstCardHref ?? "/"} />
          </div>
        </div>
      </section>

      <section aria-labelledby="decks" className="mt-10">
        <h2 id="decks" className="text-2xl font-extrabold">Decks</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {summaries.map((d) => (
            <li key={d.slug} data-accent={d.accent}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-[var(--shadow)]">
                <div className="h-2 bg-accent" aria-hidden="true" />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-2xl font-extrabold">
                    <Link href={urls.deck(d.slug)} className="hover:text-accent-ink">
                      {d.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-ink-2">{d.summary}</p>
                  <p className="mt-3 text-sm font-semibold text-ink-3">
                    {d.cardIds.length} cards · {d.topicCount} topics · {d.comparisonCount} comparisons · {d.termCount} terms
                  </p>
                  <ProgressBar tech={d.slug} ids={d.cardIds} className="mt-4" />
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link href={urls.deck(d.slug)} className="inline-flex min-h-11 items-center rounded-xl bg-accent px-4 font-bold text-on-accent hover:bg-accent-strong">
                      Open deck
                    </Link>
                    <Link href={urls.map(d.slug)} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-line px-3 font-semibold text-ink-2 hover:text-ink">
                      <IconMap size={17} /> Map
                    </Link>
                    <Link href={urls.drill(d.slug)} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-line px-3 font-semibold text-ink-2 hover:text-ink">
                      <IconCards size={17} /> Drill
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how" className="mt-12">
        <h2 id="how" className="text-2xl font-extrabold">One card, three ways to use it</h2>
        <p className="mt-1 text-ink-2">Switch mode at any time. The content stays the same; the view changes.</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            { t: "Learn", d: "First time? Read why it exists, how it works, an analogy or diagram, and the questions interviewers ask.", icon: IconMap },
            { t: "Revise", d: "Exam tomorrow? Only the one-liner, rules and defaults, can and cannot, the common mistake, and a ready answer.", icon: IconSheet },
            { t: "Drill", d: "Test yourself. Questions first, tap to reveal, rate yourself. Shaky cards come back in your review list.", icon: IconCards },
          ].map((m) => (
            <li key={m.t} className="rounded-2xl border border-line bg-surface p-4">
              <p className="flex items-center gap-2 font-display text-lg font-bold">
                <m.icon size={19} className="text-accent" /> {m.t}
              </p>
              <p className="mt-1 text-ink-2">{m.d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 hidden text-sm text-ink-3 md:block">
          Tip: press <kbd className="rounded-md border border-line bg-surface px-1.5 font-mono">Ctrl K</kbd> (or{" "}
          <kbd className="rounded-md border border-line bg-surface px-1.5 font-mono">⌘ K</kbd>) to search everything.
        </p>
      </section>
    </div>
  );
}

/** Decorative transit lines behind the hero. */
function HeroLines() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute -right-16 -bottom-10 hidden h-[420px] w-[560px] opacity-90 md:block" viewBox="0 0 560 420" fill="none">
      <path d="M40 380 L200 220 L520 220" stroke="var(--t1)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M140 40 L200 220 L300 400" stroke="var(--t2)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M330 60 L330 160 L430 260 L430 400" stroke="var(--t3)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M560 120 L430 120 L330 220" stroke="var(--t7)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      {[
        [200, 220, 16],
        [330, 220, 12],
        [430, 220, 10],
        [330, 120, 10],
        [140, 40, 10],
        [520, 220, 10],
        [430, 300, 10],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="var(--surface)" stroke="var(--ink)" strokeWidth="5" />
      ))}
    </svg>
  );
}
