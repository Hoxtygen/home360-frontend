import { BaseResponse, NewUserSignup } from "@/typedef";

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

export type ListingAgentInfo = Omit<NewUserSignup, "address" | "password">;

export type ListingData = { id: string } & ListingProps;

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

export type ListingInfo = {
  listing: ListingProps;
};

export type ListingResponse = {
  status: string;
  message: string;
  data: ListingData;
};

type ListingWithAgentInfo = {
  listing: ListingData;
  agentInfo: ListingAgentInfo;
};

export interface ListingDetailResponse extends BaseResponse {
  data: ListingWithAgentInfo;
}

type ListingSearchData = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  items: ListingData[];
  hasNext: boolean;
};

export type ListingDetailProps = {
  listingData: ListingProps;
  listingAgent: ListingAgentInfo;
  isLoading: boolean;
};

export type UserListingDetailsProps = Omit<
  ListingDetailProps,
  "listingAgent"
> & {
  handleDeleteListing: () => void;
  handleShowDialog: () => void;
  handleCloseDialog: () => void;
  showDialog: boolean;
};

export interface ListingSearchResponse extends BaseResponse {
  data: ListingSearchData;
}

export type ListingAgentProps = {
  agent: ListingAgentInfo;
  handleListingEnquiryFormDialog(): void;
};

export type ListingAgentAndListingImagesProps = {
  listingImages: string[];
  agentInfo: ListingAgentInfo;
  handleListingEnquiryFormDialog(): void;
};

export type ListingEnquiryProps = {
  message: string;
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  employmentType: string;
  commercialPurposes: string;
  pets: string;
};

export type SelectOption = {
  label: string;
  value: string | number;
};
