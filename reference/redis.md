# REST API, Redis, AWS & Software Design Patterns

Interview Cheat Sheet — Beginner to Intermediate

This guide focuses on the concepts, terminology, rules, differences, defaults, and common interview questions you need for Java Backend / Spring Boot / Microservices interviews.

The examples use one common scenario throughout: a customer makes a payment using UPI, a card, or a wallet. You can reuse this scenario to explain many backend concepts and design patterns.

# PART 2: REDIS

## 1. Redis Basics

### Subtopics

- Redis: An in-memory data store commonly used for caching, counters, sessions, and short-lived data.
- In-memory: Data is primarily served from RAM, making access fast.
- Key-value store: Stores values indexed by keys.
- Cache: A temporary copy of data kept to reduce expensive database or service calls.
- Cache hit: Requested data is found in the cache.
- Cache miss: Requested data is absent and must be fetched elsewhere.
- TTL (Time To Live): Time after which a key expires.
- Persistence: Saving data so it can survive some process or machine failures.
- Eviction: Removing keys when a configured memory limit requires space.
- Atomic operation: An operation that appears indivisible to other clients.
- Redis is not just a cache: It can also support counters, rate limiting, ephemeral state, and messaging patterns.

### Example

Suppose a payment service repeatedly fetches a merchant's configuration from PostgreSQL. Cache that configuration in Redis to reduce database queries.

```
Request
   ↓
Check Redis
   ├── Hit  → Return cached configuration
   └── Miss → Read PostgreSQL → Store in Redis → Return
```

Remember: PostgreSQL can remain the source of truth. A Redis cache should not automatically be treated as permanent or authoritative business data.

## 2. Redis Data Types

### Subtopics

- String: Stores text, numbers, serialized JSON, or other byte sequences.
- Hash: Stores fields and values under one key; useful for object-like data.
- List: Ordered collection of values; supports operations at both ends.
- Set: Collection of unique values.
- Sorted Set (ZSET): Unique members ordered by a numeric score; useful for rankings and leaderboards.
- Stream: Append-only log of entries with IDs; supports consumer groups.
- Bitmap: Efficient bit-level operations on string values.
- HyperLogLog: Estimates the number of distinct elements using relatively little memory.
- Geospatial commands: Store coordinates and support nearby-location queries.
- Pub/Sub: Sends messages to currently subscribed clients without durable message history.

### Example

```
SET payment:PAY101 PENDING
GET payment:PAY101

HSET payment:PAY101:details amount 500 currency INR
HGET payment:PAY101:details amount

SADD payment:PAY101:events CREATED
SADD payment:PAY101:events CREATED
SCARD payment:PAY101:events
```

The final command returns `1`, because a Redis Set stores unique members.

## 3. Important Redis Commands

### Subtopics

- `SET key value`: Stores a value.
- `GET key`: Retrieves a string value.
- `DEL key`: Deletes a key.
- `EXISTS key`: Checks whether a key exists.
- `EXPIRE key seconds`: Sets a relative expiry.
- `TTL key`: Returns remaining TTL in seconds.
- `SET key value EX seconds`: Sets a value with an expiry in seconds.
- `SET key value NX EX seconds`: Sets only if the key does not exist and assigns an expiry.
- `INCR key`: Atomically increments an integer value.
- `MGET`: Retrieves multiple string values.
- `HSET` / `HGET`: Write or read hash fields.
- `LPUSH` / `RPUSH`: Insert values at the left or right of a list.
- `SADD` / `SISMEMBER`: Add a set member or check membership.
- `ZADD` / `ZRANGE`: Add sorted-set members or retrieve members in order.

### Example

```
SET payment:PAY101 PENDING EX 300
TTL payment:PAY101
```

This sets a five-minute expiry.

Important: Expiry is not a guaranteed appointment for a callback. Redis expires keys according to its expiration mechanisms; applications should not depend on the exact instant of deletion.

## 4. Caching Strategies

### Subtopics

- Cache-aside (lazy loading): Application checks the cache first and loads from the database on a miss.
- Read-through: Cache layer fetches missing data from the underlying store.
- Write-through: Writes go through the cache layer and underlying store together according to its implementation.
- Write-behind / write-back: Data is written to the cache first and persisted later; this introduces data-loss risk if not designed carefully.
- Cache invalidation: Removing or refreshing stale cached data.
- Cache stampede: Many requests simultaneously reload the same expired or missing value.
- Cache penetration: Repeated queries for nonexistent data repeatedly reach the database.
- Cache avalanche: Many keys expire around the same time, causing a sudden load increase.
- Negative caching: Caching a known absence for a short period.
- Stale data: Cached information that no longer matches the source of truth.

### Example: Cache-aside

```
PaymentConfig config = redis.get(key);

if (config == null) {
    config = database.findConfig();
    redis.set(key, config, Duration.ofMinutes(5));
}

return config;
```

The code is illustrative; production code must also handle serialization, errors, and concurrent cache misses.

### Common solutions

- Stampede: Add TTL jitter, request coalescing, or controlled refresh.
- Penetration: Validate inputs and optionally cache missing results briefly.
- Avalanche: Spread expiry times and control database load.
- Stale data: Invalidate or update the cache after successful database changes.

## 5. TTL, Eviction and Memory

### Subtopics

