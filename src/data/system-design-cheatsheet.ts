// AUTO-GENERATED from reference/system-design.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs system-design
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const systemDesignCheatsheet: CheatDoc = {
 "title": "System Design",
 "tagline": "The whole topic on one page — building blocks, trade-offs and the rules to remember.",
 "chapters": [
  {
   "id": "fundamentals",
   "title": "Fundamentals"
  },
  {
   "id": "performance-and-estimation",
   "title": "Performance and Estimation"
  },
  {
   "id": "clients-apis-and-communication",
   "title": "Clients, APIs, and Communication"
  },
  {
   "id": "scaling-and-load-balancing",
   "title": "Scaling and Load Balancing"
  },
  {
   "id": "databases",
   "title": "Databases"
  },
  {
   "id": "caching",
   "title": "Caching"
  },
  {
   "id": "networking-and-cdn",
   "title": "Networking and CDN"
  },
  {
   "id": "messaging-and-async-processing",
   "title": "Messaging and Async Processing"
  },
  {
   "id": "microservices-and-service-patterns",
   "title": "Microservices and Service Patterns"
  },
  {
   "id": "consistency-and-distributed-systems",
   "title": "Consistency and Distributed Systems"
  },
  {
   "id": "reliability-availability-and-rate-limiting",
   "title": "Reliability, Availability, and Rate Limiting"
  },
  {
   "id": "security",
   "title": "Security"
  },
  {
   "id": "storage-search-and-observability",
   "title": "Storage, Search, and Observability"
  },
  {
   "id": "deployment-and-design-principles",
   "title": "Deployment and Design Principles"
  },
  {
   "id": "interview-approach",
   "title": "Interview Approach"
  },
  {
   "id": "common-why-x-vs-y-comparisons",
   "title": "Common \"Why X vs Y?\" Comparisons"
  }
 ],
 "sections": [
  {
   "id": "s-what-system-design-is",
   "num": null,
   "title": "What system design is",
   "stars": 0,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Planning the architecture and components of a software system so it is scalable, reliable, fast, secure, and maintainable. You decide which components (API servers, databases, caches, queues) you need, why each exists, and when to use one instead of another."
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
         "value": "Remember: Start from requirements, pick the simplest architecture that meets them, and explain the trade-offs."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-functional-vs-non-functional-requirements",
   "num": null,
   "title": "Functional vs non-functional requirements",
   "stars": 1,
   "chapter": "fundamentals",
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
             "value": "Functional:"
            }
           ]
          },
          {
           "type": "text",
           "value": " what the system does (upload a photo, send a message, make a payment)."
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
             "value": "Non-functional:"
            }
           ]
          },
          {
           "type": "text",
           "value": " how well it does it (fast, available, secure, consistent)."
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
       "value": "Common non-functional qualities: scalability, availability, reliability, performance, consistency, durability, security, maintainability."
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
         "value": "Remember: Functional = features; non-functional = qualities. Clarify both before designing."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-hld-vs-lld",
   "num": null,
   "title": "HLD vs LLD",
   "stars": 0,
   "chapter": "fundamentals",
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
             "value": "High-Level Design (HLD):"
            }
           ]
          },
          {
           "type": "text",
           "value": " major components, services, databases, and how they communicate."
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
             "value": "Low-Level Design (LLD):"
            }
           ]
          },
          {
           "type": "text",
           "value": " classes, methods, interfaces, detailed logic, data structures."
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
       "value": "For a URL shortener: HLD = Client → API server → DB → redirect; LLD = "
      },
      {
       "type": "inlineCode",
       "value": "createShortUrl()"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "getOriginalUrl()"
      },
      {
       "type": "text",
       "value": ", ID generation."
      }
     ]
    }
   ]
  },
  {
   "id": "s-key-words-interviewers-use",
   "num": null,
   "title": "Key words interviewers use",
   "stars": 0,
   "chapter": "fundamentals",
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
             "value": "Trade-off:"
            }
           ]
          },
          {
           "type": "text",
           "value": " improving one thing worsens another (stronger consistency can raise latency)."
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
             "value": "Bottleneck:"
            }
           ]
          },
          {
           "type": "text",
           "value": " the component that limits overall performance."
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
             "value": "SPOF (Single Point of Failure):"
            }
           ]
          },
          {
           "type": "text",
           "value": " one component whose failure brings down the whole system."
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
             "value": "Fault tolerance:"
            }
           ]
          },
          {
           "type": "text",
           "value": " keep working when some components fail."
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
             "value": "Resilience:"
            }
           ]
          },
          {
           "type": "text",
           "value": " recover from failures and keep serving."
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
         "value": "Remember: Every design decision is a trade-off; name the one you are making."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-latency-throughput-qps",
   "num": null,
   "title": "Latency, throughput, QPS",
   "stars": 0,
   "chapter": "performance-and-estimation",
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
             "value": "Latency:"
            }
           ]
          },
          {
           "type": "text",
           "value": " time to complete one request."
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
             "value": "Throughput:"
            }
           ]
          },
          {
           "type": "text",
           "value": " work completed per unit time (requests/second)."
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
             "value": "RPS / QPS:"
            }
           ]
          },
          {
           "type": "text",
           "value": " requests or queries handled each second."
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
             "value": "Concurrency:"
            }
           ]
          },
          {
           "type": "text",
           "value": " operations in progress at the same time."
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
             "value": "Bandwidth:"
            }
           ]
          },
          {
           "type": "text",
           "value": " data transferred per unit time."
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
         "value": "Remember: Latency is \"how fast is one request\"; throughput is \"how many per second\"."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-latency-percentiles",
   "num": null,
   "title": "Latency percentiles",
   "stars": 1,
   "chapter": "performance-and-estimation",
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
             "value": "p50 / p95 / p99:"
            }
           ]
          },
          {
           "type": "text",
           "value": " 50% / 95% / 99% of requests finish within this latency."
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
             "value": "Tail latency:"
            }
           ]
          },
          {
           "type": "text",
           "value": " the slow responses at the high end."
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
       "value": "An average hides a small group of very slow requests, so interviewers care about p95/p99. If p99 = 800 ms, the slowest 1% take at least that long."
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
         "value": "Remember: Design and measure by percentiles, not the average."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-average-vs-peak-traffic",
   "num": null,
   "title": "Average vs peak traffic",
   "stars": 0,
   "chapter": "performance-and-estimation",
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
             "value": "Average traffic:"
            }
           ]
          },
          {
           "type": "text",
           "value": " typical volume over a period."
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
             "value": "Peak / burst traffic:"
            }
           ]
          },
          {
           "type": "text",
           "value": " highest volume in a busy period or short window."
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
         "value": "Remember: Design for realistic peak demand, not just average."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-capacity-estimation",
   "num": null,
   "title": "Capacity estimation",
   "stars": 0,
   "chapter": "performance-and-estimation",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Use round numbers to size the system before choosing architecture."
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
           "value": "Daily requests = daily active users × requests per user per day."
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
           "value": "Average RPS = daily requests ÷ 86,400."
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
           "value": "Peak RPS = average RPS × peak multiplier."
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
           "value": "Storage = records × record size (× retention)."
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
           "value": "Bandwidth = requests/sec × bytes per request."
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
       "value": "Example: 1M users × 20 requests/day = 20M/day ≈ 231 avg RPS; at 5× peak ≈ 1,155 RPS. These are estimates to be measured later, not guarantees."
      }
     ]
    }
   ]
  },
  {
   "id": "s-little-s-law",
   "num": null,
   "title": "Little's Law",
   "stars": 0,
   "chapter": "performance-and-estimation",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Average requests in the system = throughput × average time in the system ("
      },
      {
       "type": "inlineCode",
       "value": "L = λW"
      },
      {
       "type": "text",
       "value": "). Example: 100 req/s × 0.2 s = 20 requests in flight on average."
      }
     ]
    }
   ]
  },
  {
   "id": "s-client-server-stateless-vs-stateful",
   "num": null,
   "title": "Client, server, stateless vs stateful",
   "stars": 1,
   "chapter": "clients-apis-and-communication",
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
             "value": "Client:"
            }
           ]
          },
          {
           "type": "text",
           "value": " app making a request (browser, mobile). "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Server:"
            }
           ]
          },
          {
           "type": "text",
           "value": " processes requests, returns responses."
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
             "value": "Stateless server:"
            }
           ]
          },
          {
           "type": "text",
           "value": " does not keep client session state between requests; any instance can serve the next request."
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
             "value": "Stateful server:"
            }
           ]
          },
          {
           "type": "text",
           "value": " keeps client-specific state on one instance."
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
       "value": "A stateless server can still read state from a database, cache, or token — stateless does not mean the system has no state."
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
         "value": "Remember: Stateless servers scale and fail over easily; keep state in a shared store, not the instance."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-http-methods-safe-and-idempotent",
   "num": null,
   "title": "HTTP methods, safe and idempotent",
   "stars": 0,
   "chapter": "clients-apis-and-communication",
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
           "value": "Method"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Purpose"
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
           "value": "GET"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Retrieve (safe)"
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
           "value": "POST"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Create or trigger (not idempotent)"
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
           "value": "PUT"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Replace / create at a known URI (idempotent)"
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
           "value": "PATCH"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Partial update"
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
           "value": "DELETE"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Delete (idempotent)"
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
             "value": "Safe:"
            }
           ]
          },
          {
           "type": "text",
           "value": " not intended to change state ("
          },
          {
           "type": "inlineCode",
           "value": "GET"
          },
          {
           "type": "text",
           "value": ")."
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
             "value": "Idempotent:"
            }
           ]
          },
          {
           "type": "text",
           "value": " repeating the request has the same effect as doing it once ("
          },
          {
           "type": "inlineCode",
           "value": "GET"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "PUT"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "DELETE"
          },
          {
           "type": "text",
           "value": ")."
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
         "value": "POST"
        },
        {
         "type": "text",
         "value": " is not idempotent — protect it with an idempotency key if retried."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-status-codes-worth-knowing",
   "num": null,
   "title": "Status codes worth knowing",
   "stars": 0,
   "chapter": "clients-apis-and-communication",
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
             "value": "2xx:"
            }
           ]
          },
          {
           "type": "text",
           "value": " 200 OK, 201 Created, 202 Accepted (async), 204 No Content."
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
             "value": "3xx:"
            }
           ]
          },
          {
           "type": "text",
           "value": " 301/302 redirect."
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
             "value": "4xx (client):"
            }
           ]
          },
          {
           "type": "text",
           "value": " 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 429 Too Many Requests."
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
             "value": "5xx (server):"
            }
           ]
          },
          {
           "type": "text",
           "value": " 500 Internal Error, 502 Bad Gateway, 503 Unavailable, 504 Gateway Timeout."
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
         "value": "Remember: 401 = not authenticated; 403 = authenticated but not allowed."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-api-styles",
   "num": null,
   "title": "API styles",
   "stars": 0,
   "chapter": "clients-apis-and-communication",
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
             "value": "REST:"
            }
           ]
          },
          {
           "type": "text",
           "value": " resources + standard HTTP semantics."
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
             "value": "RPC / gRPC:"
            }
           ]
          },
          {
           "type": "text",
           "value": " call a named operation; gRPC uses Protocol Buffers over HTTP/2."
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
             "value": "GraphQL:"
            }
           ]
          },
          {
           "type": "text",
           "value": " client asks for specific fields."
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
             "value": "WebSocket:"
            }
           ]
          },
          {
           "type": "text",
           "value": " persistent two-way connection. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "SSE:"
            }
           ]
          },
          {
           "type": "text",
           "value": " server streams events to the client."
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
   "id": "s-synchronous-vs-asynchronous",
   "num": null,
   "title": "Synchronous vs asynchronous",
   "stars": 0,
   "chapter": "clients-apis-and-communication",
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
             "value": "Sync:"
            }
           ]
          },
          {
           "type": "text",
           "value": " caller waits for the result ("
          },
          {
           "type": "inlineCode",
           "value": "Client → API → Service → DB → Response"
          },
          {
           "type": "text",
           "value": "). Use when the result is needed immediately."
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
             "value": "Async:"
            }
           ]
          },
          {
           "type": "text",
           "value": " caller gets an acknowledgement and the work finishes later via a queue/worker. Use when work can happen later (reports, emails, video processing)."
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
         "value": "Remember: Async acceptance (a job ID) does not mean the work succeeded."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-vertical-vs-horizontal-scaling",
   "num": null,
   "title": "Vertical vs horizontal scaling",
   "stars": 1,
   "chapter": "scaling-and-load-balancing",
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
           "value": "Vertical (scale up)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Horizontal (scale out)"
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
           "value": "Bigger machine"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "More machines"
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
           "value": "Simpler initially"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Distributes load better"
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
           "value": "Limited by one machine"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Grows across machines"
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
           "value": "May need downtime"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Needs coordination + distributed design"
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
             "value": "Elasticity:"
            }
           ]
          },
          {
           "type": "text",
           "value": " adjust resources automatically with demand."
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
         "value": "Remember: Horizontal scaling is not automatically better — it adds networking, coordination, and consistency complexity."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-load-balancer",
   "num": null,
   "title": "Load balancer",
   "stars": 0,
   "chapter": "scaling-and-load-balancing",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Distributes incoming requests across servers and stops routing to unhealthy ones (via "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "health checks"
        }
       ]
      },
      {
       "type": "text",
       "value": "). Can do "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "failover"
        }
       ]
      },
      {
       "type": "text",
       "value": " to a backup."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Algorithms: round robin, weighted round robin, least connections, IP hash, random. Layer: "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "L4"
        }
       ]
      },
      {
       "type": "text",
       "value": " (transport) or "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "L7"
        }
       ]
      },
      {
       "type": "text",
       "value": " (HTTP/application)."
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
             "value": "Reverse proxy:"
            }
           ]
          },
          {
           "type": "text",
           "value": " receives client requests and forwards to backends; may also handle TLS, caching, routing."
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
             "value": "Sticky sessions (session affinity):"
            }
           ]
          },
          {
           "type": "text",
           "value": " send one client to the same server — simplifies sessions but hurts even distribution. Prefer shared session storage or stateless tokens."
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
         "value": "Remember: A load balancer gives capacity a front door and routes around failures."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-stateless-scaling",
   "num": null,
   "title": "Stateless scaling",
   "stars": 0,
   "chapter": "scaling-and-load-balancing",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Keep app servers stateless so any instance handles the next request, with state in a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "shared store"
        }
       ]
      },
      {
       "type": "text",
       "value": " (database/cache). The shared store can then become the bottleneck or SPOF, so design it carefully."
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
         "value": "Remember: Stateless services + load balancer + horizontal scaling is the default scaling recipe."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-sql-vs-nosql",
   "num": null,
   "title": "SQL vs NoSQL",
   "stars": 1,
   "chapter": "databases",
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
           "value": "SQL (relational)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "NoSQL"
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
           "value": "Tables + relationships + schema"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Document, key-value, wide-column, graph"
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
           "value": "Standard SQL, strong constraints"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Query and consistency vary by product"
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
           "value": "Good default for transactional data"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Good for specific access patterns / scale"
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
       "value": "Examples: SQL = PostgreSQL, MySQL; document = MongoDB; key-value = Redis; wide-column = Cassandra; graph = Neo4j."
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
         "value": "Remember: Do not pick NoSQL just \"because scale\" — relational databases scale a lot too."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-acid",
   "num": null,
   "title": "ACID",
   "stars": 0,
   "chapter": "databases",
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
             "value": "Atomicity:"
            }
           ]
          },
          {
           "type": "text",
           "value": " all operations happen or none do."
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
             "value": "Consistency:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a transaction keeps defined rules/constraints."
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
             "value": "Isolation:"
            }
           ]
          },
          {
           "type": "text",
           "value": " concurrent transactions do not interfere unacceptably."
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
             "value": "Durability:"
            }
           ]
          },
          {
           "type": "text",
           "value": " committed data survives failures."
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
       "value": "A bank transfer deducts from A and adds to B, then commits both together; if it fails before commit, neither change stays."
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
         "value": "Remember: ACID does not mean every replica or service sees the latest global data."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-normalization",
   "num": null,
   "title": "Normalization",
   "stars": 0,
   "chapter": "databases",
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
             "value": "Normalize (1NF→3NF):"
            }
           ]
          },
          {
           "type": "text",
           "value": " remove duplication and update anomalies."
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
             "value": "Denormalize:"
            }
           ]
          },
          {
           "type": "text",
           "value": " duplicate/combine data to speed reads, at the cost of extra writes and consistency work."
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
         "value": "Remember: Normalize for correctness; denormalize deliberately for read-heavy paths."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-indexes",
   "num": null,
   "title": "Indexes",
   "stars": 1,
   "chapter": "databases",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "An index helps the database find rows without scanning the whole table."
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
           "value": "Types: primary-key, composite (multi-column), unique."
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
           "value": "A "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "composite index"
            }
           ]
          },
          {
           "type": "text",
           "value": " on "
          },
          {
           "type": "inlineCode",
           "value": "(user_id, created_at)"
          },
          {
           "type": "text",
           "value": " helps filters on "
          },
          {
           "type": "inlineCode",
           "value": "user_id"
          },
          {
           "type": "text",
           "value": " (and often "
          },
          {
           "type": "inlineCode",
           "value": "user_id + created_at"
          },
          {
           "type": "text",
           "value": "); it may not help "
          },
          {
           "type": "inlineCode",
           "value": "created_at"
          },
          {
           "type": "text",
           "value": " alone."
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
       "value": "Trade-off: faster reads, but more storage and slower inserts/updates/deletes. The query planner decides whether an index is used."
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
         "value": "Remember: Index according to real query patterns — every index taxes writes."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-joins-and-slow-queries",
   "num": null,
   "title": "Joins and slow queries",
   "stars": 0,
   "chapter": "databases",
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
             "value": "INNER JOIN:"
            }
           ]
          },
          {
           "type": "text",
           "value": " matching rows from both sides. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "LEFT JOIN:"
            }
           ]
          },
          {
           "type": "text",
           "value": " all left rows + matched right rows (nulls otherwise)."
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
             "value": "EXPLAIN / EXPLAIN ANALYZE:"
            }
           ]
          },
          {
           "type": "text",
           "value": " show the planned / actual execution."
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
             "value": "N+1 problem:"
            }
           ]
          },
          {
           "type": "text",
           "value": " one query for a list, then one query per item — batch instead."
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
             "value": "Connection pool:"
            }
           ]
          },
          {
           "type": "text",
           "value": " reuse DB connections instead of creating one per operation."
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
         "value": "Remember: Fix slow queries with the execution plan, right indexes, fewer columns, and fewer repeated queries."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-replication",
   "num": null,
   "title": "Replication",
   "stars": 0,
   "chapter": "databases",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Keep copies of data on multiple nodes."
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
             "value": "Primary/leader"
            }
           ]
          },
          {
           "type": "text",
           "value": " takes writes; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "replicas/followers"
            }
           ]
          },
          {
           "type": "text",
           "value": " copy changes and can serve reads."
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
             "value": "Synchronous:"
            }
           ]
          },
          {
           "type": "text",
           "value": " writer waits for replica acks (safer, slower). "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Asynchronous:"
            }
           ]
          },
          {
           "type": "text",
           "value": " writer returns before replicas catch up (faster, can be stale)."
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
             "value": "Replication lag:"
            }
           ]
          },
          {
           "type": "text",
           "value": " delay before a replica reflects the primary."
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
         "value": "Remember: Replicas add read capacity and availability; async replicas can serve stale reads."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-sharding-partitioning-across-nodes",
   "num": null,
   "title": "Sharding (partitioning across nodes)",
   "stars": 0,
   "chapter": "databases",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Split data across nodes by a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "shard key"
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
           "value": "Strategies: range-based, hash-based, directory-based (mapping service)."
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
             "value": "Hot shard:"
            }
           ]
          },
          {
           "type": "text",
           "value": " one shard gets disproportionate traffic. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Resharding:"
            }
           ]
          },
          {
           "type": "text",
           "value": " changing the distribution (hard)."
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
             "value": "Horizontal partitioning:"
            }
           ]
          },
          {
           "type": "text",
           "value": " split rows; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "vertical partitioning:"
            }
           ]
          },
          {
           "type": "text",
           "value": " split columns."
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
         "value": "Remember: Replication copies the same data; sharding splits different data. A system can use both."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-transactions-and-isolation",
   "num": null,
   "title": "Transactions and isolation",
   "stars": 0,
   "chapter": "databases",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Read anomalies: "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "dirty read"
        }
       ]
      },
      {
       "type": "text",
       "value": " (uncommitted data), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "non-repeatable read"
        }
       ]
      },
      {
       "type": "text",
       "value": " (row changes between reads), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "phantom read"
        }
       ]
      },
      {
       "type": "text",
       "value": " (range result changes)."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Isolation levels, weak→strong: Read Uncommitted → Read Committed → Repeatable Read → Serializable. Serializable is strongest but reduces concurrency."
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
             "value": "Optimistic locking:"
            }
           ]
          },
          {
           "type": "text",
           "value": " detect conflicts with a version field. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Pessimistic locking:"
            }
           ]
          },
          {
           "type": "text",
           "value": " take locks to block conflicts. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Deadlock:"
            }
           ]
          },
          {
           "type": "text",
           "value": " transactions wait on each other in a cycle."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "UPDATE products SET stock = 8, version = version + 1\nWHERE id = 10 AND version = 3;  -- 0 rows if someone else changed it",
     "lang": "sql"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Optimistic locking suits low contention; pessimistic suits high contention."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-what-caching-is-and-why",
   "num": null,
   "title": "What caching is and why",
   "stars": 1,
   "chapter": "caching",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A cache stores reusable data in a faster location to cut latency, DB load, and repeated computation."
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
             "value": "Hit / miss:"
            }
           ]
          },
          {
           "type": "text",
           "value": " data found / not found in cache. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Hit rate:"
            }
           ]
          },
          {
           "type": "text",
           "value": " fraction served by cache."
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
             "value": "TTL (time to live):"
            }
           ]
          },
          {
           "type": "text",
           "value": " how long an entry stays valid. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Eviction:"
            }
           ]
          },
          {
           "type": "text",
           "value": " removing entries to free space. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Invalidation:"
            }
           ]
          },
          {
           "type": "text",
           "value": " marking stale data unusable."
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
         "value": "Remember: Don't cache everything — data goes stale, memory is limited, invalidation is hard."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-cache-architectures",
   "num": null,
   "title": "Cache architectures",
   "stars": 0,
   "chapter": "caching",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Client-side (browser), CDN (edge), application (in-process), distributed (shared, e.g. Redis), database buffer cache (pages in memory)."
      }
     ]
    }
   ]
  },
  {
   "id": "s-cache-aside",
   "num": null,
   "title": "Cache-aside",
   "stars": 1,
   "chapter": "caching",
   "nodes": [
    {
     "type": "list",
     "ordered": true,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "App checks the cache. 2. Hit → return it. 3. Miss → read DB. 4. Store in cache with TTL and return.\nWrites usually update the DB and then invalidate/update the cached key."
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
         "value": "Remember: Cache-aside is the common pattern; it does not guarantee the cache is always current."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-write-strategies",
   "num": null,
   "title": "Write strategies",
   "stars": 0,
   "chapter": "caching",
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
         "children": [
          {
           "type": "text",
           "value": "Strategy"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Benefit"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Risk"
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
           "value": "Write-through"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Cache stays aligned with writes"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Higher write latency"
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
           "value": "Write-behind (write-back)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Fast writes"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Data loss if pending writes aren't persisted"
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
           "value": "Write-around"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Avoids caching every write"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "First read after write misses"
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
             "value": "Refresh-ahead:"
            }
           ]
          },
          {
           "type": "text",
           "value": " refresh entries before they expire."
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
   "id": "s-eviction-policies",
   "num": null,
   "title": "Eviction policies",
   "stars": 0,
   "chapter": "caching",
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
             "value": "LRU:"
            }
           ]
          },
          {
           "type": "text",
           "value": " evict least recently used. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "LFU:"
            }
           ]
          },
          {
           "type": "text",
           "value": " least frequently used. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "FIFO:"
            }
           ]
          },
          {
           "type": "text",
           "value": " oldest inserted. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "TTL:"
            }
           ]
          },
          {
           "type": "text",
           "value": " by age."
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
   "id": "s-cache-problems",
   "num": null,
   "title": "Cache problems",
   "stars": 1,
   "chapter": "caching",
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
             "value": "Stampede / thundering herd:"
            }
           ]
          },
          {
           "type": "text",
           "value": " many requests reload the same expired item at once."
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
             "value": "Hot key:"
            }
           ]
          },
          {
           "type": "text",
           "value": " one key gets disproportionate traffic."
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
             "value": "Penetration:"
            }
           ]
          },
          {
           "type": "text",
           "value": " repeated requests for nonexistent data bypass the cache."
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
             "value": "Avalanche:"
            }
           ]
          },
          {
           "type": "text",
           "value": " many entries expire at the same time."
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
       "value": "Protections: request coalescing/locking, TTL jitter, negative caching, rate limiting, refreshing hot entries."
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
         "value": "Remember: Redis is fast in-memory access; a database gives durability, rich queries, and transactions — they are not interchangeable."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-networking-terms",
   "num": null,
   "title": "Networking terms",
   "stars": 0,
   "chapter": "networking-and-cdn",
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
             "value": "DNS:"
            }
           ]
          },
          {
           "type": "text",
           "value": " domain name → IP. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "IP address:"
            }
           ]
          },
          {
           "type": "text",
           "value": " identifies a network interface."
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
             "value": "TCP:"
            }
           ]
          },
          {
           "type": "text",
           "value": " reliable, ordered byte stream. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "UDP:"
            }
           ]
          },
          {
           "type": "text",
           "value": " connectionless, no built-in ordering/delivery."
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
             "value": "TLS:"
            }
           ]
          },
          {
           "type": "text",
           "value": " encryption + integrity + usually server authentication. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "HTTPS:"
            }
           ]
          },
          {
           "type": "text",
           "value": " HTTP over TLS."
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
             "value": "HTTP/1.1:"
            }
           ]
          },
          {
           "type": "text",
           "value": " persistent connections, text framing. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "HTTP/2:"
            }
           ]
          },
          {
           "type": "text",
           "value": " multiplexed streams + header compression. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "HTTP/3:"
            }
           ]
          },
          {
           "type": "text",
           "value": " HTTP over QUIC (on UDP)."
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
             "value": "Timeout / retry / connection pooling:"
            }
           ]
          },
          {
           "type": "text",
           "value": " bound waiting, re-attempt failures, reuse connections."
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
   "id": "s-cdn",
   "num": null,
   "title": "CDN",
   "stars": 1,
   "chapter": "networking-and-cdn",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A geographically distributed network that serves content from "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "edge locations"
        }
       ]
      },
      {
       "type": "text",
       "value": " near users, fetching from the "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "origin"
        }
       ]
      },
      {
       "type": "text",
       "value": " when needed."
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
           "value": "Best for static/eligible content: images, CSS, JS, some videos."
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
           "value": "A CDN does not automatically cache every API response — cache rules, auth, headers, and freshness matter."
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
         "value": "Remember: A CDN cuts latency and origin traffic by moving content close to users."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-where-latency-comes-from",
   "num": null,
   "title": "Where latency comes from",
   "stars": 0,
   "chapter": "networking-and-cdn",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Total latency can include DNS, connection setup, network transit ("
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "RTT"
        }
       ]
      },
      {
       "type": "text",
       "value": "), queue waiting, service processing, DB calls, serialization/deserialization, and response transfer. Find the slowest part before optimizing."
      }
     ]
    }
   ]
  },
  {
   "id": "s-core-concepts",
   "num": null,
   "title": "Core concepts",
   "stars": 0,
   "chapter": "messaging-and-async-processing",
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
             "value": "Message queue:"
            }
           ]
          },
          {
           "type": "text",
           "value": " stores messages until consumers process them. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Producer / consumer / broker."
            }
           ]
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
             "value": "Event / event-driven architecture:"
            }
           ]
          },
          {
           "type": "text",
           "value": " components publish and react to events."
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
             "value": "Backpressure:"
            }
           ]
          },
          {
           "type": "text",
           "value": " slow down intake when a downstream component can't keep up."
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
             "value": "Queue depth / consumer lag:"
            }
           ]
          },
          {
           "type": "text",
           "value": " messages waiting / how far behind a consumer is."
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
       "value": "Benefits of a queue: decoupling, buffering spikes, retrying failed work, async processing."
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
         "value": "Remember: Use a queue to absorb spikes and decouple services, not when an immediate response is required."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-delivery-guarantees",
   "num": null,
   "title": "Delivery guarantees",
   "stars": 1,
   "chapter": "messaging-and-async-processing",
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
             "value": "At-most-once:"
            }
           ]
          },
          {
           "type": "text",
           "value": " may be lost."
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
             "value": "At-least-once:"
            }
           ]
          },
          {
           "type": "text",
           "value": " may be duplicated — consumers must dedupe."
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
             "value": "Exactly-once processing:"
            }
           ]
          },
          {
           "type": "text",
           "value": " effect happens once within a scope; needs careful transactions/dedup."
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
         "value": "Remember: At-least-once delivery + idempotent processing is the common practical design."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-acks-retries-dead-letter-queues",
   "num": null,
   "title": "ACKs, retries, dead-letter queues",
   "stars": 0,
   "chapter": "messaging-and-async-processing",
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
             "value": "ACK / NACK:"
            }
           ]
          },
          {
           "type": "text",
           "value": " message handled / not handled."
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
             "value": "Retry with exponential backoff + jitter:"
            }
           ]
          },
          {
           "type": "text",
           "value": " increase and randomize waits to avoid synchronized retries."
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
             "value": "DLQ:"
            }
           ]
          },
          {
           "type": "text",
           "value": " holds messages that keep failing ("
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "poison messages"
            }
           ]
          },
          {
           "type": "text",
           "value": ") after set attempts."
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
             "value": "Visibility timeout:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a delivered message is hidden from other consumers while processing."
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
         "value": "Remember: Never retry forever — set limits and route permanent failures to a DLQ."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-kafka",
   "num": null,
   "title": "Kafka",
   "stars": 1,
   "chapter": "messaging-and-async-processing",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A distributed event-streaming platform using partitioned logs."
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
             "value": "Topic:"
            }
           ]
          },
          {
           "type": "text",
           "value": " named stream. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Partition:"
            }
           ]
          },
          {
           "type": "text",
           "value": " ordered record sequence. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Offset:"
            }
           ]
          },
          {
           "type": "text",
           "value": " position in a partition."
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
             "value": "Consumer group:"
            }
           ]
          },
          {
           "type": "text",
           "value": " consumers sharing a topic's partitions. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Replication factor:"
            }
           ]
          },
          {
           "type": "text",
           "value": " copies per partition. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Partition key:"
            }
           ]
          },
          {
           "type": "text",
           "value": " decides a record's partition."
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
           "value": "Ordering is guaranteed "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "within a partition"
            }
           ]
          },
          {
           "type": "text",
           "value": ", not across a topic."
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
         "value": "Remember: A queue distributes work; a retained stream (Kafka) lets many consumer groups read and replay independently."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-monolith-vs-microservices",
   "num": null,
   "title": "Monolith vs microservices",
   "stars": 1,
   "chapter": "microservices-and-service-patterns",
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
           "value": "Monolith"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Microservices"
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
           "value": "One deployable unit"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Independently deployable services"
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
           "value": "Simpler debugging, in-process calls"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Network calls, distributed tracing needed"
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
           "value": "Scales as a whole"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Services scale independently"
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
           "value": "Shared database common"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Services own their data"
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
         "value": "Remember: Microservices aren't automatically better — use them when independent deployment, scaling, ownership, or fault isolation justifies the complexity."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-service-communication",
   "num": null,
   "title": "Service communication",
   "stars": 0,
   "chapter": "microservices-and-service-patterns",
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
             "value": "Sync:"
            }
           ]
          },
          {
           "type": "text",
           "value": " HTTP/RPC, waits for a response. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Async:"
            }
           ]
          },
          {
           "type": "text",
           "value": " messages/events, no immediate response."
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
             "value": "Service discovery / registry:"
            }
           ]
          },
          {
           "type": "text",
           "value": " find available instances."
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
             "value": "API gateway:"
            }
           ]
          },
          {
           "type": "text",
           "value": " single entry point; handles routing, auth, rate limits, transformations."
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
             "value": "Service mesh:"
            }
           ]
          },
          {
           "type": "text",
           "value": " infrastructure layer for traffic policy, security, observability between services."
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
   "id": "s-resilience-patterns",
   "num": null,
   "title": "Resilience patterns",
   "stars": 1,
   "chapter": "microservices-and-service-patterns",
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
             "value": "Circuit breaker:"
            }
           ]
          },
          {
           "type": "text",
           "value": " stop calling a failing dependency temporarily (CLOSED → OPEN → HALF-OPEN → CLOSED) to prevent cascading failures."
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
             "value": "Bulkhead:"
            }
           ]
          },
          {
           "type": "text",
           "value": " isolate resources so one overload doesn't consume everything."
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
             "value": "Timeout:"
            }
           ]
          },
          {
           "type": "text",
           "value": " never wait indefinitely. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Retry:"
            }
           ]
          },
          {
           "type": "text",
           "value": " re-attempt eligible failures. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Rate limiter."
            }
           ]
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
             "value": "Graceful degradation:"
            }
           ]
          },
          {
           "type": "text",
           "value": " reduced functionality instead of total failure."
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
         "value": "Remember: Retries, timeouts, and circuit breakers solve different problems — unbounded retries worsen overload, and a breaker doesn't repair the dependency."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-saga-pattern",
   "num": null,
   "title": "Saga pattern",
   "stars": 0,
   "chapter": "microservices-and-service-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Coordinates a business transaction across services with a sequence of local transactions, undone by "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "compensating transactions"
        }
       ]
      },
      {
       "type": "text",
       "value": " on failure."
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
             "value": "Orchestration:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a coordinator directs each step. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Choreography:"
            }
           ]
          },
          {
           "type": "text",
           "value": " services react to events, no central coordinator."
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
       "value": "Order flow: create order → reserve inventory → charge payment → confirm; if payment fails, release the inventory. Compensation is a new business action (a refund), not a perfect rollback."
      }
     ]
    }
   ]
  },
  {
   "id": "s-transactional-outbox",
   "num": null,
   "title": "Transactional outbox",
   "stars": 0,
   "chapter": "microservices-and-service-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Problem: the DB update succeeds but publishing the event fails. Solution: write the business change and an event record in the "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "same transaction"
        }
       ]
      },
      {
       "type": "text",
       "value": "; a separate "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "relay"
        }
       ]
      },
      {
       "type": "text",
       "value": " publishes pending events. The relay may publish twice, so consumers should be idempotent."
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
         "value": "Remember: The outbox keeps DB state and events in sync by writing both atomically."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-cap-theorem",
   "num": null,
   "title": "CAP theorem",
   "stars": 1,
   "chapter": "consistency-and-distributed-systems",
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
             "value": "Consistency:"
            }
           ]
          },
          {
           "type": "text",
           "value": " every read sees the latest write."
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
             "value": "Availability:"
            }
           ]
          },
          {
           "type": "text",
           "value": " every request to a live node gets a non-error response."
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
             "value": "Partition tolerance:"
            }
           ]
          },
          {
           "type": "text",
           "value": " keep working despite network partitions between nodes."
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
       "value": "When a partition happens, you cannot guarantee both consistency and availability for every request."
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
         "value": "Remember: CAP isn't \"pick any two always\" — the trade-off bites during a partition."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-strong-vs-eventual-consistency",
   "num": null,
   "title": "Strong vs eventual consistency",
   "stars": 1,
   "chapter": "consistency-and-distributed-systems",
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
             "value": "Strong:"
            }
           ]
          },
          {
           "type": "text",
           "value": " reads never return stale data relative to completed writes."
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
             "value": "Eventual:"
            }
           ]
          },
          {
           "type": "text",
           "value": " if updates stop, replicas converge eventually."
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
           "value": "Related guarantees: "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "read-your-writes"
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
             "value": "monotonic reads"
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
             "value": "causal consistency"
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
             "value": "stale read"
            }
           ]
          },
          {
           "type": "text",
           "value": " returns an older value."
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
       "value": "Use strong for bank balance, inventory, payments; eventual is fine for like/view counts and some analytics."
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
         "value": "Remember: Match the consistency level to how much staleness the operation can tolerate."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-distributed-transactions",
   "num": null,
   "title": "Distributed transactions",
   "stars": 0,
   "chapter": "consistency-and-distributed-systems",
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
             "value": "Two-phase commit (2PC):"
            }
           ]
          },
          {
           "type": "text",
           "value": " a coordinator asks participants to prepare, then commits or aborts."
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
             "value": "Distributed lock:"
            }
           ]
          },
          {
           "type": "text",
           "value": " exclusive access across processes; use a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "lease"
            }
           ]
          },
          {
           "type": "text",
           "value": " (expires) and a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "fencing token"
            }
           ]
          },
          {
           "type": "text",
           "value": " (monotonic, rejects stale holders)."
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
         "value": "Remember: A local DB transaction gives no atomicity across independent services — use a saga or 2PC, carefully."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-idempotency",
   "num": null,
   "title": "Idempotency",
   "stars": 1,
   "chapter": "consistency-and-distributed-systems",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Repeating an operation has the same effect as doing it once."
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
             "value": "Idempotency key:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a unique id used to recognize a repeated request."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "POST /payments\nIdempotency-Key: order-123-payment",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "On a retry after a timeout, the server returns the existing result instead of charging again — if it stores and enforces the key, handles concurrent duplicates, and defines key lifetime."
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
         "value": "Remember: A failed response doesn't mean the operation failed — make retryable writes idempotent."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-availability-and-slas",
   "num": null,
   "title": "Availability and SLAs",
   "stars": 1,
   "chapter": "reliability-availability-and-rate-limiting",
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
             "value": "Availability:"
            }
           ]
          },
          {
           "type": "text",
           "value": " fraction of time the service is usable. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Downtime:"
            }
           ]
          },
          {
           "type": "text",
           "value": " when it isn't."
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
             "value": "SLA:"
            }
           ]
          },
          {
           "type": "text",
           "value": " contractual commitment. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "SLO:"
            }
           ]
          },
          {
           "type": "text",
           "value": " internal target. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "SLI:"
            }
           ]
          },
          {
           "type": "text",
           "value": " the measured metric. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Error budget:"
            }
           ]
          },
          {
           "type": "text",
           "value": " allowed unreliability under the SLO."
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
           "value": "Availability"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Approx. monthly downtime (30-day)"
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
           "value": "99%"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "~7h 12m"
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
           "value": "99.9%"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "~43m"
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
           "value": "99.99%"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "~4m 19s"
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
         "value": "Remember: Count the nines — each extra nine is an order of magnitude less downtime."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-redundancy-and-failover",
   "num": null,
   "title": "Redundancy and failover",
   "stars": 0,
   "chapter": "reliability-availability-and-rate-limiting",
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
             "value": "Active-active:"
            }
           ]
          },
          {
           "type": "text",
           "value": " all instances serve traffic. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Active-passive:"
            }
           ]
          },
          {
           "type": "text",
           "value": " one serves, one stands by."
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
             "value": "Automatic failover:"
            }
           ]
          },
          {
           "type": "text",
           "value": " switch without manual action."
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
             "value": "DR (disaster recovery):"
            }
           ]
          },
          {
           "type": "text",
           "value": " "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "RTO"
            }
           ]
          },
          {
           "type": "text",
           "value": " = max time to restore; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "RPO"
            }
           ]
          },
          {
           "type": "text",
           "value": " = max acceptable data loss (in time)."
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
         "value": "Remember: Replicas in the same failure domain won't survive a region outage — DR needs geographic separation."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-graceful-failure",
   "num": null,
   "title": "Graceful failure",
   "stars": 0,
   "chapter": "reliability-availability-and-rate-limiting",
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
             "value": "Fail fast, fallback, degraded mode, load shedding"
            }
           ]
          },
          {
           "type": "text",
           "value": " (drop low-priority work)."
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
             "value": "Health checks:"
            }
           ]
          },
          {
           "type": "text",
           "value": " "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "readiness"
            }
           ]
          },
          {
           "type": "text",
           "value": " = ready for traffic; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "liveness"
            }
           ]
          },
          {
           "type": "text",
           "value": " = still functioning."
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
         "value": "Remember: Don't restart on a liveness check just because a downstream dependency is briefly down."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-rate-limiting",
   "num": null,
   "title": "Rate limiting",
   "stars": 0,
   "chapter": "reliability-availability-and-rate-limiting",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Controls how many requests a user/client/service may make — protects capacity, controls cost, prevents abuse, ensures fairness."
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
           "value": "Algorithms: fixed window, sliding window log, sliding window counter, token bucket (allows bursts), leaky bucket (steady output)."
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
       "value": "A token bucket holding 10 tokens, refilling at 2/sec, permits short bursts while limiting sustained usage. A global limit across many instances needs shared coordination."
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
         "value": "Remember: Limit by user / IP / API key / tenant; a per-instance limit isn't a global limit."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-authentication-vs-authorization",
   "num": null,
   "title": "Authentication vs authorization",
   "stars": 1,
   "chapter": "security",
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
             "value": "Authentication:"
            }
           ]
          },
          {
           "type": "text",
           "value": " who you are. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Authorization:"
            }
           ]
          },
          {
           "type": "text",
           "value": " what you may do."
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
             "value": "Least privilege:"
            }
           ]
          },
          {
           "type": "text",
           "value": " grant only the permissions needed."
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
             "value": "RBAC:"
            }
           ]
          },
          {
           "type": "text",
           "value": " permissions via roles. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "ABAC:"
            }
           ]
          },
          {
           "type": "text",
           "value": " decisions from attributes of subject/resource/context."
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
         "value": "Remember: Authn = \"who are you?\"; authz = \"what can you do?\"."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-common-mechanisms",
   "num": null,
   "title": "Common mechanisms",
   "stars": 0,
   "chapter": "security",
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
             "value": "JWT:"
            }
           ]
          },
          {
           "type": "text",
           "value": " signed token carrying claims (not automatically encrypted)."
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
             "value": "OAuth 2.0:"
            }
           ]
          },
          {
           "type": "text",
           "value": " delegated authorization. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "OIDC:"
            }
           ]
          },
          {
           "type": "text",
           "value": " identity layer on OAuth 2.0. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Session:"
            }
           ]
          },
          {
           "type": "text",
           "value": " server/shared state for a logged-in user."
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
             "value": "TLS in transit, encryption at rest, secret management, password hashing, audit logs."
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
  },
  {
   "id": "s-common-attacks-and-defenses",
   "num": null,
   "title": "Common attacks and defenses",
   "stars": 0,
   "chapter": "security",
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
             "value": "SQL injection"
            }
           ]
          },
          {
           "type": "text",
           "value": " → parameterized queries. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "XSS"
            }
           ]
          },
          {
           "type": "text",
           "value": " → output encoding. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "CSRF"
            }
           ]
          },
          {
           "type": "text",
           "value": " → CSRF protections."
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
             "value": "DDoS"
            }
           ]
          },
          {
           "type": "text",
           "value": " → infrastructure mitigation + rate limits. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Replay"
            }
           ]
          },
          {
           "type": "text",
           "value": " → replay protection. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Credential stuffing"
            }
           ]
          },
          {
           "type": "text",
           "value": " → auth controls."
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
         "value": "Remember: Validate input, authenticate/authorize every protected operation, use TLS, and keep secrets out of code."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-storage-types-and-large-uploads",
   "num": null,
   "title": "Storage types and large uploads",
   "stars": 1,
   "chapter": "storage-search-and-observability",
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
             "value": "Block storage"
            }
           ]
          },
          {
           "type": "text",
           "value": " (disks/DBs), "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "file storage"
            }
           ]
          },
          {
           "type": "text",
           "value": " (hierarchical filesystem), "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "object storage"
            }
           ]
          },
          {
           "type": "text",
           "value": " (data + metadata via API, e.g. S3)."
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
             "value": "Pre-signed URL:"
            }
           ]
          },
          {
           "type": "text",
           "value": " time-limited URL granting a specific storage operation — a bearer credential anyone holding it can use until it expires."
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
       "value": "Large-upload design: client asks backend for permission → backend issues a short-lived upload URL → client uploads directly to object storage → backend verifies and stores "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "metadata (URL + info)"
        }
       ]
      },
      {
       "type": "text",
       "value": ". This offloads bandwidth from API servers. "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Multipart upload"
        }
       ]
      },
      {
       "type": "text",
       "value": " splits a big file into parts for parallel/resumable upload."
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
         "value": "Remember: Store the file in object storage and only the URL + metadata in the database."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-search-systems",
   "num": null,
   "title": "Search systems",
   "stars": 0,
   "chapter": "storage-search-and-observability",
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
             "value": "Full-text search"
            }
           ]
          },
          {
           "type": "text",
           "value": " over "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "inverted index"
            }
           ]
          },
          {
           "type": "text",
           "value": " (term → documents); plus autocomplete, fuzzy search, ranking."
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
           "value": "The "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "search index"
            }
           ]
          },
          {
           "type": "text",
           "value": " is updated asynchronously from the source of truth, so it can lag — it is not the authoritative database."
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
   "id": "s-observability",
   "num": null,
   "title": "Observability",
   "stars": 1,
   "chapter": "storage-search-and-observability",
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
             "value": "Metrics:"
            }
           ]
          },
          {
           "type": "text",
           "value": " numbers over time (QPS, latency, error rate)."
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
             "value": "Logs:"
            }
           ]
          },
          {
           "type": "text",
           "value": " individual events (prefer "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "structured/JSON"
            }
           ]
          },
          {
           "type": "text",
           "value": " with a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "correlation ID"
            }
           ]
          },
          {
           "type": "text",
           "value": ")."
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
             "value": "Distributed tracing:"
            }
           ]
          },
          {
           "type": "text",
           "value": " follows a request across services; a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "trace"
            }
           ]
          },
          {
           "type": "text",
           "value": " has "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "spans"
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
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Logs explain events, metrics reveal trends, traces locate delays across services."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-containers-and-deployment",
   "num": null,
   "title": "Containers and deployment",
   "stars": 1,
   "chapter": "deployment-and-design-principles",
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
             "value": "Container:"
            }
           ]
          },
          {
           "type": "text",
           "value": " app + dependencies sharing the host kernel (vs a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "VM"
            }
           ]
          },
          {
           "type": "text",
           "value": " with a full guest OS). "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Kubernetes"
            }
           ]
          },
          {
           "type": "text",
           "value": " orchestrates containers; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "pod"
            }
           ]
          },
          {
           "type": "text",
           "value": " is its smallest unit."
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
           "value": "Strategies: "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "rolling"
            }
           ]
          },
          {
           "type": "text",
           "value": " (replace gradually), "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "blue-green"
            }
           ]
          },
          {
           "type": "text",
           "value": " (two environments, switch traffic), "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "canary"
            }
           ]
          },
          {
           "type": "text",
           "value": " (small slice first). "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Rollback"
            }
           ]
          },
          {
           "type": "text",
           "value": " returns to the previous version."
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
             "value": "Feature flag:"
            }
           ]
          },
          {
           "type": "text",
           "value": " enable a feature without redeploying — deployment and release are separate."
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
             "value": "Autoscaling / persistent volumes"
            }
           ]
          },
          {
           "type": "text",
           "value": " for stateless vs stateful workloads."
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
         "value": "Remember: Deploy safely with rolling/blue-green/canary; decouple \"deployed\" from \"released\" using flags."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-design-and-architecture-principles",
   "num": null,
   "title": "Design and architecture principles",
   "stars": 0,
   "chapter": "deployment-and-design-principles",
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
             "value": "SOLID:"
            }
           ]
          },
          {
           "type": "text",
           "value": " single responsibility, open/closed, Liskov substitution, interface segregation, dependency inversion."
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
           "value": "Principles: separation of concerns, high cohesion, low coupling, DRY, KISS, YAGNI."
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
           "value": "Patterns: singleton, factory, strategy, observer, adapter, decorator, repository, dependency injection."
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
         "value": "Remember: A simple modular design usually beats premature microservices, event streams, and distributed transactions."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-system-design-patterns",
   "num": null,
   "title": "System design patterns",
   "stars": 0,
   "chapter": "deployment-and-design-principles",
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
             "value": "Layered / MVC:"
            }
           ]
          },
          {
           "type": "text",
           "value": " separate controller, service, repository / data, view, control."
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
             "value": "CQRS:"
            }
           ]
          },
          {
           "type": "text",
           "value": " separate read and write paths. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Event sourcing:"
            }
           ]
          },
          {
           "type": "text",
           "value": " store state as a sequence of events."
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
             "value": "Materialized view:"
            }
           ]
          },
          {
           "type": "text",
           "value": " precomputed query results. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Strangler:"
            }
           ]
          },
          {
           "type": "text",
           "value": " gradually replace an old system. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Sidecar, anti-corruption layer, API composition, fan-out/fan-in."
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
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "CQRS and event sourcing can combine but neither requires the other. In event-driven/CQRS systems the read model is "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "eventually consistent"
        }
       ]
      },
      {
       "type": "text",
       "value": " — a write can succeed before the read model updates."
      }
     ]
    }
   ]
  },
  {
   "id": "s-seven-step-framework",
   "num": null,
   "title": "Seven-step framework",
   "stars": 1,
   "chapter": "interview-approach",
   "nodes": [
    {
     "type": "list",
     "ordered": true,
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
             "value": "Clarify requirements"
            }
           ]
          },
          {
           "type": "text",
           "value": " (users, features, traffic, consistency, constraints)."
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
             "value": "Estimate capacity"
            }
           ]
          },
          {
           "type": "text",
           "value": " (RPS, storage, bandwidth, peak)."
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
             "value": "Define APIs and data models"
            }
           ]
          },
          {
           "type": "text",
           "value": " (endpoints, entities, keys, indexes)."
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
             "value": "Draw the high-level architecture"
            }
           ]
          },
          {
           "type": "text",
           "value": " (client, LB, services, cache, DB, queue)."
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
             "value": "Explain the request flow"
            }
           ]
          },
          {
           "type": "text",
           "value": " (a successful read and write)."
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
             "value": "Handle scale and failures"
            }
           ]
          },
          {
           "type": "text",
           "value": " (bottlenecks, replication, caching, retries, rate limits, failover)."
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
             "value": "Explain trade-offs"
            }
           ]
          },
          {
           "type": "text",
           "value": " (justify each choice and name alternatives)."
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
         "value": "Remember: Requirements → estimate → API → architecture → scale → failures → trade-offs."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-scaling-order-don-t-skip-steps",
   "num": null,
   "title": "Scaling order (don't skip steps)",
   "stars": 0,
   "chapter": "interview-approach",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Index → query optimization → connection pooling → cache → read replicas → partition/shard → multi-region. Don't shard when caching or a replica would solve it."
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
         "value": "Remember: Fix the real bottleneck (CPU, RAM, network, DB, cache, disk, queue, lock, hot key) — not a random component."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-special-systems-same-template-one-area-matters-most",
   "num": null,
   "title": "Special systems (same template, one area matters most)",
   "stars": 0,
   "chapter": "interview-approach",
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
             "value": "URL shortener:"
            }
           ]
          },
          {
           "type": "text",
           "value": " key generation + cache + redirect latency."
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
             "value": "Instagram/Twitter feed:"
            }
           ]
          },
          {
           "type": "text",
           "value": " media + CDN + fan-out + ranking + read throughput."
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
             "value": "WhatsApp:"
            }
           ]
          },
          {
           "type": "text",
           "value": " WebSockets + queue + delivery state + ordering."
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
             "value": "YouTube/Netflix:"
            }
           ]
          },
          {
           "type": "text",
           "value": " object storage + transcoding + CDN."
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
             "value": "Uber:"
            }
           ]
          },
          {
           "type": "text",
           "value": " geospatial search + real-time location + matching."
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
             "value": "Ticket booking / payments:"
            }
           ]
          },
          {
           "type": "text",
           "value": " concurrency + locking + idempotency + strong consistency + audit."
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
         "value": "Remember: Map any question onto the same building blocks; only the focus area changes."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-why-a-load-balancer-if-we-already-have-multiple-servers",
   "num": null,
   "title": "Why a load balancer if we already have multiple servers?",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Servers give capacity, but clients still need a single place to distribute requests. The load balancer spreads traffic and stops routing to unhealthy instances."
      }
     ]
    }
   ]
  },
  {
   "id": "s-why-a-cache-if-the-database-already-stores-the-data",
   "num": null,
   "title": "Why a cache if the database already stores the data?",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The DB gives durable storage and queries; the cache gives faster access to hot data and cuts DB load — at the cost of expiration and invalidation."
      }
     ]
    }
   ]
  },
  {
   "id": "s-why-a-message-queue-if-apis-can-call-each-other-directly",
   "num": null,
   "title": "Why a message queue if APIs can call each other directly?",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Direct calls are simpler when a response is needed now. A queue decouples services, absorbs spikes, retries failed work, and runs tasks asynchronously."
      }
     ]
    }
   ]
  },
  {
   "id": "s-why-kafka-if-we-already-have-a-message-queue",
   "num": null,
   "title": "Why Kafka if we already have a message queue?",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A traditional queue distributes tasks among consumers. Kafka adds durable, partitioned, retained event streams that many consumer groups can read and replay independently."
      }
     ]
    }
   ]
  },
  {
   "id": "s-why-a-cdn-if-we-already-have-a-cache",
   "num": null,
   "title": "Why a CDN if we already have a cache?",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "An app cache sits near backend services; a CDN caches eligible content near users geographically, cutting latency and origin traffic. Use both."
      }
     ]
    }
   ]
  },
  {
   "id": "s-why-an-api-gateway-if-we-already-have-a-load-balancer",
   "num": null,
   "title": "Why an API gateway if we already have a load balancer?",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A load balancer mainly distributes traffic. A gateway adds API routing, authentication, quotas, and transformations. Some products do both."
      }
     ]
    }
   ]
  },
  {
   "id": "s-why-replication-if-we-already-have-sharding-and-vice-versa",
   "num": null,
   "title": "Why replication if we already have sharding (and vice versa)?",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Replication keeps copies of the same data for availability and read scale; sharding splits different subsets to spread storage and writes. They solve different problems and combine."
      }
     ]
    }
   ]
  },
  {
   "id": "s-why-nosql-if-sql-databases-can-scale",
   "num": null,
   "title": "Why NoSQL if SQL databases can scale?",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "SQL scales well and is great for relations and transactions. NoSQL wins when a specific data model, access pattern, or distribution requirement fits it better."
      }
     ]
    }
   ]
  },
  {
   "id": "s-strong-vs-eventual-consistency-which-to-choose",
   "num": null,
   "title": "Strong vs eventual consistency — which to choose?",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Strong for correctness-critical data (payments, inventory); eventual for availability and scale where brief staleness is fine (likes, counters, feeds)."
      }
     ]
    }
   ]
  },
  {
   "id": "s-universal-trade-offs",
   "num": null,
   "title": "Universal trade-offs",
   "stars": 0,
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
           "value": "Choice"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Trade-off"
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
           "value": "Cache"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Speed ↔ stale data"
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
           "value": "Vertical vs horizontal"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Simplicity ↔ scale"
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
           "value": "Replication"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Availability/read scale ↔ consistency/storage"
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
           "value": "Sharding"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Scale ↔ complexity"
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
           "value": "Sync vs async"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Immediate result ↔ decoupling/eventual consistency"
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
           "value": "Microservices vs monolith"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Independent scaling ↔ operational complexity"
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
           "value": "Denormalization"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Faster reads ↔ duplicated data"
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
           "value": "Strong vs eventual consistency"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Correctness ↔ latency/availability"
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
         "value": "Remember: Every answer is \"it depends\" — state the requirement, then the trade-off you are accepting."
        }
       ]
      }
     ]
    }
   ]
  }
 ]
};
