# Kafka — Interview Cheat Sheet

> **Mental model:**  
> **Producer → Topic → Partition → Broker → Consumer Group → Consumer**  
> Kafka is a **distributed event streaming platform** used to move/store large volumes of events reliably and with high throughput.

---

## 1. Kafka Core Terminology

| Term | Simple definition |
|---|---|
| **Event / Record / Message** | Data sent to Kafka |
| **Producer** | Publishes messages to Kafka |
| **Consumer** | Reads messages from Kafka |
| **Topic** | Logical category/feed of messages |
| **Partition** | Topic's ordered, distributed log |
| **Broker** | Kafka server that stores partitions |
| **Cluster** | Group of Kafka brokers |
| **Consumer Group** | Consumers working together to process a topic |
| **Offset** | Position of a message inside a partition |
| **Leader** | Broker currently responsible for a partition |
| **Follower** | Broker replicating a partition |
| **Replication Factor** | Number of copies of each partition |
| **ISR** | In-Sync Replicas; replicas caught up with leader |
| **Retention** | How long Kafka keeps messages |
| **Rebalance** | Redistribution of partitions among consumers |
| **Kafka Controller** | Manages cluster-level coordination |
| **Kafka Streams** | Library for processing Kafka data |
| **Schema Registry** | Stores/manages event schemas; separate from Kafka itself |

---

# 2. Basic Architecture

```text
                 Kafka Cluster
        ┌──────────────────────────┐
        │                          │
Producer ──→ Topic                 │
             │                     │
             ├── Partition 0 ── Broker 1
             ├── Partition 1 ── Broker 2
             └── Partition 2 ── Broker 3
                                      │
                         Consumer Group
                       ┌────┬────┬────┐
                       C1   C2   C3
```

### Important

**Topic ≠ Partition**

- Topic = logical stream
- Partition = physical ordered log inside topic

Example:

```text
orders topic
 ├── P0
 ├── P1
 └── P2
```

---

# 3. Why Kafka?

Kafka is mainly chosen for:

- High throughput
- Distributed processing
- Event-driven architecture
- Asynchronous communication
- Fault tolerance
- Message persistence
- Horizontal scaling
- Decoupling services
- Event streaming
- Replayable events

### Typical architecture

```text
Order Service
     │
     ↓
 Kafka
     │
 ├── Payment Service
 ├── Inventory Service
 ├── Notification Service
 └── Analytics
```

Producer doesn't need to directly call every service.

---

# 4. Topic

A **topic** is a named stream/category of events.

Example:

```text
orders
payments
users
notifications
```

A topic can have multiple partitions.

```text
orders
 ├── P0
 ├── P1
 ├── P2
 └── P3
```

### Can multiple producers write to one topic?

**Yes.**

### Can multiple consumers read one topic?

**Yes.**

---

# 5. Partition ⭐⭐⭐

Partition is one of the **most important Kafka concepts**.

Each partition is an **ordered append-only log**.

```text
P0:
offset 0 → A
offset 1 → B
offset 2 → C
offset 3 → D
```

### Ordering

Kafka guarantees ordering **within a partition**, NOT across the entire topic.

```text
P0: A → B → C
P1: X → Y → Z
```

No guaranteed ordering between P0 and P1.

### How to guarantee order?

Send related messages to the **same partition**, usually using the same key.

```text
orderId = 101
      ↓
same partition
      ↓
event1 → event2 → event3
```

---

# 6. Partition Key

Producer can provide:

```text
key = userId
value = event
```

Kafka uses the key to determine the partition.

Conceptually:

```text
hash(key) → partition
```

Therefore:

```text
userId 101 → P2
userId 102 → P0
userId 101 → P2
```

So events for user 101 remain ordered.

### Important interview point

**Same key → same partition** under normal partitioning behavior, provided the partitioning configuration/mapping remains compatible.

---

# 7. Offset ⭐⭐⭐

Offset = unique sequential position **within a partition**.

```text
Partition 0

Offset   Message
0        A
1        B
2        C
3        D
```

Offset is **not globally unique across a topic**.

```text
P0 offset 5
P1 offset 5
```

Both can exist.

---

# 8. Kafka Is Pull-Based

Consumers generally **pull** messages from Kafka.

```text
Consumer
   │
   │ fetch
   ↓
Kafka
```

This allows consumers to control their consumption rate.

---

# 9. Consumer

Consumer reads records from Kafka.

Example:

```text
Kafka → Consumer → Database
```

