# Coverage: Redis
Reference: reference/redis.md  ·  Last updated: 21-10-2026

Every reference item (key list: the numbered sections, plus each question, pattern and "X vs Y" row inside them) appears in exactly
one of Mapped, Corrected or Dropped. A section whose parts went to different places has one row here (Corrected wins over
Mapped), and its other parts are listed under "Details placed elsewhere or cut". Sources for corrections are primary pages.

## Mapped
| Reference item (key + short title) | Landed in | Note |
|---|---|---|
| D0 Intro: scope and the payment running example (UPI, card, wallet) | concept redis-playbook (Example Steps, Interview Q "Where does Redis fit in a payment service?") | ₹500 PAY101 by UPI reused; keys payment:PAY101, merchant:42:config, rate:user:7:upi, lock:payment:PAY101 |
| D1.R1 Database stays the source of truth; cache not authoritative | concept what-is-redis (trap); glossary `source-of-truth` |  |
| D3.R1 Expiry is not a timed callback | concept ttl-and-expiration (trap, sayIt, hook) | Backed by the keyspace-notifications timing section |
| D4.S2 Penetration: validate inputs, cache missing results briefly | comparison `stampede-vs-penetration-vs-avalanche` (first fix); example |  |
| D4.S3 Avalanche: spread expiry, control DB load | comparison (TTL jitter, warm the cache); cache-problems Q (limit DB calls → redis-failure-handling) |  |
| D4.S4 Stale data: invalidate or update after DB change | concept `cache-invalidation` (Steps, trap, Q on delete vs update) | Made precise: delete after the commit |
| D5.P1 TTL vs eviction (a key without TTL can still be evicted) | concept eviction-policies (trap); comparison ttl-vs-eviction | ttl-and-expiration lists the comparison in confusedWith |
| D6 (part: atomic command); D6 (part: race condition); D6 (part: MULTI/EXEC); D6 (part: DISCARD); D6 (part: WATCH); D6 (part: optimistic locking); D6 (part: Lua scripting); D6 (part: distributed lock) | concept `single-command-atomicity` (points, How it works); glossary `race-condition-term`; concept `single-command-atomicity` (table); concept `transactions-multi-exec` (points, Steps, example); glossary `multi-term`, `exec-term`, `redis-transaction-term`; concept `transactions-multi-exec` (How it works bullet); tree `discard-cmd`; glossary `discard-term`; concept `transactions-multi-exec` (points, Steps); tree `watch-cas`; glossary `watch-term`; concept `transactions-multi-exec` (Why, Steps); glossary `optimistic-locking-term`; concept `lua-and-functions`; glossary `lua-script-term`; glossary distributed-lock; concept distributed-locks | "a single command such as INCR is atomic" added: expiry and eviction also abort EXEC |
| D6.P1 INCR vs GET + SET (lost update) | concept `single-command-atomicity` (How it works table, trap, hook); tree `lost-update-race`; glossary `lost-update-term`; spine step 1 | the reference's two-client timeline is redrawn as a table with the payment counter |
| D7.P1 Safe token-checked release vs blind DEL | concept distributed-locks (trap) |  |
| D7.R1 A Redis lock alone does not make a payment exactly-once | concept distributed-locks (sayIt, Interview Q "exactly once"); glossary idempotency-key | DB unique constraint + idempotency key + provider idempotency |
| D8.P1 RedisTemplate vs StringRedisTemplate | comparison redistemplate-vs-stringredistemplate; concept spring-data-redis (trap, confusedWith) |  |
| D8.P2 Lettuce vs Jedis | comparison lettuce-vs-jedis; concept spring-data-redis (point, confusedWith) |  |
| D9.Q1 Question: Redis vs database | concept redis-and-databases (embeds comparison redis-vs-database; Interview Qs) |  |
| D9.T1 Primarily in-memory vs primarily disk-backed | comparison redis-vs-database (rows "Data lives", "Size") |  |
| D9.T2 Fast key-based access vs rich queries and relational constraints | comparison redis-vs-database (rows "Access", "Rules on data") |  |
| D9.T3 Caching, counters, short-lived state vs durable transactional business data | comparison redis-vs-database (row "Best for") |  |
| D9.T4 Persistence depends on configuration vs designed for durable storage | comparison redis-vs-database (row "After a crash"); concept redis-and-databases (trap) | fsync detail left to persistence-rdb-aof (link). |
| D9.R1 Payment records live in a durable database; Redis accelerates or coordinates | concept redis-and-databases (hook, point "Payments", trap, sayIt, Example) | Exactly-once rule left to distributed-locks (link). |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| D1 (part: "In-memory: data is primarily served from RAM") | Loose: in Redis Open Source the whole data set lives in RAM; it cannot be larger than memory (RAM/flash tiering is a Redis Software feature, not Open Source) | "the whole data set lives in RAM; disk only holds copies"; tree note `redis-in-memory` | https://redis.io/docs/latest/develop/get-started/faq/ |
| D2 (part: Pub/Sub, "no durable history"); D2 (part: List, "ordered collection"); D2 (part: the list of types as a whole) | Listed among the data types; "Ordered" reads as sorted; Outdated: misses the types bundled since Redis 8.0 | Pub/Sub is a messaging feature with no relation to the keyspace; at-most-once, nothing stored (concept `pub-sub`, point "Not a data type"); Ordered by insertion, not sorted; duplicates allowed (concept `lists`, points); JSON, Redis Search, time series, five probabilistic types and vector sets are part of Redis Open Source 8.0+ (concept `json-and-query-engine`, trap) | https://redis.io/docs/latest/develop/pubsub/ ; https://redis.io/docs/latest/develop/data-types/ ; https://github.com/redis/redis/releases/tag/8.0.0 |
| D3 (part: TTL key returns remaining TTL in seconds) | Incomplete: misses the special replies | -1 = key has no TTL, -2 = key does not exist | https://redis.io/docs/latest/commands/ttl/ |
| D4 (part: read-through); D4 (part: write-through) | Reads as if the cache (Redis) fetches missing data by itself; "Together according to its implementation" is vague | Redis Open Source never calls your database; read-through needs a library or integration layer, otherwise the app does cache-aside (trap in caching-strategies); A write returns only after both cache and DB are updated (synchronous); with Redis the app writes both | https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside ; https://redis.io/solutions/use-cases/caching ; https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html ; https://docs.oracle.com/en/middleware/standalone/coherence/14.1.1.2206/develop-applications/caching-data-sources.html |
| D4.S1 (part: TTL jitter as a stampede fix) | Jitter spreads the expiry of many keys; it does not stop many callers rebuilding one hot key | TTL jitter moved to avalanche; stampede gets the rebuild lock and early refresh | https://aws.amazon.com/caching/best-practices/ ; https://www.vldb.org/pvldb/vol8/p886-vattani.pdf |
| D5 (part: the policy list) | Lists 5 policies (noeviction, allkeys-lru, allkeys-lfu, volatile-lru, volatile-ttl) as if complete | 10 policies in Redis Open Source 8.10: also volatile-lfu, allkeys-random, volatile-random, and allkeys-lrm / volatile-lrm (since Redis 8.6); volatile-* acts like noeviction when no key has a TTL | https://redis.io/docs/latest/develop/reference/eviction/ ; https://github.com/redis/redis/blob/8.10.2/redis.conf |
| D6.P2 MULTI/EXEC vs relational transaction (no rollback) | Loose: "not an all-or-nothing rollback system for every runtime command error" suggests a partial rollback exists | Redis never rolls back. A run-time error fails only that command and the rest apply; an error while queueing (syntax, out of memory) makes EXEC refuse the whole block with EXECABORT (Redis 2.6.5+). Landed in concept `transactions-multi-exec` (trap, points, Interview Q 1), tree `tx-runtime-error`, `tx-queue-error` | https://redis.io/docs/latest/develop/using-commands/transactions/ ; https://github.com/redis/redis/blob/8.10.2/src/multi.c |
| D7 (part: safe release "typically using a Lua script") | Outdated for Redis 8.x: presents a Lua script as the way to compare and delete | Since Redis 8.4, `DELEX key IFEQ token` does it in one command; the Lua script is for older versions (both shown) | https://redis.io/docs/latest/commands/delex/ |
| D8 (part) Lettuce "a client commonly used by Spring Boot" | Understated and vague | Lettuce is the default client of spring-boot-starter-data-redis (Spring Boot 4.1); its native connection is thread-safe and shared | https://docs.spring.io/spring-boot/reference/data/nosql.html ; https://docs.spring.io/spring-data/redis/reference/redis/drivers.html |
| D9 (part: Redis Sentinel "helps monitor and coordinate failover") | Understated: Sentinel itself runs the automatic failover, and it is also the clients' configuration provider and a notifier | Sentinel monitors, notifies, promotes a replica itself (quorum to detect, majority to authorise) and tells clients the primary's address | https://redis.io/docs/latest/operate/oss_and_stack/management/sentinel/ |
| D9.T5 Limited query model vs joins, indexes, constraints, transactions | Outdated for Redis 8: the Query Engine (secondary indexes, search, aggregation) is built into Redis Open Source since 8.0; still no joins or constraints | Row "Access": "By key; Query Engine indexes built in since 8.0" vs "SQL queries with joins and indexes"; row "Rules on data" for constraints | https://redis.io/docs/latest/develop/whats-new/8-0/ |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| Why Redis is fast: one main thread, non-blocking I/O, slow commands block everyone | concept what-is-redis (points, Mermaid, Interview Q) | The most asked Redis basics question (GeeksforGeeks Q4). |
| I/O threads (io-threads, off by default) and background threads | concept what-is-redis (Defaults); tree `redis-io-threads`, `redis-background-threads`; glossary | Interviewers ask "is Redis really single-threaded?". |
| Redis vs Memcached | concept redis-and-memcached; comparison redis-vs-memcached | Classic interview question (GeeksforGeeks Q26); not in the reference. |
| KEYS vs SCAN, cursor, MATCH, COUNT, TYPE; key naming and length | concept key-design; tree; glossary | Common production trap; reference lists commands only. |
| Licences (BSD, RSALv2/SSPLv1, AGPLv3), Redis Stack merge, Valkey fork | concept redis-licensing-and-forks; glossary | Current-state facts the reference does not mention. |
| Managed services: ElastiCache, MemoryDB, Azure Managed Redis | tree `managed-redis-services`; glossary | Interviewers ask what you run in the cloud. |
| redis-cli, RESP | glossary | Interviewer words used across the tech. |
| Bitfields (BITFIELD, overflow WRAP/SAT/FAIL) | concept `bitmaps-hyperloglog`; tree `bitfield-command` | Listed as a type in the Redis docs; scope note |
| SET options NX/XX, KEEPTTL, IFEQ (Redis 8.4+); SET drops the old TTL | tree under `strings`; trap in `strings` | Common interview gotcha; current SET options |
| Hash field expiration (Redis 7.4+), HSETEX/HGETEX (8.0) | concept `hashes` (trap); tree `hash-field-expiry` | Newer feature interviewers ask about |
| Capped lists (LTRIM), blocking pops (BLPOP/BRPOP) | concept `lists` | Standard list uses |
| Set algebra, SSCAN | concept `sets` (table); tree | Common set questions |
| Sorted set internals (skip list + hash table), ZRANGE REV/BYSCORE (6.2), tie order | concept `sorted-sets` | Asked in leaderboard questions |
| Consumer groups: PEL, XACK, XAUTOCLAIM (6.2), MAXLEN ~ trimming; stream idempotency IDMP (8.6, one line) | concept `streams`; tree | Core stream interview angle; 8.6 confirmed on docs page |
| JSON, Redis Search, time series, probabilistic types, vector sets, arrays (8.8, tree node only) | concept `json-and-query-engine`; tree | Redis 8 bundles them |
| Sharded Pub/Sub (7.0), PSUBSCRIBE, keyspace notifications (off by default) | concept `pub-sub`; tree | Cluster and expiry-event questions |
| Geo limits (poles, 0.5% distance error), longitude-first trap | concept `geospatial` | Real gotchas from the command pages |
| String vs hash vs JSON | comparison `string-vs-hash-vs-json` | Classic "how do you store an object" question |
| Hot keys: --hotkeys (LFU only), HOTKEYS (Redis 8.6+), client-side caching (Redis 6+), key copies, replicas | concept `cache-problems` (points, tree, Q) | Commonly asked next to stampede; lead's scope |
| Cache hit ratio from INFO keyspace_hits/misses | concept `cache-aside` (point, tree) | How to show a cache works |
| Refresh-ahead | concept `caching-strategies` (point, tree, glossary) | Named pattern in strategy questions |
| Evict after commit (Spring transactionAware) and CDC invalidation (Facebook mcsqueal, Redis Data Integration) | concept `cache-invalidation` | Correct ordering and multi-writer setups |
| Delete vs update (deletes are idempotent) | concept `cache-invalidation` (point, Q) | Classic interview question |
| Bloom filter as penetration filter; probabilistic early refresh | concept `cache-problems` | Standard fixes interviewers expect |
| Avalanche from an empty restarted node; cache warming | concept `cache-problems` (comparison, Q); tree under cache-aside | AWS describes the same flood on a new empty node |
| Spring Boot 4.1 defaults (TTL never, null cached, cacheName:: prefix), starters, @EnableCaching placement, self-invocation trap, sync with the Redis cache writer, per-cache TTL, @CacheEvict timing | concept `spring-cache-abstraction` | Needed to use the annotations correctly |
| A plain SET drops the TTL; KEEPTTL (Redis 6.0+) keeps it; INCR/HSET/LPUSH keep it | ttl-and-expiration (table, Interview Q) | A very common real bug and interview follow-up |
| Lazy and active expiry; replicas wait for the primary's DEL | ttl-and-expiration (tree, Interview Q) | "How does Redis expire keys?" is a standard question |
| EXPIRE NX/XX/GT/LT (Redis 7.0+), PERSIST, clock-based expiry | ttl-and-expiration (tree, table, points) | Complete the TTL command set |
| Approximated LRU/LFU and maxmemory-samples; LRM (Redis 8.6+); Defaults table | eviction-policies | Defaults and "is LRU exact?" are commonly asked |
| Concept memory-optimization: big keys, --bigkeys/--memkeys, UNLINK vs DEL, listpack/intset defaults | memory-optimization | Big keys and UNLINK come up in production-style interviews |
| Pipelining, round-trip time, variadic MGET/MSET, batch size, syscall saving | concept `pipelining`, tree, glossary | common interview question; master.json adds it |
| Pipelining vs MULTI/EXEC vs Lua | comparison `pipelining-vs-multi-exec-vs-lua` | the three are often confused; one prep page even calls pipelines atomic |
| INCRBY/DECR/HINCRBY/INCRBYFLOAT, counter pattern with a TTL | concept `single-command-atomicity`, tree | counters are a top Redis question |
| SET NX, GETDEL/GETEX (Redis 6.2+), SET IFEQ (Redis 8.4+) | concept `single-command-atomicity` (point, example), tree | single-command check-and-set; IFEQ is the new simple CAS |
| Replies only at EXEC (cannot branch inside MULTI) | concept `transactions-multi-exec` (point) | the key reason to choose Lua |
| Spring Data Redis `SessionCallback` for MULTI/EXEC | concept `transactions-multi-exec` (Interview Q) | a common Spring pitfall: different connections |
| EVAL/EVALSHA/FCALL, script cache, NOSCRIPT, KEYS vs ARGV, redis.call vs pcall | concept `lua-and-functions`, tree, glossary | asked whenever Lua comes up |
| Busy scripts: busy-reply-threshold 5000 ms, BUSY, SCRIPT KILL, SHUTDOWN NOSAVE | concept `lua-and-functions` (trap, Defaults), tree | the classic Lua trap |
| Redis Functions (Redis 7.0+), FUNCTION LOAD | concept `lua-and-functions`, tree, glossary | modern replacement for EVAL |
| MSETEX (Redis 8.4+) | tree `msetex-cmd` | changes the old "MSET cannot set a TTL" answer |
| Spring `executePipelined` | concept `pipelining` (example), tree | Java baseline |
| Plain SET NX and Redlock give no fencing number; Redisson RFencedLock does | distributed-locks bullet; tree lock-redisson-fenced | Interviewers follow fencing with "where does the number come from?" |
| Failover can lose a lock (async replication) | distributed-locks bullet | Stated on the Redis locks page; common follow-up |
| Redlock debate (Kleppmann vs antirez) | distributed-locks bullet; tree lock-redlock | Scope note; asked in senior interviews |
| Redisson RLock and watchdog (30 s default); RedissonRedLock deprecated | tree lock-redisson; glossary redisson | Main Java lock library |
| Rate limiting: fixed window, sliding log, sliding counter, token bucket, INCREX (8.8), 429 + Retry-After | concept rate-limiting-with-redis; comparison; tree; glossary | Reference names rate limiting only as a use case (D1) |
| Shared sessions: sticky sessions, hash per session, idle TTL, Spring Session | concept session-storage; tree; glossary | Reference names sessions only as a use case (D1) |
| Queues: LPUSH + BRPOP, reliable queue with BLMOVE, delayed jobs in a sorted set, streams, Kafka | concept queues-with-redis; comparison; tree; glossary | Reference has no queue section |
| appendfsync always / everysec / no and the loss window | `rdb-vs-aof`, `persistence-rdb-aof` (trap, Defaults, Q) | The most asked persistence follow-up |
| fork + copy-on-write, fork latency on big datasets | `persistence-rdb-aof` (points, Q); glossary | Common "why does Redis pause" question |
| Multi-part AOF (Redis 7.0+), AOF rewrite, RDB-format base file | `persistence-rdb-aof` (How it works); tree | Current file layout since 7.0 |
| No persistence for a pure cache; RDB + AOF together; backups | `persistence-rdb-aof` (hook, points, verdict); tree | Choosing a setup is the usual question |
| Full sync vs partial resync (PSYNC, backlog) | `replication`; tree; glossary | Explains reconnect cost |
| WAIT and min-replicas-to-write, not strong consistency | `replication` (points, Q); tree | Common consistency question |
| Primary with persistence off + auto restart wipes replicas | `replication` (Interview Q) | Documented failure mode |
| Replicas are not backups | `replication` (trap) | Common wrong answer |
| Quorum vs majority, at least 3 Sentinels, SDOWN/ODOWN, split brain | `sentinel`; tree; glossary | Core of every Sentinel question |
| Spring Boot `spring.data.redis.sentinel.*` and `spring.data.redis.cluster.nodes` | `sentinel`, `redis-cluster` (bullets) | Java backend focus |
| Hash slots, CRC16, hash tags, CROSSSLOT, MOVED vs ASK, database 0, cluster bus | `redis-cluster`; tree; glossary; `sentinel-vs-cluster` | The reference names Cluster only in one line |
| Sentinel vs Cluster | comparison `sentinel-vs-cluster` | A commonly confused pair |
| Picker table "problem → Redis tool → concept" | redis-playbook How it works | Owner's easy-to-remember picker; answers the most common "which type?" question |
| Answer frame (shape, key, life, races, loss, down) | redis-playbook Example Steps + points | Gives a repeatable structure for any Redis design question |
| redis.io data-type families (documents, collections, sequences, specialised) | redis-playbook tree | Redis's own decision rules for choosing a type |
| JDK serialisation default and its security risk; JacksonJsonRedisSerializer (Jackson 3, 4.0+) | spring-data-redis | Most common Spring Data Redis surprise; class names changed in Spring Data Redis 4.0 |
| Boot bean replacement rule (redisTemplate by name) | comparison redistemplate-vs-stringredistemplate | Frequent configuration mistake |
| ReactiveRedisTemplate (Lettuce only), @RedisHash repositories | spring-data-redis tree; glossary | Interviewers name them; one line each |
| Lettuce auto-reconnect with command buffering | redis-failure-handling point; lettuce-vs-jedis row | Explains behaviour during an outage |
| Command timeout default 60 s; spring.data.redis.timeout / connect-timeout | redis-failure-handling | A 60 s wait is the usual cause of hung requests when Redis dies |
| Circuit breaker (Resilience4j as example) | redis-failure-handling bullet, tree, glossary | Standard way to fail fast |
| CacheErrorHandler / LoggingCacheErrorHandler | redis-failure-handling Example, tree, glossary | Spring Cache rethrows Redis errors by default |
| Fail open vs fail closed | redis-failure-handling table, Interview Q, glossary | Asked for rate limiters and locks |
| INFO, SLOWLOG, latency monitor | redis-failure-handling tree, Interview Q, glossary | "How do you debug Redis slowness?" is commonly asked |

