"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny observable stores for transient UI state (no library needed).
 * `createStore` returns get/set plus a React hook bound to the value.
 */
export function createStore<T>(initial: T) {
  let value = initial;
  const listeners = new Set<() => void>();
  const subscribe = (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  };
  const get = () => value;
  const set = (next: T) => {
    value = next;
    listeners.forEach((l) => l());
  };
  const use = () => useSyncExternalStore(subscribe, get, () => initial);
  return { get, set, use, subscribe };
}

/** Search palette open state. */
export const paletteStore = createStore(false);
/** Topics sheet (concept tree) open state, on phones and tablets. */
export const navStore = createStore(false);
