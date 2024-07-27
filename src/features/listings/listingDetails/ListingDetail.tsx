import React, { useState } from "react";
import Image from "next/image";

import LocationIcon from "../../../../public/icons/location-icon.svg";
import { addValues, formatCurrency } from "lib/utils/utils";
import ListingImagesCarousel from "./ListingImagesCarousel";
import ApartmentCost from "../ApartmentCost";
import ApartmentDescription from "../ApartmentInfo";
import ApplicationDocument from "../ApplicationDocument";
import { Dialog } from "components/Dialog";
import { ListingDetailProps } from "../types";
import ListingAgentAndListingImages from "./ListingAgentAndListingImages";
import { ListingEnquiry } from "..";

export default function ListingDetail({
  listingData,
  listingAgent,
}: ListingDetailProps) {
  const [showListingImagesDialog, setShowListingImagesDialog] = useState(false);

  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  function handleListingEnquiryFormDialog() {
    setShowEnquiryForm((prev) => !prev);
  }

  function handleCloseListingImagesDialog() {
    setShowListingImagesDialog(false);
  }

  return (
    <>
      <div>
        <ListingAgentAndListingImages
          listingImages={listingData.apartmentImages}
          agentInfo={listingAgent}
          handleListingEnquiryFormDialog={handleListingEnquiryFormDialog}
        />
        <div className="">
          <div className="">
            <h1 className="font-hanken-black text-24 mt-2 mb-2">
              {listingData?.title}
            </h1>
            <div className="">
              <h3 className="font-hanken-semibold mb-3">Address</h3>
              <div className="flex">
                <div className="">
                  <Image alt="location icon" src={LocationIcon} />
                </div>
                <div className="text-16 text-secondary-light-gray font-hanken-regular ml-3">
                  <p>
                    {listingData?.address?.streetName &&
                      listingData.address.streetName}{" "}
                    {listingData?.address?.city && listingData.address.city}
                  </p>
                  <p>You will receive the full address from the provider</p>
                </div>
              </div>
            </div>
            <hr className="my-6" />
            <div className="flex flex-wrap">
              <div className="mr-6">
                <p className="font-hanken-black text-24">
                  {formatCurrency(listingData?.cost?.annualRent)}
                </p>
                <p className="text-[#747474]">Basic rent</p>
              </div>
              <div className="mr-6">
                <p className="font-hanken-black text-24">
                  {listingData?.apartmentInfo?.roomNums}
                </p>
                <p className="text-[#747474]">Rooms</p>
              </div>
              <div className="">
                <p className="font-hanken-black text-24">
                  {listingData?.cost &&
                    formatCurrency(addValues(listingData.cost))}
                </p>
                <p className="text-[#747474]">Total Package</p>
              </div>
            </div>
            <hr className="my-6" />
            <div className="flex flex-wrap">
              {listingData?.details &&
                listingData.details.map((detail, index) => (
                  <p
                    className="bg-[#D6D6D6] py-[4px] px-5 text-xs mr-1 rounded mb-[3px]"
                    key={`${detail}-${index}`}
                  >
                    {detail}
                  </p>
                ))}
            </div>
            <div className="pt-3">
              <ApartmentDescription
                petsAllowed={listingData.petsAllowed}
                facilityQuality={listingData.facilityQuality}
                availableFrom={listingData.availableFrom}
                apartmentInfo={listingData.apartmentInfo}
              />
            </div>
          </div>
          <hr className="my-6" />
          <ApartmentCost cost={listingData.cost} />
          <hr className="my-6" />
          <div className="">
            <h3 className="font-hanken-semibold text-20">
              Application Document
            </h3>
            <div>
              {listingData?.applicationDocs && (
                <ApplicationDocument
                  applicationDocs={listingData.applicationDocs}
                />
              )}
            </div>
          </div>
          <hr className="my-6" />
          <div className="">
            <h3 className="text-20 font-hanken-semibold">Description</h3>
            <p className="text-secondary-light-gray text-16">
              {listingData.description}
            </p>
          </div>
          <hr className="my-6" />
          {listingData.position && (
            <div className="">
              <h3 className="text-20 font-hanken-semibold">Position</h3>
              <p className="text-secondary-light-gray text-16">
                {listingData.position}
              </p>
            </div>
          )}
        </div>
      </div>
      <>
        {showListingImagesDialog && (
          <Dialog
            title="Image Dialog"
            show={showListingImagesDialog}
            handleClose={handleCloseListingImagesDialog}
            maxWidth={800}
            maxHeight="80vh"
          >
            <ListingImagesCarousel imagesUrl={listingData.apartmentImages} />
          </Dialog>
        )}

        {showEnquiryForm && (
          <Dialog
            title="Listing Enquiry"
            handleClose={handleListingEnquiryFormDialog}
            show={showEnquiryForm}
            maxWidth={800}
          >
            <ListingEnquiry
              listingId={listingData.id}
              agentId={listingData.agentId}
              handleListingEnquiryFormDialog={handleListingEnquiryFormDialog}
            />
          </Dialog>
        )}
      </>
    </>
  );
}
