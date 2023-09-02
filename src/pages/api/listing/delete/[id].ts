import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";
import { knownPrismaError, deleteListing, isCuid, getListing } from "lib";
import allowMethods from "middleware/allowedMethods";
import { verifyAuth } from "lib/utils/auth";

export async function removeListing(req: NextApiRequest, res: NextApiResponse) {
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
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const decodedToken = await verifyAuth(token!);

    const listing = await getListing(id);
    if (listing.agentId !== decodedToken.id) {
      return res.status(403).json({
        status: 403,
        message: "You're not authorised to delete this listing",
      });
    }
    const result = await deleteListing(id);
    return res.status(res.statusCode).json({
      status: 200,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return knownPrismaError(res, error);
    }
    if (error instanceof Error) {
      return res.status(401).json({
        status: 401,
        error: error.message,
      });
    }
    return res.status(500).json({ message: "Failed to delete listing", error });
  }
}

export default use(allowMethods(["DELETE"]), removeListing);
