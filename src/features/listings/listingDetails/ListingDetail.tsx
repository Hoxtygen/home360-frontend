import React, { useState } from "react";
import Image from "next/image";

// import CameraIcon from "../../../../public/icons/camera.svg";
import { ListingProps } from "@/typedef";
import LocationIcon from "../../../../public/icons/location-icon.svg";
import { addValues, formatCurrency } from "lib/utils/utils";
// import { Button } from "components/buttons/Button";
import Dialog from "components/shared/Dialog";
import ListingImagesCarousel from "./ListingImagesCarousel";
import ApartmentCost from "../ApartmentCost";
import ApartmentDescription from "../ApartmentInfo";
import ApplicationDocument from "../ApplicationDocument";

export type ListingDetailProps = {
  listingData: ListingProps;
  isLoading: boolean;
};
export default function ListingDetail({ listingData }: ListingDetailProps) {
  const [showListingImagesDialog, setShowListingImagesDialog] = useState(false);

  function handleCloseListingImagesDialog() {
    setShowListingImagesDialog(false);
  }

  return (
    <>
      <div className="relative">
        {listingData?.apartmentImages && (
          <>
            <div className="">
              <Image
                alt=""
                src={
                  listingData.apartmentImages[0] ||
                  `https://source.unsplash.com/random/300x200?sig=${
                    Math.random() * 10
                  }`
                }
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            {/* <div className="absolute left-8 bottom-3">
              <Button
                onClick={() => setShowListingImagesDialog(true)}
                className="dark:bg-white dark:hover:bg-white hover:bg-white dark:hover:text-black "
              >
                <Image src={CameraIcon} alt="camera icon" />
                View {listingData?.apartmentImages.length} images
              </Button>
            </div> */}
          </>
        )}
      </div>
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
              <div className="text-14 font-hanken-regular ml-3">
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
          <div className="flex">
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
          <h3 className="font-hanken-semibold text-20">Application Document</h3>
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
          <p>{listingData.description}</p>
        </div>
        <hr className="my-6" />
        {listingData.position && (
          <div className="">
            <h3 className="text-20 font-hanken-semibold">Position</h3>
            <p>{listingData.position}</p>
          </div>
        )}
      </div>
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
    </>
  );
}
