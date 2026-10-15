"use client";

import { IconPrinter } from "./icons";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-line bg-surface px-4 font-bold text-ink-2 hover:border-line-strong hover:text-ink"
    >
      <IconPrinter size={18} /> Print or save as PDF
    </button>
  );
}
