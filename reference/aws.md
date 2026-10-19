# REST API, Redis, AWS & Software Design Patterns

Interview Cheat Sheet — Beginner to Intermediate

This guide focuses on the concepts, terminology, rules, differences, defaults, and common interview questions you need for Java Backend / Spring Boot / Microservices interviews.

The examples use one common scenario throughout: a customer makes a payment using UPI, a card, or a wallet. You can reuse this scenario to explain many backend concepts and design patterns.

# PART 3: AWS

## 1. AWS Basics

### Subtopics

- AWS (Amazon Web Services): A cloud platform offering computing, storage, databases, networking, security, and many other services.
- Cloud computing: Renting computing resources instead of managing all physical infrastructure yourself.
- Region: A geographic area containing AWS infrastructure.
- Availability Zone (AZ): An isolated group of infrastructure within a Region.
- High availability: Designing a system to remain available despite some failures.
- Scalability: Ability to handle increasing workload.
- Elasticity: Ability to increase or decrease resources as workload changes.
- Vertical scaling: Giving a machine more CPU or memory.
- Horizontal scaling: Adding more machines or instances.
- Pay-as-you-go: Paying according to usage or the pricing model of the selected service.
- Shared responsibility model: AWS secures the underlying cloud infrastructure; customers remain responsible for parts of security and configuration, depending on the service.
- IAM (Identity and Access Management): Controls who or what can access AWS resources.
- Least privilege: Grant only the permissions required for a task.

### Example

A Java Spring Boot payment service runs on AWS compute, stores payment records in RDS, caches merchant configuration in ElastiCache, and stores receipts in S3.

## 2. Compute Services: EC2, Lambda, ECS and EKS

