import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";
import { allowMethods } from "middleware/allowedMethods";
import {
  knownPrismaError,
  mapError,
  generateToken,
  decryptPassword,
} from "lib";
import { findUser } from "lib/db/user";
import { AuthPayload, ILogin } from "typedef";
import { validateLoginData } from "lib/validations";

async function login(req: NextApiRequest, res: NextApiResponse) {
  let { email, password }: ILogin = req.body;
  const validation = validateLoginData(req.body);
  if (validation.error) {
    return res.status(400).json({
      status: 400,
      error: mapError(validation.error),
    });
  }
  email = email.toLowerCase();
  try {
    const user = await findUser(email);
    if (user && !decryptPassword(password, user.password)) {
      return res.status(401).json({
        status: 401,
        message: "Incorrect email/password",
      });
    }
    const token = generateToken(user.id, email);
    return res.status(200).json({
      status: 200,
      message: "Logged in successfully",
      token,
      id: user.id,
      email: user.email,
      name: user.name,
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

export default use(allowMethods(["POST"]), login);
