# Spring Boot — Complete Interview Cheat Sheet

> **Interview goal:** Don't memorize Spring Boot as hundreds of annotations. Remember the **flow, rules, defaults, and “when/why”**. If you understand the structure below, most Spring Boot interview questions become predictable.

---

# 0. THE ONE-MINUTE SPRING BOOT MEMORY MAP

Memorize this first:

```text
Spring
 └── IoC / DI
      └── Spring Container
           ├── Creates Beans
           ├── Injects Dependencies
           ├── Manages Lifecycle
           └── Applies AOP / Proxies

Spring Boot
 ├── Auto Configuration
 ├── Starter Dependencies
 ├── Embedded Server
 ├── application.properties/yml
 ├── Actuator
 └── Production-ready defaults

Typical REST App

Client
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

And the **5 things to remember**:

```text
@Bean       → I create/register this object
@Component  → Spring should discover/manage this class
@Autowired  → Inject dependency
@Configuration → Configuration/bean definitions
@SpringBootApplication → Start Boot + scan + auto-config
```

---

# 1. SPRING vs SPRING BOOT

## Spring

Spring is a framework that provides:

- IoC
- Dependency Injection
- AOP
- Transaction management
- Web support
- Data access
- Security integration
- etc.

## Spring Boot

Spring Boot is built on top of Spring and makes Spring applications easier to create/configure/run.

### Remember:

> **Spring = framework capabilities**  
> **Spring Boot = easier Spring configuration + sensible defaults + auto-configuration**

---

# 2. WHY SPRING BOOT?

Before Spring Boot, developers commonly had to configure many things manually.

Spring Boot provides:

```text
Starter dependencies
       ↓
Auto Configuration
       ↓
Embedded Server
       ↓
Minimal configuration
       ↓
Production-ready application
```

### Major advantages

- Auto-configuration
- Embedded Tomcat/Jetty/Undertow
- Starter dependencies
- Externalized configuration
- Actuator
- Easy testing
- Convention over configuration

---

# 3. IoC — INVERSION OF CONTROL

This is one of the **most important Spring concepts**.

Normally:

```java
PaymentService service = new PaymentService();
```

Your code controls object creation.

With Spring:

```java
@Service
class PaymentService {
}
```

Spring creates/manages the object.

### Meaning

> **IoC = Control of object creation/lifecycle is transferred from your code to the Spring Container.**

---

# 4. DEPENDENCY INJECTION

DI is **how Spring implements IoC**.

Suppose:

```java
@Service
class PaymentService {
}
```

and:

```java
@RestController
class PaymentController {

    private final PaymentService paymentService;

    PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}
```

Spring:

```text
Spring Container
      ↓
creates PaymentService
      ↓
creates PaymentController
      ↓
injects PaymentService
```

### Memory rule

> **IoC = WHAT happened**  
> **DI = HOW dependency is supplied**

---

# 5. SPRING CONTAINER

The Spring Container manages Spring objects.

The objects managed by Spring are called:

# Beans

The container:

- creates beans
- configures beans
- injects dependencies
- manages lifecycle
- destroys beans when appropriate

Common container:

```text
ApplicationContext
```

---

# 6. BEAN

A **Bean** is simply an object managed by Spring.

Example:

```java
@Service
public class PaymentService {
}
```

`PaymentService` becomes a Spring bean.

You can also explicitly create one:

```java
@Configuration
public class AppConfig {

    @Bean
    public PaymentService paymentService() {
        return new PaymentService();
    }
}
```

### Important distinction

```text
@Component → tells Spring to discover the class

@Bean → tells Spring "use the object returned by this method as a bean"
```

---

# 7. COMPONENT SCANNING

Spring searches packages for classes such as:

```java
@Component
@Service
@Repository
@Controller
@RestController
```

and registers them as beans.

Usually scanning starts from the package containing:

```java
@SpringBootApplication
```

### Important interview point

If:

```text
com.example
 ├── Application.java
 └── service
      └── PaymentService.java
```

works naturally.

But if:

```text
com.example.app
 └── Application.java

com.other.service
 └── PaymentService.java
```

the second package may not be scanned automatically.

### Fix

Use:

```java
@ComponentScan("com.other")
```

or restructure packages.

---

# 8. @SPRINGBOOTAPPLICATION

This is the most important Boot annotation.

```java
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

Conceptually:

```text
@SpringBootApplication
        =
@Configuration
+
@EnableAutoConfiguration
+
@ComponentScan
```

### Memory trick

> **Boot = Configure + Auto Configure + Scan**

---

# 9. @CONFIGURATION

Marks a class as configuration.

```java
@Configuration
public class AppConfig {

    @Bean
    public PaymentService paymentService() {
        return new PaymentService();
    }
}
```

Think:

> **Configuration = instructions for creating/configuring beans**

---

# 10. @BEAN

Example:

```java
@Bean
public ObjectMapper objectMapper() {
    return new ObjectMapper();
}
```

The returned object becomes a Spring bean.

### When use @Bean?

Especially when:

- class is from a third-party library
- you cannot modify the class
- you want custom construction/configuration

Example:

```java
@Bean
public SomeLibraryClient client() {
    return new SomeLibraryClient("key");
}
```

---

# 11. @COMPONENT

Generic Spring-managed component.

```java
@Component
public class EmailValidator {
}
```

Spring discovers it through component scanning.

---

# 12. @SERVICE

```java
@Service
public class PaymentService {
}
```

Technically a specialization of `@Component`.

Purpose:

> Indicates business/service-layer logic.

---

# 13. @REPOSITORY

```java
@Repository
public class PaymentRepository {
}
```

Used for persistence/data-access components.

It also participates in Spring's exception translation mechanism for supported persistence technologies.

---

# 14. @CONTROLLER

```java
@Controller
public class PaymentController {
}
```

Used for MVC controllers, commonly returning views.

---

# 15. @RESTCONTROLLER

```java
@RestController
public class PaymentController {
}
```

Conceptually:

```text
@Controller
+
@ResponseBody
```

So returned objects are normally serialized into the HTTP response body.

### Memory:

```text
@Controller      → View
@RestController  → Data/JSON
```

---

# 16. DEPENDENCY INJECTION — 3 TYPES

## 1. Constructor Injection ⭐ Recommended

```java
@Service
public class PaymentService {

    private final PaymentRepository repository;

    public PaymentService(PaymentRepository repository) {
        this.repository = repository;
    }
}
```

Advantages:

- dependencies are explicit
- supports `final`
- easier testing
- object cannot exist without required dependency
- generally preferred

---

## 2. Setter Injection

```java
@Autowired
public void setRepository(PaymentRepository repository) {
    this.repository = repository;
}
```

Useful when dependency is optional/changeable.

---

## 3. Field Injection

```java
@Autowired
private PaymentRepository repository;
```

Works, but generally less preferred.

### Interview answer

> Constructor injection is generally preferred because dependencies are explicit, fields can be final, and unit testing is easier.

---

# 17. @AUTOWIRED

Tells Spring to resolve and inject a dependency.

Example:

```java
@Autowired
private PaymentService paymentService;
```

But constructor injection can often work without explicitly writing `@Autowired` when the class has a single constructor.

---

# 18. WHAT IF THERE ARE MULTIPLE BEANS?

Suppose:

```java
interface PaymentGateway {
}
```

```java
@Service
class StripeGateway implements PaymentGateway {
}
```

```java
@Service
class RazorpayGateway implements PaymentGateway {
}
```

Now:

```java
PaymentService(PaymentGateway gateway)
```

Spring has two candidates.

Result:

> Ambiguous dependency.

---

# 19. @QUALIFIER

Use:

```java
PaymentService(
    @Qualifier("stripeGateway")
    PaymentGateway gateway
)
```

Now Spring knows which bean.

### Memory

```text
Multiple candidates
       ↓
@Qualifier
       ↓
choose exact bean
```

---

# 20. @PRIMARY

```java
@Primary
@Service
class StripeGateway implements PaymentGateway {
}
```

Now Stripe becomes the default candidate when multiple implementations exist.

### @Primary vs @Qualifier

```text
@Primary   → default choice
@Qualifier → explicit choice
```

If a specific qualifier is requested, it can select that specific bean rather than relying on the primary default.

---

# 21. BEAN NAMING

For:

```java
@Service
class PaymentService {
}
```

default bean name is commonly:

```text
paymentService
```

based on the class name.

You can explicitly name:

```java
@Service("payment")
class PaymentService {
}
```

---

# 22. BEAN SCOPES

Very important.

Spring's common scopes:

| Scope | Meaning |
|---|---|
| singleton | One bean instance per Spring container |
| prototype | New instance when requested |
| request | One per HTTP request |
| session | One per HTTP session |
| application | One per ServletContext |
| websocket | One per WebSocket session |

### Most important

```text
Default = singleton
```

---

# 23. SINGLETON DOES NOT MEAN JVM SINGLETON

Spring singleton means:

> One instance **per Spring IoC container**.

Not necessarily one instance for the entire JVM.

---

# 24. PROTOTYPE

```java
@Scope("prototype")
@Component
class ReportGenerator {
}
```

Spring creates a new instance when the bean is requested from the container.

### Important trap

Prototype does **not** mean Spring manages the entire lifecycle exactly like singleton.

---

# 25. REQUEST / SESSION

Useful for web applications.

```text
request → one instance per HTTP request
session → one instance per HTTP session
```

---

# 26. LAZY INITIALIZATION

By default, singleton beans are generally created during application startup.

With:

```java
@Lazy
@Component
class HeavyService {
}
```

creation can be deferred until needed.

### Memory

```text
Normal singleton → startup
@Lazy             → first required use
```

---

# 27. BEAN LIFECYCLE

Simplified:

```text
Bean definition
      ↓
Instantiation
      ↓
Dependency Injection
      ↓
Initialization callbacks
      ↓
Bean ready
      ↓
Usage
      ↓
Destruction
```

Common annotations:

```java
@PostConstruct
@PreDestroy
```

Example:

```java
@PostConstruct
void init() {
}
```

```java
@PreDestroy
void cleanup() {
}
```

---

# 28. SPRING BOOT AUTO-CONFIGURATION ⭐⭐⭐

