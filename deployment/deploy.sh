#!/bin/sh
aws s3 cp /app/package.zip s3://linn-lambdas/
aws cloudformation deploy --stack-name projects-lambda --region eu-west-1 --template-file /app/lambda.yaml --capabilities=CAPABILITY_IAM -env buildNumber=1