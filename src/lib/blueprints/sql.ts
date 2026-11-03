import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const sql: Blueprint = {
  tagline: "How one query is planned and run, and how storage, transactions and scale fit in.",
  legend: legendOf([
    "Query lifecycle",
    "SELECT order",
    "Storage & indexing",
    "Transactions (ACID)",
    "Performance & scale",
  ]),
  alt:
    "A system map of SQL and databases. Query lifecycle: a SQL query is parsed, the optimizer picks the " +
    "cheapest plan, the executor runs it against the storage engine, and a result set comes back. SELECT " +
    "runs in logical order: FROM and JOIN, then WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT. Storage " +
    "and indexing: tables hold rows, B-tree indexes speed up WHERE lookups, primary and foreign keys and " +
    "constraints enforce integrity, and normalization (1NF to 3NF) removes redundancy. Transactions: BEGIN " +
    "to COMMIT or ROLLBACK give ACID; isolation levels and locks or MVCC control concurrency. Performance " +
    "and scale: EXPLAIN shows the plan, and partitioning, replication and sharding scale the data.",
  baseline: "PostgreSQL 18 · MySQL 9",
  chart: `flowchart TD
  subgraph LIFE["1 . Query lifecycle"]
    direction TB
    q["SQL query"]:::f
    q --> parse["Parser"]:::f
    parse --> opt["Optimizer: best plan"]:::f
    opt --> exc["Executor"]:::f
    exc --> eng["Storage engine"]:::d
    eng --> res(["Result set"]):::f
  end

  subgraph ORDER["2 . SELECT runs in this order"]
    direction TB
    fr["FROM + JOIN"]:::c
    fr --> wh["WHERE"]:::c
    wh --> gb["GROUP BY"]:::c
    gb --> hv["HAVING"]:::c
    hv --> se["SELECT"]:::c
    se --> ob["ORDER BY"]:::c
    ob --> lm["LIMIT"]:::c
  end
  exc -->|for SELECT| fr

  subgraph STORE["3 . Storage and indexing"]
    direction LR
    tbl["Tables + rows"]:::d
    idx["B-tree index"]:::d
    keys["PK / FK + constraints"]:::d
    norm["Normalization 1NF-3NF"]:::d
  end
  eng --> tbl
  tbl --> idx
  wh -.->|uses| idx
  tbl --> keys
  tbl -.-> norm

  subgraph TX["4 . Transactions (ACID)"]
    direction TB
    tx["BEGIN .. COMMIT / ROLLBACK"]:::x
    tx --> iso["Isolation levels"]:::x
    iso --> lck["Locks + MVCC"]:::x
  end
  exc -->|writes in| tx
  lck -.-> tbl

  subgraph PERF["5 . Performance and scale"]
    direction LR
    exp["EXPLAIN plan"]:::o
    part["Partitioning"]:::o
    rep["Replication"]:::o
    shd["Sharding"]:::o
  end
  opt -.-> exp
  tbl --> part
  eng --> rep
  eng --> shd
${CLASSDEFS}`,
};
