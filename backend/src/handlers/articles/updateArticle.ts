import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';
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


const updateAnArticle = async (req: Request, res: Response) => {

    const body = req.body;

    console.log('this is the body');
    console.log(body)

    const params = {
        TableName: 'local-backend-cms',
        Key:
            { pk:{S: body.pk }},
            UpdateExpression: 'SET headline = :e, subheadline = :lce, articleBody = :du, author = :au',
            ExpressionAttributeValues: {
              ':e': {
                S: body.headline,
              },
              ':lce': {
                S: body.subheadline,
              },
              ':du': {
                S: body.articleBody,
              },
              ':au' : {
                S: body.author,
              }
            }, 

    };

    try {
        console.log('article update attempt')
        const data = await localDynamoDbClient.send(new UpdateItemCommand(params));
        console.log(data);
        return res.status(200).json({ body: {msg: 'successfully updated' }});

    } catch (err) {
        console.log(err);
        return err
    }

};

export default updateAnArticle;