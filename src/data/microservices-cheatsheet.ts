// AUTO-GENERATED from reference/microservices.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs microservices
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const microservicesCheatsheet: CheatDoc = {
 "title": "Microservices",
 "tagline": "The whole topic on one page — ideas, patterns and the rules to remember.",
 "chapters": [
  {
   "id": "fundamentals",
   "title": "Fundamentals"
  },
  {
   "id": "communication",
   "title": "Communication"
  },
  {
   "id": "service-discovery-and-config",
   "title": "Service Discovery and Config"
  },
  {
   "id": "resilience",
   "title": "Resilience"
  },
  {
   "id": "data",
   "title": "Data"
  },
  {
   "id": "messaging",
   "title": "Messaging"
  },
  {
   "id": "observability",
   "title": "Observability"
  },
  {
   "id": "deployment",
   "title": "Deployment"
  },
  {
   "id": "security",
   "title": "Security"
  },
  {
   "id": "patterns-testing-and-spring",
   "title": "Patterns, Testing, and Spring"
  },
  {
   "id": "why-x-vs-y-comparisons",
   "title": "\"Why X vs Y?\" Comparisons"
  }
 ],
 "sections": [
  {
   "id": "s-what-microservices-are",
   "num": null,
   "title": "What microservices are",
   "stars": 1,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "An architecture where one application is split into small, independently deployable services, each owning a specific business capability (payments, orders, inventory). A monolith is the opposite: built and deployed as one unit."
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
           "value": "Each service owns its business logic and, as far as practical, its own data and deployment."
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
           "value": "They run as a distributed system: separate processes talking over a network."
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
           "value": "Aim for "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "loose coupling"
            }
           ]
          },
          {
           "type": "text",
           "value": " (a service barely depends on another's internals) and "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "high cohesion"
            }
           ]
          },
          {
           "type": "text",
           "value": " (its responsibilities belong together)."
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
       "value": "A typical e-commerce shape: Client -> API Gateway -> Order, Payment, Inventory, User services. Order Service creates orders, Payment Service charges, Inventory Service tracks stock, each deployable on its own."
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
         "value": "Remember: Microservices = small services split by business capability, deployed independently."
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
   "chapter": "fundamentals",
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
           "value": "Aspect"
          }
         ]
        },
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
           "value": "Deployment"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "One application"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Services deployed independently"
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
           "value": "Scaling"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Scale the whole app"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Scale individual services"
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
           "value": "Communication"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "In-process calls"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Network calls or messaging"
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
           "value": "Data"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Often one shared database"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Service-owned data"
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
           "value": "Failure"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Internal failures affect the app"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Network and partial failures to handle"
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
           "value": "Start-up cost"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Simpler to start"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "More infra and operational complexity"
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
           "value": "A "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "modular monolith"
            }
           ]
          },
          {
           "type": "text",
           "value": " (one deployable with clearly separated modules) is often the better choice for a small team or product."
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
             "value": "distributed monolith"
            }
           ]
          },
          {
           "type": "text",
           "value": " is the trap: services are technically separate but so tightly dependent that changing one forces changes to others. Worst of both worlds."
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
         "value": "Remember: Fewer moving parts is a feature. Reach for microservices only when the complexity buys you something."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-when-to-use-them",
   "num": null,
   "title": "When to use them",
   "stars": 0,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Use microservices when:"
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
           "value": "Business domains are genuinely independent."
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
           "value": "Teams can own services end to end."
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
           "value": "The organisation can operate distributed systems reliably."
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
       "value": "Do "
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
       "value": " split just because the codebase is large. Microservices do not automatically mean faster (network hops, retries, serialization add cost) and do not guarantee availability (any service or its dependency can fail)."
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
         "value": "Remember: Microservices are an organisational and operational choice, not just \"many Spring Boot apps\"."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-service-boundaries-and-ddd",
   "num": null,
   "title": "Service boundaries and DDD",
   "stars": 1,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Draw boundaries around "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "business capabilities"
        }
       ]
      },
      {
       "type": "text",
       "value": ", not technical layers. Splitting into controller-service, repository-service, util-service is a poor boundary."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Key Domain-Driven Design terms:"
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
             "value": "Bounded context:"
            }
           ]
          },
          {
           "type": "text",
           "value": " where a particular model and its terms have one clear meaning. The same word can mean different things in different contexts."
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
             "value": "Aggregate:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a group of domain objects treated as one consistency boundary; the "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "aggregate root"
            }
           ]
          },
          {
           "type": "text",
           "value": " is the entry point for changes."
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
             "value": "Domain service:"
            }
           ]
          },
          {
           "type": "text",
           "value": " domain logic that does not fit one entity."
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
       "value": "A good service owns a meaningful capability, its rules, and its data:"
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
           "value": "Order Service -> order creation and status"
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
           "value": "Payment Service -> payment attempts, status, refunds"
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
           "value": "Inventory Service -> stock reservation and availability"
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
       "value": "Anti-patterns to avoid: the "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "shared database"
        }
       ]
      },
      {
       "type": "text",
       "value": " (services touch the same tables, creating hidden coupling) and "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "chatty communication"
        }
       ]
      },
      {
       "type": "text",
       "value": " (one operation needs many small cross-service calls)."
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
         "value": "Remember: One service = one business capability + its rules + its data."
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
   "stars": 1,
   "chapter": "communication",
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
             "value": "Synchronous:"
            }
           ]
          },
          {
           "type": "text",
           "value": " the caller waits for a response (e.g. an HTTP REST call)."
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
             "value": "Asynchronous:"
            }
           ]
          },
          {
           "type": "text",
           "value": " the sender continues without waiting (e.g. publishing an event to Kafka)."
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
       "value": "Related words: a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "command"
        }
       ]
      },
      {
       "type": "text",
       "value": " requests an action ("
      },
      {
       "type": "inlineCode",
       "value": "ProcessPayment"
      },
      {
       "type": "text",
       "value": "); an "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "event"
        }
       ]
      },
      {
       "type": "text",
       "value": " records that something happened ("
      },
      {
       "type": "inlineCode",
       "value": "OrderCreated"
      },
      {
       "type": "text",
       "value": "); a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "message broker"
        }
       ]
      },
      {
       "type": "text",
       "value": " routes messages between a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "producer"
        }
       ]
      },
      {
       "type": "text",
       "value": " and a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "consumer"
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
         "value": "queue"
        }
       ]
      },
      {
       "type": "text",
       "value": " gives each message to one of competing consumers; "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "pub/sub"
        }
       ]
      },
      {
       "type": "text",
       "value": " delivers an event to many subscribers."
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
           "value": "REST / HTTP"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Messaging"
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
           "value": "Request-response"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Often asynchronous"
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
           "value": "Caller waits"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Producer continues after publishing"
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
           "value": "Direct dependency on target being up"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Broker can buffer messages"
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
           "value": "Good for queries, immediate answers"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Good for events and background work"
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
           "value": "Handle timeouts and retries"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Handle duplicates and consumer failures"
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
       "value": "Async is not \"fire and forget it worked\": messages can be delayed, duplicated, or land in a dead-letter queue."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example event flow: Order Service saves the order and publishes "
      },
      {
       "type": "inlineCode",
       "value": "OrderCreated"
      },
      {
       "type": "text",
       "value": "; Inventory reserves stock, Payment starts payment, others send notifications. The order flow does not block on every downstream step, but each consumer must handle failure."
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
         "value": "Remember: Sync when you need the answer now; async to decouple and absorb load."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-rest-apis",
   "num": null,
   "title": "REST APIs",
   "stars": 1,
   "chapter": "communication",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "REST exposes "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "resources"
        }
       ]
      },
      {
       "type": "text",
       "value": " (an order, a customer) at "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "endpoints"
        }
       ]
      },
      {
       "type": "text",
       "value": " (a URL + HTTP method), usually exchanging JSON "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "DTOs"
        }
       ]
      },
      {
       "type": "text",
       "value": ". The "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "API contract"
        }
       ]
      },
      {
       "type": "text",
       "value": " defines request, response, errors, and behaviour."
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
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Idempotent?"
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
           "value": "Read"
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
           "value": "Create or trigger"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "No (generally)"
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
           "value": "Replace"
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
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Depends"
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
           "value": "Delete"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Yes (by semantics)"
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
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idempotent"
        }
       ]
      },
      {
       "type": "text",
       "value": " means repeating the request has the same intended effect, not the same response body."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Status codes worth knowing: "
      },
      {
       "type": "inlineCode",
       "value": "200"
      },
      {
       "type": "text",
       "value": " OK, "
      },
      {
       "type": "inlineCode",
       "value": "201"
      },
      {
       "type": "text",
       "value": " Created, "
      },
      {
       "type": "inlineCode",
       "value": "202"
      },
      {
       "type": "text",
       "value": " Accepted (processing later), "
      },
      {
       "type": "inlineCode",
       "value": "204"
      },
      {
       "type": "text",
       "value": " No Content; "
      },
      {
       "type": "inlineCode",
       "value": "400"
      },
      {
       "type": "text",
       "value": " Bad Request, "
      },
      {
       "type": "inlineCode",
       "value": "401"
      },
      {
       "type": "text",
       "value": " Unauthorized, "
      },
      {
       "type": "inlineCode",
       "value": "403"
      },
      {
       "type": "text",
       "value": " Forbidden, "
      },
      {
       "type": "inlineCode",
       "value": "404"
      },
      {
       "type": "text",
       "value": " Not Found, "
      },
      {
       "type": "inlineCode",
       "value": "409"
      },
      {
       "type": "text",
       "value": " Conflict, "
      },
      {
       "type": "inlineCode",
       "value": "422"
      },
      {
       "type": "text",
       "value": " Unprocessable, "
      },
      {
       "type": "inlineCode",
       "value": "429"
      },
      {
       "type": "text",
       "value": " Too Many Requests; "
      },
      {
       "type": "inlineCode",
       "value": "500"
      },
      {
       "type": "text",
       "value": " Server Error, "
      },
      {
       "type": "inlineCode",
       "value": "502"
      },
      {
       "type": "text",
       "value": " Bad Gateway, "
      },
      {
       "type": "inlineCode",
       "value": "503"
      },
      {
       "type": "text",
       "value": " Unavailable, "
      },
      {
       "type": "inlineCode",
       "value": "504"
      },
      {
       "type": "text",
       "value": " Gateway Timeout."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Rules: validate input, don't expose internal entities, use consistent error formats, set client timeouts, don't retry blindly, keep contracts backward-compatible, and use an "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "idempotency key"
        }
       ]
      },
      {
       "type": "text",
       "value": " for operations like payments where a duplicate would be harmful."
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
         "value": "Remember: Design around resources and contracts; make unsafe-to-repeat operations idempotent."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-api-gateway",
   "num": null,
   "title": "API Gateway",
   "stars": 1,
   "chapter": "communication",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A single entry point that routes external requests to internal services and centralises cross-cutting concerns: routing, authentication, authorization, rate limiting, TLS termination, request aggregation."
      }
     ]
    },
    {
     "type": "code",
     "value": "Client -> API Gateway\n            |-- /users    -> User Service\n            |-- /orders   -> Order Service\n            |-- /payments -> Payment Service"
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
             "value": "Why, if services already have APIs?"
            }
           ]
          },
          {
           "type": "text",
           "value": " It centralises external access policy and hides internal locations, so clients need not know every endpoint."
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
             "value": "What not to put in it:"
            }
           ]
          },
          {
           "type": "text",
           "value": " business rules. Those belong in the owning service. A gateway must not become a bottleneck or a second monolith."
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
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Gateway vs load balancer:"
        }
       ]
      },
      {
       "type": "text",
       "value": " a load balancer spreads traffic across instances; a gateway understands API routing and applies policies (auth, rate limiting). They overlap and are often used together."
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
         "value": "Remember: The gateway is the front door for policy and routing, not for business logic."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-service-discovery-and-load-balancing",
   "num": null,
   "title": "Service discovery and load balancing",
   "stars": 1,
   "chapter": "service-discovery-and-config",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Service discovery"
        }
       ]
      },
      {
       "type": "text",
       "value": " finds the current network location of a service instance, using a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "service registry"
        }
       ]
      },
      {
       "type": "text",
       "value": " (a directory of instances and addresses) kept fresh with "
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Client-side discovery:"
            }
           ]
          },
          {
           "type": "text",
           "value": " the caller picks an instance from the registry."
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
             "value": "Server-side discovery:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a router or load balancer picks."
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
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Load balancing"
        }
       ]
      },
      {
       "type": "text",
       "value": " distributes requests across instances: "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "round robin"
        }
       ]
      },
      {
       "type": "text",
       "value": " (in sequence), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "least connections"
        }
       ]
      },
      {
       "type": "text",
       "value": " (fewest active), or "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "weighted"
        }
       ]
      },
      {
       "type": "text",
       "value": " (set proportions)."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Rules:"
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
           "value": "Don't hardcode instance IPs when instances change."
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
           "value": "A healthy instance can still be overloaded."
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
           "value": "Load balancing is not fault tolerance: failed instances must be detected and removed from routing."
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
         "value": "Remember: Discovery = "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "where"
          }
         ]
        },
        {
         "type": "text",
         "value": " is the service; load balancing = "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "which instance"
          }
         ]
        },
        {
         "type": "text",
         "value": " gets this request."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-configuration-management",
   "num": null,
   "title": "Configuration management",
   "stars": 0,
   "chapter": "service-discovery-and-config",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Keep environment-specific settings "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "outside"
        }
       ]
      },
      {
       "type": "text",
       "value": " the code (externalized configuration) via environment variables or a central "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "config server"
        }
       ]
      },
      {
       "type": "text",
       "value": ". The same immutable build artifact is promoted across environments."
      }
     ]
    },
    {
     "type": "code",
     "value": "server.port=8080\nspring.datasource.url=${DB_URL}\nspring.datasource.username=${DB_USERNAME}\nspring.datasource.password=${DB_PASSWORD}",
     "lang": "yaml"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Rules: keep secrets out of source control, validate required config at startup, use different settings per environment, avoid "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "configuration drift"
        }
       ]
      },
      {
       "type": "text",
       "value": " (instances silently differing), and rotate secrets in a controlled way. "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Feature flags"
        }
       ]
      },
      {
       "type": "text",
       "value": " toggle capability without a redeploy."
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
         "value": "Remember: Config and secrets live in the environment, not in the code or the image."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-the-core-patterns",
   "num": null,
   "title": "The core patterns",
   "stars": 2,
   "chapter": "resilience",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "One of the most-asked topics. The building blocks of surviving partial failure:"
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
             "value": "Timeout:"
            }
           ]
          },
          {
           "type": "text",
           "value": " stop waiting after a set period instead of hanging. Set one on "
          },
          {
           "type": "emphasis",
           "children": [
            {
             "type": "text",
             "value": "every"
            }
           ]
          },
          {
           "type": "text",
           "value": " remote call."
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
             "value": "Retry:"
            }
           ]
          },
          {
           "type": "text",
           "value": " try again, but only for transient errors; bound the attempts."
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
             "value": "Exponential backoff + jitter:"
            }
           ]
          },
          {
           "type": "text",
           "value": " grow the delay between retries and add randomness so clients don't all retry at once."
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
             "value": "Circuit breaker:"
            }
           ]
          },
          {
           "type": "text",
           "value": " stop calling a dependency that keeps failing."
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
             "value": "Fallback:"
            }
           ]
          },
          {
           "type": "text",
           "value": " return an alternative response when a dependency is down."
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
           "value": " isolate resources (e.g. thread pools) so one failing dependency can't consume everything."
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
             "value": "Backpressure / rate limiting / concurrency limits:"
            }
           ]
          },
          {
           "type": "text",
           "value": " cap incoming or in-flight work."
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
             "value": "Fail fast"
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
             "value": "graceful degradation:"
            }
           ]
          },
          {
           "type": "text",
           "value": " error quickly, and keep essential features working while dropping nonessential ones."
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
       "value": "Watch for a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "retry storm"
        }
       ]
      },
      {
       "type": "text",
       "value": ": a surge of retries that worsens an existing failure."
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
         "value": "Remember: Timeout + bounded retry + circuit breaker + bulkhead is the standard resilience kit."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-circuit-breaker-states",
   "num": null,
   "title": "Circuit breaker states",
   "stars": 0,
   "chapter": "resilience",
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
             "value": "CLOSED:"
            }
           ]
          },
          {
           "type": "text",
           "value": " requests flow; failures are counted."
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
             "value": "OPEN:"
            }
           ]
          },
          {
           "type": "text",
           "value": " calls fail fast; the sick dependency isn't called."
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
             "value": "HALF-OPEN:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a few test calls probe recovery. Succeed -> close; fail -> reopen."
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
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Retry vs circuit breaker:"
        }
       ]
      },
      {
       "type": "text",
       "value": " retry repeats one operation (good for transient blips); a circuit breaker temporarily blocks calls (good for a dependency failing repeatedly). Excessive retries worsen overload; a breaker prevents hammering an unhealthy dependency."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Bulkhead vs circuit breaker:"
        }
       ]
      },
      {
       "type": "text",
       "value": " the breaker stops calls to an unhealthy dependency; the bulkhead limits how much of "
      },
      {
       "type": "emphasis",
       "children": [
        {
         "type": "text",
         "value": "your"
        }
       ]
      },
      {
       "type": "text",
       "value": " resources those calls can consume."
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
         "value": "Remember: Breaker = stop calling the sick service; bulkhead = contain the blast radius."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-retry-rules-and-the-amplification-trap",
   "num": null,
   "title": "Retry rules and the amplification trap",
   "stars": 1,
   "chapter": "resilience",
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
           "value": "Timeout every remote call."
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
           "value": "Retry only likely-transient errors."
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
           "value": "Use bounded retries with backoff and jitter."
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
           "value": "Don't stack retries at multiple layers — they multiply."
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
           "value": "Be careful retrying non-idempotent operations (e.g. creating a payment)."
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
           "value": "Use an idempotency key or deduplication when a retry could cause a duplicate effect."
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
       "value": "Amplification example: if an HTTP client retries 3 times and its caller also retries 3 times, one user action can trigger up to 9 downstream attempts."
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
         "value": "Remember: Retries without idempotency and limits turn one failure into many."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-database-per-service",
   "num": null,
   "title": "Database per service",
   "stars": 2,
   "chapter": "data",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Each service owns its data store (or a logically isolated boundary) and controls how that data changes."
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
             "value": "Why own the data?"
            }
           ]
          },
          {
           "type": "text",
           "value": " If services share tables, schema changes become risky and the services couple tightly. Ownership lets internal structures change without breaking everyone."
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
             "value": "Can a service read another's DB directly?"
            }
           ]
          },
          {
           "type": "text",
           "value": " Prefer not. The owner exposes an API or publishes events instead."
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
             "value": "Does it need a separate DB server?"
            }
           ]
          },
          {
           "type": "text",
           "value": " No. Services can share a server or cluster using separate databases, schemas, and credentials. The point is ownership and controlled access, not separate hardware."
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
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Polyglot persistence"
        }
       ]
      },
      {
       "type": "text",
       "value": " lets different services use different database technologies when it helps. Sometimes a service keeps "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "duplicated"
        }
       ]
      },
      {
       "type": "text",
       "value": " copies of selected data for autonomy or performance."
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
         "value": "Remember: Own your data behind an API. Shared tables = a distributed monolith."
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
   "stars": 2,
   "chapter": "data",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A single business operation may span multiple services, each with its own database. A normal DB transaction can't commit or roll back all of them together. A "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "saga"
        }
       ]
      },
      {
       "type": "text",
       "value": " splits the work into "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "local transactions"
        }
       ]
      },
      {
       "type": "text",
       "value": ", each with a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "compensating action"
        }
       ]
      },
      {
       "type": "text",
       "value": " to undo it logically."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Order + payment saga:"
      }
     ]
    },
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
           "value": "Create order — Order Service"
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
           "value": "Reserve stock — Inventory Service"
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
           "value": "Charge payment — Payment Service"
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
           "value": "Confirm order"
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
       "value": "If payment fails after stock is reserved, release the stock and mark the order failed. Compensation is a business-level correction — a refund is not an instant un-charge, and some actions can't be perfectly reversed."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Orchestration vs choreography:"
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
           "value": "Orchestration"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Choreography"
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
           "value": "A coordinator directs the steps"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Services react to events"
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
           "value": "Workflow explicit in one place"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Workflow spread across services"
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
           "value": "Easier to follow complex flows"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Less central coordination"
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
           "value": "Coordinator can grow too complex"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Event flows hard to trace"
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
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Saga vs 2PC:"
        }
       ]
      },
      {
       "type": "text",
       "value": " a saga uses separate committed local transactions plus compensation (temporary inconsistency is possible); "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Two-Phase Commit (2PC)"
        }
       ]
      },
      {
       "type": "text",
       "value": " coordinates one distributed commit (participants may block during coordination). Use a saga for long-running cross-service workflows; use a single DB transaction when the change fits one database."
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
         "value": "Remember: A saga is not one ACID transaction — it's local commits plus compensation."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-consistency-and-cap",
   "num": null,
   "title": "Consistency and CAP",
   "stars": 1,
   "chapter": "data",
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
             "value": "Strong consistency:"
            }
           ]
          },
          {
           "type": "text",
           "value": " reads reflect the latest committed state; often more coordination."
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
             "value": "Eventual consistency:"
            }
           ]
          },
          {
           "type": "text",
           "value": " replicas may briefly disagree but converge once updates stop and propagate. It does "
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
           "value": " mean inconsistent forever."
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
           "value": "Strong"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Eventual"
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
           "value": "Fresher reads"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "May return stale data"
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
           "value": "For correctness-critical state"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "For tolerable temporary delay"
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
           "value": "May reject requests under failure"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Can improve availability"
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
       "value": "Pick strong for a bank balance or stock reservation (no overselling); eventual is fine for a review count or analytics dashboard."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "CAP theorem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " during a network "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "partition"
        }
       ]
      },
      {
       "type": "text",
       "value": ", a distributed data system can't guarantee both "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "linearizable consistency"
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
         "value": "availability"
        }
       ]
      },
      {
       "type": "text",
       "value": " for every request. A CP choice rejects or delays some operations to stay consistent; an AP choice keeps serving and allows temporary disagreement. Real systems are nuanced — don't label every database as simply \"CP\" or \"AP\"."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Other guarantees interviewers mention: "
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
       "value": " (you see your own updates) and "
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
       "value": " (causally related operations are seen in order). Hazards: "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "clock skew"
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
         "value": "race conditions"
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
         "value": "split brain"
        }
       ]
      },
      {
       "type": "text",
       "value": " (two nodes both think they're leader), solved partly with a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "quorum"
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
         "value": "Remember: During a partition you choose: reject to stay consistent (CP), or serve possibly-stale data (AP)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-caching",
   "num": null,
   "title": "Caching",
   "stars": 0,
   "chapter": "data",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Store reusable data for fast access. A "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "cache hit"
        }
       ]
      },
      {
       "type": "text",
       "value": " finds it; a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "cache miss"
        }
       ]
      },
      {
       "type": "text",
       "value": " must fetch it elsewhere. "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "TTL"
        }
       ]
      },
      {
       "type": "text",
       "value": " expires entries; "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "invalidation"
        }
       ]
      },
      {
       "type": "text",
       "value": " removes stale ones."
      }
     ]
    },
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
         "value": "cache-aside"
        }
       ]
      },
      {
       "type": "text",
       "value": " (app reads cache, loads from source on a miss and stores it), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "write-through"
        }
       ]
      },
      {
       "type": "text",
       "value": " (write cache + store together), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "write-behind"
        }
       ]
      },
      {
       "type": "text",
       "value": " (cache first, store later). A "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "distributed cache"
        }
       ]
      },
      {
       "type": "text",
       "value": " (often Redis) shares data across instances."
      }
     ]
    },
    {
     "type": "code",
     "value": "Product product = cache.get(id);\nif (product == null) {\n    product = repository.findById(id);\n    cache.put(id, product);\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Hazards: "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "cache stampede"
        }
       ]
      },
      {
       "type": "text",
       "value": " (many requests reload the same expired key), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "penetration"
        }
       ]
      },
      {
       "type": "text",
       "value": " (requests for nonexistent data bypass the cache), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "avalanche"
        }
       ]
      },
      {
       "type": "text",
       "value": " (many keys expire together). Redis also gives counters, TTLs, and distributed locks — but don't rely on a simple lock for correctness without understanding expiry and fencing, and don't assume read-then-write is atomic just because it's Redis."
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
         "value": "Remember: The cache is not the source of truth, and invalidation is the hard part."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-kafka-and-event-driven-architecture",
   "num": null,
   "title": "Kafka and event-driven architecture",
   "stars": 1,
   "chapter": "messaging",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "In "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "event-driven architecture (EDA)"
        }
       ]
      },
      {
       "type": "text",
       "value": ", services produce and consume events through a broker. Core Kafka terms:"
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
           "value": " a named stream of records. "
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
           "value": " a slice of a topic giving parallelism and ordering "
          },
          {
           "type": "emphasis",
           "children": [
            {
             "type": "text",
             "value": "within"
            }
           ]
          },
          {
           "type": "text",
           "value": " that partition."
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
             "value": "Offset:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a consumer's position in a partition. "
          },
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
           "value": " consumers coordinating to split partitions."
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
             "value": "Broker:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a Kafka server. "
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
           "value": " copies kept per partition."
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
             "value": "Dead-letter queue (DLQ):"
            }
           ]
          },
          {
           "type": "text",
           "value": " where messages go after failing too many times. A "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "poison message"
            }
           ]
          },
          {
           "type": "text",
           "value": " keeps failing. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Consumer lag:"
            }
           ]
          },
          {
           "type": "text",
           "value": " how far behind a consumer is. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Replay:"
            }
           ]
          },
          {
           "type": "text",
           "value": " reprocessing stored events."
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
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Kafka vs RabbitMQ:"
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
           "value": "Kafka"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "RabbitMQ"
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
           "value": "Distributed event/log platform"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Broker with many messaging patterns"
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
           "value": "Ordered records in partitions"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Queues, exchanges, routing"
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
           "value": "Records replayable within retention"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Queue behaviour depends on acks/config"
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
           "value": "Event streams, high throughput"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Task queues, flexible routing"
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
           "value": "Ordering per partition"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Ordering depends on setup"
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
       "value": "Neither is universally better — choose on ordering, replay, routing, delivery, throughput, and ops needs."
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
         "value": "Remember: Kafka = replayable ordered log per partition; RabbitMQ = flexible routing and task queues."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-delivery-guarantees-and-idempotent-consumers",
   "num": null,
   "title": "Delivery guarantees and idempotent consumers",
   "stars": 1,
   "chapter": "messaging",
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
           "value": " 0 or 1 delivery; can be lost."
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
           "value": " 1 or more; duplicates possible (the common default)."
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
             "value": "Exactly-once:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a defined guarantee "
          },
          {
           "type": "emphasis",
           "children": [
            {
             "type": "text",
             "value": "within a specified processing boundary"
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
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because duplicates happen, build an "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "idempotent consumer"
        }
       ]
      },
      {
       "type": "text",
       "value": ": processing the same message twice has the same business effect. Use an "
      },
      {
       "type": "inlineCode",
       "value": "eventId"
      },
      {
       "type": "text",
       "value": " and persist a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "deduplication"
        }
       ]
      },
      {
       "type": "text",
       "value": " record alongside the business update, ideally in the same DB transaction."
      }
     ]
    },
    {
     "type": "code",
     "value": "{ \"eventId\": \"evt-123\", \"eventType\": \"OrderCreated\", \"orderId\": \"ord-456\", \"version\": 1 }",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Key point: Kafka's exactly-once features do "
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
       "value": " make arbitrary external DB writes or payment-API calls globally exactly-once."
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
         "value": "Remember: Assume at-least-once; make consumers idempotent."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-outbox-and-inbox",
   "num": null,
   "title": "Outbox and inbox",
   "stars": 1,
   "chapter": "messaging",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Problem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " a service commits its DB change but crashes before publishing the event — the event is lost."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Outbox pattern:"
        }
       ]
      },
      {
       "type": "text",
       "value": " save the business change "
      },
      {
       "type": "emphasis",
       "children": [
        {
         "type": "text",
         "value": "and"
        }
       ]
      },
      {
       "type": "text",
       "value": " an event row in the same local transaction. A separate publisher reads the outbox and sends the event."
      }
     ]
    },
    {
     "type": "code",
     "value": "Local transaction: 1. save order  2. save OrderCreated in outbox\nPublisher:         3. read outbox 4. publish 5. mark published"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The publisher may publish more than once, so consumers stay idempotent. The "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "transactional inbox"
        }
       ]
      },
      {
       "type": "text",
       "value": " is the mirror: record incoming message ids with the business update to drop duplicates."
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
         "value": "Remember: Outbox makes publishing reliable; the inbox makes consuming deduplicated. Neither removes the need for idempotency."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-logs-metrics-and-traces",
   "num": null,
   "title": "Logs, metrics, and traces",
   "stars": 1,
   "chapter": "observability",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Three pillars:"
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
           "value": "Type"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Answers"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Example"
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
           "value": "Logs"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "What happened?"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Payment API returned a timeout"
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
           "value": "Metrics"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "How much / how often?"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "8% of payment calls failed"
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
           "value": "Traces"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Where did time go?"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Order waited 2s on Payment"
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
             "value": "Distributed tracing"
            }
           ]
          },
          {
           "type": "text",
           "value": " follows one request across services. A "
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
           "value": " is the end-to-end journey; a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "span"
            }
           ]
          },
          {
           "type": "text",
           "value": " is one operation within it; a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "trace ID"
            }
           ]
          },
          {
           "type": "text",
           "value": " ties spans together; a "
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
           "value": " links related logs."
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
           "value": "Prefer "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "structured logging"
            }
           ]
          },
          {
           "type": "text",
           "value": " (JSON fields). "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "OpenTelemetry"
            }
           ]
          },
          {
           "type": "text",
           "value": " is the standard for generating and exporting telemetry."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "Trace request-123:  Gateway 20ms  Order 40ms  Inventory 80ms  Payment 1500ms"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The trace fingers Payment as the latency source."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Reliability terms: "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "SLI"
        }
       ]
      },
      {
       "type": "text",
       "value": " (a measurement), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "SLO"
        }
       ]
      },
      {
       "type": "text",
       "value": " (a target), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "SLA"
        }
       ]
      },
      {
       "type": "text",
       "value": " (an agreement with consequences); watch "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "error rate"
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
         "value": "latency percentiles"
        }
       ]
      },
      {
       "type": "text",
       "value": " (p95), and "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "throughput"
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
       "value": "Rules: propagate trace context across calls, avoid high-cardinality labels (unique user IDs), never log secrets, and remember a "
      },
      {
       "type": "inlineCode",
       "value": "200"
      },
      {
       "type": "text",
       "value": " response doesn't always mean the business operation succeeded — monitor user-facing outcomes."
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
         "value": "Remember: Logs say what, metrics say how much, traces say where the time went."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-containers-and-kubernetes",
   "num": null,
   "title": "Containers and Kubernetes",
   "stars": 1,
   "chapter": "deployment",
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
           "value": " a packaged app sharing the host OS kernel. A "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Docker image"
            }
           ]
          },
          {
           "type": "text",
           "value": " is the template; a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "container"
            }
           ]
          },
          {
           "type": "text",
           "value": " is a running instance."
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
             "value": "Kubernetes"
            }
           ]
          },
          {
           "type": "text",
           "value": " orchestrates containers across a cluster. A "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Pod"
            }
           ]
          },
          {
           "type": "text",
           "value": " is the smallest unit (one or more containers); a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Deployment"
            }
           ]
          },
          {
           "type": "text",
           "value": " manages replicated pods and rolling updates; a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Service"
            }
           ]
          },
          {
           "type": "text",
           "value": " is a stable endpoint for a group of pods; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Ingress"
            }
           ]
          },
          {
           "type": "text",
           "value": " handles HTTP(S) routing in (needs a controller)."
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
             "value": "ConfigMap"
            }
           ]
          },
          {
           "type": "text",
           "value": " holds non-secret config; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Secret"
            }
           ]
          },
          {
           "type": "text",
           "value": " holds sensitive config."
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
             "value": "Probes:"
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
           "value": " (should it get traffic?), "
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
           "value": " (should it be restarted?), "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "startup"
            }
           ]
          },
          {
           "type": "text",
           "value": " (grace period for slow starts)."
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
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Docker vs Kubernetes:"
        }
       ]
      },
      {
       "type": "text",
       "value": " Docker builds and runs containers; Kubernetes manages them across a cluster. Neither replaces app-level timeouts, retries, or resilience, and Kubernetes won't detect application-level business failures."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Rules: a restart doesn't fix the bug; stateless services scale horizontally more easily; store persistent data in real storage, not the container's writable layer."
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
         "value": "Remember: Kubernetes keeps containers running and scaled — it does not fix your application logic."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-deployment-strategies",
   "num": null,
   "title": "Deployment strategies",
   "stars": 0,
   "chapter": "deployment",
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
             "value": "Rolling:"
            }
           ]
          },
          {
           "type": "text",
           "value": " gradually replace old instances with new."
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
             "value": "Blue-green:"
            }
           ]
          },
          {
           "type": "text",
           "value": " keep two environments and switch traffic to the new one."
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
             "value": "Canary:"
            }
           ]
          },
          {
           "type": "text",
           "value": " send a small slice of traffic to the new version first, then expand."
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
           "value": " toggle a feature without deploying."
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
             "value": "CI/CD:"
            }
           ]
          },
          {
           "type": "text",
           "value": " integrate and test continuously; automate release prep or release itself."
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
       "value": "For zero-downtime: use rolling/blue-green/canary with readiness checks and backward-compatible API and DB changes. Zero downtime is a goal, not an automatic guarantee."
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
         "value": "Remember: Ship gradually, keep changes backward-compatible, and let readiness gate traffic."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-auth-across-services",
   "num": null,
   "title": "Auth across services",
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
             "value": "Authentication"
            }
           ]
          },
          {
           "type": "text",
           "value": " = who are you; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "authorization"
            }
           ]
          },
          {
           "type": "text",
           "value": " = what you may do."
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
             "value": "JWT:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a token carrying signed claims. "
          },
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
           "value": " an authorization framework; "
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
           "value": " an identity layer on top. An "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "access token"
            }
           ]
          },
          {
           "type": "text",
           "value": " reaches resources; a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "refresh token"
            }
           ]
          },
          {
           "type": "text",
           "value": " gets new access tokens."
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
             "value": "mTLS:"
            }
           ]
          },
          {
           "type": "text",
           "value": " both sides authenticate with certificates — common for service-to-service."
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
             "value": "Zero-trust:"
            }
           ]
          },
          {
           "type": "text",
           "value": " don't trust a request just because it's internal."
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
       "value": "JWT flow: user authenticates with an identity provider -> client gets an access token -> sends "
      },
      {
       "type": "inlineCode",
       "value": "Authorization: Bearer ..."
      },
      {
       "type": "text",
       "value": " -> the service validates signature and claims -> then checks authorization."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Rules:"
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
           "value": "A JWT is usually "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "signed, not encrypted"
            }
           ]
          },
          {
           "type": "text",
           "value": " — its payload isn't secret."
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
           "value": "Check expiry, issuer, audience, and allowed signing algorithms."
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
           "value": "A valid token doesn't grant access to everything (authN != authZ)."
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
           "value": "Keep secrets out of code and browser-exposed config; apply "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "least privilege"
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
             "value": "secrets management"
            }
           ]
          },
          {
           "type": "text",
           "value": "; use HTTPS; never log tokens or sensitive data."
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
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "API key vs JWT:"
        }
       ]
      },
      {
       "type": "text",
       "value": " an API key is a shared secret-like credential; a JWT carries signed claims. Neither is secure by format alone — expiration, scope, storage, validation, and revocation decide that."
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
         "value": "Remember: Signed JWT, validated claims, least privilege, and no trust just because it's internal."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-common-design-patterns",
   "num": null,
   "title": "Common design patterns",
   "stars": 1,
   "chapter": "patterns-testing-and-spring",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Beyond gateway, discovery, saga, circuit breaker, bulkhead, retry, timeout, outbox, and inbox (covered above), know:"
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
             "value": "Strangler Fig:"
            }
           ]
          },
          {
           "type": "text",
           "value": " gradually replace a legacy system by routing more traffic to new services until the old part is retired."
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
             "value": "Sidecar:"
            }
           ]
          },
          {
           "type": "text",
           "value": " run a supporting component alongside an app instance."
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
             "value": "Backend for Frontend (BFF):"
            }
           ]
          },
          {
           "type": "text",
           "value": " a backend tailored to one client type."
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
           "value": " separate the write model from the read model."
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
             "value": "Event Sourcing:"
            }
           ]
          },
          {
           "type": "text",
           "value": " store state changes as a sequence of events and rebuild state from them."
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
             "value": "Anti-corruption layer:"
            }
           ]
          },
          {
           "type": "text",
           "value": " translate between models to protect one domain from another's design."
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
             "value": "Leader election:"
            }
           ]
          },
          {
           "type": "text",
           "value": " pick one participant to coordinate a task."
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
           "value": "Pattern"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Main purpose"
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
           "value": "Saga"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Multi-service business transaction"
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
           "value": "Outbox"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Don't lose events after a DB commit"
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
           "value": "CQRS"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Separate reads from writes"
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
           "value": "Event Sourcing"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Store state changes as events"
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
           "value": "Strangler Fig"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Migrate a legacy system gradually"
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
           "value": "BFF"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Tailor APIs to a specific frontend"
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
           "value": "Anti-corruption layer"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Shield a domain from external models"
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
           "value": "Sidecar"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Add supporting functionality alongside an app"
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
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "CQRS vs Event Sourcing:"
        }
       ]
      },
      {
       "type": "text",
       "value": " CQRS separates read/write models and does "
      },
      {
       "type": "emphasis",
       "children": [
        {
         "type": "text",
         "value": "not"
        }
       ]
      },
      {
       "type": "text",
       "value": " require event sourcing; event sourcing makes events the authoritative record and does "
      },
      {
       "type": "emphasis",
       "children": [
        {
         "type": "text",
         "value": "not"
        }
       ]
      },
      {
       "type": "text",
       "value": " require separate models. They combine but solve different problems."
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
         "value": "Remember: These patterns are tools — name the problem first, then the pattern."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-testing-microservices",
   "num": null,
   "title": "Testing microservices",
   "stars": 0,
   "chapter": "patterns-testing-and-spring",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The testing pyramid: many fast "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "unit"
        }
       ]
      },
      {
       "type": "text",
       "value": " tests at the base, some "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "integration"
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
         "value": "contract"
        }
       ]
      },
      {
       "type": "text",
       "value": " tests in the middle, few slow "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "E2E"
        }
       ]
      },
      {
       "type": "text",
       "value": " tests at the top. Also useful: "
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
       "value": ", "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "smoke"
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
         "value": "load"
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
         "value": "stress"
        }
       ]
      },
      {
       "type": "text",
       "value": " testing, and "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "chaos engineering"
        }
       ]
      },
      {
       "type": "text",
       "value": " (inject failures to test resilience)."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Contract testing"
        }
       ]
      },
      {
       "type": "text",
       "value": " is the standout for microservices: it verifies a consumer's expectations match a provider's API. Example: Order Service expects "
      },
      {
       "type": "inlineCode",
       "value": "paymentStatus"
      },
      {
       "type": "text",
       "value": " but Payment renames it to "
      },
      {
       "type": "inlineCode",
       "value": "status"
      },
      {
       "type": "text",
       "value": " — a contract test catches this before production."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Rules: unit tests can't prove remote integration; E2E is valuable but slow and fragile; test timeouts, retries, duplicate messages, and dependency failures, not just the happy path; verify backward compatibility when changing API or event schemas."
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
         "value": "Remember: Contract tests catch cross-service breakage early; test failure paths, not just success."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-microservices-with-spring-boot",
   "num": null,
   "title": "Microservices with Spring Boot",
   "stars": 1,
   "chapter": "patterns-testing-and-spring",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Typical stack (options, not mandatory): "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Spring Boot"
        }
       ]
      },
      {
       "type": "text",
       "value": " (standalone apps), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Spring Web"
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
         "value": "Spring Data JPA"
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
         "value": "Spring Security"
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
         "value": "Spring Cloud"
        }
       ]
      },
      {
       "type": "text",
       "value": " (distributed-system patterns), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Spring Cloud Gateway"
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
         "value": "OpenFeign"
        }
       ]
      },
      {
       "type": "text",
       "value": " / "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "WebClient"
        }
       ]
      },
      {
       "type": "text",
       "value": " / "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "RestClient"
        }
       ]
      },
      {
       "type": "text",
       "value": " (HTTP clients), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Resilience4j"
        }
       ]
      },
      {
       "type": "text",
       "value": " (circuit breaker, retry, rate limiter), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Spring for Apache Kafka"
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
         "value": "Micrometer"
        }
       ]
      },
      {
       "type": "text",
       "value": " + "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Actuator"
        }
       ]
      },
      {
       "type": "text",
       "value": " (metrics and management), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Eureka"
        }
       ]
      },
      {
       "type": "text",
       "value": " (registry), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Config Server"
        }
       ]
      },
      {
       "type": "text",
       "value": ". Modern deployments often use Kubernetes discovery instead of Eureka."
      }
     ]
    },
    {
     "type": "code",
     "value": "@RestController\n@RequestMapping(\"/orders\")\npublic class OrderController {\n    @GetMapping(\"/{id}\")\n    public String getOrder(@PathVariable Long id) {\n        return \"Order ID: \" + id;\n    }\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Calling another service (illustrative — a real call needs timeouts, error handling, auth):"
      }
     ]
    },
    {
     "type": "code",
     "value": "RestClient restClient = builder.baseUrl(\"http://payment-service\").build();\nString body = restClient.get()\n        .uri(\"/payments/{id}\", orderId)\n        .retrieve()\n        .body(String.class);",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Spring Boot vs Spring Cloud:"
        }
       ]
      },
      {
       "type": "text",
       "value": " Boot builds and runs one app; Cloud adds integrations and patterns for distributed systems. Spring Cloud does "
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
       "value": " by itself make an architecture microservices — boundaries, data ownership, communication, and ops do."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Transaction rule:"
        }
       ]
      },
      {
       "type": "text",
       "value": " a local "
      },
      {
       "type": "inlineCode",
       "value": "@Transactional"
      },
      {
       "type": "text",
       "value": " covers only resources under its transaction manager. It does "
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
       "value": " make HTTP calls to other services part of one atomic transaction. If Order Service calls Payment Service, a local rollback can't reverse a successful payment — use business compensation (a refund)."
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
         "value": "Remember: Spring Cloud is plumbing; a local "
        },
        {
         "type": "inlineCode",
         "value": "@Transactional"
        },
        {
         "type": "text",
         "value": " never spans services."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-quick-comparison-table",
   "num": null,
   "title": "Quick comparison table",
   "stars": 1,
   "chapter": "why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The confusing pairs interviewers love, in one place:"
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
           "value": "A"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "B"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "The difference"
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
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "One deployable unit vs independently deployable services"
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
           "value": "REST"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Messaging"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Request-response vs message-based, often async"
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
           "value": "API Gateway"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Load Balancer"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "API policy and routing vs traffic distribution"
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
           "value": "Service Discovery"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Load Balancing"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Find instances vs distribute requests"
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
           "value": "Timeout"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Retry"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Stop waiting vs attempt again"
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
           "value": "Retry"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Circuit Breaker"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Repeat a call vs temporarily stop calling"
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
           "value": "Circuit Breaker"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Bulkhead"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Stop calls to a sick dependency vs isolate resources"
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
           "value": "Authentication"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Authorization"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Who are you? vs what can you do?"
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
           "value": "Strong"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Eventual Consistency"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Fresher guarantees vs possible temporary staleness"
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
           "value": "Saga"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "2PC"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Local transactions + compensation vs coordinated distributed commit"
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
           "value": "Orchestration"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Choreography"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Central coordinator vs event-driven collaboration"
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
           "value": "CQRS"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Event Sourcing"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Separate read/write models vs event-based history"
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
           "value": "Outbox"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Inbox"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Reliable publishing vs deduplicated consuming"
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
           "value": "Logs"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Metrics"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Individual events vs numbers over time"
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
           "value": "Logs"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Traces"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Diagnostic records vs end-to-end request journey"
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
           "value": "Vertical"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Horizontal Scaling"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Bigger machine vs more instances"
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
           "value": "Liveness"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Readiness"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Should restart? vs should get traffic?"
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
           "value": "Topic"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Work distribution vs named event stream"
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
           "value": "Idempotency"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Deduplication"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Repeated effect is safe vs recognising repeats"
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
           "value": "Deployment"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Scaling"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Releasing a version vs changing capacity"
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
           "value": "Availability"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Reliability"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Usable when needed vs correct over time"
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
   "id": "s-scaling-and-performance",
   "num": null,
   "title": "Scaling and performance",
   "stars": 1,
   "chapter": "why-x-vs-y-comparisons",
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
             "value": "Vertical scaling:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a bigger machine. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Horizontal scaling:"
            }
           ]
          },
          {
           "type": "text",
           "value": " more instances — works best when requests are independent and the service is "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "stateless"
            }
           ]
          },
          {
           "type": "text",
           "value": " (no local in-memory session). Use external session storage or stateless tokens so requests can hit any instance."
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
             "value": "Latency"
            }
           ]
          },
          {
           "type": "text",
           "value": " = how long one request takes; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "throughput"
            }
           ]
          },
          {
           "type": "text",
           "value": " = how many complete per unit time; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "concurrency"
            }
           ]
          },
          {
           "type": "text",
           "value": " = how many run at once. A system can have high throughput "
          },
          {
           "type": "emphasis",
           "children": [
            {
             "type": "text",
             "value": "and"
            }
           ]
          },
          {
           "type": "text",
           "value": " high per-request latency."
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
           "value": "Reuse resources with "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "connection pooling"
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
             "value": "thread pools"
            }
           ]
          },
          {
           "type": "text",
           "value": "; reduce overhead with "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "batching"
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
             "value": "pagination"
            }
           ]
          },
          {
           "type": "text",
           "value": "; watch the "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "N+1 query problem"
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
             "value": "resource exhaustion"
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
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Rules: more threads aren't always faster; async isn't automatically faster (it adds coordination); profile the real bottleneck before scaling; size a service's DB connection pool against the database's total capacity."
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
         "value": "Remember: Scale out stateless services; measure the bottleneck before adding capacity."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-must-remember-traps",
   "num": null,
   "title": "Must-remember traps",
   "stars": 1,
   "chapter": "why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The mistakes interviewers probe for:"
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
           "value": "A network call can fail even when both services are up — always set timeouts."
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
           "value": "Retries need limits, backoff, and idempotency; circuit breakers and bulkheads solve different problems."
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
           "value": "Kafka delivery doesn't make external business effects exactly-once; an outbox solves reliable publishing, not every duplication."
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
           "value": "A saga is not one ACID transaction across services; eventual consistency means handling stale and delayed data."
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
           "value": "A JWT isn't necessarily encrypted, and authentication doesn't imply authorization."
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
           "value": "An API gateway shouldn't hold all business logic; a shared database makes services a distributed monolith."
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
           "value": "Kubernetes restarts containers but can't fix bugs or detect business failures."
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
           "value": "Microservices add operational complexity — prefer a modular monolith when it fits."
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
       "value": "Interview strategy for \"design microservices for order-payment-inventory\": walk through service "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "boundaries"
        }
       ]
      },
      {
       "type": "text",
       "value": " first, then "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "communication"
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
         "value": "data ownership"
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
         "value": "failure handling"
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
         "value": "transaction consistency (saga + idempotency)"
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
         "value": "observability"
        }
       ]
      },
      {
       "type": "text",
       "value": ". That sequence connects most concepts into one answer."
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
         "value": "Remember: Most microservices answers come back to boundaries, failure handling, and consistency."
        }
       ]
      }
     ]
    }
   ]
  }
 ]
};
