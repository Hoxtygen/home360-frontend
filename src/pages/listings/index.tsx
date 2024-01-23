import DashboardLayout from "components/dashboard/DashboardLayout";
import UserListings from "features/listings/userListings/UserListings";
import { GetServerSideProps } from "next";

export default function AgentListings() {
  return (
    <DashboardLayout title="Listings" isLoading={false}>
      <UserListings />
    </DashboardLayout>
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
