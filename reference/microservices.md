# Microservices — Complete Interview Cheat Sheet

This cheat sheet covers beginner to intermediate and commonly asked interview concepts, with simple definitions, tiny Java/Spring Boot examples, important rules, and confusing differences.

## 1. Microservices Fundamentals

### Core terminology

- Microservices: An architecture where an application is divided into small, independently deployable services.
- Service: A component responsible for a specific business capability, such as payments, orders, or users.
- Monolithic architecture: The application is built and deployed as one unit.
- Distributed system: Multiple independent processes communicate over a network to complete work.
- Business capability: A business function such as payment processing, order management, or inventory.
- Bounded context: A boundary within which a particular business model and its terminology have a clear meaning.
- Loose coupling: One service depends as little as possible on the internal details of another service.
- High cohesion: A service's responsibilities are closely related to one another.
- Independent deployment: A service can be released without rebuilding and deploying the entire application.
- Service autonomy: A service controls its own logic and, as far as practical, its data and deployment.
- Scalability: The ability to handle increased workload by adding resources.
- Resilience: The ability to continue operating or recover when parts of the system fail.
- Fault isolation: Preventing a failure in one component from spreading to others.
- Distributed monolith: Multiple services that are technically separate but tightly dependent on one another, so changing or deploying one often requires changing others.

### Example

An e-commerce application might contain:

Client / Frontend

API Gateway

Order Service

Payment Service

Inventory Service

User Service

Each service owns its business logic and can be deployed independently.

For example, the Order Service creates orders, the Payment Service processes payments, and the Inventory Service manages stock.

## 2. Monolith vs Microservices

### Important differences

| Feature          | Monolith                             | Microservices                                  |
| ---------------- | ------------------------------------ | ---------------------------------------------- |
| Deployment       | Usually one application              | Services deployed independently                |
| Codebase         | Often one codebase                   | Often multiple codebases                       |
| Scaling          | Often scale the whole application    | Scale individual services                      |
| Communication    | Usually in-process calls             | Network calls or messaging                     |
| Data             | Often shared database                | Prefer service-owned data                      |
| Failure handling | Internal failures can affect the app | Network and partial failures must be handled   |
| Complexity       | Simpler to start                     | More infrastructure and operational complexity |
| Testing          | Easier end-to-end setup initially    | Integration and distributed testing are harder |

- Modular monolith: One deployable application with clearly separated modules. It can be a better choice than microservices for a small team or product.
- Microservices are not always better: Use them when independent scaling, deployment, ownership, or fault isolation justifies their extra complexity.
- Microservices do not automatically mean faster: Network calls, retries, serialization, and coordination can make operations slower.
- Microservices do not guarantee availability: A service may still fail, and its dependencies may be unavailable.

### Interview question: When should you use microservices?

Use them when business domains are sufficiently independent, teams can own services end-to-end, and the organization can operate distributed systems reliably.

Avoid splitting an application into many services just because the codebase is large.

## 3. Service Design and Boundaries

### Subtopics

- Domain-Driven Design (DDD): A design approach that organizes software around business domains.
- Bounded context: Defines where a domain model applies; different contexts can use the same word with different meanings.
- Domain model: Represents business concepts and their rules.
- Aggregate: A group of domain objects treated as one consistency boundary.
- Aggregate root: The main object through which an aggregate is accessed and modified.
- Domain service: Contains domain logic that does not naturally belong to one entity.
- Business capability: A specific responsibility, such as billing or shipping.
- Service boundary: The line separating a service's responsibilities from other services.
- High cohesion: Related functionality belongs together.
- Low coupling: Changes within one service should minimally affect others.
- Shared database anti-pattern: Multiple services directly access the same tables, creating hidden dependencies.
- Chatty communication: Many small network calls are needed to complete one operation, increasing latency and failure risk.
- Distributed monolith: Services have separate deployments but remain tightly coupled through their APIs, shared data, or release requirements.

### How to identify a good service boundary

A good service usually owns a meaningful business capability, its rules, and its data.

Example:

- Order Service → order creation and order status.
- Payment Service → payment attempts, payment status, refunds.
- Inventory Service → stock reservation and availability.

Rule: Split by business responsibility, not simply by technical layers. Creating separate services for controllers, repositories, and utility classes is usually a poor boundary.

## 4. Communication Between Services

### Main communication types

- Synchronous communication: The caller waits for a response. Example: HTTP REST API call.
- Asynchronous communication: The sender can continue without waiting for the consumer to finish. Example: publishing an event to Kafka.
- Request-response: One service asks another service for a result.
- Message: A piece of data sent through a messaging system.
- Event: A record that something has happened, such as `OrderCreated`.
- Command: A request to perform an action, such as `ProcessPayment`.
- Message broker: Middleware that routes or stores messages between producers and consumers.
- Producer: The component that sends a message.
- Consumer: The component that receives and processes a message.
- Queue: Messages are generally assigned to a consumer for processing; competing consumers can share the workload.
- Publish-subscribe (Pub/Sub): A publisher sends an event that can be delivered to multiple subscribers.
- Latency: The time taken for an operation or request to complete.
- Throughput: The number of operations processed per unit of time.

### REST vs messaging

| REST / HTTP                              | Messaging                                                |
| ---------------------------------------- | -------------------------------------------------------- |
| Usually request-response                 | Often asynchronous                                       |
| Caller commonly waits                    | Producer can continue after publishing                   |
| Direct dependency on target availability | Broker may buffer messages                               |
| Good for queries and immediate responses | Good for events and background processing                |
| Timeout and retry handling required      | Duplicate delivery and consumer failures must be handled |

Important: Asynchronous communication does not guarantee that a message is processed successfully. Messages can be delayed, duplicated, or sent to a dead-letter queue.

### Example

An order is created:

1. Order Service saves the order.
2. It publishes `OrderCreated`.
3. Inventory Service reserves stock.
4. Payment Service initiates payment.
5. Other subscribers may send notifications or update analytics.

This avoids making the Order Service wait for every downstream operation, but it requires careful failure handling.

