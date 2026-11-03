import type { SyntaxSheet } from "./types";

export const microservices: SyntaxSheet = {
  tagline:
    "The Spring Cloud calls, resilience annotations, gateway and messaging config you write for microservices.",
  baseline: "Spring Boot 4.1 · Spring Cloud",
  lang: "java",
  groups: [
    {
      title: "Service-to-service calls (RestClient)",
      rows: [
        {
          syntax: "RestClient.create(baseUrl)",
          what: "Build a synchronous HTTP client",
          example: 'RestClient http = RestClient.create("http://orders");',
        },
        {
          syntax: "RestClient.builder()...build()",
          what: "Client with base URL + defaults",
          example: 'RestClient.builder().baseUrl("http://orders").build();',
        },
        {
          syntax: ".get().uri(path).retrieve().body(T.class)",
          what: "GET and map the body",
          example: 'http.get().uri("/orders/{id}", id).retrieve().body(Order.class);',
        },
        {
          syntax: ".post().uri(p).body(obj).retrieve()",
          what: "POST a JSON body",
          example: 'http.post().uri("/orders").body(req).retrieve().toBodilessEntity();',
        },
        {
          syntax: ".retrieve().toEntity(T.class)",
          what: "Get body + status + headers",
          example: 'var e = http.get().uri("/x").retrieve().toEntity(X.class);',
        },
        {
          syntax: ".header(k, v) / .onStatus(...)",
          what: "Add header / handle error status",
          example: ".onStatus(s -> s.is5xxServerError(), (rq, rs) -> {...})",
        },
      ],
    },
    {
      title: "Reactive calls (WebClient)",
      rows: [
        {
          syntax: "WebClient.create(baseUrl)",
          what: "Non-blocking HTTP client",
          example: 'WebClient wc = WebClient.create("http://orders");',
        },
        {
          syntax: ".get().uri(p).retrieve().bodyToMono(T.class)",
          what: "GET one (reactive)",
          example: 'wc.get().uri("/o/{id}", id).retrieve().bodyToMono(Order.class);',
        },
        {
          syntax: ".bodyToFlux(T.class)",
          what: "GET a stream of items",
          example: 'wc.get().uri("/o").retrieve().bodyToFlux(Order.class);',
        },
        {
          syntax: ".post().bodyValue(obj).retrieve()",
          what: "POST a body (reactive)",
          example: '.post().uri("/o").bodyValue(req).retrieve().toBodilessEntity();',
        },
        {
          syntax: ".block()",
          what: "Wait for the result (blocking)",
          example: "Order o = mono.block();",
        },
      ],
    },
    {
      title: "Feign declarative client",
      rows: [
        {
          syntax: "@EnableFeignClients",
          what: "Turn on Feign scanning (on config)",
          example: "@EnableFeignClients",
        },
        {
          syntax: '@FeignClient(name="orders")',
          what: "Declare a remote client interface",
          example: '@FeignClient(name = "orders")\ninterface OrderClient {}',
        },
        {
          syntax: '@GetMapping("/orders/{id}")',
          what: "Map a method to a remote GET",
          example: '@GetMapping("/orders/{id}") Order get(@PathVariable Long id);',
        },
        {
          syntax: "fallback = Impl.class",
          what: "Fallback bean when the call fails",
          example: '@FeignClient(name="orders", fallback=OrderFallback.class)',
        },
      ],
    },
    {
      title: "Resilience4j",
      rows: [
        {
          syntax: '@CircuitBreaker(name="x", fallbackMethod="fb")',
          what: "Open on failures, call fallback",
          example: '@CircuitBreaker(name="orders", fallbackMethod="fallback")',
        },
        {
          syntax: '@Retry(name="x")',
          what: "Retry on failure",
          example: '@Retry(name="orders")',
        },
        {
          syntax: '@RateLimiter(name="x")',
          what: "Cap calls per period",
          example: '@RateLimiter(name="orders")',
        },
        {
          syntax: '@Bulkhead(name="x")',
          what: "Limit concurrent calls",
          example: '@Bulkhead(name="orders")',
        },
        {
          syntax: '@TimeLimiter(name="x")',
          what: "Timeout (reactive/async)",
          example: '@TimeLimiter(name="orders")',
        },
        {
          syntax: "fallback method (same signature + Throwable)",
          what: "Must match return type + extra Throwable arg",
          example: "Order fallback(Long id, Throwable t) { return cached(id); }",
        },
      ],
      combos: [
        {
          label: "RestClient call with circuit breaker + fallback",
          code: `@Service
class OrderGateway {
    private final RestClient http = RestClient.create("http://orders");

    @CircuitBreaker(name = "orders", fallbackMethod = "fallback")
    @Retry(name = "orders")
    public Order getOrder(Long id) {
        return http.get().uri("/orders/{id}", id)
                   .retrieve().body(Order.class);
    }

    private Order fallback(Long id, Throwable t) {
        return Order.unavailable(id);   // last Throwable param = catch-all
    }
}`,
        },
      ],
    },
    {
      title: "Service discovery (Eureka)",
      rows: [
        {
          syntax: "@EnableDiscoveryClient",
          what: "Register + discover services",
          example: "@EnableDiscoveryClient\n@SpringBootApplication class App {}",
        },
        {
          syntax: "spring.application.name",
          what: "The id this service registers as",
          example: "spring.application.name=order-service",
        },
        {
          syntax: "eureka.client.service-url.defaultZone",
          what: "Where the registry is",
          example: "eureka.client.service-url.defaultZone=http://localhost:8761/eureka",
        },
        {
          syntax: "@LoadBalanced on RestClient.Builder",
          what: "Resolve service name + balance",
          example: "@LoadBalanced @Bean RestClient.Builder builder() {...}",
        },
        {
          syntax: "http://SERVICE-NAME/path",
          what: "Call by service id (load-balanced)",
          example: 'builder.build().get().uri("http://orders/orders/1")',
        },
      ],
    },
    {
      title: "API gateway (Spring Cloud Gateway)",
      rows: [
        {
          syntax: "spring.cloud.gateway.routes[n].id",
          what: "Name of a route",
          example: "id: orders",
        },
        {
          syntax: "...uri: lb://SERVICE",
          what: "Target (lb:// = load-balanced)",
          example: "uri: lb://order-service",
        },
        {
          syntax: "...predicates: - Path=/...",
          what: "Match requests to route",
          example: "predicates:\n  - Path=/orders/**",
        },
        {
          syntax: "...filters: - StripPrefix=1",
          what: "Transform before forwarding",
          example: "filters:\n  - StripPrefix=1",
        },
      ],
      combos: [
        {
          label: "Gateway route (application.yml)",
          code: `spring:
  cloud:
    gateway:
      routes:
        - id: orders
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**
          filters:
            - StripPrefix=1
            - name: CircuitBreaker
              args:
                name: ordersCb
                fallbackUri: forward:/fallback/orders`,
        },
      ],
    },
    {
      title: "Config server",
      rows: [
        {
          syntax: "@EnableConfigServer",
          what: "Run a central config server",
          example: "@EnableConfigServer\n@SpringBootApplication class App {}",
        },
        {
          syntax: "spring.config.import=configserver:",
          what: "Client pulls config at startup",
          example: "spring.config.import=configserver:http://localhost:8888",
        },
        {
          syntax: "@RefreshScope",
          what: "Re-create the bean on refresh",
          example: "@RefreshScope\n@Service class RatesService {}",
        },
        {
          syntax: "POST /actuator/refresh",
          what: "Reload config without restart",
          example: "curl -X POST localhost:8080/actuator/refresh",
        },
        {
          syntax: '@Value("${key}")',
          what: "Inject a config property",
          example: '@Value("${payment.limit}") int limit;',
        },
      ],
    },
    {
      title: "Messaging (Kafka)",
      rows: [
        {
          syntax: "KafkaTemplate.send(topic, msg)",
          what: "Publish an event",
          example: 'template.send("orders", order);',
        },
        {
          syntax: "template.send(topic, key, msg)",
          what: "Publish with a partition key",
          example: 'template.send("orders", order.id(), order);',
        },
        {
          syntax: '@KafkaListener(topics="x", groupId="g")',
          what: "Consume from a topic",
          example: '@KafkaListener(topics="orders", groupId="billing")',
        },
        {
          syntax: "spring.kafka.bootstrap-servers",
          what: "Where the brokers are",
          example: "spring.kafka.bootstrap-servers=localhost:9092",
        },
        {
          syntax: "spring.kafka.consumer.group-id",
          what: "Default consumer group",
          example: "spring.kafka.consumer.group-id=billing",
        },
      ],
      combos: [
        {
          label: "Publish and consume an event",
          code: `@Service
class OrderEvents {
    private final KafkaTemplate<String, Order> template;
    OrderEvents(KafkaTemplate<String, Order> t) { this.template = t; }

    void publish(Order o) {
        template.send("orders", o.id().toString(), o);
    }

    @KafkaListener(topics = "orders", groupId = "billing")
    void onOrder(Order o) {
        // handle the event (idempotently)
    }
}`,
        },
      ],
    },
    {
      title: "Observability",
      rows: [
        {
          syntax: '@Timed("name")',
          what: "Record method timing (Micrometer)",
          example: '@Timed("order.get") Order get(Long id) {...}',
        },
        {
          syntax: "MeterRegistry.counter(name).increment()",
          what: "Custom counter metric",
          example: 'registry.counter("orders.created").increment();',
        },
        {
          syntax: "management.endpoints.web.exposure.include",
          what: "Expose actuator endpoints",
          example: "management.endpoints.web.exposure.include=health,metrics,prometheus",
        },
        {
          syntax: "management.tracing.sampling.probability",
          what: "Fraction of traces sampled",
          example: "management.tracing.sampling.probability=1.0",
        },
        {
          syntax: "ObservationRegistry / Observation",
          what: "Manual span around work",
          example: 'Observation.createNotStarted("task", registry).observe(() -> run());',
        },
      ],
    },
    {
      title: "Common config (application.yml)",
      rows: [
        {
          syntax: "server.port",
          what: "Port this service listens on",
          example: "server.port=8080",
        },
        {
          syntax: "spring.application.name",
          what: "Service id (discovery, tracing)",
          example: "spring.application.name=order-service",
        },
        {
          syntax: "resilience4j.circuitbreaker.instances.x",
          what: "Circuit breaker tuning",
          example: "resilience4j.circuitbreaker.instances.orders.failure-rate-threshold=50",
        },
        {
          syntax: "resilience4j.retry.instances.x.max-attempts",
          what: "Retry attempts",
          example: "resilience4j.retry.instances.orders.max-attempts=3",
        },
        {
          syntax: "management.endpoint.health.show-details",
          what: "Detailed health output",
          example: "management.endpoint.health.show-details=always",
        },
      ],
    },
  ],
};
