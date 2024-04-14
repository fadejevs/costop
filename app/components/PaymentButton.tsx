// "use client";

// import { useEffect, useState } from 'react';
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

// export default function PaymentButton() {
//   const { isAuthenticated, isLoading } = useKindeBrowserClient();
//   const [isButtonLoading, setButtonLoading] = useState(false);

//   useEffect(() => { 
//     // Redirect to sign-in page if not authenticated and loading is finished
//     if (!isLoading && isAuthenticated === false) {
//       window.location.href = '/auth/signin';
//     }
//   }, [isAuthenticated, isLoading]);

//   const handleCheckout = async () => {
//     setButtonLoading(true);
//     try {
//       const res = await fetch('app/api/checkout/create-session', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       const data = await res.json();
//       window.location.href = data.url;
//     } catch (error) {
//       console.error("Failed to create checkout session:", error);
//     } finally {
//       setButtonLoading(false);
//     }
//   };

//   // Render a loading state until isLoading is false
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <button onClick={handleCheckout} disabled={isButtonLoading}>
//       {isButtonLoading ? 'Redirecting...' : 'Buy Access'}
//     </button>
//   );
// }

"use client"
import { useState } from 'react';

export default function PaymentButton() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout/create-session", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: 'price_1P3KyfKks4pzFwyLOtsKQd3n', domainUrl: window.location.origin }) // Ensure this matches expected body in your API
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Payment initiation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handlePayment} disabled={loading}>
      {loading ? 'Processing...' : 'Buy Lifetime Access'}
    </button>
  );
}