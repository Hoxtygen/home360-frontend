import React, { useEffect, useState } from "react";
import clsx from "clsx";
import DialogHeader from "./DialogHeader";
import { DialogProps } from "./types";

export default function Dialog({
  title,
  show,
  handleClose,
  contentBlockClass,
  maxHeight,
  maxWidth,
  hideContentMaxHeight,
  children,
}: DialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(show);
  }, [show]);
  return (
    <div
      className={clsx(
        isOpen &&
          "top-0 left-0 z-[99999999]  fixed bg-opacity-80 bg-black h-screen w-screen font-avenir overflow-y-auto overflow-x-hidden"
      )}
    >
      <div className="flex items-center justify-center h-screen ">
        <div
          className={clsx(
            contentBlockClass || "",
            isOpen &&
              "transition-all duration-150 px-4 sm:px-6 mx-2 sm:mx-0 pt-7 pb-4 bg-white rounded-[10px] overflow-y-auto custom-scrollbar w-[500px]"
          )}
          style={{
            maxHeight:
              typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
            maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
          }}
        >
          <DialogHeader handleClose={handleClose} title={title} />
          <hr className="bg-[#E6E2DD] h-[1px] border-0 my-[14px]" />
          {isOpen && (
            <div
              className={clsx(
                hideContentMaxHeight ? "" : "max-h-[800px]",
                "pb-4 hide-scrollbar"
              )}
            >
              {children}
              <div></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
