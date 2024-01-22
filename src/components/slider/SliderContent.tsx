import Image from "next/image";
import React from "react";

type sliderImageProps = {
  sliderImages: string[];
  activeIndex: number;
};

export default function SliderContent({
  sliderImages,
  activeIndex,
}: sliderImageProps) {
  return (
    <section className="w-full">
      {sliderImages.map((slide, index) => (
        <div
          key={index}
          className={
            index === activeIndex
              ? "h-[450px] w-auto relative inline-block"
              : "hidden"
          }
        >
          <div className=" w-full h-[100%]">
            <Image
              src={slide}
              alt=""
              className="h-full w-full"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
