// AUTO-GENERATED from reference/redis.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs redis
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const redisCheatsheet: CheatDoc = {
 "title": "Redis",
 "tagline": "The whole topic on one page — data types, patterns and the rules to remember.",
 "chapters": [
  {
   "id": "redis-interview-cheat-sheet",
   "title": "Redis — Interview Cheat Sheet"
  },
  {
   "id": "fundamentals",
   "title": "Fundamentals"
  },
  {
   "id": "data-types-commands",
   "title": "Data Types & Commands"
  },
  {
   "id": "keys-expiry",
   "title": "Keys & Expiry"
  },
  {
   "id": "persistence-scaling",
   "title": "Persistence & Scaling"
  },
  {
   "id": "patterns",
   "title": "Patterns"
  },
  {
   "id": "transactions-scripting",
   "title": "Transactions & Scripting"
  },
  {
   "id": "redis-in-spring-boot",
   "title": "Redis in Spring Boot"
  },
  {
   "id": "common-why-x-vs-y-comparisons",
   "title": "Common \"Why X vs Y?\" Comparisons"
  }
 ],
 "sections": [
  {
   "id": "s-redis-interview-cheat-sheet",
   "num": null,
   "title": "Redis — Interview Cheat Sheet",
   "stars": 0,
   "chapter": "redis-interview-cheat-sheet",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Idea-level revision for Java Backend / Spring Boot / Microservices interviews. Running example: a payment service where a customer pays by UPI, card, or wallet."
      }
     ]
    }
   ]
  },
  {
   "id": "s-what-redis-is",
   "num": null,
   "title": "What Redis Is",
   "stars": 2,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Redis is an in-memory key-value store: values are indexed by keys and served from RAM, which makes access very fast."
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
           "value": "It is more than a cache. It also powers counters, sessions, rate limiting, ephemeral state, and messaging patterns."
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
           "value": "A cache is a temporary copy of data kept to avoid expensive database or service calls."
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
         "value": "Remember: Redis is fast because it lives in memory, but it is a separate store — not automatically your authoritative business data."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-cache-hit-miss-and-ttl",
   "num": null,
   "title": "Cache Hit, Miss and TTL",
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
           "type": "text",
           "value": "Cache hit: requested data is found in the cache."
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
           "value": "Cache miss: data is absent and must be fetched from the source store."
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
           "value": "TTL (Time To Live): the time after which a key expires."
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
           "value": "Atomic operation: appears indivisible to other clients."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "Request\n   └─ Check Redis\n        ├─ Hit  → return cached value\n        └─ Miss → read PostgreSQL → store in Redis → return"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Keep the database as the source of truth; use Redis to accelerate reads."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-data-types",
   "num": null,
   "title": "Data Types",
   "stars": 2,
   "chapter": "data-types-commands",
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
           "value": "Type"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Holds"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Use for"
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
           "value": "String"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "text, numbers, JSON, bytes"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "simple values, counters"
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
           "value": "Hash"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "fields and values under one key"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "object-like data"
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
           "value": "List"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "ordered values, push/pop at both ends"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "queues, timelines"
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
           "value": "Set"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "unique values"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "membership, dedup"
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
           "value": "Sorted Set (ZSET)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "unique members ordered by score"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "leaderboards, rankings"
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
           "value": "Stream"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "append-only log with IDs"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "event logs, consumer groups"
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
           "value": "Bitmap"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "bit operations on a string"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "flags, presence tracking"
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
           "value": "HyperLogLog"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "approximate distinct count, small memory"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "unique-visitor estimates"
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
           "value": "Geospatial"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "coordinates"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "nearby-location queries"
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
           "value": "Pub/Sub delivers messages to currently subscribed clients, with no durable history."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "SADD payment:PAY101:events CREATED\nSADD payment:PAY101:events CREATED\nSCARD payment:PAY101:events   -- returns 1: a Set keeps unique members"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Pick the type by shape of data — ZSET for ranking, Set for uniqueness, Hash for objects."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-core-commands",
   "num": null,
   "title": "Core Commands",
   "stars": 0,
   "chapter": "data-types-commands",
   "nodes": [
    {
     "type": "code",
     "value": "SET key value              # store a value\nGET key                    # read a string\nDEL key                    # delete\nEXISTS key                 # 1 if present\nINCR key                   # atomically increment an integer\nMGET k1 k2                 # read many strings\nHSET / HGET                # write / read hash fields\nLPUSH / RPUSH              # insert at left / right of a list\nSADD / SISMEMBER           # add a set member / check membership\nZADD / ZRANGE              # add scored member / read in order",
     "lang": "bash"
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
         "value": "INCR"
        },
        {
         "type": "text",
         "value": " and other single commands are atomic — no extra locking needed."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-ttl-and-expiry",
   "num": null,
   "title": "TTL and Expiry",
   "stars": 1,
   "chapter": "keys-expiry",
   "nodes": [
    {
     "type": "code",
     "value": "SET payment:PAY101 PENDING EX 300   # value with a 5-minute expiry\nEXPIRE key seconds                  # set a relative expiry\nTTL key                             # remaining seconds\nSET key value NX EX seconds         # set only if absent, with expiry",
     "lang": "bash"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Expiry is not a precise callback. Redis deletes expired keys by its own mechanism; never depend on the exact instant."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-eviction-and-memory",
   "num": null,
   "title": "Eviction and Memory",
   "stars": 1,
   "chapter": "keys-expiry",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "When memory hits "
      },
      {
       "type": "inlineCode",
       "value": "maxmemory"
      },
      {
       "type": "text",
       "value": ", the eviction policy decides what to remove."
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
           "value": "Policy"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Behaviour"
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
           "value": "noeviction"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "reject memory-consuming writes"
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
           "value": "allkeys-lru"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "evict least-recently-used across all keys"
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
           "value": "allkeys-lfu"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "evict least-frequently-used across all keys"
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
           "value": "volatile-lru"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "LRU among keys that have a TTL"
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
           "value": "volatile-ttl"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "prefer keys with the shortest remaining TTL"
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
           "value": "LRU = Least Recently Used. LFU = Least Frequently Used."
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
         "value": "Remember: TTL and eviction are different. TTL controls expiration; eviction frees memory. A key with no TTL can still be evicted under an "
        },
        {
         "type": "inlineCode",
         "value": "allkeys-*"
        },
        {
         "type": "text",
         "value": " policy."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-rdb-vs-aof",
   "num": null,
   "title": "RDB vs AOF",
   "stars": 2,
   "chapter": "persistence-scaling",
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
           "value": "RDB"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "AOF (Append Only File)"
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
           "value": "point-in-time snapshots"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "logs each write to replay on recovery"
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
           "value": "compact, faster restart"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "larger file, more complete history"
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
           "value": "can lose writes since last snapshot"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "smaller data-loss window"
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
         "value": "Remember: Durability depends on configuration and the failure scenario. A successful write does not always mean the data is already safe on disk."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-replication-sentinel-cluster",
   "num": null,
   "title": "Replication, Sentinel, Cluster",
   "stars": 1,
   "chapter": "persistence-scaling",
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
           "value": "Replication copies data from a primary to replicas; the primary takes writes, replicas can serve reads."
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
           "value": "Replication lag: a replica may briefly be behind the primary."
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
           "value": "Sentinel monitors the deployment and coordinates failover."
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
           "value": "Cluster shards keys across nodes for horizontal scaling. Sharding = splitting data across nodes."
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
         "value": "Remember: Sentinel gives high availability (failover); Cluster gives scale (sharding)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-when-redis-is-down",
   "num": null,
   "title": "When Redis Is Down",
   "stars": 0,
   "chapter": "persistence-scaling",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Decide the fallback up front: fail the request, fall back to the database, or use another controlled behaviour."
      }
     ]
    }
   ]
  },
  {
   "id": "s-caching-strategies",
   "num": null,
   "title": "Caching Strategies",
   "stars": 2,
   "chapter": "patterns",
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
           "value": "Cache-aside (lazy loading): app checks cache first, loads from DB on a miss, then stores it. Most common."
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
           "value": "Read-through: the cache layer fetches missing data itself."
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
           "value": "Write-through: writes go through the cache and the store together."
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
           "value": "Write-behind / write-back: write to cache first, persist later — faster, but risks data loss if not designed carefully."
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
           "value": "Cache invalidation: remove or refresh stale data after a successful DB change."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "PaymentConfig config = redis.get(key);\nif (config == null) {\n    config = database.findConfig();\n    redis.set(key, config, Duration.ofMinutes(5));\n}\nreturn config;",
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
         "value": "Remember: Cache-aside is the default; invalidate the cache after the database write succeeds."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-cache-failure-modes",
   "num": null,
   "title": "Cache Failure Modes",
   "stars": 1,
   "chapter": "patterns",
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
           "value": "Problem"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "What happens"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Fix"
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
           "value": "Stampede"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "many requests reload the same expired key at once"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "TTL jitter, request coalescing, controlled refresh"
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
           "value": "Penetration"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "repeated queries for data that does not exist hit the DB"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "validate inputs, briefly cache the absence (negative caching)"
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
           "value": "Avalanche"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "many keys expire together, load spikes"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "spread expiry times, throttle DB load"
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
           "value": "Stale data"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "cache no longer matches the source"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "invalidate/update after DB changes"
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
         "value": "Remember: Most cache pain comes from expiry timing — stagger TTLs and coalesce reloads."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-distributed-lock",
   "num": null,
   "title": "Distributed Lock",
   "stars": 2,
   "chapter": "patterns",
   "nodes": [
    {
     "type": "code",
     "value": "SET lock:payment:PAY101 unique-token NX EX 30   # acquire a 30s lock",
     "lang": "bash"
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
           "value": "NX"
          },
          {
           "type": "text",
           "value": " sets only if absent; "
          },
          {
           "type": "inlineCode",
           "value": "EX"
          },
          {
           "type": "text",
           "value": " gives the lock an expiry (a lease) so a dead process cannot hold it forever."
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
           "value": "Store a unique owner token. Release safely: delete only if the stored token matches yours — typically via a Lua script, never a blind "
          },
          {
           "type": "inlineCode",
           "value": "DEL"
          },
          {
           "type": "text",
           "value": " (the lock may now belong to another process)."
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
           "value": "Fencing token: a monotonically increasing number a downstream resource uses to reject a stale lock holder."
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
           "value": "Redlock: a multi-node Redis locking algorithm with its own assumptions and trade-offs."
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
         "value": "Remember: A Redis lock alone does not make a payment happen exactly once. Back it with DB constraints, idempotency keys, and provider idempotency."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-counters-and-rate-limiting",
   "num": null,
   "title": "Counters and Rate Limiting",
   "stars": 0,
   "chapter": "patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Use the atomic "
      },
      {
       "type": "inlineCode",
       "value": "INCR"
      },
      {
       "type": "text",
       "value": " on a per-user, per-window key to count requests cheaply, then compare against a limit."
      }
     ]
    }
   ]
  },
  {
   "id": "s-multi-exec-watch",
   "num": null,
   "title": "MULTI / EXEC / WATCH",
   "stars": 1,
   "chapter": "transactions-scripting",
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
           "value": "MULTI"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "EXEC"
          },
          {
           "type": "text",
           "value": ": queue commands and run them as one unit relative to other clients. "
          },
          {
           "type": "inlineCode",
           "value": "DISCARD"
          },
          {
           "type": "text",
           "value": " cancels before execution."
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
           "value": "WATCH"
          },
          {
           "type": "text",
           "value": ": optimistic concurrency — abort the transaction if a watched key changed first."
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
           "value": "Optimistic locking: proceed only if the data has not changed since you read it. Guards against a race condition (result depends on timing of concurrent ops)."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "# Lost update without atomicity:\nA: GET count → 5   B: GET count → 5\nA: SET count 6     B: SET count 6   # one increment lost\n# Safe:\nINCR payment:request-count          # both applied"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: A "
        },
        {
         "type": "inlineCode",
         "value": "MULTI"
        },
        {
         "type": "text",
         "value": "/"
        },
        {
         "type": "inlineCode",
         "value": "EXEC"
        },
        {
         "type": "text",
         "value": " block is not a relational rollback. It isolates the batch but does not undo on a runtime command error."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-lua-scripting",
   "num": null,
   "title": "Lua Scripting",
   "stars": 0,
   "chapter": "transactions-scripting",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A Lua script runs atomically inside Redis, so you can read-check-write in one step (for example, compare-and-delete a lock) without a race."
      }
     ]
    }
   ]
  },
  {
   "id": "s-spring-data-redis",
   "num": null,
   "title": "Spring Data Redis",
   "stars": 1,
   "chapter": "redis-in-spring-boot",
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
           "value": "RedisTemplate"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "StringRedisTemplate"
          },
          {
           "type": "text",
           "value": ": Spring abstractions over Redis operations."
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
           "value": "Clients: Lettuce (default in Spring Boot) or Jedis. Serialization converts Java objects into a storable form; connection pooling reuses connections where supported."
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
           "value": "Cache abstraction: "
          },
          {
           "type": "inlineCode",
           "value": "@Cacheable"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "@CachePut"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "@CacheEvict"
          },
          {
           "type": "text",
           "value": " can be backed by Redis."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "@Service\nclass PaymentService {\n    private final StringRedisTemplate redis;\n    PaymentService(StringRedisTemplate redis) { this.redis = redis; }\n\n    void cacheStatus(String id, String status) {\n        redis.opsForValue().set(\"payment:\" + id, status, Duration.ofMinutes(5));\n    }\n    String getStatus(String id) {\n        return redis.opsForValue().get(\"payment:\" + id);\n    }\n}",
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
         "value": "Remember: "
        },
        {
         "type": "inlineCode",
         "value": "opsForValue().set(...)"
        },
        {
         "type": "text",
         "value": " writes, "
        },
        {
         "type": "inlineCode",
         "value": "opsForValue().get(...)"
        },
        {
         "type": "text",
         "value": " reads — \"I configure a Redis connection and use RedisTemplate to read and write cached data.\""
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-redis-vs-database",
   "num": null,
   "title": "Redis vs Database",
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
           "value": "Redis"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "PostgreSQL / MySQL"
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
           "value": "primarily in-memory"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "primarily disk-backed"
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
           "value": "very fast key-based access"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "rich relational queries"
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
           "value": "caching, counters, short-lived state"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "durable transactional business data"
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
           "value": "persistence configurable, durability varies"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "designed for durable storage"
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
           "value": "limited query model"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "joins, indexes, constraints, transactions"
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
         "value": "Remember: For payment records, the durable database is the source of truth; Redis accelerates reads, coordinates work, or holds temporary data."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-incr-vs-get-set",
   "num": null,
   "title": "INCR vs GET + SET",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "GET + SET from two clients can lose an update (both read 5, both write 6). "
      },
      {
       "type": "inlineCode",
       "value": "INCR"
      },
      {
       "type": "text",
       "value": " is a single atomic command, so both increments apply."
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
         "value": "Remember: Prefer one atomic command over read-modify-write whenever Redis offers it."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-ttl-vs-eviction",
   "num": null,
   "title": "TTL vs Eviction",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "TTL expires a specific key after a set time; eviction removes keys under memory pressure by policy. They are independent — a key can be evicted before its TTL, or evicted with no TTL at all."
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
         "value": "Remember: TTL = time-based per key; eviction = memory-based across keys."
        }
       ]
      }
     ]
    }
   ]
  }
 ]
};
