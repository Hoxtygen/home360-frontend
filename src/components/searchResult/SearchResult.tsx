import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { ListingType } from "@/typedef";
import SearchForm from "components/landing-page/SearchForm";
import Layout from "components/layouts/Layout";
import SkeletonCard from "components/shared/SkeletonCard";
import { useSearch } from "hooks/useSearch";
import Listings from "../../features/listings/Listings";
import { QueryParams } from "pages/search";
import { useDebounce } from "hooks/useDebounce";
import ErrorMessage from "components/shared/ErrorMessage";

export type Search = {
  apartmentType: ListingType;
  location: string;
  price: string;
};
export default function SearchResult({ searchQueryParams }: QueryParams) {
  const router = useRouter();

  const [searchData, setSearchData] = useState<Search>({
    apartmentType: searchQueryParams.apartmentType,
    location: searchQueryParams.city,
    price: searchQueryParams.price,
  });

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    let value: (typeof searchData)[keyof typeof searchData] =
      event.target.value;
    setSearchData({ ...searchData, [event.target.name]: value });
  }

  const {
    listingSearchError,
    listingSearchResult,
    isListingSearchLoading,
    refetchSearchResult,
  } = useSearch(useDebounce(searchData, 2000));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    refetchSearchResult();
    router.replace(
      `/search/?city=${searchData.location}&apartmentType=${searchData.apartmentType}&price=${searchData.price}`
    );
  }

  return (
    <main>
      <Layout>
        <SearchForm
          searchData={searchData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <div className="max-w-4xl rounded-md container mx-auto p-10 border mt-5 bg-[#F7F7F7] min-h-[600px]">
          {isListingSearchLoading && <SkeletonCard />}
          {listingSearchError && (
            <ErrorMessage error={listingSearchError.message} />
          )}
          {listingSearchResult?.data &&
            listingSearchResult?.data.items.length > 0 && (
              <Listings
                listings={listingSearchResult?.data.items}
                isLoading={isListingSearchLoading}
              />
            )}
          {listingSearchResult?.data &&
            listingSearchResult?.data.items.length <= 0 && (
              <div>
                <h1 className="font-hanken-semibold text-24">
                  No result found
                </h1>
              </div>
            )}
        </div>
      </Layout>
    </main>
  );
}
