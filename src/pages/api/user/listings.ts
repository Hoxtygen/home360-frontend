import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { use } from "next-api-route-middleware";
import allowMethods from "middleware/allowedMethods";

import { knownPrismaError, getUserListings } from "lib";
import { verifyAuth } from "lib/utils/auth";

export async function fetchUserListings(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const decodedToken = await verifyAuth(token!);

    const userListings = await getUserListings(decodedToken.id);

    return res.status(200).json({
      status: 200,
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
