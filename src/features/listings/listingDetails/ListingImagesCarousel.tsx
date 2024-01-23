import React from "react";
import Image from "next/image";

import Slider from "react-slick";

type ListingImagesCarouselProps = {
  imagesUrl: string[];
};

export default function ListingImagesCarousel({
  imagesUrl,
}: ListingImagesCarouselProps) {
  const slickSettings = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="border border-red-600 mx-auto my-0">
      <Slider {...slickSettings}>
        {imagesUrl?.map((image, index) => (
          <Image
            key={index}
            alt="building imag"
            src={
              image ||
              `https://source.unsplash.com/random/300x200?sig=${
                Math.random() * 10
              }`
            }
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto", margin: "0 auto" }}
          />
        ))}
      </Slider>
    </div>
  );
}
