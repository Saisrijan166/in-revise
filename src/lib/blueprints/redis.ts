import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const redis: Blueprint = {
  tagline:
    "How Redis serves commands from memory — its data types, persistence, patterns and scaling.",
  legend: legendOf(["Client & server", "Data types", "Persistence", "Patterns", "Scaling & HA"]),
  alt:
    "A system map of Redis. Client and server: a client speaks the RESP protocol to a single-threaded event " +
    "loop that reads and writes an in-memory store and replies. Data types: String, Hash, List, Set, Sorted " +
    "Set and Stream. Persistence: periodic RDB snapshots and an append-only AOF log rebuild memory on " +
    "restart. Patterns: caching with TTL and LRU/LFU eviction, pub/sub, queues built on lists or streams, " +
    "distributed locks and rate limiting. Scaling and high availability: replicas copy the primary, Sentinel " +
    "handles failover, and Cluster shards keys across hash slots.",
  baseline: "Redis 8",
  chart: `flowchart TD
  subgraph CORE["1 . Client and server"]
    direction TB
    cli(["Client"]):::f
    cli -->|RESP protocol| loop["Single-threaded event loop"]:::f
    loop --> mem[("In-memory store")]:::f
    mem --> rep(["Reply"]):::f
  end

  subgraph TYPES["2 . Data types"]
    direction LR
    strv["String"]:::c
    hashv["Hash"]:::c
    listv["List"]:::c
    setv["Set"]:::c
    zsetv["Sorted Set"]:::c
    strmv["Stream"]:::c
  end
  mem --> strv
  mem --> hashv
  mem --> listv
  mem --> setv
  mem --> zsetv
  mem --> strmv

  subgraph PERSIST["3 . Persistence"]
    direction LR
    rdb["RDB snapshot"]:::d
    aof["AOF log"]:::d
  end
  mem -.->|periodic| rdb
  mem -.->|each write| aof

  subgraph USE["4 . Patterns"]
    direction TB
    cache["Cache: TTL + eviction (LRU/LFU)"]:::x
    psb["Pub / Sub"]:::x
    queue["Queues: list / stream"]:::x
    lock["Distributed lock"]:::x
    rate["Rate limiting"]:::x
  end
  strv -->|expire| cache
  loop --> psb
  listv --> queue
  strv --> lock
  strv --> rate

  subgraph SCALE["5 . Scaling and HA"]
    direction LR
    repl["Replicas"]:::o
    sent["Sentinel: failover"]:::o
    clus["Cluster: hash slots"]:::o
  end
  mem --> repl
  repl --> sent
  mem --> clus
${CLASSDEFS}`,
};
