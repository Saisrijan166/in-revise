# Kafka Cheat Sheet

> Mental model: Producer → Topic → Partition → Broker → Consumer Group → Consumer.
> Kafka is a distributed event streaming platform that moves and stores large volumes of events reliably and with high throughput.

# Fundamentals

## What Kafka Is ⭐

Kafka is a distributed, append-only log that services use to publish and consume events instead of calling each other directly.

- Producer publishes events; consumer reads them; Kafka stores them in between.
- It is chosen for high throughput, durability, horizontal scaling, replay, and decoupling services.

```text
Order Service → Kafka → Payment / Inventory / Notification / Analytics
```

One producer writes once; many services consume independently, so the producer does not call each service.

> Remember: Kafka is a durable event log, not a point-to-point RPC call.

## Core Vocabulary

| Term | Meaning |
|---|---|
| Event / record | A single message of data |
| Topic | A named, logical stream of events |
| Partition | A topic's ordered, append-only log; the unit of storage and parallelism |
| Broker | A Kafka server that stores partitions |
| Cluster | A group of brokers |
| Offset | A message's position within a partition |
| Consumer group | Consumers sharing the work of a topic |
| Leader / follower | The broker serving a partition / brokers replicating it |
| Replication factor | Number of copies of each partition |
| ISR | In-Sync Replicas: replicas caught up with the leader |

## The Append-Only Log

Kafka stores each partition as an append-only log: writes only ever go to the end.

```text
offset:  0  1  2  3
value:   A  B  C  D
```

Sequential append (no random writes) is a key reason Kafka reaches high throughput.

> Remember: Kafka appends, never edits in place.

## Brokers and KRaft ⭐

A broker is a Kafka server that hosts partitions; a cluster is many brokers sharing the load.

- Older Kafka used ZooKeeper for cluster metadata; modern Kafka uses KRaft (Kafka Raft metadata mode) built into Kafka itself.
- The controller manages cluster-level coordination such as leader election.

> Remember: "Modern Kafka uses KRaft instead of ZooKeeper for metadata management."

# Topics and Partitions

## Topic vs Partition ⭐

A topic is a logical stream (orders, payments). A partition is a physical ordered log inside that topic.

- One topic can have many partitions (P0, P1, P2...).
- Multiple producers can write to a topic; multiple consumers can read it.

```text
orders topic → P0, P1, P2
```

> Remember: Topic = logical stream; partition = the physical ordered log inside it.

## Ordering Is Per Partition ⭐⭐⭐

Kafka guarantees order only within a single partition, never across the whole topic.

```text
P0: A → B → C
P1: X → Y → Z     (no order guaranteed between P0 and P1)
```

To keep related events ordered, send them to the same partition.

> Remember: Ordering is a per-partition guarantee, not a per-topic one.

## Keys Decide the Partition

A producer can attach a key; Kafka maps the key to a partition.

```text
hash(key) → partition
userId 101 → P2   (always, under stable partitioning)
```

- Same key → same partition → events for that entity stay ordered.
- Holds as long as partition count / mapping stays compatible.

> Remember: Key → partition → per-entity ordering.

## Partitions Give Parallelism ⭐⭐⭐

Partitions are the unit of parallel consumption: more partitions allow more consumers to work at once.

- You can increase partitions, but reducing them is not a normal in-place operation.
- Adding partitions can change key-to-partition mapping, so plan the count ahead.

> Remember: Partitions set the ceiling on consumer-side parallelism.

## Ordering vs Scaling Trade-off ⭐⭐⭐

Global ordering and massive parallelism conflict: more partitions give parallelism but order holds only inside each partition.

> Remember: If order matters for an entity, partition by that entity's key rather than forcing global topic ordering.

## Hot Partitions ⭐

If one key (e.g. a celebrity user) gets huge traffic, its single partition is overloaded while others sit idle.

