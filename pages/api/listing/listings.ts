import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { getListings, knownPrismaError } from "lib";
import { use } from "next-api-route-middleware";
import { allowMethods } from "middleware/allowedMethods";

export async function getAllListings(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const listings = await getListings();
    return res.status(200).json({
      status: 200,
      message: "Listings retrieved successfully",
      data: listings,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      knownPrismaError(res, error);
    }
    return res.status(500).json({
      message: "Failed to geet listings",
      error,
    });
  }
}

export default use(allowMethods(["GET"]), getAllListings);
