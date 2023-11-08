import clsx from "clsx";
import React, { ReactNode, useEffect, useState } from "react";

type DialogOpenState = {
  children: ReactNode;
  contentBlockClass?: string;
  handleClose: () => void;
  headerTitle?: string;
  hideContentMaxHeight?: boolean;
  maxHeight?: number | string;
  maxWidth?: number | string;
  show: boolean;
  title: string;
};

export default function Dialog({
  children,
  contentBlockClass,
  handleClose,
  headerTitle,
  hideContentMaxHeight,
  maxHeight,
  maxWidth,
  show,
  title,
}: DialogOpenState) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  return (
    <div
      className={clsx(
        isOpen &&
          "top-0 left-0 z-[9999999] bottom-0  absolute bg-opacity-50 bg-black w-screen font-hanken-regular overflow-y-scroll overflow-x-hidden"
      )}
    >
      <div className="flex items-center justify-center h-screen ">
        <div
          className={clsx(
            contentBlockClass || "",
            "transition-all duration-150 px-4 sm:px-6 mx-2 sm:mx-0 pt-7 pb-4 bg-white rounded-[10px] overflow-y-auto custom-scrollbar"
          )}
          style={{
            maxHeight:
              typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
            maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
          }}
        >
          {/* Modal Header */}
          <div className="mb-6 bg-inherit">
            <div className="">
              <div className="flex justify-between">
                <p className="text-18 leading-24 font-avenir-heavy text-grayscale-label">
                  {title}
                </p>
                {/* Close button */}
                <div className="cursor-pointer" onClick={() => handleClose()}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.01807 13.7346L13.0181 1.73462M1.01807 1.73462L13.0181 13.7346"
                      stroke="#C30052"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <p className="font-avenir-black text-24 sm:text-32 mt-[30px] text-grayscale-title-active">
                {headerTitle}
              </p>
              <hr className="bg-[#E6E2DD] h-[1px] border-0 my-[14px]" />
            </div>
          </div>
          {/* Modal Body */}
          {isOpen && (
            <div
              className={clsx(
                hideContentMaxHeight ? "" : "max-h-[500px]",
                "pb-4 hide-scrollbar"
              )}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