- Fixes: better key distribution, composite/sharded keys, more partitions, isolating the heavy workload.
- Sharding a key can break strict per-key ordering unless you add ordering logic.

> Remember: One dominant key makes one partition a bottleneck.

# Producers

## How a Producer Works

A producer serialises records and sends them to a topic, participating in choosing the partition.

```text
Java object → serializer → bytes → topic/partition
```

Common configs: `acks`, `retries`, `batch.size`, `linger.ms`, `compression.type`, `enable.idempotence`, key/value serializers.

## Acknowledgements (acks) ⭐⭐⭐

`acks` controls how much confirmation the producer waits for.

| acks | Behaviour | Trade-off |
|---|---|---|
| 0 | No ack | Lowest latency, highest risk of loss |
| 1 | Leader wrote locally | Better, but loss possible if leader fails before replication |
| all / -1 | Required in-sync replicas confirmed | Highest durability, higher latency |

> Remember: For strong durability use `acks=all` with a suitable replication factor and `min.insync.replicas`.

## Idempotent Producer ⭐

`enable.idempotence=true` stops producer retries from writing the same record twice, within Kafka's idempotent-producer semantics.

> Remember: Idempotent producer removes retry-caused duplicate writes.

## Batching and Compression ⭐

Producers group records into batches before sending to cut network round trips.

- `batch.size` and `linger.ms` tune how much to batch and how long to wait.
- Compression (`gzip`, `snappy`, `lz4`, `zstd`) trades CPU for less network and storage.

> Remember: Batch + compress for throughput; it costs a little latency and CPU.

# Consumers and Groups

## Consumer and Pull Model

A consumer reads records and tracks its progress with offsets. Kafka is pull-based: consumers fetch at their own pace.

```text
Kafka → Consumer → Database
```

> Remember: Consumers pull, so they control their own consumption rate.

## Consumer Groups ⭐⭐⭐

A consumer group is a set of consumers sharing a topic's partitions.

```text
orders (4 partitions), Group A: C1→P0, C2→P1, C3→P2, C4→P3
```

Core rule: within a group, each partition is assigned to at most one consumer at a time.

> Remember: One partition → at most one consumer per group at a time.

## Consumers vs Partitions

Partitions cap the number of actively consuming members in a group.

- 4 partitions, 2 consumers → each handles 2 partitions.
- 4 partitions, 6 consumers → 2 consumers sit idle.

> Remember: Max active consumers in a group ≈ number of partitions.

## Multiple Groups and Fan-out ⭐⭐⭐

Different consumer groups read the same topic independently, each with its own offsets.

```text
orders → Payment Group  (own offsets)
       → Analytics Group (own offsets)
```

> Remember: Separate groups = natural fan-out; one event, many independent readers.

## Offsets and Commit ⭐⭐⭐

An offset is a message's position inside a partition (not unique across the topic). Committing an offset records how far a consumer has processed.

- Auto commit: the client commits periodically (`enable.auto.commit`).
- Manual commit: the app decides exactly when to commit.

> Remember: Offset = position in a partition; commit = saved progress.

## Consumer Lag ⭐⭐⭐

Lag is how far a consumer is behind the latest offset.

```text
latest = 1000, consumer = 900 → lag ≈ 100
```

- Causes: slow processing, too few consumers/partitions, slow downstream, frequent rebalances.
- Fixes: add partitions/consumers, optimise processing, improve downstream, scale infra.

> Remember: Rising lag means consumers are not keeping up; it is the main health signal.

## Rebalancing ⭐⭐⭐

When consumers join or leave a group, Kafka redistributes partitions among them.

```text
C1→P0 P1, C2→P2 P3   + C3 joins →   C1→P0, C2→P1 P2, C3→P3
```

Frequent rebalances cause processing pauses, latency, and possible duplicate processing.

> Remember: Rebalance = partition reassignment on membership change; too many hurts throughput.

## Key Consumer Configs

