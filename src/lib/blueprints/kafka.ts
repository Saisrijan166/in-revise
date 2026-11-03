import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const kafka: Blueprint = {
  tagline: "How events flow from producers to consumers through partitioned, replicated logs.",
  legend: legendOf(["Produce", "Topic & partitions", "Storage & offsets", "Consume", "Platform"]),
  alt:
    "A system map of Kafka. Produce: a producer sends records to a broker, choosing a partition by key and " +
    "waiting for acks. Topic and partitions: a topic is split into partitions, each replicated with a leader " +
    "and followers kept in sync (ISR). Storage: each partition is an append-only log of segments on disk, " +
    "addressed by per-partition offsets, kept by a retention policy. Consume: a consumer group splits the " +
    "partitions across its consumers, pulls records, commits offsets to resume, and rebalances when members " +
    "change. Platform: Kafka Connect moves data in and out, Kafka Streams and ksqlDB process it, and " +
    "idempotent producers plus transactions give exactly-once processing.",
  baseline: "Apache Kafka 4",
  chart: `flowchart TD
  subgraph PROD["1 . Produce"]
    direction TB
    prod(["Producer"]):::f
    prod -->|key -> partition, acks| brk["Broker"]:::f
  end

  subgraph TOPIC["2 . Topic and partitions"]
    direction TB
    topic["Topic"]:::c
    topic --> p0["Partition 0"]:::c
    topic --> p1["Partition 1"]:::c
    p0 --> repl["Replicas: leader + followers (ISR)"]:::c
  end
  brk --> topic

  subgraph LOG["3 . Storage (append-only log)"]
    direction LR
    seg["Segments on disk"]:::d
    off["Offsets (per partition)"]:::d
    ret["Retention: time / size"]:::d
  end
  p0 -->|append| seg
  seg --> off
  seg --> ret

  subgraph CONS["4 . Consume"]
    direction TB
    cg["Consumer group"]:::x
    cg --> c1["Consumer 1"]:::x
    cg --> c2["Consumer 2"]:::x
    c1 -->|commit| off
    cg -.->|rebalance| p0
  end
  p0 -->|pull| cg
  off -.->|resume| cg

  subgraph OPS["5 . Platform"]
    direction LR
    conn["Kafka Connect"]:::o
    strm["Kafka Streams / ksqlDB"]:::o
    eos["Exactly-once: idempotent + tx"]:::o
  end
  brk --> conn
  topic --> strm
  prod -.-> eos
${CLASSDEFS}`,
};
