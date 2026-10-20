# Coverage: Docker
Reference: reference/docker.md  ·  Last updated: 20-10-2026

Every reference item (key list: the numbered sections, plus each question, pattern and "X vs Y" row inside them) appears in exactly
one of Mapped, Corrected or Dropped. A section whose parts went to different places has one row here (Corrected wins over
Mapped), and its other parts are listed under "Details placed elsewhere or cut". Sources for corrections are primary pages.

## Mapped
| Reference item (key + short title) | Landed in | Note |
|---|---|---|
| D0. What Docker is for (part); D0 (part: learn the basics first) | concept containers-and-vms (Why it exists); concept docker-playbook (Why it exists) | Kubernetes part of D0 is for the Kubernetes tech |
| D1.Q1. Can a Linux container run directly on a Windows kernel? | containers-and-vms (point "Linux kernel needed", Interview Q 1); tree windows-containers | WSL 2 named as the Windows default |
| D1.Q2. Are containers completely isolated?; D1.Q2. Are containers completely isolated? (part: security depends on configuration and host protections) | namespaces-and-cgroups (point "Shared kernel", trap, Interview Q 2); concept container-runtime-security (hook, Interview Q) |  |
| D1.Q3. Does a container contain a full OS? | containers-and-vms (trap, Interview Q 2) |  |
| D2. Architecture: client, daemon, image, container, registry; D2. Docker Desktop; D2. Typical flow (Dockerfile → build → image → run → container); D2. Registry not required for local build and run; D2. Registry (part) | docker-architecture (Mermaid, sayIt, Interview Q 1); docker-architecture (bullet, point "Engine vs Desktop", Interview Q 3); glossary docker-desktop; docker-architecture (Example); docker-architecture (sayIt, Interview Q 2); registries (Why it exists, Interview Q 1) | image/container rows link to images-and-layers |
| D5. RUN vs CMD vs ENTRYPOINT (table, example, rules, exec form) (with S31.3 and S32.Q1); D5. Part: prefer exec form for predictable signal handling | concept run-cmd-entrypoint (embedded comparison run-vs-cmd-vs-entrypoint, points, trap, Example, Interview Qs); comparison exec-form-vs-shell-form; concept signals-and-graceful-shutdown (points, Interview Q 1) | Rules covered: CMD overridden by docker run args; args appended to an exec-form ENTRYPOINT; CMD as default args to ENTRYPOINT; prefer exec form for signals. Example changed from `--server.port=8080` to the payment-service profile args Exec vs shell form comparison owned by run-cmd-entrypoint (listed in confusedWith) |
| S28.Q2 Can Kubernetes run without Docker? | concept docker-and-orchestration (Interview Q 2, point "No Docker Engine needed") | added version: dockershim removed in 1.24 |
| S28.Q3 Is Docker Compose the same as Kubernetes? | concept docker-and-orchestration (Interview Q 3) |  |
| S28.Q4. Is a Pod the same as a container? | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S28.Q5. Is a Service the same as a Deployment? | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S29 (section: frequent differences, Docker rows only) | S29.8 -> images-and-layers (image-vs-container; linked from docker-playbook confusedWith); S29.2 env part -> env-and-secrets; S29.4 limit part -> resource-limits; S29.9 container side -> here | Kubernetes rows covered by the Kubernetes tech (PLAN.md) |
| S29.1. Deployment vs StatefulSet vs DaemonSet | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S29.2. Secret vs environment variable (part: environment variables are not secure storage) | concept env-and-secrets (point "Env vars", Interview Q 2) | Kubernetes Secret part belongs to the Kubernetes tech |
| S29.3. Liveness vs Readiness (and startup probes) | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S29.4. Request vs Limit (part: limit caps usage; CPU throttled; memory overuse terminated) | concept resource-limits (points, trap, Interview Qs 1-2) | Request part is covered by the Kubernetes tech; Docker's soft-limit counterpart (reservation) is in Interview Q 2 |
| S29.5. ClusterIP vs NodePort vs LoadBalancer vs Ingress | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S29.6. Horizontal vs Vertical scaling | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S29.7. ConfigMap vs Secret | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S29.8. Image vs Container | comparison image-vs-container; images-and-layers Interview Q 1 |  |
| S29.9 Container vs Pod (container side) | concept docker-and-orchestration (point "Pod"); glossary pod-term | Pod detail belongs to the Kubernetes tech |
| S30. Docker latest row; S30. Docker row "docker ps lists running containers by default"; S30. Common defaults (part: Docker EXPOSE row, "does not publish a port"); S30 (Docker rows: `docker ps` running only, EXPOSE does not publish, latest is a tag) | registries (point kind default, trap); concept docker-cli-essentials (point); concept port-mapping (trap); comparison expose-vs-publish; concept docker-playbook (three Don't-say rows linking docker-cli-essentials, port-mapping, registries) | Other S30 Docker rows belong to port-mapping and registries Kubernetes rows: Kubernetes tech |
| S31. Final interview revision (section as a whole) | split into its items S31.1–S31.20; Docker items in their concepts, Kubernetes items in the Kubernetes tech |  |
| S31.1. Image = template; container = running instance; S31.1 Image = template; container = running instance | images-and-layers (sayIt), comparison image-vs-container; owner images-and-layers; docker-playbook (Interview Q "Docker in one minute", confusedWith image-vs-container) |  |
| S31.2. Dockerfile defines how to build an image; S31.2 Dockerfile defines how to build an image | concept dockerfile-instructions (hook, sayIt); owner dockerfile-instructions; docker-playbook (story step Write) |  |
| S31.3. RUN at build; CMD and ENTRYPOINT at runtime; S31.3 RUN at build; CMD and ENTRYPOINT at run time | concept run-cmd-entrypoint (hook, trap); owner run-cmd-entrypoint; docker-playbook (build/run bullet, tree nodes build-time-instructions, run-time-settings, env-both-times; confusedWith run-vs-cmd-vs-entrypoint) |  |
| S31.4. docker build builds an image; docker run = create + start; S31.4 docker build builds; docker run creates and starts | concept container-lifecycle (point); concept docker-cli-essentials (table); owner docker-cli-essentials; docker-playbook (Interview Q "what happens on docker run", story steps) |  |
| S31.5. -p HOST:CONTAINER publishes a port; S31.5 -p HOST:CONTAINER publishes a port | concept port-mapping (hook, point 1); owner port-mapping; docker-playbook (EXPOSE row, confusedWith expose-vs-publish) |  |
| S31.6. Volumes preserve data beyond the writable layer; S31.6 Volumes preserve data beyond the writable layer | concept volumes-and-mounts (hook, sayIt); owner volumes-and-mounts; docker-playbook (row "Files in a container are kept") |  |
| S31.7. ENV sets configuration; not a secret store; S31.7 ENV sets config; not a secret store | concept env-and-secrets (hook, trap); owner env-and-secrets; docker-playbook (row "ENV is fine for a password") |  |
| S31.8. Docker Compose defines multi-container applications; S31.8 Compose defines multi-container apps | concept docker-compose (hook, sayIt); owner docker-compose; docker-playbook (story step Run) |  |
| S31.9. Containers share a host kernel; S31.9 Containers share a host kernel | containers-and-vms (hook, Example with uname -r); owner containers-and-vms; docker-playbook (row "A container is a small VM") |  |
| S31.10. Part: graceful shutdown; S31.10 Small images, non-root, secure secrets, graceful shutdown | concept signals-and-graceful-shutdown (sayIt); owners image-size-optimization, image-security, env-and-secrets, signals-and-graceful-shutdown; docker-playbook rows (non-root, ENV, multi-stage); troubleshooting-containers row (graceful shutdown) | Other parts (small images, non-root, secrets) belong to other units |
| S31.11. Cluster = control plane + worker nodes | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S31.12. API Server entry point; etcd state store | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S31.13. Scheduler selects nodes; kubelet manages Pods | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S31.14. Pod = smallest deployable unit | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S31.15. Deployment manages ReplicaSets and replicas | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S31.16. Service provides stable access to Pods | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S31.17. Ingress handles HTTP/HTTPS routing via a controller | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S31.18. ConfigMap non-sensitive; Secret sensitive | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S31.19. Liveness restarts; readiness gates traffic; startup protects slow starts | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S31.20. Requests help scheduling; limits constrain usage | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S32 Quick self-test (as a whole) | Quiz items through their owners (Quiz is built from Interview Qs and traps) | multiple-choice options: see Dropped |
| S32.Q1. Which Docker instruction runs during image building? (answer RUN); S32.Q1 Which instruction runs during the build? (RUN) | concept run-cmd-entrypoint (trap, Interview Q 1); concept dockerfile-instructions (Interview Q 2); owner run-cmd-entrypoint; docker-playbook build/run bullet |  |
| S32.Q2. Which Kubernetes resource maintains a desired number of replicas? | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S32.Q3. What happens when a readiness probe fails? | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S32.Q4. What is the default Kubernetes Service type? | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S32.Q5. Which mechanism preserves database data beyond container removal? (answer: Docker volume); S32.Q5 What keeps database data after container removal? (volume) | concept volumes-and-mounts (sayIt, Interview Q 1); owner volumes-and-mounts; docker-playbook row "Files in a container are kept" |  |
| S32.Q6. What is the purpose of a Kubernetes Service? | covered by the Kubernetes tech (reference/kubernetes.coverage.md) | Kubernetes-only item of the shared sections |
| S32.STUDY (Docker part: images, Dockerfile, ports, volumes, networking first) | concept docker-playbook (Why it exists) | Kubernetes half: Kubernetes tech |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| D1. Term containerization ("packaging an application and its dependencies into a container") | Loose: you package into an image; a container is the running instance | "Packaging an app with its dependencies into an image so it runs the same as a container anywhere" | https://docs.docker.com/get-started/docker-overview/ |
| D3. (part: cache invalidation rule, "a cached step may need invalidation when its inputs change") | Vague: suggests the user must invalidate; hides that RUN is matched only by its command text | COPY/ADD invalidate automatically on file changes (mtime ignored); RUN is matched by its text, so use `--no-cache` to refresh; a miss reruns every later step | https://docs.docker.com/build/cache/invalidation/ |
| D4. Spring Boot Dockerfile example (`FROM eclipse-temurin:21-jre`) and D5 example; D4. ADD row ("copies files and supports additional behaviour, such as extracting local tar archives") | Java 21 base image; the tech's baseline is Java 25 (LTS); Incomplete: leaves out remote URLs and Git repositories, and that remote archives are not extracted | `eclipse-temurin:25-jre` to run, `eclipse-temurin:25-jdk` to build (both tags active on Docker Hub, 17-10-2026); ADD also fetches HTTPS URLs and Git repos; local tar archives are extracted; remote archives only with `--unpack` (Dockerfile 1.17+) | https://hub.docker.com/_/eclipse-temurin ; https://docs.docker.com/reference/dockerfile/ ; https://docs.docker.com/build/building/best-practices/ |
| D6. Part: "Kill: immediately sends a kill signal"; D6. Part: "Stop: requests a graceful shutdown, then kills it after a timeout" | Loose: suggests kill always ends the container; Vague: no signal, no timeout value, and "graceful" only if the app handles the signal | docker kill sends SIGKILL by default; `--signal` can send another signal (for example SIGHUP), which may not stop the container; SIGTERM (or STOPSIGNAL) to PID 1, SIGKILL after 10 s on Linux / 30 s on Windows (Docker Engine 29); graceful only if PID 1 handles SIGTERM | https://docs.docker.com/reference/cli/docker/container/kill/ ; https://docs.docker.com/reference/cli/docker/container/stop/ ; https://man7.org/linux/man-pages/man7/pid_namespaces.7.html |
| D7. Network types (part: "Bridge: common default for standalone containers"); D7. Network types (part: "Host: ... where supported"); D7. Network types (part: "Overlay: ... in supported setups") | Understated: it is the default, and Docker calls the default bridge legacy, not for production; Vague platform claim; Vague | Default when no --network; legacy; use a user-defined bridge; Docker Engine on Linux; Docker Desktop 4.34+ when enabled; -p and -P are ignored; Swarm overlay networks connect several Docker daemons | https://docs.docker.com/engine/network/drivers/bridge/ ; https://docs.docker.com/engine/network/drivers/host/ ; https://docs.docker.com/engine/network/ |
| D8. Example (part: `postgres` untagged with `-v pgdata:/var/lib/postgresql/data`); D8. Rules (part: "docker volume prune can delete unused volumes") | Untagged `postgres` is 18 today; from 18 the image's VOLUME and PGDATA moved, so this mount does not hold the data; Outdated: since Engine 23.0 (API 1.42) prune removes only unused anonymous volumes | postgres:18 mounts `/var/lib/postgresql`; `/var/lib/postgresql/data` only for 17 and below; Anonymous only by default; `-a` also removes unused named volumes | https://hub.docker.com/_/postgres ; https://docs.docker.com/reference/cli/docker/volume/prune/ ; https://docs.docker.com/engine/release-notes/23.0/ |
| D9. Example (`-e DB_HOST=db myapp:1.0`) and "Spring Boot commonly maps environment variables"; D9. "ARG can leak through image/build metadata or logs" | DB_HOST is not a Spring property (works only if the app's config reads it); "commonly maps" is loose; "logs" not backed by the docs | Relaxed binding rule: dots to underscores, drop dashes, upper case, e.g. SPRING_DATASOURCE_URL → spring.datasource.url (Spring Boot 4.1); Build args show in `docker history` and in max-mode provenance attestations; use RUN --mount=type=secret | https://docs.spring.io/spring-boot/reference/features/external-config.html ; https://docs.docker.com/reference/dockerfile/ |
| D10. Docker Compose (part: example with `postgres:17` and volume at `/var/lib/postgresql/data`) | Outdated for the baseline: postgres 18+ moved the image VOLUME to `/var/lib/postgresql` (the `/data` path is right only for 17 and below) | `postgres:18` with `pgdata:/var/lib/postgresql` | https://hub.docker.com/_/postgres ; https://github.com/docker-library/postgres/blob/master/18/trixie/Dockerfile |
| D11. Image pinning: an exact version or digest gives reproducibility; D11. Mistake: using latest for reproducible production deployments | Loose: a version tag can be moved by the publisher, so only a digest is fixed; and the trade-off is missing; Incomplete: any tag (not only latest) can move | Pin by digest for repeatable builds; this opts out of automatic security fixes, so bump the digest and rebuild on a schedule (point, Interview Q, tree note); Pin the base by digest (link tag-vs-digest); the "latest is just a tag" fact is owned by registries | https://docs.docker.com/build/building/best-practices/ |
| S28 row "Production orchestration" (Docker: "requires additional tooling for many needs"; Compose: "primarily suited to simpler environments") | Loose: Docker Engine has Swarm mode built in for clusters, and Docker documents Compose for production on a single server | Comparison rows "A container crashes" / "Machine dies"; tree nodes swarm-mode ("built into Docker Engine") and compose-one-host ("production is possible on a single server") | https://docs.docker.com/engine/swarm/ ; https://docs.docker.com/compose/how-tos/production/ |
| S28.Q1 / S28.Q2 answers ("Kubernetes can run without Docker Engine") | No version: Kubernetes before 1.24 had built-in Docker Engine support (dockershim); since 1.24 Docker Engine needs the cri-dockerd adapter | Point "dockershim: removed in Kubernetes 1.24; Docker Engine now needs cri-dockerd" | https://kubernetes.io/docs/setup/production-environment/container-runtimes/ |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| Linux namespaces and cgroups (types, cgroup v2 since Docker 20.10, user namespace off by default) | concept namespaces-and-cgroups; tree | Common "how do containers isolate" question |
| containerd, runc, OCI image/runtime/distribution specs (image-spec v1.1.1) | docker-architecture (Mermaid, point); tree; glossary | Interviewers ask what runs under dockerd |
| Docker API socket /var/run/docker.sock, root-level access | docker-architecture (point, bullet linking runtime security) | Key architecture and security fact |
| containerd image store default for fresh installs since Engine 29.0 | docker-architecture point; tree containerd-snapshotters | Current default (baseline Engine 29) |
| Docker Desktop licence (250+ employees or USD 10 million+) and Engine Apache 2.0 | docker-architecture (point, Interview Q 3); glossary moby | Asked in company settings; reference silent |
| Windows containers; containers usually run inside VMs in the cloud | containers-and-vms points; tree | Shows containers and VMs are not rivals |
| Copy-on-write, docker history, deleting in a later layer does not shrink the image | images-and-layers (points, trap, bullet) | Classic layer questions |
| Storage driver overlay2 vs containerd snapshotters | images-and-layers tree | Engine 29 change |
| Image reference anatomy and defaults (docker.io, library, latest) | registries (table) | Explains what a short name means |
| Pull by digest | registries (Example, Interview Q 2); comparison tag-vs-digest | Repeatable deploys |
| Private registries (ECR, ACR, Artifact Registry, Harbor) | registries tree | Real-world registries |
| Docker Hub pull limits (100 per 6 h unauthenticated, 200 Personal) | registries (point, Interview Q 3) | Common CI failure; verified today |
| Podman | docker-architecture tree; glossary | Commonly named alternative |
| LABEL, STOPSIGNAL, `# syntax=docker/dockerfile:1` | concept dockerfile-instructions (table, bullet, Example); tree | Real instructions interviewers name; scope note |
| Build context | concept build-cache (point, Interview Q 3); tree; glossary | Needed to explain the `.` in docker build and .dockerignore |
| Cache mounts, `--no-cache`, `--pull` | concept build-cache (points, bullet, trap); tree | Common follow-ups on cache questions |
| Named stages, `COPY --from`, `--target`, BuildKit skips unused stages | concept multi-stage-builds (points, bullets, Interview Q 2); tree | Standard multi-stage follow-ups |
| BuildKit default since Engine 23.0, Buildx, docker build alias, multi-platform images, image index | concept buildkit-and-multi-platform; tree; glossary | Current build tooling; ARM laptops vs x86 servers is a common real problem |
| JVM container support, MaxRAMPercentage, InitialRAMPercentage, ActiveProcessorCount | concept java-in-containers (table, points, trap, Interview Qs 1-2); tree | The most asked Java-on-Docker question |
| Layered jar (jarmode tools extract --layers), buildpacks, jlink, AOT cache / CDS | concept java-in-containers (Example, bullet, Interview Q 3); comparison dockerfile-vs-buildpacks; tree; glossary | Spring Boot 4.1's own container guidance |
| Comparisons copy-vs-add, arg-vs-env, exec-form-vs-shell-form, dockerfile-vs-buildpacks | comparisons | Frequently asked pairs (GeeksforGeeks lists ARG vs ENV and ADD vs COPY) |
| Restart policies no / on-failure / always / unless-stopped, the 10 s rule, daemon-restart behaviour | concept container-lifecycle (Example table, Defaults, Interview Qs 1-2); tree | Commonly asked (always vs unless-stopped); the reference only says "depends on the policy" |
| All container statuses (created, running, paused, restarting, exited, removing, dead), --rm | concept container-lifecycle (Mermaid, bullet, point); tree | Asked as "states of a container" |
| inspect, stats, cp, system df, system prune (-a, --volumes), save/load vs export | concept docker-cli-essentials (table, bullet, Interview Q 3) | Everyday debugging and cleanup commands; prune scope is a common trap |
| PID 1 signal rule, zombie reaping, --init (tini), STOPSIGNAL | concept signals-and-graceful-shutdown (points, Interview Q 2); tree | Explains why shell form breaks shutdown |
| Spring Boot 4.1 graceful shutdown default and 30 s per-phase timeout vs Docker's 10 s | concept signals-and-graceful-shutdown (Defaults, Example, Interview Q 3) | Real cause of lost requests on deploy |
| Health states, options and defaults, exit codes 0/1/2, Swarm replaces unhealthy tasks, actuator 200/503, no curl in eclipse-temurin:25-jre | concept container-health-checks | Practical interview follow-ups |
| Docker resource flags, OOMKilled, --memory-swap, --cpu-shares, --pids-limit, Compose deploy.resources | concept resource-limits | The reference had only a Kubernetes-style one-liner |
| Logging drivers, json-file without rotation, max-size/max-file, local driver, dual logging, daemon logs | concept container-logging | Disk-full-from-logs is a common production question |
| Embedded DNS at 127.0.0.11 and network aliases | concept docker-networking (point, Defaults); tree; glossary | Explains how name lookup works; common follow-up question |
| host.docker.internal (Docker Desktop; Linux `--add-host ...:host-gateway`) | concept docker-networking (point, Interview Q 2) | Very common "reach a service on the host" question |
| Macvlan and ipvlan drivers | tree under docker-networking; glossary | Complete driver list asked in interviews |
| Default bridge vs user-defined bridge comparison | comparison default-bridge-vs-user-defined-bridge | Root cause of "cannot reach container by name" |
| Published ports bypass ufw on Linux; bind to 127.0.0.1 | concept port-mapping (points, Interview Q 3) | Real security pitfall documented by Docker |
| -p with no host port, -P, docker port | concept port-mapping (How, Example, Defaults); tree | Complete set of publish forms |
| Empty volume is pre-filled from the image; volume-nocopy; -v vs --mount; :ro | concept volumes-and-mounts (How, Defaults); tree | Common behaviour questions |
| VOLUME instruction creates an anonymous volume | concept volumes-and-mounts (point); tree | Explains the postgres 17 "data not persisted" trap |
| Where volumes live (/var/lib/docker/volumes) | concept volumes-and-mounts (Example, Interview Q 2) | Asked in interviews (GeeksforGeeks list) |
| Build secrets (docker build --secret, RUN --mount=type=secret) | concept env-and-secrets (point, table, Interview Q 3, Defaults) | The correct answer to "secrets during build" |
| Compose secrets at /run/secrets/<name>, postgres _FILE variables, Spring configtree | concept env-and-secrets (Example, How, Defaults); tree | Concrete run-time secret mechanisms |
| External secret managers (Vault, AWS Secrets Manager) | concept env-and-secrets (table); tree | The reference names "a secret manager" without examples |
| depends_on long form: service_started, service_healthy, service_completed_successfully, restart, required | concept compose-startup-order; tree; glossary | The reference names the readiness problem but not the fix interviewers expect |
| App must still reconnect after startup | concept compose-startup-order (point, Interview Q 3) | Common follow-up question |
| Compose v1 vs v2 vs v5; `version:` field obsolete | concept docker-compose (point, trap); tree | Old tutorials still show `docker-compose` and `version: "3.8"` |
| Top-level elements (networks, volumes, configs, secrets) and project name | concept docker-compose (point); tree | Part of the Compose model |
| .env vs env_file | concept compose-in-practice (trap, Interview Q 1); glossary | Very common confusion |
| compose.override.yaml and -f | concept compose-in-practice | Standard dev/prod split |
| Profiles, --watch, --scale | concept compose-in-practice (table); tree | Everyday dev features |
| docker compose up vs start vs run | tree under compose-in-practice | Scope note: one row |
| Spring Boot Docker Compose support | concept compose-in-practice; glossary | Spring Boot backend focus of the site |
| Comparison Dockerfile vs compose.yaml | comparison dockerfile-vs-compose-file | Beginners mix them up |
| Linux capabilities, --cap-drop ALL | concept container-runtime-security (table, point); tree cap-drop-all; glossary | Standard hardening question |
| --privileged | concept container-runtime-security (point, Interview Q); tree privileged-flag | Commonly asked; the most dangerous flag |
| --read-only + --tmpfs /tmp, no-new-privileges | concept container-runtime-security (table, example); tree | Core run-time hardening flags |
| Mounting docker.sock = root-level host access | concept container-runtime-security (trap, point); tree docker-socket-mount | Frequent real-world mistake |
| Default seccomp and AppArmor profiles | concept container-runtime-security (point, bullet); tree kernel-security-profiles | Explains why a default container is fairly safe |
| Rootless mode vs userns-remap | concept container-runtime-security (Interview Q); tree rootless-docker, userns-remap-mode | Asked in security rounds |
| SBOM and provenance attestations | concept image-security (step Attest, point, Defaults, Interview Q) | Supply-chain questions are now common |
| Docker Scout and Trivy commands | concept image-security (step Scan); tree | Names interviewers expect |
| Docker Hardened Images | tree docker-hardened-images | Docker's own non-root minimal bases |
| Alpine vs slim vs distroless (musl, :debug, :nonroot) | comparison alpine-vs-slim-vs-distroless; concept image-size-optimization | Common follow-up to "small base image" |
| dive | tree dive-tool | Named tool for layer inspection |
| One concern per container, ephemeral containers, rebuild often, twelve-factor | concept container-best-practices; tree | Owner's added list in master.json |
| Build once, promote the same image; releases are immutable | docker-in-ci-cd (points, trap, Steps); tree build-once-promote; glossary image-promotion | Common CI/CD interview question |
| Tagging strategy: git SHA + semantic version | docker-in-ci-cd (point); tree ci-image-tags, tag-git-sha, tag-semver | Owned here per PLAN.md |
| Registry cache in CI, default mode=min | docker-in-ci-cd (Defaults); tree ci-registry-cache | Fresh CI runners otherwise rebuild everything |
| Testcontainers with Spring Boot 4.1 @ServiceConnection | docker-in-ci-cd (Example, Interview Q); tree testcontainers-tests, service-connection-annotation; glossary | Standard way to test Java code against real databases |
| Docker-in-Docker vs mounting docker.sock | docker-in-ci-cd (bullet); tree ci-docker-in-docker, ci-socket-mount; glossary | Asked when CI builds images |
| Exit codes 125, 126, 127, 137, 139, 143 and the 128 + N rule | troubleshooting-containers (Interview Q, trap, sayIt); tree exit-code-* | Most asked debugging question (137) |
| Debug order ps -a -> logs -> inspect -> exec -> stats/events; OOMKilled | troubleshooting-containers (points, Example); glossary oomkilled | Gives a repeatable answer |
| Symptom table (exits at once, OOM, stop hangs, refused, unknown host, exec format error, permission denied, old code) | troubleshooting-containers (How it works) | Each row links its owner |
| exec format error (wrong CPU architecture) | troubleshooting-containers (row); tree exec-format-error-node; glossary | Apple silicon vs x86 servers is a frequent real failure |
| CRI, CRI-O, containerd as Kubernetes runtimes; Docker images work on all CRI runtimes | docker-and-orchestration (points); tree kubernetes-cluster children; glossary cri, cri-o, dockershim | Needed to answer S28.Q1/Q2 correctly |
| Kubernetes recreates Pods on a healthy node when a node fails | comparison row "Machine dies"; glossary self-healing | The concrete difference from Docker restart policies |
| Answer order (what, problem, how, trap, when not) | docker-playbook (points, sayIt) | Owner's playbook request |
| Build time vs run time memory trick | docker-playbook (bullet; tree build-time-instructions, run-time-settings, env-both-times) | Owner's playbook request; answers S32.Q1 |
| "What happens when you run docker run" | docker-playbook (Interview Q) | Common interview question |

## Dropped
| Reference item | Reason (rare / advanced / duplicate / unverifiable) |
|---|---|
| (no whole item) | |

### Details placed elsewhere or cut, inside items listed above
| Reference item part | What happened |
|---|---|
| D1. Terms Docker, container, Docker container | also: glossary docker-platform, docker-container; concept containers-and-vms |
| D1. Why Docker ("works on my machine") | also: concept containers-and-vms (Why it exists), spine step 1 |
| D1. VM vs container (guest OS, hypervisor, shared kernel, lightweight, fast start) | also: comparison container-vs-vm (embedded in containers-and-vms); glossary virtual-machine, hypervisor, host-kernel |
| D1. Interview rule (isolated processes sharing a kernel vs VMs virtualising hardware) | also: containers-and-vms (hook, sayIt) |
| D1. Terms Docker Engine, Docker daemon (dockerd), Docker CLI | also: concept docker-architecture (Mermaid, points); glossary docker-engine, docker-daemon, docker-cli |
| D1. Term image | also: images-and-layers (hook); glossary docker-image |
| D1. Terms Docker Registry, Docker Hub | also: concept registries; glossary container-registry, docker-hub |
| D1. Docker Fundamentals (part: term "Dockerfile") | also: glossary `dockerfile-term`; concept dockerfile-instructions (hook) |
| D1 (term: container orchestration) | also: glossary container-orchestration; concept docker-and-orchestration (point "Orchestration adds") |
| D3. Image layer, base image, immutable image | also: images-and-layers (points, Mermaid, Example); glossary image-layer, base-image; tree read-only-image |
| D3. Rules: images are templates, many containers per image, separate writable layers | also: images-and-layers (points, Interview Qs); comparison image-vs-container |
| D3. Tag, digest, repository | also: registries (points, table); comparison tag-vs-digest; glossary image-tag, image-digest, image-repository |
| D3. Tags can move; a digest identifies specific content | also: comparison tag-vs-digest; registries Interview Q 2 |
| D3. latest is just a tag | also: registries (point, trap); glossary latest-tag |
| D3. Images and Layers (part: layer caching) | also: concept build-cache (hook, Steps, Interview Q 1); glossary `build-cache-term` |
| D4. Dockerfile must-know instructions (instruction table: FROM, WORKDIR, COPY, ADD, RUN, ENV, ARG, EXPOSE, CMD, ENTRYPOINT, USER, VOLUME, HEALTHCHECK) | also: concept dockerfile-instructions (How it works table, points) |
| D4. (part: build and run commands, `docker build -t myapp:1.0 .`) | also: concept dockerfile-instructions (Example, Interview Q 1) |
| D4. (part: "the jar must already be built into target/app.jar") | also: concept dockerfile-instructions (trap, Example comment) |
| D4. (part: Spring Boot jar packaging context) | also: concept java-in-containers (layered jar, Example) |
| D4. HEALTHCHECK row | also: concept container-health-checks (Example, Defaults) |
| D4. Dockerfile instructions (part: EXPOSE row, "documents the port, does not publish it") | also: concept port-mapping (trap); comparison expose-vs-publish; tree `expose-metadata` |
| D6. docker pull, docker push (part) | also: registries (Example: login, tag, push, pull by digest) |
| D6. Container lifecycle (parts: create, start, run, stop, restart, remove) | also: concept container-lifecycle (Mermaid, points, Interview Q 1); comparison docker-stop-vs-docker-kill |
| D6. Essential commands block (images, ps, ps -a, build, run -d --name -p, logs, logs -f, exec -it sh, stop, start, restart, rm, pull, push) | also: concept docker-cli-essentials (How it works table) |
| D6. Remember list (ps running only, ps -a, exec in running container, run makes a new container, rm needs stopped / rm -f, rmi removes an image) | also: concept docker-cli-essentials (points, trap rm vs rmi, Interview Q 1); comparison docker-run-vs-start-vs-exec |
| D6. Logs (docker logs, logs -f, "docker logs shows only stdout/stderr") | also: concept container-logging (points, Interview Q 1) |
| D6 (part: `docker push username/myapp:1.0`, pushing to a registry) | also: concept docker-in-ci-cd (Steps: tag and push) |
| D7. Port mapping (part: -p HOST:CONTAINER, host receives and forwards; "EXPOSE alone does not publish") | also: concept port-mapping (points, How, Example, Interview Q 1) |
| D7. Network types (part: user-defined bridge, none) | also: concept docker-networking (drivers table); tree; comparison default-bridge-vs-user-defined-bridge |
| D7. Traps (part: localhost is the container itself; containers reach each other by name when the network supports it; publishing vs exposing; app must listen on the right interface) | also: concept docker-networking (points, trap, Interview Q 1); concept port-mapping (trap, comparison) |
| D7 (part: network connectivity is not application connectivity; app must listen on the right interface) | also: concept troubleshooting-containers (symptom row "Refused from the host"; Interview Q 3) |
| D7 (part: overlay connects containers across hosts) | also: concept docker-and-orchestration (tree node swarm-mode) |
| D8. Volumes and persistent data (part: writable layer lost on removal; volume, bind mount, tmpfs definitions; persistence) | also: concept volumes-and-mounts (Why, points, comparison); glossary docker-volume, bind-mount, tmpfs-mount, data-persistence |
| D8. Volume vs bind mount table | also: comparison volume-vs-bind-mount-vs-tmpfs (embedded; tmpfs column added) |
| D8. Rules (part: docker rm keeps a named volume; removing an image does not delete a volume; docker rm -v removes anonymous volumes only; mounting over a directory hides its contents) | also: concept volumes-and-mounts (points, How bullets) |
| D9. Environment variables and secrets (part: environment variable, secret, configuration separation; ENV is not a secret store; do not bake credentials into an image; use a secret manager or a secured run-time secret mechanism) | also: concept env-and-secrets (hook, points, trap, table, Interview Q 2); glossary environment-variable, secret-sensitive-config, configuration-separation |
| D9. Build argument (ARG) definition | also: comparison arg-vs-env (dockerfile unit); env-and-secrets covers only the secret angle (trap) |
| D10. Part: a health check shows when a service is ready | also: concept container-health-checks (bullet link to compose-startup-order) |
| D10. Docker Compose (part: definition, YAML file commonly compose.yaml) | also: concept docker-compose (hook, Interview Q 1); glossary `docker-compose-term`, `compose-yaml-term` |
| D10. Docker Compose (part: use for Spring Boot + PostgreSQL + Redis in development) | also: concept docker-compose (Why, Example); concept compose-in-practice |
| D10. Docker Compose (part: commands up -d, ps, logs -f, down) | also: concept docker-compose (Example, bash block) |
| D10. Docker Compose (part: "Service" definition) | also: glossary `compose-service-term`; concept docker-compose (point); tree `compose-services-key` |
| D10. Docker Compose (part: service discovery by service name on the default network) | also: concept docker-compose (point, Mermaid, Interview Q 2); tree `compose-default-network` |
| D10. Docker Compose (part: depends_on orders start/stop but does not guarantee readiness) | also: concept compose-startup-order (hook, trap, points, Interview Q 2) |
| D10. Docker Compose (part: health check helps decide readiness) | also: concept compose-startup-order (Steps, Example) |
| D10. Docker Compose (part: down removes containers and networks, keeps named volumes; down -v also removes named and anonymous volumes) | also: concept docker-compose (point, Example, Interview Q 3) |
| D11. (part: .dockerignore definition) | also: concept build-cache (bullet, Example, Interview Q 3); glossary `dockerignore` |
| D11. (part: example .dockerignore and the target/ caveat) | also: concept build-cache (Example, bullet) |
| D11. (part: multi-stage build definition) | also: concept multi-stage-builds (hook, Why, Mermaid, Interview Q 1) |
| D11. (part: mistake "build tools and unnecessary files in the final image") | also: concept multi-stage-builds (point "Left behind", sayIt) |
| D11. Mistake "Docker restarts every container after a crash" | also: concept container-lifecycle (trap, Interview Q 1, Example table) |
| D11. Part: graceful shutdown | also: concept signals-and-graceful-shutdown (Steps, Interview Q 3) |
| D11. Mistake "a running container means the app is healthy" | also: concept container-health-checks (points, Interview Q 1) |
| D11. Part: resource limits restrict CPU and memory | also: concept resource-limits (table, Interview Q 1) |
| D11. Common mistakes (part: "assuming container files are permanent") | also: concept volumes-and-mounts (trap) |
| D11. Common mistakes (part: "putting passwords in a Dockerfile") | also: concept env-and-secrets (trap) |
| D11. Non-root user (with S31.10 part "non-root users") | also: concept image-security (step User, example, Defaults, Interview Q) |
| D11. Image scanning | also: concept image-security (point, step Scan); tree image-scanners, docker-scout-cves-cmd, trivy-image-cmd |
| D11. Small base image: size and attack surface; compatibility still matters | also: concept image-size-optimization (points, trap on Alpine/musl); comparison alpine-vs-slim-vs-distroless |
| D11. Multi-stage build (best-practice list) | also: concept image-size-optimization (bullet linking multi-stage-builds) |
| D11. .dockerignore (best-practice list) | also: concept image-size-optimization (bullet linking build-cache) |
| D11. Graceful shutdown (best-practice list) | also: concept container-best-practices (table row linking signals-and-graceful-shutdown) |
| D11. Resource limits (best-practice list) | also: concept container-best-practices (table row linking resource-limits); container-runtime-security (bullet) |
| D11. Mistake: running production containers as root | also: concept image-security (Interview Q "Why should a container not run as root?") |
| D11. Mistake: passwords in a Dockerfile (with S31.10 part "secure secrets") | also: concept image-security (step Secrets, linking env-and-secrets) |
| D11. Mistake: assuming container files are permanent | also: concept container-best-practices (table row Stateless container, Interview Q "Why should containers be stateless?") |
| D11. Mistake: build tools and unneeded files in the final image | also: concept image-size-optimization (points JRE not JDK, hook) |
| D11. Mistake: a running container means a healthy app | also: concept container-best-practices (table row Health check, linking container-health-checks) |
| D11. Mistake: Docker restarts every crashed container | also: concept container-best-practices (table row Restart policy, linking container-lifecycle) |
| D11 (part: mistake "using latest for reproducible production deployments") | also: concept docker-in-ci-cd (Interview Q "Why not deploy latest"); docker-playbook (Don't-say row, links registries) |
| D11 (common mistakes list: root, passwords in Dockerfile, files permanent, latest, build tools in final image, running = healthy, auto-restart) | also: concept docker-playbook ("Don't say / Say" table, one row each, each linking its owner: image-security, env-and-secrets, volumes-and-mounts, registries, multi-stage-builds, container-health-checks, container-lifecycle) |
| S28. Docker vs Kubernetes vs Docker Compose (table rows: main purpose, main unit, scaling, self-healing, configuration) | also: comparison docker-vs-compose-vs-kubernetes (rows: you describe, unit you manage, scaling, a container crashes, machine dies) |
| S28 row "Networking" (container networks / service names on Compose networks / Pod networking and Services) | cut: duplicate: name lookup is owned by docker-networking and docker-compose; Kubernetes networking by the Kubernetes tech |
| S28.Q1 Does Kubernetes replace Docker? | also: concept docker-and-orchestration (Interview Q 1, trap) |
| S32 multiple-choice wrong options (the distractors) | cut: duplicate: the site Quiz is question -> answer; each question lands through its owner |
