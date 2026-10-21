"use client";

import { setMode } from "@/lib/store/prefs";

/**
 * Full cards or quick revise on the cheat sheet. It reuses the global study mode (Learn shows
 * the full cards, Revise the quick view), so the choice is the same one the concept pages use.
 */
export function CheatView() {
  const views = [
    { mode: "learn", label: "Full cards" },
    { mode: "revise", label: "Quick revise" },
  ] as const;
  return (
    <div
      role="group"
      aria-label="Cheat sheet view"
      className="inline-flex rounded-2xl border border-line bg-surface-2 p-1"
    >
      {views.map((v) => (
        <button
          key={v.mode}
          type="button"
          data-mode-value={v.mode}
          onClick={() => setMode(v.mode)}
          className="mode-btn min-h-11 rounded-xl px-3.5 text-sm font-semibold text-ink-2 transition-colors hover:text-ink"
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
