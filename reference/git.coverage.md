# Coverage: Git
Reference: reference/git.md  ·  Last updated: 02-11-2026

Every numbered section and every "vs" pair / interview question in `reference/git.md`
appears once below, in Mapped, Corrected or Dropped. Additions beyond the reference are listed too.

## Mapped
| Reference item | Landed in | Note |
|---|---|---|
| 1. Git Fundamentals (terminology, workflow) | concepts `what-is-git`, `working-staging-repo`; glossary | Git-vs-GitHub as an Interview Q + trap in `what-is-git` |
| 2. Installation & Configuration | concept `git-config` | scopes system/global/local |
| 3. Creating & Cloning Repositories | concept `init-and-clone`; concept `git-remotes` | init vs clone inline table |
| 4. Git Basic Commands | concepts `git-status`, `staging-and-add`, `git-commit`, `git-diff`, `git-log`, `git-rm-and-mv` | |
| 5. Git Branching | concepts `git-branches`, `switching-branches`, `head-and-detached-head` | |
| 6. Git Merge (ff, 3-way, conflicts) | concepts `git-merge`, `merge-conflicts`; comparison `fast-forward-vs-merge-commit` | |
| 7. Git Rebase (interactive, rules) | concept `git-rebase`; comparison `merge-vs-rebase` | golden rule, force-with-lease |
| 8. Git Remote Operations | concepts `fetch-pull-push`, `tracking-branches`; comparison `fetch-vs-pull-vs-push` | |
| 9. Undoing Changes (reset types, revert, restore, clean) | concepts `git-restore`, `git-reset`, `git-revert`, `git-clean`; comparisons `reset-soft-mixed-hard`, `reset-vs-revert`, `restore-vs-reset` | |
| 10. Git Stash (apply vs pop, -u) | concept `git-stash`; comparison `stash-apply-vs-pop` | |
| 11. Git Tags (lightweight vs annotated) | concept `git-tags`; comparisons `lightweight-vs-annotated-tag`, `branch-vs-tag` | |
| 12. Git Cherry-pick | concept `git-cherry-pick`; comparison `merge-vs-cherry-pick` | |
| 13. GitHub Collaboration & Pull Requests | concepts `pull-requests`, `forking`; comparison `clone-vs-fork` | |
| 14. Important Files & Concepts (.gitignore, .git, objects, hooks) | concepts `gitignore`, `git-directory`, `git-objects`, `git-hooks` | |
| 15. Important Interview Questions (Q1-Q15) | spread across the matching concepts' Interview Qs | detached HEAD → `head-and-detached-head`; origin → `git-remotes` |
| Daily Git workflow | story spine; `pull-requests`, everyday-changes concepts | |
| Confusing differences — Git (12 pairs) | the 12 comparison files | each listed in the owning concept's confusedWith |
| Quick revision — Git top 20 | covered across the concepts and the cheat sheet | |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| "main: Common default branch name" | Implies Git defaults to `main` | Git itself still creates `master` unless `init.defaultBranch` is set; this changes to `main` in Git 3.0 (git-init docs); `main` is already the default on GitHub and other hosts | https://git-scm.com/docs/git-init ; https://docs.github.com |
| "git pull: fetch + merge" (reference 8) | Implies a diverged `git pull` merges by default | In current Git, an unconfigured diverged pull does NOT silently merge: it stops and makes you choose a strategy (the unset default is `--ff-only`, which fails on divergence). Set `pull.rebase`/`pull.ff`. The warn-and-choose behaviour is since Git 2.27 | https://git-scm.com/docs/git-pull |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| Reflog and recovery | concept `git-reflog` | The standard way to recover after a bad reset/rebase; commonly asked |
| Squash merge | concept `squash-merge` | The "Squash and merge" PR button and `--squash` are everyday team practice |
| Pull strategies (pull.rebase, --ff-only) | concept `pull-strategies` | Modern Git prompts for this; asked about merge vs rebase on pull |
| Amend the last commit | concept `commit-amend` | Very common fix; and the trap of amending after push |
| Branching strategies | concept `branching-strategies` | Trunk-based vs Git Flow vs GitHub Flow is a frequent discussion |
| Good commits | concept `good-commits` | Atomic commits and message conventions are asked in reviews |
| Blame and bisect | concepts `git-blame`, `git-bisect` | Standard tools for finding when/where a bug entered |

## Dropped
| Reference item | Reason |
|---|---|
| Inline image links in the Merge section (openai static URLs) | Reference artefacts, not content; diagrams are redrawn as Mermaid |
| `git yum`/old RPM notes (if any leaked from Linux) | Belongs to the Linux tech |
