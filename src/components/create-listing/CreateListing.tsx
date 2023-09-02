import DashboardLayout from "components/dashboard/DashboardLayout";
import React from "react";
import ListingForm from "./ListingForm";

export default function CreateListing() {
  return (
    <DashboardLayout title="New Listing" isLoading={false}>
      <ListingForm />
    </DashboardLayout>
  );
}
