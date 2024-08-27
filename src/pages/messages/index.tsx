import DashboardLayout from "components/layouts/dashboard/DashboardLayout";
import { EnquiryMessages } from "features/messages";
import { GetServerSideProps } from "next";

export default function Messages() {
  return (
    <DashboardLayout title="Messages" isLoading={false}>
      <EnquiryMessages />
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
