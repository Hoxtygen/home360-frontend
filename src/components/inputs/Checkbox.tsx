import React, { InputHTMLAttributes } from "react";
import { mergeClass } from "lib/utils/utils";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  classname?: string;
  id: string;
  labelClassName?: string;
}
export default function Checkbox({
  label,
  className,
  id,
  labelClassName,
  ...props
}: CheckboxProps) {
  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        name={props.name}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
        className={mergeClass(
          "accent-[#A41857] h-4 w-4 border-2 border-primary-active rounded-sm focus:outline-[#A41857] transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer",
          `${className}`
        )}
      />
      <label
        htmlFor={id}
        className={mergeClass(
          "form-check-label cursor-pointer inline-block text-gray-800",
          `${labelClassName}`
        )}
      >
        {label}
      </label>
    </div>
  );
}
