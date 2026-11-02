# PLAN — Git and Linux (new techs, 02-11-2026)

Owner added a combined reference (root `reference.md`). Split into `reference/git.md`
and `reference/linux.md`. Two individual techs, both **template v3**. Owner choices:
Git accent **sienna** (amber-brown, new), Linux accent **yellow** (new); both AA-tuned in
`globals.css`. Build **Git first**, verify and push, owner reviews, then Linux.

Baselines: Git 2.x (2.5x, 2026 — time-based releases, latest stable ~2.56, Sep 2026);
Linux generic (Linux kernel + GNU userland), Ubuntu/Debian (apt) and systemd as the
examples, bash as the shell. Java-only app code where code appears.

## Git — topics (8, foundations first) and concepts (~41)

1. **basics**: what-is-git, how-git-stores-data, working-staging-repo, git-config, init-and-clone
2. **changes**: git-status, staging-and-add, git-commit, git-diff, git-log, gitignore, git-rm-and-mv
3. **branching**: git-branches, head-and-detached-head, switching-branches
4. **integrating**: git-merge, merge-conflicts, git-rebase, git-cherry-pick, squash-merge
5. **remotes**: git-remotes, fetch-pull-push, tracking-branches, pull-strategies, pull-requests, forking
6. **undoing**: git-restore, git-reset, git-revert, git-clean, git-reflog
7. **saving**: git-stash, git-tags
8. **internals**: git-objects, git-directory, git-hooks, commit-amend, branching-strategies, good-commits, git-blame, git-bisect

Comparisons (~13): git-vs-github, merge-vs-rebase, fetch-vs-pull-vs-push, reset-vs-revert,
restore-vs-reset, reset-soft-mixed-hard, stash-apply-vs-pop, branch-vs-tag,
merge-vs-cherry-pick, clone-vs-fork, lightweight-vs-annotated-tag,
fast-forward-vs-merge-commit, add-vs-commit-vs-push.

Added beyond the reference (interview-important, missing from it): git-reflog (recovery),
squash-merge, pull-strategies (ff-only / pull.rebase), commit-amend, branching-strategies
(trunk-based vs Git Flow), good-commits, git-blame, git-bisect. All recorded in the coverage file.

Running example: a small team building a **payments feature** on a shared repo.

## Linux — (built after Git; topics drafted, finalised at build time)

OS/kernel/shell basics, filesystem, navigation, files, permissions, users/groups,
text search (grep/find), pipes & redirection, processes & signals, packages, networking,
env vars, services (systemd) & monitoring, archives, scheduling (cron). ~50 concepts.
