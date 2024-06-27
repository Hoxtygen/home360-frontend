import { DeleteListingResponse } from "@/typedef";
import { useMutation } from "@tanstack/react-query";

import { HOME_360__DELETE_LISTING } from "lib/endpoints";
import requestHandler from "lib/utils/requestHandler";

export default function useDeleteListing(listingId: string) {
  const { data, error, status, mutate } = useMutation({
    mutationKey: ["delete listing"],
    mutationFn: () =>
      requestHandler<DeleteListingResponse>(
        `${HOME_360__DELETE_LISTING}/${listingId}`,
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
