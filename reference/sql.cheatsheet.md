# Database Fundamentals

## What a database is
A database is an organized collection of data you can store, find, change, and manage efficiently. A **DBMS** is the software that manages it; an **RDBMS** is a DBMS that stores data in related tables with keys and integrity rules. **SQL** is the language used to talk to a relational database.

- Table = rows and columns; **Row/Record** = one entry; **Column/Field** = one attribute.
- **Schema** = the structure of the database objects.
- Examples of RDBMS: PostgreSQL, MySQL, Oracle, SQL Server.

> Remember: Store data, find it, change it, keep it correct, make it fast, and let many users work safely.

## SQL vs NoSQL
The first big choice. **SQL** stores structured data in tables with clear relationships; **NoSQL** uses flexible models (documents, key-value, wide-column, graph).

| | SQL | NoSQL |
|---|---|---|
| Model | Tables + relationships | Documents, KV, wide-column, graph |
| Best when | Relationships, transactions, complex queries | Flexible schema, huge scale, simple fast access |
| Examples | PostgreSQL, MySQL, Oracle | MongoDB, Redis, Cassandra, Neo4j |

> Remember: SQL = structured tables and relationships; NoSQL = flexible models and scale.

## Primary key ⭐
A column (or set of columns) that uniquely identifies each row. Must be **unique** and **not NULL**; a table has one primary key, but it can span multiple columns (composite).

```sql
CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100));
```

> Remember: Primary key answers "who am I?" — unique, never NULL, one per table.

## Foreign key ⭐
A column that references a key in another table (or the same table). It enforces **referential integrity** — you cannot reference a row that does not exist. A foreign key does **not** have to be unique: many orders can point to the same user.

```sql
CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

> Remember: Foreign key answers "which other row am I linked to?" — and can repeat.

## Types of keys
- **Candidate key:** minimal set of columns that uniquely identifies a row.
- **Alternate key:** a candidate key not chosen as primary.
- **Composite key:** made of multiple columns.
- **Surrogate key:** artificial ID (auto-generated).
- **Natural key:** real-world identifier (e.g. a national product code).

## Relationships
- **One-to-One:** person → passport.
- **One-to-Many** ⭐: user → orders.
- **Many-to-Many:** students ↔ courses, implemented with a junction/mapping table (`student_id, course_id`).

## SQL command categories
| Category | Purpose | Commands |
|---|---|---|
| DDL | Define structures | CREATE, ALTER, DROP, TRUNCATE |
| DML | Modify data | INSERT, UPDATE, DELETE |
| DQL | Read data | SELECT |
| DCL | Manage privileges | GRANT, REVOKE |
| TCL | Manage transactions | COMMIT, ROLLBACK, SAVEPOINT |

## Data types
- **INT / BIGINT** for whole numbers; **DECIMAL(p,s) / NUMERIC** for exact money; **FLOAT/REAL/DOUBLE** are approximate.
- **CHAR(n)** fixed-width (padded); **VARCHAR(n)** variable up to a limit; **TEXT** for long text.
- **DATE, TIME, TIMESTAMP**; **BOOLEAN**; **JSON / JSONB**.

> Remember: Use DECIMAL for money — floating point rounds. PostgreSQL has native BOOLEAN; MySQL BOOLEAN is an alias for TINYINT(1). PostgreSQL has JSON and JSONB (JSONB indexes well); MySQL has native JSON.

## NULL ⭐
NULL means missing/unknown — it is **not** 0 and not an empty string. Comparisons with NULL give **UNKNOWN**, and WHERE keeps only rows where the condition is TRUE.

```sql
SELECT * FROM users WHERE city IS NULL;      -- correct
-- WHERE city = NULL                          -- wrong: always UNKNOWN
```

- Three-valued logic: TRUE / FALSE / UNKNOWN.
- `COALESCE(a, b, ...)` returns the first non-NULL value; `NULLIF(a,b)` returns NULL when a=b, else a.
- Most aggregates ignore NULL; `COUNT(*)` is the exception. `SUM`/`AVG` of no non-NULL rows return NULL.

> Remember: Use IS NULL / IS NOT NULL, never = NULL.

---

# Query Basics (SELECT)

## SELECT, WHERE, ORDER BY, LIMIT
```sql
SELECT name, age FROM users
WHERE age >= 25 AND city = 'Delhi'
ORDER BY age DESC, name ASC
LIMIT 10 OFFSET 20;
```

- `SELECT *` is handy for debugging; list columns explicitly in production.
- Operators: `=`, `<>` / `!=`, `>`, `<`, `>=`, `<=`, `AND`, `OR`, `NOT`. Use parentheses when mixing AND/OR.
- `DISTINCT` removes duplicate **row combinations**, not per column.
- `ORDER BY`: ASC (default) / DESC. Rows tied on all sort keys have no guaranteed order — add a unique tie-breaker for stable pagination.
- `LIMIT n OFFSET m` returns up to n rows after skipping m. Large offsets are slow (prefer keyset pagination).

## BETWEEN, IN, LIKE
```sql
WHERE age BETWEEN 20 AND 30        -- inclusive both ends
WHERE city IN ('Delhi', 'Mumbai')
WHERE name LIKE 'A%'               -- starts with A
WHERE name LIKE '%an%'             -- contains "an"
WHERE name LIKE '_a%'              -- one char, then 'a'
```

- `%` = zero or more chars; `_` = exactly one char.
- LIKE case sensitivity depends on collation; PostgreSQL has `ILIKE` for case-insensitive matching.

## Logical run order ⭐⭐⭐
A query is written SELECT-first but logically runs in a different order:

```
FROM / JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT
```

This is the logical model, not the optimizer's physical order.

> Remember: WHERE runs before SELECT, so a SELECT alias generally can't be used in WHERE (it isn't defined yet).

## CASE and COALESCE
```sql
SELECT name,
  CASE WHEN salary >= 100000 THEN 'HIGH'
       WHEN salary >= 50000  THEN 'MEDIUM'
       ELSE 'LOW' END AS level
