import { useMutation } from "@tanstack/react-query";
import { HOME_360_LISTING_ENQUIRY_BASE } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export default function useMarkAsRead() {
  const { data, error, status, mutate } = useMutation({
    mutationKey: ["mark_as_read"],
    mutationFn: (enquiryMessageId: string) =>
      requestHandler(
        `${HOME_360_LISTING_ENQUIRY_BASE}/${enquiryMessageId}/read`,
        {
          method: "PATCH",
        }
      ),
  });
  return {
    markAsReadData: data?.data,
    markAsReadStatus: status,
    markAsReadError: errorHandler(error),
    mutateMarkAsRead: mutate,
  };
}
