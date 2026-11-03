import type { SyntaxSheet } from "./types";

export const git: SyntaxSheet = {
  tagline: "The Git commands you run every day, grouped by workflow.",
  baseline: "Git 2.x",
  lang: "bash",
  groups: [
    {
      title: "Setup",
      rows: [
        {
          syntax: "git init",
          what: "Start a repo in this folder",
          example: "git init",
        },
        {
          syntax: "git clone <url>",
          what: "Copy a remote repo",
          example: "git clone https://github.com/u/repo.git",
        },
        {
          syntax: "git clone <url> <dir>",
          what: "Clone into a named folder",
          example: "git clone <url> myapp",
        },
        {
          syntax: "git config --global user.name",
          what: "Set your name for all repos",
          example: 'git config --global user.name "Ayush"',
        },
        {
          syntax: "git config --global user.email",
          what: "Set your commit email",
          example: 'git config --global user.email "a@x.com"',
        },
        {
          syntax: "git config --list",
          what: "Show current config",
          example: "git config --list",
        },
      ],
    },
    {
      title: "Staging and commit",
      rows: [
        {
          syntax: "git status",
          what: "What changed / is staged",
          example: "git status -s   # short form",
        },
        {
          syntax: "git add <file>",
          what: "Stage one file",
          example: "git add src/app.js",
        },
        {
          syntax: "git add -A",
          what: "Stage all (incl. deletes)",
          example: "git add -A",
        },
        {
          syntax: "git add .",
          what: "Stage this dir downward",
          example: "git add .",
        },
        {
          syntax: 'git commit -m "msg"',
          what: "Commit staged changes",
          example: 'git commit -m "Fix login bug"',
        },
        {
          syntax: 'git commit -am "msg"',
          what: "Stage tracked + commit",
          example: 'git commit -am "Tidy up"',
        },
        {
          syntax: "git commit --amend",
          what: "Redo the last commit",
          example: 'git commit --amend -m "New msg"',
        },
        {
          syntax: "git rm / git mv",
          what: "Remove / rename, tracked",
          example: "git rm old.txt",
        },
      ],
    },
    {
      title: "Inspect history",
      rows: [
        {
          syntax: "git log --oneline",
          what: "Compact history",
          example: "git log --oneline -10",
        },
        {
          syntax: "git log --oneline --graph",
          what: "Branch graph view",
          example: "git log --oneline --graph --all",
        },
        {
          syntax: "git diff",
          what: "Unstaged changes",
          example: "git diff src/app.js",
        },
        {
          syntax: "git diff --staged",
          what: "Staged changes",
          example: "git diff --staged",
        },
        {
          syntax: "git show <ref>",
          what: "One commit's details",
          example: "git show HEAD~1",
        },
        {
          syntax: "git blame <file>",
          what: "Who changed each line",
          example: "git blame README.md",
        },
      ],
    },
    {
      title: "Branching and merging",
      rows: [
        {
          syntax: "git branch",
          what: "List branches",
          example: "git branch -a   # incl. remote",
        },
        {
          syntax: "git switch <name>",
          what: "Change branch",
          example: "git switch main",
        },
        {
          syntax: "git switch -c <name>",
          what: "Create + switch",
          example: "git switch -c feature/login",
        },
        {
          syntax: "git checkout <name>",
          what: "Older switch command",
          example: "git checkout main",
        },
        {
          syntax: "git merge <name>",
          what: "Merge branch into current",
          example: "git merge feature/login",
        },
        {
          syntax: "git rebase <base>",
          what: "Replay commits onto base",
          example: "git rebase main",
        },
        {
          syntax: "git cherry-pick <ref>",
          what: "Copy one commit here",
          example: "git cherry-pick a1b2c3d",
        },
        {
          syntax: "git branch -d <name>",
          what: "Delete merged branch",
          example: "git branch -d feature/login",
        },
      ],
      combos: [
        {
          label: "Feature-branch workflow",
          code: `git switch -c feature/login     # branch off main
# ...edit files...
git add -A
git commit -m "Add login form"
git switch main
git pull                        # get latest main
git merge feature/login         # bring the feature in
git branch -d feature/login     # clean up`,
        },
      ],
    },
    {
      title: "Remotes",
      rows: [
        {
          syntax: "git remote -v",
          what: "List remotes + URLs",
          example: "git remote -v",
        },
        {
          syntax: "git remote add <name> <url>",
          what: "Add a remote",
          example: "git remote add origin <url>",
        },
        {
          syntax: "git fetch",
          what: "Download, don't merge",
          example: "git fetch origin",
        },
        {
          syntax: "git pull",
          what: "Fetch + merge current branch",
          example: "git pull origin main",
        },
        {
          syntax: "git push",
          what: "Upload commits",
          example: "git push origin main",
        },
        {
          syntax: "git push -u <remote> <branch>",
          what: "Push + set upstream",
          example: "git push -u origin feature/login",
        },
      ],
    },
    {
      title: "Undo and restore",
      rows: [
        {
          syntax: "git restore <file>",
          what: "Discard unstaged changes",
          example: "git restore src/app.js",
        },
        {
          syntax: "git restore --staged <file>",
          what: "Unstage, keep edits",
          example: "git restore --staged app.js",
        },
        {
          syntax: "git reset --soft <ref>",
          what: "Move HEAD, keep staged",
          example: "git reset --soft HEAD~1",
        },
        {
          syntax: "git reset --mixed <ref>",
          what: "Unstage (default reset)",
          example: "git reset HEAD~1",
        },
        {
          syntax: "git reset --hard <ref>",
          what: "Throw away changes (danger)",
          example: "git reset --hard HEAD~1",
        },
        {
          syntax: "git revert <ref>",
          what: "New commit that undoes one",
          example: "git revert a1b2c3d",
        },
        {
          syntax: "git clean -fd",
          what: "Delete untracked files/dirs",
          example: "git clean -fd",
        },
      ],
      combos: [
        {
          label: "Undo the last commit, keep the changes",
          code: `git reset --soft HEAD~1    # commit undone, edits still staged
# ...fix things...
git commit -m "Correct message"

# Already pushed? Undo safely with a new commit:
git revert HEAD`,
        },
        {
          label: "Resolve a merge conflict",
          code: `git merge feature        # CONFLICT in app.js
# edit app.js, remove <<<<<<< ======= >>>>>>> markers
git add app.js           # mark it resolved
git commit               # finish the merge
# (or 'git merge --abort' to back out)`,
        },
      ],
    },
    {
      title: "Stash",
      rows: [
        {
          syntax: "git stash",
          what: "Shelve changes, clean tree",
          example: "git stash",
        },
        {
          syntax: 'git stash push -m "msg"',
          what: "Stash with a label",
          example: 'git stash push -m "wip login"',
        },
        {
          syntax: "git stash pop",
          what: "Re-apply + drop stash",
          example: "git stash pop",
        },
        {
          syntax: "git stash apply",
          what: "Re-apply, keep stash",
          example: "git stash apply",
        },
        {
          syntax: "git stash list",
          what: "Show saved stashes",
          example: "git stash list",
        },
        {
          syntax: "git stash drop / clear",
          what: "Delete one / all stashes",
          example: "git stash drop stash@{0}",
        },
      ],
    },
    {
      title: "Tags",
      rows: [
        {
          syntax: "git tag",
          what: "List tags",
          example: "git tag",
        },
        {
          syntax: "git tag <name>",
          what: "Lightweight tag",
          example: "git tag v1.0.0",
        },
        {
          syntax: 'git tag -a <name> -m "msg"',
          what: "Annotated tag (release)",
          example: 'git tag -a v1.0.0 -m "First release"',
        },
        {
          syntax: "git push <remote> <tag>",
          what: "Push one tag",
          example: "git push origin v1.0.0",
        },
        {
          syntax: "git push --tags",
          what: "Push all tags",
          example: "git push --tags",
        },
      ],
    },
  ],
};
