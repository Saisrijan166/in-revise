/**
 * Presentation-only grouping of the techs into categories, for the home page and the
 * tech switcher. Kept here (not in `_tech.yaml`) because it is about how we present the
 * catalogue, not about any one tech's content; adding a tech means adding its slug to a
 * group below. A tech with no group falls into "More" so nothing silently disappears.
 */

export interface Category {
  id: string;
  title: string;
  blurb: string;
  slugs: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: "languages",
    title: "Languages & Fundamentals",
    blurb: "The core you code and reason with.",
    slugs: ["java", "dsa", "os-networking"],
  },
  {
    id: "backend",
    title: "Backend & Frameworks",
    blurb: "Build and structure services.",
    slugs: ["spring-boot", "rest-api", "microservices", "design-patterns"],
  },
  {
    id: "data",
    title: "Data & Messaging",
    blurb: "Store, query and move data.",
    slugs: ["sql", "redis", "kafka"],
  },
  {
    id: "infra",
    title: "Infrastructure & Cloud",
    blurb: "Ship, run and scale it.",
    slugs: ["docker", "kubernetes", "aws"],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "What the user sees.",
    slugs: ["react"],
  },
  {
    id: "architecture",
    title: "Architecture & AI",
    blurb: "Design whole systems and AI features.",
    slugs: ["system-design", "ai-engineering"],
  },
];

/** The category a slug belongs to, or undefined if it is not grouped yet. */
export function categoryOf(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slugs.includes(slug));
}

/**
 * The global display order of techs: category order, then the order within each category,
 * then any ungrouped techs (alphabetical, as they load). Used so the home page, the tech
 * switcher and anywhere else that lists every tech agree on one order.
 */
export function orderSlugs(allSlugs: string[]): string[] {
  const grouped = CATEGORIES.flatMap((c) => c.slugs).filter((s) => allSlugs.includes(s));
  const rest = allSlugs.filter((s) => !grouped.includes(s));
  return [...grouped, ...rest];
}

/**
 * Group a list of items that each carry a `slug` into the categories, in order. Items with no
 * category are collected under a trailing "More" group so none are lost.
 */
export function groupBySlug<T extends { slug: string }>(
  items: T[],
): { category: Category; items: T[] }[] {
  const bySlug = new Map(items.map((i) => [i.slug, i]));
  const groups = CATEGORIES.map((category) => ({
    category,
    items: category.slugs.map((s) => bySlug.get(s)).filter((x): x is T => Boolean(x)),
  })).filter((g) => g.items.length > 0);

  const grouped = new Set(CATEGORIES.flatMap((c) => c.slugs));
  const rest = items.filter((i) => !grouped.has(i.slug));
  if (rest.length) {
    groups.push({
      category: { id: "more", title: "More", blurb: "", slugs: rest.map((r) => r.slug) },
      items: rest,
    });
  }
  return groups;
}
