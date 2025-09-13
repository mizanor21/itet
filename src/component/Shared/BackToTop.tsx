'use client'

import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';


const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`
        fixed bottom-20 right-8 z-[9999]
        w-10 h-10 flex items-center justify-center
        bg-[#af7b02] hover:bg-amber-500 text-white rounded
        shadow-lg hover:bg-primary-light
        transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <FaArrowUp className="text-lg" />
        </button>
    );
};

export default BackToTop;

