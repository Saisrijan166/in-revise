# Coverage: AI Engineering
Reference: reference/ai-engineering.md  ·  Last updated: 21-10-2026

Every reference item (key list: the numbered sections, plus each question, pattern and "X vs Y" row inside them) appears in exactly
one of Mapped, Corrected or Dropped. A section whose parts went to different places has one row here (Corrected wins over
Mapped), and its other parts are listed under "Details placed elsewhere or cut". Sources for corrections are primary pages.

## Mapped
| Reference item (key + short title) | Landed in | Note |
|---|---|---|
| A0. Title and interview goal (part: what / why / how angle); A0. Title and interview goal (what, why, how, components, problems, solutions) | concept ai-ml-dl-genai (structure: Why it exists, How it works, Interview Qs); site template (Why / How / trap / Interview Qs); concept `ai-feature-playbook` | Only the "what / why / how" framing applies here; the rest of A0 is the whole site's shape. the goal is the template itself; no separate text |
| A1. Big picture: app flow and RAG flow | concept `ai-feature-playbook` (end-to-end Mermaid) | RAG half (A1.2) is owned by rag-pipeline |
| A1.1 (part: validation / post-processing step); A1.1. App flow: user, API, prompt + context, LLM, response, validation | concept `output-validation` (Steps); concepts `spring-ai-integration` (layer Mermaid), `ai-feature-playbook` (Steps) | The rest of the app flow belongs to other units |
| A1.2. RAG flow: documents to grounded answer | concept rag-pipeline (Mermaid); headline in what-is-rag (hook) | Metadata and filter steps added in the picture |
| A1.3 (part). One-line memory: LLM = generate; A1.3 (part: Prompt = Instruct). One-line memory; A1.3 (part). Embedding = convert meaning to vector; A1.3. One-line memory (part: RAG = Retrieve → Augment → Generate); A1.3. One-line memory: LLM generate, prompt instruct, embedding, vector DB, RAG, AI integration | concept what-is-an-llm (hook); concept `prompt-design` (hook); concept `embeddings` (hook); concept what-is-rag (points Retrieve / Augment / Generate); concept `ai-feature-playbook` (one-liner table) | other one-liners belong to other units Other A1.3 parts belong to other units Other one-liners owned by other units Other one-liners owned by other units "AI integration = connect AI with your app" merged into the "Backend enforces security and rules" row |
| A2. LLM: large language model (part: an LLM is generative AI); A2. LLM: large language model | concept ai-ml-dl-genai (How it works bullet, nesting diagram: LLMs inside generative AI; link to what-is-an-llm); concept what-is-an-llm (hook, sayIt, glossary large-language-model) | The LLM definition itself is owned by what-is-an-llm. "understand" softened to "predict the next token" |
| A2.1. Example model families (GPT, Claude, Gemini, Llama, Mistral) | concept what-is-an-llm (bullet, dated 21-10-2026, no ranking) |  |
| A2.2. Basic working (part: neural network / transformer inside the LLM); A2.2. Basic working: text, tokenisation, transformer, next-token probabilities, response | concept neural-networks (types point, tree node transformer-architecture, link to transformer-and-attention); concept what-is-an-llm (Steps) | Tokenisation and next-token steps belong to llm-fundamentals. sampling step added, linked to sampling-parameters |
| A2.3. Generates token by token | concept what-is-an-llm (points: autoregressive; glossary autoregressive) |  |
| A3. Token | concept tokens (points, table; glossary token) |  |
| A3.1. Why tokens matter: limits, cost, latency, context window | concept tokens (hook, Interview Q 1) |  |
| A3.2. Interview line: LLMs process tokens, not whole words | concept tokens (hook, trap) |  |
| A4. Context window | concept context-window (hook, sayIt, glossary) |  |
| A4.2. Large context is not automatically better; A4.2. Large context is not automatically better (part) | concept context-window (trap, Interview Q 2); concept retrieval-tuning (trap, point "Token budget") | Window itself owned by context-window |
| A5. Transformer | concept transformer-and-attention |  |
| A5.1. Attention: which parts of the input matter (example sentence) | concept transformer-and-attention (diagram) | example replaced by the running refund sentence |
| A5.2. Keyword chain: transformer, attention, context, token relationships | concept transformer-and-attention (hook, sayIt) |  |
| A6. Self-attention | concept transformer-and-attention (points; tree self-attention) |  |
| A6.1. Query, key, value; scores, weights, values; skip the maths | concept transformer-and-attention (diagram, Interview Q 1 "skip the formulas unless asked") |  |
| A7. Pre-training vs fine-tuning vs RAG (vs prompting); A7. Pre-training vs fine-tuning vs RAG vs prompting (part: which technique for what) | comparison pretraining-vs-fine-tuning; concept llm-training-stages; comparison rag-vs-fine-tuning-vs-long-context; concept rag-or-fine-tuning | RAG and prompting rows (A7.3, A7.4) are owned by other units; the full decision is rag-or-fine-tuning Pre-training owned by llm-training-stages |
| A7.1. Pre-training: learn general patterns from data (part); A7.1. Pre-training: learn general patterns | concepts how-models-learn (training loop), machine-learning-types (self-supervised point and trap); concept llm-training-stages (Steps, points) | Sharpened: pre-training is self-supervised next-token prediction on raw text (Ouyang et al. 2022). Not wrong in the reference, only vague. The pre-training vs fine-tuning pair belongs to llm-fundamentals. |
| A7.2. Fine-tuning: adapt behaviour to a task | concept llm-training-stages (points: app fine-tuning) |  |
| A7.3. RAG: external / current knowledge at runtime | concept rag-or-fine-tuning (point "Knowledge gap") |  |
| A7.4. Prompting: tell the model how to do the task | concept rag-or-fine-tuning (point "Prompt first") |  |
| A7.5 (part). Easy memory: fine-tuning = behaviour; A7.5. Easy memory: prompt = instructions, RAG = knowledge, fine-tuning = behaviour | concept llm-training-stages (sayIt, hook); concept rag-or-fine-tuning (hook, points) | prompt = instructions and RAG = knowledge parts owned elsewhere |
| A8. Hallucination | concept hallucination (hook, glossary) |  |
| A8.1. Example: invented leave policy | concept hallucination (Why it exists) | replaced by the running example: an invented refund rule |
| A8.2. Causes | concept hallucination (points: causes, why) | vague items "model limitations" and "fabricated reasoning/details" folded into the guessing explanation |
| A8.3. How to reduce hallucination (stack); A8.3. How to reduce hallucination (part: source grounding) | concept hallucination (diagram; each item links its owner concept); concept grounding-and-citations | Full list owned by hallucination |
| A8.4. Interview line: RAG reduces but does not remove hallucination | concept hallucination (trap, sayIt) |  |
| A9. Temperature | concept `sampling-parameters`; comparison `temperature-vs-top-p`; glossary `temperature` |  |
| A9.2. Typical uses of low and higher temperature | concept `sampling-parameters` (points) |  |
| A9.3. Trap: higher temperature is not more intelligence | concept `sampling-parameters` (trap) |  |
| A10. Top-p | concept `sampling-parameters`; comparison; glossary `top-p` | Definition made precise (smallest set reaching p), Holtzman 2019 |
| A11.1. Uses: cost control, length, predictable latency | concept `sampling-parameters` (point), tree `max-output-tokens` |  |
| A12. System / developer / user instructions | concept `message-roles` (roles table) |  |
| A12.2. What system/developer vs user messages carry | concept `message-roles` (points, table) |  |
| A13. Prompt engineering (definition) | concept `prompt-design` (sayIt, Interview Q); glossary `prompt-engineering` |  |
| A13.1. Prompt structure: role, task, context, constraints, output format, examples | concept `prompt-design` (How it works table; examples link to `zero-and-few-shot`); tree nodes `prompt-*-part` |  |
| A13.2. Prompt template example (Java error analysis) | concept `prompt-design` (Example) | Rewritten as the refund-assistant template with `{order}`, `{policy}` placeholders and tagged context; error-analysis wording not copied |
| A14. Zero-shot | concept `zero-and-few-shot`; comparison `zero-shot-vs-few-shot`; glossary `zero-shot` |  |
| A14.1. Zero-shot classification example | concept `zero-and-few-shot` (Example) | Positive/negative sentiment example replaced by the support-message classifier |
| A15. One-shot / few-shot | concept `zero-and-few-shot` (points); glossary `one-shot`, `few-shot` |  |
| A15.1. Few-shot example | concept `zero-and-few-shot` (Example) | Rewritten with refund-status / payment-failed / other labels in `<example>` tags |
| A15.2. When to use few-shot (unusual format, specific rules, hard to explain, consistency) | concept `zero-and-few-shot` (Interview Q, comparison row "Use when") |  |
| A16.1. Do not depend on hidden reasoning; ask for summary or structured steps | concept `chain-of-thought` (point "In an app", Example) | Backed by OpenAI (raw reasoning tokens not exposed, summary available) and Anthropic (asking for written-out reasoning may be declined) |
| A17. Prompt chaining | concept `prompt-chaining` |  |
| A17.1. Chain: extract, analyse, generate | concept `prompt-chaining` (Steps) | Rewritten as classify → extract → gate and fetch in code → draft |
| A17.2. Advantage (control) and costs (latency, cost, failure points) | concept `prompt-chaining` (points, Interview Q) | Anthropic frames it as trading latency for accuracy |
| A18. Structured output | concept `structured-output` |  |
| A18.1. Free text vs JSON fields example | concept `structured-output` (Why, Example response) | Sentiment example replaced with refund fields |
| A18.2. Prefer provider structured output / schema validation; A18.2 (part: schema validation) | concept `structured-output` (points, comparison); concept `output-validation` (Steps "Parse", points "Schema" link to `structured-output`) | Sharpened: JSON mode ≠ schema; refusals and truncation still possible (see Added) Enforcement owned by structured-output |
| A19. Function / tool calling | concept `tool-calling` (hook, points, How it works) |  |
| A19.2. LLM must not access the DB directly; approved tool/API | concept `tool-calling` (third bullet, links `ai-and-databases`, `llm-security`) |  |
| A20. AI agent | concept `ai-agents` (hook, points, sayIt) |  |
| A20.1. Agent capabilities and loop: goal, choose tool, execute, observe, next action | concept `ai-agents` (Mermaid loop, Example trace); tree `react-pattern`, `agent-stop-conditions` | Stop conditions added (the reference's loop has no exit) |
| A20.2. Agent vs normal chatbot (pair) | comparison `chatbot-vs-workflow-vs-agent` (embedded in `ai-agents`); trap of `ai-agents` | Pair "agent vs chatbot" widened to chatbot / workflow / agent |
| A21. Embeddings | concept `embeddings` (hook, points) |  |
| A21.1. Text to vector; similar meaning, closer vectors | concept `embeddings` (Example: refund / money not back / password) |  |
| A21.2. Uses: semantic search, RAG, recommendations, clustering, dedup | concept `embeddings` (points: Uses); tree `embedding-uses` | De-duplication not in the OpenAI use list; covered by "clustering / similarity", not named |
| A22. Vector | glossary `vector`; tree `vector` |  |
| A22.1. Example vector; real embeddings have many more dimensions | concept `embeddings` (Example note, points: Size 1,536); tree `embedding-dimension` | Made concrete with a dated, sourced number |
| A23. Vector database | concept `vector-databases` (hook, Interview Q 1) |  |
| A23.1. Examples: Pinecone, Weaviate, Milvus, Qdrant, pgvector | concept `vector-databases` (Interview Q 2); tree `dedicated-vector-stores`, `pgvector` | Named as dated examples, no ranking |
| A23.2. Basic operation: query, embed, nearest vectors, documents | concept `vector-databases` (SQL example: query embedding, `<=>`, LIMIT 5); concept `similarity-search` (How it works) | Full RAG query flow owned by rag-pipeline |
| A24. Cosine similarity | concept `similarity-search` (points, Interview Q) |  |
| A24.1. Same direction = high similarity | concept `similarity-search` (points, code example 1.0 / 0.0); tree `cosine-similarity` |  |
| A25. RAG | concept what-is-rag |  |
| A25.1. Retrieve, give to LLM, generate | concept what-is-rag (points, sayIt) |  |
| A25.2. Main benefit: app-specific knowledge without retraining | concept what-is-rag (point "No retraining") |  |
| A26. Complete RAG pipeline | concept rag-pipeline |  |
| A26.A. Indexing / ingestion: load, clean, chunk, embed, store with metadata | concept rag-pipeline (point, Mermaid, tree node ingestion-phase) |  |
| A27. Chunking | concept chunking |  |
| A27.1. Why chunk | concept chunking (Why it exists) | Backed by Azure AI Search chunking guide |
| A27.2. Too small loses context; too large adds noise | concept chunking (points) |  |
| A28. Chunk overlap | concept chunking (point, How it works bullet, Example) |  |
| A28.1. Overlap example; keeps context across boundaries | concept chunking (Example, Interview Q "Why overlap") | Re-drawn with the refund example |
| A29. Metadata | concept metadata-and-filtering |  |
| A29.1. Metadata JSON example | concept metadata-and-filtering (json block) | Re-made for the payments example with tenant_id, access_group |
| A29.2. Uses: filtering, authorisation, citations, debugging, quality | concept metadata-and-filtering (point "Uses") |  |
| A30. Top-K | concept retrieval-tuning |  |
| A30.1. Top-K too low misses; too high adds noise | concept retrieval-tuning (point Top-K) | Spring AI 2.0 default 4 added |
| A31. Reranking | concept `reranking` |  |
| A31.1. Flow: vector search top 20, reranker, best 5, LLM | concept `reranking` (Example flow 50 → top 5, labelled "an example, not a rule") | Sentence Transformers uses about 100 candidates; numbers are illustrative |
| A31.2. Why: vector similarity alone is not enough | concept `reranking` (Why it exists, points: Why better) |  |
| A32. Hybrid search | concept `hybrid-search` |  |
| A32.1. Keyword search wins on exact strings (error codes) | comparison `keyword-vs-semantic-search` (Good at: ERR_CONNECTION_REFUSED, ORD-42); concept `hybrid-search` (Interview Q 3, trap) |  |
| A32.2. Semantic search wins on conceptual questions | comparison `keyword-vs-semantic-search` (Good at: paraphrases) ; concept `hybrid-search` (points) | Example changed to the running refund example |
| A32.3. Hybrid: combined ranking | concept `hybrid-search` (RRF points, worked RRF example); tree `rrf`, `weighted-score-blend` | "Combined ranking" made concrete: RRF or weighted blending |
| A33. RAG vs fine-tuning | concept rag-or-fine-tuning; comparison rag-vs-fine-tuning-vs-long-context |  |
| A33.1. RAG vs fine-tuning table (5 rows) | comparison rag-vs-fine-tuning-vs-long-context (rows) | Third side (long context) added |
| A33.2. Memory trick: knowledge → RAG, behaviour → fine-tuning | concept rag-or-fine-tuning (hook, sayIt, Interview Q) |  |
| A34. RAG vs normal LLM | comparison rag-vs-plain-llm, embedded in what-is-rag |  |
| A34.1. Normal flow vs RAG flow (pair: plain LLM vs RAG) | comparison rag-vs-plain-llm (gist + rows) |  |
| A35. RAG does not mean training | concept what-is-rag (trap, Interview Q "Does RAG change the model?") | Tree note adds that the 2020 paper fine-tuned retriever + generator; app-level RAG does not train the LLM |
| A35.1. RAG puts documents into context; weights unchanged | concept what-is-rag (trap); comparison rag-vs-plain-llm (row "Model weights") |  |
| A36. RAG vs long context | concept rag-or-fine-tuning; comparison rag-vs-fine-tuning-vs-long-context |  |
| A36.1. When RAG beats sending everything (5 reasons) | concept rag-or-fine-tuning (How it works bullet, Interview Q) | All 5 reasons kept: huge corpus, small relevant part, frequent changes, access control, cost / latency |
| A37. RAG failure types | concept rag-failures |  |
| A37.1. Retrieval failure | concept rag-failures (table, point) |  |
| A37.2. Ranking failure | concept rag-failures (table, point) |  |
| A37.3. Context failure | concept rag-failures (table, point) |  |
| A37.4. Generation failure | concept rag-failures (table, point) |  |
| A37.5. Data failure | concept rag-failures (table, point) |  |
| A38. How to improve RAG; A38 (part: evaluation as the last improvement step) | concept rag-failures (Interview Q "How do you improve"); stage order in rag-pipeline; concept `ai-evaluation` (Steps "Fix and re-run") | Rest of A38 owned by retrieval-tuning / rag units |
| A38.1. Improvement ladder | concept rag-failures (Interview Q, table fixes link the owners) |  |
| A39. RAG security | concept metadata-and-filtering | Broader security owned by llm-security |
| A39.1. Problem: user must not get a confidential document | concept metadata-and-filtering (Why it exists, trap) | Mapped to OWASP LLM08:2025 |
| A39.3. Interview line: enforce authorisation before or during retrieval; A39.3 (part: authorisation not by the LLM) | concept metadata-and-filtering (sayIt, trap); concept `llm-security` (OWASP LLM08 row links to `metadata-and-filtering`) | Merged with A64.2 Retrieval filtering owned by metadata-and-filtering |
| A40. Prompt injection | concept `prompt-injection` (hook, points, sayIt) |  |
| A40.1. Injected instructions in user input or documents | comparison `direct-vs-indirect-prompt-injection`; concept `prompt-injection` (Example: tampered refund-policy PDF) | The reference's "reveal system secrets" sample was replaced by a refund-domain example |
| A40.2. Retrieved documents are data, not instructions | concept `prompt-injection` (How it works bullet 1, sayIt) |  |
| A40.3. Defences (8): separate instructions from data, delimit context, validate tool calls, authorisation outside the LLM, restrict tools, no secrets in prompts, output validation, monitoring | concept `prompt-injection` (points "Defence in depth", Interview Q 2); secrets in `llm-security` (points); output checks link to `output-validation` | All 8 kept; grouped as layers |
| A41. LLM security | concept `llm-security` |  |
| A41.2. Golden rule: never trust the LLM with security decisions; code enforces authentication, authorisation, permissions, validation, transactions | concept `llm-security` (hook, points "Golden rule", sayIt) |  |
| A42. AI integration in Spring Boot | concept `spring-ai-integration` | A42.2 (RAG flow inside Spring Boot) is owned by rag-pipeline |
| A42.1. Architecture: React/Next.js, Spring Boot API, AI service layer, provider | concept `spring-ai-integration` (Mermaid) |  |
| A42.2. RAG flow inside Spring Boot | concept rag-pipeline (Java snippet with QuestionAnswerAdvisor) |  |
| A43. Typical Java / Spring Boot structure | concept `spring-ai-integration` |  |
| A43.1. Layers: controller, AIService, PromptBuilder, RetrievalService, VectorRepository, LLMClient | concept `spring-ai-integration` (Mermaid, bullet "controllers stay thin") | class names folded into "AI service"; pgvector store shown as a node |
| A44. LLM API integration | concept `spring-ai-integration` |  |
| A44.1. HTTP POST to provider, JSON response | concept `spring-ai-integration` (Interview Q: RestClient option); tree `raw-http-client` |  |
| A44.2. Clients: WebClient, RestClient, provider SDK, Spring AI | concept `spring-ai-integration` (point, Interview Q "Spring AI, a provider SDK, or plain RestClient?"); tree `spring-ai-chatclient`, `provider-sdk`, `raw-http-client`; glossary `restclient`, `webclient`, `provider-sdk`, `spring-ai` | the official OpenAI and Anthropic Java SDKs named (added) |
| A45. AI integration layers | concept `spring-ai-integration` |  |
| A45.1. Layer stack: frontend to tools / DB | concept `spring-ai-integration` (Mermaid with tool → DB edge) |  |
| A45.2. What the backend controls | concept `spring-ai-integration` (point "Backend owns") |  |
| A46. Model selection | concept `model-selection-and-cost` |  |
| A46.1. Do not default to the biggest model; selection factors | concept `model-selection-and-cost` (trap, factors table) |  |
| A46.2. Simple rule: simple task small model, complex reasoning stronger model | concept `model-selection-and-cost` (point "Simple rule", sayIt); tree `model-routing` |  |
| A47. AI cost optimisation | concept `model-selection-and-cost` |  |
| A47.2. Cost levers (smaller prompts, relevant chunks, caching, smaller models, output limits, batching, fewer calls) | concept `model-selection-and-cost` (bullets, Interview Q "How do you reduce LLM cost?") | "batching" made concrete as provider batch APIs |
| A48. Caching AI responses | concept `model-selection-and-cost`; comparison `response-cache-vs-prompt-cache` |  |
| A48.1. Response cache flow and when it helps | comparison `response-cache-vs-prompt-cache` (side `response-cache`); tree `response-cache`, `semantic-caching` |  |
| A48.2. Careful: personalised, stale, sensitive data, cache key design | concept `model-selection-and-cost` (point kind minus, Interview Q "What can go wrong...") |  |
| A49. Streaming | concept `calling-llm-apis`; comparison `streaming-vs-blocking-response` |  |
| A49.1. Token streaming and perceived latency | comparison `streaming-vs-blocking-response` (rows "First text shown", "Total generation time"); Interview Q "Why stream?" |  |
| A49.2. Backend to frontend via SSE / WebSocket / streaming HTTP | concept `calling-llm-apis` (Java Flux endpoint, text/event-stream); glossary `server-sent-events` | SSE chosen: one-way server push matches token streaming; WebSocket not needed |
| A50. Retries | concept `calling-llm-apis` (points, Interview Q) |  |
| A50.1. Failure causes: timeout, rate limit, server error, network | concept `calling-llm-apis` (point "Retry") |  |
| A50.2. Retry + exponential backoff + jitter | concept `calling-llm-apis` (point, sayIt); glossary `exponential-backoff`, `jitter` | cap and Retry-After added |
| A50.3. Do not blindly retry non-idempotent actions | concept `calling-llm-apis` (trap); tree / glossary `idempotency-key` |  |
| A51. Rate limiting | concept `calling-llm-apis` |  |
| A51.1. Rate limiter in front of the AI API; requests / user / minute, tokens / user / day | concept `calling-llm-apis` (point "Per-user limits", Interview Q); tree `per-user-quota` | backed by OWASP LLM10 (rate limiting and user quotas) |
| A52. Timeout | concept `calling-llm-apis` (bullet, Defaults) |  |
| A52.1. Timeouts stop requests holding resources | concept `calling-llm-apis` (bullet); glossary `timeout-term` | connect vs request timeout added |
| A53. Observability | concept `ai-observability` |  |
| A53.1. Monitor latency, tokens, cost, errors, model, retrieval quality, feedback | concept `ai-observability` (How it works table) |  |
| A53.2. RAG extras: chunks, scores, reranking, sources | concept `ai-observability` (points "RAG extras", table row) | Reranking and citations shown as chunk ids and scores |
| A53.3. Avoid logging sensitive prompts / responses | concept `ai-observability` (trap, Defaults, Interview Q 2) | Backed by Spring AI defaults |
| A54. AI evaluation | concept `ai-evaluation` |  |
| A54.1. Probabilistic output; criteria list (correctness, relevance, groundedness, toxicity/safety, factuality, latency, cost, structured-output validity) | concept `ai-evaluation` (points "Why not unit tests", Steps "Define success") | Factuality merged into "correct" |
| A54.2. RAG evaluation: retrieval quality vs generation quality | concept `ai-evaluation` (points "RAG split", Example table, Interview Q "How do you evaluate a RAG system?") | Named with Ragas metrics |
| A55. Grounding | concept grounding-and-citations |  |
| A55.1. Grounding: answer from trusted supplied information | concept grounding-and-citations (hook, Interview Q) |  |
| A55.2. Answer + source / citation | concept grounding-and-citations (json example, Steps) | Trap added: a citation is not proof |
| A56. Knowledge cutoff | concept llm-limits (points, Interview Q 1; glossary knowledge-cutoff) |  |
| A56.1. Current/company/user data must come from tools or RAG | concept llm-limits (points, bullet) |  |
| A57. LLM is not a database | concept llm-limits (hook, trap); comparison llm-vs-database-vs-search-engine |  |
| A57.1. LLM generates vs DB stores structured data | comparison llm-vs-database-vs-search-engine (rows) |  |
| A57.2 (part). Never the source of truth for balance, inventory, permissions, transactions; A57.2 (part: DB → tool → LLM wiring) | concept llm-limits (points: source of truth); concept `ai-and-databases` (Mermaid "Better") | Database → tool → LLM wiring owned by ai-and-databases (linked) the "LLM is not a source of truth" principle is owned by llm-limits |
| A58. LLM is not a search engine | comparison llm-vs-database-vs-search-engine |  |
| A58.1. LLM generates vs search engine retrieves; RAG combines; A58.1. LLM generates vs search engine retrieves; RAG combines (part) | comparison llm-vs-database-vs-search-engine (gist, verdict); concept what-is-rag (confusedWith llm-vs-database-vs-search-engine) | Owner: llm-limits |
| A59. AI + database | concept `ai-and-databases` |  |
| A59.1. Bad: unrestricted DB access; better: approved tool + backend validation | concept `ai-and-databases` (Mermaid bad vs better); tree `unrestricted-db-access`, `approved-db-tool` |  |
| A60. SQL + LLM (text-to-SQL) | concept `ai-and-databases`; tree / glossary `text-to-sql` |  |
| A60.1. Natural language to SQL example ("customers who spent more than ₹50,000") | concept `ai-and-databases` (Example) | example replaced by the tested `order_stats` read-only role, which shows the safeguards |
| A60.2. Never blindly execute generated SQL; safeguards (8) | concept `ai-and-databases` (point "Text-to-SQL guard", Interview Q "How would you make text-to-SQL safe?", SQL block, Defaults); glossary `read-only-role`, `statement-timeout`, `allowlist` | all 8: read-only user, allowlisted operations, schema restrictions (views), validation, parameterisation, timeout, row limits, authorisation |
| A61. Embeddings vs LLM | comparison `embeddings-vs-llm` (embedded in `embeddings`) |  |
| A61.1. Embedding model vs LLM table (4 rows) | comparison `embeddings-vs-llm` (rows Input, Output, Job in RAG, When it runs, Example) |  |
| A62. Vector DB vs normal (relational) DB | comparison `vector-db-vs-relational-db` (embedded in `vector-databases`) |  |
| A62.1. Relational for orders/payments; vector DB for similarity | comparison `vector-db-vs-relational-db` (rows, example data) |  |
| A62.2. Use both: PostgreSQL + pgvector | concept `vector-databases` (points: pgvector, trap, Interview Q 2); comparison verdict |  |
| A63 (part). PostgreSQL + pgvector as the store; A63. RAG with PostgreSQL; A63 (part: one PostgreSQL for business data and vectors) | concept `vector-databases` (THE pgvector SQL block); concept rag-pipeline (pgvector in the picture and sayIt); concept `ai-and-databases` (bullet linking vector-databases); tree `shared-postgres-pgvector` | A63.1 / A63.2 flows owned by rag-pipeline SQL owned by vector-databases pgvector SQL owned by vector-databases |
| A63.1. Ingestion into PostgreSQL + pgvector | concept rag-pipeline (Mermaid, Java ingest method) |  |
| A63.2. Query: embed, pgvector search, prompt via Spring AI, LLM | concept rag-pipeline (Mermaid, Java ask method) |  |
| A64. Multi-tenant RAG | concept metadata-and-filtering |  |
| A64.2. Interview line: isolation at the data / retrieval layer | concept metadata-and-filtering (sayIt) | Merged with A39.3 |
| A65. AI response validation | concept `output-validation` |  |
| A65.1. Validation pipeline: schema, business, safety/permission | concept `output-validation` (Steps) | Fallback / human step added |
| A65.2. Example: absurd refund amount; backend decides (amount allowed? user authorised? transaction exists?) | concept `output-validation` (Example code with real output, Interview Q 1) | Written as ₹10,00,000 (Indian numbering) and tied to order 42 |
| A66. AI in a payment system: interview example | concept `ai-feature-playbook` (Mermaid, trap, Interview Q "In a payment app, should the LLM decide refunds?") |  |
| A66.1. "Why did my payment fail?" architecture | concept `ai-feature-playbook` (Mermaid end-to-end; Interview Q) |  |
| A66.2 (part: refundPayment as a tool; LLM explains but does not decide refunds); A66.2. LLM explains but does not decide refunds; tool, backend authorisation, payment service | concept `ai-agents` (points "Guardrails", Example last line, Interview Q 2); concept `tool-calling` (Interview Q 2, bullet 2); concept `ai-feature-playbook` (trap, point "Backend decides", Interview Q) | Payment walkthrough owned by `ai-feature-playbook` |
| A67. AI chatbot architecture (part: AI service uses vector DB + LLM); A67. AI chatbot architecture | concept rag-pipeline (Java service class); picture owned by ai-feature-playbook; concept `ai-feature-playbook` (single end-to-end Mermaid) | merged with A77.MAP; no separate chatbot picture |
| A67.1. Chatbot architecture: frontend, Spring Boot, AI service, vector DB + LLM | concept `ai-feature-playbook` (Mermaid) |  |
| A68. Complete RAG architecture; A68 (part: full picture link) | concept rag-pipeline (Mermaid); concept `ai-feature-playbook` (Steps link to rag-pipeline) | pipeline picture owned by rag-pipeline |
| A68.1. Full RAG architecture in one picture | concept rag-pipeline (Mermaid, 8 nodes) |  |
| A69. RAG memory trick | concept rag-pipeline (point L-C-E-S-R-G) |  |
| A69.1. Mnemonic L-C-E-S-R-G | concept rag-pipeline (point) | Natural, kept |
| A70. Prompt memory trick | concept `prompt-design` (hook) |  |
| A70.1. Mnemonic R-T-C-C-O | concept `prompt-design` (hook) | Natural mnemonic kept as one line |
| A71. AI application memory trick (M-P-R-V) | concept `ai-feature-playbook` (point "M-P-R-V"); tree `mprv-model`, `mprv-prompt`, `mprv-retrieval`, `mprv-validation` | mnemonic is natural and true; kept |
| A71.1. Mnemonic M-P-R-V: model, prompt, retrieval, validation | concept `ai-feature-playbook` (point, tree children) |  |
| A71.2 (part: caching and cost control). Production additions | concept `model-selection-and-cost`; concept `ai-feature-playbook` (point "Add-ons") | security, monitoring, rate limiting parts link to their owners |
| A72. What an LLM can / cannot be trusted to do | concept llm-limits (table) |  |
| A72.1. Can: generate, summarise, classify, extract, translate, code, reason over context, call tools, structured output; A72.1 (part: structured output when constrained). Can list; A72.1 (part: call tools when supported) | concept llm-limits (table, left column); concept `structured-output` (points); concept `tool-calling` (Why it exists, trap) | Other A72.1 parts belong to `llm-limits` Rest of A72.1 owned by `llm-limits` |
| A72.2. Cannot be trusted to: facts, authorisation, determinism, private data, arbitrary actions, replace DB or business logic; A72.2 (part: cannot replace business logic / enforce authorisation) | concept llm-limits (table, right column; Interview Q 2 on business logic); concept `output-validation` (points "Business rules"); `llm-security` (golden rule) | Other A72.2 parts (facts, determinism, private data, replace DB) owned by llm-limits |
| A73 (part: confusion list) | concept `ai-feature-playbook` (no list); each confusion is a trap in its owning concept | A73.8 lands here in `ai-and-databases` |
| A73.1. Confusion: RAG trains the model | concept what-is-rag (trap) |  |
| A73.3. Confusion: embeddings generate answers | concept `embeddings` (trap) |  |
| A73.4. Confusion: vector DB replaces PostgreSQL | concept `vector-databases` (trap) |  |
| A73.5. Confusion: higher temperature = better answer | concept `sampling-parameters` (trap) |  |
| A73.6 (part). Why more context can hurt; A73.6. Confusion: more RAG chunks = better | concept context-window (trap: context rot, lost in the middle); concept retrieval-tuning (trap) | the "more RAG chunks" trap itself is owned by retrieval-tuning |
| A73.7. Confusion: RAG eliminates hallucination | concept hallucination (trap) |  |
| A73.8 (part). An LLM is not your database; A73.8 (part: security angle). Confusion: LLM should directly access the DB; A73.8. Confusion: LLM should directly access the DB | concept llm-limits (trap); concept `llm-security` (trap, Interview Q "Should the LLM access the database directly?"); concept `ai-and-databases` (trap, Interview Q "Should an LLM query the database directly?") | "LLM should access the DB directly" is owned by ai-and-databases Text-to-SQL detail is owned by ai-and-databases |
| A73.9. Confusion: the prompt is a security boundary | concept `prompt-injection` (trap) |  |
| A74. Most important terms to remember | glossary (all units) |  |
| A74.1 (part). LLM term checklist: token, context window, transformer, attention, hallucination; A74.1 (part: system prompt). Term list: LLM; A74.1 (part: few-shot). Term list: LLM; A74.1 (part: structured output). Term list: LLM; A74.1 (parts: temperature, top-p, max tokens). Term list: LLM; A74.1 (part: tool calling); A74.1 (part: agent); A74.1. Term list: LLM (13 terms) | glossary token, context-window-term, transformer, attention, hallucination-term; glossary `system-message`; concept `message-roles`; glossary `few-shot`; glossary `structured-output-term`; glossary `temperature`, `top-p`, `max-output-tokens`; glossary `tool-calling-term`; glossary `ai-agent-term`; glossary of the owning units (llm-fundamentals, prompting, tools-agents) | temperature, top-p, max tokens, system prompt, few-shot, structured output, tool calling, agent are owned by other units Other A74.1 terms belong to other units Other A74.1 terms owned by other units none owned here |
| A74.2 (part). Terms: embedding, vector, vector DB, similarity search, cosine similarity, reranking, hybrid search; A74.2. Term list: RAG (parts: chunk, chunk overlap, metadata, top-K, grounding, citation); A74.2. Term list: RAG (13 terms) | glossary `embedding-term`, `vector`, `vector-database`, `similarity-search-term`, `cosine-similarity`, `reranking-term`, `hybrid-search-term`; glossary chunk, chunk-overlap, metadata-term, top-k, grounding, citation; glossary of the owning units (vector-search, rag) | Chunk, overlap, metadata, top-K, grounding, citation owned by the RAG unit Embedding, vector, vector DB, similarity search, cosine, reranking, hybrid search belong to vector-search none owned here |
| A74.3 (part: prompt injection). Term list; A74.3 (part: authorisation, data privacy). Term list; A74.3 (part: evaluation). Term list; A74.3 (part: observability). Term list; A74.3. Term list: production AI (12 terms) | glossary `prompt-injection-term`; concept `llm-security` (points); glossary `least-privilege`, `pii`, `data-redaction`; concept `ai-evaluation`; glossary `eval`; concept `ai-observability`; glossary `observability`; glossary here: API integration (`spring-ai`, `provider-sdk`), streaming (`streaming-llm`), caching (`response-caching`, `prompt-caching`, `semantic-caching`), rate limiting (`rate-limiting`), retry (`exponential-backoff`, `jitter`, `retry-after`), timeout (`timeout-term`), cost optimisation (`model-routing`, `batch-api`) | Other A74.3 parts (API integration, streaming, caching, rate limiting, retry, timeout, cost optimisation) belong to ai-in-production units observability, evaluation, prompt injection, authorisation, data privacy are owned by safety-evaluation |
| A75. 30-second answer: how would you build an AI feature? | concept `ai-feature-playbook` (Steps, sayIt, Interview Q "How would you build an AI feature?") |  |
| A76 (part: question picker) | concept `ai-feature-playbook` ("Asked or seen" table) | A76.Q1-Q8, Q10 point to their owners; Q9 answered in spring-ai-integration |
| A76.Q1. Q: What is an LLM? | concept what-is-an-llm (Interview Q 1, sayIt) | rephrased |
| A76.Q2. Q: What is prompt engineering? | concept `prompt-design` (Interview Q) |  |
| A76.Q3. Q: What is RAG? | concept what-is-rag (Interview Q) |  |
| A76.Q4. Q: RAG vs fine-tuning? | concept rag-or-fine-tuning (Interview Q, sayIt) |  |
| A76.Q5. Q: What are embeddings? | concept `embeddings` (Interview Q 1, sayIt) |  |
| A76.Q6. Q: Why a vector database? | concept `vector-databases` (Interview Q 1) |  |
| A76.Q7. Q: How do you reduce hallucinations? | concept hallucination (Interview Q 1) |  |
| A76.Q8. Q: How do you secure an LLM application? | concept `llm-security` (sayIt, Interview Q 1) |  |
| A76.Q9. Q: How do you integrate an LLM into Spring Boot? | concept `spring-ai-integration` (Interview Q) |  |
| A76.Q10. Q: How do you build RAG? | concept rag-pipeline (Interview Q) |  |
| A77. Final one-screen revision | concept `ai-feature-playbook` |  |
| A77.MAP. One-screen map: prompt and RAG branches into LLM, validation, response or tool / API | concept `ai-feature-playbook` (end-to-end Mermaid) | one picture replaces A67, A68 and A77.MAP maps |
| A77.1. One-liner: LLM generates; A77.1. One-liner: LLM generates | concept what-is-an-llm (hook); concept `ai-feature-playbook` (one-liner table) |  |
| A77.2. One-liner: prompt instructs; A77.2. One-liner: prompt instructs | concept `prompt-design` (hook, Why); concept `ai-feature-playbook` (one-liner table) |  |
| A77.3. One-liner: embedding represents meaning; A77.3. One-liner: embedding represents meaning | concept `embeddings` (hook); concept `ai-feature-playbook` (one-liner table) |  |
| A77.4. One-liner: vector DB retrieves similar meaning; A77.4. One-liner: vector DB retrieves similar meaning | concept `vector-databases` (hook); concept `ai-feature-playbook` (one-liner table) |  |
| A77.5. One-liner: RAG retrieves knowledge + generates; A77.5. One-liner: RAG retrieves knowledge + generates | concept what-is-rag (hook); concept `ai-feature-playbook` (one-liner table) |  |
| A77.6. One-liner: tool calling lets AI interact with systems; A77.6. One-liner: tool calling lets AI interact with systems | concept `tool-calling` (Why it exists, hook); concept `ai-feature-playbook` (one-liner table) |  |
| A77.7. One-liner: backend enforces security / business rules; A77.7. One-liner: backend enforces security / business rules | concept `llm-security` (hook "The model suggests; your code decides"); concept `ai-feature-playbook` (one-liner table, point "Backend decides") |  |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| A4.1. What shares the window: system, prompt, history, retrieved docs, output | Incomplete: leaves out tool definitions, tool results and reasoning / thinking tokens, which also count | Diagram lists system prompt, tool definitions, history, chunks, question, output + reasoning tokens | https://platform.claude.com/docs/en/build-with-claude/context-windows ; https://developers.openai.com/api/docs/guides/reasoning |
| A9.1. Low vs high temperature | "Low temperature → deterministic" | Lower is more focused; even 0 is not fully deterministic (Anthropic). Ranges differ: OpenAI 0 to 2, Anthropic 0 to 1 | https://platform.claude.com/docs/en/api/messages/create ; https://developers.openai.com/api/reference/resources/responses/methods/create |
| A10.1. Temperature vs top-p; avoid changing both | Vague ("unless you understand the provider's behaviour") and outdated: newer models may reject the settings | OpenAI: alter temperature or top_p, not both. Anthropic: temperature, top_p and top_k deprecated for models after Opus 4.6 (only 1.0 / ≥ 0.99 accepted); Spring AI notes some OpenAI reasoning models reject temperature | https://developers.openai.com/api/reference/resources/responses/methods/create ; https://platform.claude.com/docs/en/api/messages/create ; https://docs.spring.io/spring-ai/reference/api/chat/openai-chat.html |
| A11. Max output tokens | Only "limits output length"; missed that the reply is cut off and that reasoning tokens count toward the cap | Cap on generated tokens including reasoning tokens (OpenAI); when hit, status incomplete / `max_output_tokens` (OpenAI) or `stop_reason: max_tokens` (Anthropic) | https://developers.openai.com/api/reference/resources/responses/methods/create ; https://platform.claude.com/docs/en/api/messages/create |
| A12.1. Instruction hierarchy: system, developer, user, data | Presented one generic ladder "system → developer → user → context/data", as if data were a low-ranked instruction source | OpenAI Model Spec: root > system > developer > user > guideline; quoted text, tool output and files carry no authority (information, not instructions). Anthropic has no developer role: a top-level `system` parameter, then user / assistant turns | https://model-spec.openai.com/2026-08-18.html ; https://platform.claude.com/docs/en/api/messages/create |
| A16. Chain-of-thought | Framed only as a prompt trick; silent on reasoning models, where "think step by step" is unnecessary and can hurt | Reasoning models think internally; set `reasoning.effort` (OpenAI) or adaptive thinking with `effort` (Anthropic; `budget_tokens` deprecated, rejected on Claude 4.7 and later); manual CoT only when thinking is off | https://developers.openai.com/api/docs/guides/reasoning-best-practices ; https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices |
| A19.1. Example call getAccountBalance(userId) | The model supplies the user id as a tool argument, so a manipulated model could ask for another user's data | Identity comes from the server session (Spring AI ToolContext, never sent to the model); the model supplies only orderId, and the backend checks ownership | https://docs.spring.io/spring-ai/reference/api/tools.html ; https://developers.openai.com/api/docs/guides/function-calling ("don't make the model fill arguments you already know") |
| A24.2. Other metrics (Euclidean, dot product); metric depends on the model | "The best metric depends on the setup" overstates the choice: for unit-length embeddings (OpenAI's are normalised to length 1) cosine, dot product and Euclidean give the same ranking | Points, trap and comparison verdict: use the model's recommended metric; on normalised vectors all three rank the same (pgvector operators `<=>`, `<#>`, `<->` in the comparison) | https://developers.openai.com/api/docs/guides/embeddings ; https://developers.google.com/machine-learning/clustering/dnn-clustering/supervised-similarity |
| A26.B. Query time: "Top-K chunks → Optional filtering/reranking" | Shows filtering as optional and after top-K. Access filters applied after an ANN search can leak or leave fewer than K rows | Tenant / permission filters are mandatory and applied in the search; only reranking comes after (rag-pipeline picture, metadata-and-filtering) | https://github.com/pgvector/pgvector ; https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/ |
| A27.3. "Common approach: chunk size + overlap; exact size depends" | Loose: implies overlap is always configured and gives no starting numbers | Documented defaults: OpenAI file search 800 / 400 tokens (overlap ≤ half), Spring AI 2.0 TokenTextSplitter 800 tokens with no overlap setting; tune with evals | https://developers.openai.com/api/docs/guides/retrieval ; https://docs.spring.io/spring-ai/reference/api/etl-pipeline.html |
| A39.2. Controls: authn, authz, metadata filters, tenant isolation, access-controlled retrieval | Lists controls without the catch that a filtered HNSW search returns fewer rows | Added post-filter vs pre-filter, pgvector 0.8+ iterative index scans, partition / table per tenant, row-level security | https://github.com/pgvector/pgvector ; https://www.postgresql.org/docs/18/ddl-rowsecurity.html |
| A41.1. Risk list: injection, leakage, sensitive info, unsafe tool calls, excessive permissions, insecure output handling | Ad-hoc list using the 2023 OWASP name "Insecure Output Handling"; missing the 2025 risks | Mapped onto the OWASP Top 10 for LLM Applications 2025 table (LLM05 is now "Improper Output Handling"; unsafe tool calls and excessive permissions = LLM06 Excessive Agency; leakage = LLM02 / LLM07) | https://genai.owasp.org/llm-top-10/ |
| A43.2. POST /api/ask flow | Shown in a ```java fence although it is not Java (a pseudo-flow) | Shown as a Mermaid flow plus a real, compiled Spring AI 2.0 `ChatClient` service | https://docs.spring.io/spring-ai/reference/api/chatclient.html |
| A44.3. Never hardcode API keys; env vars, secrets manager, Vault | Lists environment variables as equal to a secrets manager; does not say the key must never reach client code | Server-side only; a key management service / secrets manager is preferred, an environment variable is acceptable; never in code, Git, logs or the browser (trap: do not call the provider from React) | https://developers.openai.com/api/reference/overview ; https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html (env vars "may be included in logs or system dumps") |
| A47.1. Cost = input tokens + output tokens + price + number of calls | Adds price and call count to token counts (a "+" formula); input and output tokens are priced separately | (input tokens × input price + output tokens × output price) × number of calls | https://platform.claude.com/docs/en/about-claude/pricing |
| A59.2. Example "Show my orders": getOrders(userId), backend verifies userId | Lets the model supply the user id and then checks it; the identity should never come from the model | The tool takes the user id from the authenticated session (Spring AI `ToolContext`, not sent to the model); the backend runs the tool in the user's context | https://docs.spring.io/spring-ai/reference/api/tools.html ; https://genai.owasp.org/llmrisk/llm062025-excessive-agency/ |
| A64.1. Tenant isolation: tenantId metadata, WHERE tenant_id filter | Same: a plain WHERE on an ANN index is post-filtering; the tenant id must come from the login | Tenant id from the authenticated session; per-request Spring AI filter replaces the default one, so repeat every condition | https://github.com/pgvector/pgvector ; https://github.com/spring-projects/spring-ai/blob/v2.0.1/advisors/spring-ai-vector-store-advisor/src/main/java/org/springframework/ai/chat/client/advisor/vectorstore/QuestionAnswerAdvisor.java |
| A73.2. Confusion: fine-tuning gives current DB knowledge ("fine-tuning changes model parameters") | Overstated: with LoRA / PEFT the base weights stay frozen and only small added weights are trained; also provider fine-tuning availability changes (OpenAI is winding down its fine-tuning platform, 21-10-2026) | Trap: fine-tuning shapes behaviour and goes stale; LoRA freezes base weights; dated note on OpenAI's platform | https://arxiv.org/abs/2106.09685 ; https://developers.openai.com/api/docs/guides/model-optimization |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| AI contains ML contains deep learning contains GenAI; rules vs learned | concept ai-ml-dl-genai + comparison ai-vs-ml-vs-dl-vs-genai | Classic opening interview question; reference has no foundations section. |
| Discriminative vs generative model | ai-ml-dl-genai (points, Interview Q), tree node discriminative-model | Commonly asked; explains why classic ML still matters. |
| Foundation model | ai-ml-dl-genai (point, Interview Q), tree node, glossary | Term interviewers use for LLMs. |
| Modalities and multimodal models | tree nodes under ai-ml-dl-genai, glossary | Needed vocabulary for multimodal LLM questions. |
| Supervised / unsupervised / reinforcement / self-supervised learning; classification, regression, clustering | concept machine-learning-types + comparison | Standard ML interview question; self-supervised explains LLM pre-training. |
| Training loop (loss, gradient descent, epoch), parameters, train / validation / test split, overfitting / underfitting, training vs inference | concept how-models-learn + comparison training-vs-inference | Asked of every AI-facing developer; the inference trap ("the model learns from my chat") is common. |
| Neural network structure, activation function / ReLU, deep = many hidden layers, GPUs, CNN / RNN / feed-forward / transformer | concept neural-networks | Needed to explain what sits inside an LLM without maths. |
| Autoregressive generation loop with a stop condition | what-is-an-llm (Steps; glossary autoregressive) | core interview explanation |
| Base vs instruction-tuned vs reasoning models | comparison base-vs-instruct-vs-reasoning-model; tree nodes | commonly asked; reasoning models now mainstream |
| Multimodal and open-weight models | tree nodes multimodal-model, open-weight-model; glossary | model choice questions |
| Sub-word tokenisation (BPE), tokenizer | tokens; tree; glossary | explains why tokens are not words |
| Rough 4 characters / 0.75 words per token (English) | tokens (points, default) | interview staple; OpenAI docs |
| Other scripts need more tokens (measured Hindi example) | tokens (points, table) | relevant for Indian apps |
| Token counting before sending | tokens (points; tree token-counting) | production practice |
| Overflow behaviour, context rot, lost in the middle | context-window (bullets, tree) | asked as "what if the context is too long" |
| Why transformers replaced RNNs; positional encoding; multi-head; encoder-only / decoder-only / encoder-decoder; quadratic attention cost | transformer-and-attention; tree | standard follow-ups |
| SFT, RLHF with reward model, DPO, LoRA / PEFT, distillation | llm-training-stages; tree; glossary | training-stage questions |
| Why models hallucinate (guessing rewarded); allow "I don't know"; NIST "confabulation" | hallucination | adds the why, and a cheap mitigation |
| Non-determinism even at temperature 0; stateless API calls | llm-limits (points, Interview Q 3; tree) | common production surprise |
| Assistant and tool roles; the messages array | concept `message-roles` (table, Example) | Needed to read any chat API request |
| System prompts can leak (OWASP LLM07:2025) | concept `message-roles` (trap, Interview Q) | Common security question; owned details link to `llm-security` |
| Be clear and specific, positive instructions, give the reason, tags for context | concept `prompt-design` (points) | Core provider guidance (Anthropic, OpenAI) |
| Prompt templates and versioning with evals | concept `prompt-design`; tree `prompt-template` | Backend practice; OpenAI recommends storing prompts in code and testing with evals |
| One-shot, in-context learning, example diversity, token cost | concept `zero-and-few-shot`; glossary | Commonly asked follow-ups |
| Reasoning models, effort settings, reasoning tokens cost | concept `chain-of-thought` | Current provider APIs changed how CoT is used |
| Code gates; routing, parallelisation, orchestrator-workers, evaluator-optimiser | concept `prompt-chaining`; tree | Anthropic workflow patterns, asked with agents |
| JSON mode vs schema-constrained outputs; refusals and truncation; `.entity()` and SDK class schemas | concept `structured-output`; comparison; tree | Key production distinction |
| Greedy decoding, top-k, stop sequences, finish / stop reason, seed; models that reject sampling settings | concept `sampling-parameters`; tree; glossary | Interview follow-ups and current API behaviour |
| Tool definition (name, description, JSON Schema) | `tool-calling` points; tree `tool-definition`; glossary | Basic interview question; the reference never says how a tool is described |
| Strict tool use | `tool-calling` points; tree `strict-tool-use`; glossary | OpenAI recommends always enabling it; Anthropic has strict: true |
| Parallel tool calls | `tool-calling` points; tree; glossary | Both providers support and allow disabling it |
| Tool definitions cost input tokens; keep tools few | `tool-calling` points, bullet 2 | OpenAI function calling guide |
| ToolContext / user id from session | `tool-calling` Example, Interview Q; tree `tool-context` | Key security answer for backend developers |
| Workflow vs agent (Anthropic definitions), routing, multi-agent | `ai-agents`, comparison, tree `llm-workflow`, `routing-workflow`, `multi-agent-system` | Commonly asked "agent vs workflow" |
| ReAct | tree `react-pattern`; glossary | Named pattern interviewers use |
| Stopping conditions, human approval, Spring AI tool-call caps | `ai-agents` points and bullets; tree | Guardrails for agents |
| Model Context Protocol (whole concept) | concept `mcp`, comparison `tool-calling-vs-mcp`, 11 tree nodes, 11 glossary terms | Missing from the reference; now asked often |
| MCP sampling and roots deprecated in 2026-07-28 | tree `mcp-sampling`, `mcp-roots`; glossary `mcp-sampling` | Current spec revision change |
| Conversation memory (whole concept): stateless APIs, strategies, provider state, Spring AI ChatMemory | concept `conversation-memory`, 6 tree nodes, 7 glossary terms | Reference only touches it in A4.1 |
| Embedding model is separate from the chat model; same model for documents and queries; re-embed when changing models | concept `embeddings` (points, Interview Q 2) | Common production / interview question; Gemini docs state model spaces are incompatible |
| Dimension as a dated number (text-embedding-3-small 1,536) and must match the DB column | concept `embeddings`; tree `embedding-dimension`; glossary | Makes "many dimensions" concrete |
| Cosine distance = 1 − similarity; similarity vs distance | concept `similarity-search` (points, Interview Q 3); tree `cosine-distance` | pgvector returns distance, a common confusion |
| Exact kNN as the baseline | concept `similarity-search`; tree `exact-knn`; glossary `knn` | Explains why ANN exists |
| Cosine similarity in plain Java | concept `similarity-search` (Example, run with output) | Spec asks for it |
| ANN and recall; HNSW and IVFFlat with pgvector 0.8 defaults; index dimension limits | concept `vector-databases` (points, Defaults, Interview Q 3); comparison `hnsw-vs-ivfflat` | Frequent follow-up after "why a vector DB" |
| THE pgvector SQL block (table, HNSW cosine index, filtered `<=>` query) | concept `vector-databases` (Example) | Shared by rag-pipeline and ai-and-databases via links |
| BM25, PostgreSQL full-text search (ts_rank is not BM25) | concept `hybrid-search`; tree `bm25`, `postgres-full-text` | Names the keyword side interviewers expect |
| Reciprocal rank fusion with k = 60, weighted score blending | concept `hybrid-search` (points, worked example); tree `rrf`, `weighted-score-blend` | How "combined ranking" is really done |
| Dense vs sparse vectors | concept `hybrid-search` (point); glossary `dense-vector`, `sparse-vector` | Common vocabulary in hybrid search |
| Bi-encoder vs cross-encoder; hosted rerank APIs, open cross-encoders, LLM as reranker; reranking cost | concept `reranking`; comparison `bi-encoder-vs-cross-encoder`; tree nodes | Explains why reranking helps and what it costs |
| RAG for documents vs tools for live records (order 42 status) | what-is-rag (How it works, Example) | Common design question; scope note |
| Origin paper Lewis et al. 2020 | tree node rag-origin-paper | Scope note; shows the original was fine-tuned end to end |
| Offline vs online phase, keeping the index fresh (delete by id / filter, re-add) | rag-pipeline (points, Interview Q, tree node index-refresh) | Asked as "what if a policy changes?" |
| Spring AI ETL and RAG advisors (DocumentReader, TokenTextSplitter, VectorStore.add, QuestionAnswerAdvisor, RetrievalAugmentationAdvisor) | rag-pipeline (code, tree) | Java baseline |
| Chunking strategies (fixed, sentence-aware, structure, semantic), contextual retrieval, documented defaults | chunking (table, Defaults, tree) | Commonly asked; scope note |
| Pre- vs post-filtering, pgvector iterative index scans, partitioning per tenant, PostgreSQL RLS, OWASP LLM08:2025 | metadata-and-filtering, tree, glossary | Multi-tenant RAG is a top interview topic |
| Similarity threshold, query rewriting, multi-query expansion, HyDE, context assembly, Spring AI defaults topK 4 / threshold 0.0 | retrieval-tuning, tree, glossary | Scope note |
| Long context as a third option, Anthropic's "under about 200,000 tokens" guidance, techniques stack, prompt caching link | rag-or-fine-tuning, comparison | Asked now that context windows are large |
| Provider citation features, quote-then-answer, allow "I don't know", checking cited ids in code | grounding-and-citations | Scope note |
| Barnett et al. 2024 failure points mapped to the five types; debug retrieval before the model; RAGAS metrics link | rag-failures, tree | Scope note |
| Direct vs indirect injection; injection in tool results, emails, web pages | comparison `direct-vs-indirect-prompt-injection` | Core interview distinction (OWASP LLM01, Anthropic, Greshake 2023) |
| Jailbreak as a kind of prompt injection | tree `jailbreak`; glossary | Commonly asked; OWASP wording |
| No fool-proof fix; defence in depth | `prompt-injection` (points) | OWASP LLM01 states it |
| Data exfiltration through injected links / images | tree `injection-data-exfiltration`; How it works bullet | OWASP LLM01 scenario |
| Tool-result screening | tree `tool-result-screening` | Anthropic guidance for indirect injection |
| OWASP LLM Top 10 (2025) table | `llm-security` | Standard reference interviewers name |
| Least privilege, act as the user | `llm-security` (points); tree | OWASP LLM06 |
| PII minimisation and masking, provider retention terms, zero data retention | `llm-security` (points); tree `data-minimisation`, `zero-data-retention` | Data privacy questions; OpenAI data controls |
| Denial of wallet / unbounded consumption | tree `denial-of-wallet`; glossary | OWASP LLM10 |
| Improper output handling: encode, never execute | `output-validation` (points, Interview Q) | OWASP LLM05 |
| Guardrails (input / output filters, moderation API, PII scrubbing, topic limits), human approval | `output-validation` tree | Scope note; OWASP LLM01 / LLM06 / LLM07, OpenAI moderation |
| Eval loop, golden set, graders, LLM-as-a-judge biases, regression evals | `ai-evaluation` | OpenAI eval guide; Zheng 2023 |
| Ragas RAG metrics | `ai-evaluation` Example table; glossary | Names a candidate can say |
| Trace with spans; OTel GenAI conventions; Spring AI observations; TTFT | `ai-observability` | Standard practice; Spring AI 2.0 docs |
| Spring AI 2.0 on Spring Boot 4.0 / 4.1: starters, ChatClient, advisors, portable ChatModel | concept `spring-ai-integration`; tree `spring-ai-chatclient`, `advisor-spring-ai`; glossary `spring-ai`, `chatclient`, `advisor-spring-ai`, `chatmodel`, `embeddingmodel`, `vectorstore` | the Java baseline interviewers expect for "LLM in Spring Boot" |
| Official OpenAI and Anthropic Java SDKs; Spring AI 2.0 uses them under the hood | tree `provider-sdk`; glossary `provider-sdk` | the reference only says "provider SDK" |
| Spring AI 2.0 defaults: request timeout 60 s, client retries 3 (OpenAI module) | concept `calling-llm-apis` (Defaults) | concrete, versioned numbers |
| Which errors not to retry; Retry-After as a minimum wait | concept `calling-llm-apis` (points, Interview Q) | common interview follow-up; reference retries everything |
| Mid-stream errors after a 200; validation harder when streaming | comparison `streaming-vs-blocking-response` | real streaming trade-off |
| Provider limits in requests and tokens per minute (RPM, TPM / ITPM, OTPM) | concept `calling-llm-apis` (point); tree `provider-rate-limits`; glossary `tokens-per-minute`, `http-429` | how providers actually limit |
| Idempotency key; circuit breaker and fallback; retry at one layer | concept `calling-llm-apis` (trap, bullet); tree `idempotency-key`, `circuit-breaker`; glossary | safe retries of actions such as refunds |
| Provider prompt caching (mechanism, prefix order) vs response caching | concept `model-selection-and-cost` (point, Example, Defaults); comparison `response-cache-vs-prompt-cache`; glossary `prompt-caching` | a top cost lever that the reference misses |
| Batch APIs: results within 24 h at 50% off (OpenAI, Anthropic) | concept `model-selection-and-cost` (point); tree / glossary `batch-api` | concrete form of "batching" |
| Model routing; semantic caching; self-hosted open-weight models; quantisation | tree `model-routing`, `semantic-caching`, `self-hosted-model`, `quantisation`; glossary | names interviewers use for cost control |
| PostgreSQL 18 read-only role, `statement_timeout`, `default_transaction_read_only` (tested) | concept `ai-and-databases` (Example, Defaults); tree `read-only-role`, `statement-timeout` | makes the text-to-SQL safeguards concrete |
| OWASP LLM05 / LLM06 (2025) framing for DB access | concept `ai-and-databases` (points, trap); tree notes | standard names for the risks |
| Symptom → concept picker | concept `ai-feature-playbook` (table) | planned in master scope |

## Dropped
| Reference item | Reason (rare / advanced / duplicate / unverifiable) |
|---|---|
| A77.END. Closing: one mental model for LLM / prompt / RAG / integration questions | duplicate (a closing remark with no fact; the playbook itself is that mental model) |

### Details placed elsewhere or cut, inside items listed above
| Reference item part | What happened |
|---|---|
| A4.1 (part: conversation history fills the window) | also: concept `conversation-memory` (points "Cost", table, link to `context-window`) |
| A19.1. Tool-call loop: model asks, app executes, result back, answer | also: concept `tool-calling` (Mermaid sequence diagram, trap) |
| A44.3 (part: secrets). Never hardcode API keys; env vars, secrets manager, Vault | also: concept `llm-security` (How it works bullet: link to `spring-ai-integration`) |
| A47.1 (part). Cost = input + output tokens + price + calls | also: concept tokens (points: billing; Example block) |
| A73.2. Confusion: fine-tuning gives current database knowledge (part: the decision) | also: concept rag-or-fine-tuning (trap, Interview Q "Can fine-tuning keep the model up to date?") |

## Template v3 rewrite (21-10-2026)

Every concept and comparison was rewritten in teaching template v3 (CLAUDE.md 3.1.1) and given a cheat-sheet card; each reference item mapped above still lands in the same concept id.

### Unit ai-foundations

**Added from the reference**

- None. The reference has no foundations section; this unit is editorial opening content (coverage rows 268–274 confirm). No reference teaching point was missing.

**Corrections**

- None. No fact was changed, so existing sources and their `verifiedOn: 2026-10-21` dates were kept (allowed for unchanged facts per SPEC §5). No new or changed facts, so no new sources were needed.

### Unit ai-in-production

**Added from the reference**

Nothing new beyond what the v2 draft already covered; the rewrite only re-expressed
existing, mapped reference content (coverage sections A42–A52, A59–A60, A48–A49) in v3 form
(What it is, buildsOn, scenarios, cheat cards, explain/example/sayIt on comparisons).

**Corrections**

None. Facts unchanged from the verified v2 draft.

### Unit llm-fundamentals

**Added from the reference**

Nothing materially new beyond the verified drafts; the reference sections for this unit (A2-A8, A56, A57, A72, plus corrections A4.1, A73.2, A73.8) were already mapped into the drafts. The rewrite made implicit teaching explicit:
- what-is-an-llm: added an explicit "three kinds" point and a Spring AI one-call Example (reply labelled as an example, never an output panel, per tech-ai-engineering.md).
- tokens: made the "4 chars / 0.75 words" rule a `default` point; kept the tiktoken table.
- context-window: added a token-budget Java Example and the "raise max-tokens still cuts off" scenario (input+output share one budget).
- llm-training-stages: added the LoRA "~10,000x fewer params" Example (Hu et al., 2021) as text (not an output panel).

**Corrections**

No new corrections in this pass. The drafts already carried the coverage-file corrections (A4.1 window includes tools + reasoning tokens; A73.2 LoRA freezes base weights; A73.8 LLM is not the DB). All kept and reverified against the existing primary sources; unchanged facts keep their 2026-10-21 sources per SPEC section 5.

### Unit prompting

**Added from the reference**

Nothing new beyond the verified v2 draft. This was a teaching rewrite into template v3
(What it is / Why it exists / numbered How it works / Rules and defaults / Not to be confused
with / cheat cards / scenarios / explain+example+sayIt on comparisons). All facts already
mapped to the reference in `reference/ai-engineering.coverage.md` (rows A9–A18, A70, A73.5,
and the "Added beyond the reference" rows for prompting) were kept.

**Corrections**

None. No draft fact was found wrong, so every source kept its existing `verifiedOn: 2026-10-21`
date (no fact was changed, so no 2026-10-27 re-verification was required). Where sampling and
reasoning APIs change fast (budget_tokens deprecation, models rejecting non-default temperature),
the cards carry a "re-check before interviews" note per the tech brief.

### Unit rag-a

**Added from the reference**

- "Only as good as retrieval" made an explicit point and Example bullet in what-is-rag (reference stresses retrieval quality drives answer quality).
- rag-pipeline: "documents embedded once, only the question embedded per request" raised from a trap to a first-class point and scenario (reference A26).
- chunking: self-contained-chunk rule (prepend title/section) made a step and a scenario (reference A27/A28 context-loss point).
- metadata-and-filtering: approximate-index under-return behaviour kept as a point, Rule and interview Q (reference A29 + pgvector).

**Corrections**

- None. All draft facts were already verified and matched the docs on re-check.

### Unit rag-b

**Added from the reference**

- rag-or-fine-tuning: LoRA/PEFT freezes the base model's weights (coverage line 263, A73.2) — added as a "Rules and defaults" bullet so the "fine-tuning changes model parameters" belief is corrected.
- rag-or-fine-tuning: dated note that provider fine-tuning platforms change (OpenAI winding down parts of fine-tuning), with a "re-check availability" caution (coverage line 263).
- retrieval-tuning: "retrieve wide, send narrow" / fetch extra then rerank — made the explicit key line (A30, A38).
- rag-failures: debug-retrieval-before-generation framing and the five failure types kept and expanded into step-by-step logic (A37.*, A38.1).

**Corrections**

- Fine-tuning "changes model parameters" (reference A73.2) corrected: with LoRA (Hu et al. 2021) base weights stay frozen; only small added weights are trained. Source: https://arxiv.org/abs/2106.09685 (verifiedOn 2026-10-27).
- No other factual corrections; existing sources kept for unchanged facts.

### Unit safety-evaluation

**Added from the reference**

- Excessive-Agency identity example (userId from session, not from the model) → `llm-security`
  Example + scenario. Reference A59.2 / coverage correction (line 261): the identity must come from
  the authenticated session via Spring AI `ToolContext`, never from the model. This is a teaching
  example of an already-verified rule; no new standalone fact.
- Jailbreak-vs-injection "Not to be confused with" → `prompt-injection` (reference A40 / A74.3 term
  list; already in draft Interview Q, promoted to a v3 section).
- "Structured output ≠ validation" distinction → `output-validation` (Common mistakes + Not to be
  confused with), from reference A18.2 / A65 mapping.
- Evals-vs-observability distinction → both `ai-evaluation` and `ai-observability`
  ("Not to be confused with"), clarifying the production/pre-ship boundary.

**Corrections**

None. The v2 drafts already mapped the ad-hoc reference risk list onto the OWASP Top 10 for LLM
Applications 2025 (coverage lines 257, 288, 333). The LLM01–LLM10 table in `llm-security` was kept
as-is and confirmed against the existing OWASP sources.

### Unit tools-agents

**Added from the reference**

- Nothing newly added beyond the already-verified draft. The reference's coverage items
  (A19/A19.1/A19.2 tool calling, A20/A20.1/A20.2 agents, MCP and conversation-memory as
  "missing from reference / added" per coverage lines 296–306) were already captured. The
  rewrite expanded their teaching into v3 form (What it is, numbered How-it-works steps,
  What-to-notice, Rules and defaults, Common mistakes, scenarios, cheat cards) without
  adding new facts.

**Corrections**

- None. All facts kept from the fact-verified draft.

### Unit vector-search

**Added from the reference**

- No new facts added beyond the draft. The reference sections mapped to this unit (A21–A24, A31–A32, A61–A63, A73.3/.4, metric/recall notes) were already covered by the verified draft; v3 rewrite made the teaching explicit (e.g. recall as a point, exact-kNN baseline, dense vs sparse, RRF worked example) without introducing new claims.

**Corrections**

- None. All pgvector 0.8.7 facts (HNSW m=16/ef_construction=64, hnsw.ef_search=40, ivfflat.probes=1, indexed vector ≤2000 dims / halfvec ≤4000, operators <=> <#> <->, HNSW buildable on empty table, IVFFlat built after data) were re-confirmed against the pgvector README and match the draft; existing verifiedOn 2026-10-21 kept.
