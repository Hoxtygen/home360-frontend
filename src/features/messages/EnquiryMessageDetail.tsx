import { useGetListingEnquiry } from "hooks/useGetListingEnquiry";
import EnquiryMessageInfo from "./EnquiryMessageInfo";
import { isEnquiryMessageDetailResponse } from "lib/utils/utils";

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
      {isEnquiryMessageDetailResponse(listingEnquiryData) && (
        <EnquiryMessageInfo enquiryData={listingEnquiryData?.data} />
      )}
    </div>
  );
}
