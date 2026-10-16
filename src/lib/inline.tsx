import type { ReactNode } from "react";

/** Renders `code` spans in short plain-text strings such as key points and questions. */
export function renderInline(text: string): ReactNode {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code
        key={i}
        className="rounded-md border border-line bg-surface-2 px-1 py-0.5 font-mono text-[0.88em]"
      >
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  );
}
