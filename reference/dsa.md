# Data Structures — Complete Interview Cheat Sheet

**Goal:** Know the terminology, operations, complexities, relationships, rules, and common interview traps without needing to memorize long explanations.

---

# 1. Big Picture

### Data Structure
A way to **organize and store data** so operations can be performed efficiently.

### Main categories

| Category | Examples |
|---|---|
| Linear | Array, Linked List, Stack, Queue, Deque |
| Non-linear | Tree, Graph, Heap |
| Hash-based | HashMap, HashSet, Hash Table |
| Specialized | Trie, Union-Find |

### Two important classifications

**Static**
- Size generally fixed.
- Example: Array.

**Dynamic**
- Can grow/shrink during execution.
- Example: Linked List, ArrayList.

---

# 2. Big-O — Must Know

### Time complexity

| Complexity | Meaning | Example |
|---|---|---|
| `O(1)` | Constant | Array access by index |
| `O(log n)` | Logarithmic | Binary Search |
| `O(n)` | Linear | Linear Search |
| `O(n log n)` | Efficient sorting | Merge Sort |
| `O(n²)` | Quadratic | Bubble Sort |
| `O(2ⁿ)` | Exponential | Some recursion/backtracking |
| `O(n!)` | Factorial | Permutations brute force |

### Growth order

```text
O(1)
↓
O(log n)
↓
O(n)
↓
O(n log n)
↓
O(n²)
↓
O(2ⁿ)
↓
O(n!)
```

**Interview rule:** Ignore constants.

```text
O(2n) → O(n)
O(5n²) → O(n²)
O(n + n²) → O(n²)
```

### Space complexity

Memory used by the algorithm/data structure.

Remember:

> **Input space ≠ Auxiliary space**

Auxiliary space = **extra memory used by the algorithm**, excluding the input in many interview conventions.

---

# 3. Array



Stores elements in **contiguous memory**.

```text
[10][20][30][40][50]
 0   1   2   3   4
```

### Key property

**Random access is O(1).**

Because:

```text
address = base + index × element_size
```

### Complexity

| Operation | Complexity |
|---|---:|
| Access | O(1) |
| Update | O(1) |
| Search | O(n) |
| Insert at end* | O(1) |
| Insert at beginning | O(n) |
| Delete at beginning | O(n) |
| Delete from middle | O(n) |

`*` depends on whether capacity is available.

### Advantages

- Fast indexing.
- Cache-friendly.
- Low overhead.
- Good for sequential access.

### Disadvantages

- Insertion/deletion in middle is expensive.
- Fixed-size arrays cannot dynamically grow.
- Requires contiguous memory.

### Common question

**Why is array access O(1)?**

Because the address can be calculated directly using the index.

---

# 4. Dynamic Array / ArrayList

Java:

```java
ArrayList<Integer>
```

Internally uses an **array that can be resized**.

When capacity becomes insufficient:

```text
old array → create larger array → copy elements
```

### Complexity

| Operation | Complexity |
|---|---:|
| get(index) | O(1) |
| set(index) | O(1) |
| add(end) | O(1) amortized |
| insert(middle) | O(n) |
| remove(middle) | O(n) |
| search | O(n) |

### Important term

**Amortized O(1)**

Most insertions at the end are O(1), but occasionally resizing requires O(n).

Over many operations, average cost is O(1).

---

# 5. Linked List



Elements are stored in **nodes**, connected using references/pointers.

### Singly Linked List

```text
10 → 20 → 30 → null
```

Each node:

```text
[data | next]
```

### Doubly Linked List

```text
null ← 10 ⇄ 20 ⇄ 30 → null
```

Node:

```text
[prev | data | next]
```

### Complexity

| Operation | Singly | Doubly |
|---|---:|---:|
| Access by index | O(n) | O(n) |
| Search | O(n) | O(n) |
| Insert at head | O(1) | O(1) |
| Delete head | O(1) | O(1) |
| Insert after known node | O(1) | O(1) |
| Delete known node* | O(1) | O(1) |

`*` Doubly linked list makes deletion easier because previous node is directly available.

### Array vs Linked List

| Array | Linked List |
|---|---|
| Contiguous memory | Non-contiguous |
| Random access O(1) | Access O(n) |
| Insert middle O(n) | O(1) if node position/reference known |
| Better cache locality | Poorer cache locality |
| Less pointer overhead | Extra pointer memory |

### Important trap

> Linked list insertion is **not always O(1)**.

Finding the position may itself take **O(n)**.

---

# 6. Stack



**LIFO = Last In, First Out**

```text
push 10
push 20
push 30

TOP → 30
       20
       10
```

### Operations

| Operation | Meaning | Complexity |
|---|---|---:|
| push | Add | O(1) |
| pop | Remove top | O(1) |
| peek/top | View top | O(1) |
| isEmpty | Check empty | O(1) |

### Uses

