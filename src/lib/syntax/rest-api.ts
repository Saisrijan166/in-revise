import type { SyntaxSheet } from "./types";

export const restApi: SyntaxSheet = {
  tagline: "HTTP methods, status codes, headers and curl calls you use against REST APIs.",
  baseline: "HTTP/1.1 · JSON",
  lang: "bash",
  groups: [
    {
      title: "HTTP methods",
      rows: [
        {
          syntax: "GET",
          what: "Read; safe + idempotent",
          example: "GET /users/1",
        },
        {
          syntax: "POST",
          what: "Create; not idempotent",
          example: "POST /users   (body = new user)",
        },
        {
          syntax: "PUT",
          what: "Replace whole resource; idempotent",
          example: "PUT /users/1   (full object)",
        },
        {
          syntax: "PATCH",
          what: "Partial update",
          example: "PATCH /users/1   (changed fields)",
        },
        {
          syntax: "DELETE",
          what: "Remove; idempotent",
          example: "DELETE /users/1",
        },
        {
          syntax: "HEAD / OPTIONS",
          what: "Headers only / allowed methods",
          example: "OPTIONS /users   (CORS preflight)",
        },
      ],
    },
    {
      title: "curl basics",
      rows: [
        {
          syntax: "curl <url>",
          what: "Simple GET",
          example: "curl https://api.example.com/users",
        },
        {
          syntax: "curl -i <url>",
          what: "Show response headers too",
          example: "curl -i https://api.example.com/users/1",
        },
        {
          syntax: "curl -X <METHOD>",
          what: "Set the HTTP method",
          example: "curl -X DELETE https://api.example.com/users/1",
        },
        {
          syntax: "curl -H <header>",
          what: "Add a request header",
          example: 'curl -H "Accept: application/json" <url>',
        },
        {
          syntax: "curl -d <data>",
          what: "Send a body (implies POST)",
          example: `curl -d '{"name":"Ayush"}' <url>`,
        },
        {
          syntax: "curl -o <file> / -s",
          what: "Save to file / silent",
          example: "curl -s -o out.json <url>",
        },
      ],
      combos: [
        {
          label: "POST JSON with a bearer token",
          code: `curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <token>" \\
  -d '{"name":"Ayush","email":"a@x.com"}' \\
  -i`,
        },
        {
          label: "Paginated GET with query params",
          code: `curl -s "https://api.example.com/users?page=2&size=20&sort=name" \\
  -H "Authorization: Bearer <token>"`,
        },
      ],
    },
    {
      title: "Status codes",
      rows: [
        { syntax: "200 OK", what: "Success, body returned", example: "GET succeeded" },
        {
          syntax: "201 Created",
          what: "New resource made",
          example: "POST created, Location header",
        },
        { syntax: "204 No Content", what: "Success, empty body", example: "DELETE / PUT ok" },
        {
          syntax: "301 / 302",
          what: "Moved permanently / found",
          example: "redirect via Location",
        },
        {
          syntax: "304 Not Modified",
          what: "Use your cached copy",
          example: "conditional GET (ETag)",
        },
        { syntax: "400 Bad Request", what: "Malformed request", example: "invalid JSON" },
        { syntax: "401 Unauthorized", what: "Not authenticated", example: "missing/bad token" },
        { syntax: "403 Forbidden", what: "Authenticated, not allowed", example: "no permission" },
        { syntax: "404 Not Found", what: "No such resource", example: "GET /users/999" },
        { syntax: "409 Conflict", what: "State clash", example: "duplicate email" },
        {
          syntax: "422 Unprocessable",
          what: "Valid syntax, bad values",
          example: "validation failed",
        },
        {
          syntax: "429 Too Many Requests",
          what: "Rate limited",
          example: "see Retry-After header",
        },
        { syntax: "500 Internal Error", what: "Server crashed", example: "unhandled exception" },
        { syntax: "503 Service Unavailable", what: "Down / overloaded", example: "maintenance" },
      ],
    },
    {
      title: "Common headers",
      rows: [
        {
          syntax: "Content-Type",
          what: "Format of the body",
          example: "Content-Type: application/json",
        },
        {
          syntax: "Accept",
          what: "Format the client wants back",
          example: "Accept: application/json",
        },
        {
          syntax: "Authorization",
          what: "Credentials (Bearer / Basic)",
          example: "Authorization: Bearer <jwt>",
        },
        {
          syntax: "Cache-Control",
          what: "Caching rules",
          example: "Cache-Control: no-cache, max-age=0",
        },
        {
          syntax: "ETag / If-None-Match",
          what: "Version tag for caching",
          example: 'ETag: "a1b2"  ->  If-None-Match: "a1b2"',
        },
        {
          syntax: "Location",
          what: "URL of created/moved resource",
          example: "Location: /users/1",
        },
        {
          syntax: "Retry-After",
          what: "When to retry (429/503)",
          example: "Retry-After: 30",
        },
      ],
    },
    {
      title: "Request and response shape",
      rows: [
        {
          syntax: "JSON body",
          what: "Payload for POST/PUT/PATCH",
          example: `{"name":"Ayush","age":30}`,
        },
        {
          syntax: "path params",
          what: "Identify one resource",
          example: "/users/1/orders/55",
        },
        {
          syntax: "query params",
          what: "Filter / page / sort",
          example: "/users?role=admin&page=1",
        },
        {
          syntax: "response envelope",
          what: "Data + metadata",
          example: `{"data":[...],"page":1,"total":42}`,
        },
        {
          syntax: "error body",
          what: "Machine-readable error",
          example: `{"error":"NOT_FOUND","message":"no user 999"}`,
        },
      ],
      combos: [
        {
          label: "A typical JSON response",
          code: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "data": [
    { "id": 1, "name": "Ayush" }
  ],
  "page": 1,
  "size": 20,
  "total": 1
}`,
        },
      ],
    },
    {
      title: "Authentication",
      rows: [
        {
          syntax: "Basic auth",
          what: "base64(user:pass) in header",
          example: "curl -u user:pass <url>",
        },
        {
          syntax: "Bearer / JWT",
          what: "Signed token per request",
          example: "Authorization: Bearer eyJhbGc...",
        },
        {
          syntax: "API key",
          what: "Shared secret, header or query",
          example: "X-API-Key: <key>",
        },
        {
          syntax: "OAuth 2.0",
          what: "Token from an auth server",
          example: "exchange code -> access_token",
        },
      ],
    },
    {
      title: "REST conventions",
      rows: [
        {
          syntax: "resource URIs",
          what: "Nouns, plural, no verbs",
          example: "/users, /users/1/orders",
        },
        {
          syntax: "versioning",
          what: "Keep old clients working",
          example: "/v1/users",
        },
        {
          syntax: "pagination",
          what: "Page large lists",
          example: "?page=2&size=20",
        },
        {
          syntax: "filtering / sorting",
          what: "Narrow and order results",
          example: "?status=active&sort=-createdAt",
        },
        {
          syntax: "status over body",
          what: "Signal result with HTTP code",
          example: "201 + Location, not 200 {ok:true}",
        },
      ],
    },
  ],
};
