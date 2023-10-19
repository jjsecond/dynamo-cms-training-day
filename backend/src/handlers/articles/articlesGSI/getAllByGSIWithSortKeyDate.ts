import { QueryCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
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


const getAllByGSIWithSortKeyDate = async (req: Request, res: Response) => {
// gsipk2 is the date created and we will look between two dates to find al that fall in thos parameters

console.log(req)

const type = 'article'
const startDate = '2023-09-26T00:00:00.000Z'; // Replace with your start date
const endDate = '2023-12-31T00:00:00.000Z';   // Replace with your end date

    const params = {
        TableName: 'local-backend-cms',
        IndexName: 'gsi1',
        KeyConditionExpression: 'gsi1pk = :v_type AND gsi1sk BETWEEN :start_date and :end_date',
        ExpressionAttributeValues: {
          ':v_type': { S: type },
          ':start_date': { S: startDate },
          ':end_date': { S: endDate },
        },
    };

    try {
        const data = await localDynamoDbClient.send(new QueryCommand(params));
        // console.log(data);
        if (data.Items === undefined) {
            return res.status(200).json({body: {msg:'no items matching'}});
          }
      
          return res.status(200).json({body: data.Items.map((item) => unmarshall(item))});
    } catch (err) {
        console.log(err);
        return err
    }

};

export default getAllByGSIWithSortKeyDate;