- Function call stack
- Undo/Redo
- Parentheses matching
- DFS
- Expression evaluation
- Backtracking

### Java

Prefer:

```java
Deque<Integer> stack = new ArrayDeque<>();
```

Operations:

```java
push()
pop()
peek()
```

### Common trap

**Stack overflow** → too many function calls / recursion depth.

**Stack underflow** → attempting to remove from an empty stack.

---

# 7. Queue



**FIFO = First In, First Out**

```text
10 → 20 → 30
↑         ↑
front     rear
```

### Operations

| Operation | Meaning | Complexity |
|---|---|---:|
| enqueue | Add at rear | O(1) |
| dequeue | Remove front | O(1) |
| peek | View front | O(1) |

### Uses

- BFS
- Scheduling
- Task processing
- Message queues
- Producer-consumer systems

---

# 8. Deque

**Double-ended queue**

Can insert/remove from **both ends**.

```text
front ⇄ [10][20][30] ⇄ rear
```

Operations:

```text
addFirst()
addLast()
removeFirst()
removeLast()
```

Typically O(1).

### Uses

- Sliding window
- Monotonic queue
- BFS variants
- Implement stack/queue

---

# 9. Hash Table



Stores:

```text
key → value
```

Example:

```text
"Java" → 10
"Python" → 20
```

### Hashing

A **hash function** converts a key into a hash value/index.

```text
key
 ↓
hash function
 ↓
bucket/index
```

### Average complexity

| Operation | Average |
|---|---:|
| Insert | O(1) |
| Search | O(1) |
| Delete | O(1) |

Worst case can become **O(n)** depending on collisions/implementation.

---

# 10. Hash Collision

Two different keys produce the same bucket/index.

```text
Key A ──┐
        ├── Bucket 3
Key B ──┘
```

### Common collision handling

**Separate chaining**

```text
Bucket → Node → Node → Node
```

**Open addressing**

Find another available slot.

Examples:

- Linear probing
- Quadratic probing
- Double hashing

---

# 11. HashMap — Java

```java
HashMap<K, V>
```

Important characteristics:

- Key-value structure.
- Average O(1) lookup.
- Allows **one null key**.
- Allows multiple null values.
- Does **not guarantee ordering**.
- Not synchronized.

### HashSet

Stores **unique values**.

Internally conceptually backed by hashing.

```text
HashSet → HashMap
```

### HashMap vs HashSet

| HashMap | HashSet |
|---|---|
| Key-value | Values only |
| Keys unique | Elements unique |
| `put(k,v)` | `add(x)` |
| `get(k)` | `contains(x)` |

---

# 12. Tree



Hierarchical data structure.

### Terminology

```text
        1        ← Root
       / \
      2   3      ← Children
     / \
    4   5       ← Descendants
```

### Important terms

**Root**
- Top node.

**Parent**
- Node directly above another node.

**Child**
- Node directly below a parent.

**Leaf**
- Node with no children.

**Sibling**
- Nodes with the same parent.

**Depth**
- Distance from root to node.

**Height**
- Longest path from node to leaf.

### Common confusion

For a tree:

> **Depth is measured downward from root.**

> **Height is measured downward toward the deepest leaf.**

---

# 13. Binary Tree

Every node has **at most two children**.

```text
       10
      /  \
     5    20
```

Children:

```text
left
right
```

### Important

Binary tree ≠ Binary Search Tree.

A binary tree does **not** automatically have ordering.

---

# 14. Binary Search Tree — BST



For every node:

```text
left subtree < node < right subtree
```

Example:

```text
       50
      /  \
    30    70
   / \    / \
 20  40  60 80
```

### Complexity

Balanced BST:

| Operation | Complexity |
|---|---:|
| Search | O(log n) |
| Insert | O(log n) |
| Delete | O(log n) |

Worst case:

```text
10
  \
   20
     \
      30
        \
         40
```

Becomes like a linked list.

Therefore:

> Worst-case BST operations = **O(n)**.

---

# 15. BST Traversal

### Inorder

```text
Left → Root → Right
```

For a BST:

> **Inorder traversal gives sorted order.**

This is a very common interview question.

### Preorder

```text
Root → Left → Right
```

Useful for:

- Tree serialization
- Copying tree structure

### Postorder

```text
Left → Right → Root
```

Useful for:

- Deleting tree
- Bottom-up processing

### Level Order

```text
Level by level
```

Usually implemented using a **Queue**.

---

# 16. Balanced Trees

A balanced tree keeps height relatively small.

Goal:

```text
height ≈ log n
```

Examples:

- AVL Tree
- Red-Black Tree

### Why balance?

Without balancing:

```text
O(log n) → O(n)
```

---

# 17. Heap



A **complete binary tree** satisfying the heap property.

### Min Heap

Parent ≤ children.

```text
       10
      /  \
    20    30
```

Minimum element is at root.

### Max Heap

Parent ≥ children.

Maximum element is at root.

### Complexity

