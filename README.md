# inrevise

Interview + revise. A static, frontend-only site that explains each tech as short, connected concepts:
one line each, the types inside them, the trap people fall into, and how they connect.
Rules for content and UI live in `CLAUDE.md`.

## Run

```bash
npm install
npm run dev               # http://localhost:3000
npm run validate:content  # schema, links, tree, relations, sources (also runs before every build)
npm run lint
npm run typecheck
npm run build             # static export to ./out (deploys to Vercel with no extra config)
npm run preview           # serve ./out locally
```

Node 20.9+ is required. The build downloads Google Fonts once, so it needs network access.

## Add a tech

Create `content/<slug>/` with `_tech.yaml`, `tree.yaml`, `glossary.yaml`, `cards/*.mdx` and `comparisons/*.yaml`.
No code changes are needed. Run `npm run validate:content` until it passes.

## Layout

- `content/`: one folder per tech (MDX concepts, YAML tree, comparisons and glossary)
- `src/lib/content/`: schema, loader and validation rules, MDX rendering, quiz items
- `src/app/`: routes (every dynamic route uses `generateStaticParams`)
- `src/components/`: UI
- `scripts/validate-content.ts`: content gate (fails the build on any error)
- `OPEN_QUESTIONS.md`: unverified facts and decisions for the owner
