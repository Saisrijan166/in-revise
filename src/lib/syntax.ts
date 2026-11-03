/**
 * Daily-Use Syntax Cheat Sheet API (client-safe: no Node imports).
 *
 * A quick reference of the functions, methods and syntax a developer actually
 * writes day to day in a tech — grouped tables of (syntax, what, example) plus
 * combined usage patterns. Each tech's sheet lives in `./syntax/<slug>.ts`; a
 * tech has a Syntax page only when it appears in SYNTAX.
 */
export type { SyntaxSheet, SyntaxGroup, SyntaxRow, SyntaxCombo } from "./syntax/types";
import { SYNTAX } from "./syntax/index";
import type { SyntaxSheet } from "./syntax/types";

export { SYNTAX };

export function hasSyntax(slug: string): boolean {
  return slug in SYNTAX;
}

export function getSyntax(slug: string): SyntaxSheet | undefined {
  return SYNTAX[slug];
}

export function syntaxSlugs(): string[] {
  return Object.keys(SYNTAX);
}
