import { GetServerSideProps } from "next";
import React from "react";
import Dashboard from "views/dashboard/Dashboard";

export default function dashboard() {
  return <Dashboard />;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
