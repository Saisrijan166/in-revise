
one shot db topics important small easy completes fast 

explaining the topics
🗄️ DB / Database — One-Shot Interview Guide
You don't need to memorize hundreds of things. For a Software Engineer / Java Backend interview, understand these core topics and you can handle most DB questions.

Think of a database as:

Store data → find data → modify data → keep it correct → make it fast → allow many users safely.

1. What is a Database?
A database is an organized place to store and manage data.

Example:

User
id | name   | email
1  | Srijan | s@gmail.com
2  | Rahul  | r@gmail.com
DBMS
DBMS = Database Management System

Software that manages databases.

Examples:

PostgreSQL
MySQL
Oracle
MongoDB
2. SQL vs NoSQL
The biggest first distinction:

SQL
Data is usually stored in tables.

Users
----------------
id | name | age
1  | Srijan | 24
2  | Rahul  | 25
Examples:

PostgreSQL
MySQL
Oracle
SQL Server
Good when:

Data has clear relationships
Transactions are important
You need complex queries
NoSQL
Data doesn't necessarily use traditional tables.

Examples:

MongoDB → documents
Redis → key-value
Cassandra → wide-column
Neo4j → graph
Good when:

Flexible schema
Huge scale
Very fast/simple access patterns
Distributed systems
Easy memory
SQL = structured tables + relationships
NoSQL = flexible data models + scalability

3. Table, Row, Column
Very basic but important.

Users
+----+--------+-----+
| id | name   | age |
+----+--------+-----+
| 1  | Srijan | 24  |
| 2  | Rahul  | 25  |
+----+--------+-----+
Table → collection of related data
Row → one record
Column → one property/attribute
4. Primary Key ⭐
A Primary Key uniquely identifies each row.

id PRIMARY KEY

Example:

id | name
---+------
1  | Srijan
2  | Rahul
Properties:

Unique
Cannot be NULL
Identifies a record
Interview answer
A primary key uniquely identifies each record in a table.

5. Foreign Key ⭐
A Foreign Key connects two tables.

Users
id | name
1  | Srijan

Orders
id | user_id
10 | 1
Orders.user_id refers to Users.id.

So:

Users
  ↓
Orders
Easy memory
Primary Key = who am I?
Foreign Key = which other record am I connected to?

6. Relationships
Three common relationships:

One-to-One
Person → Passport
One person has one passport.

One-to-Many ⭐
User → Orders
One user can have many orders.

Many-to-Many
Students ↔ Courses
A student can take many courses.

A course can have many students.

Usually implemented using a junction/mapping table:

StudentCourse
student_id | course_id
7. SQL Commands
Remember:

CRUD
Create
INSERT INTO users(name)
VALUES ('Srijan');

Read
SELECT * FROM users;

Update
UPDATE users
SET name = 'Rahul'
WHERE id = 1;

Delete
DELETE FROM users
WHERE id = 1;

8. WHERE
Filters records.

SELECT *
FROM users
WHERE age > 20;

Only users whose age > 20.

9. ORDER BY
Sorts results.

SELECT *
FROM users
ORDER BY age DESC;

ASC → ascending
DESC → descending

10. GROUP BY
Groups records.

Example:

Orders
user_id | amount
1       | 100
1       | 200
2       | 300
SELECT user_id, SUM(amount)
FROM orders
GROUP BY user_id;

Result:

user 1 → 300
user 2 → 300
Think:

GROUP BY = make groups and calculate something for each group.

11. Aggregate Functions
Very common:

COUNT()
SUM()
AVG()
MIN()
MAX()
Example:

SELECT COUNT(*) FROM users;

Number of users.

12. HAVING
WHERE filters rows.

HAVING filters groups.

SELECT user_id, SUM(amount)
FROM orders
GROUP BY user_id
HAVING SUM(amount) > 1000;

Easy memory
WHERE → before grouping
HAVING → after grouping

13. JOIN ⭐⭐⭐
Extremely important for interviews.

Used to combine data from multiple tables.

Users
id | name

Orders
id | user_id
INNER JOIN
Only matching records.

SELECT *
FROM users u
INNER JOIN orders o
ON u.id = o.user_id;

Users ∩ Orders
LEFT JOIN
Everything from the left table + matching right records.

SELECT *
FROM users u
LEFT JOIN orders o
ON u.id = o.user_id;

Even users without orders appear.

Easy memory
INNER → matching only
LEFT  → everything on left
RIGHT → everything on right
FULL  → everything from both
14. Normalization ⭐
Normalization means organizing data to reduce duplication and inconsistency.

Bad:

Order
order_id | user_name | user_email | product
User information gets repeated for every order.

Better:

Users
id | name | email

Orders
id | user_id | product
Main normal forms
For interviews, remember:

1NF → atomic values
2NF → remove partial dependency
3NF → remove transitive dependency
Most practical explanation:

Normalization reduces duplicate data and improves data consistency.

15. Denormalization
Opposite idea.

We intentionally duplicate some data to make reads faster.

Example:

Instead of joining:

Orders → Users
we might store:

order_id
user_id
user_name
Useful when:

Read performance matters
Joins are expensive
Large-scale systems
Memory
Normalize → consistency
Denormalize → performance

16. Index ⭐⭐⭐
One of the most important DB concepts.

An index makes searching faster.

Without index:

Database
↓
check row 1
check row 2
check row 3
...
With index:

Index
 ↓
quickly find matching rows
Example:

CREATE INDEX idx_email
ON users(email);

Now:

SELECT *
FROM users
WHERE email = 'x@gmail.com';

can be much faster.

But indexes aren't free.
They:

consume storage
slow down INSERT/UPDATE/DELETE somewhat
need maintenance
Easy memory
Index = book's index

Instead of reading the entire book, you quickly find the page.

17. Clustered vs Non-Clustered Index
Basic understanding is enough.

Clustered
Data itself is organized according to the index.

Usually one clustered ordering per table.

Non-clustered
Separate index structure points toward the actual rows.

Interview shortcut
Clustered index determines/organizes the physical row order conceptually; non-clustered index is a separate lookup structure pointing to rows.

Exact implementation varies by database.

18. Transactions ⭐⭐⭐
A transaction is a group of operations treated as one logical unit.

Example bank transfer:

A - ₹100
B + ₹100
Both should happen.

Not:

A - ₹100
B ❌
19. ACID ⭐⭐⭐
Transactions follow four important properties.

A — Atomicity
All or nothing.

Transfer:
A -100
B +100
Either both happen or neither happens.

C — Consistency
Database remains valid according to its rules.

I — Isolation
Concurrent transactions shouldn't improperly interfere with each other.

D — Durability
Once committed, data survives failures.

Memory
All
Correct
Independent
Done forever

20. Transaction Isolation Levels ⭐⭐
Controls how much one transaction can see from another.

From weaker → stronger:

Read Uncommitted
Read Committed
Repeatable Read
Serializable
Important problems
Dirty Read
Reading uncommitted data.

T1 changes data
T2 reads it
T1 rolls back
T2 read something that never officially existed.

Non-repeatable Read
Same row gives different values during one transaction.

Phantom Read
A query returns a different set of rows because another transaction inserted/deleted matching rows.

21. Locking
Used when multiple transactions access the same data.

Shared Lock
Used for reading.

Multiple transactions can generally read.

Exclusive Lock
Used for writing.

Other conflicting operations may have to wait.

Simple:

READ  → shared
WRITE → exclusive
22. Deadlock ⭐⭐
Two transactions wait for each other forever.

Transaction A
locks X
waits for Y

Transaction B
locks Y
waits for X
A → waiting for B
B → waiting for A
That's a deadlock.

Databases detect/resolve these in various ways, often by aborting one transaction.

23. Query Execution
When you execute:

SELECT *
FROM users
WHERE email = 'a@gmail.com';

Database roughly:

SQL
 ↓
Parser
 ↓
Query Optimizer
 ↓
Execution Plan
 ↓
Storage
 ↓
Result
The optimizer decides how to execute the query efficiently.

24. EXPLAIN ⭐⭐
Used to understand how the database executes a query.

Example:

EXPLAIN SELECT *
FROM users
WHERE email = 'a@gmail.com';

It helps identify:

table scans
index usage
joins
estimated cost
query bottlenecks
For PostgreSQL, EXPLAIN ANALYZE can execute the query and provide actual execution information.

25. Full Table Scan
Database checks many/all rows.

Row 1 ❌
Row 2 ❌
Row 3 ❌
...
Row 1,000,000 ✅
Can be slow for large tables.

An appropriate index can avoid unnecessary scanning.

26. Constraints ⭐⭐
Rules that protect data.

Common:

PRIMARY KEY
FOREIGN KEY
UNIQUE
NOT NULL
CHECK
DEFAULT
Example:

