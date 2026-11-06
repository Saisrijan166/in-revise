// AUTO-GENERATED from reference/aws.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs aws
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const awsCheatsheet: CheatDoc = {
 "title": "AWS",
 "tagline": "The whole topic on one page — services, trade-offs and the rules to remember.",
 "chapters": [
  {
   "id": "aws-fundamentals",
   "title": "AWS Fundamentals"
  },
  {
   "id": "compute",
   "title": "Compute"
  },
  {
   "id": "storage",
   "title": "Storage"
  },
  {
   "id": "databases",
   "title": "Databases"
  },
  {
   "id": "networking-and-security",
   "title": "Networking and Security"
  },
  {
   "id": "integration-and-messaging",
   "title": "Integration and Messaging"
  },
  {
   "id": "observability-and-deployment",
   "title": "Observability and Deployment"
  },
  {
   "id": "integrating-aws-from-java",
   "title": "Integrating AWS from Java"
  },
  {
   "id": "common-why-x-vs-y-comparisons",
   "title": "Common \"Why X vs Y?\" Comparisons"
  }
 ],
 "sections": [
  {
   "id": "s-what-aws-is",
   "num": null,
   "title": "What AWS Is",
   "stars": 0,
   "chapter": "aws-fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "AWS (Amazon Web Services) is a cloud platform that rents out computing, storage, databases, networking, and security as services instead of making you own the hardware."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Cloud computing:"
            }
           ]
          },
          {
           "type": "text",
           "value": " rent computing resources instead of buying and running all physical infrastructure yourself."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Pay-as-you-go:"
            }
           ]
          },
          {
           "type": "text",
           "value": " you pay according to usage or the pricing model of the service you pick."
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
         "value": "Remember: Cloud = someone else's hardware, billed by use; you focus on your application, not the data centre."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-regions-and-availability-zones",
   "num": null,
   "title": "Regions and Availability Zones",
   "stars": 1,
   "chapter": "aws-fundamentals",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Region:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a geographic area that contains AWS infrastructure."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Availability Zone (AZ):"
            }
           ]
          },
          {
           "type": "text",
           "value": " an isolated group of infrastructure inside a Region."
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
       "value": "Running across multiple AZs is how you survive the failure of one AZ."
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
         "value": "Remember: Multiple AZs inside one Region give you failure isolation without going far away."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-core-qualities",
   "num": null,
   "title": "Core Qualities",
   "stars": 0,
   "chapter": "aws-fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "These words come up constantly, so define them cleanly:"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "High availability:"
            }
           ]
          },
          {
           "type": "text",
           "value": " stays available even when some parts fail."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Scalability:"
            }
           ]
          },
          {
           "type": "text",
           "value": " can handle a growing workload."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Elasticity:"
            }
           ]
          },
          {
           "type": "text",
           "value": " can grow "
          },
          {
           "type": "emphasis",
           "children": [
            {
             "type": "text",
             "value": "and shrink"
            }
           ]
          },
          {
           "type": "text",
           "value": " resources as the workload changes."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Vertical scaling:"
            }
           ]
          },
          {
           "type": "text",
           "value": " give one machine more CPU or memory."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Horizontal scaling:"
            }
           ]
          },
          {
           "type": "text",
           "value": " add more machines or instances."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Durability:"
            }
           ]
          },
          {
           "type": "text",
           "value": " how unlikely stored data is to be lost."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Availability:"
            }
           ]
          },
          {
           "type": "text",
           "value": " how likely the service or data is to be reachable when needed."
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
         "value": "Remember: Durability is \"will my data survive?\"; availability is \"can I reach it right now?\"."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-shared-responsibility-model",
   "num": null,
   "title": "Shared Responsibility Model",
   "stars": 1,
   "chapter": "aws-fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "AWS secures the underlying cloud infrastructure. The customer stays responsible for parts of security and configuration — how much depends on the service."
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
         "value": "Remember: AWS secures the cloud; you secure what you put "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "in"
          }
         ]
        },
        {
         "type": "text",
         "value": " the cloud."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-well-architected-thinking",
   "num": null,
   "title": "Well-Architected Thinking",
   "stars": 0,
   "chapter": "aws-fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Interviewers expect you to design for the core qualities above: redundancy across AZs, horizontal scaling, least privilege, and paying only for what you use. Simply creating multiple servers does not by itself give high availability — the networking and data layers must be redundant too."
      }
     ]
    }
   ]
  },
  {
   "id": "s-ec2-elastic-compute-cloud",
   "num": null,
   "title": "EC2 — Elastic Compute Cloud",
   "stars": 1,
   "chapter": "compute",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A virtual server in AWS. You manage the operating system, installed software, and application runtime."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Use:"
            }
           ]
          },
          {
           "type": "text",
           "value": " run a Java/Spring Boot application on a Linux server."
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
           "value": "Best for flexible, long-running workloads."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-lambda",
   "num": null,
   "title": "Lambda",
   "stars": 1,
   "chapter": "compute",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Runs your code in response to events without you managing the servers directly."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Use:"
            }
           ]
          },
          {
           "type": "text",
           "value": " process a payment webhook or a small event-driven task."
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
           "value": "Best for short-lived, event-driven work."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-ecs-and-eks",
   "num": null,
   "title": "ECS and EKS",
   "stars": 0,
   "chapter": "compute",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Both run containerized applications."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "ECS (Elastic Container Service):"
            }
           ]
          },
          {
           "type": "text",
           "value": " runs and manages containers. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Fargate"
            }
           ]
          },
          {
           "type": "text",
           "value": " can run ECS tasks without you managing the underlying servers."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "EKS (Elastic Kubernetes Service):"
            }
           ]
          },
          {
           "type": "text",
           "value": " AWS-managed Kubernetes, for when you need the Kubernetes ecosystem and APIs."
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
       "value": "Supporting terms:"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Docker:"
            }
           ]
          },
          {
           "type": "text",
           "value": " packages an app and its dependencies into a container image."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Container:"
            }
           ]
          },
          {
           "type": "text",
           "value": " an isolated execution environment for an application."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Orchestration:"
            }
           ]
          },
          {
           "type": "text",
           "value": " automatically manages container placement, health, scaling, and replacement."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Fargate:"
            }
           ]
          },
          {
           "type": "text",
           "value": " serverless compute for supported containers; it does not mean the app has no servers anywhere."
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
         "value": "Remember: EC2 = you run a server. Containers (ECS/EKS) = you ship images. Lambda = you ship a function."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-compute-at-a-glance",
   "num": null,
   "title": "Compute at a Glance",
   "stars": 0,
   "chapter": "compute",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
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
           "value": "EC2"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Lambda"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "ECS"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "EKS"
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
           "value": "Virtual servers"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Event-driven functions"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Container orchestration"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Managed Kubernetes"
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
           "value": "You manage the OS"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "No server management"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "AWS manages orchestration"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Kubernetes-based"
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
           "value": "Long-running workloads"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Short-lived tasks"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Containers without Kubernetes"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Kubernetes ecosystem"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-auto-scaling-and-load-balancers",
   "num": null,
   "title": "Auto Scaling and Load Balancers",
   "stars": 1,
   "chapter": "compute",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Auto Scaling:"
            }
           ]
          },
          {
           "type": "text",
           "value": " adds or removes compute capacity according to policies and workload."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Load balancer:"
            }
           ]
          },
          {
           "type": "text",
           "value": " distributes incoming traffic across targets."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Application Load Balancer (ALB):"
            }
           ]
          },
          {
           "type": "text",
           "value": " Layer 7, for HTTP/HTTPS routing."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Network Load Balancer (NLB):"
            }
           ]
          },
          {
           "type": "text",
           "value": " Layer 4, for TCP/UDP/TLS traffic."
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
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Typical deployment answer:"
        }
       ]
      },
      {
       "type": "text",
       "value": " package the Spring Boot app as a Docker image, run it on ECS with Fargate, put an ALB in front to route to healthy tasks, and let Auto Scaling adjust task count with demand. (One valid design, not the only one.)"
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
         "value": "Remember: ALB routes by HTTP (paths, hosts); NLB just moves raw TCP/UDP fast."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-s3-simple-storage-service",
   "num": null,
   "title": "S3 — Simple Storage Service",
   "stars": 1,
   "chapter": "storage",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Object storage for files, backups, logs, images, and documents."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Bucket:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a container for objects."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Object:"
            }
           ]
          },
          {
           "type": "text",
           "value": " data stored with a key and metadata."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Versioning:"
            }
           ]
          },
          {
           "type": "text",
           "value": " keeps multiple versions of an object when enabled."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Lifecycle policy:"
            }
           ]
          },
          {
           "type": "text",
           "value": " automatically transitions or expires eligible objects by rule."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Pre-signed URL:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a time-limited URL granting specific access to one object."
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
       "value": "S3 is not a relational database. Do not keep a payment's authoritative transaction state only inside an invoice file in S3 — records belong in a database."
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
         "value": "Remember: S3 holds whole files keyed by name; it is cheap, durable, and not a database."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-ebs-and-efs",
   "num": null,
   "title": "EBS and EFS",
   "stars": 0,
   "chapter": "storage",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "EBS (Elastic Block Store):"
            }
           ]
          },
          {
           "type": "text",
           "value": " block storage, usually attached to one EC2 instance like a disk."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "EFS (Elastic File System):"
            }
           ]
          },
          {
           "type": "text",
           "value": " managed shared file storage that multiple compute clients can mount."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Object vs block storage:"
            }
           ]
          },
          {
           "type": "text",
           "value": " object storage works with whole objects; block storage gives block devices an OS uses as disks."
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
         "value": "Remember: EBS = one instance's disk. EFS = a shared filesystem. S3 = objects over HTTP."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-rds-and-aurora",
   "num": null,
   "title": "RDS and Aurora",
   "stars": 1,
   "chapter": "databases",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "RDS:"
            }
           ]
          },
          {
           "type": "text",
           "value": " managed relational databases, including MySQL and PostgreSQL engines."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Aurora:"
            }
           ]
          },
          {
           "type": "text",
           "value": " AWS-managed relational engine compatible with MySQL or PostgreSQL."
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
       "value": "Supporting terms:"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Read replica:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a copy used mainly to scale reads."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Multi-AZ:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a deployment design for availability and failover."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Point-in-time recovery:"
            }
           ]
          },
          {
           "type": "text",
           "value": " restores to a specific point within the recovery window."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Connection pooling:"
            }
           ]
          },
          {
           "type": "text",
           "value": " reuses DB connections so you don't open too many."
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
       "value": "Your Java app usually connects to RDS with the normal JDBC/JPA mechanism — RDS is managed database infrastructure, not a special client:"
      }
     ]
    },
    {
     "type": "code",
     "value": "spring.datasource.url=jdbc:postgresql://HOST:5432/mydb\nspring.datasource.username=USER\nspring.datasource.password=PASSWORD",
     "lang": "properties"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: RDS is just a managed SQL database; your app talks to it over plain JDBC."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-dynamodb",
   "num": null,
   "title": "DynamoDB",
   "stars": 0,
   "chapter": "databases",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Managed NoSQL key-value and document database, built for scale and key-based access."
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
         "value": "Remember: Pick DynamoDB when key-based access and scaling fit; pick RDS when you need joins, relational queries, and transactions."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-elasticache",
   "num": null,
   "title": "ElastiCache",
   "stars": 0,
   "chapter": "databases",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Managed caching service for Redis-compatible and Memcached engines."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Use:"
            }
           ]
          },
          {
           "type": "text",
           "value": " fast, short-lived cached lookups (for example cached payment or merchant-config reads)."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-example-data-layer",
   "num": null,
   "title": "Example data layer",
   "stars": 0,
   "chapter": "databases",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A Spring Boot payment service often uses several together:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Spring Boot Payment Service\n  ├─ RDS PostgreSQL  → payment records\n  ├─ ElastiCache     → cached lookups\n  └─ S3              → invoice PDFs"
    }
   ]
  },
  {
   "id": "s-vpc-subnets-and-routing",
   "num": null,
   "title": "VPC, Subnets and Routing",
   "stars": 1,
   "chapter": "networking-and-security",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "VPC (Virtual Private Cloud):"
            }
           ]
          },
          {
           "type": "text",
           "value": " a logically isolated network in AWS."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Subnet:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a range of IPs within a VPC, tied to one AZ."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Public subnet:"
            }
           ]
          },
          {
           "type": "text",
           "value": " typically has a route to an Internet Gateway."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Private subnet:"
            }
           ]
          },
          {
           "type": "text",
           "value": " typically has no direct inbound route from the internet."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Internet Gateway (IGW):"
            }
           ]
          },
          {
           "type": "text",
           "value": " lets a VPC talk to the internet when routes and other requirements are set."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "NAT Gateway:"
            }
           ]
          },
          {
           "type": "text",
           "value": " lets private-subnet resources make "
          },
          {
           "type": "emphasis",
           "children": [
            {
             "type": "text",
             "value": "outbound"
            }
           ]
          },
          {
           "type": "text",
           "value": " internet connections without being directly reachable from outside."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Route table:"
            }
           ]
          },
          {
           "type": "text",
           "value": " decides where network traffic is directed."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "VPC endpoint:"
            }
           ]
          },
          {
           "type": "text",
           "value": " reach AWS services without a public internet route."
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
         "value": "Remember: Public subnet = has an internet route. Private subnet = reaches out via NAT, stays unreachable from outside."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-security-groups-and-nacls",
   "num": null,
   "title": "Security Groups and NACLs",
   "stars": 1,
   "chapter": "networking-and-security",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Security Group:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "stateful"
            }
           ]
          },
          {
           "type": "text",
           "value": " virtual firewall on a resource/network interface — return traffic is allowed automatically."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Network ACL (NACL):"
            }
           ]
          },
          {
           "type": "text",
           "value": " "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "stateless"
            }
           ]
          },
          {
           "type": "text",
           "value": " access control at the subnet level — you must allow both directions."
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
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Networking traps to avoid:"
        }
       ]
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
           "value": "A private subnet is not automatically secure just because it is \"private\"."
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
           "value": "A public IP alone does not guarantee internet connectivity."
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
           "value": "A NAT Gateway is for outbound, not a general inbound mechanism."
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
           "value": "IAM permissions and network permissions solve different problems."
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
         "value": "Remember: Security group = stateful, on the instance. NACL = stateless, on the subnet."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-iam-identity-and-access-management",
   "num": null,
   "title": "IAM — Identity and Access Management",
   "stars": 1,
   "chapter": "networking-and-security",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Controls who or what can access AWS resources. Follow "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "least privilege"
        }
       ]
      },
      {
       "type": "text",
       "value": ": grant only the permissions a task needs."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "IAM user:"
            }
           ]
          },
          {
           "type": "text",
           "value": " an identity for a person or app when user credentials fit."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "IAM role:"
            }
           ]
          },
          {
           "type": "text",
           "value": " an identity with permissions a trusted entity can assume."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "IAM policy:"
            }
           ]
          },
          {
           "type": "text",
           "value": " defines allowed/denied actions on resources under conditions."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "IAM group:"
            }
           ]
          },
          {
           "type": "text",
           "value": " groups users for easier permission management."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Temporary credentials:"
            }
           ]
          },
          {
           "type": "text",
           "value": " short-lived credentials, usually from assuming a role."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Instance profile:"
            }
           ]
          },
          {
           "type": "text",
           "value": " gives an IAM role to an EC2 instance."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Execution role:"
            }
           ]
          },
          {
           "type": "text",
           "value": " permissions a service or function uses to do its work."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Resource-based policy:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a policy attached to a resource, such as an S3 bucket policy."
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
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Preferred pattern:"
        }
       ]
      },
      {
       "type": "text",
       "value": " to let a Spring Boot service write a receipt to S3, assign an IAM role with permission to that bucket/prefix — do not hardcode long-lived access keys in source code."
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
         "value": "Remember: Authentication identifies the principal; IAM authorization decides which AWS actions it may perform."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-encryption-and-secrets",
   "num": null,
   "title": "Encryption and Secrets",
   "stars": 0,
   "chapter": "networking-and-security",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "KMS (Key Management Service):"
            }
           ]
          },
          {
           "type": "text",
           "value": " manages cryptographic keys."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Secrets Manager:"
            }
           ]
          },
          {
           "type": "text",
           "value": " stores and manages secrets like DB credentials and API keys."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Parameter Store (Systems Manager):"
            }
           ]
          },
          {
           "type": "text",
           "value": " stores config values, and securely stores supported secrets."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Encryption at rest:"
            }
           ]
          },
          {
           "type": "text",
           "value": " protects stored data."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Encryption in transit:"
            }
           ]
          },
          {
           "type": "text",
           "value": " protects data moving over a connection (TLS certificates enable HTTPS)."
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
         "value": "Remember: KMS holds the keys; Secrets Manager holds the secrets; use roles, never hardcoded keys."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-sqs-sns-eventbridge-and-kinesis",
   "num": null,
   "title": "SQS, SNS, EventBridge and Kinesis",
   "stars": 1,
   "chapter": "integration-and-messaging",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "SQS (Simple Queue Service):"
            }
           ]
          },
          {
           "type": "text",
           "value": " a message queue that decouples producers from consumers."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "SNS (Simple Notification Service):"
            }
           ]
          },
          {
           "type": "text",
           "value": " publish/subscribe that fans one message out to many subscribers."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "EventBridge:"
            }
           ]
          },
          {
           "type": "text",
           "value": " routes events to targets based on rules."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Kinesis:"
            }
           ]
          },
          {
           "type": "text",
           "value": " collects and processes streaming data."
          }
         ]
        }
       ]
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
           "value": "Service"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Main purpose"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Example"
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
           "value": "SQS"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Queue and decouple work"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Process payment receipts"
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
           "value": "SNS"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Publish and fan out"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Notify many subscribers"
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
           "value": "EventBridge"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Route events by rule"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Route "
          },
          {
           "type": "inlineCode",
           "value": "PaymentSucceeded"
          },
          {
           "type": "text",
           "value": " to targets"
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
           "value": "Kinesis"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Stream ingestion/processing"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Continuous event stream"
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
       "value": "A payment service can drop a receipt-generation job on SQS and return immediately, while a worker picks it up and writes to S3 — no waiting."
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
         "value": "Remember: SQS holds work for one consumer group; SNS broadcasts to many; EventBridge routes by rules. They combine well."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-queue-behaviour-you-must-know",
   "num": null,
   "title": "Queue Behaviour You Must Know",
   "stars": 0,
   "chapter": "integration-and-messaging",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Producer / Consumer:"
            }
           ]
          },
          {
           "type": "text",
           "value": " sends / receives and processes a message."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Dead-letter queue (DLQ):"
            }
           ]
          },
          {
           "type": "text",
           "value": " holds messages that keep failing, per redrive rules."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Visibility timeout:"
            }
           ]
          },
          {
           "type": "text",
           "value": " how long a received SQS message is hidden from other consumers."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Message retention:"
            }
           ]
          },
          {
           "type": "text",
           "value": " how long a message stays available in the queue."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "At-least-once delivery:"
            }
           ]
          },
          {
           "type": "text",
           "value": " consumers must handle duplicates — design to be idempotent."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "FIFO queue:"
            }
           ]
          },
          {
           "type": "text",
           "value": " SQS type giving ordered processing within a message group, plus deduplication."
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
         "value": "Remember: Standard SQS is at-least-once, so make processing idempotent; FIFO adds order and dedup."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-monitoring-and-auditing",
   "num": null,
   "title": "Monitoring and Auditing",
   "stars": 1,
   "chapter": "observability-and-deployment",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "CloudWatch:"
            }
           ]
          },
          {
           "type": "text",
           "value": " collects logs, metrics, and alarms (for example, alert when error rate rises)."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "CloudTrail:"
            }
           ]
          },
          {
           "type": "text",
           "value": " records AWS API activity for auditing and investigation."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "X-Ray:"
            }
           ]
          },
          {
           "type": "text",
           "value": " distributed tracing for instrumented apps and services."
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
         "value": "Remember: CloudWatch = metrics/logs/alarms (how it's running); CloudTrail = who called which AWS API (audit)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-infrastructure-as-code-and-ci-cd",
   "num": null,
   "title": "Infrastructure as Code and CI/CD",
   "stars": 0,
   "chapter": "observability-and-deployment",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "CloudFormation:"
            }
           ]
          },
          {
           "type": "text",
           "value": " defines and manages AWS infrastructure using templates."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Infrastructure as Code (IaC):"
            }
           ]
          },
          {
           "type": "text",
           "value": " manage infrastructure through version-controlled definitions, not manual clicks."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "CI/CD:"
            }
           ]
          },
          {
           "type": "text",
           "value": " automate building, testing, and deploying software."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-deployment-strategies",
   "num": null,
   "title": "Deployment Strategies",
   "stars": 0,
   "chapter": "observability-and-deployment",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Blue-green:"
            }
           ]
          },
          {
           "type": "text",
           "value": " keep old and new environments side by side and switch traffic over."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Canary:"
            }
           ]
          },
          {
           "type": "text",
           "value": " release to a small slice of traffic first, then widen."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Rolling:"
            }
           ]
          },
          {
           "type": "text",
           "value": " gradually replace old instances/tasks with new ones."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Health check:"
            }
           ]
          },
          {
           "type": "text",
           "value": " decides whether a target is healthy enough to receive traffic."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-resilience-terms",
   "num": null,
   "title": "Resilience Terms",
   "stars": 0,
   "chapter": "observability-and-deployment",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Disaster recovery:"
            }
           ]
          },
          {
           "type": "text",
           "value": " restoring service after a serious failure."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "RTO (Recovery Time Objective):"
            }
           ]
          },
          {
           "type": "text",
           "value": " the maximum targeted time to restore service."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "RPO (Recovery Point Objective):"
            }
           ]
          },
          {
           "type": "text",
           "value": " the maximum targeted data loss, measured in time."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Secrets rotation:"
            }
           ]
          },
          {
           "type": "text",
           "value": " replacing credentials periodically or when required."
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
         "value": "Remember: RTO = how long until we're back; RPO = how much data we can afford to lose."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-the-mental-model",
   "num": null,
   "title": "The Mental Model",
   "stars": 1,
   "chapter": "integrating-aws-from-java",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Don't memorize the SDK. First name the service, then follow one simple chain: "
      },
      {
       "type": "inlineCode",
       "value": "Java → AWS SDK client → service → resource"
      },
      {
       "type": "text",
       "value": ". Map the job to the service:"
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
           "value": "Service"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Job"
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
           "value": "S3"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "file storage"
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
           "value": "RDS"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "database"
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
           "value": "SQS"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "queue"
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
           "value": "EC2"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "server"
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
           "value": "Lambda"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "serverless function"
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
           "value": "CloudWatch"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "monitoring"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-s3-upload-pattern",
   "num": null,
   "title": "S3 Upload Pattern",
   "stars": 0,
   "chapter": "integrating-aws-from-java",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "S3Client → PutObjectRequest → bucket + key → putObject()"
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "code",
     "value": "S3Client s3 = S3Client.builder()\n        .region(Region.AP_SOUTH_1)\n        .build();\n\nPutObjectRequest request = PutObjectRequest.builder()\n        .bucket(\"my-bucket\")\n        .key(\"hello.txt\")\n        .build();\n\ns3.putObject(request, RequestBody.fromString(\"Hello AWS\"));",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Reading uses "
      },
      {
       "type": "inlineCode",
       "value": "GetObjectRequest"
      },
      {
       "type": "text",
       "value": " with the same bucket + key, then "
      },
      {
       "type": "inlineCode",
       "value": "getObjectAsBytes(request)"
      },
      {
       "type": "text",
       "value": ". In Spring Boot, inject the "
      },
      {
       "type": "inlineCode",
       "value": "S3Client"
      },
      {
       "type": "text",
       "value": " into a service and keep controllers thin: "
      },
      {
       "type": "inlineCode",
       "value": "Controller → Service → S3Client → bucket"
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
   "id": "s-sqs-send-pattern",
   "num": null,
   "title": "SQS Send Pattern",
   "stars": 0,
   "chapter": "integrating-aws-from-java",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "SqsClient → SendMessageRequest → queueUrl + messageBody → sendMessage()"
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "code",
     "value": "SqsClient sqs = SqsClient.builder()\n        .region(Region.AP_SOUTH_1)\n        .build();\n\nSendMessageRequest request = SendMessageRequest.builder()\n        .queueUrl(queueUrl)\n        .messageBody(\"Order created\")\n        .build();\n\nsqs.sendMessage(request);",
     "lang": "java"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Every AWS SDK call is "
        },
        {
         "type": "inlineCode",
         "value": "build a client → build a request → call the method"
        },
        {
         "type": "text",
         "value": "; RDS is the exception — connect with plain JDBC/JPA."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-ec2-vs-lambda",
   "num": null,
   "title": "EC2 vs Lambda",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "EC2:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a server you run and manage; good for long-running, flexible workloads."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Lambda:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a function AWS runs on an event; good for short, event-driven tasks with no server management."
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
         "value": "Remember: Long-lived and in control → EC2. Short, event-driven, hands-off → Lambda."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-ecs-vs-eks",
   "num": null,
   "title": "ECS vs EKS",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "ECS:"
            }
           ]
          },
          {
           "type": "text",
           "value": " AWS-native container orchestration, simpler, no Kubernetes to learn."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "EKS:"
            }
           ]
          },
          {
           "type": "text",
           "value": " managed Kubernetes, for teams that want the Kubernetes ecosystem and APIs."
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
         "value": "Remember: Containers without Kubernetes → ECS. You need Kubernetes → EKS."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-s3-vs-ebs-vs-efs",
   "num": null,
   "title": "S3 vs EBS vs EFS",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "S3:"
            }
           ]
          },
          {
           "type": "text",
           "value": " object storage over HTTP; whole files by key."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "EBS:"
            }
           ]
          },
          {
           "type": "text",
           "value": " block storage attached to a single EC2 instance, like a disk."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "EFS:"
            }
           ]
          },
          {
           "type": "text",
           "value": " shared file storage many compute clients can mount."
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
         "value": "Remember: Files by name → S3. One instance's disk → EBS. Shared filesystem → EFS."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-rds-vs-dynamodb",
   "num": null,
   "title": "RDS vs DynamoDB",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "RDS:"
            }
           ]
          },
          {
           "type": "text",
           "value": " relational, SQL, joins, relational transactions."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "DynamoDB:"
            }
           ]
          },
          {
           "type": "text",
           "value": " NoSQL, key-oriented access, scales for simple access patterns."
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
         "value": "Remember: Joins and SQL → RDS. Key lookups at scale → DynamoDB."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-sqs-vs-sns",
   "num": null,
   "title": "SQS vs SNS",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "SQS:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a queue — holds work until a consumer pulls and processes it."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "SNS:"
            }
           ]
          },
          {
           "type": "text",
           "value": " pub/sub — pushes one published message to many subscribers."
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
       "value": "They are not interchangeable, but combine well (SNS fanning out into several SQS queues)."
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
         "value": "Remember: Hold work for a worker → SQS. Broadcast to many → SNS."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-security-group-vs-nacl",
   "num": null,
   "title": "Security Group vs NACL",
   "stars": 1,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
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
         "children": []
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Security Group"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "NACL"
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
           "value": "Level"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Resource / network interface"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Subnet"
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
           "value": "State"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Stateful (return traffic auto-allowed)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Stateless (allow both directions)"
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
           "value": "Rules"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Allow only"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Allow and deny"
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
         "value": "Remember: Stateful firewall on the instance → security group. Stateless rules on the subnet → NACL."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-cloudwatch-vs-cloudtrail",
   "num": null,
   "title": "CloudWatch vs CloudTrail",
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "CloudWatch:"
            }
           ]
          },
          {
           "type": "text",
           "value": " operational data — logs, metrics, alarms."
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "CloudTrail:"
            }
           ]
          },
          {
           "type": "text",
           "value": " audit trail — who called which AWS API and when."
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
         "value": "Remember: How the system runs → CloudWatch. Who did what in AWS → CloudTrail."
        }
       ]
      }
     ]
    }
   ]
  }
 ]
};
