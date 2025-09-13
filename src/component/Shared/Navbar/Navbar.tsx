"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaChevronDown, FaBars, FaTimes, FaPhone, FaEnvelope } from "react-icons/fa";
import ContactBar from "./ContactBar";
import logo from "../../../../public/itet-logo.jpg";
import Container from "@/component/Container/Container";

// --- Types ---
interface MenuItem {
  label: string;
  path: string;
  hasDropdown?: boolean;
}

interface DropdownContent {
  [key: string]: { label: string; path: string }[];
}

interface MobileMenuButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

interface MobileMenuProps {
  isOpen: boolean;
  menuItems: MenuItem[];
  dropdownContent: DropdownContent;
  activeItem: string | null;
  openDropdown: string | null;
  toggleDropdown: (item: string) => void;
  handleItemClick: (item: string) => void;
  closeMenu: () => void;
}

interface DesktopDropdownProps {
  openDropdown: string | null;
  dropdownContent: DropdownContent;
}

// --- Main Component ---
export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Optional: Add slight delay before opening dropdown (prevents accidental triggers)
  // const [dropdownTimer, setDropdownTimer] = useState<NodeJS.Timeout | null>(null);

  // Close dropdown on non-dropdown item hover
  const handleMouseEnter = (item: string, hasDropdown: boolean) => {
    // if (dropdownTimer) clearTimeout(dropdownTimer); // Uncomment if using delay

    if (!hasDropdown) {
      setOpenDropdown(null);
    } else {
      // With delay (optional):
      // const timer = setTimeout(() => {
      //   setOpenDropdown(item);
      // }, 100);
      // setDropdownTimer(timer);

      // Without delay (recommended for now):
      setOpenDropdown(item);
    }
  };

  // Optional: Close on mouse leave item (uncomment if needed)
  // const handleMouseLeave = () => {
  //   if (dropdownTimer) clearTimeout(dropdownTimer);
  //   setOpenDropdown(null);
  // };

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const toggleDropdown = (item: string) => {
    setOpenDropdown(openDropdown === item ? null : item);
  };

  const menuItems: MenuItem[] = [
    { label: "Home", path: "/" },
    { label: "About ITET", path: "", hasDropdown: true },
    { label: "Membership", path: "", hasDropdown: true },
    { label: "Events", path: "/news-events" },
    { label: "More Pages", path: "/", hasDropdown: true },
  ];

  const dropdownContent: DropdownContent = {
    "About ITET": [
      { label: "History Of ITET", path: "/history-itet" },
      { label: "ITET's Mission & Vision", path: "/mission-vision" },
      { label: "Constitution", path: "/constitution" },
      { label: "Committee Members", path: "/committee" },
      { label: "Welfare Trust", path: "/welfareTrust" },
    ],
    "Membership": [
      { label: "Membership Overview", path: "/membership-overview" },
      { label: "Directory & Update Information", path: "/membership-login" },
      { label: "Members Benefits", path: "/members-benifits" },
    ],
    "More Pages": [
      { label: "Internship Opportunities", path: "/" },
      { label: "Partnerships", path: "/" },
      { label: "Directory & Member List", path: "/" },
      { label: "CV & Bio-Data Resources", path: "/" },
      { label: "Wall Magazine", path: "/" },
      { label: "Ask & Answer→Gallery", path: "/" },
    ],
  };

  return (
    <div className="relative" onMouseLeave={() => setOpenDropdown(null)}>
      {/* Contact Bar - Hidden on mobile */}
      <div className="hidden xl:block">
        <ContactBar />
      </div>

      {/* Simplified Contact Info for Tablet */}
      <div className="hidden lg:flex xl:hidden bg-gray-50 px-4 py-2 justify-center">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <a href="tel:+8801234567890" className="flex items-center gap-1 hover:text-yellow-600">
            <FaPhone size={12} />
            <span>+880-123-456789</span>
          </a>
          <span className="text-gray-400">|</span>
          <a href="mailto:info@itet.org.bd" className="flex items-center gap-1 hover:text-yellow-600">
            <FaEnvelope size={12} />
            <span>info@itet.org.bd</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md text-gray-900 relative z-50">
        <div className="px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <Image
                src={logo}
                alt="ITET Logo"
                width={40}
                height={40}
                className="sm:w-12 sm:h-12"
                priority
              />
              <div>
                <h1 className="font-semibold text-xs sm:text-sm lg:text-base text-gray-800 leading-tight">
                  <span className="block">The Institution of Textile Engineers</span>
                  <span className="block">& Technologists (ITET), Bangladesh</span>
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden xl:flex items-center gap-6 text-sm font-medium">
              {menuItems.map((item) => (
                <li
                  key={item.label}
                  className={`relative group ${activeItem === item.label ? "text-yellow-700 font-semibold" : "hover:text-yellow-600"}`}
                  onMouseEnter={() => handleMouseEnter(item.label, !!item.hasDropdown)}
                  // Optional: Add onMouseLeave={handleMouseLeave} here for per-item close
                  onClick={() => handleItemClick(item.label)}
                >
                  <Link href={item.path} className="flex items-center gap-1 py-2 transition-colors">
                    {item.label}
                    {item.hasDropdown && <FaChevronDown className="text-xs mt-[1px]" />}
                  </Link>
                </li>
              ))}

              {/* Action Button */}
              <li>
                <button
                  className="bg-gradient-to-r from-[#FFD086] to-[#E88E00] hover:from-transparent hover:to-transparent text-white font-medium px-5 py-2 text-sm rounded-sm cursor-pointer  border hover:border-[#FFD086] hover:text-[#E88E00]">
                  Query & Answer
                </button>

              </li>
            </ul>

            {/* Mobile Menu Toggle */}
            <MobileMenuButton
              isOpen={mobileMenuOpen}
              toggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          menuItems={menuItems}
          dropdownContent={dropdownContent}
          activeItem={activeItem}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
          handleItemClick={handleItemClick}
          closeMenu={() => setMobileMenuOpen(false)}
        />
      </nav>

      {/* Desktop Mega Menu — Smooth Animated */}
      <DesktopDropdown
        openDropdown={openDropdown}
        dropdownContent={dropdownContent}
      />

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black z-30 xl:hidden transition-opacity duration-500 ease-out ${mobileMenuOpen ? "opacity-50" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileMenuOpen(false)}
      />
    </div>
  );
}

