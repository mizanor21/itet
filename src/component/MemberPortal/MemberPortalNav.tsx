'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import logo from '../../../public/itet-logo.jpg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navitems } from '@/types/memberPortalTypes';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks: Navitems[] = [
    {
        label: 'Welcome Panel',
        path: '/member-portal',
    },
    {
        label: 'Downloads & Resources',
        path: '/member-portal/downloads-resources',
    },
    {
        label: 'Upcoming Events',
        path: '/member-portal/upcoming-events',
    },
    {
        label: 'Notifications',
        path: '/member-portal/notifications',
    },
    {
        label: 'Membership Documents',
        path: '/member-portal/membership-documents',
    },
    {
        label: 'Welfare Trust Membership',
        path: '/member-portal/welfare-membership-form',
    },
];

const MemberPortalNav = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='px-4 lg:px-[5%]'>
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between py-4 md:py-[1%]">
                <div className="flex items-center gap-2 justify-between w-full lg:w-auto">
                    {/* Logo and Branding */}
                    <div className="flex items-center gap-2">
                        <Image src={logo} alt="ITET Logo" width={50} height={100} className="w-10 h-auto md:w-12" />
                        <h1 className="font-medium text-xs md:text-lg text-gray-900">
                            <span className="">
                                The Institution of Textile Engineers <br />
                                & Technologists (ITET), Bangladesh
                            </span>

                        </h1>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-gray-700 focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>

                {/* Go Home Button - Hidden on mobile when menu is open */}
                <div className="mt-4 md:mt-0 hidden lg:flex">
                    <Link
                        href="/"
                        className="px-3 py-1.5 md:px-4 md:py-2 rounded-md bg-white hover:bg-cyan-50 border border-cyan-500 font-medium text-cyan-600 text-sm md:text-base transition whitespace-nowrap"
                        aria-label="Go back to home page"
                    >
                        Go Back To Home
                    </Link>
                </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex w-full bg-white rounded overflow-x-auto py-3 md:py-4 shadow-sm">
                <div className="flex mx-auto space-x-1 md:space-x-2 lg:space-x-4 px-2">
                    {navLinks?.map((link, index) => (
                        <Link
                            key={index}
                            href={link.path}
                            className={`px-3 py-2 rounded transition-all whitespace-nowrap text-sm md:text-base font-medium ${pathname === link.path
                                ? 'bg-gradient-to-l from-amber-600 to-yellow-500 text-white'
                                : 'text-gray-800 hover:bg-stone-100'
                                }`}
                            aria-current={pathname === link.path ? 'page' : undefined}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white rounded shadow-lg mt-2 py-2">
                    <div className="flex flex-col space-y-1 px-2">
                        {navLinks?.map((link, index) => (
                            <Link
                                key={index}
                                href={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`px-4 py-3 rounded transition-all text-base font-medium ${pathname === link.path
                                    ? 'bg-gradient-to-l from-amber-600 to-yellow-500 text-white'
                                    : 'text-gray-800 hover:bg-stone-100'
                                    }`}
                                aria-current={pathname === link.path ? 'page' : undefined}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {/* Mobile Home Button inside menu */}
                        <Link
                            href="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-4 py-3 rounded-md bg-white hover:bg-cyan-50 border border-cyan-500 font-semibold text-cyan-600 text-base transition mt-2"
                            aria-label="Go back to home page"
                        >
                            Go Back To Home
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default MemberPortalNav;

