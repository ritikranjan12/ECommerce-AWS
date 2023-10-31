

import { GetCommand,ScanCommand,DynamoDBDocumentClient ,UpdateCommand,PutCommand,DeleteCommand} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({
    region: process.env.NEXT_AWS_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
      },
});
  
const docClient = DynamoDBDocumentClient.from(client);

export default async function handle(req,res) {
    if(req.method === 'POST'){

        const {text,author,pId} = req.body
        const newId = uuidv4().toString();
        const command = new PutCommand({
          TableName: 'Reviews',
            Item: {
              id: newId,
              pId:pId.toString(),
              text,
              author,
              createdAt: new Date().toISOString(),
            }, 
        })
        await docClient.send(command);
        res.status(200).json("Submitted")
    }
}