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
import { unstable_noStore as noStore } from "next/cache";
import { Rat } from "lucide-react";

export default async function NewStopRoute() {


  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  async function postData(formData: FormData) {
    "use server";

    if (!user) {
      throw new Error("Not authorized");
    }

    const location = formData.get("location") as string;
    const description = formData.get("description") as string;

    await prisma.stop.create({
      data: {
        userId: user?.id,
        description: description,
        location: location,
      },
    });

    return redirect("/dashboard");
  }

  return (
    <Card>
      <form action={postData}>
        <CardHeader>
          <CardTitle>New Stop</CardTitle>
          {/* <CardDescription>
            Here you can add your new workspace
          </CardDescription> */}
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">

          <div className="gap-y-2 flex flex-col border-dashed border-2 border-gray-200 p-1 rounded-md">
            <Input
              required
              type="text"
              name="location"
              placeholder="Address?"
              className="placeholder-gray-200"
            />
          </div>
          
          <div className="gap-y-2 flex flex-col border-dashed border-2 border-gray-200 p-4 rounded-md">
            <select name="internetQuality" required className="placeholder-gray-200 border-none rounded-md">
              <option value="">Internet?</option>
              <option value="good">Great</option>
              <option value="average">Good enough</option>
              <option value="poor">Bad</option>
              <option value="none">No Internet</option>
            </select>
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>What are you working on?</Label>
            <Textarea
              name="description"
              placeholder="Few words about the project"
              required
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
