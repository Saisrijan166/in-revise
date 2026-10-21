import { z } from "zod";

/**
 * Content schema (template v2, Phase 2; template v3 = the teaching template, opted in per tech
 * with `template: 3` in _tech.yaml). Mirrors CLAUDE.md Section 3. Shared by the site loader
 * and scripts/validate-content.ts, so the build and the validator can never disagree.
 */

export const LEVELS = ["beginner", "intermediate", "interview"] as const;
export const VISUALS = ["flow", "table", "analogy", "code", "none"] as const;
/** Accent names with tuned light/dark values in src/app/globals.css. */
export const ACCENTS = [
  "blue",
  "orange",
  "green",
  "violet",
  "rose",
  "teal",
  "amber",
  "indigo",
  "sky",
  "cyan",
  "red",
  "fuchsia",
  "lime",
  "pink",
  "slate",
  "purple",
] as const;

/** Kinds of key point. Each gets its own marker so a page can be scanned, not read. */
export const POINT_KINDS = ["key", "plus", "minus", "default"] as const;

export type Level = (typeof LEVELS)[number];
export type Visual = (typeof VISUALS)[number];
export type Accent = (typeof ACCENTS)[number];
export type PointKind = (typeof POINT_KINDS)[number];

/**
 * Body sections a concept may have, in display order. `##` heading text must match exactly.
 * `v`: the templates that allow the section; `required`: the templates that need it.
 */
export const SECTION_DEFS = [
  { key: "what", heading: "What it is", v: [3], required: [3] },
  { key: "why", heading: "Why it exists", v: [2, 3], required: [2, 3] },
  { key: "how", heading: "How it works", v: [2, 3], required: [2, 3] },
  { key: "analogy", heading: "Analogy", v: [2, 3], required: [] },
  { key: "example", heading: "Example", v: [2, 3], required: [] },
  { key: "defaults", heading: "Defaults", v: [2], required: [] },
  { key: "rules", heading: "Rules and defaults", v: [3], required: [] },
  { key: "confusion", heading: "Not to be confused with", v: [3], required: [] },
  { key: "mistakes", heading: "Common mistakes", v: [3], required: [] },
  { key: "questions", heading: "Interview Qs", v: [2, 3], required: [2, 3] },
] as const;

export const TEMPLATES = [2, 3] as const;
export type Template = (typeof TEMPLATES)[number];

export type SectionKey = (typeof SECTION_DEFS)[number]["key"];

/** MDX components authors may use inside concepts. Anything else fails validation. */
export const ALLOWED_COMPONENTS = ["Analogy", "Steps", "Step", "Mermaid", "Note", "Compare"] as const;

/** Route segments a tech slug must not use (top-level routes). */
export const RESERVED_SLUGS = ["search-index.json", "_next", "404", "icon.svg"];
/** Route segments a concept id must not use (they are pages inside a tech). */
export const RESERVED_CONCEPT_IDS = ["tree", "compare", "cheatsheet", "quiz", "glossary"];

const kebab = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be kebab-case (a-z, 0-9, single dashes)");

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD")
  .refine((s) => !Number.isNaN(Date.parse(`${s}T00:00:00Z`)), "is not a real date");

export const sourceSchema = z
  .object({
    title: z.string().min(3),
    url: z.url({ protocol: /^https?$/ }),
    verifiedOn: isoDate,
  })
  .strict();

const oneLine = (max: number) =>
  z
    .string()
    .min(2)
    .max(max, `keep it short (max ${max} characters)`)
    .refine((s) => !s.includes("\n"), "must be one line");

export const pointSchema = z
  .object({
    k: oneLine(30),
    v: oneLine(110),
    kind: z.enum(POINT_KINDS).default("key"),
  })
  .strict();

export const cardMetaSchema = z
  .object({
    id: kebab,
    tech: kebab,
    title: z.string().min(2).max(60),
    topic: kebab,
    level: z.enum(LEVELS),
    heat: z.int().min(1).max(3),
    hook: oneLine(170),
    points: z.array(pointSchema).min(3, "give 3–6 key points").max(6, "give 3–6 key points"),
    trap: z
      .object({
        wrong: oneLine(120),
        right: oneLine(160),
        /** Template v3: why people believe the wrong line (Learn mode and Quiz only). */
        why: oneLine(240).optional(),
      })
      .strict()
      .optional(),
    sayIt: oneLine(280).optional(),
    /** Template v3: concepts of this tech the reader should know first (they come earlier). */
    buildsOn: z.array(kebab).max(3).default([]),
    /** Template v3: scenario, output or "which one" questions; Quiz only. */
    scenarios: z
      .array(z.object({ q: oneLine(240), a: oneLine(360) }).strict())
      .max(3)
      .default([]),
    confusedWith: z.array(kebab).default([]),
    tags: z.array(z.string().min(1)).default([]),
    visual: z.enum(VISUALS),
    sources: z.array(sourceSchema).min(1, "every concept needs at least one source"),
  })
  .strict();

