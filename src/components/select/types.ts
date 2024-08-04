import { SelectHTMLAttributes } from "react";
import { SelectOption } from "features/listings/types";

export interface NewSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
}
