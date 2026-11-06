# Java Basics & How It Runs

## What Java Is ⭐
Java is a high-level, class-based, object-oriented language built to be portable: **Write Once, Run Anywhere (WORA)**. You compile source once to bytecode, and any machine's JVM runs it.

- **JDK**: develop + compile + run (includes the JRE + tools like `javac`).
- **JRE**: everything needed to run Java apps.
- **JVM**: the engine that actually executes bytecode.

> Remember: JDK contains JRE contains JVM. JDK develops, JRE runs, JVM executes.

## Compile vs Execute ⭐
- **Compilation**: `.java` source -> `javac` -> `.class` bytecode.
- **Execution**: JVM loads the `.class` and runs it, translating bytecode to machine code.

```
.java  ->  javac  ->  .class (bytecode)  ->  JVM  ->  machine code
```

Bytecode is the intermediate `.class` code. It is platform-independent; each OS's JVM runs it, which is why Java is portable.

## The main Method
```java
public static void main(String[] args) { }
```
- `public`: JVM must be able to access it.
- `static`: JVM calls it without creating an object.
- `void`: returns nothing.
- `String[] args`: command-line arguments.

> Remember: `main` is static so the JVM can start the program without an object first.

## How the JVM Runs Code
- **Class loading**: a class loader loads bytecode when needed, in three steps — Loading, Linking (verification, preparation, resolution), Initialization. Loaders: Bootstrap -> Platform -> Application.
- **Interpreter**: runs bytecode instruction by instruction.
- **JIT (Just-In-Time) compiler**: compiles frequently run ("hot") bytecode to native code for speed.
- **GC**: reclaims unreachable heap objects automatically.

> Remember: JVM = runs bytecode; JIT = speeds up hot code; GC = frees unused memory.

## Packages & Imports
- **Package**: a namespace that groups related classes and avoids name clashes. Fully qualified name = package + class.
- **import**: lets you use a class without its full package name. `import java.util.*;` imports that package's types but not subpackages.
- `java.lang` (String, Object, Math, System) is imported automatically.


# Variables, Types & Operators

## Variable Kinds & Default Values
- **Local**: inside a method/block. **Has no default — must be initialized before use.**
- **Instance**: belongs to an object (non-static).
- **Static**: belongs to the class, one shared copy.
- **Parameter**: received by a method/constructor.

Instance/static field defaults: reference -> `null`, integer -> `0`, floating -> `0.0`, boolean -> `false`, char -> `'\u0000'`.

> Remember: fields get defaults; local variables do not.

## The 8 Primitives
| Type | Size | Notes |
|---|---|---|
| byte | 8-bit | signed int |
| short | 16-bit | signed int |
| int | 32-bit | default integer type |
| long | 64-bit | use `L` literal |
| float | 32-bit | use `F` literal |
| double | 64-bit | default decimal type |
| char | 16-bit | Unicode character |
| boolean | — | true / false |

```java
long x = 100L;   // L -> long
float y = 10.5F; // F -> float
double z = 10.5; // default decimal
```

Everything else (classes, arrays, interfaces, enums, String) is a **reference type** — it stores a reference to an object, not the value.

## Type Casting
- **Widening** (small -> large, e.g. `int`->`long`): automatic, no cast.
- **Narrowing** (large -> small): explicit cast, can lose data.
- **Upcasting** (child -> parent reference): automatic.
- **Downcasting** (parent -> child): explicit, can throw `ClassCastException` if the real object isn't that type.

```java
Animal a = new Dog(); // upcast (auto)
Dog d = (Dog) a;      // downcast (explicit)
```

## Wrappers, Autoboxing & Integer Caching ⭐
Each primitive has an object wrapper: `int`->`Integer`, `double`->`Double`, `char`->`Character`, etc. Needed because collections and generics store objects.

- **Autoboxing**: primitive -> wrapper automatically. **Unboxing**: wrapper -> primitive.
- Danger: unboxing a `null` wrapper throws `NullPointerException`.
- **Integer cache**: Java caches `Integer` objects in a range including -128..127, so `==` on two cached values can be `true` but is `false` outside the range.

