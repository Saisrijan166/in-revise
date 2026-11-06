# Fundamentals

## What is Docker ⭐

Docker is a platform that packages an application together with its dependencies into a **container** so it runs the same way on any machine that supports containers.

- Without Docker, an app may work on one developer's machine but fail elsewhere because of different dependencies or configuration.
- Containerization = packaging an app and its dependencies into one unit.
- Container orchestration = managing containers across many machines automatically (Kubernetes is the common example).

> Remember: Docker makes "works on my machine" into "works everywhere".

## Image vs Container ⭐⭐

- **Image**: a read-only template used to create containers (built from a Dockerfile).
- **Container**: a running instance created from an image; it gets its own writable layer.

Key rules:
- Multiple containers can run from the same image, each with a separate writable layer.
- Containers are disposable; images are immutable templates.

> Remember: Image = template (class); container = running instance (object).

## Container vs Virtual Machine ⭐⭐

| Container | Virtual Machine |
|---|---|
| Shares the host OS kernel | Runs its own guest OS |
| Lightweight, starts quickly | Heavier, slower to start |
| Isolated process | Virtualizes hardware via a hypervisor |

- A container holds user-space files and libraries, **not its own kernel**.
- Linux containers need a Linux kernel; Docker Desktop runs them on Windows/Mac using a Linux VM.
- Containers are isolated but not perfectly secure — security depends on configuration and host protections.

> Remember: VMs virtualize hardware; containers share a kernel and isolate processes.

## The Docker Engine ⭐

Docker Engine is the software that builds and runs containers. Its parts:

- **Docker CLI (client)**: you type `docker build`, `docker run`; it sends commands to the daemon.
- **Docker daemon (`dockerd`)**: builds images, creates containers, manages Docker objects.
- **Registry**: stores and distributes images (Docker Hub is the common public one).
- **Docker Desktop**: desktop app providing the CLI, daemon and a container runtime on supported OSes.

Typical flow: `Dockerfile` → `docker build` → **Image** → `docker run` → **Container** (running app). A registry is only needed to share or fetch an image, not for every local build-and-run.

> Remember: CLI talks to the daemon; the daemon does the work; the registry stores images.

# Images & Dockerfile

## Image Layers and Caching ⭐

An image is built from stacked **layers**, each a filesystem change from one build step.

- **Layer caching**: Docker reuses unchanged build steps to speed up later builds; a step is rebuilt when its inputs change.
- **Base image**: the starting image set by `FROM`.
- Order instructions so rarely-changing steps come first — this keeps the cache valid for longer.

> Remember: Layers are cached top-down; change an early step and everything after it rebuilds.

## Tags vs Digests

- **Tag**: a human-readable label for a version, e.g. `nginx:1.28`. Tags are mutable — they can be repointed to different images.
- **Digest**: a content-addressed id that always identifies the exact same content; use it to pin an image.
- **Repository**: a collection of related image versions in a registry.
- `latest` is just a tag, **not** a guarantee of the newest or safest image.

> Remember: Tag for readability, digest for reproducibility.

## Dockerfile Instructions ⭐⭐

A Dockerfile is a text file of instructions that build an image.

| Instruction | Meaning |
|---|---|
| `FROM` | Selects the base image. |
| `WORKDIR` | Sets the working directory for later instructions. |
| `COPY` | Copies files from the build context into the image. |
| `ADD` | Like `COPY`, but can also fetch URLs and extract local tar archives. Prefer `COPY`. |
| `RUN` | Runs a command during the build (install/prepare). |
| `ENV` | Sets environment variables in the image config. |
| `ARG` | Defines a build-time variable. |
| `EXPOSE` | Documents the intended port; does **not** publish it. |
| `CMD` | Default command/arguments when the container starts. |
| `ENTRYPOINT` | The main executable for the container. |
| `USER` | Sets the user for later steps and at runtime. |
| `VOLUME` | Declares a mount point for persistent/external data. |
| `HEALTHCHECK` | Command Docker uses to check container health. |

