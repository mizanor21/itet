"use client";

import { RightSliderData } from "@/types/homeDataTypes";
import Image from "next/image";
import { useEffect, useState } from "react";

const RightSlider = () => {
  const slideImages: RightSliderData[] = [
    {
      _id: "01",
      image:
        "https://res.cloudinary.com/du04p5ikw/image/upload/v1754796951/WhatsApp_Image_2025-08-06_at_1.59.52_PM_f1kdxg.jpg",
    },
    {
      _id: "03",
      image:
        "https://res.cloudinary.com/du04p5ikw/image/upload/v1754796950/WhatsApp_Image_2025-08-06_at_1.59.23_PM_btjpur.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return; // stop interval when paused

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, slideImages.length]);

  return (
    <div
      className="relative w-full h-[500px] lg:h-full overflow-hidden rounded-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slideImages.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            alt={`Slider image ${index + 1}`}
            src={slide.image}
            fill
            quality={100}
            className="rounded-lg h-[100%]"
            priority
          />
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slideImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              currentIndex === index
                ? "bg-white w-6 scale-110"
                : "bg-white bg-opacity-50 hover:bg-opacity-70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RightSlider;