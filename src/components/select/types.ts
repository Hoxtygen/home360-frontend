import { SelectHTMLAttributes } from "react";
import { SelectOption } from "features/listings/types";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  format?: boolean;
}
