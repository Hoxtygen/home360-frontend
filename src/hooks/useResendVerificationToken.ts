import { useQuery } from "@tanstack/react-query";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";
import { HOME_360_RESEND_VERIFICATION_TOKEN } from "lib/endpoints";
import { TokenResponse } from "@/typedef";

export function useResendVerificationToken(token: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["resend verification token"],
    networkMode: "always",
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: () =>
      requestHandler<TokenResponse>(
        `${HOME_360_RESEND_VERIFICATION_TOKEN}?token=${token}`,
        {
          method: "GET",
        }
      ),
  });
  return {
    resendVerificationTokenData: data?.data,
    resendVerificationTokenError: errorHandler(error),
    isLoadingresendVerificationToken: isLoading,
    refetchVerificationToken: refetch,
  };
}
