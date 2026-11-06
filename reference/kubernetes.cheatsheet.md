# Fundamentals

## What Kubernetes Solves ⭐⭐

Kubernetes (K8s) is a container orchestration platform that manages containerized applications across a cluster of machines.

Docker can build and run containers on a host. Kubernetes coordinates many containers across many machines: it handles scaling, service discovery, rollout, recovery and scheduling.

- Docker = containerization technology; Kubernetes = orchestration platform.
- Kubernetes does not require Docker Engine. It uses a compatible container runtime such as containerd or CRI-O.

> Remember: Docker runs containers on a box; Kubernetes runs your app across a cluster.

## Desired State and Self-Healing ⭐

You tell Kubernetes the outcome you want (desired state) using declarative YAML, not step-by-step commands.

- Reconciliation: Kubernetes repeatedly compares actual state with desired state and acts to correct any difference.
- Self-healing: it can restart failed containers or replace failed Pods to match the desired state.
- Declarative configuration describes the outcome; you do not script every operational step.

> Remember: You declare what you want; controllers keep making it true.

## Cluster Architecture ⭐⭐

A cluster = control plane + worker nodes. The control plane decides; the nodes run the workloads.

Control-plane components:

| Component | Role |
| --- | --- |
| API Server (`kube-apiserver`) | Main entry point for all Kubernetes API requests. |
| etcd | Distributed key-value store holding cluster state and config. |
| Scheduler (`kube-scheduler`) | Chooses a suitable node for a new Pod (does not start it). |
| Controller Manager | Runs controllers that reconcile actual state toward desired state. |
| Cloud Controller Manager | Integrates with cloud-provider features. |

Worker-node components:

- Kubelet: ensures the Pods assigned to its node are running as specified.
- Container runtime: runs containers (containerd, CRI-O).
- Kube-proxy: implements Service networking on the node (some CNIs replace it).

> Remember: API Server = front door, etcd = memory, Scheduler = placer, Kubelet = node agent.

# Workloads

## Pod — The Smallest Deployable Unit ⭐⭐

A Pod is the smallest deployable unit; it holds one or more containers. Kubernetes schedules Pods, not individual containers.

- Containers in one Pod share an IP and port space and talk over `localhost`; they can share mounted volumes.
- A Pod is ephemeral: its replacement may get a different IP.
- Multi-container Pods are for containers that must work closely together.

```yaml
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

- `containerPort` only documents the port; it does not expose the Pod publicly.
- Deleting a standalone Pod does not recreate it; a Pod managed by a Deployment is recreated.

> Remember: You deploy Pods, not containers; Pods come and go, so never rely on a Pod's IP.

## Deployment and ReplicaSet ⭐⭐

A Deployment manages replicated stateless Pods and supports declarative updates and rollbacks. It creates ReplicaSets, which keep the requested number of matching Pods running.

```yaml
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
```

- If a Pod fails, the controller restores the desired replica count.
- An update creates a new ReplicaSet and gradually replaces old Pods.
- Three replicas need not mean three machines; a `Running` Pod is not necessarily ready to serve.

> Remember: Deployment → ReplicaSet → Pods; you set the count, the controller keeps it.

## StatefulSet, DaemonSet, Job ⭐

| Workload | Use it for |
| --- | --- |
| Deployment | Stateless apps with interchangeable replicas (REST APIs). |
| StatefulSet | Stable Pod identities and ordered lifecycle, often with persistent storage. |
| DaemonSet | One Pod per eligible node (logging, monitoring, networking agents). |
| Job | Finite work that runs to completion, then stops. |
| CronJob | Creates Jobs on a recurring schedule. |

Jobs suit database migrations, report generation and scheduled cleanup. Because Jobs can retry, design tasks carefully if they modify data.

```yaml
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

> Remember: Deployment for always-on, Job for run-once, DaemonSet for one-per-node, StatefulSet for identity.

# Networking

## Services ⭐⭐⭐

