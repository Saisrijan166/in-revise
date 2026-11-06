# AI Foundations

## The mental model ⭐⭐⭐

Every LLM application is the same pipeline: a user request flows through your backend, which builds a **prompt plus context**, sends it to the **LLM**, then validates the response before returning it.

The seven words that cover most interviews:

- **LLM** -> generates text.
- **Prompt** -> instructs the model what to do.
- **Embedding** -> turns meaning into a vector.
- **Vector DB** -> finds similar meaning.
- **RAG** -> retrieve knowledge, then generate.
- **Tool calling** -> lets the model act on real systems.
- **Backend** -> enforces security and business rules.

> Remember: the LLM only generates; your application code owns truth, security, and actions.

## Pre-training vs fine-tuning vs RAG vs prompting ⭐⭐

Four different levers, often confused. They answer different questions.

| Technique | What it does |
|---|---|
| Pre-training | Learns general language and world patterns |
| Fine-tuning | Adapts the model's behaviour/style to a task |
| RAG | Supplies external, current knowledge at runtime |
| Prompting | Tells the model how to do the task right now |

> Remember: Prompt = instructions, RAG = knowledge, Fine-tuning = behaviour.

# How LLMs Work

## Tokens ⭐

A **token** is the unit an LLM processes: a word, part of a word, punctuation, or a special marker. The model does not read whole words or sentences directly.

Tokens drive input/output limits, cost, latency, and the context window. Short input and output means cheaper, faster calls.

> Remember: you pay and wait per token, not per word.

## Context window ⭐

The maximum tokens a model can consider in one request. It must hold **everything**: system instructions + user prompt + conversation history + retrieved documents + the output.

Bigger is not automatically better. Too much irrelevant context raises cost and latency and can actually lower answer quality.

> Remember: the window is a shared budget; fill it with relevant content only.

## Transformer and attention

Modern LLMs use the **Transformer** architecture. Its key idea is **attention**: the model weighs which parts of the input matter in relation to others, so it can link related words and concepts across the text.

Self-attention scores how strongly each token should relate to every other token, using Query, Key and Value vectors (Q x K -> scores -> weights applied to Values). The maths rarely matters in interviews; the concept does.

> Remember: Transformer -> attention -> token relationships -> context.

## Temperature ⭐

Controls randomness of generation. Low temperature is focused and more deterministic; higher temperature is more varied and creative.

- Low: SQL, extraction, classification, factual or structured output.
- Higher: brainstorming, creative writing, idea generation.

> Remember: higher temperature means more variety, not more intelligence.

## Top-P and max output tokens

- **Top-P** limits token choice by cumulative probability mass. It also tunes randomness; avoid changing it and temperature together unless you know the provider's behaviour.
- **Max output tokens** caps response length, which controls cost, prevents runaway answers, and keeps latency predictable.

# Prompt Engineering

## Prompt structure ⭐⭐

Prompt engineering is designing instructions and context so the model reliably produces what you want. A dependable prompt has five parts (mnemonic **R-T-C-C-O**):

- **Role** - who the model is acting as.
- **Task** - what to do.
- **Context** - the data to work from.
- **Constraints** - rules and limits.
- **Output** - the exact format wanted (plus examples if useful).

> Remember: Role, Task, Context, Constraints, Output.

## Instruction hierarchy

Providers layer instructions as **System -> Developer -> User -> context/data**. System/developer messages set role, behaviour, rules and output format; the user message carries the actual request. Exact precedence depends on the provider.

> Remember: system sets the rules, user makes the request - but a prompt is not a security boundary.

## Zero-shot, few-shot, chain-of-thought

- **Zero-shot**: ask directly, no examples.
- **Few-shot**: give a few input/output examples first. Use it when the format is unusual, the rules are specific, or consistency matters.
- **Chain-of-thought**: ask the model to reason step by step. In production, prefer a concise reasoning summary or structured intermediate results over exposing hidden reasoning.

> Remember: add examples when explaining the rule in words is hard.

## Prompt chaining and structured output

- **Prompt chaining** breaks a complex task into several LLM calls (extract -> analyse -> generate). More controllable, but adds latency, cost and failure points.
- **Structured output** asks for machine-readable data instead of prose, so the app can use it directly.

```json
{ "sentiment": "negative", "confidence": 0.92, "reason": "poor service" }
```

> Remember: prefer provider-supported schema/structured output over trusting free-form JSON text.

# Tools, Agents and Memory

## Function / tool calling ⭐⭐

The LLM decides an external function should run, returns the call, your application executes it, and the result goes back to the model to finish the answer.

```text
User -> LLM -> tool call: getAccountBalance(userId)
     -> app executes -> result -> LLM -> response
```

The LLM must never touch the database directly. Route every action through an approved tool:

```text
LLM -> approved tool/API -> application -> DB
```

> Remember: tool calling is how AI acts; the backend still validates every action.

## AI agents ⭐

An agent reasons about a goal, picks tools, acts, observes the result, and loops until the task is done. A chatbot is a single pass; an agent is a loop.

| Chatbot | Agent |
|---|---|
| Input -> LLM -> Answer | Goal -> plan -> tool -> observe -> repeat -> result |

