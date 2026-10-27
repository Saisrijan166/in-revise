# System Design — Interview Cheat Sheet

System Design is about how to build software systems that are scalable, reliable, fast, secure, and easy to maintain.

For interviews, you need to understand how components such as clients, APIs, databases, caches, queues, and servers work together, why each component exists, and when to use one instead of another.

This cheat sheet covers beginner to intermediate concepts, common interview terminology, practical examples, important trade-offs, and frequently confused concepts.

# 1. System Design Fundamentals

## 1.1 What Is System Design?

- System Design: Planning the architecture and components of a software system.
- Requirement: Something the system must do or a quality it must satisfy.
- Architecture: The high-level structure of a system and how its components communicate.
- Component: One part of a system, such as an API server, database, cache, or message queue.
- Trade-off: Improving one thing may make another thing worse. For example, stronger consistency may increase latency.
- Bottleneck: The component limiting the overall performance of the system.
- Single Point of Failure (SPOF): One component whose failure can bring down the entire system.
- Fault Tolerance: The ability to continue operating when some components fail.
- Resilience: The ability to recover from failures and continue providing service.

## 1.2 Functional vs Non-Functional Requirements

| Functional requirements | Non-functional requirements                |
| ----------------------- | ------------------------------------------ |
| What the system does    | How well it does it                        |
| User can upload a photo | Upload completes within 2 seconds          |
| User can send a message | Messages remain available during failures  |
| User can make a payment | Payments are secure and processed reliably |

Common non-functional requirements:

- Scalability: Handle increasing users, requests, or data.
- Availability: The system is operational and accessible when needed.
- Reliability: The system performs correctly over time.
- Performance: How quickly and efficiently the system works.
- Consistency: Whether users see data that agrees with the system's consistency guarantees.
- Durability: Once data is confirmed as stored, it survives the failures covered by the storage guarantees.
- Security: Protect data and systems from unauthorized access.
- Maintainability: How easily the system can be changed and fixed.

## 1.3 High-Level Design (HLD) vs Low-Level Design (LLD)

- HLD: Describes the major components, services, databases, and communication paths.
- LLD: Describes classes, methods, interfaces, detailed logic, and data structures.
- Architecture Diagram: Shows major components and their relationships.
- Sequence Diagram: Shows the order of interactions between components over time.
- Data Flow: Describes how data moves through a system.

### Example

For a URL shortener:

- HLD: Client → API server → Database → Redirect response.
- LLD: `createShortUrl()`, `getOriginalUrl()`, URL validation, and ID generation.

## 1.4 Types of System Design Interviews

- Design a system: Example — design WhatsApp, YouTube, or a URL shortener.
- Design a component: Example — design a rate limiter, cache, or notification service.
- Design a data model: Decide tables, relationships, keys, and indexes.
- Design for scale: Explain how the system handles millions of requests.
- Design for reliability: Explain how it behaves during server, database, or network failures.

# 2. Capacity Estimation and Performance

## 2.1 Basic Metrics

- Latency: Time taken to complete a request.
- Throughput: Amount of work completed per unit of time, such as requests per second.
- RPS (Requests Per Second): Number of requests received each second.
- QPS (Queries Per Second): Number of queries handled each second; sometimes used more broadly for requests.
- Concurrency: Number of operations in progress at the same time.
- Bandwidth: Amount of data transferred per unit of time.
- Payload: The actual data carried in a request or response.
- Utilization: Fraction of a resource's capacity currently being used.

## 2.2 Average vs Peak Traffic

- Average traffic: Typical request volume over a period.
- Peak traffic: Highest request volume during a busy period.
- Traffic spike: A sudden increase in incoming requests.
- Traffic pattern: How request volume changes over time.
- Burst traffic: Many requests arrive in a short time.

Interview rule: Design for realistic peak demand, not just average traffic.

## 2.3 Latency Percentiles

- p50: 50% of requests finish within this latency.
- p95: 95% of requests finish within this latency.
- p99: 99% of requests finish within this latency.
- Tail latency: The slow response times at the high end of the distribution.

Example: If p99 latency is 800 ms, 99% of requests finish within 800 ms, while the slowest 1% take at least that long.

Why p95/p99 matter: An average can hide a small but important group of very slow requests.

## 2.4 Capacity Estimation

Use rough estimates to understand the system's scale before choosing architecture.

- Daily requests: Daily active users × requests per user per day.
- Average RPS: Daily requests ÷ 86,400 seconds.
- Peak RPS: Average RPS × estimated peak multiplier.
- Storage required: Number of records × average record size.
- Network bandwidth: Requests per second × average bytes transferred per request.

### Example

Suppose 1 million users each make 20 requests per day.

- Daily requests = 1,000,000 × 20 = 20 million.
- Average RPS ≈ 20,000,000 ÷ 86,400 ≈ 231.
- If peak traffic is 5× average, peak RPS ≈ 1,155.

These are estimates, not guarantees; actual traffic and resource usage must be measured.

## 2.5 Little's Law

\- Little's Law: Average number of requests in a system = throughput × average time spent in the system.

\\[ L = \lambda W \\]

Here, \\(L\\) is the average number of requests in the system, \\(\lambda\\) is throughput, and \\(W\\) is average time in the system.

Example: 100 requests/second × 0.2 seconds = 20 requests in the system on average.

# 3. Client, Server, and API Architecture

## 3.1 Basic Architecture

- Client: The application making a request, such as a browser or mobile app.
- Server: A system that processes requests and returns responses.
- Frontend: The user-facing interface.
- Backend: Server-side business logic, data access, and integrations.
- API (Application Programming Interface): A defined way for software components to communicate.
- Endpoint: A specific API operation exposed at a URL and HTTP method.
- Request: Data sent to a server.
- Response: Data returned by a server.
- Stateless Server: Does not need to retain client session state between requests.
- Stateful Server: Retains session or other client-specific state between requests.

Important: A stateless server can still access state stored in a database, cache, or token. Stateless does not mean the entire system has no state.

## 3.2 Common HTTP Methods

| Method   | Typical purpose                                    |
| -------- | -------------------------------------------------- |
| `GET`    | Retrieve data                                      |
| `POST`   | Create a resource or trigger an operation          |
| `PUT`    | Replace a resource or create/update at a known URI |
| `PATCH`  | Partially update a resource                        |
| `DELETE` | Delete a resource                                  |

- Safe method: Intended not to change server-side state; `GET` is safe.
- Idempotent method: Repeating the same request has the same intended effect as performing it once. `GET`, `PUT`, and `DELETE` are defined as idempotent; `POST` is not inherently idempotent.
- REST: An architectural style for APIs built around resources and standard HTTP semantics.
- RPC: Remote Procedure Call; invokes a named operation on another service.
- gRPC: An RPC framework commonly using Protocol Buffers and HTTP/2.
- GraphQL: An API query language allowing clients to request specific fields.
- WebSocket: A persistent, two-way communication connection.
- SSE (Server-Sent Events): A connection through which a server streams events to a client, primarily server-to-client.

## 3.3 HTTP Status Codes

- 200 OK: Request succeeded.
- 201 Created: Resource created.
- 202 Accepted: Request accepted for processing, possibly asynchronously.
- 204 No Content: Request succeeded without a response body.
- 301/302: Redirect responses.
- 400 Bad Request: Invalid request.
- 401 Unauthorized: Authentication is missing or invalid.
- 403 Forbidden: The caller is not allowed to perform the operation.
- 404 Not Found: Resource not found or intentionally concealed.
- 409 Conflict: Request conflicts with the current resource state.
- 429 Too Many Requests: Rate limit exceeded.
- 500 Internal Server Error: Unexpected server-side failure.
- 502 Bad Gateway: Gateway received an invalid upstream response.
- 503 Service Unavailable: Service temporarily cannot handle the request.
- 504 Gateway Timeout: Gateway timed out waiting for an upstream response.

Common confusion: `401` means the caller is not properly authenticated; `403` means access is forbidden, even if the caller is authenticated.

# 4. Scaling and Load Distribution

## 4.1 Vertical vs Horizontal Scaling

- Vertical Scaling (Scale Up): Increase the CPU, RAM, or capacity of one machine.
- Horizontal Scaling (Scale Out): Add more machines or instances.
- Scale Down: Reduce the capacity of a machine.
- Scale In: Remove instances from a group of machines.
- Elasticity: Automatically adjust resources based on demand.

