import { NextApiRequest, NextApiResponse } from "next";

import requestHandler from "lib/utils/requestHandler";
import { ListingSearchResponse } from "features/listings/types";

export default async function userListingsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.token;
  const { page } = req.query;

  try {
    const result = await requestHandler<ListingSearchResponse>(
      `http://localhost:8080/api/v1/userListings?page=${page}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.json(result.data);
  } catch (error) {
    throw error;
  }
}
