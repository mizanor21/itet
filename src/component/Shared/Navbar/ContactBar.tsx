import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoCallOutline } from "react-icons/io5";
import { ContactInfo, NavLink, SocialLink } from "@/types/contactBar";


const ContactBar = () => {

    // Social links data
    const socialLinks: SocialLink[] = [
        {
            icon: <FaFacebookF />,
            url: 'https://www.facebook.com/groups/itetbd/?ref=share&mibextid=KtfwRi',
            label: 'Facebook'
        },
        {
            icon: <FaLinkedinIn />,
            url: 'https://www.linkedin.com/in',
            label: 'LinkedIn'
        },
        {
            icon: <FaInstagram />,
            url: 'https://www.instagram.com',
            label: 'Instagram'
        },
        {
            icon: <FaYoutube />,
            url: 'https://www.youtube.com',
            label: 'Youtube'
        }
    ];

    // Contact information data
    const contactInfo: ContactInfo[] = [
        {
            type: 'location',
            icon: <CiLocationOn />,
            content: 'H-6, R-2, S-11, Uttara, Dhaka. ',
            href: 'https://www.google.com/maps?q=H-6,+R-2,+S-11,+Uttara,+Dhaka',
            ariaLabel: 'View location on Google Maps'
        },
        {
            type: 'email',
            icon: <HiOutlineMail />,
            content: 'info@itetbd.net',
            href: 'mailto:info@itet.net',
            ariaLabel: 'Send email to info@itetbd.com'
        },
        {
            type: 'phone',
            icon: <IoCallOutline />,
            content: '+880 1715-771454',
            href: 'tel:+880 1715-771454',
            ariaLabel: 'Call +880 1715-771454'
        }
    ];

    // Navigation links
    const navLinks: NavLink[] = [
        {
            label: 'Members Portal',
            href: '/member-portal',
            ariaLabel: 'Members Portal'
        },
        {
            label: 'Advertiser Portal',
            href: '/advertisers',
            ariaLabel: 'Advertiser Portal'
        },
        {
            label: 'Contact Us',
            href: '/contact',
            ariaLabel: 'Contact Us'
        }
    ];

    return (
        <div className="bg-[#26A9C4] text-white text-[13px] ">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 py-1.5 px-4 lg:px-6">

                {/* Left Section - Contact Information */}
                <div className=" lg:flex flex-col sm:flex-row flex-wrap items-center sm:items-center gap-4 sm:gap-6">
                    {contactInfo.map((info, index) => (
                        <Link
                            key={index}
                            href={info.href}
                            target={info.type === 'location' ? '_blank' : undefined}
                            rel={info.type === 'location' ? 'noopener noreferrer' : undefined}
                            className="flex items-center gap-2 hover:underline max-w-[20rem]"
                            aria-label={info.ariaLabel}
                        >
                            <span className="text-md shrink-0"> {info.icon}</span>
                            <span>{info.content}</span>
                        </Link>
                    ))}
                </div>

                {/* Right Section - Links and Social Media */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="hover:underline"
                                aria-label={link.ariaLabel}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <span className="hidden sm:block mx-2">|</span>

                    <div className="flex items-center gap-3">
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.label}
                                className="text-md text-white hover:text-[#f88d00] transition-transform duration-500"
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactBar;