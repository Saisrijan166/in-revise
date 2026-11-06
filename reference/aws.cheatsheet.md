# AWS Fundamentals

## What AWS Is
AWS (Amazon Web Services) is a cloud platform that rents out computing, storage, databases, networking, and security as services instead of making you own the hardware.

- **Cloud computing:** rent computing resources instead of buying and running all physical infrastructure yourself.
- **Pay-as-you-go:** you pay according to usage or the pricing model of the service you pick.

> Remember: Cloud = someone else's hardware, billed by use; you focus on your application, not the data centre.

## Regions and Availability Zones ⭐
- **Region:** a geographic area that contains AWS infrastructure.
- **Availability Zone (AZ):** an isolated group of infrastructure inside a Region.

Running across multiple AZs is how you survive the failure of one AZ.

> Remember: Multiple AZs inside one Region give you failure isolation without going far away.

## Core Qualities
These words come up constantly, so define them cleanly:

- **High availability:** stays available even when some parts fail.
- **Scalability:** can handle a growing workload.
- **Elasticity:** can grow *and shrink* resources as the workload changes.
- **Vertical scaling:** give one machine more CPU or memory.
- **Horizontal scaling:** add more machines or instances.
- **Durability:** how unlikely stored data is to be lost.
- **Availability:** how likely the service or data is to be reachable when needed.

> Remember: Durability is "will my data survive?"; availability is "can I reach it right now?".

## Shared Responsibility Model ⭐
AWS secures the underlying cloud infrastructure. The customer stays responsible for parts of security and configuration — how much depends on the service.

> Remember: AWS secures the cloud; you secure what you put *in* the cloud.

## Well-Architected Thinking
Interviewers expect you to design for the core qualities above: redundancy across AZs, horizontal scaling, least privilege, and paying only for what you use. Simply creating multiple servers does not by itself give high availability — the networking and data layers must be redundant too.

# Compute

## EC2 — Elastic Compute Cloud ⭐
A virtual server in AWS. You manage the operating system, installed software, and application runtime.

- **Use:** run a Java/Spring Boot application on a Linux server.
- Best for flexible, long-running workloads.

## Lambda ⭐
Runs your code in response to events without you managing the servers directly.

- **Use:** process a payment webhook or a small event-driven task.
- Best for short-lived, event-driven work.

## ECS and EKS
Both run containerized applications.

- **ECS (Elastic Container Service):** runs and manages containers. **Fargate** can run ECS tasks without you managing the underlying servers.
- **EKS (Elastic Kubernetes Service):** AWS-managed Kubernetes, for when you need the Kubernetes ecosystem and APIs.

Supporting terms:
- **Docker:** packages an app and its dependencies into a container image.
- **Container:** an isolated execution environment for an application.
- **Orchestration:** automatically manages container placement, health, scaling, and replacement.
- **Fargate:** serverless compute for supported containers; it does not mean the app has no servers anywhere.

> Remember: EC2 = you run a server. Containers (ECS/EKS) = you ship images. Lambda = you ship a function.

## Compute at a Glance

| EC2 | Lambda | ECS | EKS |
| --- | --- | --- | --- |
| Virtual servers | Event-driven functions | Container orchestration | Managed Kubernetes |
| You manage the OS | No server management | AWS manages orchestration | Kubernetes-based |
| Long-running workloads | Short-lived tasks | Containers without Kubernetes | Kubernetes ecosystem |

## Auto Scaling and Load Balancers ⭐
- **Auto Scaling:** adds or removes compute capacity according to policies and workload.
- **Load balancer:** distributes incoming traffic across targets.
- **Application Load Balancer (ALB):** Layer 7, for HTTP/HTTPS routing.
- **Network Load Balancer (NLB):** Layer 4, for TCP/UDP/TLS traffic.

**Typical deployment answer:** package the Spring Boot app as a Docker image, run it on ECS with Fargate, put an ALB in front to route to healthy tasks, and let Auto Scaling adjust task count with demand. (One valid design, not the only one.)

