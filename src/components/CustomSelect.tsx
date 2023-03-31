import { forwardRef, SelectHTMLAttributes } from "react";
import { mergeClass } from "src/lib/utils/utils";
import { OptionValue, SelectOption } from "src/typedef";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption<OptionValue>[];
}
export const CustomSelect = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, value, onChange, name, options, ...props }, ref) => {
    return (
      <div>
        <select
          value={value}
          onChange={onChange}
          name={name}
          id=""
          {...props}
          ref={ref}
          className={mergeClass(
            "flex h-12  border border-slate-300 py-2 px-3 text-base placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 text-blacksd font-semibold",
            className
          )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";
