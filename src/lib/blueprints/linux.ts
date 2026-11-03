import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const linux: Blueprint = {
  tagline:
    "From a shell command to the kernel and hardware — processes, files, permissions, services.",
  legend: legendOf([
    "Shell & commands",
    "Processes",
    "Filesystem",
    "Permissions & users",
    "System & networking",
  ]),
  alt:
    "A system map of Linux. Shell: a user types into the shell (bash); a command and its args become a " +
    "system call into the kernel, which drives the hardware; pipes and redirection chain commands. " +
    "Processes: the kernel creates processes with fork and exec, each with a PID seen in ps and top; signals " +
    "(SIGTERM, SIGKILL) control them, jobs run in the foreground or background or under nohup, and systemd " +
    "manages long-running ones. Filesystem: one tree from /, built from inodes, with hard and symbolic " +
    "links, where everything is a file. Permissions and users: rwx bits for user, group and other, changed " +
    "with chmod and chown; users and groups, and sudo or root for elevated actions. System and networking: " +
    "a package manager (apt or dnf) installs software, systemctl runs services, ports are checked with ss, " +
    "and SSH gives remote access.",
  baseline: "Linux · bash",
  chart: `flowchart TD
  subgraph SHELL["1 . Shell"]
    direction TB
    usr(["User"]):::f
    usr --> sh["Shell (bash)"]:::f
    sh -->|command + args| cmd["Command"]:::f
    sh -.-> pipe["Pipes and redirection"]:::f
    cmd -->|syscall| kern["Kernel"]:::f
    kern --> hw(["Hardware"]):::f
  end

  subgraph PROC["2 . Processes"]
    direction TB
    fork["fork + exec"]:::c
    fork --> pid["PID + ps / top"]:::c
    pid -.-> sig["Signals (SIGTERM/KILL)"]:::c
    pid --> job["Jobs: fg / bg / nohup"]:::c
    job --> sd["systemd"]:::c
  end
  kern --> fork

  subgraph FS["3 . Filesystem"]
    direction TB
    fhs["/ hierarchy"]:::d
    fhs --> ino["inodes"]:::d
    ino --> lnk["hard / symbolic links"]:::d
    fhs -.-> eaf["Everything is a file"]:::d
  end
  kern --> fhs

  subgraph PERM["4 . Permissions and users"]
    direction TB
    rwx["rwx (user/group/other)"]:::x
    rwx --> chm["chmod / chown"]:::x
    ug["Users + groups"]:::x
    sudo["sudo / root"]:::x
    ug -.-> rwx
    sudo -.-> rwx
  end
  fhs --> rwx

  subgraph SYS["5 . System and networking"]
    direction TB
    svc["systemctl services"]:::o
    pkg["Package manager (apt/dnf)"]:::o
    net["Ports + ss"]:::o
    net --> ssh["SSH"]:::o
    svc -.-> pkg
    svc -.-> net
  end
  sd --> svc
${CLASSDEFS}`,
};
