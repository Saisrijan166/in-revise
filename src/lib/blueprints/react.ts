import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const react: Blueprint = {
  tagline:
    "How a component becomes pixels, and how state, hooks and the ecosystem drive re-renders.",
  legend: legendOf(["Components", "Rendering", "State & data", "Hooks", "Ecosystem"]),
  alt:
    "A system map of React. Components: a function component takes props and returns JSX. Rendering: JSX " +
    "builds a virtual DOM tree, React reconciles it by diffing with keys (the Fiber tree), commits the " +
    "changes to the real DOM, and the browser paints. State and data: useState holds state, calling the " +
    "setter triggers a re-render that rebuilds the virtual DOM; state is lifted up through props, shared via " +
    "Context, and effects fetch data. Hooks: useEffect runs side effects, useMemo and useCallback memoise, " +
    "useRef holds mutable values, and custom hooks compose these. Ecosystem: a Router handles navigation, " +
    "Next.js adds server-side rendering and React Server Components, and Vite builds and bundles.",
  baseline: "React 19 · Next.js 15",
  chart: `flowchart TD
  subgraph COMP["1 . Components"]
    direction TB
    comp["Function Component"]:::f
    comp -->|returns| jsx["JSX"]:::f
    props["props (data in)"]:::f
    props --> comp
  end

  subgraph RENDER["2 . Rendering"]
    direction TB
    jsx --> vdom["Virtual DOM tree"]:::c
    vdom --> recon["Reconcile: diff + keys (Fiber)"]:::c
    recon --> commit["Commit to real DOM"]:::c
    commit --> paint(["Browser paints"]):::c
  end

  subgraph STATE["3 . State and data"]
    direction LR
    us["useState"]:::d
    lift["Lift state up"]:::d
    ctx["Context"]:::d
    fch["Data fetching"]:::d
  end
  comp --> us
  us -->|setState| rer["Re-render"]:::c
  rer --> vdom
  lift -.-> props
  ctx -.-> comp

  subgraph HOOKS["4 . Hooks"]
    direction LR
    ue["useEffect (side effects)"]:::x
    um["useMemo / useCallback"]:::x
    ur["useRef"]:::x
    uch["Custom hooks"]:::x
  end
  comp --> ue
  comp --> um
  comp --> ur
  comp --> uch
  ue -->|fetch| fch

  subgraph ECO["5 . Ecosystem"]
    direction LR
    rtr["Router"]:::o
    nxt["Next.js: SSR / RSC"]:::o
    vite["Vite build"]:::o
  end
  comp --> rtr
  comp --> nxt
  jsx -.-> vite
${CLASSDEFS}`,
};
