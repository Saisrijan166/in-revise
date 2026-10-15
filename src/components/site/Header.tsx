"use client";

import Link from "next/link";
import { useUi } from "@/lib/store/ui";
import { urls } from "@/lib/urls";
import { IconSearch } from "@/components/ui/icons";
import { Wordmark } from "./Logo";
import { ModeSwitch } from "./ModeSwitch";
import { ThemeToggle } from "./ThemeToggle";
import { useCurrentTech, type TechLite } from "./useCurrentTech";
import { useShortcutLabel } from "./useShortcutLabel";

export function Header({ techs }: { techs: TechLite[] }) {
  const tech = useCurrentTech(techs);
  const openPalette = () => useUi.getState().setPaletteOpen(true);
  const shortcut = useShortcutLabel();

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-[color-mix(in_oklab,var(--bg)_88%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-2 px-3 sm:px-5">
        <Link href={urls.home()} className="touch-target -ml-1 flex items-center rounded-xl px-1" aria-label="Concept Map home">
          <Wordmark />
        </Link>
        {tech && (
          <Link
            href={urls.deck(tech.slug)}
            className="ml-1 hidden min-h-9 items-center gap-2 rounded-full border border-line bg-surface px-3 text-sm font-semibold text-ink-2 hover:text-ink sm:inline-flex"
          >
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-accent" />
            {tech.name}
          </Link>
        )}

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <ModeSwitch className="hidden md:inline-flex" />
          <button
            type="button"
            onClick={openPalette}
            className="hidden min-h-10 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm text-ink-3 hover:border-line-strong hover:text-ink md:inline-flex"
            aria-label="Search cards, comparisons and terms"
          >
            <IconSearch size={17} />
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden rounded-md border border-line bg-surface-2 px-1.5 font-mono text-[0.7rem] text-ink-3 lg:inline">
              {shortcut}
            </kbd>
          </button>
          <ThemeToggle />
          <Link
            href={urls.progress()}
            className="touch-target hidden items-center justify-center rounded-xl px-2 text-sm font-semibold text-ink-2 hover:bg-surface-2 hover:text-ink sm:inline-flex"
          >
            My progress
          </Link>
        </div>
      </div>
    </header>
  );
}