> Remember: ALB routes by HTTP (paths, hosts); NLB just moves raw TCP/UDP fast.

# Storage

## S3 — Simple Storage Service ⭐
Object storage for files, backups, logs, images, and documents.

- **Bucket:** a container for objects.
- **Object:** data stored with a key and metadata.
- **Versioning:** keeps multiple versions of an object when enabled.
- **Lifecycle policy:** automatically transitions or expires eligible objects by rule.
- **Pre-signed URL:** a time-limited URL granting specific access to one object.

S3 is not a relational database. Do not keep a payment's authoritative transaction state only inside an invoice file in S3 — records belong in a database.

> Remember: S3 holds whole files keyed by name; it is cheap, durable, and not a database.

## EBS and EFS
- **EBS (Elastic Block Store):** block storage, usually attached to one EC2 instance like a disk.
- **EFS (Elastic File System):** managed shared file storage that multiple compute clients can mount.
- **Object vs block storage:** object storage works with whole objects; block storage gives block devices an OS uses as disks.

> Remember: EBS = one instance's disk. EFS = a shared filesystem. S3 = objects over HTTP.

# Databases

## RDS and Aurora ⭐
- **RDS:** managed relational databases, including MySQL and PostgreSQL engines.
- **Aurora:** AWS-managed relational engine compatible with MySQL or PostgreSQL.

Supporting terms:
- **Read replica:** a copy used mainly to scale reads.
- **Multi-AZ:** a deployment design for availability and failover.
- **Point-in-time recovery:** restores to a specific point within the recovery window.
- **Connection pooling:** reuses DB connections so you don't open too many.

Your Java app usually connects to RDS with the normal JDBC/JPA mechanism — RDS is managed database infrastructure, not a special client:

```properties
spring.datasource.url=jdbc:postgresql://HOST:5432/mydb
spring.datasource.username=USER
spring.datasource.password=PASSWORD
```

> Remember: RDS is just a managed SQL database; your app talks to it over plain JDBC.

## DynamoDB
Managed NoSQL key-value and document database, built for scale and key-based access.

> Remember: Pick DynamoDB when key-based access and scaling fit; pick RDS when you need joins, relational queries, and transactions.

## ElastiCache
Managed caching service for Redis-compatible and Memcached engines.

- **Use:** fast, short-lived cached lookups (for example cached payment or merchant-config reads).

## Example data layer
A Spring Boot payment service often uses several together:

```
Spring Boot Payment Service
  ├─ RDS PostgreSQL  → payment records
  ├─ ElastiCache     → cached lookups
  └─ S3              → invoice PDFs
```

# Networking and Security

## VPC, Subnets and Routing ⭐
- **VPC (Virtual Private Cloud):** a logically isolated network in AWS.
- **Subnet:** a range of IPs within a VPC, tied to one AZ.
- **Public subnet:** typically has a route to an Internet Gateway.
- **Private subnet:** typically has no direct inbound route from the internet.
- **Internet Gateway (IGW):** lets a VPC talk to the internet when routes and other requirements are set.
- **NAT Gateway:** lets private-subnet resources make *outbound* internet connections without being directly reachable from outside.
- **Route table:** decides where network traffic is directed.
- **VPC endpoint:** reach AWS services without a public internet route.

> Remember: Public subnet = has an internet route. Private subnet = reaches out via NAT, stays unreachable from outside.

## Security Groups and NACLs ⭐
- **Security Group:** a **stateful** virtual firewall on a resource/network interface — return traffic is allowed automatically.
- **Network ACL (NACL):** **stateless** access control at the subnet level — you must allow both directions.

**Networking traps to avoid:**
- A private subnet is not automatically secure just because it is "private".
- A public IP alone does not guarantee internet connectivity.
- A NAT Gateway is for outbound, not a general inbound mechanism.
- IAM permissions and network permissions solve different problems.

> Remember: Security group = stateful, on the instance. NACL = stateless, on the subnet.

## IAM — Identity and Access Management ⭐
Controls who or what can access AWS resources. Follow **least privilege**: grant only the permissions a task needs.

- **IAM user:** an identity for a person or app when user credentials fit.
- **IAM role:** an identity with permissions a trusted entity can assume.
- **IAM policy:** defines allowed/denied actions on resources under conditions.
- **IAM group:** groups users for easier permission management.
- **Temporary credentials:** short-lived credentials, usually from assuming a role.
- **Instance profile:** gives an IAM role to an EC2 instance.
- **Execution role:** permissions a service or function uses to do its work.
- **Resource-based policy:** a policy attached to a resource, such as an S3 bucket policy.

**Preferred pattern:** to let a Spring Boot service write a receipt to S3, assign an IAM role with permission to that bucket/prefix — do not hardcode long-lived access keys in source code.

> Remember: Authentication identifies the principal; IAM authorization decides which AWS actions it may perform.

## Encryption and Secrets
- **KMS (Key Management Service):** manages cryptographic keys.
- **Secrets Manager:** stores and manages secrets like DB credentials and API keys.
- **Parameter Store (Systems Manager):** stores config values, and securely stores supported secrets.
- **Encryption at rest:** protects stored data.
- **Encryption in transit:** protects data moving over a connection (TLS certificates enable HTTPS).

> Remember: KMS holds the keys; Secrets Manager holds the secrets; use roles, never hardcoded keys.

# Integration and Messaging

## SQS, SNS, EventBridge and Kinesis ⭐
- **SQS (Simple Queue Service):** a message queue that decouples producers from consumers.
- **SNS (Simple Notification Service):** publish/subscribe that fans one message out to many subscribers.
- **EventBridge:** routes events to targets based on rules.
- **Kinesis:** collects and processes streaming data.

| Service | Main purpose | Example |
| --- | --- | --- |
| SQS | Queue and decouple work | Process payment receipts |
| SNS | Publish and fan out | Notify many subscribers |
| EventBridge | Route events by rule | Route `PaymentSucceeded` to targets |
| Kinesis | Stream ingestion/processing | Continuous event stream |

A payment service can drop a receipt-generation job on SQS and return immediately, while a worker picks it up and writes to S3 — no waiting.

> Remember: SQS holds work for one consumer group; SNS broadcasts to many; EventBridge routes by rules. They combine well.

## Queue Behaviour You Must Know
- **Producer / Consumer:** sends / receives and processes a message.
- **Dead-letter queue (DLQ):** holds messages that keep failing, per redrive rules.
- **Visibility timeout:** how long a received SQS message is hidden from other consumers.
- **Message retention:** how long a message stays available in the queue.
- **At-least-once delivery:** consumers must handle duplicates — design to be idempotent.
- **FIFO queue:** SQS type giving ordered processing within a message group, plus deduplication.

> Remember: Standard SQS is at-least-once, so make processing idempotent; FIFO adds order and dedup.

# Observability and Deployment

## Monitoring and Auditing ⭐
- **CloudWatch:** collects logs, metrics, and alarms (for example, alert when error rate rises).
- **CloudTrail:** records AWS API activity for auditing and investigation.
- **X-Ray:** distributed tracing for instrumented apps and services.

