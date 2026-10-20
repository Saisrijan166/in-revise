# React Performance Optimization

### Important Terminologies

- **Re-render:** React runs a component again to calculate updated UI.
- **DOM update:** Actual changes made to the browser DOM. A re-render does **not** always mean a DOM update.
- **Reconciliation:** React compares the new UI with the previous UI and determines what needs to change.
- **Virtual DOM:** React's in-memory representation of the UI used during rendering/reconciliation.
- **Memoization:** Reusing a previous result/reference instead of recalculating unnecessarily.
- **`React.memo`:** Prevents unnecessary child rendering when its props are unchanged.
- **`useMemo`:** Memoizes an expensive **calculated value**.
- **`useCallback`:** Memoizes a **function reference**.
- **Code splitting:** Splitting JavaScript into smaller bundles.
- **Lazy loading:** Loading code/component only when it is needed.
- **Dynamic import:** Load a module/component asynchronously.
- **Bundle size:** Amount of JavaScript that needs to be downloaded/processed.
- **Tree shaking:** Removes unused code from the production bundle.
- **Debouncing:** Wait until activity stops before executing expensive work.
- **Throttling:** Limit how frequently an operation executes.
- **Virtualization:** Render only visible items instead of thousands of DOM elements.
- **Referential equality:** Checking whether two values have the same object/function reference.
- **Stable reference:** Keeping the same object/function reference between renders when needed.
- **Batched updates:** React groups multiple state updates to reduce rendering work.
- **State colocation:** Keep state close to the component that actually needs it.
- **Derived state:** Calculate values from existing state/props instead of storing duplicate state.
- **Avoid unnecessary state:** Less state often means fewer unnecessary renders.
- **Suspense:** Allows fallback UI while part of the UI is waiting.
- **Concurrent rendering:** React can work on rendering without blocking urgent UI updates.
- **`useTransition`:** Marks an update as non-urgent.
- **`useDeferredValue`:** Lets a non-urgent value update later.
- **React Compiler:** Can automatically optimize/memoize some React code.

---

## Most Important Optimization Techniques

### 1. Avoid unnecessary re-renders

```jsx
// Keep state where it is actually needed
const [count, setCount] = useState(0);
```

**Interview:**  
> First I identify unnecessary re-renders, then optimize only where there is an actual performance problem.

---

### 2. `React.memo`

```jsx
const User = React.memo(UserComponent);
```

**Use:** Prevent unnecessary child renders when props haven't meaningfully changed.

---

### 3. `useMemo`

```jsx
const result = useMemo(() => expensiveCalculation(data), [data]);
```

**Remember:**

> `useMemo` → memoize **value/calculation**.

---

### 4. `useCallback`

```jsx
const handleClick = useCallback(() => {
  doSomething();
}, []);
```

**Remember:**

> `useCallback` → memoize **function reference**.

---

### 5. Lazy loading / Code splitting

```jsx
const Dashboard = lazy(() => import("./Dashboard"));
```

**Benefit:** Smaller initial JavaScript → faster initial load.

---

### 6. Virtualization

For a list with:

```text
10,000 items
```

Don't render all 10,000 if only 20 are visible.

> Render only the visible portion.

---

### 7. Debounce

Example: search box.

```text
User types:
S → Sr → Sri → Srij → Srijan

Don't API call for every keystroke.
Wait until typing stops.
```

---

### 8. Throttle

Example:

```text
scroll
resize
mousemove
```

Limit how frequently expensive code runs.

---

### 9. Keep state local

Instead of:

```text
Global state
   ↓
Everything
```

Prefer:

```text
Component
   ↓
Local state
```

when only that component needs it.

**Term:** **State colocation**

---

### 10. Avoid unnecessary `useEffect`

Don't use an Effect just to calculate something:

```jsx
// ❌ unnecessary
useEffect(() => {
  setTotal(price * quantity);
}, [price, quantity]);
```

Prefer:

```jsx
// ✅
const total = price * quantity;
```

**Interview term:** **Derived state**

---

### 11. Stable keys

```jsx
users.map(user => (
  <User key={user.id} user={user} />
))
```

Stable keys help React correctly reconcile lists.

---

### 12. Optimize images/assets

In Next.js:

```jsx
import Image from "next/image";
```

Use optimized images, appropriate sizes and lazy loading where suitable.

---

### 13. Reduce bundle size

Use:

```text
Code splitting
Lazy loading
Dynamic imports
Tree shaking
Remove unnecessary dependencies
```

---

### 14. Server Components — Next.js

In Next.js:

```text
Server Component
       ↓
Less client JavaScript
       ↓
Better initial performance
```

Don't make the entire application `'use client'` unnecessarily.

---

### 15. Measure before optimizing

Important interview terminology:

```text
React DevTools Profiler
Browser Performance tools
Lighthouse
Web Vitals
```

**Interview answer:**

> I would first measure the bottleneck using profiling/performance tools, then apply targeted optimization rather than blindly adding memoization.

---

# The Golden Interview Answer

If asked:

**"How do you optimize React performance?"**

Say:

> **I first identify unnecessary re-renders using profiling tools. Then I use techniques such as `React.memo`, `useMemo`, and `useCallback` where they provide value, keep state colocated, avoid unnecessary Effects and derived state, use stable keys, lazy loading and code splitting, virtualize large lists, debounce/throttle expensive events, reduce bundle size, and optimize images. In Next.js, I also use Server Components where appropriate to reduce client-side JavaScript.**

### One-line memory map

```text
Performance
│
├── Re-renders → memo / state colocation
├── Expensive calculation → useMemo
├── Function reference → useCallback
├── Child component → React.memo
├── Large bundle → code splitting / lazy loading / tree shaking
├── Huge list → virtualization
├── Search input → debounce
├── Scroll/resize → throttle
├── Duplicate state → derived state
├── Too much state → colocate state
├── Images → next/image
├── Less client JS → Server Components
└── Find bottleneck → Profiler / DevTools
```

**Most important distinction to remember:**

```text
useMemo     → value
useCallback → function
memo        → component
```

And:

```text
Re-render ≠ DOM update
```

That distinction is a **very common React interview point**.