# Fundamentals

## What system design is
Planning the architecture and components of a software system so it is scalable, reliable, fast, secure, and maintainable. You decide which components (API servers, databases, caches, queues) you need, why each exists, and when to use one instead of another.

> Remember: Start from requirements, pick the simplest architecture that meets them, and explain the trade-offs.

## Functional vs non-functional requirements ⭐
- **Functional:** what the system does (upload a photo, send a message, make a payment).
- **Non-functional:** how well it does it (fast, available, secure, consistent).

Common non-functional qualities: scalability, availability, reliability, performance, consistency, durability, security, maintainability.

> Remember: Functional = features; non-functional = qualities. Clarify both before designing.

## HLD vs LLD
- **High-Level Design (HLD):** major components, services, databases, and how they communicate.
- **Low-Level Design (LLD):** classes, methods, interfaces, detailed logic, data structures.

For a URL shortener: HLD = Client → API server → DB → redirect; LLD = `createShortUrl()`, `getOriginalUrl()`, ID generation.

## Key words interviewers use
- **Trade-off:** improving one thing worsens another (stronger consistency can raise latency).
- **Bottleneck:** the component that limits overall performance.
- **SPOF (Single Point of Failure):** one component whose failure brings down the whole system.
- **Fault tolerance:** keep working when some components fail.
- **Resilience:** recover from failures and keep serving.

> Remember: Every design decision is a trade-off; name the one you are making.

# Performance and Estimation

## Latency, throughput, QPS
- **Latency:** time to complete one request.
- **Throughput:** work completed per unit time (requests/second).
- **RPS / QPS:** requests or queries handled each second.
- **Concurrency:** operations in progress at the same time.
- **Bandwidth:** data transferred per unit time.

> Remember: Latency is "how fast is one request"; throughput is "how many per second".

## Latency percentiles ⭐
- **p50 / p95 / p99:** 50% / 95% / 99% of requests finish within this latency.
- **Tail latency:** the slow responses at the high end.

An average hides a small group of very slow requests, so interviewers care about p95/p99. If p99 = 800 ms, the slowest 1% take at least that long.

> Remember: Design and measure by percentiles, not the average.

## Average vs peak traffic
- **Average traffic:** typical volume over a period.
- **Peak / burst traffic:** highest volume in a busy period or short window.

> Remember: Design for realistic peak demand, not just average.

## Capacity estimation
Use round numbers to size the system before choosing architecture.
- Daily requests = daily active users × requests per user per day.
- Average RPS = daily requests ÷ 86,400.
- Peak RPS = average RPS × peak multiplier.
- Storage = records × record size (× retention).
- Bandwidth = requests/sec × bytes per request.

Example: 1M users × 20 requests/day = 20M/day ≈ 231 avg RPS; at 5× peak ≈ 1,155 RPS. These are estimates to be measured later, not guarantees.

## Little's Law
Average requests in the system = throughput × average time in the system (`L = λW`). Example: 100 req/s × 0.2 s = 20 requests in flight on average.

# Clients, APIs, and Communication

## Client, server, stateless vs stateful ⭐
- **Client:** app making a request (browser, mobile). **Server:** processes requests, returns responses.
- **Stateless server:** does not keep client session state between requests; any instance can serve the next request.
- **Stateful server:** keeps client-specific state on one instance.

A stateless server can still read state from a database, cache, or token — stateless does not mean the system has no state.

> Remember: Stateless servers scale and fail over easily; keep state in a shared store, not the instance.

## HTTP methods, safe and idempotent
| Method | Purpose |
|---|---|
| `GET` | Retrieve (safe) |
| `POST` | Create or trigger (not idempotent) |
| `PUT` | Replace / create at a known URI (idempotent) |
| `PATCH` | Partial update |
| `DELETE` | Delete (idempotent) |

- **Safe:** not intended to change state (`GET`).
- **Idempotent:** repeating the request has the same effect as doing it once (`GET`, `PUT`, `DELETE`).

