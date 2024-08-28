import React from "react";

import { DashboardLayout } from "components/layouts";
import { GetServerSideProps } from "next";
import EnquiryMessageDetail from "features/messages/EnquiryMessageDetail";

export default function EnquiryMessage({ enquiryId }: { enquiryId: string }) {
  return (
    <DashboardLayout title="Enquiry Message Details" isLoading={false}>
      <EnquiryMessageDetail enquiryId={enquiryId} />
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
    props: { enquiryId: id },
  };
};
