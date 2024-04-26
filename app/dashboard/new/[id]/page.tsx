import { SubmitButton } from "@/app/components/Submitbuttons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

async function getData({ userId, stopId }: { userId: string; stopId: string }) {
  noStore();
  const data = await prisma.stop.findUnique({
    where: {
      id: stopId,
      userId: userId,
    },
    select: {
      location: true,
      description: true,
      id: true,
    },
  });

  return data;
}

export default async function DynamicRoute({
  params,
}: {
  params: { id: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ userId: user?.id as string, stopId: params.id });

  async function postData(formData: FormData) {
    "use server";

    if (!user) throw new Error("you are not allowed");

    const location = formData.get("location") as string;
    const description = formData.get("description") as string;

    await prisma.stop.update({
      where: {
        id: data?.id,
        userId: user.id,
      },
      data: {
        description: description,
        location: location,
      },
    });

    revalidatePath("/dashboard");

    return redirect("/dashboard");
  }
  return (
    <Card>
      <form action={postData}>
        <CardHeader>
          <CardTitle>Edit Stop</CardTitle>
          {/* <CardDescription>
            Here you can make any changes needed.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col border-dashed border-2 border-gray-200 p-1 rounded-md">
            <Input
              required
              type="text"
              name="location"
              placeholder="Address?"
              defaultValue={data?.location}
            
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>What are you working on?</Label>
            <Textarea
              name="description"
              placeholder="Few words about the project"
              required
              defaultValue={data?.description}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button asChild variant="destructive" className="red border-radius">
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
