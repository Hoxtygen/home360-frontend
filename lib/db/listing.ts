import { IListings } from "typedef";
import { prisma } from "../prisma";

export async function getListings(): Promise<IListings[]> {
  const result = await prisma.listing.findMany();
  return result;
}
