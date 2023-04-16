import { prisma } from "../../src/clients/prisma";
import { findUser, getUsers } from "../../src/lib/db/user";
import { encryptPassword } from "../../src/lib/utils";

jest.mock("../../src/clients/prisma");
const prismaMock = jest.mocked(prisma);
describe("Users", () => {
  const newUser1 = {
    id: "clemn85ms0000sovh8cwm8yfo",
    email: "test3@example.com",
    firstName: "Rattus",
    lastName: "Rattus",
    address: "4th avenue",
    phoneNumber: "09089876837",
    password: encryptPassword("12345678"),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const newUser2 = {
    id: "clemn85ms0000sovh8cwm8ygh",
    email: "test1@example.com",
    firstName: "Rattus",
    lastName: "Rattus",
    address: "4th avenue",
    phoneNumber: "09089876837",
    password: encryptPassword("12345678"),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it("should return all saved users", async () => {
    prismaMock.user.findMany.mockResolvedValue([newUser1, newUser2]);
    await expect(getUsers()).resolves.toHaveLength(2);
    await expect(getUsers()).resolves.toStrictEqual([newUser1, newUser2]);
  });

  it("should get a single user", async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(newUser1);
    await expect(findUser("test3@example.com")).resolves.toHaveProperty("id");
    await expect(findUser("test3@example.com")).resolves.toHaveProperty(
      "firstName"
    );
    await expect(findUser("test3@example.com")).resolves.toHaveProperty(
      "lastName"
    );
    await expect(findUser("test3@example.com")).resolves.toHaveProperty(
      "email"
    );
    await expect(findUser("test3@example.com")).resolves.toHaveProperty(
      "address"
    );
    await expect(findUser("test3@example.com")).resolves.toHaveProperty(
      "phoneNumber"
    );
  });
});
