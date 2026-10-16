"use client";

import { usePathname } from "next/navigation";
import type { Accent } from "@/lib/content/schema";

export interface TechLite {
  slug: string;
  name: string;
  accent: Accent;
}

/** The tech in the URL, if any. Works during static prerender too (usePathname is known at build). */
export function useCurrentTech(techs: TechLite[]): TechLite | undefined {
  const pathname = usePathname() ?? "/";
  const first = pathname.split("/").filter(Boolean)[0];
  return techs.find((t) => t.slug === first);
}

/** Tech for global tabs (Map, Quiz): the current one, else the first. */
export function useContextTech(techs: TechLite[]): TechLite | undefined {
  return useCurrentTech(techs) ?? techs[0];
}
