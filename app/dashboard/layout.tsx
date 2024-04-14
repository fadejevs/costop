import { ReactNode } from "react";
import { DashboardNav } from "../components/DashboardNav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";

async function getData({ email, id }: { email: string; id: string }) {
  noStore();
  let user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, lifetimeAccess: true },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { id, email },
    });
  }

  return { lifetimeAccess: user.lifetimeAccess };
}

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
  const { lifetimeAccess } = await getData({
    email: user.email as string,
    id: user.id as string,
  });

  if (!lifetimeAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>
          <h1>Welcome to Your Dashboard</h1>
          <p>Please complete your one-time payment to access all features.</p>
          <a href="https://buy.stripe.com/test_00gaFw4m45o63Go146" className="button">
            Pay Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 m-auto w-full max-w-5xl">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}