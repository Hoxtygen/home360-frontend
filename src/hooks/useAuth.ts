import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import { HOME_360_LOGIN_API } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";
import { LoginData, LoginFailureResponse, LoginSuccessResponse } from "typedef";

export function useLogin() {
  const { data, error, isLoading, mutate } = useMutation<
    AxiosResponse<LoginSuccessResponse>,
    AxiosError<LoginFailureResponse> | Error,
    LoginData
  >((loginData) =>
    requestHandler(HOME_360_LOGIN_API, {
      method: "POST",
      data: loginData,
    })
  );
  return {
    mutateLogin: mutate,
    userData: data?.data,
    userLoginError: errorHandler(error),
    isLoadingLogin: isLoading,
  };
}
