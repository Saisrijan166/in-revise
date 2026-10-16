"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navStore, paletteStore } from "@/lib/store/ui";
import { urls } from "@/lib/urls";
import { cx } from "@/lib/ui";
import { IconHome, IconMenu, IconSearch } from "@/components/ui/icons";
import { TECH_TABS, activeTab, isConceptPath } from "@/components/nav/tabs";
import { Wordmark } from "./Logo";
import { ModeSwitch } from "./ModeSwitch";
import { ThemeToggle } from "./ThemeToggle";
import { useCurrentTech, type TechLite } from "./useCurrentTech";
import { useShortcutLabel } from "./useShortcutLabel";

/**
 * One header for every screen size:
 * desktop: brand · Home · the tech's pages · search · theme;
 * phone: brand · Learn/Revise/Quiz (on concept pages) · theme. Menus live in the bottom bar.
 */
export function Header({ techs }: { techs: TechLite[] }) {
  const pathname = usePathname() ?? "/";
  const tech = useCurrentTech(techs);
  const shortcut = useShortcutLabel();
  const tab = activeTab(pathname);
  const onConcept = Boolean(tech) && isConceptPath(pathname);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-[color-mix(in_oklab,var(--bg)_90%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1480px] items-center gap-1 px-3 sm:px-5">
        <Link
          href={urls.home()}
          className="touch-target -ml-1 flex flex-none items-center rounded-xl px-1"
          aria-label="inrevise home"
        >
          <Wordmark compact={onConcept} />
        </Link>

        <nav aria-label="Main" className="ml-3 hidden items-center gap-0.5 lg:flex">
          <Link
            href={urls.home()}
            aria-current={pathname === "/" ? "page" : undefined}
            className={cx(
              "inline-flex min-h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold",
              pathname === "/" ? "bg-ink text-bg" : "text-ink-2 hover:bg-surface-2 hover:text-ink",
            )}
          >
            <IconHome size={16} /> Home
          </Link>
          {tech && (
            <>
              <span className="mx-2 h-5 w-px bg-line-strong" aria-hidden="true" />
              <span className="mr-1 text-sm font-bold text-accent-ink">{tech.name}</span>
              {TECH_TABS.map((t) => (
                <Link
                  key={t.key}
                  href={t.href(tech.slug)}
                  aria-current={tab === t.key ? "page" : undefined}
                  title={t.hint}
                  className={cx(
                    "inline-flex min-h-10 items-center rounded-xl px-2.5 text-sm font-semibold xl:px-3",
                    tab === t.key
                      ? "bg-accent text-on-accent"
                      : "text-ink-2 hover:bg-surface-2 hover:text-ink",
                  )}
                >
                  {t.label}
                </Link>
              ))}
            </>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          {onConcept && <ModeSwitch size="sm" className="inline-flex md:hidden" />}
          <button
            type="button"
            onClick={() => paletteStore.set(true)}
            className="hidden min-h-10 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm text-ink-3 hover:border-line-strong hover:text-ink md:inline-flex"
            aria-label="Search concepts, types, comparisons and terms"
          >
            <IconSearch size={17} />
            <span className="hidden xl:inline">Search</span>
            <kbd className="hidden rounded-md border border-line bg-surface-2 px-1.5 font-mono text-[0.7rem] text-ink-3 xl:inline">
              {shortcut}
            </kbd>
          </button>
          <ThemeToggle />
          {tech && (
            <button
              type="button"
              onClick={() => navStore.set(true)}
              className="touch-target hidden place-items-center rounded-xl text-ink-2 hover:bg-surface-2 hover:text-ink md:grid lg:hidden"
              aria-label="Open menu"
            >
              <IconMenu size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
