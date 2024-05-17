import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Edit, MapPinned, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";

import { TrashDelete } from "../components/Submitbuttons";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { AddressElement } from "@stripe/react-stripe-js";



async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      Stops: {
        select: {
          id: true,
          location: true,
          description: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return data;
}

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  async function deleteStop(formData: FormData) {
    "use server";

    const stopId = formData.get("stopId") as string;

    await prisma.stop.delete({
      where: {
        id: stopId,
      },
    });

    revalidatePath("/dashboard");
  }
  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your Stops</h1>
          <div className="para">
                  <p>
                    * Add your own workspaces. <br />
                  </p>
                </div>
        </div>

        <Button asChild className="btn border-radius">
          <Link href="/dashboard/new">Add</Link>
        </Button>
      </div>

      {data?.Stops.length == 0 ? (
        <div className="flex min-h-[200px] flex-col items-center border-radius justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <MapPinned className="w-10 h-10 text-primary" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            No stops added
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You have not added any workplaces.
          </p>

          <Button asChild className="btn border-radius">
            <Link href="/dashboard/new">Add a Stop</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {data?.Stops.map((item) => (
            <Card
              key={item.id}
              className="flex items-center justify-between p-4 border-radius"
            >
              <div>
                <h2 className="font-semibold text-xl text-primary">
                  {item.location}
                </h2>
                <p>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "full",
                  }).format(new Date(item.createdAt))}
                </p>
              </div>

              <div className="flex gap-x-4">
                <Link href={`/dashboard/new/${item.id}`}>
                  <Button variant="outline" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <form action={deleteStop}>
                  <input type="hidden" name="stopId" value={item.id} />
                  <TrashDelete />
                </form>
                <Button asChild className="border-radius add">
                  <a 
                    href={`https://www.google.com/maps/?q=${encodeURIComponent(item.location)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                   View Stop
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
      )}
    </div>
  );
}



