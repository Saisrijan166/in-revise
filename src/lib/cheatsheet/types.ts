/** Full reference-driven cheat sheet types (client-safe). */

/** A minimal Markdown AST node (mdast), stripped of positions. */
export interface MdNode {
  type: string;
  value?: string;
  depth?: number;
  lang?: string;
  ordered?: boolean;
  url?: string;
  align?: (string | null)[];
  children?: MdNode[];
}

export interface CheatSection {
  id: string;
  num: number | null;
  title: string;
  /** Importance from the reference (number of stars), 0-3. */
  stars: number;
  chapter: string;
  nodes: MdNode[];
}

export interface CheatChapter {
  id: string;
  title: string;
}

export interface CheatDoc {
  title: string;
  tagline: string;
  chapters: CheatChapter[];
  sections: CheatSection[];
}

/** Techs whose Cheat sheet page uses the full reference-driven document. */
export const FULL_CHEATSHEET = new Set<string>([
  "spring-boot",
  "java",
  "microservices",
  "python",
  "sql",
  "redis",
  "kafka",
  "docker",
  "kubernetes",
  "aws",
  "rest-api",
  "design-patterns",
  "dsa",
  "react",
  "os-networking",
  "ai-engineering",
  "git",
  "linux",
  "system-design",
]);
