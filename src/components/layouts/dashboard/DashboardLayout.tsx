import useWindowSize from "hooks/useWindowSize";
import { mergeClass } from "lib/utils/utils";
import { ReactNode, useEffect, useState } from "react";
import DashboardHeader, { DashboardHeaderProps } from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import MobileHeader from "./MobileHeader";
import { BouncingLoader } from "components/loaders/BouncingLoader";
import { useLogout } from "hooks/useLogout";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface DashboardLayoutProps {
  title: string;
  children: ReactNode;
  backTitle?: string;
  isLoading: boolean;
}

export default function DashboardLayout({
  title,
  children,
  isLoading,
  handleTourStart,
}: DashboardLayoutProps & DashboardHeaderProps) {
  const router = useRouter();
  const { width } = useWindowSize();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { mutateLogout, logoutData, logoutStatus } = useLogout();
  const handleLogout = () => {
    mutateLogout();
  };

  useEffect(() => {
    if (logoutData?.status === "OK") {
      toast.success(logoutData.data, {
        duration: 5000,
      });
      localStorage.clear();
      router.push("/");
    }
  }, [logoutData, router]);
  return (
    <>
      <div className="md:hidden w-screen z-[9999] left-0 fixed">
        <MobileHeader
          setShowMobileNav={setShowMobileNav}
          showMobileNav={showMobileNav}
          handleTourStart={handleTourStart}
        />
      </div>
      {logoutStatus === "loading" && <BouncingLoader />}
      <div className="flex flex-shrink-0 h-full items-stretch">
        <div
          className={mergeClass(
            "md:ml-0 min-h-full",
            width && width < 600 ? "" : "tour-guide-desktop-sidebar"
          )}
        >
          <DashboardSidebar
            showMobileNav={showMobileNav}
            setShowMobileNav={setShowMobileNav}
            handleLogout={handleLogout}
          />
        </div>
        <div className="bg-[#FBFBFB] min-h-screen lg:max-h-scree w-full overflow-y-auto pt-[15%] sm:pt-0 sm:mt-0">
          <div className="">
            <DashboardHeader title={title} />
          </div>
          <div className="min-h-full px-5 sm:px-10 pt-[25%] sm:pt-28 dark:bg-slate-800">
            {isLoading ? (
              <>
                <BouncingLoader />
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
