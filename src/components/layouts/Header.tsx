import { navList } from "src/constants/staticData";
import useWindowSize from "src/hooks/useWindowSize";
import { Button, ButtonSizes } from "../Button";
import Logo from "../Logo";

export default function Header() {
  const { width } = useWindowSize();
  const buttonSize: ButtonSizes = width > 748 ? "lg" : "sm";
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
                    href="/"
                    variant="link"
                    className="text-sm hover:no-underline"
                  >
                    {list.title}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="">
            <Button
              variant="link"
              size={buttonSize}
              href="/"
              className="mr-3 bg-black text-white hover:no-underline hover:text-black rounded-sm"
            >
              Login
            </Button>
            <Button
              variant="link"
              size={buttonSize}
              href="/"
              className="mr-3 bg-black text-white hover:no-underline hover:text-black rounded-sm"
            >
              Signup
            </Button>
          </div>
        </div>
        <div className="pb-3 bottom border-current border border-x-0 border-y-gray-500 sm:hidden">
          <nav className="">
            <ul className=" flex justify-start pl-4">
              {navList.map((list, index) => (
                <li key={list.title}>
                  <Button
                    href="/"
                    variant="link"
                    className="text-sm hover:text-gray-600"
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
