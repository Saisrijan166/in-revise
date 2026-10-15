"use client";

import { useEffect } from "react";
import { STORAGE_KEY, useProgress } from "@/lib/store/progress";
import { watchSystemTheme } from "@/lib/store/prefs";
import { useUi } from "@/lib/store/ui";

/** One-time client effects for the whole app: load saved progress, follow OS theme, ⌘K. */
export function ShellEffects() {
  useEffect(() => {
    void useProgress.persist.rehydrate();
    const stopTheme = watchSystemTheme();
    // Keep tabs in sync when progress changes in another tab.
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) void useProgress.persist.rehydrate();
    };
    const onKey = (e: KeyboardEvent) => {
      const typing =
        e.target instanceof HTMLElement &&
        (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        useUi.getState().setPaletteOpen(!useUi.getState().paletteOpen);
      } else if (e.key === "/" && !typing && !useUi.getState().paletteOpen) {
        e.preventDefault();
        useUi.getState().setPaletteOpen(true);
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("keydown", onKey);
    return () => {
      stopTheme();
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  return null;
}
