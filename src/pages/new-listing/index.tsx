import CreateListing from "features/listings/create-listing/CreateListing";
import { GetServerSideProps } from "next";

export default function NewListing() {
  return <CreateListing />;
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
