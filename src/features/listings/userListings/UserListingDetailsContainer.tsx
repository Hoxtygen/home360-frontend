import { useEffect, useState } from "react";

import useDeleteListing from "hooks/useDeleteListing";
import useGetListingDetail from "hooks/useGetListingDetail";
import { toast } from "react-hot-toast";
import ErrorMessage from "shared/ErrorMessage";
import { ListingInfoProps } from "../listingDetails/ListingDetailContainer";
import UserListingDetails from "./UserListingDetails";
import { Button } from "components/buttons/Button";
import { Dialog } from "components/Dialog";
import RentForm from "./RentForm";
import { BouncingLoader } from "components/loaders/BouncingLoader";
import useLocalStorage from "hooks/useLocalStorage";
import { MappedSuccessLoginResponse } from "@/typedef";

export default function UserListingDetailsContainer({
  listingId,
}: ListingInfoProps) {
  const [user, _] = useLocalStorage<MappedSuccessLoginResponse | null>(
    "user",
    null
  );
  const {
    listingDetailData,
    listingDetailError,
    listingDetailStatus,
    refetchListingDetails,
  } = useGetListingDetail(listingId);
  const [showRentDialog, setShowRentDialog] = useState(false);

  const { deleteListingData, deleteListingError, mutateDeleteListing } =
    useDeleteListing(listingId);

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (deleteListingData?.status === "OK") {
      toast.success(deleteListingData?.message);
      setShowDialog(false);
      window.location.href = "/listings";
    }

    if (deleteListingError) {
      toast.error(deleteListingError.message, { duration: 5000 });
    }
  }, [deleteListingData, deleteListingError]);

  function handleShowDialog() {
    setShowDialog(true);
  }

  function handleCloseDialog() {
    setShowDialog(false);
  }
  function handleCloseRentDialog() {
    setShowRentDialog(false);
  }

  function handleRentUpdate() {
    handleCloseRentDialog();
    refetchListingDetails();
  }

  if (listingDetailError) {
    return <ErrorMessage error={listingDetailError.message} />;
  }

  function handleDeleteListing() {
    mutateDeleteListing();
  }

  return (
    <div className="">
      {!listingDetailData?.data.listing.rented &&
        user?.id === listingDetailData?.data.listing.agent_id && (
          <div className=" flex justify-end mb-10 py-4 px-2">
            <Button
              className="py-6 px-16 !text-white text-24"
              onClick={() => setShowRentDialog(true)}
            >
              Rent out
            </Button>
          </div>
        )}
      {listingDetailData?.data.listing.rented && (
        <div className="flex justify-end items-center font-hanken-semibold">
          <p className="bg-green-800 px-10 py-[6px]  rounded-md mr-2 text-white">
            Rent Active
          </p>
          {/* <Button className="">Show rent information</Button> */}
        </div>
      )}
      {listingDetailStatus === "loading" && <BouncingLoader />}

      {listingDetailData?.status === "OK" && (
        <div className="max-w-4xl rounded-md container mx-auto p-10 mt-5 bg-[#F7F7F7] min-h-[600px]">
          <UserListingDetails
            listingData={listingDetailData?.data.listing!}
            handleDeleteListing={handleDeleteListing}
            handleCloseDialog={handleCloseDialog}
            handleShowDialog={handleShowDialog}
            showDialog={showDialog}
          />
        </div>
      )}
      {showRentDialog && (
        <Dialog
          title="Listing Rent"
          show={showRentDialog}
          handleClose={handleCloseRentDialog}
        >
          <RentForm listingId={listingId} parentCallback={handleRentUpdate} />
        </Dialog>
      )}
    </div>
  );
}
