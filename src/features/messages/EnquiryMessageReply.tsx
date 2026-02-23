import React from "react";
import { EnquiryMessageReplyItemProps } from "./types";
import useLocalStorage from "hooks/useLocalStorage";
import { MappedSuccessLoginResponse } from "@/typedef";
import clsx from "clsx";
import { determineSender, formatNDate } from "lib/utils/utils";

export default function EnquiryMessageReply({
  createdAt,
  content,
  enquirerId,
  agentId,
  senderId,
  id,
  agentName,
  enquirerName,
}: Readonly<EnquiryMessageReplyItemProps>) {
  const [user, _] = useLocalStorage<MappedSuccessLoginResponse | null>(
    "user",
    null
  );
  const message: EnquiryMessageReplyItemProps = {
    id,
    createdAt,
    content,
    enquirerId,
    agentId,
    senderId,
  };
  const { isSenderAgent, senderName, isCurrentUserSender } = determineSender(
    user,
    message,
    { agentName, enquirerName }
  );

  const messageClass = clsx(
    "p-4 mb-2 text-white text-18 rounded-lg border",
    isSenderAgent ? "bg-[#222] " : "bg-green-900",
    isCurrentUserSender ? "text-right" : "text-left"
  );
  return (
    <div className={messageClass}>
      <p>{senderName}</p>
      <p>{content}</p>
      <small className="text-9">{formatNDate(createdAt)}</small>
    </div>
  );
}