> Remember: `POST` is not idempotent — protect it with an idempotency key if retried.

## Status codes worth knowing
- **2xx:** 200 OK, 201 Created, 202 Accepted (async), 204 No Content.
- **3xx:** 301/302 redirect.
- **4xx (client):** 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 429 Too Many Requests.
- **5xx (server):** 500 Internal Error, 502 Bad Gateway, 503 Unavailable, 504 Gateway Timeout.

> Remember: 401 = not authenticated; 403 = authenticated but not allowed.

## API styles
- **REST:** resources + standard HTTP semantics.
- **RPC / gRPC:** call a named operation; gRPC uses Protocol Buffers over HTTP/2.
- **GraphQL:** client asks for specific fields.
- **WebSocket:** persistent two-way connection. **SSE:** server streams events to the client.

## Synchronous vs asynchronous
- **Sync:** caller waits for the result (`Client → API → Service → DB → Response`). Use when the result is needed immediately.
- **Async:** caller gets an acknowledgement and the work finishes later via a queue/worker. Use when work can happen later (reports, emails, video processing).

> Remember: Async acceptance (a job ID) does not mean the work succeeded.

# Scaling and Load Balancing

## Vertical vs horizontal scaling ⭐
| Vertical (scale up) | Horizontal (scale out) |
|---|---|
| Bigger machine | More machines |
| Simpler initially | Distributes load better |
| Limited by one machine | Grows across machines |
| May need downtime | Needs coordination + distributed design |

- **Elasticity:** adjust resources automatically with demand.

> Remember: Horizontal scaling is not automatically better — it adds networking, coordination, and consistency complexity.

## Load balancer
Distributes incoming requests across servers and stops routing to unhealthy ones (via **health checks**). Can do **failover** to a backup.

Algorithms: round robin, weighted round robin, least connections, IP hash, random. Layer: **L4** (transport) or **L7** (HTTP/application).

- **Reverse proxy:** receives client requests and forwards to backends; may also handle TLS, caching, routing.
- **Sticky sessions (session affinity):** send one client to the same server — simplifies sessions but hurts even distribution. Prefer shared session storage or stateless tokens.

> Remember: A load balancer gives capacity a front door and routes around failures.

## Stateless scaling
Keep app servers stateless so any instance handles the next request, with state in a **shared store** (database/cache). The shared store can then become the bottleneck or SPOF, so design it carefully.

> Remember: Stateless services + load balancer + horizontal scaling is the default scaling recipe.

# Databases

## SQL vs NoSQL ⭐
| SQL (relational) | NoSQL |
|---|---|
| Tables + relationships + schema | Document, key-value, wide-column, graph |
| Standard SQL, strong constraints | Query and consistency vary by product |
| Good default for transactional data | Good for specific access patterns / scale |

Examples: SQL = PostgreSQL, MySQL; document = MongoDB; key-value = Redis; wide-column = Cassandra; graph = Neo4j.

> Remember: Do not pick NoSQL just "because scale" — relational databases scale a lot too.

## ACID
- **Atomicity:** all operations happen or none do.
- **Consistency:** a transaction keeps defined rules/constraints.
- **Isolation:** concurrent transactions do not interfere unacceptably.
- **Durability:** committed data survives failures.

A bank transfer deducts from A and adds to B, then commits both together; if it fails before commit, neither change stays.

> Remember: ACID does not mean every replica or service sees the latest global data.

## Normalization
- **Normalize (1NF→3NF):** remove duplication and update anomalies.
- **Denormalize:** duplicate/combine data to speed reads, at the cost of extra writes and consistency work.

> Remember: Normalize for correctness; denormalize deliberately for read-heavy paths.

## Indexes ⭐
An index helps the database find rows without scanning the whole table.
- Types: primary-key, composite (multi-column), unique.
- A **composite index** on `(user_id, created_at)` helps filters on `user_id` (and often `user_id + created_at`); it may not help `created_at` alone.

