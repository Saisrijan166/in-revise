# DSA with Java — Cheat Sheet

Idea-level revision for data-structure and algorithm interviews: what each structure is, when to use it, its operations and Big-O, the core algorithm patterns with tiny Java templates, and the comparisons interviewers ask.

---

# Complexity

## Big-O — how to reason ⭐⭐⭐

Big-O describes how work grows as input `n` grows. It is about the shape of growth, not exact counts.

| Big-O | Name | Typical example |
|---|---|---|
| `O(1)` | Constant | Array access by index |
| `O(log n)` | Logarithmic | Binary search |
| `O(n)` | Linear | Linear search |
| `O(n log n)` | Linearithmic | Merge sort |
| `O(n²)` | Quadratic | Bubble sort |
| `O(2ⁿ)` | Exponential | Subset recursion |
| `O(n!)` | Factorial | Brute-force permutations |

Growth order (slowest-growing first): `O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)`.

Simplify by dropping constants and lower terms: `O(2n) → O(n)`, `O(5n²) → O(n²)`, `O(n + n²) → O(n²)`.

> Remember: ignore constants and keep only the fastest-growing term.

## Space complexity

Memory the algorithm uses. **Input space** (the given data) is separate from **auxiliary space** (extra memory the algorithm allocates). In interviews "space complexity" usually means auxiliary space.

> Remember: an in-place algorithm uses O(1) auxiliary space and edits the input directly.

---

# Linear Structures

## Array ⭐⭐

Elements in **contiguous memory**, so the address of any index is computed directly: `address = base + index × size`. That is why random access is O(1).

| Operation | Big-O |
|---|---|
| Access / update by index | O(1) |
| Search | O(n) |
| Insert / delete at middle or start | O(n) |
| Insert at end (space available) | O(1) |

- Strengths: fast indexing, cache-friendly, low overhead.
- Weaknesses: middle insert/delete shifts elements; fixed size cannot grow; needs contiguous memory.

> Remember: array access is O(1), but array *search* is O(n).

## Dynamic Array / ArrayList ⭐

An array that resizes itself. When full, it creates a larger array and copies elements over.

- `get`/`set`: O(1). `add` at end: **amortized O(1)**. Insert/remove in middle: O(n).
- **Amortized O(1)**: most appends are O(1); the occasional O(n) resize, spread over many appends, averages to O(1).

> Remember: `ArrayList` is the default list unless you specifically need linked-list behaviour.

## Linked List ⭐

Nodes connected by references. **Singly**: each node is `[data | next]`. **Doubly**: `[prev | data | next]`, so you can walk both ways and delete a known node easily.

| Operation | Big-O |
|---|---|
| Access by index / search | O(n) |
| Insert at head / delete head | O(1) |
| Insert/delete at a *known* node | O(1) |

> Remember: linked-list insertion is O(1) only when you already have the position — *finding* it is O(n).

## Stack ⭐

**LIFO** — last in, first out. `push`, `pop`, `peek`, `isEmpty` are all O(1).

Uses: function call stack, undo/redo, parentheses matching, expression evaluation, DFS, backtracking.

```java
Deque<Integer> stack = new ArrayDeque<>();
stack.push(x);
stack.pop();   // remove + return top
stack.peek();  // view top
```

> Remember: prefer `ArrayDeque` as a stack over the legacy `Stack` class. Overflow = too-deep recursion; underflow = pop on empty.

## Queue ⭐

**FIFO** — first in, first out. `enqueue` (rear), `dequeue` (front), `peek` are O(1).

Uses: BFS, scheduling, task/message processing, producer-consumer.

```java
Queue<Integer> q = new LinkedList<>();
q.offer(x);  // insert at rear
q.poll();    // remove + return front
q.peek();    // view front
```

## Deque

Double-ended queue: insert and remove at **both ends**, all O(1). Backed by `ArrayDeque`.

Uses: sliding-window maxima (monotonic queue), BFS variants, implementing a stack or queue.

