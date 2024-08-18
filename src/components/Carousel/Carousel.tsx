/* eslint-disable @next/next/no-img-element */
// components/Carousel.tsx

import React, { useEffect, useState } from "react";

interface CarouselProps {
  images: string[];
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlayInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const numImages = images.length;
  const numVisible = 3; // Number of images shown at once
  const imageHeight = "h-64"; // Set your desired height here, e.g., h-64 for 16rem

  const totalPages = Math.ceil(numImages / numVisible);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < totalPages - 1 ? prevIndex + 1 : 0
      );
    }, autoPlayInterval);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [autoPlayInterval, totalPages]);

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

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${(currentIndex * 100) / numVisible}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex-none ${imageHeight} w-1/${numVisible} border border-red-500`}
          >
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
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
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
