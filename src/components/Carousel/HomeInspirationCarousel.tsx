import { homeInspirationData } from "src/constants";
import HouseCard from "../HouseCard";
import Carousel from "./Carousel";

export default function HomeInspirationCarousel() {
  return (
    <div>
      <Carousel
        items={homeInspirationData}
        title="Inspiration"
        subtitle="Houses in Abuja"
        renderItems={(homeInspirationData) => (
          <HouseCard data={homeInspirationData} />
        )}
      />
    </div>
  );
}