This is a core interview topic.

Spring Boot looks at:

- classpath
- existing beans
- configuration properties
- application conditions

and automatically configures appropriate components.

Example:

If web dependencies are present:

```text
Spring Web
   ↓
Boot detects web environment
   ↓
configures web infrastructure
   ↓
embedded server etc.
```

---

# 29. @ENABLEAUTOCONFIGURATION

Enables Boot's auto-configuration mechanism.

Normally included through:

```java
@SpringBootApplication
```

---

# 30. AUTO-CONFIGURATION IS CONDITIONAL

Boot doesn't blindly configure everything.

It uses conditions such as:

```text
If class exists
If bean doesn't exist
If property matches
If application type matches
...
```

Common annotations:

```java
@ConditionalOnClass
@ConditionalOnMissingBean
@ConditionalOnProperty
@ConditionalOnBean
```

### Most important concept

> **Auto-configuration backs off when your explicit configuration provides what it would otherwise configure.**

---

# 31. STARTER DEPENDENCIES ⭐⭐⭐

Starters are convenient dependency bundles.

Examples:

```text
spring-boot-starter-web
spring-boot-starter-data-jpa
spring-boot-starter-security
spring-boot-starter-test
spring-boot-starter-validation
```

Instead of manually adding many related dependencies.

### Memory

> **Starter = dependency bundle**

---

# 32. EMBEDDED SERVER

Spring Boot web applications can run with an embedded server.

Common:

```text
Tomcat
Jetty
Undertow
```

Typical Spring MVC Boot applications use embedded Tomcat by default when using the standard web starter.

So:

```bash
java -jar application.jar
```

can start the web application without separately deploying a WAR to an external server.

---

# 33. APPLICATION.PROPERTIES / YAML

Configuration:

```properties
server.port=8081
spring.datasource.url=...
```

or:

```yaml
server:
  port: 8081
```

### Common location

```text
src/main/resources/application.properties
src/main/resources/application.yml
```

---

# 34. EXTERNALIZED CONFIGURATION

Don't hardcode environment-specific values.

Bad:

```java
String password = "secret123";
```

Better:

```properties
db.password=${DB_PASSWORD}
```

Then environment:

```text
DB_PASSWORD=...
```

### Typical priority concept

Spring Boot combines configuration from multiple sources, with higher-precedence sources overriding lower-precedence ones.

Important sources include:

```text
application.properties/yml
environment variables
system properties
command-line arguments
```

### Interview memory

> **Externalize configuration → change environment without rebuilding code.**

---

# 35. @VALUE

```java
@Value("${payment.timeout}")
private int timeout;
```

Useful for injecting individual properties.

---

# 36. @CONFIGURATIONPROPERTIES ⭐

For grouped configuration, prefer:

```java
@ConfigurationProperties(prefix = "payment")
public class PaymentProperties {

    private int timeout;
    private String currency;
}
```

Configuration:

```yaml
payment:
  timeout: 30
  currency: INR
```

### @Value vs @ConfigurationProperties

```text
@Value
→ individual/simple property

@ConfigurationProperties
→ structured/grouped configuration
```

---

# 37. PROFILES ⭐⭐⭐

Profiles allow environment-specific configuration.

```text
application.yml
application-dev.yml
application-prod.yml
```

Activate:

```properties
spring.profiles.active=dev
```

Or through environment/command-line configuration.

### Memory

```text
dev
test
prod
```

Same application, different configuration.

---

# 38. @PROFILE

```java
@Profile("dev")
@Bean
public PaymentGateway mockGateway() {
    return new MockGateway();
}
```

Only created for that profile.

---

# 39. REST API STRUCTURE ⭐⭐⭐

Typical Spring Boot architecture:

```text
HTTP Request
     ↓
Controller
     ↓
Service
     ↓
Repository
     ↓
Database
```

Example:

```java
@RestController
@RequestMapping("/payments")
class PaymentController {

    private final PaymentService service;

    @GetMapping("/{id}")
    PaymentDto get(@PathVariable Long id) {
        return service.getPayment(id);
    }
}
```

---

# 40. COMMON REST ANNOTATIONS

## @REQUESTMAPPING

```java
@RequestMapping("/payments")
```

Maps requests.

---

## @GETMAPPING

```java
@GetMapping("/{id}")
```

GET.

---

## @POSTMAPPING

```java
@PostMapping
```

POST.

---

## @PUTMAPPING

```java
@PutMapping("/{id}")
```

PUT.

---

## @PATCHMAPPING

```java
@PatchMapping("/{id}")
```

PATCH.

---

## @DELETEMAPPING

```java
@DeleteMapping("/{id}")
```

DELETE.

---

# 41. @PATHVARIABLE

URL:

```text
/payments/123
```

Code:

```java
@GetMapping("/{id}")
public Payment get(@PathVariable Long id) {
}
```

`id = 123`.

---

# 42. @REQUESTPARAM

URL:

```text
/payments?status=SUCCESS
```

Code:

```java
@GetMapping
public List<Payment> get(
    @RequestParam String status
) {
}
```

### Memory

```text
PathVariable → /payments/123
RequestParam → /payments?status=SUCCESS
```

---

# 43. @REQUESTBODY

Reads request body.

```java
@PostMapping
public Payment create(
    @RequestBody CreatePaymentRequest request
) {
}
```

JSON:

```json
{
  "amount": 1000
}
```

Spring/Jackson maps JSON → Java object.

---

# 44. @REQUESTHEADER

```java
@RequestHeader("Authorization")
String authorization
```

Reads HTTP header.

---

# 45. @RESPONSESTATUS

```java
@ResponseStatus(HttpStatus.CREATED)
```

Can specify response status.

For more flexible APIs, `ResponseEntity` is often used.

---

# 46. RESPONSEENTITY

```java
return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(payment);
```

Allows controlling:

```text
status
headers
body
```

---

# 47. JSON SERIALIZATION

Spring Boot commonly uses Jackson with Spring Web.

```text
Java Object
   ↓
Jackson
   ↓
JSON
```

Response:

```json
{
  "id": 10,
  "amount": 1000
}
```

And reverse:

```text
JSON
 ↓
Jackson
 ↓
Java Object
```

---

# 48. DTO ⭐⭐⭐

Don't blindly expose entities through APIs.

Instead:

```text
Entity
   ↓
Service
   ↓
DTO
   ↓
Controller
   ↓
JSON
```

Example:

```java
record PaymentResponse(
    Long id,
    BigDecimal amount,
    String status
) {}
```

### Why DTO?

- API contract isolation
- prevent exposing internal fields
- validation
- security
- versioning
- avoid persistence-layer coupling

---

# 49. VALIDATION ⭐⭐⭐

Dependency:

```text
spring-boot-starter-validation
```

Example:

```java
public class CreateUserRequest {

    @NotBlank
    private String name;

    @Email
    private String email;

    @Min(18)
    private int age;
}
```

Controller:

```java
@PostMapping
public User create(
    @Valid @RequestBody CreateUserRequest request
) {
}
```

### Important

```text
@Valid
→ trigger validation
```

---

# 50. COMMON VALIDATION ANNOTATIONS

Remember:

```text
@NotNull
@NotBlank
@NotEmpty

@Size
@Min
@Max
@Positive
@Negative

@Email
@Pattern

@Past
@Future
```

### Common confusion

```text
@NotNull → not null
@NotEmpty → not null + not empty
@NotBlank → not null + not empty + not whitespace
```

---

# 51. GLOBAL EXCEPTION HANDLING ⭐⭐⭐

Use:

```java
@RestControllerAdvice
```

Example:

```java
@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(PaymentNotFoundException.class)
    ResponseEntity<?> handle(PaymentNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }
}
```

### Memory

```text
Exception
    ↓
@ExceptionHandler
    ↓
@RestControllerAdvice
    ↓
consistent API error response
```

---

# 52. @EXCEPTIONHANDLER

Handles specific exceptions.

```java
@ExceptionHandler(UserNotFoundException.class)
```

Can be:

- controller-local
- used within advice for global handling

---

# 53. SPRING DATA JPA ⭐⭐⭐

Spring Data JPA simplifies database access using JPA.

Typical:

```java
@Entity
class Payment {
}
```

```java
public interface PaymentRepository
        extends JpaRepository<Payment, Long> {
}
```

You get methods such as:

```text
save()
findById()
findAll()
deleteById()
existsById()
```

---

# 54. JPA vs HIBERNATE vs SPRING DATA JPA

Very common interview question.

```text
JPA
 ↓
Specification/API

Hibernate
 ↓
JPA implementation

Spring Data JPA
 ↓
Abstraction/repository support built on JPA
```

### Memory

> **JPA = rules/API**  
> **Hibernate = implementation**  
> **Spring Data JPA = repository convenience layer**

---

# 55. @ENTITY

```java
@Entity
class Payment {
}
```

Marks class as a persistent JPA entity.

---

# 56. @ID

```java
@Id
private Long id;
```

Primary key.

---

# 57. @GENERATEDVALUE

```java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```

Database/provider generates the identifier according to the chosen strategy.

---

# 58. COMMON JPA RELATIONSHIPS

```text
@OneToOne
@OneToMany
@ManyToOne
@ManyToMany
```

Example:

```text
Customer
   |
   | 1
   |
   | many
   ↓
Orders
```

Usually:

```java
@ManyToOne
private Customer customer;
```

on the `Order` side.

---

# 59. LAZY vs EAGER ⭐⭐⭐

## LAZY

Load relationship when accessed.

```text
Order loaded
   ↓
Customer not necessarily loaded immediately
```

## EAGER

Relationship is fetched as part of loading according to the persistence provider/query behavior.

### Memory

```text
LAZY  → later
EAGER → immediately/with entity fetch
```

### Interview warning

Don't say:

> EAGER always means one SQL query.

That's not guaranteed. Fetch strategy and actual SQL execution depend on mapping/query/provider behavior.

---

# 60. N+1 QUERY PROBLEM ⭐⭐⭐

Example:

```text
1 query → fetch 100 orders

Then:
100 queries → fetch customers
```

Total:

```text
101 queries
```

