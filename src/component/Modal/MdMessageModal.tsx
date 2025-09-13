'use client'

import { useEffect } from 'react';
import Image from "next/image";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    name?: string;
    role?: string;
    tagline?: string;
    image?: string;
}

const MdMessageModal = ({ isOpen, onClose, children, name, role, tagline, image }: ModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4">
                {/* Background overlay */}
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
                    onClick={onClose}
                ></div>

                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow-xl transform transition-all w-full max-w-3xl overflow-hidden">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-rose-600 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Modal body */}
                    <div className="p-6 space-y-6">
                        {/* Header section: Image + Info */}
                        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                            {image && (
                                <div className="w-32 h-32 relative rounded-lg overflow-hidden shadow">
                                    <Image
                                        src={image}
                                        alt={name || "Profile"}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex-1 space-y-2 text-center md:text-left">
                                {name && (
                                    <>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Honorable</p>
                                        <h3 className="text-xl font-bold text-[#B07210]">
                                            {name}
                                        </h3>
                                    </>
                                )}
                                {role && (
                                    <p className="text-sm font-bold text-gray-700">
                                        {role}
                                    </p>
                                )}
                                {tagline && (
                                    <p className="text-sm text-gray-600 font-medium italic">
                                        "{tagline}"
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Message section */}
                        <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MdMessageModal;