| Vertical scaling                              | Horizontal scaling                                  |
| --------------------------------------------- | --------------------------------------------------- |
| Bigger machine                                | More machines                                       |
| Often simpler initially                       | Better for distributing load                        |
| Limited by machine capacity                   | Can grow across multiple machines                   |
| May require downtime depending on the upgrade | Requires coordination and distributed-system design |

Remember: Horizontal scaling is not automatically better. It introduces networking, coordination, data consistency, and operational complexity.

## 4.2 Load Balancer

- Load Balancer: Distributes incoming requests across multiple servers.
- Health Check: Checks whether an instance is healthy enough to receive traffic.
- Reverse Proxy: Receives client requests and forwards them to backend servers; may also handle TLS, caching, or routing.
- Failover: Redirects work to another component when the primary component fails.
- Session Affinity (Sticky Sessions): Tries to send the same client's requests to the same server.

### Common load-balancing algorithms

- Round Robin: Distributes requests in rotation.
- Weighted Round Robin: Sends more requests to servers with higher assigned weights.
- Least Connections: Prefers servers with fewer active connections.
- IP Hash: Uses client IP information to choose a server.
- Random: Selects a server randomly.

Common confusion: Sticky sessions can simplify session handling, but they make traffic distribution less flexible. Shared session storage or stateless authentication can reduce the need for them.

## 4.3 Stateless vs Stateful Scaling

- Stateless application: Any healthy instance can usually handle the next request.
- Stateful application: Some state or session information is held by a particular instance.
- Shared State Store: A database, cache, or other service stores state accessible to multiple instances.

### Example

Client requests

Load balancer

API 1

API 2

API 3

Shared database / cache

All API instances can access the shared state. However, the shared database or cache can itself become a bottleneck or single point of failure unless designed appropriately.

# 5. Database Fundamentals

## 5.1 Relational vs NoSQL Databases

- Relational Database (SQL): Stores structured data in tables with defined schemas and relationships.
- NoSQL Database: A broad family of databases, including document, key-value, wide-column, and graph databases.
- Schema: The structure and rules that define how data is organized.
- Record/Row: One entry in a table.
- Column/Field: One attribute of a record.
- Primary Key: Uniquely identifies a row.
- Foreign Key: References a key in another table or the same table.
- Constraint: A rule enforced on stored data.
- Transaction: A group of database operations treated as one logical unit.

| SQL                                                  | NoSQL                                                    |
| ---------------------------------------------------- | -------------------------------------------------------- |
| Tables and relationships are common                  | Data models vary by database type                        |
| SQL query language is standard                       | Query mechanisms differ                                  |
| Strong relational constraints are available          | Consistency and constraints vary by product              |
| Often a good default for transactional business data | Often useful for specific access patterns or data models |

Examples:

- SQL: PostgreSQL, MySQL.
- Document: MongoDB.
- Key-value: Redis.
- Wide-column: Apache Cassandra.
- Graph: Neo4j.

Interview rule: Do not choose NoSQL merely because the system must scale. Relational databases can also scale significantly.

## 5.2 ACID Properties

- Atomicity: All operations in a transaction happen, or none do.
- Consistency: A transaction preserves defined database rules and constraints.
- Isolation: Concurrent transactions are controlled to prevent unacceptable interference.
- Durability: Committed data survives failures covered by the database's durability guarantees.

### Example

A bank transfer of ₹500:

1. Deduct ₹500 from account A.
2. Add ₹500 to account B.
3. Commit both changes together.

If the transaction fails before committing, neither change should remain committed.

Important: ACID does not automatically mean every query sees the latest global data across every service or replica.

## 5.3 Database Normalization

- Normalization: Organizing relational data to reduce unnecessary duplication and update anomalies.
- 1NF: Each column holds values according to the database's atomic-value rules; no repeating groups.
- 2NF: Satisfies 1NF and has no partial dependency of a non-key attribute on part of a candidate key.
- 3NF: Satisfies 2NF and removes relevant transitive dependencies of non-key attributes on keys.
- Denormalization: Intentionally duplicates or combines data to improve certain read patterns.

Why denormalize? To reduce joins or expensive reads, especially in read-heavy systems.

Trade-off: Denormalization can create extra write work and consistency challenges.

## 5.4 Indexes

- Index: An additional data structure that helps the database find records without scanning every row.
- Primary Key Index: The index associated with a primary key, according to the database's implementation.
- Composite Index: An index on multiple columns.
- Unique Index: Prevents duplicate indexed key values, subject to the database's null rules.
- Full Table Scan: Reads through the table rather than using a selective index lookup.
- Query Plan: The database's chosen execution strategy for a query.
- Cardinality: The number of distinct values in a dataset or column, depending on context.

### Composite index example

```
CREATE INDEX idx_orders_user_date
ON orders (user_id, created_at);
```

This index can help queries filtering by `user_id`, and often by `user_id` plus `created_at`. Its usefulness for filtering by `created_at` alone depends on the database and query plan.

Index trade-offs:

- Faster suitable reads.
- Additional storage.
- Slower inserts, updates, and deletes because indexes may need maintenance.
- An index is not guaranteed to be used; the query planner decides.

## 5.5 Joins and Query Optimization

- INNER JOIN: Returns matching rows from both sides.
- LEFT JOIN: Returns all left-side rows and matching right-side rows, with nulls for unmatched right-side columns.
- EXPLAIN: Shows a query's planned execution strategy.
- EXPLAIN ANALYZE: Executes the query and reports actual execution statistics in databases that support it.
- N+1 Query Problem: One query fetches a list, followed by a separate query for each item.
- Connection Pool: Reuses database connections instead of creating a new connection for every operation.

Common fixes for slow queries: Inspect the execution plan, add appropriate indexes, avoid fetching unnecessary columns, reduce repeated queries, and check whether joins or sorting are expensive.

## 5.6 Replication

- Replication: Keeping copies of data on multiple database nodes.
- Primary/Leader: Accepts writes in a primary-replica arrangement.
- Replica/Follower: Receives replicated changes from the primary.
- Read Replica: A replica used to serve reads.
- Synchronous Replication: The writer waits for acknowledgements from required replicas before reporting success, according to the configured policy.
- Asynchronous Replication: The writer can report success before replicas receive the change.
- Replication Lag: Delay before a replica reflects changes made on the primary.
- Failover: Promoting or routing to another database node when a node fails.

Trade-off: Read replicas can increase read capacity, but asynchronous replicas may return stale data.

## 5.7 Sharding (Partitioning Across Nodes)

- Sharding: Splitting data across multiple database nodes.
- Shard Key: The attribute or attributes used to choose a shard.
- Horizontal Partitioning: Splitting rows into subsets.
- Vertical Partitioning: Splitting columns or responsibilities into separate structures.
- Hot Shard: A shard receiving a disproportionate amount of traffic.
- Resharding: Changing how data is distributed among shards.

Common strategies:

- Range-based: Shard by ranges, such as user IDs.
- Hash-based: Hash a key to distribute records.
- Directory-based: Use a mapping service to locate each record.

Common confusion: Replication creates copies; sharding distributes different subsets of data. A system can use both.

## 5.8 Database Transactions and Isolation

- Dirty Read: Reading another transaction's uncommitted changes.
- Non-Repeatable Read: Reading the same row twice and seeing a changed committed value.
- Phantom Read: Repeating a range query and seeing a different set of matching rows.
- Optimistic Locking: Detects conflicting updates, often using a version field.
- Pessimistic Locking: Uses locks to prevent conflicting operations.
- Deadlock: Transactions wait on each other in a cycle, preventing progress until resolved.

Common SQL isolation levels, from weaker to stronger in general:

1. Read Uncommitted
2. Read Committed
3. Repeatable Read
4. Serializable

Exact behavior varies by database implementation. Serializable provides the strongest standard isolation guarantee but can reduce concurrency or require transaction retries.

### Example: Optimistic locking

```
UPDATE products
SET stock = 8, version = version + 1
WHERE id = 10 AND version = 3;
```

If another transaction has already changed the version, this update affects zero rows and the application can detect the conflict.

# 6. Caching

## 6.1 What Is Caching?