| Operation | Complexity |
|---|---:|
| Peek min/max | O(1) |
| Insert | O(log n) |
| Remove root | O(log n) |
| Build heap | O(n) |
| Search arbitrary element | O(n) |

### Important trap

Heap is **not fully sorted**.

Only the parent-child relationship is guaranteed.

---

# 18. Priority Queue

Elements are processed according to **priority**, not insertion order.

Java:

```java
PriorityQueue<Integer>
```

Default Java `PriorityQueue`:

> **Min Heap**

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();
```

Smallest element comes first.

For max heap:

```java
PriorityQueue<Integer> pq =
    new PriorityQueue<>(Collections.reverseOrder());
```

### Complexity

| Operation | Complexity |
|---|---:|
| peek | O(1) |
| offer | O(log n) |
| poll | O(log n) |

### Uses

- Top K problems
- Dijkstra
- Scheduling
- Median problems
- Merge K sorted lists

---

# 19. Graph



Collection of:

```text
Vertices/Nodes + Edges
```

Example:

```text
A —— B
|    |
C —— D
```

### Types

**Directed**

```text
A → B
```

**Undirected**

```text
A — B
```

**Weighted**

```text
A --5-- B
```

**Unweighted**

Edges have no weight.

**Cyclic**

Contains a cycle.

**Acyclic**

No cycle.

---

# 20. Graph Representation

## Adjacency Matrix

2D array.

```text
matrix[u][v]
```

### Complexity

| Operation | Complexity |
|---|---:|
| Check edge | O(1) |
| Space | O(V²) |

Good for:

> Dense graphs.

---

## Adjacency List

Each vertex stores its neighbors.

```text
A → B, C
B → A, D
C → A
```

Space:

> **O(V + E)**

Good for:

> Sparse graphs.

### Interview rule

Most graph problems use:

> **Adjacency List**

---

# 21. BFS

**Breadth-First Search**

Uses:

> **Queue**

Visits level by level.

```text
        A
      /   \
     B     C
    / \
   D   E
```

BFS:

```text
A → B → C → D → E
```

### Complexity

With adjacency list:

> **O(V + E)**

### Key property

For an **unweighted graph**, BFS finds the **shortest path in terms of number of edges**.

---

# 22. DFS

**Depth-First Search**

Uses:

> Stack or recursion.

Goes as deep as possible before backtracking.

### Complexity

Adjacency list:

> **O(V + E)**

### Uses

- Cycle detection
- Connected components
- Path finding
- Topological sorting
- Backtracking
- Maze problems

### BFS vs DFS

| BFS | DFS |
|---|---|
| Queue | Stack/recursion |
| Level-wise | Depth-wise |
| Shortest path in unweighted graph | Not necessarily shortest |
| More memory on wide graphs | More memory on deep graphs |

---

# 23. Trie



Tree specifically designed for **strings/prefixes**.

Example:

```text
       root
      /    
     c
     |
     a
    / \
   t   r
```

Stores:

```text
cat
car
```

### Complexity

For word length `L`:

| Operation | Complexity |
|---|---:|
| Insert | O(L) |
| Search | O(L) |
| Prefix search | O(L) |

### Uses

- Autocomplete
- Dictionary
- Prefix matching
- Spell checking

---

# 24. Union-Find / Disjoint Set

Used to manage **groups/connected components**.

Main operations:

```text
find(x)
union(a,b)
```

### Optimizations

**Path compression**

Makes future `find()` operations faster.

**Union by rank/size**

Attach smaller tree under larger tree.

With both optimizations:

> Almost O(1) amortized  
> More precisely **O(α(n))**, where α is the inverse Ackermann function.

### Uses

- Detecting cycles
- Connected components
- Kruskal's MST
- Network connectivity

---

# 25. Sorting — Important Data Structures Connection

| Algorithm | Best | Average | Worst | Stable |
|---|---:|---:|---:|---|
| Bubble | O(n) | O(n²) | O(n²) | Yes |
| Selection | O(n²) | O(n²) | O(n²) | Usually No |
| Insertion | O(n) | O(n²) | O(n²) | Yes |
| Merge | O(n log n) | O(n log n) | O(n log n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | Usually No |
| Heap | O(n log n) | O(n log n) | O(n log n) | No |

### Stable sorting

Equal elements preserve their **relative order**.

Example:

```text
(A, 90)
(B, 80)
(C, 90)
```

Stable sorting by marks keeps:

```text
A before C
```

---

# 26. Searching

## Linear Search

Check elements one by one.

```text
10 20 30 40
      ↑
```

Complexity:

> O(n)

Works on:

> Sorted or unsorted data.

---

## Binary Search

Works when data is appropriately **sorted**.

Repeatedly halves search space.

```text
[10 20 30 40 50 60 70]
          ↓
       middle
