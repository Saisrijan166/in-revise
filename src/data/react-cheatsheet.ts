// AUTO-GENERATED from reference/react.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs react
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const reactCheatsheet: CheatDoc = {
 "title": "React & Frontend",
 "tagline": "React on one page — the ideas and the rules to remember.",
 "chapters": [
  {
   "id": "how-react-renders",
   "title": "How React Renders"
  },
  {
   "id": "memoization-tools",
   "title": "Memoization Tools"
  },
  {
   "id": "rendering-and-state",
   "title": "Rendering and State"
  },
  {
   "id": "loading-and-bundle-size",
   "title": "Loading and Bundle Size"
  },
  {
   "id": "large-data-and-frequent-events",
   "title": "Large Data and Frequent Events"
  },
  {
   "id": "assets-and-next-js",
   "title": "Assets and Next.js"
  },
  {
   "id": "measure-before-optimizing",
   "title": "Measure Before Optimizing"
  },
  {
   "id": "common-why-x-vs-y-comparisons",
   "title": "Common \"Why X vs Y?\" Comparisons"
  }
 ],
 "sections": [
  {
   "id": "s-re-render-vs-dom-update",
   "num": null,
   "title": "Re-render vs DOM update",
   "stars": 3,
   "chapter": "how-react-renders",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "React runs a component function again to work out the updated UI — that is a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "re-render"
        }
       ]
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
         "value": "DOM update"
        }
       ]
      },
      {
       "type": "text",
       "value": " is an actual change to the browser's DOM. A re-render does not always cause a DOM update."
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
           "value": "Re-render = recompute the UI in memory."
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
           "value": "DOM update = the real page actually changes."
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
         "value": "Remember: Re-render ≠ DOM update. This distinction is a very common interview point."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-virtual-dom-and-reconciliation",
   "num": null,
   "title": "Virtual DOM and reconciliation",
   "stars": 0,
   "chapter": "how-react-renders",
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
             "value": "Virtual DOM:"
            }
           ]
          },
          {
           "type": "text",
           "value": " React's in-memory representation of the UI, used during rendering."
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
             "value": "Reconciliation:"
            }
           ]
          },
          {
           "type": "text",
           "value": " React compares the new UI with the previous UI and works out what actually needs to change in the DOM."
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
       "value": "So React re-renders freely in memory, then reconciliation keeps real DOM changes to a minimum."
      }
     ]
    }
   ]
  },
  {
   "id": "s-memoization-basics",
   "num": null,
   "title": "Memoization basics",
   "stars": 0,
   "chapter": "how-react-renders",
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
             "value": "Memoization:"
            }
           ]
          },
          {
           "type": "text",
           "value": " reuse a previous result or reference instead of recalculating it unnecessarily."
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
             "value": "Referential equality:"
            }
           ]
          },
          {
           "type": "text",
           "value": " checking whether two values point to the same object/function reference."
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
             "value": "Stable reference:"
            }
           ]
          },
          {
           "type": "text",
           "value": " keeping the same object/function reference between renders when it is needed."
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
             "value": "Batched updates:"
            }
           ]
          },
          {
           "type": "text",
           "value": " React groups multiple state updates together to reduce rendering work."
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
         "value": "Remember: Memoization is about keeping values and references stable so React can skip unnecessary work."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-react-memo",
   "num": null,
   "title": "React.memo",
   "stars": 2,
   "chapter": "memoization-tools",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Wraps a component so it skips re-rendering when its props have not meaningfully changed."
      }
     ]
    },
    {
     "type": "code",
     "value": "const User = React.memo(UserComponent);",
     "lang": "jsx"
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
         "value": "memo"
        },
        {
         "type": "text",
         "value": " → memoize a "
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "component"
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
   "id": "s-usememo",
   "num": null,
   "title": "useMemo",
   "stars": 2,
   "chapter": "memoization-tools",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Memoizes an expensive "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "calculated value"
        }
       ]
      },
      {
       "type": "text",
       "value": ", recomputing only when its dependencies change."
      }
     ]
    },
    {
     "type": "code",
     "value": "const result = useMemo(() => expensiveCalculation(data), [data]);",
     "lang": "jsx"
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
         "value": "useMemo"
        },
        {
         "type": "text",
         "value": " → memoize a "
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "value / calculation"
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
   "id": "s-usecallback",
   "num": null,
   "title": "useCallback",
   "stars": 2,
   "chapter": "memoization-tools",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Memoizes a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "function reference"
        }
       ]
      },
      {
       "type": "text",
       "value": " so it stays stable between renders."
      }
     ]
    },
    {
     "type": "code",
     "value": "const handleClick = useCallback(() => {\n  doSomething();\n}, []);",
     "lang": "jsx"
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
         "value": "useCallback"
        },
        {
         "type": "text",
         "value": " → memoize a "
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "function reference"
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
   "id": "s-avoid-unnecessary-re-renders",
   "num": null,
   "title": "Avoid unnecessary re-renders",
   "stars": 1,
   "chapter": "rendering-and-state",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "First identify where unnecessary re-renders happen, then optimize only where there is a real performance problem — do not add memoization blindly."
      }
     ]
    }
   ]
  },
  {
   "id": "s-keep-state-local-colocation",
   "num": null,
   "title": "Keep state local (colocation)",
   "stars": 0,
   "chapter": "rendering-and-state",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Keep state close to the component that actually needs it instead of lifting everything into global state."
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
           "value": "Global state → everything re-renders."
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
           "value": "Local state → only that component re-renders."
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
         "value": "Remember: The interview term for this is "
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "state colocation"
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
   "id": "s-derived-state-avoid-unnecessary-useeffect",
   "num": null,
   "title": "Derived state — avoid unnecessary useEffect",
   "stars": 1,
   "chapter": "rendering-and-state",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Do not use an Effect just to calculate a value from existing state/props. Calculate it directly during render."
      }
     ]
    },
    {
     "type": "code",
     "value": "// Unnecessary\nuseEffect(() => { setTotal(price * quantity); }, [price, quantity]);\n\n// Prefer\nconst total = price * quantity;",
     "lang": "jsx"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Calculating from existing state/props is "
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "derived state"
          }
         ]
        },
        {
         "type": "text",
         "value": " — fewer states, fewer renders."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-stable-keys",
   "num": null,
   "title": "Stable keys",
   "stars": 0,
   "chapter": "rendering-and-state",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Give list items a stable key (like an id) so React reconciles the list correctly."
      }
     ]
    },
    {
     "type": "code",
     "value": "users.map(user => <User key={user.id} user={user} />)",
     "lang": "jsx"
    }
   ]
  },
  {
   "id": "s-lazy-loading-and-code-splitting",
   "num": null,
   "title": "Lazy loading and code splitting",
   "stars": 1,
   "chapter": "loading-and-bundle-size",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Split JavaScript into smaller bundles and load a component only when it is needed, using a dynamic import. This shrinks the initial JavaScript, so the first load is faster."
      }
     ]
    },
    {
     "type": "code",
     "value": "const Dashboard = lazy(() => import(\"./Dashboard\"));",
     "lang": "jsx"
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
             "value": "Code splitting:"
            }
           ]
          },
          {
           "type": "text",
           "value": " split JS into smaller bundles."
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
             "value": "Lazy loading:"
            }
           ]
          },
          {
           "type": "text",
           "value": " load code/component only when needed."
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
             "value": "Dynamic import:"
            }
           ]
          },
          {
           "type": "text",
           "value": " load a module asynchronously."
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
   "id": "s-reduce-bundle-size",
   "num": null,
   "title": "Reduce bundle size",
   "stars": 0,
   "chapter": "loading-and-bundle-size",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Bundle size"
        }
       ]
      },
      {
       "type": "text",
       "value": " is the amount of JavaScript to download and process. Reduce it with:"
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
           "value": "Code splitting, lazy loading, dynamic imports."
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
             "value": "Tree shaking"
            }
           ]
          },
          {
           "type": "text",
           "value": " — removes unused code from the production bundle."
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
           "value": "Removing unnecessary dependencies."
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
         "value": "Remember: Less JavaScript shipped = faster load."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-virtualization",
   "num": null,
   "title": "Virtualization",
   "stars": 1,
   "chapter": "large-data-and-frequent-events",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Render only the visible items instead of thousands of DOM elements."
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
           "value": "A list of 10,000 items with only ~20 visible should not render all 10,000."
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
         "value": "Remember: Render only the visible portion."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-debounce-vs-throttle",
   "num": null,
   "title": "Debounce vs Throttle",
   "stars": 2,
   "chapter": "large-data-and-frequent-events",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Both limit expensive work tied to fast, repeated events."
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
           "value": "Technique"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "What it does"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Typical use"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Debounce"
            }
           ]
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Wait until activity stops, then run once"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Search box (run after typing stops, not every keystroke)"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Throttle"
            }
           ]
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Limit how often code runs"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "scroll, resize, mousemove"
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
         "value": "Remember: Debounce = wait for a pause. Throttle = run at most every N ms."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-optimize-images",
   "num": null,
   "title": "Optimize images",
   "stars": 0,
   "chapter": "assets-and-next-js",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Serve optimized images with appropriate sizes and lazy loading where suitable. In Next.js use the Image component."
      }
     ]
    },
    {
     "type": "code",
     "value": "import Image from \"next/image\";",
     "lang": "jsx"
    }
   ]
  },
  {
   "id": "s-server-components",
   "num": null,
   "title": "Server Components",
   "stars": 1,
   "chapter": "assets-and-next-js",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "In Next.js, Server Components reduce the client JavaScript, giving better initial performance. Do not mark the whole app "
      },
      {
       "type": "inlineCode",
       "value": "'use client'"
      },
      {
       "type": "text",
       "value": " unnecessarily."
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
         "value": "Remember: Server Component → less client JS → faster initial load."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-concurrent-rendering-tools",
   "num": null,
   "title": "Concurrent rendering tools",
   "stars": 0,
   "chapter": "assets-and-next-js",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "React can render without blocking urgent UI updates (concurrent rendering)."
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
             "value": "Suspense:"
            }
           ]
          },
          {
           "type": "text",
           "value": " show fallback UI while part of the UI is still loading."
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
             "value": "useTransition:"
            }
           ]
          },
          {
           "type": "text",
           "value": " mark an update as non-urgent."
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
             "value": "useDeferredValue:"
            }
           ]
          },
          {
           "type": "text",
           "value": " let a non-urgent value update later."
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
             "value": "React Compiler:"
            }
           ]
          },
          {
           "type": "text",
           "value": " can automatically optimize/memoize some React code."
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
   "id": "s-find-the-bottleneck-first",
   "num": null,
   "title": "Find the bottleneck first",
   "stars": 2,
   "chapter": "measure-before-optimizing",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Measure before applying any optimization, rather than blindly adding memoization."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Tools: React DevTools Profiler, browser Performance tools, Lighthouse, Web Vitals."
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
         "value": "Remember: First profile to find the bottleneck, then apply targeted optimization."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-the-golden-interview-answer",
   "num": null,
   "title": "The golden interview answer",
   "stars": 3,
   "chapter": "measure-before-optimizing",
   "nodes": [
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "I first identify unnecessary re-renders using profiling tools. Then I use "
        },
        {
         "type": "inlineCode",
         "value": "React.memo"
        },
        {
         "type": "text",
         "value": ", "
        },
        {
         "type": "inlineCode",
         "value": "useMemo"
        },
        {
         "type": "text",
         "value": ", and "
        },
        {
         "type": "inlineCode",
         "value": "useCallback"
        },
        {
         "type": "text",
         "value": " where they add value, keep state colocated, avoid unnecessary Effects and use derived state, use stable keys, apply lazy loading and code splitting, virtualize large lists, debounce/throttle expensive events, reduce bundle size, and optimize images. In Next.js, I use Server Components where appropriate to reduce client-side JavaScript."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-usememo-vs-usecallback-vs-memo",
   "num": null,
   "title": "useMemo vs useCallback vs memo",
   "stars": 3,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "All three cache something to avoid unnecessary work, but each targets a different thing."
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
           "value": "Tool"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Memoizes"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Use when"
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
           "value": "useMemo"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "value / calculation"
            }
           ]
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "a calculation is expensive"
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
           "value": "useCallback"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "function reference"
            }
           ]
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "a stable function is passed to a child"
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
           "value": "React.memo"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "component"
            }
           ]
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "a child should skip re-render on unchanged props"
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
         "value": "Remember: useMemo → value, useCallback → function, memo → component."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-re-render-vs-dom-update-2",
   "num": null,
   "title": "Re-render vs DOM update",
   "stars": 2,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A re-render recomputes the UI in memory; a DOM update changes the real page. React re-renders often but, through reconciliation, only touches the DOM when something actually changed."
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
         "value": "Remember: A re-render does not always mean a DOM update."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-debounce-vs-throttle-2",
   "num": null,
   "title": "Debounce vs Throttle",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "See "
      },
      {
       "type": "emphasis",
       "children": [
        {
         "type": "text",
         "value": "Large Data and Frequent Events"
        }
       ]
      },
      {
       "type": "text",
       "value": ": debounce waits for activity to stop (search box); throttle caps how often code runs (scroll, resize, mousemove)."
      }
     ]
    }
   ]
  }
 ]
};
