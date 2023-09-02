/* eslint-disable unused-imports/no-unused-vars */
import SidebarDropdown from "components/inputs/SidebarDropdown";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

export interface OptionProps {
  label: string;
  value: string;
}
export interface DashboardSidebarItemProps {
  icon?: string;
  name: string;
  path?: string;
  type?: string;
  activeOption?: string;
  tooltipText?: string;
  options?: OptionProps[];
  onOptionSelect?: (value: string) => void;
  onClick?: () => void;
  children: ReactNode;
}

export default function DashboardSidebarItem({
  icon,
  name,
  type,
  path,
  activeOption,
  children,
  options,
  tooltipText,
  onOptionSelect,
  onClick,
}: DashboardSidebarItemProps) {
  const router = useRouter();
  const { pathname } = router;
  const formatedNameToSlug = name.replaceAll(" ", "-").toLowerCase();

  const isActive = pathname
    .toLocaleLowerCase()
    .includes(formatedNameToSlug.toLocaleLowerCase());
  // Todo: Refactor to use custom link
  return (
    <>
      {options && options.length > 0 ? (
        <SidebarDropdown
          name={name}
          isMenuActive={isActive}
          options={options}
          activeOption={activeOption}
          tooltipText={tooltipText as string}
          onOptionSelect={onOptionSelect && onOptionSelect}
        >
          {children}
        </SidebarDropdown>
      ) : (
        <Link href={`/${formatedNameToSlug}`}>
          <div
            className={`flex items-center h-11 px-[18.5px] w-full min-w-max rounded-md mb-5 text-16 
          hover:bg-primary-disabled ${
            isActive
              ? "bg-primary-disabled bg-opacity-25 text-white"
              : "text-primary-disabled"
          }   hover:text-white transition-all duration-300 cursor-pointer ease-linear hover:bg-opacity-25`}
          >
            <span className="flex items-center">{children}</span>{" "}
            <span className="ml-4 font-Open-Sans">{name}</span>
          </div>
        </Link>
      )}
    </>
  );
}
// Sh3710(kh01m3$