## 5. REST APIs in Microservices

### Subtopics

- REST: An architectural style for designing network APIs around resources.
- Resource: An entity exposed through an API, such as an order or customer.
- Endpoint: A URL and HTTP method used to access an API operation.
- HTTP method: Indicates the intended action, such as `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`.
- JSON: A common format for exchanging structured data.
- DTO (Data Transfer Object): An object used to transfer data between layers or across API boundaries.
- API contract: Defines the expected request, response, errors, and behavior of an API.
- Idempotency: Repeating the same request has the same intended effect as performing it once.
- Timeout: The maximum time a caller waits for a response.
- API versioning: Managing changes to an API without unexpectedly breaking existing clients.

### Important HTTP methods

| Method   | Typical purpose                | Idempotent?              |
| -------- | ------------------------------ | ------------------------ |
| `GET`    | Read a resource                | Yes                      |
| `POST`   | Create or trigger an operation | Not generally            |
| `PUT`    | Replace a resource             | Yes                      |
| `PATCH`  | Partially update a resource    | Depends on the operation |
| `DELETE` | Delete a resource              | Yes, by HTTP semantics   |

Idempotent does not mean the response must be identical every time. It means repeating the operation has the same intended effect.

### Common HTTP status codes

- `200 OK`: Request succeeded.
- `201 Created`: A resource was created.
- `202 Accepted`: Accepted for processing, but not necessarily completed.
- `204 No Content`: Successful response without a response body.
- `400 Bad Request`: Invalid request.
- `401 Unauthorized`: Authentication is missing or invalid.
- `403 Forbidden`: The caller is not permitted to perform the operation.
- `404 Not Found`: Resource or endpoint not found.
- `409 Conflict`: Request conflicts with current state.
- `422 Unprocessable Content`: Request is syntactically valid but fails semantic validation.
- `429 Too Many Requests`: Rate limit exceeded.
- `500 Internal Server Error`: Unexpected server error.
- `502 Bad Gateway`: Gateway received an invalid upstream response.
- `503 Service Unavailable`: Service is temporarily unable to handle the request.
- `504 Gateway Timeout`: Gateway did not receive an upstream response in time.

### API contract example

```
POST /api/orders
Content-Type: application/json

{
  "productId": 101,
  "quantity": 2
}
```

A successful synchronous creation could return `201 Created`. If the request merely schedules background processing, `202 Accepted` may be more appropriate.

### Common rules

- Validate incoming requests.
- Do not expose internal database entities unnecessarily.
- Use consistent error formats.
- Set reasonable timeouts in clients.
- Do not retry every error blindly.
- Use an idempotency key for operations such as payments where duplicate execution would be harmful.
- Keep API contracts backward-compatible where practical.

## 6. API Gateway

### Subtopics

- API Gateway: A single entry point that routes external requests to internal services.
- Routing: Directing a request to the correct service.
- Authentication: Verifying who the caller is.
- Authorization: Checking what the caller is allowed to do.
- Rate limiting: Restricting the number of requests within a period.
- Request aggregation: Combining results from multiple services into one response.
- TLS termination: Handling HTTPS encryption at the gateway.
- Cross-cutting concerns: Shared concerns such as logging, authentication, throttling, and request tracing.
- Gateway bottleneck: A gateway can become a performance or availability bottleneck if not designed and scaled properly.

### Example

```
Client
  |
  v
API Gateway
  |------ /users    -> User Service
  |------ /orders   -> Order Service
  |------ /payments -> Payment Service
```

### Why use a gateway if services already have APIs?

The gateway centralizes external access policies and hides internal service locations. Clients do not need to know every internal endpoint.

### What should not be placed in a gateway?

Avoid putting all business logic into it. Business rules should normally live in the service that owns that business capability.

Gateway vs Load Balancer

- A load balancer distributes traffic across multiple instances.
- An API gateway understands API routing and can apply policies such as authentication and rate limiting.
- They can overlap in functionality and can be used together.

## 7. Service Discovery and Load Balancing

### Subtopics

- Service discovery: Finding the current network location of a service instance.
- Service registry: A directory of service instances and their addresses.
- Client-side discovery: The caller obtains available instances and chooses one.
- Server-side discovery: A router or load balancer chooses the destination.
- Health check: Checks whether an instance is healthy enough to receive traffic.
- Load balancing: Distributes requests across multiple instances.
- Round robin: Sends requests through instances in sequence.
- Least connections: Prefers the instance with fewer active connections.
- Weighted routing: Sends different proportions of traffic to different instances.
- Service instance: One running copy of a service.
- Dynamic scaling: Adding or removing service instances as demand changes.

### Example

```
Order Service
      |
      v
Service Discovery
      |
      +---- Payment Instance A
      +---- Payment Instance B
      +---- Payment Instance C
```

The caller or routing layer selects an available instance.

### Important rules

- Do not hardcode instance IP addresses when instances can change.
- A healthy instance may still be overloaded or unable to complete a particular operation.
- Load balancing does not automatically provide fault tolerance; failed instances must be detected and removed from routing.
- Service discovery and load balancing are related but not identical.

## 8. Resilience and Fault Tolerance

This is one of the most important microservices interview topics.

### Core patterns

- Timeout: Stop waiting after a defined period instead of waiting indefinitely.
- Retry: Attempt a failed operation again.
- Exponential backoff: Increase the delay between retries.
- Jitter: Add randomness to retry delays to avoid many clients retrying simultaneously.
- Circuit breaker: Temporarily stop calling a dependency that is repeatedly failing.
- Fallback: Provide an alternative response or behavior when a dependency fails.
- Bulkhead: Isolate resources so one failing dependency does not consume everything.
- Rate limiting: Restrict request volume.
- Concurrency limit: Restrict the number of operations running simultaneously.
- Backpressure: Slow down or limit producers when consumers cannot keep up.
- Fail fast: Return an error quickly when continuing is unlikely to succeed.
- Graceful degradation: Keep essential functionality available while reducing nonessential functionality.
- Fault tolerance: Continue providing an acceptable level of service despite failures.
- Retry storm: A surge of retries that worsens an existing failure.

