import type { BpLegendItem } from "./types";

/**
 * Shared palette + Mermaid classDef block for every blueprint, so all system maps
 * use the same five colour-coded layers. Fills are dark with white text, so nodes
 * stay readable in both light and dark themes (the colour never depends on theme).
 *
 * Class names used in charts: f (foundation/entry) · c (core/processing) ·
 * d (data/storage) · x (cross-cutting/patterns) · o (ops/scale/advanced).
 *
 * Chart authoring notes (Mermaid): keep node labels single-line (no raw newlines
 * or the `|` character inside a label), and never use a reserved node id — ELK
 * layout treats `root` (and `end`, `graph`, `subgraph`, `class`, `style`) as
 * special, which throws "edge source/target could not be found".
 */
export const PALETTE = {
  f: "#1b5e20", // green
  c: "#0d47a1", // blue
  d: "#4a148c", // violet
  x: "#8a5208", // amber
  o: "#37474f", // slate
} as const;

export const CLASSDEFS = `
  classDef f fill:#1b5e20,color:#ffffff,stroke:#43a047,stroke-width:1px;
  classDef c fill:#0d47a1,color:#ffffff,stroke:#1e88e5,stroke-width:1px;
  classDef d fill:#4a148c,color:#ffffff,stroke:#8e24aa,stroke-width:1px;
  classDef x fill:#8a5208,color:#ffffff,stroke:#c77f1a,stroke-width:1px;
  classDef o fill:#37474f,color:#ffffff,stroke:#78909c,stroke-width:1px;`;

/** Build the 5-item colour key from per-tech labels (order: f, c, d, x, o). */
export function legendOf(labels: [string, string, string, string, string]): BpLegendItem[] {
  const keys = ["f", "c", "d", "x", "o"] as const;
  return keys.map((k, i) => ({ label: labels[i], color: PALETTE[k] }));
}
