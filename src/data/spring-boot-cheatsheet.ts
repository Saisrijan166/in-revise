// AUTO-GENERATED from reference/spring-boot.md — do not edit by hand.
// Regenerate with node scripts/build-cheatsheet.mjs.
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const springBootCheatsheet: CheatDoc = {
 "title": "Spring Boot",
 "tagline": "The complete interview cheat sheet, rebuilt from the reference — read top to bottom.",
 "chapters": [
  {
   "id": "overview",
   "title": "Overview & Why Spring Boot"
  },
  {
   "id": "ioc-di",
   "title": "IoC, Dependency Injection & Container"
  },
  {
   "id": "beans",
   "title": "Beans, Stereotypes & Configuration"
  },
  {
   "id": "wiring",
   "title": "Injection Types & Wiring"
  },
  {
   "id": "scopes",
   "title": "Bean Scopes & Lifecycle"
  },
  {
   "id": "autoconfig",
   "title": "Auto-Configuration & Starters"
  },
  {
   "id": "config",
   "title": "Configuration & Profiles"
  },
  {
   "id": "rest",
   "title": "REST APIs & Annotations"
  },
  {
   "id": "validation",
   "title": "DTOs, Validation & Exceptions"
  },
  {
   "id": "jpa",
   "title": "Spring Data JPA & Hibernate"
  },
  {
   "id": "tx",
   "title": "Transactions & ACID"
  },
  {
   "id": "aop",
   "title": "Spring AOP"
  },
  {
   "id": "security",
   "title": "Spring Security"
  },
  {
   "id": "testing",
   "title": "Testing"
  },
  {
   "id": "actuator",
   "title": "Actuator & Logging"
  },
  {
   "id": "startup",
   "title": "Startup & Runners"
  },
  {
   "id": "rest-design",
   "title": "REST Design & HTTP Status"
  },
  {
   "id": "mvc",
   "title": "Filters, Interceptors & MVC Flow"
  },
  {
   "id": "repos",
   "title": "Repositories & Queries"
  },
  {
   "id": "entities",
   "title": "JSON, Entities & Relationships"
  },
  {
   "id": "tx2",
   "title": "Transactions in the Service Layer"
  },
  {
   "id": "caching",
   "title": "Caching, Async & Events"
  },
  {
   "id": "clients",
   "title": "HTTP Clients & WebFlux"
  },
  {
   "id": "config-internals",
   "title": "Configuration Internals & Starters"
  },
  {
   "id": "deploy",
   "title": "Build & Deployment"
  },
  {
   "id": "persistence",
   "title": "Locking, JDBC & Persistence Context"
  },
  {
   "id": "interview",
   "title": "Interview Questions & Mental Models"
  },
  {
   "id": "comparisons",
   "title": "Why Do We Need \"X\" if \"Y\" Exists?"
  }
 ],
 "sections": [
  {
   "id": "s0",
   "num": 0,
   "title": "THE ONE-MINUTE SPRING BOOT MEMORY MAP",
   "stars": 0,
   "chapter": "overview",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Memorize this first:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Spring\n └── IoC / DI\n      └── Spring Container\n           ├── Creates Beans\n           ├── Injects Dependencies\n           ├── Manages Lifecycle\n           └── Applies AOP / Proxies\n\nSpring Boot\n ├── Auto Configuration\n ├── Starter Dependencies\n ├── Embedded Server\n ├── application.properties/yml\n ├── Actuator\n └── Production-ready defaults\n\nTypical REST App\n\nClient\n  ↓\nController\n  ↓\nService\n  ↓\nRepository\n  ↓\nDatabase",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "And the "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "5 things to remember"
        }
       ]
      },
      {
       "type": "text",
       "value": ":"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Bean       → I create/register this object\n@Component  → Spring should discover/manage this class\n@Autowired  → Inject dependency\n@Configuration → Configuration/bean definitions\n@SpringBootApplication → Start Boot + scan + auto-config",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s1",
   "num": 1,
   "title": "SPRING vs SPRING BOOT",
   "stars": 0,
   "chapter": "overview",
   "nodes": [
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Spring"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring is a framework that provides:"
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "IoC"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Dependency Injection"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "AOP"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Transaction management"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Web support"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Data access"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Security integration"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "etc."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Spring Boot"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot is built on top of Spring and makes Spring applications easier to create/configure/run."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Spring = framework capabilities"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Spring Boot = easier Spring configuration + sensible defaults + auto-configuration"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s2",
   "num": 2,
   "title": "WHY SPRING BOOT?",
   "stars": 0,
   "chapter": "overview",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Before Spring Boot, developers commonly had to configure many things manually."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot provides:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Starter dependencies\n       ↓\nAuto Configuration\n       ↓\nEmbedded Server\n       ↓\nMinimal configuration\n       ↓\nProduction-ready application",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Major advantages"
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Auto-configuration"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Embedded Tomcat/Jetty/Undertow"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Starter dependencies"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Externalized configuration"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Actuator"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Easy testing"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Convention over configuration"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s3",
   "num": 3,
   "title": "IoC — INVERSION OF CONTROL",
   "stars": 0,
   "chapter": "ioc-di",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "This is one of the "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "most important Spring concepts"
        }
       ]
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Normally:"
      }
     ]
    },
    {
     "type": "code",
     "value": "PaymentService service = new PaymentService();",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Your code controls object creation."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "With Spring:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Service\nclass PaymentService {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring creates/manages the object."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Meaning"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "IoC = Control of object creation/lifecycle is transferred from your code to the Spring Container."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s4",
   "num": 4,
   "title": "DEPENDENCY INJECTION",
   "stars": 0,
   "chapter": "ioc-di",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "DI is "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "how Spring implements IoC"
        }
       ]
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Suppose:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Service\nclass PaymentService {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "and:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@RestController\nclass PaymentController {\n\n    private final PaymentService paymentService;\n\n    PaymentController(PaymentService paymentService) {\n        this.paymentService = paymentService;\n    }\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Spring Container\n      ↓\ncreates PaymentService\n      ↓\ncreates PaymentController\n      ↓\ninjects PaymentService",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory rule"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "IoC = WHAT happened"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "DI = HOW dependency is supplied"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s5",
   "num": 5,
   "title": "SPRING CONTAINER",
   "stars": 0,
   "chapter": "ioc-di",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The Spring Container manages Spring objects."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The objects managed by Spring are called:"
      }
     ]
    }
   ]
  },
  {
   "id": "sx0",
   "num": null,
   "title": "Beans",
   "stars": 0,
   "chapter": "ioc-di",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The container:"
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "creates beans"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "configures beans"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "injects dependencies"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "manages lifecycle"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "destroys beans when appropriate"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common container:"
      }
     ]
    },
    {
     "type": "code",
     "value": "ApplicationContext",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s6",
   "num": 6,
   "title": "BEAN",
   "stars": 0,
   "chapter": "beans",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Bean"
        }
       ]
      },
      {
       "type": "text",
       "value": " is simply an object managed by Spring."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Service\npublic class PaymentService {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "PaymentService"
      },
      {
       "type": "text",
       "value": " becomes a Spring bean."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "You can also explicitly create one:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Configuration\npublic class AppConfig {\n\n    @Bean\n    public PaymentService paymentService() {\n        return new PaymentService();\n    }\n}",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Important distinction"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Component → tells Spring to discover the class\n\n@Bean → tells Spring \"use the object returned by this method as a bean\"",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s7",
   "num": 7,
   "title": "COMPONENT SCANNING",
   "stars": 0,
   "chapter": "beans",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring searches packages for classes such as:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Component\n@Service\n@Repository\n@Controller\n@RestController",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "and registers them as beans."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Usually scanning starts from the package containing:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@SpringBootApplication",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Important interview point"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "If:"
      }
     ]
    },
    {
     "type": "code",
     "value": "com.example\n ├── Application.java\n └── service\n      └── PaymentService.java",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "works naturally."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "But if:"
      }
     ]
    },
    {
     "type": "code",
     "value": "com.example.app\n └── Application.java\n\ncom.other.service\n └── PaymentService.java",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "the second package may not be scanned automatically."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Fix"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Use:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@ComponentScan(\"com.other\")",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "or restructure packages."
      }
     ]
    }
   ]
  },
  {
   "id": "s8",
   "num": 8,
   "title": "@SPRINGBOOTAPPLICATION",
   "stars": 0,
   "chapter": "beans",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "This is the most important Boot annotation."
      }
     ]
    },
    {
     "type": "code",
     "value": "@SpringBootApplication\npublic class Application {\n\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Conceptually:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@SpringBootApplication\n        =\n@Configuration\n+\n@EnableAutoConfiguration\n+\n@ComponentScan",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory trick"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Boot = Configure + Auto Configure + Scan"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s9",
   "num": 9,
   "title": "@CONFIGURATION",
   "stars": 0,
   "chapter": "beans",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Marks a class as configuration."
      }
     ]
    },
    {
     "type": "code",
     "value": "@Configuration\npublic class AppConfig {\n\n    @Bean\n    public PaymentService paymentService() {\n        return new PaymentService();\n    }\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Think:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Configuration = instructions for creating/configuring beans"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s10",
   "num": 10,
   "title": "@BEAN",
   "stars": 0,
   "chapter": "beans",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Bean\npublic ObjectMapper objectMapper() {\n    return new ObjectMapper();\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The returned object becomes a Spring bean."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "When use @Bean?"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Especially when:"
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "class is from a third-party library"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "you cannot modify the class"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "you want custom construction/configuration"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Bean\npublic SomeLibraryClient client() {\n    return new SomeLibraryClient(\"key\");\n}",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s11",
   "num": 11,
   "title": "@COMPONENT",
   "stars": 0,
   "chapter": "beans",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Generic Spring-managed component."
      }
     ]
    },
    {
     "type": "code",
     "value": "@Component\npublic class EmailValidator {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring discovers it through component scanning."
      }
     ]
    }
   ]
  },
  {
   "id": "s12",
   "num": 12,
   "title": "@SERVICE",
   "stars": 0,
   "chapter": "beans",
   "nodes": [
    {
     "type": "code",
     "value": "@Service\npublic class PaymentService {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Technically a specialization of "
      },
      {
       "type": "inlineCode",
       "value": "@Component"
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Purpose:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Indicates business/service-layer logic."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s13",
   "num": 13,
   "title": "@REPOSITORY",
   "stars": 0,
   "chapter": "beans",
   "nodes": [
    {
     "type": "code",
     "value": "@Repository\npublic class PaymentRepository {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Used for persistence/data-access components."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "It also participates in Spring's exception translation mechanism for supported persistence technologies."
      }
     ]
    }
   ]
  },
  {
   "id": "s14",
   "num": 14,
   "title": "@CONTROLLER",
   "stars": 0,
   "chapter": "beans",
   "nodes": [
    {
     "type": "code",
     "value": "@Controller\npublic class PaymentController {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Used for MVC controllers, commonly returning views."
      }
     ]
    }
   ]
  },
  {
   "id": "s15",
   "num": 15,
   "title": "@RESTCONTROLLER",
   "stars": 0,
   "chapter": "beans",
   "nodes": [
    {
     "type": "code",
     "value": "@RestController\npublic class PaymentController {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Conceptually:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Controller\n+\n@ResponseBody",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "So returned objects are normally serialized into the HTTP response body."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Controller      → View\n@RestController  → Data/JSON",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s16",
   "num": 16,
   "title": "DEPENDENCY INJECTION — 3 TYPES",
   "stars": 0,
   "chapter": "wiring",
   "nodes": [
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "1. Constructor Injection ⭐ Recommended"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Service\npublic class PaymentService {\n\n    private final PaymentRepository repository;\n\n    public PaymentService(PaymentRepository repository) {\n        this.repository = repository;\n    }\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Advantages:"
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "dependencies are explicit"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "supports "
          },
          {
           "type": "inlineCode",
           "value": "final"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "easier testing"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "object cannot exist without required dependency"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "generally preferred"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "2. Setter Injection"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Autowired\npublic void setRepository(PaymentRepository repository) {\n    this.repository = repository;\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Useful when dependency is optional/changeable."
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "3. Field Injection"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Autowired\nprivate PaymentRepository repository;",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Works, but generally less preferred."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Interview answer"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Constructor injection is generally preferred because dependencies are explicit, fields can be final, and unit testing is easier."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s17",
   "num": 17,
   "title": "@AUTOWIRED",
   "stars": 0,
   "chapter": "wiring",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Tells Spring to resolve and inject a dependency."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Autowired\nprivate PaymentService paymentService;",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "But constructor injection can often work without explicitly writing "
      },
      {
       "type": "inlineCode",
       "value": "@Autowired"
      },
      {
       "type": "text",
       "value": " when the class has a single constructor."
      }
     ]
    }
   ]
  },
  {
   "id": "s18",
   "num": 18,
   "title": "WHAT IF THERE ARE MULTIPLE BEANS?",
   "stars": 0,
   "chapter": "wiring",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Suppose:"
      }
     ]
    },
    {
     "type": "code",
     "value": "interface PaymentGateway {\n}",
     "lang": "java"
    },
    {
     "type": "code",
     "value": "@Service\nclass StripeGateway implements PaymentGateway {\n}",
     "lang": "java"
    },
    {
     "type": "code",
     "value": "@Service\nclass RazorpayGateway implements PaymentGateway {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Now:"
      }
     ]
    },
    {
     "type": "code",
     "value": "PaymentService(PaymentGateway gateway)",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring has two candidates."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Result:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Ambiguous dependency."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s19",
   "num": 19,
   "title": "@QUALIFIER",
   "stars": 0,
   "chapter": "wiring",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Use:"
      }
     ]
    },
    {
     "type": "code",
     "value": "PaymentService(\n    @Qualifier(\"stripeGateway\")\n    PaymentGateway gateway\n)",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Now Spring knows which bean."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "Multiple candidates\n       ↓\n@Qualifier\n       ↓\nchoose exact bean",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s20",
   "num": 20,
   "title": "@PRIMARY",
   "stars": 0,
   "chapter": "wiring",
   "nodes": [
    {
     "type": "code",
     "value": "@Primary\n@Service\nclass StripeGateway implements PaymentGateway {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Now Stripe becomes the default candidate when multiple implementations exist."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "@Primary vs @Qualifier"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Primary   → default choice\n@Qualifier → explicit choice",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "If a specific qualifier is requested, it can select that specific bean rather than relying on the primary default."
      }
     ]
    }
   ]
  },
  {
   "id": "s21",
   "num": 21,
   "title": "BEAN NAMING",
   "stars": 0,
   "chapter": "wiring",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Service\nclass PaymentService {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "default bean name is commonly:"
      }
     ]
    },
    {
     "type": "code",
     "value": "paymentService",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "based on the class name."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "You can explicitly name:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Service(\"payment\")\nclass PaymentService {\n}",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s22",
   "num": 22,
   "title": "BEAN SCOPES",
   "stars": 0,
   "chapter": "scopes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Very important."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring's common scopes:"
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Scope"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Meaning"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "singleton"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "One bean instance per Spring container"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "prototype"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "New instance when requested"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "request"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "One per HTTP request"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "session"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "One per HTTP session"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "application"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "One per ServletContext"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "websocket"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "One per WebSocket session"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Most important"
      }
     ]
    },
    {
     "type": "code",
     "value": "Default = singleton",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s23",
   "num": 23,
   "title": "SINGLETON DOES NOT MEAN JVM SINGLETON",
   "stars": 0,
   "chapter": "scopes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring singleton means:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "One instance "
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "per Spring IoC container"
          }
         ]
        },
        {
         "type": "text",
         "value": "."
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Not necessarily one instance for the entire JVM."
      }
     ]
    }
   ]
  },
  {
   "id": "s24",
   "num": 24,
   "title": "PROTOTYPE",
   "stars": 0,
   "chapter": "scopes",
   "nodes": [
    {
     "type": "code",
     "value": "@Scope(\"prototype\")\n@Component\nclass ReportGenerator {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring creates a new instance when the bean is requested from the container."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Important trap"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Prototype does "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "not"
        }
       ]
      },
      {
       "type": "text",
       "value": " mean Spring manages the entire lifecycle exactly like singleton."
      }
     ]
    }
   ]
  },
  {
   "id": "s25",
   "num": 25,
   "title": "REQUEST / SESSION",
   "stars": 0,
   "chapter": "scopes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Useful for web applications."
      }
     ]
    },
    {
     "type": "code",
     "value": "request → one instance per HTTP request\nsession → one instance per HTTP session",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s26",
   "num": 26,
   "title": "LAZY INITIALIZATION",
   "stars": 0,
   "chapter": "scopes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "By default, singleton beans are generally created during application startup."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "With:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Lazy\n@Component\nclass HeavyService {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "creation can be deferred until needed."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "Normal singleton → startup\n@Lazy             → first required use",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s27",
   "num": 27,
   "title": "BEAN LIFECYCLE",
   "stars": 0,
   "chapter": "scopes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Simplified:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Bean definition\n      ↓\nInstantiation\n      ↓\nDependency Injection\n      ↓\nInitialization callbacks\n      ↓\nBean ready\n      ↓\nUsage\n      ↓\nDestruction",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common annotations:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@PostConstruct\n@PreDestroy",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@PostConstruct\nvoid init() {\n}",
     "lang": "java"
    },
    {
     "type": "code",
     "value": "@PreDestroy\nvoid cleanup() {\n}",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s28",
   "num": 28,
   "title": "SPRING BOOT AUTO-CONFIGURATION",
   "stars": 3,
   "chapter": "autoconfig",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "This is a core interview topic."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot looks at:"
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "classpath"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "existing beans"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "configuration properties"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "application conditions"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "and automatically configures appropriate components."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "If web dependencies are present:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Spring Web\n   ↓\nBoot detects web environment\n   ↓\nconfigures web infrastructure\n   ↓\nembedded server etc.",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s29",
   "num": 29,
   "title": "@ENABLEAUTOCONFIGURATION",
   "stars": 0,
   "chapter": "autoconfig",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Enables Boot's auto-configuration mechanism."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Normally included through:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@SpringBootApplication",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s30",
   "num": 30,
   "title": "AUTO-CONFIGURATION IS CONDITIONAL",
   "stars": 0,
   "chapter": "autoconfig",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Boot doesn't blindly configure everything."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "It uses conditions such as:"
      }
     ]
    },
    {
     "type": "code",
     "value": "If class exists\nIf bean doesn't exist\nIf property matches\nIf application type matches\n...",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common annotations:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@ConditionalOnClass\n@ConditionalOnMissingBean\n@ConditionalOnProperty\n@ConditionalOnBean",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Most important concept"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Auto-configuration backs off when your explicit configuration provides what it would otherwise configure."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s31",
   "num": 31,
   "title": "STARTER DEPENDENCIES",
   "stars": 3,
   "chapter": "autoconfig",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Starters are convenient dependency bundles."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Examples:"
      }
     ]
    },
    {
     "type": "code",
     "value": "spring-boot-starter-web\nspring-boot-starter-data-jpa\nspring-boot-starter-security\nspring-boot-starter-test\nspring-boot-starter-validation",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Instead of manually adding many related dependencies."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Starter = dependency bundle"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s32",
   "num": 32,
   "title": "EMBEDDED SERVER",
   "stars": 0,
   "chapter": "autoconfig",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot web applications can run with an embedded server."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Tomcat\nJetty\nUndertow",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Typical Spring MVC Boot applications use embedded Tomcat by default when using the standard web starter."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "So:"
      }
     ]
    },
    {
     "type": "code",
     "value": "java -jar application.jar",
     "lang": "bash"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "can start the web application without separately deploying a WAR to an external server."
      }
     ]
    }
   ]
  },
  {
   "id": "s33",
   "num": 33,
   "title": "APPLICATION.PROPERTIES / YAML",
   "stars": 0,
   "chapter": "config",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Configuration:"
      }
     ]
    },
    {
     "type": "code",
     "value": "server.port=8081\nspring.datasource.url=...",
     "lang": "properties"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "or:"
      }
     ]
    },
    {
     "type": "code",
     "value": "server:\n  port: 8081",
     "lang": "yaml"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Common location"
      }
     ]
    },
    {
     "type": "code",
     "value": "src/main/resources/application.properties\nsrc/main/resources/application.yml",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s34",
   "num": 34,
   "title": "EXTERNALIZED CONFIGURATION",
   "stars": 0,
   "chapter": "config",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Don't hardcode environment-specific values."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Bad:"
      }
     ]
    },
    {
     "type": "code",
     "value": "String password = \"secret123\";",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Better:"
      }
     ]
    },
    {
     "type": "code",
     "value": "db.password=${DB_PASSWORD}",
     "lang": "properties"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Then environment:"
      }
     ]
    },
    {
     "type": "code",
     "value": "DB_PASSWORD=...",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Typical priority concept"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot combines configuration from multiple sources, with higher-precedence sources overriding lower-precedence ones."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Important sources include:"
      }
     ]
    },
    {
     "type": "code",
     "value": "application.properties/yml\nenvironment variables\nsystem properties\ncommand-line arguments",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Interview memory"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Externalize configuration → change environment without rebuilding code."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s35",
   "num": 35,
   "title": "@VALUE",
   "stars": 0,
   "chapter": "config",
   "nodes": [
    {
     "type": "code",
     "value": "@Value(\"${payment.timeout}\")\nprivate int timeout;",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Useful for injecting individual properties."
      }
     ]
    }
   ]
  },
  {
   "id": "s36",
   "num": 36,
   "title": "@CONFIGURATIONPROPERTIES",
   "stars": 1,
   "chapter": "config",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For grouped configuration, prefer:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@ConfigurationProperties(prefix = \"payment\")\npublic class PaymentProperties {\n\n    private int timeout;\n    private String currency;\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Configuration:"
      }
     ]
    },
    {
     "type": "code",
     "value": "payment:\n  timeout: 30\n  currency: INR",
     "lang": "yaml"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "@Value vs @ConfigurationProperties"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Value\n→ individual/simple property\n\n@ConfigurationProperties\n→ structured/grouped configuration",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s37",
   "num": 37,
   "title": "PROFILES",
   "stars": 3,
   "chapter": "config",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Profiles allow environment-specific configuration."
      }
     ]
    },
    {
     "type": "code",
     "value": "application.yml\napplication-dev.yml\napplication-prod.yml",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Activate:"
      }
     ]
    },
    {
     "type": "code",
     "value": "spring.profiles.active=dev",
     "lang": "properties"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Or through environment/command-line configuration."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "dev\ntest\nprod",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Same application, different configuration."
      }
     ]
    }
   ]
  },
  {
   "id": "s38",
   "num": 38,
   "title": "@PROFILE",
   "stars": 0,
   "chapter": "config",
   "nodes": [
    {
     "type": "code",
     "value": "@Profile(\"dev\")\n@Bean\npublic PaymentGateway mockGateway() {\n    return new MockGateway();\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Only created for that profile."
      }
     ]
    }
   ]
  },
  {
   "id": "s39",
   "num": 39,
   "title": "REST API STRUCTURE",
   "stars": 3,
   "chapter": "rest",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Typical Spring Boot architecture:"
      }
     ]
    },
    {
     "type": "code",
     "value": "HTTP Request\n     ↓\nController\n     ↓\nService\n     ↓\nRepository\n     ↓\nDatabase",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@RestController\n@RequestMapping(\"/payments\")\nclass PaymentController {\n\n    private final PaymentService service;\n\n    @GetMapping(\"/{id}\")\n    PaymentDto get(@PathVariable Long id) {\n        return service.getPayment(id);\n    }\n}",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s40",
   "num": 40,
   "title": "COMMON REST ANNOTATIONS",
   "stars": 0,
   "chapter": "rest",
   "nodes": [
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "@REQUESTMAPPING"
      }
     ]
    },
    {
     "type": "code",
     "value": "@RequestMapping(\"/payments\")",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Maps requests."
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "@GETMAPPING"
      }
     ]
    },
    {
     "type": "code",
     "value": "@GetMapping(\"/{id}\")",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "GET."
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "@POSTMAPPING"
      }
     ]
    },
    {
     "type": "code",
     "value": "@PostMapping",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "POST."
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "@PUTMAPPING"
      }
     ]
    },
    {
     "type": "code",
     "value": "@PutMapping(\"/{id}\")",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "PUT."
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "@PATCHMAPPING"
      }
     ]
    },
    {
     "type": "code",
     "value": "@PatchMapping(\"/{id}\")",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "PATCH."
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "@DELETEMAPPING"
      }
     ]
    },
    {
     "type": "code",
     "value": "@DeleteMapping(\"/{id}\")",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "DELETE."
      }
     ]
    }
   ]
  },
  {
   "id": "s41",
   "num": 41,
   "title": "@PATHVARIABLE",
   "stars": 0,
   "chapter": "rest",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "URL:"
      }
     ]
    },
    {
     "type": "code",
     "value": "/payments/123",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Code:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@GetMapping(\"/{id}\")\npublic Payment get(@PathVariable Long id) {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "id = 123"
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    }
   ]
  },
  {
   "id": "s42",
   "num": 42,
   "title": "@REQUESTPARAM",
   "stars": 0,
   "chapter": "rest",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "URL:"
      }
     ]
    },
    {
     "type": "code",
     "value": "/payments?status=SUCCESS",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Code:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@GetMapping\npublic List<Payment> get(\n    @RequestParam String status\n) {\n}",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "PathVariable → /payments/123\nRequestParam → /payments?status=SUCCESS",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s43",
   "num": 43,
   "title": "@REQUESTBODY",
   "stars": 0,
   "chapter": "rest",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Reads request body."
      }
     ]
    },
    {
     "type": "code",
     "value": "@PostMapping\npublic Payment create(\n    @RequestBody CreatePaymentRequest request\n) {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "JSON:"
      }
     ]
    },
    {
     "type": "code",
     "value": "{\n  \"amount\": 1000\n}",
     "lang": "json"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring/Jackson maps JSON → Java object."
      }
     ]
    }
   ]
  },
  {
   "id": "s44",
   "num": 44,
   "title": "@REQUESTHEADER",
   "stars": 0,
   "chapter": "rest",
   "nodes": [
    {
     "type": "code",
     "value": "@RequestHeader(\"Authorization\")\nString authorization",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Reads HTTP header."
      }
     ]
    }
   ]
  },
  {
   "id": "s45",
   "num": 45,
   "title": "@RESPONSESTATUS",
   "stars": 0,
   "chapter": "rest",
   "nodes": [
    {
     "type": "code",
     "value": "@ResponseStatus(HttpStatus.CREATED)",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Can specify response status."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For more flexible APIs, "
      },
      {
       "type": "inlineCode",
       "value": "ResponseEntity"
      },
      {
       "type": "text",
       "value": " is often used."
      }
     ]
    }
   ]
  },
  {
   "id": "s46",
   "num": 46,
   "title": "RESPONSEENTITY",
   "stars": 0,
   "chapter": "rest",
   "nodes": [
    {
     "type": "code",
     "value": "return ResponseEntity\n        .status(HttpStatus.CREATED)\n        .body(payment);",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Allows controlling:"
      }
     ]
    },
    {
     "type": "code",
     "value": "status\nheaders\nbody",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s47",
   "num": 47,
   "title": "JSON SERIALIZATION",
   "stars": 0,
   "chapter": "rest",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot commonly uses Jackson with Spring Web."
      }
     ]
    },
    {
     "type": "code",
     "value": "Java Object\n   ↓\nJackson\n   ↓\nJSON",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Response:"
      }
     ]
    },
    {
     "type": "code",
     "value": "{\n  \"id\": 10,\n  \"amount\": 1000\n}",
     "lang": "json"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "And reverse:"
      }
     ]
    },
    {
     "type": "code",
     "value": "JSON\n ↓\nJackson\n ↓\nJava Object",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s48",
   "num": 48,
   "title": "DTO",
   "stars": 3,
   "chapter": "validation",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Don't blindly expose entities through APIs."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Instead:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Entity\n   ↓\nService\n   ↓\nDTO\n   ↓\nController\n   ↓\nJSON",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "record PaymentResponse(\n    Long id,\n    BigDecimal amount,\n    String status\n) {}",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Why DTO?"
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "API contract isolation"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "prevent exposing internal fields"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "validation"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "security"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "versioning"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "avoid persistence-layer coupling"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s49",
   "num": 49,
   "title": "VALIDATION",
   "stars": 3,
   "chapter": "validation",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Dependency:"
      }
     ]
    },
    {
     "type": "code",
     "value": "spring-boot-starter-validation",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "public class CreateUserRequest {\n\n    @NotBlank\n    private String name;\n\n    @Email\n    private String email;\n\n    @Min(18)\n    private int age;\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Controller:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@PostMapping\npublic User create(\n    @Valid @RequestBody CreateUserRequest request\n) {\n}",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Important"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Valid\n→ trigger validation",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s50",
   "num": 50,
   "title": "COMMON VALIDATION ANNOTATIONS",
   "stars": 0,
   "chapter": "validation",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Remember:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@NotNull\n@NotBlank\n@NotEmpty\n\n@Size\n@Min\n@Max\n@Positive\n@Negative\n\n@Email\n@Pattern\n\n@Past\n@Future",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Common confusion"
      }
     ]
    },
    {
     "type": "code",
     "value": "@NotNull → not null\n@NotEmpty → not null + not empty\n@NotBlank → not null + not empty + not whitespace",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s51",
   "num": 51,
   "title": "GLOBAL EXCEPTION HANDLING",
   "stars": 3,
   "chapter": "validation",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Use:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@RestControllerAdvice",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@RestControllerAdvice\nclass GlobalExceptionHandler {\n\n    @ExceptionHandler(PaymentNotFoundException.class)\n    ResponseEntity<?> handle(PaymentNotFoundException ex) {\n        return ResponseEntity\n                .status(HttpStatus.NOT_FOUND)\n                .body(ex.getMessage());\n    }\n}",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "Exception\n    ↓\n@ExceptionHandler\n    ↓\n@RestControllerAdvice\n    ↓\nconsistent API error response",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s52",
   "num": 52,
   "title": "@EXCEPTIONHANDLER",
   "stars": 0,
   "chapter": "validation",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Handles specific exceptions."
      }
     ]
    },
    {
     "type": "code",
     "value": "@ExceptionHandler(UserNotFoundException.class)",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Can be:"
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "controller-local"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "used within advice for global handling"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s53",
   "num": 53,
   "title": "SPRING DATA JPA",
   "stars": 3,
   "chapter": "jpa",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Data JPA simplifies database access using JPA."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Typical:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Entity\nclass Payment {\n}",
     "lang": "java"
    },
    {
     "type": "code",
     "value": "public interface PaymentRepository\n        extends JpaRepository<Payment, Long> {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "You get methods such as:"
      }
     ]
    },
    {
     "type": "code",
     "value": "save()\nfindById()\nfindAll()\ndeleteById()\nexistsById()",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s54",
   "num": 54,
   "title": "JPA vs HIBERNATE vs SPRING DATA JPA",
   "stars": 0,
   "chapter": "jpa",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Very common interview question."
      }
     ]
    },
    {
     "type": "code",
     "value": "JPA\n ↓\nSpecification/API\n\nHibernate\n ↓\nJPA implementation\n\nSpring Data JPA\n ↓\nAbstraction/repository support built on JPA",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "JPA = rules/API"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Hibernate = implementation"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Spring Data JPA = repository convenience layer"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s55",
   "num": 55,
   "title": "@ENTITY",
   "stars": 0,
   "chapter": "jpa",
   "nodes": [
    {
     "type": "code",
     "value": "@Entity\nclass Payment {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Marks class as a persistent JPA entity."
      }
     ]
    }
   ]
  },
  {
   "id": "s56",
   "num": 56,
   "title": "@ID",
   "stars": 0,
   "chapter": "jpa",
   "nodes": [
    {
     "type": "code",
     "value": "@Id\nprivate Long id;",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Primary key."
      }
     ]
    }
   ]
  },
  {
   "id": "s57",
   "num": 57,
   "title": "@GENERATEDVALUE",
   "stars": 0,
   "chapter": "jpa",
   "nodes": [
    {
     "type": "code",
     "value": "@Id\n@GeneratedValue(strategy = GenerationType.IDENTITY)\nprivate Long id;",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Database/provider generates the identifier according to the chosen strategy."
      }
     ]
    }
   ]
  },
  {
   "id": "s58",
   "num": 58,
   "title": "COMMON JPA RELATIONSHIPS",
   "stars": 0,
   "chapter": "jpa",
   "nodes": [
    {
     "type": "code",
     "value": "@OneToOne\n@OneToMany\n@ManyToOne\n@ManyToMany",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Customer\n   |\n   | 1\n   |\n   | many\n   ↓\nOrders",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Usually:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@ManyToOne\nprivate Customer customer;",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "on the "
      },
      {
       "type": "inlineCode",
       "value": "Order"
      },
      {
       "type": "text",
       "value": " side."
      }
     ]
    }
   ]
  },
  {
   "id": "s59",
   "num": 59,
   "title": "LAZY vs EAGER",
   "stars": 3,
   "chapter": "jpa",
   "nodes": [
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "LAZY"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Load relationship when accessed."
      }
     ]
    },
    {
     "type": "code",
     "value": "Order loaded\n   ↓\nCustomer not necessarily loaded immediately",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "EAGER"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Relationship is fetched as part of loading according to the persistence provider/query behavior."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "LAZY  → later\nEAGER → immediately/with entity fetch",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Interview warning"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Don't say:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "EAGER always means one SQL query."
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "That's not guaranteed. Fetch strategy and actual SQL execution depend on mapping/query/provider behavior."
      }
     ]
    }
   ]
  },
  {
   "id": "s60",
   "num": 60,
   "title": "N+1 QUERY PROBLEM",
   "stars": 3,
   "chapter": "jpa",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "1 query → fetch 100 orders\n\nThen:\n100 queries → fetch customers",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Total:"
      }
     ]
    },
    {
     "type": "code",
     "value": "101 queries",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "This is the N+1 problem."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Possible solutions:"
      }
     ]
    },
    {
     "type": "code",
     "value": "JOIN FETCH\n@EntityGraph\nbatch fetching\ncareful query design",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s61",
   "num": 61,
   "title": "TRANSACTIONS",
   "stars": 3,
   "chapter": "tx",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Use:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Transactional",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Transactional\npublic void processPayment() {\n    savePayment();\n    updateAccount();\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Concept:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Operation A\nOperation B\nOperation C\n     ↓\nTransaction\n     ↓\nAll succeed → commit\nFailure → rollback according to transaction rules",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s62",
   "num": 62,
   "title": "ACID",
   "stars": 0,
   "chapter": "tx",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Remember:"
      }
     ]
    },
    {
     "type": "code",
     "value": "A → Atomicity\nC → Consistency\nI → Isolation\nD → Durability",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Atomicity"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "All or nothing."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Consistency"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Transaction preserves defined data integrity rules."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Isolation"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Concurrent transactions should not improperly interfere according to the selected isolation level."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Durability"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Committed data survives failures according to the database's durability guarantees."
      }
     ]
    }
   ]
  },
  {
   "id": "s63",
   "num": 63,
   "title": "@TRANSACTIONAL ROLLBACK TRAP",
   "stars": 3,
   "chapter": "tx",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A common interview point:"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "By default, Spring transaction rollback behavior is primarily based on unchecked exceptions ("
      },
      {
       "type": "inlineCode",
       "value": "RuntimeException"
      },
      {
       "type": "text",
       "value": " and "
      },
      {
       "type": "inlineCode",
       "value": "Error"
      },
      {
       "type": "text",
       "value": "), while checked exceptions do not automatically trigger rollback in the same way."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "You can customize:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Transactional(rollbackFor = Exception.class)",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "RuntimeException → rollback by default\nChecked Exception → not automatically rollback by default",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s64",
   "num": 64,
   "title": "TRANSACTION PROPAGATION",
   "stars": 0,
   "chapter": "tx",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Most important:"
      }
     ]
    },
    {
     "type": "code",
     "value": "REQUIRED\nREQUIRES_NEW\nSUPPORTS\nMANDATORY\nNOT_SUPPORTED\nNEVER\nNESTED",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "REQUIRED ⭐"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Default."
      }
     ]
    },
    {
     "type": "code",
     "value": "If transaction exists\n    → join it\n\nIf not\n    → create one",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "REQUIRES_NEW"
      }
     ]
    },
    {
     "type": "code",
     "value": "Suspend existing transaction\n        ↓\ncreate new transaction",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "REQUIRED      → join/create\nREQUIRES_NEW  → pause old + create new",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s65",
   "num": 65,
   "title": "TRANSACTION ISOLATION",
   "stars": 0,
   "chapter": "tx",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common levels:"
      }
     ]
    },
    {
     "type": "code",
     "value": "READ_UNCOMMITTED\nREAD_COMMITTED\nREPEATABLE_READ\nSERIALIZABLE",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "General progression:"
      }
     ]
    },
    {
     "type": "code",
     "value": "more concurrency\n      ↕\nmore isolation",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Higher isolation can reduce certain concurrency anomalies but may increase locking/contention and reduce throughput."
      }
     ]
    }
   ]
  },
  {
   "id": "s66",
   "num": 66,
   "title": "SPRING AOP",
   "stars": 3,
   "chapter": "aop",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "AOP = Aspect-Oriented Programming."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Useful for cross-cutting concerns:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Logging\nSecurity\nTransactions\nMetrics\nAuditing",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Instead of duplicating:"
      }
     ]
    },
    {
     "type": "code",
     "value": "log();\nmethod();\nlog();",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "you can apply an aspect."
      }
     ]
    }
   ]
  },
  {
   "id": "s67",
   "num": 67,
   "title": "CORE AOP TERMS",
   "stars": 0,
   "chapter": "aop",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Remember:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Aspect\nAdvice\nPointcut\nJoin Point\nWeaving",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Aspect"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Cross-cutting concern."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "LoggingAspect",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Advice"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "What action to perform."
      }
     ]
    },
    {
     "type": "code",
     "value": "Before\nAfter\nAfterReturning\nAfterThrowing\nAround",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Pointcut"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Which methods should be targeted."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Join point"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A point during execution where advice can apply. In Spring proxy-based AOP, method execution is the central join-point model."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Weaving"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Applying aspect behavior to target code."
      }
     ]
    }
   ]
  },
  {
   "id": "s68",
   "num": 68,
   "title": "SPRING AOP PROXY",
   "stars": 3,
   "chapter": "aop",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring commonly uses proxies."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Conceptually:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Your code\n   ↓\nProxy\n   ↓\nActual bean",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Transactional\n   ↓\nSpring proxy\n   ↓\ntransaction starts\n   ↓\nmethod executes\n   ↓\ncommit/rollback",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s69",
   "num": 69,
   "title": "SELF-INVOCATION TRAP",
   "stars": 3,
   "chapter": "aop",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Transactional\npublic void methodA() {\n    methodB();\n}\n\n@Transactional\npublic void methodB() {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Calling:"
      }
     ]
    },
    {
     "type": "code",
     "value": "methodA()",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "then:"
      }
     ]
    },
    {
     "type": "code",
     "value": "this.methodB()",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "doesn't pass through the Spring proxy again."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Therefore proxy-based annotations such as "
      },
      {
       "type": "inlineCode",
       "value": "@Transactional"
      },
      {
       "type": "text",
       "value": " on "
      },
      {
       "type": "inlineCode",
       "value": "methodB"
      },
      {
       "type": "text",
       "value": " may not be applied as expected through self-invocation."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Spring AOP works through proxy interception → internal "
          },
          {
           "type": "inlineCode",
           "value": "this.method()"
          },
          {
           "type": "text",
           "value": " calls bypass the proxy."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s70",
   "num": 70,
   "title": "SPRING SECURITY",
   "stars": 3,
   "chapter": "security",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Security handles things such as:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Authentication\nAuthorization\nPassword handling\nSecurity filters\nSession security\nOAuth2\nJWT integration\nCSRF\nCORS integration",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s71",
   "num": 71,
   "title": "AUTHENTICATION vs AUTHORIZATION",
   "stars": 0,
   "chapter": "security",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Very important."
      }
     ]
    },
    {
     "type": "code",
     "value": "Authentication\n→ WHO are you?\n\nAuthorization\n→ WHAT are you allowed to do?",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Login\n ↓\nAuthentication\n\nADMIN access\n ↓\nAuthorization",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s72",
   "num": 72,
   "title": "SPRING SECURITY FILTER CHAIN",
   "stars": 0,
   "chapter": "security",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Requests pass through security filters before reaching your controller."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Simplified:"
      }
     ]
    },
    {
     "type": "code",
     "value": "HTTP Request\n     ↓\nSecurity Filters\n     ↓\nAuthentication\n     ↓\nAuthorization\n     ↓\nController",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s73",
   "num": 73,
   "title": "PASSWORD STORAGE",
   "stars": 0,
   "chapter": "security",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Never store plain-text passwords."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Use a password hashing function such as:"
      }
     ]
    },
    {
     "type": "code",
     "value": "BCrypt\nArgon2",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Concept:"
      }
     ]
    },
    {
     "type": "code",
     "value": "password\n   ↓\nhash\n   ↓\ndatabase",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "At login:"
      }
     ]
    },
    {
     "type": "code",
     "value": "password\n   ↓\npassword encoder verifies against stored hash",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s74",
   "num": 74,
   "title": "JWT",
   "stars": 0,
   "chapter": "security",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "JWT is commonly used for stateless API authentication."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Conceptually:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Login\n ↓\nJWT issued\n ↓\nClient sends JWT\n ↓\nServer validates JWT\n ↓\nAuthentication established",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "JWT commonly has:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Header.Payload.Signature",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Important"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "JWT is "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "signed"
        }
       ]
      },
      {
       "type": "text",
       "value": ", not inherently encrypted."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Don't put secrets/passwords in the payload merely because it's encoded."
      }
     ]
    }
   ]
  },
  {
   "id": "s75",
   "num": 75,
   "title": "CORS vs CSRF",
   "stars": 3,
   "chapter": "security",
   "nodes": [
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "CORS"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Controls which "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "origins"
        }
       ]
      },
      {
       "type": "text",
       "value": " can make browser cross-origin requests to your server."
      }
     ]
    },
    {
     "type": "code",
     "value": "frontend.com\n     ↓\napi.com",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Browser checks CORS rules."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "CSRF"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Attacks authenticated requests where the browser automatically sends credentials, especially cookie-based authentication."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "CORS → Cross-Origin access\nCSRF → Cross-Site request forgery",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "They solve different problems."
      }
     ]
    }
   ]
  },
  {
   "id": "s76",
   "num": 76,
   "title": "@PREAUTHORIZE",
   "stars": 0,
   "chapter": "security",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Method-level authorization:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@PreAuthorize(\"hasRole('ADMIN')\")\npublic void deleteUser(Long id) {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Meaning:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Only users with the required authority/role can invoke it."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s77",
   "num": 77,
   "title": "TESTING",
   "stars": 3,
   "chapter": "testing",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot provides testing support."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Important annotations:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@SpringBootTest\n@WebMvcTest\n@DataJpaTest\n@MockBean / @MockitoBean",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Depending on your Spring Boot/Spring Framework version, mock-bean testing annotations may differ; know the version used by the project."
      }
     ]
    }
   ]
  },
  {
   "id": "s78",
   "num": 78,
   "title": "@SPRINGBOOTTEST",
   "stars": 0,
   "chapter": "testing",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Loads a broad/full application context for integration-style tests."
      }
     ]
    },
    {
     "type": "code",
     "value": "@SpringBootTest\nclass PaymentServiceTest {\n}",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "@SpringBootTest\n→ big context\n→ integration testing",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s79",
   "num": 79,
   "title": "@WEBMVCTEST",
   "stars": 0,
   "chapter": "testing",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Focuses on Spring MVC layer."
      }
     ]
    },
    {
     "type": "code",
     "value": "@WebMvcTest(PaymentController.class)",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Useful for testing:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Controller\nRequest mapping\nValidation\nSerialization\nHTTP response",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "without loading the entire application."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "@WebMvcTest → Controller slice",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s80",
   "num": 80,
   "title": "@DATAJPATEST",
   "stars": 0,
   "chapter": "testing",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Focuses on JPA/database layer."
      }
     ]
    },
    {
     "type": "code",
     "value": "@DataJpaTest",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Useful for repository/entity persistence tests."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "@WebMvcTest  → Web\n@DataJpaTest → Database\n@SpringBootTest → Full application",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s81",
   "num": 81,
   "title": "MOCKITO",
   "stars": 0,
   "chapter": "testing",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Used for unit-test mocking."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Mock\nPaymentRepository repository;\n\n@InjectMocks\nPaymentService service;",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Concept:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Real dependency → Mock dependency",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "So you can test service logic without database."
      }
     ]
    }
   ]
  },
  {
   "id": "s82",
   "num": 82,
   "title": "MOCK vs STUB",
   "stars": 0,
   "chapter": "testing",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Mock"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Verifies interactions."
      }
     ]
    },
    {
     "type": "code",
     "value": "Was repository.save() called?",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Stub"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Provides predetermined behavior."
      }
     ]
    },
    {
     "type": "code",
     "value": "when findById(1)\n→ return payment",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s83",
   "num": 83,
   "title": "ACTUATOR",
   "stars": 3,
   "chapter": "actuator",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot Actuator provides production-oriented monitoring/management endpoints."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common endpoints include:"
      }
     ]
    },
    {
     "type": "code",
     "value": "/actuator/health\n/actuator/info\n/actuator/metrics",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Depending on configuration, additional endpoints can be exposed."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Uses"
      }
     ]
    },
    {
     "type": "code",
     "value": "Health checks\nMetrics\nMonitoring\nApplication information\nOperational management",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s84",
   "num": 84,
   "title": "HEALTH CHECK",
   "stars": 0,
   "chapter": "actuator",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common endpoint:"
      }
     ]
    },
    {
     "type": "code",
     "value": "/actuator/health",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Used by:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Load balancer\nKubernetes\nDeployment platform\nMonitoring system",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Concept:"
      }
     ]
    },
    {
     "type": "code",
     "value": "App healthy?\n   ↓\nTraffic allowed",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s85",
   "num": 85,
   "title": "LOGGING",
   "stars": 0,
   "chapter": "actuator",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot commonly uses SLF4J API with Logback as the default logging implementation in standard Boot setups."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Prefer:"
      }
     ]
    },
    {
     "type": "code",
     "value": "private static final Logger log =\n    LoggerFactory.getLogger(MyService.class);\n\nlog.info(\"Payment processed: {}\", paymentId);",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "instead of:"
      }
     ]
    },
    {
     "type": "code",
     "value": "System.out.println(...)",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s86",
   "num": 86,
   "title": "LOG LEVELS",
   "stars": 0,
   "chapter": "actuator",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Remember:"
      }
     ]
    },
    {
     "type": "code",
     "value": "TRACE\nDEBUG\nINFO\nWARN\nERROR",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Typical production default:"
      }
     ]
    },
    {
     "type": "code",
     "value": "INFO",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s87",
   "num": 87,
   "title": "SPRING BOOT STARTUP FLOW",
   "stars": 3,
   "chapter": "startup",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "This is a great interview answer."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "When:"
      }
     ]
    },
    {
     "type": "code",
     "value": "SpringApplication.run(Application.class, args);",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "runs:"
      }
     ]
    },
    {
     "type": "code",
     "value": "1. Create/configure SpringApplication\n          ↓\n2. Determine application environment\n          ↓\n3. Load configuration\n          ↓\n4. Create ApplicationContext\n          ↓\n5. Component scanning\n          ↓\n6. Auto-configuration\n          ↓\n7. Create beans\n          ↓\n8. Dependency injection\n          ↓\n9. Lifecycle callbacks/events\n          ↓\n10. Embedded server starts for web app\n          ↓\n11. Application ready",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Don't overclaim exact internal ordering; this is the interview-level conceptual flow."
      }
     ]
    }
   ]
  },
  {
   "id": "s88",
   "num": 88,
   "title": "COMMANDLINE RUNNER",
   "stars": 0,
   "chapter": "startup",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Execute logic after application startup:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Component\nclass StartupTask implements CommandLineRunner {\n\n    @Override\n    public void run(String... args) {\n        // startup logic\n    }\n}",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s89",
   "num": 89,
   "title": "APPLICATIONRUNNER",
   "stars": 0,
   "chapter": "startup",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Similar purpose but provides parsed application arguments."
      }
     ]
    },
    {
     "type": "code",
     "value": "@Component\nclass StartupTask implements ApplicationRunner {\n\n    @Override\n    public void run(ApplicationArguments args) {\n    }\n}",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Difference"
      }
     ]
    },
    {
     "type": "code",
     "value": "CommandLineRunner\n→ String... args\n\nApplicationRunner\n→ ApplicationArguments",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s90",
   "num": 90,
   "title": "EMBEDDED SERVER PORT",
   "stars": 0,
   "chapter": "startup",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Default commonly:"
      }
     ]
    },
    {
     "type": "code",
     "value": "8080",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Change:"
      }
     ]
    },
    {
     "type": "code",
     "value": "server.port=9090",
     "lang": "properties"
    }
   ]
  },
  {
   "id": "s91",
   "num": 91,
   "title": "SPRING BOOT CLI ARGUMENT",
   "stars": 0,
   "chapter": "startup",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Can override configuration:"
      }
     ]
    },
    {
     "type": "code",
     "value": "java -jar app.jar --server.port=9090",
     "lang": "bash"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "This is one example of higher-precedence external configuration overriding the packaged default configuration."
      }
     ]
    }
   ]
  },
  {
   "id": "s92",
   "num": 92,
   "title": "COMMON HTTP STATUS CODES",
   "stars": 0,
   "chapter": "rest-design",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Memorize:"
      }
     ]
    },
    {
     "type": "code",
     "value": "200 OK\n201 Created\n204 No Content\n\n400 Bad Request\n401 Unauthorized\n403 Forbidden\n404 Not Found\n409 Conflict\n422 Unprocessable Content\n\n500 Internal Server Error\n502 Bad Gateway\n503 Service Unavailable",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Most confusing"
      }
     ]
    },
    {
     "type": "code",
     "value": "401 → not authenticated / invalid authentication\n403 → authenticated but not allowed",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s93",
   "num": 93,
   "title": "COMMON REST DESIGN",
   "stars": 0,
   "chapter": "rest-design",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For payment:"
      }
     ]
    },
    {
     "type": "code",
     "value": "POST   /payments\nGET    /payments/{id}\nGET    /payments\nPUT    /payments/{id}\nPATCH  /payments/{id}\nDELETE /payments/{id}",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Think:"
      }
     ]
    },
    {
     "type": "code",
     "value": "POST   → create\nGET    → read\nPUT    → replace/update\nPATCH  → partial update\nDELETE → delete",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s94",
   "num": 94,
   "title": "IDEMPOTENCY",
   "stars": 0,
   "chapter": "rest-design",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Important for backend interviews."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "GET"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Normally expected to be idempotent."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "PUT"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Expected to be idempotent."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "DELETE"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Semantically idempotent even if repeated requests return different status codes."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "POST"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Normally "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "not"
        }
       ]
      },
      {
       "type": "text",
       "value": " idempotent."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For payments, use:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Idempotency-Key",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "to prevent duplicate payment creation when clients retry."
      }
     ]
    }
   ]
  },
  {
   "id": "s95",
   "num": 95,
   "title": "FILTER vs INTERCEPTOR vs AOP",
   "stars": 0,
   "chapter": "mvc",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Very common comparison."
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Mechanism"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Layer"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Filter"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Servlet/request level"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Interceptor"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Spring MVC level"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "AOP"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Method/business level"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Filter"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Good for:"
      }
     ]
    },
    {
     "type": "code",
     "value": "request preprocessing\nlogging\nsecurity-related processing\nheaders",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Interceptor"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Good for:"
      }
     ]
    },
    {
     "type": "code",
     "value": "controller request handling\nauthentication checks\nlogging\nrequest-specific logic",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "AOP"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Good for:"
      }
     ]
    },
    {
     "type": "code",
     "value": "transactions\nlogging\nmetrics\ncross-cutting business concerns",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "HTTP\n ↓\nFilter\n ↓\nInterceptor\n ↓\nController\n ↓\nService\n ↓\nAOP proxy around methods",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Conceptual ordering can vary depending on configuration."
      }
     ]
    }
   ]
  },
  {
   "id": "s96",
   "num": 96,
   "title": "FILTER vs INTERCEPTOR",
   "stars": 0,
   "chapter": "mvc",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Filter"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Servlet specification-level mechanism."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Can operate before Spring MVC."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Interceptor"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring MVC mechanism."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Works around controller handling."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Easy memory"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Filter = outside Spring MVC"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Interceptor = inside Spring MVC"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s97",
   "num": 97,
   "title": "SPRING MVC",
   "stars": 0,
   "chapter": "mvc",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring MVC is the web framework used by Spring Boot applications for traditional servlet-based HTTP APIs."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Core flow:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Client\n ↓\nDispatcherServlet\n ↓\nHandler Mapping\n ↓\nController\n ↓\nService\n ↓\nResponse",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s98",
   "num": 98,
   "title": "DISPATCHERSERVLET",
   "stars": 3,
   "chapter": "mvc",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Central front controller in Spring MVC."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "It receives HTTP requests and coordinates request processing."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Conceptually:"
      }
     ]
    },
    {
     "type": "code",
     "value": "HTTP Request\n     ↓\nDispatcherServlet\n     ↓\nFind controller\n     ↓\nInvoke controller\n     ↓\nGenerate response",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "DispatcherServlet = front controller of Spring MVC"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s99",
   "num": 99,
   "title": "SPRING MVC REQUEST FLOW",
   "stars": 0,
   "chapter": "mvc",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Remember:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Request\n ↓\nFilter\n ↓\nDispatcherServlet\n ↓\nHandlerMapping\n ↓\nController\n ↓\nService\n ↓\nRepository\n ↓\nDatabase\n ↓\nResponse",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s100",
   "num": 100,
   "title": "SPRING DATA REPOSITORY INTERFACES",
   "stars": 0,
   "chapter": "repos",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common hierarchy:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Repository\n    ↓\nCrudRepository\n    ↓\nPagingAndSortingRepository",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "And commonly:"
      }
     ]
    },
    {
     "type": "code",
     "value": "JpaRepository",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "extends Spring Data repository abstractions and adds JPA-specific conveniences."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Most commonly used"
      }
     ]
    },
    {
     "type": "code",
     "value": "JpaRepository<Entity, ID>",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s101",
   "num": 101,
   "title": "DERIVED QUERY METHODS",
   "stars": 0,
   "chapter": "repos",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "findByEmail(String email)",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Data derives the query from the method name."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Other examples:"
      }
     ]
    },
    {
     "type": "code",
     "value": "findByStatus(String status)\n\nfindByStatusAndAmountGreaterThan(\n    String status,\n    BigDecimal amount\n)\n\nfindByNameContaining(String name)",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Method name → query generation"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s102",
   "num": 102,
   "title": "@QUERY",
   "stars": 0,
   "chapter": "repos",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For custom queries:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Query(\"\"\"\n    SELECT p\n    FROM Payment p\n    WHERE p.status = :status\n\"\"\")\nList<Payment> findPayments(\n    @Param(\"status\") String status\n);",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s103",
   "num": 103,
   "title": "JPQL vs SQL",
   "stars": 0,
   "chapter": "repos",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "JPQL"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Uses:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Entity names\nEntity fields",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "SELECT p FROM Payment p",
     "lang": "sql"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "SQL"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Uses:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Tables\nColumns",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "SELECT * FROM payments;",
     "lang": "sql"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "JPQL talks about objects/entities; SQL talks about tables."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s104",
   "num": 104,
   "title": "PAGINATION",
   "stars": 0,
   "chapter": "repos",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Don't return millions of records."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Data:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Page<Payment> findAll(Pageable pageable);",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "PageRequest.of(0, 20)",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Means:"
      }
     ]
    },
    {
     "type": "code",
     "value": "page 0\n20 records",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "Pagination → control response size + DB work",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s105",
   "num": 105,
   "title": "SORTING",
   "stars": 0,
   "chapter": "repos",
   "nodes": [
    {
     "type": "code",
     "value": "Sort.by(\"amount\").descending()",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Can combine with pagination."
      }
     ]
    }
   ]
  },
  {
   "id": "s106",
   "num": 106,
   "title": "OPTIONAL",
   "stars": 0,
   "chapter": "repos",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Repository commonly returns:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Optional<Payment>",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Instead of:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Payment",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "because record may not exist."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "repository.findById(id)",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s107",
   "num": 107,
   "title": "NULL HANDLING",
   "stars": 0,
   "chapter": "repos",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Avoid:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Optional.get()",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "without checking."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Prefer:"
      }
     ]
    },
    {
     "type": "code",
     "value": ".orElseThrow(...)",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Payment payment = repository.findById(id)\n    .orElseThrow(PaymentNotFoundException::new);",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s108",
   "num": 108,
   "title": "ENTITY vs DTO vs MODEL",
   "stars": 0,
   "chapter": "entities",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Remember:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Entity\n→ database representation\n\nDTO\n→ API/data-transfer representation\n\nDomain model\n→ business representation",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "They can sometimes be the same class in simple applications, but separating them is often useful as systems grow."
      }
     ]
    }
   ]
  },
  {
   "id": "s109",
   "num": 109,
   "title": "@JSONIGNORE",
   "stars": 0,
   "chapter": "entities",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Can prevent a field from being serialized into JSON."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Useful for sensitive/internal fields, but don't treat serialization annotations as your primary security boundary."
      }
     ]
    }
   ]
  },
  {
   "id": "s110",
   "num": 110,
   "title": "LAZY LOADING + JSON TRAP",
   "stars": 0,
   "chapter": "entities",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Entity:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@OneToMany(fetch = FetchType.LAZY)\nprivate List<Order> orders;",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Controller returns entity."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Jackson accesses:"
      }
     ]
    },
    {
     "type": "code",
     "value": "orders",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "This can trigger lazy loading or lead to session-related problems depending on configuration."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Better"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Use:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Entity\n ↓\nDTO\n ↓\nJSON",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "and explicitly fetch the data needed."
      }
     ]
    }
   ]
  },
  {
   "id": "s111",
   "num": 111,
   "title": "CASCADE",
   "stars": 0,
   "chapter": "entities",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "JPA relationship:"
      }
     ]
    },
    {
     "type": "code",
     "value": "cascade = CascadeType.ALL",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Means persistence operations can propagate from parent to related entity."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common:"
      }
     ]
    },
    {
     "type": "code",
     "value": "PERSIST\nMERGE\nREMOVE\nREFRESH\nDETACH\nALL",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Warning"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "CascadeType.REMOVE"
      },
      {
       "type": "text",
       "value": " can be dangerous on relationships where deleting one entity should not delete related independent records."
      }
     ]
    }
   ]
  },
  {
   "id": "s112",
   "num": 112,
   "title": "ORPHAN REMOVAL",
   "stars": 0,
   "chapter": "entities",
   "nodes": [
    {
     "type": "code",
     "value": "orphanRemoval = true",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Can remove child entities when they are removed from the parent's relationship in appropriate ownership scenarios."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "Cascade → operation propagation\nOrphanRemoval → child becomes orphan → remove child",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s113",
   "num": 113,
   "title": "OWNING SIDE",
   "stars": 0,
   "chapter": "entities",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "In bidirectional JPA relationships, one side owns the relationship mapping."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@ManyToOne\n@JoinColumn(name = \"customer_id\")\nprivate Customer customer;",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The "
      },
      {
       "type": "inlineCode",
       "value": "Order"
      },
      {
       "type": "text",
       "value": " side commonly owns the foreign-key relationship."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Owning side controls the relationship mapping/foreign key."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s114",
   "num": 114,
   "title": "@JOINCOLUMN",
   "stars": 0,
   "chapter": "entities",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Specifies the foreign key column used for a relationship."
      }
     ]
    },
    {
     "type": "code",
     "value": "@JoinColumn(name = \"customer_id\")",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s115",
   "num": 115,
   "title": "DATABASE TRANSACTION vs SPRING TRANSACTION",
   "stars": 0,
   "chapter": "tx2",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring's:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Transactional",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "typically coordinates transactional resource operations, such as database transactions, through transaction managers."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Think:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Business method\n     ↓\n@Transactional\n     ↓\nSpring transaction infrastructure\n     ↓\nDB transaction",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s116",
   "num": 116,
   "title": "TRANSACTIONAL SERVICE LAYER",
   "stars": 0,
   "chapter": "tx2",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common pattern:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Service\npublic class PaymentService {\n\n    @Transactional\n    public void processPayment() {\n        ...\n    }\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Why service layer?"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because one business operation may involve:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Repository A\nRepository B\nExternal/business logic",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "and the transaction boundary should generally align with the business operation."
      }
     ]
    }
   ]
  },
  {
   "id": "s117",
   "num": 117,
   "title": "TRANSACTION READONLY",
   "stars": 0,
   "chapter": "tx2",
   "nodes": [
    {
     "type": "code",
     "value": "@Transactional(readOnly = true)",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Indicates the transaction is intended for reads."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Useful as a semantic/performance hint depending on transaction manager/database/provider behavior."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Don't claim it universally makes the database physically read-only."
      }
     ]
    }
   ]
  },
  {
   "id": "s118",
   "num": 118,
   "title": "SPRING CACHE",
   "stars": 3,
   "chapter": "caching",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring provides caching abstraction."
      }
     ]
    },
    {
     "type": "code",
     "value": "@Cacheable(\"payments\")\npublic Payment getPayment(Long id) {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Flow:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Request\n ↓\nCache?\n ↓\nYES → return cached result\nNO\n ↓\nExecute method\n ↓\nStore result",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common annotations:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Cacheable\n@CachePut\n@CacheEvict",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s119",
   "num": 119,
   "title": "@CACHEABLE vs @CACHEPUT vs @CACHEEVICT",
   "stars": 0,
   "chapter": "caching",
   "nodes": [
    {
     "type": "code",
     "value": "@Cacheable\n→ use cache; method may be skipped on hit\n\n@CachePut\n→ execute method + update cache\n\n@CacheEvict\n→ remove cache entry",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "Cacheable → READ cache\nCachePut  → WRITE cache\nCacheEvict → DELETE cache",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s120",
   "num": 120,
   "title": "REDIS + SPRING BOOT",
   "stars": 0,
   "chapter": "caching",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "If Redis is used as a cache:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Application\n   ↓\nSpring Cache abstraction\n   ↓\nRedis",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot can auto-configure infrastructure when the relevant dependencies/configuration are present."
      }
     ]
    }
   ]
  },
  {
   "id": "s121",
   "num": 121,
   "title": "ASYNC",
   "stars": 0,
   "chapter": "caching",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring supports asynchronous execution:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Async\npublic void sendEmail() {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Usually enabled with:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@EnableAsync",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Concept:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Caller\n ↓\n@Async method\n ↓\nExecutor/thread pool",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Important"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Don't blindly assume unlimited threads."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Configure an appropriate executor."
      }
     ]
    }
   ]
  },
  {
   "id": "s122",
   "num": 122,
   "title": "SCHEDULING",
   "stars": 0,
   "chapter": "caching",
   "nodes": [
    {
     "type": "code",
     "value": "@Scheduled(fixedRate = 60000)\npublic void cleanup() {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Enable scheduling:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@EnableScheduling",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common:"
      }
     ]
    },
    {
     "type": "code",
     "value": "fixedRate\nfixedDelay\ncron",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Difference"
      }
     ]
    },
    {
     "type": "code",
     "value": "fixedRate\n→ scheduled based on start times\n\nfixedDelay\n→ wait after previous execution finishes",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s123",
   "num": 123,
   "title": "SCHEDULED + MULTIPLE INSTANCES",
   "stars": 0,
   "chapter": "caching",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Important distributed-systems interview trap."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "If:"
      }
     ]
    },
    {
     "type": "code",
     "value": "3 application instances",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "and each runs:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Scheduled",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "the task may execute on "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "each instance"
        }
       ]
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For distributed single-execution scheduling, use an external coordination/locking mechanism rather than assuming "
      },
      {
       "type": "inlineCode",
       "value": "@Scheduled"
      },
      {
       "type": "text",
       "value": " provides distributed locking."
      }
     ]
    }
   ]
  },
  {
   "id": "s124",
   "num": 124,
   "title": "EVENT SYSTEM",
   "stars": 0,
   "chapter": "caching",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring supports application events."
      }
     ]
    },
    {
     "type": "code",
     "value": "applicationEventPublisher.publishEvent(\n    new PaymentCompletedEvent(...)\n);",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Listener:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@EventListener\npublic void handle(PaymentCompletedEvent event) {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Useful for decoupling components within the application."
      }
     ]
    }
   ]
  },
  {
   "id": "s125",
   "num": 125,
   "title": "SYNCHRONOUS vs ASYNCHRONOUS EVENTS",
   "stars": 0,
   "chapter": "caching",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Default event listener execution is synchronous in the normal application-event model."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For async execution, configure asynchronous event handling appropriately."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "Event ≠ automatically async",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s126",
   "num": 126,
   "title": "RESTCLIENT / HTTP CLIENTS",
   "stars": 0,
   "chapter": "clients",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring applications may call other services using clients such as:"
      }
     ]
    },
    {
     "type": "code",
     "value": "RestClient\nWebClient\nOpenFeign (if added)",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "WebClient"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Designed for reactive/non-blocking HTTP use cases."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "RestClient"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Modern synchronous HTTP client API for Spring applications."
      }
     ]
    }
   ]
  },
  {
   "id": "s127",
   "num": 127,
   "title": "RESTCLIENT vs WEBCLIENT",
   "stars": 0,
   "chapter": "clients",
   "nodes": [
    {
     "type": "code",
     "value": "RestClient\n→ synchronous/blocking style\n\nWebClient\n→ reactive/non-blocking style",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Don't use WebClient just because \"reactive is faster.\" The architecture and workload determine whether reactive programming is beneficial."
      }
     ]
    }
   ]
  },
  {
   "id": "s128",
   "num": 128,
   "title": "SPRING WEBFLUX",
   "stars": 0,
   "chapter": "clients",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Reactive web stack."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Core types:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Mono\nFlux",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Mono"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "0 or 1 result."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Flux"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "0 to many results."
      }
     ]
    },
    {
     "type": "code",
     "value": "Mono<User>\nFlux<User>",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s129",
   "num": 129,
   "title": "SPRING MVC vs WEBFLUX",
   "stars": 3,
   "chapter": "clients",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "MVC"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "WebFlux"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Servlet-based"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Reactive"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Usually blocking style"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Non-blocking model"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Thread-per-request model commonly"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Event-loop/reactive model"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Simple CRUD apps"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "High-concurrency/reactive workloads"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Important"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "WebFlux isn't automatically better."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Choose based on:"
      }
     ]
    },
    {
     "type": "code",
     "value": "I/O model\nworkload\nteam expertise\nexisting ecosystem",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s130",
   "num": 130,
   "title": "BLOCKING IN WEBFLUX",
   "stars": 0,
   "chapter": "clients",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A common trap:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "\"If I use WebFlux, everything becomes non-blocking.\""
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "False."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "If you call a blocking JDBC/database/API operation on the reactive execution path, you can still block threads."
      }
     ]
    }
   ]
  },
  {
   "id": "s131",
   "num": 131,
   "title": "SPRING BOOT CONFIGURATION ANNOTATIONS",
   "stars": 0,
   "chapter": "config-internals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Remember this cluster:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Configuration\n@Bean\n@ConfigurationProperties\n@Profile\n@Value\n@Import\n@ComponentScan",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s132",
   "num": 132,
   "title": "@IMPORT",
   "stars": 0,
   "chapter": "config-internals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Allows importing additional configuration/classes."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Useful for modular configuration."
      }
     ]
    }
   ]
  },
  {
   "id": "s133",
   "num": 133,
   "title": "@IMPORTAUTOCONFIGURATION",
   "stars": 0,
   "chapter": "config-internals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Used heavily in testing or controlled auto-configuration scenarios."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Not something you normally need in everyday application code."
      }
     ]
    }
   ]
  },
  {
   "id": "s134",
   "num": 134,
   "title": "@CONDITIONAL",
   "stars": 0,
   "chapter": "config-internals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Conditional configuration."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Examples:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@ConditionalOnProperty\n@ConditionalOnClass\n@ConditionalOnMissingBean",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "This is a core mechanism behind Boot auto-configuration."
      }
     ]
    }
   ]
  },
  {
   "id": "s135",
   "num": 135,
   "title": "SPRING BOOT AUTO-CONFIGURATION MEMORY TRICK",
   "stars": 0,
   "chapter": "config-internals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "When asked:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "\"How does Spring Boot know what to configure?\""
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Answer:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Dependencies/classpath\n       +\nApplication configuration\n       +\nConditional auto-configurations\n       +\nExisting beans\n       ↓\nSpring Boot configures appropriate infrastructure",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s136",
   "num": 136,
   "title": "WHAT IS \"STARTER WEB\"?",
   "stars": 0,
   "chapter": "config-internals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Conceptually brings dependencies needed for common Spring MVC web application development."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Typical stack includes:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Spring MVC\nJSON support\nEmbedded servlet container\nValidation-related integration depending on version/dependencies",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Exact dependency contents can change by Spring Boot version, so avoid memorizing every transitive dependency."
      }
     ]
    }
   ]
  },
  {
   "id": "s137",
   "num": 137,
   "title": "WHAT IS \"STARTER DATA JPA\"?",
   "stars": 0,
   "chapter": "config-internals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Provides convenient dependency setup for:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Spring Data JPA\nJPA provider integration\ndatabase access infrastructure",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "You still need an appropriate database driver."
      }
     ]
    }
   ]
  },
  {
   "id": "s138",
   "num": 138,
   "title": "SPRING BOOT VERSION MANAGEMENT",
   "stars": 0,
   "chapter": "config-internals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot manages compatible dependency versions through its dependency management/BOM approach."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Therefore you often don't need to specify versions for every Spring ecosystem dependency individually."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Boot manages compatible dependency versions."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s139",
   "num": 139,
   "title": "MAVEN vs GRADLE",
   "stars": 0,
   "chapter": "deploy",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot commonly supports:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Maven\nGradle",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Maven:"
      }
     ]
    },
    {
     "type": "code",
     "value": "pom.xml",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Gradle:"
      }
     ]
    },
    {
     "type": "code",
     "value": "build.gradle\nbuild.gradle.kts",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s140",
   "num": 140,
   "title": "FAT JAR / EXECUTABLE JAR",
   "stars": 0,
   "chapter": "deploy",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot can package an application into an executable JAR containing application code and dependencies."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Run:"
      }
     ]
    },
    {
     "type": "code",
     "value": "java -jar app.jar",
     "lang": "bash"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "Executable JAR\n→ app + dependencies\n→ embedded server\n→ java -jar",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s141",
   "num": 141,
   "title": "SPRING BOOT DEVTOOLS",
   "stars": 0,
   "chapter": "deploy",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Useful during development for features such as:"
      }
     ]
    },
    {
     "type": "code",
     "value": "automatic restart\ndevelopment-time conveniences",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Should not be treated as a production dependency."
      }
     ]
    }
   ]
  },
  {
   "id": "s142",
   "num": 142,
   "title": "ERROR HANDLING",
   "stars": 0,
   "chapter": "deploy",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Good API:"
      }
     ]
    },
    {
     "type": "code",
     "value": "{\n  \"timestamp\": \"...\",\n  \"status\": 404,\n  \"error\": \"Payment not found\",\n  \"path\": \"/payments/123\"\n}",
     "lang": "json"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Prefer consistent error contracts rather than exposing stack traces."
      }
     ]
    }
   ]
  },
  {
   "id": "s143",
   "num": 143,
   "title": "OBSERVABILITY",
   "stars": 0,
   "chapter": "deploy",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Think:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Logs\n+\nMetrics\n+\nTraces",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot Actuator helps with operational endpoints/metrics, while distributed tracing typically integrates with an observability stack."
      }
     ]
    }
   ]
  },
  {
   "id": "s144",
   "num": 144,
   "title": "HEALTH vs READINESS vs LIVENESS",
   "stars": 0,
   "chapter": "deploy",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For production deployments:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Liveness\n→ Should this instance be restarted?\n\nReadiness\n→ Should this instance receive traffic?",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Don't confuse:"
      }
     ]
    },
    {
     "type": "code",
     "value": "application is alive",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "with:"
      }
     ]
    },
    {
     "type": "code",
     "value": "application is ready to serve traffic",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot Actuator supports health groups and Kubernetes-oriented health indicators/configuration."
      }
     ]
    }
   ]
  },
  {
   "id": "s145",
   "num": 145,
   "title": "CACHING vs DATABASE",
   "stars": 0,
   "chapter": "persistence",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Typical architecture:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Request\n ↓\nCache\n ↓ hit\nReturn\n\n ↓ miss\nDatabase\n ↓\nUpdate cache\n ↓\nReturn",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Cache is for:"
      }
     ]
    },
    {
     "type": "code",
     "value": "faster reads\nreduced DB load",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Not the source of truth unless explicitly designed that way."
      }
     ]
    }
   ]
  },
  {
   "id": "s146",
   "num": 146,
   "title": "COMMON SPRING ANNOTATION CHEAT TABLE",
   "stars": 0,
   "chapter": "persistence",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Annotation"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Remember as"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Component"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Generic bean"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Service"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Business service"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Repository"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Data access"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Controller"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "MVC controller/view"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@RestController"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "REST controller"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Configuration"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Configuration class"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Bean"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Register returned object"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Autowired"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Dependency injection"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Qualifier"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Choose specific bean"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Primary"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Default bean"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Lazy"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Create later"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Profile"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Environment-specific"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Value"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Inject property"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@ConfigurationProperties"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Grouped properties"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Transactional"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Transaction boundary"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Cacheable"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Read/use cache"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@CachePut"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Update cache"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@CacheEvict"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Remove cache"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Async"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Async execution"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Scheduled"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Scheduled execution"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@EventListener"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Event listener"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@ExceptionHandler"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Handle exception"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@RestControllerAdvice"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Global REST errors"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Valid"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Trigger validation"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s147",
   "num": 147,
   "title": "REST ANNOTATION CHEAT TABLE",
   "stars": 0,
   "chapter": "persistence",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Annotation"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Meaning"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@RequestMapping"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Generic route"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@GetMapping"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "GET"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@PostMapping"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "POST"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@PutMapping"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "PUT"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@PatchMapping"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "PATCH"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@DeleteMapping"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "DELETE"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@PathVariable"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "URL path value"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@RequestParam"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Query parameter"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@RequestBody"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Request body"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@RequestHeader"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "HTTP header"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@ResponseBody"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Return body"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@ResponseStatus"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Set status"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@CrossOrigin"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "CORS configuration"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s148",
   "num": 148,
   "title": "JPA ANNOTATION CHEAT TABLE",
   "stars": 0,
   "chapter": "persistence",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Annotation"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Meaning"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Entity"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Persistent entity"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Table"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Table mapping"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Id"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Primary key"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@GeneratedValue"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "ID generation"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Column"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Column mapping"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Transient"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Not persisted"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@OneToOne"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "1:1"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@OneToMany"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "1:N"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@ManyToOne"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "N:1"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@ManyToMany"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "N:N"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@JoinColumn"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "FK mapping"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Embedded"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Embedded value object"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Embeddable"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Embeddable class"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Version"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Optimistic locking"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s149",
   "num": 149,
   "title": "OPTIMISTIC LOCKING",
   "stars": 3,
   "chapter": "persistence",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Use:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Version\nprivate Long version;",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Concept:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Read record\nversion = 1\n\nUser A updates\nversion = 2\n\nUser B tries update using version 1\n        ↓\nconflict",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Useful for preventing lost updates without pessimistically locking every read."
      }
     ]
    }
   ]
  },
  {
   "id": "s150",
   "num": 150,
   "title": "PESSIMISTIC LOCKING",
   "stars": 0,
   "chapter": "persistence",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Database-level locking can prevent concurrent modification by locking rows for a transaction."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Concept:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Transaction A\n ↓\nlocks row\n ↓\nTransaction B waits/fails depending on lock semantics",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Use carefully because excessive locking can cause:"
      }
     ]
    },
    {
     "type": "code",
     "value": "contention\ndeadlocks\nreduced throughput",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s151",
   "num": 151,
   "title": "SPRING DATA JDBC vs JPA",
   "stars": 0,
   "chapter": "persistence",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "JPA"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Provides:"
      }
     ]
    },
    {
     "type": "code",
     "value": "ORM\nEntity relationships\nPersistence context\nDirty checking\nLazy loading",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Spring Data JDBC"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Simpler relational mapping model without the full JPA persistence-context/ORM model."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "code",
     "value": "JPA → richer ORM\nJDBC → simpler relational mapping",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s152",
   "num": 152,
   "title": "PERSISTENCE CONTEXT",
   "stars": 3,
   "chapter": "persistence",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "In JPA, the persistence context tracks managed entities."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Conceptually:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Database\n   ↕\nPersistence Context\n   ↕\nEntity",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "When a managed entity changes:"
      }
     ]
    },
    {
     "type": "code",
     "value": "payment.setStatus(\"SUCCESS\");",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "JPA can detect the change and synchronize it with the database during flush/transaction commit."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "This is:"
      }
     ]
    }
   ]
  },
  {
   "id": "s153",
   "num": 153,
   "title": "ENTITY STATES",
   "stars": 0,
   "chapter": "persistence",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common JPA states:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Transient\nManaged\nDetached\nRemoved",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Transient"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "New object, not managed."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Managed"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Attached to persistence context."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Detached"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Was managed, no longer managed."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Removed"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Marked for deletion."
      }
     ]
    }
   ]
  },
  {
   "id": "s154",
   "num": 154,
   "title": "SAVE DOES NOT ALWAYS MEAN INSERT",
   "stars": 0,
   "chapter": "persistence",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Important Spring Data/JPA interview trap."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Depending on entity state/identifier/persistence semantics:"
      }
     ]
    },
    {
     "type": "code",
     "value": "repository.save(entity)",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "may result in:"
      }
     ]
    },
    {
     "type": "code",
     "value": "INSERT",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "or:"
      }
     ]
    },
    {
     "type": "code",
     "value": "UPDATE/MERGE",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Don't say:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "inlineCode",
         "value": "save()"
        },
        {
         "type": "text",
         "value": " always performs INSERT."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s155",
   "num": 155,
   "title": "FLUSH vs COMMIT",
   "stars": 0,
   "chapter": "persistence",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Flush"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Synchronizes persistence-context changes with the database."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Commit"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Finalizes the transaction."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Conceptually:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Entity changes\n ↓\nPersistence context\n ↓ flush\nDB statements\n ↓ commit\nTransaction finalized",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Flush does "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "not"
        }
       ]
      },
      {
       "type": "text",
       "value": " mean transaction committed."
      }
     ]
    }
   ]
  },
  {
   "id": "s156",
   "num": 156,
   "title": "FIRST-LEVEL CACHE",
   "stars": 0,
   "chapter": "persistence",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "JPA persistence context provides a first-level cache."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Within the same persistence context:"
      }
     ]
    },
    {
     "type": "code",
     "value": "find Payment(1)\nfind Payment(1)",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "the same managed entity instance may be reused rather than issuing another database query."
      }
     ]
    }
   ]
  },
  {
   "id": "s157",
   "num": 157,
   "title": "SECOND-LEVEL CACHE",
   "stars": 0,
   "chapter": "persistence",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Optional JPA provider-level cache shared across persistence contexts."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Not enabled/used simply because you're using JPA."
      }
     ]
    }
   ]
  },
  {
   "id": "s158",
   "num": 158,
   "title": "COMMON SPRING BOOT INTERVIEW QUESTIONS",
   "stars": 0,
   "chapter": "interview",
   "nodes": [
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: What is Spring Boot?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Spring Boot simplifies Spring application development through auto-configuration, starter dependencies, embedded servers, externalized configuration, and production-ready features such as Actuator."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: Spring vs Spring Boot?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Spring provides the framework and core capabilities; Spring Boot simplifies configuring and running Spring applications."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: What is IoC?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "IoC means object creation and lifecycle management are controlled by the Spring container rather than application code."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: What is DI?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Dependency Injection is the mechanism by which Spring supplies an object's dependencies."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: What is a Bean?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "A bean is an object managed by the Spring IoC container."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: What does @SpringBootApplication do?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "It combines configuration, component scanning, and Spring Boot auto-configuration."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: What is auto-configuration?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Spring Boot conditionally configures application infrastructure based on the classpath, configuration, application type, and existing beans."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: What is a starter?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "A starter is a convenient dependency bundle for a particular application capability."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: Why constructor injection?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "It makes required dependencies explicit, supports immutable fields, improves testability, and prevents partially initialized objects."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: What happens if two beans implement the same interface?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Spring may find multiple candidates and fail with an ambiguity error; use "
        },
        {
         "type": "inlineCode",
         "value": "@Qualifier"
        },
        {
         "type": "text",
         "value": " for a specific bean or "
        },
        {
         "type": "inlineCode",
         "value": "@Primary"
        },
        {
         "type": "text",
         "value": " for a default."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: What is @Transactional?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "It defines a transaction boundary around a method/class, allowing related database operations to commit or roll back as a unit according to transaction rules."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: What is Spring AOP?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "A mechanism for applying cross-cutting concerns such as transactions, logging, and security around method execution, commonly through proxies."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: Why doesn't @Transactional work on self-invocation?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Because the internal method call uses "
        },
        {
         "type": "inlineCode",
         "value": "this"
        },
        {
         "type": "text",
         "value": " and bypasses the Spring proxy that normally performs transaction interception."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: @Controller vs @RestController?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "inlineCode",
         "value": "@Controller"
        },
        {
         "type": "text",
         "value": " is commonly used with MVC views, while "
        },
        {
         "type": "inlineCode",
         "value": "@RestController"
        },
        {
         "type": "text",
         "value": " is effectively "
        },
        {
         "type": "inlineCode",
         "value": "@Controller"
        },
        {
         "type": "text",
         "value": " plus response-body semantics for REST responses."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: @RequestParam vs @PathVariable?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "inlineCode",
         "value": "@RequestParam"
        },
        {
         "type": "text",
         "value": " reads query parameters such as "
        },
        {
         "type": "inlineCode",
         "value": "?status=PAID"
        },
        {
         "type": "text",
         "value": "; "
        },
        {
         "type": "inlineCode",
         "value": "@PathVariable"
        },
        {
         "type": "text",
         "value": " reads values embedded in the URL path such as "
        },
        {
         "type": "inlineCode",
         "value": "/payments/123"
        },
        {
         "type": "text",
         "value": "."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: JPA vs Hibernate?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "JPA is a persistence specification/API; Hibernate is a popular JPA implementation."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: Spring Data JPA?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "It provides repository abstractions and query-generation conveniences on top of JPA."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: Lazy vs eager?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Lazy loads an association when needed; eager requests loading as part of entity fetching. The exact SQL behavior depends on the provider/query."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: What is N+1?"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "One query loads the parent records, followed by N additional queries for related records. It can often be addressed through fetch joins, entity graphs, batching, or better query design."
        }
       ]
      }
     ]
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: 401 vs 403?"
      }
     ]
    },
    {
     "type": "code",
     "value": "401 → authentication problem\n403 → authenticated but not authorized",
     "lang": "text"
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 2,
     "children": [
      {
       "type": "text",
       "value": "Q: @SpringBootTest vs @WebMvcTest?"
      }
     ]
    },
    {
     "type": "code",
     "value": "@SpringBootTest → broad/full application context\n@WebMvcTest     → MVC/controller slice",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s159",
   "num": 159,
   "title": "MOST IMPORTANT \"WHAT CAN/CANNOT\" RULES",
   "stars": 0,
   "chapter": "interview",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "These are worth memorizing."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Dependency Injection"
      }
     ]
    },
    {
     "type": "code",
     "value": "❌ Don't instantiate Spring-managed dependencies manually with new\n✅ Inject them",
     "lang": "text"
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Constructor injection"
      }
     ]
    },
    {
     "type": "code",
     "value": "✅ Preferred\n✅ final fields\n✅ easy unit testing",
     "lang": "text"
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Beans"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Component → Spring discovers class\n@Bean      → Spring registers returned object",
     "lang": "text"
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Multiple beans"
      }
     ]
    },
    {
     "type": "code",
     "value": "2 candidates\n ↓\n❌ ambiguous\n✅ @Qualifier\n✅ @Primary",
     "lang": "text"
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Transactions"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Transactional\n ↓\n❌ don't assume checked exceptions automatically rollback\n❌ don't assume self-invocation activates proxy advice",
     "lang": "text"
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "REST"
      }
     ]
    },
    {
     "type": "code",
     "value": "@PathVariable → URL path\n@RequestParam → query parameter\n@RequestBody → HTTP body",
     "lang": "text"
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Security"
      }
     ]
    },
    {
     "type": "code",
     "value": "401 ≠ 403\n\n401 → authentication issue\n403 → authorization issue",
     "lang": "text"
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "JWT"
      }
     ]
    },
    {
     "type": "code",
     "value": "JWT ≠ encryption\n\nJWT commonly provides signed claims",
     "lang": "text"
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "JPA"
      }
     ]
    },
    {
     "type": "code",
     "value": "save() ≠ always INSERT\n\nLAZY ≠ no database query ever\n\nEAGER ≠ necessarily one SQL query\n\nflush ≠ commit",
     "lang": "text"
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "WebFlux"
      }
     ]
    },
    {
     "type": "code",
     "value": "WebFlux ≠ automatically faster\n\nBlocking operations can still block.",
     "lang": "text"
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Scheduled tasks"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Scheduled ≠ distributed lock\n\n3 instances\n→ potentially 3 executions",
     "lang": "text"
    },
    {
     "type": "thematicBreak"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "CORS / CSRF"
      }
     ]
    },
    {
     "type": "code",
     "value": "CORS ≠ CSRF\n\nCORS → browser cross-origin policy\nCSRF → forged authenticated requests",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s160",
   "num": 160,
   "title": "SPRING BOOT ARCHITECTURE TO REMEMBER",
   "stars": 0,
   "chapter": "interview",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For most backend interview questions, draw:"
      }
     ]
    },
    {
     "type": "code",
     "value": "                    CLIENT\n                      │\n                      ▼\n                ┌───────────┐\n                │  Security │\n                │  Filters  │\n                └─────┬─────┘\n                      │\n                      ▼\n              ┌───────────────┐\n              │ Dispatcher    │\n              │ Servlet       │\n              └───────┬───────┘\n                      │\n                      ▼\n              ┌───────────────┐\n              │ Controller    │\n              └───────┬───────┘\n                      │\n                      ▼\n              ┌───────────────┐\n              │ Service       │\n              │ Business Logic│\n              └───────┬───────┘\n                      │\n                      ▼\n              ┌───────────────┐\n              │ Repository    │\n              └───────┬───────┘\n                      │\n                      ▼\n              ┌───────────────┐\n              │ Database      │\n              └───────────────┘",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Cross-cutting:"
      }
     ]
    },
    {
     "type": "code",
     "value": "       ┌───────────────┐\n       │ AOP           │\n       │ Transactions  │\n       │ Logging       │\n       │ Metrics       │\n       └───────────────┘",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "And:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Configuration\n      ↓\napplication.yml\nprofiles\nenvironment variables\n      ↓\nSpring Boot\n      ↓\nAuto Configuration",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s161",
   "num": 161,
   "title": "THE \"SPRING CONTAINER\" MEMORY STORY",
   "stars": 0,
   "chapter": "interview",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "If interviewer asks almost anything about Spring internals, start here:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Application starts\n      ↓\nSpring creates ApplicationContext\n      ↓\nFinds bean definitions\n      ↓\nScans components\n      ↓\nApplies auto-configuration\n      ↓\nCreates beans\n      ↓\nResolves dependencies\n      ↓\nCreates proxies where needed\n      ↓\nBean ready",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Then:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Request\n ↓\nProxy/filter/security\n ↓\nController\n ↓\nService\n ↓\nRepository\n ↓\nDatabase",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "This mental model connects "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "DI + AOP + Security + Transactions + MVC + JPA"
        }
       ]
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    }
   ]
  },
  {
   "id": "s162",
   "num": 162,
   "title": "SPRING BOOT \"ONE-LINE MEMORY SHEET\"",
   "stars": 0,
   "chapter": "interview",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "If you only have "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "2 minutes before an interview"
        }
       ]
      },
      {
       "type": "text",
       "value": ", remember this:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Spring\n= IoC + DI + AOP + Transactions\n\nBoot\n= Starters + AutoConfig + Embedded Server + External Config + Actuator\n\nIoC\n= Spring owns object creation\n\nDI\n= Spring supplies dependencies\n\nBean\n= Spring-managed object\n\n@Component\n= discover this class\n\n@Service\n= business component\n\n@Repository\n= persistence component\n\n@Controller\n= MVC controller\n\n@RestController\n= REST/data controller\n\n@Bean\n= register returned object\n\n@Autowired\n= inject dependency\n\n@Qualifier\n= choose exact bean\n\n@Primary\n= default bean\n\nDefault scope\n= singleton per container\n\n@SpringBootApplication\n= Configuration + ComponentScan + AutoConfiguration\n\nAutoConfig\n= conditional configuration\n\n@ConfigurationProperties\n= grouped configuration\n\nProfile\n= environment-specific configuration\n\nController\n= HTTP layer\n\nService\n= business layer\n\nRepository\n= data layer\n\nDTO\n= API contract\n\nJPA\n= persistence specification\n\nHibernate\n= JPA implementation\n\nSpring Data JPA\n= repository abstraction\n\nLAZY\n= load association when needed\n\nN+1\n= 1 query + N related queries\n\n@Transactional\n= transaction boundary\n\nREQUIRED\n= join/create transaction\n\nREQUIRES_NEW\n= suspend/create new\n\nAOP\n= cross-cutting concerns\n\nProxy\n= intercept method calls\n\nSelf-invocation\n= bypasses proxy\n\nSecurity\n= Authentication + Authorization\n\n401\n= authentication problem\n\n403\n= authorization problem\n\nCORS\n= cross-origin browser policy\n\nCSRF\n= forged authenticated request\n\nJWT\n= signed token, not inherently encrypted\n\n@WebMvcTest\n= MVC slice\n\n@DataJpaTest\n= JPA slice\n\n@SpringBootTest\n= broad/full context\n\nActuator\n= monitoring/management\n\n@Cacheable\n= cache read\n\n@CachePut\n= update cache\n\n@CacheEvict\n= remove cache\n\n@Async\n= asynchronous execution\n\n@Scheduled\n= scheduled execution\n\nWebFlux\n= reactive/non-blocking stack\n\nMono\n= 0..1\n\nFlux\n= 0..N",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s163",
   "num": 163,
   "title": "THE 10 THINGS MOST LIKELY TO BE ASKED",
   "stars": 0,
   "chapter": "interview",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "If your interview time is limited, prioritize these "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "in this exact order"
        }
       ]
      },
      {
       "type": "text",
       "value": ":"
      }
     ]
    },
    {
     "type": "code",
     "value": "1. IoC + Dependency Injection\n2. @SpringBootApplication\n3. Auto-configuration\n4. Bean lifecycle + scopes\n5. Constructor injection / @Qualifier / @Primary\n6. REST Controller + request mappings\n7. Spring Data JPA + Hibernate + relationships\n8. @Transactional + propagation + rollback\n9. Spring Security + JWT + 401/403\n10. Testing + Actuator",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Then:"
      }
     ]
    },
    {
     "type": "code",
     "value": "11. AOP / proxies\n12. Profiles / configuration\n13. Exception handling\n14. Validation\n15. Caching\n16. Async / Scheduling\n17. MVC vs WebFlux\n18. JPA performance/N+1",
     "lang": "text"
    }
   ]
  },
  {
   "id": "s164",
   "num": 164,
   "title": "FINAL MENTAL MODEL",
   "stars": 0,
   "chapter": "interview",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Don't remember Spring Boot as:"
      }
     ]
    },
    {
     "type": "code",
     "value": "100 annotations ❌",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Remember it as:"
      }
     ]
    },
    {
     "type": "code",
     "value": "              SPRING BOOT\n                   │\n        ┌──────────┴──────────┐\n        │                     │\n   Spring Core             Boot\n        │                     │\n   IoC / DI              AutoConfig\n   Beans                 Starters\n   AOP                   Embedded Server\n   Lifecycle             Config\n        │                Actuator\n        │\n        ├───────────────┐\n        │               │\n      Web             Data\n        │               │\n     MVC              JPA\n     REST           Hibernate\n     Security       Repositories\n        │               │\n        └───────┬───────┘\n                │\n             Business\n              Service\n                │\n             Database",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "And the "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "single most useful interview sentence"
        }
       ]
      },
      {
       "type": "text",
       "value": " is:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "“Spring manages objects as beans through the IoC container and injects their dependencies; Spring Boot builds on this with auto-configuration, starters, embedded infrastructure, and externalized configuration so we can build production-ready applications with much less manual setup.”"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "That sentence gives you the foundation for almost every "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "“What is Spring Boot?”"
        }
       ]
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "“How does Spring work?”"
        }
       ]
      },
      {
       "type": "text",
       "value": ", and "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "“Why do we use Spring Boot?”"
        }
       ]
      },
      {
       "type": "text",
       "value": " follow-up question."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Yes — "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "these “why do we need this when that already exists?” questions are extremely important in Spring Boot interviews."
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The best way to learn them is:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Existing thing → limitation → new thing → why it was introduced"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Here are the important ones you should understand."
      }
     ]
    }
   ]
  },
  {
   "id": "c2",
   "num": 2,
   "title": "@Component vs @Service vs @Repository",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If "
        },
        {
         "type": "inlineCode",
         "value": "@Service"
        },
        {
         "type": "text",
         "value": " and "
        },
        {
         "type": "inlineCode",
         "value": "@Repository"
        },
        {
         "type": "text",
         "value": " are basically components, why do we need them?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because they give "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "semantic meaning"
        }
       ]
      },
      {
       "type": "text",
       "value": " and can provide specialized framework behavior."
      }
     ]
    },
    {
     "type": "code",
     "value": "@Component\nclass PaymentService",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "vs"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Service\nclass PaymentService",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Both become Spring beans."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "But:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Component → generic component\n@Service   → business/service layer\n@Repository → persistence/data-access layer",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Service"
          },
          {
           "type": "text",
           "value": " and "
          },
          {
           "type": "inlineCode",
           "value": "@Repository"
          },
          {
           "type": "text",
           "value": " are specialized forms of "
          },
          {
           "type": "inlineCode",
           "value": "@Component"
          },
          {
           "type": "text",
           "value": "."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Don't say they are completely different bean mechanisms."
      }
     ]
    }
   ]
  },
  {
   "id": "c3",
   "num": 3,
   "title": "@Controller vs @RestController",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If "
        },
        {
         "type": "inlineCode",
         "value": "@RestController"
        },
        {
         "type": "text",
         "value": " already exists, why do we need "
        },
        {
         "type": "inlineCode",
         "value": "@Controller"
        },
        {
         "type": "text",
         "value": "?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because they serve different response styles."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "inlineCode",
       "value": "@Controller"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Usually used with MVC views:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Request\n ↓\nController\n ↓\nHTML/View",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "inlineCode",
       "value": "@RestController"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Usually used for APIs:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Request\n ↓\nController\n ↓\nJSON/XML/Data",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Technically:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@RestController\n=\n@Controller\n+\n@ResponseBody",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Controller → commonly View"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "RestController → commonly REST response body"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c4",
   "num": 4,
   "title": "@Autowired vs Constructor Injection",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If Spring already has "
        },
        {
         "type": "inlineCode",
         "value": "@Autowired"
        },
        {
         "type": "text",
         "value": ", why do people use constructor injection without it?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because with a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "single constructor"
        }
       ]
      },
      {
       "type": "text",
       "value": ", Spring can automatically use that constructor."
      }
     ]
    },
    {
     "type": "code",
     "value": "@Service\nclass PaymentService {\n\n    private final PaymentRepository repository;\n\n    PaymentService(PaymentRepository repository) {\n        this.repository = repository;\n    }\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "No "
      },
      {
       "type": "inlineCode",
       "value": "@Autowired"
      },
      {
       "type": "text",
       "value": " needed."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Why constructor injection?"
      }
     ]
    },
    {
     "type": "code",
     "value": "Explicit dependency\n+\nfinal field\n+\neasy unit testing\n+\nobject cannot be created without required dependency",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Autowired"
          },
          {
           "type": "text",
           "value": " is the mechanism; constructor injection is the preferred injection style."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c5",
   "num": 5,
   "title": "@Qualifier vs @Primary",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If "
        },
        {
         "type": "inlineCode",
         "value": "@Primary"
        },
        {
         "type": "text",
         "value": " chooses a bean, why do we need "
        },
        {
         "type": "inlineCode",
         "value": "@Qualifier"
        },
        {
         "type": "text",
         "value": "?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Suppose:"
      }
     ]
    },
    {
     "type": "code",
     "value": "PaymentGateway\n ├── StripeGateway\n └── RazorpayGateway",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Both are beans."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "inlineCode",
       "value": "@Primary"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Primary\nclass StripeGateway",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Means:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "\"Use me as the default.\""
        }
       ]
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "inlineCode",
       "value": "@Qualifier"
      }
     ]
    },
    {
     "type": "code",
     "value": "PaymentService(\n    @Qualifier(\"razorpayGateway\")\n    PaymentGateway gateway\n)",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Means:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "\"I specifically want Razorpay.\""
        }
       ]
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Primary"
          },
          {
           "type": "text",
           "value": " = default choice"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Qualifier"
          },
          {
           "type": "text",
           "value": " = exact choice"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c6",
   "num": 6,
   "title": "@Value vs @ConfigurationProperties",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If "
        },
        {
         "type": "inlineCode",
         "value": "@Value"
        },
        {
         "type": "text",
         "value": " can read configuration, why do we need "
        },
        {
         "type": "inlineCode",
         "value": "@ConfigurationProperties"
        },
        {
         "type": "text",
         "value": "?"
        }
       ]
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "inlineCode",
       "value": "@Value"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Good for one/few properties:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Value(\"${app.timeout}\")\nprivate int timeout;",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "inlineCode",
       "value": "@ConfigurationProperties"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Good for grouped configuration:"
      }
     ]
    },
    {
     "type": "code",
     "value": "app:\n  timeout: 30\n  name: payment-service\n  retry-count: 3",
     "lang": "yaml"
    },
    {
     "type": "code",
     "value": "@ConfigurationProperties(prefix = \"app\")\nclass AppProperties {\n    int timeout;\n    String name;\n    int retryCount;\n}",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Value"
          },
          {
           "type": "text",
           "value": " = individual property"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "inlineCode",
           "value": "@ConfigurationProperties"
          },
          {
           "type": "text",
           "value": " = configuration group/object"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c7",
   "num": 7,
   "title": "application.properties vs application.yml",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If both store configuration, why do we need both?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "They solve the same basic purpose but have different formats."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Properties:"
      }
     ]
    },
    {
     "type": "code",
     "value": "server.port=8080\napp.name=payment",
     "lang": "properties"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "YAML:"
      }
     ]
    },
    {
     "type": "code",
     "value": "server:\n  port: 8080\n\napp:\n  name: payment",
     "lang": "yaml"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Why YAML?"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Nested/grouped configuration is often easier to read."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Same purpose, different syntax/format."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "You normally don't need both for the same configuration."
      }
     ]
    }
   ]
  },
  {
   "id": "c8",
   "num": 8,
   "title": "@ControllerAdvice vs @RestControllerAdvice",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If "
        },
        {
         "type": "inlineCode",
         "value": "@ControllerAdvice"
        },
        {
         "type": "text",
         "value": " exists, why was "
        },
        {
         "type": "inlineCode",
         "value": "@RestControllerAdvice"
        },
        {
         "type": "text",
         "value": " created?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "@ControllerAdvice"
      },
      {
       "type": "text",
       "value": " is general MVC exception-handling advice."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For REST APIs, you usually want the result written directly to the response body."
      }
     ]
    },
    {
     "type": "code",
     "value": "@ControllerAdvice\n→ MVC/general controller handling\n\n@RestControllerAdvice\n→ REST API exception handling",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Conceptually:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@RestControllerAdvice\n=\n@ControllerAdvice\n+\n@ResponseBody",
     "lang": "text"
    }
   ]
  },
  {
   "id": "c9",
   "num": 9,
   "title": "@ExceptionHandler vs @ControllerAdvice",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If "
        },
        {
         "type": "inlineCode",
         "value": "@ExceptionHandler"
        },
        {
         "type": "text",
         "value": " can handle exceptions, why do we need "
        },
        {
         "type": "inlineCode",
         "value": "@ControllerAdvice"
        },
        {
         "type": "text",
         "value": "?"
        }
       ]
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "inlineCode",
       "value": "@ExceptionHandler"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Can handle an exception for a particular controller."
      }
     ]
    },
    {
     "type": "code",
     "value": "@ExceptionHandler(UserNotFoundException.class)",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "inlineCode",
       "value": "@ControllerAdvice"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Allows centralized handling across controllers."
      }
     ]
    },
    {
     "type": "code",
     "value": "Controller A ─┐\nController B ─┼──→ Global Exception Handler\nController C ─┘",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "inlineCode",
           "value": "@ExceptionHandler"
          },
          {
           "type": "text",
           "value": " = handling mechanism"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "inlineCode",
           "value": "@ControllerAdvice"
          },
          {
           "type": "text",
           "value": " = centralized/global location"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c10",
   "num": 10,
   "title": "@RequestParam vs @PathVariable",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Both get values from the URL, so why do we need both?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because they represent different URL concepts."
      }
     ]
    },
    {
     "type": "code",
     "value": "/payments/123",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "→ "
      },
      {
       "type": "inlineCode",
       "value": "@PathVariable"
      }
     ]
    },
    {
     "type": "code",
     "value": "@GetMapping(\"/payments/{id}\")",
     "lang": "java"
    },
    {
     "type": "code",
     "value": "/payments?id=123",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "→ "
      },
      {
       "type": "inlineCode",
       "value": "@RequestParam"
      }
     ]
    },
    {
     "type": "code",
     "value": "@GetMapping(\"/payments\")",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "PathVariable = part of resource path"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "RequestParam = query/filter/input parameter"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c11",
   "num": 11,
   "title": "@RequestBody vs @RequestParam",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "code",
     "value": "POST /payments?currency=INR",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "currency"
      },
      {
       "type": "text",
       "value": " → "
      },
      {
       "type": "inlineCode",
       "value": "@RequestParam"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "JSON:"
      }
     ]
    },
    {
     "type": "code",
     "value": "{\n  \"amount\": 1000\n}",
     "lang": "json"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "→ "
      },
      {
       "type": "inlineCode",
       "value": "@RequestBody"
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Query string → RequestParam"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "HTTP body → RequestBody"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c12",
   "num": 12,
   "title": "@RequestMapping vs @GetMapping / @PostMapping",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If "
        },
        {
         "type": "inlineCode",
         "value": "@RequestMapping"
        },
        {
         "type": "text",
         "value": " can map requests, why do we need "
        },
        {
         "type": "inlineCode",
         "value": "@GetMapping"
        },
        {
         "type": "text",
         "value": "?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "@RequestMapping"
      },
      {
       "type": "text",
       "value": " is general."
      }
     ]
    },
    {
     "type": "code",
     "value": "@RequestMapping(method = RequestMethod.GET)",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "@GetMapping"
      },
      {
       "type": "text",
       "value": " is a convenient specialized form:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@GetMapping",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Similarly:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@GetMapping\n@PostMapping\n@PutMapping\n@PatchMapping\n@DeleteMapping",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "inlineCode",
           "value": "@RequestMapping"
          },
          {
           "type": "text",
           "value": " = generic"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "HTTP-specific annotations = shorter/clearer"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c13",
   "num": 13,
   "title": "JpaRepository vs CrudRepository",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If "
        },
        {
         "type": "inlineCode",
         "value": "CrudRepository"
        },
        {
         "type": "text",
         "value": " already provides CRUD, why do we need "
        },
        {
         "type": "inlineCode",
         "value": "JpaRepository"
        },
        {
         "type": "text",
         "value": "?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because "
      },
      {
       "type": "inlineCode",
       "value": "JpaRepository"
      },
      {
       "type": "text",
       "value": " provides additional JPA-specific capabilities/conveniences."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Conceptually:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Repository\n    ↓\nCrudRepository\n    ↓\nPagingAndSortingRepository\n    ↓\nJpaRepository",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "So:"
      }
     ]
    },
    {
     "type": "code",
     "value": "CrudRepository\n→ basic CRUD\n\nJpaRepository\n→ CRUD + JPA-specific features/conveniences",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Use the abstraction that provides the functionality your application actually needs."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c14",
   "num": 14,
   "title": "JPA vs Hibernate",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If Hibernate does ORM, why do we need JPA?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because they are not the same thing."
      }
     ]
    },
    {
     "type": "code",
     "value": "JPA\n→ specification/API\n\nHibernate\n→ implementation",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Think:"
      }
     ]
    },
    {
     "type": "code",
     "value": "JPA = rules/interface\n\nHibernate = implementation of those rules",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Real-world analogy"
      }
     ]
    },
    {
     "type": "code",
     "value": "JDBC API\n    ↓\nDatabase Driver\n\nJPA\n    ↓\nHibernate",
     "lang": "text"
    }
   ]
  },
  {
   "id": "c15",
   "num": 15,
   "title": "JPA vs Spring Data JPA",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If JPA already exists, why do we need Spring Data JPA?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "JPA gives persistence APIs."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Data JPA reduces boilerplate around repositories and queries."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Without Spring Data JPA, you may write more persistence code."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "With:"
      }
     ]
    },
    {
     "type": "code",
     "value": "interface PaymentRepository\n        extends JpaRepository<Payment, Long> {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "you immediately get repository operations."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "code",
     "value": "JPA\n→ persistence specification\n\nHibernate\n→ implementation\n\nSpring Data JPA\n→ repository abstraction/convenience",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "This three-way distinction is "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "very important for interviews"
        }
       ]
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    }
   ]
  },
  {
   "id": "c16",
   "num": 16,
   "title": "save() vs saveAndFlush()",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If "
        },
        {
         "type": "inlineCode",
         "value": "save()"
        },
        {
         "type": "text",
         "value": " saves the entity, why do we need "
        },
        {
         "type": "inlineCode",
         "value": "saveAndFlush()"
        },
        {
         "type": "text",
         "value": "?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because:"
      }
     ]
    },
    {
     "type": "code",
     "value": "save()\n→ persist/merge through JPA\n→ changes may remain in persistence context until flush\n\nsaveAndFlush()\n→ save\n→ explicitly flush persistence context",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Important"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Flush ≠ Commit"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Flushing sends pending SQL to the database; the surrounding transaction can still roll back."
      }
     ]
    }
   ]
  },
  {
   "id": "c17",
   "num": 17,
   "title": "LAZY vs EAGER",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If EAGER automatically loads the data, why would we need LAZY?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because loading everything immediately can cause unnecessary DB work and large object graphs."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "LAZY"
      }
     ]
    },
    {
     "type": "code",
     "value": "Load Payment\n   ↓\nDon't immediately load related Customer\n   ↓\nLoad when accessed",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "EAGER"
      }
     ]
    },
    {
     "type": "code",
     "value": "Load Payment\n   ↓\nAssociated data requested as part of entity fetching",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "LAZY = don't load association until needed"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "EAGER = association is requested as part of fetching"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c18",
   "num": 18,
   "title": "Entity vs DTO",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If Entity already contains the data, why do we need DTO?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because database structure and API structure are different concerns."
      }
     ]
    },
    {
     "type": "code",
     "value": "Entity\n→ Database model\n\nDTO\n→ API contract",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example Entity might contain:"
      }
     ]
    },
    {
     "type": "code",
     "value": "id\nemail\npasswordHash\ncreatedAt\ninternalStatus",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "But API may need:"
      }
     ]
    },
    {
     "type": "code",
     "value": "id\nemail",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Entity = persistence concern"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "DTO = communication/API concern"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c19",
   "num": 19,
   "title": "Filter vs Interceptor",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Both can intercept requests, why do we need both?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Different layers."
      }
     ]
    },
    {
     "type": "code",
     "value": "HTTP Request\n     ↓\nFilter\n     ↓\nSpring MVC\n     ↓\nInterceptor\n     ↓\nController",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Filter"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Servlet-level."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Good for:"
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "request/response processing"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "headers"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "logging"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "security-related processing"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Interceptor"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring MVC-level."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Good for:"
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "controller-related pre/post processing"
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "request-specific application logic"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Filter = Servlet level"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Interceptor = Spring MVC level"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c20",
   "num": 20,
   "title": "Filter vs AOP",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If AOP can intercept methods, why do we need Filters?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because they operate at different levels."
      }
     ]
    },
    {
     "type": "code",
     "value": "HTTP request\n ↓\nFilter\n ↓\nController\n ↓\nService method\n ↓\nAOP",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Filter → request"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "AOP → method"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c21",
   "num": 21,
   "title": "@Transactional vs AOP",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If "
        },
        {
         "type": "inlineCode",
         "value": "@Transactional"
        },
        {
         "type": "text",
         "value": " is just an annotation, how does transaction logic actually happen?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring uses proxy/interception infrastructure."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Conceptually:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Your code\n   ↓\nSpring Proxy\n   ↓\nStart transaction\n   ↓\nYour method\n   ↓\nCommit / Rollback",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Transactional"
          },
          {
           "type": "text",
           "value": " is declarative; Spring infrastructure performs the transaction management."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c22",
   "num": 22,
   "title": "REQUIRED vs REQUIRES_NEW",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If "
        },
        {
         "type": "inlineCode",
         "value": "REQUIRED"
        },
        {
         "type": "text",
         "value": " can create a transaction, why do we need "
        },
        {
         "type": "inlineCode",
         "value": "REQUIRES_NEW"
        },
        {
         "type": "text",
         "value": "?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because sometimes you want a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "separate transaction"
        }
       ]
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "REQUIRED"
      }
     ]
    },
    {
     "type": "code",
     "value": "Existing transaction?\n   ↓\nYES → join it\nNO  → create one",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "REQUIRES_NEW"
      }
     ]
    },
    {
     "type": "code",
     "value": "Existing transaction?\n   ↓\nYES → suspend it\n     ↓\n   create NEW transaction",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Typical use case"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "You may want audit/logging to commit independently of the main business transaction."
      }
     ]
    }
   ]
  },
  {
   "id": "c23",
   "num": 23,
   "title": "@Component vs @Configuration",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "inlineCode",
         "value": "@Configuration"
        },
        {
         "type": "text",
         "value": " is also a component-like bean, so why separate it?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because "
      },
      {
       "type": "inlineCode",
       "value": "@Configuration"
      },
      {
       "type": "text",
       "value": " communicates:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "\"This class contains configuration/bean definitions.\""
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Configuration\nclass AppConfig {\n\n    @Bean\n    PaymentService paymentService() {\n        return new PaymentService();\n    }\n}",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Component"
          },
          {
           "type": "text",
           "value": " = application component"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Configuration"
          },
          {
           "type": "text",
           "value": " = configuration/bean-definition class"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c24",
   "num": 24,
   "title": "Spring vs Spring Boot",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If Spring already exists, why was Spring Boot created?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring is powerful but historically required more setup/configuration."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot adds:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Auto-configuration\n+\nStarters\n+\nEmbedded server\n+\nExternalized configuration\n+\nProduction features",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Spring gives the capabilities."
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Spring Boot makes using those capabilities much easier."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c25",
   "num": 25,
   "title": "Spring Boot vs Spring MVC",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If Spring MVC handles web applications, why do we need Spring Boot?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Different levels."
      }
     ]
    },
    {
     "type": "code",
     "value": "Spring MVC\n→ web framework\n\nSpring Boot\n→ application setup/configuration platform built around Spring",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring Boot can configure Spring MVC for you."
      }
     ]
    }
   ]
  },
  {
   "id": "c26",
   "num": 26,
   "title": "@SpringBootApplication vs @EnableAutoConfiguration",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If "
        },
        {
         "type": "inlineCode",
         "value": "@EnableAutoConfiguration"
        },
        {
         "type": "text",
         "value": " does auto-configuration, why do we need "
        },
        {
         "type": "inlineCode",
         "value": "@SpringBootApplication"
        },
        {
         "type": "text",
         "value": "?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because "
      },
      {
       "type": "inlineCode",
       "value": "@SpringBootApplication"
      },
      {
       "type": "text",
       "value": " combines common startup annotations:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@SpringBootApplication\n        =\n@Configuration\n+\n@EnableAutoConfiguration\n+\n@ComponentScan",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "inlineCode",
         "value": "@EnableAutoConfiguration"
        },
        {
         "type": "text",
         "value": " = one capability"
        },
        {
         "type": "break"
        },
        {
         "type": "inlineCode",
         "value": "@SpringBootApplication"
        },
        {
         "type": "text",
         "value": " = convenient combination for a typical Boot application"
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c27",
   "num": 27,
   "title": "@Value vs Environment",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If "
        },
        {
         "type": "inlineCode",
         "value": "Environment"
        },
        {
         "type": "text",
         "value": " can read properties, why use "
        },
        {
         "type": "inlineCode",
         "value": "@Value"
        },
        {
         "type": "text",
         "value": "?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Both can access configuration."
      }
     ]
    },
    {
     "type": "code",
     "value": "@Value(\"${app.name}\")\nprivate String name;",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "vs"
      }
     ]
    },
    {
     "type": "code",
     "value": "environment.getProperty(\"app.name\");",
     "lang": "java"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Difference"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Value\n→ declarative injection\n\nEnvironment\n→ programmatically read properties",
     "lang": "text"
    }
   ]
  },
  {
   "id": "c28",
   "num": 28,
   "title": "@Async vs normal method",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If Java threads already exist, why do we need "
        },
        {
         "type": "inlineCode",
         "value": "@Async"
        },
        {
         "type": "text",
         "value": "?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "@Async"
      },
      {
       "type": "text",
       "value": " integrates asynchronous execution with Spring's executor infrastructure."
      }
     ]
    },
    {
     "type": "code",
     "value": "@Async\npublic void sendEmail() {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring can execute it through a configured executor."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Java provides threads/concurrency primitives; "
        },
        {
         "type": "inlineCode",
         "value": "@Async"
        },
        {
         "type": "text",
         "value": " provides convenient Spring-managed asynchronous method execution."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c29",
   "num": 29,
   "title": "@Scheduled vs normal loop/thread",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If we can create a thread and run a loop, why use "
        },
        {
         "type": "inlineCode",
         "value": "@Scheduled"
        },
        {
         "type": "text",
         "value": "?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because Spring provides scheduling infrastructure."
      }
     ]
    },
    {
     "type": "code",
     "value": "@Scheduled(fixedRate = 60000)\npublic void cleanup() {\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Much cleaner than manually managing:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Thread\nwhile(true)\nsleep()",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "inlineCode",
           "value": "@Scheduled"
          },
          {
           "type": "text",
           "value": " = declarative scheduling managed by Spring."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c30",
   "num": 30,
   "title": "Cache vs Database",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If database already stores the data, why do we need Redis/cache?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because their purposes are different."
      }
     ]
    },
    {
     "type": "code",
     "value": "Database\n→ source of truth / durable storage\n\nCache\n→ fast temporary/reusable copy",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Flow:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Request\n ↓\nCache?\n ├── HIT → return\n └── MISS\n       ↓\n    Database\n       ↓\n    Cache",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "DB = store"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Cache = speed"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c31",
   "num": 31,
   "title": "Authentication vs Authorization",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If authentication checks the user, why do we need authorization?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Different questions:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Authentication\n→ Who are you?\n\nAuthorization\n→ What are you allowed to do?",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Login\n ↓\nAuthentication\n\nADMIN endpoint\n ↓\nAuthorization",
     "lang": "text"
    }
   ]
  },
  {
   "id": "c32",
   "num": 32,
   "title": "CORS vs CSRF",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Both are security problems involving browsers, so why do we need both?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Different attacks/problems."
      }
     ]
    },
    {
     "type": "code",
     "value": "CORS\n→ controls allowed cross-origin browser requests\n\nCSRF\n→ prevents forged authenticated requests",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "CORS = Who can call from another origin?"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "CSRF = Can an attacker trick the browser into making an authenticated request?"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c33",
   "num": 33,
   "title": "Session vs JWT",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If session authentication works, why use JWT?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Different approaches."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Session"
      }
     ]
    },
    {
     "type": "code",
     "value": "Client\n ↓\nSession ID\n ↓\nServer-side session",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "JWT"
      }
     ]
    },
    {
     "type": "code",
     "value": "Client\n ↓\nJWT\n ↓\nServer validates token",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "JWT can support stateless authentication patterns, while sessions maintain server-side session state."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Session → server maintains session state"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "JWT → authentication information carried in token"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Neither is universally \"better\"; architecture and requirements decide."
      }
     ]
    }
   ]
  },
  {
   "id": "c34",
   "num": 34,
   "title": "Spring MVC vs WebFlux",
   "stars": 3,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If Spring MVC already handles HTTP requests, why do we need WebFlux?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Different programming/execution models."
      }
     ]
    },
    {
     "type": "code",
     "value": "Spring MVC\n→ traditional servlet/blocking model\n\nWebFlux\n→ reactive/non-blocking model",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "WebFlux is useful when the application benefits from reactive end-to-end processing and high concurrency with I/O-heavy workloads."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Important"
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Don't answer:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "\"WebFlux is faster.\""
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Instead:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "\"WebFlux provides a reactive non-blocking model, which can be useful for particular high-concurrency I/O workloads.\""
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c35",
   "num": 35,
   "title": "RestClient vs WebClient",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If "
        },
        {
         "type": "inlineCode",
         "value": "RestClient"
        },
        {
         "type": "text",
         "value": " can call APIs, why do we need "
        },
        {
         "type": "inlineCode",
         "value": "WebClient"
        },
        {
         "type": "text",
         "value": "?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Different execution models."
      }
     ]
    },
    {
     "type": "code",
     "value": "RestClient\n→ synchronous HTTP calls\n\nWebClient\n→ reactive/non-blocking HTTP calls",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "RestClient = simple synchronous client"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "WebClient = reactive client"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c36",
   "num": 36,
   "title": "@Mock vs @MockBean / Spring mock replacement",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If Mockito's "
        },
        {
         "type": "inlineCode",
         "value": "@Mock"
        },
        {
         "type": "text",
         "value": " exists, why do we need a Spring mock-bean mechanism?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because they work at different levels."
      }
     ]
    },
    {
     "type": "code",
     "value": "@Mock\n→ Mockito creates mock object\n\nSpring mock-bean mechanism\n→ mock is also registered/replaced in Spring ApplicationContext",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "So if your service is created by Spring and needs a mocked repository, the Spring context must know about that mock."
      }
     ]
    }
   ]
  },
  {
   "id": "c37",
   "num": 37,
   "title": "Unit Test vs @SpringBootTest",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If I can test the service using JUnit/Mockito, why do I need "
        },
        {
         "type": "inlineCode",
         "value": "@SpringBootTest"
        },
        {
         "type": "text",
         "value": "?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Different test purposes."
      }
     ]
    },
    {
     "type": "code",
     "value": "Unit test\n→ test one class\n→ dependencies mocked\n→ fast\n\n@SpringBootTest\n→ test integration with Spring context\n→ more realistic\n→ slower",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Unit test = isolated"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "SpringBootTest = integrated Spring environment"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c38",
   "num": 38,
   "title": "@WebMvcTest vs @SpringBootTest",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If "
        },
        {
         "type": "inlineCode",
         "value": "@SpringBootTest"
        },
        {
         "type": "text",
         "value": " tests everything, why do we need "
        },
        {
         "type": "inlineCode",
         "value": "@WebMvcTest"
        },
        {
         "type": "text",
         "value": "?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because loading everything is unnecessary when testing only the controller/web layer."
      }
     ]
    },
    {
     "type": "code",
     "value": "@WebMvcTest\n→ MVC slice\n\n@SpringBootTest\n→ broad/full context",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Memory"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Slice test = only what you need."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c39",
   "num": 39,
   "title": "@Cacheable vs @CachePut",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Question"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "If both put data into cache, why do we need both?"
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Important difference:"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Cacheable\n→ check cache first\n→ method may NOT execute on cache hit\n\n@CachePut\n→ method ALWAYS executes\n→ result updates cache",
     "lang": "text"
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Remember"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "Cacheable = use cache"
          }
         ]
        },
        {
         "type": "break"
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "CachePut = execute + update cache"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "c40",
   "num": 40,
   "title": "The Pattern You Should Use in Interviews",
   "stars": 0,
   "chapter": "comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Whenever interviewer asks:"
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "\"Why do we need X when Y already exists?\""
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Think:"
      }
     ]
    },
    {
     "type": "code",
     "value": "1. What does Y do?\n        ↓\n2. What limitation does Y have?\n        ↓\n3. What does X add/change?\n        ↓\n4. When would I choose X?",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example:"
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "inlineCode",
       "value": "@Component"
      },
      {
       "type": "text",
       "value": " vs "
      },
      {
       "type": "inlineCode",
       "value": "@Bean"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Component\n→ Spring discovers class\n\nProblem:\n→ Can't use it easily for third-party classes/custom construction\n\n@Bean\n→ I explicitly create/configure object\n→ Spring manages it",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "That is the "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "real understanding"
        }
       ]
      },
      {
       "type": "text",
       "value": ", instead of memorizing annotations separately."
      }
     ]
    },
    {
     "type": "heading",
     "depth": 3,
     "children": [
      {
       "type": "text",
       "value": "Highest-priority pairs to practice"
      }
     ]
    },
    {
     "type": "code",
     "value": "@Component       vs @Bean\n@Component       vs @Service/@Repository\n@Controller      vs @RestController\n@Autowired       vs Constructor Injection\n@Primary         vs @Qualifier\n@Value           vs @ConfigurationProperties\n@ExceptionHandler vs @ControllerAdvice\n@RequestParam    vs @PathVariable\nJPA              vs Hibernate\nJPA              vs Spring Data JPA\nCrudRepository   vs JpaRepository\nLAZY             vs EAGER\nEntity           vs DTO\nFilter           vs Interceptor\nFilter           vs AOP\nREQUIRED         vs REQUIRES_NEW\nSpring           vs Spring Boot\nSpring MVC       vs Spring Boot\nMVC              vs WebFlux\nRestClient       vs WebClient\nSession          vs JWT\nCORS             vs CSRF\nUnit Test        vs SpringBootTest\nWebMvcTest       vs SpringBootTest\n@Cacheable       vs @CachePut\nCache            vs Database\nAuthentication   vs Authorization",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "These are exactly the kind of "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "“but if this already does it, why was the other one created?”"
        }
       ]
      },
      {
       "type": "text",
       "value": " questions that test whether you understand Spring Boot rather than just memorizing annotations."
      }
     ]
    }
   ]
  }
 ]
};
