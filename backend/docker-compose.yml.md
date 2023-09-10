version: '3'

services:
  dynamodb:
    image: amazon/dynamodb-local
    hostname: dynamodblocal
    container_name: dynamodb-local
    command: "-jar DynamoDBLocal.jar -sharedDb -dbPath /data"
    volumes: 
      - ./dynamo-data:/data
    ports:
      - "8080:8080"
    expose:
      - "8000"