- Cache: Stores reusable data in a faster-access location.
- Cache Hit: Requested data is found in the cache.
- Cache Miss: Requested data is absent from the cache.
- Cache Hit Rate: Fraction of cache lookups served successfully by the cache.
- TTL (Time to Live): How long an entry is allowed to remain valid according to its expiration policy.
- Eviction: Removing entries to free cache capacity.
- Cache Invalidation: Marking or making cached data unusable when it becomes stale.

Why use a cache? Reduce latency, database load, and repeated computation.

Why not cache everything? Data may become stale, memory is limited, and invalidation adds complexity.

## 6.2 Common Cache Architectures

- Client-side Cache: Stores data near the client, such as in a browser.
- CDN Cache: Stores eligible content at geographically distributed edge locations.
- Application Cache: Keeps reusable data close to the application logic.
- Distributed Cache: A cache shared across multiple application instances, such as Redis.
- Database Buffer Cache: Keeps database pages in memory to reduce disk access.

## 6.3 Cache-Aside Pattern

1. Application checks the cache.
2. On a hit, it returns the cached value.
3. On a miss, it reads from the database.
4. It stores the result in the cache and returns it.

### Example

```
GET user:42
Cache miss
Read user 42 from database
Store user:42 in cache with TTL
Return user
```

Important: Cache-aside is commonly used, but it does not guarantee that cached data is always current.

## 6.4 Cache Write Strategies

- Write-Through: Writes update the cache and underlying store as part of the write path, according to the implementation.
- Write-Behind / Write-Back: Writes go to the cache first; persistence happens later.
- Write-Around: Writes go directly to the database, often bypassing the cache.
- Refresh-Ahead: Refreshes entries before they expire, when configured.

| Strategy      | Main benefit                                 | Main risk                                          |
| ------------- | -------------------------------------------- | -------------------------------------------------- |
| Write-through | Cache stays more closely aligned with writes | Higher write latency                               |
| Write-behind  | Fast write path                              | Data loss risk if pending writes are not persisted |
| Write-around  | Avoids caching every written item            | Immediate reads may miss the cache                 |

## 6.5 Cache Eviction Policies

- LRU: Least Recently Used; evicts entries that have not been used recently.
- LFU: Least Frequently Used; evicts entries with lower usage frequency.
- FIFO: First In, First Out; evicts the oldest inserted entry.
- TTL-based Expiration: Removes or invalidates entries based on age.

The exact behavior depends on the cache implementation and configuration.

## 6.6 Common Cache Problems

- Cache Stampede: Many requests simultaneously reload the same expired or missing item.
- Thundering Herd: Many clients or processes wake up or retry simultaneously and overwhelm a dependency.
- Hot Key: One cache key receives a disproportionate amount of traffic.
- Cache Penetration: Repeated requests for nonexistent data bypass the cache and hit the database.
- Stale Data: Cached data does not reflect the latest underlying change.
- Cache Avalanche: Many entries expire or become unavailable around the same time.

Typical protections include request coalescing, TTL jitter, negative caching, rate limiting, and refreshing hot entries.

Common interview question: Why not just use Redis instead of a database?

Redis is useful for fast in-memory access and specialized data structures. A database generally provides durable storage, richer query capabilities, and transactional guarantees suited to the application. Their exact capabilities overlap in some areas, but they are not interchangeable by default.

# 7. Networking and Content Delivery

## 7.1 Essential Networking Terms

- DNS: Translates domain names into IP addresses or other DNS records.
- IP Address: An address used to identify a network interface for IP communication.
- TCP: A transport protocol providing a reliable, ordered byte stream.
- UDP: A connectionless transport protocol without TCP's built-in delivery and ordering guarantees.
- TLS: Provides encryption and integrity protection, and usually server authentication.
- HTTPS: HTTP protected by TLS.
- HTTP/1.1: HTTP version commonly using persistent connections and text-based message framing.
- HTTP/2: Supports multiplexed streams over a connection and header compression.
- HTTP/3: Uses HTTP over QUIC, which runs over UDP.
- Timeout: Maximum time allowed for an operation before it is treated as timed out.
- Retry: Another attempt after an operation fails.
- Connection Pooling: Reuses established connections to reduce setup overhead.

## 7.2 CDN (Content Delivery Network)

- CDN: A geographically distributed network that delivers content closer to users.
- Edge Location: A location near users where content or requests can be served.
- Origin Server: The source server from which a CDN retrieves content.
- Static Content: Files such as images, CSS, JavaScript, and some videos.
- Dynamic Content: Content generated or personalized based on the request or current data.

Best use: Cache suitable static assets and eligible responses near users to reduce latency and origin traffic.

Important: A CDN does not automatically cache every API response. Cache rules, authorization, headers, and content freshness matter.

## 7.3 Network Latency vs Processing Latency

- Network Latency: Time spent transferring data across network paths, including propagation and protocol overhead.
- Processing Latency: Time spent processing work in a service or dependency.
- Round-Trip Time (RTT): Time for a signal or request to travel to a destination and for a response to return.
- Serialization: Converting structured data into a transmittable representation.
- Deserialization: Reconstructing data from its transmitted representation.

A request's total latency may include DNS, connection setup, network transit, queue waiting, service processing, database calls, and response transfer.

# 8. Message Queues and Asynchronous Processing

## 8.1 Basic Concepts

- Synchronous Processing: The caller waits for the operation to finish or return a result.
- Asynchronous Processing: The caller can continue without waiting for the entire operation to finish.
- Message Queue: Stores messages until consumers process them.
- Producer: Sends messages.
- Consumer: Receives and processes messages.
- Broker: Middleware that accepts, stores, routes, or delivers messages.
- Event: A record that something happened.
- Event-Driven Architecture: Components communicate by publishing and reacting to events.
- Background Job: Work performed outside the immediate user request.
- Backpressure: Slowing or limiting incoming work when a downstream component cannot keep up.
- Queue Depth: Number of messages waiting in a queue.
- Consumer Lag: How far a consumer is behind the messages available to process.

## 8.2 Synchronous vs Asynchronous

### Synchronous flow

Client

Server

Database

The client waits for the server's response.

### Asynchronous flow

Client

API

Queue

The API can acknowledge acceptance; a worker processes the job later.

Example: When a user requests a report, return a job ID immediately and generate the report in the background.

Important: Asynchronous acceptance does not mean the work has completed successfully.

## 8.3 Message Delivery Guarantees

- At-most-once: A message is delivered zero or one times; it can be lost.
- At-least-once: A message may be delivered multiple times; consumers must handle duplicates.
- Exactly-once Processing: The defined effect happens once within a specific scope. This generally requires carefully designed transactions, deduplication, or equivalent guarantees.

Interview rule: At-least-once delivery plus idempotent processing is a common practical design.

## 8.4 Acknowledgements, Retries, and Dead-Letter Queues

- Acknowledgement (ACK): Indicates that a message has been handled according to the consumer's policy.
- Negative Acknowledgement (NACK): Indicates that a message was not successfully handled.
- Retry: Attempts to process a failed message again.
- Exponential Backoff: Increases the wait between successive retries.
- Jitter: Adds randomness to retry delays to avoid synchronized retries.
- Dead-Letter Queue (DLQ): Holds messages that cannot be processed successfully after configured attempts or conditions.
- Poison Message: A message that repeatedly fails processing.
- Visibility Timeout: In systems that use it, the period during which a delivered message is hidden from other consumers while processing.

Common mistake: Retrying every error forever can overload an unhealthy service. Set retry limits and handle permanent failures separately.

## 8.5 Popular Messaging Systems

- Apache Kafka: Distributed event-streaming platform with partitioned logs and consumer groups.
- RabbitMQ: Message broker supporting queues and flexible routing.
- Amazon SQS: Managed message-queue service.
- Pub/Sub: A messaging pattern where publishers send messages and subscribers receive relevant messages.

Queue vs stream: A queue is often used to distribute work. A retained event stream can allow multiple independent consumer groups to read events at their own pace and replay them within retention limits.

## 8.6 Kafka Interview Terminology

- Topic: Named stream of events.
- Partition: Ordered sequence of records within a topic.
- Offset: Position of a record within a partition.
- Consumer Group: Consumers cooperating to process topic partitions.
- Replication Factor: Number of copies maintained for a partition.
- Consumer Lag: Difference between the latest available position and the consumer's progress.
- Ordering: Kafka guarantees order within a partition, not automatically across all partitions in a topic.
- Partition Key: Determines which partition a record is assigned to, according to the partitioning strategy.

