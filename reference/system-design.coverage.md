# Coverage: System Design
Reference: reference/system-design.md  ·  Last updated: 27-10-2026

Note: the reference is two concatenated documents (a numbered cheat sheet, sections 1–20, and an interview-flow doc, sections 2–38). Section numbers below are as the per-unit notes give them. The reference is input only (CLAUDE.md 3.8); every fact was checked against the primary source cited in each card, and no reference wording, numbering or formatting was copied.

## Mapped
| Reference item (number + short title) | Landed in | Note |
|---|---|---|
| 1.2 Non-functional requirements (scalability, availability, performance) | `scalability`, `availability` (What it is) | |
| 2.1 Basic metrics (latency, throughput, RPS/QPS, concurrency, bandwidth, utilization) | `latency-and-throughput` (points, table) | |
| 2.2 Average vs peak traffic ("design for peak") | `capacity-estimation` (peak factor, scenario 2) | |
| 2.3 Latency percentiles (p50/p95/p99, tail latency) | `latency-and-throughput` (points, trap, Example) | |
| 2.4 Capacity estimation (daily requests, avg/peak RPS, storage, bandwidth) | `capacity-estimation` (Steps, Example) | |
| 2.5 Little's Law (L = λW) | `latency-and-throughput` (points, scenario 2) | |
| 3.1 Basic architecture (client/server/API/endpoint, stateless) | `api-styles` (What it is) | Stateless owned by foundations/load-balancer |
| 3.2 HTTP methods + safe/idempotent | `idempotency`, `api-styles` (REST methods) | GET/PUT/DELETE idempotent, POST not — RFC 9110 |
| 3.2 REST / RPC / gRPC / GraphQL | `api-styles`; comparison `rest-vs-grpc-vs-graphql` | |
| 3.2 WebSocket, SSE (terms) | `realtime-communication`; glossary `sse`, `websockets` | |
| 3.3 HTTP status 409/422/404; 429; 502/503/504 | `idempotency` (409/422/404); `rate-limiting` (429 + Retry-After); glossary `http-429` | Only codes that teach something used |
| 4.1 Vertical vs horizontal scaling ("horizontal not automatically better") | `scalability`; comparison `vertical-vs-horizontal-scaling` | Elasticity/scale-down as one-line Rules |
| 4.2 Load balancer / reverse proxy / failover | `load-balancer`; `reverse-proxy`; comparison `lb-vs-proxy-vs-gateway` | Definitions owned by traffic/reliability |
| 5.1–5.8 Databases (SQL vs NoSQL, normalisation, ACID, concurrency/locking, indexing, search; plus ~15 search terms) | `sql-vs-nosql`, `denormalisation`, `acid-transactions`, `concurrency-control`, `indexing`, `search-index`; comparisons `btree-vs-lsm`, `isolation-levels`, `normalisation-vs-denormalisation`, `optimistic-vs-pessimistic-locking`, `relational-vs-nosql` | Richer drafts already cover these |
| 5.6 Replication (primary/replica, sync/async, lag, failover) | `sharding-and-replication`; comparison `sharding-vs-replication` | |
| 5.7 Sharding (shard key, partitioning, hot shard, resharding; range/hash/directory) | `sharding-and-replication`; comparison `sharding-vs-replication` | |
| 6.1 Caching basics (hit/miss, hit rate, TTL, eviction, invalidation) | `caching-layers`, `eviction`, `cache-invalidation` | |
| 6.2 Cache architectures (browser, CDN, in-process, distributed, DB buffer) | `caching-layers` (How it works, points, defaults) | |
| 6.3 Cache-aside pattern + example | `cache-aside` (full concept) | |
| 6.4 Write strategies (write-through, write-behind/back, write-around, refresh-ahead) | `caching-strategies` (table); `write-through` | |
| 6.5 Eviction policies (LRU, LFU, FIFO, TTL) | `eviction` (table, defaults, Qs) | |
| 6.6 Cache problems (stampede, herd, hot key, penetration, stale, avalanche) + protections | `cache-invalidation` (How it works + Qs) | Penetration + avalanche added, see below |
| 7.1 Networking terms (DNS, IP, TCP, UDP, TLS, HTTPS, HTTP/1.1/2/3=QUIC) | `transport-protocols`; `dns` | |
| 7.2 CDN (edge, origin, static vs dynamic; "not every response cached") | `cdn` | |
| 8.1 Sync vs async, producer/consumer/broker, backpressure, queue depth, consumer lag | `message-queue`; glossary `queue-depth`, `consumer-lag` | |
| 8.2 Sync vs async flow; 202 Accepted ("accepted != done") | `message-queue` (Example, Common mistake) | |
| 8.3 Delivery guarantees (at-most/least/exactly-once; idempotent processing) | `delivery-guarantees`; `delivery-semantics` comparison | |
| 8.4 ACK/NACK, retry, backoff, jitter, DLQ, poison message, visibility timeout | `message-queue` (ack, DLQ, visibility timeout) | Backoff/jitter owned by reliability (`timeouts-retries`) |
| 8.5 Kafka/RabbitMQ/SQS/Pub-Sub; queue vs stream | `queue-vs-pubsub-vs-stream` comparison; `event-streaming` | |
| 8.6 Kafka terms (topic, partition, offset, consumer group, replication factor, ordering, partition key) | `event-streaming`; glossary `offset`, etc. | |
| 9.1 Architecture styles (monolith, modular monolith, microservices, boundary) + monolith vs microservices table | `microservices`; comparison `monolith-vs-microservices` | |
| 9.2 Communication (sync/async, service discovery, API gateway, service mesh, contract) | `service-discovery`; `api-gateway` (traffic-b) | Service mesh kept glossary-level |
| 9.3 Patterns (service registry, health endpoint; rate limiter) | `service-discovery`; `rate-limiting` | Circuit breaker/timeout/retry owned by reliability |
| 9.4 Saga + compensating transaction | `microservices` links to saga; `distributed-transactions` (trap, Qs); `idempotency` | |
| 9.5 Transactional outbox | `delivery-guarantees` (Common mistake + Interview Q); `idempotency` | |
| 10.1 CAP (C/A/P, "not pick any two") | `cap-theorem` (table, trap, Common mistakes) | |
| 10.2 Consistency (strong, eventual, read-your-writes, monotonic, causal, stale) | `consistency-models`; comparison `strong-vs-eventual-consistency` | |
| 10.3 Distributed transactions (2PC coordinator/participant/prepare/commit) | `distributed-transactions`; comparison `two-phase-commit-vs-saga` | |
| 10.4 Idempotency + idempotency key + dedup + Payment API example | `idempotency` (whole concept) | |
| 11.1 Availability and uptime; SLA/SLO/SLI/error budget | `availability`; comparison `sla-vs-slo-vs-sli` | |
| 11.2 Redundancy and failover (active-active/passive, DR, RTO, RPO) | `redundancy-failover`, `disaster-recovery`, both comparisons | |
| 11.3 Graceful failure (fail fast, fallback, degraded, load shedding, health/readiness/liveness) | `load-shedding`, `circuit-breaker` | |
| 13.1 Why rate limit (quota, burst, throttling) | `rate-limiting` (Why it exists); glossary `throttling` | |
| 13.2 Rate-limit algorithms (fixed/sliding window, token/leaky bucket) + global coordination | comparison `rate-limit-algorithms`; `rate-limiting` (Example, Redis scenario) | |
| 14.1 Storage types (block/file/object, metadata, pre-signed URL) | `object-storage` | |
| 14.2 Large file upload design | `object-storage` (How it works, scenarios, Qs) | |
| 14.3 Multipart upload (resume, checksum, lifecycle) | `object-storage` (points, Rules) | |
| 15 Rate-limiting flow; limit by user/IP/API key/tenant | `rate-limiting` (How it works) | |
| 15.2 / 27 Observability (logs, metrics, tracing, span, correlation ID, alert) | `observability` | |
| 16 Retries (exp backoff + jitter + limit; idempotency) | `timeouts-retries` | |
| 17 Timeouts (every call needs a timeout) | `timeouts-retries` | |
| 18 Circuit breaker (CLOSED→OPEN→HALF-OPEN) | `circuit-breaker` | |
| 18.1 CQRS, event sourcing, materialized view, fan-out/fan-in | `event-sourcing-cqrs`; `cache`/pub-sub (fan-out) | |
| 18.2 CQRS vs event sourcing (neither requires the other) | `event-sourcing-cqrs` (trap, Not-to-be-confused, Q) | |
| 18.3 Eventual consistency in read models | `event-sourcing-cqrs` (scenario, Rules) | |
| 19.1 Why a load balancer if we have many servers | `load-balancer` (Why it exists) | |
| 19.2 Why cache if the DB already stores the data | `caching-strategies` / `cache-aside` (Why it exists) | |
| 19.3 Why a queue if APIs can call directly | `message-queue` (Why it exists, Q) | |
| 19.4 Why microservices if a monolith works | `microservices` (Interview Q, trap) | |
| 19.5 Why replication if we already have sharding | `sharding-and-replication` (Common mistakes); comparison verdict | |
| 19.7 Why an API gateway if we have a load balancer | `api-gateway`; comparison `lb-vs-proxy-vs-gateway` | |
| 19.8 Why Kafka if we already have a queue | `event-streaming` (Why it exists, Q) | |
| 19.9 Failed response != operation failed; Why a CDN if we have a cache | `idempotency` (Why it exists, scenario 1); `cdn` (Not-to-be-confused) | |
| 19.11 Why retries cause problems (payment may succeed on timeout) | `delivery-guarantees` (scenario); `timeouts-retries` (trap); `circuit-breaker` (scenario) | |
| 19.15 Why not make everything async | `message-queue` (Interview Q, cost side) | |
| 32 API design checklist (idempotency, pagination, versioning) | `idempotency`; pagination/versioning noted glossary-level | |
| 2302–2303 Consistency trade-off table (strong vs eventual) | `consistency-models` (sayIt / points) | |
| Cheat-sheet 7 CACHE (Redis/Memcached, flow, TTL, invalidation, problems) | `caching-layers`, `cache-aside`, `cache-invalidation` | |
| Cheat-sheet 11–12 Message queue; sync vs async flows | `message-queue` (hook, Why, points, Example) | |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| 11.1 Monthly downtime figures | Uptime table uses a 30-day month and rounds (99.99% = "4 min 19 s") | Kept the fuller, more precise SRE table (99.99% = 4.32 min on a 30-day month, plus a yearly column) | Google SRE Book Availability Table (Appendix A) |
| 14.1/14.3 S3 max object size | — (re-verification, not a reference error) | Confirmed 48.8 TiB (10,000 parts × 5 GiB), not the sometimes-quoted 5 TiB single-PUT cap | AWS S3 multipart upload limits, verified 27-10-2026 |

