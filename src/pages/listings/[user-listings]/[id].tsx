import { DashboardLayout } from "components/layouts";
import UserListingDetailsContainer from "features/listings/userListings/UserListingDetailsContainer";
import { GetServerSideProps } from "next";

type ListingInfoProps = { id: string };

export default function UserListingInfo({ id }: ListingInfoProps) {
  return (
    <DashboardLayout title="Listing Details" isLoading={false}>
      <UserListingDetailsContainer listingId={id} />
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
