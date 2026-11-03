import type { SyntaxSheet } from "./types";

export const springBoot: SyntaxSheet = {
  tagline:
    "The Spring Boot annotations and code you actually write every day: controllers, services, repos, config.",
  baseline: "Spring Boot 4.1",
  lang: "java",
  groups: [
    {
      title: "Bootstrapping",
      rows: [
        {
          syntax: "@SpringBootApplication",
          what: "Main app class (config + scan + autoconfig)",
          example: "@SpringBootApplication\nclass App {}",
        },
        {
          syntax: "SpringApplication.run(App.class, args)",
          what: "Start the app",
          example: "SpringApplication.run(App.class, args);",
        },
        {
          syntax: "@ComponentScan",
          what: "Where to look for beans (usually implied)",
          example: '@ComponentScan("com.acme")',
        },
        {
          syntax: "@EnableScheduling",
          what: "Turn on @Scheduled tasks",
          example: "@EnableScheduling",
        },
        {
          syntax: "@Scheduled(fixedRate = ms)",
          what: "Run a method on a timer",
          example: "@Scheduled(fixedRate = 5000)",
        },
      ],
      combos: [
        {
          label: "Minimal application entry point",
          code: `@SpringBootApplication
public class PaymentApp {
    public static void main(String[] args) {
        SpringApplication.run(PaymentApp.class, args);
    }
}`,
        },
      ],
    },
    {
      title: "Web (REST controllers)",
      rows: [
        {
          syntax: "@RestController",
          what: "Controller returning JSON bodies",
          example: "@RestController\nclass UserController {}",
        },
        {
          syntax: '@RequestMapping("/base")',
          what: "Base path for the class",
          example: '@RequestMapping("/api/users")',
        },
        { syntax: '@GetMapping("/{id}")', what: "Handle GET", example: '@GetMapping("/{id}")' },
        {
          syntax: "@PostMapping / @PutMapping / @DeleteMapping / @PatchMapping",
          what: "Other HTTP verbs",
          example: "@PostMapping",
        },
        {
          syntax: "@PathVariable",
          what: "Bind a URL path segment",
          example: "@PathVariable Long id",
        },
        {
          syntax: '@RequestParam(defaultValue = "0")',
          what: "Bind a query parameter",
          example: "@RequestParam int page",
        },
        {
          syntax: "@RequestBody",
          what: "Bind the JSON request body",
          example: "@RequestBody UserDto dto",
        },
        {
          syntax: "ResponseEntity<T>",
          what: "Control status + headers + body",
          example: "ResponseEntity.ok(user)",
        },
        {
          syntax: "ResponseEntity.status(201).body(x)",
          what: "Custom status code",
          example: "ResponseEntity.created(uri).body(u)",
        },
        {
          syntax: "@ResponseStatus(HttpStatus.CREATED)",
          what: "Fixed status for a handler",
          example: "@ResponseStatus(HttpStatus.CREATED)",
        },
      ],
      combos: [
        {
          label: "A REST controller",
          code: `@RestController
@RequestMapping("/api/payments")
class PaymentController {
    private final PaymentService service;
    PaymentController(PaymentService service) { this.service = service; }

    @GetMapping("/{id}")
    ResponseEntity<Payment> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.find(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    Payment create(@Valid @RequestBody PaymentDto dto) {
        return service.create(dto);
    }
}`,
        },
      ],
    },
    {
      title: "Dependency injection and beans",
      rows: [
        {
          syntax: "@Component",
          what: "Generic Spring-managed bean",
          example: "@Component\nclass Clock {}",
        },
        {
          syntax: "@Service",
          what: "Business-logic bean",
          example: "@Service\nclass PaymentService {}",
        },
        {
          syntax: "@Repository",
          what: "Data-access bean (+ exception translation)",
          example: "@Repository\ninterface UserRepo {}",
        },
        {
          syntax: "constructor injection",
          what: "Preferred way to inject (no annotation needed)",
          example: "Svc(Repo repo) { this.repo = repo; }",
        },
        {
          syntax: "@Autowired",
          what: "Inject a bean (optional on single constructor)",
          example: "@Autowired Repo repo;",
        },
        {
          syntax: "@Bean",
          what: "Declare a bean from a method",
          example: "@Bean RestClient client() { ... }",
        },
        {
          syntax: "@Configuration",
          what: "Class that defines @Bean methods",
          example: "@Configuration\nclass AppConfig {}",
        },
        {
          syntax: '@Qualifier("name")',
          what: "Pick among multiple candidates",
          example: '@Qualifier("primaryDs")',
        },
        {
          syntax: '@Value("${key}")',
          what: "Inject a config property",
          example: '@Value("${app.fee}") int fee;',
        },
        {
          syntax: "@Primary",
          what: "Default bean when several match",
          example: "@Primary\n@Bean DataSource ds() {}",
        },
      ],
    },
    {
      title: "Data and JPA",
      rows: [
        { syntax: "@Entity", what: "Map a class to a table", example: "@Entity\nclass Payment {}" },
        { syntax: "@Id", what: "Primary key field", example: "@Id Long id;" },
        {
          syntax: "@GeneratedValue(strategy = IDENTITY)",
          what: "Auto-generate the id",
          example: "@GeneratedValue(strategy = GenerationType.IDENTITY)",
        },
        {
          syntax: '@Column(name = "...", nullable = false)',
          what: "Column mapping",
          example: "@Column(nullable = false) String status;",
        },
        {
          syntax: "@ManyToOne / @OneToMany / @ManyToMany",
          what: "Relationships",
          example: "@ManyToOne User user;",
        },
        {
          syntax: "JpaRepository<T, ID>",
          what: "CRUD + paging for free",
          example: "interface PayRepo extends JpaRepository<Payment, Long> {}",
        },
        {
          syntax: "derived query: findByX",
          what: "Query from the method name",
          example: "List<Payment> findByStatus(String status);",
        },
        {
          syntax: '@Query("...")',
          what: "Custom JPQL / native SQL",
          example: '@Query("SELECT p FROM Payment p WHERE p.amount > ?1")',
        },
        {
          syntax: "@Transactional",
          what: "Run in one DB transaction",
          example: "@Transactional\nvoid transfer() { ... }",
        },
        {
          syntax: "@Modifying",
          what: "Mark an update/delete @Query",
          example: '@Modifying @Query("UPDATE ...")',
        },
      ],
      combos: [
        {
          label: "Entity + repository",
          code: `@Entity
class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;
    private BigDecimal amount;
    // getters / setters
}

interface PaymentRepo extends JpaRepository<Payment, Long> {
    List<Payment> findByStatus(String status);

    @Query("SELECT p FROM Payment p WHERE p.amount > :min")
    List<Payment> above(@Param("min") BigDecimal min);
}`,
        },
      ],
    },
    {
      title: "Validation",
      rows: [
        {
          syntax: "@Valid",
          what: "Validate a @RequestBody",
          example: "create(@Valid @RequestBody Dto d)",
        },
        {
          syntax: "@NotNull / @NotBlank / @NotEmpty",
          what: "Required value / text / collection",
          example: "@NotBlank String name;",
        },
        {
          syntax: "@Size(min =, max =)",
          what: "Length / size bounds",
          example: "@Size(min = 2, max = 50) String name;",
        },
        { syntax: "@Min(n) / @Max(n)", what: "Numeric bounds", example: "@Min(0) int qty;" },
        { syntax: "@Email", what: "Email format", example: "@Email String email;" },
        {
          syntax: '@Pattern(regexp = "...")',
          what: "Regex rule",
          example: '@Pattern(regexp = "[A-Z]{3}") String code;',
        },
        {
          syntax: "BindingResult",
          what: "Read validation errors in-handler",
          example: "create(@Valid Dto d, BindingResult br)",
        },
      ],
    },
    {
      title: "Exception handling",
      rows: [
        {
          syntax: "@RestControllerAdvice",
          what: "Global handler (returns JSON)",
          example: "@RestControllerAdvice\nclass ApiErrors {}",
        },
        {
          syntax: "@ExceptionHandler(Ex.class)",
          what: "Handle one exception type",
          example: "@ExceptionHandler(NotFound.class)",
        },
        {
          syntax: "@ResponseStatus(HttpStatus.NOT_FOUND)",
          what: "Map an exception to a status",
          example: "@ResponseStatus(HttpStatus.NOT_FOUND)",
        },
        {
          syntax: "ResponseStatusException",
          what: "Throw with a status inline",
          example: "throw new ResponseStatusException(HttpStatus.NOT_FOUND);",
        },
        {
          syntax: "@Valid errors -> 400",
          what: "MethodArgumentNotValidException",
          example: "@ExceptionHandler(MethodArgumentNotValidException.class)",
        },
      ],
      combos: [
        {
          label: "Global exception handler",
          code: `@RestControllerAdvice
class ApiExceptionHandler {

    @ExceptionHandler(PaymentNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    ErrorResponse notFound(PaymentNotFoundException ex) {
        return new ErrorResponse("PAYMENT_NOT_FOUND", ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ErrorResponse invalid(MethodArgumentNotValidException ex) {
        return new ErrorResponse("VALIDATION", ex.getMessage());
    }
}`,
        },
      ],
    },
    {
      title: "Configuration and profiles",
      rows: [
        { syntax: "application.yml", what: "Main config file", example: "server:\n  port: 8081" },
        {
          syntax: "spring.datasource.url",
          what: "DB connection URL",
          example: "spring.datasource.url=jdbc:postgresql://localhost/db",
        },
        {
          syntax: "spring.jpa.hibernate.ddl-auto",
          what: "Schema handling (none/update/validate)",
          example: "spring.jpa.hibernate.ddl-auto=validate",
        },
        {
          syntax: '@ConfigurationProperties(prefix = "app")',
          what: "Bind a config group to a bean",
          example: '@ConfigurationProperties(prefix = "app")',
        },
        { syntax: '@Profile("dev")', what: "Bean only in a profile", example: '@Profile("dev")' },
        {
          syntax: "spring.profiles.active",
          what: "Choose active profile(s)",
          example: "spring.profiles.active=prod",
        },
        {
          syntax: "application-<profile>.yml",
          what: "Per-profile overrides",
          example: "application-prod.yml",
        },
      ],
      combos: [
        {
          label: "Typed config with @ConfigurationProperties",
          code: `@ConfigurationProperties(prefix = "payment")
public record PaymentProps(String currency, BigDecimal fee) {}

# application.yml
payment:
  currency: INR
  fee: 2.50`,
        },
      ],
    },
    {
      title: "Testing",
      rows: [
        {
          syntax: "@SpringBootTest",
          what: "Load the full context",
          example: "@SpringBootTest\nclass AppTests {}",
        },
        {
          syntax: "@WebMvcTest(Controller.class)",
          what: "Test only the web layer",
          example: "@WebMvcTest(PaymentController.class)",
        },
        {
          syntax: "@DataJpaTest",
          what: "Test only the JPA layer",
          example: "@DataJpaTest\nclass RepoTests {}",
        },
        {
          syntax: "MockMvc",
          what: "Call endpoints without a server",
          example: 'mockMvc.perform(get("/api/x"))',
        },
        {
          syntax: "@MockitoBean",
          what: "Replace a bean with a mock",
          example: "@MockitoBean PaymentService service;",
        },
        {
          syntax: "@Autowired MockMvc mvc",
          what: "Inject the test client",
          example: "@Autowired MockMvc mvc;",
        },
        {
          syntax: "assertThat(x).isEqualTo(y)",
          what: "AssertJ assertion",
          example: "assertThat(res).isEqualTo(expected);",
        },
      ],
      combos: [
        {
          label: "Web-layer test with MockMvc",
          code: `@WebMvcTest(PaymentController.class)
class PaymentControllerTest {
    @Autowired MockMvc mvc;
    @MockitoBean PaymentService service;

    @Test
    void returnsPayment() throws Exception {
        given(service.find(1L)).willReturn(new Payment(1L));
        mvc.perform(get("/api/payments/1"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$.id").value(1));
    }
}`,
        },
      ],
    },
    {
      title: "Actuator (operations endpoints)",
      rows: [
        {
          syntax: "spring-boot-starter-actuator",
          what: "Add the ops endpoints",
          example: "add the starter dependency",
        },
        {
          syntax: "/actuator/health",
          what: "Liveness / readiness",
          example: "GET /actuator/health",
        },
        { syntax: "/actuator/info", what: "Build / app info", example: "GET /actuator/info" },
        {
          syntax: "/actuator/metrics",
          what: "Metrics (JVM, HTTP, ...)",
          example: "GET /actuator/metrics/jvm.memory.used",
        },
        {
          syntax: "/actuator/prometheus",
          what: "Metrics for Prometheus scrape",
          example: "GET /actuator/prometheus",
        },
        {
          syntax: "/actuator/env /beans /mappings",
          what: "Config, beans, routes",
          example: "GET /actuator/beans",
        },
        {
          syntax: "management.endpoints.web.exposure.include",
          what: "Choose exposed endpoints",
          example: "management.endpoints.web.exposure.include=health,info,metrics",
        },
      ],
    },
  ],
};
