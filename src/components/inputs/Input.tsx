import * as React from "react";
import { mergeClass } from "../../lib/utils/utils";
import InputLabel from "./InputLabel";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  handleIncreaseValue?: () => void;
  handleDecreaseValue?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <>
        <div className="">
          {label && (
            <div>
              <InputLabel label={label} htmlFor={props.id} />
            </div>
          )}
          <div className="">
            <input
              className={mergeClass(
                "flex h-12  border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:focus:ring-slate-400 text-black",
                className
              )}
              ref={ref}
              {...props}
              id={props.id}
            />
          </div>
        </div>
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
