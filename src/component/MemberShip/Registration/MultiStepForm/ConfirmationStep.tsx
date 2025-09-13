import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FormValues } from "@/types/formTypes";
import {
  FaCheckCircle,
  FaDownload,
  FaArrowLeft,
  FaEnvelope,
  FaSpinner
} from "react-icons/fa";

interface ConfirmationStepProps {
  formData: FormValues | null;
  isRenewal: boolean;
}

interface QualificationRow {
  degreeName: string;
  institutionName: string;
  groupMajor?: string;
  batch?: string;
  gpaCgpa?: string;
  passingYear?: string;
  certificate?: string;
}

const ConfirmationStep = ({ formData, isRenewal }: ConfirmationStepProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [autoDownloaded, setAutoDownloaded] = useState(false);

  const generatePdf = (autoDownload: boolean = true) => {
    if (!formData) return null;

    setIsGenerating(true);
    const doc = new jsPDF();

    // Add logo or header
    doc.setFontSize(20);
    doc.setTextColor(40, 53, 147);
    doc.text("ITET Membership Registration", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(
      isRenewal ? "Renewal Confirmation" : "Registration Confirmation",
      105,
      28,
      { align: "center" }
    );

    // Personal Information Section
    doc.setFontSize(14);
    doc.setTextColor(40, 53, 147);
    doc.text("1. Personal Information", 14, 40);

    let y = 45;
    autoTable(doc, {
      startY: y,
      head: [["Field", "Details"]],
      body: [
        ["Full Name", formData.fullName || "N/A"],
        ["Date of Birth", formData.dateOfBirth || "N/A"],
        ["Gender", formData.gender || "N/A"],
        ["Nationality", formData.nationality || "N/A"],
        ["NID/Passport", formData.nidOrPassport || "N/A"],
        ["Mailing Address", formData.mailingAddress || "N/A"],
      ],
      theme: "grid",
      headStyles: { fillColor: [40, 53, 147] },
    });
    y = (doc as any).lastAutoTable.finalY + 15;

    // Professional Information Section
    doc.setFontSize(14);
    doc.setTextColor(40, 53, 147);
    doc.text("2. Professional Information", 14, y);

    autoTable(doc, {
      startY: y + 5,
      head: [["Field", "Details"]],
      body: [
        ["Current Designation", formData.currentDesignation || "N/A"],
        ["Organization", formData.organizationName || "N/A"],
        ["Office Address", formData.officeAddress || "N/A"],
      ],
      theme: "grid",
      headStyles: { fillColor: [40, 53, 147] },
    });
    y = (doc as any).lastAutoTable.finalY + 15;

    // Contact Information Section
    doc.setFontSize(14);
    doc.setTextColor(40, 53, 147);
    doc.text("3. Contact Information", 14, y);

    autoTable(doc, {
      startY: y + 5,
      head: [["Field", "Details"]],
      body: [
        ["Mobile Number", formData.mobileNumber || "N/A"],
        ["Email", formData.emailAddress || "N/A"],
        ["Emergency Contact", formData.emergencyContactNumber || "N/A"],
      ],
      theme: "grid",
      headStyles: { fillColor: [40, 53, 147] },
    });
    y = (doc as any).lastAutoTable.finalY + 15;

    // Academic Qualifications Section
    doc.setFontSize(14);
    doc.setTextColor(40, 53, 147);
    doc.text("4. Academic Qualifications", 14, y);

    const qualificationsRows: [string, string, string, string, string, string][] =
      formData.qualifications?.map((qual: QualificationRow) => [
        qual.degreeName || "N/A",
        qual.institutionName || "N/A",
        qual.groupMajor || "N/A",
        qual.batch || "N/A",
        qual.passingYear || "N/A",
        qual.gpaCgpa || "N/A",
      ]) || [];

    autoTable(doc, {
      startY: y + 5,
      head: [["Degree", "Institution", "Major/Group", "Batch", "Year", "GPA/CGPA"]],
      body: qualificationsRows,
      theme: "grid",
      headStyles: { fillColor: [40, 53, 147] },
    });
    y = (doc as any).lastAutoTable.finalY + 15;

    // Payment Information Section
    doc.setFontSize(14);
    doc.setTextColor(40, 53, 147);
    doc.text("5. Payment Information", 14, y);

    autoTable(doc, {
      startY: y + 5,
      head: [["Field", "Details"]],
      body: [
        ["Membership Type", formData.membershipType || "N/A"],
        ["Payment Method", formData.paymentMethod || "N/A"],
        ["Transaction ID", formData.transactionId || "N/A"],
      ],
      theme: "grid",
      headStyles: { fillColor: [40, 53, 147] },
    });
    y = (doc as any).lastAutoTable.finalY + 20;

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for your registration!", 105, y, { align: "center" });
    doc.text(
      "For any queries, please contact: info@itetbd.com",
      105,
      y + 5,
      { align: "center" }
    );
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, y + 10, {
      align: "center",
    });

    setIsGenerating(false);

    if (autoDownload) {
      doc.save(
        `ITET_Membership_${formData.fullName?.replace(/[^a-zA-Z0-9-_]/g, "_") || "application"}.pdf`
      );
      setAutoDownloaded(true);
    }

    return doc;
  };

  useEffect(() => {
    if (formData && !autoDownloaded) {
      generatePdf(true);
    }
  }, [formData]);

  const handleDownload = () => {
    if (!formData) return;
    const doc = generatePdf(false);
    if (doc) {
      doc.save(
        `ITET_Membership_${formData.fullName?.replace(/[^a-zA-Z0-9-_]/g, "_") || "application"}.pdf`
      );
    }
  };

  if (!formData) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mt-4">No data to display</h1>
        <p className="mt-2 text-gray-600">
          Please complete the registration form before viewing the confirmation.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-gray-800 rounded-lg shadow-md text-center">
      <div className="mb-8">
        <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="text-2xl font-bold mt-4">
          {isRenewal ? "Thank you for renewing!" : "Thank you for registering!"}
        </h1>
        <p className="mt-2 text-gray-600">
          Your {isRenewal ? "renewal" : "application"} has been submitted successfully.
        </p>
      </div>

      <div className="mb-8">
        <p className="mb-4">
          You will receive a confirmation email once verified by the ITET Management.
        </p>
        <p className="text-sm text-gray-500 flex items-center justify-center">
          <FaEnvelope className="mr-2" />
          For queries:{" "}
          <a
            href="mailto:info@itetbd.com"
            className="text-blue-600 hover:text-blue-800 ml-1"
          >
            info@itetbd.com
          </a>
        </p>
      </div>

      <div className="flex flex-col items-center">
        {isGenerating ? (
          <div className="flex items-center">
            <FaSpinner className="animate-spin mr-3 h-5 w-5 text-blue-500" />
            Generating PDF...
          </div>
        ) : (
          <>
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 mb-4 disabled:bg-blue-300"
            >
              <FaDownload className="mr-2" />
              Download Submitted Form (PDF)
            </button>
            <p className="text-xs text-gray-500 mb-6">
              {autoDownloaded
                ? "Your PDF was automatically downloaded. Click above to download again."
                : "Click above to download your confirmation PDF."}
            </p>
          </>
        )}
      </div>

      <div>
        <a
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft className="mr-1" />
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default ConfirmationStep;