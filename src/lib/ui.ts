/** Small client-safe helpers shared by server and client components. */

/** Topic line colour as a CSS value. Only 8 validated hues; later topics fall back to neutral. */
export function topicColor(index: number): string {
  return index < 9 ? `var(--t${index + 1})` : "var(--t-other)";
}

export const LEVEL_LABEL = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  interview: "Interview",
} as const;

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/** ISO "YYYY-MM-DD" → "DD-MM-YYYY" for display. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
}

/** "1 card", "2 cards". */
export function plural(n: number, word: string, many = `${word}s`): string {
  return `${n} ${n === 1 ? word : many}`;
}
