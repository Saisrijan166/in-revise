import Link from "next/link";
import { IconChevronRight } from "./icons";

/** Short trail of where you are. The last item is the current page. */
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="no-print mb-1">
      <ol className="flex flex-wrap items-center gap-x-1 text-sm text-ink-3">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <IconChevronRight size={13} className="opacity-60" />}
            {it.href ? (
              <Link
                href={it.href}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-0.5 hover:text-ink hover:underline"
              >
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-ink-2">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Same header block on every page: breadcrumb, title, one-line lead. Keeps spacing consistent. */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs: { label: string; href?: string }[];
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-6">
      <Breadcrumbs items={crumbs} />
      {eyebrow && (
        <p className="text-xs font-bold tracking-widest text-accent-ink uppercase">{eyebrow}</p>
      )}
      <h1 className="text-3xl leading-tight font-extrabold text-ink sm:text-4xl">{title}</h1>
      {lead && <p className="mt-1.5 max-w-2xl text-lg text-ink-2">{lead}</p>}
      {children}
    </header>
  );
}
