# REST API, Redis, AWS & Software Design Patterns

Interview Cheat Sheet — Beginner to Intermediate

This guide focuses on the concepts, terminology, rules, differences, defaults, and common interview questions you need for Java Backend / Spring Boot / Microservices interviews.

The examples use one common scenario throughout: a customer makes a payment using UPI, a card, or a wallet. You can reuse this scenario to explain many backend concepts and design patterns.

# PART 1: REST API

## 1. REST API Basics

### Subtopics

- API (Application Programming Interface): A way for two software systems to communicate.
- REST: An architectural style for building APIs around resources, usually accessed over HTTP.
- REST API: An API that follows REST principles, such as resource-based URLs and stateless requests.
- Resource: The thing an API manages, such as a payment, user, or order.
- Endpoint: A URL and HTTP method used to perform an operation.
- Client: The application sending a request, such as a frontend.
- Server: The application receiving and processing the request.
- HTTP: The protocol used to exchange requests and responses.
- JSON: A common format for sending structured data between client and server.
- Statelessness: Every request contains the information needed to process it; the server does not rely on stored conversational session state from previous requests.
- REST vs REST API: REST is the architectural style; a REST API is an implementation of it.
- Synchronous API: The client waits for the response to its request.
- Asynchronous processing: The server may accept a request and finish the work later, returning a status or job ID.

### Example

```
POST /api/payments
Content-Type: application/json

{
  "amount": 500,
  "currency": "INR",
  "method": "UPI"
}
```

Possible response:

```
{
  "paymentId": "PAY101",
  "status": "PENDING"
}
```

The client sends the payment request; the backend creates and processes the payment.

## 2. HTTP Methods

### Subtopics

- GET: Reads a resource. It should not change the resource's state.
- POST: Creates a resource or triggers an operation.
- PUT: Replaces a resource's representation; generally idempotent.
- PATCH: Partially updates a resource; not automatically idempotent.
- DELETE: Deletes a resource; defined as idempotent, although repeated responses may differ.
- HEAD: Like GET, but returns headers without the response body.
- OPTIONS: Describes communication options supported by an endpoint; commonly used for CORS preflight.
- Safe method: Intended to read data without changing server state. GET, HEAD, and OPTIONS are safe.
- Idempotent method: Repeating the same request has the same intended effect as performing it once. GET, HEAD, PUT, DELETE, and OPTIONS are defined as idempotent.
- POST is not inherently idempotent: Repeating a payment POST could create duplicate payments unless the application prevents it.

### Example

```
GET    /api/payments/PAY101
POST   /api/payments
PUT    /api/payments/PAY101
PATCH  /api/payments/PAY101
DELETE /api/payments/PAY101
```

Interview trap: PUT is normally for full replacement; PATCH is for partial modification. Neither method automatically guarantees validation, authorization, or database transactions.

## 3. HTTP Status Codes

### Subtopics

- 200 OK: Request succeeded.
- 201 Created: A resource was successfully created.
- 202 Accepted: Request was accepted for processing, but processing may not be complete.
- 204 No Content: Request succeeded without a response body.
- 301 / 302: Redirect status codes.
- 304 Not Modified: Cached representation can be reused.
- 400 Bad Request: Invalid request syntax or input.
- 401 Unauthorized: Authentication is missing or invalid.
- 403 Forbidden: The server refuses access, even if the caller is authenticated.
- 404 Not Found: Resource or endpoint was not found.
- 405 Method Not Allowed: The endpoint does not support that HTTP method.
- 409 Conflict: Request conflicts with current state, such as an incompatible duplicate operation.
- 415 Unsupported Media Type: Unsupported request format.
- 422 Unprocessable Content: Request content is understood but fails semantic validation.
- 429 Too Many Requests: Rate limit exceeded.
- 500 Internal Server Error: Unexpected server-side failure.
- 502 Bad Gateway: Gateway received an invalid response from an upstream server.
- 503 Service Unavailable: Service is temporarily unavailable or overloaded.
- 504 Gateway Timeout: Gateway did not receive a timely upstream response.

