'use client';
import { useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MembersInfo } from "../Membership";
import Swal from 'sweetalert2';
import toast from "react-hot-toast";
import RenewPayment from "./RenewPayment";
import { FaCheckCircle, FaEnvelope, FaIdCard } from "react-icons/fa";


// Types
type RenewFormProps = {
  member: MembersInfo;
};

type MemberData = {
  id: string;
  membershipID?: string;
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  membershipType: string;
  membershipEndDate: string;
  isActive: boolean;
};

// Schema
const renewalSchema = z.object({
  membershipType: z.string().min(1, "Membership type is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  paymentSlip: z.string().optional(),
  transactionId: z.string().min(6, "Transaction ID must be at least 6 characters")
}).refine(data => data.paymentSlip || data.transactionId, {
  message: "Either payment slip or transaction ID is required",
  path: ["paymentSlip"]
});

type RenewFormValues = z.infer<typeof renewalSchema>;

const RenewForm = ({ member }: RenewFormProps) => {
  // State
  const [step, setStep] = useState<'verify' | 'payment' | 'confirmation'>('verify');
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<RenewFormValues | null>(null);
  const [memberID, setMemberID] = useState("");

  // Form methods
  const methods = useForm<RenewFormValues>({
    resolver: zodResolver(renewalSchema),
    mode: "onBlur",
    defaultValues: {
      membershipType: "",
      paymentMethod: "",
      paymentSlip: "",
      transactionId: "",
    },
  });

  const { handleSubmit, setValue, watch } = methods;



  // Member verification
  const verifyMember = useCallback(async () => {
    const { value: memberId, isConfirmed } = await Swal.fire({
      title: "Verify Existing Membership",
      html: `
        <div class="text-left">
          <p>Please enter your member ID or Email to verify your existing membership.</p>
          <p class="text-sm text-sky-600 mt-2">Your member ID was provided when you first joined.</p>
        </div>
      `,
      input: "text",
      inputPlaceholder: "Enter Member ID (GM-00001) or Email",
      inputAttributes: { autocapitalize: "off", autocorrect: "off" },
      showCancelButton: true,
      confirmButtonText: "Verify",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: async (id) => {
        if (!id) {
          Swal.showValidationMessage('Please enter a Member ID or Email');
          return null;
        }

        try {
          const response = await fetch(`/api/members/${id}`);
          if (!response.ok) {
            throw new Error(response.status === 404
              ? 'Member ID or Email not found. Please check and try again.'
              : 'Verification service unavailable. Please try again.'
            );
          }
          setMemberID(id);
          return await response.json();
        } catch (error) {
          Swal.showValidationMessage(
            error instanceof Error ? error.message : 'Verification failed'
          );
          return null;
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });

    if (!isConfirmed || !memberId) return;

    let renewalEligible = true;
    let renewalMessage = "";

    const confirmResult = await Swal.fire({
      title: renewalEligible ? "Verify This Member?" : "Renewal Not Available",
      html: `
        <div class="text-left space-y-2">
          <div><strong>Membership ID:</strong> ${memberId.membershipID}</div>
          <div><strong>Name:</strong> ${memberId.fullName}</div>
          <div><strong>Phone:</strong> ${memberId.mobileNumber}</div>
          <div><strong>Email:</strong> ${memberId.emailAddress}</div>
          ${!renewalEligible ? `<div class="bg-red-50 p-3 rounded-lg mt-3"><p class="text-red-700 text-sm">${renewalMessage}</p></div>` : ''}
          ${renewalEligible ? '<p class="text-sm text-gray-600 mt-3">Is this the correct member to renew?</p>' : ''}
        </div>
      `,
      icon: renewalEligible ? "question" : "warning",
      showCancelButton: renewalEligible,
      confirmButtonText: renewalEligible ? "Yes, Continue to Payment" : "OK",
      cancelButtonText: "No, Try Again"
    });

    if (renewalEligible && confirmResult.isConfirmed) {
      setMemberData({
        id: memberId.id,
        membershipID: memberId.membershipID,
        fullName: memberId.fullName,
        mobileNumber: memberId.mobileNumber,
        emailAddress: memberId.emailAddress,
        membershipType: memberId.membershipType,
        membershipEndDate: memberId.membershipEndDate,
        isActive: memberId.isActive
      });
      setValue('membershipType', memberId.membershipType);
      setStep('payment');
    } else if (renewalEligible && !confirmResult.isConfirmed) {
      await verifyMember();
    }
  }, [setValue]);

  // Form submission
  const onSubmit = async (data: RenewFormValues) => {
    if (!memberData) {
      toast.error("Member verification required");
      return;
    }

    const result = await Swal.fire({
      title: "Ready to Submit Renewal?",
      html: `
        <div class="text-left space-y-3">
          <p>Please review your renewal application:</p>
          <div class="bg-blue-50 p-3 rounded-lg text-sm">
            <p><strong>Member:</strong> ${memberData.fullName}</p>
            <p><strong>Renewing To:</strong> ${data.membershipType}</p>
            <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
            ${data.transactionId && `<p><strong>Transaction ID:</strong> ${data.transactionId}</p>`}
          </div>
          <p class="text-sm text-gray-600">Once submitted, your renewal will be processed.</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Submit Renewal",
      cancelButtonText: "Review Again"
    });

    if (!result.isConfirmed) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/members/${memberID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          approveType: "Re-Pending",
          status: "Inactive",
          reNewType: "GM",
          reNewMember: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(`Error: ${errorData.message || 'Failed to submit renewal'}`);
        throw new Error(errorData.message || `Server error: ${response.status}`);

      }

      await response.json();
      setFormData(data);
      setIsSubmitted(true);
      setStep('confirmation');
      toast.success("Renewal submitted successfully!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step rendering
  if (step === 'confirmation' && isSubmitted) {
    return (
      <FormProvider {...methods}>
        <div className="max-w-4xl mx-auto p-6 bg-white text-gray-900 rounded-lg shadow-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Renewal Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">Your membership renewal application has been received and is being processed.</p>

            {memberData && (
              <div className="bg-gray-50 p-6 rounded-lg text-left max-w-md mx-auto">
                <h3 className="font-semibold mb-3">Renewal Details:</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-600">Member:</span> {memberData.fullName}</div>
                  <div><span className="text-gray-600">Member ID:</span> {memberData.membershipID}</div>
                  <div><span className="text-gray-600">Member:</span>Re New Member for GM</div>
                  <div><span className="text-gray-600">Renewal Type:</span> {formData?.membershipType}</div>
                  {formData?.transactionId && (
                    <div><span className="text-gray-600">Transaction ID:</span> {formData.transactionId}</div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition-colors"
              >
                Submit Another Renewal
              </button>
            </div>
          </div>
        </div>
      </FormProvider>
    );
  }

  if (step === 'verify') {
    return (
      <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center space-y-6">
          <div className="mx-auto flex justify-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
              <FaCheckCircle className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Renew Your Membership</h2>
            <p className="text-gray-500 mt-2">
              Continue enjoying exclusive benefits by renewing your membership
            </p>
          </div>

          <div className="space-y-4 text-left bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <FaIdCard className="text-blue-500" />
              <span className="text-gray-700">Verify with Membership ID or,</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-blue-500" />
              <span className="text-gray-700">Verify with registered email</span>
            </div>
          </div>

          <button
            onClick={verifyMember}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <FaCheckCircle />
            <span>Verify Membership</span>
          </button>

          <p className="text-sm text-gray-400 pt-2">
            Need help? Contact our support team
          </p>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="max-w-4xl mx-auto p-6 bg-white text-gray-900 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Membership Renewal(GM) - Payment</h2>
          {memberData && (
            <div className="bg-lime-50 p-4 rounded-lg">
              <p className="text-md text-lime-600">
                <strong>Renewing membership for:</strong> {memberData.fullName} (ID: {memberData.membershipID})
              </p>
              <p className="text-xs text-lime-500 mt-1">
                Current: {memberData.membershipType} • Expires: {new Date(memberData.membershipEndDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <RenewPayment member={member} />

          <div className="mt-8 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setStep('verify')}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              ← Back to Verification
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 text-sm font-medium text-white rounded cursor-pointer uppercase transition-colors ${isSubmitting
                ? 'bg-green-700 cursor-not-allowed flex items-center'
                : 'bg-green-600 hover:bg-green-700'
                }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Submit Renewal From'
              )}
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default RenewForm;