A Service gives a stable way to reach a group of Pods, even as individual Pod IPs change. It selects Pods by label.

| Type | Exposure |
| --- | --- |
| ClusterIP (default) | Internal cluster IP; reachable only inside the cluster. |
| NodePort | A port on each node's IP, subject to firewall/network rules. |
| LoadBalancer | Requests an external load balancer from supported infrastructure. |
| Headless (`clusterIP: None`) | DNS returns backing endpoint addresses instead of one Service IP. |

```yaml
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

- `port` is what the Service exposes; `targetPort` is the Pod's port. They need not match.
- Trap: if the app listens on 8080, the Service can expose 80 and forward to 8080.

> Remember: Service = stable front for shifting Pods; Service `port` ≠ container port.

## Ingress and Gateway API ⭐

Ingress is an API resource defining HTTP/HTTPS routing rules to Services. An Ingress Controller is the running implementation that actually routes the traffic.

Flow: Client → Ingress Controller → Service → Pods.

- Path-based routing sends `/api` and `/admin` to different Services; host-based routing sends `api.example.com` vs `shop.example.com` to different Services.
- TLS termination (decrypting HTTPS) happens at the gateway/load balancer.
- An Ingress resource alone does nothing until a controller is installed and configured.
- Gateway API (Gateway, HTTPRoute) is a newer, more expressive alternative for advanced traffic management.

> Remember: Ingress is just rules; you also need an Ingress controller to enforce them.

## Networking and DNS ⭐

- Pods can communicate across nodes, subject to network config and policy.
- Services get a stable DNS name so apps need not track changing Pod IPs. Cluster DNS is usually CoreDNS.
- A Service name looks like `myapp-service.my-namespace.svc.cluster.local`.
- CNI (Container Network Interface) is the plugin standard for Pod networking.
- NetworkPolicy restricts traffic between Pods, but only where the networking implementation supports it.
- EndpointSlice tracks the network endpoints behind a Service.

> Remember: Reach apps by Service DNS name, never by Pod IP.

# Config and Storage

## ConfigMap and Secret ⭐⭐

Both inject configuration separately from the image. A Pod can consume either as environment variables or mounted files.

| Aspect | ConfigMap | Secret |
| --- | --- | --- |
| Purpose | Non-sensitive config (feature flags, service URL) | Sensitive config (password, API token) |
| Auto-encrypted? | No | Not necessarily |

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  SPRING_PROFILES_ACTIVE: "prod"
  LOG_LEVEL: "INFO"
```

- Secrets are not automatically secure: base64 encoding is not encryption.
- Protect them with RBAC and encryption at rest; never commit real credentials to Git.
- Env vars injected into a running container do not refresh when the source changes — a restart or rollout is needed. Mounted files can update eventually, but the app may need to reload them.

> Remember: Secret ≠ secure by default; base64 is encoding, not encryption.

# Scaling and Rollouts

## Scaling and High Availability ⭐

- Horizontal scaling = more/fewer replicas; vertical scaling = more/fewer resources per replica.
- Horizontal Pod Autoscaler (HPA) adjusts replica count from metrics (commonly CPU, which needs resource requests set).
- Vertical Pod Autoscaler (VPA) recommends or adjusts Pod resource requests.
- Cluster Autoscaler adds/removes nodes; it does not change replica counts.
- Spread Pods with anti-affinity / topology spread; three replicas on one node do not survive a node failure.
- A PodDisruptionBudget (PDB) limits voluntary disruptions but does not prevent all failures.

> Remember: HPA scales Pods, Cluster Autoscaler scales nodes; spread replicas for real HA.

## Rolling Updates and Rollbacks ⭐⭐

A rolling update gradually replaces old Pods with new ones. A rollback returns the Deployment to an earlier revision.

```bash
kubectl set image deployment/myapp app=nginx:1.29
kubectl rollout status deployment/myapp
kubectl rollout history deployment/myapp
kubectl rollout undo deployment/myapp
```

