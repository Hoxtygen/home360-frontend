import { BaseResponse, PaginatedAPIResponseBase } from "@/typedef";

export type EnquiryMessageItemProps = {
  date: string;
  messageString: string;
  senderEmail: string;
  isRead: boolean;
};

export type EnquiryMessageProps = {
  messages: EnquiryMessageItemProps[];
};

export interface ListingEnquiryMessageResponse extends BaseResponse {
  data: PaginatedAPIResponseBase<EnquiryData>;
}

export type EnquiryData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  salutation: string;
  message: string;
  employmentStatus: EmploymentStatus;
  pets: string;
  commercialPurpose: string;
  listingId: string;
  agentId: string;
  createdAt: string;
  read: boolean;
};

export interface EnquiryMessageDetailResponse extends BaseResponse {
  data: EnquiryData;
}

type EmploymentStatus =
  | "EMPLOYEE"
  | "WORKER"
  | "SELF_EMPLOYED"
  | "APPRENTICE"
  | "STUDENT"
  | "DOCTORAL_STUDENT"
  | "JOB_SEEKER"
  | "PENSIONER"
  | "OTHERS";
