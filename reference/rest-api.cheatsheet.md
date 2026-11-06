# Fundamentals

## What REST Is ⭐

REST is an architectural style for building APIs around **resources** (things like a payment, user, or order), usually accessed over HTTP.

- **API**: a way for two software systems to communicate.
- **REST API**: an API that follows REST principles — resource-based URLs and stateless requests.
- **REST vs REST API**: REST is the style; a REST API is an implementation of it.
- **Client**: the app sending a request (e.g. a frontend). **Server**: the app receiving and processing it.
- **Resource**: the thing the API manages. **Endpoint**: a URL + HTTP method that performs an operation.
- Data is usually exchanged as **JSON** over **HTTP**.

```bash
POST /api/payments
Content-Type: application/json

{ "amount": 500, "currency": "INR", "method": "UPI" }
```

```json
{ "paymentId": "PAY101", "status": "PENDING" }
```

> Remember: A resource is a noun; the HTTP method is the verb acting on it.

## Statelessness ⭐

Every request carries all the information needed to process it. The server does **not** rely on conversational session state stored from earlier requests.

- Each request stands alone — any server instance can handle it.
- Makes APIs easy to scale horizontally.

> Remember: Stateless means "no memory of previous requests on the server", not "no database".

## Synchronous vs Asynchronous

- **Synchronous**: the client waits for the response.
- **Asynchronous processing**: the server accepts the request and finishes the work later, returning a status or job ID (often `202 Accepted`).

# HTTP Methods

## The Methods ⭐⭐

| Method  | Purpose                                        |
| ------- | ---------------------------------------------- |
| GET     | Read a resource; must not change its state     |
| POST    | Create a resource or trigger an operation      |
| PUT     | Replace a resource's representation (full)     |
| PATCH   | Partially update a resource                    |
| DELETE  | Delete a resource                              |
| HEAD    | Like GET, but returns headers with no body     |
| OPTIONS | Describe supported options; used in CORS preflight |

```bash
GET    /api/payments/PAY101
POST   /api/payments
PUT    /api/payments/PAY101
PATCH  /api/payments/PAY101
DELETE /api/payments/PAY101
```

> Remember: PUT replaces the whole resource; PATCH changes part of it.

## Safe and Idempotent ⭐⭐

- **Safe**: reads without changing server state → GET, HEAD, OPTIONS.
- **Idempotent**: repeating the request has the same intended effect as doing it once → GET, HEAD, PUT, DELETE, OPTIONS.
- **POST is not idempotent**: repeating a payment POST could create duplicate payments unless the app prevents it.
- DELETE is idempotent even though repeated responses may differ (second call may return 404).

> Remember: No HTTP method automatically guarantees validation, authorization, or a DB transaction — you add those.

# HTTP Status Codes

## The Classes ⭐⭐

| Class | Meaning                | Common codes                          |
| ----- | ---------------------- | ------------------------------------- |
| 2xx   | Success                | 200, 201, 202, 204                    |
| 3xx   | Redirection / caching  | 301, 302, 304                         |
| 4xx   | Client error           | 400, 401, 403, 404, 405, 409, 415, 422, 429 |
| 5xx   | Server error           | 500, 502, 503, 504                    |

**Key codes:**

- **200 OK** — succeeded. **201 Created** — resource created. **202 Accepted** — accepted for async processing. **204 No Content** — succeeded, no body.
- **304 Not Modified** — cached copy can be reused.
- **400 Bad Request** — invalid syntax/input. **401 Unauthorized** — authentication missing/invalid. **403 Forbidden** — authenticated but not permitted. **404 Not Found**. **405 Method Not Allowed**.
- **409 Conflict** — conflicts with current state (e.g. incompatible duplicate). **415 Unsupported Media Type**. **422 Unprocessable Content** — understood but fails semantic validation. **429 Too Many Requests** — rate limit exceeded.
- **500 Internal Server Error**. **502 Bad Gateway** — bad response from upstream. **503 Service Unavailable** — overloaded. **504 Gateway Timeout** — no timely upstream response.

| Scenario                        | Status     |
| ------------------------------- | ---------- |
| Payment created                 | 201        |
| Invalid amount                  | 400 or 422 |
| Payment does not exist          | 404        |
| Duplicate conflicts with state  | 409        |
| Rate limit exceeded             | 429        |
| Unexpected backend failure      | 500        |
| Accepted for async processing   | 202        |

> Remember: A failed payment is not automatically a 500 — the HTTP status describes the API request; the payment status describes the business outcome.

