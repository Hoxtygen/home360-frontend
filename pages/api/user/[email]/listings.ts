import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

import { isEmailValid, knownPrismaError, getUser } from "lib";
import { use } from "next-api-route-middleware";
import { allowMethods } from "middleware/allowedMethods";

export async function getUserListing(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  let email = Array.isArray(query.email) ? query.email[0] : query.email;
  const validEmail = isEmailValid(email!);
  email = email?.toLowerCase();
  try {
    const user = await getUser(email);
    return res.status(200).json({
      message: "User listings retrieved successfully",
      user,
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

export default use(allowMethods(["GET"]), getUserListing);
