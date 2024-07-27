import useGetListingDetail from "hooks/useGetListingDetail";
import ErrorMessage from "shared/ErrorMessage";
import ListingDetail from "./ListingDetail";

export type ListingInfoProps = { listingId: string };

export default function ListingDetailContainer({
  listingId,
}: {
  listingId: string;
}) {
  const { listingDetailData, listingDetailError, isLoadingListingDetail } =
    useGetListingDetail(listingId);

  if (listingDetailError) {
    return <ErrorMessage error={listingDetailError.message} />;
  }

  if (isLoadingListingDetail) {
    return <h1>Loading.......</h1>;
  }
  return (
    <div className="">
      <div className="basis-2/3">
        <ListingDetail
          listingData={listingDetailData?.data.listing!}
          listingAgent={listingDetailData?.data.agentInfo!}
          isLoading={isLoadingListingDetail}
        />
      </div>
    </div>
  );
}
