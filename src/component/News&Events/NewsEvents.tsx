"use client";

import { Calendar, Clock, MapPin } from "lucide-react";

// const events = [
//     {
//         id: 1,
//         date: "10 May 2025",
//         time: "9.00 AM to 5.00 PM",
//         title: "ITET - BUTEX Career Fair 2025",
//         location: "ITET, Dhaka",
//         batch: "Open for All",
//         image:
//             "https://res.cloudinary.com/du04p5ikw/image/upload/v1757616453/event_yexac8.jpg",

            
//     },
//     {
//         id: 2,
//         date: "10 May 2025",
//         time: "9.00 AM to 5.00 PM",
//         title: "Bridging Cultures: Global Perspectives in",
//         location: "ITET, Dhaka",
//         batch: "Open for All",
//         image:
//             "https://res.cloudinary.com/du04p5ikw/image/upload/v1757616453/event_yexac8.jpg",
//     },
//     {
//         id: 3,
//         date: "Comming Soon",
//         time: "TBA",
//         title: "Eksoy-ITET Football Tournament 2025",
//         location: "ITET, Dhaka",
//         batch: "Open for All",
//         image:
//             "https://res.cloudinary.com/du04p5ikw/image/upload/v1757697281/WhatsApp_Image_2025-09-12_at_8.44.56_PM_fp1jff.jpg",
//     },
// ];

const events = [
        {
            id: "1",
            title: "ITET - BUTEX Career Fair 2025",
            date: "17 September 2025",
            time: "9.00 AM - 6.00 PM",
            batch: "Open for All",
            location: "BUTEX, Dhaka",
            image:
            "https://res.cloudinary.com/du04p5ikw/image/upload/v1757744688/file_2025-09-13_06.18.57_ucxa03.png",
        },
        {
            id: "2",
            title: "Textile Machinery Exhibition",
            date: "19 September 2025",
            time: "9.00 AM - 6.00 PM",
            batch: "Open for All",
            location: "BUTEX, Dhaka",
            image:
            "https://res.cloudinary.com/du04p5ikw/image/upload/v1757616453/event_yexac8.jpg",
        },
        {
            id: "3",
            title: "Eksoy-ITET Football Tournament 2025",
            date: "Comming Soon",
            time: "TBA",
            batch: "Open for All",
            location: "BUTEX, Dhaka",
            image:
            "https://res.cloudinary.com/du04p5ikw/image/upload/v1757697281/WhatsApp_Image_2025-09-12_at_8.44.56_PM_fp1jff.jpg",
        },
        {
            id: "4",
            title: "ITET Indoor Tournament",
            date: "Comming Soon",
            time: "TBA",
            batch: "Open for All",
            location: "BUTEX, Dhaka",
            image:
            "https://res.cloudinary.com/du04p5ikw/image/upload/v1757697321/WhatsApp_Image_2025-09-12_at_3.12.52_PM_dewrrt.jpg",
        },
        {
            id: "5",
            title: "ITET Grand Convention",
            date: "December 2025",
            time: "TBA",
            batch: "Open for All",
            location: "BUTEX, Dhaka",
            image:
            "https://res.cloudinary.com/du04p5ikw/image/upload/v1757697321/WhatsApp_Image_2025-09-12_at_3.12.52_PM_dewrrt.jpg",
        }
    ]

const NewsEvents = () => {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row items-center gap-3 bg-white shadow-md rounded-lg p-4 mb-8">
                <input
                    type="text"
                    placeholder="Find your next event"
                    className="w-full md:flex-1 px-4 py-2 border rounded-lg outline-none"
                />
                <select className="px-4 py-2 border rounded-lg outline-none">
                    <option>Event Location</option>
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                </select>
                <select className="px-4 py-2 border rounded-lg outline-none">
                    <option>Select Batch</option>
                    <option>Batch 1</option>
                    <option>Batch 2</option>
                </select>
                <button className="bg-gradient-to-r from-[#FFD086] to-[#E88E00] text-white px-4 py-2 rounded-lg">
                    Search
                </button>
            </div>

            {/* Event Cards */}
            <div className="space-y-6">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="flex flex-col md:flex-row bg-[#fdfaf7] rounded-lg shadow-sm overflow-hidden"
                    >
                        {/* Image */}
                        <div className="w-full md:w-1/3">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-64 md:h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col md:flex-row justify-between w-full p-6">
                            <div>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                    <span className="flex items-center gap-2">
                                        <Calendar size={16} className="text-orange-500" />
                                        {event.date}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Clock size={16} className="text-orange-500" />
                                        {event.time}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                    <MapPin size={16} className="text-orange-500" />
                                    {event.location}
                                </div>
                                <span className="inline-block mt-2 text-sm bg-red-100 text-red-500 px-3 py-1 rounded-md">
                                    {event.batch}
                                </span>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col items-start md:items-end justify-center gap-2 mt-4 md:mt-0 md:ml-6 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
                                <button className="bg-gradient-to-r from-[#FFD086] to-[#E88E00] text-white px-6 py-2 rounded-sm">
                                    Confirm Your Attendance
                                </button>
                                <button className="bg-white border border-gray-300 px-20 py-2 rounded-md text-gray-700 font-medium">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsEvents;
