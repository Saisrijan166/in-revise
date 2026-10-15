"use client";

import Link from "next/link";
import { useHydrated, useProgress } from "@/lib/store/progress";
import { urls } from "@/lib/urls";
import { IconArrowRight } from "@/components/ui/icons";

/** Home "continue where I left off": the most recently visited card in any deck. */
export function GlobalContinue({ titles, fallbackHref }: { titles: Record<string, Record<string, string>>; fallbackHref: string }) {
  const hydrated = useHydrated();
  const lastVisited = useProgress((s) => s.lastVisited);
  const latest = hydrated
    ? Object.entries(lastVisited)
        .filter(([tech, v]) => titles[tech]?.[v.id])
        .sort((a, b) => b[1].at - a[1].at)[0]
    : undefined;

  return (
    <Link
      href={latest ? urls.card(latest[0], latest[1].id) : fallbackHref}
      className="inline-flex min-h-12 max-w-full items-center gap-2 rounded-xl bg-accent px-5 font-bold text-on-accent shadow-[var(--shadow)] hover:bg-accent-strong"
    >
      <span className="truncate">{latest ? `Continue: ${titles[latest[0]][latest[1].id]}` : "Start with the first card"}</span>
      <IconArrowRight size={18} className="flex-none" />
    </Link>
  );
}
