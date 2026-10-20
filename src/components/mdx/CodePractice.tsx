"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { cx } from "@/lib/ui";

/** Lines without leading/trailing spaces, inner spaces collapsed, blank lines dropped. */
function normalise(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim().replace(/\s+/g, " "))
    .filter(Boolean);
}

/**
 * A code example with an empty box under it, to type the code from memory. "Hide code" covers the
 * example while you write; "Check" compares your lines with it (spaces ignored). Nothing is saved.
 */
export function CodePractice({
  children,
  practice = true,
}: {
  children: ReactNode;
  practice?: boolean;
}) {
  const id = useId();
  const codeRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const [hidden, setHidden] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const box = (
    <div
      ref={codeRef}
      className={cx("scroll-box bg-surface-2/60", hidden && "code-hidden")}
      role="region"
      aria-label={hidden ? "Code example (hidden while you practise)" : "Code example"}
      tabIndex={0}
    >
      {children}
    </div>
  );
  if (!practice) return box;

  const check = () => {
    const expected = normalise(codeRef.current?.querySelector("pre")?.textContent ?? "");
    const typed = normalise(text);
    const n = Math.max(expected.length, typed.length);
    for (let i = 0; i < n; i++) {
      if (expected[i] !== typed[i]) {
        const want = expected[i] ?? "(nothing more)";
        setResult({ ok: false, message: `Line ${i + 1} differs. Expected: ${want}` });
        return;
      }
    }
    setResult({ ok: true, message: "Matches the example (spaces ignored)." });
  };

  const lines = Math.min(16, Math.max(3, text.split("\n").length + 1));

  return (
    <div className="code-practice my-4">
      {box}
      <div className="practice-box no-print">
        <label htmlFor={id} className="practice-label">
          Practise: type it from memory
        </label>
        <textarea
          id={id}
          value={text}
          rows={lines}
          onChange={(e) => {
            setText(e.target.value);
            setResult(null);
          }}
          placeholder="Write the code here…"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="practice-input"
        />
        <div className="practice-actions">
          <button
            type="button"
            className="practice-btn"
            aria-pressed={hidden}
            onClick={() => setHidden((h) => !h)}
          >
            {hidden ? "Show code" : "Hide code"}
          </button>
          <button type="button" className="practice-btn" disabled={!text.trim()} onClick={check}>
            Check
          </button>
          <button
            type="button"
            className="practice-btn"
            disabled={!text}
            onClick={() => {
              setText("");
              setResult(null);
            }}
          >
            Clear
          </button>
          <span
            role="status"
            className={cx("practice-result", result && (result.ok ? "is-ok" : "is-diff"))}
          >
            {result?.message}
          </span>
        </div>
      </div>
    </div>
  );
}

/** The expected output of the example above it (a ```text output block in the content). */
export function CodeOutput({ text }: { text: string }) {
  return (
    <div className="code-output not-prose">
      <div className="code-output-label">Output</div>
      <pre className="code-output-text">{text.replace(/\n$/, "")}</pre>
    </div>
  );
}
