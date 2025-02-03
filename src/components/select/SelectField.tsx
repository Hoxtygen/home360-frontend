/* eslint-disable unused-imports/no-unused-vars */
import React from "react";
import { SelectFieldProps } from "./types";
import { InputLabel } from "components/inputLabel";
import clsx from "clsx";

export default function SelectField<T>({
  label,
  disabled,
  hasError,
  showRequiredStar,
  data,
  displayKey,
  optionalDisplayKey,
  valueKey,
  handleOnChange,
  ...otherProps
}: SelectFieldProps<T>) {
  return (
    <div className="">
      <InputLabel label={label || ""} />
      <div className="rounded-sm">
        <select
          name={otherProps.name}
          id=""
          onChange={handleOnChange}
          disabled={disabled}
          {...otherProps}
          className={clsx(
            "h-12  border border-slate-300 dark:border-gray-200 py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50  dark:focus:ring-slate-400 text-black dark:bg-[#F5F5F5] w-full rounded-md",
            otherProps.className
          )}
          title="Select a renter"
        >
          <option value="">Select an option</option>
          {data.map((item, index) => {
            return (
              <option value={item[valueKey]?.toString()} key={index}>
                {item[displayKey]?.toString()}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