Trade-off: faster reads, but more storage and slower inserts/updates/deletes. The query planner decides whether an index is used.

> Remember: Index according to real query patterns — every index taxes writes.

## Joins and slow queries
- **INNER JOIN:** matching rows from both sides. **LEFT JOIN:** all left rows + matched right rows (nulls otherwise).
- **EXPLAIN / EXPLAIN ANALYZE:** show the planned / actual execution.
- **N+1 problem:** one query for a list, then one query per item — batch instead.
- **Connection pool:** reuse DB connections instead of creating one per operation.

> Remember: Fix slow queries with the execution plan, right indexes, fewer columns, and fewer repeated queries.

## Replication
Keep copies of data on multiple nodes.
- **Primary/leader** takes writes; **replicas/followers** copy changes and can serve reads.
- **Synchronous:** writer waits for replica acks (safer, slower). **Asynchronous:** writer returns before replicas catch up (faster, can be stale).
- **Replication lag:** delay before a replica reflects the primary.

> Remember: Replicas add read capacity and availability; async replicas can serve stale reads.

## Sharding (partitioning across nodes)
Split data across nodes by a **shard key**.
- Strategies: range-based, hash-based, directory-based (mapping service).
- **Hot shard:** one shard gets disproportionate traffic. **Resharding:** changing the distribution (hard).
- **Horizontal partitioning:** split rows; **vertical partitioning:** split columns.

> Remember: Replication copies the same data; sharding splits different data. A system can use both.

## Transactions and isolation
Read anomalies: **dirty read** (uncommitted data), **non-repeatable read** (row changes between reads), **phantom read** (range result changes).

Isolation levels, weak→strong: Read Uncommitted → Read Committed → Repeatable Read → Serializable. Serializable is strongest but reduces concurrency.

- **Optimistic locking:** detect conflicts with a version field. **Pessimistic locking:** take locks to block conflicts. **Deadlock:** transactions wait on each other in a cycle.

```sql
UPDATE products SET stock = 8, version = version + 1
WHERE id = 10 AND version = 3;  -- 0 rows if someone else changed it
```

> Remember: Optimistic locking suits low contention; pessimistic suits high contention.

# Caching

## What caching is and why ⭐
A cache stores reusable data in a faster location to cut latency, DB load, and repeated computation.
- **Hit / miss:** data found / not found in cache. **Hit rate:** fraction served by cache.
- **TTL (time to live):** how long an entry stays valid. **Eviction:** removing entries to free space. **Invalidation:** marking stale data unusable.

> Remember: Don't cache everything — data goes stale, memory is limited, invalidation is hard.

## Cache architectures
Client-side (browser), CDN (edge), application (in-process), distributed (shared, e.g. Redis), database buffer cache (pages in memory).

## Cache-aside ⭐
1. App checks the cache. 2. Hit → return it. 3. Miss → read DB. 4. Store in cache with TTL and return.
Writes usually update the DB and then invalidate/update the cached key.

> Remember: Cache-aside is the common pattern; it does not guarantee the cache is always current.

## Write strategies
| Strategy | Benefit | Risk |
|---|---|---|
| Write-through | Cache stays aligned with writes | Higher write latency |
| Write-behind (write-back) | Fast writes | Data loss if pending writes aren't persisted |
| Write-around | Avoids caching every write | First read after write misses |

- **Refresh-ahead:** refresh entries before they expire.

## Eviction policies
- **LRU:** evict least recently used. **LFU:** least frequently used. **FIFO:** oldest inserted. **TTL:** by age.

## Cache problems ⭐
- **Stampede / thundering herd:** many requests reload the same expired item at once.
- **Hot key:** one key gets disproportionate traffic.
- **Penetration:** repeated requests for nonexistent data bypass the cache.
- **Avalanche:** many entries expire at the same time.

Protections: request coalescing/locking, TTL jitter, negative caching, rate limiting, refreshing hot entries.

