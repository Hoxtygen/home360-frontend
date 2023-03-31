// import { IListing, INewListing } from "typedef";
import { IListing, INewListing } from "src/typedef";
import { prisma } from "../prisma";

type BuildingType =
  | "Apartment"
  | "House"
  | "Temporary Living"
  | "Shared Room"
  | "Office"
  | "Hall"
  | "Nursing Home";
export async function getListings(): Promise<IListing[]> {
  const result = await prisma.listing.findMany({
    where: {
      available: true,
    },
  });
  return result;
}

export async function getListing(id: string | undefined): Promise<IListing> {
  const result = prisma.listing.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  return result;
}

export async function deleteListing(id: string | undefined) {
  const result = await prisma.listing.delete({
    where: {
      id: id,
    },
  });
}

export async function create(listing: INewListing): Promise<IListing> {
  const result = await prisma.listing.create({
    data: listing,
  });
  return result;
}
