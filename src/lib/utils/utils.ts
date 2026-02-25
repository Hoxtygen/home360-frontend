import {
  AuthenticationSuccessResponse,
  DetermineSenderResult,
  MappedSuccessLoginResponse,
  Nigeria,
} from "@/typedef";
import clsx, { ClassValue } from "clsx";
import { SUPPORTED_FILE_FORMATS } from "constant-data/staticData";
import { SelectOption } from "features/listings/types";
import {
  EnquiryMessageDetailResponse,
  EnquiryMessageReplyItemProps,
} from "features/messages/types";
import { twMerge } from "tailwind-merge";

export function mergeClass(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function checkSingleFileSize(imgFile: File) {
  let valid = true;
  if (imgFile) {
    const size = imgFile.size / 1024 / 1024;
    if (size > 2) {
      valid = false;
    }
  }
  return valid;
}

export function isFilesCorrectType(files: File[]) {
  let valid = true;
  if (files) {
    files.forEach((file) => {
      if (!SUPPORTED_FILE_FORMATS.includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
}

export function isValidFileFormat(files: FileList) {
  let valid = true;
  if (files) {
    Array.from(files).forEach((file) => {
      if (!SUPPORTED_FILE_FORMATS.includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
}

export function isFilesTooBig(files?: File[]): boolean {
  let valid = true;
  if (files) {
    files.forEach((file) => {
      const size = file.size / 1024 / 1024;
      if (size > 10) {
        valid = false;
      }
    });
  }
  return valid;
}

export function formatString(str: string, formatString?: boolean): string {
  const regex = /\s|-/g;
  if (!formatString || formatString === undefined) {
    return str;
  }
  return str.replaceAll(regex, "_").toUpperCase();
}

export function reFormatString(str: string): string {
  const formattedStr = str.replaceAll("_", " ").toLowerCase();
  return formattedStr.charAt(0).toUpperCase() + formattedStr.slice(1);
}

export function formatCurrency(value?: number | string) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(Number(value));
}

export function addValues(values: Object): number {
  if (!values) return 0;
  return Object.values(values).reduce((acc, currVal) => {
    if (currVal !== undefined) {
      acc = +currVal + acc;
    }
    return acc;
  }, 0);
}

export function getRemainingCharacter(
  maxCharacter: number,
  typedCharacter: number
) {
  return maxCharacter - typedCharacter;
}

export function formatDate(selectedDate: Date | string) {
  const date = new Date(selectedDate);
  const formattedDay =
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const formattedMonth =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth();
  const result = [formattedDay, formattedMonth, date.getFullYear()].join("-");
  return result;
}

export function checkFileSize(file: File) {
  const size = file.size / 1024 / 1024;
  if (size > 2) {
    return {
      code: "name-too-large",
      message: `Size is larger than 2MB`,
    };
  }
  return null;
}

export function sortByProperty<T>(array: T[], property: string): T[] {
  return array.sort((a, b) => {
    const valueA = getProperty(a, property);
    const valueB = getProperty(b, property);

    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  });
}

function getProperty(obj: any, path: string): any {
  const keys = path.split(".");
  return keys.reduce(
    (o, key) => (o?.[key] !== undefined ? o[key] : undefined),
    obj
  );
}

export function capitalizeFirstCharacter(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function replaceSpecialCharactersWithSpace(str: string): string {
  const specialChars = /[`~!@#$%^&*()_+-=\{\}\|:;"'<>,.?\/\\ ]/g;
  return str.replaceAll(specialChars, " ");
}

export function mapLoginResponse(
  loginResponse: AuthenticationSuccessResponse
): MappedSuccessLoginResponse {
  return {
    id: loginResponse.data.id,
    firstName: loginResponse.data.firstName,
    lastName: loginResponse.data.lastName,
  };
}

export function getStateNames(country: Nigeria[]): SelectOption[] {
  if (!country) return [];
  return country.map((state) => ({
    label: state.name,
    value: state.name,
  }));
}

export function isEnquiryMessageDetailResponse(
  result: any
): result is EnquiryMessageDetailResponse {
  return result !== null && typeof result === "object" && "data" in result;
}

export function getEnvironment(): string {
  return process.env.NODE_ENV === "production" ? "Production" : "Development";
}

export function formatNDate(dateString: string) {
  const cleanedDateString = dateString.replace(/\.\d+/, "");

  const newDate = new Date(cleanedDateString);

  if (isNaN(newDate.getTime())) {
    throw new TypeError("dateString must be a type of date");
  }
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(newDate);
  return formattedDate;
}

export function timeOfDayGreeting() {
  const today = new Date();
  const hour = today.getHours();
  if (hour < 12) {
    return "Good morning";
  } else if (hour < 17) {
    return "Good day";
  } else {
    return "Good evening";
  }
}

/**
 * This function is used to determine the sender of a chat message,
 * the sender name and the current user for appropriate styling
 *
 * @export
 * @param {(MappedSuccessLoginResponse | null)} user
 * @param {EnquiryMessageReplyItemProps} message
 * @return {*}  {DetermineSenderResult}
 */
export function determineSender(
  user: MappedSuccessLoginResponse | null,
  message: EnquiryMessageReplyItemProps,
  names?: { enquirerName?: string; agentName?: string }
): DetermineSenderResult {
  if (!user) {
    return {
      isSenderAgent: false,
      senderName: "Unknown",
      isCurrentUserSender: false,
    };
  }

  const { senderId, agentId, enquirerId } = message;

  const userIdStr = String(user.id);
  const senderIdStr = String(senderId);
  const agentIdStr = String(agentId);
  const enquirerIdStr = String(enquirerId);

  const isCurrentUserSender = userIdStr === senderIdStr;
  const isSenderAgent = senderIdStr === agentIdStr;
  const isUserParticipant =
    userIdStr === agentIdStr || userIdStr === enquirerIdStr;

  let senderName = "Unknown";

  if (isCurrentUserSender) {
    senderName = "You";
  } else if (isSenderAgent) {
    senderName = names?.agentName || "Agent";
  } else if (senderIdStr === enquirerIdStr) {
    senderName = names?.enquirerName || "Enquirer";
  }

  return {
    isSenderAgent: isUserParticipant && isSenderAgent,
    senderName,
    isCurrentUserSender,
  };
}