// --- Sub Components ---

const MobileMenuButton = ({ isOpen, toggle }: MobileMenuButtonProps) => (
  <button
    className="xl:hidden p-2 text-gray-700 hover:text-yellow-600 hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
    onClick={toggle}
    aria-label="Toggle menu"
  >
    {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
  </button>
);

const MobileMenu = ({
  isOpen,
  menuItems,
  dropdownContent,
  activeItem,
  openDropdown,
  toggleDropdown,
  handleItemClick,
  closeMenu,
}: MobileMenuProps) => {
  return (
    <div
      className={`xl:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-40 transform transition-all duration-500 ease-out ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between p-4 border-b bg-gradient-to-r from-yellow-50 to-white transition-all duration-300 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
      >
        <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
        <button
          onClick={closeMenu}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all hover:rotate-90"
        >
          <FaTimes size={18} />
        </button>
      </div>

      {/* Menu Items */}
      <div
        className={`overflow-y-auto h-full pb-20 transition-all duration-400 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
      >
        <ul className="flex flex-col">
          {menuItems.map((item, index) => (
            <li
              key={item.label}
              className={`border-b border-gray-100 last:border-none transform transition-all duration-300 ${isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {item.hasDropdown ? (
                <>
                  <button
                    className={`w-full flex justify-between items-center p-4 text-left transition-all hover:bg-gray-50 ${activeItem === item.label
                      ? "text-yellow-700 font-semibold bg-yellow-50"
                      : "text-gray-700"
                      }`}
                    onClick={() => {
                      toggleDropdown(item.label);
                      handleItemClick(item.label);
                    }}
                  >
                    <span className="text-base">{item.label}</span>
                    <FaChevronDown
                      className={`transition-transform duration-300 ${openDropdown === item.label
                        ? "rotate-180 text-yellow-600"
                        : "text-gray-400"
                        }`}
                    />
                  </button>

                  {openDropdown === item.label && (
                    <ul
                      className={`bg-gray-50 border-t transition-all duration-300 ease-out transform ${openDropdown === item.label
                        ? "max-h-96 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-2 overflow-hidden"
                        }`}
                    >
                      {dropdownContent[item.label]?.map((link, linkIndex) => (
                        <li
                          key={link.label}
                          className="transform transition-all duration-200"
                          style={{
                            transitionDelay: `${linkIndex * 50}ms`,
                          }}
                        >
                          <Link
                            href={link.path}
                            className="flex items-center justify-between px-6 py-3 text-sm text-gray-600 hover:text-yellow-600 hover:bg-white transition-all group"
                            onClick={closeMenu}
                          >
                            <span>{link.label}</span>
                            <span className="opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all text-yellow-600">
                              →
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.path}
                  className={`flex items-center justify-between p-4 transition-all hover:bg-gray-50 group ${activeItem === item.label
                    ? "text-yellow-700 font-semibold bg-yellow-50"
                    : "text-gray-700"
                    }`}
                  onClick={() => {
                    handleItemClick(item.label);
                    closeMenu();
                  }}
                >
                  <span className="text-base">{item.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all text-yellow-600">
                    →
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>


        <Image
          src="https://res.cloudinary.com/du04p5ikw/image/upload/v1757616829/Untitled-1_Recovered_2_ahzyhd.jpg"
          alt="Promo"
          className={`m-5 rounded-lg transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          style={{ transitionDelay: "400ms" }}
          width={280}
          height={300}
        />

        {/* Portal Links */}
        <div
          className={`p-4 bg-gray-50 m-4 rounded-lg transition-all duration-400 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          style={{ transitionDelay: "500ms" }}
        >
          <h3 className="font-semibold text-gray-800 mb-3">Our Portal</h3>
          <div className="space-y-3">
            <Link
              href="/member-portal"
              className="block text-sm text-gray-600 hover:text-yellow-600 transition-all hover:translate-x-1 hover:underline"
              onClick={closeMenu}
            >
              Members Portal
            </Link>
            <Link
              href="/advertisers"
              className="block text-sm text-gray-600 hover:text-yellow-600 transition-all hover:translate-x-1 hover:underline"
              onClick={closeMenu}
            >
              Advertiser Portal
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div
          className={`p-4 bg-gray-50 m-4 rounded-lg transition-all duration-400 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          style={{ transitionDelay: "600ms" }}
        >
          <h3 className="font-semibold text-gray-800 mb-3">Contact Us</h3>
          <div className="space-y-2">
            <a
              href="tel:+8801234567890"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-600 transition-all hover:translate-x-1"
            >
              <FaPhone size={12} />
              <span>+880-123-456789</span>
            </a>
            <a
              href="mailto:info@itet.org.bd"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-600 transition-all hover:translate-x-1"
            >
              <FaEnvelope size={12} />
              <span>info@itetbd.net</span>
            </a>
          </div>
        </div>

        {/* Action Button */}
        <div
          className={`p-4 transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
            }`}
          style={{ transitionDelay: "700ms" }}
        >
          <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 text-sm font-medium transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95">
            Query & Answer
          </button>
        </div>
      </div>
    </div>
  );
};

const DesktopDropdown = ({ openDropdown, dropdownContent }: DesktopDropdownProps) => {
  return (
    <div
      className={`hidden xl:block absolute top-full left-0 w-full bg-white  border-b border-black z-40 py-10 
        transition-all duration-700 ease-in-out transform
        ${openDropdown
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 -translate-y-12 invisible pointer-events-none"
        }`}
    >
      <Container>
        <div className="flex gap-12 lg:gap-20 justify-center">
          {/* Dropdown Links */}
          <div className="w-1/2 space-y-4">
            <h3 className="text-xl font-semibold text-yellow-700 border-b border-yellow-200 pb-2">
              {openDropdown || "Menu"}
            </h3>
            <ul className="space-y-1">
              {openDropdown &&
                dropdownContent[openDropdown]?.map((link) => (
                  <div className="w-full" key={link.label}>
                    <Link
                      href={link.path}
                      className="flex justify-between items-center w-full text-gray-700 hover:text-white bg-gradient-to-r hover:from-yellow-600 hover:to-amber-100 px-4 py-3 transition-all duration-300 font-medium group"
                    >
                      <span>{link.label}</span>
                      <span className="opacity-0 group-hover:opacity-100 group-hover:-rotate-45 transition-all duration-300 text-black">
                        →
                      </span>
                    </Link>
                  </div>
                ))}
            </ul>
          </div>

          {/* Promo Image */}
          <div className="w-1/2 pl-6">
            <div className=" w-full rounded-lg overflow-hidden">
              <Image
                src="https://res.cloudinary.com/du04p5ikw/image/upload/v1757506732/Untitled-1_Recovered_hm68yz.jpg"
                alt="Promo"
                className=""
                priority
                quality={100}
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};