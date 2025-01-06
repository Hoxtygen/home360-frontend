import useWindowSize from "hooks/useWindowSize";
import { mergeClass } from "lib/utils/utils";
import { ReactNode, useState } from "react";
import LoadingScreen from "shared/LoadingScreen";
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
    <>
      <div className="md:hidden w-screen z-[9999] left-0 fixed">
        <MobileHeader
          setShowMobileNav={setShowMobileNav}
          showMobileNav={showMobileNav}
          handleTourStart={handleTourStart}
        />
      </div>
      <div className="flex flex-shrink-0 h-full">
        <div
          className={mergeClass(
            "md:ml-0 h-[100%]",
            width && width < 600 ? "" : "tour-guide-desktop-sidebar"
          )}
        >
          <DashboardSidebar
            showMobileNav={showMobileNav}
            setShowMobileNav={setShowMobileNav}
          />
        </div>
        <div className="bg-[#FBFBFB] h-screen lg:max-h-screen w-full overflow-y-aut pt-[15%] sm:pt-0 sm:mt-0">
          <div className="">
            <DashboardHeader title={title} />
          </div>
          <div className="min-h-full px-5 sm:px-10 pt-[25%] sm:pt-28 dark:bg-slate-800">
            {isLoading ? (
              <>
                <LoadingScreen />
                <span className="block text-center font-hanken-medium">
                  Getting your information, please wait...
                </span>
              </>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </>
  );
}
