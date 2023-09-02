import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const handleLogout = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (typeof window !== "undefined") {
      window.location.replace("/");
      localStorage.clear();
    }

    res
      .status(200)
      .setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
          path: "/",
          expires: new Date(0),
        })
      )
      .json({});
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handleLogout;
