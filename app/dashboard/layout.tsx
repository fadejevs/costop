import { ReactNode } from "react";
import { DashboardNav } from "../components/DashboardNav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";
import PaymentButton from "../components/PaymentButton";
import Image from "next/image";
import underline from "/public/underline.svg";


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
      <div className="relative mt-10 m-auto w-full max-w-5xl">
        <div className="flex flex-col md:flex-row">
          <aside className="md:w-[200px] hidden md:block">
            <DashboardNav/>
          </aside>
          <div className="flex-1">
            <div className="container grid flex-1 gap-12 md:grid-cols-1">
              <div className="items-center justify-center px-10 py-6 text-center bg-red-100 border-radius mb-8 cool-box">
              <div className="absolute top-2 left-29 -translate-x-4 -translate-y-4">
                <div className="emoji index-module_emoji__1XBIX index-module_animate__wave__1uYZ0">👋</div>
               </div>
                <div>
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-center">
                      <span className="underline-text">Welcome, {user?.given_name || "User"}!</span>
                      <Image
                        src={underline}
                        alt="Underline"
                        height={28}
                        className="block mx-auto pl-20"
                      />
                    </h1>
                  
                    <span>
                    </span>
                  </div>
                  <p className="mx-auto max-w-[400px]">
                    Confirm your email & a one-time payment to gain access to the community.
                  </p>
                  <div className="flex justify-center">
                    <PaymentButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (

 
    <div className="mt-10 m-auto w-full max-w-5xl">
        <div className="flex flex-col md:flex-row">
          <aside className="md:w-[200px] hidden md:block">
            <DashboardNav />
          </aside>
          <div className="flex-1">
            <div className="container grid flex-1 gap-2 md:grid-cols-1">
            <div className="items-center justify-center px-10 py-6 text-center bg-orange-100 border-radius mb-8 cool-box">
              <div className="absolute top-2 left-29 -translate-x-4 -translate-y-4">
                <div className="emoji index-module_emoji__1XBIX index-module_animate__wave__1uYZ0">👋</div>
               </div>
                <div>
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-center">
                      <span className="underline-text">Welcome, {user?.given_name || "User"}!</span>
                      <Image
                        src={underline}
                        alt="Underline"
                        height={28}
                        className="block mx-auto pl-20"
                      />
                    </h1>
                  
                    <span>
                    </span>
                  </div>
                  {/* <p className="mx-auto max-w-[400px]">
                    Confirm your email & complete the payment to gain access to the community.
                  </p>
                  <div className="flex justify-center">
                    <PaymentButton />
                  </div> */}
                </div>
              </div>
              <main>{children}</main>
            </div>
          </div>
        </div>
      </div>
  );
}