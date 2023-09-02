import { FC } from "react";
import Image from "next/image";
import router from "next/router";
import { MobileHeaderProps } from "./DashboardSidebar";
import clsx from "clsx";
import useWindowSize from "hooks/useWindowSize";

const MobileHeader: FC<MobileHeaderProps> = ({
  setShowMobileNav,
  showMobileNav,
  handleTourStart,
}) => {
  const { width } = useWindowSize();

  return (
    <div className="py-4 px-7 bg-primary-active drop-shadow-[0_0_15px_rgba(17,17,17,0.04)] flex justify-between items-center  ">
      <div
        onClick={() => setShowMobileNav(!showMobileNav)}
        className={clsx(
          "cursor-pointer",
          width && width < 600 ? "tour-guide-desktop-sidebar" : ""
        )}
      >
        <Image
          src="/icons/menuIcon.svg"
          height={24}
          width={24}
          alt="menu icon"
        />
      </div>
      <div className="flex justify-center items-center">
        <Image
          src="/icons/arm-dashboard-logo.svg"
          width={76.36}
          height={35.76}
          alt="ARM Logo"
        />
      </div>
      <div className="flex space-x-4  ">
        {/* {router.pathname === "/dashboard" && ( */}
        <span
          className=" cursor-pointer text-13 font-avenir text-white"
          data-tip="Take Tour"
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
        </span>
        {/* )} */}

        <span
          onClick={() =>
            router.push("/my-profile?selectedItem=basic-information")
          }
        >
          <Image
            src="/icons/header-icon-avatar-white-bg.svg"
            height={18}
            width={18}
            alt="avatar icon"
            className="pt-4"
          />
        </span>
      </div>
    </div>
  );
};

export default MobileHeader;
