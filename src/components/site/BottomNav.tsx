"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { navStore, paletteStore } from "@/lib/store/ui";
import { urls } from "@/lib/urls";
import { cx } from "@/lib/ui";
import { IconCards, IconHome, IconSearch, IconSheet, IconTree } from "@/components/ui/icons";
import { useContextTech, useCurrentTech, type TechLite } from "./useCurrentTech";

/** Phone tab bar: Home, Topics (the tree), Cheat sheet, Quiz, Search. Hidden from md up. */
export function BottomNav({ techs }: { techs: TechLite[] }) {
  const pathname = usePathname() ?? "/";
  const inTech = Boolean(useCurrentTech(techs));
  const tech = useContextTech(techs);
  const paletteOpen = paletteStore.use();
  const navOpen = navStore.use();

  const tabs: {
    label: string;
    href?: string;
    icon: ComponentType<{ size?: number }>;
    active: boolean;
    onClick?: () => void;
  }[] = [
    { label: "Home", href: urls.home(), icon: IconHome, active: pathname === "/" },
    inTech
      ? { label: "Topics", icon: IconTree, active: navOpen, onClick: () => navStore.set(true) }
      : {
          label: "Topics",
          href: tech ? urls.overview(tech.slug) : undefined,
          icon: IconTree,
          active: false,
        },
    {
      label: "Cheat sheet",
      href: tech ? urls.cheatsheet(tech.slug) : undefined,
      icon: IconSheet,
      active: /\/cheatsheet\/?$/.test(pathname),
    },
    {
      label: "Quiz",
      href: tech ? urls.quiz(tech.slug) : undefined,
      icon: IconCards,
      active: /\/quiz\/?$/.test(pathname),
    },
    {
      label: "Search",
      icon: IconSearch,
      active: paletteOpen,
      onClick: () => paletteStore.set(true),
    },
  ];

  return (
    <nav
      aria-label="Bottom"
      className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line bg-[color-mix(in_oklab,var(--surface)_94%,transparent)] pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {tabs.map((t) => {
          const Icon = t.icon;
          const inner = (
            <>
              <span
                className={cx(
                  "grid h-8 w-12 place-items-center rounded-full transition-colors",
                  t.active ? "bg-accent text-on-accent" : "text-ink-3",
                )}
              >
                <Icon size={20} />
              </span>
              <span
                className={cx("text-[0.72rem] font-semibold", t.active ? "text-ink" : "text-ink-3")}
              >
                {t.label}
              </span>
            </>
          );
          const cls = "flex min-h-16 w-full flex-col items-center justify-center gap-0.5";
          return (
            <li key={t.label}>
              {t.href ? (
                <Link href={t.href} className={cls} aria-current={t.active ? "page" : undefined}>
                  {inner}
                </Link>
              ) : (
                <button type="button" className={cls} onClick={t.onClick} aria-label={t.label}>
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
