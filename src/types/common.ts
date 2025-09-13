
export type BenefitsData = {
    title: string;
    subtitle: string;
    greeting: string;
    salutation: string;
    intro: string;
    callToAction: string;
    whyITET: WhyITET;
    challenges: Challenges;
    benefits: Benefits;
    conclusion: Conclusion;
};

type WhyITET = {
    title: string;
    description: string;
    issues: string[];
};

type Challenges = {
    title: string;
    items: string[];
};

type Benefits = {
    title: string;
    items: string[];
};

type Conclusion = {
    text: string;
    empowerment: string;
    finalCall: string;
};