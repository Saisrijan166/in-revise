"use client";

import { useEffect, useState } from "react";
import { setMode } from "@/lib/store/prefs";
import { cx } from "@/lib/ui";
import { IconCards, IconQuote } from "@/components/ui/icons";

export interface TocItem {
  id: string;
  label: string;
  /** Modes in which this section is visible, like data-show on the section. */
  show: string;
}

/**
 * Right-hand panel on wide screens: "On this page" (highlights the section you are reading),
 * a one-line recap, and a shortcut to quiz yourself on this concept.
 */
export function PageAside({ items, recap }: { items: TocItem[]; recap?: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="On this page">
        <p className="mb-2 text-xs font-bold tracking-wider text-ink-3 uppercase">On this page</p>
        <ul className="flex flex-col border-l-2 border-line">
          {items.map((i) => (
            <li key={i.id} data-show={i.show}>
              <a
                href={`#${i.id}`}
                className={cx(
                  "-ml-0.5 flex min-h-9 items-center border-l-2 pl-3 text-sm",
                  active === i.id
                    ? "border-accent font-bold text-ink"
                    : "border-transparent text-ink-2 hover:text-ink",
                )}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {recap && (
        <div data-show="learn revise" className="rounded-2xl bg-accent-soft p-4">
          <p className="mb-1 flex items-center gap-1.5 text-xs font-bold tracking-wider text-accent-ink uppercase">
            <IconQuote size={14} /> 20-second recap
          </p>
          <p className="text-[0.95rem] leading-relaxed text-ink">{recap}</p>
        </div>
      )}

      <button
        type="button"
        data-show="learn revise"
        onClick={() => {
          setMode("quiz");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-line bg-surface font-bold text-ink-2 hover:border-accent hover:text-accent-ink"
      >
        <IconCards size={18} /> Quiz me on this
      </button>
    </div>
  );
}
