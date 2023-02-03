import { prisma } from "../lib/prisma";
import { encryptPassword } from "../lib/utils";

async function main() {
  const magnifera = await prisma.user.upsert({
    where: { email: "magnifera@indica.com" },
    update: {},
    create: {
      email: "magnifera@indica.com",
      name: "Magnifera Indica",
      address: "Suite 4, Agbara Housing Estate",
      phoneNumber: "09087954437",
      password: encryptPassword("12345678"),
      listings: {
        create: [
          {
            name: "Value Plus Pharmacy shop",
            address: "Block 143, Irewolede shopping complex",
            available: true,
          },
          {
            name: "ShopMore Shopping Complex",
            address: "Block 32B, Kwara State House of Assembly Quarters",
            available: true,
          },
          {
            name: "ShopRite Consumers Office",
            address: "Plot 32, Palm Mall, Fate Road, Tanke Ilorin.",
            available: true,
          },
        ],
      },
    },
  });
  const carica = await prisma.user.upsert({
    where: { email: "carica@papaya.com" },
    update: {},
    create: {
      email: "carica@papaya.com",
      name: "Carica Papaya",
      address: "25, Ajaabale street, Sango Ilorin",
      phoneNumber: "08047624987",
      password: encryptPassword("12345678"),
      listings: {
        create: [
          {
            name: "Hope Dey Stationery Officee",
            address: "Block 108, Irewolede shopping complex",
            available: true,
          },
          {
            name: "HoneyWell hostel",
            address: "No 45, Tanke area, Ilorin",
            available: true,
          },
          {
            name: "Magaji Estate",
            address: "10, Irewolede village, Irewolede area, Ilorin",
            available: true,
          },
        ],
      },
    },
  });
  const mays = await prisma.user.upsert({
    where: { email: "zea@mays.io" },
    update: {},
    create: {
      email: "zea@mays.io",
      name: "Zea Mays",
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
