import React from "react";
import { EnquiryMessageReplyItemProps } from "./types";
import useLocalStorage from "hooks/useLocalStorage";
import { MappedSuccessLoginResponse } from "@/typedef";
import clsx from "clsx";
import { formatNDate } from "lib/utils/utils";

export default function EnquiryMessageReply({
  createdAt,
  content,
  senderId,
}: EnquiryMessageReplyItemProps) {
  const [user, _] = useLocalStorage<MappedSuccessLoginResponse | null>(
    "user",
    null
  );

  return (
    <div
      className={clsx(
        "p-4 border mb-2 rounded-sm",
        user?.id === senderId ? "bg-gray-300" : "bg-blue-300"
      )}
    >
      <p>{content}</p>
      <small className="text-9">{formatNDate(createdAt)}</small>
    </div>
  );
}
