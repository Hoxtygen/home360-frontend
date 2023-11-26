import ResetPassword from "features/auth/password-reset/ResetPassword";
import { GetServerSideProps } from "next";
import React from "react";

export default function ResetPasswordIndex({ token }: { token: string }) {
  return (
    <div>
      <ResetPassword token={token} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { token } = query;
  return {
    props: { token },
  };
};