This is the N+1 problem.

Possible solutions:

```text
JOIN FETCH
@EntityGraph
batch fetching
careful query design
```

---

# 61. TRANSACTIONS ⭐⭐⭐

Use:

```java
@Transactional
```

Example:

```java
@Transactional
public void processPayment() {
    savePayment();
    updateAccount();
}
```

Concept:

```text
Operation A
Operation B
Operation C
     ↓
Transaction
     ↓
All succeed → commit
Failure → rollback according to transaction rules
```

---

# 62. ACID

Remember:

```text
A → Atomicity
C → Consistency
I → Isolation
D → Durability
```

### Atomicity

All or nothing.

### Consistency

Transaction preserves defined data integrity rules.

### Isolation

Concurrent transactions should not improperly interfere according to the selected isolation level.

### Durability

Committed data survives failures according to the database's durability guarantees.

---

# 63. @TRANSACTIONAL ROLLBACK TRAP ⭐⭐⭐

A common interview point:

By default, Spring transaction rollback behavior is primarily based on unchecked exceptions (`RuntimeException` and `Error`), while checked exceptions do not automatically trigger rollback in the same way.

You can customize:

```java
@Transactional(rollbackFor = Exception.class)
```

### Memory

```text
RuntimeException → rollback by default
Checked Exception → not automatically rollback by default
```

---

# 64. TRANSACTION PROPAGATION

Most important:

```text
REQUIRED
REQUIRES_NEW
SUPPORTS
MANDATORY
NOT_SUPPORTED
NEVER
NESTED
```

### REQUIRED ⭐

Default.

```text
If transaction exists
    → join it

If not
    → create one
```

### REQUIRES_NEW

```text
Suspend existing transaction
        ↓
create new transaction
```

### Memory

```text
REQUIRED      → join/create
REQUIRES_NEW  → pause old + create new
```

---

# 65. TRANSACTION ISOLATION

Common levels:

```text
READ_UNCOMMITTED
READ_COMMITTED
REPEATABLE_READ
SERIALIZABLE
```

General progression:

```text
more concurrency
      ↕
more isolation
```

Higher isolation can reduce certain concurrency anomalies but may increase locking/contention and reduce throughput.

---

# 66. SPRING AOP ⭐⭐⭐

AOP = Aspect-Oriented Programming.

Useful for cross-cutting concerns:

```text
Logging
Security
Transactions
Metrics
Auditing
```

Instead of duplicating:

```java
log();
method();
log();
```

you can apply an aspect.

---

# 67. CORE AOP TERMS

Remember:

```text
Aspect
Advice
Pointcut
Join Point
Weaving
```

### Aspect

Cross-cutting concern.

Example:

```text
LoggingAspect
```

### Advice

What action to perform.

```text
Before
After
AfterReturning
AfterThrowing
Around
```

### Pointcut

Which methods should be targeted.

### Join point

A point during execution where advice can apply. In Spring proxy-based AOP, method execution is the central join-point model.

### Weaving

Applying aspect behavior to target code.

---

# 68. SPRING AOP PROXY ⭐⭐⭐

Spring commonly uses proxies.

Conceptually:

```text
Your code
   ↓
Proxy
   ↓
Actual bean
```

Example:

```text
@Transactional
   ↓
Spring proxy
   ↓
transaction starts
   ↓
method executes
   ↓
commit/rollback
```

---

# 69. SELF-INVOCATION TRAP ⭐⭐⭐

Example:

```java
@Transactional
public void methodA() {
    methodB();
}

@Transactional
public void methodB() {
}
```

Calling:

```java
methodA()
```

then:

```text
this.methodB()
```

doesn't pass through the Spring proxy again.

Therefore proxy-based annotations such as `@Transactional` on `methodB` may not be applied as expected through self-invocation.

### Memory

> **Spring AOP works through proxy interception → internal `this.method()` calls bypass the proxy.**

---

# 70. SPRING SECURITY ⭐⭐⭐

Spring Security handles things such as:

```text
Authentication
Authorization
Password handling
Security filters
Session security
OAuth2
JWT integration
CSRF
CORS integration
```

---

# 71. AUTHENTICATION vs AUTHORIZATION

Very important.

```text
Authentication
→ WHO are you?

Authorization
→ WHAT are you allowed to do?
```

Example:

```text
Login
 ↓
Authentication

ADMIN access
 ↓
Authorization
```

---

# 72. SPRING SECURITY FILTER CHAIN

Requests pass through security filters before reaching your controller.

Simplified:

```text
HTTP Request
     ↓
Security Filters
     ↓
Authentication
     ↓
Authorization
     ↓
Controller
```

---

# 73. PASSWORD STORAGE

Never store plain-text passwords.

Use a password hashing function such as:

```text
BCrypt
Argon2
```

Concept:

```text
password
   ↓
hash
   ↓
database
```

At login:

```text
password
   ↓
password encoder verifies against stored hash
```

---

# 74. JWT

JWT is commonly used for stateless API authentication.

Conceptually:

```text
Login
 ↓
JWT issued
 ↓
Client sends JWT
 ↓
Server validates JWT
 ↓
Authentication established
```

JWT commonly has:

```text
Header.Payload.Signature
```

### Important

JWT is **signed**, not inherently encrypted.

Don't put secrets/passwords in the payload merely because it's encoded.

---

# 75. CORS vs CSRF ⭐⭐⭐

## CORS

Controls which **origins** can make browser cross-origin requests to your server.

```text
frontend.com
     ↓
api.com
```

Browser checks CORS rules.

## CSRF

Attacks authenticated requests where the browser automatically sends credentials, especially cookie-based authentication.

### Memory

```text
CORS → Cross-Origin access
CSRF → Cross-Site request forgery
```

They solve different problems.

---

# 76. @PREAUTHORIZE

Method-level authorization:

```java
@PreAuthorize("hasRole('ADMIN')")
public void deleteUser(Long id) {
}
```

Meaning:

> Only users with the required authority/role can invoke it.

---

# 77. TESTING ⭐⭐⭐

Spring Boot provides testing support.

Important annotations:

```text
@SpringBootTest
@WebMvcTest
@DataJpaTest
@MockBean / @MockitoBean
```

Depending on your Spring Boot/Spring Framework version, mock-bean testing annotations may differ; know the version used by the project.

---

# 78. @SPRINGBOOTTEST

Loads a broad/full application context for integration-style tests.

```java
@SpringBootTest
class PaymentServiceTest {
}
```

### Memory

```text
@SpringBootTest
→ big context
→ integration testing
```

---

# 79. @WEBMVCTEST

Focuses on Spring MVC layer.

```java
@WebMvcTest(PaymentController.class)
```

Useful for testing:

```text
Controller
Request mapping
Validation
Serialization
HTTP response
```

without loading the entire application.

### Memory

```text
@WebMvcTest → Controller slice
```

---

# 80. @DATAJPATEST

Focuses on JPA/database layer.

```java
@DataJpaTest
```

Useful for repository/entity persistence tests.

### Memory

```text
@WebMvcTest  → Web
@DataJpaTest → Database
@SpringBootTest → Full application
```

---

# 81. MOCKITO

Used for unit-test mocking.

Example:

```java
@Mock
PaymentRepository repository;

@InjectMocks
PaymentService service;
```

Concept:

```text
Real dependency → Mock dependency
```

So you can test service logic without database.

---

# 82. MOCK vs STUB

### Mock

Verifies interactions.

```text
Was repository.save() called?
```

### Stub

Provides predetermined behavior.

```text
when findById(1)
→ return payment
```

---

# 83. ACTUATOR ⭐⭐⭐

Spring Boot Actuator provides production-oriented monitoring/management endpoints.

Common endpoints include:

```text
/actuator/health
/actuator/info
/actuator/metrics
```

Depending on configuration, additional endpoints can be exposed.

### Uses

```text
Health checks
Metrics
Monitoring
Application information
Operational management
```

---

# 84. HEALTH CHECK

Common endpoint:

```text
/actuator/health
```

Used by:

```text
Load balancer
Kubernetes
Deployment platform
Monitoring system
```

Concept:

```text
App healthy?
   ↓
Traffic allowed
```

---

# 85. LOGGING

Spring Boot commonly uses SLF4J API with Logback as the default logging implementation in standard Boot setups.

Prefer:

```java
private static final Logger log =
    LoggerFactory.getLogger(MyService.class);

log.info("Payment processed: {}", paymentId);
```

instead of:

```java
System.out.println(...)
```

---

# 86. LOG LEVELS

Remember:

```text
TRACE
DEBUG
INFO
WARN
ERROR
```

Typical production default:

```text
INFO
```

---

# 87. SPRING BOOT STARTUP FLOW ⭐⭐⭐

This is a great interview answer.

When:

```java
SpringApplication.run(Application.class, args);
```

runs:

```text
1. Create/configure SpringApplication
          ↓
2. Determine application environment
          ↓
3. Load configuration
          ↓
4. Create ApplicationContext
          ↓
5. Component scanning
          ↓
6. Auto-configuration
          ↓
7. Create beans
          ↓
8. Dependency injection
          ↓
9. Lifecycle callbacks/events
          ↓
10. Embedded server starts for web app
          ↓
11. Application ready
```

Don't overclaim exact internal ordering; this is the interview-level conceptual flow.

---

# 88. COMMANDLINE RUNNER

Execute logic after application startup:

```java
@Component
class StartupTask implements CommandLineRunner {

    @Override
    public void run(String... args) {
        // startup logic
    }
}
```

---

# 89. APPLICATIONRUNNER

Similar purpose but provides parsed application arguments.

```java
@Component
class StartupTask implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) {
    }
}
```

### Difference

```text
CommandLineRunner
→ String... args

ApplicationRunner
→ ApplicationArguments
```

---

# 90. EMBEDDED SERVER PORT

Default commonly:

```text
8080
```

Change:

```properties
server.port=9090
```

---

# 91. SPRING BOOT CLI ARGUMENT

Can override configuration:

```bash
java -jar app.jar --server.port=9090
```

This is one example of higher-precedence external configuration overriding the packaged default configuration.

---

# 92. COMMON HTTP STATUS CODES

Memorize:

