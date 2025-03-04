import Layout from "components/layouts/Layout";
import ListingDetailContainer from "features/listings/listingDetails/ListingDetailContainer";
import { GetServerSideProps } from "next";
import React from "react";

export default function ListingDetail({ listingId }: { listingId: string }) {
  return (
    <Layout>
      <div className="max-w-6xl rounded-md container mx-auto p-10 mt-5 min-h-[600px]">
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
