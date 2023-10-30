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
  await isAdminRequest(req, res);

  if (method === 'GET') {
    if (req.query?.id) {
      const command = new GetCommand({
        TableName: tableName,
        Key: {
          id: req.query.id,
        },
      });
      
      try {
        const response = await docClient.send(command);
        res.json(response.Item);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching item' });
      }
    } else {
      const command = new ScanCommand({
        TableName: tableName,
      });
      try {
        const response = await docClient.send(command);
        res.json(response.Items);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching items' });
      }
    }
  }

  if (method === 'PUT') {
    const { title, description, price, images, category, properties, id, specification,brand } = req.body;
    const command = new UpdateCommand({
      TableName: tableName,
      Key: {
        id: id.toString()
      },
      UpdateExpression: 'set title = :title, description = :description, price = :price, images = :images, category = :category, properties = :properties, specification = :specification, brand= :brand',
      ExpressionAttributeValues: {
        ':title': title,
        ':description': description,
        ':price': price,
        ':images': images,
        ':category': category,
        ':properties': properties,
        ':specification' : specification,
        ':brand' : brand,
      },
      ReturnValues: 'ALL_NEW',
    })
    try {
      const response = await docClient.send(command);
      res.json(response.Attributes);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to update the item in DynamoDB.' });
    }
  }

  if (method === 'POST') {
    const { title, description, price, images, category, properties,specification,brand } = req.body;
    const newId = uuidv4().toString();
    const command = new PutCommand({
      TableName: tableName,
      Item: {
        id: newId,
        title,
        description,
        price,
        images,
        category,
        properties,
        specification,
        brand,
      },
    })
    try {
      const response = await docClient.send(command);
      res.json(response.Item);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error creating item' });
    }
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      const command = new DeleteCommand({
        TableName: tableName,
        Key: {
          id: req.query.id.toString(),
        },
      })
      try {
        await docClient.send(command)
        res.json(true);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error deleting item' });
      }
    }
  }
}
