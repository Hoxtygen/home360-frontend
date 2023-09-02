import { mergeClass } from "lib/utils/utils";
import React, { SelectHTMLAttributes } from "react";
import InputLabel from "./InputLabel";

interface SelectProps<T extends string | number>
  extends SelectHTMLAttributes<HTMLSelectElement> {
  items: T[];
  label: string;
}
export default function MySelect<T extends string | number>({
  className,
  value,
  onChange,
  name,
  items,
  label,
  id,
  ...props
}: SelectProps<T>) {
  return (
    <div>
      {label && (
        <div>
          <InputLabel label={label} htmlFor={id} />
        </div>
      )}
      <select
        name={name}
        id={id}
        onChange={onChange}
        {...props}
        value={value}
        className={mergeClass(
          "flex h-12  border border-slate-300 py-2 px-3 text-base placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 text-blacksd font-semibold",
          className
        )}
      >
        {items.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
