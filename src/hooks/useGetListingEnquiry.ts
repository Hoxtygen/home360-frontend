import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { EnquiryMessageDetailResponse } from "features/messages/types";
import { HOME_360_GET_LISTING_ENQUIRIES } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export function useGetListingEnquiry(listingEnquiryId: string) {
  const token = getCookie("token");

  const { data, error, status } = useQuery({
    queryKey: ["listing_enquiry"],
    queryFn: () =>
      requestHandler<EnquiryMessageDetailResponse>(
        `${HOME_360_GET_LISTING_ENQUIRIES}/${listingEnquiryId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      ),
  });
  return {
    listingEnquiryData: data?.data,
    listingEnquiryError: errorHandler(error),
    listingEnquiryStatus: status,
  };
}
