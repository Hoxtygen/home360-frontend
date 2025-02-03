import { HTMLAttributes, SelectHTMLAttributes } from "react";
import { SelectOption } from "features/listings/types";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  format?: boolean;
}

export interface SelectFieldProps<T> extends HTMLAttributes<HTMLSelectElement> {
  label?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  hasError?: boolean;
  showRequiredStar?: boolean;
  data: T[];
  valueKey: keyof T;
  displayKey: keyof T;
  optionalDisplayKey?: keyof T;
  handleOnChange: any;
}
