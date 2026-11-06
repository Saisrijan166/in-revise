# Redis — Interview Cheat Sheet

Idea-level revision for Java Backend / Spring Boot / Microservices interviews. Running example: a payment service where a customer pays by UPI, card, or wallet.

# Fundamentals

## What Redis Is ⭐⭐

Redis is an in-memory key-value store: values are indexed by keys and served from RAM, which makes access very fast.

- It is more than a cache. It also powers counters, sessions, rate limiting, ephemeral state, and messaging patterns.
- A cache is a temporary copy of data kept to avoid expensive database or service calls.

> Remember: Redis is fast because it lives in memory, but it is a separate store — not automatically your authoritative business data.

## Cache Hit, Miss and TTL

- Cache hit: requested data is found in the cache.
- Cache miss: data is absent and must be fetched from the source store.
- TTL (Time To Live): the time after which a key expires.
- Atomic operation: appears indivisible to other clients.

```
Request
   └─ Check Redis
        ├─ Hit  → return cached value
        └─ Miss → read PostgreSQL → store in Redis → return
```

> Remember: Keep the database as the source of truth; use Redis to accelerate reads.

# Data Types & Commands

## Data Types ⭐⭐

| Type | Holds | Use for |
| --- | --- | --- |
| String | text, numbers, JSON, bytes | simple values, counters |
| Hash | fields and values under one key | object-like data |
| List | ordered values, push/pop at both ends | queues, timelines |
| Set | unique values | membership, dedup |
| Sorted Set (ZSET) | unique members ordered by score | leaderboards, rankings |
| Stream | append-only log with IDs | event logs, consumer groups |
| Bitmap | bit operations on a string | flags, presence tracking |
| HyperLogLog | approximate distinct count, small memory | unique-visitor estimates |
| Geospatial | coordinates | nearby-location queries |

- Pub/Sub delivers messages to currently subscribed clients, with no durable history.

```
SADD payment:PAY101:events CREATED
SADD payment:PAY101:events CREATED
SCARD payment:PAY101:events   -- returns 1: a Set keeps unique members
```

> Remember: Pick the type by shape of data — ZSET for ranking, Set for uniqueness, Hash for objects.

## Core Commands

```bash
SET key value              # store a value
GET key                    # read a string
DEL key                    # delete
EXISTS key                 # 1 if present
INCR key                   # atomically increment an integer
MGET k1 k2                 # read many strings
HSET / HGET                # write / read hash fields
LPUSH / RPUSH              # insert at left / right of a list
SADD / SISMEMBER           # add a set member / check membership
ZADD / ZRANGE              # add scored member / read in order
```

> Remember: `INCR` and other single commands are atomic — no extra locking needed.

# Keys & Expiry

## TTL and Expiry ⭐

```bash
SET payment:PAY101 PENDING EX 300   # value with a 5-minute expiry
EXPIRE key seconds                  # set a relative expiry
TTL key                             # remaining seconds
SET key value NX EX seconds         # set only if absent, with expiry
```

> Remember: Expiry is not a precise callback. Redis deletes expired keys by its own mechanism; never depend on the exact instant.

## Eviction and Memory ⭐

When memory hits `maxmemory`, the eviction policy decides what to remove.

| Policy | Behaviour |
| --- | --- |
| `noeviction` | reject memory-consuming writes |
| `allkeys-lru` | evict least-recently-used across all keys |
| `allkeys-lfu` | evict least-frequently-used across all keys |
| `volatile-lru` | LRU among keys that have a TTL |
| `volatile-ttl` | prefer keys with the shortest remaining TTL |

- LRU = Least Recently Used. LFU = Least Frequently Used.

> Remember: TTL and eviction are different. TTL controls expiration; eviction frees memory. A key with no TTL can still be evicted under an `allkeys-*` policy.

# Persistence & Scaling

## RDB vs AOF ⭐⭐

| RDB | AOF (Append Only File) |
| --- | --- |
| point-in-time snapshots | logs each write to replay on recovery |
| compact, faster restart | larger file, more complete history |
| can lose writes since last snapshot | smaller data-loss window |

> Remember: Durability depends on configuration and the failure scenario. A successful write does not always mean the data is already safe on disk.

## Replication, Sentinel, Cluster ⭐

- Replication copies data from a primary to replicas; the primary takes writes, replicas can serve reads.
- Replication lag: a replica may briefly be behind the primary.
- Sentinel monitors the deployment and coordinates failover.
- Cluster shards keys across nodes for horizontal scaling. Sharding = splitting data across nodes.

> Remember: Sentinel gives high availability (failover); Cluster gives scale (sharding).

## When Redis Is Down

Decide the fallback up front: fail the request, fall back to the database, or use another controlled behaviour.

# Patterns

## Caching Strategies ⭐⭐

