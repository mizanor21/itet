'use client'

import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";

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

  interface CloudinaryUploadResponse {
    secure_url: string;
    [key: string]: any;
  }

  const handleFileChange = async (file: File | null): Promise<void> => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
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
      toast.success(`${label} uploaded successfully`);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(`Failed to upload ${label}`);
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

  interface DragEvent extends React.DragEvent<HTMLDivElement> { }

  const handleDrop = (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  interface DragHandlerEvent extends React.DragEvent<HTMLDivElement> { }

  interface DragHandler {
    (e: DragHandlerEvent): void;
  }

  const handleDrag: DragHandler = (e) => {
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
    // Reset the file input
    const fileInput = document.getElementById(name) as HTMLInputElement | null;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div
        className={`mt-2 border-2 border-dashed rounded-lg p-4 text-center transition-colors ${dragActive
          ? "border-blue-500 bg-blue-50"
          : preview
            ? "border-green-300 bg-green-50"
            : "border-gray-300 hover:border-gray-400"
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

            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }
          })}
        />

        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
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
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600 transition-colors"
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
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
            </div>
          </div>
        )}
      </div>

      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name].message as string}
        </p>
      )}
    </div>
  );
};


const AcademicInfoStep = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "qualifications",
  });

  const addQualification = () => {
    append({
      degreeName: "",
      institutionName: "",
      groupMajor: "",
      gpaCgpa: "",
      passingYear: "",
      certificate: "",
    });
  };

  function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Academic Information</h1>
      <p className="text-gray-600">
        Please fill your academic qualifications.
      </p>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border-2 border-dashed border-purple-300 hover:border-purple-500 p-4 rounded-lg space-y-4 relative"
          >
            {index > 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-2 right-2 text-red-600 text-sm font-medium"
              >
                Remove
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Degree Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Degree Name
                </label>
                <input
                  {...register(`qualifications.${index}.degreeName`, {
                    required: index === 0 ? "Degree name is required" : false,
                    maxLength: {
                      value: 100,
                      message: "Degree name cannot exceed 100 characters"
                    }
                  })}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border ${(errors.qualifications as any)?.[index]?.degreeName
                    ? "border-red-500"
                    : "border-gray-300"
                    }`}
                />
                {(errors.qualifications as any)?.[index]?.degreeName && (
                  <p className="mt-1 text-sm text-red-600">
                    {(errors.qualifications as any)[index]?.degreeName?.message as string}
                  </p>
                )}
              </div>

              {/* Institution Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Institution Name
                </label>
                {index === 0 ? (
                  <select
                    {...register(`qualifications.${index}.institutionName`, {
                      required: index === 0 ? "Institution name is required" : false
                    })}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border ${(errors.qualifications as any)?.[index]?.institutionName
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                  >
                    <option value="">Select Institution</option>
                    <option value="Bangladesh University of Textiles (BUTEX)">
                      Bangladesh University of Textiles (BUTEX)
                    </option>
                    <option value="College of Textile Engineering & Technology (CTET)">
                      College of Textile Engineering & Technology (CTET)
                    </option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <input
                    {...register(`qualifications.${index}.institutionName`, {
                      maxLength: {
                        value: 100,
                        message: "Institution name cannot exceed 100 characters"
                      }
                    })}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border ${(errors.qualifications as any)?.[index]?.institutionName
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                  />
                )}
                {(errors.qualifications as any)?.[index]?.institutionName && (
                  <p className="mt-1 text-sm text-red-600">
                    {(errors.qualifications as any)[index]?.institutionName?.message as string}
                  </p>
                )}
              </div>

              {/* Department/Division or Group/Major */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {index === 0 ? "Department / Division" : "Group / Major"}
                </label>
                {index === 0 ? (
                  <select
                    {...register(`qualifications.${index}.groupMajor`, {
                      required: index === 0 ? "Department/Division is required" : false
                    })}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border ${(errors.qualifications as any)?.[index]?.groupMajor
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                  >
                    <option value="">Select {index === 0 ? "Department/Division" : "Group/Major"}</option>
                    <option value="Yarn Engineering (YE)">Yarn Engineering (YE)</option>
                    <option value="Fabric Engineering (FE)">Fabric Engineering (FE)</option>
                    <option value="Wet Process Engineering (WPE)">Wet Process Engineering (WPE)</option>
                    <option value="Apparel Engineering (AE)">Apparel Engineering (AE)</option>
                    <option value="Textile Engineering Management (TEM)">Textile Engineering Management (TEM)</option>
                    <option value="Dyes and Chemical Engineering (DCE)">Dyes and Chemical Engineering (DCE)</option>
                    <option value="Textile Machinery Design and Maintenance (TMDM)">Textile Machinery Design and Maintenance (TMDM)</option>
                    <option value="Environmental Science and Engineering (ESE)">Environmental Science and Engineering (ESE)</option>
                    <option value="Industrial and Production Engineering (IPE)">Industrial and Production Engineering (IPE)</option>
                    <option value="Textile Fashion and Design (TFD)">Textile Fashion and Design (TFD)</option>
                    <option value="Textile Materials Engineering (TME)">Textile Materials Engineering (TME)</option>
                  </select>
                ) : (
                  <input
                    {...register(`qualifications.${index}.groupMajor`, {
                      maxLength: {
                        value: 100,
                        message: "Group/Major cannot exceed 100 characters"
                      }
                    })}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border ${(errors.qualifications as any)?.[index]?.groupMajor
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                  />
                )}
                {(errors.qualifications as any)?.[index]?.groupMajor && (
                  <p className="mt-1 text-sm text-red-600">
                    {(errors.qualifications as any)[index]?.groupMajor?.message as string}
                  </p>
                )}
              </div>

              {/* Batch - Only for first qualification */}
              {index === 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Batch
                  </label>
                  <select
                    {...register(`qualifications.${index}.batch`, {
                      required: index === 0 ? "Batch is required" : false
                    })}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border ${(errors.qualifications as any)?.[index]?.batch
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                    defaultValue=""
                  >
                    <option value="" disabled>Select Batch</option>
                    {Array.from({ length: 100 }, (_, i) => (
                      <option key={i + 1} value={`${i + 1}${getOrdinal(i + 1)}`}>
                        {`${i + 1}${getOrdinal(i + 1)}`}
                      </option>
                    ))}
                  </select>
                  {(errors.qualifications as any)?.[index]?.batch && (
                    <p className="mt-1 text-sm text-red-600">
                      {(errors.qualifications as any)[index]?.batch?.message as string}
                    </p>
                  )}
                </div>
              )}

              {/* GPA/CGPA */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  GPA / CGPA / Class
                </label>
                <input
                  {...register(`qualifications.${index}.gpaCgpa`, {
                    pattern: {
                      value: /^[0-9.]*$/,
                      message: "Please enter a valid GPA/CGPA"
                    },
                    maxLength: {
                      value: 10,
                      message: "GPA/CGPA cannot exceed 10 characters"
                    }
                  })}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border ${(errors.qualifications as any)?.[index]?.gpaCgpa
                    ? "border-red-500"
                    : "border-gray-300"
                    }`}
                />
                {(errors.qualifications as any)?.[index]?.gpaCgpa && (
                  <p className="mt-1 text-sm text-red-600">
                    {(errors.qualifications as any)[index]?.gpaCgpa?.message as string}
                  </p>
                )}
              </div>

              {/* Passing Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Passing Year
                </label>
                <input
                  type="number"
                  {...register(`qualifications.${index}.passingYear`, {
                    min: {
                      value: 1900,
                      message: "Year must be after 1900"
                    },
                    max: {
                      value: new Date().getFullYear(),
                      message: `Year cannot be in the future`
                    },
                    pattern: {
                      value: /^[0-9]{4}$/,
                      message: "Please enter a valid 4-digit year"
                    }
                  })}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border ${(errors.qualifications as any)?.[index]?.passingYear
                    ? "border-red-500"
                    : "border-gray-300"
                    }`}
                />
                {(errors.qualifications as any)?.[index]?.passingYear && (
                  <p className="mt-1 text-sm text-red-600">
                    {(errors.qualifications as any)[index]?.passingYear?.message as string}
                  </p>
                )}
              </div>
            </div>

            {/* Certificate Upload */}
            <div className="md:col-span-2 lg:col-span-1">
              <PhotoUploadField
                name={`qualifications.${index}.certificate`}
                label="Certificate / Marksheet"
                required={false}
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addQualification}
          className="items-center text-sky-600 hover:text-white hover:bg-sky-600 text-sm font-medium border rounded-full px-2 py-1.5 cursor-pointer"
        >
          + Add Another Qualification
        </button>
      </div>
    </div>
  );
};

export default AcademicInfoStep;