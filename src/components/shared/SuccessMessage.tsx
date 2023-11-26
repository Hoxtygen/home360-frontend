import { MessageProps } from "@/typedef";
import { mergeClass } from "lib/utils/utils";
import React from "react";

export default function SuccessMessage({ className, message }: MessageProps) {
  return (
    <div>
      <p
        aria-label="success message"
        className={mergeClass(
          "font-hanken-medium text-14 text-green-800 p-2",
          className
        )}
      >
        {message}
      </p>
    </div>
  );
}
