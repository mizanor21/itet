"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DelayedModal() {

    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [lastShownTime, setLastShownTime] = useState<number | null>(null);
    const [countdown, setCountdown] = useState(5);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        // Simulate checking last shown time (using state instead of localStorage)
        const now = new Date().getTime();
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

        // Show modal if it's never been shown or if it's been more than 1 hour
        if (!lastShownTime || (now - lastShownTime) > oneHour) {
            setShowModal(true);
            setLastShownTime(now);
            setCountdown(5);
            setProgress(100);

            // Trigger animation after a small delay
            setTimeout(() => {
                setIsVisible(true);
            }, 100);
        }
    }, [lastShownTime]);

    // Auto-close countdown effect
    useEffect(() => {
        if (!showModal || !isVisible) return;

        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    // Close modal when countdown reaches 0
                    setIsVisible(false);
                    setTimeout(() => {
                        setShowModal(false);
                    }, 300);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Progress bar animation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev - (100 / 5);
                return newProgress <= 0 ? 0 : newProgress;
            });
        }, 1000);

        return () => {
            clearInterval(countdownInterval);
            clearInterval(progressInterval);
        };
    }, [showModal, isVisible]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            setShowModal(false);
        }, 300);
    };

    const handleButtonClick = (url: string) => {
        handleClose();
        if (url === '/membership-overview') {
            router.push('/membership-overview');
        } else {
            router.push('/advertisers');
        }
    };

    if (!showModal) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${isVisible
                ? 'backdrop-blur-md bg-black/30'
                : 'backdrop-blur-none bg-black/0'
                }`}
            onClick={handleClose}
        >
            <div
                className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 ease-out ${isVisible
                    ? 'scale-100 opacity-100 translate-y-0'
                    : 'scale-95 opacity-0 translate-y-4'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Orange accent bar */}
                <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-t-2xl"></div>

                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 z-10"
                    aria-label="Close modal"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Content */}
                <div className="p-8 pt-6">
                    {/* Logo/Icon */}
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full mx-auto mb-6 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-medium text-gray-900 text-center mb-2">
                        Welcome to ITET Bangladesh
                    </h2>

                    {/* Subtitle */}
                    <p className="text-amber-600 font-medium text-center mb-4">
                        The Institution of Textile Engineers <br />
                        & Technologists (ITET), Bangladesh
                    </p>

                    {/* Action buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={() => handleButtonClick('/membership-overview')}
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Become A Member
                        </button>

                        <button
                            onClick={() => handleButtonClick('/advertisers')}
                            className="w-full bg-white text-orange-600 font-semibold py-3 px-6 rounded-lg border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50 transform hover:scale-105 transition-all duration-200"
                        >
                            Become a Partner
                        </button>
                    </div>

                    {/* Auto-close indicator with countdown */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-400 mb-2">
                            Auto-closing in {countdown} seconds
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                            <div
                                className="bg-gradient-to-r from-orange-400 to-orange-500 h-1 rounded-full transition-all duration-1000 ease-linear"
                                style={{
                                    width: `${progress}%`
                                }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Bottom gradient accent */}
                <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-b-2xl opacity-30"></div>
            </div>
        </div>
    );
}





