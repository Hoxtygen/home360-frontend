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
    dots: true,
  };
  return (
    <Slider {...slickSettings} infinite>
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
          // sizes="100vw"
          style={{ height: "400px", margin: "0 auto", objectFit: "cover" }}
        />
      ))}
    </Slider>
  );
}
