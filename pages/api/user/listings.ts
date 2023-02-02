import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { use } from "next-api-route-middleware";
import { allowMethods } from "middleware/allowedMethods";

import { knownPrismaError, getUserListings } from "lib";
import { verifyToken } from "lib/utils/auth";

export async function fetchUserListings(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({
        status: 403,
        message: "You must be logged in.",
      });
    }
    const decodedToken = verifyToken(token);
    if (decodedToken.exp < Date.now() / 1000) {
      return res.status(403).json({
        status: 403,
        message: "Expired token. Please login again.",
      });
    }
    if (!("id" in decodedToken)) {
      return res.status(403).json({
        status: 403,
        message: "Malformed token. Login again to get a new token.",
      });
    }

    const userListings = await getUserListings(decodedToken.id);
    return res.status(200).json({
      message: "User listings retrieved successfully",
      data: userListings,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return knownPrismaError(res, error);
    }
    return res.status(500).json({
      message: "Failed to get user",
      error,
    });
  }
}

export default use(allowMethods(["GET"]), fetchUserListings);
