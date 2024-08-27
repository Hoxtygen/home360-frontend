import { Button } from "components/buttons/Button";
import { useResendVerificationToken } from "hooks/useResendVerificationToken";
import { useVerifyEmail } from "hooks/useVerifyEmail";
import ErrorMessage from "shared/ErrorMessage";
import SuccessMessage from "shared/SuccessMessage";
import AuthLayout from "../AuthLayout";

export default function VerifyEmail({ token }: { token: string }) {
  const { emailVerificationError, emailVerificationResponse } =
    useVerifyEmail(token);
  const { isLoadingresendVerificationToken, refetchVerificationToken } =
    useResendVerificationToken(token);

  function handleFetchVerificationToken() {
    refetchVerificationToken();
  }

  return (
    <AuthLayout>
      <div className="p-4 text-white">
        <h1 className="text-32 font-hanken-semibold text-white px-3">
          Account Verification page
        </h1>
        {emailVerificationResponse && (
          <SuccessMessage
            className="text-24"
            message={emailVerificationResponse.data}
          />
        )}
        {emailVerificationError && (
          <ErrorMessage
            className="text-24"
            error={emailVerificationError.message}
          />
        )}
        <div className="flex justify-center text-white">
          <Button
            size="xl"
            variant="link"
            href="/auth/login"
            className="dark:text-white dark:bg-black hover:no-underline font-hanken-medium uppercase"
            title="Login page"
          >
            Login
          </Button>
        </div>
        {emailVerificationError?.status === 401 && (
          <div className="px-2">
            <Button
              isLoading={isLoadingresendVerificationToken}
              onClick={handleFetchVerificationToken}
              className="dark:text-white"
            >
              Resend Verification Token
            </Button>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
