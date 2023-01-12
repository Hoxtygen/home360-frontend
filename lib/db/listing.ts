import { IListings } from "typedef";
import { prisma } from "../prisma";

export async function getListings(): Promise<IListings[]> {
  const result = await prisma.listing.findMany();
  return result;
}

export async function getListing(id: string | undefined): Promise<IListings> {
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