FROM employees;
```

- `CASE` classifies values; works in SELECT and ORDER BY.
- `COALESCE(phone, email, 'N/A')` returns the first non-NULL.

## String and date functions
- Strings: `UPPER`, `LOWER`, `LENGTH`, `TRIM`, `CONCAT`, `SUBSTRING`, `REPLACE`.
- Dates: `CURRENT_DATE`, `CURRENT_TIMESTAMP`, `YEAR/MONTH/DAY`, `DATEDIFF`, `DATE_ADD`, `DATE_SUB`. Exact date-function syntax varies by database.

---

# Joins

## The four joins ⭐⭐⭐
A JOIN combines rows from tables using a condition.

| Join | Returns |
|---|---|
| INNER | Only rows matching on both sides |
| LEFT | All left rows + matching right (unmatched right = NULL) |
| RIGHT | All right rows + matching left |
| FULL OUTER | All rows from both, matched or not |

```sql
SELECT u.name, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
```

> Remember: INNER = matching only; LEFT = keep all left; RIGHT = keep all right; FULL = keep both. MySQL has no direct FULL OUTER JOIN (emulate with LEFT + RIGHT + UNION).

## Other joins
- **CROSS JOIN:** every left row paired with every right row (3×4 = 12 rows).
- **SELF JOIN:** a table joined to itself (employee ↔ manager).
- **EQUI / NON-EQUI:** join on equality vs on a range.

## ON vs WHERE in joins ⭐
A condition in **ON** controls matching; a condition in **WHERE** filters the final rows.

```sql
-- Keeps users with no paid orders (filter in ON)
FROM users u LEFT JOIN orders o
  ON u.id = o.user_id AND o.status = 'PAID';

