import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { getDecks } from "@/lib/content";
import { PREPAINT_SCRIPT } from "@/lib/prepaint";
import { AccentScope } from "@/components/site/AccentScope";
import { BottomNav } from "@/components/site/BottomNav";
import { CommandPalette } from "@/components/site/CommandPalette";
import { Header } from "@/components/site/Header";
import { ShellEffects } from "@/components/site/ShellEffects";
import "./globals.css";

// Body: built for legibility. Display: a characterful grotesque for the brand.
const body = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  // next/font has no metrics for this family yet, so name the fallback stack explicitly.
  adjustFontFallback: false,
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});
const code = JetBrains_Mono({ subsets: ["latin"], variable: "--font-code", display: "swap" });

export const metadata: Metadata = {
  title: { default: "inrevise: interview revision that sticks", template: "%s · inrevise" },
  description:
    "Interview + revise. Every concept in one line, its types, its traps and how it connects. Learn once, revise in minutes.",
  applicationName: "inrevise",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1116" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const techs = getDecks().map((d) => ({ slug: d.slug, name: d.name, accent: d.accent }));
  return (
    <html
      lang="en-IN"
      data-mode="learn"
      data-accent={techs[0]?.accent ?? "blue"}
      suppressHydrationWarning
      className={`${body.variable} ${display.variable} ${code.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREPAINT_SCRIPT }} />
      </head>
      <body>
        <AccentScope techs={techs}>
          <a
            href="#main"
            className="sr-only z-50 rounded-xl bg-accent px-4 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
          >
            Skip to content
          </a>
          <Header techs={techs} />
          <main id="main" className="pb-tabbar flex-1">
            {children}
          </main>
          <BottomNav techs={techs} />
          <CommandPalette techs={techs} />
          <ShellEffects />
        </AccentScope>
      </body>
    </html>
  );
}
