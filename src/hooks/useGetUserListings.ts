import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { ListingSearchResponse } from "@/typedef";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler"; 
import { HOME_360_FETCH_USERLISTINGS } from "lib/endpoints";

export default function useGetUserListings(page: number) {
  const token = getCookie("token");

export default function useGetUserListings(page: number) {
  const { data, error, isLoading, isPreviousData } = useQuery({
    queryKey: ["user listings", page],
    networkMode: "always",
    refetchOnWindowFocus: false,
    queryFn: () =>
      requestHandler<ListingSearchResponse>(
        `${HOME_360_FETCH_USERLISTINGS}?page=${page}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      ),
    keepPreviousData: true,
  });
  return {
    userListings: data?.data,
    userListingsError: errorHandler(error),
    isUserListingsLoading: isLoading,
    isPreviousData,
  };
}
