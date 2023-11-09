import { DynamoDBClient, GetItemCommand, DeleteItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import localDynamoDbClient from '../../lib/localDynamoDbClient';
import { Request, Response } from 'express';

export type Article = {
    pk: String;
    text: String;
    dateCreated: String;
    headline: String;
    subheadline: String;
    type: String;
    gsi1pk: String;
};


const getAllEntities = async (req: Request, res: Response) => {

    const body = req.body;


    const params = {
        TableName: 'local-backend-cms',
    };

    try {
        const data = await localDynamoDbClient.send(new ScanCommand(params));
        const items = data.Items?.map((item) => unmarshall(item));
        return res.status(200).json({ body: items });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to retrieve items' });
    }

};

export default getAllEntities;