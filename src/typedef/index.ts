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

type Address = {
  streetName: string;
  houseNumber?: string;
  city: string;
  state: string;
  lga: string;
};

type ListingCost = {
  annualRent: number;
  agentFee?: number;
  cautionFee?: number;
  agreementFee?: number;
};

export type ApartmentInfo = {
  roomNums: string;
  bathroomNums: string;
  bedroomNums: string;
  apartmentType: string;
};

export type ListingProps = {
  title: string;
  description: string;
  furnishing: string;
  position?: string;
  miscellaneous?: string;
  address: Address;
  availableFrom: any;
  cost: ListingCost;
  details: string[];
  facilityQuality: string;
  petsAllowed: string;
  apartmentInfo: ApartmentInfo;
  applicationDocs: string[];
  apartmentImages: string[];
};

export type ListingResponse = {
  status: string;
  message: string;
  data: ListingData;
};

export type ListingData = { id: string } & ListingProps;

export interface ListingBaseResponse {
  status: string;
  message: string;
}

export interface ListingSearchResponse extends ListingBaseResponse {
  data: ListingSearchData;
}

export interface ListingDetailResponse extends ListingBaseResponse {
  data: ListingData;
}

type ListingSearchData = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  items: ListingData[];
  hasNext: boolean;
};

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
