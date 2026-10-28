"use client";

import { useSidebarOpen, toggleSidebar } from "@/lib/store/prefs";
import { cx } from "@/lib/ui";
import { IconChevronRight, IconTree } from "@/components/ui/icons";
import { ModeSwitch } from "@/components/site/ModeSwitch";
import { TreeNav } from "./TreeNav";
import type { TechNav } from "@/lib/content";

/**
 * Desktop tech shell with a collapsible left sidebar (CLAUDE.md 5.4). Open by default; the
 * reader can collapse it to give the content full width, and the choice is remembered
 * (prefs `cm-sidebar`, applied pre-paint). On phones and tablets this whole component is
 * hidden and the tree lives in the NavSheet instead.
 */
export function SidebarShell({ nav, children }: { nav: TechNav; children: React.ReactNode }) {
  const open = useSidebarOpen();
  return (
    <div
      className={cx(
        "mx-auto w-full max-w-[1480px] print:block",
        open
          ? "lg:grid lg:grid-cols-[300px_minmax(0,1fr)]"
          : "lg:grid lg:grid-cols-[0px_minmax(0,1fr)]",
      )}
    >
      <aside
        className={cx(
          "no-print sticky top-14 hidden h-[calc(100dvh-3.5rem)] border-r border-line lg:block",
          open ? "overflow-y-auto" : "overflow-hidden",
        )}
        aria-hidden={!open}
      >
        <div className={cx("min-w-[300px]", open ? "" : "pointer-events-none opacity-0")}>
          <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-line bg-bg px-4 pt-4 pb-3">
            <div className="min-w-0 flex-1">
              <p className="mb-1.5 text-xs font-bold tracking-wider text-ink-3 uppercase">
                Study mode
              </p>
              <ModeSwitch className="flex w-full [&>button]:flex-1" />
            </div>
            <button
              type="button"
              onClick={toggleSidebar}
              className="touch-target -mr-1 grid flex-none place-items-center self-end rounded-xl text-ink-3 hover:bg-surface-2 hover:text-ink"
              aria-label="Hide the concept list"
              title="Hide the concept list"
            >
              <IconChevronRight size={18} className="rotate-180" />
            </button>
          </div>
          <div className="px-3 py-4">
            <TreeNav nav={nav} />
          </div>
        </div>
      </aside>

      <div className="relative min-w-0">
        {/* When collapsed, a slim rail button to bring the sidebar back. Desktop only. */}
        {!open && (
          <button
            type="button"
            onClick={toggleSidebar}
            className="no-print sticky top-14 z-20 float-left -ml-1 mt-3 hidden items-center gap-1.5 rounded-r-xl border border-l-0 border-line bg-surface py-2 pr-2.5 pl-2 text-sm font-semibold text-ink-2 shadow-[var(--shadow)] hover:text-ink lg:flex"
            aria-label="Show the concept list"
            title="Show the concept list"
          >
            <IconTree size={16} />
            <IconChevronRight size={15} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