```text
200 OK
201 Created
204 No Content

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Content

500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
```

### Most confusing

```text
401 → not authenticated / invalid authentication
403 → authenticated but not allowed
```

---

# 93. COMMON REST DESIGN

For payment:

```text
POST   /payments
GET    /payments/{id}
GET    /payments
PUT    /payments/{id}
PATCH  /payments/{id}
DELETE /payments/{id}
```

Think:

```text
POST   → create
GET    → read
PUT    → replace/update
PATCH  → partial update
DELETE → delete
```

---

# 94. IDEMPOTENCY

Important for backend interviews.

### GET

Normally expected to be idempotent.

### PUT

Expected to be idempotent.

### DELETE

Semantically idempotent even if repeated requests return different status codes.

### POST

Normally **not** idempotent.

For payments, use:

```text
Idempotency-Key
```

to prevent duplicate payment creation when clients retry.

---

# 95. FILTER vs INTERCEPTOR vs AOP

Very common comparison.

| Mechanism | Layer |
|---|---|
| Filter | Servlet/request level |
| Interceptor | Spring MVC level |
| AOP | Method/business level |

### Filter

Good for:

```text
request preprocessing
logging
security-related processing
headers
```

### Interceptor

Good for:

```text
controller request handling
authentication checks
logging
request-specific logic
```

### AOP

Good for:

```text
transactions
logging
metrics
cross-cutting business concerns
```

### Memory

```text
HTTP
 ↓
Filter
 ↓
Interceptor
 ↓
Controller
 ↓
Service
 ↓
AOP proxy around methods
```

Conceptual ordering can vary depending on configuration.

---

# 96. FILTER vs INTERCEPTOR

### Filter

Servlet specification-level mechanism.

Can operate before Spring MVC.

### Interceptor

Spring MVC mechanism.

Works around controller handling.

### Easy memory

> **Filter = outside Spring MVC**  
> **Interceptor = inside Spring MVC**

---

# 97. SPRING MVC

Spring MVC is the web framework used by Spring Boot applications for traditional servlet-based HTTP APIs.

Core flow:

```text
Client
 ↓
DispatcherServlet
 ↓
Handler Mapping
 ↓
Controller
 ↓
Service
 ↓
Response
```

---

# 98. DISPATCHERSERVLET ⭐⭐⭐

Central front controller in Spring MVC.

It receives HTTP requests and coordinates request processing.

Conceptually:

```text
HTTP Request
     ↓
DispatcherServlet
     ↓
Find controller
     ↓
Invoke controller
     ↓
Generate response
```

### Memory

> **DispatcherServlet = front controller of Spring MVC**

---

# 99. SPRING MVC REQUEST FLOW

Remember:

```text
Request
 ↓
Filter
 ↓
DispatcherServlet
 ↓
HandlerMapping
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Database
 ↓
Response
```

---

# 100. SPRING DATA REPOSITORY INTERFACES

Common hierarchy:

```text
Repository
    ↓
CrudRepository
    ↓
PagingAndSortingRepository
```

And commonly:

```text
JpaRepository
```

extends Spring Data repository abstractions and adds JPA-specific conveniences.

### Most commonly used

```java
JpaRepository<Entity, ID>
```

---

# 101. DERIVED QUERY METHODS

Example:

```java
findByEmail(String email)
```

Spring Data derives the query from the method name.

Other examples:

```java
findByStatus(String status)

findByStatusAndAmountGreaterThan(
    String status,
    BigDecimal amount
)

findByNameContaining(String name)
```

### Memory

> **Method name → query generation**

---

# 102. @QUERY

For custom queries:

```java
@Query("""
    SELECT p
    FROM Payment p
    WHERE p.status = :status
""")
List<Payment> findPayments(
    @Param("status") String status
);
```

---

# 103. JPQL vs SQL

### JPQL

Uses:

```text
Entity names
Entity fields
```

Example:

```sql
SELECT p FROM Payment p
```

### SQL

Uses:

```text
Tables
Columns
```

Example:

```sql
SELECT * FROM payments;
```

### Memory

> **JPQL talks about objects/entities; SQL talks about tables.**

---

# 104. PAGINATION

Don't return millions of records.

Spring Data:

```java
Page<Payment> findAll(Pageable pageable);
```

Example:

```java
PageRequest.of(0, 20)
```

Means:

```text
page 0
20 records
```

### Memory

```text
Pagination → control response size + DB work
```

---

# 105. SORTING

```java
Sort.by("amount").descending()
```

Can combine with pagination.

---

# 106. OPTIONAL

Repository commonly returns:

```java
Optional<Payment>
```

Instead of:

```java
Payment
```

because record may not exist.

Example:

```java
repository.findById(id)
```

---

# 107. NULL HANDLING

Avoid:

```java
Optional.get()
```

without checking.

Prefer:

```java
.orElseThrow(...)
```

Example:

```java
Payment payment = repository.findById(id)
    .orElseThrow(PaymentNotFoundException::new);
```

---

# 108. ENTITY vs DTO vs MODEL

Remember:

```text
Entity
→ database representation

DTO
→ API/data-transfer representation

Domain model
→ business representation
```

They can sometimes be the same class in simple applications, but separating them is often useful as systems grow.

---

# 109. @JSONIGNORE

Can prevent a field from being serialized into JSON.

Useful for sensitive/internal fields, but don't treat serialization annotations as your primary security boundary.

---

# 110. LAZY LOADING + JSON TRAP

Entity:

```java
@OneToMany(fetch = FetchType.LAZY)
private List<Order> orders;
```

Controller returns entity.

Jackson accesses:

```text
orders
```

This can trigger lazy loading or lead to session-related problems depending on configuration.

### Better

Use:

```text
Entity
 ↓
DTO
 ↓
JSON
```

and explicitly fetch the data needed.

---

# 111. CASCADE

JPA relationship:

```java
cascade = CascadeType.ALL
```

Means persistence operations can propagate from parent to related entity.

Common:

```text
PERSIST
MERGE
REMOVE
REFRESH
DETACH
ALL
```

### Warning

`CascadeType.REMOVE` can be dangerous on relationships where deleting one entity should not delete related independent records.

---

# 112. ORPHAN REMOVAL

```java
orphanRemoval = true
```

Can remove child entities when they are removed from the parent's relationship in appropriate ownership scenarios.

### Memory

```text
Cascade → operation propagation
OrphanRemoval → child becomes orphan → remove child
```

---

# 113. OWNING SIDE

In bidirectional JPA relationships, one side owns the relationship mapping.

Common:

```java
@ManyToOne
@JoinColumn(name = "customer_id")
private Customer customer;
```

The `Order` side commonly owns the foreign-key relationship.

### Memory

> **Owning side controls the relationship mapping/foreign key.**

---

# 114. @JOINCOLUMN

Specifies the foreign key column used for a relationship.

```java
@JoinColumn(name = "customer_id")
```

---

# 115. DATABASE TRANSACTION vs SPRING TRANSACTION

Spring's:

```java
@Transactional
```

typically coordinates transactional resource operations, such as database transactions, through transaction managers.

Think:

```text
Business method
     ↓
@Transactional
     ↓
Spring transaction infrastructure
     ↓
DB transaction
```

---

# 116. TRANSACTIONAL SERVICE LAYER

Common pattern:

```java
@Service
public class PaymentService {

    @Transactional
    public void processPayment() {
        ...
    }
}
```

Why service layer?

Because one business operation may involve:

```text
Repository A
Repository B
External/business logic
```

and the transaction boundary should generally align with the business operation.

---

# 117. TRANSACTION READONLY

```java
@Transactional(readOnly = true)
```

Indicates the transaction is intended for reads.

Useful as a semantic/performance hint depending on transaction manager/database/provider behavior.

Don't claim it universally makes the database physically read-only.

---

# 118. SPRING CACHE ⭐⭐⭐

Spring provides caching abstraction.

```java
@Cacheable("payments")
public Payment getPayment(Long id) {
}
```

Flow:

```text
Request
 ↓
Cache?
 ↓
YES → return cached result
NO
 ↓
Execute method
 ↓
Store result
```

Common annotations:

```text
@Cacheable
@CachePut
@CacheEvict
```

---

# 119. @CACHEABLE vs @CACHEPUT vs @CACHEEVICT

```text
@Cacheable
→ use cache; method may be skipped on hit

@CachePut
→ execute method + update cache

@CacheEvict
→ remove cache entry
```

### Memory

```text
Cacheable → READ cache
CachePut  → WRITE cache
CacheEvict → DELETE cache
```

---

# 120. REDIS + SPRING BOOT

If Redis is used as a cache:

```text
Application
   ↓
Spring Cache abstraction
   ↓
Redis
```

Spring Boot can auto-configure infrastructure when the relevant dependencies/configuration are present.

---

# 121. ASYNC

Spring supports asynchronous execution:

```java
@Async
public void sendEmail() {
}
```

Usually enabled with:

```java
@EnableAsync
```

Concept:

```text
Caller
 ↓
@Async method
 ↓
Executor/thread pool
```

### Important

Don't blindly assume unlimited threads.

Configure an appropriate executor.

---

# 122. SCHEDULING

```java
@Scheduled(fixedRate = 60000)
public void cleanup() {
}
```

Enable scheduling:

```java
@EnableScheduling
```

Common:

```text
fixedRate
fixedDelay
cron
```

### Difference

```text
fixedRate
→ scheduled based on start times

fixedDelay
→ wait after previous execution finishes
```

---

# 123. SCHEDULED + MULTIPLE INSTANCES

Important distributed-systems interview trap.

If:

```text
3 application instances
```

and each runs:

```java
@Scheduled
```

the task may execute on **each instance**.

For distributed single-execution scheduling, use an external coordination/locking mechanism rather than assuming `@Scheduled` provides distributed locking.

---

# 124. EVENT SYSTEM

Spring supports application events.

```java
applicationEventPublisher.publishEvent(
    new PaymentCompletedEvent(...)
);
```

Listener:

```java
@EventListener
public void handle(PaymentCompletedEvent event) {
}
```

Useful for decoupling components within the application.

---

# 125. SYNCHRONOUS vs ASYNCHRONOUS EVENTS