Consumer maintains/commits its progress using offsets.

---

# 10. Consumer Group ⭐⭐⭐

A consumer group is a collection of consumers working together.

Example:

```text
Topic: orders
Partitions: 4

Consumer Group A
 ├── C1 → P0
 ├── C2 → P1
 ├── C3 → P2
 └── C4 → P3
```

### Most important rule

> **Within a consumer group, one partition is assigned to at most one consumer at a time.**

---

# 11. Consumers vs Partitions

Suppose:

```text
4 partitions
2 consumers
```

Possible:

```text
C1 → P0, P1
C2 → P2, P3
```

Suppose:

```text
4 partitions
6 consumers
```

Only 4 consumers can actively consume partitions.

```text
C1 → P0
C2 → P1
C3 → P2
C4 → P3
C5 → idle
C6 → idle
```

### Golden rule

```text
Maximum active consumers in a group
≈ number of partitions
```

Therefore, **partitions determine consumer-side parallelism**.

---

# 12. Multiple Consumer Groups ⭐⭐⭐

Different consumer groups can independently consume the same topic.

```text
              orders
                 │
       ┌─────────┴─────────┐
       ↓                   ↓
Payment Group         Analytics Group
   C1 C2                  C3 C4
```

Each group has its **own offsets**.

So Kafka supports **fan-out** naturally.

---

# 13. Consumer Group vs Consumer

**Consumer**

→ One process/instance reading messages.

**Consumer Group**

→ Logical team of consumers sharing work.

---

# 14. Producer

Producer sends records to Kafka.

```text
Producer
   ↓
Topic
   ↓
Partition
```

Producer decides/participates in determining which partition receives the record.

---

# 15. Producer Acknowledgement (`acks`) ⭐⭐⭐

Controls how much confirmation producer requires.

### `acks=0`

```text
Producer → Kafka
```

No acknowledgement.

- Lowest latency
- Highest risk of message loss

### `acks=1`

Leader acknowledges after writing locally.

- Better reliability
- Leader failure before replication can still cause loss depending on configuration

### `acks=all` / `acks=-1`

Leader waits for required in-sync replicas.

- Highest durability
- Higher latency

### Interview answer

> For stronger durability, use `acks=all` together with appropriate replication and `min.insync.replicas`.

---

# 16. Replication ⭐⭐⭐

Partitions can have replicas.

Example:

```text
Replication Factor = 3

P0:
Leader   → Broker 1
Follower → Broker 2
Follower → Broker 3
```

If Broker 1 fails, another eligible replica can become leader.

### Why replication?

- Fault tolerance
- High availability
- Durability

---

# 17. Leader & Followers

Each partition has:

```text
1 Leader
N Followers
```

Normally:

```text
Producer → Leader
Consumer → Leader
```

Followers replicate the leader's data.

---

# 18. ISR ⭐⭐⭐

**ISR = In-Sync Replicas**

Replicas sufficiently caught up with the leader.

Example:

```text
Replication Factor = 3

Leader   B1 ✓
Follower B2 ✓
Follower B3 ✗

ISR = B1, B2
```

If leader fails, an eligible ISR replica can become leader.

---

# 19. `min.insync.replicas`

Defines minimum number of replicas that must be in sync for certain acknowledged writes to succeed.

Example:

```text
RF = 3
min.insync.replicas = 2
acks = all
```

At least 2 replicas must be in sync for the write to succeed.

### Common interview configuration

```text
replication.factor = 3
acks = all
min.insync.replicas = 2
```

Good durability-oriented setup.

---

# 20. Retention ⭐⭐⭐

Kafka does **not** normally delete a message immediately after consumption.

Messages remain according to retention policies.

Example:

```text
Message
   ↓
Consumer reads
   ↓
Message still exists
   ↓
Retention period/size reached
   ↓
Kafka deletes old segment data
```

Common retention controls:

- `retention.ms`
- `retention.bytes`

### Important

**Kafka ≠ traditional queue where consumption automatically removes the message.**

---

# 21. Replay ⭐⭐⭐

Because Kafka retains messages, consumers can move their offsets backward and process old events again.

Example:

```text
0 → 1 → 2 → 3 → 4
          ↑
      start again
```

Useful for:

- Reprocessing
- Bug recovery
- New consumers
- Data reconstruction
- Event-driven systems

---

# 22. Offset Commit ⭐⭐⭐

Consumer tracks how far it has processed.

Example:

```text
Read:
0
1
2
3

Commit offset
     ↓
    3/next position
```

