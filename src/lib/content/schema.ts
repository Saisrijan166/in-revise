import { z } from "zod";

/**
 * Content schema. Mirrors CLAUDE.md Section 3. Shared by the site loader and
 * scripts/validate-content.ts, so the build and the validator can never disagree.
 */

export const LEVELS = ["beginner", "intermediate", "interview"] as const;
export const VISUALS = ["flow", "table", "analogy", "code", "none"] as const;
/** Accent names with tuned light/dark values in src/app/globals.css. */
export const ACCENTS = ["blue", "orange", "green", "violet", "rose", "teal", "amber"] as const;

export type Level = (typeof LEVELS)[number];
export type Visual = (typeof VISUALS)[number];
export type Accent = (typeof ACCENTS)[number];

export const LEVEL_RANK: Record<Level, number> = { beginner: 0, intermediate: 1, interview: 2 };

/** Body sections a card may have, in display order. `##` heading text must match exactly. */
export const SECTION_DEFS = [
  { key: "why", heading: "Why it exists", required: true },
  { key: "how", heading: "How it works", required: true },
  { key: "analogy", heading: "Analogy", required: false },
  { key: "example", heading: "Example", required: false },
  { key: "rules", heading: "Rules & defaults", required: false },
  { key: "canCannot", heading: "Can / Cannot", required: false },
  { key: "questions", heading: "Interview Qs", required: true },
  { key: "mistake", heading: "Mistake alert", required: false },
  { key: "sayIt", heading: "Say it like this", required: false },
] as const;

export type SectionKey = (typeof SECTION_DEFS)[number]["key"];

/** MDX components authors may use inside cards. Anything else fails validation. */
export const ALLOWED_COMPONENTS = ["Analogy", "Steps", "Step", "Mermaid", "Note"] as const;

/** Route segments a tech slug must not use (they are top-level routes). */
export const RESERVED_SLUGS = ["progress", "search-index.json", "_next", "404"];

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

const idList = z.array(kebab).default([]);

export const cardMetaSchema = z
  .object({
    id: kebab,
    tech: kebab,
    title: z.string().min(2).max(60),
    topic: kebab,
    level: z.enum(LEVELS),
    heat: z.int().min(1).max(3),
    hook: z.string().min(10).max(170),
    needs: idList,
    leadsTo: idList,
    related: idList,
    confusedWith: idList,
    tags: z.array(z.string().min(1)).default([]),
    visual: z.enum(VISUALS),
    sources: z.array(sourceSchema).min(1, "every card needs at least one source"),
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
    compares: z.array(kebab).min(2).max(4),
    rows: z.array(compareRow).min(3, "use 3–7 rows").max(7, "use 3–7 rows"),
    verdict: z.string().min(10).max(220),
    sources: z.array(sourceSchema).min(1),
  })
  .strict();

const spineStep = z.union([
  z.string().min(5),
  z
    .object({
      step: z.string().min(5),
      cards: idList,
    })
    .strict(),
]);

export const techSchema = z
  .object({
    name: z.string().min(2),
    slug: kebab,
    accent: z.enum(ACCENTS),
    summary: z.string().min(10).max(200),
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

export const glossarySchema = z
  .object({
    terms: z.array(
      z
        .object({
          id: kebab,
          term: z.string().min(1),
          aka: z.array(z.string().min(1)).default([]),
          definition: z
            .string()
            .min(5)
            .max(200, "keep definitions to one line (max 200 chars)")
            .refine((s) => !s.includes("\n"), "definition must be one line"),
          see: kebab.optional(),
          source: sourceSchema,
        })
        .strict(),
    ),
  })
  .strict();

export type Source = z.infer<typeof sourceSchema>;
export type CardMeta = z.infer<typeof cardMetaSchema>;
export type ComparisonData = z.infer<typeof comparisonSchema>;
export type TechData = z.infer<typeof techSchema>;
export type GlossaryTerm = z.infer<typeof glossarySchema>["terms"][number];
