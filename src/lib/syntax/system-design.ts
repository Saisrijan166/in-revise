import type { SyntaxSheet } from "./types";

export const systemDesign: SyntaxSheet = {
  tagline: "The numbers, formulas and rules of thumb for back-of-the-envelope design.",
  baseline: "Estimation reference",
  lang: "text",
  groups: [
    {
      title: "Latency numbers (order of magnitude)",
      rows: [
        { syntax: "L1 cache", what: "Fastest memory", example: "~1 ns" },
        { syntax: "L2 cache", what: "Still on-chip", example: "~4 ns" },
        { syntax: "Main memory (RAM)", what: "A memory reference", example: "~100 ns" },
        { syntax: "Read 1 MB sequentially from RAM", what: "In-memory scan", example: "~5 us" },
        { syntax: "SSD random read (4 KB)", what: "Flash access", example: "~16 us" },
        { syntax: "Round trip in same datacenter", what: "Local network", example: "~0.5 ms" },
        { syntax: "Read 1 MB sequentially from SSD", what: "Bulk read", example: "~1 ms" },
        { syntax: "Disk seek (HDD)", what: "Spinning disk", example: "~10 ms" },
        { syntax: "Round trip across continents", what: "Internet RTT", example: "~150 ms" },
      ],
    },
    {
      title: "Powers of 2 and data sizes",
      rows: [
        { syntax: "2^10", what: "~ one thousand", example: "1 KB" },
        { syntax: "2^20", what: "~ one million", example: "1 MB" },
        { syntax: "2^30", what: "~ one billion", example: "1 GB" },
        { syntax: "2^32", what: "~ four billion (IPv4 space)", example: "4 GB" },
        { syntax: "2^40", what: "~ one trillion", example: "1 TB" },
        { syntax: "char / ASCII", what: "One byte", example: "1 B" },
        { syntax: "int / Unix timestamp", what: "Four bytes", example: "4 B" },
        { syntax: "long / double / ms timestamp", what: "Eight bytes", example: "8 B" },
        { syntax: "UUID", what: "128-bit id", example: "16 B" },
      ],
    },
    {
      title: "Availability (the nines)",
      rows: [
        { syntax: "99%", what: "Two nines", example: "~3.65 days down / year" },
        { syntax: "99.9%", what: "Three nines", example: "~8.8 hours / year" },
        { syntax: "99.99%", what: "Four nines", example: "~52 min / year" },
        { syntax: "99.999%", what: "Five nines", example: "~5 min / year" },
        {
          syntax: "Combined services",
          what: "Availabilities multiply in series",
          example: "99.9% x 99.9% = 99.8%",
        },
      ],
    },
    {
      title: "Time constants",
      rows: [
        { syntax: "Seconds per day", what: "Use for QPS math", example: "86,400 ~ 10^5" },
        { syntax: "Seconds per month", what: "~30 days", example: "~2.5 million" },
        { syntax: "Seconds per year", what: "~365 days", example: "~31.5 million" },
        { syntax: "1 million/day", what: "As a rate", example: "~12 QPS" },
      ],
    },
    {
      title: "Estimation formulas",
      rows: [
        {
          syntax: "QPS = daily requests / 86,400",
          what: "Average load",
          example: "100M/day / 1e5 = ~1,000 QPS",
        },
        {
          syntax: "Peak QPS ~ 2-3 x average",
          what: "Headroom for spikes",
          example: "1,000 avg -> ~2,500 peak",
        },
        {
          syntax: "Storage = items x size x retention",
          what: "Total bytes",
          example: "1M/day x 1 KB x 365 = ~365 GB/yr",
        },
        {
          syntax: "Bandwidth = QPS x response size",
          what: "Network out",
          example: "1,000 QPS x 10 KB = 10 MB/s",
        },
        {
          syntax: "Cache size ~ 20% of hot data",
          what: "80/20 rule",
          example: "most reads hit a small hot set",
        },
        {
          syntax: "Read:write ratio",
          what: "Drives replicas vs sharding",
          example: "100:1 -> add read replicas",
        },
      ],
    },
    {
      title: "Choosing components (rules of thumb)",
      rows: [
        {
          syntax: "Relational (SQL)",
          what: "Joins, transactions, strong consistency",
          example: "PostgreSQL, MySQL",
        },
        {
          syntax: "Key-value / document (NoSQL)",
          what: "Huge scale, flexible schema",
          example: "DynamoDB, Cassandra, Mongo",
        },
        {
          syntax: "Cache",
          what: "Cut read latency and DB load",
          example: "Redis (cache-aside, TTL)",
        },
        { syntax: "Message queue", what: "Decouple + absorb spikes", example: "Kafka, RabbitMQ" },
        { syntax: "CDN", what: "Serve static assets near users", example: "CloudFront" },
        {
          syntax: "Load balancer",
          what: "Spread traffic, health checks",
          example: "stateless app servers behind it",
        },
        {
          syntax: "Replication first, then shard",
          what: "Scale reads, then writes",
          example: "replicas -> sharding when writes outgrow one node",
        },
      ],
    },
  ],
};
