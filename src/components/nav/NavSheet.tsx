"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import type { TechNav } from "@/lib/content";
import { navStore } from "@/lib/store/ui";
import { cx } from "@/lib/ui";
import { IconClose } from "@/components/ui/icons";
import { ModeSwitch } from "@/components/site/ModeSwitch";
import { TECH_TABS, activeTab } from "./tabs";
import { TreeNav } from "./TreeNav";

/** Phones and tablets: the tech's pages, the study mode and the whole tree in one sheet. */
export function NavSheet({ nav }: { nav: TechNav }) {
  const open = navStore.use();
  const pathname = usePathname() ?? "";
  const tab = activeTab(pathname);
  const close = () => navStore.set(false);
  return (
    <Dialog.Root open={open} onOpenChange={navStore.set}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay fixed inset-0 z-50 bg-[rgb(10_10_16/45%)] lg:hidden" />
        <Dialog.Content
          aria-describedby={undefined}
          className="sheet-content fixed inset-x-0 bottom-0 z-50 max-h-[88dvh] overflow-y-auto rounded-t-3xl border-t border-line bg-bg pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-[var(--shadow-lg)] sm:inset-y-0 sm:right-auto sm:left-0 sm:max-h-none sm:w-[380px] sm:rounded-none sm:rounded-r-3xl sm:border-t-0 sm:border-r lg:hidden"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg px-4 py-1">
            <Dialog.Title className="font-display text-base font-extrabold">
              {nav.name}
            </Dialog.Title>
            <Dialog.Close
              className="touch-target grid place-items-center rounded-xl text-ink-2 hover:text-ink"
              aria-label="Close"
            >
              <IconClose size={20} />
            </Dialog.Close>
          </div>
          <div className="flex flex-col gap-5 p-4">
            <div>
              <p className="mb-1.5 text-xs font-bold tracking-wider text-ink-3 uppercase">
                Study mode
              </p>
              <ModeSwitch className="flex w-full [&>button]:flex-1" />
            </div>
            <div className="rounded-2xl border border-line-strong bg-surface p-1.5">
              <p className="mb-1.5 inline-flex min-h-9 items-center rounded-xl bg-accent px-3 text-sm font-bold text-on-accent">
                {nav.name}
              </p>
              <ul className="grid grid-cols-2 gap-1">
                {TECH_TABS.map((t) => {
                  const Icon = t.icon;
                  return (
                    <li key={t.key}>
                      <Link
                        href={t.href(nav.slug)}
                        onClick={close}
                        aria-current={tab === t.key ? "page" : undefined}
                        className={cx(
                          "flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm",
                          tab === t.key
                            ? "bg-accent-soft font-bold text-accent-ink ring-1 ring-accent/40"
                            : "font-semibold text-ink-2 hover:bg-surface-2 hover:text-ink",
                        )}
                      >
                        <Icon size={17} /> {t.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <TreeNav nav={nav} onNavigate={close} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
