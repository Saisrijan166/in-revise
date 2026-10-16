import { getDeck, getDecks, techNav } from "@/lib/content";
import { NavSheet } from "@/components/nav/NavSheet";
import { TreeNav } from "@/components/nav/TreeNav";
import { ModeSwitch } from "@/components/site/ModeSwitch";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().map((d) => ({ tech: d.slug }));
}

/**
 * Tech shell. Desktop: left sidebar with the study mode (Learn / Revise / Quiz) and the whole
 * tree. Phones and tablets: the same in a sheet (Topics tab / menu button).
 */
export default async function TechLayout({ children, params }: LayoutProps<"/[tech]">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  const nav = techNav(deck);
  return (
    <div
      data-accent={deck.accent}
      className="mx-auto w-full max-w-[1480px] lg:grid lg:grid-cols-[300px_minmax(0,1fr)] print:block"
    >
      <aside className="no-print sticky top-14 hidden h-[calc(100dvh-3.5rem)] overflow-y-auto border-r border-line lg:block">
        <div className="sticky top-0 z-10 border-b border-line bg-bg px-4 pt-4 pb-3">
          <p className="mb-1.5 text-xs font-bold tracking-wider text-ink-3 uppercase">Study mode</p>
          <ModeSwitch className="flex w-full [&>button]:flex-1" />
        </div>
        <div className="px-3 py-4">
          <TreeNav nav={nav} />
        </div>
      </aside>
      <NavSheet nav={nav} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
