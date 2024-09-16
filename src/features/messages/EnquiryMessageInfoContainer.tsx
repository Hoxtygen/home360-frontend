import React from "react";
import {
  EnquiryMessageInfoContainerProps,
  EnquiryMessageReplyFormData,
} from "./types";
import EnquiryMessageInfo from "./EnquiryMessageInfo";
import EnquiryMessageReplies from "./EnquiryMessageReplies";
import EnquiryMessageReplyForm from "./EnquiryMessageReplyForm";

export default function EnquiryMessageInfoContainer({
  enquiryData,
  handleSubmitReply,
  messageStatus,
}: EnquiryMessageInfoContainerProps) {
  const replyInitialValues: EnquiryMessageReplyFormData = {
    content: "",
    receiverId: enquiryData.userId!,
    senderId: enquiryData.agentId,
  };
  return (
    <div className="pb-20">
      <EnquiryMessageInfo enquiryData={enquiryData} />
      {enquiryData && enquiryData.userId && (
        <>
          {enquiryData.replies && enquiryData.replies.length > 0 && (
            <EnquiryMessageReplies replies={enquiryData.replies} />
          )}
          <EnquiryMessageReplyForm
            replyInitialValues={replyInitialValues}
            handleSubmitReply={handleSubmitReply}
            messageStatus={messageStatus}
          />
        </>
      )}
    </div>
  );
}
