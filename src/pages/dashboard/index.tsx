import { DashboardLayout } from "components/layouts";
import { GetServerSideProps } from "next";
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
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
