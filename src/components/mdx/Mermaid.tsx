"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useResolvedTheme } from "@/lib/store/prefs";

/**
 * Mermaid diagram, loaded lazily on the client only when it scrolls near the viewport.
 * Re-renders when the theme changes. The text alternative is always in the DOM.
 */
export function Mermaid({ chart, alt }: { chart: string; alt: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const theme = useResolvedTheme();
  const reactId = useId();

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    (async () => {
      const { default: mermaid } = await import("mermaid");
      const css = getComputedStyle(box.current ?? document.documentElement);
      const v = (name: string) => css.getPropertyValue(name).trim();
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        fontFamily: css.fontFamily,
        themeVariables: {
          darkMode: theme === "dark",
          background: v("--surface"),
          primaryColor: v("--accent-soft"),
          primaryTextColor: v("--ink"),
          primaryBorderColor: v("--accent"),
          secondaryColor: v("--surface-2"),
          tertiaryColor: v("--surface"),
          lineColor: v("--ink-3"),
          textColor: v("--ink"),
          mainBkg: v("--accent-soft"),
          nodeBorder: v("--accent"),
          clusterBkg: v("--surface-2"),
          clusterBorder: v("--line-strong"),
          edgeLabelBackground: v("--surface"),
          titleColor: v("--ink"),
          fontSize: "15px",
        },
        flowchart: { useMaxWidth: true, curve: "basis", padding: 12 },
      });
      const id = `mmd-${reactId.replace(/[^a-zA-Z0-9]/g, "")}-${theme}`;
      const out = await mermaid.render(id, chart);
      if (!cancelled) setSvg(out.svg);
    })().catch(() => {
      if (!cancelled) setFailed(true);
    });
    return () => {
      cancelled = true;
    };
  }, [visible, chart, theme, reactId]);

  return (
    <figure className="my-5 rounded-2xl border border-line bg-surface p-3 sm:p-4">
      <div
        ref={box}
        role="img"
        aria-label={alt}
        className="flex min-h-[180px] items-center justify-center overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-full"
      >
        {svg ? (
          <div className="w-full [&>svg]:mx-auto" dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <p className="px-4 text-center text-sm text-ink-3">
            {failed ? "Diagram could not load. The text version is below." : "Drawing diagram…"}
          </p>
        )}
      </div>
      <figcaption className="mt-2 border-t border-line pt-2 text-sm text-ink-2">
        <details>
          <summary className="touch-target flex cursor-pointer items-center font-semibold text-ink-3 hover:text-ink">
            Text version of this diagram
          </summary>
          <p className="pb-2 leading-relaxed">{alt}</p>
        </details>
      </figcaption>
    </figure>
  );
}
