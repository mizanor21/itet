'use client'

import Container from "@/component/Container/Container";
import { missionVisionData } from "@/types/aboutTypes";
import Image from "next/image";
import React from "react";

const MissionVision = () => {
    const data: missionVisionData[] = [
        {
            _id: '01',
            icon: "https://i.postimg.cc/85DFSbLs/dart-mission-goal-success-svgrepo-com-1.png",
            titleEN: "Our Mission",
            titleBN: "আমাদের  লক্ষ্য",
            themeColor: "#B07210",
            paragraphEN: "To empower textile engineers and technologists through continuous professional development, knowledge sharing, and strategic partnerships—driving innovation, sustainability, and excellence in the textile industry of Bangladesh and beyond.",
            paragraphBN: "বাংলাদেশসহ বিশ্বব্যাপী বস্ত্রশিল্পে উদ্ভাবন, টেকসই উন্নয়ন এবং উৎকর্ষ সাধনে অবদান রাখতে বস্ত্র প্রকৌশলী ও প্রযুক্তিবিদদের ধারাবাহিক পেশাগত উন্নয়ন, জ্ঞান বিনিময় এবং কৌশলগত অংশীদারিত্বের মাধ্যমে ক্ষমতায়ন করা।"
        },
        {
            _id: '02',
            icon: "https://i.postimg.cc/85DFSbLs/dart-mission-goal-success-svgrepo-com-1.png",
            titleEN: "Our Vision",
            titleBN: "আমাদের দৃষ্টিভঙ্গি",
            themeColor: "#3CB8FE",
            paragraphEN: "To be a globally recognized institution of textile professionals—leading advancements in textile engineering, shaping industry standards, and inspiring future generations through innovation, education, and ethical practice",
            paragraphBN: "টেক্সটাইল ইঞ্জিনিয়ারিং-এ অগ্রগতি সাধন, শিল্পের মানদণ্ড নির্ধারণ এবং উদ্ভাবন, শিক্ষা ও নৈতিক চর্চার মাধ্যমে ভবিষ্যৎ প্রজন্মকে অনুপ্রাণিত করে—বস্ত্র পেশাজীবীদের একটি বিশ্বব্যাপী স্বীকৃত প্রতিষ্ঠান হিসেবে প্রতিষ্ঠিত হওয়া।"
        }
    ];

    return (
        <div className="bg-gradient-to-b from-transparent to-pink-50 py-8 md:py-16">
            <Container>
                <div className="grid grid-cols-1 gap-8 md:gap-16">
                    {data?.map((item) => (
                        <div key={item._id} className="flex flex-col items-center">
                            <div className="flex flex-col md:flex-row gap-6 md:gap-14 items-center mb-6 w-full">
                                {/* Icon Container */}
                                <div
                                    className="w-20 h-20 md:w-28  lg:h-full flex items-center justify-center p-2 md:p-0"
                                    style={{ background: item.themeColor }}>
                                    <Image
                                        src={item.icon}
                                        alt="Mission vision"
                                        width={50}
                                        height={50}
                                        sizes="(max-width: 768px) 50px, 80px"
                                        loading="lazy"
                                        className="lg:w-full py-4 pl-4"
                                    />
                                </div>

                                {/* Content */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-24 py-4 md:py-8 w-full">
                                    {/* English */}
                                    <div className="space-y-2 md:space-y-3">
                                        <h3 className="text-lg md:text-xl lg:text-2xl text-gray-800 uppercase tracking-wider">
                                            {item.titleEN.split(' ')[0]}
                                        </h3>
                                        <h2
                                            className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider"
                                            style={{ color: item.themeColor }}
                                        >
                                            {item.titleEN.split(' ').slice(1).join(' ')}
                                        </h2>
                                        <p className="text-gray-700 text-sm md:text-base leading-relaxed text-justify">
                                            {item.paragraphEN}
                                        </p>
                                    </div>

                                    {/* Bangla */}
                                    <div className="space-y-2 md:space-y-3">
                                        <h3 className="text-lg md:text-xl lg:text-2xl text-gray-800 uppercase tracking-wider">
                                            {item.titleBN.split(' ')[0]}
                                        </h3>
                                        <h2
                                            className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider"
                                            style={{ color: item.themeColor }}
                                        >
                                            {item.titleBN.split(' ').slice(1).join(' ')}
                                        </h2>
                                        <p className="text-gray-700 text-sm md:text-base leading-relaxed text-justify">
                                            {item.paragraphBN}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};


export default MissionVision;