"use client";

import { setThemePref, useThemePref, type ThemePref } from "@/lib/store/prefs";
import { IconMonitor, IconMoon, IconSun } from "@/components/ui/icons";

const NEXT: Record<ThemePref, ThemePref> = { system: "light", light: "dark", dark: "system" };
const LABEL: Record<ThemePref, string> = { system: "System", light: "Light", dark: "Dark" };

/** Cycles System → Light → Dark. */
export function ThemeToggle() {
  const pref = useThemePref();
  const Icon = pref === "dark" ? IconMoon : pref === "light" ? IconSun : IconMonitor;
  return (
    <button
      type="button"
      onClick={() => setThemePref(NEXT[pref])}
      aria-label={`Theme: ${LABEL[pref]}. Switch to ${LABEL[NEXT[pref]]}`}
      title={`Theme: ${LABEL[pref]}`}
      className="touch-target grid place-items-center rounded-xl text-ink-2 hover:bg-surface-2 hover:text-ink"
    >
      <Icon size={20} />
    </button>
  );
}
