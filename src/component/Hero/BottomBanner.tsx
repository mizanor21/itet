"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

const  BottomBanner = () => {
  const banners = [
    "https://res.cloudinary.com/du04p5ikw/image/upload/v1754797060/WhatsApp_Image_2025-08-06_at_5.22.41_PM_xmjlit.jpg",
    "https://res.cloudinary.com/du04p5ikw/image/upload/v1754797060/WhatsApp_Image_2025-08-06_at_5.22.40_PM_kvjcke.jpg"

  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full h-[250px] overflow-hidden rounded-lg">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
        >
          <Image
            src={banner}
            alt={`bottom-banner-${index}`}
            fill
            quality={100}
            className="rounded"
          />
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${currentIndex === index
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

export default BottomBanner;