- TTL: Controls how long a key remains eligible to exist.
- `maxmemory`: Redis configuration limiting memory use.
- Eviction policy: Determines what Redis removes when memory is constrained.
- `noeviction`: Does not evict keys; memory-consuming writes may fail when the limit is reached.
- `allkeys-lru`: Evicts keys approximating least-recently-used across all keys.
- `allkeys-lfu`: Evicts keys approximating least-frequently-used across all keys.
- `volatile-lru`: Evicts among keys with an expiry, using an LRU approximation.
- `volatile-ttl`: Prefers expiring keys with shorter remaining TTLs.
- LRU: Least Recently Used.
- LFU: Least Frequently Used.

### Example

A payment status cache can use a short TTL, while merchant configuration can use a longer TTL if it changes infrequently.

Interview trap: TTL and eviction are different. TTL controls expiration; eviction is a memory-management policy. A key without a TTL can still be evicted under an appropriate `allkeys-*` policy.

## 6. Redis Atomicity, Transactions and Lua

### Subtopics

- Atomic command: A single Redis command, such as `INCR`, executes atomically.
- `MULTI` / `EXEC`: Groups commands into a transaction that executes as a unit relative to other clients.
- `DISCARD`: Cancels a queued Redis transaction before execution.
- `WATCH`: Enables optimistic concurrency control by detecting changes to watched keys.
- Lua scripting: Executes a script atomically within Redis.
- Race condition: The result depends on the timing or order of concurrent operations.
- Optimistic locking: Proceed only if the data has not changed since it was checked.
- Distributed lock: A lock used by multiple processes to coordinate access to shared work.

### Example: Why `INCR` is safer than GET + SET

Unsafe approach:

```
Client A: GET count → 5
Client B: GET count → 5
Client A: SET count 6
Client B: SET count 6
```

One increment is lost.

Safer:

```
INCR payment:request-count
```

Both increments are applied.

Important: Redis transactions do not provide the same rollback semantics as a relational database transaction. A `MULTI` / `EXEC` block is not an all-or-nothing rollback system for every runtime command error.

## 7. Redis Locks and Distributed Coordination

### Subtopics

- `SET NX EX`: A basic building block for acquiring a lock with an expiry.
- Lock owner token: A unique value identifying the process that acquired the lock.
- Safe release: Delete the lock only if the stored token matches the owner's token.
- Lock expiry: Helps prevent a dead process from holding a lock forever.
- Lease: A lock valid for a limited time.
- Fencing token: A monotonically increasing token that a downstream resource can use to reject stale lock holders.
- Redlock: A Redis-based distributed locking algorithm with specific assumptions and trade-offs.
- Lock timeout risk: A process can continue working after its lock expires, so another process may acquire the lock.

### Example

```
SET lock:payment:PAY101 unique-token NX EX 30
```

This attempts to acquire a 30-second lock. If the command succeeds, the caller acquired it.

To release the lock, compare the token and delete atomically, typically using a Lua script. Do not blindly execute `DEL lock:payment:PAY101`, because the lock may now belong to another process.

Payment-specific rule: A Redis lock alone does not guarantee a payment happens exactly once. Use database constraints, idempotency keys, and payment-provider idempotency where available.

## 8. Redis in Java / Spring Boot

### Subtopics

- Spring Data Redis: Provides Spring abstractions for accessing Redis.
- `RedisTemplate`: Provides Redis operations for different data types.
- `StringRedisTemplate`: A convenient template for string-oriented keys and values.
- Lettuce: A Redis client commonly used by Spring Boot.
- Jedis: Another Redis client.
- Serialization: Converting Java objects into a representation Redis can store.
- Connection pooling: Reusing connections where the selected client/configuration supports pooling.
- Redis cache abstraction: Spring's `@Cacheable`, `@CachePut`, and `@CacheEvict` can integrate with Redis.

### Example

```
@Service
public class PaymentService {

    private final StringRedisTemplate redis;

    public PaymentService(StringRedisTemplate redis) {
        this.redis = redis;
    }

    public void cacheStatus(String id, String status) {
        redis.opsForValue().set(
            "payment:" + id,
            status,
            Duration.ofMinutes(5)
        );
    }

    public String getStatus(String id) {
        return redis.opsForValue().get("payment:" + id);
    }
}
```

In a real application, ensure imports, Redis connectivity, configuration, and error handling are in place.

## 9. Redis Persistence, Replication and Scaling

### Subtopics

- RDB: Creates point-in-time snapshots of Redis data.
- AOF (Append Only File): Records write operations for replay during recovery.
- Replication: Copies data from a primary to replicas.
- Primary-replica architecture: The primary accepts writes; replicas can serve reads depending on configuration and application design.
- Replication lag: A replica may temporarily be behind the primary.
- Redis Sentinel: Helps monitor Redis deployments and coordinate failover.
- Redis Cluster: Distributes keys across shards and supports horizontal scaling.
- Sharding: Splitting data across multiple nodes.
- Persistence trade-off: Durability depends on configuration and failure scenario; a successful Redis write does not always mean the data is safely stored on disk.
- Cache failure strategy: Decide whether to fail the request, fall back to the database, or use another controlled behavior if Redis is unavailable.

### Common interview question: Redis vs database

| Redis                                                         | PostgreSQL / MySQL                            |
| ------------------------------------------------------------- | --------------------------------------------- |
| Primarily in-memory                                           | Primarily disk-backed                         |
| Very fast key-based access                                    | Rich queries and relational constraints       |
| Great for caching, counters, short-lived state                | Great for durable transactional business data |
| Supports persistence, but durability depends on configuration | Designed for durable data storage             |
| Limited query model compared with SQL                         | Joins, indexes, constraints, transactions     |

Rule: For payment records, use a durable database as the source of truth. Redis can accelerate reads, coordinate work, or store temporary information.
