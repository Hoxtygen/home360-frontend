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
