import { useGetListingEnquiry } from "hooks/useGetListingEnquiry";
import { isEnquiryMessageDetailResponse } from "lib/utils/utils";
import EnquiryMessageInfoContainer from "./EnquiryMessageInfoContainer";
import Spinner from "components/loaders/Spinner";
import ErrorMessage from "shared/ErrorMessage";

type EnquiryMessageDetailProps = {
  enquiryId: string;
};
export default function EnquiryMessageDetail({
  enquiryId,
}: EnquiryMessageDetailProps) {
  const { listingEnquiryData, listingEnquiryError, listingEnquiryStatus } =
    useGetListingEnquiry(enquiryId);

  return (
    <div>
      {listingEnquiryStatus === "loading" && <Spinner />}

      {listingEnquiryError && (
        <ErrorMessage message={listingEnquiryError.message} />
      )}
      {isEnquiryMessageDetailResponse(listingEnquiryData) && (
        <EnquiryMessageInfoContainer enquiryData={listingEnquiryData?.data} />
      )}
    </div>
  );
}
