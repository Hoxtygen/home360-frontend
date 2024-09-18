import { DeleteListingResponse } from "@/typedef";
import { useMutation } from "@tanstack/react-query";

import { HOME_360_LISTING_BASE_API } from "lib/endpoints";
import requestHandler from "lib/utils/requestHandler";

export default function useDeleteListing(listingId: string) {
  const { data, error, status, mutate } = useMutation({
    mutationKey: ["delete listing"],
    mutationFn: () =>
      requestHandler<DeleteListingResponse>(
        `${HOME_360_LISTING_BASE_API}/${listingId}`,
        {
          method: "DELETE",
        }
      ),
  });
  return {
    deleteListingData: data?.data,
    deleteListingError: error,
    mutateDeleteListing: mutate,
    deleteListingStatus: status,
  };
}
