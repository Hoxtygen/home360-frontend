import { Button } from "components/buttons/Button";
import { mergeClass } from "lib/utils/utils";
import React, { forwardRef } from "react";
import { InputProps } from "./Input";
import InputLabel from "./InputLabel";

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
            className="dark:bg-transparent h-12 rounded-none border-black text-yellow-500 rounded-tl-md rounded-bl-md dark:hover:bg-transparent dark:hover:text-black border text-base font-semibold"
            onClick={handleDecreaseValue}
          >
            -
          </Button>
          <input
            type="number"
            className={mergeClass(
              "flex h-12  border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:focus:ring-slate-400 text-black font-semibold",
              className
            )}
            ref={ref}
            {...props}
            id={props.id}
            onWheel={(e) => e.currentTarget.blur()}
          />
          <Button
            className="dark:bg-transparent h-12 rounded-none border-black rounded-br-md rounded-tr-md dark:hover:bg-transparent dark:hover:text-black border text-base font-semibold"
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
