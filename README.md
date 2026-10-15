# Concept Map

Static, frontend-only revision and study site: one deck of short, linked concept cards per technology.
Rules for content and UI live in [CLAUDE.md](CLAUDE.md).

## Run

```bash
npm install
npm run dev               # http://localhost:3000
npm run validate:content  # schema, links, sources, sections (also runs before every build)
npm run lint
npm run typecheck
npm run build             # static export to ./out (deploys to Vercel with no extra config)
npm run preview           # serve ./out locally
```

Node 20.9+ is required. The build downloads Google Fonts once, so it needs network access.

## Add a deck

Create `content/<slug>/` with `_tech.yaml`, `glossary.yaml`, `cards/*.mdx` and `comparisons/*.yaml`.
No code changes are needed. Run `npm run validate:content` until it passes.

## Layout

- `content/`: decks (MDX cards, YAML comparisons and glossary)
- `src/lib/content/`: schema, loader and validator rules, MDX rendering, map graph
- `src/app/`: routes (every dynamic route uses `generateStaticParams`)
- `src/components/`: UI
- `scripts/validate-content.ts`: content gate (fails the build on any error)
- `OPEN_QUESTIONS.md`: unverified facts and decisions for the owner
