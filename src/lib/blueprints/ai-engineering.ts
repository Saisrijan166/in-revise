import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const aiEngineering: Blueprint = {
  tagline:
    "How an LLM app answers — prompt, retrieval (RAG), tools and agents, with safety and ops.",
  legend: legendOf([
    "Request flow",
    "Prompt engineering",
    "Retrieval (RAG)",
    "Tools & agents",
    "Ops & safety",
  ]),
  alt:
    "A system map of AI engineering. Request flow: a user query is built into a prompt (system plus context " +
    "plus query), sent to the LLM (tokens to inference), which returns a response. Retrieval (RAG): " +
    "documents are chunked, embedded and stored in a vector DB; the query is embedded, the top-k matches " +
    "are retrieved as context and added to the prompt. Prompt engineering: the system prompt, few-shot " +
    "examples and chain-of-thought shape the prompt, and an output format (JSON) constrains the answer. " +
    "Tools and agents: the LLM can call functions and tools, run an agent loop (plan then act), use memory, " +
    "and connect over MCP. Ops and safety: responses are checked by evals and guardrails, retrieved context " +
    "guards against hallucination, and cost, latency and caching are managed.",
  baseline: "LLMs · RAG · agents",
  chart: `flowchart TD
  subgraph FLOW["1 . Request flow"]
    direction TB
    qry(["User query"]):::f
    qry --> prompt["Prompt: system + context + query"]:::c
    prompt --> llm["LLM: tokens -> inference"]:::f
    llm --> out(["Response"]):::f
  end

  subgraph RAG["2 . Retrieval (RAG)"]
    direction TB
    docs["Documents"]:::d
    docs -->|chunk| chk["Chunks"]:::d
    chk -->|embed| emb["Embeddings"]:::d
    emb --> vdb[("Vector DB")]:::d
    vdb -->|top-k| ctx["Retrieved context"]:::d
  end
  qry -.->|embed query| vdb
  ctx --> prompt

  subgraph PROMPT["3 . Prompt engineering"]
    direction LR
    sysp["System prompt"]:::c
    few["Few-shot examples"]:::c
    cot["Chain-of-thought"]:::c
    fmt["Output format / JSON"]:::c
  end
  sysp --> prompt
  few --> prompt
  cot -.-> prompt
  llm --> fmt

  subgraph AGENT["4 . Tools and agents"]
    direction LR
    tool["Function calling / tools"]:::x
    loop["Agent loop (plan-act)"]:::x
    mem["Memory"]:::x
    mcp["MCP"]:::x
  end
  llm -->|calls| tool
  tool --> loop
  loop -.-> llm
  tool -.-> mcp
  mem -.-> prompt

  subgraph OPS["5 . Ops and safety"]
    direction LR
    evl["Evals"]:::o
    grd["Guardrails"]:::o
    hal["Hallucination checks"]:::o
    cst["Cost + latency + cache"]:::o
  end
  out -.-> evl
  out -.-> grd
  ctx -.-> hal
  llm -.-> cst
${CLASSDEFS}`,
};
