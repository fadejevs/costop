import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
// import Head from "next/head";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) {
    return redirect("/dashboard");
  }
  return (
    <section className={"m-auto w-full max-w-5xl"}>
      <>
        <div className="mt-2 mb-4 p-4">
          <div className="wrapper">
            <div className="_welcome__content_1569r_7">
              <div className="_welcome__content__header_1569r_46">
                <div className="_welcome__content__header__stats_1569r_49">
                  <span></span>
                  <p id="available-places">0 places within your area.</p>
                </div>
                <h1 className="hero-h1">
                  Deep-work, minus the hassle. <span className="">🧑‍💻</span>
                </h1>
                <p>
                  Find calm workspaces near you, for the price of a espresso
                  shot*
                </p>
                <p>Based on your location:</p>
                <ul id="coffee-shops">
                  <li>cafe</li>
                  <li>workspace</li>
                  <li>cafe</li>
                  <li>workspace</li>
                </ul>
              </div>
              <div className="_welcome__content__footer_1569r_88">
                <div className="_welcome__content__footer__access_1569r_98">
                  {/* <p>Access in-depth info, cut an hour from your work session!</p> */}
                  <p>Cut the chase, unlock full info on every workspace!</p>
                </div>
                <RegisterLink
                  className="_defaultButton_5a90_4 register-btn"
                  // href="https://buy.stripe.com/bIY16e04T5wZb3qcMM"
                >
                  <Button className="register-btn">
                    Subscribe for $0.99/month
                  </Button>
                </RegisterLink>

                <div className="_welcome__content__footer__print_1569r_105">
                  <p>
                    * All of the indexed workspaces and cafes are fully
                    accessible and open to the public.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </section>
  );
}
