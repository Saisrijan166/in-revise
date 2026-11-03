import type { SyntaxSheet } from "./types";

export const sql: SyntaxSheet = {
  tagline: "The SELECT, JOIN, GROUP BY and window syntax you actually write every day.",
  baseline: "PostgreSQL 18 / MySQL 9",
  lang: "sql",
  groups: [
    {
      title: "SELECT basics",
      rows: [
        {
          syntax: "SELECT col1, col2 FROM t",
          what: "Pick columns",
          example: "SELECT id, name FROM users;",
        },
        { syntax: "SELECT *", what: "All columns", example: "SELECT * FROM users;" },
        { syntax: "WHERE cond", what: "Filter rows", example: "WHERE age >= 18" },
        { syntax: "AS alias", what: "Rename column/table", example: "SELECT price * qty AS total" },
        {
          syntax: "ORDER BY col [ASC|DESC]",
          what: "Sort result",
          example: "ORDER BY created_at DESC",
        },
        { syntax: "LIMIT n [OFFSET m]", what: "Cap / page rows", example: "LIMIT 10 OFFSET 20" },
        {
          syntax: "DISTINCT col",
          what: "Unique values only",
          example: "SELECT DISTINCT country FROM users",
        },
        { syntax: "SELECT ... FROM t AS a", what: "Table alias", example: "FROM orders AS o" },
      ],
    },
    {
      title: "Operators and filtering",
      rows: [
        {
          syntax: "=, <>, <, >, <=, >=",
          what: "Comparisons (<> is not-equal)",
          example: "WHERE status <> 'done'",
        },
        { syntax: "AND / OR / NOT", what: "Combine conditions", example: "WHERE a > 1 AND b < 5" },
        {
          syntax: "IN (v1, v2, ...)",
          what: "Match any in a set",
          example: "WHERE id IN (1, 2, 3)",
        },
        {
          syntax: "BETWEEN a AND b",
          what: "Inclusive range",
          example: "WHERE age BETWEEN 18 AND 30",
        },
        {
          syntax: "LIKE 'a%'",
          what: "Pattern (% = any, _ = one)",
          example: "WHERE name LIKE 'A%'",
        },
        {
          syntax: "ILIKE 'a%'",
          what: "Case-insensitive LIKE (PG)",
          example: "WHERE name ILIKE 'a%'",
        },
        {
          syntax: "IS NULL / IS NOT NULL",
          what: "Null test (never = NULL)",
          example: "WHERE deleted_at IS NULL",
        },
        { syntax: "NOT IN / NOT LIKE", what: "Negated match", example: "WHERE id NOT IN (1, 2)" },
      ],
    },
    {
      title: "JOINs",
      rows: [
        {
          syntax: "INNER JOIN t2 ON ...",
          what: "Rows matching in both",
          example: "FROM a JOIN b ON a.id = b.a_id",
        },
        {
          syntax: "LEFT JOIN t2 ON ...",
          what: "All left + matches (null if none)",
          example: "FROM users u LEFT JOIN orders o ON u.id = o.user_id",
        },
        {
          syntax: "RIGHT JOIN t2 ON ...",
          what: "All right + matches",
          example: "FROM a RIGHT JOIN b ON a.id = b.a_id",
        },
        {
          syntax: "FULL [OUTER] JOIN",
          what: "All rows from both sides",
          example: "FROM a FULL JOIN b ON a.id = b.a_id",
        },
        {
          syntax: "CROSS JOIN",
          what: "Every combination",
          example: "FROM sizes CROSS JOIN colors",
        },
        {
          syntax: "self join",
          what: "Join a table to itself",
          example: "FROM emp e JOIN emp m ON e.mgr_id = m.id",
        },
        {
          syntax: "USING (col)",
          what: "Join on a same-named column",
          example: "FROM a JOIN b USING (user_id)",
        },
      ],
      combos: [
        {
          label: "LEFT JOIN to find rows with no match",
          code: `SELECT u.id, u.name
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;      -- users who never ordered`,
        },
      ],
    },
    {
      title: "GROUP BY and aggregates",
      rows: [
        {
          syntax: "COUNT(*) / COUNT(col)",
          what: "Row count / non-null count",
          example: "SELECT COUNT(*) FROM users",
        },
        {
          syntax: "COUNT(DISTINCT col)",
          what: "Distinct count",
          example: "COUNT(DISTINCT country)",
        },
        {
          syntax: "SUM(col) / AVG(col)",
          what: "Total / average",
          example: "SELECT SUM(amount) FROM orders",
        },
        {
          syntax: "MIN(col) / MAX(col)",
          what: "Smallest / largest",
          example: "SELECT MAX(price) FROM items",
        },
        { syntax: "GROUP BY col", what: "One row per group", example: "GROUP BY country" },
        {
          syntax: "HAVING cond",
          what: "Filter groups (after aggregate)",
          example: "HAVING COUNT(*) > 5",
        },
        {
          syntax: "STRING_AGG / GROUP_CONCAT",
          what: "Concat group values (PG / MySQL)",
          example: "STRING_AGG(name, ', ')",
        },
      ],
      combos: [
        {
          label: "Grouped report (count + total per group)",
          code: `SELECT country,
       COUNT(*)      AS users,
       SUM(spend)    AS total_spend
FROM customers
GROUP BY country
HAVING COUNT(*) > 10
ORDER BY total_spend DESC;`,
        },
      ],
    },
    {
      title: "Subqueries and CTEs",
      rows: [
        {
          syntax: "WHERE col IN (SELECT ...)",
          what: "Filter by a subquery",
          example: "WHERE id IN (SELECT user_id FROM orders)",
        },
        {
          syntax: "WHERE EXISTS (SELECT 1 ...)",
          what: "Row exists check",
          example: "WHERE EXISTS (SELECT 1 FROM o WHERE o.uid = u.id)",
        },
        {
          syntax: "scalar subquery",
          what: "Single value in SELECT",
          example: "SELECT name, (SELECT COUNT(*) FROM o WHERE o.uid = u.id)",
        },
        {
          syntax: "FROM (SELECT ...) AS x",
          what: "Subquery as a table",
          example: "FROM (SELECT * FROM big WHERE a > 1) AS t",
        },
        {
          syntax: "WITH cte AS (SELECT ...)",
          what: "Named subquery (readable)",
          example: "WITH top AS (SELECT ...) SELECT * FROM top",
        },
        {
          syntax: "WITH RECURSIVE",
          what: "Hierarchy / graph walk",
          example: "WITH RECURSIVE tree AS (...) SELECT * FROM tree",
        },
      ],
      combos: [
        {
          label: "CTE for a multi-step query",
          code: `WITH monthly AS (
    SELECT user_id, SUM(amount) AS spend
    FROM orders
    GROUP BY user_id
)
SELECT u.name, m.spend
FROM monthly m
JOIN users u ON u.id = m.user_id
WHERE m.spend > 1000;`,
        },
      ],
    },
    {
      title: "Window functions",
      rows: [
        {
          syntax: "ROW_NUMBER() OVER (...)",
          what: "Unique row rank (1, 2, 3)",
          example: "ROW_NUMBER() OVER (ORDER BY score DESC)",
        },
        {
          syntax: "RANK() / DENSE_RANK()",
          what: "Rank with / without gaps",
          example: "RANK() OVER (ORDER BY score DESC)",
        },
        {
          syntax: "OVER (PARTITION BY col)",
          what: "Restart per group",
          example: "OVER (PARTITION BY dept ORDER BY pay DESC)",
        },
        {
          syntax: "LAG(col) / LEAD(col)",
          what: "Previous / next row's value",
          example: "LAG(amount) OVER (ORDER BY day)",
        },
        {
          syntax: "SUM(col) OVER (...)",
          what: "Running / windowed total",
          example: "SUM(amt) OVER (ORDER BY day)",
        },
        {
          syntax: "NTILE(n) OVER (...)",
          what: "Split into n buckets",
          example: "NTILE(4) OVER (ORDER BY score)",
        },
        {
          syntax: "FIRST_VALUE / LAST_VALUE",
          what: "Edge value of the window",
          example: "FIRST_VALUE(name) OVER (...)",
        },
      ],
      combos: [
        {
          label: "Top row per group (keep the full row)",
          code: `SELECT * FROM (
    SELECT e.*,
           ROW_NUMBER() OVER (
               PARTITION BY dept_id
               ORDER BY salary DESC) AS rn
    FROM employees e
) t
WHERE rn = 1;        -- highest-paid per department`,
        },
      ],
    },
    {
      title: "INSERT, UPDATE, DELETE, UPSERT",
      rows: [
        {
          syntax: "INSERT INTO t (cols) VALUES (...)",
          what: "Add a row",
          example: "INSERT INTO users (name) VALUES ('Ava')",
        },
        {
          syntax: "INSERT ... VALUES (...), (...)",
          what: "Add many rows",
          example: "VALUES ('A'), ('B'), ('C')",
        },
        {
          syntax: "INSERT INTO t SELECT ...",
          what: "Insert from a query",
          example: "INSERT INTO log SELECT * FROM staging",
        },
        {
          syntax: "UPDATE t SET col = v WHERE ...",
          what: "Change rows",
          example: "UPDATE users SET active = false WHERE id = 7",
        },
        {
          syntax: "DELETE FROM t WHERE ...",
          what: "Remove rows",
          example: "DELETE FROM users WHERE id = 7",
        },
        {
          syntax: "RETURNING col (PG)",
          what: "Get back affected rows",
          example: "INSERT ... RETURNING id",
        },
        {
          syntax: "ON CONFLICT DO UPDATE (PG)",
          what: "Upsert in PostgreSQL",
          example: "ON CONFLICT (id) DO UPDATE SET n = EXCLUDED.n",
        },
        {
          syntax: "ON DUPLICATE KEY UPDATE (MySQL)",
          what: "Upsert in MySQL",
          example: "ON DUPLICATE KEY UPDATE n = VALUES(n)",
        },
      ],
      combos: [
        {
          label: "Upsert (insert or update if key exists)",
          code: `-- PostgreSQL
INSERT INTO stock (sku, qty) VALUES ('A1', 5)
ON CONFLICT (sku)
DO UPDATE SET qty = stock.qty + EXCLUDED.qty;

-- MySQL
INSERT INTO stock (sku, qty) VALUES ('A1', 5)
ON DUPLICATE KEY UPDATE qty = qty + VALUES(qty);`,
        },
      ],
    },
    {
      title: "DDL: tables and constraints",
      rows: [
        {
          syntax: "CREATE TABLE t (...)",
          what: "Define a table",
          example: "CREATE TABLE users (id INT, name TEXT)",
        },
        { syntax: "PRIMARY KEY", what: "Unique row identifier", example: "id INT PRIMARY KEY" },
        {
          syntax: "SERIAL / AUTO_INCREMENT",
          what: "Auto id (PG / MySQL)",
          example: "id SERIAL PRIMARY KEY",
        },
        {
          syntax: "NOT NULL / UNIQUE / DEFAULT",
          what: "Column constraints",
          example: "email TEXT NOT NULL UNIQUE",
        },
        {
          syntax: "FOREIGN KEY ... REFERENCES",
          what: "Link to another table",
          example: "FOREIGN KEY (uid) REFERENCES users(id)",
        },
        { syntax: "CHECK (cond)", what: "Value rule", example: "age INT CHECK (age >= 0)" },
        {
          syntax: "ALTER TABLE t ADD COLUMN",
          what: "Add a column",
          example: "ALTER TABLE users ADD COLUMN phone TEXT",
        },
        {
          syntax: "ALTER TABLE t DROP / RENAME",
          what: "Drop / rename column",
          example: "ALTER TABLE users DROP COLUMN phone",
        },
        {
          syntax: "DROP TABLE t / TRUNCATE t",
          what: "Remove table / empty it",
          example: "TRUNCATE orders",
        },
      ],
    },
    {
      title: "Indexes and transactions",
      rows: [
        {
          syntax: "CREATE INDEX ix ON t (col)",
          what: "Speed up lookups",
          example: "CREATE INDEX ix_email ON users (email)",
        },
        {
          syntax: "CREATE UNIQUE INDEX",
          what: "Enforce uniqueness",
          example: "CREATE UNIQUE INDEX ON users (email)",
        },
        {
          syntax: "CREATE INDEX ... (a, b)",
          what: "Composite index",
          example: "CREATE INDEX ON orders (user_id, created_at)",
        },
        { syntax: "DROP INDEX ix", what: "Remove an index", example: "DROP INDEX ix_email" },
        {
          syntax: "EXPLAIN [ANALYZE] query",
          what: "See the query plan",
          example: "EXPLAIN ANALYZE SELECT ...",
        },
        { syntax: "BEGIN", what: "Start a transaction", example: "BEGIN;" },
        { syntax: "COMMIT / ROLLBACK", what: "Save / undo changes", example: "COMMIT;" },
        {
          syntax: "SAVEPOINT / ROLLBACK TO",
          what: "Partial rollback point",
          example: "SAVEPOINT sp1;",
        },
      ],
    },
    {
      title: "Handy functions",
      rows: [
        {
          syntax: "COALESCE(a, b, ...)",
          what: "First non-null value",
          example: "COALESCE(nickname, name, 'guest')",
        },
        { syntax: "NULLIF(a, b)", what: "NULL if a = b", example: "NULLIF(divisor, 0)" },
        {
          syntax: "CASE WHEN ... THEN ... END",
          what: "Inline if/else",
          example: "CASE WHEN n > 0 THEN 'pos' ELSE 'neg' END",
        },
        {
          syntax: "CAST(x AS type) / x::type",
          what: "Convert type (:: is PG)",
          example: "CAST('42' AS INT)",
        },
        {
          syntax: "CONCAT(a, b) / a || b",
          what: "Join strings (|| is standard/PG)",
          example: "CONCAT(first, ' ', last)",
        },
        { syntax: "UPPER / LOWER / LENGTH / TRIM", what: "String helpers", example: "UPPER(name)" },
        {
          syntax: "SUBSTRING / REPLACE",
          what: "Slice / replace text",
          example: "SUBSTRING(name, 1, 3)",
        },
        {
          syntax: "NOW() / CURRENT_DATE",
          what: "Current timestamp / date",
          example: "WHERE created_at > NOW() - INTERVAL '7 days'",
        },
        {
          syntax: "EXTRACT(part FROM ts)",
          what: "Pull year/month/day",
          example: "EXTRACT(YEAR FROM created_at)",
        },
        {
          syntax: "ROUND / CEIL / FLOOR / ABS",
          what: "Numeric helpers",
          example: "ROUND(price, 2)",
        },
      ],
    },
  ],
};