```java
Deque<Integer> dq = new ArrayDeque<>();
dq.addFirst(x); dq.addLast(x);
dq.pollFirst(); dq.pollLast();
```

---

# Hashing

## Hash Table ⭐⭐

Stores `key → value`. A **hash function** maps a key to a bucket index, giving average O(1) insert, search and delete. Worst case is O(n) when many keys collide.

> Remember: HashMap is *average* O(1), not guaranteed O(1).

## Hash Collision

Two keys map to the same bucket. Handled by:

- **Separate chaining** — each bucket holds a list (or tree) of entries.
- **Open addressing** — probe for another free slot (linear probing, quadratic probing, double hashing).

## HashMap and HashSet (Java) ⭐⭐

- `HashMap<K,V>`: key-value, average O(1), one null key allowed, many null values, **no order guarantee**, not synchronized.
- `HashSet<E>`: unique values only, backed internally by a HashMap.

| HashMap | HashSet |
|---|---|
| Key-value | Values only |
| `put(k,v)` / `get(k)` | `add(x)` / `contains(x)` |

> Remember: never rely on HashMap/HashSet iteration order.

---

# Trees

## Tree terminology ⭐

Hierarchical structure of nodes. **Root** (top), **parent/child**, **leaf** (no children), **sibling** (same parent). **Depth** = distance from root down to a node; **height** = longest path from a node down to a leaf.

> Remember: depth is measured from the root; height is measured toward the deepest leaf.

## Binary Tree vs BST ⭐⭐⭐

- **Binary tree**: every node has at most two children (`left`, `right`). No ordering.
- **Binary Search Tree (BST)**: `left subtree < node < right subtree` for every node, enabling ordered search.

| Balanced BST | Big-O | Worst case (skewed) |
|---|---|---|
| Search / insert / delete | O(log n) | O(n) |

A skewed BST degenerates into a linked list, so operations fall to O(n).

> Remember: a binary tree is not a BST, and a plain BST is not guaranteed O(log n).

## BST traversals ⭐⭐

- **Inorder** (Left → Root → Right): on a BST this yields **sorted order** — a classic interview fact.
- **Preorder** (Root → Left → Right): serialising / copying a tree.
- **Postorder** (Left → Right → Root): deleting a tree, bottom-up work.
- **Level order** (level by level): uses a **Queue** (BFS on the tree).

## Balanced and special trees

Balancing keeps height ≈ log n, so operations stay O(log n) instead of sliding to O(n). **AVL** and **Red-Black** trees are self-balancing BSTs.

Tree shapes:
- **Complete**: all levels full except possibly the last, filled left to right (used by binary heaps).
- **Full**: every node has 0 or 2 children.
- **Perfect**: all internal nodes have 2 children and all leaves are on the same level.

---

# Heap and Priority Queue

## Heap ⭐⭐

A **complete binary tree** with the heap property. **Min heap**: parent ≤ children (min at root). **Max heap**: parent ≥ children (max at root).

| Operation | Big-O |
|---|---|
| Peek min/max | O(1) |
| Insert / remove root | O(log n) |
| Build heap | O(n) |
| Search arbitrary element | O(n) |

> Remember: a heap is not sorted — only the parent-child relationship holds.

## Priority Queue ⭐

Processes elements by priority, not arrival order. Java's `PriorityQueue` is a **min heap** by default.

```java
PriorityQueue<Integer> min = new PriorityQueue<>();
PriorityQueue<Integer> max = new PriorityQueue<>(Comparator.reverseOrder());
// peek O(1), offer/poll O(log n)
```

Uses: top-K, Kth largest/smallest, Dijkstra, scheduling, running median, merge K sorted lists.

---

# Graphs

## Graph basics ⭐

Vertices (nodes) + edges. Edges can be **directed/undirected**, **weighted/unweighted**; a graph can be **cyclic/acyclic**.

## Representation ⭐⭐

