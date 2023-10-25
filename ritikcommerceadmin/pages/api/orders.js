import { ScanCommand,DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.NEXT_AUTH_AWS_REGION,
  credentials: {
      accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
    },
});

const docClient = DynamoDBDocumentClient.from(client);
const tableName = 'Orders';

export default async function handler(req, res) {
  // Set up parameters for the DynamoDB query
  const command = new ScanCommand({
    TableName: tableName,
  })

  try {
    const response = await docClient.send(command);
    res.json(response.Items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve data from DynamoDB.' });
  }
}