Conceptually, Kafka consumer offset commits represent the consumer's progress.

### Commit types

**Auto commit**

Kafka client periodically commits offsets.

**Manual commit**

Application controls when offsets are committed.

---

# 23. At-Most-Once vs At-Least-Once vs Exactly-Once ⭐⭐⭐

### At-most-once

```text
Commit → Process
```

If processing fails after commit:

**message may be lost**

---

### At-least-once

```text
Process → Commit
```

If application crashes after processing but before commit:

**message may be processed again**

Most common practical approach.

---

### Exactly-once

Goal:

> Avoid duplicate effects while processing Kafka records.

Kafka supports transactional/exactly-once mechanisms for supported Kafka processing patterns, but **exactly-once is not automatically guaranteed for arbitrary external systems**.

---

# 24. Idempotency ⭐⭐⭐

Very important for Kafka interviews.

If a message is processed twice:

```text
Payment $100
Payment $100
```

You don't want:

```text
Balance -$200
```

Use an idempotency key such as:

```text
transactionId = TX123
```

Database:

```text
TX123 already processed?
     ↓
YES → ignore duplicate
NO  → process
```

### Remember

> **At-least-once + idempotent processing = practical duplicate-safe architecture.**

---

# 25. Delivery Semantics

| Type | Meaning |
|---|---|
| At-most-once | May lose messages, no duplicates from retries |
| At-least-once | No intentional loss, duplicates possible |
| Exactly-once | Process effects exactly once within supported transactional boundaries |

---

# 26. Producer Batching ⭐

Producer can batch multiple records.

```text
A
B
C
D
 ↓
Batch
 ↓
Kafka
```

Benefits:

- Higher throughput
- Fewer network requests
- Better network utilization

Related settings include:

- `batch.size`
- `linger.ms`
- compression settings

---

# 27. Compression

Kafka supports compression such as:

- gzip
- snappy
- lz4
- zstd

Benefits:

- Less network bandwidth
- Smaller storage footprint
- Better throughput in many workloads

Trade-off:

**CPU cost ↔ network/storage savings**

---

# 28. Consumer Lag ⭐⭐⭐

Consumer lag = how far a consumer/group is behind the latest available data.

Conceptually:

```text
Latest offset = 1000
Consumer progress = 900

Lag ≈ 100
```

High lag means consumers aren't keeping up.

### Causes

- Slow processing
- Too few consumers
- Too few partitions
- Downstream DB/API bottleneck
- CPU/memory limitations
- Network problems
- Rebalances

### Fix

- Increase partitions where appropriate
- Add consumers
- Optimize processing
- Batch processing
- Improve downstream dependencies
- Scale infrastructure

---

# 29. Scaling Kafka ⭐⭐⭐

Kafka scales horizontally using:

```text
More Brokers
+
More Partitions
+
Replication
+
Consumer Groups
```

Example:

```text
Broker 1 ─ P0 P3
Broker 2 ─ P1 P4
Broker 3 ─ P2 P5
```

Partitions allow work/storage to be distributed.

---

# 30. Partition Count and Scaling

If you need more consumer parallelism:

```text
Increase partitions
```

But partition count should be planned carefully because increasing partitions can affect:

- Ordering by key
- Distribution
- Operational overhead

### Important

You can generally **increase** partitions, but reducing partition count is not a normal in-place operation.

---

# 31. Rebalancing ⭐⭐⭐

When consumers join/leave a consumer group, Kafka may redistribute partitions.

```text
Before:

C1 → P0 P1
C2 → P2 P3

C3 joins

After:

C1 → P0
C2 → P1 P2
C3 → P3
```

This is called **rebalance**.

### Problems

Frequent rebalances can cause:

- Processing pauses
- Increased latency
- Duplicate processing depending on processing/commit behavior

---

# 32. Kafka vs Traditional Message Queue

### Kafka

Best for:

- High throughput
- Event streaming
- Persistent event log
- Replay
- Multiple independent consumers
- Large-scale pipelines

### Traditional queue

Often better when:

- Work should be removed after successful processing
- Simple task distribution is the main requirement

### Key difference

```text
Kafka:
Producer → Topic → Consumer
                 ↓
              retained

Queue:
Producer → Queue → Consumer
                    ↓
                  removed
```

---

# 33. Kafka vs REST

### REST

```text
Service A → HTTP → Service B
```

Usually synchronous request/response.

### Kafka

```text
Service A → Kafka → Service B
```

