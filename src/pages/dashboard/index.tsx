import DashboardLayout from "components/dashboard/DashboardLayout";
import { GetServerSideProps } from "next";
import React from "react";
import Dashboard from "views/dashboard/Dashboard";

export default function dashboard() {
  return (
    <DashboardLayout title="Dashboard" isLoading={false}>
      <Dashboard />
    </DashboardLayout>
  );
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
