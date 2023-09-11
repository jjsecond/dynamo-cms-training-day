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


const GSISkContains = async (req: Request, res: Response) => {
// gsipk2 is the date created and we will look between two dates to find all that fall in thos parameters
const substring = 'Jenny'

    const params = {
        TableName: 'local-backend-cms',
        IndexName: 'gsi1',
        KeyConditionExpression: 'gsi1pk = :v_type AND gsi1sk BETWEEN :start_date and :end_date',
        FilterExpression: 'contains(gsi1skTwo, :substring)', // Check if gsi1sk contains the substring
        ExpressionAttributeValues: {
          ':substring': { S: substring }, // Substring you want to search for
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

export default GSISkContains;