## Dropped
| Reference item | Reason (rare / advanced / duplicate / unverifiable) |
|---|---|
| (no whole item) | |

### Details placed elsewhere or cut, inside items listed above
| Reference item part | What happened |
|---|---|
| D1 (part: Redis is an in-memory data store for caching, counters, sessions, short-lived data) | also: concept what-is-redis (hook, points, How it works link list); tree `redis-common-uses` |
| D1 (part: key-value store, values indexed by keys) | also: concept what-is-redis (points "Key → typed value"); glossary `key-value-store` |
| D1 (part: "Redis is not just a cache": counters, rate limiting, ephemeral state, messaging) | also: concept what-is-redis (Interview Q "Is Redis only a cache?", link list) |
| D1 (part: cache) | also: glossary `cache-redis-term` |
| D1 (part: cache hit, cache miss) | also: glossary `cache-hit-term`, `cache-miss-term` |
| D1 (part: example flow, check Redis → hit/miss → PostgreSQL → store) | also: concept `cache-aside` (Mermaid) |
| D1 (part: merchant config example) | also: concept `cache-aside` (Why, Example, Mermaid) |
| D1 (part: TTL) | also: glossary ttl |
| D1 (part: eviction) | also: glossary eviction-term |
| D1 (part: atomic operation) | also: glossary `atomic-operation-term`; concept `single-command-atomicity` |
| D1 (part: persistence, survive process or machine failures) | also: concept `persistence-rdb-aof` (Why it exists); glossary `persistence-redis` |
| D1 (part) "Redis is not just a cache": counters, rate limiting, ephemeral state, messaging | also: concept redis-playbook (picker table rows) |
| D2 (part: example key names like payment:PAY101) | also: concept key-design (How it works table, Example) |
| D2 (part: String: text, numbers, serialised JSON, bytes) | also: concept `strings` (hook, points) |
| D2 (part: Hash: fields under one key, object-like) | also: concept `hashes` |
| D2 (part: example HSET payment:PAY101:details / HGET) | also: concept `hashes` (Example) |
| D2 (part: Set: unique values) | also: concept `sets` |
| D2 (part: example SADD twice, SCARD returns 1) | also: concept `sets` (Example) |
| D2 (part: Sorted Set: unique members by score, rankings, leaderboards) | also: concept `sorted-sets` |
| D2 (part: Stream: append-only log with IDs, consumer groups) | also: concept `streams` |
| D2 (part: Bitmap: bit operations on strings) | also: concept `bitmaps-hyperloglog` (points, table) |
| D2 (part: HyperLogLog: distinct count, little memory) | also: concept `bitmaps-hyperloglog` (points, trap) |
| D2 (part: Geospatial: coordinates, nearby queries) | also: concept `geospatial` |
| D2 (part: Pub/Sub vs Stream contrast) | also: comparison pub-sub-vs-lists-vs-streams; concept queues-with-redis (trap) |
| D3 (part: SET / GET as the basic command shape) | also: concept what-is-redis (Example) |
| D3 (part: DEL, EXISTS, MGET) | also: concept key-design (Example; tree `key-inspect-commands`, `key-multi-read`) |
| D3 (part: SET key value) | also: concept `strings` (Example, How) |
| D3 (part: GET key) | also: concept `strings` (Example) |
| D3 (part: MGET) | also: concept `strings` (Interview Q); tree `mget-mset` |
| D3 (part: SET key value EX seconds) | also: tree `set-ex-px` |
| D3 (part: INCR, command name only) | also: concept `strings` (How table, link to `single-command-atomicity`) |
| D3 (part: HSET / HGET) | also: concept `hashes`; tree `hset-hget` |
| D3 (part: LPUSH / RPUSH) | also: concept `lists`; tree `list-push-pop` |
| D3 (part: SADD / SISMEMBER) | also: concept `sets`; tree `set-sadd-sismember` |
| D3 (part: ZADD / ZRANGE) | also: concept `sorted-sets` (trap, Example); tree `zset-zrange` |
| D3 (parts: EXPIRE, TTL, SET EX) | also: concept ttl-and-expiration (How it works table, points, Example) |
| D3 (part: SET NX EX as TTL syntax) | also: concept ttl-and-expiration (table row SET EX/PX); NX as a lock primitive is owned by distributed-locks (other unit) |
| D3 (part: INCR) | also: concept `single-command-atomicity` (points, example); tree `incr-family`; glossary `incr-term` |
| D4 (part: cache-aside / lazy loading) | also: concept `cache-aside`; glossary `cache-aside-term` (aka lazy loading) |
| D4 (part: example code, cache-aside with 5-minute TTL) | also: concept `cache-aside` (Example, StringRedisTemplate) |
| D4 (part: write-behind / write-back) | also: concept `caching-strategies` (points, bullets, Q); comparison row; glossary `write-behind-term` |
| D4 (part: cache invalidation) | also: concept `cache-invalidation`; glossary `cache-invalidation-term` |
| D4 (part: stale data) | also: concept `cache-invalidation`; glossary `stale-data-term` |
| D4 (part: cache stampede) | also: concept `cache-problems`; comparison `stampede-vs-penetration-vs-avalanche`; glossary `cache-stampede-term` |
| D4 (part: cache penetration) | also: concept `cache-problems` (trap, comparison); glossary `cache-penetration-term` |
| D4 (part: cache avalanche) | also: concept `cache-problems` (comparison, Q); glossary `cache-avalanche-term` |
| D4 (part: negative caching) | also: concept `cache-problems` (comparison, example); tree `negative-cache-entry`; glossary `negative-caching-term` |
| D4.S1 Stampede: request coalescing, controlled refresh | also: concept `cache-problems` (rebuild lock, early refresh); glossary `request-coalescing-term` |
| D5 (part: TTL) | also: concept ttl-and-expiration; glossary ttl |
| D5 (part: example short TTL for status, longer for config) | also: concept ttl-and-expiration (How it works bullet, sayIt) |
| D5 (parts: maxmemory, eviction policy, noeviction, allkeys-lru, volatile-lru, volatile-ttl, LRU, LFU) | also: concept eviction-policies (flow, points, Defaults); tree evict-*; glossary maxmemory, eviction-policy, noeviction, allkeys-lru, volatile-lru, volatile-ttl, lru, lfu |
| D7 (part: SET NX EX) | also: concept distributed-locks (points "Acquire", Example); tree lock-set-nx-px |
| D7 (part: lock owner token) | also: tree lock-owner-token; glossary lock-owner-token-term; Example |
| D7 (part: safe release) | also: concept distributed-locks (points "Release", Example script); tree lock-safe-release, lock-release-script; glossary safe-release-term |
| D7 (part: lock expiry) | also: tree lock-lease; glossary lock-lease-term (aka lock expiry) |
| D7 (part: lease) | also: tree lock-lease; glossary lock-lease-term |
| D7 (part: fencing token) | also: concept distributed-locks (points, Mermaid diagram); tree lock-fencing-token; glossary fencing-token |
| D7 (part: Redlock) | also: tree lock-redlock (N=5, majority 3); bullet on the Kleppmann/antirez debate; glossary redlock, clock-drift |
| D7 (part: lock timeout risk) | also: concept distributed-locks (point "Lease runs out", diagram, Interview Q "work longer than the lease"); glossary process-pause |
| D7 (part: example SET lock:payment:PAY101 ... NX EX 30) | also: concept distributed-locks Example |
| D8 (part: Redis cache abstraction @Cacheable, @CachePut, @CacheEvict) | also: concept `spring-cache-abstraction`; comparison `cacheable-vs-cacheput`; glossary terms |
| D8 (part) Spring Data Redis | also: concept spring-data-redis (hook, Why, picture); glossary spring-data-redis-term |
| D8 (part) RedisTemplate | also: concept spring-data-redis (points, Example); tree sdr-redis-template; glossary redistemplate-term |
| D8 (part) StringRedisTemplate | also: concept spring-data-redis; tree sdr-string-redis-template; glossary stringredistemplate-term |
| D8 (part) Jedis "another Redis client" | also: comparison lettuce-vs-jedis; tree sdr-jedis; glossary jedis-client |
| D8 (part) Serialization | also: concept spring-data-redis (trap, point, Defaults, Interview Q); tree sdr-serializers + 3 children; glossary redis-serializer, jdk-serialisation |
| D8 (part) Connection pooling | also: concept spring-data-redis (bullet, Interview Q "pool with Lettuce?"); glossary redis-connection-pool |
| D8 (part) Example PaymentService (StringRedisTemplate set with 5-minute Duration, get) | also: concept spring-data-redis Example (typed template, set with Duration.ofMinutes(5) on payment:PAY101) |
| D8 (part) "ensure connectivity, configuration and error handling" | also: concept redis-failure-handling; spring-data-redis bullet on spring.data.redis.* |
| D9 (part: RDB, point-in-time snapshots) | also: comparison `rdb-vs-aof`; tree `rdb-snapshot`; glossary `rdb-term` |
| D9 (part: AOF, write log replayed on recovery) | also: comparison `rdb-vs-aof`; tree `aof-log`; glossary `aof-term` |
| D9 (part: persistence trade-off, "a successful write is not always on disk") | also: concept `persistence-rdb-aof` (trap) |
| D9 (part: replication, primary to replicas) | also: concept `replication` (hook, picture) |
| D9 (part: primary-replica architecture, replicas may serve reads) | also: concept `replication` (picture, Defaults: replica-read-only) |
| D9 (part: replication lag) | also: concept `replication` (point "Stale reads", Interview Q); glossary `replication-lag` |
| D9 (part: Redis Cluster distributes keys across shards) | also: concept `redis-cluster` |
| D9 (part: sharding, splitting data across nodes) | also: concept `redis-cluster`; glossary `sharding-term` |
| D9 (part) Cache failure strategy: fail, fall back to DB, or controlled behaviour | also: concept redis-failure-handling (table per use, trap, Interview Q "Redis goes down") |

