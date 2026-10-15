# Open questions

Facts that could not be fully verified, and decisions that need the owner.
Phase 1 (Sample), System Design. Last updated 15-10-2026.

## A. Facts not fully verified (kept out of cards or worded carefully)

| # | Item | Status | What the cards do |
|---|---|---|---|
| A1 | MongoDB default write concern became `w: "majority"` in 5.0 | Confirmed only by MongoDB's 5.0.0 release announcement (community forum), not by current release notes | Not stated in any card |
| A2 | Amazon ElastiCache default `maxmemory-policy` (`volatile-lru`?) | Seen in search results only; the AWS page was not opened | Card says "Managed services may use other defaults" |
| A3 | Apache Cassandra default consistency level | Not stated on the cited 5.0 pages | Not stated. Cassandra docs `/latest/` show a "prerelease" banner (content is fine) |
| A4 | How often each interview question is asked | No primary source ranks questions. Questions are drawn from topics covered by the System Design Primer and Hello Interview pages that were opened | `heat` (1–3) is an editorial judgement, not measured data |
| A5 | Google Spanner as "distributed SQL" | Spanner docs say "a distributed database" with SQL dialects; the label "distributed SQL" was not found | Worded as "a distributed database with SQL" |
| A6 | CockroachDB facts | No CockroachDB page was opened during verification | Removed from cards |
| A7 | Karger et al. 1997 (consistent hashing) | `doi.org` / ACM page returns 403 to scripts; title and authors confirmed via Crossref and a university mirror | Cited by DOI |
| A8 | "Scalability vs elasticity" as a common interview question | Only vendor definitions found, no interview-prep source | Question removed |
| A9 | Cache-aside race that remains even with "database first, then delete" | Matches the "stale set" problem in Facebook's memcache paper; the exact interleaving is our explanation | Stated as "a small race remains", with TTL and leases as mitigations |
| A10 | "Thundering herd" definition | Facebook's paper uses a narrower meaning (heavy reads and writes on one key) | Glossary uses the common interview meaning: many misses for one hot key at once |

## B. Decisions for the owner

1. **Comparisons can compare glossary terms.** The two requested pairs (vertical vs horizontal scaling, sharding vs replication) live inside single cards, so `compares` accepts a card id *or* a glossary term id. The validator checks both. Keep this, or require a card per side?
2. **Card id `sharding-and-replication`.** Its title is "Sharding vs Replication", but the id avoids a clash with the comparison `sharding-vs-replication`. Cards and comparisons share one id namespace.
3. **Story spine format.** Steps use `{ step: "problem → fix", cards: [...] }` (an extension of the plain strings in CLAUDE.md 7). This lets the validator require every card to sit on the story. Steps 7–10 have no cards yet.
4. **Card body format.** Fixed `## Section` headings; Interview Qs as `### Question` plus answer; Can / Cannot as `### Can` and `### Cannot`. Metadata and sources stay in frontmatter.
5. **"Readable in under 60 seconds".** Read as: the core idea (why, how, analogy, example) is 280 words or fewer, and the Revise view is 300 words or fewer (validator warnings). The full Learn view with 3–4 interview answers takes about 3 minutes. Confirm, or set a stricter budget.
6. **Revise mode fields.** These follow CLAUDE.md exactly: hook, rules & defaults, can / cannot, mistake alert, say it like this. Should the "Confused with" verdict line be added?
7. **Heat rubric.** Should `heat` follow a written rubric (for example, 3 = appears in most prep guides)?
8. **Deck order on Home.** Decks are ordered alphabetically by slug. Should `_tech.yaml` get an `order` field?
9. **Tooling versions:**
   - **TypeScript:** 5.9.3 instead of npm `latest` 7.0.2, because create-next-app 16.4.1 and typescript-eslint pin `^5`.
   - **ESLint:** 9, which upstream marks as no longer supported, because `eslint-config-next`'s plugins only allow up to ^9.
   - **npm audit:** 5 high findings, all in that dev-only lint chain (`braces`); production dependencies show 0.
10. **Accent colours.** `_tech.yaml` `accent` must be one of 7 tuned palettes (blue, orange, green, violet, rose, teal, amber), each AA-checked in both themes.
11. **Topic colours.** Topic lines use 8 validated colours. A 9th topic falls back to grey rather than reusing a colour. If System Design ends up with more than 8 topics, consider grouping them.
12. **Fonts.** These come from Google Fonts through `next/font`: downloaded at build time (the build needs network access, as Vercel has) and self-hosted at runtime.
13. **Dates.** The UI shows DD-MM-YYYY; frontmatter keeps ISO `YYYY-MM-DD` as in the CLAUDE.md schema. Every `verifiedOn` is 15-10-2026, the day each source was opened.
