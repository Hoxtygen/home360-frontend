import { ListingResponse } from "@/typedef";
import requestHandler from "lib/utils/requestHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default async function listingHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await requestHandler<ListingResponse>(
      "http://localhost:8080/api/v1/listings",
      {
        method: "GET",
      }
    );
    return res.json(result.data);
  } catch (error) {
    throw error;
  }
}
