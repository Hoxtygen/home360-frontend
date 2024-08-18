import Link from "next/link";
import SkeletonCard from "shared/SkeletonCard";
import { randomImages } from "../../constant-data";
import ListingItem from "./ListingItem";
import { ListingData } from "./types";

export type UserListingProps = {
  listings: ListingData[];
  isLoading: boolean;
};

export default function Listings({ listings, isLoading }: UserListingProps) {
  return (
    <>
      {isLoading && <SkeletonCard />}
      {listings &&
        listings.map((listing) => {
          return (
            <div className="mb-4 bg-[white] rounded-md" key={listing.id}>
              <Link href={`/search-result/listings/${listing.id}`}>
                <ListingItem
                  imagesUrl={listing.apartmentImages || randomImages}
                  title={listing.title}
                  location={`${listing.address.houseNumber || ""} ${
                    listing.address.streetName
                  } ${listing.address.city}`}
                  annualRent={listing.cost.annualRent}
                  numberOfRooms={listing.apartmentInfo.roomNums}
                  details={listing.details}
                />
              </Link>
            </div>
          );
        })}
    </>
  );
}
