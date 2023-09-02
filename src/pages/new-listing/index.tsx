import CreateListing from "components/create-listing/CreateListing";
import { GetServerSideProps } from "next";
import React from "react";

export default function NewListing() {
  return <CreateListing />;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token;
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