> Remember: Redis is fast in-memory access; a database gives durability, rich queries, and transactions — they are not interchangeable.

# Networking and CDN

## Networking terms
- **DNS:** domain name → IP. **IP address:** identifies a network interface.
- **TCP:** reliable, ordered byte stream. **UDP:** connectionless, no built-in ordering/delivery.
- **TLS:** encryption + integrity + usually server authentication. **HTTPS:** HTTP over TLS.
- **HTTP/1.1:** persistent connections, text framing. **HTTP/2:** multiplexed streams + header compression. **HTTP/3:** HTTP over QUIC (on UDP).
- **Timeout / retry / connection pooling:** bound waiting, re-attempt failures, reuse connections.

## CDN ⭐
A geographically distributed network that serves content from **edge locations** near users, fetching from the **origin** when needed.
- Best for static/eligible content: images, CSS, JS, some videos.
- A CDN does not automatically cache every API response — cache rules, auth, headers, and freshness matter.

> Remember: A CDN cuts latency and origin traffic by moving content close to users.

## Where latency comes from
Total latency can include DNS, connection setup, network transit (**RTT**), queue waiting, service processing, DB calls, serialization/deserialization, and response transfer. Find the slowest part before optimizing.

# Messaging and Async Processing

## Core concepts
- **Message queue:** stores messages until consumers process them. **Producer / consumer / broker.**
- **Event / event-driven architecture:** components publish and react to events.
- **Backpressure:** slow down intake when a downstream component can't keep up.
- **Queue depth / consumer lag:** messages waiting / how far behind a consumer is.

Benefits of a queue: decoupling, buffering spikes, retrying failed work, async processing.

> Remember: Use a queue to absorb spikes and decouple services, not when an immediate response is required.

## Delivery guarantees ⭐
- **At-most-once:** may be lost.
- **At-least-once:** may be duplicated — consumers must dedupe.
- **Exactly-once processing:** effect happens once within a scope; needs careful transactions/dedup.

> Remember: At-least-once delivery + idempotent processing is the common practical design.

## ACKs, retries, dead-letter queues
- **ACK / NACK:** message handled / not handled.
- **Retry with exponential backoff + jitter:** increase and randomize waits to avoid synchronized retries.
- **DLQ:** holds messages that keep failing (**poison messages**) after set attempts.
- **Visibility timeout:** a delivered message is hidden from other consumers while processing.

> Remember: Never retry forever — set limits and route permanent failures to a DLQ.

## Kafka ⭐
A distributed event-streaming platform using partitioned logs.
- **Topic:** named stream. **Partition:** ordered record sequence. **Offset:** position in a partition.
- **Consumer group:** consumers sharing a topic's partitions. **Replication factor:** copies per partition. **Partition key:** decides a record's partition.
- Ordering is guaranteed **within a partition**, not across a topic.

> Remember: A queue distributes work; a retained stream (Kafka) lets many consumer groups read and replay independently.

# Microservices and Service Patterns

## Monolith vs microservices ⭐
| Monolith | Microservices |
|---|---|
| One deployable unit | Independently deployable services |
| Simpler debugging, in-process calls | Network calls, distributed tracing needed |
| Scales as a whole | Services scale independently |
| Shared database common | Services own their data |

> Remember: Microservices aren't automatically better — use them when independent deployment, scaling, ownership, or fault isolation justifies the complexity.

## Service communication
- **Sync:** HTTP/RPC, waits for a response. **Async:** messages/events, no immediate response.
- **Service discovery / registry:** find available instances.
- **API gateway:** single entry point; handles routing, auth, rate limits, transformations.
- **Service mesh:** infrastructure layer for traffic policy, security, observability between services.

## Resilience patterns ⭐
- **Circuit breaker:** stop calling a failing dependency temporarily (CLOSED → OPEN → HALF-OPEN → CLOSED) to prevent cascading failures.
- **Bulkhead:** isolate resources so one overload doesn't consume everything.
- **Timeout:** never wait indefinitely. **Retry:** re-attempt eligible failures. **Rate limiter.**
- **Graceful degradation:** reduced functionality instead of total failure.

> Remember: Retries, timeouts, and circuit breakers solve different problems — unbounded retries worsen overload, and a breaker doesn't repair the dependency.

## Saga pattern
Coordinates a business transaction across services with a sequence of local transactions, undone by **compensating transactions** on failure.
- **Orchestration:** a coordinator directs each step. **Choreography:** services react to events, no central coordinator.

Order flow: create order → reserve inventory → charge payment → confirm; if payment fails, release the inventory. Compensation is a new business action (a refund), not a perfect rollback.

## Transactional outbox
Problem: the DB update succeeds but publishing the event fails. Solution: write the business change and an event record in the **same transaction**; a separate **relay** publishes pending events. The relay may publish twice, so consumers should be idempotent.

> Remember: The outbox keeps DB state and events in sync by writing both atomically.

# Consistency and Distributed Systems

## CAP theorem ⭐
- **Consistency:** every read sees the latest write.
- **Availability:** every request to a live node gets a non-error response.
- **Partition tolerance:** keep working despite network partitions between nodes.

When a partition happens, you cannot guarantee both consistency and availability for every request.

> Remember: CAP isn't "pick any two always" — the trade-off bites during a partition.

## Strong vs eventual consistency ⭐
- **Strong:** reads never return stale data relative to completed writes.
- **Eventual:** if updates stop, replicas converge eventually.
- Related guarantees: **read-your-writes**, **monotonic reads**, **causal consistency**. A **stale read** returns an older value.

Use strong for bank balance, inventory, payments; eventual is fine for like/view counts and some analytics.

> Remember: Match the consistency level to how much staleness the operation can tolerate.

## Distributed transactions
- **Two-phase commit (2PC):** a coordinator asks participants to prepare, then commits or aborts.
- **Distributed lock:** exclusive access across processes; use a **lease** (expires) and a **fencing token** (monotonic, rejects stale holders).

> Remember: A local DB transaction gives no atomicity across independent services — use a saga or 2PC, carefully.

## Idempotency ⭐
Repeating an operation has the same effect as doing it once.
- **Idempotency key:** a unique id used to recognize a repeated request.

```text
POST /payments
Idempotency-Key: order-123-payment
```

On a retry after a timeout, the server returns the existing result instead of charging again — if it stores and enforces the key, handles concurrent duplicates, and defines key lifetime.

> Remember: A failed response doesn't mean the operation failed — make retryable writes idempotent.

# Reliability, Availability, and Rate Limiting

## Availability and SLAs ⭐
- **Availability:** fraction of time the service is usable. **Downtime:** when it isn't.
- **SLA:** contractual commitment. **SLO:** internal target. **SLI:** the measured metric. **Error budget:** allowed unreliability under the SLO.

| Availability | Approx. monthly downtime (30-day) |
|---|---|
| 99% | ~7h 12m |
| 99.9% | ~43m |
| 99.99% | ~4m 19s |

> Remember: Count the nines — each extra nine is an order of magnitude less downtime.

## Redundancy and failover
- **Active-active:** all instances serve traffic. **Active-passive:** one serves, one stands by.
- **Automatic failover:** switch without manual action.
- **DR (disaster recovery):** **RTO** = max time to restore; **RPO** = max acceptable data loss (in time).

> Remember: Replicas in the same failure domain won't survive a region outage — DR needs geographic separation.

## Graceful failure
- **Fail fast, fallback, degraded mode, load shedding** (drop low-priority work).
- **Health checks:** **readiness** = ready for traffic; **liveness** = still functioning.

> Remember: Don't restart on a liveness check just because a downstream dependency is briefly down.

