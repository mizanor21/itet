'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import { useState } from "react";
import bg from '../../../public/assert/brandsBG.png'

const PremiumPartners = () => {
    const [imageDimensions, setImageDimensions] = useState<Record<string, ImageDimensions>>({});

    const partnerLogos = [
        {
            _id: "01",
            image: "https://i.postimg.cc/3J4WRfwM/Asset-1-4x.png",
            name: "Partner 1"
        },
        {
            _id: "02",
            image: "https://res.cloudinary.com/du04p5ikw/image/upload/v1757599796/ATG_LOGO_vpirx6.jpg",
            name: "ATG Logo"
        },
        {
            _id: "03",
            image: "https://res.cloudinary.com/du04p5ikw/image/upload/v1757601104/Generated_Image_September_11_2025_-_8_26PM_ob6wfx.png",
            name: "Generated Image 1"
        },
        {
            _id: "04",
            image: "https://res.cloudinary.com/du04p5ikw/image/upload/v1757601101/Generated_Image_September_11_2025_-_8_20PM_vpldxu.png",
            name: "Generated Image 2"
        },
        {
            _id: "05",
            image: "https://res.cloudinary.com/du04p5ikw/image/upload/v1757744555/Emmtex_Solutions_BD_ltd_Logo__page-0001_wkijcj.jpg",
            name: "Emmtex Solutions BD Ltd Logo"
        }
    ];

    // Fixed height for all images
    const FIXED_HEIGHT = 80;

    // Handle image load to calculate optimal width
    interface ImageDimensions {
        width: number;
        height: number;
        aspectRatio: number;
    }

    interface ImageLoadEvent extends React.SyntheticEvent<HTMLImageElement> {
        target: HTMLImageElement;
    }

    const handleImageLoad = (event: ImageLoadEvent, itemId: string): void => {
        const img = event.target;
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        const optimalWidth = Math.round(FIXED_HEIGHT * aspectRatio);
        
        // Set min and max width constraints
        const minWidth = 200;
        const maxWidth = 300;
        const finalWidth = Math.max(minWidth, Math.min(maxWidth, optimalWidth));

        setImageDimensions((prev: Record<string, ImageDimensions>) => ({
            ...prev,
            [itemId]: {
                width: finalWidth,
                height: FIXED_HEIGHT,
                aspectRatio
            }
        }));
    };

    // Get image style based on calculated dimensions
    interface ImageStyle {
        width: number;
        height: number;
        objectFit: 'contain';
    }

    const getImageStyle = (itemId: string): ImageStyle => {
        const dimensions = imageDimensions[itemId] as ImageDimensions | undefined;
        if (!dimensions) {
            return {
                width: 200, // Default width while loading
                height: FIXED_HEIGHT,
                objectFit: 'contain'
            };
        }
        
        return {
            width: dimensions.width,
            height: dimensions.height,
            objectFit: 'contain'
        };
    };

    return (
        <div className="mt-4 bg-gradient-to-t from-zinc-50 to-stone-50 w-full h-full"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className="flex items-center justify-between">
                <h3 className="text-md lg:text-lg font-semibold text-[#444]">
                    Our Premium <span className="text-[#C2855A]">Partners</span>
                </h3>
                <button className="text-xs md:text-sm text-[#A96928] hover:underline flex items-center gap-1 transition-colors duration-200">
                    View All <span className="text-xs">↗</span>
                </button>
            </div>
            
            <div className="overflow-hidden">
                {/* Swiper will render only when partners are available */}
                {partnerLogos?.length > 0 && (
                    <Swiper
                        
slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                        }}
                        speed={3000}
                        modules={[Autoplay]}
                        breakpoints={{
                            480: {
                                slidesPerView: 1,
                                spaceBetween: 2,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 2,
                            },
                        }}
                        className="my-1"
                    >
                        {partnerLogos?.map((item) => (
                            <SwiperSlide key={item._id} style={{ width: 'auto' }}>
                                <div className="flex items-center justify-center p-2">
                                    <div 
                                        className="relative overflow-hidden rounded-lg bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center"
                                        style={{
                                            width: getImageStyle(item._id).width + 22, // Add padding
                                            height: FIXED_HEIGHT + 20, // Add padding
                                            minWidth: 140 // Ensure minimum container width
                                        }}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name || `Partner ${item._id}`}
                                            width={getImageStyle(item._id).width}
                                            height={getImageStyle(item._id).height}
                                            style={getImageStyle(item._id)}
                                            className="transition-all px-3 duration-300 hover:scale-105 hover:opacity-90 "
                                            loading="lazy"
                                            onLoad={(e) => handleImageLoad(e as ImageLoadEvent, item._id)}
                                            onError={(e) => {
                                                // Fallback for broken images
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

                {/* Loading state */}
                {(!partnerLogos || partnerLogos.length === 0) && (
                    <div className="flex items-center justify-center h-32">
                        <div className="text-gray-500 text-sm">Loading partners...</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PremiumPartners