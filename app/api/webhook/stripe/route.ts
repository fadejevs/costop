import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Your webhook processing logic here
      console.log('Stripe webhook received:', req.body);

      // Sending a success response
      res.status(200).end();
    } catch (error) {
      console.error('Error processing Stripe webhook:', error);

      // Sending an error response
      res.status(500).end();
    }
  } else {
    // Handling other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
