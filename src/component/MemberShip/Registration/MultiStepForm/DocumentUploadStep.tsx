import { useFormContext } from "react-hook-form";


const DocumentUploadStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Document Information</h1>
      <p className="text-gray-600">
        Please provide the required document details.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Passport Photo URL/Path *
          </label>
          
          <div className="mt-2">
            <input
              type="text"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter URL or file path (e.g., /uploads/passport.jpg)"
              {...register("passportPhoto", {
                required: "Passport photo URL is required",
              })}
            />
          </div>
          
          {errors.passportPhoto && (
            <p className="mt-2 text-sm text-red-600">
              {errors.passportPhoto.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadStep;