import Link from "next/link";
import { getDecks, techSummary } from "@/lib/content";
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

  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 pb-14 sm:px-6">
      <section className="map-paper relative overflow-hidden rounded-[2rem] border border-line bg-surface px-5 py-8 sm:px-10 sm:py-12">
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
            Every concept in one line, its types, the trap people fall into, and how it connects to
            the rest. Learn it once, revise it in minutes.
          </p>
          {techs[0]?.firstHref && (
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href={techs[0].firstHref}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-accent px-5 font-bold text-on-accent shadow-[var(--shadow)] hover:bg-accent-strong"
              >
                Start with {techs[0].name} <IconArrowRight size={18} />
              </Link>
              <Link
                href={urls.cheatsheet(techs[0].slug)}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-line bg-surface px-4 font-bold text-ink-2 hover:border-accent hover:text-ink"
              >
                <IconSheet size={18} /> Quick revise
              </Link>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="techs" className="mt-10">
        <h2 id="techs" className="text-2xl font-extrabold">
          Pick a tech
        </h2>
        <ul className="mt-4 flex flex-col gap-3">
          {techs.map((t) => (
            <li key={t.slug} data-accent={t.accent}>
              <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-12 flex-none rounded-full bg-accent sm:h-12 sm:w-1.5"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-2xl font-extrabold">
                    <Link href={urls.overview(t.slug)} className="hover:text-accent-ink">
                      {t.name}
                    </Link>
                  </h3>
                  <p className="text-ink-2">{t.summary}</p>
                  <p className="mt-1 text-sm font-semibold text-ink-3">
                    {plural(t.conceptCount, "concept")} · {plural(t.typeCount, "type")} and parts ·{" "}
                    {plural(t.comparisonCount, "comparison")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={urls.overview(t.slug)}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-accent px-4 font-bold text-on-accent hover:bg-accent-strong"
                  >
                    Open <IconArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
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
              d: "Every type and subtype of the tech in one tree, and in each concept: how it needs, uses or solves another.",
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
