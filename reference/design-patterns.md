# REST API, Redis, AWS & Software Design Patterns

Interview Cheat Sheet — Beginner to Intermediate

This guide focuses on the concepts, terminology, rules, differences, defaults, and common interview questions you need for Java Backend / Spring Boot / Microservices interviews.

The examples use one common scenario throughout: a customer makes a payment using UPI, a card, or a wallet. You can reuse this scenario to explain many backend concepts and design patterns.

# PART 4: JAVA DESIGN PATTERNS

## 1. Design Pattern Basics

### Subtopics

- Design pattern: A reusable solution to a recurring software design problem.
- Creational patterns: Help control how objects are created.
- Structural patterns: Help organize classes and objects.
- Behavioral patterns: Help organize communication and responsibilities.
- SOLID: Five design principles that encourage maintainable, flexible object-oriented code.
- Loose coupling: Classes depend less on the concrete details of other classes.
- High cohesion: A class focuses on closely related responsibilities.
- Composition: Building behavior by combining objects.
- Inheritance: Deriving one class from another.
- Dependency Injection (DI): Providing an object's dependencies from outside rather than creating them internally.
- Programming to an interface: Depending on a contract instead of a specific implementation.
- Overengineering: Adding complexity or abstractions that the problem does not justify.

### One payment example to reuse

Imagine a payment system supporting UPI, cards, and wallets.

```
PaymentController
       |
       v
   PaymentService
       |
       v
 PaymentStrategy
    /    |    \
   UPI  Card  Wallet
```

When explaining a design pattern, cover four points:

1. What problem exists?
2. What is the pattern's idea?
3. How does the payment example use it?
4. Where is it useful in real applications?

Important: Patterns are tools, not mandatory rules. Use them when they solve a real design problem.

## 2. Strategy Pattern

Very common

### Subtopics

- Strategy: Defines a family of interchangeable algorithms behind a common interface.
- Problem solved: Avoids large `if-else` or `switch` blocks for alternative behaviors.
- Where used: Payment methods, discount calculations, pricing rules, authentication mechanisms, and shipping calculations.
- Main benefit: New behavior can be added without rewriting the code that selects or uses the abstraction.
- Trade-off: Adds interfaces and classes, which may be unnecessary when there are only a few simple, stable cases.

### Example

```
interface PaymentStrategy {
    void pay(double amount);
}

class UpiPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid using UPI: " + amount);
    }
}

class CardPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid using card: " + amount);
    }
}

class PaymentService {
    private final PaymentStrategy strategy;

    PaymentService(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    void pay(double amount) {
        strategy.pay(amount);
    }
}
```

Usage:

```
PaymentService service =
        new PaymentService(new UpiPayment());

service.pay(500);
```

Interview answer: Strategy allows us to change payment behavior by injecting a different implementation, instead of modifying one large conditional block.

## 3. Factory Pattern

Very common

### Subtopics

- Factory: Centralizes the creation or selection of objects.
- Problem solved: Keeps object-creation decisions out of business logic.
- Where used: Payment provider selection, notification clients, parser creation, and framework-managed object creation.
- Simple Factory: A common implementation technique that selects and returns an object; it is not one of the original GoF 23 patterns by that exact name.
- Factory Method: Lets subclasses or overriding factory methods determine which product implementation is created.
- Abstract Factory: Creates families of related objects without specifying their concrete classes.
- Trade-off: Factories can become large conditional blocks if they are not designed to grow cleanly.

### Example

```
interface PaymentStrategy {
    void pay(double amount);
}

class UpiPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("UPI: " + amount);
    }
}

class CardPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Card: " + amount);
    }
}

class PaymentFactory {
    static PaymentStrategy create(String method) {
        return switch (method) {
            case "UPI" -> new UpiPayment();
            case "CARD" -> new CardPayment();
            default -> throw new IllegalArgumentException(
                    "Unsupported method");
        };
    }
}
```

Usage:

```
PaymentStrategy payment =
        PaymentFactory.create("UPI");

payment.pay(500);
```

Factory vs Strategy:

- Factory decides which object to create.
- Strategy defines interchangeable behavior.
- They can work together: the factory selects a strategy, and the service executes it.

Spring Boot connection: Spring dependency injection and configuration can often replace manual factories. A factory remains useful when selection depends on runtime input or more complex creation rules.

## 4. Builder Pattern

### Subtopics

- Builder: Creates an object step by step, especially when it has many optional fields.
- Problem solved: Avoids constructors with many confusing parameters.
- Where used: Request objects, configuration objects, complex domain objects, and immutable DTOs.
- Trade-off: Adds code and is often unnecessary for simple objects.

### Example

```
PaymentRequest request = PaymentRequest.builder()
        .amount(500)
        .currency("INR")
        .method("UPI")
        .build();
```

This assumes `PaymentRequest` has a builder, perhaps generated by Lombok or implemented manually.

Interview answer: Builder improves readability and object construction when many fields are optional. It does not automatically validate the object or make it immutable.

## 5. Singleton Pattern

### Subtopics

- Singleton: Ensures a class has one shared instance within a defined scope.
- Problem solved: Provides shared access to a single instance when that is actually required.
- Where used: Certain configuration holders, shared registries, and some resource managers.
- Thread safety: Multiple threads must not accidentally create multiple instances.
- Trade-off: Global shared state makes testing and concurrency harder if overused.
- Spring singleton scope: A Spring bean is singleton-scoped by default within its application context, not globally unique across every JVM or every server.

### Example

```
@Component
public class PaymentService {
    // One instance per Spring ApplicationContext
}
```

Spring usually manages the instance, so manually implementing the classic Singleton pattern is unnecessary for ordinary Spring services.

Interview trap: Singleton does not mean one instance across an entire distributed application. Each application instance can have its own singleton bean.

## 6. Adapter Pattern

### Subtopics

- Adapter: Makes one interface compatible with another expected interface.
- Problem solved: Integrates a component without forcing the existing code to depend on its incompatible API.
- Where used: Third-party payment gateways, legacy systems, external SDKs, and incompatible service interfaces.
- Trade-off: Adds a translation layer that must be maintained.

### Example

Your payment application expects:

```
interface PaymentGateway {
    void charge(double amount);
}
```

But an external provider exposes:

```
class ExternalUpiSdk {
    void makePaymentInPaise(int paise) {
        System.out.println("Paid: " + paise);
    }
}
```

An adapter bridges the two:

```
class UpiAdapter implements PaymentGateway {
    private final ExternalUpiSdk sdk;

    UpiAdapter(ExternalUpiSdk sdk) {
        this.sdk = sdk;
    }

    public void charge(double amount) {
        int paise = (int) Math.round(amount * 100);
        sdk.makePaymentInPaise(paise);
    }
}
```

The conversion is simplified; production money calculations should use `BigDecimal` or integer minor units with explicit currency handling.

Interview answer: Adapter lets the application use an external provider through its own stable interface without spreading provider-specific APIs throughout the codebase.

## 7. Decorator Pattern

### Subtopics

- Decorator: Adds behavior to an object by wrapping it, without changing its underlying class.
- Problem solved: Adds optional behavior without creating many subclasses.
- Where used: Logging, metrics, caching, compression, and stream processing.
- Trade-off: Multiple wrappers can make execution flow harder to follow.
- Difference from inheritance: Decorator adds behavior by composition and wrapping; inheritance extends a class hierarchy.

### Example

```
interface Payment {
    void pay(double amount);
}

class BasicPayment implements Payment {
    public void pay(double amount) {
        System.out.println("Payment processed: " + amount);
    }
}

class LoggingPayment implements Payment {
    private final Payment payment;

    LoggingPayment(Payment payment) {
        this.payment = payment;
    }

    public void pay(double amount) {
        System.out.println("Payment started");
        payment.pay(amount);
    }
}
```

Usage:

```
Payment payment =
        new LoggingPayment(new BasicPayment());

payment.pay(500);
```

Where you may see the idea: Java I/O streams wrap other streams. Spring features such as transaction and method-interception proxies are related to wrapping or interception, although they are not necessarily implementations of the Decorator pattern.

## 8. Proxy Pattern

### Subtopics

