# Plan: Java (new tech, 19-10-2026)

Phase 4 (new tech), following Phase 3 with the reference (CLAUDE.md 3.8). Reference: `reference/java.md` (owner input, not a source;
156 numbered sections plus 30 "why X if Y already exists?" questions). Owner note in CLAUDE.md: no repeated content, every fact in
the one place it belongs, not lengthy.

Baseline: **Java 25** (current LTS); JDK 27 is the latest release (GA 15-09-2026, checked on openjdk.org). Every feature newer than
Java 8 states its version. Java-only code. Accent: orange (the one accent no other tech uses).

## Shape

- 52 concepts in 8 topics; whole concept file ≤ 550 words; 1–3 primary sources (Java SE 25 API, JLS/JVMS 25, JEPs, Oracle guides).
- Tree: 2–6 children per concept, about 300 nodes. Comparisons: 28. Glossary: about 250 terms. Story spine: about 16 steps.
- No relations (removed by the owner on 19-10-2026).

## Topics (8) and concepts (52)

| #   | Topic                        | Concepts                                                                                                                                                                                                                                             |
| --- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Java Basics                  | jdk-jre-jvm, data-types, operators-control-flow, strings, wrapper-classes, pass-by-value                                                                                                                                                             |
| 2   | Object-Oriented Java         | oop-principles, classes-objects, constructors, this-super, access-modifiers, static-keyword, final-keyword, inner-classes, inheritance, polymorphism, abstract-classes-interfaces, object-class-equals-hashcode, immutability, enums, records-sealed |
| 3   | Exceptions                   | exception-hierarchy, try-catch-finally, throw-throws-custom                                                                                                                                                                                          |
| 4   | Collections                  | collections-framework, list-arraylist, set-hashset-treeset, map-hashmap, comparable-comparator, queue-deque                                                                                                                                          |
| 5   | Generics and Functional Java | generics, lambdas, streams, optional, date-time                                                                                                                                                                                                      |
| 6   | Concurrency                  | threads, synchronization, locks-deadlock, executors, completable-future, concurrent-collections, virtual-threads                                                                                                                                     |
| 7   | JVM Internals                | jvm-memory, garbage-collection, class-loading-jit, modern-java                                                                                                                                                                                       |
| 8   | Design, I/O and JDBC         | solid-principles, design-patterns, java-io, serialization, reflection-annotations, jdbc                                                                                                                                                              |

Comparisons: string-vs-stringbuilder-vs-stringbuffer, primitive-vs-wrapper, static-vs-instance, final-vs-finally-vs-finalize, inheritance-vs-composition, overloading-vs-overriding, abstract-class-vs-interface, equals-vs-double-equals, checked-vs-unchecked, throw-vs-throws, list-of-vs-unmodifiable-list, arraylist-vs-linkedlist, hashset-vs-linkedhashset-vs-treeset, hashmap-vs-linkedhashmap-vs-treemap, comparable-vs-comparator, map-vs-flatmap, stream-vs-collection, orelse-vs-orelseget, sleep-vs-wait, synchronized-vs-volatile, synchronized-vs-reentrantlock, runnable-vs-callable, future-vs-completablefuture, hashmap-vs-concurrenthashmap, platform-vs-virtual-threads, stack-vs-heap, jvm-vs-jit-vs-gc, statement-vs-preparedstatement.

## Ownership (each fact once)

- == vs equals and the equals/hashCode contract: `object-class-equals-hashcode`; String specifics: `strings`; Integer cache: `wrapper-classes`.
- The Big-O table of collections: `collections-framework`; each class concept links to it.
- Overriding rules (visibility, covariant return, exceptions): `polymorphism`.
- Feature timeline (8, 11, 17, 21, 25): `modern-java`, which links to the concept that explains each feature.
- Effectively final: `final-keyword`; lambdas link to it. Try-with-resources: `try-catch-finally`; JDBC links to it.

## Cross-cutting reference sections

Sections 120–122 and 151–156 (keywords, tricky questions, differences, terminology, high-frequency questions, can/cannot rules,
mental model, one-line revision) are lists that touch every topic: each unit takes the lines for its concepts.

## Process

1. Nine drafting units in parallel (OOP split in two). Each passes the real validator in isolation and logs coverage rows and a claim log.
2. Merge, validate, commit.
3. Independent verification pass by different agents (4.8). Fix, validate, commit.
4. Close `reference/java.coverage.md`, update `OPEN_QUESTIONS.md`, run all quality gates, final report.