### Example

| Scenario                                     | Status     |
| -------------------------------------------- | ---------- |
| Payment created                              | 201        |
| Invalid amount                               | 400 or 422 |
| Payment does not exist                       | 404        |
| Duplicate request conflicts with state       | 409        |
| Rate limit exceeded                          | 429        |
| Unexpected backend failure                   | 500        |
| Request accepted for asynchronous processing | 202        |

Remember: 401 means authentication; 403 means permission. A failed payment is not automatically an HTTP 500—the HTTP status describes the API request, while the payment status describes the business outcome.

## 4. HTTP Headers, Request and Response

### Subtopics

- Headers: Metadata sent with the request or response.
- Content-Type: Format of the message body being sent.
- Accept: Response formats the client can accept.
- Authorization: Carries credentials, often a bearer token.
- Cache-Control: Defines caching behavior.
- Location: Often identifies a newly created resource after a 201 response.
- Cookie: Sends browser-managed state to a server.
- Request body: Data sent by the client, commonly in POST, PUT, or PATCH.
- Query parameters: Filters or options in the URL.
- Path parameters: Identify a specific resource.
- Request ID / Correlation ID: Helps trace a request across services.

### Example

```
GET /api/payments/PAY101?includeRefunds=true
Authorization: Bearer <token>
Accept: application/json
X-Request-ID: req-123
```

- `PAY101` is a path parameter.
- `includeRefunds=true` is a query parameter.
- `Authorization` carries authentication credentials.

## 5. REST API Design Rules

### Subtopics

- Use nouns in URLs: Prefer `/payments` over `/createPayment`.
- Use HTTP methods for actions: `POST /payments`, not necessarily `/createPayment`.
- Use plural resource names: `/payments`, `/users`, `/orders` is a common convention.
- Use nested resources carefully: `/users/10/payments` can represent a user's payments.
- Use consistent naming: Keep URL structures predictable.
- Version APIs: Commonly `/api/v1/payments` or a version header.
- Pagination: Return large result sets in manageable pages.
- Filtering: Example: `/payments?status=SUCCESS`.
- Sorting: Example: `/payments?sort=createdAt,desc`.
- Validation: Reject missing, malformed, or invalid values.
- Error response: Include a stable error code and a useful message; avoid leaking stack traces.
- Backward compatibility: Avoid breaking existing clients when changing an API.
- HATEOAS: REST concept where responses include links to related actions; not required in every practical REST API.

### Example

```
GET /api/v1/payments?status=SUCCESS&page=0&size=20
```

This requests the first page of successful payments.

## 6. Authentication, Authorization and Security

### Subtopics

- Authentication: Verifies who the caller is.
- Authorization: Checks what the caller is allowed to do.
- JWT: A token format that can carry claims, often used to authenticate API requests.
- Bearer token: A credential sent in the `Authorization` header.
- OAuth 2.0: A framework for delegated authorization.
- OpenID Connect (OIDC): Adds an identity layer on top of OAuth 2.0.
- API key: A credential used to identify or authorize an application; not automatically equivalent to a user login.
- TLS/HTTPS: Encrypts data in transit.
- CORS: Browser mechanism controlling cross-origin requests; it is not a replacement for server-side authorization.
- SQL injection: Attack where untrusted input alters a database query.
- Rate limiting: Restricts request frequency.
- Input validation: Checks data before processing.
- Least privilege: Give users and services only the permissions they need.
- Secret management: Store API keys and credentials in a secure server-side secret store, not frontend code.

### Example

```
Authorization: Bearer eyJ...
```

The backend validates the token and then checks whether the caller can access `PAY101`.

JWT trap: A signed JWT is not necessarily encrypted. Do not put secrets in its readable payload. JWT expiry, signature validation, issuer, and audience checks matter.

## 7. Idempotency, Retries and Duplicate Payments

### Subtopics

