import { useGetListingEnquiry } from "hooks/useGetListingEnquiry";
import { isEnquiryMessageDetailResponse } from "lib/utils/utils";
import EnquiryMessageInfoContainer from "./EnquiryMessageInfoContainer";
import Spinner from "components/loaders/Spinner";
import ErrorMessage from "shared/ErrorMessage";
import usePostReply from "hooks/usePostReply";
import { EnquiryMessageReplyFormData } from "./types";
import { useEffect } from "react";
import toast from "react-hot-toast";

type EnquiryMessageDetailProps = {
  enquiryId: string;
};
export default function EnquiryMessageDetail({
  enquiryId,
}: EnquiryMessageDetailProps) {
  const { listingEnquiryData, listingEnquiryError, listingEnquiryStatus } =
    useGetListingEnquiry(enquiryId);
  const { replyData, replyError, mutateReply, replyStatus } =
    usePostReply(enquiryId);

  function handleSubmitReply(
    replyRequestData: EnquiryMessageReplyFormData,
    callback: () => void
  ) {
    mutateReply(replyRequestData, {
      onSuccess: () => callback(),
    });
  }

  useEffect(() => {
    if (replyError) {
      toast.error(replyError.message, { duration: 3000 });
    }
  }, [replyError]);

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
        />
      )}
    </div>
  );
}
