import { NextApiRequest, NextApiResponse } from "next";

type UnauthorizedResponse = {
  status: number;
  message: string;
};
export default async function unauthorized(
  req: NextApiRequest,
  res: NextApiResponse<UnauthorizedResponse>
) {
  res.status(401).json({
    status: 401,
    message: "Login to continue",
  });
}