## Rate limiting
Controls how many requests a user/client/service may make — protects capacity, controls cost, prevents abuse, ensures fairness.
- Algorithms: fixed window, sliding window log, sliding window counter, token bucket (allows bursts), leaky bucket (steady output).

A token bucket holding 10 tokens, refilling at 2/sec, permits short bursts while limiting sustained usage. A global limit across many instances needs shared coordination.

> Remember: Limit by user / IP / API key / tenant; a per-instance limit isn't a global limit.

# Security

## Authentication vs authorization ⭐
- **Authentication:** who you are. **Authorization:** what you may do.
- **Least privilege:** grant only the permissions needed.
- **RBAC:** permissions via roles. **ABAC:** decisions from attributes of subject/resource/context.

> Remember: Authn = "who are you?"; authz = "what can you do?".

## Common mechanisms
- **JWT:** signed token carrying claims (not automatically encrypted).
- **OAuth 2.0:** delegated authorization. **OIDC:** identity layer on OAuth 2.0. **Session:** server/shared state for a logged-in user.
- **TLS in transit, encryption at rest, secret management, password hashing, audit logs.**

## Common attacks and defenses
- **SQL injection** → parameterized queries. **XSS** → output encoding. **CSRF** → CSRF protections.
- **DDoS** → infrastructure mitigation + rate limits. **Replay** → replay protection. **Credential stuffing** → auth controls.

> Remember: Validate input, authenticate/authorize every protected operation, use TLS, and keep secrets out of code.

# Storage, Search, and Observability

## Storage types and large uploads ⭐
- **Block storage** (disks/DBs), **file storage** (hierarchical filesystem), **object storage** (data + metadata via API, e.g. S3).
- **Pre-signed URL:** time-limited URL granting a specific storage operation — a bearer credential anyone holding it can use until it expires.

Large-upload design: client asks backend for permission → backend issues a short-lived upload URL → client uploads directly to object storage → backend verifies and stores **metadata (URL + info)**. This offloads bandwidth from API servers. **Multipart upload** splits a big file into parts for parallel/resumable upload.

> Remember: Store the file in object storage and only the URL + metadata in the database.

## Search systems
- **Full-text search** over **inverted index** (term → documents); plus autocomplete, fuzzy search, ranking.
- The **search index** is updated asynchronously from the source of truth, so it can lag — it is not the authoritative database.

## Observability ⭐
- **Metrics:** numbers over time (QPS, latency, error rate).
- **Logs:** individual events (prefer **structured/JSON** with a **correlation ID**).
- **Distributed tracing:** follows a request across services; a **trace** has **spans**.

> Remember: Logs explain events, metrics reveal trends, traces locate delays across services.

# Deployment and Design Principles

## Containers and deployment ⭐
- **Container:** app + dependencies sharing the host kernel (vs a **VM** with a full guest OS). **Kubernetes** orchestrates containers; **pod** is its smallest unit.
- Strategies: **rolling** (replace gradually), **blue-green** (two environments, switch traffic), **canary** (small slice first). **Rollback** returns to the previous version.
- **Feature flag:** enable a feature without redeploying — deployment and release are separate.
- **Autoscaling / persistent volumes** for stateless vs stateful workloads.

> Remember: Deploy safely with rolling/blue-green/canary; decouple "deployed" from "released" using flags.

## Design and architecture principles
- **SOLID:** single responsibility, open/closed, Liskov substitution, interface segregation, dependency inversion.
- Principles: separation of concerns, high cohesion, low coupling, DRY, KISS, YAGNI.
- Patterns: singleton, factory, strategy, observer, adapter, decorator, repository, dependency injection.

> Remember: A simple modular design usually beats premature microservices, event streams, and distributed transactions.

## System design patterns
- **Layered / MVC:** separate controller, service, repository / data, view, control.
- **CQRS:** separate read and write paths. **Event sourcing:** store state as a sequence of events.
- **Materialized view:** precomputed query results. **Strangler:** gradually replace an old system. **Sidecar, anti-corruption layer, API composition, fan-out/fan-in.**

