import { Button } from "components/buttons/Button";
import Slider from "components/slider/Slider";
import { capitalizeFirstCharacter } from "lib/utils/utils";
import React from "react";
import ApartmentCost from "../ApartmentCost";
import ApartmentDescription from "../ApartmentInfo";
import ApplicationDocument from "../ApplicationDocument";
import Details from "../Details";
import { ListingDetailProps } from "../listingDetails/ListingDetail";

export default function UserListingDetails({
  listingData,
}: ListingDetailProps) {
  return (
    <div>
      <div className="mb-3">
        <Slider imagesUrl={listingData.apartmentImages} />
      </div>
      <div className="">
        <div className="">
          <div className="mb-3">
            <h4 className="text-18 font-hanken-semibold">Title:</h4>
            <p className="text-18 font-hanken-regular text-secondary-light-gray">
              {listingData.title}
            </p>
          </div>
          <div className="mb-3">
            <h4 className="text-18 font-hanken-semibold"> Description:</h4>
            <p className="text-18 font-hanken-regular text-secondary-light-gray">
              {listingData.description}
            </p>
          </div>
          <div className="mb-3">
            <h4 className="text-18 font-hanken-semibold"> Position:</h4>
            <p className="text-18 font-hanken-regular text-secondary-light-gray">
              {listingData.position}
            </p>
          </div>
          {listingData.miscellaneous && (
            <div className="mb-3">
              <h4 className="text-18 font-hanken-semibold ">Miscellaneous: </h4>
              <p className="text-18 font-hanken-regular text-secondary-light-gray">
                {listingData.miscellaneous}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mb-3">
        <div className="pl-0">
          <h2 className="text-18 font-hanken-semibold">Address:</h2>
        </div>
        <div className="text-secondary-light-gray">
          <p className="text-18">
            {listingData.address.houseNumber}, {listingData.address.streetName},
          </p>
          <p className="text-18 font-hanken-regular">
            {listingData.address.city}, {listingData.address.lga} local
            government, {listingData.address.state} state
          </p>
        </div>
      </div>
      <div className="mb-3">
        <h4 className="text-18 font-hanken-semibold">Furnishing:</h4>
        <p className="text-18 text-secondary-light-gray">
          {listingData.furnishing}
        </p>
      </div>
      <div className="mb-3">
        <h4 className="text-18 font-hanken-semibold">Facility Quality:</h4>
        <p className="text-secondary-light-gray text-18">
          {capitalizeFirstCharacter(listingData.facilityQuality)}
        </p>
      </div>
      <div className="mb-3">
        <h4 className="text-18 font-hanken-semibold">Details</h4>
        <Details listingDetails={listingData.details} />
      </div>
      <div className="mb-3">
        <ApartmentDescription
          petsAllowed={listingData.petsAllowed}
          facilityQuality={listingData.facilityQuality}
          availableFrom={listingData.availableFrom}
          apartmentInfo={listingData.apartmentInfo}
        />
      </div>
      <div className="mb-3">
        <ApartmentCost cost={listingData.cost} />
      </div>
      <div className="mb-3">
        <h4 className="font-hanken-semibold text-18">Application Document</h4>
        {listingData?.applicationDocs && (
          <ApplicationDocument applicationDocs={listingData.applicationDocs} />
        )}
      </div>
      <div className="border border-black bg-slate-900 flex justify-center gap-5 mt-4 pt-3 pb-3">
        <Button size="lg" variant="subtle">
          Update
        </Button>
        <Button size="lg" variant="destructive" className="">
          Delete
        </Button>
      </div>
    </div>
  );
}
