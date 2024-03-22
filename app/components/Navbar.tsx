import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "./UserNav";
import headerLogo from "../../public/logo.svg";
import Image from "next/image";

export async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="nav-border py-2">
      <nav className="m-auto w-full max-w-5xl">
        <div className="block items-center gap-12 md:flex p-5 justify-between">
          <Link
            href="/"
            className="nav-text-logo logo flex items-center justify-center space-x-1 sm:justify-center"
          >
            <h1 className="hidden font-display text-2xl font-semibold tracking-tight sm:block">
              Co-Stop
            </h1>
            <Image src={headerLogo} alt="Logo" width={25} height={25} />
          </Link>

          <div className="flex-1">
            <div className="text-md flex items-center justify-center text-zinc-600 md:justify-end">
              {(await isAuthenticated()) ? (
                <UserNav
                  email={user?.email as string}
                  image={user?.picture as string}
                  name={user?.given_name as string}
                />
              ) : (
                <div className="flex items-center gap-x-2">
                  {/* <LoginLink>
                    <Button className="sign-in-btn">Sign In</Button>
                  </LoginLink> */}
                  <Link
                    href={`https://costop.kinde.com/knock-knock`}
                    className="get-started-button cursor-pointer rounded-md bg-none py-2 px-4 text-white"
                  >
                    Early Access
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
