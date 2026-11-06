// AUTO-GENERATED from reference/java.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs java
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const javaCheatsheet: CheatDoc = {
 "title": "Java",
 "tagline": "The whole language on one page — ideas, examples and the rules to remember.",
 "chapters": [
  {
   "id": "java-basics-how-it-runs",
   "title": "Java Basics & How It Runs"
  },
  {
   "id": "variables-types-operators",
   "title": "Variables, Types & Operators"
  },
  {
   "id": "strings",
   "title": "Strings"
  },
  {
   "id": "oop-classes-inheritance-polymorphism",
   "title": "OOP: Classes, Inheritance & Polymorphism"
  },
  {
   "id": "abstraction-interfaces-design",
   "title": "Abstraction, Interfaces & Design"
  },
  {
   "id": "exceptions",
   "title": "Exceptions"
  },
  {
   "id": "collections",
   "title": "Collections"
  },
  {
   "id": "generics",
   "title": "Generics"
  },
  {
   "id": "functional-java-streams",
   "title": "Functional Java & Streams"
  },
  {
   "id": "concurrency-multithreading",
   "title": "Concurrency & Multithreading"
  },
  {
   "id": "jvm-memory-gc",
   "title": "JVM, Memory & GC"
  },
  {
   "id": "modern-java",
   "title": "Modern Java"
  },
  {
   "id": "practical-java",
   "title": "Practical Java"
  },
  {
   "id": "common-why-x-vs-y-comparisons",
   "title": "Common \"Why X vs Y?\" Comparisons"
  }
 ],
 "sections": [
  {
   "id": "s-what-java-is",
   "num": null,
   "title": "What Java Is",
   "stars": 1,
   "chapter": "java-basics-how-it-runs",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Java is a high-level, class-based, object-oriented language built to be portable: "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Write Once, Run Anywhere (WORA)"
        }
       ]
      },
      {
       "type": "text",
       "value": ". You compile source once to bytecode, and any machine's JVM runs it."
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
             "value": "JDK"
            }
           ]
          },
          {
           "type": "text",
           "value": ": develop + compile + run (includes the JRE + tools like "
          },
          {
           "type": "inlineCode",
           "value": "javac"
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
             "value": "JRE"
            }
           ]
          },
          {
           "type": "text",
           "value": ": everything needed to run Java apps."
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
             "value": "JVM"
            }
           ]
          },
          {
           "type": "text",
           "value": ": the engine that actually executes bytecode."
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
         "value": "Remember: JDK contains JRE contains JVM. JDK develops, JRE runs, JVM executes."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-compile-vs-execute",
   "num": null,
   "title": "Compile vs Execute",
   "stars": 1,
   "chapter": "java-basics-how-it-runs",
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
             "value": "Compilation"
            }
           ]
          },
          {
           "type": "text",
           "value": ": "
          },
          {
           "type": "inlineCode",
           "value": ".java"
          },
          {
           "type": "text",
           "value": " source -> "
          },
          {
           "type": "inlineCode",
           "value": "javac"
          },
          {
           "type": "text",
           "value": " -> "
          },
          {
           "type": "inlineCode",
           "value": ".class"
          },
          {
           "type": "text",
           "value": " bytecode."
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
             "value": "Execution"
            }
           ]
          },
          {
           "type": "text",
           "value": ": JVM loads the "
          },
          {
           "type": "inlineCode",
           "value": ".class"
          },
          {
           "type": "text",
           "value": " and runs it, translating bytecode to machine code."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": ".java  ->  javac  ->  .class (bytecode)  ->  JVM  ->  machine code"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Bytecode is the intermediate "
      },
      {
       "type": "inlineCode",
       "value": ".class"
      },
      {
       "type": "text",
       "value": " code. It is platform-independent; each OS's JVM runs it, which is why Java is portable."
      }
     ]
    }
   ]
  },
  {
   "id": "s-the-main-method",
   "num": null,
   "title": "The main Method",
   "stars": 0,
   "chapter": "java-basics-how-it-runs",
   "nodes": [
    {
     "type": "code",
     "value": "public static void main(String[] args) { }",
     "lang": "java"
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
           "value": "public"
          },
          {
           "type": "text",
           "value": ": JVM must be able to access it."
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
           "value": "static"
          },
          {
           "type": "text",
           "value": ": JVM calls it without creating an object."
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
           "value": "void"
          },
          {
           "type": "text",
           "value": ": returns nothing."
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
           "value": "String[] args"
          },
          {
           "type": "text",
           "value": ": command-line arguments."
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
         "value": "main"
        },
        {
         "type": "text",
         "value": " is static so the JVM can start the program without an object first."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-how-the-jvm-runs-code",
   "num": null,
   "title": "How the JVM Runs Code",
   "stars": 0,
   "chapter": "java-basics-how-it-runs",
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
             "value": "Class loading"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a class loader loads bytecode when needed, in three steps — Loading, Linking (verification, preparation, resolution), Initialization. Loaders: Bootstrap -> Platform -> Application."
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
             "value": "Interpreter"
            }
           ]
          },
          {
           "type": "text",
           "value": ": runs bytecode instruction by instruction."
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
             "value": "JIT (Just-In-Time) compiler"
            }
           ]
          },
          {
           "type": "text",
           "value": ": compiles frequently run (\"hot\") bytecode to native code for speed."
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
             "value": "GC"
            }
           ]
          },
          {
           "type": "text",
           "value": ": reclaims unreachable heap objects automatically."
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
         "value": "Remember: JVM = runs bytecode; JIT = speeds up hot code; GC = frees unused memory."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-packages-imports",
   "num": null,
   "title": "Packages & Imports",
   "stars": 0,
   "chapter": "java-basics-how-it-runs",
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
             "value": "Package"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a namespace that groups related classes and avoids name clashes. Fully qualified name = package + class."
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
             "value": "import"
            }
           ]
          },
          {
           "type": "text",
           "value": ": lets you use a class without its full package name. "
          },
          {
           "type": "inlineCode",
           "value": "import java.util.*;"
          },
          {
           "type": "text",
           "value": " imports that package's types but not subpackages."
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
           "value": "java.lang"
          },
          {
           "type": "text",
           "value": " (String, Object, Math, System) is imported automatically."
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
   "id": "s-variable-kinds-default-values",
   "num": null,
   "title": "Variable Kinds & Default Values",
   "stars": 0,
   "chapter": "variables-types-operators",
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
             "value": "Local"
            }
           ]
          },
          {
           "type": "text",
           "value": ": inside a method/block. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Has no default — must be initialized before use."
            }
           ]
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
             "value": "Instance"
            }
           ]
          },
          {
           "type": "text",
           "value": ": belongs to an object (non-static)."
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
             "value": "Static"
            }
           ]
          },
          {
           "type": "text",
           "value": ": belongs to the class, one shared copy."
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
             "value": "Parameter"
            }
           ]
          },
          {
           "type": "text",
           "value": ": received by a method/constructor."
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
       "value": "Instance/static field defaults: reference -> "
      },
      {
       "type": "inlineCode",
       "value": "null"
      },
      {
       "type": "text",
       "value": ", integer -> "
      },
      {
       "type": "inlineCode",
       "value": "0"
      },
      {
       "type": "text",
       "value": ", floating -> "
      },
      {
       "type": "inlineCode",
       "value": "0.0"
      },
      {
       "type": "text",
       "value": ", boolean -> "
      },
      {
       "type": "inlineCode",
       "value": "false"
      },
      {
       "type": "text",
       "value": ", char -> "
      },
      {
       "type": "inlineCode",
       "value": "'\\u0000'"
      },
      {
       "type": "text",
       "value": "."
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
         "value": "Remember: fields get defaults; local variables do not."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-the-8-primitives",
   "num": null,
   "title": "The 8 Primitives",
   "stars": 0,
   "chapter": "variables-types-operators",
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
           "value": "Size"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Notes"
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
           "value": "byte"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "8-bit"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "signed int"
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
           "value": "short"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "16-bit"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "signed int"
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
           "value": "int"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "32-bit"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "default integer type"
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
           "value": "long"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "64-bit"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "use "
          },
          {
           "type": "inlineCode",
           "value": "L"
          },
          {
           "type": "text",
           "value": " literal"
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
           "value": "float"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "32-bit"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "use "
          },
          {
           "type": "inlineCode",
           "value": "F"
          },
          {
           "type": "text",
           "value": " literal"
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
           "value": "double"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "64-bit"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "default decimal type"
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
           "value": "char"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "16-bit"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Unicode character"
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
           "value": "boolean"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "—"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "true / false"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "long x = 100L;   // L -> long\nfloat y = 10.5F; // F -> float\ndouble z = 10.5; // default decimal",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Everything else (classes, arrays, interfaces, enums, String) is a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "reference type"
        }
       ]
      },
      {
       "type": "text",
       "value": " — it stores a reference to an object, not the value."
      }
     ]
    }
   ]
  },
  {
   "id": "s-type-casting",
   "num": null,
   "title": "Type Casting",
   "stars": 0,
   "chapter": "variables-types-operators",
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
             "value": "Widening"
            }
           ]
          },
          {
           "type": "text",
           "value": " (small -> large, e.g. "
          },
          {
           "type": "inlineCode",
           "value": "int"
          },
          {
           "type": "text",
           "value": "->"
          },
          {
           "type": "inlineCode",
           "value": "long"
          },
          {
           "type": "text",
           "value": "): automatic, no cast."
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
             "value": "Narrowing"
            }
           ]
          },
          {
           "type": "text",
           "value": " (large -> small): explicit cast, can lose data."
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
             "value": "Upcasting"
            }
           ]
          },
          {
           "type": "text",
           "value": " (child -> parent reference): automatic."
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
             "value": "Downcasting"
            }
           ]
          },
          {
           "type": "text",
           "value": " (parent -> child): explicit, can throw "
          },
          {
           "type": "inlineCode",
           "value": "ClassCastException"
          },
          {
           "type": "text",
           "value": " if the real object isn't that type."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "Animal a = new Dog(); // upcast (auto)\nDog d = (Dog) a;      // downcast (explicit)",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-wrappers-autoboxing-integer-caching",
   "num": null,
   "title": "Wrappers, Autoboxing & Integer Caching",
   "stars": 1,
   "chapter": "variables-types-operators",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Each primitive has an object wrapper: "
      },
      {
       "type": "inlineCode",
       "value": "int"
      },
      {
       "type": "text",
       "value": "->"
      },
      {
       "type": "inlineCode",
       "value": "Integer"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "double"
      },
      {
       "type": "text",
       "value": "->"
      },
      {
       "type": "inlineCode",
       "value": "Double"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "char"
      },
      {
       "type": "text",
       "value": "->"
      },
      {
       "type": "inlineCode",
       "value": "Character"
      },
      {
       "type": "text",
       "value": ", etc. Needed because collections and generics store objects."
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
             "value": "Autoboxing"
            }
           ]
          },
          {
           "type": "text",
           "value": ": primitive -> wrapper automatically. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Unboxing"
            }
           ]
          },
          {
           "type": "text",
           "value": ": wrapper -> primitive."
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
           "value": "Danger: unboxing a "
          },
          {
           "type": "inlineCode",
           "value": "null"
          },
          {
           "type": "text",
           "value": " wrapper throws "
          },
          {
           "type": "inlineCode",
           "value": "NullPointerException"
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
             "value": "Integer cache"
            }
           ]
          },
          {
           "type": "text",
           "value": ": Java caches "
          },
          {
           "type": "inlineCode",
           "value": "Integer"
          },
          {
           "type": "text",
           "value": " objects in a range including -128..127, so "
          },
          {
           "type": "inlineCode",
           "value": "=="
          },
          {
           "type": "text",
           "value": " on two cached values can be "
          },
          {
           "type": "inlineCode",
           "value": "true"
          },
          {
           "type": "text",
           "value": " but is "
          },
          {
           "type": "inlineCode",
           "value": "false"
          },
          {
           "type": "text",
           "value": " outside the range."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "Integer a = 100, b = 100; // a == b  -> true (cached)\nInteger c = 200, d = 200; // c == d  -> false",
     "lang": "java"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: never compare wrapper values with "
        },
        {
         "type": "inlineCode",
         "value": "=="
        },
        {
         "type": "text",
         "value": "; use "
        },
        {
         "type": "inlineCode",
         "value": ".equals()"
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
   "id": "s-operators-gotchas",
   "num": null,
   "title": "Operators & Gotchas",
   "stars": 0,
   "chapter": "variables-types-operators",
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
           "type": "text",
           "value": "Arithmetic "
          },
          {
           "type": "inlineCode",
           "value": "+ - * / %"
          },
          {
           "type": "text",
           "value": ", relational, logical "
          },
          {
           "type": "inlineCode",
           "value": "&& || !"
          },
          {
           "type": "text",
           "value": ", bitwise "
          },
          {
           "type": "inlineCode",
           "value": "& | ^ ~"
          },
          {
           "type": "text",
           "value": ", shift "
          },
          {
           "type": "inlineCode",
           "value": "<< >> >>>"
          },
          {
           "type": "text",
           "value": ", ternary "
          },
          {
           "type": "inlineCode",
           "value": "a > b ? a : b"
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
           "value": "&&"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "||"
          },
          {
           "type": "text",
           "value": " short-circuit; "
          },
          {
           "type": "inlineCode",
           "value": "&"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "|"
          },
          {
           "type": "text",
           "value": " evaluate both sides."
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
             "value": "Integer division"
            }
           ]
          },
          {
           "type": "text",
           "value": ": "
          },
          {
           "type": "inlineCode",
           "value": "5 / 2"
          },
          {
           "type": "text",
           "value": " = "
          },
          {
           "type": "inlineCode",
           "value": "2"
          },
          {
           "type": "text",
           "value": " (both operands int); "
          },
          {
           "type": "inlineCode",
           "value": "5 / 2.0"
          },
          {
           "type": "text",
           "value": " = "
          },
          {
           "type": "inlineCode",
           "value": "2.5"
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
             "value": "Overflow"
            }
           ]
          },
          {
           "type": "text",
           "value": ": "
          },
          {
           "type": "inlineCode",
           "value": "int"
          },
          {
           "type": "text",
           "value": " arithmetic wraps around silently; Java does not throw on normal overflow."
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
   "id": "s-string-immutability",
   "num": null,
   "title": "String & Immutability",
   "stars": 1,
   "chapter": "strings",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A "
      },
      {
       "type": "inlineCode",
       "value": "String"
      },
      {
       "type": "text",
       "value": " is an "
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
       "value": " sequence of characters — its content can never change after creation. Methods like "
      },
      {
       "type": "inlineCode",
       "value": "concat"
      },
      {
       "type": "text",
       "value": " return a "
      },
      {
       "type": "emphasis",
       "children": [
        {
         "type": "text",
         "value": "new"
        }
       ]
      },
      {
       "type": "text",
       "value": " String."
      }
     ]
    },
    {
     "type": "code",
     "value": "String s = \"Java\";\ns.concat(\" World\");\nSystem.out.println(s); // Java  (unchanged)\ns = s.concat(\" World\"); // correct: reassign",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Why immutable: security, safe sharing in the string pool, thread-safety, and a cacheable hashCode."
      }
     ]
    }
   ]
  },
  {
   "id": "s-string-pool-new-string",
   "num": null,
   "title": "String Pool & new String()",
   "stars": 0,
   "chapter": "strings",
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
         "value": "string pool"
        }
       ]
      },
      {
       "type": "text",
       "value": " reuses string literals, so equal literals share one object."
      }
     ]
    },
    {
     "type": "code",
     "value": "String a = \"Java\", b = \"Java\";          // a == b  -> true (pooled)\nString c = new String(\"Java\");          // forces a new object\na == c;        // false\na.equals(c);   // true",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "intern()"
      },
      {
       "type": "text",
       "value": " returns the pooled copy of a string."
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
         "value": "Remember: literals are pooled and shared; "
        },
        {
         "type": "inlineCode",
         "value": "new String()"
        },
        {
         "type": "text",
         "value": " always makes a separate object."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-stringbuilder-vs-stringbuffer",
   "num": null,
   "title": "StringBuilder vs StringBuffer",
   "stars": 0,
   "chapter": "strings",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For many modifications, don't concatenate "
      },
      {
       "type": "inlineCode",
       "value": "String"
      },
      {
       "type": "text",
       "value": " in a loop (it creates many objects) — use a mutable builder."
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
             "value": "StringBuilder"
            }
           ]
          },
          {
           "type": "text",
           "value": ": mutable, not synchronized, faster — the default choice."
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
             "value": "StringBuffer"
            }
           ]
          },
          {
           "type": "text",
           "value": ": mutable, synchronized, slower — only when you truly need thread safety."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "StringBuilder sb = new StringBuilder();\nsb.append(\"Java\").append(\" Interview\");",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common methods: "
      },
      {
       "type": "inlineCode",
       "value": "append"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "insert"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "delete"
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
       "value": "toString"
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
   "id": "s-string-operator",
   "num": null,
   "title": "String + Operator",
   "stars": 0,
   "chapter": "strings",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "+"
      },
      {
       "type": "text",
       "value": " concatenates, and evaluation is left to right:"
      }
     ]
    },
    {
     "type": "code",
     "value": "1 + 2 + \"Java\"  // \"3Java\"\n\"Java\" + 1 + 2  // \"Java12\"",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-the-four-pillars",
   "num": null,
   "title": "The Four Pillars",
   "stars": 1,
   "chapter": "oop-classes-inheritance-polymorphism",
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
           "value": ": bundle data + methods, control access (private fields + public getters/setters). Protects state, allows validation, reduces coupling."
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
           "value": ": a child gets a parent's accessible members via "
          },
          {
           "type": "inlineCode",
           "value": "extends"
          },
          {
           "type": "text",
           "value": " (\"is-a\")."
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
           "value": ": the same call behaves differently — "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "overloading"
            }
           ]
          },
          {
           "type": "text",
           "value": " (compile-time) and "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "overriding"
            }
           ]
          },
          {
           "type": "text",
           "value": " (runtime)."
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
           "value": ": expose behavior, hide implementation (abstract classes, interfaces)."
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
   "id": "s-classes-objects-access-modifiers",
   "num": null,
   "title": "Classes, Objects & Access Modifiers",
   "stars": 0,
   "chapter": "oop-classes-inheritance-polymorphism",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A class is a blueprint; an object is a runtime instance ("
      },
      {
       "type": "inlineCode",
       "value": "Car c = new Car();"
      },
      {
       "type": "text",
       "value": "). Two references can point to the same object."
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
           "value": "Modifier"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Visible in"
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
           "value": "private"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "same class only"
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
           "value": "default (no modifier)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "same package"
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
           "value": "protected"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "same package + subclasses (via inheritance outside the package)"
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
           "value": "public"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "everywhere the class is accessible"
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
         "value": "protected"
        },
        {
         "type": "text",
         "value": " outside the package works through subclassing, not plain package access. Top-level classes can only be public or default."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-methods-overloading-overriding",
   "num": null,
   "title": "Methods, Overloading & Overriding",
   "stars": 1,
   "chapter": "oop-classes-inheritance-polymorphism",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Signature"
        }
       ]
      },
      {
       "type": "text",
       "value": " = method name + parameter types (return type is "
      },
      {
       "type": "emphasis",
       "children": [
        {
         "type": "text",
         "value": "not"
        }
       ]
      },
      {
       "type": "text",
       "value": " part of it)."
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
             "value": "Overloading"
            }
           ]
          },
          {
           "type": "text",
           "value": ": same name, different parameter list; compile-time. Cannot overload by return type alone."
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
             "value": "Overriding"
            }
           ]
          },
          {
           "type": "text",
           "value": ": child redefines an inherited method with the same signature; runtime. Use "
          },
          {
           "type": "inlineCode",
           "value": "@Override"
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
       "value": "Overriding rules: same signature; return type same or covariant (a subtype); cannot reduce visibility; cannot override "
      },
      {
       "type": "inlineCode",
       "value": "final"
      },
      {
       "type": "text",
       "value": "/"
      },
      {
       "type": "inlineCode",
       "value": "static"
      },
      {
       "type": "text",
       "value": "/"
      },
      {
       "type": "inlineCode",
       "value": "private"
      },
      {
       "type": "text",
       "value": "; constructors aren't overridden. Static methods are "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "hidden"
        }
       ]
      },
      {
       "type": "text",
       "value": ", not overridden."
      }
     ]
    }
   ]
  },
  {
   "id": "s-this-super",
   "num": null,
   "title": "this & super",
   "stars": 0,
   "chapter": "oop-classes-inheritance-polymorphism",
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
           "value": "this"
          },
          {
           "type": "text",
           "value": " = current object (disambiguate field vs parameter, call another constructor via "
          },
          {
           "type": "inlineCode",
           "value": "this()"
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
           "value": "super"
          },
          {
           "type": "text",
           "value": " = immediate parent (access parent field/method, call parent constructor via "
          },
          {
           "type": "inlineCode",
           "value": "super()"
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
           "value": "this()"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "super()"
          },
          {
           "type": "text",
           "value": " must be the "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "first"
            }
           ]
          },
          {
           "type": "text",
           "value": " statement in a constructor."
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
   "id": "s-constructors",
   "num": null,
   "title": "Constructors",
   "stars": 0,
   "chapter": "oop-classes-inheritance-polymorphism",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Same name as the class, no return type, called on "
      },
      {
       "type": "inlineCode",
       "value": "new"
      },
      {
       "type": "text",
       "value": ". Can be overloaded; cannot be inherited, overridden, static, final, or abstract. If you write no constructor, the compiler adds a default no-arg one. "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Constructor chaining"
        }
       ]
      },
      {
       "type": "text",
       "value": ": "
      },
      {
       "type": "inlineCode",
       "value": "this(...)"
      },
      {
       "type": "text",
       "value": " calls another constructor; "
      },
      {
       "type": "inlineCode",
       "value": "super(...)"
      },
      {
       "type": "text",
       "value": " calls the parent's."
      }
     ]
    }
   ]
  },
  {
   "id": "s-static",
   "num": null,
   "title": "static",
   "stars": 0,
   "chapter": "oop-classes-inheritance-polymorphism",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Belongs to the class, not objects. Static methods can't use instance members or "
      },
      {
       "type": "inlineCode",
       "value": "this"
      },
      {
       "type": "text",
       "value": "/"
      },
      {
       "type": "inlineCode",
       "value": "super"
      },
      {
       "type": "text",
       "value": " directly. A "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "static block"
        }
       ]
      },
      {
       "type": "text",
       "value": " runs once at class initialization. Static import lets you call static members without the class name."
      }
     ]
    }
   ]
  },
  {
   "id": "s-final",
   "num": null,
   "title": "final",
   "stars": 0,
   "chapter": "oop-classes-inheritance-polymorphism",
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
             "value": "variable"
            }
           ]
          },
          {
           "type": "text",
           "value": ": assign once. For a "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "final reference"
            }
           ]
          },
          {
           "type": "text",
           "value": ", the reference can't be repointed but the object can still mutate."
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
             "value": "method"
            }
           ]
          },
          {
           "type": "text",
           "value": ": can't be overridden. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "class"
            }
           ]
          },
          {
           "type": "text",
           "value": ": can't be extended."
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
           "value": "final"
          },
          {
           "type": "text",
           "value": " (restriction) vs "
          },
          {
           "type": "inlineCode",
           "value": "finally"
          },
          {
           "type": "text",
           "value": " (exception cleanup block) vs "
          },
          {
           "type": "inlineCode",
           "value": "finalize()"
          },
          {
           "type": "text",
           "value": " (old deprecated GC method — don't use)."
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
   "id": "s-object-class-vs-equals-hashcode",
   "num": null,
   "title": "Object Class, == vs equals, hashCode",
   "stars": 1,
   "chapter": "oop-classes-inheritance-polymorphism",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "Object"
      },
      {
       "type": "text",
       "value": " is the root superclass. Key methods: "
      },
      {
       "type": "inlineCode",
       "value": "toString"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "equals"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "hashCode"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "getClass"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "clone"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "wait/notify"
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
           "value": "=="
          },
          {
           "type": "text",
           "value": ": primitives compare values; objects compare "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "references"
            }
           ]
          },
          {
           "type": "text",
           "value": " (same object?)."
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
           "value": "equals()"
          },
          {
           "type": "text",
           "value": ": logical/content equality when overridden."
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
             "value": "Contract"
            }
           ]
          },
          {
           "type": "text",
           "value": ": if "
          },
          {
           "type": "inlineCode",
           "value": "a.equals(b)"
          },
          {
           "type": "text",
           "value": " then "
          },
          {
           "type": "inlineCode",
           "value": "a.hashCode() == b.hashCode()"
          },
          {
           "type": "text",
           "value": ". Equal hash codes do "
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
           "value": " imply equal objects."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "String a = new String(\"Java\"), b = new String(\"Java\");\na == b;       // false (different objects)\na.equals(b);  // true  (same content)",
     "lang": "java"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: override "
        },
        {
         "type": "inlineCode",
         "value": "equals"
        },
        {
         "type": "text",
         "value": " and "
        },
        {
         "type": "inlineCode",
         "value": "hashCode"
        },
        {
         "type": "text",
         "value": " together, or hash-based collections (HashMap/HashSet) break."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-abstract-class",
   "num": null,
   "title": "Abstract Class",
   "stars": 1,
   "chapter": "abstraction-interfaces-design",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A class that may have abstract (no body) and concrete methods; "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "cannot be instantiated"
        }
       ]
      },
      {
       "type": "text",
       "value": ". Can have constructors, fields, static and final methods. A concrete subclass must implement all inherited abstract methods."
      }
     ]
    }
   ]
  },
  {
   "id": "s-interface",
   "num": null,
   "title": "Interface",
   "stars": 1,
   "chapter": "abstraction-interfaces-design",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A contract implementing classes agree to. Fields are implicitly "
      },
      {
       "type": "inlineCode",
       "value": "public static final"
      },
      {
       "type": "text",
       "value": ". Methods can be abstract, "
      },
      {
       "type": "inlineCode",
       "value": "default"
      },
      {
       "type": "text",
       "value": " (with body), "
      },
      {
       "type": "inlineCode",
       "value": "static"
      },
      {
       "type": "text",
       "value": ", or "
      },
      {
       "type": "inlineCode",
       "value": "private"
      },
      {
       "type": "text",
       "value": " (helpers). A class "
      },
      {
       "type": "inlineCode",
       "value": "implements"
      },
      {
       "type": "text",
       "value": " interfaces; an interface can "
      },
      {
       "type": "inlineCode",
       "value": "extend"
      },
      {
       "type": "text",
       "value": " multiple interfaces."
      }
     ]
    }
   ]
  },
  {
   "id": "s-abstract-class-vs-interface",
   "num": null,
   "title": "Abstract Class vs Interface",
   "stars": 0,
   "chapter": "abstraction-interfaces-design",
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
           "value": "Abstract class"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Interface"
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
           "value": "extends"
          },
          {
           "type": "text",
           "value": " (one only)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "implements"
          },
          {
           "type": "text",
           "value": " (many)"
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
           "value": "instance fields"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "fields are constants"
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
           "value": "has constructors"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "no constructors"
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
           "value": "shared base + state"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "contract / capability"
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
         "value": "Remember: abstract class = \"is-a\" common base with shared state; interface = \"can-do\" contract."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-multiple-inheritance-the-diamond-problem",
   "num": null,
   "title": "Multiple Inheritance & the Diamond Problem",
   "stars": 0,
   "chapter": "abstraction-interfaces-design",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Java forbids a class extending multiple classes (ambiguity if two parents define the same method). A class may implement many interfaces. If two interfaces give conflicting "
      },
      {
       "type": "inlineCode",
       "value": "default"
      },
      {
       "type": "text",
       "value": " methods, the class must resolve it:"
      }
     ]
    },
    {
     "type": "code",
     "value": "class C implements A, B {\n    public void show() { A.super.show(); }\n}",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-composition-vs-inheritance",
   "num": null,
   "title": "Composition vs Inheritance",
   "stars": 0,
   "chapter": "abstraction-interfaces-design",
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
             "value": "Inheritance"
            }
           ]
          },
          {
           "type": "text",
           "value": " = \"is-a\" (Dog is an Animal)."
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
             "value": "Composition"
            }
           ]
          },
          {
           "type": "text",
           "value": " = \"has-a\" (Car has an Engine)."
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
       "value": "Prefer composition when behavior should be assembled rather than inherited."
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
         "value": "Association / Aggregation / Composition"
        }
       ]
      },
      {
       "type": "text",
       "value": ": association = general link; aggregation = weak whole-part, parts live independently (Department–Teacher); composition = strong ownership, part's lifecycle tied to the whole (House–Room)."
      }
     ]
    }
   ]
  },
  {
   "id": "s-solid",
   "num": null,
   "title": "SOLID",
   "stars": 0,
   "chapter": "abstraction-interfaces-design",
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
             "value": "S"
            }
           ]
          },
          {
           "type": "text",
           "value": "ingle Responsibility: one reason to change."
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
             "value": "O"
            }
           ]
          },
          {
           "type": "text",
           "value": "pen/Closed: open to extension, closed to modification."
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
             "value": "L"
            }
           ]
          },
          {
           "type": "text",
           "value": "iskov Substitution: subtypes usable wherever the parent is."
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
             "value": "I"
            }
           ]
          },
          {
           "type": "text",
           "value": "nterface Segregation: small, focused interfaces."
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
             "value": "D"
            }
           ]
          },
          {
           "type": "text",
           "value": "ependency Inversion: depend on abstractions, not concretions."
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
   "id": "s-dependency-injection",
   "num": null,
   "title": "Dependency Injection",
   "stars": 0,
   "chapter": "abstraction-interfaces-design",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Supply a class's dependencies from outside instead of creating them inside."
      }
     ]
    },
    {
     "type": "code",
     "value": "class Service {\n    private final Repository repo;\n    Service(Repository repo) { this.repo = repo; } // injected\n}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Benefits: loose coupling, easier testing, easy to swap implementations."
      }
     ]
    }
   ]
  },
  {
   "id": "s-common-design-patterns",
   "num": null,
   "title": "Common Design Patterns",
   "stars": 0,
   "chapter": "abstraction-interfaces-design",
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
             "value": "Singleton"
            }
           ]
          },
          {
           "type": "text",
           "value": ": one controlled instance (private constructor + static access; an "
          },
          {
           "type": "inlineCode",
           "value": "enum"
          },
          {
           "type": "text",
           "value": " is a robust option)."
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
             "value": "Factory"
            }
           ]
          },
          {
           "type": "text",
           "value": ": encapsulate object creation. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Builder"
            }
           ]
          },
          {
           "type": "text",
           "value": ": build complex objects step by step."
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
             "value": "Strategy"
            }
           ]
          },
          {
           "type": "text",
           "value": ": interchangeable algorithms. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Observer"
            }
           ]
          },
          {
           "type": "text",
           "value": ": notify on state change."
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
             "value": "Adapter"
            }
           ]
          },
          {
           "type": "text",
           "value": ": bridge incompatible interfaces. "
          },
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
           "value": ": add behavior without modifying the class."
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
   "id": "s-hierarchy",
   "num": null,
   "title": "Hierarchy",
   "stars": 1,
   "chapter": "exceptions",
   "nodes": [
    {
     "type": "code",
     "value": "Throwable\n ├── Error            (serious JVM/system problems; don't handle)\n └── Exception\n      └── RuntimeException (unchecked)"
    }
   ]
  },
  {
   "id": "s-checked-vs-unchecked",
   "num": null,
   "title": "Checked vs Unchecked",
   "stars": 1,
   "chapter": "exceptions",
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
             "value": "Checked"
            }
           ]
          },
          {
           "type": "text",
           "value": ": compiler forces you to handle or declare them ("
          },
          {
           "type": "inlineCode",
           "value": "IOException"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "SQLException"
          },
          {
           "type": "text",
           "value": "). Use when the caller can reasonably recover."
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
             "value": "Unchecked"
            }
           ]
          },
          {
           "type": "text",
           "value": " (RuntimeException): compiler doesn't force handling ("
          },
          {
           "type": "inlineCode",
           "value": "NullPointerException"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "IllegalArgumentException"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "ArithmeticException"
          },
          {
           "type": "text",
           "value": "). Usually programming errors."
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
   "id": "s-try-catch-finally",
   "num": null,
   "title": "try-catch-finally",
   "stars": 0,
   "chapter": "exceptions",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "try"
      },
      {
       "type": "text",
       "value": " holds risky code, "
      },
      {
       "type": "inlineCode",
       "value": "catch"
      },
      {
       "type": "text",
       "value": " handles a matching exception, "
      },
      {
       "type": "inlineCode",
       "value": "finally"
      },
      {
       "type": "text",
       "value": " runs for cleanup whether or not an exception occurred — even after a "
      },
      {
       "type": "inlineCode",
       "value": "return"
      },
      {
       "type": "text",
       "value": ". It may not run on "
      },
      {
       "type": "inlineCode",
       "value": "System.exit()"
      },
      {
       "type": "text",
       "value": " or abrupt JVM termination."
      }
     ]
    }
   ]
  },
  {
   "id": "s-throw-vs-throws",
   "num": null,
   "title": "throw vs throws",
   "stars": 0,
   "chapter": "exceptions",
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
           "value": "throw"
          },
          {
           "type": "text",
           "value": " actually throws an exception now: "
          },
          {
           "type": "inlineCode",
           "value": "throw new IllegalArgumentException();"
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
           "value": "throws"
          },
          {
           "type": "text",
           "value": " declares a method "
          },
          {
           "type": "emphasis",
           "children": [
            {
             "type": "text",
             "value": "may"
            }
           ]
          },
          {
           "type": "text",
           "value": " throw: "
          },
          {
           "type": "inlineCode",
           "value": "void read() throws IOException {}"
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
   "id": "s-try-with-resources-custom-exceptions",
   "num": null,
   "title": "Try-with-Resources & Custom Exceptions",
   "stars": 0,
   "chapter": "exceptions",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "try (Resource r = ...) { }"
      },
      {
       "type": "text",
       "value": " auto-closes anything implementing "
      },
      {
       "type": "inlineCode",
       "value": "AutoCloseable"
      },
      {
       "type": "text",
       "value": " (files, streams, JDBC). Custom exceptions extend "
      },
      {
       "type": "inlineCode",
       "value": "Exception"
      },
      {
       "type": "text",
       "value": " (checked) or "
      },
      {
       "type": "inlineCode",
       "value": "RuntimeException"
      },
      {
       "type": "text",
       "value": " (unchecked)."
      }
     ]
    }
   ]
  },
  {
   "id": "s-overriding-exceptions",
   "num": null,
   "title": "Overriding & Exceptions",
   "stars": 0,
   "chapter": "exceptions",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "An overriding method may throw the same or a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "narrower"
        }
       ]
      },
      {
       "type": "text",
       "value": " checked exception, or none — but "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "not a broader"
        }
       ]
      },
      {
       "type": "text",
       "value": " checked exception. Unchecked exceptions aren't restricted this way."
      }
     ]
    }
   ]
  },
  {
   "id": "s-the-framework",
   "num": null,
   "title": "The Framework",
   "stars": 1,
   "chapter": "collections",
   "nodes": [
    {
     "type": "code",
     "value": "Iterable -> Collection -> List, Set, Queue\nMap (separate hierarchy)"
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
       "value": "Ordered, allows duplicates, index access."
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
             "value": "ArrayList"
            }
           ]
          },
          {
           "type": "text",
           "value": ": resizable array; fast random access; mid-list insert/remove shifts elements."
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
             "value": "LinkedList"
            }
           ]
          },
          {
           "type": "text",
           "value": ": doubly linked; cheap insert/remove at a known node; slow random access."
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
             "value": "Vector"
            }
           ]
          },
          {
           "type": "text",
           "value": ": legacy synchronized ArrayList — avoid in new code."
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
       "value": "No duplicates."
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
             "value": "HashSet"
            }
           ]
          },
          {
           "type": "text",
           "value": ": no order, fast average ops."
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
             "value": "LinkedHashSet"
            }
           ]
          },
          {
           "type": "text",
           "value": ": insertion order."
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
             "value": "TreeSet"
            }
           ]
          },
          {
           "type": "text",
           "value": ": sorted, O(log n)."
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
   "id": "s-map",
   "num": null,
   "title": "Map",
   "stars": 1,
   "chapter": "collections",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Key-value pairs, unique keys."
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
             "value": "HashMap"
            }
           ]
          },
          {
           "type": "text",
           "value": ": no order; allows one null key and null values; fast average lookup."
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
             "value": "LinkedHashMap"
            }
           ]
          },
          {
           "type": "text",
           "value": ": insertion (or access) order."
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
             "value": "TreeMap"
            }
           ]
          },
          {
           "type": "text",
           "value": ": sorted by key, O(log n); no null key under natural ordering."
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
             "value": "ConcurrentHashMap"
            }
           ]
          },
          {
           "type": "text",
           "value": ": thread-safe for concurrent access."
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
   "id": "s-hashmap-internals",
   "num": null,
   "title": "HashMap Internals",
   "stars": 1,
   "chapter": "collections",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A key's "
      },
      {
       "type": "inlineCode",
       "value": "hashCode()"
      },
      {
       "type": "text",
       "value": " picks a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "bucket"
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
         "value": "collision"
        }
       ]
      },
      {
       "type": "text",
       "value": " is two keys landing in the same bucket. On "
      },
      {
       "type": "inlineCode",
       "value": "put"
      },
      {
       "type": "text",
       "value": ": compute hash -> find bucket -> compare keys with "
      },
      {
       "type": "inlineCode",
       "value": "equals()"
      },
      {
       "type": "text",
       "value": " -> insert or update. Heavily collided buckets can become tree structures."
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
             "value": "hashCode()"
            }
           ]
          },
          {
           "type": "text",
           "value": " locates the bucket; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "equals()"
            }
           ]
          },
          {
           "type": "text",
           "value": " confirms the exact key."
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
             "value": "Load factor"
            }
           ]
          },
          {
           "type": "text",
           "value": " (default 0.75) sets when the map resizes and rehashes — balances memory vs speed."
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
         "value": "Remember: same key "
        },
        {
         "type": "inlineCode",
         "value": "put"
        },
        {
         "type": "text",
         "value": " twice just updates the value."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-comparable-vs-comparator",
   "num": null,
   "title": "Comparable vs Comparator",
   "stars": 1,
   "chapter": "collections",
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
             "value": "Comparable"
            }
           ]
          },
          {
           "type": "text",
           "value": ": natural ordering, inside the class, "
          },
          {
           "type": "inlineCode",
           "value": "compareTo()"
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
             "value": "Comparator"
            }
           ]
          },
          {
           "type": "text",
           "value": ": custom/external ordering, "
          },
          {
           "type": "inlineCode",
           "value": "compare()"
          },
          {
           "type": "text",
           "value": " (often a lambda)."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "class Student implements Comparable<Student> {\n    public int compareTo(Student o) { return this.age - o.age; }\n}\nComparator<Student> byName = (a, b) -> a.name.compareTo(b.name);",
     "lang": "java"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Comparable = \"how I compare myself\"; Comparator = \"how you want to compare me\"."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-queue-deque-stack",
   "num": null,
   "title": "Queue, Deque & Stack",
   "stars": 0,
   "chapter": "collections",
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
             "value": "Queue"
            }
           ]
          },
          {
           "type": "text",
           "value": ": FIFO. Prefer the non-throwing methods "
          },
          {
           "type": "inlineCode",
           "value": "offer"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "poll"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "peek"
          },
          {
           "type": "text",
           "value": " over "
          },
          {
           "type": "inlineCode",
           "value": "add"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "remove"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "element"
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
             "value": "Deque"
            }
           ]
          },
          {
           "type": "text",
           "value": ": double-ended; acts as queue or stack. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "ArrayDeque"
            }
           ]
          },
          {
           "type": "text",
           "value": " is the preferred general implementation (no nulls)."
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
             "value": "Stack"
            }
           ]
          },
          {
           "type": "text",
           "value": ": LIFO. The legacy "
          },
          {
           "type": "inlineCode",
           "value": "Stack"
          },
          {
           "type": "text",
           "value": " class is discouraged — use "
          },
          {
           "type": "inlineCode",
           "value": "ArrayDeque"
          },
          {
           "type": "text",
           "value": " ("
          },
          {
           "type": "inlineCode",
           "value": "push"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "pop"
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
   "id": "s-arrays-utility-classes",
   "num": null,
   "title": "Arrays & Utility Classes",
   "stars": 0,
   "chapter": "collections",
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
             "value": "Array"
            }
           ]
          },
          {
           "type": "text",
           "value": ": fixed size, zero-indexed, can hold primitives; arrays are objects. Default values: "
          },
          {
           "type": "inlineCode",
           "value": "int[]"
          },
          {
           "type": "text",
           "value": "->0, "
          },
          {
           "type": "inlineCode",
           "value": "boolean[]"
          },
          {
           "type": "text",
           "value": "->false, "
          },
          {
           "type": "inlineCode",
           "value": "Object[]"
          },
          {
           "type": "text",
           "value": "->null."
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
             "value": "Arrays"
            }
           ]
          },
          {
           "type": "text",
           "value": ": helpers "
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
           "value": "toString"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "equals"
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
             "value": "Collections"
            }
           ]
          },
          {
           "type": "text",
           "value": " (utility class): "
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
           "value": "shuffle"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "binarySearch"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "max"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "min"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "frequency"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "unmodifiableList"
          },
          {
           "type": "text",
           "value": ". ("
          },
          {
           "type": "inlineCode",
           "value": "Collection"
          },
          {
           "type": "text",
           "value": " is the interface; "
          },
          {
           "type": "inlineCode",
           "value": "Collections"
          },
          {
           "type": "text",
           "value": " is the helper class.)"
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
   "id": "s-time-complexity",
   "num": null,
   "title": "Time Complexity",
   "stars": 0,
   "chapter": "collections",
   "nodes": [
    {
     "type": "table",
     "align": [
      null,
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
           "value": "ArrayList"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "LinkedList"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "HashMap"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "TreeMap"
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
           "value": "Get by index"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)"
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
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "—"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "—"
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
           "value": "Add at end"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1) amort."
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "—"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "—"
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
           "value": "Search / key lookup"
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
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(n)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(1) avg"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "O(log n)"
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
         "value": "Remember: ArrayList = fast index; HashMap = fast key lookup; TreeMap = sorted + logarithmic."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-common-mistakes",
   "num": null,
   "title": "Common Mistakes",
   "stars": 0,
   "chapter": "collections",
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
           "type": "text",
           "value": "Modifying a collection while iterating throws "
          },
          {
           "type": "inlineCode",
           "value": "ConcurrentModificationException"
          },
          {
           "type": "text",
           "value": " (fail-fast, not a thread-safety feature). Use "
          },
          {
           "type": "inlineCode",
           "value": "Iterator.remove()"
          },
          {
           "type": "text",
           "value": " instead."
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
             "value": "Immutable collections"
            }
           ]
          },
          {
           "type": "text",
           "value": ": "
          },
          {
           "type": "inlineCode",
           "value": "List.of()"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "Set.of()"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "Map.of()"
          },
          {
           "type": "text",
           "value": " are unmodifiable and reject nulls; structural changes throw "
          },
          {
           "type": "inlineCode",
           "value": "UnsupportedOperationException"
          },
          {
           "type": "text",
           "value": ". "
          },
          {
           "type": "inlineCode",
           "value": "List.of()"
          },
          {
           "type": "text",
           "value": " creates a new immutable list; "
          },
          {
           "type": "inlineCode",
           "value": "Collections.unmodifiableList(list)"
          },
          {
           "type": "text",
           "value": " is a read-only "
          },
          {
           "type": "emphasis",
           "children": [
            {
             "type": "text",
             "value": "view"
            }
           ]
          },
          {
           "type": "text",
           "value": " — changes to the original still show through."
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
   "id": "s-generics-type-safety",
   "num": null,
   "title": "Generics & Type Safety",
   "stars": 0,
   "chapter": "generics",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Generics let classes/methods work with types safely, giving compile-time type checks and removing casts."
      }
     ]
    },
    {
     "type": "code",
     "value": "class Box<T> { T value; }\nstatic <T> void print(T value) { System.out.println(value); }",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-wildcards-pecs",
   "num": null,
   "title": "Wildcards & PECS",
   "stars": 0,
   "chapter": "generics",
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
           "value": "<?>"
          },
          {
           "type": "text",
           "value": ": unknown type."
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
           "value": "<? extends T>"
          },
          {
           "type": "text",
           "value": ": T or a subtype — for "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "reading/producing"
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
           "value": "<? super T>"
          },
          {
           "type": "text",
           "value": ": T or a supertype — for "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "writing/consuming"
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
         "type": "strong",
         "children": [
          {
           "type": "text",
           "value": "PECS"
          }
         ]
        },
        {
         "type": "text",
         "value": " — Producer "
        },
        {
         "type": "inlineCode",
         "value": "extends"
        },
        {
         "type": "text",
         "value": ", Consumer "
        },
        {
         "type": "inlineCode",
         "value": "super"
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
   "id": "s-type-erasure-restrictions",
   "num": null,
   "title": "Type Erasure & Restrictions",
   "stars": 0,
   "chapter": "generics",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Generic type info is largely erased at runtime — "
      },
      {
       "type": "inlineCode",
       "value": "List<String>"
      },
      {
       "type": "text",
       "value": " and "
      },
      {
       "type": "inlineCode",
       "value": "List<Integer>"
      },
      {
       "type": "text",
       "value": " are both just "
      },
      {
       "type": "inlineCode",
       "value": "List"
      },
      {
       "type": "text",
       "value": ". Consequences: can't do "
      },
      {
       "type": "inlineCode",
       "value": "new T()"
      },
      {
       "type": "text",
       "value": ", can't use primitives as type arguments ("
      },
      {
       "type": "inlineCode",
       "value": "List<int>"
      },
      {
       "type": "text",
       "value": " invalid — use "
      },
      {
       "type": "inlineCode",
       "value": "List<Integer>"
      },
      {
       "type": "text",
       "value": "), and a class's type parameter isn't available in static members."
      }
     ]
    }
   ]
  },
  {
   "id": "s-lambdas-functional-interfaces",
   "num": null,
   "title": "Lambdas & Functional Interfaces",
   "stars": 1,
   "chapter": "functional-java-streams",
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
         "value": "lambda"
        }
       ]
      },
      {
       "type": "text",
       "value": " is a short implementation of a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "functional interface"
        }
       ]
      },
      {
       "type": "text",
       "value": " (exactly one abstract method, often marked "
      },
      {
       "type": "inlineCode",
       "value": "@FunctionalInterface"
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
           "value": "Interface"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Shape"
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
           "value": "Predicate<T>"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "T -> boolean"
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
           "value": "Function<T,R>"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "T -> R"
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
           "value": "Consumer<T>"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "T -> void"
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
           "value": "Supplier<T>"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "() -> T"
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
           "value": "UnaryOperator<T>"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "T -> T"
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
           "value": "BinaryOperator<T>"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "(T,T) -> T"
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
         "value": "Method reference"
        }
       ]
      },
      {
       "type": "text",
       "value": " is shorter syntax for some lambdas: "
      },
      {
       "type": "inlineCode",
       "value": "Class::staticMethod"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "obj::instanceMethod"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "Class::instanceMethod"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "Class::new"
      },
      {
       "type": "text",
       "value": " (e.g. "
      },
      {
       "type": "inlineCode",
       "value": "list.forEach(System.out::println)"
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
   "id": "s-streams",
   "num": null,
   "title": "Streams",
   "stars": 1,
   "chapter": "functional-java-streams",
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
         "value": "Stream"
        }
       ]
      },
      {
       "type": "text",
       "value": " is a lazy pipeline for processing data from a source. It does "
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
       "value": " store data and generally can't be reused (re-consuming throws "
      },
      {
       "type": "inlineCode",
       "value": "IllegalStateException"
      },
      {
       "type": "text",
       "value": ")."
      }
     ]
    },
    {
     "type": "code",
     "value": "Source -> intermediate ops (lazy) -> terminal op (triggers)"
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
             "value": "Intermediate"
            }
           ]
          },
          {
           "type": "text",
           "value": " (lazy): "
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
           "value": "map"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "flatMap"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "distinct"
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
           "value": "limit"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "skip"
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
             "value": "Terminal"
            }
           ]
          },
          {
           "type": "text",
           "value": ": "
          },
          {
           "type": "inlineCode",
           "value": "forEach"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "collect"
          },
          {
           "type": "text",
           "value": "/"
          },
          {
           "type": "inlineCode",
           "value": "toList"
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
           "value": "reduce"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "findFirst"
          },
          {
           "type": "text",
           "value": "/"
          },
          {
           "type": "inlineCode",
           "value": "findAny"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "anyMatch"
          },
          {
           "type": "text",
           "value": "/"
          },
          {
           "type": "inlineCode",
           "value": "allMatch"
          },
          {
           "type": "text",
           "value": "/"
          },
          {
           "type": "inlineCode",
           "value": "noneMatch"
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
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Stream vs Collection"
        }
       ]
      },
      {
       "type": "text",
       "value": ": a collection stores data and is reusable; a stream is a one-shot lazy processing pipeline."
      }
     ]
    }
   ]
  },
  {
   "id": "s-map-vs-flatmap-vs-filter",
   "num": null,
   "title": "map vs flatMap vs filter",
   "stars": 0,
   "chapter": "functional-java-streams",
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
           "value": "map"
          },
          {
           "type": "text",
           "value": ": transform each element (one -> one)."
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
           "value": "flatMap"
          },
          {
           "type": "text",
           "value": ": transform + flatten nested structures (one -> many, flattened)."
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
           "value": "filter"
          },
          {
           "type": "text",
           "value": ": keep elements matching a condition."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "users.stream().map(User::getName).toList();              // transform\nusers.stream().flatMap(u -> u.getOrders().stream()).toList(); // flatten",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-reduce-collectors-recipes",
   "num": null,
   "title": "reduce & Collectors Recipes",
   "stars": 0,
   "chapter": "functional-java-streams",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "reduce"
      },
      {
       "type": "text",
       "value": " combines many values into one: "
      },
      {
       "type": "inlineCode",
       "value": "list.stream().reduce(0, Integer::sum)"
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Common interview patterns:"
      }
     ]
    },
    {
     "type": "code",
     "value": "// group by field\nMap<String,List<Emp>> byDept =\n    emps.stream().collect(groupingBy(Emp::getDept));\n// frequency / count per key\nMap<T,Long> freq =\n    list.stream().collect(groupingBy(identity(), counting()));\n// partition into true/false groups\nMap<Boolean,List<Emp>> parts =\n    emps.stream().collect(partitioningBy(e -> e.getSalary() > 50000));\n// join to a string\nString csv = names.stream().collect(joining(\", \"));\n// second highest\nint second = list.stream().distinct()\n    .sorted(Comparator.reverseOrder()).skip(1).findFirst().orElse(0);\n// max by field\nemps.stream().max(Comparator.comparing(Emp::getSalary));",
     "lang": "java"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: frequency = "
        },
        {
         "type": "inlineCode",
         "value": "groupingBy(identity(), counting())"
        },
        {
         "type": "text",
         "value": "; Nth highest = "
        },
        {
         "type": "inlineCode",
         "value": "skip(n-1)"
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
   "id": "s-optional",
   "num": null,
   "title": "Optional",
   "stars": 1,
   "chapter": "functional-java-streams",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A container that may or may not hold a non-null value — makes absence explicit."
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
           "value": "Create: "
          },
          {
           "type": "inlineCode",
           "value": "Optional.of(x)"
          },
          {
           "type": "text",
           "value": " (x must be non-null, else NPE), "
          },
          {
           "type": "inlineCode",
           "value": "Optional.ofNullable(x)"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "Optional.empty()"
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
           "value": "Read: "
          },
          {
           "type": "inlineCode",
           "value": "isPresent"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "ifPresent"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "orElse"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "orElseGet"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "orElseThrow"
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
           "value": "orElse(x)"
          },
          {
           "type": "text",
           "value": " evaluates its fallback "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "always"
            }
           ]
          },
          {
           "type": "text",
           "value": "; "
          },
          {
           "type": "inlineCode",
           "value": "orElseGet(() -> x)"
          },
          {
           "type": "text",
           "value": " only when the value is absent — prefer it for expensive fallbacks."
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
         "value": "Remember: use Optional mainly for possibly-absent return values, not for every field/parameter."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-parallel-streams",
   "num": null,
   "title": "Parallel Streams",
   "stars": 0,
   "chapter": "functional-java-streams",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "parallelStream()"
      },
      {
       "type": "text",
       "value": " runs ops on multiple threads. It isn't automatically faster, and shared mutable state (e.g. adding to a plain "
      },
      {
       "type": "inlineCode",
       "value": "ArrayList"
      },
      {
       "type": "text",
       "value": ") is unsafe — collect to a result instead."
      }
     ]
    }
   ]
  },
  {
   "id": "s-basics",
   "num": null,
   "title": "Basics",
   "stars": 1,
   "chapter": "concurrency-multithreading",
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
             "value": "Process"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a running program with its own memory. "
          },
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
           "value": ": a lighter execution unit inside a process."
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
             "value": "Concurrency"
            }
           ]
          },
          {
           "type": "text",
           "value": ": multiple tasks making progress over overlapping periods. "
          },
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
           "value": ": tasks literally running at once on multiple cores."
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
   "id": "s-creating-threads",
   "num": null,
   "title": "Creating Threads",
   "stars": 0,
   "chapter": "concurrency-multithreading",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Extend "
      },
      {
       "type": "inlineCode",
       "value": "Thread"
      },
      {
       "type": "text",
       "value": " and override "
      },
      {
       "type": "inlineCode",
       "value": "run"
      },
      {
       "type": "text",
       "value": ", or (preferred) implement "
      },
      {
       "type": "inlineCode",
       "value": "Runnable"
      },
      {
       "type": "text",
       "value": " and pass to a "
      },
      {
       "type": "inlineCode",
       "value": "Thread"
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "code",
     "value": "new Thread(() -> System.out.println(\"Running\")).start();",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "start()"
      },
      {
       "type": "text",
       "value": " schedules a new thread; calling "
      },
      {
       "type": "inlineCode",
       "value": "run()"
      },
      {
       "type": "text",
       "value": " directly just runs on the current thread."
      }
     ]
    }
   ]
  },
  {
   "id": "s-lifecycle-sleep-vs-wait",
   "num": null,
   "title": "Lifecycle & sleep vs wait",
   "stars": 0,
   "chapter": "concurrency-multithreading",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "States: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED."
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
           "value": "Thread.sleep()"
          },
          {
           "type": "text",
           "value": ": pauses the current thread; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "keeps"
            }
           ]
          },
          {
           "type": "text",
           "value": " its locks."
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
           "value": "wait()"
          },
          {
           "type": "text",
           "value": ": for coordination; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "releases"
            }
           ]
          },
          {
           "type": "text",
           "value": " the object's monitor; must be called while holding that monitor (inside "
          },
          {
           "type": "inlineCode",
           "value": "synchronized"
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
   "id": "s-synchronized-race-conditions-volatile",
   "num": null,
   "title": "synchronized, Race Conditions, volatile",
   "stars": 1,
   "chapter": "concurrency-multithreading",
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
         "value": "race condition"
        }
       ]
      },
      {
       "type": "text",
       "value": " = result depends on thread timing on shared data ("
      },
      {
       "type": "inlineCode",
       "value": "count++"
      },
      {
       "type": "text",
       "value": " is not atomic)."
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
             "value": "synchronized"
            }
           ]
          },
          {
           "type": "text",
           "value": " (method or block): mutual exclusion + visibility around the protected region."
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
             "value": "Atomicity"
            }
           ]
          },
          {
           "type": "text",
           "value": " (indivisible), "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Visibility"
            }
           ]
          },
          {
           "type": "text",
           "value": " (one thread sees another's writes), "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Ordering"
            }
           ]
          },
          {
           "type": "text",
           "value": " (what can be observed before/after)."
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
             "value": "volatile"
            }
           ]
          },
          {
           "type": "text",
           "value": ": gives visibility + ordering for a variable but does "
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
           "value": " make "
          },
          {
           "type": "inlineCode",
           "value": "count++"
          },
          {
           "type": "text",
           "value": " atomic."
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
         "value": "volatile"
        },
        {
         "type": "text",
         "value": " = visibility only; "
        },
        {
         "type": "inlineCode",
         "value": "synchronized"
        },
        {
         "type": "text",
         "value": " = locking + visibility."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-lock-deadlock",
   "num": null,
   "title": "Lock & Deadlock",
   "stars": 0,
   "chapter": "concurrency-multithreading",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "ReentrantLock"
      },
      {
       "type": "text",
       "value": " gives more control than "
      },
      {
       "type": "inlineCode",
       "value": "synchronized"
      },
      {
       "type": "text",
       "value": " ("
      },
      {
       "type": "inlineCode",
       "value": "tryLock"
      },
      {
       "type": "text",
       "value": ", interruptible, explicit) but you must "
      },
      {
       "type": "inlineCode",
       "value": "unlock()"
      },
      {
       "type": "text",
       "value": " in a "
      },
      {
       "type": "inlineCode",
       "value": "finally"
      },
      {
       "type": "text",
       "value": "."
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
         "value": "Deadlock"
        }
       ]
      },
      {
       "type": "text",
       "value": ": threads wait forever for locks each other holds. Four conditions: mutual exclusion, hold-and-wait, no preemption, circular wait. Prevent with consistent lock ordering and timed lock attempts."
      }
     ]
    }
   ]
  },
  {
   "id": "s-executors-futures",
   "num": null,
   "title": "Executors & Futures",
   "stars": 1,
   "chapter": "concurrency-multithreading",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Prefer thread pools over manual threads — they reuse threads and separate task submission from thread management."
      }
     ]
    },
    {
     "type": "code",
     "value": "ExecutorService ex = Executors.newFixedThreadPool(4);\nFuture<Integer> f = ex.submit(() -> 10);\nInteger r = f.get(); // waits for the result\nex.shutdown();",
     "lang": "java"
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
           "value": "execute()"
          },
          {
           "type": "text",
           "value": " takes a Runnable (no result); "
          },
          {
           "type": "inlineCode",
           "value": "submit()"
          },
          {
           "type": "text",
           "value": " returns a "
          },
          {
           "type": "inlineCode",
           "value": "Future"
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
             "value": "Future"
            }
           ]
          },
          {
           "type": "text",
           "value": ": result of an async computation. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "CompletableFuture"
            }
           ]
          },
          {
           "type": "text",
           "value": ": composable async pipelines ("
          },
          {
           "type": "inlineCode",
           "value": "supplyAsync"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "thenApply"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "thenAccept"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "thenCompose"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "thenCombine"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "exceptionally"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "handle"
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
   "id": "s-concurrent-collections",
   "num": null,
   "title": "Concurrent Collections",
   "stars": 0,
   "chapter": "concurrency-multithreading",
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
             "value": "ConcurrentHashMap"
            }
           ]
          },
          {
           "type": "text",
           "value": ": thread-safe map for concurrent access."
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
             "value": "CopyOnWriteArrayList"
            }
           ]
          },
          {
           "type": "text",
           "value": ": good when reads far outnumber writes."
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
             "value": "BlockingQueue"
            }
           ]
          },
          {
           "type": "text",
           "value": " (ArrayBlockingQueue, LinkedBlockingQueue): producer-consumer coordination."
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
   "id": "s-java-memory-model",
   "num": null,
   "title": "Java Memory Model",
   "stars": 0,
   "chapter": "concurrency-multithreading",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The JMM defines what values threads are guaranteed to observe. "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Happens-before"
        }
       ]
      },
      {
       "type": "text",
       "value": " guarantees visibility/order: unlock before later lock on the same monitor; volatile write before later reads; "
      },
      {
       "type": "inlineCode",
       "value": "start()"
      },
      {
       "type": "text",
       "value": " before the thread's actions; a thread's actions before another returns from "
      },
      {
       "type": "inlineCode",
       "value": "join()"
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
   "id": "s-memory-areas",
   "num": null,
   "title": "Memory Areas",
   "stars": 1,
   "chapter": "jvm-memory-gc",
   "nodes": [
    {
     "type": "code",
     "value": "JVM: Heap, Stack, Metaspace, PC Register, Native Method Stack"
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
             "value": "Heap"
            }
           ]
          },
          {
           "type": "text",
           "value": ": objects and arrays, shared across threads, GC-managed."
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
             "value": "Stack"
            }
           ]
          },
          {
           "type": "text",
           "value": ": per thread; method frames, local variables, references."
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
             "value": "Metaspace"
            }
           ]
          },
          {
           "type": "text",
           "value": ": class metadata, in native memory."
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
             "value": "PC Register"
            }
           ]
          },
          {
           "type": "text",
           "value": ": per thread, tracks the current instruction."
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
   "id": "s-stack-vs-heap",
   "num": null,
   "title": "Stack vs Heap",
   "stars": 0,
   "chapter": "jvm-memory-gc",
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
           "value": "Stack"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Heap"
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
           "value": "per thread"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "shared"
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
           "value": "method frames, locals"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "objects / arrays"
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
           "value": "short-lived"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "may live longer"
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
           "value": "managed with calls"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "managed by GC"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "void test() {\n    int x = 10;        // x on the stack frame\n    User u = new User(); // u (reference) on stack, object on heap\n}",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-garbage-collection",
   "num": null,
   "title": "Garbage Collection",
   "stars": 0,
   "chapter": "jvm-memory-gc",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "GC automatically reclaims objects no longer reachable ("
      },
      {
       "type": "inlineCode",
       "value": "u = null"
      },
      {
       "type": "text",
       "value": " makes the old object eligible). "
      },
      {
       "type": "inlineCode",
       "value": "System.gc()"
      },
      {
       "type": "text",
       "value": " is only a hint — never rely on GC timing. "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Memory leaks"
        }
       ]
      },
      {
       "type": "text",
       "value": " still happen when objects stay reachable but unused (ever-growing static collections, unremoved listeners, bad caches)."
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
         "value": "Collectors"
        }
       ]
      },
      {
       "type": "text",
       "value": " (names only, don't memorize internals): Serial, Parallel, G1 (default, large heaps, predictable pauses), ZGC and Shenandoah (low latency, very large heaps)."
      }
     ]
    }
   ]
  },
  {
   "id": "s-pass-by-value",
   "num": null,
   "title": "Pass-by-Value",
   "stars": 1,
   "chapter": "jvm-memory-gc",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Java is "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "always pass-by-value"
        }
       ]
      },
      {
       "type": "text",
       "value": ". For objects, the "
      },
      {
       "type": "emphasis",
       "children": [
        {
         "type": "text",
         "value": "reference value"
        }
       ]
      },
      {
       "type": "text",
       "value": " is copied: you can mutate the object through it, but reassigning the parameter doesn't change the caller's reference."
      }
     ]
    },
    {
     "type": "code",
     "value": "void change(User u) { u.name = \"New\"; }   // caller's object IS changed\nvoid change(User u) { u = new User(); }    // caller's reference NOT changed",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-immutability",
   "num": null,
   "title": "Immutability",
   "stars": 0,
   "chapter": "jvm-memory-gc",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "An immutable object's state can't change after construction (String, wrappers, many "
      },
      {
       "type": "inlineCode",
       "value": "java.time"
      },
      {
       "type": "text",
       "value": " types). To build one: make the class final, fields "
      },
      {
       "type": "inlineCode",
       "value": "private final"
      },
      {
       "type": "text",
       "value": ", set via constructor, no setters, defensively copy mutable inputs/outputs."
      }
     ]
    }
   ]
  },
  {
   "id": "s-records",
   "num": null,
   "title": "Records",
   "stars": 0,
   "chapter": "modern-java",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A compact class for immutable data. Auto-generates accessors ("
      },
      {
       "type": "inlineCode",
       "value": "name()"
      },
      {
       "type": "text",
       "value": "), constructor, "
      },
      {
       "type": "inlineCode",
       "value": "equals"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "hashCode"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "toString"
      },
      {
       "type": "text",
       "value": "."
      }
     ]
    },
    {
     "type": "code",
     "value": "record User(String name, int age) {}",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Components are final; the record is implicitly final and can't extend a class."
      }
     ]
    }
   ]
  },
  {
   "id": "s-sealed-classes",
   "num": null,
   "title": "Sealed Classes",
   "stars": 0,
   "chapter": "modern-java",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Restrict which classes may extend/implement a type — for a known, closed hierarchy."
      }
     ]
    },
    {
     "type": "code",
     "value": "sealed class Animal permits Dog, Cat {}",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-var",
   "num": null,
   "title": "var",
   "stars": 0,
   "chapter": "modern-java",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Local variable type inference — the compiler infers the static type. Not dynamic typing; only for local variables, not fields or parameters."
      }
     ]
    },
    {
     "type": "code",
     "value": "var name = \"Java\"; // inferred as String",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-switch-expressions-pattern-matching",
   "num": null,
   "title": "switch Expressions & Pattern Matching",
   "stars": 0,
   "chapter": "modern-java",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Arrow syntax avoids fall-through; "
      },
      {
       "type": "inlineCode",
       "value": "switch"
      },
      {
       "type": "text",
       "value": " can be an expression returning a value. Pattern matching binds and casts in one step."
      }
     ]
    },
    {
     "type": "code",
     "value": "String r = switch (day) { case 1 -> \"Mon\"; default -> \"Other\"; };\nif (obj instanceof String s) { System.out.println(s.length()); }",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-virtual-threads",
   "num": null,
   "title": "Virtual Threads",
   "stars": 0,
   "chapter": "modern-java",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Lightweight threads for huge numbers of concurrent, mostly-blocking (I/O) tasks. They improve scalability but don't make CPU work faster. Platform threads map ~1:1 to OS threads and are expensive."
      }
     ]
    }
   ]
  },
  {
   "id": "s-feature-timeline-for-since-when",
   "num": null,
   "title": "Feature Timeline (for \"since when?\")",
   "stars": 0,
   "chapter": "modern-java",
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
             "value": "8"
            }
           ]
          },
          {
           "type": "text",
           "value": ": lambdas, streams, Optional, default methods, new Date/Time."
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
             "value": "9"
            }
           ]
          },
          {
           "type": "text",
           "value": ": modules, private interface methods, collection factory methods ("
          },
          {
           "type": "inlineCode",
           "value": "List.of"
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
             "value": "10"
            }
           ]
          },
          {
           "type": "text",
           "value": ": "
          },
          {
           "type": "inlineCode",
           "value": "var"
          },
          {
           "type": "text",
           "value": ". "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "11"
            }
           ]
          },
          {
           "type": "text",
           "value": " (LTS): String/file APIs."
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
             "value": "14+"
            }
           ]
          },
          {
           "type": "text",
           "value": ": switch expressions standard. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "16"
            }
           ]
          },
          {
           "type": "text",
           "value": ": records, "
          },
          {
           "type": "inlineCode",
           "value": "instanceof"
          },
          {
           "type": "text",
           "value": " pattern matching."
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
             "value": "17"
            }
           ]
          },
          {
           "type": "text",
           "value": " (LTS): sealed classes. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "21"
            }
           ]
          },
          {
           "type": "text",
           "value": " (LTS): virtual threads, record patterns, sequenced collections."
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
   "id": "s-enums",
   "num": null,
   "title": "Enums",
   "stars": 0,
   "chapter": "practical-java",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A type with a fixed set of constants; can have fields, methods, and constructors."
      }
     ]
    },
    {
     "type": "code",
     "value": "enum Status { NEW(\"New\"), DONE(\"Done\"); final String label; Status(String l){ label = l; } }",
     "lang": "java"
    }
   ]
  },
  {
   "id": "s-inner-anonymous-classes",
   "num": null,
   "title": "Inner & Anonymous Classes",
   "stars": 0,
   "chapter": "practical-java",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A class inside a class. Types: member inner, static nested (no outer object needed), local, anonymous. An "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "anonymous class"
        }
       ]
      },
      {
       "type": "text",
       "value": " is a one-off unnamed class — often replaced by a lambda for functional interfaces."
      }
     ]
    }
   ]
  },
  {
   "id": "s-varargs-instanceof",
   "num": null,
   "title": "Varargs & instanceof",
   "stars": 0,
   "chapter": "practical-java",
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
             "value": "Varargs"
            }
           ]
          },
          {
           "type": "text",
           "value": " "
          },
          {
           "type": "inlineCode",
           "value": "String... names"
          },
          {
           "type": "text",
           "value": ": variable number of args, treated as an array; must be the last and only varargs parameter."
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
             "value": "instanceof"
            }
           ]
          },
          {
           "type": "text",
           "value": " checks an object's type ("
          },
          {
           "type": "inlineCode",
           "value": "null instanceof X"
          },
          {
           "type": "text",
           "value": " is always "
          },
          {
           "type": "inlineCode",
           "value": "false"
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
   "id": "s-i-o-nio",
   "num": null,
   "title": "I/O & NIO",
   "stars": 0,
   "chapter": "practical-java",
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
           "type": "text",
           "value": "Classic I/O: byte streams ("
          },
          {
           "type": "inlineCode",
           "value": "InputStream"
          },
          {
           "type": "text",
           "value": "/"
          },
          {
           "type": "inlineCode",
           "value": "OutputStream"
          },
          {
           "type": "text",
           "value": ") for binary, character streams ("
          },
          {
           "type": "inlineCode",
           "value": "Reader"
          },
          {
           "type": "text",
           "value": "/"
          },
          {
           "type": "inlineCode",
           "value": "Writer"
          },
          {
           "type": "text",
           "value": ") for text; buffered variants reduce expensive underlying operations."
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
             "value": "NIO"
            }
           ]
          },
          {
           "type": "text",
           "value": " ("
          },
          {
           "type": "inlineCode",
           "value": "java.nio"
          },
          {
           "type": "text",
           "value": "): "
          },
          {
           "type": "inlineCode",
           "value": "Path"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "Files"
          },
          {
           "type": "text",
           "value": ", channels, buffers — e.g. "
          },
          {
           "type": "inlineCode",
           "value": "Files.readString(Path.of(\"a.txt\"))"
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
   "id": "s-jdbc",
   "num": null,
   "title": "JDBC",
   "stars": 0,
   "chapter": "practical-java",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Java API to run SQL against relational databases: "
      },
      {
       "type": "inlineCode",
       "value": "Connection"
      },
      {
       "type": "text",
       "value": " -> "
      },
      {
       "type": "inlineCode",
       "value": "PreparedStatement"
      },
      {
       "type": "text",
       "value": "/"
      },
      {
       "type": "inlineCode",
       "value": "Statement"
      },
      {
       "type": "text",
       "value": " -> "
      },
      {
       "type": "inlineCode",
       "value": "ResultSet"
      },
      {
       "type": "text",
       "value": ". Prefer "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "PreparedStatement"
        }
       ]
      },
      {
       "type": "text",
       "value": " (parameterized "
      },
      {
       "type": "inlineCode",
       "value": "?"
      },
      {
       "type": "text",
       "value": ") over building SQL strings — it prevents SQL injection and handles params safely. Wrap resources in try-with-resources."
      }
     ]
    }
   ]
  },
  {
   "id": "s-serialization-reflection-annotations",
   "num": null,
   "title": "Serialization, Reflection, Annotations",
   "stars": 0,
   "chapter": "practical-java",
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
             "value": "Serialization"
            }
           ]
          },
          {
           "type": "text",
           "value": ": object state <-> byte stream ("
          },
          {
           "type": "inlineCode",
           "value": "implements Serializable"
          },
          {
           "type": "text",
           "value": "); "
          },
          {
           "type": "inlineCode",
           "value": "transient"
          },
          {
           "type": "text",
           "value": " fields are skipped. Native serialization has security concerns — JSON is often preferred."
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
             "value": "Reflection"
            }
           ]
          },
          {
           "type": "text",
           "value": ": inspect/use classes, methods, fields at runtime ("
          },
          {
           "type": "inlineCode",
           "value": "User.class"
          },
          {
           "type": "text",
           "value": "). Used by frameworks, DI, ORM; costs compile-time safety and speed."
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
             "value": "Annotations"
            }
           ]
          },
          {
           "type": "text",
           "value": ": metadata ("
          },
          {
           "type": "inlineCode",
           "value": "@Override"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "@Deprecated"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "@FunctionalInterface"
          },
          {
           "type": "text",
           "value": "). They do nothing by themselves — frameworks read and act on them."
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
   "id": "s-interview-terminology",
   "num": null,
   "title": "Interview Terminology",
   "stars": 0,
   "chapter": "practical-java",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "POJO"
        }
       ]
      },
      {
       "type": "text",
       "value": " plain Java object · "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "DTO"
        }
       ]
      },
      {
       "type": "text",
       "value": " carries data between layers · "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Entity"
        }
       ]
      },
      {
       "type": "text",
       "value": " persistent/domain object · "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "DAO / Repository"
        }
       ]
      },
      {
       "type": "text",
       "value": " data-access abstraction · "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "VO"
        }
       ]
      },
      {
       "type": "text",
       "value": " value object (identity by attributes) · "
      },
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
       "value": " repeating gives the same result · "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Reentrant"
        }
       ]
      },
      {
       "type": "text",
       "value": " a thread can re-acquire a lock it holds · "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Coupling"
        }
       ]
      },
      {
       "type": "text",
       "value": " inter-dependency · "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Cohesion"
        }
       ]
      },
      {
       "type": "text",
       "value": " how related a component's responsibilities are."
      }
     ]
    }
   ]
  },
  {
   "id": "s-common-why-x-vs-y-comparisons",
   "num": null,
   "title": "Common \"Why X vs Y?\" Comparisons",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "When asked \"why do we need X when Y exists?\", answer: what Y solves, what X solves differently, X's advantage, a tiny example, a one-liner."
      }
     ]
    }
   ]
  },
  {
   "id": "s-interface-vs-abstract-class",
   "num": null,
   "title": "Interface vs Abstract Class",
   "stars": 1,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Abstract class shares state + common implementation for closely related classes; interface is a contract unrelated classes can implement. A class extends one class but implements many interfaces."
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
         "value": "Remember: abstract class = what you ARE + shared state; interface = what you CAN DO."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-vs-equals",
   "num": null,
   "title": "== vs equals()",
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
           "type": "inlineCode",
           "value": "=="
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "equals()"
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
           "value": "same object/reference (objects); value (primitives)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "logical/content equality"
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
   "id": "s-equals-vs-hashcode",
   "num": null,
   "title": "equals() vs hashCode()",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "hashCode()"
      },
      {
       "type": "text",
       "value": " quickly finds the bucket; "
      },
      {
       "type": "inlineCode",
       "value": "equals()"
      },
      {
       "type": "text",
       "value": " confirms the exact match. Hash collections need both. Equal objects must share a hash code; equal hash codes don't imply equal objects."
      }
     ]
    }
   ]
  },
  {
   "id": "s-string-vs-stringbuilder-vs-stringbuffer",
   "num": null,
   "title": "String vs StringBuilder vs StringBuffer",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
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
           "value": "Mutable?"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Thread-safe?"
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
           "value": "String"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "no (immutable)"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "yes (immutable)"
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
           "value": "StringBuilder"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "yes"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "no — preferred"
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
           "value": "StringBuffer"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "yes"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "yes (synchronized)"
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
         "value": "Remember: few changes -> String; many changes -> StringBuilder; need sync -> StringBuffer."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-arraylist-vs-linkedlist",
   "num": null,
   "title": "ArrayList vs LinkedList",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "ArrayList = dynamic array, fast random access, slow mid-list insert. LinkedList = linked nodes, cheap insert/remove at a known node, slow random access."
      }
     ]
    }
   ]
  },
  {
   "id": "s-arraylist-vs-array",
   "num": null,
   "title": "ArrayList vs Array",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Array: fixed size, holds primitives, indexed. ArrayList: resizable, holds objects, collection methods."
      }
     ]
    }
   ]
  },
  {
   "id": "s-list-vs-set-vs-map",
   "num": null,
   "title": "List vs Set vs Map",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "List = ordered sequence with duplicates; Set = unique values, no key; Map = key -> value association."
      }
     ]
    }
   ]
  },
  {
   "id": "s-hashmap-vs-linkedhashmap-vs-treemap",
   "num": null,
   "title": "HashMap vs LinkedHashMap vs TreeMap",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "No guaranteed order vs insertion/access order vs sorted-by-key (O(log n))."
      }
     ]
    }
   ]
  },
  {
   "id": "s-hashmap-vs-concurrenthashmap",
   "num": null,
   "title": "HashMap vs ConcurrentHashMap",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "HashMap is not thread-safe; ConcurrentHashMap is built for concurrent access."
      }
     ]
    }
   ]
  },
  {
   "id": "s-comparable-vs-comparator-2",
   "num": null,
   "title": "Comparable vs Comparator",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Natural ordering inside the class ("
      },
      {
       "type": "inlineCode",
       "value": "compareTo"
      },
      {
       "type": "text",
       "value": ") vs external custom ordering ("
      },
      {
       "type": "inlineCode",
       "value": "compare"
      },
      {
       "type": "text",
       "value": "). One class can have one natural order but many comparators."
      }
     ]
    }
   ]
  },
  {
   "id": "s-checked-vs-unchecked-exceptions",
   "num": null,
   "title": "Checked vs Unchecked Exceptions",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Compiler forces handling/declaring checked exceptions (recoverable conditions); unchecked (RuntimeException) usually signal programming errors and aren't forced."
      }
     ]
    }
   ]
  },
  {
   "id": "s-overloading-vs-overriding",
   "num": null,
   "title": "Overloading vs Overriding",
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
           "value": "Overloading"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Overriding"
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
           "value": "same class, different params"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "parent-child, same signature"
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
           "value": "compile-time"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "runtime"
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
           "value": "return type alone insufficient"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "same/covariant return"
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
           "value": "static can overload"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "static is hidden, not overridden"
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
   "id": "s-throw-vs-throws-final-vs-finally-vs-finalize",
   "num": null,
   "title": "throw vs throws / final vs finally vs finalize",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "throw"
      },
      {
       "type": "text",
       "value": " = action (throws now); "
      },
      {
       "type": "inlineCode",
       "value": "throws"
      },
      {
       "type": "text",
       "value": " = declaration. "
      },
      {
       "type": "inlineCode",
       "value": "final"
      },
      {
       "type": "text",
       "value": " = restriction; "
      },
      {
       "type": "inlineCode",
       "value": "finally"
      },
      {
       "type": "text",
       "value": " = cleanup block; "
      },
      {
       "type": "inlineCode",
       "value": "finalize"
      },
      {
       "type": "text",
       "value": " = deprecated old cleanup."
      }
     ]
    }
   ]
  },
  {
   "id": "s-volatile-vs-synchronized",
   "num": null,
   "title": "volatile vs synchronized",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "volatile = visibility/order for a variable (not atomic compound ops); synchronized = mutual exclusion + visibility for a region."
      }
     ]
    }
   ]
  },
  {
   "id": "s-thread-vs-executorservice",
   "num": null,
   "title": "Thread vs ExecutorService",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A raw Thread is one worker you manage; ExecutorService manages creation, reuse, scheduling, and pool lifecycle."
      }
     ]
    }
   ]
  },
  {
   "id": "s-stream-vs-for-loop-optional-vs-null",
   "num": null,
   "title": "Stream vs for-loop / Optional vs null",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Stream = declarative pipeline (not always faster); for-loop = explicit control. Optional = absence made explicit and harder to misuse; null = absence represented directly, easy to dereference."
      }
     ]
    }
   ]
  },
  {
   "id": "s-stack-vs-arraydeque",
   "num": null,
   "title": "Stack vs ArrayDeque",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "Stack"
      },
      {
       "type": "text",
       "value": " is legacy; "
      },
      {
       "type": "inlineCode",
       "value": "ArrayDeque"
      },
      {
       "type": "text",
       "value": " is the preferred stack/deque implementation."
      }
     ]
    }
   ]
  },
  {
   "id": "s-orelse-vs-orelseget",
   "num": null,
   "title": "orElse() vs orElseGet()",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "orElse(x)"
      },
      {
       "type": "text",
       "value": " always evaluates the fallback; "
      },
      {
       "type": "inlineCode",
       "value": "orElseGet(() -> x)"
      },
      {
       "type": "text",
       "value": " evaluates it only when the value is absent — cheaper for expensive fallbacks."
      }
     ]
    }
   ]
  }
 ]
};
