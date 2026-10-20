# Coverage: Kubernetes
Reference: reference/kubernetes.md  ·  Last updated: 20-10-2026

Every reference item (key list: the numbered sections, plus each question, pattern and "X vs Y" row inside them) appears in exactly
one of Mapped, Corrected or Dropped. A section whose parts went to different places has one row here (Corrected wins over
Mapped), and its other parts are listed under "Details placed elsewhere or cut". Sources for corrections are primary pages.

## Mapped
| Reference item (key + short title) | Landed in | Note |
|---|---|---|
| K12. Kubernetes Fundamentals (parts: Kubernetes, desired state, reconciliation, self-healing, declarative configuration); K12 (parts: cluster, node, control plane, worker node) | concept what-is-kubernetes (hook, points, Mermaid loop, trap, Interview Q "container orchestration"); concept kubernetes-architecture; comparison control-plane-vs-worker-node; glossary control-plane, worker-node | Docs add a nuance used in the Q: Kubernetes is not a fixed workflow but independent control loops |
| K12.Q1. Why Kubernetes when Docker already exists? | concept kubernetes-and-docker (hook, Interview Q "Does Kubernetes replace Docker?") | Runtime part of the model answer is in Corrected |
| K13. Kubernetes Architecture (control plane, worker nodes, relationships); K13 (part: the Scheduler picks a node; it does not start containers) | concept kubernetes-architecture (points, trap, Interview Qs); comparison control-plane-vs-worker-node (two mini diagrams, rows); tree types for every component; concept scheduling (Steps: Bind, the kubelet starts the Pod) | Relationships: API server is the hub (point, bullet), etcd stores state and runs no apps (point), scheduler does not start containers (trap), kubelet works only on its node (point), controllers reconcile (point). kube-proxy optional and cloud-controller-manager optional added from the docs |
| K14.Q1 Why not deploy containers directly? | concept pods (Interview Q) |  |
| K23. Jobs and CronJobs (Job, CronJob, one-off task, completion, example, rules incl. Deployment vs Job, CronJob does not serve traffic, retries need care) | concept jobs-and-cronjobs (hook, points, Mermaid, Example as a CronJob, trap on idempotency, Interview Q Job vs Deployment) |  |
| K24. Namespaces, Labels and Selectors (parts: namespace, label, selector, annotation; rules 1-3: Service selects Pods by labels, Deployment selector must match template labels, namespaces are not security isolation); K24 (rule 4: RBAC controls API permissions, not network isolation); K24 (rule 5: NetworkPolicies restrict traffic when the networking supports them); K24 (part: ServiceAccount = identity used by workloads to talk to the API); K24. Namespaces, Labels and Selectors (part: RBAC definition, "RBAC controls API permissions; it does not enforce network isolation between Pods") | concept namespaces-labels-selectors (points, trap, Example, Interview Qs); comparison labels-vs-annotations; concept network-policies (trap); concept network-policies (point "Needs the CNI", Interview Q 3); concept service-accounts (hook, Mermaid, points, glossary service-account); concept rbac (hook, sayIt, trap); glossary `rbac-term` | RBAC, ServiceAccount, NetworkPolicy lines of K24 belong to rbac, service-accounts, network-policies (linked) Other K24 parts are owned by namespaces-labels-selectors, rbac, service-accounts Widened: a ServiceAccount is also the identity for outside services through workload identity. Other K24 parts belong to other units Namespace, label, selector, annotation, ServiceAccount and NetworkPolicy rows belong to namespaces-labels-selectors, service-accounts and network-policies |
| K27 parts: Pending, Running, Succeeded rows; K27 (part: OOMKilled row); K27 (part: CrashLoopBackOff row); K27 (part: ImagePullBackOff row); K27 (part: ErrImagePull row); K27 (part: OOMKilled row); K27 (part: CreateContainerConfigError row); K27 (part: Terminating row); K27 (part: CrashLoopBackOff debug steps 1-5: logs --previous, describe, config and env, limits/exit codes/probes, dependencies); K27 (part: tip "CrashLoopBackOff is a symptom, not the root cause") | concept pod-lifecycle (point "Phases"); tree pod-phase; concept resource-requests-limits (point, Interview Q 1); concept qos-and-eviction (trap OOMKilled vs Evicted); concept pod-errors (table, trap, Interview Q); concept pod-errors (table, points: retry cap 300 s); glossary imagepullbackoff; concept pod-errors (table); glossary errimagepull; concept pod-errors (table, exit 137 point, Example); tree exit-code-137; concept pod-errors (table); glossary createcontainerconfigerror; concept pod-errors (table row "Stuck Terminating"); glossary terminating-pod; concept pod-errors (Interview Q "How do you debug CrashLoopBackOff?"); concept pod-errors (trap); playbook trap row links it | other K27 rows are owned by pod-errors Exit code 137 added; Evicted added as the contrasting case; debugging steps stay in pod-errors Made precise: over the memory limit, kernel kill, exit code 137; OOMKilled vs Evicted owned by qos-and-eviction (linked) Added why it gets stuck (finalizer, admission webhook) Steps folded into one answer; the command order is owned by kubectl-debugging |
| S28. Docker vs Kubernetes vs Docker Compose (table) | comparison docker-vs-compose-vs-kubernetes (rows: main purpose, main unit, scaling, self-healing, production use); concept what-is-kubernetes lists it in confusedWith | Kubernetes column rows "main purpose" and "self-healing" also shape what-is-kubernetes points; rows "networking" and "configuration" are in Dropped |
| S28.Q1. Does Kubernetes replace Docker? | concept kubernetes-and-docker (Interview Q) |  |
| S28.Q3. Is Docker Compose the same as Kubernetes? | concept kubernetes-and-docker (Interview Q); comparison docker-vs-compose-vs-kubernetes | Added: Compose also supports single-host production deploys (Docker docs) |
| S28.Q4 Is a Pod the same as a container? | concept pods (Interview Q); comparison container-vs-pod |  |
| S28.Q5 part: what a Deployment does (Service vs Deployment); S28.Q5 Is a Service the same as a Deployment? | concept deployments-and-replicasets (hook, sayIt); `confusedWith` deployment-vs-service (networking unit); comparison deployment-vs-service (listed in services confusedWith) |  |
| S29 (as a whole: frequently asked differences) | concept kubernetes-playbook (need → object table and "Don't say / Say" table link each owner) | Rows owned elsewhere: S29.1 deployment-vs-statefulset-vs-daemonset; S29.2 configmaps-and-secrets; S29.3 liveness-vs-readiness-vs-startup; S29.4 requests-vs-limits; S29.5 clusterip-vs-nodeport-vs-loadbalancer and loadbalancer-vs-ingress; S29.6 hpa-vs-vpa-vs-cluster-autoscaler; S29.7 configmap-vs-secret; S29.8 Docker tech; S29.9 container-vs-pod |
| S29.1 Deployment vs StatefulSet vs DaemonSet | comparison deployment-vs-statefulset-vs-daemonset (embedded in statefulsets, listed in daemonsets) |  |
| S29.2 Secret vs environment variable | concept configmaps-and-secrets (Interview Q "Is a Secret more secure than an environment variable?") |  |
| S29.3. Liveness vs Readiness (and Startup) | comparison liveness-vs-readiness-vs-startup (embedded in probes) |  |
| S29.4. Request vs Limit | comparison requests-vs-limits (embedded in resource-requests-limits) |  |
| S29.5 (parts: ClusterIP, NodePort, LoadBalancer); S29.5 (part: Ingress, rules implemented by an Ingress controller) | comparison clusterip-vs-nodeport-vs-loadbalancer; comparison loadbalancer-vs-ingress (row "What it is": Ingress is not a Service type); concept ingress-and-gateway-api (trap) | Ingress part below, under S29.5 (part: Ingress) |
| S29.6 Horizontal vs Vertical scaling | concept `autoscaling` (Interview Q); comparison gist lines | Covered by the 3-sided comparison |
| S29.7 ConfigMap vs Secret | comparison configmap-vs-secret (gist, rows, verdict) |  |
| S29.8. Image vs Container (Docker only) | covered by the Docker tech (reference/docker.coverage.md) | Docker-only item of the shared sections |
| S29.9 Container vs Pod | comparison container-vs-pod |  |
| S30 (footnote: defaults can change through manifests, admission policies, cluster config or platform) | concept kubernetes-playbook (point "4. Default": name the version; admission can change it) | Admission controllers can set defaults (Controlling Access page). S30 rows owned by their concepts |
| S30.1. docker ps lists running containers (Docker only) | covered by the Docker tech (reference/docker.coverage.md) | Docker-only item of the shared sections |
| S30.2. EXPOSE does not publish a port (Docker only) | covered by the Docker tech (reference/docker.coverage.md) | Docker-only item of the shared sections |
| S30.3. latest is a tag, not the newest version (Docker only) | covered by the Docker tech (reference/docker.coverage.md) | Docker-only item of the shared sections |
| S30.4 Pod restart policy default Always | concept pod-lifecycle (Defaults row, point "restartPolicy": Deployments allow only Always) |  |
| S30.5 Service type default ClusterIP | concept services (point "Default type", Defaults row) |  |
| S30.6 Deployment strategy default RollingUpdate | concept `rolling-updates-rollbacks` (Defaults) |  |
| S30.7 maxSurge 25%, maxUnavailable 25% | concept `rolling-updates-rollbacks` (Defaults) |  |
| S30.9. kubectl apply does not guarantee a healthy app | concept kubectl-and-manifests (trap; link to kubectl-debugging) |  |
| S30.10 Pod IP is not a stable endpoint | concept cluster-networking-dns (trap, hook) |  |
| S30.11 ConfigMap/Secret env vars are not refreshed in running containers | concept configmaps-and-secrets (point "Env vars", Interview Q with `kubectl rollout restart`) |  |
| S30.12. CPU request is used for scheduling, not a limit | concept resource-requests-limits (trap) |  |
| S31 (Kubernetes lines as a recap, S31.11-S31.20) | concept kubernetes-playbook (picker rows, trap rows, apply flow steps) | Each line is owned by its concept; S31.17 "Ingress handles routing" is shown as Gateway API (correction owned by ingress-and-gateway-api) |
| S31.1. Image = template; container = running instance (Docker only) | covered by the Docker tech (reference/docker.coverage.md) | Docker-only item of the shared sections |
| S31.2. Dockerfile defines how to build an image (Docker only) | covered by the Docker tech (reference/docker.coverage.md) | Docker-only item of the shared sections |
| S31.3. RUN at build; CMD and ENTRYPOINT at runtime (Docker only) | covered by the Docker tech (reference/docker.coverage.md) | Docker-only item of the shared sections |
| S31.4. docker build vs docker run (Docker only) | covered by the Docker tech (reference/docker.coverage.md) | Docker-only item of the shared sections |
| S31.5. -p HOST:CONTAINER publishes a port (Docker only) | covered by the Docker tech (reference/docker.coverage.md) | Docker-only item of the shared sections |
| S31.6. Volumes preserve data beyond the writable layer (Docker only) | covered by the Docker tech (reference/docker.coverage.md) | Docker-only item of the shared sections |
| S31.7. ENV is config, not a secret store (Docker only) | covered by the Docker tech (reference/docker.coverage.md) | Docker-only item of the shared sections |
| S31.8. Docker Compose defines multi-container apps (Docker only) | covered by the Docker tech (reference/docker.coverage.md) | Docker-only item of the shared sections |
| S31.9. Containers share the host kernel (Docker only) | covered by the Docker tech (reference/docker.coverage.md) | Docker-only item of the shared sections |
| S31.10. Small images, non-root, secure secrets, graceful shutdown (Docker only) | covered by the Docker tech (reference/docker.coverage.md) | Docker-only item of the shared sections |
| S31.11. Cluster = control plane + worker nodes | concept kubernetes-architecture (sayIt); comparison control-plane-vs-worker-node |  |
| S31.12. API Server = entry point; etcd = state store | concept kubernetes-architecture (points, sayIt) |  |
| S31.13. Scheduler picks nodes; kubelet manages Pods on its node | concept kubernetes-architecture (trap, points) |  |
| S31.14 Pod = smallest deployable unit | concept pods (hook, sayIt) |  |
| S31.15 Deployment manages ReplicaSets and replicas | concept deployments-and-replicasets (hook) |  |
| S31.16 Service gives stable access to Pods | concept services (hook) |  |
| S31.17 Ingress = HTTP/HTTPS routing through a controller | concept ingress-and-gateway-api (hook, trap) |  |
| S31.18 ConfigMap = non-sensitive; Secret = sensitive | concept configmaps-and-secrets (hook, sayIt); comparison configmap-vs-secret (gist) |  |
| S31.19. Liveness restarts; readiness gates traffic; startup protects slow starts | concept probes (hook, sayIt) |  |
| S31.20. Requests help scheduling; limits constrain usage | concept resource-requests-limits (hook, sayIt) |  |
| S32 (closing study priority: Pods, Deployments, Services, probes, requests/limits, rollouts first) | concept kubernetes-playbook (order of the picker table); heat hints for this unit | A study tip, not a fact; used as a hint only. Self-test questions S32.Q2-Q6 owned by their concepts |
| S32.Q1. Which Docker instruction runs during image building? (Docker only) | covered by the Docker tech (reference/docker.coverage.md) | Docker-only item of the shared sections |
| S32.Q2 Which resource maintains a desired number of replicas? | concept deployments-and-replicasets (Interview Q) | answer: Deployment, through its ReplicaSet |
| S32.Q3. What happens when a readiness probe fails? | concept probes (trap, Interview Q 1) | Answer: removed from Service EndpointSlices, not restarted |
| S32.Q4 What is the default Service type? | concept services (point, Defaults) | Answer ClusterIP |
| S32.Q5. What preserves database data beyond container removal? (Docker only) | covered by the Docker tech (reference/docker.coverage.md) | Docker-only item of the shared sections |
| S32.Q6 What is the purpose of a Service? | concept services (sayIt, Why it exists) |  |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| K14 rule: containerPort "does not expose the Pod publicly" | Loose: suggests the field exposes the port inside the cluster. It changes nothing: leaving it out does not block a port the process listens on | containerPort is informational; it neither exposes nor blocks the port | https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/ |
| K15 rule: "A Deployment update can create a new ReplicaSet" | Vague "can": only a Pod template change makes a new ReplicaSet and revision; scaling never does | Template change → new ReplicaSet and revision; scaling → count only | https://kubernetes.io/docs/concepts/workloads/controllers/deployment/ |
| K16 (part: NodePort "on each eligible node's IP") | Loose and version-dependent: iptables mode listens on all node IPs; nftables mode only on the node's primary IP by default | Kept to "a node IP plus the nodePort"; range 30000-32767 added | https://kubernetes.io/docs/concepts/services-networking/service/ |
| K17 (part: "Gateway API is increasingly used for more advanced traffic management"); K17 (part: "Ingress primarily covers HTTP/HTTPS") | Understated and outdated: the Ingress API is frozen, Kubernetes recommends Gateway instead, and the community Ingress NGINX controller is retired; Loose: Ingress does not expose other ports or protocols at all | Points "Ingress ... GA since 1.19, now frozen", "Recommended", "Ingress NGINX retired; no fixes after March 2026"; comparison ingress-vs-gateway-api; "HTTP and HTTPS only" (comparison rows); other protocols use LoadBalancer or Gateway API routes (TCPRoute, UDPRoute GA in v1.6) | https://kubernetes.io/docs/concepts/services-networking/ingress/ ; https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/ ; https://kubernetes.io/docs/concepts/services-networking/ingress/ ; https://github.com/kubernetes-sigs/gateway-api/releases |
| K18 part: table row "Automatically encrypted? Secret: Not necessarily"; K18 part: "Mounted configuration files can update eventually in supported configurations"; K18. ConfigMap and Secret (part: "Restrict access using RBAC") | Vague: hides the real default; Loose: does not say which mounts never update; Incomplete: implies a `get` rule on Secrets is the only thing to control | Secrets are stored unencrypted in etcd by default; encryption at rest is opt-in on the API server (Defaults row, trap, tree encryption-at-rest); Mounted keys refresh after the kubelet sync and cache delay; a subPath mount never receives updates; the app must re-read the file (point "Mounted files", Interview Q); `list` and `watch` also reveal Secret contents, and anyone who can create Pods in a namespace can mount its Secrets and run as any ServiceAccount there; the built-in `edit` role can read Secrets, `view` cannot (rbac Interview Q 2; tree `edit-role`, `view-role`) | https://kubernetes.io/docs/concepts/configuration/secret/ ; https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/ ; https://kubernetes.io/docs/concepts/configuration/configmap/ ; https://kubernetes.io/docs/concepts/security/rbac-good-practices/ ; https://kubernetes.io/docs/reference/access-authn-authz/rbac/ |
| K19 (part: tiny example); K19 (part: readiness "removed from the ready endpoints") | Liveness probe uses `initialDelaySeconds: 10` as the way to survive a slow start; no startup probe shown; Loose wording; does not say which object | Slow starts get a startup probe on the liveness endpoint with a high failureThreshold (budget = failureThreshold × periodSeconds); liveness stays strict; The EndpointSlice controller removes the Pod IP from the EndpointSlices of every matching Service | https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/ ; https://docs.spring.io/spring-boot/reference/actuator/endpoints.html ; https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/ |
| K20. Resource Requests and Limits (last rule: "if requests are omitted, behaviour depends on cluster defaults"); K20 (part: QoS class "used in resource-pressure handling") | Vague; misses the exact rules; Implies the kubelet evicts by QoS class | Limit set without request → request copies the limit; neither set → unbounded unless a LimitRange injects defaults; "Mi" vs "M" vs "m" spelled out; memory limit enforced reactively by the kernel OOM killer (exit code 137); The kubelet ranks by usage above requests, then priority, then amount over; QoS only predicts that order (memory only, not ephemeral storage) | https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/ ; https://kubernetes.io/docs/concepts/policy/limit-range/ ; https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/ ; https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/ |
| K21 rule 1. CPU-based HPA "usually requires" resource requests; K21 rule 5. A PDB "primarily constrains supported voluntary disruptions" | Too loose; Vague: does not say which | Utilization targets are a % of the request; if a container has no request, the HPA takes no action for that metric (Kubernetes 1.37); PDBs only limit evictions through the Eviction API (drain, node upgrades, scale-down); deleting Pods or Deployments bypasses them; rollouts are not limited by PDBs but count against them | https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/ ; https://kubernetes.io/docs/concepts/workloads/pods/disruptions/ |
| K22. Revision = "a recorded Deployment rollout state" | Loose: any change seemed to make one | A new revision only when the Pod template changes (scaling does not), stored as an old ReplicaSet; revisionHistoryLimit 10 | https://kubernetes.io/docs/concepts/workloads/controllers/deployment/ |
| K25 (part: "networking generally enables Pods to communicate across nodes, subject to configuration") | Vague | The network model: each Pod has its own cluster-wide IP; all Pods reach all Pods without NAT (unless segmented on purpose) | https://kubernetes.io/docs/concepts/services-networking/ |
| K26 (part: must-know table row `kubectl port-forward service/myapp 8080:80` "Forward local port 8080 to Service port 80") | Implies traffic goes through the Service and is load-balanced | kubectl picks ONE Pod behind the Service and forwards to its target port; the session ends when that Pod ends (trap in kubectl-debugging; tree note; glossary) | https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/ |
| S28.Q2. Can Kubernetes run without Docker? (and the runtime line of K12.Q1) | Version-less: implies Docker Engine is just one optional runtime | Since Kubernetes 1.24 dockershim is removed; nodes use a CRI runtime (containerd, CRI-O); Docker Engine works only through cri-dockerd; Docker-built images still run | https://kubernetes.io/blog/2022/02/17/dockershim-faq/ |
| S30.8. Namespace default is `default` | Loose: kubectl does not always use `default` | kubectl uses the current kubeconfig context's namespace; `default` only when the context sets none (in a Pod, the ServiceAccount's namespace) | https://kubernetes.io/docs/reference/kubectl/ |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| CRI, containerd, CRI-O, runc, dockershim removal (1.24), cri-dockerd | concept kubernetes-and-docker (points, trap, bullets); tree; glossary | The standard follow-up to "does Kubernetes need Docker" |
| What Kubernetes is not (not a PaaS, no image builds) and the K8s name | concept what-is-kubernetes (point, Interview Qs) | Common opening questions; docs Overview |
| Hub-and-spoke: components meet at the API server; only the API server should reach etcd | concept kubernetes-architecture | Clean way to answer "who talks to etcd" |
| kube-proxy is optional; cloud-controller-manager is optional | concept kubernetes-architecture (Interview Qs, tree) | Docs mark both optional |
| Manifest anatomy (apiVersion, kind, metadata, spec, status) | concept kubectl-and-manifests (points, Example) | Asked as "why YAML" and "spec vs status" |
| Three object-management styles; kubectl replace; never mix styles | concept kubectl-and-manifests (point, Interview Q); tree | Behind the apply vs create vs replace question |
| Server-side apply (stable since 1.22), --dry-run=client/server, kubectl diff, kubectl explain | concept kubectl-and-manifests | Safe-change questions |
| kubeconfig and contexts; kubectl version skew ±1 minor | concept kubectl-and-manifests (point, Defaults, bullet) | Interview staple (GeeksforGeeks Q6) |
| Initial namespaces, cluster-scoped objects | concept namespaces-labels-selectors (point), tree | Commonly asked |
| Equality vs set-based selectors; no OR operator; recommended app.kubernetes.io labels | concept namespaces-labels-selectors (point, bullets) | Selector questions |
| Deployment selector immutable in apps/v1 | concept namespaces-labels-selectors (point, Interview Q) | A common surprise in practice |
| Team isolation recipe (namespace + RBAC + ResourceQuota + default-deny NetworkPolicy) | concept namespaces-labels-selectors (Interview Q) | GeeksforGeeks scenario Q76 |
| imagePullPolicy defaults (Always for :latest or no tag, else IfNotPresent) | concept pods (point); tree image-pull-policy; glossary | common interview default (scope) |
| Pause container, static Pod | tree under pods; glossary pause-container | interviewers name them |
| Init containers, native sidecars (stable since 1.33), ambassador and adapter patterns, service mesh | concept multi-container-pods; comparison init-container-vs-sidecar; tree; glossary | multi-container patterns are a standard question |
| Failed and Unknown phases, container states, restartPolicy values, restart back-off (10 s doubling, 5 min cap) | concept pod-lifecycle; tree; glossary | the reference listed only three phases |
| Termination sequence: endpoints, preStop, SIGTERM, 30 s grace, SIGKILL; Spring Boot graceful shutdown default and preStop sleep | concept pod-lifecycle (Steps, Example, Defaults) | graceful shutdown is a frequent backend question |
| Deployment details: replicas default 1, selector immutable, pod-template-hash, scaling makes no revision, old ReplicaSets kept for rollback | concept deployments-and-replicasets; tree | explains the Deployment → ReplicaSet chain |
| StatefulSet details: ordinal names, headless Service, volumeClaimTemplates, PVCs retained, podManagementPolicy, update order; "does not replicate data" trap | concept statefulsets; tree; glossary | reference had only one line |
| DaemonSet details: no replicas, nodes join and leave, nodeSelector, automatic tolerations, update default, kube-proxy as a DaemonSet (kubeadm) | concept daemonsets; tree | reference had only one line |
| Job details: restartPolicy limits, completions and parallelism, backoffLimit 6, activeDeadlineSeconds, ttlSecondsAfterFinished; CronJob concurrencyPolicy, timeZone (stable 1.27), history limits 3 and 1, startingDeadlineSeconds, two-or-no runs per tick | concept jobs-and-cronjobs; tree; glossary | standard CKAD and interview material |
| Endpoints API deprecated since 1.33; EndpointSlices up to 100 endpoints each | services (point); tree endpointslice-object, endpointslice-size, endpoints-legacy; glossary | Current API; interviewers ask about EndpointSlices |
| ExternalName type; sessionAffinity ClientIP (10800 s default); targetPort defaults to port; NodePort range 30000-32767 | services (Defaults, bullet); tree; comparison | Common Service questions |
| Gateway API roles (GatewayClass → Gateway → HTTPRoute), GRPCRoute, TCPRoute/UDPRoute GA in v1.6, allowedRoutes same-namespace default, backendRefs weights | ingress-and-gateway-api; tree; comparison ingress-vs-gateway-api; glossary | Recommended successor to Ingress |
| IngressClass and default class; pathType Prefix/Exact | ingress-and-gateway-api (Defaults); tree | Asked with Ingress |
| Ingress NGINX retirement (blog 11-11-2025) | ingress-and-gateway-api (point, Interview Q); tree ingress-nginx-retired | Big recent change |
| kube-proxy modes: iptables default in 1.37, nftables stable since 1.33, IPVS deprecated since 1.35; some CNIs replace kube-proxy | cluster-networking-dns (point, Defaults, bullet); tree; glossary proxy-mode-term | Planned addition (PLAN.md) |
| DNS search list (short names per namespace), dnsPolicy ClusterFirst default, headless DNS returns Pod IPs, StatefulSet Pod names, CoreDNS Service named kube-dns | cluster-networking-dns (Example, Interview Qs, Defaults); tree | Planned addition (PLAN.md) |
| Service mesh (one tree node) | tree service-mesh | Scope note |
| NetworkPolicy semantics: per-direction isolation, additive allow-only, both ends must allow, AND vs OR selectors, default deny, DNS egress caution, policyTypes default, no L7/TLS/deny | network-policies; tree; glossary | Scope note; the reference had only a one-line definition |
| Volumes (emptyDir, medium Memory, hostPath risk, configMap/secret, projected, downwardAPI, CSI ephemeral, volumeMounts, subPath) | concept volumes; comparison emptydir-vs-persistent-volume; tree; glossary | Scope (master.json); common follow-up to "how do containers share files" |
| PV, PVC, StorageClass, static and dynamic provisioning, access modes incl. RWOP (stable since 1.29), reclaim policy defaults, volumeBindingMode, expansion, CSI | concept persistent-storage; comparison pv-vs-pvc-vs-storageclass; tree; glossary | Scope (master.json); standard stateful-app question |
| Secret types (Opaque, kubernetes.io/tls, dockerconfigjson), 1 MiB size limit, immutable ConfigMaps/Secrets, list/watch reveals all Secrets, Pod creation can read any Secret in the namespace | concept configmaps-and-secrets (points, bullets, Defaults); tree | Real defaults and security facts interviewers probe |
| External Secrets Operator, Sealed Secrets, Secrets Store CSI Driver; KMS v2 provider | tree nodes under configmaps-and-secrets; glossary | Answer to "how do you keep Secrets out of Git" |
| Spring Boot reading config: env var relaxed binding, `configtree:` for mounted files | configmaps-and-secrets (Example comment, Interview Q) | Running example is a Spring Boot service |
| Default ServiceAccount, projected short-lived tokens, legacy token Secrets not auto-created since 1.24, automountServiceAccountToken, workload identity (EKS Pod Identity, IRSA, GKE, AKS) | concept service-accounts; tree; glossary | Scope (master.json); cloud access without keys is a common question |
| Probe check mechanisms httpGet, tcpSocket, exec, grpc (stable since 1.27) | concept probes (How bullet); tree probe-check-mechanisms | Commonly asked "how does a probe check health" |
| Probe defaults (period 10s, timeout 1s, failureThreshold 3, successThreshold 1) | concept probes (Defaults) | Asked in CKAD-style questions |
| Spring Boot 4.1 Actuator liveness/readiness groups; liveness must not check external systems | concept probes (Example, Defaults, Interview Q 2); tree actuator-health-groups | Running example is Spring Boot; restart-storm trap |
| No readiness probe = ready at container start | concept probes (How bullet); comparison row | Explains why readiness matters in rollouts |
| JVM container awareness and -XX:MaxRAMPercentage (default 25%, Java 25) | concept resource-requests-limits (Example, Interview Q 3) | Spring Boot Pods are often OOMKilled from heap sizing |
| LimitRange, ResourceQuota, in-place Pod resize (stable since 1.35) | concept resource-requests-limits (How bullets); tree | Namespace guard rails and a recent stable feature |
| QoS class criteria, node-pressure eviction (default hard threshold memory.available<100Mi), API-initiated eviction, PriorityClass and preemption, OOMKilled vs Evicted | concept qos-and-eviction | Scope note: added beyond the reference |
| kube-scheduler filter → score → bind, nodeSelector, node affinity required/preferred, IgnoredDuringExecution, Pod affinity, nodeName, built-in default spreading, FailedScheduling | concept scheduling | Placement is asked in most Kubernetes interviews |
| Taints and tolerations: effects, tolerationSeconds, control-plane taint, built-in node taints, 300-second unreachable toleration, DaemonSet tolerations, dedicated pools with node affinity | concept taints-and-tolerations; comparison taints-vs-node-affinity | Common interview pair, missing from the reference |
| HPA formula, 15 s interval, 300 s scale-down window, 10% tolerance, behaviour field | `autoscaling` (points, Defaults, bullets) | Standard HPA follow-ups |
| VPA must not share HPA's CPU or memory metric; VPA modes (VPA 1.8) | `autoscaling` trap; tree | Common wrong answer |
| Karpenter, KEDA | tree, glossary | Node provisioning and event scaling are asked with HPA |
| Recreate, minReadySeconds, progressDeadlineSeconds, revisionHistoryLimit, change-cause (--record deprecated), rollout status/history/undo/restart | `rolling-updates-rollbacks` | Rollout mechanics interviewers probe |
| Blue-green and canary (selector switch, replica ratio, HTTPRoute weights), Argo Rollouts, Flagger, feature flags | concept `release-strategies`, comparison, tree | Very common release question; not in the reference |
| etcd quorum, stacked vs external etcd, managed control plane | `high-availability` (points, Q, tree) | Control-plane HA is part of "how is Kubernetes HA" |
| kubectl drain and cordon, PDB vs rollouts | `high-availability` (bullet, Q, tree) | How PDBs act in practice |
| GitOps: push vs pull, Argo CD, Flux, drift, rollback by git revert, unique image tags | concept `gitops` | CI/CD for Kubernetes is commonly asked |
| API request path: authenticate (401) → authorise (403) → admission → store | concept rbac (Steps) | Standard "how is a kubectl request checked" question; CKAD topic |
| Role vs ClusterRole, RoleBinding vs ClusterRoleBinding, ClusterRole reused in a RoleBinding | comparison role-vs-clusterrole; rbac (bullet, Interview Q 3) | The most asked RBAC pair |
| Additive-only rules, immutable roleRef, subjects, least privilege, default roles (cluster-admin, admin, edit, view), `kubectl auth can-i --as` | rbac (points, Interview Q 1); tree | Needed to answer RBAC questions correctly |
| securityContext picker (runAsNonRoot, allowPrivilegeEscalation, capabilities drop ALL, seccomp RuntimeDefault, readOnlyRootFilesystem) | concept pod-security (table) | CKAD "SecurityContexts, Capabilities" topic |
| Pod Security Standards levels; Pod Security Admission modes and labels; enforce applies to Pods only; safe rollout with warn/audit and `--dry-run=server` | pod-security (points, Example, Interview Qs); tree | Replacement for PodSecurityPolicy; reference has no Pod security at all |
| PodSecurityPolicy removed in 1.25 | pod-security (trap, point); glossary | Old answers still name PSP |
| Policy engines: ValidatingAdmissionPolicy (stable 1.30), Kyverno, OPA Gatekeeper; imagePullSecrets link | pod-security (bullets); tree; glossary | Custom rules beyond the three levels |
| Helm chart, values, release, revision, rollback; Helm 4 GA, Helm 3 end of security fixes; Kustomize base and overlays, `kubectl apply -k` | concept helm-and-kustomize; comparison helm-vs-kustomize | CKA/CKAD topics; reference has no packaging tools |
| CRDs, custom resources, operators, admission webhooks; CloudNativePG and Prometheus Operator examples; ConfigMap vs custom resource | concept crds-and-operators; comparison crd-vs-operator; tree | CKA/CKAD "CRDs, operators" topic |
| Logs vanish with the Pod, node logging agent as DaemonSet, kubelet log rotation defaults, event TTL, metrics-server vs Prometheus, kube-state-metrics, Grafana, OpenTelemetry, Spring Boot `/actuator/prometheus`, Metrics API stable in 1.37 | concept observability-in-k8s; tree; glossary | Common "how do you monitor and log on Kubernetes" questions |
| "What happens on kubectl apply" flow (8 steps) | kubernetes-playbook (Example, sayIt, Interview Q) | Owner asked for it; one of the most asked questions |
| "Need → object" picker | kubernetes-playbook (How it works, tree need-* nodes) | Owner's memory aid; links every main object |
| "Don't say / Say" top traps | kubernetes-playbook (How it works) | Owner's memory aid; links each owner |
| Answer formula (what, why, how, default, trap) | kubernetes-playbook (points, trap) | Consistent with other techs' playbooks |
| Pending, ContainerCreating, Evicted rows | pod-errors (table); glossary | Commonly seen statuses missing from the reference table |
| Exit codes 1, 137 (128 + 9), 143 (128 + 15) | pod-errors (points, tree) | Exit code is the first clue in CrashLoopBackOff questions |
| Stuck Terminating: finalizers and admission webhooks | pod-errors (table); glossary finalizer | Common interview follow-up |
| ImagePullBackOff retry cap 300 s | pod-errors (point, kind default) | Real default, documented |
| kubectl debug and ephemeral containers (stable since 1.25), debug node/, --copy-to | kubectl-debugging (Steps, point, Interview Q); glossary | Distroless images have no shell; CKAD/CKA topic |
| Service check order (ready Pods, EndpointSlices, selector, targetPort, DNS, NetworkPolicy) | kubectl-debugging (Example, Interview Q) | Official Debug Services flow |
| Node conditions (Ready, MemoryPressure, DiskPressure, PIDPressure, NetworkUnavailable) | kubectl-debugging (point, Interview Q, tree) | Node troubleshooting is 30% of CKA |
| kubectl grammar, -A, -l, -w, explain, diff, top, set-context --current, use-context, auth can-i, rollout restart | kubectl-commands (table, points, Example, Interview Q) | Daily commands interviewers expect |

