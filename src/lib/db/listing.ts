import { IListing, INewListing } from "typedef";
import { mongoPrisma } from "clients/prisma";

export async function getListings(): Promise<IListing[]> {
  const result = await mongoPrisma.listing.findMany({
    // where: {
    //   available: true,
    // },
  });
  return result;
}

export async function getListing(id: string | undefined): Promise<IListing> {
  const result = mongoPrisma.listing.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  return result;
}

export async function deleteListing(id: string) {
  const result = await mongoPrisma.listing.delete({
    where: {
      id: id,
    },
  });
  return result;
}

export async function createNewListing(
  listing: INewListing
): Promise<IListing> {
  const result = await mongoPrisma.listing.create({
    data: listing,
  });
  return result;
}

