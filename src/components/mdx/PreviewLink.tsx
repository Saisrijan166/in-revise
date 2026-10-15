"use client";

import Link from "next/link";
import { Popover } from "radix-ui";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Level } from "@/lib/content/schema";
import { HeatChip, LevelChip } from "@/components/ui/chips";
import { IconArrowRight, IconBook } from "@/components/ui/icons";

/**
 * Concept and glossary previews (CLAUDE.md 5.4): hover on desktop, tap on touch.
 * Concept links still navigate on click with a mouse; on touch the first tap opens the
 * preview, which has an explicit "Open card" link.
 */

export type Preview =
  | { kind: "card"; title: string; hook: string; level: Level; heat: number; href: string }
  | { kind: "term"; term: string; definition: string; glossaryHref: string; seeHref?: string; seeTitle?: string };

const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export function PreviewLink({ preview, children }: { preview: Preview; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);
  const hoverOpened = useRef(false);

  useEffect(
    () => () => {
      window.clearTimeout(openTimer.current);
      window.clearTimeout(closeTimer.current);
    },
    [],
  );

  const scheduleOpen = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    openTimer.current = window.setTimeout(() => {
      hoverOpened.current = true;
      setOpen(true);
    }, 280);
  };
  const scheduleClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  };

  const triggerClass =
    preview.kind === "card"
      ? "font-semibold text-accent-ink underline decoration-[color-mix(in_oklab,var(--accent)_55%,transparent)] decoration-2 underline-offset-[3px] hover:decoration-accent"
      : "cursor-help text-inherit underline decoration-dotted decoration-2 underline-offset-[3px] decoration-[color-mix(in_oklab,var(--ink-3)_80%,transparent)] hover:decoration-accent";

  return (
    <Popover.Root
      open={open}
      onOpenChange={(o) => {
        if (!o) hoverOpened.current = false;
        setOpen(o);
      }}
    >
      {preview.kind === "card" ? (
        <Popover.Anchor asChild>
          <Link
            href={preview.href}
            className={`no-underline ${triggerClass}`}
            onPointerEnter={scheduleOpen}
            onPointerLeave={scheduleClose}
            onClick={(e) => {
              if (!canHover() && !open) {
                e.preventDefault();
                setOpen(true);
              }
            }}
            aria-describedby={undefined}
          >
            {children}
          </Link>
        </Popover.Anchor>
      ) : (
        <Popover.Trigger asChild>
          <button
            type="button"
            className={`inline p-0 text-left font-[inherit] ${triggerClass}`}
            onPointerEnter={scheduleOpen}
            onPointerLeave={scheduleClose}
            aria-label={`${preview.term}: show definition`}
          >
            {children}
          </button>
        </Popover.Trigger>
      )}
      <Popover.Portal>
        <Popover.Content
          side="top"
          align="start"
          sideOffset={8}
          collisionPadding={12}
          onOpenAutoFocus={(e) => {
            if (hoverOpened.current) e.preventDefault();
          }}
          onPointerEnter={() => window.clearTimeout(closeTimer.current)}
          onPointerLeave={scheduleClose}
          className="pop-content z-50 w-[min(22rem,calc(100vw-24px))] rounded-2xl border border-line bg-surface p-4 text-left text-sm shadow-[var(--shadow-lg)] outline-none"
        >
          {preview.kind === "card" ? (
            <div className="space-y-2.5">
              <div className="flex flex-wrap gap-1.5">
                <LevelChip level={preview.level} />
                <HeatChip heat={preview.heat} compact />
              </div>
              <p className="font-display text-base font-bold text-ink">{preview.title}</p>
              <p className="leading-relaxed text-ink-2">{preview.hook}</p>
              <Link
                href={preview.href}
                className="touch-target inline-flex items-center gap-1.5 rounded-xl bg-accent px-3 font-semibold text-on-accent"
                onClick={() => setOpen(false)}
              >
                Open card <IconArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              <p className="flex items-center gap-2 font-display text-base font-bold text-ink">
                <IconBook size={16} className="text-accent" /> {preview.term}
              </p>
              <p className="leading-relaxed text-ink-2">{preview.definition}</p>
              <div className="flex flex-wrap gap-2">
                {preview.seeHref && (
                  <Link
                    href={preview.seeHref}
                    className="touch-target inline-flex items-center gap-1.5 rounded-xl bg-accent px-3 font-semibold text-on-accent"
                    onClick={() => setOpen(false)}
                  >
                    {preview.seeTitle ?? "Open card"} <IconArrowRight size={16} />
                  </Link>
                )}
                <Link
                  href={preview.glossaryHref}
                  className="touch-target inline-flex items-center rounded-xl border border-line px-3 font-semibold text-ink-2 hover:text-ink"
                  onClick={() => setOpen(false)}
                >
                  Glossary
                </Link>
              </div>
            </div>
          )}
          <Popover.Arrow className="fill-[var(--surface)]" width={14} height={7} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
