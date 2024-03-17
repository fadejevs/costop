import Link from "next/link";

export default function Footer() {
  return (
    <div className={"m-auto w-full max-w-5xl"}>
      <div className="space-y-3 p-5">
        <div className="block md:flex md:justify-between justify-between">
          <div className="text-center">
            <p className="footer-text">© 2024 Co-Stop</p>
          </div>
          <div className="footer-text  flex justify-center md:block ">
            <Link className="blog-link" href="/">
              Blog
            </Link>
            <Link href="https://twitter.com/messages/compose?recipient_id=1605878546660052993">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
