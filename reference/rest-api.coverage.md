# Coverage: REST API
Reference: reference/rest-api.md  ·  Last updated: 21-10-2026

Every reference item (key list: the numbered sections, plus each question, pattern and "X vs Y" row inside them) appears in exactly
one of Mapped, Corrected or Dropped. A section whose parts went to different places has one row here (Corrected wins over
Mapped), and its other parts are listed under "Details placed elsewhere or cut". Sources for corrections are primary pages.

## Mapped
| Reference item (key + short title) | Landed in | Note |
|---|---|---|
| R1.1 REST vs REST API | concept what-is-rest (points, Interview Q "REST vs REST API vs HTTP?", trap) |  |
| R2.1 Trap: PUT full replacement vs PATCH partial; neither guarantees validation, authorization or transactions | http-methods trap; comparison put-vs-patch-vs-post |  |
| R3.1 401 vs 403 | comparison 401-vs-403; status-codes sayIt and point "403 or 404" |  |
| R3.2 HTTP status vs payment (business) status | status-codes trap and point "Business result" | Refined: Stripe returns 402 for declines, so the right line allows 2xx or 4xx |
| R4. HTTP Headers, Request and Response (parts: path parameters, query parameters, request body, the PAY101 / includeRefunds example); R4. Headers (parts: headers as metadata, Content-Type, Accept, Authorization, Location, Cookie, the request example with path, query and Authorization); R4 (part: Cache-Control); R4. HTTP Headers (part: Request ID / Correlation ID, X-Request-ID in the example) | concept resources-and-uris (Example, bullet on body); comparison path-vs-query-parameter; concept headers-content-negotiation (picture, points, trap); tree accept-header, content-type-header, authorization-header, cookie-header, location-header, vary-header; concept http-caching; observability-for-apis (point, why, bullets); tree `correlation-id`, `x-request-id`; glossary `correlation-id`, `x-request-id` | other R4 parts (headers, X-Request-ID) belong to headers-content-negotiation and observability-for-apis Path/query parameters → resources-and-uris; X-Request-ID → observability-for-apis; how credentials work → authentication-methods (all other units) added the standard W3C traceparent next to it |
| R6.1 JWT trap: signed is not encrypted; check expiry, signature, issuer, audience | concept `jwt` (trap, points, Steps) | Added the allow-listed algorithm and `alg: none` check (RFC 8725 3.1) and nbf |
| R7.1 A timeout does not prove the payment failed; check the existing transaction before charging again | concept unknown-outcomes (hook, trap, Steps "Ask") | Also the retry rule in retries-and-timeouts ("the first may have worked") |
| R9.1 Test: valid amount → payment created | api-testing-strategy (Example table: 201, Location, PENDING) |  |
| R9.2 Test: negative amount → validation error | api-testing-strategy (Example table: 400 or 422) | status choice owned by status-codes / error-responses |
| R9.3 Test: missing authentication → 401 | api-testing-strategy (Example table, Interview Q) |  |
| R9.4 Test: insufficient permission → 403 | api-testing-strategy (Example table, Interview Q) |  |
| R9.5 Test: duplicate idempotency key → no duplicate charge | api-testing-strategy (Example table: same response, one charge) | rule owned by idempotency-keys |
| R9.6 Test: provider timeout → payment stays safely recoverable | api-testing-strategy (Example table) | rule owned by unknown-outcomes |
| C1. How the Technologies Work Together (example payment architecture: client, load balancer, Spring Boot API, PostgreSQL/RDS, Redis/ElastiCache, SQS + worker, S3 + CloudWatch; "illustrative, not mandatory") | concept `payment-api-walkthrough` (Mermaid, trap); tree nodes `load-balancer`, `payment-gateway`, `receipt-queue-worker` | Drawn with neutral boxes (load balancer, database, cache, queue + worker, logs). AWS product names (ALB, RDS, ElastiCache, SQS, S3, CloudWatch) are covered by the AWS tech; Strategy/Adapter boxes by the Design Patterns tech. "Add only when it pays off" became the trap. |
| C2 (part: "for financial correctness": transactions, uniqueness constraints, reliable event publishing, reconciliation; Redis locks alone not sufficient); C2. Interview Scenario: Customer Pays ₹500 (intro) | concept unknown-outcomes (points "Lock alone", bullets, Q2, Q3); tree transactional-outbox, unique-business-key, fencing-token; concept `payment-api-walkthrough` (Steps, Interview Q 1) | Lock claim confirmed with Kleppmann 2016; no cross-tech link to Redis The "for financial correctness" paragraph and C2.11 are owned by `unknown-outcomes` (reliability unit); linked from the Status step and Interview Q 2. |
| C2.1 Step 1: REST API (POST /api/payments + idempotency key) | `payment-api-walkthrough` Step "Contract" → `resources-and-uris`, `http-methods` | Body also carries currency and method (site's running example). |
| C2.2 Step 2: Security (authenticate, authorise) | Step "Security" → `authentication-methods`, `owasp-api-security` |  |
| C2.3 Step 3: Validation (amount, currency, format, business rules) | Step "Validation" → `request-binding-validation`, `error-responses` |  |
| C2.4 Step 4: Idempotency (same logical request already processed?) | Step "Idempotency" → `idempotency-keys`; point "Money rule" |  |
| C2.5 Step 5: Design patterns (Strategy for behaviour, Adapter for provider APIs) | Step "Provider choice" (named in plain words) | Covered by the Design Patterns tech (draft concepts `strategy`, `adapter`); no cross-tech link. |
| C2.6 Step 6: Persistence (durable payment record and status) | Step "Persistence" |  |
| C2.7 Step 7: External provider (timeouts, idempotency support) | Step "Gateway call" → `retries-and-timeouts`; tree note `payment-gateway` (Stripe idempotency keys) |  |
| C2.8 Step 8: Status handling (success, failure, pending, unknown) | Step "Status" → `unknown-outcomes`, `status-codes` (HTTP status vs payment status) |  |
| C2.9 Step 9: Asynchronous work (reliable events for receipts, notifications) | Step "Async work" → `webhooks`, `long-running-operations`; tree node `receipt-queue-worker` | "Reliable event publishing" (outbox, brokers) is covered by the Kafka / Microservices techs; named in plain words only. |
| C2.10 Step 10: Observability (correlation IDs, logs, metrics, traces) | Step "Observability" → `observability-for-apis` |  |
| C2.11 Failure scenario: gateway charged ₹500 but the response timed out (unknown outcome, reconcile, no double charge) | concept unknown-outcomes (Steps, trap, Q1); tree gateway-status-query, same-key-retry, reconciliation-job | Stripe's 24-hour same-key window added |
| C3. Rapid-Fire Interview Revision (intro and REST rows) | `payment-api-walkthrough` picker table | Rows C3.1–C3.4 are owned by `statelessness`, `http-methods`, `status-codes` (their units); the table only links them (compare `put-vs-patch-vs-post`, `401-vs-403`). |
| C3.1 What makes a REST API stateless? | concept statelessness (Interview Q) |  |
| C3.2 PUT vs PATCH? | comparison put-vs-patch-vs-post |  |
| C3.3 401 vs 403? | comparison 401-vs-403 |  |
| C3.4 What is idempotency? (part: method-level idempotency) | http-methods points, Interview Q "safe vs idempotent"; glossary idempotent-method | App-level keys are owned by idempotency-keys (linked) |
| C3.5 Why Redis? | Mapped: covered by the Redis tech (draft `what-is-redis`, `redis-playbook`) |  |
| C3.6 Is Redis always persistent? | Mapped: covered by the Redis tech (draft `persistence-rdb-aof`) |  |
| C3.7 TTL vs eviction? | Mapped: covered by the Redis tech (draft `ttl-and-expiration`, `eviction-policies`) |  |
| C3.8 Why use Redis INCR? | Mapped: covered by the Redis tech (draft `single-command-atomicity`) |  |
| C3.9 Can Redis replace PostgreSQL? | Mapped: covered by the Redis tech (draft `redis-and-databases`) |  |
| C3.10 EC2 vs Lambda? | Mapped: covered by the AWS tech (draft `compute-choice`, `ec2`, `lambda`) |  |
| C3.11 ECS vs EKS? | Mapped: covered by the AWS tech (draft `containers-ecs-eks-fargate`) |  |
| C3.12 S3 vs EBS? | Mapped: covered by the AWS tech (draft `s3`, `ebs-and-efs`) |  |
| C3.13 RDS vs DynamoDB? | Mapped: covered by the AWS tech (draft `choosing-a-database`) |  |
| C3.14 SQS vs SNS? | Mapped: covered by the AWS tech (draft `sqs`, `sns`) |  |
| C3.15 IAM role vs policy? | Mapped: covered by the AWS tech (draft `iam-basics`) |  |
| C3.16 What is Strategy? | Mapped: covered by the Design Patterns tech (draft `strategy`) |  |
| C3.17 What is Factory? | Mapped: covered by the Design Patterns tech (draft `factory-method`) |  |
| C3.18 What is Adapter? | Mapped: covered by the Design Patterns tech (draft `adapter`) |  |
| C3.19 What is Decorator? | Mapped: covered by the Design Patterns tech (draft `decorator`) |  |
| C3.20 What is Proxy? | Mapped: covered by the Design Patterns tech (draft `proxy`) |  |
| C3.21 What is Observer? | Mapped: covered by the Design Patterns tech (draft `observer`) |  |
| C3.22 What is Command? | Mapped: covered by the Design Patterns tech (draft `command`) |  |
| C3.23 What is Repository? | Mapped: covered by the Design Patterns tech (draft `repository-and-dao`) |  |
| C3.24 What is Dependency Injection? | Mapped: covered by the Design Patterns tech (draft `dependency-injection`) |  |
| C3.25 What is SOLID? | Mapped: covered by the Design Patterns tech (draft `single-responsibility` … `dependency-inversion`) |  |
| C4. Final Rules Worth Memorizing (rule: REST methods, status codes, validation, authentication, idempotency); C4 (rule: payments, timeout is not failure, no duplicate charge); C4 (rule: security, least privilege, secrets, HTTPS, server-side authorisation); C4 (rule: Redis, TTL, eviction, cache not source of truth); C4 (rule: AWS compute, storage, IAM, queues, monitoring); C4 (rule: Java patterns, problem → pattern → example → trade-off); C4 (rule: Spring Boot DI, repositories, validation, controllers, transactions); C4 (rule: system design, failure, scale, reliability, security, observability) | `payment-api-walkthrough` hook (answer order) and points; `payment-api-walkthrough` points "Money rule", "Timeout" → owners `idempotency-keys`, `unknown-outcomes`; Step "Security" → security topic (`authentication-methods`, `https-tls`, `owasp-api-security`); Mapped: covered by the Redis tech; Mapped: covered by the AWS tech; Mapped: covered by the Design Patterns tech (draft `choosing-a-pattern`); Mapped: covered by the Spring Boot tech; REST parts in the spring unit of this tech; Mapped: covered by the System Design tech; this concept's trap carries the "not just services" point |  |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| R1. REST API Basics (part: asynchronous processing, "returning a status or job ID") | Loose: a bare job ID does not tell the client where or how often to check | 202 Accepted with a Location header for a status resource and Retry-After; the client polls it; 303 See Other or a result link at the end (concept `long-running-operations`) | https://learn.microsoft.com/en-us/azure/architecture/patterns/async-request-reply |
| R2 (part: PUT) "PUT: … generally idempotent"; R2 (part: safe list) "GET, HEAD, and OPTIONS are safe" | Loose: PUT is idempotent by definition, not "generally"; Incomplete: RFC 9110 also defines TRACE as safe | Point "Idempotent: safe methods plus PUT and DELETE"; Glossary safe-method lists TRACE; card keeps the three API-relevant ones | https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2 ; https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.1 |
| R3 (part: 301/302) "301 / 302: Redirect status codes"; R3 (part: 401) "401 Unauthorized: authentication is missing or invalid"; R3. HTTP Status Codes (part: 202 Accepted, "processing may not be complete") | Missing the method rule: clients may turn POST into GET on 301/302; Missing the requirement that a 401 carries WWW-Authenticate; Understated: RFC 9110 says processing has not been completed, and the request may still be refused when it is processed | Interview Q + tree: use 307/308 to keep the method; Point "401 must carry a WWW-Authenticate challenge (RFC 9110)"; "Accepted, not finished; it may still fail" (point, trap, Interview Q in `long-running-operations`) | https://www.rfc-editor.org/rfc/rfc9110.html#section-15.4.8 ; https://www.rfc-editor.org/rfc/rfc9110.html#section-15.5.2 ; https://www.rfc-editor.org/rfc/rfc9110.html#name-202-accepted |
| R5. REST API Design Rules (part: HATEOAS, "not required in every practical REST API"); R5. REST API Design Rules (part: sorting, `/payments?sort=createdAt,desc`) | Loose: by REST's author, hypermedia is required; an API without it is not REST, even if it works fine; Presented as the general rule; it is the Spring Data format. JSON:API uses `sort=-createdAt`, Google AIP-132 uses `order_by` with "desc" | Trap and Interview Q: Fielding counts hypermedia as required; many published APIs stop at Richardson level 2, which is a practical target, not full REST; Shown as "the Spring Data style" (bullet and glossary `sort-parameter`) | https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven ; https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design ; https://docs.spring.io/spring-data/commons/reference/repositories/core-extensions.html , https://jsonapi.org/format/ |
| R6. (part: TLS/HTTPS "encrypts data in transit") | Incomplete: TLS also gives integrity and server authentication, and it says nothing about versions | Concept `https-tls`: encryption, integrity, server authentication; TLS 1.3 (RFC 8446), TLS 1.0/1.1 deprecated (RFC 8996, March 2021); trap: transit only, not at rest | https://www.rfc-editor.org/rfc/rfc8446 ; https://www.rfc-editor.org/rfc/rfc8996 |
| R7 (part: example `Idempotency-Key: order-789-payment`, "the server should return the original result"); R7 (part: timeout, "maximum time a caller waits for a response") | Too simple: a repeat gets the saved result only after the first request finished, with the same body, and while the key is still kept; Loose: there are two limits, and some clients have none by default | Still running → 409 Conflict; same key, different body → 422; required key missing → 400 (draft-07); Stripe keeps keys at least 24 hours, then a reused key runs as a new request; the header is an expired IETF draft, not an RFC; Connect timeout (opening a new connection) and read timeout (waiting for data); JDK HttpClient (Java 25) has no request timeout unless set: `send()` blocks forever | https://www.ietf.org/archive/id/draft-ietf-httpapi-idempotency-key-header-07.txt ; https://docs.stripe.com/api/idempotent_requests ; https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/java/net/http/HttpRequest.Builder.html ; https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/net/URLConnection.html |
| R8. REST API in Spring Boot (part: @RequestParam "reads a query parameter"); R8. REST API in Spring Boot (part: the example's GET returns the String "Payment: " + id) | Incomplete: it also binds form data, and it is required by default; A String return is written by StringHttpMessageConverter as text/plain, not JSON, so the example does not show a JSON API | "Query or form parameter; required by default, a defaultValue makes it optional" (table, Defaults, tree note); GET returns a PaymentResponse DTO from the service | https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestparam.html ; https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/bind/annotation/RequestParam.html ; https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/converter/StringHttpMessageConverter.html |
| R9. API Testing and Documentation (part: Swagger / OpenAPI, "tools and specifications") | Treats Swagger and OpenAPI as one thing | OpenAPI is the specification (OpenAPI Initiative); Swagger is SmartBear's tools; Swagger 2.0 was donated in 2015; trap added | https://www.openapis.org/faq ; https://spec.openapis.org/oas/v3.2.0.html ; https://swagger.io/tools/ |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| The six REST constraints, code on demand optional | what-is-rest (table, Interview Q) | Most asked REST definition question |
| Four uniform-interface parts | what-is-rest tree | Explains what "uniform interface" means |
| REST is used loosely for HTTP APIs | what-is-rest (point) | MDN states it; avoids an overclaim |
| HTTP/1.1 vs HTTP/2 vs HTTP/3, QUIC, multiplexing | http-request-response (tree, Interview Q, trap); glossary | Common follow-up question; semantics shared by all versions |
| Request line and status line grammar | http-request-response (table, points) | "Components of an HTTP request/response" is asked |
| Resource vs representation, collection vs item | resources-and-uris (points, tree) | Core REST vocabulary |
| URI vs URL vs URN | resources-and-uris (point, Interview Q, tree); glossary | Common question |
| Stateless does not mean no database (resource vs session state) | statelessness (trap, Interview Q) | Common wrong answer |
| Richardson Maturity Model levels 0-3 | richardson-maturity-hateoas (table, Interview Q) | Common question; frames HATEOAS |
| HAL format (expired draft), Spring HATEOAS, link relations | richardson-maturity-hateoas (Example, point, tree); glossary | What HATEOAS looks like in practice |
| Cacheable column; HEAD/OPTIONS cacheability | http-methods table | Common MCQ; RFC 9110 9.2.3 |
| JSON Patch (RFC 6902) and JSON Merge Patch (RFC 7396) | tree under method-patch; glossary; http-methods example | "How do you send a PATCH body?" is a follow-up to PUT vs PATCH |
| QUERY method (RFC 10008, June 2026) | tree query-method; glossary | New standard method (planned in master.json) |
| Unknown-code rule (treat as x00) | status-codes point | RFC 9110 15 client requirement |
| 403 vs 404 to hide a resource | status-codes point; 401-vs-403 row | RFC 9110 15.5.4; ties to BOLA |
| 307 / 308 | status-codes Interview Q; tree | Redirect method rule |
| 406, Vary, q weights, media type syntax, X- prefix (RFC 6648) | headers-content-negotiation | Content negotiation questions |
| 502 vs 503 vs 504 | comparison | Commonly confused gateway codes |
| Cache-Control directives, private vs shared caches, heuristic freshness, Authorization + shared cache rule | http-caching; tree | Standard caching questions (no-cache vs no-store MCQ) |
| If-Match, 412, 428, weak vs strong ETag, lost update, JPA @Version | concept conditional-requests | Planned addition (master.json) |
| Cursor (and keyset) pagination vs offset | comparison `offset-vs-cursor-pagination`; tree cursor-pagination, keyset-pagination | Standard follow-up question; offset alone fails on large or live lists |
| Next-page link (`nextLink`, Link header `rel="next"`), page-size cap | concept `pagination-filtering-sorting`; tree link-header-next, next-link-field | How clients actually page; the cap protects against overload |
| Field selection (sparse fieldsets) | tree field-selection; glossary `sparse-fieldset` | Common design question about large responses |
| Query-string and media-type versioning; caching trade-off | comparison `uri-vs-header-vs-media-type-versioning` | The usual "which strategy" question |
| Breaking vs non-breaking change list, tolerant reader | concept `api-versioning` | Versioning only exists to manage breaking changes |
| Deprecation (RFC 9745, March 2025) and Sunset (RFC 8594) headers | concept `api-versioning`; tree deprecation-header, sunset-header | Standard way to retire a version; RFC 9745 is new |
| Spring Framework 7.0 built-in API versioning | concept `api-versioning` (bullet, Example, Defaults); tree spring-api-versioning | New in Spring Framework 7.0, the baseline |
| RFC 9457 problem details (obsoletes RFC 7807) | concept `error-responses` | Current standard error format |
| Non-CRUD actions as POST custom methods | concept `url-design-rules`; tree action-custom-method | Common "how do you cancel a payment" question |
| 303 See Other, Retry-After, status resource, cancel | concept `long-running-operations`; tree | Full async request-reply pattern |
| Basic auth is Base64, not encryption (RFC 7617) | `authentication-methods`, comparison `basic-vs-api-key-vs-bearer-token` | Common interview question |
| Session cookie and JWT vs session cookie | tree `session-cookie-auth`, comparison `jwt-vs-session-cookie` | Very common "why JWT" question |
| JWS vs JWE, registered claims, HS256 vs RS256 | `jwt` points, tree | Asked with "is a JWT encrypted?" |
| alg none attack, allow-listed algorithms (RFC 8725) | `jwt` Steps, Interview Q, glossary | Classic JWT security question |
| Logout and revocation (short expiry, refresh token, `jti` denylist) | `jwt` Interview Q | Frequently asked |
| Four OAuth roles, authorization code + PKCE, client credentials, refresh token | `oauth2-and-oidc`, tree | Core of any OAuth question |
| RFC 9700 (January 2025): implicit SHOULD NOT, password MUST NOT | `oauth2-and-oidc` point, tree `legacy-oauth-grants` | Current best practice |
| OAuth 2.1 is still IETF draft-16 (September 2026) | tree `oauth21-draft` | Version status interviewers ask about |
| ID token vs access token trap | `oauth2-and-oidc` trap | Common mistake |
| Spring Boot 4.x starter `spring-boot-starter-security-oauth2-resource-server` (old name deprecated), `issuer-uri` and `audiences` | `oauth2-and-oidc` Example, tree | Changed in Boot 4 |
| Same-origin policy, simple vs preflighted, credentials and `*`, Max-Age default 5 s | `cors` | Needed to explain CORS |
| Spring `@CrossOrigin` defaults (Spring Framework 7.0) | `cors` point | Asked in Spring interviews |
| CSRF and CORS vs CSRF | `cors` bullet, tree `csrf-attack`, comparison `cors-vs-csrf` | Very common confusion |
| HSTS, mTLS, TLS termination at the load balancer | `https-tls`, tree | Standard follow-ups |
| Rate-limit algorithms (fixed window, sliding window, token bucket, leaky bucket) | `rate-limiting` table, tree | Usual design question |
| Retry-After with 429; RateLimit header fields are a draft; shared counter across servers | `rate-limiting` | Current status and the distributed follow-up |
| Full OWASP API Security Top 10 2023 with payment examples (BOPLA, BFLA, SSRF, inventory, etc.) | `owasp-api-security` table, tree, glossary | The reference names only injection and validation |
| 404 instead of 403 to hide a forbidden resource (RFC 9110) | `owasp-api-security` bullet and Example | Common BOLA follow-up |
| Request fingerprint and 409 / 422 / 400 outcomes | idempotency-keys (Mermaid, sayIt, Qs); tree request-fingerprint-check | Standard follow-up: "same key, different body?" and "two at once?" |
| Idempotency-Key header status (draft-07, expired 18-04-2026) | idempotency-keys point; tree; glossary | Interviewers ask whether it is a standard |
| Key retention window (Stripe ≥ 24 hours) and key sources (UUID v4 or order-derived, no personal data) | idempotency-keys Defaults, Q2; tree idempotency-key-expiry | Needed to answer "how long do you keep keys?" |
| Which failures to retry (408, 429, 5xx yes; 400/401/403/404/422 no) | retries-and-timeouts table, Q1 | Most asked retry question |
| Retry-After (RFC 9110 10.2.3) and 408 (RFC 9110 15.5.9) | retries-and-timeouts point, table; tree; glossary | Server-directed waits |
| Retry amplification (3 tries at 5 layers = 243x), retry budget / token bucket | retries-and-timeouts point, trap; tree retry-budget; glossary retry-amplification | Retry storms are a common follow-up |
| Full jitter, AWS SDK defaults (3 attempts, 20 s cap) | retries-and-timeouts code, Defaults; tree full-jitter | Concrete numbers |
| Connect vs read timeout | retries-and-timeouts Q3; tree; glossary | Common question |
| Circuit breaker states (closed, open, half-open) | tree breaker-*; comparison diagram | Asked with retry |
| Payment states incl. UNKNOWN, query by reference, same-key retry window, reconciliation with settlement report | unknown-outcomes | Completes the C2.11 answer |
| Transactional outbox, fencing token, unique business key | unknown-outcomes bullets, Q3; tree | The "reliable event publishing" and "locks alone" parts made concrete |
| Webhooks: HMAC signature over raw body, timestamp tolerance (Stripe 5 minutes), 2xx fast + queue, event-ID dedupe, out-of-order events, Stripe retries up to 3 days, Standard Webhooks headers | concept webhooks; tree; glossary | How payment providers report final status; master.json concept |
| Spring HTTP clients: RestClient, WebClient, HTTP interface clients, RestTemplate deprecation plan (7.0 announce, 7.1 @Deprecated, 8.0 removal), timeouts | concept rest-clients; comparison resttemplate-vs-restclient-vs-webclient | calling a payment gateway is part of every payment flow; RestTemplate status is a common, often wrongly answered question |
| @RequestHeader (Idempotency-Key) | concept request-binding-validation | the running example sends Idempotency-Key |
| HandlerMethodValidationException (Spring Framework 6.1+), @Valid vs @Validated | concept request-binding-validation | Framework 6.1 changed which exception a parameter constraint raises |
| @ResponseStatus (and its reason/sendError caveat), ServletUriComponentsBuilder, builder table (ok, created, accepted, noContent, status) | concept response-entity | the reference names ResponseEntity only |
| ProblemDetail (RFC 9457), ResponseEntityExceptionHandler, ResponseStatusException, spring.mvc.problemdetails.enabled=false, Boot /error defaults | concept exception-handling | current standard error body in Spring |
| Java records as DTOs, MapStruct, Jackson annotations, open-in-view default, records cannot be JPA entities | concept dto-mapping; comparison dto-vs-entity; tree | common follow-up questions on DTOs |
| Jackson 3 default in Spring Boot 4 (tools.jackson) | concept spring-rest-controllers | changed in Boot 4.0 |
| MockMvcTester (6.2+), @MockitoBean (replaces removed @MockBean), RestTestClient (7.0), RANDOM_PORT and the rollback catch, spring-boot-webmvc-test module, @AutoConfigureMockMvc needed in @SpringBootTest (Boot 4.0+) | concept spring-api-testing; comparison webmvctest-vs-springboottest | Boot 4 changed the test APIs |
| OAS versions 3.0 (2017), 3.1 (2021, JSON Schema 2020-12), 3.2 (2025), latest 3.2.1 | openapi-swagger point; tree `oas-3-*` | "which version" is asked; 3.2 is new |
| Design-first vs code-first | openapi-swagger (picture, bullets, Interview Q); tree | common interview question |
| springdoc-openapi 3.x for Spring Boot 4 and its default paths | openapi-swagger Defaults; tree | how Spring APIs get docs |
| Test pyramid and end-to-end tests | api-testing-strategy point; tree `end-to-end-test` | frames the levels |
| Pact and Spring Cloud Contract | tree under `contract-test` | the tools interviewers name |
| Newman no longer maintained; Postman CLI preferred (Postman v12) | api-testing-strategy point; tree `postman-cli`; glossary | recent change; Newman is still often named |
| W3C Trace Context traceparent as the standard | observability-for-apis point, example; tree | X-Request-ID alone is non-standard |
| RED metrics and p95/p99 latency | observability-for-apis point, trap, Interview Q | standard monitoring answer |
| What never to log (OWASP) | observability-for-apis point, Interview Q | security plus payments |
| Spring Boot 4.1 Actuator, Micrometer Observation and Tracing, sampling 10%, W3C propagation, health-only exposure | observability-for-apis bullets, Defaults; tree | Spring interview angle |
| Structured JSON logs | observability-for-apis bullet; tree | needed to search by traceId |
| Other API styles: SOAP + WSDL, GraphQL (one endpoint, over-/under-fetching, POST/GET, persisted queries), gRPC (Protocol Buffers, HTTP/2, four call types, gRPC-Web + proxy) | concept `api-styles`, comparison `rest-vs-soap-vs-graphql-vs-grpc`, tree, glossary | "REST vs GraphQL / gRPC / SOAP" is a standard REST interview question; the reference has none. |
| Real-time options: short polling, long polling (RFC 6202), Server-Sent Events (HTML Standard, Last-Event-ID, 204 stops reconnects, 6-connection limit on HTTP/1.1), WebSocket (RFC 6455, Upgrade, 101, ws/wss), Spring SseEmitter and WebSocketHandler | concept `websockets-and-sse`, comparison `polling-vs-long-polling-vs-sse-vs-websocket`, tree, glossary | Needed for "how does the payment screen learn the result"; commonly asked; the reference has none. |
| Rapid-fire picker table and "answer order" recipe | `payment-api-walkthrough` | Owner's easy-to-remember aid; ties every topic to one answer. |

## Dropped
| Reference item | Reason (rare / advanced / duplicate / unverifiable) |
|---|---|
| (no whole item) | |

### Details placed elsewhere or cut, inside items listed above
| Reference item part | What happened |
|---|---|
| R1. REST API Basics (parts: API, REST, REST API, client, server) | also: concept what-is-rest (points, constraints table, client-server row); glossary api-term, rest-term, rest-api-term |
| R1. REST API Basics (parts: HTTP, JSON, synchronous API, the POST /api/payments example and its response) | also: concept http-request-response (table, Example, points Body and Synchronous); glossary json-term, request-line, status-line |
| R1. REST API Basics (parts: resource, endpoint) | also: concept resources-and-uris (points, trap, Interview Q); glossary resource-rest, api-endpoint |
| R1. REST API Basics (part: statelessness) | also: concept statelessness (hook, points, trap, Mermaid) |
| R1. REST API Basics (part: synchronous API) | also: glossary `synchronous-api` |
| R2. HTTP Methods (parts: GET, POST, PATCH, DELETE, HEAD, OPTIONS, idempotent definition, POST not idempotent, the five-line URL example; the PUT and safe-list parts are in Corrected) | also: concept http-methods (table, points, sayIt); tree method-post/put/patch, safe-method |
| R2. HTTP Methods (part: OPTIONS commonly used for CORS preflight) | also: concept `cors` (Mermaid, Example); tree `cors-preflight` |
| R3. HTTP Status Codes (parts: 200, 201, 204, 400, 403, 404, 405, 409, 415, 422, 500, 502, 503, 504; the 301/302 and 401 parts are in Corrected; the scenario table: created 201, invalid amount 400 or 422, not found 404, duplicate conflicts 409, unexpected failure 500) | also: concept status-codes (table, points, Interview Q 400 vs 422); tree status-2xx…5xx; glossary |
| R3 (part: 304 Not Modified) | also: concept http-caching (Steps); glossary 304-not-modified |
| R3. HTTP Status Codes (part: 429 Too Many Requests, and the 429 row of its table) | also: concept `rate-limiting` (hook, point, trap, Example) |
| R5. REST API Design Rules (parts: nouns in URLs, HTTP methods for actions, plural resource names, nested resources, consistent naming) | also: concept `url-design-rules` (table, points, trap); tree nodes plural-collection-nouns, nested-resource-path, kebab-case-paths |
| R5. REST API Design Rules (parts: pagination, filtering, the `GET /api/v1/payments?status=SUCCESS&page=0&size=20` example) | also: concept `pagination-filtering-sorting` (points, Example, Interview Qs); comparison `offset-vs-cursor-pagination`; tree node spring-data-pageable |
| R5. REST API Design Rules (part: version APIs, `/api/v1/payments` or a version header) | also: concept `api-versioning`; comparison `uri-vs-header-vs-media-type-versioning`; tree versioning-strategies |
| R5. REST API Design Rules (part: backward compatibility) | also: concept `api-versioning` (breaking vs non-breaking table, tolerant reader point, trap) |
| R5. REST API Design Rules (part: error response, stable error code, useful message, no stack traces) | also: concept `error-responses` (points, trap, Example); tree stable-error-code |
| R5. REST API Design Rules (part: validation: reject missing, malformed, invalid values) | also: concept request-binding-validation (why, trap: validate on the server) |
| R6. Authentication, Authorization and Security (part: authentication, authorization) | also: concept `authentication-methods` (hook, sayIt, Interview Q); comparison `authentication-vs-authorization` |
| R6. (part: bearer token, the `Authorization: Bearer eyJ...` example) | also: concept `authentication-methods` (point, Example); comparison `basic-vs-api-key-vs-bearer-token`; tree `bearer-token-auth` |
| R6. (part: API key, "not equivalent to a user login") | also: concept `authentication-methods` (point, Interview Q); comparison `basic-vs-api-key-vs-bearer-token` |
| R6. (part: secret management) | also: concept `authentication-methods` (point); glossary `secret-management` |
| R6. (part: "check whether the caller can access PAY101") | also: concept `owasp-api-security` (hook, trap, Example: ownership in the query); trap in `authentication-methods` |
| R6. (part: JWT) | also: concept `jwt` (hook, points, Steps, Example) |
| R6. (part: OAuth 2.0 delegated authorization) | also: concept `oauth2-and-oidc`; comparison `oauth2-vs-oidc` |
| R6. (part: OpenID Connect identity layer) | also: concept `oauth2-and-oidc`; comparison `oauth2-vs-oidc`; tree `oidc-layer` |
| R6. (part: CORS, "not a replacement for server-side authorization") | also: concept `cors` (hook, trap) |
| R6. (part: rate limiting) | also: concept `rate-limiting` |
| R6. (part: SQL injection) | also: concept `owasp-api-security` (point, Interview Q); tree `sql-injection-defence`; glossary `sql-injection` |
| R6. (part: input validation) | also: concept `owasp-api-security` (point, bullet linking `request-binding-validation`); glossary `input-validation` |
| R6. (part: least privilege) | also: concept `owasp-api-security` (point); glossary `least-privilege` |
| R7. Idempotency, Retries and Duplicate Payments (part: idempotency key, deduplication, exactly-once effect) | also: concept idempotency-keys (points, Mermaid); glossary idempotency-key-term, deduplication, exactly-once-effect |
| R7 (part: retry, exponential backoff, jitter, circuit breaker) | also: concept retries-and-timeouts (table, points, code, Qs); tree retry-policy, exponential-backoff-wait, full-jitter, circuit-breaker-pattern; comparison retry-vs-circuit-breaker |
| R7 (part: at-least-once delivery) | also: concept webhooks (points, trap, Q2); glossary at-least-once-delivery |
| R8. REST API in Spring Boot (part: @RestController) | also: concept spring-rest-controllers (hook, points); comparison controller-vs-restcontroller |
| R8. REST API in Spring Boot (parts: @RequestMapping, @GetMapping, @PostMapping, @PutMapping, @PatchMapping, @DeleteMapping) | also: concept spring-rest-controllers (How it works table, trap, Interview Q "@RequestMapping vs @GetMapping") |
| R8. REST API in Spring Boot (part: the PaymentController example) | also: concept spring-rest-controllers (Example) |
| R8. REST API in Spring Boot (part: controller calls a service, business logic in the service) | also: concept spring-rest-controllers (point "Thin controller", bullet, Interview Q); tree node controller-service-repository |
| R8. REST API in Spring Boot (part: @PathVariable) | also: concept request-binding-validation (table, Interview Q "@PathVariable vs @RequestParam") |
| R8. REST API in Spring Boot (part: @RequestBody) | also: concept request-binding-validation (table); tree node request-body-binding |
| R8. REST API in Spring Boot (part: Bean Validation @NotNull @NotBlank @Positive) | also: concept request-binding-validation (points, Example, Interview Qs); tree nodes not-null-constraint, not-blank-constraint, positive-constraint |
| R8. REST API in Spring Boot (part: ResponseEntity) | also: concept response-entity |
| R8. REST API in Spring Boot (part: DTO) | also: concept dto-mapping; comparison dto-vs-entity |
| R8. REST API in Spring Boot (parts: @ControllerAdvice, @ExceptionHandler) | also: concept exception-handling (points, flow, Interview Q "why @ControllerAdvice if @ExceptionHandler exists") |
| R9. API Testing and Documentation (part: Spring MockMvc) | also: concept spring-api-testing (point, Interview Q "Does MockMvc start a server?") |
| R9. API Testing and Documentation (parts: @WebMvcTest, @SpringBootTest) | also: concept spring-api-testing; comparison webmvctest-vs-springboottest |
| R9. API Testing and Documentation (part: unit testing) | also: comparison unit-vs-integration-vs-contract-test; tree `unit-test`; glossary `unit-test` |
| R9. API Testing and Documentation (part: integration testing) | also: comparison unit-vs-integration-vs-contract-test; tree `integration-test`; trap of api-testing-strategy |
| R9. API Testing and Documentation (part: contract testing) | also: comparison; tree `contract-test` with `pact`, `spring-cloud-contract`; Interview Q "why contract tests" |
| R9. API Testing and Documentation (part: mocking) | also: api-testing-strategy (point, bullet, Interview Q mock vs stub); tree `test-double`; glossary `mockito` |
| R9. API Testing and Documentation (part: Postman) | also: tree `postman-cli`; glossary `postman`, `newman`; point on Newman |
| R9. API Testing and Documentation (part: observability) | also: concept observability-for-apis; comparison logs-vs-metrics-vs-traces |
| R9. API Testing and Documentation (part: distributed tracing, trace and span IDs) | also: observability-for-apis (Interview Q, example); tree `distributed-tracing`, `traceparent`; glossary `span-term` |
| R9. API Testing and Documentation (parts: Spring MockMvc, @WebMvcTest, @SpringBootTest) | also: not in this unit: owned by concept spring-api-testing (linked from api-testing-strategy) |
| C4 "Best revision order" (REST → Redis → AWS → patterns → payment scenario) | cut: Duplicate of site structure: the site's own tree and story spine set the reading order; it spans several techs. |

## Owner addition (20-10-2026): Integration templates (reference/rest-api.md from line 411; keys I0, I1, I8, I9)

Independently verified on 20-10-2026.

### Mapped
| Reference item | Landed in | Note |
|---|---|---|
| I0 Intro lines and the owner's question ("how do you integrate the ChatGPT API, Redis, Kafka, AWS; simple code if asked to write it") | concept `openai-api-integration`: the table "Write integration code" plus Interview Q 1 | Redis, Kafka and AWS code itself belongs to their own techs; this tech keeps only the map row |
| I0 "Small correct skeleton, not a production implementation" framing; also the I8 intro ("memorise the shapes, not hundreds of lines") and the I9 closing line ("the level of code to master first") | concept `openai-api-integration` (two short Java blocks; production items as points and bullets) | |
| I1.Q "How would you integrate ChatGPT API in Java?" | concept `openai-api-integration`, Interview Q "How would you integrate the ChatGPT API in Spring Boot?" | The answer says that code calls the OpenAI API, not ChatGPT |
| I1.MAP Memory map: Java, HTTP POST, OpenAI API, JSON response | concept `openai-api-integration`, Mermaid sequence in How it works | |
| I1.REM "Remember only": RestClient, baseUrl, Authorization, POST, JSON body, retrieve() | concept `openai-api-integration`, first Java block and the OpenAI table row | |
| I1.SAY Interview explanation (key in env vars, RestClient, POST model + messages, parse JSON) | `sayIt` and the `Auth` point | `messages` became `input` (see Corrected I1.CODE-b) |
| I8.REDIS Template: RedisTemplate, opsForValue(), set()/get() | concept `openai-api-integration`, table row Redis (`StringRedisTemplate`, `opsForValue().set(key, value, ttl)`, `get(key)`) | StringRedisTemplate is the String-typed RedisTemplate |
| I8.KAFKA-P Template: KafkaTemplate, send(topic, message) | table row Kafka producer (`send(topic, key, value)`) | |
| I9.CHATGPT row: ChatGPT, RestClient, POST | table row OpenAI | |
| I9.REDIS row: Redis, RedisTemplate, set/get | table row Redis | |
| I9.KAFKA-P row: Kafka Producer, KafkaTemplate, send() | table row Kafka producer | |
| I9.SQS row: AWS SQS, SqsClient, sendMessage() | table row AWS SQS (`sendMessage(SendMessageRequest)`) | |
| I9.RDS row: AWS RDS, JPA/JDBC, database operations | table row AWS RDS (`JdbcClient` or JPA, as for any SQL database; `sql(...).param(...).update()`) | |
| I9.R Closing rule: do not claim the skeleton is production-ready; add config, secrets, errors, timeouts/retries, serialization, logging, observability, security | `sayIt` ("Production adds timeouts, capped 429 retries and a token limit"); points `Auth`, `Body`, `429`; bullets on timeouts and the `x-request-id` log; Interview Q on 429 | Short points, not prose. Generic security and observability are owned by `owasp-api-security` and `observability-for-apis` |

### Corrected
| Reference item | What was wrong | Fixed to | Source URL |
|---|---|---|---|
| I1.CODE-a `String apiKey = "YOUR_API_KEY";` | The key was hardcoded in source | `System.getenv("OPENAI_API_KEY")`; on the server only; env var or secret store | https://developers.openai.com/api/reference/overview |
| I1.CODE-b `POST /chat/completions` with `messages` and `gpt-4o-mini` | Outdated: OpenAI now recommends the Responses API for all new projects (Chat Completions is still supported) | `POST /v1/responses` with `model` + `input`; Chat Completions kept as a tree type | https://developers.openai.com/api/docs/guides/migrate-to-responses |
| I1.CODE-c Model `gpt-4o-mini` | A hardcoded, dated model name | The model id is read from config (`@Value("${openai.model}")`); no model name is hardcoded | https://developers.openai.com/api/docs/guides/text |
| I1.CODE-d `.body(String.class)` then print the raw JSON | It does not parse the reply; the usual shortcut `output_text` / `output[0].content[0].text` is wrong for raw HTTP | Map to records; keep `message` items, join their `output_text` parts (trap) | https://developers.openai.com/api/docs/guides/text ; https://developers.openai.com/api/reference/resources/responses/methods/create |
| I8.KAFKA-C / I9.KAFKA-C `@KafkaListener → consume(message)` | `consume` is not an API method; any method name works | "the method runs for each record" | https://docs.spring.io/spring-kafka/reference/quick-tour.html |
| I8.S3 / I9.S3 `S3Client → PutObjectRequest → bucket + key → putObject()` | Incomplete: putObject also needs the content | `putObject(PutObjectRequest, RequestBody)` | https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/java_s3_code_examples.html |
| I8.CHATGPT Template: RestClient, POST, Authorization, JSON, retrieve() | Same endpoint issue as I1.CODE-b | Same table row and code with `/responses` | https://developers.openai.com/api/docs/guides/text |

### Added beyond the reference
| New item | Landed in | Why |
|---|---|---|
| 429 handling: Retry-After, backoff with jitter, quota/spend-limit 429s are not retryable, SDKs already retry 429/503 | point `429`, Interview Q, Mermaid note | The most common production follow-up question |
| `max_output_tokens` caps reply length and cost | point `Body`, code | Cost and token limits were asked for |
| Log `x-request-id` | How it works bullet | OpenAI recommends it in production |
| Official `openai-java` SDK (4.86.0, beta) | tree node `openai-java-sdk` | The alternative to hand-written HTTP |
| Spring AI 2.0 `ChatClient` and its OpenAI starter (uses Chat Completions) | tree nodes `spring-ai-chatclient`, `spring-ai-openai-starter`; term `spring-ai-term` | The Spring-native alternative asked for |
| Glossary: LLM, Token (LLM), Responses API, Chat Completions API, Spring AI | `glossary.yaml` | Interviewer words used in the concept |
| Story step for the AI summary | `_tech.yaml` | Every concept must be on a step |

### Dropped
| Reference item | Reason |
|---|---|
| I1.CODE-e `System.out.println(response);` | Trivial; replaced by returning the parsed text |

## Template v3 rewrite (21-10-2026)

Every concept and comparison was rewritten in teaching template v3 (CLAUDE.md 3.1.1) and given a cheat-sheet card; each reference item mapped above still lands in the same concept id. An independent pass then checked about 1,370 claims and fixed 32, removing 2.

### Unit basics

**Added from the reference**

| Reference item | Concept |
|---|---|
| R1. API, client, server, HTTP, JSON definitions | http-request-response (What it is, points); what-is-rest (What it is, point "API") |
| R1. Synchronous API | http-request-response (point, Interview Q "What does synchronous mean") |
| R1. The POST /api/payments example and PENDING response | http-request-response (Example, What to notice: payment status vs HTTP status) |
| R1. Endpoint = URL + method | resources-and-uris (Example: two endpoints on one URI) |
| R1.1 REST vs REST API | what-is-rest ("Not to be confused with" section, trap) |
| R4. Path vs query parameters, request body, PAY101 / includeRefunds | resources-and-uris (URI parts table, steps, scenario 2) |
| R4. Authorization carries credentials | statelessness (What it is, steps: token in every request) |
| R5. HATEOAS "not required in every practical REST API" | richardson-maturity-hateoas (trap, Rules "In practice", Interview Q "Why do most APIs stop at level 2?") |

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| Reference R5 implies HATEOAS is optional for REST | Fielding counts hypermedia as required; level 2 is common practice, not full REST (kept from draft, now with a "why" line) | https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven ; https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design |
| Draft point "Body length: Content-Length (or chunked)" was jargon-only | Rule rewritten: Content-Length gives the size in bytes; HTTP/1.1 can otherwise send the body in chunks | RFC 9112 6 |
| No new reference errors found in R1/R4 parts for this unit | | |

### Unit design

**Added from the reference**

| Reference item | Concept and place |
|---|---|
| R5 nouns, methods as verbs, plural names, careful nesting, consistent naming | url-design-rules (numbered steps, Example URL map, points) |
| R5 pagination, filtering, sorting, `?page=0&size=20` example | pagination-filtering-sorting (steps, Example, Spring Data defaults in Rules) |
| R5 version APIs (path or header), backward compatibility | api-versioning (What, Why, steps, breaking-change table); comparison uri-vs-header-vs-media-type-versioning (explain, example) |
| R5 error response: stable code, useful message, no stack traces | error-responses (points, trap, Example, Common mistakes) |
| R1 asynchronous processing, "returning a status or job ID" | long-running-operations (202 + Location + Retry-After; 201 vs 202 in Not to be confused with) |

**Corrections (draft or reference)**

| What | Fixed to | Source |
|---|---|---|
| Draft pagination: none wrong; the page-shift example was made precise (the last rows of page 1 repeat on page 2) | Concept scenario and comparison example | PostgreSQL 18 docs 7.6 |

**Facts added or re-verified (verifiedOn 2026-10-21)**

- Spring Boot 4.1: `spring.data.web.pageable.max-page-size` = 2000; a larger size is cut with `Math.min` (checked in spring-data-commons 4.0.3 bytecode and the Boot 4.1.1 properties appendix).
- PostgreSQL 18: LIMIT/OFFSET needs an ORDER BY with a unique order; skipped OFFSET rows are still computed.
- Microsoft Azure guidelines: omit `nextLink` on the last page (never null); disallow `:` in ids when using `:action` URLs; kebab-case (preferred) or camelCase path segments; Google AIP-122 camelCase collection ids.
- Spring Framework 7.0 API versioning: missing version → 400; unsupported version → 400; optional (latest used) or default version; supported versions detected from mappings; "2+" baseline; `StandardApiVersionDeprecationHandler` (Deprecation, Sunset, Link).
- RFC 9745: deprecation does not change behaviour; `@<unix time>` value; Sunset must not be earlier than Deprecation.
- RFC 9457: missing type = about:blank (title should be the status phrase); status is advisory and must match; unknown extensions are ignored; several problems of one type in one extension, different types → most relevant; adds a registry, multiple-problem guidance and non-dereferenceable type URIs.

### Unit docs

**Added from the reference**

| Reference item | Concept |
|---|---|
| R9 six test cases for POST /api/payments | api-testing-strategy Example table, now with the test level for each case and what each needs (security on, real unique constraint, timing-out stub) |
| R9 mocking, unit, integration, contract | api-testing-strategy What it is, steps, points (stub vs mock), scenarios |
| R9 Postman | api-testing-strategy Rules (Postman for exploring; Postman CLI in CI) |
| R9 observability, distributed tracing (trace and span IDs) | observability-for-apis What it is, steps 1-5, Example notes on the traceparent parts |
| C1 example architecture ("add only when it pays off") | payment-api-walkthrough Mermaid, trap, `trap.why`, final "So the key is" line |
| C2.1-C2.10 the ten steps | payment-api-walkthrough Steps, rewritten as full sentences; C2.5 (Strategy, Adapter) moved to the Rules bullet "Provider code" (no cross-tech link) |
| C2 failure scenario (timeout, do not charge again) | payment-api-walkthrough point "Timeout", Common mistake 1, Interview Q 2, scenario 2 (webhook after UNKNOWN) |
| C2 "Redis locks alone are not sufficient" | still owned by unknown-outcomes; walkthrough only in scenario 3 ("where does Redis fit?") |
| C3 rapid-fire REST rows | payment-api-walkthrough "Rules and defaults", now rule bullets linking their owners (statelessness, methods, 401 vs 403, 429, versioning). **Coverage file: the "picker table" became these bullets.** |
| C4 REST and payments rules | payment-api-walkthrough hook (answer order), points, sayIt |

**Corrections**

| What | Fix | Source |
|---|---|---|
| Draft Interview Q said SmartBear's donation was followed by "OpenAPI 3.0" as if 3.0 were the renamed 2.0 | The initiative renamed the spec OpenAPI; 3.0 followed in 2017 | https://www.openapis.org/faq |
| Draft api-styles listed the comparison in `confusedWith` while embedding it (rule 3.3) | `confusedWith: []` | CLAUDE.md 3.3 |
| Draft websockets text implied SSE passes all proxies | Removed (not confirmed) | n/a |
No reference claim in these units was found wrong beyond the corrections already in the coverage file (R9 Swagger = OpenAPI).

### Unit http

**Added from the reference**

| Reference item | Concept |
|---|---|
| R2. The five-line URL example (GET, POST, PUT, PATCH, DELETE on payments) | http-methods (Example: each sent twice, and the effect) |
| R2.1 Trap: PUT/PATCH do not guarantee validation, authorisation or transactions | http-methods (Common mistakes; the frontmatter trap is now the common "idempotent = same response" error) |
| R2. POST not idempotent: duplicate payments | http-methods (Why, How it works step 5, Interview Q 3 linking idempotency-keys) |
| R3. Scenario table: duplicate request conflicts with state → 409 | status-codes (scenario 2: refund a FAILED payment) |
| R3. "A failed payment is not automatically 500" | status-codes (trap with why, Example with a FAILED payment read with 200) |
| R3. 401 = authentication, 403 = permission | status-codes (scenario 1, Not to be confused with); comparison 401-vs-403 (explain, example) |
| R4. Content-Type, Accept, Authorization, Location, Cookie, Cache-Control | headers-content-negotiation (points, Rules "Other common headers"); http-caching |

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| Draft status-codes point marked 401 as `kind: default` | It is a rule, not a default: `kind: key`, "must come with a WWW-Authenticate header" | RFC 9110 15.5.2 |
| Draft "405 ... send Allow" | RFC 9110 15.5.6: the server MUST generate Allow in a 405 | RFC 9110 15.5.6 |
| Draft http-methods trap (validation/authorisation) did not test the method concept itself | Trap is now "idempotent means same response" (DELETE 204 then 404); the reference trap kept as a Common mistake | RFC 9110 9.2.2 |

### Unit playbook

### Unit reliability

**Added from the reference**

| Reference item | Concept and place |
|---|---|
| R7 idempotency key, deduplication, exactly-once effect, `order-789-payment` example | idempotency-keys (What, Why, steps, Example) |
| R7 retry, exponential backoff, jitter, timeout, circuit breaker | retries-and-timeouts (What, steps, Example); comparison retry-vs-circuit-breaker (explain, example) |
| R7 "a timeout does not prove that a payment failed"; C2.11 failure scenario; C2 "Redis locks alone are not sufficient" | unknown-outcomes (hook, trap, state diagram, steps, scenarios, Interview Qs) |
| R7 at-least-once delivery | webhooks (point, trap, Interview Q) |

**Corrections (draft or reference)**

| What | Fixed to | Source |
|---|---|---|
| Draft retries-and-timeouts cited RFC 9110 for Retry-After on 429 | RFC 9110 defines Retry-After for 503 and 3xx; 429 and its Retry-After come from RFC 6585 | https://www.rfc-editor.org/rfc/rfc6585.html#section-4 |
| Reference R7 "Timeout: maximum time a caller waits" (one limit) | Two limits: connect timeout applies only when a new connection is opened; request timeout covers waiting for the response (JDK HttpClient, Java 25) | https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/java/net/http/HttpClient.Builder.html |
| Reference R7 "server should return the original result" (too simple, kept from earlier coverage) | Stripe saves a result only once the endpoint starts running; a request rejected by validation or a concurrent conflict saves nothing; a 500 is saved and replayed for that key | https://docs.stripe.com/api/idempotent_requests |
| Draft unknown-outcomes: Stripe "after 24 hours, reconcile, never resend" | Kept, sharpened: after 24 hours retry with neither the old key nor a new one; a 500 is indeterminate and cached for the key | https://docs.stripe.com/error-low-level |

**Facts added or re-verified (verifiedOn 2026-10-21)**

- JDK HttpClient (Java 25): no request timeout means `send()` blocks forever; connect timeout applies only to new connections; `HttpTimeoutException` / `HttpConnectTimeoutException`.
- RFC 9110 Retry-After with 503 and 3xx; RFC 6585 allows it on 429.
- Stripe: a 500 is indeterminate and cached for the key; after 24 hours, retry with neither key and reconcile; store your id in metadata to match webhooks.
- Idempotency-Key draft-07: 400 / 422 / 409; guessable keys are a risk. Stripe: 255-character keys, no personal data, `Idempotent-Replayed: true`, GET and DELETE need no key.
- AWS SDKs standard mode: 3 attempts, full jitter, 20 s cap, retry quota token bucket. Amazon Builders' Library: retry at a single layer, 243x amplification, timeouts from p99.9.
- Stripe webhooks: 3xx counts as failure; live endpoints must be HTTPS with TLS 1.2 or 1.3; IP allow-list; sandbox retries three times over a few hours; event order not guaranteed and timestamps in seconds, so track ids; old secret kept up to 24 hours during rotation. Standard Webhooks: signed content `id.timestamp.body`, `whsec_` base64 secret, space-separated `v1,` signatures.
- `MessageDigest.isEqual`: time depends only on the length of the first argument (pass the computed value first).

### Unit security

**Added from the reference**

| Reference item | Concept |
|---|---|
| R6 authentication vs authorisation, "backend validates the token and then checks PAY101" | authentication-methods (What it is, steps, trap, Interview Q, scenario 401 vs 403/404) |
| R6 API key "not equivalent to a user login" | authentication-methods (point, Common mistakes, Interview Q) |
| R6 secret management, "not frontend code" | authentication-methods (point, Rules, Common mistakes) |
| R6 bearer token in Authorization header | authentication-methods (steps, Rules: RFC 6750 query SHOULD NOT, error codes) |
| R6 JWT trap: signed not encrypted; expiry, signature, issuer, audience | jwt (Mermaid chain, steps, runnable decode example, scenarios on tampering and aud) |
| R6 OAuth 2.0 delegated authorisation, OIDC identity layer | oauth2-and-oidc (What/Why, PKCE sequence, Common mistakes) |
| R6 CORS "not a replacement for server-side authorisation" | cors (hook, trap, point "Browser only") |
| R6 TLS/HTTPS | https-tls (What, steps, real curl handshake example) |
| R6 rate limiting | rate-limiting (steps, runnable token bucket) |
| R6 SQL injection, input validation, least privilege | owasp-api-security (points, Rules, Interview Q) |
| R2 OPTIONS for CORS preflight | cors (steps, Example) |
| R3 429 Too Many Requests | rate-limiting (hook, points, trap, Not to be confused with 503) |
| I9.R closing rule: production needs secrets, security | authentication-methods (Secrets) |
Also added (verified): RFC 6750 error codes (invalid_token 401, insufficient_scope 403); Spring Security resource-server defaults (discovery from issuer-uri on first request, checks signature/exp/nbf/iss, aud not checked unless `audiences` set, RS256 only, 60 s clock skew); PKCE mechanics (RFC 7636) and RFC 9700 rules (public MUST, confidential RECOMMENDED, S256, audience restriction); public vs confidential client; simple-request definition, preflight never carries cookies, Max-Age 5 s default, Spring global CORS defaults (GET, HEAD, POST), Spring Security must process CORS first; a simple request reaches the server even when the browser hides the answer; SSL vs TLS (RFC 7568); curl -k; HSTS max-age semantics; Retry-After seconds or date (RFC 9110); fixed window up to 2x at the edge; injection was API8:2019 and has no own 2023 item; 2023 merged excessive data exposure and mass assignment into API3; mass assignment Interview Q; BOLA vs BFLA.

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| Draft point "Injection" sat in the Top 10 points as if it were a 2023 item | Rules: injection was API8:2019 and has no own item in 2023; the defence still applies | https://api-security.owasp.org/editions/2019/en/0x11-t10 ; https://api-security.owasp.org/editions/2023/en/0x11-t10 |
| Draft "client credentials: no user, no refresh token" (absolute) | "normally with no refresh token"; RFC 6749 4.4.3 says a refresh token SHOULD NOT be included | https://www.rfc-editor.org/rfc/rfc6749 |
| Draft OAuth Example implied audience is always checked | Spring Security does not check aud by default; only with `audiences` | https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html |

### Unit spring

**Added from the reference**

| Reference item | Landed in |
|---|---|
| R8 PaymentController example (POST + GET, controller calls a service) | spring-rest-controllers (Example, GET), response-entity (Example, POST with 201 + Location) |
| R8 @RequestMapping / @GetMapping … @DeleteMapping | spring-rest-controllers (Rules and defaults, trap, scenarios: 405 with Allow, all-methods match) |
| R8 @PathVariable, @RequestParam, @RequestBody | request-binding-validation (table, steps, Not to be confused with) |
| R8 Bean Validation @NotNull @NotBlank @Positive | request-binding-validation (Example, points, scenario amount 0) |
| R8 ResponseEntity (status, headers, body) | response-entity |
| R8 DTO | dto-mapping (steps, scenario on extra "status" field) |
| R8 @ControllerAdvice / @ExceptionHandler | exception-handling (flow, Not to be confused with, Interview Q) |
| R9 MockMvc, @WebMvcTest, @SpringBootTest, mocking | spring-api-testing; comparison webmvctest-vs-springboottest |
| R9 unit / integration / contract testing | comparison unit-vs-integration-vs-contract-test (explain, example) |
| I1 "Remember only" shape, I9 integration map, I9.R "skeleton is not production" | openai-api-integration (steps, table, new Interview Q "Is this small client production-ready?") |
| Final rules: "validation … are everyday backend concepts" | request-binding-validation (Interview Q "why validate on the server") |
New facts beyond the draft (all verified 21-10-2026; most also observed in a real run):
- Unmapped HTTP method on a known path gets 405 with an Allow header (run; Spring Framework request-mapping docs).
- Embedded server port 8080 by default (Spring Boot servlet docs).
- Jackson 3 ignores unknown JSON properties by default: FAIL_ON_UNKNOWN_PROPERTIES = false (JSTEP-2; run with plain JsonMapper and in the app).
- The Spring Boot web starter has no validator; spring-boot-starter-validation is needed (Boot validation docs; spring-boot-starter-webmvc 4.1.1 POM).
- Parameter constraints use built-in method validation since 6.1; HandlerMethodValidationException is 400 for input errors; class-level @Validated switches to the proxy (Framework validation docs, Javadoc).
- A non-numeric amount fails in binding with HttpMessageNotReadableException, 400 (run).
- Returning the object from a POST gives 200, not 201 (run).
- @ResponseStatus does not override a ResponseEntity status (Javadoc, run: @ResponseStatus(CREATED) + ok() gave 200).
- Local @ExceptionHandler methods run before advice ones; advice scope narrows by package or annotations (Framework controller-advice docs).
- Spring fills ProblemDetail.instance with the request path (run).
- RestClient read timeout throws ResourceAccessException; a 4xx throws HttpClientErrorException (run with a local slow server).
- Spring Boot's HTTP client library order (Apache, Jetty, Reactor Netty, JDK HttpClient, HttpURLConnection) and spring.http.serviceclient.<group>.base-url (Boot rest-client docs).
- @WebMvcTest without a mock for the controller's service fails with "No qualifying bean" (run).

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| Draft rule "@PathVariable, @RequestParam, @RequestHeader: required; missing value fails" put @PathVariable with the 400 cases | Only @RequestParam and @RequestHeader are stated as "missing → 400" (verified by run for the header) | https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/bind/annotation/RequestParam.html |
| Draft rest-clients Defaults listed a WebClient.Builder bean next to RestClient.Builder without a condition | Only the prototype RestClient.Builder is stated (the Boot page confirms that one) | https://docs.spring.io/spring-boot/reference/io/rest-client.html |
| Reference R8 example: GET returns the String "Payment: " + id | GET returns a PaymentResponse DTO, written as JSON | https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann.html |
| Reference R8 example: create returns ResponseEntity.status(CREATED) with no Location | ResponseEntity.created(location) with ServletUriComponentsBuilder, 201 + Location | https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/ResponseEntity.html |
| Reference R8 example: controller builds the response itself | Controller calls PaymentService (the reference's own note), thin controller | as above |
