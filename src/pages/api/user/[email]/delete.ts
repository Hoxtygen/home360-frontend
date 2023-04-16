import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import { isEmailValid, knownPrismaError } from "lib";
import { deleteUser } from "lib";
import { use } from "next-api-route-middleware";
import allowMethods from "middleware/allowedMethods";

export async function removeUser(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  let userEmail = Array.isArray(query.email) ? query.email[0] : query.email;
  userEmail = userEmail?.toLowerCase();
  const validEmail = isEmailValid(userEmail!);

  if (!validEmail) {
    return res.status(400).json({
      status: 400,
      error: "Invalid or empty email",
    });
  }

  try {
    const user = await deleteUser(userEmail);
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return knownPrismaError(res, error);
    }
    return res.status(res.statusCode).json({
      message: "Failed to delete user",
      error,
    });
  }
}

export default use(allowMethods(["DELETE"]), removeUser);
