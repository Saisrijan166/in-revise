"use client";

import { useState } from "react";
import { cx } from "@/lib/ui";
import { IconColumns } from "@/components/ui/icons";

/**
 * Collapse or expand every cheat-sheet card at once. The cards are native <details open>
 * elements (`.cheat-card`), each foldable on its own by tapping its title; this button drives
 * them all together, for a quick "titles only" overview and back. No state is stored.
 */
export function CheatExpandToggle() {
  const [allOpen, setAllOpen] = useState(true);

  function setAll(open: boolean) {
    document
      .querySelectorAll<HTMLDetailsElement>("details.cheat-card")
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
      aria-pressed={!allOpen}
    >
      <IconColumns size={16} className={cx("transition-transform", !allOpen && "rotate-90")} />
      {allOpen ? "Collapse all" : "Expand all"}
    </button>
  );
}
