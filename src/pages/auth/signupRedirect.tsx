import React from "react";

import AuthLayout from "features/auth/AuthLayout";
import SignupSuccessRedirect from "features/auth/SignupSuccessRedirect";

export default function signupRedirect() {
  return (
    <AuthLayout>
      <SignupSuccessRedirect />
    </AuthLayout>
  );
}
