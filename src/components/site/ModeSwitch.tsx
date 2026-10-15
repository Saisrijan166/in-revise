"use client";

import { MODES, setMode, useMode } from "@/lib/store/prefs";
import { cx } from "@/lib/ui";

/**
 * Global Learn / Revise / Drill switch. The highlighted button is styled from
 * html[data-mode] in CSS, so it is correct on first paint; aria-pressed follows after hydration.
 */
export function ModeSwitch({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  const mode = useMode();
  return (
    <div
      role="group"
      aria-label="Study mode"
      className={cx("inline-flex rounded-2xl border border-line bg-surface-2 p-1", className)}
    >
      {MODES.map((m) => (
        <button
          key={m.value}
          type="button"
          data-mode-value={m.value}
          aria-pressed={mode === m.value}
          title={m.hint}
          onClick={() => setMode(m.value)}
          className={cx(
            "mode-btn rounded-xl font-semibold text-ink-2 transition-colors hover:text-ink",
            size === "sm" ? "min-h-11 px-3 text-sm" : "min-h-10 px-3.5 text-sm",
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
