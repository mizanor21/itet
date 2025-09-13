"use client";

import Container from "@/component/Container/Container";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Items } from "@/types/homeDataTypes";

import Image from "next/image";


const items: Items[] = [
    {
        _id: "01",
        title: "Recognizing Industry Excellence",
        description: "We are committed to recognize and honor the valuable contributions of individuals within our community who have significant impact in textile and RMG industry.",
        icon: "https://i.postimg.cc/q7W37fLh/Container-3.png",
        bg: "bg-stone-100",
        dot: "bg-yellow-500",
        text: "text-yellow-600",
        position: "top",
    },
    {
        _id: "02",
        title: "Support Current Students",
        description: "We facilitate interactive sessions with industry experts and provide access to market intelligence to help students remain updated and to make them fit for industry. ",
        icon: "https://i.postimg.cc/DzSGFfq3/Container-4.png",
        bg: "bg-blue-50",
        dot: "bg-blue-500",
        text: "text-blue-600",
        position: "bottom",
    },
    {
        _id: "03",
        title: "Assist Our Alumni",
        description: "We stand beside our alumni during their times of need, offering guidance, support, and professional networking opportunities.",
        icon: "https://i.postimg.cc/k48t6j1j/Container-5.png",
        bg: "bg-pink-100",
        dot: "bg-pink-500",
        text: "text-pink-600",
        position: "top",
    },
    {
        _id: "04",
        title: "Strengthen Our Community",
        description: "We aim to foster a vibrant, supportive community built on knowledge sharing, mutual respect, and collective growth.",
        icon: "https://i.postimg.cc/nrJ9vvNn/Container-6.png",
        bg: "bg-cyan-100",
        dot: "bg-cyan-500",
        text: "text-cyan-600",
        position: "bottom",
    },
];

const OurResponsibility = () => {

    const { width } = useWindowSize();
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isLg = width >= 1024 && width < 1280;
    const isXl = width >= 1280 && width < 1536;
    const is2Xl = width >= 1536;

    const getCardWidth = () => {
        if (isMobile) return "w-full";
        if (isTablet) return "w-[45%]";
        if (isLg) return "w-48";
        if (isXl) return "w-60";
        return "w-68";
    };

    const getVerticalOffset = (position: string) => {
        if (isMobile) return "";
        if (position === "bottom") {
            if (isTablet) return "mt-16";
            return "mt-24 lg:mt-32";
        }
        return "";
    };

    return (
        <section className=" bg-white relative overflow-visible py-16">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-800 mb-3 text-center py-8">
                Our Responsibility
            </h2>

            <Container>
                <div className={`flex flex-wrap justify-center items-start gap-4 sm:gap-6 md:gap-8 relative z-10 `}>
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className={`relative ${getCardWidth()} p-4 sm:p-6 rounded-tl-4xl rounded-tr-4xl rounded-br-4xl rounded-bl-none 
                ${item.bg} z-10 flex flex-col justify-between min-h-[220px] md:min-h-[250px]
                ${getVerticalOffset(item.position)}`}
                        >
                            {/* Number Indicator */}
                            <div
                                className={`absolute ${isMobile ? "-bottom-4" : item.position === "top" ? "-bottom-4" : "-top-4"} 
                  left-1/2 transform -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 ${item.dot} 
                  rounded-full text-white text-xs sm:text-sm font-bold flex items-center justify-center 
                  shadow-md z-20 border-4 sm:border-[6px] border-white`}
                            >
                                {item._id}
                            </div>

                            <div className="flex justify-start mb-3 sm:mb-4 mt-1 sm:mt-2 md:mt-4">
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={40}
                                    height={40}
                                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
                                />
                            </div>

                            <h3 className={`font-semibold ${item.text} text-sm sm:text-base mb-1 sm:mb-2`}>
                                {item.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>

            {/* Dotted Arrows - Hidden on mobile */}
            {!isMobile && (
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {/* From 1 to 2 */}
                    <img
                        src="https://i.ibb.co/Kj7752Jh/how-work-box-arrow-1-svg-fill.png"
                        className={`absolute left-[24%] ${isTablet ? "top-[20%]" : "top-[550px]"} 
              hidden md:block ${isLg ? "scale-90" : isXl ? "scale-100" : "scale-110"}`}
                        alt="arrow 1"
                    />

                    {/* From 2 to 3 */}
                    <img
                        src="https://i.ibb.co/2fGrgg6/how-work-box-arrow-2-svg-fill.png"
                        className={`absolute left-[40%] ${isTablet ? "top-[120px]" : "top-[175px]"} 
              hidden md:block ${isLg ? "scale-90" : isXl ? "scale-100" : "scale-110"}`}
                        alt="arrow 2"
                    />

                    {/* From 3 to 4 */}
                    <img
                        src="https://i.ibb.co/qYj1nJw1/how-work-box-arrow-1-svg-fill-1.png"

                        className={`absolute left-[60%] ${isTablet ? "top-[300px]" : "top-[500px]"} 
              hidden md:block ${isLg ? "scale-90" : isXl ? "scale-100" : "scale-110"}`}
                        alt="arrow 3"
                    />
                </div>
            )}
        </section>
    );
};

export default OurResponsibility;