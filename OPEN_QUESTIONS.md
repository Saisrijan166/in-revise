# Open questions

Facts that could not be fully verified, and decisions that need the owner.
System Design. Phase 1 on 15-10-2026; Phase 2 (owner feedback) on 16-10-2026.

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
8. **Navigation:** the tech's pages in the top bar; Learn / Revise / Quiz and the tree in the left sidebar; the right panel shows "On this page", a recap and "Quiz me on this"; one header plus one bottom bar on phones.
9. **"vs" concepts embed their comparison** (`<Compare id>`), so the table is written once. A new comparison, "Relational (SQL) vs NoSQL", was added for this.

## C. Decisions still open for the owner

1. **Tree depth:** System Design's tree has about 75 nodes for 6 concepts. In Phase 3 each topic will grow. Is about 3 levels the right maximum?
2. **Relation types:** 7 verbs today. Add more (for example "replaces", "is a kind of") or keep the set small?
3. **Heat rubric:** should `heat` follow a written rule (for example, 3 = appears in most prep guides)?
4. **Deck order on Home:** alphabetical by slug. Add an `order` field to `_tech.yaml`?
5. **Tooling:** TypeScript 5.9 (Next 16.4's supported line, not npm `latest` 7.0) and ESLint 9 (the Next plugins do not support 10 yet). The 5 `npm audit` findings are all in that dev-only lint chain; production dependencies show 0.
6. **Accent palettes:** 7 tuned accents (blue, orange, green, violet, rose, teal, amber), each checked for AA contrast in both themes.
7. **Topic colours:** 8 validated colours; a 9th topic would fall back to grey.
8. **Fonts:** downloaded from Google Fonts at build time and self-hosted. The build needs network access.