# Request and Response

## Headers ⭐

Metadata sent with a request or response.

- **Content-Type**: format of the body being sent.
- **Accept**: formats the client can accept back (content negotiation).
- **Authorization**: credentials, often a bearer token.
- **Cache-Control**: caching behaviour.
- **Location**: identifies a newly created resource after a 201.
- **Cookie**: browser-managed state sent to a server.
- **Request ID / Correlation ID**: traces a request across services.

## Parameters and Body

- **Path parameter**: identifies a specific resource (`/payments/PAY101`).
- **Query parameter**: filters or options (`?includeRefunds=true`).
- **Request body**: data sent by the client, usually in POST, PUT, PATCH.

```bash
GET /api/payments/PAY101?includeRefunds=true
Authorization: Bearer <token>
Accept: application/json
X-Request-ID: req-123
```

> Remember: Path = which resource; query = how to filter or shape the result.

# Design and Conventions

## URI Naming Rules ⭐⭐

- Use **nouns**, not verbs: `/payments`, not `/createPayment`.
- Let the **HTTP method** be the verb: `POST /payments`.
- Use **plural** resource names: `/payments`, `/users`, `/orders`.
- Use **nested resources** carefully: `/users/10/payments` for a user's payments.
- Keep naming **consistent and predictable**.

> Remember: The URL names the thing; the method says what you do to it.

## Versioning, Pagination, Filtering

- **Versioning**: `/api/v1/payments` or a version header; avoid breaking existing clients.
- **Pagination**: return large result sets in manageable pages (`page`, `size`).
- **Filtering**: `/payments?status=SUCCESS`.
- **Sorting**: `/payments?sort=createdAt,desc`.
- **Validation**: reject missing, malformed, or invalid values.
- **Error response**: include a stable error code and useful message; never leak stack traces.

```bash
GET /api/v1/payments?status=SUCCESS&page=0&size=20
```

> Remember: Backward compatibility first — changing an API should not break existing callers.

## HATEOAS

Responses include **links to related actions** (e.g. next steps for a resource). It is a REST concept but **not required** in every practical REST API.

# Auth and Security

## Authentication vs Authorization ⭐⭐

- **Authentication**: verifies **who** the caller is.
- **Authorization**: checks **what** the caller is allowed to do.

## Credentials and Tokens ⭐

- **Bearer token**: a credential sent in the `Authorization` header.
- **JWT**: a token format carrying claims, often used to authenticate requests.
- **OAuth 2.0**: a framework for delegated authorization. **OIDC**: adds an identity layer on top of OAuth 2.0.
- **API key**: identifies/authorizes an application; not automatically a user login.

```bash
Authorization: Bearer eyJ...
```

> Remember: A signed JWT is **not** encrypted — never put secrets in its readable payload. Validate signature, expiry, issuer, and audience.

## Core Protections

- **TLS/HTTPS**: encrypts data in transit.
- **CORS**: a browser mechanism controlling cross-origin requests — **not** a replacement for server-side authorization.
- **Input validation**: check data before processing (helps prevent **SQL injection**, where untrusted input alters a query).
- **Rate limiting**: restrict request frequency.
- **Least privilege**: give users and services only the permissions they need.
- **Secret management**: keep API keys/credentials in a server-side secret store, never in frontend code.

> Remember: CORS restricts browsers; it does not authorize anyone. Always check permissions on the server.

# Reliability

## Idempotency Keys ⭐⭐

An **idempotency key** is a unique client-generated key used to recognize **retries** of the same operation.

```bash
POST /api/payments
Idempotency-Key: order-789-payment
```

- If the client times out and retries with the same key, the server returns the **original result** instead of charging again.
- **Deduplication**: recognizing and suppressing repeated operations.
- **At-least-once delivery**: a request/message may arrive more than once. **Exactly-once effect**: the system prevents duplicate business effects even if delivery repeats.

> Remember: A timeout does **not** prove failure. The provider may have completed the work even though the response never arrived — check the existing transaction before charging again.

## Retries and Resilience

- **Retry**: repeat a request after a temporary failure.
- **Exponential backoff**: increase the delay between retries.
- **Jitter**: add randomness to retry delays to avoid synchronized traffic spikes.
- **Timeout**: the maximum time a caller waits for a response.
- **Circuit breaker**: temporarily blocks calls to an unhealthy dependency.

> Remember: Backoff + jitter stop retries from stampeding a struggling service.

