import { useQuery } from "@tanstack/react-query";
import { ListingStatistics } from "features/listings/types";
import { HOME_360_FETCH_LISTING_STATS } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export default function useGetDashboardStats() {
  const { data, error, status } = useQuery({
    queryKey: ["dashboard_stats"],
    networkMode: "always",
    queryFn: () =>
      requestHandler<ListingStatistics>(HOME_360_FETCH_LISTING_STATS, {
        method: "GET",
      }),
  });
  return {
    listingStatData: data?.data,
    listingStatError: errorHandler(error),
    listingStatStatus: status,
  };
}
