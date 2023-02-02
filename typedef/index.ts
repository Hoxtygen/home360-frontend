import { Prisma, User, Listing } from "@prisma/client";

export type NewUser = Omit<User, "createdAt" | "updatedAt" | "id">;

export type IUser = Omit<User, "password">;

export type IListings = Listing;

const userWithListings = Prisma.validator<Prisma.UserArgs>()({
  include: { listings: true },
});

export type UserWithListings = Omit<
  Prisma.UserGetPayload<typeof userWithListings>,
  "password" | "createdAt" | "updatedAt"
>;
