import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "./UserNav";
import headerLogo from "../../public/fav.png";
import Image from "next/image";

export async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="border-b h-[10vh] flex items-center">
      <div className="container flex items-center justify-between">
        <Link
          href="/"
          className="nav-text-logo logo flex items-center justify-center space-x-1 sm:justify-center"
        >
          <h1 className="hidden font-display text-2xl font-semibold tracking-tight sm:block">
            Co-Stop
          </h1>
          <Image src={headerLogo} alt="Logo" width={25} height={25} />
        </Link>

        <div className="flex items-center gap-x-5">
          {(await isAuthenticated()) ? (
            <UserNav
              email={user?.email as string}
              image={user?.picture as string}
              name={user?.given_name as string}
            />
          ) : (
            <div className="flex items-center gap-x-5">
              <LoginLink>
                <Button className="sign-in-btn">Sign In</Button>
              </LoginLink>

              <RegisterLink>
                <Button className="get-started-button cursor-pointer rounded-md bg-none py-2 px-4 text-white">
                  Sign Up with Google
                </Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
