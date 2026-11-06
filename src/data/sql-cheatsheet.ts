// AUTO-GENERATED from reference/sql.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs sql
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const sqlCheatsheet: CheatDoc = {
 "title": "SQL & Databases",
 "tagline": "The whole topic on one page — queries, design and the rules to remember.",
 "chapters": [
  {
   "id": "database-fundamentals",
   "title": "Database Fundamentals"
  },
  {
   "id": "query-basics-select",
   "title": "Query Basics (SELECT)"
  },
  {
   "id": "joins",
   "title": "Joins"
  },
  {
   "id": "grouping-and-aggregates",
   "title": "Grouping and Aggregates"
  },
  {
   "id": "subqueries-and-ctes",
   "title": "Subqueries and CTEs"
  },
  {
   "id": "window-functions",
   "title": "Window Functions"
  },
  {
   "id": "set-operations",
   "title": "Set Operations"
  },
  {
   "id": "modifying-data-dml-and-ddl",
   "title": "Modifying Data (DML and DDL)"
  },
  {
   "id": "schema-constraints-and-normalization",
   "title": "Schema, Constraints and Normalization"
  },
  {
   "id": "indexes-and-performance",
   "title": "Indexes and Performance"
  },
  {
   "id": "transactions-and-acid",
   "title": "Transactions and ACID"
  },
  {
   "id": "isolation-and-locking",
   "title": "Isolation and Locking"
  },
  {
   "id": "views-procedures-and-triggers",
   "title": "Views, Procedures and Triggers"
  },
  {
   "id": "scaling-and-architecture",
   "title": "Scaling and Architecture"
  },
  {
   "id": "postgresql-vs-mysql",
   "title": "PostgreSQL vs MySQL"
  },
  {
   "id": "common-why-x-vs-y-comparisons",
   "title": "Common \"Why X vs Y?\" Comparisons"
  }
 ],
 "sections": [
  {
   "id": "s-what-a-database-is",
   "num": null,
   "title": "What a database is",
   "stars": 0,
   "chapter": "database-fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A database is an organized collection of data you can store, find, change, and manage efficiently. A "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "DBMS"
        }
       ]
      },
      {
       "type": "text",
       "value": " is the software that manages it; an "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "RDBMS"
        }
       ]
      },
      {
       "type": "text",
       "value": " is a DBMS that stores data in related tables with keys and integrity rules. "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "SQL"
        }
       ]
      },
      {
       "type": "text",
       "value": " is the language used to talk to a relational database."
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
           "value": "Table = rows and columns; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Row/Record"
            }
           ]
          },
          {
           "type": "text",
           "value": " = one entry; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Column/Field"
            }
           ]
          },
          {
           "type": "text",
           "value": " = one attribute."
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
             "value": "Schema"
            }
           ]
          },
          {
           "type": "text",
           "value": " = the structure of the database objects."
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
           "value": "Examples of RDBMS: PostgreSQL, MySQL, Oracle, SQL Server."
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
         "value": "Remember: Store data, find it, change it, keep it correct, make it fast, and let many users work safely."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-sql-vs-nosql",
   "num": null,
   "title": "SQL vs NoSQL",
   "stars": 0,
   "chapter": "database-fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The first big choice. "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "SQL"
        }
       ]
      },
      {
       "type": "text",
       "value": " stores structured data in tables with clear relationships; "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "NoSQL"
        }
       ]
      },
      {
       "type": "text",
       "value": " uses flexible models (documents, key-value, wide-column, graph)."
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
         "children": []
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "SQL"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "NoSQL"
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
           "value": "Model"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Tables + relationships"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Documents, KV, wide-column, graph"
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
           "value": "Best when"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Relationships, transactions, complex queries"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Flexible schema, huge scale, simple fast access"
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
           "value": "Examples"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "PostgreSQL, MySQL, Oracle"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "MongoDB, Redis, Cassandra, Neo4j"
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
         "value": "Remember: SQL = structured tables and relationships; NoSQL = flexible models and scale."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-primary-key",
   "num": null,
   "title": "Primary key",
   "stars": 1,
   "chapter": "database-fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A column (or set of columns) that uniquely identifies each row. Must be "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "unique"
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
         "value": "not NULL"
        }
       ]
      },
      {
       "type": "text",
       "value": "; a table has one primary key, but it can span multiple columns (composite)."
      }
     ]
    },
    {
     "type": "code",
     "value": "CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100));",
     "lang": "sql"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Primary key answers \"who am I?\" — unique, never NULL, one per table."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-foreign-key",
   "num": null,
   "title": "Foreign key",
   "stars": 1,
   "chapter": "database-fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A column that references a key in another table (or the same table). It enforces "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "referential integrity"
        }
       ]
      },
      {
       "type": "text",
       "value": " — you cannot reference a row that does not exist. A foreign key does "
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
       "value": " have to be unique: many orders can point to the same user."
      }
     ]
    },
    {
     "type": "code",
     "value": "CREATE TABLE orders (\n  id INT PRIMARY KEY,\n  user_id INT,\n  FOREIGN KEY (user_id) REFERENCES users(id)\n);",
     "lang": "sql"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Foreign key answers \"which other row am I linked to?\" — and can repeat."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-types-of-keys",
   "num": null,
   "title": "Types of keys",
   "stars": 0,
   "chapter": "database-fundamentals",
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
             "value": "Candidate key:"
            }
           ]
          },
          {
           "type": "text",
           "value": " minimal set of columns that uniquely identifies a row."
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
             "value": "Alternate key:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a candidate key not chosen as primary."
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
             "value": "Composite key:"
            }
           ]
          },
          {
           "type": "text",
           "value": " made of multiple columns."
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
             "value": "Surrogate key:"
            }
           ]
          },
          {
           "type": "text",
           "value": " artificial ID (auto-generated)."
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
             "value": "Natural key:"
            }
           ]
          },
          {
           "type": "text",
           "value": " real-world identifier (e.g. a national product code)."
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
   "id": "s-relationships",
   "num": null,
   "title": "Relationships",
   "stars": 0,
   "chapter": "database-fundamentals",
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
             "value": "One-to-One:"
            }
           ]
          },
          {
           "type": "text",
           "value": " person → passport."
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
             "value": "One-to-Many"
            }
           ]
          },
          {
           "type": "text",
           "value": " ⭐: user → orders."
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
             "value": "Many-to-Many:"
            }
           ]
          },
          {
           "type": "text",
           "value": " students ↔ courses, implemented with a junction/mapping table ("
          },
          {
           "type": "inlineCode",
           "value": "student_id, course_id"
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
   "id": "s-sql-command-categories",
   "num": null,
   "title": "SQL command categories",
   "stars": 0,
   "chapter": "database-fundamentals",
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
           "value": "Category"
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
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Commands"
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
           "value": "DDL"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Define structures"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "CREATE, ALTER, DROP, TRUNCATE"
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
           "value": "DML"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Modify data"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "INSERT, UPDATE, DELETE"
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
           "value": "DQL"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Read data"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "SELECT"
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
           "value": "DCL"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Manage privileges"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "GRANT, REVOKE"
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
           "value": "TCL"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Manage transactions"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "COMMIT, ROLLBACK, SAVEPOINT"
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
   "id": "s-data-types",
   "num": null,
   "title": "Data types",
   "stars": 0,
   "chapter": "database-fundamentals",
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
             "value": "INT / BIGINT"
            }
           ]
          },
          {
           "type": "text",
           "value": " for whole numbers; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "DECIMAL(p,s) / NUMERIC"
            }
           ]
          },
          {
           "type": "text",
           "value": " for exact money; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "FLOAT/REAL/DOUBLE"
            }
           ]
          },
          {
           "type": "text",
           "value": " are approximate."
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
             "value": "CHAR(n)"
            }
           ]
          },
          {
           "type": "text",
           "value": " fixed-width (padded); "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "VARCHAR(n)"
            }
           ]
          },
          {
           "type": "text",
           "value": " variable up to a limit; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "TEXT"
            }
           ]
          },
          {
           "type": "text",
           "value": " for long text."
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
             "value": "DATE, TIME, TIMESTAMP"
            }
           ]
          },
          {
           "type": "text",
           "value": "; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "BOOLEAN"
            }
           ]
          },
          {
           "type": "text",
           "value": "; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "JSON / JSONB"
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
         "value": "Remember: Use DECIMAL for money — floating point rounds. PostgreSQL has native BOOLEAN; MySQL BOOLEAN is an alias for TINYINT(1). PostgreSQL has JSON and JSONB (JSONB indexes well); MySQL has native JSON."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-null",
   "num": null,
   "title": "NULL",
   "stars": 1,
   "chapter": "database-fundamentals",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "NULL means missing/unknown — it is "
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
       "value": " 0 and not an empty string. Comparisons with NULL give "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "UNKNOWN"
        }
       ]
      },
      {
       "type": "text",
       "value": ", and WHERE keeps only rows where the condition is TRUE."
      }
     ]
    },
    {
     "type": "code",
     "value": "SELECT * FROM users WHERE city IS NULL;      -- correct\n-- WHERE city = NULL                          -- wrong: always UNKNOWN",
     "lang": "sql"
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
           "value": "Three-valued logic: TRUE / FALSE / UNKNOWN."
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
           "value": "COALESCE(a, b, ...)"
          },
          {
           "type": "text",
           "value": " returns the first non-NULL value; "
          },
          {
           "type": "inlineCode",
           "value": "NULLIF(a,b)"
          },
          {
           "type": "text",
           "value": " returns NULL when a=b, else a."
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
           "value": "Most aggregates ignore NULL; "
          },
          {
           "type": "inlineCode",
           "value": "COUNT(*)"
          },
          {
           "type": "text",
           "value": " is the exception. "
          },
          {
           "type": "inlineCode",
           "value": "SUM"
          },
          {
           "type": "text",
           "value": "/"
          },
          {
           "type": "inlineCode",
           "value": "AVG"
          },
          {
           "type": "text",
           "value": " of no non-NULL rows return NULL."
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
         "value": "Remember: Use IS NULL / IS NOT NULL, never = NULL."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-select-where-order-by-limit",
   "num": null,
   "title": "SELECT, WHERE, ORDER BY, LIMIT",
   "stars": 0,
   "chapter": "query-basics-select",
   "nodes": [
    {
     "type": "code",
     "value": "SELECT name, age FROM users\nWHERE age >= 25 AND city = 'Delhi'\nORDER BY age DESC, name ASC\nLIMIT 10 OFFSET 20;",
     "lang": "sql"
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
           "value": "SELECT *"
          },
          {
           "type": "text",
           "value": " is handy for debugging; list columns explicitly in production."
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
           "value": "Operators: "
          },
          {
           "type": "inlineCode",
           "value": "="
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "<>"
          },
          {
           "type": "text",
           "value": " / "
          },
          {
           "type": "inlineCode",
           "value": "!="
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": ">"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "<"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": ">="
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "<="
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "AND"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "OR"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "NOT"
          },
          {
           "type": "text",
           "value": ". Use parentheses when mixing AND/OR."
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
           "value": "DISTINCT"
          },
          {
           "type": "text",
           "value": " removes duplicate "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "row combinations"
            }
           ]
          },
          {
           "type": "text",
           "value": ", not per column."
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
           "value": "ORDER BY"
          },
          {
           "type": "text",
           "value": ": ASC (default) / DESC. Rows tied on all sort keys have no guaranteed order — add a unique tie-breaker for stable pagination."
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
           "value": "LIMIT n OFFSET m"
          },
          {
           "type": "text",
           "value": " returns up to n rows after skipping m. Large offsets are slow (prefer keyset pagination)."
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
   "id": "s-between-in-like",
   "num": null,
   "title": "BETWEEN, IN, LIKE",
   "stars": 0,
   "chapter": "query-basics-select",
   "nodes": [
    {
     "type": "code",
     "value": "WHERE age BETWEEN 20 AND 30        -- inclusive both ends\nWHERE city IN ('Delhi', 'Mumbai')\nWHERE name LIKE 'A%'               -- starts with A\nWHERE name LIKE '%an%'             -- contains \"an\"\nWHERE name LIKE '_a%'              -- one char, then 'a'",
     "lang": "sql"
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
           "value": "%"
          },
          {
           "type": "text",
           "value": " = zero or more chars; "
          },
          {
           "type": "inlineCode",
           "value": "_"
          },
          {
           "type": "text",
           "value": " = exactly one char."
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
           "value": "LIKE case sensitivity depends on collation; PostgreSQL has "
          },
          {
           "type": "inlineCode",
           "value": "ILIKE"
          },
          {
           "type": "text",
           "value": " for case-insensitive matching."
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
   "id": "s-logical-run-order",
   "num": null,
   "title": "Logical run order",
   "stars": 3,
   "chapter": "query-basics-select",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A query is written SELECT-first but logically runs in a different order:"
      }
     ]
    },
    {
     "type": "code",
     "value": "FROM / JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "This is the logical model, not the optimizer's physical order."
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
         "value": "Remember: WHERE runs before SELECT, so a SELECT alias generally can't be used in WHERE (it isn't defined yet)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-case-and-coalesce",
   "num": null,
   "title": "CASE and COALESCE",
   "stars": 0,
   "chapter": "query-basics-select",
   "nodes": [
    {
     "type": "code",
     "value": "SELECT name,\n  CASE WHEN salary >= 100000 THEN 'HIGH'\n       WHEN salary >= 50000  THEN 'MEDIUM'\n       ELSE 'LOW' END AS level\nFROM employees;",
     "lang": "sql"
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
           "value": "CASE"
          },
          {
           "type": "text",
           "value": " classifies values; works in SELECT and ORDER BY."
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
           "value": "COALESCE(phone, email, 'N/A')"
          },
          {
           "type": "text",
           "value": " returns the first non-NULL."
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
   "id": "s-string-and-date-functions",
   "num": null,
   "title": "String and date functions",
   "stars": 0,
   "chapter": "query-basics-select",
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
           "value": "Strings: "
          },
          {
           "type": "inlineCode",
           "value": "UPPER"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "LOWER"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "LENGTH"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "TRIM"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "CONCAT"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "SUBSTRING"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "REPLACE"
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
           "value": "Dates: "
          },
          {
           "type": "inlineCode",
           "value": "CURRENT_DATE"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "CURRENT_TIMESTAMP"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "YEAR/MONTH/DAY"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "DATEDIFF"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "DATE_ADD"
          },
          {
           "type": "text",
           "value": ", "
          },
          {
           "type": "inlineCode",
           "value": "DATE_SUB"
          },
          {
           "type": "text",
           "value": ". Exact date-function syntax varies by database."
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
   "id": "s-the-four-joins",
   "num": null,
   "title": "The four joins",
   "stars": 3,
   "chapter": "joins",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A JOIN combines rows from tables using a condition."
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
           "value": "Join"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Returns"
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
           "value": "INNER"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Only rows matching on both sides"
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
           "value": "LEFT"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "All left rows + matching right (unmatched right = NULL)"
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
           "value": "RIGHT"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "All right rows + matching left"
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
           "value": "FULL OUTER"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "All rows from both, matched or not"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "SELECT u.name, o.amount\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id;",
     "lang": "sql"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: INNER = matching only; LEFT = keep all left; RIGHT = keep all right; FULL = keep both. MySQL has no direct FULL OUTER JOIN (emulate with LEFT + RIGHT + UNION)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-other-joins",
   "num": null,
   "title": "Other joins",
   "stars": 0,
   "chapter": "joins",
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
             "value": "CROSS JOIN:"
            }
           ]
          },
          {
           "type": "text",
           "value": " every left row paired with every right row (3×4 = 12 rows)."
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
             "value": "SELF JOIN:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a table joined to itself (employee ↔ manager)."
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
             "value": "EQUI / NON-EQUI:"
            }
           ]
          },
          {
           "type": "text",
           "value": " join on equality vs on a range."
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
   "id": "s-on-vs-where-in-joins",
   "num": null,
   "title": "ON vs WHERE in joins",
   "stars": 1,
   "chapter": "joins",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A condition in "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "ON"
        }
       ]
      },
      {
       "type": "text",
       "value": " controls matching; a condition in "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "WHERE"
        }
       ]
      },
      {
       "type": "text",
       "value": " filters the final rows."
      }
     ]
    },
    {
     "type": "code",
     "value": "-- Keeps users with no paid orders (filter in ON)\nFROM users u LEFT JOIN orders o\n  ON u.id = o.user_id AND o.status = 'PAID';\n\n-- Drops users with no paid orders (filter in WHERE turns LEFT into INNER)\nFROM users u LEFT JOIN orders o\n  ON u.id = o.user_id\nWHERE o.status = 'PAID';",
     "lang": "sql"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Putting a right-table filter in WHERE of a LEFT JOIN quietly makes it behave like an INNER JOIN."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-find-rows-with-no-match-anti-join",
   "num": null,
   "title": "Find rows with no match (anti-join)",
   "stars": 0,
   "chapter": "joins",
   "nodes": [
    {
     "type": "code",
     "value": "SELECT u.* FROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nWHERE o.id IS NULL;              -- users with no orders\n-- or NOT EXISTS (often clearer)",
     "lang": "sql"
    }
   ]
  },
  {
   "id": "s-aggregate-functions",
   "num": null,
   "title": "Aggregate functions",
   "stars": 0,
   "chapter": "grouping-and-aggregates",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "COUNT(*)"
      },
      {
       "type": "text",
       "value": " counts rows; "
      },
      {
       "type": "inlineCode",
       "value": "COUNT(column)"
      },
      {
       "type": "text",
       "value": " counts non-NULL; "
      },
      {
       "type": "inlineCode",
       "value": "COUNT(DISTINCT column)"
      },
      {
       "type": "text",
       "value": " counts distinct non-NULL. Also "
      },
      {
       "type": "inlineCode",
       "value": "SUM"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "AVG"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "MIN"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "MAX"
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
       "value": "For values "
      },
      {
       "type": "inlineCode",
       "value": "10, 10, NULL"
      },
      {
       "type": "text",
       "value": ": "
      },
      {
       "type": "inlineCode",
       "value": "COUNT(*)=3"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "COUNT(col)=2"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "COUNT(DISTINCT col)=1"
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
   "id": "s-group-by-and-having",
   "num": null,
   "title": "GROUP BY and HAVING",
   "stars": 3,
   "chapter": "grouping-and-aggregates",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "GROUP BY makes groups and computes an aggregate per group. HAVING filters groups."
      }
     ]
    },
    {
     "type": "code",
     "value": "SELECT city, COUNT(*) AS total\nFROM users\nWHERE age >= 18        -- filters rows first\nGROUP BY city\nHAVING COUNT(*) >= 5;  -- filters groups after",
     "lang": "sql"
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
           "value": "A selected column in a grouped query must be grouped or aggregated."
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
           "value": "WHERE can't use a group aggregate like "
          },
          {
           "type": "inlineCode",
           "value": "COUNT(*)"
          },
          {
           "type": "text",
           "value": " directly — use HAVING or a subquery."
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
         "value": "Remember: WHERE = rows (before grouping); HAVING = groups (after grouping)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-conditional-aggregates",
   "num": null,
   "title": "Conditional aggregates",
   "stars": 0,
   "chapter": "grouping-and-aggregates",
   "nodes": [
    {
     "type": "code",
     "value": "SELECT COUNT(*) AS total,\n       COUNT(CASE WHEN status='COMPLETED' THEN 1 END) AS completed,\n       SUM(CASE WHEN status='COMPLETED' THEN amount ELSE 0 END) AS revenue\nFROM orders;",
     "lang": "sql"
    }
   ]
  },
  {
   "id": "s-subqueries",
   "num": null,
   "title": "Subqueries",
   "stars": 0,
   "chapter": "subqueries-and-ctes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A query nested inside another."
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
             "value": "Scalar:"
            }
           ]
          },
          {
           "type": "text",
           "value": " returns one value — "
          },
          {
           "type": "inlineCode",
           "value": "WHERE age > (SELECT AVG(age) FROM users)"
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
             "value": "Multi-row with IN:"
            }
           ]
          },
          {
           "type": "text",
           "value": " "
          },
          {
           "type": "inlineCode",
           "value": "WHERE id IN (SELECT user_id FROM orders)"
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
             "value": "EXISTS:"
            }
           ]
          },
          {
           "type": "text",
           "value": " true if the subquery returns at least one row ("
          },
          {
           "type": "inlineCode",
           "value": "SELECT 1"
          },
          {
           "type": "text",
           "value": " by convention)."
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
             "value": "Correlated:"
            }
           ]
          },
          {
           "type": "text",
           "value": " references the outer query, so it may be re-evaluated per row; "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "non-correlated"
            }
           ]
          },
          {
           "type": "text",
           "value": " stands alone."
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
   "id": "s-in-vs-exists",
   "num": null,
   "title": "IN vs EXISTS",
   "stars": 0,
   "chapter": "subqueries-and-ctes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Both test membership/existence and the optimizer may plan them similarly."
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
         "value": "NOT IN"
        },
        {
         "type": "text",
         "value": " is dangerous when the subquery can return NULL (can yield UNKNOWN and drop everything); "
        },
        {
         "type": "inlineCode",
         "value": "NOT EXISTS"
        },
        {
         "type": "text",
         "value": " is safer for anti-joins."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-ctes-with",
   "num": null,
   "title": "CTEs (WITH)",
   "stars": 0,
   "chapter": "subqueries-and-ctes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A named query block, good for readability and recursion."
      }
     ]
    },
    {
     "type": "code",
     "value": "WITH high_value AS (\n  SELECT * FROM orders WHERE amount > 10000\n)\nSELECT * FROM high_value;",
     "lang": "sql"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A CTE names a query; a subquery is embedded. Neither is automatically faster."
      }
     ]
    }
   ]
  },
  {
   "id": "s-recursive-cte",
   "num": null,
   "title": "Recursive CTE",
   "stars": 0,
   "chapter": "subqueries-and-ctes",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For hierarchies (employee→manager, categories):"
      }
     ]
    },
    {
     "type": "code",
     "value": "WITH RECURSIVE tree AS (\n  SELECT id, manager_id, name FROM employees WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.id, e.manager_id, e.name\n  FROM employees e JOIN tree t ON e.manager_id = t.id\n)\nSELECT * FROM tree;",
     "lang": "sql"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Account for cycles in production hierarchies."
      }
     ]
    }
   ]
  },
  {
   "id": "s-what-they-do",
   "num": null,
   "title": "What they do",
   "stars": 0,
   "chapter": "window-functions",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Window functions compute across related rows "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "without collapsing"
        }
       ]
      },
      {
       "type": "text",
       "value": " them into one row (unlike GROUP BY). "
      },
      {
       "type": "inlineCode",
       "value": "PARTITION BY"
      },
      {
       "type": "text",
       "value": " splits rows into independent groups; "
      },
      {
       "type": "inlineCode",
       "value": "ORDER BY"
      },
      {
       "type": "text",
       "value": " orders within the window."
      }
     ]
    },
    {
     "type": "code",
     "value": "ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn",
     "lang": "sql"
    }
   ]
  },
  {
   "id": "s-ranking-functions",
   "num": null,
   "title": "Ranking functions",
   "stars": 0,
   "chapter": "window-functions",
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
           "value": "Function"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Ties (scores 100, 100, 90)"
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
           "value": "ROW_NUMBER()"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "1, 2, 3 — always distinct"
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
           "value": "RANK()"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "1, 1, 3 — ties share, gap after"
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
           "value": "DENSE_RANK()"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "1, 1, 2 — ties share, no gap"
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
         "value": "Remember: ROW_NUMBER = 1 2 3 4; RANK = 1 2 2 4; DENSE_RANK = 1 2 2 3."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-running-total-lag-lead",
   "num": null,
   "title": "Running total, LAG, LEAD",
   "stars": 0,
   "chapter": "window-functions",
   "nodes": [
    {
     "type": "code",
     "value": "SUM(amount) OVER (PARTITION BY user_id ORDER BY created_at, id\n                  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total\n\nLAG(sales)  OVER (ORDER BY date) AS previous   -- previous row\nLEAD(sales) OVER (ORDER BY date) AS next       -- next row",
     "lang": "sql"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "LAG"
      },
      {
       "type": "text",
       "value": "/"
      },
      {
       "type": "inlineCode",
       "value": "LEAD"
      },
      {
       "type": "text",
       "value": " read a neighbouring row's value without a self-join."
      }
     ]
    }
   ]
  },
  {
   "id": "s-top-n-per-group-common-pattern",
   "num": null,
   "title": "Top-N per group (common pattern)",
   "stars": 0,
   "chapter": "window-functions",
   "nodes": [
    {
     "type": "code",
     "value": "SELECT * FROM (\n  SELECT e.*, DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk\n  FROM employees e\n) ranked\nWHERE rnk = 1;        -- rnk <= 3 for top three; preserves ties",
     "lang": "sql"
    }
   ]
  },
  {
   "id": "s-set-operations",
   "num": null,
   "title": "Set Operations",
   "stars": 0,
   "chapter": "set-operations",
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
           "value": "UNION"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Combine, remove duplicates"
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
           "value": "UNION ALL"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Combine, keep duplicates (cheaper)"
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
           "value": "INTERSECT"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Rows in both"
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
           "value": "EXCEPT"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Rows in the first but not the second"
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
           "type": "text",
           "value": "Queries must have matching column counts and compatible types; put "
          },
          {
           "type": "inlineCode",
           "value": "ORDER BY"
          },
          {
           "type": "text",
           "value": " at the very end."
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
           "value": "PostgreSQL supports all four; MySQL supports UNION / UNION ALL, and INTERSECT / EXCEPT from 8.0.31."
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
         "value": "Remember: UNION de-duplicates (extra work); UNION ALL keeps everything (faster)."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-insert-update-delete",
   "num": null,
   "title": "INSERT, UPDATE, DELETE",
   "stars": 0,
   "chapter": "modifying-data-dml-and-ddl",
   "nodes": [
    {
     "type": "code",
     "value": "INSERT INTO users (id, name) VALUES (1, 'Asha'), (2, 'Riya');\nUPDATE users SET name = 'Riya' WHERE id = 1;\nDELETE FROM users WHERE id = 1;",
     "lang": "sql"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: Without WHERE, UPDATE changes every row and DELETE deletes every row."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-upsert-insert-or-update-on-conflict",
   "num": null,
   "title": "Upsert (insert or update on conflict)",
   "stars": 0,
   "chapter": "modifying-data-dml-and-ddl",
   "nodes": [
    {
     "type": "code",
     "value": "-- PostgreSQL\nINSERT INTO users (id, name) VALUES (1, 'Asha')\nON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;\n\n-- MySQL\nINSERT INTO users (id, name) VALUES (1, 'Asha')\nON DUPLICATE KEY UPDATE name = 'Asha';",
     "lang": "sql"
    }
   ]
  },
  {
   "id": "s-delete-vs-truncate-vs-drop",
   "num": null,
   "title": "DELETE vs TRUNCATE vs DROP",
   "stars": 0,
   "chapter": "modifying-data-dml-and-ddl",
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
           "value": "Command"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Removes"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "WHERE?"
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
           "value": "DELETE"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Selected rows"
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
           "value": "TRUNCATE"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "All rows (less row-by-row overhead)"
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
           "value": "DROP"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "The whole table (structure + data)"
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
         "value": "Remember: DELETE = chosen rows; TRUNCATE = all rows, keep table; DROP = table gone. PostgreSQL TRUNCATE is transactional; MySQL TRUNCATE forces an implicit commit."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-constraints",
   "num": null,
   "title": "Constraints",
   "stars": 2,
   "chapter": "schema-constraints-and-normalization",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Rules that protect data correctness."
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
           "value": "Constraint"
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
           "type": "text",
           "value": "PRIMARY KEY"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Unique, non-NULL identifier"
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
           "value": "FOREIGN KEY"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Valid references"
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
           "value": "UNIQUE"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "No duplicate key values (can span columns)"
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
           "value": "NOT NULL"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Requires a value"
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
           "value": "CHECK"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "A condition must hold"
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
           "value": "DEFAULT"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Value when column omitted"
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "CREATE TABLE employees (\n  id INT PRIMARY KEY,\n  email VARCHAR(255) UNIQUE,\n  salary DECIMAL(10,2) CHECK (salary >= 0),\n  active BOOLEAN NOT NULL DEFAULT TRUE\n);",
     "lang": "sql"
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
           "value": "DEFAULT applies when the column is omitted, not when you insert NULL explicitly."
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
           "value": "CHECK does not reject NULL by itself (NULL → UNKNOWN); add NOT NULL if needed."
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
           "value": "Foreign-key actions: "
          },
          {
           "type": "inlineCode",
           "value": "ON DELETE CASCADE / SET NULL / RESTRICT / NO ACTION"
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
   "id": "s-normalization",
   "num": null,
   "title": "Normalization",
   "stars": 1,
   "chapter": "schema-constraints-and-normalization",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Organizing data to reduce duplication and prevent inconsistent updates. It avoids three anomalies: "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "insertion"
        }
       ]
      },
      {
       "type": "text",
       "value": " (can't store one fact without another), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "update"
        }
       ]
      },
      {
       "type": "text",
       "value": " (same fact in many rows), "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "deletion"
        }
       ]
      },
      {
       "type": "text",
       "value": " (losing a fact by deleting a row)."
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
           "value": "Form"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Easy definition"
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
           "value": "1NF"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Atomic values; no repeating groups"
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
           "value": "2NF"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "1NF + no non-key column depends on only part of a composite key"
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
           "value": "3NF"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "2NF + no transitive dependency on the key"
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
           "value": "BCNF"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Every determinant is a superkey"
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
   "id": "s-denormalization",
   "num": null,
   "title": "Denormalization",
   "stars": 0,
   "chapter": "schema-constraints-and-normalization",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Intentionally duplicating or precomputing data to speed up reads or simplify queries — at the cost of storage and update complexity."
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
         "value": "Remember: Normalize for consistency; denormalize for read performance when a measured workload justifies it."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-indexes",
   "num": null,
   "title": "Indexes",
   "stars": 3,
   "chapter": "indexes-and-performance",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "An index is a structure that helps the database find rows without scanning the whole table — like a book's index."
      }
     ]
    },
    {
     "type": "code",
     "value": "CREATE INDEX idx_users_email ON users(email);",
     "lang": "sql"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "But indexes cost storage and slow INSERT/UPDATE/DELETE (they must be maintained)."
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
         "value": "Types:"
        }
       ]
      },
      {
       "type": "text",
       "value": " B-tree (default, equality + range), Hash (equality), Composite (multi-column), Unique, Partial/filtered, Expression/functional, Full-text, Spatial."
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
           "value": "PostgreSQL: B-tree, Hash, GiST, SP-GiST, GIN, BRIN."
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
           "value": "MySQL InnoDB: mainly B-tree, plus full-text and spatial."
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
   "id": "s-composite-index-and-leftmost-prefix",
   "num": null,
   "title": "Composite index and leftmost-prefix",
   "stars": 0,
   "chapter": "indexes-and-performance",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For an index on "
      },
      {
       "type": "inlineCode",
       "value": "(A, B, C)"
      },
      {
       "type": "text",
       "value": ", it best supports filters starting with A, then A+B, then A+B+C. It helps little for filtering on B alone."
      }
     ]
    },
    {
     "type": "code",
     "value": "CREATE INDEX idx ON orders(user_id, status);  -- great for user_id, or user_id+status",
     "lang": "sql"
    }
   ]
  },
  {
   "id": "s-clustered-vs-non-clustered",
   "num": null,
   "title": "Clustered vs non-clustered",
   "stars": 0,
   "chapter": "indexes-and-performance",
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
             "value": "Clustered:"
            }
           ]
          },
          {
           "type": "text",
           "value": " table rows organized around the index key."
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
             "value": "Non-clustered:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a separate structure pointing to rows."
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
           "value": "InnoDB clusters the table on the primary key; secondary indexes store the primary-key value to find rows."
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
         "value": "Remember: A PostgreSQL primary key does "
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
         "value": " physically sort the table; "
        },
        {
         "type": "inlineCode",
         "value": "CLUSTER"
        },
        {
         "type": "text",
         "value": " reorders once but isn't maintained afterward."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-when-indexes-don-t-help",
   "num": null,
   "title": "When indexes don't help",
   "stars": 0,
   "chapter": "indexes-and-performance",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Adding an index does "
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
       "value": " always speed a query. Common reasons it isn't used:"
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
           "value": "The query returns a large fraction of the table."
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
           "value": "A function/conversion wraps the column ("
          },
          {
           "type": "inlineCode",
           "value": "WHERE LOWER(email) = ..."
          },
          {
           "type": "text",
           "value": ") — use an expression/functional index."
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
           "value": "The filter doesn't match the index's leading columns."
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
           "value": "Stale statistics, or the optimizer estimates a scan is cheaper."
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
   "id": "s-explain",
   "num": null,
   "title": "EXPLAIN",
   "stars": 0,
   "chapter": "indexes-and-performance",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "EXPLAIN"
      },
      {
       "type": "text",
       "value": " shows the planned execution; "
      },
      {
       "type": "inlineCode",
       "value": "EXPLAIN ANALYZE"
      },
      {
       "type": "text",
       "value": " actually runs the query and reports real timings (careful: it executes the statement, including writes)."
      }
     ]
    }
   ]
  },
  {
   "id": "s-optimizing-a-slow-query-answer-order",
   "num": null,
   "title": "Optimizing a slow query (answer order)",
   "stars": 0,
   "chapter": "indexes-and-performance",
   "nodes": [
    {
     "type": "list",
     "ordered": true,
     "children": [
      {
       "type": "listItem",
       "children": [
        {
         "type": "paragraph",
         "children": [
          {
           "type": "text",
           "value": "Measure and find the slow query. 2. Read the plan (EXPLAIN). 3. Check indexes. 4. Reduce work (select needed columns, filter early). 5. Review joins/subqueries and cardinality. 6. Check statistics/data types. 7. Measure again."
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
             "value": "Covering index:"
            }
           ]
          },
          {
           "type": "text",
           "value": " holds all columns a query needs, so the table isn't touched."
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
             "value": "Selectivity:"
            }
           ]
          },
          {
           "type": "text",
           "value": " how narrowly a predicate filters (high = matches few rows). "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Cardinality:"
            }
           ]
          },
          {
           "type": "text",
           "value": " number of distinct values / estimated rows."
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
   "id": "s-n-1-query-problem",
   "num": null,
   "title": "N+1 query problem",
   "stars": 3,
   "chapter": "indexes-and-performance",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "One query to fetch 100 users, then 100 more to fetch each user's orders = 101 queries. Fix with joins, fetch strategies, or batch fetching."
      }
     ]
    }
   ]
  },
  {
   "id": "s-pagination",
   "num": null,
   "title": "Pagination",
   "stars": 3,
   "chapter": "indexes-and-performance",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Don't return a million rows. "
      },
      {
       "type": "inlineCode",
       "value": "LIMIT/OFFSET"
      },
      {
       "type": "text",
       "value": " is simple but slow at large offsets; "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "keyset/cursor"
        }
       ]
      },
      {
       "type": "text",
       "value": " pagination ("
      },
      {
       "type": "inlineCode",
       "value": "WHERE id > last_seen_id"
      },
      {
       "type": "text",
       "value": ") is better for large, changing datasets."
      }
     ]
    }
   ]
  },
  {
   "id": "s-connection-pooling",
   "num": null,
   "title": "Connection pooling",
   "stars": 3,
   "chapter": "indexes-and-performance",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Opening a DB connection is expensive, so a pool keeps connections open and reuses them (HikariCP in Spring Boot). Bigger is not always better — too many concurrent queries overload the database."
      }
     ]
    }
   ]
  },
  {
   "id": "s-sql-injection",
   "num": null,
   "title": "SQL injection",
   "stars": 3,
   "chapter": "indexes-and-performance",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Happens when untrusted input becomes executable SQL. Use "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "parameterized queries / prepared statements"
        }
       ]
      },
      {
       "type": "text",
       "value": ", never string concatenation."
      }
     ]
    },
    {
     "type": "code",
     "value": "String sql = \"SELECT * FROM users WHERE email = ?\";\nPreparedStatement ps = conn.prepareStatement(sql);\nps.setString(1, email);",
     "lang": "java"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Also: least-privilege DB accounts; table/column names can't be parameters (use an allowlist)."
      }
     ]
    }
   ]
  },
  {
   "id": "s-transaction",
   "num": null,
   "title": "Transaction",
   "stars": 0,
   "chapter": "transactions-and-acid",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A group of operations treated as one unit — all succeed or all fail. Classic example: a bank transfer debits one account and credits another; both must happen."
      }
     ]
    },
    {
     "type": "code",
     "value": "BEGIN;\nUPDATE accounts SET balance = balance - 500 WHERE id = 1;\nUPDATE accounts SET balance = balance + 500 WHERE id = 2;\nCOMMIT;   -- or ROLLBACK on failure",
     "lang": "sql"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "SAVEPOINT"
      },
      {
       "type": "text",
       "value": " lets you roll back part of a transaction ("
      },
      {
       "type": "inlineCode",
       "value": "ROLLBACK TO SAVEPOINT name"
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
   "id": "s-acid",
   "num": null,
   "title": "ACID",
   "stars": 0,
   "chapter": "transactions-and-acid",
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
             "value": "Atomicity:"
            }
           ]
          },
          {
           "type": "text",
           "value": " all changes happen, or none."
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
             "value": "Consistency:"
            }
           ]
          },
          {
           "type": "text",
           "value": " the DB stays valid by its rules/constraints."
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
             "value": "Isolation:"
            }
           ]
          },
          {
           "type": "text",
           "value": " concurrent transactions don't interfere beyond what the isolation level allows."
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
             "value": "Durability:"
            }
           ]
          },
          {
           "type": "text",
           "value": " once committed, data survives failures."
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
         "value": "Remember: All, Correct, Independent, Done-forever."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-concurrency-anomalies",
   "num": null,
   "title": "Concurrency anomalies",
   "stars": 0,
   "chapter": "isolation-and-locking",
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
             "value": "Dirty read:"
            }
           ]
          },
          {
           "type": "text",
           "value": " read uncommitted data that may be rolled back."
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
             "value": "Non-repeatable read:"
            }
           ]
          },
          {
           "type": "text",
           "value": " the same row gives different committed values within one transaction."
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
             "value": "Phantom read:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a repeated predicate query sees a changed set of rows (another transaction inserted/deleted)."
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
             "value": "Lost update:"
            }
           ]
          },
          {
           "type": "text",
           "value": " one update overwrites another. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Write skew:"
            }
           ]
          },
          {
           "type": "text",
           "value": " two individually valid changes together break a rule."
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
   "id": "s-isolation-levels-weak-strong",
   "num": null,
   "title": "Isolation levels (weak → strong)",
   "stars": 0,
   "chapter": "isolation-and-locking",
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
         "children": [
          {
           "type": "text",
           "value": "Level"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Dirty"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Non-repeatable"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Phantom"
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
           "value": "Read Uncommitted"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Possible"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Possible"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Possible"
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
           "value": "Read Committed"
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
           "value": "Possible"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Possible"
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
           "value": "Repeatable Read"
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
           "value": "Possible*"
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
           "value": "Serializable"
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
           "value": "No"
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
       "value": "*In the standard model. Defaults differ: "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "PostgreSQL = Read Committed"
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
         "value": "MySQL InnoDB = Repeatable Read"
        }
       ]
      },
      {
       "type": "text",
       "value": ". PostgreSQL's Repeatable Read uses snapshot isolation (prevents ordinary phantoms, but write skew can still happen)."
      }
     ]
    }
   ]
  },
  {
   "id": "s-locking",
   "num": null,
   "title": "Locking",
   "stars": 0,
   "chapter": "isolation-and-locking",
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
             "value": "Shared lock:"
            }
           ]
          },
          {
           "type": "text",
           "value": " for reading; many can hold it."
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
             "value": "Exclusive lock:"
            }
           ]
          },
          {
           "type": "text",
           "value": " for writing; conflicting operations wait."
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
             "value": "Pessimistic:"
            }
           ]
          },
          {
           "type": "text",
           "value": " lock rows up front ("
          },
          {
           "type": "inlineCode",
           "value": "SELECT ... FOR UPDATE"
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
             "value": "Optimistic:"
            }
           ]
          },
          {
           "type": "text",
           "value": " allow concurrent work, detect conflict on update with a version column."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "UPDATE products SET quantity = 8, version = version + 1\nWHERE id = 1 AND version = 4;   -- 0 rows updated = someone else changed it",
     "lang": "sql"
    }
   ]
  },
  {
   "id": "s-deadlock",
   "num": null,
   "title": "Deadlock",
   "stars": 2,
   "chapter": "isolation-and-locking",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Two transactions each wait for a lock the other holds (A locks row 1 waiting for row 2; B locks row 2 waiting for row 1). The database detects it and aborts one. Reduce by locking in a consistent order, keeping transactions short, and indexing so statements touch fewer rows."
      }
     ]
    }
   ]
  },
  {
   "id": "s-views-procedures-and-triggers",
   "num": null,
   "title": "Views, Procedures and Triggers",
   "stars": 0,
   "chapter": "views-procedures-and-triggers",
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
             "value": "View:"
            }
           ]
          },
          {
           "type": "text",
           "value": " a saved query that acts like a virtual table — simplifies complex queries, abstracts, controls access. Stores the definition, not a copy."
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
             "value": "Materialized view:"
            }
           ]
          },
          {
           "type": "text",
           "value": " stores actual results and must be refreshed ("
          },
          {
           "type": "inlineCode",
           "value": "REFRESH MATERIALIZED VIEW"
          },
          {
           "type": "text",
           "value": "). PostgreSQL supports them natively; MySQL uses summary tables maintained by jobs instead."
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
             "value": "Stored procedure:"
            }
           ]
          },
          {
           "type": "text",
           "value": " DB-side routine for operations/workflows. "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "Function:"
            }
           ]
          },
          {
           "type": "text",
           "value": " returns a value/result. Many apps keep business logic in the application layer instead."
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
             "value": "Trigger:"
            }
           ]
          },
          {
           "type": "text",
           "value": " runs automatically on INSERT/UPDATE/DELETE (auditing, integrity). Use sparingly — hidden logic is hard to debug."
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
   "id": "s-oltp-vs-olap",
   "num": null,
   "title": "OLTP vs OLAP",
   "stars": 0,
   "chapter": "scaling-and-architecture",
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
             "value": "OLTP:"
            }
           ]
          },
          {
           "type": "text",
           "value": " many small transactions (login, order, payment) — consistency matters."
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
             "value": "OLAP:"
            }
           ]
          },
          {
           "type": "text",
           "value": " large analytical queries and aggregations (reports, trends)."
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
         "value": "Remember: OLTP = application transactions; OLAP = analytics."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-replication-vs-sharding",
   "num": null,
   "title": "Replication vs sharding",
   "stars": 2,
   "chapter": "scaling-and-architecture",
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
             "value": "Replication:"
            }
           ]
          },
          {
           "type": "text",
           "value": " copy the same data to multiple servers — for availability, backups, and read scaling (write to primary, read from replicas). Watch "
          },
          {
           "type": "strong",
           "children": [
            {
             "type": "text",
             "value": "replication lag"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a read right after a write may be stale on a lagging replica."
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
             "value": "Sharding:"
            }
           ]
          },
          {
           "type": "text",
           "value": " split different data across servers (users 1–1M, 1M–2M...) — for scale beyond one database."
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
             "value": "Partitioning:"
            }
           ]
          },
          {
           "type": "text",
           "value": " split one large table into pieces (by date/range/hash/list) inside one database, still shown as one logical table."
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
         "value": "Remember: Replication = copy data; sharding = split data across instances; partitioning = split a table within one database."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-cap-theorem",
   "num": null,
   "title": "CAP theorem",
   "stars": 3,
   "chapter": "scaling-and-architecture",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For distributed databases: Consistency, Availability, Partition tolerance. During a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "network partition"
        }
       ]
      },
      {
       "type": "text",
       "value": ", a system must trade off between consistency and availability — it can't fully guarantee both."
      }
     ]
    }
   ]
  },
  {
   "id": "s-database-vs-cache",
   "num": null,
   "title": "Database vs cache",
   "stars": 0,
   "chapter": "scaling-and-architecture",
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
             "value": "Database:"
            }
           ]
          },
          {
           "type": "text",
           "value": " durable source of truth."
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
             "value": "Cache (Redis):"
            }
           ]
          },
          {
           "type": "text",
           "value": " fast temporary layer. Read path: check Redis → on miss, read DB, store in Redis, return."
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
           "value": "Redis (in-memory store) is also used for sessions, rate limiting, counters, locks, pub/sub."
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
   "id": "s-orm-jpa-hibernate",
   "num": null,
   "title": "ORM, JPA, Hibernate",
   "stars": 0,
   "chapter": "scaling-and-architecture",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "ORM maps Java objects to tables. "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "JPA"
        }
       ]
      },
      {
       "type": "text",
       "value": " is the specification; "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Hibernate"
        }
       ]
      },
      {
       "type": "text",
       "value": " is a popular implementation ("
      },
      {
       "type": "inlineCode",
       "value": "userRepository.findById(id)"
      },
      {
       "type": "text",
       "value": "). You still need SQL: complex queries, joins, indexes, and performance matter, and ORMs can generate inefficient queries."
      }
     ]
    }
   ]
  },
  {
   "id": "s-backend-db-flow-and-internals",
   "num": null,
   "title": "Backend DB flow and internals",
   "stars": 0,
   "chapter": "scaling-and-architecture",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Request path: "
      },
      {
       "type": "inlineCode",
       "value": "Client → Controller → Service → Repository/DAO → Connection Pool → Database"
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
             "value": "WAL (write-ahead log):"
            }
           ]
          },
          {
           "type": "text",
           "value": " records changes before data pages — supports crash recovery and replication."
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
             "value": "MVCC:"
            }
           ]
          },
          {
           "type": "text",
           "value": " multiple row versions let readers and writers work concurrently."
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
   "id": "s-backup-and-recovery",
   "num": null,
   "title": "Backup and recovery",
   "stars": 0,
   "chapter": "scaling-and-architecture",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Backup = a recoverable copy; recovery = restoring after failure. Know point-in-time recovery, replication, and disaster recovery."
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
         "value": "Strong one-line answer for \"how do you make a DB-backed app fast?\": use proper indexes, optimize queries and joins, avoid N+1, use pagination, connection pooling and caching, and scale with read replicas, partitioning or sharding when needed."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-postgresql-vs-mysql",
   "num": null,
   "title": "PostgreSQL vs MySQL",
   "stars": 0,
   "chapter": "postgresql-vs-mysql",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Both are RDBMSs supporting SQL, transactions, indexes, constraints, joins and foreign keys. PostgreSQL leans to advanced SQL, rich types/indexing and standards; MySQL is widely used in web apps (InnoDB engine)."
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
           "value": "Feature"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "PostgreSQL"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "MySQL (InnoDB)"
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
           "value": "Default isolation"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Read Committed"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Repeatable Read"
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
           "value": "Auto IDs"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "GENERATED AS IDENTITY"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "AUTO_INCREMENT"
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
           "value": "Boolean"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Native BOOLEAN"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Alias for TINYINT(1)"
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
           "value": "JSON"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "JSON + JSONB"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Native JSON"
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
           "value": "FULL OUTER JOIN"
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
           "value": "No direct syntax"
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
           "value": "Partial indexes"
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
           "value": "No general equivalent"
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
           "value": "Expression indexes"
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
           "value": "Functional indexes (modern)"
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
           "value": "Materialized views"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Native"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "None (use summary tables)"
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
           "value": "Upsert"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "ON CONFLICT"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "ON DUPLICATE KEY UPDATE"
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
           "value": "String concat"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "`"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": []
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "`"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "inlineCode",
           "value": "CONCAT()"
          },
          {
           "type": "text",
           "value": " (`"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": []
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "` means OR)"
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
           "value": "DDL"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Many statements transactional"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Many DDL statements implicitly commit"
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
         "value": "PostgreSQL extras:"
        }
       ]
      },
      {
       "type": "text",
       "value": " MVCC with "
      },
      {
       "type": "inlineCode",
       "value": "VACUUM"
      },
      {
       "type": "text",
       "value": "/"
      },
      {
       "type": "inlineCode",
       "value": "ANALYZE"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "RETURNING"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "ILIKE"
      },
      {
       "type": "text",
       "value": ", GIN indexes on JSONB, "
      },
      {
       "type": "inlineCode",
       "value": "EXPLAIN ANALYZE"
      },
      {
       "type": "text",
       "value": ".\n"
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "MySQL extras:"
        }
       ]
      },
      {
       "type": "text",
       "value": " InnoDB clustered primary key, secondary indexes carry the PK value, AUTO_INCREMENT values aren't reused after rollback."
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
         "value": "Remember: Know the concept first, then the database-specific behaviour — syntax is similar, not identical."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-where-vs-having",
   "num": null,
   "title": "WHERE vs HAVING",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "WHERE filters individual rows before grouping; HAVING filters groups after aggregation. WHERE can't use "
      },
      {
       "type": "inlineCode",
       "value": "COUNT(*)"
      },
      {
       "type": "text",
       "value": " directly."
      }
     ]
    }
   ]
  },
  {
   "id": "s-union-vs-union-all",
   "num": null,
   "title": "UNION vs UNION ALL",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "UNION removes duplicates (extra sorting/hashing work); UNION ALL keeps them and is cheaper. Use UNION ALL unless you truly need de-duplication."
      }
     ]
    }
   ]
  },
  {
   "id": "s-delete-vs-truncate-vs-drop-2",
   "num": null,
   "title": "DELETE vs TRUNCATE vs DROP",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "DELETE removes chosen rows (WHERE, slower); TRUNCATE clears all rows fast but keeps the table; DROP removes the table itself."
      }
     ]
    }
   ]
  },
  {
   "id": "s-inner-vs-left-join",
   "num": null,
   "title": "INNER vs LEFT JOIN",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "INNER keeps only matches; LEFT keeps all left rows with NULLs for missing right data. A right-table filter in WHERE turns a LEFT JOIN into an effective INNER JOIN — put it in ON to preserve unmatched rows."
      }
     ]
    }
   ]
  },
  {
   "id": "s-in-vs-exists-2",
   "num": null,
   "title": "IN vs EXISTS",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Both test membership; the optimizer may plan them alike. Prefer "
      },
      {
       "type": "inlineCode",
       "value": "NOT EXISTS"
      },
      {
       "type": "text",
       "value": " over "
      },
      {
       "type": "inlineCode",
       "value": "NOT IN"
      },
      {
       "type": "text",
       "value": " when NULLs are possible."
      }
     ]
    }
   ]
  },
  {
   "id": "s-primary-key-vs-unique",
   "num": null,
   "title": "Primary key vs UNIQUE",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Primary key identifies each row (one per table, never NULL, usually referenced by foreign keys); UNIQUE just prevents duplicates (many allowed per table, NULL handling varies by database)."
      }
     ]
    }
   ]
  },
  {
   "id": "s-primary-key-vs-foreign-key",
   "num": null,
   "title": "Primary key vs foreign key",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Primary key identifies a row within its own table; foreign key links a row to a key in another table and can repeat."
      }
     ]
    }
   ]
  },
  {
   "id": "s-normalization-vs-denormalization",
   "num": null,
   "title": "Normalization vs denormalization",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Normalize to remove duplication and keep data consistent; denormalize to speed reads by adding controlled redundancy."
      }
     ]
    }
   ]
  },
  {
   "id": "s-clustered-vs-non-clustered-index",
   "num": null,
   "title": "Clustered vs non-clustered index",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Clustered organizes the actual rows by the key (one per table); non-clustered is a separate lookup structure pointing to rows."
      }
     ]
    }
   ]
  },
  {
   "id": "s-correlated-vs-non-correlated-subquery",
   "num": null,
   "title": "Correlated vs non-correlated subquery",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Non-correlated runs once, independent of the outer query; correlated references outer values and may re-run per row."
      }
     ]
    }
   ]
  },
  {
   "id": "s-cte-vs-subquery",
   "num": null,
   "title": "CTE vs subquery",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A CTE ("
      },
      {
       "type": "inlineCode",
       "value": "WITH"
      },
      {
       "type": "text",
       "value": ") names a reusable query block for readability and recursion; a subquery is embedded inline. Neither is automatically faster."
      }
     ]
    }
   ]
  },
  {
   "id": "s-offset-vs-keyset-pagination",
   "num": null,
   "title": "OFFSET vs keyset pagination",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "inlineCode",
       "value": "LIMIT/OFFSET"
      },
      {
       "type": "text",
       "value": " is simple but slows down at large offsets; keyset ("
      },
      {
       "type": "inlineCode",
       "value": "WHERE id > last_seen_id"
      },
      {
       "type": "text",
       "value": ") stays fast on large, changing data."
      }
     ]
    }
   ]
  }
 ]
};
