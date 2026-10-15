"use client";

import { Dialog } from "radix-ui";
import type { ReactNode } from "react";
import { IconClose, IconMap } from "@/components/ui/icons";

/** Below xl the "Connects to" panel opens as a bottom sheet (CLAUDE.md 5.2 #3). */
export function ConnectsSheet({ count, children }: { count: number; children: ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-line bg-surface px-3 text-sm font-bold text-ink-2 hover:text-ink xl:hidden">
        <IconMap size={16} /> Connects to{" "}
        <span className="rounded-full bg-accent-soft px-1.5 text-xs text-accent-ink">{count}</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay fixed inset-0 z-50 bg-[rgb(10_10_16/45%)]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="sheet-content fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-3xl border-t border-line bg-bg px-4 pt-2 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-[var(--shadow-lg)] sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[420px] sm:rounded-3xl sm:border"
        >
          <div
            className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-line-strong sm:hidden"
            aria-hidden="true"
          />
          <div className="flex items-center justify-between">
            <Dialog.Title className="sr-only">Connects to</Dialog.Title>
            <span />
            <Dialog.Close
              className="touch-target grid place-items-center rounded-xl text-ink-2 hover:text-ink"
              aria-label="Close"
            >
              <IconClose size={20} />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
