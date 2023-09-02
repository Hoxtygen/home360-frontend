import clsx from "clsx";
import React from "react";

type SpinnerProps = {
  className?: string;
};
export default function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={clsx(
        "animate-spin w-6 h-6 border-4 rounded-full border-b-transparent",
        className ? className : "border-white"
      )}
      role="status"
    />
  );
}
