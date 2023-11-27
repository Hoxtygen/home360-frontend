import {
  ApiErrorResponse,
  TokenResponse,
  PasswordResetRequest,
} from "@/typedef";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import { HOME_360_PASSWORD_RESET_REQUEST } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export function usePasswordResetRequest() {
  const { data, error, isLoading, mutate } = useMutation<
    AxiosResponse<TokenResponse>,
    AxiosError<ApiErrorResponse> | Error,
    PasswordResetRequest
  >((email) =>
    requestHandler(HOME_360_PASSWORD_RESET_REQUEST, {
      method: "POST",
      data: email,
    })
  );
  return {
    mutateResetRequest: mutate,
    isLoadingPasswordReset: isLoading,
    passwordResetRequestData: data?.data,
    passwordResetRequestError: errorHandler(error),
  };
}