```

Complexity:

> O(log n)

### Common mistake

Binary search is **not automatically applicable to every array**.

Usually need:

> Sorted data / monotonic search condition.

---

# 27. Recursion + Data Structures

Recursion means a function calls itself.

Every recursive call generally creates a new **stack frame**.

Example:

```text
factorial(5)
 ↓
factorial(4)
 ↓
factorial(3)
 ↓
...
```

### Important interview point

Recursive algorithm can cause:

> Stack Overflow

if recursion depth becomes too large.

### Recursion usually needs

1. Base case.
2. Recursive case.
3. Progress toward base case.

---

# 28. Common Data Structure Relationships

### Stack

```text
LIFO
↓
DFS
```

### Queue

```text
FIFO
↓
BFS
```

### Heap

```text
Priority
↓
PriorityQueue
```

### Hash Table

```text
Fast lookup
↓
HashMap / HashSet
```

### BST

```text
Ordered searching
↓
Search / insert / delete
```

### Trie

```text
Prefix
↓
Strings
```

### Graph

```text
Relationships
↓
Networks / paths
```

### Union-Find

```text
Groups / connectivity
↓
Connected components
```

---

# 29. Which Data Structure Should I Choose?

| Requirement | Best candidate |
|---|---|
| Fast index access | Array / ArrayList |
| Frequent insertion at beginning | Linked List / Deque |
| LIFO | Stack / Deque |
| FIFO | Queue / Deque |
| Fast key lookup | HashMap |
| Unique values | HashSet |
| Sorted unique values | TreeSet |
| Sorted key-value pairs | TreeMap |
| Minimum/maximum repeatedly | Heap / PriorityQueue |
| Hierarchical data | Tree |
| Ordered search | BST |
| Prefix search | Trie |
| Relationships/networks | Graph |
| Level-order traversal | Queue + BFS |
| Deep traversal | Stack/recursion + DFS |
| Connectivity/group merging | Union-Find |

---

# 30. Java Collection Cheat Sheet

### Main hierarchy

```text
Collection
├── List
│   ├── ArrayList
│   └── LinkedList
│
├── Set
│   ├── HashSet
│   ├── LinkedHashSet
│   └── TreeSet
│
└── Queue
    ├── PriorityQueue
    └── Deque
        └── ArrayDeque

