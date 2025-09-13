import { useFormContext } from "react-hook-form";

const ProfessionalInfoStep = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Professional Information</h1>
      <p className="text-gray-600">
        Please fill your information so we can get in touch with you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Organization Name
          </label>
          <input
            {...register("organizationName")}
            placeholder="Enter Your Organization Name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          {errors.organizationName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.organizationName.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Office Address
          </label>
          <input
            {...register("officeAddress")}
            placeholder="Enter Your Office Address"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          {errors.officeAddress && (
            <p className="mt-1 text-sm text-red-600">
              {errors.officeAddress.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Designation
          </label>
          <input
            {...register("currentDesignation")}
            placeholder="Enter Your Current Designation"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          {errors.currentDesignation && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currentDesignation.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            {...register("department")}
            placeholder="Enter Your Current Designation"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          {errors.department && (
            <p className="mt-1 text-sm text-red-600">
              {errors.department.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfoStep;