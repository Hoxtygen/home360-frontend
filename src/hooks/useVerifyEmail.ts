import { useQuery } from "@tanstack/react-query";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";
import { HOME_360_VERIFY_EMAIL } from "lib/endpoints";
import { TokenResponse } from "@/typedef";

export function useVerifyEmail(token: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["verify email"],
    networkMode: "always",
    queryFn: () =>
      requestHandler<TokenResponse>(`${HOME_360_VERIFY_EMAIL}?token=${token}`, {
        method: "GET",
      }),
    retry: false,
    refetchOnWindowFocus: false,
  });
  return {
    emailVerificationResponse: data?.data,
    emailVerificationError: errorHandler(error),
    isEmailVerificationLoading: isLoading,
  };
}
