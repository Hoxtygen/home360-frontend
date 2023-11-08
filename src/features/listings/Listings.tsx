import { ListingData } from "@/typedef";
import SkeletonCard from "components/shared/SkeletonCard";
import Link from "next/link";
import ListingItem from "./ListingItem";

type ListingProps = {
  listings: ListingData[];
  isLoading: boolean;
};

export default function Listings({ listings, isLoading }: ListingProps) {
  return (
    <>
      {isLoading && <SkeletonCard />}
      {listings &&
        listings.map((listing) => {
          return (
            <div className="mb-4 bg-[white]" key={listing.id}>
              <Link href={`/listing/${listing.id}`}>
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

const randomImages = [
  "https://source.unsplash.com/random/300x200?sig=1",
  "https://source.unsplash.com/random/300x200?sig=4",
  "https://source.unsplash.com/random/300x200?sig=2",
  "https://source.unsplash.com/random/300x200?sig=3",
];
