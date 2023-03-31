import styles from "../styles/Home.module.css";
import SearchForm from "src/components/SearchForm";
import AdBanner from "src/components/AdBanner";
import PropertyAssessment from "src/components/PropertyAssessment";
import {
  AdviceCarousel,
  HomeInspirationCarousel,
} from "src/components/Carousel";

export default function Home() {
  return (
    <main className={styles.main}>
      <SearchForm />
      <AdBanner />
      <PropertyAssessment />
      <HomeInspirationCarousel />
      <AdviceCarousel />
    </main>
  );
}
