// AUTO-GENERATED from reference/dsa.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs dsa
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const dsaCheatsheet: CheatDoc = {
 "title": "DSA with Java",
 "tagline": "Data structures and algorithms on one page — ideas, Big-O and templates.",
 "chapters": [
  {
   "id": "dsa-with-java-cheat-sheet",
   "title": "DSA with Java — Cheat Sheet"
  },
  {
   "id": "complexity",
   "title": "Complexity"
  },
  {
   "id": "linear-structures",
   "title": "Linear Structures"
  },
  {
   "id": "hashing",
   "title": "Hashing"
  },
  {
   "id": "trees",
   "title": "Trees"
  },
  {
   "id": "heap-and-priority-queue",
   "title": "Heap and Priority Queue"
  },
  {
   "id": "graphs",
   "title": "Graphs"
  },
  {
   "id": "specialized-structures",
   "title": "Specialized Structures"
  },
  {
   "id": "sorting-and-searching",
   "title": "Sorting and Searching"
  },
  {
   "id": "recursion",
   "title": "Recursion"
  },
  {
   "id": "problem-patterns",
   "title": "Problem Patterns"
  },
  {
   "id": "choosing-a-data-structure",
   "title": "Choosing a Data Structure"
  },
  {
   "id": "java-coding-toolkit",
   "title": "Java Coding Toolkit"
  },
  {
   "id": "common-why-x-vs-y-comparisons",
   "title": "Common \"Why X vs Y?\" Comparisons"
  }
 ],
 "sections": [
  {
   "id": "s-dsa-with-java-cheat-sheet",
   "num": null,
   "title": "DSA with Java — Cheat Sheet",
   "stars": 0,
   "chapter": "dsa-with-java-cheat-sheet",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Idea-level revision for data-structure and algorithm interviews: what each structure is, when to use it, its operations and Big-O, the core algorithm patterns with tiny Java templates, and the comparisons interviewers ask."
      }
     ]
    }
   ]
  },
  {
   "id": "s-big-o-how-to-reason",
   "num": null,
   "title": "Big-O — how to reason",
   "stars": 3,
   "chapter": "complexity",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Big-O describes how work grows as input "
      },
      {
       "type": "inlineCode",
       "value": "n"
      },
      {
       "type": "text",
       "value": " grows. It is about the shape of growth, not exact counts."
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Big-O"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Name"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Typical example"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "O(1)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Constant"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Array access by index"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "O(log n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Logarithmic"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Binary search"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "O(n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Linear"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Linear search"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "O(n log n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Linearithmic"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Merge sort"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "O(n²)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Quadratic"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Bubble sort"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "O(2ⁿ)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Exponential"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Subset recursion"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "O(n!)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Factorial"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Brute-force permutations"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Growth order (slowest-growing first): "
      },
      {
       "type": "inlineCode",
       "value": "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)"
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Simplify by dropping constants and lower terms: "
      },
      {
       "type": "inlineCode",
       "value": "O(2n) → O(n)"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "O(5n²) → O(n²)"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "O(n + n²) → O(n²)"
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: ignore constants and keep only the fastest-growing term."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-space-complexity",
   "num": null,
   "title": "Space complexity",
   "stars": 0,
   "chapter": "complexity",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Memory the algorithm uses. "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Input space"
        }
       ]
      },
      {
       "type": "text",
       "value": " (the given data) is separate from "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "auxiliary space"
        }
       ]
      },
      {
       "type": "text",
       "value": " (extra memory the algorithm allocates). In interviews \"space complexity\" usually means auxiliary space."
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: an in-place algorithm uses O(1) auxiliary space and edits the input directly."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-array",
   "num": null,
   "title": "Array",
   "stars": 2,
   "chapter": "linear-structures",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Elements in "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "contiguous memory"
        }
       ]
      },
      {
       "type": "text",
       "value": ", so the address of any index is computed directly: "
      },
      {
       "type": "inlineCode",
       "value": "address = base + index × size"
      },
      {
       "type": "text",
       "value": ". That is why random access is O(1)."
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Operation"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Big-O"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Access / update by index"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Search"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Insert / delete at middle or start"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Insert at end (space available)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Strengths: fast indexing, cache-friendly, low overhead."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Weaknesses: middle insert/delete shifts elements; fixed size cannot grow; needs contiguous memory."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: array access is O(1), but array "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "search"
          }
         ]
        },
        {
         "type": "text",
         "value": " is O(n)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-dynamic-array-arraylist",
   "num": null,
   "title": "Dynamic Array / ArrayList",
   "stars": 1,
   "chapter": "linear-structures",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "An array that resizes itself. When full, it creates a larger array and copies elements over."
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "inlineCode",
           "value": "get"
          },
          {
           "type": "text",
           "value": "/"
          },
          {
           "type": "inlineCode",
           "value": "set"
          },
          {
           "type": "text",
           "value": ": O(1). "
          },
          {
           "type": "inlineCode",
           "value": "add"
          },
          {
           "type": "text",
           "value": " at end: "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "amortized O(1)"
            }
           ]
          },
          {
           "type": "text",
           "value": ". Insert/remove in middle: O(n)."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Amortized O(1)"
            }
           ]
          },
          {
           "type": "text",
           "value": ": most appends are O(1); the occasional O(n) resize, spread over many appends, averages to O(1)."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: "
        },
        {
         "type": "inlineCode",
         "value": "ArrayList"
        },
        {
         "type": "text",
         "value": " is the default list unless you specifically need linked-list behaviour."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-linked-list",
   "num": null,
   "title": "Linked List",
   "stars": 1,
   "chapter": "linear-structures",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Nodes connected by references. "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Singly"
        }
       ]
      },
      {
       "type": "text",
       "value": ": each node is "
      },
      {
       "type": "inlineCode",
       "value": "[data | next]"
      },
      {
       "type": "text",
       "value": ". "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Doubly"
        }
       ]
      },
      {
       "type": "text",
       "value": ": "
      },
      {
       "type": "inlineCode",
       "value": "[prev | data | next]"
      },
      {
       "type": "text",
       "value": ", so you can walk both ways and delete a known node easily."
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Operation"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Big-O"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Access by index / search"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Insert at head / delete head"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Insert/delete at a "
          },
          {
           "type": "emphasis",
           "children": [
            {
             "type": "text",
             "value": "known"
            }
           ]
          },
          {
           "type": "text",
           "value": " node"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: linked-list insertion is O(1) only when you already have the position — "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "finding"
          }
         ]
        },
        {
         "type": "text",
         "value": " it is O(n)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-stack",
   "num": null,
   "title": "Stack",
   "stars": 1,
   "chapter": "linear-structures",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "LIFO"
        }
       ]
      },
      {
       "type": "text",
       "value": " — last in, first out. "
      },
      {
       "type": "inlineCode",
       "value": "push"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "pop"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "peek"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "isEmpty"
      },
      {
       "type": "text",
       "value": " are all O(1)."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Uses: function call stack, undo/redo, parentheses matching, expression evaluation, DFS, backtracking."
      }
     ]
    },
    {
     "type": "code",
     "value": "Deque<Integer> stack = new ArrayDeque<>();\nstack.push(x);\nstack.pop();   // remove + return top\nstack.peek();  // view top",
     "lang": "java"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: prefer "
        },
        {
         "type": "inlineCode",
         "value": "ArrayDeque"
        },
        {
         "type": "text",
         "value": " as a stack over the legacy "
        },
        {
         "type": "inlineCode",
         "value": "Stack"
        },
        {
         "type": "text",
         "value": " class. Overflow = too-deep recursion; underflow = pop on empty."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-queue",
   "num": null,
   "title": "Queue",
   "stars": 1,
   "chapter": "linear-structures",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "FIFO"
        }
       ]
      },
      {
       "type": "text",
       "value": " — first in, first out. "
      },
      {
       "type": "inlineCode",
       "value": "enqueue"
      },
      {
       "type": "text",
       "value": " (rear), "
      },
      {
       "type": "inlineCode",
       "value": "dequeue"
      },
      {
       "type": "text",
       "value": " (front), "
      },
      {
       "type": "inlineCode",
       "value": "peek"
      },
      {
       "type": "text",
       "value": " are O(1)."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Uses: BFS, scheduling, task/message processing, producer-consumer."
      }
     ]
    },
    {
     "type": "code",
     "value": "Queue<Integer> q = new LinkedList<>();\nq.offer(x);  // insert at rear\nq.poll();    // remove + return front\nq.peek();    // view front",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-deque",
   "num": null,
   "title": "Deque",
   "stars": 0,
   "chapter": "linear-structures",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Double-ended queue: insert and remove at "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "both ends"
        }
       ]
      },
      {
       "type": "text",
       "value": ", all O(1). Backed by "
      },
      {
       "type": "inlineCode",
       "value": "ArrayDeque"
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Uses: sliding-window maxima (monotonic queue), BFS variants, implementing a stack or queue."
      }
     ]
    },
    {
     "type": "code",
     "value": "Deque<Integer> dq = new ArrayDeque<>();\ndq.addFirst(x); dq.addLast(x);\ndq.pollFirst(); dq.pollLast();",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-hash-table",
   "num": null,
   "title": "Hash Table",
   "stars": 2,
   "chapter": "hashing",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Stores "
      },
      {
       "type": "inlineCode",
       "value": "key → value"
      },
      {
       "type": "text",
       "value": ". A "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "hash function"
        }
       ]
      },
      {
       "type": "text",
       "value": " maps a key to a bucket index, giving average O(1) insert, search and delete. Worst case is O(n) when many keys collide."
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: HashMap is "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "average"
          }
         ]
        },
        {
         "type": "text",
         "value": " O(1), not guaranteed O(1)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-hash-collision",
   "num": null,
   "title": "Hash Collision",
   "stars": 0,
   "chapter": "hashing",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Two keys map to the same bucket. Handled by:"
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Separate chaining"
            }
           ]
          },
          {
           "type": "text",
           "value": " — each bucket holds a list (or tree) of entries."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Open addressing"
            }
           ]
          },
          {
           "type": "text",
           "value": " — probe for another free slot (linear probing, quadratic probing, double hashing)."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-hashmap-and-hashset-java",
   "num": null,
   "title": "HashMap and HashSet (Java)",
   "stars": 2,
   "chapter": "hashing",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "inlineCode",
           "value": "HashMap<K,V>"
          },
          {
           "type": "text",
           "value": ": key-value, average O(1), one null key allowed, many null values, "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "no order guarantee"
            }
           ]
          },
          {
           "type": "text",
           "value": ", not synchronized."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "inlineCode",
           "value": "HashSet<E>"
          },
          {
           "type": "text",
           "value": ": unique values only, backed internally by a HashMap."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "HashMap"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "HashSet"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Key-value"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Values only"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "put(k,v)"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "get(k)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "add(x)"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "contains(x)"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: never rely on HashMap/HashSet iteration order."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-tree-terminology",
   "num": null,
   "title": "Tree terminology",
   "stars": 1,
   "chapter": "trees",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Hierarchical structure of nodes. "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Root"
        }
       ]
      },
      {
       "type": "text",
       "value": " (top), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "parent/child"
        }
       ]
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "leaf"
        }
       ]
      },
      {
       "type": "text",
       "value": " (no children), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "sibling"
        }
       ]
      },
      {
       "type": "text",
       "value": " (same parent). "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Depth"
        }
       ]
      },
      {
       "type": "text",
       "value": " = distance from root down to a node; "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "height"
        }
       ]
      },
      {
       "type": "text",
       "value": " = longest path from a node down to a leaf."
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: depth is measured from the root; height is measured toward the deepest leaf."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-binary-tree-vs-bst",
   "num": null,
   "title": "Binary Tree vs BST",
   "stars": 3,
   "chapter": "trees",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Binary tree"
            }
           ]
          },
          {
           "type": "text",
           "value": ": every node has at most two children ("
          },
          {
           "type": "inlineCode",
           "value": "left"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "right"
          },
          {
           "type": "text",
           "value": "). No ordering."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Binary Search Tree (BST)"
            }
           ]
          },
          {
           "type": "text",
           "value": ": "
          },
          {
           "type": "inlineCode",
           "value": "left subtree < node < right subtree"
          },
          {
           "type": "text",
           "value": " for every node, enabling ordered search."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Balanced BST"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Big-O"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Worst case (skewed)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Search / insert / delete"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(log n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A skewed BST degenerates into a linked list, so operations fall to O(n)."
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: a binary tree is not a BST, and a plain BST is not guaranteed O(log n)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-bst-traversals",
   "num": null,
   "title": "BST traversals",
   "stars": 2,
   "chapter": "trees",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Inorder"
            }
           ]
          },
          {
           "type": "text",
           "value": " (Left → Root → Right): on a BST this yields "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "sorted order"
            }
           ]
          },
          {
           "type": "text",
           "value": " — a classic interview fact."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Preorder"
            }
           ]
          },
          {
           "type": "text",
           "value": " (Root → Left → Right): serialising / copying a tree."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Postorder"
            }
           ]
          },
          {
           "type": "text",
           "value": " (Left → Right → Root): deleting a tree, bottom-up work."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Level order"
            }
           ]
          },
          {
           "type": "text",
           "value": " (level by level): uses a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Queue"
            }
           ]
          },
          {
           "type": "text",
           "value": " (BFS on the tree)."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-balanced-and-special-trees",
   "num": null,
   "title": "Balanced and special trees",
   "stars": 0,
   "chapter": "trees",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Balancing keeps height ≈ log n, so operations stay O(log n) instead of sliding to O(n). "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "AVL"
        }
       ]
      },
      {
       "type": "text",
       "value": " and "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Red-Black"
        }
       ]
      },
      {
       "type": "text",
       "value": " trees are self-balancing BSTs."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Tree shapes:"
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Complete"
            }
           ]
          },
          {
           "type": "text",
           "value": ": all levels full except possibly the last, filled left to right (used by binary heaps)."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Full"
            }
           ]
          },
          {
           "type": "text",
           "value": ": every node has 0 or 2 children."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Perfect"
            }
           ]
          },
          {
           "type": "text",
           "value": ": all internal nodes have 2 children and all leaves are on the same level."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-heap",
   "num": null,
   "title": "Heap",
   "stars": 2,
   "chapter": "heap-and-priority-queue",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "complete binary tree"
        }
       ]
      },
      {
       "type": "text",
       "value": " with the heap property. "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Min heap"
        }
       ]
      },
      {
       "type": "text",
       "value": ": parent ≤ children (min at root). "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Max heap"
        }
       ]
      },
      {
       "type": "text",
       "value": ": parent ≥ children (max at root)."
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Operation"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Big-O"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Peek min/max"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Insert / remove root"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(log n)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Build heap"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Search arbitrary element"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: a heap is not sorted — only the parent-child relationship holds."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-priority-queue",
   "num": null,
   "title": "Priority Queue",
   "stars": 1,
   "chapter": "heap-and-priority-queue",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Processes elements by priority, not arrival order. Java's "
      },
      {
       "type": "inlineCode",
       "value": "PriorityQueue"
      },
      {
       "type": "text",
       "value": " is a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "min heap"
        }
       ]
      },
      {
       "type": "text",
       "value": " by default."
      }
     ]
    },
    {
     "type": "code",
     "value": "PriorityQueue<Integer> min = new PriorityQueue<>();\nPriorityQueue<Integer> max = new PriorityQueue<>(Comparator.reverseOrder());\n// peek O(1), offer/poll O(log n)",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Uses: top-K, Kth largest/smallest, Dijkstra, scheduling, running median, merge K sorted lists."
      }
     ]
    }
   ]
  },
  {
   "id": "s-graph-basics",
   "num": null,
   "title": "Graph basics",
   "stars": 1,
   "chapter": "graphs",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Vertices (nodes) + edges. Edges can be "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "directed/undirected"
        }
       ]
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "weighted/unweighted"
        }
       ]
      },
      {
       "type": "text",
       "value": "; a graph can be "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "cyclic/acyclic"
        }
       ]
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    }
   ]
  },
  {
   "id": "s-representation",
   "num": null,
   "title": "Representation",
   "stars": 2,
   "chapter": "graphs",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": []
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Adjacency Matrix"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Adjacency List"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Edge lookup"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(degree)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Space"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(V²)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(V + E)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Best for"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Dense graphs"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Sparse graphs"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Sparse means "
      },
      {
       "type": "inlineCode",
       "value": "E ≈ V"
      },
      {
       "type": "text",
       "value": " (use a list); dense means "
      },
      {
       "type": "inlineCode",
       "value": "E ≈ V²"
      },
      {
       "type": "text",
       "value": " (a matrix is reasonable)."
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: most interview graph problems use an adjacency list."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-bfs",
   "num": null,
   "title": "BFS",
   "stars": 2,
   "chapter": "graphs",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Breadth-First Search explores level by level using a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Queue"
        }
       ]
      },
      {
       "type": "text",
       "value": ". O(V + E) with an adjacency list."
      }
     ]
    },
    {
     "type": "code",
     "value": "Queue<Integer> q = new LinkedList<>();\nq.offer(start); visited.add(start);\nwhile (!q.isEmpty()) {\n    int node = q.poll();\n    for (int nb : adj.get(node))\n        if (visited.add(nb)) q.offer(nb);\n}",
     "lang": "java"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: on an "
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "unweighted"
          }
         ]
        },
        {
         "type": "text",
         "value": " graph, BFS gives the shortest path (fewest edges). It does "
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "not"
          }
         ]
        },
        {
         "type": "text",
         "value": " on weighted graphs."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-dfs",
   "num": null,
   "title": "DFS",
   "stars": 2,
   "chapter": "graphs",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Depth-First Search goes as deep as possible before backtracking, using "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "recursion or a stack"
        }
       ]
      },
      {
       "type": "text",
       "value": ". O(V + E)."
      }
     ]
    },
    {
     "type": "code",
     "value": "void dfs(int node) {\n    visited.add(node);\n    for (int nb : adj.get(node))\n        if (!visited.contains(nb)) dfs(nb);\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Uses: cycle detection, connected components, path finding, topological sort, backtracking, maze problems."
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: DFS = stack/recursion; BFS = queue. DFS does not give a shortest path in general."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-trie",
   "num": null,
   "title": "Trie",
   "stars": 1,
   "chapter": "specialized-structures",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A tree keyed by characters, built for "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "string prefixes"
        }
       ]
      },
      {
       "type": "text",
       "value": ". For a word of length "
      },
      {
       "type": "inlineCode",
       "value": "L"
      },
      {
       "type": "text",
       "value": ", insert / search / prefix-search are all O(L)."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Uses: autocomplete, dictionary lookups, prefix matching, spell checking."
      }
     ]
    }
   ]
  },
  {
   "id": "s-union-find-disjoint-set",
   "num": null,
   "title": "Union-Find (Disjoint Set)",
   "stars": 1,
   "chapter": "specialized-structures",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Tracks which elements belong to the same group. Two operations: "
      },
      {
       "type": "inlineCode",
       "value": "find(x)"
      },
      {
       "type": "text",
       "value": " (which group) and "
      },
      {
       "type": "inlineCode",
       "value": "union(a, b)"
      },
      {
       "type": "text",
       "value": " (merge groups)."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Optimisations: "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "path compression"
        }
       ]
      },
      {
       "type": "text",
       "value": " (flatten the tree on find) and "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "union by rank/size"
        }
       ]
      },
      {
       "type": "text",
       "value": " (attach smaller under larger). Together they give near-constant "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "O(α(n))"
        }
       ]
      },
      {
       "type": "text",
       "value": " amortised (inverse Ackermann)."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Uses: cycle detection, connected components, Kruskal's MST, network connectivity."
      }
     ]
    }
   ]
  },
  {
   "id": "s-sorting-algorithms",
   "num": null,
   "title": "Sorting algorithms",
   "stars": 2,
   "chapter": "sorting-and-searching",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
      null,
      null,
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Algorithm"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Best"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Average"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Worst"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Stable"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Bubble"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n²)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n²)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Yes"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Selection"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n²)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n²)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n²)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "No"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Insertion"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n²)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n²)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Yes"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Merge"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n log n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n log n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n log n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Yes"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Quick"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n log n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n log n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n²)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "No"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Heap"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n log n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n log n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n log n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "No"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Stable"
            }
           ]
          },
          {
           "type": "text",
           "value": " = equal elements keep their relative order (matters when sorting by one field repeatedly)."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Merge vs Quick"
            }
           ]
          },
          {
           "type": "text",
           "value": ": merge is stable and guaranteed O(n log n) but needs O(n) extra space; quick sorts in place and is usually faster but has an O(n²) worst case on bad pivots."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Heap sort"
            }
           ]
          },
          {
           "type": "text",
           "value": ": guaranteed O(n log n), in place, not stable."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-linear-vs-binary-search",
   "num": null,
   "title": "Linear vs Binary Search",
   "stars": 2,
   "chapter": "sorting-and-searching",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Linear search"
            }
           ]
          },
          {
           "type": "text",
           "value": ": check elements one by one, O(n), works on sorted or unsorted data."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Binary search"
            }
           ]
          },
          {
           "type": "text",
           "value": ": repeatedly halve the search space, O(log n), but needs "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "sorted data or a monotonic condition"
            }
           ]
          },
          {
           "type": "text",
           "value": "."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "int left = 0, right = arr.length - 1;\nwhile (left <= right) {\n    int mid = left + (right - left) / 2;      // avoids overflow\n    if (arr[mid] == target) return mid;\n    else if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n}",
     "lang": "java"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: binary search is not valid on arbitrary unsorted data — you need order or a monotonic answer."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-recursion",
   "num": null,
   "title": "Recursion",
   "stars": 0,
   "chapter": "recursion",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A function that calls itself. Each call adds a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "stack frame"
        }
       ]
      },
      {
       "type": "text",
       "value": "; too much depth causes a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "stack overflow"
        }
       ]
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Every recursion needs: a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "base case"
        }
       ]
      },
      {
       "type": "text",
       "value": ", a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "recursive case"
        }
       ]
      },
      {
       "type": "text",
       "value": ", and "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "progress toward the base case"
        }
       ]
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: without progress to a base case, recursion never terminates and overflows the stack."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-problem-patterns",
   "num": null,
   "title": "Problem Patterns",
   "stars": 0,
   "chapter": "problem-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Patterns matter more than memorising individual problems."
      }
     ]
    }
   ]
  },
  {
   "id": "s-two-pointers",
   "num": null,
   "title": "Two Pointers",
   "stars": 0,
   "chapter": "problem-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Two indices moving through data, often from both ends. Use for sorted arrays, pair sums, palindromes, removing duplicates."
      }
     ]
    },
    {
     "type": "code",
     "value": "int l = 0, r = arr.length - 1;\nwhile (l < r) { /* compare / move */ l++; r--; }",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-sliding-window",
   "num": null,
   "title": "Sliding Window",
   "stars": 0,
   "chapter": "problem-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A moving sub-range over an array/string. Use for subarray/substring problems, longest/shortest range, fixed or variable windows. Typically O(n)."
      }
     ]
    }
   ]
  },
  {
   "id": "s-monotonic-stack",
   "num": null,
   "title": "Monotonic Stack",
   "stars": 0,
   "chapter": "problem-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A stack kept in increasing or decreasing order. Use for Next Greater/Smaller Element, stock span, largest rectangle in histogram. O(n) because each element is pushed and popped at most once."
      }
     ]
    }
   ]
  },
  {
   "id": "s-frequency-map",
   "num": null,
   "title": "Frequency Map",
   "stars": 0,
   "chapter": "problem-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A HashMap of counts. Use for counting, duplicates, Two Sum, anagrams."
      }
     ]
    },
    {
     "type": "code",
     "value": "map.put(x, map.getOrDefault(x, 0) + 1);",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-backtracking-dfs",
   "num": null,
   "title": "Backtracking (DFS)",
   "stars": 0,
   "chapter": "problem-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Explore choices, recurse, undo. Use for combinations, permutations, subsets, mazes, N-Queens — any decision/exploration problem."
      }
     ]
    }
   ]
  },
  {
   "id": "s-binary-search-on-answer",
   "num": null,
   "title": "Binary Search on Answer",
   "stars": 0,
   "chapter": "problem-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Binary-search the "
      },
      {
       "type": "emphasis",
       "children": [
        {
         "type": "text",
         "value": "answer space"
        }
       ]
      },
      {
       "type": "text",
       "value": " when the feasibility check is "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "monotonic"
        }
       ]
      },
      {
       "type": "text",
       "value": " (\"minimum/maximum possible X\"). No array to search — just a yes/no condition that flips once."
      }
     ]
    }
   ]
  },
  {
   "id": "s-dynamic-programming",
   "num": null,
   "title": "Dynamic Programming",
   "stars": 2,
   "chapter": "problem-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Break a problem into overlapping subproblems and reuse results. A DP has a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "state"
        }
       ]
      },
      {
       "type": "text",
       "value": ", a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "transition"
        }
       ]
      },
      {
       "type": "text",
       "value": ", and a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "base case"
        }
       ]
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Signals: overlapping subproblems, optimal substructure, \"how many ways…\", \"max/min number of…\"."
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: DP reuses subproblem answers; greedy commits to a local best at each step without revisiting."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-choosing-a-data-structure",
   "num": null,
   "title": "Choosing a Data Structure",
   "stars": 0,
   "chapter": "choosing-a-data-structure",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Requirement"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Best choice"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Fast index access"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Array / ArrayList"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Frequent insert at the beginning"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "LinkedList / Deque"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "LIFO"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Stack / Deque"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "FIFO"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Queue / Deque"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Fast key lookup"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "HashMap"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Unique values"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "HashSet"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Sorted unique values"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "TreeSet"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Sorted key-value pairs"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "TreeMap"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Repeated min/max"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Heap / PriorityQueue"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Hierarchy"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Tree"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Ordered search"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "BST"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Prefix / string search"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Trie"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Relationships / networks"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Graph"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Connectivity / group merging"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Union-Find"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-complexity-master-table",
   "num": null,
   "title": "Complexity master table",
   "stars": 0,
   "chapter": "choosing-a-data-structure",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
      null,
      null,
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Structure"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Access"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Search"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Insert"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Delete"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Array"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "ArrayList"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)*"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Linked List"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)**"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)**"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Stack / Queue"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1) end"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "HashMap / HashSet"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "—"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)*"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)*"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)*"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "BST (balanced)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(log n)*"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(log n)*"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(log n)*"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(log n)*"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Heap"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1) root"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(log n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(log n)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Trie"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "—"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(L)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(L)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(L)"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "*"
      },
      {
       "type": "text",
       "value": " average/amortised  "
      },
      {
       "type": "inlineCode",
       "value": "**"
      },
      {
       "type": "text",
       "value": " if the node/position is known"
      }
     ]
    }
   ]
  },
  {
   "id": "s-java-coding-toolkit",
   "num": null,
   "title": "Java Coding Toolkit",
   "stars": 0,
   "chapter": "java-coding-toolkit",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The methods that come up in coding rounds. Group them by structure."
      }
     ]
    }
   ]
  },
  {
   "id": "s-strings-and-stringbuilder",
   "num": null,
   "title": "Strings and StringBuilder",
   "stars": 2,
   "chapter": "java-coding-toolkit",
   "nodes": [
    {
     "type": "code",
     "value": "s.length(); s.charAt(i); s.substring(a, b);\ns.indexOf(\"x\"); s.contains(\"x\"); s.equals(\"x\");\ns.split(\" \"); s.toCharArray(); s.replace(\"a\", \"b\");\ns.toUpperCase(); s.trim();\n\nStringBuilder sb = new StringBuilder();\nsb.append(\"x\"); sb.insert(i, \"x\"); sb.deleteCharAt(i);\nsb.reverse(); sb.toString();",
     "lang": "java"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: strings are immutable — build up text with "
        },
        {
         "type": "inlineCode",
         "value": "StringBuilder"
        },
        {
         "type": "text",
         "value": ", not "
        },
        {
         "type": "inlineCode",
         "value": "+"
        },
        {
         "type": "text",
         "value": " in a loop."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-arrays-and-collections",
   "num": null,
   "title": "Arrays and Collections",
   "stars": 0,
   "chapter": "java-coding-toolkit",
   "nodes": [
    {
     "type": "code",
     "value": "Arrays.sort(arr); Arrays.fill(arr, v); Arrays.toString(arr);\nArrays.copyOfRange(arr, s, e); Arrays.binarySearch(arr, key);\n\nCollections.sort(list); Collections.reverse(list);\nCollections.max(list); Collections.min(list);\nCollections.frequency(list, x);",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-list-set-map",
   "num": null,
   "title": "List, Set, Map",
   "stars": 3,
   "chapter": "java-coding-toolkit",
   "nodes": [
    {
     "type": "code",
     "value": "list.add(x); list.get(i); list.set(i, v);\nlist.remove(i);                 // by index\nlist.remove(Integer.valueOf(x)); // by value\nlist.contains(x); list.size();\n\nset.add(x); set.contains(x); set.remove(x);\nset.addAll(b);    // union\nset.retainAll(b); // intersection\nset.removeAll(b); // difference\n\nmap.put(k, v); map.get(k); map.getOrDefault(k, 0);\nmap.containsKey(k); map.putIfAbsent(k, v);\nmap.computeIfAbsent(k, x -> new ArrayList<>());\nfor (Map.Entry<K,V> e : map.entrySet()) { e.getKey(); e.getValue(); }",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-comparators-and-conversions",
   "num": null,
   "title": "Comparators and conversions",
   "stars": 0,
   "chapter": "java-coding-toolkit",
   "nodes": [
    {
     "type": "code",
     "value": "list.sort(Comparator.comparing(Employee::getSalary).reversed());\nlist.sort(Comparator.comparing(Employee::getDept)\n                    .thenComparing(Employee::getSalary));\n\nInteger.parseInt(\"123\"); String.valueOf(123);\nint d = c - '0';           // char digit -> int\nchar c = (char) ('0' + d); // int -> char digit\nMath.max(a, b); Math.min(a, b); Math.abs(x);\nInteger.MAX_VALUE; Integer.MIN_VALUE;\nCharacter.isDigit(c); Character.isLetter(c);",
     "lang": "java"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: a handful of calls cover most problems — "
        },
        {
         "type": "inlineCode",
         "value": "getOrDefault"
        },
        {
         "type": "text",
         "value": ", "
        },
        {
         "type": "inlineCode",
         "value": "put"
        },
        {
         "type": "text",
         "value": ", "
        },
        {
         "type": "inlineCode",
         "value": "containsKey"
        },
        {
         "type": "text",
         "value": ", "
        },
        {
         "type": "inlineCode",
         "value": "entrySet"
        },
        {
         "type": "text",
         "value": "; "
        },
        {
         "type": "inlineCode",
         "value": "add"
        },
        {
         "type": "text",
         "value": "/"
        },
        {
         "type": "inlineCode",
         "value": "get"
        },
        {
         "type": "text",
         "value": "/"
        },
        {
         "type": "inlineCode",
         "value": "set"
        },
        {
         "type": "text",
         "value": "/"
        },
        {
         "type": "inlineCode",
         "value": "size"
        },
        {
         "type": "text",
         "value": "; "
        },
        {
         "type": "inlineCode",
         "value": "offer"
        },
        {
         "type": "text",
         "value": "/"
        },
        {
         "type": "inlineCode",
         "value": "poll"
        },
        {
         "type": "text",
         "value": "/"
        },
        {
         "type": "inlineCode",
         "value": "peek"
        },
        {
         "type": "text",
         "value": "; "
        },
        {
         "type": "inlineCode",
         "value": "push"
        },
        {
         "type": "text",
         "value": "/"
        },
        {
         "type": "inlineCode",
         "value": "pop"
        },
        {
         "type": "text",
         "value": "/"
        },
        {
         "type": "inlineCode",
         "value": "peek"
        },
        {
         "type": "text",
         "value": "; "
        },
        {
         "type": "inlineCode",
         "value": "Arrays.sort"
        },
        {
         "type": "text",
         "value": "/"
        },
        {
         "type": "inlineCode",
         "value": "Collections.sort"
        },
        {
         "type": "text",
         "value": "."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-array-vs-linked-list",
   "num": null,
   "title": "Array vs Linked List",
   "stars": 2,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Array"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Linked List"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Contiguous memory"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Scattered nodes"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Access O(1)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Access O(n)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Middle insert O(n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1) at a known node"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Better cache locality"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Extra pointer overhead"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: array for fast indexing; linked list for cheap insert/delete at known positions."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-arraylist-vs-linkedlist",
   "num": null,
   "title": "ArrayList vs LinkedList",
   "stars": 1,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": []
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "ArrayList"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "LinkedList"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Backing"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Dynamic array"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Doubly linked list"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "get(index)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Add at beginning"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Random access"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Excellent"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Poor"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: default to ArrayList unless you need frequent head insert/delete."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-hashmap-vs-treemap-vs-linkedhashmap",
   "num": null,
   "title": "HashMap vs TreeMap vs LinkedHashMap",
   "stars": 2,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
      null,
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": []
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "HashMap"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "LinkedHashMap"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "TreeMap"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Order"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "None"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Insertion/access"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Sorted by key"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Lookup"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1) avg"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1) avg"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(log n)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Backing"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Hash table"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Hash table + list"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Red-Black tree"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: HashMap = fast, LinkedHashMap = fast + order, TreeMap = sorted."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-hashset-vs-treeset-vs-linkedhashset",
   "num": null,
   "title": "HashSet vs TreeSet vs LinkedHashSet",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Same trade-off as the maps: HashSet = uniqueness (O(1)), LinkedHashSet = uniqueness + insertion order, TreeSet = uniqueness + sorted (O(log n))."
      }
     ]
    }
   ]
  },
  {
   "id": "s-stack-vs-queue",
   "num": null,
   "title": "Stack vs Queue",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Stack is "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "LIFO"
        }
       ]
      },
      {
       "type": "text",
       "value": " (last in first out, → DFS); Queue is "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "FIFO"
        }
       ]
      },
      {
       "type": "text",
       "value": " (first in first out, → BFS)."
      }
     ]
    }
   ]
  },
  {
   "id": "s-bfs-vs-dfs",
   "num": null,
   "title": "BFS vs DFS",
   "stars": 2,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "BFS"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "DFS"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Queue"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Stack / recursion"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Explores level by level"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Explores deep first"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Shortest path (unweighted)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Not necessarily shortest"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "More memory on wide graphs"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "More memory on deep graphs"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-heap-vs-bst",
   "num": null,
   "title": "Heap vs BST",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Both give ordered access, but a heap only guarantees the min/max at the root (O(1) peek) and is not sorted; a BST keeps full ordering and supports O(log n) search of any element (when balanced)."
      }
     ]
    }
   ]
  },
  {
   "id": "s-dp-vs-greedy",
   "num": null,
   "title": "DP vs Greedy",
   "stars": 1,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Greedy makes a locally optimal choice at each step and never looks back — fast but only correct when local choices lead to a global optimum. DP explores overlapping subproblems and reuses their answers — correct for more problems but costs more time and space."
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: greedy commits; DP reconsiders by reusing subproblem results."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-adjacency-list-vs-matrix",
   "num": null,
   "title": "Adjacency List vs Matrix",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "List: O(V + E) space, cheap for sparse graphs, slower edge lookup. Matrix: O(V²) space, O(1) edge lookup, fine for dense graphs."
      }
     ]
    }
   ]
  },
  {
   "id": "s-interview-traps",
   "num": null,
   "title": "Interview traps",
   "stars": 2,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Array search is O(n), not O(1)."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Linked-list insertion is O(1) only at a known node (finding it is O(n))."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "BST search is O(log n) only when balanced — skewed is O(n)."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "HashMap is average O(1), worst case O(n)."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "A heap is not fully sorted."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "BFS gives a shortest path only on unweighted graphs."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "DFS uses a stack/recursion, not a queue."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "A binary tree is not a BST."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  }
 ]
};