### Circuit breaker states

CLOSED

Requests flow normally; failures are monitored.

OPEN

Calls fail fast; the unhealthy dependency is not called normally.

HALF-OPEN

Limited test calls check whether recovery has occurred.

If the test calls succeed, the breaker can close; if they fail, it can reopen.

### Retry vs circuit breaker

| Retry                            | Circuit breaker                                         |
| -------------------------------- | ------------------------------------------------------- |
| Repeats an operation             | Temporarily blocks calls                                |
| Useful for transient failures    | Useful for repeated dependency failures                 |
| Can worsen overload if excessive | Helps prevent repeated calls to an unhealthy dependency |
| Needs attempt and delay limits   | Needs failure and recovery policies                     |

### Important retry rules

1. Set a timeout for every remote call.
2. Retry only when the error may be transient.
3. Use bounded retries and backoff with jitter.
4. Avoid retries at multiple layers that multiply the number of attempts.
5. Be careful retrying non-idempotent operations such as payment creation.
6. Use an idempotency key or deduplication mechanism when retrying could cause duplicate effects.

Example: If an HTTP client retries three times and its caller also retries three times, one user operation may trigger up to nine downstream attempts, depending on the retry configuration.

### Bulkhead vs circuit breaker

A circuit breaker stops calls to an unhealthy dependency. A bulkhead limits how much of your system's resources those calls can consume.

## 9. Database Per Service and Data Management

### Subtopics

- Database per service: Each service owns its data store or logically isolated data boundary.
- Data ownership: The owning service controls how its data is changed.
- Shared database: Multiple services directly depend on the same database or tables.
- Polyglot persistence: Different services use different database technologies when appropriate.
- Eventual consistency: Data across services may temporarily differ but can converge later.
- Strong consistency: Operations provide stronger guarantees about the visibility and ordering of updates.
- Replication: Keeping copies of data across database nodes.
- Read replica: A copy used to serve reads, depending on the database configuration.
- CQRS: Separating the model used to change data from the model used to query it.
- Materialized view: A stored representation of data prepared for faster reads.
- Data duplication: Keeping copies of selected data in different services for autonomy or performance.

### Why should every service own its data?

If multiple services modify the same tables, schema changes become risky and the services become tightly coupled. Service ownership allows internal data structures to change without forcing every consumer to change.

### Can one service access another service's database directly?

Prefer not to. The owning service should expose an API or publish events that allow others to obtain the data they need.

### Does database per service mean every service needs a separate database server?

No. Services can use the same database server or cluster while using separate databases, schemas, credentials, and access permissions. The key idea is ownership and controlled access, not necessarily separate physical hardware.

### Common mistake

Using a single shared database with unrestricted access across all services can make a supposedly independent architecture behave like a distributed monolith.

## 10. Distributed Transactions and the Saga Pattern

### Why distributed transactions are difficult

A single business operation may update multiple services, each with its own database. A normal database transaction cannot automatically guarantee that all those independent databases commit or roll back together.

### Subtopics

- ACID: Atomicity, Consistency, Isolation, and Durability; properties of database transactions.
- Distributed transaction: A transaction involving multiple independent resources or services.
- Two-Phase Commit (2PC): A protocol that coordinates participants through a prepare phase and a commit/rollback phase.
- Saga pattern: A business transaction split into local transactions, each with a possible compensating action.
- Local transaction: A transaction within one service's own data store.
- Compensating transaction: A business action that counteracts an earlier completed action.
- Orchestration: A central coordinator tells participating services which steps to perform.
- Choreography: Services react to events and trigger subsequent steps without one central coordinator.
- Eventual consistency: Temporary differences between service data are acceptable while the workflow progresses.
- Consistency boundary: The scope within which an update must satisfy its consistency requirements.

### Saga example: Order and payment

1\. Create order — Order Service

2\. Reserve stock — Inventory Service

3\. Charge payment — Payment Service

4\. Confirm order

If payment fails after stock reservation, the system might release the reserved stock and mark the order as failed.

- Compensation does not necessarily erase history.
- A refund is not identical to undoing a card charge instantly.
- Some operations cannot be perfectly reversed; compensation is a business-level correction.

### Orchestration vs choreography

| Orchestration                                    | Choreography                              |
| ------------------------------------------------ | ----------------------------------------- |
| A coordinator directs the steps                  | Services react to events                  |
| Workflow is explicit in one place                | Workflow is spread across services        |
| Easier to understand complex workflows centrally | Can reduce central coordination           |
| Coordinator can become too powerful or complex   | Event flows can become difficult to trace |

### Saga vs 2PC

- Saga: Uses separate committed local transactions and compensating actions; temporary inconsistency is possible.
- 2PC: Coordinates a distributed commit; participants may have to wait during coordination or failures.
- Use a saga for many long-running business workflows.
- Use a database transaction when the data change fits within one database and one transaction boundary.

## 11. Message Brokers, Kafka, and Event-Driven Architecture

### Core terminology

- Event-driven architecture (EDA): Services communicate by producing and consuming events.
- Event producer: Publishes events.
- Event consumer: Processes events.
- Message broker: Transfers messages between producers and consumers.
- Event schema: Defines the structure of an event.
- Event versioning: Manages changes to event structures over time.
- Consumer group: A group of consumers that coordinate to process partitions or messages.
- Partition: A subdivision of a Kafka topic that supports parallelism and ordering within that partition.
- Offset: A consumer's position in a Kafka partition.
- Topic: A named stream of records in Kafka.
- Broker: A Kafka server that stores and serves records.
- Replication factor: The number of copies maintained for a Kafka partition.
- Dead-letter queue (DLQ): A destination for messages that cannot be processed successfully after the configured handling attempts.
- Poison message: A message that repeatedly causes processing to fail.
- Consumer lag: How far a consumer is behind the latest available records.
- Replay: Processing stored events again.
- Eventual delivery: A message may arrive later than expected; systems must tolerate delays.

