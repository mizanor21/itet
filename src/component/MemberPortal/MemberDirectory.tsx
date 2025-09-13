'use client';

import { Tooltip } from 'react-tooltip';
import { useMembersData } from "@/lib/DataFetch/DataFetch";
import { useState } from 'react';
import { HiOutlineEye } from 'react-icons/hi';
import DirectoryMemberDetailsModal from "../Modal/DirectoryMemberDetailsModal";
import { DirectoryData } from "@/types/memberPortalTypes";

// Define items per page options
const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];
const DEFAULT_ITEMS_PER_PAGE = 10;
const PAGINATION_RANGE = 2;

export default function MemberDirectory() {

    const [searchName, setSearchName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [searchBatch, setSearchBatch] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
    const [selectedMember, setSelectedMember] = useState<DirectoryData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: memberDirectoryData = [], isLoading } = useMembersData();

    // Get unique batches from qualifications
    const uniqueBatches = [...new Set(
        memberDirectoryData.flatMap(member =>
            member.qualifications?.map(qual => qual.batch) || []
        )
    )].filter((b): b is string => !!b);

    const approvedMembers = memberDirectoryData.filter(item => item.approveType === "Approved");

    const filteredData = approvedMembers.filter((member) => {
        const nameMatch = member.fullName?.toLowerCase().includes(searchName.toLowerCase());
        const emailMatch = searchEmail === '' ||
            (member.emailAddress &&
                member.emailAddress.toLowerCase().includes(searchEmail.toLowerCase()));
        const batchMatch = searchBatch === 'ALL' ||
            member.qualifications?.some(qual => qual.batch === searchBatch);

        return nameMatch && emailMatch && batchMatch;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const getPaginationNumbers = () => {
        const pages: (number | string)[] = [];
        const startPage = Math.max(1, currentPage - PAGINATION_RANGE);
        const endPage = Math.min(totalPages, currentPage + PAGINATION_RANGE);

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) {
                pages.push('...');
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push('...');
            }
            pages.push(totalPages);
        }

        return pages;
    };

    const handleReset = () => {
        setSearchName('');
        setSearchEmail('');
        setSearchBatch('ALL');
        setCurrentPage(1);
        setItemsPerPage(DEFAULT_ITEMS_PER_PAGE);
    };

    const handleViewMember = (member: DirectoryData) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMember(null);
    };

    return (
        <div className="w-full">
            <h1 className="text-xl font-medium mb-4 text-gray-900">Members Directory</h1>

            {/* Filter Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-md shadow text-gray-900">
                <div>
                    <label htmlFor="name-search" className="block text-sm font-medium mb-1">Name</label>
                    <input
                        id="name-search"
                        type="text"
                        placeholder="Type Member's Name"
                        value={searchName}
                        onChange={(e) => {
                            setSearchName(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
                <div>
                    <label htmlFor="batch-select" className="block text-sm font-medium mb-1">Batch</label>
                    <select
                        id="batch-select"
                        className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 "
                        value={searchBatch}
                        onChange={(e) => {
                            setSearchBatch(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="ALL">ALL</option>
                        {uniqueBatches.map(batch => (
                            <option key={batch} value={batch}>{batch}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="email-search" className="block text-sm font-medium mb-1">Email</label>
                    <input
                        id="email-search"
                        type="text"
                        placeholder="Search Email"
                        value={searchEmail}
                        onChange={(e) => {
                            setSearchEmail(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
                <div className="flex items-end">
                    <button
                        onClick={handleReset}
                        className="w-full bg-[#ff640a] hover:bg-[#ff9d0a] text-gray-900 py-2 px-4 rounded-md transition-colors text-sm cursor-pointer font-medium"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* Items per page selector */}
            <div className="mt-4 flex justify-between items-center text-gray-800">
                <div className="text-sm text-gray-600">
                    Total {filteredData.length} members found
                </div>
                <div className="flex items-center space-x-2">
                    <label htmlFor="items-per-page" className="text-sm text-gray-600">
                        Show:
                    </label>
                    <select
                        id="items-per-page"
                        value={itemsPerPage}
                        onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                        className="border border-gray-300 rounded p-1 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                    >
                        {ITEMS_PER_PAGE_OPTIONS.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <span className="text-sm text-gray-600">per page</span>
                </div>
            </div>

            {/* Table */}
            <div className="mt-2 overflow-x-auto rounded-lg shadow-sm border border-gray-200">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#f2e5d1]">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider w-12">No.</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Email</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Batch</th>
                                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-900 uppercase tracking-wider w-24">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                                            <div className="flex justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : paginatedData.length > 0 ? (
                                    paginatedData.map((member, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">
                                                {(currentPage - 1) * itemsPerPage + index + 1}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">{member.fullName}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">{member.emailAddress}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    {member.qualifications?.length ? (
                                                        member.qualifications
                                                            .filter(qual => qual.degreeName === "BSC in Textile Engineering")
                                                            .sort((a, b) => (b.passingYear || 0) - (a.passingYear || 0))
                                                            .slice(0, 1)
                                                            .map((qual, i) => (
                                                                <div key={i} className="mb-1 last:mb-0">
                                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-800">
                                                                        {qual.batch || 'N/A'}
                                                                        {qual.passingYear && (
                                                                            <span className="ml-1 text-purple-600">
                                                                                ({qual.passingYear})
                                                                            </span>
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            ))
                                                    ) : (
                                                        <span className="text-gray-400 text-xs">No BSC Textile batch</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-xs text-right">
                                                <button
                                                    onClick={() => handleViewMember(member)}
                                                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-full  text-green-600 bg-emerald-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 cursor-pointer"
                                                    data-tooltip-id="member-view-tooltip"
                                                    data-tooltip-content="Member Details"
                                                >
                                                    <HiOutlineEye className="mr-1 h-4 w-4" />
                                                    View
                                                </button>
                                                <Tooltip id="member-view-tooltip" />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                                            <div className="flex flex-col items-center justify-center py-6">
                                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                <p className="mt-2 text-sm font-medium text-gray-600">No members found matching your criteria</p>
                                                <button
                                                    onClick={handleReset}
                                                    className="mt-2 text-xs text-orange-600 hover:text-orange-800 hover:underline"
                                                >
                                                    Reset filters
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            {filteredData.length > itemsPerPage && (
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4 px-2 pb-10">
                    <div className="text-sm text-gray-600">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                        {Math.min(currentPage * itemsPerPage, filteredData.length)} of{' '}
                        {filteredData.length} members
                    </div>
                    <div className="flex flex-wrap justify-center gap-1 text-sky-500">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 border rounded cursor-pointer text-xs sm:text-sm ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'bg-white hover:bg-gray-50'}`}
                        >
                            Previous
                        </button>

                        {getPaginationNumbers().map((page, index) => (
                            typeof page === 'string' ? (
                                <span key={`ellipsis-${index}`} className="px-2 py-1 text-xs sm:text-sm">...</span>
                            ) : (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-1 border rounded cursor-pointer text-xs sm:text-sm ${currentPage === page ? 'bg-sky-500 text-white' : 'bg-white hover:bg-gray-50'}`}
                                >
                                    {page}
                                </button>
                            )
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 border rounded cursor-pointer text-xs sm:text-sm ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'bg-white hover:bg-gray-50'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Member Details Modal */}
            <DirectoryMemberDetailsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                member={selectedMember}
            />
        </div>
    );
}