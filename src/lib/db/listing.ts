import { IListing, INewListing } from "typedef";
import { prisma } from "clients/prisma";

export type BuildingType =
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

export async function deleteListing(id: string) {
  const result = await prisma.listing.delete({
    where: {
      id: id,
    },
  });
  return result;
}

export async function createNewListing(
  listing: INewListing
): Promise<IListing> {
  const result = await prisma.listing.create({
    data: listing,
  });
  return result;
}
