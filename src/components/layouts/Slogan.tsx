import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import Image from "next/image";

import Home365 from "../../../public/images/home356.jpg";
import { Button } from "../buttons/Button";

export default function Slogan() {
  return (
    <div className="mb-5">
      <Image src={Home365} alt="Logo" />
      <div className="mt-4 text-xl">
        <p>Flexible Living</p>
        <p>Monthly and Yearly stays</p>
        <p>Anywhere</p>
      </div>
      <div className="mt-16">
        <Button
          title="Home365 on Youtube"
          aria-label="Home365 on Youtube"
          variant="link"
          href="/"
          className="mr-1 dark:bg-transparent dark:hover:bg-transparent dark:hover:text-neutral-500 pr-2 pl-2"
        >
          <Youtube color="red" />
        </Button>
        <Button
          title="Home365 on Facebook"
          aria-label="Home365 on Facebook"
          variant="link"
          href="/"
          className="mr-1 dark:bg-transparent dark:hover:bg-transparent dark:hover:text-neutral-500 pr-2 pl-2"
        >
          <Facebook color="blue" />
        </Button>
        <Button
          title="Home365 on Linkedin"
          aria-label="Home365 on Linkedin"
          variant="link"
          href="/"
          className="mr-1 dark:bg-transparent dark:hover:bg-transparent dark:hover:text-neutral-500 pr-2 pl-2"
        >
          <Linkedin color="#2267E8" />
        </Button>
        <Button
          title="Home365 on Twitter"
          aria-label="Home365 on Twitter"
          variant="link"
          href="/"
          className="mr-1 dark:bg-transparent dark:hover:bg-transparent dark:hover:text-neutral-500 pr-2 pl-2"
        >
          <Twitter color="#00ACEE" />
        </Button>
      </div>
    </div>
  );
}