- `group.id` — consumers with the same id form one group; different ids consume independently.
- `auto.offset.reset` — with no committed offset: `earliest` (from start), `latest` (new only), `none` (error).
- `max.poll.records`, key/value deserializers.

# Storage and Retention

## Retention ⭐⭐⭐

Kafka keeps messages for a configured time or size, not until they are consumed.

```text
consumer reads → message still exists → retention reached → old segment deleted
```

Controls: `retention.ms`, `retention.bytes`.

> Remember: Reading does not delete a message — this is the core difference from a traditional queue.

## Log Segments ⭐

A partition is split into log segments, not one giant file; retention and deletion happen at segment granularity.

> Remember: Kafka deletes whole old segments, not individual consumed messages.

## Replay ⭐⭐⭐

Because messages are retained, a consumer can move its offset backward and reprocess old events.

- Useful for reprocessing, bug recovery, bootstrapping new consumers, and rebuilding data.

> Remember: Retention enables replay — rewind the offset to read history again.

# Replication and Guarantees

## Replication ⭐⭐⭐

Each partition can have replicas on different brokers for fault tolerance.

```text
RF=3, P0: Leader=B1, Followers=B2,B3
```

- Producers and consumers normally talk to the leader; followers copy the leader's data.
- If the leader broker fails, an eligible replica becomes the new leader.

> Remember: Replication = copies on other brokers → availability and durability.

## ISR and min.insync.replicas ⭐⭐⭐

ISR (In-Sync Replicas) are the replicas sufficiently caught up with the leader; only an ISR replica can become the new leader.

- `min.insync.replicas` sets how many replicas must be in sync for an `acks=all` write to succeed.

```text
RF=3, min.insync.replicas=2, acks=all → at least 2 in-sync copies required per write
```

> Remember: Durable write config = `replication.factor=3`, `acks=all`, `min.insync.replicas=2`.

## Delivery Semantics ⭐⭐⭐

| Semantic | Order | Result |
|---|---|---|
| At-most-once | Commit, then process | May lose a message; no duplicates |
| At-least-once | Process, then commit | No loss; duplicates possible (most common) |
| Exactly-once | Transactional boundary | Each effect once, within supported Kafka transactions |

> Remember: At-least-once + idempotent processing = practical duplicate-safe design.

## Idempotency ⭐⭐⭐

If a message is processed twice, the effect must not double (a $100 payment must not deduct $200).

- Use an idempotency key (`transactionId`); check if it was already processed before acting.

```text
TX123 seen before? YES → ignore;  NO → process and record
```

> Remember: Idempotent consumers make at-least-once safe.

## Kafka Transactions ⭐⭐

Kafka supports transactions so a read-process-write cycle commits atomically to Kafka, or aborts on failure.

> Remember: Transactions give exactly-once for Kafka-to-Kafka processing, not for arbitrary external systems.

## Failure Handling: Retry, DLT, Poison Messages

A poison message (malformed data, bad schema) keeps failing. Handle with bounded retries, then route it aside.

```text
fail → retry with backoff → still failing → Dead Letter Topic (DLT)
```

- Avoid infinite immediate retries; use retry topics / delayed retry / backoff.
- A DLT stops one bad message from blocking the whole partition.

> Remember: Retry → backoff → DLT keeps a poison message from blocking processing.

## Fault Tolerance and Backpressure

Fault tolerance comes from multiple brokers + replication + ISR + leader election; if a leader dies, an eligible replica takes over.

- Backpressure: Kafka's retained log buffers a burst, so a slow consumer just builds lag instead of forcing producer and consumer to the same speed.

> Remember: The log absorbs bursts; lag grows instead of back-pressuring the producer.

# Platform

## Kafka Connect

Kafka Connect moves data between Kafka and external systems without custom code.

- Source connector: external system → Kafka.
- Sink connector: Kafka → external system (DB, Elasticsearch, storage).

> Remember: Source into Kafka, sink out of Kafka.

## Kafka Streams

