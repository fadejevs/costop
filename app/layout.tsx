import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import prisma from "./lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import Footer from "./components/Footer";
import Stops from "./components/Stops";
import { url } from "inspector";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title:
    "Co-Stop – Automatically convert leads into meetings using text messages",
  description:
    "Automatically nurture leads via text message and turn them into potential customers.",
  openGraph: {
    type: "website",
    url: "https://costop.so",
    title:
      "Co-Stop – Automatically convert leads into meetings using text messages",
    description:
      "Automatically nurture leads via text message and turn them into potential customers.",
    images: [
      {
        url: "https://usealan.com/assets/images/cover-2.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "images/black.png",
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
        {/* <Stops /> */}
        <Footer />
      </body>
    </html>
  );
}
