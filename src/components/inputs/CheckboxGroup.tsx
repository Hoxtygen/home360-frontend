import { mergeClass } from "lib/utils/utils";
import React from "react";
import Checkbox from "./Checkbox";
import { IOptionGroup, IOption } from "./RadioGroup";

export default function CheckboxGroup({
  label,
  options,
  onChange,
  className,
  name,
}: IOptionGroup) {
  function renderOptions() {
    return options.map(
      ({ label, name, disabled, className, labelClassName }: IOption) => {
        const shortenedOptionLabel = label.replace(/\s+/g, "");
        const optionId = `checkbox-option-${shortenedOptionLabel}`;
        return (
          <div className="mb-4" key={optionId}>
            <Checkbox
              label={label}
              id={optionId}
              name={name}
              disabled={disabled}
              onChange={onChange}
              className={className}
              labelClassName={labelClassName}
              value={label}
            />
          </div>
        );
      }
    );
  }
  return (
    <fieldset name={name}>
      <legend className="font-semibold mb-4">{label}</legend>
      <div className={mergeClass(`${className}`)}>{renderOptions()}</div>
    </fieldset>
  );
}
