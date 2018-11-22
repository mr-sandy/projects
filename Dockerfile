FROM node:alpine AS build-js
COPY ./src/Service.Host/client /repo/client-src
WORKDIR /repo/client-src
RUN npm install
RUN npm rebuild node-sass
RUN npm run build


# FROM microsoft/dotnet:2.1-sdk AS build
# COPY ./src /repo/src
# COPY ./tests /repo/tests
# COPY --from=build-js /repo/client-src/build /repo/src/Service.Host/client/build
# WORKDIR /repo
# # RUN dotnet test tests/Integration.Tests/
# # RUN dotnet test tests/Unit.Tests/
# # RUN apt-get update && apt-get install -y zip
# WORKDIR /repo/src/Service.Host
# RUN dotnet restore
# RUN dotnet lambda package --configuration Release --framework netcoreapp2.1 --output-package package.zip

#FROM node:carbon-alpine
#COPY --from=build /repo/src/Linn.Api.Ifttt/bin/release/netcoreapp2.1/package.zip /app/
#COPY serverless.yml /app/
#WORKDIR /app
#RUN npm install -g serverless
#ENTRYPOINT [ "serverless" ]
#CMD [ "deploy", "--force" ]