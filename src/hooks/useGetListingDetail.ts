import { useQuery } from "@tanstack/react-query";
import { ListingDetailResponse } from "features/listings/types";
import { HOME_360_LISTING_BASE_API } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export default function useGetListingDetail(listingId: string) {
  const { data, error, status, refetch } = useQuery({
    queryKey: ["listing details"],
    networkMode: "always",
    refetchOnWindowFocus: false,
    queryFn: () =>
      requestHandler<ListingDetailResponse>(
        `${HOME_360_LISTING_BASE_API}/${listingId}`,
        {
          method: "GET",
        }
      ),
  });
  return {
    listingDetailData: data?.data,
    listingDetailError: errorHandler(error),
    listingDetailStatus: status,
    refetchListingDetails: refetch,
  };
}
