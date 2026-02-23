import { useSubmitEnquiryForm } from "hooks/useSubmitEnquiryForm";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  ListingEnquiryData,
  ListingEnquiryFormData,
  ListingEnquiryProps,
} from "../types";
import ListingEnquiryForm from "./ListingEnquiryForm";

export default function ListingEnquiry({
  listingId,
  agentId,
  handleListingEnquiryFormDialog,
}: Readonly<ListingEnquiryProps>) {
  const listingEnquiryInitialValues: ListingEnquiryData = {
    message: "",
    salutation: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    employmentStatus: "",
    commercialPurpose: "",
    pets: "",
  };
  const { mutateEnquiry, enquiryError, enquirySuccessData, isLoadingEnquiry } =
    useSubmitEnquiryForm();

  function handleSubmitEnquiryForm(enquiryData: ListingEnquiryFormData) {
    mutateEnquiry(enquiryData);
  }

  useEffect(() => {
    if (enquirySuccessData && enquirySuccessData?.status === "CREATED") {
      toast.success("Message sent successfully", { duration: 5000 });
      handleListingEnquiryFormDialog();
    }
  }, [enquirySuccessData, handleListingEnquiryFormDialog]);

  useEffect(() => {
    if (enquiryError && enquiryError.message) {
      toast.error(enquiryError.message, { duration: 5000 });
    }
    if (
      enquiryError &&
      enquiryError.errors &&
      enquiryError.errors.map((error) =>
        toast.error(error, { duration: 10000 })
      )
    ) {
    }
  }, [enquiryError]);

  return (
    <div>
      <ListingEnquiryForm
        listingEnquiryInitialValues={listingEnquiryInitialValues}
        agentId={agentId}
        listingId={listingId}
        handleSubmitEnquiryForm={handleSubmitEnquiryForm}
        isLoading={isLoadingEnquiry}
      />
    </div>
  );
}
