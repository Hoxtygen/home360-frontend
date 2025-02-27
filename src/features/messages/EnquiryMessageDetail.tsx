import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

import { useGetListingEnquiry } from "hooks/useGetListingEnquiry";
import { isEnquiryMessageDetailResponse } from "lib/utils/utils";
import EnquiryMessageInfoContainer from "./EnquiryMessageInfoContainer";
import Spinner from "components/loaders/Spinner";
import ErrorMessage from "shared/ErrorMessage";
import usePostReply from "hooks/usePostReply";
import { EnquiryMessageReplyFormData } from "./types";
import { connect, sendMessage } from "lib/services/websocket.service";

type EnquiryMessageDetailProps = {
  enquiryId: string;
};

export type ListingEnquiryMessageReply = {
  id: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  content: string;
  enquiryId: string;
};
export default function EnquiryMessageDetail({
  enquiryId,
}: EnquiryMessageDetailProps) {
  const [messages, setMessages] = useState<ListingEnquiryMessageReply[]>([]);
  const [messageContent, setMessageContent] = useState<string>("");
  const {
    listingEnquiryData,
    listingEnquiryError,
    listingEnquiryStatus,
    refetchListingEnquiry,
  } = useGetListingEnquiry(enquiryId);

  const { replyData, replyError, mutateReply, replyStatus } =
    usePostReply(enquiryId);

  useEffect(() => {
    connect(enquiryId, (message: ListingEnquiryMessageReply) => {
      console.log("Message:", message);
    });
  }, [enquiryId]);

  function handleSubmitReply(
    replyRequestData: EnquiryMessageReplyFormData,
    callback: () => void
  ) {
    // mutateReply(replyRequestData, {
    //   onSuccess: () => callback(),
    // });
    sendMessage(enquiryId, replyRequestData);
    callback();
  }

  // useEffect(() => {
  //   if (replyData?.status === "CREATED") {
  //     refetchListingEnquiry();
  //   }
  // }, [refetchListingEnquiry, replyData?.status]);

  // useEffect(() => {
  //   if (replyError) {
  //     toast.error(replyError.message, { duration: 3000 });
  //   }
  // }, [replyError]);

  return (
    <div>
      {listingEnquiryStatus === "loading" && <Spinner />}

      {listingEnquiryError && (
        <ErrorMessage error={listingEnquiryError?.message} />
      )}
      {isEnquiryMessageDetailResponse(listingEnquiryData) && (
        <EnquiryMessageInfoContainer
          enquiryData={listingEnquiryData?.data}
          handleSubmitReply={handleSubmitReply}
          messageStatus={replyStatus}
          enquiryId={enquiryId}
        />
      )}
    </div>
  );
}
