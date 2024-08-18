import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

import { Search } from "@/typedef";
import SearchForm from "components/landing-page/SearchForm";
import Layout from "components/layouts/Layout";
import { useDebounce } from "hooks/useDebounce";
import { useSearch } from "hooks/useSearch";
import { QueryParams } from "pages/search";
import ErrorMessage from "shared/ErrorMessage";
import { Listings } from "features/listings";

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
        <div className="max-w-4xl rounded-md container mx-auto  my-7">
          {/* {isListingSearchLoading && <SkeletonCard />} */}
          {listingSearchError && (
            <div className="border bg-red-100 py-2 px-3">
              <ErrorMessage
                error={listingSearchError.message}
                className="text-red-500"
              />
            </div>
          )}
          {listingSearchResult?.data &&
            listingSearchResult?.data.items.length > 0 && (
              <div className="p-10 border bg-[#F7F7F7]">
                <Listings
                  listings={listingSearchResult?.data.items}
                  isLoading={isListingSearchLoading}
                />
              </div>
            )}
          {listingSearchResult?.data &&
            listingSearchResult?.data.items.length <= 0 && (
              <div>
                <h1 className="font-hanken-semibold text-24 p-4">
                  No result found
                </h1>
              </div>
            )}
        </div>
      </Layout>
    </main>
  );
}