email VARCHAR(255) UNIQUE NOT NULL

Means:

email cannot be NULL
duplicate email isn't allowed
27. NULL
NULL means unknown/missing value.

It is not:

0
and not:

''
Use:

WHERE name IS NULL

Not:

WHERE name = NULL

28. Views
A view is like a saved query that behaves like a virtual table.

CREATE VIEW user_orders AS
SELECT ...

Useful for:

simplifying complex queries
abstraction
controlled access
29. Stored Procedure
Database-side program containing SQL logic.

Useful for:

reusable DB operations
complex DB-side logic
But many modern applications keep most business logic in the application layer.

30. Trigger
Automatically executes when something happens.

Example:

INSERT user
    ↓
Trigger
    ↓
write audit record
Common use:

auditing
automatic updates
enforcing certain DB-side behavior
Use carefully because hidden automatic logic can make systems harder to understand.

31. OLTP vs OLAP
OLTP
Online Transaction Processing

Normal application operations:

Login
Create order
Update profile
Payment
Characteristics:

many small transactions
frequent reads/writes
consistency important
OLAP
Online Analytical Processing

Analytics:

Revenue this year
Sales by region
Monthly trends
Characteristics:

large queries
aggregations
reporting/analytics
Memory
OLTP = application transactions
OLAP = analytics

32. Replication ⭐⭐
Copying data from one database server to another.

Primary
  ↓
Replica
  ↓
Replica
Why?

scalability
high availability
backup/recovery support
read scaling
Common pattern:

WRITE → Primary
READ  → Replicas
Potential issue:

Replication lag — replica may temporarily be behind the primary.

33. Sharding ⭐⭐
Splitting data across multiple database servers.

Example:

Server 1 → Users 1–1M
Server 2 → Users 1M–2M
Server 3 → Users 2M–3M
Used when one database cannot handle the required scale.

Memory
Replication = copy data
Sharding = split data

34. Partitioning
Splitting a large table into smaller pieces while still presenting it as one logical table.

Example:

Orders
 ├── 2024
 ├── 2025
 └── 2026
Often partition by:

date
range
hash
list
Useful for very large tables.

35. CAP Theorem ⭐⭐⭐
Important for distributed databases.

CAP:

C = Consistency
A = Availability
P = Partition Tolerance
In the presence of a network partition, a distributed system has to trade off between consistency and availability.

Partition
Network communication between nodes breaks.

Server A   X   Server B
You can't reliably guarantee both perfect consistency and availability during that partition.

Interview answer
CAP says that when a network partition occurs, a distributed system must choose between consistency and availability.

36. SQL Injection ⭐⭐⭐
Security issue.

Bad:

"SELECT * FROM users WHERE name='" + name + "'"

Attacker can manipulate the SQL.

Use:

Prepared Statements
Parameterized Queries
Example concept:

SELECT *
FROM users
WHERE name = ?

Never directly concatenate untrusted input into SQL.

37. Connection Pool ⭐⭐⭐
Opening a DB connection is expensive.

Instead of:

Request
 ↓
Create connection
 ↓
Query
 ↓
Close connection
every time:

Connection Pool
 ├── Connection
 ├── Connection
 ├── Connection
 └── Connection
Application reuses connections.

In Spring Boot, HikariCP is commonly used as the JDBC connection pool.

38. Database in a Backend Application
This is the practical flow you should remember:

Client
  ↓
Controller
  ↓
Service
  ↓
Repository / DAO
  ↓
Database
Example:

GET /users/10
      ↓
UserController
      ↓
UserService
      ↓
UserRepository
      ↓
PostgreSQL
      ↓
User
39. ORM
ORM = Object Relational Mapping

Maps:

Java Object ↔ Database Table
Example:

class User {
    Long id;
    String name;
}

maps conceptually to:

users
----------------
id | name
For Java:

JPA → specification
Hibernate → popular JPA implementation
40. JPA / Hibernate
Instead of manually writing every SQL query:

userRepository.findById(id);

ORM can generate/execute appropriate SQL.

But you still need SQL knowledge because:

complex queries happen
performance matters
joins/indexes matter
ORM can generate inefficient queries
41. N+1 Query Problem ⭐⭐⭐
Very common backend interview question.

Suppose:

1 query → get 100 users
100 queries → get orders for each user
Total:

101 queries
That's the N+1 problem.

Can often be improved using:

joins
fetch strategies
batch fetching
carefully designed queries
42. Pagination ⭐⭐⭐
Don't return 1 million rows at once.

Instead:

Page 1 → 20 records
Page 2 → 20 records
Page 3 → 20 records
Common approaches:

OFFSET pagination
LIMIT 20 OFFSET 40;

Simple, but can become inefficient for very large offsets.

Cursor/Keyset pagination
Use a stable ordering/key:

id > last_seen_id
Generally better for large datasets and continuously changing data.

43. Database Performance — What Do You Check?
If query is slow:

1. Check query
2. EXPLAIN / execution plan
3. Check indexes
4. Check joins
5. Check number of rows
6. Check unnecessary columns
7. Check locks
8. Check connection pool
9. Check database resources
Don't blindly add indexes.

44. Database vs Cache
Database:

Permanent/source-of-truth storage
Cache:

Fast temporary/reusable data
Example:

Request
 ↓
Redis
 ↓ cache hit
Return quickly

cache miss
 ↓
Database
 ↓
Store in Redis
 ↓
Return
45. Redis
Redis is primarily an in-memory data store.

Common uses:

caching
sessions
rate limiting
counters
distributed locks
queues/pub-sub in some architectures
Think:

Database = durable source of truth
Redis = very fast supporting layer

46. Database Backup & Recovery
Two basic concepts:

Backup
Copy of data.

Recovery
Restoring database after failure.

Important concepts:

Backup
Restore
Point-in-time recovery
Replication
Disaster recovery
47. Most Important DB Interview Questions
If you have very little time, prepare these first:

🔥 Tier 1 — Must Know
1. SQL vs NoSQL
2. Primary Key
3. Foreign Key
4. Joins
5. Indexes
6. Transactions
7. ACID
8. Normalization
9. SQL CRUD
10. GROUP BY / HAVING
11. Constraints
12. NULL
🔥 Tier 2 — Backend Interviews
13. Isolation levels
14. Deadlocks
15. Query optimization
16. EXPLAIN
17. Connection pooling
18. ORM / JPA / Hibernate
19. N+1 problem
20. Pagination
21. Replication
22. Sharding
23. Partitioning
24. Redis/cache
25. SQL Injection
🔥 Tier 3 — System Design
26. CAP theorem
27. Read replicas
28. Database scaling
29. Consistency
30. High availability
31. Backup/recovery
32. Distributed transactions
🧠 Final 1-Minute Memory Map
Remember this flow:

                    DATABASE
                       │
        ┌──────────────┴──────────────┐
        ↓                             ↓
       SQL                           NoSQL
        │                             │
     Tables                    Documents / KV / etc.
        │
   ┌────┴────┐
   ↓         ↓
Keys       Relations
   │         │
PK/FK      JOIN
   │
Constraints
   │
Transactions
   │
  ACID
   │
Indexes
   │
Performance
   │
EXPLAIN
   │
Scaling
 ┌─┴───────────────┐
 ↓                 ↓
Replication       Sharding
 ↓                 ↓
Copy data         Split data
And the backend DB flow:

Client
 ↓
API
 ↓
Service
 ↓
Repository / ORM
 ↓
Connection Pool
 ↓
Database
 ↓
Query
 ↓
Index / Execution Plan
 ↓
Rows
If the interviewer asks "How do you make a database-backed application fast?"
Say:

Use proper indexes, optimize queries and joins, avoid N+1 queries, use pagination, connection pooling and caching, and when scale increases use read replicas, partitioning or sharding where appropriate.

That's a very strong short interview answer.




DB / SQL / PostgreSQL / MySQL — Interview Cheat Sheet
A complete, easy-to-revise guide for software engineering interviews, from beginner concepts to commonly asked intermediate questions. Focus on definitions, examples, rules, defaults, and confusing concepts.

The examples use standard SQL where possible, with PostgreSQL and MySQL differences called out separately.
1. Database fundamentals
What is a database?
A database is an organized collection of data that can be stored, retrieved, updated, and managed efficiently.
Term	Simple meaning
Database	Collection of related data
DBMS	Software used to manage databases
RDBMS	DBMS that organizes data into related tables
SQL	Language used to work with relational databases
Table	Data organized into rows and columns
Row / Record	One complete entry
Column / Field	One attribute of an entry
Schema	Structure or logical organization of database objects
Query	A request to retrieve or modify data
Constraint	Rule that data must follow
Index	Structure that helps find data faster
Examples of relational databases: PostgreSQL, MySQL, Oracle Database, SQL Server.