- Idempotency key: A unique client-generated key used to recognize retries of the same operation.
- Retry: Repeating a request after a temporary failure.
- Exponential backoff: Increasing the delay between retries.
- Jitter: Adding randomness to retry delays to avoid synchronized traffic spikes.
- Timeout: Maximum time a caller waits for a response.
- Circuit breaker: Temporarily blocks calls to an unhealthy dependency.
- At-least-once delivery: An operation or message may be delivered more than once.
- Exactly-once effect: The system prevents duplicate business effects, even if delivery is repeated.
- Deduplication: Recognizing and suppressing repeated operations.

### Example

```
POST /api/payments
Idempotency-Key: order-789-payment
```

If the client times out and retries with the same key, the server should return the original result instead of charging the customer again.

Important: A timeout does not prove that a payment failed. The payment provider may have completed it even though the response never reached the client. Check the existing transaction before initiating another charge.

## 8. REST API in Spring Boot

### Subtopics

- `@RestController`: Defines a controller whose returned objects are written to the response body.
- `@RequestMapping`: Defines a base URL or common request mapping.
- `@GetMapping`: Maps GET requests.
- `@PostMapping`: Maps POST requests.
- `@PutMapping`: Maps PUT requests.
- `@PatchMapping`: Maps PATCH requests.
- `@DeleteMapping`: Maps DELETE requests.
- `@PathVariable`: Reads a value from the URL path.
- `@RequestParam`: Reads a query parameter.
- `@RequestBody`: Converts the request body, usually JSON, into a Java object.
- `ResponseEntity`: Lets you control the HTTP status, headers, and response body.
- DTO (Data Transfer Object): An object used to transfer data across a boundary without exposing the database entity directly.
- Bean Validation: Uses annotations such as `@NotNull`, `@NotBlank`, and `@Positive` to validate input.
- `@ControllerAdvice`: Provides centralized handling of controller exceptions.
- `@ExceptionHandler`: Defines how a particular exception should be handled.

### Example

```
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @PostMapping
    public ResponseEntity<PaymentResponse> create(
            @Valid @RequestBody PaymentRequest request) {

        PaymentResponse response = new PaymentResponse(
                "PAY101", "PENDING");

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/{id}")
    public String getPayment(@PathVariable String id) {
        return "Payment: " + id;
    }
}
```

In a real application, the controller calls a service, and the service handles business logic. The example above is simplified.

## 9. API Testing and Documentation

### Subtopics

- Unit testing: Tests an individual class or method in isolation.
- Integration testing: Tests whether multiple components work together.
- Contract testing: Checks whether an API provider and its consumers agree on request/response contracts.
- Mocking: Replaces a dependency with a controlled test double.
- Postman: Tool for sending API requests and inspecting responses.
- Swagger / OpenAPI: Tools and specifications for describing API endpoints, inputs, outputs, and responses.
- Spring MockMvc: Tests Spring MVC request handling without starting a real HTTP server.
- Spring Boot `@WebMvcTest`: Loads the MVC slice for focused controller tests.
- Spring Boot `@SpringBootTest`: Loads a broader application context for integration testing.
- Observability: Understanding system behavior through logs, metrics, and traces.
- Distributed tracing: Follows a request across multiple services using trace and span identifiers.

### Example

For `POST /api/payments`, test:

1. Valid amount → payment created.
2. Negative amount → validation error.
3. Missing authentication → 401.
4. Insufficient permission → 403.
5. Duplicate idempotency key → no duplicate charge.
6. Payment provider timeout → payment remains safely recoverable.

# PART 5: CONNECT EVERYTHING — PAYMENT SYSTEM INTERVIEW

## 1. How the Technologies Work Together

### Example architecture

Client / Frontend

Sends a payment request over HTTPS

AWS Application Load Balancer

Routes requests to healthy application instances

Java / Spring Boot REST API

Authentication, validation, business logic

Strategy → select payment behavior

Adapter → integrate external gateway

PostgreSQL / RDS

Durable payment records

Redis / ElastiCache

