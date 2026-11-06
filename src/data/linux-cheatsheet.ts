// AUTO-GENERATED from reference/linux.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs linux
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const linuxCheatsheet: CheatDoc = {
 "title": "Linux",
 "tagline": "The whole topic on one page — the shell, commands and the rules to remember.",
 "chapters": [
  {
   "id": "basics-and-the-shell",
   "title": "Basics and the Shell"
  },
  {
   "id": "filesystem-and-navigation",
   "title": "Filesystem and Navigation"
  },
  {
   "id": "working-with-files",
   "title": "Working with Files"
  },
  {
   "id": "permissions-and-users",
   "title": "Permissions and Users"
  },
  {
   "id": "search-and-text",
   "title": "Search and Text"
  },
  {
   "id": "processes-and-jobs",
   "title": "Processes and Jobs"
  },
  {
   "id": "packages-services-and-system",
   "title": "Packages, Services and System"
  },
  {
   "id": "networking",
   "title": "Networking"
  },
  {
   "id": "common-why-x-vs-y-comparisons",
   "title": "Common \"Why X vs Y?\" Comparisons"
  }
 ],
 "sections": [
  {
   "id": "s-what-linux-is",
   "num": null,
   "title": "What Linux Is",
   "stars": 1,
   "chapter": "basics-and-the-shell",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Linux is an open-source operating system "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "kernel"
        }
       ]
      },
      {
       "type": "text",
       "value": " — the core that manages CPU, memory, processes, devices and hardware. A "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "distribution"
        }
       ]
      },
      {
       "type": "text",
       "value": " (Ubuntu, Fedora, Debian) is a full OS built around that kernel."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The system is layered: your apps sit on top, the shell and system libraries below them, the kernel below that, and the hardware at the bottom."
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
           "type": "text",
           "value": "Kernel: core that controls hardware and resources."
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
           "value": "Userspace: everything above the kernel (shells, tools, your apps)."
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
         "value": "Remember: Linux is the kernel; a distro is the whole OS built around it."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-shell-terminal-and-commands",
   "num": null,
   "title": "Shell, Terminal and Commands",
   "stars": 0,
   "chapter": "basics-and-the-shell",
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
             "value": "Shell"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a program that reads and runs commands (Bash is the common one)."
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
             "value": "Terminal"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the window where you type into a shell."
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
             "value": "CLI / GUI"
            }
           ]
          },
          {
           "type": "text",
           "value": ": command-line vs graphical interface."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "whoami     # current user\nuname -a   # kernel and system info\npwd        # current directory",
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
         "value": "Remember: the terminal is the window; the shell is the program that runs the commands inside it."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-pipes-and-redirection",
   "num": null,
   "title": "Pipes and Redirection",
   "stars": 1,
   "chapter": "basics-and-the-shell",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Every command has three streams: "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "stdin"
        }
       ]
      },
      {
       "type": "text",
       "value": " (input, FD 0), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "stdout"
        }
       ]
      },
      {
       "type": "text",
       "value": " (output, FD 1) and "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "stderr"
        }
       ]
      },
      {
       "type": "text",
       "value": " (errors, FD 2). A "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "pipe"
        }
       ]
      },
      {
       "type": "text",
       "value": " sends one command's output into another; "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "redirection"
        }
       ]
      },
      {
       "type": "text",
       "value": " sends a stream to or from a file."
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
           "value": "Operator"
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
           "type": "inlineCode",
           "value": ">"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "redirect output, overwrite file"
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
           "value": ">>"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "append output to file"
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
           "value": "<"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "read input from file"
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
           "value": "2>"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "redirect errors (stderr)"
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
           "value": "2>&1"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "send stderr to wherever stdout goes"
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
           "value": "|"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "pipe output into the next command"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "echo \"Hello\" > file.txt        # overwrite\necho \"World\" >> file.txt       # append\ncommand > out.log 2>&1         # output and errors to one file\nps aux | grep java             # list processes, keep only java lines",
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
         "value": ">"
        },
        {
         "type": "text",
         "value": " overwrites, "
        },
        {
         "type": "inlineCode",
         "value": ">>"
        },
        {
         "type": "text",
         "value": " appends, "
        },
        {
         "type": "inlineCode",
         "value": "|"
        },
        {
         "type": "text",
         "value": " connects commands; "
        },
        {
         "type": "inlineCode",
         "value": "2>"
        },
        {
         "type": "text",
         "value": " is errors only."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-environment-variables",
   "num": null,
   "title": "Environment Variables",
   "stars": 0,
   "chapter": "basics-and-the-shell",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Named values that processes can read, such as "
      },
      {
       "type": "inlineCode",
       "value": "PATH"
      },
      {
       "type": "text",
       "value": " (where the shell looks for commands), "
      },
      {
       "type": "inlineCode",
       "value": "HOME"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "USER"
      },
      {
       "type": "text",
       "value": " and "
      },
      {
       "type": "inlineCode",
       "value": "PWD"
      },
      {
       "type": "text",
       "value": ". "
      },
      {
       "type": "inlineCode",
       "value": "export"
      },
      {
       "type": "text",
       "value": " passes a variable to child processes."
      }
     ]
    },
    {
     "type": "code",
     "value": "echo $HOME            # read a variable\nexport NAME=\"Srijan\"  # set and export to child processes\nunset NAME            # remove it",
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
           "value": "$"
          },
          {
           "type": "text",
           "value": " reads a variable's value."
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
           "value": "Variables set in a shell are not permanent; persist them in "
          },
          {
           "type": "inlineCode",
           "value": "~/.bashrc"
          },
          {
           "type": "text",
           "value": " or "
          },
          {
           "type": "inlineCode",
           "value": "~/.profile"
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
         "value": "Remember: "
        },
        {
         "type": "inlineCode",
         "value": "export"
        },
        {
         "type": "text",
         "value": " makes a variable visible to child processes; config files make it survive new shells."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-the-directory-hierarchy",
   "num": null,
   "title": "The Directory Hierarchy",
   "stars": 1,
   "chapter": "filesystem-and-navigation",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Linux has one tree starting at "
      },
      {
       "type": "inlineCode",
       "value": "/"
      },
      {
       "type": "text",
       "value": " (root). Important branches:"
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
           "value": "Directory"
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
           "value": "/"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "top of the filesystem"
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
           "value": "/home"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "user home directories"
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
           "value": "/root"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "root user's home"
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
           "value": "/etc"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "system configuration files"
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
           "value": "/var"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "/var/log"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "changing data and logs"
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
           "value": "/tmp"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "temporary files"
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
           "value": "/usr"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "applications, libraries, utilities"
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
           "value": "/bin"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "/sbin"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "essential and admin commands"
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
           "value": "/opt"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "optional third-party apps"
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
           "value": "/dev"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "/proc"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "/sys"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "device files and virtual kernel/process info"
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
           "value": "/mnt"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "/media"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "mount points for disks and removable media"
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
         "value": "Remember: config lives in "
        },
        {
         "type": "inlineCode",
         "value": "/etc"
        },
        {
         "type": "text",
         "value": ", logs in "
        },
        {
         "type": "inlineCode",
         "value": "/var/log"
        },
        {
         "type": "text",
         "value": ", devices and kernel state in "
        },
        {
         "type": "inlineCode",
         "value": "/dev"
        },
        {
         "type": "text",
         "value": ", "
        },
        {
         "type": "inlineCode",
         "value": "/proc"
        },
        {
         "type": "text",
         "value": ", "
        },
        {
         "type": "inlineCode",
         "value": "/sys"
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
   "id": "s-paths-and-symbols",
   "num": null,
   "title": "Paths and Symbols",
   "stars": 0,
   "chapter": "filesystem-and-navigation",
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
             "value": "Absolute path"
            }
           ]
          },
          {
           "type": "text",
           "value": ": starts from "
          },
          {
           "type": "inlineCode",
           "value": "/"
          },
          {
           "type": "text",
           "value": " ("
          },
          {
           "type": "inlineCode",
           "value": "/home/srijan/Documents"
          },
          {
           "type": "text",
           "value": ")."
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
             "value": "Relative path"
            }
           ]
          },
          {
           "type": "text",
           "value": ": starts from where you are ("
          },
          {
           "type": "inlineCode",
           "value": "Documents"
          },
          {
           "type": "text",
           "value": ")."
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
           "value": "Linux paths are "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "case-sensitive"
            }
           ]
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
           "value": "Symbol"
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
           "type": "inlineCode",
           "value": "~"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "current user's home"
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
           "value": "."
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": ".."
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "current / parent directory"
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
           "value": "-"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "previous directory (with "
          },
          {
           "type": "inlineCode",
           "value": "cd -"
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
           "type": "inlineCode",
           "value": "*"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "?"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "match any characters / one character"
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
         "value": "Remember: absolute starts at "
        },
        {
         "type": "inlineCode",
         "value": "/"
        },
        {
         "type": "text",
         "value": "; relative starts at your current directory."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-moving-around",
   "num": null,
   "title": "Moving Around",
   "stars": 0,
   "chapter": "filesystem-and-navigation",
   "nodes": [
    {
     "type": "code",
     "value": "pwd          # where am I\nls -la       # long listing including hidden files\ncd Documents # enter a directory\ncd ..        # up one level\ncd ~         # home\ncd -         # back to previous directory",
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
           "value": "Hidden files start with "
          },
          {
           "type": "inlineCode",
           "value": "."
          },
          {
           "type": "text",
           "value": "; "
          },
          {
           "type": "inlineCode",
           "value": "ls -a"
          },
          {
           "type": "text",
           "value": " shows them."
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
           "value": "ls -l"
          },
          {
           "type": "text",
           "value": " shows permissions, owner, group, size and modified time."
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
         "value": "ls -la"
        },
        {
         "type": "text",
         "value": " is the everyday listing; "
        },
        {
         "type": "inlineCode",
         "value": "cd -"
        },
        {
         "type": "text",
         "value": " toggles back to where you just were."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-create-copy-move-delete",
   "num": null,
   "title": "Create, Copy, Move, Delete",
   "stars": 0,
   "chapter": "working-with-files",
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
           "value": "touch f"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "create empty file / update timestamp"
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
           "value": "mkdir d"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "mkdir -p a/b/c"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "make directory / nested directories"
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
           "value": "rmdir d"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "remove an "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "empty"
            }
           ]
          },
          {
           "type": "text",
           "value": " directory"
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
           "value": "rm f"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "rm -r d"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "rm -rf d"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "delete file / directory / force-delete"
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
           "value": "cp a b"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "cp -r a b"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "copy file / directory"
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
           "value": "mv old new"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "move or rename"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "mkdir project && cd project\ntouch Main.java\ncp Main.java Backup.java\nmv Backup.java OldMain.java   # rename\nrm OldMain.java",
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
           "value": "mv"
          },
          {
           "type": "text",
           "value": " does both move and rename."
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
           "value": "rm -rf"
          },
          {
           "type": "text",
           "value": " never asks for confirmation — dangerous."
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
         "value": "rmdir"
        },
        {
         "type": "text",
         "value": " only clears empty folders; "
        },
        {
         "type": "inlineCode",
         "value": "rm -r"
        },
        {
         "type": "text",
         "value": " clears full ones; "
        },
        {
         "type": "inlineCode",
         "value": "rm -rf"
        },
        {
         "type": "text",
         "value": " is irreversible."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-reading-files",
   "num": null,
   "title": "Reading Files",
   "stars": 0,
   "chapter": "working-with-files",
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
           "value": "cat f"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "print the whole file"
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
           "value": "less f"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "more f"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "scroll page by page"
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
           "value": "head -n 5 f"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "tail -n 20 f"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "first / last N lines"
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
           "value": "tail -f f"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "follow a file as it grows"
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
           "value": "wc f"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "count lines, words, bytes"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "tail -f /var/log/syslog   # watch logs live",
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
         "value": "tail -f"
        },
        {
         "type": "text",
         "value": " is the standard way to watch application logs in real time."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-links",
   "num": null,
   "title": "Links",
   "stars": 0,
   "chapter": "working-with-files",
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
             "value": "Hard link"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a second name pointing to the same file data on disk; the data stays until every hard link is gone."
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
             "value": "Symbolic (soft) link"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a small file that points to another path; it breaks if the target is removed."
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
         "value": "Remember: a hard link is another name for the same data; a symlink is a pointer to a path."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-reading-permissions",
   "num": null,
   "title": "Reading Permissions",
   "stars": 2,
   "chapter": "permissions-and-users",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A listing like "
      },
      {
       "type": "inlineCode",
       "value": "-rwxr-xr--"
      },
      {
       "type": "text",
       "value": " has four parts: file type, then "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "owner"
        }
       ]
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "group"
        }
       ]
      },
      {
       "type": "text",
       "value": " and "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "others"
        }
       ]
      },
      {
       "type": "text",
       "value": ", each with read ("
      },
      {
       "type": "inlineCode",
       "value": "r"
      },
      {
       "type": "text",
       "value": "), write ("
      },
      {
       "type": "inlineCode",
       "value": "w"
      },
      {
       "type": "text",
       "value": "), execute ("
      },
      {
       "type": "inlineCode",
       "value": "x"
      },
      {
       "type": "text",
       "value": ")."
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
           "value": "Permission"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Value"
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
           "value": "r"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "4"
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
           "value": "w"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "2"
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
           "value": "x"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "1"
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
       "value": "Add the values per role: "
      },
      {
       "type": "inlineCode",
       "value": "7 = rwx"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "6 = rw-"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "5 = r-x"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "4 = r--"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "0 = ---"
      },
      {
       "type": "text",
       "value": "."
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
           "type": "text",
           "value": "On a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "directory"
            }
           ]
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "x"
          },
          {
           "type": "text",
           "value": " means you can enter/traverse it; "
          },
          {
           "type": "inlineCode",
           "value": "w"
          },
          {
           "type": "text",
           "value": " means you can create, delete and rename entries inside."
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
         "value": "Remember: three roles (owner, group, others), three bits each; add 4+2+1 to get the number."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-chmod-and-chown",
   "num": null,
   "title": "chmod and chown",
   "stars": 1,
   "chapter": "permissions-and-users",
   "nodes": [
    {
     "type": "code",
     "value": "chmod 755 script.sh   # owner rwx, group r-x, others r-x\nchmod 644 file.txt    # owner rw-, others r--\nchmod 600 secret.txt  # owner rw- only\nchmod u+x script.sh   # add execute for the owner\nchmod a+x script.sh   # add execute for all\nsudo chown srijan:developers -R project/   # change owner and group",
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
           "value": "Symbolic targets: "
          },
          {
           "type": "inlineCode",
           "value": "u"
          },
          {
           "type": "text",
           "value": " owner, "
          },
          {
           "type": "inlineCode",
           "value": "g"
          },
          {
           "type": "text",
           "value": " group, "
          },
          {
           "type": "inlineCode",
           "value": "o"
          },
          {
           "type": "text",
           "value": " others, "
          },
          {
           "type": "inlineCode",
           "value": "a"
          },
          {
           "type": "text",
           "value": " all; "
          },
          {
           "type": "inlineCode",
           "value": "+"
          },
          {
           "type": "text",
           "value": "/"
          },
          {
           "type": "inlineCode",
           "value": "-"
          },
          {
           "type": "text",
           "value": " add/remove."
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
           "value": "Common numbers: "
          },
          {
           "type": "inlineCode",
           "value": "755"
          },
          {
           "type": "text",
           "value": " executables, "
          },
          {
           "type": "inlineCode",
           "value": "644"
          },
          {
           "type": "text",
           "value": " normal files, "
          },
          {
           "type": "inlineCode",
           "value": "600"
          },
          {
           "type": "text",
           "value": " private files."
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
         "value": "chmod"
        },
        {
         "type": "text",
         "value": " changes "
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "permissions"
          }
         ]
        },
        {
         "type": "text",
         "value": ", "
        },
        {
         "type": "inlineCode",
         "value": "chown"
        },
        {
         "type": "text",
         "value": " changes "
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "ownership"
          }
         ]
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
   "id": "s-users-and-groups",
   "num": null,
   "title": "Users and Groups",
   "stars": 0,
   "chapter": "permissions-and-users",
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
             "value": "User"
            }
           ]
          },
          {
           "type": "text",
           "value": ": an account; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "root"
            }
           ]
          },
          {
           "type": "text",
           "value": " is the admin, usually UID 0."
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
             "value": "Group"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a set of users sharing permissions. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "UID"
            }
           ]
          },
          {
           "type": "text",
           "value": "/"
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "GID"
            }
           ]
          },
          {
           "type": "text",
           "value": " are their numeric IDs."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "id                 # your user and group IDs\ncat /etc/passwd    # user accounts\ncat /etc/group     # groups\nsu username        # switch to another user\nsudo adduser srijan\npasswd             # change password",
     "lang": "bash"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Key files: "
      },
      {
       "type": "inlineCode",
       "value": "/etc/passwd"
      },
      {
       "type": "text",
       "value": " (accounts), "
      },
      {
       "type": "inlineCode",
       "value": "/etc/shadow"
      },
      {
       "type": "text",
       "value": " (password hashes, restricted), "
      },
      {
       "type": "inlineCode",
       "value": "/etc/group"
      },
      {
       "type": "text",
       "value": " (groups), "
      },
      {
       "type": "inlineCode",
       "value": "/etc/sudoers"
      },
      {
       "type": "text",
       "value": " (sudo rules)."
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
         "value": "/etc/passwd"
        },
        {
         "type": "text",
         "value": " lists users; secrets live in the restricted "
        },
        {
         "type": "inlineCode",
         "value": "/etc/shadow"
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
   "id": "s-sudo-and-su",
   "num": null,
   "title": "sudo and su",
   "stars": 0,
   "chapter": "permissions-and-users",
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
           "type": "inlineCode",
           "value": "sudo command"
          },
          {
           "type": "text",
           "value": ": run a single command with elevated privileges (your own password)."
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
           "value": "su user"
          },
          {
           "type": "text",
           "value": ": switch into another user's account for a whole session."
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
           "value": "sudo"
          },
          {
           "type": "text",
           "value": " is "
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
           "value": " the same as logging in as root."
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
         "value": "sudo"
        },
        {
         "type": "text",
         "value": " elevates one command; "
        },
        {
         "type": "inlineCode",
         "value": "su"
        },
        {
         "type": "text",
         "value": " becomes another user."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-find",
   "num": null,
   "title": "find",
   "stars": 1,
   "chapter": "search-and-text",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Searches the filesystem by name, type, size and more."
      }
     ]
    },
    {
     "type": "code",
     "value": "find . -name \"Main.java\"     # by exact name\nfind . -name \"*.java\"        # by pattern\nfind . -type d               # directories only\nfind . -type f -size +100M   # files larger than 100 MB",
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
         "value": "find"
        },
        {
         "type": "text",
         "value": " locates "
        },
        {
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "files"
          }
         ]
        },
        {
         "type": "text",
         "value": " by their attributes, not by their contents."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-grep",
   "num": null,
   "title": "grep",
   "stars": 1,
   "chapter": "search-and-text",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Searches "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "inside"
        }
       ]
      },
      {
       "type": "text",
       "value": " files for text patterns."
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
           "value": "Flag"
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
           "type": "inlineCode",
           "value": "-i"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "ignore case"
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
           "value": "-r"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "search recursively"
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
           "value": "-n"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "show line numbers"
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
           "value": "-v"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "show non-matching lines"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "grep -i \"error\" app.log       # case-insensitive match\ngrep -rn \"TODO\" .             # recursive, with line numbers",
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
         "value": "grep"
        },
        {
         "type": "text",
         "value": " searches text inside files; combine with pipes to filter any output."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-related-text-tools",
   "num": null,
   "title": "Related text tools",
   "stars": 0,
   "chapter": "search-and-text",
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
           "type": "inlineCode",
           "value": "sort"
          },
          {
           "type": "text",
           "value": " orders lines; "
          },
          {
           "type": "inlineCode",
           "value": "uniq"
          },
          {
           "type": "text",
           "value": " collapses adjacent duplicates (often "
          },
          {
           "type": "inlineCode",
           "value": "sort | uniq"
          },
          {
           "type": "text",
           "value": ")."
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
           "value": "which"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "whereis"
          },
          {
           "type": "text",
           "value": " locate an executable; "
          },
          {
           "type": "inlineCode",
           "value": "locate"
          },
          {
           "type": "text",
           "value": " searches a prebuilt file database."
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
         "value": "sort"
        },
        {
         "type": "text",
         "value": " then "
        },
        {
         "type": "inlineCode",
         "value": "uniq"
        },
        {
         "type": "text",
         "value": " to count or dedupe lines of text."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-viewing-processes",
   "num": null,
   "title": "Viewing Processes",
   "stars": 1,
   "chapter": "processes-and-jobs",
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
         "value": "process"
        }
       ]
      },
      {
       "type": "text",
       "value": " is a running program with a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "PID"
        }
       ]
      },
      {
       "type": "text",
       "value": " (and "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "PPID"
        }
       ]
      },
      {
       "type": "text",
       "value": ", its parent). A "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "daemon"
        }
       ]
      },
      {
       "type": "text",
       "value": " is a background service; a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "zombie"
        }
       ]
      },
      {
       "type": "text",
       "value": " is a finished process whose exit status the parent has not yet collected."
      }
     ]
    },
    {
     "type": "code",
     "value": "ps aux | grep java   # detailed process list, filtered\npgrep java           # just the PIDs\ntop                  # live monitoring (htop if installed)",
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
         "value": "ps aux"
        },
        {
         "type": "text",
         "value": " for a snapshot, "
        },
        {
         "type": "inlineCode",
         "value": "top"
        },
        {
         "type": "text",
         "value": " for a live view, "
        },
        {
         "type": "inlineCode",
         "value": "pgrep"
        },
        {
         "type": "text",
         "value": " for just the IDs."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-signals-and-kill",
   "num": null,
   "title": "Signals and kill",
   "stars": 2,
   "chapter": "processes-and-jobs",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "kill"
      },
      {
       "type": "text",
       "value": " sends a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "signal"
        }
       ]
      },
      {
       "type": "text",
       "value": " to a process; it does not always mean \"terminate\"."
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
           "value": "Signal"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Number"
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
           "value": "SIGINT"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "2"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "interrupt (Ctrl+C)"
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
           "value": "SIGKILL"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "9"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "force kill"
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
           "value": "SIGTERM"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "15"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "ask to stop gracefully"
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
           "value": "SIGHUP"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "1"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "hangup"
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
           "value": "SIGSTOP"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "19"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "stop/pause"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "kill 1234      # sends SIGTERM (15) — graceful\nkill -9 1234   # sends SIGKILL (9) — forced\npkill java     # by name",
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
           "value": "Default "
          },
          {
           "type": "inlineCode",
           "value": "kill"
          },
          {
           "type": "text",
           "value": " is SIGTERM, letting the process clean up."
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
           "value": "SIGKILL "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "cannot be caught or ignored"
            }
           ]
          },
          {
           "type": "text",
           "value": "; try "
          },
          {
           "type": "inlineCode",
           "value": "kill"
          },
          {
           "type": "text",
           "value": " before "
          },
          {
           "type": "inlineCode",
           "value": "kill -9"
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
         "value": "Remember: SIGTERM asks nicely, SIGKILL cannot be refused — reach for "
        },
        {
         "type": "inlineCode",
         "value": "-9"
        },
        {
         "type": "text",
         "value": " last."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-foreground-and-background-jobs",
   "num": null,
   "title": "Foreground and Background Jobs",
   "stars": 0,
   "chapter": "processes-and-jobs",
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
           "type": "inlineCode",
           "value": "&"
          },
          {
           "type": "text",
           "value": " runs a command in the background."
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
           "value": "Ctrl+C"
          },
          {
           "type": "text",
           "value": " interrupts; "
          },
          {
           "type": "inlineCode",
           "value": "Ctrl+Z"
          },
          {
           "type": "text",
           "value": " suspends the foreground job."
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
           "value": "jobs"
          },
          {
           "type": "text",
           "value": " lists shell jobs; "
          },
          {
           "type": "inlineCode",
           "value": "bg"
          },
          {
           "type": "text",
           "value": " resumes one in background; "
          },
          {
           "type": "inlineCode",
           "value": "fg"
          },
          {
           "type": "text",
           "value": " brings one to the foreground."
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
           "value": "nohup"
          },
          {
           "type": "text",
           "value": " keeps a command running after you log out."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "java Main.java &                          # background\nnohup java -jar app.jar > app.log 2>&1 &  # survives logout, logs to file",
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
         "value": "&"
        },
        {
         "type": "text",
         "value": " backgrounds for this session; "
        },
        {
         "type": "inlineCode",
         "value": "nohup"
        },
        {
         "type": "text",
         "value": " keeps it alive after the terminal closes."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-package-management",
   "num": null,
   "title": "Package Management",
   "stars": 0,
   "chapter": "packages-services-and-system",
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
         "value": "package manager"
        }
       ]
      },
      {
       "type": "text",
       "value": " installs, updates and removes software from "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "repositories"
        }
       ]
      },
      {
       "type": "text",
       "value": ", resolving "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "dependencies"
        }
       ]
      },
      {
       "type": "text",
       "value": ". APT is used on Ubuntu/Debian; DNF/RPM on Fedora."
      }
     ]
    },
    {
     "type": "code",
     "value": "sudo apt update     # refresh available package lists\nsudo apt upgrade    # install available updates\nsudo apt install nginx\nsudo apt remove nginx    # remove, keep config\nsudo apt purge nginx     # remove, delete config too\nsudo apt autoremove      # drop unused dependencies",
     "lang": "bash"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Other distros: "
      },
      {
       "type": "inlineCode",
       "value": "sudo dnf install nginx"
      },
      {
       "type": "text",
       "value": " (Fedora), "
      },
      {
       "type": "inlineCode",
       "value": "sudo yum install nginx"
      },
      {
       "type": "text",
       "value": " (older RPM systems)."
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
         "value": "apt update"
        },
        {
         "type": "text",
         "value": " refreshes the list; "
        },
        {
         "type": "inlineCode",
         "value": "apt upgrade"
        },
        {
         "type": "text",
         "value": " actually installs updates."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-systemd-services",
   "num": null,
   "title": "systemd Services",
   "stars": 0,
   "chapter": "packages-services-and-system",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "systemd"
        }
       ]
      },
      {
       "type": "text",
       "value": " is the common service manager; "
      },
      {
       "type": "inlineCode",
       "value": "systemctl"
      },
      {
       "type": "text",
       "value": " controls services and "
      },
      {
       "type": "inlineCode",
       "value": "journalctl"
      },
      {
       "type": "text",
       "value": " reads their logs."
      }
     ]
    },
    {
     "type": "code",
     "value": "systemctl status nginx\nsudo systemctl start nginx     # run now\nsudo systemctl enable nginx    # auto-start at boot\nsudo systemctl restart nginx\njournalctl -u nginx -n 50      # last 50 log lines for the service",
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
           "value": "start"
          },
          {
           "type": "text",
           "value": "/"
          },
          {
           "type": "inlineCode",
           "value": "stop"
          },
          {
           "type": "text",
           "value": "/"
          },
          {
           "type": "inlineCode",
           "value": "restart"
          },
          {
           "type": "text",
           "value": " act now; "
          },
          {
           "type": "inlineCode",
           "value": "enable"
          },
          {
           "type": "text",
           "value": "/"
          },
          {
           "type": "inlineCode",
           "value": "disable"
          },
          {
           "type": "text",
           "value": " control boot behaviour; "
          },
          {
           "type": "inlineCode",
           "value": "reload"
          },
          {
           "type": "text",
           "value": " re-reads config without a full restart."
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
         "value": "start"
        },
        {
         "type": "text",
         "value": " runs it now, "
        },
        {
         "type": "inlineCode",
         "value": "enable"
        },
        {
         "type": "text",
         "value": " makes it start at every boot."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-system-monitoring",
   "num": null,
   "title": "System Monitoring",
   "stars": 0,
   "chapter": "packages-services-and-system",
   "nodes": [
    {
     "type": "code",
     "value": "free -h          # memory\ndf -h            # filesystem disk usage\ndu -sh folder/   # space used by one folder\nuptime           # uptime and load average (1/5/15 min)\nlsblk            # block devices",
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
         "value": "df"
        },
        {
         "type": "text",
         "value": " is whole-disk usage, "
        },
        {
         "type": "inlineCode",
         "value": "du"
        },
        {
         "type": "text",
         "value": " is one folder's usage."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-archives-and-compression",
   "num": null,
   "title": "Archives and Compression",
   "stars": 0,
   "chapter": "packages-services-and-system",
   "nodes": [
    {
     "type": "code",
     "value": "tar -cvf backup.tar folder/      # create archive\ntar -xvf backup.tar              # extract\ntar -czvf backup.tar.gz folder/  # create gzip-compressed\ntar -xzvf backup.tar.gz          # extract gzip\nzip -r backup.zip folder/ && unzip backup.zip",
     "lang": "bash"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "tar options: "
      },
      {
       "type": "inlineCode",
       "value": "c"
      },
      {
       "type": "text",
       "value": " create, "
      },
      {
       "type": "inlineCode",
       "value": "x"
      },
      {
       "type": "text",
       "value": " extract, "
      },
      {
       "type": "inlineCode",
       "value": "v"
      },
      {
       "type": "text",
       "value": " verbose, "
      },
      {
       "type": "inlineCode",
       "value": "f"
      },
      {
       "type": "text",
       "value": " file, "
      },
      {
       "type": "inlineCode",
       "value": "z"
      },
      {
       "type": "text",
       "value": " gzip, "
      },
      {
       "type": "inlineCode",
       "value": "t"
      },
      {
       "type": "text",
       "value": " list."
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
         "value": "tar"
        },
        {
         "type": "text",
         "value": " bundles files; add "
        },
        {
         "type": "inlineCode",
         "value": "z"
        },
        {
         "type": "text",
         "value": " to gzip-compress the bundle."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-scheduling-with-cron",
   "num": null,
   "title": "Scheduling with cron",
   "stars": 0,
   "chapter": "packages-services-and-system",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "cron"
        }
       ]
      },
      {
       "type": "text",
       "value": " runs commands on a schedule; a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "crontab"
        }
       ]
      },
      {
       "type": "text",
       "value": " holds the jobs. Format: "
      },
      {
       "type": "inlineCode",
       "value": "minute hour day-of-month month day-of-week command"
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "code",
     "value": "crontab -e                        # edit jobs\ncrontab -l                        # list jobs\n0 9 * * * /home/srijan/backup.sh  # every day at 9 AM",
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
         "value": "Remember: five time fields — minute, hour, day-of-month, month, day-of-week — then the command."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-core-concepts",
   "num": null,
   "title": "Core Concepts",
   "stars": 0,
   "chapter": "networking",
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
             "value": "IP address"
            }
           ]
          },
          {
           "type": "text",
           "value": ": identifies a network interface; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "port"
            }
           ]
          },
          {
           "type": "text",
           "value": ": identifies a service on it."
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
             "value": "DNS"
            }
           ]
          },
          {
           "type": "text",
           "value": ": turns domain names into IPs. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "localhost"
            }
           ]
          },
          {
           "type": "text",
           "value": " ("
          },
          {
           "type": "inlineCode",
           "value": "127.0.0.1"
          },
          {
           "type": "text",
           "value": ") is your own machine."
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
             "value": "Socket"
            }
           ]
          },
          {
           "type": "text",
           "value": ": an address + port endpoint for TCP/UDP."
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
           "value": "Ports below 1024 are privileged; "
          },
          {
           "type": "inlineCode",
           "value": "ping"
          },
          {
           "type": "text",
           "value": " uses ICMP, which a server may block even while HTTP works."
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
         "value": "Remember: an IP finds the machine, a port finds the service on it."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-everyday-commands",
   "num": null,
   "title": "Everyday Commands",
   "stars": 1,
   "chapter": "networking",
   "nodes": [
    {
     "type": "code",
     "value": "ip addr                # local IP addresses\nping google.com        # reachability test\ncurl https://example.com   # make an HTTP request\nsudo ss -tulnp         # listening sockets and their processes\nnslookup google.com    # DNS lookup (dig for detail)\nssh user@server-ip     # remote login\nscp app.jar user@server-ip:/home/user/   # copy over SSH",
     "lang": "bash"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common ports: 22 SSH, 53 DNS, 80 HTTP, 443 HTTPS, 3306 MySQL, 5432 PostgreSQL, 6379 Redis, 8080 alt HTTP."
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
         "value": "ss -tulnp"
        },
        {
         "type": "text",
         "value": " shows what is listening and which process owns the port."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-core-pairs",
   "num": null,
   "title": "Core Pairs",
   "stars": 2,
   "chapter": "common-why-x-vs-y-comparisons",
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
           "value": "Kernel vs Shell"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "core OS that runs hardware vs program that runs your commands"
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
           "value": "Terminal vs Shell"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "the window vs the command interpreter inside it"
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
           "value": "Root directory vs Root user"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "/"
          },
          {
           "type": "text",
           "value": " (top of the tree) vs the admin account"
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
           "value": "chmod"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "chown"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "change permissions vs change ownership"
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
           "value": "su"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "sudo"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "become another user for a session vs run one command elevated"
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
           "value": "Hard link vs Symbolic link"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "another name for the same data vs a pointer to a path"
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
           "value": "find"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "grep"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "locate files by attributes vs search text inside files"
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
           "value": ">"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": ">>"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "overwrite a file vs append to it"
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
           "value": "stdout vs stderr"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "normal output (FD 1) vs error output (FD 2)"
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
         "value": "Remember: shell/terminal, chmod/chown and find/grep are the pairs interviewers lean on."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-process-and-system-pairs",
   "num": null,
   "title": "Process and System Pairs",
   "stars": 1,
   "chapter": "common-why-x-vs-y-comparisons",
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
           "value": "SIGTERM vs SIGKILL ("
          },
          {
           "type": "inlineCode",
           "value": "kill"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "kill -9"
          },
          {
           "type": "text",
           "value": ")"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "graceful stop the process can handle vs forced kill it cannot refuse"
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
           "value": "&"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "nohup"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "background it for this session vs keep it alive after logout"
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
           "value": "df"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "du"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "whole-filesystem usage vs one folder's usage"
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
           "value": "apt update"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "apt upgrade"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "refresh package lists vs install the updates"
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
           "value": "start"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "enable"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "run the service now vs start it at every boot"
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
           "value": "Linux vs Unix"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "open-source, Unix-like kernel/ecosystem vs the older OS family it descends from"
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
         "value": "Remember: prefer SIGTERM first; "
        },
        {
         "type": "inlineCode",
         "value": "&"
        },
        {
         "type": "text",
         "value": " dies with the shell, "
        },
        {
         "type": "inlineCode",
         "value": "nohup"
        },
        {
         "type": "text",
         "value": " lives on."
        }
       ]
      }
     ]
    }
   ]
  }
 ]
};
