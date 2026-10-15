"use client";

import { Dialog } from "radix-ui";
import { usePathname } from "next/navigation";
import type { DeckNav } from "@/lib/content";
import { useUi } from "@/lib/store/ui";
import { IconClose, IconMenu } from "@/components/ui/icons";
import { ModeSwitch } from "@/components/site/ModeSwitch";
import { DeckNavList } from "./DeckNavList";

/** Below lg: a slim bar with the deck's contents (as a sheet) and, on phones, the mode switch. */
export function DeckBar({ nav }: { nav: DeckNav }) {
  const open = useUi((s) => s.navOpen);
  const setOpen = useUi((s) => s.setNavOpen);
  const pathname = usePathname() ?? "";
  const here = nav.topics.flatMap((t) => t.cards.map((c) => ({ ...c, topic: t.title }))).find((c) => pathname.startsWith(c.href));

  return (
    <div className="no-print sticky top-14 z-30 border-b border-line bg-[color-mix(in_oklab,var(--bg)_92%,transparent)] backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-2 px-3 py-1.5 sm:px-5">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger
            aria-label="Open deck contents"
            className="touch-target inline-flex flex-none items-center justify-center gap-2 rounded-xl border border-line bg-surface px-2.5 text-sm font-semibold text-ink-2 hover:text-ink sm:px-3"
          >
            <IconMenu size={18} />
            <span className="hidden sm:inline">Contents</span>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="overlay fixed inset-0 z-50 bg-[rgb(10_10_16/45%)]" />
            <Dialog.Content
              aria-describedby={undefined}
              className="sheet-content fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-3xl border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] shadow-[var(--shadow-lg)] sm:inset-y-0 sm:right-auto sm:left-0 sm:max-h-none sm:w-[360px] sm:rounded-none sm:rounded-r-3xl sm:border-t-0 sm:border-r"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-surface px-4 py-1">
                <Dialog.Title className="font-display text-base font-bold">Contents</Dialog.Title>
                <Dialog.Close className="touch-target grid place-items-center rounded-xl text-ink-2 hover:text-ink" aria-label="Close contents">
                  <IconClose size={20} />
                </Dialog.Close>
              </div>
              <DeckNavList nav={nav} onNavigate={() => setOpen(false)} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <p className="min-w-0 flex-1 truncate text-sm text-ink-3">
          <span className="font-semibold text-ink-2">{nav.name}</span>
          {here && <span> · {here.topic}</span>}
        </p>
        <ModeSwitch size="sm" className="flex-none md:hidden" />
      </div>
    </div>
  );
}
