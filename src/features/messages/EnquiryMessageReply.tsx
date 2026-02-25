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
  status,
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

  const isError = status?.error;

  const messageClass = clsx(
    "p-4 mb-2 text-white text-18 rounded-lg border transition-colors",
    isSenderAgent ? "bg-[#222]" : "bg-green-900",
    isCurrentUserSender ? "ml-auto text-right" : "mr-auto text-left",
    isError ? "border-red-500 bg-red-950/20" : "border-transparent",
    "max-w-[80%]"
  );

  return (
    <div className={messageClass}>
      <div className="flex items-center justify-between gap-4 mb-1">
        <span className="font-bold">{senderName}</span>
        {isError && (
          <span className="text-10 text-red-400 font-bold uppercase tracking-wider">
            Failed to send
          </span>
        )}
      </div>
      <p className="whitespace-pre-wrap">{content}</p>
      <div className="mt-1 flex items-center justify-end gap-2">
        {isError && (
          <span className="text-10 text-red-300 italic">
            {typeof status.error === "string"
              ? status.error
              : "Connection error"}
          </span>
        )}
        <small className="text-9 opacity-70">{formatNDate(createdAt)}</small>
      </div>
    </div>
  );
}