Asynchronous/event-driven.

Kafka provides:

- Decoupling
- Buffering
- Replay
- Multiple consumers
- High throughput

---

# 34. Kafka vs Database

Kafka is **not primarily a replacement for your transactional database**.

Use:

```text
PostgreSQL → source of transactional state
Kafka      → event streaming / distribution
```

Common architecture:

```text
Application
   │
   ├── DB
   │
   └── Kafka → other services
```

---

# 35. Kafka vs Redis

### Redis

Great for:

- Cache
- Fast key-value operations
- Counters
- Sessions
- Short-lived state

### Kafka

Great for:

- Event streams
- Durable event history
- High-throughput pipelines
- Replay

---

# 36. Kafka Connect

Kafka Connect moves data between Kafka and external systems.

```text
Database
   ↓
Kafka Connect
   ↓
Kafka
```

or:

```text
Kafka
  ↓
Kafka Connect
  ↓
Elasticsearch / DB / Storage
```

### Two concepts

**Source Connector**

External system → Kafka

**Sink Connector**

Kafka → External system

---

# 37. Kafka Streams

Kafka Streams is a Java library for processing Kafka data.

Example:

```text
orders
   ↓
Kafka Streams
   ↓
filter / map / aggregate
   ↓
processed-orders
```

Useful for:

- Filtering
- Transformation
- Aggregation
- Joins
- Windowing
- Stateful stream processing

---

# 38. Schema Registry

Kafka itself doesn't require a schema registry.

Schema Registry commonly manages schemas for events.

Popular formats:

- Avro
- Protobuf
- JSON Schema

Benefits:

- Contract management
- Compatibility checks
- Versioning

Example:

```text
OrderEvent v1
      ↓
OrderEvent v2
```

---

# 39. Serialization / Deserialization

Producer:

```text
Java Object
   ↓
Serializer
   ↓
Bytes
   ↓
Kafka
```

Consumer:

```text
Kafka bytes
   ↓
Deserializer
   ↓
Java Object
```

Common formats:

- JSON
- Avro
- Protobuf

---

# 40. Kafka Transaction ⭐⭐

Kafka supports transactions for atomic Kafka operations.

Example:

```text
Read event
   ↓
Process
   ↓
Write result to Kafka
   ↓
Commit transaction
```

If failure:

```text
Abort transaction
```

Useful for Kafka-to-Kafka exactly-once processing.

---

# 41. Dead Letter Topic (DLT/DLQ)

If a message repeatedly fails:

```text
orders
   ↓
Consumer
   ↓
Processing fails
   ↓
Retry
   ↓
Still fails
   ↓
Dead Letter Topic
```

Used to prevent poison messages from continuously blocking processing.

---

# 42. Retry Pattern

```text
Kafka
 ↓
Consumer
 ↓
Failure
 ↓
Retry
 ↓
Success
```

Could use:

- Retry topics
- Delayed retry patterns
- Backoff
- Dead-letter topic

Avoid infinite immediate retries.

---

# 43. Poison Message

A message that repeatedly causes processing failure.

Example:

```text
Malformed JSON
Invalid data
Unsupported schema
```

Handle using:

```text
Retry → Backoff → DLT
```

---

# 44. Ordering + Scaling Trade-off ⭐⭐⭐

You want:

> Global ordering

but also:

> Massive parallelism

These conflict.

More partitions:

```text
P0 P1 P2 P3
```

→ more parallelism

But ordering is only guaranteed **inside each partition**.

### Interview answer

> If ordering matters for an entity, partition by that entity's key rather than trying to enforce global topic ordering.

---

# 45. Hot Partition ⭐⭐

If one key receives huge traffic:

```text
userId = celebrity
       ↓
     P0
       ↓
████████████
```

One partition becomes overloaded.

This is a **hot partition**.

Solutions depend on requirements:

- Better key distribution
- Composite/sharded keys
- More partitions
- Separate high-volume workloads
- Application-level aggregation

But sharding a key can sacrifice strict per-key ordering unless additional ordering logic is introduced.

---

# 46. Backpressure ⭐⭐

Producer/consumer systems can become overloaded.

```text
Producer
   ↓↓↓↓↓↓↓
 Kafka
   ↓
Slow Consumer
```

Kafka naturally buffers data through its retained log.

Consumer lag grows instead of forcing producer and consumer to run at exactly the same speed.

---

# 47. Kafka Fault Tolerance

Use:

```text
Multiple brokers
+
Replication
+
ISR
+
Leader election
```

