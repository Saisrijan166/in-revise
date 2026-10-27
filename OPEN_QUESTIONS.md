# Open questions

Facts that could not be fully verified, and decisions that need the owner.
System Design. Phase 1 on 15-10-2026; Phase 2 (owner feedback) on 16-10-2026; Phase 3 (full content) on 16-10-2026.

## A. Facts not fully verified (kept out of the content or worded carefully)

| # | Item | Status | What the content does |
|---|---|---|---|
| A1 | MongoDB's default write concern became `w: "majority"` in 5.0 | Confirmed only by MongoDB's 5.0.0 release announcement | Not stated |
| A2 | Amazon ElastiCache's default `maxmemory-policy` | Reported as `volatile-lru`; the AWS page was not opened | We say "Redis OSS default"; managed services are noted to differ |
| A3 | Apache Cassandra's default consistency level | Not stated on the cited 5.0 pages | Not stated |
| A4 | How often each interview question is asked | No primary source ranks questions | `heat` (1–3) is an editorial judgement |
| A5 | Google Spanner as "distributed SQL" | The Spanner docs say "a distributed database" with SQL dialects and automatic splits | Worded as "a distributed database with SQL" |
| A6 | CockroachDB facts | No CockroachDB page was opened | Removed |
| A7 | Karger et al. 1997 (consistent hashing) | DOI page returns 403 to scripts; title and authors confirmed through Crossref | Cited by DOI |
| A8 | MySQL Group Replication's default mode (probably single-primary) | Not stated on the multi-primary page | Tree says only that multi-leader exists (MySQL multi-primary mode) |
| A9 | "Random (two choices)" as a named algorithm type | Backed by nginx (`random two`) and HAProxy (`random`, 2 draws) as vendor features, not by a standards text | Kept, with those sources |
| A10 | "Leaderless" replication | The Dynamo paper uses the idea; Cassandra's own docs call it "multi-master/multi-primary" | Tree cites Dynamo; note says "No leader; writes go to several replicas; R + W > N quorums" |
| A11 | Cache-aside race that remains even with "database first, then delete" | Matches the "stale set" problem in Facebook's memcache paper; the exact interleaving is our explanation | "A small race remains" is not claimed in Revise; the trap states the safe order |

## B. Decisions taken in Phase 2 (owner feedback, 16-10-2026)

Applied, and written into CLAUDE.md (CLAUDE.md is not tracked in git: the global gitignore excludes it).

1. **Name:** inrevise (interview + revise).
2. **Progress features removed:** Known / Shaky / Unknown, Save, progress bars, the review list and JSON export/import. Only preferences remain (theme, mode, code language).
3. **Template v2:** `points` (keyword → meaning) replace "Rules & defaults" and "Can / Cannot"; `trap { wrong, right }` replaces "Mistake alert"; `sayIt` moves to frontmatter; a plain-English **Defaults** table is optional; interview answers are ≤ 50 words and collapsed in Learn.
4. **Relations replace needs / leadsTo / related:** each relation has a type (needs, uses, solves, can cause, limits, vs, works with) and a one-line why.
5. **Concept tree** (`tree.yaml`): the full types-and-subtypes hierarchy; it also sets the reading order.
6. **One cheat sheet for the whole tech**, built for scanning.
7. **Code examples in Java and Python** (tabs, choice remembered).
8. **Navigation:** the tech's pages sit in ONE bordered group in the top bar, with the tech name filled and each page filled only when selected. Learn / Revise / Quiz and the tree are in the left sidebar. The right panel shows "On this page", a recap and "Quiz me on this". Phones get one header and one bottom bar (Home, Topics, Cheat sheet, Quiz, Search).
9. **"vs" concepts embed their comparison** (`<Compare id>`), so the table is written once. A new comparison, "Relational (SQL) vs NoSQL", was added for this.
10. **Map removed (16-10-2026):** the Focus and Whole map views and the React Flow dependency are gone. Relations stay on each concept page ("How it connects"). Links to types and parts now open their place in the Tree (`/tree/#node-<id>`).

## C. Decisions still open for the owner

