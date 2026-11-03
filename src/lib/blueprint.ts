/**
 * Visual Learning Blueprint API (client-safe: no Node imports).
 *
 * A blueprint is ONE large connected flowchart — a system map of a tech: boxes,
 * arrows and branches showing how the parts connect and how execution flows. It is
 * a Mermaid diagram so the site renders it theme-aware and it scrolls in its own
 * box. Each tech's chart lives in `./blueprints/<slug>.ts`; a tech has a Blueprint
 * page only when it appears in BLUEPRINTS.
 */
export type { Blueprint, BpLegendItem } from "./blueprints/types";
import { BLUEPRINTS } from "./blueprints";
import type { Blueprint } from "./blueprints/types";

export { BLUEPRINTS };

export function hasBlueprint(slug: string): boolean {
  return slug in BLUEPRINTS;
}

export function getBlueprint(slug: string): Blueprint | undefined {
  return BLUEPRINTS[slug];
}

export function blueprintSlugs(): string[] {
  return Object.keys(BLUEPRINTS);
}
