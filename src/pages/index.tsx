import styles from "../styles/Home.module.css";
import SearchForm from "../components/SearchForm";
import AdBanner from "../components/AdBanner";
import PropertyAssessment from "../components/PropertyAssessment";
import {
  AdviceCarousel,
  HomeInspirationCarousel,
} from "../components/Carousel";
import Layout from "components/layouts/Layout";

export default function Home() {
  return (
    <main className={styles.main}>
      <Layout>
        <SearchForm />
        <AdBanner />
        <PropertyAssessment />
        <HomeInspirationCarousel />
        <AdviceCarousel />
      </Layout>
    </main>
  );
}
