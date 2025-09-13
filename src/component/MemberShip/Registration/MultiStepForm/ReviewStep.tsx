import Image from "next/image";
import { FC, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  FiEdit2, FiCheck, FiX, FiChevronDown,
  FiUpload, FiUser, FiBriefcase,
  FiPhone, FiBook, FiDollarSign, FiAlertTriangle
} from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

interface Qualification {
  degreeName: string;
  institutionName: string;
  groupMajor: string;
  batch: string;
  gpaCgpa: string;
  passingYear: string;
}

interface FormValues {
  fullName: string;
  dateOfBirth: string;
  mothersName: string;
  fathersOrHusbandsName: string;
  nidOrPassport: string;
  bloodGroup: string;
  nationality: string;
  gender: string;
  mailingAddress: string;
  currentDesignation: string;
  department: string;
  organizationName: string;
  officeAddress: string;
  mobileNumber: string;
  officeMobileNumber?: string;
  emergencyContactNumber: string;
  emailAddress: string;
  referencePerson?: string;
  referencePersonMobileNumber?: string;
  qualifications?: Qualification[];
  personImage?: string;
  paymentSlip?: string;
  membershipType?: string;
  paymentMethod?: string;
  transactionId?: string;
  existingMembershipId?: string;
  spouseName?: string;
  alternateEmail?: string;
  emergencyContactRelation?: string;
  emergencyContactAddress?: string;
}

interface ReviewStepProps {
  onEditStep: (stepNumber: number) => void;
}

