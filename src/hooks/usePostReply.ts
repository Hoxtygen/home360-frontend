import { useMutation } from "@tanstack/react-query";
import { EnquiryMessageReplyFormData } from "features/messages/types";
import { HOME_360_LISTING_ENQUIRY_BASE } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export default function usePostReply(enquiryId: string) {
  const { data, error, status, mutate } = useMutation({
    mutationKey: ["post_message_reply"],
    mutationFn: (replyFormData: EnquiryMessageReplyFormData) =>
      requestHandler(`${HOME_360_LISTING_ENQUIRY_BASE}/${enquiryId}/message`, {
        method: "POST",
        data: replyFormData,
      }),
  });
  return {
    replyData: data?.data,
    replyStatus: status,
    replyError: errorHandler(error),
    mutateReply: mutate,
  };
}
