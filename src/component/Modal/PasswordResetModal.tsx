"use client";

import { Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { sendPasswordResetEmail, AuthError } from 'firebase/auth';
import { auth } from '../../../firebase.config';
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

type FirebaseAuthError = AuthError & {
    code: string;
    message: string;
};

export default function PasswordResetModal({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void
}) {
    const [resetEmail, setResetEmail] = useState('');
    const [isResetting, setIsResetting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const executePasswordReset = async (): Promise<void> => {
        if (!resetEmail) {
            toast.error('Please enter your email');
            return;
        }

        try {
            setIsResetting(true);
            await sendPasswordResetEmail(auth, resetEmail);
            toast.success('Password reset email sent! Check your inbox.');
            onClose();
        } catch (error) {
            const authError = error as FirebaseAuthError;
            toast.error(`Error: ${authError.message}`);
        } finally {
            if (isMounted) {
                setIsResetting(false);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 backdrop-blur-md  bg-black/40"
                onClick={onClose}
            />

            {/* Modal container */}
            <div className="flex min-h-full items-center justify-center p-4">
                {/* Modal content */}
                <div
                    className="relative w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left shadow-xl transition-all border border-amber-500"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Reset Your Password
                        </h3>
                        <div>
                            <IoClose
                                className="text-gray-500 text-xl cursor-pointer hover:text-rose-500 hover:bg-gray-100 p-0.5 rounded"
                                onClick={onClose} />
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-4">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Mail size={18} className="text-amber-600" />
                            </div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                            onClick={onClose}
                            disabled={isResetting}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:opacity-50 cursor-pointer"
                            onClick={executePasswordReset}
                            disabled={isResetting}
                        >
                            {isResetting ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </>
                            ) : 'Send Reset Link'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}