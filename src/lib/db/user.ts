import { IUser, NewUser, UserWithListings } from "typedef";
import { prisma } from "clients/prisma";

export async function getUsers(): Promise<IUser[]> {
  const result: IUser[] = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
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
      firstName: true,
      lastName: true,
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
      firstName: true,
      lastName: true,
      email: true,
      address: true,
      phoneNumber: true,
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
      firstName: true,
      lastName: true,
    },
  });
  return result;
}

export async function createUser(user: NewUser) {
  const newUser = await prisma.user.create({
    data: user,
  });
  return {
    email: newUser.email,
    firstName: newUser.firstName,
    id: newUser.id,
    lastName: newUser.lastName,
  };
}

