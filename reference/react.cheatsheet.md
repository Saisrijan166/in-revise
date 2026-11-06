# How React Renders

## Re-render vs DOM update ⭐⭐⭐

React runs a component function again to work out the updated UI — that is a **re-render**. A **DOM update** is an actual change to the browser's DOM. A re-render does not always cause a DOM update.

- Re-render = recompute the UI in memory.
- DOM update = the real page actually changes.

> Remember: Re-render ≠ DOM update. This distinction is a very common interview point.

## Virtual DOM and reconciliation

- **Virtual DOM:** React's in-memory representation of the UI, used during rendering.
- **Reconciliation:** React compares the new UI with the previous UI and works out what actually needs to change in the DOM.

So React re-renders freely in memory, then reconciliation keeps real DOM changes to a minimum.

## Memoization basics

- **Memoization:** reuse a previous result or reference instead of recalculating it unnecessarily.
- **Referential equality:** checking whether two values point to the same object/function reference.
- **Stable reference:** keeping the same object/function reference between renders when it is needed.
- **Batched updates:** React groups multiple state updates together to reduce rendering work.

> Remember: Memoization is about keeping values and references stable so React can skip unnecessary work.

# Memoization Tools

## React.memo ⭐⭐

Wraps a component so it skips re-rendering when its props have not meaningfully changed.

```jsx
const User = React.memo(UserComponent);
```

> Remember: `memo` → memoize a **component**.

## useMemo ⭐⭐

Memoizes an expensive **calculated value**, recomputing only when its dependencies change.

```jsx
const result = useMemo(() => expensiveCalculation(data), [data]);
```

> Remember: `useMemo` → memoize a **value / calculation**.

## useCallback ⭐⭐

Memoizes a **function reference** so it stays stable between renders.

```jsx
const handleClick = useCallback(() => {
  doSomething();
}, []);
```

> Remember: `useCallback` → memoize a **function reference**.

# Rendering and State

## Avoid unnecessary re-renders ⭐

First identify where unnecessary re-renders happen, then optimize only where there is a real performance problem — do not add memoization blindly.

## Keep state local (colocation)

Keep state close to the component that actually needs it instead of lifting everything into global state.

- Global state → everything re-renders.
- Local state → only that component re-renders.

> Remember: The interview term for this is **state colocation**.

## Derived state — avoid unnecessary useEffect ⭐

Do not use an Effect just to calculate a value from existing state/props. Calculate it directly during render.

```jsx
// Unnecessary
useEffect(() => { setTotal(price * quantity); }, [price, quantity]);

// Prefer
const total = price * quantity;
```

> Remember: Calculating from existing state/props is **derived state** — fewer states, fewer renders.

## Stable keys

Give list items a stable key (like an id) so React reconciles the list correctly.

```jsx
users.map(user => <User key={user.id} user={user} />)
```

# Loading and Bundle Size

## Lazy loading and code splitting ⭐

Split JavaScript into smaller bundles and load a component only when it is needed, using a dynamic import. This shrinks the initial JavaScript, so the first load is faster.

```jsx
const Dashboard = lazy(() => import("./Dashboard"));
```

- **Code splitting:** split JS into smaller bundles.
- **Lazy loading:** load code/component only when needed.
- **Dynamic import:** load a module asynchronously.

## Reduce bundle size

**Bundle size** is the amount of JavaScript to download and process. Reduce it with:

- Code splitting, lazy loading, dynamic imports.
- **Tree shaking** — removes unused code from the production bundle.
- Removing unnecessary dependencies.

> Remember: Less JavaScript shipped = faster load.

# Large Data and Frequent Events

## Virtualization ⭐

Render only the visible items instead of thousands of DOM elements.

- A list of 10,000 items with only ~20 visible should not render all 10,000.

> Remember: Render only the visible portion.

## Debounce vs Throttle ⭐⭐

Both limit expensive work tied to fast, repeated events.

| Technique | What it does | Typical use |
|---|---|---|
| **Debounce** | Wait until activity stops, then run once | Search box (run after typing stops, not every keystroke) |
| **Throttle** | Limit how often code runs | scroll, resize, mousemove |

> Remember: Debounce = wait for a pause. Throttle = run at most every N ms.

# Assets and Next.js

## Optimize images

Serve optimized images with appropriate sizes and lazy loading where suitable. In Next.js use the Image component.

```jsx
import Image from "next/image";
```

## Server Components ⭐

In Next.js, Server Components reduce the client JavaScript, giving better initial performance. Do not mark the whole app `'use client'` unnecessarily.

> Remember: Server Component → less client JS → faster initial load.

## Concurrent rendering tools

React can render without blocking urgent UI updates (concurrent rendering).

- **Suspense:** show fallback UI while part of the UI is still loading.
- **useTransition:** mark an update as non-urgent.
- **useDeferredValue:** let a non-urgent value update later.
- **React Compiler:** can automatically optimize/memoize some React code.

# Measure Before Optimizing

## Find the bottleneck first ⭐⭐

Measure before applying any optimization, rather than blindly adding memoization.

Tools: React DevTools Profiler, browser Performance tools, Lighthouse, Web Vitals.

> Remember: First profile to find the bottleneck, then apply targeted optimization.

## The golden interview answer ⭐⭐⭐

> I first identify unnecessary re-renders using profiling tools. Then I use `React.memo`, `useMemo`, and `useCallback` where they add value, keep state colocated, avoid unnecessary Effects and use derived state, use stable keys, apply lazy loading and code splitting, virtualize large lists, debounce/throttle expensive events, reduce bundle size, and optimize images. In Next.js, I use Server Components where appropriate to reduce client-side JavaScript.

# Common "Why X vs Y?" Comparisons

## useMemo vs useCallback vs memo ⭐⭐⭐

All three cache something to avoid unnecessary work, but each targets a different thing.

| Tool | Memoizes | Use when |
|---|---|---|
| `useMemo` | a **value / calculation** | a calculation is expensive |
| `useCallback` | a **function reference** | a stable function is passed to a child |
| `React.memo` | a **component** | a child should skip re-render on unchanged props |

> Remember: useMemo → value, useCallback → function, memo → component.

## Re-render vs DOM update ⭐⭐

A re-render recomputes the UI in memory; a DOM update changes the real page. React re-renders often but, through reconciliation, only touches the DOM when something actually changed.

> Remember: A re-render does not always mean a DOM update.

## Debounce vs Throttle

See *Large Data and Frequent Events*: debounce waits for activity to stop (search box); throttle caps how often code runs (scroll, resize, mousemove).