- Default strategy is `RollingUpdate`; defaults are `maxSurge: 25%` and `maxUnavailable: 25%` unless overridden.
- `maxSurge` = extra Pods allowed during the update; `maxUnavailable` = Pods allowed to be down.
- A rollout fails if new Pods never become ready; readiness probes stop traffic reaching unready Pods.
- Rollback restores config only — it does not reverse database migrations or other external side effects.

> Remember: Rolling update swaps Pods gradually; rollback undoes config, not data changes.

# Health and Scheduling

## Probes ⭐⭐

Probes tell Kubernetes an application's state.

| Probe | Answers | On failure |
| --- | --- | --- |
| Liveness | Is the container still healthy? | Kubelet restarts the container. |
| Readiness | Can it accept traffic now? | Pod removed from ready Service endpoints. |
| Startup | Has a slow app finished starting? | Delays liveness/readiness until startup succeeds. |

```yaml
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

- Readiness failure does not restart the container; only liveness failure does (after the threshold).
- The app must expose these endpoints. Poorly designed probes cause needless restarts or drop healthy Pods from traffic.

> Remember: Liveness restarts, readiness gates traffic, startup shields slow starters.

## Resource Requests and Limits ⭐⭐

- Request: amount used for scheduling decisions (where the Pod can fit).
- Limit: maximum usage — CPU is throttled, memory overuse causes `OOMKilled`.

```yaml
resources:
  requests:
    cpu: "250m"
    memory: "256Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"
