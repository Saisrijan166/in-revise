# OS Basics and Processes

## Process ⭐⭐

A process is a running program: the code from disk, now loaded and executing. `java MyApp` makes the OS create one process for that app.

Each process gets its own:
- Virtual address space (memory)
- File descriptors and OS resources
- One or more threads

- **Program** = code sitting on disk. **Process** = that program currently running.
- Processes are isolated: process A cannot read process B's memory, so one crashing app cannot corrupt another.

> Remember: a process is an instance of a program in execution, with its own address space and OS-managed resources. In backend terms, a service is one or more processes.

## Thread ⭐⭐⭐

A thread is a unit of execution inside a process. One process can run many threads at once.

Threads in the same process **share** heap, code and open files, but each has its **own** stack, program counter and registers.

```text
Process
 ├── Thread 1 → Request A
 ├── Thread 2 → Request B
 └── Thread 3 → Request C
```

- A web server handles concurrent requests by giving each one a thread.
- Threads are cheaper than processes because they share memory instead of copying it.

> Remember: process = container of execution; thread = execution path inside it. Threads are why one server handles many requests at once.

## Concurrency vs Parallelism ⭐⭐

- **Concurrency** = multiple tasks in progress over overlapping periods. One CPU core can switch between tasks (work on A, A waits on DB, run B, back to A).
- **Parallelism** = multiple tasks running at the *same instant*. Needs multiple cores.

> Remember: concurrency = dealing with many things at once; parallelism = doing many things at the same instant. You can have concurrency on a single core; parallelism needs several.

## CPU Scheduling

The OS decides which thread runs next on a core. Common policies:

| Policy | Idea |
|---|---|
| FCFS | First come, first served |
| SJF / SRTF | Shortest job (or remaining time) first |
| Priority | Higher-priority tasks first |
| Round Robin | Each task gets a fixed time slice, then rotates |

- **Preemptive** scheduling can pause a running task; **non-preemptive** lets it finish.
- **Starvation**: a low-priority task never runs. **Aging** fixes it by slowly raising a waiting task's priority.

> Remember: Round Robin + time slices is the model behind fair request handling and why no single request can hog the CPU forever.

## Context Switching ⭐⭐

When the CPU switches from thread A to thread B, it must save A's state (registers, program counter, stack info) and restore B's. That save-and-restore is a context switch, and it has overhead.

- Too many threads means too much switching, which wastes CPU on bookkeeping instead of work.
- This overhead is a main reason servers use a **thread pool** instead of one thread per request.

> Remember: context switches are not free. Thousands of threads can spend more time switching than working.

## Thread Pool ⭐⭐

Instead of creating and destroying a thread per request, keep a fixed set of reusable threads. A request borrows a thread, runs, then returns it to the pool.

Benefits:
- Reuse (no repeated create/destroy cost)
- **Bounded concurrency** (a cap on how many run at once)
- Predictable memory and CPU use

- Having 100 threads on 10 cores does not mean 100 run at once; the OS schedules them.
- Pool size directly sets max concurrent requests, CPU use, memory and throughput.

> Remember: a thread pool trades unlimited threads for a controlled, reusable set. Unbounded thread creation is dangerous.

## System Calls and User vs Kernel Mode ⭐⭐⭐

Apps cannot directly touch hardware, files, memory or the network. They ask the OS kernel through a **system call** (`open`, `read`, `write`, `close`, `fork`, `exec`).

CPUs run code in two privilege levels:
- **User mode** — normal application code, restricted.
- **Kernel mode** — OS code with privileged hardware access.

```text
Java code → JVM → system call → kernel mode → filesystem / device
```

- A system call triggers a controlled switch from user mode to kernel mode and back.
- This boundary is what gives the OS protection and isolation.

> Remember: a system call is the controlled doorway from an application into the kernel; the mode switch is what keeps apps from freely controlling hardware.


# Concurrency and Synchronization

## Race Condition ⭐⭐⭐

A race condition happens when the result depends on the *timing/order* of concurrent operations on shared state.

`counter++` looks atomic but is really read → add → write:

```text
Thread A reads 0
Thread B reads 0
Thread A writes 1
Thread B writes 1   // expected 2, got 1
```

- Dangerous because it is intermittent and hard to reproduce.
- Real example: two users buy the last ticket (`remaining = 1`); both read 1, both succeed, you oversell.

> Remember: shared mutable state + concurrency without coordination = race condition.

