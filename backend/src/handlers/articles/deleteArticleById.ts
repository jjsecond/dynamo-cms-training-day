import { DynamoDBClient, GetItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
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


const deleteArticleById = async (req: Request, res: Response) => {

    const body = req.body;
    console.log(body);

    const params = {
        TableName: 'local-backend-cms',
        Key:
            marshall({ pk: body.id })

    };

    try {
        const data = await localDynamoDbClient.send(new DeleteItemCommand(params));
        console.log(data)
        return res.status(200).json({ body: { msg: 'item deleted' } });
    } catch (err) {
        console.log(err);
        return err;
    }

};

export default deleteArticleById;