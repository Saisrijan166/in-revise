import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const java: Blueprint = {
  tagline: "How Java compiles, loads and runs — and the language and memory it runs on.",
  legend: legendOf([
    "Compile & run",
    "JVM execution",
    "Memory areas",
    "Language core",
    "Concurrency & GC",
  ]),
  alt:
    "A system map of Java. Compile and run: a .java source is compiled by javac to .class bytecode, which " +
    "the ClassLoader loads, links and initialises. JVM runtime: the execution engine interprets bytecode " +
    "and JIT-compiles hot code, running main(); it also sets up the runtime data areas. Memory: the heap " +
    "holds objects, stacks hold frames and locals, metaspace holds class data, plus the PC and native " +
    "stack; unreachable objects are reclaimed by the garbage collector (G1 or ZGC). Language core: the " +
    "running program uses OOP (classes and objects, the four pillars), collections (backed by generics), " +
    "functional streams and lambdas, throws exceptions, and modern features (records, sealed, var, switch); " +
    "objects and collections live on the heap. Concurrency: the program spawns threads, usually through an " +
    "ExecutorService and CompletableFuture or virtual threads, guarded by synchronized, locks and volatile.",
  baseline: "Java 25 (LTS)",
  chart: `flowchart TD
  subgraph COMP["1 . Compile and run"]
    direction TB
    src["Source .java"]:::f
    src -->|javac| bc["Bytecode .class"]:::f
    bc -->|load| cl["ClassLoader: load link init"]:::c
  end

  subgraph RT["2 . JVM runtime"]
    direction TB
    cl --> ee["Execution engine"]:::c
    ee -->|interpret| run(["Program runs: main()"]):::c
    ee -.->|hot code| jit["JIT compiler"]:::c
    jit -.-> run
    cl --> areas["Runtime data areas"]:::d
  end

  subgraph MEM["3 . Memory"]
    direction LR
    heap[("Heap: objects")]:::d
    stk["Stacks: frames + locals"]:::d
    meta["Metaspace: class data"]:::d
    pcn["PC + native stack"]:::d
  end
  areas --> heap
  areas --> stk
  areas --> meta
  areas --> pcn
  heap -.->|unreachable| gc["Garbage Collector: G1 / ZGC"]:::o

  subgraph LANG["4 . Language core"]
    direction TB
    oop["OOP: class + object"]:::x
    oop --> pil["4 pillars: encapsulation inheritance polymorphism abstraction"]:::x
    oop -.-> types["Types: primitives + objects (autobox)"]:::x
    oop -.-> mod["Modern: records sealed var switch"]:::x
    coll["Collections: List Set Map Queue"]:::x
    coll -.->|type safety| gen["Generics"]:::x
    fun["Functional: lambda Streams Optional"]:::x
    fun -.-> coll
    exc["Exceptions: checked / unchecked"]:::x
  end
  run -->|objects| oop
  run -->|data| coll
  run -->|process| fun
  run -.->|throws| exc
  oop -.->|new| heap
  coll -.->|stored in| heap

  subgraph CONC["5 . Concurrency"]
    direction LR
    thr["Threads + Runnable"]:::o
    exec["ExecutorService + pools"]:::o
    cfu["CompletableFuture"]:::o
    vth["Virtual threads"]:::o
    syn["synchronized / locks / volatile"]:::o
  end
  run -->|spawns| thr
  thr --> exec
  exec --> cfu
  thr -.-> vth
  thr -.->|guarded by| syn
${CLASSDEFS}`,
};
