import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { ListingType } from "@/typedef";
import SearchForm from "components/landing-page/SearchForm";
import Layout from "components/layouts/Layout";
import useLocalStorage from "hooks/useLocalStorage";
import { SearchData, useSearch } from "hooks/useSearch";
import Listings from "./Listings";
import SkeletonCard from "components/shared/SkeletonCard";

export type Search = {
  apartmentType: ListingType;
  location: string;
  price: string;
};
export default function SearchResult() {
  const { mutateSearch, listingSearchResult, isListingSearchLoading } =
    useSearch();
  const router = useRouter();

  const { city, apartmentType, price } = router.query;
  const raw = router.query;

  const [searchData, setSearchData] = useState<Search>({
    apartmentType: apartmentType as ListingType,
    location: city as string,
    price: price as string,
  });

  const [searchedListing, setSearchListing] =
    useLocalStorage<SearchData | null>("searchedListing", null);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    let value: (typeof searchData)[keyof typeof searchData] =
      event.target.value;
    setSearchData({ ...searchData, [event.target.name]: value });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutateSearch(searchData);
    router.replace(
      `/search/?city=${searchData.location}&apartmentType=${searchData.apartmentType}&price=${searchData.price}`
    );
    setSearchListing(searchData);
  }

  useEffect(() => {
    if (searchedListing !== null) {
      mutateSearch(searchedListing);
    }
  }, [mutateSearch, raw, searchedListing]);

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
                <h1>No result found</h1>
              </div>
            )}
        </div>
      </Layout>
    </main>
  );
}
