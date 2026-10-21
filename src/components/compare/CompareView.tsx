import Link from "next/link";
import type { Deck } from "@/lib/content/load";
import type { ComparisonData } from "@/lib/content/schema";
import { nodeHref } from "@/lib/content/nav";
import { formatDate } from "@/lib/ui";
import { renderInline } from "@/lib/inline";
import { Mermaid } from "@/components/mdx/Mermaid";
import { IconArrowRight, IconLink } from "@/components/ui/icons";
import { IconScale } from "./icons";

const COLS = ["a", "b", "c", "d"] as const;
export const SIDE_COLOR = ["var(--t1)", "var(--t2)", "var(--t3)", "var(--t7)"];

export interface Side {
  id: string;
  title: string;
  href: string;
}

export function resolveSide(deck: Deck, id: string): Side {
  const node = deck.nodeById.get(id);
  return { id, title: node?.label ?? id, href: node ? nodeHref(deck.slug, node) : "#" };
}

/** The two (or more) sides at a glance: colour, name and the one-line gist. */
export function CompareGist({
  deck,
  c,
  size = "md",
}: {
  deck: Deck;
  c: ComparisonData;
  size?: "sm" | "md";
}) {
  const sides = c.compares.map((id) => resolveSide(deck, id));
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {sides.map((s, i) => (
        <li key={s.id} className="flex gap-3 rounded-xl bg-surface-2 px-3 py-2.5">
          <span
            aria-hidden="true"
            className="mt-1 h-3 w-3 flex-none rounded-full"
            style={{ background: SIDE_COLOR[i] }}
          />
          <span className="min-w-0">
            <span
              className={
                size === "sm"
                  ? "block font-bold text-ink"
                  : "block font-display text-lg font-bold text-ink"
              }
            >
              {s.title}
            </span>
            <span className="block text-ink-2">{c.gist[i]}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Template v3: each side explained on its own, in plain words, before the differences. */
function CompareExplain({ deck, c }: { deck: Deck; c: ComparisonData }) {
  if (!c.explain) return null;
  const sides = c.compares.map((id) => resolveSide(deck, id));
  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-2">
        {c.explain.map((text, i) => (
          <li key={sides[i].id} className="flex gap-3 text-ink-2">
            <span
              aria-hidden="true"
              className="mt-2 h-2.5 w-2.5 flex-none rounded-full"
              style={{ background: SIDE_COLOR[i] }}
            />
            <span>
              <strong className="text-ink">{sides[i].title}: </strong>
              {renderInline(text)}
            </span>
          </li>
        ))}
      </ul>
      {c.example && (
        <p className="rounded-2xl border border-line bg-surface px-4 py-3 text-ink-2">
          <strong className="text-ink">Example: </strong>
          {renderInline(c.example)}
        </p>
      )}
    </div>
  );
}

/** One small diagram per side, side by side on wide screens. */
function CompareDiagrams({ deck, c }: { deck: Deck; c: ComparisonData }) {
  if (!c.diagrams) return null;
  const sides = c.compares.map((id) => resolveSide(deck, id));
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {c.diagrams.map((chart, i) => (
        <figure key={i} className="overflow-hidden rounded-2xl border border-line bg-surface">
          <figcaption className="flex items-center gap-2 border-b border-line px-3 py-2 text-sm font-bold text-ink">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: SIDE_COLOR[i] }}
            />
            {sides[i].title}
          </figcaption>
          <Mermaid chart={chart} alt={c.diagramAlt ?? c.title} bare />
        </figure>
      ))}
      {c.diagramAlt && (
        <details className="text-sm text-ink-2 sm:col-span-2">
          <summary className="touch-target flex cursor-pointer items-center font-semibold text-ink-3 hover:text-ink">
            Text version of these diagrams
          </summary>
          <p className="pb-1">{c.diagramAlt}</p>
        </details>
      )}
    </div>
  );
}

