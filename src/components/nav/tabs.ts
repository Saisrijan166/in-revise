import type { ComponentType } from "react";
import { urls } from "@/lib/urls";
import {
  IconBook,
  IconCards,
  IconColumns,
  IconHome,
  IconMap,
  IconSheet,
  IconTree,
} from "@/components/ui/icons";

export interface TabDef {
  key: string;
  label: string;
  href: (tech: string) => string;
  icon: ComponentType<{ size?: number; className?: string }>;
  hint: string;
}

/** Pages of one tech, in the order they appear in the top bar and the Topics sheet. */
export const TECH_TABS: TabDef[] = [
  {
    key: "overview",
    label: "Overview",
    href: urls.overview,
    icon: IconHome,
    hint: "The story and all topics",
  },
  { key: "map", label: "Map", href: (t) => urls.map(t), icon: IconMap, hint: "How ideas connect" },
  {
    key: "tree",
    label: "Tree",
    href: (t) => urls.tree(t),
    icon: IconTree,
    hint: "All types and subtypes",
  },
  {
    key: "compare",
    label: "Compare",
    href: urls.compareIndex,
    icon: IconColumns,
    hint: "Confusing pairs",
  },
  {
    key: "cheatsheet",
    label: "Cheat sheet",
    href: urls.cheatsheet,
    icon: IconSheet,
    hint: "Everything on one page",
  },
  { key: "quiz", label: "Quiz", href: urls.quiz, icon: IconCards, hint: "Test yourself" },
  {
    key: "glossary",
    label: "Glossary",
    href: (t) => urls.glossary(t),
    icon: IconBook,
    hint: "Terms in one line",
  },
];

/** Which tab a path belongs to: /tech/ → overview, /tech/map/ → map, a concept page → none. */
export function activeTab(pathname: string): string | null {
  const segs = pathname.split("/").filter(Boolean);
  if (segs.length === 1) return "overview";
  const key = segs[1];
  return TECH_TABS.some((t) => t.key === key) ? key : null;
}

/** True on a concept page (/tech/concept-id/). */
export function isConceptPath(pathname: string): boolean {
  const segs = pathname.split("/").filter(Boolean);
  return segs.length === 2 && !TECH_TABS.some((t) => t.key === segs[1]);
}
