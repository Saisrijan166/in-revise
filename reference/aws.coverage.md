# Coverage: AWS
Reference: reference/aws.md  ·  Last updated: 20-10-2026

Every reference item (key list: the numbered sections, plus each question, pattern and "X vs Y" row inside them) appears in exactly
one of Mapped, Corrected or Dropped. A section whose parts went to different places has one row here (Corrected wins over
Mapped), and its other parts are listed under "Details placed elsewhere or cut". Sources for corrections are primary pages.

## Mapped
| Reference item (key + short title) | Landed in | Note |
|---|---|---|
| A0 Intro: Java backend focus, payment example (UPI, card, wallet) | concept aws-architecture-playbook (sayIt, Example Mermaid, Interview Qs) | The running payment service is the playbook's reference architecture |
| A1.E Example: Spring Boot payment service with RDS, ElastiCache, S3 | concept aws-architecture-playbook (Example Mermaid; tree playbook-app-layer, playbook-data-layer) |  |
| A2.T1 What each is: virtual servers, functions, container orchestration, managed Kubernetes | comparison `ec2-vs-lambda-vs-fargate` (gist); comparison `ecs-vs-eks` (gist) | Table "EC2 vs Lambda vs ECS vs EKS" split into the two comparisons |
| A2.T3 Best fit: long-running, short event-driven, containers without Kubernetes, Kubernetes ecosystem | concept `compute-choice` (points, verdict); comparison `ecs-vs-eks` (row "Best for") |  |
| A2.E How would you deploy a Java backend (Docker image, ECS on Fargate, ALB, Auto Scaling); "one possible design" | concept `compute-choice` (sayIt, Interview Q 1, trap) |  |
| A3.1 Object storage vs block storage | comparison `s3-vs-ebs-vs-efs` (row Storage type, How you use it); glossary `object-storage`, `block-storage` | extended to object vs block vs file |
| A3.E Invoice PDFs in S3, transactions in PostgreSQL; S3 is not a relational database | concept `s3` (trap; points: Whole objects only) | uses the running example (receipts, RDS) |
| A4.1 RDS vs DynamoDB and the interview rule for choosing | concept `choosing-a-database` (sayIt, trap); comparison `rds-vs-dynamodb` | Q "when DynamoDB, when RDS" |
| A4.E Payment service with RDS PostgreSQL, ElastiCache and S3; A4.E (part: whole-system picture) Payment service with RDS, ElastiCache, S3 | concept `choosing-a-database` (Example Mermaid, Interview Q); concept aws-architecture-playbook (Example Mermaid) | ElastiCache holds merchant config (the site's running example) instead of "payment lookups" The database-choice part stays with choosing-a-database |
| A5.1 Trap: a private subnet is not automatically secure | concept vpc-and-subnets (trap) |  |
| A5.2 Trap: security groups stateful, NACLs stateless | concept security-groups-and-nacls (points, trap on ephemeral ports, comparison row) |  |
| A5.3 Trap: a public IP alone does not give internet access | concept internet-and-nat-gateways (trap, point "Internet access needs") |  |
| A5.5 Trap: IAM and network permissions solve different problems | concept security-groups-and-nacls (point "Not IAM", bullet linking iam-policy-evaluation) |  |
| A6.E Spring Boot uploads a receipt to S3 with a role, no hardcoded keys | concept `sts-and-temporary-credentials` (Example, Java SDK v2, ECS task role; trap) | credential chain itself linked to `aws-sdk-for-java` |
| A6.1 Authentication vs authorisation (principal vs allowed actions) | concept `iam-policy-evaluation` (first point, first Step, Interview Q); glossary `principal-term` |  |
| A7.E Payment service → SQS → receipt worker → S3 | concept `sqs` (Why, Steps, Java worker writing receipts to S3) | ASCII drawing not copied |
| A7.T1 SQS: queue and decouple work (receipts) | comparison `sqs-vs-sns-vs-eventbridge-vs-kinesis` (column a) |  |
| A7.T2 SNS: publish and fan out (many subscribers) | comparison `sqs-vs-sns-vs-eventbridge-vs-kinesis` (column b); concept `sns` (Mermaid) |  |
| A7.T4 Kinesis: streaming ingestion and processing | comparison `sqs-vs-sns-vs-eventbridge-vs-kinesis` (column d); concept `kinesis` |  |
| A7.1 Trap: SQS and SNS are not interchangeable; they can be combined | concept `sns` (trap, IQ "SQS or SNS", IQ "SQS behind SNS") | Pair SQS vs SNS also in the 4-way comparison |
| A8.E Example: CloudWatch tracks error rate and CPU; alarm notifies the team | concept cloudwatch (Example: 5xx alarm to SNS; Interview Q 1) |  |
| A9 Common AWS interview scenarios | concept aws-architecture-playbook (picker table) | Every row links its owning concept |
| A9.1 Sudden traffic increase: load balancing, horizontal scaling, autoscaling policies; A9.1 Sudden traffic increase: load balancing, horizontal scaling, autoscaling | concept `auto-scaling-groups` (Interview Q 1); aws-architecture-playbook (picker row; Interview Q "traffic jumps tenfold") → auto-scaling-groups, elastic-load-balancing | Scenario row itself owned by `aws-architecture-playbook` |
| A9.2 Run in multiple AZs (redundant compute, LB, data layer); A9.2 Run in multiple AZs | concept `regions-and-azs` (How it works table, Interview Q 3); aws-architecture-playbook (picker row) → regions-and-azs | each layer links its owner concept Depth lives in regions-and-azs |
| A9.3 Store images and PDFs: use S3; A9.3 Store images and PDFs: S3 | concept `s3` (Why, Example, comparison verdict); aws-architecture-playbook (picker row) → s3 | also spine step 1 |
| A9.4 Managed relational database: RDS or Aurora; A9.4 Managed relational database: RDS or Aurora | concept `choosing-a-database` (picker table); comparison `rds-vs-aurora`; aws-architecture-playbook (picker row) → choosing-a-database |  |
| A9.5 Fast short-lived cached lookups: ElastiCache; A9.5 Fast short-lived cached lookups: ElastiCache | concept `elasticache`; `choosing-a-database` (picker table); aws-architecture-playbook (picker row) → elasticache |  |
| A9.6 Background processing: SQS with a consumer; A9.6 Background processing: SQS with a consumer | concept `sqs` (Why it exists, spine step 1); aws-architecture-playbook (picker row) → compare sqs-vs-sns-vs-eventbridge-vs-kinesis | The playbook row (operations unit) should link `card:sqs` |
| A9.7 One event to many subscribers: SNS or EventBridge | aws-architecture-playbook (picker row) → compare sqs-vs-sns-vs-eventbridge-vs-kinesis |  |
| A9.8 Run code on an event without managing servers: Lambda; A9.8 Run code on an event without servers: Lambda | concept `lambda` (why); concept `compute-choice` (Interview Q 2); aws-architecture-playbook (picker row) → lambda | Scenario row itself owned by `aws-architecture-playbook` |
| A9.9 Audit records of AWS API calls: CloudTrail | aws-architecture-playbook (picker row) → cloudtrail |  |
| A9.10 Application logs and metrics: CloudWatch | aws-architecture-playbook (picker row) → cloudwatch |  |
| A9.12 Survive an AZ failure; many EC2 instances alone are not HA; A9.12 Survive an AZ failure; many EC2 instances alone are not HA | concept `regions-and-azs` (trap, Interview Q 3); aws-architecture-playbook (picker row) → regions-and-azs | The trap itself is owned by regions-and-azs; the playbook does not repeat it |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| A1 part: Availability Zone ("an isolated group of infrastructure within a Region") | Vague: no data centres, power, distance or count | One or more data centres with their own power and networking, linked by low-latency fibre; at least 3 per Region, within 100 km (as of 20-10-2026) | https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html ; https://aws.amazon.com/about-aws/global-infrastructure/regions_az/ |
| A2 (part: NLB) "Operates primarily at Layer 4 and handles TCP/UDP/TLS traffic patterns" | Loose ("primarily") and incomplete protocol list | NLB works at layer 4; target groups support TCP, UDP, TCP_UDP, TLS, QUIC and TCP_QUIC (20-10-2026) | https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html ; https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-target-groups.html |
| A2.T2 Who manages what: "ECS: AWS manages orchestration" (and Lambda "no direct server management") | Implies no server work with ECS; on the EC2 capacity option you still choose, size and manage the instances | ECS: AWS runs the orchestrator; servers are yours on EC2, AWS-managed on Fargate or ECS Managed Instances | https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html |
| A3 part: Pre-signed URL ("a time-limited URL granting specific access"); A3 part: Lifecycle policy ("transitions or expires eligible objects") | Loose: the URL grants no access of its own. It acts with the signer's permissions, lasts at most 7 days (SDK/CLI) or 12 hours (console), and ends early when the signer's temporary credentials expire.; Naming: S3 calls it a lifecycle configuration made of rules; "lifecycle policy" is the EFS term. Behaviour was right. | concept `s3` (table, Defaults, Interview Q), tree `s3-presigned-url`, glossary `presigned-url`; "S3 Lifecycle rule" in concept `s3`, tree `s3-lifecycle-rule`, glossary `s3-lifecycle-rule` (aka "lifecycle rule") | https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html ; https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html |
| A4 part: ElastiCache, "Redis-compatible and Memcached engines, depending on current engine availability"; A4 part: Multi-AZ, "exact behaviour depends on the database configuration" | Vague and outdated: Valkey is missing; Vague; hides the two different RDS options | Engines are Valkey, Redis OSS and Memcached (as of 20-10-2026); Multi-AZ DB instance: one synchronous standby that serves no reads. Multi-AZ DB cluster: a writer and two readable standbys in three AZs | https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html ; https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html , https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts.html |
| A5 part: Public subnet; A5 part: Private subnet; A5 part: NAT Gateway; A5 part: DNS | "Commonly has a route to an IGW": AWS defines a public subnet by that route, it is not just common; "Commonly lacks a direct route for inbound internet connections": loose; the route is missing in both directions; Described as IPv4-only, one kind, placement not stated; Generic definition only, no AWS service named | public = its route table has a direct route to an internet gateway; private = no direct route to an internet gateway; needs NAT to go out; isolated = no routes outside the VPC; NAT gateways handle IPv4 and IPv6 (NAT64); public type (default, in a public subnet with an Elastic IP) and private type; zonal per AZ, or regional mode since 19-11-2025; native IPv6 outbound uses an egress-only internet gateway; Amazon Route 53: hosted zones, alias vs CNAME, eight routing policies, health checks, TTL | https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html ; https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-basics.html ; https://aws.amazon.com/about-aws/whats-new/2025/11/aws-nat-gateway-regional-availability/ ; https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html |
| A5.4 Trap: NAT is "primarily" for outbound | "Primarily" suggests some inbound use; AWS says connections must always start inside the VPC | NAT gateway: outbound-started connections only; replies return, no unsolicited inbound | https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html |
| A6 (part: IAM user) "identity for a person or application when user credentials are appropriate"; A6 (part: execution role) "permissions used by a service or function to perform its work" | Suggests IAM users are a normal choice for people and apps; Loose: on ECS the execution role is the agent's role (image pull, logs, secrets), not the app's; the app uses the task role | AWS requires federation (IAM Identity Center) for people and roles for workloads; IAM users only for cases roles cannot cover (tools without role support, emergency access); Lambda execution role = function's permissions; ECS task role = app's calls; ECS task execution role = agent's calls (comparison `task-role-vs-task-execution-role`) | https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html ; https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html ; https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html ; https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html |
| A7 (part: Kinesis) "a family of services"; A7 (part: message deduplication) "prevents or suppresses duplicates according to the service and application design"; A7 (part: FIFO queue) "ordered processing ... subject to service rules" | Loose and dated: Firehose and the analytics service no longer carry the Kinesis name; Vague; no service, scope or window; Vague; no numbers | Kinesis Data Streams, Amazon Data Firehose (renamed 09-02-2024), Managed Service for Apache Flink (renamed from Kinesis Data Analytics 30-08-2023); SQS FIFO only: MessageDeduplicationId or content-based (SHA-256 of body), 5-minute interval; standard queues need an idempotent consumer; Order per message group ID; 300 API calls/s per action, 3,000 msg/s with batching, more in high-throughput mode | https://aws.amazon.com/about-aws/whats-new/2024/02/amazon-data-firehose-formerly-kinesis-data-firehose/ ; https://aws.amazon.com/about-aws/whats-new/2023/08/amazon-managed-service-apache-flink/ ; https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessage.html ; https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html |
| A7.T3 EventBridge "routes events based on rules" | Outdated since 24-09-2026: rules belong to the "Custom Event Bus - Classic"; the relaunched Custom Event Bus routes to subscribers and retains events 1-365 days | Concept keeps rules (Classic, default bus) as the main model, plus one point and one tree note on the new bus | https://aws.amazon.com/about-aws/whats-new/2026/09/eventbridge-relaunches-custom-event-buses/ ; https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-custom-bus-what-is.html |
| A8 (part: AWS X-Ray) "Supports distributed tracing for instrumented applications" | Outdated by omission: X-Ray SDKs and daemon entered maintenance mode on 25-02-2026 (security fixes only); AWS recommends OpenTelemetry | Concept x-ray-and-tracing: instrument with OpenTelemetry (ADOT or the upstream Java agent) and send traces to X-Ray; trap states it | https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-daemon-timeline.html |
| A9.11 Store secrets: "Secrets Manager or another suitable managed configuration service" | Vague; no rule for which service holds what | Credentials that rotate go in Secrets Manager; config (and low-cost SecureString values) in Parameter Store, which AWS itself says should not replace Secrets Manager for credentials | https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| IaaS vs PaaS vs SaaS with AWS examples; deployment models (cloud, hybrid, on-premises) | comparison `iaas-vs-paas-vs-saas`; tree under `cloud-computing-models` | Classic opening question; scope note |
| Local Zone, Wavelength Zone, edge location, Outposts, opt-in Regions, AZ IDs | tree under `regions-and-azs`; glossary | Interviewers ask "what else besides Regions and AZs" |
| Choosing a Region (compliance, latency, cost, services) | concept `regions-and-azs` (bullet, Interview Q) | Common question; AWS Architecture Blog |
| Who patches what on EC2 vs RDS vs Lambda/S3; control types | concept `shared-responsibility-model` (table); tree | The model's real interview angle |
| Well-Architected Framework (six pillars, Tool, lenses) | concept `well-architected-framework` | Standard checklist for AWS design answers |
| Pricing models: On-Demand, Savings Plans (4 types), Reserved Instances, Spot, Free Tier credits, cost tools, data transfer cost | concept `aws-pricing-models`; comparison; tree; glossary | Cost questions are common; reference has only "pay-as-you-go" |
| Fault tolerance (term) | glossary `fault-tolerance` | Often paired with high availability |
| Instance type naming and families, AMI, user data, IMDSv2, instance store, Graviton | concept `ec2`; tree; glossary | Common EC2 interview questions (stop vs terminate, AMI, choosing a type) |
| Stop vs terminate behaviour | concept `ec2` (trap, Interview Q) | Frequently asked |
| Launch template, min/desired/max, scaling policy types, health check type, cooldown, lifecycle hooks | concept `auto-scaling-groups`; tree | Needed to answer ASG questions correctly |
| GWLB, Classic Load Balancer status, listeners, target groups, cross-zone, sticky sessions, deregistration delay, ALB health check defaults | concept `elastic-load-balancing`; comparison `alb-vs-nlb-vs-gwlb`; tree; glossary | ALB vs NLB is a standard question; defaults are often asked |
| Lambda cold start fixes (SnapStart, provisioned concurrency), reserved concurrency, invocation types, quotas, Java runtimes | concept `lambda`; tree; glossary | Cold starts are a standard Java Lambda question |
| ECR, task definition, ECS service, ECS Managed Instances, EKS Auto Mode, EKS fee | concept `containers-ecs-eks-fargate`; comparison `ecs-vs-eks` | Needed for ECS vs EKS answers |
| ECS Express Mode, Elastic Beanstalk, App Runner closed to new customers | concept `compute-choice`; tree | Current status of "simple deploy" services |
| Amazon CloudFront (distribution, origin, cache behaviour, cache key, OAC, signed URLs/cookies, invalidation, TTL defaults, ACM in us-east-1) | concept `cloudfront`; tree; glossary | CDN in front of S3 and the ALB is a standard interview design point; the reference has no CDN |
| S3 storage classes (Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier classes, Express One Zone) | tree under `s3`; Interview Q | most asked S3 question |
| Strong read-after-write consistency (since 01-12-2020) | concept `s3` (points); glossary | common interview check; old answers still say "eventual" |
| Block Public Access on and ACLs off for new buckets (since 04-2023); SSE-S3 on all uploads (since 05-01-2023) | concept `s3` (points, How it works) | current secure defaults |
| Multipart upload; max object 50 TB (since 02-12-2025), single PUT 5 GB | concept `s3` (table, Defaults, Interview Q); glossary | asked ("upload a file larger than 100 MB / 5 GB"); the 5 TB limit quoted by many prep sites is outdated |
| S3 event notifications | concept `s3` (table); tree | links S3 to SQS, SNS, Lambda, EventBridge |
| EBS volume types (gp3, io2 Block Express, st1/sc1), snapshots, Multi-Attach | concept `ebs-and-efs`; tree | commonly asked EBS details |
| Instance store vs EBS | concept `ebs-and-efs` (Interview Q, links `ec2`) | classic interview question |
| EFS file system types and storage classes; Amazon FSx family | tree under `ebs-and-efs` | shows the file-storage options in one line each |
| Multi-AZ vs read replicas as a comparison, with the "standby serves no reads" trap | comparison `multi-az-vs-read-replicas`; `rds` trap | A heat-3 interview question |
| JVM DNS cache TTL of 60 s or less for RDS failover | concept `rds` (How it works, Interview Q) | A Java-specific failover trap from the RDS guide |
| Aurora cluster volume (six copies, three AZs), replica lag, writer/reader endpoints | concept `aurora`; comparison `rds-vs-aurora`; tree | The standard "Aurora vs RDS" answer |
| Aurora Serverless (named Serverless v2 until 04-2026), scaling to 0 ACUs; Aurora Global Database | concept `aurora`; tree | Current product name and features |
| DynamoDB keys, GSI vs LSI (as points and an Interview Q, not a comparison), read consistency, 400 KB items, conditional writes | concept `dynamodb` | What interviewers ask about DynamoDB |
| DynamoDB capacity modes, Streams, global tables, DAX, single-table design, TTL | tree, glossary | One line each |
| ElastiCache Serverless vs node-based, public endpoint (Valkey 9.0+), cluster mode, MemoryDB | concept `elasticache`; tree | Current deployment options |
| Purpose-built picker (DocumentDB, Neptune, Keyspaces, Timestream, OpenSearch Service, Redshift) | concept `choosing-a-database`; tree | The "which database for what" question; Timestream LiveAnalytics is closed to new customers since 20-06-2025 |
| Route 53 (hosted zones, alias vs CNAME at the apex, routing policies, health checks, TTL) | concept route-53 | Commonly asked ("What routing policies does Route 53 support?"); reference only had "DNS" |
| Amazon API Gateway (REST vs HTTP vs WebSocket, authorizers, throttling, timeouts, VPC link) | concept api-gateway; comparisons rest-api-vs-http-api, api-gateway-vs-alb | Standard front door for Java/Lambda APIs; asked in serverless design questions |
| Isolated subnet, reserved IPs per subnet, CIDR sizes /16-/28, RFC 1918 ranges | concept vpc-and-subnets; tree cidr-block | Interviewers ask subnet sizing and layout |
| VPC peering vs Transit Gateway | concept vpc-and-subnets (Interview Q); tree | Commonly asked (GeeksforGeeks Q12) |
| Regional NAT gateway (19-11-2025), private NAT gateway, NAT instance (legacy), egress-only IGW, Elastic IP | concept internet-and-nat-gateways; tree | Current product facts; HA answer changes with regional mode |
| NAT per-GB cost and VPC endpoints as the saving | concepts internet-and-nat-gateways, vpc-endpoints-privatelink | Common cost question |
| Security group referencing (ALB SG → app SG → DB SG), defaults of SGs and NACLs, ephemeral port ranges | concept security-groups-and-nacls; tree | Core of "how do you lock down the database" answers |
| Interface endpoint cost, private DNS, endpoint policies, endpoint services (own service via PrivateLink) | concept vpc-endpoints-privatelink; tree | Completes the endpoint answer |
| ALB JWT validation and OIDC/Cognito sign-in | comparison api-gateway-vs-alb | Current ALB feature; avoids the outdated "ALB has no auth" claim |
| Root user, MFA, IAM Identity Center, ARN | `iam-basics` points; tree `iam-root-user`; glossary | Basic IAM words every interviewer uses |
| AWS managed vs customer managed vs inline policies | tree `iam-policy-kinds` | Commonly asked; AWS best practice path |
| Policy evaluation order: implicit deny, explicit deny, SCP/RCP, boundaries, session policies; cross-account needs both sides | concept `iam-policy-evaluation` (Steps); tree policy types | Core of "why is my request denied" questions |
| IAM Access Analyzer | `iam-basics` Interview Q; `iam-policy-evaluation` bullet | AWS's least-privilege tool |
| STS AssumeRole: trust vs permissions policy, session 1 h default, max 12 h, chaining 1 h | `sts-and-temporary-credentials` points | Defaults interviewers ask |
| ECS task role vs task execution role | comparison `task-role-vs-task-execution-role` | Very common confusion for Spring Boot on ECS |
| EKS Pod Identity vs IRSA | tree `eks-pod-identity`, `eks-irsa`; glossary `eks-irsa` | Current AWS recommendation for EKS |
| GitHub Actions OIDC role, no stored keys | `sts-and-temporary-credentials` point | Modern CI practice |
| Envelope encryption, 4 KB Encrypt limit, key policy rule, rotation behaviour, key types | `kms-and-encryption` | Standard KMS interview questions |
| S3 SSE-S3 / SSE-KMS / SSE-C (SSE-C off on new buckets since 04-2026) | tree under `kms-and-encryption`; Java SSE-KMS example | Dated change; common question |
| RDS encryption only at creation (snapshot-copy workaround) | `kms-and-encryption` point | Common trap |
| Secrets Manager managed vs Lambda rotation, Java caching (1 h refresh), ECS `secrets` field read at start | `secrets-and-parameters` | Practical Spring Boot on ECS details |
| Spring Cloud AWS 4.x `spring.config.import=aws-secretsmanager:` | `secrets-and-parameters` Example | Spring Boot 4 way to load secrets |
| Parameter Store standard vs advanced tiers | tree `ps-standard-tier`, `ps-advanced-tier`; comparison | Limits often asked |
| AWS WAF (attach points, managed rule groups, rate-based rules), Shield Standard vs Advanced | `edge-security` | Edge protection for a public payment API |
| ACM: free on integrated services, auto-renewal, 198-day validity since 18-02-2026, exportable certs | `edge-security` | Dated change; TLS was only a one-line term in the reference |
| Cognito user pool | tree `cognito-user-pool`; glossary | End-user sign-in for APIs |
| AWS Step Functions (ASL, Retry/Catch, Standard vs Express, saga) | concept `step-functions` | Planned addition; orchestration and saga rollback are asked for payment flows |
| SQS max message size 1 MiB since 04-08-2025 (was 256 KiB) | concept `sqs` (Defaults) | Changed limit; old 256 KiB figure is still widely quoted |
| SQS long polling, delay queue, Extended Client Library | concept `sqs` (point, IQ); tree | Common interview follow-ups |
| SQS Standard vs FIFO comparison | comparison `sqs-standard-vs-fifo` | Classic interview pair |
| SNS filter policies, subscription DLQ, FIFO topics (SQS standard subscribers since 14-09-2023), message size 256 KiB to 1 MiB | concept `sns`; tree | Current behaviour |
| EventBridge Scheduler (scheduled rules are legacy), Pipes, archive and replay, partner sources, retry policy 24 h / 185 | concept `eventbridge`; tree; glossary | Current AWS guidance |
| Kinesis shards, partition key, retention 24 h to 365 days, on-demand vs provisioned, enhanced fan-out, MSK | concept `kinesis`; tree; glossary | Needed to answer "Kinesis vs SQS" |
| Kinesis Data Streams vs Firehose | comparison `kinesis-data-streams-vs-firehose` | Common confusion |
| AWS SDK for Java 2.x, default credentials chain, client reuse, timeouts, Spring Cloud AWS 4.x, LocalStack | concept aws-sdk-for-java; tree sdk-*, spring-cloud-aws-starters, localstack-testcontainers | Java backend interviews ask how the app calls AWS without keys; SDK 1.x reached end of support 31-12-2025 |
| CloudWatch vs CloudTrail | comparison cloudwatch-vs-cloudtrail | One of the most asked AWS pairs |
| CloudWatch agent for memory metrics (trap) | concept cloudwatch (trap, Interview Q 2); tree cw-agent | Common wrong answer |
| Management vs data events, event history 90 days, log file validation, AWS Config | concept cloudtrail; tree ct-*, aws-config-recorder | Needed to answer audit questions correctly |
| Trace, segment, sampling, trace header, Application Signals | concept x-ray-and-tracing; tree xray-*, adot, cw-application-signals | Interview vocabulary for tracing |
| Change sets, drift detection, StackSets, CDK constructs, SAM, Terraform state | concept infrastructure-as-code; comparison cloudformation-vs-cdk-vs-terraform | IaC questions name these |
| ECS rolling defaults, circuit breaker, alarm rollback, bake time, ECS built-in blue/green (17-07-2025) and linear/canary (30-10-2025), GitHub Actions OIDC | concept deployments-on-aws; tree | Current AWS deployment options |
| Four DR strategies, cross-Region data copies, data-plane failover, DR testing | concept disaster-recovery; tree dr-* | AWS DR whitepaper; asked in scenario rounds |
| Picker rows: CloudFront, VPC endpoints, Step Functions, KMS, DynamoDB; "say this, not that" table; serverless API question | concept aws-architecture-playbook | Common needs the reference's list missed |

## Dropped
| Reference item | Reason (rare / advanced / duplicate / unverifiable) |
|---|---|
| (no whole item) | |

### Details placed elsewhere or cut, inside items listed above
| Reference item part | What happened |
|---|---|
| A1 part: cloud computing (renting resources) | also: concept `cloud-computing-models` (points, Why); glossary `cloud-computing-term` |
| A1 part: scalability | also: concept `cloud-computing-models` (points, trap); glossary `scalability` |
| A1 part: elasticity | also: concept `cloud-computing-models` (points, trap, Example); glossary `elasticity` |
| A1 part: vertical scaling | also: concept `cloud-computing-models` (points, Interview Q); glossary `vertical-scaling` |
| A1 part: horizontal scaling | also: concept `cloud-computing-models` (points, Interview Q); glossary `horizontal-scaling` |
| A1 part: Region | also: concept `regions-and-azs` (points, Interview Q); tree `aws-region-node`; glossary `aws-region` |
| A1 part: high availability | also: concept `regions-and-azs` (trap, table, sayIt); glossary `high-availability` |
| A1 part: pay-as-you-go | also: concept `aws-pricing-models` (On-Demand side of comparison); glossary `pay-as-you-go` |
| A1 part: shared responsibility model | also: concept `shared-responsibility-model`; glossary `shared-responsibility-term` |
| A1 (part: IAM) IAM controls who can access AWS resources | also: concept `iam-basics` (hook, Why); glossary `iam` |
| A1 (part: least privilege) grant only what a task needs | also: concept `iam-basics` (Example policy, Interview Q); glossary `least-privilege` |
| A1 part: AWS ("a cloud platform offering many services") | cut: duplicate: the tech's own name; the tech summary says what AWS is |
| A2 (part: EC2) Virtual server, you manage OS, software and runtime | also: concept `ec2` (hook, why, sayIt); comparison `ec2-vs-lambda-vs-fargate` (row "You manage") |
| A2 (part: Lambda) Run code on events, no servers to manage; use: payment webhook | also: concept `lambda` (hook, why) |
| A2 (part: ECS) Run containerised apps; Fargate runs tasks without servers; use: Dockerised Spring Boot | also: concept `containers-ecs-eks-fargate` (hook, points, sayIt) |
| A2 (part: EKS) AWS-managed Kubernetes | also: concept `containers-ecs-eks-fargate`; comparison `ecs-vs-eks`; tree `amazon-eks` |
| A2 (part: Docker, container) Image packages app and dependencies; container is an isolated runtime | also: concept `containers-ecs-eks-fargate` (hook, why, example) |
| A2 (part: orchestration) Placement, health, scaling, replacement | also: glossary `container-orchestration`; concept `containers-ecs-eks-fargate` (why) |
| A2 (part: Fargate) Serverless compute for containers; does not mean no servers | also: concept `containers-ecs-eks-fargate` (trap); tree `aws-fargate` |
| A2 (part: Auto Scaling) Adds or removes capacity by policies | also: concept `auto-scaling-groups` |
| A2 (part: load balancer) Distributes traffic across targets | also: concept `elastic-load-balancing` (hook, why) |
| A2 (part: ALB) Layer 7, HTTP/HTTPS routing | also: comparison `alb-vs-nlb-vs-gwlb`; tree `application-load-balancer` |
| A3 part: S3 (object storage for files, backups, logs, images, documents) | also: concept `s3` (hook, Why); glossary `amazon-s3` |
| A3 part: S3 bucket (a container for objects) | also: concept `s3` (points: Bucket + key); glossary `s3-bucket` |
| A3 part: S3 object (data with a key and metadata) | also: concept `s3` (points); glossary `object-key`, `object-storage` |
| A3 part: Versioning (keeps multiple versions when enabled) | also: concept `s3` (How it works table); tree `s3-versioning`; glossary `s3-versioning`, `delete-marker` |
| A3 part: Durability (likelihood data is not lost) | also: concept `s3` (points: S3 Standard 11 nines); glossary `durability-term` |
| A3 part: Availability (likelihood data is accessible) | also: concept `s3` (points: S3 Standard 99.99% availability) |
| A3 part: EBS (block storage attached to EC2) | also: concept `ebs-and-efs` (hook, points); tree `ebs-volume`; glossary `amazon-ebs`, `block-storage` |
| A3 part: EFS (managed shared file storage) | also: concept `ebs-and-efs` (hook, points); tree `efs-file-system`; glossary `amazon-efs`, `file-storage` |
| A4 part: RDS, managed relational databases | also: concept `rds` (hook, points); tree `rds-engines` |
| A4 part: Amazon Aurora, MySQL/PostgreSQL compatible | also: concept `aurora`; comparison `rds-vs-aurora` |
| A4 part: DynamoDB, NoSQL key-value and document database | also: concept `dynamodb` |
| A4 part: Read replica, a copy used mainly to scale reads | also: comparison `multi-az-vs-read-replicas`; tree `rds-read-replica`; glossary `read-replica` |
| A4 part: Database backup | also: tree `rds-automated-backups`, `rds-db-snapshot`; concept `rds` (Defaults) |
| A4 part: Point-in-time recovery | also: concept `rds` (point, Interview Q); glossary `point-in-time-recovery` |
| A4 part: Connection pooling | also: concept `rds` (point, Example: Hikari pool size vs max_connections); tree `rds-proxy-node` |
| A4 part: RDS vs DynamoDB, relational/SQL vs NoSQL key access | also: comparison `rds-vs-dynamodb` (embedded in `choosing-a-database`) |
| A5 part: VPC | also: concept vpc-and-subnets (hook, points); glossary amazon-vpc |
| A5 part: Subnet | also: concept vpc-and-subnets (point "Subnet", Interview Q on two AZs) |
| A5 part: Route table | also: concept vpc-and-subnets (points); tree vpc-route-table, main-route-table, custom-route-table; glossary vpc-route-table |
| A5 part: Internet Gateway | also: concept internet-and-nat-gateways; comparison internet-gateway-vs-nat-gateway; glossary internet-gateway |
| A5 part: Security Group | also: concept security-groups-and-nacls; comparison security-group-vs-nacl; glossary security-group |
| A5 part: Network ACL | also: concept security-groups-and-nacls; comparison security-group-vs-nacl; glossary network-acl |
| A5 part: VPC endpoint | also: concept vpc-endpoints-privatelink (table: gateway vs interface); tree gateway-endpoint, interface-endpoint, endpoint-policy, endpoint-service |
| A5 part: TLS certificate | also: concept edge-security (security unit, ACM) |
| A5 (part: TLS certificate) enables HTTPS | also: concept `edge-security` (ACM row, points, tree `aws-certificate-manager`) |
| A6 (part: IAM role) identity a trusted entity assumes | also: comparison `iam-user-vs-role`; tree `iam-role`; concept `sts-and-temporary-credentials` |
| A6 (part: IAM policy) allow or deny actions on resources under conditions | also: concept `iam-basics` (points: Effect, Action, Resource, Condition; Example JSON); tree `iam-policy-kinds` |
| A6 (part: IAM group) groups users for permissions | also: tree `iam-group`; concept `iam-basics` (point, Interview Q "can a role join a group") |
| A6 (part: resource-based policy) e.g. S3 bucket policy | also: comparison `identity-vs-resource-based-policy`; tree `resource-based-policy`; glossary |
| A6 (part: temporary credentials) short-lived, via role assumption | also: concept `sts-and-temporary-credentials` (hook, points, Mermaid); glossary `temporary-security-credentials` |
| A6 (part: instance profile) gives an EC2 instance a role | also: tree `ec2-instance-profile`; concept `sts-and-temporary-credentials` (Interview Q) |
| A6 (part: KMS) manages keys for encryption | also: concept `kms-and-encryption`; glossary `aws-kms` |
| A6 (part: encryption at rest) | also: concept `kms-and-encryption` (envelope Steps, S3/EBS/RDS bullets, RDS point); glossary |
| A6 (part: encryption in transit) | also: concept `kms-and-encryption` (point "In transit: TLS"); glossary |
| A6 (part: Secrets Manager) stores DB credentials and API keys | also: concept `secrets-and-parameters`; comparison `secrets-manager-vs-parameter-store`; tree `aws-secrets-manager` |
| A6 (part: Systems Manager Parameter Store) config values, can store secret values | also: comparison `secrets-manager-vs-parameter-store`; tree `ssm-parameter-store` (tiers); point SecureString |
| A7 (part: SQS) managed queue that decouples producers from consumers | also: concept `sqs` (hook, Why it exists); glossary `amazon-sqs` |
| A7 (parts: producer, consumer, queue) | also: concept `sqs` (Steps: send, receive, delete) |
| A7 (part: DLQ) | also: concept `sqs` (point, Steps); tree `sqs-dead-letter-queue`; glossary `dead-letter-queue`, `redrive-policy`, `max-receive-count` |
| A7 (part: visibility timeout) | also: concept `sqs` (trap, Steps, Defaults); glossary `sqs-visibility-timeout`; tree note |
| A7 (part: message retention) | also: concept `sqs` (Defaults: 4 days, 1 min to 14 days) |
| A7 (part: at-least-once delivery) | also: concept `sqs` (point, IQ on duplicates); glossary `at-least-once-delivery`, `idempotent-consumer` |
| A7 (part: SNS) publish/subscribe with fan-out | also: concept `sns`; glossary `amazon-sns`, `fan-out` |
| A7 (part: EventBridge) | also: concept `eventbridge` |
| A7 table "SQS vs SNS vs EventBridge" (with Kinesis row) | also: comparison `sqs-vs-sns-vs-eventbridge-vs-kinesis` |
| A8 (part: health check) Decides if a target may receive traffic | also: concept `elastic-load-balancing` (points, Defaults, Interview Q 2); concept `auto-scaling-groups` (trap) |
| A8 (part: secrets rotation) replace credentials periodically | also: concept `secrets-and-parameters` (Rotation point); tree `sm-managed-rotation`, `sm-lambda-rotation`; glossary `secret-rotation` |
| A8 (part: CloudWatch) Collects logs, metrics, alarms | also: concept cloudwatch (hook, points, How it works) |
| A8 (part: CloudTrail) Records API activity for audit | also: concept cloudtrail; comparison cloudwatch-vs-cloudtrail |
| A8 (part: CloudFormation) Templates define infrastructure | also: concept infrastructure-as-code; comparison cloudformation-vs-cdk-vs-terraform |
| A8 (part: Infrastructure as Code) Version-controlled definitions | also: concept infrastructure-as-code (hook, Why, Interview Q 1); glossary infrastructure-as-code-term |
| A8 (part: CI/CD) Automates build, test, deploy | also: concept deployments-on-aws (Example Steps, sayIt); glossary ci-cd |
| A8 (parts: blue-green, canary, rolling deployment) | also: comparison rolling-vs-blue-green-vs-canary (embedded in deployments-on-aws); tree rolling-deployment, blue-green-deployment, canary-deployment |
| A8 (part: health check) Target healthy enough for traffic | also: concept deployments-on-aws (link to elastic-load-balancing, which owns health-check mechanics); tree ecs-health-check-grace |
| A8 (parts: disaster recovery, RTO, RPO) | also: concept disaster-recovery (points, table, Interview Q 1); glossary rto, rpo |
| A9.11 Store secrets: Secrets Manager or another managed config service | also: aws-architecture-playbook (picker row) → secrets-and-parameters |

## Owner addition (20-10-2026): Integration templates: AWS (reference/aws.md from line 284; keys I4–I7)

Independently verified on 20-10-2026.

### Mapped
| Reference item | Landed in | Note |
|---|---|---|
| I4. Don't memorise the AWS SDK: first know which service (S3 files, RDS database, SQS queue, EC2 server, Lambda function, CloudWatch monitoring) | concept `aws-code-templates` (hook); service list already covered by `s3`, `rds`, `sqs`, `ec2`, `lambda`, `cloudwatch` | |
| I4.1 Think path Java, SDK, S3, bucket | `aws-code-templates` (point "Shape", tree `tpl-sdk-call-shape`) | |
| I4.2 Code: S3Client.builder().region(AP_SOUTH_1), PutObjectRequest bucket + key, putObject with RequestBody.fromString | `aws-code-templates` S3 block (with output) | |
| I4.3 Remember chain: S3Client, PutObjectRequest, bucket + key, putObject() | `aws-code-templates` points "Shape" and "S3" | |
| I4.4 Read: GetObjectRequest + getObjectAsBytes into ResponseBytes<GetObjectResponse> | `aws-code-templates` S3 block (`getObjectAsBytes(get).asUtf8String()`) | |
| I5. SQS: how to send a message | `aws-code-templates` SQS block | |
| I5.1 Think path Java, SqsClient, sendMessage(), queue | `aws-code-templates` sayIt; tree `tpl-sqs-send-receive-delete` | |
| I5.2 Code: SqsClient builder, SendMessageRequest with queueUrl and messageBody, sendMessage | `aws-code-templates` SQS block (consumer-lambda builder form; queue URL from getQueueUrl) | Added receive + delete, which interviewers ask next |
| I5.3 Remember chain: SqsClient, SendMessageRequest, queueUrl, messageBody, sendMessage() | `aws-code-templates` sayIt; glossary `queue-url` | |
| I6. RDS: usually no AWS-specific Java code | `aws-code-templates` trap + Interview Q "Do you need the AWS SDK to use RDS from Java?" | |
| I6.1 Think path Spring Boot, JPA/Hibernate, JDBC, RDS PostgreSQL/MySQL | `aws-code-templates` Interview Q; tree `tpl-rds-over-jdbc` | |
| I6.3 Then normal JPA: `interface UserRepository extends JpaRepository<User, Long>` | Mapped (already covered by the Spring Boot concept `spring-data-repositories`); AWS concept says "JDBC and JPA" | Not repeated in AWS |
| I6.4 Distinction: RDS is managed DB infrastructure; app uses normal JDBC/JPA | `aws-code-templates` trap and Interview Q; `rds` hook | |
| I7. S3 + Spring Boot: Controller, Service, S3Client, bucket | `aws-code-templates` Interview Q "How do you upload a file to S3 from Spring Boot?" | |
| I7.1 FileService with injected S3Client and upload(fileName, content) via putObject | `aws-code-templates`: plain-SDK call is the S3 block; Spring wiring shown by the Spring Cloud AWS block (`S3Template` injected into a `@Service`) | The injected-S3Client service would repeat the S3 block |

### Corrected
| Reference item | What was wrong | Fixed to | Source URL |
|---|---|---|---|
| I6.2 Configuration: spring.datasource.url / username=USER / password=PASSWORD in the properties file | A hardcoded password in config is a security mistake (and the site's secrets trap says so) | URL to the RDS endpoint; username and password loaded from Secrets Manager through `spring.config.import=aws-secretsmanager:...`; IAM database authentication listed as the no-password option | https://docs.awspring.io/spring-cloud-aws/docs/4.2.0/reference/html/index.html ; https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.Connecting.Java.html |

### Added beyond the reference
| New item | Landed in | Why |
|---|---|---|
| SQS receiveMessage (long polling) + deleteMessage with receipt handle | `aws-code-templates` SQS block; glossary `receipt-handle` | Send alone is half the template; "when is the message deleted" is the follow-up |
| Spring Cloud AWS 4.2 S3Template / SqsTemplate / @SqsListener (ON_SUCCESS deletes) | `aws-code-templates` Spring block + Interview Q; glossary `s3-template`, `sqs-template`, `sqs-listener` | The Spring way, asked in Spring Boot interviews; verified on 4.2.0 jars and reference |
| Picker table linking existing skeletons (pre-signed URL, conditional putItem, SSE-KMS, Lambda handler, client timeouts) | `aws-code-templates` How it works | One coding section without repeating code that other concepts own |

### Dropped
| Reference item | Reason |
|---|---|
| (none) | |
