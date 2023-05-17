import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "./Button";

interface ButtonClass {
  className?: string;
  btnClassName?: string;
}

export default function BackButton({ className, btnClassName }: ButtonClass) {
  const router = useRouter();
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    router.back();
  };
  return (
    <div className={className}>
      <Button onClick={handleClick} className={btnClassName}>
        <ArrowLeft />
      </Button>
    </div>
  );
}
