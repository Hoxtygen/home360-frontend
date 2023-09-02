import { prisma } from "../../src/clients/prisma";
import {
  createNewListing,
  getListing,
  getListings,
} from "../../src/lib/db/listing";

jest.mock("../../src/clients/prisma");
const prismaMock = jest.mocked(prisma);

describe("Listings", () => {
  const listing1 = {
    address: "Block 143, Irewolede shopping complex",
    agentId: "clemn85ms0000sovh8cwm8y8f",
    available: true,
    description: "Lorem ipsum dolor sit amet consectettur adipscing",
    id: "clemn85ms0001sovhuicc35u2",
    name: "Value Plus Pharmacy shop",
    state: "Kwara",
    images:
      "https://res.cloudinary.com/dh3jxarvg/image/upload/v1551326198/Bill_Shankly_fm5qkx.jpg, https://res.cloudinary.com/dh3jxarvg/image/upload/v1550962500/sample.jpg",
  };
  const listing2 = {
    address: "Block 32B, Kwara State House of Assembly Quarters",
    agentId: "clemn85ms0000sovh8cwm8y8f",
    available: true,
    description: "Lorem ipsum dolor sit amet consectettur adipscing",
    id: "clemn85ms0002sovh18p94o1v",
    name: "ShopMore Shopping Complex",
    state: "Kwara",
    images:
      "https://res.cloudinary.com/dh3jxarvg/image/upload/v1551326978/vlcsnap-2013-04-25-21h12m16s151_dhzhbf.png, https://res.cloudinary.com/dh3jxarvg/image/upload/v1551434174/scrn.png",
  };

  it("should create newListing", async () => {
    prismaMock.listing.create.mockResolvedValue(listing1);
    await expect(createNewListing(listing1)).resolves.toEqual({
      address: "Block 143, Irewolede shopping complex",
      agentId: "clemn85ms0000sovh8cwm8y8f",
      available: true,
      description: "Lorem ipsum dolor sit amet consectettur adipscing",
      id: "clemn85ms0001sovhuicc35u2",
      name: "Value Plus Pharmacy shop",
      state: "Kwara",
      images:
        "https://res.cloudinary.com/dh3jxarvg/image/upload/v1551326198/Bill_Shankly_fm5qkx.jpg, https://res.cloudinary.com/dh3jxarvg/image/upload/v1550962500/sample.jpg",
    });
    await expect(createNewListing(listing1)).resolves.not.toEqual({
      address: "Block 32B, Kwara State House of Assembly Quarters",
      agentId: "clemn85ms0000sovh8cwm8y8f",
      available: true,
      description: "Lorem ipsum dolor sit amet consectettur adipscing",
      id: "clemn85ms0002sovh18p94o1v",
      name: "ShopMore Shopping Complex",
      state: "Kwara",
      images:
        "https://res.cloudinary.com/dh3jxarvg/image/upload/v1551326978/vlcsnap-2013-04-25-21h12m16s151_dhzhbf.png, https://res.cloudinary.com/dh3jxarvg/image/upload/v1551434174/scrn.png",
    });
  });

  it("should return all saved listings", async () => {
    prismaMock.listing.findMany.mockResolvedValue([listing1, listing2]);
    await expect(getListings()).resolves.toHaveLength(2);
    await expect(getListings()).resolves.toStrictEqual([listing1, listing2]);
  });

  it("should return the data of a given listing id", async () => {
    prismaMock.listing.findUniqueOrThrow.mockResolvedValue(listing1);
    await expect(
      getListing("clemn85ms0001sovhuicc35u2")
    ).resolves.toHaveProperty("id");
    await expect(
      getListing("clemn85ms0001sovhuicc35u2")
    ).resolves.toHaveProperty("address");
    await expect(
      getListing("clemn85ms0001sovhuicc35u2")
    ).resolves.toHaveProperty("name");
    await expect(
      getListing("clemn85ms0001sovhuicc35u2")
    ).resolves.toHaveProperty("state");
    await expect(
      getListing("clemn85ms0001sovhuicc35u2")
    ).resolves.toHaveProperty("agentId");
    await expect(
      getListing("clemn85ms0001sovhuicc35u2")
    ).resolves.toHaveProperty("images");
    await expect(
      getListing("clemn85ms0001sovhuicc35u2")
    ).resolves.toHaveProperty("available");
  });
});
