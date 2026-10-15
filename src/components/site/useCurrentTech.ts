"use client";

import { usePathname } from "next/navigation";
import type { Accent } from "@/lib/content/schema";
import { useProgress } from "@/lib/store/progress";

export interface TechLite {
  slug: string;
  name: string;
  accent: Accent;
}

/** The deck in the URL, if any. Works during static prerender too (usePathname is known at build). */
export function useCurrentTech(techs: TechLite[]): TechLite | undefined {
  const pathname = usePathname() ?? "/";
  const first = pathname.split("/").filter(Boolean)[0];
  return techs.find((t) => t.slug === first);
}

/** Deck to use for global tabs (Map, Drill): the current one, else the last visited, else the first. */
export function useContextTech(techs: TechLite[]): TechLite | undefined {
  const current = useCurrentTech(techs);
  const last = useProgress((s) => s.lastTech);
  return current ?? techs.find((t) => t.slug === last) ?? techs[0];
}
