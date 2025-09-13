import { DirectoryData } from "@/types/memberPortalTypes";
import React from 'react';
import { RiMailSendLine, RiCloseLine, RiFacebookFill, RiLinkedinFill, RiWhatsappFill } from 'react-icons/ri';
import Image from 'next/image';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    member: DirectoryData | null;
};

const DirectoryMemberDetailsModal: React.FC<Props> = ({ isOpen, onClose, member }) => {
    if (!isOpen || !member) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 text-gray-700 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                {/* Header with gradient */}
                <div className="bg-gradient-to-tl from-sky-500 to-blue-700 text-white px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold">Member Profile</h2>
                            <p className="text-purple-100 text-sm">Complete member information</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
                        >
                            <RiCloseLine className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto max-h-[calc(92vh-80px)]">
                    <div className="p-6 space-y-6">
                        {/* Profile Header */}
                        <div className="bg-gradient-to-br from-stone-100 to-white-50 rounded-2xl p-6 border border-sky-100">
                            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                                {/* Profile Image */}
                                {member.personImage && (
                                    <div className="relative group">
                                        <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-8 border-white shadow-xl">
                                            <Image
                                                src={member.personImage}
                                                alt={member.fullName}
                                                fill
                                                className="group-hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 160px) 100vw"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Name and Blood Group */}
                                <div className="flex-1 text-center lg:text-left space-y-3">
                                    <h1 className="text-3xl font-medium text-gray-800">{member.fullName}</h1>
                                    <p className="text-gray-600 text-md ">
                                        <span className="font-medium">Membership ID : </span>
                                        {member.membershipID}
                                    </p>
                                    <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
                                        <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                                        Blood Group: {member.bloodGroup}
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="flex flex-col items-center lg:items-end space-y-3">
                                    <h3 className="text-sm font-semibold text-gray-600">Connect via</h3>
                                    <div className="flex space-x-3">
                                        {member.socialLinks?.facebook && (
                                            <a
                                                href={member.socialLinks.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition-colors duration-200"
                                            >
                                                <RiFacebookFill className="w-5 h-5" />
                                            </a>
                                        )}
                                        {member.socialLinks?.linkedIn && (
                                            <a
                                                href={member.socialLinks.linkedIn}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-blue-100 rounded-full text-blue-700 hover:bg-blue-200 transition-colors duration-200"
                                            >
                                                <RiLinkedinFill className="w-5 h-5" />
                                            </a>
                                        )}
                                        {member.socialLinks?.whatsapp && (
                                            <a
                                                href={`https://wa.me/${member.socialLinks.whatsapp}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-green-100 rounded-full text-green-600 hover:bg-green-200 transition-colors duration-200"
                                            >
                                                <RiWhatsappFill className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <Section title="Personal Information" icon="👤">
                                <DetailCard label="Date of Birth" value={new Date(member.dateOfBirth).toLocaleDateString()} />
                                <DetailCard label="Mobile Number" value={member.mobileNumber} />
                                <DetailCard label="Father's Name" value={member.fathersOrHusbandsName} />
                                <DetailCard label="Mother's Name" value={member.mothersName} />
                                <DetailCard label="Spouse Name" value={member.spouseName} />
                                <DetailCard label="Nationality" value={member.nationality} />
                                <DetailCard label="Gender" value={member.gender} />
                            </Section>

                            {/* Contact & Membership Info */}
                            <Section title="Contact & Membership" icon="📧">
                                <DetailCard label="Email" value={member.emailAddress} />
                                <DetailCard label="Mailing Address" value={member.mailingAddress} />
                                <DetailCard label="Membership Type" value={member.membershipType} />
                                <DetailCard label="Status" value={member.status} statusBadge />
                                <DetailCard label="Start Date" value={new Date(member.membershipStartDate).toLocaleDateString()} />
                                <DetailCard label="End Date" value={new Date(member.membershipEndDate).toLocaleDateString()} />
                            </Section>
                        </div>

                        {/* Qualifications Table */}
                        {member.qualifications?.length > 0 && (
                            <Section title="Education & Qualifications" icon="🎓" fullWidth>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 rounded-tl-lg">Degree</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Institution</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Major/Group</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Batch</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 rounded-tr-lg">Year</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {member.qualifications.map((qual, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50 transition-colors duration-150">
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{qual.degreeName}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{qual.institutionName}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{qual.groupMajor}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{qual.batch || 'N/A'}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{qual.passingYear}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Section>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                        <div className="flex flex-col sm:flex-row justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                            >
                                Close
                            </button>
                            <a
                                href={`mailto:${member.emailAddress}`}
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white flex items-center justify-center gap-2 hover:from-sky-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <RiMailSendLine className="w-5 h-5" />
                                Send Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Section = ({
    title,
    icon,
    children,
    fullWidth = false
}: {
    title: string;
    icon?: string;
    children: React.ReactNode;
    fullWidth?: boolean;
}) => (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden ${fullWidth ? 'lg:col-span-2' : ''}`}>
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                {icon && <span className="text-xl">{icon}</span>}
                {title}
            </h3>
        </div>
        <div className="p-6 space-y-4">
            {children}
        </div>
    </div>
);

const DetailCard = ({
    label,
    value,
    statusBadge = false
}: {
    label: string;
    value: React.ReactNode;
    statusBadge?: boolean;
}) => (
    <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
        <span className="font-medium text-gray-700 text-sm">{label}</span>
        <span className="text-gray-900 text-right text-sm font-medium">
            {statusBadge && value ? (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${value === 'Active' ? 'bg-green-100 text-green-800' :
                    value === 'Inactive' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                    {value}
                </span>
            ) : (
                value || 'N/A'
            )}
        </span>
    </div>
);

export default DirectoryMemberDetailsModal;