import Container from "@/component/Container/Container";
import React from 'react';

const BenefitCard = () => {

    const benefits = [
        {
            title: "Reclaim Our Unity and Collective Strength",
            description: "Let us bring all textile engineers under one purposeful umbrella — not just for social gatherings, but for policy advocacy, skill development, industry collaboration, and national representation."
        },
        {
            title: "Support Each Other — In Crisis and Beyond",
            description: "A reformed ITET is committed to standing by you — in personal crises, during career transitions, or emergencies. This is not just a network; it's a safety net."
        },
        {
            title: "Shape the Future Through Skill and Strategy",
            description: "Be part of technical seminars, training programs, and knowledge exchanges that truly prepare us for tomorrow's textile industry — from automation to sustainability to global competitiveness."
        },
        {
            title: "Professional Recognition & Digital Presence",
            description: "Our new ITET digital platform will allow each engineer to maintain a verified profile, connect with industry leaders, and access jobs, tenders, project opportunities, and commercial data."
        },
        {
            title: "Welfare Fund and Infrastructure for the Community",
            description: "Your membership builds the ITET Welfare Trust Fund, now structured to support underprivileged members. Plus, our land at Uttara is now fully paid — a permanent ITET building is on the horizon!"
        },
        {
            title: "Textile Cadre & Policy Advocacy",
            description: "We are actively working with the Ministries of Textiles and Education to establish a Textile Cadre in public service — a long-overdue recognition for our profession."
        },
        {
            title: "International Engagement",
            description: "Our upcoming International Wing will connect Bangladeshi textile engineers abroad — leveraging their experience for the growth of our industry and education system."
        }
    ];

    return (
        <div className=" px-4 sm:px-6 lg:px-8 py-12">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-medium text-amber-700  mb-3">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default BenefitCard ;

