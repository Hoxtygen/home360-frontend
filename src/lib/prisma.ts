import { PrismaClient as MongoPrismaClient } from "@prisma/mongo/client";
import { PrismaClient as PostgresPrismaClient } from "@prisma/postgres/client";

const globalForPrisma = global as unknown as { prisma: PostgresPrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PostgresPrismaClient({
    log: ["query"],
  });

export const mongoPrisma = new MongoPrismaClient({
  log: ["query"],
});
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

