import { IListing, INewListing } from "typedef";
import { prisma } from "../prisma";

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
