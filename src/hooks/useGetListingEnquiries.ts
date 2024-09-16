import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { ListingEnquiryMessageResponse } from "features/messages/types";
import { HOME_360_GET_LISTING_ENQUIRIES } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

type UseGetListingEnq = {
  page: number;
  size?: number;
  senderId?: number;
};

export default function useGetListingEnquiries(
  listingEnqData: UseGetListingEnq
) {
  const token = getCookie("token");
  const { data, error, status } = useQuery({
    queryKey: ["listing_enquiries", listingEnqData.page, listingEnqData.size],
    networkMode: "always",
    queryFn: () =>
      requestHandler<ListingEnquiryMessageResponse>(
        `${HOME_360_GET_LISTING_ENQUIRIES}?senderId=${listingEnqData.senderId}&page=${listingEnqData.page}&size=${listingEnqData.size}`,
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