Other units (apis, caching, databases-a, distributed-systems, messaging, reliability, traffic-a, traffic-b) reported no corrections: the reference's facts agreed with the primary sources (RFC 9110, Stripe, Fowler/microservices.io, Gilbert & Lynch, DDIA, Garcia-Molina & Salem, Kafka 4.3, nginx, AWS, MDN) on re-check.

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| Quorum | `quorum` concept | Not covered by the reference at all; standard distributed-systems interview topic; kept from the researched draft |
| Consensus | `consensus` concept | Not covered by the reference; standard interview topic |
| Unique IDs (Snowflake/UUID) | `unique-ids` concept | Not covered by the reference; design-prompt label only in the reference |
| Geospatial index | `geospatial-index` concept | Not covered by the reference; "Geospatial search" is only a design-prompt label there |
| Bloom filter | `bloom-filter` concept | Not covered by the reference; data-structure mention only |
| Consistent hashing | `consistent-hashing` concept | Not covered by the reference; needed for sharding/caching |
| Cache penetration + negative caching | `cache-invalidation` (Common mistakes, Rules, glossary) | Reference 6.6 names penetration; protection detail added | 
| Cache avalanche + TTL jitter | `cache-invalidation` (Rules, scenario) | Reference 6.6 names avalanche; jitter protection added |
| Glossary: cache-penetration, negative-caching, cache-avalanche | caching.glossary.yaml | Terms used in prose |
| Glossary: offset, snapshot, queue-depth, retention | messaging.glossary.yaml | Kafka/queue terms used in prose |
| Readiness vs liveness probe behaviour (readiness sheds, liveness restarts) | `load-shedding` (Rules) | Reference 11.3 lists the terms but not the shedding link |
| Bulkhead pattern (isolate per-dependency pools) | glossary; `circuit-breaker` (Not-to-be-confused) | Separates it from retry/breaker |
| Goodput, saturation, failure-domain | glossary | Terms used in prose, needed definitions |
| "Design for peak, not average" peak-factor rule | `capacity-estimation` (scenario) | Reference 2.2 line made explicit |
| Little's Law pool-sizing use | `latency-and-throughput` (scenario 2) | Reference 2.5 made concrete |
| REST vs RPC "Not to be confused with" | `api-styles` | Reference 3.2 lists both; resource-vs-method distinction |
| Discovery vs load balancing distinction | `service-discovery` | Reference 9.2 lists both |
| Transactional outbox (atomicity; relay may double-publish; idempotent consumers) | `delivery-guarantees` | microservices.io "Transactional outbox", verified 27-10-2026 |
| CDN "does not cache every response automatically" | `cdn` (Common mistakes, no-store scenario) | Reference 7.2 line made explicit |
| Stateless/sticky-session mistake | `load-balancer` (Common mistakes) | Implied by reference stateless theme |