| | Adjacency Matrix | Adjacency List |
|---|---|---|
| Edge lookup | O(1) | O(degree) |
| Space | O(V²) | O(V + E) |
| Best for | Dense graphs | Sparse graphs |

Sparse means `E ≈ V` (use a list); dense means `E ≈ V²` (a matrix is reasonable).

> Remember: most interview graph problems use an adjacency list.

## BFS ⭐⭐

Breadth-First Search explores level by level using a **Queue**. O(V + E) with an adjacency list.

```java
Queue<Integer> q = new LinkedList<>();
q.offer(start); visited.add(start);
while (!q.isEmpty()) {
    int node = q.poll();
    for (int nb : adj.get(node))
        if (visited.add(nb)) q.offer(nb);
}
```

> Remember: on an **unweighted** graph, BFS gives the shortest path (fewest edges). It does **not** on weighted graphs.

## DFS ⭐⭐

Depth-First Search goes as deep as possible before backtracking, using **recursion or a stack**. O(V + E).

```java
void dfs(int node) {
    visited.add(node);
    for (int nb : adj.get(node))
        if (!visited.contains(nb)) dfs(nb);
}
```

Uses: cycle detection, connected components, path finding, topological sort, backtracking, maze problems.

> Remember: DFS = stack/recursion; BFS = queue. DFS does not give a shortest path in general.

---

# Specialized Structures

## Trie ⭐

A tree keyed by characters, built for **string prefixes**. For a word of length `L`, insert / search / prefix-search are all O(L).

Uses: autocomplete, dictionary lookups, prefix matching, spell checking.

## Union-Find (Disjoint Set) ⭐

Tracks which elements belong to the same group. Two operations: `find(x)` (which group) and `union(a, b)` (merge groups).

Optimisations: **path compression** (flatten the tree on find) and **union by rank/size** (attach smaller under larger). Together they give near-constant **O(α(n))** amortised (inverse Ackermann).

Uses: cycle detection, connected components, Kruskal's MST, network connectivity.

---

# Sorting and Searching

## Sorting algorithms ⭐⭐

| Algorithm | Best | Average | Worst | Stable |
|---|---|---|---|---|
| Bubble | O(n) | O(n²) | O(n²) | Yes |
| Selection | O(n²) | O(n²) | O(n²) | No |
| Insertion | O(n) | O(n²) | O(n²) | Yes |
| Merge | O(n log n) | O(n log n) | O(n log n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | No |
| Heap | O(n log n) | O(n log n) | O(n log n) | No |

- **Stable** = equal elements keep their relative order (matters when sorting by one field repeatedly).
- **Merge vs Quick**: merge is stable and guaranteed O(n log n) but needs O(n) extra space; quick sorts in place and is usually faster but has an O(n²) worst case on bad pivots.
- **Heap sort**: guaranteed O(n log n), in place, not stable.

## Linear vs Binary Search ⭐⭐

- **Linear search**: check elements one by one, O(n), works on sorted or unsorted data.
- **Binary search**: repeatedly halve the search space, O(log n), but needs **sorted data or a monotonic condition**.

```java
int left = 0, right = arr.length - 1;
while (left <= right) {
    int mid = left + (right - left) / 2;      // avoids overflow
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
}
```

> Remember: binary search is not valid on arbitrary unsorted data — you need order or a monotonic answer.

---

# Recursion

A function that calls itself. Each call adds a **stack frame**; too much depth causes a **stack overflow**.

Every recursion needs: a **base case**, a **recursive case**, and **progress toward the base case**.

> Remember: without progress to a base case, recursion never terminates and overflows the stack.

---

# Problem Patterns

Patterns matter more than memorising individual problems.

## Two Pointers

Two indices moving through data, often from both ends. Use for sorted arrays, pair sums, palindromes, removing duplicates.

```java
int l = 0, r = arr.length - 1;
while (l < r) { /* compare / move */ l++; r--; }
```

## Sliding Window

A moving sub-range over an array/string. Use for subarray/substring problems, longest/shortest range, fixed or variable windows. Typically O(n).

## Monotonic Stack

A stack kept in increasing or decreasing order. Use for Next Greater/Smaller Element, stock span, largest rectangle in histogram. O(n) because each element is pushed and popped at most once.

## Frequency Map

A HashMap of counts. Use for counting, duplicates, Two Sum, anagrams.

```java
map.put(x, map.getOrDefault(x, 0) + 1);
```

## Backtracking (DFS)

Explore choices, recurse, undo. Use for combinations, permutations, subsets, mazes, N-Queens — any decision/exploration problem.

## Binary Search on Answer

Binary-search the *answer space* when the feasibility check is **monotonic** ("minimum/maximum possible X"). No array to search — just a yes/no condition that flips once.

## Dynamic Programming ⭐⭐

Break a problem into overlapping subproblems and reuse results. A DP has a **state**, a **transition**, and a **base case**.

Signals: overlapping subproblems, optimal substructure, "how many ways…", "max/min number of…".

> Remember: DP reuses subproblem answers; greedy commits to a local best at each step without revisiting.

---

# Choosing a Data Structure

| Requirement | Best choice |
|---|---|
| Fast index access | Array / ArrayList |
| Frequent insert at the beginning | LinkedList / Deque |
| LIFO | Stack / Deque |
| FIFO | Queue / Deque |
| Fast key lookup | HashMap |
| Unique values | HashSet |
| Sorted unique values | TreeSet |
| Sorted key-value pairs | TreeMap |
| Repeated min/max | Heap / PriorityQueue |
| Hierarchy | Tree |
| Ordered search | BST |
| Prefix / string search | Trie |
| Relationships / networks | Graph |
| Connectivity / group merging | Union-Find |

## Complexity master table

| Structure | Access | Search | Insert | Delete |
|---|---|---|---|---|
| Array | O(1) | O(n) | O(n) | O(n) |
| ArrayList | O(1) | O(n) | O(1)* | O(n) |
| Linked List | O(n) | O(n) | O(1)** | O(1)** |
| Stack / Queue | O(1) end | O(n) | O(1) | O(1) |
| HashMap / HashSet | — | O(1)* | O(1)* | O(1)* |
| BST (balanced) | O(log n)* | O(log n)* | O(log n)* | O(log n)* |
| Heap | O(1) root | O(n) | O(log n) | O(log n) |
| Trie | — | O(L) | O(L) | O(L) |

`*` average/amortised  `**` if the node/position is known

---

# Java Coding Toolkit

The methods that come up in coding rounds. Group them by structure.

## Strings and StringBuilder ⭐⭐

```java
s.length(); s.charAt(i); s.substring(a, b);
s.indexOf("x"); s.contains("x"); s.equals("x");
s.split(" "); s.toCharArray(); s.replace("a", "b");
s.toUpperCase(); s.trim();

StringBuilder sb = new StringBuilder();
sb.append("x"); sb.insert(i, "x"); sb.deleteCharAt(i);
sb.reverse(); sb.toString();
```

> Remember: strings are immutable — build up text with `StringBuilder`, not `+` in a loop.

## Arrays and Collections

```java
Arrays.sort(arr); Arrays.fill(arr, v); Arrays.toString(arr);
Arrays.copyOfRange(arr, s, e); Arrays.binarySearch(arr, key);

Collections.sort(list); Collections.reverse(list);
Collections.max(list); Collections.min(list);
Collections.frequency(list, x);
```

## List, Set, Map ⭐⭐⭐

```java
list.add(x); list.get(i); list.set(i, v);
list.remove(i);                 // by index
list.remove(Integer.valueOf(x)); // by value
list.contains(x); list.size();

set.add(x); set.contains(x); set.remove(x);
set.addAll(b);    // union
set.retainAll(b); // intersection
set.removeAll(b); // difference

map.put(k, v); map.get(k); map.getOrDefault(k, 0);
map.containsKey(k); map.putIfAbsent(k, v);
map.computeIfAbsent(k, x -> new ArrayList<>());
for (Map.Entry<K,V> e : map.entrySet()) { e.getKey(); e.getValue(); }
```

## Comparators and conversions

```java
list.sort(Comparator.comparing(Employee::getSalary).reversed());
list.sort(Comparator.comparing(Employee::getDept)
                    .thenComparing(Employee::getSalary));

Integer.parseInt("123"); String.valueOf(123);
int d = c - '0';           // char digit -> int
char c = (char) ('0' + d); // int -> char digit
Math.max(a, b); Math.min(a, b); Math.abs(x);
Integer.MAX_VALUE; Integer.MIN_VALUE;
Character.isDigit(c); Character.isLetter(c);
```

> Remember: a handful of calls cover most problems — `getOrDefault`, `put`, `containsKey`, `entrySet`; `add`/`get`/`set`/`size`; `offer`/`poll`/`peek`; `push`/`pop`/`peek`; `Arrays.sort`/`Collections.sort`.

---

# Common "Why X vs Y?" Comparisons

## Array vs Linked List ⭐⭐

| Array | Linked List |
|---|---|
| Contiguous memory | Scattered nodes |
| Access O(1) | Access O(n) |
| Middle insert O(n) | O(1) at a known node |
| Better cache locality | Extra pointer overhead |

> Remember: array for fast indexing; linked list for cheap insert/delete at known positions.

## ArrayList vs LinkedList ⭐

| | ArrayList | LinkedList |
|---|---|---|
| Backing | Dynamic array | Doubly linked list |
| get(index) | O(1) | O(n) |
| Add at beginning | O(n) | O(1) |
| Random access | Excellent | Poor |

> Remember: default to ArrayList unless you need frequent head insert/delete.

## HashMap vs TreeMap vs LinkedHashMap ⭐⭐

| | HashMap | LinkedHashMap | TreeMap |
|---|---|---|---|
| Order | None | Insertion/access | Sorted by key |
| Lookup | O(1) avg | O(1) avg | O(log n) |
| Backing | Hash table | Hash table + list | Red-Black tree |

> Remember: HashMap = fast, LinkedHashMap = fast + order, TreeMap = sorted.

## HashSet vs TreeSet vs LinkedHashSet

Same trade-off as the maps: HashSet = uniqueness (O(1)), LinkedHashSet = uniqueness + insertion order, TreeSet = uniqueness + sorted (O(log n)).

## Stack vs Queue

Stack is **LIFO** (last in first out, → DFS); Queue is **FIFO** (first in first out, → BFS).

## BFS vs DFS ⭐⭐

| BFS | DFS |
|---|---|
| Queue | Stack / recursion |
| Explores level by level | Explores deep first |
| Shortest path (unweighted) | Not necessarily shortest |
| More memory on wide graphs | More memory on deep graphs |

## Heap vs BST

Both give ordered access, but a heap only guarantees the min/max at the root (O(1) peek) and is not sorted; a BST keeps full ordering and supports O(log n) search of any element (when balanced).

## DP vs Greedy ⭐

Greedy makes a locally optimal choice at each step and never looks back — fast but only correct when local choices lead to a global optimum. DP explores overlapping subproblems and reuses their answers — correct for more problems but costs more time and space.

> Remember: greedy commits; DP reconsiders by reusing subproblem results.

## Adjacency List vs Matrix

List: O(V + E) space, cheap for sparse graphs, slower edge lookup. Matrix: O(V²) space, O(1) edge lookup, fine for dense graphs.

## Interview traps ⭐⭐

- Array search is O(n), not O(1).
- Linked-list insertion is O(1) only at a known node (finding it is O(n)).
- BST search is O(log n) only when balanced — skewed is O(n).
- HashMap is average O(1), worst case O(n).
- A heap is not fully sorted.
- BFS gives a shortest path only on unweighted graphs.
- DFS uses a stack/recursion, not a queue.
- A binary tree is not a BST.
