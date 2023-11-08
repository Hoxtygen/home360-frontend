import React from "react";

import useGetListingDetail from "hooks/useGetListingDetail";
import ListingDetail from "./ListingDetail";
import ErrorMessage from "components/shared/ErrorMessage";

type ListingInfoProps = { listingId: string };

export default function ListingDetailContainer({
  listingId,
}: ListingInfoProps) {
  const { listingDetailData, listingDetailError, isLoadingListingDetail } =
    useGetListingDetail(listingId);

  if (listingDetailError) {
    return <ErrorMessage error={listingDetailError.message} />;
  }

  if (isLoadingListingDetail) {
    return <h1>Loading.......</h1>;
  }
  return (
    <>
      <ListingDetail
        listingData={listingDetailData?.data!}
        isLoading={isLoadingListingDetail}
      />
    </>
  );
}
