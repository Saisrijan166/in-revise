"use client";

import Link from "next/link";
import { useHydrated, useProgress } from "@/lib/store/progress";
import { urls } from "@/lib/urls";
import { IconArrowRight } from "@/components/ui/icons";

/** "Continue where I left off" for one deck, or "Start" when nothing was visited yet. */
export function ContinueLink({
  tech,
  firstHref,
  titles,
}: {
  tech: string;
  firstHref: string;
  titles: Record<string, string>;
}) {
  const hydrated = useHydrated();
  const last = useProgress((s) => s.lastVisited[tech]);
  const resume = hydrated && last && titles[last.id] ? last : null;
  return (
    <Link
      href={resume ? urls.card(tech, resume.id) : firstHref}
      className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-accent px-4 font-bold text-on-accent shadow-[var(--shadow)] hover:bg-accent-strong"
    >
      {resume ? (
        <>
          Continue: <span className="max-w-[12rem] truncate">{titles[resume.id]}</span>
        </>
      ) : (
        "Start at stop 1"
      )}
      <IconArrowRight size={18} />
    </Link>
  );
}