Kafka Streams is a Java library for processing Kafka data: filter, map, aggregate, join, and window.

```text
orders → Streams (filter/map/aggregate) → processed-orders
```

> Remember: Streams is in-app stream processing, including stateful operations.

## Schema Registry and Serialization

Producers serialise objects to bytes; consumers deserialise them back. Common formats: JSON, Avro, Protobuf.

- Schema Registry (optional, separate from Kafka) manages event schemas with versioning and compatibility checks.

> Remember: Schema Registry is the contract manager for event formats; Kafka itself does not require it.

# Spring Boot Integration

## Producer and Consumer

Use `KafkaTemplate` to publish and `@KafkaListener` to consume.

```java
@Service
class OrderProducer {
    private final KafkaTemplate<String, String> kafka;
    OrderProducer(KafkaTemplate<String, String> kafka) { this.kafka = kafka; }
    void sendOrder(String order) { kafka.send("orders", order); }
}
```

```java
@Service
class OrderConsumer {
    @KafkaListener(topics = "orders")
    public void consume(String order) { System.out.println(order); }
}
```

> Remember: "The producer publishes to a topic with KafkaTemplate; consumers listen with @KafkaListener."

# Common "Why X vs Y?" Comparisons

## Kafka vs Traditional Message Queue ⭐

Why use Kafka when a queue already delivers messages? A queue removes a message once a consumer processes it; Kafka retains it.

| Aspect | Kafka | Traditional queue |
|---|---|---|
| After consumption | Message retained | Message removed |
| Readers | Many independent groups | Usually one logical consumer of the work |
| Replay | Yes | No |
| Best for | High-throughput streaming, event log | Simple task distribution |

> Remember: Kafka = retained event log with replay and fan-out; queue = remove-on-process task distribution.

## Kafka vs REST

Why use Kafka when services can call each other over REST? REST is synchronous request/response and tightly coupled.

- Kafka is asynchronous and event-driven, adding decoupling, buffering, replay, and multiple consumers.

> Remember: REST = direct synchronous call; Kafka = async events with decoupling and buffering.

## Kafka vs Database

Kafka is not a replacement for a transactional database.

```text
PostgreSQL → source of transactional state
Kafka      → event streaming and distribution
```

> Remember: DB holds the current state; Kafka distributes the events about it.

## Kafka vs Redis

Both move/store data, but for different jobs.

- Redis: cache, fast key-value, counters, sessions, short-lived state.
- Kafka: durable event streams, high-throughput pipelines, replay.

> Remember: Redis = fast short-lived state; Kafka = durable streaming history.

## Partitions vs Consumers

They are different axes of scale that must be balanced.

- Partitions = how the data/work is split and the parallelism ceiling.
- Consumers = the processes that do the work, capped by partition count per group.

> Remember: Partitions distribute the work; consumers (up to the partition count) process it in parallel.

# Interview Design Checklist

## Designing with Kafka ⭐⭐⭐

When asked "how would you use Kafka?", walk through: the events, topics, partition count, partition key, ordering need, consumer groups, replication factor, acks/durability, retention, retry + DLT, idempotency, lag monitoring, scaling, schema/versioning, and failure recovery.

## Reliable Event-Driven Design ⭐⭐⭐

A strong "design a reliable pipeline" answer combines:

- `replication.factor=3`, `acks=all`, `min.insync.replicas=2`
- Idempotent producer
- At-least-once processing with idempotent consumers
- Retry + DLT for failures
- Consumer lag monitoring

> Remember: Durability (replication + acks + ISR) plus idempotent at-least-once consumers is the standard reliable design.

## Scaling for High Throughput ⭐⭐⭐

For "scale to 100K+ events/sec": multiple producers → enough partitions → spread across brokers → RF 3 → multiple consumers in groups, then watch partition throughput, broker capacity, consumer processing, batching/compression, and lag.

> Remember: Partitions provide parallelism; brokers provide distributed capacity; consumer instances process partitions in parallel.
