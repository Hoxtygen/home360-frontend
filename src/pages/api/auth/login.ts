import { NextApiRequest, NextApiResponse } from "next";
import requestHandler from "lib/utils/requestHandler";
import { HOME_360_LOGIN_API } from "lib/endpoints";
import { AuthenticationSuccessResponse } from "@/typedef";
import cookie from "cookie";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const loginData = req.body;
  try {
    const result = await requestHandler<AuthenticationSuccessResponse>(
      HOME_360_LOGIN_API,
      {
        method: "POST",
        data: loginData,
      }
    );
    if (result.data && result.status === 200) {
      const accessToken = result.data.token.accessToken;
      return res
        .status(200)
        .setHeader(
          "Set-Cookie",
          cookie.serialize("token", accessToken, {
            path: "/",
            httpOnly: false,
          })
        )
        .json(result.data);
    } else {
      return res.json(result.data);
    }
  } catch (error) {
    // return error;
    throw error;
  }
}
