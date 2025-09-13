'use client'

import Container from "@/component/Container/Container";
import { AlumniData } from "@/types/homeDataTypes";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";


const alumniList: AlumniData[] = [
    {
        _id: "01",
        name: "Full Name",
        designation: "Textile Engineer",
        message: "To be filled",
        image: "https://res.cloudinary.com/du04p5ikw/image/upload/v1757588187/avatar_shqv0v.avif",
        facebook: "#",
        instagram: "#",
        linkedIn: "#"

    },
    {
        _id: "02",
        name: "Full Name",
        designation: "Textile Engineer",
        message: "To be filled",
        image: "https://res.cloudinary.com/du04p5ikw/image/upload/v1757588187/avatar_shqv0v.avif",
        facebook: "#",
        instagram: "#",
        linkedIn: "#"

    },
    {
        _id: "03",
        name: "Full Name",
        designation: "Textile Engineer",
        message: "To be filled",
        image: "https://res.cloudinary.com/du04p5ikw/image/upload/v1757588187/avatar_shqv0v.avif",
        facebook: "#",
        instagram: "#",
        linkedIn: "#"

    },
    {
        _id: "04",
        name: "Full Name",
        designation: "Textile Engineer",
        message: "To be filled",
        image: "https://res.cloudinary.com/du04p5ikw/image/upload/v1757588187/avatar_shqv0v.avif",
        facebook: "#",
        instagram: "#",
        linkedIn: "#"

    }

];

export default function Alumni() {
    return (
        <section className=" py-16 lg:py-20 bg-gradient-to-b from-[#FFF0F3] to-transparent">
            <Container>
                {/* Header */}
                <div className=" bg-[#ffe2ec] p-5 rounded flex items-center justify-between mb-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-800">
                        MEET OUR PROUD ALUMNI
                    </h2>
                    <a
                        href="#"
                        className="text-sm sm:text-base text-[#A94C4C] underline font-medium"
                    >
                        View All
                    </a>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-4 gap-8 ">
                    {alumniList.map((alumnus, index) => (
                        <div
                            key={index}
                            className="bg-yellow-300/10 border border-dashed border-[#B07210] overflow-hidden flex flex-col transition"
                        >
                            <div className="p-3">
                                {/* Image */}
                                <div className="w-full h-[200px] relative">
                                    <Image
                                        src={alumnus.image}
                                        alt={alumnus.name}
                                        fill
                                        className="object-cover hover:scale-105 transition-all duration-1000"
                                    />
                                </div>

                                {/* Content */}
                                <div className=" flex flex-col flex-grow text-center space-y-2 mt-2">
                                    <h3 className="text-2xl font-bold text-[#B07210]">
                                        {alumnus.name}
                                    </h3>
                                    <p className="text-sm font-medium text-gray-600">
                                        {alumnus.designation}
                                    </p>
                                    <div className="flex gap-3 justify-center px-7 items-center">
                                        <span className="h-0.5 bg-rose-600 w-full"></span>
                                        <span className="w-6 h-3 rounded-full bg-rose-600"></span>
                                        <span className="h-0.5 w-full bg-rose-600"></span>
                                    </div>
                                    <div className="bg-[#FFFFFF50] border border-[#40404033] py-2 px-2 rounded-lg">
                                        <h4 className="text-xm font-semibold text-gray-700">Message</h4>
                                        <p className="text-xs text-gray-600">{alumnus.message}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Footer */}
                            <div className="flex w-full h-10">
                                <Link
                                    href={alumnus.facebook}
                                    // target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#fc1313] w-full flex items-center justify-center hover:w-[160%] transition-all duration-700 ease-in-out "
                                >
                                    <FaFacebookF className="text-2xl text-white hover:scale-05 transition-transform duration-500" />
                                </Link>
                                <Link
                                    href={alumnus.instagram}
                                    // target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#FE5B5C] w-full flex items-center justify-center hover:w-[160%] transition-all duration-700 ease-in-out "
                                >
                                    <FaInstagram className="text-2xl text-white hover:scale-05 transition-transform duration-500" />
                                </Link>
                                <Link
                                    href={alumnus.linkedIn}
                                    // target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#fd8686] w-full flex items-center justify-center hover:w-[160%] transition-all duration-700 ease-in-out "
                                >
                                    <FaLinkedinIn className="text-2xl text-white hover:scale-05 transition-transform duration-500" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
