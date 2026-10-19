# Plan: DSA (Java) rebuild from the reference (19-10-2026)

Phase 3, rebuild mode (CLAUDE.md 3.8.7). Reference: `reference/dsa.md` (owner input, not a source; 47 sections on data structures).
The owner also asked for two extra parts: **tricks** to solve problems, and **patterns** that solve most problems, in an easy-to-remember form.
Owner's note in CLAUDE.md: no repeated content, every fact in the one place it belongs, and not lengthy.

Baseline: **Java 25** (current LTS; JDK 27 is the latest release, GA 15-09-2026, checked on openjdk.org). Code uses only APIs in Java 17+.
Java only (`codeLanguages: [java]`). Accent: violet (unchanged).

## Why a rebuild

The existing DSA content (30 concepts, 17-10-2026, and 9 Java-basics concepts added later) is generic: many points and traps are
template lines ("preserve the invariant") rather than facts about the structure, there are no comparisons and only 8 glossary terms.
The rebuild keeps the topic idea and the Java focus and writes real, sourced content.

## Shape (smaller than Spring Boot, on purpose)

- 50 concepts, each one idea; whole file ≤ 550 words. 1–3 primary sources plus at most one interview-prep page.
- Tree: 2–6 children per concept, about 300 nodes. Comparisons: 25. Glossary: about 170 terms. Story spine: about 14 steps.
- Patterns share one shape: "when you see <clue>, do <move>", the cost, the classic problems and a template in Java.

## Topics (8) and concepts (50)

| #   | Topic                            | Concepts                                                                                                                                                                                                                                 |
| --- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Foundations                      | data-structures, big-o, java-collections                                                                                                                                                                                                 |
| 2   | Arrays, Strings and Hashing      | arrays, dynamic-array, strings, hashing, hashmap-hashset, ordered-maps-sets                                                                                                                                                              |
| 3   | Linked Lists, Stacks and Queues  | linked-list, stack, queue-and-deque                                                                                                                                                                                                      |
| 4   | Trees, Heaps and Tries           | tree-basics, tree-traversals, binary-search-tree, balanced-trees, heap-priority-queue, trie                                                                                                                                              |
| 5   | Graphs                           | graph-basics, bfs, dfs, topological-sort, shortest-paths, union-find, minimum-spanning-tree                                                                                                                                              |
| 6   | Recursion, Searching and Sorting | recursion, binary-search, sorting-basics, merge-sort, quick-sort                                                                                                                                                                         |
| 7   | Problem Patterns                 | spotting-the-pattern, two-pointers, fast-slow-pointers, sliding-window, prefix-sum, frequency-counting, monotonic-stack, binary-search-on-answer, top-k-heap, merge-intervals, grid-traversal, backtracking, dynamic-programming, greedy |
| 8   | Problem-Solving Tricks           | problem-solving-steps, constraints-to-complexity, choosing-a-data-structure, edge-cases, java-pitfalls, bit-manipulation                                                                                                                 |

Comparisons (25): comparable-vs-comparator, string-vs-stringbuilder, chaining-vs-open-addressing, hashmap-vs-hashset, hashmap-vs-linkedhashmap-vs-treemap, hashset-vs-linkedhashset-vs-treeset, array-vs-arraylist, array-vs-linked-list, stack-vs-queue, depth-vs-height, full-vs-complete-vs-perfect, traversal-orders, binary-tree-vs-bst, avl-vs-red-black, heap-vs-bst, adjacency-list-vs-matrix, bfs-vs-dfs, dijkstra-vs-bellman-ford, kruskal-vs-prim, recursion-vs-iteration, linear-vs-binary-search, merge-sort-vs-quick-sort, two-pointers-vs-sliding-window, memoisation-vs-tabulation, dp-vs-greedy

Decisions taken (owner can overrule, see OPEN_QUESTIONS.md section F):

- The Java-basics concepts (values, control flow, methods, OOP, input) are folded away: what matters in a coding round moves to
  `java-collections`, `strings` and `java-pitfalls`. Teaching Java syntax is out of scope for a revision site.
- Added beyond the reference: strings, topological sort, shortest paths, minimum spanning tree, the pattern topic (two pointers,
  fast/slow pointers, sliding window, prefix sum, monotonic stack, binary search on the answer, top K, intervals, grid BFS/DFS,
  backtracking, dynamic programming, greedy) and the tricks topic.

## Ownership (each fact once)

- Costs of a structure live in its own concept; patterns and the "choosing" table link to them.
- Hash table theory: `hashing`; Java specifics: `hashmap-hashset`; counting idioms in problems: `frequency-counting`.
- Heap structure and `PriorityQueue` API: `heap-priority-queue`; top K and k-way merge: `top-k-heap`.
- BFS/DFS algorithms: graphs topic; grid flood fill and multi-source BFS: `grid-traversal`.
- Binary search template: `binary-search`; searching a range of answers: `binary-search-on-answer`.
- Clue → pattern table: `spotting-the-pattern`; need → structure table: `choosing-a-data-structure`; input size → complexity: `constraints-to-complexity`.

## Story spine

From "store data" (arrays, hashing) → "order of access" (lists, stacks, queues) → "hierarchy" (trees, heaps, tries) → "connections"
(graphs) → "core algorithms" (recursion, search, sort) → "patterns" → "tricks to get it right in the room".

## Process

1. Nine drafting units in parallel (patterns split in two), each from its reference items, primary sources and the scope notes.
   Each unit passes the real validator in isolation and logs coverage rows and a claim log.
2. Merge, validate, commit.
3. Independent verification pass by different agents (4.8). Fix, validate, commit.
4. Close `reference/dsa.coverage.md`, update `OPEN_QUESTIONS.md`, run all quality gates, final report.
