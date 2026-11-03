/** Daily-Use Syntax Cheat Sheet types (client-safe: no Node imports). */

export interface SyntaxRow {
  /** The exact syntax / method call. */
  syntax: string;
  /** Very short purpose. */
  what: string;
  /** A tiny usable example. */
  example: string;
}

export interface SyntaxCombo {
  label?: string;
  /** A multi-line code snippet showing a real usage pattern. */
  code: string;
}

export interface SyntaxGroup {
  title: string;
  rows: SyntaxRow[];
  /** Optional combined patterns shown as code blocks under the table. */
  combos?: SyntaxCombo[];
}

export interface SyntaxSheet {
  tagline: string;
  baseline: string;
  /** Language label for code blocks (display only). */
  lang: string;
  groups: SyntaxGroup[];
}
