'use client'

import { useEffect, useState } from 'react';
import Container from '@/component/Container/Container';

interface TimelineItem {
    _id: string;
    year: string;
    description: string;
}

const Timeline = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);

    useEffect(() => {
        const fetchTimelineData = async () => {
            try {
                // Simulate API call with actual Bengali data
                await new Promise(resolve => setTimeout(resolve, 500));
                setTimelineData([
                    {
                        _id: "01",
                        year: "১৯৮৩",
                        description: "প্রতিষ্ঠার সিদ্ধান্ত গৃহীত"
                    },
                    {
                        _id: "02",
                        year: "১৯৮৩",
                        description: "উপদেষ্টা বোর্ড এবং প্রস্তুতিমূলক কমিটি গঠন"
                    },
                    {
                        _id: "03",
                        year: "১৯৮৪",
                        description: "খসড়া সংবিধান উপস্থাপন করা হয়েছে, সংশোধনীর প্রস্তাব করা হয়েছে।"
                    },
                    {
                        _id: "04",
                        year: "১৯৮৪",
                        description: "চূড়ান্ত সংবিধান গৃহীত এবং সমিতি নিবন্ধন আইনের অধীনে আনুষ্ঠানিকভাবে নিবন্ধিত সংগঠন।"
                    },
                    {
                        _id: "05",
                        year: "১৯৮৪",
                        description: "সংগঠনটি আনুষ্ঠানিকভাবে সোসাইটিজ রেজিস্ট্রেশন আইন (১৯৬০ সালের আইন নং XXI) এর অধীনে নিবন্ধিত হয়েছিল"
                    }

                ]);
            } catch (error) {
                console.error("Failed to fetch timeline data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTimelineData();
    }, []);

    return (
        <section className="py-24 bg-white" aria-label="ITET Timeline">
            <Container>
                <div className="md:flex md:items-start md:justify-between gap-8 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-0 md:w-1/2 font-bangla">
                        আইটিইটি-র বিবর্তনের সময়রেখা<br />
                        -১৯৮৩ সাল থেকে
                    </h2>
                    <p className="md:w-1/2 text-gray-600 text-lg font-bangla">
                        ১৫ আগস্ট ১৯৮৩ সালে "দ্য ইনস্টিটিউশন অব টেক্সটাইল ইঞ্জিনিয়ার্স এন্ড টেকনোলজিস্টস, বাংলাদেশ" প্রতিষ্ঠার সিদ্ধান্ত গৃহীত হয় এবং ১৭ আগস্ট ১৯৮৪ সালে গঠনতন্ত্র চূড়ান্ত করে সংগঠনটি আনুষ্ঠানিকভাবে নিবন্ধিত হয়। ওই তারিখ থেকে গঠনতন্ত্র কার্যকর হয়।
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-16" aria-live="polite">
                        <div className="w-12 h-12 border-4 border-[#B07210] rounded-full border-t-transparent animate-spin" />
                    </div>
                ) : timelineData.length > 0 ? (
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-0 right-0 top-[52px] h-0.5 bg-[#B07210]" />

                        <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pt-10">
                            {timelineData?.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex flex-col items-center">
                                    <div className="relative">
                                        <div className="w-6 h-6 bg-white border-2  border-[#B07210] rounded-full"/>
                                    </div>
                                    <div className="w-0.5 h-10 bg-[#B07210] mb-10"></div>
                                    <h3 className="text-3xl lg:text-5xl font-bold text-[#B07210] font-bangla">
                                        {item.year}
                                    </h3>
                                    <p className="text-sm text-center text-gray-700 mt-2 font-bangla">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-600">Loading</p>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default Timeline;