import { Prisma, User } from "@prisma/client";


export type NewUser = Omit<User, "createdAt" | "updatedAt" | "id">

export type IUser = User

