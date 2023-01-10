import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { getUsers, knownPrismaError } from "lib";
import { allowMethods } from "middleware/allowedMethods";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";

export async function handler(req: NextApiRequest, res: NextApiResponse) {

	try {
		const users = await getUsers()
		return res.status(200).json({
			status: 200,
			message: "Users retrieved successfully",
			data: users,
		})
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			knownPrismaError(res, error)
		}
		return res.status(res.statusCode).json({
			message: "Failed to get users",
			error
		});
	}
}

export default use(allowMethods(["GET"]), handler)