import React from "react";
import { GetServerSideProps } from "next";

import Layout from "components/layouts/Layout";
import ListingDetailContainer from "features/listings/listingDetails/ListingDetailContainer";

export default function ListingInfo({ listingId }: { listingId: string }) {
  return (
    <Layout>
      <div className="max-w-4xl rounded-md container mx-auto p-10 mt-5 bg-[#F7F7F7] min-h-[600px]">
        <ListingDetailContainer listingId={listingId} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  return {
    props: { listingId: id },
  };
};
