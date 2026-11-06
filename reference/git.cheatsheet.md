# Fundamentals

## What Git Is ⭐

Git is a distributed version control system that tracks changes in files over time so you can save snapshots of your code and collaborate without overwriting each other.

- **Repository (repo):** a project folder Git tracks. Lives **locally** on your machine and, usually, **remotely** on a host.
- **Git vs GitHub:** Git is the version-control tool; GitHub (like GitLab, Bitbucket) is a platform that hosts Git repos and adds collaboration. They are different things.

> Remember: Git tracks snapshots; GitHub hosts them.

## The Three Areas ⭐⭐

Every change moves through three places before it reaches the remote.

| Area | What it holds |
| --- | --- |
| Working Directory | Files you are currently editing |
| Staging Area (index) | Changes prepared for the next commit |
| Local Repository | Committed snapshots in Git history |

The remote repository (e.g. GitHub) is the fourth place you share to.

```bash
git add file.txt     # working -> staging
git commit -m "msg"  # staging -> local repo
git push             # local repo -> remote
```

> Remember: add stages, commit saves locally, push uploads, pull brings remote changes back.

## Core Vocabulary

- **Commit:** a saved snapshot of staged changes, with parent and metadata.
- **HEAD:** pointer to your current commit, usually the tip of the current branch.
- **Branch:** an independent line of development pointing to a commit.
- **Clone:** make a local copy of a remote repo (with its history).
- **Fork:** your own hosted copy of someone else's repo.
- **Conflict:** when Git cannot automatically combine two sets of changes.

## How Git Stores Data

Git saves content as objects inside the `.git` directory.

| Object | Stores |
| --- | --- |
| Blob | File content |
| Tree | Directory structure and references to blobs/trees |
| Commit | Snapshot reference, parent, and metadata |
| Tag | An annotated tag object |

The `.git` directory holds all metadata, objects, references and config. Deleting it removes Git tracking but normally leaves your project files.

# Setup

## Configuring Git

`git config` sets Git's identity and behaviour. Your name and email become the commit author.

```bash
git config --global user.name "Srijan"
git config --global user.email "email@example.com"
git config --list        # show configuration
```

| Scope | Applies to |
| --- | --- |
| `--global` | All repos for your user |
| `--local` | The current repo only |

> Remember: local config overrides global when both set the same value.

## Starting a Repository ⭐

Two ways to get a repo: create a new one or copy an existing one.

```bash
git init                                     # new empty repo
git clone https://github.com/user/project.git  # copy existing repo + history
git remote add origin <url>                  # link a remote
git remote -v                                # show remote URLs
```

| `git init` | `git clone` |
| --- | --- |
| Creates a new local repo | Copies an existing repo |
| No history downloaded | Downloads existing history |
| For new projects | For existing projects |

**origin** is the conventional name for the main remote; **main** is the common default branch.

# Everyday Changes

## Inspecting and Saving ⭐⭐

The daily loop: check status, stage, commit, review history.

| Command | Purpose |
| --- | --- |
| `git status` | Show current changes |
| `git add .` | Stage changes in current dir + subdirs |
| `git add -A` | Stage adds, edits and deletions across the tree |
| `git commit -m "msg"` | Commit staged changes |
| `git log --oneline` | Compact history |
| `git show` | Details of a commit |
| `git rm file` / `git mv old new` | Remove / rename a tracked file |

> Remember: `git commit` only records what is staged.

## Viewing Differences

`git diff` shows what changed, depending on what you compare.

```bash
git diff            # working directory vs staging area
git diff --staged   # staging area vs last commit
```

> Remember: plain `diff` = not yet staged; `--staged` = staged but not committed.

## Fixing the Last Commit (amend)

Use amend to correct the most recent commit's message or add forgotten changes. It rewrites that commit, so avoid amending commits already pushed.

```bash
git commit --amend -m "Corrected message"
```

## .gitignore

`.gitignore` lists files Git should intentionally not track, e.g. build output, dependencies, logs, secrets.

```text
node_modules/
.env
*.log
target/
```

It does **not** untrack files Git already tracks. To stop tracking one:

```bash
git rm --cached .env
git commit -m "Stop tracking env file"
```

> Remember: `.gitignore` prevents future tracking, not existing tracking.

# Branching

## Working With Branches ⭐

A branch is a movable pointer to a commit; creating one does not copy the project physically.

```bash
git branch                 # list
git switch -c feature-login  # create and switch
git switch main            # switch back
git branch -d feature-login  # delete if merged
git branch -D feature-login  # force delete (may lose work)
```

- `switch` is the modern command for changing branches; `checkout` also switches but additionally restores files.
- `-d` deletes only a safely merged branch; `-D` forces it.
- You cannot switch if uncommitted changes would be overwritten.

## Merging ⭐⭐

Merge combines another branch's changes into your current branch.

```bash
git switch main
git merge feature-login
```

| Type | When it happens |
| --- | --- |
| Fast-forward | Target branch hasn't moved since the feature branched; pointer just moves forward |
| Three-way | Both branches have new commits; Git builds a merge commit from their common ancestor |

A **merge commit** joins two histories and usually has two parents.

## Resolving Conflicts ⭐⭐

A conflict appears when Git can't auto-combine overlapping edits. Git marks the file:

```text
<<<<<<< HEAD
Hello World
=======
Hello Git
>>>>>>> feature-login
```

Steps: open the file, pick the right changes, remove the markers, save, then stage and commit.

