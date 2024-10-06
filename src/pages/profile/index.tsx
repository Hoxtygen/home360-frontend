import { GetServerSideProps } from "next";
import React from "react";

import { Profile } from "features/profile";

export default function profileIndex() {
  return (
    <div>
      <Profile />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
