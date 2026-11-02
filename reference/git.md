# GIT — Interview Reference (owner input)

> Split from the owner's combined GIT & LINUX reference (root reference.md). Input only; every fact is verified against a primary source before it reaches the site.

# PART 1: GIT

## 1. Git Fundamentals

### Basic Terminology

- Git: A distributed version control system used to track code changes.
- Version Control: Tracks changes in files over time.
- Repository (Repo): A project folder tracked by Git.
- Local Repository: Git repository stored on your computer.
- Remote Repository: Repository hosted on platforms like GitHub, GitLab or Bitbucket.
- GitHub: A platform for hosting Git repositories and collaborating with developers. Git and GitHub are different.
- Commit: A saved snapshot of your changes.
- Branch: An independent line of development.
- HEAD: Pointer to your current commit (usually the latest commit on your current branch).
- Working Directory: Files you are currently editing.
- Staging Area: Area where you prepare changes before committing.
- Merge: Combines changes from different branches.
- Clone: Creates a local copy of a remote repository.
- Fork: Creates your own GitHub copy of someone else's repository.
- Pull Request (PR): Request to merge your changes into another branch.
- Conflict: Happens when Git cannot automatically combine changes.

### Git Workflow

Working Directory

Write or modify code

git add

Staging Area

Prepare changes for commit

git commit

Local Repository

Changes saved in Git history

git push

Remote Repository (GitHub)

Share changes with your team

### Example

```
git init
git add .
git commit -m "Initial commit"
git remote add origin <repository-url>
git push -u origin main
```

Remember:

- `add` → Stage changes.
- `commit` → Save changes locally.
- `push` → Upload commits to remote.
- `pull` → Fetch and integrate remote changes.

## 2. Git Installation & Configuration

### Important Commands

- git --version: Checks installed Git version.
- git config: Configures Git settings.
- git config --global: Applies settings to all repositories for your user.
- git config --local: Applies settings only to the current repository.
- git config --list: Displays configuration.

### Example

```
git --version

git config --global user.name "Srijan"

git config --global user.email "email@example.com"

git config --list
```

### Important Rules

- `--global` → User-level configuration.
- `--local` → Repository-level configuration.
- Local settings override global settings when both define the same value.
- Git commit author information comes from configured name and email (unless overridden).

## 3. Creating & Cloning Repositories

### Important Commands

- git init: Initializes a new Git repository.
- git clone: Downloads an existing repository.
- git remote: Manages remote repository connections.
- git remote -v: Displays remote URLs.
- git remote add: Adds a remote connection.
- origin: Default conventional name for the main remote repository.
- main: Common default branch name.

### Example

```
# Create a repository
git init

# Clone existing repository
git clone https://github.com/user/project.git

# Check remote
git remote -v

# Add remote
git remote add origin <url>
```

### Important Differences

| Git init                  | Git clone                  |
| ------------------------- | -------------------------- |
| Creates a new local repo  | Copies an existing repo    |
| Does not download history | Downloads existing history |
| Used for new projects     | Used for existing projects |

## 4. Git Basic Commands

### Most Important Daily Commands

| Command                   | Purpose                             |
| ------------------------- | ----------------------------------- |
| `git status`              | Shows current changes               |
| `git add .`               | Stages changes in current directory |
| `git add file.txt`        | Stages a specific file              |
| `git commit -m "message"` | Creates a commit                    |
| `git log`                 | Shows commit history                |
| `git log --oneline`       | Compact commit history              |
| `git diff`                | Shows unstaged changes              |
| `git diff --staged`       | Shows staged changes                |
| `git show`                | Shows details of a commit           |
| `git rm file.txt`         | Removes a tracked file              |
| `git mv old new`          | Renames or moves a tracked file     |

### Example

```
git status

git add Main.java

git diff

git diff --staged

git commit -m "Added login functionality"

git log --oneline
```

### Important Rules

- `git add .` stages changes in the current directory and its subdirectories.
- `git add -A` stages additions, modifications and deletions across the working tree.
- `git commit` only commits staged changes.
- `git diff` normally compares working directory against staging area.
- `git diff --staged` compares staging area against the latest commit.

## 5. Git Branching

### Terminology

- Branch: Separate development line.
- Main Branch: Primary integration or production branch, depending on workflow.
- Feature Branch: Branch created for a new feature.
- Bugfix Branch: Branch created to fix a bug.
- Checkout: Switches branches or restores files.
- Switch: Modern command specifically for switching branches.
- Branch Pointer: Reference pointing to a commit.

### Important Commands

