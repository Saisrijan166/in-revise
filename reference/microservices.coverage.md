# Coverage: Microservices
Reference: reference/microservices.md  ·  Last updated: 21-10-2026

The reference has 25 numbered sections (M1–M25), 20 interview questions in section 22 (M22.Q1–M22.Q20) and a 20-row differences
table in section 23 (M23.1–M23.20). Every item appears in exactly one of Mapped, Corrected or Dropped. A section whose parts went
to different places has one row here (Corrected wins over Mapped), and its other parts are listed under "Details placed elsewhere
or cut". Baseline for corrections: Java 25, Spring Boot 4.1 + Spring Cloud 2025.1, Kafka 4.3, Kubernetes 1.37. Sources are
primary pages (RFCs, product docs, microservices.io, martinfowler.com, Azure/AWS architecture guidance, the Google SRE book, OWASP).

## Mapped
| Reference item (key + short title) | Landed in | Note |
|---|---|---|
| M1. Fundamentals: terms microservices, monolithic architecture, independent deployment, service autonomy, distributed system; M1. Terms business capability, bounded context, loose coupling, high cohesion, distributed monolith; M1. Term scalability; M1. Terms resilience, fault isolation; M1. E-commerce example (gateway, Order, Payment, Inventory, User services) | glossary (microservice-term, monolith, independent-deployment, service-autonomy, distributed-system); concept monolith-and-microservices; concept service-boundaries (table, tree, Interview Q); glossary; concept scaling-services; topic resilience (cross-unit; fault isolation is owned by fallback-and-degradation); concept service-boundaries (Example) | no separate term: the concept and the vertical/horizontal terms cover it not repeated here running example is Order, Payment, Inventory, Notification |
| M2. Monolith vs Microservices table (deployment, codebase, scaling, communication, data, failure handling, complexity, testing); M2. Modular monolith; M2. "Microservices are not always better", "not automatically faster", "do not guarantee availability"; M2. Interview Q: When should you use microservices? | comparison monolith-vs-microservices (3 sides with modular monolith); comparison side, tree node modular-monolith (+ Spring Modulith), point "Start with"; concept monolith-and-microservices (trap, points); concept monolith-and-microservices (Interview Q "How do you decide…", verdict) | codebase and testing rows folded into operations cost to stay within 6 rows merged with M22.Q20 |
| M4. Communication Between Services (parts: synchronous, asynchronous, request-response); M4 (parts: message, event, command); M4 (parts: message broker, producer, consumer, queue, publish-subscribe); M4 (parts: latency, throughput); M4 (part: REST vs messaging table); M4 (part: "async does not guarantee processing; messages can be delayed, duplicated or dead-lettered"); M4 (part: OrderCreated example flow); M4. Message, event, command, producer, consumer; M4. Message broker, queue, pub/sub, competing consumers; M4. "Messages can be delayed, duplicated or sent to a DLQ" | concept sync-and-async-communication (points, tree nodes request-response-call, async-messaging); glossary synchronous-communication, asynchronous-communication; concept event-driven-architecture (owner, linked); concept message-brokers (owner, linked); concept scaling-services (owner, basics unit); comparison rest-vs-messaging, embedded in sync-and-async-communication; sync-and-async-communication (points "Async costs", trap); dead letters are owned by dead-letter-queues; sync-and-async-communication, Example (Steps); concept event-driven-architecture (embeds comparison command-vs-event); tree domain-event, command-message; glossary domain-event, command-message; concept message-brokers (embeds comparison queue-vs-topic); tree point-to-point-queue, publish-subscribe-topic, competing-consumers; glossary same ids + message-broker; concept message-brokers (Interview Q "Does a broker guarantee my message is processed?"); concept dead-letter-queues | request-response is an aka of synchronous-communication event vs command is comparison command-vs-event (messaging unit), listed in confusedWith queue vs topic is comparison queue-vs-topic, listed in confusedWith not repeated here rows rewritten, not copied saving + publishing is linked to outbox-and-inbox "message" stays a plain word |
| M7. Service Discovery (parts: discovery, registry, client-side, server-side, health check, service instance, dynamic scaling); M7 (part: discovery example diagram); M7 (rules: no hardcoded IPs; discovery is not load balancing); M7 (parts: load balancing, round robin, least connections, weighted routing); M7 (rule: "load balancing does not give fault tolerance by itself"); M7 (rule: "a healthy instance may still be overloaded") | concept service-discovery (points, embedded comparison client-side-vs-server-side-discovery, tree nodes); glossary service-discovery-term, service-registry, client-side-discovery, server-side-discovery, health-check; client-side-vs-server-side-discovery diagrams; service-discovery hook, Interview Q 1, trap; concept load-balancing (points, tree nodes round-robin, least-connections, weighted-routing); glossary load-balancer, round-robin, least-connections; load-balancing trap; load-balancing trap ("Even a healthy instance can be overloaded") and least-connections bullet | dynamic scaling itself is owned by scaling-services / containers-and-kubernetes redrawn backed by the Google SRE book chapter 20 |
| M9. Database per service (parts: database per service, data ownership, shared database, polyglot persistence); M9. Database per service (part: "Why should every service own its data?"); M9. Database per service (part: "Can one service access another service's database directly?"); M9. Database per service (part: "Does it need a separate database server?"); M9. Database per service (part: common mistake, shared DB makes a distributed monolith); M9. Database per service (parts: eventual consistency, strong consistency); M9. Database per service (parts: CQRS, materialized view); M9. Database per service (part: data duplication) | concept database-per-service (points, tree types shared-database, polyglot-persistence); glossary; concept database-per-service (Why it exists; Interview Q on shared database); concept database-per-service (Mermaid "never reads directly"; bullets on API composition and local copy); concept database-per-service (trap, point "Not a new server", tree data-isolation-options with 3 types, yaml example); concept database-per-service (Interview Q "Why is a shared database an anti-pattern?"); concept cap-and-consistency; comparison strong-vs-eventual-consistency; concept cqrs (points, Mermaid); tree materialized-view; glossary; tree node data-duplication under database-per-service; concept database-per-service Interview Q | duplicate of M12, written once scope note: owner of local copies is database-per-service |
| M13. Caching (parts: cache, hit, miss, TTL, invalidation, cache-aside, write-through, write-behind, distributed cache); M13. Caching (parts: stampede, penetration, avalanche); M13. Caching (part: cache-aside example code); M13. Caching (parts: Redis, TTL, atomic operation, distributed lock, cache consistency); M13. Caching (part: important rules: not the source of truth, stale data, invalidation is hard, do not rely on a simple lock) | concept caching-in-microservices (Steps, points); tree caching-patterns, distributed-cache; glossary; tree cache-failure-modes (3 types); concept bullets with fixes; glossary; concept caching-in-microservices (Java example, now with the write path and TTL jitter); glossary redis, ttl, distributed-lock; tree distributed-lock; concept Interview Q on Redis locks; concept caching-in-microservices (hook, point "Not the truth", trap, Interview Q) | cache hit/miss explained inside the Steps, no separate terms atomic read-then-write caveat folded into the lock Q |
| M14. Security (part: authentication); M14. Security (part: authorization); M14. Security (part: mTLS); M14. Security (part: service-to-service authentication); M14. Security (part: least privilege); M14. Security (part: secrets management); M14. Security (parts: encryption in transit, encryption at rest); M14. Security (part: zero-trust security); M14. Security (part: rate limiting); M14. Security (part: audit logging); M14. Security (important rules: signed not encrypted; check exp, iss, aud, alg; valid token is not access to everything; no secrets in code; internal services still need authN/authZ; HTTPS; do not log tokens, passwords, personal data); M14. Security (part: JWT); M14. Security (part: OAuth 2.0); M14. Security (part: OpenID Connect); M14. Security (part: access token); M14. Security (part: refresh token); M14. Security (part: JWT authentication flow, 5 steps); M14. Security (part: API key vs JWT); M14. (part: secrets management; do not store secrets in code or browser-exposed config) | tree `authentication-check`; glossary `authentication`; comparison authentication-vs-authorization; tree `authorization-check`; glossary `authorization`; comparison authentication-vs-authorization; concept microservices-security (point, Interview Q); tree `mutual-tls-auth`; glossary `mtls`; concept microservices-security (point "Service identity", Interview Q); concept microservices-security (point); tree `least-privilege-rule`; glossary; glossary `secrets-management` (see configuration-management); microservices-security bullet links to configuration-management; glossary `encryption-in-transit`, `encryption-at-rest`; microservices-security Interview Q (token calls over TLS); concept microservices-security (bullet, Interview Q "What is zero trust?"); tree; glossary; owned by concept rate-limiting (resilience unit); tree `audit-log-trail`; glossary `audit-logging`; jwt-and-oauth (points, trap, Steps); microservices-security (trap, points, bullet); comparison authentication-vs-authorization (verdict); concept jwt-and-oauth (points, trap); tree `json-web-token`; glossary `jwt`, `jwt-claim`; concept jwt-and-oauth; tree `oauth-2-framework`; comparison oauth2-vs-oidc; glossary; tree `openid-connect-layer`, `oidc-id-token`; comparison oauth2-vs-oidc; glossary `openid-connect`, `id-token`; tree `oauth-access-token`; Interview Q "Access token vs refresh token?"; glossary; tree `oauth-refresh-token`; bullet (only to the authorization server); Interview Q; glossary; concept jwt-and-oauth, How it works (Steps); comparison api-key-vs-jwt; tree `api-key-credential`; glossary `api-key`; configuration-management trap and Interview Q "How do you handle secrets?" | mesh automation linked to service-mesh mTLS or client-credentials token storage owned by configuration-management sourced to NIST SP 800-207 not repeated here each rule written once reworded; adds PKCE and the alg allowlist rest of M14 owned by microservices-security |
| M17. Configuration (parts: externalised configuration, environment variables); M17. (part: secret); M17. (part: configuration server); M17. (part: configuration drift); M17. (part: immutable deployment artifact); M17. (part: feature flag); M17. (Spring Boot example with ${DB_URL}); M17. (rules: secrets out of source control; validate config at startup; different settings per environment; controlled rotation) | concept configuration-management (hook, Mermaid, point "Env vars win", Example); tree twelve-factor-config; configuration-management trap, Interview Q on secrets; tree secret-manager; tree config-server; Interview Q "Config server or ConfigMaps?"; glossary; tree configuration-drift; point "Same artifact"; tree immutable-artifact; Interview Q 3; deployment-strategies (one place only); configuration-management Example (rewritten, with a `${name:default}`); trap; point "Fail fast"; tree spring-profiles; point "Rotate" | duplicate of the M16 part added: env var SPRING_DATASOURCE_URL overrides with no placeholder |
| M18. Testing (parts: unit, integration, component testing); M18. (parts: contract testing, consumer-driven contract testing); M18. (part: end-to-end testing); M18. (parts: chaos engineering, test double, mock); M18. (testing pyramid); M18. (why contract testing matters: paymentStatus → status); M18. (rules: unit tests cannot prove integration; E2E slow and fragile; test timeouts, retries, duplicates; avoid live production services; test backward compatibility) | tree unit-test, integration-test, component-test; concept testing-microservices; comparison contract-vs-integration-vs-e2e-test; tree contract-test → consumer-driven-contract, pact-tool; glossary; comparison side c; point "End-to-end tests"; glossary; glossary chaos-engineering, test-double (stub, mock, fake in one line); tree; point "Test pyramid"; comparison row "How many"; tree note unit-test; testing-microservices Example (text block) and Why; trap; point "End-to-end tests"; point "Failure tests"; Interview Qs |  |
| M21. Vertical vs horizontal scaling; M21. Stateless and stateful services; rule on local sessions and external session storage; M21. Connection pooling, thread pool; rules "more threads not always better", "size pool against the DB's limit"; M21. Asynchronous processing; rule "async is not automatically faster"; M21. Batching, pagination; M21. Backpressure; M21. Resource exhaustion; M21. Rule: profile the bottleneck before scaling; M21. Rule: horizontal scaling works best with independent requests; M21. Throughput vs latency vs concurrency vs capacity; "high throughput with high latency" | comparison vertical-vs-horizontal-scaling (embedded); glossary; scaling-services (point, How it works bullet, Interview Q); tree; glossary; scaling-services (trap, point, Example, Defaults); tree node connection-pool-sizing; glossary connection-pool; sync-and-async-communication (cross-unit owner); distributed-systems-fallacies table (latency and bandwidth rows); scaling-services point; tree; glossary; scaling-services trap and Example (database refuses connections); scaling-services point "Measure first", trap; comparison vertical-vs-horizontal-scaling ("App must be" row); scaling-services (Little's law point and Example); glossary throughput, latency, concurrency-term, littles-law | numbers added: HikariCP 10, PostgreSQL 100 not repeated capacity is not a separate term (common word); see Dropped |
| M22. Interview questions (intro) | design-walkthrough Interview Qs framing | Heading only in the reference |
| M23. Important differences table (as a whole) | microservice-patterns-map "mixed up with" links; each row's own comparison is mapped by its owner unit | Rows M23.1–M23.20 are owned by other units |
| M24 (part: architectural choice, not simply multiple Spring Boot apps); M24 (part: operational complexity; no automatic performance gain); M24 (part: use a modular monolith when it is simpler); M24 (part: a network call can fail even when both services run); M24 (part: gateway should not be the home of business logic); M24. Rules: always set timeouts for remote calls; M24. Rules: retries need limits, backoff and idempotency safeguards; M24. Rules: circuit breakers and bulkheads solve different problems; M24. Must-remember rules (part: each service owns its data); M24. Must-remember rules (part: eventual consistency needs handling of stale data and delayed events); M24 (part). Kafka delivery does not make external effects exactly-once; M24 (part). Outbox solves reliable publication, not every duplication problem; M24 (part). A saga is not one ACID transaction; M24. Rules (part: a JWT is not necessarily encrypted, authentication does not imply authorization); M24. Rules (part: monitor latency, traffic, errors, saturation); M24. (part: test contracts and failure scenarios); M24. (part: microservices are an architectural choice, not many Spring Boot apps) | monolith-and-microservices Interview Q; monolith-and-microservices trap, point "Cost"; monolith-and-microservices point, verdict; distributed-systems-fallacies trap; api-gateway trap + Interview Q 3; concept timeouts-and-retries (hook, Defaults row on the JDK); concept timeouts-and-retries (trap, sayIt); comparison circuit-breaker-vs-bulkhead; concept database-per-service (hook); concept cap-and-consistency (Interview Q "keep data consistent"); comparison row "Cost"; concept delivery-guarantees (trap); concept outbox-and-inbox (point "At-least-once", Interview Q "Does the outbox remove duplicates?"); concept saga (trap); jwt-and-oauth trap; authentication-vs-authorization verdict; metrics-and-slos point "Golden signals"; tree `four-golden-signals`; Interview Q; testing-microservices points "Contract test", "Failure tests"; Interview Q 2; spring-cloud-stack trap (Spring Cloud tools do not make it microservices) | not in this unit's ref list, but it is the same fact monolith-and-microservices also owns this M24 part; this trap is only the Spring angle |
| M25. (part: the 12 concepts to memorise first); M25. (part: best interview strategy, order-payment-inventory) | design-walkthrough Steps (each step links its owner concept); design-walkthrough Steps + Interview Q "How would you design an order, payment and inventory system?" | Order extended with requirements, security and deployment |
| M22.Q1. Why microservices if a monolith works? | monolith-and-microservices Interview Q |  |
| M22.Q2 Should each microservice have its own database? | concept database-per-service (Interview Q, trap) |  |
| M22.Q3. How do microservices communicate? | sync-and-async-communication, Interview Q 1 |  |
| M22.Q4. What happens if one service goes down?; M22.Q4. What happens if one service goes down? | distributed-systems-fallacies Interview Q (links circuit-breaker, fallback-and-degradation); concept fallback-and-degradation (fallback options); the answer itself is the Interview Q of distributed-systems-fallacies | fallback-and-degradation also lists Q4; lead should keep one answer duplicate Q removed at merge |
| M22.Q5. Transaction across multiple services | concept saga (Interview Q 1) |  |
| M22.Q6. How do you prevent duplicate payment processing? | idempotency, Interview Q 1 + sayIt |  |
| M22.Q7. DB update succeeds but publishing fails | concept outbox-and-inbox (Interview Q, trap) |  |
| M22.Q8. How do you prevent cascading failures? | concept circuit-breaker (Interview Q); glossary cascading-failure |  |
| M22.Q9 How do you maintain data consistency? | concept cap-and-consistency (Interview Q) | links saga, idempotency |
| M22.Q10 How do you debug a request across many services? | observability, Interview Q |  |
| M22.Q11. Service discovery vs API gateway | comparison service-discovery-vs-api-gateway (listed in confusedWith of both concepts) |  |
| M22.Q12. Scaling vs load balancing | scaling-services Interview Q |  |
| M22.Q13 Why is a shared database an anti-pattern? | concept database-per-service (Interview Q); tree shared-database |  |
| M22.Q14. Is asynchronous communication always better? | sync-and-async-communication, trap + Interview Q 2 |  |
| M22.Q15. Orchestration vs choreography | concept saga (Interview Q); comparison orchestration-vs-choreography |  |
| M22.Q16. Retry vs fallback? | concept fallback-and-degradation (Interview Q, bullet) |  |
| M22.Q17. Availability vs reliability | scaling-services Interview Q; glossary availability-term, reliability |  |
| M22.Q18. Can two services share a code library? | design-walkthrough Interview Q; tree nodes shared-library, microservice-chassis, service-template; glossary |  |
| M22.Q19 How do you deploy a microservice without downtime? | deployment-strategies Interview Q 1, trap, point "Zero downtime needs" | also covers M24 "backward-compatible API, event and DB changes" (expand and contract Interview Q) |
| M22.Q20. How to decide on a new microservice? | monolith-and-microservices Interview Q |  |
| M23.1. Monolith vs Microservices | comparison monolith-vs-microservices |  |
| M23.2. REST vs Messaging | comparison rest-vs-messaging |  |
| M23.3. API Gateway vs Load Balancer | comparison api-gateway-vs-load-balancer |  |
| M23.4. Service Discovery vs Load Balancing | service-discovery trap (discovery returns instances, picking one is load balancing) | no separate comparison file (not in master.json) |
| M23.5. Timeout vs Retry | concept timeouts-and-retries (bullet, Interview Q) |  |
| M23.6. Retry vs Circuit Breaker | comparison retry-vs-circuit-breaker |  |
| M23.7. Circuit Breaker vs Bulkhead | comparison circuit-breaker-vs-bulkhead |  |
| M23.8 Authentication vs Authorization | comparison authentication-vs-authorization |  |
| M23.9 Strong consistency vs eventual consistency | comparison strong-vs-eventual-consistency |  |
| M23.10. Saga vs 2PC | comparison saga-vs-two-phase-commit |  |
| M23.11. Orchestration vs Choreography | comparison orchestration-vs-choreography |  |
| M23.12 CQRS vs Event Sourcing | comparison cqrs-vs-event-sourcing (owned by cqrs; listed in confusedWith of both concepts) |  |
| M23.13. Outbox vs Inbox | comparison outbox-vs-inbox |  |
| M23.14 Logs vs Metrics | comparison logs-vs-metrics-vs-traces | merged into one 3-way comparison |
| M23.15 Logs vs Traces | comparison logs-vs-metrics-vs-traces | merged into one 3-way comparison |
| M23.16. Vertical vs Horizontal Scaling | comparison vertical-vs-horizontal-scaling |  |
| M23.17 Liveness vs Readiness ("restart?" vs "traffic?") | comparison liveness-vs-readiness-probe (3 sides with startup); health-probes hook and first Interview Q |  |
| M23.18. Queue vs Topic | comparison queue-vs-topic | Kafka and RabbitMQ rows make "depends on technology" concrete |
| M23.19. Idempotency vs Deduplication | comparison idempotency-vs-deduplication; idempotency Interview Q 3 |  |
| M23.20. Deployment vs Scaling | scaling-services How it works bullet (scaling vs load balancing vs deployment) |  |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| M3. Domain service ("logic that does not naturally belong to one entity") | Too narrow: Evans says it fits neither an entity nor a value object | "A domain operation that is not a natural job of any single entity or value object" | https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf |
| M5 (methods table, PATCH "Idempotent? Depends on the operation"); M5 (methods table, PUT "Replace a resource") | Loose: by definition PATCH is not idempotent; Incomplete: PUT can also create | PATCH is neither safe nor idempotent; a PATCH can be designed to be idempotent; PUT creates or replaces the resource at the target URI (201 if created, 200/204 if replaced) | https://www.rfc-editor.org/rfc/rfc5789.html ; https://www.rfc-editor.org/rfc/rfc9110.html |
| M6 (subtopic: TLS termination "handling HTTPS encryption at the gateway") | Incomplete: suggests traffic after the gateway can be plain | The gateway terminates client TLS and should open a new TLS connection to each service | https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-offloading |
| M8. Resilience: 3 × 3 = 9 example | "Retries three times" at each of two layers is 4 attempts per layer, so up to 16 calls, not 9; 9 holds only for 3 attempts in total per layer | Stated in attempts: "3 attempts at each of 3 layers = 27 calls downstream" | https://sre.google/sre-book/addressing-cascading-failures/ (3 retries = 4 attempts per layer, 4^3 = 64) |
| M10. Saga vs 2PC ("participants may have to wait") | Understates the cost | Prepared participants keep their locks until the coordinator decides; many brokers and databases do not support 2PC | https://www.postgresql.org/docs/18/sql-prepare-transaction.html |
| M11. Kafka vs RabbitMQ table (replay row: "records can often be replayed" for Kafka only); M11. Consumer group ("coordinate to process partitions or messages"); M11. Kafka section (no version, no metadata layer); M11. Delivery guarantees (no defaults); M11. Outbox publisher ("read outbox, publish, mark published") | Implies only Kafka can replay; RabbitMQ has had streams with non-destructive reads and replay since 3.9; Vague; misses the rule interviewers test; Silent on ZooKeeper vs KRaft; old answers still say Kafka needs ZooKeeper; Leaves the producer defaults open; many answers still say acks=1; Shows only polling; misses the log-tailing relay most teams use | Replay row: Kafka moves the offset back; RabbitMQ queues cannot, streams (3.9+) can; Each partition goes to exactly one consumer of the group; consumers beyond the partition count sit idle; Kafka 4.2+ share groups lift this; Kafka 4.0 removed ZooKeeper mode; 4.x runs only in KRaft mode; acks=all and enable.idempotence=true are defaults since Kafka 3.0 (still in 4.3); Two relays: polling publisher or transaction log tailing (CDC, Debezium) | https://www.rabbitmq.com/blog/2021/07/13/rabbitmq-streams-overview ; https://kafka.apache.org/43/design/design/ ; https://kafka.apache.org/40/getting-started/upgrade/ ; https://kafka.apache.org/30/getting-started/upgrade/ ; https://microservices.io/patterns/data/transaction-log-tailing.html |
| M12. Consistency and CAP (part: read-your-writes "a client can see its own successful updates"); M12. Consistency and CAP (part: quorum "a required number of participants") | Too weak: "can see" allows an older value; Vague: no number | "A client always sees its own completed writes; never an older value" (tree note, glossary); "Usually a majority, (n/2)+1, must agree; the minority side stops" (tree, glossary) | https://www.allthingsdistributed.com/2008/12/eventually_consistent.html ; https://etcd.io/docs/v3.6/faq/ |
| M15. Observability (part: example trace, flat list Gateway 20 ms, Order 40 ms, Inventory 80 ms, Payment 1500 ms) | Shows spans as a flat list with the gateway at 20 ms, though the gateway span contains the Payment call; a parent span covers its children | A span tree: root Gateway span 1,640 ms, Order 1,610 ms, children Inventory 80 ms and Payment 1,500 ms | https://opentelemetry.io/docs/concepts/observability-primer/ |
| M16. (part: Ingress, "needs a suitable controller"); M16. (part: CD = "continuous delivery/deployment … depending on the pipeline"); M16. (part: startup probe, "before liveness checks take effect") | Outdated: does not say Ingress is frozen; Mixes two different practices; Incomplete: it also holds off readiness | Ingress API is frozen (no new features); Kubernetes recommends Gateway API (Kubernetes 1.37); Continuous delivery: always releasable, people choose when. Continuous deployment: every passing change goes to production automatically; it needs delivery first; Liveness and readiness probes start only after the startup probe succeeds; a failed startup probe restarts the container | https://kubernetes.io/docs/concepts/services-networking/ingress/ ; https://martinfowler.com/bliki/ContinuousDelivery.html ; https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/ |
| M19. Design patterns (part: "CQRS vs Event Sourcing": event sourcing does not require separate read and write models; they solve different problems) | Loose: technically true, but an event store is hard to query, so in practice event sourcing needs projections, i.e. CQRS read models | "Event sourcing almost always brings CQRS; CQRS often comes alone" (comparison verdict and row "Needs the other?"); point "Hard to query" in event-sourcing | https://microservices.io/patterns/data/event-sourcing.html |
| M20. (part: RestClient "a synchronous HTTP client in modern Spring Framework versions"); M20. (part: OpenFeign listed as a plain option) | Vague version; Status missing; reads as a current first choice | RestClient added in Spring Framework 6.1; Spring Cloud OpenFeign is feature-complete (since Spring Cloud 2022.0); the team suggests HTTP service clients | https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-6.1-Release-Notes ; https://docs.spring.io/spring-cloud-openfeign/reference/ |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| Fallacies of distributed computing (all eight, attribution) | concept distributed-systems-fallacies (table), glossary | classic interview topic; explains why every resilience pattern exists |
| Partial failure, unknown outcome after a timeout, eight failure points of a request-reply | distributed-systems-fallacies (points, tree, Interview Q "Was the customer charged?") | the reason retries need idempotency |
| Conway's law | monolith-and-microservices bullet, tree, glossary | asked with team ownership |
| Monolith first, microservice premium | monolith-and-microservices bullet, tree | Fowler's widely cited guidance on when not to start with microservices |
| Spring Modulith | tree node under modular-monolith | Java/Spring way to enforce a modular monolith |
| Ubiquitous language, subdomain types (core, supporting, generic) | tree, glossary | DDD words interviewers use with bounded context |
| Too fine-grained services anti-pattern | tree | known adoption anti-pattern (microservices.io "more the merrier") |
| Little's law with numbers | scaling-services point and Example; glossary | makes throughput, latency and concurrency one rule |
| HikariCP default pool 10; PostgreSQL 18 max_connections 100; Spring Boot 4.1 picks HikariCP first | scaling-services Defaults and Example | concrete numbers for the pool-sizing rule |
| Availability as a percentage (99.9% a month) | scaling-services Interview Q, glossary | precise definition for Q17 |
| gRPC and Protocol Buffers (four call types, deadlines, gRPC-Web) | concept grpc; comparison rest-vs-grpc; tree nodes | master.json addition; common question "REST vs gRPC" |
| gRPC has no default deadline | grpc trap + Defaults | common production bug; grpc.io deadlines guide |
| Problem details (RFC 9457) as the consistent error format | rest-apis bullet + Example; glossary problem-details | turns "use consistent error formats" into the standard answer |
| OpenAPI as the API contract format | glossary openapi, api-contract; rest-vs-grpc row | interviewers name it with "API contract" |
| Status of the Idempotency-Key header: IETF draft-07, expired 18-04-2026, not an RFC | idempotency point "Header standard" | the reference implies a settled practice; status matters when asked "is it a standard?" |
| Idempotency-Key server rules: saved result, 409 while running, 422 for a different body | idempotency Mermaid | from the IETF draft, gives a concrete design |
| Key expiry (Stripe keeps keys at least 24 hours) | idempotency bullet | answers "how long do you store keys?" |
| 202 Accepted + status URL (async request-reply over HTTP) | tree node async-request-reply; sync-and-async bullet | ties 202 to async work |
| Chain of sync calls is an anti-pattern | sync-and-async point, tree node, Interview Q 3 | Microsoft guidance; common follow-up |
| Non-blocking client is still sync communication | sync-and-async point | frequent confusion (WebClient vs messaging) |
| Self-registration vs third-party registration; registry must be highly available | service-discovery points, tree nodes, Interview Q 2 | microservices.io patterns interviewers name |
| Eureka heartbeat every 30 s (Spring Cloud Netflix 5.0) | service-discovery point (default) | Spring-specific default people ask |
| Consistent hashing, power of two choices, layer 4 vs layer 7 | load-balancing points, tree nodes, Interview Q 2 | common load-balancer questions |
| Least-connections "sinkholing" trap (fast-failing instance draws traffic) | load-balancing bullet | Google SRE book; shows depth |
| Data plane vs control plane; Istio ambient mode (GA in 1.24, no sidecars) | service-mesh points, tree nodes | mesh questions now include sidecar-less meshes |
| Mesh retries are safe only for idempotent calls | service-mesh trap | Linkerd behaviour; links mesh to idempotency |
| Which HTTP errors to retry (429, 500, 502, 503, 504, timeouts) and which not (400, 401, 403, 404, 422) | timeouts-and-retries (table) | interviewers ask "which errors do you retry?" |
| JDK HttpClient waits forever without a timeout (Java 25) | timeouts-and-retries (Defaults) | proves "always set a timeout" with a real default |
| Resilience4j Retry retries every exception by default; 3 attempts, 500 ms | timeouts-and-retries (Defaults) | common misconfiguration |
| Timeout from the callee's p99.9 | timeouts-and-retries (bullet) | how to choose a timeout is a frequent follow-up |
| Deadline propagation; retry budget (under 10%) | tree | Google SRE practice, asked at senior level |
| Slow calls can open the breaker; one breaker per dependency | circuit-breaker (points) | Resilience4j and Azure; common follow-ups |
| Resilience4j breaker defaults (50%, 100 calls, 60 s, 10 trial calls), CallNotPermittedException | circuit-breaker (Defaults) | asked when Resilience4j is on the CV |
| Why HALF_OPEN exists | circuit-breaker (Interview Q) | Azure rationale |
| Semaphore vs thread-pool bulkhead, defaults, BulkheadFullException | bulkhead | Resilience4j specifics interviewers name |
| Rate-limit algorithms (token, leaky bucket, fixed window, sliding log, sliding counter) | tree under rate-limiting; glossary | standard interview follow-up |
| Load shedding vs rate limiting; 429 vs 503 trap | rate-limiting | Stripe and Google SRE definitions |
| Shared counters (Redis) across gateway instances; Spring Cloud Gateway RequestRateLimiter defaults | rate-limiting | common design follow-up |
| Never fake success for payments; fallback risks (Amazon "avoid fallback") | fallback-and-degradation (trap, Interview Q, minus point) | correctness over availability for money |
| Hystrix is in maintenance mode; Netflix points to Resilience4j | glossary hystrix | still asked as "Hystrix vs Resilience4j" |
| Three ways to keep data private (private tables, schema, server per service) | tree data-isolation-options | The pattern author lists them; makes the "separate server?" answer concrete |
| API composition | tree api-composition; glossary; concept Interview Q | The standard answer to "how do you join across services?" |
| PACELC | concept point; tree; glossary | Owner's scope; common follow-up to CAP |
| Write order: update the database, then delete the key | concept caching-in-microservices (trap, Steps) | Most common caching interview trap; the reference's example had no write path |
| Fixes for stampede (one loader, others wait: leases), penetration (Bloom filter), avalanche (TTL jitter) | concept caching-in-microservices bullets and example | Reference named the problems but not the fixes interviewers ask for |
| Local (in-process) vs shared cache | tree local-cache; Interview Q | Frequent question; reference only named distributed cache |
| Fencing tokens for distributed locks | tree distributed-lock; glossary fencing-token; Interview Q | The precise reason a plain Redis lock is unsafe for correctness |
| Event-sourcing details: snapshots, optimistic append, compensating events, upcasting, personal data (crypto-shredding), when not to use it | concept event-sourcing; tree | Reference had one line on event sourcing |
| CQRS read model sync by events and the disposable view | concept cqrs bullets; tree read-model-sync, materialized-view | Explains how CQRS works across services |
| Event notification vs event-carried state transfer | concept event-driven-architecture (bullets); tree event-notification, event-carried-state-transfer | Fowler's two styles; a common follow-up on event design |
| Command vs Event comparison | comparison command-vs-event | The reference lists both words but never contrasts them; interviewers ask it |
| Schema registry and BACKWARD compatibility | tree schema-registry; glossary schema-registry | The standard answer to "how do you evolve events safely" |
| Kafka share groups (production-ready in 4.2) | concept kafka-fundamentals (bullet, Interview Q); tree share-group | Changes the "Kafka is not a queue" answer in Kafka 4.x |
| KRaft | tree kraft-mode; glossary kraft-mode | ZooKeeper removed in Kafka 4.0 |
| Kafka defaults: acks=all, idempotent producer, retention 7 days, min.insync.replicas 1, isolation.level read_uncommitted | concepts kafka-fundamentals, delivery-guarantees; tree apache-kafka; glossary | Numbers interviewers ask for, with version |
| Commit order decides at-most-once vs at-least-once | comparison at-most-vs-at-least-vs-exactly-once; concept delivery-guarantees | The mechanism behind the guarantees |
| Retry topics and their ordering trade-off; Spring Kafka DefaultErrorHandler and `<topic>-dlt` | concept dead-letter-queues (points, Example, Defaults); tree retry-topic | How DLQs are built in a Spring Boot + Kafka stack |
| RabbitMQ quorum queue delivery limit 20 (4.0+), dead-letter exchanges | concept dead-letter-queues (point, Defaults); tree dead-letter-exchange | RabbitMQ's poison-message answer |
| Debezium outbox router keys events by aggregateid | concept outbox-and-inbox (bullet) | Explains how outbox events keep per-order ordering |
| Pivot transaction, semantic lock, lack of isolation | concept saga (points); tree pivot-transaction, semantic-lock | Standard saga follow-ups (Azure, microservices.io) |
| Compensations can fail: idempotent, retried, alert for manual handling | concept saga (Interview Q, bullet) | Common follow-up question |
| Authorization code flow with PKCE; client credentials flow | jwt-and-oauth (points, Steps, tree) | the flows interviewers ask for users and services |
| Implicit and password grants not to be used (RFC 9700, 2025); OAuth 2.1 still an Internet-Draft (draft 16, Sept 2026) and drops both | jwt-and-oauth bullet | changed recommendation |
| JWS vs JWE; alg allowlist (alg "none", RS256 to HS256 attacks) | jwt-and-oauth trap, point | most common JWT mistake |
| JWT revocation problem: short lifetime, jti denylist, introspection for opaque tokens | jwt-and-oauth point, bullet, Interview Q | commonly asked "how do you log out with JWT" |
| Spring Security 7.1 resource-server defaults (checks signature, exp, nbf, iss; aud only when set; 60 s clock skew) | jwt-and-oauth Defaults, Example | aud is often assumed to be checked |
| Zero trust per NIST SP 800-207; edge vs service-level authorisation | microservices-security | the "gateway already checked" trap |
| W3C traceparent header format | distributed-tracing point, Example | how context actually travels |
| Head vs tail sampling; Spring Boot 4.1 samples 10% by default | distributed-tracing bullet, Defaults | common surprise ("my traces are missing") |
| Micrometer Tracing over OpenTelemetry or Brave in Spring Boot 4.1 | distributed-tracing bullet, tree | Spring interview angle (one line; spring-cloud-stack owns the rest) |
| Spring Boot 4.1 structured logging (ecs, logstash, gelf) and correlation ID in logs by default | observability bullet, Interview Q | current Spring practice |
| Four golden signals, RED, USE | metrics-and-slos points, tree | standard monitoring answer |
| Error budget, error budget arithmetic (99.9% over 30 days = 43.2 min) | metrics-and-slos point, Example, Interview Q | links SLOs to release decisions |
| Percentiles cannot be averaged; use histograms | metrics-and-slos trap, bullet | p99 vs average trap |
| OpenTelemetry Collector | tree `otel-collector` | named in interviews with OTel |
| Probe defaults (periodSeconds 10, timeoutSeconds 1, failureThreshold 3) | health-probes point (Kubernetes 1.37) | interviewers ask; scope asked to verify |
| Spring Boot Actuator probe groups /actuator/health/liveness, /readiness | health-probes point, comparison row, tree | the Spring way to wire probes (Boot 4.1) |
| Liveness must not check shared dependencies (restart storms) | health-probes trap, Interview Q 3 | most common probe mistake; both Kubernetes and Spring Boot docs warn |
| Recreate strategy; maxSurge / maxUnavailable 25%; rollout undo, 10 old ReplicaSets | deployment-strategies tree, points, Example | Kubernetes defaults asked in interviews |
| Expand and contract (parallel change) for APIs and DB columns | deployment-strategies bullet, Interview Q 2, glossary | zero-downtime needs backward-compatible changes |
| Gateway API (and weighted routes for canary) | tree kubernetes-ingress; comparison row | current Kubernetes recommendation |
| Kubernetes 1.24 removed dockershim; containerd or CRI-O; Docker-built images still run | comparison docker-vs-kubernetes | common "does Kubernetes need Docker?" question |
| Container vs VM | containers-and-kubernetes point and Interview Q | classic question; scope asked one line |
| Twelve-Factor config and build-release-run; Spring profiles; env var relaxed binding; @ConfigurationProperties + @Validated | configuration-management | scope; makes the reference's rules concrete |
| Secret manager (HashiCorp Vault), short-lived credentials | configuration-management tree and bullet | scope; reference only says "secure storage" |
| Testcontainers, Pact | testing-microservices points, tree, glossary | scope; the tools interviewers name |
| Spring Cloud Contract moved out of Spring Cloud (Stubborn Contract) | testing-microservices bullet and source | changed on 06-07-2026; see Open questions |
| RestTemplate deprecated in Spring Framework 7.0 (removal planned for a later major) | spring-cloud-stack point, Interview Q, tree node, glossary | Changed in 2025; interviewers still ask about RestTemplate |
| HTTP service clients (@HttpExchange / @GetExchange, Spring 6.0+) | comparison restclient-vs-webclient-vs-feign, tree node, glossary | Spring's recommended declarative client |
| Spring Cloud 2025.1 (Oakwood) baseline and Boot compatibility | spring-cloud-stack point, comparison row | Version-dependent facts need a version |
| @LoadBalanced RestClient.Builder (service name instead of host) | spring-cloud-stack bullet | How Spring calls a service by name |
| Spring Cloud Kubernetes / Eureka optional on Kubernetes | spring-cloud-stack point, Interview Q, tree node | Common follow-up question |
| Spring Framework 7.0 @Retryable and @ConcurrencyLimit | tree node framework-retryable | New in core Spring |
| Spring Cloud Gateway 5.0 variants (Server Web MVC, Server WebFlux) | spring-cloud-stack table, tree node, glossary | Artifacts renamed in 2025.1 |
| Strangler fig: facade, first-service choice, data cutover (ETL, CDC), facade risk, rollback, big-bang rewrite | strangler-fig-migration | Reference had only a one-line description and a drawing |
| Microservice chassis and service template | design-walkthrough tree nodes | The right answer to "shared code" (Q18) |
| "Don't say / Say" table | design-walkthrough | Owner asked for the common wrong answers in one place (links owners, no re-explanation) |

## Dropped
| Reference item | Reason (rare / advanced / duplicate / unverifiable) |
|---|---|
| (no whole item) | |

### Details placed elsewhere or cut, inside items listed above
| Reference item part | What happened |
|---|---|
| M1. Term "Service" | cut: common English word; the glossary rule forbids it as a term (meaning covered by microservice-term) |
| M3. DDD, domain model | also: glossary domain-driven-design |
| M3. Bounded context, aggregate, aggregate root | also: tree nodes + glossary; service-boundaries points and Interview Q |
| M3. Business capability, service boundary, high cohesion, low coupling | also: service-boundaries (hook, points, table); glossary |
| M3. Shared database anti-pattern | also: link to database-per-service (cross-unit owner) |
| M3. Chatty communication, distributed monolith | also: service-boundaries table, tree anti-patterns, Interview Q; glossary |
| M3. How to identify a good boundary (Order, Payment, Inventory example); rule: split by business, not layers | also: service-boundaries (Example, trap, tree node split-by-technical-layer) |
| M5. REST APIs (subtopics: REST, resource, endpoint, HTTP method, JSON) | also: concept rest-apis (hook, points, How it works table); glossary rest |
| M5 (subtopics: DTO, API contract, API versioning) | also: rest-apis (point "DTOs, not entities", Interview Q 3, tree node api-versioning-styles); glossary dto, api-contract, api-versioning, openapi |
| M5 (subtopic: timeout) | also: concept timeouts-and-retries (owner, resilience unit) |
| M5 (part: common status codes 200, 201, 202, 204, 400, 401, 403, 404, 409, 422, 429, 500, 502, 503, 504) | also: rest-apis tree nodes success-codes, client-error-codes, server-error-codes; point and trap "401 vs 403"; Interview Q "409 or 422" |
| M5 (part: API contract example, 201 vs 202) | also: rest-apis Example (201 + Location, 422 problem details); 202 + status URL in tree node async-request-reply |
| M5 (part: common rules: validate input, no entities, consistent errors, backward-compatible contracts) | also: rest-apis (points, How it works bullets: RFC 9457 problem details, versioning; Interview Q 3) |
| M5 (part: rules "set reasonable timeouts", "do not retry every error blindly") | also: concept timeouts-and-retries (owner, resilience unit) |
| M5 (part: idempotency definition; "idempotent does not mean identical response") | also: concept idempotency (point "Idempotent", trap) |
| M5 (part: rule "use an idempotency key for payments") | also: concept idempotency (points, Mermaid, Interview Q 1) |
| M5. REST: 429 Too Many Requests | also: concept rate-limiting (trap, Example); glossary retry-after |
| M5 (subtopic: JSON as a glossary term) | cut: duplicate: common word, no term needed |
| M6. API Gateway (subtopics: gateway, routing, rate limiting, request aggregation, TLS termination, cross-cutting concerns) | also: concept api-gateway (points, Mermaid, tree nodes gateway-routing, gateway-offloading, gateway-aggregation); glossary api-gateway-term, tls-termination, cross-cutting-concern |
| M6 (subtopics: authentication, authorization) | also: concept microservices-security (owner, linked from api-gateway) |
| M6 (part: gateway bottleneck) | also: api-gateway (point "Extra hop", Interview Q 3) |
| M6 (part: routing example diagram) | also: api-gateway How it works (Mermaid) |
| M6 (part: "Why use a gateway if services already have APIs?") | also: api-gateway, Interview Q 1 |
| M6 (part: "What should not be placed in a gateway?") | also: api-gateway trap |
| M6 (part: Gateway vs Load Balancer) | also: comparison api-gateway-vs-load-balancer |
| M6. API gateway: rate limiting at the gateway | also: concept rate-limiting (Mermaid, bullet, Defaults row on Spring Cloud Gateway) |
| M8. Resilience: timeout | also: concept timeouts-and-retries (point, Defaults: JDK HttpClient has no timeout); glossary timeout-term; tree connect-timeout, read-timeout |
| M8. Resilience: retry | also: concept timeouts-and-retries (retry table); tree retry-policy; glossary retry-term |
| M8. Resilience: exponential backoff | also: concept timeouts-and-retries (point, Example); tree exponential-backoff; glossary |
| M8. Resilience: jitter | also: concept timeouts-and-retries (point, Interview Q); tree jitter (full jitter); glossary |
| M8. Resilience: retry storm | also: glossary retry-storm; trap of timeouts-and-retries; comparison retry-vs-circuit-breaker (Risk row) |
| M8. Resilience: important retry rules 1–6 (timeout every call; transient only; bounded with backoff and jitter; avoid multi-layer retries; careful with non-idempotent calls such as payment; idempotency key or deduplication) | also: concept timeouts-and-retries (table, bullets, trap, sayIt, Layers multiply point); link to idempotency (communication unit) |
| M8. Resilience: circuit breaker | also: concept circuit-breaker; glossary circuit-breaker-term |
| M8. Resilience: circuit breaker states (CLOSED, OPEN, HALF-OPEN) | also: concept circuit-breaker (Mermaid state diagram, points); tree closed-state, open-state, half-open-state; glossary |
| M8. Resilience: retry vs circuit breaker table | also: comparison retry-vs-circuit-breaker |
| M8. Resilience: bulkhead | also: concept bulkhead |
| M8. Resilience: bulkhead vs circuit breaker | also: comparison circuit-breaker-vs-bulkhead; trap of bulkhead |
| M8. Resilience: concurrency limit | also: concept bulkhead (semaphore kind, Example maxConcurrentCalls); tree semaphore-bulkhead |
| M8. Resilience: rate limiting | also: concept rate-limiting; glossary rate-limiting-term |
| M8. Resilience: backpressure | also: not repeated: glossary word owned by the basics unit (scaling-services) |
| M8. Resilience: fail fast | also: concept circuit-breaker (OPEN); glossary fail-fast |
| M8. Resilience: fallback | also: concept fallback-and-degradation; tree fallback options; glossary fallback-term |
| M8. Resilience: graceful degradation | also: concept fallback-and-degradation (table of shop features); glossary |
| M8. Resilience: fault tolerance | also: glossary fault-tolerance |
| M8. Resilience: fault isolation | also: glossary fault-isolation (see bulkhead) |
| M9. Database per service (parts: replication, read replica) | cut: Duplicate / out of scope: database replication internals, not a microservices topic; replicas appear only as CAP context |
| M10. Why distributed transactions are difficult | also: concept distributed-transactions (Why it exists, sayIt) |
| M10. ACID, local transaction | also: concept distributed-transactions (point "Local transaction"); tree local-transaction |
| M10. Distributed transaction, 2PC | also: concept distributed-transactions (Mermaid sequence, points, Interview Q); tree two-phase-commit, xa-standard; glossary distributed-transaction, two-phase-commit |
| M10. Saga, compensating transaction | also: concept saga (hook, Steps, points); tree compensating-transaction; glossary saga-term, compensating-transaction |
| M10. Saga example (order, stock, payment, confirm; release stock on payment failure) | also: concept saga (Steps) |
| M10. Compensation caveats (does not erase history, refund is not undo, some steps irreversible) | also: concept saga (point "Compensation", trap, Interview Q "What if a compensating step fails?"); tree pivot-transaction |
| M10. Orchestration, choreography, orchestration vs choreography table | also: comparison orchestration-vs-choreography; tree saga-orchestration, saga-choreography; concept saga (Interview Q) |
| M10. Saga vs 2PC | also: comparison saga-vs-two-phase-commit |
| M10 (part). Consistency boundary | cut: rare as a standalone interview term; the idea is carried by "local transaction" and data ownership (database-per-service, data unit) |
| M11. EDA, event producer, event consumer | also: concept event-driven-architecture (hook, points); glossary event-driven-architecture-term |
| M11. Event schema, event versioning | also: concept event-driven-architecture (point, Example, Interview Q); tree event-versioning, schema-registry; glossary schema-registry |
| M11. Eventual delivery | also: concept event-driven-architecture (Interview Q: late, repeated, out-of-order events) |
| M11. Tiny event example (eventId, eventType, version) | also: concept event-driven-architecture (Example: OrderCreated JSON v2) and delivery-guarantees (eventId dedup code) |
| M11. Topic, partition, offset, broker, replay | also: concept kafka-fundamentals (Mermaid, points, trap); tree kafka-partition, kafka-offset; glossary kafka-topic, kafka-partition, kafka-offset |
| M11. Replication factor | also: concept kafka-fundamentals (bullet: leader, followers, 3 copies common); tree kafka-replication, in-sync-replicas; glossary replication-factor, in-sync-replicas, acks-term, min-insync-replicas |
| M11. Consumer lag | also: concept kafka-fundamentals (Interview Q); glossary consumer-lag |
| M11. At-most-once, at-least-once, exactly-once processing | also: concept delivery-guarantees (embeds comparison at-most-vs-at-least-vs-exactly-once); tree at-most-once, at-least-once, exactly-once |
| M11. Idempotent consumer, deduplication | also: concept delivery-guarantees (point, Example code, Interview Q); tree idempotent-consumer; glossary idempotent-consumer (aka deduplication) |
| M11. "Kafka EOS does not cover external side effects" | also: concept delivery-guarantees (trap, point, Interview Q) |
| M11. Outbox pattern (problem, solution, publisher steps, duplicates) | also: concept outbox-and-inbox (Mermaid, Example, points); tree dual-write, transactional-outbox, polling-publisher, transaction-log-tailing; glossary dual-write, transactional-outbox, change-data-capture |
| M11. Transactional inbox | also: concept outbox-and-inbox (point, bullet); tree transactional-inbox; glossary transactional-inbox |
| M11. Dead-letter queue, poison message | also: concept dead-letter-queues (Steps, points, trap, Interview Qs); tree poison-message, retry-topic, dead-letter-exchange; glossary dead-letter-queue, poison-message |
| M11 (part). Kafka vs RabbitMQ row "ordering depends on queue and consumer setup" (RabbitMQ side) | cut: unverifiable as stated (too vague to source); the table keeps routing, replay and consumer-scaling rows instead |
| M11 (part). "Common for high-throughput pipelines" / speed framing | cut: unverifiable as a comparative claim; the site says "the use case decides, not speed alone" |
| M12. Consistency and CAP (parts: consistency, availability, partition tolerance, CAP theorem, network partition) | also: concept cap-and-consistency (points C, A, P; Mermaid); glossary cap-theorem, network-partition |
| M12. Consistency and CAP (parts: linearizability, eventual consistency, causal consistency) | also: tree consistency-models (4 types); glossary |
| M12. Consistency and CAP (parts: split brain, quorum, clock skew) | also: tree quorum; concept bullet on quorum and split brain; glossary split-brain, quorum, clock-skew |
| M12. Consistency and CAP (part: "CAP made simple", CP vs AP during a partition, do not label every database CP or AP) | also: concept cap-and-consistency (Mermaid, trap, tree cp-choice / ap-choice, bullet "choose per operation") |
| M12. Consistency and CAP (part: strong vs eventual table, bank/inventory vs review count example) | also: comparison strong-vs-eventual-consistency; concept sayIt |
| M12. Consistency and CAP (part: rule "eventual does not mean inconsistent forever") | also: concept cap-and-consistency (Interview Q); glossary eventual-consistency |
| M12. Consistency and CAP (part: race condition) | cut: Generic concurrency term, not specific to this topic; no concept or glossary entry needed |
| M15. Observability (part: observability) | also: concept observability |
| M15. Observability (part: logging) | also: comparison logs-vs-metrics-vs-traces (logs column); tree `logs-pillar` |
| M15. Observability (part: metrics) | also: comparison logs-vs-metrics-vs-traces (metrics column); tree `metrics-pillar` |
| M15. Observability (part: structured logging) | also: concept observability (point, JSON example, Spring Boot 4.1 bullet); glossary |
| M15. Observability (part: correlation ID) | also: concept observability (Interview Q "Correlation ID vs trace ID?"); tree; glossary |
| M15. Observability (part: alerting) | also: concept metrics-and-slos (point "Alert": page on symptoms) |
| M15. Observability (part: dashboard) | also: comparison logs-vs-metrics-vs-traces (metrics "Best for") |
| M15. Observability (part: the three pillars table) | also: comparison logs-vs-metrics-vs-traces, embedded in observability |
| M15. Observability (rules: no sensitive data in logs; success response is not business success; monitor user outcomes) | also: microservices-security point "Logs"; observability point "HTTP 200"; metrics-and-slos point "Alert" |
| M15. Observability (rule: avoid high-cardinality labels) | also: observability point "Metric labels"; glossary `high-cardinality` |
| M15. Observability (rule: use correlation IDs to connect logs) | also: observability point "Trace ID in logs" |
| M15. Observability (parts: distributed tracing, trace, span, trace ID) | also: concept distributed-tracing (Mermaid, points); tree `tracing-span`, `trace-id-field`; glossary |
| M15. Observability (part: OpenTelemetry) | also: concept distributed-tracing (point, Interview Q); tree `opentelemetry-project`, `otel-collector`; glossary |
| M15. Observability (rule: propagate trace context) | also: distributed-tracing trap and Interview Q; `traceparent` example |
| M15. Observability (parts: SLO, SLI, SLA) | also: comparison sli-vs-slo-vs-sla, embedded in metrics-and-slos; tree; glossary |
| M15. Observability (part: error rate) | also: tree `errors-signal`; RED point |
| M15. Observability (part: latency percentile) | also: metrics-and-slos point and trap; tree `latency-p99`; glossary `latency-percentile` |
| M15. Observability (part: throughput) | also: tree `traffic-signal` (requests per second) |
| M16. Deployment, containers, Kubernetes (parts: container, Docker image, Docker container) | also: concept containers-and-kubernetes (points, Interview Q container vs VM); tree docker → container-image, software-container; glossary |
| M16. (part: container orchestration, Kubernetes) | also: concept containers-and-kubernetes (Why, Mermaid); glossary `kubernetes` |
| M16. (parts: Pod, Deployment, Service (Kubernetes)) | also: tree kubernetes-pod, kubernetes-deployment → kubernetes-replicaset, kubernetes-service; Mermaid; Example (Deployment YAML) |
| M16. (part: ConfigMap) | also: tree kubernetes-configmap (no secrecy, 1 MiB); glossary |
| M16. (part: Secret: access controls and encryption still needed) | also: tree kubernetes-secret (base64 only, unencrypted in etcd by default); glossary |
| M16. (parts: horizontal scaling, autoscaling) | also: tree horizontal-pod-autoscaler; Mermaid (HPA scales the Deployment) |
| M16. (Docker vs Kubernetes: build/run vs manage across cluster; Kubernetes does not replace app timeouts/retries) | also: comparison docker-vs-kubernetes; containers-and-kubernetes bullet + Interview Q linking timeouts-and-retries and circuit-breaker |
| M16. (rules: a restart does not fix the bug; K8s cannot see business failures) | also: containers-and-kubernetes trap |
| M16. (rule: persistent data not only in the writable layer) | also: containers-and-kubernetes point "Writable layer"; tree note software-container |
| M16. (rule: stateless services scale more easily) | also: link only: owned by scaling-services (basics unit) |
| M16. (parts: readiness probe, liveness probe) | also: concept health-probes; comparison liveness-vs-readiness-probe; glossary |
| M16. (rule: readiness and liveness have different purposes) | also: health-probes hook, trap, comparison rows |
| M16. (parts: rolling deployment, deployment strategies: rolling, blue-green, canary) | also: concept deployment-strategies; comparison rolling-vs-blue-green-vs-canary; glossary |
| M16. (part: rollback) | also: deployment-strategies point "Rollback" (rollout undo, 10 old ReplicaSets); comparison row Rollback |
| M16. (part: feature flag) | also: deployment-strategies point + bullet (deploy vs release); glossary feature-flag |
| M16. (part: CI) | also: tree ci-cd-pipeline → continuous-integration; glossary |
| M17. (part: service endpoint) | cut: duplicate: covered by Kubernetes Service here and service-discovery (communication unit) |
| M17. (rule: do not change a public API just because an environment changes) | cut: duplicate: API compatibility is covered by expand and contract in deployment-strategies |
| M18. (parts: smoke testing, load testing, stress testing) | cut: rare in microservices interviews (general testing vocabulary); also the reference's "smoke test after deployment" differs from k6's definition (minimal-load sanity test). Owner may restore as glossary terms |
| M18. (part: test environment) | cut: rare: a plain phrase, nothing to learn |
| M19 (part: API Gateway pattern) | also: concept api-gateway |
| M19 (part: Backend for Frontend) | also: api-gateway (point, tree node backend-for-frontend, Interview Q 2); glossary backend-for-frontend |
| M19 (part: Sidecar pattern) | also: concept service-mesh (Mermaid, tree node sidecar-proxy, Interview Q 1); glossary sidecar |
| M19. Patterns: Circuit Breaker pattern | also: concept circuit-breaker |
| M19. Patterns: Bulkhead pattern, bulkhead isolation | also: concept bulkhead |
| M19. Design patterns (part: CQRS, "Separate reads from writes") | also: concept cqrs |
| M19. Design patterns (part: Event Sourcing, "Store state changes as events") | also: concept event-sourcing |
| M19. Common design patterns (part: subtopics list: API gateway, discovery, saga, circuit breaker, bulkhead, retry, timeout, strangler fig, sidecar, BFF, CQRS, event sourcing, outbox, inbox, ACL, bulkhead isolation, leader election) | also: concept microservice-patterns-map (problem → pattern table linking each owner) |
| M19. (part: confusing patterns table: saga, outbox, CQRS, event sourcing, strangler fig, BFF, ACL, sidecar) | also: concept microservice-patterns-map (table rows + "mixed up with" compare links) |
| M19. (part: leader election) | also: microservice-patterns-map: bullet, Interview Q, tree node leader-election (lease, election algorithms), glossary |
| M19. (part: anti-corruption layer) | also: concept strangler-fig-migration (point, bullet, Interview Q), tree node anti-corruption-layer, glossary; linked from the patterns map |
| M19. (part: Strangler Fig pattern) | also: concept strangler-fig-migration (Steps) |
| M19. (part: Strangler Fig example, billing moved to a new service) | also: strangler-fig-migration Example (Gateway routes: /payments moved, /orders not yet) |
| M20 (part). @Transactional does not span HTTP calls; local rollback cannot undo a payment | also: concept distributed-transactions (trap, Example, Interview Q) |
| M20. (part: common technologies list) | also: concept spring-cloud-stack (need → Spring choice table), tree nodes |
| M20. (part: calling another service with RestClient) | also: spring-cloud-stack Example |
| M20. (part: Spring Boot vs Spring Cloud table) | also: comparison spring-boot-vs-spring-cloud; Interview Q |
| M20. (part: common annotations list) | cut: out of scope: general Spring annotations (no cross-tech links); only @LoadBalanced, @GetExchange, @FeignClient, @KafkaListener kept in spring-cloud-stack |
| M20. (part: simple REST service example, OrderController) | cut: duplicate: plain Spring Web code; REST design is owned by rest-apis, and no cross-tech link is allowed |
| M21. N+1 query problem | cut: not microservice-specific; a data-access topic (already covered in the SQL and Spring Boot techs) |
| M21. Term "Capacity" | cut: common English word as a glossary term; the idea stays in the scaling Interview Q and Example |

## Template v3 rewrite (21-10-2026)

Every concept and comparison was rewritten in teaching template v3 (CLAUDE.md 3.1.1) and given a cheat-sheet card; each reference item mapped above still lands in the same concept id. An independent pass then checked about 1,620 claims and fixed 33, removing 3.

### Unit basics

**Added from the reference**

| Reference item | Concept |
|---|---|
| M2. "Microservices are not always better" / codebase large is not a reason (M2 interview answer) | monolith-and-microservices, Common mistakes |
| M2. Failure handling row of the table | comparison monolith-vs-microservices, new row "When a part fails" |
| M1. Service, independent deployment, service autonomy explained in plain words | monolith-and-microservices, What it is and Rules |
| M3. Domain service (stateless operation across aggregates) | service-boundaries, Rules |
| M3. Entity-per-service and too-fine-grained splits (chatty communication) | service-boundaries, Common mistakes and scenario |
| M24. "A network call can fail even when both services are running" | distributed-systems-fallacies, Common mistakes (moved from trap; trap is now the timeout = unknown outcome mistake) |
| M21. Deployment vs scaling (M23.20) together with Q12 scaling vs load balancing | scaling-services, Interview Q 1 |
| M8. Retry rule 6 (idempotency key) and 'payment creation is not safe to retry' | timeouts-and-retries, scenario 3 |
| M8. Timeout vs retry (M23.5) | timeouts-and-retries, Not to be confused with (removed as Interview Q to avoid repeating) |
| M22.Q16 Retry vs fallback | fallback-and-degradation, Not to be confused with (removed as Interview Q) |
| M8. Concurrency limit vs rate limiting | rate-limiting, Not to be confused with (rate limit vs load shedding vs bulkhead) |
| Rate limiting vs load shedding (was an Interview Q) | rate-limiting, Not to be confused with |
Other new facts (verified 21-10-2026): PostgreSQL 18 reserves 3 superuser connections by default; Resilience4j 2.x minimumNumberOfCalls 100 and slow-call defaults (60 s, 100%); thread-pool bulkhead core = CPU count − 1; Resilience4j retries every exception by default (run locally); Amazon's p99.9 timeout rule; Spring Cloud Gateway 5.0.3 Redis limiter = token bucket (replenishRate, burstCapacity, requestedTokens) and empty key denied by default; Resilience4j fallback signature rule; AWS REL05-BP01 soft/hard dependencies, simple tested failure paths, consistency first for payments.

**Corrections**

| What | Fix | Source |
|---|---|---|
| Draft fallacies point "L. Peter Deutsch, eighth by James Gosling" lacked dates | Deutsch listed seven at Sun in 1994; Gosling added the eighth around 1997 | Wikipedia, Fallacies of distributed computing |
| Draft scaling Example said 2 more instances break the database at max_connections 100 | Counted the 3 reserved superuser slots: app users get 97, so 10 instances × 10 = 100 is already too many | PostgreSQL 18 docs, runtime-config-connection |
| Draft circuit breaker point "Slow calls can open it too" without the default | Added: the default slow-call threshold is 60 s at 100% slow calls, so set slowCallDurationThreshold lower | Resilience4j CircuitBreaker docs; 2.4.0 jar run |
| Draft timeouts Example used `enableRandomizedWait` with exponential backoff in YAML; that property is not on the Resilience4j Spring Boot getting-started page | Replaced by a runnable core-API example with `IntervalFunction.ofExponentialRandomBackoff` | Resilience4j 2.4.0 jars, run locally |
| Spring Cloud Gateway rate-limit page: an empty-key status of 403 is not stated on the page | Wrote only "denied by default" | Spring Cloud Gateway 5.0.3 RequestRateLimiter page |
Reference: no wrong statements found in M1–M3, M8, M21 for these concepts. The reference's 3 × 3 = 9 retry example is kept as the same rule with 3 layers (27).

### Unit communication

**Added from the reference**

| Reference item | Concept |
|---|---|
| M4 OrderCreated example flow (save, publish, others react) | sync-and-async-communication, How it works steps + Java example |
| M4 "async does not guarantee processing: delayed, duplicated, dead-lettered" | sync-and-async-communication, Rules and defaults (links dead-letter-queues) |
| M22.Q3 "the choice depends on immediate response, coupling, delivery guarantees" | sync-and-async-communication, Interview Q 1 |
| M5 201 vs 202 for the order contract | rest-apis Example (201 + Location); 202 rule lives in sync-and-async-communication |
| M5 common rules: validate input, consistent errors, backward-compatible contracts | rest-apis How it works steps 3-4, Rules and defaults |
| M5 409 Conflict "conflicts with current state" | rest-apis Interview Q 2 (cancelling a shipped order) |
| M6 "Why use a gateway if services already have APIs?" | api-gateway Interview Q 1 |
| M6 TLS termination, request aggregation, rate limiting (429) | api-gateway How it works steps 2 and 5 |
| M7 "dynamic scaling": new instances must get traffic | service-discovery Why + scenario 1 |
| M7 "healthy instance may still be overloaded"; "LB is not fault tolerance by itself" | load-balancing trap, Common mistakes, Interview Q 3 |
| M7 weighted routing | load-balancing Example (`weight=2`) |
| M22.Q12 scaling vs load balancing | load-balancing, Not to be confused with |
| M20 "Calling another service" (RestClient, payment-service must resolve) | service-discovery Example (`@LoadBalanced`), Kubernetes DNS note |
| M23.4 service discovery vs load balancing | service-discovery trap + Not to be confused with |
Also added (verified, not in the reference): Async Request-Reply details (Location, 200 while running); `WWW-Authenticate` on 401; gRPC `reserved` fields and "do not change a field type"; gRPC deadline propagation only automatic in Java and Go; Spring Cloud LoadBalancer 35 s instance cache; Eureka "up to 3 heartbeats" to become visible; NGINX passive check defaults and active checks only in NGINX Plus; Istio sidecar injection by namespace label at Pod creation; Spring Cloud Gateway `lb://` and 503 when no instance; property prefix moved to `spring.cloud.gateway.server.webflux` in Spring Cloud 2025.0.
Coverage file changes for the owner to record: idempotency Interview Q 3 is now "How long should you keep idempotency keys?"; the idempotency-vs-deduplication question (M23.19) is now answered in idempotency's "Not to be confused with" section and the comparison. The idempotency "Prefer natural idempotency" bullet became a point plus a Rules line. rest-apis no longer links the tree node `client-error-codes` (the status-code families are in How it works and points).

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| service-mesh trap said "Linkerd retries only idempotent requests within a retry budget" | Current Linkerd docs (retries via HTTPRoute annotations, 2.16+) only advise using retries on idempotent methods; no automatic idempotent-only rule or budget is stated. The trap now says retries are safe only for idempotent calls and cites that advice. | https://linkerd.io/2/features/retries-and-timeouts/ (21-10-2026) |
| grpc draft implied deadline propagation is general | Automatic only in Java and Go; C++ must enable it | https://grpc.io/docs/guides/deadlines/ (21-10-2026) |
| sync-and-async-communication example returned "201 Created at once" for an order whose payment is pending | Kept 201-style creation but the example now shows the order returned as PENDING; 202 + status URL is the rule for long work over HTTP | Azure Asynchronous Request-Reply pattern (21-10-2026) |

### Unit data

**Added from the reference**

| Reference item | Landed in |
|---|---|
| M9 "Common mistake": a shared database with open access makes a distributed monolith | database-per-service, Not to be confused with (server vs tables rule) |
| M9 "Can one service access another's database directly?" (read-only angle) | database-per-service, Common mistakes ("harmless if I only read") |
| M9 data duplication (local copy is allowed) | database-per-service, How it works step 3 and Common mistakes |
| M9 "separate databases, schemas, credentials, access permissions" | database-per-service, Example (SQL GRANT + JDBC currentSchema, run on PostgreSQL 18) |
| M12 "do not describe every database as simply CP or AP" | cap-and-consistency, Common mistakes |
| M12 quorum, split brain | cap-and-consistency, Example (3-node quorum table) and scenario 3 |
| M12 read-your-writes, causal | cap-and-consistency, point and Rules |
| M13 rules: cache is not the truth, invalidation, TTL length, local caches go stale | caching-in-microservices, Rules and Common mistakes |
| M13 write-through, write-behind | caching-in-microservices, Not to be confused with |
| M13 stampede (also a new Interview Q), penetration, avalanche | caching-in-microservices, Rules, Interview Q 3, scenario 3 |
| M19 "CQRS does not require event sourcing" | cqrs, trap and Common mistakes (models can share one database) |
| M19 "Event sourcing ... can be used together, different problems" | cqrs and event-sourcing, Not to be confused with |
Also added (beyond the reference, verified): CQRS "use it for parts only, risky complexity" (Fowler); CQRS Interview Q "Why not a read replica?"; event sourcing: Kafka is not an event store, integration events, idempotent consumers, use selectively, sealed-switch exhaustiveness (JEP 441).

**Corrections**

- None to the reference in this unit beyond the existing coverage row (M19 "event sourcing does not require separate read and write models" is technically true; the content keeps "nearly always comes with CQRS", source Azure Event Sourcing pattern, which says applications typically implement materialized views because reading and replaying events is costly).
- Draft fix: the CQRS draft implied the DB write and event publish can never be in one transaction; now "usually cannot", matching the Azure CQRS pattern wording.

### Unit deployment

**Added from the reference**

| Reference item | Landed in |
|---|---|
| M16 Pod, Deployment, Service (Kubernetes) parts | containers-and-kubernetes How it works steps 3-4, new Interview Q "What do a Pod, a Deployment and a Service do?" |
| M16 Ingress "needs a suitable controller" (already corrected to Gateway API) | containers-and-kubernetes Rules and defaults (controller needed, API frozen) |
| M16 rule "Kubernetes cannot see business failures" | containers-and-kubernetes Rules and defaults "Not Kubernetes' job" (also trap) |
| M16 startup probe | health-probes How it works step 1, scenario 1 |
| M16 rollback | deployment-strategies How it works step 5, scenario 2, Rules (progress deadline, no automatic rollback) |
| M16 feature flag (deploy vs release) | deployment-strategies Not to be confused with |
| M17 validate required configuration at startup | configuration-management Example (record with @Validated, real failure message), Rules "Validation" |
| M17 configuration drift | configuration-management Common mistakes |
| M17 rule "different settings per environment" | configuration-management scenario 1 |
| M18 why contract testing matters (paymentStatus to status) | testing-microservices Why, Example, scenario 1 (adding a field does not break the contract) |
| M18 test double, mock | testing-microservices What it is |
| M18 pyramid | testing-microservices Mermaid pyramid and steps |
| M19 confusing patterns (saga vs outbox) | microservice-patterns-map Common mistakes, cheat remember, scenario 1 |
| M19 CQRS vs event sourcing | microservice-patterns-map Interview Q (links the comparison in the table) |
| M19 strangler fig example | strangler-fig-migration Mermaid and Example |
| M20 calling another service (RestClient, needs timeouts) | spring-cloud-stack Example, now an HTTP service client with a read timeout |
| M20 "Spring Cloud does not make it microservices" | spring-cloud-stack trap |
| M22 Q19 deploy without downtime | deployment-strategies Interview Q 1 |
| M22 Q18 shared library | design-walkthrough Interview Q 1 |
| M25 best interview strategy | design-walkthrough How it works (6 steps) and Example (failure table on the money path) |

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| Draft health-probes did not say that a missing probe counts as passing | Added: no readiness probe means the Pod gets traffic as soon as its container runs | https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/ |
| Draft deployment-strategies did not say what happens to a stuck rollout | Added: progressDeadlineSeconds 600 s, reported as failed, no automatic rollback | https://kubernetes.io/docs/concepts/workloads/controllers/deployment/ |
| Draft design-walkthrough had no running-example failures; first version of the new table said "stock runs out after the order was saved ... refund" | Matched to the saga flow: out of stock cancels the order before any charge; a declined card releases stock and cancels | content/microservices/cards/saga.mdx (same tech), https://microservices.io/patterns/data/saga.html |
| spring-boot-vs-spring-cloud row: "for Boot 4.0 and 4.1" | "for Boot 4.0 and 4.1 (4.1 from 2025.1.2)" | https://spring.io/projects/spring-cloud |
| Note: the blog "state of HTTP clients" says RestTemplate gets the formal @Deprecated mark in Framework 7.1; the Framework 7.0 reference says "As of Spring Framework 7.0, RestTemplate is deprecated". Kept "deprecated in Spring Framework 7.0" (reference docs are the primary source). | unchanged | https://docs.spring.io/spring-framework/reference/integration/rest-clients.html |

### Unit messaging

**Added from the reference**

| Reference item | Landed in |
|---|---|
| M10. Compensation caveats: does not erase history, refund is not an undo, some steps cannot be reversed | saga, Rules and defaults ("Compensation is not erasure") |
| M10. Saga example (create order, reserve stock, charge, confirm; release stock on payment failure) | saga, Mermaid + numbered steps + scenario (out of stock) |
| M10. Orchestration vs choreography (coordinator can become complex; event flows hard to trace) | saga, Not to be confused with + Interview Q; comparison explain/example |
| M10. Saga vs 2PC ("participants may have to wait") | distributed-transactions scenario (coordinator crash), comparison example |
| M11. Event schema and versioning, eventual delivery | event-driven-architecture, Rules and defaults + scenario (rename breaks consumers) |
| M11. Replay | kafka-fundamentals scenario (reset offsets to reprocess after a bug) |
| M11. Consumer lag | kafka-fundamentals, Rules and defaults + Interview Q |
| M11. Tiny event example (eventId, eventType, version) | event-driven-architecture Example (eventId, type, version, correlationId) |
| M11. Dedup record saved with the business update in one transaction | delivery-guarantees Example + scenario (two racing copies) |
| M11. Outbox publisher steps (read, publish, mark published) | outbox-and-inbox, How it works steps 2-4 |
| M24. Outbox solves publication, not every duplication | outbox-and-inbox point "Duplicates remain", cheat remember, Interview Q |
| M22.Q5. @Transactional is not a global transaction | distributed-transactions trap, Example, Interview Q; saga Interview Q |

**Added beyond the reference (all verified 21-10-2026)**

| Item | Concept | Source |
|---|---|---|
| Fowler: event notification hides the flow; event-carried state transfer copies data | event-driven-architecture | martinfowler.com/articles/201701-event-driven.html |
| Adding partitions changes which partition a key maps to | kafka-fundamentals (Interview Q) | kafka.apache.org/43/operations/basic-kafka-operations/ |
| min.insync.replicas default 1; docs suggest RF 3 + min.insync.replicas 2 + acks=all; NotEnoughReplicas error | kafka-fundamentals (Rules) | kafka.apache.org/43/configuration/topic-configs/ |
| Records without a key use the sticky partitioner, so no order between them | kafka-fundamentals (Example) | kafka.apache.org/43/configuration/producer-configs/ |
| Reset offsets with kafka-consumer-groups.sh --reset-offsets --to-datetime (consumers inactive) | kafka-fundamentals (scenario) | kafka.apache.org/43/operations/basic-kafka-operations/ |
| Spring Kafka 4.1: enable.auto.commit=false, AckMode BATCH commits after the poll's records are processed | delivery-guarantees (Rules) | docs.spring.io/spring-kafka/reference/kafka/receiving-messages/message-listener-container.html |
| Plain consumer: enable.auto.commit=true, every 5 s | delivery-guarantees (Rules) | kafka.apache.org/43/configuration/consumer-configs/ |
| Idempotent producer only removes duplicates from its own retries | delivery-guarantees (Interview Q, Not to be confused with) | kafka.apache.org/43/design/design/ |
| Polling publisher: tricky to publish in order; log tailing database-specific | outbox-and-inbox (Rules, Interview Q) | microservices.io polling-publisher, transaction-log-tailing |
| KafkaTemplate.send() is asynchronous (returns CompletableFuture) | outbox-and-inbox (Common mistakes) | checked with javap on spring-kafka 4.1.1 |
| After-commit hook still loses events on a crash | outbox-and-inbox (Common mistakes) | microservices.io transactional-outbox |
| Debezium 3.7 outbox columns and default topic outbox.event.<aggregatetype> | outbox-and-inbox (Example, Rules) | debezium.io outbox-event-router |
| DLT headers (exception, original topic/partition/offset); same partition, so DLT needs as many partitions | dead-letter-queues (steps, Example) | docs.spring.io/spring-kafka/reference/kafka/annotation-error-handling.html |
| Default non-retryable exceptions list | dead-letter-queues (Rules) | same |
| Spring Boot applies a CommonErrorHandler bean to the default listener factory | dead-letter-queues (Example) | docs.spring.io/spring-boot/reference/messaging/kafka.html |
| Retry topics: naming like orders-retry-1000, ordering lost | dead-letter-queues (Rules, scenario) | docs.spring.io/spring-kafka/reference/retrytopic/how-the-pattern-works.html |
| Replay DLQ only to idempotent consumers | dead-letter-queues (Common mistakes, Interview Q) | reasoning from at-least-once; no new fact |
| PostgreSQL 18 max_prepared_transactions = 0 (2PC off by default); meant for transaction managers; prepared transactions keep locks | distributed-transactions (point, Rules) | postgresql.org/docs/18/runtime-config-resource.html, sql-prepare-transaction.html |
| A timeout means unknown outcome: the charge may have gone through | distributed-transactions Example; saga Common mistakes | links to idempotency concept |
| Saga countermeasures beyond semantic lock (commutative updates, reread values); pivot and retryable steps | saga (Rules, Interview Q) | learn.microsoft.com/azure/architecture/patterns/saga |
| Orchestrator persists saga state; replies may arrive twice | saga (Example) | microservices.io saga; Azure saga (idempotence) |

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| Draft outbox Rules implied the relay always publishes in commit order | Polling: strict order is tricky; per-order order comes from keying by aggregate id | microservices.io/patterns/data/polling-publisher.html |
| Draft saga said compensations run "newest first" (my first v3 draft) | Removed: Azure says only that compensations undo finished steps | learn.microsoft.com/azure/architecture/patterns/compensating-transaction |
| Draft DLQ Defaults showed "then log and skip" only in a table | Made explicit that without a recoverer a failed record is only logged (silent loss risk), with a scenario | Spring for Apache Kafka 4.1 error handling |
| Reference M11 Kafka vs RabbitMQ "queue behaviour depends on configuration" | Stated concretely: a queue message is removed on ack; streams (3.9+) allow replay | rabbitmq.com/tutorials/amqp-concepts, rabbitmq.com/docs/streams |

### Unit playbook

**Added from the reference**

| Reference item | Landed in |
|---|---|
| M16 Pod, Deployment, Service (Kubernetes) parts | containers-and-kubernetes How it works steps 3-4, new Interview Q "What do a Pod, a Deployment and a Service do?" |
| M16 Ingress "needs a suitable controller" (already corrected to Gateway API) | containers-and-kubernetes Rules and defaults (controller needed, API frozen) |
| M16 rule "Kubernetes cannot see business failures" | containers-and-kubernetes Rules and defaults "Not Kubernetes' job" (also trap) |
| M16 startup probe | health-probes How it works step 1, scenario 1 |
| M16 rollback | deployment-strategies How it works step 5, scenario 2, Rules (progress deadline, no automatic rollback) |
| M16 feature flag (deploy vs release) | deployment-strategies Not to be confused with |
| M17 validate required configuration at startup | configuration-management Example (record with @Validated, real failure message), Rules "Validation" |
| M17 configuration drift | configuration-management Common mistakes |
| M17 rule "different settings per environment" | configuration-management scenario 1 |
| M18 why contract testing matters (paymentStatus to status) | testing-microservices Why, Example, scenario 1 (adding a field does not break the contract) |
| M18 test double, mock | testing-microservices What it is |
| M18 pyramid | testing-microservices Mermaid pyramid and steps |
| M19 confusing patterns (saga vs outbox) | microservice-patterns-map Common mistakes, cheat remember, scenario 1 |
| M19 CQRS vs event sourcing | microservice-patterns-map Interview Q (links the comparison in the table) |
| M19 strangler fig example | strangler-fig-migration Mermaid and Example |
| M20 calling another service (RestClient, needs timeouts) | spring-cloud-stack Example, now an HTTP service client with a read timeout |
| M20 "Spring Cloud does not make it microservices" | spring-cloud-stack trap |
| M22 Q19 deploy without downtime | deployment-strategies Interview Q 1 |
| M22 Q18 shared library | design-walkthrough Interview Q 1 |
| M25 best interview strategy | design-walkthrough How it works (6 steps) and Example (failure table on the money path) |

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| Draft health-probes did not say that a missing probe counts as passing | Added: no readiness probe means the Pod gets traffic as soon as its container runs | https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/ |
| Draft deployment-strategies did not say what happens to a stuck rollout | Added: progressDeadlineSeconds 600 s, reported as failed, no automatic rollback | https://kubernetes.io/docs/concepts/workloads/controllers/deployment/ |
| Draft design-walkthrough had no running-example failures; first version of the new table said "stock runs out after the order was saved ... refund" | Matched to the saga flow: out of stock cancels the order before any charge; a declined card releases stock and cancels | content/microservices/cards/saga.mdx (same tech), https://microservices.io/patterns/data/saga.html |
| spring-boot-vs-spring-cloud row: "for Boot 4.0 and 4.1" | "for Boot 4.0 and 4.1 (4.1 from 2025.1.2)" | https://spring.io/projects/spring-cloud |
| Note: the blog "state of HTTP clients" says RestTemplate gets the formal @Deprecated mark in Framework 7.1; the Framework 7.0 reference says "As of Spring Framework 7.0, RestTemplate is deprecated". Kept "deprecated in Spring Framework 7.0" (reference docs are the primary source). | unchanged | https://docs.spring.io/spring-framework/reference/integration/rest-clients.html |

### Unit resilience

**Added from the reference**

| Reference item | Concept |
|---|---|
| M2. "Microservices are not always better" / codebase large is not a reason (M2 interview answer) | monolith-and-microservices, Common mistakes |
| M2. Failure handling row of the table | comparison monolith-vs-microservices, new row "When a part fails" |
| M1. Service, independent deployment, service autonomy explained in plain words | monolith-and-microservices, What it is and Rules |
| M3. Domain service (stateless operation across aggregates) | service-boundaries, Rules |
| M3. Entity-per-service and too-fine-grained splits (chatty communication) | service-boundaries, Common mistakes and scenario |
| M24. "A network call can fail even when both services are running" | distributed-systems-fallacies, Common mistakes (moved from trap; trap is now the timeout = unknown outcome mistake) |
| M21. Deployment vs scaling (M23.20) together with Q12 scaling vs load balancing | scaling-services, Interview Q 1 |
| M8. Retry rule 6 (idempotency key) and 'payment creation is not safe to retry' | timeouts-and-retries, scenario 3 |
| M8. Timeout vs retry (M23.5) | timeouts-and-retries, Not to be confused with (removed as Interview Q to avoid repeating) |
| M22.Q16 Retry vs fallback | fallback-and-degradation, Not to be confused with (removed as Interview Q) |
| M8. Concurrency limit vs rate limiting | rate-limiting, Not to be confused with (rate limit vs load shedding vs bulkhead) |
| Rate limiting vs load shedding (was an Interview Q) | rate-limiting, Not to be confused with |
Other new facts (verified 21-10-2026): PostgreSQL 18 reserves 3 superuser connections by default; Resilience4j 2.x minimumNumberOfCalls 100 and slow-call defaults (60 s, 100%); thread-pool bulkhead core = CPU count − 1; Resilience4j retries every exception by default (run locally); Amazon's p99.9 timeout rule; Spring Cloud Gateway 5.0.3 Redis limiter = token bucket (replenishRate, burstCapacity, requestedTokens) and empty key denied by default; Resilience4j fallback signature rule; AWS REL05-BP01 soft/hard dependencies, simple tested failure paths, consistency first for payments.

**Corrections**

| What | Fix | Source |
|---|---|---|
| Draft fallacies point "L. Peter Deutsch, eighth by James Gosling" lacked dates | Deutsch listed seven at Sun in 1994; Gosling added the eighth around 1997 | Wikipedia, Fallacies of distributed computing |
| Draft scaling Example said 2 more instances break the database at max_connections 100 | Counted the 3 reserved superuser slots: app users get 97, so 10 instances × 10 = 100 is already too many | PostgreSQL 18 docs, runtime-config-connection |
| Draft circuit breaker point "Slow calls can open it too" without the default | Added: the default slow-call threshold is 60 s at 100% slow calls, so set slowCallDurationThreshold lower | Resilience4j CircuitBreaker docs; 2.4.0 jar run |
| Draft timeouts Example used `enableRandomizedWait` with exponential backoff in YAML; that property is not on the Resilience4j Spring Boot getting-started page | Replaced by a runnable core-API example with `IntervalFunction.ofExponentialRandomBackoff` | Resilience4j 2.4.0 jars, run locally |
| Spring Cloud Gateway rate-limit page: an empty-key status of 403 is not stated on the page | Wrote only "denied by default" | Spring Cloud Gateway 5.0.3 RequestRateLimiter page |
Reference: no wrong statements found in M1–M3, M8, M21 for these concepts. The reference's 3 × 3 = 9 retry example is kept as the same rule with 3 layers (27).

### Unit security-observability

**Added from the reference**

| Reference item | Concept |
|---|---|
| M14 JWT authentication flow (5 steps) | jwt-and-oauth, How it works (now 6 steps with refresh; plus client credentials line) |
| M14 rule: valid token is not access to everything | microservices-security Example (ownership check in code) + scenario |
| M14 encryption in transit / at rest | microservices-security, Rules and defaults |
| M14 audit logging | microservices-security, How it works step 5 |
| M14 rule: no secrets in browser-exposed config | microservices-security, Rules (links to configuration-management) |
| M14 API key vs JWT: revocation, scope, storage matter | comparison api-key-vs-jwt (explain, example) |
| M15 correlation ID vs trace ID | observability, Not to be confused with (moved from an Interview Q) |
| M15 rule: success response is not business success | observability, Rules + new Interview Q |
| M15 rule: avoid high-cardinality labels | observability scenario + new Interview Q |
| M15 alerting / dashboards | metrics-and-slos How it works step 5, Common mistakes (symptoms vs causes) |
Added beyond the reference (verified): JWK set caching (5 min) and lazy key discovery angle; SCOPE_ authority prefix; PKCE "why" Interview Q (RFC 7636); RFC 9700 audience restriction and PKCE MUST/RECOMMENDED split; head vs tail sampling Interview Q; "100% is the wrong SLO" and "how to choose an SLO" (SRE ch. 3 and 4); RED vs USE vs golden signals section.

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| Draft: "do not use the implicit or password grants" (same strength for both) | password grant MUST NOT; implicit SHOULD NOT (RFC 9700) | https://www.rfc-editor.org/rfc/rfc9700 |
| Draft Defaults row "Header it sends: W3C traceparent" was sourced to the tracing page, which does not state it | kept, now sourced to TracingProperties (produce = W3C) in Spring Boot 4.1.1 source | https://github.com/spring-projects/spring-boot/blob/v4.1.1/module/spring-boot-micrometer-tracing/src/main/java/org/springframework/boot/micrometer/tracing/autoconfigure/TracingProperties.java |
| Observability JSON example implied a Spring format | labelled "simplified; real field names depend on the format" (ECS uses @timestamp, log.level, service.name) | https://docs.spring.io/spring-boot/reference/features/logging.html |
| Draft example amount ₹2,499 | ₹500, the running example | tech notes |
| Reference M15 flat trace list (gateway 20 ms) | already corrected earlier to a span tree; kept | OpenTelemetry observability primer |
