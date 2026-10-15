import Link from "next/link";
import type { Deck } from "@/lib/content/load";
import { urls } from "@/lib/urls";
import { topicColor } from "@/lib/ui";
import { StatusDot } from "./StatusDot";

/** The story spine as a transit line: each stop is "problem → fix", with its cards as platforms. */
export function StorySpine({ deck }: { deck: Deck }) {
  return (
    <ol className="relative mt-2">
      {deck.spine.map((s, i) => {
        const last = i === deck.spine.length - 1;
        return (
          <li
            key={s.index}
            id={`story-${s.index + 1}`}
            className="relative flex scroll-mt-32 gap-4 pb-6 last:pb-0"
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
                s.cards.length
                  ? "relative z-10 grid h-[34px] w-[34px] flex-none place-items-center rounded-full border-4 border-accent bg-surface font-display text-sm font-extrabold text-accent-ink"
                  : "relative z-10 grid h-[34px] w-[34px] flex-none place-items-center rounded-full border-4 border-dashed border-line-strong bg-surface font-display text-sm font-bold text-ink-3"
              }
            >
              {s.index + 1}
            </span>
            <div className="min-w-0 pt-1">
              <p className="text-[0.98rem] leading-snug text-ink-2">
                <span className="sr-only">Step {s.index + 1}. Problem: </span>
                {s.problem}
              </p>
              <p className="mt-0.5 font-display text-[1.08rem] leading-snug font-bold text-ink">
                <span aria-hidden="true" className="text-accent">
                  →{" "}
                </span>
                <span className="sr-only">Fix: </span>
                {s.fix}
              </p>
              {s.cards.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {s.cards.map((id) => {
                    const c = deck.cardById.get(id)!;
                    const topic = deck.topics.find((t) => t.id === c.meta.topic)!;
                    return (
                      <li key={id}>
                        <Link
                          href={urls.card(deck.slug, id)}
                          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface py-1 pr-3.5 pl-2 text-sm font-semibold text-ink hover:border-accent hover:text-accent-ink"
                        >
                          <StatusDot tech={deck.slug} id={id} color={topicColor(topic.index)} />
                          {c.meta.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
