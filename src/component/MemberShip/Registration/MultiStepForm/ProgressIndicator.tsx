import { FC } from "react";

interface ProgressIndicatorProps {
  currentStep: number;
  completedSteps: number[];
}

const ProgressIndicator: FC<ProgressIndicatorProps> = ({ currentStep, completedSteps }) => {
  const steps = [
    { number: 1, label: "Personal" },
    { number: 2, label: "Professional" },
    { number: 3, label: "Contact" },
    { number: 4, label: "Academic" },
    { number: 5, label: "Payment" },
    { number: 6, label: "Preview" },
  ];

  return (
    <div className="relative flex items-center justify-between px-2 mb-10">
      {/* Base horizontal line */}
      <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-300 z-0" />

      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.number);
        const isCurrent = currentStep === step.number;

        return (
          <div key={step.number} className="relative z-10 flex flex-col items-center w-full group">
            {/* Step circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors duration-300
                ${isCurrent ? "bg-blue-600 text-white" : isCompleted ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              {isCompleted ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.number
              )}
            </div>

            {/* Step label */}
            <span
              className={`text-xs mt-1 font-medium text-center max-w-[80px]
                ${isCurrent ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"}`}
            >
              {step.label}
            </span>

            {/* Connecting line to next step */}
            {index !== steps.length - 1 && (
              <div
                className={`absolute top-5 left-1/2 h-0.5 z-10 transition-colors duration-300
                  ${completedSteps.includes(steps[index + 1].number) ? "bg-green-500" : "bg-gray-300"}`}
                style={{
                  width: "100%",
                  transform: "translateX(50%)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressIndicator;