```java
Integer a = 100, b = 100; // a == b  -> true (cached)
Integer c = 200, d = 200; // c == d  -> false
```

> Remember: never compare wrapper values with `==`; use `.equals()`.

## Operators & Gotchas
- Arithmetic `+ - * / %`, relational, logical `&& || !`, bitwise `& | ^ ~`, shift `<< >> >>>`, ternary `a > b ? a : b`.
- `&&` / `||` short-circuit; `&` / `|` evaluate both sides.
- **Integer division**: `5 / 2` = `2` (both operands int); `5 / 2.0` = `2.5`.
- **Overflow**: `int` arithmetic wraps around silently; Java does not throw on normal overflow.


# Strings

## String & Immutability ⭐
A `String` is an **immutable** sequence of characters — its content can never change after creation. Methods like `concat` return a *new* String.

```java
String s = "Java";
s.concat(" World");
System.out.println(s); // Java  (unchanged)
s = s.concat(" World"); // correct: reassign
```

Why immutable: security, safe sharing in the string pool, thread-safety, and a cacheable hashCode.

## String Pool & new String()
The **string pool** reuses string literals, so equal literals share one object.
```java
String a = "Java", b = "Java";          // a == b  -> true (pooled)
String c = new String("Java");          // forces a new object
a == c;        // false
a.equals(c);   // true
```
`intern()` returns the pooled copy of a string.

> Remember: literals are pooled and shared; `new String()` always makes a separate object.

## StringBuilder vs StringBuffer
For many modifications, don't concatenate `String` in a loop (it creates many objects) — use a mutable builder.
- **StringBuilder**: mutable, not synchronized, faster — the default choice.
- **StringBuffer**: mutable, synchronized, slower — only when you truly need thread safety.

```java
StringBuilder sb = new StringBuilder();
sb.append("Java").append(" Interview");
```

Common methods: `append`, `insert`, `delete`, `reverse`, `toString`.

## String + Operator
`+` concatenates, and evaluation is left to right:
```java
1 + 2 + "Java"  // "3Java"
"Java" + 1 + 2  // "Java12"
```


# OOP: Classes, Inheritance & Polymorphism

## The Four Pillars ⭐
- **Encapsulation**: bundle data + methods, control access (private fields + public getters/setters). Protects state, allows validation, reduces coupling.
- **Inheritance**: a child gets a parent's accessible members via `extends` ("is-a").
- **Polymorphism**: the same call behaves differently — **overloading** (compile-time) and **overriding** (runtime).
- **Abstraction**: expose behavior, hide implementation (abstract classes, interfaces).

## Classes, Objects & Access Modifiers
A class is a blueprint; an object is a runtime instance (`Car c = new Car();`). Two references can point to the same object.

| Modifier | Visible in |
|---|---|
| private | same class only |
| default (no modifier) | same package |
| protected | same package + subclasses (via inheritance outside the package) |
| public | everywhere the class is accessible |

> Remember: `protected` outside the package works through subclassing, not plain package access. Top-level classes can only be public or default.

## Methods, Overloading & Overriding ⭐
**Signature** = method name + parameter types (return type is *not* part of it).

- **Overloading**: same name, different parameter list; compile-time. Cannot overload by return type alone.
- **Overriding**: child redefines an inherited method with the same signature; runtime. Use `@Override`.

Overriding rules: same signature; return type same or covariant (a subtype); cannot reduce visibility; cannot override `final`/`static`/`private`; constructors aren't overridden. Static methods are **hidden**, not overridden.

## this & super
- `this` = current object (disambiguate field vs parameter, call another constructor via `this()`).
- `super` = immediate parent (access parent field/method, call parent constructor via `super()`).
- `this()` / `super()` must be the **first** statement in a constructor.

## Constructors
Same name as the class, no return type, called on `new`. Can be overloaded; cannot be inherited, overridden, static, final, or abstract. If you write no constructor, the compiler adds a default no-arg one. **Constructor chaining**: `this(...)` calls another constructor; `super(...)` calls the parent's.

