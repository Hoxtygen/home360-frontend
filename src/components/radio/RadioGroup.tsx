import React from "react";

import { Radio } from "components/radio";
import { formatString, mergeClass } from "lib/utils/utils";
import { IOption, IOptionGroup } from "./types";

export default function RadioGroup({
  label,
  options,
  onChange,
  className,
}: IOptionGroup) {
  function renderOptions() {
    return options.map(
      (
        { label, name, disabled, className, labelClassName }: IOption,
        index
      ) => {
        const shortenedOptionLabel = label.replace(/\s+/g, "");
        const optionId = `radio-option-${shortenedOptionLabel}`;
        return (
          <Radio
            value={formatString(label, true)}
            label={label}
            key={optionId}
            id={optionId}
            name={name}
            disabled={disabled}
            // defaultChecked={index === 0}
            onChange={onChange}
            className={className}
            labelClassName={labelClassName}
          />
        );
      }
    );
  }
  return (
    <fieldset className="mb-5">
      <legend className="mb-4 font-semibold">{label}</legend>
      <div className={mergeClass(`${className}`)}>{renderOptions()}</div>
    </fieldset>
  );
}
