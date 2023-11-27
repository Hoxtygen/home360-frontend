import VerifyEmail from "features/auth/verify-email/VerifyEmail";
import { GetServerSideProps } from "next";
import React from "react";

export default function VerifyEmailIndex({ token }: { token: string }) {
  return (
    <div>
      <VerifyEmail token={token} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { token } = query;
  return {
    props: { token },
  };
};
