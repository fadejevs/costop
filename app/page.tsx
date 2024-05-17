import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Stops from "./components/StopsTest";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import Popup from "./components/Popup";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) {
    return redirect("/dashboard");
  }
  return (
    <section className={"m-auto w-full max-w-4xl"}>
      <>
        <div className="mt-2 mb-4 p-4">
          <div className="wrapper">
            <div className="_welcome__content_1569r_7">
              <div className="_welcome__content__header_1569r_46">
                <div className="_welcome__content__header__stats_1569r_49">
                  <span></span>
                  <p id="available-places">0 places within your area.</p>
                </div>
                <h1
                  className="hero-h1 main-heading"
                  style={{ maxWidth: "calc(100% - 80px)" }}
                >
                  Workspaces near you, priced at a espresso shot
                  <span>.</span> <span> 🧑‍💻</span>
                </h1>
                {/* <p>Deep-work, minus the desk hunt.</p> */}
                {/* <p>Workspaces near you, for the price of a espresso shot*</p> */}
                <p className="main-subheading">Based on your location:</p>
                <ul id="coffee-shops">
                  <li>cafe</li>
                  <li>workspace</li>
                  <li>cafe</li>
                  <li>workspace</li>
                </ul>
              </div>
              <div className="_welcome__content__footer_1569r_88">
                <div className="_welcome__content__footer__access_1569r_98">
                  <p>List your spaces, find local spots, API & more!</p>
                </div>
                <a
                  className="_defaultButton_5a90_4 register-btn"
                  href="https://buy.stripe.com/eVadT0cRF7F7gnK7sw"
                >
                  <div className="button-container">
                    <Button className="register-btn">
                      Unlimited Access for $12.99
                    </Button>
                  </div>
                  {/* <div className="button-container">
                    <Button className="register-btn">
                       Unlimited Searches, $1 a Week 
                    </Button>
                  </div> */}
                </a>
                <div className="w-full flex-col justify-left">
                  <p>
                    <strong>16 of 20</strong> left!
                  </p>
                  <div className="w-full bg-gray-300 rounded-full h-1.5">
                    <div className="bg-[#FA7417] h-1.5 rounded-full dark:[#] w-[32%]"></div>
                  </div>
                </div>
                <div className="_welcome__content__footer__print_1569r_105">
                  <p>
                    * One-time payment, lifetime access. <br />
                    All of the indexed workspaces and cafes are fully accessible
                    and open to the public.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      <Popup />
      <Stops />
      <Features />
      <FAQ />
    </section>
  );
}