import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { getCookie } from "cookies-next";

import { ApiErrorResponse, ListingProps, ListingResponse } from "@/typedef";
import { HOME_360_CREATE_LISTING_API } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export default function useCreateListing() {
  const token = getCookie("token");
  const { data, error, isLoading, mutate } = useMutation<
    AxiosResponse<ListingResponse>,
    AxiosResponse<ApiErrorResponse>,
    ListingProps
  >({
    mutationKey: ["create listing"],
    mutationFn: (listingData: ListingProps) =>
      requestHandler<any>(HOME_360_CREATE_LISTING_API, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: listingData,
      }),
  });
  return {
    isLoadingNewListing: isLoading,
    mutateNewListing: mutate,
    newListingError: errorHandler(error),
    newListingData: data?.data,
  };
}
