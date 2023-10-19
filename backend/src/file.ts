// Import required AWS SDK clients and commands for Node.js
import { CreateTableCommand, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import seedTable from "./handlers/batchwrite/batchwrite";


const localDynamoDbClient = new DynamoDBClient({
    region: 'us-east-1',
    endpoint: "http://dynamodb-local:8000",
    credentials: {
        accessKeyId: 'local',
        secretAccessKey: 'local'
    }
});


// Set the parameters
export const params = {
  AttributeDefinitions: [
    {
      AttributeName: "pk", //ATTRIBUTE_NAME_1
      AttributeType: "S", //ATTRIBUTE_TYPE
    },
    // first global secondary index for rang key with date
    {
      AttributeName: "gsi1pk", //ATTRIBUTE_NAME_2
      AttributeType: "S", //ATTRIBUTE_TYPE
    },
    {
      AttributeName: "gsi1sk", // ATTRIBUTE_NAME_3 (sort key)
      AttributeType: "S", // Corrected to "RANGE" for a sort key
    },
    //the second secondary index and text sort key
    { 
      AttributeName: "gsi2pk", //ATTRIBUTE_NAME_2
      AttributeType: "S", //ATTRIBUTE_TYPE
    },
    {
      AttributeName: "gsi2sk", // ATTRIBUTE_NAME_3 (sort key)
      AttributeType: "S", // Corrected to "RANGE" for a sort key
    },
  ],
  KeySchema: [
    {
      AttributeName: "pk", //ATTRIBUTE_NAME_1
      KeyType: "HASH",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  TableName: 'local-backend-cms', //TABLE_NAME
  GlobalSecondaryIndexes: [
    {
      IndexName: "gsi1",
      KeySchema: [
        {
          AttributeName: "gsi1pk",
          KeyType: "HASH"
        },
        { AttributeName: "gsi1sk", KeyType: "RANGE" },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
      Projection: {
        ProjectionType: "ALL"
      }
    },
    {
      IndexName: "gsi2",
      KeySchema: [
        {
          AttributeName: "gsi2pk",
          KeyType: "HASH"
        },
        { AttributeName: "gsi2sk", KeyType: "S" },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
      Projection: {
        ProjectionType: "ALL"
      }
    }
  ]
};

export const run = async () => {
  try {
    const command = new ListTablesCommand({});
    const response = await localDynamoDbClient.send(command);
    if(!response.TableNames?.includes('local-backend-cms')){
        console.log(response)
    const data = await localDynamoDbClient.send(new CreateTableCommand(params));
    console.log('hi')
    console.log("Table Created", data);
    const batchWrite = seedTable();
    }else{
        console.log('table already created')
    }
  } catch (err) {
    console.log("Error", err);
  }
};