# 9. Microservices and Service Communication

## 9.1 Architecture Styles

- Monolith: Application components are deployed together as one unit.
- Modular Monolith: A single deployable application with clearly separated internal modules.
- Microservices: Independently deployable services organized around business capabilities.
- Service-Oriented Architecture (SOA): Architecture that organizes functionality into services; implementations vary.
- Distributed System: Multiple independent computers or services cooperate over a network.
- Service Boundary: Defines what responsibility and data belong to a service.

### Monolith vs Microservices

| Monolith                           | Microservices                                             |
| ---------------------------------- | --------------------------------------------------------- |
| Simpler initial deployment         | Independent deployments are possible                      |
| Often simpler local debugging      | Requires distributed tracing and network failure handling |
| Internal calls can be in-process   | Service calls often involve a network                     |
| Scaling may apply to the whole app | Individual services can scale independently               |
| Shared database is common          | Services often own their data                             |

Important: Microservices are not automatically faster, cheaper, or easier to maintain. They are useful when independent deployment, scaling, ownership, or fault isolation justifies the extra complexity.

## 9.2 Communication Between Services

- Synchronous Communication: One service waits for another service's response, commonly through HTTP or RPC.
- Asynchronous Communication: Services communicate through messages or events without requiring an immediate response.
- Service Discovery: Finds available service instances.
- API Gateway: Provides an entry point for client requests and can handle routing, authentication, rate limits, and other cross-cutting concerns.
- Service Mesh: Infrastructure layer that manages service-to-service communication features such as traffic policies, security, and observability.
- Internal API: An interface intended for communication within an organization or system.
- Contract: The agreed request, response, and behavior between communicating components.

## 9.3 Common Microservice Patterns

- Circuit Breaker: Temporarily stops calls to a failing dependency to prevent repeated unsuccessful requests.
- Bulkhead: Isolates resources so one overloaded component does not consume everything.
- Timeout: Prevents waiting indefinitely for a dependency.
- Retry: Reattempts eligible failed operations.
- Rate Limiter: Restricts the number of requests allowed in a time window.
- Service Registry: Stores information about available service instances.
- Health Endpoint: Reports health or readiness information.
- Graceful Degradation: Provides reduced functionality instead of complete failure.

Important: Retries, timeouts, and circuit breakers solve different problems. Retries can worsen overload if not bounded; circuit breakers do not repair the failed dependency.

## 9.4 Saga Pattern

- Saga: Coordinates a business transaction across multiple services using a sequence of local transactions.
- Compensating Transaction: A separate business operation intended to counteract an earlier successful operation.
- Orchestration: A coordinator tells each participant what to do.
- Choreography: Participants react to events without a central coordinator controlling the entire workflow.

### Example: Order payment

1. Create an order.
2. Reserve inventory.
3. Charge payment.
4. Confirm the order.

If payment fails after inventory is reserved, a compensating operation can release the inventory.

Important: Compensation is not always a perfect rollback. A refund, for example, is a new business operation rather than erasing the original payment.

## 9.5 The Transactional Outbox Pattern

- Problem: A database update succeeds, but publishing the corresponding event fails.
- Outbox Pattern: Store the business change and an event record in the same database transaction.
- Relay: A separate process publishes pending outbox events.
- Deduplication: Prevents repeated delivery from causing repeated business effects.

This reduces the risk of database state changing without the corresponding event being recorded. The relay may publish an event more than once, so consumers should generally be idempotent.

# 10. Distributed Systems and Consistency

## 10.1 CAP Theorem

- Consistency (CAP): Every successful read sees the latest successful write under the model's guarantee.
- Availability (CAP): Every request to a non-failing node receives a non-error response, even if it may not contain the latest data.
- Partition Tolerance: The system continues operating despite network partitions between nodes.

CAP theorem: When a network partition occurs, a distributed system cannot guarantee both CAP consistency and CAP availability for every request. It must make trade-offs in how it handles affected requests.

Common mistake: CAP is not simply "choose any two at all times." The trade-off is particularly relevant when a partition occurs.

## 10.2 Strong vs Eventual Consistency

- Strong Consistency: Reads obey a guarantee that prevents returning stale data relative to completed writes within the specified scope.
- Eventual Consistency: If updates stop and the system continues operating normally, replicas are expected to converge eventually.
- Read-Your-Writes Consistency: A client sees its own completed writes in subsequent reads within the guarantee's scope.
- Monotonic Reads: Once a client sees a value, later reads do not go backward to an older value.
- Causal Consistency: Operations that are causally related are observed in a causally consistent order.
- Stale Read: A read returns an older value than a more recent completed write.

### Example

A user changes their profile name. The primary database has the new name, but a read replica may briefly return the old name because replication has not caught up.

Choosing consistency:

- Bank balance or inventory reservation: stronger correctness guarantees are often important.
- Like counts, view counts, or some analytics: temporary inconsistency may be acceptable.

## 10.3 Distributed Transactions

- Two-Phase Commit (2PC): A coordinator asks participants to prepare, then commits or aborts the transaction.
- Coordinator: Manages a distributed operation or protocol.
- Participant: A service or database involved in that operation.
- Distributed Lock: Coordinates exclusive access to a shared resource across multiple processes.
- Lease: A lock or permission that expires after a limited time.
- Fencing Token: A monotonically increasing token used to reject operations from an older lock holder.

Common confusion: A local database transaction does not automatically provide atomicity across several independent services.

## 10.4 Idempotency

- Idempotency: Repeating the same operation produces the same intended effect as performing it once.
- Idempotency Key: A unique client-provided or server-generated identifier used to recognize repeated requests.
- Deduplication: Identifies and ignores duplicate messages or requests.

### Example: Payment API

```
POST /payments
Idempotency-Key: order-123-payment
```

If the client retries after a timeout, the server can return the existing result rather than charge the customer again, provided it stores and enforces the key correctly.

Important: A key alone is insufficient. The system must handle concurrent duplicate requests, persist the outcome safely, and define how long keys remain valid.

# 11. Availability, Reliability, and Fault Tolerance

## 11.1 Availability and Uptime

- Availability: Fraction of time a service is usable according to a defined measurement.
- Downtime: Time when the service is unavailable.
- SLA (Service-Level Agreement): A contractual commitment about service levels.
- SLO (Service-Level Objective): A target for a service-level metric.
- SLI (Service-Level Indicator): The measured metric, such as successful-request rate or latency.
- Error Budget: Allowed unreliability under an SLO over a defined period.

Typical uptime calculations, assuming a 30-day month:

| Availability | Approximate monthly downtime |
| ------------ | ---------------------------- |
| 99%          | 7 hours 12 minutes           |
| 99.9%        | 43 minutes 12 seconds        |
| 99.99%       | 4 minutes 19 seconds         |

These figures assume a 30-day month and a simple uptime-based definition.

## 11.2 Redundancy and Failover

- Redundancy: Multiple components or copies provide alternative capacity.
- Active-Active: Multiple instances serve traffic at the same time.
- Active-Passive: One instance serves while another is on standby.
- Automatic Failover: The system switches to an alternative without requiring a manual operator action.
- Disaster Recovery (DR): Procedures and infrastructure for recovering after a major disruption.
- RTO (Recovery Time Objective): Target maximum time to restore a service after a disruption.
- RPO (Recovery Point Objective): Target maximum amount of data loss measured in time.

Important: Replicas in the same failure domain may not protect against a region-wide outage. Disaster recovery needs appropriate geographic and operational separation.

## 11.3 Graceful Failure

- Fail Fast: Detect an invalid or failing operation early rather than waiting indefinitely.
- Fallback: Use an alternative result or dependency when the preferred one fails.
- Degraded Mode: Continue with reduced functionality.
- Load Shedding: Reject or discard lower-priority work to protect the system.
- Rate Limiting: Control how quickly a caller can send requests.
- Health Check: Checks whether a component is alive or ready for work.
- Readiness: Whether an instance is ready to receive traffic.
- Liveness: Whether an instance is still functioning enough to remain running.

