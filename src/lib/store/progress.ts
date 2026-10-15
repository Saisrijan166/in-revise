"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

/**
 * Personal progress, local only (CLAUDE.md 5.6): Known / Shaky / Unknown per card,
 * bookmarks, and "continue where I left off". Keys are "tech/cardId".
 */

export type Status = "known" | "shaky" | "unknown";

export const STATUS_META: Record<Status, { label: string; hint: string }> = {
  known: { label: "Known", hint: "I can explain it" },
  shaky: { label: "Shaky", hint: "Revise again" },
  unknown: { label: "Unknown", hint: "Not yet" },
};

export interface ProgressData {
  statuses: Record<string, Status>;
  bookmarks: Record<string, number>;
  lastVisited: Record<string, { id: string; at: number }>;
  lastTech: string | null;
}

interface ProgressState extends ProgressData {
  setStatus: (key: string, status: Status | null) => void;
  toggleBookmark: (key: string) => void;
  visit: (tech: string, id: string) => void;
  importData: (data: ProgressData, mode: "merge" | "replace") => void;
  reset: () => void;
}

const empty: ProgressData = { statuses: {}, bookmarks: {}, lastVisited: {}, lastTech: null };

/** localStorage that never throws (SSR, private mode, quota, blocked storage). */
const safeStorage: StateStorage = {
  getItem: (name) => {
    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      window.localStorage.setItem(name, value);
    } catch {
      /* ignore */
    }
  },
  removeItem: (name) => {
    try {
      window.localStorage.removeItem(name);
    } catch {
      /* ignore */
    }
  },
};

export const STORAGE_KEY = "cm-progress";

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      ...empty,
      setStatus: (key, status) =>
        set((s) => {
          const statuses = { ...s.statuses };
          if (status) statuses[key] = status;
          else delete statuses[key];
          return { statuses };
        }),
      toggleBookmark: (key) =>
        set((s) => {
          const bookmarks = { ...s.bookmarks };
          if (bookmarks[key]) delete bookmarks[key];
          else bookmarks[key] = Date.now();
          return { bookmarks };
        }),
      visit: (tech, id) =>
        set((s) => ({
          lastVisited: { ...s.lastVisited, [tech]: { id, at: Date.now() } },
          lastTech: tech,
        })),
      importData: (data, mode) =>
        set((s) =>
          mode === "replace"
            ? { ...empty, ...data }
            : {
                statuses: { ...s.statuses, ...data.statuses },
                bookmarks: { ...s.bookmarks, ...data.bookmarks },
                lastVisited: { ...s.lastVisited, ...data.lastVisited },
                lastTech: data.lastTech ?? s.lastTech,
              },
        ),
      reset: () => set({ ...empty }),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => safeStorage),
      skipHydration: true,
      partialize: (s) => ({
        statuses: s.statuses,
        bookmarks: s.bookmarks,
        lastVisited: s.lastVisited,
        lastTech: s.lastTech,
      }),
    },
  ),
);

/** True once saved progress has been read from storage (always false during SSR). */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    (cb) => useProgress.persist.onFinishHydration(cb),
    () => useProgress.persist.hasHydrated(),
    () => false,
  );
}

export function useStatus(key: string): Status | undefined {
  return useProgress((s) => s.statuses[key]);
}

export function countStatuses(statuses: Record<string, Status>, keys: string[]) {
  const c = { known: 0, shaky: 0, unknown: 0, unmarked: 0, total: keys.length };
  for (const k of keys) {
    const s = statuses[k];
    if (s) c[s]++;
    else c.unmarked++;
  }
  return c;
}

/* ---------- Export / import ---------- */

export const EXPORT_FORMAT = "concept-map-progress";

export function exportProgress(): string {
  const { statuses, bookmarks, lastVisited, lastTech } = useProgress.getState();
  return JSON.stringify(
    {
      format: EXPORT_FORMAT,
      version: 1,
      exportedAt: new Date().toISOString(),
      statuses,
      bookmarks,
      lastVisited,
      lastTech,
    },
    null,
    2,
  );
}

/** Parses and checks an exported file. Unknown keys are dropped; bad values are rejected. */
export function parseProgress(
  text: string,
): { ok: true; data: ProgressData } | { ok: false; error: string } {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, error: "This file is not valid JSON." };
  }
  if (!raw || typeof raw !== "object")
    return { ok: false, error: "This file is not a progress export." };
  const r = raw as Record<string, unknown>;
  if (r.format !== EXPORT_FORMAT)
    return { ok: false, error: "This file was not exported from Concept Map." };
  const keyOk = (k: string) => /^[a-z0-9-]+\/[a-z0-9-]+$/.test(k);
  const statuses: Record<string, Status> = {};
  for (const [k, v] of Object.entries((r.statuses as object) ?? {})) {
    if (!keyOk(k) || (v !== "known" && v !== "shaky" && v !== "unknown"))
      return { ok: false, error: `Bad status entry "${k}".` };
    statuses[k] = v;
  }
  const bookmarks: Record<string, number> = {};
  for (const [k, v] of Object.entries((r.bookmarks as object) ?? {})) {
    if (!keyOk(k) || typeof v !== "number")
      return { ok: false, error: `Bad bookmark entry "${k}".` };
    bookmarks[k] = v;
  }
  const lastVisited: Record<string, { id: string; at: number }> = {};
  for (const [k, v] of Object.entries((r.lastVisited as object) ?? {})) {
    const e = v as { id?: unknown; at?: unknown };
    if (typeof e?.id !== "string" || typeof e?.at !== "number")
      return { ok: false, error: `Bad last-visited entry "${k}".` };
    lastVisited[k] = { id: e.id, at: e.at };
  }
  const lastTech = typeof r.lastTech === "string" ? r.lastTech : null;
  return { ok: true, data: { statuses, bookmarks, lastVisited, lastTech } };
}
