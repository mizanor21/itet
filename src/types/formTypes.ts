import { z } from "zod";

export const formSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  personImage: z.string(),
  dateOfBirth: z.string(),
  fathersOrHusbandsName: z.string(),
  mothersName: z.string(),
  spouseName: z.string(),
  nidOrPassport: z.string(),
  mailingAddress: z.string(),
  bloodGroup: z.string(),
  nationality: z.string(),
  gender: z.string(),


  // Professional Information
  currentDesignation: z.string(),
  department: z.string(),
  officeAddress: z.string(),
  organizationName: z.string(),


  // Contact & Address
  mobileNumber: z.string(),
  officeMobileNumber: z.string(),
  emailAddress: z.string()
    .min(2, "Email must be at least 2 characters")
    .max(50, "Email must be less than 50 characters")
    .email("Valid email is required")
    .refine(
      (val) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
      "Please enter a valid email address"
    ),
  emergencyContactNumber: z.string(),
  referencePerson: z.string(),
  referencePersonMobileNumber: z.string(),


  // Academic Information
  qualifications: z.array(
    z.object({
      degreeName: z.string(),
      institutionName: z.string(),
      groupMajor: z.string().optional(),
      batch: z.string().optional(),
      gpaCgpa: z.string().optional(),
      passingYear: z.string().optional(),
      certificate: z.string().optional(),
    })
      .refine((data) => {
        // Only validate passingYear if it's provided
        if (data.passingYear && data.passingYear !== "") {
          return /^\d{4}$/.test(data.passingYear);
        }
        return true;
      }, {
        message: "Passing year must be a 4-digit number",
        path: ["passingYear"]
      })
  ),


  // Payment
  paymentSlip: z.string(),
  membershipType: z.string().min(2, "Membership type is required"),
  paymentMethod: z.string().min(2, "Payment method is required"),
  transactionId: z.string(),

});

export type FormValues = z.infer<typeof formSchema>;




