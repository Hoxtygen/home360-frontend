import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (typeof window !== "undefined") {
      window.location.replace("/");
      localStorage.clear();
    }
    res
      .status(200)
      .setHeader("Set-Cookie", [
        cookie.serialize("token", "", {
          path: "/",
          expires: new Date(0),
        }),
      ])
      .json({});
  } catch (error) {
    throw error;
  }
}
