import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Head from "next/head";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) {
    return redirect("/dashboard");
  }
  return (
    <section className={"m-auto w-full max-w-5xl"}>
      <>
        <Head>
          <title>
            Co-Stop – Automatically convert leads into meetings using text
            messages
          </title>
          <meta
            name="viewport"
            content="initial-scale=1, maximum-scale=1, width=device-width, user-scalable=no"
          />
          <meta charSet="UTF-8" />
          <link rel="icon" href="/fav.png" />
          <meta
            name="title"
            content="ALAN – Automatically convert leads into meetings using text messages"
          />
          <meta
            name="description"
            content="Automatically nurture leads via text message and turn them into potential customers."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://usealan.com" />
          <meta
            property="og:image"
            content="https://usealan.com/assets/images/cover-2.png"
          />
          <meta property="twitter:card" content="summary_large_image" />
          <meta name="theme-color" content="#5F6EEE" />
          <link rel="apple-touch-icon" href="/assets/images/icon.png" />
          <link rel="shortcut icon" href="/assets/images/icon.ico" />
        </Head>
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
                <a
                  className="_defaultButton_5a90_4 register-btn"
                  href="https://buy.stripe.com/bIY16e04T5wZb3qcMM"
                >
                  Subscribe for $0.99/month
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
      <div className="relative items-center w-full px-5 py-0 mx-auto lg:px-16 max-w-7xl md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center max-w-sm mx-auto mt-10">
            <RegisterLink>
              <Button size="lg" className="w-full">
                Sign Up for free
              </Button>
            </RegisterLink>
          </div>
        </div>
      </div>
    </section>
  );
}
