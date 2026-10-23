# Coverage: SQL & Databases
Reference: reference/sql.md  ·  Last updated: 21-10-2026

The reference has two parts: Part A (sections A1–A47, a one-shot guide) and Part B (sections B1–B24, a cheat sheet; B21 holds
the lettered query patterns B21.A–B21.L). Every section and every lettered pattern appears in exactly one of Mapped, Corrected or
Dropped; questions and "X vs Y" pairs inside a section are named in its row. A section whose parts went to different places has
one row here (Corrected wins over Mapped), and its other parts are listed under "Details placed elsewhere or cut". Baseline for
corrections: PostgreSQL 18 and MySQL 9.7 LTS. Sources are primary pages (PostgreSQL 18 docs, MySQL 9.7 manual, OWASP, HikariCP,
Hibernate, Redis docs, original papers).

## Mapped
| Reference item (key + short title) | Landed in | Note |
|---|---|---|
| A1. What is a database? (database, DBMS, examples) | concept relational-databases (points, Interview Q DBMS vs RDBMS); glossary database-term, dbms |  |
| A2. SQL vs NoSQL (SQL examples, "good when", NoSQL families with MongoDB/Redis/Cassandra/Neo4j, "easy memory" line) | concept sql-and-nosql (embeds comparison sql-vs-nosql; points; trap); tree node nosql with 4 families; glossary nosql, document-database, key-value-store, wide-column-store, graph-database | "Huge scale / distributed" kept as "usually built to scale out"; the memory line was not copied |
| A3. Table, row, column | concept relational-databases (Mermaid, point "Table"); glossary tuple, attribute-term; tree node tuple |  |
| A4. Primary key (properties, interview answer) | concept keys (point, sayIt); glossary primary-key; tree node primary-key |  |
| A5. Foreign key (example, "easy memory" line) | concept keys (point, example, trap); glossary foreign-key, referential-integrity | Memory line not copied; hook rewritten |
| A6. Relationships (one-to-one person/passport, one-to-many user/orders, many-to-many students/courses with junction table) | concept relationships (Mermaid ER diagram, points, trap, example, 2 Interview Qs); glossary junction-table | Self-reference added from scope |
| A7. SQL Commands (CRUD: INSERT, SELECT, UPDATE, DELETE examples) | concept sql-commands (point CRUD, example); glossary crud |  |
| A8. WHERE (filters records) | concept select-and-filtering (example); tree where-clause |  |
| A9. ORDER BY (ASC / DESC) | concept select-and-filtering (point ORDER BY); tree order-by-clause |  |
| A10. GROUP BY (make groups, calculate per group) | concept aggregates-group-by (hook, example); glossary group-by-term |  |
| A11. Aggregate Functions (COUNT, SUM, AVG, MIN, MAX) | concept aggregates-group-by (points); glossary aggregate-function |  |
| A12. HAVING (WHERE filters rows, HAVING filters groups; WHERE before / HAVING after grouping) | comparison where-vs-having (embedded in aggregates-group-by) |  |
| A14. Normalization (bad/better users-orders split, 1NF/2NF/3NF memory lines, "reduces duplicate data") | concept normalization (hook, points, Steps with one orders example); glossary 1NF, 2NF, 3NF | Example rebuilt on the shared schema (orders, users, products) |
| A18. Transactions (definition, transfer both-or-neither) | concept transactions (Why, Example) |  |
| A19. ACID (A, C, I, D meanings; transfer example); A19. ACID memory line | concept acid (table, points, Example); concept acid (hook) | The reference's memory words are not used. The hook is a new one-line memory aid. Replaced by its own wording, not copied |
| A24. EXPLAIN (table scans, index usage, joins, estimated cost, bottlenecks; PostgreSQL EXPLAIN ANALYZE) | concept `explain-query-plans` (points, example, Interview Qs) |  |
| A26. Constraints (list, email UNIQUE NOT NULL example) | concept constraints (table, example) |  |
| A27. NULL (not 0, not ''; IS NULL not = NULL) | concept null-handling (points Test it, Not a value; Interview Q) |  |
| A28. Views (saved query as virtual table; uses: simplify, abstraction, controlled access) | concept views (hook, point "Uses", Interview Q "view vs table") |  |
| A29. Stored Procedure (database-side program; reusable operations, complex DB-side logic) | concept stored-procedures-triggers (points "Procedure", "Gains", "Costs") | The "modern apps" claim is in Dropped |
| A30. Trigger (fires on an event; INSERT user → audit flow; uses: auditing, automatic updates; hidden logic warning) | concept stored-procedures-triggers (Mermaid flow, Example audit trigger, Interview Q "When would you use a trigger, and why be careful?") |  |
| A31. OLTP vs OLAP (OLTP: login, order, payment, many small transactions, consistency; OLAP: revenue, sales by region, trends, large aggregations; memory line) | comparison oltp-vs-olap; concept oltp-and-olap (hook, points) |  |
| A35. CAP theorem (C, A, P; partition = broken link between nodes; choose C or A during a partition; model interview answer) | concept cap-theorem (hook, points, Mermaid, sayIt, Interview Qs); glossary cap-theorem-term, linearizability; tree network-partition | Added: C = linearizability, not ACID's C; "CA" trap; PACELC |
| A36. SQL Injection (concatenation bad; prepared statements and parameterized queries; WHERE name = ?) | concept sql-injection (table, example, points) |  |
| A37. Connection Pool (opening a connection is expensive; pool reuses connections; HikariCP in Spring Boot) | concept connection-pooling (why, Mermaid, points); tree node hikaricp; glossary connection-pool, hikaricp | "commonly used" made precise: Spring Boot picks HikariCP first when it is present |
| A38. Database in a Backend Application (Client → Controller → Service → Repository → Database; GET /users/10 example) | concept orm-jpa (Mermaid flow, extended with Hibernate, JDBC and the pool as in the A47 backend flow) | the GET /users/10 walk-through is the same flow, merged |
| A39. ORM (Java object ↔ table; User class ↔ users table; JPA spec, Hibernate implementation) | concept orm-jpa (hook, trap, Example); comparison jdbc-vs-jpa-vs-hibernate |  |
| A40. JPA / Hibernate (findById generates SQL; why SQL knowledge is still needed: complex queries, performance, joins/indexes, inefficient generated SQL) | concept orm-jpa (bullets, Interview Q "Why learn SQL if you use an ORM?") |  |
| A41. N+1 Query Problem (1 query for 100 users + 100 for orders = 101; fixes: joins, fetch strategies, batch fetching, careful queries) | concept n-plus-one (why, fix table, Example, Interview Qs) | "fetch strategies" made concrete: JOIN FETCH, @EntityGraph; EAGER added as the trap |
| A44. Database vs Cache (DB = source of truth; cache = fast copy; hit/miss flow through Redis) | concept caching-redis (hook, Steps, points); comparison database-vs-cache |  |
| A46. Database backup and recovery (backup, restore, point-in-time recovery, replication, disaster recovery) | concept backup-recovery (Steps for PITR, Example, Qs); comparison logical-vs-physical-backup; glossary point-in-time-recovery, rpo, rto | "Replication" listed as a backup concept: clarified that a replica is not a backup (replication trap; see A32 correction). "Disaster recovery" became RPO / RTO |
| A47. Most important questions (lines: SQL CRUD, GROUP BY / HAVING, NULL, Joins in Tier 1); A47. Most important questions (Tier 1 item "Normalization"); A47. Most asked (lines: "Indexes", "EXPLAIN", "Pagination", memory map "Index / Execution Plan", final answer "use proper indexes … use pagination …"); A47. Priority list: Transactions, ACID, Isolation levels, Deadlocks; A47 Tier 2 items 21-23 (Replication, Sharding, Partitioning); A47 Tier 3 item 26 (CAP theorem); A47 Tier 3 item 27 (Read replicas); A47 Tier 3 item 28 (Database scaling); A47 Tier 3 item 29 (Consistency); A47 Tier 3 item 30 (High availability); A47 Tier 3 item 31 (Backup/recovery); A47 Tier 3 item 32 (Distributed transactions); A47 final memory map, scaling branch (Scaling → Replication = copy data, Sharding = split data); A47 final answer: "How do you make a database-backed application fast?" (indexes, query and join tuning, avoid N+1, pagination, pooling, caching, then replicas, partitioning, sharding); A47 (Tier 1 list, as scope hint). Most important DB interview questions | concepts sql-commands, aggregates-group-by, null-handling, joins (heat 2–3); concept normalization heat 3; concepts `indexes`, `explain-query-plans`, `pagination`, `query-optimization`; heat 3 for transactions, acid and isolation-levels; heat 2 for deadlocks; concepts replication, sharding, partitioning; concept cap-theorem; concept replication; step 4 of scaling-ladder; concept scaling-ladder (Steps, Qs); concept cap-theorem; comparison strong-vs-eventual-consistency; glossary eventual-consistency, read-your-writes; concept backup-recovery (failover point, hook); glossary high-availability, failover, standby-server; concept backup-recovery; concept distributed-transactions; comparison two-phase-commit-vs-saga; comparison replication-vs-sharding (gist lines); concept scaling-ladder (sayIt, Steps, trap); heat choices for this unit; sql-problem-approach links joins, GROUP BY/HAVING, NULL | Used as a heat hint only. Used only as a heat hint Only the index/plan/pagination lines; the rest of A47 belongs to other units Used as a hint only Priority hint only; used for heat 2 Heat 3 Wording is ours; ASCII map not copied Own words; added "scale up" rung and the sign to move up each rung. Pagination and N+1 belong to other units and are linked/mentioned, not restated The Tier 1 items themselves are owned by other units (master.json); the memory map and the "make it fast" answer are not in this unit's scope |
| B3. SQL data types (INT, BIGINT, DECIMAL/NUMERIC, FLOAT/REAL/DOUBLE, CHAR, VARCHAR, TEXT, TIMESTAMP, Boolean, JSON/JSONB); B3. part: rules (DECIMAL for money, VARCHAR(n) limit, CHAR padded, PostgreSQL BOOLEAN vs MySQL TINYINT(1), JSONB decomposed + indexable, MySQL native JSON, timestamptz normalises and does not keep the zone, MySQL TIMESTAMP vs DATETIME) | concept data-types (table, points, trap, example, Interview Qs CHAR vs VARCHAR, JSON vs JSONB, TIMESTAMP vs DATETIME); concept data-types (points, table, Interview Qs); comparison decimal-vs-float; glossary jsonb, timestamptz | JSONB indexing detail left to index-types |
| B6. SQL joins (part: INNER, LEFT, RIGHT, FULL OUTER); B6. SQL joins (part: MySQL has no FULL OUTER JOIN, emulate with UNION); B6. SQL joins (part: other joins: CROSS 3 × 4 = 12, SELF, EQUI, NON-EQUI); B6. SQL joins (part: ON vs WHERE trap with LEFT JOIN); B6. SQL joins (part: find users with no orders, LEFT JOIN … IS NULL, NOT EXISTS); B6 (part: find users who have no orders: LEFT JOIN … WHERE o.id IS NULL, assumes non-NULL key; NOT EXISTS alternative) | concept joins (table); comparison inner-vs-left-join; concept joins (point MySQL, Interview Q); tree full-outer-join; concept joins (table, point Equi vs non-equi); glossary cross-join, self-join, equi-join; concept joins (trap, example); comparison inner-vs-left-join (row); concept anti-join-pattern (patterns unit); joins links to it; concept anti-join-pattern (point "LEFT JOIN … IS NULL", Example second query, tree left-join-is-null) | Owned by the patterns unit, not repeated here. |
| B7. Subqueries (part: scalar, IN, EXISTS, SELECT 1 convention); B7. Subqueries (part: correlated vs non-correlated; "may be evaluated repeatedly or transformed"); B7. Subqueries (part: IN vs EXISTS; optimiser may produce similar plans; NOT IN vs NOT EXISTS) | concept subqueries (table, point EXISTS); concept subqueries (point, trap, Interview Q); glossary correlated-subquery; comparison in-vs-exists; concept null-handling owns the NOT IN trap |  |
| B9. Constraints (table, example, rules: DEFAULT vs explicit NULL, CHECK and NULL, multi-column UNIQUE, FK referenced columns, FK actions, ON DELETE CASCADE example, PK vs FK) | concept constraints (points, trap, bullets, Interview Qs CASCADE and RESTRICT vs NO ACTION); referenced-column rule → concept keys (point "Foreign key"); PK vs FK → concept keys; glossary on-delete-cascade, check-constraint, not-null-constraint | "Semantics vary" made concrete: PostgreSQL NO ACTION deferrable vs RESTRICT; InnoDB NO ACTION = RESTRICT and rejects SET DEFAULT |
| B10. Normalization (part: definition and duplicated customer example); B10. Normalization (part: three anomalies: insertion, update, deletion); B10. Normalization (part: normal forms table 1NF, 2NF, 3NF, BCNF); B10. Normalization (part: 2NF example with (student_id, course_id) and student_name); B10. Denormalization (part: definition, consistency vs redundancy trade-off); B10. Denormalization (part: interview answer "normalise first, denormalise when measured workload justifies it") | concept normalization (Why it exists, Example update-anomaly table); concept normalization (Interview Q "What problems does normalisation solve?"); tree update-anomaly, insertion-anomaly, deletion-anomaly; glossary terms; concept normalization (points, Interview Qs "Explain 1NF, 2NF, 3NF", "BCNF vs 3NF"); tree; glossary bcnf, functional-dependency; concept normalization (Steps: 2NF step uses (order_id, product_id) and product_name); comparison normalization-vs-denormalization; concept denormalization (points); concept denormalization (point "Rule", sayIt); comparison verdict | Same idea, one running example instead of a second one |
| B13. Anomalies table: dirty, non-repeatable, phantom, lost update, write skew; B13. Isolation levels table (standard model); B13. PostgreSQL vs MySQL: defaults Read Committed vs Repeatable Read; B13. PostgreSQL Repeatable Read = snapshot isolation, no phantoms, write skew possible; B13. InnoDB Repeatable Read: snapshot plus locking reads; B13. Serializable: blocking or serialization failures; B13. Optimistic vs pessimistic locking; B13. SELECT … FOR UPDATE example; B13. Version-column UPDATE example; B13. Zero rows updated (changed, or row missing); B13. Deadlock definition and example; B13. Reduce deadlocks: consistent order, short transactions, fewer locks, indexes | tree read-anomalies (5 children); comparison dirty-vs-nonrepeatable-vs-phantom-read; concept isolation-levels (Interview Q on write skew); concept isolation-levels (How it works table); concept isolation-levels (points); comparison read-committed-vs-repeatable-read; concept isolation-levels (point); tree write-skew; glossary snapshot-isolation; concept isolation-levels (bullet); comparison read-committed-vs-repeatable-read; tree next-key-lock; concept isolation-levels (point, trap); tree serializable (InnoDB FOR SHARE); concept optimistic-pessimistic-locking; comparison optimistic-vs-pessimistic-locking; concept locking (table, Interview Q); comparison optimistic-vs-pessimistic-locking; concept optimistic-pessimistic-locking (Example); concept optimistic-pessimistic-locking (Interview Q); concept deadlocks; concept deadlocks (point, Interview Q); tree lock-ordering |  |
| B14. Window functions (part: intro, rows not collapsed); B14. Window functions (part: ROW_NUMBER / RANK / DENSE_RANK, 100, 100, 90); B14. Window functions (part: PARTITION BY vs GROUP BY); B14. Window functions (part: running total with ROWS BETWEEN); B14. Window functions (part: LAG / LEAD); B14. Window functions (part: second-highest distinct salary); B14 (part: second-highest distinct salary, NULL when none, DENSE_RANK alternative); B14 (part: running total example with ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW); B14 (part: LAG and LEAD use, previous/next row without a self-join) | concept window-functions (hook); comparison group-by-vs-partition-by (embedded); comparison row-number-vs-rank-vs-dense-rank; concept window-functions (example result, Interview Q); comparison group-by-vs-partition-by; concept window-functions (trap on the default frame); concept running-totals-and-streaks (patterns unit); concept window-functions (point, example); glossary lag-lead; concept top-n-per-group (patterns unit); window-functions links to it; concept top-n-per-group (point "Second highest", table row "Nth highest value" with DENSE_RANK); concept running-totals-and-streaks (point, Interview Q, tree running-sum); concept running-totals-and-streaks (point "Change", Why, tree lag-difference) | The solved problem belongs to patterns. Not in this unit's ref parts; noted so it is not lost. Same fact as B21.A, written once LAG/LEAD definitions stay in window-functions |
| B15. CTEs (part: WITH for readability, named steps); B15. CTEs (part: Q "CTE vs subquery", "neither automatically faster"); B15. CTEs (part: recursive CTE for employee-manager trees, account for cycles) | concept ctes (points); glossary cte; comparison cte-vs-subquery; concept ctes (trap); concept ctes (Steps, example, Interview Qs); tree cycle-clause, cte-max-recursion-depth | Made specific: PostgreSQL 12+ inlining, MATERIALIZED. |
| B16. Set operations (UNION, UNION ALL, INTERSECT, EXCEPT; MySQL 8.0.31; compatible columns; UNION ALL cheaper; ORDER BY at the end) | concept set-operations; comparison union-vs-union-all | MySQL 8.0.31 confirmed. |
| B17. Views etc. (parts: feature table rows View and Materialized view); B17. (part: view example paid_orders); B17. (part: materialized view example and REFRESH); B17. (part: MySQL has no native materialized views; summary table maintained by jobs or app); B17. (parts: feature table rows Stored procedure, Function, Trigger); B17. (part: procedure vs function; "capabilities vary between PostgreSQL and MySQL"); B17. (part: trigger on INSERT/UPDATE/DELETE; useful for auditing; excessive trigger logic hides side effects) | comparison view-vs-materialized-view; glossary view-term, materialized-view; concept views (Example SQL, explicit columns instead of SELECT *); concept views (Example SQL, point "REFRESH"); tree refresh-concurrently; concept views (point "MySQL 9.7"), comparison row "MySQL 9.7"; tree summary-table (under denormalization); concept stored-procedures-triggers (points); glossary stored-procedure, user-defined-function, db-trigger; comparison stored-procedure-vs-function (rows name each product's rule); concept Interview Q "Stored procedure vs function?"; concept stored-procedures-triggers (point "Trigger", point "Costs", trap) |  |
| B19. Q: "What is a covering index?"; B19. Q: "What is a composite index?" (column order matters); B19. Q: "Why is a function on an indexed column a problem?"; B19. Q: "What is cardinality?" (two meanings); B19. Q: "What is selectivity?"; B19. Optimisation (7-step order: measure, plan, indexes, reduce work, joins/subqueries, statistics/schema, measure again); B19. Q: "Does SELECT * slow a query?"; B19. Q: "Why use pagination?" | concept `composite-indexes` (point, Interview Q, example); glossary `covering-index`; concept `composite-indexes` (hook, points); concept `index-not-used` (Interview Q); concept `index-not-used` (point, Interview Q); glossary `cardinality`; concept `index-not-used` (point, Interview Q); glossary `selectivity`; concept `query-optimization` (Steps); concept `query-optimization` (point, Interview Q); concept `pagination` (Why it exists, Interview Q) | Kept the column meaning; the planner's "estimated rows" meaning is covered by "estimated vs actual rows" in `explain-query-plans` Merged with A43 into one 6-step list Made concrete: it rules out index-only scans |
| B20. SQL injection and database security (parts: unsafe Java example, safer JDBC PreparedStatement example); B20. SQL injection and database security (parts: remember list: parameterize, never concatenate, least privilege, validation not alone, identifiers via allowlist) | concept sql-injection (Example); comparison statement-vs-preparedstatement; concept sql-injection (points, trap, Interview Qs); tree nodes allowlist, least-privilege, input-validation |  |
| B21 (intro). SQL interview query patterns, "useful for coding rounds" | concept sql-problem-approach (Steps + pattern-picker table) | The intro has no facts; it became the owner's "tricks" concept: six steps and question words → pattern |
| B23. PostgreSQL-specific concepts, part: intro; B23. PostgreSQL-specific (line: ILIKE); B23. PostgreSQL-specific (part: SERIAL / IDENTITY, identity is the standards-oriented choice); B23. PostgreSQL-specific (part: JSONB GIN indexes for containment and key-exists); B23. PostgreSQL-specific (parts: EXPLAIN ANALYZE; ANALYZE collects planner statistics); B23. MVCC; B23. VACUUM (dead tuples, visibility, routine maintenance); B23. WAL (crash recovery and replication); B23. PostgreSQL-specific concepts (part: RETURNING); B23. PostgreSQL-specific concepts (part: ON CONFLICT) | concept postgresql-and-mysql (Why); concept select-and-filtering (bullet); glossary ilike; concept id-generation (point "IDENTITY", table, Interview Q gaps); tree identity-column, serial-type, sequence-object; concept `index-types` (trap, example, Interview Q); concept `explain-query-plans`; concept `index-not-used` (point "Statistics"); tree `planner-statistics`; concept mvcc; concept mvcc (point, Interview Q); tree vacuum, autovacuum, xid-wraparound; concept wal (Steps, bullet linking replication); concept upsert (table, Interview Q); tree node returning-clause; glossary returning-clause; concept upsert; tree node on-conflict; glossary on-conflict | The listed items belong to other units Rest of B23 belongs to other units. Added jsonb_ops vs jsonb_path_ops PostgreSQL 18 OLD/NEW added |
| B21.A. Second-highest distinct salary (MAX below MAX) | concept top-n-per-group (point, table row, tree node max-below-max) | Query correct; returns NULL when there is no second value |
| B21.B. Duplicate emails (GROUP BY HAVING COUNT > 1, WHERE email IS NOT NULL) | concept duplicates (Steps, points, bullet on NULLs) | Delete-all-but-one and prevention added (see Added) |
| B21.C. Highest salary in each department (GROUP BY + MAX) | concept top-n-per-group (trap: GROUP BY gives the value, not the row) |  |
| B21.D. Employee(s) with the highest salary per department (DENSE_RANK = 1, keeps ties) | concept top-n-per-group (table, sayIt) | "max value vs rows holding it" is the trap |
| B21.E. Top three salary ranks per department (ranks, not 3 employees) | concept top-n-per-group (Example + result table showing 4 rows for 3 ranks; point kind minus) | ROW_NUMBER for exactly N added in the table |
| B21.F. Employees above the company average (scalar subquery) | concept group-aggregation-patterns (table row, point, tree scalar-avg-compare) |  |
| B21.G. Employees above their department average (correlated subquery) | concept group-aggregation-patterns (table row, Interview Q; window AVG OVER PARTITION BY added as the main form) |  |
| B21.H. Count per department including zero (LEFT JOIN, COUNT(e.id) not COUNT(*)) | concept group-aggregation-patterns (trap, Example + result) |  |
| B21.I. Users with no orders (NOT EXISTS) | concept anti-join-pattern (Example, table, sayIt) |  |
| B21.J. Latest order per user (ROW_NUMBER, id tie-breaker) | concept top-n-per-group (table row, point); glossary tie-breaker; Interview Q (DISTINCT ON alternative) |  |
| B21.K. Total spending per user (LEFT JOIN, COALESCE(SUM, 0)) | concept group-aggregation-patterns (point "Empty SUM", Example payroll column, tree coalesce-sum) | Shown on departments/employees to keep one example; same pattern |
| B21.L. Consecutive or repeated records (LAG, LEAD, ROW_NUMBER, date arithmetic) | concept running-totals-and-streaks (gaps-and-islands table, Example, Interview Q on 3 consecutive days / 3 rows in a row) | The reference only lists the tools; the site gives the concrete date minus ROW_NUMBER trick. LEAD is the mirror of LAG; its definition is owned by window-functions |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| A13. JOIN ("INNER → Users ∩ Orders" memory line) | Treats a join as a set intersection of two tables; hides that rows repeat per match. | An inner join returns one row per matching pair; a user with 3 orders appears 3 times (joins point, comparison row). | https://www.postgresql.org/docs/18/queries-table-expressions.html |
| A15. Denormalization (memory line "Denormalize → performance"; "useful for large-scale systems") | Overstated: denormalisation does not make the database faster in general | It speeds up only the reads it targets; it adds storage and slows every write, which must update the copies (trap, points "Faster", "Costs") | https://www.db-book.com/slides-dir/PDF-dir/ch7.pdf |
| A16. Index (costs: "need maintenance") | Implies manual upkeep. PostgreSQL updates indexes automatically; the real task is checking usage and dropping unused ones | Point "Costs" (writes update every index) and tree `index-write-cost`; no "maintenance" claim | https://www.postgresql.org/docs/18/indexes-intro.html |
| A17. Clustered vs Non-Clustered ("usually one clustered ordering per table"; "implementation varies") | Vague and product-free; suggests every database has a clustered index | InnoDB: the table is the clustered index on the PK (else first UNIQUE NOT NULL, else hidden 6-byte row id). PostgreSQL: heap, every index secondary, CLUSTER sorts once | https://dev.mysql.com/doc/refman/9.7/en/innodb-index-types.html ; https://www.postgresql.org/docs/18/indexes-index-only-scans.html ; https://www.postgresql.org/docs/18/sql-cluster.html |
| A20. Phantom read ("inserted/deleted matching rows") | Too narrow | Any committed change (insert, delete or update) that changes the set of rows matching the condition | https://www.postgresql.org/docs/18/transaction-iso.html |
| A21. Locking ("READ → shared") | Overstated. In PostgreSQL and InnoDB a plain SELECT reads an MVCC snapshot and takes no row lock | Only SELECT … FOR SHARE takes a shared row lock. Plain reads take none (locking trap, table) | https://dev.mysql.com/doc/refman/9.7/en/innodb-consistent-read.html ; https://www.postgresql.org/docs/18/explicit-locking.html |
| A22. Deadlock ("detect/resolve in various ways, often by aborting one") | Vague, with no product facts | PostgreSQL checks after deadlock_timeout (1 s), aborts an unpredictable victim, SQLSTATE 40P01. InnoDB detection is on by default and rolls back the smaller transaction (error 1213, SQLSTATE 40001). The app retries | https://www.postgresql.org/docs/18/explicit-locking.html ; https://www.postgresql.org/docs/18/runtime-config-locks.html ; https://dev.mysql.com/doc/refman/9.7/en/innodb-deadlock-detection.html ; https://dev.mysql.com/doc/refman/9.7/en/innodb-deadlock-example.html |
| A23. Query Execution (SQL → Parser → Optimizer → Plan → Storage → Result) | Leaves out the rewrite stage (views are expanded there) | Parse → rewrite → plan (cost-based, from statistics) → execute (PostgreSQL) | https://www.postgresql.org/docs/18/query-path.html |
| A25. Full Table Scan ("can be slow… an index can avoid unnecessary scanning") | Implies a full scan is a fault | A full scan is often the right plan for small tables or queries that read most rows (trap in `explain-query-plans`) | https://www.postgresql.org/docs/18/indexes-examine.html ; https://dev.mysql.com/doc/refman/9.7/en/mysql-indexes.html |
| A32. Replication (primary to replicas; why: scalability, high availability, backup/recovery support, read scaling; writes to primary, reads to replicas; replication lag) | Lists "backup/recovery support" as a benefit as if replicas protect data. A replica replays every change at once, a DROP TABLE too, so it cannot undo a mistake; PostgreSQL even offers a delayed standby for that reason. Also: replicas do not scale writes ("scalability" is read-only) | Replicas give availability and read scaling; backups stay separate (replication trap and Q; backup-recovery Why). MySQL notes a replica is a good place to *run* backups, which is different. Rest of A32 mapped to concept replication | https://www.postgresql.org/docs/18/runtime-config-replication.html (recovery_min_apply_delay); https://dev.mysql.com/doc/refman/9.7/en/replication.html |
| A33. Sharding (example "Server 1: users 1-1M, Server 2: 1M-2M, Server 3: 2M-3M"; "used when one database cannot handle the scale"; memory line replication = copy, sharding = split) | The example range-shards by an ever-growing user id, which sends every new user to the last shard: a hot shard. Shown as the model without that warning | Range sharding kept as one routing type, with the hot-shard risk; shard key advice (avoid rising ids with range routing); hash and directory routing added. "Copy vs split" kept as the comparison gist | https://learn.microsoft.com/en-us/azure/architecture/patterns/sharding |
| A34 (part). "Often partition by: date, range, hash, list" | "Date" is not a partitioning type; it is the usual key of RANGE partitioning. MySQL 9.7 states it has no explicit date partitioning. List also misses MySQL's KEY type | Types: range, list, hash; MySQL also KEY. Date is shown as a range key (`created_at` by month) | https://dev.mysql.com/doc/refman/9.7/en/partitioning-types.html; https://www.postgresql.org/docs/18/ddl-partitioning.html |
| A42. Pagination (part: keyset as `id > last_seen_id`, "stable ordering/key") | Works only for a unique sort column; with `created_at` alone rows are skipped. Also misses the MySQL row-value caveat | Unique tie-breaker `(created_at, id)` in ORDER BY, WHERE and the index; MySQL may not range-scan a row comparison, so spell it out | https://use-the-index-luke.com/sql/partial-results/fetch-next-page ; https://dev.mysql.com/doc/refman/9.7/en/row-constructor-optimization.html |
| A43. Database performance (9-item checklist) | The order is loose and it starts with "check query" before measuring | 6 steps in `query-optimization`: find (pg_stat_statements / slow query log), plan, access, cut work, rest (joins, statistics, locks, pool), measure again | https://www.postgresql.org/docs/18/pgstatstatements.html ; https://dev.mysql.com/doc/refman/9.7/en/slow-query-log.html |
| A45. Redis (part: "distributed locks" listed as a plain use) | Overstated: a lock on one Redis primary with a replica is not safe across failover, because Redis replication is asynchronous | Tree note: "SET key val NX PX; a failover can break it (async replication)" | https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/ |
| B1. part: primary key vs unique key ("NULL handling depends on the database"; "both generally allow multiple NULLs") | Unclear | Both PostgreSQL 18 and MySQL 9.7 allow many NULLs in a UNIQUE column; PostgreSQL 15+ can forbid that with NULLS NOT DISTINCT; comparison primary-key-vs-unique-key | https://www.postgresql.org/docs/18/ddl-constraints.html ; https://dev.mysql.com/doc/refman/9.7/en/create-table.html ; https://www.postgresql.org/docs/release/15.0/ |
| B2. Categories (part: "identity-counter behavior differ by database") | Vague. | PostgreSQL TRUNCATE keeps sequences unless RESTART IDENTITY (default CONTINUE IDENTITY); MySQL TRUNCATE resets AUTO_INCREMENT. | https://www.postgresql.org/docs/18/sql-truncate.html ; https://dev.mysql.com/doc/refman/9.7/en/truncate-table.html |
| B4. SELECT (part: "Case sensitivity of LIKE depends on database, collation"); B4. SELECT (part: "ASC: commonly the default"); B4. SELECT (part: alias in WHERE, "some databases have special exceptions") | Vague.; Hedged; it is the default.; Vague. | PostgreSQL LIKE is case-sensitive and ILIKE is not; MySQL LIKE follows the collation and is case-insensitive with the default one.; ASC is the default in PostgreSQL 18 and MySQL 9.7.; WHERE never sees SELECT aliases; PostgreSQL allows them in ORDER BY and GROUP BY; MySQL in GROUP BY, ORDER BY and HAVING. | https://www.postgresql.org/docs/18/functions-matching.html ; https://dev.mysql.com/doc/refman/9.7/en/string-comparison-functions.html ; https://www.postgresql.org/docs/18/sql-select.html ; https://www.postgresql.org/docs/18/sql-select.html ; https://dev.mysql.com/doc/refman/9.7/en/problems-with-alias.html |
| B5. GROUP BY (part: "grouped, aggregated, or otherwise allowed by the database's grouping rules") | Vague. | The extra case is functional dependence: grouping by a primary key lets you select that row's other columns (PostgreSQL; MySQL with ONLY_FULL_GROUP_BY, on by default). | https://www.postgresql.org/docs/18/queries-table-expressions.html ; https://dev.mysql.com/doc/refman/9.7/en/group-by-handling.html |
| B8. NULL (part: "PostgreSQL and MySQL differ in … sorting defaults") | Vague. | In ASC order PostgreSQL puts NULLs last, MySQL puts them first (reverse for DESC). | https://www.postgresql.org/docs/18/queries-order.html ; https://dev.mysql.com/doc/refman/9.7/en/working-with-null.html |
| B11. Types table ("Hash: equality lookups in supported implementations"); B11. Types table ("Partial / filtered: where supported"); B11. LOWER(email) ("MySQL supports functional indexes in modern versions"); B11. EXPLAIN ANALYZE ("MySQL: available in modern releases"); B24 (part: EXPLAIN ANALYZE "in modern versions"); B11. Leftmost prefix ("may support other patterns depending on version") | Hides that InnoDB has no hash index; `USING HASH` on InnoDB silently builds a B-tree (MySQL note 3502, seen in a local 8.0.46 test); Does not say MySQL lacks it; Vague version; Vague version; Vague | Hash = PostgreSQL (and MySQL MEMORY engine); InnoDB is B-tree only; Partial indexes are PostgreSQL only; MySQL CREATE INDEX has no WHERE clause; Functional key parts since MySQL 8.0.13, written with double brackets `((LOWER(email)))`; MySQL EXPLAIN ANALYZE since 8.0.18; Skip scan: MySQL 8.0.13+, PostgreSQL 18 B-tree skip scan, useful when the skipped first column has few values | https://dev.mysql.com/doc/refman/9.7/en/create-index.html ; https://dev.mysql.com/doc/refman/9.7/en/index-btree-hash.html ; https://www.postgresql.org/docs/18/sql-createindex.html ; https://dev.mysql.com/doc/refman/9.7/en/create-index.html ; https://dev.mysql.com/doc/refman/8.0/en/create-index.html ; https://dev.mysql.com/doc/refman/8.0/en/explain.html ; https://dev.mysql.com/doc/refman/8.0/en/range-optimization.html ; https://www.postgresql.org/docs/18/indexes-multicolumn.html ; https://www.postgresql.org/docs/release/18.0/ |
| B12. "If something fails, the transaction can be rolled back where supported" | Loose. It does not say what an error does to an open transaction | PostgreSQL: after an error the block is aborted, and only ROLLBACK or ROLLBACK TO a savepoint recovers it | https://www.postgresql.org/docs/18/tutorial-transactions.html |
| B18. differences table row "Returning modified rows: RETURNING for supported statements in modern MySQL versions"; B18. differences table row "Expression indexes: functional indexes in modern versions"; B18. differences table row "Materialized views: no native equivalent"; B18. differences table row "Case sensitivity: depends on collation and expression" (both columns); B18. PostgreSQL vs MySQL (part: RETURNING row, "RETURNING for supported statements in modern MySQL versions") | Wrong: MySQL 9.7 has no RETURNING clause (MariaDB has INSERT ... RETURNING); Vague date; Outdated wording: MySQL 9.7 CREATE VIEW accepts MATERIALIZED, but only on MySQL HeatWave; Unclear: the defaults differ; MySQL has no RETURNING clause; the MySQL 9.7 INSERT, UPDATE and DELETE syntax has none. MariaDB, a fork, has INSERT … RETURNING. | Comparison row "Only in PostgreSQL" lists RETURNING; trap in postgresql-and-mysql; MySQL supports functional key parts since 8.0.13 (left for index-types to state); Comparison row: "None of these (materialized views only on HeatWave)"; MySQL default collation utf8mb4_0900_ai_ci is case-insensitive; PostgreSQL collations are deterministic (case-sensitive) by default; point "Case" + example; "MySQL has no RETURNING; use LAST_INSERT_ID() on the same connection or JDBC getGeneratedKeys()" (upsert point, table row, Interview Q) | https://dev.mysql.com/doc/refman/9.7/en/insert.html ; https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/inserting-loading-data/insertreturning ; https://dev.mysql.com/doc/refman/8.0/en/create-index.html ; https://dev.mysql.com/doc/refman/9.7/en/create-view.html ; https://dev.mysql.com/doc/refman/9.7/en/charset-server.html ; https://www.postgresql.org/docs/18/sql-createcollation.html ; https://dev.mysql.com/doc/refman/9.7/en/insert.html ; https://dev.mysql.com/doc/refman/9.7/en/update.html ; https://dev.mysql.com/doc/refman/9.7/en/delete.html ; https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/inserting-loading-data/insertreturning |
| B22. Sharding row ("splitting data across multiple servers or partitions") | Mixes sharding with partitioning: splitting into partitions inside one server is partitioning | Sharding = rows split across separate database servers, same schema, different slices | https://learn.microsoft.com/en-us/azure/architecture/best-practices/data-partitioning |
| B24. MySQL-specific (part: "AUTO_INCREMENT values are not necessarily reused after a rollback") | Too soft: the manual says such lost values are never reused | Gaps are normal; numbers used by rolled-back or failed inserts are never reused, in MySQL and PostgreSQL (trap, point "Gaps") | https://dev.mysql.com/doc/refman/9.7/en/innodb-auto-increment-handling.html |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| PostgreSQL schema = namespace inside a database; MySQL SCHEMA = DATABASE | relational-databases (point, bullet, Interview Q); glossary db-schema | Common confusion; reference only said "structure" |
| SQL guarantees no row order without ORDER BY | relational-databases (trap) | Frequent wrong belief; PostgreSQL docs state it |
| MongoDB multi-document transactions (4.0 replica sets, 4.2 sharded) and schema validation | sql-and-nosql (trap, point, Interview Q); tree node mongodb-transactions | Corrects the common "NoSQL has no schema or transactions" answer |
| Super key | keys (Mermaid, Interview Q); glossary super-key | Asked as "super key vs candidate key" (GeeksforGeeks DBMS questions) |
| FK column index: InnoDB creates one, PostgreSQL does not | keys (point, example) | Real behaviour difference with performance impact |
| Self-referencing foreign key (employees.manager_id) | relationships (point, example, Interview Q); tree node self-referencing-key | Classic interview modelling question; owner schema |
| PostgreSQL docs advise a row per item over arrays | relationships (trap) | Backs the "no id lists in a column" rule |
| INT/BIGINT limits; PostgreSQL char is usually the slowest string type | data-types (points, Interview Q) | Overflow and CHAR vs VARCHAR are asked |
| MySQL TIMESTAMP range ends 2038-01-19; DATETIME range to 9999 | data-types (point, Interview Q) | Year-2038 trap |
| JSONB drops whitespace, key order and duplicate keys | data-types (Interview Q) | Part of the JSON vs JSONB answer |
| MySQL CHECK enforced only since 8.0.16 | constraints (point); tree node check-constraint | Version-dependent behaviour (scope) |
| PostgreSQL NO ACTION can be deferred, RESTRICT cannot; InnoDB NO ACTION = RESTRICT; InnoDB rejects SET DEFAULT | constraints (bullets, Interview Q) | Makes "semantics vary" concrete |
| Default FK action is NO ACTION | constraints (point) | Real default |
| Baseline versions PostgreSQL 18, MySQL 9.7 LTS / 8.4 LTS, 26.7 Innovation | postgresql-and-mysql (point); tree nodes postgresql-18, mysql-9-7 | Spec decision; versions checked |
| Heap vs clustered table storage | comparison postgresql-vs-mysql (row) | Scope row "table storage" |
| PostgreSQL extensions (CREATE EXTENSION, pg_trgm, pgcrypto) | tree node postgresql-extension; glossary postgresql-extension | Scope; reference had no PostgreSQL extensions line |
| MySQL ` |  | ` is logical OR by default | tree node mysql-double-pipe (linked from postgresql-and-mysql) | Turns the reference's concatenation row into a fact with a source |
| CASE expression | select-and-filtering (example); tree case-expression; glossary | Commonly used and asked (scope note). |
| MySQL has LIMIT only, no FETCH FIRST | select-and-filtering (bullet) | Product difference next to the standard form the reference names. |
| BETWEEN with timestamps misses the last day | select-and-filtering (Interview Q) | Common real bug from the inclusive rule. |
| Window functions' place in the logical order | query-order (point, Step, Interview Q) | Explains "why can't I filter ROW_NUMBER in WHERE". |
| PostgreSQL DDL is transactional (DROP can be rolled back) | sql-commands (point); delete-vs-truncate-vs-drop (ROLLBACK row) | Completes the DELETE / TRUNCATE / DROP rollback row. |
| TRUNCATE triggers and foreign keys (ON TRUNCATE, CASCADE) | delete-vs-truncate-vs-drop (rows) | Standard follow-up questions on TRUNCATE. |
| IS NOT DISTINCT FROM and MySQL <=> | null-handling (point); tree null-safe-equal | Scope note; NULL-safe comparison is asked. |
| Join fan-out multiplies SUM | joins (point, Interview Q) | Scope note; frequent real bug. |
| Scalar subquery with more than one row is an error | subqueries (point, Interview Q) | Common follow-up. |
| Optimiser rewrites IN / EXISTS as semi-joins (MySQL 8.0.16+ for EXISTS) | subqueries (point); in-vs-exists (Speed row) | Backs "IN vs EXISTS speed" with a source. |
| INTERSECT binds tighter than UNION and EXCEPT | set-operations (bullet) | Avoids wrong results when mixing operators. |
| Default window frame (RANGE, ties included) | window-functions (point, trap); tree window-frame | Scope note; classic running-total bug. |
| MySQL window functions and CTEs since 8.0 | window-functions, ctes (points) | Version facts interviewers ask for MySQL roles. |
| PostgreSQL 12+ CTE inlining, MATERIALIZED / NOT MATERIALIZED | ctes (point, trap); cte-vs-subquery | Makes "CTE vs subquery speed" concrete. |
| PostgreSQL 14+ CYCLE clause; MySQL cte_max_recursion_depth 1000 | ctes (points, Interview Q); tree | Scope note; stopping runaway recursion. |
| Kent's memory line "the key, the whole key, and nothing but the key" | concept normalization (hook) | Owner wants memory tricks; verified in Kent 1983 |
| 3NF is the usual target | concept normalization (point) | Common interview follow-up |
| BCNF vs 3NF difference | concept normalization (Interview Q) | Asked after normal forms |
| Partial and transitive dependency terms | glossary | Interviewers use these words |
| Ways to keep denormalised copies in sync (same transaction, trigger, job, materialized view) | concept denormalization (How it works, Interview Q) | Standard follow-up question |
| Index first, then denormalise | concept denormalization (Interview Q) | Real question (GeeksforGeeks SQL list) |
| Identity ALWAYS vs BY DEFAULT, OVERRIDING SYSTEM VALUE | concept id-generation (table); tree identity-column | PostgreSQL detail interviewers check |
| Identity is not unique by itself | concept id-generation (bullet) | Common mistake |
| Sequence gaps (nextval never rolled back), CACHE default 1 | concept id-generation (table, Defaults) | Explains gaps |
| INT limit 2,147,483,647 and BIGINT | concept id-generation (point) | Classic production failure |
| UUIDv4 vs UUIDv7, PostgreSQL 18 uuidv7(), MySQL UUID() is v1, UUID_TO_BIN | concept id-generation; comparison auto-increment-vs-uuid; tree uuid-key | Current practice; PostgreSQL 18 feature |
| Random UUID keys and InnoDB page fill (1/2 to 15/16 vs 15/16) | concept id-generation (point); comparison row | Scope note asked for a primary source |
| Updatable views, WITH CHECK OPTION, INSTEAD OF triggers | concept views (bullet, Interview Q); tree | Common interview question |
| REFRESH ... CONCURRENTLY needs a unique index | concept views (point, Example); tree | Scope note; PostgreSQL detail |
| Materialized views can be indexed | concept views (bullet); comparison row | Explains why they are fast |
| PostgreSQL procedures (11+) can COMMIT; functions cannot (both products) | concept stored-procedures-triggers; comparison | Key procedure vs function difference |
| Row vs statement-level triggers (MySQL is row-only), BEFORE/AFTER | concept stored-procedures-triggers; tree | Asked often |
| Trigger failure rolls back the statement | concept stored-procedures-triggers (trap) | Common wrong answer |
| Row store vs column store, data warehouse, star schema, fact and dimension tables, ETL vs ELT | concept oltp-and-olap; comparison; tree; glossary | Scope note; standard OLAP vocabulary |
| Why not run analytics on the OLTP database | concept oltp-and-olap (trap, Interview Q) | Real interview angle |
| PostgreSQL does not index FK columns; InnoDB creates the index | concept `indexes` (point, Interview Q, example) | Common interview question and a real production pitfall |
| CREATE INDEX CONCURRENTLY | tree `create-index-concurrently` | How to index a busy production table in PostgreSQL |
| GEN_CLUST_INDEX (hidden row id) | concept `clustered-indexes` (point); tree `gen-clust-index` | Answers "what if an InnoDB table has no PK?" |
| INCLUDE columns (PostgreSQL 11+) and the visibility-map caveat | concept `composite-indexes`; tree `include-columns` | Modern way to build a covering index |
| GiST, BRIN, GIN use cases; jsonb_ops vs jsonb_path_ops | concept `index-types` | The reference only lists method names |
| Implicit type conversion (MySQL string column vs number), leading-wildcard LIKE (pg_trgm), OR on two columns | concept `index-not-used` (table) | Frequent real causes missing from the reference list |
| Scan names and join methods (nested loop, hash, merge); MySQL hash join since 8.0.18 | concept `explain-query-plans`; tree `join-methods` | Needed to read any plan |
| PostgreSQL 18 prints actual rows with two decimals | concept `explain-query-plans` (example) | So the sample output matches PostgreSQL 18 |
| pg_stat_statements setup and MySQL slow-query-log defaults | concept `query-optimization` (points) | "How do you find slow queries?" is asked often |
| Statistics refreshed automatically (autovacuum; InnoDB after 10% of rows change) | tree `planner-statistics` | Explains when manual ANALYZE is needed |
| Autocommit is on by default in both products | concept transactions (point); tree autocommit | Explains when a statement is "its own transaction" |
| ROLLBACK TO frees later locks in PostgreSQL but not in InnoDB | tree savepoint | A real product difference |
| C in ACID vs C in CAP (linearizability) | concept acid (trap) | Common interview mix-up (scope note) |
| PostgreSQL READ UNCOMMITTED acts as READ COMMITTED; no dirty reads ever | concept isolation-levels (point); tree read-uncommitted | Product fact interviewers ask |
| SSI and serialization failure 40001, retry the whole transaction | concept isolation-levels (point, trap, Example) | Needed to use REPEATABLE READ or SERIALIZABLE correctly |
| InnoDB REPEATABLE READ UPDATE acts on the latest committed row | concept isolation-levels (Example); comparison read-committed-vs-repeatable-read | Explains the lost-update difference between products |
| MVCC cleanup: dead tuples, VACUUM, autovacuum, wraparound; InnoDB undo log and purge; long transactions | concept mvcc; tree | Scope note |
| Writers on the same row still block under MVCC | concept mvcc (point, trap) | Common misunderstanding |
| FOR SHARE, NOWAIT, SKIP LOCKED (job queue) | concept locking (Example, points); tree skip-locked | Common backend pattern |
| InnoDB record, gap and next-key locks | concept locking (point); tree | Scope note; asked in MySQL interviews |
| Lock wait timeouts (InnoDB 50 s; PostgreSQL lock_timeout 0) | tree lock-wait-timeout; concept deadlocks (Interview Q) | Scope note; this is not a deadlock |
| PostgreSQL table locks (ACCESS EXCLUSIVE blocks SELECT) | concept locking (table); tree table-lock | Explains why DDL stalls reads |
| Atomic conditional UPDATE as a third option | concept optimistic-pessimistic-locking (point, Example); tree atomic-update | Simplest fix for counters and balances |
| JPA @Version and OptimisticLockException; PESSIMISTIC_WRITE | concept optimistic-pessimistic-locking; comparison; tree | Backend interview angle |
| Retry code with SQLSTATE 40P01 / 40001 | concept deadlocks (Java Example) | The app's part in handling deadlocks |
| WAL mechanics, InnoDB redo log vs MySQL binary log, synchronous_commit, innodb_flush_log_at_trx_commit, log_bin, fsync | concept wal; tree | Scope note; durability needs these |
| HikariCP defaults (maximumPoolSize 10, connectionTimeout 30 s) and server max_connections defaults (PostgreSQL 100, MySQL 151) | connection-pooling Defaults; tree nodes maximum-pool-size, connection-timeout | interviewers ask for the default pool size and what happens when it is exhausted |
| Pool sizing starting formula, connection leaks, leakDetectionThreshold, PgBouncer | connection-pooling (trap, Interview Q, point); tree nodes connection-leak, pgbouncer | standard follow-ups to the pool question |
| PostgreSQL forks a process per connection | connection-pooling point | the concrete reason connections are costly in PostgreSQL |
| String-built JPQL/HQL/native queries are injectable; stored procedures are safe only without dynamic SQL | sql-injection (point, bullet, Interview Q) | common "is the ORM safe?" follow-up |
| Server-side prepare depends on the driver (PgJDBC prepareThreshold 5; Connector/J useServerPrepStmts false) | comparison statement-vs-preparedstatement | corrects the common "PreparedStatement is always precompiled on the server" belief |
| Jakarta Persistence name and version 3.2; Hibernate 7.4 stable | orm-jpa; comparison jdbc-vs-jpa-vs-hibernate; tree | the reference says only "JPA" with no version |
| JPA fetch defaults (to-one EAGER, to-many LAZY), LAZY is a hint, persistence context, Spring Data derived queries | orm-jpa (points, Example, Interview Qs); tree nodes fetch-type, persistence-context, spring-data-jpa | frequently asked JPA questions |
| N+1 detection (spring.jpa.show-sql, Hibernate statistics), @EntityGraph, batch fetching off by default, DTO projection, EAGER is not the fix | n-plus-one; tree nodes | the reference names fixes only loosely |
| Cache-aside write order (update DB, then delete key), TTL, Redis persistence (RDB default, AOF everysec) | caching-redis (trap, Defaults, Interview Qs); comparison database-vs-cache | the most common cache interview trap and the "why not only Redis?" question |
| Redis Pub/Sub is at-most-once | tree node redis-pub-sub | avoids presenting Pub/Sub as a reliable queue |
| MySQL VALUES() deprecated since 8.0.20; row alias since 8.0.19 | upsert point and Example | the reference's MySQL syntax era is unstated; current form shown |
| Check-then-insert race; upsert needs a unique index; idempotent retries | upsert (trap, bullets); glossary idempotent-write | the main reason to use upsert at all |
| PostgreSQL MERGE (15+) vs ON CONFLICT; INSERT IGNORE / DO NOTHING; RETURNING old/new (PostgreSQL 18) | upsert (table, Interview Q); tree nodes merge-statement, insert-ignore | newer features interviewers raise for PostgreSQL roles |
| Synchronous vs asynchronous replication, MySQL semisynchronous; async is the default | comparison sync-vs-async-replication; replication point; tree | Common follow-up: "can a failover lose data?" |
| Read-your-writes fix for replica lag | replication point and Q; glossary | Reference names the problem but no fix |
| PostgreSQL streaming (physical) vs logical replication; MySQL binlog replication and GTIDs | replication How bullets; tree; glossary gtid | Product facts asked in PostgreSQL/MySQL roles |
| Partition pruning; PK and unique keys must include the partition key; drop a partition instead of DELETE; InnoDB partitioned tables have no foreign keys; PostgreSQL declarative partitioning since 10, hash since 11 | partitioning points, Example, Qs, tree | The parts interviewers actually probe |
| Shard key choice, range / hash / directory routing, hot shard, consistent hashing, cross-shard queries, Vitess and Citus | sharding; tree; glossary | Reference has only the definition |
| C in CAP = linearizability (not ACID's C); "CA" trap; CP/AP examples; PACELC | cap-theorem; glossary linearizability, pacelc | The classic wrong answers |
| Strong vs eventual consistency | comparison strong-vs-eventual-consistency | Listed in master; Tier 3 "Consistency" has no content in the reference |
| 2PC (PostgreSQL PREPARE TRANSACTION, MySQL XA), saga (choreography, orchestration, compensation), transactional outbox | distributed-transactions; comparison two-phase-commit-vs-saga; tree; glossary | Tier 3 item 32 has no content in the reference |
| Logical vs physical backup, PITR steps, RPO / RTO, failover tools, test your restores | backup-recovery; comparison logical-vs-physical-backup; glossary | A46 lists only names |
| Ordered scaling ladder with the sign to move up; vertical vs horizontal scaling | scaling-ladder; glossary | Turns the final answer into a repeatable order |
| Six-step method + question-words → pattern table | sql-problem-approach | Owner asked for "tricks to solve any SQL problem easily" |
| Join fan-out makes SUM too big | sql-problem-approach (Interview Q) | Most common wrong result in aggregation questions |
| Nth highest with LIMIT 1 OFFSET N-1, wrapped as a scalar subquery to return NULL | top-n-per-group (Interview Q, tree) | Asked as "Nth highest salary"; the NULL edge case is what interviewers check |
| ROW_NUMBER for exactly N per group | top-n-per-group (table) | B21.E only covers ranks |
| PostgreSQL DISTINCT ON; FETCH FIRST … WITH TIES | top-n-per-group (point, Interview Q, tree, glossary) | Short PostgreSQL forms interviewers accept |
| MySQL requires an alias on a derived table | top-n-per-group (bullet) | Common syntax error in this pattern |
| Show every duplicate row with COUNT(*) OVER | duplicates | Scope note |
| Delete all but one: ROW_NUMBER > 1, and self-join delete (PostgreSQL USING, MySQL DELETE … JOIN) | duplicates (Example, Interview Q, tree) | Classic follow-up question (LeetCode 196) |
| MySQL rule: no DELETE with a subquery on the same table, except a materialised derived table | duplicates (bullet, tree) | Explains why the MySQL form works |
| Prevent with UNIQUE (allows many NULLs by default) | duplicates (point, tree) | Completes the pattern |
| NOT IN + NULL trap in the anti-join context; EXISTS as semi-join; EXCEPT | anti-join-pattern | Scope note; the NOT IN rule itself is owned by null-handling (linked) |
| Moving average, RANGE with an interval | running-totals-and-streaks | Common follow-up to running totals |
| Default RANGE frame includes ties (trap) | running-totals-and-streaks (trap) | Wrong running totals on equal timestamps; frame rules owned by window-functions (linked) |
| Gaps and islands: date minus ROW_NUMBER, remove duplicate days first | running-totals-and-streaks | Concrete method for B21.L |
| Conditional aggregation pivot (CASE and PostgreSQL FILTER) | group-aggregation-patterns | Scope note; "pivot" is a common interview question |
| Above own group average with AVG() OVER (PARTITION BY) | group-aggregation-patterns | Shorter than the correlated form |

## Dropped
| Reference item | Reason (rare / advanced / duplicate / unverifiable) |
|---|---|
| (no whole item) | |

### Details placed elsewhere or cut, inside items listed above
| Reference item part | What happened |
|---|---|
| A15. Denormalization (example storing user_name in orders; "useful when read performance matters / joins are expensive") | also: concept denormalization (points "Copied column", Example SQL, Interview Q "When would you denormalise?") |
| A16. Index (what it is, CREATE INDEX example, costs: storage, slower writes; book-index memory line) | also: concept `indexes` (hook, points, Mermaid, Analogy with limit, example) |
| A17. Clustered vs Non-Clustered Index | also: concept `clustered-indexes`; comparison `clustered-vs-nonclustered-index` |
| A20. Isolation levels (four levels, weaker to stronger) | also: concept isolation-levels (table); tree isolation-level-list |
| A20. Dirty read (T1 changes, T2 reads, T1 rolls back) | also: tree dirty-read; comparison dirty-vs-nonrepeatable-vs-phantom-read |
| A20. Non-repeatable read | also: tree non-repeatable-read; comparison dirty-vs-nonrepeatable-vs-phantom-read |
| A21. Locking: exclusive lock for writes | also: concept locking (table); comparison shared-vs-exclusive-lock |
| A21. "Shared lock: multiple transactions can generally read" as a separate line | cut: duplicate (in comparison shared-vs-exclusive-lock) |
| A22. Deadlock (A holds X waits Y, B holds Y waits X) | also: concept deadlocks (Mermaid, points) |
| A29. Stored Procedure (part: "many modern applications keep most business logic in the application layer") | cut: unverifiable (a trend claim with no primary source); the trade-off itself is kept as points "Gains" and "Costs" |
| A32 (part). Chained picture Primary → Replica → Replica (cascading replication) | cut: advanced: rarely asked; the site shows one primary feeding replicas |
| A34. Partitioning (one logical table split into pieces; "useful for very large tables") | also: concept partitioning (hook, How table, Example); comparison partitioning-vs-sharding |
| A42. Pagination (don't return everything; OFFSET simple but slow for big offsets) | also: concept `pagination`; comparison `offset-vs-keyset-pagination` |
| A43. Database performance (item 9: "check database resources") | cut: Generic server tuning, outside query-level interview depth |
| A45. Redis (in-memory store; uses: caching, sessions, rate limiting, counters, distributed locks, pub/sub; DB = durable truth, Redis = fast layer) | also: tree node redis and its children (redis-sessions, redis-rate-limiter, redis-pub-sub); concept caching-redis (Interview Q on why not only Redis) |
| A45. Redis (part: "queues ... in some architectures") | cut: advanced: Redis lists/Streams as queues are not a database interview core; Pub/Sub is covered with its at-most-once limit |
| B1. Database fundamentals, part: terms table (database, DBMS, RDBMS, SQL, table, row/record, column/field, schema, query, constraint, index) | also: relational-databases (database, DBMS, RDBMS, SQL, table, row, column, schema); constraint → concept constraints; index → concept indexes (indexes unit); query → concept select-and-filtering (querying unit) |
| B1. part: DBMS vs RDBMS | also: concept relational-databases (Interview Q) |
| B1. part: primary key (rules, composite PK) | also: concept keys (point "Primary key"); tree node composite-key |
| B1. part: foreign key (references another or the same table, referential integrity, nullable FK) | also: concept keys (points, Interview Q "Can a foreign key be NULL or repeated?") |
| B1. part: types of keys (candidate, primary, alternate, composite, foreign, surrogate, natural) | also: concept keys (Mermaid, bullets, Interview Q super vs candidate vs primary); tree under keys; glossary candidate-key, alternate-key, composite-key, surrogate-key, natural-key, super-key |
| B1. part: trap "a foreign key does not have to be unique" | also: concept keys (trap) |
| B2. SQL command categories (part: five categories table, "teaching convention") | also: concept sql-commands (How it works table, point Groups) |
| B2. SQL command categories (part: DELETE vs TRUNCATE vs DROP, "TRUNCATE not universally faster") | also: comparison delete-vs-truncate-vs-drop (embedded in sql-commands) |
| B2. SQL command categories (part: PostgreSQL transactional TRUNCATE, MySQL implicit commit) | also: concept sql-commands (trap, points); comparison delete-vs-truncate-vs-drop (ROLLBACK row) |
| B2. SQL command categories (part: trap, UPDATE/DELETE without WHERE changes every row) | also: concept sql-commands (point No WHERE) |
| B2. Categories (part: CREATE / ALTER "WHERE supported?" column) | cut: Low value; the categories table and the DELETE/TRUNCATE/DROP comparison cover it. |
| B3. part: DATE and TIME rows | cut: Self-explanatory, no interview angle; DATE appears in an example |
| B4. SELECT (part: basic SELECT, SELECT * vs explicit columns) | also: concept select-and-filtering (point Columns) |
| B4. SELECT (part: AND/OR with parentheses) | also: concept select-and-filtering (point AND before OR) |
| B4. SELECT (part: BETWEEN inclusive, IN, LIKE % and _, PostgreSQL ILIKE) | also: concept select-and-filtering (How it works table, bullet); tree like-operator; glossary ilike |
| B4. SELECT (part: DISTINCT applies to the whole selected row) | also: concept select-and-filtering (point DISTINCT, Interview Q) |
| B4. SELECT (part: ties have no guaranteed order, unique tie-breaker) | also: concept select-and-filtering (trap, example) |
| B4. SELECT (part: LIMIT/OFFSET, standard OFFSET … FETCH, large offsets slow) | also: concept select-and-filtering (table, bullet); link to pagination |
| B4. SELECT (part: logical order of processing, "logical model, not physical") | also: concept query-order (Steps, trap) |
| B4. SELECT (part: Q "Why can't a SELECT alias be used in WHERE?") | also: concept query-order (Interview Q, points) |
| B4. SELECT (part: large offsets inefficient, keyset often better; unique tie-breaker for stable pagination) | also: concept `pagination` (points, trap) |
| B4. SELECT (part: operator list =, <>, !=, >, <, >=, <=) | cut: Trivial; every reader knows them. |
| B5. Aggregates and GROUP BY (part: function table, COUNT(*) counts rows) | also: concept aggregates-group-by (points) |
| B5. Aggregates and GROUP BY (part: HAVING vs WHERE; Q "Can WHERE use COUNT(*)?") | also: comparison where-vs-having; concept aggregates-group-by (trap) |
| B5. Aggregates and GROUP BY (part: COUNT(*) vs COUNT(col) vs COUNT(DISTINCT col), 10, 10, NULL) | also: concept aggregates-group-by (example result, Interview Q) |
| B8. NULL (part: IS NULL / IS NOT NULL, three-valued logic, WHERE keeps TRUE) | also: concept null-handling (hook, How it works table); glossary three-valued-logic |
| B8. NULL (part: COALESCE, NULLIF) | also: concept null-handling (point, example); glossary coalesce, nullif |
| B8. NULL (part: traps: COUNT(col) ignores NULL, aggregates ignore NULL, SUM/AVG return NULL on no rows) | also: concept aggregates-group-by (points, bullet COALESCE(SUM)) |
| B8. NULL (part: NOT IN (subquery) with NULL) | also: concept null-handling (trap, bullet, Interview Q) |
| B11. Indexes (parts: intro and book analogy) | also: concept `indexes` |
| B11. Indexes (part: when indexes help: selective WHERE, JOIN keys, ORDER BY/GROUP BY, PK/UNIQUE, ranges) | also: concept `indexes` (point "Helps", point "Made for you") |
| B11. Indexes (part: when indexes hurt: write cost, storage, too many indexes, low selectivity, planner prefers a scan) | also: concept `indexes` (points, trap); concept `index-not-used` (table, trap); tree `index-write-cost` |
| B11. Q: "Does adding an index always make a query faster?" | also: concept `indexes` (trap) |
| B11. Indexes (part: types of indexes table: B-tree, Hash, Composite, Unique, Partial, Expression, Full-text, Spatial) | also: concept `index-types` (table, bullets); composite moved to `composite-indexes` |
| B11. Indexes (part: PostgreSQL index methods B-tree, Hash, GiST, SP-GiST, GIN, BRIN) | also: concept `index-types` (table); tree nodes `btree-index` … `brin-index` |
| B11. Indexes (part: MySQL InnoDB indexes: B-tree based, full-text, spatial) | also: concept `index-types` (point "InnoDB", table row FULLTEXT, SPATIAL); glossary `fulltext-index-term` |
| B11. Indexes (part: clustered vs nonclustered; InnoDB vs PostgreSQL) | also: comparison `clustered-vs-nonclustered-index`; concept `clustered-indexes` (points) |
| B11. Indexes (part: trap "PostgreSQL PK does not mean the table is physically sorted"; CLUSTER not maintained) | also: concept `clustered-indexes` (trap, Interview Q); tree `cluster-command` |
| B11. Indexes (part: composite index example (user_id, status), not useful for status alone) | also: concept `composite-indexes` (trap, example, table) |
| B11. Indexes (part: leftmost-prefix rule A; A,B; A,B,C; "not an absolute prohibition") | also: concept `composite-indexes` (points, table); tree `leftmost-prefix`, `skip-scan` |
| B11. Indexes (part: "why might an index not be used?" list of 6 reasons) | also: concept `index-not-used` (table of causes and fixes) |
| B11. Indexes (part: LOWER(email) example; expression index fix) | also: concept `index-not-used` (example, Interview Q) |
| B11. Indexes (part: EXPLAIN and EXPLAIN ANALYZE; inspect scan types, join strategies, estimated vs actual rows) | also: concept `explain-query-plans` |
| B11. Indexes (part: warning that EXPLAIN ANALYZE executes the statement) | also: concept `explain-query-plans` (point "ANALYZE runs it": BEGIN … ROLLBACK) |
| B12. Transactions: definition | also: concept transactions (hook, Interview Q) |
| B12. Transfer example (BEGIN, two UPDATEs, COMMIT) | also: concept transactions (Example, with SAVEPOINT) |
| B12. Production check for funds | also: concept optimistic-pessimistic-locking (atomic `WHERE balance >= 500`) |
| B12. COMMIT, ROLLBACK, SAVEPOINT example | also: concept transactions (Mermaid, Example) |
| B12. DDL behaviour (MySQL implicit commit, PostgreSQL transactional DDL) | also: concept transactions (points, trap, Interview Q); tree implicit-commit |
| B12. ACID properties (part) | also: concept acid |
| B18. PostgreSQL vs MySQL, part: intro (both RDBMS; PostgreSQL strengths; InnoDB the transactional engine) | also: concept postgresql-and-mysql (sayIt, point "MySQL engines"); glossary innodb, storage-engine |
| B18. part: differences table rows default isolation, auto-generated ids, boolean, JSON, FULL OUTER JOIN, partial indexes, upsert, string concatenation, transactional DDL | also: comparison postgresql-vs-mysql (rows); boolean → data-types table; string concatenation → tree node mysql-double-pipe |
| B18. part: interview advice (concept first, then product behaviour) | also: concept postgresql-and-mysql (trap, Why) |
| B18. PostgreSQL vs MySQL (part: auto-generated IDs, GENERATED ALWAYS AS IDENTITY vs AUTO_INCREMENT examples, table row "Auto-generated IDs") | also: concept id-generation (How it works table, Example SQL) |
| B18. PostgreSQL vs MySQL (part: upsert, PostgreSQL ON CONFLICT and MySQL ON DUPLICATE KEY UPDATE examples) | also: concept upsert (points, table, Example) |
| B18. part: intro line "MySQL is widely used in web applications" | cut: Unverifiable marketing claim |
| B19. Optimisation (step 6 part: "unsuitable data types, poor data distribution") | cut: Duplicate: data types belong to `data-types` (basics unit); distribution is covered by statistics |
| B20. SQL injection and database security (part: "avoid exposing database credentials or sensitive error details") | cut: out of scope for this concept: general application security, not SQL-specific; kept the concept short |
| B22. Database architecture concepts (parts: OLTP and OLAP rows) | also: glossary oltp, olap; tree oltp, olap |
| B22. MVCC row | also: concept mvcc |
| B22. WAL row | also: concept wal |
| B22. Database architecture concepts (part: connection pooling row) | also: glossary connection-pool |
| B22. Database architecture concepts (part: connection pooling paragraph, reuse and limit sessions, HikariCP) | also: concept connection-pooling (How it works bullets) |
| B22. Database architecture concepts (part: pool size trap, a bigger pool does not raise throughput) | also: concept connection-pooling (trap, Interview Q "How big should the pool be?") |
| B22. Replication row ("copies of data on multiple servers") | also: glossary database-replication; concept replication |
| B22. Read replica row | also: glossary read-replica; concept replication |
| B22. Primary/leader row ("node accepting writes") | also: concept replication (point "Primary"); tree primary-replica |
| B22. Replica lag paragraph (a read right after a write may be stale on a lagging replica) | also: concept replication (point, Interview Q 1); glossary replication-lag, read-your-writes |
| B22. Partitioning row ("dividing a table into smaller physical or logical parts") | also: concept partitioning; glossary partitioning-term |
| B22. Partitioning vs sharding (within one system vs across instances; "terminology can overlap") | also: comparison partitioning-vs-sharding |
| B22. Replication vs sharding (copies vs subsets; availability and reads vs storage and workload) | also: comparison replication-vs-sharding (embedded in concept sharding) |
| B22. Failover row | also: glossary failover; tree failover; concept backup-recovery (point) |
| B22. Backup row | also: concept backup-recovery |
| B22. Recovery row | also: concept backup-recovery (Steps, Qs) |
| B24. MySQL-specific concepts, part: InnoDB default engine (transactions, row-level locking, foreign keys) | also: concept postgresql-and-mysql (point); tree node innodb; glossary innodb |
| B24. MySQL-specific (line: implicit commits for DDL) | also: concept sql-commands (point MySQL DDL) |
| B24. MySQL-specific (part: AUTO_INCREMENT generates integer ids) | also: concept id-generation (table); tree auto-increment; glossary |
| B24. MySQL-specific (parts: clustered primary key; secondary indexes contain the PK) | also: concept `clustered-indexes` (points, example, Interview Q "why short PK") |
| B24. MySQL-specific (part: EXPLAIN shows the planned execution) | also: concept `explain-query-plans` (bullet: MySQL `type` ALL … const) |
| B24. MySQL-specific concepts (part: ON DUPLICATE KEY UPDATE) | also: concept upsert; tree node on-duplicate-key-update; glossary on-duplicate-key-update |


## Owner addition (20-10-2026): SQL query building

Appended to `reference/sql.md` after the marker line "Owner addition: SQL query building". Keys: the addition's own section numbers or
headings. Every item of the addition appears in exactly one of Mapped, Corrected or Dropped below.

### Mapped
| Reference item | Landed in | Note |
|---|---|---|
| Q1. Master order (written and run order) | `english-to-sql` hook + node `written-clause-order` (written order); `query-order` (run order) | Site's run order also lists DISTINCT |
| Q2. SELECT, DISTINCT, alias | `select-and-filtering` (DISTINCT Q); `query-order` (alias); glossary `select-distinct` (new) | |
| Q3. WHERE operators, LIKE patterns, IS NULL, never = NULL | `select-and-filtering` table; `null-handling` | already covered |
| Q4. AND / OR / NOT, brackets | `select-and-filtering` point "AND before OR" | already covered |
| Q5. Aggregate functions | `aggregates-group-by` | already covered |
| Q6. GROUP BY (incl. multiple columns) | `aggregates-group-by`; `english-to-sql` translator | already covered |
| Q7. HAVING; WHERE vs HAVING | `aggregates-group-by`, comparison `where-vs-having`; `english-to-sql` point + Interview Q | |
| Q8. ORDER BY ASC/DESC, multiple keys, by alias | `select-and-filtering`; `query-order` (alias in ORDER BY) | already covered |
| Q9. LIMIT, top 5, LIMIT/OFFSET pagination | `select-and-filtering`; `pagination`; `english-to-sql` shape "filter, sort, limit" | |
| Q10. INNER / LEFT / RIGHT / FULL OUTER JOIN | `joins` | already covered (incl. MySQL has no FULL JOIN) |
| Q11. JOIN + SELECT | `joins` example | already covered |
| Q12. JOIN + WHERE | `joins` trap (ON vs WHERE); `english-to-sql` example | |
| Q14. JOIN + GROUP BY + HAVING | `english-to-sql` example (join → where → group → having → sort → limit) | groups by d.id, d.name (see Q13) |
| Q15. CASE (in SELECT, in ORDER BY) | `select-and-filtering` example + node `case-expression`; `english-to-sql` translator ("custom sort → ORDER BY CASE") | ORDER BY CASE added |
| Q16. COALESCE | `null-handling`; `english-to-sql` translator ("0 if missing") | already covered |
| Q17. String functions | new concept `string-date-functions`; glossary `char-length`, `concat-function` | added LENGTH vs CHAR_LENGTH, CONCAT/|| NULL rules, MySQL `||` = OR |
| Q19. Subquery (above average, max) | `subqueries` (scalar row); `group-aggregation-patterns` (above average) | already covered |
| Q20. IN subquery | `subqueries` | already covered |
| Q21. EXISTS / NOT EXISTS | `subqueries`; `anti-join-pattern`; `english-to-sql` translator ("has none") | |
| Q22. CTE, multiple CTEs | `ctes`; `running-totals-and-streaks` example shows two CTEs | already covered |
| Q23. UNION / UNION ALL | `set-operations`; comparison `union-vs-union-all` | already covered |
| Q24. INSERT (multi-row) | `sql-commands` example now multi-row | |
| Q25. UPDATE (incl. salary * 1.10) | `sql-commands` | already covered |
| Q26. DELETE, no WHERE deletes all | `sql-commands` point "No WHERE" | already covered |
| Q27. Nth highest with LIMIT 1 OFFSET N-1 | `top-n-per-group` (node `limit-offset-nth`) | already covered, incl. DISTINCT and NULL-if-missing |
| Q28. Second highest with MAX below MAX | `top-n-per-group` (node `max-below-max`) | already covered |
| Q29. Duplicates (one and several columns) | `duplicates`; `english-to-sql` translator ("more than once") | already covered |
| Q30. DISTINCT to remove duplicates from a result | `select-and-filtering` | already covered |
| Q31. COUNT DISTINCT (incl. per group) | `aggregates-group-by` | already covered |
| Q32. Conditional count | `group-aggregation-patterns` (`COUNT(CASE WHEN … THEN 1 END)` added) | |
| Q33. Conditional sum | `group-aggregation-patterns` | already covered |
| Q34. Window functions (ROW_NUMBER, RANK, DENSE_RANK, PARTITION) | `window-functions` | already covered |
| Q35. Top employee per department, top 3 | `top-n-per-group` | already covered (site adds tie-breaker and DENSE_RANK) |
| Q36. ROW_NUMBER vs RANK vs DENSE_RANK | comparison `row-number-vs-rank-vs-dense-rank`; `window-functions` | already covered |
| Q37. LAG / LEAD | `window-functions`; `running-totals-and-streaks` | already covered |
| Q39. Window + PARTITION (AVG per department) | `group-aggregation-patterns` (node `partition-avg-compare`); comparison `group-by-vs-partition-by` | already covered |
| Q40. Important query combinations | `english-to-sql` shapes table + tree nodes `shape-*`; Interview Q "rows or values" (distinct → sort → top N) | |
| Q-TRANSLATOR. English → SQL translator | `english-to-sql` "Words → SQL" table; pattern-level words point to `sql-problem-approach` | clause level only; no overlap with the pattern picker |
| Q-CORE. The core to memorise | Covered by `english-to-sql` (clauses, shapes) and existing concepts; the Cheat sheet page already lists them | no new content needed |

### Corrected
| Reference item | What was wrong | Fixed to | Source URL |
|---|---|---|---|
| Q13. JOIN + GROUP BY | Groups by `d.department_name` only: two departments with the same name merge into one row | Group by the key: `GROUP BY d.id, d.name` (example and node `shape-join-group-count`); zero counts via `COUNT(e.id)` already in `group-aggregation-patterns` | https://www.postgresql.org/docs/18/queries-table-expressions.html |
| Q18. Date functions | Listed YEAR(), MONTH(), DAY(), DATEDIFF, DATE_ADD, DATE_SUB as "common"; they are MySQL (and SQL Server) forms; PostgreSQL has no YEAR() or DATEDIFF, and its DATE_ADD (16+) takes a PostgreSQL interval, not `INTERVAL 7 DAY` | PostgreSQL vs MySQL table in `string-date-functions`: EXTRACT, date − date, `INTERVAL '7 days'` vs `INTERVAL 7 DAY`, DATE_TRUNC vs DATE_FORMAT; trap added | https://www.postgresql.org/docs/18/functions-datetime.html ; https://dev.mysql.com/doc/refman/9.7/en/date-and-time-functions.html |
| Q38. Running total `SUM(amount) OVER (ORDER BY date)` | Default RANGE frame groups rows tied on the date, so it is not row by row | Already the trap of `running-totals-and-streaks` and `window-functions` (ROWS frame or unique sort) | https://www.postgresql.org/docs/18/sql-expressions.html |
| Q-TRANSLATOR "NTH HIGHEST → ORDER BY DESC + OFFSET" | Without DISTINCT, ties make OFFSET count rows, not values | Points to the pattern picker → `top-n-per-group` (DISTINCT … OFFSET or DENSE_RANK) | https://www.postgresql.org/docs/18/sql-select.html |

### Added beyond the reference
| New item | Landed in | Why |
|---|---|---|
| LENGTH (bytes) vs CHAR_LENGTH in MySQL; OCTET_LENGTH in PostgreSQL | `string-date-functions` point, Interview Q, node `char-length`, glossary | Common wrong answer with non-ASCII names |
| CONCAT with NULL (MySQL NULL, PostgreSQL skips), `||` NULL, CONCAT_WS | `string-date-functions` point, Interview Q, glossary `concat-function` | Frequent bug and interview question |
| MySQL `||` is logical OR (deprecated) unless PIPES_AS_CONCAT | `string-date-functions` point | Portability trap |
| NOW() fixed at transaction start (PostgreSQL) / statement start (MySQL) | `string-date-functions` point | Asked in "NOW vs CURRENT_DATE" questions |
| DATE_TRUNC vs DATE_FORMAT month bucket; filter dates as a range | `string-date-functions` table, example, link to `index-not-used` | Most common date task in reports |
| "Rows or values?" for top N | `english-to-sql` Interview Q | Classic ambiguity with ties |

### Dropped
| Reference item | Reason |
|---|---|
| (none) | Every item is mapped or corrected |

## Template v3 rewrite (21-10-2026)

Every concept and comparison was rewritten in teaching template v3 (CLAUDE.md 3.1.1) and given a cheat-sheet card; each reference item mapped above still lands in the same concept id. An independent pass then checked about 1,880 claims and fixed 17, removing 2.

### Unit backend

**Added from the reference**

| Reference item | Concept |
|---|---|
| A37 request → create connection → query → close, every time (the "without a pool" flow) | connection-pooling (Why it exists) |
| B22 pool "limits concurrent database sessions" | connection-pooling (Why, How step 4) |
| A38 Client → Controller → Service → Repository → Database (GET /users/10) | orm-jpa (Mermaid now starts at the controller, GET /payments/101) |
| B20 "avoid exposing sensitive error details" | sql-injection (Rules: error messages; Interview Q) |
| B20 "validate inputs, but don't rely on validation alone" | sql-injection (Not to be confused with: validation vs parameters) |
| A41 "joins" as an N+1 fix | n-plus-one (Why: a join could load both; Not to be confused with: JOIN vs JOIN FETCH) |
| A45 Redis uses (sessions, rate limiting, counters, locks, pub/sub) | caching-redis (Interview Q linking the tree nodes) |

**Added beyond the reference (verified)**

- HikariCP 7.1 defaults minimumIdle = maximumPoolSize, maxLifetime 30 min, leakDetectionThreshold 0 (off); in-use connections are retired only when closed (connection-pooling Rules).
- Spring Boot 4.1 pool order HikariCP → Tomcat → DBCP2 → Oracle UCP; spring.datasource.type overrides (connection-pooling Rules).
- close() on a pooled connection recycles it (javax.sql.PooledConnection Javadoc) (connection-pooling Common mistakes).
- PgBouncer pooling modes vs HikariCP (connection-pooling Not to be confused with).
- `FROM ?` is a syntax error and `ORDER BY ?` sorts by a constant, run on PostgreSQL 18 (sql-injection Rules).
- Concatenating before prepareStatement() is still injectable (sql-injection Common mistakes, scenario).
- JPA 3.2 entity rules: no-arg public/protected constructor, non-final, a record cannot be an entity (orm-jpa Rules).
- Spring Boot default naming CamelCaseToUnderscoresNamingStrategy (orm-jpa Example note).
- EAGER @ManyToOne with a JPQL query still runs 1 + N SELECTs in Hibernate 7.4 (run) (n-plus-one trap.why, Interview Q; orm-jpa scenario).
- Plain JOIN does not fill the association; JOIN FETCH does; JOIN FETCH is inner, LEFT JOIN FETCH keeps null associations (n-plus-one).
- Batch fetching query count: 100 payments, batch 25 → 5 queries (run) (n-plus-one scenario).
- Redis 8 maxmemory 0 by default on 64-bit, default policy noeviction, allkeys-lru suggested for caches (caching-redis Rules).
- Writing the new value into the cache on update races; delete instead (caching-redis Common mistakes).
- PostgreSQL ON CONFLICT: conflict target required for DO UPDATE; cardinality violation when one statement hits the same row twice (upsert Rules).
- MySQL ON DUPLICATE KEY UPDATE affected rows 1 / 2 / 0 (run on MySQL 9.7.2); avoid it on tables with several unique indexes (upsert Rules, scenario).
- The proposed row must satisfy NOT NULL even when it conflicts (run on PostgreSQL 18) (upsert Common mistakes).

**Corrections**

| What | Fix | Source |
|---|---|---|
| Glossary persistence-context said changes are written "at commit" | "at flush, before commit" (override in backend.glossary.yaml) | Jakarta Persistence 3.2 spec, 3.1; Hibernate 7.4 guide |
| Draft cache example used a generic `cache.set(key, u, Duration)` API | Real Jedis 8.0.2 code; `setex` is deprecated in Jedis 8, so `set(key, value, SetParams.setParams().ex(300))` | compiled with -Xlint:deprecation |
| Draft orm-jpa used a `User` / `orders` example | Payments running example; mapping compiled against Jakarta Persistence 3.2 and Spring Data JPA | — |
| Draft sql-injection said a stored procedure is safe "only if it does not build SQL from its input" | Kept, now in Rules | OWASP SQL Injection Prevention Cheat Sheet |
| statement-vs-preparedstatement row "Server-side prepare: … Connector/J off by default" | Reworded to a readable phrase, same fact (useServerPrepStmts=true needed) | Connector/J prepared statement properties |

### Unit basics

**Added from the reference**

| Reference item | Concept |
|---|---|
| A1 / B1 "why a database" angle (store, find, keep correct, many users) | relational-databases (Why it exists, Interview Q "Why use a database instead of files?") |
| A5 "who am I / which record am I connected to" angle (paraphrased, not copied) | keys (Not to be confused with: rule line) |
| B1 surrogate vs natural key | keys (Interview Q, Common mistake "email as primary key") |
| A6 one-to-one (person / passport) | relationships (wallets example, Interview Q "How do you build a one-to-one relationship?") |
| B3 VARCHAR(n) limit, INT range | data-types (How it works step 2, scenario on INT overflow) |
| B9 DEFAULT vs explicit NULL | constraints (point, scenario) |
| B9 "why constraints when the app validates" angle | constraints (Interview Q) |
| B18 string concatenation row, case sensitivity row | postgresql-and-mysql (example run on both, scenarios, Interview Q) |
| B18 RETURNING row | postgresql-and-mysql (trap); comparison postgresql-vs-mysql (example with LAST_INSERT_ID) |

**Corrections and new verified facts**

| What | Source |
|---|---|
| MySQL 8.4 parses an inline column `REFERENCES` and ignores it (no foreign key); MySQL 9.7 enforces it. Added to keys (point, Rules) | https://dev.mysql.com/doc/refman/8.4/en/ansi-diff-foreign-keys.html ; https://dev.mysql.com/doc/refman/9.7/en/create-table-foreign-keys.html |
| Out-of-range integers: error in MySQL's default strict mode, clipped with a warning when strict mode is off | https://dev.mysql.com/doc/refman/9.7/en/out-of-range-and-overflow.html |
| PostgreSQL text / unlimited varchar: up to about 1 GB (was "no length limit") | https://www.postgresql.org/docs/18/datatype-character.html (chapter 8 source already listed) |
| SQL standard is ISO/IEC 9075, latest SQL:2023 | https://www.postgresql.org/docs/18/features.html |
| MySQL `||` is a deprecated OR unless PIPES_AS_CONCAT is on | https://dev.mysql.com/doc/refman/9.7/en/logical-operators.html |
| PostgreSQL standard collations are deterministic (exact byte comparison) | https://www.postgresql.org/docs/18/collation.html |
| MySQL LAST_INSERT_ID() is per connection (comparison example) | https://dev.mysql.com/doc/refman/9.7/en/information-functions.html |
| Neo4j stores nodes, relationships and properties | https://neo4j.com/docs/getting-started/graph-database/ |
| Constraints How it works: no claim about the internal order of checks (grouped as "rules on the new row" and "rules that need other rows") | PostgreSQL 18 docs 5.5 |
| Removed unsourced market wording ("most widely used") from postgresql-and-mysql | org rule: no unsourced market claims |

### Unit design

**Added from the reference**

- A14 / B10 anomaly example (duplicated customer details) → normalization: Why it exists + Example (real run, two cities for one customer).
- B10 "2NF example with a composite key" → normalization How it works step 3 (order_lines) + Interview Q.
- B10 "normalise first, denormalise when measured" → normalization Interview Q "Is a fully normalised schema always best?", denormalization points/sayIt.
- A15 "useful when joins are expensive" → denormalization Why it exists, scenario (dashboard: index vs summary table).
- A28 / B17 views uses (simplify, abstraction, controlled access) → views What/Why, scenario on access with owner rights.
- B17 "MySQL has no native materialized view; summary table" → views points, Rules (with test result).
- A29 / B17 procedure vs function, "capabilities vary" → stored-procedures-triggers Example (procedure with COMMIT), Rules, comparison explain/example.
- A30 / B17 trigger audit flow, "hidden side effects" → audit trigger Example on payments (real run), Interview Q.
- A31 OLTP vs OLAP characteristics → oltp-and-olap What/Why, Example with real result.
- B23 SERIAL / IDENTITY, "identity is the standards-oriented choice" → id-generation Interview Q "IDENTITY or SERIAL?".

**Added beyond the reference (verified)**

- Manual ids with SERIAL / BY DEFAULT do not advance the sequence, so a later insert hits a duplicate key; MySQL moves its counter past a larger explicit id (both tested; MySQL doc innodb-auto-increment-handling).
- Identity column is NOT NULL but not unique by itself (PostgreSQL 18 identity docs).
- PostgreSQL 18 uuidv4()/gen_random_uuid() = v4, uuidv7(); MySQL 9.7 UUID() is version 1, no v4/v7 function (MySQL miscellaneous functions doc).
- View SELECT * is expanded at creation (tested on PostgreSQL 18.6 and MySQL 9.7.2; MySQL doc "frozen at creation").
- Views read base tables with the owner's rights by default (PostgreSQL CREATE VIEW; MySQL SQL SECURITY DEFINER default).
- PostgreSQL updatable-view rules list, WITH CHECK OPTION (CASCADED default) (PostgreSQL 18 CREATE VIEW).
- Plain REFRESH locks out reads; materialized views are read-only (tested: "cannot change materialized view").
- Statement-level triggers fire on zero rows; BEFORE trigger returning NULL skips the row; trigger errors roll back statement and trigger effects (PostgreSQL 18 trigger-definition).
- MySQL triggers are not activated by foreign key actions (MySQL 9.7 stored-program restrictions); PostgreSQL user triggers do fire on cascaded deletes (tested).
- MySQL has no UPDATE OF column list for triggers (tested: syntax error).
- Procedure COMMIT fails with "invalid transaction termination" inside an explicit transaction block, and in a function (tested; PostgreSQL 18 xproc).

**Corrections**

- Draft id-generation said `visual: table`; the concept's main aid is now the code example, so `visual: code`.
- Draft views/denormalization listed their embedded comparison in confusedWith in my first pass; reverted to [] per CLAUDE.md 3.3 (embedded comparisons are not listed again).
- No reference statements were wrong in this unit beyond those already recorded in the coverage file (A15 overstatement, B18 materialized-view row).

### Unit indexes

**Added from the reference**

| Reference item | Landed in |
|---|---|
| A16 / B11 "indexes need maintenance" (reworded as automatic upkeep) | indexes: Rules "Kept current for you" |
| B11 "when indexes hurt: too many indexes" | indexes: Common mistakes (unused indexes, pg_stat_user_indexes.idx_scan) |
| B11 "Does adding an index always make a query faster?" | indexes: trap with why |
| B11 index types table (unique, partial, expression) | index-types: How it works steps, Rules (unique NULLs, NULLS NOT DISTINCT) |
| B11 leftmost prefix "not an absolute prohibition" | composite-indexes: Rules (skip scan, PG 18 rule on columns after a range) |
| B19 cardinality / selectivity | index-not-used: Not to be confused with |
| B11 "EXPLAIN ANALYZE executes the statement" | explain-query-plans: scenario + Rules |
| A24 estimated cost | explain-query-plans: point "Cost" (arbitrary units) |
| B19 optimisation order (measure ... measure again) | query-optimization: Mermaid loop + 6 steps |
| A42 pagination, keyset "stable ordering" | pagination: steps, tie-breaker example with real rows |
| New beyond the reference | indexes: CREATE INDEX CONCURRENTLY / InnoDB online index build (Interview Q); index-types: partial index needs a literal, not a parameter; explain: PG 18 BUFFERS by default, loops averaging, join-method Interview Q; query-optimization: pg_stat_statements normalises constants, "slow query vs too many queries"; pagination: drift scenario |

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| Reference "indexes need maintenance" | The database updates indexes on every write; the real task is dropping unused ones | https://www.postgresql.org/docs/18/indexes-intro.html ; https://www.postgresql.org/docs/18/monitoring-stats.html |
| Earlier draft composite Q: "a range stops later columns" (too strong) | Later columns are checked in the index but do not necessarily narrow the scanned part (PG 18 wording; skip scan can still apply) | https://www.postgresql.org/docs/18/indexes-multicolumn.html |
| Earlier draft trap why (clustered) mentioned SQL Server without a source | Removed; InnoDB only | https://dev.mysql.com/doc/refman/9.7/en/innodb-index-types.html |
New sources (verifiedOn 2026-10-21): 14 (indexes-unique, sql-createindex x2 uses, monitoring-stats x2, innodb-online-ddl-operations, indexes-partial, release-15, release-18 x2, indexes-ordering x2, mysql explain, using-explain, planner-optimizer, innodb-persistent-stats, pgstatstatements re-check). Facts added or changed: about 22.

### Unit patterns

**Added from the reference**

| Reference item | Concept |
|---|---|
| Q-TRANSLATOR words (GET, ONLY, LIST, PATTERN, EMPTY, KEEP LEFT, CLASSIFY, REPLACE NULL…) | english-to-sql, words table (merged into 9 rows) |
| Q40 combinations; Q13 group by the key | english-to-sql, Rules ("Group by the key") and Interview Q |
| Q29 duplicates on several columns | duplicates, Rules ("Several columns") and What it is |
| Q30 DISTINCT removes duplicates from a result | duplicates, Not to be confused with (DISTINCT vs deleting) |
| Q32/Q33 conditional count and sum | group-aggregation-patterns, table and Example |
| B21.J latest per user with id tie-breaker | top-n-per-group, scenario and Interview Q (now "latest payment per customer") |
| B21.L consecutive / repeated records, LAG and LEAD | running-totals-and-streaks, streak query, "three in a row" Interview Q, "previous month" Interview Q (LEAD as mirror) |
| New: questions to ask the interviewer (ties, NULLs, zero groups) | sql-problem-approach, Interview Q |
| New: join fan-out shown with real numbers (1600 vs 2300) | sql-problem-approach, Interview Q |
| New: LEFT JOIN anti-join with an extra match condition (status in ON vs WHERE) | anti-join-pattern, Example and scenario |
| New: MySQL error 1093 and the derived-table exception | duplicates, Rules and scenario |
| New: NULL sort order differs (PostgreSQL NULLS FIRST in DESC, MySQL NULLs last) | top-n-per-group, Rules |
| New: subquery alias required in MySQL, optional in PostgreSQL 18 | top-n-per-group, What to notice |
| New: LAG default value, LAG(amount, 1, 0) | running-totals-and-streaks, Rules |

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| Draft (top-n-per-group): "MySQL needs the subquery alias" stated without the PostgreSQL side | PostgreSQL 18 allows omitting it (SQL standard requires it); keep it for portability | https://www.postgresql.org/docs/18/sql-select.html (Compatibility) |
| Draft (duplicates): MySQL exception explained only as "materialised derived table" | Added why it is materialised here: window functions prevent derived-table merging | https://dev.mysql.com/doc/refman/9.7/en/derived-table-optimization.html |
| Reference Q38 running total `SUM(amount) OVER (ORDER BY date)` | Already the trap; now shown with real numbers (payments 2 and 3 both 1500) | https://www.postgresql.org/docs/18/sql-expressions.html |
| Reference Q-TRANSLATOR "NTH HIGHEST → ORDER BY DESC + OFFSET" | Needs DISTINCT so OFFSET counts values (english-to-sql Rules, top-n-per-group Interview Q) | https://www.postgresql.org/docs/18/sql-select.html |
| Reference Q35 top employee per department with ROW_NUMBER, "top 3: rn <= 3" | ROW_NUMBER cuts tied salary levels (Kiran dropped in the run); DENSE_RANK for levels | real run, PostgreSQL 18 |
New sources (verifiedOn 2026-10-21): PostgreSQL 18 Sorting Rows (queries-order), PostgreSQL 18 Aggregate Functions, MySQL 9.7 Working with NULL Values, MySQL 9.7 Derived Tables, MySQL 9.7 Optimizing Derived Tables, MySQL 9.7 EXCEPT, MySQL 9.7 Window Function Frame Specification, MySQL 9.7 Date and Time Functions; re-dated PostgreSQL 18 SELECT, PostgreSQL 18 Table Expressions, MySQL 9.7 Subquery Restrictions.

### Unit querying-a

**Added from the reference**

| Reference item | Concept |
|---|---|
| B2 trap: UPDATE/DELETE without WHERE (now with the "how to protect yourself" angle) | sql-commands (Common mistakes, Interview Q) |
| B4 SELECT * vs explicit columns (why) | select-and-filtering (point, Interview Q) |
| B4 BETWEEN inclusive, shown with a real missed 28-Feb payment | select-and-filtering (Interview Q) |
| B4 operators list (=, <>, !=, IN) | select-and-filtering (Rules) |
| B8 NULLIF use (division by zero) | null-handling (Rules, scenario) |
| B8 "PostgreSQL and MySQL differ in NULL-sensitive behaviours: sorting" | null-handling (point, Rules) |
| Q13 JOIN + GROUP BY with COUNT(e.id) for zero counts | joins (scenario) |
| B6 CROSS 3 x 4 = 12 (as 4 x 6 = 24 on the running data) | joins (table, scenario) |
| Added beyond: autocommit in both databases | sql-commands (Rules, Example notes) |
| Added beyond: PostgreSQL CREATE DATABASE cannot run in a transaction | sql-commands (Rules) |
| Added beyond: GROUP BY does not sort the output (PostgreSQL 18, MySQL 9.7) | aggregates-group-by (Example notes) |
| Added beyond: NULLs form one group in GROUP BY | null-handling (Rules), aggregates-group-by (Rules) |
| Added beyond: plain JOIN = INNER JOIN; NULL keys never match; MySQL advises LEFT over RIGHT | joins (Rules) |
| Added beyond: NOW() fixed per transaction (PostgreSQL) / statement (MySQL) kept; SUBSTRING forms | string-date-functions (Rules) |

**Corrections**

| What | Fix | Source |
|---|---|---|
| Draft point "NULL-safe equal: IS NOT DISTINCT FROM; MySQL writes <=>" read as if both work in MySQL | MySQL 9.7 rejects IS NOT DISTINCT FROM (syntax error, run) and has no NULLS FIRST/LAST syntax (run); stated in Rules | run on mysql:9.7; https://dev.mysql.com/doc/refman/9.7/en/comparison-operators.html |
| Reference "ASC commonly the default" | ASC is the default in both (kept as plain rule) | https://www.postgresql.org/docs/18/queries-order.html |
| Division by zero: PostgreSQL raises an error, MySQL returns NULL with warning 1365 | stated in null-handling | run; https://dev.mysql.com/doc/refman/9.7/en/arithmetic-functions.html |

### Unit querying-b

**Added from the reference**

| Item | Concept |
|---|---|
| B4 logical order "logical model, not physical" | query-order (trap, Not to be confused with, Interview Q) |
| B7 "correlated may be evaluated repeatedly or transformed" | subqueries (trap, How it works step 5) |
| B7 SELECT 1 convention in EXISTS | subqueries (point, What to notice) |
| Q21 EXISTS vs JOIN (each outer row once) | subqueries (Not to be confused with, Interview Q, scenario) |
| B14 LAG/LEAD "without a self-join" | window-functions (Why, Interview Q) |
| B14 ROW_NUMBER ties arbitrary without tie-breaker | window-functions (Rules) |
| Q39 AVG/SUM OVER (PARTITION BY) | window-functions (example, scenario) |
| B15 / Q22 multiple CTEs | ctes (Example with two CTEs) |
| B15 "account for cycles" | ctes (point, Rules, Interview Q, scenario) |
| B16 compatible columns, ORDER BY at the end | set-operations (points, Rules, How it works step 5) |
| Q23 UNION vs UNION ALL | set-operations, union-vs-union-all |
Also added (beyond the reference, verified): column matching by position and names from the first query (set-operations); brackets for ORDER BY/LIMIT on one part; INTERSECT ALL / EXCEPT ALL; scalar subquery with no rows gives NULL; derived-table alias rule (MySQL requires, PostgreSQL 18 optional); DISTINCT + ORDER BY rule in PostgreSQL; GROUP BY alias ambiguity rule in PostgreSQL; NOT MATERIALIZED; CTE used twice computed once; UNION vs UNION ALL inside recursion; PostgreSQL 8.4 as the first release with window functions and CTEs; LAG default argument; WINDOW clause.

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| Reference Q38 running total SUM OVER (ORDER BY date) | default RANGE frame includes ties; ROWS frame + unique sort (already recorded; kept as trap) | PostgreSQL 18 sql-expressions 4.2.8 |
| Draft point "MySQL alias in GROUP BY and HAVING; PostgreSQL GROUP BY" | kept; added PostgreSQL rejects aliases in HAVING (verified by run and docs) | PostgreSQL 18 SELECT docs |
| Draft tree/glossary "derived table: standard SQL requires an alias" | true, but PostgreSQL 18 allows omitting it; MySQL 9.7 errors | PostgreSQL 18 SELECT (Compatibility) |
| Draft "PostgreSQL computes a CTE used many times once" | kept, with the exact rule: non-recursive, side-effect-free, referenced once → inlined; NOT MATERIALIZED forces merge | PostgreSQL 18 queries-with |

### Unit scaling

**Added from the reference**

| Reference item | Concept |
|---|---|
| A32 "WRITE → Primary, READ → Replicas" | replication (How it works steps; Java Example with read-your-writes routing) |
| A32 / B22 replica lag paragraph | replication (point, scenario, Interview Q, Common mistake on fresh reads) |
| A33 range example "Server 1: users 1-1M ..." | sharding (scenario: range by rising id = hot shard) |
| A34 "Orders 2024 / 2025 / 2026" | partitioning (Example: monthly partitions of payments, real EXPLAIN) |
| A35 partition picture "Server A X Server B" | cap-theorem (Mermaid with numbered steps, per-data CP/AP table) |
| A46 backup, restore, PITR, disaster recovery | backup-recovery (real PITR run, RPO/RTO scenario) |
| A47 final answer "How do you make a database-backed application fast?" | scaling-ladder (Interview Q) |
| New angle: delayed replica (recovery_min_apply_delay / SOURCE_DELAY, default 0) | replication (Rules); glossary delayed-replica |
| New angle: a row with no matching partition fails; DEFAULT partition; key update moves the row; DETACH CONCURRENTLY; MySQL 8192-partition limit; choose the partition key by the WHERE clauses | partitioning (scenario, Rules, Interview Q) |
| New angle: unique ids across shards; same key for related tables; status as a bad key; each shard needs its own backups | sharding (Rules) |
| New angle: max_prepared_transactions = 0 and the real "prepared transactions are disabled" error; prepared transactions are for transaction managers; "a compensation is not a rollback"; outbox Interview Q | distributed-transactions |
| New angle: recovery_target_action defaults to pause; whole-cluster-only physical restore; unbroken WAL chain | backup-recovery (Example, Rules) |

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| Draft replication "How it works" called the MySQL binary log the write-ahead log | Worded as "the change log": WAL in PostgreSQL, binary log in MySQL (InnoDB's WAL is the redo log, see concept wal) | https://dev.mysql.com/doc/refman/9.7/en/replication.html |
| Draft sharding example said a hash with plain `%`; negative ids give negative shards | Java uses `Math.floorMod`, which takes the divisor's sign | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Math.html |
| Reference A32 "backup/recovery support" (already recorded) | Kept as the replication trap; added the delayed-replica exception | runtime-config-replication (PG 18), replication-delayed (MySQL 9.7) |
| Draft backup example used `text` for a config file | Now a bash block that was really run, with real output | run on postgres:18 |

### Unit transactions

**Added from the reference**

| Reference item | Concept |
|---|---|
| B12 "production code must check funds and handle errors" | transactions (trap, Rules: error behaviour per product; Java rollback in catch); optimistic-pessimistic-locking (atomic `balance >= 500`) |
| B12 COMMIT / ROLLBACK / SAVEPOINT example | transactions (Example rebuilt as a savepoint-per-row import, showing PostgreSQL's aborted state) |
| A20 dirty read story (T1 changes, T2 reads, T1 rolls back) | isolation-levels (How it works, numbered timeline of all three anomalies) |
| B13 "Serializable can cause blocking or serialization failures" | isolation-levels (Rules: PostgreSQL SSI vs InnoDB SERIALIZABLE; Interview Q "Why not always SERIALIZABLE?") |
| B13 Reduce deadlocks: indexing so statements touch fewer rows | locking (Rules: InnoDB locks every scanned index record; Interview Q on missing index); deadlocks (Rules) |
| B13 zero rows updated = changed or missing | optimistic-pessimistic-locking (steps, Rules, Interview Q) |
| New angle: MySQL undoes only the failed statement, so COMMIT after an error saves half the work; PostgreSQL turns that COMMIT into ROLLBACK | transactions (points, trap, scenario), acid (Example) |
| New angle: JDBC autocommit and setAutoCommit(false) / commit / rollback | transactions (Java Example) |
| New angle: MySQL vs PostgreSQL REPEATABLE READ under a concurrent update | isolation-levels (Example, Interview Q); scenario on migrating MySQL → PostgreSQL |
| New angle: write skew with concurrent refunds | isolation-levels (scenario) |
| New angle: lock wait timeout rolls back one statement (InnoDB) vs deadlock rolls back the transaction | deadlocks (Not to be confused with) |
| New angle: sync_binlog default 1; innodb_flush_log_at_trx_commit 0/2 lose up to about a second | wal (Example, Rules) |

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| Reference B12: "if something fails, the transaction can be rolled back" (implies automatic) | The app must roll back: PostgreSQL aborts the block, MySQL undoes only the failed statement (most errors) and keeps the transaction open | https://dev.mysql.com/doc/refman/9.7/en/innodb-error-handling.html ; https://www.postgresql.org/docs/18/tutorial-transactions.html ; run on both |
| Reference A21 "READ → shared" (already recorded) | Kept as the locking trap | existing |
| Draft acid table linked later concepts (mvcc, locks, wal, cap-theorem) as if known | Later concepts named as "the next concept" / "later in this topic"; CAP linked as "which you will see in Scaling" | n/a |
| Draft isolation level for pessimistic JPA: none | `LockModeType.PESSIMISTIC_WRITE` described as "asks for an exclusive row lock" (no claim about the exact SQL Hibernate emits) | Jakarta Persistence 3.2 spec |
