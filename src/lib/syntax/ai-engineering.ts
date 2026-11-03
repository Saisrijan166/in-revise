import type { SyntaxSheet } from "./types";

export const aiEngineering: SyntaxSheet = {
  tagline:
    "The Spring AI calls you write to add chat, prompts, embeddings, vector search and RAG to a Java app.",
  baseline: "Spring AI 2.0 · Java",
  lang: "java",
  groups: [
    {
      title: "Chat client",
      rows: [
        {
          syntax: "ChatClient.Builder (injected)",
          what: "Auto-configured client builder",
          example: "MyBean(ChatClient.Builder b) { this.client = b.build(); }",
        },
        {
          syntax: "client.prompt()",
          what: "Start a fluent request",
          example: "client.prompt()",
        },
        {
          syntax: ".user(text)",
          what: "Set the user message",
          example: '.user("Summarise this order")',
        },
        {
          syntax: ".system(text)",
          what: "Set the system instruction",
          example: '.system("You are a concise assistant")',
        },
        {
          syntax: ".call()",
          what: "Run synchronously",
          example: ".call()",
        },
        {
          syntax: ".content()",
          what: "Get the reply as a String",
          example: "String reply = client.prompt().user(q).call().content();",
        },
        {
          syntax: ".chatResponse()",
          what: "Full response + token usage",
          example: "var r = client.prompt().user(q).call().chatResponse();",
        },
      ],
      combos: [
        {
          label: "Minimal chat call",
          code: `@Service
class Assistant {
    private final ChatClient client;
    Assistant(ChatClient.Builder b) {
        this.client = b.defaultSystem("Answer briefly.").build();
    }
    String ask(String question) {
        return client.prompt().user(question).call().content();
    }
}`,
        },
      ],
    },
    {
      title: "Prompts and messages",
      rows: [
        {
          syntax: 'new PromptTemplate("...{var}...")',
          what: "Template with placeholders",
          example: 'var t = new PromptTemplate("Explain {topic} simply");',
        },
        {
          syntax: "template.create(Map.of(...))",
          what: "Fill variables into a Prompt",
          example: 'Prompt p = t.create(Map.of("topic", "RAG"));',
        },
        {
          syntax: ".user(u -> u.text(t).param(k, v))",
          what: "User message with params",
          example: '.user(u -> u.text("Hi {name}").param("name", "Ava"))',
        },
        {
          syntax: "new SystemMessage(text)",
          what: "Build a system message",
          example: 'var sys = new SystemMessage("You are a tutor");',
        },
        {
          syntax: "new UserMessage(text)",
          what: "Build a user message",
          example: 'var usr = new UserMessage("What is a vector?");',
        },
        {
          syntax: "new Prompt(List.of(messages))",
          what: "Multi-message prompt",
          example: "new Prompt(List.of(sys, usr))",
        },
      ],
    },
    {
      title: "Structured output",
      rows: [
        {
          syntax: ".entity(T.class)",
          what: "Map the reply to a Java type",
          example: "ActorFilms a = client.prompt().user(q).call().entity(ActorFilms.class);",
        },
        {
          syntax: ".entity(new ParameterizedTypeReference<>(){})",
          what: "Map to a generic (e.g. List)",
          example: ".entity(new ParameterizedTypeReference<List<Film>>() {})",
        },
        {
          syntax: "record as the target type",
          what: "Record fields become the JSON schema",
          example: "record ActorFilms(String actor, List<String> movies) {}",
        },
      ],
      combos: [
        {
          label: "Ask for a typed result",
          code: `record Sentiment(String label, double score) {}

Sentiment s = client.prompt()
    .user("Classify sentiment: 'Great product, fast delivery'")
    .call()
    .entity(Sentiment.class);   // {"label":"positive","score":0.95}`,
        },
      ],
    },
    {
      title: "Embeddings",
      rows: [
        {
          syntax: "EmbeddingModel (injected)",
          what: "Turns text into vectors",
          example: "MyBean(EmbeddingModel model) {...}",
        },
        {
          syntax: "model.embed(text)",
          what: "Embed one string -> float[]",
          example: 'float[] v = model.embed("hello");',
        },
        {
          syntax: "model.embed(List.of(...))",
          what: "Embed many -> List<float[]>",
          example: 'List<float[]> vs = model.embed(List.of("a", "b"));',
        },
        {
          syntax: "model.dimensions()",
          what: "Size of each vector",
          example: "int d = model.dimensions();   // e.g. 1536",
        },
        {
          syntax: "model.embedForResponse(list)",
          what: "Vectors + metadata",
          example: 'var resp = model.embedForResponse(List.of("a"));',
        },
      ],
    },
    {
      title: "Vector store",
      rows: [
        {
          syntax: "VectorStore (injected)",
          what: "Store + search embeddings",
          example: "MyBean(VectorStore store) {...}",
        },
        {
          syntax: "store.add(List.of(doc))",
          what: "Index documents (auto-embedded)",
          example: 'store.add(List.of(new Document("text", Map.of("src","faq"))));',
        },
        {
          syntax: "store.similaritySearch(query)",
          what: "Nearest docs for a string",
          example: 'List<Document> hits = store.similaritySearch("refunds");',
        },
        {
          syntax: "store.similaritySearch(SearchRequest)",
          what: "Search with topK + threshold",
          example: "store.similaritySearch(req);",
        },
        {
          syntax: "SearchRequest.builder().query().topK().build()",
          what: "Build a tuned query",
          example: 'SearchRequest.builder().query("refunds").topK(5).build()',
        },
        {
          syntax: ".similarityThreshold(d) / .filterExpression(s)",
          what: "Min score / metadata filter",
          example: ".similarityThreshold(0.7).filterExpression(\"src == 'faq'\")",
        },
        {
          syntax: "store.delete(List.of(id))",
          what: "Remove documents",
          example: "store.delete(List.of(doc.getId()));",
        },
      ],
      combos: [
        {
          label: "Embed, store and search",
          code: `// index
store.add(List.of(
    new Document("Refunds take 5 days", Map.of("src", "faq")),
    new Document("Shipping is free over 50", Map.of("src", "faq"))));

// retrieve the 3 closest chunks
SearchRequest req = SearchRequest.builder()
    .query("how long for a refund?")
    .topK(3)
    .similarityThreshold(0.5)
    .build();
List<Document> context = store.similaritySearch(req);`,
        },
      ],
    },
    {
      title: "RAG (retrieval-augmented)",
      rows: [
        {
          syntax: "QuestionAnswerAdvisor.builder(store).build()",
          what: "Auto-RAG advisor over a store",
          example: "var qa = QuestionAnswerAdvisor.builder(vectorStore).build();",
        },
        {
          syntax: ".defaultAdvisors(advisor)",
          what: "Attach RAG to every request",
          example: ".defaultAdvisors(QuestionAnswerAdvisor.builder(store).build())",
        },
        {
          syntax: ".advisors(advisor)",
          what: "Attach RAG to one request",
          example: ".advisors(qa)",
        },
        {
          syntax: ".searchRequest(SearchRequest...)",
          what: "Tune retrieval for the advisor",
          example: ".searchRequest(SearchRequest.builder().topK(4).build())",
        },
      ],
      combos: [
        {
          label: "RAG query in one call",
          code: `@Service
class DocsBot {
    private final ChatClient client;
    DocsBot(ChatClient.Builder b, VectorStore store) {
        this.client = b
            .defaultAdvisors(QuestionAnswerAdvisor.builder(store).build())
            .build();
    }
    String ask(String q) {
        // advisor retrieves context and appends it to the prompt
        return client.prompt().user(q).call().content();
    }
}`,
        },
      ],
    },
    {
      title: "Tools / function calling",
      rows: [
        {
          syntax: '@Tool(description="...")',
          what: "Expose a method to the model",
          example: '@Tool(description="Get weather for a city") String weather(String city)',
        },
        {
          syntax: '@ToolParam(description="...")',
          what: "Describe a tool parameter",
          example: '@ToolParam(description="City name") String city',
        },
        {
          syntax: ".tools(obj)",
          what: "Register tool object for a call",
          example: ".tools(new WeatherTools())",
        },
        {
          syntax: ".defaultTools(obj)",
          what: "Register tools for all calls",
          example: "b.defaultTools(new WeatherTools()).build()",
        },
      ],
      combos: [
        {
          label: "Define and use a tool",
          code: `class WeatherTools {
    @Tool(description = "Current weather for a city")
    String weather(@ToolParam(description = "City") String city) {
        return api.lookup(city);   // model decides when to call this
    }
}

String reply = client.prompt()
    .user("What's the weather in Delhi?")
    .tools(new WeatherTools())
    .call().content();`,
        },
      ],
    },
    {
      title: "Streaming",
      rows: [
        {
          syntax: ".stream()",
          what: "Switch to streaming mode",
          example: "client.prompt().user(q).stream()",
        },
        {
          syntax: ".stream().content()",
          what: "Flux<String> of tokens",
          example: "Flux<String> tokens = client.prompt().user(q).stream().content();",
        },
        {
          syntax: ".stream().chatResponse()",
          what: "Flux<ChatResponse> (with metadata)",
          example: "Flux<ChatResponse> f = client.prompt().user(q).stream().chatResponse();",
        },
      ],
      combos: [
        {
          label: "Stream tokens to the caller",
          code: `@GetMapping(value = "/chat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
Flux<String> chat(@RequestParam String q) {
    return client.prompt().user(q).stream().content();
}`,
        },
      ],
    },
    {
      title: "Config (application.yml)",
      rows: [
        {
          syntax: "spring.ai.openai.api-key",
          what: "Provider API key",
          example: "spring.ai.openai.api-key=${OPENAI_API_KEY}",
        },
        {
          syntax: "spring.ai.openai.chat.options.model",
          what: "Chat model to use",
          example: "spring.ai.openai.chat.options.model=gpt-4o-mini",
        },
        {
          syntax: "spring.ai.openai.chat.options.temperature",
          what: "Randomness (0 = deterministic)",
          example: "spring.ai.openai.chat.options.temperature=0.2",
        },
        {
          syntax: "spring.ai.openai.embedding.options.model",
          what: "Embedding model",
          example: "spring.ai.openai.embedding.options.model=text-embedding-3-small",
        },
        {
          syntax: "spring.ai.vectorstore.pgvector.*",
          what: "Vector store settings",
          example: "spring.ai.vectorstore.pgvector.dimensions=1536",
        },
      ],
    },
  ],
};
