FROM node:alpine AS build-js
COPY ./src/Service.Host/client /repo/client-src
WORKDIR /repo/client-src
RUN npm install
RUN npm run build

FROM microsoft/dotnet:2.1-sdk AS build
COPY ./src /repo/src
COPY ./tests /repo/tests
COPY --from=build-js /repo/client-src/build /repo/src/Service.Host/client/build
RUN apt-get update && apt-get install -y zip
WORKDIR /repo
RUN dotnet test tests/Integration.Tests/
RUN dotnet test tests/Unit.Tests/
WORKDIR /repo/src/Service.Host
RUN dotnet restore
RUN dotnet lambda package --configuration Release --framework netcoreapp2.1 --output-package package-21.zip

FROM alpine:3.6
RUN apk -v --update add \
        python \
        py-pip \
        groff \
        less \
        mailcap \
        && \
    pip install --upgrade awscli==1.14.5 s3cmd==2.0.1 python-magic && \
    apk -v --purge del py-pip && \
    rm /var/cache/apk/*
COPY --from=build /repo/src/Service.Host/package-21.zip /app/
COPY ./deployment/aws/lambda.yaml /app/
COPY ./deployment/deploy.sh /app/
CMD aws s3 cp /app/package-21.zip s3://linn-lambdas/ && \
    aws cloudformation deploy --stack-name projects-lambda --region eu-west-1 --template-file /app/lambda.yaml --capabilities=CAPABILITY_IAM 