## Owner addition (20-10-2026): Integration template: Redis (reference/redis.md from line 289; key I2)

Independently verified on 20-10-2026.

### Mapped
| Reference item | Landed in | Note |
|---|---|---|
| I2.a Q: How do you integrate Redis? | concept `redis-code-templates` (Interview Q 1) | answer rewritten: starter, properties, inject StringRedisTemplate, TTL on write |
| I2.b Flow: Spring Boot to RedisTemplate to Redis | already covered by `spring-data-redis` (Mermaid flow) | not repeated |
| I2.e "set saves, get reads" memory line | `redis-code-templates` picker table and points | |
| I2.f Most interview-friendly example: set/get user:1 | `redis-code-templates` set/get block (PaymentStatusStore) and Interview Q 2 | key renamed to the tech's payment example |
| I2.g Interview explanation (Redis as fast key-value cache via RedisTemplate) | `redis-code-templates` sayIt | "fast key-value cache" already owned by `what-is-redis` |

### Corrected
| Reference item | What was wrong | Fixed to | Source URL |
|---|---|---|---|
| I2.c RedisConfig: @Bean RedisTemplate<String,String> with only the connection factory | Not needed (Spring Boot auto-configures StringRedisTemplate and RedisTemplate), and without serialisers it JDK-serialises keys and values, so redis-cli sees `\xac\xed...user:1`, not `user:1` (reproduced) | Inject the auto-configured StringRedisTemplate, or set RedisSerializer.string(); Interview Q 2 | https://docs.spring.io/spring-boot/reference/data/nosql.html ; https://docs.spring.io/spring-data/redis/reference/redis/template.html |
| I2.d UserService saveUser/getUser with set("user:1", ...) | Writes with no TTL, through the JDK-serialising template above | StringRedisTemplate with `set(key, value, Duration)` and `get` returning null on a miss | https://docs.spring.io/spring-data/redis/docs/current/api/org/springframework/data/redis/core/ValueOperations.html |

### Added beyond the reference
| New item | Landed in | Why |
|---|---|---|
| Connection properties block (host, port, password, timeout) | `redis-code-templates`, tree `tpl-connection` | asked in the prompt; first thing written in an integration answer |
| INCR + EXPIRE in one Lua script (RedisScript) with the two-call trap | `redis-code-templates` block, trap, tree `tpl-counter-script` | asked in the prompt; Redis docs name the two-call race |
| SET NX lock in Java (setIfAbsent + token release script) | `redis-code-templates` block, tree `tpl-lock` | asked in the prompt; the lock concept had only redis-cli/Lua |
| RedisScript execution (EVALSHA then EVAL) | Interview Q 3, glossary `redis-script-term` | needed to explain the two script blocks |
| redis-cli block with real output | `redis-code-templates` | shows what the Java set/get sends |
| Picker links to cache-aside and @Cacheable skeletons | `redis-code-templates` table | prompt list; skeletons already exist there, so linked, not copied |

### Dropped
| Reference item | Reason |
|---|---|
| (none) | |

## Template v3 rewrite (21-10-2026)

Every concept and comparison was rewritten in teaching template v3 (CLAUDE.md 3.1.1) and given a cheat-sheet card; each reference item mapped above still lands in the same concept id. An independent pass then checked about 1,280 claims and fixed 27, removing none.

