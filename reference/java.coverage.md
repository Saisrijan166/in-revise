# Coverage: Java
Reference: reference/java.md  ·  Last updated: 19-10-2026

Every numbered section (1–156) and every "why do we need X if Y already exists?" question (why-Q1 to why-Q30) appears in exactly
one of Mapped, Corrected or Dropped. Items of section 155 ("20 things to remember") are folded into the row for 155. Baseline for
corrections: Java 25 (LTS). Sources for corrections are primary pages (Java SE 25 API, JLS/JVMS 25, JEPs, Oracle guides).

## Mapped
| Reference item (number + short title) | Landed in | Note |
|---|---|---|
| 2. Java Program Structure | concept jdk-jre-jvm (example: class + main) | Packages, imports and FQN belong to access-modifiers (oop-a); constructor and default constructor to constructors (oop-a); class vs object to classes-objects (oop-a) |
| 3. Variables | concept data-types (local variables have no default: point, Interview Q; field defaults: table) | Instance, static and parameter kinds belong to classes-objects and static-keyword (oop-a) |
| 5. Type Casting | concept data-types (widening / narrowing points, tree nodes) | Upcasting, downcasting and ClassCastException belong to polymorphism (oop-b); linked |
| 6. Operators | concept operators-control-flow (&& vs &, point, Interview Q; tree node) | The plain operator lists (arithmetic, relational, bitwise, shift, ternary) were cut as not interview-worthy; kept only the traps |
| 7. OOP Fundamentals | concept oop-principles (table, points, trap) | details of inheritance, polymorphism and abstraction linked to oop-b concepts |
| 8. Classes and Objects | concept classes-objects (diagram, trap: copying a reference) |  |
| 9. Access Modifiers | concept access-modifiers (table, Interview Q on top-level classes) |  |
| 10. Methods | concept classes-objects (signature point, Interview Q); tree method-signature | "pass-by-value" lines are owned by pass-by-value (basics); "void" detail dropped as trivial |
| 11. Method Overloading | concept polymorphism (points, Interview Q), comparison overloading-vs-overriding, tree method-overloading |  |
| 12. Method Overriding | concept polymorphism (points), comparison overloading-vs-overriding, tree method-overriding, override-annotation |  |
| 13. Overloading vs Overriding | comparison overloading-vs-overriding |  |
| 16. Constructors | concept constructors (points, trap, Interview Qs); tree default-constructor, constructor-chaining, private-constructor |  |
| 17. static | concept static-keyword (points, example); tree static-field, static-method, static-block, static-import | "one copy per class loading context" dropped as advanced (class loaders) |
| 19. Abstract Classes | concept abstract-classes-interfaces (point, Interview Q), tree abstract-class, abstract-method |  |
| 21. Abstract Class vs Interface | comparison abstract-class-vs-interface |  |
| 22. Multiple Inheritance | concept inheritance (points, trap, Interview Q) |  |
| 23. Diamond Problem | concept inheritance (point, example), tree diamond-problem |  |
| 24. Encapsulation and Getters/Setters | concept oop-principles (example, Interview Q); glossary getter, setter, encapsulation |  |
| 25. Object Class | concept object-class-equals-hashcode (point), tree tostring-method, final-object-methods, clone-method |  |
| 26. == vs equals() | comparison equals-vs-double-equals; concept example |  |
| 27. equals() and hashCode() | concept object-class-equals-hashcode (points, trap, Interview Q) |  |
| 28. String | concept strings (points: immutable, why immutable; trap); tree node string-class |  |
| 29. String Pool | concept strings (diagram, example, Interview Q on new String); tree nodes string-pool, string-intern |  |
| 30. StringBuilder vs StringBuffer | comparison string-vs-stringbuilder-vs-stringbuffer; concept strings (point) |  |
| 31. Wrapper Classes | concept wrapper-classes (Why, Interview Q); tree node wrapper-class |  |
| 32. Autoboxing and Unboxing | concept wrapper-classes (points, example, Interview Q); tree nodes autoboxing, unboxing |  |
| 34. Exception Handling | concept exception-hierarchy (points, Compare diagrams); glossary exception-java, throwable, error-class; tree throwable, error-class | Error worded as the API does: "serious problems an app should not try to catch" (not only JVM problems) |
| 36. try-catch-finally | concept try-catch-finally (Steps, points, Interview Q "Does finally always run?"); tree try-block, catch-block, finally-block | Added catch order, return-in-finally trap |
| 37. throw vs throws | comparison throw-vs-throws; concept throw-throws-custom (points); tree throw-keyword, throws-clause | Added "throws is optional for unchecked" (JLS 8.4.6) |
| 38. Try-with-Resources | concept try-catch-finally (points, Steps, Interview Q, example); tree try-with-resources, autocloseable | Added Java 7 date, reverse close order, suppressed exceptions, Java 9 form |
| 39. Custom Exceptions | concept throw-throws-custom (points, example, Interview Q); tree custom-exception and its two children | Reference example had no cause constructor; the site's example keeps the cause |
| 40. Collections Framework | concept collections-framework (hierarchy diagram, hook, sayIt); tree collection-interface, map-interface | Class list spread over the unit's concepts |
| 41. List | concept list-arraylist (points, Interview Q ArrayList vs Vector); tree arraylist, linkedlist, vector |  |
| 47. Queue | concept queue-deque (method table, points, Interview Q offer vs add); tree queue-interface |  |
| 48. Deque | concept queue-deque (points, stack bullet); tree deque-interface, arraydeque |  |
| 49. Stack | concept queue-deque (point, Example); tree stack-class |  |
| 50. Collections Utility Class | concept collections-framework (point, Interview Q Collection vs Collections); tree collections-class; glossary collections-class |  |
| 51. Arrays | concept collections-framework (Arrays.asList point); concept list-arraylist (array vs ArrayList point); tree arrays-class, java-array | Array element default values not repeated here (see open question 1) |
| 52. Generics | concept generics (hook, points, How table); tree generic-class, generic-method |  |
| 53. Wildcards | concept generics (How table, PECS point, Interview Q); tree wildcard and its three children; glossary wildcard, pecs |  |
| 54. Type erasure | concept generics (point, bullet, Interview Q); tree type-erasure; glossary type-erasure | "largely erased" made exact: type arguments are removed after compile-time checks |
| 55. Enum | concept enums |  |
| 56. Record | concept records-sealed (points), tree record-class | "shallowly immutable" added (Record API) |
| 57. Sealed Classes | concept records-sealed (points), tree sealed-class, sealed-subclass-modifiers | version and final/sealed/non-sealed rule added |
| 58. Lambda expressions | concept lambdas (hook, points); glossary lambda-expression, functional-interface, functional-interface-annotation |  |
| 59. Functional interfaces | concept lambdas (How table); tree functional-interface children | UnaryOperator/BinaryOperator kept in the table only |
| 60. Method reference | concept lambdas (bullet, Interview Q); tree method-reference and its four children; glossary method-reference |  |
| 61. Stream API | concept streams (hook, Why, diagram); glossary stream-api |  |
| 65. Optional | concept optional (hook, How table, points) |  |
| 66. Date and Time API | concept date-time (all); tree date-time children; glossary java-time, local-date, instant-class, duration-class, period-class |  |
| 67. Multithreading (process, thread, concurrency, parallelism) | concept threads (point, Interview Q); glossary process-term, thread-term, parallelism |  |
| 68. Creating Threads | concept threads (point, trap, example); tree runnable-task | start() vs run() is the trap |
| 69. Thread Lifecycle | concept threads (diagram); tree thread-states | added that a woken wait() passes through BLOCKED |
| 70. sleep() vs wait() | comparison sleep-vs-wait; tree thread-sleep, object-wait | added: wait() releases only that object's monitor; loop for spurious wakeups |
| 71. synchronized | concept synchronization (points, example, Interview Q); comparison synchronized-vs-volatile |  |
| 72. Race Condition | concept synchronization (point); tree race-condition; glossary |  |
| 73. Atomicity, Visibility, Ordering | concept synchronization (trap); glossary atomicity, memory-visibility | the vague "ordering" line is replaced by happens-before |
| 74. Lock | concept locks-deadlock (points, example); comparison synchronized-vs-reentrantlock |  |
| 75. Deadlock | concept locks-deadlock (diagram, point, bullets) |  |
| 76. ExecutorService | concept executors (hook, example) |  |
| 77. Thread Pool (types, submit vs execute) | concept executors (point); tree executors-factories | list completed with single-thread executor |
| 78. Future | concept executors (point); comparison future-vs-completablefuture |  |
| 79. CompletableFuture | concept completable-future; tree children |  |
| 80. Concurrent Collections | concept concurrent-collections (table, example); tree children |  |
| 82. Stack vs Heap | comparison `stack-vs-heap` (embedded in concept `jvm-memory`); `jvm-memory` example | The code example is rewritten, not copied |
| 83. Garbage Collection | concept `garbage-collection` (hook, trap on System.gc(), example); tree `system-gc` |  |
| 84. Memory Leak in Java | concept `garbage-collection` (Leak point, Interview Q); tree `memory-leak-java`, `static-collection-leak`, `threadlocal-leak` | "Unremoved listeners/callbacks" left out: no primary source found in this pass (see Open questions). "Incorrect caches" and "long-lived references" are folded into the static collection/cache node |
| 85. Class Loading | concept `class-loading-jit` (Steps, points, trap); tree `class-loaders` (3 loaders), `linking-phase` (3 steps), `class-initialisation` |  |
| 86. JVM Execution | concept `class-loading-jit` (Run step, Interview Q on JIT); tree `interpreter-jvm`, `jit-compiler`, `c1-compiler`, `c2-compiler` |  |
| 88. Immutability | concept immutability (Steps, points, example), tree immutable-jdk-classes | wrapper classes not listed: kept to classes whose API docs say immutable |
| 89. Pass-by-Value | concept pass-by-value (all parts) |  |
| 90. Inner Classes | concept inner-classes (table, points, Interview Q); tree static-nested-class, inner-class, local-class |  |
| 91. Anonymous Class | concept inner-classes (table, trap on this, Interview Q); tree anonymous-class | lambda side owned by lambdas (functional unit) |
| 92. Packages and Imports | concept access-modifiers (points, bullets, Interview Q); tree java-package, import-declaration |  |
| 93. Java Access Across Packages | concept access-modifiers (table) |  |
| 94. protected Confusing Point | concept access-modifiers (trap, example) |  |
| 95. Interface Default/Static/Private Methods | concept abstract-classes-interfaces (point), tree default-method, static-interface-method, private-interface-method | versions added: Java 8 (default, static), Java 9 (private) |
| 96. Java Memory Model Basics | concept synchronization (How it works bullets); glossary happens-before, java-memory-model |  |
| 97. Serialization | concept serialization (hook, points, trap, example); glossary serialisation, serializable, transient-keyword |  |
| 98. Reflection | concept reflection-annotations (points, table, Interview Q 1); glossary reflection | "ORM" use given as "persistence" |
| 99. Annotations | concept reflection-annotations (points, How it works, example); tree annotation-retention, annotation-target; glossary annotation |  |
| 100. instanceof | tree instanceof-pattern; records-sealed point | version added (Java 16) |
| 101. Null | concept data-types (reference types hold null; table); comparison primitive-vs-wrapper (can be null row) | NullPointerException as an exception belongs to exception-hierarchy |
| 102. String Comparison | concept strings (trap, example) | Objects.equals belongs to object-class-equals-hashcode (oop-b) |
| 103. switch | concept operators-control-flow (table, trap, example, Interview Q) |  |
| 104. break, continue, return | concept operators-control-flow (bullet; tree node labelled-break) | Labelled break added |
| 105. Varargs | concept classes-objects (point, example, Interview Q); tree varargs |  |
| 106. Static vs Instance | comparison static-vs-instance (embedded in static-keyword) |  |
| 107. Composition vs Inheritance | comparison inheritance-vs-composition; concept inheritance (Interview Q) |  |
| 109. SOLID Principles | concept solid-principles (table, example, Interview Qs); tree five principle nodes; glossary solid |  |
| 110. Dependency Injection | tree dependency-injection; concept design-patterns (Interview Q 3); concept solid-principles (D row, example); glossary dependency-injection-term | Spring wiring is out of scope |
| 111. Design Patterns Commonly Asked | concept design-patterns (points); tree creational / structural / behavioural nodes with JDK examples | Repository dropped, see Dropped |
| 112. Singleton Basics | concept design-patterns (How it works table, example, trap, Interview Qs 1–2); tree singleton-pattern |  |
| 113. Java I/O | concept java-io (points, table, Interview Q 1); tree byte-streams, character-streams; glossary input-stream |  |
| 114. Buffered I/O | concept java-io (point, Interview Q 2); tree buffered-streams; glossary buffered-reader |  |
| 116. JDBC | concept jdbc (hook, points, Why it exists); tree jdbc-driver; glossary jdbc-api |  |
| 117. JDBC Flow | concept jdbc (Steps, Interview Q 1); glossary prepared-statement, result-set | DataSource added as the preferred way |
| 118. Statement vs PreparedStatement | comparison statement-vs-preparedstatement; tree jdbc-statement, jdbc-prepared-statement; glossary sql-injection |  |
| 119. try-with-resources and JDBC (part) | concept try-catch-finally (reverse close order only); concept jdbc (Steps "Close", example) | JDBC usage is owned by `jdbc` try-with-resources rules themselves are owned by try-catch-finally |
| 120. Important Java Keywords: transient (skim) | glossary transient-keyword |  |
| 121 / 153 lines on abstract classes, interfaces, overriding (constructor in abstract class, interface variables, private/static/final methods) | abstract-method tree note, polymorphism points, abstract-classes-interfaces Interview Q | all checked true |
| 122 lines: JDK vs JRE vs JVM, String vs StringBuilder; 152: JDK vs JRE vs JVM?, bytecode?, why is main static?, String immutable?, String pool?, StringBuilder vs StringBuffer?; 156: one-liners on JDK/JRE/JVM, String, pass-by-value | the concepts above (Interview Qs, hooks); comparison hashmap-vs-concurrenthashmap | Skimmed lines only; the sections themselves are owned by other units skimmed section |
| 123. Time Complexity of Common Collections | concept collections-framework (Big-O table in Example, the one owner of this table) | Added PriorityQueue row; TreeMap row merged with TreeSet |
| 124. Common Collection Mistakes | concept collections-framework (trap, Example code, Interview Q fail-fast) |  |
| 126. Collections.unmodifiableList() vs List.of() | comparison list-of-vs-unmodifiable-list; tree list-of-factory, unmodifiable-view |  |
| 127. Generics: important restrictions | concept generics ("Not allowed" point, Interview Q on primitives) | static T field included |
| 128. Exception Rules in Overriding | concept polymorphism (point, Interview Q), comparison row "Checked exceptions" |  |
| 129. Covariant Return Type | tree covariant-return-type; polymorphism example; glossary | since Java 5 (JLS example), not shown in UI |
| 131. null and instanceof | concept records-sealed (Interview Q), tree instanceof-pattern |  |
| 133. Integer Division | concept data-types (point, example) |  |
| 134. Overflow | concept data-types (point, example, Interview Q) | Math.addExact added |
| 135. String + Operator | concept strings (example: 1 + 2 + "J") |  |
| 136. ArrayList vs Array | concept list-arraylist (point, Example, Interview Q) |  |
| 137. Primitive vs Wrapper | comparison primitive-vs-wrapper |  |
| 138. StringBuilder Important Methods | tree nodes sb-append, sb-insert, sb-delete, sb-reverse, sb-tostring |  |
| 139. Functional programming terms | functional interface, lambda, stream: glossary; side effect: streams point | "pure function" and "higher-order operation" left out: general FP words, not Java terms interviewers press on |
| 140. map() vs flatMap() | comparison map-vs-flatmap; tree map-operation, flatmap-operation |  |
| 141. map() vs filter() | concept streams (operations bullet), lambdas (Predicate row) | too simple for its own comparison |
| 142. reduce() | concept streams (bullet); tree reduce-operation; glossary reduce-operation | added: the function must be associative |
| 143. Parallel stream | concept streams (trap); tree parallel-stream; glossary parallel-stream |  |
| 144. Common stream mistake | concept streams (Interview Q 3, side-effects point) | reference's "better" code has a no-op `.map(x -> x)`; site uses plain `toList()` |
| 145. Optional mistakes | concept optional (trap, Interview Q 3) |  |
| 146. orElse() vs orElseGet() | comparison orelse-vs-orelseget; concept optional (Interview Q 2) |  |
| 150. JVM vs JIT vs GC (JIT named only) | concept jdk-jre-jvm (bullet + Interview Q, link to class-loading-jit); comparison `jvm-vs-jit-vs-gc` | The rest belongs to the jvm unit |
| 151. Thread-safe, Reentrant (terms) | glossary reentrancy; concept synchronization (point); glossary serialisation, reflection | skimmed section |
| 152. High-frequency questions (exceptions lines: checked vs unchecked, throw vs throws, finally, finally after return, custom exception, try-with-resources) | Interview Qs across the three concepts; Interview Qs in threads, synchronization, executors, completable-future | Skimmed only; lead may dedupe skimmed section |
| 153. Most important can / cannot rules | split: points and traps of each concept |  |
| 154. Java interview mental model | story spine (18 steps, problem → fix) |  |
| 156. One-line lines on sleep/wait, synchronized/volatile, executors, futures | hooks and gists of the matching concepts and comparisons; `jvm-memory` points; `garbage-collection` hook; `class-loading-jit` hook; concept solid-principles (hook) | skimmed section Other lines of 156 belong to other units |
| why-Q1. Abstract Class vs Interface — Why Interface? | concept abstract-classes-interfaces (Interview Q) |  |
| why-Q2. Why Interface if We Can Just Use a Normal Class? | concept abstract-classes-interfaces (Interview Q "Why declare variables with the interface type?") | merged with why-Q20 |
| why-Q3. Why Abstract Class if Interface Exists? | concept abstract-classes-interfaces (trap) |  |
| why-Q4. Why Java Doesn't Support Multiple Class Inheritance? | concept inheritance (Interview Q) | The Java Tutorials also name inheriting fields (state) as a reason, not only method ambiguity; both stated |
| why-Q5. Why String is immutable? | concept strings (Interview Q) |  |
| why-Q6. Why StringBuilder if String already exists? | concept strings (point "+= in a loop") |  |
| why-Q7. Why equals() if == Already Exists? | concept object-class-equals-hashcode (Why it exists, comparison) |  |
| why-Q8. Why hashCode() if equals() Already Exists? | concept object-class-equals-hashcode (How bullet, Interview Q) | bucket detail left to map-hashmap |
| why-Q9. Why ArrayList if Array already exists? | concept list-arraylist (Interview Q) |  |
| why-Q10. Why HashSet if ArrayList already exists? | concept set-hashset-treeset (Interview Q) |  |
| why-Q11. Why HashMap if HashSet already exists? | concept map-hashmap (Interview Q) |  |
| why-Q12. Why LinkedHashMap if HashMap already exists? | concept map-hashmap (Interview Q); comparison hashmap-vs-linkedhashmap-vs-treemap | Merged with why-Q13 into one question |
| why-Q13. Why TreeMap if HashMap already exists? | concept map-hashmap (Interview Q); comparison hashmap-vs-linkedhashmap-vs-treemap |  |
| why-Q15. Why checked exceptions if runtime exceptions already exist? | concept exception-hierarchy (Interview Q, point "Which to use"); comparison checked-vs-unchecked (verdict) | Matches Oracle's tutorial rule |
| why-Q16. Why finally if catch already exists? | concept try-catch-finally (Interview Q "Does finally always run? Why not clean up in catch?") |  |
| why-Q17. Why throw and throws both? | concept throw-throws-custom (Interview Q) |  |
| why-Q18. Why final if const exists in other languages? | concept final-keyword (Interview Q) | added that const is a reserved but unused keyword (JLS 3.9) |
| why-Q19. Why static if objects already exist? | concept static-keyword (Interview Q) |  |
| why-Q20. Why Interface Reference Instead of Concrete Class? | concept abstract-classes-interfaces (point "Program to it", Interview Q) |  |
| why-Q21. Why Dependency Injection? | concept design-patterns (Interview Q 3) | UPI / card example kept as an idea, reworded |
| why-Q22. Why volatile if synchronized exists? | concept synchronization (Interview Q) |  |
| why-Q23. Why ExecutorService if Thread already exists? | concept executors (Interview Q) |  |
| why-Q24. Why Stream if for-loop already exists? | concept streams (Interview Q 1) |  |
| why-Q25. Why Optional if null already exists? | concept optional (Interview Q 1, Why) |  |
| why-Q26. Why StringBuilder if StringBuffer already exists? | comparison string-vs-stringbuilder-vs-stringbuffer (verdict) |  |
| why-Q27. Why ArrayDeque if Stack already exists? | concept queue-deque (Interview Q) |  |
| why-Q28. Why super if inheritance already exists? | concept this-super (Interview Q) |  |
| why-Q29. Why this if we can directly use variables? | concept this-super (Interview Q) |  |
| why-Q30. Why Upcasting if Child Object Already Exists? | concept polymorphism (Interview Q), tree upcasting |  |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| 1. Java Basics; 1. Java Basics (main) | Shows JDK containing a JRE as something you install; outdated; "public: JVM must access it; static: JVM calls it without an object" stated as rules; outdated for Java 25 | Oracle offers no separate JRE since JDK 11; only the JDK, and jlink builds small runtimes; The classic form is still valid, but since Java 25 main may be an instance method, non-public (not private) and take no parameters | https://www.oracle.com/java/technologies/javase/11-relnote-issues.html ; https://docs.oracle.com/javase/specs/jls/se25/html/jls-12.html#jls-12.1.4 |
| 4. Data Types | "char: 16-bit Unicode character" | char is a 16-bit unsigned UTF-16 code unit (one character outside the BMP takes two) | https://docs.oracle.com/javase/specs/jls/se25/html/jls-4.html#jls-4.2 |
| 14. this Keyword | "this() must be the first statement in a constructor" is outdated | Since Java 25, statements that do not use this may come before this(...) or super(...); at most one such call per constructor | https://openjdk.org/jeps/513 |
| 15. super Keyword | "super() must be the first constructor statement" is outdated | Same as above; kept "neither this nor super in static code" as the trap | https://docs.oracle.com/javase/specs/jls/se25/html/jls-8.html#jls-8.8.7 |
| 18. final | "finalize(): old deprecated method" has no version | Deprecated since Java 9, deprecated for removal since Java 18 (JEP 421); no guarantee it ever runs | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Object.html#finalize() |
| 20. Interfaces ("Cannot normally be instantiated directly") | "normally" suggests an exception exists; an interface can never be instantiated (an anonymous class is a class that implements it) | "An interface has no constructors"; abstract classes "cannot be created with new" | https://docs.oracle.com/javase/specs/jls/se25/html/jls-9.html |
| 33. Integer Caching | "commonly caches a range including -128 to 127"; loose | The JLS guarantees the same object for boxed -128 to 127; Integer.valueOf always caches that range; HotSpot can raise the top with -XX:AutoBoxCacheMax | https://docs.oracle.com/javase/specs/jls/se25/html/jls-5.html#jls-5.1.7 |
| 35. Checked vs Unchecked Exceptions | Said unchecked = "runtime exceptions" (leaves out Error), and "Unchecked → runtime problem" implies checked ones are not run-time events | Unchecked = RuntimeException, Error and their subclasses; every exception is thrown at run time, "checked" only means compiler-checked (trap). Examples kept: IOException, SQLException, NullPointerException, IllegalArgumentException; ArithmeticException and IndexOutOfBoundsException left out for brevity | https://docs.oracle.com/javase/specs/jls/se25/html/jls-11.html#jls-11.1.1 |
| 42. Set | "TreeSet: typically O(log n)" understates the spec | TreeSet guarantees log(n) for add, remove, contains | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/TreeSet.html |
| 43. Map | "TreeMap: typically O(log n)" understates the spec | TreeMap guarantees log(n) for containsKey, get, put, remove | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/TreeMap.html |
| 44. HashMap Internals | "Modern Java can use tree structures" is vague (no version, no condition) | Since Java 8 (JEP 180); in OpenJDK a bucket of 8+ nodes becomes a red-black tree only if capacity is 64 or more, otherwise the table resizes; the O(log n) gain applies to Comparable keys | https://openjdk.org/jeps/180 ; https://github.com/openjdk/jdk25u/blob/master/src/java.base/share/classes/java/util/HashMap.java |
| 45. HashMap Capacity and Load Factor | "Default load factor is commonly 0.75" is loose; no default capacity; "grows" has no size | The HashMap default is exactly 0.75 with capacity 16; on resize the table gets about twice the buckets (exactly double in OpenJDK) | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/HashMap.html |
| 46. Comparable vs Comparator | Example `return this.age - other.age;` can overflow and flip the sign | `Integer.compare(this.age, other.age)` or `Comparator.comparingInt` (trap) | https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.18.2 |
| 62. Intermediate stream operations | "Intermediate operations are generally lazy" | They are always lazy; nothing runs until the terminal operation | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/stream/package-summary.html |
| 63. Terminal stream operations | "toList() produces a list result": no version, no mutability | `Stream.toList()` is Java 16+ and returns an unmodifiable list (`Collectors.toList()` promises nothing about mutability) | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/stream/Stream.html |
| 64. Stream vs Collection | Second `s.count()` stated to always throw IllegalStateException | The API says an implementation *may* throw it when it detects reuse; detection is not guaranteed. Site says "single use, get a new stream" | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/stream/Stream.html |
| 81. JVM Memory | Lists Metaspace as one of the JVM's areas next to heap and stack. The JVM spec names the shared class-data area the method area; Metaspace is HotSpot's native-memory implementation (Java 8+, replacing PermGen) | Bullet: "the method area (class data; HotSpot keeps it in Metaspace)"; tree `metaspace` with child `permgen`; glossary `method-area` | https://docs.oracle.com/javase/specs/jvms/se25/html/jvms-2.html ; https://openjdk.org/jeps/122 |
| 87. Garbage Collectors | G1 described only as "designed for large heaps", and no default given. Oracle's guide says G1 scales from small machines to large ones and is the default on most configurations (server machines since Java 9; all machines from Java 27). ZGC described as only for "very large heaps"; the guide says it works from a few hundred MB up to 16 TB. Shenandoah is not in Oracle's GC guide (it is an OpenJDK collector) | Collectors table in `garbage-collection`; tree notes on `g1-collector`, `zgc-collector`, `shenandoah-gc`, `serial-gc` | https://docs.oracle.com/en/java/javase/25/gctuning/available-collectors.html ; https://openjdk.org/jeps/248 ; https://openjdk.org/jeps/523 ; https://openjdk.org/jeps/379 |
| 108. Association, Aggregation, Composition | "Aggregation: parts can exist independently" is stated as a rule; UML says the meaning of shared aggregation varies by modeller and only defines that composite parts are deleted with the whole | Aggregation: a looser whole-part link whose parts are not deleted with the whole; composition: parts deleted with the whole | https://www.omg.org/spec/UML/2.5.1/PDF (9.5.3 AggregationKind) |
| 115. NIO | Called NIO "modern" with no versions; its example (`Path.of`, `Files.readString`) silently needs Java 11 | Path and Files are NIO.2, Java 7; `Path.of`, `Files.readString` and `writeString` are Java 11; stated in the table and tree | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/nio/file/Files.html |
| 125. Immutable Collections | "Structural modification generally throws" is too weak: List.of also blocks set() | Every mutator (add, remove, set) always throws UnsupportedOperationException; nulls throw NPE; Set.of rejects duplicates | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/List.html |
| 130. Initialization Order | "instance initialisers run before the constructor body" is loose, and the order line mixes class and object steps | Steps: class init once (parent first), defaults, super(...) part, child initialisers in source order, then the rest of the body; Java 25 prologue runs before super(...) | https://docs.oracle.com/javase/specs/jls/se25/html/jls-12.html#jls-12.5 |
| 132. switch and null | Vague: "depends on the form/version" | A switch whose value is null throws NullPointerException unless it has a case null label (Java 21, JEP 441) | https://openjdk.org/jeps/441 |
| 147. Modern Java Features to Know | Stops at Java 21, missing the Java 25 LTS. Vague "Java 14+" and "Java 16+" lines and "useful String/file APIs" for Java 11. Implies records etc. are Java 17 features | LTS table with the exact release each feature became final (switch expressions 14, text blocks 15, records and instanceof patterns 16, sealed 17); Java 11 row names HttpClient (JEP 321) and single-file launch (JEP 330); Java 25 row added; trap about Java 17 | https://docs.oracle.com/en/java/javase/25/language/java-language-changes-release.html ; https://openjdk.org/projects/jdk/11/ ; https://openjdk.org/projects/jdk/25/ |
| 148. var | Vague: "certain local contexts"; no version | Java 10; only local variables with an initializer and for-loop variables; no `var x = null`; var is a reserved type name, not a keyword | https://openjdk.org/jeps/286 |
| 149. Virtual Threads | Platform thread "mapped more directly" to an OS thread is vague; no version, no JEP, nothing on pinning | Platform threads are typically mapped 1:1 to OS threads; virtual threads final in Java 21 (JEP 444); synchronized no longer pins since Java 24 (JEP 491) | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Thread.html ; https://openjdk.org/jeps/444 ; https://openjdk.org/jeps/491 |
| 155.18 final | "cannot be changed" overstates it | final stops reassignment, not changes to the object a reference points to (trap) | https://docs.oracle.com/javase/specs/jls/se25/html/jls-4.html#jls-4.12.4 |
| why-Q14. Why Comparable and Comparator both? | Same subtraction compareTo as section 46 | Integer.compare; question kept as Interview Q in comparable-comparator | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Integer.html |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| Instance main methods and compact source files (Java 25, JEP 512) | concept jdk-jre-jvm (bullet, example, Interview Q); tree node instance-main-method | Final in the baseline Java 25; changes the classic "why is main static" answer |
| Source-file mode `java Hello.java` (Java 11, JEP 330) | tree node source-file-mode | Common way to run one file; asked with "how does Java run" |
| Numeric promotion (byte + byte is int) | concept data-types (bullet); tree node numeric-promotion | Classic compile-error question |
| Widening int to float can lose precision | tree node widening-conversion | The reference implies widening never loses data |
| Literal suffixes L and f; default int / double literal types | concept data-types (bullet) | Needed to explain overflow and casting examples |
| Math.addExact | concept data-types (Interview Q) | The usual follow-up to the overflow question |
| Compound assignment hides a cast | concept operators-control-flow (point, example) | Frequent output trap (short s += 4.6) |
| i++ vs ++i | concept operators-control-flow (point, example) | Most common operator question |
| switch expression must be exhaustive; yield; case 1, 7 -> | concept operators-control-flow (table, bullet) | Part of the Java 14 switch answer |
| Labelled break | concept operators-control-flow (bullet; tree node) | Asked with break vs continue |
| Constant expressions are pooled; run-time concatenation is not | concept strings (bullet, trap) | Explains when == on strings is true |
| String pool moved to the main heap in JDK 7 | tree node string-pool | Common "where is the string pool" question |
| new String("Java") object count | concept strings (Interview Q) | Very common interview question |
| StringBuilder capacity 16; append(null) adds "null"; equals not overridden | tree nodes string-builder, sb-append; comparison row | Short, sourced facts that interviewers ask |
| Integer == int unboxes; Integer constructors deprecated since Java 9 | concept wrapper-classes (bullet, point) | Completes the == trap; current API status |
| Arrays and immutable objects as arguments | concept pass-by-value (bullets) | Common follow-ups to the pass-by-value question |
| Flexible constructor bodies (JEP 513, Java 25) | concept constructors (point, bullet); tree flexible-constructor-body | Changes the long-taught "super() must be first" rule in the baseline version |
| Instance main methods (JEP 512, Java 25) | concept static-keyword (Interview Q "Why is main static?") | Section 152 asks it; the answer changed in Java 25 |
| Module import declarations (JEP 511, Java 25) | concept access-modifiers (bullet); tree module-import | New import form in the baseline version |
| Inner classes may declare static members (Java 16, JEP 395) | concept inner-classes (point) | Older guides, including the Java Tutorials, still say they cannot |
| protected access only through the subclass's own type | concept access-modifiers (trap, example) | Precise form of item 94, from JLS 6.6.2.1 |
| Blank final fields | concept final-keyword (example, Interview Q); tree blank-final | Common "can a final field be set in the constructor?" question |
| import has no run-time cost | concept access-modifiers (Interview Q) | Common question; JVMS 4.2.1 shows class files store full names |
| private constructor | concept constructors (Interview Q); tree private-constructor | Common question; links to singleton in design-patterns |
| Overload chosen by compile-time type (print(Object) vs print(String)) | polymorphism trap and example | the most common overloading mistake; JLS 8.4.9 |
| equals(Point) overloads instead of overriding | object-class-equals-hashcode Interview Q | classic equals bug; shows why @Override matters |
| Mutable fields in hashCode / mutable map keys | object-class-equals-hashcode Interview Q | Map API warns about it; ties to immutability |
| Objects.equals / Objects.hash (Java 7) | object-class-equals-hashcode point | standard way to write equals/hashCode |
| Defensive copy with List.copyOf (Java 10) | immutability example, tree defensive-copy | modern idiom for step 4 of the recipe |
| ordinal() must not be persisted | enums trap | Enum API: ordinal is the declaration position, meant for EnumSet/EnumMap |
| Enum == safe, valueOf exact name, constant-specific bodies (implicitly sealed), EnumSet | enums points, table, tree | JLS 8.9, Enum API |
| Exhaustive switch over enums and sealed types | enums example, records-sealed diagram and Interview Q | JLS 14.11.1.1; asked with Java 21 |
| Switch patterns and record patterns (Java 21), compact constructor | records-sealed | final in Java 21 / 16; common modern-Java questions |
| Record limits (no extends, no instance fields, may implement interfaces) | records-sealed point | JLS 8.10 |
| Interface methods are implicitly public, so implementations must be public | abstract-classes-interfaces bullet and example | frequent compile error |
| Provider extends Hashtable lesson | inheritance bullet | JDK's own example of inheritance misuse (Secure Coding Guideline 4-6) |
| Class method beats interface default | inheritance bullet | The Java Tutorials rule for default conflicts |
| return in finally discards the exception | try-catch-finally (trap); tree finally-block | Classic trick question; JLS 14.20.2 |
| Catch order: subclass before superclass, else compile error | try-catch-finally (point); tree catch-block | Commonly asked; JLS 11.2.3 |
| Multi-catch (Java 7), parameter implicitly final, alternatives cannot be subtypes | try-catch-finally (point); tree multi-catch; glossary | InterviewBit asks "catch multiple exceptions" |
| Suppressed exceptions, close in reverse order, close before catch/finally | try-catch-finally (point, Steps, Interview Q); tree suppressed-exception | Core try-with-resources behaviour; JLS 14.20.3 |
| Java 9 effectively final resource `try (in)` | try-catch-finally (bullet); tree effectively-final-resource | Version change; JEP 213 |
| try without catch (try-finally, try-with-resources) | try-catch-finally (Interview Q) | InterviewBit question |
| Unreachable catch block compile error | exception-hierarchy (Interview Q) | InterviewBit question; JLS 11.2.3 |
| Do not catch Error / Throwable | exception-hierarchy (point, Interview Q) | Error API |
| Exception chaining and keeping the cause | throw-throws-custom (point, trap, example, Interview Q); tree exception-chaining | In unit scope; InterviewBit question |
| Exception propagation | throw-throws-custom (bullet); tree exception-propagation; glossary | InterviewBit question; JLS 11.3 |
| When to write a custom exception | throw-throws-custom (Interview Q) | Oracle tutorial guidance; InterviewBit question |
| Stack trace, "Caused by:" | throw-throws-custom (bullet); glossary stack-trace | InterviewBit question; Throwable API |
| InterruptedException as a checked example | tree interrupted-exception; comparison row | Common checked exception |
| SequencedCollection (Java 21): getFirst, getLast, reversed | concept collections-framework (bullet); tree sequenced-collection | Newer API on List, Deque, LinkedHashSet; current Java baseline |
| Arrays.asList is fixed-size and backed by the array | concept collections-framework (point); tree arrays-class | Very common interview trap |
| remove(int) vs remove(Object) on List<Integer> | concept list-arraylist (trap, Example); tree list-remove-overloads | Common trick question |
| ArrayList capacity 10 on first add, about 1.5x growth (OpenJDK) | concept list-arraylist (points) | Often asked; marked as OpenJDK detail |
| Fail-fast vs "fail-safe" (weakly consistent) iterators | concept collections-framework (Interview Q) | Commonly asked; JDK term is weakly consistent |
| Why Map does not extend Collection | concept collections-framework (Interview Q) | Commonly asked; answered from the Collections Design FAQ |
| HashMap vs Hashtable | concept map-hashmap (Interview Q); tree hashtable | High-frequency question (section 152 lists it) |
| LRU cache with LinkedHashMap access order + removeEldestEntry | concept map-hashmap (Example); tree lru-access-order | Classic interview coding question |
| put on an existing key returns the old value | concept map-hashmap (point) | Clarifies "same key" behaviour |
| Consistent with equals; BigDecimal 4.0 vs 4.00 | concept comparable-comparator (point, bullet, Interview Q); tree consistent-with-equals | Explains why TreeSet "loses" items |
| Comparator builders comparing / thenComparing / reversed | concept comparable-comparator (points, Example, Interview Q) | Modern way to write comparators (Java 8) |
| Mutable elements in a HashSet | concept set-hashset-treeset (Interview Q, links to object-class-equals-hashcode) | Spec warning; common follow-up |
| PriorityQueue iteration is not sorted; max-heap via reverseOrder | concept queue-deque (trap, bullet) | Common mistake |
| PriorityQueue vs TreeSet | concept queue-deque (Interview Q) | Asked in interview lists |
| Generics are invariant: List<Integer> is not a List<Number> | concept generics (trap) | the most common generics mistake |
| Raw types and unchecked warnings | concept generics (bullet); tree raw-type; glossary raw-type | in unit scope; asked with erasure |
| Bounded type parameters, multiple bounds with & | concept generics (table); tree bounded-type | in unit scope |
| Captured locals must be effectively final; `this` in a lambda | concept lambdas (points, trap, Interview Q 2) | very common lambda question; reference omits it |
| Runnable and Comparator are functional interfaces (Object methods do not count) | concept lambdas (Interview Q 3) | GfG lists "functional interfaces before Java 8" |
| Primitive functional interfaces and primitive streams | concept lambdas (bullet), streams (example); tree primitive-streams | avoid boxing |
| Short-circuiting operations and infinite streams | concept streams (bullet); tree short-circuit-operations | explains why laziness matters |
| groupingBy, mapping, joining collectors | concept streams (example); tree collectors-class; glossary collectors-class, grouping-by | real interview coding tasks |
| orElseThrow() (Java 10), isEmpty() (Java 11), ifPresentOrElse (Java 9); get() risk | concept optional (table, point) | current API |
| Never return null from an Optional method; Optional is not Serializable; empty() is not a singleton | concept optional (points, bullet) | API notes |
| Optional map vs flatMap | concept optional (bullet); comparison map-vs-flatmap (row) | same idea as stream map/flatMap |
| Immutability trap (plusDays returns a new object) | concept date-time (trap) | common bug |
| Duration vs Period across daylight saving | concept date-time (bullet) | API states the difference |
| DateTimeFormatter thread-safe vs SimpleDateFormat not synchronized | concept date-time (points, Interview Q 1) | why java.time replaced the old API |
| Instant vs LocalDateTime for event times | concept date-time (Interview Q 2) | API guidance |
| join(), daemon threads, starting a thread twice | concept threads (points, Interview Q) | in the unit scope; commonly asked (InterviewBit) |
| Why wait()/notify() live in Object | concept threads (Interview Q) | commonly asked |
| Static vs instance synchronized monitors; reentrancy | concept synchronization (points, Interview Q) | commonly asked ("class lock vs object lock") |
| Fairness, tryLock with timeout, ReadWriteLock | concept locks-deadlock; tree | in scope; explains the ReentrantLock choice |
| Livelock, starvation | concept locks-deadlock (Interview Q); tree; glossary | commonly asked |
| CountDownLatch, CyclicBarrier, Semaphore | tree under locks-deadlock (synchronizers) | commonly asked; one line each |
| Finding a deadlock (thread dump, ThreadMXBean) | concept locks-deadlock (bullet) | scenario question in interviews |
| ThreadPoolExecutor sizing order, rejection policies, unbounded queue of newFixedThreadPool | concept executors (Steps, trap, Defaults) | the reference names pools but not how they behave |
| submit() keeps exceptions in the Future | concept executors (point, Interview Q) | common production bug |
| ExecutorService.close() (Java 19) | concept executors (point, example) | current API |
| Default common pool, thenApply vs thenCompose, join vs get, allOf | concept completable-future | the reference only lists method names |
| ConcurrentHashMap: no nulls (and why), atomic compute/merge, check-then-act trap, estimates for size() | concept concurrent-collections | commonly asked |
| AtomicInteger, LongAdder | concept concurrent-collections; tree | in scope |
| Collections.synchronizedMap and Hashtable | comparison hashmap-vs-concurrenthashmap | commonly asked trio |
| Never pool virtual threads; Semaphore to limit; scheduler defaults | concept virtual-threads | from JEP 444 and the Java 25 guide |
| StackOverflowError vs OutOfMemoryError | `jvm-memory` (point, Interview Q); tree `jvm-stack-overflow`, `jvm-out-of-memory` | Very common question; scope note |
| PermGen removed in Java 8 | `jvm-memory` Interview Q; tree `permgen`; glossary | Common question; scope note |
| Where static fields live (heap since Java 8 in HotSpot) | `jvm-memory` Interview Q | Common trap |
| Primitive fields live inside the object on the heap | `jvm-memory` trap | Most common wrong answer about stack vs heap |
| Defaults: -Xss 1024 KB (Linux/x64), MaxMetaspaceSize unlimited | `jvm-memory` Defaults | Real defaults interviewers name |
| PC register details | tree `pc-register` | Reference only named it |
| GC roots and cycles | `garbage-collection` points, Interview Q; tree `gc-roots` | Explains how reachability is decided |
| Young / old generation, minor / major GC | `garbage-collection` bullet; tree nodes | Scope note; classic question |
| Stop-the-world pause | `garbage-collection` point; glossary | Interviewer term |
| Collector table with flags; G1 default history (Java 9, Java 27 JEP 523); ZGC generational only (Java 24); Generational Shenandoah (Java 25) | `garbage-collection` table; tree notes | Current facts for Java 25 / 27 |
| ThreadLocal leak on pooled threads | tree `threadlocal-leak`; `garbage-collection` Interview Q | Scope note |
| Class initialisation triggers; constant variables do not trigger it | `class-loading-jit` point and example | Common tricky question |
| A class is identified by name plus defining loader | `class-loading-jit` bullet | Explains why two loaders can load the "same" class |
| java.* classes cannot be defined by application loaders | `class-loading-jit` trap | Common wrong answer |
| ClassNotFoundException vs NoClassDefFoundError | `class-loading-jit` Interview Q | Very common question |
| Tiered compilation (C1, C2) | `class-loading-jit` point; tree; glossary `tiered-compilation` | Scope note |
| Six-month cadence (since Java 10), LTS every two years, next LTS 29 | `modern-java` points, Interview Q | Scope note |
| Java 25 features: compact source files and instance main, flexible constructor bodies, module import declarations | `modern-java` table | Baseline LTS was missing |
| Preview features (--enable-preview) | `modern-java` point, Interview Q; glossary | Explains why features appear before they are final |
| Newest release JDK 27 (GA 15-09-2026) | `modern-java` point | Current fact |
| serialVersionUID, InvalidClassException, computed default | concept serialization (point, Interview Q 1); glossary serial-version-uid | Most asked serialisation question; the reference omits it |
| Deserialisation skips the class's constructors; transient fields read back as defaults | concept serialization (trap, diagram) | Common wrong answer |
| Non-serialisable superclass needs a no-arg constructor; NotSerializableException | concept serialization (point, Interview Q 2) | Asked as "what is not serialised" |
| Serialisation filter (ObjectInputFilter, Java 9, JEP 290) and the API's "avoid untrusted data" warning | concept serialization; tree serialization-filter | Replaces the reference's vague "security concerns" with the concrete fix |
| Records deserialise through the canonical constructor (Java 16+) | concept serialization; tree record-serialization | In the master scope; current Java |
| Externalizable, readResolve() | tree externalizable, read-resolve | Named often next to Serializable and singletons |
| Double-checked locking needs volatile (Java 5+ memory model); holder idiom; ways to break a singleton | concept design-patterns (table, example, trap, Interview Q 2) | Core singleton interview depth; the reference lists "thread safety" only |
| java.util.Observable deprecated since Java 9 | tree observer-pattern | Avoid recommending a deprecated API |
| JDK examples of patterns (Calendar.getInstance, HttpRequest.newBuilder, BufferedReader, InputStreamReader, Arrays.asList, Comparator) | tree pattern nodes | Interviewers ask "where does the JDK use it?" |
| Liskov violation example (Square extends Rectangle) | concept solid-principles (trap, Interview Q 2) | The usual follow-up question |
| Retention policies (SOURCE, CLASS default, RUNTIME), @Target, @Deprecated(forRemoval) | concept reflection-annotations; tree annotation-retention, annotation-target, deprecated-for-removal | Needed to explain why a custom annotation is invisible at run time |
| getMethods vs getDeclaredMethods; setAccessible and module rules (InaccessibleObjectException, Java 9; JDK internals locked in Java 17, JEP 403) | concept reflection-annotations (table, Interview Q 3); tree set-accessible | Current Java behaviour; the reference ignores modules |
| Default charset UTF-8 since Java 18 (JEP 400); Files methods default to UTF-8 | concept java-io (Defaults) | The reference's FileReader example depends on it |
| Files.lines must be closed; readAllLines not for large files | concept java-io (trap, point) | Common resource-leak mistake |
| Auto-commit default, setAutoCommit(false), commit, rollback | concept jdbc (point, trap, example, Interview Q 2) | In the master scope; asked often |
| DataSource preferred over DriverManager; connection pools (HikariCP) | concept jdbc; tree jdbc-connection-pool; glossary data-source, connection-pool | The API docs call DataSource the preferred way |
| PreparedStatement placeholders cannot bind table or column names | comparison statement-vs-preparedstatement (row) | Limit of "prevents SQL injection" (OWASP) |
| ResultSet cursor before first row; default forward-only, read-only; 1-based indexes | concept jdbc (Steps, point); tree jdbc-result-set | Frequent off-by-one bug |

