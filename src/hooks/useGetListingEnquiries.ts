import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import {
  EnquiryMessageReplyItemProps,
  ListingEnquiryMessageResponse,
} from "features/messages/types";
import { HOME_360_LISTING_ENQUIRY_BASE } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

type UseGetListingEnq = {
  page: number;
  size?: number;
  otherPartyId?: number;
};

export default function useGetListingEnquiries(
  listingEnqData: UseGetListingEnq
) {
  const token = getCookie("token");
  const params = new URLSearchParams();
  if (listingEnqData.otherPartyId) {
    params.append("otherPartyId", String(listingEnqData.otherPartyId));
  }
  if (listingEnqData.size) {
    params.append("size", String(listingEnqData.size));
  }
  if (listingEnqData.page) {
    params.append("page", String(listingEnqData.page));
  }

  const { data, error, status } = useQuery({
    queryKey: ["listing_enquiries", listingEnqData.page, listingEnqData.size],
    networkMode: "always",
    queryFn: () =>
      requestHandler<ListingEnquiryMessageResponse>(
        `${HOME_360_LISTING_ENQUIRY_BASE}?${params.toString()}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      ),
  });
  return {
    listingEnquiriesData: data?.data,
    listingEnquiriesError: errorHandler(error),
    listingEnquiriesStatus: status,
  };
}

export type EnquiryMessageReplySuccessResponse = {
  status: string;
  message: string;
  data: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    items: EnquiryMessageReplyItemProps[];
  };
};

export function useGetListingEnquiryMessages(enquiryId: string) {
  const token = getCookie("token");
  const { data, error, status } = useQuery({
    queryKey: ["listing_enquiry_messages", enquiryId],
    networkMode: "always",
    queryFn: () =>
      requestHandler<EnquiryMessageReplySuccessResponse>(
        `${HOME_360_LISTING_ENQUIRY_BASE}/${enquiryId}/messages`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      ),
  });
  return {
    listingEnquiryMessagesData: data?.data,
    listingEnquiryMessagesError: errorHandler(error),
    listingEnquiryMessagesStatus: status,
  };
}
