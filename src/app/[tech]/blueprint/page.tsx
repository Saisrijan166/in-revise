import type { Metadata } from "next";
import { getDeck } from "@/lib/content";
import { blueprintSlugs, getBlueprint } from "@/lib/blueprint";
import { urls } from "@/lib/urls";
import { PageHeader } from "@/components/ui/Breadcrumbs";
import { BlueprintMap } from "@/components/deck/BlueprintMap";

export const dynamicParams = false;

export function generateStaticParams() {
  return blueprintSlugs().map((slug) => ({ tech: slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[tech]/blueprint">): Promise<Metadata> {
  const { tech } = await params;
  return {
    title: `Blueprint (${getDeck(tech).name})`,
    description: "The whole tech as one connected, color-coded map.",
  };
}

/** One visual map of the tech: pillars, the Fundamentals → Core → Advanced path, and the flows. */
export default async function BlueprintPage({ params }: PageProps<"/[tech]/blueprint">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  const bp = getBlueprint(tech);
  return (
    <div className="mx-auto max-w-5xl px-4 pt-4 pb-12 sm:px-6 lg:px-10">
      <PageHeader
        crumbs={[
          { label: "Home", href: urls.home() },
          { label: deck.name, href: urls.overview(tech) },
          { label: "Blueprint" },
        ]}
        title={`${deck.name} blueprint`}
        lead={bp?.tagline ?? "The whole tech as one connected map, from fundamentals to advanced."}
      />
      {bp && <BlueprintMap bp={bp} />}
    </div>
  );
}
