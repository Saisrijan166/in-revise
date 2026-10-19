# Coverage: Spring Boot
Reference: reference/spring-boot.md  ·  Last updated: 19-10-2026

Every numbered section (0–164) and every "why do we need X if Y exists" question (why-Q1 to why-Q40) appears in exactly one of
Mapped, Corrected or Dropped. Baseline for corrections: Spring Boot 4.1 (4.1.1). Sources for corrections are primary pages.

## Mapped
| Reference item (number + short title) | Landed in | Note |
|---|---|---|
| 0. One-minute memory map | concept spring-vs-spring-boot (Spring and Boot halves); spine step 1 | Bean/annotation and request-path halves belong to beans-di and web units |
| 1. Spring vs Spring Boot | concept spring-vs-spring-boot (points, trap, comparison spring-framework-vs-mvc-vs-boot) |  |
| 3. IoC | concept ioc-container (hook, trap, Interview Q) |  |
| 4. Dependency injection | concept dependency-injection (diagram); "IoC = what, DI = how" as the ioc-container trap |  |
| 5. Spring container | concept ioc-container (diagram); node application-context |  |
| 6. Bean | node bean, glossary bean; @Component vs @Bean split goes to comparison component-vs-bean-annotation |  |
| 8. @SpringBootApplication | concept spring-boot-application (diagram, points) |  |
| 9. @Configuration | node configuration-annotation; point and Interview Q in component-vs-bean |  |
| 10. @Bean | node bean-annotation; comparison component-vs-bean-annotation (third-party classes row) |  |
| 11. @Component | node component-annotation; glossary |  |
| 12. @Service | node service-stereotype; comparison component-vs-service-vs-repository |  |
| 13. @Repository | node repository-stereotype (exception translation); comparison component-vs-service-vs-repository |  |
| 14. @Controller | concept rest-controller; tree type controller-annotation; comparison controller-vs-restcontroller |  |
| 15. @RestController | concept rest-controller (hook, embedded comparison) |  |
| 16. DI: 3 types | comparison constructor-vs-setter-vs-field-injection; nodes under dependency-injection |  |
| 17. @Autowired | node autowired-annotation; trap in dependency-injection (single constructor) |  |
| 18. Multiple beans | concept bean-selection (diagram, trap) |  |
| 19. @Qualifier | node qualifier-annotation; comparison primary-vs-qualifier |  |
| 20. @Primary | node primary-annotation; comparison primary-vs-qualifier |  |
| 21. Bean naming | point and node default-bean-name in bean-selection; comparison component-vs-bean-annotation row |  |
| 22. Bean scopes | concept bean-scopes (table) |  |
| 23. Singleton is not a JVM singleton | bean-scopes trap |  |
| 24. Prototype | node prototype-scope; comparison singleton-vs-prototype | Made concrete: "not managed fully" means no destroy callbacks |
| 25. Request / session | nodes request-scope, session-scope; Interview Q in bean-scopes |  |
| 26. Lazy initialization | concept bean-lifecycle (points, trap, Interview Q) |  |
| 27. Bean lifecycle | concept bean-lifecycle (Steps) |  |
| 28. Auto-configuration | concept auto-configuration (hook, flow diagram) |  |
| 29. @EnableAutoConfiguration | tree node enable-auto-configuration; concept spring-boot-application (point) |  |
| 30. Auto-configuration is conditional | concept auto-configuration (points, trap); tree family conditional-annotations |  |
| 31. Starter dependencies | concept starters (table, hook) |  |
| 33. application.properties / YAML | concept externalized-configuration (Defaults: file name, folders); nodes application-properties-file, application-yaml-file; comparison properties-vs-yaml |  |
| 34. Externalized configuration | concept externalized-configuration (precedence table, placeholders point, secrets Interview Q) | Unordered source list turned into a ranked table |
| 35. @Value | concept configuration-properties (node value-annotation, point, comparison column) |  |
| 37. Profiles | concept profiles (Mermaid, points, Defaults, Interview Qs) |  |
| 38. @Profile | concept profiles (Example, node profile-annotation) |  |
| 39. REST API structure | concept dispatcher-servlet (layered diagram) | controller → service → repository → DB drawn once, here |
| 40. Common REST annotations | concept request-mapping; tree types request-mapping-annotation, shortcut-mappings |  |
| 41. @PathVariable | concept request-mapping; comparison pathvariable-vs-requestparam-vs-requestbody |  |
| 42. @RequestParam | concept request-mapping (trap: required by default); same comparison |  |
| 43. @RequestBody | concept request-mapping; same comparison |  |
| 44. @RequestHeader | tree type request-header; picture in request-mapping |  |
| 45. @ResponseStatus | tree type response-status; rest-controller example and Interview Q |  |
| 46. ResponseEntity | tree type response-entity; rest-controller point and Interview Q |  |
| 47. JSON serialisation | rest-controller (Interview Q, point); tree type jackson-json; tree node http-message-converter | Boot 4 prefers Jackson 3 added |
| 48. DTO | concept dto |  |
| 49. Validation | concept validation |  |
| 50. Common validation annotations | concept validation (constraint table); tree family constraint-annotations | @Positive, @Negative, @Past, @Future cut (see Dropped) |
| 51. Global exception handling | concept exception-handling |  |
| 52. @ExceptionHandler | concept exception-handling; comparison exceptionhandler-vs-controlleradvice |  |
| 53. Spring Data JPA | concept jpa-hibernate-spring-data (point, Compare); concept spring-data-repositories (example) |  |
| 54. JPA vs Hibernate vs Spring Data JPA | comparison jpa-vs-hibernate-vs-spring-data-jpa (embedded); concept jpa-hibernate-spring-data hook |  |
| 55. @Entity | tree node entity-annotation; glossary entity-annotation; point "Entity rules" |  |
| 56. @Id | tree node id-annotation; glossary id-annotation |  |
| 57. @GeneratedValue | tree node id-generation with 5 strategies; glossary generated-value |  |
| 58. Common JPA relationships | concept jpa-entities (How it works table with fetch defaults) |  |
| 59. LAZY vs EAGER | comparison lazy-vs-eager-fetch; tree node fetch-types | "EAGER is not one query" confirmed by Hibernate 7.4 User Guide (secondary selects in JPQL) |
| 60. N+1 query problem | concept lazy-loading-n-plus-one (Mermaid, point 1 + 100 = 101, fixes) |  |
| 61. Transactions | concept transactional (Why, flow diagram) |  |
| 62. ACID | concept acid-isolation (bullet, tree node acid-properties with 4 children) |  |
| 64. Transaction propagation | concept transaction-propagation (table of 7, tree nodes) |  |
| 65. Transaction isolation | concept acid-isolation (anomaly table, points, Interview Q) |  |
| 66. Spring AOP | concept spring-aop (why, table of terms) |  |
| 67. Core AOP terms | concept spring-aop (table, points); tree types aop-aspect, aop-join-point, aop-pointcut, aop-advice (5 kinds), aop-weaving; glossary |  |
| 68. Spring AOP proxy | concept aop-proxies (Mermaid path, points, defaults); comparison jdk-proxy-vs-cglib |  |
| 69. Self-invocation trap | concept aop-proxies (trap, tree node self-invocation with 3 fixes, Interview Q) |  |
| 70. Spring Security (what it handles) | concept security-filter-chain (hook, Interview Q); glossary spring-security | Feature list folded into the topic's six concepts |
| 71. Authentication vs Authorization | concept authentication-flow (hook, trap); comparison authentication-vs-authorization (embedded) |  |
| 72. Spring Security filter chain | concept security-filter-chain (Mermaid flow) | Extended with DelegatingFilterProxy and FilterChainProxy |
| 73. Password storage (BCrypt, Argon2, verify at login) | concept password-encoding (table, encode/matches points) |  |
| 74. JWT (header.payload.signature; signed, not encrypted) | concept jwt-resource-server (flow, trap); tree jwt-structure, jws-signed-jwt, jwe-encrypted-jwt |  |
| 75. CORS vs CSRF | concept csrf-cors; comparison csrf-vs-cors (embedded) |  |
| 76. @PreAuthorize | concept authorization-rules (table, example) | Added that @EnableMethodSecurity is required |
| 78. @SpringBootTest | concept spring-boot-testing (point, Defaults, tree node full-context-test) |  |
| 79. @WebMvcTest | concept spring-boot-testing (point, trap, example, tree node web-mvc-test) |  |
| 80. @DataJpaTest | concept spring-boot-testing (point, Defaults, tree node data-jpa-test) |  |
| 81. Mockito | concept mockito (Steps, example, tree nodes mock-annotation, inject-mocks) |  |
| 82. Mock vs stub | concept mockito (Interview Q, tree nodes mockito-stub, mockito-verify); glossary mock-object, stub-object |  |
| 83. Actuator | concept actuator (hook, points, Defaults, endpoint tree nodes) |  |
| 84. Health check | concept actuator (Mermaid, point, tree node health-endpoint) | "Healthy means traffic allowed" is really readiness; covered by liveness-vs-readiness |
| 85. Logging | concept logging (hook, Example, {} placeholder point and Interview Q) |  |
| 87. Startup flow | concept application-startup (Steps) | Kept at interview level, with a line that the real code has more events |
| 88. CommandLineRunner | tree node command-line-runner; comparison command-line-runner-vs-application-runner |  |
| 89. ApplicationRunner | tree node application-runner; comparison; Example |  |
| 90. Embedded server port | concept embedded-server (Defaults, Interview Q); tree node server-port |  |
| 91. CLI argument override | concept externalized-configuration (Example, node command-line-args, trap) |  |
| 92. Common HTTP status codes | concept rest-api-design (bullets); tree family status-code-classes; concept authentication-flow (points, trap); tree http-401, http-403; glossary http-401, http-403 | 401 vs 403 detail left to authentication-flow, linked Other codes belong to the web unit |
| 93. Common REST design | concept rest-api-design (CRUD table) |  |
| 95. Filter vs interceptor vs AOP | concept filters-interceptors; comparison filter-vs-interceptor-vs-aop (embedded) |  |
| 96. Filter vs interceptor | concept filters-interceptors (Interview Q) |  |
| 97. Spring MVC | concept dispatcher-servlet; glossary spring-mvc |  |
| 98. DispatcherServlet | concept dispatcher-servlet |  |
| 99. Spring MVC request flow | concept dispatcher-servlet (Mermaid) |  |
| 101. Derived query methods | tree node derived-query; example; glossary |  |
| 102. @Query | tree node query-annotation; example |  |
| 103. JPQL vs SQL | concept spring-data-repositories (Interview Q, bullet); tree node native-query |  |
| 104. Pagination | tree node paged-results; point Pageable (page from 0); example |  |
| 105. Sorting | tree node sort-param; example |  |
| 106. Optional | tree node optional-result; Interview Q |  |
| 107. Null handling (orElseThrow) | concept spring-data-repositories (sayIt, example, Interview Q) |  |
| 108. Entity vs DTO vs model | concept dto; comparison entity-vs-dto (embedded) | "domain model" left out: not a Spring term interviewers press on |
| 109. @JsonIgnore | concept dto (point, trap, Interview Q); tree type json-ignore |  |
| 110. Lazy loading + JSON trap | concept dto (Interview Q, Defaults: open-in-view); relation to lazy-loading-n-plus-one; concept lazy-loading-n-plus-one (bullet, Interview Q, relation to dto) |  |
| 111. Cascade | tree node cascade-types; point; Interview Q |  |
| 112. Orphan removal | tree node orphan-removal; relation vs cascade-remove; Interview Q |  |
| 113. Owning side | tree node owning-side; trap; Interview Q |  |
| 114. @JoinColumn | tree node join-column; example |  |
| 115. Database transaction vs Spring transaction | concept transactional (How it works bullet on PlatformTransactionManager; tree node platform-transaction-manager) |  |
| 116. Transactional service layer | concept transactional (point "Where", Interview Q, tree node service-layer-transaction) |  |
| 117. Transaction readOnly | concept transactional (point readOnly, tree node read-only-tx, glossary read-only-transaction) |  |
| 118. Spring Cache | concept spring-cache |  |
| 119. @Cacheable vs @CachePut vs @CacheEvict | comparison cacheable-vs-cacheput-vs-cacheevict (embedded in spring-cache) |  |
| 120. Redis + Spring Boot | concept spring-cache (tree node redis-cache-provider, TTL Q, relation redis vs caffeine) |  |
| 121. Async | concept async-scheduling (points, Defaults, Interview Q) | "configure the executor" became the unbounded-queue point with the real Boot 4.1 defaults |
| 122. Scheduling | concept async-scheduling; comparison fixed-rate-vs-fixed-delay (with cron) |  |
| 123. Scheduled + multiple instances | concept async-scheduling (trap, tree node scheduled-on-many-instances, ShedLock, Interview Q) |  |
| 124. Event system | concept application-events (Steps, example) |  |
| 125. Synchronous vs asynchronous events | concept application-events (trap, point, Interview Q, tree node async-event-listener) |  |
| 126. RestClient / HTTP clients | concept http-clients; tree types rest-client, web-client, openfeign-client |  |
| 127. RestClient vs WebClient | comparison restclient-vs-webclient-vs-resttemplate (embedded); http-clients trap |  |
| 128. Spring WebFlux | concept mvc-vs-webflux; tree types webflux-stack, reactor-mono, reactor-flux |  |
| 129. Spring MVC vs WebFlux | concept mvc-vs-webflux; comparison mvc-vs-webflux-vs-virtual-threads (embedded) |  |
| 130. Blocking in WebFlux | concept mvc-vs-webflux (Interview Q, bullet); tree type blocking-in-webflux |  |
| 132. @Import | tree node import-annotation; How it works bullet in spring-boot-application |  |
| 134. @Conditional | tree family conditional-annotations (5 members); glossary conditional-annotations |  |
| 135. How Boot knows what to configure | concept auto-configuration (How it works bullet, Interview Q) |  |
| 137. Starter data JPA | tree node starter-data-jpa (note: add the DB driver) |  |
| 138. Version management | concept starters (BOM point, trap, Interview Q); tree nodes spring-boot-dependencies-bom, spring-boot-starter-parent |  |
| 139. Maven vs Gradle | tree nodes build-tools, maven, gradle; glossary maven, gradle |  |
| 140. Fat jar / executable jar | concept packaging-deployment (hook, trap, comparison jar-vs-war-vs-native-image) |  |
| 141. DevTools | tree node devtools (under spring-vs-spring-boot); glossary devtools; one bullet in How it works | Restart internals, LiveReload, remote DevTools dropped |
| 142. Error handling (consistent contract, no stack traces) | concept exception-handling (ProblemDetail, Defaults for /error) |  |
| 143. Observability | concept observability (table of three signals) | Boot auto-configures tracing itself (Micrometer Tracing), not only an external stack |
| 144. Health vs readiness vs liveness | comparison liveness-vs-readiness; concept actuator (trap, Interview Q) |  |
| 145. Caching vs database | concept spring-cache (trap, Interview Q) |  |
| 146. Common Spring annotation cheat table | glossary terms and tree nodes inside each concept (no separate table page) | Each annotation sits with the concept it belongs to |
| 147. REST annotation cheat table | concept request-mapping, rest-controller, tree types | @CrossOrigin left to csrf-cors (security unit) |
| 148. JPA annotation cheat table | tree node core-entity-annotations (@Table/@Column, @Transient, @Embeddable/@Embedded) and glossary | No separate table page |
| 149. Optimistic locking | concept locking; comparison optimistic-vs-pessimistic-locking (embedded); tree node optimistic-locking |  |
| 150. Pessimistic locking | concept locking; tree nodes pessimistic-write, pessimistic-read, lock-annotation |  |
| 151. Spring Data JDBC vs JPA | comparison spring-data-jdbc-vs-jpa; tree node spring-data-jdbc; Interview Q |  |
| 152. Persistence context | concept persistence-context (hook, example) |  |
| 153. Entity states | concept persistence-context (Mermaid, Interview Q); tree node entity-states |  |
| 154. save does not always mean insert | concept persistence-context (trap, Interview Q); tree node save-persist-or-merge |  |
| 155. Flush vs commit | concept persistence-context (trap, sayIt); tree node jpa-flush |  |
| 156. First-level cache | tree node first-level-cache; point |  |
| 157. Second-level cache | tree node second-level-cache; point (off until configured) |  |
| 158. Common Spring Boot interview questions | Interview Qs of the matching concepts (spring-vs-spring-boot, ioc-container, dependency-injection, spring-boot-application, auto-configuration, starters, bean-selection, transactional, spring-aop, aop-proxies, rest-controller, request-mapping, jpa-hibernate-spring-data, lazy-loading-n-plus-one, authentication-flow, spring-boot-testing) | Answers re-checked against primary sources |
| 159. Can/cannot: do not use new; constructor injection; @Component vs @Bean; multiple beans | dependency-injection (point + Interview Q), component-vs-bean, bean-selection | Only the DI/bean lines; the rest belong to other units |
| 160. Architecture to remember | concept dispatcher-servlet (Mermaid: filters incl. security, DispatcherServlet, layers; AOP and transactions as a bullet) |  |
| 161. Spring container memory story | concept application-startup (Steps: refresh builds beans); ioc-container diagram | Container/proxy parts belong to ioc-container and aop-proxies The request path half belongs to dispatcher-servlet |
| 162. One-line memory sheet | Spring and Boot lines: spring-vs-spring-boot hook/sayIt; @SpringBootApplication and AutoConfig lines: spring-boot-application, auto-configuration hooks | Other lines belong to other units |
| 163. The 10 things most likely asked | heat (1–3) of each concept | Used as a hint, per CLAUDE.md 3.8.3 |
| 164. Final mental model | spring-vs-spring-boot sayIt (Spring core vs Boot additions) |  |
| why-Q1. @Component vs @Bean | comparison component-vs-bean-annotation (embedded); Interview Q in component-vs-bean |  |
| why-Q2. @Component vs @Service vs @Repository | comparison component-vs-service-vs-repository; trap and Interview Q in component-vs-bean |  |
| why-Q3. @Controller vs @RestController | rest-controller Interview Q; comparison controller-vs-restcontroller |  |
| why-Q4. @Autowired vs constructor injection | dependency-injection trap and point "One constructor" |  |
| why-Q5. @Qualifier vs @Primary | comparison primary-vs-qualifier; Interview Q in bean-selection |  |
| why-Q6. @Value vs @ConfigurationProperties | concept configuration-properties (Interview Q 1); comparison value-vs-configuration-properties-vs-environment | Its sample class has the same gaps as 36 (see Corrected) |
| why-Q7. application.properties vs application.yml | comparison properties-vs-yaml |  |
| why-Q8. @ControllerAdvice vs @RestControllerAdvice | comparison exceptionhandler-vs-controlleradvice (3 sides); point in exception-handling |  |
| why-Q9. @ExceptionHandler vs @ControllerAdvice | exception-handling Interview Q and trap; same comparison |  |
| why-Q10. @RequestParam vs @PathVariable | request-mapping Interview Q; comparison pathvariable-vs-requestparam-vs-requestbody |  |
| why-Q11. @RequestBody vs @RequestParam | request-mapping Interview Q; same comparison |  |
| why-Q12. @RequestMapping vs @GetMapping | request-mapping Interview Q; relation shortcut-mappings vs request-mapping-annotation |  |
| why-Q14. If Hibernate does ORM, why JPA? | concept jpa-hibernate-spring-data (Interview Q, trap, Analogy JDBC/driver) | Analogy kept with a limit |
| why-Q15. If JPA exists, why Spring Data JPA? | concept jpa-hibernate-spring-data (Interview Q) |  |
| why-Q16. save() vs saveAndFlush() | concept persistence-context (Interview Q); tree node save-and-flush |  |
| why-Q17. If EAGER loads data, why LAZY? | concept lazy-loading-n-plus-one (Interview Q) |  |
| why-Q18. Entity vs DTO | dto Interview Q; comparison entity-vs-dto |  |
| why-Q19. Filter vs Interceptor | filters-interceptors Interview Q |  |
| why-Q20. Filter vs AOP | filters-interceptors Interview Q; comparison filter-vs-interceptor-vs-aop |  |
| why-Q21. @Transactional vs AOP | concept aop-proxies (Interview Q "who starts the transaction?"); relation spring-aop pairs transactional; concept transactional (Interview Q "How does @Transactional work if it is only an annotation?") | proxy details stay in aop-proxies |
| why-Q22. REQUIRED vs REQUIRES_NEW | comparison required-vs-requires-new; concept transaction-propagation (Interview Q, example) |  |
| why-Q23. @Component vs @Configuration | point and Interview Q in component-vs-bean |  |
| why-24. Spring vs Spring Boot (why was Boot created) | concept spring-vs-spring-boot (Interview Q) |  |
| why-25. Spring Boot vs Spring MVC | comparison spring-framework-vs-mvc-vs-boot; concept spring-vs-spring-boot (Interview Q) |  |
| why-26. @SpringBootApplication vs @EnableAutoConfiguration | concept spring-boot-application (Interview Q) |  |
| why-Q27. @Value vs Environment | comparison value-vs-configuration-properties-vs-environment (column c); concept configuration-properties (Interview Q 2) |  |
| why-Q28. @Async vs normal method (Java threads) | concept async-scheduling (Interview Q, merged with why-Q29) |  |
| why-Q29. @Scheduled vs a loop/thread | concept async-scheduling (same Interview Q as why-Q28) |  |
| why-Q30. Cache vs Database | concept spring-cache (Interview Q "If the database stores the data, why add a cache?") |  |
| why-Q31. If authentication checks the user, why authorization? | concept authentication-flow (Interview Q 1) |  |
| why-Q32. CORS vs CSRF: why both? | concept csrf-cors (Interview Q 1) |  |
| why-Q33. Session vs JWT: why JWT? | comparison session-vs-jwt; concept jwt-resource-server (Interview Q 1) |  |
| why-Q34. Spring MVC vs WebFlux | mvc-vs-webflux Interview Q and trap |  |
| why-Q35. RestClient vs WebClient | http-clients Interview Q |  |
| why-Q36. @Mock vs Spring mock-bean | comparison mock-vs-mockitobean; concept mockito (Interview Q) | Named the current annotation, @MockitoBean |
| why-Q37. Unit test vs @SpringBootTest | comparison unit-vs-slice-vs-springboottest; concept spring-boot-testing (Interview Q) |  |
| why-Q38. @WebMvcTest vs @SpringBootTest | comparison unit-vs-slice-vs-springboottest; concept spring-boot-testing (Interview Q) |  |
| why-Q39. @Cacheable vs @CachePut | comparison cacheable-vs-cacheput-vs-cacheevict |  |
| why-Q40. The pattern to use in interviews | the shape of every comparison: gist per side, rows, one-line verdict | Study advice, not a fact; no page of its own |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| 2. Why Spring Boot? | Lists "Embedded Tomcat/Jetty/Undertow" | Boot 4 removed Undertow; Tomcat (default) or Jetty for servlet apps | https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide |
| 7. Component scanning | The fix it gives is `@ComponentScan("com.other")` alone. Setting packages replaces the default base package, so the main package is no longer scanned unless it is listed too. It also says the class "may not be" scanned; a class outside is never scanned. | Use `scanBasePackages` (or @ComponentScan) and list the main package too; scanning covers the base packages and their sub-packages only | https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/ComponentScan.html |
| 32. Embedded server | Lists Undertow as a common embedded server | Undertow removed in 4.0 (not yet compatible with Servlet 6.1); WebFlux defaults to Reactor Netty | https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide |
| 36. @ConfigurationProperties | Sample class has private fields with no setters or constructor, and is never registered, so nothing would bind | Record with constructor binding, registered with @ConfigurationPropertiesScan or @EnableConfigurationProperties; @Validated added | https://docs.spring.io/spring-boot/reference/features/external-config.html |
| 63. @Transactional rollback trap | Vague ("do not trigger rollback in the same way") | Exact rule: RuntimeException and Error roll back, checked exceptions commit unless rollbackFor names them; mapped to transactional trap and points | https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/rolling-back.html |
| 77. Testing (lists "@MockBean / @MockitoBean", "may differ by version") | Vague; @MockBean no longer exists in the baseline | @MockBean deprecated in Boot 3.4 and removed in 4.0; use Spring Framework's @MockitoBean (6.2+) | https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide |
| 86. Log levels | Calls INFO a "typical production default"; it is Spring Boot's default in every environment, and FATAL/OFF are also valid settings | Point: Boot logs ERROR, WARN and INFO by default; levels order TRACE < DEBUG < INFO < WARN < ERROR; tree note for logging.level | https://docs.spring.io/spring-boot/reference/features/logging.html |
| 94. Idempotency | Presents Idempotency-Key as a settled practice; says GET is "normally expected" to be idempotent | GET is safe and idempotent by definition (RFC 9110); Idempotency-Key is an expired IETF draft (07), used by Stripe and Adyen; PATCH is not idempotent by default | https://www.rfc-editor.org/rfc/rfc9110.html ; https://www.ietf.org/archive/id/draft-ietf-httpapi-idempotency-key-header-07.html ; https://www.rfc-editor.org/rfc/rfc5789.html |
| 100. Spring Data repository interfaces | Chain Repository → CrudRepository → PagingAndSortingRepository shown as one line | Since Spring Data 3, PagingAndSortingRepository extends only Repository; JpaRepository extends ListCrudRepository, ListPagingAndSortingRepository and QueryByExampleExecutor (trap + Mermaid in spring-data-repositories; comparison crud-vs-jpa-repository) | https://docs.spring.io/spring-data/jpa/reference/repositories/core-concepts.html ; https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html |
| 136. Starter web | Says it may include validation; uses the old name starter-web | Web starters do not include validation since 2.3; in Boot 4 starter-web is deprecated in favour of starter-webmvc | https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.3-Release-Notes ; https://docs.spring.io/spring-boot/reference/using/build-systems.html |
| why-Q13. If CrudRepository has CRUD, why JpaRepository? | Same wrong single chain ending PagingAndSortingRepository → JpaRepository | Answer kept (JPA extras) with the correct hierarchy; Interview Q in spring-data-repositories | https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| starter-web deprecated, use starter-webmvc (4.0) | concept starters ("Changed in 4.0" point); tree node starter-webmvc | Current baseline name; all examples use it |
| Test starters per technology (4.0) | tree node test-starters | New in Boot 4 |
| Importing the BOM without the parent | concept starters (bullet, Interview Q) | Common follow-up when a company parent POM exists |
| Excluding an auto-configuration; --debug condition report | concept auto-configuration (points, Interview Qs) | Commonly asked follow-ups |
| ApplicationReadyEvent / ApplicationStartedEvent | concept application-startup; tree nodes | "Run code after startup" is a common question |
| Failure analysers | tree node failure-analyzer; point | Explains readable startup errors |
| Graceful shutdown on by default (3.4) | concept embedded-server; tree node graceful-shutdown | Changed default |
| Jetty switch, port 0 / -1, web-application-type=none | concept embedded-server | Common interview follow-ups |
| Circular dependencies | concept circular-dependencies | Commonly asked; Boot 2.6+ fails at startup by default |
| BeanFactory vs ApplicationContext | comparison beanfactory-vs-applicationcontext | Classic interview question (InterviewBit) |
| Singleton thread safety | bean-scopes point + Interview Q | Commonly asked (InterviewBit) |
| Prototype injected into a singleton; ObjectProvider | bean-scopes point, bullet, Interview Q; node object-provider | Common trap |
| Injecting List / Map of all beans | bean-selection point, example, Interview Q | Strategy-pattern question |
| Parameter-name fallback; qualifier beats primary | bean-selection diagram, trap | Accuracy of the "what happens with two beans" answer |
| @Fallback (Framework 6.2+) | node fallback-annotation | Newer option next to @Primary; kept as a node only |
| Default package warning; scanBasePackages does not cover @Entity or repositories | component-scanning points and bullets | Common startup pitfalls |
| @Lazy bean still created when an eager singleton needs it | bean-lifecycle trap | Common wrong answer |
| spring.main.lazy-initialization (false by default) | bean-lifecycle point, node | Boot-specific switch |
| Changed in 4.0: javax.annotation lifecycle annotations ignored | bean-lifecycle point | Framework 7 removed support |
| proxyBeanMethods default true | component-vs-bean bullet, node | The difference between @Configuration and @Component |
| BeanPostProcessor (one node) | bean-lifecycle tree | Where AOP proxies are created |
| JDK dynamic proxy vs CGLIB, Boot's CGLIB default | comparison jdk-proxy-vs-cglib; aop-proxies Defaults | A common follow-up to "how does @Transactional work"; Boot differs from core Spring |
| Final and private methods cannot be advised | aop-proxies point, tree node | Frequent cause of "my annotation is ignored" |
| Self-invocation fixes (other bean, self-injection, AspectJ) | tree children of self-invocation | Interviewers ask "how do you fix it?" |
| Boot's executor and scheduler defaults (8 core threads, unbounded queue; 1 scheduler thread; virtual-thread variants) | async-scheduling points and Defaults | Turns the reference's "don't assume unlimited threads" into checked numbers |
| @Async return types and exception handling | tree nodes under @Async | Common interview question |
| @TransactionalEventListener and its phases | application-events (point, tree, Interview Q, example) | Listed in scope; the usual follow-up to events |
| Spring events vs Kafka | application-events Interview Q, relation | Separates in-process events from messaging |
| @Aspect needs @Component | spring-aop point | Common "my aspect does nothing" mistake |
| Env var naming (relaxed binding: SPRING_DATASOURCE_URL) | externalized-configuration point + node os-environment-variables; node relaxed-binding | Common interview question; the reference names env vars but not the mapping |
| Config files outside the jar beat inside; profile file beats plain | externalized-configuration point | Core precedence rule |
| Secrets: no built-in encryption | externalized-configuration Interview Q, node config-secrets | Asked as "how do you keep secrets out of the jar" |
| @Value limited relaxed binding (kebab-case) | configuration-properties trap | Real, commonly missed difference |
| Records / constructor binding, @Validated, nested @Valid (3.4+) | configuration-properties points, Defaults | Current recommended practice |
| @Value missing key fails start-up | configuration-properties Defaults, comparison row | Frequent follow-up question |
| Default profile, last-wins, include, profile groups, active replaces | profiles points, trap, nodes | Commonly asked; trap on replace vs add |
| logback-spring.xml, file output, rotation defaults, structured logging (3.4+) | logging bullets, Defaults, nodes | Interview staples for Boot logging |
| Boot 4 prefers Jackson 3 (tools.jackson packages) | rest-controller point; dispatcher-servlet Defaults; glossary jackson | Changed in Boot 4.0; the reference predates it |
| RestTemplate deprecated in Framework 7.0 | http-clients point; comparison restclient-vs-webclient-vs-resttemplate | Common current interview question; reference does not mention RestTemplate |
| HTTP service clients (@HttpExchange) and OpenFeign feature-complete | http-clients; tree types http-interface-client, openfeign-client | Current recommended declarative client |
| HTTP client timeouts (spring.http.clients.*) | http-clients bullet; tree type http-client-timeouts | Practical point interviewers raise for service calls |
| ProblemDetail (RFC 9457), spring.mvc.problemdetails.enabled=false default, /error hides message and trace | exception-handling | Standard error body; makes ref 142 concrete |
| @EnableWebMvc switches off Boot's MVC auto-configuration | dispatcher-servlet trap | Common wrong answer |
| Validation starter not in the web starters since Boot 2.3 | validation trap | Common setup mistake |
| HandlerMethodValidationException for parameter constraints | validation bullet | Framework 6.1+ behaviour |
| postHandle cannot change a @ResponseBody response | filters-interceptors trap | Documented trap |
| Errors thrown in a filter never reach @ControllerAdvice | filters-interceptors point | Frequent follow-up |
| open-in-view on by default | dto Defaults; tree type open-in-view | Explains ref 110 |
| OWASP: pick fields, avoid mass assignment | dto trap, glossary mass-assignment | Primary backing for "DTO for security" |
| API versioning (Framework 7) | request-mapping bullet; tree type api-versioning | New in Framework 7 / Boot 4 |
| Virtual threads as a third option | mvc-vs-webflux point; comparison | Boot 3.2+ feature, asked alongside WebFlux |
| Both starters present → MVC wins | mvc-vs-webflux point (default) | Documented Boot behaviour |
| spring-boot-starter-web renamed spring-boot-starter-webmvc (old name deprecated) | comparison mvc-vs-webflux-vs-virtual-threads row | Boot 4.0 change |
| 201 + Location; PUT vs PATCH | rest-api-design table, Interview Q | Common REST design questions |
| Fetch defaults per annotation (ToOne EAGER, ToMany LAZY; JPA 3.2) | jpa-entities table, lazy-vs-eager-fetch | Commonly asked; reference only says LAZY/EAGER generally |
| Versions: Jakarta Persistence 3.2, Hibernate 7.4, Spring Data JPA 4.1 (Boot 4.1.1) | jpa-hibernate-spring-data point, comparison | Baseline versions |
| Records cannot be entities | jpa-entities Interview Q | Common modern-Java question; spec rule |
| Page vs Slice (count query) | tree nodes page-result, slice-result; relation | Common paging follow-up |
| Native query (@NativeQuery / nativeQuery = true) | tree node native-query | Pairs with JPQL vs SQL |
| save() isNew rule (version, then id; Persistable) | persistence-context Interview Q | Explains why save() may update |
| Flush modes AUTO (default) and COMMIT; no flush without a transaction | tree node jpa-flush; relation dirty-checking needs transactional | Flush vs commit depth |
| LazyInitializationException and spring.jpa.open-in-view (on by default, startup warning) | lazy-loading-n-plus-one | Very common Boot interview question |
| Batch fetching (hibernate.default_batch_fetch_size) | lazy-loading-n-plus-one | Named fix in reference; made concrete |
| Lost update; ObjectOptimisticLockingFailureException; PESSIMISTIC_READ vs WRITE; @Lock on repository methods | locking | Needed to answer locking questions in Spring terms |
| Connection pooling with HikariCP | concept connection-pool | Common interview question; Boot default pool and defaults |
| Schema migrations: Flyway and Liquibase | concept schema-migrations | ddl-auto=update in production is a common trap |
| UnexpectedRollbackException | transaction-propagation trap, tree node, glossary | The classic REQUIRED trap |
| REQUIRES_NEW pool exhaustion warning | transaction-propagation point, comparison row | Spring docs warn about deadlock |
| Isolation.DEFAULT = database's level (PostgreSQL READ COMMITTED, MySQL REPEATABLE READ) | acid-isolation points and trap | Interviewers ask which level Spring uses |
| Simple ConcurrentHashMap fallback and TTL on the provider | spring-cache points, Q | Common "why no expiry" question |
| Changed in 4.0: spring-boot-starter-flyway / -liquibase | schema-migrations point | 4.0 change that breaks upgrades |
| DelegatingFilterProxy, FilterChainProxy, first matching chain | security-filter-chain | Commonly asked (InterviewBit lists both) |
| WebSecurityConfigurerAdapter removed (6.0); lambda DSL only, and() removed (7.0) | security-filter-chain trap and point | Most common outdated answer |
| Boot defaults when the starter is added (user, logged password, whole app secured) | security-filter-chain Defaults, Interview Q | Frequently asked |
| AuthenticationManager / ProviderManager / AuthenticationProvider / UserDetailsService / SecurityContextHolder | authentication-flow | Core login flow interviewers ask about |
| authorizeHttpRequests rule order, anyRequest, denyAll allow-list | authorization-rules | Common trap |
| @EnableMethodSecurity needed; @Secured vs @PreAuthorize; role hierarchy | authorization-rules | Reference shows @PreAuthorize without how to switch it on |
| hasRole vs hasAuthority (ROLE_ prefix) | comparison hasrole-vs-hasauthority | Common confusion |
| DelegatingPasswordEncoder {id} format, bcrypt default strength 10, salt, why not MD5/SHA | password-encoding | Standard follow-ups |
| OAuth2 resource server checks (signature, exp, nbf, iss; aud optional), SCOPE_ authorities, RS256, 60 s skew | jwt-resource-server | How Spring actually validates JWTs |
| Boot 4 starter name spring-boot-starter-security-oauth2-resource-server | tree note oauth2-resource-server | Changed in Boot 4.0 |
| JWT logout / revocation trade-off (jti deny list) | jwt-resource-server Interview Q; session-vs-jwt | Common follow-up to "why JWT" |
| Preflight, credentials vs "*", http.cors() before security, @CrossOrigin | csrf-cors | Most common CORS bug in Spring apps |
| When CSRF may be disabled; bearer requests skip CSRF; csrf.spa() (7.0) | csrf-cors, tree | Common question |
| Testcontainers and @ServiceConnection | concept testcontainers | Standard way to test against a real database since Boot 3.1; common interview topic |
| Test slices beyond web/JPA (@DataJdbcTest, @JsonTest, @RestClientTest), context caching, MockMvc | tree under spring-boot-testing | Interviewers ask how to keep test suites fast |
| RANDOM_PORT tests are not rolled back | concept spring-boot-testing (Interview Q) | Common trap |
| @AutoConfigureMockMvc needed with @SpringBootTest | concept spring-boot-testing (Defaults) | Changed in Boot 4.0 |
| Actuator exposure defaults and securing endpoints | concept actuator | Most asked Actuator questions |
| Metrics, tracing defaults (10% sampling), trace IDs in logs, tag cardinality | concept observability | Concrete Spring Boot side of item 143 |
| War deployment, buildpacks images, GraalVM native image and Spring AOT | concept packaging-deployment; comparison jar-vs-war-vs-native-image | Common deployment questions; native needs GraalVM 25 in Boot 4 |
| Spring Cloud overview (problem → project map, release train, removed Netflix modules) | concept `spring-cloud-overview` (table) | Owner kept Spring Cloud (17-10-2026); common opener "Boot vs Cloud" in microservices interviews |
| Config Server and refresh (@RefreshScope, /actuator/refresh, Spring Cloud Bus) | concept `config-server` (flow) | Standard Spring Cloud interview topic: central config and live refresh |
| Service discovery with Eureka, client-side load balancing, Kubernetes alternative | concept `service-discovery-eureka` (flow) | Most asked Spring Cloud topic; Kubernetes point keeps it current |
| API gateway: Spring Cloud Gateway (routes, predicates, filters, rate limiting, lb://) | concept `spring-cloud-gateway` (flow) | Commonly asked: role of a gateway, predicates vs filters, rate limiting |
| Circuit breaker and retry (Resilience4j, states, fallback, order; Spring Framework 7 @Retryable) | concept `resilience4j` (state diagram) | Very common microservices question; 7.0 core retry is a current trap |
| Retry vs circuit breaker | comparison `retry-vs-circuit-breaker` | Frequently confused pair |
| Messaging with Spring Kafka (template, listener, consumer group, ordering, at-least-once, DLT) | concept `spring-kafka` (flow) | Event-driven questions are common in Spring microservices interviews |
| 31 glossary terms (microservices, release train, Config Server, @RefreshScope, discovery, Eureka, registry, client-side LB, @LoadBalanced, API gateway, route, predicate, circuit breaker, Resilience4j, retry, backoff, bulkhead, rate limiting, fallback, Kafka, topic, partition, consumer group, offset, KafkaTemplate, @KafkaListener, DLT, at-least-once, idempotent consumer) | glossary.yaml | Interviewer words used in this topic |

## Dropped
| Reference item | Reason (rare / advanced / duplicate / unverifiable) |
|---|---|
| 131. Spring Boot configuration annotations (list) | duplicate: each annotation is covered in its own concept |
| 133. @ImportAutoConfiguration | rare (test and controlled set-ups only) |

### Dropped from the first version (17-10-2026, not in the reference)
| Item | Reason |
|---|---|
| Old draft: spring.factories vs AutoConfiguration.imports trap | advanced (custom auto-configuration authoring); the imports file stays as one tree node |
| Old draft: custom auto-configuration and custom starter nodes | advanced |
| Old draft: proxyBeanMethods default of @AutoConfiguration | advanced |
| Old draft: Spring Initializr Interview Q and node | rare in interviews; low value |
| Old draft: classic starters, technical starters nodes | advanced (migration aid) |
| Old draft: full list of SpringApplication events (Starting, EnvironmentPrepared, Prepared, Failed) | advanced; only Started and Ready kept |
| Old draft: early listeners need addListeners | advanced |
| Old draft: lazy initialisation in startup | duplicate (owned by bean-lifecycle) |
| Old draft: startup measurement (BufferingApplicationStartup, /actuator/startup) | advanced |
| Old draft: DevTools classloaders, trigger file, LiveReload, global settings, remote DevTools | advanced |
| Old draft: scanBasePackages, default package warning | duplicate (owned by component-scanning) |
| Old draft: @LocalServerPort, server.tomcat.threads.max, virtual-threads relation, war with provided server | duplicate (testing, web, packaging units) or advanced |
| Old draft: exact Tomcat/Reactor Netty patch versions in Defaults | low value; minor versions kept in tree notes |
| Old draft: lite mode details, BeanRegistrar (Framework 7) | advanced |
| Old draft: Aware interfaces, BeanFactoryPostProcessor, InitializingBean/DisposableBean, full init/destroy order, SmartInitializingSingleton | advanced |
| Old draft: comparison beanpostprocessor-vs-beanfactorypostprocessor | advanced (not in this unit's list; the lead decides whether it survives) |
| Old draft: @Lookup method injection, scoped proxy details, @Resource, the -parameters compiler flag, @Bean(defaultCandidate = false) for a second DataSource | rare / advanced |
| Old draft: early bean reference (three-level cache), event-based decoupling fix, BeanCurrentlyInCreationException glossary term | advanced; the exception is still named in circular-dependencies |
| Old draft: Boot's context class name (AnnotationConfigServletWebServerApplicationContext), getBean() demo | rare |
| Old draft: glossary terms bean-definition, autowiring (now an aka of @Autowired), constructor/setter/field injection, exception-translation, lite-bean-mode, bean-registrar, scoped-proxy, object-provider, lookup-method-injection, lifecycle-callback, aware-interfaces, bean-post-processor, bean-factory-post-processor, early-bean-reference | dropped or kept only as tree nodes, to keep the glossary to interviewer words |
| Comparison row "BeanFactory creates singletons lazily on first request" | unverifiable on a primary page today (only blogs); the row was removed |
| Old draft: "Changed in 4.0: spring-boot-starter-aop renamed spring-boot-starter-aspectj" | rare in interviews (still true per the 4.0 migration guide; can be restored) |
| Old draft: @Proxyable (Spring Framework 7) tree node | advanced |
| Old draft: Analogy "the receptionist" in aop-proxies | padding; the Mermaid path carries the idea |
| Old draft: AsyncConfigurer, @Async("beanName") executor choice | advanced |
| Old draft: properties example for spring.task.* pools | duplicate of the Defaults table and the queue-capacity bullet |
| Old draft: initialDelay tree node, timeUnit details | rare |
| Old draft: virtual-threads relation and fixedDelay-on-virtual-threads row | advanced; virtual threads kept only as one Defaults row |
| Old draft: scheduledtasks actuator endpoint relation | rare |
| Old draft: AopContext.currentProxy() fix | the docs call it highly discouraged |
| Old draft: SPRING_APPLICATION_JSON, JNDI, @PropertySource and default-properties rows of the precedence table | advanced (one bullet says the full list has 15 sources) |
| Old draft: spring.config.import and configuration trees nodes | advanced (config trees named once in the secrets answer) |
| Old draft: /actuator/env, /actuator/configprops, /actuator/loggers relations | duplicate (owned by actuator) |
| Old draft: JavaBean binding, third-party @Bean binding, configuration metadata node, DataSize units | advanced |
| Old draft: multi-document files and spring.config.activate.on-profile | advanced (only the #--- / --- split stays in properties-vs-yaml) |
| Old draft: @ActiveProfiles and Config Server relations on profiles | duplicate (testing and spring-cloud units own them) |
| Old draft: log groups, Log4j2 and JUL nodes, springProperty, Commons Logging, conditions report relation, observability relation | rare / owned elsewhere |
| Old draft: "logging starts before the context, so @PropertySource cannot set it" | advanced (cut for the word budget) |
| Old draft comparisons slf4j-vs-logback and profiles-active-include-group | not assigned to this unit; facts folded into points and trap |
| Old draft: RequestMappingHandlerMapping, SimpleUrlHandlerMapping, MultipartResolver nodes | advanced |
| Old draft: DispatcherHandler note (reactive stack) | rare |
| Old draft: content negotiation, 406, consumes/produces, 415 | advanced |
| Old draft: -parameters compiler flag for @PathVariable names | rare |
| Old draft: API versioning subtypes (fixed/baseline/header/query/path/media type) and spring.mvc.apiversion.* properties | advanced; one bullet kept |
| Old draft: validation groups, BindingResult, valid-vs-validated comparison | advanced / not in the unit's comparison list; @Valid vs @Validated kept as an Interview Q |
| Old draft: HandlerExceptionResolver chain (three resolvers in order), ResponseEntityExceptionHandler, exception depth matching | advanced |
| Old draft: /error JSON field list; server.error.* → spring.web.error.* rename | rare |
| Old draft: ResponseStatusException bullet in exception-handling | duplicate (kept only as a tree type with a source) |
| Old draft: filter ordering with @Order / FilterRegistrationBean Interview Q | rare (FilterRegistrationBean kept as a tree type) |
| Old draft: @ImportHttpServices, HTTP service groups, spring.http.serviceclient.* | advanced |
| Old draft: client HTTP library detection order; RestClient.create(restTemplate) | advanced |
| Old draft: openfeign concept (timeouts 10 s / 60 s, retries, fallbacks, LoadBalancer) | merged into a tree type; Feign details belong to spring-cloud if needed |
| Old draft: virtual-threads concept (carrier thread, pinning, JEP 491, spring.main.keep-alive, @Async/@Scheduled executors) | merged into mvc-vs-webflux as a type; internals rare. Executor details belong to async-scheduling if kept |
| Old draft: Reactor Netty / Tomcat version numbers; Schedulers.boundedElastic() | rare |
| Old draft: Mono/Flux "nothing runs until subscribe" | dropped to keep sources within budget |
| Ref 50: @Positive, @Negative, @Past, @Future | rare for a revision page; the asked NotNull/NotEmpty/NotBlank trio is kept |
| Ref 108: "domain model" as a third shape | rare |
| Old draft: findById vs getReferenceById Interview Q | rare (getReferenceById kept only in the comparison row) |
| Old draft: projections (interface, DTO record, dynamic) tree nodes | advanced for this depth; DTO mapping lives in concept dto |
| Old draft: @Modifying queries and clearAutomatically | rare |
| Old draft: SimpleJpaRepository readOnly transactions default; query lookup strategy CREATE_IF_NOT_FOUND | advanced |
| Old draft: Hibernate cannot batch IDENTITY inserts | advanced; not re-verified |
| Old draft: Hibernate AUTO picks SEQUENCE else TABLE | advanced; note now says "provider picks" |
| Old draft: List<T> paged result node, @BatchSize annotation node | duplicate / rare |
| Old draft: derived-query keyword grammar (First10, Distinct, OrderBy) Interview Q | rare |
| Old draft: CascadeType.REMOVE only portable on one-to-one/one-to-many | advanced |
| Old draft: Defaults rows for timeout and proxy type (spring.aop.proxy-target-class) | advanced; proxy type belongs to aop-proxies |
| Old draft: test-managed transactions relation | duplicate (spring-boot-testing owns it) |
| Old draft: transaction-bound events, programmatic rollback (setRollbackOnly) | rare |
| Old draft: optimistic/pessimistic locking inside transaction-propagation | duplicate (data-jpa unit owns concept locking) |
| Old draft: NESTED support table row (JpaTransactionManager off) | advanced; kept only "JDBC only" |
| Spring Framework 6.2 @EnableTransactionManagement(rollbackOn = ALL_EXCEPTIONS) | rare in interviews |
| Old draft: full provider detection list (Generic, Infinispan, Couchbase, Cache2k) | advanced; kept a short "in order" bullet |
| Old draft: sync = true as a bullet | moved to the comparison row (one place) |
| Old draft: HikariCP idleTimeout, keepaliveTime defaults; Tn x (Cm - 1) + 1 formula; pool metrics | advanced |
| Old draft: Flyway repeatable R__ scripts, validateOnMigrate, flyway-database-postgresql module, starter pom snippet | advanced |
| Old glossary: cache-manager, jcache, liquibase-changeset, embedded-database, optimistic/pessimistic-locking terms | rare, or owned by another unit |
| Old draft: full built-in filter list (HeaderWriterFilter, LogoutFilter, AnonymousAuthenticationFilter, SecurityContextHolderFilter) | advanced; kept 4 key filters |
| Old draft: multiple chains with securityMatcher + @Order detail, filter double registration of @Component filters, TRACE logging tip | advanced |
| Old draft: spring.security.filter.order = -100, @EnableWebSecurity added for you | rare |
| Old draft: ProviderManager erases credentials, MODE_THREADLOCAL strategy row, session fixation (changeSessionId) | advanced |
| Old draft: @AuthenticationPrincipal, principal Interview Q | duplicate (glossary principal covers it) / rare |
| Old draft: InMemoryUserDetailsManager, JdbcUserDetailsManager, form login / HTTP Basic nodes, JwtAuthenticationProvider node | advanced; named in text only |
| Old draft: @PostAuthorize returnObject example, @PreFilter/@PostFilter, JSR-250 | rare |
| Old draft: SCryptPasswordEncoder node, CompromisedPasswordChecker | rare |
| Old draft: opaque tokens, lazy JWK discovery, jws-algorithms property | advanced |
| Old draft: comparison resource-server-vs-oauth2-login; glossary oauth2-login, authorization-server term, JSESSIONID, HTTP Basic, session fixation, CSRF token, same-origin policy terms | not in unit scope; kept as tree nodes where useful (authorization-server, csrf-token, same-origin-policy) |
| Old draft: CookieCsrfTokenRepository / XSRF-TOKEN details, SameSite cookies, @CrossOrigin defaults (30 min max age) | advanced |
| Old draft: layered jars, layers.idx, layer order, Dockerfile extraction | advanced; keep the site short |
| Old draft: AOT cache / CDS training runs (Java 25) | advanced |
| Old draft: JarLauncher / Start-Class manifest details, WarLauncher, lib-provided | advanced |
| Old draft: web environments DEFINED_PORT and NONE, @WebFluxTest, @DataMongoTest, RestTestClient, @TestConfiguration nodes | rare at interview depth |
| Old draft: context cache size 32 and LRU | advanced |
| Old draft: @ImportTestcontainers, development-time services, Docker Compose support, @RestartScope | advanced |
| Old draft: Testcontainers 2 module rename point | rare (migration detail) |
| Old draft: @Observed / @Timed annotations and AspectJ requirement, Observation code example | advanced |
| Old draft: heapdump access default, env masking, management.server.port | advanced; securing endpoints kept in short form |
| Old draft: comparisons springboottest-vs-slices, testcontainers-vs-embedded-db, jar-vs-war, jar-vs-native-image, metrics-vs-traces | duplicate (merged into this unit's four comparisons and concept tables) |
| Old draft: liveness/readiness during graceful shutdown row | not re-confirmed today on the opened page; dropped for brevity |
| Old draft: concept `openfeign` (Spring Cloud OpenFeign) | duplicate: OpenFeign is now a tree type under `http-clients` (web unit) |
| Old draft: Spring Cloud Bus via Git webhook (`/monitor`, spring-cloud-config-monitor) | rare |
| Old draft: `{cipher}` encrypted values in Config Server | advanced; rarely asked |
| Old draft: legacy `bootstrap.yml` node | rare now (off by default since 2020.0) |
| Old draft: Eureka peer replication, zone preference, random load balancer, LoadBalancer cache TTL (35 s) | advanced |
| Old draft: Gateway URI default ports (80/443), Gateway 2025.0 starter/property renames | rare / migration detail |
| Old draft: Spring Cloud Zookeeper, Spring Cloud Contract, Spring Cloud Commons, calendar-version naming node | rare; kept Stream, Kubernetes and Consul as types |
| Old draft: @TimeLimiter (1 s default), aspect-order properties, Spring Cloud Circuit Breaker factory API, @ConcurrencyLimit, RetryTemplate | advanced; aspect order kept as one point |
| Old draft: Spring Kafka JSON serde (Jackson 3 classes), @RetryableTopic, listener concurrency node, exactly-once Interview Q, versions row (spring-kafka 4.1.1, kafka-clients 4.2.1) | advanced; exactly-once kept as a tree type and in the trap |
| Old draft: "fatal exceptions are never retried" defaults row | advanced |