DBMS vs RDBMS: An RDBMS supports relational tables and relationships, usually with keys and integrity constraints. DBMS is the broader term.
What is a primary key?
A column, or combination of columns, that uniquely identifies each row.
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);


Rules:
- Must be unique.
- Cannot be NULL.
- A table has only one primary key constraint, but it can contain multiple columns (a composite primary key).
What is a foreign key?
A column, or combination of columns, that references a key in another table (or the same table).
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


It helps maintain referential integrity: an order cannot reference a nonexistent user when the constraint is enforced. A nullable foreign key can be NULL unless prohibited separately.
Primary key vs unique key
Primary key	UNIQUE constraint
Identifies each row	Prevents duplicate key values
Cannot contain NULL	NULL handling depends on the database
One primary key constraint per table	Multiple UNIQUE constraints allowed
Often referenced by foreign keys	Can also be referenced if it meets database requirements
PostgreSQL vs MySQL: Both generally allow multiple NULL values in a UNIQUE constraint, but exact behavior depends on the key definition and database features. PostgreSQL also supports NULLS NOT DISTINCT for unique constraints.
Types of keys
- Candidate key: A minimal set of columns that uniquely identifies a row.
- Primary key: The chosen candidate key.
- Alternate key: A candidate key not chosen as the primary key.
- Composite key: A key made of multiple columns.
- Foreign key: Enforces a reference to another key.
- Surrogate key: Artificial identifier, such as an auto-generated ID.
- Natural key: Real-world data used as an identifier, such as a unique national product code.
Common trap: A foreign key does not have to be unique. Many orders can reference the same user.
2. SQL command categories
SQL commands are commonly grouped into five categories.
Category	Purpose	Commands
DDL	Define database structures	CREATE, ALTER, DROP, TRUNCATE
DML	Modify data	INSERT, UPDATE, DELETE
DQL	Retrieve data	SELECT
DCL	Manage privileges	GRANT, REVOKE
TCL	Manage transactions	COMMIT, ROLLBACK, SAVEPOINT
These categories are a common teaching convention; exact classification can vary.
CREATE, ALTER, DROP, TRUNCATE, DELETE
Command	What it does	WHERE supported?
CREATE	Creates an object	No
ALTER	Changes an object's structure	Not like a row filter
DROP	Removes an object	No
TRUNCATE	Removes all rows from a table	No
DELETE	Removes selected rows	Yes
Examples:
-- Remove selected rows
DELETE FROM users WHERE id = 10;

-- Remove all rows
DELETE FROM users;

-- Remove all rows using table truncation
TRUNCATE TABLE users;

-- Remove the table itself
DROP TABLE users;


Important differences:
- DELETE can remove specific rows.
- TRUNCATE removes all rows, generally with less row-by-row overhead.
- DROP removes the table structure as well as its data.
- Rollback behavior and identity-counter behavior differ by database and transaction context. PostgreSQL supports transactional TRUNCATE; MySQL's TRUNCATE TABLE causes an implicit commit.
- TRUNCATE is not universally faster in every scenario, but it is often more efficient for clearing a whole table.
INSERT, UPDATE, DELETE
INSERT INTO users (id, name)
VALUES (1, 'Asha');

UPDATE users
SET name = 'Riya'
WHERE id = 1;

DELETE FROM users
WHERE id = 1;


Interview trap: Without a WHERE clause, UPDATE changes every row, and DELETE deletes every row.
3. SQL data types
Type	Used for	Example
INT / INTEGER	Whole numbers	25
BIGINT	Large whole numbers	Large IDs
DECIMAL(p,s) / NUMERIC	Exact decimal values	Money
FLOAT / REAL / DOUBLE	Approximate numbers	Scientific calculations
CHAR(n)	Fixed-length text	Country code
VARCHAR(n)	Variable-length text with limit	Name
TEXT	Longer text	Description
DATE	Calendar date	2026-10-20
TIME	Time of day	14:30:00
TIMESTAMP	Date and time	Creation time
Boolean type	True/false-like values	TRUE
JSON / JSONB	Structured JSON data	API payload
Important rules
- Use DECIMAL/NUMERIC for money when exact decimal arithmetic is needed; floating-point values can introduce rounding errors.
- VARCHAR(100) allows up to 100 characters in typical SQL implementations, subject to character and database-specific rules.
- CHAR(n) is fixed-width and may be padded.
- PostgreSQL has native BOOLEAN; MySQL's BOOLEAN is an alias for TINYINT(1).
- PostgreSQL offers both JSON and JSONB; JSONB stores a decomposed representation and supports efficient indexing.
- MySQL supports JSON as a native type, with its own storage and indexing behavior.
- PostgreSQL TIMESTAMP WITH TIME ZONE (timestamptz) normalizes instants and displays them according to the session time zone; it does not preserve the originally supplied time-zone name.
- MySQL TIMESTAMP and DATETIME differ in time-zone conversion behavior.
4. SELECT query — most important topic
Assume these tables:

users(id, name, age, city)
orders(id, user_id, amount, status, created_at)
Basic SELECT
SELECT name, age
FROM users;


Retrieve all columns:
SELECT *
FROM users;


SELECT * is convenient for learning and debugging, but explicitly listing required columns is usually better in production.
WHERE — filter rows
SELECT *
FROM users
WHERE age >= 25;


Operators:
- = equal
- <> or != not equal (both widely supported)
- > greater than
- < less than
- >=, <=
- AND, OR, NOT
SELECT *
FROM users
WHERE age >= 25 AND city = 'Delhi';


Use parentheses when mixing AND and OR to make the intended logic clear.
BETWEEN, IN, LIKE
-- BETWEEN is inclusive at both ends
SELECT * FROM users WHERE age BETWEEN 20 AND 30;

SELECT * FROM users WHERE city IN ('Delhi', 'Mumbai');

-- Starts with A
SELECT * FROM users WHERE name LIKE 'A%';

-- Contains "an"
SELECT * FROM users WHERE name LIKE '%an%';

-- Exactly one character before "a"
SELECT * FROM users WHERE name LIKE '_a%';


- % means zero or more characters.
- _ means exactly one character.
- Case sensitivity of LIKE depends on database, collation, and expression. PostgreSQL provides ILIKE for case-insensitive pattern matching.
DISTINCT — remove duplicate results
SELECT DISTINCT city
FROM users;


DISTINCT applies to the complete selected row combination, not separately to each selected column.
ORDER BY — sorting
SELECT *
FROM users
ORDER BY age DESC, name ASC;


- ASC: ascending; commonly the default.
- DESC: descending.
- Rows tied on every specified sort key have no guaranteed relative order. Add a unique tie-breaker for stable pagination.
LIMIT and OFFSET
SELECT *
FROM users
ORDER BY id
LIMIT 10 OFFSET 20;


Returns up to 10 rows, skipping the first 20 ordered rows.
- PostgreSQL and MySQL support LIMIT.
- Standard SQL also has OFFSET ... FETCH syntax.
- Large offsets can be inefficient; keyset pagination is often better.
Logical order of SQL query processing
Remember this simplified logical order:
1. FROM / JOIN

2. WHERE

3. GROUP BY

4. HAVING

5. SELECT

6. DISTINCT

7. ORDER BY

8. LIMIT / OFFSET


This is the logical model, not a promise about the physical execution order chosen by the query optimizer.

Common interview question: Why generally can't a SELECT alias be used in WHERE?

Because WHERE is logically evaluated before SELECT, where that alias is defined. Some databases have special exceptions or other syntax, but don't rely on them.
5. Aggregate functions and GROUP BY
Aggregate functions calculate a result from multiple rows.
Function	Meaning
COUNT(*)	Counts rows
COUNT(column)	Counts non-NULL values
SUM(column)	Adds values
AVG(column)	Calculates average of non-NULL values
MIN(column)	Smallest value
MAX(column)	Largest value
SELECT COUNT(*) FROM users;

SELECT AVG(amount), MAX(amount)
FROM orders;


GROUP BY
Groups rows that have the same value so aggregate functions can calculate results per group.
SELECT city, COUNT(*) AS total_users
FROM users
GROUP BY city;


Result: one row per city, with its user count.

Rule: In a grouped query, a selected column generally must be grouped, aggregated, or otherwise allowed by the database's grouping rules.
HAVING vs WHERE
SELECT city, COUNT(*) AS total
FROM users
WHERE age >= 18
GROUP BY city
HAVING COUNT(*) >= 5;


- WHERE: filters individual rows before grouping.
- HAVING: filters groups after grouping.
Think: WHERE = rows; HAVING = groups.

Can WHERE use COUNT(*)? Not directly as a group aggregate filter. Use HAVING or a subquery.
COUNT(*) vs COUNT(column) vs COUNT(DISTINCT column)
Suppose a column has values 10, 10, NULL.
Expression	Result
COUNT(*)	3
COUNT(column)	2
COUNT(DISTINCT column)	1
COUNT(*) counts rows, even when some columns are NULL.
6. SQL joins — extremely important
A JOIN combines data from tables using a condition.









INNER JOIN

Returns only rows that match on both sides.
SELECT u.name, o.amount
FROM users u
INNER JOIN orders o
  ON u.id = o.user_id;














LEFT JOIN

Returns every row from the left table, plus matching rows from the right. Unmatched right-side columns become NULL.
SELECT u.name, o.id
FROM users u
LEFT JOIN orders o
  ON u.id = o.user_id;














RIGHT JOIN

Returns every row from the right table, including unmatched rows.
SELECT u.name, o.id
FROM users u
RIGHT JOIN orders o
  ON u.id = o.user_id;














FULL OUTER JOIN

Returns all matched and unmatched rows from both tables.

PostgreSQL supports it directly. MySQL does not directly support FULL OUTER JOIN; it can be emulated with LEFT JOIN, RIGHT JOIN, and careful UNION logic.



Other joins
- CROSS JOIN: Every left row is paired with every right row. 3 × 4 rows produces 12 rows.
- SELF JOIN: A table is joined to itself, for example employees and their managers.
- EQUI JOIN: Join condition uses equality.
- NON-EQUI JOIN: Join condition uses ranges or other non-equality comparisons.
ON vs WHERE in joins
This is a common interview trap.
-- Keeps all users, even if they have no paid orders
SELECT u.id, o.id
FROM users u
LEFT JOIN orders o
  ON u.id = o.user_id
 AND o.status = 'PAID';


Compare:
SELECT u.id, o.id
FROM users u
LEFT JOIN orders o
  ON u.id = o.user_id
WHERE o.status = 'PAID';


The second query filters out unmatched users because their o.status is NULL, so the condition is not true. It behaves like an inner join for this condition.

Remember: A condition in ON controls matching; a condition in WHERE filters the resulting rows.
Find users who have no orders
SELECT u.*
FROM users u
LEFT JOIN orders o
  ON u.id = o.user_id
WHERE o.id IS NULL;


Assumes o.id is a non-NULL primary key.

Alternative using NOT EXISTS:
SELECT u.*
FROM users u
WHERE NOT EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.user_id = u.id
);


NOT EXISTS is often a clear choice for anti-join queries.
7. Subqueries
A subquery is a query nested inside another query.
Scalar subquery
Returns one value.
SELECT name
FROM users
WHERE age > (SELECT AVG(age) FROM users);


Multi-row subquery with IN
SELECT *
FROM users
WHERE id IN (
    SELECT user_id
    FROM orders
);


EXISTS
Checks whether the subquery returns at least one row.
SELECT *
FROM users u
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.user_id = u.id
);


SELECT 1 here is a convention: the existence of a row matters, not the selected value.
Correlated vs non-correlated subquery
- Non-correlated: Can be evaluated independently of the outer query.
- Correlated: Refers to values from the outer query.
A correlated subquery may be evaluated repeatedly or transformed by the optimizer. Don't assume its exact execution strategy without inspecting the query plan.
IN vs EXISTS
Both can express membership/existence checks.
- IN compares against a set of values.
- EXISTS checks whether matching rows exist.
- The optimizer may produce similar execution plans for either.
- NOT IN is dangerous when the subquery can return NULL; NOT EXISTS is often safer.
8. NULL — a very common interview topic
NULL means missing, unknown, or unavailable data. It is not the same as zero or an empty string.

Incorrect:
SELECT * FROM users WHERE city = NULL;


Correct:
SELECT * FROM users WHERE city IS NULL;

SELECT * FROM users WHERE city IS NOT NULL;


Three-valued logic
SQL conditions can evaluate to:
- TRUE
- FALSE
- UNKNOWN
Comparisons with NULL generally produce UNKNOWN. A WHERE clause retains only rows for which the condition is TRUE.

Examples:
NULL = NULL       -- UNKNOWN
NULL <> 5         -- UNKNOWN
NULL IS NULL      -- TRUE


COALESCE and NULLIF
SELECT COALESCE(city, 'Unknown')
FROM users;


COALESCE returns the first non-NULL argument.
SELECT NULLIF(10, 10); -- NULL
SELECT NULLIF(10, 5);  -- 10


NULLIF(a, b) returns NULL when the two values compare equal; otherwise, it returns a.
Important NULL traps
- COUNT(column) ignores NULL.
- Most aggregates ignore NULL inputs; COUNT(*) is the important exception.
- SUM() and AVG() return NULL if there are no non-NULL input values.
- NOT IN (subquery) can return UNKNOWN if the set contains NULL.
- Use IS NULL, not = NULL.
- PostgreSQL and MySQL differ in some NULL-sensitive behaviors, including unique constraints and sorting defaults.
9. Constraints
Constraints protect the correctness of stored data.
Constraint	Purpose
PRIMARY KEY	Unique, non-NULL row identifier
FOREIGN KEY	Enforces valid references
UNIQUE	Prevents duplicate key combinations
NOT NULL	Requires a value
CHECK	Requires a condition to hold
DEFAULT	Supplies a value when omitted
Example:
CREATE TABLE employees (
    id INT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    salary DECIMAL(10,2) CHECK (salary >= 0),
    active BOOLEAN NOT NULL DEFAULT TRUE
);


Important rules
- DEFAULT is used when a column is omitted from an insert, or when DEFAULT is explicitly requested. Explicitly inserting NULL does not generally invoke the default.
- CHECK generally does not reject NULL by itself because a NULL condition is UNKNOWN; combine with NOT NULL when required.
- A UNIQUE constraint can span multiple columns.
- A foreign key's referenced columns must meet the database's key requirements.
- Foreign key actions include CASCADE, SET NULL, SET DEFAULT where supported, RESTRICT, and NO ACTION. Their exact semantics and support vary.
Example:
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE


Deleting a user will also delete referencing rows when the cascade is supported and the constraint is configured this way.

Primary key vs foreign key: The primary key identifies a row in its own table; the foreign key links a row to another key.
10. Normalization
Normalization organizes relational data to reduce duplication and prevent inconsistent updates.

Imagine storing this in one table:
order_id	customer_name	customer_phone	product
1	Asha	9999	Book
2	Asha	9999	Pen
Customer details are duplicated.

A normalized design separates customers, orders, and products as appropriate, linking them with keys.
Why normalize?
Avoid three common anomalies:
- Insertion anomaly: You cannot store one fact without another unrelated fact.
- Update anomaly: The same fact must be changed in multiple rows.
- Deletion anomaly: Deleting one row accidentally loses another important fact.
Normal forms
Normal form	Easy definition
1NF	Each field contains a single value in the intended relational model; no repeating groups
2NF	In 1NF, and no non-key attribute depends on only part of a candidate key
3NF	In 2NF, and no improper transitive dependency of non-key attributes on a key
BCNF	Every determinant of a non-trivial functional dependency is a superkey
Simple example of 2NF
Suppose the primary key is (student_id, course_id) and the table also stores student_name.

If student_name depends only on student_id, it depends on part of the composite key. That violates 2NF.

Move student details into a separate Students table.
Denormalization
Intentionally adds redundant data or precomputed results to improve read performance or simplify queries.
- Normalization: generally improves consistency and reduces redundancy.
- Denormalization: can improve some reads, but increases storage and update complexity.
Interview answer: Normalize first for correctness and maintainability; denormalize when measured workload requirements justify the trade-off.
11. Indexes — high-priority interview topic
An index is a data structure that helps the database find rows without scanning the entire table in many cases.

Think of an index like a book's index: instead of reading every page, you can jump to a relevant location.
CREATE INDEX idx_users_email
ON users(email);


Now queries filtering by email may become faster:
SELECT *
FROM users
WHERE email = 'asha@example.com';


Types of indexes
Type	Main use
B-tree	General equality and range queries; common default
Hash	Equality lookups in supported implementations
Composite	Queries involving multiple columns
Unique	Prevents duplicate indexed key values
Partial / filtered	Indexes only rows satisfying a condition, where supported
Expression / functional	Indexes the result of an expression
Full-text	Text-search workloads
Spatial	Geographic and geometric queries
PostgreSQL: Supports B-tree, Hash, GiST, SP-GiST, GIN, and BRIN index methods, among others.