- Cache-aside (lazy loading): app checks cache first, loads from DB on a miss, then stores it. Most common.
- Read-through: the cache layer fetches missing data itself.
- Write-through: writes go through the cache and the store together.
- Write-behind / write-back: write to cache first, persist later — faster, but risks data loss if not designed carefully.
- Cache invalidation: remove or refresh stale data after a successful DB change.

```java
PaymentConfig config = redis.get(key);
if (config == null) {
    config = database.findConfig();
    redis.set(key, config, Duration.ofMinutes(5));
}
return config;
```

> Remember: Cache-aside is the default; invalidate the cache after the database write succeeds.

## Cache Failure Modes ⭐

| Problem | What happens | Fix |
| --- | --- | --- |
| Stampede | many requests reload the same expired key at once | TTL jitter, request coalescing, controlled refresh |
| Penetration | repeated queries for data that does not exist hit the DB | validate inputs, briefly cache the absence (negative caching) |
| Avalanche | many keys expire together, load spikes | spread expiry times, throttle DB load |
| Stale data | cache no longer matches the source | invalidate/update after DB changes |

> Remember: Most cache pain comes from expiry timing — stagger TTLs and coalesce reloads.

## Distributed Lock ⭐⭐

```bash
SET lock:payment:PAY101 unique-token NX EX 30   # acquire a 30s lock
```

- `NX` sets only if absent; `EX` gives the lock an expiry (a lease) so a dead process cannot hold it forever.
- Store a unique owner token. Release safely: delete only if the stored token matches yours — typically via a Lua script, never a blind `DEL` (the lock may now belong to another process).
- Fencing token: a monotonically increasing number a downstream resource uses to reject a stale lock holder.
- Redlock: a multi-node Redis locking algorithm with its own assumptions and trade-offs.

> Remember: A Redis lock alone does not make a payment happen exactly once. Back it with DB constraints, idempotency keys, and provider idempotency.

## Counters and Rate Limiting

Use the atomic `INCR` on a per-user, per-window key to count requests cheaply, then compare against a limit.

# Transactions & Scripting

## MULTI / EXEC / WATCH ⭐

- `MULTI` / `EXEC`: queue commands and run them as one unit relative to other clients. `DISCARD` cancels before execution.
- `WATCH`: optimistic concurrency — abort the transaction if a watched key changed first.
- Optimistic locking: proceed only if the data has not changed since you read it. Guards against a race condition (result depends on timing of concurrent ops).

```
# Lost update without atomicity:
A: GET count → 5   B: GET count → 5
A: SET count 6     B: SET count 6   # one increment lost
# Safe:
INCR payment:request-count          # both applied
```

> Remember: A `MULTI`/`EXEC` block is not a relational rollback. It isolates the batch but does not undo on a runtime command error.

## Lua Scripting

A Lua script runs atomically inside Redis, so you can read-check-write in one step (for example, compare-and-delete a lock) without a race.

# Redis in Spring Boot

## Spring Data Redis ⭐

- `RedisTemplate` / `StringRedisTemplate`: Spring abstractions over Redis operations.
- Clients: Lettuce (default in Spring Boot) or Jedis. Serialization converts Java objects into a storable form; connection pooling reuses connections where supported.
- Cache abstraction: `@Cacheable`, `@CachePut`, `@CacheEvict` can be backed by Redis.

```java
@Service
class PaymentService {
    private final StringRedisTemplate redis;
    PaymentService(StringRedisTemplate redis) { this.redis = redis; }

    void cacheStatus(String id, String status) {
        redis.opsForValue().set("payment:" + id, status, Duration.ofMinutes(5));
    }
    String getStatus(String id) {
        return redis.opsForValue().get("payment:" + id);
    }
}
```

> Remember: `opsForValue().set(...)` writes, `opsForValue().get(...)` reads — "I configure a Redis connection and use RedisTemplate to read and write cached data."

# Common "Why X vs Y?" Comparisons

## Redis vs Database ⭐⭐

| Redis | PostgreSQL / MySQL |
| --- | --- |
| primarily in-memory | primarily disk-backed |
| very fast key-based access | rich relational queries |
| caching, counters, short-lived state | durable transactional business data |
| persistence configurable, durability varies | designed for durable storage |
| limited query model | joins, indexes, constraints, transactions |

> Remember: For payment records, the durable database is the source of truth; Redis accelerates reads, coordinates work, or holds temporary data.

## INCR vs GET + SET

GET + SET from two clients can lose an update (both read 5, both write 6). `INCR` is a single atomic command, so both increments apply.

> Remember: Prefer one atomic command over read-modify-write whenever Redis offers it.

## TTL vs Eviction

TTL expires a specific key after a set time; eviction removes keys under memory pressure by policy. They are independent — a key can be evicted before its TTL, or evicted with no TTL at all.

> Remember: TTL = time-based per key; eviction = memory-based across keys.
