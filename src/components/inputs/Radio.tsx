import { mergeClass } from "lib/utils/utils";
import React, { InputHTMLAttributes } from "react";
import InputLabel from "./InputLabel";

export interface RadioInputElementProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  key?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
}
export default function Radio({
  label,
  id,
  disabled = false,
  className,
  labelClassName,
  ...rest
}: RadioInputElementProps) {
  return (
    <div className="mr-9">
      <input
        type="radio"
        name=""
        id={id}
        {...rest}
        disabled={disabled}
        className={className}
      />
      <InputLabel
        className={mergeClass(
          "inline-block cursor-pointer ml-1",
          `${labelClassName}`
        )}
        label={label}
        htmlFor={id}
      />
    </div>
  );
}