1. **Tree depth:** see D4.5 (the full tree now has about 500 nodes).
2. **Relation types:** 7 verbs today. Add more (for example "replaces", "is a kind of") or keep the set small?
3. **Heat rubric:** should `heat` follow a written rule (for example, 3 = appears in most prep guides)?
4. **Deck order on Home:** alphabetical by slug. Add an `order` field to `_tech.yaml`?
5. **Tooling:** TypeScript 5.9 (Next 16.4's supported line, not npm `latest` 7.0) and ESLint 9 (the Next plugins do not support 10 yet). The 5 `npm audit` findings are all in that dev-only lint chain; production dependencies show 0.
6. **Accent palettes:** 7 tuned accents (blue, orange, green, violet, rose, teal, amber), each checked for AA contrast in both themes.
7. **Topic colours:** 8 validated colours; a 9th topic would fall back to grey.
8. **Fonts:** downloaded from Google Fonts at build time and self-hosted. The build needs network access.

## D. Phase 3 (full content, 16-10-2026)

### D1. Verification status

- **First pass (done):** each topic was written by a separate drafting agent, which checked every key point, default, number, trap and tree note against a primary source as it wrote. Each agent kept a per-claim log (claim, URL, evidence).
- **Second, independent pass (CLAUDE.md 4.8): not done yet.** Seven fresh verifier agents were started, one per topic group, but an account usage limit stopped them before they checked anything (it resets 20-10-2026, 13:30 IST). Resume it before treating Phase 3 as fully verified.
- **Re-checked by hand on 16-10-2026, all confirmed:** Java 26 `UUID.ofEpochMillis` (version 7); Python 3.14 `uuid.uuid7()`; PostgreSQL 18 `uuidv7()` and `gen_random_uuid()` (version 4); Kafka 4.3 consumer defaults (`enable.auto.commit` true every 5 s, `auto.offset.reset` latest, `isolation.level` read_uncommitted) and producer defaults (`enable.idempotence` true unless settings conflict, `acks` all); Resilience4j 2.4.0 is the latest release, with CircuitBreaker defaults 50%, 100 calls, 60 s; Prometheus `scrape_interval` 1m and `scrape_timeout` 10s; API Gateway 10,000 RPS with a 5,000 burst per account per Region (2,500 / 1,250 in 13 Regions); Route 53 health checks every 30 s with a failure threshold of 3, so the "about 2.5 minutes" failover example adds up; MySQL Repeatable Read allows lost updates (Jepsen, MySQL 8.0.34), now cited in the isolation-levels comparison.

### D2. Worded carefully (kept, with the caveat shown)

| # | Item | What the content does |
|---|---|---|
| D2.1 | Geohash has no formal spec | Encoding and edge facts rest on Wikipedia, cross-checked with the Redis and Elasticsearch docs |
| D2.2 | Elasticsearch docs carry no version | Defaults are labelled "Elasticsearch 9.x" (latest 9.5.x in the release notes) |
| D2.3 | Cassandra 5.0 pages show a "prerelease" banner | Values are cited as Cassandra 5.0 (`num_tokens` 16 is the same on the 4.0 pages) |
| D2.4 | S3 maximum object size: AWS says both "50 TB" and "48.8 TiB" | Uses 48.8 TiB (10,000 parts × 5 GiB) |
| D2.5 | "Many conflicts: lock instead of optimistic" | Paraphrases EF Core and Hibernate guidance; no source gives a threshold |
| D2.6 | Route 53 failover "about 2.5 minutes" | Derived (30 s × 3 + 60 s TTL), worded as "about" and "most clients" |
| D2.7 | Peak factor 2× in estimates | Always called "a peak factor you state", not an industry constant |
| D2.8 | Idempotency-Key header | Says "IETF draft, not yet an RFC"; draft-07 expired on 18-04-2026 |
| D2.9 | Stripe idempotency facts | Stated for Stripe API v1 only |
| D2.10 | Raft's 150–300 ms election timeout | Shown as the paper's example range, not as a default |
| D2.11 | Retry amplification | Uses the Google SRE example (3 retries over 3 layers = 64×), not the ambiguous Builders' Library wording |
| D2.12 | Prometheus defaults | Labelled 3.15 (the docs version linked from the page) |
| D2.13 | "Auto-increment reveals how many rows exist" | Backed by ByteByteGo and OWASP ("enumerable identifiers"), not by a vendor doc |
| D2.14 | Write-around as a named strategy | No vendor doc names it; it rests on Wikipedia ("no-write allocate", also called write around) and ByteByteGo. Added 16-10-2026 at the owner's request; the six strategy names (Cache-Aside (Lazy Loading), Read-Through, Refresh-Ahead, Write-Through, Write-Behind (Write-Back), Write-Around) follow Oracle Coherence, AWS and Wikipedia |

### D3. Dropped (could not be confirmed from a primary source)

- Modern SSD latency numbers and single-server QPS figures (only Jeff Dean's 2009 list is used).
- A fixed gRPC default deadline (it is language-specific); Consul's DNS port as a default.
- Amazon ElastiCache's default eviction policy (sources conflict); the "two hard things" quote.
- Default consistency levels of cqlsh and Cosmos DB; Spanner using 2PC over Paxos groups; ULID.
- The 3-2-1 backup rule; Aurora failover numbers; AWS SDK retry numbers (they need an opt-in flag until they become the default).
- The JVM's positive DNS cache default; pull CDNs as "most common".
- IETF RateLimit header fields (still a draft); "SSE is used for LLM token streaming".
- Google Pub/Sub retention for new subscriptions; SNS standard-topic ordering; Kafka idempotence "since 3.0".
- The H3 resolution count and open-source date; R-trees being height-balanced; MySQL's index skip scan trigger.

### D4. Decisions for the owner

1. **Size:** 51 concepts, 26 comparisons, 340 glossary terms, about 500 tree nodes, 20 story steps, 8 topics. Is that the right breadth, or should some tree types become full concepts (for example read-through, refresh-ahead, leader election)?
2. **Concept ids that are also glossary ids** (`availability`, `capacity-estimation`, `circuit-breaker`, `load-shedding`, `dns`, `cdn`, `consistent-hashing`): kept on purpose so their tree nodes show a one-line definition. Keep?
3. **Wikipedia for geohash** (D2.1): accept, or drop the geohash details?
4. **Redis 8.6 `allkeys-lrm` / `volatile-lrm`** (least recently modified) exist but were left out of the eviction concept to keep it short. Add a tree node?
5. **Tree depth (C1):** the tree now has about 500 nodes. Every topic now lists concepts at its top level (Caching strategies became a concept on 16-10-2026, with write-around added). Concepts may also sit inside another concept (Cache-Aside and Write-Through inside Caching Strategies; Consistent Hashing inside Sharding vs Replication); the Overview, Cheat sheet and sidebar show them either way.

## E. Spring Boot (rebuilt from the owner's reference, 19-10-2026)

The first version (17-10-2026) was rebuilt from `reference/spring-boot.md` (CLAUDE.md 3.8.7). Baseline unchanged: Spring Boot 4.1 (4.1.1, confirmed current on spring.io 19-10-2026), Spring Framework 7.0.9, Spring Security 7.1.1, Spring Data 4.1.1, Hibernate 7.4.5; Java-only code; 8 topics including Spring Cloud (2025.1 "Oakwood"). Where every reference item landed, what was corrected and what was added: `reference/spring-boot.coverage.md`.

### E1. Verification status

- **Writing pass (done):** each of 10 units was drafted by a separate agent that checked every point, default, number, version, trap and tree note against a page it opened on 19-10-2026, and kept a claim log.
- **Independent pass (4.8, done 19-10-2026):** different agents re-checked every concept, comparison, tree note and glossary term against primary sources: about 2,200 items, 0 dropped, 33 fixed. The fixes were overstated or imprecise wording, not wrong headline facts. Examples: the Resilience4j example put the fallback where retries never happen; the bean-selection diagram sent "two @Primary beans" to the name check (Spring fails at once); `@TransactionalEventListener` is skipped with no transaction unless `fallbackExecution`; `@Secured` takes authority names; `iss` is checked only when an issuer is configured; RestTemplate is deprecated in the 7.0 docs, gets `@Deprecated` in 7.1 and is removed in 8.0; the persistence context lasts the whole request while open-in-view is on (Boot's default).
- **Reference corrections:** 11, listed in the coverage file (Undertow removed in 4.0; `@MockBean` removed in 4.0; the Spring Data 3+ repository hierarchy; the web starter rename and no validation in it; the `@ComponentScan` fix that drops the main package; the `@ConfigurationProperties` sample that cannot bind; the exact rollback rule; INFO as the default level everywhere; idempotency per RFC 9110).

### E2. Worded carefully

| # | Item | What the content does |
|---|---|---|
| E2.1 | RestTemplate's `@Deprecated` annotation lands in Framework 7.1 | Says "deprecated in the 7.0 docs; @Deprecated in 7.1, removed in 8.0". Re-check when 7.1 / Boot 4.2 go GA (Boot 4.2 is due 30-11-2026). |
| E2.2 | `Idempotency-Key` header | Called an expired IETF draft (revision 07) used by Stripe and Adyen, not a standard. |
| E2.3 | "The cache is not the source of truth" (spring-cache trap) | A design principle; backed by Boot's note that the simple cache has no expiry, not stated in those words by one page. |
| E2.4 | Default isolation level | "PostgreSQL 18: READ COMMITTED". PostgreSQL 19 RC1 is out (15-10-2026); update the version when 19 is final. |
| E2.5 | Eureka removal after 90 s | The lease expires at 90 s; the server removes it on its next eviction run. |
| E2.6 | Session vs JWT with many instances | Says "needs a shared session store"; sticky sessions are the other, weaker option. |
| E2.7 | spring.io/projects/spring-boot still lists Undertow | The 4.0 migration guide and 4.1.1 system requirements are treated as the authority. |

### E3. Dropped (could not be confirmed from a primary source)

- "BeanFactory creates singletons lazily on first request" (blogs only).
- "Hibernate cannot batch inserts with IDENTITY ids" (not re-verified; also too advanced).
- Still dropped from the first version: the `server.servlet.context-path` default; the LiveReload port; self-injection as a fix for self-invocation; the default encoding of `application.properties`; subselect fetching; BCrypt's 72-byte limit; native build and start-up numbers; Config client retry defaults.

### E4. Decisions for the owner

1. **Size:** 62 concepts (was 56), 35 comparisons (was 40), 295 glossary terms (was 316), 567 tree nodes (was 724), 27 story steps. Concepts run 454–650 words (was 700–1,060). Trim candidates if you want it shorter still: `connection-pool`, `schema-migrations` and `testcontainers` (heat 1, not in the reference).
2. **Heat** was re-graded from the reference's "10 most likely asked" list: 29 concepts at heat 3, 30 at 2, 3 at 1. Raise or lower any that differ from your interviews.
3. **Spring Cloud** (6 concepts) is not in the reference; it stays because you chose it on 17-10-2026. Say if you want it removed now that the reference sets the scope.
4. **Interview-prep sources:** a few concepts still cite Baeldung or InterviewBit as evidence that a question is really asked (every fact also has a primary source). Keep them, or remove them?
5. **Reference file location:** it arrived as `content/reference.md`; it is now `reference/spring-boot.md` (CLAUDE.md 3.8.2: never inside `/content`). Please put future reference files in `reference/<slug>.md`.
6. **Removed glossary term "Spring Boot":** it would auto-link the first "Spring Boot" in every concept.

## F. DSA with Java (rebuilt from the owner's reference, 19-10-2026)

Reference: `reference/dsa.md`; where every item landed: `reference/dsa.coverage.md`. Baseline: Java 25 (LTS); JDK 27 is the latest
release (GA 15-09-2026). Code uses only APIs in Java 17+.

### F1. Verification status

- Independent pass (4.8) by agents that did not write the content: about 1,560 items checked, 52 fixed, 3 dropped (2 duplicates, 1 unsourced number).
  The checkers were faster than the Spring Boot ones (3 to 6 minutes per unit), so treat this as a solid but lighter pass.
- 15 corrections to the reference (see the coverage file), for example: singly linked list delete needs the predecessor; Java's
  `Queue` is not always FIFO; TreeMap throws on a null key; a balanced binary tree is not O(log n) to search unless it is a BST;
  union-find detects cycles only in undirected graphs; selection and quick sort are not stable ("usually no" was hedged).

### F2. Worded carefully (kept, with the caveat shown)

1. Tail recursion: no Java SE spec page says Java has no tail-call optimisation; the glossary says "do not rely on that in Java".
2. Quadratic probing is named in the hashing tree and in `chaining-vs-open-addressing`; algs4, MIT 6.006 and Open Data Structures
   cover only linear probing and double hashing, so only interview-prep pages describe it.
3. Heap sort's best case is shown as O(n log n), the standard answer; algs4 notes it can be O(n) when all keys are equal.
4. "Search in a rotated sorted array" says one half is sorted only with distinct values (as in the usual problem).
5. Three problem facts rest on interview-prep pages and match CSES: Happy Number reaches 1 or loops; Product of Array Except Self
   uses prefix and suffix products; in Largest Rectangle the nearest smaller bars bound each width.
6. "Space complexity" is said to "usually" count the input: sources differ on the convention.

### F3. Dropped (could not be confirmed from a primary source)

- "A red-black tree needs at most 3 rotations per delete" (the bound is in CLRS, no open primary source found).
- "Spell checking" as a trie use, "undo/redo" and "backtracking" as stack uses (no primary source; other uses are given).
- Bucket sort O(n) for Top K Frequent (tie-breaking variants not verified).

### F4. Decisions for the owner

1. **Java basics removed.** The old draft's Java-basics concepts (values, control flow, methods, OOP, input) are gone; what matters
   in a coding round lives in `java-collections`, `strings` and `java-pitfalls`. Bring them back as a topic?
2. **Your extra parts** are two topics: Problem Patterns (14 concepts, each "clue → move → template → classic problems", with a
   clue table in `spotting-the-pattern`) and Problem-Solving Tricks (6 concepts). Is that the shape you wanted?
3. **Minimum spanning tree** is heat 1 (Tech Interview Handbook says Prim and Kruskal are rarely asked). Keep as a concept, or fold it
   into `union-find` as a type?
4. **Heat:** 25 concepts at heat 3, 24 at heat 2, 1 at heat 1. The reference's 20 questions were the hint for heat 3.
5. **Glossary ids** `binary-search-tree-term` and `trie-term` avoid clashing with the concept ids; rename if you prefer.
6. The reference file was moved from the repo root `reference.md` to `reference/dsa.md` (the convention in CLAUDE.md 3.8).

## G. Java (new tech from the owner's reference, 19-10-2026)

Reference: `reference/java.md`; where every item landed: `reference/java.coverage.md`. Baseline: Java 25 (LTS); JDK 27 is the
latest release (GA 15-09-2026). Every feature newer than Java 8 states the release in which it became final.

### G1. Verification status

- Independent pass (4.8) by agents that did not write the content: about 1,760 items checked, 51 fixed, 0 dropped. Every Java
  example was compiled and run with javac 21 (the Java 25 instance-main example was checked against JEP 512 instead).
- 28 reference items corrected (see the coverage file), for example: no separate Oracle JRE since JDK 11; `main` may be an
  instance method since Java 25; this()/super() need not be the first statement since Java 25 (JEP 513); `compareTo` with
  subtraction can overflow; G1 is not only for large heaps; records, switch expressions and text blocks are not Java 17
  features; `synchronized` no longer pins virtual threads since Java 24; Error is unchecked too.

### G2. Worded carefully (kept, with the caveat shown)

1. The `Integer(int)` constructors are "deprecated since Java 9"; the Java SE 25 API no longer marks them for removal.
2. The Integer cache: only -128 to 127 is guaranteed; HotSpot can raise the top (`-XX:AutoBoxCacheMax`).
3. An inner object "can keep" its outer object alive: since JDK 18 javac drops the hidden reference when it is unused.
4. Shared aggregation is described as "the whole does not control the parts' lifetime" (UML leaves its meaning open).
5. PECS comes from Effective Java; the Oracle tutorial backs the rule, not the acronym.
6. Glossary terms abstraction, getter and setter cite GeeksforGeeks only (no Oracle page defines these words).
7. Tree examples HikariCP (a connection pool) and `Arrays.asList` (an adapter) have no primary source.

### G3. Dropped (could not be confirmed from a primary source)

- "Unremoved listeners and callbacks" as a memory-leak example (no primary source found).
- The Repository pattern (a data-access pattern, out of scope for core Java; can come back as a tree node).

### G4. Decisions for the owner

1. **Heat:** 22 concepts at heat 3, 29 at heat 2, 1 at heat 1 (date-time).
2. **Virtual threads** is heat 2. Raise it to 3?
3. **Synchronisers** (CountDownLatch, CyclicBarrier, Semaphore) are tree nodes under concurrency. Make them a concept?
4. **Repository pattern:** add it back under design patterns?
5. Two concurrency sources are not Java docs: the OSTEP textbook (deadlock conditions) and Doug Lea's 2006 mail on nulls in
   ConcurrentHashMap (web.archive.org).
6. The reference file arrived as `reference/reference.md`; it was renamed `reference/java.md` (the CLAUDE.md 3.8 convention).

## H. SQL & Databases (new tech from the owner's reference, 20-10-2026)

Reference: `reference/sql.md` (arrived as `reference/reference.md`, renamed by the CLAUDE.md 3.8 convention); where every item
landed: `reference/sql.coverage.md`. Baseline: PostgreSQL 18 (18.6; 19 was only at RC 1 on 15-10-2026) and MySQL 9.7 LTS (8.4
LTS still common; 26.7 is an Innovation release under the new calendar versioning).

### H1. Verification status

- Independent pass (4.8) by agents that did not write the content: about 1,860 items checked, 51 fixed, 1 softened, 0 dropped.
  Every SQL block was run on throwaway PostgreSQL 17 and MySQL 8.0.46 servers (data with ties, NULLs and empty groups); product
  facts for PostgreSQL 18 and MySQL 9.7 were taken from their manuals, not from those older servers.
- 25 reference sections corrected (see the coverage file), for example: MySQL has no RETURNING (MariaDB does); a plain SELECT
  takes no shared row lock in PostgreSQL or InnoDB (it reads a snapshot); an inner join is not a set intersection (rows repeat);
  InnoDB has no hash index (`USING HASH` builds a B-tree); a replica is not a backup; ever-growing id ranges make a hot shard;
  AUTO_INCREMENT values lost in a rollback are never reused; NULLs sort last in PostgreSQL and first in MySQL (ASC).

### H2. Worded carefully (kept, with the caveat shown)

1. Keyset pagination in MySQL: the row-value form `(created_at, id) < (...)` "may not get an index range scan" (an 8.0.46 test
   could not use it; the spelled-out OR form could; 9.7 not tested).
2. GROUP BY puts all NULLs in one group: stated in the MySQL 9.7 manual; no PostgreSQL 18 sentence found (PostgreSQL behaves so).
3. Super, candidate, alternate, composite, surrogate and natural key definitions cite GeeksforGeeks only (no vendor manual
   defines them); they are the standard textbook definitions.
4. "MySQL 26.7 is an Innovation release" is implied by the downloads page (9.7.2 and 8.4.11 labelled LTS, 26.7 unlabelled).
5. Redis defaults are labelled "Redis 8.x": the Redis docs publish only a "latest" version.
6. "Analytics on an OLTP database can block transactions" (Azure OLTP page): with MVCC the main cost is load, not blocking.

### H3. Dropped (could not be confirmed from a primary source)

- "Modern applications keep most business logic in the application layer" (a trend claim; the trade-off is kept as pros/cons).
- "MySQL is widely used in web applications" (marketing line).

### H4. Decisions for the owner

1. **Slug and name:** `sql`, "SQL & Databases" (covers SQL, PostgreSQL, MySQL, Redis as a cache, and database scaling). Accent teal.
2. **Heat:** 18 concepts at heat 3, 39 at heat 2, 1 at heat 1 (backup-recovery). Raise connection pooling or N+1-adjacent topics?
3. **Scaling ladder order:** cache and read replicas come before scaling up the server. Keep?
4. **Overlap with other techs:** replication, sharding, CAP and caching also exist in System Design; JPA, N+1 and HikariCP in
   Spring Boot. Each tech stays self-contained (no cross-tech links); the SQL versions focus on the database side.
5. Some concepts cite 4–6 primary pages (one per PostgreSQL/MySQL fact) instead of 1–3.

## I. Owner additions (20-10-2026): Java streams, Java coding methods, SQL query building

The owner's new `reference/reference.md` held three parts. Each was appended to its tech's reference (`reference/java.md`,
`reference/dsa.md`, `reference/sql.md`, after an "Owner addition" marker line) and recorded at the end of that tech's coverage
file. Nothing in it concerned System Design or Spring Boot.

- **Java:** topic "Generics and Functional Java" became **"Lambdas and Streams"** (generics moved to Collections and Generics,
  date-time to Java Basics). New concepts: primitive-streams, collectors, stream-coding-patterns, employee-stream-questions; new
  comparisons: groupingby-vs-partitioningby, stream-tolist-vs-collectors-tolist, findfirst-vs-findany.
- **DSA:** new concept java-coding-toolkit ("Java Methods for Coding Rounds"); missing calls added to hashmap-hashset, strings, arrays.
- **SQL:** new concepts string-date-functions and english-to-sql; sql-problem-approach trimmed to pattern level so the two do not overlap.
- Independent check: about 300 items, 13 fixed, 1 dropped (a repeated point). Every Java block was compiled and run (JDK 21);
  every SQL block ran on PostgreSQL 17 and MySQL 8.0.

Decisions for the owner:
1. Newer stream APIs were left out to keep Java short: takeWhile/dropWhile (Java 9), Collectors.teeing (12), mapMulti (16),
   Gatherers (24). Add them?
2. `java/cards/generics.mdx` is 567 words (over the 550 target since the first Java version).
3. "Nth highest → OFFSET" in the reference needs DISTINCT; the site says so.

## J. Microservices (new tech from the owner's reference, 20-10-2026)

Reference: `reference/microservices.md` (arrived as `reference/reference.md`, renamed by the CLAUDE.md 3.8 convention); where
every item landed: `reference/microservices.coverage.md`. Baseline: Java 25, Spring Boot 4.1 + Spring Cloud 2025.1 (Oakwood),
Apache Kafka 4.3, Kubernetes 1.37, Resilience4j 2.x.

### J1. Verification status

- Independent pass (4.8): about 1,600 items checked, about 49 fixed, 3 dropped (an unsourced modular-monolith row, an example
  that contradicted AWS's availability definition, "can grow heavy" for orchestrators). Java examples compiled with javac 21 where
  the libraries were available; Spring/Kafka/Resilience4j names checked against their current API docs.
- 11 reference sections corrected (see the coverage file), for example: 3 retries are 4 attempts per layer, so retries multiply
  faster than "3 × 3 = 9"; PATCH is neither safe nor idempotent by definition; PUT can create; Kafka 4.0 removed ZooKeeper;
  RabbitMQ streams can replay; the Ingress API is frozen in favour of Gateway API; a flat trace list is really a span tree;
  RestClient arrived in Spring Framework 6.1; OpenFeign is feature-complete.

### J2. Worded carefully (kept, with the caveat shown)

1. "Distributed monolith" has no single primary definition; the glossary cites Azure's "must deploy together" warning sign.
2. The fallacies of distributed computing cite Wikipedia (confirmed by the AWS Builders' Library and APNIC); the co-author's
   first name differs between sources, so the concept names neither.
3. RestTemplate: the Spring Framework 7.0 reference calls it deprecated; the formal `@Deprecated` is planned for 7.1.
4. Spring Cloud Contract moved to Stubborn.sh (Spring blog, 06-07-2026) and leaves future release trains; it is still in 2025.1.
5. The Idempotency-Key HTTP header is an expired IETF draft, not an RFC; OAuth 2.1 is still a draft.

### J3. Decisions for the owner

1. **Config block:** CLAUDE.md's ACTIVE CONFIG values were blank when this tech started; they were left blank (the owner's edit).
2. **Heat:** 16 concepts at heat 3, 28 at heat 2.
3. **Overlap with other techs:** CAP, caching, rate limiting and load balancing also exist in System Design; Spring Cloud in
   Spring Boot; saga, 2PC and outbox in SQL & Databases. Each tech stays self-contained (no cross-tech links).
4. Some concepts cite 4–5 primary pages (one per product default) instead of 1–3; three units have 33–38 glossary terms.
5. "Cache a not-found result" (a common fix for cache penetration) was left out: no primary source found; a Bloom filter is given.

## K. REST API, Redis, AWS, Design Patterns and Kafka (new techs from one owner reference, 20-10-2026)

The owner's `reference/reference.md` held five parts plus a payment-system scenario. It was split into `reference/rest-api.md`
(Part 1 + the Part 5 payment scenario), `reference/redis.md`, `reference/aws.md`, `reference/design-patterns.md` and
`reference/kafka.md`; each tech has its own `reference/<slug>.coverage.md`. Each tech was planned by one agent, drafted by eight
units in parallel and checked by eight independent verifiers.

| Tech | Concepts | Comparisons | Terms | Tree nodes | Checked / fixed / dropped | Baseline (20-10-2026) |
|---|---|---|---|---|---|---|
| REST API | 39 | 20 | 238 | 294 | ~1,470 / ~50 / 0 | RFC 9110/9111/9457, OpenAPI 3.2.1, Spring Boot 4.1 / Framework 7.0, Java 25 |
| Redis | 38 | 14 | 202 | 270 | ~1,290 / ~26 / 0 | Redis Open Source 8.10, Spring Data Redis 4.1 (Lettuce) |
| AWS | 44 | 24 | 239 | 348 | ~1,490 / ~50 / 0 | as of 20-10-2026, each limit with its AWS doc page; SDK for Java 2.x |
| Design Patterns | 37 | 15 | 193 | 244 | ~1,240 / ~41 / 0 | Java 25, Spring Framework 7; GoF (1994) via authors' pages |
| Kafka | 40 | 16 | 201 | 293 | ~1,350 / ~44 / 1 | Apache Kafka 4.3 (KRaft only), Spring for Apache Kafka 4.1 |

Notable current facts found while verifying (each sourced in the content): RFC 9846 (2026) replaced RFC 8446 for TLS 1.3;
RestTemplate deprecated in Spring Framework 7.0 (`@Deprecated` planned for 7.1); Redis 8.6 added two eviction policies (10 in
total) and 8.4 added DELEX; EventBridge relaunched custom event buses (24-09-2026); SQS messages up to 1 MiB; S3 objects up to
50 TB; X-Ray SDKs in maintenance since 25-02-2026; Kafka share groups production-ready in 4.2; Spring Cloud Contract moved out.

### K1. Worded carefully or weakly sourced (kept)

1. "Cache penetration" and "cache avalanche" (Redis): interview names with no vendor page; the mechanisms and fixes are sourced.
2. KISS (Design Patterns) rests on c2.com; Interpreter's terminal / non-terminal / AST nodes cite GeeksforGeeks (GoF is not online).
3. `lld-term` and `machine-coding-round-term` (Design Patterns) cite GeeksforGeeks and workat.tech (interview rounds, no primary page).
4. "Actor (SRP)" comes from Martin's Clean Architecture book (not online); the cited 2014 post backs the meaning only.
5. AWS: no AWS page dates the Free Tier credit plan start or App Runner closing to new customers; the content states no dates.
6. Kafka: the example sizing rates in kafka-design-formula (10 MB/s per partition, 2,000 events/s per consumer) are labelled as
   assumptions to replace by measurements; DLT ownership/re-drive advice is backed only by the Amazon SQS DLQ docs.
7. Spring Cloud AWS 4.x is documented for Spring Boot 4.0; Boot 4.1 support is not stated, so AWS shows plain SDK v2 code.

### K2. Decisions for the owner

1. **Accents:** only seven supported accents exist. Redis uses rose (new); REST API reuses blue (System Design), AWS orange
   (Java), Design Patterns violet (DSA), Kafka green (Spring Boot). Adding new accent colours needs tuned values in globals.css.
2. **Overlap between techs:** REST API, Redis and Kafka repeat some ideas that also live in Microservices, Spring Boot, SQL and
   System Design (idempotency keys, caching, outbox, Spring REST). Each tech stays self-contained, as before.
3. **Lua highlighting** was added (`lua` in `src/lib/content/render.tsx`, CLAUDE.md 3.1 updated) for Redis scripts.
4. **System Design** still cites RFC 8446 for TLS 1.3 (now obsoleted by RFC 9846); not changed because other techs were untouched.
5. REST API has 39 concepts (CLAUDE.md asks for about 40–70).

## L. Docker and Kubernetes (new techs from one owner reference, 20-10-2026), and new accent colours

The owner's `reference/reference.md` (Docker & Kubernetes cheat sheet) was split into `reference/docker.md` (Part 1 + the shared
revision sections 28–32) and `reference/kubernetes.md` (Part 2 + the same shared sections). Each coverage file records the other
tech's shared items as "covered by the Docker / Kubernetes tech".

| Tech | Concepts | Comparisons | Terms | Tree nodes | Checked / fixed / dropped | Baseline (20-10-2026) |
|---|---|---|---|---|---|---|
| Docker | 32 | 16 | 159 | 261 | ~1,330 / ~55 / 2 | Docker Engine 29.x, Compose Specification (v5 tooling), BuildKit, OCI 1.1.1, Java 25 |
| Kubernetes | 39 | 23 | 248 | 332 | ~1,500 / ~50 / 0 | Kubernetes 1.37, Gateway API v1.6, Helm 4 |

Examples were run where possible: Dockerfiles built (stub and real Spring Boot 4.1 jars), Compose files checked with
`docker compose config`, container behaviour (signals, OOM exit 137, restart back-off) tested on throwaway containers.

**Accent colours (owner: "use new if required"):** six AA-checked accents were added (`indigo`, `sky`, `cyan`, `red`, `fuchsia`,
`lime`) in `src/app/globals.css` and `src/lib/content/schema.ts`; CLAUDE.md 0 and 5.5 list them. Every tech now has its own colour:
REST API fuchsia, AWS red, Design Patterns cyan, Kafka lime, Docker sky, Kubernetes indigo. `dockerfile` code highlighting was added.

### L1. Worded carefully (kept)

1. The default bridge network: Docker's docs say a running container cannot be connected to it, but Engine 29.1 allowed it in a
   test; the comparison row was dropped rather than state either.
2. VPA in-place resize: the Kubernetes 1.37 docs and the VPA project docs disagree; the tree note follows the VPA project.
3. Example values that are made up for illustration (a kernel version string, `<digest>` placeholders, sizing numbers).

### L2. Decisions for the owner

1. **Docker has 32 concepts** (CLAUDE.md asks for about 40–70); the Docker part of the reference is short, so it was kept compact.
2. **Overlap:** containers, Kubernetes objects, probes and deployment strategies also appear briefly in Microservices and AWS.
3. **S28 (Docker vs Compose vs Kubernetes)** is a comparison in both techs (each tech is self-contained).

## M. Coding practice: practice boxes, outputs, Java Coding Practice, integration templates (20-10-2026)

The owner's `reference/reference.md` had two parts. Part A (Java interview coding, sections 0–96, plus a compile/run tip) was
appended to `reference/java.md` (from line 6731). Part B (integration templates) was split into `reference/rest-api.md` (ChatGPT /
OpenAI, "the 4 templates", the integration-code map), `reference/redis.md`, `reference/kafka.md` and `reference/aws.md`.

**Site:** every code block that is not `text` now has a practice box under it (type it from memory; Hide code / Check / Clear;
nothing is stored), and ` ```text output ` blocks show as an "Output" panel. A 9th topic colour (`--t9`, cyan) was added. CLAUDE.md
3.1, 5.5, 5.8 and the status were updated.

| Area | What changed | Checked / fixed / dropped |
|---|---|---|
| Java | New topic "Coding Practice" (9th): 8 new concepts (coding-method, number-, array-, string-, collection-, oop-, functional-interface-programs, output-prediction) plus stream-coding-patterns and employee-stream-questions moved in; 64 concepts; short theory additions; 62 output panels | ~336 / 19 / 3 |
| REST API | `openai-api-integration` (Responses API via RestClient; model id from config) with the integration-code map | 52 / 7 / 0 |
| Redis | `redis-code-templates` | 51 / 4 / 0 |
| Kafka | `kafka-code-templates`; producer-basics output | 54 / 2 / 0 |
| AWS | `aws-code-templates` (S3, SQS, Spring Cloud AWS, RDS); code moved out of four concepts | 66 / 6 / 0 |
| DSA | 23 output panels (call lines on small inputs) | 57 / 3 / 0 |
| SQL | 17 output panels (real PostgreSQL 18 results) | 36 / 4 / 0 |
| Design Patterns | 11 output panels; decorator keeps its two-level stacking in code | 22 / 3 / 0 |

Every Java block with an output was compiled and run on JDK 21 (APIs present in Java 25); Redis, Kafka and AWS code compiled against
current jars and run on throwaway `redis:8`, `apache/kafka:4.3.1` and LocalStack containers; SQL on `postgres:18`.

### M1. Decisions for the owner

- **NULL in SQL outputs** is shown as the word `NULL` (psql `\pset null NULL`), not psql's default blank cell, so it can't be missed.
- **Command-line blocks get a practice box** too (redis-cli, Kafka console tools, bash). Change a block to `text` if you don't want to practise it.
- **Removed exception lines:** in `wrapper-classes` (unboxing null) and `threads` (second `start()`) the crashing line was taken out of the runnable code; both facts stay in the points and Interview Qs.
- **Kafka console block** uses `--command-property group.protocol=consumer` so Kafka 4.3.1 prints no KIP-848 notice; Spring Boot 4.1.1 manages kafka-clients 4.2.1 while the Kafka baseline is 4.3.
- **Spring AI** 2.0.x's OpenAI chat client supports only Chat Completions, not the Responses API; recheck at the next Spring AI release. The official `openai-java` SDK (4.86.0) is still marked beta.

### M2. Worded carefully (kept)

- `Integer a = 1000, b = 1000; a == b` prints `false` on a default JVM, but the JLS guarantees caching only for -128..127; the panel shows a real run, and `wrapper-classes` states the rule.
- The Kafka dead letter topic "needs at least as many partitions" as the source (Spring docs); in practice a missing partition logs a WARN and the producer picks one.

## N. React & Frontend (new tech, 20-10-2026)

The owner's `reference/reference.md` (React performance only) was renamed `reference/react.md`. The owner asked for React plus
the frontend basics every developer should know, "strictly not many concepts", so the tech has 39 concepts (below the usual
40–70) in 8 topics: Web and Browser Basics, CSS Essentials, JavaScript Essentials, React Fundamentals, Hooks, State, Data and
Routing, Performance, and Next.js, Testing and Playbook. Everything outside performance is "added beyond the reference".

| Concepts | Comparisons | Terms | Checked / fixed / dropped | Baseline (20-10-2026) |
|---|---|---|---|---|
| 39 | 18 | 250 | ~1,440 / 55 / 0 | React 19.3 (React Compiler 1.0), Next.js 16.4, React Router 8, Vite 8, TanStack Query v5, Redux Toolkit 2, Zustand 5, Vitest 5, Jest 30, ECMAScript 2026 |

All JavaScript "predict the output" examples were run on Node 20 (DOM ones in headless Chrome); JSX compiled with esbuild and
rendered with react-dom/server 19.3.1; router, Redux, TanStack Query and Zustand examples run against their current packages.
A new accent `pink` (AA-checked: 6.4:1 light, 10.4:1 dark) was added because all 13 accents were in use.

### N1. Decisions for the owner

- **Size:** 39 concepts on purpose (owner: "not many"). One slot under the 40 cap is free (for example error handling or build tooling).
- **ISR example** uses the Next.js 16 Cache Components form (`'use cache'` + `cacheLife`); the older `export const revalidate` is named as the previous model.
- **Sources outside react.dev:** legacy.reactjs.org (virtual DOM FAQ, HOCs, reconciliation) and kentcdodds.com (testing trophy, the author's own page) are cited where react.dev has no page.

### N2. Worded carefully (kept)

- Cookies without `SameSite` are treated as Lax in Chrome and Edge, not in Firefox or Safari; the content says to set it explicitly.
- Splitting state and dispatch into two contexts: worded only as far as react.dev supports (dispatch is stable; readers re-render when the value changes).
- Zustand's "very little code" rests on the project's GitHub README.

## O. OS & Networking (new tech, 20-10-2026)

The owner's `reference/reference.md` (OS and computer networks for SWE and system-design interviews) was renamed
`reference/os-networking.md`. The owner asked for "only core important topics, not much in depth", so the tech has 40 concepts
(the bottom of the 40–70 range) in 8 topics: OS Basics and Processes, Concurrency and Synchronization, Memory, I/O Files and IPC,
Network Layers and Addressing, TCP and UDP, HTTP TLS and DNS, and Networks in System Design (ending with a "what happens when
you open a URL" playbook). Every reference item is in `reference/os-networking.coverage.md` (294 keys: 263 mapped, 31 corrected,
0 dropped as whole items; 121 additions).

| Concepts | Comparisons | Terms | Checked / fixed / dropped | Baseline (20-10-2026) |
|---|---|---|---|---|
| 40 | 21 | 282 | ~1,480 / 31 / 1 | Generic OS with Linux as the example (latest stable kernel 7.3; version named only where a fact changed, e.g. EEVDF since 6.6, somaxconn 4096 since 5.4); TCP RFC 9293, HTTP RFC 9110–9114, QUIC RFC 9000, TLS 1.3 RFC 9846; Java 25 app code |

Every Java block was compiled and run on JDK 21 (APIs also in Java 25); every output block is a real run, and outputs that vary
(PIDs, race counts, client ports) are labelled "example run". Command outputs come from local runs or a throwaway container,
never from the outside network. A new accent `slate` (AA: 7.6:1 light, 8.4:1 dark) was added because all 14 accents were in use.

### O1. Decisions for the owner

- **Size:** 40 concepts. If you want fewer, `context-switching` can fold into `threads` and `page-replacement` into
  `paging-and-page-faults` (38).
- **Overlap with other techs:** System Design, REST API and Java already cover load balancers, CDN, idempotency, HTTP methods
  and status codes, Java threads and locks. This tech keeps them to the OS / network angle at interview depth, because each
  tech is read on its own (no cross-tech links). Write-through / write-back caching was left to System Design.
- **Sources outside the usual list:** the MIT xv6 book (authors' free textbook, like OSTEP) is the only source for "monolithic
  vs microkernel" and "interrupt vs trap"; a Princeton COS 461 lecture backs hub vs switch behaviour; Cloudflare Learning and
  iso.org blocked automated reads, so OSI facts cite ITU-T X.200 (same text as ISO/IEC 7498-1) and RFC 1122.
- **OSI → TCP/IP mapping:** the content uses the usual "OSI 5–7 → Application"; RFC 1122 itself only says the application
  layer merges OSI 6 and 7.

### O2. Worded carefully (kept)

- TLS 1.3 is now RFC 9846 (July 2026, obsoletes RFC 8446); TLS 1.0/1.1 are deprecated (RFC 8996).
- The Idempotency-Key header is an expired IETF draft (-07), not a standard; BBR is still a draft; RFC 6928 (initial window 10) is Experimental.
- HTTP/2 server push is off by default in Chrome 106+ and Firefox 132+; the "TLS effectively required by browsers for HTTP/2" row
  was left out (no primary source; RFC 9113 still defines cleartext HTTP/2).
- Latency ladder numbers come from Norvig's table and are marked approximate; the 63% fan-out figure is 1 − 0.99^100.
- Dropped as true but over budget: Spring Boot's 30 s per shutdown phase default (the Interview Q names the property instead).

## P. AI Engineering (new tech, 21-10-2026)

The owner's `reference/reference.md` (LLMs, prompt engineering, RAG and AI integration, 77 sections) was renamed
`reference/ai-engineering.md`. The owner asked to add the AI techs "and all foundations, whatever I have to know". The four
parts of the reference are each too small for their own tech (15–20 concepts against the usual 40–70), so they form one tech,
**AI Engineering**, with 45 concepts in 8 topics: AI Foundations (added beyond the reference), How LLMs Work, Prompt
Engineering, Tools Agents and Memory, Embeddings and Vector Search, RAG, Safety and Evaluation, and AI in Java Backends (ending
with a "how would you build an AI feature" playbook). Every reference item is in `reference/ai-engineering.coverage.md`
(250 keys: 231 mapped, 18 corrected, 1 dropped closing remark; 87 additions).

| Concepts | Comparisons | Terms | Checked / fixed / dropped | Baseline (21-10-2026) |
|---|---|---|---|---|
| 45 | 22 | 254 | ~1,510 / 32 / 0 | Java 25, Spring Boot 4.1, Spring AI 2.0.1, PostgreSQL 18 + pgvector 0.8.7, MCP spec 2026-07-28, OWASP Top 10 for LLM Applications 2025; prose vendor-neutral, OpenAI and Anthropic named only for dated facts |

Spring AI examples compile against the Spring AI 2.0.1 jars; plain Java examples were run on JDK 21 with real outputs; SQL ran on
PostgreSQL 18.6 with pgvector 0.8.7; token counts come from tiktoken (`o200k_base`). No LLM reply is shown as an output panel
(replies are not reproducible); example replies are labelled. A new accent `purple` (AA: 5.9:1 or more in both themes) was
added because all 15 accents were in use.

### P1. Decisions for the owner

- **One tech, not four:** say if you want it split (for example "LLMs and Prompting" and "RAG and AI Integration"); each part would be below 40 concepts.
- **Size:** 45 concepts. For fewer, `neural-networks` can fold into `how-models-learn` and `chain-of-thought` into `prompt-design` (43).
- **Dated vendor facts kept (they change fast, re-check before interviews):** OpenAI is winding down its fine-tuning platform
  (closed to new users); Anthropic deprecates temperature / top_p / top_k on models released after Claude Opus 4.6 and
  `budget_tokens` on 4.6+; OpenAI's hosted Evals platform goes read-only on 31-10-2026 (not mentioned in the content).
- **"Start with prompts and evals, then pull the lever the failures point to"** replaces the reference's fixed ladder (prompt → RAG → fine-tuning), following OpenAI's accuracy guide.
- **Overlap:** REST API already has `openai-api-integration` (raw HTTP call); this tech uses Spring AI and links nothing across techs.

### P2. Worded carefully (kept)

- Spring AI 2.0.1 OpenAI defaults (60 s timeout, 3 SDK retries via `spring.ai.openai.max-retries`): the Spring AI OpenAI page still lists the older `spring.ai.retry.*` keys, which the 2.0.1 OpenAI model no longer uses.
- OpenTelemetry GenAI metric names are still in Development status; the content names only Spring AI's `gen_ai.client.token.usage`.
- Left out for lack of a primary source: parent-child (small-to-big) chunking, a "small language model" glossary term, A/B tests as an eval signal.
- "Deep learning contains generative AI" is the usual teaching picture; Google's glossary notes GenAI has no formal definition.

## Q. Teaching template v3, Spring Boot pilot (21-10-2026)

The owner found every tech too compressed to learn from: "random points", terms used before they are explained, and ambiguity between concepts. They asked for the step-by-step clarity of the reference files, for all techs. Template v3 (CLAUDE.md 3.1.1) adds:

- the concept sections What it is, Rules and defaults, Not to be confused with and Common mistakes, plus an explained Example;
- `trap.why`, `buildsOn`, `scenarios`, and comparison `explain` / `example` / `sayIt`.

Spring Boot is the pilot and the only v3 tech so far.

| Concepts | Comparisons | Terms | Learn view, average words (before → after) | Checked / fixed / dropped |
|---|---|---|---|---|
| 62 | 35 | 349 | 314 → 841 (Revise 124 → 180) | ~2,690 / 49 / 0 in the independent pass (plus ~250 facts added or corrected while rewriting) |

All Java examples compile against Spring Framework 7.0.5 and Spring Boot 4.0.3 / 4.1.1 jars (Spring Security 7.0.3; the JWT example against 6.5.11 resource-server jars, same API). Output panels come from real runs. Migration SQL ran on PostgreSQL 18 only.

### Q1. Decisions for the owner

- **Review the pilot**, then say "go" for the other 15 techs, or what to change in the style first.
- **Length:** a Learn page is now about 4 minutes, up from about 1.5. If that is too long, the easiest cuts are Common mistakes and the third interview question.
- **New order:** Spring Core (what Spring is, beans, DI, AOP, events) now comes before Boot Basics, and transactions come before locking.
- **"Rules and defaults" is back in v3** (it was removed in 5.6 for v2), because your brief asked for defaults, rules and automatic behaviour.

### Q2. Left out or worded carefully (not confirmed by the docs)

- Whether fixedRate runs overlap on the virtual-thread scheduler. The content makes no claim.
- Spring Framework 7.0 `@Proxyable`: left out as rarely asked.
- Whether a derived query with a misspelt property fails at startup, and what an update `@Query` without `@Modifying` does.
- A request that matches no URL rule when there is no `anyRequest()`.
- Two facts confirmed only from the Spring Security 7.0.3 code: bearer-token requests skip the CSRF check, and what `csrf.spa()` sets up.
- The default access level of the `shutdown` and `heapdump` endpoints; whether a Boot/Cloud version mismatch fails startup; the exit code of a failed startup.
- That Boot's build plugins compile with `-parameters`, which the parameter-name fallback for bean selection relies on. It is worded as a condition.
- Eureka `healthcheck.enabled`: one property table says true, the code and guide say off. The content follows the code.
- Config Server's default Git label (main vs master): the docs differ. The content follows the Git backend page.

## R. Template v3 rollout to the other techs (from 21-10-2026)

The owner approved the Spring Boot pilot, both the concept rewrite (section Q) and the cheat-sheet map, and asked for every tech to be done the same way, one by one. Each tech got:
- topics reordered by dependency where needed;
- a running example;
- every concept and comparison rewritten in v3, with a cheat card;
- an independent verification pass;
- coverage additions recorded in its coverage file.

### R1. DSA with Java

| Concepts | Comparisons | Terms | Checked / fixed / removed | Cheat sheet |
|---|---|---|---|---|
| 51 | 25 | 218 | ~1,800 / 24 / 5 | ~12 min |

- **Order:** "Recursion, Searching and Sorting" now comes before Trees and Graphs, because traversals and DFS use recursion.
- **Examples:** running inputs are `nums = [2, 7, 11, 15]`, a 6-city road graph and the tree 8 (3 (1, 6), 10 (–, 14)). All programs ran on JDK 21 and Java 25.
- **Sources not re-checked:** algs4.cs.princeton.edu refused connections all day. Facts backed only by it keep their 19-10-2026 check: heap sort is not stable, bubble sort's early exit, union by size keeps trees log n tall, and Kruskal on a disconnected graph gives a forest. Most were re-confirmed from cp-algorithms, MIT 6.006, McGill COMP 251 or Waterloo CS 240.
- **GeeksforGeeks only:** multi-source BFS and the two-heaps running median. A primary or academic source should replace it.
- **Left out (not confirmable today):** MST with negative edge weights; the merge-sort compare-count bound.
- **For the owner:**
  - Big-O costs in key points use `kind: default` (CLAUDE.md reserves it for defaults). Say if you prefer `key`.
  - java-pitfalls repeats `remove(int)` vs `remove(Object)`, which dynamic-array owns.

### R2. Java

| Concepts | Comparisons | Terms | Checked / fixed / removed | Cheat sheet |
|---|---|---|---|---|
| 64 | 31 | 303 | ~2,400 / 32 / 2 | ~14 min |

- **Order:** in OOP, classes, constructors and the keywords now come before the four principles, and nested and anonymous classes come after interfaces. In Collections, generics comes first, and Comparable/Comparator comes before Set and Map.
- **Examples:** the running example is a `Payment` record with a `Status` enum. Every program ran on JDK 21 and, for Java 22–25 features, on Temurin 25.
- **Corrections worth knowing:**
  - `this()` / `super()` need not be the first statement since Java 25 (JEP 513).
  - The Integer cache is guaranteed only for constants.
  - `List.of(1, 2)` passed to a `List<Number>` parameter compiles.
  - The CompletableFuture common-pool fallback is no longer in the Java 25 Javadoc, so it was removed.
- **Weak sources:**
  - Association vs aggregation vs composition rests on UML 2.5.1 plus one GeeksforGeeks page; the Java docs do not define these terms.
  - Some interview questions cite interview-prep sites (GeeksforGeeks, InterviewBit) only to show they are commonly asked.
- **Left out (no primary source):** which of two equal top earners `Stream.max` returns; a key order for plain `groupingBy`; the GoF "23 patterns" count; the JDBC version that made `Class.forName` unnecessary.

### R3. Microservices

| Concepts | Comparisons | Terms | Checked / fixed / removed | Cheat sheet |
|---|---|---|---|---|
| 44 | 31 | 291 | ~1,620 / 33 / 3 | ~10.5 min |

- **Running example:** a shop with Order, Payment, Inventory and Notification services. The ₹500 charge flow is used across sagas, outbox, idempotency and the design walkthrough.
- **Code:** Java examples compile against Spring 7.0.5, Spring Cloud 5.0.x, Resilience4j 2.4.0 and kafka-clients 4.3.x. Two output panels are real runs. Kubernetes YAML passed kubeconform. The kubectl commands and the Spring Cloud Gateway YAML were checked against the docs only, because there is no cluster or gateway app here.
- **Corrections worth knowing:**
  - Kafka Streams is exactly-once only with `processing.guarantee=exactly_once_v2`; the default is at-least-once.
  - The PostgreSQL 18 default leaves 97 app connections, not 100.
  - Polling outbox relays cannot guarantee strict publish order.
  - The design-walkthrough diagram was fixed to match the saga order.
- **Left out (no primary source):** that Istio proxies keep their last configuration when the control plane is down; that a BFF is usually owned by the client team.
- **Design judgement, not a doc quote:** "retry a timed-out charge with the same idempotency key, or query its status, before compensating" (saga, Common mistakes).
- **Re-check later:** OAuth 2.1 is described as still an Internet-Draft in 2026 (draft 16).

### R4. SQL & Databases

| Concepts | Comparisons | Terms | Checked / fixed / removed | Cheat sheet |
|---|---|---|---|---|
| 60 | 33 | 270 | ~1,880 / 17 / 2 | ~15 min |

- **Order:** NULL handling now comes right after SELECT, and "Logical order of a SELECT" comes after GROUP BY and joins.
- **Running example:** a customers / payments / refunds schema, plus `employees` for the Nth-highest and self-join questions. Every query ran on PostgreSQL 18.6, and on MySQL 9.7.2 where the two differ.
- **Corrections worth knowing:**
  - MySQL rejects `IS NOT DISTINCT FROM` and `NULLS FIRST/LAST`.
  - After an error, MySQL undoes only the failed statement, so a COMMIT saves the rest.
  - MySQL's binary log is not a write-ahead log.
  - In MySQL, dividing by zero gives NULL in a SELECT but an error in INSERT or UPDATE.
  - Materialized views exist only on MySQL HeatWave (9.5+).
- **Observed in runs but not stated in the docs (left out of the text):**
  - MySQL 9.7.2 silently accepts `CREATE MATERIALIZED VIEW` and `ON DELETE SET DEFAULT`.
  - The MySQL 9.7.2 container defaults to `explain_format = TREE`.
- **Rests on runs only:** in PostgreSQL 18, COMMIT in an aborted transaction reports ROLLBACK.
- **For the owner:**
  - The Backend and Patterns parts use slightly different sample customer rows.
  - Eight concepts still cite GeeksforGeeks for "commonly asked" interview questions.
  - Transactions stays at heat 2, but the coverage file suggests 3.

### R5. REST API

| Concepts | Comparisons | Terms | Checked / fixed / removed | Cheat sheet |
|---|---|---|---|---|
| 40 | 20 | 285 | ~1,370 / 32 / 2 | ~10 min |

- **Order:** the opening concept is now "Anatomy of an HTTP request and response", which teaches client, server, request and response before "What REST is".
- **Running example:** the ₹500 payment API (`POST /payments`, refunds, `Idempotency-Key`, a merchant webhook). It ends in the payment API walkthrough.
- **Corrections worth knowing:**
  - Injection was its own item only in OWASP's 2019 API list.
  - RFC 6749 says a client-credentials refresh token SHOULD NOT be issued.
  - With `issuer-uri`, Spring trusts the issuer's published key algorithms.
  - `@ResponseStatus(reason)` sends JSON to a JSON client.
  - OpenAI's SDKs retry 429 and 5xx twice by default.
  - Offset pagination gets slower the deeper you page.
- **Code:** runs used Spring Boot 4.0.3 / Spring Framework 7.0.5 jars (the 4.1 jars are not cached locally; the APIs used are unchanged). No live OpenAI call was made.
- **Left out:** whether Stripe returns 402 specifically for card declines (the text says "4xx"); `springdoc.swagger-ui.enabled`.

### R6. Redis

| Concepts | Comparisons | Terms | Checked / fixed / removed | Cheat sheet |
|---|---|---|---|---|
| 39 | 14 | 227 | ~1,280 / 27 / 0 | ~10 min |

- **Order:** "Expiry and Memory" (TTL, eviction) now comes before Caching, because cache-aside relies on TTL.
- **Running example:** a payment service caching `payment:9001` and `merchant:42:config` from PostgreSQL, plus a login rate limiter (`rate:user:7:login`), a payment lock and a leaderboard. Every redis-cli output panel ran on Redis 8.10.2, and the Java examples ran on Spring Data Redis 4.1.1 with Lettuce or Jedis.
- **Corrections worth knowing:**
  - A plain SET drops the old TTL.
  - Redisson's 30 s is the lock's expiry, not the renewal interval.
  - Hash tags use the first `{` and the next `}`, and only when the text between is not empty.
  - `sync = true` does not lock with the default Redis cache writer.
  - Cached classes need Java serialisation by default.
  - Vector sets are no longer beta.
- **Left out (new or not in the docs):**
  - Redis 8.8 Arrays: only one Rules line; there is no tree node yet.
  - Redis 8.10 `BACKUP` commands, `WAITAOF`, and compact hashes.
  - Whether a hash shrinks back to listpack.
  - Which Java clients besides Jedis support client-side caching.
- **Run-dependent numbers:** SCAN cursors, stream ids, `evicted_keys`, MEMORY USAGE and TTLs come from one real run and differ on re-runs. The "What to notice" text says so.

### R7. Docker

| Concepts | Comparisons | Terms | Checked / fixed / removed | Cheat sheet |
|---|---|---|---|---|
| 32 | 16 | ~260 | ~475 / 0 / 0 | ~8 min |

- **Order:** containers vs VMs, then images and layers, then registries, then Docker's architecture, then namespaces and cgroups.
- **Running example:** packaging the Spring Boot payment service (Dockerfile, multi-stage build, Compose with PostgreSQL and Redis, CI). Every command and Dockerfile ran on Docker Engine 29.1.3; output panels are real runs, all `inrv-`-prefixed artifacts removed.
- **Verification:** both passes found 0 factual errors. The content was accurate.
- **For the owner / to watch:**
  - "Tens of MB" for container size is Docker's own wording.
  - This host has no buildx plugin (legacy builder is the default here), but the BuildKit panel is the documented default; BuildKit was run with a verified-checksum buildx binary in a scratch config.
  - cgroup v1 support ends ~May 2029.

### R8. Kubernetes

| Concepts | Comparisons | Terms | Checked / fixed / removed | Cheat sheet |
|---|---|---|---|---|
| 39 | 23 | ~300 | ~890 / 1 / 0 | ~9.5 min |

- **Order:** what Kubernetes is, the architecture, Kubernetes and Docker (CRI), kubectl and manifests, then labels; the cluster and Pods before controllers, Services, probes, scaling and traffic.
- **Running example:** deploying the payment-service image from the Docker tech (Deployment, Service, Ingress/Gateway, ConfigMap/Secret, probes, HPA, a PostgreSQL StatefulSet). Baseline Kubernetes 1.37.
- **Correction:** a Gateway API HTTPRoute backend with weight > 0 takes all traffic when it is the only non-zero weight; weight 0 forwards none. The draft was wrong.
- **Runs:** outputs come from throwaway kind clusters (unique `inrv-` names, deleted after). Some behaviour rests on docs only where a cluster could not start (the host's inotify limit blocks a 4th concurrent cluster).
- **To watch:** Gateway API v1.7 is at rc.1; Helm 3 reaches end of life 10-02-2027; IPVS proxy mode is off by default from 1.40.

### R9. Design Patterns

| Concepts | Comparisons | Terms | Checked / fixed / removed | Cheat sheet |
|---|---|---|---|---|
| 37 | 15 | ~200 | ~650 / 3 / 0 | ~9 min |

- **Order:** pattern basics, then SOLID, then creational, structural, behavioural (split into algorithms/requests and events/object-structures), then patterns in real apps, then choosing a pattern.
- **Running example:** one payment domain reused across patterns (Strategy for card/UPI/wallet, Factory for gateway clients, Adapter for a third-party SDK, Decorator for logging/retry, Observer for notifications, State for PENDING→PAID→REFUNDED, Builder for PaymentRequest, Chain of Responsibility for fraud/limit/KYC checks, Template Method, Command for refunds, Proxy for caching, Singleton for config). Every runnable example compiled and ran on JDK 21.
- **Baseline:** GoF (1994) for the 23 patterns, Robert C. Martin for SOLID, Spring Framework 7.0 / Spring Boot 4.1 for the "patterns in Spring" concept.
- **Corrections worth knowing:**
  - Spring's several-constructors fallback uses the "primary/default (often no-argument) constructor", not strictly the no-argument one.
- **Verification:** 650 claims checked across three passes; the only fixes were that wording, a cheat-card trim and a grammar slip. The content was accurate.

### R10. AWS

| Concepts | Comparisons | Terms | Checked / fixed / removed | Cheat sheet |
|---|---|---|---|---|
| 45 | 24 | ~290 | ~755 / 4 / 0 | ~11 min |

- **Order:** cloud and AWS basics, then networking (moved up, because compute and databases live in VPC subnets), then compute, storage, databases, security, messaging/integration, operations.
- **Running example:** deploying the Spring Boot payment service on AWS (VPC with public/private subnets across 2 AZs, ALB → ECS Fargate, RDS Multi-AZ, ElastiCache, S3 behind CloudFront, SQS/SNS, IAM task roles, Secrets Manager, CloudWatch).
- **Code:** Java examples compile against AWS SDK for Java v2 (2.30.18). No AWS account here, so there are no live output panels; CLI, IAM policies and CloudFormation/CDK are checked against the docs only. Prices are never stated as numbers.
- **Corrections worth knowing:**
  - S3's max object size is 48.8 TiB.
  - Rolling deployments have no default bake time.
  - IAM default is implicit deny; a guardrail (SCP/RCP) grants nothing.
- **Not pinned down:** the EventBridge enhanced Custom Event Bus is confirmed real (subscribers, 1–365-day retention, replay, FIFO, dedup) but its exact GA date and Region availability could not be confirmed; the text says "launched in 2026".
- **Dated facts to re-check:** AWS SDK v1 reached end of support 31-12-2025; X-Ray SDK entered maintenance mode 25-02-2026 (use OpenTelemetry); ECS built-in blue/green launched 17-07-2025.

### R11. Kafka

| Concepts | Comparisons | Terms | Checked / fixed / removed | Cheat sheet |
|---|---|---|---|---|
| 41 | 16 | ~240 | ~720 / 4 / 0 | ~9.7 min |

- **Baseline:** Apache Kafka 4.3 (KRaft only; ZooKeeper removed in 4.0), Spring for Apache Kafka 4.x, Java 25.
- **Running example:** payment events — a Payment service produces `PaymentCompleted` to a `payments` topic keyed by orderId; a Notification service and an Analytics service read it in their own consumer groups; the classic failures (duplicate event, poison message, slow consumer, lag). CLI and Java output panels come from real runs on single- and three-broker Kafka 4.3 clusters in Docker (all `inrv-` containers removed).
- **Corrections worth knowing:**
  - Several output panels were replaced with real runs (perf-test percentiles, the partition-shrink `InvalidPartitionsException` message).
  - Dropped an unverified "since Kafka 4.0" on the in-flight>5 idempotence ConfigException.
  - The new consumer group protocol (KIP-848) is GA in 4.0, broker-side with client opt-in, planned default in 5.0.
- **Not re-confirmed:** CooperativeStickyAssignor is attributed to Kafka 2.4 from secondary sources; whether share groups are on by default in a new 4.2/4.3 cluster (the content makes no claim).
- **Newer than baseline, left out:** kafka-clients 4.4.0 is on Maven Central; whether 4.1-upgraded clusters get Eligible Leader Replicas by default.

### R12. React & Frontend

| Concepts | Comparisons | Terms | Checked / fixed / removed | Cheat sheet |
|---|---|---|---|---|
| 39 | 18 | ~250 | ~656 / 0 / 0 | ~10 min |

- **Order:** Web and Browser Basics first (how a page loads/renders, the DOM), then CSS, then JavaScript (two units), then React fundamentals, hooks, state/data/routing, performance, and Next.js/testing/playbook.
- **Running example:** a small payments dashboard (PaymentList, PaymentRow, a status filter, a refund button, a create-payment form) reused across state, hooks, data fetching, performance and routing.
- **Baseline:** React 19.3, Next.js 16.4, React Router 8, Vite 8, ECMAScript 2026. `codeLanguages: [jsx]`.
- **Verification:** 656 claims checked across two passes; nothing was wrong. JS examples ran on Node; React/Next behaviour confirmed against react.dev, nextjs.org, TanStack and Testing Library docs (TanStack Query v5 defaults, React Compiler v1.0, useEffectEvent stable in 19.2, next/image priority→preload deprecation).
- **Dated facts to re-check:** React Compiler v1.0 (07-10-2025); several library defaults move between versions.

### R13. OS & Networking

| Concepts | Comparisons | Terms | Checked / fixed / removed | Cheat sheet |
|---|---|---|---|---|
| 40 | 21 | ~285 | ~450 / 2 / 0 | ~11 min |

- **Order:** OS basics and processes, concurrency, memory, I/O/files/IPC, then network layers, TCP/UDP, HTTP/TLS/DNS, and networks in system design.
- **Running example:** a payment server — a Java server socket handling clients on threads (thread-per-connection vs thread pool), reading/writing a log file, talking to a database over TCP, and the full journey of one POST /payments request down the stack (HTTP → TLS → TCP → IP) and back. Generic OS with Linux as the concrete example; this host's real processes/interfaces are never shown (commands run in a container).
- **Protocol facts cite their RFC.** TLS 1.3 = RFC 9846 (confirmed via the IETF datatracker to obsolete RFC 8446 as the current spec; the tech note's "RFC 8446" baseline line is outdated and should be updated to 9846).
- **Corrections:** HTTP/2 server push is disabled by default in Chrome 106 (not "removed").
- **Run-dependent:** a StackOverflowError depth (~22,000) varies by run/JIT; the text hedges with "about".

### R14. AI Engineering (rewritten in teaching template v3)

AI Engineering (slug `ai-engineering`) was rewritten from v2 into teaching template v3 on 27-10-2026, with cheat-sheet cards. This supersedes the earlier v2 content described in section P; the facts in P were re-verified as part of this pass.

| Concepts | Comparisons | Terms | Checked / fixed / removed | Cheat sheet |
|---|---|---|---|---|
| 45 | 22 | 254 | ~1,020 / 0 / 0 | ~11 min |

- **Order (dependency-first):** AI Foundations (what ML/DL/GenAI are, for a backend dev new to ML) → How LLMs Work → Prompt Engineering → Tools, Agents and Memory → Embeddings and Vector Search → RAG → Safety and Evaluation → AI in Java Backends.
- **Running example:** a support assistant for the payments app — it answers payment questions using retrieval over product docs and the user's own payment records, calls a `getPaymentStatus(orderId)` tool, and runs inside a Spring Boot service. Reused across prompting, tools, embeddings, RAG, safety and production.
- **Baseline:** Java 25, Spring Boot 4.1, Spring AI 2.0.1, PostgreSQL 18 + pgvector 0.8.7, MCP spec 2026-07-28, OWASP Top 10 for LLM Applications 2025. Vendor-neutral prose; OpenAI/Anthropic named only for a dated, sourced fact. `codeLanguages: [java]`. **No LLM reply is ever shown as a real output panel** (replies are not reproducible); example replies are labelled as examples.
- **Verification:** ~1,020 claims checked across three outsider passes; nothing was wrong. Confirmed against primary sources: OWASP LLM Top 10 2025; Spring AI 2.0.1 pinned (TokenTextSplitter 800-token default and no overlap in 2.0.1, SearchRequest topK 4, MessageWindowChatMemory 20, ChatClient `.call()`/`.stream()`, 60s timeout / 3 retries, prompt-logging default off); pgvector 0.8.7 (m 16, ef_construction 64, ef_search 40, probes 1, `<=>`/`<#>`/`<->`, 2000/4000 dim limits, HNSW vs IVFFlat); MCP 2026-07-28 (1:1 client-server, stateless, JSON-RPC, tools/resources/prompts); LoRA freezes base weights (Hu et al. 2021); prompt caching (Anthropic 5-min default + 1-hour, OpenAI on by default); PostgreSQL 18 defaults. Runnable snippets re-run on JDK 21, tiktoken (o200k_base: 5/8/2) and real PostgreSQL 18 + pgvector 0.8.7 in Docker — all output panels match.
- **Dated facts to re-check before interviews (flagged in prose):** sampling-parameter deprecations (Anthropic temperature deprecated on newer models; `effort` replacing `budget_tokens`; `output_config.format`); provider fine-tuning platform status; prompt-cache defaults. **For the owner:** Spring AI `main` (future 3.x) adds TokenTextSplitter overlap — re-check if the baseline is bumped.