MySQL InnoDB: Commonly uses B-tree-based indexes; also supports full-text and spatial index features.
Clustered vs nonclustered indexes
- Clustered index: The table's rows are organized around the index key, according to the storage engine's implementation.
- Nonclustered index: A separate index structure points to rows.
Important differences:
- InnoDB organizes its table data around the primary key (clustered index); secondary indexes contain primary-key values used to locate rows.
- PostgreSQL's ordinary indexes are separate from the table heap. CLUSTER can physically reorder a table using an index, but that ordering is not automatically maintained after future writes.
Trap: PostgreSQL's primary key does not automatically mean its table is physically sorted by that key.
Composite index
CREATE INDEX idx_orders_user_status
ON orders(user_id, status);


This is particularly useful for queries such as:
SELECT *
FROM orders
WHERE user_id = 10;

SELECT *
FROM orders
WHERE user_id = 10
  AND status = 'PAID';


It may be less useful for a query filtering only by status, because status is not the leading column.
Leftmost-prefix rule
For a B-tree composite index (A, B, C), it is generally most directly useful for conditions beginning with:
- A
- A, B
- A, B, C
It may also support other query patterns depending on the database version, index type, optimizer, and query shape. Don't treat the rule as an absolute prohibition.
When indexes help
- Frequent selective WHERE conditions.
- JOIN keys.
- Certain ORDER BY and GROUP BY operations.
- Enforcing primary keys and unique constraints.
- Range lookups.
When indexes hurt
- Every relevant insert, update, or delete may require index maintenance.
- They consume storage.
- Too many indexes can slow writes.
- A low-selectivity column may not benefit much from a standalone index.
- The optimizer may prefer a table scan when reading a large proportion of the table.
Interview question: Does adding an index always make a query faster?

No. It depends on selectivity, table size, query shape, data distribution, and index maintenance costs.
Why might an index not be used?
Common reasons:
1. The query returns a large proportion of the table.
2. The indexed expression does not match the query expression.
3. The index's leading columns do not fit the filter.
4. Statistics are stale or inaccurate.
5. The predicate applies a function or conversion that prevents effective use of a normal index.
6. The optimizer estimates that a scan is cheaper.
Example:
-- A normal index on email may not help optimally
WHERE LOWER(email) = 'asha@example.com';


A matching expression index or a suitable normalized column can help. PostgreSQL supports expression indexes; MySQL supports functional indexes in modern versions.
EXPLAIN and EXPLAIN ANALYZE
Use the query plan to investigate slow queries.
EXPLAIN
SELECT *
FROM orders
WHERE user_id = 10;


- PostgreSQL: EXPLAIN ANALYZE executes the query and reports actual execution information.
- MySQL: EXPLAIN ANALYZE is available in modern releases and executes supported queries to report actual iterator timings.
Inspect scan types, join strategies, estimated versus actual rows, and execution time.

Warning: EXPLAIN ANALYZE executes the statement. For modifying statements, that means changes may occur unless you use an appropriate safe transaction and rollback strategy.
12. Transactions and ACID
A transaction is a logical unit of work that should succeed or fail as a unit.

Example: transferring ₹500 between accounts.
BEGIN;

UPDATE accounts
SET balance = balance - 500
WHERE id = 1;

UPDATE accounts
SET balance = balance + 500
WHERE id = 2;

COMMIT;


If something fails, the transaction can be rolled back where supported:
ROLLBACK;


Production code must also check that the source account exists and has sufficient funds, and handle errors appropriately.
ACID properties
A

Atomicity

All transaction changes happen, or none of them do.



C

Consistency

A transaction preserves defined database rules and constraints when moving between valid states.



I

Isolation

Concurrent transactions are prevented from interfering in ways prohibited by the isolation level.



D

Durability

Once committed, changes are expected to survive failures within the database's configured durability guarantees.



COMMIT, ROLLBACK, SAVEPOINT
BEGIN;

UPDATE accounts SET balance = 100 WHERE id = 1;

SAVEPOINT before_second_change;

UPDATE accounts SET balance = 200 WHERE id = 2;

ROLLBACK TO SAVEPOINT before_second_change;

COMMIT;


The first update is retained; the second is undone.

Important: DDL and transaction behavior differ across databases. In MySQL, many DDL operations cause implicit commits. PostgreSQL supports transactional DDL for many operations.
13. Isolation levels and concurrency
Concurrent transactions can produce anomalies.
Problem	Meaning
Dirty read	Read data another transaction has not committed
Non-repeatable read	Read the same row twice and get different committed values
Phantom read	Repeat a predicate query and see a changed set of matching rows
Lost update	One concurrent update overwrites another update
Write skew	Concurrent transactions each make individually valid changes that together violate a business rule
Isolation levels
Level	Dirty reads	Non-repeatable reads	Phantom reads
Read Uncommitted	Possible in the standard model	Possible	Possible
Read Committed	Prevented	Possible	Possible
Repeatable Read	Prevented	Prevented	Possible in the standard model
Serializable	Prevented	Prevented	Prevented in the standard model
These are standard SQL distinctions; actual behavior can be stronger in a particular database.
PostgreSQL vs MySQL
- PostgreSQL's default is Read Committed.
- MySQL InnoDB's default is Repeatable Read.
- PostgreSQL's Repeatable Read uses snapshot isolation and prevents ordinary phantom reads, but write-skew anomalies can still occur.
- MySQL InnoDB's Repeatable Read combines consistent snapshots and locking mechanisms; behavior depends on whether reads are ordinary consistent reads or locking reads.
- Serializable isolation provides stronger guarantees but can cause blocking or serialization failures.
Optimistic vs pessimistic locking
Pessimistic: Lock records to prevent conflicting changes.
SELECT *
FROM accounts
WHERE id = 1
FOR UPDATE;


Use inside a transaction; behavior and lock scope depend on the database and query.

Optimistic: Allow concurrent work but detect conflicts when updating, often with a version column.
UPDATE products
SET quantity = 8, version = version + 1
WHERE id = 1 AND version = 4;


If zero rows are updated, another operation may have changed the row, or the row may not exist. The application must handle that outcome.
Deadlock
Two transactions each wait for a lock held by the other.

Example:
- Transaction A locks row 1 and waits for row 2.
- Transaction B locks row 2 and waits for row 1.
Databases generally detect deadlocks and abort a transaction. Applications should handle retryable failures.

Reduce deadlocks by:
- Locking resources in a consistent order.
- Keeping transactions short.
- Avoiding unnecessary locks.
- Indexing appropriately so statements touch fewer rows where possible.
14. Window functions
Window functions calculate results across related rows without collapsing each group into one row.

This is one of the most useful interview topics.
ROW_NUMBER, RANK, DENSE_RANK
SELECT
    name,
    department,
    salary,
    ROW_NUMBER() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS rn
FROM employees;


