import { prisma } from "../src/lib/prisma";
import { encryptPassword } from "../src/lib/utils";

async function main() {
  await prisma.user.upsert({
    where: { email: "magnifera@indica.com" },
    update: {},
    create: {
      email: "magnifera@indica.com",
      firstName: "Magnifera",
      lastName: "Indica",
      address: "Suite 4, Agbara Housing Estate",
      phoneNumber: "09087954437",
      password: encryptPassword("12345678"),
    },
  });
  await prisma.user.upsert({
    where: { email: "carica@papaya.com" },
    update: {},
    create: {
      email: "carica@papaya.com",
      firstName: "Carica",
      lastName: "Papaya",
      address: "25, Ajaabale street, Sango Ilorin",
      phoneNumber: "08047624987",
      password: encryptPassword("12345678"),
    },
  });
  await prisma.user.upsert({
    where: { email: "zea@mays.io" },
    update: {},
    create: {
      email: "zea@mays.io",
      firstName: "Zea",
      lastName: "Mays",
      address: "33, Town hall road, Ilorin",
      phoneNumber: "07067302200",
      password: encryptPassword("12345678"),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log("Seeding Error: ", error);
    await prisma.$disconnect();
    process.exit(1);
  });
