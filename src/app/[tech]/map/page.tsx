import type { Metadata } from "next";
import { getDeck, getDecks } from "@/lib/content";
import { buildGraph } from "@/lib/content/graph";
import { urls } from "@/lib/urls";
import { ConceptMap } from "@/components/map/ConceptMap";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().map((d) => ({ tech: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[tech]/map">): Promise<Metadata> {
  const { tech } = await params;
  const deck = getDeck(tech);
  return { title: `Map (${deck.name})`, description: `How the ${deck.name} concepts connect.` };
}

export default async function MapPage({ params }: PageProps<"/[tech]/map">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  return (
    <div className="px-4 pt-5 pb-6 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: urls.home() },
          { label: deck.name, href: urls.deck(tech) },
          { label: "Map" },
        ]}
      />
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-3xl font-extrabold">Concept map</h1>
          <p className="text-ink-2">
            Prerequisites sit before what needs them. Tap a station to preview it; drag to pan,
            pinch or use the buttons to zoom.
          </p>
        </div>
      </div>
      <ConceptMap tech={tech} data={buildGraph(deck)} />
    </div>
  );
}
