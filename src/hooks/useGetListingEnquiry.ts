import { useQuery } from "@tanstack/react-query";
import { EnquiryMessageDetailResponse } from "features/messages/types";
import { HOME_360_LISTING_ENQUIRY_BASE } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export function useGetListingEnquiry(listingEnquiryId: string) {
  const { data, error, status, refetch } = useQuery({
    queryKey: ["listing_enquiry"],
    queryFn: () =>
      requestHandler<EnquiryMessageDetailResponse>(
        `${HOME_360_LISTING_ENQUIRY_BASE}/${listingEnquiryId}`,
        {
          method: "GET",
        }
      ),
    // refetchInterval: 5000,
    // refetchIntervalInBackground: true,
  });

  return {
    listingEnquiryData: data?.data,
    listingEnquiryError: errorHandler(error),
    listingEnquiryStatus: status,
    refetchListingEnquiry: refetch,
  };
}
