import ErrorMessage from "components/shared/ErrorMessage";
import useGetListingDetail from "hooks/useGetListingDetail";
import React from "react";
import { ListingInfoProps } from "../listingDetails/ListingDetailContainer";
import UserListingDetails from "./UserListingDetails";

export default function UserListingDetailsContainer({
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
    <div>
      <UserListingDetails
        listingData={listingDetailData?.data!}
        isLoading={isLoadingListingDetail}
      />
    </div>
  );
}
