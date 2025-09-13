"use client";

import BottomBanner from "./BottomBanner";
import Events from "./Events";
import MDMessage from "./MDMessage";
import PremiumPartners from "./PremiumPartners";
import RightSlider from "./RightSlider";


const Hero = () => {
    return (
        <section className="w-full bg-gray-50 pt-2 px-4">
            {/* Left & Events Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[39%_39%_22%] w-full h-full md:space-x-5">
                {/* Motivational + MD Block (35%) */}
                <div className="space-y-3">
                    <div className="bg-gradient-to-l from-[#B0721080] to-[#FFFFFF00] px-4 py-3 rounded-lg shadow border border-[#00000033] space-y-2">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-[40px] font-bold text-[#A96928] font-manuale">
                            Stay Connected. <br /> Grow Together.
                        </h2>
                        <p className="text-xs text-gray-600">
                            Join the Textile Engineers Alumni Network & access exclusive benefits.
                            Connect, grow, and explore new opportunities with fellow professionals.
                        </p>
                    </div>
                    <div className="md:hidden">
                        <RightSlider />
                    </div>
                    <MDMessage />
                    <BottomBanner />
                    <div className="hidden md:block lg:hidden">
                        <PremiumPartners /> {/* small and large divice hidden */}
                    </div>
                </div>

                {/* Events with full height (35%) */}
                <div className="space-y-2">

                    <div className="hidden md:block lg:hidden">
                        <RightSlider /> {/* small and large divice hidden */}
                    </div>
                    <div className="hidden lg:block">
                        <Events />
                    </div>
                    <div className=" md:hidden lg:block">
                        <PremiumPartners />
                    </div>
                    <div className="lg:hidden">
                        <Events />
                    </div>
                </div>
                {/* Right Slider (30%) */}
                <div className="hidden lg:flex">
                    <RightSlider />
                </div>
            </div>
        </section>
    );
};

export default Hero;