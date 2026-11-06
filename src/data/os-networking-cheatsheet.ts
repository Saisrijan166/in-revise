// AUTO-GENERATED from reference/os-networking.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs os-networking
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const osNetworkingCheatsheet: CheatDoc = {
 "title": "OS & Networking",
 "tagline": "OS and networks on one page — the core ideas and the rules to remember.",
 "chapters": [
  {
   "id": "os-basics-and-processes",
   "title": "OS Basics and Processes"
  },
  {
   "id": "concurrency-and-synchronization",
   "title": "Concurrency and Synchronization"
  },
  {
   "id": "memory",
   "title": "Memory"
  },
  {
   "id": "i-o-files-and-ipc",
   "title": "I/O, Files and IPC"
  },
  {
   "id": "networking-layers-and-addressing",
   "title": "Networking Layers and Addressing"
  },
  {
   "id": "tcp-and-udp",
   "title": "TCP and UDP"
  },
  {
   "id": "http-tls-and-dns",
   "title": "HTTP, TLS and DNS"
  },
  {
   "id": "networks-in-system-design",
   "title": "Networks in System Design"
  },
  {
   "id": "common-why-x-vs-y-comparisons",
   "title": "Common \"Why X vs Y?\" Comparisons"
  }
 ],
 "sections": [
  {
   "id": "s-process",
   "num": null,
   "title": "Process",
   "stars": 2,
   "chapter": "os-basics-and-processes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A process is a running program: the code from disk, now loaded and executing. "
      },
      {
       "type": "inlineCode",
       "value": "java MyApp"
      },
      {
       "type": "text",
       "value": " makes the OS create one process for that app."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Each process gets its own:"
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
           "value": "Virtual address space (memory)"
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
           "value": "File descriptors and OS resources"
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
           "value": "One or more threads"
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
             "value": "Program"
            }
           ]
          },
          {
           "type": "text",
           "value": " = code sitting on disk. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Process"
            }
           ]
          },
          {
           "type": "text",
           "value": " = that program currently running."
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
           "value": "Processes are isolated: process A cannot read process B's memory, so one crashing app cannot corrupt another."
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
         "value": "Remember: a process is an instance of a program in execution, with its own address space and OS-managed resources. In backend terms, a service is one or more processes."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-thread",
   "num": null,
   "title": "Thread",
   "stars": 3,
   "chapter": "os-basics-and-processes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A thread is a unit of execution inside a process. One process can run many threads at once."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Threads in the same process "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "share"
        }
       ]
      },
      {
       "type": "text",
       "value": " heap, code and open files, but each has its "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "own"
        }
       ]
      },
      {
       "type": "text",
       "value": " stack, program counter and registers."
      }
     ]
    },
    {
     "type": "code",
     "value": "Process\n ├── Thread 1 → Request A\n ├── Thread 2 → Request B\n └── Thread 3 → Request C",
     "lang": "text"
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
           "value": "A web server handles concurrent requests by giving each one a thread."
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
           "value": "Threads are cheaper than processes because they share memory instead of copying it."
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
         "value": "Remember: process = container of execution; thread = execution path inside it. Threads are why one server handles many requests at once."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-concurrency-vs-parallelism",
   "num": null,
   "title": "Concurrency vs Parallelism",
   "stars": 2,
   "chapter": "os-basics-and-processes",
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
             "value": "Concurrency"
            }
           ]
          },
          {
           "type": "text",
           "value": " = multiple tasks in progress over overlapping periods. One CPU core can switch between tasks (work on A, A waits on DB, run B, back to A)."
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
             "value": "Parallelism"
            }
           ]
          },
          {
           "type": "text",
           "value": " = multiple tasks running at the "
          },
          {
           "type": "emphasis",
           "children": [
            {
             "type": "text",
             "value": "same instant"
            }
           ]
          },
          {
           "type": "text",
           "value": ". Needs multiple cores."
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
         "value": "Remember: concurrency = dealing with many things at once; parallelism = doing many things at the same instant. You can have concurrency on a single core; parallelism needs several."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-cpu-scheduling",
   "num": null,
   "title": "CPU Scheduling",
   "stars": 0,
   "chapter": "os-basics-and-processes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The OS decides which thread runs next on a core. Common policies:"
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
           "value": "Policy"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Idea"
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
           "value": "FCFS"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "First come, first served"
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
           "value": "SJF / SRTF"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Shortest job (or remaining time) first"
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
           "value": "Priority"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Higher-priority tasks first"
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
           "value": "Round Robin"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Each task gets a fixed time slice, then rotates"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Preemptive"
            }
           ]
          },
          {
           "type": "text",
           "value": " scheduling can pause a running task; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "non-preemptive"
            }
           ]
          },
          {
           "type": "text",
           "value": " lets it finish."
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
             "value": "Starvation"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a low-priority task never runs. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Aging"
            }
           ]
          },
          {
           "type": "text",
           "value": " fixes it by slowly raising a waiting task's priority."
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
         "value": "Remember: Round Robin + time slices is the model behind fair request handling and why no single request can hog the CPU forever."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-context-switching",
   "num": null,
   "title": "Context Switching",
   "stars": 2,
   "chapter": "os-basics-and-processes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "When the CPU switches from thread A to thread B, it must save A's state (registers, program counter, stack info) and restore B's. That save-and-restore is a context switch, and it has overhead."
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
           "value": "Too many threads means too much switching, which wastes CPU on bookkeeping instead of work."
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
           "value": "This overhead is a main reason servers use a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "thread pool"
            }
           ]
          },
          {
           "type": "text",
           "value": " instead of one thread per request."
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
         "value": "Remember: context switches are not free. Thousands of threads can spend more time switching than working."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-thread-pool",
   "num": null,
   "title": "Thread Pool",
   "stars": 2,
   "chapter": "os-basics-and-processes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Instead of creating and destroying a thread per request, keep a fixed set of reusable threads. A request borrows a thread, runs, then returns it to the pool."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Benefits:"
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
           "value": "Reuse (no repeated create/destroy cost)"
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
             "value": "Bounded concurrency"
            }
           ]
          },
          {
           "type": "text",
           "value": " (a cap on how many run at once)"
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
           "value": "Predictable memory and CPU use"
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
           "value": "Having 100 threads on 10 cores does not mean 100 run at once; the OS schedules them."
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
           "value": "Pool size directly sets max concurrent requests, CPU use, memory and throughput."
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
         "value": "Remember: a thread pool trades unlimited threads for a controlled, reusable set. Unbounded thread creation is dangerous."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-system-calls-and-user-vs-kernel-mode",
   "num": null,
   "title": "System Calls and User vs Kernel Mode",
   "stars": 3,
   "chapter": "os-basics-and-processes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Apps cannot directly touch hardware, files, memory or the network. They ask the OS kernel through a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "system call"
        }
       ]
      },
      {
       "type": "text",
       "value": " ("
      },
      {
       "type": "inlineCode",
       "value": "open"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "read"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "write"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "close"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "fork"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "exec"
      },
      {
       "type": "text",
       "value": ")."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "CPUs run code in two privilege levels:"
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
             "value": "User mode"
            }
           ]
          },
          {
           "type": "text",
           "value": " — normal application code, restricted."
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
             "value": "Kernel mode"
            }
           ]
          },
          {
           "type": "text",
           "value": " — OS code with privileged hardware access."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "Java code → JVM → system call → kernel mode → filesystem / device",
     "lang": "text"
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
           "value": "A system call triggers a controlled switch from user mode to kernel mode and back."
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
           "value": "This boundary is what gives the OS protection and isolation."
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
         "value": "Remember: a system call is the controlled doorway from an application into the kernel; the mode switch is what keeps apps from freely controlling hardware."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-race-condition",
   "num": null,
   "title": "Race Condition",
   "stars": 3,
   "chapter": "concurrency-and-synchronization",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A race condition happens when the result depends on the "
      },
      {
       "type": "emphasis",
       "children": [
        {
         "type": "text",
         "value": "timing/order"
        }
       ]
      },
      {
       "type": "text",
       "value": " of concurrent operations on shared state."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "counter++"
      },
      {
       "type": "text",
       "value": " looks atomic but is really read → add → write:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Thread A reads 0\nThread B reads 0\nThread A writes 1\nThread B writes 1   // expected 2, got 1",
     "lang": "text"
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
           "value": "Dangerous because it is intermittent and hard to reproduce."
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
           "value": "Real example: two users buy the last ticket ("
          },
          {
           "type": "inlineCode",
           "value": "remaining = 1"
          },
          {
           "type": "text",
           "value": "); both read 1, both succeed, you oversell."
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
         "value": "Remember: shared mutable state + concurrency without coordination = race condition."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-mutex-lock",
   "num": null,
   "title": "Mutex / Lock",
   "stars": 2,
   "chapter": "concurrency-and-synchronization",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A mutex gives "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "mutual exclusion"
        }
       ]
      },
      {
       "type": "text",
       "value": ": only one thread at a time may enter a protected critical section."
      }
     ]
    },
    {
     "type": "code",
     "value": "acquire lock → counter++ → release lock   // others wait",
     "lang": "text"
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
           "value": "Protects shared in-memory state, counters and critical sections."
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
           "value": "A language-level mutex only protects memory inside "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "one process"
            }
           ]
          },
          {
           "type": "text",
           "value": ". It does not coordinate across servers; distributed systems need a distributed lock for that."
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
         "value": "Remember: mutex = one at a time. It is per-process, not per-cluster."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-semaphore",
   "num": null,
   "title": "Semaphore",
   "stars": 2,
   "chapter": "concurrency-and-synchronization",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A semaphore holds "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "N permits"
        }
       ]
      },
      {
       "type": "text",
       "value": " and limits how many threads use a resource at once. Each user takes a permit; when none are left, the next waits; finishing returns a permit."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Example: a DB connection pool of 10 = 10 permits."
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
         "children": []
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Allows"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Use"
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
           "value": "Mutex"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "1 at a time"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Protect one critical section"
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
           "value": "Semaphore"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "up to N at a time"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Limit concurrency / resource count"
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
         "value": "Remember: mutex protects "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "one"
          }
         ]
        },
        {
         "type": "text",
         "value": " thing; a semaphore caps "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "how many"
          }
         ]
        },
        {
         "type": "text",
         "value": " at once (e.g. \"max 100 concurrent calls to this API\")."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-deadlock",
   "num": null,
   "title": "Deadlock",
   "stars": 2,
   "chapter": "concurrency-and-synchronization",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Deadlock = threads wait on each other forever. A holds lock 1 and wants lock 2; B holds lock 2 and wants lock 1. Neither moves."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Four conditions, "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "all"
        }
       ]
      },
      {
       "type": "text",
       "value": " required for deadlock:"
      }
     ]
    },
    {
     "type": "list",
     "ordered": true,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Mutual exclusion"
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
           "value": "Hold and wait"
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
           "value": "No preemption"
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
           "value": "Circular wait"
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
           "value": "Break any one condition and deadlock cannot occur."
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
           "value": "Common fixes: consistent "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "lock ordering"
            }
           ]
          },
          {
           "type": "text",
           "value": ", timeouts, lease expiration, deadlock detection."
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
         "value": "Remember: deadlock needs all four conditions; prevention usually means imposing a global lock order or adding timeouts."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-stack-vs-heap",
   "num": null,
   "title": "Stack vs Heap",
   "stars": 2,
   "chapter": "memory",
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
             "value": "Stack"
            }
           ]
          },
          {
           "type": "text",
           "value": " — per thread. Holds method call frames, local variables, execution state."
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
             "value": "Heap"
            }
           ]
          },
          {
           "type": "text",
           "value": " — shared across threads in the process. Holds objects (in Java, almost everything "
          },
          {
           "type": "inlineCode",
           "value": "new"
          },
          {
           "type": "text",
           "value": ")."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "Thread → Stack: methodA(), methodB(), methodC()\nProcess/JVM → Heap: Object A, Object B, Object C",
     "lang": "text"
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
           "value": "Millions of objects grow the heap; thousands of threads each need stack memory. Both limit scalability."
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
           "value": "JVM heap is "
          },
          {
           "type": "emphasis",
           "children": [
            {
             "type": "text",
             "value": "not"
            }
           ]
          },
          {
           "type": "text",
           "value": " the same as OS heap; the JVM manages its own region."
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
         "value": "Remember: stack = per-thread execution; heap = shared object memory."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-virtual-memory",
   "num": null,
   "title": "Virtual Memory",
   "stars": 3,
   "chapter": "memory",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Each process sees its own large, continuous "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "virtual address space"
        }
       ]
      },
      {
       "type": "text",
       "value": ". The OS/MMU translates virtual addresses to physical RAM."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Why it exists:"
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
             "value": "Isolation"
            }
           ]
          },
          {
           "type": "text",
           "value": " — a process can't reach another's memory."
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
             "value": "Abstraction"
            }
           ]
          },
          {
           "type": "text",
           "value": " — programs don't deal with real RAM locations."
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
             "value": "Flexibility"
            }
           ]
          },
          {
           "type": "text",
           "value": " — the OS maps and moves memory in pages."
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
         "value": "Remember: virtual memory gives each process the illusion of its own private, continuous memory; the OS maps it to real RAM behind the scenes."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-paging-page-table-and-tlb",
   "num": null,
   "title": "Paging, Page Table and TLB",
   "stars": 2,
   "chapter": "memory",
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
           "value": "Virtual memory is split into fixed-size "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "pages"
            }
           ]
          },
          {
           "type": "text",
           "value": "; physical memory into "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "frames"
            }
           ]
          },
          {
           "type": "text",
           "value": ". The OS maps page → frame (they need not be adjacent)."
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
           "value": "The "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "page table"
            }
           ]
          },
          {
           "type": "text",
           "value": " stores those mappings."
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
           "value": "Walking the page table every access is slow, so the CPU caches recent translations in the "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "TLB"
            }
           ]
          },
          {
           "type": "text",
           "value": " (Translation Lookaside Buffer)."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "Virtual address → TLB → hit? physical address\n                     → miss → page table → physical address",
     "lang": "text"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: page table = the full mapping; TLB = a fast cache of recent mappings."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-page-fault",
   "num": null,
   "title": "Page Fault",
   "stars": 2,
   "chapter": "memory",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A page fault happens when a process accesses a page not currently in RAM. The OS loads it from storage, then execution continues."
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
           "value": "A page fault is a normal memory-management event, "
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
           "value": " a crash."
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
           "value": "Many page faults (and heavy swapping) are expensive and slow — this is "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "thrashing"
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
         "value": "Remember: a page fault means \"page not in RAM, fetch it\"; it's routine, but a flood of them kills performance."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-blocking-vs-non-blocking-i-o",
   "num": null,
   "title": "Blocking vs Non-blocking I/O",
   "stars": 3,
   "chapter": "i-o-files-and-ipc",
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
             "value": "Blocking I/O"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the thread issues a read and waits until data arrives. Simple, but one thread is tied up per in-flight request. 10,000 requests → 10,000 threads."
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
             "value": "Non-blocking I/O"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the thread starts I/O and continues other work; it handles the result when ready. Fewer threads can serve many connections."
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
         "children": []
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Blocking"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Non-blocking"
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
           "value": "Thread while waiting"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "parked"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "free to work"
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
           "value": "Model"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "simple (thread per request)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "event loop, more complex"
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
           "value": "Concurrency"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "limited by threads"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "high"
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
         "value": "Remember: blocking = thread-per-request; non-blocking (event loop) = few threads, high concurrency. This is the Node.js / Nginx model."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-ipc-inter-process-communication",
   "num": null,
   "title": "IPC — Inter-Process Communication",
   "stars": 0,
   "chapter": "i-o-files-and-ipc",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Threads share memory directly. Processes are isolated, so they need IPC to talk. Mechanisms:"
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
           "value": "Pipes and named pipes"
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
           "value": "Message queues"
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
           "value": "Shared memory"
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
           "value": "Signals"
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
             "value": "Sockets"
            }
           ]
          },
          {
           "type": "text",
           "value": " (also work across machines)"
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
         "value": "Remember: threads → shared memory; processes → need IPC. Microservices are separate processes, so they communicate over sockets / HTTP / gRPC / message queues."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-files-and-file-descriptors",
   "num": null,
   "title": "Files and File Descriptors",
   "stars": 0,
   "chapter": "i-o-files-and-ipc",
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
             "value": "file descriptor"
            }
           ]
          },
          {
           "type": "text",
           "value": " is a small integer handle the OS gives an app for an open file, socket or pipe."
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
           "value": "Sockets and network connections are also file descriptors, so running out of them limits how many connections a server can hold."
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
           "value": "Useful file-system terms: inode (file metadata), hard link vs symbolic link, permissions, journaling, page/buffer cache."
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
         "value": "Remember: to the OS, open files and network connections are both file descriptors; the FD limit caps a server's concurrent connections."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-osi-and-tcp-ip-models",
   "num": null,
   "title": "OSI and TCP/IP Models",
   "stars": 3,
   "chapter": "networking-layers-and-addressing",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The OSI model is a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "7-layer conceptual"
        }
       ]
      },
      {
       "type": "text",
       "value": " model. The TCP/IP model is the "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "practical 4-layer"
        }
       ]
      },
      {
       "type": "text",
       "value": " Internet stack. Don't ask which is \"real\" — OSI is for reasoning/teaching, TCP/IP is what the Internet actually uses."
      }
     ]
    },
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
           "value": "OSI (7)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Role / question"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Examples"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "TCP/IP (4)"
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
           "value": "7 Application"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "What protocol?"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "HTTP, DNS, SMTP, SSH"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Application"
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
           "value": "6 Presentation"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "How is data represented?"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "JSON, TLS, UTF-8"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Application"
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
           "value": "5 Session"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Manage sessions"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": []
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Application"
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
           "value": "4 Transport"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "How do endpoints talk?"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "TCP, UDP"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Transport"
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
           "value": "3 Network"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Where should packets go?"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "IP, routing"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Internet"
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
           "value": "2 Data Link"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Local-link delivery"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Ethernet, Wi-Fi, MAC"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Network Access"
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
           "value": "1 Physical"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Transmit bits"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "cables, radio, fiber"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Network Access"
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
       "value": "Mapping: OSI 7+6+5 → Application; 4 → Transport; 3 → Internet; 2+1 → Network Access."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Mnemonic (top→bottom): "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "A"
        }
       ]
      },
      {
       "type": "text",
       "value": "ll "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "P"
        }
       ]
      },
      {
       "type": "text",
       "value": "eople "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "S"
        }
       ]
      },
      {
       "type": "text",
       "value": "eem "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "T"
        }
       ]
      },
      {
       "type": "text",
       "value": "o "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "N"
        }
       ]
      },
      {
       "type": "text",
       "value": "eed "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "D"
        }
       ]
      },
      {
       "type": "text",
       "value": "ata "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "P"
        }
       ]
      },
      {
       "type": "text",
       "value": "rocessing."
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
           "value": "In modern stacks, Presentation and Session aren't separate components; application libraries/protocols (JSON, TLS) handle them."
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
             "value": "DNS lives at the Application layer"
            }
           ]
          },
          {
           "type": "text",
           "value": " even though it returns an IP — don't call it Layer 3."
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
             "value": "TLS"
            }
           ]
          },
          {
           "type": "text",
           "value": " doesn't map cleanly; practically it sits between application and transport ("
          },
          {
           "type": "inlineCode",
           "value": "HTTP → TLS → TCP → IP"
          },
          {
           "type": "text",
           "value": ")."
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
         "value": "Remember: HTTP (app) → TCP/UDP (transport) → IP (network) → Ethernet/Wi-Fi (link) → bits. That one stack answers most layer questions."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-encapsulation-and-pdu-names",
   "num": null,
   "title": "Encapsulation and PDU Names",
   "stars": 2,
   "chapter": "networking-layers-and-addressing",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "As data goes "
      },
      {
       "type": "emphasis",
       "children": [
        {
         "type": "text",
         "value": "down"
        }
       ]
      },
      {
       "type": "text",
       "value": " the stack on the sender, each layer wraps it with its own header ("
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "encapsulation"
        }
       ]
      },
      {
       "type": "text",
       "value": "); the receiver strips them going up ("
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "decapsulation"
        }
       ]
      },
      {
       "type": "text",
       "value": ")."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Each layer's data unit has a name:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Application → Data\nTransport   → Segment (TCP) / Datagram (UDP)\nNetwork     → Packet\nData Link   → Frame\nPhysical    → Bits",
     "lang": "text"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Data → Segment → Packet → Frame → Bits. Sending adds headers; receiving removes them."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-ip-addressing-public-vs-private-nat",
   "num": null,
   "title": "IP Addressing, Public vs Private, NAT",
   "stars": 0,
   "chapter": "networking-layers-and-addressing",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "An "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "IP address"
        }
       ]
      },
      {
       "type": "text",
       "value": " identifies a network interface. IPv4 ("
      },
      {
       "type": "inlineCode",
       "value": "192.168.1.10"
      },
      {
       "type": "text",
       "value": ") is small; IPv6 ("
      },
      {
       "type": "inlineCode",
       "value": "2001:db8::1"
      },
      {
       "type": "text",
       "value": ") is huge."
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
             "value": "Private"
            }
           ]
          },
          {
           "type": "text",
           "value": " ranges stay inside local networks: "
          },
          {
           "type": "inlineCode",
           "value": "10.x.x.x"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "172.16–31.x.x"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "192.168.x.x"
          },
          {
           "type": "text",
           "value": ". "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Public"
            }
           ]
          },
          {
           "type": "text",
           "value": " IPs are routable on the Internet."
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
             "value": "NAT"
            }
           ]
          },
          {
           "type": "text",
           "value": " (Network Address Translation) lets many private devices share one public IP via the router."
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
         "value": "Remember: private IPs aren't reachable from the Internet; NAT maps them onto a shared public IP."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-subnet-and-cidr",
   "num": null,
   "title": "Subnet and CIDR",
   "stars": 0,
   "chapter": "networking-layers-and-addressing",
   "nodes": [
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
         "value": "subnet"
        }
       ]
      },
      {
       "type": "text",
       "value": " is a logical subdivision of an IP network. "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "CIDR"
        }
       ]
      },
      {
       "type": "text",
       "value": " notation like "
      },
      {
       "type": "inlineCode",
       "value": "10.0.0.0/24"
      },
      {
       "type": "text",
       "value": " says how many leading bits are the network prefix (here 24 bits = network, remaining 8 = hosts)."
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
         "value": "/24"
        },
        {
         "type": "text",
         "value": " = 24 network bits. Cloud VPCs use public/private subnets — load balancer in a public subnet, app servers and DB in private subnets."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-ports-and-sockets",
   "num": null,
   "title": "Ports and Sockets",
   "stars": 2,
   "chapter": "networking-layers-and-addressing",
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
           "value": "An "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "IP"
            }
           ]
          },
          {
           "type": "text",
           "value": " identifies the host; a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "port"
            }
           ]
          },
          {
           "type": "text",
           "value": " identifies a service on that host. Together "
          },
          {
           "type": "inlineCode",
           "value": "IP:port"
          },
          {
           "type": "text",
           "value": " is an endpoint ("
          },
          {
           "type": "inlineCode",
           "value": "192.168.1.10:8080"
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
           "type": "text",
           "value": "A "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "socket"
            }
           ]
          },
          {
           "type": "text",
           "value": " is the OS abstraction for a network endpoint. A TCP connection is identified by the 4-tuple: client IP:port ↔ server IP:port."
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
       "value": "Common ports: HTTP 80, HTTPS 443, SSH 22, DNS 53."
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
         "value": "Remember: a server listens on "
        },
        {
         "type": "inlineCode",
         "value": "0.0.0.0:8080"
        },
        {
         "type": "text",
         "value": "; each accepted connection is a socket identified by both endpoints."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-switch-router-hub-firewall",
   "num": null,
   "title": "Switch, Router, Hub, Firewall",
   "stars": 0,
   "chapter": "networking-layers-and-addressing",
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
           "value": "Device"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Layer"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Uses"
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
           "value": "Hub"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "L1"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "repeats/broadcasts signals to all ports (obsolete)"
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
           "value": "Switch"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "L2"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "forwards frames by MAC address within a local network"
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
           "value": "Router"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "L3"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "routes packets by IP between networks"
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
           "value": "Firewall"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "L3/L4 or L7"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "L3/L4: IP/port/protocol rules; L7 (WAF): HTTP rules"
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
         "value": "Remember: switch = MAC, local; router = IP, between networks; WAF = HTTP-aware firewall."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-tcp-vs-udp",
   "num": null,
   "title": "TCP vs UDP",
   "stars": 3,
   "chapter": "tcp-and-udp",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Both are Transport-layer protocols."
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
         "children": []
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "TCP"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "UDP"
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
           "value": "Connection"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "connection-oriented"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "connectionless"
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
           "value": "Delivery"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "reliable byte stream"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "datagrams, no guarantee"
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
           "value": "Order"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "ordered"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "no ordering"
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
           "value": "Lost data"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "retransmits"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "no retransmission"
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
           "value": "Control"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "flow + congestion control"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "none built in"
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
           "value": "Overhead"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "higher"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "low, faster"
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
       "value": "Use: HTTP/HTTPS → TCP; DNS → usually UDP; WebRTC/streaming → often UDP."
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
         "value": "Remember: TCP = reliability and order (at a cost); UDP = simple, low-overhead, app decides what guarantees it needs."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-tcp-3-way-handshake",
   "num": null,
   "title": "TCP 3-Way Handshake",
   "stars": 3,
   "chapter": "tcp-and-udp",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Before data flows, both sides establish a connection and synchronize sequence numbers:"
      }
     ]
    },
    {
     "type": "code",
     "value": "Client → SYN ───────→ Server\nClient ←─ SYN-ACK ──  Server\nClient → ACK ───────→ Server   // established",
     "lang": "text"
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
             "value": "SYN"
            }
           ]
          },
          {
           "type": "text",
           "value": ": I want to connect. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "SYN-ACK"
            }
           ]
          },
          {
           "type": "text",
           "value": ": got you, I'm ready too. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "ACK"
            }
           ]
          },
          {
           "type": "text",
           "value": ": got your reply."
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
           "value": "Why three steps (not two)? Both sides must confirm they can send "
          },
          {
           "type": "emphasis",
           "children": [
            {
             "type": "text",
             "value": "and"
            }
           ]
          },
          {
           "type": "text",
           "value": " receive, and agree on starting sequence numbers."
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
         "value": "Remember: SYN, SYN-ACK, ACK establishes the connection and syncs sequence numbers both ways."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-tcp-reliability",
   "num": null,
   "title": "TCP Reliability",
   "stars": 2,
   "chapter": "tcp-and-udp",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "If a packet is lost, TCP detects it and retransmits, using:"
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
             "value": "Sequence numbers"
            }
           ]
          },
          {
           "type": "text",
           "value": " (order and detect gaps)"
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
             "value": "ACKs"
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
             "value": "duplicate ACKs"
            }
           ]
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
             "value": "Timeouts"
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
             "value": "retransmission"
            }
           ]
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
             "value": "Sliding window"
            }
           ]
          },
          {
           "type": "text",
           "value": " (how much can be in flight)"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "1 received, 2 LOST, 3 received → TCP sees the gap → retransmit 2",
     "lang": "text"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: sequence numbers + ACKs + timeouts give TCP its reliable, ordered byte stream."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-flow-control-vs-congestion-control",
   "num": null,
   "title": "Flow Control vs Congestion Control",
   "stars": 3,
   "chapter": "tcp-and-udp",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A classic interview pair."
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
             "value": "Flow control"
            }
           ]
          },
          {
           "type": "text",
           "value": " protects the "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "receiver"
            }
           ]
          },
          {
           "type": "text",
           "value": " — don't send faster than it can accept. TCP uses the "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "receive window"
            }
           ]
          },
          {
           "type": "text",
           "value": " to signal capacity."
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
             "value": "Congestion control"
            }
           ]
          },
          {
           "type": "text",
           "value": " protects the "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "network"
            }
           ]
          },
          {
           "type": "text",
           "value": " — don't overload routers between the hosts. TCP ramps its sending rate up and down."
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
         "value": "Remember: flow = receiver; congestion = network. Same goal (don't overwhelm), different target."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-http",
   "num": null,
   "title": "HTTP",
   "stars": 3,
   "chapter": "http-tls-and-dns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "HTTP is the application-layer request/response protocol between clients and servers. A request has a method, URL, headers and optional body; a response has a status code, headers and body."
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
         "value": "Methods and properties:"
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
           "value": "Method"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Does"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Safe"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Idempotent"
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
           "value": "GET"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "read"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "yes"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "yes"
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
           "value": "POST"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "create/process"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "no"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "no"
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
           "value": "PUT"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "replace resource"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "no"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "yes"
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
           "value": "PATCH"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "partial update"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "no"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "not necessarily"
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
           "value": "DELETE"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "remove"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "no"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "yes"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Safe"
            }
           ]
          },
          {
           "type": "text",
           "value": " = no server state change. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Idempotent"
            }
           ]
          },
          {
           "type": "text",
           "value": " = same final state no matter how many identical calls."
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
             "value": "PUT vs PATCH"
            }
           ]
          },
          {
           "type": "text",
           "value": ": PUT replaces the whole representation; PATCH changes part of it."
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
         "value": "Remember: GET is safe and idempotent; PUT/DELETE are idempotent; POST is neither — which is why POST retries risk duplicates."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-http-status-codes",
   "num": null,
   "title": "HTTP Status Codes",
   "stars": 2,
   "chapter": "http-tls-and-dns",
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
           "value": "Class"
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
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Common"
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
           "value": "2xx"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "success"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "200 OK, 201 Created, 204 No Content"
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
           "value": "3xx"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "redirect"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "301, 302, 304 Not Modified"
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
           "value": "4xx"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "client error"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "400, 401, 403, 404, 409 Conflict, 429 Too Many Requests"
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
           "value": "5xx"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "server error"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "500, 502 Bad Gateway, 503 Unavailable, 504 Gateway Timeout"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "401 vs 403"
            }
           ]
          },
          {
           "type": "text",
           "value": ": 401 = not authenticated (who are you?); 403 = authenticated but not allowed (you can't do this)."
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
         "value": "Remember: 4xx = caller's fault, 5xx = server's fault; 401 is \"log in\", 403 is \"you're known but forbidden\"."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-http-1-1-vs-http-2-vs-http-3",
   "num": null,
   "title": "HTTP/1.1 vs HTTP/2 vs HTTP/3",
   "stars": 3,
   "chapter": "http-tls-and-dns",
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
           "value": "Version"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Transport"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Key traits"
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
           "value": "HTTP/1.1"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "TCP"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "persistent/keep-alive connections; limited multiplexing, head-of-line blocking at request level"
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
           "value": "HTTP/2"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "TCP"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "binary framing, multiplexing many streams on one connection, header compression"
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
           "value": "HTTP/3"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "QUIC over UDP"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "faster setup, avoids TCP connection-level head-of-line blocking under loss"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "HTTP/1.1 → TCP\nHTTP/2   → TCP\nHTTP/3   → QUIC → UDP",
     "lang": "text"
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
           "value": "HTTP/2 multiplexes streams A/B/C/D over a single connection, cutting connection overhead."
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
           "value": "HTTP/3's QUIC runs reliability/security itself over UDP, so a lost packet on one stream doesn't stall the others."
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
         "value": "Remember: /1.1 and /2 ride TCP; /3 rides QUIC/UDP. /2 adds multiplexing; /3 removes TCP's head-of-line blocking."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-https-tls",
   "num": null,
   "title": "HTTPS / TLS",
   "stars": 3,
   "chapter": "http-tls-and-dns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "HTTP alone is unencrypted. "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "HTTPS = HTTP + TLS"
        }
       ]
      },
      {
       "type": "text",
       "value": ". TLS provides confidentiality, integrity and server authentication via certificates."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "How it works at a glance:"
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
           "value": "The server presents a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "certificate"
            }
           ]
          },
          {
           "type": "text",
           "value": " (its public-key identity), validated through a trusted certificate chain (a CA)."
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
           "value": "A handshake uses "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "asymmetric"
            }
           ]
          },
          {
           "type": "text",
           "value": " cryptography to authenticate and agree on session keys."
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
           "value": "Bulk data then uses fast "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "symmetric"
            }
           ]
          },
          {
           "type": "text",
           "value": " encryption."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "HTTP → TLS → TCP → IP",
     "lang": "text"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: asymmetric crypto establishes trust and keys; symmetric crypto encrypts the actual data efficiently."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-dns",
   "num": null,
   "title": "DNS",
   "stars": 3,
   "chapter": "http-tls-and-dns",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "DNS translates a domain name into an IP address. It's an Application-layer protocol, usually over UDP, and relies heavily on caching (TTL)."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Resolution walks a hierarchy: root → TLD ("
      },
      {
       "type": "inlineCode",
       "value": ".com"
      },
      {
       "type": "text",
       "value": ") → authoritative server for the domain. A "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "recursive resolver"
        }
       ]
      },
      {
       "type": "text",
       "value": " does this on your behalf."
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
         "value": "Records:"
        }
       ]
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
           "value": "Record"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Maps to"
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
           "value": "A"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "IPv4 address"
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
           "value": "AAAA"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "IPv6 address"
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
           "value": "CNAME"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "alias to another domain"
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
           "value": "MX"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "mail server"
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
           "value": "TXT"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "text/verification/policy"
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
           "value": "NS"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "name server"
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
         "value": "Remember: domain → DNS → IP. TTL controls caching, and DNS is also used for routing, failover and geographic traffic steering."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-load-balancer-l4-vs-l7",
   "num": null,
   "title": "Load Balancer (L4 vs L7)",
   "stars": 3,
   "chapter": "networks-in-system-design",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A load balancer spreads incoming traffic across backend servers so you can "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "scale horizontally"
        }
       ]
      },
      {
       "type": "text",
       "value": " (many servers instead of one giant one) and stay available."
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
         "children": []
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "L4 load balancer"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "L7 load balancer"
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
           "value": "Sees"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "IP, port, TCP/UDP"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "HTTP: host, path, headers, cookies"
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
           "value": "Routes by"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "transport info"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "application content ("
          },
          {
           "type": "inlineCode",
           "value": "/api/*"
          },
          {
           "type": "text",
           "value": " → API servers)"
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
       "value": "Algorithms: round robin, least connections, weighted, sticky sessions. Health checks remove unhealthy servers."
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
         "value": "Remember: L4 routes on IP/port; L7 understands HTTP and can route by path/host. Load balancing = horizontal scaling."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-reverse-proxy",
   "num": null,
   "title": "Reverse Proxy",
   "stars": 0,
   "chapter": "networks-in-system-design",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A reverse proxy sits in front of backend servers; clients talk to it, not the servers directly. It can do routing, "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "TLS termination"
        }
       ]
      },
      {
       "type": "text",
       "value": ", load balancing, caching, compression, and access control. Examples: Nginx, HAProxy."
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
         "value": "Remember: a load balancer's job is to distribute traffic; a reverse proxy is the broader intermediary that "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "can also"
          }
         ]
        },
        {
         "type": "text",
         "value": " load balance. Every LB is proxy-like; a reverse proxy does more."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-cache-and-cdn",
   "num": null,
   "title": "Cache and CDN",
   "stars": 3,
   "chapter": "networks-in-system-design",
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
             "value": "cache"
            }
           ]
          },
          {
           "type": "text",
           "value": " keeps frequently used data close to where it's needed (memory is far faster than a database). On a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "hit"
            }
           ]
          },
          {
           "type": "text",
           "value": ", return from cache; on a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "miss"
            }
           ]
          },
          {
           "type": "text",
           "value": ", read the DB, populate the cache, return. Redis is a common distributed cache."
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
             "value": "CDN"
            }
           ]
          },
          {
           "type": "text",
           "value": " is geographically distributed edge servers that cache static content (images, CSS, JS, video) near users to cut latency and offload the origin. Miss → fetch from origin."
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
           "value": "The hard part is "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "cache invalidation"
            }
           ]
          },
          {
           "type": "text",
           "value": ": stale cache vs updated DB. Strategies: TTL, explicit invalidation, write-through / write-back."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "Client → CDN → Load Balancer → App → Redis → Database",
     "lang": "text"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: caching cuts latency and DB load; the recurring problem is keeping cached data from going stale."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-connection-pooling",
   "num": null,
   "title": "Connection Pooling",
   "stars": 2,
   "chapter": "networks-in-system-design",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Opening a new DB/network connection per request is expensive. A "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "connection pool"
        }
       ]
      },
      {
       "type": "text",
       "value": " keeps a set of open connections; a request borrows one, uses it, returns it."
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
           "value": "Pool size is also a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "limit"
            }
           ]
          },
          {
           "type": "text",
           "value": ": too many connections can overwhelm the database."
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
           "value": "So pooling is both a performance win and resource protection."
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
         "value": "Remember: reuse connections instead of recreating them, and cap the pool so you don't exhaust the DB."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-real-time-websocket-polling-sse",
   "num": null,
   "title": "Real-time: WebSocket, Polling, SSE",
   "stars": 0,
   "chapter": "networks-in-system-design",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Plain HTTP is request/response (client must ask). For server-pushed / real-time data:"
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
           "value": "Technique"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Direction"
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
           "value": "Short polling"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "client repeatedly asks"
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
           "value": "Long polling"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "server holds the request until data exists"
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
           "value": "SSE"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "server → client streaming (one-way)"
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
           "value": "WebSocket"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "full-duplex, persistent, both directions"
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
         "value": "Remember: WebSocket is persistent and bidirectional (chat, multiplayer, live dashboards); SSE is one-way server push; polling is the fallback when you only have HTTP."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-latency-vs-bandwidth-vs-throughput",
   "num": null,
   "title": "Latency vs Bandwidth vs Throughput",
   "stars": 3,
   "chapter": "networks-in-system-design",
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
             "value": "Latency"
            }
           ]
          },
          {
           "type": "text",
           "value": " — how long one operation takes (e.g. 100 ms round trip). Sources: distance, DNS, TLS handshake, queueing, processing, DB, disk."
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
             "value": "Bandwidth"
            }
           ]
          },
          {
           "type": "text",
           "value": " — maximum capacity of the channel (e.g. 1 Gbps)."
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
             "value": "Throughput"
            }
           ]
          },
          {
           "type": "text",
           "value": " — how much work is "
          },
          {
           "type": "emphasis",
           "children": [
            {
             "type": "text",
             "value": "actually"
            }
           ]
          },
          {
           "type": "text",
           "value": " processed per unit time."
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
         "value": "Remember: latency = how long; bandwidth = how much capacity; throughput = how much actually gets through. Chained service calls "
        },
        {
         "type": "emphasis",
         "children": [
          {
           "type": "text",
           "value": "add up"
          }
         ]
        },
        {
         "type": "text",
         "value": " latency."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-network-failures-timeout-retry-backoff-idempotency",
   "num": null,
   "title": "Network Failures: Timeout, Retry, Backoff, Idempotency",
   "stars": 3,
   "chapter": "networks-in-system-design",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Assume any network call can be slow, lost, or duplicated. Patterns that handle this:"
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
             "value": "Timeout"
            }
           ]
          },
          {
           "type": "text",
           "value": " — wait only so long, then give up, so a stuck dependency doesn't exhaust your threads."
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
             "value": "Retry"
            }
           ]
          },
          {
           "type": "text",
           "value": " — recover from transient failures — but blind retries can amplify an outage, so use "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "exponential backoff + jitter + retry limits"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Idempotency"
            }
           ]
          },
          {
           "type": "text",
           "value": " — a retried request must not perform the action twice. Client sends an "
          },
          {
           "type": "inlineCode",
           "value": "Idempotency-Key"
          },
          {
           "type": "text",
           "value": "; the server records the key and ignores duplicates."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "POST /payment → server charges ₹100 → response lost → client retries\nWithout idempotency: charged twice. With an idempotency key: charged once.",
     "lang": "text"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: retries over an unreliable network make idempotency essential; pair every retry with timeouts, backoff and jitter."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-network-partition",
   "num": null,
   "title": "Network Partition",
   "stars": 2,
   "chapter": "networks-in-system-design",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A partition is when parts of a distributed system are still running but "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "cannot communicate"
        }
       ]
      },
      {
       "type": "text",
       "value": ". Each side may think the other is down."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "This forces decisions about "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "partial failure"
        }
       ]
      },
      {
       "type": "text",
       "value": " and leads directly to replication, consistency, consensus, quorums and the "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "CAP theorem"
        }
       ]
      },
      {
       "type": "text",
       "value": "."
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
         "value": "Remember: a partition is a communication break, not a crash — both sides are alive but split. It's the core reason distributed systems are hard."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-process-vs-thread",
   "num": null,
   "title": "Process vs Thread",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A process is an isolated program instance with its own memory; a thread runs inside a process and shares its memory."
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
         "value": "Remember: want isolation → process; want cheap concurrency with shared data → thread."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-concurrency-vs-parallelism-2",
   "num": null,
   "title": "Concurrency vs Parallelism",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Concurrency = multiple tasks making progress over overlapping time (even on one core); parallelism = tasks truly running at the same instant (needs multiple cores)."
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
         "value": "Remember: concurrency is structure (dealing with many things); parallelism is execution (doing many at once)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-mutex-vs-semaphore",
   "num": null,
   "title": "Mutex vs Semaphore",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Mutex allows one thread in a critical section; a semaphore has N permits and allows up to N concurrent users."
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
         "value": "Remember: mutex = lock (one); semaphore = counter (N). Protect one thing vs limit how many."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-blocking-vs-non-blocking-i-o-2",
   "num": null,
   "title": "Blocking vs Non-blocking I/O",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Blocking parks the thread until I/O completes (thread-per-request); non-blocking lets the thread do other work and handle the result later (event loop, high concurrency)."
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
         "value": "Remember: blocking is simple but thread-hungry; non-blocking scales connections with few threads."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-tcp-vs-udp-2",
   "num": null,
   "title": "TCP vs UDP",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "TCP is reliable, ordered and connection-oriented with flow/congestion control; UDP is connectionless, unordered and low-overhead."
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
         "value": "Remember: need every byte in order → TCP; need speed and can tolerate loss → UDP."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-flow-control-vs-congestion-control-2",
   "num": null,
   "title": "Flow Control vs Congestion Control",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Both prevent overwhelming something; flow control protects the receiver, congestion control protects the network."
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
         "value": "Remember: flow = receiver window; congestion = network load."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-http-1-1-vs-http-2-vs-http-3-2",
   "num": null,
   "title": "HTTP/1.1 vs HTTP/2 vs HTTP/3",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "/1.1 reuses TCP connections but multiplexes poorly; /2 multiplexes many streams on one TCP connection; /3 runs over QUIC/UDP to avoid TCP head-of-line blocking."
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
         "value": "Remember: /2 fixes app-level HOL blocking; /3 fixes transport-level HOL blocking."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-401-vs-403",
   "num": null,
   "title": "401 vs 403",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "401 Unauthorized = not authenticated (who are you?); 403 Forbidden = authenticated but not permitted."
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
         "value": "Remember: 401 = log in; 403 = you're known but not allowed."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-put-vs-patch",
   "num": null,
   "title": "PUT vs PATCH",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "PUT replaces the entire resource (idempotent); PATCH applies a partial change."
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
         "value": "Remember: PUT = full replace; PATCH = partial update."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-load-balancer-vs-reverse-proxy",
   "num": null,
   "title": "Load Balancer vs Reverse Proxy",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A load balancer's core job is distributing traffic; a reverse proxy is a broader front-door that can also do TLS termination, caching, routing and load balancing."
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
         "value": "Remember: all load balancers act as proxies, but a reverse proxy does more than just balance."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-latency-vs-bandwidth",
   "num": null,
   "title": "Latency vs Bandwidth",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Latency is how long an operation takes; bandwidth is the maximum data rate the channel supports."
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
         "value": "Remember: latency = delay; bandwidth = capacity. High bandwidth doesn't fix high latency."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-switch-vs-router",
   "num": null,
   "title": "Switch vs Router",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A switch forwards frames by MAC address within a local network (L2); a router forwards packets by IP between networks (L3)."
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
         "value": "Remember: switch = inside one network; router = between networks."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-symmetric-vs-asymmetric-encryption-in-tls",
   "num": null,
   "title": "Symmetric vs Asymmetric Encryption (in TLS)",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Asymmetric (public/private key) authenticates the server and safely establishes a shared key; symmetric uses that shared key for fast bulk encryption."
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
         "value": "Remember: asymmetric to set up trust and keys, symmetric to move the data."
        }
       ]
      }
     ]
    }
   ]
  }
 ]
};