Function	Behavior for tied values
ROW_NUMBER()	Assigns a distinct number to each row
RANK()	Tied rows share rank; gaps follow
DENSE_RANK()	Tied rows share rank; no gaps
Example, with scores 100, 100, 90:
Score	ROW_NUMBER*	RANK	DENSE_RANK
100	1	1	1
100	2	1	1
90	3	3	2
*The ordering of the two tied rows in ROW_NUMBER is arbitrary unless an additional tie-breaker is specified.
PARTITION BY
Divides the rows into independent groups for the window function.
- GROUP BY normally reduces each group to a result row.
- PARTITION BY keeps individual rows and calculates values over their partition.
Running total
SELECT
    user_id,
    created_at,
    amount,
    SUM(amount) OVER (
        PARTITION BY user_id
        ORDER BY created_at, id
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM orders;


LAG and LEAD
Access a previous or next row's value without a self-join.
SELECT
    date,
    sales,
    LAG(sales) OVER (ORDER BY date) AS previous_sales
FROM daily_sales;


- LAG: previous row.
- LEAD: next row.
Find the second-highest distinct salary
One common solution:
SELECT MAX(salary) AS second_highest
FROM employees
WHERE salary < (
    SELECT MAX(salary)
    FROM employees
);


Returns NULL if there is no second distinct non-NULL salary.

Another solution uses DENSE_RANK() and filters for rank 2. Use DENSE_RANK when ties should share a rank.
15. CTEs and recursive queries
A CTE (Common Table Expression) is a named query defined using WITH.
WITH high_value_orders AS (
    SELECT *
    FROM orders
    WHERE amount > 10000
)
SELECT *
FROM high_value_orders;


Benefits:
- Improves readability.
- Separates complex logic into named steps.
- Can be used in many queries, including recursive queries.
CTE vs subquery: A CTE names a query block; a subquery is embedded in another expression. Neither is automatically faster. Optimization and materialization behavior vary.
Recursive CTE
Useful for hierarchical data such as employee-manager trees or category hierarchies.
WITH RECURSIVE employee_tree AS (
    SELECT id, manager_id, name
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    SELECT e.id, e.manager_id, e.name
    FROM employees e
    JOIN employee_tree t
      ON e.manager_id = t.id
)
SELECT *
FROM employee_tree;


This starts at the root employees and repeatedly adds their direct reports. Production queries should account for cycles in hierarchical data.
16. Set operations
Operation	Meaning
UNION	Combines results and removes duplicates
UNION ALL	Combines results and keeps duplicates
INTERSECT	Returns rows common to both results
EXCEPT	Returns rows in the first result not in the second
PostgreSQL supports all four listed operations. MySQL supports UNION and UNION ALL; INTERSECT and EXCEPT are supported in MySQL 8.0.31 and later.

Rules:
- Queries must have compatible column counts and compatible corresponding data types.
- UNION removes duplicates, so it may require additional work.
- UNION ALL is generally cheaper when duplicate elimination is unnecessary.
- Use ORDER BY at the end to sort the combined result.
17. Views, materialized views, and stored procedures
Feature	Meaning
View	Saved query exposed like a virtual table
Materialized view	Stored query results that must be refreshed or maintained
Stored procedure	Stored database routine invoked to perform operations
Function	Database routine that returns a value or result, depending on the database
Trigger	Routine automatically fired by a configured database event
View
CREATE VIEW paid_orders AS
SELECT *
FROM orders
WHERE status = 'PAID';


A regular view generally stores the query definition rather than a separate copy of its results.
Materialized view
PostgreSQL supports native materialized views:
CREATE MATERIALIZED VIEW order_summary AS
SELECT user_id, SUM(amount) AS total
FROM orders
GROUP BY user_id;


Refresh when appropriate:
REFRESH MATERIALIZED VIEW order_summary;


MySQL does not have native materialized views in the same sense; a common alternative is a summary table maintained by scheduled jobs or application logic.
Stored procedure vs function
- Procedures are commonly used for operations or workflows.
- Functions commonly return values or tabular results.
- The exact capabilities, calling syntax, transaction rules, and restrictions vary between PostgreSQL and MySQL.
Trigger
A trigger can run when an event such as INSERT, UPDATE, or DELETE occurs.

Useful for certain auditing and integrity workflows, but excessive trigger logic can hide side effects and make debugging harder.
18. PostgreSQL vs MySQL
Both are relational database management systems and support SQL, transactions, indexes, constraints, joins, and foreign keys.









PostgreSQL

Often chosen for advanced SQL, complex queries, extensible data types, JSONB, rich indexing options, and strong standards-oriented features.












MySQL

Widely used in web applications. InnoDB is the common transactional storage engine, with its own locking, indexing, and storage behavior.



Important differences to remember
| Feature | PostgreSQL | MySQL |
|---|---|---|
| Default transaction isolation | Read Committed | Repeatable Read in InnoDB |
| Auto-generated IDs | GENERATED ... AS IDENTITY | AUTO_INCREMENT |
| Boolean | Native BOOLEAN | BOOLEAN aliases TINYINT(1) |
| JSON | JSON, JSONB | Native JSON |
| Full outer join | Supported | No direct syntax |
| Partial indexes | Supported | No equivalent general partial-index feature |
| Expression indexes | Supported | Functional indexes in modern versions |
| Materialized views | Supported | No native equivalent |
| Returning modified rows | RETURNING | RETURNING for supported statements in modern MySQL versions; support differs by statement/version |
| Upsert | INSERT ... ON CONFLICT | INSERT ... ON DUPLICATE KEY UPDATE |
| String concatenation | || | CONCAT() is common; || normally means logical OR |
| Case sensitivity | Depends on collation and expression | Depends on collation and expression |
| Transactional DDL | Many DDL operations are transactional | Many DDL statements implicitly commit |

Interview advice: Know the concept first, then mention the database-specific behavior. SQL syntax is similar, but it is not identical.
Auto-generated IDs
PostgreSQL:
CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY
);


MySQL:
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY
);


Upsert — insert or update
PostgreSQL:
INSERT INTO users (id, name)
VALUES (1, 'Asha')
ON CONFLICT (id)
DO UPDATE SET name = EXCLUDED.name;


MySQL:
INSERT INTO users (id, name)
VALUES (1, 'Asha')
ON DUPLICATE KEY UPDATE name = 'Asha';


Upsert is useful when an insert should update an existing row on a key conflict. The exact conflict targets and syntax differ.
19. Database performance and query optimization
When asked how to optimize a slow query, answer in this order.
1. Measure first. Identify the slow query and its actual workload.
2. Inspect the query plan. Use EXPLAIN and, where safe, EXPLAIN ANALYZE.
3. Check indexes. Add or adjust indexes based on filters, joins, and sorting.
4. Reduce unnecessary work. Select required columns, filter early where appropriate, and avoid needless duplicate processing.
5. Review joins and subqueries. Check join conditions, cardinality, and missing or incorrect predicates.
6. Check statistics and schema. Stale statistics, unsuitable data types, or poor data distribution can affect plans.
7. Measure again. Confirm the change improves actual latency and doesn't harm writes or other queries.
Common interview traps
Does SELECT * slow a query?

It can. It may read unnecessary columns, increase I/O and network traffic, and prevent some optimizations. The impact depends on the table and execution plan.

Why is a function on an indexed column a problem?

A normal index on the raw column may not directly support a predicate on a transformed value. A matching expression index, functional index, or rewritten predicate may help.

Why use pagination?

To avoid fetching and transmitting every row at once. However, LIMIT/OFFSET can become expensive at large offsets; keyset pagination can be more efficient.

What is a covering index?

An index containing all the columns required by a query, allowing the database to potentially answer it without accessing the table's main row storage.

What is a composite index?

An index involving more than one column. Column order matters.

What is cardinality?

The term has multiple uses. For a column, it often means the number of distinct values. In query planning, cardinality can also refer to estimated row counts. High-cardinality columns have many distinct values.

What is selectivity?

How narrowly a predicate filters the data. A highly selective condition matches a small fraction of rows.
20. SQL injection and database security
SQL injection occurs when untrusted input is incorporated into SQL as executable query text.

Unsafe Java example:
String sql = "SELECT * FROM users WHERE email = '" + email + "'";


An attacker may manipulate the input to change the query's meaning.

Safer JDBC example:
String sql = "SELECT * FROM users WHERE email = ?";

PreparedStatement ps = connection.prepareStatement(sql);
ps.setString(1, email);

ResultSet rs = ps.executeQuery();


Remember:
- Use parameterized queries or prepared statements.
- Do not concatenate untrusted values into SQL.
- Use least-privilege database accounts.
- Validate inputs, but don't rely on validation alone to prevent SQL injection.
- Table names and column names generally cannot be supplied as ordinary query parameters; use an allowlist when identifiers must be dynamic.
- Avoid exposing database credentials or sensitive error details.
21. SQL interview query patterns
These are especially useful for coding rounds.

Assume the table employees(id, name, department, salary).
A. Find the second-highest distinct salary
SELECT MAX(salary)
FROM employees
WHERE salary < (
    SELECT MAX(salary)
    FROM employees
);


B. Find duplicate emails
Assume a users(email) table:
SELECT email, COUNT(*) AS occurrences
FROM users
WHERE email IS NOT NULL
GROUP BY email
HAVING COUNT(*) > 1;


This treats NULL as missing rather than as an email value.
C. Find the highest salary in each department
SELECT department, MAX(salary) AS highest_salary
FROM employees
GROUP BY department;


D. Return the employee(s) earning the highest salary in each department
SELECT id, name, department, salary
FROM (
    SELECT e.*,
           DENSE_RANK() OVER (
               PARTITION BY department
               ORDER BY salary DESC
           ) AS rnk
    FROM employees e
) ranked
WHERE rnk = 1;


Unlike a simple maximum aggregation, this returns employee rows and preserves ties.
E. Find the top three salary ranks per department
SELECT *
FROM (
    SELECT e.*,
           DENSE_RANK() OVER (
               PARTITION BY department
               ORDER BY salary DESC
           ) AS rnk
    FROM employees e
) ranked
WHERE rnk <= 3;


This returns up to three distinct salary ranks per department, not necessarily three employees.
F. Find employees earning more than the company average
SELECT *
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);


G. Find employees earning more than their department average
SELECT e.*
FROM employees e
WHERE salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department = e.department
);


H. Count employees per department, including departments with zero employees
Assume departments(id, name) and employees(id, department_id):
SELECT d.name, COUNT(e.id) AS employee_count
FROM departments d
LEFT JOIN employees e
    ON e.department_id = d.id
GROUP BY d.id, d.name;


Use COUNT(e.id), not COUNT(*), because a LEFT JOIN produces a row for an empty department.
I. Find users with no orders
SELECT u.*
FROM users u
WHERE NOT EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.user_id = u.id
);


