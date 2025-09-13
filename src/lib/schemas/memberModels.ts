import mongoose, { Schema, Document } from 'mongoose';

// Social Links Interface and Schema
interface ISocialLinks {
    facebook: string;
    linkedIn: string;
    whatsapp: string;
}

const SocialLinksSchema = new Schema<ISocialLinks>({
    facebook: {
        type: String,
        default: ""
    },
    linkedIn: {
        type: String,
        default: ""
    },
    whatsapp: {
        type: String,
        default: ""
    }
}, { _id: false });

// Qualification Interface and Schema
interface IQualification extends Document {
    degreeName: string;
    institutionName: string;
    groupMajor?: string;
    batch?: string;
    gpaCgpa?: string;
    passingYear?: number;
    certificate?: string;
}

const QualificationSchema = new Schema<IQualification>({
    degreeName: { type: String },
    institutionName: { type: String },
    groupMajor: { type: String },
    batch: { type: String },
    gpaCgpa: { type: String },
    certificate: { type: String },
    passingYear: {
        type: Number,
        validate: {
            validator: (year: number) => !year || (year >= 1900 && year <= new Date().getFullYear()),
            message: 'Year must be between 1900 and current year'
        }
    }
}, { _id: true });

// Welfare Interface and Schema
interface IWelfareMember {
    paymentMethod: string;
    transactionId: string;
    amount: number;
    paymentScreenshot: string | null;

    // Timestamps
    createdAt: Date;
    updatedAt: Date;
    approvedAt?: Date | null;
}

const WelfareMemberSchema = new Schema<IWelfareMember>({
    paymentMethod: {
        type: String,
        default: ""
    },
    transactionId: {
        type: String,
        default: ""
    },
    paymentScreenshot: {
        type: String,
        default: ""
    },
    amount: {
        type: Number,
        default: 0
    },
    approvedAt: {
        type: Date,
        default: null
    }
}, {
    _id: false,
    timestamps: true
});

// Main Member Interface and Schema
interface IMember extends Document {
    // Personal Information
    __v?: number;
    fullName: string;
    personImage: string;
    dateOfBirth?: Date | null;
    fathersOrHusbandsName: string | null;
    mothersName?: string | null;
    spouseName?: string | null;
    nidOrPassport?: string | null;
    mailingAddress: string | null;
    bloodGroup: string | null;
    nationality: string | null;
    gender: string | null;

    // Professional Information
    currentDesignation: string | null;
    department: string | null;
    officeAddress: string | null;
    organizationName: string | null;

    // Contact Information
    mobileNumber: string | null;
    officeMobileNumber: string | null;
    emailAddress: string;
    emergencyContactNumber: string | null;
    referencePerson: string | null;
    referencePersonMobileNumber: string | null;

    // Academic Information
    qualifications: IQualification[];

    // Membership Information
    membershipType: string;
    paymentMethod: string;
    transactionId: string;
    paymentSlip: string;
    approvedAt?: Date | null;
    approveType: string;
    status: 'Active' | 'Inactive' | 'Pending';
    membershipStartDate?: Date | null;
    membershipEndDate?: Date | null;
    firebaseUid?: string | null;

    // Timestamps
    createdAt: Date;
    updatedAt: Date;

    reNewMember: boolean;
    reNewType: string | null;
    socialLinks: ISocialLinks;

    welfareMembership: boolean;
    welfareApprovedType: string;
    welfareMember: IWelfareMember;
}

const MemberSchema = new Schema<IMember>({
    // Personal Information
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    personImage: {
        type: String,
        default: "",
        trim: true
    },
    dateOfBirth: {
        type: Date,
        default: null,
    },
    fathersOrHusbandsName: {
        type: String,
        default: null
    },
    mothersName: {
        type: String,
        default: null
    },
    spouseName: {
        type: String,
        default: null
    },
    nidOrPassport: {
        type: String,
        default: null
    },
    mailingAddress: {
        type: String,
        default: null
    },
    bloodGroup: {
        type: String,
        trim: true,
        default: null
    },
    nationality: {
        type: String,
        default: "Bangladeshi",
        enum: ["Bangladeshi", "Other"]
    },
    gender: {
        type: String,
        default: null
    },

    // Professional Information
    currentDesignation: {
        type: String,
        default: null
    },
    department: {
        type: String,
        default: null
    },
    officeAddress: {
        type: String,
        default: null
    },
    organizationName: {
        type: String,
        default: null
    },

    // Contact Information
    mobileNumber: {
        type: String,
        trim: true,
        default: null
    },
    officeMobileNumber: {
        type: String,
        default: null
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            message: 'Invalid email format'
        }
    },
    emergencyContactNumber: {
        type: String,
        default: null
    },
    referencePerson: {
        type: String,
        default: null
    },
    referencePersonMobileNumber: {
        type: String,
        default: null
    },

    // Academic Information
    qualifications: {
        type: [QualificationSchema],
        default: []
    },

    // Membership Information
    membershipType: {
        type: String,
        required: true,
        enum: ["General Member", "Lifetime Member"],
        default: "General Member"
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["Bkash", "Nagad", "Bank Transfer", "Cash"]
    },
    transactionId: {
        type: String,
        default: "",
        trim: true
    },
    paymentSlip: {
        type: String,
        default: "",
        trim: true
    },
    approvedAt: {
        type: Date,
        default: null
    },
    approveType: {
        type: String,
        enum: ["Pending", "Approved", "Re-Pending"],
        default: "Pending"
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Pending"],
        default: "Inactive"
    },
    membershipStartDate: {
        type: Date,
        default: null
    },
    membershipEndDate: {
        type: Date,
        default: null
    },
    reNewMember: {
        type: Boolean,
        default: false
    },
    reNewType: {
        type: String,
        default: ""
    },
    firebaseUid: {
        type: String,
        default: null
    },

    socialLinks: {
        type: SocialLinksSchema,
        default: () => ({})
    },
    welfareMembership: {
        type: Boolean,
        default: false
    },
    welfareApprovedType: {
        type: String,
        enum: ["Pending", "Approved"],
        default: 'Pending'
    },
    welfareMember: {
        type: WelfareMemberSchema,
        default: () => ({})
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret: any) {
            delete ret.__v;
            return ret;
        }

    }
});

export const Members = mongoose.models.Members || mongoose.model<IMember>('Members', MemberSchema);