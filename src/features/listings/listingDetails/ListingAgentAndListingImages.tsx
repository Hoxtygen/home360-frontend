import React from "react";
import ListingAgent from "../ListingAgent";
import { ListingAgentAndListingImagesProps } from "../types";
import ListingImages from "./ListingImages";

export default function ListingAgentAndListingImages({
  listingImages,
  agentInfo,
  handleListingEnquiryFormDialog,
}: ListingAgentAndListingImagesProps) {
  return (
    <div className="flex border-2 min-h-[400px]">
      <div className="basis-2/3">
        <ListingImages images={listingImages} />
      </div>
      <div className="basis-1/3 bg-[#f2f2f2]">
        <ListingAgent
          agent={agentInfo}
          handleListingEnquiryFormDialog={handleListingEnquiryFormDialog}
        />
      </div>
    </div>
  );
}
