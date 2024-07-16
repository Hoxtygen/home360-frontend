import { mergeClass } from "lib/utils/utils";
import React from "react";
import { MessageProps } from "@/typedef";

export default function ErrorMessage({ error, className }: MessageProps) {
  return (
    <p
      aria-label="error message"
      className={mergeClass(
        "font-hanken-regular text-14 text-red-800 p-2",
        className
      )}
    >
      {error}
    </p>
  );
}
