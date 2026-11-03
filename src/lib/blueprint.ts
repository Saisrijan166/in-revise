/**
 * Visual Learning Blueprint data (client-safe: no Node imports).
 *
 * A blueprint is one connected, color-coded map of a tech, read top to bottom:
 * pillars → Fundamentals → Core → Advanced → the execution flows.
 * It is curated per tech (not generated from the tree), so a tech has a Blueprint
 * page only when it appears in BLUEPRINTS. The nav shows the tab only for those.
 */

export type BpTone = "fundamentals" | "core" | "advanced";

export interface BpNode {
  title: string;
  /** small mono label shown beside the title */
  tag?: string;
  /** short term chips */
  chips?: string[];
  /** full-width node that shows an equation/flow of parts instead of chips */
  wide?: boolean;
  parts?: string[];
  sep?: "=" | "→";
}

export interface BpTier {
  num: string;
  title: string;
  sub: string;
  tone: BpTone;
  nodes: BpNode[];
}

export interface BpFlow {
  label: string;
  title: string;
  caption: string;
  steps: { main: string; sub?: string }[];
}

export interface Blueprint {
  tagline: string;
  pillarsLabel: string;
  pillars: { title: string; desc: string }[];
  tiers: BpTier[];
  flows: BpFlow[];
  baseline: string;
}

const springBoot: Blueprint = {
  tagline: "One map, beginner to advanced — auto-configured Spring that runs standalone.",
  pillarsLabel: "Why Spring Boot · the 5 pillars",
  pillars: [
    { title: "Auto-config", desc: "Sensible beans by default, from the classpath" },
    { title: "Starters", desc: "One dependency pulls a whole stack" },
    { title: "Embedded server", desc: "Tomcat inside the JAR — no WAR" },
    { title: "Standalone", desc: "java -jar and it runs" },
    { title: "Production-ready", desc: "Actuator: health, metrics, info" },
  ],
  tiers: [
    {
      num: "01",
      title: "Fundamentals",
      sub: "Create a project, boot it up, configure it",
      tone: "fundamentals",
      nodes: [
        {
          title: "Spring Initializr",
          tag: "start.spring.io",
          chips: ["pick starters", "Java + Boot ver."],
        },
        { title: "Build tool", chips: ["Maven", "Gradle", "pom.xml"] },
        {
          title: "Starters",
          tag: "spring-boot-starter-*",
          chips: ["web", "data-jpa", "security", "validation", "test"],
        },
        {
          title: "Auto-configuration",
          chips: ["@Conditional", "classpath-driven", "override anytime"],
        },
        {
          title: "Config & Profiles",
          chips: ["application.yml", "@Value", "@ConfigurationProperties", "dev / prod"],
        },
        { title: "Embedded server", chips: ["Tomcat (default)", "Jetty", "Undertow"] },
        {
          title: "@SpringBootApplication",
          tag: "main() → SpringApplication.run()",
          wide: true,
          sep: "=",
          parts: ["@Configuration", "@EnableAutoConfiguration", "@ComponentScan"],
        },
      ],
    },
    {
      num: "02",
      title: "Core Concepts",
      sub: "The container, beans, the web and data layers",
      tone: "core",
      nodes: [
        {
          title: "IoC Container",
          tag: "ApplicationContext",
          chips: ["creates beans", "wires them", "manages lifecycle"],
        },
        {
          title: "Beans & Stereotypes",
          chips: ["@Component", "@Service", "@Repository", "@Controller"],
        },
        {
          title: "Dependency Injection",
          chips: ["constructor (best)", "@Autowired", "@Qualifier"],
        },
        {
          title: "Scope & Lifecycle",
          chips: ["singleton (default)", "prototype", "@PostConstruct", "@PreDestroy"],
        },
        { title: "Java Config", chips: ["@Configuration", "@Bean"] },
        {
          title: "Spring MVC",
          tag: "DispatcherServlet",
          chips: ["front controller", "HandlerMapping", "ViewResolver"],
        },
        {
          title: "REST Endpoints",
          tag: "@RestController",
          chips: ["@GetMapping", "@PostMapping", "@PathVariable", "@RequestBody"],
        },
        {
          title: "Validation & Errors",
          chips: ["@Valid", "jakarta.validation", "@RestControllerAdvice", "@ExceptionHandler"],
        },
        {
          title: "Spring Data JPA",
          tag: "Hibernate",
          chips: ["@Entity", "JpaRepository", "@Transactional", "derived queries"],
        },
        {
          title: "Layered architecture",
          tag: "separation of concerns",
          wide: true,
          sep: "→",
          parts: [
            "Controller (web/DTO)",
            "Service (logic/@Transactional)",
            "Repository (data)",
            "Database",
          ],
        },
      ],
    },
    {
      num: "03",
      title: "Advanced",
      sub: "Secure, observe, test and ship to production",
      tone: "advanced",
      nodes: [
        { title: "Spring Security", chips: ["filter chain", "authn / authz", "JWT", "OAuth2"] },
        { title: "AOP", tag: "cross-cutting", chips: ["@Aspect", "@Around", "logging / tx"] },
        { title: "Actuator", tag: "Micrometer", chips: ["/health", "/metrics", "/info"] },
        { title: "Tasks", chips: ["@Cacheable", "@Scheduled", "@Async", "@EventListener"] },
        {
          title: "Testing",
          chips: ["@SpringBootTest", "@WebMvcTest", "MockMvc", "Testcontainers"],
        },
        { title: "Messaging", chips: ["Kafka", "RabbitMQ", "app events"] },
        { title: "HTTP Clients", chips: ["RestClient", "WebClient", "RestTemplate"] },
        {
          title: "Reactive",
          tag: "Spring WebFlux",
          chips: ["non-blocking", "Mono / Flux", "Netty"],
        },
        {
          title: "Spring Cloud",
          tag: "microservices",
          chips: ["Config", "Eureka", "Gateway", "Resilience4j"],
        },
        { title: "Package & Deploy", chips: ["fat JAR", "Docker", "GraalVM native"] },
      ],
    },
  ],
  flows: [
    {
      label: "Flow 1",
      title: "Startup lifecycle",
      caption: "What happens the moment you run the app.",
      steps: [
        { main: "main()", sub: "run()" },
        { main: "ApplicationContext", sub: "created" },
        { main: "Component scan", sub: "find beans" },
        { main: "Auto-config", sub: "@Conditional" },
        { main: "Beans built", sub: "& injected" },
        { main: "Tomcat starts", sub: "port 8080" },
        { main: "App ready", sub: "serving" },
      ],
    },
    {
      label: "Flow 2",
      title: "HTTP request path",
      caption: "How one request travels through the layers and back.",
      steps: [
        { main: "Client", sub: "HTTP" },
        { main: "Tomcat", sub: "embedded" },
        { main: "Filters", sub: "Security" },
        { main: "DispatcherServlet", sub: "front ctrl" },
        { main: "Controller", sub: "@GetMapping" },
        { main: "Service", sub: "logic" },
        { main: "Repository", sub: "JPA" },
        { main: "Database", sub: "SQL" },
        { main: "JSON response", sub: "@ResponseBody" },
      ],
    },
  ],
  baseline: "Spring Boot 4.1 · Java 17+",
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
