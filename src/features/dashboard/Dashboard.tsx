import { DashboardLayout } from "components/layouts";
import useGetUserDetails from "hooks/useGetUserDetails";
import React from "react";

export default function Dashboard() {
  const { userDetailsData, userDetailStatus, userDetailError } =
    useGetUserDetails();
  console.log("userDetailsData:", userDetailsData);
  return (
    <DashboardLayout title="Dashboard" isLoading={false}>
      <h2>Good day {userDetailsData?.data.firstName}</h2>
    </DashboardLayout>
  );
}
