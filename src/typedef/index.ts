import { Listing } from "@prisma/mongo/client";
import { Prisma, User } from "@prisma/postgres/client";

export type NewUser = Omit<User, "createdAt" | "updatedAt" | "id">;

export type IUser = Omit<User, "password">;

export type IListing = Listing;

const userWithListings = Prisma.validator<Prisma.UserArgs>()({
  // include: { listings: true },
});

export type UserWithListings = Omit<
  Prisma.UserGetPayload<typeof userWithListings>,
  "password" | "createdAt" | "updatedAt"
>;
export type AuthPayload = {
  status: number;
  message: string;
  token: string;
  name: string;
  email: string;
};

export type INewListing = Omit<Listing, "id">;

export type BuildingType =
  | "apartment"
  | "house"
  | "shared-room"
  | "temp-living"
  | "office"
  | "hall"
  | "nursing-home";

export type BuildingPurposeLabels = "Rent" | "Buy" | "Build";
export type BuildingTypeLabels =
  | "Apartment"
  | "House"
  | "Temporary Living"
  | "Shared Room"
  | "Office"
  | "Hall"
  | "Nursing Home";

export type BuildingPurpose = "rent" | "buy" | "build";

export type OptionValue = string;

export type SelectOption<T extends OptionValue> = {
  label: string;
  value: T;
};

type LocalStorageUserData = {
  email: string;
  id: string;
  name: string;
};
export type LocalStorageUserInfo = {
  token: string;
  user: LocalStorageUserData;
};

export type AuthState = {
  user: LocalStorageUserInfo | null;
  error: string | null;
  loading: boolean;
};

export type LoginData = {
  email: string;
  password: string;
};
export type AdviceProps = {
  href: string;
  title: string;
  lesson: string;
  backgroundImage: string;
}

export type AuthenticationSuccessResponse = {
  status: number;
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  message: string;
};

export type ApiErrorResponse = {
  status?: string;
  timestamp?: Date;
  message?: string;
  errors: string[] | null;
};

export type LoginApiResponse = AuthenticationSuccessResponse | ApiErrorResponse;

export type NewUserSignup = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
  password: string;
};

export type EventHandlers = Record<string, React.EventHandler<any>>;


type Address = {
  streetName: string;
  houseNumber?: string;
  city: string;
  state: string;
  lga: string;
};

type ListingCost = {
  annualRent: string;
  agentFee?: string;
  cautionFee?: string;
  agreementFee?: string;
};

type ApartmentInfo = {
  roomNums: string;
  bathroomNums: string;
  bedroomNums: string;
  apartmentType: string;
};

export type CreateListingProps = {
  title: string;
  description: string;
  furnishing: string;
  position?: string;
  miscellaneous?: string;
  address: Address;
  availableFrom: Date;
  cost: ListingCost;
  details: string[];
  facilityQuality: string;
  petsAllowed: string;
  apartmentInfo: ApartmentInfo;
  applicationDocs: string[];
  apartmentImages: string[];
};