J. Find the latest order for each user
SELECT *
FROM (
    SELECT o.*,
           ROW_NUMBER() OVER (
               PARTITION BY user_id
               ORDER BY created_at DESC, id DESC
           ) AS rn
    FROM orders o
) ranked
WHERE rn = 1;


The id tie-breaker makes the result deterministic when timestamps match.
K. Calculate total spending per user
SELECT u.id, u.name,
       COALESCE(SUM(o.amount), 0) AS total_spending
FROM users u
LEFT JOIN orders o
    ON o.user_id = u.id
GROUP BY u.id, u.name;


L. Find consecutive or repeated records
For consecutive dates, repeated statuses, or streak problems, think of LAG(), LEAD(), ROW_NUMBER(), and date arithmetic. The exact query depends on the definition of a streak and the database's date functions.
22. Database architecture concepts
Concept	Easy definition
OLTP	Optimized for frequent transactions, such as orders and payments
OLAP	Optimized for analytical queries over large amounts of data
Replication	Maintaining copies of data on multiple database servers
Sharding	Splitting data across multiple servers or partitions
Partitioning	Dividing a table into smaller physical or logical parts
Connection pooling	Reusing database connections
Read replica	A replica commonly used to serve read traffic
Primary/leader	The node accepting writes in a primary-based architecture
Failover	Switching to a standby or replacement when a node fails
Backup	A recoverable copy of data
Recovery	Restoring data or service after a failure
WAL	Write-ahead log; records changes before corresponding data pages are written
MVCC	Multi-Version Concurrency Control; lets transactions work with different row versions
Replication vs sharding
- Replication: Copies the same data to multiple nodes; helps with availability and read scaling.
- Sharding: Distributes different subsets of data across nodes; helps scale data storage and workloads.
A read replica can lag behind the primary. Consequently, a read immediately after a successful write may return stale data if routed to a lagging replica.
Partitioning vs sharding
- Partitioning commonly divides a table within one database system.
- Sharding distributes data across separate database instances or nodes.
The terminology can overlap, but this distinction is useful in interviews.
Connection pooling
Opening database connections repeatedly is expensive. A pool reuses connections and limits concurrent database sessions.

In Java/Spring Boot applications, connection pools such as HikariCP are commonly used.

Trap: Increasing the pool size indefinitely does not necessarily increase throughput. Too many concurrent queries can overload the database.
23. PostgreSQL-specific concepts
Know these if the job description mentions PostgreSQL.
- MVCC: Uses row versions to support concurrent transactions.
- WAL: Supports crash recovery and replication.
- JSONB: Efficiently stores JSON in a decomposed representation and supports indexing.
- RETURNING: Returns values from modified rows.
- SERIAL / IDENTITY: Mechanisms for generated integer IDs; identity columns are the more standards-oriented modern choice.
- ILIKE: Case-insensitive pattern matching.
- EXPLAIN ANALYZE: Shows actual execution details by executing the statement.
- VACUUM: Reclaims or makes reusable space from dead tuples and maintains visibility information; routine maintenance matters because PostgreSQL uses MVCC.
- ANALYZE: Collects statistics used by the query planner.
- JSONB indexes: GIN indexes can be useful for certain JSON containment and key-existence queries.
- ON CONFLICT: Supports upsert behavior.
24. MySQL-specific concepts
Know these if the job description mentions MySQL.
- InnoDB: Common default storage engine; supports transactions, row-level locking, and foreign keys.
- AUTO_INCREMENT: Generates integer identifiers.
- Clustered primary key: InnoDB organizes row data around the primary key.
- Secondary indexes: InnoDB secondary index entries include the primary-key value.
- EXPLAIN: Shows the optimizer's planned query execution.
- EXPLAIN ANALYZE: Available in modern versions to show actual execution information.
- ON DUPLICATE KEY UPDATE: Supports upsert behavior.
- JSON: Native JSON data type.
- Isolation: InnoDB defaults to Repeatable Read, unlike PostgreSQL's Read Committed default.
- Implicit commits: Many DDL statements commit active transactions.
- AUTO_INCREMENT and transaction rollback: Generated identifier values are not necessarily reused after a rollback.




<!-- ===== Owner addition: SQL query building (added 20-10-2026). Source file: reference/reference.md ===== -->

SQL QUERY BUILDING — ⭐ INTERVIEW MEMORY LIST
1. MASTER ORDER ⭐⭐⭐
SELECT
FROM
WHERE
GROUP BY
HAVING
ORDER BY
LIMIT;

Remember:

FROM
 ↓
WHERE
 ↓
GROUP BY
 ↓
HAVING
 ↓
SELECT
 ↓
ORDER BY
 ↓
LIMIT
2. SELECT
SELECT *
FROM employees;

SELECT name, salary
FROM employees;

DISTINCT
SELECT DISTINCT department
FROM employees;

Alias
SELECT salary AS employee_salary
FROM employees;

3. WHERE ⭐⭐⭐
WHERE salary > 50000

WHERE salary >= 50000

WHERE salary = 50000

WHERE salary <> 50000

WHERE salary BETWEEN 40000 AND 80000

WHERE department IN ('IT', 'HR')

WHERE department NOT IN ('IT', 'HR')

WHERE name LIKE 'A%'

WHERE name LIKE '%A'

WHERE name LIKE '%A%'

WHERE name LIKE '_a%'

NULL ⭐
WHERE salary IS NULL

WHERE salary IS NOT NULL

❌ Never:

WHERE salary = NULL

4. AND / OR / NOT
WHERE salary > 50000
AND department = 'IT';

WHERE department = 'IT'
OR department = 'HR';

WHERE NOT department = 'HR';

Brackets ⭐
WHERE department = 'IT'
AND (salary > 50000 OR experience > 5);

5. AGGREGATE FUNCTIONS ⭐⭐⭐
COUNT(*)
COUNT(column)
COUNT(DISTINCT column)

SUM(column)

AVG(column)

MIN(column)

MAX(column)

Examples:

SELECT COUNT(*)
FROM employees;

SELECT AVG(salary)
FROM employees;

SELECT MAX(salary)
FROM employees;
SELECT MIN(salary)
FROM employees;
SELECT SUM(salary)
FROM employees;
6. GROUP BY ⭐⭐⭐
Count per department
SELECT department, COUNT(*)
FROM employees
GROUP BY department;

Average salary per department
SELECT department, AVG(salary)
FROM employees
GROUP BY department;

Maximum salary per department
SELECT department, MAX(salary)
FROM employees
GROUP BY department;

Multiple columns
SELECT department, city, COUNT(*)
FROM employees
GROUP BY department, city;

7. HAVING ⭐⭐⭐
Filter groups
SELECT department, COUNT(*)
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;

Average salary > 50K
SELECT department, AVG(salary)
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;

⭐ WHERE vs HAVING
WHERE  → filter ROWS
HAVING → filter GROUPS
8. ORDER BY ⭐⭐⭐
ORDER BY salary ASC;
ORDER BY salary DESC;
Multiple
ORDER BY department ASC, salary DESC;
By alias
SELECT salary AS s
FROM employees
ORDER BY s DESC;
9. LIMIT
LIMIT 5;

Top 5
ORDER BY salary DESC
LIMIT 5;

Pagination
LIMIT 10 OFFSET 20;

10. JOINS ⭐⭐⭐
INNER JOIN
SELECT *
FROM employees e
JOIN departments d
ON e.department_id = d.id;

LEFT JOIN
SELECT *
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.id;

RIGHT JOIN
SELECT *
FROM employees e
RIGHT JOIN departments d
ON e.department_id = d.id;
FULL OUTER JOIN
SELECT *
FROM employees e
FULL OUTER JOIN departments d
ON e.department_id = d.id;
11. JOIN + SELECT
SELECT e.name, d.department_name
FROM employees e
JOIN departments d
ON e.department_id = d.id;
12. JOIN + WHERE
SELECT e.name, e.salary
FROM employees e
JOIN departments d
ON e.department_id = d.id
WHERE d.department_name = 'IT';

13. JOIN + GROUP BY ⭐⭐⭐
SELECT d.department_name, COUNT(e.id)
FROM departments d
LEFT JOIN employees e
ON e.department_id = d.id
GROUP BY d.department_name;

14. JOIN + GROUP BY + HAVING ⭐⭐⭐
SELECT d.department_name, COUNT(e.id)
FROM departments d
JOIN employees e
ON e.department_id = d.id
GROUP BY d.department_name
HAVING COUNT(e.id) > 5;

15. CASE ⭐⭐⭐
CASE
    WHEN salary >= 100000 THEN 'HIGH'
    WHEN salary >= 50000 THEN 'MEDIUM'
    ELSE 'LOW'
END

In SELECT
SELECT name,
       CASE
           WHEN salary >= 100000 THEN 'HIGH'
           ELSE 'LOW'
       END AS salary_level
