import { useFormContext } from "react-hook-form";

const ContactAddressStep = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Contact & Address</h1>
      <p className="text-gray-600">
        Please fill your information so we can get in touch with you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="tel"
            {...register("mobileNumber")}
            placeholder="Enter Your Mobile Number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          {errors.mobileNumber && (
            <p className="mt-1 text-sm text-red-600">
              {errors.mobileNumber.message as string}
            </p>
          )}
        </div>

         <div>
          <label className="block text-sm font-medium text-gray-700">
            Emergency Contact Number
          </label>
          <input
            type="tel"
            {...register("emergencyContactNumber")}
            placeholder="Enter Emergency Contact Number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          {errors.emergencyContactNumber && (
            <p className="mt-1 text-sm text-red-600">
              {errors.emergencyContactNumber.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address <span className="text-sm text-red-600">*</span>
          </label>
          <input
            type="email"
            {...register("emailAddress")}
            placeholder="Enter Your Email Address "
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          {errors.emailAddress && (
            <p className="mt-1 text-sm text-red-600">
              {errors.emailAddress.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Office Mobile Number
          </label>
          <input
            type="tel"
            {...register("officeMobileNumber")}
            placeholder="Enter Your Office Mobile Number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reference Person Name
          </label>
          <input
            type="text"
            {...register("referencePerson")}
            placeholder="Reference person must be ITET member"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reference Person Mobile Number
          </label>
          <input
            type="tel"
            {...register("referencePersonMobileNumber")}
            placeholder="Enter Reference Person Mobile Number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactAddressStep;