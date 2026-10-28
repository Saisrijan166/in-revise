"use client";

import Link from "next/link";
import { useState } from "react";
import { Popover } from "radix-ui";
import { groupBySlug } from "@/lib/categories";
import { urls } from "@/lib/urls";
import { cx } from "@/lib/ui";
import { IconCheck, IconChevronRight } from "@/components/ui/icons";
import type { TechLite } from "./useCurrentTech";

/**
 * The tech name in the top bar, as a switcher: tap it to jump to any other tech from
 * anywhere inside the current one (CLAUDE.md 5.4). The list is grouped by category so a
 * long catalogue stays scannable. It keeps you on the same kind of page where it can
 * (overview), so switching tech does not lose your place in the flow.
 */
export function TechSwitcher({
  techs,
  current,
  className,
}: {
  techs: TechLite[];
  current: TechLite;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const groups = groupBySlug(techs);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className={cx(
          "inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-accent px-3 text-sm font-bold text-on-accent hover:bg-accent-strong",
          className,
        )}
        aria-label={`${current.name} — switch tech`}
      >
        {current.name}
        <IconChevronRight
          size={15}
          className={cx("rotate-90 transition-transform", open && "-rotate-90")}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={8}
          className="popover-content z-50 max-h-[min(70dvh,560px)] w-[320px] overflow-y-auto rounded-2xl border border-line bg-surface p-2 shadow-[var(--shadow-lg)]"
        >
          <p className="px-2 pt-1 pb-2 text-xs font-bold tracking-wider text-ink-3 uppercase">
            Switch tech
          </p>
          <div className="flex flex-col gap-3">
            {groups.map(({ category, items }) => (
              <div key={category.id}>
                <p className="px-2 pb-1 text-xs font-semibold text-ink-3">{category.title}</p>
                <ul>
                  {items.map((t) => {
                    const active = t.slug === current.slug;
                    return (
                      <li key={t.slug} data-accent={t.accent}>
                        <Link
                          href={urls.overview(t.slug)}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={cx(
                            "flex min-h-10 items-center gap-2 rounded-xl px-2 text-sm",
                            active
                              ? "bg-accent-soft font-bold text-accent-ink"
                              : "font-semibold text-ink-2 hover:bg-surface-2 hover:text-ink",
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className="h-2.5 w-2.5 flex-none rounded-full bg-accent"
                          />
                          <span className="min-w-0 flex-1 truncate">{t.name}</span>
                          {active && <IconCheck size={15} className="flex-none text-accent-ink" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
