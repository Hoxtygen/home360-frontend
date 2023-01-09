import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export function knownPrismaError(res: NextApiResponse, error: PrismaClientKnownRequestError) {
	if (error.code === 'P2002') {
		return res.status(res.statusCode).json({
			message: "Operation failed",
			error: error.message,
		});
	}

	if (error.code === 'P2025' || error.name === "NotFoundError") {
		return res.status(404).json({
			status: 404,
			message: "User does not exist"
		})
	}
}
