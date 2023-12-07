import { ListingSearchResponse } from "@/typedef";
import { useQuery } from "@tanstack/react-query";
import { Search } from "components/searchResult/SearchResult";
import { HOME_360_SEARCH_LISTINGS_API } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export type SearchData = {
  location: string;
  apartmentType: string;
  price: string;
};

export function useSearch(searchOptions: Search) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["search listing", searchOptions],
    queryFn: () =>
      requestHandler<ListingSearchResponse>(
        `${HOME_360_SEARCH_LISTINGS_API}?city=${searchOptions.location}&apartmentType=${searchOptions.apartmentType}&annualRent=${searchOptions.price}`,
        {
          method: "GET",
          data: searchOptions,
        }
      ),
    enabled: false,
  });
  return {
    listingSearchResult: data?.data,
    listingSearchError: errorHandler(error),
    isListingSearchLoading: isLoading,
    refetchSearchResult: refetch,
  };
}
