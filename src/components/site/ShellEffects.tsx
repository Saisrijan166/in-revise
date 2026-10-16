"use client";

import { useEffect } from "react";
import { watchSystemTheme } from "@/lib/store/prefs";
import { paletteStore } from "@/lib/store/ui";

/** One-time client effects for the whole app: follow the OS theme, and Ctrl/⌘ K or "/" for search. */
export function ShellEffects() {
  useEffect(() => {
    const stopTheme = watchSystemTheme();
    const onKey = (e: KeyboardEvent) => {
      const typing =
        e.target instanceof HTMLElement &&
        (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        paletteStore.set(!paletteStore.get());
      } else if (e.key === "/" && !typing && !paletteStore.get()) {
        e.preventDefault();
        paletteStore.set(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      stopTheme();
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  return null;
}
