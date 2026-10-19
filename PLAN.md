# Plan: Spring Boot rebuild from the reference (19-10-2026)

Phase 3, rebuild mode (CLAUDE.md 3.8.7). Reference: `reference/spring-boot.md` (owner input, not a source).
Baseline: **Spring Boot 4.1** (4.1.1, checked on spring.io 19-10-2026), Spring Framework 7.0, Spring Security 7.1. Java-only code.

## Why a rebuild

The first version (17-10-2026) was correct but heavy: 700–1,060 words per concept, up to 8 sources each, 724 tree nodes,
40 comparisons, and internals the reference never asks about (`@Lookup`, scoped proxies, WebSocket scope, BeanPostProcessor).
The rebuild keeps the correct facts and sources and cuts to the reference's level:

- Concepts: 62, each one idea at interview depth. Core ≤ ~200 words; 1–3 primary sources plus at most one interview-prep source.
- Tree: about 6 children per concept, mostly one level deep, about 350 nodes in total.
- Comparisons: about 32, led by the reference's "why X if Y exists" list.
- Glossary: about 200 terms, only words an interviewer uses.
- Relations: 2–4 per concept, between ideas a reader knows.

## Topics (8) and concepts (62)

| #   | Topic                  | Concepts                                                                                                                                                                                                                           |
| --- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Boot Basics            | spring-vs-spring-boot, starters, auto-configuration, spring-boot-application, application-startup, embedded-server                                                                                                                 |
| 2   | Beans and DI           | ioc-container, dependency-injection, component-vs-bean, component-scanning, bean-selection, bean-scopes, bean-lifecycle, circular-dependencies, spring-aop, aop-proxies, async-scheduling, application-events                      |
| 3   | Configuration          | externalized-configuration, configuration-properties, profiles, logging                                                                                                                                                            |
| 4   | Web and REST           | dispatcher-servlet, rest-controller, request-mapping, dto, validation, exception-handling, rest-api-design, filters-interceptors, http-clients, mvc-vs-webflux                                                                     |
| 5   | Data and Transactions  | jpa-hibernate-spring-data, jpa-entities, spring-data-repositories, persistence-context, lazy-loading-n-plus-one, locking, transactional, transaction-propagation, acid-isolation, spring-cache, connection-pool, schema-migrations |
| 6   | Security               | security-filter-chain, authentication-flow, authorization-rules, password-encoding, jwt-resource-server, csrf-cors                                                                                                                 |
| 7   | Testing and Production | spring-boot-testing, mockito, testcontainers, actuator, observability, packaging-deployment                                                                                                                                        |
| 8   | Spring Cloud           | spring-cloud-overview, config-server, service-discovery-eureka, spring-cloud-gateway, resilience4j, spring-kafka                                                                                                                   |

New against the first version: component-scanning, spring-aop, application-events, dto, rest-api-design, jpa-hibernate-spring-data,
persistence-context, locking, acid-isolation, mockito. Folded into others as types: devtools, virtual-threads (into mvc-vs-webflux),
native-images (into packaging-deployment), openfeign (into http-clients).

Not in the reference, kept as "added beyond": circular-dependencies, connection-pool, schema-migrations, testcontainers, observability
(partly), virtual threads, native images and all of Spring Cloud (the owner chose "with Spring Cloud" on 17-10-2026).

## Story spine (about 20 steps, problem → fix)

Follows the reference's memory map: Spring → container and beans → Boot adds starters, auto-configuration, embedded server and
external config → request path (filters, DispatcherServlet, controller, service, repository, database) → data and transactions →
security in front → tests and production → many services (Spring Cloud).

## Reference corrections already known (to verify while writing)

- Undertow is not supported by Spring Boot 4 (the reference lists it in sections 2 and 32).
- `@MockBean` was removed in Spring Boot 4.0; `@MockitoBean` replaces it (section 77, question 36).
- Spring Data 3+: `PagingAndSortingRepository` no longer extends `CrudRepository`; `JpaRepository` extends the `List…` variants (sections 100, Q13).
- The web starter does not bring validation (since Boot 2.3); Boot 4 renames the web starter to `spring-boot-starter-webmvc` (section 136).
- Boot 4 uses Jackson 3 (sections 10, 47).

## Process

1. Ten drafting units in parallel (beans-di and data are split in two), each from the reference items assigned to it, the
   existing draft, and primary sources. Each unit passes the real validator in isolation and logs its coverage rows.
2. Merge, validate, commit.
3. Independent verification pass by different agents (4.8): every point, default, trap, relation and tree note against its source.
   Fix, validate, commit.
4. Close `reference/spring-boot.coverage.md`, update `OPEN_QUESTIONS.md`, run all quality gates, final report.