Cache, rate limits, temporary state

SQS + Background Worker

Receipt generation and other asynchronous tasks

S3 + CloudWatch

Document storage, logs, metrics and alarms

This is an illustrative architecture, not a mandatory design. Each service should be added only when its benefits justify the extra complexity.

## 2. Interview Scenario: Customer Pays ₹500

### Subtopics

- Step 1 — REST API: Client calls `POST /api/payments` with the amount and an idempotency key.
- Step 2 — Security: Backend authenticates the caller and checks authorization.
- Step 3 — Validation: Verify the amount, currency, request format, and applicable business rules.
- Step 4 — Idempotency: Check whether the same logical payment request was already processed.
- Step 5 — Design patterns: Use Strategy for payment behavior and Adapter for provider-specific APIs.
- Step 6 — Persistence: Record the payment and its status in a durable database.
- Step 7 — External provider: Call the payment gateway with appropriate timeouts and idempotency support.
- Step 8 — Status handling: Distinguish success, failure, pending, and unknown outcomes.
- Step 9 — Asynchronous work: Publish reliable events for receipts or notifications using an appropriate messaging design.
- Step 10 — Observability: Use correlation IDs, logs, metrics, and traces to diagnose problems.

### Important failure scenario

Suppose the payment gateway processes the ₹500 payment, but the network times out before your backend receives its response.

Incorrect solution: Immediately charge the customer again.

Better solution: Treat the outcome as unknown, reconcile with the gateway, and retry safely using the same idempotency identity where supported. Never assume that a timeout means the original payment failed.

For financial correctness, use appropriate database transactions, uniqueness constraints, reliable event publishing, and reconciliation. Redis locks alone are not sufficient.

## 3. Rapid-Fire Interview Revision

| Question                         | Short answer                                                                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| What makes a REST API stateless? | Each request carries the information needed to process it without depending on conversational session state stored from earlier requests. |
| PUT vs PATCH?                    | Full replacement vs partial update.                                                                                                       |
| 401 vs 403?                      | Authentication problem vs permission denied.                                                                                              |
| What is idempotency?             | Repeating an operation has the same intended effect as doing it once.                                                                     |
| Why Redis?                       | Fast in-memory access for caching, counters, temporary state, and coordination.                                                           |
| Is Redis always persistent?      | No. Persistence and durability depend on configuration and failure scenario.                                                              |
| TTL vs eviction?                 | Expiration policy vs memory-pressure removal policy.                                                                                      |
| Why use Redis `INCR`?            | It atomically increments a counter.                                                                                                       |
| Can Redis replace PostgreSQL?    | Only for workloads suited to Redis; it is not a general replacement for relational storage.                                               |
| EC2 vs Lambda?                   | Virtual server management vs event-driven serverless execution.                                                                           |
| ECS vs EKS?                      | AWS container orchestration vs managed Kubernetes.                                                                                        |
| S3 vs EBS?                       | Object storage vs block storage.                                                                                                          |
| RDS vs DynamoDB?                 | Relational database vs NoSQL key-value/document database.                                                                                 |
| SQS vs SNS?                      | Queue-based work distribution vs publish/subscribe fan-out.                                                                               |
| IAM role vs policy?              | An identity that can be assumed vs rules defining permissions.                                                                            |
| What is Strategy?                | Select interchangeable behavior through a common interface.                                                                               |
| What is Factory?                 | Centralize object creation or selection.                                                                                                  |
| What is Adapter?                 | Make incompatible interfaces work together.                                                                                               |
| What is Decorator?               | Add behavior by wrapping an object.                                                                                                       |
| What is Proxy?                   | Control access to another object.                                                                                                         |
| What is Observer?                | Notify subscribers when an event or state change occurs.                                                                                  |
| What is Command?                 | Represent an action as an object.                                                                                                         |
| What is Repository?              | Abstract data access behind a domain-oriented interface.                                                                                  |
| What is Dependency Injection?    | Supply dependencies from outside instead of constructing them internally.                                                                 |
| What is SOLID?                   | Five principles for maintainable object-oriented design.                                                                                  |

