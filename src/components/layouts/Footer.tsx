import { footerNavList } from "src/constants/staticData";
import { Button } from "../Button";
import Slogan from "./Slogan";

export default function Footer() {
  return (
    <footer className="border bg-primary-background py-10 px-8">
      <div className="max-w-5xl md:flex mx-auto justify-between">
        <Slogan />
        <div className="mb-5">
          <h3 className="font-semibold">The Company</h3>
          <nav>
            <ul>
              {footerNavList.map((footerlist) => (
                <li key={footerlist.id}>
                  <Button
                    className="dark:bg-transparent"
                    href={footerlist.href}
                  >
                    {footerlist.title}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="">
          <h3 className="font-semibold">HomieScout</h3>
          <nav>
            <ul>
              {footerNavList.map((footerlist) => (
                <li key={footerlist.id}>
                  <Button
                    className="dark:bg-transparent"
                    href={footerlist.href}
                  >
                    {footerlist.title}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
