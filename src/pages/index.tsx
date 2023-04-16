import styles from "../styles/Home.module.css";
import SearchForm from "../components/SearchForm";
import AdBanner from "../components/AdBanner";
import PropertyAssessment from "../components/PropertyAssessment";
import {
  AdviceCarousel,
  HomeInspirationCarousel,
} from "../components/Carousel";

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
