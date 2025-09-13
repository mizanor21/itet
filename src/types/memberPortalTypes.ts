import { ObjectId } from "mongodb";

export type Navitems = {
    label: string,
    path: string
}


export type QualificationType = {
    degreeName: string;
    institutionName: string;
    boardUniversity: string;
    divisionClass: string;
    gpaCgpa: string;
    passingYear: number;
    groupMajor: string,
    batch: string,
    certificate: string
};


export type SociaMedialLinks = {

    facebook: string,
    linkedIn: string,
    whatsapp: string
}

export type WelfareMemberType = {
    paymentMethod: string;
    transactionId: string;
    amount: number;
    paymentScreenshot: string | null;
    welfareStatus: 'Active' | 'Inactive' | 'Pending';
    // Timestamps
    createdAt: string;
    updatedAt: string;
    approvedAt?: string | null;
}

export type DirectoryData = {

    _id?: string | ObjectId;
    approveType: string,
    status: string,

    membershipID: string;
    fullName: string;
    personImage: string;
    dateOfBirth: string;
    fathersOrHusbandsName: string;
    mothersName: string;
    spouseName: string;
    nidOrBirthCert: string;
    mailingAddress: string;
    bloodGroup: string;
    nationality: string;
    gender: string;
    nidOrPassport: string;

    // Social medi
    socialLinks: SociaMedialLinks;

    // Professional Information
    currentDesignation: string;
    officeAddress: string;
    organizationName: string;
    department: string;

    // Contact
    mobileNumber: string;
    officeMobileNumber: string;
    emergencyContactNumber: string;
    emailAddress: string;
    referencePersonMobileNumber: string;
    referencePerson: string;

    // Academic
    qualifications: QualificationType[];

    // Documents (store file paths or references)
    passportPhoto: string;
    paymentSlip: string;

    // Payment
    existingMembershipId: string;
    batch: string;
    membershipType: string;
    paymentMethod: string;
    transactionId: string;

    // Optional fields if returned from MongoDB
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    membershipEndDate: string;
    membershipStartDate: string;
    currentMember: string;

    // For Membership from
    title: string;
    price: number;
    id: string;

    // For Welfare Membership
    welfareMember: WelfareMemberType;
    welfareMembership: boolean;
    welfareApprovedType: string;
    welfareMembershipStartDate: string
};