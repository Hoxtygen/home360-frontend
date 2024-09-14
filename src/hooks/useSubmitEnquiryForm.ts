import { useMutation } from "@tanstack/react-query";

import { ApiErrorResponse } from "@/typedef";
import { AxiosError, AxiosResponse } from "axios";
import {
  ListingEnquiryFormData,
  ListingEnquiryResponse,
} from "features/listings/types";

import { HOME_360_LISTING_ENQUIRY_BASE } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export function useSubmitEnquiryForm() {
  const { data, error, status, isLoading, mutate } = useMutation<
    AxiosResponse<ListingEnquiryResponse>,
    AxiosError<ApiErrorResponse> | Error,
    ListingEnquiryFormData
  >({
    mutationKey: ["enquiry form"],
    networkMode: "always",
    mutationFn: (enquiryData) =>
      requestHandler(HOME_360_LISTING_ENQUIRY_BASE, {
        method: "POST",
        data: enquiryData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
  });
  return {
    mutateEnquiry: mutate,
    enquirySuccessData: data?.data,
    enquiryError: errorHandler(error),
    enquiryStatus: status,
    isLoadingEnquiry: isLoading,
  };
}
