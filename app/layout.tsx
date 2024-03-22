import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import prisma from "./lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import Footer from "./components/Footer";
import { url } from "inspector";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.costop.in"),
  title: "Co-Stop – Nearby co-working spaces and deep-work cafes",
  description: "Instantly find open co-working spaces and cafes near you.",
  openGraph: {
    type: "website",
    url: "https://costop.in",
    title: "Co-Stop – Nearby co-working spaces and deep-work cafes",
    description: "Instantly find open co-working spaces and cafes near you.",
    images: [
      {
        url: "images/cover.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "images/orange-fav.png",
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
