import { Prisma, User, Listing } from "@prisma/client";

export type NewUser = Omit<User, "createdAt" | "updatedAt" | "id">;

export type IUser = Omit<User, "password">;

export type IListing = Listing;

const userWithListings = Prisma.validator<Prisma.UserArgs>()({
  include: { listings: true },
});

export type UserWithListings = Omit<
  Prisma.UserGetPayload<typeof userWithListings>,
  "password" | "createdAt" | "updatedAt"
>;
export interface AuthPayload {
  status: number;
  message: string;
  token: string;
  name: string;
  email: string;
}

export type INewListing = Omit<Listing, "id">;

export type OptionValue = string | number;
export type BuildingType =
  | "Apartment"
  | "House"
  | "Temporary Living"
  | "Shared Room"
  | "Office"
  | "Hall"
  | "Nursing Home";

export type BuildingPurpose = "Rent" | "Buy" | "Build";

export type SelectOption<T> = {
  label: T;
  value: string;
};

export type MyType<T, P extends keyof T> = {
  label: P;
  value: T[P];
};

type LocalStorageUserData = {
  name: string;
  id: string;
  email: string;
};
export interface LocalStorageUserInfo {
  token: string;
  user: LocalStorageUserData;
}

export type AuthState = {
  user: LocalStorageUserInfo | null;
  error: string | null;
  loading: boolean;
};

export type LoginData = {
  email: string;
  password: string;
};
export interface AdviceProps {
  href: string;
  title: string;
  lesson: string;
  backgroundImage: string;
}