```dockerfile
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```bash
docker build -t myapp:1.0 .
docker run -p 8080:8080 myapp:1.0
```

> Remember: The JAR must already be built; this Dockerfile only copies and runs it.

## RUN vs CMD vs ENTRYPOINT ⭐⭐⭐

| Instruction | When it runs | Purpose |
|---|---|---|
| `RUN` | During image build | Install or prepare something. |
| `CMD` | When the container starts | Default command/arguments. |
| `ENTRYPOINT` | When the container starts | The main executable. |

- `CMD` is overridden by arguments given to `docker run`.
- With exec-form `ENTRYPOINT`, `docker run` arguments are appended to it.
- When both are set, `CMD` supplies the **default arguments** to `ENTRYPOINT`.
- Prefer JSON/exec form (`["java","-jar","app.jar"]`) for predictable signal handling.

```dockerfile
ENTRYPOINT ["java", "-jar", "app.jar"]
CMD ["--server.port=8080"]
# effective: java -jar app.jar --server.port=8080
```

> Remember: RUN builds the image; ENTRYPOINT is the fixed command; CMD is its default (overridable) args.

## Multi-stage Builds ⭐

A multi-stage build uses several `FROM` stages so the final image keeps only what it needs, leaving compilers and build tools behind.

- Shrinks image size and attack surface.
- Pair with a small base image, a `.dockerignore`, and image pinning.

> Remember: Build in a fat stage, copy the artifact into a slim final stage.

# Containers

## Container Lifecycle ⭐

- **Create**: makes a container without starting it.
- **Run**: creates **and** starts a container (`docker run`).
- **Start / Stop / Restart**: stop requests a graceful shutdown, then kills after a timeout.
- **Kill**: sends an immediate kill signal.
- **Remove**: deletes a stopped container.

> Remember: `run` = create + start; `exec` = run a command inside an already-running container.

## Everyday Commands ⭐

```bash
docker images
docker ps            # running containers
docker ps -a         # includes stopped containers

docker run -d --name myapp -p 8080:8080 myapp:1.0
docker logs -f myapp
docker exec -it myapp sh

docker stop myapp
docker start myapp
docker rm myapp      # needs it stopped; -f force-removes
docker rmi myapp:1.0 # removes an image, not a container

docker pull nginx
docker push username/myapp:1.0
```

Key rules:
- `docker run` creates a **new** container — it does not restart an existing named one.
- `docker logs` only shows what the app writes to stdout/stderr.
- `docker rmi` removes images; `docker rm` removes containers.

> Remember: `ps` shows running; `ps -a` shows all; `exec` gets you a shell inside a live container.

# Networking & Storage

## Port Mapping ⭐⭐

```bash
docker run -p 8080:80 nginx   # host 8080 -> container 80
```

The host receives on `8080` and forwards to port `80` inside the container.

- `EXPOSE 80` alone does **not** publish the port — you must use `-p`.
- Publishing a port is different from exposing/documenting one.

> Remember: `-p HOST:CONTAINER` publishes; `EXPOSE` only documents.

## Network Types

- **Bridge**: default for standalone containers on Linux; same-bridge containers can talk.
- **User-defined bridge**: adds name-based discovery between containers.
- **Host**: uses the host's network namespace; no port mapping needed.
- **None**: disables ordinary networking.
- **Overlay**: connects containers across multiple hosts.

Traps:
- `localhost` inside a container means **that container**, not the host or another container.
- Containers reach each other by container/service name only when the network supports name resolution.
- Network reachability is not app reachability — the app must listen on the right interface and port.

> Remember: Use a user-defined bridge so containers can find each other by name.

## Volumes vs Bind Mounts ⭐⭐

Containers are disposable; data in the writable layer is lost when the container is removed. Persist data with mounts.

| Volume | Bind mount |
|---|---|
| Managed by Docker | Maps a specific host path |
| Good for app/database data | Good for dev files and host sharing |
| Independent of any host directory | Tied to the host directory/path |

```bash
docker volume create pgdata
docker run -d --name postgres \
  -e POSTGRES_PASSWORD=example \
  -v pgdata:/var/lib/postgresql/data \
  postgres
```

Key rules:
- Removing a container or image does **not** remove a named volume.
- `docker rm -v` removes anonymous volumes, not named ones; `docker volume prune` deletes unused volumes — use carefully.
- Mounting over an existing directory hides its previous contents while mounted.
- A **tmpfs** mount keeps temporary data in memory (Linux).

> Remember: Volume = Docker-managed persistent data; bind mount = a chosen host path.

## Environment Variables and Secrets

- `ENV` / `-e` supply runtime config (e.g. `SPRING_PROFILES_ACTIVE`, DB URL).
- `ARG` supplies build-time values only.

```bash
docker run -e SPRING_PROFILES_ACTIVE=prod -e DB_HOST=db myapp:1.0
```

Key rules:
- `ARG` is not safe for secrets — it can leak through build metadata or logs.
- `ENV` is not a secure secret store either; don't bake credentials into an image.
- Use a secret manager or a secured runtime secret mechanism.

> Remember: Env vars configure; they do not secure — keep secrets out of images.

# Compose

## Docker Compose ⭐⭐

Docker Compose defines and runs a multi-container app from one YAML file (commonly `compose.yaml`) — e.g. a Spring Boot app with PostgreSQL and Redis for development.

```yaml
services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
  db:
    image: postgres:17
    environment:
      POSTGRES_DB: appdb
      POSTGRES_PASSWORD: example
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

