import { NextApiResponse, NextApiRequest } from "next";
import { HOME_360__DELETE_LISTING } from "lib/endpoints";
import requestHandler from "lib/utils/requestHandler";
import { DeleteListingResponse } from "@/typedef";
import errorHandler from "lib/utils/errorHandler";

export default async function DeleteListingHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.token;
  const { listingId } = req.query;
  console.log("rq.query: ", req.query);
  try {
    const { data } = await requestHandler<DeleteListingResponse>(
      `${HOME_360__DELETE_LISTING}/${listingId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.json(data);
  } catch (error) {
    errorHandler(error);
  }
}
