"use client";

import Link from "next/link";
import { useState } from "react";
import type { CardSummary } from "@/lib/content";
import type { Level } from "@/lib/content/schema";
import { useHydrated, useProgress, type Status } from "@/lib/store/progress";
import { cardKey, urls } from "@/lib/urls";
import { LEVEL_LABEL, cx, plural, topicColor } from "@/lib/ui";
import { HeatChip, LevelChip } from "@/components/ui/chips";
import { IconSheet } from "@/components/ui/icons";
import { ProgressBar } from "./ProgressBar";
import { StatusDot } from "./StatusDot";

type StatusFilter = "all" | "unmarked" | Status | "saved";

interface TopicLite {
  id: string;
  title: string;
  index: number;
  blurb?: string;
}

function FilterGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-xs font-bold tracking-wider text-ink-3 uppercase">{label}</span>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cx(
            "min-h-10 rounded-full border px-3 text-sm font-semibold transition-colors",
            value === o.value
              ? "border-accent bg-accent text-on-accent"
              : "border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Topics with their cards, filterable by level, heat and personal status (CLAUDE.md 5.2 #2). */
export function DeckBrowser({
  tech,
  topics,
  cards,
}: {
  tech: string;
  topics: TopicLite[];
  cards: CardSummary[];
}) {
  const [level, setLevel] = useState<"all" | Level>("all");
  const [heat, setHeat] = useState<"any" | "2" | "3">("any");
  const [status, setStatus] = useState<StatusFilter>("all");
  const hydrated = useHydrated();
  const statuses = useProgress((s) => s.statuses);
  const bookmarks = useProgress((s) => s.bookmarks);

  const match = (c: CardSummary) => {
    if (level !== "all" && c.level !== level) return false;
    if (heat !== "any" && c.heat < Number(heat)) return false;
    if (status === "all" || !hydrated) return status === "all";
    const k = cardKey(tech, c.id);
    if (status === "saved") return Boolean(bookmarks[k]);
    if (status === "unmarked") return !statuses[k];
    return statuses[k] === status;
  };
  const visible = cards.filter(match);
  const filtered = level !== "all" || heat !== "any" || status !== "all";

  return (
    <div>
      <div className="flex flex-col gap-2.5 rounded-2xl border border-line bg-surface p-3 sm:p-4">
        <FilterGroup
          label="Level"
          value={level}
          onChange={setLevel}
          options={[
            { value: "all", label: "All" },
            ...(["beginner", "intermediate", "interview"] as const).map((l) => ({
              value: l,
              label: LEVEL_LABEL[l],
            })),
          ]}
        />
        <FilterGroup
          label="Heat"
          value={heat}
          onChange={setHeat}
          options={[
            { value: "any", label: "Any" },
            { value: "2", label: "Asked often+" },
            { value: "3", label: "Asked a lot" },
          ]}
        />
        <FilterGroup
          label="Mine"
          value={status}
          onChange={setStatus}
          options={[
            { value: "all", label: "All" },
            { value: "unmarked", label: "Not marked" },
            { value: "shaky", label: "Shaky" },
            { value: "unknown", label: "Unknown" },
            { value: "known", label: "Known" },
            { value: "saved", label: "Saved" },
          ]}
        />
        <p className="text-sm text-ink-3" aria-live="polite">
          {filtered
            ? `${visible.length} of ${plural(cards.length, "card")} match`
            : plural(cards.length, "card")}
          {filtered && (
            <button
              type="button"
              onClick={() => {
                setLevel("all");
                setHeat("any");
                setStatus("all");
              }}
              className="ml-2 min-h-8 font-semibold text-accent-ink underline underline-offset-2"
            >
              Clear filters
            </button>
          )}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-10">
        {topics.map((t) => {
          const inTopic = cards.filter((c) => c.topic === t.id);
          const shown = inTopic.filter(match);
          return (
            <section
              key={t.id}
              id={`topic-${t.id}`}
              aria-labelledby={`topic-h-${t.id}`}
              className="scroll-mt-32"
            >
              <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
                <div>
                  <h3
                    id={`topic-h-${t.id}`}
                    className="flex items-center gap-2.5 text-xl font-extrabold"
                  >
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-8 rounded-full"
                      style={{ background: topicColor(t.index) }}
                    />
                    {t.title}
                  </h3>
                  {t.blurb && <p className="mt-0.5 text-ink-2">{t.blurb}</p>}
                </div>
                <div className="flex items-center gap-3">
                  <ProgressBar
                    tech={tech}
                    ids={inTopic.map((c) => c.id)}
                    compact
                    className="w-24"
                  />
                  <Link
                    href={urls.cheatsheet(tech, t.id)}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-line bg-surface px-3 text-sm font-semibold text-ink-2 hover:text-ink"
                  >
                    <IconSheet size={16} /> Cheat sheet
                  </Link>
                </div>
              </div>
              {shown.length ? (
                <ul className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                  {shown.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={c.href}
                        className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow)] transition-colors hover:border-accent"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-wrap gap-1.5">
                            <LevelChip level={c.level} />
                            <HeatChip heat={c.heat} compact />
                          </div>
                          <StatusDot tech={tech} id={c.id} color={topicColor(t.index)} size={16} />
                        </div>
                        <p className="mt-3 font-display text-lg leading-snug font-bold text-ink group-hover:text-accent-ink">
                          {c.title}
                        </p>
                        <p className="mt-1 line-clamp-3 text-base text-ink-2">{c.hook}</p>
                        <p className="mt-auto pt-3 text-xs font-semibold text-ink-3">
                          {c.minutes.learn} min learn · {c.minutes.revise} min revise
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="rounded-2xl border border-dashed border-line px-4 py-3 text-sm text-ink-3">
                  No cards in this topic match the filters.
                </p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
