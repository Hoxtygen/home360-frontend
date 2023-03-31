import Image from "next/image";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";

import Home365 from "../../../public/images/home356.jpg";
import { Button } from "../Button";

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
        <Button href="/" className="mr-1">
          <Youtube />
        </Button>
        <Button href="/">
          <Facebook />
        </Button>
        <Button href="/">
          <Linkedin />
        </Button>
        <Button href="/">
          <Twitter />
        </Button>
      </div>
    </div>
  );
}
