import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { invalidRequestMethod, knownPrismaError, findUsers } from "../../../lib";
import { use } from "next-api-route-middleware";
import { allowMethods } from "../../../middleware/allowedMethods";

export  async function handler(req: NextApiRequest, res: NextApiResponse) {

	try {
		const users = await findUsers()
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