import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { AxiosResponse, AxiosError } from "axios";

import { HOME_360_LOGIN_API } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";
import {
  ApiErrorResponse,
  AuthenticationSuccessResponse,
  LoginData,
} from "typedef";

export function useLogin() {
  const { data, error, isLoading, mutate } = useMutation<
    AxiosResponse<AuthenticationSuccessResponse>,
    AxiosError<ApiErrorResponse> | Error,
    LoginData
  >({
    mutationKey: ["login"],
    networkMode: "always",
    mutationFn: (loginData) =>
      requestHandler(HOME_360_LOGIN_API, {
        method: "POST",
        data: loginData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: (data) => {
      setCookie("token", data?.data.token.accessToken, {
        path: "/",
        httpOnly: false,
      });
    },
  });
  return {
    mutateLogin: mutate,
    userData: data?.data,
    userLoginError: errorHandler(error),
    isLoadingLogin: isLoading,
  };
}
