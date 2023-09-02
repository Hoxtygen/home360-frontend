import { PrismaClient } from "@prisma/client";
import { mockReset, mockDeep } from "jest-mock-extended";

export const prismaMock = mockDeep<PrismaClient>();
jest.mock("../prisma", () => ({
  prisma: prismaMock,
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prisma = prismaMock;
