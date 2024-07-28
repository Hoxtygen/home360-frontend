/* eslint-disable unused-imports/no-unused-vars */
import { SelectOption } from "features/listings/types";

export interface DropdownProps {
  id: string;
  name: string;
  title?: string;
  data: SelectOption[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  hasImage?: boolean;
  style?: string;
  selectedId?: string;
  onSelect?: (id: string | number) => void;
}
