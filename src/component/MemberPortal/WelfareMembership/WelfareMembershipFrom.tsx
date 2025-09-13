'use client'

import LoadingSpinner from "@/component/LoadingSpinner/LoadingSpinner";
import useCurrentMembers from "@/hooks/useCurrentMembers";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";

// Define TypeScript interface
interface WelfareFormData {
    paymentMethod: string;
    transactionId: string;
    amount: number;
    paymentScreenshot: string;
}

const WelfareMembershipForm = () => {
    const [currentMember, isLoading] = useCurrentMembers();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<{ url: string, public_id: string } | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<WelfareFormData>();

    const paymentMethod = watch("paymentMethod");

    // Handle file upload and preview
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            toast.error("File size exceeds 10MB limit");
            return;
        }

        // Validate file type
        if (!file.type.match(/^image\/(jpeg|png|jpg)$/)) {
            toast.error("Only JPEG and PNG images are allowed");
            return;
        }

        setIsImageLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "habson");

        try {
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dov6k7xdk/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const uploaded = await response.json();
            setUploadedImage({
                url: uploaded.secure_url,
                public_id: uploaded.public_id,
            });

            // Update form value
            setValue("paymentScreenshot", uploaded.secure_url);
            toast.success("Image uploaded successfully");

        } catch (err) {
            console.error("Image upload failed", err);
            toast.error("Image upload failed");
        } finally {
            setIsImageLoading(false);
        }
    };

    // Handle form submission
    const onSubmit = async (data: WelfareFormData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Prepare form data for submission
            const submissionData = {
                welfareMember: {
                    paymentMethod: data.paymentMethod,
                    transactionId: data.transactionId,
                    amount: data.amount,
                    paymentScreenshot: uploadedImage?.url || "",
                },
                welfareMembership: true
            };

            // Use email or membershipID instead of _id
            const identifier =
                currentMember?.emailAddress ||
                currentMember?.membershipID ||
                currentMember?._id;

            if (!identifier) {
                throw new Error("Member identifier not found");
            }

            const response = await fetch(`/api/members/${identifier}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Submission successful:", result);
            setSubmitSuccess(true);
            toast.success("Application submitted successfully!");
        } catch (error) {
            console.error("Submission error:", error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            setSubmitError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    if (!currentMember) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800">
                <div className="text-center py-8">
                    <h2 className="text-xl font-medium text-red-600">No member data available</h2>
                    <p className="mt-2 text-gray-600">Please ensure you're logged in and have an active membership.</p>
                </div>
            </div>
        );
    }

    // Check if user is already a welfare member
    if (currentMember.welfareMembership) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800">
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-medium text-gray-800 mb-2">You are a Welfare Trust Member!</h2>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
                        <h3 className="text-lg font-semibold mb-3 text-gray-700">Your Welfare Membership Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Status</p>
                                <p className="font-medium capitalize">{currentMember.welfareApprovedType || "Pending"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Payment Method</p>
                                <p className="font-medium">{currentMember.welfareMember?.paymentMethod || "Not specified"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Transaction ID</p>
                                <p className="font-medium">{currentMember.welfareMember?.transactionId || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Amount Paid</p>
                                <p className="font-medium">{currentMember.welfareMember?.amount ? `BDT ${currentMember.welfareMember.amount}` : "Not specified"}</p>
                            </div>
                            {currentMember.welfareMembershipStartDate && (
                                <div>
                                    <p className="text-sm text-gray-600">Approved On</p>
                                    <p className="font-medium">{new Date(currentMember.welfareMembershipStartDate).toLocaleDateString()}</p>
                                </div>
                            )}
                            {currentMember.welfareMember?.createdAt && (
                                <div>
                                    <p className="text-sm text-gray-600">Applied On</p>
                                    <p className="font-medium">{new Date(currentMember.welfareMember.createdAt).toLocaleDateString()}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <p className="mt-6 text-gray-600">
                        Thank you for being a valued member of our welfare trust. Your support helps us make a difference.
                    </p>
                </div>
            </div>
        );
    }

    if (submitSuccess) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800">
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-medium text-gray-800 mb-2">Application Submitted Successfully!</h2>
                    <p className="text-gray-600">Your welfare membership application has been received. We'll process it shortly.</p>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800">
            <h2 className="text-2xl font-medium mb-6 text-gray-800">Welfare Membership Payment</h2>
            <p className="mb-6 p-3 bg-blue-50 rounded-md text-blue-700 border border-blue-100">
                To become a welfare member, please make a one-time payment of TK: 2040 BDT.
            </p>

            {/* User Information */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Membership ID</p>
                        <p className="font-medium">{currentMember.membershipID || "Not provided"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium">{currentMember.fullName || "Not provided"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{currentMember.emailAddress || "Not provided"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{currentMember.mobileNumber || "Not provided"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Membership Type</p>
                        <p className="font-medium">{currentMember.membershipType || "Not provided"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Welfare member status</p>
                        <p className="font-medium">{currentMember.welfareMember?.welfareStatus || "Not a welfare member"}</p>
                    </div>
                </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'Bkash' ? 'border-sky-500 bg-sky-50' : 'border-gray-300 hover:border-gray-400'}`}>
                            <input
                                type="radio"
                                value="Bkash-01715771454"
                                {...register("paymentMethod", { required: "Please select a payment method" })}
                                className="h-4 w-4 text-sky-600 focus:ring-sky-500"
                            />
                            <span className="ml-3 text-sm font-medium text-gray-700">Bkash 01715771454</span>
                        </label>

                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'Nagad' ? 'border-sky-500 bg-sky-50' : 'border-gray-300 hover:border-gray-400'}`}>
                            <input
                                type="radio"
                                value="Nagad"
                                {...register("paymentMethod", { required: "Please select a payment method" })}
                                className="h-4 w-4 text-sky-600 focus:ring-sky-500"
                            />
                            <span className="ml-3 text-sm font-medium text-gray-700">Nagad</span>
                        </label>

                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'Bank Transfer' ? 'border-sky-500 bg-sky-50' : 'border-gray-300 hover:border-gray-400'}`}>
                            <input
                                type="radio"
                                value="Bank Transfer"
                                {...register("paymentMethod", { required: "Please select a payment method" })}
                                className="h-4 w-4 text-sky-600 focus:ring-sky-500"
                            />
                            <span className="ml-3 text-sm font-medium text-gray-700">Bank Transfer</span>
                        </label>
                    </div>
                    {errors.paymentMethod && (
                        <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Transaction ID */}
                    <div>
                        <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-2">
                            Transaction ID
                        </label>
                        <input
                            type="text"
                            id="transactionId"
                            {...register("transactionId", {
                                required: "Transaction ID is required",
                                pattern: {
                                    value: /^[A-Z0-9]{8,}$/,
                                    message: "Please enter a valid transaction ID (min 8 characters, letters and numbers only)"
                                }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 transition-colors"
                            placeholder="Enter your transaction ID"
                        />
                        {errors.transactionId && (
                            <p className="mt-1 text-sm text-red-600">{errors.transactionId.message}</p>
                        )}
                    </div>

                    {/* Amount */}
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                            Amount (BDT)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            {...register("amount", {
                                required: "Amount is required",
                                valueAsNumber: true,
                                min: {
                                    value: 2040,
                                    message: "Amount must be at least 2040 BDT"
                                }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 transition-colors"
                            placeholder="2040"
                            defaultValue={2040}
                        />
                        {errors.amount && (
                            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                        )}
                    </div>

                    {/* Payment Screenshot Upload */}
                    <div>
                        <label htmlFor="paymentScreenshot" className="block text-sm font-medium text-gray-700 mb-2">
                            Payment Screenshot {isImageLoading && <FaSpinner className="animate-spin inline ml-2" />}
                        </label>
                        <input
                            type="file"
                            id="paymentScreenshot"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-500 hover:file:bg-sky-100 transition-colors"
                        />
                        <input
                            type="hidden"
                            {...register("paymentScreenshot")}
                        />
                        {errors.paymentScreenshot && (
                            <p className="mt-1 text-sm text-red-600">{errors.paymentScreenshot.message}</p>
                        )}
                    </div>

                    {/* Image Preview */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image Preview</label>
                        {imagePreview ? (
                            <div className="mt-1">
                                <img
                                    src={imagePreview}
                                    alt="Payment screenshot preview"
                                    className="h-32 object-contain border rounded-md"
                                />
                            </div>
                        ) : (
                            <div className="h-32 flex items-center justify-center border border-dashed border-gray-300 rounded-md bg-gray-50">
                                <p className="text-gray-500 text-sm">Preview will appear here</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Error message */}
                {submitError && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
                        <p className="font-medium">Error: {submitError}</p>
                        <p className="text-sm mt-1">Please check your information and try again.</p>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting || isImageLoading}
                    className="w-full bg-gradient-to-b from-orange-500 hover:from-amber-600 to-amber-500 hover:to-orange-900 text-white py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:bg-orange-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <FaSpinner className="animate-spin" />
                            <span className="ml-2">Processing...</span>
                        </span>
                    ) : (
                        "Apply for Welfare Membership"
                    )}
                </button>
            </form>
        </div>
    );
};

export default WelfareMembershipForm;