[Amazon EC2 | Integrations | Opal Security](https://images.openai.com/static-rsc-4/HSk8YHPa6JA14sHlG7c1BIR-AlCKhBxVeJuwjDBuKFv0wCszN1hDGDjwq-Txab19tCqxYoocuiFOhFq8Yhd9R6oP21ruzP6QYOSMHqySIYkoYsG7EC9Pr3DNr6lmz8_MQY4secqbsHxSJ4GQEmd1TqjS70vkl5h_qgmZI58BL4I?purpose=inline)

EC2 — Elastic Compute Cloud

A virtual server in AWS. You manage the operating system, installed software, and application runtime.

Use: Run a Java/Spring Boot application on a Linux server.

[File:Amazon Lambda architecture logo.svg - Wikimedia Commons](https://images.openai.com/static-rsc-4/BVOKTuzq-WE23sUpbEYalv9OTNIt2HQXfPQ8L1sXZjnUuDWtKPluZQI3BkSmEgRPi8aSelgujA_oD_KLtmOAqPNc7ACR1HWwYDl9RjAmgG_tzIb3WTa63v82AoORkHpkPFdAQosynUb76ILUymiy2X-6gtS_Pxs0XupFcvL21GE?purpose=inline)

Lambda

Runs code in response to events without requiring you to manage the underlying servers directly.

Use: Process a payment webhook or handle a small event-driven task.

[Cloud Icons | Amazon Elastic Container Service](https://images.openai.com/static-rsc-4/w1qdMQfvOlNZyVcZMy4NlCLj8-i3GcHhK9gtcukzN95vBe0ITrNeshxJW9VhWVjfMwan7KpEb08EsiF_v7NBtZ8YdzKmRkeK5YiOofdUAofo-dQmgXiGpaaumIcSM3-qrvxKoF-3kKF8j5WKwOapuuaaLYxRV0o69tBrWFJ6Q9M?purpose=inline)

ECS — Elastic Container Service

Runs and manages containerized applications. AWS Fargate can run ECS tasks without you managing the underlying servers.

Use: Deploy a Dockerized Spring Boot microservice.

[Free High-Quality Amazon EKS Logo for Creative Design](https://images.openai.com/static-rsc-4/Or04aWW_S6Y8QP12Tpysowjs5H9xNIfIoUsmXmvXwhfdlDyIWS0alY3VTsThAXaJg4qtUdzLyz94i6YfXPubs3qOLgJhm-TK30A0cOWV6iHv3QfWUkel7f0UY90cm-3f1HjL8goBOgC4_6of--688sUXF4gstLAhGxNnzVWd7Tk?purpose=inline)

EKS — Elastic Kubernetes Service

AWS-managed Kubernetes for running containerized applications.

Use: Run microservices that need Kubernetes orchestration.

### Important differences

| EC2                              | Lambda                         | ECS                                     | EKS                            |
| -------------------------------- | ------------------------------ | --------------------------------------- | ------------------------------ |
| Virtual servers                  | Event-driven functions         | Container orchestration                 | Managed Kubernetes             |
| You manage the OS                | No direct server management    | AWS manages orchestration               | Kubernetes-based orchestration |
| Flexible, long-running workloads | Short-lived event-driven tasks | Containers without requiring Kubernetes | Kubernetes ecosystem and APIs  |

- Docker: Packages an application and its dependencies into a container image.
- Container: An isolated execution environment for an application.
- Orchestration: Automatically manages container placement, health, scaling, and replacement.
- Fargate: Serverless compute for supported containers; it does not mean the application itself has no servers anywhere.
- Auto Scaling: Adds or removes compute capacity according to policies and workload.
- Load balancer: Distributes incoming traffic across targets.
- Application Load Balancer (ALB): Operates at Layer 7 and supports HTTP/HTTPS routing.
- Network Load Balancer (NLB): Operates primarily at Layer 4 and handles TCP/UDP/TLS traffic patterns.

### Interview example

If an interviewer asks how to deploy a Java backend:

> I would package the Spring Boot application as a Docker image and run it using ECS with Fargate. An Application Load Balancer can route requests to healthy tasks, and Auto Scaling can adjust the number of tasks based on demand.

This is one possible design, not the only correct answer.

## 3. Storage Services: S3, EBS and EFS

### Subtopics

- S3 (Simple Storage Service): Object storage for files, backups, logs, images, and documents.
- S3 bucket: A container for objects.
- S3 object: Data stored with a key and metadata.
- EBS (Elastic Block Store): Block storage commonly attached to EC2 instances.
- EFS (Elastic File System): Managed shared file storage that multiple supported compute clients can access.
- Object storage vs block storage: Object storage works with whole objects; block storage provides block devices that an operating system can use as disks.
- Versioning: Keeps multiple versions of an S3 object when enabled.
- Lifecycle policy: Automatically transitions or expires eligible objects according to rules.
- Pre-signed URL: A time-limited URL granting specific access to an S3 object.
- Durability: Likelihood that stored data will not be lost.
- Availability: Likelihood that the service or data is accessible when needed.

### Example

A payment service stores invoice PDFs in S3, while payment transaction records remain in PostgreSQL.

Important: S3 is not a relational database. Do not store a payment's authoritative transaction state only in an invoice file.

## 4. Database Services: RDS, Aurora and DynamoDB

### Subtopics

- RDS: Managed relational databases, including supported MySQL and PostgreSQL engines.
- Amazon Aurora: AWS-managed relational database engine compatible with MySQL or PostgreSQL.
- DynamoDB: Managed NoSQL key-value and document database.
- ElastiCache: Managed caching service for Redis-compatible and Memcached engines, depending on current engine availability.
- Read replica: A database copy used primarily to scale reads.
- Multi-AZ: A deployment design for availability and failover; exact behavior depends on the database configuration.
- Database backup: A recoverable copy of data.
- Point-in-time recovery: Restores a supported database to a specific point within its recovery window.
- Connection pooling: Reuses database connections to avoid creating too many connections.
- RDS vs DynamoDB: RDS is relational and supports SQL; DynamoDB is NoSQL and uses key-oriented access patterns.

### Example

```
Spring Boot Payment Service
        |
        +---- RDS PostgreSQL
        |       Payment records
        |
        +---- ElastiCache
        |       Cached payment lookups
        |
        +---- S3
                Invoice PDFs
```

Interview rule: Choose DynamoDB when its key-based access model and scaling characteristics fit your workload. Choose RDS when relational queries, joins, and relational transactions are a good fit.

## 5. Networking: VPC, Subnets, Security Groups and Route Tables

### Subtopics

- VPC (Virtual Private Cloud): A logically isolated network in AWS.
- Subnet: A range of IP addresses within a VPC, associated with an Availability Zone.
- Public subnet: Commonly has a route to an Internet Gateway; resources still need appropriate addressing and security configuration for internet access.
- Private subnet: Commonly lacks a direct route for inbound internet connections.
- Internet Gateway (IGW): Enables communication between a VPC and the internet when routes and other requirements are configured.
- NAT Gateway: Allows resources in a private subnet to initiate outbound IPv4 internet connections without making those resources directly internet-addressable.
- Security Group: Stateful virtual firewall associated with supported resources or network interfaces.
- Network ACL (NACL): Stateless subnet-level network access control.
- Route table: Determines where network traffic is directed.
- DNS: Resolves domain names to network addresses.
- VPC endpoint: Allows supported connections to AWS services without relying on a public internet route; the exact path depends on endpoint type and service.
- TLS certificate: Enables encrypted HTTPS communication.

### Common interview traps

- A private subnet is not automatically secure just because it is called private.
- Security groups are stateful; NACLs are stateless.
- A public IP alone does not guarantee internet connectivity.
- A NAT Gateway is primarily for outbound connectivity from private resources; it is not a general inbound connection mechanism.
- IAM permissions and network permissions solve different problems.

## 6. IAM and AWS Security

### Subtopics

- IAM user: An identity for a person or application when user credentials are appropriate.
- IAM role: An identity with permissions that a trusted entity can assume.
- IAM policy: Defines allowed or denied actions on resources under specified conditions.
- IAM group: Groups IAM users for permission management.
- Temporary credentials: Short-lived credentials obtained through an approved mechanism, commonly role assumption.
- Instance profile: A mechanism for providing an IAM role to supported EC2 instances.
- Execution role: Permissions used by a service or function to perform its work.
- Resource-based policy: A policy attached to a resource, such as an S3 bucket policy.
- KMS (Key Management Service): Manages cryptographic keys for supported encryption workflows.
- Secrets Manager: Stores and manages secrets such as database credentials and API keys.
- Systems Manager Parameter Store: Stores configuration values and can securely store supported secret values.
- Encryption at rest: Protects stored data.
- Encryption in transit: Protects data as it travels over a connection.

### Example

A Spring Boot service needs to upload a receipt to S3.

The preferred approach is to assign an IAM role with permission to write to the required bucket or prefix, rather than hardcoding long-lived AWS access keys in the source code.

Remember: Authentication identifies the principal; IAM authorization decides which AWS actions that principal may perform.

## 7. Messaging and Event-Driven AWS Services

### Subtopics

- SQS (Simple Queue Service): A managed message queue that decouples producers from consumers.
- SNS (Simple Notification Service): A managed publish/subscribe messaging service that can fan out notifications.
- EventBridge: Routes events to configured targets based on rules.
- Kinesis: A family of services for collecting and processing streaming data.
- Producer: Sends a message.
- Consumer: Receives and processes a message.
- Queue: Holds messages until consumers process or remove them according to the queue's semantics.
- Dead-letter queue (DLQ): Stores messages that fail processing according to configured redrive rules.
- Visibility timeout: Period during which a received SQS message is hidden from other consumers.
- Message retention: How long a message can remain available in a queue.
- Message deduplication: Prevents or suppresses duplicate processing or delivery according to the service and application design.
- At-least-once delivery: Consumers must be prepared for duplicates when the delivery model permits them.
- FIFO queue: SQS queue type supporting ordered processing within message groups and deduplication features, subject to service rules.

### Example: Payment event processing

```
Payment Service
      |
      v
     SQS
      |
      v
Receipt Worker
      |
      v
     S3
```

The payment service can submit a receipt-generation job without waiting for the receipt worker to finish.

### SQS vs SNS vs EventBridge

| Service     | Main purpose                            | Example                                              |
| ----------- | --------------------------------------- | ---------------------------------------------------- |
| SQS         | Queue and decouple work                 | Process payment receipts                             |
| SNS         | Publish and fan out notifications       | Notify multiple subscribers                          |
| EventBridge | Route events based on rules             | Route `PaymentSucceeded` events to different targets |
| Kinesis     | Streaming data ingestion and processing | Process a continuous stream of events                |

Common trap: SQS and SNS are not interchangeable. SQS holds work for consumers; SNS distributes published messages to subscribers. They can also be combined.

## 8. AWS Monitoring and Deployment

### Subtopics

- CloudWatch: Collects supported logs, metrics, and alarms.
- CloudTrail: Records AWS API activity for auditing and investigation.
- AWS X-Ray: Supports distributed tracing for instrumented applications and services.
- CloudFormation: Defines and manages AWS infrastructure using templates.
- Infrastructure as Code (IaC): Manages infrastructure through version-controlled definitions instead of manual-only configuration.
- CI/CD: Automates building, testing, and deploying software.
- Blue-green deployment: Maintains separate old and new environments and switches traffic between them.
- Canary deployment: Releases a change to a small portion of traffic before expanding.
- Rolling deployment: Gradually replaces existing instances or tasks with new ones.
- Health check: Determines whether a service or target is healthy enough to receive traffic.
- Secrets rotation: Replaces credentials periodically or when required.
- Disaster recovery: Restores services after a serious failure.
- RTO: Maximum targeted time to restore service.
- RPO: Maximum targeted amount of data loss measured in time.

### Example

For a Spring Boot service, CloudWatch can track error rates and CPU usage. An alarm can notify the team when failures rise above an agreed threshold.

## 9. Common AWS Interview Scenarios

### Subtopics

- Application suddenly gets more traffic: Use load balancing, horizontal scaling, and appropriate autoscaling policies.
- Application must run in multiple Availability Zones: Deploy redundant compute and configure appropriate load balancing and data-layer availability.
- Application needs to store images and PDFs: Use S3.
- Application needs a managed relational database: Consider RDS or Aurora.
- Application needs fast, short-lived cached lookups: Consider ElastiCache.
- Application needs background processing: Consider SQS with a consumer.
- Application needs to publish one event to multiple subscribers: Consider SNS or EventBridge depending on routing requirements.
- Application needs to run code on an event without managing servers: Consider Lambda.
- Application needs audit records of AWS API calls: Use CloudTrail.
- Application needs application logs and metrics: Use CloudWatch.
- Application needs to store secrets: Use Secrets Manager or another suitable managed configuration service.
- Application needs to survive an Availability Zone failure: Design compute, networking, and data layers for redundancy; simply creating multiple EC2 instances does not guarantee high availability.
