import React, { useState } from "react";
import Image from "next/image";

// import CameraIcon from "../../../../public/icons/camera.svg";
import { ListingProps } from "@/typedef";
import LocationIcon from "../../../../public/icons/location-icon.svg";
import {
  addValues,
  capitalizeFirstCharacter,
  formatCurrency,
  formatDate,
  replaceSpecialCharactersWithSpace,
} from "lib/utils/utils";
// import { Button } from "components/buttons/Button";
import Dialog from "components/shared/Dialog";
import ListingImagesCarousel from "./ListingImagesCarousel";

type ListingDetailProps = {
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
          <div className="flex">
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
            <div className="grid grid-cols-2 text-14">
              <div className="">
                <div className="flex text-[#747474]">
                  <p className="w-2/4">Type:</p>
                  <p className="w-2/4">
                    {capitalizeFirstCharacter(
                      listingData?.apartmentInfo?.apartmentType
                    )}
                  </p>
                </div>
                <div className="flex text-[#747474]">
                  <p className="w-2/4">Vacant From:</p>
                  <p className="w-2/4">
                    {formatDate(listingData?.availableFrom)}
                  </p>
                </div>
                {listingData.facilityQuality && (
                  <div className="flex text-[#747474]">
                    <p className="w-2/4">Facility Quality:</p>
                    <p className="w-2/4">
                      {capitalizeFirstCharacter(listingData?.facilityQuality)}
                    </p>
                  </div>
                )}
                <div className="flex text-[#747474]">
                  <p className="w-2/4">Pets Allowed:</p>
                  <p className="w-2/4">
                    {replaceSpecialCharactersWithSpace(
                      capitalizeFirstCharacter(listingData?.petsAllowed)
                    )}
                  </p>
                </div>
              </div>
              <div className="">
                <div className="flex text-[#747474]">
                  <p className="w-2/4">Room:</p>
                  <p className="w-2/4">{listingData?.apartmentInfo.roomNums}</p>
                </div>
                <div className="flex text-[#747474]">
                  <p className="w-2/4">Bedroom:</p>
                  <p className="w-2/4">
                    {listingData?.apartmentInfo?.bedroomNums}
                  </p>
                </div>
                <div className="flex text-[#747474]">
                  <p className="w-2/4">Bathroom:</p>
                  <p className="w-2/4">
                    {listingData?.apartmentInfo?.bathroomNums}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6" />
        <div className="">
          <h2 className="font-hanken-semibold text-20">Cost:</h2>
          <div className="grid grid-cols-2">
            <div className="text-14">
              <div className="flex">
                <h3 className="w-2/4 text-secondary-light-gray">
                  Annual Rent:
                </h3>
                <h4 className="w-2/4">
                  {formatCurrency(listingData?.cost?.annualRent)}
                </h4>
              </div>
              {listingData?.cost?.agreementFee &&
              listingData?.cost?.agreementFee > 0 ? (
                <div className="flex ">
                  <h3 className="w-2/4 text-secondary-light-gray">
                    Agreement Fee:
                  </h3>
                  <h4 className="w-2/4">
                    {formatCurrency(listingData?.cost?.agreementFee)}
                  </h4>
                </div>
              ) : null}
              {listingData.cost.agentFee && (
                <div className="flex ">
                  <h3 className="w-2/4 text-secondary-light-gray">
                    Agent Fee:
                  </h3>
                  <h4 className="w-2/4">
                    {formatCurrency(listingData?.cost?.agentFee)}
                  </h4>
                </div>
              )}
              {listingData?.cost?.cautionFee &&
              listingData?.cost?.cautionFee > 0 ? (
                <div className="flex ">
                  <h3 className="w-2/4 text-secondary-light-gray">
                    Caution Fee:
                  </h3>
                  <h4 className="w-2/4">
                    {formatCurrency(listingData?.cost?.cautionFee)}
                  </h4>
                </div>
              ) : null}
              <div className="flex ">
                <h3 className="w-2/4 text-secondary-light-gray">Total rent:</h3>
                <h4 className="w-2/4 font-hanken-black">
                  {formatCurrency(addValues(listingData?.cost))}
                </h4>
              </div>
            </div>
            <div className=""></div>
          </div>
        </div>
        <hr className="my-6" />
        <div className="">
          <h3 className="font-hanken-semibold text-20">Application Document</h3>
          <div className="flex">
            {listingData?.applicationDocs &&
              listingData.applicationDocs.map((detail, index) => (
                <p
                  className="bg-[#D6D6D6] py-[4px] px-5 text-xs mr-1 rounded mb-[3px]"
                  key={`${detail}-${index}`}
                >
                  {detail}
                </p>
              ))}
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
