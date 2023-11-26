import {
  PasswordRequestResetResponse,
  ResetPasswordApiProp,
} from "./../typedef/index";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";
import { HOME_360__RESET_PASSWORD } from "lib/endpoints";
import { getCookie } from "cookies-next";

export function useResetPassword() {
  const token = getCookie("resetPasswordToken");
  const { data, error, isLoading, mutate } = useMutation<
    AxiosResponse<PasswordRequestResetResponse>,
    AxiosError<AxiosError | Error>,
    ResetPasswordApiProp
  >((passwordResetData) =>
    requestHandler(`${HOME_360__RESET_PASSWORD}?token=${token}`, {
      method: "POST",
      data: { newPassword: passwordResetData.newPassword },
    })
  );
  return {
    resetPasswordData: data?.data,
    resetPasswordError: errorHandler(error),
    mutateResetPassword: mutate,
    isLoadingResetPassword: isLoading,
  };
}