## Mutex / Lock ⭐⭐

A mutex gives **mutual exclusion**: only one thread at a time may enter a protected critical section.

```text
acquire lock → counter++ → release lock   // others wait
```

- Protects shared in-memory state, counters and critical sections.
- A language-level mutex only protects memory inside **one process**. It does not coordinate across servers; distributed systems need a distributed lock for that.

> Remember: mutex = one at a time. It is per-process, not per-cluster.

## Semaphore ⭐⭐

A semaphore holds **N permits** and limits how many threads use a resource at once. Each user takes a permit; when none are left, the next waits; finishing returns a permit.

Example: a DB connection pool of 10 = 10 permits.

| | Allows | Use |
|---|---|---|
| Mutex | 1 at a time | Protect one critical section |
| Semaphore | up to N at a time | Limit concurrency / resource count |

> Remember: mutex protects *one* thing; a semaphore caps *how many* at once (e.g. "max 100 concurrent calls to this API").

## Deadlock ⭐⭐

Deadlock = threads wait on each other forever. A holds lock 1 and wants lock 2; B holds lock 2 and wants lock 1. Neither moves.

Four conditions, **all** required for deadlock:
1. Mutual exclusion
2. Hold and wait
3. No preemption
4. Circular wait

- Break any one condition and deadlock cannot occur.
- Common fixes: consistent **lock ordering**, timeouts, lease expiration, deadlock detection.

> Remember: deadlock needs all four conditions; prevention usually means imposing a global lock order or adding timeouts.


# Memory

## Stack vs Heap ⭐⭐

- **Stack** — per thread. Holds method call frames, local variables, execution state.
- **Heap** — shared across threads in the process. Holds objects (in Java, almost everything `new`).

```text
Thread → Stack: methodA(), methodB(), methodC()
Process/JVM → Heap: Object A, Object B, Object C
```

- Millions of objects grow the heap; thousands of threads each need stack memory. Both limit scalability.
- JVM heap is *not* the same as OS heap; the JVM manages its own region.

> Remember: stack = per-thread execution; heap = shared object memory.

## Virtual Memory ⭐⭐⭐

Each process sees its own large, continuous **virtual address space**. The OS/MMU translates virtual addresses to physical RAM.

Why it exists:
- **Isolation** — a process can't reach another's memory.
- **Abstraction** — programs don't deal with real RAM locations.
- **Flexibility** — the OS maps and moves memory in pages.

> Remember: virtual memory gives each process the illusion of its own private, continuous memory; the OS maps it to real RAM behind the scenes.

## Paging, Page Table and TLB ⭐⭐

- Virtual memory is split into fixed-size **pages**; physical memory into **frames**. The OS maps page → frame (they need not be adjacent).
- The **page table** stores those mappings.
- Walking the page table every access is slow, so the CPU caches recent translations in the **TLB** (Translation Lookaside Buffer).

```text
Virtual address → TLB → hit? physical address
                     → miss → page table → physical address
```

> Remember: page table = the full mapping; TLB = a fast cache of recent mappings.

## Page Fault ⭐⭐

A page fault happens when a process accesses a page not currently in RAM. The OS loads it from storage, then execution continues.

- A page fault is a normal memory-management event, **not** a crash.
- Many page faults (and heavy swapping) are expensive and slow — this is **thrashing**.

> Remember: a page fault means "page not in RAM, fetch it"; it's routine, but a flood of them kills performance.


# I/O, Files and IPC

## Blocking vs Non-blocking I/O ⭐⭐⭐

- **Blocking I/O**: the thread issues a read and waits until data arrives. Simple, but one thread is tied up per in-flight request. 10,000 requests → 10,000 threads.
- **Non-blocking I/O**: the thread starts I/O and continues other work; it handles the result when ready. Fewer threads can serve many connections.

| | Blocking | Non-blocking |
|---|---|---|
| Thread while waiting | parked | free to work |
| Model | simple (thread per request) | event loop, more complex |
| Concurrency | limited by threads | high |

> Remember: blocking = thread-per-request; non-blocking (event loop) = few threads, high concurrency. This is the Node.js / Nginx model.

## IPC — Inter-Process Communication

Threads share memory directly. Processes are isolated, so they need IPC to talk. Mechanisms:

- Pipes and named pipes
- Message queues
- Shared memory
- Signals
- **Sockets** (also work across machines)

