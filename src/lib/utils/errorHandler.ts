import { isAxiosError } from "axios";
import { LoginFailureResponse } from "typedef";

export default function errorHandler(error: unknown) {
  if (isAxiosError<LoginFailureResponse>(error)) {
    return {
      status: error.response?.status,
      timestamp: error.response?.data?.timestamp,
      message: error.response?.data?.message,
      errors: error.response?.data?.errors,
    };
  }
  if (error instanceof Error) {
    return {
      timestamp: new Date(),
      message: error.message,
      errors: [error.message],
    };
  }
}
