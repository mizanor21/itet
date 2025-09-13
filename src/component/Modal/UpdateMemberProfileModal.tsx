'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { DirectoryData } from "@/types/memberPortalTypes";
import { toast } from "react-hot-toast";
import { KeyedMutator } from "swr";
import { IoClose } from "react-icons/io5";

type FormData = {
    // Personal Information
    fullName: string;
    personImage: string;
    dateOfBirth: string;
    fathersOrHusbandsName: string;
    mothersName: string;
    spouseName: string;
    nidOrPassport: string;
    mailingAddress: string;
    bloodGroup: string;
    nationality: string;
    gender: string;

    // Contact Information
    mobileNumber: string;
    officeMobileNumber: string;
    emergencyContactNumber: string;
    officeAddress: string;

    // Professional Information
    designation: string;
    department: string;
    organizationName: string;

    // Social Media Links
    socialLinks: {
        facebook: string;
        linkedIn: string;
        whatsapp: string;
    };
};

type UpdateMemberProfileModalProps = {
    currentMember: DirectoryData;
    onClose: () => void;
    mutate: KeyedMutator<DirectoryData>
};

const UpdateMemberProfileModal = ({ currentMember, onClose, mutate }: UpdateMemberProfileModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedImage, setUploadedImage] = useState<{ url: string, public_id: string } | null>(null);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
        defaultValues: {
            // Personal Information
            fullName: currentMember.fullName || "",
            personImage: currentMember.personImage || "",
            dateOfBirth: currentMember.dateOfBirth ? new Date(currentMember.dateOfBirth).toISOString().split('T')[0] : "",
            fathersOrHusbandsName: currentMember.fathersOrHusbandsName || "",
            mothersName: currentMember.mothersName || "",
            spouseName: currentMember.spouseName || "",
            nidOrPassport: currentMember.nidOrPassport || "",
            mailingAddress: currentMember.mailingAddress || "",
            bloodGroup: currentMember.bloodGroup || "",
            nationality: currentMember.nationality || "",
            gender: currentMember.gender || "",

            // Contact Information
            mobileNumber: currentMember.mobileNumber || "",
            officeMobileNumber: currentMember.officeMobileNumber || "",
            emergencyContactNumber: currentMember.emergencyContactNumber || "",
            officeAddress: currentMember.officeAddress || "",

            // Professional Information
            designation: currentMember.currentDesignation || "",
            department: currentMember.department || "",
            organizationName: currentMember.organizationName || "",

            // Social Media Links
            socialLinks: {
                facebook: currentMember.socialLinks?.facebook || "",
                linkedIn: currentMember.socialLinks?.linkedIn || "",
                whatsapp: currentMember.socialLinks?.whatsapp || ""
            }
        }
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

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

        setIsLoading(true);
        setUploadProgress(0);

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
            setValue("personImage", uploaded.secure_url);
            toast.success("Image uploaded successfully");

        } catch (err) {
            console.error("Image upload failed", err);
            toast.error("Image upload failed");
        } finally {
            setIsLoading(false);
            setUploadProgress(0);
        }
    };

    // Handle data update in db
    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        try {
            const updatedData = {
                fullName: data.fullName,
                personImage: data.personImage,
                dateOfBirth: data.dateOfBirth,
                fathersOrHusbandsName: data.fathersOrHusbandsName,
                mothersName: data.mothersName,
                spouseName: data.spouseName,
                nidOrPassport: data.nidOrPassport,
                mailingAddress: data.mailingAddress,
                bloodGroup: data.bloodGroup,
                nationality: data.nationality,
                gender: data.gender,

                // Contact Information
                mobileNumber: data.mobileNumber,
                officeMobileNumber: data.officeMobileNumber,
                emergencyContactNumber: data.emergencyContactNumber,
                officeAddress: data.officeAddress,

                // Professional Information
                currentDesignation: data.designation,
                department: data.department,
                organizationName: data.organizationName,

                // Social Links
                socialLinks: {
                    facebook: data.socialLinks.facebook,
                    linkedIn: data.socialLinks.linkedIn,
                    whatsapp: data.socialLinks.whatsapp,
                },
            };

            // Use email or membershipID instead of _id
            const identifier =
                currentMember.emailAddress ||
                currentMember.membershipID ||
                currentMember._id;

            const response = await fetch(`/api/members/${identifier}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update profile');
            }

            toast.success('Profile updated successfully');
            mutate();
            onClose();
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Failed to update profile. Please try again.';

            console.error('Error updating profile:', error);
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 text-gray-600"
           >
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Update Profile Information</h3>
                        <button
                            onClick={onClose}
                            title="Close"
                            className="text-gray-500 hover:text-rose-500 bg-stone-50 rounded p-1 cursor-pointer">
                            <IoClose className="text-2xl" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-6">
                            {/* Personal Information Section */}
                            <div>
                                <h4 className="text-md font-medium text-gray-800 mb-3 pb-2 border-b">Personal Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                                        <input
                                            type="text"
                                            {...register("fullName", { required: "Full name is required" })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                        <input
                                            type="date"
                                            {...register("dateOfBirth")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Father/Husband Name</label>
                                        <input
                                            type="text"
                                            {...register("fathersOrHusbandsName")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        {errors.fathersOrHusbandsName && <p className="text-red-500 text-xs mt-1">{errors.fathersOrHusbandsName.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                                        <input
                                            type="text"
                                            {...register("mothersName")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        {errors.mothersName && <p className="text-red-500 text-xs mt-1">{errors.mothersName.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Spouse Name</label>
                                        <input
                                            type="text"
                                            {...register("spouseName")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">NID/Passport</label>
                                        <input
                                            type="text"
                                            {...register("nidOrPassport")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                                        <select
                                            {...register("bloodGroup")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="">Select</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                                        <input
                                            type="text"
                                            {...register("nationality")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                        <select
                                            {...register("gender")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                                    </div>
                                    <div >
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mailing Address</label>
                                        <input
                                            type="text"
                                            {...register("mailingAddress")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        {errors.mailingAddress && <p className="text-red-500 text-xs mt-1">{errors.mailingAddress.message}</p>}
                                    </div>

                                    {/* Image Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Profile Image <span className="text-gray-500 font-normal text-sm">(Max 10MB, PNG/JPEG)</span>
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 file:mr-4 file:py-1 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            disabled={isLoading}
                                        />
                                        {isLoading && (
                                            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className="bg-blue-600 h-2.5 rounded-full"
                                                    style={{ width: `${uploadProgress}%` }}
                                                ></div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Image Preview */}
                                    <div >
                                        {(uploadedImage?.url || currentMember.personImage) && (
                                            <div className="mb-4">
                                                <p className="text-sm mb-1 text-gray-600">Image Preview:</p>
                                                <img
                                                    src={uploadedImage?.url || currentMember.personImage}
                                                    alt="Preview"
                                                    className="w-28 h-28 object-contain rounded border"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information Section */}
                            <div>
                                <h4 className="text-md font-medium text-gray-800 mb-3 pb-2 border-b">Contact Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                        <input
                                            type="tel"
                                            {...register("mobileNumber")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Office Number</label>
                                        <input
                                            type="tel"
                                            {...register("officeMobileNumber")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                                        <input
                                            type="tel"
                                            {...register("emergencyContactNumber")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Professional Information Section */}
                            <div>
                                <h4 className="text-md font-medium text-gray-800 mb-3 pb-2 border-b">Professional Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                                        <input
                                            type="text"
                                            {...register("designation")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                        <input
                                            type="text"
                                            {...register("department")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                                        <input
                                            type="text"
                                            {...register("organizationName")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        {errors.organizationName && <p className="text-red-500 text-xs mt-1">{errors.organizationName.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
                                        <input
                                            type="text"
                                            {...register("officeAddress")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Links Section */}
                            <div>
                                <h4 className="text-md font-medium text-gray-800 mb-3 pb-2 border-b">Social Media Links</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Facebook</label>
                                        <input
                                            type="url"
                                            {...register("socialLinks.facebook")}
                                            placeholder="Enter URL"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">LinkedIn</label>
                                        <input
                                            type="url"
                                            {...register("socialLinks.linkedIn")}
                                            placeholder="Enter URL"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">WhatsApp</label>
                                        <input
                                            type="url"
                                            {...register("socialLinks.whatsapp")}
                                            placeholder="Enter URL"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateMemberProfileModal;