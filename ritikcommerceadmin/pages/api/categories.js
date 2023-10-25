import { v4 as uuidv4 } from 'uuid';
import { ScanCommand, DynamoDBDocumentClient, UpdateCommand, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb"; import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.NEXT_AUTH_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);
const tableName = 'Category';

export default async function handle(req, res) {
  const { method } = req;

  if (method === 'GET') {

    const command = new ScanCommand({
      TableName: tableName,
    })

    try {
      const data = await docClient.send(command)
      res.json(data.Items);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve data from DynamoDB.' });
    }
  }

  if (method === 'POST') {
    const { name, parentCategory, properties } = req.body;

    // Create a new item in the DynamoDB table
    const command = new PutCommand({
      TableName: tableName,
      Item: {
        id: uuidv4().toString(),
        category: name,
        parentCategory,
        properties,
      },
    })

    try {
      await docClient.send(command)
      res.json('Category created successfully.');
    } catch (error) {
      res.status(500).json({ error: 'Failed to create a category in DynamoDB.' });
    }
  }

  if (method === 'PUT') {
    const { name, parentCategory, properties, id } = req.body;
    console.log(id);
    const command = new UpdateCommand({
      TableName: tableName,
      Key: {
        id: id.toString()
      },
      UpdateExpression: 'set category = :categoryname, parentCategory = :parentCategory, properties = :properties',
      ExpressionAttributeValues: {
        ':categoryname': name,
        ':parentCategory': parentCategory,
        ':properties': properties,
      },
      ReturnValues: 'ALL_NEW',
    })
    const response = await docClient.send(command);
    console.log(response);
    res.json('Category updated successfully.');
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
        res.json('Category deleted successfully.');
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete the category from DynamoDB.' });
      }
    }
  }
}