### Unit atomicity

**Added from the reference**

- Ref 6 "atomic command / race condition / INCR vs GET+SET" -> single-command-atomicity (What, Why, How table and steps, scenario 1).
- Ref 6 "MULTI/EXEC / DISCARD / WATCH / optimistic locking" -> transactions-multi-exec (What, Why, sequence diagram, Rules, scenarios).
- Ref 6 "no rollback like a relational transaction" -> transactions-multi-exec (trap, Not to be confused with, Interview Q 1).
- Ref 6 "Lua scripting executes atomically" -> lua-and-functions.
- Ref 7 "safe release via script" stays in distributed-locks (linked from single-command-atomicity Common mistakes).
- Beyond the reference (new, verified): INCREX (Redis 8.8+) as the one-command counter with expiry; DELEX (8.4+) compare-and-delete; a script error halfway does not undo earlier writes (run); EXECABORT vs run-time error (run); DISCARD unwatches; functions must be loaded on every cluster primary; errors in one pipelined command do not stop the others (run); "why pipelining helps on localhost" (system calls) Interview Q.

**Corrections**

- INCRBYFLOAT: the draft said it "works on double-precision floats, which round". The docs say the computation's internal precision varies and output is fixed at 17 decimal digits; a run of 0.1 + 0.2 printed "0.3". Reworded to "binary floating-point maths, where decimal amounts are not stored exactly", which holds. Source: https://redis.io/docs/latest/commands/incrbyfloat/
- SET IFEQ: added that it never creates a missing key and replies nil when the condition fails. Source: https://redis.io/docs/latest/commands/set/
- pipelining: How it works now uses a sequence diagram instead of embedding the comparison, and the comparison moved to confusedWith (it still shows under "Not to be confused with"). visual changed from table to flow.
- lua-and-functions: "## Defaults" table replaced by "Rules and defaults" (v3).

