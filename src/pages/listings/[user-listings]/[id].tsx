import DashboardLayout from "components/dashboard/DashboardLayout";
import UserListingDetailsContainer from "features/listings/userListings/UserListingDetailsContainer";
import { GetServerSideProps } from "next";
import React from "react";

type ListingInfoProps = { id: string };

export default function UserListingInfo({ id }: ListingInfoProps) {
  return (
    <DashboardLayout title="Listing Details" isLoading={false}>
      <div className="max-w-4xl rounded-md container mx-auto p-10 mt-5 bg-[#F7F7F7] min-h-[600px]">
        <UserListingDetailsContainer listingId={id} />
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const id = params?.id;
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
    props: { id: id },
  };
};
