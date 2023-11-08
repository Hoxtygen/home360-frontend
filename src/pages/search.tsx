import { ListingType } from "@/typedef";
import SearchResult from "components/searchResult/SearchResult";
import { GetServerSideProps } from "next";
import React from "react";

type SearchQueryParams = {
  city: string;
  apartmentType: ListingType;
  price: string;
};
export type QueryParams = {
  searchQueryParams: SearchQueryParams;
};

export default function search({ searchQueryParams }: QueryParams) {
  return (
    <div>
      <SearchResult searchQueryParams={searchQueryParams} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchQueryParams = query;
  return {
    props: { searchQueryParams },
  };
};