## Dropped
| Reference item | Reason (rare / advanced / duplicate / unverifiable) |
|---|---|
| (no whole item) | |

### Details placed elsewhere or cut, inside items listed above
| Reference item part | What happened |
|---|---|
| K13 (ASCII architecture drawing) | cut: duplicate: replaced by the two mini diagrams in control-plane-vs-worker-node (not copied) |
| K14. Pod, the smallest deployable unit (definition, shared network, shared storage, ephemeral Pod, Pod IP) | also: concept pods (hook, points, comparison container-vs-pod); tree pod-shared-network, pod-shared-volumes |
| K14 part: multi-container Pod | also: concept multi-container-pods (trap: when to share a Pod) |
| K14 part: example Pod YAML | also: concept pods (Example, rewritten for payment-service) |
| K14 part: kubectl get/describe/logs/exec/delete pod | also: concept kubectl-commands (troubleshooting unit) |
| K14 rule: deleting a standalone Pod does not recreate it; a Deployment-managed Pod is recreated | also: concept pods (trap, Interview Q) |
| K14 rule: Pods in one Pod share networking; separate Pods have separate IPs | also: concept pods (points); comparison container-vs-pod |
| K14 (part: Pod commands: get pods, describe pod, logs, exec -it -- sh, delete pod) | also: concept kubectl-commands (table rows Inspect, Change, Debug) |
| K15. Deployment and ReplicaSet (definitions, replicas, example) | also: concept deployments-and-replicasets (hook, points, Mermaid, Example); comparison deployment-vs-replicaset |
| K15 rule: controller keeps the desired replica count | also: concept deployments-and-replicasets (point "Self-healing") |
| K15 rule: scaling changes the desired count | also: concept deployments-and-replicasets (point "Scaling", Interview Q on kubectl scale) |
| K15 rule: three replicas are not three machines | also: concept deployments-and-replicasets (bullet, linking scheduling) |
| K15 rule: Running does not guarantee ready | also: concept pod-lifecycle (trap, Interview Q, linking probes) |
| K15 commands: set image, rollout status/history/undo | also: concept rolling-updates-rollbacks (scaling-releases unit) |
| K15 (rule: three replicas are not necessarily three machines) | also: concept scheduling (trap) |
| K15 (part: Deployment commands: get deployments, scale, set image, rollout status, rollout history, rollout undo) | also: concept kubectl-commands (table rows Scale, Release; Example) |
| K16. Kubernetes Services (stable access to Pods; types ClusterIP, NodePort, LoadBalancer, headless; example Service; selector, port, targetPort, type) | also: concept services (hook, points, Mermaid, Example YAML, Defaults); tree clusterip-service, nodeport-service, loadbalancer-service, headless-service; comparison clusterip-vs-nodeport-vs-loadbalancer |
| K16 (part: port vs containerPort trap, 80 → 8080) | also: concept services (trap; Interview Q "port, targetPort, nodePort") |
| K16 (part: four image links to third-party diagrams) | cut: Not content; replaced by our own Mermaid and comparison |
| K17 (parts: Ingress definition, Ingress controller, TLS termination, path-based and host-based routing) | also: concept ingress-and-gateway-api (points, bullet 1, Why); tree ingress-resource, ingress-controller-node, tls-termination-node; glossary path-routing-term, host-routing-term, tls-termination-term |
| K17 (part: example flow client → controller → Service → Pods) | also: concept ingress-and-gateway-api (Mermaid, shown with Gateway API roles) |
| K17 (part: rule "Ingress resource alone does not route; a controller is needed") | also: concept ingress-and-gateway-api (trap, point "Controller needed") |
| K17 (part: rule "LoadBalancer Service and Ingress differ") | also: comparison loadbalancer-vs-ingress; concept ingress-and-gateway-api (Interview Q 1) |
| K18. ConfigMap and Secret (purpose table, ConfigMap example, env vars or mounted files, "Secrets are not secure just by the name", base64 is not encryption, RBAC plus encryption at rest, do not commit credentials to Git, env vars not refreshed) | also: concept configmaps-and-secrets (hook, points, trap, bullets, Example, Defaults, Interview Qs "changed a ConfigMap" and "keep Secrets out of Git"); comparison configmap-vs-secret |
| K19. Liveness, Readiness and Startup Probes (definitions of the three probes; traps: readiness does not restart, liveness restarts after the threshold, startup protects slow starts, poor probes cause restarts or drop healthy Pods; "the app must expose these endpoints") | also: concept probes (hook, points, trap, Interview Qs 2-3, Example); comparison liveness-vs-readiness-vs-startup |
| K21 (part: Pod anti-affinity / topology spread spread Pods across nodes or failure domains) | also: concept scheduling (points, Example, Interview Q 3); tree pod-anti-affinity, topology-spread |
| K21. Scaling and High Availability: horizontal scaling (with S29.6 Horizontal vs Vertical scaling) | also: concept `autoscaling` (Interview Q "Horizontal or vertical"); glossary `horizontal-scaling` |
| K21. vertical scaling | also: glossary `vertical-scaling`; concept `autoscaling` (Interview Q) |
| K21. HPA (adjusts replica counts from metrics) | also: concept `autoscaling` (hook, points: formula, metrics; Example YAML); comparison `hpa-vs-vpa-vs-cluster-autoscaler`; tree `horizontal-pod-autoscaler` |
| K21. VPA (recommends or adjusts requests by mode) | also: concept `autoscaling` (point, trap); comparison; tree `vertical-pod-autoscaler` (modes) |
| K21. Cluster Autoscaler (adds or removes nodes) | also: comparison `hpa-vs-vpa-vs-cluster-autoscaler`; tree `cluster-autoscaler`; concept `autoscaling` (point "Node autoscalers", Interview Q) |
| K21 rule 2. HPA scales replicas, not machines | also: concept `autoscaling` (Interview Q "4 stay Pending") |
| K21 rule 3. Cluster Autoscaler handles nodes, not replicas | also: comparison `hpa-vs-vpa-vs-cluster-autoscaler` (rows "Changes", "Reacts to") |
| K21. High availability (keep working despite failures) | also: concept `high-availability` (Why, table) |
| K21. Pod anti-affinity / topology spread | also: concept `high-availability` (table row, links to `scheduling`) |
| K21. Disruption budget (PDB) | also: concept `high-availability` (points, Example YAML); tree `pod-disruption-budget`; glossary |
| K21 rule 4. Three replicas on one node are not node-failure resilient | also: concept `high-availability` (Interview Q "Are 3 replicas enough") |
| K22 (part: readiness probes keep traffic away from Pods that are not ready) | also: concept probes (point "Readiness fails"; comparison row "If not set") |
| K22. Rolling update (gradually replaces old Pods) | also: concept `rolling-updates-rollbacks` (hook, Steps); comparison `rolling-vs-blue-green-vs-canary` |
| K22. Rollback (returns to an earlier revision) | also: concept `rolling-updates-rollbacks` (point, Example, sayIt) |
| K22. maxSurge | also: concept `rolling-updates-rollbacks` (Steps, Defaults, Interview Q); tree `max-surge-field` |
| K22. maxUnavailable | also: same as maxSurge; tree `max-unavailable-field` |
| K22 rule 1. Default strategy RollingUpdate (with S30.6) | also: concept `rolling-updates-rollbacks` (Defaults); tree `rolling-update-strategy` |
| K22 rule 2. Defaults 25% / 25% (with S30.7) | also: concept `rolling-updates-rollbacks` (Defaults, Steps worked example) |
| K22 rule 3. A rollout can fail if new Pods never become ready | also: concept `rolling-updates-rollbacks` (point "Stuck rollout", Interview Q) |
| K22 rule 4. Rollback does not reverse database migrations or side effects | also: concept `rolling-updates-rollbacks` (trap) |
| K22 rule 5. Readiness probes keep traffic off unready Pods | also: concept `rolling-updates-rollbacks` (point "When a Pod counts", link to `probes`) |
| K23 part: example busybox report Job | cut: duplicate: replaced by the settlement-report CronJob example, which shows the same Job template |
| K25 (part: EndpointSlice tracks a Service's endpoints) | also: concept services (point "selector", Mermaid, Interview Q 1); tree endpointslice-object; glossary endpointslice-term |
| K25 (part: rule 3, Service with no ready endpoints sends no traffic) | also: concept services (bullet 1) |
| K25 (part: Service DNS, stable name instead of changing Pod IPs) | also: concept cluster-networking-dns (points "Service name", trap) |
| K25 (part: cluster DNS usually CoreDNS) | also: concept cluster-networking-dns (sayIt, Mermaid); tree coredns-node |
| K25 (part: CNI) | also: concept cluster-networking-dns (point "CNI plugin"); tree cni-plugin; glossary cni-term |
| K25 (part: DNS name example myapp-service.my-namespace.svc.cluster.local, name depends on DNS config) | also: concept cluster-networking-dns (Example, point) |
| K25 (part: rules 1-2, Pod IPs are not stable endpoints; Services give stable access) | also: concept cluster-networking-dns (trap) |
| K25 (parts: NetworkPolicy definition; enforcement depends on the networking implementation) | also: concept network-policies (hook, points, Interview Q 3) |
| K26 (parts: kubectl talks to the API server; apply -f and delete -f rows) | also: concept kubectl-and-manifests (hook, How bullets); comparison kubectl-apply-vs-create |
| K26. Configuration and Deployment Commands (part: `kubectl logs POD`, `kubectl logs POD -f`, `kubectl logs --previous`, `kubectl get events --sort-by=.metadata.creationTimestamp`, "describe shows events") | also: concept observability-in-k8s (points on logs and events, Interview Q 1 on `--previous`, Defaults); link to kubectl-debugging |
| K26 (part: debugging commands block: get pods, describe, logs, logs --previous, get events --sort-by, get endpointslices, rollout status) | also: concept kubectl-debugging (Steps, Example, bullet linking rolling-updates-rollbacks) |
| K26 (part: note "--previous shows the previous terminated container's logs") | also: concept kubectl-debugging (point, Step "logs"); glossary kubectl-logs-previous |
| K26 (part: note "describe helps with scheduling, image pull, probe failures and events") | also: concept kubectl-debugging (point, Step "describe") |
| K26 (part: note "port-forward is for local debugging, not a production ingress") | also: concept kubectl-debugging (trap) |
| K26 (part: intro "kubectl talks to the API server") | also: concept kubectl-commands (Why, sayIt) |
| K26 (part: must-know table: get pods, get all, get deployments, get services, get nodes, describe pod, logs, logs -f, exec -it -- sh, apply -f, delete -f, get pods -n, get pods -o wide) | also: concept kubectl-commands (table, points, Example, trap for get all) |
| K26 (part: "get all is not literally every resource") | also: concept kubectl-commands (trap, Interview Q); glossary kubectl-get-all |
| S28 (rows "Networking" and "Configuration") | cut: duplicate: Pod networking is owned by cluster-networking-dns, manifests by kubectl-and-manifests; cut to keep the comparison at 6 rows |
| S30.8 (part: the -n flag) | also: concept kubectl-and-manifests (How bullet) |