### Unit basics

**Added from the reference**

| Reference item | Concept |
|---|---|
| D1 in-memory, key-value, "not just a cache" | what-is-redis (What it is, Interview Q "Is Redis only a cache?") |
| D1.R1 database stays the source of truth | MOVED: from what-is-redis trap to redis-and-databases (point "Source of truth", Rules, Interview Q "Redis and the database disagree") |
| D3 SET/GET/DEL/EXISTS/TTL/EXPIRE/SET EX | what-is-redis Example (SET EX, GET, TYPE, INCR, miss = nil); ttl-and-expiration Example |
| D3 "expiry is not a timed callback" | ttl-and-expiration trap + scenario 2 |
| D5 TTL, maxmemory, policies, LRU/LFU, short TTL for status / longer for config | ttl-and-expiration (sayIt), eviction-policies (table of all 10 policies, LRU vs LFU section) |
| D5 trap: key without TTL can still be evicted | eviction-policies trap; ttl-vs-eviction example |
| D9 Redis vs database table and payment rule | redis-and-databases (Compare, scenarios) |
| D3 SET NX EX | redis-and-databases Example (lock line, details left to distributed-locks) |
Added beyond the reference (verified): "Is Redis really single-threaded?" Q (I/O threads off by default, background threads); numbered databases (16 by default) and Redis Cluster only db 0 (key-design); SCAN may return duplicates and empty batches; deleting keys by pattern safely (SCAN + UNLINK); TTL: set TTL in the same command, EXPIRE 0 deletes, replicas wait for the primary's DEL; eviction: buffers not counted against maxmemory, big writes overshoot, maxmemory 0 on a cache is a mistake, allkeys-lrm scenario; memory: Redis may not return freed memory to the OS, use hashes for small objects, big key vs hot key, lazyfree-lazy-user-del default no; licensing: check the version with INFO server.

**Corrections**

- None to the reference in these units. Draft wording tightened: what-is-redis no longer claims "under a microsecond" for commands in general; it says Redis's own processing is sub-microsecond (latency doc) and the network trip dominates.
- Licence table keeps "Redis 7.4 to 7.8": the redis.io licensing page says "Redis Community Edition 7.4.x to 7.8.x" in prose, though its table lists only 7.4.

### Unit caching

**Added from the reference**

| Reference item | Concept |
|---|---|
| D1 Redis basics: cache, cache hit, cache miss, "PostgreSQL stays the source of truth" | cache-aside What it is, Rules ("Source of truth") |
| D1 example flow (check Redis, hit / miss, PostgreSQL, store) | cache-aside Mermaid and steps 1-4 |
| D4 cache-aside code note "production code must handle serialisation, errors, concurrent misses" | cache-aside What to notice (concurrent misses), Interview Q 2 (errors); spring-cache-abstraction (Java serialisation default) |
| D4 read-through, write-through, write-behind, "data-loss risk" | caching-strategies What it is, steps 1-5, Rules |
| D4 cache invalidation, stale data, "invalidate or update after successful DB changes" | cache-invalidation What it is, Why, steps, Rules ("After the commit", "Delete rather than update") |
| D4 stampede / penetration / avalanche / negative caching and the common solutions | cache-problems What it is, steps (rebuild lock), Example (NX lock, NOT_FOUND EX 60, TTL jitter), Rules, scenarios |
| D8 Spring cache abstraction @Cacheable, @CachePut, @CacheEvict | spring-cache-abstraction (whole concept), Not to be confused with, cacheable-vs-cacheput explain / example |
Also added (beyond the reference, verified): cache-aside analogy (notepad, with its limit); "cache-aside not a good fit when most reads miss, or for sensitive data in a shared cache" (Azure); write-through needs a TTL and pairing with lazy loading (AWS); write-through by hand with SET and its reorder risk (caching-strategies Example); after-commit delete with `TransactionSynchronization.afterCommit` (cache-invalidation Example, run); TTL vs eviction vs invalidation rule; stale-set race after update-then-delete and Facebook leases (Common mistakes); "what if the delete fails" Interview Q; hot key vs big key rule; client-side caching invalidation messages (Redis docs); `HOTKEYS` (8.6+) and `--hotkeys` LFU requirement; Spring Boot advice against @EnableCaching on the main class; Boot's default Java serialisation for cache values; `unless = "#result == null"` and the error thrown when null caching is off; Spring Data Redis default writer takes no lock even with sync = true (from the 4.1.1 source), locking writer locks the whole cache; self-invocation Interview Q.

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| Draft spring-cache point "@EnableCaching on a @Configuration class, not the main class" stated as a rule | Now "Spring Boot advises against the main class" with the reason (caching becomes mandatory, including in tests) | Spring Boot 4.1 reference, Caching |
| Draft spring-cache Example cached `repo.load(id)` with cache-null-values=false and no `unless`; a null result would throw | Example now uses `unless = "#result == null"`; Rules explain the error | Spring Data Redis 4.1.1 source, RedisCache.processAndCheckValue (message names the fix) |
| Draft did not say values are Java-serialised by default, so cached classes must be Serializable | Added to What to notice and the Rules table | Spring Boot 4.1.1 source, RedisCacheConfiguration (JdkSerializationRedisSerializer); Spring Data Redis 4.1 reference, defaults table |
| Reference D4 "Write-through: writes go through the cache layer and underlying store together according to its implementation" (vague) | Kept the earlier correction: a write returns only after both hold the value; with plain Redis the app writes both | AWS ElastiCache Strategies; Azure Cache-Aside |
| Four-way comparison rows "Read side not set: pair it", "Not a write policy" were hard to read | "Not covered: pair it with a read pattern", "Not covered: it is a read pattern" | (wording only) |