> Remember: threads → shared memory; processes → need IPC. Microservices are separate processes, so they communicate over sockets / HTTP / gRPC / message queues.

## Files and File Descriptors

- A **file descriptor** is a small integer handle the OS gives an app for an open file, socket or pipe.
- Sockets and network connections are also file descriptors, so running out of them limits how many connections a server can hold.
- Useful file-system terms: inode (file metadata), hard link vs symbolic link, permissions, journaling, page/buffer cache.

> Remember: to the OS, open files and network connections are both file descriptors; the FD limit caps a server's concurrent connections.


# Networking Layers and Addressing

## OSI and TCP/IP Models ⭐⭐⭐

The OSI model is a **7-layer conceptual** model. The TCP/IP model is the **practical 4-layer** Internet stack. Don't ask which is "real" — OSI is for reasoning/teaching, TCP/IP is what the Internet actually uses.

| OSI (7) | Role / question | Examples | TCP/IP (4) |
|---|---|---|---|
| 7 Application | What protocol? | HTTP, DNS, SMTP, SSH | Application |
| 6 Presentation | How is data represented? | JSON, TLS, UTF-8 | Application |
| 5 Session | Manage sessions | | Application |
| 4 Transport | How do endpoints talk? | TCP, UDP | Transport |
| 3 Network | Where should packets go? | IP, routing | Internet |
| 2 Data Link | Local-link delivery | Ethernet, Wi-Fi, MAC | Network Access |
| 1 Physical | Transmit bits | cables, radio, fiber | Network Access |

Mapping: OSI 7+6+5 → Application; 4 → Transport; 3 → Internet; 2+1 → Network Access.

Mnemonic (top→bottom): **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing.

- In modern stacks, Presentation and Session aren't separate components; application libraries/protocols (JSON, TLS) handle them.
- **DNS lives at the Application layer** even though it returns an IP — don't call it Layer 3.
- **TLS** doesn't map cleanly; practically it sits between application and transport (`HTTP → TLS → TCP → IP`).

> Remember: HTTP (app) → TCP/UDP (transport) → IP (network) → Ethernet/Wi-Fi (link) → bits. That one stack answers most layer questions.

## Encapsulation and PDU Names ⭐⭐

As data goes *down* the stack on the sender, each layer wraps it with its own header (**encapsulation**); the receiver strips them going up (**decapsulation**).

Each layer's data unit has a name:

```text
Application → Data
Transport   → Segment (TCP) / Datagram (UDP)
Network     → Packet
Data Link   → Frame
Physical    → Bits
```

> Remember: Data → Segment → Packet → Frame → Bits. Sending adds headers; receiving removes them.

## IP Addressing, Public vs Private, NAT

An **IP address** identifies a network interface. IPv4 (`192.168.1.10`) is small; IPv6 (`2001:db8::1`) is huge.

- **Private** ranges stay inside local networks: `10.x.x.x`, `172.16–31.x.x`, `192.168.x.x`. **Public** IPs are routable on the Internet.
- **NAT** (Network Address Translation) lets many private devices share one public IP via the router.

> Remember: private IPs aren't reachable from the Internet; NAT maps them onto a shared public IP.

## Subnet and CIDR

A **subnet** is a logical subdivision of an IP network. **CIDR** notation like `10.0.0.0/24` says how many leading bits are the network prefix (here 24 bits = network, remaining 8 = hosts).

> Remember: `/24` = 24 network bits. Cloud VPCs use public/private subnets — load balancer in a public subnet, app servers and DB in private subnets.

## Ports and Sockets ⭐⭐

- An **IP** identifies the host; a **port** identifies a service on that host. Together `IP:port` is an endpoint (`192.168.1.10:8080`).
- A **socket** is the OS abstraction for a network endpoint. A TCP connection is identified by the 4-tuple: client IP:port ↔ server IP:port.

Common ports: HTTP 80, HTTPS 443, SSH 22, DNS 53.

> Remember: a server listens on `0.0.0.0:8080`; each accepted connection is a socket identified by both endpoints.

## Switch, Router, Hub, Firewall

| Device | Layer | Uses |
|---|---|---|
| Hub | L1 | repeats/broadcasts signals to all ports (obsolete) |
| Switch | L2 | forwards frames by MAC address within a local network |
| Router | L3 | routes packets by IP between networks |
| Firewall | L3/L4 or L7 | L3/L4: IP/port/protocol rules; L7 (WAF): HTTP rules |

