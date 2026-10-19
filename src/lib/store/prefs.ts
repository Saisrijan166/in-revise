"use client";

import { useSyncExternalStore } from "react";

/**
 * Mode (Learn / Revise / Drill) and theme live on <html> as data attributes.
 * An inline script in the root layout sets them before first paint from localStorage,
 * so server HTML never flashes the wrong mode or theme. These hooks read and update them.
 */

export type Mode = "learn" | "revise" | "quiz";
export type ThemePref = "light" | "dark" | "system";

export const MODES: { value: Mode; label: string; hint: string }[] = [
  { value: "learn", label: "Learn", hint: "Everything: why, how, example, interview questions" },
  { value: "revise", label: "Revise", hint: "Only the key points, the trap and the one-liner" },
  { value: "quiz", label: "Quiz", hint: "Question first, tap to see the answer" },
];

const MODE_KEY = "cm-mode";
const THEME_KEY = "cm-theme";

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

function safeSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode, blocked): keep working in memory */
  }
}

export function getMode(): Mode {
  const m = document.documentElement.dataset.mode;
  return m === "revise" || m === "quiz" ? m : "learn";
}

export function setMode(mode: Mode) {
  document.documentElement.dataset.mode = mode;
  safeSet(MODE_KEY, mode);
  emit();
}

export function useMode(): Mode {
  return useSyncExternalStore(subscribe, getMode, () => "learn");
}

function systemDark() {
  return (
    typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches
  );
}

export function getThemePref(): ThemePref {
  const t = document.documentElement.dataset.themePref;
  return t === "light" || t === "dark" ? t : "system";
}

export function applyTheme(pref: ThemePref) {
  const root = document.documentElement;
  const dark = pref === "dark" || (pref === "system" && systemDark());
  root.dataset.theme = dark ? "dark" : "light";
  root.dataset.themePref = pref;
}

export function setThemePref(pref: ThemePref) {
  applyTheme(pref);
  safeSet(THEME_KEY, pref);
  emit();
}

export function useThemePref(): ThemePref {
  return useSyncExternalStore(subscribe, getThemePref, () => "system");
}

export function useResolvedTheme(): "light" | "dark" {
  return useSyncExternalStore(
    subscribe,
    () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light"),
    () => "light",
  );
}

/** Follow the OS theme while the preference is "system". Called once from the app shell. */
export function watchSystemTheme(): () => void {
  const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
  if (!mq) return () => {};
  const onChange = () => {
    if (getThemePref() === "system") {
      applyTheme("system");
      emit();
    }
  };
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/* ---------- Code language for Java / Python tabs ---------- */

const LANG_KEY = "cm-code-lang";
const langListeners = new Set<() => void>();
let langCache: string | null = null;

function readLang(): string {
  if (langCache) return langCache;
  try {
    langCache = localStorage.getItem(LANG_KEY) || "java";
  } catch {
    langCache = "java";
  }
  return langCache;
}

export function setCodeLang(lang: string) {
  langCache = lang;
  safeSet(LANG_KEY, lang);
  langListeners.forEach((l) => l());
}

/** The reader's preferred code language; every tab group follows it. Server HTML shows Java. */
export function useCodeLang(): string {
  return useSyncExternalStore(
    (l) => {
      langListeners.add(l);
      return () => langListeners.delete(l);
    },
    readLang,
    () => "java",
  );
}