- Proxy: Provides an intermediary object that controls access to another object.
- Problem solved: Adds access control, lazy initialization, remote access, or interception without changing the caller's interface.
- Where used: Spring AOP, transaction management, security interception, lazy loading, and remote proxies.
- Trade-off: Hidden behavior can make debugging and execution flow harder to understand.
- Decorator vs Proxy: Decorator primarily adds responsibilities; Proxy primarily controls access, although their structures can look similar.

### Example

```
interface Payment {
    void pay(double amount);
}

class RealPayment implements Payment {
    public void pay(double amount) {
        System.out.println("Processing payment");
    }
}

class PaymentProxy implements Payment {
    private final Payment target;

    PaymentProxy(Payment target) {
        this.target = target;
    }

    public void pay(double amount) {
        System.out.println("Checking authorization");
        target.pay(amount);
    }
}
```

Spring Boot connection: `@Transactional` commonly works through Spring's proxy-based AOP infrastructure. Calls that bypass the proxy—for example, certain self-invocations—may not receive the expected transactional interception.

## 9. Observer Pattern

### Subtopics

- Observer: Notifies multiple interested components when an event or state change occurs.
- Problem solved: Reduces direct coupling between the publisher and subscribers.
- Where used: Event listeners, UI events, domain events, and notification systems.
- Publisher: Produces the event.
- Subscriber / Observer: Receives and reacts to the event.
- Trade-off: Delivery order, errors, duplicate events, and subscriber lifecycle must be handled appropriately.

### Example

```
interface PaymentObserver {
    void onPaymentSuccess(String paymentId);
}

class ReceiptService implements PaymentObserver {
    public void onPaymentSuccess(String paymentId) {
        System.out.println("Generate receipt: " + paymentId);
    }
}

class PaymentPublisher {
    private final List<PaymentObserver> observers =
            new ArrayList<>();

    void subscribe(PaymentObserver observer) {
        observers.add(observer);
    }

    void paymentSucceeded(String id) {
        for (PaymentObserver observer : observers) {
            observer.onPaymentSuccess(id);
        }
    }
}
```

After a payment succeeds, receipt generation can react to the event.

Important: This example is in-process. For reliable communication between independent microservices, a message broker or durable event mechanism may be more appropriate.

## 10. Command Pattern

### Subtopics

- Command: Represents an action as an object.
- Problem solved: Separates the request to perform an action from the code that performs it.
- Where used: Job queues, undo/redo systems, scheduled jobs, task execution, and command dispatch.
- Invoker: Triggers the command.
- Receiver: Performs the actual work.
- Trade-off: One class per command can add overhead for trivial operations.

### Example

```
interface PaymentCommand {
    void execute();
}

class RefundCommand implements PaymentCommand {
    private final RefundService service;
    private final String paymentId;

    RefundCommand(RefundService service, String paymentId) {
        this.service = service;
        this.paymentId = paymentId;
    }

    public void execute() {
        service.refund(paymentId);
    }
}
```

A job processor can execute the command without needing to know the refund implementation.

Command vs Strategy:

- Strategy chooses among interchangeable ways to perform behavior.
- Command represents a requested action that can be dispatched, queued, logged, or potentially retried.

## 11. Template Method Pattern

### Subtopics

- Template Method: Defines the overall algorithm in a base class while allowing subclasses to customize specific steps.
- Problem solved: Avoids repeating the same algorithm structure across similar implementations.
- Where used: Framework lifecycle methods, batch-processing flows, and workflows with stable steps.
- Trade-off: Inheritance can create tight coupling and rigid class hierarchies.

### Example

```
abstract class PaymentProcessor {

    public final void process(double amount) {
        validate(amount);
        executePayment(amount);
        recordResult();
    }

    protected abstract void executePayment(double amount);

    protected void validate(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException();
        }
    }

    protected void recordResult() {
        System.out.println("Result recorded");
    }
}
```

Different subclasses implement `executePayment`, while the overall flow remains consistent.

Template Method vs Strategy: Template Method customizes steps through inheritance; Strategy delegates behavior to a replaceable object using composition.

## 12. Chain of Responsibility

### Subtopics

- Chain of Responsibility: Passes a request through a sequence of handlers.
- Problem solved: Keeps a series of checks or processing steps from becoming one huge conditional block.
- Where used: Servlet filters, Spring Security filter chains, validation pipelines, and middleware.
- Handler: A component that checks or processes the request and may pass it onward.
- Trade-off: A request can be rejected or mishandled if chain order and termination behavior are unclear.

### Example

```
Payment Request
      ↓
Authentication Check
      ↓
Permission Check
      ↓
Amount Validation
      ↓
Fraud Check
      ↓
Payment Processing
```

Each step handles one responsibility. A failed check can stop the request; a successful check can allow it to continue.

Spring Boot connection: Servlet filters and Spring Security use chains of processing components, making this pattern a useful interview analogy.

## 13. State Pattern

### Subtopics

- State: Changes an object's behavior according to its current state.
- Problem solved: Avoids complex state-dependent conditionals spread across many methods.
- Where used: Payment lifecycles, order processing, workflow engines, and connection management.
- State transition: A permitted move from one state to another.
- Trade-off: Separate state classes may be excessive for a very small, stable state machine.

### Example

A payment may have these states:

```
CREATED → PENDING → SUCCESS
                   ↘ FAILED
SUCCESS → REFUND_PENDING → REFUNDED
```

The application should reject invalid transitions, such as refunding a payment that never succeeded.

Important: A Java enum representing `PENDING`, `SUCCESS`, and `FAILED` is not by itself the State design pattern. The pattern involves state-dependent behavior being organized behind state objects or a similar delegation structure.

## 14. Repository Pattern

### Subtopics

- Repository: Provides a domain-oriented abstraction for retrieving and storing data.
- Problem solved: Keeps persistence details out of business logic.
- Where used: Spring Data JPA repositories, domain-oriented persistence layers, and database access abstractions.
- Trade-off: An unnecessary generic repository layer can duplicate the abstractions already provided by a framework.

### Example

```
public interface PaymentRepository
        extends JpaRepository<PaymentEntity, Long> {
}
```

A service uses `PaymentRepository` instead of putting SQL or entity-manager code directly in the controller.

Interview trap: Repository is widely used in application architecture, but it is not one of the original GoF 23 design patterns.

## 15. Dependency Injection Pattern / Principle

### Subtopics

- Dependency Injection: Supplies an object's required dependencies from outside.
- Constructor injection: Dependencies are provided through the constructor.
- Setter injection: Dependencies are provided through setters.
- Field injection: Dependencies are assigned directly to fields, commonly using framework reflection.
- IoC (Inversion of Control): The framework or container controls object creation and lifecycle instead of application code controlling everything itself.
- Benefit: Easier testing, clearer dependencies, and looser coupling.
- Preferred Spring approach: Constructor injection for required dependencies.
- Trade-off: Excessive dependencies may indicate that a class has too many responsibilities.

### Example

```
@Service
public class PaymentService {

    private final PaymentRepository repository;

    public PaymentService(PaymentRepository repository) {
        this.repository = repository;
    }
}
```

Spring supplies the repository dependency.

Interview answer: Dependency Injection allows us to replace real dependencies with mocks during tests and avoids tightly coupling a class to manually created implementations.

## 16. SOLID Principles

### Subtopics

- S — Single Responsibility Principle: A class should have one coherent responsibility and one main reason to change.
- O — Open/Closed Principle: Software components should be open to extension and closed to unnecessary modification.
- L — Liskov Substitution Principle: A subtype should be usable wherever its base type is expected without breaking the contract.
- I — Interface Segregation Principle: Prefer small, focused interfaces over large interfaces that force clients to depend on unused methods.
- D — Dependency Inversion Principle: High-level business logic should depend on abstractions rather than concrete low-level details.

### Payment examples

| Principle | Example                                                                     |
| --------- | --------------------------------------------------------------------------- |
| SRP       | Separate payment processing from receipt generation                         |
| OCP       | Add a new payment strategy without rewriting the payment service            |
| LSP       | Every `PaymentStrategy` implementation must honor the payment contract      |
| ISP       | Split a huge gateway interface into smaller, relevant capabilities          |
| DIP       | `PaymentService` depends on `PaymentStrategy`, not directly on `UpiPayment` |

Remember: Dependency Inversion is a design principle; Dependency Injection is one technique for implementing it. They are related but not the same.

## 17. Other Patterns Worth Recognizing

### Subtopics

- Facade: Provides a simpler interface over a complex subsystem. Example: a `PaymentFacade` coordinates validation, charging, and receipt handling.
- Flyweight: Shares reusable state to reduce memory usage. Example: sharing immutable currency metadata across many payment objects.
- Prototype: Creates objects by copying an existing instance. Example: cloning a reusable configuration template.
- Mediator: Centralizes communication among multiple components. Example: a workflow coordinator that prevents many services from directly calling one another.
- Memento: Captures state for restoration. Example: restoring a draft payment form to a previous state.
- Visitor: Adds operations over a set of object types without putting every operation into those classes. Useful in some object-model traversal and processing scenarios.
- Bridge: Separates two dimensions of variation so each can evolve independently. Example: separating payment processing logic from provider implementations.
- Interpreter: Represents and evaluates a small language or set of expressions. Example: evaluating configurable business rules.
- Abstract Factory: Creates families of related objects. Example: constructing a matching set of provider-specific payment and refund clients.
- Iterator: Traverses a collection without exposing its internal representation. Java's `Iterator` is a familiar example.
- Memento vs Command: Memento stores state to restore; Command represents an action to execute.

## 18. Design Pattern Confusions — Quick Revision

| Confusing pair              | Correct difference                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Factory vs Strategy         | Factory creates/selects objects; Strategy supplies interchangeable behavior                                                           |
| Strategy vs State           | Strategy chooses an algorithm; State changes behavior based on an object's current state                                              |
| Adapter vs Decorator        | Adapter changes the interface; Decorator adds behavior while keeping the interface                                                    |
| Decorator vs Proxy          | Decorator primarily adds responsibilities; Proxy primarily controls access                                                            |
| Proxy vs Facade             | Proxy represents an intermediary for an object; Facade simplifies access to a subsystem                                               |
| Template Method vs Strategy | Inheritance-based customization vs composition-based delegation                                                                       |
| Observer vs Pub/Sub         | Observer often uses direct in-process subscriptions; Pub/Sub often decouples publishers and subscribers through a messaging mechanism |
| Command vs Strategy         | Represents an action vs provides an interchangeable algorithm                                                                         |
| Inheritance vs Composition  | An `is-a` relationship vs a `has-a` relationship                                                                                      |
| Interface vs Abstract Class | Interface defines a contract; abstract class can also share state and implementation                                                  |
| DI vs Factory               | DI supplies dependencies; Factory decides how to create or select objects                                                             |
| Singleton vs Static         | Singleton is an instance with a controlled lifecycle; static members belong to the class                                              |
| Repository vs DAO           | Both abstract persistence; Repository is often domain-oriented, while DAO often focuses on data-access operations                     |
| Pattern vs Principle        | A pattern is a reusable design solution; a principle is a general guideline for good design                                           |

## 19. How to Choose a Pattern in an Interview

### Subtopics

- Many payment methods with different algorithms: Strategy.
- Need to choose and instantiate the correct payment implementation: Factory.
- Object has many optional configuration fields: Builder.
- Third-party provider has a different interface: Adapter.
- Add logging, metrics, or optional behavior around an object: Decorator.
- Intercept access, authorization, or method calls: Proxy.
- Notify multiple consumers after payment success: Observer or event-driven Pub/Sub.
- Represent a refund request as a queued task: Command.
- Keep the same processing sequence but customize a step: Template Method.
- Run authentication, validation, and fraud checks in order: Chain of Responsibility.
- Enforce behavior according to payment lifecycle state: State.
- Keep database access out of business logic: Repository.
- Share required dependencies cleanly: Dependency Injection.

### Example: Explain the Strategy pattern in 20 seconds

> Suppose a payment service supports UPI, card, and wallet payments. If we use a large `if-else` block, every new payment method requires changing that block. With Strategy, all payment methods implement a common interface, and the service uses the selected implementation. This improves extensibility, testability, and loose coupling.