## static
Belongs to the class, not objects. Static methods can't use instance members or `this`/`super` directly. A **static block** runs once at class initialization. Static import lets you call static members without the class name.

## final
- **variable**: assign once. For a **final reference**, the reference can't be repointed but the object can still mutate.
- **method**: can't be overridden. **class**: can't be extended.
- `final` (restriction) vs `finally` (exception cleanup block) vs `finalize()` (old deprecated GC method — don't use).

## Object Class, == vs equals, hashCode ⭐
`Object` is the root superclass. Key methods: `toString`, `equals`, `hashCode`, `getClass`, `clone`, `wait/notify`.

- `==`: primitives compare values; objects compare **references** (same object?).
- `equals()`: logical/content equality when overridden.
- **Contract**: if `a.equals(b)` then `a.hashCode() == b.hashCode()`. Equal hash codes do **not** imply equal objects.

```java
String a = new String("Java"), b = new String("Java");
a == b;       // false (different objects)
a.equals(b);  // true  (same content)
```

> Remember: override `equals` and `hashCode` together, or hash-based collections (HashMap/HashSet) break.


# Abstraction, Interfaces & Design

## Abstract Class ⭐
A class that may have abstract (no body) and concrete methods; **cannot be instantiated**. Can have constructors, fields, static and final methods. A concrete subclass must implement all inherited abstract methods.

## Interface ⭐
A contract implementing classes agree to. Fields are implicitly `public static final`. Methods can be abstract, `default` (with body), `static`, or `private` (helpers). A class `implements` interfaces; an interface can `extend` multiple interfaces.

## Abstract Class vs Interface
| Abstract class | Interface |
|---|---|
| `extends` (one only) | `implements` (many) |
| instance fields | fields are constants |
| has constructors | no constructors |
| shared base + state | contract / capability |

> Remember: abstract class = "is-a" common base with shared state; interface = "can-do" contract.

## Multiple Inheritance & the Diamond Problem
Java forbids a class extending multiple classes (ambiguity if two parents define the same method). A class may implement many interfaces. If two interfaces give conflicting `default` methods, the class must resolve it:
```java
class C implements A, B {
    public void show() { A.super.show(); }
}
```

## Composition vs Inheritance
- **Inheritance** = "is-a" (Dog is an Animal).
- **Composition** = "has-a" (Car has an Engine).

Prefer composition when behavior should be assembled rather than inherited.

**Association / Aggregation / Composition**: association = general link; aggregation = weak whole-part, parts live independently (Department–Teacher); composition = strong ownership, part's lifecycle tied to the whole (House–Room).

## SOLID
- **S**ingle Responsibility: one reason to change.
- **O**pen/Closed: open to extension, closed to modification.
- **L**iskov Substitution: subtypes usable wherever the parent is.
- **I**nterface Segregation: small, focused interfaces.
- **D**ependency Inversion: depend on abstractions, not concretions.

## Dependency Injection
Supply a class's dependencies from outside instead of creating them inside.
```java
class Service {
    private final Repository repo;
    Service(Repository repo) { this.repo = repo; } // injected
}
```
Benefits: loose coupling, easier testing, easy to swap implementations.

## Common Design Patterns
- **Singleton**: one controlled instance (private constructor + static access; an `enum` is a robust option).
- **Factory**: encapsulate object creation. **Builder**: build complex objects step by step.
- **Strategy**: interchangeable algorithms. **Observer**: notify on state change.
- **Adapter**: bridge incompatible interfaces. **Decorator**: add behavior without modifying the class.


# Exceptions

## Hierarchy ⭐
```
Throwable
 ├── Error            (serious JVM/system problems; don't handle)
 └── Exception
      └── RuntimeException (unchecked)
```

## Checked vs Unchecked ⭐
- **Checked**: compiler forces you to handle or declare them (`IOException`, `SQLException`). Use when the caller can reasonably recover.
- **Unchecked** (RuntimeException): compiler doesn't force handling (`NullPointerException`, `IllegalArgumentException`, `ArithmeticException`). Usually programming errors.

## try-catch-finally
`try` holds risky code, `catch` handles a matching exception, `finally` runs for cleanup whether or not an exception occurred — even after a `return`. It may not run on `System.exit()` or abrupt JVM termination.

## throw vs throws
- `throw` actually throws an exception now: `throw new IllegalArgumentException();`
- `throws` declares a method *may* throw: `void read() throws IOException {}`

## Try-with-Resources & Custom Exceptions
`try (Resource r = ...) { }` auto-closes anything implementing `AutoCloseable` (files, streams, JDBC). Custom exceptions extend `Exception` (checked) or `RuntimeException` (unchecked).

## Overriding & Exceptions
An overriding method may throw the same or a **narrower** checked exception, or none — but **not a broader** checked exception. Unchecked exceptions aren't restricted this way.


# Collections

## The Framework ⭐
```
Iterable -> Collection -> List, Set, Queue
Map (separate hierarchy)
```

## List
Ordered, allows duplicates, index access.
- **ArrayList**: resizable array; fast random access; mid-list insert/remove shifts elements.
- **LinkedList**: doubly linked; cheap insert/remove at a known node; slow random access.
- **Vector**: legacy synchronized ArrayList — avoid in new code.

## Set
No duplicates.
- **HashSet**: no order, fast average ops.
- **LinkedHashSet**: insertion order.
- **TreeSet**: sorted, O(log n).

## Map ⭐
Key-value pairs, unique keys.
- **HashMap**: no order; allows one null key and null values; fast average lookup.
- **LinkedHashMap**: insertion (or access) order.
- **TreeMap**: sorted by key, O(log n); no null key under natural ordering.
- **ConcurrentHashMap**: thread-safe for concurrent access.

## HashMap Internals ⭐
A key's `hashCode()` picks a **bucket**; a **collision** is two keys landing in the same bucket. On `put`: compute hash -> find bucket -> compare keys with `equals()` -> insert or update. Heavily collided buckets can become tree structures.

- **hashCode()** locates the bucket; **equals()** confirms the exact key.
- **Load factor** (default 0.75) sets when the map resizes and rehashes — balances memory vs speed.

> Remember: same key `put` twice just updates the value.

## Comparable vs Comparator ⭐
- **Comparable**: natural ordering, inside the class, `compareTo()`.
- **Comparator**: custom/external ordering, `compare()` (often a lambda).

```java
class Student implements Comparable<Student> {
    public int compareTo(Student o) { return this.age - o.age; }
}
Comparator<Student> byName = (a, b) -> a.name.compareTo(b.name);
```

> Remember: Comparable = "how I compare myself"; Comparator = "how you want to compare me".

## Queue, Deque & Stack
- **Queue**: FIFO. Prefer the non-throwing methods `offer` / `poll` / `peek` over `add` / `remove` / `element`.
- **Deque**: double-ended; acts as queue or stack. **ArrayDeque** is the preferred general implementation (no nulls).
- **Stack**: LIFO. The legacy `Stack` class is discouraged — use `ArrayDeque` (`push` / `pop`).

## Arrays & Utility Classes
- **Array**: fixed size, zero-indexed, can hold primitives; arrays are objects. Default values: `int[]`->0, `boolean[]`->false, `Object[]`->null.
- **Arrays**: helpers `sort`, `toString`, `equals`.
- **Collections** (utility class): `sort`, `reverse`, `shuffle`, `binarySearch`, `max`, `min`, `frequency`, `unmodifiableList`. (`Collection` is the interface; `Collections` is the helper class.)

## Time Complexity
| Operation | ArrayList | LinkedList | HashMap | TreeMap |
|---|---|---|---|---|
| Get by index | O(1) | O(n) | — | — |
| Add at end | O(1) amort. | O(1) | — | — |
| Search / key lookup | O(n) | O(n) | O(1) avg | O(log n) |

> Remember: ArrayList = fast index; HashMap = fast key lookup; TreeMap = sorted + logarithmic.

## Common Mistakes
- Modifying a collection while iterating throws `ConcurrentModificationException` (fail-fast, not a thread-safety feature). Use `Iterator.remove()` instead.
- **Immutable collections**: `List.of()`, `Set.of()`, `Map.of()` are unmodifiable and reject nulls; structural changes throw `UnsupportedOperationException`. `List.of()` creates a new immutable list; `Collections.unmodifiableList(list)` is a read-only *view* — changes to the original still show through.


# Generics

## Generics & Type Safety
Generics let classes/methods work with types safely, giving compile-time type checks and removing casts.
```java
class Box<T> { T value; }
static <T> void print(T value) { System.out.println(value); }
```

## Wildcards & PECS
- `<?>`: unknown type.
- `<? extends T>`: T or a subtype — for **reading/producing**.
- `<? super T>`: T or a supertype — for **writing/consuming**.

> Remember: **PECS** — Producer `extends`, Consumer `super`.

## Type Erasure & Restrictions
Generic type info is largely erased at runtime — `List<String>` and `List<Integer>` are both just `List`. Consequences: can't do `new T()`, can't use primitives as type arguments (`List<int>` invalid — use `List<Integer>`), and a class's type parameter isn't available in static members.


# Functional Java & Streams

## Lambdas & Functional Interfaces ⭐
A **lambda** is a short implementation of a **functional interface** (exactly one abstract method, often marked `@FunctionalInterface`).

| Interface | Shape |
|---|---|
| Predicate\<T\> | T -> boolean |
| Function\<T,R\> | T -> R |
| Consumer\<T\> | T -> void |
| Supplier\<T\> | () -> T |
| UnaryOperator\<T\> | T -> T |
| BinaryOperator\<T\> | (T,T) -> T |

**Method reference** is shorter syntax for some lambdas: `Class::staticMethod`, `obj::instanceMethod`, `Class::instanceMethod`, `Class::new` (e.g. `list.forEach(System.out::println)`).

## Streams ⭐
A **Stream** is a lazy pipeline for processing data from a source. It does **not** store data and generally can't be reused (re-consuming throws `IllegalStateException`).

```
Source -> intermediate ops (lazy) -> terminal op (triggers)
```

- **Intermediate** (lazy): `filter`, `map`, `flatMap`, `distinct`, `sorted`, `limit`, `skip`.
- **Terminal**: `forEach`, `collect`/`toList`, `count`, `reduce`, `findFirst`/`findAny`, `anyMatch`/`allMatch`/`noneMatch`.

**Stream vs Collection**: a collection stores data and is reusable; a stream is a one-shot lazy processing pipeline.

## map vs flatMap vs filter
- `map`: transform each element (one -> one).
- `flatMap`: transform + flatten nested structures (one -> many, flattened).
- `filter`: keep elements matching a condition.

```java
users.stream().map(User::getName).toList();              // transform
users.stream().flatMap(u -> u.getOrders().stream()).toList(); // flatten
```

## reduce & Collectors Recipes
`reduce` combines many values into one: `list.stream().reduce(0, Integer::sum)`.

Common interview patterns:
```java
// group by field
Map<String,List<Emp>> byDept =
    emps.stream().collect(groupingBy(Emp::getDept));
// frequency / count per key
Map<T,Long> freq =
    list.stream().collect(groupingBy(identity(), counting()));
// partition into true/false groups
Map<Boolean,List<Emp>> parts =
    emps.stream().collect(partitioningBy(e -> e.getSalary() > 50000));
// join to a string
String csv = names.stream().collect(joining(", "));
// second highest
int second = list.stream().distinct()
    .sorted(Comparator.reverseOrder()).skip(1).findFirst().orElse(0);
// max by field
emps.stream().max(Comparator.comparing(Emp::getSalary));
```

> Remember: frequency = `groupingBy(identity(), counting())`; Nth highest = `skip(n-1)`.

## Optional ⭐
A container that may or may not hold a non-null value — makes absence explicit.
- Create: `Optional.of(x)` (x must be non-null, else NPE), `Optional.ofNullable(x)`, `Optional.empty()`.
- Read: `isPresent`, `ifPresent`, `orElse`, `orElseGet`, `orElseThrow`.
- `orElse(x)` evaluates its fallback **always**; `orElseGet(() -> x)` only when the value is absent — prefer it for expensive fallbacks.

> Remember: use Optional mainly for possibly-absent return values, not for every field/parameter.

## Parallel Streams
`parallelStream()` runs ops on multiple threads. It isn't automatically faster, and shared mutable state (e.g. adding to a plain `ArrayList`) is unsafe — collect to a result instead.


# Concurrency & Multithreading

## Basics ⭐
- **Process**: a running program with its own memory. **Thread**: a lighter execution unit inside a process.
- **Concurrency**: multiple tasks making progress over overlapping periods. **Parallelism**: tasks literally running at once on multiple cores.

## Creating Threads
Extend `Thread` and override `run`, or (preferred) implement `Runnable` and pass to a `Thread`.
```java
new Thread(() -> System.out.println("Running")).start();
```
`start()` schedules a new thread; calling `run()` directly just runs on the current thread.

## Lifecycle & sleep vs wait
States: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED.
- `Thread.sleep()`: pauses the current thread; **keeps** its locks.
- `wait()`: for coordination; **releases** the object's monitor; must be called while holding that monitor (inside `synchronized`).

## synchronized, Race Conditions, volatile ⭐
A **race condition** = result depends on thread timing on shared data (`count++` is not atomic).

- **synchronized** (method or block): mutual exclusion + visibility around the protected region.
- **Atomicity** (indivisible), **Visibility** (one thread sees another's writes), **Ordering** (what can be observed before/after).
- **volatile**: gives visibility + ordering for a variable but does **not** make `count++` atomic.

> Remember: `volatile` = visibility only; `synchronized` = locking + visibility.

## Lock & Deadlock
`ReentrantLock` gives more control than `synchronized` (`tryLock`, interruptible, explicit) but you must `unlock()` in a `finally`.

**Deadlock**: threads wait forever for locks each other holds. Four conditions: mutual exclusion, hold-and-wait, no preemption, circular wait. Prevent with consistent lock ordering and timed lock attempts.

## Executors & Futures ⭐
Prefer thread pools over manual threads — they reuse threads and separate task submission from thread management.
```java
ExecutorService ex = Executors.newFixedThreadPool(4);
Future<Integer> f = ex.submit(() -> 10);
Integer r = f.get(); // waits for the result
ex.shutdown();
```
- `execute()` takes a Runnable (no result); `submit()` returns a `Future`.
- **Future**: result of an async computation. **CompletableFuture**: composable async pipelines (`supplyAsync`, `thenApply`, `thenAccept`, `thenCompose`, `thenCombine`, `exceptionally`, `handle`).

## Concurrent Collections
- **ConcurrentHashMap**: thread-safe map for concurrent access.
- **CopyOnWriteArrayList**: good when reads far outnumber writes.
- **BlockingQueue** (ArrayBlockingQueue, LinkedBlockingQueue): producer-consumer coordination.

## Java Memory Model
The JMM defines what values threads are guaranteed to observe. **Happens-before** guarantees visibility/order: unlock before later lock on the same monitor; volatile write before later reads; `start()` before the thread's actions; a thread's actions before another returns from `join()`.


# JVM, Memory & GC

## Memory Areas ⭐
```
JVM: Heap, Stack, Metaspace, PC Register, Native Method Stack
```
- **Heap**: objects and arrays, shared across threads, GC-managed.
- **Stack**: per thread; method frames, local variables, references.
- **Metaspace**: class metadata, in native memory.
- **PC Register**: per thread, tracks the current instruction.

## Stack vs Heap
| Stack | Heap |
|---|---|
| per thread | shared |
| method frames, locals | objects / arrays |
| short-lived | may live longer |
| managed with calls | managed by GC |

```java
void test() {
    int x = 10;        // x on the stack frame
    User u = new User(); // u (reference) on stack, object on heap
}
```

## Garbage Collection
GC automatically reclaims objects no longer reachable (`u = null` makes the old object eligible). `System.gc()` is only a hint — never rely on GC timing. **Memory leaks** still happen when objects stay reachable but unused (ever-growing static collections, unremoved listeners, bad caches).

**Collectors** (names only, don't memorize internals): Serial, Parallel, G1 (default, large heaps, predictable pauses), ZGC and Shenandoah (low latency, very large heaps).

## Pass-by-Value ⭐
Java is **always pass-by-value**. For objects, the *reference value* is copied: you can mutate the object through it, but reassigning the parameter doesn't change the caller's reference.
```java
void change(User u) { u.name = "New"; }   // caller's object IS changed
void change(User u) { u = new User(); }    // caller's reference NOT changed
```

## Immutability
An immutable object's state can't change after construction (String, wrappers, many `java.time` types). To build one: make the class final, fields `private final`, set via constructor, no setters, defensively copy mutable inputs/outputs.


# Modern Java

## Records
A compact class for immutable data. Auto-generates accessors (`name()`), constructor, `equals`, `hashCode`, `toString`.
```java
record User(String name, int age) {}
```
Components are final; the record is implicitly final and can't extend a class.

## Sealed Classes
Restrict which classes may extend/implement a type — for a known, closed hierarchy.
```java
sealed class Animal permits Dog, Cat {}
```

## var
Local variable type inference — the compiler infers the static type. Not dynamic typing; only for local variables, not fields or parameters.
```java
var name = "Java"; // inferred as String
```

## switch Expressions & Pattern Matching
Arrow syntax avoids fall-through; `switch` can be an expression returning a value. Pattern matching binds and casts in one step.
```java
String r = switch (day) { case 1 -> "Mon"; default -> "Other"; };
if (obj instanceof String s) { System.out.println(s.length()); }
```

## Virtual Threads
Lightweight threads for huge numbers of concurrent, mostly-blocking (I/O) tasks. They improve scalability but don't make CPU work faster. Platform threads map ~1:1 to OS threads and are expensive.

## Feature Timeline (for "since when?")
- **8**: lambdas, streams, Optional, default methods, new Date/Time.
- **9**: modules, private interface methods, collection factory methods (`List.of`).
- **10**: `var`. **11** (LTS): String/file APIs.
- **14+**: switch expressions standard. **16**: records, `instanceof` pattern matching.
- **17** (LTS): sealed classes. **21** (LTS): virtual threads, record patterns, sequenced collections.


# Practical Java

## Enums
A type with a fixed set of constants; can have fields, methods, and constructors.
```java
enum Status { NEW("New"), DONE("Done"); final String label; Status(String l){ label = l; } }
```

## Inner & Anonymous Classes
A class inside a class. Types: member inner, static nested (no outer object needed), local, anonymous. An **anonymous class** is a one-off unnamed class — often replaced by a lambda for functional interfaces.

## Varargs & instanceof
- **Varargs** `String... names`: variable number of args, treated as an array; must be the last and only varargs parameter.
- **instanceof** checks an object's type (`null instanceof X` is always `false`).

## I/O & NIO
- Classic I/O: byte streams (`InputStream`/`OutputStream`) for binary, character streams (`Reader`/`Writer`) for text; buffered variants reduce expensive underlying operations.
- **NIO** (`java.nio`): `Path`, `Files`, channels, buffers — e.g. `Files.readString(Path.of("a.txt"))`.

## JDBC
Java API to run SQL against relational databases: `Connection` -> `PreparedStatement`/`Statement` -> `ResultSet`. Prefer **PreparedStatement** (parameterized `?`) over building SQL strings — it prevents SQL injection and handles params safely. Wrap resources in try-with-resources.

## Serialization, Reflection, Annotations
- **Serialization**: object state <-> byte stream (`implements Serializable`); `transient` fields are skipped. Native serialization has security concerns — JSON is often preferred.
- **Reflection**: inspect/use classes, methods, fields at runtime (`User.class`). Used by frameworks, DI, ORM; costs compile-time safety and speed.
- **Annotations**: metadata (`@Override`, `@Deprecated`, `@FunctionalInterface`). They do nothing by themselves — frameworks read and act on them.

## Interview Terminology
**POJO** plain Java object · **DTO** carries data between layers · **Entity** persistent/domain object · **DAO / Repository** data-access abstraction · **VO** value object (identity by attributes) · **Idempotent** repeating gives the same result · **Reentrant** a thread can re-acquire a lock it holds · **Coupling** inter-dependency · **Cohesion** how related a component's responsibilities are.


# Common "Why X vs Y?" Comparisons

When asked "why do we need X when Y exists?", answer: what Y solves, what X solves differently, X's advantage, a tiny example, a one-liner.

## Interface vs Abstract Class ⭐
Abstract class shares state + common implementation for closely related classes; interface is a contract unrelated classes can implement. A class extends one class but implements many interfaces.
> Remember: abstract class = what you ARE + shared state; interface = what you CAN DO.

## == vs equals() ⭐
| `==` | `equals()` |
|---|---|
| same object/reference (objects); value (primitives) | logical/content equality |

## equals() vs hashCode()
`hashCode()` quickly finds the bucket; `equals()` confirms the exact match. Hash collections need both. Equal objects must share a hash code; equal hash codes don't imply equal objects.

## String vs StringBuilder vs StringBuffer
| | Mutable? | Thread-safe? |
|---|---|---|
| String | no (immutable) | yes (immutable) |
| StringBuilder | yes | no — preferred |
| StringBuffer | yes | yes (synchronized) |

> Remember: few changes -> String; many changes -> StringBuilder; need sync -> StringBuffer.

## ArrayList vs LinkedList
ArrayList = dynamic array, fast random access, slow mid-list insert. LinkedList = linked nodes, cheap insert/remove at a known node, slow random access.

## ArrayList vs Array
Array: fixed size, holds primitives, indexed. ArrayList: resizable, holds objects, collection methods.

## List vs Set vs Map
List = ordered sequence with duplicates; Set = unique values, no key; Map = key -> value association.

## HashMap vs LinkedHashMap vs TreeMap
No guaranteed order vs insertion/access order vs sorted-by-key (O(log n)).

## HashMap vs ConcurrentHashMap
HashMap is not thread-safe; ConcurrentHashMap is built for concurrent access.

## Comparable vs Comparator
Natural ordering inside the class (`compareTo`) vs external custom ordering (`compare`). One class can have one natural order but many comparators.

## Checked vs Unchecked Exceptions
Compiler forces handling/declaring checked exceptions (recoverable conditions); unchecked (RuntimeException) usually signal programming errors and aren't forced.

## Overloading vs Overriding ⭐
| Overloading | Overriding |
|---|---|
| same class, different params | parent-child, same signature |
| compile-time | runtime |
| return type alone insufficient | same/covariant return |
| static can overload | static is hidden, not overridden |

## throw vs throws / final vs finally vs finalize
`throw` = action (throws now); `throws` = declaration. `final` = restriction; `finally` = cleanup block; `finalize` = deprecated old cleanup.

## volatile vs synchronized
volatile = visibility/order for a variable (not atomic compound ops); synchronized = mutual exclusion + visibility for a region.

## Thread vs ExecutorService
A raw Thread is one worker you manage; ExecutorService manages creation, reuse, scheduling, and pool lifecycle.

## Stream vs for-loop / Optional vs null
Stream = declarative pipeline (not always faster); for-loop = explicit control. Optional = absence made explicit and harder to misuse; null = absence represented directly, easy to dereference.

## Stack vs ArrayDeque
`Stack` is legacy; `ArrayDeque` is the preferred stack/deque implementation.

## orElse() vs orElseGet()
`orElse(x)` always evaluates the fallback; `orElseGet(() -> x)` evaluates it only when the value is absent — cheaper for expensive fallbacks.
