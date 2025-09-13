"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { FiRefreshCw } from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { auth } from '../../../firebase.config';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from "react-hot-toast";
import PasswordResetModal from "../Modal/PasswordResetModal";


type LoginFormDataTypes = {
    email: string;
    password: string;
};

type FirebaseAuthError = AuthError & {
    code: string;
    message: string;
};

const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string(),
});

export default function MembershipLogin() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
    const router = useRouter();
    const [userCaptcha, setUserCaptcha] = useState<string>("");
    const [captcha, setCaptcha] = useState<string>("");

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormDataTypes>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const generateCaptcha = useCallback((): string => {
        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let captcha = "";
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return captcha;
    }, []);

    useEffect(() => {
        setCaptcha(generateCaptcha());
    }, [generateCaptcha]);

    const refreshCaptcha = useCallback(() => {
        setCaptcha(generateCaptcha());
        setUserCaptcha("");
    }, [generateCaptcha]);

    const onSubmit = async (data: LoginFormDataTypes): Promise<void> => {
        if (!userCaptcha) {
            setError('Please complete the CAPTCHA verification');
            toast.error('Please complete the CAPTCHA verification');
            return;
        }

        if (userCaptcha !== captcha) {
            setError('Incorrect CAPTCHA (check uppercase/lowercase)');
            toast.error('Incorrect CAPTCHA (check uppercase/lowercase)');
            refreshCaptcha();
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            toast.success('Login successful! Redirecting to member portal...');
            router.push('/member-portal');
        } catch (error) {
            const authError = error as FirebaseAuthError;
            let errorMessage = 'Login failed. Please try again.';

            switch (authError.code) {
                case 'auth/user-not-found':
                    errorMessage = 'No user found with this email';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many login attempts. Please try again later.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'This account has been disabled';
                    break;
                default:
                    errorMessage = authError.message || errorMessage;
            }

            toast.error(errorMessage);
            setError(errorMessage);
            refreshCaptcha();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gradient-to-b from-[#d6bd81] to-[#ffffff] px-4 py-[5%] ">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-full max-w-xl rounded-2xl shadow-md p-8 md:p-12">
                <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-black">
                    Members Login Panel
                </h1>

                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700  text-sm">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-4 p-2 bg-green-100 text-green-700  text-sm">
                        {successMessage}
                    </div>
                )}

                <div className="mb-5 relative">
                    <label htmlFor="email" className="block text-sm font-semibold mb-1 text-black">
                        Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Mail size={18} className="text-amber-600" />
                        </div>
                        <input
                            {...register("email")}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300  px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                            autoComplete="username"
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="mb-5 relative">
                    <label htmlFor="password" className="block text-sm font-semibold mb-1 text-black">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Lock size={18} className="text-amber-600" />
                        </div>
                        <input
                            {...register("password")}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="w-full border border-gray-300  px-4 py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <div className="space-y-2 mb-5">
                    <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">CAPTCHA Verification <span className="text-rose-500"> * </span></label>
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="text-gray-500">🔒</span>
                            </div>
                            <input
                                id="captcha"
                                type="text"
                                placeholder="Enter CAPTCHA"
                                className="w-full border border-gray-300  px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                                value={userCaptcha}
                                onChange={(e) => setUserCaptcha(e.target.value)}
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2  border border-gray-200">
                            <span className="font-mono text-lg tracking-widest text-gray-800 select-none">
                                {captcha}
                            </span>
                            <button
                                type="button"
                                onClick={refreshCaptcha}
                                className="text-gray-800 hover:text-green-700 transition-colors"
                                aria-label="Refresh CAPTCHA"
                                disabled={isLoading}
                            >
                                <FiRefreshCw className={`w-5 h-5 ${isLoading ? 'opacity-50' : ''}`} />
                            </button>
                        </div>
                    </div>
                    
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 text-white font-semibold rounded bg-gradient-to-tl from-[#eb6302] to-[#ecb901] hover:from-[#f6e60e] hover:to-[#ca3402] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center transition-all duration-1000 cursor-pointer"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Logging in...
                        </>
                    ) : 'Login Now'}
                </button>
                <div className="mt-6 text-center text-sm text-[#6c757d]">
                    Forgot Your Password?{" "}
                    <button
                        type="button"
                        onClick={() => setIsResetModalOpen(true)}
                        className="text-[#3a8edb] font-semibold hover:underline cursor-pointer rounded"
                        disabled={isLoading}
                    >
                        Reset Now
                    </button>
                </div>
            </form>

            <PasswordResetModal
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
            />
        </div>
    );
}