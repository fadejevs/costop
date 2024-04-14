import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import prisma from '@/app/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// New way to disable Next.js default body parser using route segment config
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers['stripe-signature'] as string;

  if (!sig) {
    console.error('No Stripe Signature found.');
    res.status(400).send('No Stripe Signature found.');
    return;
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const email = session.customer_email as string;

        let user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: email,
              stripeCustomerId: session.customer as string | null,
              id: session.id,
            },
          });
        }

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            lifetimeAccess: true,
          },
        });
        console.log(`Access granted for ${email}`);
      }
      res.status(200).json({ received: true });
    } catch (error: any) {
      console.error(`Webhook Error: ${error.message}`);
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  });
}
