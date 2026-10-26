# Coverage: Design Patterns
Reference: reference/design-patterns.md  ·  Last updated: 21-10-2026

Every reference item (key list: the numbered sections, plus each question, pattern and "X vs Y" row inside them) appears in exactly
one of Mapped, Corrected or Dropped. A section whose parts went to different places has one row here (Corrected wins over
Mapped), and its other parts are listed under "Details placed elsewhere or cut". Sources for corrections are primary pages.

## Mapped
| Reference item (key + short title) | Landed in | Note |
|---|---|---|
| P1 Design Pattern Basics, part: design pattern definition; P1 part: creational / structural / behavioural families; P1 part: 'patterns are tools, not mandatory rules'; P1 part: four points to explain a pattern; P1 part: payment example diagram (PaymentController → PaymentService → PaymentStrategy → UPI / Card / Wallet); P1 part: composition; P1 part: inheritance; P1 part: loose coupling; P1 part: high cohesion; P1 part: programming to an interface; P1 parts: SOLID, Dependency Injection, Overengineering; P1 (part: overengineering, "patterns are tools, not mandatory rules"); P1 (part: payment example diagram, controller → service → strategy → UPI/card/wallet); P1 (part: four points to explain a pattern: problem, idea, payment example, real-world use) | concept what-are-design-patterns (hook, sayIt); glossary `design-pattern`; concept what-are-design-patterns (How it works table with all 23 names, points); glossary `creational-pattern`, `structural-pattern`, `behavioural-pattern`; tree nodes `creational-family`, `structural-family`, `behavioural-family`; concept what-are-design-patterns (bullet linking anti-patterns); concept what-are-design-patterns (bullet linking choosing-a-pattern); concept composition-over-inheritance (Example: PaymentService has-a PaymentStrategy); design-principles table rows; concept composition-over-inheritance (points, Example); glossary `composition`; concept composition-over-inheritance (points, comparison); glossary `inheritance`; concept design-principles (point, table row, Interview Q); glossary `loose-coupling`, `tight-coupling`; concept design-principles (point, table row, Interview Q); glossary `high-cohesion`; concept design-principles (table row, Interview Q); tree node `program-to-interface`; glossary `program-to-an-interface`; not in this unit; concept anti-patterns (hook, trap); glossary overengineering; `choosing-a-pattern` Example (Steps "Idea"), point "One example"; `choosing-a-pattern` Example (Steps), hook, sayIt; tree `twenty-second-answer` | Counts 5 / 7 / 11 checked against the publisher's table of contents Overuse is owned by `anti-patterns`; only linked here Owned by `choosing-a-pattern`; link only Owned by the solid unit, `dependency-injection` and `anti-patterns`; what-are-design-patterns and design-principles only link them Other parts of P1 belong to the basics unit. the controller layer belongs to `mvc`; not redrawn here a fifth beat (trade-off) added, see Added |
| P7 Decorator Pattern (definition, optional behaviour without subclasses, logging/metrics/caching/compression/streams, trade-off: many wrappers, LoggingPayment example, Java I/O streams) | concept `decorator` (points, Example, Interview Q1 java.io, tree `java-io-decorators`) | Example rewritten as LoggingGateway around MetricsGateway around UpiGateway with BigDecimal. "Many wrappers harder to follow" landed as the source-backed minus point "order-sensitive; one layer is hard to remove". |
| P9 Observer Pattern (definition, decoupling, where used, publisher, subscriber, trade-offs, PaymentObserver example, in-process vs broker note) | concept `observer` (hook, points, How it works, trap, Example); comparison `observer-vs-pub-sub` | Example rewritten as Spring events with `record PaymentSucceeded`. Trade-offs: order → bullet (@Order); errors → tree `async-event-listener`; duplicates → comparison row. "Subscriber lifecycle" kept only as "observers register" (unsubscribe detail cut as minor). In-process vs broker note → trap + comparison. |
| P10 Command Pattern: subtopics, invoker, receiver, RefundCommand, trade-off | concept `command` (points, sequence diagram, Example); tree `command-invoker`, `command-receiver` | "job queues, undo/redo, scheduled jobs" kept as uses |
| P14 Repository Pattern (definition; problem solved: persistence out of business logic; where used: Spring Data JPA; trade-off: generic repository duplicates the framework's; JpaRepository example; trap: not GoF) | concept repository-and-dao (points, trap, Example, Interview Q 3) | Trap kept as stated: it was right. |
| P16 SOLID Principles: S (one coherent responsibility, one main reason to change); P16 SOLID Principles: SRP payment row (separate payment processing from receipt generation); P16 SOLID Principles: O (open to extension, closed to unnecessary modification); P16 SOLID Principles: OCP payment row (add a new payment strategy without rewriting the service); P16 SOLID Principles: L (subtype usable wherever base type is expected without breaking the contract); P16 SOLID Principles: LSP payment row (every PaymentStrategy honours the payment contract); P16 SOLID Principles: I (small focused interfaces, clients not forced to depend on unused methods); P16 SOLID Principles: ISP payment row (split a huge gateway interface); P16 SOLID Principles: D (business logic depends on abstractions, not concrete details); P16 SOLID Principles: DIP payment row (PaymentService depends on PaymentStrategy, not UpiPayment) | concept single-responsibility (hook, points, trap); concept single-responsibility (picture, example); concept open-closed (hook, points, trap); concept open-closed (table, example, sayIt); concept liskov-substitution (hook, contract table); concept liskov-substitution (table, GiftCardPayment example); concept interface-segregation (hook, points); concept interface-segregation (picture, example, sayIt); concept dependency-inversion (points Rule A and B); concept dependency-inversion (picture, sayIt, package example) | Sharpened to Martin's wording: reasons to change are people / business functions Added NotificationService (SMS) as a third reason "unnecessary" made precise with Martin's strategic closure Contract rules made explicit from Liskov and Wing 1994 Chargeable / Refundable / Payouts Martin's two-part 1996 statement used |
| P17 Other Patterns Worth Recognizing (section as a whole) | concept what-are-design-patterns (family table links every GoF name to its concept or node) | Items P17.1–P17.11 are owned by their pattern concepts |
| P18 Design Pattern Confusions: Quick Revision (table as a whole) | concept `pattern-confusions-map` (table "Look-alikes → Ask") | one splitting question per pair, each linked to its owner; no gists restated |
| P19 How to Choose a Pattern in an Interview (section as a whole) | concept `choosing-a-pattern` (How it works picker table) | rows grouped Create / Wrap / Behave / App, each a link to the owning concept |
| P3.V1 Factory vs Strategy (inline in section 3) | comparison `factory-vs-strategy` | "they work together" is the verdict |
| P7.V1 Decorator vs inheritance (inline); P7.V1 Decorator vs inheritance | concept composition-over-inheritance (bullet: Strategy and Decorator are composition at work); concept `decorator` (trap, Interview Q2); link to `composition-over-inheritance` | The decorator detail stays in `decorator` |
| P8.V1 Decorator vs Proxy (inline) | comparison `decorator-vs-proxy` |  |
| P10.V1 Command vs Strategy (inline) | comparison `command-vs-strategy` | "potentially retried" not used: no primary source says it (Open questions) |
| P11.V1 Template Method vs Strategy (inline) | comparison `strategy-vs-template-method` |  |
| P16.V1 Dependency Inversion vs Dependency Injection (principle vs technique) | comparison dependency-inversion-vs-dependency-injection; concept dependency-inversion (trap) |  |
| P17.1 Facade (PaymentFacade coordinates validation, charging, receipts) | concept `facade` | Added fraud check and notification steps, SLF4J, god-object risk. |
| P17.2 Flyweight (share reusable state; immutable currency metadata) | concept `flyweight` (How it works table, Currency.getInstance) |  |
| P17.3 Prototype (create by copying; cloning a configuration template) | concept `prototype` (hook, Example copying a recurring ₹500 payment) | "Cloning" kept as the idea; Java's clone() pitfalls added (see Added). |
| P17.5 Memento (restore a draft payment form) | concept `memento` (Why, Mermaid, Example) |  |
| P17.6 Visitor (operations over object types; object-model traversal) | concept `visitor` |  |
| P17.7 Bridge (two dimensions of variation, processing logic vs providers) | concept `bridge` |  |
| P17.8 Interpreter | tree node `interpreter` (under visitor) + children; glossary `interpreter-term`, `abstract-syntax-tree` |  |
| P17.9 Abstract Factory (matching provider payment + refund clients) | concept `abstract-factory` (Example: ProviderFactory, SandboxProviderFactory) | No real company names. |
| P17.10 Iterator (java.util.Iterator as the familiar example) | concept `iterator` |  |
| P17.11 Memento vs Command | concept `memento` (trap; Interview Q "How would you build undo") | No comparison file (not listed for the unit). |
| P18.1 Factory vs Strategy (table row); P18.1 Factory vs Strategy | comparison `factory-vs-strategy` (gist, rows); `pattern-confusions-map` row → compare `factory-vs-strategy` | owner: behavioural unit |
| P18.2 Strategy vs State (table row); P18.2 Strategy vs State | comparison `strategy-vs-state`; concept `state` (Interview Q); row → compare `strategy-vs-state` | owner: behavioural unit |
| P18.3 Adapter vs Decorator; P18.3 Adapter vs Decorator | comparison `adapter-vs-decorator`; trap in `adapter`; Mermaid decision tree + bullet → compare `adapter-vs-decorator` | owner: structural unit |
| P18.4 Decorator vs Proxy; P18.4 Decorator vs Proxy | comparison `decorator-vs-proxy`; Mermaid decision tree, Interview Q 2 + bullet → compare `decorator-vs-proxy` | Added the "who creates the wrapped object" row. owner: structural unit |
| P18.5 Proxy vs Facade; P18.5 Proxy vs Facade | comparison `proxy-vs-facade`; Mermaid decision tree + bullet → compare `proxy-vs-facade` | owner: structural unit |
| P18.6 Template Method vs Strategy (table row); P18.6 Template Method vs Strategy | comparison `strategy-vs-template-method`; concept `template-method` (Interview Q); row → compare `strategy-vs-template-method` | linked from strategy via confusedWith owner: behavioural unit |
| P18.7 Observer vs Pub/Sub; P18.7 Observer vs Pub/Sub | comparison `observer-vs-pub-sub` (listed in `observer` confusedWith); row → compare `observer-vs-pub-sub` | owner: behavioural-objects unit |
| P18.8 Command vs Strategy (table row); P18.8 Command vs Strategy | comparison `command-vs-strategy`; concept `command` (Interview Q); row → compare `command-vs-strategy` | owner: behavioural unit |
| P18.9 Inheritance vs Composition (is-a vs has-a); P18.9 Inheritance vs Composition | comparison inheritance-vs-composition (embedded in composition-over-inheritance); row → compare `inheritance-vs-composition` | Extended with binding time, coupling, testing and when to inherit owner: basics unit |
| P18.11 DI vs Factory; P18.11 DI vs Factory | comparison di-vs-factory (listed in dependency-injection confusedWith); row → compare `di-vs-factory` ("Does the class ask, or receive?") | owner: enterprise unit |
| P18.12 Singleton vs Static; P18.12 Singleton vs Static | comparison `singleton-vs-static-class`; tree `static-utility-class`; row → compare `singleton-vs-static-class` | owner: creational unit |
| P18.13 Repository vs DAO; P18.13 Repository vs DAO | comparison repository-vs-dao (embedded in repository-and-dao); row → compare `repository-vs-dao` | owner: enterprise unit |
| P18.14 Pattern vs Principle; P18.14 Pattern vs Principle | concept what-are-design-patterns (trap); glossary `design-principle`, `programming-idiom`; row → concept `what-are-design-patterns` | Idiom added as the third level owner: basics unit |
| P19.1 Many payment methods with different algorithms: Strategy; P19.1 Many payment methods, different algorithms: Strategy | concept `strategy` (Why it exists, How it works); `choosing-a-pattern` table row "one job, many ways" → strategy | the picker row itself belongs to choosing-a-pattern |
| P19.2 Choose and instantiate the right payment implementation: Factory; P19.2 Choose and instantiate the right implementation: Factory | concept `factory-method` (hook, Example); table row "Pick the right implementation" → factory-method | The picker row itself lives in `choosing-a-pattern`. |
| P19.3 Many optional configuration fields: Builder; P19.3 Many optional configuration fields: Builder | concept `builder` (hook, Why); table row "Many optional fields" → builder |  |
| P19.4 Third-party provider has a different interface: Adapter; P19.4 Third-party provider has a different interface: Adapter | concept `adapter` (Why it exists, Interview Q1); table row "SDK has another interface" → adapter | The picker line itself belongs to playbook `choosing-a-pattern`. |
| P19.5 Add logging, metrics or optional behaviour around an object: Decorator; P19.5 Add logging, metrics or optional behaviour: Decorator | concept `decorator` (Why it exists, sayIt); table row "Add logging around calls" → decorator | Picker line owned by playbook. |
| P19.6 Intercept access, authorisation or method calls: Proxy; P19.6 Intercept access, authorisation or method calls: Proxy | concept `proxy` (points Purpose, tree `proxy-kinds`); table row "Intercept calls: security, transactions" → proxy | Picker line owned by playbook. |
| P19.7 Notify many consumers after payment success: Observer or Pub/Sub; P19.7 Notify many consumers after success: Observer or Pub/Sub | concept `observer` (Why, sayIt); comparison verdict; table row "Notify many after success" → observer; pub/sub split via `pattern-confusions-map` row observer-vs-pub-sub |  |
| P19.8 Refund request as a queued task: Command; P19.8 Refund request as a queued task: Command | concept `command` (Why it exists, Interview Q); table row "Queue or undo a refund" → command |  |
| P19.9 Same processing sequence, customise a step: Template Method; P19.9 Same sequence, customise a step: Template Method | concept `template-method` (Why it exists); table row "Fixed steps, one varies" → template-method |  |
| P19.10 Authentication, validation and fraud checks in order: Chain of Responsibility; P19.10 Authentication, validation, fraud checks in order: Chain of Responsibility | concept `chain-of-responsibility` (Steps); table row "Ordered checks, any can stop" → chain-of-responsibility |  |
| P19.11 Behaviour by payment lifecycle state: State; P19.11 Behaviour by payment lifecycle state: State | concept `state` (Why it exists); table row "Behaviour follows payment status" → state |  |
| P19.12 Keep database access out of business logic: Repository; P19.12 Keep database access out of business logic: Repository | concept repository-and-dao (hook, Why it exists); table row "SQL out of business logic" → repository-and-dao | Picker row lives in choosing-a-pattern. |
| P19.13 Share required dependencies cleanly: Dependency Injection; P19.13 Share required dependencies cleanly: DI | concept dependency-injection (hook, point "Constructor injection"); table row "Dependencies handed in" → dependency-injection | The picker row itself lives in choosing-a-pattern (playbook unit). |
| P19.EX Explain the Strategy pattern in 20 seconds (model answer) | `choosing-a-pattern` Example (Steps), hook, sayIt, trap | rewritten as five beats; the only place the formula lives |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| P2 Strategy Pattern (subtopics, example, interview line) | (1) "New behaviour can be added without rewriting the code that selects the abstraction": the selecting code does learn the new option. (2) Money as `double` in `pay(double)` and `service.pay(500)` | (1) Trap: Strategy moves the choice to one place (factory, Map of beans, DI), it does not delete it. (2) `pay(BigDecimal)`, `BigDecimal.valueOf(500)` | https://refactoring.guru/design-patterns/strategy (clients must know the strategies to select one); https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/math/BigDecimal.html |
| P3 Factory Pattern, part: payment factory example | `pay(double amount)` for money, and the method chosen by a free `String` with a `default` throw | `BigDecimal` amounts (`BigDecimal.valueOf(500)`) and `enum PaymentMethod { UPI, CARD, WALLET }` with an exhaustive switch (no default needed) | https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html |
| P4 Builder Pattern, part: example | `.amount(500)` as an int and `.method("UPI")` as a String | `amount(BigDecimal)` and `method(PaymentMethod)`; required fields checked when `build()` runs | https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html |
| P5 Singleton Pattern, part: Spring singleton scope ("singleton-scoped by default within its application context") | Loose: implies one instance per class per context | One instance per bean definition per container; two bean definitions of the same class give two instances. GoF singleton is one per ClassLoader (Spring Framework 7.0) | https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html |
| P6 Adapter example (`charge(double)`, `(int) Math.round(amount * 100)`, `makePaymentInPaise(int)`) | Money as double is inexact; casting to int also caps an amount at about ₹2.1 crore and silently rounds fractions of a paisa | `charge(BigDecimal)`; `amount.movePointRight(2).longValueExact()` gives long paise and throws if a fraction is left; SDK takes long | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/math/BigDecimal.html |
| P8 Proxy Pattern (Spring AOP, @Transactional; "certain self-invocations may not receive" the interception; example uses double) | Loose: in proxy mode (the default) no self-invocation is intercepted, not just "certain" ones; it also omits that Spring Boot proxies classes with CGLIB by default, and uses double money | Trap and point: a this-call never passes the proxy, so no transaction; fix by another bean or AspectJ mode. Defaults: Spring Boot 4.1.1 `spring.aop.proxy-target-class=true` (CGLIB); plain Framework 7.0 uses a JDK proxy when an interface exists. Example uses BigDecimal | https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html ; https://docs.spring.io/spring-boot/appendix/application-properties/index.html ; https://docs.spring.io/spring-framework/reference/core/aop/proxying.html |
| P11 example money type | `process(double amount)`, `amount <= 0` on a double | `process(BigDecimal)`, `amount.signum() <= 0`; validate kept, `recordResult` replaced by a hook `afterPayment()` | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/math/BigDecimal.html |
| P12 Chain of Responsibility (subtopics, checks chain, "Spring Boot connection") | Calls Servlet filters and Spring Security only "a useful interview analogy" and leaves "termination behaviour" vague | They are real chains: a filter calls `chain.doFilter()` to pass on or skips it to block; FilterChainProxy runs only the first SecurityFilterChain that matches; authentication filters run before authorisation | https://jakarta.ee/specifications/servlet/6.1/apidocs/jakarta.servlet/jakarta/servlet/Filter.html; https://docs.spring.io/spring-security/reference/servlet/architecture.html |
| P13 "Important: a Java enum ... is not by itself the State pattern" | Right for a plain enum, but too broad: an enum whose constants have their own method bodies puts behaviour per state, which is the pattern | Trap and point: a plain enum only names states; enum constants with class bodies can be the states (Example shows it) | https://docs.oracle.com/javase/specs/jls/se25/html/jls-8.html#jls-8.9.1 |
| P15 (part: IoC sub-bullet) | Defined IoC only as "the container controls object creation and lifecycle", which makes IoC and DI the same thing | IoC is the broader idea (the framework runs the flow and calls your code); DI is the specific form for dependencies (Interview Q 1, glossary inversion-of-control) | https://martinfowler.com/bliki/InversionOfControl.html ; https://martinfowler.com/articles/injection.html |
| P17.4 Mediator (workflow coordinator stops services calling each other) | Loose: the example is about separate services, but GoF Mediator coordinates objects (components) inside one program | Concept `mediator` with a checkout-screen example (cart, coupon, wallet, Pay button) talking only through a CheckoutMediator | https://refactoring.guru/design-patterns/mediator |
| P18.10 Interface vs Abstract Class ("interface defines a contract; abstract class can also share state and implementation"); P18.10 Interface vs Abstract Class | Out of date since Java 8: interfaces can share implementation too (default and static methods in Java 8, private methods in Java 9). The real difference is instance state, constructors and single vs multiple inheritance; "abstract class can also share state and implementation" implies interfaces cannot share implementation; since Java 8 interfaces have default methods (instance methods with a body). The real splitter is instance state: interface fields are implicitly public static final | Comparison interface-vs-abstract-class: interfaces have only public static final constants, no constructors, method bodies as default/static (Java 8) and private (Java 9); a class extends one class but implements many; Row question "Need shared instance fields?" → compare `interface-vs-abstract-class` (the basics unit owns the full fix) | https://docs.oracle.com/javase/specs/jls/se25/html/jls-9.html ; https://docs.oracle.com/javase/specs/jls/se8/html/jls-9.html#jls-9.4 ; https://openjdk.org/jeps/213 ; https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html ; https://docs.oracle.com/javase/specs/jls/se25/html/jls-9.html |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| GoF book facts: authors, Addison-Wesley, 31-10-1994 (copyright 1995), 23 patterns, 5 / 7 / 11 split | what-are-design-patterns (points); tree `gof-book`; glossary `gang-of-four` | Commonly asked "who are the GoF / how many patterns" |
| Pattern levels: idiom and architectural pattern | tree `pattern-levels`, `idiom-level`, `architectural-pattern-level`; Interview Q | Completes "pattern vs principle vs idiom" |
| Repository, DI and MVC are not among the 23 | what-are-design-patterns (point, bullet) | Common trap; links only |
| Modern Java and patterns (lambdas, enum, pattern matching for switch in Java 21) | what-are-design-patterns (Interview Q, links only) | Asked in current interviews; JEP 441 itself calls Visitor cumbersome |
| Fragile base class problem | composition-over-inheritance (point); tree `fragile-base-class`; glossary | The main reason behind the rule |
| JDK lesson: Stack extends Vector; Javadoc prefers Deque | composition-over-inheritance (bullet); tree `stack-extends-vector` | Real JDK example of inheritance misuse |
| Delegation; composition vs delegation | composition-over-inheritance (Interview Q); tree `delegation-call`; glossary | Interviewers use the word |
| When inheritance is right (true is-a, base built for extension) | composition-over-inheritance (trap, Interview Q); tree `when-to-inherit` | Stops the "never inherit" overstatement |
| GoF second principle; Effective Java 3rd ed. Item 18 | composition-over-inheritance (bullet) | Named by item number because the Gamma interview and the Aarhus lecture back the rule |
| Encapsulate what varies (GoF third principle) | design-principles (point, table row); tree; glossary | Root of most patterns |
| DRY (knowledge, not just code), KISS, YAGNI, Law of Demeter | design-principles (points, table, trap, Interview Q); tree; glossary | Asked in nearly every design-principles round |
| Reason to change = people / one business function; bug fixes do not count | single-responsibility (points, Interview Q), tree srp-people-not-bugs | Martin's own explanation; a common follow-up question |
| SRP roots in Parnas 1972 and separation of concerns | single-responsibility (How it works), tree | Shows where the rule comes from in one line |
| SOLID are heuristics, not laws (Martin) | single-responsibility (point) | Prevents rote answers |
| Meyer 1988 origin; strategic closure; plugin architecture | open-closed (points, bullets, Interview Q), tree | Standard interview follow-ups |
| OCP still relevant with microservices (Martin 2020) | open-closed (Interview Q) | Commonly asked "is SOLID outdated?" angle |
| LSP contract rules (preconditions, postconditions, invariants, exceptions) | liskov-substitution (table), tree, glossary | The reference gives no test for "honours the contract" |
| Square / Rectangle classic; LSP covers interface implementations (Martin 2020) | liskov-substitution (trap, Interview Q, point) | Most asked LSP example |
| JDK optional operations: List.of add throws UnsupportedOperationException (Java 9) | liskov-substitution (Interview Q), tree, glossary | Real JDK example; answer is "allowed by the documented contract" |
| ISP groups clients by type (not one interface per caller); recompile cost; role interface (Fowler) | interface-segregation (points, bullets), tree, glossary | Guards against "one method per interface" |
| DIP: who owns the interface; runtime call vs source dependency; stable concretes are fine; ways to supply (DI, abstract factory, service locator) | dependency-inversion (points, bullets, Interview Qs), tree | Core of the DIP vs DI answer |
| Ways to write a singleton: eager field, synchronized method, double-checked locking with volatile, holder idiom, enum | concept `singleton` (table, Example, Interview Qs); tree nodes | "Make it thread-safe" and "why volatile" are standard follow-ups; the reference only says "thread safety". |
| Enum singleton guarantees (no reflective instantiation, no duplicates from deserialisation) | `singleton` points; tree `enum-singleton` | Backed by JLS 8.9. |
| GoF vs Spring singleton (per ClassLoader vs per bean definition per container) | `singleton` Interview Q | Spring docs state it directly; commonly asked. |
| Static factory method (List.of, Java 9) and why it is not the GoF pattern | `factory-method` table, Interview Q; tree | GfG Q58 asks it. |
| Spring `Map<String, PaymentStrategy>` keyed by bean name as a factory replacement | `factory-method` bullet; tree `spring-bean-map` | Makes the reference's Spring connection concrete. |
| Factory Method vs Abstract Factory comparison | comparison `factory-method-vs-abstract-factory` | Common confusion (GfG Q33). |
| Abstract Factory drawback: new product type changes every factory | `abstract-factory` point, Interview Q | Follows from its structure (one creation method per product). |
| Telescoping constructor; GoF director; HttpRequest.newBuilder() (Java 11, immutable result, build() throws without a URI); record (Java 16) when all fields are required; Builder vs Abstract Factory | concept `builder`; tree | Standard interview angles. |
| Shallow vs deep copy; Object.clone() protected and shallow; Cloneable has no methods; prefer a copy constructor; prototype registry | concept `prototype`; tree | GfG Q32 asks clone() vs Prototype. |
| Spring prototype scope is not a copy; a prototype injected into a singleton is created only once | `prototype` trap, Interview Q; tree `spring-prototype-scope` | A common mix-up of names. |
| Composite pattern | concept `composite` (split payment ₹300 wallet + ₹200 UPI) | GoF structural pattern the reference skipped (plan). |
| Object adapter vs class adapter; target, adaptee | tree under `adapter`; glossary | Standard adapter vocabulary interviewers use. |
| InputStreamReader, Arrays.asList, Spring MVC HandlerAdapter as adapters | tree `adapters-in-java`; adapter How it works | "Where does the JDK/Spring use it" is a common question. |
| FilterInputStream / BufferedInputStream as Decorator | decorator Interview Q1, tree | Concrete JDK example, verified in Javadoc. |
| Proxy kinds (virtual, protection, remote, caching/logging) | tree `proxy-kinds`; glossary | Common follow-up question. |
| JDK dynamic proxy (Proxy + InvocationHandler, interfaces only) vs CGLIB; final/private limits | proxy points, Example, Interview Q; tree `proxy-mechanisms` | Asked with Spring AOP. |
| Spring Boot 4.1 CGLIB default; @Proxyable (Spring Framework 7.0) | proxy points, Defaults, How it works | Version-dependent default (baseline). |
| SLF4J as a facade | facade point, Interview Q2, tree | Real-world facade; GfG asks which pattern logging frameworks use. |
| Facade can become a god object | facade point, tree `bloated-facade`, link to anti-patterns | Known risk. |
| Bridge vs Adapter (designed up front vs retrofitted) | bridge trap, Interview Q1 | Asked (GfG Q19). |
| Integer cache -128..127 and the `==` trap; string interning (JLS 3.10.5); Currency one instance per currency | flyweight points, trap, Example, Defaults, tree | JDK flyweights interviewers name. |
| A lambda as a strategy (functional interface, Java 8) | concept `strategy` (point, Example); tree `lambda-strategy`; glossary `functional-interface`, `lambda-expression` | the modern Java form interviewers expect |
| Comparator as the JDK's Strategy | concept `strategy` (point, Interview Q); tree `comparator-strategy` | "where does the JDK use Strategy" is commonly asked |
| Enum constants with class bodies as states | concept `state` (Example, point); tree `enum-constant-states` | backs the corrected P13 note |
| Hook methods; final template method | concept `template-method`; tree `hook-methods`, `final-template-method` | core parts of the pattern the reference skipped |
| AbstractList as the JDK's Template Method | concept `template-method` (point, Interview Q); tree `abstractlist-template` | JDK example question |
| JdbcTemplate uses callbacks, not subclassing | concept `template-method` (trap); tree `jdbctemplate-callbacks`; glossary `jdbctemplate` | common naming trap |
| Hollywood principle | concept `template-method` (bullet); glossary `hollywood-principle` | interview phrase; Fowler's page backs it |
| Runnable / Callable with ExecutorService as Command | concept `command` (point, Interview Q); tree `runnable-callable-tasks`; glossary `executorservice` | JDK example question |
| How undo and redo work with Command | concept `command` (Interview Q); glossary `undo-redo` | commonly asked (GeeksforGeeks list) |
| Two forms of the chain (first able handler vs every handler) | concept `chain-of-responsibility` (point, bullet); tree `first-handler-chain`, `pipeline-chain` | removes a common confusion |
| Chain vs Decorator (decorators never stop the flow) | concept `chain-of-responsibility` (bullet, link) | structural look-alike |
| Unhandled request and a default last handler | concept `chain-of-responsibility` (Interview Q) | the pattern's main risk |
| java.util.Observer / Observable deprecated since Java 9 (not for removal) | `observer` point + Interview Q; tree `java-util-observer-api`; glossary | Commonly asked; the reference only shows a hand-rolled observer |
| Spring events: ApplicationEventPublisher, @EventListener, synchronous by default, @Async, @Order | `observer` Example, point, Interview Q, bullet; tree `spring-application-events` | Standard Spring form of Observer; default behaviour is a frequent question |
| @TransactionalEventListener runs AFTER_COMMIT by default, discarded with no transaction unless fallbackExecution | `observer` point + Interview Q; tree `transactional-listener` | Version-checked Spring default (Framework 7.0) |
| Push vs pull model | tree `push-model`, `pull-model`; glossary | Classic Observer variants |
| Mediator vs Facade, Mediator vs Observer; god-object risk | `mediator` trap + Interview Qs, point | Common confusion pairs |
| Iterable + enhanced for loop (JLS 14.14.2); fail-fast iterators; weakly consistent iterators; internal vs external iteration; removeIf | `iterator` points, trap, Interview Qs; tree | Standard Java interview angle for Iterator |
| Originator / memento / caretaker roles; record as memento (Java 16); memory cost | `memento` points; tree | Roles are what interviewers ask |
| Double dispatch; accept/visit; why overloading is not enough | `visitor` trap, points; tree | Core Visitor question |
| Sealed interface (Java 17) + pattern matching for switch (Java 21) as modern Visitor | `visitor` Example + Interview Q; tree `sealed-switch-visitor` | Modern Java alternative, named in JEP 441 |
| FileVisitor + Files.walkFileTree as the JDK Visitor | `visitor` bullet; tree `file-visitor` | JDK example |
| Single constructor needs no @Autowired (Spring Framework 7) | dependency-injection point (kind default), Example comment | Common follow-up question; the reference's example relies on it silently |
| Field injection cost: private fields need reflection (ReflectionTestUtils) in plain tests | dependency-injection point, tree note | Makes "prefer constructor injection" concrete |
| Service locator as the alternative to DI; interface injection as Fowler's third style | dependency-injection Interview Q 3; tree nodes service-locator, interface-injection | Fowler's article defines DI against them |
| IoC container, ApplicationContext, BeanFactory | tree node ioc-container > bean-factory; glossary | Interviewers use these words with DI |
| DAO (Core J2EE Patterns), Data Mapper, aggregate root (one repository per aggregate root) | comparison repository-vs-dao; tree; glossary | Needed for the Repository vs DAO answer |
| Spring Data repository proxy, derived query methods, @Query | repository-and-dao How it works, Interview Q 2 | "How does an interface without code work?" is a common question |
| @Repository marks both repository and DAO roles | repository-vs-dao verdict | Explains why the two blur in Spring |
| MVC and Front Controller (whole concept): roles, DispatcherServlet, HandlerMapping, HandlerAdapter, ViewResolver, @RestController, default path / in Spring Boot 4.1 | concept mvc; tree; glossary | Often asked with Spring; master.json "added beyond the reference" |
| Patterns in the JDK and Spring (whole concept): BeanFactory and FactoryBean as factories, @Configuration CGLIB subclass and proxyBeanMethods, RestClient.builder(), HandlerInterceptor chain, HandlerExceptionResolver as a strategy, HandlerAdapter | concept patterns-in-jdk-and-spring; tree | "Which patterns does Spring / the JDK use?" is a common question |
| Anti-pattern names: god object, golden hammer, singleton abuse, speculative generality, anemic domain model | concept anti-patterns; tree; glossary | The reference names only "overengineering" |
| Picker rows for Singleton, Abstract Factory, Prototype, Facade, Composite, Bridge, Flyweight, Mediator, Iterator, Memento, Visitor | `choosing-a-pattern` table | P19 covers 13 problems only; the picker should reach every GoF pattern on the site (Interpreter stays a tree node of visitor, not listed) |
| Fifth answer beat: trade-off | `choosing-a-pattern` Steps, hook, sayIt, trap; tree `answer-beat-trade-off` | P1 / P19.EX list only benefits; every pattern has a cost (Refactoring.Guru Strategy cons: extra classes when algorithms rarely change; Fowler Yagni: cost of carry) |
| "When not to use a pattern" Interview Q | `choosing-a-pattern` Interview Qs; tree `pattern-only-when-needed` | P1's "patterns are tools" line, made answerable with YAGNI; links `anti-patterns` |
| Machine coding / LLD tip and glossary terms | `choosing-a-pattern` Interview Q 3; glossary `lld-term`, `machine-coding-round-term`; tree nodes | master.json glossaryOwns; LLD rounds are where pattern choice is tested |
| Wrapper decision tree (Adapter, Facade, Decorator, Proxy, Composite) | `pattern-confusions-map` Mermaid | one picture replaces three table rows (P18.3–P18.5) and adds Composite |
| Pairs without a comparison page: Mediator vs Facade, Bridge vs Adapter, Memento vs Command | `pattern-confusions-map` bullet, links to the owning concepts | scope notes give these traps to mediator, bridge, memento |
| Adapter vs Facade trap | `pattern-confusions-map` trap | common mix-up; no other unit owns it |
| "Same structure, different intent" (Bridge, State, Strategy) | `pattern-confusions-map` points, Interview Q 1; tree `same-structure-different-intent` | the core idea that makes the map work |

## Dropped
| Reference item | Reason (rare / advanced / duplicate / unverifiable) |
|---|---|
| (no whole item) | |

### Details placed elsewhere or cut, inside items listed above
| Reference item part | What happened |
|---|---|
| P3 Factory Pattern, parts: factory definition, problem solved, where used, simple factory (not GoF), factory method, trade-off (growing conditional), Spring connection (DI can replace factories; keep one for runtime input) | also: concept `factory-method` (table, points, bullets, Interview Q "Does Spring remove the need for factories?"); tree `simple-factory`, `gof-factory-method`, `spring-bean-map` |
| P3 Factory Pattern, part: abstract factory | also: concept `abstract-factory` (hook, points) |
| P4 Builder Pattern (definition, problem solved, where used, trade-off "adds code", Lombok or manual builder, interview line "does not automatically validate or make immutable") | also: concept `builder` (points, trap, Example, Interview Qs); tree `lombok-builder`, `bloch-builder` |
| P5 Singleton Pattern (definition, problem solved, where used, thread safety, trade-off on global state, Spring singleton scope, @Component example, "manual singleton unnecessary in Spring", distributed trap) | also: concept `singleton` (hook, points, table, trap, Example, Defaults, Interview Qs); tree `spring-singleton-scope` |
| P6 Adapter Pattern (definition, problem solved, where used: gateways, legacy, SDKs; trade-off: translation layer; UpiAdapter example; interview line) | also: concept `adapter` (hook, points Target/Adaptee/Adapter/Contains the API/Cost, Example, Interview Q1) |
| P11 Template Method Pattern: subtopics, PaymentProcessor example, trade-off | also: concept `template-method` (Steps, Example, points) |
| P12 (part) "middleware" as a use | cut: unverifiable: no primary page in the allowed list defines it; glossary term not written |
| P13 State Pattern: subtopics, payment lifecycle, invalid transitions, trade-off | also: concept `state` (Mermaid lifecycle, points, Example, Interview Q "overkill") |
| P15 Dependency Injection (constructor, setter, field injection; benefit: testing, clear dependencies, loose coupling; preferred: constructor injection; trade-off: many dependencies = too many responsibilities; PaymentService example; interview answer: mocks in tests) | also: concept dependency-injection (points, trap, Example, Interview Qs 2); tree nodes constructor-injection, setter-injection, field-injection |

## Template v3 rewrite (21-10-2026)

Every concept and comparison was rewritten in teaching template v3 (CLAUDE.md 3.1.1) and given a cheat-sheet card; each reference item mapped above still lands in the same concept id. An independent pass checked about 650 claims and fixed 3, removing none.

### Unit basics

**Added from the reference**

- (what-are-design-patterns) "A pattern is a tool, not a rule; overuse is overengineering" made a first-class point and a Common mistake. Reference P1 ("Patterns are tools, not mandatory rules") and §19 overengineering angle. The full overengineering concept stays in `anti-patterns`; linked only.
- (what-are-design-patterns) "four points to explain a pattern" (problem, idea, example, trade-offs) folded into the point "a pattern gives…". Owned fully by `choosing-a-pattern`; not expanded here.
- No new glossary terms: every interviewer word used (actor, role interface, fragile base class, delegation, DRY, KISS, YAGNI, Law of Demeter) already exists in glossary.yaml.

**Corrections**

- None. All draft facts were re-verified, not changed.

### Unit creational

**Added from the reference**

- Singleton: thread-safety mechanisms (eager field, double-checked locking + volatile, holder idiom, enum) and *why* each is safe (JLS 12.4.2 initialization lock) → `singleton` (How it works table, scenarios, Interview Qs). Reference only said "thread safety".
- Singleton: enum's reflection/deserialization guarantees made concrete (Constructor.newInstance throws for enum; enum constants resolved by name on deserialize, no readResolve needed) → `singleton` Example "What to notice", points.
- Factory: static factory method vs GoF Factory Method distinction, exhaustive enum switch (no default) → `factory-method` points, trap, Interview Qs.
- Builder: HttpRequest.newBuilder() JDK example (immutable result, IllegalStateException without URI), record-as-alternative → `builder` Rules and defaults, points.
- Prototype: shallow vs deep copy, clone()/Cloneable pitfalls, prototype-into-singleton behaviour → `prototype` (whole concept). Reference only said "cloning a configuration template".

**Corrections**

- Reference factory/builder/singleton examples use `pay(double)`, `String` method keys, `@Component` only. Kept the repo draft's corrected forms: `BigDecimal` money, `enum PaymentMethod`, exhaustive switch. No new correction needed this pass; facts were already verified in the draft.
- No reference fact contradicted the docs in this unit.

### Unit playbook

**Added from the reference**

- Reference P19 lists 13 problem→pattern rows; the picker in `choosing-a-pattern` already reaches every GoF pattern plus Repository and DI (coverage P157). Kept and grouped Create / Wrap / Behave / App, each a link to the owner concept.
- Reference P18 confusion table → `pattern-confusions-map` "Not to be confused with" table: one splitting question per pair (coverage P18), plus the wrapper decision tree Mermaid (coverage P161) and the "same structure, different intent" idea for Bridge/State/Strategy (coverage P164, now Interview Q 3).
- Fifth answer beat (trade-off) kept in the 20-second Strategy example (coverage P158); "when not to use a pattern" / YAGNI kept in Interview Q 1 (coverage P159); machine-coding/LLD tip kept in Interview Q 3 (coverage P160).
- Adapter vs Facade trap kept as the frontmatter trap and the worked Example (coverage P163).

**Corrections**

- None. All facts carried over unchanged from the verified v2 draft; only explanations were rewritten for v3 teaching clarity.

### Unit solid

**Added from the reference**

- (single-responsibility) "a reason to change is an actor / group of people, not a task count" raised to the central teaching, with the Employee (finance/operations/technology) example and the "bug fixes do not count" rule. Reference P16 S row. Verified from Martin's 2014 SRP post.
- (single-responsibility) "SOLID are heuristics, not laws" kept as a Rules-and-defaults bullet; verified from Martin's "Getting a SOLID start" (2009).
- (open-closed) strategic closure ("no program 100% closed; close against the expected change") and the plugin-architecture example kept and explained; Meyer 1988 origin noted.
- (interface-segregation) recompile cost of a fat interface and the role-interface term (Fowler) kept; adapter-wrapping a fat SDK added as an interview answer.
- (dependency-inversion) "stable concretes are fine" (String) and "DIP is the primary mechanism for OCP" verified from Martin's 2000 "Design Principles and Design Patterns" paper.
- No new glossary terms: srp-term, reason-to-change, actor-srp, ocp-term, lsp-term, precondition, postcondition, invariant-term, isp-term, fat-interface, role-interface, dip-term etc. already exist.

**Corrections**

- None. Draft facts re-verified against primary sources; wording sharpened, no fact changed.

### Unit structural

**Added from the reference**

- Nothing materially new was added beyond the verified draft; the reference's structural teaching points (P7, P17.1, P17.2, P17.7, P18.3–P18.5, P6, P8) were already mapped to these concepts in the coverage file. The rewrite re-expressed them in v3 form (What it is, numbered How it works, What-to-notice, Rules and defaults, scenarios, cheat cards).

**Corrections**

- None. All draft facts re-checked against existing sources and left correct.
