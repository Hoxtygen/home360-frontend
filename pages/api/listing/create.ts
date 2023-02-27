import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { use } from "next-api-route-middleware";
import { allowMethods } from "middleware/allowedMethods";
import { INewListing } from "typedef";
import { create } from "lib/db/listing";
import { knownPrismaError, mapError } from "lib";
import { verifyAuth } from "lib/utils/auth";
import { validateNewListingObject } from "lib/validations";

async function createListing(req: NextApiRequest, res: NextApiResponse) {
  let { name, address, available, description, state, images }: INewListing =
    req.body;
  const validation = validateNewListingObject(req.body);

  if (validation.error) {
    return res.status(400).json({
      status: 400,
      errors: mapError(validation.error),
    });
  }

  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const decodedToken = await verifyAuth(token!);

    const agentId = decodedToken.id;
    const newListing = await create({
      name,
      address,
      available,
      agentId,
      state,
      description,
      images,
    });
    return res.status(201).json({
      status: 201,
      data: newListing,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return knownPrismaError(res, error);
    }
    return res.status(res.statusCode).json({
      message: "Failed to create listing",
      error,
    });
  }
}

export default use(allowMethods(["POST"]), createListing);