FROM employees;

In ORDER BY
ORDER BY
    CASE
        WHEN status = 'ACTIVE' THEN 1
        ELSE 2
    END;

16. COALESCE ⭐⭐
First non-null value:

COALESCE(phone, email, 'N/A')

Example:

SELECT COALESCE(salary, 0)
FROM employees;

17. STRING FUNCTIONS
UPPER(name)

LOWER(name)

LENGTH(name)

TRIM(name)

CONCAT(first_name, last_name)

SUBSTRING(name, 1, 3)

REPLACE(name, 'A', 'B')

18. DATE FUNCTIONS
Common:

CURRENT_DATE
CURRENT_TIMESTAMP
YEAR(date)
MONTH(date)
DAY(date)

DATEDIFF(date1, date2)

DATE_ADD(date, INTERVAL 7 DAY)

DATE_SUB(date, INTERVAL 7 DAY)

Exact date-function syntax varies by database (MySQL/PostgreSQL/SQL Server).

19. SUBQUERY ⭐⭐⭐
Employees earning above average
SELECT *
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);

Maximum salary
SELECT *
FROM employees
WHERE salary = (
    SELECT MAX(salary)
    FROM employees
);
20. IN SUBQUERY
SELECT *
FROM employees
WHERE department_id IN (
    SELECT id
    FROM departments
    WHERE location = 'Delhi'
);
21. EXISTS ⭐⭐⭐
SELECT *
FROM employees e
WHERE EXISTS (
    SELECT 1
    FROM departments d
    WHERE d.id = e.department_id
);

NOT EXISTS
SELECT *
FROM employees e
WHERE NOT EXISTS (
    SELECT 1
    FROM departments d
    WHERE d.id = e.department_id
);

Remember:

EXISTS     → matching row exists
NOT EXISTS → matching row doesn't exist
22. CTE ⭐⭐⭐
WITH high_salary AS (
    SELECT *
    FROM employees
    WHERE salary > 50000
)
SELECT *
FROM high_salary;

Multiple CTE
WITH a AS (
    SELECT ...
),
b AS (
    SELECT ...
)
SELECT ...
FROM a
JOIN b ON ...;

23. UNION ⭐⭐
SELECT name FROM employees
UNION
SELECT name FROM managers;
Keep duplicates
SELECT name FROM employees
UNION ALL
SELECT name FROM managers;

UNION     → removes duplicates
UNION ALL → keeps duplicates
24. INSERT
INSERT INTO employees (name, salary)
VALUES ('John', 50000);

Multiple:

INSERT INTO employees (name, salary)
VALUES
('John', 50000),
('Alex', 60000);

25. UPDATE
UPDATE employees
SET salary = 60000
WHERE id = 1;

Multiple:

UPDATE employees
SET salary = salary * 1.10
WHERE department = 'IT';

26. DELETE
DELETE FROM employees
WHERE id = 1;

⚠️ Without WHERE:

DELETE FROM employees;

deletes all rows.

27. NTH HIGHEST ⭐⭐⭐
2nd highest
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

Nth highest
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET N-1;

28. SECOND HIGHEST — SUBQUERY
SELECT MAX(salary)
FROM employees
WHERE salary < (
    SELECT MAX(salary)
    FROM employees
);

29. DUPLICATES ⭐⭐⭐
Find duplicate values
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

Duplicate rows based on multiple columns
SELECT name, city, COUNT(*)
FROM users
GROUP BY name, city
HAVING COUNT(*) > 1;

30. REMOVE DUPLICATES FROM RESULT
SELECT DISTINCT email
FROM users;

31. COUNT DISTINCT ⭐⭐⭐
SELECT COUNT(DISTINCT user_id)
FROM orders;

Distinct cities per driver
SELECT driver_id, COUNT(DISTINCT city)
FROM rides
GROUP BY driver_id;

32. CONDITIONAL COUNT ⭐⭐⭐
COUNT(
    CASE
        WHEN status = 'COMPLETED' THEN 1
    END
)

Example:

SELECT
    COUNT(*) AS total,
    COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) AS completed
FROM orders;

33. CONDITIONAL SUM
SUM(
    CASE
        WHEN status = 'COMPLETED' THEN amount
        ELSE 0
    END
)

34. WINDOW FUNCTIONS ⭐⭐⭐
ROW_NUMBER
ROW_NUMBER() OVER (
    ORDER BY salary DESC
)

RANK
RANK() OVER (
    ORDER BY salary DESC
)

DENSE_RANK
DENSE_RANK() OVER (
    ORDER BY salary DESC
)

Partition
ROW_NUMBER() OVER (
    PARTITION BY department
    ORDER BY salary DESC
)

35. TOP EMPLOYEE PER DEPARTMENT ⭐⭐⭐
WITH ranked AS (
    SELECT *,
           ROW_NUMBER() OVER (
               PARTITION BY department_id
               ORDER BY salary DESC
           ) AS rn
    FROM employees
)
SELECT *
FROM ranked
WHERE rn = 1;

Top 3 per department
WHERE rn <= 3;

36. RANK vs DENSE_RANK vs ROW_NUMBER
ROW_NUMBER → 1 2 3 4
RANK       → 1 2 2 4
DENSE_RANK → 1 2 2 3
37. LAG / LEAD ⭐⭐
Previous row:

LAG(salary) OVER (
    ORDER BY id
)

Next row:

LEAD(salary) OVER (
    ORDER BY id
)

38. RUNNING TOTAL
SUM(amount) OVER (
    ORDER BY date
)

39. WINDOW + PARTITION
AVG(salary) OVER (
    PARTITION BY department_id
)

40. IMPORTANT QUERY COMBINATIONS
Filter → Sort → Limit
SELECT *
FROM employees
WHERE salary > 50000
ORDER BY salary DESC
LIMIT 5;

Group → Count → Filter group
SELECT department, COUNT(*)
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;

Group → Average → Sort
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;

Join → Filter → Select
SELECT e.name
FROM employees e
JOIN departments d
ON e.department_id = d.id
WHERE d.name = 'IT';
Join → Group → Count
SELECT d.name, COUNT(e.id)
FROM departments d
LEFT JOIN employees e
ON e.department_id = d.id
GROUP BY d.name;

Distinct → Sort → Top N
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 5;

Group → Count → Sort → Top
SELECT department, COUNT(*) AS total
FROM employees
GROUP BY department
ORDER BY total DESC
LIMIT 3;

⭐⭐⭐ ENGLISH → SQL TRANSLATOR
GET                    → SELECT
FROM                   → FROM
ONLY WHERE             → WHERE
UNIQUE                 → DISTINCT
CONDITION              → WHERE
AND / OR               → AND / OR
BETWEEN                → BETWEEN
LIST                   → IN
PATTERN                → LIKE
EMPTY                  → IS NULL

HOW MANY               → COUNT
TOTAL                  → SUM
AVERAGE                → AVG
HIGHEST                → MAX
LOWEST                 → MIN

PER EACH               → GROUP BY
FILTER GROUPS          → HAVING

SORT                   → ORDER BY
HIGHEST FIRST          → DESC
LOWEST FIRST           → ASC

TOP N                  → ORDER BY + LIMIT
NTH HIGHEST            → ORDER BY DESC + OFFSET

COMBINE TABLES         → JOIN
MATCHING ONLY          → INNER JOIN
KEEP LEFT              → LEFT JOIN
KEEP RIGHT             → RIGHT JOIN

MATCH EXISTS           → EXISTS
NO MATCH               → NOT EXISTS

REMOVE DUPLICATES      → DISTINCT
DUPLICATE VALUES       → GROUP BY + HAVING COUNT(*) > 1

CLASSIFY               → CASE
REPLACE NULL           → COALESCE

RANK                   → RANK()
NUMBER EACH            → ROW_NUMBER()
DENSE RANK             → DENSE_RANK()

PREVIOUS ROW           → LAG()
NEXT ROW               → LEAD()

PER GROUP              → PARTITION BY
⭐⭐⭐ THE CORE TO MEMORIZE
SELECT
FROM
WHERE
GROUP BY
HAVING
ORDER BY
LIMIT

COUNT
SUM
AVG
MIN
MAX

DISTINCT
LIKE
IN
BETWEEN
IS NULL

JOIN
LEFT JOIN
ON

CASE
COALESCE

GROUP BY + COUNT
GROUP BY + HAVING
JOIN + GROUP BY
JOIN + WHERE
ORDER BY + LIMIT
DISTINCT + ORDER BY + LIMIT

SUBQUERY
EXISTS
CTE

ROW_NUMBER()
RANK()
DENSE_RANK()
PARTITION BY
LAG()
LEAD()
If you can recall this list + the combinations, you can build most beginner SQL interview queries by translating the question from English → operation → query.
