"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** "⌘ K" on Apple devices, "Ctrl K" elsewhere. Server HTML says "Ctrl K". */
export function useShortcutLabel(): string {
  return useSyncExternalStore(
    noop,
    () => (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? "⌘ K" : "Ctrl K"),
    () => "Ctrl K",
  );
}
