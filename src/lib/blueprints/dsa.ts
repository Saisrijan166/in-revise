import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const dsa: Blueprint = {
  tagline: "From a problem to the right data structure, algorithm and technique — judged by Big-O.",
  legend: legendOf([
    "Problem & analysis",
    "Linear structures",
    "Non-linear structures",
    "Algorithms",
    "Techniques",
  ]),
  alt:
    "A decision map of data structures and algorithms. A problem with its constraints is always judged by " +
    "Big-O (time and space), and drives the choice of structure. Linear structures: array, linked list, " +
    "stack (LIFO), queue (FIFO), hash map (O(1) lookup). Non-linear structures: tree and BST, heap " +
    "(priority), graph, trie. Algorithms: sorting (O(n log n)), binary search (O(log n)), BFS and DFS " +
    "traversal, dynamic programming, greedy. Arrays feed sorting and binary search; graphs and trees feed " +
    "BFS/DFS. Techniques: two pointers and sliding window over arrays, recursion and backtracking over " +
    "trees, and divide and conquer behind sorting.",
  baseline: "Big-O analysis",
  chart: `flowchart TD
  prob(["Problem + constraints"]):::f
  prob --> big["Analyse Big-O: time + space"]:::o
  prob --> pick{{"Pick a structure"}}:::f

  subgraph LIN["1 . Linear structures"]
    direction LR
    arr["Array"]:::c
    lkl["Linked List"]:::c
    stk["Stack (LIFO)"]:::c
    que["Queue (FIFO)"]:::c
    hm["Hash Map O(1)"]:::c
  end
  pick --> arr
  pick --> lkl
  pick --> hm

  subgraph NON["2 . Non-linear structures"]
    direction LR
    tree["Tree / BST"]:::d
    heap["Heap (priority)"]:::d
    grf["Graph"]:::d
    tri["Trie"]:::d
  end
  pick --> tree
  pick --> grf

  subgraph ALG["3 . Algorithms"]
    direction LR
    srt["Sorting O(n log n)"]:::x
    bse["Binary search O(log n)"]:::x
    bfs["BFS / DFS"]:::x
    dp["Dynamic programming"]:::x
    grd["Greedy"]:::x
  end
  arr --> srt
  arr --> bse
  grf --> bfs
  tree --> bfs

  subgraph TECH["4 . Techniques"]
    direction LR
    tp["Two pointers"]:::o
    sw["Sliding window"]:::o
    rec["Recursion / backtracking"]:::o
    dac["Divide and conquer"]:::o
  end
  arr -.-> tp
  arr -.-> sw
  tree -.-> rec
  srt -.-> dac
  big -.-> srt
${CLASSDEFS}`,
};
