import { LogoutResponse } from "@/typedef";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import { HOME_360_USER_LOGOUT } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export function useLogout() {
  const { mutate, data, error, status } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () =>
      requestHandler<LogoutResponse>(HOME_360_USER_LOGOUT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      deleteCookie("token", {
        path: "/",
      });
      deleteCookie("refreshToken", {
        path: "/",
      });
    },
  });
  return {
    mutateLogout: mutate,
    logoutData: data?.data,
    logoutError: errorHandler(error),
    logoutStatus: status,
  };
}
