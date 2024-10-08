import React from "react";

import { mergeClass } from "lib/utils/utils";
import { LabelProps } from "./types";

export default function InputLabel({ label, ...props }: LabelProps) {
  return (
    <label
      className={mergeClass("block dark:text-white", `${props.className}`)}
      htmlFor={props.htmlFor}
    >
      {label}
    </label>
  );
}