Default event listener execution is synchronous in the normal application-event model.

For async execution, configure asynchronous event handling appropriately.

### Memory

```text
Event ≠ automatically async
```

---

# 126. RESTCLIENT / HTTP CLIENTS

Spring applications may call other services using clients such as:

```text
RestClient
WebClient
OpenFeign (if added)
```

### WebClient

Designed for reactive/non-blocking HTTP use cases.

### RestClient

Modern synchronous HTTP client API for Spring applications.

---

# 127. RESTCLIENT vs WEBCLIENT

```text
RestClient
→ synchronous/blocking style

WebClient
→ reactive/non-blocking style
```

Don't use WebClient just because "reactive is faster." The architecture and workload determine whether reactive programming is beneficial.

---

# 128. SPRING WEBFLUX

Reactive web stack.

Core types:

```text
Mono
Flux
```

### Mono

0 or 1 result.

### Flux

0 to many results.

```text
Mono<User>
Flux<User>
```

---

# 129. SPRING MVC vs WEBFLUX ⭐⭐⭐

| MVC | WebFlux |
|---|---|
| Servlet-based | Reactive |
| Usually blocking style | Non-blocking model |
| Thread-per-request model commonly | Event-loop/reactive model |
| Simple CRUD apps | High-concurrency/reactive workloads |

### Important

WebFlux isn't automatically better.

Choose based on:

```text
I/O model
workload
team expertise
existing ecosystem
```

---

# 130. BLOCKING IN WEBFLUX

A common trap:

> "If I use WebFlux, everything becomes non-blocking."

False.

If you call a blocking JDBC/database/API operation on the reactive execution path, you can still block threads.

---

# 131. SPRING BOOT CONFIGURATION ANNOTATIONS

Remember this cluster:

```text
@Configuration
@Bean
@ConfigurationProperties
@Profile
@Value
@Import
@ComponentScan
```

---

# 132. @IMPORT

Allows importing additional configuration/classes.

Useful for modular configuration.

---

# 133. @IMPORTAUTOCONFIGURATION

Used heavily in testing or controlled auto-configuration scenarios.

Not something you normally need in everyday application code.

---

# 134. @CONDITIONAL

Conditional configuration.

Examples:

```java
@ConditionalOnProperty
@ConditionalOnClass
@ConditionalOnMissingBean
```

This is a core mechanism behind Boot auto-configuration.

---

# 135. SPRING BOOT AUTO-CONFIGURATION MEMORY TRICK

When asked:

> "How does Spring Boot know what to configure?"

Answer:

```text
Dependencies/classpath
       +
Application configuration
       +
Conditional auto-configurations
       +
Existing beans
       ↓
Spring Boot configures appropriate infrastructure
```

---

# 136. WHAT IS "STARTER WEB"?

Conceptually brings dependencies needed for common Spring MVC web application development.

Typical stack includes:

```text
Spring MVC
JSON support
Embedded servlet container
Validation-related integration depending on version/dependencies
```

Exact dependency contents can change by Spring Boot version, so avoid memorizing every transitive dependency.

---

# 137. WHAT IS "STARTER DATA JPA"?

Provides convenient dependency setup for:

```text
Spring Data JPA
JPA provider integration
database access infrastructure
```

You still need an appropriate database driver.

---

# 138. SPRING BOOT VERSION MANAGEMENT

Spring Boot manages compatible dependency versions through its dependency management/BOM approach.

Therefore you often don't need to specify versions for every Spring ecosystem dependency individually.

### Memory

> **Boot manages compatible dependency versions.**

---

# 139. MAVEN vs GRADLE

Spring Boot commonly supports:

```text
Maven
Gradle
```

Maven:

```text
pom.xml
```

Gradle:

```text
build.gradle
build.gradle.kts
```

---

# 140. FAT JAR / EXECUTABLE JAR

Spring Boot can package an application into an executable JAR containing application code and dependencies.

Run:

```bash
java -jar app.jar
```

### Memory

```text
Executable JAR
→ app + dependencies
→ embedded server
→ java -jar
```

---

# 141. SPRING BOOT DEVTOOLS

Useful during development for features such as:

```text
automatic restart
development-time conveniences
```

Should not be treated as a production dependency.

---

# 142. ERROR HANDLING

Good API:

```json
{
  "timestamp": "...",
  "status": 404,
  "error": "Payment not found",
  "path": "/payments/123"
}
```

Prefer consistent error contracts rather than exposing stack traces.

---

# 143. OBSERVABILITY

Think:

```text
Logs
+
Metrics
+
Traces
```

Spring Boot Actuator helps with operational endpoints/metrics, while distributed tracing typically integrates with an observability stack.

---

# 144. HEALTH vs READINESS vs LIVENESS

For production deployments:

```text
Liveness
→ Should this instance be restarted?

Readiness
→ Should this instance receive traffic?
```

Don't confuse:

```text
application is alive
```

with:

```text
application is ready to serve traffic
```

Spring Boot Actuator supports health groups and Kubernetes-oriented health indicators/configuration.

---

# 145. CACHING vs DATABASE

Typical architecture:

```text
Request
 ↓
Cache
 ↓ hit
Return

 ↓ miss
Database
 ↓
Update cache
 ↓
Return
```

Cache is for:

```text
faster reads
reduced DB load
```

Not the source of truth unless explicitly designed that way.

---

# 146. COMMON SPRING ANNOTATION CHEAT TABLE

| Annotation | Remember as |
|---|---|
| `@Component` | Generic bean |
| `@Service` | Business service |
| `@Repository` | Data access |
| `@Controller` | MVC controller/view |
| `@RestController` | REST controller |
| `@Configuration` | Configuration class |
| `@Bean` | Register returned object |
| `@Autowired` | Dependency injection |
| `@Qualifier` | Choose specific bean |
| `@Primary` | Default bean |
| `@Lazy` | Create later |
| `@Profile` | Environment-specific |
| `@Value` | Inject property |
| `@ConfigurationProperties` | Grouped properties |
| `@Transactional` | Transaction boundary |
| `@Cacheable` | Read/use cache |
| `@CachePut` | Update cache |
| `@CacheEvict` | Remove cache |
| `@Async` | Async execution |
| `@Scheduled` | Scheduled execution |
| `@EventListener` | Event listener |
| `@ExceptionHandler` | Handle exception |
| `@RestControllerAdvice` | Global REST errors |
| `@Valid` | Trigger validation |

---

# 147. REST ANNOTATION CHEAT TABLE

| Annotation | Meaning |
|---|---|
| `@RequestMapping` | Generic route |
| `@GetMapping` | GET |
| `@PostMapping` | POST |
| `@PutMapping` | PUT |
| `@PatchMapping` | PATCH |
| `@DeleteMapping` | DELETE |
| `@PathVariable` | URL path value |
| `@RequestParam` | Query parameter |
| `@RequestBody` | Request body |
| `@RequestHeader` | HTTP header |
| `@ResponseBody` | Return body |
| `@ResponseStatus` | Set status |
| `@CrossOrigin` | CORS configuration |

---

# 148. JPA ANNOTATION CHEAT TABLE

| Annotation | Meaning |
|---|---|
| `@Entity` | Persistent entity |
| `@Table` | Table mapping |
| `@Id` | Primary key |
| `@GeneratedValue` | ID generation |
| `@Column` | Column mapping |
| `@Transient` | Not persisted |
| `@OneToOne` | 1:1 |
| `@OneToMany` | 1:N |
| `@ManyToOne` | N:1 |
| `@ManyToMany` | N:N |
| `@JoinColumn` | FK mapping |
| `@Embedded` | Embedded value object |
| `@Embeddable` | Embeddable class |
| `@Version` | Optimistic locking |

---

# 149. OPTIMISTIC LOCKING ⭐⭐⭐

Use:

```java
@Version
private Long version;
```

Concept:

```text
Read record
version = 1

User A updates
version = 2

User B tries update using version 1
        ↓
conflict
```

Useful for preventing lost updates without pessimistically locking every read.

---

# 150. PESSIMISTIC LOCKING

Database-level locking can prevent concurrent modification by locking rows for a transaction.

Concept:

```text
Transaction A
 ↓
locks row
 ↓
Transaction B waits/fails depending on lock semantics
```

Use carefully because excessive locking can cause:

```text
contention
deadlocks
reduced throughput
```

---

# 151. SPRING DATA JDBC vs JPA

### JPA

Provides:

```text
ORM
Entity relationships
Persistence context
Dirty checking
Lazy loading
```

### Spring Data JDBC

Simpler relational mapping model without the full JPA persistence-context/ORM model.

### Memory

```text
JPA → richer ORM
JDBC → simpler relational mapping
```

---

# 152. PERSISTENCE CONTEXT ⭐⭐⭐

In JPA, the persistence context tracks managed entities.

Conceptually:

```text
Database
   ↕
Persistence Context
   ↕
Entity
```

When a managed entity changes:

```java
payment.setStatus("SUCCESS");
```

JPA can detect the change and synchronize it with the database during flush/transaction commit.

This is:

# Dirty Checking

---

# 153. ENTITY STATES

Common JPA states:

```text
Transient
Managed
Detached
Removed
```

### Transient

New object, not managed.

### Managed

Attached to persistence context.

### Detached

Was managed, no longer managed.

### Removed

Marked for deletion.

---

# 154. SAVE DOES NOT ALWAYS MEAN INSERT

Important Spring Data/JPA interview trap.

Depending on entity state/identifier/persistence semantics:

```java
repository.save(entity)
```

may result in:

```text
INSERT
```

or:

```text
UPDATE/MERGE
```

Don't say:

> `save()` always performs INSERT.

---

# 155. FLUSH vs COMMIT

### Flush

Synchronizes persistence-context changes with the database.

### Commit

Finalizes the transaction.

Conceptually:

```text
Entity changes
 ↓
Persistence context
 ↓ flush
DB statements
 ↓ commit
Transaction finalized
```

Flush does **not** mean transaction committed.

---

# 156. FIRST-LEVEL CACHE

JPA persistence context provides a first-level cache.

Within the same persistence context:

```text
find Payment(1)
find Payment(1)
```

