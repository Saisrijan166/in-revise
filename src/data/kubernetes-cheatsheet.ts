// AUTO-GENERATED from reference/kubernetes.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs kubernetes
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const kubernetesCheatsheet: CheatDoc = {
 "title": "Kubernetes",
 "tagline": "The whole topic on one page — workloads, networking and the rules to remember.",
 "chapters": [
  {
   "id": "fundamentals",
   "title": "Fundamentals"
  },
  {
   "id": "workloads",
   "title": "Workloads"
  },
  {
   "id": "networking",
   "title": "Networking"
  },
  {
   "id": "config-and-storage",
   "title": "Config and Storage"
  },
  {
   "id": "scaling-and-rollouts",
   "title": "Scaling and Rollouts"
  },
  {
   "id": "health-and-scheduling",
   "title": "Health and Scheduling"
  },
  {
   "id": "operations",
   "title": "Operations"
  },
  {
   "id": "common-why-x-vs-y-comparisons",
   "title": "Common \"Why X vs Y?\" Comparisons"
  }
 ],
 "sections": [
  {
   "id": "s-what-kubernetes-solves",
   "num": null,
   "title": "What Kubernetes Solves",
   "stars": 2,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Kubernetes (K8s) is a container orchestration platform that manages containerized applications across a cluster of machines."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Docker can build and run containers on a host. Kubernetes coordinates many containers across many machines: it handles scaling, service discovery, rollout, recovery and scheduling."
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Docker = containerization technology; Kubernetes = orchestration platform."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Kubernetes does not require Docker Engine. It uses a compatible container runtime such as containerd or CRI-O."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Docker runs containers on a box; Kubernetes runs your app across a cluster."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-desired-state-and-self-healing",
   "num": null,
   "title": "Desired State and Self-Healing",
   "stars": 1,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "You tell Kubernetes the outcome you want (desired state) using declarative YAML, not step-by-step commands."
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Reconciliation: Kubernetes repeatedly compares actual state with desired state and acts to correct any difference."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Self-healing: it can restart failed containers or replace failed Pods to match the desired state."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Declarative configuration describes the outcome; you do not script every operational step."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: You declare what you want; controllers keep making it true."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-cluster-architecture",
   "num": null,
   "title": "Cluster Architecture",
   "stars": 2,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A cluster = control plane + worker nodes. The control plane decides; the nodes run the workloads."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Control-plane components:"
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Component"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Role"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "API Server ("
          },
          {
           "type": "inlineCode",
           "value": "kube-apiserver"
          },
          {
           "type": "text",
           "value": ")"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Main entry point for all Kubernetes API requests."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "etcd"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Distributed key-value store holding cluster state and config."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Scheduler ("
          },
          {
           "type": "inlineCode",
           "value": "kube-scheduler"
          },
          {
           "type": "text",
           "value": ")"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Chooses a suitable node for a new Pod (does not start it)."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Controller Manager"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Runs controllers that reconcile actual state toward desired state."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Cloud Controller Manager"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Integrates with cloud-provider features."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Worker-node components:"
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Kubelet: ensures the Pods assigned to its node are running as specified."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Container runtime: runs containers (containerd, CRI-O)."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Kube-proxy: implements Service networking on the node (some CNIs replace it)."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: API Server = front door, etcd = memory, Scheduler = placer, Kubelet = node agent."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-pod-the-smallest-deployable-unit",
   "num": null,
   "title": "Pod — The Smallest Deployable Unit",
   "stars": 2,
   "chapter": "workloads",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A Pod is the smallest deployable unit; it holds one or more containers. Kubernetes schedules Pods, not individual containers."
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Containers in one Pod share an IP and port space and talk over "
          },
          {
           "type": "inlineCode",
           "value": "localhost"
          },
          {
           "type": "text",
           "value": "; they can share mounted volumes."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "A Pod is ephemeral: its replacement may get a different IP."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Multi-container Pods are for containers that must work closely together."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "apiVersion: v1\nkind: Pod\nmetadata:\n  name: myapp\nspec:\n  containers:\n    - name: app\n      image: nginx:1.28\n      ports:\n        - containerPort: 80",
     "lang": "yaml"
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "inlineCode",
           "value": "containerPort"
          },
          {
           "type": "text",
           "value": " only documents the port; it does not expose the Pod publicly."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Deleting a standalone Pod does not recreate it; a Pod managed by a Deployment is recreated."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: You deploy Pods, not containers; Pods come and go, so never rely on a Pod's IP."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-deployment-and-replicaset",
   "num": null,
   "title": "Deployment and ReplicaSet",
   "stars": 2,
   "chapter": "workloads",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A Deployment manages replicated stateless Pods and supports declarative updates and rollbacks. It creates ReplicaSets, which keep the requested number of matching Pods running."
      }
     ]
    },
    {
     "type": "code",
     "value": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: myapp\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: myapp\n  template:\n    metadata:\n      labels:\n        app: myapp\n    spec:\n      containers:\n        - name: app\n          image: nginx:1.28",
     "lang": "yaml"
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "If a Pod fails, the controller restores the desired replica count."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "An update creates a new ReplicaSet and gradually replaces old Pods."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Three replicas need not mean three machines; a "
          },
          {
           "type": "inlineCode",
           "value": "Running"
          },
          {
           "type": "text",
           "value": " Pod is not necessarily ready to serve."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Deployment → ReplicaSet → Pods; you set the count, the controller keeps it."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-statefulset-daemonset-job",
   "num": null,
   "title": "StatefulSet, DaemonSet, Job",
   "stars": 1,
   "chapter": "workloads",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Workload"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Use it for"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Deployment"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Stateless apps with interchangeable replicas (REST APIs)."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "StatefulSet"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Stable Pod identities and ordered lifecycle, often with persistent storage."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "DaemonSet"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "One Pod per eligible node (logging, monitoring, networking agents)."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Job"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Finite work that runs to completion, then stops."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "CronJob"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Creates Jobs on a recurring schedule."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Jobs suit database migrations, report generation and scheduled cleanup. Because Jobs can retry, design tasks carefully if they modify data."
      }
     ]
    },
    {
     "type": "code",
     "value": "apiVersion: batch/v1\nkind: Job\nmetadata:\n  name: report-job\nspec:\n  template:\n    spec:\n      restartPolicy: Never\n      containers:\n        - name: report\n          image: busybox:1.37\n          command: [\"sh\", \"-c\", \"echo Report generated\"]",
     "lang": "yaml"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Deployment for always-on, Job for run-once, DaemonSet for one-per-node, StatefulSet for identity."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-services",
   "num": null,
   "title": "Services",
   "stars": 3,
   "chapter": "networking",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A Service gives a stable way to reach a group of Pods, even as individual Pod IPs change. It selects Pods by label."
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Type"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Exposure"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "ClusterIP (default)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Internal cluster IP; reachable only inside the cluster."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "NodePort"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "A port on each node's IP, subject to firewall/network rules."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "LoadBalancer"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Requests an external load balancer from supported infrastructure."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Headless ("
          },
          {
           "type": "inlineCode",
           "value": "clusterIP: None"
          },
          {
           "type": "text",
           "value": ")"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "DNS returns backing endpoint addresses instead of one Service IP."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "apiVersion: v1\nkind: Service\nmetadata:\n  name: myapp-service\nspec:\n  selector:\n    app: myapp\n  ports:\n    - port: 80\n      targetPort: 8080\n  type: ClusterIP",
     "lang": "yaml"
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "inlineCode",
           "value": "port"
          },
          {
           "type": "text",
           "value": " is what the Service exposes; "
          },
          {
           "type": "inlineCode",
           "value": "targetPort"
          },
          {
           "type": "text",
           "value": " is the Pod's port. They need not match."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Trap: if the app listens on 8080, the Service can expose 80 and forward to 8080."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Service = stable front for shifting Pods; Service "
        },
        {
         "type": "inlineCode",
         "value": "port"
        },
        {
         "type": "text",
         "value": " ≠ container port."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-ingress-and-gateway-api",
   "num": null,
   "title": "Ingress and Gateway API",
   "stars": 1,
   "chapter": "networking",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Ingress is an API resource defining HTTP/HTTPS routing rules to Services. An Ingress Controller is the running implementation that actually routes the traffic."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Flow: Client → Ingress Controller → Service → Pods."
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Path-based routing sends "
          },
          {
           "type": "inlineCode",
           "value": "/api"
          },
          {
           "type": "text",
           "value": " and "
          },
          {
           "type": "inlineCode",
           "value": "/admin"
          },
          {
           "type": "text",
           "value": " to different Services; host-based routing sends "
          },
          {
           "type": "inlineCode",
           "value": "api.example.com"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "shop.example.com"
          },
          {
           "type": "text",
           "value": " to different Services."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "TLS termination (decrypting HTTPS) happens at the gateway/load balancer."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "An Ingress resource alone does nothing until a controller is installed and configured."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Gateway API (Gateway, HTTPRoute) is a newer, more expressive alternative for advanced traffic management."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Ingress is just rules; you also need an Ingress controller to enforce them."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-networking-and-dns",
   "num": null,
   "title": "Networking and DNS",
   "stars": 1,
   "chapter": "networking",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Pods can communicate across nodes, subject to network config and policy."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Services get a stable DNS name so apps need not track changing Pod IPs. Cluster DNS is usually CoreDNS."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "A Service name looks like "
          },
          {
           "type": "inlineCode",
           "value": "myapp-service.my-namespace.svc.cluster.local"
          },
          {
           "type": "text",
           "value": "."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "CNI (Container Network Interface) is the plugin standard for Pod networking."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "NetworkPolicy restricts traffic between Pods, but only where the networking implementation supports it."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "EndpointSlice tracks the network endpoints behind a Service."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Reach apps by Service DNS name, never by Pod IP."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-configmap-and-secret",
   "num": null,
   "title": "ConfigMap and Secret",
   "stars": 2,
   "chapter": "config-and-storage",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Both inject configuration separately from the image. A Pod can consume either as environment variables or mounted files."
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Aspect"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "ConfigMap"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Secret"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Purpose"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Non-sensitive config (feature flags, service URL)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Sensitive config (password, API token)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Auto-encrypted?"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "No"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Not necessarily"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: app-config\ndata:\n  SPRING_PROFILES_ACTIVE: \"prod\"\n  LOG_LEVEL: \"INFO\"",
     "lang": "yaml"
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Secrets are not automatically secure: base64 encoding is not encryption."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Protect them with RBAC and encryption at rest; never commit real credentials to Git."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Env vars injected into a running container do not refresh when the source changes — a restart or rollout is needed. Mounted files can update eventually, but the app may need to reload them."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Secret ≠ secure by default; base64 is encoding, not encryption."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-scaling-and-high-availability",
   "num": null,
   "title": "Scaling and High Availability",
   "stars": 1,
   "chapter": "scaling-and-rollouts",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Horizontal scaling = more/fewer replicas; vertical scaling = more/fewer resources per replica."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Horizontal Pod Autoscaler (HPA) adjusts replica count from metrics (commonly CPU, which needs resource requests set)."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Vertical Pod Autoscaler (VPA) recommends or adjusts Pod resource requests."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Cluster Autoscaler adds/removes nodes; it does not change replica counts."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Spread Pods with anti-affinity / topology spread; three replicas on one node do not survive a node failure."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "A PodDisruptionBudget (PDB) limits voluntary disruptions but does not prevent all failures."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: HPA scales Pods, Cluster Autoscaler scales nodes; spread replicas for real HA."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-rolling-updates-and-rollbacks",
   "num": null,
   "title": "Rolling Updates and Rollbacks",
   "stars": 2,
   "chapter": "scaling-and-rollouts",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A rolling update gradually replaces old Pods with new ones. A rollback returns the Deployment to an earlier revision."
      }
     ]
    },
    {
     "type": "code",
     "value": "kubectl set image deployment/myapp app=nginx:1.29\nkubectl rollout status deployment/myapp\nkubectl rollout history deployment/myapp\nkubectl rollout undo deployment/myapp",
     "lang": "bash"
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Default strategy is "
          },
          {
           "type": "inlineCode",
           "value": "RollingUpdate"
          },
          {
           "type": "text",
           "value": "; defaults are "
          },
          {
           "type": "inlineCode",
           "value": "maxSurge: 25%"
          },
          {
           "type": "text",
           "value": " and "
          },
          {
           "type": "inlineCode",
           "value": "maxUnavailable: 25%"
          },
          {
           "type": "text",
           "value": " unless overridden."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "inlineCode",
           "value": "maxSurge"
          },
          {
           "type": "text",
           "value": " = extra Pods allowed during the update; "
          },
          {
           "type": "inlineCode",
           "value": "maxUnavailable"
          },
          {
           "type": "text",
           "value": " = Pods allowed to be down."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "A rollout fails if new Pods never become ready; readiness probes stop traffic reaching unready Pods."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Rollback restores config only — it does not reverse database migrations or other external side effects."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Rolling update swaps Pods gradually; rollback undoes config, not data changes."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-probes",
   "num": null,
   "title": "Probes",
   "stars": 2,
   "chapter": "health-and-scheduling",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Probes tell Kubernetes an application's state."
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Probe"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Answers"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "On failure"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Liveness"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Is the container still healthy?"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Kubelet restarts the container."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Readiness"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Can it accept traffic now?"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Pod removed from ready Service endpoints."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Startup"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Has a slow app finished starting?"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Delays liveness/readiness until startup succeeds."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "livenessProbe:\n  httpGet:\n    path: /actuator/health/liveness\n    port: 8080\n  initialDelaySeconds: 10\n  periodSeconds: 10\nreadinessProbe:\n  httpGet:\n    path: /actuator/health/readiness\n    port: 8080\n  periodSeconds: 5",
     "lang": "yaml"
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Readiness failure does not restart the container; only liveness failure does (after the threshold)."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "The app must expose these endpoints. Poorly designed probes cause needless restarts or drop healthy Pods from traffic."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Liveness restarts, readiness gates traffic, startup shields slow starters."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-resource-requests-and-limits",
   "num": null,
   "title": "Resource Requests and Limits",
   "stars": 2,
   "chapter": "health-and-scheduling",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Request: amount used for scheduling decisions (where the Pod can fit)."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Limit: maximum usage — CPU is throttled, memory overuse causes "
          },
          {
           "type": "inlineCode",
           "value": "OOMKilled"
          },
          {
           "type": "text",
           "value": "."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "resources:\n  requests:\n    cpu: \"250m\"\n    memory: \"256Mi\"\n  limits:\n    cpu: \"500m\"\n    memory: \"512Mi\"",
     "lang": "yaml"
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "inlineCode",
           "value": "250m"
          },
          {
           "type": "text",
           "value": " CPU = 0.25 core; "
          },
          {
           "type": "inlineCode",
           "value": "256Mi"
          },
          {
           "type": "text",
           "value": " = 256 mebibytes (binary unit)."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "QoS class is derived from requests/limits and used under resource pressure."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "If requests are omitted, behavior depends on cluster defaults and admission policies — do not assume a standard value."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Requests get you scheduled; limits cap you (CPU throttles, memory kills)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-namespaces-labels-and-rbac",
   "num": null,
   "title": "Namespaces, Labels and RBAC",
   "stars": 1,
   "chapter": "health-and-scheduling",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Namespace: a logical grouping of resources ("
          },
          {
           "type": "inlineCode",
           "value": "default"
          },
          {
           "type": "text",
           "value": " when none is given). Logical separation only, not security isolation."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Label: a key-value pair on a resource; a Selector picks resources by their labels."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "A Service selects its Pods by labels; a Deployment's selector must match its Pod template's labels."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Annotation: metadata for tools; not used for label selection."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "RBAC (Role-Based Access Control) governs who can do what on the API; it does not enforce network isolation."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "ServiceAccount: the identity a workload uses to call the Kubernetes API."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "NetworkPolicy can restrict Pod traffic where the CNI supports it."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Labels wire Services to Pods; namespaces separate, RBAC authorizes, NetworkPolicy isolates."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-essential-kubectl",
   "num": null,
   "title": "Essential kubectl",
   "stars": 1,
   "chapter": "operations",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "kubectl"
      },
      {
       "type": "text",
       "value": " is the CLI that talks to the API Server."
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Command"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Purpose"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "kubectl get pods"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "get deployments"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "get services"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "get nodes"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "List resources."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "kubectl get pods -o wide"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Show node placement and extra details."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "kubectl describe pod POD"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Pod details and events."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "kubectl logs POD"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "logs POD -f"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Read / follow logs."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "kubectl exec -it POD -- sh"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Open a shell in a container."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "kubectl apply -f app.yaml"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Create or update resources declaratively."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "kubectl delete -f app.yaml"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Delete resources from a file."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "kubectl scale deployment myapp --replicas=5"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Change replica count."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "kubectl port-forward service/myapp 8080:80"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Forward a local port (debugging only)."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: "
        },
        {
         "type": "inlineCode",
         "value": "apply"
        },
        {
         "type": "text",
         "value": " sets desired state; it does not guarantee the app is healthy."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-pod-states-and-debugging",
   "num": null,
   "title": "Pod States and Debugging",
   "stars": 2,
   "chapter": "operations",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "State / error"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Meaning"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "Pending"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Not yet scheduled; check events and resource availability."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "Running"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Containers created — not a guarantee of readiness."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "Succeeded"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "All containers completed successfully."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "CrashLoopBackOff"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Container keeps failing; Kubernetes backs off before restarting."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "ImagePullBackOff"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "ErrImagePull"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Cannot pull the image."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "OOMKilled"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Killed for exceeding its memory limit."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "CreateContainerConfigError"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Bad config; check Secrets and ConfigMaps."
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "Terminating"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Being deleted; shutdown may still be in progress."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Debug "
      },
      {
       "type": "inlineCode",
       "value": "CrashLoopBackOff"
      },
      {
       "type": "text",
       "value": ":"
      }
     ]
    },
    {
     "type": "code",
     "value": "kubectl logs POD --previous\nkubectl describe pod POD\nkubectl get events --sort-by=.metadata.creationTimestamp",
     "lang": "bash"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Then check the app command, config, env vars, resource limits, exit codes, probes and dependencies."
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: "
        },
        {
         "type": "inlineCode",
         "value": "CrashLoopBackOff"
        },
        {
         "type": "text",
         "value": " is a symptom, not a cause; "
        },
        {
         "type": "inlineCode",
         "value": "--previous"
        },
        {
         "type": "text",
         "value": " logs + "
        },
        {
         "type": "inlineCode",
         "value": "describe"
        },
        {
         "type": "text",
         "value": " find the real reason."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-defaults-worth-knowing",
   "num": null,
   "title": "Defaults Worth Knowing",
   "stars": 1,
   "chapter": "operations",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Concept"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Default"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Service type"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "ClusterIP"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Deployment strategy"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "RollingUpdate"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Rolling-update params"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "maxSurge: 25%"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "maxUnavailable: 25%"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Namespace"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "default"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Pod restart policy"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "Always"
          },
          {
           "type": "text",
           "value": " (including Deployment-managed Pods)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Pod IP"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Not stable across Pod replacement"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "ConfigMap/Secret env vars"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Not auto-refreshed in running containers"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Defaults can be changed by manifests, admission policies or cluster config."
      }
     ]
    }
   ]
  },
  {
   "id": "s-deployment-vs-statefulset-vs-daemonset",
   "num": null,
   "title": "Deployment vs StatefulSet vs DaemonSet",
   "stars": 1,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Deployment: stateless, interchangeable replicas."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "StatefulSet: stable identities, ordered lifecycle, persistent storage."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "DaemonSet: one Pod on every eligible node."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Pick by identity needs — none (Deployment), stable (StatefulSet), per-node (DaemonSet)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-service-vs-ingress",
   "num": null,
   "title": "Service vs Ingress",
   "stars": 1,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Service: stable network access (L3/L4) to a set of Pods; types ClusterIP, NodePort, LoadBalancer."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Ingress: L7 HTTP/HTTPS routing rules across Services, enforced by an Ingress controller."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "A LoadBalancer Service and an Ingress are different resources with different purposes."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Service reaches Pods; Ingress routes HTTP paths/hosts to Services."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-configmap-vs-secret",
   "num": null,
   "title": "ConfigMap vs Secret",
   "stars": 1,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "ConfigMap: non-sensitive config, plain values."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Secret: sensitive config, needs RBAC and encryption at rest; base64 is not security."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Same mechanism, different intent — Secret demands protection, ConfigMap does not."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-requests-vs-limits",
   "num": null,
   "title": "Requests vs Limits",
   "stars": 1,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Request influences scheduling and allocation."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Limit caps usage: CPU throttled, memory overuse terminates the container."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Request = guaranteed floor for scheduling; limit = hard ceiling."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-liveness-vs-readiness",
   "num": null,
   "title": "Liveness vs Readiness",
   "stars": 1,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Liveness failure restarts the container."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Readiness failure removes the Pod from Service traffic (no restart)."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Startup probe shields slow-starting apps from premature liveness failures."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Liveness = restart, readiness = traffic gate."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-clusterip-vs-nodeport-vs-loadbalancer-vs-ingress",
   "num": null,
   "title": "ClusterIP vs NodePort vs LoadBalancer vs Ingress",
   "stars": 1,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "ClusterIP: internal access."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "NodePort: access via a node IP and allocated port."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "LoadBalancer: external load balancer from infrastructure."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Ingress: HTTP/HTTPS routing via a controller."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Inside → ClusterIP; a node port → NodePort; cloud LB → LoadBalancer; HTTP routing → Ingress."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-horizontal-vs-vertical-scaling",
   "num": null,
   "title": "Horizontal vs Vertical Scaling",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Horizontal: more or fewer replicas."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Vertical: more or fewer resources per replica."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Scale out (more Pods) vs scale up (bigger Pods)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-pod-vs-container",
   "num": null,
   "title": "Pod vs Container",
   "stars": 1,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Container: runs one application process."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Pod: Kubernetes' smallest deployable unit, wrapping one or more containers that share networking and can share storage."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: A Pod is the schedulable wrapper; a container is the process inside it."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-does-kubernetes-replace-docker",
   "num": null,
   "title": "Does Kubernetes Replace Docker?",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Not exactly. Kubernetes orchestrates containers; Docker provides image-building and container tooling. Kubernetes can run containers with runtimes like containerd without Docker Engine. Docker Compose, by contrast, suits local multi-container setups, not cluster orchestration."
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Kubernetes orchestrates; Docker builds and runs; Compose is for local multi-container dev."
        }
       ]
      }
     ]
    }
   ]
  }
 ]
};