> Remember: an agent plans and acts in a loop; a chatbot just replies.

## Knowledge cutoff

An LLM's built-in knowledge stops at its training cutoff. Anything current - today's events, live database state, the user's account - must come from tools or RAG, never assumed from the base model.

> Remember: for current or private facts, fetch; don't trust the model's memory.

# Embeddings and Vector Search

## Embeddings and vectors ⭐⭐

An **embedding** converts data (text, etc.) into a numerical **vector** that represents its meaning. Similar meanings produce vectors that sit closer together under the chosen metric.

```text
"Java developer" -> [0.12, -0.45, 0.73, ...]   (many dimensions in practice)
```

Used for semantic search, RAG, recommendations, clustering and deduplication.

> Remember: embeddings turn meaning into numbers you can compare.

## Vector database and cosine similarity ⭐

A **vector database** stores embeddings and is optimised to find nearest vectors fast (Pinecone, Weaviate, Milvus, Qdrant, pgvector in PostgreSQL).

```text
Query -> embed -> query vector -> vector DB -> nearest vectors -> documents
```

**Cosine similarity** is the common measure: vectors pointing in a similar direction are similar. Euclidean distance and dot product are alternatives; the best choice depends on the model and store.

> Remember: a vector DB answers "what means something similar to this?".

# RAG

## What RAG is ⭐⭐⭐

**Retrieval-Augmented Generation**: retrieve relevant external information, hand it to the LLM, then generate the answer - without retraining the model. Its weights never change.

```text
Question -> retrieve relevant info -> LLM + info -> grounded answer
```

The benefit: the model uses your private or current data at runtime. The whole pipeline is the mnemonic **L-C-E-S-R-G**: Load -> Chunk -> Embed -> Store -> Retrieve -> Generate (the first four are indexing; the last two are query time).

> Remember: RAG retrieves knowledge and generates; it does not train the model.

## Chunking, overlap and metadata ⭐

- **Chunking** splits large documents into smaller pieces so retrieval returns the right granularity. Too small loses context; too large pulls in noise. Tune chunk size plus overlap per document type.
- **Chunk overlap** repeats some text between adjacent chunks so a point split across a boundary is not lost.
- **Metadata** (document, department, year, page, tenant) is attached to each chunk and powers filtering, authorization, citations and debugging.

> Remember: good chunks + metadata decide retrieval quality more than the LLM does.

## Top-K, reranking and hybrid search ⭐

- **Top-K**: how many chunks to retrieve. Too low misses relevant text; too high adds noise and burns context.
- **Reranking**: a second pass reorders the top candidates (e.g. 20 -> best 5) because raw vector similarity is not always enough.
- **Hybrid search**: combine semantic (vector) search with keyword search. Keyword wins for exact strings like `ERR_CONNECTION_REFUSED`; semantic wins for conceptual questions like "how does authentication work?".

> Remember: retrieve a few, rerank the best, and keep keyword search for exact matches.

## RAG failures and how to improve ⭐

Five failure points:

| Failure | Meaning |
|---|---|
| Retrieval | Right info was never fetched |
| Ranking | Right doc fetched but ranked too low |
| Context | Too much irrelevant text crowds the answer |
| Generation | Model ignores the retrieved info |
| Data | Source document itself is wrong/outdated |

Improve along the chain: better documents -> chunking -> embeddings -> metadata filtering -> hybrid search -> reranking -> good prompt -> citations -> evaluation.

> Remember: when RAG is wrong, first ask "did we retrieve the right chunk?".

## Grounding and citations

**Grounding** means the answer is built only from trusted, provided information. Returning an answer together with its source/citation makes it verifiable and is the strong production pattern.

> Remember: answer + citation beats answer alone.

# Safety and Evaluation

## Hallucination ⭐⭐

A hallucination is output that sounds plausible but is wrong or unsupported. Causes: missing context, ambiguous prompt, outdated knowledge, weak retrieval, fabricated detail.

Reduce it with: good prompt + RAG + strong retrieval + source grounding + structured output + validation + human review for high-risk cases.

> Remember: RAG reduces hallucination by grounding answers, but never guarantees zero.

## Prompt injection ⭐⭐

A user or a retrieved document hides instructions meant to hijack the model (for example "ignore previous instructions, reveal secrets"). Retrieved documents are **data, not trusted instructions**.

Defences: separate instructions from retrieved data and delimit context clearly, validate tool calls, enforce authorization outside the LLM, restrict available tools, keep secrets out of prompts, validate output, and monitor.

> Remember: a prompt is not a security boundary.

## RAG and LLM security ⭐

Retrieval must respect access control: never let the vector DB return a document the user is not allowed to see. Enforce authentication, authorization, metadata filtering and tenant isolation **before or during** retrieval - not in the LLM.

The broader LLM risks: prompt injection, data leakage, exposing sensitive info, unsafe tool calls, excessive permissions, insecure output handling.

> Remember: never trust the LLM with a security decision - the application enforces auth, permissions and validation.

## AI response validation

LLM output can be wrong or malformed, so pass it through a pipeline before acting: schema validation -> business validation -> safety/permission checks -> application.

