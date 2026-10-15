"use client";

import { useEffect } from "react";
import { STATUS_META, useHydrated, useProgress, type Status } from "@/lib/store/progress";
import { cardKey } from "@/lib/urls";
import { cx } from "@/lib/ui";
import { IconAlert, IconBookmark, IconCheck, IconHelp } from "@/components/ui/icons";

const ICONS = { known: IconCheck, shaky: IconAlert, unknown: IconHelp } as const;
const ON: Record<Status, string> = {
  known: "border-good bg-good-soft text-good",
  shaky: "border-warn bg-warn-soft text-warn",
  unknown: "border-bad bg-bad-soft text-bad",
};

/** Known / Shaky / Unknown + bookmark for one card. Tapping the active status clears it. */
export function StatusControls({ tech, id, title }: { tech: string; id: string; title: string }) {
  const key = cardKey(tech, id);
  const hydrated = useHydrated();
  const status = useProgress((s) => s.statuses[key]);
  const bookmarked = useProgress((s) => Boolean(s.bookmarks[key]));
  const setStatus = useProgress((s) => s.setStatus);
  const toggleBookmark = useProgress((s) => s.toggleBookmark);
  const current = hydrated ? status : undefined;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div role="group" aria-label={`How well do you know ${title}?`} className="flex flex-wrap gap-1.5">
        {(Object.keys(STATUS_META) as Status[]).map((s) => {
          const Icon = ICONS[s];
          const on = current === s;
          return (
            <button
              key={s}
              type="button"
              aria-pressed={on}
              title={STATUS_META[s].hint}
              onClick={() => setStatus(key, on ? null : s)}
              className={cx(
                "inline-flex min-h-11 items-center gap-1.5 rounded-xl border-2 px-3 text-sm font-bold transition-colors",
                on ? ON[s] : "border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink",
              )}
            >
              <Icon size={16} />
              {STATUS_META[s].label}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        aria-pressed={hydrated && bookmarked}
        onClick={() => toggleBookmark(key)}
        className={cx(
          "inline-flex min-h-11 items-center gap-1.5 rounded-xl border-2 px-3 text-sm font-bold transition-colors",
          hydrated && bookmarked ? "border-accent bg-accent-soft text-accent-ink" : "border-line bg-surface text-ink-2 hover:text-ink",
        )}
      >
        <IconBookmark size={16} filled={hydrated && bookmarked} />
        {hydrated && bookmarked ? "Saved" : "Save"}
      </button>
    </div>
  );
}

/** Records "continue where I left off". */
export function VisitTracker({ tech, id }: { tech: string; id: string }) {
  const visit = useProgress((s) => s.visit);
  const hydrated = useHydrated();
  useEffect(() => {
    if (hydrated) visit(tech, id);
  }, [hydrated, tech, id, visit]);
  return null;
}
