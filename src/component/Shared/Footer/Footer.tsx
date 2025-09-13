'use client'
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaRegCopyright } from "react-icons/fa";
import BackToTop from "../BackToTop";
import Container from "@/component/Container/Container";
import Link from "next/link";
import { FooterData } from "@/types/footerTypes";
import logo from '../../../../public/itet-logo.jpg'

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerData: FooterData = {
        campusLinks: [
            {
                label: 'Members Portal',
                path: '/membership-login',
            },
            {
                label: 'Advertiser Portal',
                path: '/advertisers'
            }
        ],
        pageLinks: [
            { label: "History Of ITET", path: "/history-itet" },
            { label: "ITET's Mission & Vision", path: "/mission-vision" },
            { label: "Constitution", path: "/constitution" },
            { label: "Committee Members", path: "/committee" },
            { label: "Welfare Trust", path: "/welfareTrust" },
            { label: "Membership Overview", path: "/membership-overview" },
            { label: "Directory & Update Information", path: "/membership-login" },
            { label: "Members Benifits", path: "/members-benifits" },
            {
                label: 'Contact Us',
                path: '/contact'
            },
            {
                label: 'Gallery',
                path: '/gallery'
            }
        ]
    };

    const { campusLinks, pageLinks } = footerData;

    return (
        <footer className="bg-gradient-to-b from-[#0a0b2a] to-[#02031e] text-white pt-16 pb-8 text-sm relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B07210] via-[#4a8cff] to-[#B07210]"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-[#B07210] opacity-10 blur-xl"></div>
            <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-[#4a8cff] opacity-10 blur-xl"></div>

            <Container>
                {/* Footer Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 relative z-10">
                    {/* Logo and Info */}
                    <div className="col-span-2">
                        <Link href='/'>
                            <div className="flex items-center gap-3 mb-6 group">
                                <div className="p-2 bg-white rounded-lg group-hover:scale-105 transition-transform duration-300">
                                    <Image
                                        src={logo}
                                        alt="ITET Logo"
                                        width={50}
                                        height={50}
                                        priority
                                        className="rounded-sm"
                                    />
                                </div>
                                <h1 className="font-bold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    The Institution of Textile Engineers <br />
                                    & Technologists (ITET), Bangladesh
                                </h1>
                            </div>
                        </Link>

                        <p className="text-gray-400 my-6 md:w-[90%] leading-relaxed">
                            Empowering textile professionals through innovation, education, and collaboration.
                            Join us in shaping the future of textile engineering and technology in Bangladesh.
                        </p>

                        <div className="space-y-4  max-w-md">
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                                <CiLocationOn className="text-xl mt-0.5 text-[#B07210] flex-shrink-0" />
                                <Link
                                    href="https://www.google.com/maps?q=H-6,+R-2,+S-11,+Uttara,+Dhaka"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-[#B07210] transition-colors duration-300"
                                >
                                    H-6, R-2, S-11, Uttara, Dhaka.
                                </Link>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                                <IoCallOutline className="text-[#B07210]" />
                                <Link
                                    href="tel:+880 1715771454"
                                    className="text-gray-300 hover:text-[#B07210] transition-colors duration-300"
                                >
                                    +880 1715-771454
                                </Link>
                            </div>

                            <div className="space-y-2 max-w-md">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                                    <IoMailOutline className="text-[#B07210]" />
                                    <Link
                                        href="mailto:info@itetbd.net"
                                        className="text-gray-300 hover:text-[#B07210] transition-colors duration-300"
                                    >
                                        info@itetbd.net
                                    </Link>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                                    <IoMailOutline className="text-[#B07210]" />
                                    <Link
                                        href="mailto:p&p@itetbd.net"
                                        className="text-gray-300 hover:text-[#B07210] transition-colors duration-300"
                                    >
                                        p&p@itetbd.net
                                    </Link>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                                    <IoMailOutline className="text-[#B07210]" />
                                    <Link
                                        href="mailto:secr.general@itetbd.net"
                                        className="text-gray-300 hover:text-[#B07210] transition-colors duration-300"
                                    >
                                        secr.general@itetbd.net
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Our Pages */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 pb-2 relative inline-block after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-[#B07210]">
                            Our Pages
                        </h4>
                        <ul className="space-y-3">
                            {pageLinks.map((link, index) => (
                                <li key={link.label}>
                                    <span>
                                        <Link
                                            href={link.path}
                                            className="text-gray-400 hover:text-[#B07210] transition-colors duration-300 flex items-center group"
                                        >
                                            <span className="w-1.5 h-1.5 bg-[#B07210] rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                                            {link.label}
                                        </Link>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Our Portal */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 pb-2 relative inline-block after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-[#B07210]">
                            Our Portal
                        </h4>
                        <ul className="space-y-3">
                            {campusLinks?.map((link, index) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.path}
                                        className="text-gray-400 hover:text-[#B07210] transition-colors duration-300 flex items-center group py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10"
                                    >
                                        <span className="w-1.5 h-1.5 bg-[#4a8cff] rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Social Media Links */}
                        <div className="mt-8">
                            <h4 className="font-semibold text-gray-300 mb-4">Follow Us</h4>
                            <div className="flex gap-3">
                                <a href="https://www.facebook.com/groups/itetbd/?ref=share&mibextid=KtfwRi" target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-[#B07210] transition-colors duration-300">
                                    <FaFacebookF className="text-lg" />
                                </a>
                                <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#B07210] transition-colors duration-300">
                                    <FaTwitter className="text-lg" />
                                </a>
                                <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#B07210] transition-colors duration-300">
                                    <FaLinkedinIn className="text-lg" />
                                </a>
                                <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#B07210] transition-colors duration-300">
                                    <FaInstagram className="text-lg" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-8 relative z-10"></div>

                {/* Copyright Section */}
                <div className="flex flex-col md:flex-row justify-between items-center text-md font-medium relative z-10 ">
                    <div className="mb-4 md:mb-0 text-gray-500 flex gap-2">
                        <FaRegCopyright className="text-md mt-1" /> {currentYear} The Institution of Textile Engineers & Technologists(ITET), Bangladesh. All rights reserved.
                    </div>
                    <div className="text-gray-500 flex items-center gap-1">
                        <span>Designed & Developed by</span>
                        <Link
                            href="https://360dsoul.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-300 hover:from-sky-300 hover:to-sky-200 transition-all duration-300"
                        >360D Soul Limited
                        </Link>
                    </div>
                </div>
            </Container>
            <BackToTop />

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease forwards;
                }
            `}</style>
        </footer>
    );
}