Common mistake: A liveness check should not restart an application merely because a temporary downstream dependency is unavailable. Readiness and liveness serve different purposes.

# 12. Security in System Design

## 12.1 Authentication vs Authorization

- Authentication: Verifies who a user or service is.
- Authorization: Determines what that identity is allowed to do.
- Identity: A user, service, or other principal represented in the system.
- Least Privilege: Give each identity only the permissions needed for its work.
- RBAC: Role-Based Access Control; permissions are assigned through roles.
- ABAC: Attribute-Based Access Control; decisions use attributes of the subject, resource, or context.

Remember: Authentication answers "Who are you?" Authorization answers "What can you do?"

## 12.2 Common Security Mechanisms

- JWT: A token format that can carry claims and be signed; it is not automatically encrypted.
- OAuth 2.0: A framework for delegated authorization.
- OpenID Connect (OIDC): An identity layer built on OAuth 2.0.
- Session: Server-managed or shared state representing a user's authenticated interaction.
- TLS Encryption: Protects data in transit.
- Encryption at Rest: Protects stored data using encryption.
- Secret Management: Safely stores and distributes credentials, API keys, and other secrets.
- Password Hashing: Uses a password-hashing algorithm to store password verifiers rather than plaintext passwords.
- Audit Log: Records important actions for investigation and accountability.

## 12.3 Common Attacks

- SQL Injection: Untrusted input changes the intended SQL query structure.
- Cross-Site Scripting (XSS): Malicious script executes in another user's browser.
- Cross-Site Request Forgery (CSRF): Tricks a browser into sending an unwanted authenticated request.
- DDoS: Distributed traffic overwhelms a target's resources.
- Replay Attack: Reuses a previously captured request or message.
- Credential Stuffing: Tries leaked username-password combinations across services.

Common defenses include parameterized queries, context-appropriate output encoding, CSRF protections where applicable, rate limits, authentication controls, replay protection, and infrastructure-level DDoS mitigation.

## 12.4 API Security

- Validate input and enforce request-size limits.
- Apply authentication and authorization to every protected operation.
- Use TLS for sensitive network communication.
- Store secrets outside source code.
- Avoid returning sensitive internal details in error messages.
- Apply rate limits to expensive or abuse-prone endpoints.
- Use idempotency protection for retryable financial operations.
- Avoid logging passwords, tokens, or sensitive payment information.

# 13. Rate Limiting

## 13.1 Why Rate Limit?

- Rate Limiter: Controls how many requests a user, client, or service can make.
- Quota: Allowed usage over a defined period.
- Burst Limit: Restricts short-term spikes in requests.
- Throttling: Slows or restricts request processing when usage is too high.

Use rate limits to protect capacity, control costs, prevent abuse, and ensure fair resource sharing.

## 13.2 Rate-Limiting Algorithms

- Fixed Window: Counts requests in fixed time intervals.
- Sliding Window Log: Tracks request timestamps to count requests over a moving interval.
- Sliding Window Counter: Estimates usage over a moving interval using window counts.
- Token Bucket: Tokens accumulate up to a capacity; each request consumes tokens.
- Leaky Bucket: Processes or releases work at a controlled rate, depending on the implementation.

### Example: Token bucket

A bucket holds up to 10 tokens and refills at 2 tokens per second. Each accepted request consumes one token. This permits bursts up to the available token count while limiting sustained usage.

Common confusion: A rate limiter can live in one application instance, but a global limit across many instances usually needs shared coordination or a carefully designed allocation strategy.

# 14. File Uploads and Object Storage

## 14.1 Storage Types

- Block Storage: Provides raw storage blocks, commonly used for disks and databases.
- File Storage: Stores files in a hierarchical filesystem.
- Object Storage: Stores objects with data and metadata, commonly accessed through APIs.
- Metadata: Information describing stored content, such as size, type, or owner.
- Pre-Signed URL: A time-limited URL granting permission for a specific storage operation.

Examples: Amazon S3 for object storage; a persistent disk for block storage; a shared network filesystem for file storage.

## 14.2 Large File Upload Design

A common design:

1. Client requests upload permission from the backend.
2. Backend authorizes the user and issues a short-lived upload URL.
3. Client uploads directly to object storage.
4. Backend verifies the upload and stores metadata.
5. Background workers process the file if needed.

Why upload directly to object storage? It reduces bandwidth and processing load on the API servers.

## 14.3 Multipart Upload

- Multipart Upload: Splits a large file into multiple parts for independent or parallel uploading.
- Resume: Continues an interrupted upload from completed parts when supported.
- Checksum: Helps verify data integrity.
- Lifecycle Policy: Automatically transitions or deletes objects according to configured rules.

Important: A pre-signed URL is a bearer credential. Anyone who obtains it may use its granted permissions until it expires or becomes invalid.

# 15. Search, Logging, and Observability

## 15.1 Search Systems

- Full-Text Search: Finds documents based on words and text relevance.
- Inverted Index: Maps terms to the documents containing them.
- Autocomplete: Suggests possible completions as a user types.
- Fuzzy Search: Finds approximate matches despite small spelling differences.
- Search Ranking: Orders results by relevance or other scoring criteria.
- Search Index: Data structure optimized for searching, often updated asynchronously from the source of truth.

Common confusion: A search engine's index is not necessarily the authoritative database. Index updates can lag behind source changes.

## 15.2 Observability: Logs, Metrics, and Traces

- Logging: Records events and details about application behavior.
- Metrics: Numeric measurements over time, such as request rate, error rate, and memory usage.
- Distributed Tracing: Follows a request across multiple services.
- Trace: The overall journey of an operation through components.
- Span: One timed operation within a trace.
- Correlation ID: An identifier used to connect related logs or operations.
- Structured Logging: Stores logs as fields, often in JSON, so they can be searched and analyzed.
- Alert: Notification triggered by a defined condition or rule.

### Example

A request is slow. Metrics show high latency, logs show a database timeout, and a distributed trace shows that most of the time was spent waiting for the database.

Remember: Logs explain individual events, metrics reveal trends, and traces help locate delays across service boundaries.

# 16. Deployment and Infrastructure

## 16.1 Containers and Orchestration

- Virtual Machine (VM): Runs a guest operating system on virtualized hardware.
- Container: Packages an application and its dependencies while sharing the host OS kernel.
- Container Image: Template used to create containers.
- Orchestration: Automates deployment, scaling, recovery, and management of workloads.
- Kubernetes: A platform for orchestrating containerized workloads.
- Pod: The smallest deployable unit in Kubernetes.
- Rolling Deployment: Gradually replaces old instances with new ones.
- Rollback: Returns to a previous version after a problematic release.

## 16.2 Deployment Strategies

- Blue-Green Deployment: Maintains two environments and switches traffic from the old environment to the new one.
- Canary Deployment: Releases a change to a small portion of traffic or users first.
- Rolling Update: Replaces instances gradually.
- Feature Flag: Controls whether a feature is enabled without necessarily redeploying the application.
- Health-Based Rollout: Progresses a deployment based on health and readiness criteria.

Common confusion: Deployment and release are different. Code can be deployed while a feature remains disabled behind a feature flag.

## 16.3 Stateless and Stateful Workloads

- Stateless Workload: Instances can be replaced without needing to recover local session state.
- Stateful Workload: Needs persistent identity, storage, or ordering guarantees across restarts.
- Persistent Volume: Storage that outlives an individual container or pod according to its configuration.
- Autoscaling: Automatically adjusts the number of instances or resources based on demand or other signals.

# 17. Architecture Patterns and Design Principles

## 17.1 SOLID Principles

- Single Responsibility Principle (SRP): A module should have one primary reason to change.
- Open/Closed Principle (OCP): Software should be open to extension but closed to unnecessary modification.
- Liskov Substitution Principle (LSP): Subtypes should be usable where their base types are expected without breaking required behavior.
- Interface Segregation Principle (ISP): Prefer focused interfaces over large interfaces clients do not need.
- Dependency Inversion Principle (DIP): High-level logic should depend on abstractions rather than concrete low-level details.

## 17.2 Common Design Patterns

- Singleton: Restricts a class to one instance within a defined scope.
- Factory: Encapsulates object creation.
- Strategy: Makes interchangeable algorithms or behaviors selectable.
- Observer: Notifies interested subscribers when a subject changes.
- Adapter: Makes one interface work with another expected interface.
- Decorator: Adds behavior around an object without changing its core interface.
- Repository: Separates domain logic from data-access details.
- Dependency Injection: Supplies an object's dependencies rather than requiring it to create them directly.

