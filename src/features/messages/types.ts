/* eslint-disable unused-imports/no-unused-vars */
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
  agentId: number;
  createdAt: string;
  read: boolean;
  userId: number;
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
  agentId: number;
  enquirerId: number;
  createdAt: string;
  content: string;
  senderId: number;
  agentName?: string;
  enquirerName?: string;
  status?: {
    success?: boolean;
    error?: any;
  };
};

export type EnquiryMessageReplyFormData = {
  enquiryId: string;
  agentId: number;
  enquirerId: number;
  content: string;
  senderId?: number;
};

export type EnquiryMessageRepliesProps = {
  replies: EnquiryMessageReplyItemProps[];
  agentId: number;
  enquirerId: number;
  agentName?: string;
  enquirerName?: string;
};

export type EnquiryMessageReplyFormProps<T> = {
  replyInitialValues: T;
  messageStatuses: {
    [messageId: string]: {
      success?: boolean;
      error?: any;
    };
  };
  handleSubmitReply(replyRequestData: EnquiryMessageReplyFormData): void;
};

export type EnquiryMessageInfoContainerProps = EnquiryMessageInfoProps & {
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

export interface RealTimeMessage {
  id: string;
  enquiryId: string;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
}

export interface ListingEnquiryMessageReply {
  headers: any;
  body: {
    data: {
      id: string;
      agentId: number;
      enquirerId: number;
      content: string;
      createdAt: string;
      senderId: number;
    };
  };
  message: string;
  status: string;
  statusCode: string;
  statusCodeValue: number;
  localMessageId?: string;
}

export type EnquiryMessageDetailProps = {
  enquiryId: string;
};
