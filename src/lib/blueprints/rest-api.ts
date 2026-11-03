import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const restApi: Blueprint = {
  tagline:
    "How one HTTP request becomes a response — methods, resources, status codes, cross-cutting.",
  legend: legendOf([
    "Request / response",
    "HTTP methods",
    "Resources & data",
    "Status codes",
    "Cross-cutting",
  ]),
  alt:
    "A system map of REST APIs. Request and response: a client sends an HTTP request (method, URL, headers, " +
    "body) to the server's router, which calls a handler and returns a response (status and body) to the " +
    "client. HTTP methods: GET (safe), POST, PUT and DELETE (idempotent), PATCH. Resources and data: the " +
    "URL names a resource (a noun), represented as JSON, and versioned like /v1. Status codes: 2xx for " +
    "success, 4xx for client errors, 5xx for server errors. Cross-cutting: requests carry auth tokens (JWT " +
    "or OAuth2), the server applies rate limiting, responses use caching and ETags, and large collections " +
    "are paginated.",
  baseline: "HTTP/1.1 · JSON",
  chart: `flowchart TD
  subgraph REQ["1 . Request and response"]
    direction TB
    cli(["Client"]):::f
    cli -->|HTTP request| req["Method + URL + headers + body"]:::f
    req --> srv["Server: router"]:::f
    srv --> ctrl["Handler / Controller"]:::f
    ctrl --> res(["Response: status + body"]):::f
    res --> cli
  end

  subgraph METH["2 . HTTP methods"]
    direction LR
    get["GET (safe)"]:::c
    post["POST (create)"]:::c
    put["PUT (idempotent)"]:::c
    pat["PATCH"]:::c
    del["DELETE (idempotent)"]:::c
  end
  req --> get
  req --> post
  req --> put
  req --> del

  subgraph RESO["3 . Resources and data"]
    direction TB
    uri["Resource URIs (nouns)"]:::d
    json["JSON representation"]:::d
    ver["Versioning /v1"]:::d
  end
  ctrl --> uri
  uri --> json
  res --> json
  uri -.-> ver

  subgraph CODES["4 . Status codes"]
    direction LR
    c2["2xx OK / Created"]:::x
    c4["4xx client error"]:::x
    c5["5xx server error"]:::x
  end
  res --> c2
  res -.->|bad input| c4
  res -.->|failure| c5

  subgraph XCUT["5 . Cross-cutting"]
    direction LR
    auth["Auth: JWT / OAuth2"]:::o
    rl["Rate limiting"]:::o
    cach["Caching / ETag"]:::o
    pag["Pagination"]:::o
  end
  req -.->|token| auth
  srv -.-> rl
  res -.-> cach
  json -.-> pag
${CLASSDEFS}`,
};
