import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Stops from "./components/StopsTest";
import Features from "./components/Features";
import FAQ from "./components/FAQ";

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
                  href="https://buy.stripe.com/00gbKS3h5e3vb3qbIL"
                >
                  <div className="button-container">
                    <Button className="register-btn">
                      Early Lifetime for $14.99
                    </Button>
                  </div>
                </a>
                <div className="w-full flex-col justify-left">
                  <p>
                    <strong>7 of 20</strong> left!
                  </p>
                  <div className="w-full bg-gray-300 rounded-full h-1.5">
                    <div className="bg-[#FA7417] h-1.5 rounded-full dark:[#] w-[35%]"></div>
                    {/* <div className="bg-[#635aff] h-3.5 rounded-full dark:[#] w-[35%]"></div> */}
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

      <Stops />
      <Features />
      <FAQ />
    </section>
  );
}
