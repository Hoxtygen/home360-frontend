import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";
import { allowMethods } from "middleware/allowedMethods";
import { knownPrismaError, validateUserObject, mapError } from "lib";
import { createUser } from "lib/db/user";

export async function create(req: NextApiRequest, res: NextApiResponse) {
  let { name, email, address, phoneNumber } = req.body;
  const validationError = validateUserObject(req.body);
  if (validationError.error) {
    return res.status(400).json({
      status: 400,
      error: mapError(validationError.error),
    });
  }
  email = email.toLowerCase();
  try {
    const result = await createUser({ email, name, address, phoneNumber });
    return res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return knownPrismaError(res, error);
    }
    return res
      .status(res.statusCode)
      .json({ message: "Failed to create user", error });
  }
}

export default use(allowMethods(["POST"]), create);
