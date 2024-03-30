import Link from "next/link";

export default function Footer() {
  return (
    <div className={"m-auto w-full max-w-5xl"}>
      <div className="space-y-3 p-5">
        <div className="block md:flex md:justify-between justify-between">
          <div className="text-center">
            <p className="footer-text">© 2024 Co-Stop</p>
          </div>

          <div className="footer-text flex justify-center">
            <div className="flex items-center">
              {/* <Link href="/blog">Blog</Link> */}
              <div className="w-2"></div>
              <button
                className="link-item"
                data-tally-open="wd6Rvo"
                data-tally-width="280"
                data-tally-overlay="1"
                data-tally-emoji-text="👋"
                data-tally-emoji-animation="wave"
                data-tally-auto-close="2000"
              >
                Support
              </button>
            </div>
          </div>
        </div>
      </div>
      <script async src="https://tally.so/widgets/embed.js"></script>
    </div>
  );
}