### Kafka vs RabbitMQ

| Apache Kafka                                           | RabbitMQ                                                   |
| ------------------------------------------------------ | ---------------------------------------------------------- |
| Distributed event and log platform                     | Message broker supporting multiple messaging patterns      |
| Stores ordered records in partitions                   | Supports queues, exchanges, and routing                    |
| Records can often be replayed within retention         | Queue behavior depends on configuration and acknowledgment |
| Common for event streams and high-throughput pipelines | Common for task queues and flexible routing                |
| Ordering is per partition                              | Ordering depends on queue and consumer setup               |

Neither is universally better. Choose based on ordering, replay, routing, delivery requirements, throughput, and operational needs.

### Delivery guarantees

- At-most-once: A message is delivered zero or one time; it can be lost.
- At-least-once: A message is delivered one or more times; duplicates are possible.
- Exactly-once processing: The system provides a defined guarantee against duplicate effects within a specified processing boundary.
- Idempotent consumer: Processing the same message repeatedly has the same intended business effect.
- Deduplication: Identifying and ignoring messages already processed.

Important interview point: Kafka's exactly-once features do not automatically make arbitrary external database writes, payment APIs, and other side effects globally exactly-once.

### Tiny event example

```
{
  "eventId": "evt-123",
  "eventType": "OrderCreated",
  "orderId": "ord-456",
  "version": 1
}
```

A consumer can use `eventId` to detect duplicate processing. The consumer should persist its deduplication record and business update safely, often in the same database transaction.

### Outbox pattern

Problem: A service updates its database successfully but crashes before publishing the event.

Solution: Save both the business update and an event record in the same local database transaction. A separate publisher sends the event to the broker.

```
Local database transaction:
  1. Save order
  2. Save OrderCreated in outbox

Publisher:
  3. Read outbox
  4. Publish event
  5. Mark event as published
```

The publisher may publish an event more than once, so consumers should still be idempotent.

### Transactional inbox

An inbox records incoming message identifiers alongside the consumer's business update. This helps prevent duplicate effects when message delivery is repeated.

## 12. Consistency, CAP Theorem, and Distributed Systems

### Subtopics

- Consistency: The guarantees about when updates become visible and how concurrent operations behave.
- Availability: A system continues responding to requests.
- Partition tolerance: The system continues operating despite communication failures between parts of the distributed system.
- CAP theorem: During a network partition, a distributed data system cannot guarantee both linearizable consistency and availability for every request.
- Network partition: Nodes cannot reliably communicate across a network boundary.
- Linearizability: Each operation appears to take effect atomically at a point between its invocation and response, respecting real-time ordering.
- Eventual consistency: Replicas can temporarily disagree but converge if updates stop and propagation succeeds.
- Read-your-writes consistency: A client can see its own successful updates.
- Causal consistency: Causally related operations are observed in a consistent order.
- Clock skew: Different computers' clocks disagree.
- Race condition: The result depends on the timing or ordering of concurrent operations.
- Split brain: Multiple parts of a system incorrectly act as the authoritative leader or owner.
- Quorum: A required number of participants or replicas needed for an operation.

### CAP theorem made simple

Suppose two database nodes lose contact with each other.

- A CP-style choice may reject or delay some operations to preserve consistency.
- An AP-style choice may continue accepting operations, allowing temporary disagreement.

Here, C and A describe guarantees during a partition; P means tolerating the partition. Real systems have nuanced guarantees, so do not describe every database as simply “CP” or “AP” for all conditions.

### Strong vs eventual consistency

| Strong consistency                                          | Eventual consistency                      |
| ----------------------------------------------------------- | ----------------------------------------- |
| Reads have stronger freshness guarantees                    | Reads may temporarily return stale data   |
| Useful when correctness requires current state              | Useful when temporary delay is acceptable |
| May require coordination or reject requests during failures | Can improve availability in some designs  |
| Often more coordination overhead                            | Requires handling delayed propagation     |

Example: A bank balance or inventory reservation may require strict safeguards against overselling. A product-review count or analytics dashboard can often tolerate delayed updates.

### Important rule

Eventual consistency does not mean inconsistent forever. It assumes updates eventually propagate and conflicts are resolved according to the system's rules.

## 13. Caching in Microservices

### Subtopics

- Cache: Stores reusable data for faster access.
- Cache hit: Requested data is found in the cache.
- Cache miss: Requested data is absent and must be fetched elsewhere.
- TTL (Time to Live): How long cached data remains valid before expiry.
- Cache invalidation: Removing or refreshing stale cached data.
- Cache-aside: The application reads the cache first and loads data from the source on a miss.
- Write-through: Data is written to the cache and backing store as part of the write path.
- Write-behind: The cache accepts writes and updates the backing store later.
- Distributed cache: Cache data is shared across multiple application instances.
- Cache stampede: Many requests simultaneously reload the same expired or missing data.
- Cache penetration: Repeated requests for nonexistent data bypass the cache and hit the source.
- Cache avalanche: Many cached entries expire around the same time, causing a surge in source requests.

### Cache-aside example

```
Product product = cache.get(id);

if (product == null) {
    product = repository.findById(id);
    cache.put(id, product);
}
```

This is illustrative; real code must handle missing records, expiry, errors, and concurrency.

### Redis in microservices

- Redis: An in-memory data store often used for caching, counters, locks, and other fast data operations.
- TTL: Useful for expiring cached values and temporary keys.
- Atomic operation: An operation that executes indivisibly relative to competing operations within its defined scope.
- Distributed lock: Coordinates access to a resource across processes; it requires careful expiry and failure handling.
- Cache consistency: The process of keeping cached values sufficiently aligned with authoritative data.

### Important rules

- A cache is not automatically the source of truth.
- Cached data can become stale.
- Cache invalidation is often harder than cache lookup.
- Use TTLs, explicit invalidation, or a combination depending on requirements.
- Do not assume a read followed by a write is atomic simply because Redis is used.
- Do not rely on a simple distributed lock for correctness unless its failure and fencing behavior are understood.

