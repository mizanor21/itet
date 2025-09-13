import Container from "@/component/Container/Container";
import { BenefitsData } from "@/types/common";
import Link from "next/link";
import React from 'react';

const membershipData: BenefitsData = {
    title: "  Why You Should Become a Member of ITET — A Call to Reclaim Our Platform",
    subtitle: "Reclaim Your Professional Platform",
    greeting: "Dear Respected Textile Engineer,",
    salutation: "Assalamu Alaikum / Greetings.",
    intro: "Textile and apparel is the lifeline of our nation’s economy. Yet, despite our immense contribution to this sector, our professional community often lacks the united voice, thestrategic platform, and the institutional strength needed to shape our future.It’s time tochange that — and ITET is your platform to make it happen.The Institution of Textile Engineers and Technologists(ITET) was born with the vision to unite all textile engineers across Bangladesh and abroad — to be the voice, the strength,and the driving force behind national progress in this vital sector.However, we must also acknowledge the reality: over the years, ITET has not fully lived up to its potential,Limited to annual picnics or Iftar gatherings, it has yet to embrace the leadership role that other professional bodies have successfully taken.",
    callToAction: "It’s Time to Change That.And ITET — the Institution of Textile Engineers and Technologists — is your platform to make it happen.",
    whyITET: {
        title: "Why ITET Matters",
        description: "Founded with a powerful vision, ITET was created to unite all textile engineers across Bangladesh and beyond — to serve as the voice, strength, and strategic engine behind national progress in this vital secto",
        issues: [
            "For years, ITET has fallen short of its full potential.",
            "Too often limited to annual picnics or Iftar gatherings, our institution has yet to rise to the leadership role that other professional bodies have proudly taken."

        ]
    },
    challenges: {
        title: "While Others Progressed, We Watched",
        items: [
            "Policy shaped by others, without our input",
            "Jobs and opportunities created by external voices",
            "Industry - academia collaboration left underdeveloped",
            "Global partnerships formed — but without us"
        ]
    },
    benefits: {
        title: "You Are the Key to This Transformation",
        items: [
            "ITET is not just an organization — it is your voice, your shield, and your future.",
            "Together, we can build a platform that empowers every textile engineer and positions our profession at the center of national development."
        ]
    },
    conclusion: {
        text: "We can no longer afford to be sidelined in our own industry.",
        empowerment: "Your membership powers this transformation.",
        finalCall: "Let’s not stay silent ✦ Let’s not stay sidelined ✦ Let’s rise — together."
    },
};

const Benefits = () => {
    return (
        <Container>
            <div className=" px-4 py-8 font-sans bg-white rounded-lg shadow-md">
                {/* Header */}
                <div className="mb-8 text-center border-b pb-6">
                    <h1 className="text-3xl font-bold text-sky-500 mb-1"> Why Join ITET?</h1>
                    <h2 className="text-xl font-semibold text-gray-600">{membershipData.subtitle}</h2>
                </div>
                <h2 className="text-2xl md:text-3xl font-medium mb-8 text-gray-800 relative pl-4">
                    <span className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></span>
                    {membershipData.title}
                </h2>
                {/* Greeting */}
                <div className="mb-8 bg-blue-50 p-4 rounded-lg">
                    <p className="text-lg font-medium text-gray-700 mb-1">{membershipData.greeting}</p>
                    <p className="text-gray-600">{membershipData.salutation}</p>
                </div>

                {/* Introduction */}
                <div className="mb-8">
                    <p className="text-gray-700 mb-4 leading-relaxed md:text-justify">{membershipData.intro}</p>
                    <p className="text-lg font-semibold text-sky-500">{membershipData.callToAction}</p>
                </div>

                {/* Why ITET Matters */}
                <div className="mb-8 bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg border border-blue-100">
                    <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
                        <span className="bg-blue-600 text-white p-2 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                            </svg>
                        </span>
                        {membershipData.whyITET.title}
                    </h3>
                    <p className="text-gray-700 mb-4">{membershipData.whyITET.description}</p>
                    <ul className="space-y-2">
                        {membershipData.whyITET.issues.map((issue, index) => (
                            <li key={index} className="flex items-start text-gray-700">
                                <span className="text-red-500 mr-2">•</span>
                                {issue}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Challenges */}
                <div className="mb-8 bg-gradient-to-r from-red-50 to-white p-6 rounded-lg border border-red-100">
                    <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                        <span className="bg-red-600 text-white p-2 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </span>
                        {membershipData.challenges.title}
                    </h3>
                    <ul className="space-y-2">
                        {membershipData.challenges.items.map((item, index) => (
                            <li key={index} className="flex items-start text-gray-700">
                                <span className="text-red-500 mr-2">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Benefits */}
                <div className="mb-8 bg-gradient-to-r from-green-50 to-white p-6 rounded-lg border border-green-100">
                    <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                        <span className="bg-green-600 text-white p-2 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </span>
                        {membershipData.benefits.title}
                    </h3>
                    <ul className="grid grid-cols-1  gap-2">
                        {membershipData.benefits.items.map((item, index) => (
                            <li key={index} className="flex items-start text-gray-700">
                                <span className="text-green-500 mr-2">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Conclusion */}
                <div className="mb-8 text-center bg-gray-50 p-6 rounded-lg">
                    <p className="text-lg text-gray-700 mb-3 italic">"{membershipData.conclusion.text}"</p>
                    <p className="text-lg font-semibold text-gray-800 mb-3">{membershipData.conclusion.empowerment}</p>
                    <p className="text-xl font-bold text-orange-600">{membershipData.conclusion.finalCall}</p>
                </div>

                {/* CTA Button */}
                <div className="text-center mt-6">
                    <Link
                        href="/membership-overview"
                        className="bg-[#B07210] hover:bg-amber-600 text-white font-medium py-3 px-8 rounded text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        Become A Member Now
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default Benefits;