

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
  
export const docClient = DynamoDBDocumentClient.from(client);


export async function DetailedProducts(featuredid){
  const command = new GetCommand({
      TableName: 'Product',
      Key: {
        id: featuredid,
      },
    });
    const response = await docClient.send(command);
    return response.Item;
}
export async function featuredProducts(featuredid){
    const command = new GetCommand({
        TableName: 'Product',
        Key: {
          id: featuredid,
        },
      });

      const response = await docClient.send(command);
        return response.Item;
}

export async function newProductsfromDB(){
    const command = new ScanCommand({
        TableName: "Product",
        Limit: 10,
        ScanIndexForward: false,
      });

      const response = await docClient.send(command);
      
        return response.Items;
}
export async function AllFeaturedProductsfromDB(){
  const command = new ScanCommand({
    TableName: "Product",
  });

  const response = await docClient.send(command);
  const newresponse = response.Items.filter(item => item.featured===true
  )
  return newresponse;
}
export async function AllProductsfromDB(){
  const command = new ScanCommand({
      TableName: "Product",
    });

    const response = await docClient.send(command);
      return response.Items;
}

export async function getAllCategory(){
  const command = new ScanCommand({
    TableName: 'Category',
  })
  const response = await docClient.send(command);
  
  return response.Items;
}

export async function getCategory(Catid){
  const command = new GetCommand({
    TableName: 'Category',
    key: {
      id: Catid,
    }
  })
  const response = await docClient.send(command);
  return response.Item;
}
export async function ProductsFromDB(){
    const command = new ScanCommand({
        TableName: "Product",
        ScanIndexForward: false,
      });

      const response = await docClient.send(command);
        return response.Items;
}

export async function PostOrder (data) {
  const {line_items,name,email,city,postalCode,
    streetAddress,country} = data;
    
    const newId = uuidv4().toString();
  const command = new PutCommand({
    TableName: 'Orders',
      Item: {
        id: newId,
        line_items,
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        paid: 'false',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      
  })
  const response  = await docClient.send(command);
  return newId;
}

export async function UpdateOrder (id) {
  const command = new UpdateCommand({
    TableName: 'Orders',
    Key: {
      id: id.toString()
    },
    UpdateExpression: 'set paid = :paid, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':paid': 'true',
      ':updatedAt': new Date().toISOString(),
    },
    ReturnValues: 'ALL_NEW',
  })
  await docClient.send(command);
}

export async function getReviews(){
  const command = new ScanCommand({
      TableName: 'Reviews',
    });
    const response = await docClient.send(command);
      return response.Items;
}