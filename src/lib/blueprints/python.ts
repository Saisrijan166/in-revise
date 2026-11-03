import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const python: Blueprint = {
  tagline: "How Python runs your code, and the object model, data and concurrency it gives you.",
  legend: legendOf([
    "How Python runs",
    "Object model",
    "Data structures",
    "Functions & OOP",
    "Concurrency & tooling",
  ]),
  alt:
    "A system map of Python. How Python runs: a .py source is compiled to .pyc bytecode and executed by " +
    "the CPython virtual machine; the program runs, and memory is managed by reference counting plus a " +
    "cycle collector. Object model: everything is an object, names are bound to objects, objects are " +
    "mutable (list, dict, set) or immutable (int, str, tuple), and typing is dynamic but strong. Data " +
    "structures: list, tuple, set, dict and comprehensions. Functions and OOP: def with args and kwargs, " +
    "lambda, closures and decorators; classes with __init__, self, dunder methods and inheritance (MRO); " +
    "generators yield lazily. Concurrency and tooling: threading (limited by the GIL for CPU work), " +
    "multiprocessing for parallelism, asyncio for async I/O, and pip/venv for packages.",
  baseline: "Python 3.14",
  chart: `flowchart TD
  subgraph RUN["1 . How Python runs"]
    direction TB
    src["Source .py"]:::f
    src -->|compile| bc["Bytecode .pyc"]:::f
    bc --> pvm["PVM (CPython)"]:::f
    pvm --> run(["Program runs"]):::f
    pvm -.->|refcount + cycles| gc["Garbage collection"]:::o
  end

  subgraph OBJ["2 . Object model"]
    direction TB
    nm["Name -> object (binding)"]:::c
    nm --> obj["Everything is an object"]:::c
    obj --> mut["Mutable: list dict set"]:::c
    obj --> imm["Immutable: int str tuple"]:::c
    obj -.-> typ["Dynamic + strong typing"]:::c
  end
  run -->|works on| obj

  subgraph DS["3 . Built-in data structures"]
    direction LR
    lst["list"]:::d
    tup["tuple"]:::d
    stt["set"]:::d
    dct["dict"]:::d
    cmp["comprehensions"]:::d
  end
  mut -.-> lst
  mut -.-> dct
  imm -.-> tup
  lst -.-> cmp

  subgraph FUNC["4 . Functions and OOP"]
    direction TB
    fn["def + args / kwargs"]:::x
    fn --> lam["lambda"]:::x
    fn --> clo["closures -> decorators"]:::x
    cls["class + __init__ + self"]:::x
    cls --> dun["dunder methods"]:::x
    cls --> inh["inheritance + MRO"]:::x
    gen["generators: yield (lazy)"]:::x
  end
  run -->|calls| fn
  run -->|models with| cls
  run -->|iterates| gen

  subgraph SYS["5 . Concurrency and tooling"]
    direction LR
    thr["threading (GIL)"]:::o
    mpp["multiprocessing"]:::o
    aio["asyncio: async / await"]:::o
    pip["pip + venv + PyPI"]:::o
  end
  run -->|I/O-bound| thr
  run -->|CPU-bound| mpp
  run -->|async I/O| aio
${CLASSDEFS}`,
};
