import { prisma } from "../../src/clients/prisma";
import { createUser } from "../../src/lib/db/user";
import { encryptPassword } from "../../src/lib/utils";

jest.mock("../../src/clients/prisma");
const prismaMock = jest.mocked(prisma);

describe("Authentication", () => {
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
  it("should create new users", async () => {
    prismaMock.user.create.mockResolvedValue(newUser1);
    await expect(createUser(newUser1)).resolves.toEqual({
      id: "clemn85ms0000sovh8cwm8yfo",
      email: "test3@example.com",
      firstName: "Rattus",
      lastName: "Rattus",
    });

    prismaMock.user.create.mockResolvedValue(newUser2);
    await expect(createUser(newUser2)).resolves.toEqual({
      id: "clemn85ms0000sovh8cwm8ygh",
      email: "test1@example.com",
      firstName: "Rattus",
      lastName: "Rattus",
    });
  });

  it("should throw error for duplicate email registration", async () => {
    await expect(createUser(newUser1)).rejects.toThrow();
  });
});
