import { Prisma, User, Listing } from "@prisma/client";

export type NewUser = Omit<User, "createdAt" | "updatedAt" | "id">;

export type IUser = User;
export type IListings = Listing;
