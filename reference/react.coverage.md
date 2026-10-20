# Coverage: React & Frontend
Reference: reference/react.md  ·  Last updated: 20-10-2026

Every reference item (key list: the numbered sections, plus each question, pattern and "X vs Y" row inside them) appears in exactly
one of Mapped, Corrected or Dropped. A section whose parts went to different places has one row here (Corrected wins over
Mapped), and its other parts are listed under "Details placed elsewhere or cut". Sources for corrections are primary pages.

## Mapped
| Reference item (key + short title) | Landed in | Note |
|---|---|---|
| P0. Important terminologies (section heading) | split across the concepts that own each sub-key (see rows below) | not one concept per term |
| P0.1. Re-render | concept `re-renders` (hook, Why, How it works diagram); glossary `re-render` |  |
| P0.2. DOM update (a re-render is not always a DOM update) | concept `re-renders` (hook, points "DOM", trap, Interview Q 1) | same fact as PD.2, written once |
| P0.3. Reconciliation | concept what-is-react (points, Steps, Interview Q "How does reconciliation work?"); tree `diffing-rules`; glossary `reconciliation-term` | Added the two O(n) heuristics (element type, keys) from the reconciliation page |
| P0.4. Virtual DOM | concept what-is-react (point, trap, Interview Q "Is it faster than the real DOM?"); glossary `virtual-dom` | Worded as React's in-memory element tree; the Q says it is not faster by itself (diffing is extra work) |
| P0.5. Memoization | concept `memoization` (points "Memoization", Why); glossary `memoization-term` |  |
| P0.7. useMemo (memoizes a calculated value) | comparison `usememo-vs-usecallback-vs-memo` (column a); tree node `use-memo`; glossary `use-memo` |  |
| P0.9. Code splitting | concept `bundling-code-splitting` (Steps "Split", Interview Q 1); tree node + glossary `code-splitting` |  |
| P0.10. Lazy loading | concept `bundling-code-splitting` (Example, Interview Q 1); glossary `lazy-loading` | Q "code splitting vs lazy loading" is Interview Q 1 |
| P0.11. Dynamic import | tree node + glossary `dynamic-import`; concept `bundling-code-splitting` (points "React.lazy", Steps "Split") |  |
| P0.12. Bundle size | concept `bundling-code-splitting` (points "Bundle size", Why); glossary `bundle-size` |  |
| P0.13. Tree shaking | concept `bundling-code-splitting` (points, Steps, Interview Q 3); tree node + glossary `tree-shaking` |  |
| P0.14. Debouncing | concept `large-lists-and-frequent-events` (points, Example, Interview Q 2); comparison `debounce-vs-throttle`; glossary `debounce` |  |
| P0.15. Throttling | comparison `debounce-vs-throttle`; concept `large-lists-and-frequent-events` (points, trap); glossary `throttle` |  |
| P0.16. Virtualization | concept `large-lists-and-frequent-events` (points, Interview Q 1); tree node + glossary `virtualization` |  |
| P0.17. Referential equality | concept `memoization` (points "Compared with", JavaScript example with output); tree node + glossary `referential-equality` |  |
| P0.18. Stable reference | concept `memoization` (points "Pair them", Interview Q 1); glossary `stable-reference` |  |
| P0.20. State colocation | glossary state-colocation; tree node state-colocation |  |
| P0.21. Derived state | concept use-state (point "Derived state", example `total`); tree `derived-state`; glossary `derived-state` |  |
| P0.23. Suspense | concept `bundling-code-splitting` (Example, points "React.lazy"); glossary `suspense` | data Suspense with use() is owned by `data-fetching` |
| P0.24. Concurrent rendering | tree node + glossary `concurrent-rendering` (since React 18) |  |
| P0.25. useTransition | tree node + glossary `use-transition`; concept `re-renders` (How it works bullet 3) |  |
| P0.26. useDeferredValue | tree node + glossary `use-deferred-value`; concept `large-lists-and-frequent-events` (points "Slow render", Interview Q 3) | Q "debounce vs useDeferredValue" added |
| P1. Avoid unnecessary re-renders (identify first, optimise only real problems) | concept `re-renders` (points "Cheap by default", "Fix order"; sayIt; Interview Q 3) | the `useState` snippet carried no information and was not reused |
| P3. useMemo (expensive calculation) | concept `memoization` (Example JSX: filtered products); comparison column a |  |
| P5. Lazy loading / code splitting (`lazy(() => import(...))`, smaller first load) | concept `bundling-code-splitting` (Example: lazy Checkout with Suspense; Interview Q 2 on declaring lazy outside) | added: needs a default export and a Suspense boundary |
| P6. Virtualization (10,000 items, render only visible) | concept `large-lists-and-frequent-events` (points, Interview Q 1); tree `virtualization` with overscan, TanStack Virtual, react-window |  |
| P7. Debounce (search box, no API call per keystroke) | concept `large-lists-and-frequent-events` (Example: debounce with closure, real output; points) |  |
| P9. Keep state local (global state for everything vs local state; term state colocation) | concept lifting-state-up (point "Colocate", Interview Q "What is state colocation"); tree node state-colocation; glossary state-colocation | Rewritten: shared state goes to the closest common parent, not "always local". Why it is faster is backed by the colocation article |
| P10. Avoid unnecessary useEffect (setTotal-in-an-Effect example; "derived state" term) | concept use-effect (point "Not for", Interview Q "When do you not need an Effect?") | Reworded as "compute during render"; added why (an extra render pass) and the second case (user events go in handlers) from react.dev. The derived-state rule itself is owned by use-state, linked. |
| P11. Stable keys | concept lists-and-keys (points, trap, table, example, Interview Qs "Why keys?", "Index as key?"); tree `index-as-key`, `random-key`, `keyed-fragment`, `reset-state-with-key`; glossary `key-react` | Reference example `users.map(user => <User key={user.id} />)` rewritten in the shop example (`product.id`) |
| P13. Reduce bundle size (split, lazy, dynamic import, tree shake, drop dependencies) | concept `bundling-code-splitting` (Steps, How it works bullet, sayIt) |  |
| P14. Server Components in Next.js (less client JS; do not make the whole app 'use client') | concept `server-components` (hook, points "Less client JS", "Small leaves"; Interview Q "When do you need 'use client'?"); comparison `server-vs-client-components` (JS row, verdict) | Rewritten; flow drawing not copied |
| PD. Most important distinctions (heading); PD. Most important distinctions (pointer only) | PD.1 in `memoization`, PD.2 in `re-renders`; `frontend-playbook` bullet "a re-render is not a DOM update" → links `re-renders` | `frontend-playbook` links only PD.1 and PD.2 facts owned by `memoization` and `re-renders`; not restated |
| PD.1. useMemo = value, useCallback = function, memo = component | comparison `usememo-vs-usecallback-vs-memo` (gist lines); concept `memoization` (hook) |  |
| PD.2. Re-render is not a DOM update | concept `re-renders` (hook, trap, Interview Q 1) |  |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| P0.6 + P2. React.memo ("prevents unnecessary child rendering when props are unchanged") | Overstated: memo compares each prop shallowly with Object.is, so a new object or function prop each render defeats it; the child still re-renders on its own state or a context change; React calls it an optimisation, not a guarantee; with React Compiler it is usually not needed | points "Compared with", "Pair them"; Interview Q 1; comparison row "Recomputes when"; tree note `react-memo` | https://react.dev/reference/react/memo |
| P0.8 + P4. useCallback ("memoizes a function reference", shown on its own with `[]`) | Incomplete: caching a function helps only when it goes to a memo child or is a hook dependency; it does not stop the function being created; empty deps can freeze old values | comparison row "Worth it when" (column b); Interview Q 2 in `memoization` | https://react.dev/reference/react/useCallback |
| P0.19. Batched updates | No version and no scope: before React 18 only updates inside React event handlers were batched | "Since React 18: many sets, one re-render, even in timeouts, promises and native event handlers" (use-state point, Interview Q, tree `automatic-batching`, glossary) | https://react.dev/blog/2022/03/29/react-v18 |
| P0.22. Avoid unnecessary state | Gave "fewer re-renders" as the reason; react.dev's reason for avoiding redundant state is that copies get out of sync (a prop copied into state stops following the prop) | use-state: "compute the cart total during render; do not store it" and "copying a prop into state stops following the prop" | https://react.dev/learn/choosing-the-state-structure |
| P0.27. React Compiler ("can automatically optimise/memoize some React code") | Vague, no version or status | React Compiler 1.0 stable since 07-10-2025, build-time; Next.js 16 top-level `reactCompiler` option (moved from experimental in v16.0.0, set to `true` to enable); keep useMemo/useCallback as escape hatches, e.g. effect dependencies | https://react.dev/blog/2025/10/07/react-compiler-1 ; https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler |
| P2 (with P0.6). React.memo ("prevents unnecessary child rendering when props are unchanged") | Overstated: memo compares each prop shallowly with Object.is, so a new object or function prop each render defeats it; the child still re-renders on its own state or a context change; React calls it an optimisation, not a guarantee; with React Compiler it is usually not needed | points "Compared with", "Pair them"; Interview Q 1; comparison row "Recomputes when"; tree note `react-memo` | https://react.dev/reference/react/memo |
| P4 (with P0.8). useCallback ("memoizes a function reference", shown on its own with `[]`) | Incomplete: caching a function helps only when it goes to a memo child or is a hook dependency; it does not stop the function being created; empty deps can freeze old values | comparison row "Worth it when" (column b); Interview Q 2 in `memoization` | https://react.dev/reference/react/useCallback |
| P8. Throttle (scroll, resize, mousemove) | Not wrong, but "mousemove" has no primary-source example; definition given only as "limit how often" | "at most once per interval while events continue"; examples kept to scroll and resize | https://developer.mozilla.org/en-US/docs/Glossary/Throttle |
| P12. Optimise images/assets (only `next/image`) | Next.js-only; missing the rules that apply to any React app; Next.js 16 changed the LCP prop | Any app: WebP/AVIF, `srcset`/`sizes`, `width`/`height` to avoid layout shift, `loading="lazy"` below the fold but never on the LCP image. next/image in Next.js 16: lazy by default, default format WebP, `preload` replaces the deprecated `priority` | https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img ; https://web.dev/articles/optimize-lcp ; https://nextjs.org/docs/app/api-reference/components/image |
| P15. Measure before optimising ("Web Vitals" listed as a tool) | Loose: Web Vitals are metrics, not a tool; no names or thresholds | Core Web Vitals LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at the 75th percentile; INP replaced FID in March 2024; Lighthouse is lab-only and cannot measure INP (uses TBT); measure in a production build | https://web.dev/articles/vitals ; https://web.dev/blog/inp-cwv-march-12 ; https://react.dev/learn/you-might-not-need-an-effect |
| PG. Golden answer: how do you optimise React performance? | Starts from "identify unnecessary re-renders" and leads with memo/useMemo/useCallback; the bottleneck may be bundle size, a long list or a slow calculation, and React docs advise measuring (production build, slow CPU) before memoizing | sayIt and Interview Q 1 of `frontend-playbook`: profile first, fix the cause found, measure again; trap "do not list every technique" | https://react.dev/reference/react/useMemo |
| PM (part: 'Scroll/resize → throttle'); PM (part: 'Images → next/image'); PM (part: 'Images → next/image') | Same as P8: only scroll has a primary example; Same as P12: Next.js-only; next/image applies only to Next.js; image fixes apply to any React app | comparison `debounce-vs-throttle` row "Typical use" (scroll, resize); concept `measuring-performance` (points "Images", Example `<img>`, Defaults, Interview Q 3); tree node `next-image`; Playbook row "Heavy images → size and lazy-load them" linking `measuring-performance` (which owns P12 and next/image) | https://developer.mozilla.org/en-US/docs/Glossary/Throttle ; https://nextjs.org/docs/app/api-reference/components/image ; https://nextjs.org/docs/app/glossary (Image Optimization) |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| URL to pixels (DNS, TCP/TLS, DOM, CSSOM, render tree, layout, paint, composite) | concept how-browsers-render (Steps), tree | "What happens when you type a URL" is a standard frontend question |
| Reflow vs repaint, compositor-only properties | how-browsers-render (points, Interview Q), tree, glossary | commonly asked; owner scope note |
| Script async vs defer vs plain, type=module deferred | comparison async-vs-defer; tree script-loading | commonly asked (GreatFrontEnd) |
| display: none vs visibility: hidden | how-browsers-render (trap) | common wrong answer; MDN states the render-tree difference |
| Semantic elements, button vs div, alt, labels/htmlFor, headings, focus, ARIA first rule, contrast | concept semantic-html-accessibility, tree, glossary | accessibility basics expected in React interviews |
| localStorage vs sessionStorage vs cookies; cookie attributes; IndexedDB | concept browser-storage-cookies, comparison, tree | commonly asked (GreatFrontEnd) |
| Token storage (localStorage vs HttpOnly cookie) | browser-storage-cookies (trap, Interview Q) | common wrong answer; OWASP HTML5 cheat sheet |
| XSS types, React escaping, dangerouslySetInnerHTML, javascript: URLs, CSP | concept frontend-security, tree | security basics for React |
| CSRF and defences; XSS vs CSRF | frontend-security, comparison xss-vs-csrf | commonly asked (GreatFrontEnd) |
| Same-origin policy, CORS, preflight, credentials | frontend-security (bullets, trap, Interview Q), tree | commonly asked; frequent misconception that CORS secures the server |
| Box model, box-sizing, display, position, stacking context, margin collapsing | concept `box-model-positioning` | Asked in nearly every frontend interview (GreatFrontEnd, GeeksforGeeks lists) |
| Cascade order, specificity, inheritance, !important, @layer, :where()/:is() | concept `specificity-cascade` | Common "which rule wins" question |
| Flexbox, Grid, centring, flex: 1, auto-fill/auto-fit | concept `flexbox-and-grid`, comparison `flexbox-vs-grid` | Flexbox vs Grid is a standard question |
| Viewport meta, media queries, mobile-first, units (em/rem/vw/vh/dvh), clamp(), container queries | concept `responsive-design` | Standard responsive-design questions |
| Scope, hoisting, var / let / const, TDZ, Object.freeze | concept `scope-hoisting`; comparison `let-vs-const-vs-var`; tree nodes | Heat-3 JavaScript interview basics; SPEC scope |
| Closures (private state, factories, var-in-a-loop bug) | concept `closures` | Heat-3 basic; "predict the output" favourite |
| this, arrow functions, call / apply / bind, new, prototype chain, class | concept `this-keyword`; comparison `call-vs-apply-vs-bind` | Heat-3 basic |
| Event loop, call stack, tasks vs microtasks, setTimeout 0, timer clamp | concept `event-loop`; comparison `microtask-vs-macrotask` | Heat-3 basic; output-order puzzle |
| Promises, async / await, fetch and response.ok, sequential vs parallel await, combinators | concept `promises-async-await`; comparison `promise-all-vs-allsettled-vs-race-vs-any` | Heat-3 basic |
| Primitives, typeof quirks, falsy list, == vs ===, NaN, Object.is | concept `types-equality`; comparison `loose-vs-strict-equality` | Heat-3 basic |
| Array methods, ES2023 copying methods, spread / rest, destructuring, ?. and ??, shallow vs deep copy | concept `arrays-objects`; comparison `shallow-vs-deep-copy` | Everyday frontend data work; asked often |
| Event phases, target vs currentTarget, delegation, preventDefault vs stopPropagation, passive listeners, React 17 root listeners | concept `dom-events` | Heat-3 basic |
| React as a declarative UI library; render → commit → paint steps | what-is-react | Asked as "How does React work?" in every React round |
| JSX compiles to jsx() calls (automatic runtime) | what-is-react (example with real esbuild output, Interview Q); tree `jsx-transform`; glossary `jsx`, `babel` | Common question "What is JSX and how is it converted?" |
| React DOM vs React Native | tree `react-dom-and-native`; glossary `react-dom-term` | Common "React vs ReactDOM" question |
| Components, JSX rules, props, children, one-way data flow, callback props, `0 &&` trap, default props via destructuring | components-jsx-props; comparison state-vs-props | Core fundamentals; not in the performance-only reference |
| Fragment, portals, class components (legacy), pure render | tree under components-jsx-props; glossary | Commonly asked one-liners |
| useState: snapshot, updater function, immutability, lazy initial state | use-state; tree; glossary | Most asked hook behaviour |
| Keys: unique among siblings only, not passed as props, Math.random() keys, keyed Fragment, reset state with a key | lists-and-keys; tree | Completes P11 with react.dev rules |
| Controlled vs uncontrolled inputs, value without onChange, value must stay a string | controlled-uncontrolled-forms; comparison controlled-vs-uncontrolled | Asked in almost every React interview |
| React 19 form Actions: `<form action>`, useActionState, useFormStatus (react-dom), useOptimistic; React Hook Form | tree `form-actions` and children, `react-hook-form`; glossary | React 19 features interviewers now ask about |
| Rules of Hooks, why call order matters | concept rules-of-hooks | Among the most asked React questions (GreatFrontEnd list #10) |
| Custom hooks share logic, not state | concept rules-of-hooks (trap) | Common wrong answer |
| eslint-plugin-react-hooks (rules-of-hooks, exhaustive-deps, compiler rules) | tree node, glossary | Tooling every React codebase uses |
| HOCs and render props as older patterns | tree nodes, Interview Q, glossary | Asked often (GreatFrontEnd #33, #41) |
| Dependency array table, cleanup, Strict Mode double run, stale closure | concept use-effect | Core useEffect questions (GreatFrontEnd #13) |
| useLayoutEffect, useEffectEvent (React 19.2) | tree nodes, Interview Q, glossary | useEffect vs useLayoutEffect is commonly asked (GreatFrontEnd #11); useEffectEvent is the current fix for non-reactive logic |
| useRef: DOM refs, value refs, ref vs state, ref callbacks | concept use-ref | Commonly asked (GreatFrontEnd #14) |
| ref as a prop and forwardRef no longer needed (React 19) | concept use-ref (point, example, Interview Q), tree | Changed in React 19; forwardRef still asked (GreatFrontEnd #21) |
| useImperativeHandle | tree node, Interview Q | Named by interviewers; rarely used |
| Context API: createContext, `<Context>` as provider (React 19), useContext, re-render cost | concept context-api | Core React topic; context pitfalls asked (GreatFrontEnd #8, #32) |
| useReducer, reducers, actions, dispatch, reducer + context | concept use-reducer, comparison usestate-vs-usereducer | Commonly asked (GreatFrontEnd #17) |
| Lifting state up, single source of truth, prop drilling, composition with children | concept lifting-state-up, tree, glossary | Core React interview topic (react.dev Learn) |
| Where state should live (picker), client vs server vs URL state | concept global-state (table, points) | Commonly asked "how do you decide between state, context and a state manager" (GreatFrontEnd) |
| Context vs Redux Toolkit vs Zustand | comparison context-vs-redux-vs-zustand | Heat-3 interview pair |
| Redux one-way flow, configureStore, createSlice + Immer, useSelector, useDispatch, RTK Query | global-state (Interview Q, example, comparison diagram), tree nodes, glossary | Redux Toolkit 2 is the official way to write Redux |
| Zustand 5 | tree node zustand-store, comparison column, glossary | Popular lighter store |
| Data fetching: three UI states, race condition, ignore flag / AbortController, TanStack Query v5 (useQuery, useMutation + invalidateQueries, defaults), use() with Suspense, error boundaries | concept data-fetching, tree, glossary | Commonly asked data-fetching pitfalls (GreatFrontEnd) |
| Client-side routing: History API, React Router 8 modes, Link vs a, hooks, nested routes + Outlet, protected route, 404 route, SPA host fallback | concept react-router, tree, glossary | Routing is asked in most React interviews (GeeksforGeeks list) |
| Re-render triggers (own state, parent, context value change; props alone are not a trigger) | concept `re-renders` (diagram, points, Interview Q 2); tree trigger nodes | the first question asked after "what is a re-render" |
| Passing slow parts as `children` to skip re-renders | concept `re-renders` (Example) | react.dev's first advice before memo |
| Bundler pipeline (resolve, transform, shake and minify, split) | concept `bundling-code-splitting` (Steps); tree `bundler`, `transpiler`; glossary `bundler`, `minification` | build tooling is in scope (master.json) |
| ES modules, named vs default export | tree `es-module`, `named-export`, `default-export`; glossary `es-module` | React.lazy needs a default export; tree shaking needs ES modules |
| Vite 8 (native-ESM dev server, Rolldown) and CRA deprecation (14-02-2025) | concept `bundling-code-splitting` (points "New app", trap); tree `vite`, `create-react-app` | current tooling; CRA is still commonly suggested |
| Declare lazy() outside the component | concept `bundling-code-splitting` (Interview Q 2) | react.dev caveat; common bug |
| Overscan, TanStack Virtual, react-window, pagination / infinite scroll | tree nodes under `virtualization`; points "Overscan" (TanStack default 1) | named options for "render 10,000 rows" |
| useDeferredValue vs debounce | concept `large-lists-and-frequent-events` (points, Interview Q 3) | react.dev compares them directly |
| Debounce implementation with a closure | concept `large-lists-and-frequent-events` (Example with real output) | "write debounce" is a standard coding question |
| Core Web Vitals thresholds, TTFB, FCP, FID history | concept `measuring-performance` (table); tree `core-web-vitals` children; glossary | asked in frontend interviews; reference only said "Web Vitals" |
| Performance panel long tasks (> 50 ms), Lighthouse lab vs field data, CPU throttling | concept `measuring-performance`; tree; glossary `long-task`, `field-data`, `lighthouse` | how to measure correctly |
| Image defaults (HTML `loading` eager; next/image lazy, WebP) | concept `measuring-performance` (Defaults) | real defaults with versions |
| CSR, SSR, SSG, ISR and when to pick each | concept `rendering-strategies`; comparison `csr-vs-ssr-vs-ssg-vs-isr` | Heat-3 interview topic; not in the performance-only reference |
| Hydration, hydration mismatch, streaming SSR, Partial Prerendering | `rendering-strategies` (points, trap, Interview Q); tree nodes | Common follow-ups to SSR questions; Next.js 16 Cache Components |
| Server vs Client Components, 'use client' boundary, serialisable props, Server Functions ('use server') | `server-components`; comparison `server-vs-client-components`; tree | Core Next.js App Router interview topic |
| App Router file conventions (layout, page, loading, error, route groups) | tree under `server-components` | Asked in Next.js rounds; kept as one-line nodes |
| Trap "Server Components = SSR" | `server-components` trap | Very common confusion |
| Testing: test types, RTL queries and priority, user-event, findBy for async UI, MSW, Vitest 5 / Jest 30, Playwright, snapshot tests | concept `testing-react`; tree; glossary | Frontend interviews ask how you test React |
| Answer shape, Thinking in React, question → concept table, machine coding round | concept `frontend-playbook`; tree | Spec: playbook for answering |

## Dropped
| Reference item | Reason (rare / advanced / duplicate / unverifiable) |
|---|---|
| (no whole item) | |

### Details placed elsewhere or cut, inside items listed above
| Reference item part | What happened |
|---|---|
| P0.3. Reconciliation | cut: react-core / `what-is-react` |
| P0.4. Virtual DOM | cut: react-core / `what-is-react` |
| P0.19. Batched updates | cut: react-core / `use-state` |
| P0.20. State colocation | cut: app-state / `lifting-state-up` |
| P0.21. Derived state | cut: react-core / `use-state` |
| P0.22. Avoid unnecessary state | cut: react-core / `use-state` |
| P9. Keep state local | cut: app-state / `lifting-state-up` |
| P10. Avoid unnecessary useEffect | cut: hooks / `use-effect` |
| P11. Stable keys | cut: react-core / `lists-and-keys` |
| P14. Server Components (Next.js) | cut: modern / `server-components` |
| PG. Golden interview answer | cut: modern / `frontend-playbook` |
| PM (part: Duplicate state → derived state) | also: concept use-state (point "Derived state", How it works bullet on copying props into state) |
| PM (part: 'Duplicate state → derived state') | also: concept use-effect (Interview Q links [derived state](card:use-state)) |
| PM (part: 'Too much state → colocate state') | also: concept lifting-state-up (point "Colocate") |
| PM (part: 'Re-renders → memo / state colocation') | also: concept `re-renders` (points "Fix order", How it works bullet 2 links `lifting-state-up` and `memoization`) |
| PM (part: 'Expensive calculation → useMemo') | also: comparison `usememo-vs-usecallback-vs-memo` row "Worth it when" |
| PM (part: 'Function reference → useCallback') | also: comparison `usememo-vs-usecallback-vs-memo` column b |
| PM (part: 'Child component → React.memo') | also: comparison `usememo-vs-usecallback-vs-memo` column c |
| PM (part: 'Large bundle → code splitting / lazy loading / tree shaking') | also: concept `bundling-code-splitting` (Steps, sayIt) |
| PM (part: 'Huge list → virtualization') | also: concept `large-lists-and-frequent-events` (points, sayIt) |
| PM (part: 'Search input → debounce') | also: concept `large-lists-and-frequent-events`; comparison `debounce-vs-throttle` |
| PM (part: 'Find bottleneck → Profiler / DevTools') | also: concept `measuring-performance` (points, Interview Q 1); tree `react-devtools-profiler`, `performance-panel` |
| PM (part: 'Less client JS → Server Components') | also: concept `server-components` (point "Less client JS"); `frontend-playbook` table row links it |
| PM (part: 'Re-renders → memo / state colocation') | also: `frontend-playbook` table row "Children re-render with the same props" → links `re-renders`, `lifting-state-up`, `memoization` |
| PM (part: 'Expensive calculation → useMemo') | also: `frontend-playbook` table row → `memoization` |
| PM (part: 'Function reference → useCallback') | also: `frontend-playbook` table row 2 links `memoization` |
| PM (part: 'Child component → React.memo') | also: `frontend-playbook` table row 2 links `memoization` |
| PM (part: 'Large bundle → code splitting / lazy loading / tree shaking') | also: `frontend-playbook` table row → `bundling-code-splitting` |
| PM (part: 'Huge list → virtualization') | also: `frontend-playbook` table row → `large-lists-and-frequent-events` |
| PM (part: 'Search input → debounce') | also: same row → `large-lists-and-frequent-events`; also machine-coding bullet |
| PM (part: 'Scroll/resize → throttle') | also: same row → `large-lists-and-frequent-events` |
| PM (part: 'Duplicate state → derived state') | also: `frontend-playbook` row "State copied from props" → `use-state` |
| PM (part: 'Too much state → colocate state') | also: `frontend-playbook` row 2 "move state down" → `lifting-state-up` |
| PM (part: 'Find bottleneck → Profiler / DevTools') | also: `frontend-playbook` row "Not sure what is slow" → `measuring-performance`; point "Performance"; tree node `measure-first` |
| PM (parts: 'Duplicate state → derived state', 'Too much state → colocate state', 'Less client JS → Server Components') | cut: `use-state`, `lifting-state-up`, `server-components` |
