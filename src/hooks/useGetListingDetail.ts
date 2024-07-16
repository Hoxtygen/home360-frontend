import { useQuery } from "@tanstack/react-query";
import requestHandler from "lib/utils/requestHandler";
import errorHandler from "lib/utils/errorHandler";
import { HOME_360_LISTING_DETAIL_API } from "lib/endpoints";
import { ListingDetailResponse } from "features/listings/types";

export default function useGetListingDetail(listingId: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["listing details"],
    networkMode: "always",
    refetchOnWindowFocus: false,
    queryFn: () =>
      requestHandler<ListingDetailResponse>(
        `${HOME_360_LISTING_DETAIL_API}/${listingId}`,
        {
          method: "GET",
        }
      ),
  });
  return {
    listingDetailData: data?.data,
    listingDetailError: errorHandler(error),
    isLoadingListingDetail: isLoading,
  };
}
