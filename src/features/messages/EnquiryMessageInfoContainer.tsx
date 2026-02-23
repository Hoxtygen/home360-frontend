import { useGetListingEnquiryMessages } from "hooks/useGetListingEnquiries";
import EnquiryMessageInfo from "./EnquiryMessageInfo";
import EnquiryMessageReplies from "./EnquiryMessageReplies";
import EnquiryMessageReplyForm from "./EnquiryMessageReplyForm";
import {
  EnquiryMessageInfoContainerProps,
  EnquiryMessageReplyFormData,
} from "./types";
import { useEnquiryWebSocket } from "./useEnquiryWebSocket";

export default function EnquiryMessageInfoContainer({
  enquiryData,
  enquiryId,
}: EnquiryMessageInfoContainerProps) {
  const {
    listingEnquiryMessagesData: fetchedMessages,
    listingEnquiryMessagesStatus,
    listingEnquiryMessagesError,
  } = useGetListingEnquiryMessages(enquiryId);

  const { messages, messageStatuses, handleSubmitReply } = useEnquiryWebSocket({
    enquiryId,
    externalMessages: fetchedMessages?.data.items || [],
  });

  const replyInitialValues: EnquiryMessageReplyFormData = {
    content: "",
    enquirerId: enquiryData.userId!,
    agentId: enquiryData.agentId,
    enquiryId: enquiryId,
  };

  return (
    <div className="pb-20">
      <EnquiryMessageInfo enquiryData={enquiryData} />
      {enquiryData?.userId && (
        <>
          <div className="mb-10">
            {listingEnquiryMessagesStatus === "loading" && (
              <div>Loading messages...</div>
            )}
            {listingEnquiryMessagesError && (
              <div>{listingEnquiryMessagesError.message}</div>
            )}
            {
              <EnquiryMessageReplies
                replies={messages}
                agentId={enquiryData.agentId}
                enquirerId={enquiryData.userId}
                enquirerName={`${enquiryData.firstName} ${enquiryData.lastName}`}
              />
            }
          </div>
          <EnquiryMessageReplyForm
            replyInitialValues={replyInitialValues}
            handleSubmitReply={handleSubmitReply}
            messageStatuses={messageStatuses}
          />
        </>
      )}
    </div>
  );
}
