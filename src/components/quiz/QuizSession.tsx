"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { IconArrowLeft, IconArrowRight, IconRestart } from "@/components/ui/icons";
import { Flashcard } from "./Flashcard";

export interface QuizItem {
  key: string;
  cardId: string;
  cardTitle: string;
  cardHref: string;
  /** "One-liner", "Interview question", "Trap", "Connection". */
  eyebrow: string;
  q: ReactNode;
  a: ReactNode;
}

/** Question first, tap to see the answer, then next. No scores, nothing to manage. */
export function QuizSession({ items }: { items: QuizItem[] }) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);

  if (!items.length) {
    return (
      <p className="rounded-2xl border border-dashed border-line p-6 text-ink-2">
        No questions match these filters.
      </p>
    );
  }

  const go = (n: number) => {
    setFlipped(false);
    setI(Math.max(0, Math.min(items.length, n)));
  };

  if (i >= items.length) {
    return (
      <div className="rounded-3xl border border-line bg-surface p-6 text-center" aria-live="polite">
        <p className="font-display text-2xl font-extrabold">All {items.length} done</p>
        <p className="mt-1 text-ink-2">Run it again, or pick another topic.</p>
        <button
          type="button"
          onClick={() => go(0)}
          className="touch-target mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-4 font-bold text-on-accent hover:bg-accent-strong"
        >
          <IconRestart size={18} /> Again
        </button>
      </div>
    );
  }

  const item = items[i];
  return (
    <div
      data-no-swipe
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(i + 1);
        else if (e.key === "ArrowLeft") go(i - 1);
      }}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        const s = touch.current;
        touch.current = null;
        if (!s) return;
        const dx = e.changedTouches[0].clientX - s.x;
        const dy = e.changedTouches[0].clientY - s.y;
        if (Math.abs(dx) > 70 && Math.abs(dy) < Math.abs(dx) * 0.6) go(dx < 0 ? i + 1 : i - 1);
      }}
    >
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-ink-2" aria-live="polite">
          {i + 1} of {items.length}
        </span>
        <Link
          href={item.cardHref}
          className="inline-flex min-h-11 min-w-11 items-center justify-end truncate font-semibold text-accent-ink hover:underline"
        >
          {item.cardTitle}
        </Link>
      </div>
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${((i + 1) / items.length) * 100}%` }}
        />
      </div>

      <Flashcard
        key={item.key}
        front={item.q}
        back={item.a}
        eyebrow={item.eyebrow}
        flipped={flipped}
        onFlip={() => setFlipped((f) => !f)}
      />

      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => go(i - 1)}
          disabled={i === 0}
          className="touch-target inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3 font-semibold text-ink-2 hover:text-ink disabled:opacity-40"
        >
          <IconArrowLeft size={18} /> Back
        </button>
        <p className="hidden text-xs text-ink-3 sm:block">Tap the card to flip · ← → to move</p>
        <button
          type="button"
          onClick={() => go(i + 1)}
          className="touch-target inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 font-bold text-on-accent hover:bg-accent-strong"
        >
          Next <IconArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
