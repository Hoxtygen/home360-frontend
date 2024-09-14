import { clientUrl } from "lib/endpoints";
import { reFormatString } from "lib/utils/utils";
import Link from "next/link";
import { EnquiryMessageInfoProps } from "./types";

export default function EnquiryMessageInfo({
  enquiryData,
}: EnquiryMessageInfoProps) {
  return (
    <div>
      <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-b-slate-300 p-8">
        <div className="">
          <h2 className="">
            <span className="font-hanken-black text-18">Name:</span>{" "}
            {enquiryData.salutation} {enquiryData.firstName}{" "}
            {enquiryData.lastName}
          </h2>
        </div>
        <div className="">
          <h2>
            <span className="font-hanken-black text-18">Email: </span>
            {enquiryData.email}
          </h2>
        </div>
        <div className="">
          <h2>
            <span className="font-hanken-black text-18">Phone Number:</span>{" "}
            {enquiryData.phoneNumber}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-b-slate-300 p-8">
        <div className="">
          <h2>
            {" "}
            <span className="font-hanken-black text-18">Location:</span>{" "}
            {enquiryData.location}
          </h2>
        </div>
        <div className="">
          <h2>
            <span className="font-hanken-black text-18">
              Employment Status:
            </span>{" "}
            {reFormatString(enquiryData.employmentStatus)}
          </h2>
        </div>
        <div className="">
          <h2>
            <span className="font-hanken-black text-18">
              Commercial Purpose:
            </span>{" "}
            {reFormatString(enquiryData.commercialPurpose)}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_2fr] border-b border-b-slate-300 p-8">
        <div className="">
          <h2>
            <span className="font-hanken-black text-18">Pets:</span>{" "}
            {reFormatString(enquiryData.pets)}
          </h2>
        </div>
        <div className="">
          <h2>
            <span className="font-hanken-black text-18">Listing Url: </span>
            <Link
              href={`/listings/user-listings/${enquiryData.listingId}`}
              className="text-blue-600 underline"
            >
              {`${clientUrl}/listings/user-listings/${enquiryData.listingId}`}
            </Link>
          </h2>
        </div>
      </div>
      <div className="p-8">
        <h2 className="font-hanken-black text-18 mb-4">Message: </h2>
        <p>{enquiryData.message}</p>
      </div>
    </div>
  );
}