```bash
docker compose up -d
docker compose logs -f
docker compose down      # keeps named volumes
docker compose down -v   # also removes named volumes (data lost)
```

Key rules:
- **Service**: a named component; services reach each other by service name (here the DB host is `db`).
- `depends_on` controls **start order only** — it does not wait for the dependency to be ready; use a health check for readiness.

> Remember: Compose = one file for many services that talk by name; `down -v` deletes your data.

# Registry & Distribution

## Registries and Distribution

- A **registry** stores and distributes images; **Docker Hub** is the common public one.
- `docker push` uploads an image; `docker pull` downloads one.
- A **repository** holds related versions of an image, identified by tag or digest.
- Pin images by exact version or digest for reproducible deployments.

> Remember: Push to share, pull to fetch; pin by digest for repeatable builds.

# Best Practices & Troubleshooting

## Best Practices ⭐

- **Multi-stage build**: keep compilers/build tools out of the final image.
- **Small base image**: smaller size and attack surface.
- **`.dockerignore`**: exclude unneeded files from the build context.
- **Non-root user**: limit damage if the app is compromised.
- **Image scanning**: check for known vulnerabilities.
- **Image pinning**: exact version or digest.
- **Graceful shutdown** and **resource limits** (CPU/memory).

```text
.git
node_modules
.env
target/
```

(Only ignore `target/` if the build doesn't need the locally built JAR — the sample Dockerfile copies `target/app.jar`.)

> Remember: Small, pinned, non-root images with secrets kept outside.

## Common Mistakes

- Running production containers as root unnecessarily.
- Putting passwords in a Dockerfile or `ARG`.
- Assuming container files are permanent.
- Using `latest` for reproducible production.
- Shipping build tools in the final image.
- Assuming a running container means a healthy app.
- Assuming Docker auto-restarts a crashed container — that depends on the **restart policy**.

> Remember: Running is not the same as healthy; restart behaviour is configured, not automatic.

## Defaults Worth Remembering

| Concept | Default |
|---|---|
| `docker ps` | Lists running containers only. |
| `EXPOSE` | Does not publish a port. |
| `latest` | A tag, not the newest version. |
| Removing a container | Does not remove named volumes. |
| Restart after crash | Depends on the restart policy. |

> Remember: Most "gotchas" are defaults that do less than people assume.

# Common "Why X vs Y?" Comparisons

## Image vs Container

The same template-vs-instance idea: one **image** can spawn many **containers**, each with its own writable layer.

> Remember: Build once (image), run many (containers).

## CMD vs ENTRYPOINT ⭐⭐

- `ENTRYPOINT` sets the fixed executable; `CMD` sets default arguments.
- Arguments on `docker run` **override `CMD`** but are **appended to `ENTRYPOINT`** (exec form).
- Use `ENTRYPOINT` for the program, `CMD` for its default args.

> Remember: ENTRYPOINT = what to run; CMD = default args you can replace.

## COPY vs ADD ⭐

- `COPY` just copies files from the build context.
- `ADD` also fetches URLs and auto-extracts local tar archives.
- Prefer `COPY` for ordinary copying; reach for `ADD` only when you need its extra behaviour.

> Remember: Default to COPY; use ADD only for tar extraction or URLs.

## Volume vs Bind Mount ⭐

- **Volume**: Docker-managed, portable, best for database/app data.
- **Bind mount**: tied to a specific host path, best for local development.

> Remember: Volume for production data, bind mount for dev files.

## Docker vs Virtual Machine ⭐

- Containers share the host kernel and are lightweight; VMs run a full guest OS and are heavier.

> Remember: Container = shared kernel; VM = full guest OS.

## Docker vs Docker Compose vs Kubernetes ⭐

| | Docker | Docker Compose | Kubernetes |
|---|---|---|---|
| Purpose | Build and run containers | Define multi-container apps | Orchestrate across a cluster |
| Main unit | Container / image | Service | Pod and workload resources |
| Scaling | Run more containers manually | Scale services | Declarative scaling / autoscaling |
| Self-healing | Restart policies | Limited | Controllers keep desired state |
| Best for | Single containers | Local multi-container dev | Production cluster orchestration |

- Kubernetes does **not** replace Docker — it orchestrates containers and can use runtimes like containerd without Docker Engine.
- Compose is for local multi-container setups; Kubernetes adds cluster scheduling, reconciliation and management.

> Remember: Docker builds and runs, Compose groups for dev, Kubernetes orchestrates in production.
