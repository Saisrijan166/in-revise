/**
 * Content validator (CLAUDE.md Sections 3 and 8). Runs before every build via `prebuild`.
 * Exits with code 1 on any error, so a broken card can never ship.
 *
 *   npm run validate:content
 */
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import { loadDecks, type Issue } from "../src/lib/content/load";

async function compileCheck(file: string, label: string, source: string, issues: Issue[]) {
  try {
    await compile(source, { remarkPlugins: [remarkGfm] });
  } catch (err) {
    const e = err as { message?: string; line?: number };
    issues.push({ file, message: `${label}: MDX does not compile: ${e.message ?? String(err)}`, severity: "error" });
  }
}

async function main() {
  const started = Date.now();
  const { decks, issues } = loadDecks();

  for (const deck of decks) {
    for (const card of deck.cards) {
      for (const [key, md] of Object.entries(card.sections)) {
        if (md) await compileCheck(card.file, `section "${key}"`, md, issues);
      }
    }
  }

  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warning");

  for (const deck of decks) {
    const terms = deck.glossary.length;
    console.log(
      `• ${deck.name} (${deck.slug}): ${deck.cards.length} cards, ${deck.comparisons.length} comparisons, ` +
        `${terms} glossary terms, ${deck.topics.length} topics, ${deck.spine.length} story steps`,
    );
  }
  for (const w of warnings) console.warn(`  warning  ${w.file}: ${w.message}`);
  for (const e of errors) console.error(`  error    ${e.file}: ${e.message}`);

  const ms = Date.now() - started;
  if (errors.length) {
    console.error(`\n✗ Content validation failed: ${errors.length} error(s), ${warnings.length} warning(s) in ${ms}ms`);
    process.exit(1);
  }
  console.log(`\n✓ Content valid: ${warnings.length} warning(s) in ${ms}ms`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
