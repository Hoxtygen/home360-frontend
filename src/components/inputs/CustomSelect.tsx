import { SelectHTMLAttributes } from "react";
import { OptionValue, SelectOption } from "typedef";
import { formatString, mergeClass } from "../../lib/utils/utils";
import InputLabel from "./InputLabel";

interface SelectProps<Type extends OptionValue>
  extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption<Type>[];
  label?: string;
}
export function CustomSelect<Type extends OptionValue>({
  className,
  value,
  onChange,
  name,
  options,
  label,
  id,
  ...props
}: SelectProps<Type>) {
  return (
    <div>
      {label && (
        <div>
          <InputLabel label={label} htmlFor={id} />
        </div>
      )}
      <select
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        {...props}
        className={mergeClass(
          "flex h-12  border border-slate-300 py-2 px-3 text-base placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 text-blacksd font-semibold",
          className
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={formatString(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

CustomSelect.displayName = "CustomSelect";
