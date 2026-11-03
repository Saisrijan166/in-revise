import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const osNetworking: Blueprint = {
  tagline:
    "From a process on the CPU to a packet on the wire — processes, memory, syscalls, the net stack.",
  legend: legendOf(["Process & CPU", "Memory", "Syscalls & I/O", "Network stack", "Transport"]),
  alt:
    "A system map of operating systems and networking. Process and CPU: a program is loaded into a process " +
    "(PCB) with threads; the scheduler context-switches them onto the CPU. Memory: each process sees a " +
    "virtual address space mapped by the MMU and page tables to physical RAM, with page faults fetching " +
    "from disk, and a stack and heap. Syscalls and I/O: the CPU traps into the kernel through system calls " +
    "to reach files (via descriptors) and sockets. Network stack (send): a socket hands data down the " +
    "layers — L7 application (HTTP, DNS, TLS), L4 transport (TCP or UDP), L3 network (IP and routing), L2 " +
    "link (Ethernet, MAC) — out to the NIC and wire. Transport: TCP does a SYN/ACK handshake and gives " +
    "reliable, ordered, flow-controlled delivery, while UDP is fast with no guarantee; ports plus sockets " +
    "identify each connection.",
  baseline: "Linux · TCP/IP",
  chart: `flowchart TD
  subgraph PROC["1 . Process and CPU"]
    direction TB
    prog["Program"]:::f
    prog -->|load| proc["Process (PCB)"]:::f
    proc --> thr["Threads"]:::f
    proc --> sched["Scheduler: context switch"]:::f
    sched --> cpu(["CPU runs"]):::f
  end

  subgraph MEM["2 . Memory"]
    direction LR
    virt["Virtual address space"]:::c
    virt -->|MMU + page table| phys["Physical RAM"]:::c
    virt --> stkh["Stack + Heap"]:::c
    phys -.->|page fault| pf["Disk / swap"]:::c
  end
  proc --> virt

  subgraph IO["3 . Syscalls and I/O"]
    direction LR
    sys["System calls (user -> kernel)"]:::d
    fil["Files + descriptors"]:::d
    sock["Sockets"]:::d
  end
  cpu -->|trap| sys
  sys --> fil
  sys --> sock

  subgraph NET["4 . Network stack (send)"]
    direction TB
    l7["L7 App: HTTP / DNS / TLS"]:::x
    l7 --> l4["L4 Transport: TCP / UDP"]:::x
    l4 --> l3["L3 Network: IP + routing"]:::x
    l3 --> l2["L2 Link: Ethernet / MAC"]:::x
    l2 --> wire(["NIC / wire"]):::x
  end
  sock --> l7

  subgraph PROTO["5 . Transport details"]
    direction LR
    hs["TCP handshake (SYN/ACK)"]:::o
    rel["Reliable + ordered + flow"]:::o
    udp["UDP: fast, no guarantee"]:::o
    prt["Ports + sockets"]:::o
  end
  l4 --> hs
  l4 --> rel
  l4 -.-> udp
  sock -.-> prt
${CLASSDEFS}`,
};