Map
├── HashMap
├── LinkedHashMap
├── TreeMap
└── ConcurrentHashMap
```

**Important:** `Map` is **not** a subtype of `Collection`.

---

# 31. ArrayList vs LinkedList

| | ArrayList | LinkedList |
|---|---|---|
| Internal structure | Dynamic array | Doubly linked list |
| get(index) | O(1) | O(n) |
| Add end | O(1) amortized | O(1) |
| Add beginning | O(n) | O(1) |
| Remove beginning | O(n) | O(1) |
| Random access | Excellent | Poor |
| Cache locality | Better | Worse |

### Interview default

If you don't specifically need linked-list behavior:

> **ArrayList is usually the better default.**

---

# 32. HashMap vs TreeMap vs LinkedHashMap

| | HashMap | LinkedHashMap | TreeMap |
|---|---|---|---|
| Ordering | None guaranteed | Insertion/access order | Sorted by key |
| Average lookup | O(1) | O(1) | O(log n) |
| Null key | Yes | Yes | Usually no |
| Structure | Hash table | Hash table + linked order | Red-Black Tree |

### Remember

```text
HashMap → Fast
LinkedHashMap → Fast + order
TreeMap → Sorted
```

---

# 33. HashSet vs TreeSet vs LinkedHashSet

| | HashSet | LinkedHashSet | TreeSet |
|---|---|---|---|
| Duplicates | No | No | No |
| Ordering | None guaranteed | Insertion order | Sorted |
| Average add/search | O(1) | O(1) | O(log n) |

Remember:

```text
HashSet → uniqueness
LinkedHashSet → uniqueness + insertion order
TreeSet → uniqueness + sorted
```

---

# 34. Important "Cannot" Rules

### Array

❌ Cannot efficiently insert in the middle without shifting.

### Linked List

❌ Cannot directly/randomly access index in O(1).

### Stack

❌ Cannot efficiently access arbitrary middle element.

### Queue

❌ Not designed for arbitrary random access.

### HashMap

❌ Cannot rely on iteration order.

### HashSet

❌ Cannot rely on ordering.

### Heap

❌ Cannot assume all elements are sorted.

### BST

❌ Ordinary BST does not guarantee O(log n).

It can become:

```text
O(n)
```

### Binary Search

❌ Cannot normally apply directly to arbitrary unsorted data.

### BFS

❌ Does not guarantee shortest path in weighted graphs.

### DFS

❌ Does not guarantee shortest path in general.

---

# 35. Common Interview Traps

### Trap 1

**Array access = O(1)**

Correct.

**Array search = O(1)**

❌ Wrong.

Usually:

> O(n)

---

### Trap 2

**Linked List insertion = O(1)**

Incomplete.

Correct:

> O(1) if the insertion position/node is already known.

Finding it may take:

> O(n)

---

### Trap 3

**BST search = O(log n)**

Only for a balanced BST.

Worst case:

> O(n)

---

### Trap 4

**HashMap = always O(1)**

No.

Usually:

> Average O(1)

Worst case can be:

> O(n)

---

### Trap 5

**Heap is sorted**

❌ No.

Only heap property is guaranteed.

---

### Trap 6

**BFS always finds shortest path**

Only for:

> Unweighted graphs / equal edge cost.

---

### Trap 7

**DFS uses queue**

❌ No.

DFS:

> Stack / recursion

BFS:

> Queue

---

### Trap 8

**Binary tree = BST**

❌ No.

BST has an ordering property.

---

# 36. Complexity Master Table

| Data Structure | Access | Search | Insert | Delete |
|---|---:|---:|---:|---:|
| Array | O(1) | O(n) | O(n) | O(n) |
| ArrayList | O(1) | O(n) | O(1)* | O(n) |
| Linked List | O(n) | O(n) | O(1)** | O(1)** |
| Stack | O(1) top | O(n) | O(1) | O(1) |
| Queue | O(1) front | O(n) | O(1) | O(1) |
| HashMap | — | O(1)* | O(1)* | O(1)* |
| HashSet | — | O(1)* | O(1)* | O(1)* |
| BST | O(log n)* | O(log n)* | O(log n)* | O(log n)* |
| Heap | O(1) root | O(n) | O(log n) | O(log n) |
| Trie | — | O(L) | O(L) | O(L)*** |

`*` Average/amortized where applicable.  
`**` If location/node is already known.  
`***` Depends on implementation/details.

---

# 37. Tree Complexity Cheat Sheet

For a balanced binary tree:

```text
Height = O(log n)
```

Therefore:

```text
Search → O(log n)
Insert → O(log n)
Delete → O(log n)
```

For a skewed tree:

```text
Height = O(n)
```

Therefore:

```text
Search → O(n)
Insert → O(n)
Delete → O(n)
```

---

# 38. Graph Complexity Cheat Sheet

With adjacency list:

```text
Space = O(V + E)
```

BFS:

```text
O(V + E)
```

DFS:

```text
O(V + E)
```

With adjacency matrix:

```text
Space = O(V²)
```

Edge lookup:

```text
O(1)
```

### Remember

```text
V = number of vertices
E = number of edges
```

---

# 39. Sparse vs Dense Graph

### Sparse

Few edges.

```text
E ≈ V
```

Use:

> Adjacency List

### Dense

Many edges.

```text
E ≈ V²
```

Adjacency matrix can be reasonable.

---

# 40. Must-Know Problem Patterns

These are more important than memorizing individual problems.

### Two Pointers

Useful for:

- Sorted arrays
- Pair problems
- Palindromes
- Removing duplicates

---

### Sliding Window

Useful for:

- Subarrays
- Substrings
- Longest/shortest range
- Fixed/variable windows

---

### HashMap / Frequency Map

Useful for:

- Counting
- Duplicates
- Two Sum
- Anagrams
- Fast lookup

---

### Stack

Useful for:

- Parentheses
- Next Greater Element
- Monotonic Stack
- Expression problems

---

### Queue

Useful for:

- BFS
- Level-order traversal
- Scheduling

---

### Heap

Useful for:

- Top K
- Kth largest/smallest
- Priority processing
- Merge K sorted lists

---

### Binary Search

Useful for:

- Sorted arrays
- Search space reduction
- "Minimum possible X"
- "Maximum possible X"

Also remember:

> **Binary Search on Answer**

does not require directly searching an array; it requires a **monotonic condition**.

---

### DFS / Backtracking

Useful for:

- Combinations
- Permutations
- Subsets
- Maze
- N-Queens
- Decision/exploration problems

---

### Dynamic Programming

Usually involves:

```text
State
+
Transition
+
Base Case
```

Common signals:

- Overlapping subproblems
- Optimal substructure
- "Maximum/minimum number of..."
- "How many ways..."

---

# 41. Monotonic Stack

A stack where elements maintain increasing/decreasing order.

Common problems:

- Next Greater Element
- Next Smaller Element
- Stock Span
- Largest Rectangle in Histogram

Typical complexity:

> O(n)

Why?

Each element is generally pushed and popped at most once.

---

# 42. Common Special Terms

### In-place

Algorithm uses **O(1) or small extra memory** and modifies the input directly.

### Stable

Equal elements preserve relative order.

### In-place ≠ Stable

They are independent properties.

---

### Complete Binary Tree

All levels completely filled except possibly the last, and the last level is filled **left to right**.

Used by:

> Binary Heap.

---

### Full Binary Tree

Every node has either:

```text
0 children
or
2 children
```

---

### Perfect Binary Tree

All internal nodes have two children and all leaves are at the same level.

---

# 43. Very Important Tree Differences

| Type | Rule |
|---|---|
| Binary Tree | ≤ 2 children |
| BST | Left < Root < Right |
| Heap | Parent follows min/max relationship |
| Trie | Represents strings/prefixes |
| AVL | Self-balancing BST |
| Red-Black | Self-balancing BST |

---

# 44. Interview "Why?" Answers

### Why use HashMap?

> For fast average O(1) key-based lookup, insertion, and deletion.

### Why use ArrayList?

> Fast random access and efficient append operations.

### Why use LinkedList?

> Useful when frequent insertion/deletion occurs at known positions and random access is not important.

### Why use Stack?

> When the most recently added element must be processed first.

### Why use Queue?

> When elements should be processed in arrival order.

### Why use Heap?

> When we repeatedly need the minimum/maximum element.

### Why use Trie?

> When efficient prefix-based string operations are required.

### Why use Graph?

> To represent relationships or connections between entities.

### Why use HashSet?

> To maintain unique elements with fast average lookup.

---

# 45. Interview Decision Tree

When you see a problem, ask:

```text
Need key → value?
        ↓
      HashMap

