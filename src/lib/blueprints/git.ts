import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const git: Blueprint = {
  tagline: "How a change moves through the three areas to a remote — with branching and safe undo.",
  legend: legendOf([
    "The three areas",
    "Commits & history",
    "Branching",
    "Remotes",
    "Undo & tools",
  ]),
  alt:
    "A system map of Git. The three areas: edits in the working directory are staged with git add into the " +
    "index, then committed with git commit into the local repo (.git). Commits and history: a commit is a " +
    "snapshot plus a parent; HEAD points at the current branch; git log and diff read history. Branching: a " +
    "branch is a movable pointer; git merge makes a merge commit, git rebase replays commits, and clashes " +
    "are resolved as conflicts. Remotes: git push sends commits to a remote like GitHub, git fetch and pull " +
    "bring them back, git clone copies a remote into a new working directory, and a Pull Request proposes a " +
    "merge. Undo and tools: reset moves the branch, revert safely undoes a pushed commit, restore and " +
    "checkout fix files, stash parks work, and reflog recovers lost commits.",
  baseline: "Git 2.x",
  chart: `flowchart TD
  subgraph AREAS["1 . The three areas"]
    direction TB
    wd["Working directory"]:::f
    wd -->|git add| idx["Staging area (index)"]:::f
    idx -->|git commit| repo[("Local repo .git")]:::c
  end

  subgraph HIST["2 . Commits and history"]
    direction LR
    commit["Commit = snapshot + parent"]:::c
    head["HEAD -> current branch"]:::c
    log["git log / diff"]:::c
  end
  repo --> commit
  commit --> head
  repo --> log

  subgraph BR["3 . Branching"]
    direction TB
    branch["Branch (pointer)"]:::d
    branch -->|git merge| merge["Merge commit"]:::d
    branch -->|git rebase| rebase["Rebase (replay)"]:::d
    conflict["Resolve conflicts"]:::d
  end
  head --> branch
  merge -.-> conflict
  rebase -.-> conflict

  subgraph REM["4 . Remotes"]
    direction TB
    rem[("Remote: GitHub")]:::x
    pr["Pull Request"]:::x
  end
  repo -->|git push| rem
  rem -->|git fetch / pull| repo
  rem -->|git clone| wd
  rem --> pr

  subgraph UNDO["5 . Undo and tools"]
    direction LR
    reset["reset (move branch)"]:::o
    revert["revert (safe undo)"]:::o
    restore["restore / checkout"]:::o
    stash["stash"]:::o
    reflog["reflog (recover)"]:::o
  end
  commit -.-> reset
  commit -.-> revert
  idx -.-> restore
  wd -.-> stash
  reset -.-> reflog
${CLASSDEFS}`,
};
