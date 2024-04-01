import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import prisma from "./lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.costop.in"),
  title: "Looking for a workspace? | Co-Stop",

  description:
    "Find and book nearby coworking spaces and cafes instantly. Save hours on missed work.",
  keywords:
    "Co-working finder, cafes near me, best co-working spaces near me, best cafes near me, best cafes for work, coworking space booking, deep-work spots, co-working places, co-working for companies, co-working for development teams, nearby co-working places",
  openGraph: {
    type: "website",
    url: "https://www.costop.in",
    title: "Looking for a workspace? | Co-Stop",

    description:
      "Find and book nearby coworking spaces and cafes instantly. Save hours on missed work.",

    images: [
      {
        url: "https://www.costop.in/images/cover.png",
        width: 1200,
        height: 800,
        alt: "Co-Stop Cover Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://twitter.com/costops",
  },
  icons: {
    icon: "logo.svg",
    apple: "logo.svg",
  },
};

async function getData(userId: string) {
  noStore();
  if (userId) {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        colorScheme: true,
      },
    });
    return data;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);
  return (
    <html lang="en">
      <meta charSet="UTF-8" />
      <body className={`${data?.colorScheme ?? "theme-orange"}`}>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-E3QDH43RQB"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-E3QDH43RQB');
            `,
          }}
        ></script>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
