import type { SyntaxSheet } from "./types";
import { java } from "./java";

/** Syntax sheets by tech slug. A tech gets a Syntax page only if it is here. */
export const SYNTAX: Record<string, SyntaxSheet> = {
  java,
};
