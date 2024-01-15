import { useQuery } from "@tanstack/react-query";

import { ListingSearchResponse } from "@/typedef";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export default function useGetUserListings() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user listings"],
    networkMode: "always",
    refetchOnWindowFocus: false,
    queryFn: () =>
      requestHandler<ListingSearchResponse>("/api/user-listings", {
        method: "GET",
      }),
  });
  return {
    userListings: data,
    userListingsError: errorHandler(error),
    isUserListingsLoading: isLoading,
  };
}
