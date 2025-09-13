import { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-hot-toast";

type CloudinaryUploadResponse = {
  secure_url: string;
  [key: string]: unknown;
};

type PhotoUploadFieldProps = {
  name: string;
  label: string;
  required?: boolean;
};

const PhotoUploadField = ({ name, label, required = false }: PhotoUploadFieldProps) => {
  const { register, setValue, formState: { errors } } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = useCallback(async (file: File | null) => {
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "habson");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dov6k7xdk/image/upload",
        { method: "POST", body: formData }
      );

      if (!response.ok) throw new Error("Upload failed");

      const data: CloudinaryUploadResponse = await response.json();
      setValue(name, data.secure_url);
      toast.success(`${label} uploaded successfully`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`Failed to upload ${label}`);
      setPreview(null);
    } finally {
      setUploading(false);
    }
  }, [name, label, setValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFileChange(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0]);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const removeImage = () => {
    setPreview(null);
    setValue(name, "");
    const fileInput = document.getElementById(name) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const containerClasses = [
    "mt-2 border border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer",
    dragActive ? "border-sky-500 bg-sky-50" :
      preview ? "border-green-300 bg-green-50" :
        "border-gray-300 hover:border-gray-400",
    uploading ? "opacity-50 cursor-not-allowed" : ""
  ].join(" ");

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      <div
        className={containerClasses}
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
            required: required ? `${label} is required` : false,
            onChange: handleInputChange
          })}
        />

        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2" />
            <p className="text-sm text-gray-600">Uploading...</p>
          </div>
        ) : preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="mx-auto h-32 w-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeImage(); }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600 transition-colors"
              aria-label="Remove image"
            >
              ✕
            </button>
            <p className="text-sm text-green-600 mt-2">Image uploaded successfully!</p>
            <p className="text-xs text-gray-500">Click to change image</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600 hover:text-blue-500">
                  Click to upload
                </span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
              {!required && (
                <p className="text-xs text-gray-400 mt-1">(Optional)</p>
              )}
            </div>
          </div>
        )}
      </div>

      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
};

const PersonalInfoStep = () => {
  const { register, formState: { errors } } = useFormContext();

  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border";
  const errorClasses = "mt-1 text-sm text-red-600";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Personal Information</h1>
      <p className="text-gray-600">
        Please fill your information so we can get in touch with you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            {...register("fullName", { required: "Full name is required" })}
            placeholder="Enter Your Full Name"
            className={inputClasses}
          />
          {errors.fullName && <p className={errorClasses}>{String(errors.fullName.message)}</p>}
        </div>

        {/* Father's Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Father's Name
          </label>
          <input
            {...register("fathersOrHusbandsName")}
            placeholder="Enter Your Father's Name"
            className={inputClasses}
          />
          {errors.fathersOrHusbandsName && (
            <p className={errorClasses}>{String(errors.fathersOrHusbandsName.message)}</p>
          )}
        </div>

        {/* Mother's Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mother's Name
          </label>
          <input
            {...register("mothersName")}
            placeholder="Enter Your Mother's Name"
            className={inputClasses}
          />
          {errors.mothersName && <p className={errorClasses}>{String(errors.mothersName.message)}</p>}
        </div>

        {/* Spouse Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Spouse Name
          </label>
          <input
            {...register("spouseName")}
            placeholder="Enter Your Spouse Name"
            className={inputClasses}
          />
          {errors.spouseName && <p className={errorClasses}>{String(errors.spouseName.message)}</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date Of Birth
          </label>
          <input
            type="date"
            {...register("dateOfBirth")}
            className={inputClasses}
          />
          {errors.dateOfBirth && <p className={errorClasses}>{String(errors.dateOfBirth.message)}</p>}
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nationality
          </label>
          <input
            {...register("nationality")}
            placeholder="Enter Your Nationality"
            className={inputClasses}
          />
          {errors.nationality && <p className={errorClasses}>{String(errors.nationality.message)}</p>}
        </div>

        {/* NID/Passport */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            NID / Passport Number
          </label>
          <input
            {...register("nidOrPassport")}
            placeholder="Enter NID/Passport Number"
            className={inputClasses}
          />
          {errors.nidOrPassport && <p className={errorClasses}>{String(errors.nidOrPassport.message)}</p>}
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Blood Group
          </label>
          <select {...register("bloodGroup")} className={inputClasses}>
            <option value="">Select Your Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
          {errors.bloodGroup && <p className={errorClasses}>{String(errors.bloodGroup.message)}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select {...register("gender")} className={inputClasses}>
            <option value="">Select Gender</option>
            {["Male", "Female", "Other"].map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
          {errors.gender && <p className={errorClasses}>{String(errors.gender.message)}</p>}
        </div>

        {/* Mailing Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Mailing Address
          </label>
          <textarea
            {...register("mailingAddress")}
            placeholder="Enter Your Mailing Address"
            className={inputClasses}
            rows={3}
          />
          {errors.mailingAddress && <p className={errorClasses}>{String(errors.mailingAddress.message)}</p>}
        </div>

        {/* Photo Upload - Now optional */}
        <div className="md:col-span-2 lg:col-span-1">
          <PhotoUploadField
            name="personImage"
            label="Photo"
            required={false} // Changed to false to make it optional
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;