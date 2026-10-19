# Plan: SQL & Databases (new tech, 20-10-2026)

Phase 4 (new tech), following Phase 3 with the reference (CLAUDE.md 3.8). Reference: `reference/sql.md` (owner input, not a source;
Part A has 47 numbered sections, a one-shot guide; Part B has 24 numbered sections, a cheat sheet, with 12 lettered query
patterns in B21). Owner request: SQL, PostgreSQL, MySQL and everything database-related a backend developer needs (including the
database side of system design), plus tricks and patterns that make databases easy to remember. No repeated content, not lengthy.

Slug `sql`, name "SQL & Databases", accent teal (unused by other techs). Baseline: **PostgreSQL 18** (18.6 latest; 19 only at
RC 1 on 15-10-2026) and **MySQL 9.7 LTS** (April 2026; 8.4 LTS still common; 26.7 is an Innovation release). Standard SQL first,
with a one-line PostgreSQL / MySQL note where they differ. App code: Java only.

## Shape

- 58 concepts in 8 topics; whole concept file ≤ 550 words; 1–3 primary sources (PostgreSQL 18 docs, MySQL 9.7 manual,
  OWASP, HikariCP, Hibernate/Jakarta Persistence, Redis docs, original papers).
- Tree: 2–6 children per concept, about 250 nodes. Comparisons: 33. Glossary: about 250 terms. Story spine: about 14 steps.

## Topics (8) and concepts

| #   | Topic                        | Concepts                                                                                                                                       |
| --- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Database Basics              | relational-databases, sql-and-nosql, keys, relationships, data-types, constraints, postgresql-and-mysql                                        |
| 2   | Writing SQL                  | sql-commands, select-and-filtering, query-order, null-handling, aggregates-group-by, joins, subqueries, set-operations, window-functions, ctes |
| 3   | Schema Design                | normalization, denormalization, id-generation, views, stored-procedures-triggers, oltp-and-olap                                                |
| 4   | Indexes and Performance      | indexes, index-types, clustered-indexes, composite-indexes, index-not-used, explain-query-plans, query-optimization, pagination                |
| 5   | Transactions and Concurrency | transactions, acid, isolation-levels, mvcc, locking, optimistic-pessimistic-locking, deadlocks, wal                                            |
| 6   | Databases in Backend Apps    | connection-pooling, sql-injection, orm-jpa, n-plus-one, caching-redis, upsert                                                                  |
| 7   | Scaling and Reliability      | replication, partitioning, sharding, cap-theorem, distributed-transactions, backup-recovery, scaling-ladder                                    |
| 8   | SQL Patterns and Tricks      | sql-problem-approach, top-n-per-group, duplicates, anti-join-pattern, running-totals-and-streaks, group-aggregation-patterns                   |

Comparisons: sql-vs-nosql, primary-key-vs-unique-key, decimal-vs-float, postgresql-vs-mysql, delete-vs-truncate-vs-drop, where-vs-having, inner-vs-left-join, in-vs-exists, union-vs-union-all, row-number-vs-rank-vs-dense-rank, group-by-vs-partition-by, cte-vs-subquery, normalization-vs-denormalization, auto-increment-vs-uuid, view-vs-materialized-view, stored-procedure-vs-function, oltp-vs-olap, btree-vs-hash-index, clustered-vs-nonclustered-index, offset-vs-keyset-pagination, dirty-vs-nonrepeatable-vs-phantom-read, read-committed-vs-repeatable-read, shared-vs-exclusive-lock, optimistic-vs-pessimistic-locking, statement-vs-preparedstatement, jdbc-vs-jpa-vs-hibernate, database-vs-cache, sync-vs-async-replication, partitioning-vs-sharding, replication-vs-sharding, strong-vs-eventual-consistency, two-phase-commit-vs-saga, logical-vs-physical-backup.

## Ownership (each fact once)

- NOT IN + NULL trap: `null-handling`; subqueries and anti-join-pattern link to it.
- PostgreSQL vs MySQL: each difference lives in its own concept (isolation defaults in `isolation-levels`, ids in `id-generation`,
  upsert in `upsert`, table storage in `clustered-indexes`, VACUUM in `mvcc`, DDL commits in `transactions`); `postgresql-and-mysql`
  holds only the summary comparison and "which to pick".
- Window function definitions: `window-functions`; the patterns topic only shows how to use them on problems.
- Selectivity and cardinality: `index-not-used`. WAL: `wal`; replication and backup-recovery link to it.
- The "how to scale / make it fast" interview answer: `scaling-ladder`, which links to the concept of every step.

## Tricks and patterns (owner request)

Topic 8 "SQL Patterns and Tricks": a step-by-step approach for any SQL question with a pattern picker, then the patterns that
solve most interview queries (Nth highest and top N per group, duplicates, rows with no match, running totals and streaks, pivots
and zero counts). Memory aids elsewhere: logical query order, join and isolation tables, "copy vs split" for replication vs
sharding, the scaling ladder.

## Process

1. Eight drafting units in parallel, one per topic. Each passes the real validator in isolation and logs coverage rows and a claim log.
2. Merge, validate, commit.
3. Independent verification pass by different agents (4.8). Fix, validate, commit.
4. Close `reference/sql.coverage.md`, update `OPEN_QUESTIONS.md`, run all quality gates, final report.
