import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const localDynamoDbClient = new DynamoDBClient({
    region: 'us-east-1',
    // endpoint: "http://dynamo-db-local:8000", 
    credentials: {
        accessKeyId: 'local',
        secretAccessKey: 'local'
    }
});


const getAllArticles = async () => {
    const params = {
        TableName: 'local-backend-cms',
        Key: marshall({
            pk: { S: "article#JJJ16b01-f859-43f4-93f2-f9a94e788157" }
        })
    };

    try {
        const data = await localDynamoDbClient.send(new GetItemCommand(params));
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }

};

export default getAllArticles;

