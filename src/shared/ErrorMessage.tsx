import React from "react";
import Image from "next/image";
import { mergeClass } from "lib/utils/utils";
import { MessageProps } from "@/typedef";

export default function ErrorMessage({
  error,
  className,
  hideWarningIcon,
}: MessageProps) {
  return (
    <div className="flex items-start mb-4 bg-red-200 px-4">
      {!hideWarningIcon && (
        <div className="flex mr-1 min-w-[15px]">
          <Image
            width={15}
            height={15}
            src="/icons/warning.svg"
            alt={error || "error icon"}
          />
        </div>
      )}
      <p
        aria-label="error message"
        className={mergeClass(
          "font-hanken-regular text-14 text-red-600 p-2",
          className
        )}
      >
        {error}
      </p>
    </div>
  );
}
