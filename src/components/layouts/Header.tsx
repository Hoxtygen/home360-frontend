import { authLinks, navList } from "constants/staticData";
import useLocalStorage from "hooks/useLocalStorage";
import useWindowSize from "hooks/useWindowSize";
import { MappedSuccessLoginResponse } from "typedef";
import { Button, ButtonSizes } from "../buttons/Button";
import Logo from "../shared/Logo";

export default function Header() {
  const { width } = useWindowSize();
  const buttonSize: ButtonSizes = width > 748 ? "lg" : "sm";
  const [user, setUser] = useLocalStorage<MappedSuccessLoginResponse | null>(
    "user",
    null
  );

  return (
    <header className="py-10 text-white border-b-2 sticky top-0 z-50">
      <div className="container mx-auto max-w-5xl">
        <div className="pb-3 top px-4 flex flex-row justify-between border-b border-gray-300">
          <nav className="flex flex-row">
            <Button
              variant="link"
              href="/"
              className="dark:hover:bg-transparent"
            >
              <Logo size={width > 800 ? "md" : "sm"} />
            </Button>
            <ul className="sm:flex flex-row hidden">
              {navList.map((list) => (
                <li key={list.title}>
                  <Button
                    href={list.href}
                    variant="link"
                    className="text-sm dark:hover:bg-transparent dark:hover:text-neutral-500"
                  >
                    {list.title}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="">
            {user && user.token ? (
              <div className="flex items-center">
                <div className="flex items-center">
                  <p className="text-black pr-5 font-semibold">
                    {user && user.firstName}
                  </p>
                  <div className="">
                    <Button
                      className="dark:hover:bg-transparent dark:hover:text-black"
                      variant="link"
                      href="/dashboard"
                    >
                      Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              authLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="link"
                  size={buttonSize}
                  href={link.href}
                  className="mr-3 bg-black text-white hover:no-underline hover:text-black rounded-sm"
                >
                  {link.title}
                </Button>
              ))
            )}
          </div>
        </div>
        <div className="pb-3 bottom border-current border border-x-0 border-y-gray-500 sm:hidden">
          <nav className="">
            <ul className=" flex justify-start pl-4">
              {navList.map((list) => (
                <li key={list.title}>
                  <Button
                    href="/"
                    variant="link"
                    className="text-sm dark:hover:bg-transparent dark:hover:text-neutral-500"
                  >
                    {list.title}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