## 14. Security in Microservices

### Subtopics

- Authentication: Verifies identity.
- Authorization: Determines permitted actions.
- JWT (JSON Web Token): A token format that can carry signed claims.
- OAuth 2.0: An authorization framework for granting limited access.
- OpenID Connect (OIDC): An identity layer built on OAuth 2.0.
- Access token: A credential used to access protected resources.
- Refresh token: A credential used to obtain new access tokens under an authorization system's rules.
- mTLS (Mutual TLS): TLS where both communicating parties authenticate using certificates.
- Service-to-service authentication: Verifying one service's identity to another.
- Least privilege: Give each service only the permissions it needs.
- Secrets management: Secure storage and rotation of passwords, API keys, and certificates.
- Encryption in transit: Protecting data as it moves across a network.
- Encryption at rest: Protecting stored data.
- Zero-trust security: Do not automatically trust a request just because it comes from an internal network.
- Rate limiting: Limits request volume and can help mitigate abuse.
- Audit logging: Records security-relevant actions.

### JWT authentication flow

1. A user authenticates with an identity provider or authentication service.
2. The client obtains an access token.
3. The client sends it in the `Authorization: Bearer ...` header.
4. The receiving service validates the token's signature and relevant claims.
5. The service checks authorization before performing the action.

### Important rules

- A JWT is typically signed, not encrypted; its payload should not be assumed secret.
- Check token expiration, issuer, audience, and allowed signing algorithms as appropriate.
- A valid token does not automatically grant access to every resource.
- Do not store secrets in source code or browser-exposed configuration.
- Internal services still need appropriate authentication and authorization.
- Use HTTPS and secure credential handling.
- Avoid logging access tokens, passwords, or sensitive personal data.

### API key vs JWT

- API key: Identifies or authorizes a client using a shared secret-like credential; capabilities depend on implementation.
- JWT: A token format containing claims, usually signed.
- Neither is automatically secure merely because of its format. Expiration, scope, storage, validation, and revocation matter.

## 15. Observability: Logging, Metrics, and Tracing

### Subtopics

- Observability: Understanding a system's internal behavior from its outputs.
- Logging: Records individual events and diagnostic information.
- Metrics: Numerical measurements collected over time.
- Distributed tracing: Tracks one request across multiple services.
- Trace: The end-to-end record of a request's journey.
- Span: One operation within a trace, such as an HTTP call or database query.
- Correlation ID: An identifier used to connect related log entries.
- Trace ID: An identifier shared by spans belonging to the same trace.
- Structured logging: Writing logs as fields, often JSON, instead of unstructured text.
- OpenTelemetry: A framework and set of standards for generating and exporting telemetry.
- Alerting: Notifying operators when defined conditions are met.
- Dashboard: A visual summary of system metrics and health.
- SLO (Service Level Objective): A target for a service's reliability or performance.
- SLI (Service Level Indicator): A measurement used to evaluate service behavior.
- SLA (Service Level Agreement): An agreement defining service commitments, often with consequences for violations.
- Error rate: The proportion of requests that fail.
- Latency percentile: A measure such as p95 latency, below which 95% of measured requests complete.
- Throughput: Requests or operations handled per unit of time.

### The three pillars

| Type    | Answers             | Example                                                   |
| ------- | ------------------- | --------------------------------------------------------- |
| Logs    | What happened?      | Payment API returned a timeout                            |
| Metrics | How much/how often? | 8% of payment calls failed                                |
| Traces  | Where did time go?  | Order Service spent 2 seconds waiting for Payment Service |

### Example trace

```
Trace: request-123
  API Gateway        20 ms
  Order Service      40 ms
  Inventory Service  80 ms
  Payment Service  1500 ms
```

The trace helps identify Payment Service as the main source of latency.

### Important rules

- Propagate trace context across service calls.
- Use correlation IDs to connect logs where useful.
- Avoid high-cardinality metric labels, such as unique user IDs.
- Do not log sensitive information.
- A successful HTTP response does not always mean a business operation succeeded.
- Monitor user-facing outcomes, not just whether servers are running.

## 16. Deployment, Containers, and Kubernetes

### Subtopics

- Container: A packaged application environment that shares the host operating system's kernel.
- Docker image: A packaged, versioned template used to create containers.
- Docker container: A running instance of an image.
- Container orchestration: Managing deployment, scaling, networking, and recovery of containers.
- Kubernetes: A platform for orchestrating containerized applications.
- Pod: Kubernetes' smallest deployable unit, containing one or more containers.
- Deployment: A Kubernetes resource that manages replicated application pods and rolling updates.
- Service (Kubernetes): A stable network endpoint for accessing a group of pods.
- Ingress: A Kubernetes resource for HTTP(S) routing into a cluster; actual routing requires a suitable controller.
- ConfigMap: Stores non-secret configuration in Kubernetes.
- Secret: Stores sensitive configuration data; proper access controls and encryption configuration are still necessary.
- Readiness probe: Checks whether an instance should receive traffic.
- Liveness probe: Checks whether an instance should be restarted.
- Startup probe: Gives a slow-starting application time to initialize before liveness checks take effect.
- Horizontal scaling: Increasing the number of running instances.
- Rolling deployment: Gradually replacing old instances with new ones.
- Rollback: Returning to a previous deployment version.
- Autoscaling: Adjusting instance count or resources based on configured signals.

### Docker vs Kubernetes

- Docker provides tools to build and run containers.
- Kubernetes manages containerized applications across a cluster.
- Kubernetes does not replace the need for application-level timeouts, retries, or resilience.

### Deployment strategies

- Rolling deployment: Gradually replaces old instances.
- Blue-green deployment: Maintains two environments and switches traffic to the new one.
- Canary deployment: Sends a small portion of traffic to a new version before expanding rollout.
- Feature flag: Enables or disables functionality without requiring a new deployment.
- CI (Continuous Integration): Frequently integrates and tests code changes.
- CD (Continuous Delivery/Deployment): Automates preparation for release or release itself, depending on the pipeline.

