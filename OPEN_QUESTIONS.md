# Open questions

Facts that could not be fully verified, and decisions that need the owner.
System Design. Phase 1 on 15-10-2026; Phase 2 (owner feedback) on 16-10-2026; Phase 3 (full content) on 16-10-2026.

## A. Facts not fully verified (kept out of the content or worded carefully)

| # | Item | Status | What the content does |
|---|---|---|---|
| A1 | MongoDB's default write concern became `w: "majority"` in 5.0 | Confirmed only by MongoDB's 5.0.0 release announcement | Not stated |
| A2 | Amazon ElastiCache's default `maxmemory-policy` | Reported as `volatile-lru`; the AWS page was not opened | We say "Redis OSS default"; managed services are noted to differ |
| A3 | Apache Cassandra's default consistency level | Not stated on the cited 5.0 pages | Not stated |
| A4 | How often each interview question is asked | No primary source ranks questions | `heat` (1–3) is an editorial judgement |
| A5 | Google Spanner as "distributed SQL" | The Spanner docs say "a distributed database" with SQL dialects and automatic splits | Worded as "a distributed database with SQL" |
| A6 | CockroachDB facts | No CockroachDB page was opened | Removed |
| A7 | Karger et al. 1997 (consistent hashing) | DOI page returns 403 to scripts; title and authors confirmed through Crossref | Cited by DOI |
| A8 | MySQL Group Replication's default mode (probably single-primary) | Not stated on the multi-primary page | Tree says only that multi-leader exists (MySQL multi-primary mode) |
| A9 | "Random (two choices)" as a named algorithm type | Backed by nginx (`random two`) and HAProxy (`random`, 2 draws) as vendor features, not by a standards text | Kept, with those sources |
| A10 | "Leaderless" replication | The Dynamo paper uses the idea; Cassandra's own docs call it "multi-master/multi-primary" | Tree cites Dynamo; note says "No leader; writes go to several replicas; R + W > N quorums" |
| A11 | Cache-aside race that remains even with "database first, then delete" | Matches the "stale set" problem in Facebook's memcache paper; the exact interleaving is our explanation | "A small race remains" is not claimed in Revise; the trap states the safe order |

## B. Decisions taken in Phase 2 (owner feedback, 16-10-2026)

Applied, and written into CLAUDE.md (CLAUDE.md is not tracked in git: the global gitignore excludes it).

1. **Name:** inrevise (interview + revise).
2. **Progress features removed:** Known / Shaky / Unknown, Save, progress bars, the review list and JSON export/import. Only preferences remain (theme, mode, code language).
3. **Template v2:** `points` (keyword → meaning) replace "Rules & defaults" and "Can / Cannot"; `trap { wrong, right }` replaces "Mistake alert"; `sayIt` moves to frontmatter; a plain-English **Defaults** table is optional; interview answers are ≤ 50 words and collapsed in Learn.
4. **Relations replace needs / leadsTo / related:** each relation has a type (needs, uses, solves, can cause, limits, vs, works with) and a one-line why.
5. **Concept tree** (`tree.yaml`): the full types-and-subtypes hierarchy; it also sets the reading order.
6. **One cheat sheet for the whole tech**, built for scanning.
7. **Code examples in Java and Python** (tabs, choice remembered).
8. **Navigation:** the tech's pages sit in ONE bordered group in the top bar, with the tech name filled and each page filled only when selected. Learn / Revise / Quiz and the tree are in the left sidebar. The right panel shows "On this page", a recap and "Quiz me on this". Phones get one header and one bottom bar (Home, Topics, Cheat sheet, Quiz, Search).
9. **"vs" concepts embed their comparison** (`<Compare id>`), so the table is written once. A new comparison, "Relational (SQL) vs NoSQL", was added for this.
10. **Map removed (16-10-2026):** the Focus and Whole map views and the React Flow dependency are gone. Relations stay on each concept page ("How it connects"). Links to types and parts now open their place in the Tree (`/tree/#node-<id>`).

## C. Decisions still open for the owner

