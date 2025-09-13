import { EventsData } from '@/types/homeDataTypes'
import Link from 'next/link'
import React from 'react'
import { CiCalendarDate, CiLocationOn } from 'react-icons/ci'
import { IoTimeOutline } from 'react-icons/io5'
import { MdOutlineEventAvailable } from 'react-icons/md'
import { TiArrowForward } from 'react-icons/ti'

const Events = () => {

    const events: EventsData[] = [
        {
            _id: "1",
            title: "ITET - BUTEX Career Fair 2025",
            date: "17 September 2025",
            time: "9.00 AM - 6.00 PM",
            batch: "Open for All",
            location: "BUTEX, Dhaka",
        },
        {
            _id: "2",
            title: "Textile Machinery Exhibition",
            date: "19 September 2025",
            time: "9.00 AM - 6.00 PM",
            batch: "Open for All",
            location: "BUTEX, Dhaka",
        },
        {
            _id: "3",
            title: "Eksoy-ITET Football Tournament 2025",
            date: "Comming Soon",
            time: "TBA",
            batch: "Open for All",
            location: "BUTEX, Dhaka",
        },
        {
            _id: "4",
            title: "ITET Indoor Tournament",
            date: "Comming Soon",
            time: "TBA",
            batch: "Open for All",
            location: "BUTEX, Dhaka",
        },
        {
            _id: "5",
            title: "ITET Grand Convention",
            date: "December 2025",
            time: "TBA",
            batch: "Open for All",
            location: "BUTEX, Dhaka",
        }
    ];


    return (
        <div className="bg-gradient-to-t from-[#31aec501] to-[#31aec519] p-5 rounded-md shadow">
            <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-gray-900 text-sm flex gap-1 items-center">
                    <MdOutlineEventAvailable className="text-base" />
                    <span>Upcoming Events</span>
                </h3>

                <Link
                    href='/news-events'
                    className="text-xs text-[#c98a03fa] underline hover:text-[#B07210] transition-colors">
                    View All
                </Link >
            </div>

            <div className="border border-dashed border-gray-400 my-4"></div>
            <div className="space-y-2  h-80 md:h-52 lg:h-[300px] xl:h-[350px] 2xl:min-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                {events?.map((event) => (
                    <div
                        key={event._id}
                        className="group bg-white px-5 py-3 rounded-md shadow-sm space-y-2 relative hover:shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5"
                    >
                        <div className="flex justify-between items-center text-xs text-gray-800">
                            <p className="font-semibold text-sm text-gray-800 line-clamp-1">
                                {event.title}
                            </p>
                            <span className="text-rose-500 bg-rose-100 px-1 py-0.5 rounded text-xs">
                                {event.batch}
                            </span>
                        </div>

                        <div className="grid grid-cols-3 text-xs text-gray-700 gap-1">
                            <div className="flex gap-1 items-center text-[#B07210] font-semibold">
                                <CiCalendarDate className="text-sm" />
                                <span className="truncate">{event.date}</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <IoTimeOutline className="text-sm" />
                                <span className="truncate">{event.time}</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <CiLocationOn className="text-sm" />
                                <span className="truncate">{event.location}</span>
                            </div>
                        </div>

                        {/* Enhanced arrow icon */}
                        <div className="absolute right-7 top-[70%] -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform group-hover:translate-x-0.5">
                            <TiArrowForward className="text-xl text-[#B07210] hover:text-gray-800 transition-colors duration-500" />
                        </div>

                        {/* Semi-transparent overlay */}
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-300" />
                    </div>
                ))}
            </div>

            {/* Add custom scrollbar styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #B07210;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #c98a03fa;
                }
            `}</style>
        </div>
    )
}

export default Events