"use client";

import Link from "next/link";
import { useState } from "react";
import { IconArrowRight, IconSearch } from "@/components/ui/icons";

export interface GlossaryEntry {
  id: string;
  term: string;
  aka: string[];
  definition: string;
  seeHref?: string;
  seeTitle?: string;
  sourceTitle: string;
  sourceUrl: string;
}

/** Searchable glossary, grouped A–Z. Each term has a shareable #term-id anchor. */
export function GlossaryList({ entries }: { entries: GlossaryEntry[] }) {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const shown = needle
    ? entries.filter((e) =>
        [e.term, ...e.aka, e.definition].some((s) => s.toLowerCase().includes(needle)),
      )
    : entries;
  const groups = new Map<string, GlossaryEntry[]>();
  for (const e of shown) {
    const letter = e.term[0].toUpperCase();
    groups.set(letter, [...(groups.get(letter) ?? []), e]);
  }
  const letters = [...groups.keys()];

  return (
    <div>
      <div className="sticky top-14 z-20 -mx-1 bg-bg px-1 pt-1 pb-3">
        <label className="flex min-h-12 items-center gap-2 rounded-2xl border-2 border-line bg-surface px-3 focus-within:border-accent">
          <IconSearch size={19} className="text-ink-3" />
          <span className="sr-only">Filter terms</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Filter ${entries.length} terms…`}
            className="min-h-11 w-full bg-transparent text-base outline-none placeholder:text-ink-3"
          />
        </label>
        {!needle && (
          <nav aria-label="Jump to letter" className="mt-2 flex flex-wrap gap-1">
            {letters.map((l) => (
              <a
                key={l}
                href={`#letter-${l}`}
                className="grid h-11 min-w-11 place-items-center rounded-lg border border-line bg-surface px-2 text-sm font-bold text-ink-2 hover:border-accent hover:text-ink"
              >
                {l}
              </a>
            ))}
          </nav>
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} terms shown
      </p>
      {shown.length === 0 && (
        <p className="rounded-2xl border border-dashed border-line p-5 text-ink-2">
          No term matches “{q.trim()}”.
        </p>
      )}

      <div className="flex flex-col gap-6">
        {letters.map((l) => (
          <section
            key={l}
            id={`letter-${l}`}
            aria-labelledby={`letter-h-${l}`}
            className="scroll-mt-44"
          >
            <h2
              id={`letter-h-${l}`}
              className="mb-1 font-display text-xl font-extrabold text-accent"
            >
              {l}
            </h2>
            <dl className="divide-y divide-line rounded-2xl border border-line bg-surface">
              {groups.get(l)!.map((e) => (
                <div
                  key={e.id}
                  id={`term-${e.id}`}
                  className="scroll-mt-44 px-4 py-3 target:bg-accent-soft"
                >
                  <dt className="font-bold text-ink">
                    {e.term}
                    {e.aka.length > 0 && (
                      <span className="ml-2 text-sm font-semibold text-ink-3">
                        also: {e.aka.join(", ")}
                      </span>
                    )}
                  </dt>
                  <dd className="mt-0.5 text-ink-2">{e.definition}</dd>
                  <dd className="mt-1 flex flex-wrap items-center gap-x-4 text-sm">
                    {e.seeHref && (
                      <Link
                        href={e.seeHref}
                        className="inline-flex min-h-11 items-center gap-1 font-bold text-accent-ink hover:underline"
                      >
                        {e.seeTitle} <IconArrowRight size={15} />
                      </Link>
                    )}
                    <a
                      href={e.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-ink-3 underline underline-offset-2 hover:text-ink"
                    >
                      Source
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