```

- `250m` CPU = 0.25 core; `256Mi` = 256 mebibytes (binary unit).
- QoS class is derived from requests/limits and used under resource pressure.
- If requests are omitted, behavior depends on cluster defaults and admission policies — do not assume a standard value.

> Remember: Requests get you scheduled; limits cap you (CPU throttles, memory kills).

## Namespaces, Labels and RBAC ⭐

- Namespace: a logical grouping of resources (`default` when none is given). Logical separation only, not security isolation.
- Label: a key-value pair on a resource; a Selector picks resources by their labels.
- A Service selects its Pods by labels; a Deployment's selector must match its Pod template's labels.
- Annotation: metadata for tools; not used for label selection.
- RBAC (Role-Based Access Control) governs who can do what on the API; it does not enforce network isolation.
- ServiceAccount: the identity a workload uses to call the Kubernetes API.
- NetworkPolicy can restrict Pod traffic where the CNI supports it.

> Remember: Labels wire Services to Pods; namespaces separate, RBAC authorizes, NetworkPolicy isolates.

# Operations

## Essential kubectl ⭐

`kubectl` is the CLI that talks to the API Server.

| Command | Purpose |
| --- | --- |
| `kubectl get pods` / `get deployments` / `get services` / `get nodes` | List resources. |
| `kubectl get pods -o wide` | Show node placement and extra details. |
| `kubectl describe pod POD` | Pod details and events. |
| `kubectl logs POD` / `logs POD -f` | Read / follow logs. |
| `kubectl exec -it POD -- sh` | Open a shell in a container. |
| `kubectl apply -f app.yaml` | Create or update resources declaratively. |
| `kubectl delete -f app.yaml` | Delete resources from a file. |
| `kubectl scale deployment myapp --replicas=5` | Change replica count. |
| `kubectl port-forward service/myapp 8080:80` | Forward a local port (debugging only). |

> Remember: `apply` sets desired state; it does not guarantee the app is healthy.

## Pod States and Debugging ⭐⭐

| State / error | Meaning |
| --- | --- |
| `Pending` | Not yet scheduled; check events and resource availability. |
| `Running` | Containers created — not a guarantee of readiness. |
| `Succeeded` | All containers completed successfully. |
| `CrashLoopBackOff` | Container keeps failing; Kubernetes backs off before restarting. |
| `ImagePullBackOff` / `ErrImagePull` | Cannot pull the image. |
| `OOMKilled` | Killed for exceeding its memory limit. |
| `CreateContainerConfigError` | Bad config; check Secrets and ConfigMaps. |
| `Terminating` | Being deleted; shutdown may still be in progress. |

Debug `CrashLoopBackOff`:

```bash
kubectl logs POD --previous
kubectl describe pod POD
kubectl get events --sort-by=.metadata.creationTimestamp
```

Then check the app command, config, env vars, resource limits, exit codes, probes and dependencies.

> Remember: `CrashLoopBackOff` is a symptom, not a cause; `--previous` logs + `describe` find the real reason.

## Defaults Worth Knowing ⭐

| Concept | Default |
| --- | --- |
| Service type | `ClusterIP` |
| Deployment strategy | `RollingUpdate` |
| Rolling-update params | `maxSurge: 25%`, `maxUnavailable: 25%` |
| Namespace | `default` |
| Pod restart policy | `Always` (including Deployment-managed Pods) |
| Pod IP | Not stable across Pod replacement |
| ConfigMap/Secret env vars | Not auto-refreshed in running containers |

Defaults can be changed by manifests, admission policies or cluster config.

# Common "Why X vs Y?" Comparisons

## Deployment vs StatefulSet vs DaemonSet ⭐

- Deployment: stateless, interchangeable replicas.
- StatefulSet: stable identities, ordered lifecycle, persistent storage.
- DaemonSet: one Pod on every eligible node.

> Remember: Pick by identity needs — none (Deployment), stable (StatefulSet), per-node (DaemonSet).

## Service vs Ingress ⭐

- Service: stable network access (L3/L4) to a set of Pods; types ClusterIP, NodePort, LoadBalancer.
- Ingress: L7 HTTP/HTTPS routing rules across Services, enforced by an Ingress controller.
- A LoadBalancer Service and an Ingress are different resources with different purposes.

> Remember: Service reaches Pods; Ingress routes HTTP paths/hosts to Services.

## ConfigMap vs Secret ⭐

- ConfigMap: non-sensitive config, plain values.
- Secret: sensitive config, needs RBAC and encryption at rest; base64 is not security.

> Remember: Same mechanism, different intent — Secret demands protection, ConfigMap does not.

## Requests vs Limits ⭐

- Request influences scheduling and allocation.
- Limit caps usage: CPU throttled, memory overuse terminates the container.

> Remember: Request = guaranteed floor for scheduling; limit = hard ceiling.

## Liveness vs Readiness ⭐

- Liveness failure restarts the container.
- Readiness failure removes the Pod from Service traffic (no restart).
- Startup probe shields slow-starting apps from premature liveness failures.

> Remember: Liveness = restart, readiness = traffic gate.

## ClusterIP vs NodePort vs LoadBalancer vs Ingress ⭐

- ClusterIP: internal access.
- NodePort: access via a node IP and allocated port.
- LoadBalancer: external load balancer from infrastructure.
- Ingress: HTTP/HTTPS routing via a controller.

> Remember: Inside → ClusterIP; a node port → NodePort; cloud LB → LoadBalancer; HTTP routing → Ingress.

## Horizontal vs Vertical Scaling

- Horizontal: more or fewer replicas.
- Vertical: more or fewer resources per replica.

> Remember: Scale out (more Pods) vs scale up (bigger Pods).

## Pod vs Container ⭐

- Container: runs one application process.
- Pod: Kubernetes' smallest deployable unit, wrapping one or more containers that share networking and can share storage.

> Remember: A Pod is the schedulable wrapper; a container is the process inside it.

## Does Kubernetes Replace Docker?

Not exactly. Kubernetes orchestrates containers; Docker provides image-building and container tooling. Kubernetes can run containers with runtimes like containerd without Docker Engine. Docker Compose, by contrast, suits local multi-container setups, not cluster orchestration.

> Remember: Kubernetes orchestrates; Docker builds and runs; Compose is for local multi-container dev.
