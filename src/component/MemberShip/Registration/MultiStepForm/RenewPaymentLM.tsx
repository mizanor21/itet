import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MembersInfo } from "../Membership";
import { toast } from "react-hot-toast"; 

type PaymentStepProps = {
    member: MembersInfo;
};

type PaymentSlipUploadProps = {
    name: string;
    register: ReturnType<typeof useFormContext>['register'];
    setValue: ReturnType<typeof useFormContext>['setValue'];
    errors: Record<string, any>;
    hasTransactionId: boolean;
};

const PaymentSlipUpload = ({ name, register, setValue, errors, hasTransactionId }: PaymentSlipUploadProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    interface CloudinaryUploadResponse {
        secure_url: string;
        [key: string]: any;
    }

    const handleFileChange = async (file: File | null): Promise<void> => {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file (JPG, PNG, etc.)');
            return;
        }

        // Validate file size (max 10MB for payment slips)
        if (file.size > 10 * 1024 * 1024) {
            toast.error('File size must be less than 10MB');
            return;
        }

        setPreview(URL.createObjectURL(file));
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "habson");

            const response: Response = await fetch(
                "https://api.cloudinary.com/v1_1/dov6k7xdk/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) throw new Error("Upload failed");

            const data: CloudinaryUploadResponse = await response.json();
            setValue(name, data.secure_url);
            toast.success("Payment slip uploaded successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("Failed to upload payment slip");
            setPreview(null);
        } finally {
            setUploading(false);
        }
    };

    interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> { }

    const handleInputChange = (e: InputChangeEvent): void => {
        if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0]);
        }
    };

    interface DropEvent extends React.DragEvent<HTMLDivElement> { }

    const handleDrop = (e: DropEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    interface DragEvent extends React.DragEvent<HTMLDivElement> { }

    interface HandleDragEvent extends DragEvent { }

    const handleDrag = (e: HandleDragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const removeImage = () => {
        setPreview(null);
        setValue(name, "");
        const fileInput = document.getElementById(name) as HTMLInputElement | null;
        if (fileInput) fileInput.value = "";
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 mb-3">
                <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 011 1v1H3V5a1 1 0 011-1h3z" />
                    </svg>
                    Payment Slip Upload
                    {!hasTransactionId && <span className="text-red-500 ml-1">*</span>}
                </span>
            </label>

            <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${dragActive
                    ? "border-green-400 bg-green-50"
                    : preview
                        ? "border-green-300 bg-green-50"
                        : "border-gray-300 hover:border-green-400 hover:bg-green-25"
                    } ${uploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !uploading && document.getElementById(name)?.click()}
            >
                <input
                    id={name}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    {...register(name, {
                        validate: (value) => {
                            if (!hasTransactionId && !value) {
                                return "Payment slip is required when transaction ID is not provided";
                            }
                            return true;
                        },
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files && e.target.files[0]) {
                                handleFileChange(e.target.files[0]);
                            }
                        }
                    })}
                />

                {uploading ? (
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500 mb-3"></div>
                        <p className="text-sm text-gray-600">Uploading payment slip...</p>
                        <p className="text-xs text-gray-500">Please wait...</p>
                    </div>
                ) : preview ? (
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Payment Slip Preview"
                            className="mx-auto h-40 w-auto max-w-full object-contain rounded-lg shadow-md"
                        />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeImage();
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 text-xs hover:bg-red-600 transition-colors shadow-lg"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="mt-3 space-y-1">
                            <p className="text-sm text-green-600 font-medium flex items-center justify-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Payment slip uploaded successfully!
                            </p>
                            <p className="text-xs text-gray-500">Click to change image</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-3">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-base font-medium text-gray-700">
                                <span className="text-green-600 hover:text-green-500 font-semibold">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Upload your payment slip image
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                PNG, JPG, JPEG up to 10MB
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {errors[name] && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors[name].message as string}
                </p>
            )}
        </div>
    );
};

