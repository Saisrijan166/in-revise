// AUTO-GENERATED from reference/kafka.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs kafka
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const kafkaCheatsheet: CheatDoc = {
 "title": "Kafka",
 "tagline": "The whole topic on one page — the log, guarantees and the rules to remember.",
 "chapters": [
  {
   "id": "kafka-cheat-sheet",
   "title": "Kafka Cheat Sheet"
  },
  {
   "id": "fundamentals",
   "title": "Fundamentals"
  },
  {
   "id": "topics-and-partitions",
   "title": "Topics and Partitions"
  },
  {
   "id": "producers",
   "title": "Producers"
  },
  {
   "id": "consumers-and-groups",
   "title": "Consumers and Groups"
  },
  {
   "id": "storage-and-retention",
   "title": "Storage and Retention"
  },
  {
   "id": "replication-and-guarantees",
   "title": "Replication and Guarantees"
  },
  {
   "id": "platform",
   "title": "Platform"
  },
  {
   "id": "spring-boot-integration",
   "title": "Spring Boot Integration"
  },
  {
   "id": "common-why-x-vs-y-comparisons",
   "title": "Common \"Why X vs Y?\" Comparisons"
  },
  {
   "id": "interview-design-checklist",
   "title": "Interview Design Checklist"
  }
 ],
 "sections": [
  {
   "id": "s-kafka-cheat-sheet",
   "num": null,
   "title": "Kafka Cheat Sheet",
   "stars": 0,
   "chapter": "kafka-cheat-sheet",
   "nodes": [
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Mental model: Producer → Topic → Partition → Broker → Consumer Group → Consumer.\nKafka is a distributed event streaming platform that moves and stores large volumes of events reliably and with high throughput."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-what-kafka-is",
   "num": null,
   "title": "What Kafka Is",
   "stars": 1,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Kafka is a distributed, append-only log that services use to publish and consume events instead of calling each other directly."
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
           "value": "Producer publishes events; consumer reads them; Kafka stores them in between."
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
           "value": "It is chosen for high throughput, durability, horizontal scaling, replay, and decoupling services."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "Order Service → Kafka → Payment / Inventory / Notification / Analytics",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "One producer writes once; many services consume independently, so the producer does not call each service."
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
         "value": "Remember: Kafka is a durable event log, not a point-to-point RPC call."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-core-vocabulary",
   "num": null,
   "title": "Core Vocabulary",
   "stars": 0,
   "chapter": "fundamentals",
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
           "value": "Term"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Meaning"
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
           "value": "Event / record"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "A single message of data"
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
           "value": "Topic"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "A named, logical stream of events"
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
           "value": "Partition"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "A topic's ordered, append-only log; the unit of storage and parallelism"
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
           "value": "Broker"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "A Kafka server that stores partitions"
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
           "value": "Cluster"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "A group of brokers"
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
           "value": "Offset"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "A message's position within a partition"
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
           "value": "Consumer group"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Consumers sharing the work of a topic"
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
           "value": "Leader / follower"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "The broker serving a partition / brokers replicating it"
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
           "value": "Replication factor"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Number of copies of each partition"
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
           "value": "ISR"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "In-Sync Replicas: replicas caught up with the leader"
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
   "id": "s-the-append-only-log",
   "num": null,
   "title": "The Append-Only Log",
   "stars": 0,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Kafka stores each partition as an append-only log: writes only ever go to the end."
      }
     ]
    },
    {
     "type": "code",
     "value": "offset:  0  1  2  3\nvalue:   A  B  C  D",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Sequential append (no random writes) is a key reason Kafka reaches high throughput."
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
         "value": "Remember: Kafka appends, never edits in place."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-brokers-and-kraft",
   "num": null,
   "title": "Brokers and KRaft",
   "stars": 1,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A broker is a Kafka server that hosts partitions; a cluster is many brokers sharing the load."
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
           "value": "Older Kafka used ZooKeeper for cluster metadata; modern Kafka uses KRaft (Kafka Raft metadata mode) built into Kafka itself."
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
           "value": "The controller manages cluster-level coordination such as leader election."
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
         "value": "Remember: \"Modern Kafka uses KRaft instead of ZooKeeper for metadata management.\""
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-topic-vs-partition",
   "num": null,
   "title": "Topic vs Partition",
   "stars": 1,
   "chapter": "topics-and-partitions",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A topic is a logical stream (orders, payments). A partition is a physical ordered log inside that topic."
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
           "value": "One topic can have many partitions (P0, P1, P2...)."
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
           "value": "Multiple producers can write to a topic; multiple consumers can read it."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "orders topic → P0, P1, P2",
     "lang": "text"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Topic = logical stream; partition = the physical ordered log inside it."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-ordering-is-per-partition",
   "num": null,
   "title": "Ordering Is Per Partition",
   "stars": 3,
   "chapter": "topics-and-partitions",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Kafka guarantees order only within a single partition, never across the whole topic."
      }
     ]
    },
    {
     "type": "code",
     "value": "P0: A → B → C\nP1: X → Y → Z     (no order guaranteed between P0 and P1)",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "To keep related events ordered, send them to the same partition."
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
         "value": "Remember: Ordering is a per-partition guarantee, not a per-topic one."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-keys-decide-the-partition",
   "num": null,
   "title": "Keys Decide the Partition",
   "stars": 0,
   "chapter": "topics-and-partitions",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A producer can attach a key; Kafka maps the key to a partition."
      }
     ]
    },
    {
     "type": "code",
     "value": "hash(key) → partition\nuserId 101 → P2   (always, under stable partitioning)",
     "lang": "text"
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
           "value": "Same key → same partition → events for that entity stay ordered."
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
           "value": "Holds as long as partition count / mapping stays compatible."
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
         "value": "Remember: Key → partition → per-entity ordering."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-partitions-give-parallelism",
   "num": null,
   "title": "Partitions Give Parallelism",
   "stars": 3,
   "chapter": "topics-and-partitions",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Partitions are the unit of parallel consumption: more partitions allow more consumers to work at once."
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
           "value": "You can increase partitions, but reducing them is not a normal in-place operation."
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
           "value": "Adding partitions can change key-to-partition mapping, so plan the count ahead."
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
         "value": "Remember: Partitions set the ceiling on consumer-side parallelism."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-ordering-vs-scaling-trade-off",
   "num": null,
   "title": "Ordering vs Scaling Trade-off",
   "stars": 3,
   "chapter": "topics-and-partitions",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Global ordering and massive parallelism conflict: more partitions give parallelism but order holds only inside each partition."
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
         "value": "Remember: If order matters for an entity, partition by that entity's key rather than forcing global topic ordering."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-hot-partitions",
   "num": null,
   "title": "Hot Partitions",
   "stars": 1,
   "chapter": "topics-and-partitions",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "If one key (e.g. a celebrity user) gets huge traffic, its single partition is overloaded while others sit idle."
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
           "value": "Fixes: better key distribution, composite/sharded keys, more partitions, isolating the heavy workload."
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
           "value": "Sharding a key can break strict per-key ordering unless you add ordering logic."
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
         "value": "Remember: One dominant key makes one partition a bottleneck."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-how-a-producer-works",
   "num": null,
   "title": "How a Producer Works",
   "stars": 0,
   "chapter": "producers",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A producer serialises records and sends them to a topic, participating in choosing the partition."
      }
     ]
    },
    {
     "type": "code",
     "value": "Java object → serializer → bytes → topic/partition",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common configs: "
      },
      {
       "type": "inlineCode",
       "value": "acks"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "retries"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "batch.size"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "linger.ms"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "compression.type"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "enable.idempotence"
      },
      {
       "type": "text",
       "value": ", key/value serializers."
      }
     ]
    }
   ]
  },
  {
   "id": "s-acknowledgements-acks",
   "num": null,
   "title": "Acknowledgements (acks)",
   "stars": 3,
   "chapter": "producers",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "acks"
      },
      {
       "type": "text",
       "value": " controls how much confirmation the producer waits for."
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
           "value": "acks"
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
           "value": "0"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "No ack"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Lowest latency, highest risk of loss"
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
           "value": "1"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Leader wrote locally"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Better, but loss possible if leader fails before replication"
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
           "value": "all / -1"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Required in-sync replicas confirmed"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Highest durability, higher latency"
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
         "value": "Remember: For strong durability use "
        },
        {
         "type": "inlineCode",
         "value": "acks=all"
        },
        {
         "type": "text",
         "value": " with a suitable replication factor and "
        },
        {
         "type": "inlineCode",
         "value": "min.insync.replicas"
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
   "id": "s-idempotent-producer",
   "num": null,
   "title": "Idempotent Producer",
   "stars": 1,
   "chapter": "producers",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "enable.idempotence=true"
      },
      {
       "type": "text",
       "value": " stops producer retries from writing the same record twice, within Kafka's idempotent-producer semantics."
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
         "value": "Remember: Idempotent producer removes retry-caused duplicate writes."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-batching-and-compression",
   "num": null,
   "title": "Batching and Compression",
   "stars": 1,
   "chapter": "producers",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Producers group records into batches before sending to cut network round trips."
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
           "value": "batch.size"
          },
          {
           "type": "text",
           "value": " and "
          },
          {
           "type": "inlineCode",
           "value": "linger.ms"
          },
          {
           "type": "text",
           "value": " tune how much to batch and how long to wait."
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
           "value": "Compression ("
          },
          {
           "type": "inlineCode",
           "value": "gzip"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "snappy"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "lz4"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "zstd"
          },
          {
           "type": "text",
           "value": ") trades CPU for less network and storage."
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
         "value": "Remember: Batch + compress for throughput; it costs a little latency and CPU."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-consumer-and-pull-model",
   "num": null,
   "title": "Consumer and Pull Model",
   "stars": 0,
   "chapter": "consumers-and-groups",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A consumer reads records and tracks its progress with offsets. Kafka is pull-based: consumers fetch at their own pace."
      }
     ]
    },
    {
     "type": "code",
     "value": "Kafka → Consumer → Database",
     "lang": "text"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Consumers pull, so they control their own consumption rate."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-consumer-groups",
   "num": null,
   "title": "Consumer Groups",
   "stars": 3,
   "chapter": "consumers-and-groups",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A consumer group is a set of consumers sharing a topic's partitions."
      }
     ]
    },
    {
     "type": "code",
     "value": "orders (4 partitions), Group A: C1→P0, C2→P1, C3→P2, C4→P3",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Core rule: within a group, each partition is assigned to at most one consumer at a time."
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
         "value": "Remember: One partition → at most one consumer per group at a time."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-consumers-vs-partitions",
   "num": null,
   "title": "Consumers vs Partitions",
   "stars": 0,
   "chapter": "consumers-and-groups",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Partitions cap the number of actively consuming members in a group."
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
           "value": "4 partitions, 2 consumers → each handles 2 partitions."
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
           "value": "4 partitions, 6 consumers → 2 consumers sit idle."
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
         "value": "Remember: Max active consumers in a group ≈ number of partitions."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-multiple-groups-and-fan-out",
   "num": null,
   "title": "Multiple Groups and Fan-out",
   "stars": 3,
   "chapter": "consumers-and-groups",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Different consumer groups read the same topic independently, each with its own offsets."
      }
     ]
    },
    {
     "type": "code",
     "value": "orders → Payment Group  (own offsets)\n       → Analytics Group (own offsets)",
     "lang": "text"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Separate groups = natural fan-out; one event, many independent readers."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-offsets-and-commit",
   "num": null,
   "title": "Offsets and Commit",
   "stars": 3,
   "chapter": "consumers-and-groups",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "An offset is a message's position inside a partition (not unique across the topic). Committing an offset records how far a consumer has processed."
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
           "value": "Auto commit: the client commits periodically ("
          },
          {
           "type": "inlineCode",
           "value": "enable.auto.commit"
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
           "type": "text",
           "value": "Manual commit: the app decides exactly when to commit."
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
         "value": "Remember: Offset = position in a partition; commit = saved progress."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-consumer-lag",
   "num": null,
   "title": "Consumer Lag",
   "stars": 3,
   "chapter": "consumers-and-groups",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Lag is how far a consumer is behind the latest offset."
      }
     ]
    },
    {
     "type": "code",
     "value": "latest = 1000, consumer = 900 → lag ≈ 100",
     "lang": "text"
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
           "value": "Causes: slow processing, too few consumers/partitions, slow downstream, frequent rebalances."
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
           "value": "Fixes: add partitions/consumers, optimise processing, improve downstream, scale infra."
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
         "value": "Remember: Rising lag means consumers are not keeping up; it is the main health signal."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-rebalancing",
   "num": null,
   "title": "Rebalancing",
   "stars": 3,
   "chapter": "consumers-and-groups",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "When consumers join or leave a group, Kafka redistributes partitions among them."
      }
     ]
    },
    {
     "type": "code",
     "value": "C1→P0 P1, C2→P2 P3   + C3 joins →   C1→P0, C2→P1 P2, C3→P3",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Frequent rebalances cause processing pauses, latency, and possible duplicate processing."
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
         "value": "Remember: Rebalance = partition reassignment on membership change; too many hurts throughput."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-key-consumer-configs",
   "num": null,
   "title": "Key Consumer Configs",
   "stars": 0,
   "chapter": "consumers-and-groups",
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
           "value": "group.id"
          },
          {
           "type": "text",
           "value": " — consumers with the same id form one group; different ids consume independently."
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
           "value": "auto.offset.reset"
          },
          {
           "type": "text",
           "value": " — with no committed offset: "
          },
          {
           "type": "inlineCode",
           "value": "earliest"
          },
          {
           "type": "text",
           "value": " (from start), "
          },
          {
           "type": "inlineCode",
           "value": "latest"
          },
          {
           "type": "text",
           "value": " (new only), "
          },
          {
           "type": "inlineCode",
           "value": "none"
          },
          {
           "type": "text",
           "value": " (error)."
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
           "value": "max.poll.records"
          },
          {
           "type": "text",
           "value": ", key/value deserializers."
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
   "id": "s-retention",
   "num": null,
   "title": "Retention",
   "stars": 3,
   "chapter": "storage-and-retention",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Kafka keeps messages for a configured time or size, not until they are consumed."
      }
     ]
    },
    {
     "type": "code",
     "value": "consumer reads → message still exists → retention reached → old segment deleted",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Controls: "
      },
      {
       "type": "inlineCode",
       "value": "retention.ms"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "retention.bytes"
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
         "value": "Remember: Reading does not delete a message — this is the core difference from a traditional queue."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-log-segments",
   "num": null,
   "title": "Log Segments",
   "stars": 1,
   "chapter": "storage-and-retention",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A partition is split into log segments, not one giant file; retention and deletion happen at segment granularity."
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
         "value": "Remember: Kafka deletes whole old segments, not individual consumed messages."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-replay",
   "num": null,
   "title": "Replay",
   "stars": 3,
   "chapter": "storage-and-retention",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because messages are retained, a consumer can move its offset backward and reprocess old events."
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
           "value": "Useful for reprocessing, bug recovery, bootstrapping new consumers, and rebuilding data."
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
         "value": "Remember: Retention enables replay — rewind the offset to read history again."
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
   "stars": 3,
   "chapter": "replication-and-guarantees",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Each partition can have replicas on different brokers for fault tolerance."
      }
     ]
    },
    {
     "type": "code",
     "value": "RF=3, P0: Leader=B1, Followers=B2,B3",
     "lang": "text"
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
           "value": "Producers and consumers normally talk to the leader; followers copy the leader's data."
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
           "value": "If the leader broker fails, an eligible replica becomes the new leader."
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
         "value": "Remember: Replication = copies on other brokers → availability and durability."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-isr-and-min-insync-replicas",
   "num": null,
   "title": "ISR and min.insync.replicas",
   "stars": 3,
   "chapter": "replication-and-guarantees",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "ISR (In-Sync Replicas) are the replicas sufficiently caught up with the leader; only an ISR replica can become the new leader."
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
           "value": "min.insync.replicas"
          },
          {
           "type": "text",
           "value": " sets how many replicas must be in sync for an "
          },
          {
           "type": "inlineCode",
           "value": "acks=all"
          },
          {
           "type": "text",
           "value": " write to succeed."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "RF=3, min.insync.replicas=2, acks=all → at least 2 in-sync copies required per write",
     "lang": "text"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Durable write config = "
        },
        {
         "type": "inlineCode",
         "value": "replication.factor=3"
        },
        {
         "type": "text",
         "value": ", "
        },
        {
         "type": "inlineCode",
         "value": "acks=all"
        },
        {
         "type": "text",
         "value": ", "
        },
        {
         "type": "inlineCode",
         "value": "min.insync.replicas=2"
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
   "id": "s-delivery-semantics",
   "num": null,
   "title": "Delivery Semantics",
   "stars": 3,
   "chapter": "replication-and-guarantees",
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
           "value": "Semantic"
          }
         ]
        },
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
           "value": "Result"
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
           "value": "At-most-once"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Commit, then process"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "May lose a message; no duplicates"
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
           "value": "At-least-once"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Process, then commit"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "No loss; duplicates possible (most common)"
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
           "value": "Exactly-once"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Transactional boundary"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Each effect once, within supported Kafka transactions"
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
         "value": "Remember: At-least-once + idempotent processing = practical duplicate-safe design."
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
   "stars": 3,
   "chapter": "replication-and-guarantees",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "If a message is processed twice, the effect must not double (a $100 payment must not deduct $200)."
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
           "value": "Use an idempotency key ("
          },
          {
           "type": "inlineCode",
           "value": "transactionId"
          },
          {
           "type": "text",
           "value": "); check if it was already processed before acting."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "TX123 seen before? YES → ignore;  NO → process and record",
     "lang": "text"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Idempotent consumers make at-least-once safe."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-kafka-transactions",
   "num": null,
   "title": "Kafka Transactions",
   "stars": 2,
   "chapter": "replication-and-guarantees",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Kafka supports transactions so a read-process-write cycle commits atomically to Kafka, or aborts on failure."
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
         "value": "Remember: Transactions give exactly-once for Kafka-to-Kafka processing, not for arbitrary external systems."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-failure-handling-retry-dlt-poison-messages",
   "num": null,
   "title": "Failure Handling: Retry, DLT, Poison Messages",
   "stars": 0,
   "chapter": "replication-and-guarantees",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A poison message (malformed data, bad schema) keeps failing. Handle with bounded retries, then route it aside."
      }
     ]
    },
    {
     "type": "code",
     "value": "fail → retry with backoff → still failing → Dead Letter Topic (DLT)",
     "lang": "text"
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
           "value": "Avoid infinite immediate retries; use retry topics / delayed retry / backoff."
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
           "value": "A DLT stops one bad message from blocking the whole partition."
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
         "value": "Remember: Retry → backoff → DLT keeps a poison message from blocking processing."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-fault-tolerance-and-backpressure",
   "num": null,
   "title": "Fault Tolerance and Backpressure",
   "stars": 0,
   "chapter": "replication-and-guarantees",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Fault tolerance comes from multiple brokers + replication + ISR + leader election; if a leader dies, an eligible replica takes over."
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
           "value": "Backpressure: Kafka's retained log buffers a burst, so a slow consumer just builds lag instead of forcing producer and consumer to the same speed."
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
         "value": "Remember: The log absorbs bursts; lag grows instead of back-pressuring the producer."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-kafka-connect",
   "num": null,
   "title": "Kafka Connect",
   "stars": 0,
   "chapter": "platform",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Kafka Connect moves data between Kafka and external systems without custom code."
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
           "value": "Source connector: external system → Kafka."
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
           "value": "Sink connector: Kafka → external system (DB, Elasticsearch, storage)."
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
         "value": "Remember: Source into Kafka, sink out of Kafka."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-kafka-streams",
   "num": null,
   "title": "Kafka Streams",
   "stars": 0,
   "chapter": "platform",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Kafka Streams is a Java library for processing Kafka data: filter, map, aggregate, join, and window."
      }
     ]
    },
    {
     "type": "code",
     "value": "orders → Streams (filter/map/aggregate) → processed-orders",
     "lang": "text"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Streams is in-app stream processing, including stateful operations."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-schema-registry-and-serialization",
   "num": null,
   "title": "Schema Registry and Serialization",
   "stars": 0,
   "chapter": "platform",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Producers serialise objects to bytes; consumers deserialise them back. Common formats: JSON, Avro, Protobuf."
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
           "value": "Schema Registry (optional, separate from Kafka) manages event schemas with versioning and compatibility checks."
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
         "value": "Remember: Schema Registry is the contract manager for event formats; Kafka itself does not require it."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-producer-and-consumer",
   "num": null,
   "title": "Producer and Consumer",
   "stars": 0,
   "chapter": "spring-boot-integration",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Use "
      },
      {
       "type": "inlineCode",
       "value": "KafkaTemplate"
      },
      {
       "type": "text",
       "value": " to publish and "
      },
      {
       "type": "inlineCode",
       "value": "@KafkaListener"
      },
      {
       "type": "text",
       "value": " to consume."
      }
     ]
    },
    {
     "type": "code",
     "value": "@Service\nclass OrderProducer {\n    private final KafkaTemplate<String, String> kafka;\n    OrderProducer(KafkaTemplate<String, String> kafka) { this.kafka = kafka; }\n    void sendOrder(String order) { kafka.send(\"orders\", order); }\n}",
     "lang": "java"
    },
    {
     "type": "code",
     "value": "@Service\nclass OrderConsumer {\n    @KafkaListener(topics = \"orders\")\n    public void consume(String order) { System.out.println(order); }\n}",
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
         "value": "Remember: \"The producer publishes to a topic with KafkaTemplate; consumers listen with @KafkaListener.\""
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-kafka-vs-traditional-message-queue",
   "num": null,
   "title": "Kafka vs Traditional Message Queue",
   "stars": 1,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Why use Kafka when a queue already delivers messages? A queue removes a message once a consumer processes it; Kafka retains it."
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
           "value": "Aspect"
          }
         ]
        },
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
           "value": "Traditional queue"
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
           "value": "After consumption"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Message retained"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Message removed"
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
           "value": "Readers"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Many independent groups"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Usually one logical consumer of the work"
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
           "value": "Replay"
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
           "value": "Best for"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "High-throughput streaming, event log"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Simple task distribution"
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
         "value": "Remember: Kafka = retained event log with replay and fan-out; queue = remove-on-process task distribution."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-kafka-vs-rest",
   "num": null,
   "title": "Kafka vs REST",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Why use Kafka when services can call each other over REST? REST is synchronous request/response and tightly coupled."
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
           "value": "Kafka is asynchronous and event-driven, adding decoupling, buffering, replay, and multiple consumers."
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
         "value": "Remember: REST = direct synchronous call; Kafka = async events with decoupling and buffering."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-kafka-vs-database",
   "num": null,
   "title": "Kafka vs Database",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Kafka is not a replacement for a transactional database."
      }
     ]
    },
    {
     "type": "code",
     "value": "PostgreSQL → source of transactional state\nKafka      → event streaming and distribution",
     "lang": "text"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: DB holds the current state; Kafka distributes the events about it."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-kafka-vs-redis",
   "num": null,
   "title": "Kafka vs Redis",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Both move/store data, but for different jobs."
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
           "value": "Redis: cache, fast key-value, counters, sessions, short-lived state."
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
           "value": "Kafka: durable event streams, high-throughput pipelines, replay."
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
         "value": "Remember: Redis = fast short-lived state; Kafka = durable streaming history."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-partitions-vs-consumers",
   "num": null,
   "title": "Partitions vs Consumers",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "They are different axes of scale that must be balanced."
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
           "value": "Partitions = how the data/work is split and the parallelism ceiling."
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
           "value": "Consumers = the processes that do the work, capped by partition count per group."
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
         "value": "Remember: Partitions distribute the work; consumers (up to the partition count) process it in parallel."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-designing-with-kafka",
   "num": null,
   "title": "Designing with Kafka",
   "stars": 3,
   "chapter": "interview-design-checklist",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "When asked \"how would you use Kafka?\", walk through: the events, topics, partition count, partition key, ordering need, consumer groups, replication factor, acks/durability, retention, retry + DLT, idempotency, lag monitoring, scaling, schema/versioning, and failure recovery."
      }
     ]
    }
   ]
  },
  {
   "id": "s-reliable-event-driven-design",
   "num": null,
   "title": "Reliable Event-Driven Design",
   "stars": 3,
   "chapter": "interview-design-checklist",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A strong \"design a reliable pipeline\" answer combines:"
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
           "value": "replication.factor=3"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "acks=all"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "min.insync.replicas=2"
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
           "value": "Idempotent producer"
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
           "value": "At-least-once processing with idempotent consumers"
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
           "value": "Retry + DLT for failures"
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
           "value": "Consumer lag monitoring"
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
         "value": "Remember: Durability (replication + acks + ISR) plus idempotent at-least-once consumers is the standard reliable design."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-scaling-for-high-throughput",
   "num": null,
   "title": "Scaling for High Throughput",
   "stars": 3,
   "chapter": "interview-design-checklist",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For \"scale to 100K+ events/sec\": multiple producers → enough partitions → spread across brokers → RF 3 → multiple consumers in groups, then watch partition throughput, broker capacity, consumer processing, batching/compression, and lag."
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
         "value": "Remember: Partitions provide parallelism; brokers provide distributed capacity; consumer instances process partitions in parallel."
        }
       ]
      }
     ]
    }
   ]
  }
 ]
};
