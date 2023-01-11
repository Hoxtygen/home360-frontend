import { IUser, NewUser } from "typedef";
import { prisma } from "../prisma"



export async function getUsers():Promise<IUser[]> {
	const result = await prisma.user.findMany()
	return result;
}

export async function getUser(email: string | undefined){
	const result = await prisma.user.findUniqueOrThrow({
		where: {
			email: email
		},
		select: {
			id: true,
			name: true,
			email: true,
			address: true,
			phoneNumber: true,
			listings: true
		}
	})
	return result;
}


export async function deleteUser(email: string | undefined) {
	const result = await prisma.user.delete({
		where: {
			email: email
		},
		select: {
			email: true,
			name: true
		}
	})
	return result
}


export async function createUser(user: NewUser): Promise<IUser> {
	const newUser = await prisma.user.create({
		data: user
	})
	return newUser;
}
