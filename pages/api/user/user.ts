import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { findUser, isEmailValid, knownPrismaError } from "lib";
import { allowMethods } from "middleware/allowedMethods";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { email } = req.body;
    const validEmail = isEmailValid(email);

    if (!validEmail) {
      return res.status(400).json({
        status: 400,
        error: "Invalid or empty email",
      });
    }

    email = email.toLowerCase();
    const user = await findUser(email);
    return res.status(200).json({
      status: 200,
      message: "User retrieved successfully",
      user: user,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      knownPrismaError(res, error);
    }
    return res.status(res.statusCode).json({
      message: "Failed to get user",
      error,
    });
  }
}

export default use(allowMethods(["GET"]), handler);
