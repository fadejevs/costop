import Link from 'next/link';

export default function tos() {
  return (
    <>
      <style jsx>{`
        .container {
          margin: auto;
          width: 100%;
          max-width: 640px; /* Adjusted to match max-w-md */
          padding: 16px; /* Similar to p-4 in Tailwind */
          text-align: center;
        }

        .backLink {
          display: inline-block;
          margin-bottom: 16px;
          font-size: 1.125rem; /* Similar to text-lg in Tailwind */
          color: #4a5568; /* Similar to text-gray-700 in Tailwind */
          background-color: #e2e8f0; /* Similar to hover:bg-gray-200 in Tailwind */
          padding: 8px;
          border-radius: 0.375rem; /* Similar to rounded-md in Tailwind */
          text-decoration: none;
        }

        .title {
          font-size: 1.875rem; /* Similar to text-3xl in Tailwind */
          font-weight: bold;
          margin-bottom: 16px;
        }

        .subtitle {
          font-size: 1.5rem; /* Similar to text-2xl in Tailwind */
          font-weight: 600; /* Similar to font-semibold in Tailwind */
          margin-bottom: 8px;
        }

        .text {
          font-size: 0.875rem; /* Similar to text-sm in Tailwind */
          color: #718096; /* Similar to text-gray-500 in Tailwind */
          margin-bottom: 16px;
        }

        .boldText {
          font-weight: bold;
        }
      `}</style>
      <section className="container">
        <Link href="/" legacyBehavior>
          <a className="backLink">← Back</a>
        </Link>
        <h1 className="title">Terms and Conditions for Co-Stop</h1>
        <p className="text">Last Updated: May 15, 2024</p>
        <p className="text">Welcome to Co-Stop!</p>
        <p className="text">These Terms of Service (&quot;Terms&quot;) govern your use of the Co-Stop website at https://costop.in (&quot;Website&quot;) and the services provided by Co-Stop. By using our Website and services, you agree to these Terms.</p>
        <h2 className="subtitle">1. Description of Co-Stop</h2>
        <p className="text">Co-Stop is a platform that allows users to discover nearby coworking and work-from-spaces, and connect with likeminded individuals with the use of JavaScript.</p>
        <h2 className="subtitle">2. Ownership and Usage Rights</h2>
        <p className="text">When you purchase a subscription and/or pass from Co-Stop, you gain the right to use the platform and its features for the remainder of the subscription and/or pass period. You own all of the on-platform data you have created and/or entered but do not have the right to resell your subscription and/or pass. We offer a full refund within 7 days of purchase.</p>
        <h2 className="subtitle">3. User Data and Privacy</h2>
        <p className="text">We collect and store user data, including name, email, and payment information, as necessary to provide our services. We will never pass on personal information to any third party.</p>
        <h2 className="subtitle">4. Non-Personal Data Collection</h2>
        <p className="text">We use web cookies to collect non-personal data for the purpose of improving our services and user experience.</p>
        <h2 className="subtitle">5. Governing Law</h2>
        <p className="text">These Terms are governed by the laws of the European Union.</p>
        <h2 className="subtitle">6. Updates to the Terms</h2>
        <p className="text">We may update these Terms from time to time. Users will be notified of any changes via email.</p>
        <p className="text">For any questions or concerns regarding these Terms of Service, please contact us at https://twitter.com/costops</p>
        <p className="text">Thank you for using Co-Stop!</p>
      </section>
    </>
  );
}

