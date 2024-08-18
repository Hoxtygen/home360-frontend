import { MessageProps } from "@/typedef";
import { mergeClass } from "lib/utils/utils";
import React from "react";

export default function SuccessMessage({ className, message }: MessageProps) {
  return (
    <div>
      <p
        aria-label="success message"
        className={mergeClass(
          "font-hanken-regular text-14 p-2 mb-3 rounded-sm",
          className
        )}
      >
        {message}
      </p>
    </div>
  );
}
