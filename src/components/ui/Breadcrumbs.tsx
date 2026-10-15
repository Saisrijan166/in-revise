import Link from "next/link";
import { IconChevronRight } from "./icons";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="no-print mb-2">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-0 text-sm text-ink-3">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <IconChevronRight size={14} className="opacity-60" />}
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
