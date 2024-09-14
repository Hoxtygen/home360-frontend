import React from "react";
import { EnquiryMessageInfoProps } from "./types";
import EnquiryMessageInfo from "./EnquiryMessageInfo";
import EnquiryMessageReplies from "./EnquiryMessageReplies";

export default function EnquiryMessageInfoContainer({
  enquiryData,
}: EnquiryMessageInfoProps) {
  return (
    <div className="pb-20">
      <EnquiryMessageInfo enquiryData={enquiryData} />
      {enquiryData.replies && enquiryData.replies.length > 0 && (
        <EnquiryMessageReplies replies={enquiryData.replies} />
      )}
    </div>
  );
}
