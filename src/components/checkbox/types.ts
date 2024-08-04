import { InputHTMLAttributes } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  classname?: string;
  id: string;
  labelClassName?: string;
}
