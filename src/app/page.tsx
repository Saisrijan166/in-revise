import Link from "next/link";
import { getDecks, techSummary } from "@/lib/content";
import { groupBySlug } from "@/lib/categories";
import { urls } from "@/lib/urls";
import { plural } from "@/lib/ui";
import {
  IconArrowRight,
  IconCards,
  IconLinkArrow,
  IconSheet,
  IconTree,
} from "@/components/ui/icons";

export default function HomePage() {
  const techs = getDecks().map(techSummary);
  const groups = groupBySlug(techs);
  // Feature the first tech in display order (the start of "Languages & Fundamentals"),
  // not the alphabetical first, so the hero points at a sensible place to begin.
  const lead = groups[0]?.items[0] ?? techs[0];

  return (
    <div data-accent={lead?.accent} className="mx-auto max-w-5xl px-4 pt-6 pb-14 sm:px-6">
      <section className="grid-paper relative overflow-hidden rounded-[2rem] border border-line bg-surface px-5 py-8 sm:px-10 sm:py-12">
        <HeroLines />
        <div className="relative max-w-2xl">
          <p className="text-xs font-bold tracking-widest text-accent-ink uppercase">
            Interview + revise
          </p>
          <h1 className="mt-3 text-[2.3rem] leading-[1.05] font-extrabold sm:text-6xl">
            Less to read.
            <br />
            <span className="text-accent">More that sticks.</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-2">
            Every concept in one line, its types and the trap people fall into. Learn it once,
            revise it in minutes.
          </p>
          {lead?.firstHref && (
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href={lead.firstHref}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-accent px-5 font-bold text-on-accent shadow-[var(--shadow)] hover:bg-accent-strong"
              >
                Start with {lead.name} <IconArrowRight size={18} />
              </Link>
              <Link
                href={urls.cheatsheet(lead.slug)}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-line bg-surface px-4 font-bold text-ink-2 hover:border-accent hover:text-ink"
              >
                <IconSheet size={18} /> Quick revise
              </Link>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="techs" className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 id="techs" className="text-2xl font-extrabold">
            Pick a tech
          </h2>
          <p className="hidden text-sm font-semibold text-ink-3 sm:block">
            {techs.length} techs · {groups.length} areas
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-9">
          {groups.map(({ category, items }) => (
            <div key={category.id}>
              <div className="mb-3 flex items-baseline gap-2.5 border-b border-line pb-2">
                <h3 className="text-lg font-extrabold text-ink">{category.title}</h3>
                {category.blurb && (
                  <p className="hidden text-sm text-ink-3 sm:block">{category.blurb}</p>
                )}
                <span className="ml-auto text-xs font-bold text-ink-3 tabular-nums">
                  {items.length}
                </span>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {items.map((t) => (
                  <li key={t.slug} data-accent={t.accent}>
                    <Link
                      href={urls.overview(t.slug)}
                      className="group flex h-full items-start gap-3 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1 h-full min-h-[2.75rem] w-1.5 flex-none rounded-full bg-accent"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-display text-lg font-extrabold text-ink group-hover:text-accent-ink">
                            {t.name}
                          </span>
                          <IconArrowRight
                            size={17}
                            className="flex-none text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-ink"
                          />
                        </span>
                        <span className="mt-0.5 block text-sm text-ink-2">{t.summary}</span>
                        <span className="mt-1.5 block text-xs font-semibold text-ink-3">
                          {plural(t.conceptCount, "concept")} ·{" "}
                          {plural(t.comparisonCount, "comparison")}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="how" className="mt-12">
        <h2 id="how" className="text-2xl font-extrabold">
          How it works
        </h2>
        <ul className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {[
            {
              t: "Learn",
              d: "Why it exists, how it works with a picture, an example in Java and Python, and the questions interviewers ask.",
              icon: IconLinkArrow,
            },
            {
              t: "Revise",
              d: "Only the one-liner, the key points, the trap and a ready answer. One concept in under a minute.",
              icon: IconSheet,
            },
            {
              t: "Quiz",
              d: "Question first, tap to see the answer. Built from the same content, so nothing is missing.",
              icon: IconCards,
            },
            {
              t: "Tree",
              d: "Every type and subtype of the tech in one tree, each with a one-line note.",
              icon: IconTree,
            },
          ].map((m) => (
            <li key={m.t} className="flex gap-3">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-accent-soft text-accent-ink">
                <m.icon size={20} />
              </span>
              <span>
                <span className="block font-display text-lg font-bold">{m.t}</span>
                <span className="text-ink-2">{m.d}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/** Decorative transit lines behind the hero. */
function HeroLines() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -right-16 -bottom-10 hidden h-[420px] w-[560px] opacity-90 md:block"
      viewBox="0 0 560 420"
      fill="none"
    >
      <path
        d="M40 380 L200 220 L520 220"
        stroke="var(--t1)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M140 40 L200 220 L300 400"
        stroke="var(--t2)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M330 60 L330 160 L430 260 L430 400"
        stroke="var(--t3)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M560 120 L430 120 L330 220"
        stroke="var(--t7)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      {[
        [200, 220, 16],
        [330, 220, 12],
        [430, 220, 10],
        [330, 120, 10],
        [140, 40, 10],
        [520, 220, 10],
        [430, 300, 10],
      ].map(([x, y, r], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill="var(--surface)"
          stroke="var(--ink)"
          strokeWidth="5"
        />
      ))}
    </svg>
  );
}
