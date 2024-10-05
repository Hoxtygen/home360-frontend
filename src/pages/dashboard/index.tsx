import { GetServerSideProps } from "next";
import Dashboard from "features/dashboard/Dashboard";

export default function dashboard() {
  return (
    <>
      <Dashboard />
    </>
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
