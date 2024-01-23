import { ListingSearchResponse } from "@/typedef";
import requestHandler from "lib/utils/requestHandler";
import { NextApiRequest, NextApiResponse } from "next";

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
