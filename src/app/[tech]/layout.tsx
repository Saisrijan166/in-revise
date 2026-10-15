import { deckNav, getDeck, getDecks } from "@/lib/content";
import { DeckBar } from "@/components/deck/DeckBar";
import { DeckNavList } from "@/components/deck/DeckNavList";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().map((d) => ({ tech: d.slug }));
}

/** Deck shell: desktop sidebar (tech → topic → card), slim contents bar below lg. */
export default async function DeckLayout({ children, params }: LayoutProps<"/[tech]">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  const nav = deckNav(deck);
  return (
    <div
      data-accent={deck.accent}
      className="mx-auto w-full max-w-[1440px] lg:grid lg:grid-cols-[288px_minmax(0,1fr)] print:block"
    >
      <aside className="no-print sticky top-14 hidden h-[calc(100dvh-3.5rem)] overflow-y-auto border-r border-line lg:block">
        <DeckNavList nav={nav} />
      </aside>
      <div className="min-w-0">
        <DeckBar nav={nav} />
        {children}
      </div>
    </div>
  );
}
