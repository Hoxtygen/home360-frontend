import { Button } from "components/buttons/Button";
import { authFooterLinks } from "constant-data/staticData";
import useWindowSize from "hooks/useWindowSize";
import { ReactNode } from "react";
import Logo from "shared/Logo";
import SignupBg from "../../../public/images/signupbg.jpg";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { width } = useWindowSize();
  const date = new Date();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="flex-[0_0_auto]">
        <div className="container mx-auto max-w-5xl p-3">
          <Button href="/" variant="link" className="dark:hover:bg-transparent">
            <Logo size={width > 800 ? "md" : "sm"} />
          </Button>
        </div>
      </header>
      <main
        className="bg-center bg-no-repeat bg-cover flex-auto"
        style={{ backgroundImage: `url(${SignupBg.src})` }}
      >
        <div className="main-inner   justify-center">
          <div className="max-w-md mx-auto my-auto pt-[60px]">{children}</div>
        </div>
      </main>
      <footer className="py-10 px-8 flex-[0_0_auto]">
        <div className="max-w-5xl  mx-auto text-center">
          {authFooterLinks.map((link, index) => (
            <Button
              variant="link"
              key={index}
              className="dark:hover:bg-transparent dark:hover:text-neutral-500"
            >
              {link.title}
            </Button>
          ))}
          <p className="dark:text-neutral-500">
            &copy; Copyright 2022 - {date.getFullYear()} Home360 Services Ltd{" "}
          </p>
        </div>
      </footer>
    </div>
  );
}
