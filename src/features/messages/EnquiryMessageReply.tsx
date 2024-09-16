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
  const isSame = user?.id === senderId;
  return (
    <div
      className={clsx(
        "p-4 border mb-2 rounded-sm",
        isSame && "bg-gray-300",
        !isSame && "bg-yellow-300"
      )}
    >
      <p>{isSame && "You"}</p>
      <p>{content}</p>
      <small className="text-9">{formatNDate(createdAt)}</small>
    </div>
  );
}
