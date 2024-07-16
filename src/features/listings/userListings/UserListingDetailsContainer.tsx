import { useEffect, useState } from "react";

import useDeleteListing from "hooks/useDeleteListing";
import useGetListingDetail from "hooks/useGetListingDetail";
import { toast } from "react-hot-toast";
import ErrorMessage from "shared/ErrorMessage";
import { ListingInfoProps } from "../listingDetails/ListingDetailContainer";
import UserListingDetails from "./UserListingDetails";

export default function UserListingDetailsContainer({
  listingId,
}: ListingInfoProps) {
  const { listingDetailData, listingDetailError, isLoadingListingDetail } =
    useGetListingDetail(listingId);

  const {
    deleteListingData,
    deleteListingError,
    deleteListingStatus,
    mutateDeleteListing,
  } = useDeleteListing(listingId);

  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    if (deleteListingData?.status === "OK") {
      toast.success(deleteListingData?.message);
      setShowDialog(false);
      window.location.href = "/listings";
    }
  }, [deleteListingData]);

  function handleShowDialog() {
    setShowDialog(true);
  }

  function handleCloseDialog() {
    setShowDialog(false);
  }

  if (listingDetailError) {
    return <ErrorMessage error={listingDetailError.message} />;
  }

  if (isLoadingListingDetail) {
    return <h1>Loading.......</h1>;
  }

  function handleDeleteListing() {
    mutateDeleteListing();
  }

  return (
    <div>
      <UserListingDetails
        listingData={listingDetailData?.data.listing!}
        isLoading={isLoadingListingDetail}
        handleDeleteListing={handleDeleteListing}
        handleCloseDialog={handleCloseDialog}
        handleShowDialog={handleShowDialog}
        showDialog={showDialog}
      />
    </div>
  );
}
