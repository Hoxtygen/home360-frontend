import { ApiErrorResponse, ListingSearchResponse } from "@/typedef";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { HOME_360_SEARCH_LISTINGS_API } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export type SearchData = {
  location: string;
  apartmentType: string;
  price: string;
};

export function useSearch() {
  const { data, error, isLoading, mutate } = useMutation<
    AxiosResponse<ListingSearchResponse>,
    AxiosError<ApiErrorResponse | undefined>,
    SearchData
  >({
    networkMode: "always",
    mutationKey: ["search listings"],
    mutationFn: (searchData) =>
      requestHandler<ListingSearchResponse>(
        `${HOME_360_SEARCH_LISTINGS_API}?city=${searchData.location}&apartmentType=${searchData.apartmentType}&annualRent=${searchData.price}`,
        {
          method: "GET",
          data: searchData,
        }
      ),
  });
  return {
    listingSearchResult: data?.data,
    listingSearchError: errorHandler(error),
    isListingSearchLoading: isLoading,
    mutateSearch: mutate,
  };
}
