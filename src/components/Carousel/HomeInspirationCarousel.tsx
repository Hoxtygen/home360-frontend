import GenericCarousel from "components/Carousel/GenericCarousel";
import homeInspirationData from "constant-data/homeInspData.json";
import HouseCard from "../landing-page/HouseCard";

export default function HomeInspirationCarousel() {
  return (
    <div>
      <GenericCarousel
        carouselItems={homeInspirationData}
        numOfItemsToShow={4}
        renderItem={(carouselItem) => <HouseCard data={carouselItem} />}
        title="Inspiration"
        subtitle="Houses in Abuja"
      />
    </div>
  );
}
