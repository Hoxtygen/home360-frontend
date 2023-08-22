import { mergeClass } from "lib/utils/utils";
import React from "react";

interface ErrorProps {
  error?: string;
  className?: string;
}

export default function Error({ error, className }: ErrorProps) {
  return (
    <p className={mergeClass("text-red-500 text-[12px]", className)}>{error}</p>
  );
}