the same managed entity instance may be reused rather than issuing another database query.

---

# 157. SECOND-LEVEL CACHE

Optional JPA provider-level cache shared across persistence contexts.

Not enabled/used simply because you're using JPA.

---

# 158. COMMON SPRING BOOT INTERVIEW QUESTIONS

## Q: What is Spring Boot?

> Spring Boot simplifies Spring application development through auto-configuration, starter dependencies, embedded servers, externalized configuration, and production-ready features such as Actuator.

---

## Q: Spring vs Spring Boot?

> Spring provides the framework and core capabilities; Spring Boot simplifies configuring and running Spring applications.

---

## Q: What is IoC?

> IoC means object creation and lifecycle management are controlled by the Spring container rather than application code.

---

## Q: What is DI?

> Dependency Injection is the mechanism by which Spring supplies an object's dependencies.

---

## Q: What is a Bean?

> A bean is an object managed by the Spring IoC container.

---

## Q: What does @SpringBootApplication do?

> It combines configuration, component scanning, and Spring Boot auto-configuration.

---

## Q: What is auto-configuration?

> Spring Boot conditionally configures application infrastructure based on the classpath, configuration, application type, and existing beans.

---

## Q: What is a starter?

> A starter is a convenient dependency bundle for a particular application capability.

---

## Q: Why constructor injection?

> It makes required dependencies explicit, supports immutable fields, improves testability, and prevents partially initialized objects.

---

## Q: What happens if two beans implement the same interface?

> Spring may find multiple candidates and fail with an ambiguity error; use `@Qualifier` for a specific bean or `@Primary` for a default.

---

## Q: What is @Transactional?

> It defines a transaction boundary around a method/class, allowing related database operations to commit or roll back as a unit according to transaction rules.

---

## Q: What is Spring AOP?

> A mechanism for applying cross-cutting concerns such as transactions, logging, and security around method execution, commonly through proxies.

---

## Q: Why doesn't @Transactional work on self-invocation?

> Because the internal method call uses `this` and bypasses the Spring proxy that normally performs transaction interception.

---

## Q: @Controller vs @RestController?

> `@Controller` is commonly used with MVC views, while `@RestController` is effectively `@Controller` plus response-body semantics for REST responses.

---

## Q: @RequestParam vs @PathVariable?

> `@RequestParam` reads query parameters such as `?status=PAID`; `@PathVariable` reads values embedded in the URL path such as `/payments/123`.

---

## Q: JPA vs Hibernate?

> JPA is a persistence specification/API; Hibernate is a popular JPA implementation.

---

## Q: Spring Data JPA?

> It provides repository abstractions and query-generation conveniences on top of JPA.

---

## Q: Lazy vs eager?

> Lazy loads an association when needed; eager requests loading as part of entity fetching. The exact SQL behavior depends on the provider/query.

---

## Q: What is N+1?

> One query loads the parent records, followed by N additional queries for related records. It can often be addressed through fetch joins, entity graphs, batching, or better query design.

---

## Q: 401 vs 403?

```text
401 → authentication problem
403 → authenticated but not authorized
```

---

## Q: @SpringBootTest vs @WebMvcTest?

```text
@SpringBootTest → broad/full application context
@WebMvcTest     → MVC/controller slice
```

---

# 159. MOST IMPORTANT "WHAT CAN/CANNOT" RULES

These are worth memorizing.

### Dependency Injection

```text
❌ Don't instantiate Spring-managed dependencies manually with new
✅ Inject them
```

---

### Constructor injection

```text
✅ Preferred
✅ final fields
✅ easy unit testing
```

---

### Beans

```text
@Component → Spring discovers class
@Bean      → Spring registers returned object
```

---

### Multiple beans

```text
2 candidates
 ↓
❌ ambiguous
✅ @Qualifier
✅ @Primary
```

---

### Transactions

```text
@Transactional
 ↓
❌ don't assume checked exceptions automatically rollback
❌ don't assume self-invocation activates proxy advice
```

---

### REST

```text
@PathVariable → URL path
@RequestParam → query parameter
@RequestBody → HTTP body
```

---

### Security

```text
401 ≠ 403

401 → authentication issue
403 → authorization issue
```

---

### JWT

```text
JWT ≠ encryption

JWT commonly provides signed claims
```

---

### JPA

```text
save() ≠ always INSERT

LAZY ≠ no database query ever

EAGER ≠ necessarily one SQL query

flush ≠ commit
```

---

### WebFlux

```text
WebFlux ≠ automatically faster

Blocking operations can still block.
```

---

### Scheduled tasks

```text
@Scheduled ≠ distributed lock

3 instances
→ potentially 3 executions
```

---

### CORS / CSRF

```text
CORS ≠ CSRF

CORS → browser cross-origin policy
CSRF → forged authenticated requests
```

---

# 160. SPRING BOOT ARCHITECTURE TO REMEMBER

For most backend interview questions, draw:

```text
                    CLIENT
                      │
                      ▼
                ┌───────────┐
                │  Security │
                │  Filters  │
                └─────┬─────┘
                      │
                      ▼
              ┌───────────────┐
              │ Dispatcher    │
              │ Servlet       │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │ Controller    │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │ Service       │
              │ Business Logic│
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │ Repository    │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │ Database      │
              └───────────────┘
```

Cross-cutting:

```text
       ┌───────────────┐
       │ AOP           │
       │ Transactions  │
       │ Logging       │
       │ Metrics       │
       └───────────────┘
```

And:

```text
Configuration
      ↓
application.yml
profiles
environment variables
      ↓
Spring Boot
      ↓
Auto Configuration
```

---

# 161. THE "SPRING CONTAINER" MEMORY STORY

If interviewer asks almost anything about Spring internals, start here:

```text
Application starts
      ↓
Spring creates ApplicationContext
      ↓
Finds bean definitions
      ↓
Scans components
      ↓
Applies auto-configuration
      ↓
Creates beans
      ↓
Resolves dependencies
      ↓
Creates proxies where needed
      ↓
Bean ready
```

Then:

```text
Request
 ↓
Proxy/filter/security
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Database
```

This mental model connects **DI + AOP + Security + Transactions + MVC + JPA**.

---

# 162. SPRING BOOT "ONE-LINE MEMORY SHEET"

If you only have **2 minutes before an interview**, remember this:

```text
Spring
= IoC + DI + AOP + Transactions

Boot
= Starters + AutoConfig + Embedded Server + External Config + Actuator

IoC
= Spring owns object creation

DI
= Spring supplies dependencies

Bean
= Spring-managed object

@Component
= discover this class

@Service
= business component

@Repository
= persistence component

@Controller
= MVC controller

@RestController
= REST/data controller

@Bean
= register returned object

@Autowired
= inject dependency

@Qualifier
= choose exact bean

@Primary
= default bean

Default scope
= singleton per container

@SpringBootApplication
= Configuration + ComponentScan + AutoConfiguration

AutoConfig
= conditional configuration

@ConfigurationProperties
= grouped configuration

Profile
= environment-specific configuration

Controller
= HTTP layer

Service
= business layer

Repository
= data layer

DTO
= API contract

JPA
= persistence specification

Hibernate
= JPA implementation

Spring Data JPA
= repository abstraction

LAZY
= load association when needed

N+1
= 1 query + N related queries

@Transactional
= transaction boundary

REQUIRED
= join/create transaction

REQUIRES_NEW
= suspend/create new

AOP
= cross-cutting concerns

Proxy
= intercept method calls

Self-invocation
= bypasses proxy

Security
= Authentication + Authorization

401
= authentication problem

403
= authorization problem

CORS
= cross-origin browser policy

CSRF
= forged authenticated request

JWT
= signed token, not inherently encrypted

@WebMvcTest
= MVC slice

@DataJpaTest
= JPA slice

@SpringBootTest
= broad/full context

Actuator
= monitoring/management

@Cacheable
= cache read

@CachePut
= update cache

@CacheEvict
= remove cache

@Async
= asynchronous execution

@Scheduled
= scheduled execution

WebFlux
= reactive/non-blocking stack

Mono
= 0..1

Flux
= 0..N
```

---

# 163. THE 10 THINGS MOST LIKELY TO BE ASKED

If your interview time is limited, prioritize these **in this exact order**:

```text
1. IoC + Dependency Injection
2. @SpringBootApplication
3. Auto-configuration
4. Bean lifecycle + scopes
5. Constructor injection / @Qualifier / @Primary
6. REST Controller + request mappings
7. Spring Data JPA + Hibernate + relationships
8. @Transactional + propagation + rollback
9. Spring Security + JWT + 401/403
10. Testing + Actuator
```

Then:

```text
11. AOP / proxies
12. Profiles / configuration
13. Exception handling
14. Validation
15. Caching
16. Async / Scheduling
17. MVC vs WebFlux
18. JPA performance/N+1
```

---

# 164. FINAL MENTAL MODEL

Don't remember Spring Boot as:

```text
100 annotations ❌
```

Remember it as:

```text
              SPRING BOOT
                   │
        ┌──────────┴──────────┐
        │                     │
   Spring Core             Boot
        │                     │
   IoC / DI              AutoConfig
   Beans                 Starters
   AOP                   Embedded Server
   Lifecycle             Config
        │                Actuator
        │
        ├───────────────┐
        │               │
      Web             Data
        │               │
     MVC              JPA
     REST           Hibernate
     Security       Repositories
        │               │
        └───────┬───────┘
                │
             Business
              Service
                │
             Database
```

And the **single most useful interview sentence** is:

> **“Spring manages objects as beans through the IoC container and injects their dependencies; Spring Boot builds on this with auto-configuration, starters, embedded infrastructure, and externalized configuration so we can build production-ready applications with much less manual setup.”**

That sentence gives you the foundation for almost every **“What is Spring Boot?”**, **“How does Spring work?”**, and **“Why do we use Spring Boot?”** follow-up question.



Yes — **these “why do we need this when that already exists?” questions are extremely important in Spring Boot interviews.**

The best way to learn them is:

> **Existing thing → limitation → new thing → why it was introduced**

Here are the important ones you should understand.

---

# Spring Boot — “Why do we need this if that already exists?” Questions

## 1. `@Component` vs `@Bean` ⭐⭐⭐

### Question
> If `@Component` and `@Bean` both create Spring beans, why do we need both?

### Simple answer

**`@Component` → Spring creates the object by discovering the class.**

```java
@Component
class PaymentService {
}
```

**`@Bean` → YOU provide the object, Spring manages the returned object.**

```java
@Configuration
class Config {

    @Bean
    PaymentService paymentService() {
        return new PaymentService();
    }
}
```

### Why `@Bean` exists?

What if the class is:

- third-party library
- cannot be modified
- needs special construction/configuration

Example:

```java
@Bean
ObjectMapper objectMapper() {
    ObjectMapper mapper = new ObjectMapper();
    // custom configuration
    return mapper;
}
```

### Remember

> **`@Component` = "Spring, discover this class."**  
> **`@Bean` = "Spring, manage this object that I created."**

---

# 2. `@Component` vs `@Service` vs `@Repository`

### Question

> If `@Service` and `@Repository` are basically components, why do we need them?

Because they give **semantic meaning** and can provide specialized framework behavior.

```java
@Component
class PaymentService
```

vs

```java
@Service
class PaymentService
```

Both become Spring beans.

But:

```text
@Component → generic component
@Service   → business/service layer
@Repository → persistence/data-access layer
```

### Remember

> **`@Service` and `@Repository` are specialized forms of `@Component`.**

Don't say they are completely different bean mechanisms.

---

# 3. `@Controller` vs `@RestController` ⭐⭐⭐

### Question

> If `@RestController` already exists, why do we need `@Controller`?

Because they serve different response styles.

### `@Controller`

Usually used with MVC views:

```text
Request
 ↓
Controller
 ↓
HTML/View
```

### `@RestController`

Usually used for APIs:

```text
Request
 ↓
Controller
 ↓
JSON/XML/Data
```

Technically:

```text
@RestController
=
@Controller
+
@ResponseBody
```

### Remember

> **Controller → commonly View**  
> **RestController → commonly REST response body**

---

# 4. `@Autowired` vs Constructor Injection ⭐⭐⭐

### Question

> If Spring already has `@Autowired`, why do people use constructor injection without it?

Because with a **single constructor**, Spring can automatically use that constructor.

```java
@Service
class PaymentService {

    private final PaymentRepository repository;

    PaymentService(PaymentRepository repository) {
        this.repository = repository;
    }
}
```

No `@Autowired` needed.

### Why constructor injection?

```text
Explicit dependency
+
final field
+
easy unit testing
+
object cannot be created without required dependency
```

### Remember

> **`@Autowired` is the mechanism; constructor injection is the preferred injection style.**

---

# 5. `@Qualifier` vs `@Primary` ⭐⭐⭐

### Question

> If `@Primary` chooses a bean, why do we need `@Qualifier`?

Suppose:

```text
PaymentGateway
 ├── StripeGateway
 └── RazorpayGateway
```

Both are beans.

### `@Primary`

```java
@Primary
class StripeGateway
```

Means:

> "Use me as the default."

### `@Qualifier`

```java
PaymentService(
    @Qualifier("razorpayGateway")
    PaymentGateway gateway
)
```

Means:

> "I specifically want Razorpay."

### Remember

> **`@Primary` = default choice**  
> **`@Qualifier` = exact choice**

---

# 6. `@Value` vs `@ConfigurationProperties` ⭐⭐⭐

### Question

> If `@Value` can read configuration, why do we need `@ConfigurationProperties`?

### `@Value`

Good for one/few properties:

```java
@Value("${app.timeout}")
private int timeout;
```

### `@ConfigurationProperties`

Good for grouped configuration:

```yaml
app:
  timeout: 30
  name: payment-service
  retry-count: 3
```

```java
@ConfigurationProperties(prefix = "app")
class AppProperties {
    int timeout;
    String name;
    int retryCount;
}
```

### Remember

> **`@Value` = individual property**  
> **`@ConfigurationProperties` = configuration group/object**

---

# 7. `application.properties` vs `application.yml`

### Question

> If both store configuration, why do we need both?

They solve the same basic purpose but have different formats.

Properties:

```properties
server.port=8080
app.name=payment
```

YAML:

```yaml
server:
  port: 8080

app:
  name: payment
```

### Why YAML?

Nested/grouped configuration is often easier to read.

### Remember

> **Same purpose, different syntax/format.**

You normally don't need both for the same configuration.

---

# 8. `@ControllerAdvice` vs `@RestControllerAdvice`

### Question

> If `@ControllerAdvice` exists, why was `@RestControllerAdvice` created?

`@ControllerAdvice` is general MVC exception-handling advice.

For REST APIs, you usually want the result written directly to the response body.

```text
@ControllerAdvice
→ MVC/general controller handling

@RestControllerAdvice
→ REST API exception handling
```

Conceptually:

```text
@RestControllerAdvice
=
@ControllerAdvice
+
@ResponseBody
```

---

# 9. `@ExceptionHandler` vs `@ControllerAdvice` ⭐⭐⭐

### Question

> If `@ExceptionHandler` can handle exceptions, why do we need `@ControllerAdvice`?

### `@ExceptionHandler`

Can handle an exception for a particular controller.

```java
@ExceptionHandler(UserNotFoundException.class)
```

### `@ControllerAdvice`

Allows centralized handling across controllers.

```text
Controller A ─┐
Controller B ─┼──→ Global Exception Handler
Controller C ─┘
```

### Remember

> **`@ExceptionHandler` = handling mechanism**  
> **`@ControllerAdvice` = centralized/global location**

---

# 10. `@RequestParam` vs `@PathVariable`

### Question

> Both get values from the URL, so why do we need both?

Because they represent different URL concepts.

```text
/payments/123
```

→ `@PathVariable`

```java
@GetMapping("/payments/{id}")
```

```text
/payments?id=123
```

→ `@RequestParam`

```java
@GetMapping("/payments")
```

### Remember

> **PathVariable = part of resource path**  
> **RequestParam = query/filter/input parameter**

---

# 11. `@RequestBody` vs `@RequestParam`

```text
POST /payments?currency=INR
```

`currency` → `@RequestParam`

JSON:

```json
{
  "amount": 1000
}
```

→ `@RequestBody`

### Remember

> **Query string → RequestParam**  
> **HTTP body → RequestBody**

---

# 12. `@RequestMapping` vs `@GetMapping` / `@PostMapping`

### Question

> If `@RequestMapping` can map requests, why do we need `@GetMapping`?

`@RequestMapping` is general.

```java
@RequestMapping(method = RequestMethod.GET)
```

`@GetMapping` is a convenient specialized form:

```java
@GetMapping
```

Similarly:

```text
@GetMapping
@PostMapping
@PutMapping
@PatchMapping
@DeleteMapping
```

### Remember

> **`@RequestMapping` = generic**  
> **HTTP-specific annotations = shorter/clearer**

---

# 13. `JpaRepository` vs `CrudRepository` ⭐⭐⭐

### Question

> If `CrudRepository` already provides CRUD, why do we need `JpaRepository`?

Because `JpaRepository` provides additional JPA-specific capabilities/conveniences.

Conceptually:

```text
Repository
    ↓
CrudRepository
    ↓
PagingAndSortingRepository
    ↓
JpaRepository
```

So:

```text
CrudRepository
→ basic CRUD

JpaRepository
→ CRUD + JPA-specific features/conveniences
```

### Remember

> Use the abstraction that provides the functionality your application actually needs.

---

# 14. JPA vs Hibernate ⭐⭐⭐

### Question

> If Hibernate does ORM, why do we need JPA?

Because they are not the same thing.

```text
JPA
→ specification/API

Hibernate
→ implementation
```

Think:

```text
JPA = rules/interface

Hibernate = implementation of those rules
```

### Real-world analogy

```text
JDBC API
    ↓
Database Driver

JPA
    ↓
Hibernate
```

---

# 15. JPA vs Spring Data JPA ⭐⭐⭐

### Question

> If JPA already exists, why do we need Spring Data JPA?

JPA gives persistence APIs.

Spring Data JPA reduces boilerplate around repositories and queries.

Without Spring Data JPA, you may write more persistence code.

With:

```java
interface PaymentRepository
        extends JpaRepository<Payment, Long> {
}
```

you immediately get repository operations.

### Remember

```text
JPA
→ persistence specification

Hibernate
→ implementation

Spring Data JPA
→ repository abstraction/convenience
```

This three-way distinction is **very important for interviews**.

---

# 16. `save()` vs `saveAndFlush()`

### Question

> If `save()` saves the entity, why do we need `saveAndFlush()`?

Because:

```text
save()
→ persist/merge through JPA
→ changes may remain in persistence context until flush

saveAndFlush()
→ save
→ explicitly flush persistence context
```

### Important

> **Flush ≠ Commit**

Flushing sends pending SQL to the database; the surrounding transaction can still roll back.

---

# 17. LAZY vs EAGER ⭐⭐⭐

### Question

> If EAGER automatically loads the data, why would we need LAZY?

Because loading everything immediately can cause unnecessary DB work and large object graphs.

### LAZY

```text
Load Payment
   ↓
Don't immediately load related Customer
   ↓
Load when accessed
```

### EAGER

```text
Load Payment
   ↓
Associated data requested as part of entity fetching
```

### Remember

> **LAZY = don't load association until needed**  
> **EAGER = association is requested as part of fetching**

---

# 18. Entity vs DTO ⭐⭐⭐

### Question

> If Entity already contains the data, why do we need DTO?

Because database structure and API structure are different concerns.

```text
Entity
→ Database model

DTO
→ API contract
```

Example Entity might contain:

```text
id
email
passwordHash
createdAt
internalStatus
```

But API may need:

```text
id
email
```

### Remember

> **Entity = persistence concern**  
> **DTO = communication/API concern**

---

# 19. Filter vs Interceptor ⭐⭐⭐

### Question

> Both can intercept requests, why do we need both?

Different layers.

```text
HTTP Request
     ↓
Filter
     ↓
Spring MVC
     ↓
Interceptor
     ↓
Controller
```

### Filter