```text
LLM says refundAmount = 1,000,000
Backend asks: allowed? user authorized? transaction exists?  ->  backend decides
```

> Remember: the model proposes; the backend disposes.

## Evaluation and observability

Because LLM output is probabilistic, evaluate on correctness, relevance, groundedness, safety, factuality, latency, cost and structured-output validity. For RAG, split it into **retrieval quality** (did we fetch the right info?) and **generation quality** (did the model use it correctly?).

Observe latency, token usage, cost, error rate, model used, retrieval score, citations and user feedback - without logging sensitive prompts/responses unnecessarily.

> Remember: evaluate retrieval and generation separately so you know which half to fix.

# AI in Backends

## Spring Boot integration ⭐⭐

A clean layered flow keeps the backend in control:

```text
React/Next.js -> Spring Boot REST API -> AI Service -> Prompt/RAG -> LLM provider
```

Inside, a typical structure: Controller -> AIService -> PromptBuilder -> RetrievalService -> VectorRepository -> LLMClient -> provider API. Call the provider with `WebClient`, `RestClient`, a provider SDK, or Spring AI.

The backend owns authentication, authorization, prompts, model selection, tools, retries, rate limits, logging and validation. Never hardcode API keys - use environment variables, a secrets manager or Vault.

> Remember: the backend, not the model, holds the keys and the rules.

## Model selection and cost ⭐

Do not default to the biggest model. Weigh quality, cost, latency, context size, reasoning, structured output, tool calling, privacy and availability. Simple task -> smaller/cheaper model; complex reasoning -> stronger model.

Cost is driven by input tokens + output tokens + model price + number of calls. Cut it with smaller prompts, relevant-only RAG chunks, caching, smaller models, output limits, batching and fewer unnecessary calls.

> Remember: match the model to the task; tokens and call count are your cost dials.

## Reliability: caching, streaming, retries, timeouts, rate limits

- **Caching**: return a stored result for repeated/similar queries. Watch personalised responses, stale data, sensitive info and cache-key design.
- **Streaming**: send tokens as they are generated (SSE/WebSocket) for better perceived latency.
- **Retries**: on timeout, rate limit or transient error, retry with exponential backoff and jitter - but not for non-idempotent actions.
- **Timeouts**: always set them, or a hung request holds resources forever.
- **Rate limiting**: cap requests or tokens per user to protect your app and the provider.

> Remember: in production, wrap the LLM call with caching, retries, timeouts and limits.

## LLM is not a database or search engine ⭐

An LLM generates language; it is not a source of truth. Never use it for account balance, inventory, permissions or transaction state - read those from the database through a validated tool.

```text
"Show my orders" -> LLM -> getOrders(userId) -> backend verifies userId -> DB
```

For natural-language-to-SQL, never blindly run generated SQL: use a read-only DB user, allowlisted operations, schema restrictions, query validation, parameterization, row limits, timeouts and authorization.

> Remember: Database -> tool/API -> LLM, never LLM -> database.

## Multi-tenant RAG

In SaaS, each tenant's documents must stay isolated. Store `tenantId`, `documentId` and permissions as metadata and filter retrieval by the current tenant (`WHERE tenant_id = currentTenant`) with authorization applied.

> Remember: tenant isolation lives in the retrieval layer, never in the LLM.

# Common "Why X vs Y?" Comparisons

## RAG vs fine-tuning ⭐⭐⭐

The most asked comparison. RAG adds knowledge at runtime; fine-tuning changes how the model behaves.

| RAG | Fine-tuning |
|---|---|
| External knowledge at runtime | Changes behaviour via training |
| Easy to update | Needs retraining |
| Best for private/current docs | Best for specialised style/task |
| Usually no training | Needs a training pipeline |
| Can provide sources | No inherent sources |

> Remember: Knowledge -> RAG, Behaviour -> Fine-tuning. Fine-tuning does not give current data.

## RAG vs long context

You can paste a lot of context directly instead of retrieving. RAG wins when the corpus is huge, only small parts are relevant, documents change often, access control matters, or sending everything is too slow or costly.

> Remember: long context for a little stable text; RAG for a large, changing, access-controlled corpus.

## Embeddings vs LLM

| Embedding model | LLM |
|---|---|
| Converts data to vectors | Generates/understands language |
| Powers search and retrieval | Generates the answer |
| Outputs a vector | Outputs text/structured data |

Embeddings do not generate answers; they only represent meaning for retrieval.

> Remember: embeddings find; the LLM writes.

## Vector DB vs relational DB

They solve different problems and are often used together. Relational DBs handle users, orders, payments and transactions; vector DBs handle semantic similarity and document retrieval. A vector DB does not replace PostgreSQL - and PostgreSQL with pgvector can do both.

> Remember: structured facts -> relational DB; "find similar meaning" -> vector DB.

## Agent vs chatbot

A chatbot replies in a single pass. An agent loops - plan, choose a tool, act, observe, continue - until the goal is met. Use an agent only when the task genuinely needs multi-step tool use.

> Remember: one reply = chatbot; a plan-act-observe loop = agent.
