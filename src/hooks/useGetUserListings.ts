import { useQuery } from "@tanstack/react-query";

import { ListingSearchResponse } from "@/typedef";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export default function useGetUserListings(page: number) {
  const { data, error, isLoading, isPreviousData } = useQuery({
    queryKey: ["user listings", page],
    networkMode: "always",
    refetchOnWindowFocus: false,
    queryFn: () =>
      requestHandler<ListingSearchResponse>(`/api/user-listings?page=${page}`, {
        method: "GET",
      }),
    keepPreviousData: true,
  });
  return {
    userListings: data?.data,
    userListingsError: errorHandler(error),
    isUserListingsLoading: isLoading,
    isPreviousData,
  };
}
