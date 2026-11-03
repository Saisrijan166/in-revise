import type { Metadata } from "next";
import { getDeck } from "@/lib/content";
import { getSyntax, syntaxSlugs } from "@/lib/syntax";
import { urls } from "@/lib/urls";
import { PageHeader } from "@/components/ui/Breadcrumbs";
import { SyntaxSheet } from "@/components/deck/SyntaxSheet";

export const dynamicParams = false;

export function generateStaticParams() {
  return syntaxSlugs().map((slug) => ({ tech: slug }));
}

export async function generateMetadata({ params }: PageProps<"/[tech]/syntax">): Promise<Metadata> {
  const { tech } = await params;
  return {
    title: `Syntax (${getDeck(tech).name})`,
    description: "The methods and syntax you write day to day, grouped for quick revision.",
  };
}

/** Daily-use syntax reference: the functions, methods and syntax used in real work. */
export default async function SyntaxPage({ params }: PageProps<"/[tech]/syntax">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  const sheet = getSyntax(tech);
  return (
    <div className="mx-auto max-w-5xl px-4 pt-4 pb-12 sm:px-6 lg:px-10">
      <PageHeader
        crumbs={[
          { label: "Home", href: urls.home() },
          { label: deck.name, href: urls.overview(tech) },
          { label: "Syntax" },
        ]}
        title={`${deck.name} syntax`}
        lead={sheet?.tagline ?? "The functions and syntax you write day to day."}
      />
      {sheet && <SyntaxSheet sheet={sheet} />}
    </div>
  );
}
