// AUTO-GENERATED from reference/ai-engineering.cheatsheet.md — do not edit by hand.
// Regenerate with: node scripts/gen-cheatsheet.mjs ai-engineering
import type { CheatDoc } from "@/lib/cheatsheet/types";

export const aiEngineeringCheatsheet: CheatDoc = {
 "title": "AI Engineering",
 "tagline": "The whole topic on one page — LLMs, RAG and the rules to remember.",
 "chapters": [
  {
   "id": "ai-foundations",
   "title": "AI Foundations"
  },
  {
   "id": "how-llms-work",
   "title": "How LLMs Work"
  },
  {
   "id": "prompt-engineering",
   "title": "Prompt Engineering"
  },
  {
   "id": "tools-agents-and-memory",
   "title": "Tools, Agents and Memory"
  },
  {
   "id": "embeddings-and-vector-search",
   "title": "Embeddings and Vector Search"
  },
  {
   "id": "rag",
   "title": "RAG"
  },
  {
   "id": "safety-and-evaluation",
   "title": "Safety and Evaluation"
  },
  {
   "id": "ai-in-backends",
   "title": "AI in Backends"
  },
  {
   "id": "common-why-x-vs-y-comparisons",
   "title": "Common \"Why X vs Y?\" Comparisons"
  }
 ],
 "sections": [
  {
   "id": "s-the-mental-model",
   "num": null,
   "title": "The mental model",
   "stars": 3,
   "chapter": "ai-foundations",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Every LLM application is the same pipeline: a user request flows through your backend, which builds a "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "prompt plus context"
        }
       ]
      },
      {
       "type": "text",
       "value": ", sends it to the "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "LLM"
        }
       ]
      },
      {
       "type": "text",
       "value": ", then validates the response before returning it."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The seven words that cover most interviews:"
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
             "value": "LLM"
            }
           ]
          },
          {
           "type": "text",
           "value": " -> generates text."
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
             "value": "Prompt"
            }
           ]
          },
          {
           "type": "text",
           "value": " -> instructs the model what to do."
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
             "value": "Embedding"
            }
           ]
          },
          {
           "type": "text",
           "value": " -> turns meaning into a vector."
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
             "value": "Vector DB"
            }
           ]
          },
          {
           "type": "text",
           "value": " -> finds similar meaning."
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
             "value": "RAG"
            }
           ]
          },
          {
           "type": "text",
           "value": " -> retrieve knowledge, then generate."
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
             "value": "Tool calling"
            }
           ]
          },
          {
           "type": "text",
           "value": " -> lets the model act on real systems."
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
             "value": "Backend"
            }
           ]
          },
          {
           "type": "text",
           "value": " -> enforces security and business rules."
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
         "value": "Remember: the LLM only generates; your application code owns truth, security, and actions."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-pre-training-vs-fine-tuning-vs-rag-vs-prompting",
   "num": null,
   "title": "Pre-training vs fine-tuning vs RAG vs prompting",
   "stars": 2,
   "chapter": "ai-foundations",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Four different levers, often confused. They answer different questions."
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
           "value": "Technique"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "What it does"
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
           "value": "Pre-training"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Learns general language and world patterns"
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
           "value": "Fine-tuning"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Adapts the model's behaviour/style to a task"
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
           "value": "RAG"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Supplies external, current knowledge at runtime"
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
           "value": "Prompting"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Tells the model how to do the task right now"
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
         "value": "Remember: Prompt = instructions, RAG = knowledge, Fine-tuning = behaviour."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-tokens",
   "num": null,
   "title": "Tokens",
   "stars": 1,
   "chapter": "how-llms-work",
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
         "value": "token"
        }
       ]
      },
      {
       "type": "text",
       "value": " is the unit an LLM processes: a word, part of a word, punctuation, or a special marker. The model does not read whole words or sentences directly."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Tokens drive input/output limits, cost, latency, and the context window. Short input and output means cheaper, faster calls."
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
         "value": "Remember: you pay and wait per token, not per word."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-context-window",
   "num": null,
   "title": "Context window",
   "stars": 1,
   "chapter": "how-llms-work",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The maximum tokens a model can consider in one request. It must hold "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "everything"
        }
       ]
      },
      {
       "type": "text",
       "value": ": system instructions + user prompt + conversation history + retrieved documents + the output."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Bigger is not automatically better. Too much irrelevant context raises cost and latency and can actually lower answer quality."
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
         "value": "Remember: the window is a shared budget; fill it with relevant content only."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-transformer-and-attention",
   "num": null,
   "title": "Transformer and attention",
   "stars": 0,
   "chapter": "how-llms-work",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Modern LLMs use the "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Transformer"
        }
       ]
      },
      {
       "type": "text",
       "value": " architecture. Its key idea is "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "attention"
        }
       ]
      },
      {
       "type": "text",
       "value": ": the model weighs which parts of the input matter in relation to others, so it can link related words and concepts across the text."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Self-attention scores how strongly each token should relate to every other token, using Query, Key and Value vectors (Q x K -> scores -> weights applied to Values). The maths rarely matters in interviews; the concept does."
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
         "value": "Remember: Transformer -> attention -> token relationships -> context."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-temperature",
   "num": null,
   "title": "Temperature",
   "stars": 1,
   "chapter": "how-llms-work",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Controls randomness of generation. Low temperature is focused and more deterministic; higher temperature is more varied and creative."
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
           "value": "Low: SQL, extraction, classification, factual or structured output."
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
           "value": "Higher: brainstorming, creative writing, idea generation."
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
         "value": "Remember: higher temperature means more variety, not more intelligence."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-top-p-and-max-output-tokens",
   "num": null,
   "title": "Top-P and max output tokens",
   "stars": 0,
   "chapter": "how-llms-work",
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
             "value": "Top-P"
            }
           ]
          },
          {
           "type": "text",
           "value": " limits token choice by cumulative probability mass. It also tunes randomness; avoid changing it and temperature together unless you know the provider's behaviour."
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
             "value": "Max output tokens"
            }
           ]
          },
          {
           "type": "text",
           "value": " caps response length, which controls cost, prevents runaway answers, and keeps latency predictable."
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
   "id": "s-prompt-structure",
   "num": null,
   "title": "Prompt structure",
   "stars": 2,
   "chapter": "prompt-engineering",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Prompt engineering is designing instructions and context so the model reliably produces what you want. A dependable prompt has five parts (mnemonic "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "R-T-C-C-O"
        }
       ]
      },
      {
       "type": "text",
       "value": "):"
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
             "value": "Role"
            }
           ]
          },
          {
           "type": "text",
           "value": " - who the model is acting as."
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
             "value": "Task"
            }
           ]
          },
          {
           "type": "text",
           "value": " - what to do."
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
             "value": "Context"
            }
           ]
          },
          {
           "type": "text",
           "value": " - the data to work from."
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
             "value": "Constraints"
            }
           ]
          },
          {
           "type": "text",
           "value": " - rules and limits."
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
             "value": "Output"
            }
           ]
          },
          {
           "type": "text",
           "value": " - the exact format wanted (plus examples if useful)."
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
         "value": "Remember: Role, Task, Context, Constraints, Output."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-instruction-hierarchy",
   "num": null,
   "title": "Instruction hierarchy",
   "stars": 0,
   "chapter": "prompt-engineering",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Providers layer instructions as "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "System -> Developer -> User -> context/data"
        }
       ]
      },
      {
       "type": "text",
       "value": ". System/developer messages set role, behaviour, rules and output format; the user message carries the actual request. Exact precedence depends on the provider."
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
         "value": "Remember: system sets the rules, user makes the request - but a prompt is not a security boundary."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-zero-shot-few-shot-chain-of-thought",
   "num": null,
   "title": "Zero-shot, few-shot, chain-of-thought",
   "stars": 0,
   "chapter": "prompt-engineering",
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
             "value": "Zero-shot"
            }
           ]
          },
          {
           "type": "text",
           "value": ": ask directly, no examples."
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
             "value": "Few-shot"
            }
           ]
          },
          {
           "type": "text",
           "value": ": give a few input/output examples first. Use it when the format is unusual, the rules are specific, or consistency matters."
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
             "value": "Chain-of-thought"
            }
           ]
          },
          {
           "type": "text",
           "value": ": ask the model to reason step by step. In production, prefer a concise reasoning summary or structured intermediate results over exposing hidden reasoning."
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
         "value": "Remember: add examples when explaining the rule in words is hard."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-prompt-chaining-and-structured-output",
   "num": null,
   "title": "Prompt chaining and structured output",
   "stars": 0,
   "chapter": "prompt-engineering",
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
             "value": "Prompt chaining"
            }
           ]
          },
          {
           "type": "text",
           "value": " breaks a complex task into several LLM calls (extract -> analyse -> generate). More controllable, but adds latency, cost and failure points."
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
             "value": "Structured output"
            }
           ]
          },
          {
           "type": "text",
           "value": " asks for machine-readable data instead of prose, so the app can use it directly."
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "code",
     "value": "{ \"sentiment\": \"negative\", \"confidence\": 0.92, \"reason\": \"poor service\" }",
     "lang": "json"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: prefer provider-supported schema/structured output over trusting free-form JSON text."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-function-tool-calling",
   "num": null,
   "title": "Function / tool calling",
   "stars": 2,
   "chapter": "tools-agents-and-memory",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The LLM decides an external function should run, returns the call, your application executes it, and the result goes back to the model to finish the answer."
      }
     ]
    },
    {
     "type": "code",
     "value": "User -> LLM -> tool call: getAccountBalance(userId)\n     -> app executes -> result -> LLM -> response",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The LLM must never touch the database directly. Route every action through an approved tool:"
      }
     ]
    },
    {
     "type": "code",
     "value": "LLM -> approved tool/API -> application -> DB",
     "lang": "text"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: tool calling is how AI acts; the backend still validates every action."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-ai-agents",
   "num": null,
   "title": "AI agents",
   "stars": 1,
   "chapter": "tools-agents-and-memory",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "An agent reasons about a goal, picks tools, acts, observes the result, and loops until the task is done. A chatbot is a single pass; an agent is a loop."
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
           "value": "Chatbot"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Agent"
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
           "value": "Input -> LLM -> Answer"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Goal -> plan -> tool -> observe -> repeat -> result"
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
         "value": "Remember: an agent plans and acts in a loop; a chatbot just replies."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-knowledge-cutoff",
   "num": null,
   "title": "Knowledge cutoff",
   "stars": 0,
   "chapter": "tools-agents-and-memory",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "An LLM's built-in knowledge stops at its training cutoff. Anything current - today's events, live database state, the user's account - must come from tools or RAG, never assumed from the base model."
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
         "value": "Remember: for current or private facts, fetch; don't trust the model's memory."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-embeddings-and-vectors",
   "num": null,
   "title": "Embeddings and vectors",
   "stars": 2,
   "chapter": "embeddings-and-vector-search",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "An "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "embedding"
        }
       ]
      },
      {
       "type": "text",
       "value": " converts data (text, etc.) into a numerical "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "vector"
        }
       ]
      },
      {
       "type": "text",
       "value": " that represents its meaning. Similar meanings produce vectors that sit closer together under the chosen metric."
      }
     ]
    },
    {
     "type": "code",
     "value": "\"Java developer\" -> [0.12, -0.45, 0.73, ...]   (many dimensions in practice)",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Used for semantic search, RAG, recommendations, clustering and deduplication."
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
         "value": "Remember: embeddings turn meaning into numbers you can compare."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-vector-database-and-cosine-similarity",
   "num": null,
   "title": "Vector database and cosine similarity",
   "stars": 1,
   "chapter": "embeddings-and-vector-search",
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
         "value": "vector database"
        }
       ]
      },
      {
       "type": "text",
       "value": " stores embeddings and is optimised to find nearest vectors fast (Pinecone, Weaviate, Milvus, Qdrant, pgvector in PostgreSQL)."
      }
     ]
    },
    {
     "type": "code",
     "value": "Query -> embed -> query vector -> vector DB -> nearest vectors -> documents",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Cosine similarity"
        }
       ]
      },
      {
       "type": "text",
       "value": " is the common measure: vectors pointing in a similar direction are similar. Euclidean distance and dot product are alternatives; the best choice depends on the model and store."
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
         "value": "Remember: a vector DB answers \"what means something similar to this?\"."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-what-rag-is",
   "num": null,
   "title": "What RAG is",
   "stars": 3,
   "chapter": "rag",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Retrieval-Augmented Generation"
        }
       ]
      },
      {
       "type": "text",
       "value": ": retrieve relevant external information, hand it to the LLM, then generate the answer - without retraining the model. Its weights never change."
      }
     ]
    },
    {
     "type": "code",
     "value": "Question -> retrieve relevant info -> LLM + info -> grounded answer",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The benefit: the model uses your private or current data at runtime. The whole pipeline is the mnemonic "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "L-C-E-S-R-G"
        }
       ]
      },
      {
       "type": "text",
       "value": ": Load -> Chunk -> Embed -> Store -> Retrieve -> Generate (the first four are indexing; the last two are query time)."
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
         "value": "Remember: RAG retrieves knowledge and generates; it does not train the model."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-chunking-overlap-and-metadata",
   "num": null,
   "title": "Chunking, overlap and metadata",
   "stars": 1,
   "chapter": "rag",
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
             "value": "Chunking"
            }
           ]
          },
          {
           "type": "text",
           "value": " splits large documents into smaller pieces so retrieval returns the right granularity. Too small loses context; too large pulls in noise. Tune chunk size plus overlap per document type."
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
             "value": "Chunk overlap"
            }
           ]
          },
          {
           "type": "text",
           "value": " repeats some text between adjacent chunks so a point split across a boundary is not lost."
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
             "value": "Metadata"
            }
           ]
          },
          {
           "type": "text",
           "value": " (document, department, year, page, tenant) is attached to each chunk and powers filtering, authorization, citations and debugging."
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
         "value": "Remember: good chunks + metadata decide retrieval quality more than the LLM does."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-top-k-reranking-and-hybrid-search",
   "num": null,
   "title": "Top-K, reranking and hybrid search",
   "stars": 1,
   "chapter": "rag",
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
             "value": "Top-K"
            }
           ]
          },
          {
           "type": "text",
           "value": ": how many chunks to retrieve. Too low misses relevant text; too high adds noise and burns context."
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
             "value": "Reranking"
            }
           ]
          },
          {
           "type": "text",
           "value": ": a second pass reorders the top candidates (e.g. 20 -> best 5) because raw vector similarity is not always enough."
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
             "value": "Hybrid search"
            }
           ]
          },
          {
           "type": "text",
           "value": ": combine semantic (vector) search with keyword search. Keyword wins for exact strings like "
          },
          {
           "type": "inlineCode",
           "value": "ERR_CONNECTION_REFUSED"
          },
          {
           "type": "text",
           "value": "; semantic wins for conceptual questions like \"how does authentication work?\"."
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
         "value": "Remember: retrieve a few, rerank the best, and keep keyword search for exact matches."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-rag-failures-and-how-to-improve",
   "num": null,
   "title": "RAG failures and how to improve",
   "stars": 1,
   "chapter": "rag",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Five failure points:"
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
           "value": "Failure"
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
           "value": "Retrieval"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Right info was never fetched"
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
           "value": "Ranking"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Right doc fetched but ranked too low"
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
           "value": "Context"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Too much irrelevant text crowds the answer"
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
           "value": "Generation"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Model ignores the retrieved info"
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
           "value": "Data"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Source document itself is wrong/outdated"
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
       "value": "Improve along the chain: better documents -> chunking -> embeddings -> metadata filtering -> hybrid search -> reranking -> good prompt -> citations -> evaluation."
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
         "value": "Remember: when RAG is wrong, first ask \"did we retrieve the right chunk?\"."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-grounding-and-citations",
   "num": null,
   "title": "Grounding and citations",
   "stars": 0,
   "chapter": "rag",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "Grounding"
        }
       ]
      },
      {
       "type": "text",
       "value": " means the answer is built only from trusted, provided information. Returning an answer together with its source/citation makes it verifiable and is the strong production pattern."
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
         "value": "Remember: answer + citation beats answer alone."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-hallucination",
   "num": null,
   "title": "Hallucination",
   "stars": 2,
   "chapter": "safety-and-evaluation",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A hallucination is output that sounds plausible but is wrong or unsupported. Causes: missing context, ambiguous prompt, outdated knowledge, weak retrieval, fabricated detail."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Reduce it with: good prompt + RAG + strong retrieval + source grounding + structured output + validation + human review for high-risk cases."
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
         "value": "Remember: RAG reduces hallucination by grounding answers, but never guarantees zero."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-prompt-injection",
   "num": null,
   "title": "Prompt injection",
   "stars": 2,
   "chapter": "safety-and-evaluation",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A user or a retrieved document hides instructions meant to hijack the model (for example \"ignore previous instructions, reveal secrets\"). Retrieved documents are "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "data, not trusted instructions"
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
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Defences: separate instructions from retrieved data and delimit context clearly, validate tool calls, enforce authorization outside the LLM, restrict available tools, keep secrets out of prompts, validate output, and monitor."
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
         "value": "Remember: a prompt is not a security boundary."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-rag-and-llm-security",
   "num": null,
   "title": "RAG and LLM security",
   "stars": 1,
   "chapter": "safety-and-evaluation",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Retrieval must respect access control: never let the vector DB return a document the user is not allowed to see. Enforce authentication, authorization, metadata filtering and tenant isolation "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "before or during"
        }
       ]
      },
      {
       "type": "text",
       "value": " retrieval - not in the LLM."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The broader LLM risks: prompt injection, data leakage, exposing sensitive info, unsafe tool calls, excessive permissions, insecure output handling."
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
         "value": "Remember: never trust the LLM with a security decision - the application enforces auth, permissions and validation."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-ai-response-validation",
   "num": null,
   "title": "AI response validation",
   "stars": 0,
   "chapter": "safety-and-evaluation",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "LLM output can be wrong or malformed, so pass it through a pipeline before acting: schema validation -> business validation -> safety/permission checks -> application."
      }
     ]
    },
    {
     "type": "code",
     "value": "LLM says refundAmount = 1,000,000\nBackend asks: allowed? user authorized? transaction exists?  ->  backend decides",
     "lang": "text"
    },
    {
     "type": "blockquote",
     "children": [
      {
       "type": "paragraph",
       "children": [
        {
         "type": "text",
         "value": "Remember: the model proposes; the backend disposes."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-evaluation-and-observability",
   "num": null,
   "title": "Evaluation and observability",
   "stars": 0,
   "chapter": "safety-and-evaluation",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Because LLM output is probabilistic, evaluate on correctness, relevance, groundedness, safety, factuality, latency, cost and structured-output validity. For RAG, split it into "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "retrieval quality"
        }
       ]
      },
      {
       "type": "text",
       "value": " (did we fetch the right info?) and "
      },
      {
       "type": "strong",
       "children": [
        {
         "type": "text",
         "value": "generation quality"
        }
       ]
      },
      {
       "type": "text",
       "value": " (did the model use it correctly?)."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Observe latency, token usage, cost, error rate, model used, retrieval score, citations and user feedback - without logging sensitive prompts/responses unnecessarily."
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
         "value": "Remember: evaluate retrieval and generation separately so you know which half to fix."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-spring-boot-integration",
   "num": null,
   "title": "Spring Boot integration",
   "stars": 2,
   "chapter": "ai-in-backends",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A clean layered flow keeps the backend in control:"
      }
     ]
    },
    {
     "type": "code",
     "value": "React/Next.js -> Spring Boot REST API -> AI Service -> Prompt/RAG -> LLM provider",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Inside, a typical structure: Controller -> AIService -> PromptBuilder -> RetrievalService -> VectorRepository -> LLMClient -> provider API. Call the provider with "
      },
      {
       "type": "inlineCode",
       "value": "WebClient"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "RestClient"
      },
      {
       "type": "text",
       "value": ", a provider SDK, or Spring AI."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The backend owns authentication, authorization, prompts, model selection, tools, retries, rate limits, logging and validation. Never hardcode API keys - use environment variables, a secrets manager or Vault."
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
         "value": "Remember: the backend, not the model, holds the keys and the rules."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-model-selection-and-cost",
   "num": null,
   "title": "Model selection and cost",
   "stars": 1,
   "chapter": "ai-in-backends",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Do not default to the biggest model. Weigh quality, cost, latency, context size, reasoning, structured output, tool calling, privacy and availability. Simple task -> smaller/cheaper model; complex reasoning -> stronger model."
      }
     ]
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "Cost is driven by input tokens + output tokens + model price + number of calls. Cut it with smaller prompts, relevant-only RAG chunks, caching, smaller models, output limits, batching and fewer unnecessary calls."
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
         "value": "Remember: match the model to the task; tokens and call count are your cost dials."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-reliability-caching-streaming-retries-timeouts-rate-limits",
   "num": null,
   "title": "Reliability: caching, streaming, retries, timeouts, rate limits",
   "stars": 0,
   "chapter": "ai-in-backends",
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
             "value": "Caching"
            }
           ]
          },
          {
           "type": "text",
           "value": ": return a stored result for repeated/similar queries. Watch personalised responses, stale data, sensitive info and cache-key design."
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
             "value": "Streaming"
            }
           ]
          },
          {
           "type": "text",
           "value": ": send tokens as they are generated (SSE/WebSocket) for better perceived latency."
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
             "value": "Retries"
            }
           ]
          },
          {
           "type": "text",
           "value": ": on timeout, rate limit or transient error, retry with exponential backoff and jitter - but not for non-idempotent actions."
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
             "value": "Timeouts"
            }
           ]
          },
          {
           "type": "text",
           "value": ": always set them, or a hung request holds resources forever."
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
             "value": "Rate limiting"
            }
           ]
          },
          {
           "type": "text",
           "value": ": cap requests or tokens per user to protect your app and the provider."
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
         "value": "Remember: in production, wrap the LLM call with caching, retries, timeouts and limits."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-llm-is-not-a-database-or-search-engine",
   "num": null,
   "title": "LLM is not a database or search engine",
   "stars": 1,
   "chapter": "ai-in-backends",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "An LLM generates language; it is not a source of truth. Never use it for account balance, inventory, permissions or transaction state - read those from the database through a validated tool."
      }
     ]
    },
    {
     "type": "code",
     "value": "\"Show my orders\" -> LLM -> getOrders(userId) -> backend verifies userId -> DB",
     "lang": "text"
    },
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "For natural-language-to-SQL, never blindly run generated SQL: use a read-only DB user, allowlisted operations, schema restrictions, query validation, parameterization, row limits, timeouts and authorization."
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
         "value": "Remember: Database -> tool/API -> LLM, never LLM -> database."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-multi-tenant-rag",
   "num": null,
   "title": "Multi-tenant RAG",
   "stars": 0,
   "chapter": "ai-in-backends",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "In SaaS, each tenant's documents must stay isolated. Store "
      },
      {
       "type": "inlineCode",
       "value": "tenantId"
      },
      {
       "type": "text",
       "value": ", "
      },
      {
       "type": "inlineCode",
       "value": "documentId"
      },
      {
       "type": "text",
       "value": " and permissions as metadata and filter retrieval by the current tenant ("
      },
      {
       "type": "inlineCode",
       "value": "WHERE tenant_id = currentTenant"
      },
      {
       "type": "text",
       "value": ") with authorization applied."
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
         "value": "Remember: tenant isolation lives in the retrieval layer, never in the LLM."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-rag-vs-fine-tuning",
   "num": null,
   "title": "RAG vs fine-tuning",
   "stars": 3,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "The most asked comparison. RAG adds knowledge at runtime; fine-tuning changes how the model behaves."
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
           "value": "RAG"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Fine-tuning"
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
           "value": "External knowledge at runtime"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Changes behaviour via training"
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
           "value": "Easy to update"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Needs retraining"
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
           "value": "Best for private/current docs"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Best for specialised style/task"
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
           "value": "Usually no training"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Needs a training pipeline"
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
           "value": "Can provide sources"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "No inherent sources"
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
         "value": "Remember: Knowledge -> RAG, Behaviour -> Fine-tuning. Fine-tuning does not give current data."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-rag-vs-long-context",
   "num": null,
   "title": "RAG vs long context",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "You can paste a lot of context directly instead of retrieving. RAG wins when the corpus is huge, only small parts are relevant, documents change often, access control matters, or sending everything is too slow or costly."
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
         "value": "Remember: long context for a little stable text; RAG for a large, changing, access-controlled corpus."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-embeddings-vs-llm",
   "num": null,
   "title": "Embeddings vs LLM",
   "stars": 0,
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
           "value": "Embedding model"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "LLM"
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
           "value": "Converts data to vectors"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Generates/understands language"
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
           "value": "Powers search and retrieval"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Generates the answer"
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
           "value": "Outputs a vector"
          }
         ]
        },
        {
         "type": "tableCell",
         "children": [
          {
           "type": "text",
           "value": "Outputs text/structured data"
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
       "value": "Embeddings do not generate answers; they only represent meaning for retrieval."
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
         "value": "Remember: embeddings find; the LLM writes."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-vector-db-vs-relational-db",
   "num": null,
   "title": "Vector DB vs relational DB",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "They solve different problems and are often used together. Relational DBs handle users, orders, payments and transactions; vector DBs handle semantic similarity and document retrieval. A vector DB does not replace PostgreSQL - and PostgreSQL with pgvector can do both."
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
         "value": "Remember: structured facts -> relational DB; \"find similar meaning\" -> vector DB."
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "s-agent-vs-chatbot",
   "num": null,
   "title": "Agent vs chatbot",
   "stars": 0,
   "chapter": "common-why-x-vs-y-comparisons",
   "nodes": [
    {
     "type": "paragraph",
     "children": [
      {
       "type": "text",
       "value": "A chatbot replies in a single pass. An agent loops - plan, choose a tool, act, observe, continue - until the goal is met. Use an agent only when the task genuinely needs multi-step tool use."
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
         "value": "Remember: one reply = chatbot; a plan-act-observe loop = agent."
        }
       ]
      }
     ]
    }
   ]
  }
 ]
};
