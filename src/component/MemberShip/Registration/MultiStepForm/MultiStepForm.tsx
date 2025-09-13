'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import { formSchema, type FormValues } from '@/types/formTypes'
import ConfirmationStep from './ConfirmationStep'
import ProgressIndicator from './ProgressIndicator'
import PersonalInfoStep from './PersonalInfoStep'
import ProfessionalInfoStep from './ProfessionalInfoStep'
import ContactAddressStep from './ContactAddressStep'
import AcademicInfoStep from './AcademicInfoStep'
import PaymentStep from './PaymentStep'
import ReviewStep from "./ReviewStep"
import RenewPaymentLM from "./RenewPaymentLM"
import { MembersInfo } from "../Membership"
import { DirectoryData } from "@/types/memberPortalTypes"

type MultiStepFormProps = {
  member: MembersInfo;
};

type FormMode = 'new' | 'renew'

const MultiStepForm: React.FC<MultiStepFormProps> = ({ member }) => {
  // State management
  const [mode, setMode] = useState<FormMode>('new');
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifiedMemberData, setVerifiedMemberData] = useState<DirectoryData | null>(null);

  // Form initialization
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: getDefaultFormValues(),
  });

  const { handleSubmit, reset, trigger, watch } = methods

  // Step validation configuration
  const STEP_VALIDATION_FIELDS = {
    1: ["fullName"],
    2: [],
    3: ["emailAddress"],
    4: [],
    5: ["membershipType", "paymentMethod"],
    6: [],
  } as const

  function getDefaultFormValues(): FormValues {
    return {
      fullName: "",
      personImage: "",
      dateOfBirth: "",
      fathersOrHusbandsName: "",
      mothersName: "",
      spouseName: "",
      nidOrPassport: "",
      mailingAddress: "",
      bloodGroup: "",
      nationality: "Bangladeshi",
      gender: "",
      currentDesignation: "",
      department: "",
      officeAddress: "",
      organizationName: "",
      mobileNumber: "",
      officeMobileNumber: "",
      emergencyContactNumber: "",
      emailAddress: "",
      referencePerson: "",
      referencePersonMobileNumber: "",
      qualifications: [{
        degreeName: "BSC in Textile Engineering",
        institutionName: "",
        groupMajor: "",
        batch: "",
        gpaCgpa: "",
        passingYear: "",
        certificate: "",
      }],
      paymentSlip: "",
      membershipType: "",
      paymentMethod: "",
      transactionId: "",
    }
  };

  const verifyMember = useCallback(async () => {
    if (member?.title !== "Lifetime Member") return;

    try {
      const { value: identifier, isConfirmed } = await Swal.fire({
        title: "Existing Member Verification",
        html: `
        <div class="text-left">
          <p class="mb-2">Please verify your existing membership to renew.</p>
          <p class="text-sm text-blue-600">Your Membership ID was provided when you first joined.</p>
        </div>
      `,
        input: "text",
        inputPlaceholder: "Enter Membership ID or Email",
        showCancelButton: true,
        confirmButtonText: "Verify",
        cancelButtonText: "New Registration",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async (id) => {
          if (!id) {
            Swal.showValidationMessage("⚠️ Please enter Membership ID or Email");
            return null;
          }

          try {
            const response = await fetch(`/api/members/${id}`);
            if (!response.ok) {
              Swal.showValidationMessage("❌ No membership found with that ID or Email");
              return null;
            }
            const data = await response.json();
            return data;
          } catch (error) {
            Swal.showValidationMessage(`❌ Request failed: ${error instanceof Error ? error.message : "Unknown error"}`);
            return null;
          }
        },
      });

      // If user clicked "Verify" and we got data back
      if (isConfirmed && identifier) {
        const confirmation = await Swal.fire({
          title: "Confirm Renewal",
          html: `
          <div class="text-left space-y-2">
            <p><strong>Member ID:</strong> ${identifier.membershipID || "N/A"}</p>
            <p><strong>Name:</strong> ${identifier.fullName}</p>
            <p><strong>Email:</strong> ${identifier.emailAddress}</p>
            <p class="text-sm text-gray-600 mt-2">You'll be redirected to payment.</p>
          </div>
        `,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Continue to Payment",
          cancelButtonText: "Cancel",
        });

        if (confirmation.isConfirmed) {
          setMode("renew");
          setVerifiedMemberData(identifier);
          reset(transformMemberData(identifier));
          toast.success(`Welcome back, ${identifier.fullName}`);
        }
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error(error instanceof Error ? error.message : "Verification failed");
    }
  }, [member, reset]);

  const transformMemberData = (data: DirectoryData): FormValues => {
    return {
      ...getDefaultFormValues(),
      fullName: data.fullName || "",
      personImage: data.personImage || "",
      dateOfBirth: data.dateOfBirth || "",
      fathersOrHusbandsName: data.fathersOrHusbandsName || "",
      mothersName: data.mothersName || "",
      spouseName: data.spouseName || "",
      nidOrPassport: data.nidOrPassport || "",
      mailingAddress: data.mailingAddress || "",
      bloodGroup: data.bloodGroup || "",
      nationality: data.nationality || "Bangladeshi",
      gender: data.gender || "",
      currentDesignation: data.currentDesignation || "",
      department: data.department || "",
      officeAddress: data.officeAddress || "",
      organizationName: data.organizationName || "",
      mobileNumber: data.mobileNumber || "",
      officeMobileNumber: data.officeMobileNumber || "",
      emergencyContactNumber: data.emergencyContactNumber || "",
      emailAddress: data.emailAddress || "",
      referencePerson: data.referencePerson || "",
      referencePersonMobileNumber: data.referencePersonMobileNumber || "",
      qualifications: data.qualifications?.length ? data.qualifications.map(q => ({
        degreeName: q.degreeName || 'BSC in Textile Engineering',
        institutionName: q.institutionName || '',
        groupMajor: q.groupMajor || '',
        batch: q.batch || '',
        gpaCgpa: q.gpaCgpa || '',
        passingYear: q.passingYear?.toString() || '',
        certificate: q.certificate || '',
      })) : getDefaultFormValues().qualifications,
      membershipType: data.membershipType || "",
      paymentMethod: data.paymentMethod || "",
      transactionId: data.transactionId || "",
    }
  }

  const handleSubmitForm = async (data: FormValues) => {
    setIsSubmitting(true);
    console.log("Starting form submission in mode:", mode);

    try {
      // Validate required fields for renewal
      if (mode === 'renew') {
        if (!verifiedMemberData?.membershipID) {
          throw new Error('Missing membership ID for renewal');
        }
        if (!data.paymentMethod || !data.membershipType) {
          throw new Error('Please complete payment information');
        }
      }

      const endpoint = mode === 'renew'
        ? `/api/members/${verifiedMemberData!.membershipID}`
        : '/api/members';

      const method = mode === 'renew' ? 'PATCH' : 'POST';
      const submissionData = prepareSubmissionData(data);

      console.log("Submitting to:", endpoint, "with method:", method);
      console.log("Submission data:", submissionData);

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Submission successful:", result);

      setFormData(data);
      setIsSubmitted(true);
      await showSuccessAlert(result);

    } catch (error) {
      console.error("Submission error:", error);
      await showErrorAlert(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const prepareSubmissionData = (data: FormValues) => {
    const baseData = {
      ...data,
      qualifications: data.qualifications
        ?.filter(q => q.degreeName && q.institutionName)
        .map(q => ({
          ...q,
          passingYear: q.passingYear ? Number(q.passingYear) : undefined,
        })),
      dateOfBirth: data.dateOfBirth || null,
      updatedAt: new Date().toISOString()
    };

    if (mode === 'renew') {
      return {
        ...baseData,
        approveType: 'Re-Pending',
        status: 'Inactive',
        reNewType: 'LM',
        reNewMember: true,
        membershipStartDate: new Date().toISOString(),
        membershipEndDate: calculateEndDate(data.membershipType)
      };
    }

    return {
      ...baseData,
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };
  };

  const calculateEndDate = (membershipType: string): string => {
    const date = new Date();
    if (membershipType === 'Annual') {
      date.setFullYear(date.getFullYear() + 1);
    } else if (membershipType === 'Lifetime') {
      date.setFullYear(date.getFullYear() + 100); // Practical "lifetime"
    }
    return date.toISOString();
  };

  const showSuccessAlert = async (result: any) => {
    await Swal.fire({
      title: mode === 'renew' ? 'Renewal Successful!' : 'Application Submitted!',
      html: `
        <div class="text-left space-y-2">
          <p class="text-green-600 font-medium">
            ${mode === 'renew'
          ? 'Your membership renewal has been processed.'
          : 'Your application has been received.'}
          </p>
          <div class="bg-green-50 p-3 rounded-lg">
            ${result?.referenceId ? `<p class="text-sm"><strong>Reference:</strong> ${result.referenceId}</p>` : ''}
            ${verifiedMemberData?.membershipID ? `<p class="text-sm"><strong>Member ID:</strong> ${verifiedMemberData.membershipID}</p>` : ''}
          </div>
        </div>
      `,
      icon: 'success'
    });
  };

  const showErrorAlert = async (error: unknown) => {
    await Swal.fire({
      title: "Submission Failed",
      html: `
      <div class="text-left">
        <p>We couldn't process your ${mode === "renew" ? "renewal" : "application"}.</p>
        <div class="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded">
          <span>
            ${error instanceof Error ? error.message : "Please try again later."}
          </span>
        </div>
      </div>
    `,
      icon: "error",
    });
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    const fieldsToValidate = STEP_VALIDATION_FIELDS[step as keyof typeof STEP_VALIDATION_FIELDS];
    if (fieldsToValidate.length === 0) return true;

    const isValid = await trigger(fieldsToValidate as any);
    if (!isValid) {
      toast.error("Please fill all required fields before proceeding.");
    }
    return isValid;
  };

  const nextStep = async () => {
    if (await validateCurrentStep()) {
      setStep(prev => prev + 1);
      setCompletedSteps(prev => prev.includes(step) ? prev : [...prev, step]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleEditStep = (stepNumber: number) => {
    setStep(stepNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (member?.title === 'Lifetime Member') {
      verifyMember();
    }
  }, [member, verifyMember]);

  if (isSubmitted) {
    return (
      <FormProvider {...methods}>
        <ConfirmationStep formData={formData} isRenewal={mode === 'renew'} />
      </FormProvider>
    );
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800">
        {mode === 'renew' ? (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Membership Renewal (LM)</h2>

              {verifiedMemberData?.fullName && (
                <div className="bg-green-50 p-4 rounded-lg mt-5">
                  <p className="text-md text-green-600 font-medium">
                    <strong>Renewal membership for: </strong>
                    {verifiedMemberData.fullName} (ID: {verifiedMemberData.membershipID})
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    Current: {verifiedMemberData.membershipType} • Expires: {new Date(verifiedMemberData.membershipEndDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            <RenewPaymentLM member={member} />

            <div className="mt-8 flex justify-end">
              <button
                onClick={async () => {
                  const isValid = await methods.trigger();
                  if (isValid) {
                    handleSubmit(handleSubmitForm)();
                  } else {
                    toast.error('Please complete all required fields');
                  }
                }}
                disabled={isSubmitting}
                className={`px-6 py-3 text-sm font-medium text-white rounded-md transition-colors ${isSubmitting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">↻</span>
                    Processing...
                  </span>
                ) : (
                  'Complete Renewal'
                )}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <ProgressIndicator currentStep={step} completedSteps={completedSteps} />

            <div className="mt-6">
              {step === 1 && <PersonalInfoStep />}
              {step === 2 && <ProfessionalInfoStep />}
              {step === 3 && <ContactAddressStep />}
              {step === 4 && <AcademicInfoStep />}
              {step === 5 && <PaymentStep member={member} />}
              {step === 6 && <ReviewStep onEditStep={handleEditStep} />}

              <div className="mt-8 flex justify-between items-center">
                <div>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      ← Back
                    </button>
                  )}
                </div>

                <div className="text-sm text-gray-500">
                  Step {step} of 6
                </div>

                <div>
                  {step < 6 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                      Next Step →
                    </button>
                  ) : step === 6 ? (
                    <button
                      type="button"
                      onClick={async () => {
                        const isValid = await methods.trigger();
                        if (isValid) {
                          handleSubmit(handleSubmitForm)();
                        } else {
                          toast.error('Please fix all validation errors before submitting');
                        }
                      }}
                      disabled={isSubmitting}
                      className={`px-6 py-3 uppercase text-sm font-medium text-white rounded transition-colors ${isSubmitting ? "bg-green-700 cursor-not-allowed" : "bg-green-500 hover:bg-green-700"
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inline-block animate-spin mr-2">⏳</span>
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}

      
      </div>
    </FormProvider>
  );
};

export default React.memo(MultiStepForm);