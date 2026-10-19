# Coverage: DSA with Java
Reference: reference/dsa.md  ·  Last updated: 19-10-2026

Every numbered section (1–47) and every sub-item that carries its own claim (the 11 "cannot" rules of section 34, the 8 traps of
section 35, the 9 "why" answers of section 44, the 9 pattern blocks of section 40, the 6 terms of section 42 and the 20 questions of
section 46) appears in exactly one of Mapped, Corrected or Dropped. Baseline for corrections: Java 25 (LTS) and the primary
algorithm sources named in each row.

## Mapped
| Reference item (number + short title) | Landed in | Note |
|---|---|---|
| 1. Big Picture (definition, categories, static vs dynamic) | concept data-structures (hook, points, family table); tree nodes linear/non-linear/hash-based/static/dynamic-data-structure | Hash-based kept as its own family, with a note that some books file it under non-linear |
| 2. Big-O (growth table, ignore constants, space vs auxiliary space) | concept big-o (growth table, points, trap, Interview Qs); glossary auxiliary-space, space-complexity | "Ignore constants" widened to "drop constants and smaller terms"; the reference already shows n + n² becoming n² |
| 4. Dynamic Array / ArrayList | concept dynamic-array (Steps, points, Interview Q on amortised O(1)); tree amortised-append, arraylist-resize |  |
| 6. Stack (LIFO, ops, uses, Java Deque, overflow/underflow) | concept stack (points, table of uses, overflow/underflow bullets and Interview Q, trap) | "Undo/Redo" and "Backtracking" uses left out (no primary source opened; backtracking owns its own concept); browser back button and Dijkstra's two-stack evaluation used instead (algs4) |
| 8. Deque (both ends, uses) | concept queue-and-deque (point "Deque"); tree deque, arraydeque; relation sliding-window uses deque | "Typically O(1)" made precise: ArrayDeque is amortised O(1) |
| 9. Hash Table | concept hashing (hook, points, diagram) | Worst case O(n) kept as general theory; OpenJDK's O(log n) bucket trees noted in hashmap-hashset |
| 10. Hash Collision | concept hashing (points, Interview Q); comparison chaining-vs-open-addressing; tree separate-chaining, open-addressing, linear/quadratic probing, double hashing |  |
| 11. HashMap in Java | concept hashmap-hashset (points: nulls, order, not synchronised) | "Conceptually backed by hashing" made exact: HashSet is backed by a HashMap instance (API doc) |
| 12. Tree (terminology, depth vs height) | concept tree-basics (diagram, points, trap); comparison depth-vs-height; glossary tree-root, leaf, subtree, tree-depth, tree-height | Sibling, parent, child kept in the How bullets; counted in edges |
| 13. Binary Tree (at most two children; binary tree ≠ BST) | tree node binary-tree; concept tree-basics (point) | The "≠ BST" line went to comparison binary-tree-vs-bst |
| 14. Binary Search Tree (rule, balanced vs skewed costs) | concept binary-search-tree (points, How, Interview Q) | Rule restated for whole subtrees |
| 16. Balanced Trees (AVL, red-black; why balance) | concept balanced-trees; comparison avl-vs-red-black | "height ≈ log n" stated as O(log n) (AVL and red-black heights are within a constant factor, e.g. red-black ≤ 2 lg n) |
| 17. Heap (min/max, costs, not sorted) | concept heap-priority-queue (points, diagram); tree nodes min-heap, max-heap, build-heap |  |
| 18. Priority Queue (Java min-heap, reverseOrder, costs, uses) | concept heap-priority-queue (Example, Defaults, points) | Uses: Top K and median → relation to top-k-heap (patterns-b owns them); Dijkstra → relation to shortest-paths; "scheduling" not repeated |
| 19. Graph (vertices + edges; directed, undirected, weighted, unweighted, cyclic, acyclic) | concept graph-basics (points, Why); tree graph-kinds and its 4 types; glossary vertex, graph-edge, graph-cycle | DAG added as a type |
| 20. Graph representation (adjacency matrix, adjacency list, "interview rule") | comparison adjacency-list-vs-matrix (embedded in graph-basics); graph-basics trap, Example, bullets | "Rule" reworded: interviews give an edge list or grid; build lists from it (TIH) |
| 21. BFS (queue, level by level, O(V + E), shortest path in edges for unweighted graphs) | concept bfs (Steps, points, Example, Interview Q) | Example tree drawing not used |
| 23. Trie (structure, O(L) insert/search/prefix, uses) | concept trie; tree nodes trie-node, trie-search, trie-starts-with, trie-autocomplete | "Prefix search O(L)" kept for startsWith only; collecting all words under a prefix also costs their output size (tree note "then collect all words below it"). "Spell checking" use not repeated |
| 26. Searching (linear search, binary search) | concept binary-search (table, code, points); comparison linear-vs-binary-search; tree node linear-search |  |
| 27. Recursion + data structures | concept recursion (diagram, points, trap, Interview Qs); glossary base-case, recursive-case, stack-frame, stackoverflowerror | Factorial idea kept in the diagram; own wording |
| 28. Common data structure relationships | concept choosing-a-data-structure (table "You need → Structure → Java"; tree node pick-by-structure; Interview Q on friendships/prerequisites) | Stack→DFS and Queue→BFS links belong to the bfs/dfs concepts of the graphs unit |
| 31. ArrayList vs LinkedList | comparison array-vs-linked-list (rows, verdict "default to an array or ArrayList"); point "Java LinkedList" | ArrayList growth details belong to dynamic-array |
| 33. HashSet vs TreeSet vs LinkedHashSet | comparison hashset-vs-linkedhashset-vs-treeset (embedded in ordered-maps-sets) | Added null-item row |
| 34. Important "cannot" rules (section) | split: each rule sits with its structure (rows 34.Array … 34.DFS) |  |
| 34.Array (cannot insert in middle without shifting) | concept arrays (point "Insert or delete in the middle", Interview Q) |  |
| 34.BFS. Does not guarantee shortest path in weighted graphs | bfs point "Weighted edges" (minus) |  |
| 34. Binary Search ("cannot" rule: not on unsorted data) | comparison linear-vs-binary-search (row "Needs sorted data"); concept binary-search (point "Needs"); glossary monotonic-condition |  |
| 34.BST (ordinary BST does not guarantee O(log n)) | concept balanced-trees (trap) |  |
| 34.DFS. Does not guarantee shortest path | dfs point "Not" (minus); bfs-vs-dfs row "Shortest path" |  |
| 34.HashMap (cannot rely on iteration order) | concept hashmap-hashset (point "Order") |  |
| 34.HashSet (cannot rely on ordering) | comparison hashset-vs-linkedhashset-vs-treeset (Iteration order row) |  |
| 34.Heap (cannot assume sorted) | concept heap-priority-queue (trap) |  |
| 34.Linked List (no O(1) index) | concept linked-list (point "Access, search"; Interview Q "Why is access O(n)?") |  |
| 34.Queue (no random access) | comparison stack-vs-queue (row "Ends used") |  |
| 34.Stack (no middle access) | concept stack (point "Search") |  |
| 35. Common interview traps (section) | split: each trap is the `trap` of its concept (rows 35.T1 … 35.T8) |  |
| T1. Array search is not O(1) | concept arrays (trap) |  |
| T2. Linked list insertion O(1) | concept linked-list (trap) | extended: singly list also needs the predecessor |
| T3. BST search = O(log n) only if balanced | concept binary-search-tree (point "Skewed", Interview Q) |  |
| T4. HashMap is not always O(1) | concept hashing (trap) |  |
| T5. Heap is sorted (wrong) | concept heap-priority-queue (trap, with the Java iterator fact) |  |
| T6. BFS always finds shortest path | bfs trap; bfs Interview Q "When does BFS fail" |  |
| T7. DFS uses queue | dfs trap |  |
| T8. Binary tree = BST is wrong | comparison binary-tree-vs-bst (embedded in binary-search-tree) |  |
| 36. Complexity master table | costs are points of each structure's own concept; the Cheat sheet page lists them in one place | One table would repeat every cost (owner: no repetition) |
| 38. Graph complexity cheat sheet | comparison adjacency-list-vs-matrix rows; bfs and dfs Cost points | V and E used throughout |
| 40. Must-Know Problem Patterns (intro: patterns over problems) | concept spotting-the-pattern (clue table, Interview Q) | Wording not copied; claim rephrased as "match the clue to a pattern" |
| 40. Binary Search (search space reduction, minimum / maximum possible X, binary search on answer needs a monotonic condition) | concept binary-search-on-answer (hook, points, table, trap); glossary monotonic-predicate | Sorted-array search itself is owned by search-sort/binary-search |
| 40. Dynamic Programming (state + transition + base case; overlapping subproblems, optimal substructure; "max / min number of", "how many ways") | concept dynamic-programming (Steps, points, Interview Q 1); glossary dp-state, dp-transition, overlapping-subproblems, optimal-substructure | Added "order" and "answer" steps (MIT SRT BOT) |
| 40. HashMap / Frequency Map (counting, duplicates, Two Sum, anagrams, fast lookup) | concept frequency-counting; tree `two-sum`, `valid-anagram`, `group-anagrams`, `contains-duplicate` | "Fast lookup" itself is owned by hashmap-hashset (linked) |
| 40. Heap (top K, kth largest / smallest, priority processing, merge K sorted lists) | concept top-k-heap (table, example, Interview Qs); tree kth-largest-element, top-k-frequent, merge-k-sorted-lists | "Priority processing" stays with trees/heap-priority-queue |
| 40. Queue (BFS, level-order, scheduling) | monotonic deque type here (`monotonic-queue`); BFS → bfs, level order → tree-traversals, scheduling → queue-and-deque (other units); concept grid-traversal (fewest steps point, multi-source-bfs, shortest-path-binary-maze) | Only the deque angle is a pattern; rest owned elsewhere Level-order and scheduling belong to other units |
| 40. Sliding Window (subarrays, substrings, longest/shortest, fixed/variable) | concept sliding-window; tree `fixed-size-window`, `variable-size-window`; comparison two-pointers-vs-sliding-window |  |
| 40. Stack (parentheses, next greater, monotonic stack, expression problems) | next greater / monotonic: concept monotonic-stack; parentheses and expressions: concept stack (linear unit) |  |
| 40. Two Pointers (sorted arrays, pairs, palindromes, removing duplicates) | concept two-pointers (table of 3 types, points, example); glossary `palindrome` |  |
| 42. Common special terms (section) | split: rows 42.In-place … 42.Perfect Binary Tree |  |
| 42. Complete Binary Tree | tree node complete-binary-tree; comparison full-vs-complete-vs-perfect; glossary | Heap link kept as a relation |
| 42. Full Binary Tree | tree node full-binary-tree; comparison full-vs-complete-vs-perfect; glossary | Verdict notes that some books swap "full" and "perfect" (NIST) |
| 42. In-place | glossary in-place-algorithm; concept sorting-basics (point) |  |
| 42. In-place ≠ Stable | concept sorting-basics (trap) |  |
| 42. Perfect Binary Tree | tree node perfect-binary-tree; comparison full-vs-complete-vs-perfect; glossary | Added the 2^(h+1) - 1 node count |
| 42. Stable | glossary stable-sort; concept sorting-basics (point, Interview Q, example) |  |
| 43. Very Important Tree Differences (table) | split: binary-tree-vs-bst, heap-vs-bst, avl-vs-red-black, tree nodes | Trie row went to concept trie |
| 44. Interview "why" answers (section) | split: each answer is the Why it exists / sayIt of its concept (rows 44.*) |  |
| W-ArrayList. Why use ArrayList? | concept dynamic-array (Interview Q "Why use ArrayList over an array?"); comparison array-vs-arraylist |  |
| W-Graph. Why use Graph? | graph-basics "Why it exists" |  |
| W-HashMap. Why use HashMap? | concept hashmap-hashset (Why it exists, sayIt) |  |
| W-HashSet. Why use HashSet? | comparison hashmap-vs-hashset (verdict) |  |
| W-Heap. Why use Heap? | concept heap-priority-queue (Why it exists) |  |
| W-LinkedList. Why use LinkedList? | comparison array-vs-linked-list (verdict) |  |
| W-Queue. Why use Queue? | queue-and-deque "Why it exists"; bfs relation to queue-and-deque | rest owned by linear unit |
| W-Stack. Why use Stack? | stack "Why it exists" |  |
| W-Trie. Why use Trie? | concept trie (Why it exists, Interview Q 2) |  |
| 46. 20 questions to be able to answer (section) | split: each is an Interview Q, sayIt or comparison (rows 46.Q1 … 46.Q20); also the hint for heat 3 |  |
| Q1. What is a data structure? | concept data-structures (Interview Q) |  |
| Q2. Array vs Linked List? | comparison array-vs-linked-list; linked-list Interview Q |  |
| Q3. Why is array access O(1)? | concept arrays (Interview Q, sayIt) |  |
| Q4. Why is linked-list access O(n)? | linked-list Interview Q |  |
| Q5. What is a stack? | stack Interview Q |  |
| Q6. What is a queue? | queue-and-deque hook, sayIt |  |
| Q7. Stack vs Queue? | comparison stack-vs-queue; queue-and-deque Interview Q |  |
| Q8. What is hashing? | concept hashing (Interview Q) |  |
| Q9. What is a collision? | concept hashing (Interview Q) |  |
| Q10. HashMap vs HashSet? | comparison hashmap-vs-hashset; concept hashmap-hashset (Interview Q) |  |
| Q11. What is a BST? | concept binary-search-tree (sayIt) |  |
| Q12. Binary Tree vs BST? | comparison binary-tree-vs-bst | tree-basics only names binary trees |
| Q13. Why can BST become O(n)? | concept binary-search-tree (Interview Q 1) |  |
| Q14. What is a balanced tree? | concept balanced-trees (Interview Q 1) |  |
| Q15. What is a heap? | concept heap-priority-queue (sayIt) |  |
| Q16. Heap vs BST? | comparison heap-vs-bst (embedded in heap-priority-queue) |  |
| Q17. BFS vs DFS? | dfs Interview Q; comparison bfs-vs-dfs |  |
| Q18. Adjacency List vs Matrix? | graph-basics Interview Q |  |
| Q19. What is a Trie? | concept trie (Interview Q 1, sayIt) |  |
| Q20. What is Union-Find? | union-find Interview Q |  |
| 47. One-page memory map and final rules | story spine (one step per family) and the traps / points of each concept | The rules are traps already listed under 35 and 34 |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| 3. Array (complexity table "Insert at end O(1), depends on capacity") | A Java array's length never changes, so there is no "insert at end"; appending is an ArrayList operation | Arrays: fixed length, a bigger array must be created and copied; ArrayList: add at end amortised O(1) | https://docs.oracle.com/javase/specs/jls/se25/html/jls-10.html |
| 5. Linked List cost table: "Delete known node O(1)" for singly | In a singly linked list, deleting a node needs its predecessor; reaching it means walking from the head (O(n)) unless you already hold it | Deleting is O(1) in a doubly list; in a singly list only when you hold the previous node (linked-list bullet and trap) | https://opendatastructures.org/ods-java/3_1_SLList_Singly_Linked_Li.html |
| 7. Queue (FIFO) | Loose for Java: the Queue interface does not guarantee FIFO; PriorityQueue orders by priority | point "Java Queue: not always FIFO" and How-it-works bullet linking heap-priority-queue | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Queue.html |
| 15. BST Traversal (inorder, preorder, postorder, level order) | Titled as BST traversals; the four orders apply to any binary tree, only "inorder is sorted" needs a BST | Concept tree-traversals covers any binary tree; trap says inorder is sorted only for a BST | https://cses.fi/book/book.pdf |
| 22 (BFS vs DFS memory row). "More memory on wide / deep graphs" | Loose; not the defining difference | Queue holds the frontier still to explore; stack holds the current path | https://www.techinterviewhandbook.org/algorithms/graph/ |
| 24 (uses). Union-find "Detecting cycles" | Stated for graphs in general | Only undirected graphs (an edge whose ends share a root); directed cycles need DFS colours | https://cp-algorithms.com/data_structures/disjoint_set_union.html ; https://cp-algorithms.com/graph/finding-cycle.html |
| 25. Sorting table: Bubble best O(n); 25. Sorting table: Selection stable "Usually No"; 25. Sorting table: Quick stable "Usually No"; 25. Sorting table: no space column; 25. Merge row and Quick row (for merge-sort, quick-sort) | True only when the pass stops early after a pass with no swaps; the plain two-loop version is always O(n²); Hedged; the standard array version is not stable (it swaps far-apart items); Hedged; Space is the other half of the merge-vs-quick question; Rows are right; covered by the corrected section 25 above | Table row kept with a bullet: "O(n) best needs an early exit"; "No"; "No"; Added "Extra space" column (merge O(n), quick O(log n) stack, others O(1)); merge-sort and quick-sort concepts, comparison merge-sort-vs-quick-sort | https://algs4.cs.princeton.edu/21elementary/Bubble.java.html ; https://cses.fi/book/book.pdf ; https://algs4.cs.princeton.edu/25applications/ ; https://algs4.cs.princeton.edu/cheatsheet/ ; https://algs4.cs.princeton.edu/cheatsheet/ ; https://www.techinterviewhandbook.org/algorithms/sorting-searching/ |
| 29. Which data structure should I choose? | "LIFO → Stack / Deque" and "Ordered search → BST" are loose for Java: the Stack class is legacy and a plain BST can degrade | LIFO and FIFO → `ArrayDeque`; sorted or nearest keys → balanced BST, i.e. `TreeMap` / `TreeSet` (red-black tree, guaranteed log n) | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/ArrayDeque.html ; https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/TreeMap.html |
| 30. Java Collection Cheat Sheet (hierarchy) | LinkedList shown only under List; ConcurrentHashMap listed with the java.util maps as if general-purpose | LinkedList is a List and a Deque (diagram and bullet); thread-safe classes noted as living in java.util.concurrent, not in the diagram | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/doc-files/coll-overview.html |
| 32. HashMap vs TreeMap vs LinkedHashMap ("Null key: Usually no" for TreeMap) | Loose: the rule is exact | TreeMap throws NullPointerException for a null key with natural ordering or a comparator that rejects nulls | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/TreeMap.html |
| 37. Tree Complexity Cheat Sheet | Said a balanced *binary tree* gives O(log n) search/insert/delete; a binary tree without the BST order still needs O(n) to find a key | Stated for balanced BSTs only (balanced-trees points; binary-tree-vs-bst row "Find a key") | https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_lec7/ |
| 39. Sparse vs Dense graph | Sparse given as "E ≈ V"; that is one example, not the meaning | Sparse: far fewer than V² edges; dense: close to V² edges | https://cp-algorithms.com/graph/dijkstra_sparse.html ; https://opendatastructures.org/ods-java/12_1_AdjacencyMatrix_Repres.html |
| 40. DFS (maze) | Lists "Maze" as a DFS / backtracking use with no caveat; DFS finds a path but not the fewest steps, and exploring all maze paths by DFS is exponential | Fewest steps in a maze or grid: BFS, O(rows × cols); DFS / flood fill only for reachability and regions (grid-traversal points, tree shortest-path-binary-maze) | https://www.geeksforgeeks.org/dsa/shortest-path-in-a-binary-maze/ |
| 41. Monotonic Stack (why O(n)) | "Each element is generally pushed and popped at most once": loose; pushes are not "at most" | Each index is pushed exactly once and popped at most once, so total work is O(n) | https://cses.fi/book/book.pdf (8.2 Nearest smaller elements) |
| 45. Interview decision tree | Same loose items: "Need sorted data → TreeMap / TreeSet / BST" and "Need LIFO → Stack" | Same table as 29 (one table, written once), with ArrayDeque and TreeMap/TreeSet; costs left to each structure's concept | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Stack.html |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| Problem Patterns topic (14 concepts) | topic `patterns` | Owner's request (19-10-2026): patterns that solve most problems, easy to remember |
| Problem-Solving Tricks topic (6 concepts) | topic `tricks` | Owner's request (19-10-2026): tricks to solve problems and to remember |
| ADT vs data structure | concept data-structures (point, trap, Interview Q); glossary abstract-data-type | Standard first-round question; the master scope asks for it |
| Several input variables: O(n + m), O(V + E), O(L) | concept big-o (point, trap) | The most common Big-O mistake in interviews |
| Worst, expected and amortised guarantees | big-o tree nodes; amortised example linked to dynamic-array | Needed to read costs like "average O(1)" or "amortised O(1)" correctly |
| Big-Omega and Big-Theta | glossary big-omega, big-theta; tree node asymptotic-bounds | Commonly asked "O vs Theta" |
| Program to the interface; Collections and Arrays helpers | concept java-collections (points, Example, Interview Q) | Everyday Java habit in coding rounds |
| Generics need reference types; autoboxing; unboxing null throws NPE | concept java-collections (point, Interview Q); glossary generics, autoboxing, wrapper-class | Explains List<Integer>, a frequent beginner question |
| SequencedCollection (Java 21) | tree node sequenced-collection | New in Java 21 (getFirst, getLast, reversed) |
| Comparable vs Comparator | comparison comparable-vs-comparator | Frequently asked Java pair |
| Strings and StringBuilder (immutability, == vs equals, O(n²) loop concatenation, c - 'a') | concept strings; comparison string-vs-stringbuilder | Strings are asked constantly; not in the reference |
| 2D and jagged arrays, default values, ArrayIndexOutOfBoundsException | concept arrays; tree array-2d, jagged-array, array-default-values, array-index-out-of-bounds | Java basics used in every grid problem |
| Load factor and rehashing (HashMap 16 / 0.75) | concept hashing; concept hashmap-hashset (Steps, Defaults) | Commonly asked follow-up to "how does HashMap work" |
| equals/hashCode contract and mutable keys | concept hashmap-hashset (trap, Interview Q) | Classic Java interview question |
| OpenJDK treeified buckets (JDK 8, JEP 180) | concept hashmap-hashset (bullet); tree hashmap-treeified-bucket | Frequently asked; labelled as OpenJDK |
| ConcurrentHashMap | tree concurrent-hashmap; glossary | "Is HashMap thread-safe?" follow-up |
| LinkedHashMap access order and LRU cache via removeEldestEntry; floorKey/ceilingKey | concept ordered-maps-sets | LRU cache is a common interview problem |
| Array vs ArrayList | comparison array-vs-arraylist | Common Java confusion |
| Circular linked list | tree circular-linked-list; glossary | owner's scope note; common type question |
| Dummy (sentinel) node | tree sentinel-node; glossary; linked-list sayIt | standard linked-list interview technique (TIH) |
| Reverse a linked list (iterative) | linked-list Example and Interview Q; tree reverse-linked-list | essential interview question (TIH) |
| Merge Two Sorted Lists | tree merge-two-sorted-lists | recommended interview question (TIH) |
| Java LinkedList is doubly linked, List + Deque | linked-list point; tree java-linkedlist | Java baseline |
| Legacy java.util.Stack vs Deque | stack trap; tree java-stack-class | the Java docs recommend Deque |
| Valid Parentheses | stack Example; tree valid-parentheses | essential interview question (TIH, algs4 exercise) |
| Min Stack, Queue using two stacks | tree min-stack, queue-using-two-stacks; stack relation | common design questions (TIH; mechanism from cp-algorithms) |
| Circular queue | tree circular-queue; glossary; queue-and-deque bullet | owner's scope note; "Design Circular Queue" (TIH) |
| offer/poll/peek vs add/remove/element | queue-and-deque trap and Example; tree queue-methods | Java API behaviour interviewers check |
| ArrayDeque: no nulls, initial room 16, faster than LinkedList as a queue | queue-and-deque points, Defaults, Interview Q | Java baseline |
| n nodes have n - 1 edges; one path between two nodes | tree-basics (hook, point, Interview Q) | Standard tree fact, asked in counting questions |
| Skewed (degenerate) tree as a shape | tree node skewed-tree; glossary | Explains the O(n) BST case |
| TreeNode class and height in Java | tree-basics Example | Needed in every tree round |
| Rebuilding a tree from preorder + inorder | tree-traversals Interview Q | Common interview question (Construct Binary Tree from Preorder and Inorder) |
| Validate BST with (min, max) range | binary-search-tree trap, Example; tree node validate-bst | Most-asked BST question; checking only children is the usual wrong answer |
| BST delete cases and inorder successor | binary-search-tree How, Interview Q; tree nodes bst-delete, inorder-successor | Commonly asked |
| Kth smallest in a BST | tree node kth-smallest-bst; Interview Q | Listed as a recommended interview problem |
| Rotations; Java TreeMap/TreeSet use a red-black tree | balanced-trees (diagram, points); tree node tree-rotation | Interview "what and why" depth; ties to Java |
| Heap array layout 2i+1, 2i+2, (i-1)/2 | heap-priority-queue diagram; tree node heap-array-layout | Needed to explain why a heap is an array |
| Build heap is O(n) and why | heap-priority-queue Interview Q | Common follow-up |
| PriorityQueue: iterator not ordered, no nulls, remove(Object)/contains O(n), capacity 11, ties arbitrary | heap-priority-queue (trap, points, Defaults) | Java API facts interviewers probe |
| Trie end-of-word flag trap; startsWith vs search | trie (trap, Interview Q 3) | Most common trie bug |
| Topological sort (Kahn's algorithm, DFS reverse postorder, cycle check, Course Schedule) | concept topological-sort | Reference only names it under DFS uses; Course Schedule is a standard practice problem (TIH) |
| Shortest paths: Dijkstra, Bellman-Ford, Floyd-Warshall, 0-1 BFS, negative cycle, edge relaxation | concept shortest-paths; comparison dijkstra-vs-bellman-ford | T6 points to weighted graphs but the reference never says what to use |
| Java PriorityQueue has no decrease-key: lazy Dijkstra skips stale entries | shortest-paths bullet and Example | Java-specific detail candidates get wrong |
| Minimum spanning tree (Kruskal vs Prim) | concept minimum-spanning-tree; comparison kruskal-vs-prim | Reference mentions Kruskal only as a union-find use |
| Directed vs undirected cycle detection (parent check, three colours) | dfs bullets, Interview Q, tree nodes | Common interview question |
| Recursive DFS stack overflow, iterative DFS | dfs point and Interview Q (links recursion) | Java-specific failure on deep graphs |
| Mark visited when enqueuing | bfs bullet | Common bug |
| Connected component, DAG, in-degree | graph-basics Interview Q; tree; glossary | Needed by later concepts |
| Safe middle `lo + (hi - lo) / 2` (int overflow) | concept binary-search (point, code, Interview Q) | Classic interview follow-up; real JDK bug |
| Lower bound / upper bound, first occurrence | concept binary-search; tree lower-bound, upper-bound; glossary | Duplicates are the most common binary-search variant |
| Arrays.binarySearch / Collections.binarySearch return value | concept binary-search (point, trap); tree nodes | Common Java mistake (expecting -1) |
| Java's sorts: Dual-Pivot Quicksort (primitives), TimSort-based stable sort (objects) | concept sorting-basics; tree java-sorts; glossary | Interviewers ask what Arrays.sort uses |
| Comparison-sort lower bound; counting sort, radix sort | concept sorting-basics (point, Interview Q); tree non-comparison-sorts; glossary | "Can you beat n log n?" is a standard question |
| Recursion tree, naive Fibonacci, tail recursion, iteration | concept recursion; comparison recursion-vs-iteration; glossary | Cost of recursion and its limits |
| Merge step code, bottom-up merge sort, linked-list sort, inversions | concept merge-sort; tree | Merge step is commonly coded; inversions is a classic problem |
| Lomuto / Hoare partition, random pivot, 3-way partition, quickselect | concept quick-sort; tree; glossary | Worst-case fix and k-th element are standard follow-ups |
| Fast and slow pointers (Floyd) | concept fast-slow-pointers | Standard linked-list pattern (cycle, cycle start, middle); master.json "(added)" |
| Prefix sum, 2D prefix sum, difference array | concept prefix-sum and its types | Core range-sum pattern; master.json "(added)" |
| Subarray Sum Equals K (prefix counts in a map) | tree `subarray-sum-equals-k`; prefix-sum example | The fix when a sliding window fails on negatives |
| Sliding windows on sums need non-negative numbers | sliding-window trap and minus point | Reference omits this limit; common wrong answer |
| Monotonic deque (Sliding Window Maximum) | tree `monotonic-queue`; monotonic-stack Interview Q | Commonly asked; O(n) window max |
| 3Sum, Product of Array Except Self, Largest Rectangle, Daily Temperatures | tree nodes | Classic problems for each pattern (TIH lists them) |
| int[26] counter is O(1) space | frequency-counting trap | TIH calls the O(n) answer a common mistake |
| Subarray, Subsequence | glossary | Interviewer words used across patterns; not owned by another unit |
| Intervals pattern (merge, insert, meeting rooms, non-overlapping) | concept merge-intervals | Core interview topic (Tech Interview Handbook interval list); the reference has no interval section |
| Greedy, with the coins {1, 3, 4} counterexample | concept greedy; comparison dp-vs-greedy | Interviewers ask "greedy or DP?"; the reference never names greedy |
| Grid as a graph: direction arrays, flood fill, multi-source BFS | concept grid-traversal | Grids are the most common way graphs appear in interviews (Tech Interview Handbook) |
| Running median with two heaps | tree two-heaps-median; top-k-heap Interview Q | Classic heap question (Find Median from Data Stream) |
| Search in a rotated sorted array | tree rotated-sorted-array | Essential binary search question (Tech Interview Handbook) |
| Memoisation vs tabulation | comparison memoisation-vs-tabulation; glossary memoisation, tabulation | Standard DP follow-up question |
| Classic DP families: Climbing Stairs, House Robber, Coin Change, LIS, grid paths, LCS, edit distance, 0/1 knapsack | tree one-d-dp and two-d-dp | Named as essential practice by Tech Interview Handbook and CSES ch. 7 |
| Jump Game II and Gas Station | tree under greedy | Common greedy interview problems |
| Copy the path when saving (new ArrayList<>(path)) | backtracking trap | Most common Java bug in backtracking |
| A repeatable solving routine (clarify, examples, brute force, bottleneck, code, test) | concept problem-solving-steps | Owner asked for tricks to solve any problem; TIH documents this as what interviewers expect |
| Bottleneck → move table (lookup → hash, range sums → prefix, repeats → DP, sorted → two pointers / binary search, top k → heap) | concept problem-solving-steps (Example) | The practical "how to optimise" step; links to the pattern concepts instead of repeating them |
| Input size → workable complexity table | concept constraints-to-complexity | Classic, sourced rule of thumb (CPH 2.3) the reference lacks |
| Edge-case checklist by input kind | concept edge-cases | Interviewers expect candidates to test edge cases themselves (TIH) |
| Java pitfalls: int overflow, Integer ==, integer division, char arithmetic, subtraction comparator, Math.abs(MIN_VALUE), List.remove overloads, remove in for-each, Arrays.asList / List.of | concept java-pitfalls | Java-specific bugs that pass the given example and fail hidden tests |
| Bit tricks: & | ^ ~ << >> >>>, x & (x - 1), XOR cancel, masks, subsets, Integer.bitCount, shift-distance masking, precedence of & vs == | concept bit-manipulation | Asked sometimes (TIH: Single Number, Number of 1 Bits); reference has no bit section |

## Dropped
| Reference item | Reason (rare / advanced / duplicate / unverifiable) |
|---|---|
| (no whole item) | |

### Details cut or placed elsewhere inside items listed above
| Reference item part | What happened |
|---|---|
| 5. Linked List (nodes, singly, doubly, costs, array vs list, trap) | also: concept linked-list (points, trap, Compare); tree singly-linked-list, doubly-linked-list |
| 7. Queue uses "message queues, producer-consumer systems" | cut: out of scope (system design and concurrency, not DSA) |
| 21 (example tree drawing and its BFS order) | cut: duplicate: the bfs-vs-dfs mini diagrams show the same idea |
| 22. DFS (stack or recursion, O(V + E), uses, BFS vs DFS table) | also: concept dfs; comparison bfs-vs-dfs (embedded) |
| 24. Union-Find (find, union, path compression, union by rank/size, O(α(n)), uses) | also: concept union-find (Mermaid, points, code); tree path-compression, union-by-rank, graph-valid-tree; glossary inverse-ackermann |
| 40. DFS / Backtracking (combinations, permutations, subsets, N-Queens, decision problems) | also: concept backtracking (diagram, template, Interview Qs); tree subsets, permutations, combination-sum, n-queens, pruning, skip-duplicates |

### Dropped from the old DSA draft (17-10-2026, not in the reference)
| Item | Reason |
|---|---|
| Java basics concepts: java-basics, control-flow, methods, java-oop, input-output | Teaching Java syntax is out of scope for interview revision; what matters in a coding round moved to `java-collections`, `strings` and `java-pitfalls` (owner can overrule, OPEN_QUESTIONS F) |
| two-dimensional-arrays, arrays-and-strings, sorting-and-binary-search, java-dsa-toolkit, complexity (concept ids) | Merged into `arrays`, `strings`, `binary-search`, `java-collections` and `big-o` |
