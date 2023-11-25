import { MessageProps } from "@/typedef";
import { mergeClass } from "lib/utils/utils";
import React from "react";

export default function SuccessMessage({ className, message }: MessageProps) {
  return (
    <div>
      <p className={mergeClass("text-green-500 text-14", className)}>
        {message}
      </p>
    </div>
  );
}
