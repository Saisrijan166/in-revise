// AUTO-GENERATED from reference/rest-api.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs rest-api
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const restApiCheatsheet: CheatDoc = {
 "title": "REST API",
 "tagline": "The whole topic on one page — methods, design and the rules to remember.",
 "chapters": [
  {
   "id": "fundamentals",
   "title": "Fundamentals"
  },
  {
   "id": "http-methods",
   "title": "HTTP Methods"
  },
  {
   "id": "http-status-codes",
   "title": "HTTP Status Codes"
  },
  {
   "id": "request-and-response",
   "title": "Request and Response"
  },
  {
   "id": "design-and-conventions",
   "title": "Design and Conventions"
  },
  {
   "id": "auth-and-security",
   "title": "Auth and Security"
  },
  {
   "id": "reliability",
   "title": "Reliability"
  },
  {
   "id": "rest-in-spring-boot",
   "title": "REST in Spring Boot"
  },
  {
   "id": "testing-and-documentation",
   "title": "Testing and Documentation"
  },
  {
   "id": "common-why-x-vs-y-comparisons",
   "title": "Common \"Why X vs Y?\" Comparisons"
  }
 ],
 "sections": [
  {
   "id": "s-what-rest-is",
   "num": null,
   "title": "What REST Is",
   "stars": 1,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "REST is an architectural style for building APIs around "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "resources"
        }
       ]
      },
      {
       "type": "text",
       "value": " (things like a payment, user, or order), usually accessed over HTTP."
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
             "value": "API"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a way for two software systems to communicate."
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
             "value": "REST API"
            }
           ]
          },
          {
           "type": "text",
           "value": ": an API that follows REST principles — resource-based URLs and stateless requests."
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
             "value": "REST vs REST API"
            }
           ]
          },
          {
           "type": "text",
           "value": ": REST is the style; a REST API is an implementation of it."
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
             "value": "Client"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the app sending a request (e.g. a frontend). "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Server"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the app receiving and processing it."
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
             "value": "Resource"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the thing the API manages. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Endpoint"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a URL + HTTP method that performs an operation."
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
           "value": "Data is usually exchanged as "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "JSON"
            }
           ]
          },
          {
           "type": "text",
           "value": " over "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "HTTP"
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
     "type": "code",
     "value": "POST /api/payments\nContent-Type: application/json\n\n{ \"amount\": 500, \"currency\": \"INR\", \"method\": \"UPI\" }",
     "lang": "bash"
    },
    {
     "type": "code",
     "value": "{ \"paymentId\": \"PAY101\", \"status\": \"PENDING\" }",
     "lang": "json"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: A resource is a noun; the HTTP method is the verb acting on it."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-statelessness",
   "num": null,
   "title": "Statelessness",
   "stars": 1,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Every request carries all the information needed to process it. The server does "
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
       "value": " rely on conversational session state stored from earlier requests."
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
           "value": "Each request stands alone — any server instance can handle it."
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
           "value": "Makes APIs easy to scale horizontally."
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
         "value": "Remember: Stateless means \"no memory of previous requests on the server\", not \"no database\"."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-synchronous-vs-asynchronous",
   "num": null,
   "title": "Synchronous vs Asynchronous",
   "stars": 0,
   "chapter": "fundamentals",
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
             "value": "Synchronous"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the client waits for the response."
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
             "value": "Asynchronous processing"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the server accepts the request and finishes the work later, returning a status or job ID (often "
          },
          {
           "type": "inlineCode",
           "value": "202 Accepted"
          },
          {
           "type": "text",
           "value": ")."
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
   "id": "s-the-methods",
   "num": null,
   "title": "The Methods",
   "stars": 2,
   "chapter": "http-methods",
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
           "value": "Method"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Purpose"
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
           "value": "GET"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Read a resource; must not change its state"
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
           "value": "POST"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Create a resource or trigger an operation"
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
           "value": "PUT"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Replace a resource's representation (full)"
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
           "value": "PATCH"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Partially update a resource"
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
           "value": "DELETE"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Delete a resource"
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
           "value": "HEAD"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Like GET, but returns headers with no body"
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
           "value": "OPTIONS"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Describe supported options; used in CORS preflight"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "GET    /api/payments/PAY101\nPOST   /api/payments\nPUT    /api/payments/PAY101\nPATCH  /api/payments/PAY101\nDELETE /api/payments/PAY101",
     "lang": "bash"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: PUT replaces the whole resource; PATCH changes part of it."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-safe-and-idempotent",
   "num": null,
   "title": "Safe and Idempotent",
   "stars": 2,
   "chapter": "http-methods",
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
             "value": "Safe"
            }
           ]
          },
          {
           "type": "text",
           "value": ": reads without changing server state → GET, HEAD, OPTIONS."
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
             "value": "Idempotent"
            }
           ]
          },
          {
           "type": "text",
           "value": ": repeating the request has the same intended effect as doing it once → GET, HEAD, PUT, DELETE, OPTIONS."
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
             "value": "POST is not idempotent"
            }
           ]
          },
          {
           "type": "text",
           "value": ": repeating a payment POST could create duplicate payments unless the app prevents it."
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
           "value": "DELETE is idempotent even though repeated responses may differ (second call may return 404)."
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
         "value": "Remember: No HTTP method automatically guarantees validation, authorization, or a DB transaction — you add those."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-the-classes",
   "num": null,
   "title": "The Classes",
   "stars": 2,
   "chapter": "http-status-codes",
   "nodes": [
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
           "value": "Class"
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
           "value": "Common codes"
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
           "value": "2xx"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Success"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "200, 201, 202, 204"
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
           "value": "3xx"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Redirection / caching"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "301, 302, 304"
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
           "value": "4xx"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Client error"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "400, 401, 403, 404, 405, 409, 415, 422, 429"
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
           "value": "5xx"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Server error"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "500, 502, 503, 504"
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
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Key codes:"
        }
       ]
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
             "value": "200 OK"
            }
           ]
          },
          {
           "type": "text",
           "value": " — succeeded. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "201 Created"
            }
           ]
          },
          {
           "type": "text",
           "value": " — resource created. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "202 Accepted"
            }
           ]
          },
          {
           "type": "text",
           "value": " — accepted for async processing. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "204 No Content"
            }
           ]
          },
          {
           "type": "text",
           "value": " — succeeded, no body."
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
             "value": "304 Not Modified"
            }
           ]
          },
          {
           "type": "text",
           "value": " — cached copy can be reused."
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
             "value": "400 Bad Request"
            }
           ]
          },
          {
           "type": "text",
           "value": " — invalid syntax/input. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "401 Unauthorized"
            }
           ]
          },
          {
           "type": "text",
           "value": " — authentication missing/invalid. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "403 Forbidden"
            }
           ]
          },
          {
           "type": "text",
           "value": " — authenticated but not permitted. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "404 Not Found"
            }
           ]
          },
          {
           "type": "text",
           "value": ". "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "405 Method Not Allowed"
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
             "value": "409 Conflict"
            }
           ]
          },
          {
           "type": "text",
           "value": " — conflicts with current state (e.g. incompatible duplicate). "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "415 Unsupported Media Type"
            }
           ]
          },
          {
           "type": "text",
           "value": ". "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "422 Unprocessable Content"
            }
           ]
          },
          {
           "type": "text",
           "value": " — understood but fails semantic validation. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "429 Too Many Requests"
            }
           ]
          },
          {
           "type": "text",
           "value": " — rate limit exceeded."
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
             "value": "500 Internal Server Error"
            }
           ]
          },
          {
           "type": "text",
           "value": ". "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "502 Bad Gateway"
            }
           ]
          },
          {
           "type": "text",
           "value": " — bad response from upstream. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "503 Service Unavailable"
            }
           ]
          },
          {
           "type": "text",
           "value": " — overloaded. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "504 Gateway Timeout"
            }
           ]
          },
          {
           "type": "text",
           "value": " — no timely upstream response."
          }
         ]
        }
       ]
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
           "value": "Scenario"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Status"
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
           "value": "Payment created"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "201"
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
           "value": "Invalid amount"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "400 or 422"
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
           "value": "Payment does not exist"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "404"
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
           "value": "Duplicate conflicts with state"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "409"
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
           "value": "Rate limit exceeded"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "429"
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
           "value": "Unexpected backend failure"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "500"
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
           "value": "Accepted for async processing"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "202"
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
         "value": "Remember: A failed payment is not automatically a 500 — the HTTP status describes the API request; the payment status describes the business outcome."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-headers",
   "num": null,
   "title": "Headers",
   "stars": 1,
   "chapter": "request-and-response",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Metadata sent with a request or response."
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
             "value": "Content-Type"
            }
           ]
          },
          {
           "type": "text",
           "value": ": format of the body being sent."
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
             "value": "Accept"
            }
           ]
          },
          {
           "type": "text",
           "value": ": formats the client can accept back (content negotiation)."
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
             "value": "Authorization"
            }
           ]
          },
          {
           "type": "text",
           "value": ": credentials, often a bearer token."
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
             "value": "Cache-Control"
            }
           ]
          },
          {
           "type": "text",
           "value": ": caching behaviour."
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
             "value": "Location"
            }
           ]
          },
          {
           "type": "text",
           "value": ": identifies a newly created resource after a 201."
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
             "value": "Cookie"
            }
           ]
          },
          {
           "type": "text",
           "value": ": browser-managed state sent to a server."
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
             "value": "Request ID / Correlation ID"
            }
           ]
          },
          {
           "type": "text",
           "value": ": traces a request across services."
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
   "id": "s-parameters-and-body",
   "num": null,
   "title": "Parameters and Body",
   "stars": 0,
   "chapter": "request-and-response",
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
             "value": "Path parameter"
            }
           ]
          },
          {
           "type": "text",
           "value": ": identifies a specific resource ("
          },
          {
           "type": "inlineCode",
           "value": "/payments/PAY101"
          },
          {
           "type": "text",
           "value": ")."
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
             "value": "Query parameter"
            }
           ]
          },
          {
           "type": "text",
           "value": ": filters or options ("
          },
          {
           "type": "inlineCode",
           "value": "?includeRefunds=true"
          },
          {
           "type": "text",
           "value": ")."
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
             "value": "Request body"
            }
           ]
          },
          {
           "type": "text",
           "value": ": data sent by the client, usually in POST, PUT, PATCH."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "GET /api/payments/PAY101?includeRefunds=true\nAuthorization: Bearer <token>\nAccept: application/json\nX-Request-ID: req-123",
     "lang": "bash"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Path = which resource; query = how to filter or shape the result."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-uri-naming-rules",
   "num": null,
   "title": "URI Naming Rules",
   "stars": 2,
   "chapter": "design-and-conventions",
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
           "type": "text",
           "value": "Use "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "nouns"
            }
           ]
          },
          {
           "type": "text",
           "value": ", not verbs: "
          },
          {
           "type": "inlineCode",
           "value": "/payments"
          },
          {
           "type": "text",
           "value": ", not "
          },
          {
           "type": "inlineCode",
           "value": "/createPayment"
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
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Let the "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "HTTP method"
            }
           ]
          },
          {
           "type": "text",
           "value": " be the verb: "
          },
          {
           "type": "inlineCode",
           "value": "POST /payments"
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
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Use "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "plural"
            }
           ]
          },
          {
           "type": "text",
           "value": " resource names: "
          },
          {
           "type": "inlineCode",
           "value": "/payments"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "/users"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "/orders"
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
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Use "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "nested resources"
            }
           ]
          },
          {
           "type": "text",
           "value": " carefully: "
          },
          {
           "type": "inlineCode",
           "value": "/users/10/payments"
          },
          {
           "type": "text",
           "value": " for a user's payments."
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
           "value": "Keep naming "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "consistent and predictable"
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
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: The URL names the thing; the method says what you do to it."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-versioning-pagination-filtering",
   "num": null,
   "title": "Versioning, Pagination, Filtering",
   "stars": 0,
   "chapter": "design-and-conventions",
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
             "value": "Versioning"
            }
           ]
          },
          {
           "type": "text",
           "value": ": "
          },
          {
           "type": "inlineCode",
           "value": "/api/v1/payments"
          },
          {
           "type": "text",
           "value": " or a version header; avoid breaking existing clients."
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
             "value": "Pagination"
            }
           ]
          },
          {
           "type": "text",
           "value": ": return large result sets in manageable pages ("
          },
          {
           "type": "inlineCode",
           "value": "page"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "size"
          },
          {
           "type": "text",
           "value": ")."
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
             "value": "Filtering"
            }
           ]
          },
          {
           "type": "text",
           "value": ": "
          },
          {
           "type": "inlineCode",
           "value": "/payments?status=SUCCESS"
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
             "value": "Sorting"
            }
           ]
          },
          {
           "type": "text",
           "value": ": "
          },
          {
           "type": "inlineCode",
           "value": "/payments?sort=createdAt,desc"
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
             "value": "Validation"
            }
           ]
          },
          {
           "type": "text",
           "value": ": reject missing, malformed, or invalid values."
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
             "value": "Error response"
            }
           ]
          },
          {
           "type": "text",
           "value": ": include a stable error code and useful message; never leak stack traces."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "GET /api/v1/payments?status=SUCCESS&page=0&size=20",
     "lang": "bash"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Backward compatibility first — changing an API should not break existing callers."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-hateoas",
   "num": null,
   "title": "HATEOAS",
   "stars": 0,
   "chapter": "design-and-conventions",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Responses include "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "links to related actions"
        }
       ]
      },
      {
       "type": "text",
       "value": " (e.g. next steps for a resource). It is a REST concept but "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "not required"
        }
       ]
      },
      {
       "type": "text",
       "value": " in every practical REST API."
      }
     ]
    }
   ]
  },
  {
   "id": "s-authentication-vs-authorization",
   "num": null,
   "title": "Authentication vs Authorization",
   "stars": 2,
   "chapter": "auth-and-security",
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
             "value": "Authentication"
            }
           ]
          },
          {
           "type": "text",
           "value": ": verifies "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "who"
            }
           ]
          },
          {
           "type": "text",
           "value": " the caller is."
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
             "value": "Authorization"
            }
           ]
          },
          {
           "type": "text",
           "value": ": checks "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "what"
            }
           ]
          },
          {
           "type": "text",
           "value": " the caller is allowed to do."
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
   "id": "s-credentials-and-tokens",
   "num": null,
   "title": "Credentials and Tokens",
   "stars": 1,
   "chapter": "auth-and-security",
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
             "value": "Bearer token"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a credential sent in the "
          },
          {
           "type": "inlineCode",
           "value": "Authorization"
          },
          {
           "type": "text",
           "value": " header."
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
             "value": "JWT"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a token format carrying claims, often used to authenticate requests."
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
             "value": "OAuth 2.0"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a framework for delegated authorization. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "OIDC"
            }
           ]
          },
          {
           "type": "text",
           "value": ": adds an identity layer on top of OAuth 2.0."
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
             "value": "API key"
            }
           ]
          },
          {
           "type": "text",
           "value": ": identifies/authorizes an application; not automatically a user login."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "Authorization: Bearer eyJ...",
     "lang": "bash"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: A signed JWT is "
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
         "value": " encrypted — never put secrets in its readable payload. Validate signature, expiry, issuer, and audience."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-core-protections",
   "num": null,
   "title": "Core Protections",
   "stars": 0,
   "chapter": "auth-and-security",
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
             "value": "TLS/HTTPS"
            }
           ]
          },
          {
           "type": "text",
           "value": ": encrypts data in transit."
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
             "value": "CORS"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a browser mechanism controlling cross-origin requests — "
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
           "value": " a replacement for server-side authorization."
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
             "value": "Input validation"
            }
           ]
          },
          {
           "type": "text",
           "value": ": check data before processing (helps prevent "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "SQL injection"
            }
           ]
          },
          {
           "type": "text",
           "value": ", where untrusted input alters a query)."
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
             "value": "Rate limiting"
            }
           ]
          },
          {
           "type": "text",
           "value": ": restrict request frequency."
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
             "value": "Least privilege"
            }
           ]
          },
          {
           "type": "text",
           "value": ": give users and services only the permissions they need."
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
             "value": "Secret management"
            }
           ]
          },
          {
           "type": "text",
           "value": ": keep API keys/credentials in a server-side secret store, never in frontend code."
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
         "value": "Remember: CORS restricts browsers; it does not authorize anyone. Always check permissions on the server."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-idempotency-keys",
   "num": null,
   "title": "Idempotency Keys",
   "stars": 2,
   "chapter": "reliability",
   "nodes": [
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
         "value": "idempotency key"
        }
       ]
      },
      {
       "type": "text",
       "value": " is a unique client-generated key used to recognize "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "retries"
        }
       ]
      },
      {
       "type": "text",
       "value": " of the same operation."
      }
     ]
    },
    {
     "type": "code",
     "value": "POST /api/payments\nIdempotency-Key: order-789-payment",
     "lang": "bash"
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
           "value": "If the client times out and retries with the same key, the server returns the "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "original result"
            }
           ]
          },
          {
           "type": "text",
           "value": " instead of charging again."
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
             "value": "Deduplication"
            }
           ]
          },
          {
           "type": "text",
           "value": ": recognizing and suppressing repeated operations."
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
             "value": "At-least-once delivery"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a request/message may arrive more than once. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Exactly-once effect"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the system prevents duplicate business effects even if delivery repeats."
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
         "value": "Remember: A timeout does "
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
         "value": " prove failure. The provider may have completed the work even though the response never arrived — check the existing transaction before charging again."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-retries-and-resilience",
   "num": null,
   "title": "Retries and Resilience",
   "stars": 0,
   "chapter": "reliability",
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
             "value": "Retry"
            }
           ]
          },
          {
           "type": "text",
           "value": ": repeat a request after a temporary failure."
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
             "value": "Exponential backoff"
            }
           ]
          },
          {
           "type": "text",
           "value": ": increase the delay between retries."
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
             "value": "Jitter"
            }
           ]
          },
          {
           "type": "text",
           "value": ": add randomness to retry delays to avoid synchronized traffic spikes."
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
             "value": "Timeout"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the maximum time a caller waits for a response."
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
             "value": "Circuit breaker"
            }
           ]
          },
          {
           "type": "text",
           "value": ": temporarily blocks calls to an unhealthy dependency."
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
         "value": "Remember: Backoff + jitter stop retries from stampeding a struggling service."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-caching",
   "num": null,
   "title": "Caching",
   "stars": 0,
   "chapter": "reliability",
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
             "value": "Cache-Control"
            }
           ]
          },
          {
           "type": "text",
           "value": " header defines caching behaviour."
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
           "value": "A validated cache can return "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "304 Not Modified"
            }
           ]
          },
          {
           "type": "text",
           "value": " so the client reuses its copy."
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
   "id": "s-controller-annotations",
   "num": null,
   "title": "Controller Annotations",
   "stars": 1,
   "chapter": "rest-in-spring-boot",
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
           "type": "inlineCode",
           "value": "@RestController"
          },
          {
           "type": "text",
           "value": ": a controller whose returned objects are written to the response body."
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
           "type": "inlineCode",
           "value": "@RequestMapping"
          },
          {
           "type": "text",
           "value": ": base URL / common mapping. "
          },
          {
           "type": "inlineCode",
           "value": "@GetMapping"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "@PostMapping"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "@PutMapping"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "@PatchMapping"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "@DeleteMapping"
          },
          {
           "type": "text",
           "value": " map the methods."
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
           "type": "inlineCode",
           "value": "@PathVariable"
          },
          {
           "type": "text",
           "value": ": reads a value from the URL path. "
          },
          {
           "type": "inlineCode",
           "value": "@RequestParam"
          },
          {
           "type": "text",
           "value": ": reads a query parameter. "
          },
          {
           "type": "inlineCode",
           "value": "@RequestBody"
          },
          {
           "type": "text",
           "value": ": converts JSON into a Java object."
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
           "type": "inlineCode",
           "value": "ResponseEntity"
          },
          {
           "type": "text",
           "value": ": lets you control status, headers, and body."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "@RestController\n@RequestMapping(\"/api/payments\")\npublic class PaymentController {\n\n    @PostMapping\n    public ResponseEntity<PaymentResponse> create(\n            @Valid @RequestBody PaymentRequest request) {\n        PaymentResponse response = new PaymentResponse(\"PAY101\", \"PENDING\");\n        return ResponseEntity.status(HttpStatus.CREATED).body(response);\n    }\n\n    @GetMapping(\"/{id}\")\n    public String getPayment(@PathVariable String id) {\n        return \"Payment: \" + id;\n    }\n}",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-supporting-pieces",
   "num": null,
   "title": "Supporting Pieces",
   "stars": 0,
   "chapter": "rest-in-spring-boot",
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
             "value": "DTO (Data Transfer Object)"
            }
           ]
          },
          {
           "type": "text",
           "value": ": carries data across a boundary without exposing the database entity."
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
             "value": "Bean Validation"
            }
           ]
          },
          {
           "type": "text",
           "value": ": "
          },
          {
           "type": "inlineCode",
           "value": "@NotNull"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "@NotBlank"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "@Positive"
          },
          {
           "type": "text",
           "value": " validate input."
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
           "type": "inlineCode",
           "value": "@ControllerAdvice"
          },
          {
           "type": "text",
           "value": " + "
          },
          {
           "type": "inlineCode",
           "value": "@ExceptionHandler"
          },
          {
           "type": "text",
           "value": ": centralized exception handling."
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
         "value": "Remember: Controllers should stay thin — delegate business logic to a service."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-test-levels",
   "num": null,
   "title": "Test Levels",
   "stars": 0,
   "chapter": "testing-and-documentation",
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
             "value": "Unit test"
            }
           ]
          },
          {
           "type": "text",
           "value": ": one class/method in isolation. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Integration test"
            }
           ]
          },
          {
           "type": "text",
           "value": ": multiple components together."
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
             "value": "Contract test"
            }
           ]
          },
          {
           "type": "text",
           "value": ": provider and consumers agree on request/response contracts."
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
             "value": "Mocking"
            }
           ]
          },
          {
           "type": "text",
           "value": ": replace a dependency with a controlled test double."
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
   "id": "s-tools",
   "num": null,
   "title": "Tools",
   "stars": 0,
   "chapter": "testing-and-documentation",
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
             "value": "Postman"
            }
           ]
          },
          {
           "type": "text",
           "value": ": send API requests and inspect responses."
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
             "value": "Swagger / OpenAPI"
            }
           ]
          },
          {
           "type": "text",
           "value": ": describe endpoints, inputs, outputs, and responses."
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
             "value": "MockMvc"
            }
           ]
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "@WebMvcTest"
          },
          {
           "type": "text",
           "value": ": test Spring MVC controllers without a real HTTP server."
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
           "type": "inlineCode",
           "value": "@SpringBootTest"
          },
          {
           "type": "text",
           "value": ": loads a broader context for integration testing."
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
   "id": "s-observability",
   "num": null,
   "title": "Observability",
   "stars": 0,
   "chapter": "testing-and-documentation",
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
             "value": "Observability"
            }
           ]
          },
          {
           "type": "text",
           "value": ": understand behaviour through logs, metrics, and traces."
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
             "value": "Distributed tracing"
            }
           ]
          },
          {
           "type": "text",
           "value": ": follow a request across services using trace and span IDs (and correlation IDs)."
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
         "value": "Remember: Test the hard cases — validation errors, 401/403, duplicate idempotency keys, and provider timeouts."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-put-vs-patch",
   "num": null,
   "title": "PUT vs PATCH",
   "stars": 1,
   "chapter": "common-why-x-vs-y-comparisons",
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
             "value": "PUT"
            }
           ]
          },
          {
           "type": "text",
           "value": " replaces the whole resource representation; it is generally idempotent."
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
             "value": "PATCH"
            }
           ]
          },
          {
           "type": "text",
           "value": " partially updates a resource; it is not automatically idempotent."
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
         "value": "Remember: Full replacement vs partial update."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-post-vs-put",
   "num": null,
   "title": "POST vs PUT",
   "stars": 1,
   "chapter": "common-why-x-vs-y-comparisons",
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
             "value": "POST"
            }
           ]
          },
          {
           "type": "text",
           "value": " creates a resource or triggers an operation; the server usually assigns the ID; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "not idempotent"
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
             "value": "PUT"
            }
           ]
          },
          {
           "type": "text",
           "value": " replaces a resource at a known URL; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "idempotent"
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
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: POST to create (server decides the ID); PUT to replace at a URL you already know."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-safe-vs-idempotent",
   "num": null,
   "title": "Safe vs Idempotent",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
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
             "value": "Safe"
            }
           ]
          },
          {
           "type": "text",
           "value": ": does not change server state at all (GET, HEAD, OPTIONS)."
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
             "value": "Idempotent"
            }
           ]
          },
          {
           "type": "text",
           "value": ": may change state, but repeating has the same effect as once (adds PUT, DELETE)."
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
         "value": "Remember: Every safe method is idempotent, but not every idempotent method is safe."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-401-vs-403",
   "num": null,
   "title": "401 vs 403",
   "stars": 2,
   "chapter": "common-why-x-vs-y-comparisons",
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
             "value": "401 Unauthorized"
            }
           ]
          },
          {
           "type": "text",
           "value": ": authentication is missing or invalid — the server does not know who you are."
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
             "value": "403 Forbidden"
            }
           ]
          },
          {
           "type": "text",
           "value": ": authenticated, but not permitted to do this."
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
         "value": "Remember: 401 = who are you? 403 = you may not."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-400-vs-422",
   "num": null,
   "title": "400 vs 422",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
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
             "value": "400 Bad Request"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the request syntax/input is malformed."
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
             "value": "422 Unprocessable Content"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the request is well-formed but fails semantic validation."
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
         "value": "Remember: 400 can't be read; 422 can be read but breaks a rule."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-rest-vs-graphql-vs-grpc",
   "num": null,
   "title": "REST vs GraphQL vs gRPC",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
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
           "value": "Aspect"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "REST"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "GraphQL"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "gRPC"
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
           "value": "Model"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Resources over HTTP"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Single endpoint, query shape"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "RPC calls, binary (protobuf)"
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
           "value": "Data shape"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Fixed per endpoint"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Client picks fields"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Defined by service contract"
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
           "value": "Best for"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Standard web APIs"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Flexible, client-driven reads"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Fast internal service-to-service"
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
         "value": "Remember: REST = resources; GraphQL = ask for exactly the fields you want; gRPC = fast typed RPC between services."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-the-payment-timeout-trap",
   "num": null,
   "title": "The Payment Timeout Trap",
   "stars": 2,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The gateway processes a ₹500 payment, but the network times out before your backend gets the response."
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
             "value": "Wrong"
            }
           ]
          },
          {
           "type": "text",
           "value": ": immediately charge the customer again."
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
             "value": "Right"
            }
           ]
          },
          {
           "type": "text",
           "value": ": treat the outcome as "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "unknown"
            }
           ]
          },
          {
           "type": "text",
           "value": ", reconcile with the gateway, and retry safely using the same idempotency identity."
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
         "value": "Remember: For financial correctness use DB transactions, uniqueness constraints, reliable events, and reconciliation — Redis locks alone are not enough."
        }
       ]
      }
     ]
    }
   ]
  }
 ]
};