## 17.3 Architecture Principles

- Separation of Concerns: Keep unrelated responsibilities separate.
- High Cohesion: Keep related responsibilities together.
- Low Coupling: Minimize unnecessary dependencies between components.
- DRY: Avoid unnecessary duplication of knowledge or logic.
- KISS: Prefer the simplest solution that satisfies the requirements.
- YAGNI: Do not build features before there is a justified need.
- Single Responsibility: Keep each module focused on a clear responsibility.
- Loose Coupling: Allow components to change independently where practical.

Interview tip: A simple modular design is often better than introducing microservices, event streams, and distributed transactions before the requirements justify them.

# 18. Important System Design Patterns

## 18.1 Common Patterns to Remember

- Client-Server: Clients request services from servers.
- Layered Architecture: Separates responsibilities into layers, such as controller, service, and repository.
- MVC (Model-View-Controller): Separates application data, presentation, and request/control logic.
- CQRS (Command Query Responsibility Segregation): Separates operations that change state from operations that read state.
- Event Sourcing: Stores changes as a sequence of events from which state can be reconstructed.
- Materialized View: Stores precomputed query results for faster reads.
- Strangler Pattern: Gradually replaces parts of an old system with a new system.
- Sidecar Pattern: Runs a helper component alongside an application instance.
- Anti-Corruption Layer: Translates between models to prevent an external or legacy system's design from leaking into your own.
- API Composition: Combines results from multiple services into one response.
- Fan-Out: Sends work or requests to multiple destinations.
- Fan-In: Combines results from multiple sources.

## 18.2 CQRS vs Event Sourcing

| CQRS                                            | Event Sourcing                                             |
| ----------------------------------------------- | ---------------------------------------------------------- |
| Separates read and write responsibilities       | Stores state changes as events                             |
| Can use ordinary database tables                | Uses an event history as the source of truth               |
| Does not require event sourcing                 | Does not inherently require CQRS                           |
| Can optimize read and write paths independently | Supports rebuilding state and examining historical changes |

Common confusion: These patterns can be combined, but neither requires the other.

## 18.3 Eventual Consistency in Read Models

In CQRS or event-driven systems, a write may succeed before a read model is updated.

Example:

1. An order is created.
2. An event is published.
3. A consumer updates the order search index.
4. The order becomes visible in search.

The order may exist before the search result appears. The design should define how users handle that delay.

# 19. Common System Design Interview Questions

These are high-value questions you should be able to answer in simple English.

## 19.1 Why use a load balancer if we already have multiple servers?

Multiple servers provide processing capacity, but clients need a way to distribute requests among them. A load balancer distributes traffic and can stop sending requests to unhealthy instances.

## 19.2 Why use a cache if the database already stores the data?

A database provides durable storage and querying, while a cache provides faster access to frequently requested data. A cache can reduce database load, but introduces expiration and invalidation problems.

## 19.3 Why use a message queue if APIs can call each other directly?

Direct calls are simpler when an immediate response is needed. A queue helps separate services, absorb traffic spikes, retry failed work, and process tasks asynchronously.

## 19.4 Why use microservices if a monolith already works?

A monolith is often simpler to build and operate. Microservices become useful when independent deployment, team ownership, fault isolation, or independent scaling justifies their added complexity.

## 19.5 Why use replication if we already have sharding?

Replication provides additional copies of data for availability or read capacity. Sharding distributes different subsets of data to spread storage and workload.

## 19.6 Why use NoSQL if SQL databases support scaling?

SQL databases support many scaling techniques and are excellent for relational data and transactions. NoSQL is useful when a particular data model, access pattern, or distribution requirement makes it a better fit.

## 19.7 Why use an API gateway if we already have a load balancer?

A load balancer primarily distributes traffic across instances. An API gateway can additionally handle API routing, authentication, quotas, transformations, and other API-level policies. Some products combine these functions.

## 19.8 Why use Kafka if we already have a message queue?

A traditional queue is often designed to distribute tasks among consumers. Kafka is particularly useful for durable, partitioned event streams that can be retained and consumed independently by multiple consumer groups.

## 19.9 Why use a CDN if we already have a cache?

An application cache often stores data close to backend services. A CDN caches eligible content near users geographically, reducing latency and origin traffic. Both can be useful together.

## 19.10 Why is a stateless server easier to scale?

Any healthy instance can handle a request without needing the client's previous request to have reached that same instance. Shared databases, caches, or tokens can hold the necessary state.

## 19.11 Why can retries cause problems?

A failed response does not always mean the operation failed. For example, a payment may succeed even though the response times out. Retrying without idempotency can cause duplicate charges.

## 19.12 Why not use a distributed lock for everything?

Distributed locks add latency and failure scenarios, and incorrect lock implementations can allow conflicting work. Use them only when coordination is needed and define lease, expiry, and stale-owner behavior carefully.

## 19.13 Why use a database index if it slows down writes?

An index can make frequent reads much faster, at the cost of storage and extra work during writes. Indexes should be selected according to actual query patterns.

## 19.14 Why use a read replica if the primary can handle reads?

Read replicas can distribute read traffic away from the primary. The trade-off is replication lag, additional operational complexity, and the possibility of stale reads.

## 19.15 Why not make everything asynchronous?

Asynchronous processing adds queues, delayed results, retries, monitoring, and consistency challenges. It is most valuable when the caller does not need the entire operation to finish before receiving a response.

# 20. System Design Interview Approach

Follow this order when an interviewer asks you to design a system.

## 20.1 The Seven-Step Framework

## 1

Clarify requirements

Identify users, core features, expected traffic, consistency requirements, and constraints.

## 2

Estimate capacity

Estimate requests per second, storage, bandwidth, and peak load.

## 3

Define APIs and data models

Specify main endpoints, entities, relationships, keys, and indexes.

## 4

Draw the high-level architecture

Connect the client, load balancer, application services, cache, database, and queue where needed.

## 5

Explain the request flow

Walk through a successful request and explain how data is read, written, and returned.

## 6

Handle scale and failures

Discuss bottlenecks, replication, caching, retries, rate limits, failover, and consistency.

## 7

Explain trade-offs

Justify every major technology choice and mention alternatives and their disadvantages.

## 20.2 Final Rapid-Revision Checklist

## Revision tracker

0 / 14

Fundamentals

HLD vs LLD, functional vs non-functional requirements

Performance

Latency, throughput, RPS, percentiles, capacity estimation

Scaling

Vertical vs horizontal, load balancing, stateless servers

Databases

SQL vs NoSQL, ACID, indexes, replication, sharding

Caching

Cache-aside, TTL, eviction, invalidation, cache stampede

Networking

DNS, TCP, TLS, HTTP, CDN, timeouts

Messaging

Queues, Kafka, ACKs, retries, DLQ, delivery guarantees

Microservices

API gateway, circuit breaker, saga, outbox pattern

Distributed systems

CAP, consistency, idempotency, distributed transactions

Reliability

SLO, SLA, redundancy, failover, RTO, RPO

Security

Authentication, authorization, JWT, TLS, rate limiting

Infrastructure

Containers, deployment strategies, autoscaling

Patterns

CQRS, event sourcing, SOLID, high cohesion, low coupling

Interview method

Requirements, estimates, APIs, architecture, trade-offs

Reset checklist

The most important interview rule: Start with the requirements, choose the simplest architecture that meets them, and explain the trade-offs. Do not add Redis, Kafka, sharding, or microservices just because they are popular.

Would you like me to help you revise this with a daily system-design interview practice reminder as you prepare?




Yes. **The image is the visual map; this is the short explanation you memorize with it.**  
The goal is: **any typical system-design question → map it onto this same architecture → adjust only the domain-specific pieces.**

# SYSTEM DESIGN — ONE MASTER TEMPLATE

## 1. HOW TO START ANY SYSTEM DESIGN INTERVIEW

Always follow:

**Requirements → Scale → APIs → Data → Architecture → Deep Dive → Scale → Reliability → Security → Trade-offs**

### Say this first