### Unit coordination

**Added from the reference**

- 7 "Lock expiry helps prevent a dead process from holding a lock forever" → distributed-locks (Why it exists, step 4).
- 7 "Lock timeout risk" → distributed-locks (point "Lease can run out", scenario 1, Interview Q).
- 7 "Do not blindly DEL" → distributed-locks (trap with why; Example shows DELEX with the wrong token returning 0).
- 7 Payment rule (lock alone is not exactly-once) → distributed-locks (sayIt, cheat remember, scenario 3, Interview Q, "Not to be confused with": lock vs idempotency key).
- 6 "Distributed lock" definition → distributed-locks (What it is, contrasted with a JVM-local lock).
- 1 "Redis is not just a cache: counters, rate limiting, ephemeral state" → rate-limiting-with-redis and session-storage (Why it exists).
- New common mistakes: SET then EXPIRE (non-atomic lock), fixed lock value instead of a random token.

**Corrections**

- Lock release before Redis 8.4: the draft mixed redis-cli lines and Lua in one `lua` block. Now a real redis-cli run (bash + output) and a separate Lua script, both run on Redis 8.10.2. Source: https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/
- Redisson watchdog: the draft/tree implied it always renews; it renews only when the lock is taken without a lease time. Source: https://redisson.pro/docs/configuration/ (lockWatchdogTimeout).
- Session properties: confirmed Boot 4.1 names `spring.session.data.redis.namespace` and `.repository-type` (the Spring Session reference uses `spring.session.redis.*`; Boot's appendix uses `spring.session.data.redis.*`, which is what the site shows). Cookie default `SESSION` added (Spring Session 4.1 API docs).
- Session timeout: `spring.session.timeout` has no default of its own; it falls back to `server.servlet.session.timeout` (30m). Source: Spring Boot 4.1 Spring Session page + properties appendix.
- INCREX at the cap: replies `[current, 0]` and leaves the key and TTL alone (not an error). Source: https://redis.io/docs/latest/commands/increx/

### Unit data-types

**Added from the reference**

- D2 String / Hash / Set / Sorted Set / Stream / Bitmap / HyperLogLog / Geo / Pub/Sub one-liners → the "What it is" of each concept (already mapped; now taught step by step).
- D2 example (SET/GET, HSET/HGET, SADD twice, SCARD = 1) → strings, hashes and sets Examples (re-run with payment:9001).
- D3 SET NX EX, MGET, HSET/HGET, LPUSH/RPUSH, SADD/SISMEMBER, ZADD/ZRANGE → the matching concepts' How it works and Examples.
- D3 "SET ... EX" plus the TTL idea → strings trap: a plain SET drops the old TTL (shown by a real run: TTL returns -1). The full TTL rules stay in ttl-and-expiration (another unit); linked.
- D2 "Pub/Sub has no durable history" → pub-sub What it is, points, trap and the comparison's explain.

**Corrections**

- Draft strings trap (MSET atomic) moved to Common mistakes; new trap "SET keeps the old expiry" (wrong). Source: SET command page, "Any previous time to live associated with the key is discarded on successful SET operation".
- Draft hashes trap (field expiry) replaced by "field values are typed" (wrong: all values are strings); field expiry moved to points, Rules and an Interview Q. Source: hashes docs; HINCRBY on a text field gives "ERR hash value is not an integer" (run).
- Geo trap made precise: swapped latitude/longitude values inside the valid ranges are accepted silently (real run: GEOADD kiosks 12.97 77.59 returned 1; GEOPOS shows the swapped point). Only out-of-range values give an error (run: "ERR invalid longitude,latitude pair").
- Bitmap draft example had an exact count of SETBIT replies only in comments; the reply of SETBIT is the old bit (0), shown in the output panel.
- No reference statement in this unit was found to be wrong beyond the corrections already in redis.coverage.md (List "ordered" means insertion order; Pub/Sub is not a data type; Redis 8 bundles JSON and Search).

**Facts added or changed (verified 21-10-2026), about 36**

strings: SET discards old TTL; KEEPTTL (6.0); NX/XX (2.6.12); IFEQ (8.4.0); SET GET returns the old value; SET overwrites any type.
hashes: HSET returns number of new fields; values are strings; HDEL of the last field deletes the key (run); field count limited only by memory; HSCAN for big hashes; HGETEX/HSETEX (8.0).
lists: max 2^32 - 1 items; LPUSH puts the last argument at the head; key created on push and deleted with the last item; BRPOP timeout is a double in seconds; longest-waiting client is served first; keys checked in the order given; popped item lost on client crash.
sets: max 2^32 - 1 members; SDIFF keeps members of the first set only (order of keys matters, run); docs suggest Bloom filter or HyperLogLog for memory.
sorted-sets: score is a double, integers exact up to 2^53; ZADD on an existing member replaces its score; REV also reverses the tie order; ZREVRANGE, ZRANGEBYSCORE, ZREVRANGEBYSCORE deprecated as of 6.2.0; ZRANK/ZREVRANK 0-based.
streams: XGROUP CREATE $ vs 0, MKSTREAM (missing stream errors without it); XREADGROUP > vs any other id; NOACK skips the PEL; ids stay increasing if the clock moves back; XADD is O(1); one consumer group per service to give each all entries.
bitmaps-hyperloglog: up to 2^32 bits (512 MB string); setting a high bit allocates all bits below; BITOP; HLL stored as a string (GET/SET copy it); far below 12 KB while it has seen few items.
geospatial: valid ranges -180..180 and -85.05112878..85.05112878 (error outside); GEORADIUSBYMEMBER deprecated as of 6.2.0; geo index TYPE is zset (run).
json-and-query-engine: Redis 8 merged Redis Stack and Community Edition into Redis Open Source; vector sets beta in 8.0; FT.CREATE scans existing keys unless SKIPINITIALSCAN; Bloom filters cannot delete (Cuckoo filters can); the probabilistic type list.
pub-sub: channels ignore database numbers; RESP2 subscribed clients may only run subscribe-type commands, PING, RESET, QUIT, while RESP3 allows any; Cluster forwards PUBLISH to all nodes; the PUBLISH reply counts only clients on the same node.
New sources with verifiedOn 2026-10-21: 21 entries (about 14 new pages: SET, HSET, BLPOP, ZADD, ZREVRANGE, XREADGROUP, XGROUP CREATE, GEORADIUSBYMEMBER, What's new in 8.0, FT.CREATE, PUBLISH, plus re-checked lists, sets, sorted sets, hashes, streams, bitmaps, HyperLogLog, GEOADD, GEOSEARCH, Pub/Sub, Bloom filter pages).
Glossary additions: `S/add/redis/data-types.glossary.yaml` adds skip-list-term, at-most-once-term, fan-out-term and probabilistic-data-structure-term. at-least-once-term is already added by the coordination unit.

### Unit java

**Added from the reference**

| Item | Concept |
|---|---|
| D8 example "PaymentService with StringRedisTemplate, set with Duration.ofMinutes(5), get" | spring-data-redis Example (typed template, JSON) and redis-code-templates (PaymentStatusStore) |
| D8 "ensure connectivity, configuration and error handling" | spring-data-redis Common mistakes (old spring.redis.* names are not bound); redis-failure-handling |
| D9 "cache failure strategy: fail, fall back to DB or controlled behaviour" | redis-failure-handling Why, How it works steps, scenario 2 |
| Integration template "How do you integrate Redis?" + own RedisTemplate<String,String> bean | redis-code-templates Q1; spring-data-redis scenario 1 (JDK bytes key) and scenario 2 (bean named redisTemplate replaces Boot's) |
| New: login rate-limit interview question | redis-code-templates Interview Q 3 |
| New: "What would you not keep in Redis?" | redis-playbook Interview Q 3 |
| New: Lettuce buffering does not stop callers waiting | redis-failure-handling Common mistakes |

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| Reference's own `RedisTemplate<String, String>` bean with no serialisers | Its default JDK serialiser applies to keys too; real key seen as "\xac\xed\x00\x05t\x00\x12merchant:42:config" (run on Redis 8.10.2). Use StringRedisTemplate or RedisSerializer.string() | Spring Data Redis 4.1.1 template reference; real run |
| Draft "Example" had no property-name warning | Old `spring.redis.*` names have deprecation level error since 3.0.0, so Boot 4.1 does not bind them | spring-boot-data-redis 4.1.1 configuration metadata; Boot configuration-metadata format spec |
| Draft "templates are thread-safe; Lettuce shares one connection" | kept, plus: blocking commands and MULTI/EXEC need a dedicated connection | Spring Data Redis 4.1.1 drivers page |

### Unit memory

### Unit operations

**Added from the reference**

The reference (Part 2, section 9) has only one-line items here; all were already mapped. Teaching angles kept or added:
| Reference item | Concept |
|---|---|
| 9. Persistence trade-off: a successful write is not always on disk | persistence-rdb-aof (trap, trap.why, Example crash test, cheat remember) |
| 9. RDB point-in-time snapshots / AOF replayed on recovery | persistence-rdb-aof (What it is, How it works steps 2-6); rdb-vs-aof explain |
| 1. Persistence: survive process or machine failures | persistence-rdb-aof (Why it exists); "Not to be confused with" (persistence vs replica vs backup) |
| 9. Primary-replica, replicas may serve reads; replication lag | replication (What it is, scenario 1, Interview Q "Why read from replicas") |
| 9. Sentinel monitors and coordinates failover (coverage file already records the correction: Sentinel runs the failover itself) | sentinel (What it is, How it works) |
| 9. Cluster distributes keys across shards; sharding | redis-cluster (What it is, Why it exists) |

**Corrections**

| What | Fixed to | Source |
|---|---|---|
| Draft cluster diagram slot ranges 0-5500 / 5501-11000 / 11001-16383 | 0-5460 / 5461-10922 / 10923-16383, the ranges `redis-cli --cluster create` assigns to 3 primaries (real run) | Redis 8.10.2 run; scaling docs |
| Draft cluster example slot for `payment:PAY101` (4122) | Key renamed to the running example `payment:9001`, slot 6906 (real run) | CLUSTER KEYSLOT, Redis 8.10.2 |
New or changed facts checked on 21-10-2026: switching to AOF must be done live with CONFIG SET (restart with appendonly yes on an RDB-only server loads an empty AOF; confirmed by a real run); auto-aof-rewrite-percentage 100 / min-size 64mb semantics (redis.conf 8.10.2); appendfsync no = OS flush, usually 30 s on Linux (persistence docs); RDB safe to copy while running, hourly/daily backups (persistence docs); repl-diskless-sync yes and repl-diskless-sync-delay 5 (CONFIG GET on 8.10.2; replication docs); replicas do not expire keys, primary sends DEL, replica hides logically expired keys on reads (replication docs); replica offset/replication ID meaning (replication docs); persistence-off primary with auto-restart wipes replicas (replication docs); Sentinel replica selection order and replica-priority 0, default 100 (Sentinel docs; CONFIG GET); parallel-syncs 1, down-after 30000, failover-timeout 180000 (sentinel.conf 8.10.2 and SENTINEL MASTER on a real Sentinel); quorum vs majority, 5 Sentinels with quorum 2 example (Sentinel docs); min-replicas-to-write 1 + max-lag 10 makes an isolated old primary stop writes after 10 s (Sentinel docs); Cluster: nodes do not proxy, only database 0 and SELECT error (spec; real run), hash-tag first-{ rule (spec), 3 primaries minimum and 6 nodes recommended, resharding live (scaling docs), majority of primaries + NODE_TIMEOUT for failover (spec); Spring Boot 4.1.1 properties spring.data.redis.sentinel.master/nodes and spring.data.redis.cluster.nodes/max-redirects (application properties appendix).
New sources: none new beyond re-verified existing ones; the Spring Boot properties appendix URL was updated to the current unversioned page (it now serves 4.1.1) and added to redis-cluster.
