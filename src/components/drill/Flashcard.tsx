"use client";

import type { ReactNode } from "react";
import { cx } from "@/lib/ui";

/**
 * One flashcard: question first, tap (or Space/Enter) to reveal. The back face is hidden from
 * assistive tech until revealed, and the button announces its state.
 */
export function Flashcard({
  front,
  back,
  eyebrow,
  flipped,
  onFlip,
  className,
}: {
  front: ReactNode;
  back: ReactNode;
  eyebrow?: ReactNode;
  flipped: boolean;
  onFlip: () => void;
  className?: string;
}) {
  return (
    <div className={cx("flip", className)} data-flipped={flipped}>
      <div className="flip-inner">
        <button
          type="button"
          onClick={onFlip}
          aria-expanded={flipped}
          aria-hidden={flipped}
          tabIndex={flipped ? -1 : 0}
          className="flip-front flex min-h-64 w-full flex-col rounded-3xl border-2 border-line bg-surface p-5 text-left shadow-[var(--shadow)] hover:border-line-strong sm:p-7"
        >
          {eyebrow && <span className="text-xs font-bold tracking-wider text-ink-3 uppercase">{eyebrow}</span>}
          <span className="my-auto block py-4 font-display text-xl leading-snug font-bold text-ink sm:text-2xl">{front}</span>
          <span className="text-sm font-semibold text-accent-ink">Tap to reveal the answer</span>
        </button>
        <div
          aria-hidden={!flipped}
          className="flip-back flex min-h-64 w-full flex-col rounded-3xl border-2 border-accent bg-surface p-5 shadow-[var(--shadow)] sm:p-7"
        >
          {eyebrow && <span className="text-xs font-bold tracking-wider text-accent-ink uppercase">{eyebrow} · answer</span>}
          <div className="prose-card my-auto py-3 text-[1.02rem]">{back}</div>
          <button type="button" onClick={onFlip} tabIndex={flipped ? 0 : -1} className="touch-target self-start rounded-xl text-sm font-semibold text-ink-3 hover:text-ink">
            Show question again
          </button>
        </div>
      </div>
    </div>
  );
}
