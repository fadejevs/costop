import { ReactNode } from "react";
import { DashboardNav } from "../components/DashboardNav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";
import PaymentButton from "../components/PaymentButton";

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
      <div className="mt-10 m-auto w-full max-w-5xl">
        <div className="flex flex-col md:flex-row">
          <aside className="md:w-[200px] hidden md:block">
            <DashboardNav />
          </aside>
          <div className="flex-1">
            <div className="block items-center justify-center h-auto px-10 py-4 text-center">
              <div>
                <h1 className="text-2xl font-bold">Welcome, {user?.given_name || "User"}!</h1>
                <p className="mx-auto max-w-[400px]">
                  Enter your email to complete a one-time payment.
                </p>
                <div className="flex justify-center">
                  <PaymentButton />
                </div>
              </div>
            </div>
            <div className="container grid flex-1 gap-12 md:grid-cols-1">
              <main>{children}</main>
            </div>
          </div>
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