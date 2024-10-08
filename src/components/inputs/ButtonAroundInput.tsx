import { Button } from "components/buttons/Button";
import { mergeClass } from "lib/utils/utils";
import { forwardRef } from "react";
import { InputProps } from "components/input/types";
import { InputLabel } from "components/inputLabel";

const ButtonAroundInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, handleDecreaseValue, handleIncreaseValue, ...props },
    ref
  ) => {
    return (
      <>
        {label && (
          <div>
            <InputLabel label={label} htmlFor={props.id} />
          </div>
        )}
        <div className="flex">
          <Button
            type="button"
            className="dark:bg-transparent h-12 rounded-none border-black text-yellow-500 rounded-tl-md rounded-bl-md dark:hover:bg-transparent dark:hover:text-gray-400 border text-base font-semibold dark:text-white dark:border-gray-200"
            onClick={handleDecreaseValue}
          >
            -
          </Button>
          <input
            type="number"
            className={mergeClass(
              "flex h-12  border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-slate-400 text-black font-semibold dark:border-gray-200 dark:text-white",
              className
            )}
            ref={ref}
            {...props}
            id={props.id}
            onWheel={(e) => e.currentTarget.blur()}
          />
          <Button
            className="dark:bg-transparent h-12 rounded-none border-black rounded-br-md rounded-tr-md dark:hover:bg-transparent dark:hover:text-gray-400 border text-base font-semibold dark:text-white dark:border-gray-200"
            type="button"
            onClick={handleIncreaseValue}
          >
            +
          </Button>
        </div>
      </>
    );
  }
);
ButtonAroundInput.displayName = "ButtonAroundInput";

export { ButtonAroundInput };
