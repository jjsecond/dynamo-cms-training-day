import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
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
}


const geArticleById = async (req: Request, res: Response) => {


    const params = {
        TableName: 'local-backend-cms',
        Key:
            marshall({ pk: "article#dJJs16b01-f859-43f4-93f2-f9a94e78815" })

    };

    try {
        const data = await localDynamoDbClient.send(new GetItemCommand(params));
        console.log(data);
        if(data.Item !== undefined){
        return res.status(200).json({ body: unmarshall(data.Item) });
        }else{
            return res.status(200).json({ body: {msg: 'item does not exist' }});
        }

    } catch (err) {
        console.log(err);
        return err
    }

};

export default geArticleById;