-- Drops users with no paid orders (filter in WHERE turns LEFT into INNER)
FROM users u LEFT JOIN orders o
  ON u.id = o.user_id
WHERE o.status = 'PAID';
```

> Remember: Putting a right-table filter in WHERE of a LEFT JOIN quietly makes it behave like an INNER JOIN.

## Find rows with no match (anti-join)
```sql
SELECT u.* FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;              -- users with no orders
-- or NOT EXISTS (often clearer)
```

---

# Grouping and Aggregates

## Aggregate functions
`COUNT(*)` counts rows; `COUNT(column)` counts non-NULL; `COUNT(DISTINCT column)` counts distinct non-NULL. Also `SUM`, `AVG`, `MIN`, `MAX`.

For values `10, 10, NULL`: `COUNT(*)=3`, `COUNT(col)=2`, `COUNT(DISTINCT col)=1`.

## GROUP BY and HAVING ⭐⭐⭐
GROUP BY makes groups and computes an aggregate per group. HAVING filters groups.

```sql
SELECT city, COUNT(*) AS total
FROM users
WHERE age >= 18        -- filters rows first
GROUP BY city
HAVING COUNT(*) >= 5;  -- filters groups after
```

- A selected column in a grouped query must be grouped or aggregated.
- WHERE can't use a group aggregate like `COUNT(*)` directly — use HAVING or a subquery.

> Remember: WHERE = rows (before grouping); HAVING = groups (after grouping).

## Conditional aggregates
```sql
SELECT COUNT(*) AS total,
       COUNT(CASE WHEN status='COMPLETED' THEN 1 END) AS completed,
       SUM(CASE WHEN status='COMPLETED' THEN amount ELSE 0 END) AS revenue
