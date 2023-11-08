import { ListingDetailResponse } from "./../../typedef/index";
import { HOME_360_LISTING_DETAIL_API } from "lib/endpoints";
import requestHandler from "lib/utils/requestHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default async function ListingDetailHandler(
  { query }: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = query;
  try {
    const result = await requestHandler<ListingDetailResponse>(
      `${HOME_360_LISTING_DETAIL_API}/${id}`,
      {
        method: "GET",
      }
    );
    return res.json(result.data);
  } catch (error) {
    throw error;
  }
}
