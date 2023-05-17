import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";
import allowMethods from "middleware/allowedMethods";
import { knownPrismaError, mapError, decryptPassword } from "lib";
import { findUser } from "lib/db/user";
import { LoginData } from "typedef";
import { validateLoginData } from "lib";
import { generateToken } from "lib";
import cookie from "cookie";

async function login(req: NextApiRequest, res: NextApiResponse) {
  let { email, password }: LoginData = req.body;
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

    if (user && decryptPassword(password, user.password)) {
      const token = await generateToken({ id: user.id, email: user.email });

      return res
        .status(200)
        .setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
            path: "/",
            httpOnly: false,
          })
        )
        .json({
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
    } else {
      return res.status(401).json({
        status: 401,
        message: "Incorrect email/password",
      });
    }
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
