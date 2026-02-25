import React from "react";

import { EnquiryMessageItemProps } from "./types";
import { formatDate } from "lib/utils/utils";
import clsx from "clsx";

export default function MessageItem({
  date,
  messageString,
  senderEmail,
  isRead,
}: Readonly<EnquiryMessageItemProps>) {
  return (
    <div
      className={clsx(
        "border mb-2 border-gray-300 lg:flex px-3 justify-between items-center flex-wrap py-4 rounded-md",
        isRead ? "bg-transparent" : "bg-green-100"
      )}
    >
      <div className="basis-3/12">
        <p className="font-hanken-black">{senderEmail}</p>
        <p className="font-hanken-semibold md:block ">{formatDate(date)}</p>
      </div>
      <p
        className={clsx(
          "basis-9/12",
          isRead ? "font-hanken-regular" : "font-hanken-black"
        )}
      >
        {messageString}
      </p>
    </div>
  );
}
