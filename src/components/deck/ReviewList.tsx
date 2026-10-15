"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useHydrated, useProgress } from "@/lib/store/progress";
import { cardKey } from "@/lib/urls";
import { cx } from "@/lib/ui";
import { IconArrowRight } from "@/components/ui/icons";

export interface ReviewEntry {
  id: string;
  title: string;
  href: string;
  topicTitle: string;
  hook: string;
  body: ReactNode;
}

type Tab = "shaky" | "unknown" | "saved";
const TABS: { value: Tab; label: string; empty: string }[] = [
  {
    value: "shaky",
    label: "Shaky",
    empty:
      "No shaky cards. Mark a card as Shaky while you study or drill, and it shows up here for a last-minute pass.",
  },
  {
    value: "unknown",
    label: "Unknown",
    empty:
      "Nothing marked Unknown. Either you are on top of things, or you have not started marking yet.",
  },
  {
    value: "saved",
    label: "Saved",
    empty: "No saved cards yet. Use Save on any card to bookmark it.",
  },
];

/** "Shaky only" revision list (CLAUDE.md 5.6): the Revise view of just the cards you flagged. */
export function ReviewList({ tech, entries }: { tech: string; entries: ReviewEntry[] }) {
  const [tab, setTab] = useState<Tab>("shaky");
  const hydrated = useHydrated();
  const statuses = useProgress((s) => s.statuses);
  const bookmarks = useProgress((s) => s.bookmarks);
  const count = (t: Tab) =>
    entries.filter((e) => {
      const k = cardKey(tech, e.id);
      return t === "saved" ? Boolean(bookmarks[k]) : statuses[k] === t;
    }).length;
  const shown = new Set(
    hydrated
      ? entries
          .filter((e) => {
            const k = cardKey(tech, e.id);
            return tab === "saved" ? Boolean(bookmarks[k]) : statuses[k] === tab;
          })
          .map((e) => e.id)
      : [],
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Review list"
        className="inline-flex rounded-2xl border border-line bg-surface-2 p-1"
      >
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={tab === t.value}
            onClick={() => setTab(t.value)}
            className={cx(
              "min-h-10 rounded-xl px-3.5 text-sm font-semibold",
              tab === t.value
                ? "bg-surface text-ink shadow-[var(--shadow)]"
                : "text-ink-2 hover:text-ink",
            )}
          >
            {t.label}{" "}
            {hydrated && (
              <span className="ml-1 rounded-full bg-accent-soft px-1.5 text-xs text-accent-ink">
                {count(t.value)}
              </span>
            )}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-5">
        {hydrated && shown.size === 0 && (
          <p className="rounded-2xl border border-dashed border-line-strong p-5 text-ink-2">
            {TABS.find((t) => t.value === tab)!.empty}
          </p>
        )}
        <div className="flex flex-col gap-5">
          {entries.map((e) => (
            <article
              key={e.id}
              hidden={!shown.has(e.id)}
              className="rounded-3xl border border-line bg-surface p-5"
            >
              <p className="text-xs font-bold tracking-wider text-ink-3 uppercase">
                {e.topicTitle}
              </p>
              <h2 className="text-2xl font-extrabold">{e.title}</h2>
              <p className="mt-1 font-display text-lg leading-snug font-semibold text-ink">
                {e.hook}
              </p>
              <div className="mt-4">{e.body}</div>
              <Link
                href={e.href}
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-bold text-accent-ink hover:underline"
              >
                Open the full card <IconArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
