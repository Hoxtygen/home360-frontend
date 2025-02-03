/* eslint-disable unused-imports/no-unused-vars */
import {
  BaseResponse,
  NewUserSignup,
  PaginatedAPIResponseBase,
} from "@/typedef";

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

export type ListingData = {
  id: string;
  agent_id: number;
  pets_allowed: string;
  available_from: string;
  facility_quality: string;
  application_docs: string[];
  apartment_images: string[];
  created_at: string;
  updated_at: string;
  apartment_info: ApartmentInfo;
  rented: boolean;
  rentDate: string;
} & IListingData;

type IListingData = Omit<
  ListingProps,
  | "availableFrom"
  | "facilityQuality"
  | "petsAllowed"
  | "apartmentInfo"
  | "applicationDocs"
  | "apartmentImages"
>;

export type ListingProps = {
  title: string;
  description: string;
  furnishing: string;
  position?: string;
  miscellaneous?: string;
  address: Address;
  availableFrom: string;
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

export interface RentSuccessResponse extends BaseResponse {
  data: RentData;
}

export type RentData = {
  renterId: number;
  rentDuration: string;
  rentStartDate: string;
  rentDueDate: string;
  createdAt: string;
  modifiedAt: string;
  listingId: string;
  agentId: number;
};

export interface EnquirerResponse extends BaseResponse {
  data: EnquirerItem[];
}

export type EnquirerItem = {
  listingId: string;
  read: boolean;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type ListingDetailProps = {
  listingData: ListingData;
  listingAgent: ListingAgentInfo;
  isLoading: boolean;
};

export type UserListingDetailsProps = Omit<
  ListingDetailProps,
  "listingAgent" | "isLoading"
> & {
  handleDeleteListing: () => void;
  handleShowDialog: () => void;
  handleCloseDialog: () => void;
  showDialog: boolean;
};

export interface ListingSearchResponse extends BaseResponse {
  data: PaginatedAPIResponseBase<ListingSearchResultDataItem>;
}

export type ListingSearchResultDataItem = ListingProps & {
  id: string;
  createdAt: string;
  updatedAt: string;
  rented: boolean;
  agentId: number;
};
export type ListingAgentProps = {
  agent: ListingAgentInfo;
  handleListingEnquiryFormDialog(): void;
};

export type ListingAgentAndListingImagesProps = {
  listingImages: string[];
  agentInfo: ListingAgentInfo;
  handleListingEnquiryFormDialog(): void;
};

export type ListingEnquiryData = {
  commercialPurpose: string;
  email: string;
  employmentStatus: string;
  firstName: string;
  lastName: string;
  location: string;
  message: string;
  pets: string;
  phoneNumber: string;
  salutation: string;
  userId?: number;
};

export type ListingEnquiryProps = {
  listingId: string;
  agentId: number;
  handleListingEnquiryFormDialog: () => void;
};

export type ListingEnquiryFormData = ListingEnquiryData &
  Omit<ListingEnquiryProps, "handleListingEnquiryFormDialog">;

export type SelectOption = {
  label: string;
  value: string | number;
};

type ListingEnquiryResponseR = {
  listingId: string;
  createdAt: string;
} & ListingEnquiryData;

export interface ListingEnquiryResponse extends BaseResponse {
  data: ListingEnquiryResponseR;
}

export type ListingEnquiryFormProps = {
  listingEnquiryInitialValues: ListingEnquiryData;
  listingId: string;
  agentId: number;
  handleSubmitEnquiryForm(enquiryData: ListingEnquiryFormData): void;
  isLoading?: boolean;
};

export type ApartmentInfoProps = {
  petsAllowed: string;
  facilityQuality: string;
  availableFrom: string;
  apartmentInfo: ApartmentInfo;
};

export interface ListingStatistics extends BaseResponse {
  data: ListingStatisticsData;
}

export type ListingStatisticsData = {
  total_listings: number;
  rented_listings: number;
  total_income: number;
  income: ListingStatYearlyGrouping[];
  listings: ListingStatYearlyGrouping[];
  total_views: number;
  views_by_year_and_month: ListingViewStatYearlyGrouping[];
};

export type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type ListingStatYearlyGrouping = {
  year: number;
  months: ListingStatMonthlyGroupingItem[];
};

export type ListingStatMonthlyGroupingItem = {
  name: Month;
  amount: number;
};

export type ListingViewStatMonthlyGroupingItem = Omit<
  ListingStatMonthlyGroupingItem,
  "amount"
> & { views: number };

export type ListingViewStatYearlyGrouping = {
  year: number;
  months: ListingViewStatMonthlyGroupingItem[];
};

export type ListingsDataChart = {
  listingsData: ListingStatYearlyGrouping[];
};

export type ListingsViewDataChart = {
  listingsData: ListingViewStatYearlyGrouping[];
};

export type RentFormValues = {
  listingId: string;
  rentStartDate: string;
  rentDueDate: string;
  renterEmail: string;
};

export type RentFormProps = {
  listingId: string;
  parentCallback(): void;
};