> “First, I’ll clarify the functional and non-functional requirements, estimate the scale, define the APIs and data model, then design the high-level architecture. After that I’ll discuss bottlenecks, scalability, reliability, security and trade-offs.”

---

# 2. REQUIREMENTS

### Functional
**What should the system DO?**

- Users
- Create
- Read
- Update
- Delete
- Search
- Upload
- Notifications
- Payments
- Sharing
- Real-time features

### Non-functional
**How well should it work?**

- Availability
- Scalability
- Low latency
- High throughput
- Durability
- Consistency
- Security
- Reliability
- Cost

### Always clarify

**Users → Requests/sec → Data size → Read/write ratio → Latency → Availability → Consistency**

---

# 3. ESTIMATION

Don't overdo it.

### Calculate

**DAU → requests/user → QPS → storage → bandwidth**

### Basic formulas

```text
QPS = Total requests / seconds

Peak QPS ≈ Average QPS × peak factor

Storage =
records × record size × retention

Bandwidth =
requests/sec × response size
```

Use round numbers.

> “Let's assume 10M users, 1M DAU and ~10K average QPS with 5× peak.”

---

# 4. MASTER REQUEST FLOW

Memorize this:

```text
USER
 ↓
DNS
 ↓
CDN
 ↓
LOAD BALANCER
 ↓
WEB / API SERVER
 ↓
CACHE ───────→ HIT → RESPONSE
 ↓ MISS
DATABASE
 ↓
OBJECT STORAGE
 ↓
MESSAGE QUEUE → WORKERS
 ↓
EXTERNAL SERVICES
 ↓
RESPONSE
```

Not every system needs every component.

**Add only when there is a reason.**

---

# 5. CORE COMPONENTS

## DNS

**Domain → IP**

Used for:

- Routing
- Failover
- Traffic distribution

---

## CDN

Stores static/edge content close to users.

Good for:

- Images
- Videos
- JS/CSS
- Static files

```text
User → CDN → Origin
```

---

## Load Balancer

Distributes traffic across servers.

```text
             → Server 1
User → LB →  → Server 2
             → Server 3
```

Common:

- L4 → transport-level
- L7 → HTTP/application-level

Also:

**Health checks + failover**

---

# 6. APPLICATION SERVERS

Keep them preferably **stateless**.

```text
Request
 ↓
Any server
```

Instead of:

```text
User → permanently assigned Server A
```

Stateless servers allow:

**Horizontal scaling + easy failover**

---

# 7. CACHE

Usually:

**Redis / Memcached**

Flow:

```text
Request
 ↓
Cache?
 ├── HIT → Return
 └── MISS
       ↓
      DB
       ↓
    Update Cache
```

Use cache for:

- Frequently accessed data
- Sessions
- Hot objects
- Expensive queries

### Important concepts

**TTL → expiration**

**Cache invalidation → update/delete stale data**

**Cache-aside → application manages cache**

Most common pattern:

```text
Read → Cache → DB if miss
Write → DB → invalidate/update cache
```

### Cache problems

- Stale data
- Cache stampede
- Hot keys
- Memory limits
- Eviction

Solutions:

**TTL + jitter + locking/request coalescing + replication**

---

# 8. DATABASE

Choose based on access pattern.

### SQL

Use when you need:

- Relationships
- Transactions
- Strong consistency
- Structured data

Examples:

**PostgreSQL / MySQL**

### NoSQL

Use when you need:

- Massive scale
- Flexible schema
- Specific high-volume access patterns

Examples:

**DynamoDB / Cassandra / MongoDB**

---

# 9. DATABASE SCALING

First:

```text
Indexes
Query optimization
Connection pooling
Read replicas
```

Then:

```text
Partitioning / Sharding
```

### Read-heavy

```text
             → Replica 1
App → Primary
             → Replica 2
```

### Huge data

```text
DB
 ↓
Shard 1
Shard 2
Shard 3
...
```

### Remember

**Index → Cache → Replica → Partition/Sharding**

Don't immediately shard.

---

# 10. DATABASE DESIGN

Think:

```text
Entities
 ↓
Relationships
 ↓
Primary Key
 ↓
Indexes
 ↓
Constraints
 ↓
Transactions
 ↓
Partition strategy
```

### Index

Speeds reads/searches but:

**uses storage + slows writes**

Index according to actual query patterns.

---

# 11. MESSAGE QUEUE

Use:

**Kafka / Pulsar / RabbitMQ / SQS-like systems**

When work doesn't need to happen synchronously.

```text
API
 ↓
Queue
 ↓
Worker
 ↓
DB / Service
```

Good for:

- Email
- Notifications
- Analytics
- Video processing
- Background jobs
- Event-driven architecture

Benefits:

**Decoupling + buffering + retry + asynchronous processing**

---

# 12. SYNCHRONOUS vs ASYNCHRONOUS

### Sync

```text
Client → API → Service → DB → Response
```

Use when result is immediately required.

### Async

```text
Client → API → Queue → Worker → DB
             ↓
          Response
```

Use when work can happen later.

---

# 13. OBJECT STORAGE

For large files:

**S3 / GCS / Azure Blob-like storage**

Don't put large files directly into DB unnecessarily.

```text
Client
 ↓
Object Storage
 ↓
Metadata → DB
```

DB stores:

**URL + metadata**

Storage stores:

**actual file**

---

# 14. CONCURRENCY

Always think:

**What happens when 10,000 users do the same thing simultaneously?**

Potential problems:

- Race conditions
- Duplicate operations
- Lost updates
- DB contention
- Lock contention

Solutions:

- Atomic operations
- Transactions
- Optimistic locking
- Pessimistic locking
- Idempotency keys
- Distributed locks where actually needed
- Queues

---

# 15. RATE LIMITING

Protect the system.

```text
User
 ↓
Rate Limiter
 ↓
API
```

Common algorithms:

- Token Bucket
- Leaky Bucket
- Fixed Window
- Sliding Window

Limit by:

**User / IP / API key / tenant**

---

# 16. RETRIES

Temporary failure:

```text
Request
 ↓
Service
 ↓ failure
Retry
```

But never blindly retry.

Use:

**Exponential backoff + jitter + retry limit**

Also make operations:

**Idempotent**

Example:

```text
POST payment
Idempotency-Key: 123
```

Repeated request should not create two payments.

---

# 17. TIMEOUTS

Every network call should have a timeout.

```text
Service A
   ↓ timeout
Service B
```

Otherwise threads/connections can remain occupied indefinitely.

---

# 18. CIRCUIT BREAKER

If downstream service keeps failing:

```text
A → B
    ❌❌❌
```

Stop sending requests temporarily.

```text
CLOSED
 ↓ failures
OPEN
 ↓ wait
HALF-OPEN
 ↓ test
CLOSED
```

Prevents cascading failures.

---

# 19. SCALABILITY

## Vertical

```text
Bigger machine
CPU ↑
RAM ↑
```

Easy but has limits.

## Horizontal

```text
Server
Server
Server
Server
```

Preferred for large-scale systems.

### General rule

**Stateless services + Load Balancer + Horizontal Scaling**

---

# 20. PERFORMANCE OPTIMIZATION

Use the same checklist almost everywhere:

### **CACHE**
Reduce repeated computation/DB access.

### **CDN**
Move static content closer to users.

### **INDEX**
Speed database queries.

### **BATCH**
Reduce repeated network/DB calls.

### **ASYNC**
Move non-critical work out of request path.

### **CONNECTION POOL**
Reuse DB/network connections.

### **PAGINATION**
Don't return thousands/millions of records.

### **COMPRESSION**
Reduce network payload.

### **LAZY LOADING**
Don't load unnecessary data.

### **DENORMALIZATION**
Trade storage/complexity for faster reads when justified.

### **READ REPLICAS**
Scale reads.

### **SHARDING**
Scale beyond one DB's capacity.

---

# 21. LATENCY

Think:

```text
Network
 ↓
Load Balancer
 ↓
Application
 ↓
Cache
 ↓
DB
 ↓
External APIs
```

Find the slowest component.

Optimize:

**Network hops → DB queries → external calls → serialization → computation**

---

# 22. THROUGHPUT

Throughput =

**How much work the system can process per unit time.**

Increase using:

- Horizontal scaling
- Parallel processing
- Queues
- Batch processing
- Caching
- Efficient queries
- Connection pooling
- Partitioning

