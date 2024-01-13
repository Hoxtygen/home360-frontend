import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";

import requestHandler from "lib/utils/requestHandler";
import {
  NewUserSignup,
  ApiErrorResponse,
  RegisterSuccessResponse,
} from "./../typedef/index";
import { HOME_360_SIGNUP_API } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";

export default function useSignup() {
  const { data, error, isLoading, mutate } = useMutation<
    AxiosResponse<RegisterSuccessResponse>,
    AxiosError<ApiErrorResponse> | Error,
    NewUserSignup
  >({
    mutationKey: ["signup"],
    networkMode: "always",
    mutationFn: (signupData) =>
      requestHandler(HOME_360_SIGNUP_API, {
        method: "POST",
        data: signupData,
      }),
  });
  return {
    mutateSignup: mutate,
    userSignupData: data?.data,
    userSignupError: errorHandler(error),
    isLoadingUserSignup: isLoading,
  };
}
