import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const microservices: Blueprint = {
  tagline: "How a request flows across independent services, sync and async, with their own data.",
  legend: legendOf([
    "Edge / gateway",
    "Services",
    "Data per service",
    "Async messaging",
    "Platform & ops",
  ]),
  alt:
    "A system map of microservices. Edge: a client calls the API Gateway, which routes, authenticates and " +
    "rate-limits; it looks services up in service discovery (Eureka) and load-balances across instances. " +
    "Services: each is a bounded context; the gateway calls Service A over REST or gRPC, A may call B " +
    "synchronously, protected by a circuit breaker (Resilience4j: retry, timeout, fallback). Data: each " +
    "service owns its own database (database per service), so they never share tables. Async messaging: a " +
    "service publishes events to a broker (Kafka or RabbitMQ), others subscribe, and this drives Saga, " +
    "Outbox and CQRS patterns for consistency without distributed transactions. Platform and ops: a config " +
    "server supplies config, the gateway validates JWT or OAuth2 tokens, every service emits traces, metrics " +
    "and logs to observability, and services are packaged in Docker and run on Kubernetes.",
  baseline: "Spring Boot 4.1 · Spring Cloud · Kafka · Kubernetes",
  chart: `flowchart TD
  subgraph EDGE["1 . Edge"]
    direction TB
    client(["Client / UI"]):::f
    client --> gw["API Gateway: routing auth rate-limit"]:::f
    gw -.->|lookup| disc["Service Discovery: Eureka"]:::f
    gw -.->|balance| lb["Load Balancer"]:::f
  end

  subgraph SVC["2 . Services (bounded contexts)"]
    direction TB
    gw -->|REST / gRPC| sa["Service A"]:::c
    gw --> sb["Service B"]:::c
    sa -->|sync call| sb
    sa -.->|circuit breaker| r4j["Resilience4j: retry timeout fallback"]:::c
  end

  subgraph DATA["3 . Data (database per service)"]
    direction LR
    dba[("DB A")]:::d
    dbb[("DB B")]:::d
  end
  sa --> dba
  sb --> dbb

  subgraph MSG["4 . Async messaging"]
    direction TB
    bus["Broker: Kafka / RabbitMQ"]:::x
    bus --> saga["Saga / Outbox / CQRS"]:::x
  end
  sa -.->|publish event| bus
  bus -.->|subscribe| sb

  subgraph PLAT["5 . Platform and ops"]
    direction LR
    cfg["Config Server"]:::o
    sec["AuthN/Z: JWT / OAuth2"]:::o
    obs["Observability: tracing metrics logs"]:::o
    k8s["Docker + Kubernetes"]:::o
  end
  gw -.->|token| sec
  sa -.->|config| cfg
  sa -.->|telemetry| obs
  sb -.-> obs
  sa --> k8s
  sb --> k8s
${CLASSDEFS}`,
};
