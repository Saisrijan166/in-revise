# Plan: Microservices (new tech, 20-10-2026)

Phase 4 (new tech), following Phase 3 with the reference (CLAUDE.md 3.8). Reference: `reference/microservices.md` (owner input,
not a source; 25 numbered sections, 20 interview questions in section 22, a 20-row differences table in section 23). Arrived as
`reference/reference.md` and was renamed by the CLAUDE.md 3.8 convention. Owner note: no repeated content, not lengthy.

Slug `microservices`, accent amber (unused by other techs). Baseline (checked 20-10-2026): Java 25, Spring Boot 4.1 with Spring
Cloud 2025.1 (Oakwood), Apache Kafka 4.3, Kubernetes 1.37, Resilience4j 2.x, OpenTelemetry. Vendor-neutral idea first; products
as examples. App code: Java only.

## Shape

- 44 concepts in 8 topics; whole concept file ≤ 550 words; primary sources (RFCs, product docs, microservices.io,
  martinfowler.com, Azure and AWS architecture guidance, the Google SRE book, OWASP, NIST).
- Comparisons: 31. Glossary: about 280 terms. Story spine: about 14 steps.

## Topics (8) and concepts

| #   | Topic                         | Concepts                                                                                                                                                  |
| --- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Microservices Basics          | monolith-and-microservices, service-boundaries, distributed-systems-fallacies, scaling-services                                                           |
| 2   | Communication and APIs        | sync-and-async-communication, rest-apis, grpc, idempotency, api-gateway, service-discovery, load-balancing, service-mesh                                  |
| 3   | Resilience                    | timeouts-and-retries, circuit-breaker, bulkhead, rate-limiting, fallback-and-degradation                                                                  |
| 4   | Data and Consistency          | database-per-service, cap-and-consistency, caching-in-microservices, cqrs, event-sourcing                                                                 |
| 5   | Events, Messaging and Sagas   | event-driven-architecture, message-brokers, kafka-fundamentals, delivery-guarantees, outbox-and-inbox, dead-letter-queues, distributed-transactions, saga |
| 6   | Security and Observability    | microservices-security, jwt-and-oauth, observability, distributed-tracing, metrics-and-slos                                                               |
| 7   | Deployment and Testing        | containers-and-kubernetes, health-probes, deployment-strategies, configuration-management, testing-microservices                                          |
| 8   | Spring, Patterns and Playbook | spring-cloud-stack, microservice-patterns-map, strangler-fig-migration, design-walkthrough                                                                |

Comparisons: monolith-vs-microservices, vertical-vs-horizontal-scaling, rest-vs-messaging, put-vs-post-vs-patch, rest-vs-grpc, idempotency-vs-deduplication, api-gateway-vs-load-balancer, service-discovery-vs-api-gateway, client-side-vs-server-side-discovery, retry-vs-circuit-breaker, circuit-breaker-vs-bulkhead, strong-vs-eventual-consistency, cqrs-vs-event-sourcing, command-vs-event, queue-vs-topic, kafka-vs-rabbitmq, at-most-vs-at-least-vs-exactly-once, outbox-vs-inbox, orchestration-vs-choreography, saga-vs-two-phase-commit, authentication-vs-authorization, oauth2-vs-oidc, api-key-vs-jwt, logs-vs-metrics-vs-traces, sli-vs-slo-vs-sla, docker-vs-kubernetes, liveness-vs-readiness-probe, rolling-vs-blue-green-vs-canary, contract-vs-integration-vs-e2e-test, spring-boot-vs-spring-cloud, restclient-vs-webclient-vs-feign.

## Added beyond the reference

Fallacies of distributed computing, gRPC, service mesh, rate-limiting algorithms and load shedding, event sourcing details,
dead-letter handling, Kubernetes probe defaults, the patterns map and a design-answer walkthrough (the "tricks" concept).

## Ownership (each fact once)

- Idempotency keys (HTTP): `idempotency`; idempotent consumers (messaging): `delivery-guarantees`; inbox table: `outbox-and-inbox`.
- 2PC and the @Transactional trap: `distributed-transactions`; sagas and both saga comparisons: `saga`.
- Gateway vs load balancer: `api-gateway`; algorithms: `load-balancing`; discovery vs gateway: `service-discovery`.
- mTLS meaning: `microservices-security`; the mesh that provides it: `service-mesh`. Secrets storage: `configuration-management`.
- Every pattern is explained once in its own concept; `microservice-patterns-map` and `design-walkthrough` only link.

## Process

1. Eight drafting units in parallel, one per topic. Each passes the real validator in isolation and logs coverage rows and a claim log.
2. Merge, validate, commit.
3. Independent verification pass by different agents (4.8). Fix, validate, commit.
4. Close `reference/microservices.coverage.md`, update `OPEN_QUESTIONS.md`, run all quality gates, final report.
