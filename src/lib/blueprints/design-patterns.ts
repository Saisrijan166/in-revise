import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const designPatterns: Blueprint = {
  tagline:
    "From a recurring problem to the right pattern — grouped creational, structural, behavioral.",
  legend: legendOf(["Start / decision", "Creational", "Structural", "Behavioral", "Principles"]),
  alt:
    "A decision map of design patterns. A recurring design problem is first shaped by principles (SOLID, " +
    "DRY, favour composition over inheritance), then you choose by the kind of problem. Creational (how " +
    "objects are made): one shared instance is Singleton, creating without naming the class is Factory or " +
    "Abstract Factory, building step by step is Builder, cloning is Prototype. Structural (how objects " +
    "compose): matching interfaces is Adapter, adding behaviour is Decorator, a simple front is Facade, " +
    "controlling access is Proxy, a tree of parts is Composite. Behavioral (how objects interact): swapping " +
    "an algorithm is Strategy, notifying on change is Observer, encapsulating a request is Command, fixed " +
    "steps with varying bits is Template Method, and behaviour that changes with state is State.",
  baseline: "GoF patterns · SOLID",
  chart: `flowchart TD
  prob(["Recurring design problem"]):::f
  prob --> solid["SOLID + DRY + favour composition"]:::o
  solid --> hub{{"Which kind of problem?"}}:::f

  subgraph CRE["1 . Creational - make objects"]
    direction TB
    sing["Singleton"]:::c
    fact["Factory / Abstract Factory"]:::c
    bld["Builder"]:::c
    prot["Prototype"]:::c
  end
  hub -->|one shared instance| sing
  hub -->|create without new| fact
  hub -->|build step by step| bld
  hub -->|clone existing| prot

  subgraph STR["2 . Structural - compose objects"]
    direction TB
    adp["Adapter"]:::d
    dec["Decorator"]:::d
    fcd["Facade"]:::d
    prx["Proxy"]:::d
    cmp["Composite"]:::d
  end
  hub -->|match interfaces| adp
  hub -->|add behaviour| dec
  hub -->|simple front| fcd
  hub -->|control access| prx
  hub -->|tree of parts| cmp

  subgraph BEH["3 . Behavioral - objects interact"]
    direction TB
    strat["Strategy"]:::x
    obs["Observer"]:::x
    cmd["Command"]:::x
    tmpl["Template Method"]:::x
    stt["State"]:::x
  end
  hub -->|swap algorithm| strat
  hub -->|notify on change| obs
  hub -->|encapsulate request| cmd
  hub -->|fixed steps, vary bits| tmpl
  hub -->|behaviour by state| stt
${CLASSDEFS}`,
};
