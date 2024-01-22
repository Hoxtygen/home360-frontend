import React, { useEffect, useState } from "react";
import Arrows from "./Arrrows";
import SliderContent from "./SliderContent";

export default function Slider({ imagesUrl }: { imagesUrl: string[] }) {
  const imagesLength = imagesUrl.length - 1;
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === imagesLength ? 0 : activeIndex + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, imagesLength]);
  return (
    <div className="h-[450px] w-full relative m-auto overflow-hidden">
      <SliderContent activeIndex={activeIndex} sliderImages={imagesUrl} />
      <Arrows
        prevSlide={() =>
          setActiveIndex(activeIndex < 1 ? imagesLength : activeIndex - 1)
        }
        nextSlide={() =>
          setActiveIndex(activeIndex === imagesLength ? 0 : activeIndex + 1)
        }
      />
    </div>
  );
}