Need unique values?
        ↓
      HashSet

Need sorted data?
        ↓
 TreeMap / TreeSet / BST

Need min/max repeatedly?
        ↓
       Heap

Need LIFO?
        ↓
       Stack

Need FIFO?
        ↓
       Queue

Need prefix/string search?
        ↓
       Trie

Need hierarchy?
        ↓
       Tree

Need relationships/network?
        ↓
       Graph

Need connectivity/groups?
        ↓
    Union-Find

Need fast index access?
        ↓
    Array/ArrayList
```

---

# 46. 20 Questions You Should Be Able to Answer

1. What is a data structure?
2. Array vs Linked List?
3. Why is array access O(1)?
4. Why is linked-list access O(n)?
5. What is a stack?
6. What is a queue?
7. Stack vs Queue?
8. What is hashing?
9. What is a collision?
10. HashMap vs HashSet?
11. What is a BST?
12. Binary Tree vs BST?
13. Why can BST become O(n)?
14. What is a balanced tree?
15. What is a heap?
16. Heap vs BST?
17. BFS vs DFS?
18. Adjacency List vs Matrix?
19. What is a Trie?
20. What is Union-Find?

---

# 47. One-Page Memory Map

```text
DATA STRUCTURES
│
├── ARRAY
│   └── Fast index → O(1)
│
├── LINKED LIST
│   └── Fast known-node insertion/deletion
│
├── STACK
│   └── LIFO → DFS
│
├── QUEUE
│   └── FIFO → BFS
│
├── HASH
│   ├── HashMap → key/value
│   └── HashSet → unique values
│
├── TREE
│   ├── Binary Tree
│   ├── BST → ordered search
│   ├── AVL / Red-Black → balanced BST
│   └── Heap → min/max priority
│
├── GRAPH
│   ├── BFS → Queue
│   └── DFS → Stack/Recursion
│
├── TRIE
│   └── Prefix/string
│
└── UNION-FIND
    └── Connectivity/groups
```

### Final rules to memorize

```text
Array access              → O(1)
Array search              → O(n)

Linked List access        → O(n)
Known-node insertion      → O(1)

Stack                     → LIFO
Queue                     → FIFO

HashMap average lookup   → O(1)
HashSet                  → Unique

Balanced BST             → O(log n)
Skewed BST               → O(n)

Heap peek                → O(1)
Heap insert/delete       → O(log n)

BFS                      → Queue
DFS                      → Stack/Recursion

BFS shortest path        → Unweighted graph

Adjacency List           → O(V + E)
Adjacency Matrix         → O(V²)

Trie                     → Prefix
Union-Find               → Connectivity

Inorder BST              → Sorted order