const ReviewStep: FC<ReviewStepProps> = ({ onEditStep }) => {
  const { getValues, setValue, watch } = useFormContext<FormValues>();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const formData = watch();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const formatFileInfo = (filePath: string | undefined) => {
    if (!filePath) return "Not uploaded";
    return filePath.split('/').pop() || filePath;
  };

  const handleEditClick = (fieldName: string, currentValue: string) => {
    setEditingField(fieldName);
    setTempValue(currentValue || "");
  };

  const handleSaveEdit = async (fieldName: string) => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setValue(fieldName as any, tempValue);
      setSuccessMessage(`${fieldName.split('.').pop()} updated successfully!`);
      setEditingField(null);
      setTempValue("");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setTempValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent, fieldName: string) => {
    if (e.key === 'Enter') handleSaveEdit(fieldName);
    else if (e.key === 'Escape') handleCancelEdit();
  };

  const renderEditableField = (label: string, fieldName: string, value: string | undefined, type: string = "text") => {
    const displayValue = value || "Not provided";
    const isEditing = editingField === fieldName;

    return (
      <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 px-3 rounded-lg transition-colors duration-150 last:border-b-0">
        <span className="font-medium text-gray-700 w-full sm:w-1/3 min-w-[120px] mb-1 sm:mb-0">
          {label}:
        </span>

        <div className="flex-1 w-full sm:w-2/3 min-w-0">
          {isEditing ? (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                {type === "textarea" ? (
                  <textarea
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, fieldName)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows={3}
                    autoFocus
                  />
                ) : type === "select" ? (
                  <div className="relative">
                    <select
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white w-full pr-8"
                    >
                      {fieldName === "gender" && (
                        <>
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </>
                      )}
                      {fieldName === "bloodGroup" && (
                        <>
                          <option value="">Select Blood Group</option>
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                            <option key={group} value={group}>{group}</option>
                          ))}
                        </>
                      )}
                      {fieldName === "membershipType" && (
                        <>
                          <option value="">Select Membership</option>
                          <option value="Life Member">Life Member</option>
                          <option value="General Member">General Member</option>
                        </>
                      )}
                      {fieldName === "paymentMethod" && (
                        <>
                          <option value="">Select Method</option>
                          <option value="bKash">bKash</option>
                          <option value="Nagad">Nagad</option>
                          <option value="Rocket">Rocket</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                        </>
                      )}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                ) : (
                  <input
                    type={type}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, fieldName)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    autoFocus
                  />
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-150 flex items-center"
                >
                  <FiX className="mr-1" />
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveEdit(fieldName)}
                  disabled={isSaving}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-150 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiCheck className="mr-1" />
                      Save
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-gray-900 text-sm break-words min-w-0">
                {type === "date" && value ? formatDate(value) : displayValue}
              </span>
              <button
                onClick={() => handleEditClick(fieldName, value || "")}
                className="ml-2 px-2.5 py-1.5 text-blue-600 hover:text-blue-800 text-xs font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-150 opacity-0 group-hover:opacity-100 focus:opacity-100 flex items-center"
              >
                <FiEdit2 className="mr-1" />
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderQualificationEdit = (qual: Qualification, index: number) => (
    <div key={index} className="border-l-4 border-blue-200 pl-4 mb-4 bg-white p-4 rounded-lg shadow-xs">
      <div className="flex justify-between items-center mb-3">
        <h5 className="font-medium text-gray-800">Qualification {index + 1}</h5>
        <button
          onClick={() => onEditStep(4)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          <FiEdit2 className="mr-1" />
          Edit All
        </button>
      </div>
      <div className="space-y-3">
        {renderEditableField("Degree Name", `qualifications.${index}.degreeName`, qual.degreeName)}
        {renderEditableField("Institution", `qualifications.${index}.institutionName`, qual.institutionName)}
        {renderEditableField("Division Class or Group Major", `qualifications.${index}.groupMajor`, qual.groupMajor)}
        {renderEditableField("Batch", `qualifications.${index}.batch`, qual.batch)}
        {renderEditableField("GPA/CGPA", `qualifications.${index}.gpaCgpa`, qual.gpaCgpa)}
        {renderEditableField("Passing Year", `qualifications.${index}.passingYear`, qual.passingYear)}
      </div>
    </div>
  );

  const renderSectionHeader = (title: string, description: string, icon: React.ReactNode, step: number) => (
    <div className="bg-gradient-to-r from-blue-50 to-gray-50 px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center">
        <div className="bg-blue-100 p-2 rounded-lg mr-3 text-blue-600">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onEditStep(step)}
        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-150 flex items-center"
      >
        <FiEdit2 className="mr-1" />
        <span className="hidden sm:inline">Edit Section</span>
      </button>
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6 pb-12">
      {successMessage && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center animate-fade-in-up max-w-md mx-auto sm:mx-0">
            <FiCheck className="h-5 w-5 mr-2" />
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      <div className="text-center mb-8 pt-4">
        <h2 className="text-2xl font-medium text-gray-900 mb-2">Review Your Information</h2>
        <p className="text-pink-600 max-w-xl mx-auto text-xs">
          Hover over any field and click "Edit" to modify it. Press Enter to save or Escape to cancel.
        </p>
      </div>

      {/* Personal Information */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {renderSectionHeader(
          "Personal Information",
          "Basic details about yourself",
          <FiUser className="h-5 w-5" />,
          1
        )}
        <div className="p-4 sm:p-6 space-y-1">
          {renderEditableField("Full Name", "fullName", formData.fullName)}
          {renderEditableField("Date of Birth", "dateOfBirth", formData.dateOfBirth, "date")}
          {renderEditableField("Mother's Name", "mothersName", formData.mothersName)}
          {renderEditableField("Father's/Husband's Name", "fathersOrHusbandsName", formData.fathersOrHusbandsName)}
          {renderEditableField("NID/Passport", "nidOrPassport", formData.nidOrPassport)}
          {renderEditableField("Blood Group", "bloodGroup", formData.bloodGroup, "select")}
          {renderEditableField("Nationality", "nationality", formData.nationality)}
          {renderEditableField("Gender", "gender", formData.gender, "select")}
          {renderEditableField("Mailing Address", "mailingAddress", formData.mailingAddress, "textarea")}
        </div>
      </div>

      {/* Professional Information */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {renderSectionHeader(
          "Professional Information",
          "Details about your work and organization",
          <FiBriefcase className="h-5 w-5" />,
          2
        )}
        <div className="p-4 sm:p-6 space-y-1">
          {renderEditableField("Current Designation", "currentDesignation", formData.currentDesignation)}
          {renderEditableField("Department", "department", formData.department)}
          {renderEditableField("Organization", "organizationName", formData.organizationName)}
          {renderEditableField("Office Address", "officeAddress", formData.officeAddress, "textarea")}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {renderSectionHeader(
          "Contact Information",
          "How we can reach you",
          <FiPhone className="h-5 w-5" />,
          3
        )}
        <div className="p-4 sm:p-6 space-y-1">
          {renderEditableField("Mobile Number", "mobileNumber", formData.mobileNumber, "tel")}
          {renderEditableField("Office Mobile", "officeMobileNumber", formData.officeMobileNumber, "tel")}
          {renderEditableField("Email Address", "emailAddress", formData.emailAddress, "email")}
          {renderEditableField("Emergency Contact", "emergencyContactNumber", formData.emergencyContactNumber, "tel")}
          {renderEditableField("Reference Person", "referencePerson", formData.referencePerson)}
          {renderEditableField("Reference Mobile", "referencePersonMobileNumber", formData.referencePersonMobileNumber, "tel")}
        </div>
      </div>

      {/* Academic Information */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {renderSectionHeader(
          "Academic Qualifications",
          "Your educational background",
          <FiBook className="h-5 w-5" />,
          4
        )}
        <div className="p-4 sm:p-6">
          {formData.qualifications && formData.qualifications.length > 0 ? (
            <div className="space-y-4">
              {formData.qualifications.map((qual, index) => renderQualificationEdit(qual, index))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <FiBook className="mx-auto h-12 w-12 text-gray-400" />
              <h4 className="mt-2 text-sm font-medium text-gray-900">No qualifications added</h4>
              <p className="mt-1 text-sm text-gray-500">Add your educational qualifications to continue</p>
              <button
                type="button"
                onClick={() => onEditStep(4)}
                className="mt-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Qualifications
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {renderSectionHeader(
          "Documents",
          "Uploaded files and attachments",
          <FiUpload className="h-5 w-5" />,
          5
        )}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Passport Photo */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 px-3 rounded-lg transition-colors duration-150">
            <span className="font-medium text-gray-700 w-full sm:w-1/3 min-w-[120px] mb-2 sm:mb-0">Passport Photo:</span>
            <div className="flex-1 w-full sm:w-2/3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {formData.personImage ? (
                  <div className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-200">
                    <Image
                      src={formData.personImage}
                      alt="photo"
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                    <span className="text-xs text-gray-500">No photo</span>
                  </div>
                )}
                <button
                  onClick={() => onEditStep(5)}
                  className="self-end sm:self-auto px-2.5 py-1.5 text-blue-600 hover:text-blue-800 text-xs font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-150 flex items-center"
                >
                  <FiEdit2 className="mr-1" />
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* Payment Slip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 hover:bg-gray-50 px-3 rounded-lg transition-colors duration-150">
            <span className="font-medium text-gray-700 w-full sm:w-1/3 min-w-[120px] mb-2 sm:mb-0">Payment Slip:</span>
            <div className="flex-1 w-full sm:w-2/3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-gray-900 text-sm break-words min-w-0">
                    {formatFileInfo(formData.paymentSlip) || "No file uploaded"}
                  </span>
                  {formData.paymentSlip && (
                    <div className="relative w-full max-w-xs h-32 mt-2 rounded-md overflow-hidden border border-gray-200">
                      <Image
                        src={formData.paymentSlip}
                        alt="Payment slip"
                        fill
                        className="object-contain"
                        sizes="320px"
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onEditStep(5)}
                  className="self-end sm:self-auto px-2.5 py-1.5 text-blue-600 hover:text-blue-800 text-xs font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-150 flex items-center"
                >
                  <FiEdit2 className="mr-1" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {renderSectionHeader(
          "Payment Information",
          "Membership and payment details",
          <FiDollarSign className="h-5 w-5" />,
          6
        )}
        <div className="p-4 sm:p-6 space-y-1">
          {renderEditableField("Membership Type", "membershipType", formData.membershipType, "select")}
          {renderEditableField("Payment Method", "paymentMethod", formData.paymentMethod, "select")}
          {renderEditableField("Transaction ID", "transactionId", formData.transactionId)}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 sm:p-6 shadow-xs">
        <h4 className="text-lg font-semibold text-blue-900 mb-4">Form Completion Summary</h4>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm">
          <div className="bg-white p-3 rounded-lg text-center shadow-xs">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">
              {Object.values(formData).filter(value => value && value !== "").length}
            </div>
            <div className="text-blue-700">Fields Completed</div>
          </div>
          <div className="bg-white p-3 rounded-lg text-center shadow-xs">
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              {formData.qualifications?.length || 0}
            </div>
            <div className="text-green-700">Qualifications</div>
          </div>
          <div className="bg-white p-3 rounded-lg text-center shadow-xs">
            <div className="text-xl sm:text-2xl font-bold text-purple-600">
              {(formData.personImage ? 1 : 0) + (formData.paymentSlip ? 1 : 0)}
            </div>
            <div className="text-purple-700">Documents</div>
          </div>
          <div className="bg-white p-3 rounded-lg text-center shadow-xs">
            <div className="text-xl sm:text-2xl font-bold text-orange-600">
              {formData.membershipType && formData.paymentMethod ? "✓" : "✗"}
            </div>
            <div className="text-orange-700">Payment Ready</div>
          </div>
        </div>
      </div>

      {/* Confirmation Message */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Important:</strong> Please review all information carefully. You can edit individual fields by hovering and clicking "Edit".
              Press <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-gray-100 border border-gray-200 rounded">Enter</kbd> to save or <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-gray-100 border border-gray-200 rounded">Esc</kbd> to cancel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;