```bash
git add .
git commit
```

## Rebase ⭐⭐

Rebase replays your commits on top of another base to keep history linear. Good for updating a feature branch before merging.

```bash
git switch feature-login
git rebase main
git rebase -i HEAD~3   # interactive: squash, reword, reorder, drop
```

- Rebase rewrites history and gives commits new IDs.
- Never rebase shared branches others already use.
- After rebasing a pushed branch, push with `--force-with-lease`.

> Remember: merge joins histories; rebase replays commits on a new base.

## Cherry-pick

Cherry-pick applies one specific commit from another branch onto your current branch, without merging the whole branch.

```bash
git switch main
git cherry-pick abc123
```

Use it when a single fix from, say, `develop` is needed on `production`.

# Remotes and GitHub

## Fetch, Pull, Push ⭐⭐

These move commits between local and remote.

```bash
git fetch origin            # download remote updates, don't integrate
git pull origin main        # fetch + integrate
git push origin main        # upload local commits
git push -u origin feature  # first push, set upstream
git branch -r / -a          # remote / all branches
```

| Command | Meaning |
| --- | --- |
| Fetch | Download only |
| Pull | Fetch + integrate (merge, or rebase with `--pull --rebase`) |
| Push | Upload local commits |

- `git push` is rejected if the remote has commits you lack — pull first.
- `-u` sets the **upstream (tracking) branch** so future `push`/`pull` need no arguments.

## Pull Requests and Collaboration

A **Pull Request (PR)** asks to merge your branch into another, so teammates can review before it lands.

Typical flow:

```bash
git switch main
git pull origin main
git switch -c feature-payment
# work, then:
git add .
git commit -m "Added payment API"
git push -u origin feature-payment
# open a PR, address review comments, merge
```

- **Fork:** your own hosted copy, used to contribute to repos you can't push to directly.
- **Protected branch:** a branch with rules like required reviews or passing CI/CD checks before merge.

# Undoing Changes

## Restore, Reset, Revert, Clean ⭐⭐⭐

Pick the tool by what you want to undo.

| Command | Undoes |
| --- | --- |
| `git restore file` | Discard unstaged changes in a file |
| `git restore --staged file` | Unstage a file (keep its changes) |
| `git reset HEAD~1` | Remove last commit |
| `git revert <commit>` | New commit that reverses an old one |
| `git clean -fd` | Delete untracked files and directories |

## The Three Resets ⭐⭐

`git reset` moves the branch pointer back; the flag decides what happens to the changes.

| Flag | Commit removed? | Changes left as |
| --- | --- | --- |
| `--soft` | Yes | Staged |
| `--mixed` (default) | Yes | Unstaged |
| `--hard` | Yes | Discarded |

```bash
git reset --soft HEAD~1   # keep changes staged
git reset HEAD~1          # keep changes unstaged
git reset --hard HEAD~1   # throw changes away
```

> Remember: soft keeps staged, mixed keeps unstaged, hard deletes.

## Reset vs Revert ⭐

- **Reset** moves the branch pointer backward and can rewrite history.
- **Revert** adds a new commit that undoes an earlier one, keeping history intact.

> Remember: for commits already pushed and shared, use `revert`, not `reset`.

# Stash and Tags

## Stash ⭐

Stash temporarily shelves uncommitted changes so you can switch context, e.g. drop a half-done feature to fix an urgent bug, then come back.

```bash
git stash          # save changes
git stash -u       # include untracked files
git stash list     # show stashes
git stash apply    # reapply, keep the stash
git stash pop      # reapply and remove the stash
git stash drop / clear  # delete one / all
```

> Remember: `apply` keeps the stash; `pop` removes it after applying.

## Tags

A tag is a named reference to a specific commit, usually marking a release.

```bash
git tag v1.0                      # lightweight
git tag -a v1.0 -m "First release"  # annotated (tagger, date, message)
git push origin v1.0              # push one tag
git push origin --tags            # push all tags
```

> Remember: a branch moves with new commits; a tag normally stays fixed on its commit.

# Workflow and Internals

## A Good Daily Workflow

```bash
git status
git pull origin main
git switch -c feature-login
git add .
git commit -m "Added login API"
git push -u origin feature-login
```

Keep commits small and focused with a clear message describing what changed.

## Detached HEAD

HEAD is "detached" when it points directly at a commit instead of a branch. New commits there belong to no branch unless you create one, so they can be lost.

## Git Hooks

Hooks are scripts Git runs automatically at events like `pre-commit`, `commit-msg`, `pre-push`. They are used for formatting, linting and validation.

# Why X vs Y

## Quick Comparison Table ⭐⭐

| Pair | Difference |
| --- | --- |
| Git vs GitHub | Version-control tool vs hosting platform |
| Clone vs Fork | Local copy vs hosted independent copy |
| Add vs Commit | Stage changes vs save snapshot |
| Commit vs Push | Save locally vs upload remotely |
| Fetch vs Pull | Download only vs download and integrate |
| Merge vs Rebase | Join histories vs replay commits on a new base |
| Reset vs Revert | Move branch pointer vs add a reversing commit |
| Restore vs Reset | Restore file/staging state vs move HEAD / change index |
| Apply vs Pop | Reapply stash and keep it vs reapply and remove it |
| Branch vs Tag | Movable reference vs fixed reference |
| Merge vs Cherry-pick | Combine whole histories vs apply one commit |
| Soft vs Mixed vs Hard | Keep staged vs keep unstaged vs discard |
