# Fundamentals

## What microservices are ⭐

An architecture where one application is split into small, independently deployable services, each owning a specific business capability (payments, orders, inventory). A monolith is the opposite: built and deployed as one unit.

- Each service owns its business logic and, as far as practical, its own data and deployment.
- They run as a distributed system: separate processes talking over a network.
- Aim for **loose coupling** (a service barely depends on another's internals) and **high cohesion** (its responsibilities belong together).

A typical e-commerce shape: Client -> API Gateway -> Order, Payment, Inventory, User services. Order Service creates orders, Payment Service charges, Inventory Service tracks stock, each deployable on its own.

> Remember: Microservices = small services split by business capability, deployed independently.

## Monolith vs microservices ⭐

| Aspect | Monolith | Microservices |
| --- | --- | --- |
| Deployment | One application | Services deployed independently |
| Scaling | Scale the whole app | Scale individual services |
| Communication | In-process calls | Network calls or messaging |
| Data | Often one shared database | Service-owned data |
| Failure | Internal failures affect the app | Network and partial failures to handle |
| Start-up cost | Simpler to start | More infra and operational complexity |

- A **modular monolith** (one deployable with clearly separated modules) is often the better choice for a small team or product.
- A **distributed monolith** is the trap: services are technically separate but so tightly dependent that changing one forces changes to others. Worst of both worlds.

> Remember: Fewer moving parts is a feature. Reach for microservices only when the complexity buys you something.

## When to use them

Use microservices when:

- Business domains are genuinely independent.
- Teams can own services end to end.
- The organisation can operate distributed systems reliably.

Do **not** split just because the codebase is large. Microservices do not automatically mean faster (network hops, retries, serialization add cost) and do not guarantee availability (any service or its dependency can fail).

> Remember: Microservices are an organisational and operational choice, not just "many Spring Boot apps".

## Service boundaries and DDD ⭐

Draw boundaries around **business capabilities**, not technical layers. Splitting into controller-service, repository-service, util-service is a poor boundary.

Key Domain-Driven Design terms:

- **Bounded context:** where a particular model and its terms have one clear meaning. The same word can mean different things in different contexts.
- **Aggregate:** a group of domain objects treated as one consistency boundary; the **aggregate root** is the entry point for changes.
- **Domain service:** domain logic that does not fit one entity.

A good service owns a meaningful capability, its rules, and its data:

- Order Service -> order creation and status
- Payment Service -> payment attempts, status, refunds
- Inventory Service -> stock reservation and availability

Anti-patterns to avoid: the **shared database** (services touch the same tables, creating hidden coupling) and **chatty communication** (one operation needs many small cross-service calls).

> Remember: One service = one business capability + its rules + its data.

# Communication

## Synchronous vs asynchronous ⭐

- **Synchronous:** the caller waits for a response (e.g. an HTTP REST call).
- **Asynchronous:** the sender continues without waiting (e.g. publishing an event to Kafka).

Related words: a **command** requests an action (`ProcessPayment`); an **event** records that something happened (`OrderCreated`); a **message broker** routes messages between a **producer** and a **consumer**. A **queue** gives each message to one of competing consumers; **pub/sub** delivers an event to many subscribers.

| REST / HTTP | Messaging |
| --- | --- |
| Request-response | Often asynchronous |
| Caller waits | Producer continues after publishing |
| Direct dependency on target being up | Broker can buffer messages |
| Good for queries, immediate answers | Good for events and background work |
| Handle timeouts and retries | Handle duplicates and consumer failures |

Async is not "fire and forget it worked": messages can be delayed, duplicated, or land in a dead-letter queue.

Example event flow: Order Service saves the order and publishes `OrderCreated`; Inventory reserves stock, Payment starts payment, others send notifications. The order flow does not block on every downstream step, but each consumer must handle failure.

> Remember: Sync when you need the answer now; async to decouple and absorb load.

## REST APIs ⭐

REST exposes **resources** (an order, a customer) at **endpoints** (a URL + HTTP method), usually exchanging JSON **DTOs**. The **API contract** defines request, response, errors, and behaviour.

| Method | Purpose | Idempotent? |
| --- | --- | --- |
| `GET` | Read | Yes |
| `POST` | Create or trigger | No (generally) |
| `PUT` | Replace | Yes |
| `PATCH` | Partial update | Depends |
| `DELETE` | Delete | Yes (by semantics) |

**Idempotent** means repeating the request has the same intended effect, not the same response body.

Status codes worth knowing: `200` OK, `201` Created, `202` Accepted (processing later), `204` No Content; `400` Bad Request, `401` Unauthorized, `403` Forbidden, `404` Not Found, `409` Conflict, `422` Unprocessable, `429` Too Many Requests; `500` Server Error, `502` Bad Gateway, `503` Unavailable, `504` Gateway Timeout.

Rules: validate input, don't expose internal entities, use consistent error formats, set client timeouts, don't retry blindly, keep contracts backward-compatible, and use an **idempotency key** for operations like payments where a duplicate would be harmful.

> Remember: Design around resources and contracts; make unsafe-to-repeat operations idempotent.

## API Gateway ⭐

A single entry point that routes external requests to internal services and centralises cross-cutting concerns: routing, authentication, authorization, rate limiting, TLS termination, request aggregation.

```
Client -> API Gateway
            |-- /users    -> User Service
            |-- /orders   -> Order Service
            |-- /payments -> Payment Service
```

- **Why, if services already have APIs?** It centralises external access policy and hides internal locations, so clients need not know every endpoint.
- **What not to put in it:** business rules. Those belong in the owning service. A gateway must not become a bottleneck or a second monolith.

**Gateway vs load balancer:** a load balancer spreads traffic across instances; a gateway understands API routing and applies policies (auth, rate limiting). They overlap and are often used together.

> Remember: The gateway is the front door for policy and routing, not for business logic.

# Service Discovery and Config

## Service discovery and load balancing ⭐

**Service discovery** finds the current network location of a service instance, using a **service registry** (a directory of instances and addresses) kept fresh with **health checks**.

- **Client-side discovery:** the caller picks an instance from the registry.
- **Server-side discovery:** a router or load balancer picks.

**Load balancing** distributes requests across instances: **round robin** (in sequence), **least connections** (fewest active), or **weighted** (set proportions).

Rules:

- Don't hardcode instance IPs when instances change.
- A healthy instance can still be overloaded.
- Load balancing is not fault tolerance: failed instances must be detected and removed from routing.

> Remember: Discovery = *where* is the service; load balancing = *which instance* gets this request.

## Configuration management

Keep environment-specific settings **outside** the code (externalized configuration) via environment variables or a central **config server**. The same immutable build artifact is promoted across environments.

```yaml
server.port=8080
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

Rules: keep secrets out of source control, validate required config at startup, use different settings per environment, avoid **configuration drift** (instances silently differing), and rotate secrets in a controlled way. **Feature flags** toggle capability without a redeploy.

> Remember: Config and secrets live in the environment, not in the code or the image.

# Resilience

## The core patterns ⭐⭐

One of the most-asked topics. The building blocks of surviving partial failure:

- **Timeout:** stop waiting after a set period instead of hanging. Set one on *every* remote call.
- **Retry:** try again, but only for transient errors; bound the attempts.
- **Exponential backoff + jitter:** grow the delay between retries and add randomness so clients don't all retry at once.
- **Circuit breaker:** stop calling a dependency that keeps failing.
- **Fallback:** return an alternative response when a dependency is down.
- **Bulkhead:** isolate resources (e.g. thread pools) so one failing dependency can't consume everything.
- **Backpressure / rate limiting / concurrency limits:** cap incoming or in-flight work.
- **Fail fast** and **graceful degradation:** error quickly, and keep essential features working while dropping nonessential ones.

Watch for a **retry storm**: a surge of retries that worsens an existing failure.

> Remember: Timeout + bounded retry + circuit breaker + bulkhead is the standard resilience kit.

## Circuit breaker states

- **CLOSED:** requests flow; failures are counted.
- **OPEN:** calls fail fast; the sick dependency isn't called.
- **HALF-OPEN:** a few test calls probe recovery. Succeed -> close; fail -> reopen.

**Retry vs circuit breaker:** retry repeats one operation (good for transient blips); a circuit breaker temporarily blocks calls (good for a dependency failing repeatedly). Excessive retries worsen overload; a breaker prevents hammering an unhealthy dependency.

**Bulkhead vs circuit breaker:** the breaker stops calls to an unhealthy dependency; the bulkhead limits how much of *your* resources those calls can consume.

> Remember: Breaker = stop calling the sick service; bulkhead = contain the blast radius.

## Retry rules and the amplification trap ⭐

1. Timeout every remote call.
2. Retry only likely-transient errors.
3. Use bounded retries with backoff and jitter.
4. Don't stack retries at multiple layers — they multiply.
5. Be careful retrying non-idempotent operations (e.g. creating a payment).
6. Use an idempotency key or deduplication when a retry could cause a duplicate effect.

Amplification example: if an HTTP client retries 3 times and its caller also retries 3 times, one user action can trigger up to 9 downstream attempts.

> Remember: Retries without idempotency and limits turn one failure into many.

# Data

## Database per service ⭐⭐

Each service owns its data store (or a logically isolated boundary) and controls how that data changes.

- **Why own the data?** If services share tables, schema changes become risky and the services couple tightly. Ownership lets internal structures change without breaking everyone.
- **Can a service read another's DB directly?** Prefer not. The owner exposes an API or publishes events instead.
- **Does it need a separate DB server?** No. Services can share a server or cluster using separate databases, schemas, and credentials. The point is ownership and controlled access, not separate hardware.

**Polyglot persistence** lets different services use different database technologies when it helps. Sometimes a service keeps **duplicated** copies of selected data for autonomy or performance.

> Remember: Own your data behind an API. Shared tables = a distributed monolith.

## Saga pattern ⭐⭐

A single business operation may span multiple services, each with its own database. A normal DB transaction can't commit or roll back all of them together. A **saga** splits the work into **local transactions**, each with a **compensating action** to undo it logically.

Order + payment saga:

1. Create order — Order Service
2. Reserve stock — Inventory Service
3. Charge payment — Payment Service
4. Confirm order

If payment fails after stock is reserved, release the stock and mark the order failed. Compensation is a business-level correction — a refund is not an instant un-charge, and some actions can't be perfectly reversed.

**Orchestration vs choreography:**

| Orchestration | Choreography |
| --- | --- |
| A coordinator directs the steps | Services react to events |
| Workflow explicit in one place | Workflow spread across services |
| Easier to follow complex flows | Less central coordination |
| Coordinator can grow too complex | Event flows hard to trace |

**Saga vs 2PC:** a saga uses separate committed local transactions plus compensation (temporary inconsistency is possible); **Two-Phase Commit (2PC)** coordinates one distributed commit (participants may block during coordination). Use a saga for long-running cross-service workflows; use a single DB transaction when the change fits one database.

> Remember: A saga is not one ACID transaction — it's local commits plus compensation.

## Consistency and CAP ⭐

- **Strong consistency:** reads reflect the latest committed state; often more coordination.
- **Eventual consistency:** replicas may briefly disagree but converge once updates stop and propagate. It does **not** mean inconsistent forever.

| Strong | Eventual |
| --- | --- |
| Fresher reads | May return stale data |
| For correctness-critical state | For tolerable temporary delay |
| May reject requests under failure | Can improve availability |

Pick strong for a bank balance or stock reservation (no overselling); eventual is fine for a review count or analytics dashboard.

**CAP theorem:** during a network **partition**, a distributed data system can't guarantee both **linearizable consistency** and **availability** for every request. A CP choice rejects or delays some operations to stay consistent; an AP choice keeps serving and allows temporary disagreement. Real systems are nuanced — don't label every database as simply "CP" or "AP".

Other guarantees interviewers mention: **read-your-writes** (you see your own updates) and **causal consistency** (causally related operations are seen in order). Hazards: **clock skew**, **race conditions**, **split brain** (two nodes both think they're leader), solved partly with a **quorum**.

> Remember: During a partition you choose: reject to stay consistent (CP), or serve possibly-stale data (AP).

## Caching

Store reusable data for fast access. A **cache hit** finds it; a **cache miss** must fetch it elsewhere. **TTL** expires entries; **invalidation** removes stale ones.

Strategies: **cache-aside** (app reads cache, loads from source on a miss and stores it), **write-through** (write cache + store together), **write-behind** (cache first, store later). A **distributed cache** (often Redis) shares data across instances.

```java
Product product = cache.get(id);
if (product == null) {
    product = repository.findById(id);
    cache.put(id, product);
}
```

Hazards: **cache stampede** (many requests reload the same expired key), **penetration** (requests for nonexistent data bypass the cache), **avalanche** (many keys expire together). Redis also gives counters, TTLs, and distributed locks — but don't rely on a simple lock for correctness without understanding expiry and fencing, and don't assume read-then-write is atomic just because it's Redis.

> Remember: The cache is not the source of truth, and invalidation is the hard part.

# Messaging

## Kafka and event-driven architecture ⭐

In **event-driven architecture (EDA)**, services produce and consume events through a broker. Core Kafka terms:

- **Topic:** a named stream of records. **Partition:** a slice of a topic giving parallelism and ordering *within* that partition.
- **Offset:** a consumer's position in a partition. **Consumer group:** consumers coordinating to split partitions.
- **Broker:** a Kafka server. **Replication factor:** copies kept per partition.
- **Dead-letter queue (DLQ):** where messages go after failing too many times. A **poison message** keeps failing. **Consumer lag:** how far behind a consumer is. **Replay:** reprocessing stored events.

**Kafka vs RabbitMQ:**

| Kafka | RabbitMQ |
| --- | --- |
| Distributed event/log platform | Broker with many messaging patterns |
| Ordered records in partitions | Queues, exchanges, routing |
| Records replayable within retention | Queue behaviour depends on acks/config |
| Event streams, high throughput | Task queues, flexible routing |
| Ordering per partition | Ordering depends on setup |

Neither is universally better — choose on ordering, replay, routing, delivery, throughput, and ops needs.

> Remember: Kafka = replayable ordered log per partition; RabbitMQ = flexible routing and task queues.

## Delivery guarantees and idempotent consumers ⭐

- **At-most-once:** 0 or 1 delivery; can be lost.
- **At-least-once:** 1 or more; duplicates possible (the common default).
- **Exactly-once:** a defined guarantee *within a specified processing boundary*.

Because duplicates happen, build an **idempotent consumer**: processing the same message twice has the same business effect. Use an `eventId` and persist a **deduplication** record alongside the business update, ideally in the same DB transaction.

```java
{ "eventId": "evt-123", "eventType": "OrderCreated", "orderId": "ord-456", "version": 1 }
```

Key point: Kafka's exactly-once features do **not** make arbitrary external DB writes or payment-API calls globally exactly-once.

> Remember: Assume at-least-once; make consumers idempotent.

## Outbox and inbox ⭐

**Problem:** a service commits its DB change but crashes before publishing the event — the event is lost.

**Outbox pattern:** save the business change *and* an event row in the same local transaction. A separate publisher reads the outbox and sends the event.

```
Local transaction: 1. save order  2. save OrderCreated in outbox
Publisher:         3. read outbox 4. publish 5. mark published
```

The publisher may publish more than once, so consumers stay idempotent. The **transactional inbox** is the mirror: record incoming message ids with the business update to drop duplicates.

> Remember: Outbox makes publishing reliable; the inbox makes consuming deduplicated. Neither removes the need for idempotency.

# Observability

## Logs, metrics, and traces ⭐

Three pillars:

| Type | Answers | Example |
| --- | --- | --- |
| Logs | What happened? | Payment API returned a timeout |
| Metrics | How much / how often? | 8% of payment calls failed |
| Traces | Where did time go? | Order waited 2s on Payment |

- **Distributed tracing** follows one request across services. A **trace** is the end-to-end journey; a **span** is one operation within it; a **trace ID** ties spans together; a **correlation ID** links related logs.
- Prefer **structured logging** (JSON fields). **OpenTelemetry** is the standard for generating and exporting telemetry.

```
Trace request-123:  Gateway 20ms  Order 40ms  Inventory 80ms  Payment 1500ms
```

The trace fingers Payment as the latency source.

Reliability terms: **SLI** (a measurement), **SLO** (a target), **SLA** (an agreement with consequences); watch **error rate**, **latency percentiles** (p95), and **throughput**.

Rules: propagate trace context across calls, avoid high-cardinality labels (unique user IDs), never log secrets, and remember a `200` response doesn't always mean the business operation succeeded — monitor user-facing outcomes.

> Remember: Logs say what, metrics say how much, traces say where the time went.

# Deployment

## Containers and Kubernetes ⭐

- **Container:** a packaged app sharing the host OS kernel. A **Docker image** is the template; a **container** is a running instance.
- **Kubernetes** orchestrates containers across a cluster. A **Pod** is the smallest unit (one or more containers); a **Deployment** manages replicated pods and rolling updates; a **Service** is a stable endpoint for a group of pods; **Ingress** handles HTTP(S) routing in (needs a controller).
- **ConfigMap** holds non-secret config; **Secret** holds sensitive config.
- **Probes:** **readiness** (should it get traffic?), **liveness** (should it be restarted?), **startup** (grace period for slow starts).

**Docker vs Kubernetes:** Docker builds and runs containers; Kubernetes manages them across a cluster. Neither replaces app-level timeouts, retries, or resilience, and Kubernetes won't detect application-level business failures.

Rules: a restart doesn't fix the bug; stateless services scale horizontally more easily; store persistent data in real storage, not the container's writable layer.

> Remember: Kubernetes keeps containers running and scaled — it does not fix your application logic.

## Deployment strategies

- **Rolling:** gradually replace old instances with new.
- **Blue-green:** keep two environments and switch traffic to the new one.
- **Canary:** send a small slice of traffic to the new version first, then expand.
- **Feature flag:** toggle a feature without deploying.
- **CI/CD:** integrate and test continuously; automate release prep or release itself.

For zero-downtime: use rolling/blue-green/canary with readiness checks and backward-compatible API and DB changes. Zero downtime is a goal, not an automatic guarantee.

> Remember: Ship gradually, keep changes backward-compatible, and let readiness gate traffic.

# Security

## Auth across services ⭐

- **Authentication** = who are you; **authorization** = what you may do.
- **JWT:** a token carrying signed claims. **OAuth 2.0:** an authorization framework; **OIDC:** an identity layer on top. An **access token** reaches resources; a **refresh token** gets new access tokens.
- **mTLS:** both sides authenticate with certificates — common for service-to-service.
- **Zero-trust:** don't trust a request just because it's internal.

JWT flow: user authenticates with an identity provider -> client gets an access token -> sends `Authorization: Bearer ...` -> the service validates signature and claims -> then checks authorization.

Rules:

- A JWT is usually **signed, not encrypted** — its payload isn't secret.
- Check expiry, issuer, audience, and allowed signing algorithms.
- A valid token doesn't grant access to everything (authN != authZ).
- Keep secrets out of code and browser-exposed config; apply **least privilege** and **secrets management**; use HTTPS; never log tokens or sensitive data.

**API key vs JWT:** an API key is a shared secret-like credential; a JWT carries signed claims. Neither is secure by format alone — expiration, scope, storage, validation, and revocation decide that.

> Remember: Signed JWT, validated claims, least privilege, and no trust just because it's internal.

# Patterns, Testing, and Spring

## Common design patterns ⭐

Beyond gateway, discovery, saga, circuit breaker, bulkhead, retry, timeout, outbox, and inbox (covered above), know:

- **Strangler Fig:** gradually replace a legacy system by routing more traffic to new services until the old part is retired.
- **Sidecar:** run a supporting component alongside an app instance.
- **Backend for Frontend (BFF):** a backend tailored to one client type.
- **CQRS:** separate the write model from the read model.
- **Event Sourcing:** store state changes as a sequence of events and rebuild state from them.
- **Anti-corruption layer:** translate between models to protect one domain from another's design.
- **Leader election:** pick one participant to coordinate a task.

| Pattern | Main purpose |
| --- | --- |
| Saga | Multi-service business transaction |
| Outbox | Don't lose events after a DB commit |
| CQRS | Separate reads from writes |
| Event Sourcing | Store state changes as events |
| Strangler Fig | Migrate a legacy system gradually |
| BFF | Tailor APIs to a specific frontend |
| Anti-corruption layer | Shield a domain from external models |
| Sidecar | Add supporting functionality alongside an app |

**CQRS vs Event Sourcing:** CQRS separates read/write models and does *not* require event sourcing; event sourcing makes events the authoritative record and does *not* require separate models. They combine but solve different problems.

> Remember: These patterns are tools — name the problem first, then the pattern.

## Testing microservices

The testing pyramid: many fast **unit** tests at the base, some **integration** and **contract** tests in the middle, few slow **E2E** tests at the top. Also useful: **component**, **smoke**, **load**, **stress** testing, and **chaos engineering** (inject failures to test resilience).

**Contract testing** is the standout for microservices: it verifies a consumer's expectations match a provider's API. Example: Order Service expects `paymentStatus` but Payment renames it to `status` — a contract test catches this before production.

Rules: unit tests can't prove remote integration; E2E is valuable but slow and fragile; test timeouts, retries, duplicate messages, and dependency failures, not just the happy path; verify backward compatibility when changing API or event schemas.

> Remember: Contract tests catch cross-service breakage early; test failure paths, not just success.

## Microservices with Spring Boot ⭐

Typical stack (options, not mandatory): **Spring Boot** (standalone apps), **Spring Web**, **Spring Data JPA**, **Spring Security**, **Spring Cloud** (distributed-system patterns), **Spring Cloud Gateway**, **OpenFeign** / **WebClient** / **RestClient** (HTTP clients), **Resilience4j** (circuit breaker, retry, rate limiter), **Spring for Apache Kafka**, **Micrometer** + **Actuator** (metrics and management), **Eureka** (registry), **Config Server**. Modern deployments often use Kubernetes discovery instead of Eureka.

```java
@RestController
@RequestMapping("/orders")
public class OrderController {
    @GetMapping("/{id}")
    public String getOrder(@PathVariable Long id) {
        return "Order ID: " + id;
    }
}
```

Calling another service (illustrative — a real call needs timeouts, error handling, auth):

```java
RestClient restClient = builder.baseUrl("http://payment-service").build();
String body = restClient.get()
        .uri("/payments/{id}", orderId)
        .retrieve()
        .body(String.class);
```

**Spring Boot vs Spring Cloud:** Boot builds and runs one app; Cloud adds integrations and patterns for distributed systems. Spring Cloud does **not** by itself make an architecture microservices — boundaries, data ownership, communication, and ops do.

**Transaction rule:** a local `@Transactional` covers only resources under its transaction manager. It does **not** make HTTP calls to other services part of one atomic transaction. If Order Service calls Payment Service, a local rollback can't reverse a successful payment — use business compensation (a refund).

> Remember: Spring Cloud is plumbing; a local `@Transactional` never spans services.

# "Why X vs Y?" Comparisons

## Quick comparison table ⭐

The confusing pairs interviewers love, in one place:

| A | B | The difference |
| --- | --- | --- |
| Monolith | Microservices | One deployable unit vs independently deployable services |
| REST | Messaging | Request-response vs message-based, often async |
| API Gateway | Load Balancer | API policy and routing vs traffic distribution |
| Service Discovery | Load Balancing | Find instances vs distribute requests |
| Timeout | Retry | Stop waiting vs attempt again |
| Retry | Circuit Breaker | Repeat a call vs temporarily stop calling |
| Circuit Breaker | Bulkhead | Stop calls to a sick dependency vs isolate resources |
| Authentication | Authorization | Who are you? vs what can you do? |
| Strong | Eventual Consistency | Fresher guarantees vs possible temporary staleness |
| Saga | 2PC | Local transactions + compensation vs coordinated distributed commit |
| Orchestration | Choreography | Central coordinator vs event-driven collaboration |
| CQRS | Event Sourcing | Separate read/write models vs event-based history |
| Outbox | Inbox | Reliable publishing vs deduplicated consuming |
| Logs | Metrics | Individual events vs numbers over time |
| Logs | Traces | Diagnostic records vs end-to-end request journey |
| Vertical | Horizontal Scaling | Bigger machine vs more instances |
| Liveness | Readiness | Should restart? vs should get traffic? |
| Queue | Topic | Work distribution vs named event stream |
| Idempotency | Deduplication | Repeated effect is safe vs recognising repeats |
| Deployment | Scaling | Releasing a version vs changing capacity |
| Availability | Reliability | Usable when needed vs correct over time |

## Scaling and performance ⭐

- **Vertical scaling:** a bigger machine. **Horizontal scaling:** more instances — works best when requests are independent and the service is **stateless** (no local in-memory session). Use external session storage or stateless tokens so requests can hit any instance.
- **Latency** = how long one request takes; **throughput** = how many complete per unit time; **concurrency** = how many run at once. A system can have high throughput *and* high per-request latency.
- Reuse resources with **connection pooling** and **thread pools**; reduce overhead with **batching** and **pagination**; watch the **N+1 query problem** and **resource exhaustion**.

Rules: more threads aren't always faster; async isn't automatically faster (it adds coordination); profile the real bottleneck before scaling; size a service's DB connection pool against the database's total capacity.

> Remember: Scale out stateless services; measure the bottleneck before adding capacity.

## Must-remember traps ⭐

The mistakes interviewers probe for:

- A network call can fail even when both services are up — always set timeouts.
- Retries need limits, backoff, and idempotency; circuit breakers and bulkheads solve different problems.
- Kafka delivery doesn't make external business effects exactly-once; an outbox solves reliable publishing, not every duplication.
- A saga is not one ACID transaction across services; eventual consistency means handling stale and delayed data.
- A JWT isn't necessarily encrypted, and authentication doesn't imply authorization.
- An API gateway shouldn't hold all business logic; a shared database makes services a distributed monolith.
- Kubernetes restarts containers but can't fix bugs or detect business failures.
- Microservices add operational complexity — prefer a modular monolith when it fits.

Interview strategy for "design microservices for order-payment-inventory": walk through service **boundaries** first, then **communication**, **data ownership**, **failure handling**, **transaction consistency (saga + idempotency)**, and **observability**. That sequence connects most concepts into one answer.

> Remember: Most microservices answers come back to boundaries, failure handling, and consistency.
