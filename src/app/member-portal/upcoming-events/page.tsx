'use client'

import { EventsData } from '@/types/homeDataTypes'
import React from 'react'
import { CiCalendarDate, CiLocationOn } from 'react-icons/ci'
import { IoTimeOutline } from 'react-icons/io5'
import { MdOutlineEventAvailable } from 'react-icons/md'
import { TiArrowForward } from 'react-icons/ti'

const page = () => {
    const events: EventsData[] = [
        {
            _id: "2",
            title: "Innovation in Textile Technology",
            date: "10 May 2025",
            time: "9.00 AM to 5.00 PM",
            batch: "2023 Batch",
            location: "ITET, Dhaka",
        },
        {
            _id: "3",
            title: "Sustainable Fashion Conference",
            date: "5 May 2025",
            time: "9.00 AM to 5.00 PM",
            batch: "All Batch",
            location: "ITET, Dhaka",
        },
        {
            _id: "4",
            title: "Textile Design Workshop",
            date: "28 April 2025",
            time: "10.00 AM to 4.00 PM",
            batch: "2024 Batch",
            location: "ITET, Dhaka",
        },
        {
            _id: "5",
            title: "Career Fair for Graduates",
            date: "15 April 2025",
            time: "9.30 AM to 3.30 PM",
            batch: "Final Year",
            location: "ITET, Dhaka",
        },
        {
            _id: "6",
            title: "Alumni Meetup",
            date: "12 April 2025",
            time: "11.00 AM to 2.00 PM",
            batch: "All Alumni",
            location: "ITET Campus",
        }
    ];

    return (
        <div className="pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events?.map((event) => (
                    <div
                        key={event._id}
                        className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-grsay-100 to-stone-100  shadow-xs p-5 text-gray-800 rounded-t-2xl">

                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold leading-snug line-clamp-2">{event.title}</h3>
                                    <span className="inline-block mt-2 px-3 py-1 bg-sky-50 text-sky-500 rounded-full text-xs font-medium">
                                        {event.batch}
                                    </span>
                                </div>
                                <MdOutlineEventAvailable className="text-2xl opacity-80" />
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-5 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-indigo-100 p-2 rounded-full">
                                    <CiCalendarDate className="text-indigo-600 text-xl" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Date</p>
                                    <p className="text-sm font-medium text-gray-800">{event.date}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="bg-purple-100 p-2 rounded-full">
                                    <IoTimeOutline className="text-purple-600 text-xl" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Time</p>
                                    <p className="text-sm font-medium text-gray-800">{event.time}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="bg-emerald-100 p-2 rounded-full">
                                    <CiLocationOn className="text-emerald-600 text-xl" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Location</p>
                                    <p className="text-sm font-medium text-gray-800">{event.location}</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-5 pb-5">
                            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition-all duration-200 border border-gray-200 group-hover:border-indigo-300 cursor-pointer">
                                Booked Now
                                <TiArrowForward className="transition-transform duration-200 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page;
