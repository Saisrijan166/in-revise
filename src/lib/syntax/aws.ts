import type { SyntaxSheet } from "./types";

export const aws: SyntaxSheet = {
  tagline: "The AWS CLI commands you run day to day against S3, EC2, Lambda and more.",
  baseline: "AWS CLI v2",
  lang: "bash",
  groups: [
    {
      title: "Config and profiles",
      rows: [
        {
          syntax: "aws configure",
          what: "Set key, secret, region, output",
          example: "aws configure",
        },
        {
          syntax: "aws configure --profile <name>",
          what: "Set up a named profile",
          example: "aws configure --profile prod",
        },
        {
          syntax: "--profile <name>",
          what: "Use a profile for one command",
          example: "aws s3 ls --profile prod",
        },
        {
          syntax: "--region <region>",
          what: "Override region",
          example: "aws ec2 describe-instances --region ap-south-1",
        },
        {
          syntax: "--output json|table|text",
          what: "Choose output format",
          example: "aws s3 ls --output table",
        },
        {
          syntax: "--query <jmespath>",
          what: "Filter output fields",
          example: "aws ec2 describe-instances --query 'Reservations[].Instances[].State.Name'",
        },
      ],
    },
    {
      title: "S3 (high-level)",
      rows: [
        { syntax: "aws s3 ls", what: "List buckets or keys", example: "aws s3 ls s3://my-bucket/" },
        {
          syntax: "aws s3 mb s3://<bucket>",
          what: "Make a bucket",
          example: "aws s3 mb s3://my-bucket",
        },
        {
          syntax: "aws s3 cp <src> <dst>",
          what: "Copy a file to/from S3",
          example: "aws s3 cp app.zip s3://my-bucket/",
        },
        {
          syntax: "aws s3 sync <src> <dst>",
          what: "Sync a folder (only changes)",
          example: "aws s3 sync ./build s3://my-bucket/site",
        },
        {
          syntax: "aws s3 rm <path>",
          what: "Delete object(s)",
          example: "aws s3 rm s3://my-bucket/old.zip",
        },
        {
          syntax: "aws s3 rb s3://<bucket>",
          what: "Remove a bucket",
          example: "aws s3 rb s3://my-bucket --force",
        },
        {
          syntax: "aws s3api <op>",
          what: "Low-level S3 API",
          example: "aws s3api get-bucket-policy --bucket my-bucket",
        },
      ],
      combos: [
        {
          label: "Upload a folder as a static site",
          code: `aws s3 sync ./dist s3://my-site \\
  --delete \\                      # remove files no longer local
  --cache-control "max-age=3600"
aws s3 ls s3://my-site --recursive --human-readable`,
        },
      ],
    },
    {
      title: "EC2",
      rows: [
        {
          syntax: "aws ec2 describe-instances",
          what: "List instances + state",
          example: "aws ec2 describe-instances --query 'Reservations[].Instances[].InstanceId'",
        },
        {
          syntax: "aws ec2 start-instances",
          what: "Start stopped instances",
          example: "aws ec2 start-instances --instance-ids i-0abc123",
        },
        {
          syntax: "aws ec2 stop-instances",
          what: "Stop running instances",
          example: "aws ec2 stop-instances --instance-ids i-0abc123",
        },
        {
          syntax: "aws ec2 run-instances",
          what: "Launch a new instance",
          example: "aws ec2 run-instances --image-id ami-123 --instance-type t3.micro --count 1",
        },
        {
          syntax: "aws ec2 describe-security-groups",
          what: "List firewall rules",
          example: "aws ec2 describe-security-groups",
        },
      ],
    },
    {
      title: "IAM",
      rows: [
        { syntax: "aws iam list-users", what: "List IAM users", example: "aws iam list-users" },
        {
          syntax: "aws iam list-roles",
          what: "List IAM roles",
          example: "aws iam list-roles --query 'Roles[].RoleName'",
        },
        {
          syntax: "aws iam attach-role-policy",
          what: "Attach a policy to a role",
          example:
            "aws iam attach-role-policy --role-name app --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess",
        },
        {
          syntax: "aws iam create-access-key",
          what: "New access key for a user",
          example: "aws iam create-access-key --user-name ci",
        },
      ],
    },
    {
      title: "Lambda",
      rows: [
        {
          syntax: "aws lambda list-functions",
          what: "List functions",
          example: "aws lambda list-functions --query 'Functions[].FunctionName'",
        },
        {
          syntax: "aws lambda invoke",
          what: "Call a function",
          example: "aws lambda invoke --function-name hello out.json",
        },
        {
          syntax: "aws lambda update-function-code",
          what: "Deploy new code",
          example:
            "aws lambda update-function-code --function-name hello --zip-file fileb://fn.zip",
        },
        {
          syntax: "aws lambda get-function",
          what: "Config + code location",
          example: "aws lambda get-function --function-name hello",
        },
      ],
      combos: [
        {
          label: "Invoke a Lambda with a JSON payload",
          code: `aws lambda invoke \\
  --function-name hello \\
  --payload '{"name":"Ayush"}' \\
  --cli-binary-format raw-in-base64-out \\
  out.json
cat out.json`,
        },
      ],
    },
    {
      title: "CloudWatch Logs",
      rows: [
        {
          syntax: "aws logs tail <group>",
          what: "Stream recent logs",
          example: "aws logs tail /aws/lambda/hello --follow",
        },
        {
          syntax: "aws logs describe-log-groups",
          what: "List log groups",
          example: "aws logs describe-log-groups",
        },
        {
          syntax: "aws logs filter-log-events",
          what: "Search log events",
          example: 'aws logs filter-log-events --log-group-name /app --filter-pattern "ERROR"',
        },
      ],
      combos: [
        {
          label: "Tail a Lambda's logs for the last 30 minutes",
          code: `aws logs tail /aws/lambda/hello \\
  --since 30m \\
  --follow \\
  --format short`,
        },
      ],
    },
    {
      title: "DynamoDB",
      rows: [
        {
          syntax: "aws dynamodb put-item",
          what: "Insert / overwrite an item",
          example: 'aws dynamodb put-item --table-name Users --item \'{"id":{"S":"1"}}\'',
        },
        {
          syntax: "aws dynamodb get-item",
          what: "Read one item by key",
          example: 'aws dynamodb get-item --table-name Users --key \'{"id":{"S":"1"}}\'',
        },
        {
          syntax: "aws dynamodb query",
          what: "Query by partition key",
          example: 'aws dynamodb query --table-name Users --key-condition-expression "id = :v"',
        },
        {
          syntax: "aws dynamodb scan",
          what: "Read a whole table (costly)",
          example: "aws dynamodb scan --table-name Users",
        },
      ],
    },
    {
      title: "SQS and identity",
      rows: [
        {
          syntax: "aws sts get-caller-identity",
          what: "Who am I? (account, ARN)",
          example: "aws sts get-caller-identity",
        },
        {
          syntax: "aws sqs send-message",
          what: "Put a message on a queue",
          example: "aws sqs send-message --queue-url <url> --message-body 'hello'",
        },
        {
          syntax: "aws sqs receive-message",
          what: "Read messages off a queue",
          example: "aws sqs receive-message --queue-url <url>",
        },
        {
          syntax: "aws sqs list-queues",
          what: "List queue URLs",
          example: "aws sqs list-queues",
        },
      ],
    },
  ],
};