### Important rules

- A container can restart without fixing the underlying bug.
- Readiness and liveness probes have different purposes.
- Stateless services are easier to scale horizontally.
- Store persistent data in appropriate storage, not only in a container's writable layer.
- Do not assume Kubernetes automatically discovers application-level business failures.

## 17. Configuration and Environment Management

### Subtopics

- Externalized configuration: Keep environment-specific settings outside application code.
- Environment variables: Supply configuration values through the process environment.
- Secret: A sensitive value such as a database password or API key.
- Configuration server: A central system for distributing application configuration.
- Configuration drift: Different environments or instances unexpectedly use different settings.
- Feature flag: Controls whether a capability is enabled.
- Service endpoint: The address used to access a service.
- Immutable deployment artifact: The same built artifact is promoted across environments instead of rebuilding different versions for each environment.

### Example: Spring Boot

```
server.port=8080
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

The application reads database settings from the environment rather than hardcoding credentials.

### Important rules

- Keep secrets out of source control.
- Validate required configuration at startup.
- Use different settings for development, testing, and production.
- Do not change a service's public API unexpectedly just because an environment changes.
- Use controlled secret rotation and configuration updates.

## 18. Testing Microservices

### Subtopics

- Unit testing: Tests a small unit of code in isolation.
- Integration testing: Tests whether components work together, such as an application with a database.
- Contract testing: Verifies that a consumer's expectations match a provider's API contract.
- Consumer-driven contract testing: Consumers define expectations that providers verify.
- End-to-end testing (E2E): Tests a complete business flow across multiple components.
- Component testing: Tests a service as a unit, often with external dependencies controlled or simulated.
- Smoke testing: Checks whether key functionality works after deployment.
- Load testing: Measures behavior under expected or increased load.
- Stress testing: Tests behavior beyond normal capacity.
- Chaos engineering: Deliberately introduces failures to test resilience.
- Test double: A replacement used in tests, such as a mock, stub, or fake.
- Mock: An object used to simulate dependency behavior and sometimes verify interactions.
- Test environment: An environment configured to execute particular tests.

### Testing pyramid

E2E tests

Few, slower

Integration / contract

Some

Unit tests

Many, fast

### Why contract testing matters

Suppose Order Service expects Payment Service to return `paymentStatus`, but Payment Service changes the field to `status`. A contract test can detect this incompatibility before production.

### Important rules

- Unit tests alone cannot prove that remote services integrate correctly.
- E2E tests are valuable but can be slow and fragile.
- Test timeouts, retries, duplicate messages, and dependency failures.
- Avoid depending on live production services in routine automated tests.
- Test backward compatibility when changing API or event schemas.

## 19. Common Microservices Design Patterns

### Subtopics

- API Gateway pattern: Provides a central entry point for external clients.
- Service Discovery pattern: Finds available service instances dynamically.
- Saga pattern: Coordinates a business workflow through local transactions and compensation.
- Circuit Breaker pattern: Stops repeated calls to an unhealthy dependency.
- Bulkhead pattern: Isolates resource pools or workloads.
- Retry pattern: Reattempts eligible failed operations.
- Timeout pattern: Bounds waiting time.
- Strangler Fig pattern: Gradually replaces parts of a legacy application with newer services.
- Sidecar pattern: Runs a supporting component alongside an application instance.
- Backend for Frontend (BFF): Provides a backend tailored to a particular client type.
- CQRS: Separates command and query models.
- Event Sourcing: Stores changes as a sequence of events from which state can be reconstructed.
- Outbox pattern: Reliably coordinates local database updates with event publication.
- Inbox pattern: Helps consumers deduplicate incoming messages.
- Anti-corruption layer: Translates between models to protect one domain from another domain's design.
- Bulkhead isolation: Limits how far a failure can spread.
- Leader election: Selects one participant to act as leader for a coordinated task.

### Confusing patterns

| Pattern               | Main purpose                                          |
| --------------------- | ----------------------------------------------------- |
| Saga                  | Multi-service business transaction                    |
| Outbox                | Avoid losing events after database commits            |
| CQRS                  | Separate reads from writes                            |
| Event Sourcing        | Store state changes as events                         |
| Strangler Fig         | Migrate a legacy system gradually                     |
| BFF                   | Tailor backend APIs to a specific frontend            |
| Anti-corruption layer | Protect a domain from external model complexity       |
| Sidecar               | Add supporting functionality alongside an application |

### CQRS vs Event Sourcing

- CQRS separates the models used for commands and queries. It does not require event sourcing.
- Event sourcing stores a sequence of events as the authoritative record of changes. It does not require separate read and write models.
- They can be used together, but they solve different problems.

### Strangler Fig example

```
Old monolith
    |
    +-- Old billing functionality
    |
    +-- New Billing Service
```

Traffic is gradually redirected to the new Billing Service until the old implementation can be retired.

## 20. Microservices with Java and Spring Boot

### Common technologies

- Spring Boot: Simplifies creating standalone Java applications and services.
- Spring Web: Supports HTTP APIs and REST controllers.
- Spring Data JPA: Simplifies database access using JPA.
- Spring Security: Provides authentication and authorization capabilities.
- Spring Cloud: Provides tools and integrations for common distributed-system patterns.
- Spring Cloud Gateway: Implements API gateway functionality.
- OpenFeign: Provides declarative HTTP clients for calling remote services.
- WebClient: A reactive HTTP client; it can be used for nonblocking HTTP calls.
- RestClient: A synchronous HTTP client in modern Spring Framework versions.
- Resilience4j: Provides resilience components such as circuit breakers, retries, and rate limiters.
- Spring for Apache Kafka: Integrates Kafka producers and consumers with Spring.
- Micrometer: Provides instrumentation for metrics and observability.
- Actuator: Exposes application management and monitoring endpoints.
- Eureka: A service registry commonly associated with Spring Cloud Netflix.
- Config Server: Provides centralized external configuration through Spring Cloud Config.

These are options, not a mandatory stack. Modern deployments can use Kubernetes service discovery and other infrastructure instead of Eureka.

### Simple REST service example

```
@RestController
@RequestMapping("/orders")
public class OrderController {

