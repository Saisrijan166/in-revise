// AUTO-GENERATED from reference/docker.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs docker
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const dockerCheatsheet: CheatDoc = {
 "title": "Docker",
 "tagline": "The whole topic on one page — images, containers and the rules to remember.",
 "chapters": [
  {
   "id": "fundamentals",
   "title": "Fundamentals"
  },
  {
   "id": "images-dockerfile",
   "title": "Images & Dockerfile"
  },
  {
   "id": "containers",
   "title": "Containers"
  },
  {
   "id": "networking-storage",
   "title": "Networking & Storage"
  },
  {
   "id": "compose",
   "title": "Compose"
  },
  {
   "id": "registry-distribution",
   "title": "Registry & Distribution"
  },
  {
   "id": "best-practices-troubleshooting",
   "title": "Best Practices & Troubleshooting"
  },
  {
   "id": "common-why-x-vs-y-comparisons",
   "title": "Common \"Why X vs Y?\" Comparisons"
  }
 ],
 "sections": [
  {
   "id": "s-what-is-docker",
   "num": null,
   "title": "What is Docker",
   "stars": 1,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Docker is a platform that packages an application together with its dependencies into a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "container"
        }
       ]
      },
      {
       "type": "text",
       "value": " so it runs the same way on any machine that supports containers."
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
           "value": "Without Docker, an app may work on one developer's machine but fail elsewhere because of different dependencies or configuration."
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
           "value": "Containerization = packaging an app and its dependencies into one unit."
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
           "value": "Container orchestration = managing containers across many machines automatically (Kubernetes is the common example)."
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
         "value": "Remember: Docker makes \"works on my machine\" into \"works everywhere\"."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-image-vs-container",
   "num": null,
   "title": "Image vs Container",
   "stars": 2,
   "chapter": "fundamentals",
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
             "value": "Image"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a read-only template used to create containers (built from a Dockerfile)."
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
             "value": "Container"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a running instance created from an image; it gets its own writable layer."
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
       "value": "Key rules:"
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
           "value": "Multiple containers can run from the same image, each with a separate writable layer."
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
           "value": "Containers are disposable; images are immutable templates."
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
         "value": "Remember: Image = template (class); container = running instance (object)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-container-vs-virtual-machine",
   "num": null,
   "title": "Container vs Virtual Machine",
   "stars": 2,
   "chapter": "fundamentals",
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
           "value": "Container"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Virtual Machine"
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
           "value": "Shares the host OS kernel"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Runs its own guest OS"
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
           "value": "Lightweight, starts quickly"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Heavier, slower to start"
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
           "value": "Isolated process"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Virtualizes hardware via a hypervisor"
          }
         ]
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
           "value": "A container holds user-space files and libraries, "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "not its own kernel"
            }
           ]
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
           "value": "Linux containers need a Linux kernel; Docker Desktop runs them on Windows/Mac using a Linux VM."
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
           "value": "Containers are isolated but not perfectly secure — security depends on configuration and host protections."
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
         "value": "Remember: VMs virtualize hardware; containers share a kernel and isolate processes."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-the-docker-engine",
   "num": null,
   "title": "The Docker Engine",
   "stars": 1,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Docker Engine is the software that builds and runs containers. Its parts:"
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
             "value": "Docker CLI (client)"
            }
           ]
          },
          {
           "type": "text",
           "value": ": you type "
          },
          {
           "type": "inlineCode",
           "value": "docker build"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "docker run"
          },
          {
           "type": "text",
           "value": "; it sends commands to the daemon."
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
             "value": "Docker daemon ("
            },
            {
             "type": "inlineCode",
             "value": "dockerd"
            },
            {
             "type": "text",
             "value": ")"
            }
           ]
          },
          {
           "type": "text",
           "value": ": builds images, creates containers, manages Docker objects."
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
             "value": "Registry"
            }
           ]
          },
          {
           "type": "text",
           "value": ": stores and distributes images (Docker Hub is the common public one)."
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
             "value": "Docker Desktop"
            }
           ]
          },
          {
           "type": "text",
           "value": ": desktop app providing the CLI, daemon and a container runtime on supported OSes."
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
       "value": "Typical flow: "
      },
      {
       "type": "inlineCode",
       "value": "Dockerfile"
      },
      {
       "type": "text",
       "value": " → "
      },
      {
       "type": "inlineCode",
       "value": "docker build"
      },
      {
       "type": "text",
       "value": " → "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Image"
        }
       ]
      },
      {
       "type": "text",
       "value": " → "
      },
      {
       "type": "inlineCode",
       "value": "docker run"
      },
      {
       "type": "text",
       "value": " → "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Container"
        }
       ]
      },
      {
       "type": "text",
       "value": " (running app). A registry is only needed to share or fetch an image, not for every local build-and-run."
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
         "value": "Remember: CLI talks to the daemon; the daemon does the work; the registry stores images."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-image-layers-and-caching",
   "num": null,
   "title": "Image Layers and Caching",
   "stars": 1,
   "chapter": "images-dockerfile",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "An image is built from stacked "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "layers"
        }
       ]
      },
      {
       "type": "text",
       "value": ", each a filesystem change from one build step."
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
             "value": "Layer caching"
            }
           ]
          },
          {
           "type": "text",
           "value": ": Docker reuses unchanged build steps to speed up later builds; a step is rebuilt when its inputs change."
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
             "value": "Base image"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the starting image set by "
          },
          {
           "type": "inlineCode",
           "value": "FROM"
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
           "value": "Order instructions so rarely-changing steps come first — this keeps the cache valid for longer."
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
         "value": "Remember: Layers are cached top-down; change an early step and everything after it rebuilds."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-tags-vs-digests",
   "num": null,
   "title": "Tags vs Digests",
   "stars": 0,
   "chapter": "images-dockerfile",
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
             "value": "Tag"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a human-readable label for a version, e.g. "
          },
          {
           "type": "inlineCode",
           "value": "nginx:1.28"
          },
          {
           "type": "text",
           "value": ". Tags are mutable — they can be repointed to different images."
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
             "value": "Digest"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a content-addressed id that always identifies the exact same content; use it to pin an image."
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
             "value": "Repository"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a collection of related image versions in a registry."
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
           "value": "latest"
          },
          {
           "type": "text",
           "value": " is just a tag, "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "not"
            }
           ]
          },
          {
           "type": "text",
           "value": " a guarantee of the newest or safest image."
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
         "value": "Remember: Tag for readability, digest for reproducibility."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-dockerfile-instructions",
   "num": null,
   "title": "Dockerfile Instructions",
   "stars": 2,
   "chapter": "images-dockerfile",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A Dockerfile is a text file of instructions that build an image."
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
           "value": "Instruction"
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
           "value": "FROM"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Selects the base image."
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
           "value": "WORKDIR"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Sets the working directory for later instructions."
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
           "value": "COPY"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Copies files from the build context into the image."
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
           "value": "ADD"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Like "
          },
          {
           "type": "inlineCode",
           "value": "COPY"
          },
          {
           "type": "text",
           "value": ", but can also fetch URLs and extract local tar archives. Prefer "
          },
          {
           "type": "inlineCode",
           "value": "COPY"
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
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "RUN"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Runs a command during the build (install/prepare)."
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
           "value": "ENV"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Sets environment variables in the image config."
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
           "value": "ARG"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Defines a build-time variable."
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
           "value": "EXPOSE"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Documents the intended port; does "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "not"
            }
           ]
          },
          {
           "type": "text",
           "value": " publish it."
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
           "value": "CMD"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Default command/arguments when the container starts."
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
           "value": "ENTRYPOINT"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "The main executable for the container."
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
           "value": "USER"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Sets the user for later steps and at runtime."
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
           "value": "VOLUME"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Declares a mount point for persistent/external data."
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
           "value": "HEALTHCHECK"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Command Docker uses to check container health."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "FROM eclipse-temurin:21-jre\nWORKDIR /app\nCOPY target/app.jar app.jar\nEXPOSE 8080\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]",
     "lang": "dockerfile"
    },
    {
     "type": "code",
     "value": "docker build -t myapp:1.0 .\ndocker run -p 8080:8080 myapp:1.0",
     "lang": "bash"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: The JAR must already be built; this Dockerfile only copies and runs it."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-run-vs-cmd-vs-entrypoint",
   "num": null,
   "title": "RUN vs CMD vs ENTRYPOINT",
   "stars": 3,
   "chapter": "images-dockerfile",
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
         "children": [
          {
           "type": "text",
           "value": "Instruction"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "When it runs"
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
           "value": "RUN"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "During image build"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Install or prepare something."
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
           "value": "CMD"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "When the container starts"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Default command/arguments."
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
           "value": "ENTRYPOINT"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "When the container starts"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "The main executable."
          }
         ]
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
           "type": "inlineCode",
           "value": "CMD"
          },
          {
           "type": "text",
           "value": " is overridden by arguments given to "
          },
          {
           "type": "inlineCode",
           "value": "docker run"
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
           "value": "With exec-form "
          },
          {
           "type": "inlineCode",
           "value": "ENTRYPOINT"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "docker run"
          },
          {
           "type": "text",
           "value": " arguments are appended to it."
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
           "value": "When both are set, "
          },
          {
           "type": "inlineCode",
           "value": "CMD"
          },
          {
           "type": "text",
           "value": " supplies the "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "default arguments"
            }
           ]
          },
          {
           "type": "text",
           "value": " to "
          },
          {
           "type": "inlineCode",
           "value": "ENTRYPOINT"
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
           "value": "Prefer JSON/exec form ("
          },
          {
           "type": "inlineCode",
           "value": "[\"java\",\"-jar\",\"app.jar\"]"
          },
          {
           "type": "text",
           "value": ") for predictable signal handling."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "ENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]\nCMD [\"--server.port=8080\"]\n# effective: java -jar app.jar --server.port=8080",
     "lang": "dockerfile"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: RUN builds the image; ENTRYPOINT is the fixed command; CMD is its default (overridable) args."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-multi-stage-builds",
   "num": null,
   "title": "Multi-stage Builds",
   "stars": 1,
   "chapter": "images-dockerfile",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A multi-stage build uses several "
      },
      {
       "type": "inlineCode",
       "value": "FROM"
      },
      {
       "type": "text",
       "value": " stages so the final image keeps only what it needs, leaving compilers and build tools behind."
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
           "value": "Shrinks image size and attack surface."
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
           "value": "Pair with a small base image, a "
          },
          {
           "type": "inlineCode",
           "value": ".dockerignore"
          },
          {
           "type": "text",
           "value": ", and image pinning."
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
         "value": "Remember: Build in a fat stage, copy the artifact into a slim final stage."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-container-lifecycle",
   "num": null,
   "title": "Container Lifecycle",
   "stars": 1,
   "chapter": "containers",
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
             "value": "Create"
            }
           ]
          },
          {
           "type": "text",
           "value": ": makes a container without starting it."
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
             "value": "Run"
            }
           ]
          },
          {
           "type": "text",
           "value": ": creates "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "and"
            }
           ]
          },
          {
           "type": "text",
           "value": " starts a container ("
          },
          {
           "type": "inlineCode",
           "value": "docker run"
          },
          {
           "type": "text",
           "value": ")."
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
             "value": "Start / Stop / Restart"
            }
           ]
          },
          {
           "type": "text",
           "value": ": stop requests a graceful shutdown, then kills after a timeout."
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
             "value": "Kill"
            }
           ]
          },
          {
           "type": "text",
           "value": ": sends an immediate kill signal."
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
             "value": "Remove"
            }
           ]
          },
          {
           "type": "text",
           "value": ": deletes a stopped container."
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
         "value": "run"
        },
        {
         "type": "text",
         "value": " = create + start; "
        },
        {
         "type": "inlineCode",
         "value": "exec"
        },
        {
         "type": "text",
         "value": " = run a command inside an already-running container."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-everyday-commands",
   "num": null,
   "title": "Everyday Commands",
   "stars": 1,
   "chapter": "containers",
   "nodes": [
    {
     "type": "code",
     "value": "docker images\ndocker ps            # running containers\ndocker ps -a         # includes stopped containers\n\ndocker run -d --name myapp -p 8080:8080 myapp:1.0\ndocker logs -f myapp\ndocker exec -it myapp sh\n\ndocker stop myapp\ndocker start myapp\ndocker rm myapp      # needs it stopped; -f force-removes\ndocker rmi myapp:1.0 # removes an image, not a container\n\ndocker pull nginx\ndocker push username/myapp:1.0",
     "lang": "bash"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Key rules:"
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
           "type": "inlineCode",
           "value": "docker run"
          },
          {
           "type": "text",
           "value": " creates a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "new"
            }
           ]
          },
          {
           "type": "text",
           "value": " container — it does not restart an existing named one."
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
           "value": "docker logs"
          },
          {
           "type": "text",
           "value": " only shows what the app writes to stdout/stderr."
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
           "value": "docker rmi"
          },
          {
           "type": "text",
           "value": " removes images; "
          },
          {
           "type": "inlineCode",
           "value": "docker rm"
          },
          {
           "type": "text",
           "value": " removes containers."
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
         "value": "ps"
        },
        {
         "type": "text",
         "value": " shows running; "
        },
        {
         "type": "inlineCode",
         "value": "ps -a"
        },
        {
         "type": "text",
         "value": " shows all; "
        },
        {
         "type": "inlineCode",
         "value": "exec"
        },
        {
         "type": "text",
         "value": " gets you a shell inside a live container."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-port-mapping",
   "num": null,
   "title": "Port Mapping",
   "stars": 2,
   "chapter": "networking-storage",
   "nodes": [
    {
     "type": "code",
     "value": "docker run -p 8080:80 nginx   # host 8080 -> container 80",
     "lang": "bash"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The host receives on "
      },
      {
       "type": "inlineCode",
       "value": "8080"
      },
      {
       "type": "text",
       "value": " and forwards to port "
      },
      {
       "type": "inlineCode",
       "value": "80"
      },
      {
       "type": "text",
       "value": " inside the container."
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
           "type": "inlineCode",
           "value": "EXPOSE 80"
          },
          {
           "type": "text",
           "value": " alone does "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "not"
            }
           ]
          },
          {
           "type": "text",
           "value": " publish the port — you must use "
          },
          {
           "type": "inlineCode",
           "value": "-p"
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
           "value": "Publishing a port is different from exposing/documenting one."
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
         "value": "-p HOST:CONTAINER"
        },
        {
         "type": "text",
         "value": " publishes; "
        },
        {
         "type": "inlineCode",
         "value": "EXPOSE"
        },
        {
         "type": "text",
         "value": " only documents."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-network-types",
   "num": null,
   "title": "Network Types",
   "stars": 0,
   "chapter": "networking-storage",
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
             "value": "Bridge"
            }
           ]
          },
          {
           "type": "text",
           "value": ": default for standalone containers on Linux; same-bridge containers can talk."
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
             "value": "User-defined bridge"
            }
           ]
          },
          {
           "type": "text",
           "value": ": adds name-based discovery between containers."
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
             "value": "Host"
            }
           ]
          },
          {
           "type": "text",
           "value": ": uses the host's network namespace; no port mapping needed."
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
             "value": "None"
            }
           ]
          },
          {
           "type": "text",
           "value": ": disables ordinary networking."
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
             "value": "Overlay"
            }
           ]
          },
          {
           "type": "text",
           "value": ": connects containers across multiple hosts."
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
       "value": "Traps:"
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
           "type": "inlineCode",
           "value": "localhost"
          },
          {
           "type": "text",
           "value": " inside a container means "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "that container"
            }
           ]
          },
          {
           "type": "text",
           "value": ", not the host or another container."
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
           "value": "Containers reach each other by container/service name only when the network supports name resolution."
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
           "value": "Network reachability is not app reachability — the app must listen on the right interface and port."
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
         "value": "Remember: Use a user-defined bridge so containers can find each other by name."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-volumes-vs-bind-mounts",
   "num": null,
   "title": "Volumes vs Bind Mounts",
   "stars": 2,
   "chapter": "networking-storage",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Containers are disposable; data in the writable layer is lost when the container is removed. Persist data with mounts."
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
           "value": "Volume"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Bind mount"
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
           "value": "Managed by Docker"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Maps a specific host path"
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
           "value": "Good for app/database data"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Good for dev files and host sharing"
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
           "value": "Independent of any host directory"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Tied to the host directory/path"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "docker volume create pgdata\ndocker run -d --name postgres \\\n  -e POSTGRES_PASSWORD=example \\\n  -v pgdata:/var/lib/postgresql/data \\\n  postgres",
     "lang": "bash"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Key rules:"
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
           "value": "Removing a container or image does "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "not"
            }
           ]
          },
          {
           "type": "text",
           "value": " remove a named volume."
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
           "value": "docker rm -v"
          },
          {
           "type": "text",
           "value": " removes anonymous volumes, not named ones; "
          },
          {
           "type": "inlineCode",
           "value": "docker volume prune"
          },
          {
           "type": "text",
           "value": " deletes unused volumes — use carefully."
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
           "value": "Mounting over an existing directory hides its previous contents while mounted."
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
           "value": "A "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "tmpfs"
            }
           ]
          },
          {
           "type": "text",
           "value": " mount keeps temporary data in memory (Linux)."
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
         "value": "Remember: Volume = Docker-managed persistent data; bind mount = a chosen host path."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-environment-variables-and-secrets",
   "num": null,
   "title": "Environment Variables and Secrets",
   "stars": 0,
   "chapter": "networking-storage",
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
           "type": "inlineCode",
           "value": "ENV"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "-e"
          },
          {
           "type": "text",
           "value": " supply runtime config (e.g. "
          },
          {
           "type": "inlineCode",
           "value": "SPRING_PROFILES_ACTIVE"
          },
          {
           "type": "text",
           "value": ", DB URL)."
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
           "value": "ARG"
          },
          {
           "type": "text",
           "value": " supplies build-time values only."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "docker run -e SPRING_PROFILES_ACTIVE=prod -e DB_HOST=db myapp:1.0",
     "lang": "bash"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Key rules:"
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
           "type": "inlineCode",
           "value": "ARG"
          },
          {
           "type": "text",
           "value": " is not safe for secrets — it can leak through build metadata or logs."
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
           "value": "ENV"
          },
          {
           "type": "text",
           "value": " is not a secure secret store either; don't bake credentials into an image."
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
           "value": "Use a secret manager or a secured runtime secret mechanism."
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
         "value": "Remember: Env vars configure; they do not secure — keep secrets out of images."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-docker-compose",
   "num": null,
   "title": "Docker Compose",
   "stars": 2,
   "chapter": "compose",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Docker Compose defines and runs a multi-container app from one YAML file (commonly "
      },
      {
       "type": "inlineCode",
       "value": "compose.yaml"
      },
      {
       "type": "text",
       "value": ") — e.g. a Spring Boot app with PostgreSQL and Redis for development."
      }
     ]
    },
    {
     "type": "code",
     "value": "services:\n  app:\n    build: .\n    ports:\n      - \"8080:8080\"\n    depends_on:\n      - db\n  db:\n    image: postgres:17\n    environment:\n      POSTGRES_DB: appdb\n      POSTGRES_PASSWORD: example\n    volumes:\n      - pgdata:/var/lib/postgresql/data\nvolumes:\n  pgdata:",
     "lang": "yaml"
    },
    {
     "type": "code",
     "value": "docker compose up -d\ndocker compose logs -f\ndocker compose down      # keeps named volumes\ndocker compose down -v   # also removes named volumes (data lost)",
     "lang": "bash"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Key rules:"
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
             "value": "Service"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a named component; services reach each other by service name (here the DB host is "
          },
          {
           "type": "inlineCode",
           "value": "db"
          },
          {
           "type": "text",
           "value": ")."
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
           "value": "depends_on"
          },
          {
           "type": "text",
           "value": " controls "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "start order only"
            }
           ]
          },
          {
           "type": "text",
           "value": " — it does not wait for the dependency to be ready; use a health check for readiness."
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
         "value": "Remember: Compose = one file for many services that talk by name; "
        },
        {
         "type": "inlineCode",
         "value": "down -v"
        },
        {
         "type": "text",
         "value": " deletes your data."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-registries-and-distribution",
   "num": null,
   "title": "Registries and Distribution",
   "stars": 0,
   "chapter": "registry-distribution",
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
           "value": "A "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "registry"
            }
           ]
          },
          {
           "type": "text",
           "value": " stores and distributes images; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Docker Hub"
            }
           ]
          },
          {
           "type": "text",
           "value": " is the common public one."
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
           "value": "docker push"
          },
          {
           "type": "text",
           "value": " uploads an image; "
          },
          {
           "type": "inlineCode",
           "value": "docker pull"
          },
          {
           "type": "text",
           "value": " downloads one."
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
           "value": "A "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "repository"
            }
           ]
          },
          {
           "type": "text",
           "value": " holds related versions of an image, identified by tag or digest."
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
           "value": "Pin images by exact version or digest for reproducible deployments."
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
         "value": "Remember: Push to share, pull to fetch; pin by digest for repeatable builds."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-best-practices",
   "num": null,
   "title": "Best Practices",
   "stars": 1,
   "chapter": "best-practices-troubleshooting",
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
             "value": "Multi-stage build"
            }
           ]
          },
          {
           "type": "text",
           "value": ": keep compilers/build tools out of the final image."
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
             "value": "Small base image"
            }
           ]
          },
          {
           "type": "text",
           "value": ": smaller size and attack surface."
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
             "type": "inlineCode",
             "value": ".dockerignore"
            }
           ]
          },
          {
           "type": "text",
           "value": ": exclude unneeded files from the build context."
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
             "value": "Non-root user"
            }
           ]
          },
          {
           "type": "text",
           "value": ": limit damage if the app is compromised."
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
             "value": "Image scanning"
            }
           ]
          },
          {
           "type": "text",
           "value": ": check for known vulnerabilities."
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
             "value": "Image pinning"
            }
           ]
          },
          {
           "type": "text",
           "value": ": exact version or digest."
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
             "value": "Graceful shutdown"
            }
           ]
          },
          {
           "type": "text",
           "value": " and "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "resource limits"
            }
           ]
          },
          {
           "type": "text",
           "value": " (CPU/memory)."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": ".git\nnode_modules\n.env\ntarget/",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "(Only ignore "
      },
      {
       "type": "inlineCode",
       "value": "target/"
      },
      {
       "type": "text",
       "value": " if the build doesn't need the locally built JAR — the sample Dockerfile copies "
      },
      {
       "type": "inlineCode",
       "value": "target/app.jar"
      },
      {
       "type": "text",
       "value": ".)"
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
         "value": "Remember: Small, pinned, non-root images with secrets kept outside."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-common-mistakes",
   "num": null,
   "title": "Common Mistakes",
   "stars": 0,
   "chapter": "best-practices-troubleshooting",
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
           "value": "Running production containers as root unnecessarily."
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
           "value": "Putting passwords in a Dockerfile or "
          },
          {
           "type": "inlineCode",
           "value": "ARG"
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
           "value": "Assuming container files are permanent."
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
           "value": "Using "
          },
          {
           "type": "inlineCode",
           "value": "latest"
          },
          {
           "type": "text",
           "value": " for reproducible production."
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
           "value": "Shipping build tools in the final image."
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
           "value": "Assuming a running container means a healthy app."
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
           "value": "Assuming Docker auto-restarts a crashed container — that depends on the "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "restart policy"
            }
           ]
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
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Running is not the same as healthy; restart behaviour is configured, not automatic."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-defaults-worth-remembering",
   "num": null,
   "title": "Defaults Worth Remembering",
   "stars": 0,
   "chapter": "best-practices-troubleshooting",
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
           "type": "inlineCode",
           "value": "docker ps"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Lists running containers only."
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
           "value": "EXPOSE"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Does not publish a port."
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
           "value": "latest"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "A tag, not the newest version."
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
           "value": "Removing a container"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Does not remove named volumes."
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
           "value": "Restart after crash"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Depends on the restart policy."
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
         "value": "Remember: Most \"gotchas\" are defaults that do less than people assume."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-image-vs-container-2",
   "num": null,
   "title": "Image vs Container",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The same template-vs-instance idea: one "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "image"
        }
       ]
      },
      {
       "type": "text",
       "value": " can spawn many "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "containers"
        }
       ]
      },
      {
       "type": "text",
       "value": ", each with its own writable layer."
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
         "value": "Remember: Build once (image), run many (containers)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-cmd-vs-entrypoint",
   "num": null,
   "title": "CMD vs ENTRYPOINT",
   "stars": 2,
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
           "type": "inlineCode",
           "value": "ENTRYPOINT"
          },
          {
           "type": "text",
           "value": " sets the fixed executable; "
          },
          {
           "type": "inlineCode",
           "value": "CMD"
          },
          {
           "type": "text",
           "value": " sets default arguments."
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
           "value": "Arguments on "
          },
          {
           "type": "inlineCode",
           "value": "docker run"
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
             "value": "override "
            },
            {
             "type": "inlineCode",
             "value": "CMD"
            }
           ]
          },
          {
           "type": "text",
           "value": " but are "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "appended to "
            },
            {
             "type": "inlineCode",
             "value": "ENTRYPOINT"
            }
           ]
          },
          {
           "type": "text",
           "value": " (exec form)."
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
           "value": "Use "
          },
          {
           "type": "inlineCode",
           "value": "ENTRYPOINT"
          },
          {
           "type": "text",
           "value": " for the program, "
          },
          {
           "type": "inlineCode",
           "value": "CMD"
          },
          {
           "type": "text",
           "value": " for its default args."
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
         "value": "Remember: ENTRYPOINT = what to run; CMD = default args you can replace."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-copy-vs-add",
   "num": null,
   "title": "COPY vs ADD",
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
           "type": "inlineCode",
           "value": "COPY"
          },
          {
           "type": "text",
           "value": " just copies files from the build context."
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
           "value": "ADD"
          },
          {
           "type": "text",
           "value": " also fetches URLs and auto-extracts local tar archives."
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
           "value": "Prefer "
          },
          {
           "type": "inlineCode",
           "value": "COPY"
          },
          {
           "type": "text",
           "value": " for ordinary copying; reach for "
          },
          {
           "type": "inlineCode",
           "value": "ADD"
          },
          {
           "type": "text",
           "value": " only when you need its extra behaviour."
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
         "value": "Remember: Default to COPY; use ADD only for tar extraction or URLs."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-volume-vs-bind-mount",
   "num": null,
   "title": "Volume vs Bind Mount",
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
             "value": "Volume"
            }
           ]
          },
          {
           "type": "text",
           "value": ": Docker-managed, portable, best for database/app data."
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
             "value": "Bind mount"
            }
           ]
          },
          {
           "type": "text",
           "value": ": tied to a specific host path, best for local development."
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
         "value": "Remember: Volume for production data, bind mount for dev files."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-docker-vs-virtual-machine",
   "num": null,
   "title": "Docker vs Virtual Machine",
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
           "value": "Containers share the host kernel and are lightweight; VMs run a full guest OS and are heavier."
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
         "value": "Remember: Container = shared kernel; VM = full guest OS."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-docker-vs-docker-compose-vs-kubernetes",
   "num": null,
   "title": "Docker vs Docker Compose vs Kubernetes",
   "stars": 1,
   "chapter": "common-why-x-vs-y-comparisons",
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
         "children": []
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Docker"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Docker Compose"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Kubernetes"
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
           "value": "Build and run containers"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Define multi-container apps"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Orchestrate across a cluster"
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
           "value": "Main unit"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Container / image"
          }
         ]
        },
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
           "value": "Pod and workload resources"
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
           "value": "Scaling"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Run more containers manually"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Scale services"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Declarative scaling / autoscaling"
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
           "value": "Self-healing"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Restart policies"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Limited"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Controllers keep desired state"
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
           "value": "Best for"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Single containers"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Local multi-container dev"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Production cluster orchestration"
          }
         ]
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
           "value": "Kubernetes does "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "not"
            }
           ]
          },
          {
           "type": "text",
           "value": " replace Docker — it orchestrates containers and can use runtimes like containerd without Docker Engine."
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
           "value": "Compose is for local multi-container setups; Kubernetes adds cluster scheduling, reconciliation and management."
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
         "value": "Remember: Docker builds and runs, Compose groups for dev, Kubernetes orchestrates in production."
        }
       ]
      }
     ]
    }
   ]
  }
 ]
};
