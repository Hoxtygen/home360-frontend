import { Prisma } from "@prisma/client";
import { NextApiResponse } from "next";

export function knownPrismaError(
  res: NextApiResponse,
  error: Prisma.PrismaClientKnownRequestError
) {
  if (error.code === "P2002") {
    return res.status(400).json({
      status: 400,
      message: "Operation failed",
      error: "Record already exist",
    });
  }

  if (error.code === "P2025" || error.name === "NotFoundError") {
    return res.status(404).json({
      status: 404,
      message: "Record does not exist",
    });
  }
}
