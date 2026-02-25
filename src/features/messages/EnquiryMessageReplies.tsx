import React from "react";
import { EnquiryMessageRepliesProps } from "./types";
import EnquiryMessageReply from "./EnquiryMessageReply";
import { sortByProperty } from "lib/utils/utils";

export type EnquiryMessageRepliesExtendedProps = EnquiryMessageRepliesProps & {
  messageStatuses?: { [key: string]: { success?: boolean; error?: any } };
};

export default function EnquiryMessageReplies({
  replies = [],
  agentId,
  enquirerId,
  agentName,
  enquirerName,
  messageStatuses = {},
}: Readonly<EnquiryMessageRepliesExtendedProps>) {
  return (
    <div>
      <h1 className="p-4 font-hanken-black text-24">Conversations</h1>
      {sortByProperty(replies, "createdAt").map((reply) => {
        return (
          <div key={reply.id}>
            <EnquiryMessageReply
              id={reply.id}
              agentId={agentId}
              enquirerId={enquirerId}
              createdAt={reply.createdAt}
              content={reply.content}
              senderId={reply.senderId}
              agentName={agentName}
              enquirerName={enquirerName}
              status={messageStatuses[reply.id]}
            />
          </div>
        );
      })}
    </div>
  );
}