    @GetMapping("/{id}")
    public String getOrder(@PathVariable Long id) {
        return "Order ID: " + id;
    }
}
```

This exposes `GET /orders/{id}`. In a real service, the controller would normally call a service layer and return a structured DTO.

### Calling another service

```
@Service
public class OrderService {

    private final RestClient restClient;

    public OrderService(RestClient.Builder builder) {
        this.restClient = builder
                .baseUrl("http://payment-service")
                .build();
    }

    public String getPayment(Long orderId) {
        return restClient.get()
                .uri("/payments/{id}", orderId)
                .retrieve()
                .body(String.class);
    }
}
```

This is an illustrative synchronous HTTP call. In a real deployment, `payment-service` must resolve to a reachable address, and the client needs suitable timeouts, error handling, and authentication. The example does not implement those policies.

### Spring Boot vs Spring Cloud

| Spring Boot                                                | Spring Cloud                                                |
| ---------------------------------------------------------- | ----------------------------------------------------------- |
| Builds and runs an application                             | Adds integrations and patterns for distributed systems      |
| Configuration, auto-configuration, embedded server support | Gateway, configuration, discovery, and related integrations |
| Can be used without Spring Cloud                           | Commonly used with Spring Boot                              |

Important: Spring Cloud does not automatically make an application a microservices architecture. The architecture depends on service boundaries, data ownership, communication, deployment, and operational practices.

### Common annotations and terminology

- `@RestController`: Defines a controller whose methods return response data by default.
- `@RequestMapping`: Maps requests to a controller or method.
- `@GetMapping`: Maps HTTP GET requests.
- `@PostMapping`: Maps HTTP POST requests.
- `@Service`: Marks a class as a Spring-managed service component.
- `@Repository`: Marks a persistence component and supports persistence exception translation.
- `@Transactional`: Defines transaction behavior through Spring's transaction infrastructure.
- `@Configuration`: Declares a source of Spring bean definitions.
- `@Bean`: Registers an object returned by a method as a Spring bean.
- `@Value`: Injects a configuration value.
- `@ConfigurationProperties`: Binds external configuration to a typed object.
- `@SpringBootApplication`: Combines key Spring Boot configuration, component scanning, and auto-configuration annotations.

### Important Spring transaction rule

A standard `@Transactional` transaction normally covers resources managed by the configured transaction manager. It does not automatically make HTTP calls to other microservices part of the same atomic transaction.

If Order Service calls Payment Service, a local rollback in Order Service cannot automatically reverse a successful payment. Use business compensation, such as a refund, where appropriate.

## 21. Performance and Scalability

### Subtopics

- Vertical scaling: Adding more CPU, memory, or other resources to one machine.
- Horizontal scaling: Adding more instances of a service.
- Stateless service: Does not depend on local in-memory session state to process the next request.
- Stateful service: Maintains state that affects subsequent operations.
- Connection pooling: Reuses connections instead of creating a new connection for every operation.
- Thread pool: Reuses a bounded set of threads to execute tasks.
- Asynchronous processing: Executes work without requiring the caller to wait for the entire operation.
- Batching: Processes multiple records or operations together to reduce overhead.
- Pagination: Returns results in smaller portions.
- N+1 query problem: One query loads a collection, followed by an additional query for each item.
- Backpressure: Prevents producers from overwhelming consumers.
- Resource exhaustion: Occurs when resources such as threads, memory, connections, or file descriptors are depleted.

### Important rules

- Horizontal scaling works best when requests can be handled independently.
- Local in-memory sessions can cause problems when requests reach different instances; external session storage or stateless authentication can help.
- More threads do not always mean better performance.
- Async processing is not automatically faster; it introduces coordination and error-handling complexity.
- Profile the actual bottleneck before scaling.
- A service's database connection pool must be sized with the database's total connection capacity in mind.

### Throughput vs latency

- Latency: How long one request takes.
- Throughput: How many requests are completed per unit of time.
- Concurrency: How many operations are in progress simultaneously.
- Capacity: The workload a system can sustain under defined conditions.

A system can have high throughput while individual requests have high latency.

## 22. Common Microservices Interview Questions

### Q1. Why do we need microservices if a monolith already works?

Microservices allow teams to deploy, scale, and own business capabilities independently. The trade-off is increased network, data-consistency, testing, and operational complexity.

### Q2. Should each microservice have its own database?

Each service should own its data boundary. Separate physical database servers are not mandatory, but unrestricted cross-service table access should be avoided.

### Q3. How do microservices communicate?

Commonly through synchronous HTTP APIs or asynchronous messaging using a broker such as Kafka or RabbitMQ. The choice depends on whether the caller needs an immediate response, the required coupling, and the delivery guarantees.

### Q4. What happens if one service goes down?

Calls to it may fail or time out. Use appropriate timeouts, bounded retries, circuit breakers, fallbacks where safe, and monitoring; do not assume every failure can be hidden.

### Q5. How do you handle a transaction across multiple services?

Use a saga with local transactions and compensating actions when the workflow spans independent services. A local `@Transactional` annotation does not automatically provide a global transaction.

### Q6. How do you prevent duplicate payment processing?

Use an idempotency key, persist payment request status, enforce suitable uniqueness constraints, and make retries safe. A repeated request should not create another charge.

### Q7. What if a database update succeeds but publishing an event fails?

Use the transactional outbox pattern. Save the business change and event record in one local database transaction, then publish the event asynchronously.

### Q8. How do you prevent cascading failures?

Set timeouts, use bounded retries and circuit breakers, isolate resource pools with bulkheads, and limit incoming work. Monitor the dependency chain to detect failures early.

### Q9. How do you maintain data consistency?

Use local transactions for each service's own data and choose between synchronous coordination, sagas, and asynchronous events based on business requirements. Handle duplicate and delayed messages explicitly.

### Q10. How do you debug a request across many services?

Use distributed tracing, trace IDs, structured logs, and service metrics. These help identify which dependency failed or contributed the most latency.

### Q11. What is the difference between service discovery and an API gateway?

Service discovery finds available service instances. An API gateway provides an entry point for requests and can apply routing and API policies.

### Q12. What is the difference between scaling and load balancing?

Scaling changes the available capacity, such as adding instances. Load balancing distributes requests among available instances.

### Q13. Why is a shared database considered an anti-pattern?

Services become dependent on the same schema and tables. One service's changes can break another service, making independent deployment harder.

### Q14. Is asynchronous communication always better?

No. Asynchronous messaging can reduce direct dependency and support background workflows, but it adds delivery, ordering, duplication, and debugging challenges. Use synchronous calls when an immediate result is genuinely required.

### Q15. What is the difference between orchestration and choreography?

Orchestration uses a coordinator to direct workflow steps. Choreography lets services react to events and initiate subsequent steps.

### Q16. What is the difference between retry and fallback?

Retry attempts the operation again. Fallback provides an alternative behavior or response when the operation cannot succeed.

### Q17. What is the difference between availability and reliability?

Availability measures whether a service is usable when needed. Reliability concerns whether it continues to behave correctly over time; a service can be reachable but still return incorrect results.

### Q18. Can two services share the same code library?

Yes, but shared libraries should generally contain stable technical utilities or contracts, not tightly couple the business logic and release cycles of different services.

### Q19. How do you deploy a microservice without downtime?

Use a suitable rolling, blue-green, or canary deployment strategy, with readiness checks, backward-compatible API and database changes, and safe traffic switching. Zero downtime is a goal, not an automatic guarantee.

### Q20. How do you decide whether to create a new microservice?

Create one when the business responsibility has a clear boundary and independent ownership, deployment, scaling, or reliability provides real value. Avoid splitting services so finely that every operation requires many remote calls.

## 23. Important Differences — Quick Revision

| Concept A          | Concept B            | Remember                                                                      |
| ------------------ | -------------------- | ----------------------------------------------------------------------------- |
| Monolith           | Microservices        | One deployable unit vs independently deployable services                      |
| REST               | Messaging            | Request-response vs message-based communication                               |
| API Gateway        | Load Balancer        | API policies and routing vs traffic distribution                              |
| Service Discovery  | Load Balancing       | Find instances vs distribute requests                                         |
| Timeout            | Retry                | Stop waiting vs attempt again                                                 |
| Retry              | Circuit Breaker      | Repeat calls vs temporarily stop calls                                        |
| Circuit Breaker    | Bulkhead             | Stop calls to a failing dependency vs isolate resources                       |
| Authentication     | Authorization        | Who are you? vs what can you do?                                              |
| Strong Consistency | Eventual Consistency | Stronger freshness guarantees vs possible temporary staleness                 |
| Saga               | 2PC                  | Local transactions and compensation vs coordinated distributed commit         |
| Orchestration      | Choreography         | Central coordinator vs event-driven collaboration                             |
| CQRS               | Event Sourcing       | Separate read/write models vs event-based authoritative history               |
| Outbox             | Inbox                | Reliable event publication vs deduplicating consumption                       |
| Logs               | Metrics              | Individual events vs numerical measurements                                   |
| Logs               | Traces               | Diagnostic records vs end-to-end request journey                              |
| Vertical Scaling   | Horizontal Scaling   | Bigger machine vs more instances                                              |
| Liveness           | Readiness            | Should restart? vs should receive traffic?                                    |
| Queue              | Topic                | Work distribution vs named event stream; exact behavior depends on technology |
| Idempotency        | Deduplication        | Repeated effect is safe vs recognizing repeated messages                      |
| Deployment         | Scaling              | Releasing a version vs changing available capacity                            |

## 24. Must-Remember Rules and Common Mistakes

- Microservices are an architectural choice, not simply multiple Spring Boot applications.
- Each service should have a clear business responsibility and own its data.
- A network call can fail even when both services are running.
- Always set appropriate timeouts for remote calls.
- Retries need limits, backoff, and idempotency safeguards.
- Circuit breakers and bulkheads solve different problems.
- Kafka delivery does not automatically make external business effects exactly-once.
- An outbox solves reliable publication, not every duplication problem.
- A saga is not a single ACID transaction spanning all services.
- Eventual consistency requires handling stale data and delayed events.
- A JWT is not necessarily encrypted, and authentication does not imply authorization.
- An API gateway should not become the home of all business logic.
- Kubernetes can restart containers, but it cannot automatically fix application bugs.
- Monitoring should cover latency, traffic, errors, and resource saturation.
- Microservices increase operational complexity; they do not automatically improve performance.
- Backward-compatible API, event, and database changes make independent deployments safer.
- Test service contracts and failure scenarios, not only successful requests.
- Use a modular monolith when it meets the requirements more simply.

## 25. Final One-Minute Revision

## The 12 concepts to memorize first

1. Service boundaries: Split by business capability and bounded context.
2. Communication: HTTP for immediate responses; messaging for asynchronous workflows.
3. API Gateway: Central entry point for routing and cross-cutting API policies.
4. Service discovery: Finds available service instances.
5. Resilience: Timeouts, bounded retries, circuit breakers, and bulkheads.
6. Database ownership: Each service controls its own data boundary.
7. Saga: Coordinates business transactions across services using local transactions and compensation.
8. Kafka: Topics, partitions, offsets, consumer groups, and delivery guarantees.
9. Outbox and idempotency: Reliable event publication and safe duplicate handling.
10. Consistency: Strong vs eventual consistency; CAP during network partitions.
11. Observability: Logs, metrics, and distributed traces.
12. Deployment: Containers, Kubernetes, health checks, rolling releases, and scaling.

Best interview strategy: When asked to design microservices for an order-payment-inventory workflow, explain the service boundaries first, then communication, database ownership, failure handling, transaction consistency, idempotency, and monitoring. This connects most of the important concepts into one practical answer.

