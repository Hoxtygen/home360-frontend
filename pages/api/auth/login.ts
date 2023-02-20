import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";
import { allowMethods } from "middleware/allowedMethods";
import { knownPrismaError, mapError, decryptPassword } from "lib";
import { findUser } from "lib/db/user";
import { ILogin } from "typedef";
import { validateLoginData } from "lib/validations";
import { generateToken } from "lib/utils/auth";

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
    if (!user || !decryptPassword(password, user.password)) {
      return res.status(401).json({
        status: 401,
        message: "Incorrect email/password",
      });
    }

    const token = await generateToken({ id: user.id, email: user.email });
    return res.status(200).json({
      status: 200,
      message: "Logged in successfully",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        },
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return knownPrismaError(res, error);
    }
    return res
      .status(res.statusCode)
      .json({ message: "Failed to login user", error });
  }
}

export default use(allowMethods(["POST"]), login);
