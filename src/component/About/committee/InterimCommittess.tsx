'use client'

import Container from "@/component/Container/Container";
import { CommitteMemberTypes } from "@/types/committeTypes";
import Image from "next/image";

const InterimCommittess = () => {

    const members: CommitteMemberTypes[] = [
        {
            _id: "1",
            role: "CONVENER",
            name: "Engr. Ehsanul Karim Kaiser",
            image: "https://i.ibb.co/qYMy2zrQ/844eed12487f0ce28cc867e6817da04d95de127e.png",
        },
        {
            _id: "2",
            role: "CO - CONVENER",
            name: "Engr. Md. Shamsuzzaman, CIP",
            image: "https://i.ibb.co/yc5YT8cs/7ed531ff9e28ca41cb6dff71c5dabdfcfca3e0a7.png",
        },
        {
            _id: "3",
            role: "CO - CONVENER",
            name: "Engr. A.T.M Shamsu Uddin Khan",
            image: "https://i.ibb.co/1tnD21LZ/8036b8490c9231a4b01ff7c51120ebd5b8571951.png",

        },
        {
            _id: "4",
            role: "MEMBER SECRETARY",
            name: "Engr. Md. Enayet Hossain",
            image: "https://i.ibb.co/9kNYGLgT/e7ed2684ac34be3acf3a72e8a178de1f32bfab1f.png",
        },
        {
            _id: "5",
            role: "MEMBER",
            name: "Engr. Md. Sayedur Rahman",
            image: "https://i.ibb.co/93qHY6hR/27dedd5b3b77c3254117fb3e7719bf1298d5231a.png",
        },
        {
            _id: "6",
            role: "MEMBER",
            name: "Engr. A.B.M Sirajul Islam",
            image: "https://i.ibb.co/VpSH7V8R/4dd8aea966621abe012602b696427eec713aa45d.png",
        },
        {
            _id: "7",
            role: "MEMBER",
            name: "Engr. A.K.M Mohsin Ahmed",
            image: "https://res.cloudinary.com/du04p5ikw/image/upload/v1757612373/Mohsin_l44loc.jpg",
        },
        {
            _id: "8",
            role: "MEMBER",
            name: "Engr. Md. Sumayel Mallik",
            image: "https://i.ibb.co/99qz1qWm/45dc7e7880a8979256333964e8835b9da183f791.png",
        },
        {
            _id: "9",
            role: "MEMBER",
            name: "Engr. A.S.M Hafizur Rahman Nixon",
            image: "https://i.ibb.co/60hpnH1B/8601ae664e83b9f73d910ad5c98776b0446bf5c3.png",
        },
        {
            _id: "10",
            role: "MEMBER",
            name: "Engr. Md. Saiful Islam Shahin",
            image: "https://i.ibb.co/9H4FhRJD/36dab0bb6cbadcda112a880dcd7934474a72672c.png",
            
        },
        {
            _id: "11",
            role: "MEMBER",
            name: "Engr. Muhammad Abu Hossen Hitlu",
            image: "https://i.ibb.co/6cfxhSCG/b8eaf77dd2633e90f80e1733e16dd5be1d232ee4.png"
         
        },
        {
            _id: "12",
            role: "MEMBER",
            name: "Engr. Md. Khaledul Islam Mithun",

            image: "https://i.ibb.co/Df55vKxb/bc51a055b27431dac249cd7792758dec7682a840.png",
        },
        {
            _id: "13",
            role: "MEMBER",
            name: "Engr. Miah Md. Mynul Islam Palash",
            image: "https://i.ibb.co/Mx1nD8jW/19bc6484c82e962ea7635a55a1bebf32245bbf37.png",
        },
    ];

    return (
        <div>
            <Container>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-l-4 border-sky-500 pl-4 mb-8">
                    Interim Convening Committee - ITET
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
                    {members?.map((member) => (
                        <div
                            key={member._id}
                            className="group relative rounded p-2 bg-gradient-to-b from-sky-300 to-sky-100 hover:shadow-lg transition-all duration-300 shadow "
                        >
                            {/* Card Content */}
                            <div className="h-full bg-white rounded-lg overflow-hidden ">
                                {/* Image Container - Fixed Height */}
                                <div className="relative aspect-square w-full flex items-center justify-center ">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={300}
                                        height={300}
                                        quality={100}
                                        //  object-contain max-w-[95%] max-h-[100%]
                                        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                                        priority={false}
                                    />
                                </div>

                                {/* Text Container - Always at bottom */}
                                <div className="p-4 bg-gradient-to-b from-sky-50 to-sky-100 mt-auto h-full">
                                    <span className="block text-md font-medium text-amber-600 tracking-wider mb-1">
                                        {member.role}
                                    </span>
                                    <h3 className="text-lg font-medium text-gray-800">
                                        {member.name}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};


export default InterimCommittess;