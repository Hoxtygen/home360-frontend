import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";

import Layout from "components/layouts/Layout";
import { useDebounce } from "hooks/useDebounce";
import { useSearch } from "hooks/useSearch";
import { AdviceCarousel, HomeInspirationCarousel } from "components/Carousel";
import AdBanner from "../components/landing-page/AdBanner";
import PropertyAssessment from "../components/landing-page/PropertyAssessment";
import SearchForm from "components/landing-page/SearchForm";
import { Search } from "@/typedef";

export default function Home() {
  const router = useRouter();
  const [searchData, setSearchData] = useState<Search>({
    apartmentType: "",
    location: "",
    price: "",
  });

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    let value: (typeof searchData)[keyof typeof searchData] =
      event.target.value;
    setSearchData({ ...searchData, [event.target.name]: value });
  }

  const { refetchSearchResult } = useSearch(useDebounce(searchData, 2000));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    refetchSearchResult();
    router.push(
      `/search/?city=${searchData.location}&apartmentType=${searchData.apartmentType}&price=${searchData.price}`
    );
  }
  return (
    <main className="font-hanken-regular">
      <Layout>
        <SearchForm
          searchData={searchData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <AdBanner />
        <PropertyAssessment />
        <HomeInspirationCarousel />
        <AdviceCarousel />
      </Layout>
    </main>
  );
}
