export type AuthPayload = {
  status: number;
  message: string;
  token: string;
  name: string;
  email: string;
};

export type BuildingType =
  | "apartment"
  | "house"
  | "shared-room"
  | "temp-living"
  | "office"
  | "hall"
  | "nursing-home";

export type BuildingTypeToBuy =
  | "Apartment"
  | "House"
  | "Office"
  | "Hall"
  | "Hotel";

export type BuildingPurposeLabels = "Rent" | "Buy";

export type BuildingTypeLabels =
  | "Apartment"
  | "House"
  | "Temporary Living"
  | "Shared Room"
  | "Office"
  | "Hall"
  | "Nursing Home";

export type BuildingPurpose = "rent" | "buy";

export type OptionValue = string;

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
};

export type AuthenticationSuccessResponse = {
  status: number;
  token: Token;
  email: string;
  firstName: string;
  lastName: string;
  message: string;
};

export type RegisterSuccessResponse = {
  status: string;
  message: string;
  data: string;
};
export type MappedSuccessLoginResponse = {
  email: string;
  firstName: string;
  lastName: string;
  refreshToken: string;
  status: number;
};

type Token = {
  accessToken: string;
  refreshToken: string;
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

export interface BaseResponse {
  status: string;
  message: string;
}

export type ListingType =
  | "not-specified"
  | "apartment"
  | "attic"
  | "basement"
  | "duplex"
  | "mezzanine"
  | "ground-floor-apartment"
  | "loft"
  | "penthouse"
  | "terrace-apartment"
  | "other";
export type TokenResponse = {
  status: string;
  message: string;
  data: string;
};

export type MessageProps = {
  error?: string;
  message?: string;
  className?: string;
};

export type PasswordResetRequest = Omit<LoginData, "password">;

export type ResetPassword = {
  newPassword: string;
  confirmPassword: string;
};

export type ResetPasswordApiProp = Omit<ResetPassword, "confirmPassword">;

export interface RefreshTokenTokenResponse extends BaseResponse {
  data: RefreshTokenData;
}

type RefreshTokenData = {
  accessToken: string;
  refreshToken: string;
};

export type DeleteListingResponse = BaseResponse & { data: null };

export type Nigeria = {
  name: string;
  code: string;
  capital: string;
  lgs: string[];
};