Example:

```text
B1 = Leader
B2 = Follower
B3 = Follower
```

If B1 fails:

```text
B2 → new leader
```

assuming it is an eligible replica.

---

# 48. ZooKeeper vs KRaft ⭐⭐⭐

Older Kafka architecture:

```text
Kafka Brokers
     ↓
ZooKeeper
```

Modern Kafka uses:

```text
Kafka
  ↓
KRaft controllers
```

**KRaft = Kafka Raft metadata mode.**

Interview answer:

> Modern Kafka uses KRaft instead of requiring ZooKeeper for Kafka metadata management.

---

# 49. Important Producer Configs

Know these:

```text
acks
retries
batch.size
linger.ms
compression.type
key.serializer
value.serializer
enable.idempotence
```

### Important

`enable.idempotence=true` helps prevent duplicate records caused by producer retries within Kafka's supported idempotent-producer semantics.

---

# 50. Important Consumer Configs

Know these:

```text
group.id
key.deserializer
value.deserializer
auto.offset.reset
enable.auto.commit
max.poll.records
```

### `auto.offset.reset`

What happens when there is no valid committed offset.

Common values:

```text
earliest → start from earliest available data
latest   → start from latest/new data
none     → throw error
```

---

# 51. `group.id`

Consumers with the same:

```text
group.id
```

belong to the same consumer group.

Different `group.id`:

```text
Group A ≠ Group B
```

They independently consume the topic.

---

# 52. Important Broker Config Concepts

Know:

- `num.partitions`
- `default.replication.factor`
- `min.insync.replicas`
- retention settings
- log segment settings
- listener/network configuration

---

# 53. Log Segments ⭐⭐

Kafka doesn't store a partition as one giant file.

Partitions are divided into **log segments**.

Retention/deletion is performed largely at segment granularity.

You generally don't need deep filesystem internals for interviews.

---

# 54. Kafka Storage Model

Kafka is an **append-only log**.

```text
Write → Write → Write → Write

0      1      2      3
A      B      C      D
```

Sequential append is one reason Kafka can achieve high throughput.

---

# 55. Consumer Offset ≠ Message ID

Important confusion.

```text
Offset = position in a partition
```

It is not a globally unique business identifier.

For business identity use something like:

```text
orderId
transactionId
eventId
```

---

# 56. Topic ≠ Consumer Group

**Topic**

→ What data is being consumed.

**Consumer group**

→ Who is consuming it as a coordinated group.

---

# 57. Partition ≠ Broker

**Partition**

→ Data/log unit.

**Broker**

→ Kafka server that hosts partitions.

One broker can host many partitions.

---

# 58. Replication Factor ≠ Number of Partitions

Example:

```text
Topic:
6 partitions
RF = 3
```

Means:

```text
6 logical partitions
×
3 replicas each
```

Not 18 logical partitions.

---

# 59. Common Kafka Architecture

For a microservices system:

```text
                  ┌──────────────┐
                  │   Producer   │
                  └──────┬───────┘
                         ↓
                    ┌─────────┐
                    │  Kafka  │
                    └────┬────┘
             ┌───────────┼───────────┐
             ↓           ↓           ↓
          Payment     Inventory   Analytics
          Group        Group        Group
```

Each service can independently consume events.

---

# 60. Kafka Interview Design Formula ⭐⭐⭐

When asked:

> "How would you use Kafka?"

Think:

```text
1. What are the events?
2. Topic?
3. Partition count?
4. Partition key?
5. Ordering requirement?
6. Consumer groups?
7. Replication factor?
8. Durability/acks?
9. Retention?
10. Retry + DLT?
11. Idempotency?
12. Monitoring consumer lag?
13. Scaling strategy?
14. Schema/versioning?
15. Failure recovery?
```

---

# 61. Scale Example

Question:

> "System receives 100K events/sec. How would you scale Kafka?"

Answer structure:

```text
100K events/sec
      ↓
Multiple producers
      ↓
Enough partitions
      ↓
Distributed across brokers
      ↓
Replication factor 3
      ↓
Multiple consumers
      ↓
Consumer groups
```

Then mention:

- Partition throughput
- Broker capacity
- Consumer processing capacity
- Network/disk limits
- Batch + compression
- Consumer lag monitoring
- Capacity testing

### Key rule

> **Partitions provide parallelism; brokers provide distributed capacity; consumer instances process partitions in parallel.**

---

# 62. Reliability Design

For important events:

```text
Replication Factor = 3
acks = all
min.insync.replicas = 2
Idempotent producer
At-least-once consumer processing
Idempotent consumers
Retry + DLT
Monitoring
```

This is a strong interview answer.

---

# 63. Performance Optimization

Mention:

### Producer

- Batching
- Compression
- Async sending
- Appropriate `acks`
- Idempotence where needed

### Kafka

- Sufficient partitions
- Multiple brokers
- Fast disks/network
- Proper replication
- Avoid hot partitions

### Consumer

- Parallel consumers
- Batch processing
- Efficient downstream calls
- Appropriate polling configuration
- Monitor lag

---

# 64. Kafka Failure Scenarios

### Broker dies

```text
Leader fails
 ↓
Eligible replica becomes leader
```

### Consumer dies

```text
Consumer leaves
 ↓
Rebalance
 ↓
Another consumer gets partitions
```

### Producer request fails

```text
Retry
 ↓
Idempotence helps avoid duplicate writes
```

### Consumer processing fails

```text
Don't commit incorrectly
 ↓
Retry/reprocess
 ↓
DLT if permanently bad
```

---

# 65. Kafka's Biggest Guarantees

Remember these:

### Ordering

**Per partition**

### Durability

Controlled by:

```text
Replication
+
acks
+
ISR
+
min.insync.replicas
```

### Scaling

Primarily through:

```text
Partitions + brokers + consumers
```

### Replay

Possible because messages are retained.

### Fan-out

Multiple consumer groups can independently read the same topic.

---

# 66. Most Common Interview Questions

### Beginner

1. What is Kafka?
2. Why Kafka?
3. Kafka vs RabbitMQ?
4. What is a topic?
5. What is a partition?
6. What is a broker?
7. What is an offset?
8. What is a consumer?
9. What is a producer?
10. What is a consumer group?

### Intermediate

11. How does Kafka achieve scalability?
12. How does Kafka achieve fault tolerance?
13. What is replication?
14. Leader vs follower?
15. What is ISR?
16. What is consumer lag?
17. What is rebalance?
18. How does partitioning work?
19. How do you guarantee ordering?
20. Why use a message key?

### Advanced-interview level

21. At-most-once vs at-least-once vs exactly-once?
22. How do you prevent duplicate processing?
23. How would you handle failed messages?
24. What is a DLT?
25. How would you handle 100K/1M events/sec?
26. How do you choose partition count?
27. What causes consumer lag?
28. What causes hot partitions?
29. `acks=0` vs `1` vs `all`?
30. `min.insync.replicas`?
31. Idempotent producer?
32. Kafka transactions?
33. Kafka Streams?
34. Kafka Connect?
35. Schema Registry?
36. ZooKeeper vs KRaft?
37. Kafka vs database?
38. Kafka vs Redis?
39. Kafka vs REST?
40. How would you design a reliable event-driven architecture?

---

# 67. 🔥 15 Things to Memorize Before Interview

```text
1. Kafka = distributed event streaming platform.

2. Topic = logical stream.

3. Partition = ordered append-only log.

4. Ordering = only within a partition.

5. Key → partition → ordering for related events.

6. Broker = Kafka server.

7. Replication = fault tolerance.

8. Leader handles partition operations; followers replicate.

9. ISR = replicas sufficiently in sync with leader.

10. Consumer group = consumers sharing partitions.

11. One partition → at most one consumer in a group at a time.

12. More partitions → more consumer parallelism.

13. Offset = position within a partition.

14. Kafka retains messages; consuming does not automatically delete them.

15. At-least-once + idempotent processing is a common reliable design.
```

## Final mental picture

```text
                 PRODUCERS
              ┌─────┴─────┐
              ↓           ↓
           ┌─────────────────┐
           │      TOPIC      │
           │                 │
           │ P0  P1  P2  P3  │
           └─────────────────┘
              ↓   ↓   ↓   ↓
          ┌───────────────────┐
          │  KAFKA BROKERS    │
          │ Replication / ISR │
          └─────────┬─────────┘
                    ↓
             CONSUMER GROUP
             ┌──────┼──────┐
             ↓      ↓      ↓
            C1     C2     C3

Key → Partition → Ordering
Partition → Parallelism
Replication → Fault tolerance
Offset → Progress
Consumer Group → Work sharing
Retention → Replay
Lag → Consumer health
Idempotency → Duplicate safety
```

**If you remember that final diagram + the 15 rules, you can answer a large portion of Kafka interview questions correctly.**
