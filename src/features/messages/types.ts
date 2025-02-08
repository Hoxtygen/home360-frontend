/* eslint-disable unused-imports/no-unused-vars */
import { BaseResponse, PaginatedAPIResponseBase } from "@/typedef";
import { MutationStatus } from "@tanstack/react-query";

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
  agentId: number;
  createdAt: string;
  read: boolean;
  userId?: number;
  replies: EnquiryMessageReplyItemProps[];
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

export type EnquiryMessageInfoProps = {
  enquiryData: EnquiryData;
};

export type EnquiryMessageReplyItemProps = {
  id: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  content: string;
};

export type EnquiryMessageReplyFormData = {
  enquiryId: string;
} & Omit<EnquiryMessageReplyItemProps, "id" | "createdAt">;

export type EnquiryMessageRepliesProps = {
  replies: EnquiryMessageReplyItemProps[];
};

export type EnquiryMessageReplyFormProps<T> = {
  replyInitialValues: T;
  handleSubmitReply: (data: T, callback?: () => void) => void;
  messageStatus: MutationStatus;
};

export type EnquiryMessageInfoContainerProps = EnquiryMessageInfoProps & {
  handleSubmitReply(
    data: EnquiryMessageReplyFormData,
    callback?: () => void
  ): void;
  messageStatus: MutationStatus;
  enquiryId: string;
};

type EnquiryMessageReplyData = {
  id: string;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
};

export interface EnquiryReplyMessageResponse extends BaseResponse {
  data: EnquiryMessageReplyData;
}
