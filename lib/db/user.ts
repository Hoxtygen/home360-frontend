import { prisma } from "../prisma";


export async function getUsers() {
	const result = await prisma.user.findMany()
	return result;
}
