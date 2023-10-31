const stripe = require('stripe')(process.env.STRIPE_SK);
import {PostOrder, featuredProducts} from  '../../db';

export default async function handler(req,res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }
  const {
    name,email,city,
    postalCode,streetAddress,country,
    cartProducts,
  } = req.body;
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  let productsInfos = []
  for (const id of uniqueIds)  {
      productsInfos.push(await featuredProducts(id))
  }
  

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p.id.toString() === productId);
    const quantity = productsIds.filter(id => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'INR',
          product_data: {name:productInfo.title},
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  const data = {
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country
  }
  const orderId = await PostOrder(data);



  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
    metadata: {orderId:orderId.toString(),test:'ok'},
  });

  res.json({
    url:session.url,
  })

}