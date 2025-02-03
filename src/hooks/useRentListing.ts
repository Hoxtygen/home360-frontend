import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { RentFormValues, RentSuccessResponse } from "features/listings/types";
import { HOME_360_GIVE_LISTING_OUT_FOR_RENT } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export default function useRentListing() {
  const token = getCookie("token");
  const { data, status, error, mutate } = useMutation({
    mutationKey: ["rent_out_listing"],
    mutationFn: (rentData: RentFormValues) =>
      requestHandler<RentSuccessResponse>(HOME_360_GIVE_LISTING_OUT_FOR_RENT, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data: rentData,
      }),
  });
  return {
    rentData: data?.data,
    rentError: errorHandler(error),
    mutateRent: mutate,
    rentStatus: status,
  };
}