## Dropped
| Reference item | Reason (rare / advanced / duplicate / unverifiable) |
|---|---|
| (no whole item) | |

### Details cut or placed elsewhere inside items listed above
| Reference item part | What happened |
|---|---|
| 20. Interfaces | also: concept abstract-classes-interfaces (points), tree interface-type |
| 80. LinkedBlockingQueue as a named BlockingQueue example | cut: rare detail; ArrayBlockingQueue is shown, and the unbounded queue is covered by the newFixedThreadPool trap |
| 111. Repository pattern | cut: duplicate / out of scope: a data-access pattern taught with Spring Data, not core Java (master scope lists six patterns plus DI) |
| 155.1 Java execution | also: concept jdk-jre-jvm (diagram, hook) |
| 155.16 Java pass-by-value | also: concept pass-by-value (hook, trap) |
| 155.2 OOP (four pillars) | also: concept oop-principles (hook) |
| 155.17 static | also: concept static-keyword (hook) |
| 155.3 Overloading | also: concept polymorphism (hook) |
| 155.4 Overriding | also: concept polymorphism (hook) |
| 155.7 hashCode() | also: glossary hashcode-method |
| 155.15. Checked exception | also: concept exception-hierarchy (hook) |
| 155.9 ArrayList: dynamic array | also: concept list-arraylist (hook) |
| 155.10 HashMap: key to value, hash-based lookup | also: concept map-hashmap (hook) |
| 155.11 HashSet: unique elements | also: concept set-hashset-treeset (hook) |
| 155.12 TreeMap/TreeSet: sorted (TreeSet) | also: concept set-hashset-treeset (hook, comparison) |
| 155.12 TreeMap/TreeSet: sorted (TreeMap) | also: concept map-hashmap; comparison hashmap-vs-linkedhashmap-vs-treemap |
| 155.13 Comparable: natural ordering | also: concept comparable-comparator (hook, points) |
| 155.14 Comparator: custom ordering | also: concept comparable-comparator (hook, points) |
| 155.19 Stream: process, not store | also: concept streams ("No storage" point) |
| 155.20 JVM memory (stack per thread, heap shared) | also: concept `jvm-memory` (hook, points) |
| 155 (as the list of priorities) | also: heat: `jvm-memory` 3, `garbage-collection` 3, `class-loading-jit` 2, `modern-java` 2 |
