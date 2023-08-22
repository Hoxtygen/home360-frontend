import LoadingScreen from "components/shared/LoadingScreen";
import useWindowSize from "hooks/useWindowSize";
import { mergeClass } from "lib/utils/utils";
import React, { ReactNode, useState } from "react";
import DashboardHeader, { DashboardHeaderProps } from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import MobileHeader from "./MobileHeader";

interface DashboardLayoutProps {
  title: string;
  children: ReactNode;
  backTitle?: string;
  isLoading: boolean;
}

export default function DashboardLayout({
  title,
  children,
  backTitle,
  isLoading,
  handleTourStart,
}: DashboardLayoutProps & DashboardHeaderProps) {
  const { width } = useWindowSize();
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <div>
      <div className="md:hidden w-screen z-[9999] left-0 fixed">
        <MobileHeader
          setShowMobileNav={setShowMobileNav}
          showMobileNav={showMobileNav}
          handleTourStart={handleTourStart}
        />
      </div>
      <div className="flex font-Open-Sans">
        <div
          className={mergeClass(
            "md:ml-0",
            width && width < 600 ? "" : "tour-guide-desktop-sidebar"
          )}
        >
          <DashboardSidebar
            showMobileNav={showMobileNav}
            setShowMobileNav={setShowMobileNav}
          />
        </div>
        <div className="bg-[#FBFBFB] h-screen lg:max-h-screen w-full overflow-y-auto pt-[15%] sm:pt-0 sm:mt-0">
          <div className="">
            <DashboardHeader
              title={title}
              // backTitle={backTitle}
              // handleTourStart={handleTourStart}
            />
          </div>
          <div className="max-h-full px-5 sm:px-10 pt-[25%] sm:pt-28">
            {isLoading ? (
              <div>
                <LoadingScreen />
                <span className="block text-center font-Open-Sans">
                  Getting your information, please wait...
                </span>
              </div>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
