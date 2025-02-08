/* eslint-disable unused-imports/no-unused-vars */
import { Dispatch, SetStateAction } from "react";

export interface MobileHeaderProps {
  setShowMobileNav: Dispatch<SetStateAction<boolean>>;
  showMobileNav: boolean;
  handleTourStart?: (e: React.MouseEvent<HTMLElement>) => void;
  accounts?: any[];
}

export interface SidebarLinkProps {
  name: string;
  icon: JSX.Element;
}
export interface SidebarOptionProps {
  name: string;
  icon: JSX.Element;
  tooltipText: string;
  options: OptionProps[];
  activeOption: string;
  onOptionSelect: (value: string) => void;
}
export interface OptionProps {
  label: string;
  value: string;
}

export interface SidebarOptionProps {
  name: string;
  icon: JSX.Element;
  tooltipText: string;
  options: OptionProps[];
  activeOption: string;
  onOptionSelect: (value: string) => void;
}

export type DashboardSidebarProps = MobileHeaderProps & {
  handleLogout(): void;
};
