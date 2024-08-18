import React, { ReactNode, useState } from "react";

interface CarouselProps<T> {
  carouselItems: T[];
  autoPlayInterval?: number;
  numOfItemsToShow: number;
  title?: string;
  subtitle?: string;
  renderItem: (item: T) => ReactNode;
}
export default function GenericCarousel<T extends unknown>({
  carouselItems,
  numOfItemsToShow,
  renderItem,
  autoPlayInterval = 3000,
  title,
  subtitle,
}: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselItemsLen = carouselItems.length;

  const totalPages = Math.ceil(carouselItemsLen / numOfItemsToShow);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : totalPages - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < totalPages - 1 ? prevIndex + 1 : 0
    );
  };
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="my-12 mx-auto max-w-5xl">
        <div className="py-5">
          <h2 className="text-center text-[32px]">{title}</h2>
          <p className="text-center text-xl">{subtitle}</p>
        </div>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${
                (currentIndex * 100) / numOfItemsToShow
              }%)`,
            }}
          >
            {carouselItems.map((carouselItem, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-[${100 / numOfItemsToShow}%] p-2`}
                style={{ flex: `0 0 ${100 / numOfItemsToShow}%` }}
              >
                <>{renderItem(carouselItem)}</>
              </div>
            ))}
          </div>
          <button
            onClick={handlePrevious}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded z-10"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded z-10"
          >
            Next
          </button>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-5 h-5 rounded-full ${
                  index === currentIndex ? "bg-gray-800" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
