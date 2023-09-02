import { mergeClass } from "lib/utils/utils";
import React, { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}
export default function InputLabel({ label, ...props }: LabelProps) {
  return (
    <label
      className={mergeClass("block", `${props.className}`)}
      htmlFor={props.htmlFor}
    >
      {label}
    </label>
  );
}
