import React, { useState } from "react";
import { carouselData } from "../data/CarouselData";

const MAX_VISIBLE_SLIDES = 9;

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter to include only the first 9 items
  const visibleData = carouselData.slice(0, MAX_VISIBLE_SLIDES);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? visibleData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === visibleData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full py-10 px-4 sm:px-6 overflow-hidden">
      {/* Carousel Container */}
      <div className="flex transition-transform duration-500 ease-in-out">
        {visibleData.map((item, index) => (
          <div
            key={item.id}
            className={`min-w-[80%] sm:min-w-[45%] md:min-w-[30%] transition-transform ${
              index === currentIndex ? "opacity-100 scale-100" : "opacity-50 scale-90"
            }`}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            <div className="mx-2 rounded-lg overflow-hidden bg-white">
              <img
                src={item.image || "/images/fallback.jpg"}
                alt={item.title || "Carousel image"}
                className="w-full h-full object-scale-down"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.locations} locations</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        aria-label="Previous Slide"
      >
        &#10094;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        aria-label="Next Slide"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
