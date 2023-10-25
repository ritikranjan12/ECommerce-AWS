import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import { GetCommand,ScanCommand,DynamoDBDocumentClient ,UpdateCommand,PutCommand,DeleteCommand} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({
  region: process.env.NEXT_AUTH_AWS_REGION,
  credentials: {
      accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
    },
});

const docClient = DynamoDBDocumentClient.from(client);
const tableName = 'Product';

export default async function handle(req, res) {
    const { method } = req;


    if (method === 'POST') {
        // const { title, description, price, images, category, properties } = req.body;
        // const newId = uuidv4().toString();
        // const command = new PutCommand({
        //   TableName: tableName,
        //   Item: {
        //     id: newId,
        //     title,
        //     description,
        //     price,
        //     images,
        //     category,
        //     properties,
        //   },
        // })
        // try {
        //   const response = await docClient.send(command);
        //   res.json(response.Item);
        // } catch (error) {
        //   console.error('Error:', error);
        //   res.status(500).json({ error: 'Error creating item' });
        // }
      }

}