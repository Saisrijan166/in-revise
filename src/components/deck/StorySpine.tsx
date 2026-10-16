import Link from "next/link";
import type { Deck } from "@/lib/content/load";
import { urls } from "@/lib/urls";

/** The story spine as one line of stops: each stop is "problem → fix", with its concepts. */
export function StorySpine({ deck }: { deck: Deck }) {
  return (
    <ol className="relative">
      {deck.spine.map((s, i) => {
        const last = i === deck.spine.length - 1;
        const hasCards = s.cards.length > 0;
        return (
          <li
            key={s.index}
            id={`story-${s.index + 1}`}
            className="relative flex scroll-mt-24 gap-4 pb-5 last:pb-0"
          >
            {!last && (
              <span
                aria-hidden="true"
                className="absolute top-8 bottom-0 left-[15px] w-[4px] rounded-full bg-accent/35"
              />
            )}
            <span
              aria-hidden="true"
              className={
                hasCards
                  ? "relative z-10 grid h-[34px] w-[34px] flex-none place-items-center rounded-full border-4 border-accent bg-surface font-display text-sm font-extrabold text-accent-ink"
                  : "relative z-10 grid h-[34px] w-[34px] flex-none place-items-center rounded-full border-4 border-dashed border-line-strong bg-surface font-display text-sm font-bold text-ink-3"
              }
            >
              {s.index + 1}
            </span>
            <div className="min-w-0 pt-1">
              <p className="leading-snug text-ink-2">
                <span className="sr-only">Stop {s.index + 1}. Problem: </span>
                {s.problem}
              </p>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-[1.05rem] leading-snug font-bold text-ink">
                <span>
                  <span aria-hidden="true" className="text-accent">
                    →{" "}
                  </span>
                  <span className="sr-only">Fix: </span>
                  {s.fix}
                </span>
                {s.cards.map((id) => (
                  <Link
                    key={id}
                    href={urls.concept(deck.slug, id)}
                    className="inline-flex min-h-9 items-center rounded-lg bg-accent px-2.5 font-sans text-sm font-bold text-on-accent hover:bg-accent-strong"
                  >
                    {deck.cardById.get(id)!.meta.title}
                  </Link>
                ))}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
