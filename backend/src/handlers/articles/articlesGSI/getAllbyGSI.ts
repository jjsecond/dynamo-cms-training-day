import { QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import localDynamoDbClient from '../../../lib/localDynamoDbClient';
import { Request, Response } from 'express';

export type Article = {
    pk: String;
    text: String;
    dateCreated: String;
    headline: String;
    subheadline: String;
    type: String;
    gsi1pk: String;
}


const getAllByGsi1 = async (req: Request, res: Response) => {


    const params = {
        TableName: 'local-backend-cms',
        IndexName: 'gsi1',
        KeyConditionExpression: 'gsi1pk = :v_type',
        ExpressionAttributeValues: {
          ':v_type': { S: `article` },
        },
    };

    try {
        const data = await localDynamoDbClient.send(new QueryCommand(params));
        console.log(data);
        if (data.Items === undefined) {
            return res.status(200).json({body: {msg:'no items matching'}});
          }
      
          return res.status(200).json({body: data.Items.map((item) => unmarshall(item))});
    } catch (err) {
        console.log(err);
        return err
    }

};

export default getAllByGsi1;

