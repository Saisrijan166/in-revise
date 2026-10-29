"use client";

import { useState } from "react";
import { cx } from "@/lib/ui";
import { IconColumns } from "@/components/ui/icons";

/**
 * Open or close the "More details" fold on every cheat-sheet card at once. Each card's details
 * (`details.cheat-more`, the key points, trap and types) can be toggled on its own; this button
 * drives them all together, so a reader can reveal every detail or hide them for a quick pass.
 * The cards themselves always stay open. No state is stored.
 */
export function CheatExpandToggle() {
  const [allOpen, setAllOpen] = useState(false);

  function setAll(open: boolean) {
    document
      .querySelectorAll<HTMLDetailsElement>("details.cheat-more")
      .forEach((d) => (d.open = open));
    setAllOpen(open);
  }

  return (
    <button
      type="button"
      onClick={() => setAll(!allOpen)}
      className={cx(
        "no-print inline-flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-surface-2 px-3.5 text-sm font-semibold text-ink-2 hover:text-ink",
      )}
      aria-pressed={allOpen}
    >
      <IconColumns size={16} className={cx("transition-transform", allOpen && "rotate-90")} />
      {allOpen ? "Hide all details" : "Expand all details"}
    </button>
  );
}
