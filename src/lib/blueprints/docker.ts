import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const docker: Blueprint = {
  tagline: "From Dockerfile to a running, isolated container — image, registry, runtime, network.",
  legend: legendOf([
    "Build",
    "Image & registry",
    "Container runtime",
    "Network & storage",
    "Compose & orchestration",
  ]),
  alt:
    "A system map of Docker. Build: a Dockerfile (FROM, RUN, COPY, CMD) is built into an image of read-only " +
    "layers, with layer caching and multi-stage builds. Image and registry: the image is pushed to a " +
    "registry such as Docker Hub and pulled elsewhere, identified by name:version tags. Container runtime: " +
    "docker run turns an image into a container, an isolated process using namespaces (pid, net, mnt) and " +
    "cgroups (cpu, memory limits); the Docker daemon delegates to containerd. Network and storage: " +
    "containers attach to bridge, host or none networks, map ports, and persist data in volumes or bind " +
    "mounts. Compose and orchestration: docker compose runs multi-container apps, and Kubernetes " +
    "orchestrates containers at scale.",
  baseline: "Docker Engine 27",
  chart: `flowchart TD
  subgraph BUILD["1 . Build"]
    direction TB
    df["Dockerfile: FROM RUN COPY CMD"]:::f
    df -->|docker build| img["Image: read-only layers"]:::c
    df -.->|cache / multi-stage| img
  end

  subgraph REG["2 . Image and registry"]
    direction LR
    reg[("Registry: Docker Hub")]:::c
    img2["Image (local)"]:::c
    tag["Tags: name:version"]:::c
  end
  img -->|push| reg
  reg -->|pull| img2
  img --> tag

  subgraph RUN["3 . Container runtime"]
    direction TB
    cont(["Container: isolated process"]):::d
    cont --> ns["Namespaces: pid net mnt"]:::d
    cont --> cg["cgroups: cpu + memory limits"]:::d
    eng["Docker daemon -> containerd"]:::d
  end
  img2 -->|docker run| cont
  eng --> cont

  subgraph NET["4 . Networking and storage"]
    direction LR
    brd["Bridge / host / none"]:::x
    prt["Port mapping -p"]:::x
    vol["Volumes"]:::x
    bind["Bind mounts"]:::x
  end
  cont --> brd
  cont --> prt
  cont --> vol
  cont -.-> bind

  subgraph ORCH["5 . Compose and orchestration"]
    direction LR
    comp["docker compose: multi-container"]:::o
    k8s["Kubernetes"]:::o
  end
  cont --> comp
  comp --> k8s
${CLASSDEFS}`,
};