> Remember: switch = MAC, local; router = IP, between networks; WAF = HTTP-aware firewall.


# TCP and UDP

## TCP vs UDP ⭐⭐⭐

Both are Transport-layer protocols.

| | TCP | UDP |
|---|---|---|
| Connection | connection-oriented | connectionless |
| Delivery | reliable byte stream | datagrams, no guarantee |
| Order | ordered | no ordering |
| Lost data | retransmits | no retransmission |
| Control | flow + congestion control | none built in |
| Overhead | higher | low, faster |

Use: HTTP/HTTPS → TCP; DNS → usually UDP; WebRTC/streaming → often UDP.

> Remember: TCP = reliability and order (at a cost); UDP = simple, low-overhead, app decides what guarantees it needs.

## TCP 3-Way Handshake ⭐⭐⭐

Before data flows, both sides establish a connection and synchronize sequence numbers:

```text
Client → SYN ───────→ Server
Client ←─ SYN-ACK ──  Server
Client → ACK ───────→ Server   // established
```

- **SYN**: I want to connect. **SYN-ACK**: got you, I'm ready too. **ACK**: got your reply.
- Why three steps (not two)? Both sides must confirm they can send *and* receive, and agree on starting sequence numbers.

> Remember: SYN, SYN-ACK, ACK establishes the connection and syncs sequence numbers both ways.

## TCP Reliability ⭐⭐

If a packet is lost, TCP detects it and retransmits, using:
- **Sequence numbers** (order and detect gaps)
- **ACKs** and **duplicate ACKs**
- **Timeouts** and **retransmission**
- **Sliding window** (how much can be in flight)

```text
1 received, 2 LOST, 3 received → TCP sees the gap → retransmit 2
```

> Remember: sequence numbers + ACKs + timeouts give TCP its reliable, ordered byte stream.

## Flow Control vs Congestion Control ⭐⭐⭐

A classic interview pair.

- **Flow control** protects the **receiver** — don't send faster than it can accept. TCP uses the **receive window** to signal capacity.
- **Congestion control** protects the **network** — don't overload routers between the hosts. TCP ramps its sending rate up and down.