1. **Tree depth:** see D4.5 (the full tree now has about 500 nodes).
2. **Relation types:** 7 verbs today. Add more (for example "replaces", "is a kind of") or keep the set small?
3. **Heat rubric:** should `heat` follow a written rule (for example, 3 = appears in most prep guides)?
4. **Deck order on Home:** alphabetical by slug. Add an `order` field to `_tech.yaml`?
5. **Tooling:** TypeScript 5.9 (Next 16.4's supported line, not npm `latest` 7.0) and ESLint 9 (the Next plugins do not support 10 yet). The 5 `npm audit` findings are all in that dev-only lint chain; production dependencies show 0.
6. **Accent palettes:** 7 tuned accents (blue, orange, green, violet, rose, teal, amber), each checked for AA contrast in both themes.
7. **Topic colours:** 8 validated colours; a 9th topic would fall back to grey.
8. **Fonts:** downloaded from Google Fonts at build time and self-hosted. The build needs network access.

## D. Phase 3 (full content, 16-10-2026)

### D1. Verification status

- **First pass (done):** each topic was written by a separate drafting agent, which checked every key point, default, number, trap and tree note against a primary source as it wrote. Each agent kept a per-claim log (claim, URL, evidence).
- **Second, independent pass (CLAUDE.md 4.8): not done yet.** Seven fresh verifier agents were started, one per topic group, but an account usage limit stopped them before they checked anything (it resets 20-10-2026, 13:30 IST). Resume it before treating Phase 3 as fully verified.
- **Re-checked by hand on 16-10-2026, all confirmed:** Java 26 `UUID.ofEpochMillis` (version 7); Python 3.14 `uuid.uuid7()`; PostgreSQL 18 `uuidv7()` and `gen_random_uuid()` (version 4); Kafka 4.3 consumer defaults (`enable.auto.commit` true every 5 s, `auto.offset.reset` latest, `isolation.level` read_uncommitted) and producer defaults (`enable.idempotence` true unless settings conflict, `acks` all); Resilience4j 2.4.0 is the latest release, with CircuitBreaker defaults 50%, 100 calls, 60 s; Prometheus `scrape_interval` 1m and `scrape_timeout` 10s; API Gateway 10,000 RPS with a 5,000 burst per account per Region (2,500 / 1,250 in 13 Regions); Route 53 health checks every 30 s with a failure threshold of 3, so the "about 2.5 minutes" failover example adds up; MySQL Repeatable Read allows lost updates (Jepsen, MySQL 8.0.34), now cited in the isolation-levels comparison.

### D2. Worded carefully (kept, with the caveat shown)

| # | Item | What the content does |
|---|---|---|
| D2.1 | Geohash has no formal spec | Encoding and edge facts rest on Wikipedia, cross-checked with the Redis and Elasticsearch docs |
| D2.2 | Elasticsearch docs carry no version | Defaults are labelled "Elasticsearch 9.x" (latest 9.5.x in the release notes) |
| D2.3 | Cassandra 5.0 pages show a "prerelease" banner | Values are cited as Cassandra 5.0 (`num_tokens` 16 is the same on the 4.0 pages) |
| D2.4 | S3 maximum object size: AWS says both "50 TB" and "48.8 TiB" | Uses 48.8 TiB (10,000 parts × 5 GiB) |
| D2.5 | "Many conflicts: lock instead of optimistic" | Paraphrases EF Core and Hibernate guidance; no source gives a threshold |
| D2.6 | Route 53 failover "about 2.5 minutes" | Derived (30 s × 3 + 60 s TTL), worded as "about" and "most clients" |
| D2.7 | Peak factor 2× in estimates | Always called "a peak factor you state", not an industry constant |
| D2.8 | Idempotency-Key header | Says "IETF draft, not yet an RFC"; draft-07 expired on 18-04-2026 |
| D2.9 | Stripe idempotency facts | Stated for Stripe API v1 only |
| D2.10 | Raft's 150–300 ms election timeout | Shown as the paper's example range, not as a default |
| D2.11 | Retry amplification | Uses the Google SRE example (3 retries over 3 layers = 64×), not the ambiguous Builders' Library wording |
| D2.12 | Prometheus defaults | Labelled 3.15 (the docs version linked from the page) |
| D2.13 | "Auto-increment reveals how many rows exist" | Backed by ByteByteGo and OWASP ("enumerable identifiers"), not by a vendor doc |
| D2.14 | Write-around as a named strategy | No vendor doc names it; it rests on Wikipedia ("no-write allocate", also called write around) and ByteByteGo. Added 16-10-2026 at the owner's request; the six strategy names (Cache-Aside (Lazy Loading), Read-Through, Refresh-Ahead, Write-Through, Write-Behind (Write-Back), Write-Around) follow Oracle Coherence, AWS and Wikipedia |

### D3. Dropped (could not be confirmed from a primary source)

- Modern SSD latency numbers and single-server QPS figures (only Jeff Dean's 2009 list is used).
- A fixed gRPC default deadline (it is language-specific); Consul's DNS port as a default.
- Amazon ElastiCache's default eviction policy (sources conflict); the "two hard things" quote.
- Default consistency levels of cqlsh and Cosmos DB; Spanner using 2PC over Paxos groups; ULID.
- The 3-2-1 backup rule; Aurora failover numbers; AWS SDK retry numbers (they need an opt-in flag until they become the default).
- The JVM's positive DNS cache default; pull CDNs as "most common".
- IETF RateLimit header fields (still a draft); "SSE is used for LLM token streaming".
- Google Pub/Sub retention for new subscriptions; SNS standard-topic ordering; Kafka idempotence "since 3.0".
- The H3 resolution count and open-source date; R-trees being height-balanced; MySQL's index skip scan trigger.

### D4. Decisions for the owner

1. **Size:** 51 concepts, 26 comparisons, 340 glossary terms, about 500 tree nodes, 20 story steps, 8 topics. Is that the right breadth, or should some tree types become full concepts (for example read-through, refresh-ahead, leader election)?
2. **Concept ids that are also glossary ids** (`availability`, `capacity-estimation`, `circuit-breaker`, `load-shedding`, `dns`, `cdn`, `consistent-hashing`): kept on purpose so their tree nodes show a one-line definition. Keep?
3. **Wikipedia for geohash** (D2.1): accept, or drop the geohash details?
4. **Redis 8.6 `allkeys-lrm` / `volatile-lrm`** (least recently modified) exist but were left out of the eviction concept to keep it short. Add a tree node?
5. **Tree depth (C1):** the tree now has about 500 nodes. Every topic now lists concepts at its top level (Caching strategies became a concept on 16-10-2026, with write-around added). Concepts may also sit inside another concept (Cache-Aside and Write-Through inside Caching Strategies; Consistent Hashing inside Sharding vs Replication); the Overview, Cheat sheet and sidebar show them either way.
