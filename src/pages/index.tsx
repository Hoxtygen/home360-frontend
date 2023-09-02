import Layout from "components/layouts/Layout";
import {
  AdviceCarousel,
  HomeInspirationCarousel,
} from "../components/Carousel";
import AdBanner from "../components/landing-page/AdBanner";
import PropertyAssessment from "../components/landing-page/PropertyAssessment";
import SearchForm from "../components/landing-page/SearchForm";
import styles from "../styles/Home.module.css";

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