const RenewPaymentLM: React.FC<PaymentStepProps> = ({ member }) => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext();


    // Initialize form values
    useEffect(() => {
        if (member?.title) {
            setValue("membershipType", member.title);
        }
        if (member?.price) {
            setValue("price", member.price);
        }
    }, [member, setValue]);

    const paymentMethod = watch("paymentMethod");
    const paymentSlip = watch("paymentSlip");
    const transactionId = watch("transactionId");

    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
            <div className="">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Membership Confirmation & Payment
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Complete your payment information to finalize your membership registration
                    </p>
                </div>

                {/* Membership Fee Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8 transform hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Membership Fee</h3>
                                <p className="text-gray-600">One-time payment required</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-green-600">{member?.price}</p>
                            <p className="text-sm text-gray-500">Total Amount</p>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">



                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Membership Type {member?.title}
                                    <span className="text-red-500 ml-1">*</span>
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    {...register("membershipType", {
                                        required: "Membership type is required",
                                    })}
                                    readOnly
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${errors.membershipType
                                        ? "border-red-400 bg-red-50"
                                        : "border-gray-200 hover:border-blue-300 focus:border-blue-500"
                                        }`}
                                />
                            </div>

                            {errors.membershipType && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {errors.membershipType.message as string}
                                </p>
                            )}
                        </div>

                        {/* Payment Method */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    Payment Method
                                    <span className="text-red-500 ml-1">*</span>
                                </span>
                            </label>
                            <div className="relative">
                                <select
                                    {...register("paymentMethod", {
                                        required: "Payment method is required",
                                    })}
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${errors.paymentMethod
                                        ? "border-red-400 bg-red-50"
                                        : "border-gray-200 hover:border-blue-300 focus:border-blue-500"
                                        }`}
                                >
                                    <option value="">Select Payment Method</option>
                                    <option value="Bkash">🏦 Bkash 01715771454</option>
                                    <option value="Bank Transfer">🏛️ Rocket</option>
                                    <option value="Credit Card">💳 Nagad</option>
                                </select>
                            </div>
                            {errors.paymentMethod && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {errors.paymentMethod.message as string}
                                </p>
                            )}
                        </div>

                        {/* Payment Verification Section */}
                        <div className="lg:col-span-2">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Payment Verification
                                    <span className="text-red-500 ml-2">* (Choose one option)</span>
                                </h3>
                                <p className="text-sm text-gray-600 mb-6">
                                    Please provide either a Payment Slip Image OR Transaction ID to verify your payment.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Payment Slip Upload */}
                                    <PaymentSlipUpload
                                        name="paymentSlip"
                                        register={register}
                                        setValue={setValue}
                                        errors={errors}
                                        hasTransactionId={!!transactionId}
                                    />

                                    {/* OR Divider */}
                                    <div className="md:col-span-2 flex items-center justify-center my-4">
                                        <div className="flex items-center w-full">
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-pink-300"></div>
                                            <div className="px-6 py-3 bg-white rounded-full border-2 border-pink-300 shadow-sm">
                                                <span className="text-sm font-bold text-pink-600">OR</span>
                                            </div>
                                            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-pink-300"></div>
                                        </div>
                                    </div>

                                    {/* Transaction ID */}
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            <span className="flex items-center">
                                                <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                                </svg>
                                                Transaction ID
                                                {!paymentSlip && <span className="text-red-500 ml-1">*</span>}
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                {...register("transactionId", {
                                                    validate: (value) => {
                                                        if (!paymentSlip && !value) {
                                                            return "Either Payment Slip or Transaction ID is required";
                                                        }
                                                        if (value && value.length < 4) {
                                                            return "Transaction ID must be at least 4 characters";
                                                        }
                                                        return true;
                                                    }
                                                })}
                                                className={`w-full px-4 py-3 pl-10 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-100 ${transactionId
                                                    ? "border-purple-400 bg-purple-50"
                                                    : errors.transactionId
                                                        ? "border-red-400 bg-red-50"
                                                        : "border-gray-200 hover:border-purple-300 focus:border-purple-500"
                                                    }`}
                                                placeholder="Enter transaction ID"
                                            />
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 011 1v1H3V5a1 1 0 011-1h3z" />
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.transactionId && (
                                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {errors.transactionId.message as string}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Specific Information */}
                    {paymentMethod === "Bkash" && (
                        <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Bkash Payment Instructions</h4>
                                    <p className="text-blue-100 leading-relaxed">
                                        Please send your payment to Bkash number: <span className="font-bold text-white">01715771454</span>
                                    </p>
                                    <p className="text-blue-100 text-sm mt-2">
                                        After completing the payment, please upload the payment slip screenshot or enter the transaction ID above.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {paymentMethod === "Bank Transfer" && (
                        <div className="mt-8 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Bank Transfer Instructions</h4>
                                    <p className="text-green-100 leading-relaxed">
                                        Please transfer the amount to our designated bank account and upload the payment slip or provide the transaction reference.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {paymentMethod === "Credit Card" && (
                        <div className="mt-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Credit Card Payment</h4>
                                    <p className="text-purple-100 leading-relaxed">
                                        Secure credit card payment processing. Upload your payment confirmation or provide the transaction reference.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RenewPaymentLM;