---

# 23. AVAILABILITY

Avoid single points of failure.

Instead of:

```text
App → DB
```

Think:

```text
        → App 1
LB ────→ App 2
        → App 3
              ↓
          DB Primary
          /       \
      Replica   Replica
```

Also:

**Multi-AZ / Multi-region when required**

---

# 24. RELIABILITY

Memorize:

**Redundancy + Health Checks + Retry + Timeout + Circuit Breaker + Backup + Recovery**

---

# 25. DATA CONSISTENCY

### Strong consistency

Everyone sees latest data.

Good for:

- Payments
- Inventory
- Financial operations

### Eventual consistency

Data becomes consistent after some time.

Good for:

- Likes
- Counters
- Analytics
- Feeds
- Recommendations

Ask:

> “Does this operation require immediate consistency or is eventual consistency acceptable?”

---

# 26. SECURITY

Always mention:

### Authentication

**Who are you?**

OAuth / OIDC / JWT / session

### Authorization

**What are you allowed to do?**

RBAC / ABAC

### Protection

- TLS/HTTPS
- Encryption at rest
- Secrets management
- Input validation
- Rate limiting
- WAF
- CSRF protection where applicable
- SQL injection prevention
- XSS protection
- Least privilege
- Audit logs

---

# 27. OBSERVABILITY

Three things:

### Metrics

**Numbers**

CPU, memory, QPS, latency, error rate

### Logs

**Events**

Errors, requests, application events

### Traces

**Request journey**

```text
API
 ↓
Service A
 ↓
Service B
 ↓
DB
```

Use:

**OpenTelemetry + centralized logs + dashboards + alerts**

---

# 28. DEPLOYMENT

Typical:

```text
Git
 ↓
CI/CD
 ↓
Docker
 ↓
Kubernetes / Compute
 ↓
Cloud
```

Infrastructure:

**Terraform / Pulumi**

Environments:

```text
Dev → Staging → Production
```

Use:

**Rolling / Blue-Green / Canary deployment**

for safer releases.

---

# 29. FAILURE THINKING

For every component ask:

> **“What if this goes down?”**

### Server fails

→ Load balancer sends traffic elsewhere.

### Cache fails

→ Fall back to DB.

### DB replica fails

→ Other replica.

### Queue fails

→ Durable queue / retry / recovery.

### External API fails

→ Timeout + retry + circuit breaker + fallback.

### Region fails

→ Multi-region strategy if required.

---

# 30. COST OPTIMIZATION

Don't blindly use the biggest infrastructure.

Think:

**Cache → autoscaling → right-size → async → storage tiers → reserved/committed capacity → avoid unnecessary cross-region traffic**

Always balance:

**Cost ↔ Performance ↔ Reliability ↔ Complexity**

---

# 31. LOW-LEVEL DESIGN

When interviewer says:

> “Go deeper.”

Move into:

```text
API
 ↓
Service
 ↓
Classes / Modules
 ↓
DB Schema
 ↓
Queries
 ↓
Concurrency
 ↓
Failure Handling
```

Discuss:

- Interfaces
- Responsibilities
- Design patterns
- Data structures
- Transactions
- Thread safety
- Error handling

---

# 32. API DESIGN

Typical:

```text
POST   /users
GET    /users/{id}
PUT    /users/{id}
DELETE /users/{id}
```

Think about:

- Request/response
- Authentication
- Validation
- Pagination
- Filtering
- Sorting
- Versioning
- Idempotency
- Error codes

---

# 33. PAGINATION

Never:

```text
GET /users → 10 million users
```

Use:

```text
GET /users?limit=20&cursor=abc
```

For large/changing datasets:

**Cursor pagination > deep OFFSET pagination**

---

# 34. TYPICAL SPECIAL SYSTEMS

The master architecture stays the same, but one area becomes important.

### URL Shortener

Focus:

**Key generation + DB + cache + redirect latency**

### Instagram

Focus:

**Media storage + CDN + feed generation + fanout**

### WhatsApp

Focus:

**WebSockets + message queue + delivery state + ordering**

### YouTube

Focus:

**Object storage + transcoding + CDN + metadata**

### Uber

Focus:

**Geospatial search + real-time location + matching**

### Netflix

Focus:

**CDN + video storage + recommendation + streaming**

### Ticket Booking

Focus:

**Concurrency + locking + inventory consistency + idempotency**

### Payment System

Focus:

**Strong consistency + idempotency + transactions + audit + security**

### Twitter/X Feed

Focus:

**Fanout + caching + ranking + high read throughput**

---

# 35. THE UNIVERSAL OPTIMIZATION ORDER

When asked:

> “How would you improve this?”

Use this order:

```text
1. Remove unnecessary work
        ↓
2. Cache
        ↓
3. Optimize DB + indexes
        ↓
4. Reduce network calls
        ↓
5. Async / Queue
        ↓
6. Batch
        ↓
7. Horizontal scaling
        ↓
8. Read replicas
        ↓
9. Partition / Sharding
        ↓
10. Multi-region
```

**Don't jump to #10 when #2 solves the problem.**

---

# 36. UNIVERSAL BOTTLENECK CHECK

Ask:

```text
CPU?
RAM?
Network?
DB?
Cache?
Disk?
Queue?
External API?
Lock/contention?
Hot partition/key?
```

Then scale the actual bottleneck.

---

# 37. UNIVERSAL TRADE-OFFS

Almost every system design has these:

| Choice | Trade-off |
|---|---|
| Cache | Speed ↔ stale data |
| SQL | Consistency/relations ↔ scale flexibility |
| NoSQL | Scale/flexibility ↔ complex queries/transactions |
| Sync | Immediate result ↔ coupling/latency |
| Async | Scalability ↔ eventual consistency |
| Replication | Availability/read scale ↔ consistency/storage |
| Sharding | Scale ↔ complexity |
| Microservices | Independent scaling ↔ operational complexity |
| Monolith | Simplicity ↔ independent scaling |
| CDN | Low latency ↔ invalidation complexity |
| Denormalization | Faster reads ↔ duplicated data |
| Strong consistency | Correctness ↔ latency/availability |
| Eventual consistency | Availability/scale ↔ temporary stale data |

---

# 38. FINAL INTERVIEW ANSWER STRUCTURE

When you've finished designing:

> **“So the final architecture is…”**

```text
Client
 ↓
DNS / CDN
 ↓
Load Balancer
 ↓
Stateless API Servers
 ↓
Cache
 ↓
Database
 ↓
Queue → Workers
 ↓
Object Storage / External Services
```

Then say:

> “For scalability, I’ll horizontally scale stateless services, use caching and read replicas, and shard only when a single database becomes the bottleneck.”

> “For reliability, I’ll use health checks, redundancy, timeouts, retries with backoff, circuit breakers and backups.”

> “For security, I’ll use authentication, authorization, TLS, encryption, validation, rate limiting and secrets management.”

> “For observability, I’ll use metrics, centralized logs, distributed tracing and alerts.”

> “The main trade-offs are consistency vs availability, latency vs cost, and simplicity vs scalability.”

---

# 🧠 THE ONE THING TO MEMORIZE

When you get **ANY system design question**, mentally run:

```text
              SYSTEM DESIGN
                   │
        ┌──────────┴──────────┐
        ↓                     ↓
 REQUIREMENTS              SCALE
        │                     │
        └──────────┬──────────┘
                   ↓
                  API
                   ↓
             ┌─────┴─────┐
             ↓           ↓
          CACHE        SERVICE
             │           │
             └─────┬─────┘
                   ↓
                  DB
             ┌─────┴─────┐
             ↓           ↓
          QUEUE       STORAGE
             ↓
          WORKERS
                   
     THEN ALWAYS CHECK:
                   
 SCALE → CACHE → DB → ASYNC
 LATENCY → CONCURRENCY → LIMITS
 FAILURE → RETRY → TIMEOUT → CB
 SECURITY → AUTH → ENCRYPTION
 OBSERVABILITY → LOG → METRIC → TRACE
 COST → TRADE-OFFS
```

### **Interview mantra**

**Requirements → Estimate → API → Diagram → Data → Scale → Cache → DB → Async → Concurrency → Failure → Security → Monitoring → Trade-offs**

That is the **master checklist**. Most system-design questions are just different applications of the same building blocks.


