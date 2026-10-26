# Coverage: Kafka
Reference: reference/kafka.md  ·  Last updated: 21-10-2026

Every reference item (key list: the numbered sections, plus each question, pattern and "X vs Y" row inside them) appears in exactly
one of Mapped, Corrected or Dropped. A section whose parts went to different places has one row here (Corrected wins over
Mapped), and its other parts are listed under "Details placed elsewhere or cut". Sources for corrections are primary pages.

## Mapped
| Reference item (key + short title) | Landed in | Note |
|---|---|---|
| K0. Mental model (producer to consumer chain, "distributed event streaming platform") | concept what-is-kafka (hook, sayIt); kafka-architecture (Mermaid) |  |
| K1. Core terminology table | glossary of each owning unit; this unit owns Broker, Cluster, Kafka Controller (glossary `kafka-broker`, `kafka-cluster`, `kafka-controller`) | Other rows (topic, partition, offset, ISR, leader, follower, retention, rebalance, Streams, Schema Registry) go to the units that own them |
| K2. Basic architecture (part: cluster diagram, producer to broker to consumer group); K2 (part: topic is logical, partition is physical; the orders P0-P2 example) | concept kafka-architecture (Mermaid, points); comparison topic-vs-partition-vs-broker; concept topics | "Topic ≠ Partition" note belongs to topics (comparison topic-vs-partition-vs-broker) Rest of K2 (cluster drawing) is owned by kafka-architecture |
| K3. Why Kafka? (with the Order Service fan-out picture) | concept what-is-kafka (points, Why, Mermaid, Interview Q 2) | Fan-out picture merged with K59 into one Mermaid |
| K4. Topic (named stream; orders/payments examples; topic has many partitions) | concept topics (hook, points, sayIt); glossary kafka-topic |  |
| K4.Q1 Can multiple producers write to one topic? | concept topics (point "Many writers, many readers", Interview Q 1); tree multi-producer-topic |  |
| K4.Q2 Can multiple consumers read one topic? | concept topics (Interview Q 1); tree multi-group-topic | Answered per group: every group reads all; inside a group partitions are shared |
| K5. Partition (ordered append-only log; order within a partition only; same key for related events) | concept partitions (hook, points, trap, Mermaid) | Key mechanics linked to partition-keys |
| K8. Kafka is pull-based | concept consumer-basics (point, trap, Why, Interview Q "Why pull instead of push?"); tree consumer-long-poll | Long polling added from the design doc |
| K9. Consumer | concept consumer-basics (hook, Steps, Example); glossary kafka-consumer-term |  |
| K10. Consumer group (incl. the "one partition, at most one consumer" rule) | concept consumer-groups (hook, point); glossary consumer-group-term |  |
| K12. Multiple consumer groups (fan-out, own offsets) | concept consumer-groups (point, Mermaid, Interview Q "How do two services both read every order?"); tree multiple-consumer-groups |  |
| K13. Consumer group vs consumer | comparison consumer-vs-consumer-group |  |
| K14. Producer (sends records; producer → topic → partition; producer takes part in choosing the partition) | concept `producer-basics` (hook, Steps, Interview Q "What is a Kafka producer?") | partition choice linked to `partition-keys`, not restated |
| K16. Replication (why: fault tolerance, availability, durability; RF 3 example) | concept `replication` (hook, points, Mermaid, Example) | Failover detail goes to `fault-tolerance` |
| K21. Replay (move offsets back; reprocessing, bug recovery, new consumers, data reconstruction, event-driven systems) | concept replay (table, points, Interview Qs) | "event-driven systems" folded into the use list |
| K23. At-most-once vs at-least-once vs exactly-once | comparison `at-most-once-vs-at-least-once-vs-exactly-once`; concept `delivery-semantics` (hook, trap) | Added the doc's second half of at-most-once: disable producer retries (Interview Q) |
| K25. Delivery semantics table | comparison `at-most-once-vs-at-least-once-vs-exactly-once` (gist, rows) |  |
| K26. Producer batching (higher throughput, fewer requests; batch.size, linger.ms, compression) | concept `batching-and-compression` (points, Steps, Defaults, tree) |  |
| K27. Compression (gzip, snappy, lz4, zstd; less bandwidth and storage; CPU vs network/storage trade-off) | concept `batching-and-compression` (Defaults, points "Whole batch", "Cost", Interview Q) | added the default `none` and the topic-level `compression.type=producer` |
| K28. Consumer lag (definition, causes, fixes) | concept consumer-lag (hook, cause → fix table, Example, Interview Qs) | "Consumer progress" made precise as the committed offset; causes CPU, memory and network folded into "slow processing"; "scale infrastructure" left out as too vague |
| K31. Rebalancing (example C3 joins; problems: pauses, latency, duplicates) | concept rebalancing (hook, points, trap, Compare, Interview Qs) | Pauses apply to all partitions only with eager rebalancing; cooperative and KIP-848 pause only moved partitions |
| K33. Kafka vs REST | comparison kafka-vs-rest; concept kafka-vs-alternatives (point, Interview Q) |  |
| K36. Kafka Connect (database → Connect → Kafka, Kafka → Connect → Elasticsearch/DB/storage; source vs sink connector) | concept `kafka-connect` (hook, points, Mermaid); tree `connect-source-connector`, `connect-sink-connector` | Diagram redrawn as one Mermaid with the shop database |
| K37. Kafka Streams (Java library; filtering, transformation, aggregation, joins, windowing, stateful processing; orders → Streams → processed-orders) | concept `kafka-streams` (hook, points, Mermaid topology, Java example); tree `streams-windows`, `streams-state-store` | Example re-based on payments counted by method |
| K39 (part). Serializer flow: Java object → serializer → bytes → Kafka; formats JSON, Avro, Protobuf; K39 (part: formats JSON, Avro, Protobuf) | concept `producer-basics` (point "Serializers", Steps "Serialise", tree `kafka-serializers`); concept `schema-registry-and-serialization` (point "Formats"); tree `sr-avro`, `sr-protobuf`, `sr-json-schema` | deserializer half belongs to consumer-basics; formats linked to `schema-registry-and-serialization` Plain JSON is listed as JSON Schema, the format a registry can check. The serializer flow part of K39 belongs to `producer-basics` (linked) |
| K40. Kafka transaction (read, process, write, commit; abort on failure; Kafka-to-Kafka EOS) | concept `kafka-transactions` (Mermaid, Example) | Reference left out the consumed offsets and read_committed; both added |
| K41. Dead Letter Topic (DLT/DLQ) | concept `retries-and-dead-letter-topics` (hook, points, Interview Q 3); tree `dead-letter-topic`; glossary `dead-letter-topic` | flow "retry, still fails, DLT" is the non-blocking diagram in the comparison |
| K42. Retry Pattern (retry topics, delayed retry, backoff, DLT, avoid infinite immediate retries) | concept `retries-and-dead-letter-topics` (points, sayIt); comparison `blocking-vs-non-blocking-retries`; glossary `retry-topic`, `exponential-backoff` | "avoid infinite retries" → cap the attempts |
| K44. Ordering + Scaling Trade-off (global ordering vs parallelism; key by entity) | concept `ordering-and-scaling` (hook, points, Steps, sayIt); tree `global-ordering`, `per-key-ordering` |  |
| K46. Backpressure | concept consumer-lag (point "Backpressure", bullet on pull model); glossary backpressure-term |  |
| K47. Kafka fault tolerance (brokers + replication + ISR + leader election; B1 fails, B2 leads) | concept `fault-tolerance` (Steps, sayIt) |  |
| K50. Important consumer configs (group.id, key/value.deserializer, auto.offset.reset with earliest/latest/none, enable.auto.commit, max.poll.records) | concept consumer-configs (table, points, trap, Interview Q); tree offset-reset-* |  |
| K51. group.id | concept consumer-groups (hook); glossary group-id-term; consumer-configs (table row, link only) |  |
| K52. Broker config concepts (part: listener/network configuration); K52 (parts: num.partitions, default.replication.factor, topic auto-creation); K52 (part: retention and log segment settings) | concept kafka-architecture (points, Example, Defaults, Interview Q 2); concept topics (Defaults table, trap, Interview Q 2); tree topic-auto-creation; concept log-storage (points, Defaults) | num.partitions, default.replication.factor → topics; min.insync.replicas → isr-and-min-insync; retention and segments → log-storage Other K52 parts: retention/segments here in log-storage; min.insync and listeners in other units |
| K54. Kafka Storage Model (append-only log; sequential append for throughput) | concept log-storage (point "Fast writes", Steps "Append") | Other speed reasons owned by kafka-performance-tuning |
| K55. Consumer Offset ≠ Message ID (use orderId / eventId) | concept offsets (trap); link idempotent-consumers lives in other unit |  |
| K56. Topic ≠ consumer group | concept consumer-groups (point "Topic vs group") |  |
| K57. Partition ≠ Broker (one broker hosts many partitions) | comparison topic-vs-partition-vs-broker (rows, gist); tree partition-broker-host |  |
| K58. Replication factor is not number of partitions (6 partitions × RF 3) | concept `replication` (trap) |  |
| K59. Common Kafka architecture (one group per service) | concept what-is-kafka (Mermaid) | Merged with K3 picture |
| K60. Kafka Interview Design Formula (15 questions: events, topic, partition count, key, ordering, groups, RF, acks, retention, retry + DLT, idempotency, lag, scaling, schema, failure recovery) | concept `kafka-design-formula` (Steps, hook, trap) | 15 questions merged into 10 steps; "ordering requirement" is part of the Key step, "scaling strategy" of Partitions, "failure recovery" of Failures (details in `kafka-failure-scenarios`). |
| K61. Scale Example (100K events/s: partitions, brokers, RF 3, consumers; partition throughput, broker capacity, consumer capacity, network/disk, batch + compression, lag, capacity testing; key rule partitions/brokers/consumers) | `kafka-design-formula` (Example calculation, points, Interview Q 1); tree `design-broker-memory`, `design-broker-disks`, `design-load-test`, `design-growth-headroom` | Reference had no numbers; added a worked calculation with assumed rates clearly labelled "replace by measured ones". The key rule became the three points Partitions / Brokers / Consumer instances. |
| K62. Reliability design (RF 3, acks=all, min.insync 2, idempotent producer, at-least-once, idempotent consumers, retry + DLT, monitoring) | concept `delivery-semantics` (Example table, Interview Q) | Each row only links its owner; "monitoring" made concrete as consumer-lag alerts |
| K64. Kafka Failure Scenarios (broker dies, consumer dies, producer request fails, consumer processing fails) | concept `kafka-failure-scenarios` (table, points, trap, Interview Q 1) | Added rows beyond the four: all ISR lost, controller majority lost, consumer too slow, poison record (see Added). |
| K65. Kafka's Biggest Guarantees (ordering per partition; durability = replication + acks + ISR + min.insync.replicas; scaling = partitions + brokers + consumers; replay; fan-out) | `kafka-playbook` (rule table, Interview Q 1); tree `guarantee-order`, `guarantee-durability`, `guarantee-scaling`, `guarantee-replay`, `guarantee-fan-out` |  |
| K66 (intro: questions grouped as beginner / intermediate / advanced) | `kafka-playbook` (answer order) and the `level` tags of all concepts | Used as a hint for level and heat only; each question K66.Q1–Q40 is mapped by the unit that owns it. |
| K66.Q1. What is Kafka? | concept what-is-kafka (Interview Q) |  |
| K66.Q2. Why Kafka? | concept what-is-kafka (Interview Q) |  |
| K66.Q3. Kafka vs RabbitMQ? | concept kafka-vs-alternatives (Interview Q); comparison kafka-vs-message-queue |  |
| K66.Q4 What is a topic? | concept topics (sayIt) |  |
| K66.Q5 What is a partition? | concept partitions (Interview Q 1, sayIt) |  |
| K66.Q6. What is a broker? | concept kafka-architecture (Interview Q) |  |
| K66.Q7 What is an offset? | concept offsets (sayIt) |  |
| K66.Q8 What is a consumer? | concept consumer-basics (sayIt) |  |
| K66.Q9. What is a producer? | concept `producer-basics` (Interview Q) |  |
| K66.Q10 What is a consumer group? | concept consumer-groups (sayIt) |  |
| K66.Q11 How does Kafka achieve scalability? | `kafka-design-formula` Interview Q 2 |  |
| K66.Q12 How does Kafka achieve fault tolerance? | concept `fault-tolerance` (Interview Q) |  |
| K66.Q13 What is replication? | concept `replication` (sayIt) |  |
| K66.Q14 Leader vs follower? | concept `replication` (Interview Q) |  |
| K66.Q15 What is ISR? | concept `isr-and-min-insync` (sayIt, Interview Q) |  |
| K66.Q16 What is consumer lag? | concept consumer-lag (Interview Q "What is consumer lag and how do you monitor it?") |  |
| K66.Q17 What is rebalance? | concept rebalancing (hook, sayIt, Interview Q "What triggers a rebalance?") |  |
| K66.Q18 How does partitioning work? | concept partition-keys (How it works table, sayIt) |  |
| K66.Q19 How do you guarantee ordering? | concept `ordering-and-scaling` (Interview Q 1) |  |
| K66.Q20 Why use a message key? | concept partition-keys (Interview Q 1) |  |
| K66.Q21 At-most-once vs at-least-once vs exactly-once? | concept `delivery-semantics` (Interview Q) |  |
| K66.Q22 How do you prevent duplicate processing? | concept `idempotent-consumers` (Interview Q 1) |  |
| K66.Q23 How would you handle failed messages? | concept `retries-and-dead-letter-topics` (Interview Q 1) |  |
| K66.Q24 What is a DLT? | concept `retries-and-dead-letter-topics` (points, Interview Q 3); glossary `dead-letter-topic` |  |
| K66.Q25 How would you handle 100K/1M events/sec? | `kafka-design-formula` Interview Q 1 |  |
| K66.Q26 How do you choose partition count? | concept `ordering-and-scaling` (point, Interview Q 2); tree `partition-count` | formula from Jun Rao, numbers to be measured |
| K66.Q27 What causes consumer lag? | concept consumer-lag (Interview Q "What causes lag, and how do you fix it?") |  |
| K66.Q28 What causes hot partitions? | concept partition-keys (Interview Q 2) |  |
| K66.Q29. acks=0 vs 1 vs all? | comparison acks-0-vs-1-vs-all; concept producer-acks (the reference's wording is corrected under K15) |  |
| K66.Q30 min.insync.replicas? | concept `isr-and-min-insync` (table, Interview Qs, trap) |  |
| K66.Q31. Idempotent producer? | concept `idempotent-producer` (Interview Q) |  |
| K66.Q32 Kafka transactions? | concept `kafka-transactions` (Interview Q, sayIt) |  |
| K66.Q33 Kafka Streams? | concept `kafka-streams` (Interview Q "How is Kafka Streams different from a plain consumer?", sayIt) |  |
| K66.Q34 Kafka Connect? | concept `kafka-connect` (Interview Q "What is Kafka Connect, and when would you use it?") |  |
| K66.Q35 Schema Registry? | concept `schema-registry-and-serialization` (Interview Q "What does a schema registry give you that Kafka does not?") |  |
| K66.Q36. ZooKeeper vs KRaft? | concept kraft (Interview Q 1); comparison zookeeper-vs-kraft |  |
| K66.Q37. Kafka vs database? | concept kafka-vs-alternatives (Interview Q 2) |  |
| K66.Q38. Kafka vs Redis? | comparison kafka-vs-redis; concept kafka-vs-alternatives (point) |  |
| K66.Q39. Kafka vs REST? | concept kafka-vs-alternatives (Interview Q 3); comparison kafka-vs-rest |  |
| K66.Q40 How would you design a reliable event-driven architecture? | `kafka-design-formula` Interview Q 3 | Links the recipe (`delivery-semantics`), `transactional-outbox`, `idempotent-consumers`; no recipe restated. |
| K67. 15 Things to Memorize (section) | `kafka-playbook` rule table (11 rows, deduplicated with K65 and K-FINAL) |  |
| K67.1. Kafka = distributed event streaming platform; K67.1 Kafka = distributed event streaming platform | concept what-is-kafka (sayIt); `kafka-playbook` rule row 1 → `what-is-kafka` |  |
| K67.2 Topic = logical stream; K67.2 Topic = logical stream | concept topics (hook); comparison row "Is"; rule row "Topic" → `topics` | Merged with K67.3 into one row. |
| K67.3 Partition = ordered append-only log; K67.3 Partition = ordered append-only log | concept partitions (hook); rule row "Topic" → `partitions` |  |
| K67.4 Ordering = only within a partition; K67.4 Ordering = only within a partition | concept partitions (point "Order", trap); rule row "Topic" ("order only inside one") |  |
| K67.5 Key → partition → ordering for related events; K67.5 Key → partition → ordering for related events | concept partition-keys (hook); rule row "Same key, same partition" → `partition-keys` | Also K-FINAL arrow 1. |
| K67.6. Broker = Kafka server; K67.6 Broker = Kafka server | concept kafka-architecture (point); rule row "Broker" → `kafka-architecture` |  |
| K67.7 Replication = fault tolerance; K67.7 Replication = fault tolerance | concept `replication` (Why it exists, sayIt); rule row "Replication" → `replication` | Merged with the K65 durability rule. |
| K67.10 Consumer group = consumers sharing partitions; K67.10 Consumer group = consumers sharing partitions | concept consumer-groups (hook); rule row "A group gives each partition one consumer" → `consumer-groups` |  |
| K67.12 More partitions → more consumer parallelism; K67.12 More partitions → more consumer parallelism | concept consumer-groups (point, trap); rule row "More partitions, more parallelism" → `ordering-and-scaling` | Share groups are the exception (linked) |
| K67.13 Offset = position within a partition; K67.13 Offset = position within a partition | concept offsets (hook); rule row "Offset" → `offsets`; "Don't say" row "The offset is the message id" |  |
| K67.14 Kafka retains messages; consuming does not delete them; K67.14 Kafka retains messages; consuming does not delete them | concept log-storage (trap); rule row "Reading never deletes" → `replay`; "Don't say" row → `log-storage` |  |
| K67.15 At-least-once + idempotent processing is a common reliable design; K67.15 At-least-once + idempotent processing is a common reliable design | concept `delivery-semantics` (points: Usual design, sayIt); rule row "Usual design" → `delivery-semantics` |  |
| K-FINAL. Final mental picture (diagram + 8 arrows: key → order, partition → parallelism, replication → fault tolerance, offset → progress, group → work sharing, retention → replay, lag → consumer health, idempotency → duplicate safety) | `kafka-playbook` rule table (each arrow is a row: Keys, Scaling, Replication, Offset "committed = progress", Groups, Reading never deletes, Lag, Usual design) and `sayIt` | The picture was not redrawn (the end-to-end picture is owned by `what-is-kafka`); in the reference drawing the topic sits above the brokers, while partitions are stored on brokers: the "Walk me through" answer says it right. |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| K6 (part: "same key → same partition under normal behaviour, provided the mapping remains compatible") | Vague hedge | Exact rule: murmur2(key bytes) mod partition count, so it holds only while the partition count (and partitioner) stay the same; adding partitions remaps keys | https://github.com/apache/kafka/blob/4.3/clients/src/main/java/org/apache/kafka/clients/producer/internals/BuiltInPartitioner.java ; https://kafka.apache.org/43/operations/basic-kafka-operations/ |
| K7 (part: "unique sequential position") | Overstated: offsets can have gaps | Gaps from compaction and transaction markers; a missing offset returns the next higher one | https://kafka.apache.org/43/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html |
| K11. Consumers vs partitions ("max active consumers ≈ number of partitions") | Loose: it is an exact cap, not an approximation | Active consumers in a group ≤ partitions; extras sit idle (consumer-groups point, trap, Interview Q, tree) | https://kafka.apache.org/43/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html ; https://docs.spring.io/spring-kafka/reference/kafka/receiving-messages/message-listener-container.html |
| K15. Producer acks (acks=0 / 1 / all) with K66.Q29 acks=0 vs 1 vs all | acks=1 "can still cause loss depending on configuration" is a hedge; acks=all "waits for required in-sync replicas" mixes up acks with min.insync.replicas; no default or version given | acks=1: the record is lost if the leader fails before followers copy it. acks=all: waits for the full current ISR (min.insync.replicas only sets how small the ISR may be). acks=all (= -1) is the default since Kafka 3.0 (was 1); acks=0 gives no error feedback, retries do not apply, offset -1. Landed in concept `producer-acks` + comparison `acks-0-vs-1-vs-all` | https://kafka.apache.org/43/configuration/producer-configs/ ; https://kafka.apache.org/39/getting-started/upgrade/ |
| K17. Leader & followers ("Consumer → Leader") | Presented reading from the leader as the only path | Leader by default; since Kafka 2.4 (KIP-392) consumers can fetch from a same-rack follower with broker.rack, replica.selector.class and client.rack | https://cwiki.apache.org/confluence/display/KAFKA/Kafka+Improvement+Proposals ; https://cwiki.apache.org/confluence/display/KAFKA/KIP-392%3A+Allow+consumers+to+fetch+from+closest+replica |
| K18. ISR ("replicas sufficiently caught up") | Vague: no rule for leaving the ISR | Leader plus followers that keep an active controller session and are not behind the log end for replica.lag.time.max.ms (30 s, Kafka 4.3); rejoin only after a full catch-up | https://kafka.apache.org/43/design/design/ ; https://kafka.apache.org/43/configuration/broker-configs/ |
| K19. min.insync.replicas ("for certain acknowledged writes"; "at least 2 must be in sync for the write to succeed") | "Certain writes" unnamed; implied only 2 must ack | Checked only for acks=all; an acks=all write needs every current ISR member (all 3 if all are in sync), and fails with NotEnoughReplicas if the ISR is below the minimum; default 1 (Kafka 4.3) | https://kafka.apache.org/43/configuration/broker-configs/ |
| K20 (part: "Kafka ≠ traditional queue where consumption removes the message") | Outdated framing: since Kafka 4.2 share groups give queue-style consumption | Trap right line: records stay for every group, share groups too; retention alone removes them | https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka |
| K22. Offset commit ("read 0-3, commit offset 3/next position"; auto vs manual commit) | Vague and easy to get wrong: the committed offset is the next record to read, not the last one read | After processing 0-3, commit 4 (offset-commits point, trap, Example, Interview Q); auto vs manual moved to comparison auto-commit-vs-manual-commit | https://kafka.apache.org/43/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html |
| K24. Idempotency (TX123 check, $100 example, "at-least-once + idempotent processing") | The check ("already processed? yes → ignore, no → process") is shown as a separate step from the effect, which races and leaves a gap on a crash; example in dollars | Insert the eventId under a unique key in the same database transaction as the effect (INSERT ... ON CONFLICT DO NOTHING); dedupe on a business id, never the offset; running example ₹500 UPI payment. Concept `idempotent-consumers` (points, table, SQL, sayIt); comparison `idempotent-producer-vs-idempotent-consumer` | https://microservices.io/patterns/communication-style/idempotent-consumer.html ; https://www.postgresql.org/docs/current/sql-insert.html |
| K29. Scaling Kafka (more brokers + partitions + replication + consumer groups) | Lists replication as a way to scale. Replication adds copies for fault tolerance; it costs extra disk and network per copy and lowers per-partition producer throughput. | Scaling = partitions, brokers, consumer instances; replication sits in the Durability step and the Example multiplies writes and disk by RF 3. | https://kafka.apache.org/43/getting-started/introduction/ ; https://www.confluent.io/blog/how-choose-number-topics-partitions-kafka-cluster/ |
| K30. Partition Count and Scaling (increase partitions; ordering, distribution, overhead; "reducing is not a normal in-place operation") | Hedged: reducing is not merely unusual, it is not supported; "affects ordering" is vague | Kafka 4.3 does not support reducing the partition count; adding partitions remaps hash(key) mod N so keys move and per-key order can break, existing data is not moved. Concept `ordering-and-scaling` (point, trap, Example, Interview Q 3); tree `adding-partitions`, `reducing-partitions`, `too-many-partitions` | https://kafka.apache.org/43/operations/basic-kafka-operations/ |
| K32. Kafka vs traditional message queue | Incomplete and dated: treats "queue vs log" as a hard split and leaves out push vs pull and routing | Kafka 4.2+ share groups give queue-style reading; RabbitMQ streams give a replayable log; rows for pull vs push and exchange routing added | https://kafka.apache.org/43/getting-started/upgrade/ ; https://www.rabbitmq.com/docs/streams ; https://www.rabbitmq.com/docs/queues |
| K34 (part). Kafka vs Database: "Application → DB, and → Kafka → other services" | Shows the app writing the database and Kafka as two separate steps with no warning: the dual-write problem | Transactional outbox: business row and outbox row in one local transaction, a relay (polling or log tailing, e.g. Debezium) publishes, consumers dedupe. Concept `transactional-outbox`; tree `dual-write`, `outbox-table`, `polling-publisher`, `log-tailing-relay`, `debezium-outbox-router` (the rest of K34 belongs to the basics unit) | https://microservices.io/patterns/data/transactional-outbox.html ; https://debezium.io/blog/2019/02/19/reliable-microservices-data-exchange-with-the-outbox-pattern/ |
| K35. Kafka vs Redis | "Sessions" and "short-lived state" listed as Redis strengths with nothing to back them; no mention that Redis Pub/Sub can lose messages | Redis: in-memory store for caching and counters, optional RDB/AOF persistence; Pub/Sub is at-most-once; Redis Streams are an append-only log with consumer groups | https://redis.io/docs/latest/develop/data-types/strings/ ; https://redis.io/docs/latest/develop/pubsub/ ; https://redis.io/docs/latest/develop/data-types/streams/ |
| K38. Schema Registry (with "Kafka itself doesn't require a schema registry"; formats Avro, Protobuf, JSON Schema; contract, compatibility, versioning; OrderEvent v1 → v2) | Named a generic "Schema Registry" as if it were a Kafka feature; no default mode, no upgrade order, no word on who checks schemas | Confluent Schema Registry is a separate Confluent service under the Confluent Community License, running beside the brokers; Apache Kafka brokers never check schemas (broker-side ID checks only in licensed Confluent Server); default mode BACKWARD (Confluent Platform 8.x), upgrade consumers first; v1 → v2 shown as an Avro field with a default. Mapped to concept `schema-registry-and-serialization` (points, trap, Steps, example, defaults) | https://docs.confluent.io/platform/current/schema-registry/index.html ; https://docs.confluent.io/platform/current/schema-registry/fundamentals/index.html ; https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html |
| K43. Poison Message (malformed JSON, invalid data, unsupported schema; handle with Retry → Backoff → DLT) | Retrying malformed data is pointless: a permanent error should skip retries | Permanent errors (deserialisation, validation) go straight to the DLT; only transient errors are retried with backoff. Spring for Apache Kafka 4.1 treats DeserializationException and similar as not retryable by default. Concept `retries-and-dead-letter-topics` (points, Interview Q 2); tree `poison-message`, `permanent-error`; glossary `poison-message`, `permanent-error` | https://docs.spring.io/spring-kafka/reference/kafka/annotation-error-handling.html |
| K45 (part: "More partitions" as a hot-partition fix) | Wrong for one hot key: a key always maps to a single partition | "More partitions do not help: one key maps to one partition" | https://kafka.apache.org/43/configuration/producer-configs/ |
| K48. ZooKeeper vs KRaft | Unversioned "modern Kafka uses KRaft instead of requiring ZooKeeper": suggests ZooKeeper is still an option | KRaft production-ready in 3.3, ZooKeeper deprecated in 3.5, removed in 4.0; Kafka 4.x runs only in KRaft mode; ZooKeeper clusters migrate on bridge release 3.9 first | https://kafka.apache.org/43/getting-started/upgrade/ ; https://kafka.apache.org/35/operations/zookeeper/ ; https://kafka.apache.org/43/operations/kraft/ |
| K49 (part: enable.idempotence note) | "helps prevent duplicates ... within supported semantics" is vague: no default, no requirements, no limits | true by default since Kafka 3.0 (applied from 3.0.1 / 3.1.1 / 3.2.0); needs acks=all, retries > 0, max.in.flight ≤ 5; silently disabled by conflicting settings unless set explicitly (max.in.flight above 5 throws a ConfigException since Kafka 4.0) (then ConfigException); one producer session only; no protection against app re-sends or consumer duplicates. Landed in concept `idempotent-producer` | https://kafka.apache.org/43/configuration/producer-configs/ ; https://kafka.apache.org/43/javadoc/org/apache/kafka/clients/producer/KafkaProducer.html ; https://kafka.apache.org/39/getting-started/upgrade/ |
| K53. Log Segments ("retention/deletion largely at segment granularity") | Loose: delete retention always drops whole segments; compaction recopies segments | "Deletion drops the oldest segment file, never one record"; segment rolls at 1 GiB or 7 days | https://kafka.apache.org/43/implementation/log/ ; https://kafka.apache.org/43/configuration/topic-configs/ |
| K63. Performance Optimization (producer / Kafka / consumer levers; "idempotence where needed") | "Idempotence where needed" is outdated: since Kafka 3.0 the producer enables idempotence and acks=all by default (fully applied from 3.0.1 / 3.1.1 / 3.2.0); still true in 4.3. Also the list has no "why Kafka is fast". | Lever table without the idempotence item (idempotence is owned by `idempotent-producer`); added why-fast points (sequential appends, page cache, zero-copy, compressed batches) and the TLS limit. | https://kafka.apache.org/30/getting-started/upgrade/ ; https://kafka.apache.org/43/configuration/producer-configs/ ; https://kafka.apache.org/43/design/design/ |
| K67.8 Leader handles partition operations; followers replicate; K67.8 Leader handles partition operations; followers replicate | Same overstatement: reads are not leader-only; Overstated: writes always go to the leader, but consumers can fetch from a follower when the broker sets replica.selector.class and the client sets client.rack. | "Leader takes every write; serves reads by default" plus follower fetching; Rule row says "Replication: fault tolerance"; the leader/follower detail and follower fetching are left to `replication`. | https://kafka.apache.org/43/design/design/ ("reads can go to the leader or the followers") ; https://kafka.apache.org/43/configuration/broker-configs/ ; https://kafka.apache.org/43/configuration/consumer-configs/ |
| K67.9 ISR = replicas sufficiently in sync | Same vagueness | Same fix as K18 (glossary `isr`, tree `isr-shrink-and-rejoin`) | https://kafka.apache.org/43/design/design/ |
| K67.11 One partition → at most one consumer in a group at a time | True only for consumer groups: share groups (production-ready in Kafka 4.2) let several consumers share one partition and outnumber partitions. | Rule row says "In a consumer group…" ("A group gives each partition one consumer"); share groups are owned by `share-groups`. | https://kafka.apache.org/43/design/design/ ; https://kafka.apache.org/43/getting-started/upgrade/ |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| bootstrap.servers and client metadata (clients talk to the leader directly) | concept kafka-architecture (points, trap, Interview Q 3) | Common question: how a client finds the right broker |
| listeners vs advertised.listeners (the Docker / cloud cannot-connect problem) | concept kafka-architecture (Example, Defaults, Interview Q 2) | A very common real-world failure; asked in practical rounds |
| Internal topics (__consumer_offsets, __transaction_state, __share_group_state, __cluster_metadata) | tree under kafka-architecture | Named in the Kafka 4.3 docs; interviewers ask where offsets are stored |
| process.roles, combined mode, controller quorum sizing (2N + 1), active controller | concept kraft (points); tree | Needed to answer KRaft questions correctly for Kafka 4.x |
| ZooKeeper to KRaft migration via 3.9 bridge release | concept kraft (trap, Interview Q 3); tree | Upgrade path question for teams on 3.x |
| KRaft benefits (one system, fast controller failover, more partitions) | concept kraft (points, Why) | From KIP-500; the "why" interviewers expect |
| The seven use cases from the Kafka docs; event anatomy (key, value, timestamp, headers); five core APIs | tree under what-is-kafka; concept what-is-kafka (Example, Interview Q 3) | Gives "what is Kafka used for" a sourced answer |
| Need → pick table for the online shop | concept kafka-vs-alternatives (Example) | Turns four comparisons into one decision the reader can say aloud |
| No-key behaviour: sticky partitioning (2.4), uniform sticky after batch.size bytes (3.3, KIP-794); RoundRobinPartitioner; custom Partitioner; partitioner.ignore.keys | partition-keys (trap, table, bullet); tree; glossary | The common wrong answer "no key = round-robin" is outdated |
| Offset markers: log-start offset, committed offset, consumer position, high watermark, log-end offset | offsets (table); tree; glossary | Interviewers ask what lag and "committed" are measured against |
| Log compaction, tombstones, delete.retention.ms; comparison retention-vs-log-compaction | log-storage; comparison; tree; glossary | Commonly asked (GfG list) and missing from the reference |
| retention.bytes counts per partition | log-storage (point) | Common sizing mistake (topic config doc) |
| Tiered storage (KIP-405, production-ready in 3.9) | log-storage (bullet); tree; glossary | Current long-retention answer |
| Replay methods: seek, seekToBeginning, offsetsForTimes, --reset-offsets (group must be inactive; dry run by default), new group.id | replay (table, Example) | The reference says "move offsets back" but not how |
| Internal topics (__consumer_offsets, __transaction_state); topic-level --config overrides; kafka-topics.sh --describe | topics (Example); tree | Needed to explain the create command |
| Partition folder on disk (orders-0), a partition must fit on one broker | partitions (Interview Q 2, point) | Ops docs; common follow-up |
| send() is asynchronous; Future, callback, blocking get() | `producer-basics` (points, trap, Interview Q) | the most common producer API question |
| KafkaProducer is thread-safe; share one; close() sends buffered records | `producer-basics` | javadoc guidance, often asked |
| ProducerRecord parts: key, headers, timestamp (CreateTime / LogAppendTime), optional partition | `producer-basics` tree, glossary | interviewers name headers and timestamps |
| linger.ms default 5 ms since Kafka 4.0 (was 0) and why | `batching-and-compression` (trap, Defaults) | changed default in 4.0 |
| Broker keeps batches compressed; topic compression.type=producer | `batching-and-compression` | explains where compression happens |
| buffer.memory 32 MiB and max.block.ms blocking | tree `buffer-memory-config`, `producer-configs` | explains when send() blocks |
| PID + per-partition sequence numbers; ≤ 5 in-flight reason; ordering kept with retries | `idempotent-producer` | mechanism behind the K66.Q31 answer |
| retries default 2147483647; delivery.timeout.ms (2 min) bounds retrying; request.timeout.ms; client.id; bootstrap.servers | `producer-configs` | the reference lists retries without saying what bounds it |
| Spring Boot 4.1 spring.kafka.producer.* and properties[...] | `producer-configs` (point) | Spring is in scope; details linked to `spring-kafka` |
| subscribe() vs assign(), long poll, wakeup(), not thread-safe | consumer-basics (points, bullets, Interview Qs, tree) | Common follow-up questions on the poll loop |
| max.poll.interval.ms (5 min) | consumer-basics (point) | Most common cause of surprise rebalances |
| Group coordinator, FindCoordinator | consumer-groups (point, tree); glossary | Interviewers ask where group state lives |
| commitSync vs commitAsync, __consumer_offsets defaults | offset-commits (points, tree); glossary | Standard commit question |
| Auto commit can lose records with async hand-off | offset-commits (bullet, Interview Q) | Javadoc warns about it; common mistake |
| Eager vs cooperative rebalancing, assignors, default assignor list | rebalancing (Compare, Defaults, tree) | Standard rebalance question |
| Static membership (KIP-345) | rebalancing (point, Interview Q, tree) | Fix for rolling restarts |
| Consumer group protocol (KIP-848), group.protocol default classic in 4.3 | rebalancing (points, bullets, tree) | Current Kafka 4.x behaviour |
| ConsumerRebalanceListener commit on revoke | rebalancing (Example) | Limits duplicates on rebalance |
| kafka-consumer-groups.sh output, records-lag-max (position based), pause()/resume(), share group lag | consumer-lag (Example, bullets, tree) | How lag is really monitored |
| Lag beyond retention → auto.offset.reset applies | consumer-lag (point) | Real failure mode |
| Share groups (KIP-932): preview 4.1, production-ready 4.2, lock, ack types incl. RENEW, delivery count, __share_group_state, share.acknowledgement.mode | share-groups (all parts); comparison consumer-group-vs-share-group | New in Kafka 4.2; changes the "Kafka is not a queue" answer |
| auto.offset.reset=by_duration (since 4.0); fetch.min.bytes, fetch.max.wait.ms, isolation.level, group.protocol, client.rack rows; spring.kafka.consumer.* | consumer-configs (table, tree, Example) | Current config set |
| Preferred leader and automatic leader rebalancing | tree `preferred-leader-replica`; glossary `preferred-leader`; `fault-tolerance` Steps | Explains why leadership comes back after a restart |
| Follower fetching (KIP-392, Kafka 2.4) | `replication` point + Interview Q; tree `closest-replica-fetching` | Corrects K17; asked in cloud and multi-zone interviews |
| NotEnoughReplicas error and the RF/min.insync failure table | `isr-and-min-insync` (table, points) | Turns K19 into an answer an interviewer can probe |
| Eligible leader replicas (KIP-966; 4.0, default on new clusters from 4.1) | tree `elr-kip-966`; glossary `eligible-leader-replicas` | Current 4.x behaviour of leader election |
| Zombie fencing, transaction coordinator, __transaction_state, commit markers, read_committed, transaction.timeout.ms | `kafka-transactions`; tree; glossary | Standard follow-ups to "Kafka transactions?" |
| Kafka Streams exactly_once_v2 (default at_least_once) | `kafka-transactions` bullet + Defaults; tree `streams-exactly-once-v2` | Easiest way to get exactly-once; owned here per scope |
| Unclean leader election (false by default since 0.11) | `fault-tolerance` trap + Interview Q; tree; glossary | Classic durability-versus-availability question |
| Controlled shutdown, broker.session.timeout.ms (9 s) | `fault-tolerance` points, Interview Q | How failover and planned restarts really work |
| Rack awareness (broker.rack) | `fault-tolerance` point; tree; glossary | Asked with "how does Kafka survive a zone failure?" |
| MirrorMaker 2 (cross-cluster copies) | tree `mirrormaker2-geo-replication`; glossary `mirrormaker-2` | Disaster recovery question; replication is per cluster only |
| Dual-write problem and the transactional outbox (polling publisher, log tailing, Debezium outbox event router) | concept `transactional-outbox` | Common interview follow-up when a service writes a DB and publishes; master.json scope |
| Non-blocking retry topics lose per-key order | comparison `blocking-vs-non-blocking-retries`; trap in `retries-and-dead-letter-topics` | Spring docs say so explicitly; a frequent wrong answer |
| Transient vs permanent errors | points, tree, glossary | Decides retry or DLT |
| DLT headers and DLT ownership, alerting, re-drive | points, Example, Interview Q 3; tree `dlt-headers`, `dlt-redrive` | A DLT without an owner is a silent data loss |
| ErrorHandlingDeserializer, DefaultErrorHandler, DeadLetterPublishingRecoverer, @RetryableTopic (names only) | bullets in `retries-and-dead-letter-topics`, link to `spring-kafka` | Names interviewers expect from Spring users |
| Partition-count formula max(t/p, t/c) and cost of too many partitions | `ordering-and-scaling` | The reference gives no method |
| Thread-pool processing can reorder records | `ordering-and-scaling` Step 4; tree `multithreaded-processing-order` | KafkaConsumer javadoc warns about it |
| Upsert and version check as dedupe techniques | `idempotent-consumers` table; tree; glossary | Alternatives to a dedupe table |
| Idempotent producer vs idempotent consumer | comparison `idempotent-producer-vs-idempotent-consumer` | Very common confusion; master.json |
| Debezium change data capture (binlog / WAL, topic naming, connector JSON) | concept `kafka-connect` (point, example, Interview Q, defaults); tree `connect-debezium`; glossary `debezium`, `change-data-capture` | CDC is the most common real use of Connect and the usual outbox relay |
| Connect workers, tasks, standalone vs distributed mode, converters, SMTs, sink DLQ, REST port 8083 | concept `kafka-connect`; tree | How Connect actually runs; asked when Connect comes up |
| Connect runs as a separate service, not in the brokers | concept `kafka-connect` (trap) | Common wrong answer |
| Topology, stateless vs stateful operations, state stores (RocksDB), changelog topics, stream tasks = input partitions | concept `kafka-streams`; tree | Needed to explain how Streams scales and recovers |
| KStream vs KTable vs GlobalKTable | comparison `kstream-vs-ktable`; tree `streams-tables` | Classic Streams interview question |
| Window types (tumbling, hopping, sliding, session) | tree `streams-windows` | Asked as "what windows does Kafka Streams support" |
| processing.guarantee (at_least_once default, exactly_once_v2) | concept `kafka-streams` (point, defaults, Interview Q) | Exactly-once in Streams is commonly asked |
| Streams rebalance protocol (KIP-1071), production-ready in 4.2 | tree `streams-rebalance-protocol` | Current-version change |
| ksqlDB and Apache Flink as alternatives | tree `streams-alternatives`; glossary | Commonly compared with Kafka Streams |
| Compatibility modes, _TRANSITIVE, subjects and TopicNameStrategy, _schemas topic, Apicurio Registry | concept `schema-registry-and-serialization`; tree | Schema evolution is the main interview angle |
| Spring for Apache Kafka (KafkaTemplate, @KafkaListener, AckMode, DefaultErrorHandler, DeadLetterPublishingRecoverer, -dlt naming, @RetryableTopic, ErrorHandlingDeserializer, share consumers, Boot 4.1 versions) | concept `spring-kafka`; tree; glossary | Owner's stack is Spring Boot; how Kafka is used day to day |
| Why Kafka is fast: OS page cache, zero-copy sendfile (not with TLS), end-to-end batch compression, no forced fsync | `kafka-performance-tuning` (points, trap, Interview Qs 1–3); tree `perf-page-cache`, `perf-zero-copy`, `perf-flush-policy`, `perf-batch-compression` | A very common interview question ("why is Kafka so fast?", "what is zero-copy?"); the reference only lists levers. |
| Kafka security: TLS listeners, mutual TLS, SASL (GSSAPI, PLAIN, SCRAM, OAUTHBEARER), ACLs with StandardAuthorizer, quotas, security.protocol values, PLAINTEXT default, no encryption at rest | concept `kafka-security`; 7 tree nodes; 12 glossary terms | Asked in interviews and needed in production; the reference does not cover security. |
| Failure rows: all ISR lost (unclean election), controller majority lost, consumer too slow (max.poll.interval.ms), poison record | `kafka-failure-scenarios` table, Interview Q 2 | The reference's four scenarios miss the ones interviewers follow up with. |
| Worked capacity numbers (MB/s in, partitions from assumed p and c, RF write multiplier, 7-day disk), page-cache memory rule (write rate × 30 s), load-test tools | `kafka-design-formula` Example; tree `design-broker-memory`, `design-load-test` | Turns "enough partitions" into a calculation the candidate can say aloud, while flagging the rates as assumptions. |
| 5-step answer order (what, how, guarantee, trade-off, failure) and the "Don't say / Say" table | `kafka-playbook` points and How it works | The owner's request for easy aids; the traps gather the most common wrong answers, each linked to its owner. |

## Dropped
| Reference item | Reason (rare / advanced / duplicate / unverifiable) |
|---|---|
| (no whole item) | |

### Details placed elsewhere or cut, inside items listed above
| Reference item part | What happened |
|---|---|
| K6 (part: key decides the partition; hash(key) → partition; userId example) | also: concept partition-keys (table, hook, Example) |
| K7 (part: offset is per partition; P0 offset 5 and P1 offset 5 both exist) | also: concept offsets (hook, Interview Q 1) |
| K20 (parts: not deleted after consumption; retention.ms and retention.bytes; old segment data deleted) | also: concept log-storage (trap, points, Interview Q 1) |
| K20 / K32 nuance "Kafka ≠ a queue" (share-groups ref) | also: concept share-groups (trap, Interview Q "Can Kafka act as a queue?") |
| K34. Kafka vs Database (part: Kafka is not the transactional database) | also: comparison kafka-vs-database; concept kafka-vs-alternatives (trap, Interview Q) |
| K45 (parts: hot partition definition, better key distribution, composite/sharded keys lose per-key order) | also: concept partition-keys (point, bullet, Interview Q 2); tree hot-partition; glossary hot-partition |
| K45 (part: "Separate high-volume workloads" as a hot-partition fix) | cut: unverifiable: no primary source found stating it; logged in Open questions |
| K45 (part: "Application-level aggregation") | cut: unverifiable and vague |
| K49 (config list: acks, retries, batch.size, linger.ms, compression.type, key.serializer, value.serializer, enable.idempotence) | also: concept `producer-configs` (picker table with links) |
| K53 (part: "you don't need deep filesystem internals") | cut: editorial remark, not a fact |
| K67.9 ISR = replicas sufficiently in sync with leader | also: rule row "Replication … ISR" → `isr-and-min-insync` |
| K67.11 One partition → at most one consumer in a group | also: concept consumer-groups (point) |

## Owner addition (20-10-2026): Integration template: Kafka (reference/kafka.md from line 1812; key I3)

Independently verified on 20-10-2026.

### Mapped
| Reference item | Landed in | Note |
|---|---|---|
| I3.1 Think: Producer → Kafka topic → Consumer | already covered by `what-is-kafka` and the `spring-kafka` diagram | |
| I3.4 Remember: KafkaTemplate → send() → topic; @KafkaListener → topic → method() | already covered by `spring-kafka` hook | |
| I3.5 Interview explanation (producer publishes with KafkaTemplate, consumers listen with @KafkaListener) | `kafka-code-templates` sayIt and Interview Q "How do you integrate Kafka in a Spring Boot service?"; `spring-kafka` sayIt | Reworded, extended with the yml and the error handler |
| I3.6 "That's enough for a basic coding interview" | `kafka-code-templates` | Extended: the yml and error handling are the usual follow-ups |

### Corrected
| Reference item | What was wrong | Fixed to | Source URL |
|---|---|---|---|
| I3.2 Producer: OrderProducer with KafkaTemplate, `kafka.send("orders", order)` | No key, so events of one order can land on different partitions; the result of send() is ignored | `send("orders", orderId, json)` plus `whenComplete` to log failure or offset (point "Keyless send", link to partition-keys) | https://docs.spring.io/spring-kafka/reference/kafka/sending-messages.html |
| I3.3 Consumer: `@KafkaListener(topics = "orders")`, prints the order | No group id anywhere: the app fails to start; System.out in a listener | Group id in the yml (trap); listener logs and throws on a bad record so the error handler path shows | https://docs.spring.io/spring-kafka/reference/kafka/receiving-messages/listener-annotation.html (and a real run, see above) |

### Added beyond the reference
| New item | Landed in | Why |
|---|---|---|
| Minimal application.yml (bootstrap-servers, group-id, auto-offset-reset) | `kafka-code-templates` Example | Asked with every integration question; the brief lists it |
| DefaultErrorHandler + DeadLetterPublishingRecoverer bean; Boot attaches a CommonErrorHandler bean to the default factory | `kafka-code-templates` Example, point, Interview Q | Most common follow-up ("what if the listener throws?") |
| orders-dlt must have at least as many partitions as orders (same-partition default) | `kafka-code-templates` point | Real pitfall stated in the Spring docs |
| Console producer/consumer commands with real output | `kafka-code-templates` bash block + output; 2 glossary terms | Quick way to test a topic; brief asks for it |
| `--property` deprecated since Kafka 4.2 (KIP-1147): `--reader-property`, `--formatter-property`, `--command-property` | `kafka-code-templates` point and bash block | Current tool flags; old ones are removed in 5.0 |
| Picker table linking plain-client, manual-ack, transaction and rebalance code already on the site | `kafka-code-templates` How it works | One place to find every Kafka skeleton without repeating it |

### Dropped
| Reference item | Reason |
|---|---|
| (none) | |

## Template v3 rewrite (21-10-2026)

Every concept and comparison was rewritten in teaching template v3 (CLAUDE.md 3.1.1) and given a cheat-sheet card; each reference item mapped above still lands in the same concept id. An independent pass checked about 720 claims and fixed 4, removing none.

### Unit basics

**Added from the reference**

- K0 / K2 mental model (producer → topic → partition → broker → consumer) → what-is-kafka How it works steps; topics Mermaid.
- K1 terminology (event / record / message; producer; consumer) → what-is-kafka What it is and points; glossary `kafka-event` (new).
- K3 "producer does not need to call every service" → what-is-kafka Why, trap, scenario 1.
- K4.Q1 / K4.Q2 (many producers, many consumers) → topics point + Interview Q 1 + scenario 2.
- K5 "how to guarantee order" → partitions trap and Interview Q 2 (new Q).
- K6 "same key → same partition, provided the mapping stays compatible" → partition-keys scenario 1 (3 → 4 partitions moves order-101 from partition 1 to 2; computed with kafka-clients 4.3.1 murmur2).
- K7 "P0 offset 5 and P1 offset 5 both exist" → offsets point 1 and Interview Q 1.
- K20 retention flow (read → still exists → retention reached → segment deleted) → log-storage Mermaid + steps, trap.
- K21 replay uses (bug recovery, new consumers) → replay Why, scenario 2, Interview Qs.
- K32 key difference (retained vs removed) → kafka-vs-message-queue explain/example; what-is-kafka "Not to be confused with".
- K33-K35 (REST, database, Redis) → kafka-vs-alternatives decision steps and Example table; explain/example/sayIt in each comparison.
- K48 ZooKeeper vs KRaft → kraft What/Why/How steps; comparison explain/example.
- K52 broker configs (num.partitions, default.replication.factor, listeners, retention, segments) → topics Rules, kafka-architecture Rules, log-storage Rules.
- K53 log segments (deletion at segment granularity) → log-storage Interview Q 3 "Why segments?" (new).
- K54 storage model (sequential append) → log-storage point "Fast writes".
- K55 offset ≠ message id → offsets trap and scenario 2 (duplicate PaymentCompleted).
- K57 partition ≠ broker, K58 RF ≠ partition count → partitions "Not to be confused with"; topic-vs-partition-vs-broker example row (3 partitions × RF 3 = 9 replicas).

**Corrections**

- kafka-architecture Example "What to notice": the draft idea that a missing advertised.listeners line simply falls back to listeners was not used for a 0.0.0.0 listener (the docs say 0.0.0.0 cannot be advertised); explained the Docker problem through an internal hostname instead. Source: https://kafka.apache.org/43/configuration/broker-configs/
- log-storage: did not claim that the active segment is never deleted by retention (time retention can roll and delete it); only that compaction never touches the active segment. Deletion rule stated as "a segment goes when its newest event is older than retention.ms" per the Log implementation page. Source: https://kafka.apache.org/43/implementation/log/
- log-storage: added the minimum segment.bytes of 1 MiB (1048576), confirmed by the topic-config page and by Kafka 4.3.1 rejecting segment.bytes=1000. Source: https://kafka.apache.org/43/configuration/topic-configs/
- kraft: controller.quorum.voters is deprecated once kraft.version is 1 (dynamic quorum); every broker and controller sets controller.quorum.bootstrap.servers. Source: https://kafka.apache.org/43/operations/kraft/
- replay: kafka-consumer-groups.sh in 4.3.1 warns that Kafka 5.0 will require --dry-run or --execute; examples now pass --dry-run explicitly. Also the real error when the group is active ("Assignments can only be reset if the group 'analytics' is inactive, but the current state is Stable."). Source: tool output (4.3.1) + https://kafka.apache.org/43/operations/basic-kafka-operations/
- kafka-vs-alternatives: share groups stated as production-ready in Kafka 4.2. Source: https://kafka.apache.org/42/getting-started/upgrade/
- kafka-vs-redis comparison: removed an unsourced "well under a millisecond" latency claim written during this pass.

### Unit consumers

**Added from the reference**

- K8 pull-based (why pull) → consumer-basics (Why it exists, trap, Interview Q); long poll explained as a step.
- K9 consumer → consumer-basics (What it is, Steps, Example).
- K10/K11 consumer group and consumers vs partitions (4 partitions × 2 or 6 consumers) → consumer-groups (Mermaid, Steps, real CLI output with an idle third consumer, Interview Q).
- K12 multiple groups / fan-out → consumer-groups (Why, step 5, scenario).
- K13 consumer vs group, K56 topic vs group → consumer-groups "Not to be confused with" (rule line) and comparison consumer-vs-consumer-group.
- K22 offset commit (auto vs manual) → offset-commits (timeline Mermaid, Example, trap with "commit last + 1"); comparison auto-commit-vs-manual-commit.
- K28 consumer lag causes and fixes → consumer-lag (cause → fix table, five-step walk-through, real CLI output, Interview Qs). "CPU/memory/network" folded into slow processing; "scale infrastructure" left out as vague (as before).
- K31 rebalancing example (C3 joins) and problems → rebalancing (before/after Mermaid with N3 joining, Why: pause + repeats).
- K46 backpressure → consumer-lag (Why, point, Interview Q "How does Kafka handle backpressure?").
- K50 consumer configs, K51 group.id → consumer-configs (table, start-up walk-through, Example) and consumer-groups (Rules: group.id has no default, required for subscribe()).
- K64 "consumer dies → rebalance → another consumer gets partitions" → consumer-groups Interview Q "What happens when a consumer in a group dies?".
- New common mistake: a unique group.id per instance copies work (consumer-groups).
- New: onPartitionsLost() (rebalancing Example note; glossary).
- New: consumer protocol moves session timeout, heartbeat and assignor to the broker (group.consumer.session.timeout.ms 45 s, group.consumer.heartbeat.interval.ms 5 s); default becomes consumer in Kafka 5.0 (rebalancing Rules).
- New: default assignor list [RangeAssignor, CooperativeStickyAssignor] means the group starts eager; switch by listing only CooperativeStickyAssignor with a rolling restart (rebalancing Rules).
- New: share groups explicit mode throws IllegalStateException if a record is not acknowledged before the next poll; implicit is the default; delivery limit minimum 2; small clusters must lower share.coordinator.state.topic.replication.factor and min.isr (share-groups).
- New: max.poll.records sizing arithmetic (consumer-configs scenario).

**Corrections**

- Draft share-groups said "share.version feature controls it"; removed: the 4.3 upgrade notes only describe this for 4.1, and on a fresh 4.3.1 broker share.version was already 1. Source: https://kafka.apache.org/43/getting-started/upgrade/
- Draft rebalancing bullet "with the consumer protocol, heartbeat, session timeout and assignor are broker settings" kept and made precise with the broker config names and defaults. Source: https://kafka.apache.org/43/operations/consumer-rebalance-protocol/ ; https://kafka.apache.org/43/configuration/broker-configs/
- Draft commitAsync point said errors "are dropped"; reworded to "a failure is reported only to the callback you pass" (the javadoc excerpt read today did not confirm retry behaviour, so no retry claim is made).
- Draft share-groups RENEW "since 4.2" no longer states a version (the 4.3 upgrade page does not mention it; the tree note still says 4.2, verified on 20-10-2026).

### Unit ecosystem

**Added from the reference**

- K36 Kafka Connect (source vs sink, DB → Connect → Kafka → Connect → search/DB) → kafka-connect: What it is, Mermaid, points; new "why not poll with SELECT" Interview Q (Debezium blog).
- K37 Kafka Streams (filter / transform / aggregate / join / window / stateful) → kafka-streams: What it is, How it works steps (stateless vs stateful), Rules (windows), Example re-keyed by method (repartition explained).
- K38 Schema Registry (contract, compatibility, versioning, OrderEvent v1 → v2) → schema-registry-and-serialization: Why it exists (runtime break without a contract), sequence diagram, v1 → v2 as PaymentCompleted upiRef, BACKWARD / FORWARD / FULL upgrade order in Rules, "Why Avro or Protobuf instead of JSON" Interview Q.
- K39 (serializer / deserializer flow) → schema-registry What it is (serializer / deserializer defined, linked to producer-basics).
- K60 design formula (15 questions) → kafka-design-formula Mermaid + 6 grouped steps, each linked to its owner concept.
- K61 scale example + key rule → kafka-design-formula Example (worked numbers) + points Partitions / Brokers / Consumer instances + scenario 1.
- K62 reliability design → kafka-design-formula point "Durable default", scenario 2, Interview Q 3.
- K63 performance optimisation (producer / Kafka / consumer levers) → kafka-performance-tuning lever table + step 5 (measure, change one lever).
- K64 failure scenarios (broker, consumer, producer request, processing) → kafka-failure-scenarios table, 4-step answer method, crash timeline Example, scenarios.
- K65 guarantees, K67 15 things, K-FINAL mental picture → kafka-playbook: Mermaid end-to-end picture of the payments example, rule table (Rules and defaults), Interview Qs.
- K66 question list → kafka-playbook five-step answer order with a worked Example ("How does Kafka keep payment events in order?") and scenario 1 (consumer group in five steps).
- I3 integration template (OrderProducer / OrderConsumer) → kafka-code-templates, re-based on the running example: PaymentEventProducer (key orderId, whenComplete), NotificationConsumer, DefaultErrorHandler bean, yml, console tools.
- Owner-requested "Don't say / Say" table → kafka-playbook Common mistakes (7 bullets, each linked to its owner concept).

**Corrections**

- spring-kafka draft said the DLT suffix is "-dlt (.DLT before 3.3)". The Spring for Apache Kafka 4.1 docs document only `<topic>-dlt`, same partition; the historical ".DLT before 3.3" note could not be confirmed and was removed. Source: https://docs.spring.io/spring-kafka/reference/kafka/annotation-error-handling.html
- kafka-connect draft Debezium config had no plugin.name. Debezium 3.7's default plugin.name is decoderbufs, which must be installed separately; the example now sets pgoutput (built into PostgreSQL) and notes wal_level=logical, snapshot.mode=initial, and a FileConfigProvider for the password. Sources: Debezium PostgreSQL connector docs; Kafka 4.3 Configuration Providers.
- kafka-code-templates and the Streams example re-based on the running example (topic payments, group notification, payments-dlt; output topic payment-counts-by-method). Console commands re-run on apache/kafka:4.3.1.
- kafka-design-formula no longer restates "adding partitions moves keys"; it links to ordering-and-scaling, which owns that fact.
- kafka-failure-scenarios "Consumer too slow" row now links to consumer-configs (owner of max.poll.interval.ms) instead of consumer-basics.
- kafka-performance-tuning: memory rule phrased from the Kafka 4.3 design doc (page cache over in-heap cache: object overhead, GC); zero-copy not used with SSL re-checked.
- kafka-playbook visual changed from table to flow (it now leads with a Mermaid picture).

### Unit patterns

### Unit playbook

**Added from the reference**

- K36 Kafka Connect (source vs sink, DB → Connect → Kafka → Connect → search/DB) → kafka-connect: What it is, Mermaid, points; new "why not poll with SELECT" Interview Q (Debezium blog).
- K37 Kafka Streams (filter / transform / aggregate / join / window / stateful) → kafka-streams: What it is, How it works steps (stateless vs stateful), Rules (windows), Example re-keyed by method (repartition explained).
- K38 Schema Registry (contract, compatibility, versioning, OrderEvent v1 → v2) → schema-registry-and-serialization: Why it exists (runtime break without a contract), sequence diagram, v1 → v2 as PaymentCompleted upiRef, BACKWARD / FORWARD / FULL upgrade order in Rules, "Why Avro or Protobuf instead of JSON" Interview Q.
- K39 (serializer / deserializer flow) → schema-registry What it is (serializer / deserializer defined, linked to producer-basics).
- K60 design formula (15 questions) → kafka-design-formula Mermaid + 6 grouped steps, each linked to its owner concept.
- K61 scale example + key rule → kafka-design-formula Example (worked numbers) + points Partitions / Brokers / Consumer instances + scenario 1.
- K62 reliability design → kafka-design-formula point "Durable default", scenario 2, Interview Q 3.
- K63 performance optimisation (producer / Kafka / consumer levers) → kafka-performance-tuning lever table + step 5 (measure, change one lever).
- K64 failure scenarios (broker, consumer, producer request, processing) → kafka-failure-scenarios table, 4-step answer method, crash timeline Example, scenarios.
- K65 guarantees, K67 15 things, K-FINAL mental picture → kafka-playbook: Mermaid end-to-end picture of the payments example, rule table (Rules and defaults), Interview Qs.
- K66 question list → kafka-playbook five-step answer order with a worked Example ("How does Kafka keep payment events in order?") and scenario 1 (consumer group in five steps).
- I3 integration template (OrderProducer / OrderConsumer) → kafka-code-templates, re-based on the running example: PaymentEventProducer (key orderId, whenComplete), NotificationConsumer, DefaultErrorHandler bean, yml, console tools.
- Owner-requested "Don't say / Say" table → kafka-playbook Common mistakes (7 bullets, each linked to its owner concept).

**Corrections**

- spring-kafka draft said the DLT suffix is "-dlt (.DLT before 3.3)". The Spring for Apache Kafka 4.1 docs document only `<topic>-dlt`, same partition; the historical ".DLT before 3.3" note could not be confirmed and was removed. Source: https://docs.spring.io/spring-kafka/reference/kafka/annotation-error-handling.html
- kafka-connect draft Debezium config had no plugin.name. Debezium 3.7's default plugin.name is decoderbufs, which must be installed separately; the example now sets pgoutput (built into PostgreSQL) and notes wal_level=logical, snapshot.mode=initial, and a FileConfigProvider for the password. Sources: Debezium PostgreSQL connector docs; Kafka 4.3 Configuration Providers.
- kafka-code-templates and the Streams example re-based on the running example (topic payments, group notification, payments-dlt; output topic payment-counts-by-method). Console commands re-run on apache/kafka:4.3.1.
- kafka-design-formula no longer restates "adding partitions moves keys"; it links to ordering-and-scaling, which owns that fact.
- kafka-failure-scenarios "Consumer too slow" row now links to consumer-configs (owner of max.poll.interval.ms) instead of consumer-basics.
- kafka-performance-tuning: memory rule phrased from the Kafka 4.3 design doc (page cache over in-heap cache: object overhead, GC); zero-copy not used with SSL re-checked.
- kafka-playbook visual changed from table to flow (it now leads with a Mermaid picture).

### Unit producers

**Added from the reference**

- K14 Producer (producer takes part in choosing the partition) → producer-basics, How it works step 3 (links partition-keys).
- K15 acks + "interview answer" (acks=all with replication and min.insync.replicas) → producer-acks: new "Not to be confused with" (acks vs min.insync.replicas), sayIt, Interview Q.
- K26/K27 batching benefits and the CPU vs network/storage trade-off → batching-and-compression Why it exists, points "The cost", Interview Q.
- K39 (serializer flow, producer half) → producer-basics How it works step 2.
- K49 producer config list → producer-configs (table; acks/batching/idempotence linked, not repeated).
- K64 "Producer request fails → retry; idempotence avoids duplicate writes" → idempotent-producer Why it exists + scenario 1.
- New teaching angles (verified): send() returns before the callback (shown by real output); callbacks run on the I/O thread; acks=0 record is still written but unconfirmed (offset -1, real output); explicit enable.idempotence turns conflicts into a ConfigException while an implicit one is silently disabled (real run); max.in.flight > 5 throws even with default idempotence (real run, ProducerConfig source); max.block.ms vs delivery.timeout.ms as two clocks; delivery.timeout.ms < linger.ms + request.timeout.ms fails construction (real run); Spring Boot 4.1 has no linger property, so linger.ms goes in spring.kafka.producer.properties[...]; Spring Boot defaults the serializers to StringSerializer and bootstrap-servers to localhost:9092.

**Corrections**

- Draft producer-basics example output and code: rerun on apache/kafka 4.3.1 with a 3-partition topic; output now shows "send() returned" before the callback line (partition 2, offset 0).
- Draft idempotent-producer said "acks 0 or 1, or retries=0, quietly turn it off". Refined: only when enable.idempotence is not set explicitly; explicit true → ConfigException (ProducerConfig.java 4.3, verified by run).
- producer-configs trap.why: retries default was 0 up to Kafka 2.0 and became Integer.MAX_VALUE in 2.1 with delivery.timeout.ms (KIP-91). Sources: kafka 2.0 ProducerConfig.java; kafka 2.1 docs/upgrade.html.
- A cluster outage at send time: the observed failure is via the callback/Future after max.block.ms ("Topic payments not present in metadata after 60000 ms"), not a thrown exception; wording says "fails the send with a TimeoutException".

### Unit reliability

**Added from the reference**

- K16/K17 Replication, leader and followers → `replication` (What it is, How it works, Interview Qs); K58 RF is not partition count → `replication` trap and Example notes.
- K18 ISR, K19 min.insync.replicas, "common interview configuration" → `isr-and-min-insync` (table, points, trap, real NotEnoughReplicas run).
- K23/K25 the three semantics, K24 "at-least-once + idempotent processing" → `delivery-semantics` (points, commit-order Example, Interview Q 2).
- K62 reliability design → `delivery-semantics` Interview Q 3 (links each owner).
- K40 Kafka transaction (read, process, write, commit, abort) → `kafka-transactions` (How it works steps, Example).
- K47 fault tolerance (B1 fails, B2 leads) → `fault-tolerance` (Mermaid timeline, real crash run).
- K41 DLT, K42 retry pattern ("avoid infinite immediate retries"), K43 poison message → `retries-and-dead-letter-topics` (points, Common mistakes, scenario 1, Interview Qs).
- K44 ordering + scaling trade-off, K30 partition count → `ordering-and-scaling` (scenario 1, Example).
- K24 idempotency (TX123, $100) → `idempotent-consumers` with the ₹500 running example; the "check, then process" flow made atomic.
- K34 (part) dual write → `transactional-outbox` (rewritten on the running example: Payment service + PaymentCompleted keyed by orderId).

**Corrections**

- `replication` / `fault-tolerance`: the draft describe outputs were not from a run. Replaced with real output from a three-broker KRaft cluster (apache/kafka:4.3.1). Source: https://kafka.apache.org/43/operations/basic-kafka-operations/
- `transactional-outbox`: the draft showed Debezium publishing to an "orders topic". Debezium 3.7's outbox router routes by `aggregatetype` to `outbox.event.<aggregatetype>` by default (renamable). Source: https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html
- `transactional-outbox`: polling publisher / log tailing trade-offs restated to match the source exactly (polling: any SQL DB, ordering tricky; log tailing: accurate, database-specific). Source: https://microservices.io/patterns/data/polling-publisher.html , https://microservices.io/patterns/data/transaction-log-tailing.html
- `idempotent-consumers`: the draft SQL relied on the app reading "0 rows" and rolling back; replaced with one atomic statement (data-modifying CTE) whose ledger insert depends on the dedupe insert. Source: https://www.postgresql.org/docs/current/queries-with.html
- `retries-and-dead-letter-topics`: added the real default of Spring for Apache Kafka 4.1 (`FixedBackOff(0, 9)`: 10 attempts, no delay, then the record is only logged), the not-retryable exception list, DLT naming (`<topic>-dlt`, same partition, so DLT needs as many partitions) and that Boot wires a `DefaultErrorHandler` @Bean into the auto-configured factory. Source: https://docs.spring.io/spring-kafka/reference/kafka/annotation-error-handling.html
- `kafka-transactions`: added "transactional.id implies idempotence", "transactions need 3 brokers by default", `transaction.max.timeout.ms` 15 min, the last stable offset, and the need to seek back after abort. Sources: Kafka 4.3 producer/consumer/broker configs, KafkaProducer javadoc.
- `isr-and-min-insync`: added that consumers see a record only once it is on all ISR members and the ISR is at least min.insync.replicas (design doc), and ELR (Kafka 4.0; default for new clusters from 4.1). Sources: https://kafka.apache.org/43/design/design/ , https://kafka.apache.org/43/operations/eligible-leader-replicas/
- `fault-tolerance`: added broker heartbeat interval (2 s) and fencing after broker.session.timeout.ms (9 s), auto.leader.rebalance.enable (true). Source: Kafka 4.3 broker configs.

### Unit storage
