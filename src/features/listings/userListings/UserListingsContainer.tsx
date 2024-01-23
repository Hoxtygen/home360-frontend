import SkeletonCard from "components/shared/SkeletonCard";
import Link from "next/link";
import React from "react";
import ListingItem from "../ListingItem";
import { UserListingProps } from "../Listings";

export default function UserListingsContainer({
  listings = [],
  isLoading,
}: UserListingProps) {
  return (
    <div>
      {isLoading && <SkeletonCard />}
      {listings.map((listing) => (
        <div className="mb-4 bg-[white]" key={listing.id}>
          <Link href={`/listings/userlistings/${listing.id}`}>
            <ListingItem
              imagesUrl={listing.apartmentImages || randomImages}
              title={listing.title}
              location={`${listing.address.houseNumber || ""} ${
                listing.address.streetName
              } ${listing.address.city}`}
              annualRent={listing?.cost?.annualRent}
              numberOfRooms={listing.apartmentInfo.roomNums}
              details={listing.details}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

const randomImages = [
  "https://source.unsplash.com/random/300x200?sig=1",
  "https://source.unsplash.com/random/300x200?sig=4",
  "https://source.unsplash.com/random/300x200?sig=2",
  "https://source.unsplash.com/random/300x200?sig=3",
];
