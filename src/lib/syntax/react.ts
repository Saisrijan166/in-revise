import type { SyntaxSheet } from "./types";

export const react: SyntaxSheet = {
  tagline: "The React hooks, JSX, events and patterns you actually write every day.",
  baseline: "React 19",
  lang: "jsx",
  groups: [
    {
      title: "Component and JSX",
      rows: [
        {
          syntax: "function App() { return <div/> }",
          what: "A component (returns JSX)",
          example: "function Hello() { return <h1>Hi</h1>; }",
        },
        {
          syntax: "export default function App()",
          what: "Export a component",
          example: "export default function App() {}",
        },
        {
          syntax: "<Comp prop={value} />",
          what: "Render with props",
          example: "<User name={name} age={30} />",
        },
        { syntax: "{expression}", what: "Embed JS in JSX", example: "<p>{2 + 2}</p>" },
        {
          syntax: "className=",
          what: "CSS class (not class)",
          example: '<div className="card" />',
        },
        { syntax: "<>...</>", what: "Fragment (no extra node)", example: "<>{a}{b}</>" },
        {
          syntax: "style={{ key: val }}",
          what: "Inline style object",
          example: "<div style={{ color: 'red' }} />",
        },
        { syntax: "{/* comment */}", what: "JSX comment", example: "{/* todo */}" },
      ],
    },
    {
      title: "useState",
      rows: [
        {
          syntax: "const [x, setX] = useState(init)",
          what: "Local state + setter",
          example: "const [count, setCount] = useState(0);",
        },
        { syntax: "setX(value)", what: "Set a new value (re-renders)", example: "setCount(5)" },
        {
          syntax: "setX(prev => prev + 1)",
          what: "Update from previous value",
          example: "setCount(c => c + 1)",
        },
        {
          syntax: "useState(() => expensive())",
          what: "Lazy initial value (run once)",
          example: "useState(() => load())",
        },
        {
          syntax: "setObj({ ...obj, k: v })",
          what: "Update object immutably",
          example: "setUser({ ...user, name })",
        },
        {
          syntax: "setArr([...arr, x])",
          what: "Add to array immutably",
          example: "setItems([...items, newItem])",
        },
      ],
    },
    {
      title: "useEffect",
      rows: [
        {
          syntax: "useEffect(fn, deps)",
          what: "Run side effect after render",
          example: "useEffect(() => { ... }, [id]);",
        },
        {
          syntax: "useEffect(fn, [])",
          what: "Run once on mount",
          example: "useEffect(() => { load(); }, []);",
        },
        {
          syntax: "useEffect(fn)",
          what: "Run after every render",
          example: "useEffect(() => { ... });",
        },
        {
          syntax: "return () => cleanup()",
          what: "Cleanup (unmount / before re-run)",
          example: "return () => clearInterval(id);",
        },
        {
          syntax: "deps array",
          what: "Re-run when a listed value changes",
          example: "}, [query, page]);",
        },
      ],
      combos: [
        {
          label: "Effect with cleanup (subscription / timer)",
          code: `useEffect(() => {
  const id = setInterval(() => setTick(t => t + 1), 1000);
  return () => clearInterval(id);   // cleanup on unmount
}, []);`,
        },
      ],
    },
    {
      title: "Other hooks",
      rows: [
        {
          syntax: "const ref = useRef(init)",
          what: "Mutable box / DOM handle (no re-render)",
          example: "const inputRef = useRef(null);",
        },
        {
          syntax: "ref.current",
          what: "Read / write the ref value",
          example: "inputRef.current.focus();",
        },
        {
          syntax: "useMemo(() => calc, deps)",
          what: "Cache an expensive value",
          example: "const sorted = useMemo(() => sort(list), [list]);",
        },
        {
          syntax: "useCallback(fn, deps)",
          what: "Cache a function identity",
          example: "const onClick = useCallback(() => f(id), [id]);",
        },
        {
          syntax: "useContext(MyContext)",
          what: "Read a context value",
          example: "const theme = useContext(ThemeContext);",
        },
        {
          syntax: "useReducer(reducer, init)",
          what: "State via dispatch(action)",
          example: "const [state, dispatch] = useReducer(r, init);",
        },
      ],
    },
    {
      title: "Events",
      rows: [
        {
          syntax: "onClick={handler}",
          what: "Click handler",
          example: "<button onClick={save}>Save</button>",
        },
        {
          syntax: "onClick={() => f(id)}",
          what: "Pass arguments",
          example: "<button onClick={() => remove(id)} />",
        },
        {
          syntax: "onChange={e => ...}",
          what: "Input change",
          example: "onChange={e => setText(e.target.value)}",
        },
        { syntax: "onSubmit={e => ...}", what: "Form submit", example: "onSubmit={handleSubmit}" },
        {
          syntax: "e.preventDefault()",
          what: "Stop default (page reload)",
          example: "e.preventDefault();",
        },
        {
          syntax: "e.target.value",
          what: "The input's current value",
          example: "const v = e.target.value;",
        },
        {
          syntax: "onKeyDown / onBlur / onFocus",
          what: "Keyboard / focus events",
          example: "onKeyDown={e => e.key === 'Enter' && go()}",
        },
      ],
    },
    {
      title: "Conditional and list rendering",
      rows: [
        { syntax: "{cond && <X/>}", what: "Render if true", example: "{loading && <Spinner/>}" },
        {
          syntax: "{cond ? <A/> : <B/>}",
          what: "Either / or",
          example: "{user ? <Home/> : <Login/>}",
        },
        {
          syntax: "{items.map(x => <Li key={x.id}/>)}",
          what: "Render a list",
          example: "{todos.map(t => <li key={t.id}>{t.text}</li>)}",
        },
        {
          syntax: "key={uniqueId}",
          what: "Stable identity per item (required)",
          example: "key={item.id}",
        },
        {
          syntax: "{list.length === 0 && <Empty/>}",
          what: "Empty-state guard",
          example: "{rows.length === 0 && <p>None</p>}",
        },
        {
          syntax: "{items.filter(...).map(...)}",
          what: "Filter then render",
          example: "{users.filter(u => u.active).map(...)}",
        },
      ],
    },
    {
      title: "Forms (controlled inputs)",
      rows: [
        {
          syntax: "value={state} onChange={...}",
          what: "Controlled input",
          example: "<input value={name} onChange={e => setName(e.target.value)} />",
        },
        {
          syntax: "checked={bool} onChange={...}",
          what: "Controlled checkbox",
          example: "<input type='checkbox' checked={on} onChange={...} />",
        },
        {
          syntax: "<select value={v} onChange={...}>",
          what: "Controlled select",
          example: "<select value={sel} onChange={...}>",
        },
        {
          syntax: "<textarea value={v} ... />",
          what: "Controlled textarea",
          example: "<textarea value={msg} onChange={...} />",
        },
        {
          syntax: "onSubmit + preventDefault",
          what: "Handle form submit",
          example: "<form onSubmit={submit}>",
        },
      ],
      combos: [
        {
          label: "Controlled form",
          code: `function LoginForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    login(email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email}
             onChange={e => setEmail(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  );
}`,
        },
      ],
    },
    {
      title: "Data fetching",
      rows: [
        {
          syntax: "fetch(url).then(r => r.json())",
          what: "Call an API",
          example: "fetch('/api/users').then(r => r.json())",
        },
        {
          syntax: "useEffect(fetch-on-mount, [])",
          what: "Load data when component mounts",
          example: "useEffect(() => { load(); }, []);",
        },
        {
          syntax: "async function inside effect",
          what: "Await without an async effect",
          example: "useEffect(() => { (async () => {...})(); }, []);",
        },
        {
          syntax: "loading / error / data state",
          what: "Three states to track",
          example: "const [data, setData] = useState(null);",
        },
        {
          syntax: "ignore flag in cleanup",
          what: "Avoid setting state after unmount",
          example: "return () => { ignore = true; };",
        },
      ],
      combos: [
        {
          label: "Fetch on mount",
          code: `function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    fetch("/api/users")
      .then(r => r.json())
      .then(data => { if (!ignore) setUsers(data); })
      .finally(() => setLoading(false));
    return () => { ignore = true; };
  }, []);

  if (loading) return <p>Loading...</p>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
        },
      ],
    },
    {
      title: "Context",
      rows: [
        {
          syntax: "const Ctx = createContext(default)",
          what: "Create a context",
          example: "const ThemeContext = createContext('light');",
        },
        {
          syntax: "<Ctx value={x}>...</Ctx>",
          what: "Provide (React 19: Ctx is the Provider)",
          example: "<ThemeContext value={theme}>...</ThemeContext>",
        },
        {
          syntax: "useContext(Ctx)",
          what: "Consume the value",
          example: "const theme = useContext(ThemeContext);",
        },
        {
          syntax: "<Ctx.Provider value={x}>",
          what: "Provide (classic form)",
          example: "<ThemeContext.Provider value={theme}>",
        },
      ],
      combos: [
        {
          label: "Context provider + consumer",
          code: `const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext value="dark">
      <Toolbar />
    </ThemeContext>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>...</div>;
}`,
        },
      ],
    },
    {
      title: "Custom hooks and props",
      rows: [
        {
          syntax: "function useThing() { ... }",
          what: "Reusable hook (name starts with use)",
          example: "function useToggle() { ... }",
        },
        {
          syntax: "return [state, actions]",
          what: "Expose state + updaters",
          example: "return [on, () => setOn(o => !o)];",
        },
        {
          syntax: "function Comp({ a, b })",
          what: "Destructure props",
          example: "function User({ name, age }) {}",
        },
        {
          syntax: "{ a = default }",
          what: "Default prop value",
          example: "function Btn({ kind = 'primary' }) {}",
        },
        {
          syntax: "props.children",
          what: "Nested content",
          example: "function Card({ children }) { return <div>{children}</div>; }",
        },
        { syntax: "{...props}", what: "Spread props through", example: "<input {...rest} />" },
      ],
      combos: [
        {
          label: "A custom hook",
          code: `function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn(o => !o), []);
  return [on, toggle];
}

// use it
const [open, toggleOpen] = useToggle();`,
        },
      ],
    },
  ],
};