```
# List branches
git branch

# Create branch
git branch feature-login

# Switch branch
git switch feature-login

# Create and switch
git switch -c feature-login

# Switch back
git switch main

# Delete branch
git branch -d feature-login

# Force delete branch
git branch -D feature-login
```

### Important Rules

- Every branch points to a commit.
- Creating a branch does not copy the entire project physically.
- Each branch can have different commits.
- `-d` deletes a branch only when Git considers it safely merged.
- `-D` force deletes a branch, even if unmerged changes could be lost.
- You cannot normally switch branches if conflicting uncommitted changes would be overwritten.

## 6. Git Merge

### Terminology

- Merge: Combines changes from one branch into another.
- Fast-forward Merge: Moves the current branch pointer forward when there is no divergence.
- Three-way Merge: Combines two branch histories using their common ancestor.
- Merge Commit: A commit that joins two histories, usually with two parents.
- Merge Conflict: Git needs manual help to combine changes.

### Example

```
git switch main

git merge feature-login
```

### Fast-forward Merge

Happens when the target branch has not moved forward since the feature branch was created.

[Git Merge (fast-forward, 3-way, squash, rebase) | Minoolian’s Dev](https://images.openai.com/static-rsc-4/mlEkJX79Sy1s8KHlfPuc4O1ao7g2c4q5B7C5AJBzKsdwQCx0WHGayyZJDT_R7gRhEOTHZ2Mdou6TMZwRACZk7835IIRhFamVfHCOfTbneuLBUVp8dyComhG3vjlxj-bhZ_4Kwai4h-wQOMihDtpVcCPxv1UbQgFn7briARE1K9k?purpose=inline)

[minoolian.github.io](https://minoolian.github.io/tech/Merge.html?utm_source=chatgpt.com)

### Three-way Merge

Happens when both branches have new commits.

[Git Merge | Atlassian Git Tutorial](https://images.openai.com/static-rsc-4/stGlu9_P0sQq_ObmyqpS1YYUf-w_znK8NrSDW2vAlGh9MpxMv16dUvDjl5xT4AvZ_SoMBEiZw5VsYRatiFAwKeeHbvf-bWGHhWIVRxquL7UVEiYz9IekZEHXblzFMkau6zJED2MihUvBMrhPMq3GZIzqtrv-7tqy6wdzkbXwD-4?purpose=inline)

[atlassian.com](https://www.atlassian.com/git/tutorials/using-branches/git-merge?utm_source=chatgpt.com)

### Merge Conflict Example

```
<<<<<<< HEAD
Hello World
=======
Hello Git
>>>>>>> feature-login
```

You must:

1. Open the conflicting file.
2. Decide which changes to keep.
3. Remove conflict markers.
4. Save the file.
5. Stage the resolved file.
6. Complete the merge commit if required.

```
git add .
git commit
```

### Important Difference: Merge vs Rebase

| Merge                                     | Rebase                                    |
| ----------------------------------------- | ----------------------------------------- |
| Combines branch histories                 | Replays commits on another base           |
| Usually preserves existing commit history | Creates new commit IDs                    |
| Can create a merge commit                 | Usually creates linear history            |
| Good for integrating branches             | Good for keeping feature branches updated |

## 7. Git Rebase

### Terminology

- Rebase: Moves or replays commits onto another base commit.
- Interactive Rebase: Allows editing, squashing, reordering or dropping commits.
- Squash: Combines multiple commits into one.
- Pick: Keeps a commit during interactive rebase.
- Reword: Changes a commit message.
- Drop: Removes a commit from the rebased history.

### Example

```
git switch feature-login

git rebase main
```

Interactive rebase:

```
git rebase -i HEAD~3
```

### Important Rules

- Rebase rewrites commit history.
- Rebased commits receive new commit IDs.
- Avoid rebasing shared branches that others are already using.
- After rebasing a published branch, pushing may require `--force-with-lease`.

### Merge vs Rebase — Remember

Merge = Join histories.

Rebase = Replay commits on top of another branch.

## 8. Git Remote Operations

### Important Terminology

- Fetch: Downloads remote updates without integrating them into your current branch.
- Pull: Fetches and integrates remote changes.
- Push: Uploads local commits to a remote repository.
- Upstream Branch: Remote branch associated with your local branch.
- Tracking Branch: Local reference that tracks a remote branch.

### Important Commands

```
# Download remote updates
git fetch origin

# Fetch and integrate
git pull origin main

# Upload changes
git push origin main

# First push with upstream
git push -u origin feature-login

# Show remote branches
git branch -r

# Show all branches
git branch -a
```

### Fetch vs Pull vs Push

| Command | Meaning                     |
| ------- | --------------------------- |
| Fetch   | Download remote information |
| Pull    | Fetch + integrate           |
| Push    | Upload local commits        |

### Important Rules

- `git fetch` does not automatically merge changes into your current branch.
- `git pull` normally performs fetch followed by merge.
- `git pull --rebase` performs fetch followed by rebase.
- `git push` can be rejected if the remote has changes you do not have locally.
- `-u` sets the upstream tracking branch for future pushes and pulls.

## 9. Undoing Changes in Git

Very important interview topic

### Important Commands

| Command                     | Purpose                                           |
| --------------------------- | ------------------------------------------------- |
| `git restore file`          | Discards unstaged changes in a file               |
| `git restore --staged file` | Removes file from staging                         |
| `git reset --soft HEAD~1`   | Removes last commit but keeps changes staged      |
| `git reset --mixed HEAD~1`  | Removes last commit, keeps changes unstaged       |
| `git reset --hard HEAD~1`   | Removes last commit and discards tracked changes  |
| `git revert <commit>`       | Creates a new commit that reverses another commit |
| `git clean -fd`             | Removes untracked files and directories           |

### Git Reset — Three Types

| Type  | Commit removed? | Changes kept? |
| ----- | --------------- | ------------- |
| Soft  | Yes             | Staged        |
| Mixed | Yes             | Unstaged      |
| Hard  | Yes             | Discarded     |

Example:

```
# Undo last commit but keep changes staged
git reset --soft HEAD~1

# Undo last commit but keep changes unstaged
git reset HEAD~1

# Completely discard last commit and tracked changes
git reset --hard HEAD~1
```

### Reset vs Revert

- Reset: Moves the branch pointer backward and may rewrite history.
- Revert: Creates a new commit that reverses an earlier commit.

Interview rule: Use `revert` for commits already pushed and shared with a team because it preserves existing history.

### Restore vs Reset

- `restore` → Restores file content or staging state.
- `reset` → Moves branch/HEAD and can also change staging or working files.

## 10. Git Stash

### Terminology

- Stash: Temporarily stores uncommitted changes.
- Stash List: Shows saved stashes.
- Apply: Applies stash without deleting it.
- Pop: Applies stash and removes it if successful.

### Example

```
# Save current changes
git stash

# Include untracked files
git stash -u

# List stashes
git stash list

# Apply latest stash
git stash apply

# Apply and remove latest stash
git stash pop

# Delete a stash
git stash drop

# Delete all stashes
git stash clear
```

### Common Scenario

You are working on a feature, but your manager asks you to fix an urgent bug.

1. Save your unfinished changes using `git stash`.
2. Switch to the bugfix branch.
3. Fix and commit the bug.
4. Switch back to your feature branch.
5. Apply your stash.

### Apply vs Pop

- `apply` → Keeps the stash.
- `pop` → Removes the stash after successful application.

## 11. Git Tags

### Terminology

- Tag: A named reference to a specific commit.
- Lightweight Tag: Simple pointer to a commit.
- Annotated Tag: Stores additional metadata like tagger, date and message.
- Release: A published version of software, often associated with tags.

### Example

```
# Create lightweight tag
git tag v1.0

# Create annotated tag
git tag -a v1.0 -m "First release"

# List tags
git tag

# Push a specific tag
git push origin v1.0

# Push all tags
git push origin --tags
```

### Important Difference

- Branch → Moves as new commits are added.
- Tag → Normally stays attached to a particular commit.

## 12. Git Cherry-pick

### Terminology

- Cherry-pick: Applies a specific commit from another branch to your current branch.
- Commit Hash: Unique identifier of a commit.

### Example

```
git switch main

git cherry-pick abc123
```

### Use Case

A bug fix is committed in the development branch, but you need that specific fix in the production branch without merging the entire development branch.

Use cherry-pick.

## 13. GitHub Collaboration & Pull Requests

### Terminology

- Pull Request (PR): Request to merge code into another branch.
- Code Review: Checking another developer's code for quality and correctness.
- Reviewer: Person who reviews the PR.
- Assignee: Person responsible for completing a task or PR.
- Merge: Integrates the PR into its target branch.
- Fork: Your own copy of another repository.
- Issue: Used to track bugs, features and tasks.
- CI/CD: Automated build, testing and deployment workflows.
- Protected Branch: Branch with restrictions such as required reviews or status checks.

### Typical Team Workflow

```
1. Pull latest main
2. Create feature branch
3. Write code
4. Test code
5. Commit changes
6. Push feature branch
7. Create Pull Request
8. Code Review
9. Fix review comments
10. Merge into main
```

### Important Git Commands

```
git switch main
git pull origin main

git switch -c feature-payment

# Work on code

git add .
git commit -m "Added payment API"

git push -u origin feature-payment
```

## 14. Git Important Files & Concepts

### `.gitignore`

- .gitignore: Specifies intentionally untracked files that Git should ignore.
- Common examples: build folders, dependencies, logs, environment files.

Example:

```
node_modules/
.env
*.log
target/
.DS_Store
```

### Important Rules

- `.gitignore` does not automatically untrack files already tracked by Git.
- To stop tracking an already committed file:

```
git rm --cached .env
git commit -m "Stop tracking env file"
```

### `.git` Directory

- Contains repository metadata, Git objects, references and configuration.
- Deleting it removes the repository's Git tracking information, but normally leaves project files.

### Git Object Types

- Blob: Stores file content.
- Tree: Stores directory structure and references to blobs or other trees.
- Commit: Stores a snapshot reference, parent information and metadata.
- Tag: Can store an annotated tag object.

### Git Hooks

- Scripts that run automatically at specific Git events.
- Examples: `pre-commit`, `commit-msg`, `pre-push`.
- Used for formatting, linting and validation.

## 15. Git Important Interview Questions

1\. What is Git?

Git is a distributed version control system used to track code changes and collaborate with developers.

2\. Git vs GitHub?

Git is a version control tool. GitHub is a platform for hosting Git repositories and collaboration.

3\. What is a commit?

A commit is a saved snapshot of staged changes in the repository.

4\. What is HEAD?

HEAD points to the current commit or branch checkout.

5\. What is the staging area?

It is an intermediate area where we prepare changes before committing.

6\. What is the difference between fetch and pull?

Fetch downloads remote changes without integrating them. Pull downloads and integrates them.

7\. What is the difference between merge and rebase?

Merge joins branch histories, while rebase replays commits on top of another base.

8\. How do you resolve merge conflicts?

I manually check the conflicting files, choose the correct changes, remove conflict markers, stage the files and complete the merge.

9\. How do you undo the last commit?

Use `git reset` if I need to move the branch backward. Use `git revert` if the commit is already shared.

10\. What is Git stash?

It temporarily saves uncommitted changes so I can work on something else.

11\. What is cherry-pick?

It applies a specific commit from another branch to the current branch.

12\. What is a fork?

A fork is an independent copy of another user's repository on a hosting platform.

13\. What is a detached HEAD?

HEAD points directly to a commit instead of a branch. New commits created there may not belong to a branch unless you create one.

14\. What is origin?

It is the conventional default name for a remote repository.

15\. What is the difference between `git reset` and `git revert`?

Reset moves the branch pointer, while revert creates a new commit that reverses previous changes.


# DAILY DEVELOPMENT — GIT

## 1. Git Daily Workflow

```
# Check branch and changes
git status

# Get latest main branch changes
git pull origin main

# Create feature branch
git switch -c feature-login

# Stage changes
git add .

# Commit
git commit -m "Added login API"

# Push
git push -u origin feature-login

# Check commit history
git log --oneline
```

# CONFUSING DIFFERENCES — GIT

## Git

| Concepts              | Difference                                            |
| --------------------- | ----------------------------------------------------- |
| Git vs GitHub         | Version control tool vs hosting platform              |
| Clone vs Fork         | Local copy vs hosted independent copy                 |
| Add vs Commit         | Stage changes vs save snapshot                        |
| Commit vs Push        | Save locally vs upload remotely                       |
| Fetch vs Pull         | Download only vs download and integrate               |
| Merge vs Rebase       | Join histories vs replay commits                      |
| Reset vs Revert       | Move branch pointer vs create reversing commit        |
| Restore vs Reset      | Restore file/staging state vs move HEAD/change index  |
| Apply vs Pop          | Apply stash and keep it vs apply and remove it        |
| Branch vs Tag         | Movable reference vs normally fixed reference         |
| Merge vs Cherry-pick  | Combine branch histories vs apply one specific commit |
| Soft vs Mixed vs Hard | Keep staged vs keep unstaged vs discard changes       |


# QUICK REVISION — GIT

## Git: Top 20 Commands

```
git init
git clone <url>
git status
git add .
git commit -m "message"
git log --oneline
git diff
git branch
git switch -c feature
git switch main
git merge feature
git rebase main
git fetch
git pull
git push
git stash
git stash pop
git revert <commit>
git reset --soft HEAD~1
git remote -v
```
