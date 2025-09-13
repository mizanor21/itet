'use client';

import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase.config';
import { useEffect, useState } from 'react';
import { DirectoryData } from "@/types/memberPortalTypes";
import { useMembersData } from "@/lib/DataFetch/DataFetch";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { ShieldX, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from "next/link";



const MemberPrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const [user, loading] = useAuthState(auth);
    const { data: memberDirectoryData = [], isLoading } = useMembersData();
    const [isApprovedMember, setIsApprovedMember] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isLoading && user && memberDirectoryData.length > 0) {
            const member = memberDirectoryData.find(
                (m: DirectoryData) =>
                    m.emailAddress === user.email &&
                    m.approveType === "Approved" &&
                    m.status === "Active"

            );
            setIsApprovedMember(!!member);
        }

        if (!loading && !user) {
            router.push('/membership-login');
        }
    }, [user, loading, isLoading, memberDirectoryData, router]);

    if (loading || isLoading || isApprovedMember === null) {
        return <LoadingSpinner />;
    }

    if (!isApprovedMember) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center px-4 py-8">
                <div className="relative max-w-md w-full">
                    {/* Background decorative elements */}
                    <div className="absolute -top-4 -left-4 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                    <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>

                    {/* Main card */}
                    <div className="relative bg-white/80 backdrop-blur-sm border border-red-200/50 rounded-3xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-500 hover:scale-105">
                        {/* Icon container - properly centered */}
                        <div className="flex justify-center mb-6">
                            <div className="relative p-4 bg-gradient-to-r from-red-100 to-amber-100 rounded-full border-2 border-red-200 shadow-lg">
                                <ShieldX
                                    size={64}
                                    className="text-red-500 drop-shadow-sm"
                                />
                                {/* Animated ring */}
                                <div className="absolute inset-0 rounded-full border-2 border-red-300 animate-ping opacity-75"></div>
                            </div>
                        </div>

                        {/* Title with gradient text */}
                        <h2 className="text-3xl font-black bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent mb-4">
                            Access Denied
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                            Please Re-new Membership or Contact ITET Office.
                        </p>

                        <div className="flex gap-4 justify-center">
                            {/* Modern button */}
                            <Link
                                href='/membership-login'
                                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-sky-600 hover:to-blue-700 focus:ring-4 focus:ring-sky-200 focus:outline-none cursor-pointer">
                                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                                Go Back

                                {/* Button shine effect */}
                                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                            </Link>

                            {/* Modern button */}
                            <Link
                                href='/renew-membership'
                                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-sky-600 hover:to-blue-700 focus:ring-4 focus:ring-sky-200 focus:outline-none cursor-pointer">
                                Re-New
                                <ArrowRight size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />

                                {/* Button shine effect */}
                                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                            </Link>
                        </div>

                        {/* Status indicator */}
                        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Awaiting approval
                        </div>
                    </div>

                    {/* Additional floating elements */}
                    <div className="absolute top-8 right-8 w-3 h-3 bg-red-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-8 left-8 w-2 h-2 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default MemberPrivateRoute;
