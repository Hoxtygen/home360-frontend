/* eslint-disable unused-imports/no-unused-vars */
import { ChangeEvent, InputHTMLAttributes } from "react";

export interface RadioInputElementProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  key?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
}

export interface IOption {
  label: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
}

export interface IOptionGroup {
  label: string;
  options: IOption[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
}
