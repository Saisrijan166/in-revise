/**
 * Visual Learning Blueprint data (client-safe: no Node imports).
 *
 * A blueprint is ONE large connected flowchart — a system map of a tech: boxes,
 * arrows and branches showing how the parts connect and how execution flows,
 * from startup to request handling to production. It is a Mermaid diagram so the
 * site renders it theme-aware and it scrolls in its own box. Curated per tech, so
 * a tech has a Blueprint page only when it appears in BLUEPRINTS.
 */

export interface BpLegendItem {
  label: string;
  color: string;
}

export interface Blueprint {
  tagline: string;
  /** Mermaid flowchart source. */
  chart: string;
  /** Text alternative for the diagram (accessibility + fallback). */
  alt: string;
  /** Colour key matching the diagram's classDef fills. */
  legend: BpLegendItem[];
  baseline: string;
}

const springBoot: Blueprint = {
  tagline: "How Spring Boot boots, wires its beans, and runs one request end to end.",
  legend: [
    { label: "Startup / container", color: "#1b5e20" },
    { label: "Web layer", color: "#0d47a1" },
    { label: "Data layer", color: "#4a148c" },
    { label: "Cross-cutting (AOP)", color: "#8a5208" },
    { label: "Production & scale", color: "#37474f" },
  ],
  alt:
    "A system map of Spring Boot. Startup spine: java -jar runs main() and SpringApplication.run(), " +
    "which creates the ApplicationContext (IoC container); auto-configuration reacts to starters on the " +
    "classpath, @ComponentScan finds beans, and dependency injection wires them; config and profiles load; " +
    "embedded Tomcat starts on 8080 and the app is ready. Request spine: an HTTP client goes through the " +
    "Spring Security filter chain to the DispatcherServlet, HandlerMapping, then a @RestController, which " +
    "validates with @Valid, calls a @Transactional @Service, which calls a Spring Data JPA Repository, " +
    "Hibernate, and the Database; the controller returns JSON, and errors go to @RestControllerAdvice. The " +
    "container injects the controller, service and repository beans. Cross-cutting AOP (@Aspect, @Cacheable, " +
    "@Async) wraps the service. Production branches: Actuator and testing observe the context; the service " +
    "publishes to Kafka or RabbitMQ; the controller calls Spring Cloud (Gateway, Eureka, Config, " +
    "Resilience4j); a reactive WebFlux path is an alternative to the servlet stack; and the ready app is " +
    "packaged as a fat JAR, Docker image or GraalVM native image.",
  baseline: "Spring Boot 4.1 · Java 17+",
  chart: `flowchart TD
  subgraph BOOT["1 . Startup lifecycle"]
    direction TB
    run["main() + SpringApplication.run()"]:::boot
    run --> ctx["ApplicationContext (IoC container)"]:::boot
    ctx --> acfg["Auto-configuration"]:::boot
    acfg -->|classpath| strt[("Starters")]:::boot
    ctx --> scan["@ComponentScan"]:::boot
    scan --> beans["Beans: @Component @Service @Repository"]:::boot
    acfg --> beans
    beans --> di["Dependency Injection (constructor)"]:::boot
    ctx --> conf["Config: application.yml . Profiles"]:::boot
    ctx --> tom["Embedded Tomcat :8080"]:::boot
    tom --> ready(["App ready"]):::boot
  end

  subgraph REQ["2 . Request flow"]
    direction TB
    cli(["HTTP request"]):::web
    cli --> sec["Filter chain: Spring Security"]:::cross
    sec --> disp{{"DispatcherServlet"}}:::web
    disp --> hmap["HandlerMapping"]:::web
    hmap --> ctrl["@RestController @GetMapping"]:::web
    ctrl --> vld["@Valid"]:::web
    ctrl --> serv["@Service @Transactional"]:::web
    serv --> repo["Repository: Spring Data JPA"]:::data
    repo --> orm["Hibernate / JPA"]:::data
    orm --> dbs[("Database")]:::data
    ctrl --> json["JSON @ResponseBody response"]:::web
    ctrl -.->|on error| advc["@RestControllerAdvice"]:::web
    cli -.->|non-blocking alt| rx["Reactive: WebFlux Mono/Flux"]:::web
    rx -.-> serv
  end

  ready ==>|serves| cli
  di -.->|wires| ctrl

  subgraph CROSS["3 . Cross-cutting (AOP)"]
    direction LR
    aop["@Aspect @Around"]:::cross
    cache["@Cacheable"]:::cross
    asyn["@Async @Scheduled"]:::cross
  end
  serv -->|wrapped by| aop
  serv --> cache
  serv --> asyn

  subgraph OPS["4 . Production and scale"]
    direction LR
    act["Actuator /health /metrics"]:::ops
    test["Testing: @SpringBootTest MockMvc"]:::ops
    mq["Messaging: Kafka / RabbitMQ"]:::ops
    cloud["Spring Cloud: Gateway Eureka Config Resilience4j"]:::ops
    dep["Package + Deploy: fat JAR . Docker . GraalVM"]:::ops
  end
  ready --> act
  ready --> test
  ready --> dep
  serv -->|publish| mq
  ctrl -->|calls| cloud

  classDef boot fill:#1b5e20,color:#ffffff,stroke:#43a047,stroke-width:1px;
  classDef web fill:#0d47a1,color:#ffffff,stroke:#1e88e5,stroke-width:1px;
  classDef data fill:#4a148c,color:#ffffff,stroke:#8e24aa,stroke-width:1px;
  classDef cross fill:#8a5208,color:#ffffff,stroke:#c77f1a,stroke-width:1px;
  classDef ops fill:#37474f,color:#ffffff,stroke:#78909c,stroke-width:1px;`,
};

/** Blueprints by tech slug. A tech gets a Blueprint page only if it is here. */
export const BLUEPRINTS: Record<string, Blueprint> = {
  "spring-boot": springBoot,
};

export function hasBlueprint(slug: string): boolean {
  return slug in BLUEPRINTS;
}

export function getBlueprint(slug: string): Blueprint | undefined {
  return BLUEPRINTS[slug];
}

export function blueprintSlugs(): string[] {
  return Object.keys(BLUEPRINTS);
}
