import { BatchWriteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const localDynamoDbClient = new DynamoDBClient({
    region: 'us-east-1',
    endpoint: "http://dynamodb-local:8000",
    credentials: {
        accessKeyId: 'local',
        secretAccessKey: 'local'
    }
});

const seedTable = async () => {
    const command = new BatchWriteItemCommand({
        RequestItems: {
            "local-backend-cms": [{
                PutRequest: {
                    Item: {
                        pk: { S: "article#da616b01-f859-43f4-93f2-fJJJJJJJ" },
                        gsi1pk: { S: "article" },
                        gsi1sk: {S: "2023-04-26T15:40:16.896Z"},
                        gsi2pk:{S: "article"},
                        gsi2sk: {S: "Tommy is good"},
                        dateCreated: { S: "2023-04-26T15:40:16.896Z" },
                        text: { S: "This is the body" },
                        headline: { S: "headline One" },
                        subheadline: { S: "sub headline one" },
                        type: { S: "article" }
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        pk: { S: "article#dJJs16b01-f859-43f4-93f2FFFFFF" },
                        gsi1pk: { S: "article" },
                        gsi1sk: {S: "2023-05-26T15:40:16.896Z"},
                        gsi2pk:{S: "article"},
                        gsi2sk: {S: "Tina is good"},
                        dateCreated: { S: "2023-05-26T15:40:16.896Z" },
                        text: { S: "What you got" },
                        headline: { S: "headline two" },
                        subheadline: { S: "sub headline two" },
                        type: { S: "article" }
                    }
                }
            }, 
            {
                PutRequest: {
                    Item: {
                        pk: { S: "article#ddd616b01-f859-43f4-93f2-KKKKKK" },
                        gsi1pk: { S: "article" },
                        gsi1sk: {S: "2023-08-26T15:40:16.896Z"},
                        gsi2pk:{S: "article"},
                        gsi2sk: {S: "Sandra is good"},
                        dateCreated: { S: "2023-08-26T15:40:16.896Z" },
                        text: { S: "Come at me bro" },
                        headline: { S: "headline three" },
                        subheadline: { S: "sub headline three" },
                        type: { S: "article" }
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        pk: { S: "article#ddd616b01-f859-43f4-93f2-WWWWWWW" },
                        gsi1pk: { S: "article" },
                        gsi1sk: {S: "2023-10-26T15:40:16.896Z"},
                        gsi2pk:{S: "article"},
                        gsi2sk: {S: "Garu is good"},
                        dateCreated: { S: "2023-10-26T15:40:16.896Z" },
                        text: { S: "I HAVE a sort of the in 10th month" },
                        headline: { S: "headline fourth" },
                        subheadline: { S: "sub headline fourth" },
                        type: { S: "article" }
                    }
                }
            },
            ],
        }
    },);

    try{
    const data= await localDynamoDbClient.send(command);
    console.log(data)
    }catch(err){
        console.log(err)
        return null;
    }
};

export default seedTable;