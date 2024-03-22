import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Stops from "./components/StopsTest";

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
                  Deep-work, minus the headache. <span className="">🧑‍💻</span>
                </h1>
                <p>Workspaces near you, for the price of a espresso shot* </p>
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
                  {/* <p>Cut the chase, unlock full info on every workspace!</p> */}
                  <p>List of amenities, effortless reservations and more!</p>
                </div>
                <a
                  className="_defaultButton_5a90_4 register-btn"
                  href="https://buy.stripe.com/bIY16e04T5wZb3qcMM"
                >
                  <Button className="register-btn">
                    Subscribe for $0.99/mo
                  </Button>
                </a>

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
      <Stops />
    </section>
  );
}
