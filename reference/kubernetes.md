# Docker & Kubernetes — Interview Cheat Sheet

This guide focuses on the must-know concepts for Java/Spring Boot backend and software engineering interviews. Learn the basic definitions, commands, differences, defaults, and common interview traps first.

# Part 2: Kubernetes

## 12. Kubernetes Fundamentals

- Kubernetes (K8s): An orchestration platform that manages containerized applications across a cluster of machines.
- Cluster: A collection of machines managed by Kubernetes.
- Node: A machine that runs Kubernetes workloads.
- Control plane: The components that manage the cluster's desired state.
- Worker node: A node that runs application workloads.
- Desired state: The state you ask Kubernetes to maintain.
- Reconciliation: Kubernetes repeatedly compares actual state with desired state and acts to correct differences.
- Self-healing: Kubernetes can replace failed Pods or restart failed containers according to the relevant configuration.
- Declarative configuration: Describing the desired outcome, commonly in YAML, instead of manually issuing every operational step.

### Why Kubernetes when Docker already exists?

Docker can run containers. Kubernetes coordinates workloads across a cluster and helps manage scaling, service discovery, rollout, recovery, and scheduling.

Interview answer: Docker is primarily a containerization technology; Kubernetes is a container orchestration platform. Kubernetes does not require Docker Engine specifically and commonly uses containerd or CRI-O as its container runtime.

## 13. Kubernetes Architecture

Control Plane

API Server · etcd · Scheduler · Controller Manager

Worker Node 1

Kubelet

Container runtime

Pods

Worker Node 2

Kubelet

Container runtime

Pods

### Control-plane components

- API Server (`kube-apiserver`): Main entry point for Kubernetes API requests.
- etcd: Distributed key-value store that stores Kubernetes cluster state and configuration data.
- Scheduler (`kube-scheduler`): Chooses a suitable node for a newly scheduled Pod.
- Controller Manager: Runs controllers that work to bring actual state closer to desired state.
- Cloud Controller Manager: Integrates Kubernetes with supported cloud-provider functionality.

### Worker-node components

- Kubelet: Ensures the Pods assigned to its node are running as specified.
- Container runtime: Runs containers; examples include containerd and CRI-O.
- Kube-proxy: Implements Service networking behavior on many clusters, often using network rules. Some cluster networking implementations replace its functionality.

### Important relationships

- The API Server is the main communication point for Kubernetes control-plane operations.
- `etcd` stores cluster state; it does not run your application containers.
- The Scheduler selects a node; it does not itself start containers.
- Kubelet works on its node; it is not the cluster-wide scheduler.
- Controllers continually reconcile resources, such as Deployments and ReplicaSets.

## 14. Pod — The Smallest Deployable Unit

- Pod: The smallest deployable unit in Kubernetes; it contains one or more containers.
- Multi-container Pod: Containers that need to work closely together can share a Pod.
- Shared network: Containers in the same Pod share an IP address and port space and can communicate through `localhost`.
- Shared storage: Containers can share mounted volumes when configured.
- Ephemeral Pod: A Pod can be replaced, and its replacement may have a different IP address.
- Pod IP: The IP assigned to a Pod by the cluster networking setup.

### Why not deploy containers directly?

Kubernetes schedules Pods, not individual containers. The Pod provides the shared networking, storage configuration, and lifecycle boundary for its containers.

### Example Pod YAML

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp
spec:
  containers:
    - name: app
      image: nginx:1.28
      ports:
        - containerPort: 80
```

```
kubectl get pods
kubectl describe pod myapp
kubectl logs myapp
kubectl exec -it myapp -- sh
kubectl delete pod myapp
```

Important rules:

- `containerPort: 80` documents the container's intended port; it does not expose the Pod publicly.
- Deleting a standalone Pod does not automatically recreate it.
- A Pod managed by a Deployment is normally recreated if it is deleted and the Deployment still requires that replica.
- Containers in one Pod share networking; separate Pods normally have separate IP addresses.

## 15. Deployment and ReplicaSet

### Deployment

A Deployment manages a set of replicated application Pods and supports declarative updates and rollbacks.

### ReplicaSet

A ReplicaSet maintains the requested number of matching Pod replicas. Deployments normally manage ReplicaSets for you.

### Replicas

The number of Pod instances you want running.

### Example

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: app
          image: nginx:1.28
          ports:
            - containerPort: 80
```

