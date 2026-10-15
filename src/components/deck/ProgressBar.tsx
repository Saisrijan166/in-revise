"use client";

import { countStatuses, useHydrated, useProgress } from "@/lib/store/progress";
import { cardKey } from "@/lib/urls";
import { cx } from "@/lib/ui";

/** Stacked progress bar (known / shaky / unknown) with a text summary, so it is never colour-only. */
export function ProgressBar({
  tech,
  ids,
  label,
  compact,
  className,
}: {
  tech: string;
  ids: string[];
  label?: string;
  compact?: boolean;
  className?: string;
}) {
  const hydrated = useHydrated();
  const statuses = useProgress((s) => s.statuses);
  const c = countStatuses(hydrated ? statuses : {}, ids.map((id) => cardKey(tech, id)));
  const pct = (n: number) => (c.total ? (n / c.total) * 100 : 0);
  const knownPct = Math.round(pct(c.known));
  const summary = `${c.known} of ${c.total} known${c.shaky ? `, ${c.shaky} shaky` : ""}${c.unknown ? `, ${c.unknown} unknown` : ""}`;

  return (
    <div className={cx("w-full", className)}>
      {!compact && (
        <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
          <span className="font-semibold text-ink-2">{label ?? "Progress"}</span>
          <span className="text-ink-3">{hydrated ? `${knownPct}% known` : " "}</span>
        </div>
      )}
      <div
        role="img"
        aria-label={hydrated ? summary : "Progress loading"}
        className={cx("flex w-full gap-[2px] overflow-hidden rounded-full bg-surface-2", compact ? "h-1.5" : "h-2.5")}
      >
        <span className="h-full bg-good transition-[width] duration-500" style={{ width: `${pct(c.known)}%` }} />
        <span className="h-full bg-warn transition-[width] duration-500" style={{ width: `${pct(c.shaky)}%` }} />
        <span className="h-full bg-bad transition-[width] duration-500" style={{ width: `${pct(c.unknown)}%` }} />
      </div>
      {!compact && <p className="mt-1.5 text-xs text-ink-3">{hydrated ? summary : " "}</p>}
    </div>
  );
}
