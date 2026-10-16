import type { Metadata } from "next";
import Link from "next/link";
import { getDeck, getDecks } from "@/lib/content";
import { urls } from "@/lib/urls";
import { CompareGist } from "@/components/compare/CompareView";
import { PageHeader } from "@/components/ui/Breadcrumbs";
import { IconArrowRight } from "@/components/ui/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().map((d) => ({ tech: d.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[tech]/compare">): Promise<Metadata> {
  const { tech } = await params;
  return { title: `Compare (${getDeck(tech).name})` };
}

/** One comparison per row; the difference is readable before you click. */
export default async function CompareIndexPage({ params }: PageProps<"/[tech]/compare">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  return (
    <div className="mx-auto max-w-4xl px-4 pt-4 pb-12 sm:px-6 lg:px-10">
      <PageHeader
        crumbs={[
          { label: "Home", href: urls.home() },
          { label: deck.name, href: urls.overview(tech) },
          { label: "Compare" },
        ]}
        title="Often confused"
        lead="Pairs people mix up in interviews. The difference is right here; open one for diagrams and the full table."
      />
      <ul className="flex flex-col gap-4">
        {deck.comparisons.map((c) => (
          <li key={c.id} className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
            <Link
              href={urls.compare(tech, c.id)}
              className="group mb-3 flex items-center justify-between gap-3"
            >
              <span className="font-display text-xl font-extrabold text-ink group-hover:text-accent-ink">
                {c.title}
              </span>
              <span className="inline-flex min-h-11 flex-none items-center gap-1 text-sm font-bold text-accent-ink">
                Open <IconArrowRight size={15} />
              </span>
            </Link>
            <CompareGist deck={deck} c={c} size="sm" />
            <p className="mt-3 text-ink-2">
              <span className="font-bold text-ink">Choose: </span>
              {c.verdict}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
