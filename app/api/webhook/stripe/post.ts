// import { NextApiRequest, NextApiResponse } from 'next';
// import { stripe } from '../../../../utils/stripe';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// // Handle POST requests
// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   const event = req.body;

//   // Handle payment_intent.succeeded event
//   if (event.type === 'payment_intent.succeeded') {
//     const paymentIntent = event.data.object as import('stripe').Stripe.PaymentIntent;
//     const customerEmail = paymentIntent.receipt_email;

//     try {
//       const user = await prisma.user.findFirst({
//         where: {
//           email: customerEmail,
//         },
//       });

//       if (!user) {
//         console.error('User not found for email:', customerEmail);
//         res.status(404).send('User not found');
//         return;
//       }

//       // Update the user's lifetimeAccess to true
//       await prisma.user.update({
//         where: { id: user.id },
//         data: {
//           lifetimeAccess: true,
//         },
//       });
//     } catch (error) {
//       console.error('Error updating user lifetimeAccess:', error.message);
//       res.status(500).send(`Error updating user lifetimeAccess: ${error.message}`);
//       return;
//     }
//   }

//   // Handle other events if needed
  
//   res.status(200).json({ received: true });
// }