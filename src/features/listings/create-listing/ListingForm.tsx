import { Formik } from "formik";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import { Button } from "components/buttons/Button";
import { displayError } from "features/auth/SignupForm";
import useCreateListing from "hooks/useCreateListing";
import {
  initialValues,
  newListingValidationSchema,
} from "lib/validations/listingValidation";
import ErrorMessage from "shared/ErrorMessage";
import LoadingScreen from "shared/LoadingScreen";
import ListingDescriptionForm from "./ListingDescriptionForm";
import ListingAddressForm from "./ListingAddressForm";
import DetailsForm from "./DetailsForm";
import ApplicationDocumentsForm from "./ApplicationDocumentsForm";
import TenancyForm from "./TenancyForm";

export default function ListingForm() {
  const {
    newListingData,
    newListingError,
    isLoadingNewListing,
    mutateNewListing,
  } = useCreateListing();

  useEffect(() => {
    if (newListingData && newListingData.status === "CREATED") {
      toast.success(newListingData.message);
    }
  });
  if (isLoadingNewListing) {
    return (
      <div>
        <LoadingScreen />
        <span className="block text-center font-Open-Sans">
          Submitting your new listing, please wait...
        </span>
      </div>
    );
  }
  return (
    <div className=" border-slate-300 border m-auto md:w-3/4 lg:w-[85%] p-4 max-w">
      <Formik
        initialValues={initialValues}
        validationSchema={newListingValidationSchema}
        onSubmit={(values) => {
          mutateNewListing(values);
        }}
      >
        {({ handleSubmit, isValid, dirty }) => (
          <form onSubmit={handleSubmit}>
            {newListingError?.message && (
              <ErrorMessage error={newListingError.message} />
            )}
            {newListingError?.errors && displayError(newListingError.errors)}
            <div className="lg:flex justify-between">
              <div className="basis-[45%]">
                <ListingDescriptionForm />
                <ListingAddressForm />
                <TenancyForm />
              </div>
              <div className="basis-[45%]">
                <DetailsForm />
                <ApplicationDocumentsForm />
              </div>
            </div>
            <div className="">
              <Button
                disabled={!(isValid && dirty)}
                size="xl"
                type="submit"
                className="dark:text-white disabled:cursor-not-allowed mt-4 w-1/2"
              >
                Submit
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
