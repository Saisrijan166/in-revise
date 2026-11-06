// AUTO-GENERATED from reference/git.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs git
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const gitCheatsheet: CheatDoc = {
 "title": "Git",
 "tagline": "The whole tool on one page — commands, branching and the rules to remember.",
 "chapters": [
  {
   "id": "fundamentals",
   "title": "Fundamentals"
  },
  {
   "id": "setup",
   "title": "Setup"
  },
  {
   "id": "everyday-changes",
   "title": "Everyday Changes"
  },
  {
   "id": "branching",
   "title": "Branching"
  },
  {
   "id": "remotes-and-github",
   "title": "Remotes and GitHub"
  },
  {
   "id": "undoing-changes",
   "title": "Undoing Changes"
  },
  {
   "id": "stash-and-tags",
   "title": "Stash and Tags"
  },
  {
   "id": "workflow-and-internals",
   "title": "Workflow and Internals"
  },
  {
   "id": "why-x-vs-y",
   "title": "Why X vs Y"
  }
 ],
 "sections": [
  {
   "id": "s-what-git-is",
   "num": null,
   "title": "What Git Is",
   "stars": 1,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Git is a distributed version control system that tracks changes in files over time so you can save snapshots of your code and collaborate without overwriting each other."
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Repository (repo):"
            }
           ]
          },
          {
           "type": "text",
           "value": " a project folder Git tracks. Lives "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "locally"
            }
           ]
          },
          {
           "type": "text",
           "value": " on your machine and, usually, "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "remotely"
            }
           ]
          },
          {
           "type": "text",
           "value": " on a host."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Git vs GitHub:"
            }
           ]
          },
          {
           "type": "text",
           "value": " Git is the version-control tool; GitHub (like GitLab, Bitbucket) is a platform that hosts Git repos and adds collaboration. They are different things."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Git tracks snapshots; GitHub hosts them."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-the-three-areas",
   "num": null,
   "title": "The Three Areas",
   "stars": 2,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Every change moves through three places before it reaches the remote."
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Area"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "What it holds"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Working Directory"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Files you are currently editing"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Staging Area (index)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Changes prepared for the next commit"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Local Repository"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Committed snapshots in Git history"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The remote repository (e.g. GitHub) is the fourth place you share to."
      }
     ]
    },
    {
     "type": "code",
     "value": "git add file.txt     # working -> staging\ngit commit -m \"msg\"  # staging -> local repo\ngit push             # local repo -> remote",
     "lang": "bash"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: add stages, commit saves locally, push uploads, pull brings remote changes back."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-core-vocabulary",
   "num": null,
   "title": "Core Vocabulary",
   "stars": 0,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Commit:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a saved snapshot of staged changes, with parent and metadata."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "HEAD:"
            }
           ]
          },
          {
           "type": "text",
           "value": " pointer to your current commit, usually the tip of the current branch."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Branch:"
            }
           ]
          },
          {
           "type": "text",
           "value": " an independent line of development pointing to a commit."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Clone:"
            }
           ]
          },
          {
           "type": "text",
           "value": " make a local copy of a remote repo (with its history)."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Fork:"
            }
           ]
          },
          {
           "type": "text",
           "value": " your own hosted copy of someone else's repo."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Conflict:"
            }
           ]
          },
          {
           "type": "text",
           "value": " when Git cannot automatically combine two sets of changes."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-how-git-stores-data",
   "num": null,
   "title": "How Git Stores Data",
   "stars": 0,
   "chapter": "fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Git saves content as objects inside the "
      },
      {
       "type": "inlineCode",
       "value": ".git"
      },
      {
       "type": "text",
       "value": " directory."
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Object"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Stores"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Blob"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "File content"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Tree"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Directory structure and references to blobs/trees"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Commit"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Snapshot reference, parent, and metadata"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Tag"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "An annotated tag object"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The "
      },
      {
       "type": "inlineCode",
       "value": ".git"
      },
      {
       "type": "text",
       "value": " directory holds all metadata, objects, references and config. Deleting it removes Git tracking but normally leaves your project files."
      }
     ]
    }
   ]
  },
  {
   "id": "s-configuring-git",
   "num": null,
   "title": "Configuring Git",
   "stars": 0,
   "chapter": "setup",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "git config"
      },
      {
       "type": "text",
       "value": " sets Git's identity and behaviour. Your name and email become the commit author."
      }
     ]
    },
    {
     "type": "code",
     "value": "git config --global user.name \"Srijan\"\ngit config --global user.email \"email@example.com\"\ngit config --list        # show configuration",
     "lang": "bash"
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Scope"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Applies to"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "--global"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "All repos for your user"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "--local"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "The current repo only"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: local config overrides global when both set the same value."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-starting-a-repository",
   "num": null,
   "title": "Starting a Repository",
   "stars": 1,
   "chapter": "setup",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Two ways to get a repo: create a new one or copy an existing one."
      }
     ]
    },
    {
     "type": "code",
     "value": "git init                                     # new empty repo\ngit clone https://github.com/user/project.git  # copy existing repo + history\ngit remote add origin <url>                  # link a remote\ngit remote -v                                # show remote URLs",
     "lang": "bash"
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "git init"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "git clone"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Creates a new local repo"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Copies an existing repo"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "No history downloaded"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Downloads existing history"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "For new projects"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "For existing projects"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "origin"
        }
       ]
      },
      {
       "type": "text",
       "value": " is the conventional name for the main remote; "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "main"
        }
       ]
      },
      {
       "type": "text",
       "value": " is the common default branch."
      }
     ]
    }
   ]
  },
  {
   "id": "s-inspecting-and-saving",
   "num": null,
   "title": "Inspecting and Saving",
   "stars": 2,
   "chapter": "everyday-changes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The daily loop: check status, stage, commit, review history."
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Command"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Purpose"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "git status"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Show current changes"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "git add ."
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Stage changes in current dir + subdirs"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "git add -A"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Stage adds, edits and deletions across the tree"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "git commit -m \"msg\""
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Commit staged changes"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "git log --oneline"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Compact history"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "git show"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Details of a commit"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "git rm file"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "git mv old new"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Remove / rename a tracked file"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: "
        },
        {
         "type": "inlineCode",
         "value": "git commit"
        },
        {
         "type": "text",
         "value": " only records what is staged."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-viewing-differences",
   "num": null,
   "title": "Viewing Differences",
   "stars": 0,
   "chapter": "everyday-changes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "git diff"
      },
      {
       "type": "text",
       "value": " shows what changed, depending on what you compare."
      }
     ]
    },
    {
     "type": "code",
     "value": "git diff            # working directory vs staging area\ngit diff --staged   # staging area vs last commit",
     "lang": "bash"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: plain "
        },
        {
         "type": "inlineCode",
         "value": "diff"
        },
        {
         "type": "text",
         "value": " = not yet staged; "
        },
        {
         "type": "inlineCode",
         "value": "--staged"
        },
        {
         "type": "text",
         "value": " = staged but not committed."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-fixing-the-last-commit-amend",
   "num": null,
   "title": "Fixing the Last Commit (amend)",
   "stars": 0,
   "chapter": "everyday-changes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Use amend to correct the most recent commit's message or add forgotten changes. It rewrites that commit, so avoid amending commits already pushed."
      }
     ]
    },
    {
     "type": "code",
     "value": "git commit --amend -m \"Corrected message\"",
     "lang": "bash"
    }
   ]
  },
  {
   "id": "s-gitignore",
   "num": null,
   "title": ".gitignore",
   "stars": 0,
   "chapter": "everyday-changes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": ".gitignore"
      },
      {
       "type": "text",
       "value": " lists files Git should intentionally not track, e.g. build output, dependencies, logs, secrets."
      }
     ]
    },
    {
     "type": "code",
     "value": "node_modules/\n.env\n*.log\ntarget/",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "It does "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "not"
        }
       ]
      },
      {
       "type": "text",
       "value": " untrack files Git already tracks. To stop tracking one:"
      }
     ]
    },
    {
     "type": "code",
     "value": "git rm --cached .env\ngit commit -m \"Stop tracking env file\"",
     "lang": "bash"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: "
        },
        {
         "type": "inlineCode",
         "value": ".gitignore"
        },
        {
         "type": "text",
         "value": " prevents future tracking, not existing tracking."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-working-with-branches",
   "num": null,
   "title": "Working With Branches",
   "stars": 1,
   "chapter": "branching",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A branch is a movable pointer to a commit; creating one does not copy the project physically."
      }
     ]
    },
    {
     "type": "code",
     "value": "git branch                 # list\ngit switch -c feature-login  # create and switch\ngit switch main            # switch back\ngit branch -d feature-login  # delete if merged\ngit branch -D feature-login  # force delete (may lose work)",
     "lang": "bash"
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "inlineCode",
           "value": "switch"
          },
          {
           "type": "text",
           "value": " is the modern command for changing branches; "
          },
          {
           "type": "inlineCode",
           "value": "checkout"
          },
          {
           "type": "text",
           "value": " also switches but additionally restores files."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "inlineCode",
           "value": "-d"
          },
          {
           "type": "text",
           "value": " deletes only a safely merged branch; "
          },
          {
           "type": "inlineCode",
           "value": "-D"
          },
          {
           "type": "text",
           "value": " forces it."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "You cannot switch if uncommitted changes would be overwritten."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-merging",
   "num": null,
   "title": "Merging",
   "stars": 2,
   "chapter": "branching",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Merge combines another branch's changes into your current branch."
      }
     ]
    },
    {
     "type": "code",
     "value": "git switch main\ngit merge feature-login",
     "lang": "bash"
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Type"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "When it happens"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Fast-forward"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Target branch hasn't moved since the feature branched; pointer just moves forward"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Three-way"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Both branches have new commits; Git builds a merge commit from their common ancestor"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "merge commit"
        }
       ]
      },
      {
       "type": "text",
       "value": " joins two histories and usually has two parents."
      }
     ]
    }
   ]
  },
  {
   "id": "s-resolving-conflicts",
   "num": null,
   "title": "Resolving Conflicts",
   "stars": 2,
   "chapter": "branching",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A conflict appears when Git can't auto-combine overlapping edits. Git marks the file:"
      }
     ]
    },
    {
     "type": "code",
     "value": "<<<<<<< HEAD\nHello World\n=======\nHello Git\n>>>>>>> feature-login",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Steps: open the file, pick the right changes, remove the markers, save, then stage and commit."
      }
     ]
    },
    {
     "type": "code",
     "value": "git add .\ngit commit",
     "lang": "bash"
    }
   ]
  },
  {
   "id": "s-rebase",
   "num": null,
   "title": "Rebase",
   "stars": 2,
   "chapter": "branching",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Rebase replays your commits on top of another base to keep history linear. Good for updating a feature branch before merging."
      }
     ]
    },
    {
     "type": "code",
     "value": "git switch feature-login\ngit rebase main\ngit rebase -i HEAD~3   # interactive: squash, reword, reorder, drop",
     "lang": "bash"
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Rebase rewrites history and gives commits new IDs."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Never rebase shared branches others already use."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "After rebasing a pushed branch, push with "
          },
          {
           "type": "inlineCode",
           "value": "--force-with-lease"
          },
          {
           "type": "text",
           "value": "."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: merge joins histories; rebase replays commits on a new base."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-cherry-pick",
   "num": null,
   "title": "Cherry-pick",
   "stars": 0,
   "chapter": "branching",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Cherry-pick applies one specific commit from another branch onto your current branch, without merging the whole branch."
      }
     ]
    },
    {
     "type": "code",
     "value": "git switch main\ngit cherry-pick abc123",
     "lang": "bash"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Use it when a single fix from, say, "
      },
      {
       "type": "inlineCode",
       "value": "develop"
      },
      {
       "type": "text",
       "value": " is needed on "
      },
      {
       "type": "inlineCode",
       "value": "production"
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    }
   ]
  },
  {
   "id": "s-fetch-pull-push",
   "num": null,
   "title": "Fetch, Pull, Push",
   "stars": 2,
   "chapter": "remotes-and-github",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "These move commits between local and remote."
      }
     ]
    },
    {
     "type": "code",
     "value": "git fetch origin            # download remote updates, don't integrate\ngit pull origin main        # fetch + integrate\ngit push origin main        # upload local commits\ngit push -u origin feature  # first push, set upstream\ngit branch -r / -a          # remote / all branches",
     "lang": "bash"
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Command"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Meaning"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Fetch"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Download only"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Pull"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Fetch + integrate (merge, or rebase with "
          },
          {
           "type": "inlineCode",
           "value": "--pull --rebase"
          },
          {
           "type": "text",
           "value": ")"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Push"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Upload local commits"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "inlineCode",
           "value": "git push"
          },
          {
           "type": "text",
           "value": " is rejected if the remote has commits you lack — pull first."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "inlineCode",
           "value": "-u"
          },
          {
           "type": "text",
           "value": " sets the "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "upstream (tracking) branch"
            }
           ]
          },
          {
           "type": "text",
           "value": " so future "
          },
          {
           "type": "inlineCode",
           "value": "push"
          },
          {
           "type": "text",
           "value": "/"
          },
          {
           "type": "inlineCode",
           "value": "pull"
          },
          {
           "type": "text",
           "value": " need no arguments."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-pull-requests-and-collaboration",
   "num": null,
   "title": "Pull Requests and Collaboration",
   "stars": 0,
   "chapter": "remotes-and-github",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Pull Request (PR)"
        }
       ]
      },
      {
       "type": "text",
       "value": " asks to merge your branch into another, so teammates can review before it lands."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Typical flow:"
      }
     ]
    },
    {
     "type": "code",
     "value": "git switch main\ngit pull origin main\ngit switch -c feature-payment\n# work, then:\ngit add .\ngit commit -m \"Added payment API\"\ngit push -u origin feature-payment\n# open a PR, address review comments, merge",
     "lang": "bash"
    },
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Fork:"
            }
           ]
          },
          {
           "type": "text",
           "value": " your own hosted copy, used to contribute to repos you can't push to directly."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Protected branch:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a branch with rules like required reviews or passing CI/CD checks before merge."
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-restore-reset-revert-clean",
   "num": null,
   "title": "Restore, Reset, Revert, Clean",
   "stars": 3,
   "chapter": "undoing-changes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Pick the tool by what you want to undo."
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Command"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Undoes"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "git restore file"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Discard unstaged changes in a file"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "git restore --staged file"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Unstage a file (keep its changes)"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "git reset HEAD~1"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Remove last commit"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "git revert <commit>"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "New commit that reverses an old one"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "git clean -fd"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Delete untracked files and directories"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-the-three-resets",
   "num": null,
   "title": "The Three Resets",
   "stars": 2,
   "chapter": "undoing-changes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "git reset"
      },
      {
       "type": "text",
       "value": " moves the branch pointer back; the flag decides what happens to the changes."
      }
     ]
    },
    {
     "type": "table",
     "align": [
      null,
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Flag"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Commit removed?"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Changes left as"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "--soft"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Yes"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Staged"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "--mixed"
          },
          {
           "type": "text",
           "value": " (default)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Yes"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Unstaged"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "--hard"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Yes"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Discarded"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "git reset --soft HEAD~1   # keep changes staged\ngit reset HEAD~1          # keep changes unstaged\ngit reset --hard HEAD~1   # throw changes away",
     "lang": "bash"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: soft keeps staged, mixed keeps unstaged, hard deletes."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-reset-vs-revert",
   "num": null,
   "title": "Reset vs Revert",
   "stars": 1,
   "chapter": "undoing-changes",
   "nodes": [
    {
     "type": "list",
     "ordered": false,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Reset"
            }
           ]
          },
          {
           "type": "text",
           "value": " moves the branch pointer backward and can rewrite history."
          }
         ]
        }
       ]
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Revert"
            }
           ]
          },
          {
           "type": "text",
           "value": " adds a new commit that undoes an earlier one, keeping history intact."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: for commits already pushed and shared, use "
        },
        {
         "type": "inlineCode",
         "value": "revert"
        },
        {
         "type": "text",
         "value": ", not "
        },
        {
         "type": "inlineCode",
         "value": "reset"
        },
        {
         "type": "text",
         "value": "."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-stash",
   "num": null,
   "title": "Stash",
   "stars": 1,
   "chapter": "stash-and-tags",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Stash temporarily shelves uncommitted changes so you can switch context, e.g. drop a half-done feature to fix an urgent bug, then come back."
      }
     ]
    },
    {
     "type": "code",
     "value": "git stash          # save changes\ngit stash -u       # include untracked files\ngit stash list     # show stashes\ngit stash apply    # reapply, keep the stash\ngit stash pop      # reapply and remove the stash\ngit stash drop / clear  # delete one / all",
     "lang": "bash"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: "
        },
        {
         "type": "inlineCode",
         "value": "apply"
        },
        {
         "type": "text",
         "value": " keeps the stash; "
        },
        {
         "type": "inlineCode",
         "value": "pop"
        },
        {
         "type": "text",
         "value": " removes it after applying."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-tags",
   "num": null,
   "title": "Tags",
   "stars": 0,
   "chapter": "stash-and-tags",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A tag is a named reference to a specific commit, usually marking a release."
      }
     ]
    },
    {
     "type": "code",
     "value": "git tag v1.0                      # lightweight\ngit tag -a v1.0 -m \"First release\"  # annotated (tagger, date, message)\ngit push origin v1.0              # push one tag\ngit push origin --tags            # push all tags",
     "lang": "bash"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: a branch moves with new commits; a tag normally stays fixed on its commit."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-a-good-daily-workflow",
   "num": null,
   "title": "A Good Daily Workflow",
   "stars": 0,
   "chapter": "workflow-and-internals",
   "nodes": [
    {
     "type": "code",
     "value": "git status\ngit pull origin main\ngit switch -c feature-login\ngit add .\ngit commit -m \"Added login API\"\ngit push -u origin feature-login",
     "lang": "bash"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Keep commits small and focused with a clear message describing what changed."
      }
     ]
    }
   ]
  },
  {
   "id": "s-detached-head",
   "num": null,
   "title": "Detached HEAD",
   "stars": 0,
   "chapter": "workflow-and-internals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "HEAD is \"detached\" when it points directly at a commit instead of a branch. New commits there belong to no branch unless you create one, so they can be lost."
      }
     ]
    }
   ]
  },
  {
   "id": "s-git-hooks",
   "num": null,
   "title": "Git Hooks",
   "stars": 0,
   "chapter": "workflow-and-internals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Hooks are scripts Git runs automatically at events like "
      },
      {
       "type": "inlineCode",
       "value": "pre-commit"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "commit-msg"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "pre-push"
      },
      {
       "type": "text",
       "value": ". They are used for formatting, linting and validation."
      }
     ]
    }
   ]
  },
  {
   "id": "s-quick-comparison-table",
   "num": null,
   "title": "Quick Comparison Table",
   "stars": 2,
   "chapter": "why-x-vs-y",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
      null
     ],
     "children": [
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Pair"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Difference"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Git vs GitHub"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Version-control tool vs hosting platform"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Clone vs Fork"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Local copy vs hosted independent copy"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Add vs Commit"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Stage changes vs save snapshot"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Commit vs Push"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Save locally vs upload remotely"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Fetch vs Pull"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Download only vs download and integrate"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Merge vs Rebase"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Join histories vs replay commits on a new base"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Reset vs Revert"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Move branch pointer vs add a reversing commit"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Restore vs Reset"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Restore file/staging state vs move HEAD / change index"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Apply vs Pop"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Reapply stash and keep it vs reapply and remove it"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Branch vs Tag"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Movable reference vs fixed reference"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Merge vs Cherry-pick"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Combine whole histories vs apply one commit"
          }
         ]
        }
       ]
      },
      {
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Soft vs Mixed vs Hard"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Keep staged vs keep unstaged vs discard"
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  }
 ]
};
