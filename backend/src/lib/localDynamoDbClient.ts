import { DynamoDBClient } from '@aws-sdk/client-dynamodb';


const localDynamoDbClient = new DynamoDBClient({
    region: 'us-east-1',
    endpoint: "http://dynamodb-local:8000",
    credentials: {
        accessKeyId: 'local',
        secretAccessKey: 'local'
    }
});

export default localDynamoDbClient;