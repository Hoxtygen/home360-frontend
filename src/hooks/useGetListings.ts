import { useQuery } from "@tanstack/react-query";

import { ListingResponse } from "@/typedef";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export default function useGetListings() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["listings"],
    networkMode: "always",
    queryFn: () =>
      requestHandler<ListingResponse>("/api/listings", {
        method: "GET",
      }),
  });
  return {
    listingData: data?.data,
    listingError: errorHandler(error),
    isLoadingListingsData: isLoading,
  };
}
