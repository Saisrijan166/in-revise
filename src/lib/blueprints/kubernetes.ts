import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const kubernetes: Blueprint = {
  tagline: "How a desired state becomes running pods — control plane, nodes, networking, scaling.",
  legend: legendOf([
    "Control plane",
    "Workloads",
    "Nodes & pods",
    "Networking",
    "Config & scaling",
  ]),
  alt:
    "A system map of Kubernetes. Control plane: kubectl apply sends desired state to the API Server, which " +
    "stores it in etcd; the Scheduler picks a node and the Controller Manager reconciles. Workloads: a " +
    "Deployment owns a ReplicaSet which keeps the desired number of Pods; StatefulSet, DaemonSet and Job " +
    "cover other shapes. Nodes and pods: on each node the kubelet runs Pods (one or more containers) via a " +
    "container runtime, and kube-proxy wires networking. Networking: a Service (ClusterIP, NodePort or " +
    "LoadBalancer) gives stable access to pods, Ingress routes external HTTP, and cluster DNS resolves " +
    "names. Config and scaling: ConfigMaps and Secrets inject config, the Horizontal Pod Autoscaler scales " +
    "the ReplicaSet, and rolling updates or rollbacks change the Deployment safely.",
  baseline: "Kubernetes 1.34",
  chart: `flowchart TD
  subgraph CP["1 . Control plane"]
    direction TB
    kc(["kubectl apply"]):::f
    kc --> api["API Server"]:::f
    api --> etcd[("etcd: desired state")]:::f
    api --> sched["Scheduler: pick node"]:::f
    api --> cm["Controller Manager"]:::f
  end

  subgraph WL["2 . Workloads"]
    direction TB
    dep["Deployment"]:::c
    dep --> rs["ReplicaSet"]:::c
    rs --> pods["Pods (desired count)"]:::c
    sts["StatefulSet / DaemonSet / Job"]:::c
  end
  cm -->|reconcile| dep
  cm --> sts

  subgraph NODE["3 . Node"]
    direction TB
    kubelet["kubelet"]:::d
    kubelet --> pod(["Pod: 1+ containers"]):::d
    pod --> ctr["Container runtime"]:::d
    kproxy["kube-proxy"]:::d
  end
  sched -->|bind pod| kubelet
  pods -.-> pod

  subgraph NET["4 . Networking"]
    direction LR
    svc["Service: ClusterIP/NodePort/LB"]:::x
    ing["Ingress"]:::x
    dns["Cluster DNS"]:::x
  end
  pod --> svc
  ing --> svc
  svc --> dns
  kproxy -.-> svc

  subgraph OPS["5 . Config and scaling"]
    direction LR
    cmn["ConfigMap / Secret"]:::o
    hpa["HPA: autoscale"]:::o
    roll["Rolling update / rollback"]:::o
  end
  cmn -.-> pod
  hpa -->|scale| rs
  roll --> dep
${CLASSDEFS}`,
};