CQRS and event sourcing can combine but neither requires the other. In event-driven/CQRS systems the read model is **eventually consistent** — a write can succeed before the read model updates.

# Interview Approach

## Seven-step framework ⭐
1. **Clarify requirements** (users, features, traffic, consistency, constraints).
2. **Estimate capacity** (RPS, storage, bandwidth, peak).
3. **Define APIs and data models** (endpoints, entities, keys, indexes).
4. **Draw the high-level architecture** (client, LB, services, cache, DB, queue).
5. **Explain the request flow** (a successful read and write).
6. **Handle scale and failures** (bottlenecks, replication, caching, retries, rate limits, failover).
7. **Explain trade-offs** (justify each choice and name alternatives).

> Remember: Requirements → estimate → API → architecture → scale → failures → trade-offs.

## Scaling order (don't skip steps)
Index → query optimization → connection pooling → cache → read replicas → partition/shard → multi-region. Don't shard when caching or a replica would solve it.

> Remember: Fix the real bottleneck (CPU, RAM, network, DB, cache, disk, queue, lock, hot key) — not a random component.

## Special systems (same template, one area matters most)
- **URL shortener:** key generation + cache + redirect latency.
- **Instagram/Twitter feed:** media + CDN + fan-out + ranking + read throughput.
- **WhatsApp:** WebSockets + queue + delivery state + ordering.
- **YouTube/Netflix:** object storage + transcoding + CDN.
- **Uber:** geospatial search + real-time location + matching.
- **Ticket booking / payments:** concurrency + locking + idempotency + strong consistency + audit.

> Remember: Map any question onto the same building blocks; only the focus area changes.

# Common "Why X vs Y?" Comparisons

## Why a load balancer if we already have multiple servers?
Servers give capacity, but clients still need a single place to distribute requests. The load balancer spreads traffic and stops routing to unhealthy instances.

## Why a cache if the database already stores the data?
The DB gives durable storage and queries; the cache gives faster access to hot data and cuts DB load — at the cost of expiration and invalidation.

## Why a message queue if APIs can call each other directly?
Direct calls are simpler when a response is needed now. A queue decouples services, absorbs spikes, retries failed work, and runs tasks asynchronously.

## Why Kafka if we already have a message queue?
A traditional queue distributes tasks among consumers. Kafka adds durable, partitioned, retained event streams that many consumer groups can read and replay independently.

## Why a CDN if we already have a cache?
An app cache sits near backend services; a CDN caches eligible content near users geographically, cutting latency and origin traffic. Use both.

## Why an API gateway if we already have a load balancer?
A load balancer mainly distributes traffic. A gateway adds API routing, authentication, quotas, and transformations. Some products do both.

## Why replication if we already have sharding (and vice versa)?
Replication keeps copies of the same data for availability and read scale; sharding splits different subsets to spread storage and writes. They solve different problems and combine.

## Why NoSQL if SQL databases can scale?
SQL scales well and is great for relations and transactions. NoSQL wins when a specific data model, access pattern, or distribution requirement fits it better.

## Strong vs eventual consistency — which to choose?
Strong for correctness-critical data (payments, inventory); eventual for availability and scale where brief staleness is fine (likes, counters, feeds).

## Universal trade-offs
| Choice | Trade-off |
|---|---|
| Cache | Speed ↔ stale data |
| Vertical vs horizontal | Simplicity ↔ scale |
| Replication | Availability/read scale ↔ consistency/storage |
| Sharding | Scale ↔ complexity |
| Sync vs async | Immediate result ↔ decoupling/eventual consistency |
| Microservices vs monolith | Independent scaling ↔ operational complexity |
| Denormalization | Faster reads ↔ duplicated data |
| Strong vs eventual consistency | Correctness ↔ latency/availability |

> Remember: Every answer is "it depends" — state the requirement, then the trade-off you are accepting.
