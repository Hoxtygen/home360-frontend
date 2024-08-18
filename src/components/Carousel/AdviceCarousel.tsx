import React from "react";

import AdviceCard from "components/landing-page/AdviceCard";
import GenericCarousel from "./GenericCarousel";
import { advice } from "constant-data/staticData";

export default function AdviceCarousel() {
  return (
    <div>
      <GenericCarousel
        carouselItems={advice}
        numOfItemsToShow={4}
        title="Advice and Tips"
        subtitle="checklists,templates, and much more"
        renderItem={(adviceItem) => <AdviceCard data={adviceItem} />}
      />
    </div>
  );
}
