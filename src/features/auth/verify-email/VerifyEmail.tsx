import ErrorMessage from "components/shared/ErrorMessage";
import SuccessMessage from "components/shared/SuccessMessage";
import { useVerifyEmail } from "hooks/useVerifyEmail";
import React from "react";
import AuthLayout from "../AuthLayout";

export default function VerifyEmail({ token }: { token: string }) {
  const { emailVerificationError, emailVerificationResponse } =
    useVerifyEmail(token);
  console.log("emailVerificationResponse:", emailVerificationResponse);
  console.log("emailVerificationError:", emailVerificationError);
  return (
    <AuthLayout>
      <div className="p-4 text-white">
        <h1 className="text-32 font-hanken-semibold text-white px-4">
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
      </div>
    </AuthLayout>
  );
}
