# Coverage: Redis
Reference: reference/redis.md  ·  Last updated: 20-10-2026

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