Servlet-level.

Good for:

- request/response processing
- headers
- logging
- security-related processing

### Interceptor

Spring MVC-level.

Good for:

- controller-related pre/post processing
- request-specific application logic

### Remember

> **Filter = Servlet level**  
> **Interceptor = Spring MVC level**

---

# 20. Filter vs AOP ⭐⭐⭐

### Question

> If AOP can intercept methods, why do we need Filters?

Because they operate at different levels.

```text
HTTP request
 ↓
Filter
 ↓
Controller
 ↓
Service method
 ↓
AOP
```

### Remember

> **Filter → request**  
> **AOP → method**

---

# 21. `@Transactional` vs AOP

### Question

> If `@Transactional` is just an annotation, how does transaction logic actually happen?

Spring uses proxy/interception infrastructure.

Conceptually:

```text
Your code
   ↓
Spring Proxy
   ↓
Start transaction
   ↓
Your method
   ↓
Commit / Rollback
```

### Remember

> **`@Transactional` is declarative; Spring infrastructure performs the transaction management.**

---

# 22. `REQUIRED` vs `REQUIRES_NEW` ⭐⭐⭐

### Question

> If `REQUIRED` can create a transaction, why do we need `REQUIRES_NEW`?

Because sometimes you want a **separate transaction**.

### REQUIRED

```text
Existing transaction?
   ↓
YES → join it
NO  → create one
```

### REQUIRES_NEW

```text
Existing transaction?
   ↓
YES → suspend it
     ↓
   create NEW transaction
```

### Typical use case

You may want audit/logging to commit independently of the main business transaction.

---

# 23. `@Component` vs `@Configuration`

### Question

> `@Configuration` is also a component-like bean, so why separate it?

Because `@Configuration` communicates:

> "This class contains configuration/bean definitions."

Example:

```java
@Configuration
class AppConfig {

    @Bean
    PaymentService paymentService() {
        return new PaymentService();
    }
}
```

### Remember

> **`@Component` = application component**  
> **`@Configuration` = configuration/bean-definition class**

---

# 24. Spring vs Spring Boot ⭐⭐⭐

### Question

> If Spring already exists, why was Spring Boot created?

Spring is powerful but historically required more setup/configuration.

Spring Boot adds:

```text
Auto-configuration
+
Starters
+
Embedded server
+
Externalized configuration
+
Production features
```

### Remember

> **Spring gives the capabilities.**  
> **Spring Boot makes using those capabilities much easier.**

---

# 25. Spring Boot vs Spring MVC

### Question

> If Spring MVC handles web applications, why do we need Spring Boot?

Different levels.

```text
Spring MVC
→ web framework

Spring Boot
→ application setup/configuration platform built around Spring
```

Spring Boot can configure Spring MVC for you.

---

# 26. `@SpringBootApplication` vs `@EnableAutoConfiguration`

### Question

> If `@EnableAutoConfiguration` does auto-configuration, why do we need `@SpringBootApplication`?

Because `@SpringBootApplication` combines common startup annotations:

```text
@SpringBootApplication
        =
@Configuration
+
@EnableAutoConfiguration
+
@ComponentScan
```

### Remember

> `@EnableAutoConfiguration` = one capability  
> `@SpringBootApplication` = convenient combination for a typical Boot application

---

# 27. `@Value` vs Environment

### Question

> If `Environment` can read properties, why use `@Value`?

Both can access configuration.

```java
@Value("${app.name}")
private String name;
```

vs

```java
environment.getProperty("app.name");
```

### Difference

```text
@Value
→ declarative injection

Environment
→ programmatically read properties
```

---

# 28. `@Async` vs normal method

### Question

> If Java threads already exist, why do we need `@Async`?

`@Async` integrates asynchronous execution with Spring's executor infrastructure.

```java
@Async
public void sendEmail() {
}
```

Spring can execute it through a configured executor.

### Remember

> Java provides threads/concurrency primitives; `@Async` provides convenient Spring-managed asynchronous method execution.

---

# 29. `@Scheduled` vs normal loop/thread

### Question

> If we can create a thread and run a loop, why use `@Scheduled`?

Because Spring provides scheduling infrastructure.

```java
@Scheduled(fixedRate = 60000)
public void cleanup() {
}
```

Much cleaner than manually managing:

```text
Thread
while(true)
sleep()
```

### Remember

> **`@Scheduled` = declarative scheduling managed by Spring.**

---

# 30. Cache vs Database ⭐⭐⭐

### Question

> If database already stores the data, why do we need Redis/cache?

Because their purposes are different.

```text
Database
→ source of truth / durable storage

Cache
→ fast temporary/reusable copy
```

Flow:

```text
Request
 ↓
Cache?
 ├── HIT → return
 └── MISS
       ↓
    Database
       ↓
    Cache
```

### Remember

> **DB = store**  
> **Cache = speed**

---

# 31. Authentication vs Authorization

### Question

> If authentication checks the user, why do we need authorization?

Different questions:

```text
Authentication
→ Who are you?

Authorization
→ What are you allowed to do?
```

Example:

```text
Login
 ↓
Authentication

ADMIN endpoint
 ↓
Authorization
```

---

# 32. CORS vs CSRF ⭐⭐⭐

### Question

> Both are security problems involving browsers, so why do we need both?

Different attacks/problems.

```text
CORS
→ controls allowed cross-origin browser requests

CSRF
→ prevents forged authenticated requests
```

### Remember

> **CORS = Who can call from another origin?**  
> **CSRF = Can an attacker trick the browser into making an authenticated request?**

---

# 33. Session vs JWT ⭐⭐⭐

### Question

> If session authentication works, why use JWT?

Different approaches.

### Session

```text
Client
 ↓
Session ID
 ↓
Server-side session
```

### JWT

```text
Client
 ↓
JWT
 ↓
Server validates token
```

JWT can support stateless authentication patterns, while sessions maintain server-side session state.

### Remember

> **Session → server maintains session state**  
> **JWT → authentication information carried in token**

Neither is universally "better"; architecture and requirements decide.

---

# 34. Spring MVC vs WebFlux ⭐⭐⭐

### Question

> If Spring MVC already handles HTTP requests, why do we need WebFlux?

Different programming/execution models.

```text
Spring MVC
→ traditional servlet/blocking model

WebFlux
→ reactive/non-blocking model
```

WebFlux is useful when the application benefits from reactive end-to-end processing and high concurrency with I/O-heavy workloads.

### Important

Don't answer:

> "WebFlux is faster."

Instead:

> "WebFlux provides a reactive non-blocking model, which can be useful for particular high-concurrency I/O workloads."

---

# 35. `RestClient` vs `WebClient`

### Question

> If `RestClient` can call APIs, why do we need `WebClient`?

Different execution models.

```text
RestClient
→ synchronous HTTP calls

WebClient
→ reactive/non-blocking HTTP calls
```

### Remember

> **RestClient = simple synchronous client**  
> **WebClient = reactive client**

---

# 36. `@Mock` vs `@MockBean` / Spring mock replacement

### Question

> If Mockito's `@Mock` exists, why do we need a Spring mock-bean mechanism?

Because they work at different levels.

```text
@Mock
→ Mockito creates mock object

Spring mock-bean mechanism
→ mock is also registered/replaced in Spring ApplicationContext
```

So if your service is created by Spring and needs a mocked repository, the Spring context must know about that mock.

---

# 37. Unit Test vs `@SpringBootTest`

### Question

> If I can test the service using JUnit/Mockito, why do I need `@SpringBootTest`?

Different test purposes.

```text
Unit test
→ test one class
→ dependencies mocked
→ fast

@SpringBootTest
→ test integration with Spring context
→ more realistic
→ slower
```

### Remember

> **Unit test = isolated**  
> **SpringBootTest = integrated Spring environment**

---

# 38. `@WebMvcTest` vs `@SpringBootTest`

### Question

> If `@SpringBootTest` tests everything, why do we need `@WebMvcTest`?

Because loading everything is unnecessary when testing only the controller/web layer.

```text
@WebMvcTest
→ MVC slice

@SpringBootTest
→ broad/full context
```

### Memory

> **Slice test = only what you need.**

---

# 39. `@Cacheable` vs `@CachePut`

### Question

> If both put data into cache, why do we need both?

Important difference:

```text
@Cacheable
→ check cache first
→ method may NOT execute on cache hit

@CachePut
→ method ALWAYS executes
→ result updates cache
```

### Remember

> **Cacheable = use cache**  
> **CachePut = execute + update cache**

---

# 40. The Pattern You Should Use in Interviews

Whenever interviewer asks:

> **"Why do we need X when Y already exists?"**

Think:

```text
1. What does Y do?
        ↓
2. What limitation does Y have?
        ↓
3. What does X add/change?
        ↓
4. When would I choose X?
```

Example:

### `@Component` vs `@Bean`

```text
@Component
→ Spring discovers class

Problem:
→ Can't use it easily for third-party classes/custom construction

@Bean
→ I explicitly create/configure object
→ Spring manages it
```

That is the **real understanding**, instead of memorizing annotations separately.

### Highest-priority pairs to practice

```text
@Component       vs @Bean
@Component       vs @Service/@Repository
@Controller      vs @RestController
@Autowired       vs Constructor Injection
@Primary         vs @Qualifier
@Value           vs @ConfigurationProperties
@ExceptionHandler vs @ControllerAdvice
@RequestParam    vs @PathVariable
JPA              vs Hibernate
JPA              vs Spring Data JPA
CrudRepository   vs JpaRepository
LAZY             vs EAGER
Entity           vs DTO
Filter           vs Interceptor
Filter           vs AOP
REQUIRED         vs REQUIRES_NEW
Spring           vs Spring Boot
Spring MVC       vs Spring Boot
MVC              vs WebFlux
RestClient       vs WebClient
Session          vs JWT
CORS             vs CSRF
Unit Test        vs SpringBootTest
WebMvcTest       vs SpringBootTest
@Cacheable       vs @CachePut
Cache            vs Database
Authentication   vs Authorization
```

These are exactly the kind of **“but if this already does it, why was the other one created?”** questions that test whether you understand Spring Boot rather than just memorizing annotations.