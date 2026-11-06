// AUTO-GENERATED from reference/python.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs python
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const pythonCheatsheet: CheatDoc = {
 "title": "Python",
 "tagline": "The whole language on one page — ideas, examples and the rules to remember.",
 "chapters": [
  {
   "id": "how-python-runs",
   "title": "How Python Runs"
  },
  {
   "id": "types-and-mutability",
   "title": "Types and Mutability"
  },
  {
   "id": "operators-the-ones-interviewers-probe",
   "title": "Operators (the ones interviewers probe)"
  },
  {
   "id": "control-flow",
   "title": "Control Flow"
  },
  {
   "id": "strings",
   "title": "Strings"
  },
  {
   "id": "collections",
   "title": "Collections"
  },
  {
   "id": "functions",
   "title": "Functions"
  },
  {
   "id": "oop",
   "title": "OOP"
  },
  {
   "id": "iterators-and-generators",
   "title": "Iterators and Generators"
  },
  {
   "id": "errors-and-files",
   "title": "Errors and Files"
  },
  {
   "id": "concurrency",
   "title": "Concurrency"
  },
  {
   "id": "memory-and-copying",
   "title": "Memory and Copying"
  },
  {
   "id": "modules-venv-and-pip",
   "title": "Modules, venv and pip"
  },
  {
   "id": "built-ins-and-data-structures",
   "title": "Built-ins and Data Structures"
  },
  {
   "id": "useful-concepts-and-libraries",
   "title": "Useful Concepts and Libraries"
  },
  {
   "id": "backend-essentials-for-python-backend-roles",
   "title": "Backend Essentials (for Python backend roles)"
  },
  {
   "id": "why-x-vs-y-common-confusions",
   "title": "Why X vs Y — Common Confusions"
  }
 ],
 "sections": [
  {
   "id": "s-what-python-is",
   "num": null,
   "title": "What Python Is",
   "stars": 0,
   "chapter": "how-python-runs",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Python is a high-level, general-purpose language known for simple, readable syntax. It is object-oriented (everything is an object), cross-platform, open source, and case-sensitive. It uses indentation, not "
      },
      {
       "type": "inlineCode",
       "value": "{}"
      },
      {
       "type": "text",
       "value": ", to mark code blocks. PEP 8 is the official style guide."
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
         "value": "Remember: Python 3 is the modern version; indentation is syntax, not just style."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-interpreted-compiled-or-both",
   "num": null,
   "title": "Interpreted, Compiled or Both?",
   "stars": 0,
   "chapter": "how-python-runs",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Python is commonly called interpreted, but CPython first compiles your source ("
      },
      {
       "type": "inlineCode",
       "value": ".py"
      },
      {
       "type": "text",
       "value": ") into bytecode, then the Python Virtual Machine (PVM) runs that bytecode."
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
           "value": "Source code → bytecode → PVM → output."
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
             "value": "CPython"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the standard implementation, written in C."
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
             "value": "Jython"
            }
           ]
          },
          {
           "type": "text",
           "value": " (runs on the JVM), "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "PyPy"
            }
           ]
          },
          {
           "type": "text",
           "value": " (uses JIT compilation) are alternatives."
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
             "value": "REPL"
            }
           ]
          },
          {
           "type": "text",
           "value": ": interactive shell to run statements one at a time."
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
         "value": "Remember: \"Interpreted, but CPython compiles to bytecode first\" is the correct interview answer."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-dynamic-strong-typing",
   "num": null,
   "title": "Dynamic + Strong Typing",
   "stars": 1,
   "chapter": "how-python-runs",
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
             "value": "Dynamically typed"
            }
           ]
          },
          {
           "type": "text",
           "value": ": you don't declare types; Python infers them at runtime, and a variable can later point to a different type."
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
             "value": "Strongly typed"
            }
           ]
          },
          {
           "type": "text",
           "value": ": Python won't silently combine incompatible types, e.g. "
          },
          {
           "type": "inlineCode",
           "value": "\"a\" + 1"
          },
          {
           "type": "text",
           "value": " raises an error."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "x = 10\nx = \"Python\"   # allowed: dynamic typing\n\"age: \" + 25   # TypeError: strong typing",
     "lang": "python"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Dynamic = type decided at runtime. Strong = incompatible types are not auto-mixed."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-built-in-types",
   "num": null,
   "title": "Built-in Types",
   "stars": 0,
   "chapter": "types-and-mutability",
   "nodes": [
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
           "value": "Type"
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
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Example"
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
           "value": "int"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "float"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "complex"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Numbers"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "10"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "10.5"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "2+3j"
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
           "value": "str"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Text"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "\"Hi\""
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
           "value": "bool"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "True / False"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "True"
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
           "value": "list"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "tuple"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Ordered collection (mutable / immutable)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "[1,2]"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "(1,2)"
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
           "value": "set"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Unique elements"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "{1,2}"
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
           "value": "dict"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Key-value pairs"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "{\"a\":1}"
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
           "value": "NoneType"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Absence of a value"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "None"
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
           "value": "range"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "bytes"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Int sequence / binary data"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "range(5)"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "b\"hi\""
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "None"
            }
           ]
          },
          {
           "type": "text",
           "value": ": means \"no value\"; not the same as "
          },
          {
           "type": "inlineCode",
           "value": "0"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "False"
          },
          {
           "type": "text",
           "value": ", or "
          },
          {
           "type": "inlineCode",
           "value": "\"\""
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
             "value": "Type conversion"
            }
           ]
          },
          {
           "type": "text",
           "value": ": "
          },
          {
           "type": "inlineCode",
           "value": "int(\"100\")"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "float(\"100\")"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "str(10)"
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
    }
   ]
  },
  {
   "id": "s-mutable-vs-immutable",
   "num": null,
   "title": "Mutable vs Immutable",
   "stars": 1,
   "chapter": "types-and-mutability",
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
             "value": "Mutable"
            }
           ]
          },
          {
           "type": "text",
           "value": " (can change after creation): "
          },
          {
           "type": "inlineCode",
           "value": "list"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "set"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "dict"
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
             "value": "Immutable"
            }
           ]
          },
          {
           "type": "text",
           "value": " (cannot change): "
          },
          {
           "type": "inlineCode",
           "value": "int"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "float"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "bool"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "str"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "tuple"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "frozenset"
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
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A tuple is immutable, but a mutable object "
      },
      {
       "type": "emphasis",
       "children": [
        {
         "type": "text",
         "value": "inside"
        }
       ]
      },
      {
       "type": "text",
       "value": " it can still change:"
      }
     ]
    },
    {
     "type": "code",
     "value": "t = (1, [2, 3])\nt[1].append(4)   # (1, [2, 3, 4]) — the tuple binding is unchanged",
     "lang": "python"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Immutable = the object's value can't change; a tuple can still hold a list that changes."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-hashable",
   "num": null,
   "title": "Hashable",
   "stars": 0,
   "chapter": "types-and-mutability",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "An object is "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "hashable"
        }
       ]
      },
      {
       "type": "text",
       "value": " if it has a stable hash. Only hashable objects can be dict keys or set elements. Immutable types are usually hashable; lists and dicts are not."
      }
     ]
    }
   ]
  },
  {
   "id": "s-type-checking",
   "num": null,
   "title": "Type Checking",
   "stars": 0,
   "chapter": "types-and-mutability",
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
           "value": "type(x)"
          },
          {
           "type": "text",
           "value": ": exact type."
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
           "value": "isinstance(x, int)"
          },
          {
           "type": "text",
           "value": ": type check that also accepts subclasses."
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
           "value": "id(x)"
          },
          {
           "type": "text",
           "value": ": object identity (memory identity)."
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
         "value": "Remember: Prefer "
        },
        {
         "type": "inlineCode",
         "value": "isinstance()"
        },
        {
         "type": "text",
         "value": " over "
        },
        {
         "type": "inlineCode",
         "value": "type()"
        },
        {
         "type": "text",
         "value": " because it respects inheritance."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-arithmetic-gotchas",
   "num": null,
   "title": "Arithmetic Gotchas",
   "stars": 0,
   "chapter": "operators-the-ones-interviewers-probe",
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
           "value": "/"
          },
          {
           "type": "text",
           "value": " always returns a float ("
          },
          {
           "type": "inlineCode",
           "value": "10 / 2"
          },
          {
           "type": "text",
           "value": " → "
          },
          {
           "type": "inlineCode",
           "value": "5.0"
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
           "value": "//"
          },
          {
           "type": "text",
           "value": " floor division, rounds "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "down"
            }
           ]
          },
          {
           "type": "text",
           "value": " toward negative infinity."
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
           "value": "%"
          },
          {
           "type": "text",
           "value": " remainder, "
          },
          {
           "type": "inlineCode",
           "value": "**"
          },
          {
           "type": "text",
           "value": " power."
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
   "id": "s-logic-and-membership",
   "num": null,
   "title": "Logic and Membership",
   "stars": 0,
   "chapter": "operators-the-ones-interviewers-probe",
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
           "value": "and"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "or"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "not"
          },
          {
           "type": "text",
           "value": " for booleans."
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
           "value": "in"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "not in"
          },
          {
           "type": "text",
           "value": " test membership; for a dict, they check "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "keys"
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
    }
   ]
  },
  {
   "id": "s-vs-is",
   "num": null,
   "title": "== vs is",
   "stars": 1,
   "chapter": "operators-the-ones-interviewers-probe",
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
           "value": "=="
          },
          {
           "type": "text",
           "value": " compares "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "values"
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
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "inlineCode",
           "value": "is"
          },
          {
           "type": "text",
           "value": " compares "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "identity"
            }
           ]
          },
          {
           "type": "text",
           "value": " (same object in memory)."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "a = [1, 2]; b = [1, 2]\na == b   # True  (same value)\na is b   # False (different objects)",
     "lang": "python"
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
         "value": "=="
        },
        {
         "type": "text",
         "value": " = same value, "
        },
        {
         "type": "inlineCode",
         "value": "is"
        },
        {
         "type": "text",
         "value": " = same object. Always use "
        },
        {
         "type": "inlineCode",
         "value": "is None"
        },
        {
         "type": "text",
         "value": " to test for None."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-conditionals",
   "num": null,
   "title": "Conditionals",
   "stars": 0,
   "chapter": "control-flow",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "if"
      },
      {
       "type": "text",
       "value": " / "
      },
      {
       "type": "inlineCode",
       "value": "elif"
      },
      {
       "type": "text",
       "value": " / "
      },
      {
       "type": "inlineCode",
       "value": "else"
      },
      {
       "type": "text",
       "value": ". Ternary form: "
      },
      {
       "type": "inlineCode",
       "value": "value = \"Pass\" if marks >= 40 else \"Fail\""
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
   "id": "s-loops-and-keywords",
   "num": null,
   "title": "Loops and Keywords",
   "stars": 0,
   "chapter": "control-flow",
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
           "value": "for"
          },
          {
           "type": "text",
           "value": " iterates any iterable; "
          },
          {
           "type": "inlineCode",
           "value": "while"
          },
          {
           "type": "text",
           "value": " repeats while a condition holds."
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
           "value": "break"
          },
          {
           "type": "text",
           "value": " exits the nearest loop; "
          },
          {
           "type": "inlineCode",
           "value": "continue"
          },
          {
           "type": "text",
           "value": " skips to the next iteration; "
          },
          {
           "type": "inlineCode",
           "value": "pass"
          },
          {
           "type": "text",
           "value": " is a do-nothing placeholder."
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
           "value": "A loop's "
          },
          {
           "type": "inlineCode",
           "value": "else"
          },
          {
           "type": "text",
           "value": " runs only if the loop finished "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "without"
            }
           ]
          },
          {
           "type": "text",
           "value": " a "
          },
          {
           "type": "inlineCode",
           "value": "break"
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
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Helpers: "
          },
          {
           "type": "inlineCode",
           "value": "enumerate()"
          },
          {
           "type": "text",
           "value": " (index + value), "
          },
          {
           "type": "inlineCode",
           "value": "zip()"
          },
          {
           "type": "text",
           "value": " (iterate several iterables together)."
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
   "id": "s-range",
   "num": null,
   "title": "range()",
   "stars": 0,
   "chapter": "control-flow",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "range(start, stop, step)"
      },
      {
       "type": "text",
       "value": " — default start "
      },
      {
       "type": "inlineCode",
       "value": "0"
      },
      {
       "type": "text",
       "value": ", default step "
      },
      {
       "type": "inlineCode",
       "value": "1"
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
         "value": "stop is excluded"
        }
       ]
      },
      {
       "type": "text",
       "value": ", step may be negative."
      }
     ]
    },
    {
     "type": "code",
     "value": "list(range(1, 5))      # [1, 2, 3, 4]\nlist(range(5, 0, -1))  # [5, 4, 3, 2, 1]",
     "lang": "python"
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
         "value": "range(5)"
        },
        {
         "type": "text",
         "value": " gives 0–4, never 5."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-basics",
   "num": null,
   "title": "Basics",
   "stars": 0,
   "chapter": "strings",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A string is an "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "immutable"
        }
       ]
      },
      {
       "type": "text",
       "value": " sequence of characters. Indexing starts at "
      },
      {
       "type": "inlineCode",
       "value": "0"
      },
      {
       "type": "text",
       "value": "; "
      },
      {
       "type": "inlineCode",
       "value": "-1"
      },
      {
       "type": "text",
       "value": " is the last character."
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
             "value": "Slicing"
            }
           ]
          },
          {
           "type": "text",
           "value": " "
          },
          {
           "type": "inlineCode",
           "value": "s[start:stop:step]"
          },
          {
           "type": "text",
           "value": ": stop is excluded; "
          },
          {
           "type": "inlineCode",
           "value": "s[::-1]"
          },
          {
           "type": "text",
           "value": " reverses."
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
           "value": "Slicing beyond the length is safe (no error)."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "name = \"Python\"\nname[0]     # 'P'\nname[-1]    # 'n'\nname[0:3]   # 'Pyt'\nname[::-1]  # 'nohtyP'",
     "lang": "python"
    }
   ]
  },
  {
   "id": "s-useful-methods",
   "num": null,
   "title": "Useful Methods",
   "stars": 0,
   "chapter": "strings",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Case: "
      },
      {
       "type": "inlineCode",
       "value": "upper"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "lower"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "capitalize"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "title"
      },
      {
       "type": "text",
       "value": ". Clean: "
      },
      {
       "type": "inlineCode",
       "value": "strip"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "lstrip"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "rstrip"
      },
      {
       "type": "text",
       "value": ". Edit/search: "
      },
      {
       "type": "inlineCode",
       "value": "replace"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "split"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "join"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "count"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "startswith"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "endswith"
      },
      {
       "type": "text",
       "value": ". Checks: "
      },
      {
       "type": "inlineCode",
       "value": "isdigit"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "isalpha"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "isalnum"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "isspace"
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
           "type": "inlineCode",
           "value": "find()"
          },
          {
           "type": "text",
           "value": " returns "
          },
          {
           "type": "inlineCode",
           "value": "-1"
          },
          {
           "type": "text",
           "value": " if missing; "
          },
          {
           "type": "inlineCode",
           "value": "index()"
          },
          {
           "type": "text",
           "value": " raises "
          },
          {
           "type": "inlineCode",
           "value": "ValueError"
          },
          {
           "type": "text",
           "value": " if missing."
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
   "id": "s-formatting",
   "num": null,
   "title": "Formatting",
   "stars": 0,
   "chapter": "strings",
   "nodes": [
    {
     "type": "code",
     "value": "name, age = \"Srijan\", 25\nf\"My name is {name}, age {age}\"           # f-string (preferred)\n\"My name is {}, age {}\".format(name, age) # .format()",
     "lang": "python"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Use f-strings; they are the simplest and most readable."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-list",
   "num": null,
   "title": "List",
   "stars": 0,
   "chapter": "collections",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Ordered, mutable, allows duplicates, can mix types."
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
           "value": "Add: "
          },
          {
           "type": "inlineCode",
           "value": "append(x)"
          },
          {
           "type": "text",
           "value": " (one element), "
          },
          {
           "type": "inlineCode",
           "value": "extend(iterable)"
          },
          {
           "type": "text",
           "value": " (many), "
          },
          {
           "type": "inlineCode",
           "value": "insert(i, x)"
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
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Remove: "
          },
          {
           "type": "inlineCode",
           "value": "remove(value)"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "pop()"
          },
          {
           "type": "text",
           "value": " (last, returns it), "
          },
          {
           "type": "inlineCode",
           "value": "pop(i)"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "clear()"
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
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Other: "
          },
          {
           "type": "inlineCode",
           "value": "index"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "count"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "sort"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "reverse"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "copy"
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
    }
   ]
  },
  {
   "id": "s-tuple",
   "num": null,
   "title": "Tuple",
   "stars": 0,
   "chapter": "collections",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Ordered, "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "immutable"
        }
       ]
      },
      {
       "type": "text",
       "value": ", allows duplicates, supports indexing/slicing. Use for fixed collections."
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
           "value": "A single-element tuple needs a trailing comma: "
          },
          {
           "type": "inlineCode",
           "value": "x = (10,)"
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
             "value": "Unpacking"
            }
           ]
          },
          {
           "type": "text",
           "value": ": "
          },
          {
           "type": "inlineCode",
           "value": "name, age = (\"Srijan\", 25)"
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
    }
   ]
  },
  {
   "id": "s-set",
   "num": null,
   "title": "Set",
   "stars": 0,
   "chapter": "collections",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Collection of "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "unique, hashable"
        }
       ]
      },
      {
       "type": "text",
       "value": " elements; duplicates auto-removed; "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "no order guarantee"
        }
       ]
      },
      {
       "type": "text",
       "value": "; no indexing; mutable."
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
           "value": "Edit: "
          },
          {
           "type": "inlineCode",
           "value": "add"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "update"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "remove"
          },
          {
           "type": "text",
           "value": " (errors if missing), "
          },
          {
           "type": "inlineCode",
           "value": "discard"
          },
          {
           "type": "text",
           "value": " (no error), "
          },
          {
           "type": "inlineCode",
           "value": "pop"
          },
          {
           "type": "text",
           "value": " (arbitrary element)."
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
           "value": "Math: "
          },
          {
           "type": "inlineCode",
           "value": "|"
          },
          {
           "type": "text",
           "value": " union, "
          },
          {
           "type": "inlineCode",
           "value": "&"
          },
          {
           "type": "text",
           "value": " intersection, "
          },
          {
           "type": "inlineCode",
           "value": "-"
          },
          {
           "type": "text",
           "value": " difference, "
          },
          {
           "type": "inlineCode",
           "value": "^"
          },
          {
           "type": "text",
           "value": " symmetric difference."
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
           "value": "frozenset"
          },
          {
           "type": "text",
           "value": " is the immutable, hashable version."
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
   "id": "s-dict",
   "num": null,
   "title": "Dict",
   "stars": 0,
   "chapter": "collections",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Mutable key-value store. Keys must be "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "hashable and unique"
        }
       ]
      },
      {
       "type": "text",
       "value": "; values any type. Preserves insertion order in modern Python."
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
           "value": "Access: "
          },
          {
           "type": "inlineCode",
           "value": "d[\"k\"]"
          },
          {
           "type": "text",
           "value": " raises "
          },
          {
           "type": "inlineCode",
           "value": "KeyError"
          },
          {
           "type": "text",
           "value": " if missing; "
          },
          {
           "type": "inlineCode",
           "value": "d.get(\"k\")"
          },
          {
           "type": "text",
           "value": " returns "
          },
          {
           "type": "inlineCode",
           "value": "None"
          },
          {
           "type": "text",
           "value": " (or a default) instead."
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
           "value": "Methods: "
          },
          {
           "type": "inlineCode",
           "value": "keys"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "values"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "items"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "update"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "pop"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "popitem"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "setdefault"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "clear"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "copy"
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
         "value": "Remember: Lists/dicts can't be keys (unhashable); strings, ints and all-hashable tuples can."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-comprehensions",
   "num": null,
   "title": "Comprehensions",
   "stars": 1,
   "chapter": "collections",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A concise way to build a collection from an iterable, with an optional condition."
      }
     ]
    },
    {
     "type": "code",
     "value": "nums = [1, 2, 3, 4]\n[x * x for x in nums]          # list\n{x * 2 for x in nums}          # set\n{x: x * x for x in nums}       # dict\n(x * 2 for x in nums)          # generator (lazy)\n[x for x in nums if x % 2 == 0]  # with condition",
     "lang": "python"
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
         "value": "[]"
        },
        {
         "type": "text",
         "value": " list, "
        },
        {
         "type": "inlineCode",
         "value": "{}"
        },
        {
         "type": "text",
         "value": " set/dict, "
        },
        {
         "type": "inlineCode",
         "value": "()"
        },
        {
         "type": "text",
         "value": " a lazy generator expression."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-unpacking-and-swapping",
   "num": null,
   "title": "Unpacking and Swapping",
   "stars": 0,
   "chapter": "collections",
   "nodes": [
    {
     "type": "code",
     "value": "first, *middle, last = [1, 2, 3, 4, 5]   # 1, [2,3,4], 5\na, b = b, a                              # swap, no temp variable",
     "lang": "python"
    }
   ]
  },
  {
   "id": "s-basics-2",
   "num": null,
   "title": "Basics",
   "stars": 0,
   "chapter": "functions",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Defined with "
      },
      {
       "type": "inlineCode",
       "value": "def"
      },
      {
       "type": "text",
       "value": "; a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "parameter"
        }
       ]
      },
      {
       "type": "text",
       "value": " is the name in the definition, an "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "argument"
        }
       ]
      },
      {
       "type": "text",
       "value": " is the value passed. "
      },
      {
       "type": "inlineCode",
       "value": "return"
      },
      {
       "type": "text",
       "value": " sends a result back; a function with no "
      },
      {
       "type": "inlineCode",
       "value": "return"
      },
      {
       "type": "text",
       "value": " returns "
      },
      {
       "type": "inlineCode",
       "value": "None"
      },
      {
       "type": "text",
       "value": ". A docstring documents it."
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
           "value": "print()"
          },
          {
           "type": "text",
           "value": " shows output on screen; "
          },
          {
           "type": "inlineCode",
           "value": "return"
          },
          {
           "type": "text",
           "value": " hands a value to the caller — they are not the same."
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
   "id": "s-arguments",
   "num": null,
   "title": "Arguments",
   "stars": 0,
   "chapter": "functions",
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
             "value": "Positional"
            }
           ]
          },
          {
           "type": "text",
           "value": ": matched by order. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Keyword"
            }
           ]
          },
          {
           "type": "text",
           "value": ": matched by name. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Default"
            }
           ]
          },
          {
           "type": "text",
           "value": ": "
          },
          {
           "type": "inlineCode",
           "value": "def greet(name, msg=\"Hi\")"
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
    }
   ]
  },
  {
   "id": "s-args-and-kwargs",
   "num": null,
   "title": "*args and **kwargs",
   "stars": 1,
   "chapter": "functions",
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
           "value": "*args"
          },
          {
           "type": "text",
           "value": ": collects extra positional arguments into a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "tuple"
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
      },
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "inlineCode",
           "value": "**kwargs"
          },
          {
           "type": "text",
           "value": ": collects extra keyword arguments into a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "dict"
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
     "type": "code",
     "value": "def demo(*args, **kwargs):\n    print(args)    # (10, 20)\n    print(kwargs)  # {'name': 'Srijan'}\ndemo(10, 20, name=\"Srijan\")",
     "lang": "python"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: The "
        },
        {
         "type": "inlineCode",
         "value": "*"
        },
        {
         "type": "text",
         "value": " and "
        },
        {
         "type": "inlineCode",
         "value": "**"
        },
        {
         "type": "text",
         "value": " symbols matter, not the names "
        },
        {
         "type": "inlineCode",
         "value": "args"
        },
        {
         "type": "text",
         "value": "/"
        },
        {
         "type": "inlineCode",
         "value": "kwargs"
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
   "id": "s-lambda",
   "num": null,
   "title": "Lambda",
   "stars": 0,
   "chapter": "functions",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A small anonymous function of one expression, common with "
      },
      {
       "type": "inlineCode",
       "value": "map"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "filter"
      },
      {
       "type": "text",
       "value": ", sorting."
      }
     ]
    },
    {
     "type": "code",
     "value": "square = lambda x: x * x",
     "lang": "python"
    }
   ]
  },
  {
   "id": "s-scope-legb",
   "num": null,
   "title": "Scope: LEGB",
   "stars": 1,
   "chapter": "functions",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Python looks up names in order: "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Local → Enclosing → Global → Built-in"
        }
       ]
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
           "type": "inlineCode",
           "value": "global x"
          },
          {
           "type": "text",
           "value": " lets a function reassign a module-level variable."
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
           "value": "nonlocal x"
          },
          {
           "type": "text",
           "value": " lets an inner function reassign a variable in its enclosing function."
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
   "id": "s-first-class-functions-closures-decorators",
   "num": null,
   "title": "First-Class Functions, Closures, Decorators",
   "stars": 1,
   "chapter": "functions",
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
             "value": "First-class / higher-order"
            }
           ]
          },
          {
           "type": "text",
           "value": ": functions can be stored in variables, passed as arguments, and returned."
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
             "value": "Closure"
            }
           ]
          },
          {
           "type": "text",
           "value": ": an inner function that remembers variables from its enclosing scope."
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
             "value": "Decorator"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a function that wraps another to add behaviour without editing its source. "
          },
          {
           "type": "inlineCode",
           "value": "@name"
          },
          {
           "type": "text",
           "value": " applies it. Use "
          },
          {
           "type": "inlineCode",
           "value": "functools.wraps"
          },
          {
           "type": "text",
           "value": " to keep the original function's metadata."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "from functools import wraps\ndef logger(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(\"called\")\n        return func(*args, **kwargs)\n    return wrapper\n\n@logger\ndef greet(): print(\"Hello\")",
     "lang": "python"
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
         "value": "@decorator"
        },
        {
         "type": "text",
         "value": " is just "
        },
        {
         "type": "inlineCode",
         "value": "func = decorator(func)"
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
   "id": "s-recursion",
   "num": null,
   "title": "Recursion",
   "stars": 0,
   "chapter": "functions",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A function that calls itself; needs a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "base case"
        }
       ]
      },
      {
       "type": "text",
       "value": " to stop. Deep recursion raises "
      },
      {
       "type": "inlineCode",
       "value": "RecursionError"
      },
      {
       "type": "text",
       "value": " (there is a recursion limit)."
      }
     ]
    }
   ]
  },
  {
   "id": "s-class-and-object",
   "num": null,
   "title": "Class and Object",
   "stars": 0,
   "chapter": "oop",
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
             "value": "Class"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a blueprint; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "object/instance"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a thing built from it."
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
             "value": "Attribute"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a variable on an object/class; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "method"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a function in a class."
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
           "value": "self"
          },
          {
           "type": "text",
           "value": " refers to the current instance (a convention, not a keyword)."
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
           "value": "__init__()"
          },
          {
           "type": "text",
           "value": " runs when an instance is created."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "class Student:\n    def __init__(self, name):\n        self.name = name",
     "lang": "python"
    }
   ]
  },
  {
   "id": "s-init-vs-new-vs-del",
   "num": null,
   "title": "Init vs New vs Del",
   "stars": 0,
   "chapter": "oop",
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
           "value": "__init__()"
          },
          {
           "type": "text",
           "value": " "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "initializes"
            }
           ]
          },
          {
           "type": "text",
           "value": " an already-created instance."
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
           "value": "__new__()"
          },
          {
           "type": "text",
           "value": " actually "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "creates"
            }
           ]
          },
          {
           "type": "text",
           "value": " the instance."
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
           "value": "__del__()"
          },
          {
           "type": "text",
           "value": " is a finalizer with unpredictable timing — don't rely on it; use context managers for cleanup."
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
         "value": "__init__"
        },
        {
         "type": "text",
         "value": " is commonly called the constructor, but it's technically an initializer."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-four-pillars",
   "num": null,
   "title": "Four Pillars",
   "stars": 1,
   "chapter": "oop",
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
             "value": "Encapsulation"
            }
           ]
          },
          {
           "type": "text",
           "value": ": bundle data + methods and control access. Conventions: "
          },
          {
           "type": "inlineCode",
           "value": "name"
          },
          {
           "type": "text",
           "value": " public, "
          },
          {
           "type": "inlineCode",
           "value": "_salary"
          },
          {
           "type": "text",
           "value": " protected (by convention), "
          },
          {
           "type": "inlineCode",
           "value": "__password"
          },
          {
           "type": "text",
           "value": " name-mangled. Python does "
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
           "value": " enforce private access like Java."
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
             "value": "Inheritance"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a child class reuses/extends a parent. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Overriding"
            }
           ]
          },
          {
           "type": "text",
           "value": " = child redefines a parent method. "
          },
          {
           "type": "inlineCode",
           "value": "super()"
          },
          {
           "type": "text",
           "value": " calls the parent via the MRO. Types: single, multiple, multilevel, hierarchical, hybrid."
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
             "value": "Polymorphism"
            }
           ]
          },
          {
           "type": "text",
           "value": ": same method name behaves differently per object. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Duck typing"
            }
           ]
          },
          {
           "type": "text",
           "value": ": if an object has the needed behaviour, Python accepts it regardless of its class."
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
             "value": "Abstraction"
            }
           ]
          },
          {
           "type": "text",
           "value": ": hide details, expose only what's needed. Use the "
          },
          {
           "type": "inlineCode",
           "value": "abc"
          },
          {
           "type": "text",
           "value": " module: an abstract class with "
          },
          {
           "type": "inlineCode",
           "value": "@abstractmethod"
          },
          {
           "type": "text",
           "value": " cannot be instantiated until subclasses implement those methods."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "from abc import ABC, abstractmethod\nclass Payment(ABC):\n    @abstractmethod\n    def pay(self): ...",
     "lang": "python"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Python has no Java-style method overloading — a later same-named method replaces the earlier one. Use default args or "
        },
        {
         "type": "inlineCode",
         "value": "*args"
        },
        {
         "type": "text",
         "value": " instead."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-method-types",
   "num": null,
   "title": "Method Types",
   "stars": 0,
   "chapter": "oop",
   "nodes": [
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
           "value": "Method"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "First arg"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Use"
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
           "value": "Instance"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "self"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "work with object data"
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
           "value": "Class ("
          },
          {
           "type": "inlineCode",
           "value": "@classmethod"
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
           "type": "inlineCode",
           "value": "cls"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "work with class-level data"
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
           "value": "Static ("
          },
          {
           "type": "inlineCode",
           "value": "@staticmethod"
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
           "value": "none"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "plain utility"
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
   "id": "s-key-oop-terms",
   "num": null,
   "title": "Key OOP Terms",
   "stars": 0,
   "chapter": "oop",
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
             "value": "MRO (Method Resolution Order)"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the order Python searches classes for a method."
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
           "value": "isinstance()"
          },
          {
           "type": "text",
           "value": " object-vs-class; "
          },
          {
           "type": "inlineCode",
           "value": "issubclass()"
          },
          {
           "type": "text",
           "value": " class-vs-class."
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
             "value": "Composition / Aggregation / Association"
            }
           ]
          },
          {
           "type": "text",
           "value": ": HAS-A relationships (aggregation = contained objects can live independently)."
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
             "value": "Dunder / magic methods"
            }
           ]
          },
          {
           "type": "text",
           "value": ": "
          },
          {
           "type": "inlineCode",
           "value": "__init__"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "__str__"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "__len__"
          },
          {
           "type": "text",
           "value": ", etc."
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
   "id": "s-iterable-vs-iterator",
   "num": null,
   "title": "Iterable vs Iterator",
   "stars": 0,
   "chapter": "iterators-and-generators",
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
             "value": "Iterable"
            }
           ]
          },
          {
           "type": "text",
           "value": ": an object you can get an iterator from via "
          },
          {
           "type": "inlineCode",
           "value": "iter()"
          },
          {
           "type": "text",
           "value": " (list, tuple, str, set, dict, range)."
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
             "value": "Iterator"
            }
           ]
          },
          {
           "type": "text",
           "value": ": produces one item at a time via "
          },
          {
           "type": "inlineCode",
           "value": "next()"
          },
          {
           "type": "text",
           "value": "; raises "
          },
          {
           "type": "inlineCode",
           "value": "StopIteration"
          },
          {
           "type": "text",
           "value": " when done."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "it = iter([10, 20])\nnext(it)  # 10",
     "lang": "python"
    }
   ]
  },
  {
   "id": "s-generator",
   "num": null,
   "title": "Generator",
   "stars": 1,
   "chapter": "iterators-and-generators",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A special iterator that produces values "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "lazily"
        }
       ]
      },
      {
       "type": "text",
       "value": " using "
      },
      {
       "type": "inlineCode",
       "value": "yield"
      },
      {
       "type": "text",
       "value": ". "
      },
      {
       "type": "inlineCode",
       "value": "yield"
      },
      {
       "type": "text",
       "value": " returns a value and pauses, keeping the function's state for next time. Memory-efficient — it doesn't store the whole sequence."
      }
     ]
    },
    {
     "type": "code",
     "value": "def nums():\n    yield 1\n    yield 2",
     "lang": "python"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Every generator is an iterator, but not every iterable is an iterator. A generator is consumed once — it doesn't auto-restart."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-exception-handling",
   "num": null,
   "title": "Exception Handling",
   "stars": 1,
   "chapter": "errors-and-files",
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
           "value": "try"
          },
          {
           "type": "text",
           "value": " holds risky code; "
          },
          {
           "type": "inlineCode",
           "value": "except"
          },
          {
           "type": "text",
           "value": " handles an error; "
          },
          {
           "type": "inlineCode",
           "value": "else"
          },
          {
           "type": "text",
           "value": " runs if no error; "
          },
          {
           "type": "inlineCode",
           "value": "finally"
          },
          {
           "type": "text",
           "value": " always runs (barring process kill); "
          },
          {
           "type": "inlineCode",
           "value": "raise"
          },
          {
           "type": "text",
           "value": " throws one."
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
           "value": "Catch "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "specific"
            }
           ]
          },
          {
           "type": "text",
           "value": " exceptions, not a bare "
          },
          {
           "type": "inlineCode",
           "value": "except"
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
     "type": "code",
     "value": "try:\n    print(a / b)\nexcept ZeroDivisionError:\n    print(\"no divide by zero\")\nfinally:\n    print(\"done\")",
     "lang": "python"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common ones: "
      },
      {
       "type": "inlineCode",
       "value": "ValueError"
      },
      {
       "type": "text",
       "value": " (right type, bad value), "
      },
      {
       "type": "inlineCode",
       "value": "TypeError"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "KeyError"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "IndexError"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "NameError"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "AttributeError"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "FileNotFoundError"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "StopIteration"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "RecursionError"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Custom exception"
            }
           ]
          },
          {
           "type": "text",
           "value": ": inherit from "
          },
          {
           "type": "inlineCode",
           "value": "Exception"
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
             "value": "Syntax error vs exception"
            }
           ]
          },
          {
           "type": "text",
           "value": ": syntax error = invalid code structure; exception = valid code that fails at runtime."
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
             "type": "inlineCode",
             "value": "raise"
            },
            {
             "type": "text",
             "value": " vs "
            },
            {
             "type": "inlineCode",
             "value": "assert"
            }
           ]
          },
          {
           "type": "text",
           "value": ": "
          },
          {
           "type": "inlineCode",
           "value": "assert"
          },
          {
           "type": "text",
           "value": " checks a condition and raises "
          },
          {
           "type": "inlineCode",
           "value": "AssertionError"
          },
          {
           "type": "text",
           "value": ", but assertions can be disabled with "
          },
          {
           "type": "inlineCode",
           "value": "-O"
          },
          {
           "type": "text",
           "value": ", so don't use them for essential validation."
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
   "id": "s-file-handling",
   "num": null,
   "title": "File Handling",
   "stars": 0,
   "chapter": "errors-and-files",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Open with modes: "
      },
      {
       "type": "inlineCode",
       "value": "r"
      },
      {
       "type": "text",
       "value": " read (must exist), "
      },
      {
       "type": "inlineCode",
       "value": "w"
      },
      {
       "type": "text",
       "value": " write (creates/overwrites), "
      },
      {
       "type": "inlineCode",
       "value": "a"
      },
      {
       "type": "text",
       "value": " append (creates if missing), "
      },
      {
       "type": "inlineCode",
       "value": "x"
      },
      {
       "type": "text",
       "value": " create-new, "
      },
      {
       "type": "inlineCode",
       "value": "+"
      },
      {
       "type": "text",
       "value": " read+write, "
      },
      {
       "type": "inlineCode",
       "value": "b"
      },
      {
       "type": "text",
       "value": "/"
      },
      {
       "type": "inlineCode",
       "value": "t"
      },
      {
       "type": "text",
       "value": " binary/text. Methods: "
      },
      {
       "type": "inlineCode",
       "value": "read"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "readline"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "readlines"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "write"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "writelines"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "seek"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "tell"
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "code",
     "value": "with open(\"test.txt\", \"w\") as f:\n    f.write(\"Hello\")",
     "lang": "python"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Use "
        },
        {
         "type": "inlineCode",
         "value": "with open(...)"
        },
        {
         "type": "text",
         "value": " — it auto-closes the file even if an exception occurs. "
        },
        {
         "type": "inlineCode",
         "value": "w"
        },
        {
         "type": "text",
         "value": " overwrites, "
        },
        {
         "type": "inlineCode",
         "value": "a"
        },
        {
         "type": "text",
         "value": " appends."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-concurrency-vs-parallelism",
   "num": null,
   "title": "Concurrency vs Parallelism",
   "stars": 0,
   "chapter": "concurrency",
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
             "value": "Concurrency"
            }
           ]
          },
          {
           "type": "text",
           "value": ": several tasks make progress over overlapping periods."
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
             "value": "Parallelism"
            }
           ]
          },
          {
           "type": "text",
           "value": ": tasks truly run at the same time on multiple cores."
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
             "value": "Thread"
            }
           ]
          },
          {
           "type": "text",
           "value": ": lightweight unit inside a process (shares memory). "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Process"
            }
           ]
          },
          {
           "type": "text",
           "value": ": independent program with its own memory."
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
   "id": "s-the-gil",
   "num": null,
   "title": "The GIL",
   "stars": 1,
   "chapter": "concurrency",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Global Interpreter Lock"
        }
       ]
      },
      {
       "type": "text",
       "value": " in standard CPython lets only "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "one thread run Python bytecode at a time"
        }
       ]
      },
      {
       "type": "text",
       "value": ". So:"
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
           "value": "Threads "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "don't"
            }
           ]
          },
          {
           "type": "text",
           "value": " speed up CPU-bound work, but "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "do"
            }
           ]
          },
          {
           "type": "text",
           "value": " help I/O-bound work (network, files) because the GIL is released while waiting."
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
             "value": "Multiprocessing"
            }
           ]
          },
          {
           "type": "text",
           "value": " gives real CPU parallelism (separate memory, uses multiple cores)."
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
           "value": "Free-threaded CPython builds exist, so the GIL isn't universal."
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
   "id": "s-threading-vs-multiprocessing",
   "num": null,
   "title": "Threading vs Multiprocessing",
   "stars": 0,
   "chapter": "concurrency",
   "nodes": [
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
         "children": []
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Threading"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Multiprocessing"
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
           "value": "Unit"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Thread"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Process"
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
           "value": "Memory"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Shared"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Separate"
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
           "value": "CPU-bound"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Limited by GIL"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Real parallelism"
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
           "value": "I/O-bound"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Good"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Works, heavier"
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
           "value": "Overhead / comms"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Lower / shared memory"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Higher / IPC, queues"
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
   "id": "s-async-asyncio",
   "num": null,
   "title": "Async (asyncio)",
   "stars": 0,
   "chapter": "concurrency",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Cooperative tasks that don't block while waiting. "
      },
      {
       "type": "inlineCode",
       "value": "async def"
      },
      {
       "type": "text",
       "value": " defines a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "coroutine"
        }
       ]
      },
      {
       "type": "text",
       "value": "; "
      },
      {
       "type": "inlineCode",
       "value": "await"
      },
      {
       "type": "text",
       "value": " suspends it until an awaitable finishes; the "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "event loop"
        }
       ]
      },
      {
       "type": "text",
       "value": " schedules everything, usually on one thread. "
      },
      {
       "type": "inlineCode",
       "value": "await"
      },
      {
       "type": "text",
       "value": " does "
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
       "value": " spawn a thread."
      }
     ]
    },
    {
     "type": "code",
     "value": "import asyncio\nasync def task():\n    await asyncio.sleep(1)\nasyncio.run(task())",
     "lang": "python"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: I/O-bound → threads or asyncio; CPU-bound → multiprocessing."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-memory-management",
   "num": null,
   "title": "Memory Management",
   "stars": 0,
   "chapter": "memory-and-copying",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Everything is an object; variables hold references. CPython uses "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "reference counting"
        }
       ]
      },
      {
       "type": "text",
       "value": " plus a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "garbage collector"
        }
       ]
      },
      {
       "type": "text",
       "value": " that handles reference cycles. "
      },
      {
       "type": "inlineCode",
       "value": "del"
      },
      {
       "type": "text",
       "value": " removes a name, not necessarily the object. Python frees memory automatically, but you must still manage resources like files and connections."
      }
     ]
    }
   ]
  },
  {
   "id": "s-shallow-vs-deep-copy",
   "num": null,
   "title": "Shallow vs Deep Copy",
   "stars": 1,
   "chapter": "memory-and-copying",
   "nodes": [
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
           "value": "Operation"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "New outer object?"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Nested copied?"
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
           "value": "Assignment "
          },
          {
           "type": "inlineCode",
           "value": "="
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "No (same object)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "No"
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
           "value": "copy.copy"
          },
          {
           "type": "text",
           "value": " (shallow)"
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
           "value": "No (shares nested)"
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
           "value": "copy.deepcopy"
          },
          {
           "type": "text",
           "value": " (deep)"
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
           "value": "Yes, recursively"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "import copy\noriginal = [[1, 2], [3, 4]]\nshallow = copy.copy(original)\ndeep = copy.deepcopy(original)\noriginal[0][0] = 100\n# shallow -> [[100, 2], [3, 4]]  (nested shared)\n# deep    -> [[1, 2], [3, 4]]    (fully independent)",
     "lang": "python"
    }
   ]
  },
  {
   "id": "s-mutable-default-argument-trap",
   "num": null,
   "title": "Mutable Default Argument Trap",
   "stars": 1,
   "chapter": "memory-and-copying",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A default like "
      },
      {
       "type": "inlineCode",
       "value": "items=[]"
      },
      {
       "type": "text",
       "value": " is created "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "once"
        }
       ]
      },
      {
       "type": "text",
       "value": " at definition and reused across calls, so it accumulates state."
      }
     ]
    },
    {
     "type": "code",
     "value": "def add_item(item, items=None):   # correct\n    if items is None:\n        items = []\n    items.append(item)\n    return items",
     "lang": "python"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Never use a mutable default ("
        },
        {
         "type": "inlineCode",
         "value": "[]"
        },
        {
         "type": "text",
         "value": ", "
        },
        {
         "type": "inlineCode",
         "value": "{}"
        },
        {
         "type": "text",
         "value": "); default to "
        },
        {
         "type": "inlineCode",
         "value": "None"
        },
        {
         "type": "text",
         "value": " and create inside."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-modules-and-packages",
   "num": null,
   "title": "Modules and Packages",
   "stars": 0,
   "chapter": "modules-venv-and-pip",
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
             "value": "Module"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a "
          },
          {
           "type": "inlineCode",
           "value": ".py"
          },
          {
           "type": "text",
           "value": " file of reusable code. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Package"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a folder of modules (regular packages use "
          },
          {
           "type": "inlineCode",
           "value": "__init__.py"
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
           "value": "Imports: "
          },
          {
           "type": "inlineCode",
           "value": "import math"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "from math import sqrt"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "import math as m"
          },
          {
           "type": "text",
           "value": ". Avoid "
          },
          {
           "type": "inlineCode",
           "value": "from module import *"
          },
          {
           "type": "text",
           "value": " in app code (naming conflicts)."
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
   "id": "s-if-name-main",
   "num": null,
   "title": "if __name__ == \"__main__\"",
   "stars": 0,
   "chapter": "modules-venv-and-pip",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "__name__"
      },
      {
       "type": "text",
       "value": " is "
      },
      {
       "type": "inlineCode",
       "value": "\"__main__\""
      },
      {
       "type": "text",
       "value": " when the file runs directly, else the module's name. Guard startup code with it so it doesn't run on import."
      }
     ]
    }
   ]
  },
  {
   "id": "s-pip-and-virtual-environments",
   "num": null,
   "title": "pip and Virtual Environments",
   "stars": 0,
   "chapter": "modules-venv-and-pip",
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
             "value": "pip"
            }
           ]
          },
          {
           "type": "text",
           "value": " installs packages from "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "PyPI"
            }
           ]
          },
          {
           "type": "text",
           "value": "; a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "virtual environment"
            }
           ]
          },
          {
           "type": "text",
           "value": " ("
          },
          {
           "type": "inlineCode",
           "value": "venv"
          },
          {
           "type": "text",
           "value": ") isolates a project's dependencies."
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
           "value": "python -m venv venv"
          },
          {
           "type": "text",
           "value": " → "
          },
          {
           "type": "inlineCode",
           "value": "source venv/bin/activate"
          },
          {
           "type": "text",
           "value": " → "
          },
          {
           "type": "inlineCode",
           "value": "pip install ..."
          },
          {
           "type": "text",
           "value": " → "
          },
          {
           "type": "inlineCode",
           "value": "pip freeze > requirements.txt"
          },
          {
           "type": "text",
           "value": " → "
          },
          {
           "type": "inlineCode",
           "value": "pip install -r requirements.txt"
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
         "value": "Remember: One venv per project keeps dependencies isolated."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-handy-built-in-functions",
   "num": null,
   "title": "Handy Built-in Functions",
   "stars": 0,
   "chapter": "built-ins-and-data-structures",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "len"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "type"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "isinstance"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "id"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "range"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "enumerate"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "zip"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "map"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "filter"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "sorted"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "reversed"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "sum/min/max"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "abs"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "round"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "all"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "any"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "pow"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "divmod"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "chr/ord"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "bin/hex/oct"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "callable"
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
           "type": "inlineCode",
           "value": "map()"
          },
          {
           "type": "text",
           "value": " and "
          },
          {
           "type": "inlineCode",
           "value": "filter()"
          },
          {
           "type": "text",
           "value": " return lazy iterators — wrap in "
          },
          {
           "type": "inlineCode",
           "value": "list()"
          },
          {
           "type": "text",
           "value": " to materialize."
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
           "value": "all()"
          },
          {
           "type": "text",
           "value": " → every item truthy; "
          },
          {
           "type": "inlineCode",
           "value": "any()"
          },
          {
           "type": "text",
           "value": " → at least one truthy."
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
           "value": "reduce()"
          },
          {
           "type": "text",
           "value": " (from "
          },
          {
           "type": "inlineCode",
           "value": "functools"
          },
          {
           "type": "text",
           "value": ") combines items into one value."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "list(map(lambda x: x*x, [1, 2, 3]))      # [1, 4, 9]\nlist(filter(lambda x: x % 2 == 0, [1,2,3,4]))  # [2, 4]",
     "lang": "python"
    }
   ]
  },
  {
   "id": "s-collections-module",
   "num": null,
   "title": "collections Module",
   "stars": 0,
   "chapter": "built-ins-and-data-structures",
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
           "value": "Counter"
          },
          {
           "type": "text",
           "value": ": counts occurrences. "
          },
          {
           "type": "inlineCode",
           "value": "defaultdict"
          },
          {
           "type": "text",
           "value": ": default value for missing keys. "
          },
          {
           "type": "inlineCode",
           "value": "deque"
          },
          {
           "type": "text",
           "value": ": fast add/remove at both ends (use for queues/stacks). "
          },
          {
           "type": "inlineCode",
           "value": "namedtuple"
          },
          {
           "type": "text",
           "value": ": tuple with named fields. "
          },
          {
           "type": "inlineCode",
           "value": "OrderedDict"
          },
          {
           "type": "text",
           "value": ": order-aware dict (plain dicts also keep order now)."
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
   "id": "s-time-complexity-typical",
   "num": null,
   "title": "Time Complexity (typical)",
   "stars": 0,
   "chapter": "built-ins-and-data-structures",
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
           "value": "Operation"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Time"
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
           "value": "List index / append / pop-end"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1) (append amortized)"
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
           "value": "List search / insert or pop at front"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
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
           "value": "Dict / set lookup and insert"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1) average"
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
           "value": "Sorting"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n log n)"
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
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Stack"
            }
           ]
          },
          {
           "type": "text",
           "value": " = LIFO (list "
          },
          {
           "type": "inlineCode",
           "value": "append"
          },
          {
           "type": "text",
           "value": "/"
          },
          {
           "type": "inlineCode",
           "value": "pop"
          },
          {
           "type": "text",
           "value": "). "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Queue"
            }
           ]
          },
          {
           "type": "text",
           "value": " = FIFO ("
          },
          {
           "type": "inlineCode",
           "value": "deque.append"
          },
          {
           "type": "text",
           "value": "/"
          },
          {
           "type": "inlineCode",
           "value": "popleft"
          },
          {
           "type": "text",
           "value": ")."
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
   "id": "s-type-hints-and-dataclasses",
   "num": null,
   "title": "Type Hints and Dataclasses",
   "stars": 0,
   "chapter": "useful-concepts-and-libraries",
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
             "value": "Type hints"
            }
           ]
          },
          {
           "type": "text",
           "value": " document expected types ("
          },
          {
           "type": "inlineCode",
           "value": "def add(a: int) -> int"
          },
          {
           "type": "text",
           "value": "). Not enforced at runtime; tools like "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "mypy"
            }
           ]
          },
          {
           "type": "text",
           "value": " check them statically. "
          },
          {
           "type": "inlineCode",
           "value": "X | None"
          },
          {
           "type": "text",
           "value": " marks an optional value."
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
             "value": "Dataclass"
            }
           ]
          },
          {
           "type": "text",
           "value": " ("
          },
          {
           "type": "inlineCode",
           "value": "@dataclass"
          },
          {
           "type": "text",
           "value": ") auto-generates "
          },
          {
           "type": "inlineCode",
           "value": "__init__"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "__repr__"
          },
          {
           "type": "text",
           "value": ", etc. for data-holding classes."
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
   "id": "s-context-managers",
   "num": null,
   "title": "Context Managers",
   "stars": 0,
   "chapter": "useful-concepts-and-libraries",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Manage setup and cleanup via "
      },
      {
       "type": "inlineCode",
       "value": "with"
      },
      {
       "type": "text",
       "value": ", using "
      },
      {
       "type": "inlineCode",
       "value": "__enter__()"
      },
      {
       "type": "text",
       "value": " and "
      },
      {
       "type": "inlineCode",
       "value": "__exit__()"
      },
      {
       "type": "text",
       "value": ". Used for files, DB connections, locks. The "
      },
      {
       "type": "inlineCode",
       "value": "contextlib"
      },
      {
       "type": "text",
       "value": " module helps build them."
      }
     ]
    }
   ]
  },
  {
   "id": "s-regex",
   "num": null,
   "title": "Regex",
   "stars": 0,
   "chapter": "useful-concepts-and-libraries",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The "
      },
      {
       "type": "inlineCode",
       "value": "re"
      },
      {
       "type": "text",
       "value": " module: "
      },
      {
       "type": "inlineCode",
       "value": "match"
      },
      {
       "type": "text",
       "value": " (start), "
      },
      {
       "type": "inlineCode",
       "value": "search"
      },
      {
       "type": "text",
       "value": " (anywhere), "
      },
      {
       "type": "inlineCode",
       "value": "findall"
      },
      {
       "type": "text",
       "value": " (all matches), "
      },
      {
       "type": "inlineCode",
       "value": "sub"
      },
      {
       "type": "text",
       "value": " (replace). Example: "
      },
      {
       "type": "inlineCode",
       "value": "re.findall(r\"\\d+\", text)"
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
   "id": "s-libraries-to-recognize",
   "num": null,
   "title": "Libraries to Recognize",
   "stars": 0,
   "chapter": "useful-concepts-and-libraries",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Standard: "
      },
      {
       "type": "inlineCode",
       "value": "os"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "sys"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "math"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "random"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "datetime"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "json"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "re"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "collections"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "itertools"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "functools"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "copy"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "pathlib"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "logging"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "pickle"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "csv"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "sqlite3"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "hashlib"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "socket"
      },
      {
       "type": "text",
       "value": ". Third-party: Requests, Pydantic, SQLAlchemy, NumPy, Pandas, Matplotlib, FastAPI/Django/Flask, Pytest, Celery, Boto3, LangChain."
      }
     ]
    }
   ]
  },
  {
   "id": "s-frameworks",
   "num": null,
   "title": "Frameworks",
   "stars": 0,
   "chapter": "backend-essentials-for-python-backend-roles",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
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
         "children": []
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Django"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Flask"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "FastAPI"
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
           "value": "Type"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Full framework"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Microframework"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "API framework"
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
           "value": "Built-in ORM"
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
           "value": "No"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "No"
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
           "value": "Auto API docs"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "No"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "No"
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
           "value": "Async"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Supported"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Limited"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Strong"
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
           "value": "Best for"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Full web apps"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Lightweight apps"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "APIs"
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
   "id": "s-rest-http-and-status-codes",
   "num": null,
   "title": "REST, HTTP and Status Codes",
   "stars": 0,
   "chapter": "backend-essentials-for-python-backend-roles",
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
             "value": "Idempotent"
            }
           ]
          },
          {
           "type": "text",
           "value": " = repeating a request has the same effect as doing it once. GET (safe, cacheable), PUT and DELETE are idempotent; POST and PATCH are generally not."
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
           "value": "Status codes: 200 OK, 201 Created, 204 No Content; 301/302 redirects; 400 Bad Request, "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "401 not authenticated"
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
             "value": "403 authenticated but not allowed"
            }
           ]
          },
          {
           "type": "text",
           "value": ", 404 Not Found, 409 Conflict, 429 Too Many Requests; 500 server error, 502/503/504 gateway/unavailable/timeout."
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
             "value": "ORM"
            }
           ]
          },
          {
           "type": "text",
           "value": " maps tables to objects (SQLAlchemy, Django ORM). A "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "transaction"
            }
           ]
          },
          {
           "type": "text",
           "value": " groups operations; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "commit"
            }
           ]
          },
          {
           "type": "text",
           "value": " saves, "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "rollback"
            }
           ]
          },
          {
           "type": "text",
           "value": " undoes. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Connection pooling"
            }
           ]
          },
          {
           "type": "text",
           "value": " reuses connections."
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
   "id": "s-security-and-config",
   "num": null,
   "title": "Security and Config",
   "stars": 0,
   "chapter": "backend-essentials-for-python-backend-roles",
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
             "value": "SQL injection"
            }
           ]
          },
          {
           "type": "text",
           "value": ": never build SQL with string concatenation; use "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "parameterized queries"
            }
           ]
          },
          {
           "type": "text",
           "value": " ("
          },
          {
           "type": "inlineCode",
           "value": "cursor.execute(\"... WHERE name = ?\", (name,))"
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
           "value": "Know: input validation, XSS, CSRF, password hashing, encryption, authentication vs authorization, JWT, CORS, rate limiting."
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
           "value": "Keep secrets in "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "environment variables"
            }
           ]
          },
          {
           "type": "text",
           "value": " ("
          },
          {
           "type": "inlineCode",
           "value": "os.getenv"
          },
          {
           "type": "text",
           "value": "), never hardcoded or committed."
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
   "id": "s-why-x-vs-y-common-confusions",
   "num": null,
   "title": "Why X vs Y — Common Confusions",
   "stars": 0,
   "chapter": "why-x-vs-y-common-confusions",
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
           "value": "Question"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Short answer"
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
           "value": "=="
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "is"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "=="
          },
          {
           "type": "text",
           "value": " same value; "
          },
          {
           "type": "inlineCode",
           "value": "is"
          },
          {
           "type": "text",
           "value": " same object. Use "
          },
          {
           "type": "inlineCode",
           "value": "is None"
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
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "type()"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "isinstance()"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "isinstance"
          },
          {
           "type": "text",
           "value": " also accepts subclasses — prefer it."
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
           "value": "list vs tuple"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "List mutable; tuple immutable (usable as dict key if all-hashable)."
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
           "value": "set vs frozenset"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "set mutable; frozenset immutable and hashable."
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
           "value": "append()"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "extend()"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "append"
          },
          {
           "type": "text",
           "value": " adds one object; "
          },
          {
           "type": "inlineCode",
           "value": "extend"
          },
          {
           "type": "text",
           "value": " adds each element."
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
           "value": "remove()"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "pop()"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "remove(value)"
          },
          {
           "type": "text",
           "value": " by value; "
          },
          {
           "type": "inlineCode",
           "value": "pop(index)"
          },
          {
           "type": "text",
           "value": " by index and returns it."
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
           "value": "sort()"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "sorted()"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "sort()"
          },
          {
           "type": "text",
           "value": " mutates list, returns None; "
          },
          {
           "type": "inlineCode",
           "value": "sorted()"
          },
          {
           "type": "text",
           "value": " returns a new list."
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
           "value": "dict[k]"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "dict.get(k)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "[k]"
          },
          {
           "type": "text",
           "value": " raises KeyError; "
          },
          {
           "type": "inlineCode",
           "value": "get"
          },
          {
           "type": "text",
           "value": " returns None/default."
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
           "value": "find()"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "index()"
          },
          {
           "type": "text",
           "value": " (str)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "find"
          },
          {
           "type": "text",
           "value": " returns -1 if absent; "
          },
          {
           "type": "inlineCode",
           "value": "index"
          },
          {
           "type": "text",
           "value": " raises ValueError."
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
           "value": "assignment vs shallow vs deep copy"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "New outer object? nested copied? — No/No, Yes/No, Yes/Yes."
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
           "value": "iterator vs generator"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Generator is a simpler lazy iterator made with "
          },
          {
           "type": "inlineCode",
           "value": "yield"
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
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "iterable vs iterator"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Iterable gives an iterator; iterator produces items via "
          },
          {
           "type": "inlineCode",
           "value": "next()"
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
       "type": "tableRow",
       "children": [
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "__init__"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "__new__"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "__new__"
          },
          {
           "type": "text",
           "value": " creates the instance; "
          },
          {
           "type": "inlineCode",
           "value": "__init__"
          },
          {
           "type": "text",
           "value": " initializes it."
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
           "value": "overriding vs overloading"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Python has overriding; no true overloading (later def wins)."
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
           "value": "threading vs multiprocessing"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Threads share memory, GIL-limited for CPU; processes give real parallelism."
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
           "value": "raise"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "assert"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "assert"
          },
          {
           "type": "text",
           "value": " can be disabled with "
          },
          {
           "type": "inlineCode",
           "value": "-O"
          },
          {
           "type": "text",
           "value": "; don't use it for real validation."
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
           "value": "return"
          },
          {
           "type": "text",
           "value": " vs "
          },
          {
           "type": "inlineCode",
           "value": "print"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "return"
          },
          {
           "type": "text",
           "value": " hands a value back; "
          },
          {
           "type": "inlineCode",
           "value": "print"
          },
          {
           "type": "text",
           "value": " only displays."
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
