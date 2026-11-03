import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const springBoot: Blueprint = {
  tagline: "How Spring Boot boots, wires its beans, and runs one request end to end.",
  legend: legendOf([
    "Startup / container",
    "Web layer",
    "Data layer",
    "Cross-cutting (AOP)",
    "Production & scale",
  ]),
  alt:
    "A system map of Spring Boot. Startup spine: java -jar runs main() and SpringApplication.run(), " +
    "which creates the ApplicationContext (IoC container); auto-configuration reacts to starters on the " +
    "classpath, @ComponentScan finds beans, and dependency injection wires them; config and profiles load; " +
    "embedded Tomcat starts on 8080 and the app is ready. Request spine: an HTTP client goes through the " +
    "Spring Security filter chain to the DispatcherServlet, HandlerMapping, then a @RestController, which " +
    "validates with @Valid, calls a @Transactional @Service, which calls a Spring Data JPA Repository, " +
    "Hibernate, and the Database; the controller returns JSON, and errors go to @RestControllerAdvice. The " +
    "container wires the controller bean. Cross-cutting AOP (@Aspect, @Cacheable, @Async) wraps the " +
    "service. Production branches: the service publishes to Kafka or RabbitMQ; the controller calls Spring " +
    "Cloud (Gateway, Eureka, Config, Resilience4j); Actuator, testing and packaging (fat JAR, Docker, " +
    "GraalVM native) sit off the ready app.",
  baseline: "Spring Boot 4.1 · Java 17+",
  chart: `flowchart TD
  subgraph BOOT["1 . Startup lifecycle"]
    direction TB
    run["main() + SpringApplication.run()"]:::f
    run --> ctx["ApplicationContext (IoC container)"]:::f
    ctx --> acfg["Auto-configuration"]:::f
    acfg -->|classpath| strt[("Starters")]:::f
    ctx --> scan["@ComponentScan"]:::f
    scan --> beans["Beans: @Component @Service @Repository"]:::f
    acfg --> beans
    beans --> di["Dependency Injection (constructor)"]:::f
    ctx --> conf["Config: application.yml . Profiles"]:::f
    ctx --> tom["Embedded Tomcat :8080"]:::f
    tom --> ready(["App ready"]):::f
  end

  subgraph REQ["2 . Request flow"]
    direction TB
    cli(["HTTP request"]):::c
    cli --> sec["Filter chain: Spring Security"]:::x
    sec --> disp{{"DispatcherServlet"}}:::c
    disp --> hmap["HandlerMapping"]:::c
    hmap --> ctrl["@RestController @GetMapping"]:::c
    ctrl --> vld["@Valid"]:::c
    ctrl --> serv["@Service @Transactional"]:::c
    serv --> repo["Repository: Spring Data JPA"]:::d
    repo --> orm["Hibernate / JPA"]:::d
    orm --> dbs[("Database")]:::d
    ctrl --> json["JSON @ResponseBody response"]:::c
    ctrl -.->|on error| advc["@RestControllerAdvice"]:::c
    cli -.->|non-blocking alt| rx["Reactive: WebFlux Mono/Flux"]:::c
    rx -.-> serv
  end

  ready ==>|serves| cli
  di -.->|wires| ctrl

  subgraph CROSS["3 . Cross-cutting (AOP)"]
    direction LR
    aop["@Aspect @Around"]:::x
    cache["@Cacheable"]:::x
    asyn["@Async @Scheduled"]:::x
  end
  serv -->|wrapped by| aop
  serv --> cache
  serv --> asyn

  subgraph OPS["4 . Production and scale"]
    direction LR
    act["Actuator /health /metrics"]:::o
    test["Testing: @SpringBootTest MockMvc"]:::o
    mq["Messaging: Kafka / RabbitMQ"]:::o
    cloud["Spring Cloud: Gateway Eureka Config Resilience4j"]:::o
    dep["Package + Deploy: fat JAR . Docker . GraalVM"]:::o
  end
  ready --> act
  ready --> test
  ready --> dep
  serv -->|publish| mq
  ctrl -->|calls| cloud
${CLASSDEFS}`,
};
