import AuthLayout from "features/auth/AuthLayout";
import SignupForm from "features/auth/SignupForm";
import { GetServerSideProps } from "next";

export default function signup() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token;
  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
