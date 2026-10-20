# Docker & Kubernetes — Interview Cheat Sheet

This guide focuses on the must-know concepts for Java/Spring Boot backend and software engineering interviews. Learn the basic definitions, commands, differences, defaults, and common interview traps first.

# Part 1: Docker

## 1. Docker Fundamentals

### Important terminology

- Docker: A platform used to package and run applications in containers.
- Container: An isolated running environment containing an application and its required dependencies.
- Image: A read-only template used to create containers.
- Dockerfile: A text file containing instructions to build a Docker image.
- Docker Engine: The software that builds and runs containers.
- Docker daemon (`dockerd`): The background service that manages Docker objects.
- Docker CLI: The command-line tool used to communicate with Docker.
- Docker Registry: A service that stores and distributes images, such as Docker Hub.
- Docker Hub: A popular public image registry.
- Containerization: Packaging an application and its dependencies into a container.
- Container orchestration: Automatically managing containers across machines. Kubernetes is a common example.

### Why Docker?

Without Docker, an application may work on one developer's machine but fail elsewhere because of different dependencies or configurations.

Docker helps package the environment consistently so the application can run on different machines that support containers.

### Virtual machine vs container

[Virtualization and Containerization: Which one to pick?](https://images.openai.com/static-rsc-4/MWCymssReUiOfCsFmk5roE1QE19--bz0O-0ZEWOPc5odsi4HRY2ejbOgCEq5ifZ7I2BeoxRue6038GeG4fQKlD-2Zfs0K7Rn2t0cFprUUGbIKzPBf0QZ8SEAi0TyG2exZd4pgNeQEONvxM_2leizZLgy20j_z5qZCsq0NO63fpk?purpose=inline)

Virtual Machine (VM)

- Includes a guest operating system.
- Usually heavier.
- Runs through a hypervisor.

[Docker Containers vs Virtual Machines: Unpacking the Basics in My DevOps Journey | by Amandeep Singh | Medium](https://images.openai.com/static-rsc-4/kkjEDP3oKy40ljWGIdZL-1Gp9gWwyT8jh8gJrwpELvikJ0W8sFCn5TbxzMpHFnW6DAw8IKcokW4n0f3LJF84CxpaobdUQox6fRXr640umyBx3DxY4VZR5UCmR-1P4U8lnTgc3vJ1cyBzJEnNBh14lz_rkuRKOn0S95g2tDgf5zY?purpose=inline)

Container

- Shares the host kernel.
- Usually lightweight.
- Starts quickly.

Interview rule: Containers are isolated processes that share a host kernel. VMs virtualize hardware and run their own guest operating systems.

- Can a Linux container run directly on a Windows kernel? Not generally; Linux containers need a Linux kernel. Docker Desktop can run them using a Linux VM or equivalent Linux environment.
- Are containers completely isolated? No. They provide isolation, but their security depends on configuration and host protections.
- Does a container contain a full OS? Typically, it contains user-space files and libraries, not its own kernel.

## 2. Docker Architecture

- Client: Sends commands such as `docker build` and `docker run`.
- Daemon: Builds images, creates containers, and manages Docker resources.
- Image: The package used to create a container.
- Container: The running instance of an image.
- Registry: Stores images so they can be pulled and pushed.
- Docker Desktop: A desktop application that provides Docker tooling and a container runtime environment on supported operating systems.

### Typical flow

Dockerfile

`docker build` → Image

`docker run` → Container

Application running

A registry is used when you need to share or retrieve an image; it is not required for every local build-and-run workflow.

## 3. Docker Images and Layers

- Image layer: A filesystem change stored as part of an image.
- Layer caching: Docker can reuse unchanged build steps to speed up future builds.
- Base image: The starting image specified by `FROM`.
- Image tag: A human-readable label identifying an image version, such as `nginx:1.28`.
- Image digest: A content-addressed identifier for an image, commonly used to pin an exact image.
- Image repository: A collection of related image versions in a registry.
- Immutable image: An image's contents do not change when a container writes to its writable layer.

### Important rules

- Images are templates; containers are instances created from them.
- Multiple containers can use the same image.
- Containers can have separate writable layers even when they share the same image layers.
- Tags can be changed to point to different images; a digest identifies specific content.
- `latest` is just a tag, not a guarantee that the image is the newest or safest version.
- Build cache can speed up builds, but a cached step may need invalidation when its inputs change.

## 4. Dockerfile — Must-Know Instructions

A Dockerfile defines how to build an image.

| Instruction   | Meaning                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `FROM`        | Selects the base image.                                                                                                        |
| `WORKDIR`     | Sets the working directory for subsequent instructions.                                                                        |
| `COPY`        | Copies files from the build context into the image.                                                                            |
| `ADD`         | Copies files and supports additional behavior, such as extracting local tar archives. Prefer `COPY` for ordinary file copying. |
| `RUN`         | Executes a command during image building.                                                                                      |
| `ENV`         | Sets environment variables in the image/container configuration.                                                               |
| `ARG`         | Defines a build-time variable.                                                                                                 |
| `EXPOSE`      | Documents the intended listening port; it does not publish that port.                                                          |
| `CMD`         | Provides the default command or arguments when a container starts.                                                             |
| `ENTRYPOINT`  | Defines the main executable for a container.                                                                                   |
| `USER`        | Sets the user for subsequent build steps and the default runtime user.                                                         |
| `VOLUME`      | Declares a mount point intended for persistent or externally mounted data.                                                     |
| `HEALTHCHECK` | Defines a command Docker can use to check container health.                                                                    |

### Example: Java Spring Boot application

```
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

- `FROM`: Uses a Java 21 runtime image.
- `WORKDIR`: Sets `/app` as the working directory.
- `COPY`: Copies the already-built JAR into the image.
- `EXPOSE`: Documents port 8080.
- `ENTRYPOINT`: Starts the Java application.

Build and run:

```
docker build -t myapp:1.0 .
docker run -p 8080:8080 myapp:1.0
```

The application must already be built into `target/app.jar` for this Dockerfile to work.

## 5. `RUN` vs `CMD` vs `ENTRYPOINT`

This is one of the most commonly asked Docker interview questions.

| Instruction  | When does it run?         | Purpose                                    |
| ------------ | ------------------------- | ------------------------------------------ |
| `RUN`        | During image build        | Install or prepare something.              |
| `CMD`        | When the container starts | Provide default startup command/arguments. |
| `ENTRYPOINT` | When the container starts | Define the main executable.                |

### Example

```
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY app.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
CMD ["--server.port=8080"]
```

The effective command is:

```
java -jar app.jar --server.port=8080
```

Important rules:

- `RUN` changes the image during the build.
- `CMD` can be overridden by arguments supplied to `docker run`.
- With an exec-form `ENTRYPOINT`, arguments supplied to `docker run` are normally appended to the entrypoint.
- When both `ENTRYPOINT` and `CMD` are specified, `CMD` normally supplies the default arguments to `ENTRYPOINT`.
- Prefer JSON/exec form, such as `ENTRYPOINT ["java", "-jar", "app.jar"]`, for predictable signal handling.

## 6. Docker Container Lifecycle

- Create: Creates a container without starting it.
- Start: Starts an existing stopped container.
- Run: Creates and starts a container.
- Stop: Requests a graceful shutdown, then kills it after a timeout if necessary.
- Kill: Immediately sends a kill signal.
- Restart: Stops and starts a container.
- Remove: Deletes a stopped container.
- Logs: Displays the container's standard output and error streams.

### Essential commands

```
docker images
docker ps
docker ps -a

docker build -t myapp:1.0 .
docker run -d --name myapp -p 8080:8080 myapp:1.0

docker logs myapp
docker logs -f myapp
docker exec -it myapp sh

docker stop myapp
docker start myapp
docker restart myapp
docker rm myapp

docker pull nginx
docker push username/myapp:1.0
```

Remember:

- `docker ps` shows running containers by default.
- `docker ps -a` shows stopped containers too.
- `docker exec` executes a command inside an already-running container.
- `docker run` creates a new container; it does not restart an existing named container.
- `docker rm` normally requires a stopped container; `docker rm -f` force-removes it.
- `docker rmi` removes an image, not a container.
- `docker logs` only shows logs written to the container's stdout/stderr streams.

## 7. Port Mapping and Networking

### Port mapping

```
docker run -p 8080:80 nginx
```

- Host port: `8080`
- Container port: `80`

The host receives requests on port 8080 and forwards them to port 80 inside the container.

Important: `EXPOSE 80` alone does not publish the port. Use `-p` to publish it.

### Docker network types

- Bridge: Common default for standalone containers on Linux; containers can communicate on the same bridge network.
- User-defined bridge: Allows containers on that network to discover each other by name.
- Host: Uses the host's network namespace, where supported; normal port mapping is not used.
- None: Disables ordinary container networking.
- Overlay: Connects containers across multiple Docker hosts in supported setups.

### Common interview traps

- `localhost` inside a container refers to that same container, not automatically to your host or another container.
- Two containers can communicate using container/service names when their network configuration supports name resolution.
- Publishing a port is different from exposing or documenting a port.
- Network connectivity does not automatically guarantee application-level connectivity; the application must listen on the appropriate interface and port.

## 8. Docker Volumes and Persistent Data

Containers are disposable. Data stored only in a container's writable layer may be lost when the container is removed.

- Volume: Docker-managed persistent storage.
- Bind mount: Maps a specific host path into a container.
- tmpfs mount: Stores temporary data in memory on supported Linux environments.
- Persistence: Keeping data beyond the lifetime of a container.

### Example

```
docker volume create pgdata

docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=example \
  -v pgdata:/var/lib/postgresql/data \
  postgres
```

### Volume vs bind mount

| Volume                                        | Bind mount                                               |
| --------------------------------------------- | -------------------------------------------------------- |
| Managed by Docker                             | Uses a specified host path                               |
| Good for persistent application/database data | Good for development files and host-to-container sharing |
| Independent of a particular source directory  | Depends on the host directory/path                       |

Important rules:

- Removing a container does not normally remove a named volume.
- Removing an image does not delete a volume.
- `docker rm -v` removes associated anonymous volumes, but does not remove named volumes.
- `docker volume prune` can delete unused volumes; use it carefully.
- Mounting over an existing container directory hides the directory's previous contents while the mount is active.

## 9. Environment Variables and Secrets

- Environment variable: Supplies runtime configuration such as a database URL.
- Build argument (`ARG`): Supplies a value during image building.
- Secret: Sensitive data such as passwords, API keys, and database credentials.
- Configuration separation: Keeping environment-specific settings outside application code and images.

### Example

```
docker run -e SPRING_PROFILES_ACTIVE=prod \
  -e DB_HOST=db \
  myapp:1.0
```

Important rules:

- Spring Boot commonly maps environment variables such as `SPRING_PROFILES_ACTIVE` to application configuration.
- `ARG` is not a safe place for secrets; build arguments can leak through image/build metadata or logs.
- `ENV` is not a secure secret store either.
- Avoid baking production credentials into an image.
- Use a secret manager or an appropriately secured runtime secret mechanism.

## 10. Docker Compose

Docker Compose defines and runs a multi-container application using a YAML configuration file, commonly `compose.yaml`.

It is useful for running a Spring Boot application, PostgreSQL, and Redis together during development.

### Example

```
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

Commands:

```
docker compose up -d
docker compose ps
docker compose logs -f
docker compose down
```

Important concepts:

- Service: A named component defined in the Compose file.
- Service discovery: Services on the default Compose network can usually reach each other by service name. Here, the database hostname is `db`.
- `depends_on`: Controls startup/shutdown ordering, but does not inherently guarantee that the dependency is ready to accept requests.
- Health check: Can help determine when a service is actually ready.
- `docker compose down`: Removes Compose containers and networks; named volumes are retained by default.
- `docker compose down -v`: Also removes declared named volumes and attached anonymous volumes, so persistent data can be lost.

## 11. Docker Performance, Security and Best Practices

- Multi-stage build: Uses multiple build stages so the final image can exclude compilers and other build-only dependencies.
- Small base image: Reduces image size and potentially the attack surface; compatibility and security still matter.
- `.dockerignore`: Excludes unnecessary files from the build context.
- Non-root user: Reduces the damage an attacker may cause if the application is compromised.
- Image scanning: Checks images for known vulnerabilities.
- Image pinning: Uses an exact version or digest for reproducibility.
- Graceful shutdown: Allows the application to finish work and release resources when it receives a termination signal.
- Resource limits: Restrict CPU and memory consumption where configured.

### Example `.dockerignore`

```
.git
node_modules
.env
target/
```

Only exclude `target/` if the build does not need the locally generated JAR; the earlier Dockerfile copies `target/app.jar`, so excluding it would make that workflow fail.

### Common mistakes

- Running production containers as root unnecessarily.
- Putting passwords in a Dockerfile.
- Assuming container files are permanent.
- Using `latest` for reproducible production deployments.
- Putting build tools and unnecessary files in the final image.
- Assuming that a running container means the application is healthy.
- Assuming Docker automatically restarts every container after a crash; restart behavior depends on the configured restart policy.

<!-- Shared revision sections (28-32) of the same owner file: they cover Docker and Kubernetes together. -->

## 28. Docker vs Kubernetes vs Docker Compose

| Feature                  | Docker                                     | Docker Compose                                 | Kubernetes                             |
| ------------------------ | ------------------------------------------ | ---------------------------------------------- | -------------------------------------- |
| Main purpose             | Build and run containers                   | Define multi-container applications            | Orchestrate workloads across a cluster |
| Main unit                | Container / image                          | Service                                        | Pod and workload resources             |
| Scaling                  | Manually run more containers               | Supports scaling services                      | Declarative scaling and autoscaling    |
| Self-healing             | Depends on restart policies and tooling    | Limited orchestration                          | Controllers maintain desired state     |
| Networking               | Container networks                         | Service-name communication on Compose networks | Pod networking and Services            |
| Production orchestration | Requires additional tooling for many needs | Primarily suited to simpler environments       | Designed for cluster orchestration     |
| Configuration            | Dockerfile, CLI, environment               | YAML Compose file                              | Kubernetes YAML/API resources          |

### Important interview questions

Does Kubernetes replace Docker?

Not exactly. Kubernetes orchestrates containers, while Docker provides image-building and container tooling. Kubernetes can run containers using compatible runtimes such as containerd without Docker Engine.

Can Kubernetes run without Docker?

Yes. Kubernetes does not require Docker Engine. It needs a compatible container runtime.

Is Docker Compose the same as Kubernetes?

No. Compose is commonly used for local multi-container environments. Kubernetes offers cluster-level orchestration, scheduling, reconciliation and workload management.

Is a Pod the same as a container?

No. A Pod contains one or more containers that share networking and can share storage.

Is a Service the same as a Deployment?

No. A Deployment manages application replicas and updates; a Service provides stable network access to selected endpoints.

## 29. Frequently Asked Interview Differences

### `Deployment` vs `StatefulSet` vs `DaemonSet`

- Deployment: Best for stateless applications whose replicas are interchangeable, such as REST API servers.
- StatefulSet: For workloads needing stable Pod identities and ordered lifecycle behavior, often with persistent storage.
- DaemonSet: Ensures a Pod runs on each eligible node, often for logging, monitoring or networking agents.

### `Secret` vs environment variable

- A Secret is a Kubernetes resource for sensitive configuration.
- An environment variable is one way to pass configuration into a container.
- A Secret can be consumed as an environment variable or mounted as a file. Environment variables themselves are not a secure storage mechanism.

### `Liveness` vs `Readiness`

- Liveness failure can restart the container.
- Readiness failure removes the Pod from normal ready Service endpoints.
- Startup probes protect applications that take longer to start.

### `Request` vs `Limit`

- Request influences scheduling and resource allocation decisions.
- Limit caps resource usage where supported; CPU may be throttled and memory overuse may cause termination.

### `ClusterIP` vs `NodePort` vs `LoadBalancer` vs `Ingress`

- `ClusterIP`: Internal Service access.
- `NodePort`: Access through a node IP and allocated port.
- `LoadBalancer`: Requests load-balancer integration from supported infrastructure.
- `Ingress`: HTTP/HTTPS routing rules implemented by an Ingress controller.

### `Horizontal` vs `Vertical` scaling

- Horizontal: More or fewer replicas.
- Vertical: More or fewer resources per replica.

### `ConfigMap` vs `Secret`

- ConfigMap: Non-sensitive configuration.
- Secret: Sensitive configuration, requiring appropriate access control and protection.

### `Image` vs `Container`

- Image: Template.
- Container: Running instance of that template.

### `Container` vs `Pod`

- Container: Runs an application process.
- Pod: Kubernetes' smallest deployable unit containing one or more containers.

## 30. Common Defaults Worth Remembering

| Concept                       | Important default                                                                        |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| Docker `docker ps`            | Lists running containers by default.                                                     |
| Docker `EXPOSE`               | Does not publish a port.                                                                 |
| Docker `latest`               | A tag, not a guarantee of the newest version.                                            |
| Kubernetes Pod restart policy | `Always` for Pods created through a Deployment; the general Pod API default is `Always`. |
| Kubernetes Service type       | `ClusterIP`.                                                                             |
| Deployment strategy           | `RollingUpdate`.                                                                         |
| Rolling-update parameters     | `maxSurge: 25%`, `maxUnavailable: 25%`, unless overridden.                               |
| Kubernetes namespace          | `default` for namespaced resources when no namespace is specified.                       |
| `kubectl apply`               | Applies a resource configuration; it does not guarantee the application is healthy.      |
| Pod IP                        | Not a stable application endpoint across Pod replacement.                                |
| ConfigMap / Secret updates    | Existing environment variables are not automatically refreshed in running containers.    |
| CPU request                   | Used in scheduling decisions; not the same as a CPU limit.                               |

Defaults can be modified by manifests, admission policies, cluster configuration or platform-specific behavior, so mention the relevant configuration when answering detailed questions.

## 31. Final Interview Revision — Memorize These First

Docker in 10 lines

1. Image = template; container = running instance.
2. Dockerfile defines how to build an image.
3. `RUN` executes during build; `CMD` and `ENTRYPOINT` define runtime behavior.
4. `docker build` builds an image; `docker run` creates and starts a container.
5. `-p HOST:CONTAINER` publishes a container port.
6. Volumes preserve data independently of a container's writable layer.
7. `ENV` sets configuration; it is not a secret store.
8. Docker Compose defines multi-container applications.
9. Containers share a host kernel.
10. Use small images, non-root users, secure secrets and graceful shutdown.

    Kubernetes in 10 lines
11. Cluster = control plane + worker nodes.
12. API Server = entry point; etcd = cluster state store.
13. Scheduler selects nodes; kubelet manages Pods on its node.
14. Pod = smallest deployable unit.
15. Deployment manages ReplicaSets and application replicas.
16. Service provides stable access to Pods.
17. Ingress handles HTTP/HTTPS routing through a controller.
18. ConfigMap = non-sensitive config; Secret = sensitive config.
19. Liveness restarts; readiness controls traffic eligibility; startup protects slow starts.
20. Requests help scheduling; limits constrain resource usage.

## 32. Quick Self-Test

1\. Which Docker instruction runs during image building?

CMD

RUN

ENTRYPOINT

EXPOSE

2\. Which Kubernetes resource maintains a desired number of application replicas?

Service

ConfigMap

Deployment

Ingress

3\. What happens when a readiness probe fails?

The container is always restarted

The Pod is normally removed from ready Service endpoints

The image is deleted

The node is shut down

4\. What is the default Kubernetes Service type?

NodePort

LoadBalancer

Ingress

ClusterIP

5\. Which mechanism preserves database data beyond container removal?

Image tag

EXPOSE

Docker volume

CMD

6\. What is the purpose of a Kubernetes Service?

Build Docker images

Provide stable network access to selected endpoints

Store cluster state in etcd

Build the application JAR

Check answers

Study priority: First master Docker images, Dockerfile instructions, ports, volumes and networking. Then learn Kubernetes Pods, Deployments, Services, probes, resource requests/limits and rollout behavior. These concepts give you the foundation for most Docker and Kubernetes interview questions at junior-to-intermediate software engineering level.