This Deployment asks Kubernetes to maintain three matching Pod replicas.

### Important rules

- A Deployment creates and manages ReplicaSets, which manage Pods.
- If one Pod fails, its controller attempts to maintain the desired replica count.
- A Deployment update can create a new ReplicaSet and gradually replace old Pods.
- Scaling a Deployment changes the desired replica count.
- Three replicas do not necessarily mean three separate physical machines; scheduling depends on constraints and available resources.
- A Pod being `Running` does not guarantee the application is ready to serve requests.

### Deployment commands

```
kubectl get deployments
kubectl scale deployment myapp --replicas=5
kubectl set image deployment/myapp app=nginx:1.29
kubectl rollout status deployment/myapp
kubectl rollout history deployment/myapp
kubectl rollout undo deployment/myapp
```

## 16. Kubernetes Services

A Service provides a stable way to access a group of Pods, even when individual Pod IP addresses change.

This is one of the most important Kubernetes concepts.

### Service types

[Kubernetes Service Types: ClusterIP, NodePort, LoadBalancer](https://images.openai.com/static-rsc-4/_O6h8_VKGo8byXVqfOLF3qIAKpGfyw0SlrRrLV6XN6udXsvFImLuva5985SGime2dyUoTokV6LgLsDjTWWeBgS0UtGJkLsgiyt_xZ97HSNu77CuIhaaI_NWN7ii0o2WJxq5zie7etCfz45SxB1aWVN_8QaSWd7GYYJ-X0ITs3Ok?purpose=inline)

ClusterIP

Default Service type. Provides an internal cluster IP for communication within the cluster.

[Exposing Kubernetes services to the internet | Scaleway Documentation](https://images.openai.com/static-rsc-4/H60mSQmD1K5ZwzvvEMjh1PxGPslBEgvSlORB_NiWx1K1kohYc9m0IoU990Z26PBJz7BNLa1poLcfawxZMNZWBF3XSHnHc-I1cYJis18x-dpfmu_LanMEd_gegSlGZUk8O9oN41S0fXuSofPAyrLWMAasEKOKWnAS0WDH7vP3hpM?purpose=inline)

NodePort

Exposes the Service through a port on each eligible node's IP, subject to network access and firewall configuration.

[Getting started with Kubernetes Services - Spectro Cloud](https://images.openai.com/static-rsc-4/9q9PtIuPLnk1AGFr44cGg-Bfrv81EHwAE-WwlzN4IoCx2KdCwM9dQR4nym4dqzkzXT8y_vPB_mtkfUwJCpLqMvnMxpGD_Ah0TpmXVnZqbfD8HZ_BU7wFM3xBEHG2lhDemr8E0lqcZ2MLIbmGHSHp-TDPpsDzbKLIVYRrBp8gTkI?purpose=inline)

LoadBalancer

Requests an external load balancer through supported infrastructure or integrations.

[Part-105: Kubernetes Headless Service Explained (with Simple Diagram) - DEV Community](https://images.openai.com/static-rsc-4/9IJ3Qx47cNcjSRx3wT3QEGliIUS74Px6GIPjapRlQiQ8gDI3K-i0iYPv74ZaAQmSrIyPyFcU6FMzSqL-LKxnmwEFGS6Qoe5UCV0_qHH9JXzxF7xffK9-e6DnO2mcwSTNzKkPD0R-4evNzzCRBEBUOd2-0INBLd3RkH7Kymdgx4M?purpose=inline)

Headless Service

Configured with `clusterIP: None`; DNS can return the addresses of backing endpoints rather than a normal Service cluster IP.

### Example Service

```
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP
```

- `selector`: Matches Pods with label `app: myapp`.
- `port`: The port exposed by the Service.
- `targetPort`: The destination port on the selected Pods.
- `type`: Determines the exposure behavior.

### Common interview trap

If the application listens on port `8080`, the Service can expose port `80` and forward requests to `8080`.

The Service's `port` and the container's `containerPort` do not have to match.

## 17. Ingress and Gateway

- Ingress: A Kubernetes API resource that defines HTTP/HTTPS routing rules to Services.
- Ingress Controller: A running implementation that processes Ingress resources and configures traffic routing.
- Gateway API: A newer, more expressive set of Kubernetes APIs for traffic management, including Gateway and HTTPRoute resources.
- TLS termination: Decrypting HTTPS traffic at a gateway or load balancer.
- Path-based routing: Routing `/api` and `/admin` to different backend Services.
- Host-based routing: Routing requests such as `api.example.com` and `shop.example.com` to different Services.

### Example flow

Client / Browser

Ingress Controller

Kubernetes Service

Application Pods

Important rules:

- Creating an Ingress resource alone does not guarantee that traffic will be routed; a suitable controller must be installed and configured.
- Ingress primarily covers HTTP/HTTPS routing.
- A `LoadBalancer` Service and an Ingress are different resources with different purposes.
- Gateway API is increasingly used for more advanced traffic-management requirements.

## 18. ConfigMap and Secret

Both provide configuration separately from the application image.

| Concept                  | ConfigMap                   | Secret                  |
| ------------------------ | --------------------------- | ----------------------- |
| Purpose                  | Non-sensitive configuration | Sensitive configuration |
| Example                  | Feature flags, service URL  | Password, API token     |
| Data                     | Configuration values        | Sensitive values        |
| Automatically encrypted? | No                          | Not necessarily         |

### Example

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  SPRING_PROFILES_ACTIVE: "prod"
  LOG_LEVEL: "INFO"
```

A Pod can consume a ConfigMap or Secret through environment variables or mounted files, subject to its configuration.

Important rules:

- Kubernetes Secrets are not automatically secure just because they are named Secrets.
- Base64 encoding is not encryption.
- Restrict access using RBAC and configure encryption at rest where appropriate.
- Do not commit real credentials to Git.
- Environment variables injected into an existing container do not automatically update when the source ConfigMap or Secret changes. Restarting or rolling out Pods may be necessary.
- Mounted configuration files can update eventually in supported configurations, but an application may need to reload the files.

## 19. Liveness, Readiness and Startup Probes

These probes help Kubernetes determine the state of an application.

Liveness probe

Answers: Is the container still healthy enough to keep running?

If it repeatedly fails, kubelet restarts the container.

Readiness probe

Answers: Can the application accept traffic now?

When it fails, the Pod is normally removed from the ready endpoints used for Service traffic.

Startup probe

Answers: Has this slow-starting application finished starting up?

It can delay liveness and readiness checks until startup succeeds.

### Tiny example

```
livenessProbe:
  httpGet:
    path: /actuator/health/liveness
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /actuator/health/readiness
    port: 8080
  periodSeconds: 5
```

The application must implement and expose these endpoints for the checks to work.

Important interview traps:

- Readiness failure does not, by itself, restart the container.
- Liveness failure triggers a container restart after the configured failure threshold is reached.
- Startup probes protect slow-starting applications from premature liveness failures.
- Poorly designed probes can cause unnecessary restarts or remove healthy applications from traffic.

## 20. Resource Requests and Limits

- CPU request: The amount of CPU used for scheduling decisions and a baseline resource request.
- Memory request: The amount of memory used for scheduling decisions.
- CPU limit: The maximum CPU usage enforced through throttling.
- Memory limit: The memory usage limit; exceeding it can lead to termination due to an out-of-memory condition.
- QoS class: A classification based on CPU and memory requests/limits, used in resource-pressure handling.

### Example

```
resources:
  requests:
    cpu: "250m"
    memory: "256Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"
```

Remember:

- `250m` CPU means 0.25 of one CPU core.
- `500m` CPU means 0.5 of one CPU core.
- `Mi` is a binary memory unit; `256Mi` is 256 mebibytes.
- Requests help Kubernetes decide where a Pod can fit.
- CPU limits can throttle an application.
- Memory-limit breaches can cause an `OOMKilled` container.
- If requests are omitted, behavior depends on cluster defaults, admission policies and configuration; do not assume every Pod receives the same automatic requests.

## 21. Scaling and High Availability

- Horizontal scaling: Increasing or decreasing the number of application replicas.
- Vertical scaling: Increasing or decreasing resources allocated to an individual workload.
- Horizontal Pod Autoscaler (HPA): Adjusts replica counts based on configured metrics.
- Vertical Pod Autoscaler (VPA): Recommends or adjusts Pod resource requests, depending on configuration and mode.
- Cluster Autoscaler: Can add or remove cluster nodes when supported infrastructure and configuration allow it.
- High availability: Designing the system to continue operating despite certain failures.
- Pod anti-affinity / topology spread: Helps distribute Pods across nodes or failure domains.
- Disruption budget (PDB): Limits certain voluntary disruptions to a workload.

### Important rules

- HPA commonly uses CPU utilization, but CPU-based scaling usually requires resource requests to be configured.
- HPA scales workload replicas, not the physical machine directly.
- Cluster Autoscaler handles node capacity, not application replica counts.
- Three replicas on one node do not provide the same node-failure resilience as replicas spread across multiple nodes.
- A PDB does not prevent all Pod failures; it primarily constrains supported voluntary disruptions.

## 22. Rolling Updates and Rollbacks

- Rolling update: Gradually replaces old Pods with new ones.
- Rollback: Returns a Deployment to an earlier revision.
- Revision: A recorded Deployment rollout state.
- `maxSurge`: Controls how many extra Pods may be created during a rolling update.
- `maxUnavailable`: Controls how many Pods may be unavailable during the update.

Important rules:

- A Deployment's default strategy is `RollingUpdate`.
- The standard default rolling-update values are `25%` for `maxSurge` and `25%` for `maxUnavailable`, unless overridden.
- A rollout can still fail if new Pods never become ready.
- Rollback restores an earlier Deployment configuration; it does not automatically reverse database migrations or other external side effects.
- Readiness probes help prevent traffic from being sent to application Pods before they are ready.

## 23. Jobs and CronJobs

- Job: Runs Pods until a specified task completes successfully according to its configuration.
- CronJob: Creates Jobs on a recurring schedule.
- One-off task: A task that should finish instead of serving requests continuously.
- Completion: A Job reaches its configured successful completion state.

Examples include database migrations, report generation and scheduled cleanup.

```
apiVersion: batch/v1
kind: Job
metadata:
  name: report-job
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: report
          image: busybox:1.37
          command: ["sh", "-c", "echo Report generated"]
```

Important rules:

- A Deployment is designed for continuously running workloads.
- A Job is designed for finite work.
- A CronJob schedules Jobs; it does not directly serve application traffic.
- Retries and repeated execution mean tasks should be designed carefully, particularly if they modify data.

## 24. Namespaces, Labels and Selectors

- Namespace: A logical grouping of Kubernetes resources within a cluster.
- Label: A key-value pair attached to a resource.
- Selector: A rule that selects resources based on labels.
- Annotation: Additional metadata intended for tools or automation; unlike labels, annotations are not used for ordinary label selection.
- RBAC: Role-Based Access Control, which governs who can perform which operations on Kubernetes resources.
- ServiceAccount: An identity used by workloads and other processes to interact with the Kubernetes API.

Important rules:

- A Service normally selects its backing Pods using labels and selectors.
- A Deployment's selector must match the labels on its Pod template.
- Namespaces provide logical separation, but do not by themselves guarantee security isolation.
- Kubernetes RBAC controls API permissions; it does not automatically enforce network isolation between Pods.
- NetworkPolicies can restrict Pod traffic when the cluster networking implementation supports them.

## 25. Kubernetes Networking and DNS

- Pod-to-Pod communication: Kubernetes networking generally enables Pods to communicate across nodes, subject to network configuration and policies.
- Service DNS: A stable DNS name allows workloads to access Services without tracking changing Pod IPs.
- Cluster DNS: Usually provided by CoreDNS or another configured DNS implementation.
- CNI: Container Network Interface; a standard used by container networking plugins.
- NetworkPolicy: Rules that control permitted network traffic between selected Pods and other network endpoints, where supported.
- EndpointSlice: An API resource that tracks network endpoints associated with a Service.

A typical Service name looks like:

```
myapp-service.my-namespace.svc.cluster.local
```

The exact DNS name and resolvability depend on cluster DNS configuration.

Important rules:

- Pod IPs are not the preferred stable endpoint for application-to-application communication.
- Services provide stable access to matching endpoints.
- A Service with no ready matching endpoints will not send normal traffic to a ready application backend that does not exist.
- NetworkPolicy enforcement depends on the cluster's networking implementation.

## 26. Kubernetes Configuration and Deployment Commands

### Must-know `kubectl` commands

`kubectl` is the command-line tool used to communicate with the Kubernetes API Server.

| Command                                      | Purpose                                                   |
| -------------------------------------------- | --------------------------------------------------------- |
| `kubectl get pods`                           | List Pods.                                                |
| `kubectl get all`                            | Show common resource types; not literally every resource. |
| `kubectl get deployments`                    | List Deployments.                                         |
| `kubectl get services`                       | List Services.                                            |
| `kubectl get nodes`                          | List cluster nodes.                                       |
| `kubectl describe pod POD`                   | Show Pod details and events.                              |
| `kubectl logs POD`                           | Read container logs.                                      |
| `kubectl logs POD -f`                        | Follow logs.                                              |
| `kubectl exec -it POD -- sh`                 | Open a shell in a running container, if available.        |
| `kubectl apply -f app.yaml`                  | Create or update resources declaratively.                 |
| `kubectl delete -f app.yaml`                 | Delete resources described by a file.                     |
| `kubectl get pods -n default`                | List Pods in a namespace.                                 |
| `kubectl get pods -o wide`                   | Show additional details, including node placement.        |
| `kubectl port-forward service/myapp 8080:80` | Forward local port 8080 to Service port 80.               |

### Debugging commands

```
kubectl get pods
kubectl describe pod myapp-xxxxx
kubectl logs myapp-xxxxx
kubectl logs myapp-xxxxx --previous
kubectl get events --sort-by=.metadata.creationTimestamp
kubectl get endpointslices
kubectl rollout status deployment/myapp
```

- `--previous` helps inspect logs from the previous terminated container instance, if available.
- `describe` is especially useful for scheduling failures, image pull errors, probe failures and events.
- `port-forward` is useful for local debugging; it is not a production ingress solution.

## 27. Common Pod States and Errors

| State or error               | Meaning / what to check                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| `Pending`                    | Pod has not finished being scheduled or prepared; inspect events and resource availability.             |
| `Running`                    | Pod is bound to a node and its containers have been created; this does not guarantee readiness.         |
| `Succeeded`                  | All containers completed successfully and will not be restarted for that Pod's normal lifecycle.        |
| `CrashLoopBackOff`           | A container keeps failing and Kubernetes is backing off before restarting it.                           |
| `ImagePullBackOff`           | Kubernetes cannot pull the image and is retrying with backoff.                                          |
| `ErrImagePull`               | An image pull attempt failed.                                                                           |
| `OOMKilled`                  | A container was killed because of an out-of-memory condition.                                           |
| `CreateContainerConfigError` | Container creation configuration could not be resolved; check Secrets, ConfigMaps and related settings. |
| `Terminating`                | The Pod is being deleted; shutdown or finalization may still be in progress.                            |

### How to debug `CrashLoopBackOff`

1. Check `kubectl logs POD --previous`.
2. Run `kubectl describe pod POD`.
3. Check the application command, configuration and environment variables.
4. Check resource limits, exit codes and health probes.
5. Verify dependencies such as databases are reachable.

Interview tip: `CrashLoopBackOff` is not the root cause. It is a symptom indicating repeated container failures.

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