Databases teaching emphases drawn from the reference (already covered by the drafts, stressed in v3): "do not choose NoSQL merely because it must scale" (5.1) → `sql-vs-nosql` trap; "an index is not guaranteed to be used; the planner decides" (5.4) → `indexing` Rules; optimistic-locking version-field conflict (5.8) → `concurrency-control` example.

## Dropped
| Reference item | Reason (rare / advanced / duplicate / unverifiable) |
|---|---|
| SOA (9.1) | Low interview value next to monolith/microservices; would dilute the concept |
| Service mesh deep detail (9.2) | Kept as a term; a full concept would inflate the count and overlap reliability |
| Bulkhead as a full concept (9.3) | Kept as glossary + Not-to-be-confused; owned by reliability |
| Pagination / cursor vs OFFSET (32, 33) | API-design breadth; glossary-level, not a concept |
| 3.3 full HTTP status-code list | Reference material; only teaching codes used |
| 6.6 FIFO eviction detail beyond mention | Low value; one-liner in the `eviction` table only |
| "Why not use Redis instead of a database?" (after 6.6) | Belongs to databases / SQL-vs-NoSQL; not a caching concept |
| 6.2 DB buffer cache deep detail | One defaults row (Postgres shared_buffers); belongs to indexing |
| Vertical partitioning (split columns) (5.7) | Rare at this level; glossary-level aside only |
| Directory-based sharding strategy (5.7) | Advanced; range vs hash covers the interview need |
| Sync vs async replication full taxonomy (5.6) | Condensed to a Rules line |
| 10.3 Distributed lock, lease, fencing token | Coordination primitives, not transaction consistency; glossary terms |
| 10.4 Idempotency/key/dedup (in distributed-systems) | Owned by `idempotency` in the apis unit; linked, not duplicated |
| 1.3 HLD vs LLD, 1.4 interview types | Process/meta, not a concept |
| 4.1 Elasticity, scale down/in (terms) | One-line Rules under scalability; inverses, not separate concepts |
| 11.x Rate limiting as a graceful-failure bullet | Owned by `rate-limiting`; linked, not repeated |
| 12.x Security, 16.x containers/K8s, 19/20 scalability & perf checklists | Out of reliability scope; owned elsewhere |
| 8.4 Exponential backoff, jitter as full topics | Owned by reliability (`timeouts-retries`); mentioned once |
| 8.1 / 18.1 Materialized view as its own concept | One-line idea; covered by projection/read model in `event-sourcing-cqrs` |
| Pulsar (cheat-sheet 11) | Named as an alternative only; Kafka is the taught example |
| Strangler / Sidecar / Anti-corruption / API composition (18.1) | Not messaging concepts; belong to microservices/apis |
| gRPC, GraphQL, RPC terms (3.2, in traffic-b) | Owned by the apis unit |
| Load-balancing algorithms, health checks (4.2, in traffic-b) | Owned by traffic-a `load-balancer` |
| Service mesh, circuit breaker, bulkhead (9.3, in traffic-b) | Owned by apis / reliability units |
| 7.3 Serialization/deserialization, RTT, network vs processing latency | Belongs to `latency-and-throughput`; linked, not repeated |
| TLS/HTTPS as standalone detail (7.x) | Mentioned (handshake round trips); no dedicated security concept in scope |

## Open questions

- None open. The one earlier flag (TTL jitter against cache avalanche) was resolved in verification: the AWS "Database Caching Strategies Using Redis" whitepaper explicitly recommends adding time jitter to TTLs (sourced in `cache-invalidation`, verifiedOn 27-10-2026).

## Verification-pass corrections (27-10-2026)

| Concept | Fix | Source |
|---|---|---|
| realtime-communication | HTTP/2 concurrent-stream "default 100" was not a spec default; corrected (nginx default is 128). | nginx http_v2 docs, verifiedOn 27-10-2026 |
| bloom-filter | Output panel was from an unseeded (random) run; seeded (seed 42), panel and prose corrected to 0.92%% false-positive (matches the formula). | re-run on JDK 21 / Python 3 |
| cache-invalidation | TTL-jitter source upgraded from a retry-backoff blog to the AWS Redis caching whitepaper that states it directly. | AWS whitepaper, verifiedOn 27-10-2026 |
