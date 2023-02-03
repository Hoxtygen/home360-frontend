import { IUser, NewUser, UserWithListings } from "typedef";
import { prisma } from "../prisma";

export async function getUsers(): Promise<IUser[]> {
  const result: IUser[] = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      phoneNumber: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
}

export async function findUser(email: string | undefined) {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      phoneNumber: true,
      password: true,
    },
  });
  return result;
}

export async function getUserListings(
  id: string | undefined
): Promise<UserWithListings> {
  const result: UserWithListings = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      phoneNumber: true,
      listings: true,
    },
  });
  return result;
}

export async function deleteUser(email: string | undefined) {
  const result = await prisma.user.delete({
    where: {
      email: email,
    },
    select: {
      email: true,
      name: true,
    },
  });
  return result;
}

export async function createUser(user: NewUser): Promise<IUser> {
  const newUser: IUser = await prisma.user.create({
    data: user,
  });
  return newUser;
}
