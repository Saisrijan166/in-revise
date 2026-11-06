// AUTO-GENERATED from reference/design-patterns.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs design-patterns
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const designPatternsCheatsheet: CheatDoc = {
 "title": "Design Patterns",
 "tagline": "The classic patterns on one page — the problem, the idea and when to use each.",
 "chapters": [
  {
   "id": "foundations",
   "title": "Foundations"
  },
  {
   "id": "creational-patterns",
   "title": "Creational Patterns"
  },
  {
   "id": "structural-patterns",
   "title": "Structural Patterns"
  },
  {
   "id": "behavioral-patterns",
   "title": "Behavioral Patterns"
  },
  {
   "id": "patterns-you-ll-also-hear-in-interviews",
   "title": "Patterns You'll Also Hear in Interviews"
  },
  {
   "id": "how-to-choose-a-pattern",
   "title": "How to Choose a Pattern"
  },
  {
   "id": "why-x-vs-y-common-confusions",
   "title": "Why X vs Y (Common Confusions)"
  }
 ],
 "sections": [
  {
   "id": "s-foundations",
   "num": null,
   "title": "Foundations",
   "stars": 0,
   "chapter": "foundations",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "All examples use one scenario: a customer pays with UPI, a card, or a wallet."
      }
     ]
    }
   ]
  },
  {
   "id": "s-what-a-design-pattern-is",
   "num": null,
   "title": "What a design pattern is",
   "stars": 1,
   "chapter": "foundations",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A design pattern is a reusable solution to a recurring software design problem. It is a tool, not a rule — use one only when it solves a real problem."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Three families:"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Creational"
            }
           ]
          },
          {
           "type": "text",
           "value": " — control how objects are created (Singleton, Factory Method, Abstract Factory, Builder, Prototype)."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Structural"
            }
           ]
          },
          {
           "type": "text",
           "value": " — organize classes and objects (Adapter, Decorator, Facade, Proxy, Composite, Bridge, Flyweight)."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Behavioral"
            }
           ]
          },
          {
           "type": "text",
           "value": " — organize communication and responsibilities (Strategy, Observer, Command, Template Method, State, Chain of Responsibility, Iterator, Mediator)."
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
       "value": "When explaining any pattern, cover four points: the problem, the idea, how the payment example uses it, and where it fits in real apps."
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
         "value": "Remember: Patterns are tools that solve design problems, not boxes to tick."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-solid-principles",
   "num": null,
   "title": "SOLID principles",
   "stars": 2,
   "chapter": "foundations",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Five principles for maintainable object-oriented code."
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
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
           "value": "Principle"
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
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Payment example"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "S"
            }
           ]
          },
          {
           "type": "text",
           "value": " — Single Responsibility"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "One coherent responsibility, one reason to change"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Payment processing separate from receipt generation"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "O"
            }
           ]
          },
          {
           "type": "text",
           "value": " — Open/Closed"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Open to extension, closed to modification"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Add a new payment strategy without rewriting the service"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "L"
            }
           ]
          },
          {
           "type": "text",
           "value": " — Liskov Substitution"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "A subtype works wherever its base type is expected"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Every "
          },
          {
           "type": "inlineCode",
           "value": "PaymentStrategy"
          },
          {
           "type": "text",
           "value": " honours the payment contract"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "I"
            }
           ]
          },
          {
           "type": "text",
           "value": " — Interface Segregation"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Small focused interfaces over large ones"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Split a huge gateway interface into smaller capabilities"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "D"
            }
           ]
          },
          {
           "type": "text",
           "value": " — Dependency Inversion"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "High-level logic depends on abstractions, not details"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "PaymentService"
          },
          {
           "type": "text",
           "value": " depends on "
          },
          {
           "type": "inlineCode",
           "value": "PaymentStrategy"
          },
          {
           "type": "text",
           "value": ", not "
          },
          {
           "type": "inlineCode",
           "value": "UpiPayment"
          }
         ]
        }
       ]
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
         "value": "Remember: Dependency Inversion (a principle) is not Dependency Injection (one technique to achieve it)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-composition-coupling-and-cohesion",
   "num": null,
   "title": "Composition, coupling, and cohesion",
   "stars": 1,
   "chapter": "foundations",
   "nodes": [
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Composition"
            }
           ]
          },
          {
           "type": "text",
           "value": " — build behaviour by combining objects ("
          },
          {
           "type": "inlineCode",
           "value": "has-a"
          },
          {
           "type": "text",
           "value": "). "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Inheritance"
            }
           ]
          },
          {
           "type": "text",
           "value": " — derive one class from another ("
          },
          {
           "type": "inlineCode",
           "value": "is-a"
          },
          {
           "type": "text",
           "value": "). Prefer composition: it is more flexible and avoids rigid hierarchies."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Loose coupling"
            }
           ]
          },
          {
           "type": "text",
           "value": " — classes depend less on each other's concrete details. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "High cohesion"
            }
           ]
          },
          {
           "type": "text",
           "value": " — a class focuses on closely related work."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Programming to an interface"
            }
           ]
          },
          {
           "type": "text",
           "value": " — depend on a contract, not a specific implementation."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Overengineering"
            }
           ]
          },
          {
           "type": "text",
           "value": " — adding abstractions the problem does not justify. Avoid it."
          }
         ]
        }
       ]
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
         "value": "Remember: Composition over inheritance; program to interfaces; don't abstract what isn't varying."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-singleton",
   "num": null,
   "title": "Singleton",
   "stars": 0,
   "chapter": "creational-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Problem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " sometimes you genuinely need one shared instance (a config holder, a registry, a resource manager).\n"
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " ensure a class has one instance within a defined scope."
      }
     ]
    },
    {
     "type": "code",
     "value": "@Component\npublic class PaymentService {\n    // One instance per Spring ApplicationContext\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring beans are singleton-scoped by default, so you rarely implement the classic pattern yourself. Thread safety matters only if you build it manually. Overuse creates global shared state that hurts testing and concurrency."
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
         "value": "Remember: \"Singleton\" means one per context, not one across a whole distributed system — each app instance has its own."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-factory-factory-method-abstract-factory",
   "num": null,
   "title": "Factory (Factory Method & Abstract Factory)",
   "stars": 2,
   "chapter": "creational-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Problem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " object-creation decisions clutter business logic.\n"
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " centralize the creation or selection of objects."
      }
     ]
    },
    {
     "type": "code",
     "value": "class PaymentFactory {\n    static PaymentStrategy create(String method) {\n        return switch (method) {\n            case \"UPI\"  -> new UpiPayment();\n            case \"CARD\" -> new CardPayment();\n            default -> throw new IllegalArgumentException(\"Unsupported method\");\n        };\n    }\n}\n// PaymentStrategy p = PaymentFactory.create(\"UPI\");",
     "lang": "java"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Simple Factory"
            }
           ]
          },
          {
           "type": "text",
           "value": " — a method that selects and returns an object (common, but not a named GoF pattern)."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Factory Method"
            }
           ]
          },
          {
           "type": "text",
           "value": " — subclasses or overriding methods decide which product is created."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Abstract Factory"
            }
           ]
          },
          {
           "type": "text",
           "value": " — creates families of related objects (e.g. matching provider-specific payment and refund clients)."
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
       "value": "Spring DI often replaces manual factories; a factory still helps when selection depends on runtime input. Watch out: factories can grow into big conditionals."
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
         "value": "Remember: Factory decides "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "which object"
          }
         ]
        },
        {
         "type": "text",
         "value": " to create and hides the "
        },
        {
         "type": "inlineCode",
         "value": "new"
        },
        {
         "type": "text",
         "value": " from business logic."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-builder",
   "num": null,
   "title": "Builder",
   "stars": 0,
   "chapter": "creational-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Problem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " constructors with many optional parameters are confusing.\n"
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " build an object step by step."
      }
     ]
    },
    {
     "type": "code",
     "value": "PaymentRequest request = PaymentRequest.builder()\n        .amount(500)\n        .currency(\"INR\")\n        .method(\"UPI\")\n        .build();",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Good for request/config objects, complex domain objects, immutable DTOs (often via Lombok). Overkill for simple objects. It improves readability but does not by itself validate the object or make it immutable."
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
         "value": "Remember: Builder = readable construction when there are many optional fields."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-prototype",
   "num": null,
   "title": "Prototype",
   "stars": 0,
   "chapter": "creational-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Problem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " creating a fresh object from scratch is costly or repetitive.\n"
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " create new objects by copying an existing instance (e.g. cloning a reusable configuration template)."
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
         "value": "Remember: Prototype clones an existing object instead of building a new one."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-adapter",
   "num": null,
   "title": "Adapter",
   "stars": 1,
   "chapter": "structural-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Problem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " an external component has an interface your code does not expect.\n"
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " translate one interface into the one your code wants, so provider-specific APIs don't spread through the codebase."
      }
     ]
    },
    {
     "type": "code",
     "value": "class UpiAdapter implements PaymentGateway {        // what your app expects\n    private final ExternalUpiSdk sdk;               // what the provider offers\n    UpiAdapter(ExternalUpiSdk sdk) { this.sdk = sdk; }\n\n    public void charge(double amount) {\n        int paise = (int) Math.round(amount * 100);\n        sdk.makePaymentInPaise(paise);\n    }\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Used for third-party gateways, legacy systems, external SDKs. (Real money conversions should use "
      },
      {
       "type": "inlineCode",
       "value": "BigDecimal"
      },
      {
       "type": "text",
       "value": " or integer minor units.)"
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
         "value": "Remember: Adapter "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "changes the interface"
          }
         ]
        },
        {
         "type": "text",
         "value": " so an incompatible component fits."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-decorator",
   "num": null,
   "title": "Decorator",
   "stars": 1,
   "chapter": "structural-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Problem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " you want optional extra behaviour without a subclass explosion.\n"
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " wrap an object to add behaviour while keeping the same interface."
      }
     ]
    },
    {
     "type": "code",
     "value": "class LoggingPayment implements Payment {\n    private final Payment payment;\n    LoggingPayment(Payment payment) { this.payment = payment; }\n\n    public void pay(double amount) {\n        System.out.println(\"Payment started\");\n        payment.pay(amount);\n    }\n}\n// Payment p = new LoggingPayment(new BasicPayment());",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Used for logging, metrics, caching, compression, stream processing. Java I/O streams wrap other streams. Many wrappers can make the flow hard to follow."
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
         "value": "Remember: Decorator adds behaviour by composition, keeping the same interface."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-facade",
   "num": null,
   "title": "Facade",
   "stars": 0,
   "chapter": "structural-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Problem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " a subsystem is complex to call directly.\n"
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " provide one simpler interface over it. Example: a "
      },
      {
       "type": "inlineCode",
       "value": "PaymentFacade"
      },
      {
       "type": "text",
       "value": " coordinates validation, charging, and receipt handling behind a single call."
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
         "value": "Remember: Facade simplifies access to a whole subsystem."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-proxy",
   "num": null,
   "title": "Proxy",
   "stars": 1,
   "chapter": "structural-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Problem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " you need access control, lazy loading, remote access, or interception — without changing the caller.\n"
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " put an intermediary in front of the real object, same interface."
      }
     ]
    },
    {
     "type": "code",
     "value": "class PaymentProxy implements Payment {\n    private final Payment target;\n    PaymentProxy(Payment target) { this.target = target; }\n\n    public void pay(double amount) {\n        System.out.println(\"Checking authorization\");\n        target.pay(amount);\n    }\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Spring AOP and "
      },
      {
       "type": "inlineCode",
       "value": "@Transactional"
      },
      {
       "type": "text",
       "value": " work through proxy-based interception. Trap: self-invocation can bypass the proxy, so "
      },
      {
       "type": "inlineCode",
       "value": "@Transactional"
      },
      {
       "type": "text",
       "value": " may not apply. Hidden behaviour can make debugging harder."
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
         "value": "Remember: Proxy "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "controls access"
          }
         ]
        },
        {
         "type": "text",
         "value": " to an object; Decorator "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "adds responsibilities"
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
    }
   ]
  },
  {
   "id": "s-composite",
   "num": null,
   "title": "Composite",
   "stars": 0,
   "chapter": "structural-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " treat a single object and a group of objects the same way through one interface (a tree of parts and wholes)."
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
         "value": "Remember: Composite lets clients treat one item and a group of items uniformly."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-bridge",
   "num": null,
   "title": "Bridge",
   "stars": 0,
   "chapter": "structural-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Problem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " two dimensions vary independently and multiplying them into subclasses explodes.\n"
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " separate the two dimensions so each evolves on its own — e.g. separate payment-processing logic from provider implementations."
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
         "value": "Remember: Bridge splits an abstraction from its implementation so both vary freely."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-flyweight",
   "num": null,
   "title": "Flyweight",
   "stars": 0,
   "chapter": "structural-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " share reusable immutable state to save memory — e.g. share currency metadata across many payment objects."
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
         "value": "Remember: Flyweight shares common state across many objects."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-strategy",
   "num": null,
   "title": "Strategy",
   "stars": 3,
   "chapter": "behavioral-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Problem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " a growing "
      },
      {
       "type": "inlineCode",
       "value": "if-else"
      },
      {
       "type": "text",
       "value": "/"
      },
      {
       "type": "inlineCode",
       "value": "switch"
      },
      {
       "type": "text",
       "value": " picks between alternative behaviours.\n"
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " define a family of interchangeable algorithms behind one interface and inject the chosen one."
      }
     ]
    },
    {
     "type": "code",
     "value": "interface PaymentStrategy { void pay(double amount); }\n\nclass UpiPayment implements PaymentStrategy {\n    public void pay(double amount) { System.out.println(\"UPI: \" + amount); }\n}\n\nclass PaymentService {\n    private final PaymentStrategy strategy;\n    PaymentService(PaymentStrategy strategy) { this.strategy = strategy; }\n    void pay(double amount) { strategy.pay(amount); }\n}\n// new PaymentService(new UpiPayment()).pay(500);",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Used for payment methods, discounts, pricing, auth, shipping. New behaviour needs no change to the selecting code. Overkill when cases are few and stable."
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
         "value": "Remember: Strategy swaps interchangeable behaviour by injecting a different implementation."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-observer",
   "num": null,
   "title": "Observer",
   "stars": 1,
   "chapter": "behavioral-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Problem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " many components must react when something happens, without tight coupling.\n"
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " a publisher notifies subscribed observers on an event."
      }
     ]
    },
    {
     "type": "code",
     "value": "class PaymentPublisher {\n    private final List<PaymentObserver> observers = new ArrayList<>();\n    void subscribe(PaymentObserver o) { observers.add(o); }\n    void paymentSucceeded(String id) {\n        for (PaymentObserver o : observers) o.onPaymentSuccess(id);\n    }\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "After a payment succeeds, a "
      },
      {
       "type": "inlineCode",
       "value": "ReceiptService"
      },
      {
       "type": "text",
       "value": " observer can generate a receipt. This is in-process; across microservices use a message broker instead. Handle delivery order, errors, duplicates, and subscriber lifecycle."
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
         "value": "Remember: Observer decouples the publisher from the subscribers that react to its events."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-command",
   "num": null,
   "title": "Command",
   "stars": 0,
   "chapter": "behavioral-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Problem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " you want to separate "
      },
      {
       "type": "emphasis",
       "children": [
        {
         "type": "text",
         "value": "requesting"
        }
       ]
      },
      {
       "type": "text",
       "value": " an action from "
      },
      {
       "type": "emphasis",
       "children": [
        {
         "type": "text",
         "value": "performing"
        }
       ]
      },
      {
       "type": "text",
       "value": " it.\n"
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " wrap an action as an object that can be queued, logged, or retried."
      }
     ]
    },
    {
     "type": "code",
     "value": "class RefundCommand implements PaymentCommand {\n    private final RefundService service;\n    private final String paymentId;\n    RefundCommand(RefundService s, String id) { this.service = s; this.paymentId = id; }\n    public void execute() { service.refund(paymentId); }\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "An "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "invoker"
        }
       ]
      },
      {
       "type": "text",
       "value": " triggers it; a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "receiver"
        }
       ]
      },
      {
       "type": "text",
       "value": " does the work. Used for job queues, undo/redo, scheduled tasks. One class per command adds overhead for trivial actions."
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
         "value": "Remember: Command turns a request into an object you can dispatch, queue, or retry."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-template-method",
   "num": null,
   "title": "Template Method",
   "stars": 0,
   "chapter": "behavioral-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Problem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " several implementations repeat the same algorithm structure.\n"
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " fix the overall algorithm in a base class; let subclasses override specific steps."
      }
     ]
    },
    {
     "type": "code",
     "value": "abstract class PaymentProcessor {\n    public final void process(double amount) {\n        validate(amount);\n        executePayment(amount);\n        recordResult();\n    }\n    protected abstract void executePayment(double amount);\n    protected void validate(double amount) {\n        if (amount <= 0) throw new IllegalArgumentException();\n    }\n    protected void recordResult() { System.out.println(\"Result recorded\"); }\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Used for framework lifecycles, batch flows, fixed-step workflows. Inheritance can create tight coupling."
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
         "value": "Remember: Template Method keeps the flow fixed and lets subclasses fill in steps (via inheritance)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-state",
   "num": null,
   "title": "State",
   "stars": 0,
   "chapter": "behavioral-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Problem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " behaviour depends on current state, scattering state checks across methods.\n"
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " organize state-dependent behaviour behind state objects, and reject invalid transitions."
      }
     ]
    },
    {
     "type": "code",
     "value": "CREATED -> PENDING -> SUCCESS\n                   -> FAILED\nSUCCESS -> REFUND_PENDING -> REFUNDED",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The app should reject invalid transitions, such as refunding a payment that never succeeded. Separate state classes can be excessive for a tiny state machine."
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
         "value": "Remember: A plain enum of states is not the State pattern — the pattern puts state-dependent "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "behaviour"
          }
         ]
        },
        {
         "type": "text",
         "value": " behind state objects."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-chain-of-responsibility",
   "num": null,
   "title": "Chain of Responsibility",
   "stars": 0,
   "chapter": "behavioral-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Problem:"
        }
       ]
      },
      {
       "type": "text",
       "value": " a series of checks becomes one huge conditional.\n"
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " pass a request through a sequence of handlers; each handles one responsibility and may stop or forward it."
      }
     ]
    },
    {
     "type": "code",
     "value": "Payment Request -> Authentication -> Permission -> Amount Validation -> Fraud Check -> Processing",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Mirrors servlet filters and Spring Security filter chains. Unclear order or termination can mishandle a request."
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
         "value": "Remember: Chain of Responsibility runs ordered handlers, each doing one check and passing along."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-iterator",
   "num": null,
   "title": "Iterator",
   "stars": 0,
   "chapter": "behavioral-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " traverse a collection without exposing its internal structure. Java's "
      },
      {
       "type": "inlineCode",
       "value": "Iterator"
      },
      {
       "type": "text",
       "value": " is the familiar example."
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
         "value": "Remember: Iterator walks a collection without revealing how it's stored."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-mediator",
   "num": null,
   "title": "Mediator",
   "stars": 0,
   "chapter": "behavioral-patterns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Idea:"
        }
       ]
      },
      {
       "type": "text",
       "value": " centralize communication among components so they don't call each other directly — e.g. a workflow coordinator. (Memento, by contrast, captures state so it can be restored, like restoring a draft payment form.)"
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
         "value": "Remember: Mediator routes communication through one coordinator instead of many direct links."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-patterns-you-ll-also-hear-in-interviews",
   "num": null,
   "title": "Patterns You'll Also Hear in Interviews",
   "stars": 0,
   "chapter": "patterns-you-ll-also-hear-in-interviews",
   "nodes": [
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Dependency Injection"
            }
           ]
          },
          {
           "type": "text",
           "value": " — supply a class's dependencies from outside. Styles: "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "constructor"
            }
           ]
          },
          {
           "type": "text",
           "value": " (preferred in Spring for required deps), "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "setter"
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
             "value": "field"
            }
           ]
          },
          {
           "type": "text",
           "value": " (reflection-based). Backed by "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "IoC"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the container controls object creation and lifecycle. Benefit: easy mocking in tests, clear dependencies, loose coupling."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "@Service\npublic class PaymentService {\n    private final PaymentRepository repository;\n    public PaymentService(PaymentRepository repository) { this.repository = repository; }\n}",
     "lang": "java"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Repository"
            }
           ]
          },
          {
           "type": "text",
           "value": " — a domain-oriented abstraction over persistence, keeping SQL out of business logic (e.g. "
          },
          {
           "type": "inlineCode",
           "value": "PaymentRepository extends JpaRepository<PaymentEntity, Long>"
          },
          {
           "type": "text",
           "value": "). Widely used, but "
          },
          {
           "type": "emphasis",
           "children": [
            {
             "type": "text",
             "value": "not"
            }
           ]
          },
          {
           "type": "text",
           "value": " one of the original GoF 23 patterns."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Visitor"
            }
           ]
          },
          {
           "type": "text",
           "value": " — add operations across a set of object types without changing those types."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Interpreter"
            }
           ]
          },
          {
           "type": "text",
           "value": " — represent and evaluate a small language or set of rules."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Memento"
            }
           ]
          },
          {
           "type": "text",
           "value": " — capture state for later restoration."
          }
         ]
        }
       ]
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
         "value": "Remember: DI and Repository dominate Spring interviews; both are more about principle/architecture than classic GoF structure."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-how-to-choose-a-pattern",
   "num": null,
   "title": "How to Choose a Pattern",
   "stars": 0,
   "chapter": "how-to-choose-a-pattern",
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
           "value": "Situation"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Pattern"
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
           "value": "Many payment methods with different algorithms"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Strategy"
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
           "value": "Choose and instantiate the right implementation"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Factory"
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
           "value": "Object has many optional fields"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Builder"
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
           "value": "Third-party provider has a different interface"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Adapter"
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
           "value": "Add logging/metrics/optional behaviour around an object"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Decorator"
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
           "value": "Intercept access, authorization, or method calls"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Proxy"
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
           "value": "Notify multiple consumers after a payment"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Observer / Pub-Sub"
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
           "value": "Represent a refund as a queued task"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Command"
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
           "value": "Same sequence, but customize one step"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Template Method"
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
           "value": "Run auth, validation, fraud checks in order"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Chain of Responsibility"
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
           "value": "Enforce behaviour by lifecycle state"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "State"
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
           "value": "Keep database access out of business logic"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Repository"
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
           "value": "Share dependencies cleanly"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Dependency Injection"
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
       "value": "20-second Strategy answer: \"A payment service supports UPI, card, and wallet. A big if-else means every new method edits that block. With Strategy, each method implements a common interface and the service uses the selected one — better extensibility, testability, and loose coupling.\""
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
         "value": "Remember: Name the problem first, then the pattern — interviewers want the \"why\", not the label."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-why-x-vs-y-common-confusions",
   "num": null,
   "title": "Why X vs Y (Common Confusions)",
   "stars": 0,
   "chapter": "why-x-vs-y-common-confusions",
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
           "value": "Pair"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Difference"
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
           "value": "Factory vs Strategy"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Factory creates/selects objects; Strategy supplies interchangeable behaviour (they combine: factory picks a strategy)"
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
           "value": "Strategy vs State"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Strategy chooses an algorithm; State changes behaviour based on current state"
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
           "value": "Adapter vs Decorator"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Adapter changes the interface; Decorator adds behaviour, keeping the interface"
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
           "value": "Decorator vs Proxy"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Decorator adds responsibilities; Proxy controls access"
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
           "value": "Proxy vs Facade"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Proxy is an intermediary for one object; Facade simplifies a whole subsystem"
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
           "value": "Adapter vs Facade"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Adapter fits one incompatible interface; Facade hides a complex subsystem behind a simple one"
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
           "value": "Template Method vs Strategy"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Inheritance-based step customization vs composition-based delegation"
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
           "value": "Command vs Strategy"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Represents an action to dispatch vs an interchangeable algorithm"
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
           "value": "Observer vs Pub/Sub"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Observer = direct in-process subscriptions; Pub/Sub = decoupled via a messaging mechanism"
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
           "value": "Inheritance vs Composition"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "is-a"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "has-a"
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
           "value": "Interface vs Abstract Class"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Interface = contract only; abstract class can also share state and implementation"
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
           "value": "DI vs Factory"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "DI supplies dependencies; Factory decides how to create/select objects"
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
           "value": "Singleton vs Static"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Singleton = instance with a controlled lifecycle; static members belong to the class"
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
           "value": "Repository vs DAO"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Both abstract persistence; Repository is domain-oriented, DAO focuses on data-access operations"
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
           "value": "Pattern vs Principle"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "A pattern is a reusable solution; a principle is a general guideline for good design"
          }
         ]
        }
       ]
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
         "value": "Remember: Most \"vs\" answers reduce to one word each — Factory "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "creates"
          }
         ]
        },
        {
         "type": "text",
         "value": ", Strategy "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "behaves"
          }
         ]
        },
        {
         "type": "text",
         "value": ", State "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "transitions"
          }
         ]
        },
        {
         "type": "text",
         "value": ", Proxy "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "controls"
          }
         ]
        },
        {
         "type": "text",
         "value": ", Decorator "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "adds"
          }
         ]
        },
        {
         "type": "text",
         "value": ", Adapter "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "translates"
          }
         ]
        },
        {
         "type": "text",
         "value": ", Facade "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "simplifies"
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
    }
   ]
  }
 ]
};