const compareRow = z
  .object({
    aspect: z.string().min(2).max(60),
    a: z.string().min(1).max(140),
    b: z.string().min(1).max(140),
    c: z.string().min(1).max(140).optional(),
    d: z.string().min(1).max(140).optional(),
  })
  .strict();

export const comparisonSchema = z
  .object({
    id: kebab,
    tech: kebab,
    title: z.string().min(3).max(70),
    /** Concept-tree node ids (a concept or a type inside one). */
    compares: z.array(kebab).min(2).max(4),
    /** One short line per side, shown before you open the comparison. */
    gist: z.array(oneLine(70)),
    /** Template v3: each side explained on its own first, in plain words (one per side). */
    explain: z.array(oneLine(260)).optional(),
    /** Template v3: one small scenario that shows the difference. */
    example: oneLine(400).optional(),
    /** Template v3: a ready interview answer. */
    sayIt: oneLine(300).optional(),
    /** Optional mini diagram per side (Mermaid), with one text alternative for all of them. */
    diagrams: z.array(z.string().min(10)).optional(),
    diagramAlt: z.string().min(10).optional(),
    rows: z.array(compareRow).min(3, "use 3–7 rows").max(7, "use 3–7 rows"),
    verdict: oneLine(220),
    sources: z.array(sourceSchema).min(1),
  })
  .strict();

const spineStep = z.union([
  z.string().min(5),
  z
    .object({
      step: z.string().min(5),
      cards: z.array(kebab).default([]),
    })
    .strict(),
]);

export const techSchema = z
  .object({
    name: z.string().min(2),
    slug: kebab,
    accent: z.enum(ACCENTS),
    summary: z.string().min(10).max(200),
    /** App-code languages: an example in one of them is shown in all of them, as adjacent tabs. */
    /** Concept template: 2 (compact) or 3 (teaching: what, why, how, example explained, mistakes). */
    template: z
      .union([z.literal(2), z.literal(3)])
      .default(2),
    codeLanguages: z
      .array(z.string().regex(/^[a-z]+$/))
      .min(1)
      .default(["java", "python"]),
    storySpine: z.array(spineStep).min(3),
    topics: z
      .array(
        z
          .object({
            id: kebab,
            title: z.string().min(2),
            order: z.int(),
            blurb: z.string().max(140).optional(),
          })
          .strict(),
      )
      .min(1),
  })
  .strict();

/** A node of the concept tree: a concept (card), a type of one, or a grouping label. */
export interface TreeNodeInput {
  id: string;
  label?: string;
  note?: string;
  term?: string;
  children?: TreeNodeInput[];
}

export const treeNodeSchema: z.ZodType<TreeNodeInput> = z.lazy(() =>
  z
    .object({
      id: kebab,
      label: z.string().min(1).max(60).optional(),
      note: oneLine(80).optional(),
      term: kebab.optional(),
      children: z.array(treeNodeSchema).optional(),
    })
    .strict(),
);

export const treeSchema = z
  .object({
    sources: z.array(sourceSchema).min(1),
    /** Topic id → nodes, for every topic in _tech.yaml. */
    topics: z.record(kebab, z.array(treeNodeSchema).min(1)),
  })
  .strict();

export const glossarySchema = z
  .object({
    terms: z.array(
      z
        .object({
          id: kebab,
          term: z.string().min(1),
          aka: z.array(z.string().min(1)).default([]),
          definition: oneLine(200),
          see: kebab.optional(),
          source: sourceSchema,
        })
        .strict(),
    ),
  })
  .strict();

export type Source = z.infer<typeof sourceSchema>;
export type CardMeta = z.infer<typeof cardMetaSchema>;
export type Point = z.infer<typeof pointSchema>;
export type ComparisonData = z.infer<typeof comparisonSchema>;
export type TechData = z.infer<typeof techSchema>;
export type GlossaryTerm = z.infer<typeof glossarySchema>["terms"][number];
