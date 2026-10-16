import type { Metadata } from "next";
import { getDeck, getDecks } from "@/lib/content";
import { buildGraph } from "@/lib/content/graph";
import { urls } from "@/lib/urls";
import { MapView } from "@/components/map/MapView";
import { PageHeader } from "@/components/ui/Breadcrumbs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().map((d) => ({ tech: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[tech]/map">): Promise<Metadata> {
  const { tech } = await params;
  const deck = getDeck(tech);
  return {
    title: `Map (${deck.name})`,
    description: `How the ${deck.name} concepts connect, and why.`,
  };
}

export default async function MapPage({ params }: PageProps<"/[tech]/map">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  return (
    <div className="px-4 pt-4 pb-8 sm:px-6 lg:px-10">
      <PageHeader
        crumbs={[
          { label: "Home", href: urls.home() },
          { label: deck.name, href: urls.overview(tech) },
          { label: "Map" },
        ]}
        title="How it all connects"
        lead="Pick a concept: see what leads to it, where it leads, and why. Tap any neighbour to walk the map."
      />
      <MapView data={buildGraph(deck)} />
    </div>
  );
}
