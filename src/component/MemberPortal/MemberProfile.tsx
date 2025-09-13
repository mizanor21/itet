'use client'

import React, { useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import UpdateMemberProfileModal from "../Modal/UpdateMemberProfileModal";
import { auth } from "../../../firebase.config";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { DirectoryData } from "@/types/memberPortalTypes";
import Image from "next/image";
import { UserIcon } from "lucide-react";
import useCurrentMembers from "@/hooks/useCurrentMembers";



const MemberProfile = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    const [currentMember, isLoading, mutate] = useCurrentMembers();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Calculate remaining days with expiration check
    const calculateRemainingDays = (endDate: string): number | 'expired' => {
        const end = new Date(endDate);
        const today = new Date();
        const diffTime = end.getTime() - today.getTime();
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return days <= 0 ? 'expired' : days;
    };

    // Function to get the BSC in Textile Engineering qualification
    const getBscTextileEducation = (member: DirectoryData) => {
        if (!member.qualifications || member.qualifications.length === 0) return null;
        return member.qualifications.find(qual => qual.degreeName === "BSC in Textile Engineering") || null;
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/membership-login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    if (loading || isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!currentMember && !loading && user) {
        return (
            <div className="max-w-sm border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white h-full p-6 text-center">
                <h2 className="text-lg font-semibold text-red-600">No Active Membership Found</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Your account ({user.email}) doesn't have an active approved membership.
                </p>
                <button
                    onClick={handleLogout}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                >
                    Log Out
                </button>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-sm border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white h-full p-6 text-center">
                <h2 className="text-lg font-semibold text-red-600">Not Logged In</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Please log in to view your membership profile.
                </p>
            </div>
        );
    }

    const bscTextileEducation = currentMember ? getBscTextileEducation(currentMember) : null;

    // Calculate remaining days and status
    const remainingDays = currentMember?.membershipEndDate
        ? calculateRemainingDays(currentMember.membershipEndDate)
        : null;


    const getRemainingDaysStyle = () => {
        if (remainingDays === null) return 'text-gray-600 bg-gray-100';
        if (remainingDays === 'expired') return 'text-red-600 bg-red-100';
        if (typeof remainingDays === 'number' && remainingDays <= 15) return 'text-orange-600 bg-orange-100';
        return 'text-green-600 bg-green-100';
    };

    return (
        <>
            <div className="max-w-[400px] border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white h-full lg:h-[800px] xl:h-[700px] 2xl:h-[700px] flex flex-col">
                {/* Top content */}
                <div className="flex flex-col items-center p-4">
                    {currentMember?.personImage ? (
                        <Image
                            src={currentMember.personImage}
                            alt="Profile"
                            width={100}
                            height={100}
                            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-gray-200 flex items-center justify-center">
                            <UserIcon className="w-12 h-12 text-gray-400" />
                        </div>
                    )}

                    <p className="mt-2 text-sm text-gray-600">Welcome,</p>
                    <h2 className="text-lg lg:text-xl font-medium text-orange-600">
                        {currentMember?.fullName || 'Member'}
                    </h2>
                    <p className="bg-purple-100 text-purple-600 text-xs font-medium px-2 py-0.5 rounded-full mt-1">
                        Membership ID : {currentMember?.membershipID}
                    </p>
                </div>

                {/* Middle content */}
                <div className="px-6 py-2 flex-grow">
                    <h3 className="font-semibold text-center text-gray-800 text-base mb-3">Information</h3>
                    <div className="text-sm text-gray-700 space-y-2">
                        <p><span className="font-semibold">Membership</span> : {currentMember?.membershipType || 'Member'}</p>
                        <p><span className="font-semibold">Validity Till : </span>
                            {currentMember?.membershipEndDate ?
                                new Date(currentMember.membershipEndDate).toLocaleDateString() :
                                'Lifetime'}
                        </p>
                        <div>
                            <span className="font-semibold">Remaining Days : </span>
                            {remainingDays !== null ? (
                                <span className={`px-2 py-0.5 rounded text-xs ${getRemainingDaysStyle()}`}>
                                    {remainingDays === 'expired' ? 'Expired' : `${remainingDays} days`}
                                </span>
                            ) : (
                                <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100">
                                    N/A
                                </span>
                            )}
                        </div>
                        <p><span className="font-semibold">Email</span> : {currentMember?.emailAddress || 'N/A'}</p>
                        <p><span className="font-semibold">Mobile Number : </span>  {currentMember?.mobileNumber || 'N/A'}</p>
                        <p><span className="font-semibold">Institute : </span>
                            {bscTextileEducation?.institutionName || 'N/A'}
                        </p>
                        <p><span className="font-semibold">Degree : </span>
                            {bscTextileEducation?.degreeName || 'N/A'}
                        </p>
                        <p><span className="font-semibold">Batch : </span>
                            {bscTextileEducation?.batch || 'N/A'}
                        </p>
                        <p><span className="font-semibold">Organization : </span>{currentMember?.organizationName || 'N/A'}</p>
                        <p><span className="font-semibold">Designation : </span>{currentMember?.currentDesignation || 'N/A'}</p>
                    </div>

                    <div className="flex justify-center gap-5 mt-8">
                        <a
                            href={currentMember?.socialLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Facebook"
                            className="relative text-blue-600 text-xl p-3 rounded-full transition-all duration-300 
               hover:bg-blue-100 hover:shadow-lg hover:-translate-y-1
               before:content-[''] before:absolute before:top-0 before:left-0 
               before:w-full before:h-full before:rounded-full before:bg-blue-600 
               before:opacity-0 before:transition-all before:duration-300
               hover:before:scale-125 hover:before:opacity-10"
                        >
                            <FaFacebookF className="relative z-10" />
                        </a>

                        <a
                            href={currentMember?.socialLinks.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="LinkedIn"
                            className="relative text-sky-600 text-xl p-3 rounded-full transition-all duration-300 
               hover:bg-sky-50 hover:shadow-lg hover:-translate-y-1
               before:content-[''] before:absolute before:top-0 before:left-0 
               before:w-full before:h-full before:rounded-full before:bg-sky-600 
               before:opacity-0 before:transition-all before:duration-300
               hover:before:scale-125 hover:before:opacity-10"
                        >
                            <FaLinkedinIn className="relative z-10" />
                        </a>

                        <a
                            href={currentMember?.socialLinks.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Whatsapp"
                            className="relative text-green-600 text-xl p-3 rounded-full transition-all duration-300 
               hover:bg-green-100 hover:shadow-lg hover:-translate-y-1
               before:content-[''] before:absolute before:top-0 before:left-0 
               before:w-full before:h-full before:rounded-full before:bg-green-600 
               before:opacity-0 before:transition-all before:duration-300
               hover:before:scale-125 hover:before:opacity-10"
                        >
                            <FaWhatsapp className="relative z-10" />
                        </a>
                    </div>
                </div>

                {/* Bottom buttons - will stick to bottom */}
                <div className="mt-auto">
                    <div className="flex text-sm font-medium">
                        <button
                            onClick={handleLogout}
                            className="w-1/2 bg-red-600 text-black py-3 flex items-center justify-center gap-2 hover:bg-red-700 transition cursor-pointer uppercase"
                        >
                            <span>🔓</span> Log Out
                        </button>
                        <button
                            onClick={openModal}
                            className="w-1/2 bg-green-100 text-green-500 py-3 hover:bg-green-200 hover:text-green-700 transition cursor-pointer"
                        >
                            Edit Your Information
                        </button>
                    </div>
                </div>
            </div>

            {/* Update Profile Modal */}
            {isModalOpen && currentMember && (
                <UpdateMemberProfileModal
                    currentMember={currentMember}
                    onClose={closeModal}
                    mutate={mutate}
                />
            )}
        </>
    );
}

export default MemberProfile;