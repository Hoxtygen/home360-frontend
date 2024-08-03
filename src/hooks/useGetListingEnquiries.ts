import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { ListingEnquiryMessageResponse } from "features/messages/types";
import { HOME_360_LISTING_ENQUIRY } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export default function useGetListingEnquiries(page: number, size?: number) {
  const token = getCookie("token");
  const { data, error, status } = useQuery({
    queryKey: ["listing_enquiries", page, size],
    networkMode: "always",
    queryFn: () =>
      requestHandler<ListingEnquiryMessageResponse>(
        `${HOME_360_LISTING_ENQUIRY}?page=${page}&size=${size}`,
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
