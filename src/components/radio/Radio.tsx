import { mergeClass } from "lib/utils/utils";
import InputLabel from "../inputLabel/InputLabel";
import { RadioInputElementProps } from "./types";

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