> Remember: CloudWatch = metrics/logs/alarms (how it's running); CloudTrail = who called which AWS API (audit).

## Infrastructure as Code and CI/CD
- **CloudFormation:** defines and manages AWS infrastructure using templates.
- **Infrastructure as Code (IaC):** manage infrastructure through version-controlled definitions, not manual clicks.
- **CI/CD:** automate building, testing, and deploying software.

## Deployment Strategies
- **Blue-green:** keep old and new environments side by side and switch traffic over.
- **Canary:** release to a small slice of traffic first, then widen.
- **Rolling:** gradually replace old instances/tasks with new ones.
- **Health check:** decides whether a target is healthy enough to receive traffic.

## Resilience Terms
- **Disaster recovery:** restoring service after a serious failure.
- **RTO (Recovery Time Objective):** the maximum targeted time to restore service.
- **RPO (Recovery Point Objective):** the maximum targeted data loss, measured in time.
- **Secrets rotation:** replacing credentials periodically or when required.

> Remember: RTO = how long until we're back; RPO = how much data we can afford to lose.

# Integrating AWS from Java

## The Mental Model ⭐
Don't memorize the SDK. First name the service, then follow one simple chain: `Java → AWS SDK client → service → resource`. Map the job to the service:

| Service | Job |
| --- | --- |
| S3 | file storage |
| RDS | database |
| SQS | queue |
| EC2 | server |
| Lambda | serverless function |
| CloudWatch | monitoring |

## S3 Upload Pattern
`S3Client → PutObjectRequest → bucket + key → putObject()`.

```java
S3Client s3 = S3Client.builder()
        .region(Region.AP_SOUTH_1)
        .build();

PutObjectRequest request = PutObjectRequest.builder()
        .bucket("my-bucket")
        .key("hello.txt")
        .build();

s3.putObject(request, RequestBody.fromString("Hello AWS"));
```

Reading uses `GetObjectRequest` with the same bucket + key, then `getObjectAsBytes(request)`. In Spring Boot, inject the `S3Client` into a service and keep controllers thin: `Controller → Service → S3Client → bucket`.

## SQS Send Pattern
`SqsClient → SendMessageRequest → queueUrl + messageBody → sendMessage()`.

```java
SqsClient sqs = SqsClient.builder()
        .region(Region.AP_SOUTH_1)
        .build();

SendMessageRequest request = SendMessageRequest.builder()
        .queueUrl(queueUrl)
        .messageBody("Order created")
        .build();

sqs.sendMessage(request);
```

> Remember: Every AWS SDK call is `build a client → build a request → call the method`; RDS is the exception — connect with plain JDBC/JPA.

# Common "Why X vs Y?" Comparisons

## EC2 vs Lambda ⭐
- **EC2:** a server you run and manage; good for long-running, flexible workloads.
- **Lambda:** a function AWS runs on an event; good for short, event-driven tasks with no server management.

> Remember: Long-lived and in control → EC2. Short, event-driven, hands-off → Lambda.

## ECS vs EKS
- **ECS:** AWS-native container orchestration, simpler, no Kubernetes to learn.
- **EKS:** managed Kubernetes, for teams that want the Kubernetes ecosystem and APIs.

> Remember: Containers without Kubernetes → ECS. You need Kubernetes → EKS.

## S3 vs EBS vs EFS ⭐
- **S3:** object storage over HTTP; whole files by key.
- **EBS:** block storage attached to a single EC2 instance, like a disk.
- **EFS:** shared file storage many compute clients can mount.

> Remember: Files by name → S3. One instance's disk → EBS. Shared filesystem → EFS.

## RDS vs DynamoDB ⭐
- **RDS:** relational, SQL, joins, relational transactions.
- **DynamoDB:** NoSQL, key-oriented access, scales for simple access patterns.

> Remember: Joins and SQL → RDS. Key lookups at scale → DynamoDB.

## SQS vs SNS ⭐
- **SQS:** a queue — holds work until a consumer pulls and processes it.
- **SNS:** pub/sub — pushes one published message to many subscribers.

They are not interchangeable, but combine well (SNS fanning out into several SQS queues).

> Remember: Hold work for a worker → SQS. Broadcast to many → SNS.

## Security Group vs NACL ⭐
| | Security Group | NACL |
| --- | --- | --- |
| Level | Resource / network interface | Subnet |
| State | Stateful (return traffic auto-allowed) | Stateless (allow both directions) |
| Rules | Allow only | Allow and deny |

> Remember: Stateful firewall on the instance → security group. Stateless rules on the subnet → NACL.

## CloudWatch vs CloudTrail
- **CloudWatch:** operational data — logs, metrics, alarms.
- **CloudTrail:** audit trail — who called which AWS API and when.

> Remember: How the system runs → CloudWatch. Who did what in AWS → CloudTrail.
