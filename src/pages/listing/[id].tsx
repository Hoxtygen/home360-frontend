import React from "react";
import { GetServerSideProps } from "next";

import Layout from "components/layouts/Layout";
import ListingDetailContainer from "features/listings/listingDetails/ListingDetailContainer";

type ListingInfoProps = { id: string };

export default function ListingInfo({ id }: ListingInfoProps) {
  return (
    <Layout>
      <div className="max-w-4xl rounded-md container mx-auto p-10 mt-5 bg-[#F7F7F7] min-h-[600px]">
        <ListingDetailContainer listingId={id} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  return {
    props: { id: id },
  };
};
