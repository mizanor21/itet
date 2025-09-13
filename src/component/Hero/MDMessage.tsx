'use client'

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";
import { ChairmanInfo } from "@/types/homeDataTypes";
import MdMessageModal from "../Modal/MdMessageModal";

// Chairman data moved outside component to prevent recreation on re-renders
const chairmanData: ChairmanInfo[] = [
    {
        _id: "01",
        image: "https://res.cloudinary.com/du04p5ikw/image/upload/v1757304403/Member_-_Engr._Ehsanul_Karim_Kaiser_m6yuyx.png",
        name: "Engr. Ehsanul Karim Kaiser",
        role: "Convenor, Interim Committee – ITET",
        tagline: "Connecting Textile Engineers, Building a Stronger Future",
        message: `Bismillahir Rahmanir Rahim
Assalamu Alaikum.

It is a proud moment to introduce the official website of the Institution of Textile Engineers & Technologists (ITET). This platform is designed to be the digital home of our members — connecting professionals, sharing knowledge, and strengthening our collective voice.

Through this website, ITET members will be able to:
- Stay informed about news, programs, and activities
- Apply for membership upgrades and access member services
- Explore job opportunities and career resources
- Learn about privileges and benefits, including healthcare and shopping discounts
- Connect with fellow members, even for social support such as blood group information in emergencies
- Participate in initiatives and contribute ideas for ITET’s future

The textile industry is facing new challenges and opportunities shaped by sustainability, digitalization, and global competition. ITET will continue to guide and support its members with professionalism, ethics, and innovation.

I encourage every textile engineer — from our senior leaders to our youngest graduates — to actively engage with this platform and with ITET. Together, we can uphold our proud legacy and build a stronger future for our profession and for Bangladesh.

My heartfelt thanks go to all who worked tirelessly to make this platform a reality.
May Allah bless our efforts and strengthen our unity.`
    },
    {
        _id: "02",
        image: "https://res.cloudinary.com/du04p5ikw/image/upload/v1757304403/MEMBER_SECRETARY_-_Engr._Md._Enayet_Hossain_lzyjcv.png",
        name: "Engr. Md. Enayet Hossain",
        role: "Member Secretary, Interim Convening Committee – ITET",
        tagline: "Reform, Modernization & Global Recognition",
        message: `It is both an honor and a profound responsibility to serve as Member Secretary of the Interim Convening Committee of ITET. Since its establishment, ITET has been the professional home of Bangladesh’s textile engineers—a platform to unite our voices, strengthen our professional identity, and contribute meaningfully to the nation’s textile and apparel sector.

Today, Bangladesh is recognized as a global leader in textiles and garments. Behind this success stand thousands of dedicated engineers whose knowledge, innovation, and perseverance continue to drive the industry forward. Yet, our profession also faces new challenges—technological disruptions, global competition, sustainability demands, and the evolving needs of future generations.

In this context, ITET must not only preserve its proud legacy but also embrace reform, modernization, and inclusivity. As Member Secretary, my priorities are clear:
1. Institutional Reform: Strengthening ITET’s constitution, governance, and operational framework to make it more transparent, accountable, and responsive.
2. Digital Transformation: Expanding digital platforms for communication, knowledge-sharing, and member services.
3. Member Empowerment: Enhancing opportunities for professional development, networking, and welfare support.
4. Industry-Academia Linkage: Building stronger bridges between universities, research, and industry to nurture the next generation of textile engineers.
5. Global Positioning: Ensuring ITET represents Bangladesh’s textile engineers on international platforms with dignity and confidence.

ITET belongs to all of us. Its strength comes from the active participation and unity of its members. I call upon every textile engineer—senior or junior, from academia, research, or industry—to join hands in shaping the future of our profession and our institution.

Together, we can transform ITET into a modern, inclusive, and globally recognized organization that reflects the pride and potential of Bangladesh’s textile engineers.

With unity, vision, and dedication, let us move forward.`
    }
];

// Slider configuration
const sliderSettings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: true,
    adaptiveHeight: true,
};

// Helper function to truncate text
const truncateMessage = (message: string, maxWords: number) => {
    const words = message.split(' ');
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return message;
};

const MDMessage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChairman, setSelectedChairman] = useState<ChairmanInfo | null>(null);
    const sliderRef = useRef<Slider>(null);

    const openModal = (chairman: ChairmanInfo) => {
        setSelectedChairman(chairman);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedChairman(null); 
        document.body.style.overflow = 'auto';
    };



    
    return (
        <>
            <section className="bg-gradient-to-b from-pink-50 to-white rounded-lg shadow-sm border border-pink-100">
                <Slider ref={sliderRef} {...sliderSettings}>
                    {chairmanData.map((chairman) => (
                        <div
                            key={chairman._id}
                            className="focus:outline-none">
                            <div className="lg:flex items-center gap-2">
                                <div className="w-full md:w-[30%]">
                                    <div className="relative rounded-lg overflow-hidde">
                                        <Image
                                            src={chairman.image}
                                            alt={chairman.name}
                                            width={200}
                                            height={300}
                                            className="w-full h-full px-2 pt-2 rounded-lg"
                                            priority={chairman._id === "01"}
                                        />
                                    </div>
                                </div>

                                {/* Content Section - Made more compact */}
                                <div className="w-full md:w-[70%] space-y-1 text-center md:text-left py-2">
                                    <p className="text-[10px] md:text-xs text-pink-600 uppercase tracking-wider font-semibold">
                                        Honorable
                                    </p>
                                    <h3 className="text-base md:text-xl font-bold text-[#B07210]">
                                        {chairman.name}
                                    </h3>
                                    <p className="text-xs md:text-sm font-medium text-gray-700">
                                        {chairman.role}
                                    </p>
                                    <p className="text-gray-600 text-xs leading-tight">
                                        {truncateMessage(chairman.message, 15)}
                                        {chairman.message.split(" ").length > 15 && (
                                            <button
                                                onClick={() => openModal(chairman)}
                                                className="text-blue-600 hover:text-blue-800 ml-1 hover:underline transition-colors text-xs cursor-pointer"
                                            >
                                                Read More
                                            </button>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                    ))}
                </Slider>

            </section>

            {/* Modal Component */}
            {selectedChairman && (
                <MdMessageModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    name={selectedChairman.name}
                    role={selectedChairman.role}
                    tagline={selectedChairman.tagline}
                    image={selectedChairman.image}

                >
                    <div className="whitespace-pre-line text-xs md:text-sm leading-relaxed text-gray-700 overflow-y-auto max-h-[50vh] md:max-h-[60vh]">
                        {selectedChairman.message}
                    </div>
                </MdMessageModal>
            )}
        </>
    );
};

export default MDMessage;