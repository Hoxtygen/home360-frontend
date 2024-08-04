import { TextareaHTMLAttributes } from "react";

export interface AutoTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}
