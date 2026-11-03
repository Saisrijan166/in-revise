/** Visual Learning Blueprint types (client-safe: no Node imports). */

export interface BpLegendItem {
  label: string;
  color: string;
}

export interface Blueprint {
  tagline: string;
  /** Mermaid flowchart source. */
  chart: string;
  /** Text alternative for the diagram (accessibility + fallback). */
  alt: string;
  /** Colour key matching the diagram's classDef fills. */
  legend: BpLegendItem[];
  baseline: string;
}
