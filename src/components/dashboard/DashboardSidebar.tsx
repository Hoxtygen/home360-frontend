/* eslint-disable unused-imports/no-unused-vars */
import { Button } from "components/buttons/Button";
import { useLogout } from "hooks/useLogout";
import { mergeClass } from "lib/utils/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import DashboardSidebarItem from "./DashboardSidebarItem";

export interface MobileHeaderProps {
  setShowMobileNav: Dispatch<SetStateAction<boolean>>;
  showMobileNav: boolean;
  handleTourStart?: (e: React.MouseEvent<HTMLElement>) => void;
  accounts?: any[];
}

interface SidebarLinkProps {
  name: string;
  icon: JSX.Element;
}
interface SidebarOptionProps {
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

interface SidebarOptionProps {
  name: string;
  icon: JSX.Element;
  tooltipText: string;
  options: OptionProps[];
  activeOption: string;
  onOptionSelect: (value: string) => void;
}

export default function DashboardSidebar({
  showMobileNav,
  accounts,
}: MobileHeaderProps) {
  const router = useRouter();
  const { mutateLogout } = useLogout();
  const listingOptions: OptionProps[] = [
    {
      label: "Published Listings",
      value: "published",
    },
    {
      label: "Draft Listings",
      value: "draft",
    },
    {
      label: "New Listing",
      value: "new",
    },
  ];

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.location.replace("/");
      localStorage.clear();
    }
    mutateLogout();
    router.replace("/");
  };
  const sidebarLinks: Array<SidebarLinkProps | SidebarOptionProps> = [
    {
      name: "Dashboard",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current"
        >
          <path
            d="M1.5 9.11304L3.16667 7.44637M3.16667 7.44637L9 1.61304L14.8333 7.44637M3.16667 7.44637V15.7797C3.16667 16.2399 3.53976 16.613 4 16.613H6.5M14.8333 7.44637L16.5 9.11304M14.8333 7.44637V15.7797C14.8333 16.2399 14.4602 16.613 14 16.613H11.5M6.5 16.613C6.96024 16.613 7.33333 16.2399 7.33333 15.7797V12.4464C7.33333 11.9861 7.70643 11.613 8.16667 11.613H9.83333C10.2936 11.613 10.6667 11.9861 10.6667 12.4464V15.7797C10.6667 16.2399 11.0398 16.613 11.5 16.613M6.5 16.613H11.5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "Listings",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current"
        >
          <path
            d="M9 5.7797V16.613M9 5.7797C9 5.7797 9 4.53572 9 4.11304C9 3.19256 9.74619 2.44637 10.6667 2.44637C11.5871 2.44637 12.3333 3.19256 12.3333 4.11304C12.3333 5.03351 11.5871 5.7797 10.6667 5.7797C10.1689 5.7797 9 5.7797 9 5.7797ZM9 5.7797C9 5.7797 9 4.16546 9 3.69637C9 2.54578 8.06726 1.61304 6.91667 1.61304C5.76607 1.61304 4.83333 2.54578 4.83333 3.69637C4.83333 4.84696 5.76607 5.7797 6.91667 5.7797C7.59817 5.7797 9 5.7797 9 5.7797ZM3.16667 9.11304H14.8333M3.16667 9.11304C2.24619 9.11304 1.5 8.36684 1.5 7.44637C1.5 6.5259 2.24619 5.7797 3.16667 5.7797H14.8333C15.7538 5.7797 16.5 6.5259 16.5 7.44637C16.5 8.36684 15.7538 9.11304 14.8333 9.11304M3.16667 9.11304L3.16667 14.9464C3.16667 15.8668 3.91286 16.613 4.83333 16.613H13.1667C14.0871 16.613 14.8333 15.8668 14.8333 14.9464V9.11304"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    // {
    //   name: "Draft Listings",
    //   icon: (
    //     <svg
    //       width="18"
    //       height="18"
    //       viewBox="0 0 18 18"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="stroke-current"
    //     >
    //       <path
    //         d="M9 5.7797V16.613M9 5.7797C9 5.7797 9 4.53572 9 4.11304C9 3.19256 9.74619 2.44637 10.6667 2.44637C11.5871 2.44637 12.3333 3.19256 12.3333 4.11304C12.3333 5.03351 11.5871 5.7797 10.6667 5.7797C10.1689 5.7797 9 5.7797 9 5.7797ZM9 5.7797C9 5.7797 9 4.16546 9 3.69637C9 2.54578 8.06726 1.61304 6.91667 1.61304C5.76607 1.61304 4.83333 2.54578 4.83333 3.69637C4.83333 4.84696 5.76607 5.7797 6.91667 5.7797C7.59817 5.7797 9 5.7797 9 5.7797ZM3.16667 9.11304H14.8333M3.16667 9.11304C2.24619 9.11304 1.5 8.36684 1.5 7.44637C1.5 6.5259 2.24619 5.7797 3.16667 5.7797H14.8333C15.7538 5.7797 16.5 6.5259 16.5 7.44637C16.5 8.36684 15.7538 9.11304 14.8333 9.11304M3.16667 9.11304L3.16667 14.9464C3.16667 15.8668 3.91286 16.613 4.83333 16.613H13.1667C14.0871 16.613 14.8333 15.8668 14.8333 14.9464V9.11304"
    //         strokeWidth="2"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //     </svg>
    //   ),
    // },
    {
      name: "New Listing",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current"
        >
          <path
            d="M9 5.7797V16.613M9 5.7797C9 5.7797 9 4.53572 9 4.11304C9 3.19256 9.74619 2.44637 10.6667 2.44637C11.5871 2.44637 12.3333 3.19256 12.3333 4.11304C12.3333 5.03351 11.5871 5.7797 10.6667 5.7797C10.1689 5.7797 9 5.7797 9 5.7797ZM9 5.7797C9 5.7797 9 4.16546 9 3.69637C9 2.54578 8.06726 1.61304 6.91667 1.61304C5.76607 1.61304 4.83333 2.54578 4.83333 3.69637C4.83333 4.84696 5.76607 5.7797 6.91667 5.7797C7.59817 5.7797 9 5.7797 9 5.7797ZM3.16667 9.11304H14.8333M3.16667 9.11304C2.24619 9.11304 1.5 8.36684 1.5 7.44637C1.5 6.5259 2.24619 5.7797 3.16667 5.7797H14.8333C15.7538 5.7797 16.5 6.5259 16.5 7.44637C16.5 8.36684 15.7538 9.11304 14.8333 9.11304M3.16667 9.11304L3.16667 14.9464C3.16667 15.8668 3.91286 16.613 4.83333 16.613H13.1667C14.0871 16.613 14.8333 15.8668 14.8333 14.9464V9.11304"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "Profile",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current"
        >
          <path
            d="M1.5 9.11304L3.16667 7.44637M3.16667 7.44637L9 1.61304L14.8333 7.44637M3.16667 7.44637V15.7797C3.16667 16.2399 3.53976 16.613 4 16.613H6.5M14.8333 7.44637L16.5 9.11304M14.8333 7.44637V15.7797C14.8333 16.2399 14.4602 16.613 14 16.613H11.5M6.5 16.613C6.96024 16.613 7.33333 16.2399 7.33333 15.7797V12.4464C7.33333 11.9861 7.70643 11.613 8.16667 11.613H9.83333C10.2936 11.613 10.6667 11.9861 10.6667 12.4464V15.7797C10.6667 16.2399 11.0398 16.613 11.5 16.613M6.5 16.613H11.5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "Help Center",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current"
        >
          <path
            d="M1.5 9.11304L3.16667 7.44637M3.16667 7.44637L9 1.61304L14.8333 7.44637M3.16667 7.44637V15.7797C3.16667 16.2399 3.53976 16.613 4 16.613H6.5M14.8333 7.44637L16.5 9.11304M14.8333 7.44637V15.7797C14.8333 16.2399 14.4602 16.613 14 16.613H11.5M6.5 16.613C6.96024 16.613 7.33333 16.2399 7.33333 15.7797V12.4464C7.33333 11.9861 7.70643 11.613 8.16667 11.613H9.83333C10.2936 11.613 10.6667 11.9861 10.6667 12.4464V15.7797C10.6667 16.2399 11.0398 16.613 11.5 16.613M6.5 16.613H11.5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "Settings",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current"
        >
          <path
            d="M9 5.7797V16.613M9 5.7797C9 5.7797 9 4.53572 9 4.11304C9 3.19256 9.74619 2.44637 10.6667 2.44637C11.5871 2.44637 12.3333 3.19256 12.3333 4.11304C12.3333 5.03351 11.5871 5.7797 10.6667 5.7797C10.1689 5.7797 9 5.7797 9 5.7797ZM9 5.7797C9 5.7797 9 4.16546 9 3.69637C9 2.54578 8.06726 1.61304 6.91667 1.61304C5.76607 1.61304 4.83333 2.54578 4.83333 3.69637C4.83333 4.84696 5.76607 5.7797 6.91667 5.7797C7.59817 5.7797 9 5.7797 9 5.7797ZM3.16667 9.11304H14.8333M3.16667 9.11304C2.24619 9.11304 1.5 8.36684 1.5 7.44637C1.5 6.5259 2.24619 5.7797 3.16667 5.7797H14.8333C15.7538 5.7797 16.5 6.5259 16.5 7.44637C16.5 8.36684 15.7538 9.11304 14.8333 9.11304M3.16667 9.11304L3.16667 14.9464C3.16667 15.8668 3.91286 16.613 4.83333 16.613H13.1667C14.0871 16.613 14.8333 15.8668 14.8333 14.9464V9.11304"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];
  return (
    <>
      <div
        className={mergeClass(
          showMobileNav ? "left-0 right-0" : "-left-full",
          "transition-all flex flex-col justify-between w-screen sm:w-[276px] sm:left-0 sm:right-0  sm:relative  z-[9999] md:z-0 bg-primary-active overflow-hidden fixed mt-[15%] sm:mt-0 pb-20 sm:pb-0 h-screen sm:min-h-screen sm:max-h-screen pt-5 px-6"
        )}
      >
        <div className="">
          <div className="sm:flex justify-center mb-[50.34px] hidden ">
            <Button
              className="dark:hover:bg-transparent"
              variant="link"
              href="/"
            >
              <Image
                src="/images/home356.jpg"
                width={102.48}
                height={48.11}
                alt="ARM Logo"
              />
            </Button>
          </div>
          <div className="flex flex-col justify-between lg:mb-1 !h-[73vh] overflow-y-auto overflow-x-hidden sidebar-scrollbar">
            <div>
              {sidebarLinks.map((link, index) => (
                <DashboardSidebarItem
                  key={index}
                  name={link.name}
                  options={(link as SidebarOptionProps)?.options}
                  activeOption={
                    (link as SidebarOptionProps)?.activeOption as string
                  }
                  tooltipText={(link as SidebarOptionProps)?.tooltipText}
                  onOptionSelect={(value) =>
                    (link as SidebarOptionProps).onOptionSelect &&
                    (link as SidebarOptionProps)?.onOptionSelect(value)
                  }
                >
                  {link.icon}
                </DashboardSidebarItem>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <Button
            variant="destructive"
            className="flex justify-start  w-full h-11 px-[18.5px] rounded-md mb-5 text-16 hover:bg-primary-disabled text-white font-semibold"
            onClick={() => handleLogout()}
          >
            <>
              <span className="flex items-center">
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current"
                >
                  <path
                    d="M13.1667 11.4463L16.5 8.11296M16.5 8.11296L13.1667 4.77962M16.5 8.11296L4.83333 8.11295M9.83333 11.4463V12.2796C9.83333 13.6603 8.71405 14.7796 7.33333 14.7796H4C2.61929 14.7796 1.5 13.6603 1.5 12.2796V3.94629C1.5 2.56558 2.61929 1.44629 4 1.44629H7.33333C8.71405 1.44629 9.83333 2.56558 9.83333 3.94629V4.77962"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="ml-4 font-Open-Sans">Logout</span>
            </>
          </Button>
        </div>
      </div>
    </>
  );
}
