import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { allowMethods } from "middleware/allowedMethods";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";
import { isCuid, knownPrismaError, getListing } from "lib";

export async function getListingById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const id = Array.isArray(query.id) ? query.id[0] : query.id;

  const validId = isCuid(id);
  if (!id || !validId) {
    return res.status(400).json({
      status: 400,
      message: "Invalid listing id",
    });
  }
  try {
    const result = await getListing(id);
    return res.status(res.statusCode).json({
      message: "Listing retrieved successfully",
      listing: result,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return knownPrismaError(res, error);
    }
    return res.status(500).json({ message: "Failed to get user", error });
  }
}

export default use(allowMethods(["GET"]), getListingById);