FROM orders;
```

---

# Subqueries and CTEs

## Subqueries
A query nested inside another.
- **Scalar:** returns one value — `WHERE age > (SELECT AVG(age) FROM users)`.
- **Multi-row with IN:** `WHERE id IN (SELECT user_id FROM orders)`.
- **EXISTS:** true if the subquery returns at least one row (`SELECT 1` by convention).
- **Correlated:** references the outer query, so it may be re-evaluated per row; **non-correlated** stands alone.

## IN vs EXISTS
Both test membership/existence and the optimizer may plan them similarly.

> Remember: `NOT IN` is dangerous when the subquery can return NULL (can yield UNKNOWN and drop everything); `NOT EXISTS` is safer for anti-joins.

## CTEs (WITH)
A named query block, good for readability and recursion.

```sql
WITH high_value AS (
  SELECT * FROM orders WHERE amount > 10000
)
SELECT * FROM high_value;
```

A CTE names a query; a subquery is embedded. Neither is automatically faster.

## Recursive CTE
For hierarchies (employee→manager, categories):

```sql
WITH RECURSIVE tree AS (
  SELECT id, manager_id, name FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.manager_id, e.name
  FROM employees e JOIN tree t ON e.manager_id = t.id
)
SELECT * FROM tree;
```

Account for cycles in production hierarchies.

---

# Window Functions ⭐⭐⭐

## What they do
Window functions compute across related rows **without collapsing** them into one row (unlike GROUP BY). `PARTITION BY` splits rows into independent groups; `ORDER BY` orders within the window.

```sql
ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
```

## Ranking functions
| Function | Ties (scores 100, 100, 90) |
|---|---|
| ROW_NUMBER() | 1, 2, 3 — always distinct |
| RANK() | 1, 1, 3 — ties share, gap after |
| DENSE_RANK() | 1, 1, 2 — ties share, no gap |

> Remember: ROW_NUMBER = 1 2 3 4; RANK = 1 2 2 4; DENSE_RANK = 1 2 2 3.

## Running total, LAG, LEAD
```sql
SUM(amount) OVER (PARTITION BY user_id ORDER BY created_at, id
                  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total

LAG(sales)  OVER (ORDER BY date) AS previous   -- previous row
LEAD(sales) OVER (ORDER BY date) AS next       -- next row
```

`LAG`/`LEAD` read a neighbouring row's value without a self-join.

## Top-N per group (common pattern)
```sql
SELECT * FROM (
  SELECT e.*, DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
  FROM employees e
) ranked
WHERE rnk = 1;        -- rnk <= 3 for top three; preserves ties
```

---

# Set Operations

| Operation | Meaning |
|---|---|
| UNION | Combine, remove duplicates |
| UNION ALL | Combine, keep duplicates (cheaper) |
| INTERSECT | Rows in both |
| EXCEPT | Rows in the first but not the second |

- Queries must have matching column counts and compatible types; put `ORDER BY` at the very end.
- PostgreSQL supports all four; MySQL supports UNION / UNION ALL, and INTERSECT / EXCEPT from 8.0.31.

> Remember: UNION de-duplicates (extra work); UNION ALL keeps everything (faster).

---

# Modifying Data (DML and DDL)

## INSERT, UPDATE, DELETE
```sql
INSERT INTO users (id, name) VALUES (1, 'Asha'), (2, 'Riya');
UPDATE users SET name = 'Riya' WHERE id = 1;
DELETE FROM users WHERE id = 1;
```

> Remember: Without WHERE, UPDATE changes every row and DELETE deletes every row.

## Upsert (insert or update on conflict)
```sql
-- PostgreSQL
INSERT INTO users (id, name) VALUES (1, 'Asha')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- MySQL
INSERT INTO users (id, name) VALUES (1, 'Asha')
ON DUPLICATE KEY UPDATE name = 'Asha';
```

## DELETE vs TRUNCATE vs DROP
| Command | Removes | WHERE? |
|---|---|---|
| DELETE | Selected rows | Yes |
| TRUNCATE | All rows (less row-by-row overhead) | No |
| DROP | The whole table (structure + data) | No |

> Remember: DELETE = chosen rows; TRUNCATE = all rows, keep table; DROP = table gone. PostgreSQL TRUNCATE is transactional; MySQL TRUNCATE forces an implicit commit.

---

# Schema, Constraints and Normalization

## Constraints ⭐⭐
Rules that protect data correctness.

| Constraint | Purpose |
|---|---|
| PRIMARY KEY | Unique, non-NULL identifier |
| FOREIGN KEY | Valid references |
| UNIQUE | No duplicate key values (can span columns) |
| NOT NULL | Requires a value |
| CHECK | A condition must hold |
| DEFAULT | Value when column omitted |

```sql
CREATE TABLE employees (
  id INT PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  salary DECIMAL(10,2) CHECK (salary >= 0),
  active BOOLEAN NOT NULL DEFAULT TRUE
);
```

- DEFAULT applies when the column is omitted, not when you insert NULL explicitly.
- CHECK does not reject NULL by itself (NULL → UNKNOWN); add NOT NULL if needed.
- Foreign-key actions: `ON DELETE CASCADE / SET NULL / RESTRICT / NO ACTION`.

## Normalization ⭐
Organizing data to reduce duplication and prevent inconsistent updates. It avoids three anomalies: **insertion** (can't store one fact without another), **update** (same fact in many rows), **deletion** (losing a fact by deleting a row).

| Form | Easy definition |
|---|---|
| 1NF | Atomic values; no repeating groups |
| 2NF | 1NF + no non-key column depends on only part of a composite key |
| 3NF | 2NF + no transitive dependency on the key |
| BCNF | Every determinant is a superkey |

## Denormalization
Intentionally duplicating or precomputing data to speed up reads or simplify queries — at the cost of storage and update complexity.

> Remember: Normalize for consistency; denormalize for read performance when a measured workload justifies it.

---

# Indexes and Performance

## Indexes ⭐⭐⭐
An index is a structure that helps the database find rows without scanning the whole table — like a book's index.

```sql
CREATE INDEX idx_users_email ON users(email);
```

But indexes cost storage and slow INSERT/UPDATE/DELETE (they must be maintained).

**Types:** B-tree (default, equality + range), Hash (equality), Composite (multi-column), Unique, Partial/filtered, Expression/functional, Full-text, Spatial.
- PostgreSQL: B-tree, Hash, GiST, SP-GiST, GIN, BRIN.
- MySQL InnoDB: mainly B-tree, plus full-text and spatial.

## Composite index and leftmost-prefix
For an index on `(A, B, C)`, it best supports filters starting with A, then A+B, then A+B+C. It helps little for filtering on B alone.

```sql
CREATE INDEX idx ON orders(user_id, status);  -- great for user_id, or user_id+status
```

## Clustered vs non-clustered
- **Clustered:** table rows organized around the index key.
- **Non-clustered:** a separate structure pointing to rows.
- InnoDB clusters the table on the primary key; secondary indexes store the primary-key value to find rows.

> Remember: A PostgreSQL primary key does **not** physically sort the table; `CLUSTER` reorders once but isn't maintained afterward.

## When indexes don't help
Adding an index does **not** always speed a query. Common reasons it isn't used:
- The query returns a large fraction of the table.
- A function/conversion wraps the column (`WHERE LOWER(email) = ...`) — use an expression/functional index.
- The filter doesn't match the index's leading columns.
- Stale statistics, or the optimizer estimates a scan is cheaper.

## EXPLAIN
`EXPLAIN` shows the planned execution; `EXPLAIN ANALYZE` actually runs the query and reports real timings (careful: it executes the statement, including writes).

## Optimizing a slow query (answer order)
1. Measure and find the slow query. 2. Read the plan (EXPLAIN). 3. Check indexes. 4. Reduce work (select needed columns, filter early). 5. Review joins/subqueries and cardinality. 6. Check statistics/data types. 7. Measure again.

- **Covering index:** holds all columns a query needs, so the table isn't touched.
- **Selectivity:** how narrowly a predicate filters (high = matches few rows). **Cardinality:** number of distinct values / estimated rows.

## N+1 query problem ⭐⭐⭐
One query to fetch 100 users, then 100 more to fetch each user's orders = 101 queries. Fix with joins, fetch strategies, or batch fetching.

## Pagination ⭐⭐⭐
Don't return a million rows. `LIMIT/OFFSET` is simple but slow at large offsets; **keyset/cursor** pagination (`WHERE id > last_seen_id`) is better for large, changing datasets.

## Connection pooling ⭐⭐⭐
Opening a DB connection is expensive, so a pool keeps connections open and reuses them (HikariCP in Spring Boot). Bigger is not always better — too many concurrent queries overload the database.

## SQL injection ⭐⭐⭐
Happens when untrusted input becomes executable SQL. Use **parameterized queries / prepared statements**, never string concatenation.

```java
String sql = "SELECT * FROM users WHERE email = ?";
PreparedStatement ps = conn.prepareStatement(sql);
ps.setString(1, email);
```

Also: least-privilege DB accounts; table/column names can't be parameters (use an allowlist).

---

# Transactions and ACID ⭐⭐⭐

## Transaction
A group of operations treated as one unit — all succeed or all fail. Classic example: a bank transfer debits one account and credits another; both must happen.

```sql
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;   -- or ROLLBACK on failure
```

`SAVEPOINT` lets you roll back part of a transaction (`ROLLBACK TO SAVEPOINT name`).

## ACID
- **Atomicity:** all changes happen, or none.
- **Consistency:** the DB stays valid by its rules/constraints.
- **Isolation:** concurrent transactions don't interfere beyond what the isolation level allows.
- **Durability:** once committed, data survives failures.

> Remember: All, Correct, Independent, Done-forever.

---

# Isolation and Locking

## Concurrency anomalies
- **Dirty read:** read uncommitted data that may be rolled back.
- **Non-repeatable read:** the same row gives different committed values within one transaction.
- **Phantom read:** a repeated predicate query sees a changed set of rows (another transaction inserted/deleted).
- **Lost update:** one update overwrites another. **Write skew:** two individually valid changes together break a rule.

## Isolation levels (weak → strong)
| Level | Dirty | Non-repeatable | Phantom |
|---|---|---|---|
| Read Uncommitted | Possible | Possible | Possible |
| Read Committed | No | Possible | Possible |
| Repeatable Read | No | No | Possible* |
| Serializable | No | No | No |

*In the standard model. Defaults differ: **PostgreSQL = Read Committed**, **MySQL InnoDB = Repeatable Read**. PostgreSQL's Repeatable Read uses snapshot isolation (prevents ordinary phantoms, but write skew can still happen).

## Locking
- **Shared lock:** for reading; many can hold it.
- **Exclusive lock:** for writing; conflicting operations wait.
- **Pessimistic:** lock rows up front (`SELECT ... FOR UPDATE`).
- **Optimistic:** allow concurrent work, detect conflict on update with a version column.

```sql
UPDATE products SET quantity = 8, version = version + 1
WHERE id = 1 AND version = 4;   -- 0 rows updated = someone else changed it
```

## Deadlock ⭐⭐
Two transactions each wait for a lock the other holds (A locks row 1 waiting for row 2; B locks row 2 waiting for row 1). The database detects it and aborts one. Reduce by locking in a consistent order, keeping transactions short, and indexing so statements touch fewer rows.

---

# Views, Procedures and Triggers

- **View:** a saved query that acts like a virtual table — simplifies complex queries, abstracts, controls access. Stores the definition, not a copy.
- **Materialized view:** stores actual results and must be refreshed (`REFRESH MATERIALIZED VIEW`). PostgreSQL supports them natively; MySQL uses summary tables maintained by jobs instead.
- **Stored procedure:** DB-side routine for operations/workflows. **Function:** returns a value/result. Many apps keep business logic in the application layer instead.
- **Trigger:** runs automatically on INSERT/UPDATE/DELETE (auditing, integrity). Use sparingly — hidden logic is hard to debug.

---

# Scaling and Architecture

## OLTP vs OLAP
- **OLTP:** many small transactions (login, order, payment) — consistency matters.
- **OLAP:** large analytical queries and aggregations (reports, trends).

> Remember: OLTP = application transactions; OLAP = analytics.

## Replication vs sharding ⭐⭐
- **Replication:** copy the same data to multiple servers — for availability, backups, and read scaling (write to primary, read from replicas). Watch **replication lag**: a read right after a write may be stale on a lagging replica.
- **Sharding:** split different data across servers (users 1–1M, 1M–2M...) — for scale beyond one database.
- **Partitioning:** split one large table into pieces (by date/range/hash/list) inside one database, still shown as one logical table.

> Remember: Replication = copy data; sharding = split data across instances; partitioning = split a table within one database.

## CAP theorem ⭐⭐⭐
For distributed databases: Consistency, Availability, Partition tolerance. During a **network partition**, a system must trade off between consistency and availability — it can't fully guarantee both.

## Database vs cache
- **Database:** durable source of truth.
- **Cache (Redis):** fast temporary layer. Read path: check Redis → on miss, read DB, store in Redis, return.
- Redis (in-memory store) is also used for sessions, rate limiting, counters, locks, pub/sub.

## ORM, JPA, Hibernate
ORM maps Java objects to tables. **JPA** is the specification; **Hibernate** is a popular implementation (`userRepository.findById(id)`). You still need SQL: complex queries, joins, indexes, and performance matter, and ORMs can generate inefficient queries.

## Backend DB flow and internals
Request path: `Client → Controller → Service → Repository/DAO → Connection Pool → Database`.
- **WAL (write-ahead log):** records changes before data pages — supports crash recovery and replication.
- **MVCC:** multiple row versions let readers and writers work concurrently.

## Backup and recovery
Backup = a recoverable copy; recovery = restoring after failure. Know point-in-time recovery, replication, and disaster recovery.

> Strong one-line answer for "how do you make a DB-backed app fast?": use proper indexes, optimize queries and joins, avoid N+1, use pagination, connection pooling and caching, and scale with read replicas, partitioning or sharding when needed.

---

# PostgreSQL vs MySQL

Both are RDBMSs supporting SQL, transactions, indexes, constraints, joins and foreign keys. PostgreSQL leans to advanced SQL, rich types/indexing and standards; MySQL is widely used in web apps (InnoDB engine).

| Feature | PostgreSQL | MySQL (InnoDB) |
|---|---|---|
| Default isolation | Read Committed | Repeatable Read |
| Auto IDs | `GENERATED AS IDENTITY` | `AUTO_INCREMENT` |
| Boolean | Native BOOLEAN | Alias for TINYINT(1) |
| JSON | JSON + JSONB | Native JSON |
| FULL OUTER JOIN | Supported | No direct syntax |
| Partial indexes | Yes | No general equivalent |
| Expression indexes | Yes | Functional indexes (modern) |
| Materialized views | Native | None (use summary tables) |
| Upsert | `ON CONFLICT` | `ON DUPLICATE KEY UPDATE` |
| String concat | `||` | `CONCAT()` (`||` means OR) |
| DDL | Many statements transactional | Many DDL statements implicitly commit |

**PostgreSQL extras:** MVCC with `VACUUM`/`ANALYZE`, `RETURNING`, `ILIKE`, GIN indexes on JSONB, `EXPLAIN ANALYZE`.
**MySQL extras:** InnoDB clustered primary key, secondary indexes carry the PK value, AUTO_INCREMENT values aren't reused after rollback.

> Remember: Know the concept first, then the database-specific behaviour — syntax is similar, not identical.

---

# Common "Why X vs Y?" Comparisons

## WHERE vs HAVING
WHERE filters individual rows before grouping; HAVING filters groups after aggregation. WHERE can't use `COUNT(*)` directly.

## UNION vs UNION ALL
UNION removes duplicates (extra sorting/hashing work); UNION ALL keeps them and is cheaper. Use UNION ALL unless you truly need de-duplication.

## DELETE vs TRUNCATE vs DROP
DELETE removes chosen rows (WHERE, slower); TRUNCATE clears all rows fast but keeps the table; DROP removes the table itself.

## INNER vs LEFT JOIN
INNER keeps only matches; LEFT keeps all left rows with NULLs for missing right data. A right-table filter in WHERE turns a LEFT JOIN into an effective INNER JOIN — put it in ON to preserve unmatched rows.

## IN vs EXISTS
Both test membership; the optimizer may plan them alike. Prefer `NOT EXISTS` over `NOT IN` when NULLs are possible.

## Primary key vs UNIQUE
Primary key identifies each row (one per table, never NULL, usually referenced by foreign keys); UNIQUE just prevents duplicates (many allowed per table, NULL handling varies by database).

## Primary key vs foreign key
Primary key identifies a row within its own table; foreign key links a row to a key in another table and can repeat.

## Normalization vs denormalization
Normalize to remove duplication and keep data consistent; denormalize to speed reads by adding controlled redundancy.

## Clustered vs non-clustered index
Clustered organizes the actual rows by the key (one per table); non-clustered is a separate lookup structure pointing to rows.

## Correlated vs non-correlated subquery
Non-correlated runs once, independent of the outer query; correlated references outer values and may re-run per row.

## CTE vs subquery
A CTE (`WITH`) names a reusable query block for readability and recursion; a subquery is embedded inline. Neither is automatically faster.

## OFFSET vs keyset pagination
`LIMIT/OFFSET` is simple but slows down at large offsets; keyset (`WHERE id > last_seen_id`) stays fast on large, changing data.
