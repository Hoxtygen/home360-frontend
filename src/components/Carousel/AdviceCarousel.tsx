import { advice } from "constants/staticData";
import AdviceCard from "../landing-page/AdviceCard";
import Carousel from "./Carousel";

export default function AdviceCarousel() {
  return (
    <div>
      <Carousel
        items={advice}
        title="Advice and Tips"
        subtitle="checklists,templates, and much more"
        renderItems={(advice) => <AdviceCard data={advice} />}
      />
    </div>
  );
}
