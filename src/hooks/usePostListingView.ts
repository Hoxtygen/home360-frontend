import { useMutation } from "@tanstack/react-query";
import { HOME_360_POST_LISTING_VIEW } from "lib/endpoints";
import requestHandler from "lib/utils/requestHandler";

type ListingViewParams = {
  listingId: string;
  timestamp: string;
};

export default function usePostListingView() {
  const { mutate } = useMutation({
    mutationKey: ["post_listing_view"],
    mutationFn: ({ listingId, timestamp }: ListingViewParams) =>
      requestHandler(HOME_360_POST_LISTING_VIEW, {
        method: "POST",
        data: {
          listingId,
          timestamp,
        },
      }),
    networkMode: "online",
  });
  return {
    mutateListingView: mutate,
  };
}
