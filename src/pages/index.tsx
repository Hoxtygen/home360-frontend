import Layout from "components/layouts/Layout";
import { Search } from "components/searchResult/SearchResult";
import { useDebounce } from "hooks/useDebounce";
import { useSearch } from "hooks/useSearch";
import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";
import {
  AdviceCarousel,
  HomeInspirationCarousel,
} from "../components/Carousel";
import AdBanner from "../components/landing-page/AdBanner";
import PropertyAssessment from "../components/landing-page/PropertyAssessment";
import SearchForm from "../components/landing-page/SearchForm";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const [searchData, setSearchData] = useState<Search>({
    apartmentType: "not-specified",
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
    <main className={styles.main}>
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