## 4. Final Rules Worth Memorizing

- REST: use appropriate HTTP methods, status codes, validation, authentication, and idempotency.
- Payments: a timeout does not prove failure; retries must not create duplicate charges.
- Redis: use TTL deliberately, understand eviction, and do not treat a cache as the source of truth by default.
- AWS: understand compute, storage, databases, networking, IAM, queues, and monitoring.
- Security: prefer least privilege, secure secret storage, HTTPS, and server-side authorization.
- Java patterns: explain the problem first, then the pattern, then the payment example, then the trade-off.
- Spring Boot: know that DI, repositories, validation, REST controllers, and transaction management are everyday backend concepts.
- System design: discuss failure handling, scalability, reliability, security, and observability—not just which services you would use.

Best revision order: REST API → Redis → AWS → Strategy and Factory → Adapter and Proxy → Observer and Command → SOLID → the complete payment scenario.


<!-- ===== Owner addition: Integration templates: ChatGPT / OpenAI API (section 1), the 4 templates (8) and the integration-code map (9); Redis, Kafka and AWS parts are in their own reference files (added 20-10-2026). Source file: reference/reference.md ===== -->

I want simple and easy small remberabke coees for below

How do you integrate chatgpt api, how do u integrste redis
Kafka, aws 

Simole ease correct above kind of my stach related question if ask me to write code for above kind of questions












Exactly. For interviews, you do not need a huge production implementation. You need a small, correct code skeleton that shows you understand how the technology connects to a Java/Spring Boot application.

Use these as your “write-on-whiteboard” templates.
1. ChatGPT / OpenAI API
Interview question:
How would you integrate ChatGPT API in Java?

Remember:
Java
 ↓
HTTP POST
 ↓
OpenAI API
 ↓
JSON response

Simple Spring Boot-style code:
String apiKey = "YOUR_API_KEY";

RestClient client = RestClient.builder()
        .baseUrl("https://api.openai.com/v1")
        .defaultHeader("Authorization", "Bearer " + apiKey)
        .build();

String response = client.post()
        .uri("/chat/completions")
        .body("""
            {
              "model": "gpt-4o-mini",
              "messages": [
                {
                  "role": "user",
                  "content": "Explain Java in simple words"
                }
              ]
            }
            """)
        .retrieve()
        .body(String.class);

System.out.println(response);

Remember only:
RestClient
→ baseUrl
→ Authorization
→ POST
→ JSON body
→ retrieve()

Interview explanation:
“I would keep the API key in environment variables, create a RestClient, send a POST request with the model and messages, and parse the JSON response.”


8. The 4 Templates You Should Memorize
Don't memorize hundreds of lines.

Memorize these shapes:
ChatGPT
RestClient
 ↓
POST
 ↓
Authorization
 ↓
JSON
 ↓
retrieve()

Redis
RedisTemplate
 ↓
opsForValue()
 ↓
set() / get()

Kafka
KafkaTemplate
 ↓
send(topic, message)

@KafkaListener
 ↓
consume(message)

AWS S3
S3Client
 ↓
PutObjectRequest
 ↓
bucket + key
 ↓
putObject()

9. If They Ask "WRITE INTEGRATION CODE"
Your brain should immediately map:
Technology	Java/Spring thing	Main operation
ChatGPT	RestClient	POST
Redis	RedisTemplate	set/get
Kafka Producer	KafkaTemplate	send()
Kafka Consumer	@KafkaListener	consume
AWS S3	S3Client	putObject()
AWS SQS	SqsClient	sendMessage()
AWS RDS	JPA/JDBC	database operations


This is the level of code you should first master.

One important interview rule: don't claim that this tiny code is a complete production integration. For production, you'd add configuration, secrets management, error handling, timeouts/retries, serialization, logging, observability, and appropriate security. But for a “write a simple integration” interview question, these skeletons are the right things to make automatic.