> Remember: flow = receiver; congestion = network. Same goal (don't overwhelm), different target.


# HTTP, TLS and DNS

## HTTP ⭐⭐⭐

HTTP is the application-layer request/response protocol between clients and servers. A request has a method, URL, headers and optional body; a response has a status code, headers and body.

**Methods and properties:**

| Method | Does | Safe | Idempotent |
|---|---|---|---|
| GET | read | yes | yes |
| POST | create/process | no | no |
| PUT | replace resource | no | yes |
| PATCH | partial update | no | not necessarily |
| DELETE | remove | no | yes |

- **Safe** = no server state change. **Idempotent** = same final state no matter how many identical calls.
- **PUT vs PATCH**: PUT replaces the whole representation; PATCH changes part of it.

> Remember: GET is safe and idempotent; PUT/DELETE are idempotent; POST is neither — which is why POST retries risk duplicates.

## HTTP Status Codes ⭐⭐

| Class | Meaning | Common |
|---|---|---|
| 2xx | success | 200 OK, 201 Created, 204 No Content |
| 3xx | redirect | 301, 302, 304 Not Modified |
| 4xx | client error | 400, 401, 403, 404, 409 Conflict, 429 Too Many Requests |
| 5xx | server error | 500, 502 Bad Gateway, 503 Unavailable, 504 Gateway Timeout |

- **401 vs 403**: 401 = not authenticated (who are you?); 403 = authenticated but not allowed (you can't do this).

> Remember: 4xx = caller's fault, 5xx = server's fault; 401 is "log in", 403 is "you're known but forbidden".

## HTTP/1.1 vs HTTP/2 vs HTTP/3 ⭐⭐⭐

| Version | Transport | Key traits |
|---|---|---|
| HTTP/1.1 | TCP | persistent/keep-alive connections; limited multiplexing, head-of-line blocking at request level |
| HTTP/2 | TCP | binary framing, multiplexing many streams on one connection, header compression |
| HTTP/3 | QUIC over UDP | faster setup, avoids TCP connection-level head-of-line blocking under loss |

```text
HTTP/1.1 → TCP
HTTP/2   → TCP
HTTP/3   → QUIC → UDP
```

- HTTP/2 multiplexes streams A/B/C/D over a single connection, cutting connection overhead.
- HTTP/3's QUIC runs reliability/security itself over UDP, so a lost packet on one stream doesn't stall the others.

> Remember: /1.1 and /2 ride TCP; /3 rides QUIC/UDP. /2 adds multiplexing; /3 removes TCP's head-of-line blocking.

## HTTPS / TLS ⭐⭐⭐

HTTP alone is unencrypted. **HTTPS = HTTP + TLS**. TLS provides confidentiality, integrity and server authentication via certificates.

How it works at a glance:
- The server presents a **certificate** (its public-key identity), validated through a trusted certificate chain (a CA).
- A handshake uses **asymmetric** cryptography to authenticate and agree on session keys.
- Bulk data then uses fast **symmetric** encryption.

```text
HTTP → TLS → TCP → IP
```

> Remember: asymmetric crypto establishes trust and keys; symmetric crypto encrypts the actual data efficiently.

## DNS ⭐⭐⭐

DNS translates a domain name into an IP address. It's an Application-layer protocol, usually over UDP, and relies heavily on caching (TTL).

Resolution walks a hierarchy: root → TLD (`.com`) → authoritative server for the domain. A **recursive resolver** does this on your behalf.

**Records:**

| Record | Maps to |
|---|---|
| A | IPv4 address |
| AAAA | IPv6 address |
| CNAME | alias to another domain |
| MX | mail server |
| TXT | text/verification/policy |
| NS | name server |

> Remember: domain → DNS → IP. TTL controls caching, and DNS is also used for routing, failover and geographic traffic steering.


# Networks in System Design

## Load Balancer (L4 vs L7) ⭐⭐⭐

A load balancer spreads incoming traffic across backend servers so you can **scale horizontally** (many servers instead of one giant one) and stay available.

| | L4 load balancer | L7 load balancer |
|---|---|---|
| Sees | IP, port, TCP/UDP | HTTP: host, path, headers, cookies |
| Routes by | transport info | application content (`/api/*` → API servers) |

Algorithms: round robin, least connections, weighted, sticky sessions. Health checks remove unhealthy servers.

> Remember: L4 routes on IP/port; L7 understands HTTP and can route by path/host. Load balancing = horizontal scaling.

## Reverse Proxy

A reverse proxy sits in front of backend servers; clients talk to it, not the servers directly. It can do routing, **TLS termination**, load balancing, caching, compression, and access control. Examples: Nginx, HAProxy.

> Remember: a load balancer's job is to distribute traffic; a reverse proxy is the broader intermediary that *can also* load balance. Every LB is proxy-like; a reverse proxy does more.

## Cache and CDN ⭐⭐⭐

- A **cache** keeps frequently used data close to where it's needed (memory is far faster than a database). On a **hit**, return from cache; on a **miss**, read the DB, populate the cache, return. Redis is a common distributed cache.
- A **CDN** is geographically distributed edge servers that cache static content (images, CSS, JS, video) near users to cut latency and offload the origin. Miss → fetch from origin.
- The hard part is **cache invalidation**: stale cache vs updated DB. Strategies: TTL, explicit invalidation, write-through / write-back.

```text
Client → CDN → Load Balancer → App → Redis → Database
```

> Remember: caching cuts latency and DB load; the recurring problem is keeping cached data from going stale.

## Connection Pooling ⭐⭐

Opening a new DB/network connection per request is expensive. A **connection pool** keeps a set of open connections; a request borrows one, uses it, returns it.

- Pool size is also a **limit**: too many connections can overwhelm the database.
- So pooling is both a performance win and resource protection.

> Remember: reuse connections instead of recreating them, and cap the pool so you don't exhaust the DB.

## Real-time: WebSocket, Polling, SSE

Plain HTTP is request/response (client must ask). For server-pushed / real-time data:

| Technique | Direction |
|---|---|
| Short polling | client repeatedly asks |
| Long polling | server holds the request until data exists |
| SSE | server → client streaming (one-way) |
| WebSocket | full-duplex, persistent, both directions |

> Remember: WebSocket is persistent and bidirectional (chat, multiplayer, live dashboards); SSE is one-way server push; polling is the fallback when you only have HTTP.

## Latency vs Bandwidth vs Throughput ⭐⭐⭐

- **Latency** — how long one operation takes (e.g. 100 ms round trip). Sources: distance, DNS, TLS handshake, queueing, processing, DB, disk.
- **Bandwidth** — maximum capacity of the channel (e.g. 1 Gbps).
- **Throughput** — how much work is *actually* processed per unit time.

> Remember: latency = how long; bandwidth = how much capacity; throughput = how much actually gets through. Chained service calls *add up* latency.

## Network Failures: Timeout, Retry, Backoff, Idempotency ⭐⭐⭐

Assume any network call can be slow, lost, or duplicated. Patterns that handle this:

- **Timeout** — wait only so long, then give up, so a stuck dependency doesn't exhaust your threads.
- **Retry** — recover from transient failures — but blind retries can amplify an outage, so use **exponential backoff + jitter + retry limits**.
- **Idempotency** — a retried request must not perform the action twice. Client sends an `Idempotency-Key`; the server records the key and ignores duplicates.

```text
POST /payment → server charges ₹100 → response lost → client retries
Without idempotency: charged twice. With an idempotency key: charged once.
```

> Remember: retries over an unreliable network make idempotency essential; pair every retry with timeouts, backoff and jitter.

## Network Partition ⭐⭐

A partition is when parts of a distributed system are still running but **cannot communicate**. Each side may think the other is down.

This forces decisions about **partial failure** and leads directly to replication, consistency, consensus, quorums and the **CAP theorem**.

> Remember: a partition is a communication break, not a crash — both sides are alive but split. It's the core reason distributed systems are hard.


# Common "Why X vs Y?" Comparisons

## Process vs Thread

A process is an isolated program instance with its own memory; a thread runs inside a process and shares its memory.

> Remember: want isolation → process; want cheap concurrency with shared data → thread.

## Concurrency vs Parallelism

Concurrency = multiple tasks making progress over overlapping time (even on one core); parallelism = tasks truly running at the same instant (needs multiple cores).

> Remember: concurrency is structure (dealing with many things); parallelism is execution (doing many at once).

## Mutex vs Semaphore

Mutex allows one thread in a critical section; a semaphore has N permits and allows up to N concurrent users.

> Remember: mutex = lock (one); semaphore = counter (N). Protect one thing vs limit how many.

## Blocking vs Non-blocking I/O

Blocking parks the thread until I/O completes (thread-per-request); non-blocking lets the thread do other work and handle the result later (event loop, high concurrency).

> Remember: blocking is simple but thread-hungry; non-blocking scales connections with few threads.

## TCP vs UDP

TCP is reliable, ordered and connection-oriented with flow/congestion control; UDP is connectionless, unordered and low-overhead.

> Remember: need every byte in order → TCP; need speed and can tolerate loss → UDP.

## Flow Control vs Congestion Control

Both prevent overwhelming something; flow control protects the receiver, congestion control protects the network.

> Remember: flow = receiver window; congestion = network load.

## HTTP/1.1 vs HTTP/2 vs HTTP/3

/1.1 reuses TCP connections but multiplexes poorly; /2 multiplexes many streams on one TCP connection; /3 runs over QUIC/UDP to avoid TCP head-of-line blocking.

> Remember: /2 fixes app-level HOL blocking; /3 fixes transport-level HOL blocking.

## 401 vs 403

401 Unauthorized = not authenticated (who are you?); 403 Forbidden = authenticated but not permitted.

> Remember: 401 = log in; 403 = you're known but not allowed.

## PUT vs PATCH

PUT replaces the entire resource (idempotent); PATCH applies a partial change.

> Remember: PUT = full replace; PATCH = partial update.

## Load Balancer vs Reverse Proxy

A load balancer's core job is distributing traffic; a reverse proxy is a broader front-door that can also do TLS termination, caching, routing and load balancing.

> Remember: all load balancers act as proxies, but a reverse proxy does more than just balance.

## Latency vs Bandwidth

Latency is how long an operation takes; bandwidth is the maximum data rate the channel supports.

> Remember: latency = delay; bandwidth = capacity. High bandwidth doesn't fix high latency.

## Switch vs Router

A switch forwards frames by MAC address within a local network (L2); a router forwards packets by IP between networks (L3).

> Remember: switch = inside one network; router = between networks.

## Symmetric vs Asymmetric Encryption (in TLS)

Asymmetric (public/private key) authenticates the server and safely establishes a shared key; symmetric uses that shared key for fast bulk encryption.

> Remember: asymmetric to set up trust and keys, symmetric to move the data.
