import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { EnquirerResponse } from "features/listings/types";
import { HOME_360_GET_ENQUIRERS } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export default function useGetEnquirers(listingId: string) {
  const token = getCookie("token");
  const { data, error, status } = useQuery({
    queryKey: ["enquiries_by_listing_id", listingId],
    networkMode: "always",
    queryFn: () =>
      requestHandler<EnquirerResponse>(
        `${HOME_360_GET_ENQUIRERS}/${listingId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      ),
  });
  return {
    enquirers: data?.data,
    enquirersError: errorHandler(error),
    enquirerStatus: status,
  };
}