## Caching

- **Cache-Control** header defines caching behaviour.
- A validated cache can return **304 Not Modified** so the client reuses its copy.

# REST in Spring Boot

## Controller Annotations ⭐

- `@RestController`: a controller whose returned objects are written to the response body.
- `@RequestMapping`: base URL / common mapping. `@GetMapping`, `@PostMapping`, `@PutMapping`, `@PatchMapping`, `@DeleteMapping` map the methods.
- `@PathVariable`: reads a value from the URL path. `@RequestParam`: reads a query parameter. `@RequestBody`: converts JSON into a Java object.
- `ResponseEntity`: lets you control status, headers, and body.

```java
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @PostMapping
    public ResponseEntity<PaymentResponse> create(
            @Valid @RequestBody PaymentRequest request) {
        PaymentResponse response = new PaymentResponse("PAY101", "PENDING");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public String getPayment(@PathVariable String id) {
        return "Payment: " + id;
    }
}
```

## Supporting Pieces

- **DTO (Data Transfer Object)**: carries data across a boundary without exposing the database entity.
- **Bean Validation**: `@NotNull`, `@NotBlank`, `@Positive` validate input.
- `@ControllerAdvice` + `@ExceptionHandler`: centralized exception handling.

> Remember: Controllers should stay thin — delegate business logic to a service.

# Testing and Documentation

## Test Levels

- **Unit test**: one class/method in isolation. **Integration test**: multiple components together.
- **Contract test**: provider and consumers agree on request/response contracts.
- **Mocking**: replace a dependency with a controlled test double.

## Tools

- **Postman**: send API requests and inspect responses.
- **Swagger / OpenAPI**: describe endpoints, inputs, outputs, and responses.
- **MockMvc** / `@WebMvcTest`: test Spring MVC controllers without a real HTTP server.
- `@SpringBootTest`: loads a broader context for integration testing.

## Observability

- **Observability**: understand behaviour through logs, metrics, and traces.
- **Distributed tracing**: follow a request across services using trace and span IDs (and correlation IDs).

> Remember: Test the hard cases — validation errors, 401/403, duplicate idempotency keys, and provider timeouts.

# Common "Why X vs Y?" Comparisons

## PUT vs PATCH ⭐

- **PUT** replaces the whole resource representation; it is generally idempotent.
- **PATCH** partially updates a resource; it is not automatically idempotent.

> Remember: Full replacement vs partial update.

## POST vs PUT ⭐

- **POST** creates a resource or triggers an operation; the server usually assigns the ID; **not idempotent**.
- **PUT** replaces a resource at a known URL; **idempotent**.

> Remember: POST to create (server decides the ID); PUT to replace at a URL you already know.

## Safe vs Idempotent

- **Safe**: does not change server state at all (GET, HEAD, OPTIONS).
- **Idempotent**: may change state, but repeating has the same effect as once (adds PUT, DELETE).

> Remember: Every safe method is idempotent, but not every idempotent method is safe.

## 401 vs 403 ⭐⭐

- **401 Unauthorized**: authentication is missing or invalid — the server does not know who you are.
- **403 Forbidden**: authenticated, but not permitted to do this.

> Remember: 401 = who are you? 403 = you may not.

## 400 vs 422

- **400 Bad Request**: the request syntax/input is malformed.
- **422 Unprocessable Content**: the request is well-formed but fails semantic validation.

> Remember: 400 can't be read; 422 can be read but breaks a rule.

## REST vs GraphQL vs gRPC

| Aspect     | REST                        | GraphQL                        | gRPC                          |
| ---------- | --------------------------- | ------------------------------ | ----------------------------- |
| Model      | Resources over HTTP         | Single endpoint, query shape   | RPC calls, binary (protobuf)  |
| Data shape | Fixed per endpoint          | Client picks fields            | Defined by service contract   |
| Best for   | Standard web APIs           | Flexible, client-driven reads  | Fast internal service-to-service |

> Remember: REST = resources; GraphQL = ask for exactly the fields you want; gRPC = fast typed RPC between services.

## The Payment Timeout Trap ⭐⭐

The gateway processes a ₹500 payment, but the network times out before your backend gets the response.

- **Wrong**: immediately charge the customer again.
- **Right**: treat the outcome as **unknown**, reconcile with the gateway, and retry safely using the same idempotency identity.

> Remember: For financial correctness use DB transactions, uniqueness constraints, reliable events, and reconciliation — Redis locks alone are not enough.
