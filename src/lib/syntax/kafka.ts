import type { SyntaxSheet } from "./types";

export const kafka: SyntaxSheet = {
  tagline: "The Kafka CLI commands and Java producer/consumer calls you reach for every day.",
  baseline: "Apache Kafka 4 (KRaft)",
  lang: "bash",
  groups: [
    {
      title: "Topic admin (kafka-topics.sh)",
      rows: [
        {
          syntax: "kafka-topics.sh --create --topic T",
          what: "Create a topic",
          example:
            "kafka-topics.sh --bootstrap-server localhost:9092 --create --topic orders --partitions 3 --replication-factor 1",
        },
        {
          syntax: "--list",
          what: "List all topics",
          example: "kafka-topics.sh --bootstrap-server localhost:9092 --list",
        },
        {
          syntax: "--describe --topic T",
          what: "Partitions, leaders, ISR",
          example: "kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic orders",
        },
        {
          syntax: "--alter --partitions N",
          what: "Increase partition count",
          example:
            "kafka-topics.sh --bootstrap-server localhost:9092 --alter --topic orders --partitions 6",
        },
        {
          syntax: "--delete --topic T",
          what: "Delete a topic",
          example: "kafka-topics.sh --bootstrap-server localhost:9092 --delete --topic orders",
        },
      ],
    },
    {
      title: "Produce / consume from console",
      rows: [
        {
          syntax: "kafka-console-producer.sh --topic T",
          what: "Type messages to a topic",
          example: "kafka-console-producer.sh --bootstrap-server localhost:9092 --topic orders",
        },
        {
          syntax: "--property parse.key=true",
          what: "Send keyed messages",
          example: '--property parse.key=true --property key.separator=":"',
        },
        {
          syntax: "kafka-console-consumer.sh --topic T",
          what: "Read new messages",
          example: "kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic orders",
        },
        {
          syntax: "--from-beginning",
          what: "Read from the start of the log",
          example:
            "kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic orders --from-beginning",
        },
        {
          syntax: "--group G",
          what: "Consume as part of a group",
          example:
            "kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic orders --group billing",
        },
        {
          syntax: "--property print.key=true",
          what: "Show the key with each record",
          example: "--property print.key=true --property key.separator=' - '",
        },
      ],
    },
    {
      title: "Consumer groups (kafka-consumer-groups.sh)",
      rows: [
        {
          syntax: "--list",
          what: "List consumer groups",
          example: "kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list",
        },
        {
          syntax: "--describe --group G",
          what: "Offsets, lag per partition",
          example:
            "kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group billing",
        },
        {
          syntax: "--reset-offsets --to-earliest",
          what: "Rewind a group to the start",
          example:
            "kafka-consumer-groups.sh --bootstrap-server localhost:9092 --group billing --topic orders --reset-offsets --to-earliest --execute",
        },
        {
          syntax: "--reset-offsets --to-latest",
          what: "Skip to the end",
          example: "--group billing --topic orders --reset-offsets --to-latest --execute",
        },
        {
          syntax: "--delete --group G",
          what: "Delete an inactive group",
          example:
            "kafka-consumer-groups.sh --bootstrap-server localhost:9092 --delete --group billing",
        },
      ],
    },
    {
      title: "Java producer API",
      rows: [
        {
          syntax: "new KafkaProducer<K,V>(props)",
          what: "Create a producer",
          example: "var producer = new KafkaProducer<String,String>(props);",
        },
        {
          syntax: "new ProducerRecord<>(topic, key, value)",
          what: "A message to send",
          example: 'new ProducerRecord<>("orders", id, json)',
        },
        {
          syntax: "producer.send(record)",
          what: "Send async (returns Future)",
          example: "producer.send(record);",
        },
        {
          syntax: "producer.send(record, callback)",
          what: "Send with result callback",
          example: "producer.send(record, (meta, ex) -> {});",
        },
        {
          syntax: "producer.flush()",
          what: "Block until buffered sends finish",
          example: "producer.flush();",
        },
        {
          syntax: "producer.close()",
          what: "Flush and release resources",
          example: "producer.close();",
        },
      ],
      combos: [
        {
          label: "Minimal Java producer",
          code: `var props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", StringSerializer.class.getName());
props.put("value.serializer", StringSerializer.class.getName());
props.put("acks", "all");
props.put("enable.idempotence", "true");

try (var producer = new KafkaProducer<String,String>(props)) {
    var record = new ProducerRecord<>("orders", "id-1", "{...}");
    producer.send(record, (meta, ex) -> {
        if (ex != null) ex.printStackTrace();
        else System.out.println("offset " + meta.offset());
    });
}`,
        },
      ],
    },
    {
      title: "Java consumer API",
      rows: [
        {
          syntax: "new KafkaConsumer<K,V>(props)",
          what: "Create a consumer",
          example: "var consumer = new KafkaConsumer<String,String>(props);",
        },
        {
          syntax: "consumer.subscribe(List.of(topic))",
          what: "Join a topic (dynamic assign)",
          example: 'consumer.subscribe(List.of("orders"));',
        },
        {
          syntax: "consumer.poll(Duration)",
          what: "Fetch a batch of records",
          example: "var records = consumer.poll(Duration.ofMillis(100));",
        },
        {
          syntax: "consumer.commitSync()",
          what: "Commit offsets, block until done",
          example: "consumer.commitSync();",
        },
        {
          syntax: "consumer.commitAsync()",
          what: "Commit offsets without blocking",
          example: "consumer.commitAsync();",
        },
        {
          syntax: "consumer.seekToBeginning(parts)",
          what: "Rewind assigned partitions",
          example: "consumer.seekToBeginning(consumer.assignment());",
        },
      ],
      combos: [
        {
          label: "Poll loop with manual commit",
          code: `var props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("group.id", "billing");
props.put("key.deserializer", StringDeserializer.class.getName());
props.put("value.deserializer", StringDeserializer.class.getName());
props.put("enable.auto.commit", "false");
props.put("auto.offset.reset", "earliest");

try (var consumer = new KafkaConsumer<String,String>(props)) {
    consumer.subscribe(List.of("orders"));
    while (true) {
        var records = consumer.poll(Duration.ofMillis(100));
        for (var r : records) {
            process(r.key(), r.value());   // r.partition(), r.offset()
        }
        consumer.commitSync();             // after processing the batch
    }
}`,
        },
      ],
    },
    {
      title: "Key configs",
      rows: [
        {
          syntax: "acks=all",
          what: "Wait for all in-sync replicas (safest)",
          example: 'props.put("acks", "all");  // 0, 1, or all',
        },
        {
          syntax: "enable.idempotence=true",
          what: "No duplicate records on retry (default)",
          example: 'props.put("enable.idempotence", "true");',
        },
        {
          syntax: "retries=N",
          what: "Producer retry count (default Int.MAX)",
          example: 'props.put("retries", "3");',
        },
        {
          syntax: "group.id=G",
          what: "Consumer group name (required)",
          example: 'props.put("group.id", "billing");',
        },
        {
          syntax: "auto.offset.reset=earliest",
          what: "Where a new group starts (default latest)",
          example: 'props.put("auto.offset.reset", "earliest");',
        },
        {
          syntax: "enable.auto.commit=false",
          what: "Commit offsets yourself",
          example: 'props.put("enable.auto.commit", "false");',
        },
      ],
    },
  ],
};
