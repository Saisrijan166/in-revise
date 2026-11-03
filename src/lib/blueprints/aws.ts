import type { Blueprint } from "./types";
import { CLASSDEFS, legendOf } from "./shared";

export const aws: Blueprint = {
  tagline: "How a request reaches a typical AWS app — edge, network, compute, data and ops.",
  legend: legendOf([
    "Global & edge",
    "Compute",
    "Storage & data",
    "Network & security",
    "Integration & ops",
  ]),
  alt:
    "A system map of AWS for a typical web app. Global and edge: a user resolves DNS at Route 53 and hits " +
    "CloudFront (CDN); everything runs in a Region split into Availability Zones. Network and security: " +
    "CloudFront forwards to an Application Load Balancer inside a VPC with public and private subnets; IAM " +
    "controls permissions and Security Groups act as firewalls. Compute: EC2 instances, ECS or EKS " +
    "containers, or Lambda functions, scaled by Auto Scaling. Storage and data: S3 for objects, RDS for " +
    "SQL, DynamoDB for NoSQL and ElastiCache for caching; CloudFront serves static files from S3. " +
    "Integration and ops: API Gateway fronts Lambda, SQS and SNS decouple services, CloudWatch monitors, " +
    "and CloudFormation provisions it all as code.",
  baseline: "AWS (core services)",
  chart: `flowchart TD
  subgraph EDGE["1 . Global and edge"]
    direction TB
    user(["User"]):::f
    user --> r53["Route 53: DNS"]:::f
    r53 --> cf["CloudFront: CDN"]:::f
    reg["Region -> Availability Zones"]:::f
  end

  subgraph NETSEC["2 . Networking and security"]
    direction TB
    alb["Load Balancer (ALB)"]:::x
    vpc["VPC: public / private subnets"]:::x
    iam["IAM: permissions"]:::x
    sg["Security Groups"]:::x
  end
  cf --> alb
  alb --> vpc
  reg -.-> vpc
  iam -.->|controls| vpc

  subgraph COMPUTE["3 . Compute"]
    direction LR
    ec2["EC2"]:::c
    ecs["ECS / EKS"]:::c
    lam["Lambda (serverless)"]:::c
    asg["Auto Scaling"]:::c
  end
  vpc --> ec2
  vpc --> ecs
  alb -.-> lam
  asg -.-> ec2
  sg -.-> ec2

  subgraph DATA["4 . Storage and data"]
    direction LR
    s3[("S3: objects")]:::d
    rds[("RDS: SQL")]:::d
    ddb[("DynamoDB: NoSQL")]:::d
    cache["ElastiCache"]:::d
  end
  ec2 --> rds
  ecs --> ddb
  cf -.->|static| s3
  ec2 -.-> cache

  subgraph INT["5 . Integration and ops"]
    direction LR
    apigw["API Gateway"]:::o
    qs["SQS / SNS"]:::o
    cw["CloudWatch"]:::o
    cfn["CloudFormation / IaC"]:::o
  end
  apigw --> lam
  lam --> qs
  ec2 -.-> cw
  cfn -.-> vpc
${CLASSDEFS}`,
};
