import React from 'react';

const HowToAplied = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center">
                <h4 className="text-xl font-semibold text-amber-900">How To Apply</h4>
                <div className="relative mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            'Fill the Online Form',
                            'Upload Necessary Information',
                            'Pay via Specific Method',
                            'Approval within 7-14 working days',
                        ].map((step, i) => (
                            <div key={i} className="relative">
                                <div className="flex items-center space-x-3 bg-gradient-to-l from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200 h-full">
                                    <span className="flex-shrink-0 rounded-full w-6 h-6 flex items-center justify-center text-white bg-gradient-to-l from-amber-700 to-amber-500 text-sm font-medium">
                                        {i + 1}
                                    </span>
                                    <span className="text-amber-900">{step}</span>
                                </div>

                                {/* Arrows */}
                                {i < 3 && (
                                    <>
                                        <div className="hidden md:block absolute -right-5 top-1/2 transform -translate-y-1/2 text-amber-500">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                        <div className="md:hidden absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-amber-500">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                                />
                                            </svg>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowToAplied;