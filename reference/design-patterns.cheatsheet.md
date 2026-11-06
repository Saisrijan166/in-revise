# Foundations

All examples use one scenario: a customer pays with UPI, a card, or a wallet.

## What a design pattern is ⭐

A design pattern is a reusable solution to a recurring software design problem. It is a tool, not a rule — use one only when it solves a real problem.

Three families:

- **Creational** — control how objects are created (Singleton, Factory Method, Abstract Factory, Builder, Prototype).
- **Structural** — organize classes and objects (Adapter, Decorator, Facade, Proxy, Composite, Bridge, Flyweight).
- **Behavioral** — organize communication and responsibilities (Strategy, Observer, Command, Template Method, State, Chain of Responsibility, Iterator, Mediator).

When explaining any pattern, cover four points: the problem, the idea, how the payment example uses it, and where it fits in real apps.

> Remember: Patterns are tools that solve design problems, not boxes to tick.

## SOLID principles ⭐⭐

Five principles for maintainable object-oriented code.

| Principle | Meaning | Payment example |
|---|---|---|
| **S** — Single Responsibility | One coherent responsibility, one reason to change | Payment processing separate from receipt generation |
| **O** — Open/Closed | Open to extension, closed to modification | Add a new payment strategy without rewriting the service |
| **L** — Liskov Substitution | A subtype works wherever its base type is expected | Every `PaymentStrategy` honours the payment contract |
| **I** — Interface Segregation | Small focused interfaces over large ones | Split a huge gateway interface into smaller capabilities |
| **D** — Dependency Inversion | High-level logic depends on abstractions, not details | `PaymentService` depends on `PaymentStrategy`, not `UpiPayment` |

> Remember: Dependency Inversion (a principle) is not Dependency Injection (one technique to achieve it).

## Composition, coupling, and cohesion ⭐

- **Composition** — build behaviour by combining objects (`has-a`). **Inheritance** — derive one class from another (`is-a`). Prefer composition: it is more flexible and avoids rigid hierarchies.
- **Loose coupling** — classes depend less on each other's concrete details. **High cohesion** — a class focuses on closely related work.
- **Programming to an interface** — depend on a contract, not a specific implementation.
- **Overengineering** — adding abstractions the problem does not justify. Avoid it.

> Remember: Composition over inheritance; program to interfaces; don't abstract what isn't varying.

# Creational Patterns

## Singleton

**Problem:** sometimes you genuinely need one shared instance (a config holder, a registry, a resource manager).
**Idea:** ensure a class has one instance within a defined scope.

```java
@Component
public class PaymentService {
    // One instance per Spring ApplicationContext
}
```

Spring beans are singleton-scoped by default, so you rarely implement the classic pattern yourself. Thread safety matters only if you build it manually. Overuse creates global shared state that hurts testing and concurrency.

> Remember: "Singleton" means one per context, not one across a whole distributed system — each app instance has its own.

## Factory (Factory Method & Abstract Factory) ⭐⭐

**Problem:** object-creation decisions clutter business logic.
**Idea:** centralize the creation or selection of objects.

```java
class PaymentFactory {
    static PaymentStrategy create(String method) {
        return switch (method) {
            case "UPI"  -> new UpiPayment();
            case "CARD" -> new CardPayment();
            default -> throw new IllegalArgumentException("Unsupported method");
        };
    }
}
// PaymentStrategy p = PaymentFactory.create("UPI");
```

- **Simple Factory** — a method that selects and returns an object (common, but not a named GoF pattern).
- **Factory Method** — subclasses or overriding methods decide which product is created.
- **Abstract Factory** — creates families of related objects (e.g. matching provider-specific payment and refund clients).

Spring DI often replaces manual factories; a factory still helps when selection depends on runtime input. Watch out: factories can grow into big conditionals.

> Remember: Factory decides *which object* to create and hides the `new` from business logic.

## Builder

**Problem:** constructors with many optional parameters are confusing.
**Idea:** build an object step by step.

```java
PaymentRequest request = PaymentRequest.builder()
        .amount(500)
        .currency("INR")
        .method("UPI")
        .build();
```

Good for request/config objects, complex domain objects, immutable DTOs (often via Lombok). Overkill for simple objects. It improves readability but does not by itself validate the object or make it immutable.

> Remember: Builder = readable construction when there are many optional fields.

## Prototype

**Problem:** creating a fresh object from scratch is costly or repetitive.
**Idea:** create new objects by copying an existing instance (e.g. cloning a reusable configuration template).

> Remember: Prototype clones an existing object instead of building a new one.

# Structural Patterns

## Adapter ⭐

**Problem:** an external component has an interface your code does not expect.
**Idea:** translate one interface into the one your code wants, so provider-specific APIs don't spread through the codebase.

```java
class UpiAdapter implements PaymentGateway {        // what your app expects
    private final ExternalUpiSdk sdk;               // what the provider offers
    UpiAdapter(ExternalUpiSdk sdk) { this.sdk = sdk; }

    public void charge(double amount) {
        int paise = (int) Math.round(amount * 100);
        sdk.makePaymentInPaise(paise);
    }
}
```

Used for third-party gateways, legacy systems, external SDKs. (Real money conversions should use `BigDecimal` or integer minor units.)

> Remember: Adapter *changes the interface* so an incompatible component fits.

## Decorator ⭐

**Problem:** you want optional extra behaviour without a subclass explosion.
**Idea:** wrap an object to add behaviour while keeping the same interface.

```java
class LoggingPayment implements Payment {
    private final Payment payment;
    LoggingPayment(Payment payment) { this.payment = payment; }

    public void pay(double amount) {
        System.out.println("Payment started");
        payment.pay(amount);
    }
}
// Payment p = new LoggingPayment(new BasicPayment());
```

Used for logging, metrics, caching, compression, stream processing. Java I/O streams wrap other streams. Many wrappers can make the flow hard to follow.

> Remember: Decorator adds behaviour by composition, keeping the same interface.

## Facade

**Problem:** a subsystem is complex to call directly.
**Idea:** provide one simpler interface over it. Example: a `PaymentFacade` coordinates validation, charging, and receipt handling behind a single call.

> Remember: Facade simplifies access to a whole subsystem.

## Proxy ⭐

**Problem:** you need access control, lazy loading, remote access, or interception — without changing the caller.
**Idea:** put an intermediary in front of the real object, same interface.

```java
class PaymentProxy implements Payment {
    private final Payment target;
    PaymentProxy(Payment target) { this.target = target; }

    public void pay(double amount) {
        System.out.println("Checking authorization");
        target.pay(amount);
    }
}
```

Spring AOP and `@Transactional` work through proxy-based interception. Trap: self-invocation can bypass the proxy, so `@Transactional` may not apply. Hidden behaviour can make debugging harder.

> Remember: Proxy *controls access* to an object; Decorator *adds responsibilities*.

## Composite

**Idea:** treat a single object and a group of objects the same way through one interface (a tree of parts and wholes).

> Remember: Composite lets clients treat one item and a group of items uniformly.

## Bridge

**Problem:** two dimensions vary independently and multiplying them into subclasses explodes.
**Idea:** separate the two dimensions so each evolves on its own — e.g. separate payment-processing logic from provider implementations.

> Remember: Bridge splits an abstraction from its implementation so both vary freely.

## Flyweight

**Idea:** share reusable immutable state to save memory — e.g. share currency metadata across many payment objects.

> Remember: Flyweight shares common state across many objects.

# Behavioral Patterns

## Strategy ⭐⭐⭐

**Problem:** a growing `if-else`/`switch` picks between alternative behaviours.
**Idea:** define a family of interchangeable algorithms behind one interface and inject the chosen one.

