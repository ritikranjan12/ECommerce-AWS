const stripe = require('stripe')(process.env.STRIPE_SK);
import {buffer} from 'micro';
import { UpdateOrder } from '@/db';
const endpointSecret = "we_1O7PrYSFhLTLc5m43dN7U7vh";

export default async function Handler(req,res) {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      console.log(event.data.object);
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        console.log("updating");
        await UpdateOrder(orderId)
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
  api: {bodyParser:false,}
};
