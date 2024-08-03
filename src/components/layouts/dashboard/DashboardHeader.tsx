import { FC, ReactNode } from "react";
import Image from "next/image";

import { useRouter } from "next/router";
// import Tooltip from "react-tooltip";
import clsx from "clsx";

export interface DashboardHeaderProps {
  backTitle?: ReactNode;
  title?: string;
  // eslint-disable-next-line unused-imports/no-unused-vars
  handleTourStart?: (e: React.MouseEvent<HTMLElement>) => void;
  accounts?: any[];
  membershipNumber?: any;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({
  backTitle,
  title,
  handleTourStart,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between bg-white fixed w-full z-50 md:w-[calc(100vw-276px)] h-[74px] pr-5 pl-5 sm:pl-6 sm:pr-10 py-[18px] shadow-landing-header">
        <div
          className={clsx(
            "font-medium text-18 sm:text-24 leading-38",
            `${backTitle && " flex items-center"}`
          )}
        >
          <span
            className={clsx(
              "mr-[13px] cursor-pointer font-Open-Sans",
              `${backTitle ? " sm:ml-4" : ""}`
            )}
          >
            <span className="space-x-3">
              {backTitle && (
                <Image
                  src="/icons/arrow-left.svg"
                  alt="back arrow"
                  width={9.6}
                  height="16"
                  onClick={() => router.back()}
                />
              )}

              {backTitle}
            </span>
          </span>
          {backTitle && (
            <span className="mr-[13px]">
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="4" fill="#A41857" />
              </svg>
            </span>
          )}
          <span
            className={`font-Open-Sans text-lg ${
              backTitle && "underline"
            } truncate lg:w-[inherit] w-56 text-lg font-semibold`}
          >
            {title}
          </span>
        </div>
        <div className="sm:flex items-center space-x-5 sm:space-x-10 hidden">
          {router.pathname === "/dashboard" && (
            <div
              className="flex items-center cursor-pointer font-avenir text-16 bg-primary-active text-white p-2 px-4 space-x-2 rounded hover:bg-primary-hover"
              data-tip="Take a tour"
              onClick={handleTourStart}
            >
              <span className="flex items-center">
                <Image
                  src="/icons/tour-icon.svg"
                  alt="tour-icon"
                  width={19.76}
                  height={19.76}
                />
              </span>
              <span>Take Tour</span>
            </div>
          )}
          <div
            className="flex items-center cursor-pointer"
            data-tip="My Profile"
            onClick={() =>
              router.push("/my-profile?selectedItem=basic-information")
            }
          >
            <Image
              height={18}
              width={18}
              alt="profile icon"
              src="/icons/header-icon-avatar.svg"
            />
          </div>
        </div>
      </div>
      {/* {isWindowLoaded && (<Tooltip />)} */}
    </>
  );
};

export default DashboardHeader;