```java
interface PaymentStrategy { void pay(double amount); }

class UpiPayment implements PaymentStrategy {
    public void pay(double amount) { System.out.println("UPI: " + amount); }
}

class PaymentService {
    private final PaymentStrategy strategy;
    PaymentService(PaymentStrategy strategy) { this.strategy = strategy; }
    void pay(double amount) { strategy.pay(amount); }
}
// new PaymentService(new UpiPayment()).pay(500);
```

Used for payment methods, discounts, pricing, auth, shipping. New behaviour needs no change to the selecting code. Overkill when cases are few and stable.

> Remember: Strategy swaps interchangeable behaviour by injecting a different implementation.

## Observer ⭐

**Problem:** many components must react when something happens, without tight coupling.
**Idea:** a publisher notifies subscribed observers on an event.

```java
class PaymentPublisher {
    private final List<PaymentObserver> observers = new ArrayList<>();
    void subscribe(PaymentObserver o) { observers.add(o); }
    void paymentSucceeded(String id) {
        for (PaymentObserver o : observers) o.onPaymentSuccess(id);
    }
}
```

After a payment succeeds, a `ReceiptService` observer can generate a receipt. This is in-process; across microservices use a message broker instead. Handle delivery order, errors, duplicates, and subscriber lifecycle.

> Remember: Observer decouples the publisher from the subscribers that react to its events.

## Command

**Problem:** you want to separate *requesting* an action from *performing* it.
**Idea:** wrap an action as an object that can be queued, logged, or retried.

```java
class RefundCommand implements PaymentCommand {
    private final RefundService service;
    private final String paymentId;
    RefundCommand(RefundService s, String id) { this.service = s; this.paymentId = id; }
    public void execute() { service.refund(paymentId); }
}
```

An **invoker** triggers it; a **receiver** does the work. Used for job queues, undo/redo, scheduled tasks. One class per command adds overhead for trivial actions.

> Remember: Command turns a request into an object you can dispatch, queue, or retry.

## Template Method

**Problem:** several implementations repeat the same algorithm structure.
**Idea:** fix the overall algorithm in a base class; let subclasses override specific steps.

```java
abstract class PaymentProcessor {
    public final void process(double amount) {
        validate(amount);
        executePayment(amount);
        recordResult();
    }
    protected abstract void executePayment(double amount);
    protected void validate(double amount) {
        if (amount <= 0) throw new IllegalArgumentException();
    }
    protected void recordResult() { System.out.println("Result recorded"); }
}
```

Used for framework lifecycles, batch flows, fixed-step workflows. Inheritance can create tight coupling.

> Remember: Template Method keeps the flow fixed and lets subclasses fill in steps (via inheritance).

## State

**Problem:** behaviour depends on current state, scattering state checks across methods.
**Idea:** organize state-dependent behaviour behind state objects, and reject invalid transitions.

```text
CREATED -> PENDING -> SUCCESS
                   -> FAILED
SUCCESS -> REFUND_PENDING -> REFUNDED
```

The app should reject invalid transitions, such as refunding a payment that never succeeded. Separate state classes can be excessive for a tiny state machine.

> Remember: A plain enum of states is not the State pattern — the pattern puts state-dependent *behaviour* behind state objects.

## Chain of Responsibility

**Problem:** a series of checks becomes one huge conditional.
**Idea:** pass a request through a sequence of handlers; each handles one responsibility and may stop or forward it.

```text
Payment Request -> Authentication -> Permission -> Amount Validation -> Fraud Check -> Processing
```

Mirrors servlet filters and Spring Security filter chains. Unclear order or termination can mishandle a request.

> Remember: Chain of Responsibility runs ordered handlers, each doing one check and passing along.

## Iterator

**Idea:** traverse a collection without exposing its internal structure. Java's `Iterator` is the familiar example.

> Remember: Iterator walks a collection without revealing how it's stored.

## Mediator

**Idea:** centralize communication among components so they don't call each other directly — e.g. a workflow coordinator. (Memento, by contrast, captures state so it can be restored, like restoring a draft payment form.)

> Remember: Mediator routes communication through one coordinator instead of many direct links.

# Patterns You'll Also Hear in Interviews

- **Dependency Injection** — supply a class's dependencies from outside. Styles: **constructor** (preferred in Spring for required deps), **setter**, **field** (reflection-based). Backed by **IoC**: the container controls object creation and lifecycle. Benefit: easy mocking in tests, clear dependencies, loose coupling.

```java
@Service
public class PaymentService {
    private final PaymentRepository repository;
    public PaymentService(PaymentRepository repository) { this.repository = repository; }
}
```

- **Repository** — a domain-oriented abstraction over persistence, keeping SQL out of business logic (e.g. `PaymentRepository extends JpaRepository<PaymentEntity, Long>`). Widely used, but *not* one of the original GoF 23 patterns.
- **Visitor** — add operations across a set of object types without changing those types.
- **Interpreter** — represent and evaluate a small language or set of rules.
- **Memento** — capture state for later restoration.

> Remember: DI and Repository dominate Spring interviews; both are more about principle/architecture than classic GoF structure.

# How to Choose a Pattern

| Situation | Pattern |
|---|---|
| Many payment methods with different algorithms | Strategy |
| Choose and instantiate the right implementation | Factory |
| Object has many optional fields | Builder |
| Third-party provider has a different interface | Adapter |
| Add logging/metrics/optional behaviour around an object | Decorator |
| Intercept access, authorization, or method calls | Proxy |
| Notify multiple consumers after a payment | Observer / Pub-Sub |
| Represent a refund as a queued task | Command |
| Same sequence, but customize one step | Template Method |
| Run auth, validation, fraud checks in order | Chain of Responsibility |
| Enforce behaviour by lifecycle state | State |
| Keep database access out of business logic | Repository |
| Share dependencies cleanly | Dependency Injection |

20-second Strategy answer: "A payment service supports UPI, card, and wallet. A big if-else means every new method edits that block. With Strategy, each method implements a common interface and the service uses the selected one — better extensibility, testability, and loose coupling."

> Remember: Name the problem first, then the pattern — interviewers want the "why", not the label.

# Why X vs Y (Common Confusions) ⭐⭐

| Pair | Difference |
|---|---|
| Factory vs Strategy | Factory creates/selects objects; Strategy supplies interchangeable behaviour (they combine: factory picks a strategy) |
| Strategy vs State | Strategy chooses an algorithm; State changes behaviour based on current state |
| Adapter vs Decorator | Adapter changes the interface; Decorator adds behaviour, keeping the interface |
| Decorator vs Proxy | Decorator adds responsibilities; Proxy controls access |
| Proxy vs Facade | Proxy is an intermediary for one object; Facade simplifies a whole subsystem |
| Adapter vs Facade | Adapter fits one incompatible interface; Facade hides a complex subsystem behind a simple one |
| Template Method vs Strategy | Inheritance-based step customization vs composition-based delegation |
| Command vs Strategy | Represents an action to dispatch vs an interchangeable algorithm |
| Observer vs Pub/Sub | Observer = direct in-process subscriptions; Pub/Sub = decoupled via a messaging mechanism |
| Inheritance vs Composition | `is-a` vs `has-a` |
| Interface vs Abstract Class | Interface = contract only; abstract class can also share state and implementation |
| DI vs Factory | DI supplies dependencies; Factory decides how to create/select objects |
| Singleton vs Static | Singleton = instance with a controlled lifecycle; static members belong to the class |
| Repository vs DAO | Both abstract persistence; Repository is domain-oriented, DAO focuses on data-access operations |
| Pattern vs Principle | A pattern is a reusable solution; a principle is a general guideline for good design |

> Remember: Most "vs" answers reduce to one word each — Factory *creates*, Strategy *behaves*, State *transitions*, Proxy *controls*, Decorator *adds*, Adapter *translates*, Facade *simplifies*.