Binary Tree ≠ BST
Heap ≠ Sorted structure
HashMap ≠ Ordered structure
BST ≠ Always O(log n)
Linked List ≠ Always O(1) insertion
BFS ≠ Always shortest path
```

**If you remember the final rules + complexity tables + "which structure should I choose?" section, you can handle a large portion of common Data Structures interview questions.**

<!-- ===== Owner addition: Java methods for coding rounds (added 20-10-2026). Source file: reference/reference.md ===== -->

JAVA 8 — NORMAL CODING FUNCTIONS TO MEMORIZE
⭐ STRING
s.length()

s.charAt(i)

s.substring(start)
s.substring(start, end)

s.indexOf("x")
s.lastIndexOf("x")

s.contains("x")

s.startsWith("x")
s.endsWith("x")

s.equals("x")
s.equalsIgnoreCase("x")

s.toUpperCase()
s.toLowerCase()

s.trim()

s.replace("a", "b")
s.replaceAll("regex", "b")

s.split(" ")

s.isEmpty()

String.valueOf(x)

String → char array
s.toCharArray()

char array → String
new String(chars)

StringBuilder ⭐⭐⭐
StringBuilder sb = new StringBuilder();

sb.append("x");

sb.insert(index, "x");

sb.delete(start, end);

sb.deleteCharAt(index);

sb.setCharAt(index, 'x');

sb.reverse();

sb.length();

sb.charAt(i);

sb.toString();

⭐ ARRAY
arr.length

Arrays.sort(arr)

Arrays.fill(arr, value)

Arrays.copyOf(arr, newLength)

Arrays.copyOfRange(arr, start, end)

Arrays.equals(a, b)

Arrays.toString(arr)

Arrays.binarySearch(arr, key)

2D Array
arr.length        // rows

arr[i].length     // columns

⭐ ARRAYLIST / LIST
List<Integer> list = new ArrayList<>();

list.add(x)

list.add(index, x)

list.get(index)

list.set(index, value)

list.remove(index)

list.remove(Integer.valueOf(x))

list.contains(x)

list.indexOf(x)

list.lastIndexOf(x)

list.size()

list.isEmpty()

list.clear()

list.toArray()

List ↔ sorting
Collections.sort(list)

Collections.sort(list, Comparator.reverseOrder())

list.sort(Comparator.naturalOrder())

list.sort(Comparator.reverseOrder())

⭐ COLLECTIONS
Collections.sort(list)

Collections.reverse(list)

Collections.shuffle(list)

Collections.max(list)

Collections.min(list)

Collections.frequency(list, x)

Collections.binarySearch(list, x)

Collections.swap(list, i, j)

Collections.fill(list, x)

⭐ HASHSET
Set<Integer> set = new HashSet<>();

set.add(x)

set.remove(x)

set.contains(x)

set.size()

set.isEmpty()

set.clear()

Set operations ⭐
set.addAll(other)

set.removeAll(other)

set.retainAll(other)

set.containsAll(other)

addAll      → UNION
retainAll   → INTERSECTION
removeAll   → DIFFERENCE
⭐ HASHMAP
Map<Integer, Integer> map = new HashMap<>();

map.put(key, value)

map.get(key)

map.getOrDefault(key, 0)

map.containsKey(key)

map.containsValue(value)

map.remove(key)

map.size()

map.isEmpty()

map.clear()

⭐ Frequency pattern
map.put(x, map.getOrDefault(x, 0) + 1);

Update
map.put(key, map.get(key) + 1);

Safe update
map.put(key, map.getOrDefault(key, 0) + 1);

Important Map functions
map.putIfAbsent(key, value)

map.replace(key, value)

map.replaceAll((k, v) -> newValue)

map.computeIfAbsent(key, k -> new ArrayList<>())

map.computeIfPresent(key, (k, v) -> newValue)

⭐ MAP LOOPING
for (Map.Entry<Integer, Integer> e : map.entrySet()) {
    e.getKey();
    e.getValue();
}

for (Integer key : map.keySet()) {
    map.get(key);
}

for (Integer value : map.values()) {
}

map.forEach((key, value) -> {
});

⭐ QUEUE
Queue<Integer> q = new LinkedList<>();

q.offer(x)

q.poll()

q.peek()

q.isEmpty()

q.size()

Remember
offer → INSERT
poll  → REMOVE + RETURN
peek  → RETURN
⭐ DEQUE
Deque<Integer> dq = new ArrayDeque<>();

dq.addFirst(x)
dq.addLast(x)

dq.offerFirst(x)
dq.offerLast(x)

dq.removeFirst()
dq.removeLast()

dq.pollFirst()
dq.pollLast()

dq.peekFirst()
dq.peekLast()

⭐ STACK
Prefer:

Deque<Integer> stack = new ArrayDeque<>();

stack.push(x)

stack.pop()

stack.peek()

stack.isEmpty()

Remember
push → INSERT
pop  → REMOVE + RETURN
peek → RETURN
⭐ PRIORITY QUEUE / HEAP
Min Heap
PriorityQueue<Integer> pq = new PriorityQueue<>();

pq.offer(x)

pq.poll()

pq.peek()

pq.size()

pq.isEmpty()

Max Heap
PriorityQueue<Integer> pq =
    new PriorityQueue<>(Comparator.reverseOrder());

Object
PriorityQueue<Employee> pq =
    new PriorityQueue<>(
        Comparator.comparing(Employee::getSalary)
    );

Remember
peek → smallest/largest
poll → remove smallest/largest
offer → insert
⭐ CHARACTER
Character.isLetter(c)

Character.isDigit(c)

Character.isLetterOrDigit(c)

Character.isWhitespace(c)

Character.isUpperCase(c)

Character.isLowerCase(c)

Character.toUpperCase(c)

Character.toLowerCase(c)

⭐ MATH
Math.max(a, b)

Math.min(a, b)

Math.abs(x)

Math.pow(a, b)

Math.sqrt(x)

Math.ceil(x)

Math.floor(x)

Math.round(x)

Math.random()

Integer limits
Integer.MAX_VALUE

Integer.MIN_VALUE

Long limits
Long.MAX_VALUE

Long.MIN_VALUE

⭐ CONVERSION
String → int
Integer.parseInt("123")

String → long
Long.parseLong("123")

int → String
String.valueOf(123)

Integer.toString(123)

char → int
c - '0'

int → char
(char) ('0' + x)

⭐ SORTING / COMPARATOR
Numbers ascending
Arrays.sort(arr)

list.sort(Comparator.naturalOrder())

Descending
list.sort(Comparator.reverseOrder())

Object
list.sort(
    Comparator.comparing(Employee::getSalary)
);

Descending
list.sort(
    Comparator.comparing(Employee::getSalary).reversed()
);

Multiple fields
list.sort(
    Comparator.comparing(Employee::getDepartment)
        .thenComparing(Employee::getSalary)
);

⭐ LOOP SHORTCUTS
Array
for (int i = 0; i < arr.length; i++) {
}

List
for (int i = 0; i < list.size(); i++) {
}

Enhanced
for (int x : arr) {
}

for (int x : list) {
}

Reverse
for (int i = arr.length - 1; i >= 0; i--) {
}

⭐ SWAP
int temp = arr[i];
arr[i] = arr[j];
arr[j] = temp;

⭐ COMMON ARRAY PATTERNS
Initialize maximum
int max = Integer.MIN_VALUE;

Initialize minimum
int min = Integer.MAX_VALUE;

Update max
max = Math.max(max, x);

Update min
min = Math.min(min, x);

Running sum
sum += x;

Frequency
freq.put(x, freq.getOrDefault(x, 0) + 1);

⭐ SUBSTRING / TWO POINTER BASICS
int left = 0;
int right = s.length() - 1;

while (left < right) {
    // ...
    left++;
    right--;
}

Array
int left = 0;
int right = arr.length - 1;

⭐ BINARY SEARCH
Arrays.binarySearch(arr, target)
Manual:

int left = 0;
int right = arr.length - 1;

while (left <= right) {
    int mid = left + (right - left) / 2;

    if (arr[mid] == target) {
        return mid;
    } else if (arr[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}
⭐ COMMON JAVA 8 OPTIONAL
Optional.of(value)

Optional.ofNullable(value)

Optional.empty()

optional.isPresent()

optional.get()

optional.orElse(defaultValue)

optional.orElseGet(() -> defaultValue)

optional.orElseThrow(...)
Most useful:

.findFirst().orElse(null)
.max(...).orElse(null)

.min(...).orElse(null)

⭐ MOST IMPORTANT Collections / Arrays / Map / List
Arrays
├── sort()
├── toString()
├── binarySearch()
├── equals()
├── fill()
└── copyOf()

Collections
├── sort()
├── reverse()
├── max()
├── min()
├── frequency()
├── binarySearch()
└── swap()

List
├── add()
├── get()
├── set()
├── remove()
├── contains()
├── indexOf()
├── size()
└── isEmpty()

Set
├── add()
├── remove()
├── contains()
├── addAll()
├── retainAll()
└── removeAll()

Map
├── put()
├── get()
├── getOrDefault()
├── putIfAbsent()
├── containsKey()
├── remove()
├── keySet()
├── values()
├── entrySet()
└── forEach()

Queue
├── offer()
├── poll()
└── peek()

Stack / Deque
├── push()
├── pop()
└── peek()

PriorityQueue
├── offer()
├── poll()
└── peek()

String
├── length()
├── charAt()
├── substring()
├── indexOf()
├── contains()
├── equals()
├── split()
├── replace()
├── toCharArray()
└── toUpperCase()/toLowerCase()

StringBuilder
├── append()
├── delete()
├── insert()
├── reverse()
├── charAt()
└── toString()
⭐⭐⭐ THE ONES TO MEMORIZE FIRST
map.getOrDefault(x, 0)

map.put(x, value)

map.containsKey(x)

map.entrySet()

list.add(x)

list.get(i)

list.set(i, x)

list.remove(i)

list.contains(x)

list.size()

set.add(x)

set.contains(x)

set.remove(x)

q.offer(x)
q.poll()
q.peek()

stack.push(x)
stack.pop()
stack.peek()

pq.offer(x)
pq.poll()
pq.peek()

s.length()
s.charAt(i)
s.substring(a, b)
s.indexOf(x)
s.contains(x)
s.equals(x)
s.split(" ")
s.toCharArray()

sb.append(x)
sb.reverse()
sb.toString()

Arrays.sort(arr)

Collections.sort(list)

Math.max(a,b)
Math.min(a,b)
Math.abs(x)

Integer.MAX_VALUE
Integer.MIN_VALUE

Character.isDigit(c)
Character.isLetter(c)

Integer.parseInt(s)
String.valueOf(x)
c - '0'

same for buiding the sql queries
