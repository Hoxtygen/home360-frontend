import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import { isEmailValid, knownPrismaError, findUser } from "lib";
import { use } from "next-api-route-middleware";
import { allowMethods } from "middleware/allowedMethods";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const query = req.query;
    let user = Array.isArray(query.user) ? query.user[0] : query.user;
    user = user?.toLowerCase();
    const validUser = isEmailValid(user!);

    if (!validUser) {
      return res.status(400).json({
        status: 400,
        error: "Invalid or empty email",
      });
    }

    user = user?.toLowerCase();
    const result = await findUser(user);
    return res.status(200).json({
      message: "User retrieved successfully",
      result,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      knownPrismaError(res, error);
    }
    return res
      .status(res.statusCode)
      .json({ message: "Failed to get user", error });
  }
}

export default use(allowMethods(["GET"]), handler);
