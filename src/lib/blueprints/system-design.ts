import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const systemDesign: Blueprint = {
  tagline:
    "How a request scales across edge, app, cache and data tiers — and how to keep it reliable.",
  legend: legendOf([
    "Client & edge",
    "Application tier",
    "Caching & async",
    "Data tier",
    "Reliability & scale",
  ]),
  alt:
    "A system map of scalable system design. Client and edge: users resolve DNS, static assets come from a " +
    "CDN, and a load balancer spreads traffic. Application tier: stateless app servers (behind an API " +
    "gateway) scale out horizontally. Caching and async: a read-through cache (Redis) absorbs reads, and a " +
    "message queue (Kafka) hands slow work to background workers. Data tier: writes go to a primary " +
    "database, which replicates to read replicas and shards for volume, with object storage (S3) for large " +
    "files; a cache miss falls back to the primary and the CDN serves from object storage. Reliability and " +
    "scale: monitoring and alerts watch the app, the primary fails over to a replica, the load balancer " +
    "rate-limits, and CAP and consistency trade-offs govern the data.",
  baseline: "Scalable web architecture",
  chart: `flowchart TD
  subgraph EDGE["1 . Client and edge"]
    direction TB
    user(["Users"]):::f
    user --> dns["DNS"]:::f
    dns --> cdn["CDN: static assets"]:::f
    cdn --> lb["Load Balancer"]:::f
  end

  subgraph APP["2 . Application tier"]
    direction LR
    gw["API Gateway"]:::c
    app1["App server (stateless)"]:::c
    app2["App server (stateless)"]:::c
  end
  lb --> gw
  gw --> app1
  gw --> app2
  app1 -.->|scale out| app2

  subgraph CACHE["3 . Caching and async"]
    direction LR
    cache["Cache: Redis"]:::x
    mq["Message queue: Kafka"]:::x
    work["Workers"]:::x
  end
  app1 -->|read-through| cache
  app1 -->|publish| mq
  mq --> work

  subgraph DATA["4 . Data tier"]
    direction TB
    pri[("Primary DB")]:::d
    pri -->|replicate| rep[("Read replicas")]:::d
    pri -->|shard| shd[("Shards")]:::d
    blob[("Object storage / S3")]:::d
  end
  app1 -->|write| pri
  app2 -->|read| rep
  cache -.->|miss| pri
  cdn -.-> blob

  subgraph REL["5 . Reliability and scale"]
    direction LR
    mon["Monitoring + alerts"]:::o
    fail["Failover"]:::o
    rl["Rate limiting"]:::o
    cap["CAP / consistency"]:::o
  end
  app1 -.-> mon
  pri --> fail
  lb -.-> rl
  rep -.-> cap
${CLASSDEFS}`,
};