function CompareRows({ deck, c }: { deck: Deck; c: ComparisonData }) {
  const sides = c.compares.map((id) => resolveSide(deck, id));
  const cols = COLS.slice(0, sides.length);
  return (
    <>
      {/* Wide: a real table */}
      <div
        className="scroll-box hidden md:block"
        role="region"
        aria-label={`${c.title} table`}
        tabIndex={0}
      >
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{c.title}</caption>
          <thead>
            <tr className="bg-surface-2">
              <th scope="col" className="w-[22%] px-4 py-3 text-sm font-bold text-ink-3">
                Aspect
              </th>
              {sides.map((s, i) => (
                <th key={s.id} scope="col" className="px-4 py-3 font-display font-bold text-ink">
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: SIDE_COLOR[i] }}
                    />
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
      {/* Narrow: one block per aspect */}
      <dl className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-surface md:hidden">
        {c.rows.map((row) => (
          <div key={row.aspect} className="px-4 py-3">
            <dt className="text-xs font-bold tracking-wider text-ink-3 uppercase">{row.aspect}</dt>
            {cols.map((col, i) => (
              <dd key={col} className="mt-1.5 flex gap-2.5 text-ink">
                <span
                  aria-hidden="true"
                  className="mt-2 h-2.5 w-2.5 flex-none rounded-full"
                  style={{ background: SIDE_COLOR[i] }}
                />
                <span>
                  <span className="sr-only">{sides[i].title}: </span>
                  {row[col]}
                </span>
              </dd>
            ))}
          </div>
        ))}
      </dl>
    </>
  );
}

export function Verdict({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border-2 border-accent bg-accent-soft p-4">
      <p className="flex items-center gap-2 text-sm font-bold tracking-wide text-accent-ink uppercase">
        <IconScale /> When to choose which
      </p>
      <p className="mt-1 font-display text-lg leading-snug font-semibold text-ink">{text}</p>
    </div>
  );
}

/** Full comparison: gist, diagrams, table, verdict (and sources on the comparison page). */
export function CompareView({
  deck,
  c,
  embedded,
}: {
  deck: Deck;
  c: ComparisonData;
  embedded?: boolean;
}) {
  const usedIn = deck.cards.filter((card) => card.meta.confusedWith.includes(c.id));
  return (
    <div className="flex flex-col gap-4">
      <CompareGist deck={deck} c={c} />
      <CompareExplain deck={deck} c={c} />
      <CompareDiagrams deck={deck} c={c} />
      {embedded ? (
        <details className="group rounded-2xl border border-line bg-surface">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-2 px-4 font-semibold text-ink-2 hover:text-ink [&::-webkit-details-marker]:hidden">
            All {c.rows.length} differences
            <span className="text-sm text-ink-3 group-open:hidden">Show</span>
            <span className="hidden text-sm text-ink-3 group-open:inline">Hide</span>
          </summary>
          <div className="p-2 pt-0">
            <CompareRows deck={deck} c={c} />
          </div>
        </details>
      ) : (
        <CompareRows deck={deck} c={c} />
      )}
      <Verdict text={c.verdict} />
      {c.sayIt && (
        <p className="text-ink-2">
          <strong className="text-ink">Say it in the interview: </strong>
          {renderInline(c.sayIt)}
        </p>
      )}
      {embedded ? null : (
        <>
          {usedIn.length > 0 && (
            <p className="text-ink-2">
              Explained in:{" "}
              {usedIn.map((card, i) => (
                <span key={card.meta.id}>
                  {i > 0 && ", "}
                  <Link
                    href={nodeHref(deck.slug, deck.nodeById.get(card.meta.id)!)}
                    className="font-semibold text-accent-ink underline underline-offset-2"
                  >
                    {card.meta.title}
                  </Link>
                </span>
              ))}
            </p>
          )}
          <details className="rounded-2xl border border-line bg-surface">
            <summary className="flex min-h-12 cursor-pointer items-center gap-2 px-4 font-semibold text-ink-2 hover:text-ink">
              <IconLink size={16} /> Sources ({c.sources.length})
            </summary>
            <ul className="flex flex-col gap-2 border-t border-line px-4 py-3 text-sm">
              {c.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent-ink underline underline-offset-2"
                  >
                    {s.title}
                  </a>
                  <span className="text-ink-3"> · checked {formatDate(s.verifiedOn)}</span>
                </li>
              ))}
            </ul>
          </details>
        </>
      )}
    </div>
  );
}

export function CompareLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-accent-ink hover:underline"
    >
      Open the full comparison <IconArrowRight size={15} />
    </Link>
  );
}
