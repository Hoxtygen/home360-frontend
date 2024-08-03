import React from "react";

import { EnquiryMessageItemProps } from "./types";
import { formatDate } from "lib/utils/utils";

export default function MessageItem({
  date,
  messageString,
  senderEmail,
}: EnquiryMessageItemProps) {
  return (
    <div className="border mb-2 border-gray-300 lg:flex px-3 justify-between items-center flex-wrap py-4 rounded-md">
      <div className="basis-3/12">
        <p className="font-hanken-black">{senderEmail}</p>
        <p className="font-hanken-semibold md:block ">{formatDate(date)}</p>
      </div>
      <p className="basis-9/12">{messageString}</p>
    </div>
  );
}
