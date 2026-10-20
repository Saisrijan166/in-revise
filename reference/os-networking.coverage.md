# Coverage: OS & Networking
Reference: reference/os-networking.md  ·  Last updated: 20-10-2026

Every reference item (key list: the numbered sections, plus each question, pattern and "X vs Y" row inside them) appears in exactly
one of Mapped, Corrected or Dropped. A section whose parts went to different places has one row here (Corrected wins over
Mapped), and its other parts are listed under "Details placed elsewhere or cut". Sources for corrections are primary pages.

## Mapped
| Reference item (key + short title) | Landed in | Note |
|---|---|---|
| O0. OS framing ("how a computer runs programs and manages CPU, memory, processes, files") and tier labels; O0 (part). Tier labels as heat hints | concept `what-is-an-os` (Why it exists, kernel point); tier labels used as heat hints; heat values |  |
| O1 (part: process isolation); O1 (parts: process, thread, multithreading, thread lifecycle, shared memory between threads); O1 (part: context switching) | concept `processes`; concept `threads` (points, How it works; life cycle links to `processes` state diagram); concept `context-switching` | O1.2 concurrency vs parallelism belongs to the concurrency unit |
| O1.1. Process vs Thread (pair) | comparison `process-vs-thread`, embedded in `threads` |  |
| O1.2. Concurrency vs Parallelism (pair) | comparison `concurrency-vs-parallelism` (embedded in the concept) |  |
| O1.3. User thread vs kernel thread (pair) | concept `threads` (Interview Q, models bullet); tree `kernel-thread`, `user-thread`, `threading-models` |  |
| O1.4. Why threads are cheaper than processes | concept `threads` (point "Cheaper", Interview Q); comparison row "Cost to create" |  |
| O1.SD. System design: web server workers, thread pools, request handling, concurrent requests, scalability | `threads` (request-per-thread bullet); `thread-pools` |  |
| O2 (part: context switching); O2. CPU Scheduling (FCFS, SJF, SRTF, priority, round robin, time quantum, starvation, aging) | concept `context-switching`; concept `cpu-scheduling` (table, points, trap, Interview Qs); tree nodes; glossary |  |
| O2.1. Preemptive vs non-preemptive (pair) | comparison `preemptive-vs-non-preemptive`; `cpu-scheduling` (confusedWith, Interview Q) |  |
| O2.Q1. Why does a server need a thread pool instead of unlimited threads? | concept `thread-pools` (Why it exists, hook) |  |
| O3 (part: race condition, critical section, mutual exclusion, atomicity, synchronization, thread safety, atomic operations); O3 (part: locks, mutex, monitor, spinlock, read/write lock); O3 (part: semaphore); O3 (part: deadlock); O3 / M.TOS6 (part: mutex / semaphore) | concept `race-conditions` (table, points, fixes bullet); tree `critical-section`, `atomic-classes`; glossary `race-condition`, `critical-section`, `mutual-exclusion`, `atomic-operation`, `thread-safety`; concept `locks` (Steps, points); tree `mutex`, `spinlock`, `read-write-lock`, `monitor-lock`; concept `semaphores`; concept `deadlocks`; concept `semaphores` heat 3 | "Synchronization" is the umbrella word used in the spine and locks; no separate term (common word) heat hint |
| O3.1. Chain: threads → shared resource → race condition → synchronization → correctness | spine step 2 (concurrency unit); concept `race-conditions` (why, fixes) |  |
| O3.SD. System design connection: concurrent API requests, shared caches, counters, connection pools, in-memory data, rate limiters, job queues | concept `race-conditions` point "Seen in"; concurrent API requests → `concurrency-and-parallelism` (why); connection pools → `semaphores` bullet linking `connection-pooling` |  |
| O4. Deadlocks (section) | concept `deadlocks` |  |
| O4.1. Four necessary conditions | concept `deadlocks` (points, trap); tree `coffman-conditions`; glossary `coffman-conditions` |  |
| O4.2. Prevention, avoidance, detection, recovery; Banker's algorithm idea | concept `deadlocks` (How bullets: prevent, avoid, detect and abort); tree `lock-ordering`, `bankers-algorithm`, `wait-for-graph` | idea only, no implementation |
| O4.Q1. Q: How would you prevent deadlocks? | concept `deadlocks` (Interview Q) |  |
| O5 (part: stack, heap). Memory management list; O5. Memory management (virtual memory, physical memory, address space, virtual/physical address); O5 (part: paging, page, frame, page table, TLB, page fault, demand paging, fragmentation); O5 (part: page replacement, swapping) | concept stack-and-heap; concept virtual-memory; glossary address-space, virtual-address, mmu; concept paging-and-page-faults; tree paging, page-table, tlb, page-fault, demand-paging, internal-fragmentation, external-fragmentation; glossary page-memory, frame-memory; concept page-replacement (table); swapping → virtual-memory (swap space) | the paging parts are in paging-and-page-faults, replacement/swapping parts in page-replacement and virtual-memory |
| O5.1. Flow: program, virtual address, page table / TLB, physical address, RAM | concept paging-and-page-faults (Steps "Translating one virtual address") |  |
| O6. Virtual memory: each process gets the illusion of its own large, continuous memory; swap; O6 (part: paging, page tables, TLB, page faults, demand paging); O6 (part: swap, thrashing, working set) | concept virtual-memory (hook, Mermaid, point "Swap space"); concept paging-and-page-faults; concept page-replacement (points, Interview Q 1); tree working-set, thrashing; swap → virtual-memory | paging / TLB / faults / demand paging parts → paging-and-page-faults; thrashing / working set → page-replacement |
| O6.SD. System design: memory-heavy services, JVM memory, containers, cache memory, performance, OOM | concept virtual-memory (OOM killer point, cgroup memory.max bullet, Interview Q 2, VSZ vs RSS); JVM memory → stack-and-heap; cache memory → memory-hierarchy |  |
| O7. IPC: pipes, named pipes, message queues, shared memory, signals, sockets | concept `ipc` (table); tree `pipe`, `named-pipe`, `message-queue-ipc`, `shared-memory-ipc`, `unix-signal`, `unix-domain-socket` |  |
| O7.1. Threads share memory vs processes are isolated and need IPC (pair) | concept `ipc` (hook, point "Processes vs threads", Why); `confusedWith: [process-vs-thread]` |  |
| O8. System Calls (why they exist; layered flow app → library → syscall → kernel → hardware) | concept `what-is-an-os` (How it works first bullet, sayIt, Interview Q) |  |
| O9. User Mode vs Kernel Mode (privileged operations, kernel, system calls, mode switch, protection/isolation) | comparison `user-mode-vs-kernel-mode`; concept `what-is-an-os` (points, trap on mode switch vs context switch) |  |
| O10 (part: blocking, non-blocking, synchronous, asynchronous I/O); O10 (part: I/O multiplexing, select, poll, epoll, event loop) | concept `blocking-and-non-blocking-io` (4-model table, points); concept `io-multiplexing` (Steps, API table, tree `readiness-apis`) | sync/async defined as "who completes the I/O" |
| O10.1. Blocking vs non-blocking I/O (pair) | comparison `blocking-vs-non-blocking-io` |  |
| O10.2. Synchronous vs asynchronous I/O (pair) | concept `blocking-and-non-blocking-io` (table, point "Sync vs async", Interview Q "Is non-blocking the same as asynchronous?") |  |
| O10.SD. Node.js, Nginx, high-concurrency servers, event-driven architecture | concept `io-multiplexing` (hook, trap on Node.js), comparison `thread-per-request-vs-event-loop` (Examples row) |  |
| O11. File systems: files, directories, file descriptors, inodes, permissions, hard and symbolic links, journaling, buffer/cache, disk I/O | concept `files-and-file-descriptors` (Mermaid, points); tree `inode`, `file-permissions`, `page-cache`, `journaling`, `storage-types` | "buffer/cache" written as the Linux page cache |
| O11.1. Hard links vs symbolic links (pair) | concept `files-and-file-descriptors` (Example with real output); tree `hard-link`, `symbolic-link` |  |
| O12. Disk and storage (part: HDD vs SSD, sequential vs random, IOPS, latency, throughput) | tree `storage-types` (`hdd`, `ssd`, `sequential-io`, `iops`); Interview Q "HDD vs SSD" | latency itself is owned by `latency-and-bandwidth` (other unit) |
| O12.1. HDD vs SSD (pair) | Interview Q in `files-and-file-descriptors`; tree `hdd`, `ssd` |  |
| O12.2. Sequential vs random I/O (pair) | tree `sequential-io`; Interview Q "HDD vs SSD" (2 vs 223 MB/s) |  |
| O13. CPU Cache (registers, L1, L2, L3, RAM, disk chain) | concept memory-hierarchy (Mermaid, points "Order", "Who shares") |  |
| O13.1. Locality: temporal vs spatial; cache hit/miss | concept memory-hierarchy (points, Interview Q 1); tree locality-of-reference, temporal-locality, spatial-locality; glossary cache-hit, cache-miss | pair temporal vs spatial kept as two tree nodes, no comparison file |
| O14. Memory allocation: stack allocation, heap allocation, malloc/free, GC concept, memory leaks, dangling pointers, fragmentation | concept stack-and-heap (Compare rows, Interview Qs 2 and 3); tree garbage-collection, memory-leak, dangling-pointer; fragmentation → concept paging-and-page-faults (internal/external nodes) |  |
| O14.1. JVM heap is not the OS heap | concept stack-and-heap (bullet: metaspace and thread stacks are native memory outside the heap); tree jvm-native-memory |  |
| O15 (part: user/kernel privilege); O15 (part: process isolation); O15 (part: memory protection). Process isolation, memory protection; O15 (part: permissions, access control) | comparison `user-mode-vs-kernel-mode`; concept `processes` (Why, isolation bullet); comparison `process-vs-thread` (Isolation row); concept virtual-memory (point "Isolation", SIGSEGV bullet); tree segmentation-fault; tree `file-permissions` | other O15 parts belong to other units permissions / access control / user-kernel privilege belong to other units rwx bits only; ACLs not covered |
| N0. Networks framing | concept `request-journey` (Why) | framing only |
| N1. OSI Model (know all 7; where HTTP, TCP/UDP, IP, Ethernet live) | concept osi-model (table, Interview Q 2) | "don't memorise definitions" advice became the one-question-per-layer column |
| N2. TCP vs UDP (TCP: connection-oriented, reliable, ordered, retransmission, flow control, congestion control, handshake; UDP: connectionless, no delivery or ordering guarantee, lower overhead, "faster for appropriate workloads") | comparison `tcp-vs-udp` (rows); concept `tcp-and-udp` (points, trap "UDP is always faster") | each TCP mechanism links to its owner concept |
| N3. TCP 3-way handshake (SYN, SYN-ACK, ACK; purpose: establish and synchronise sequence numbers) | concept `tcp-handshake` (hook, Mermaid, points, sayIt) |  |
| N3.Q1. Q: Why 3-way and not 2-way? | concept `tcp-handshake` (trap, Interview Q) | answer from RFC 9293 3.4 and 3.5 |
| N4. TCP reliability (sequence numbers, ACK, retransmission, timeout, duplicate ACK, sliding window, flow control, congestion control; lost packet → no ACK / dup ACK → resend) | concept `tcp-reliability` (points, Mermaid, tree); flow and congestion control link to `flow-and-congestion-control` |  |
| N5. Flow control vs congestion control ("protects receiver" vs "protects network"; memory line) | comparison `flow-vs-congestion-control` (gist, verdict); concept `flow-and-congestion-control` (hook) | memory line rewritten |
| N6. HTTP (request, response, methods, status codes, headers, body, cookies, sessions, Content-Type, Authorization, caching, compression; methods GET..OPTIONS) | concept `http-basics` (table, example, Q on login); tree `content-type-header`, `authorization-header`, `http-cookie` | caching linked to `caching-and-cdn`; compression as the Content-Encoding tree node |
| N6.1. PUT vs PATCH (pair) | concept `http-basics` (points, Interview Q) |  |
| N6.2. Safe, idempotent, cacheable methods | concept `http-basics` (methods table); tree `safe-method`, `idempotent-method` |  |
| N8.1. Asymmetric vs symmetric encryption in TLS (pair) | comparison `symmetric-vs-asymmetric-encryption`; concept `tls-https` (trap, Q) |  |
| N9. DNS (resolver, recursive query, authoritative, root, TLD, records A/AAAA/CNAME/MX/TXT/NS, TTL, DNS caching) | concept `dns` (Mermaid, points); tree `recursive-resolver`, `root-name-server`, `tld-server`, `authoritative-name-server`, `dns-records` and its children |  |
| N10. IP Addressing (IPv4, IPv6, public, private, NAT, subnet, CIDR, default gateway; don't go deep into subnetting) | concept ip-addressing (all but gateway); default gateway → switches-and-routers point + glossary default-gateway | subnetting depth kept to one /24 example |
| N10.1. Public IP vs private IP (pair) | ip-addressing Interview Q 1; glossary private-ip-address, public-ip-address |  |
| N11. Ports & Sockets (IP + port = endpoint; port, socket, listening socket, client socket, connection) | concept ports-and-sockets (hook, Steps, tree nodes listening-socket, connected-socket) |  |
| N12. Load Balancers (L4, L7, reverse proxy, health checks, algorithms, S1-S3 picture) | concept `load-balancers-and-proxies` (Mermaid, points, Example) | three instances picture redrawn with the running example |
| N12.1. Layer 4 vs Layer 7 load balancer (pair) | comparison `l4-vs-l7-load-balancer` (embedded) |  |
| N12.2. Algorithms: round robin, least connections, weighted, sticky sessions | tree `lb-algorithms` (round robin, least connections, weighted, consistent hash, sticky sessions); nginx Example | sticky sessions are session persistence, not a balancing method; placed beside the methods with that note |
| N14. Connection Pooling (borrow, use, return; DB, HTTP, TCP) | concept `connection-pooling` (Steps, bullets) |  |
| N15. WebSockets (persistent bidirectional; chat, notifications, multiplayer, dashboards) | concept `real-time-connections`; comparison `polling-vs-sse-vs-websocket` (rows "Who sends", "Best for") |  |
| N15.1. HTTP request/response vs WebSocket (pair) | comparison `polling-vs-sse-vs-websocket` (row "Connection"); Interview Q on the upgrade | merged into the 4-way comparison instead of a separate pair |
| N16. Long polling / short polling / SSE | comparison `polling-vs-sse-vs-websocket`; tree `short-polling`, `long-polling`, `sse` |  |
| N17. Caching (browser, CDN, reverse proxy, app cache, Cache-Control, ETag, TTL; client → CDN → LB → app → Redis → DB) | concept `caching-and-cdn` (table, points, Example) | layer chain shown as the table of cache layers |
| N18. CDN (edge locations, origin, hit, miss, TTL, invalidation) | concept `caching-and-cdn` (bullets); tree `cdn-edge`, `origin-server`, `cache-invalidation` |  |
| N19. Latency vs Bandwidth vs Throughput (definitions, how long / how much) | comparison `latency-vs-bandwidth-vs-throughput` (embedded) |  |
| N20. Network Failures (timeout, connection failure, packet loss, retries, duplicates, partial failure, partition; backoff, jitter, circuit breaker, idempotency) | concept `network-failures` (Why, points, bullets); tree nodes |  |
| M0. Owner prompts and framing text | nothing to land (no facts) |  |
| M.RC. The request chain from user to disk | concept `request-journey` (Steps) |  |
| M.OS. OS to system design mapping table | not reproduced; each row is the system-design point of its owner concept |  |
| M.OS1. Process → service / worker | concept `processes` (three Spring Boot instances bullet) |  |
| M.OS2. Thread → concurrent request handling | concept `threads` (request-per-thread bullet) |  |
| M.OS3. Thread pool → web server scalability | concept `thread-pools` (Tomcat defaults, Interview Q on sizing) |  |
| M.OS4. Context switch → concurrency overhead | concept `context-switching` (sayIt, Interview Q 3) |  |
| M.OS5. Mutex: shared-resource protection | concept `locks` / comparison `mutex-vs-semaphore` row "Main use" |  |
| M.OS6. Semaphore: resource limiting | concept `semaphores` point "Typical use" |  |
| M.OS7. Deadlock: distributed/resource problems | concept `deadlocks` (services Interview Q) |  |
| M.OS8. Virtual memory: memory isolation | concept virtual-memory (point "Isolation") |  |
| M.OS9. Page cache: file/database performance | concept `files-and-file-descriptors` (point "Page cache", trap, sayIt) |  |
| M.OS10. File descriptor: network connections | concept `files-and-file-descriptors` (hook, point "Open-file limit", Interview Q 1) |  |
| M.OS11. Blocking I/O: thread-per-request model | comparison `thread-per-request-vs-event-loop` |  |
| M.OS12. Non-blocking I/O: event-driven servers | comparison `thread-per-request-vs-event-loop`; concept `io-multiplexing` |  |
| M.OS13. CPU cache: performance | concept memory-hierarchy (point "Backend rule", Interview Q 2) |  |
| M.OS14. Disk I/O: database/storage | tree `storage-types`; Mermaid in `files-and-file-descriptors` |  |
| M.OS15. IPC: service/process communication | concept `ipc` (sayIt) |  |
| M.NW. Network to system design mapping table | not reproduced; rows M.NW6-M.NW17 mapped above, others live in their owner concepts |  |
| M.NW1. DNS: service discovery / routing | concept `dns` (points "System design") |  |
| M.NW2. TCP: reliable communication | concept `tcp-and-udp` (points) | system-design angle: web APIs on TCP |
| M.NW3. UDP: low-overhead communication | concept `tcp-and-udp` (points, Interview Q "When would you choose UDP over TCP?") |  |
| M.NW4. HTTP: API communication | concept `http-basics` (Why) |  |
| M.NW5. TLS: secure communication | concept `tls-https` (Why) |  |
| M.NW6. Load balancer: horizontal scaling | concept `load-balancers-and-proxies` (points: Scale out) |  |
| M.NW7. Reverse proxy: routing/security | concept bullet (TLS termination, hides backends) |  |
| M.NW8. CDN: global performance | concept `caching-and-cdn` (Why) |  |
| M.NW9. Cache: reduce latency/load | concept `caching-and-cdn` (Why) |  |
| M.NW10. Connection pool: resource efficiency | concept `connection-pooling` (sayIt) |  |
| M.NW11. WebSocket: real-time systems | concept `real-time-connections` (bullets on scaling) |  |
| M.NW12. Timeout: failure handling | concept `network-failures` |  |
| M.NW13. Retry: resilience | concept `network-failures` |  |
| M.NW14. Idempotency: safe retries | concept `network-failures` |  |
| M.NW15. Latency: performance | concept `latency-and-bandwidth` |  |
| M.NW16. Bandwidth: capacity planning | comparison `latency-vs-bandwidth-vs-throughput` |  |
| M.NW17. Network partition: distributed systems | tree `network-partition` |  |
| M.NW18. HTTP/2: efficient communication | concept `http-versions` (Interview Q) |  |
| M.NW19. HTTP/3: modern transport | concept `http-versions` (points, Q) |  |
| M.TOS. OS top 12 | heat hints for the OS units |  |
| M.TOS1. Process vs Thread (top-12 rank) | heat 3 on `threads` |  |
| M.TOS2. Concurrency vs Parallelism (top-12 list) | concept `concurrency-and-parallelism` heat 3 | heat hint |
| M.TOS3. Context Switching (top-12 rank) | heat 3 on `context-switching` |  |
| M.TOS4. Thread Pools (top-12 rank) | heat 3 on `thread-pools` |  |
| M.TOS5. Race Conditions (top-12) | concept `race-conditions` heat 3 | heat hint |
| M.TOS6 (part: locks) | concept `locks` heat 3 | heat hint |
| M.TOS7. Deadlocks (top-12) | concept `deadlocks` heat 3 | heat hint |
| M.TOS8. Stack vs Heap (top-12 list) | concept stack-and-heap heat 3 | heat hint |
| M.TOS9. Virtual Memory (top-12 list) | concept virtual-memory heat 3 | heat hint |
| M.TOS10. Paging / TLB / Page Fault (top-12 list) | concept paging-and-page-faults heat 3 | heat hint |
| M.TOS11. Top-12 list: blocking vs non-blocking I/O | heat 3 on `blocking-and-non-blocking-io` and `io-multiplexing` | heat hint only |
| M.TOS12. System Calls / User vs Kernel Mode (top-12 rank) | heat 3 on `what-is-an-os` |  |
| M.TNW. Networks top 15 | heat hints (all six concepts here are heat 3) |  |
| M.TNW1. Top-15 #1 TCP vs UDP | heat 3 for `tcp-and-udp` | priority hint only |
| M.TNW2. Top-15 #2 TCP 3-way handshake | heat 3 for `tcp-handshake` | priority hint only |
| M.TNW3. Top-15 #3 TCP reliability | heat 2 for `tcp-reliability` | not in the spec's heat-3 list |
| M.TNW4. Top-15 #4 Flow vs congestion control | heat 3 for `flow-and-congestion-control` | priority hint only |
| M.TNW5. HTTP (network top-15) | concept `http-basics` heat 3 | heat hint |
| M.TNW6. HTTP methods + status codes | concept `http-basics` heat 3 | heat hint |
| M.TNW7. HTTP/1.1 vs HTTP/2 vs HTTP/3 | concept `http-versions` heat 3 | heat hint |
| M.TNW8. HTTPS / TLS | concept `tls-https` heat 3 | heat hint |
| M.TNW9. DNS (network top-15) | concept `dns` heat 3 | heat hint |
| M.TNW10. IP / NAT / Subnets (top-15 list) | heat 3 on ip-addressing | heat hint |
| M.TNW11. Ports / Sockets (top-15 list) | heat 3 on ports-and-sockets | heat hint |
| M.TNW12. Load Balancers (top 15) | heat 3 for `load-balancers-and-proxies` | heat hint |
| M.TNW13. Reverse Proxy (top 15) | heat 3 for `load-balancers-and-proxies` | heat hint |
| M.TNW14. Connection Pooling (top 15) | heat 3 for `connection-pooling` | heat hint |
| M.TNW15. Caching / CDN (top 15) | heat 3 for `caching-and-cdn` | heat hint |
| M.SD. Then system design tree and study order | topic order of the tech (OS first, then networks, then this bridge); points: Scaling chain |  |
| E0. Part 1 big picture: journey of a URL | concept `request-journey` (Steps) | example renamed to GET https://api.shop.example/orders/42 |
| E1. Process (program vs process, own address space, isolation, Spring Boot as processes, interview answer) | concept `processes` (points, Why, isolation bullet, sayIt) |  |
| E2. Thread (shared heap/code/files, own stack/PC/registers, request per thread) | concept `threads` (points Shared/Private, How it works, Example) |  |
| E2.1. Process vs Thread table | comparison `process-vs-thread` (rows) |  |
| E3. Concurrency vs Parallelism (definitions, one-core timeline, two-core timeline, "dealing with" vs "doing" memory trick) | concept `concurrency-and-parallelism` (hook, points, trap, sayIt); comparison `concurrency-vs-parallelism` (diagrams, rows) | Pike phrasing paraphrased and credited only via the go.dev source |
| E5.1. 100 threads on 10 cores; I/O waits; unbounded threads are dangerous | concept `thread-pools` (bullet, points CPU-bound / I/O-bound, trap) |  |
| E6.1. Ticket sold twice example | concept `race-conditions` (point "Check-then-act", Interview Q "last item" with the conditional UPDATE fix) | retold with the stock of order 42's item; tree `check-then-act` |
| E7. Mutex / Lock (mutual exclusion, acquire / critical section / release, lock-counter-unlock example, "one at a time" trick, protects shared in-memory state, counters) | concept `locks` (hook, Steps, Example with ReentrantLock) |  |
| E7.1. A mutex protects one process only, not many servers | concept `locks` (trap); concept `race-conditions` (point "Several instances", one line, links locks) | the reference only says "distributed coordination when appropriate"; the site names PostgreSQL SELECT ... FOR UPDATE and a conditional UPDATE |
| E8. Semaphore (limited resources, 10-connection pool with permits, 11th waits, external API with a concurrency cap) | concept `semaphores` (why, points, Example Semaphore(3), Interview Q on 3 instances) |  |
| E9. Deadlock (definition, Lock 1 / Lock 2 example) | concept `deadlocks` (hook, Mermaid wait-for cycle, Example lock-ordering fix) |  |
| E9.1. Four necessary conditions ("if all four exist, deadlock can occur") | concept `deadlocks` (points, trap) | correct as necessary conditions |
| E9.2. Distributed deadlocks: timeouts, lock ordering, leases, detection, breaking cycles | concept `deadlocks` (Interview Q "Can services deadlock?") |  |
| E10. Stack vs Heap (per-thread stack of frames, shared heap of objects, 1 million objects / 10,000 threads both cost memory) | comparison stack-vs-heap; concept stack-and-heap (hook, points, bullets; 10,000 threads links thread-pools) | memory trick rewritten as the hook |
| E11. Virtual memory (process → virtual address space → MMU → RAM; isolation, abstraction, flexibility; address 1000 example; container memory, OOM, limits) | concept virtual-memory (Mermaid with 0x1000 in two processes, Interview Q 1) |  |
| E12. Paging (pages, frames, page → frame, not adjacent) | concept paging-and-page-faults (Why, tree paging note) |  |
| E13. Page table (page → frame mapping) | concept paging-and-page-faults (point "Page table"); tree page-table |  |
| E14. TLB (caches recent translations; hit / miss → page table) | concept paging-and-page-faults (point "TLB", Steps 2–3) |  |
| E14.1. Page table vs TLB (mapping vs fast cache of mappings) | concept paging-and-page-faults (Interview Q 1) |  |
| E16. Blocking I/O (thread waits; 10,000 requests need 10,000 threads) | comparison `blocking-vs-non-blocking-io` (rows "While no data is ready", "Threads for 10,000 waiting sockets"); tree `blocking-io`, `java-io-streams` | `inputStream.read()` example kept as tree note |
| E17 (part: non-blocking I/O, do other work, process when ready); E17 (part: event loop mental model, requests A-D) | concept `blocking-and-non-blocking-io` (table row "Non-blocking, sync"), tree `non-blocking-io`; concept `io-multiplexing` (Steps "One turn of an event loop") |  |
| E19. User Mode vs Kernel Mode (Java read path: Java → JVM → syscall → kernel → storage) | concept `what-is-an-os` (Example: strace, JVM line) |  |
| E.P2. Part 2 intro (machines communicate) | concept `request-journey` (Why) | framing only |
| E20. DNS (why, hierarchy root → .com → example.com, caching, records, system design: discovery, routing, geo, failover, load distribution) | concept `dns` (Why, Mermaid, points "System design") | system design line backed by Route 53 routing policies and Kubernetes DNS |
| E21. TCP (reliable ordered byte stream; "TCP does not mean magically fast") | concept `tcp-and-udp` (points, sayIt); comparison `tcp-vs-udp` | overhead point carried by the handshake cost point in `tcp-handshake` |
| E22. UDP (datagrams without delivery, ordering, retransmission; app chooses behaviour) | concept `tcp-and-udp` (points, trap); comparison `tcp-vs-udp` | added that UDP apps should add their own congestion control (RFC 8085) |
| E22.1. TCP vs UDP table (connection, reliable byte stream vs datagram, ordering, retransmission, flow, congestion) | comparison `tcp-vs-udp` | header sizes and uses rows added |
| E25. Flow control (protects the receiver; receive window) | concept `flow-and-congestion-control` (points rwnd, zero window; Why) | the reference's example numbers are in Dropped |
| E26. Congestion control (overloaded network; algorithms regulate sending) | concept `flow-and-congestion-control` (points cwnd, How bullets, Defaults) |  |
| E26.1. Flow control (receiver) vs congestion control (network) pair | comparison `flow-vs-congestion-control` |  |
| E27. HTTP (application-layer protocol, typical request and response) | concept `http-basics` (Example: GET /orders/42) | running example replaces the reference's /users/123 |
| E28.1 (part: method idempotency). Idempotency of methods; E28.1 (part). Lost response causes a duplicate payment | concept `http-basics` (points, Q); glossary `idempotent-method`; concept `network-failures` (Mermaid sequence, Q1) | lost-response retry problem and idempotency keys belong to `network-failures` (linked) the PUT idempotency part belongs to http-basics |
| E29. HTTP status codes (2xx..5xx list) | concept `http-basics` (bullets, points 502/503/504, Q); tree `status-code-classes` |  |
| E29.1. 401 vs 403 (pair) | concept `http-basics` (trap, sayIt); glossary `unauthorized-401`, `forbidden-403` |  |
| E33.1. Asymmetric vs symmetric cryptography (pair) | comparison `symmetric-vs-asymmetric-encryption` |  |
| E34. IP address (identifies an interface; IPv4 and IPv6 examples) | ip-addressing hook and point "IPv4 / IPv6"; glossary ip-address, ipv4, ipv6; comparison ipv4-vs-ipv6 |  |
| E34.1. Public vs private IP (pair; 10.x, 172.16-31.x, 192.168.x) | ip-addressing point "Private (RFC 1918)", Interview Q 1; tree node private-ranges | ranges written as CIDR blocks |
| E35. NAT (devices share one public IP through the router) | ip-addressing point "NAT (NAPT)", sayIt, Interview Q 3; tree nodes nat, port-forwarding; glossary nat, napt, port-forwarding | added NAPT ports and the no-inbound limit |
| E36.1. Cloud VPC: public subnet (load balancer), private subnet (apps, database) | ip-addressing Mermaid diagram; tree node vpc-subnets; glossary vpc, subnet |  |
| E37. Port (identifies the program; 192.168.1.10:8080; common ports 80, 443, 22, 53) | ports-and-sockets hook, point "Port", Interview Q 3; glossary port-network, well-known-port |  |
| E39. Load Balancer (why: horizontal scaling; round robin, least connections, weighted) | concept `load-balancers-and-proxies` (Why, points, Example) |  |
| E41. Reverse Proxy (routing, TLS termination, LB, caching, compression, access control) | concept bullet; tree `reverse-proxy`, `tls-termination`; glossary |  |
| E41.1. Reverse proxy vs load balancer (pair) | concept `load-balancers-and-proxies` (trap) |  |
| E42. CDN (India server, US user; edge vs origin; static files, cacheable API responses) | concept `caching-and-cdn` (Why, bullets, Q2) |  |
| E43. Cache (hit/miss flow, Redis, why) | concept `caching-and-cdn` (table row App cache) | app cache detail is out of scope for this tech (network angle only) |
| E43.1. Cache hit vs cache miss (pair) | concept `caching-and-cdn` (bullet: miss goes to the origin) | terms owned by the memory unit glossary |
| E44. Connection Pool (expensive connections, Spring Boot + PostgreSQL pool, why limit size) | concept `connection-pooling` (Why, points, worked budget, trap) | "100,000 connections" made concrete with PostgreSQL's default of about 100 |
| E45. WebSocket | concept `real-time-connections` (points, Q); tree `websocket` |  |
| E45.1. Normal HTTP vs WebSocket (pair) | comparison `polling-vs-sse-vs-websocket` | same merge as N15.1 |
| E47. Retry (transient failures; 1000 clients retry at once; backoff, jitter, limits, error classes) | concept `network-failures` (points, trap, Q3) |  |
| E49. Latency (100 ms example; sources: distance, DNS, TLS, queueing, server, DB, cache miss, disk; A → B → C → DB) | concept `latency-and-bandwidth` (points, comparison row Limited by, Example) |  |
| E50. Bandwidth (1 Gbps) | comparison row Unit; glossary `bandwidth` |  |
| E50.1. Latency vs bandwidth memory trick (pair) | concept `latency-and-bandwidth` (hook, reworded) |  |
| E51. Network Partition (A and B alive, cannot talk; replication, consistency, consensus, failover, quorums, CAP) | tree `network-partition`, `quorum`, `cap-theorem`; glossary | one line each; depth left to System Design |
| E52. HTTP/2: system design view | concept `http-versions` (Interview Q "What does HTTP/2 change in a system design?") |  |
| J0. Now connect everything: GET a URL | concept `request-journey` |  |
| J1. Step 1: DNS; J1. Step 1: DNS | concept `dns` (Mermaid); journey owned by `request-journey`; `request-journey` Steps: Resolve (links dns) |  |
| J2. Step 2: Network | Steps: Travel (links switches-and-routers, ip-addressing) |  |
| J3. Step 3: TCP/TLS (QUIC for HTTP/3); J3. Step 3: TCP/TLS (QUIC for HTTP/3) | concept `tls-https` (TLS step, Mermaid); concept `http-versions` (QUIC row); Steps: Connect; tree `journey-connection-setup`, `journey-quic-path` | TCP handshake part belongs to `tcp-handshake` |
| J4. Step 4: Load balancer | concept `request-journey` (Steps: Balance) |  |
| J5. Step 5: Server (Linux machine runs the Java process) | Steps: Accept |  |
| J6. Step 6: Process | Steps: Run (links processes) |  |
| J7 (part: thread or event-driven architecture); J7. Step 7: Thread (or event-driven) | comparison `thread-per-request-vs-event-loop`; Steps: Run and Accept (links thread-pools, io-multiplexing) |  |
| J8. Step 8: Memory (heap, stack, CPU caches, Redis) | Steps: Run (links stack-and-heap) | CPU caches left to memory-hierarchy |
| J9. Step 9: Database (cache miss → DB pool → PostgreSQL) | concept `request-journey` (Steps: Query) |  |
| J10. Step 10: database → OS → filesystem/page cache → storage; J10. Step 10: Disk (filesystem, page cache, storage) | Mermaid in `files-and-file-descriptors`; Steps: Read (links files-and-file-descriptors) |  |
| J11. Step 11: Response (back through LB and network; 200 OK) | Steps: Return |  |
| J.MM. The complete mental model map | concept `request-journey` (Steps) | the OS list underneath is the topic list of the tech |
| J.SD. How this leads to system design (LB, cache, replicas, queue, CDN) | concept `request-journey` (points: Scaling chain) |  |
| J.C. Connection chains (header) | concept `request-journey` (points) |  |
| J.C1. Chain 1: process → thread → race → mutex/semaphore → deadlock | points: Concurrency chain; picker rows |  |
| J.C2. Chain 2: thread does I/O, blocking vs non-blocking | spine step 1; concept `blocking-and-non-blocking-io` |  |
| J.C4. Chain 4: one server → LB → cache → DB → replication → queue | points: Scaling chain |  |
| J.C5. Chain 5: Failures (network → timeout → retry → duplicate → idempotency) | concept `request-journey` (points: Failure chain) |  |
| J.NEXT. Next step: distributed systems | tree `network-partition` (quorum, CAP) |  |
| Q0. Interview cheat sheet (header) | Interview Qs across the unit |  |
| Q1. What is a process? | concept `processes` (sayIt); glossary `process` |  |
| Q2. Process vs thread? | concept `threads` (Interview Q) |  |
| Q3. Q: Concurrency vs parallelism? | concept `concurrency-and-parallelism` (sayIt) |  |
| Q4. Q: What is a race condition? | concept `race-conditions` (sayIt) |  |
| Q5. Q: Mutex vs semaphore? | comparison `mutex-vs-semaphore` (embedded); concept `semaphores` sayIt |  |
| Q6. Q: What is deadlock? | concept `deadlocks` (hook, sayIt) |  |
| Q7. What is virtual memory? | concept virtual-memory (Interview Q 1, sayIt) |  |
| Q8. What is a page fault? | concept paging-and-page-faults (Interview Q 2, trap) |  |
| Q9. Blocking vs non-blocking I/O? | concept `blocking-and-non-blocking-io` (Interview Q 1) | site separates readiness (epoll) from completion (async), which the reference answer lumps together |
| Q10. What is a system call? | concept `what-is-an-os` (Interview Q) |  |
| Q11. Q: TCP vs UDP? | concept `tcp-and-udp` (sayIt) |  |
| Q12. Q: Why TCP 3-way handshake? | concept `tcp-handshake` (sayIt) |  |
| Q13. Q: Flow vs congestion control? | concept `flow-and-congestion-control` (sayIt) |  |
| Q14. Q: What is DNS? | concept `dns` (hook, sayIt); glossary `dns-term` |  |
| Q15. Q: What is a load balancer? | concept `load-balancers-and-proxies` (sayIt, glossary `load-balancer`) |  |
| Q16. Q: Reverse proxy? | glossary `reverse-proxy`; concept bullet |  |
| Q17. Q: What is a CDN? | concept `caching-and-cdn` (Q2); glossary `cdn` |  |
| Q18. Q: Why connection pooling? | concept `connection-pooling` (Q1, sayIt) |  |
| Q19. Q: Why timeout? | concept `network-failures` (bullet, points) |  |
| Q20. Q: Why retry? | concept `network-failures` (points: Retry rules, Q3) |  |
| Q21. Q: Why idempotency? | concept `network-failures` (Q1, Q2) |  |
| Q22. Q: What is network partition? | glossary `network-partition`; tree note |  |
| L0. Two layer models: OSI 7, TCP/IP 4 (or 5) | concepts osi-model, tcp-ip-model; comparison osi-vs-tcp-ip |  |
| L1. OSI model: 7 layers | concept osi-model (table, sayIt, glossary osi-model-term) |  |
| L2. What each OSI layer does | concept osi-model (table); tree nodes upper-layers, transport-layer, network-layer, data-link-layer, physical-layer |  |
| L2.7. Layer 7 Application | osi-model table row; tree node application-layer; glossary application-layer | examples HTTP, DNS, SMTP, SSH (FTP left out as rarely asked) |
| L2.5. Layer 5 Session (handled by apps/libraries) | osi-model table row and point "Layers 5 and 6"; tree node session-layer | X.200 7.3.2.1 wording for the job |
| L2.4. Layer 4 Transport | osi-model table row; tree node transport-layer | TCP/UDP feature lists left to topic transport (tcp-and-udp owns them) |
| L2.3. Layer 3 Network | osi-model table row; tree node network-layer |  |
| L2.2. Layer 2 Data Link (MAC, frames, switches, error detection) | osi-model table row; tree node data-link-layer |  |
| L2.1. Layer 1 Physical | osi-model table row; tree node physical-layer |  |
| L.MEM. One question per OSI layer | osi-model table, column "Answers" | rewritten in new words |
| L3. TCP/IP model (4 layers: Application, Transport, Internet, Network Access/Link) | tcp-ip-model points; tree nodes internet-layer, link-layer | RFC 1122 name is "Link layer" |
| L3.1. 4-layer TCP/IP vs 5-layer teaching model (pair) | tree node five-layer-model |  |
| L4. OSI to TCP/IP mapping | comparison osi-vs-tcp-ip (row "Mapping"); tcp-ip-model Interview Q 1 | RFC 1122 says the application layer combines OSI presentation and application; TCP/IP has no session layer, so 5-7 → Application is kept as the usual mapping |
| L5. TCP/IP 4 layers (examples per layer) | tcp-ip-model points; tree nodes internet-layer, link-layer; glossary internet-layer, link-layer |  |
| L6. Why two models? (OSI vs TCP/IP) | comparison osi-vs-tcp-ip (rows "What it is", "Used for", verdict); osi-model Interview Q 3; tcp-ip-model trap |  |
| L7. Where do TCP, IP, HTTP fit? | osi-model Interview Q "Where do HTTP, TCP, IP and Ethernet sit?" |  |
| L8. What happens down and up the stack for an HTTP request | tcp-ip-model How it works bullet 1 and Example (running example GET /orders/42) | shown as one encapsulation text block instead of a second picture |
| L9. Encapsulation | tcp-ip-model point, Example, Interview Q 2; tree node encapsulation; glossary encapsulation |  |
| L10. Decapsulation | tcp-ip-model point "Decapsulation"; glossary encapsulation (aka decapsulation) |  |
| L11. PDU names (Data → Segment/Datagram → Packet → Frame → Bits) | tcp-ip-model point "PDU names", Interview Q 3; tree node pdu-names; glossary pdu, segment, datagram, frame-network | application unit named "message" (RFC 1180) |
| L12. Switch vs Router (L2 MAC vs L3 IP) | comparison switch-vs-router (embedded in switches-and-routers) |  |
| L13. Hub (Layer 1, repeats to all ports; replaced by switches) | tree node hub under physical-layer; glossary hub; verdict line of comparison switch-vs-router (part: hub vs switch) |  |
| L14. Firewall (L3/L4 vs L7 WAF) | switches-and-routers point "Firewall layers", Interview Q 3; tree nodes firewall, packet-filter-firewall, waf, security-group; glossary firewall, waf, security-group |  |
| L15. Load balancer and layers (L4 IP/port, L7 HTTP; /api/users vs /api/payments) | comparison `l4-vs-l7-load-balancer` |  |
| L16. Where does DNS fit? | concept `dns` (trap) |  |
| L16.1. Trap: "DNS is Layer 3 because it gives an IP" | concept `dns` (trap) |  |
| L17. Where does TLS fit? | concept `tls-https` (bullet 2) |  |
| L17.1. Trap: "TLS is Layer 6" is an oversimplification | concept `tls-https` (bullet 2) |  |
| L18. Complete practical stack (HTTPS with HTTP/2; with TLS) | tcp-ip-model bullet 3 and Example; HTTP/3 over QUIC/UDP linked to http-versions |  |
| L19. System design connection of the layers | concept `request-journey` (Steps) | the layer per component is owned by osi-model |
| L.FINAL. What to memorise (OSI layers with examples; TCP/IP; mapping; practical stack; PDU sequence) | OSI part: osi-model table; TCP/IP, mapping: comparison osi-vs-tcp-ip; practical stack: tcp-ip-model bullet + example; PDU sequence: tcp-ip-model points + tree node pdu-names |  |
| L.FINAL.Q. Q: Explain the OSI model | osi-model Interview Q 1 and sayIt | rewritten |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| O7.SD. Microservices communicate through network sockets, HTTP, gRPC, message queues | Mixes layers: HTTP, gRPC and message brokers all run over sockets, and "message queue" here means a broker, not the IPC message queue of O7 (a kernel queue on one host) | IPC table: sockets for same host (Unix domain) or across hosts; message queue (IPC) defined as kernel-held messages on one host; sayIt "across machines it becomes sockets" | https://man7.org/linux/man-pages/man7/mq_overview.7.html ; https://man7.org/linux/man-pages/man7/unix.7.html |
| O8.1. Syscall examples fork(), exec(), open(), read(), write(), close(), wait() | Listed open() as the Linux system call; with glibc 2.26+ the open() wrapper runs the openat system call (a local strace shows openat) | Point lists openat, read, write, fork, execve; Example shows openat | https://man7.org/linux/man-pages/man2/open.2.html |
| N2.SD. Which protocol: HTTP/HTTPS → TCP, DNS "usually UDP", WebRTC "often UDP" | DNS over TCP left out; HTTP/HTTPS is not always TCP (HTTP/3 uses QUIC over UDP) | DNS servers must support TCP too (large answers, zone transfers); HTTP/1.1 and HTTP/2 on TCP, HTTP/3 on QUIC over UDP; live voice and video on UDP | https://www.rfc-editor.org/rfc/rfc7766 ; https://www.rfc-editor.org/rfc/rfc9114 ; https://developer.mozilla.org/en-US/docs/Glossary/UDP |
| N7. HTTP/1.1 vs HTTP/2 vs HTTP/3 | "Faster connection establishment in many scenarios" (vague); "better behaviour under packet loss" (vague) | New HTTPS connection: TCP + TLS 1.3 = 2 round trips, QUIC = 1, 0-RTT on resumption; a QUIC loss blocks only the streams whose data was in the lost packet; clients fall back to TCP when UDP is blocked | https://www.rfc-editor.org/rfc/rfc9001 ; https://www.rfc-editor.org/rfc/rfc7413 ; https://www.rfc-editor.org/rfc/rfc9000 ; https://www.rfc-editor.org/rfc/rfc9114 |
| N8. HTTPS / TLS | No TLS version or current spec named | TLS 1.3 is RFC 9846 (July 2026, Proposed Standard), which obsoletes RFC 8446 (and the TLS 1.2 document RFC 5246); TLS 1.0 and 1.1 deprecated by RFC 8996 | https://www.rfc-editor.org/rfc/rfc9846 ; https://www.rfc-editor.org/rfc/rfc8996 |
| N13. Reverse proxy examples include "cloud load balancers" | Not every cloud LB is a reverse proxy: AWS NLB works at layer 4 and forwards connections; only L7 ones (ALB) act as HTTP proxies | trap: an L4 load balancer only forwards connections and never reads HTTP | https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html |
| E4 (part: line "100,000 threads → tons of switching → CPU overhead") | Overstated: only runnable threads cause switching; a blocked thread costs memory (its stack), not switches | "Many runnable threads mean many switches and cold caches"; stack memory named separately | https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf ; https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Thread.html |
| E5 (part: "Creating threads repeatedly is expensive", so always pool) | Outdated for Java 21+: virtual threads are cheap and must not be pooled; pools or semaphores limit scarce resources instead | Virtual-thread bullet and Interview Q in `thread-pools` | https://openjdk.org/jeps/444 |
| E6. Race Condition (definition) | Definition says only "concurrent operations accessing shared state"; concurrent reads alone cannot race | Race needs shared data and at least one write (hook, sayIt); Java data race defined as conflicting accesses, one a write | https://docs.oracle.com/javase/specs/jls/se25/html/jls-17.html ; https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf |
| E8.1. Mutex vs Semaphore (pair) | Contrasts only "1 owner" vs "N permits"; omits that a semaphore has no owner, which leaves the common "binary semaphore = mutex" answer standing | Comparison row "Who releases" (owner only vs any thread) and trap "a binary semaphore is not the same as a mutex" | https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/Semaphore.html |
| E15. Page fault ("page isn't in physical RAM ... OS loads page from storage ... a page fault is not necessarily a crash") | Incomplete: it implies every fault means a load from storage. Many faults need no I/O (minor faults: a new zeroed page, a page already in RAM); an invalid access is also a fault and ends in SIGSEGV | Minor (no disk I/O) vs major (reads from disk) faults; valid fault → kernel fixes and retries; invalid → SIGSEGV | https://man7.org/linux/man-pages/man2/getrusage.2.html ; https://docs.kernel.org/admin-guide/mm/concepts.html ; https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys.pdf |
| E17.1. Blocking vs non-blocking table | Vague: non-blocking "doesn't wait in same way"; no mention of how a non-blocking call reports "not ready" | A non-blocking call on an O_NONBLOCK fd fails at once with EAGAIN/EWOULDBLOCK; it is not asynchronous (the caller still copies the data); regular files ignore O_NONBLOCK on Linux | https://man7.org/linux/man-pages/man2/read.2.html ; https://man7.org/linux/man-pages/man2/open.2.html |
| E18. System Call ("common concepts open() read() write() close()"; app → read() → kernel) | Same open/openat mix; also it never separates the library call from the system call | Library call vs system call point (println/printf runs in user space, then write()); openat in the example | https://man7.org/linux/man-pages/man2/intro.2.html |
| E23. TCP 3-way handshake ("SYN: I want to connect", "SYN-ACK: received and ready", "ACK: received your response") | Step meanings left out that the SYN-ACK carries the server's own ISN and acknowledges the client's | Sequence diagram with seq=x, seq=y ack=x+1, ack=y+1 | https://www.rfc-editor.org/rfc/rfc9293 |
| E23.Q1. Q: Why 3 steps? ("establish communication is possible and synchronise sequence state") | Incomplete: misses RFC 9293's principal reason | Each side must send its ISN and see it acknowledged; the 3rd step lets the server reject an old duplicate SYN (prevents false connections) | https://www.rfc-editor.org/rfc/rfc9293 |
| E24. TCP reliability ("Packet 1, Packet 2, Packet 3; packet 2 lost") | TCP does not number packets; it numbers bytes, and ACKs are cumulative | Trap: TCP numbers bytes; ACK 2001 means bytes up to 2000 arrived; diagram uses byte ranges | https://www.rfc-editor.org/rfc/rfc9293 |
| E28. HTTP methods | PUT described as "Replace/update", which blurs it with PATCH | PUT creates or replaces the whole state; PATCH sends a set of changes and is not idempotent by default (RFC 5789) | https://www.rfc-editor.org/rfc/rfc9110 ; https://www.rfc-editor.org/rfc/rfc5789 |
| E30. HTTP/1.1 | "HTTP/1.1 commonly uses persistent TCP connections" (loose) | Persistence is the HTTP/1.1 default; `Connection: close` opts out; pipelining exists but browsers do not enable it | https://www.rfc-editor.org/rfc/rfc9112 ; https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Connection_management_in_HTTP_1.x |
| E31. HTTP/2 (binary framing, multiplexing, streams, header compression) | Lists HTTP/2 features as if all are in use; never says server push is gone | Features kept (comparison `http1-vs-http2-vs-http3`; tree `http-2`, `http2-binary-framing`, `hpack`); server push is off by default in Chrome 106+ and Firefox 132+ (tree `server-push`), 103 Early Hints suggested instead | https://developer.chrome.com/blog/removing-push ; https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/132 |
| E32. HTTP/3 | "Reducing some head-of-line blocking effects" (vague) | Only streams with data in the lost packet wait; others continue (RFC 9000, section 13); HTTP/3 is RFC 9114, Proposed Standard | https://www.rfc-editor.org/rfc/rfc9000 |
| E33. TLS / HTTPS | "Cryptographic handshaking establishes session keys" with no handshake shape, version or cost | TLS 1.3 handshake: ClientHello with key share, ServerHello + Certificate + CertificateVerify + Finished, 1 round trip; 0-RTT resumption data can be replayed; ECDHE gives forward secrecy | https://www.rfc-editor.org/rfc/rfc9846 |
| E36. Subnet (10.0.0.0/24, "/24 = network prefix bits", no host count) | No address or host count; reads as if all 256 are usable | 256 addresses, 254 usable hosts in classic subnets (.0 network, .255 broadcast); AWS reserves 5, so 251; AWS subnet size /16 to /28 | https://www.rfc-editor.org/rfc/rfc4632 ; https://docs.aws.amazon.com/vpc/latest/userguide/subnet-sizing.html |
| E38. Socket ("IP + Port → Endpoint → Socket") | Treats a socket as just IP + port | A socket is an OS endpoint returned as a file descriptor; a connected TCP socket is tied to one 4-tuple; accept() returns a new socket per client | https://man7.org/linux/man-pages/man2/socket.2.html ; https://man7.org/linux/man-pages/man2/accept.2.html ; https://www.rfc-editor.org/rfc/rfc9293 |
| E40. L4 vs L7 load balancer: L4 described only by IP/port, L7 by HTTP fields (/api vs /images) | L4 balancers can also terminate TLS (AWS NLB TLS listener); the real split is per connection vs per request | comparison rows "Decides once per" and "TLS" | https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-listeners.html |
| E43.2. Cache invalidation via TTL, explicit invalidation, write-through/write-back | Misses the practical fix for static files: a long-cached file cannot be deleted from all caches; change its URL | bullet and Q3: versioned file names, purge as fallback; TTL kept in the bullet; write-through/write-back left to the System Design tech (advanced here) | https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching |
| E46. Timeout: "wait only this long" as one timeout (DB 2 s, HTTP 5 s) | There are two timeouts with different jobs; Java's request timeout is infinite if not set | points: connect vs request timeout; Example sets both | https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/java/net/http/HttpRequest.Builder.html |
| E48. Idempotency key shown as `Idempotency-Key: abc123` as if standard | The header is an expired IETF Internet-Draft (-07, 15-10-2025), not a standard; the draft recommends a UUID-like random key | Q2 states the draft status; Example uses a random UUID reused on retries | https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/ |
| E53. HTTP/3: system design view | Says the advantage but not the catch | Added: UDP can be blocked, so clients SHOULD try TCP-based HTTP (RFC 9114 3.1) | https://www.rfc-editor.org/rfc/rfc9114 |
| J.C3. Chain 3: Domain → DNS → IP → port → socket → TCP/UDP → HTTP → TLS; J.C3. Chain 3 ends "HTTP → TLS" | As an order of events, TLS is placed after HTTP; for HTTPS the TLS handshake runs after TCP connects and before the first HTTP byte; TLS is not after HTTP: for HTTPS the TCP and TLS handshakes finish before the first HTTP byte, and HTTP runs inside TLS | The IP → port → socket part lands in ports-and-sockets and spine step 2; the correct order DNS → IP → TCP → TLS → HTTP is flagged for request-journey, which owns the full journey; points: "... socket → TCP → TLS → HTTP"; trap on the order | https://www.rfc-editor.org/rfc/rfc9110 (4.3.3) ; https://www.rfc-editor.org/rfc/rfc9846 |
| L1.1. OSI mnemonics (top-down and bottom-up) | Two mnemonics, more to remember than the layers | One bottom-up mnemonic only ("Please Do Not Throw Sausage Pizza Away"); top-down one dropped | https://www.itu.int/rec/T-REC-X.200-199407-I/en (layer order) |
| L2.6. Layer 6 Presentation (format, encryption, compression; JSON, XML, TLS, JPEG, UTF-8) | Lists encryption and TLS as layer 6 examples; X.200 defines layer 6 as a common representation (syntax) of data, and TLS does not sit neatly there | Layer 6 = how the data is written (UTF-8, JSON, compression); TLS placement linked to tls-https; XML and JPEG dropped as duplicate examples | https://www.itu.int/rec/T-REC-X.200-199407-I/en (7.2.2.2) |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| Interrupts vs traps / exceptions | `what-is-an-os` (bullet), tree `interrupt`, `trap` | Asked when explaining how the kernel gets control |
| Monolithic kernel vs microkernel (Linux monolithic) | `what-is-an-os` (bullet, Interview Q), tree | Common OS interview question (GeeksforGeeks list) |
| System call vs library call | `what-is-an-os` (point) | Clears up println/printf vs write() |
| Mode switch is not a context switch | `what-is-an-os` (trap), `context-switching` (bullet) | Frequent wrong answer |
| PCB, process states, address-space parts | `processes` (point, diagram, bullet), tree | Core process vocabulary |
| fork / exec / wait, copy-on-write | `processes` (points, Interview Q), tree | How processes start on Unix |
| Zombie vs orphan, init and subreapers | `processes` (trap, Interview Q, Example) | Common interview pair |
| Containers = namespaces + cgroups, shared kernel | `processes` (bullet), tree, glossary | Links OS processes to deployment |
| Threading models 1:1, M:1, M:N; Java virtual threads (Java 21) | `threads` (bullet, point), tree | Modern Java answer |
| Voluntary vs involuntary switches, /proc counters | `context-switching` (points, Example) | Observable on any Linux box |
| Indirect cost (cold caches, TLB) | `context-switching` (trap) | The real cost interviewers probe |
| Convoy effect, MLFQ, Linux EEVDF (since 6.6) | `cpu-scheduling` (table, bullet, point), tree | What real kernels use |
| Unbounded queue in newFixedThreadPool, rejection policies | `thread-pools` (trap, bullet), tree | Real production pitfall |
| Little's Law for I/O-bound sizing | `thread-pools` (Interview Q) | A citable sizing rule (JEP 444) |
| Tomcat defaults (threads.max 200, virtual threads off) | `thread-pools` (Defaults), tree | Running example is Spring Boot 4.1 |
| Compare-and-swap and the lock-free retry loop; Java atomic classes | concept `race-conditions` (point, Example AtomicInteger); tree `compare-and-swap`, `atomic-classes` | in the unit scope; asked as the lock-free alternative |
| Check-then-act (named pattern) and data race vs race condition | concept `race-conditions` (point, Interview Q); tree `check-then-act`, `data-race` | common follow-up question |
| Conditional UPDATE as the cross-instance fix | concept `race-conditions` Interview Q | ties the race to the running example and PostgreSQL |
| Spinlock vs blocking mutex, reentrancy, lock granularity, fairness default | concept `locks` (points, Defaults, Interview Qs) | interview staples; no separate mutex-vs-spinlock comparison (plan) |
| Monitor and condition variable | concept `locks` bullet; tree `monitor-lock` > `condition-variable` | Java synchronized / wait / notify |
| Priority inversion and priority inheritance | concept `locks` bullet; tree `priority-inversion` > `priority-inheritance` | in the unit scope (classic follow-up) |
| P and V, producer-consumer (bounded buffer), BlockingQueue | concept `semaphores` bullets; tree `p-and-v`, `producer-consumer`, `blocking-queue` | classic semaphore use |
| Semaphore fairness default; per-JVM permits across 3 instances; release in finally | concept `semaphores` (point, Interview Qs) | real design pitfalls |
| Livelock and starvation contrasted with deadlock | comparison `deadlock-vs-starvation-vs-livelock`; tree `livelock`, `thread-starvation` | in the unit scope; OSTEP shows tryLock back-off can livelock |
| Wait-for graph; PostgreSQL deadlock detection, abort and retry; deadlock_timeout 1 s | concept `deadlocks` (bullet, Interview Q); tree `wait-for-graph` | how detection works in practice |
| Java does not break deadlocks | concept `deadlocks` point | JLS: the language neither prevents nor requires detection |
| Cache line (64 bytes on Intel Core / Xeon) and cache line fill | memory-hierarchy (point, tree cache-line, example output) | explains why locality pays; asked with false sharing |
| False sharing | memory-hierarchy (Interview Q 3, tree) | common follow-up in concurrency/performance interviews |
| Per-core L1/L2 vs shared L3 | memory-hierarchy (point, tree cache-levels) | a frequent "where do caches sit" question |
| Approximate latency ladder (L1 0.5 ns, L2 7 ns, RAM 100 ns, disk seek 8 ms) | memory-hierarchy (Mermaid) | gives orders of magnitude; marked approximate, from Norvig |
| -Xss 1024 KB (Linux/x64), max heap ≈ 25% of RAM (MaxRAMPercentage), metaspace unlimited by default (JDK 25) | stack-and-heap (points, tree jvm-native-memory) | real defaults that explain container OOMs and thread costs |
| StackOverflowError vs OutOfMemoryError; Java leaks despite GC | stack-and-heap (Interview Qs, Java example) | commonly asked Java memory questions |
| Overcommit (vm.overcommit_memory modes, default 0) and OOM killer, cgroup memory.max | virtual-memory (points, tree, Interview Q 2) | explains "malloc succeeded but the process was killed" and container kills |
| VSZ vs RSS | virtual-memory (example, Interview Q 3, tree rss) | what you read in ps/top in production |
| Minor vs major page faults | paging-and-page-faults (points, tree) | see the E15 correction |
| Internal vs external fragmentation; segmentation; paging vs segmentation comparison | paging-and-page-faults (bullets, tree), comparison paging-vs-segmentation | classic OS interview questions (GeeksforGeeks list) |
| Huge pages (2 MiB / 1 GiB on x86), multi-level page tables | paging-and-page-faults (point, tree) | TLB reach; how page tables stay small |
| Page replacement policies FIFO, LRU, Optimal, Clock; Belady's anomaly; dirty pages; Linux active/inactive LRU lists | page-replacement (table, example, Interview Qs, tree) | reference only names "page replacement"; interviews ask the policies and Belady's anomaly |
| io_uring (since Linux 5.1) and POSIX AIO as the real async models | point, table, tree `io-uring`, `posix-aio` | the reference names async I/O but no API |
| EAGAIN / O_NONBLOCK, regular files ignore O_NONBLOCK | points, comparison, glossary | precise "not ready" semantics; common follow-up |
| Trap: non-blocking = async, or faster | trap in `blocking-and-non-blocking-io` | Spring docs: non-blocking does not make apps faster |
| Java angle: java.io blocks, NIO configureBlocking(false), virtual threads (Java 21+) | tree `java-io-styles`; Java example (real output) | Java-only tech |
| C10k problem | Why of `io-multiplexing`; tree `c10k-problem` | the reason multiplexing exists |
| select FD_SETSIZE 1024 limit, level- vs edge-triggered epoll, kqueue/IOCP, Java Selector uses epoll on Linux | table, Interview Qs, tree | commonly asked follow-ups |
| Trap: Node.js single thread cannot wait on many I/Os; worker pool for file I/O | trap in `io-multiplexing` | common misconception |
| Comparison thread-per-request vs event loop | `thread-per-request-vs-event-loop` | system-design angle of M.OS11/M.OS12 |
| fd 0/1/2, open-file limit RLIMIT_NOFILE, EMFILE | points, Interview Q, glossary | M.OS10 in practice ("Too many open files") |
| fsync, write() only reaches the page cache, fsync the directory of a new file | trap, point, sayIt | durability is asked in database and storage design |
| IOPS vs throughput (throughput = IOPS x I/O size) | tree `iops` | system-design storage sizing |
| Pipe capacity, FIFO open blocks, POSIX mq names, shm + semaphores, SCM_RIGHTS | tree notes under `ipc` | short distinct facts per mechanism |
| SIGTERM vs SIGKILL vs SIGINT, graceful shutdown (Spring Boot 4.1 defaults, Kubernetes 30 s grace) | points, trap, Defaults, Interview Q, JVM shutdown hook example | scope note; asked in deployment questions |
| Classful A/B/C is legacy, replaced by CIDR | ip-addressing trap; tree node cidr | Common wrong answer; InterviewBit still asks "classes of IPv4" |
| Loopback 127.0.0.0/8, ::1 and link-local 169.254.0.0/16, fe80::/10 | tree nodes loopback-addresses, link-local-addresses; glossary | Asked as "special IP addresses" |
| IP TTL / IPv6 hop limit | tree node ip-ttl-hop-limit; glossary ttl-ip | Needed for traceroute and loop protection |
| IPv4 vs IPv6 details (no broadcast, no header checksum, SLAAC vs DHCP, NAT need) | comparison ipv4-vs-ipv6 | Frequently asked "How is IPv6 different from IPv4?" |
| AWS VPC public/private subnet definitions and reserved addresses | tree node vpc-subnets; ip-addressing point and Q | Running example sits in a VPC |
| Port ranges (RFC 6335) and privileged ports below 1024 on Linux | ports-and-sockets point; tree nodes port-ranges, well-known-ports | "What are well-known ports?" is a real question |
| Linux ephemeral range 32768-60999 and port exhaustion (EADDRNOTAVAIL) | ports-and-sockets point; tree nodes ephemeral-ports, ephemeral-port-exhaustion | Real production failure tied to connection pooling |
| 4-tuple, socket(), bind(), listen(), accept(), connect() as Steps | ports-and-sockets How it works, Interview Q 1 | Explains how one port serves many clients |
| Listen backlog and somaxconn 4096 since Linux 5.4 (was 128) | ports-and-sockets point; tree node listen-backlog | Version-dependent default interviewers mention |
| 0.0.0.0 vs 127.0.0.1 bind trap | ports-and-sockets trap; glossary all-interfaces | Common container / deployment mistake |
| Java ServerSocket + client example with real output | ports-and-sockets Example | Shows accept() returning a new socket and an ephemeral client port |
| MAC address, ARP, NDP | switches-and-routers points, Interview Q 1; tree nodes mac-address, arp, ndp | "What is the purpose of ARP?" is asked |
| Routing table, longest prefix match, default gateway, no-route ICMP unreachable | switches-and-routers points and bullet; glossary | Explains how a router decides |
| Switch MAC learning and flooding | switches-and-routers bullet; comparison rows | Explains switch vs hub vs router |
| MACs change per hop, IPs stay unless NAT | switches-and-routers trap and Example | Common wrong answer |
| Security groups (stateful, allow rules) | tree node security-group; glossary | Cloud form of an L3/L4 firewall |
| ICMP, ping, traceroute | switches-and-routers Interview Q 2; tree nodes icmp, ping, traceroute | InterviewBit asks "What is ping? What is TTL?" |
| Ethernet FCS trailer | tcp-ip-model Example; glossary frame-network | Makes "header and trailer" in encapsulation accurate |
| Byte stream has no message boundaries; framing; Java demo | `tcp-and-udp` (point, Example, Interview Q); glossary `byte-stream`, `message-framing` | common bug and interview follow-up |
| UDP keeps datagram boundaries (one receive = one datagram) | `tcp-and-udp` (point); comparison row | true contrast to the byte stream |
| Header sizes 20 vs 8 bytes | comparison `tcp-vs-udp` | commonly asked number |
| DNS over TCP (RFC 7766), QUIC on UDP | `tcp-and-udp` (How bullets, tree) | the reference's DNS/HTTP lines were outdated |
| Connection close with FIN, half-close, TIME_WAIT (2×MSL; 60 s on Linux) | `tcp-handshake` (Mermaid, points, Defaults, Interview Q, tree) | asked in backend interviews (TIME_WAIT pile-up) |
| RST; SYN flood, SYN queue, SYN cookies; TCP Fast Open | `tcp-handshake` (bullets, Interview Q, tree) | security and ops follow-ups |
| ISN hard to guess (clock plus keyed hash) | tree node `isn` | why ISNs are not 0 |
| Cumulative ACK, fast retransmit on 3 duplicate ACKs, RTO (1 s initial, doubling), SACK, checksum | `tcp-reliability` (points, Mermaid, Defaults, tree) | the reference named them without explaining |
| TCP head-of-line blocking (one line, link) | `tcp-reliability` (bullet) | bridge to HTTP/2 vs HTTP/3 |
| rwnd, zero window, cwnd, min(rwnd, cwnd) | `flow-and-congestion-control` (points), comparison | GfG asks cwnd vs rwnd |
| Slow start, congestion avoidance, AIMD, fast recovery, initial window 10 (RFC 6928), CUBIC (0.7 cut, Linux default), BBR (model-based) | `flow-and-congestion-control` (How bullets, Example sawtooth, Defaults, tree) | interviewers ask how TCP reacts to loss |
| Slow start after idle (Linux default 1) and "reuse warm connections" | `flow-and-congestion-control` (Defaults, Interview Q) | backend relevance |
| Resolution path for api.shop.example (resolver → root → TLD → authoritative, caching at each hop) | concept `dns` (Mermaid) | most asked DNS question; reference only drew the hierarchy |
| Recursive vs iterative queries | concept `dns` (points) | reference names "recursive query" only |
| DNS over TCP (truncation, zone transfers, required since RFC 7766) | concept `dns` (points, Q) | common "DNS is only UDP" mistake |
| CNAME not allowed at the zone apex | concept `dns` (Q); glossary `cname-record` | common interview follow-up on records |
| TTL and "propagation" is cache expiry | concept `dns` (points, Q) | practical failover question |
| Negative caching | glossary `negative-caching` | in the owned glossary list |
| Cacheable column (POST/PATCH only with explicit freshness) | concept `http-basics` (table) | reference asks for cacheable but gives no rule |
| 429 (RFC 6585), 409, 304 meanings | concept `http-basics` (bullets) | reference lists codes without meanings |
| 502 vs 503 vs 504 | concept `http-basics` (points, Q); glossary | commonly asked with load balancers |
| HTTP is stateless and how login adds state (cookies, tokens) | concept `http-basics` (points, Q) | reference lists cookies and sessions only as words |
| ALPN and Alt-Svc | concept `http-versions` (bullet); tree `alpn`, `alt-svc` | how a client picks h2 or h3 |
| QUIC connection migration | concept `http-versions` (bullet); tree `connection-migration` | mobile networks, often asked with HTTP/3 |
| HPACK / QPACK names | comparison row; tree; glossary `hpack` | reference says "header compression" only |
| Certificate chain validation (issuer links, trust anchor, dates, name) | concept `tls-https` (bullet 1); tree `certificate-chain` | reference says "trusted chain" only |
| Forward secrecy via ECDHE | concept `tls-https` (points, Q); glossary | standard TLS 1.3 interview follow-up |
| SNI | concept `tls-https` (Q); tree `sni`; glossary | one IP, many certificates |
| mTLS | tree `mtls` | client certificates between services |
| SSE trap: one-way feeds need no WebSocket | concept `real-time-connections` (trap) | common over-engineering answer |
| SSE reconnect with Last-Event-ID | concept `real-time-connections` (Q); tree `sse` |  |
| Scaling long-lived connections (one server per client, fan-out, file descriptors, LB idle timeouts) | concept `real-time-connections` (bullets) | system design angle (M.NW11) |
| WebSocket over HTTP/2 (RFC 8441) | tree `websocket-over-http2` | in scope note |
| Cache-Control directives (max-age, no-cache, no-store, private, public, s-maxage) | concept `caching-and-cdn` points, trap; glossary | "no-cache vs no-store" is a classic interview trap |
| ETag / If-None-Match → 304 Not Modified | `caching-and-cdn` Example; tree `etag-revalidation` | how a cache refreshes cheaply |
| Versioned file names (cache busting) | `caching-and-cdn` bullet, Q3; tree `cache-busting` | the standard fix for stale static files |
| Anycast and DNS steering to the nearest edge | tree `cdn-anycast`; bullet | asked with "how does a CDN find the nearest server" |
| RTT, round-trip count of a new HTTPS connection | `latency-and-bandwidth` Example | explains why small calls are latency-bound |
| Tail latency, p99, fan-out arithmetic | `latency-and-bandwidth` points, bullet, Q2 | standard system-design metric |
| Bandwidth-delay product | tree `bandwidth-delay-product` | links latency to TCP windows |
| Connect vs request timeout | `network-failures` points, Example | see Corrected |
| Retry amplification across layers (243×), retry at one layer | `network-failures` trap | the real cause of retry storms |
| Idempotency-Key draft status, 422 for reused key | `network-failures` Q2; tree `idempotency-key` | status had to be stated as checked |
| Circuit breaker states (open, half-open) | tree `circuit-breaker` | one line, as scoped |
| Quorum n/2 + 1, CAP in one line | tree under `network-partition` | bridge to System Design |
| L4 per connection vs L7 per request; two connections at L7 | comparison `l4-vs-l7-load-balancer` | the real technical difference |
| Active vs passive health checks; ALB default path / | concept bullet; tree `lb-health-check` | asked with "how does the LB know a server is down" |
| LB as single point of failure; AWS ALB needs two zones | `load-balancers-and-proxies` points, Q3 | common follow-up |
| HikariCP defaults, PostgreSQL max_connections, instances × pool budget | `connection-pooling` points, Defaults, bullet | numbers interviewers expect |
| Pool sizing guidance (cores × 2 + spindles) | `connection-pooling` Q3 | the "how big" follow-up |
| PgBouncer | tree `pgbouncer` | external pooler when instances multiply |
| Symptom or question → concept picker | `request-journey` table | the playbook's main tool |

## Dropped
| Reference item | Reason (rare / advanced / duplicate / unverifiable) |
|---|---|
| (no whole item) | |

### Details placed elsewhere or cut, inside items listed above
| Reference item part | What happened |
|---|---|
| O12 (part: disk scheduling, RAID basics) | cut: advanced / out of scope per the spec (no RAID or disk scheduling) |
| E4 (all except the 100,000-threads line). Context Switching (save/restore registers, PC, stack; overhead; interview answer) | also: concept `context-switching` (Steps, points, Interview Q) |
| E5 (all except the creation-cost line). Thread Pool (reuse, bounded concurrency, resource management) | also: concept `thread-pools` (points, picture) |
| E21 (part). "Client → TCP connection → Server" sketch | cut: duplicate of the handshake diagram |
| E25 (part). Example numbers "server processes 100 MB/s, sender sends 1 GB/s" | cut: illustrative only, not a fact; the idea is kept as "a slow consumer app" in the comparison |
| E26 (part). "Client → Network → Router → Router → Server" sketch | cut: duplicate; the comparison row "routers and links on the path" carries it |
| E27 sample JSON with a person's name | cut: duplicate: replaced by the site's running example (order 42) |
| E36. "Cloud networks heavily use VPCs, subnets, security groups, routing" list | cut: duplicate of tree nodes vpc-subnets, security-group, routing-table |
| E52 "can improve performance for many workloads" (generic sentence) | cut: duplicate: replaced by the concrete Interview Q on fewer connections |
| L2.7 (part). FTP as a layer 7 example | cut: rare today; four examples are enough |
