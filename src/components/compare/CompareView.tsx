import Link from "next/link";
import type { Deck } from "@/lib/content/load";
import type { ComparisonData } from "@/lib/content/schema";
import { urls } from "@/lib/urls";
import { formatDate } from "@/lib/ui";
import { IconLink, IconScale } from "./icons";

const COLS = ["a", "b", "c", "d"] as const;
const SIDE_COLOR = ["var(--t1)", "var(--t2)", "var(--t3)", "var(--t7)"];

export interface Side {
  id: string;
  title: string;
  blurb: string;
  href: string;
}

/** Resolves a compared id to a card, or a glossary term (and its card, if any). */
export function resolveSide(deck: Deck, id: string): Side {
  const card = deck.cardById.get(id);
  if (card) return { id, title: card.meta.title, blurb: card.meta.hook, href: urls.card(deck.slug, id) };
  const t = deck.termById.get(id)!;
  return { id, title: t.term, blurb: t.definition, href: t.see ? urls.card(deck.slug, t.see) : urls.glossary(deck.slug, t.id) };
}

/** Side-by-side table on wide screens, stacked aspect blocks on phones (CLAUDE.md 5.2 #5). */
export function CompareView({ deck, c }: { deck: Deck; c: ComparisonData }) {
  const sides = c.compares.map((id) => resolveSide(deck, id));
  const cols = COLS.slice(0, sides.length);
  const usedIn = deck.cards.filter((card) => card.meta.confusedWith.includes(c.id));

  return (
    <div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {sides.map((s, i) => (
          <li key={s.id} className="relative overflow-hidden rounded-2xl border border-line bg-surface p-4 pl-5">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5" style={{ background: SIDE_COLOR[i] }} />
            <p className="font-display text-lg font-extrabold">
              <Link href={s.href} className="hover:text-accent-ink">
                {s.title}
              </Link>
            </p>
            <p className="mt-1 text-[0.95rem] text-ink-2">{s.blurb}</p>
          </li>
        ))}
      </ul>

      {/* Wide: real table */}
      <div className="scroll-box mt-6 hidden md:block" role="region" aria-label={`${c.title} table`} tabIndex={0}>
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{c.title}</caption>
          <thead>
            <tr className="bg-surface-2">
              <th scope="col" className="w-[22%] px-4 py-3 font-display text-sm font-bold text-ink-3">
                Aspect
              </th>
              {sides.map((s, i) => (
                <th key={s.id} scope="col" className="px-4 py-3 font-display font-bold">
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: SIDE_COLOR[i] }} />
                    {s.title}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.rows.map((row) => (
              <tr key={row.aspect} className="border-t border-line align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-ink-2">
                  {row.aspect}
                </th>
                {cols.map((col) => (
                  <td key={col} className="px-4 py-3 text-ink">
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Narrow: stacked */}
      <ol className="mt-6 flex flex-col gap-3 md:hidden">
        {c.rows.map((row) => (
          <li key={row.aspect} className="rounded-2xl border border-line bg-surface p-4">
            <p className="text-xs font-bold tracking-wider text-ink-3 uppercase">{row.aspect}</p>
            <dl className="mt-2 flex flex-col gap-2">
              {cols.map((col, i) => (
                <div key={col} className="rounded-xl bg-surface-2 px-3 py-2">
                  <dt className="flex items-center gap-2 text-sm font-bold text-ink-2">
                    <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: SIDE_COLOR[i] }} />
                    {sides[i].title}
                  </dt>
                  <dd className="mt-0.5 text-ink">{row[col]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-2xl border-2 border-accent bg-accent-soft p-4 sm:p-5">
        <p className="flex items-center gap-2 text-sm font-bold tracking-wide text-accent-ink uppercase">
          <IconScale /> When to choose which
        </p>
        <p className="mt-1 font-display text-lg leading-snug font-semibold text-ink">{c.verdict}</p>
      </div>

      {usedIn.length > 0 && (
        <p className="mt-6 text-ink-2">
          Explained in:{" "}
          {usedIn.map((card, i) => (
            <span key={card.meta.id}>
              {i > 0 && ", "}
              <Link href={urls.card(deck.slug, card.meta.id)} className="font-semibold text-accent-ink underline underline-offset-2">
                {card.meta.title}
              </Link>
            </span>
          ))}
        </p>
      )}

      <details className="mt-6 rounded-2xl border border-line bg-surface">
        <summary className="flex min-h-12 cursor-pointer items-center gap-2 px-4 font-semibold text-ink-2 hover:text-ink">
          <IconLink size={16} /> Sources ({c.sources.length})
        </summary>
        <ul className="flex flex-col gap-2 border-t border-line px-4 py-3 text-sm">
          {c.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-ink underline underline-offset-2">
                {s.title}
              </a>
              <span className="text-ink-3"> · verified {formatDate(s.verifiedOn)}</span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
