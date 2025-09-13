"use client";

import { SlLocationPin } from "react-icons/sl";
import { CiHeadphones } from "react-icons/ci";
import { PiQuestionMarkLight } from "react-icons/pi";
import { DiDropbox } from "react-icons/di";
import { IconType } from "react-icons";
import Container from "@/component/Container/Container";
import Link from "next/link";


// Type definitions
type ContactItem = {
    type: string;
    icon: IconType;
    title: string;
    details: {
        text: string;
        link?: string;
        type?: 'email' | 'phone' | 'address';
    }[];
};

const contactData: ContactItem[] = [
    {
        type: "address",
        icon: SlLocationPin,
        title: "ADDRESS",
        details: [
            {
                text: " H-6, R-2, S-11, Uttara, Dhaka.",
                link: "https://www.google.com/maps?q=H-6,+R-2,+S-11,+Uttara,+Dhaka",
                type: 'address'
            },

        ],
    },
    {
        type: "support",
        icon: CiHeadphones,
        title: "General Support",
        details: [
            {
                text: "info@itetbd.net",
                link: "mailto:info@itetbd.net",
                type: 'email'
            },
            {
                text: "+880 1715-771454",
                link: "tel:+8801715771454",
                type: 'phone'
            },
        ],
    },
    {
        type: "ads",
        icon: DiDropbox,
        title: "Advertisement Support",
        details: [
            {
                text: "p&p@itetbd.net",
                link: "mailto:p&p@itetbd.com",
                type: 'email'
            },
            {
                text: "+8801715771454",
                link: "tel:+8801715771454",
                type: 'phone'
            },
        ],
    },
    {
        type: "general",
        icon: PiQuestionMarkLight,
        title: "General Correspondence",
        details: [
            {
                text: "secr.general@itetbd.net",
                link: "mailto:secr.general@itetbd.net",
                type: 'email'
            },
            {
                text: "+8801715771454",
                link: "tel:+8801715771454",
                type: 'phone'
            },
        ],
    },
];

export default function Contact() {
    const renderDetail = (detail: { text: string; link?: string; type?: string }, idx: number) => {
        if (detail.link) {
            return (
                <Link
                    key={idx}
                    href={detail.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block transition-colors hover:text-[#B07210] ${detail.type === 'email' ? 'hover:underline' : ''
                        }`}
                >
                    {detail.text}
                </Link>
            );
        }
        return <span key={idx}>{detail.text}</span>;
    };

    return (
        <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Container>
                <div className="flex items-center mb-8">
                    <div className="w-1 h-8 bg-[#B07210] mr-3"></div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                        Have more questions? <span className="text-[#B07210]">Contact us!</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {contactData.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.type}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-4 text-[#B07210] bg-[#B07210]/10 p-3 rounded-full">
                                        <Icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-md font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                        {item.title}
                                    </h3>
                                    <div className="space-y-1.5 text-gray-600 text-sm md:text-base">
                                        {item.details.map((detail, idx) => (
                                            <div key={idx}>
                                                {renderDetail(detail, idx)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}