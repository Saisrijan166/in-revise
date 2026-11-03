import type { SyntaxSheet } from "./types";

export const redis: SyntaxSheet = {
  tagline: "The Redis commands per data type that you type at redis-cli every day.",
  baseline: "Redis 8",
  lang: "bash",
  groups: [
    {
      title: "Strings",
      rows: [
        { syntax: "SET key value", what: "Set a string value", example: "SET user:1 alice" },
        { syntax: "GET key", what: "Read a value (nil if missing)", example: "GET user:1" },
        {
          syntax: "SETEX key secs value",
          what: "Set with a TTL in one call",
          example: "SETEX session:1 3600 token",
        },
        {
          syntax: "SET key value EX secs",
          what: "Set with expiry (modern form)",
          example: "SET session:1 token EX 3600",
        },
        { syntax: "INCR key", what: "Atomic +1 (counter)", example: "INCR page:views" },
        { syntax: "DECR key", what: "Atomic -1", example: "DECR stock:42" },
        { syntax: "INCRBY key n", what: "Add n atomically", example: "INCRBY page:views 10" },
        { syntax: "APPEND key value", what: "Append to a string", example: "APPEND log abc" },
        { syntax: "MSET k1 v1 k2 v2", what: "Set many at once", example: "MSET a 1 b 2" },
        { syntax: "MGET k1 k2", what: "Get many at once", example: "MGET a b" },
      ],
    },
    {
      title: "Keys and expiry",
      rows: [
        { syntax: "EXISTS key", what: "1 if key exists else 0", example: "EXISTS user:1" },
        { syntax: "DEL key", what: "Delete one or more keys", example: "DEL user:1 user:2" },
        { syntax: "EXPIRE key secs", what: "Set a TTL on a key", example: "EXPIRE user:1 60" },
        {
          syntax: "TTL key",
          what: "Seconds left (-1 none, -2 gone)",
          example: "TTL user:1",
        },
        { syntax: "PERSIST key", what: "Remove the TTL", example: "PERSIST user:1" },
        { syntax: "TYPE key", what: "Data type of a key", example: "TYPE user:1  // string" },
        { syntax: "RENAME old new", what: "Rename a key", example: "RENAME tmp final" },
        {
          syntax: "SCAN cursor MATCH p COUNT n",
          what: "Iterate keys safely (not KEYS)",
          example: "SCAN 0 MATCH user:* COUNT 100",
        },
        {
          syntax: "KEYS pattern",
          what: "All matching keys (blocks; dev only)",
          example: "KEYS user:*",
        },
      ],
    },
    {
      title: "Hashes",
      rows: [
        {
          syntax: "HSET key f v [f v ...]",
          what: "Set field(s) on a hash",
          example: "HSET user:1 name alice age 30",
        },
        { syntax: "HGET key field", what: "Read one field", example: "HGET user:1 name" },
        { syntax: "HGETALL key", what: "All field-value pairs", example: "HGETALL user:1" },
        { syntax: "HDEL key field", what: "Delete a field", example: "HDEL user:1 age" },
        { syntax: "HEXISTS key field", what: "Field present?", example: "HEXISTS user:1 name" },
        {
          syntax: "HINCRBY key field n",
          what: "Add n to a numeric field",
          example: "HINCRBY user:1 logins 1",
        },
        {
          syntax: "HKEYS key / HVALS key",
          what: "All fields / all values",
          example: "HKEYS user:1",
        },
      ],
    },
    {
      title: "Lists",
      rows: [
        { syntax: "LPUSH key v", what: "Push to the head", example: "LPUSH queue job1" },
        { syntax: "RPUSH key v", what: "Push to the tail", example: "RPUSH queue job2" },
        { syntax: "LPOP key", what: "Pop from the head", example: "LPOP queue" },
        { syntax: "RPOP key", what: "Pop from the tail", example: "RPOP queue" },
        {
          syntax: "LRANGE key start stop",
          what: "Slice (0 -1 = all)",
          example: "LRANGE queue 0 -1",
        },
        { syntax: "LLEN key", what: "List length", example: "LLEN queue" },
        { syntax: "LINDEX key i", what: "Element at index", example: "LINDEX queue 0" },
        {
          syntax: "BRPOP key timeout",
          what: "Blocking pop (worker queue)",
          example: "BRPOP queue 5",
        },
      ],
    },
    {
      title: "Sets",
      rows: [
        { syntax: "SADD key m [m ...]", what: "Add member(s)", example: "SADD tags a b c" },
        { syntax: "SMEMBERS key", what: "All members", example: "SMEMBERS tags" },
        { syntax: "SISMEMBER key m", what: "Is m a member?", example: "SISMEMBER tags a" },
        { syntax: "SREM key m", what: "Remove a member", example: "SREM tags a" },
        { syntax: "SCARD key", what: "Member count", example: "SCARD tags" },
        { syntax: "SINTER k1 k2", what: "Intersection", example: "SINTER online premium" },
        { syntax: "SUNION k1 k2", what: "Union", example: "SUNION a b" },
        { syntax: "SDIFF k1 k2", what: "Difference", example: "SDIFF all banned" },
      ],
    },
    {
      title: "Sorted sets",
      rows: [
        {
          syntax: "ZADD key score m",
          what: "Add member with a score",
          example: "ZADD board 100 alice",
        },
        {
          syntax: "ZRANGE key a b",
          what: "By rank, low to high",
          example: "ZRANGE board 0 -1 WITHSCORES",
        },
        {
          syntax: "ZRANGE key a b REV",
          what: "By rank, high to low (top N)",
          example: "ZRANGE board 0 9 REV",
        },
        { syntax: "ZRANK key m", what: "Rank (0-based, ascending)", example: "ZRANK board alice" },
        { syntax: "ZREVRANK key m", what: "Rank from the top", example: "ZREVRANK board alice" },
        { syntax: "ZSCORE key m", what: "Score of a member", example: "ZSCORE board alice" },
        {
          syntax: "ZINCRBY key n m",
          what: "Add n to a member's score",
          example: "ZINCRBY board 5 alice",
        },
        {
          syntax: "ZRANGEBYSCORE key min max",
          what: "By score range",
          example: "ZRANGEBYSCORE board 50 100",
        },
      ],
    },
    {
      title: "Pub/Sub",
      rows: [
        {
          syntax: "SUBSCRIBE channel",
          what: "Listen on a channel",
          example: "SUBSCRIBE news",
        },
        {
          syntax: "PUBLISH channel msg",
          what: "Send to subscribers",
          example: "PUBLISH news hello",
        },
        {
          syntax: "PSUBSCRIBE pattern",
          what: "Subscribe by pattern",
          example: "PSUBSCRIBE news.*",
        },
        {
          syntax: "UNSUBSCRIBE channel",
          what: "Stop listening",
          example: "UNSUBSCRIBE news",
        },
      ],
    },
    {
      title: "Transactions",
      rows: [
        { syntax: "MULTI", what: "Start a transaction block", example: "MULTI" },
        { syntax: "EXEC", what: "Run all queued commands", example: "EXEC" },
        { syntax: "DISCARD", what: "Cancel the queued commands", example: "DISCARD" },
        {
          syntax: "WATCH key",
          what: "Optimistic lock (abort if changed)",
          example: "WATCH stock:1",
        },
      ],
      combos: [
        {
          label: "Optimistic transaction with WATCH",
          code: `WATCH stock:1
GET stock:1          # app reads, decides
MULTI
DECR stock:1
EXEC                 # nil if stock:1 changed since WATCH`,
        },
      ],
    },
    {
      title: "Server and admin",
      rows: [
        { syntax: "INFO", what: "Server stats and metrics", example: "INFO memory" },
        { syntax: "DBSIZE", what: "Number of keys in the DB", example: "DBSIZE" },
        { syntax: "FLUSHDB", what: "Delete all keys in current DB", example: "FLUSHDB" },
        { syntax: "FLUSHALL", what: "Delete all keys in all DBs", example: "FLUSHALL" },
        { syntax: "SELECT n", what: "Switch DB number (0-15)", example: "SELECT 1" },
        { syntax: "PING", what: "Health check (PONG)", example: "PING" },
        {
          syntax: "CONFIG GET param",
          what: "Read a config value",
          example: "CONFIG GET maxmemory",
        },
      ],
      combos: [
        {
          label: "Cache-aside (read then cache with TTL)",
          code: `GET user:1                 # miss -> nil
# app loads from DB, then:
SETEX user:1 300 "{...}"   # cache for 5 min
GET user:1                 # hit -> value`,
        },
        {
          label: "Rate limit: N requests per window",
          code: `INCR rate:ip:1.2.3.4       # returns new count
EXPIRE rate:ip:1.2.3.4 60  # set window on first hit
# if count > limit -> reject`,
        },
      ],
    },
  ],
};
