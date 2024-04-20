
import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/app/lib/stripe'; // Use the centralized Stripe instance

export default async function createSession(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { email, priceId, domainUrl } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      customer_email: email, // Use the email from the request body
      mode: 'payment',
      success_url: `${domainUrl}/payment/success`,
      cancel_url: `${domainUrl}/payment/cancelled`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Failed to create session:', error);
    res.status(500).send('Failed to create session');
  }
}