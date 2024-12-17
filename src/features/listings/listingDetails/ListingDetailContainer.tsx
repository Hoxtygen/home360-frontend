import useGetListingDetail from "hooks/useGetListingDetail";
import ErrorMessage from "shared/ErrorMessage";
import ListingDetail from "./ListingDetail";
import { useEffect } from "react";
import usePostListingView from "hooks/usePostListingView";
import LoadingScreen from "shared/LoadingScreen";

export type ListingInfoProps = { listingId: string };

export default function ListingDetailContainer({
  listingId,
}: ListingInfoProps) {
  const { listingDetailData, listingDetailError, isLoadingListingDetail } =
    useGetListingDetail(listingId);
  const { mutateListingView } = usePostListingView();

  useEffect(() => {
    const now = new Date();
    const localISOString = now.toISOString().slice(0, -1);
    const storedListings = sessionStorage.getItem("viewed-listings");
    const viewedListings: string[] = storedListings
      ? JSON.parse(storedListings)
      : [];

    if (!viewedListings.includes(listingId)) {
      mutateListingView({ listingId, timestamp: localISOString });
      viewedListings.push(listingId);
      sessionStorage.setItem("viewed-listings", JSON.stringify(viewedListings));
    }
  }, [listingId, mutateListingView]);

  return (
    <div className="">
      <div className="basis-2/3">
        {isLoadingListingDetail && <LoadingScreen />}
        {listingDetailError && (
          <ErrorMessage error={listingDetailError.message} />
        )}
        {listingDetailData?.status === "OK" && (
          <ListingDetail
            listingData={listingDetailData?.data.listing!}
            listingAgent={listingDetailData?.data.agentInfo!}
            isLoading={isLoadingListingDetail}
          />
        )}
      </div>
    </div>
  );
}
