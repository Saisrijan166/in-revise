"use client";

import { Children, isValidElement, useId, type ReactNode } from "react";
import { setCodeLang, useCodeLang } from "@/lib/store/prefs";
import { cx } from "@/lib/ui";

const LABEL: Record<string, string> = {
  java: "Java",
  python: "Python",
  typescript: "TypeScript",
  javascript: "JavaScript",
  jsx: "JSX",
  tsx: "TSX",
  html: "HTML",
  css: "CSS",
  sql: "SQL",
  json: "JSON",
  bash: "Shell",
  yaml: "YAML",
  nginx: "nginx",
  proto: "Protobuf",
  properties: "Properties",
  xml: "XML",
  text: "Text",
};

/**
 * The same example in several languages (Java and Python for app code). Adjacent code blocks
 * in a card become one tab group; the chosen language is remembered for every group.
 */
export function CodeTabs({ langs, children }: { langs: string; children: ReactNode }) {
  const list = langs.split(",");
  const panels = Children.toArray(children).filter(isValidElement);
  const pref = useCodeLang();
  const active = Math.max(0, list.indexOf(pref));
  const id = useId();

  return (
    <div className="my-4">
      <div role="tablist" aria-label="Code language" className="flex gap-1">
        {list.map((l, i) => (
          <button
            key={l}
            id={`${id}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            onClick={() => setCodeLang(l)}
            className={cx(
              "min-h-10 rounded-t-xl border border-b-0 px-4 text-sm font-bold",
              i === active
                ? "border-line bg-surface text-ink"
                : "border-transparent text-ink-3 hover:text-ink",
            )}
          >
            {LABEL[l] ?? l}
          </button>
        ))}
      </div>
      {panels.map((p, i) => (
        <div
          key={i}
          id={`${id}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${i}`}
          hidden={i !== active}
          className="-mt-px [&_.scroll-box]:rounded-tl-none"
        >
          {p}
        </div>
      ))}
    </div>
  );
}
