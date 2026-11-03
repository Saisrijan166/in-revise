import type { SyntaxSheet } from "./types";

export const python: SyntaxSheet = {
  tagline:
    "The Python builtins, string, list, dict and collections calls you actually write every day.",
  baseline: "Python 3.14",
  lang: "python",
  groups: [
    {
      title: "Print, input and f-strings",
      rows: [
        { syntax: "print(x)", what: "Print a line", example: 'print("Hello")' },
        {
          syntax: "print(a, b, sep=, end=)",
          what: "Control separator / line end",
          example: 'print("a", "b", sep="-", end="")',
        },
        {
          syntax: "input(prompt)",
          what: "Read a line (always a str)",
          example: 'name = input("Name: ")',
        },
        { syntax: "int(input())", what: "Read and parse a number", example: "n = int(input())" },
        {
          syntax: 'f"{x}"',
          what: "Insert values into text",
          example: 'f"total = {a + b}"',
        },
        {
          syntax: 'f"{x:.2f}"',
          what: "Format: 2 decimals",
          example: 'f"{3.14159:.2f}" # 3.14',
        },
        {
          syntax: 'f"{x:>5} {x:,}"',
          what: "Pad / thousands separator",
          example: 'f"{42:>5}" # "   42"',
        },
        {
          syntax: 'f"{x=}"',
          what: "Debug: name and value",
          example: 'f"{n=}" # "n=5"',
        },
      ],
    },
    {
      title: "Strings (methods and slicing)",
      rows: [
        { syntax: "len(s)", what: "Length", example: 'len("abc") # 3' },
        { syntax: "s[i]  s[-1]", what: "Char by index (last with -1)", example: '"abc"[-1] # "c"' },
        {
          syntax: "s[a:b]  s[a:b:step]",
          what: "Slice [a, b), optional step",
          example: '"abcde"[1:3] # "bc"',
        },
        { syntax: "s[::-1]", what: "Reverse a string", example: '"abc"[::-1] # "cba"' },
        {
          syntax: "s.strip() / lstrip() / rstrip()",
          what: "Trim whitespace",
          example: '"  x  ".strip() # "x"',
        },
        {
          syntax: "s.split(sep)",
          what: "Split into a list",
          example: '"a,b".split(",") # ["a","b"]',
        },
        {
          syntax: "sep.join(iterable)",
          what: "Join strings",
          example: '",".join(["a","b"]) # "a,b"',
        },
        {
          syntax: "s.replace(a, b)",
          what: "Replace all occurrences",
          example: '"aaa".replace("a","b")',
        },
        {
          syntax: "s.find(x) / index(x)",
          what: "First index (-1 / error)",
          example: '"abc".find("b") # 1',
        },
        {
          syntax: "s.startswith/endswith(x)",
          what: "Prefix / suffix check",
          example: '"file.py".endswith(".py")',
        },
        {
          syntax: "s.upper() / lower() / title()",
          what: "Change case",
          example: '"abc".upper() # "ABC"',
        },
        {
          syntax: "s.isdigit() / isalpha() / isalnum()",
          what: "Classify characters",
          example: '"42".isdigit() # True',
        },
        { syntax: "s.count(x)", what: "Count occurrences", example: '"banana".count("a") # 3' },
        {
          syntax: "s.zfill(n) / s.ljust(n)",
          what: "Pad with zeros / spaces",
          example: '"7".zfill(3) # "007"',
        },
        {
          syntax: "ord(c) / chr(n)",
          what: "Char to code / code to char",
          example: "ord('a') # 97",
        },
      ],
    },
    {
      title: "Lists",
      rows: [
        { syntax: "a = [1, 2, 3]", what: "List literal", example: "nums = [1, 2, 3]" },
        { syntax: "a.append(x)", what: "Add to end", example: "a.append(4)" },
        { syntax: "a.extend(it) / a += it", what: "Add many", example: "a.extend([4, 5])" },
        { syntax: "a.insert(i, x)", what: "Insert at index", example: "a.insert(0, 99)" },
        { syntax: "a.pop(i)", what: "Remove+return (last if no i)", example: "last = a.pop()" },
        { syntax: "a.remove(x)", what: "Remove first match by value", example: "a.remove(2)" },
        { syntax: "a[i] = x  a[a:b] = ...", what: "Set item / slice", example: "a[0] = 10" },
        { syntax: "x in a", what: "Membership test", example: "if 5 in a: ..." },
        { syntax: "a.index(x) / a.count(x)", what: "Find / count", example: "a.index(2) # 1" },
        {
          syntax: "a.sort(key=, reverse=)",
          what: "Sort in place",
          example: "a.sort(reverse=True)",
        },
        { syntax: "a.reverse()", what: "Reverse in place", example: "a.reverse()" },
        {
          syntax: "len(a)  sum(a)  min(a)  max(a)",
          what: "Aggregate",
          example: "sum([1, 2, 3]) # 6",
        },
        { syntax: "a[:]  list(a)", what: "Shallow copy", example: "b = a[:]" },
      ],
      combos: [
        {
          label: "List comprehension patterns",
          code: `squares = [x * x for x in range(5)]          # map
evens   = [x for x in nums if x % 2 == 0]    # filter
pairs   = [(i, j) for i in a for j in b]     # nested
flat    = [x for row in grid for x in row]   # flatten
labels  = ["even" if x % 2 == 0 else "odd" for x in nums]  # ternary`,
        },
      ],
    },
    {
      title: "Dictionaries",
      rows: [
        { syntax: "d = {k: v}", what: "Dict literal", example: 'd = {"a": 1}' },
        { syntax: "d[k]", what: "Get (KeyError if missing)", example: 'd["a"]' },
        { syntax: "d.get(k, default)", what: "Get with fallback", example: 'd.get("x", 0)' },
        { syntax: "d[k] = v", what: "Insert or overwrite", example: 'd["b"] = 2' },
        {
          syntax: "d.setdefault(k, default)",
          what: "Get, set if missing",
          example: 'd.setdefault("x", []).append(1)',
        },
        { syntax: "k in d", what: "Has key?", example: 'if "a" in d: ...' },
        { syntax: "d.pop(k, default)", what: "Remove and return", example: 'd.pop("a", None)' },
        {
          syntax: "d.keys() / values() / items()",
          what: "Views for iterating",
          example: "for k, v in d.items(): ...",
        },
        { syntax: "d.update(other)", what: "Merge another dict", example: 'd.update({"c": 3})' },
        { syntax: "d1 | d2", what: "Merge into a new dict", example: "merged = d1 | d2" },
        { syntax: "len(d)", what: "Number of keys", example: "len(d)" },
        {
          syntax: "Counter(iterable)",
          what: "Count occurrences fast",
          example: "Counter('banana') # {'a':3,...}",
        },
      ],
      combos: [
        {
          label: "Frequency count (three idioms)",
          code: `from collections import Counter

freq = Counter(words)                     # simplest
freq.most_common(3)                       # top 3 as list of (item, count)

freq = {}
for w in words:
    freq[w] = freq.get(w, 0) + 1          # with get

# dict comprehension
squares = {x: x * x for x in range(5)}`,
        },
      ],
    },
    {
      title: "Sets",
      rows: [
        { syntax: "s = {1, 2, 3}  set()", what: "Set / empty set", example: "seen = set()" },
        { syntax: "s.add(x)", what: "Add element", example: "seen.add(5)" },
        {
          syntax: "s.discard(x) / remove(x)",
          what: "Remove (safe / KeyError)",
          example: "seen.discard(5)",
        },
        { syntax: "x in s", what: "Membership O(1) avg", example: "if 5 in seen: ..." },
        { syntax: "a | b", what: "Union", example: "{1, 2} | {2, 3} # {1,2,3}" },
        { syntax: "a & b", what: "Intersection", example: "{1, 2} & {2, 3} # {2}" },
        { syntax: "a - b", what: "Difference", example: "{1, 2} - {2} # {1}" },
        { syntax: "a ^ b", what: "Symmetric difference", example: "{1, 2} ^ {2, 3} # {1,3}" },
        { syntax: "frozenset(it)", what: "Immutable (hashable) set", example: "frozenset([1, 2])" },
      ],
    },
    {
      title: "Tuples and unpacking",
      rows: [
        { syntax: "t = (1, 2)  1, 2", what: "Tuple (immutable)", example: "point = (3, 4)" },
        { syntax: "a, b = t", what: "Unpack", example: "x, y = point" },
        { syntax: "a, b = b, a", what: "Swap", example: "a, b = b, a" },
        { syntax: "first, *rest = a", what: "Star unpacking", example: "head, *tail = [1, 2, 3]" },
        {
          syntax: "t.count(x) / t.index(x)",
          what: "Count / find",
          example: "(1, 1, 2).count(1) # 2",
        },
        {
          syntax: "namedtuple('P', 'x y')",
          what: "Named fields",
          example: "P = namedtuple('P', 'x y')",
        },
      ],
    },
    {
      title: "Loops, range, enumerate, zip",
      rows: [
        { syntax: "for x in it:", what: "Iterate values", example: "for x in nums: ..." },
        {
          syntax: "range(n)  range(a, b)  range(a, b, step)",
          what: "Integer sequence",
          example: "for i in range(5): ...",
        },
        {
          syntax: "enumerate(it, start=0)",
          what: "Index + value",
          example: "for i, x in enumerate(a): ...",
        },
        { syntax: "zip(a, b)", what: "Pair up iterables", example: "for x, y in zip(a, b): ..." },
        {
          syntax: "reversed(seq)",
          what: "Iterate backwards",
          example: "for x in reversed(a): ...",
        },
        {
          syntax: "sorted(it, key=, reverse=)",
          what: "Sorted iterator (new list)",
          example: "for x in sorted(a): ...",
        },
        { syntax: "while cond:", what: "Loop until false", example: "while n > 0: n -= 1" },
        {
          syntax: "break / continue / else",
          what: "Exit / skip / no-break",
          example: "for x in a:\n    if x: break\nelse: ...",
        },
      ],
    },
    {
      title: "Functions (args, kwargs, lambda)",
      rows: [
        {
          syntax: "def f(a, b=1):",
          what: "Define with a default",
          example: "def add(a, b=0): return a + b",
        },
        {
          syntax: "def f(*args):",
          what: "Any positional args (tuple)",
          example: "def f(*args): return sum(args)",
        },
        {
          syntax: "def f(**kwargs):",
          what: "Any keyword args (dict)",
          example: "def f(**kw): return kw",
        },
        {
          syntax: "f(*list, **dict)",
          what: "Spread when calling",
          example: "f(*[1, 2], **{'c': 3})",
        },
        {
          syntax: "lambda x: expr",
          what: "Inline anonymous function",
          example: "key = lambda p: p[1]",
        },
        {
          syntax: "def f(a, /, b, *, c):",
          what: "Positional-only / keyword-only",
          example: "def f(x, *, verbose=False): ...",
        },
        {
          syntax: "return a, b",
          what: "Return multiple (as tuple)",
          example: "def mm(a): return min(a), max(a)",
        },
        {
          syntax: "def f(a: int) -> int:",
          what: "Type hints (not enforced)",
          example: "def sq(x: int) -> int: return x*x",
        },
      ],
    },
    {
      title: "Sorting",
      rows: [
        { syntax: "sorted(it)", what: "New sorted list", example: "sorted([3, 1, 2]) # [1,2,3]" },
        { syntax: "a.sort()", what: "Sort list in place", example: "a.sort()" },
        {
          syntax: "key=lambda x: ...",
          what: "Sort by a derived value",
          example: "sorted(words, key=len)",
        },
        { syntax: "reverse=True", what: "Descending", example: "sorted(a, reverse=True)" },
        {
          syntax: "key=lambda p: (p[0], -p[1])",
          what: "Multi-key sort",
          example: "sorted(pts, key=lambda p: (p[0], -p[1]))",
        },
        {
          syntax: "from operator import itemgetter",
          what: "Fast key by index/field",
          example: "sorted(a, key=itemgetter(1))",
        },
        { syntax: "min/max(it, key=)", what: "Extreme by a key", example: "max(words, key=len)" },
      ],
    },
    {
      title: "collections and itertools",
      rows: [
        {
          syntax: "Counter(it)",
          what: "Count hashable items",
          example: "Counter([1, 1, 2]) # {1:2, 2:1}",
        },
        {
          syntax: "c.most_common(n)",
          what: "Top-n (item, count) pairs",
          example: "Counter(s).most_common(1)",
        },
        {
          syntax: "defaultdict(list)",
          what: "Auto default for new keys",
          example: "d = defaultdict(list); d[k].append(v)",
        },
        {
          syntax: "defaultdict(int)",
          what: "Counting without get",
          example: "d = defaultdict(int); d[k] += 1",
        },
        { syntax: "deque()", what: "Fast pops/appends both ends", example: "q = deque([1, 2])" },
        {
          syntax: "dq.append/appendleft(x)",
          what: "Push right / left",
          example: "q.appendleft(0)",
        },
        { syntax: "dq.popleft() / pop()", what: "Pop left / right", example: "q.popleft()" },
        {
          syntax: "heapq.heappush(h, x)",
          what: "Push onto min-heap",
          example: "heapq.heappush(h, 3)",
        },
        {
          syntax: "heapq.heappop(h)",
          what: "Pop smallest",
          example: "smallest = heapq.heappop(h)",
        },
        {
          syntax: "heapq.nlargest(n, it, key=)",
          what: "Top n without full sort",
          example: "heapq.nlargest(3, nums)",
        },
        {
          syntax: "itertools.product / permutations / combinations",
          what: "Combinatorics",
          example: "list(permutations([1, 2]))",
        },
        {
          syntax: "itertools.accumulate(it)",
          what: "Running totals",
          example: "list(accumulate([1, 2, 3])) # [1,3,6]",
        },
        {
          syntax: "itertools.groupby(it, key)",
          what: "Group consecutive (pre-sort!)",
          example: "groupby(sorted(a))",
        },
      ],
      combos: [
        {
          label: "Group items by a key",
          code: `from collections import defaultdict

groups = defaultdict(list)
for word in words:
    groups[len(word)].append(word)   # {3: [...], 4: [...]}

# max-heap via negation (heapq is min-only)
import heapq
h = []
heapq.heappush(h, -value)
largest = -heapq.heappop(h)`,
        },
      ],
    },
    {
      title: "Comprehensions and generators",
      rows: [
        {
          syntax: "[f(x) for x in it if cond]",
          what: "List comprehension",
          example: "[x*x for x in a if x > 0]",
        },
        {
          syntax: "{k: v for ... }",
          what: "Dict comprehension",
          example: "{x: x*x for x in range(3)}",
        },
        { syntax: "{x for x in it}", what: "Set comprehension", example: "{x % 3 for x in a}" },
        {
          syntax: "(x for x in it)",
          what: "Generator (lazy, memory-light)",
          example: "gen = (x*x for x in a)",
        },
        {
          syntax: "sum(x for x in it)",
          what: "Generator into a builtin",
          example: "sum(x*x for x in nums)",
        },
        {
          syntax: "yield x",
          what: "Generator function",
          example: "def f():\n    yield 1\n    yield 2",
        },
        { syntax: "next(gen, default)", what: "Pull one value", example: "next(gen, None)" },
      ],
    },
    {
      title: "Useful builtins",
      rows: [
        {
          syntax: "map(fn, it)",
          what: "Apply fn to each (lazy)",
          example: "list(map(str, [1, 2]))",
        },
        {
          syntax: "filter(pred, it)",
          what: "Keep matching (lazy)",
          example: "list(filter(lambda x: x > 0, a))",
        },
        { syntax: "sum(it, start=0)", what: "Add up", example: "sum([1, 2, 3]) # 6" },
        { syntax: "min(it) / max(it)", what: "Extremes", example: "min([3, 1, 2]) # 1" },
        {
          syntax: "any(it) / all(it)",
          what: "Any true / all true",
          example: "all(x > 0 for x in a)",
        },
        {
          syntax: "abs(x) / round(x, n)",
          what: "Magnitude / round",
          example: "round(3.14159, 2) # 3.14",
        },
        {
          syntax: "divmod(a, b)",
          what: "Quotient and remainder",
          example: "divmod(17, 5) # (3, 2)",
        },
        { syntax: "int(x) / float(x) / str(x)", what: "Convert types", example: 'int("42") # 42' },
        { syntax: "isinstance(x, T)", what: "Type check", example: "isinstance(x, int)" },
        {
          syntax: "range / list / tuple / set / dict",
          what: "Build a collection",
          example: "list(range(3)) # [0,1,2]",
        },
      ],
    },
    {
      title: "File I/O",
      rows: [
        {
          syntax: "with open(path) as f:",
          what: "Open, auto-close",
          example: 'with open("in.txt") as f: ...',
        },
        {
          syntax: 'open(path, "r"/"w"/"a")',
          what: "Read / write / append mode",
          example: 'open("out.txt", "w")',
        },
        {
          syntax: "f.read() / f.readlines()",
          what: "Whole file / list of lines",
          example: "text = f.read()",
        },
        {
          syntax: "for line in f:",
          what: "Iterate lines (memory-light)",
          example: "for line in f: print(line.rstrip())",
        },
        { syntax: "f.write(s)", what: "Write a string", example: 'f.write("hello\\n")' },
        {
          syntax: "path.read_text() (pathlib)",
          what: "One-shot read",
          example: 'Path("in.txt").read_text()',
        },
        {
          syntax: "json.load(f) / json.dump(obj, f)",
          what: "Read / write JSON",
          example: "data = json.load(f)",
        },
      ],
    },
  ],
};
